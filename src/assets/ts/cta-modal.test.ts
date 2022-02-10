// Test subject.
import './cta-modal';

// ====================
// Describe `fileName`.
// ====================

describe('index.ts', () => {
  // ==========
  // Set later.
  // ==========

  let fakeClickEventButton: MouseEvent;
  let fakeClickEventOverlay: MouseEvent;
  let fakeFocusElement: HTMLElement;
  let fakeKeyEventEnter: KeyboardEvent;
  let fakeKeyEventEscape: KeyboardEvent;
  let fakeKeyEventInvalid: KeyboardEvent;
  let fakeKeyEventTab: KeyboardEvent;

  // eslint-disable-next-line
  let instance: any;

  // ================
  // Use fake timers.
  // ================

  jest.useFakeTimers();

  // ================================
  // Fire "DOM content loaded" event.
  // ================================

  window.dispatchEvent(new Event('DOMContentLoaded'));

  // =================
  // Before each test.
  // =================

  beforeEach(() => {
    // =========================
    // Shim for `console.error`.
    // =========================

    Object.defineProperty(window.console, 'error', {
      writable: true,
      value: jest.fn(),
    });

    // ======================
    // Shim for `matchMedia`.
    // ======================

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: () => {
        return {
          matches: true,
        };
      },
    });

    // =================================
    // Shim for `requestAnimationFrame`.
    // =================================

    Object.defineProperty(window, 'requestAnimationFrame', {
      writable: true,
      value: (f: unknown) => {
        if (typeof f === 'function') {
          f();
        }
      },
    });

    // ==================
    // Dummy page markup.
    // ==================

    document.body.innerHTML = `
      <cta-modal>

        <div slot="button">
          <p>
            <button
              class="cta-modal-toggle"
              type="button"
            >Toggle modal</button>
          </p>
        </div>

        <div slot="modal">
          <h2>Hello world</h2>
          <p>
            <button
              class="cta-modal-toggle"
              type="button"
            >Toggle modal</button>
          </p>
        </div>

      </cta-modal>
    `;

    // =========================
    // Get instance of CtaModal.
    // =========================

    instance = document.querySelector('cta-modal');

    // Add `scrollTo` shim.
    instance._modalScroll.scrollTo = jest.fn();

    // Set heading.
    instance._setHeadingId();

    // Re-connect.
    instance.connectedCallback();

    // ============
    // Fake events.
    // ============

    // Fake focus element.
    fakeFocusElement = {
      focus: jest.fn(),
    } as unknown as HTMLElement;

    // Fake click event: button.
    fakeClickEventButton = {
      preventDefault: jest.fn(),
      target: instance._buttonClose,
    } as unknown as MouseEvent;

    // Fake click event: overlay.
    fakeClickEventOverlay = {
      target: instance._modalOverlay,
      classList: {
        contains: () => true,
      },
    } as unknown as MouseEvent;

    // Fake key event: enter.
    fakeKeyEventEnter = {
      key: 'enter',
      preventDefault: jest.fn(),
      target: {
        classList: {
          contains: jest.fn(() => false),
        },
        closest: jest.fn(() => true),
      },
    } as unknown as KeyboardEvent;

    // Fake key event: invalid.
    fakeKeyEventInvalid = {
      key: 'invalid',
      preventDefault: jest.fn(),
      target: {
        classList: {
          contains: jest.fn(() => false),
        },
        closest: jest.fn(() => true),
      },
    } as unknown as KeyboardEvent;

    // Fake key event: tab.
    fakeKeyEventTab = {
      key: 'tab',
    } as unknown as KeyboardEvent;

    // Fake key event: escape.
    fakeKeyEventEscape = {
      key: 'escape',
    } as unknown as KeyboardEvent;
  });

  // ================
  // After each test.
  // ================

  afterEach(() => {
    // Run timers.
    jest.runAllTimers();
  });

  // ===========================
  // Test [aria-labelledby="…"].
  // ===========================

  test('handles [aria-labelledby="…"]', () => {
    expect(instance._modal.getAttribute('aria-labelledby')).toBe(instance._heading?.id);
  });

  // ======================================
  // Test `attributeChangedCallback` Event.
  // ======================================

  test('handles `attributeChangedCallback` event', () => {
    // Apply changes.
    instance.setAttribute('active', String(false));
    instance.setAttribute('animated', String(false));
    instance.setAttribute('static', String(false));
    instance.setAttribute('close', 'CLOSE_VALUE_1');

    // Test assertions.
    expect(instance._isActive).toBe(false);
    expect(instance._isAnimated).toBe(false);
    expect(instance._isStatic).toBe(false);
    expect(instance._buttonClose.getAttribute('title')).toBe('CLOSE_VALUE_1');
    expect(instance._buttonClose.getAttribute('aria-label')).toBe('CLOSE_VALUE_1');

    // Apply changes.
    instance.setAttribute('active', String(true));
    instance.setAttribute('animated', String(true));
    instance.setAttribute('static', String(true));
    instance.setAttribute('close', 'CLOSE_VALUE_2');

    // Test assertions.
    expect(instance._isActive).toBe(true);
    expect(instance._isAnimated).toBe(true);
    expect(instance._isStatic).toBe(true);
    expect(instance._buttonClose.getAttribute('title')).toBe('CLOSE_VALUE_2');
    expect(instance._buttonClose.getAttribute('aria-label')).toBe('CLOSE_VALUE_2');
  });

  // ==========================
  // Test `focusElement` event.
  // ==========================

  test('handles `focusElement` event', () => {
    // Apply changes.
    instance._focusElement(fakeFocusElement);

    // Test assertions.
    expect(fakeFocusElement.focus).toBeCalled();
  });

  // ==================================================
  // Test `focusElement` with `activeElement` selected.
  // ==================================================

  test('handles `focusElement` with `activeElement` selected', () => {
    // Get buttons.
    const buttonClose = instance._slotForModal.querySelector('button');
    const buttonOpen = instance._slotForButton.querySelector('button');

    // Overrides.
    instance._isActive = true;
    instance._modalScroll.style.display = 'block';

    // Apply changes.
    buttonClose.click();

    // Overrides.
    instance._activeElement = buttonOpen;

    // Run timers.
    jest.runAllTimers();
  });

  // ========================
  // Test `focusModal` event.
  // ========================

  test('handles `focusModal` event', () => {
    // Spy.
    const focus = jest.spyOn(instance._modal, 'focus');

    // Test assertions.
    expect(focus).not.toBeCalled();
    expect(instance._modalScroll.scrollTo).not.toBeCalled();

    // Apply changes.
    instance._focusModal();

    // Test assertions.
    expect(focus).toBeCalled();
    expect(instance._modalScroll.scrollTo).toBeCalledWith(0, 0);
  });

  // ================================
  // Test `handleClickOverlay` event.
  // ================================

  test('handles `handleClickOverlay` event', () => {
    // Spy.
    const handleClickToggle = jest.spyOn(instance, '_handleClickToggle');

    // Overrides.
    instance._isStatic = true;

    // Apply changes.
    instance._handleClickOverlay(fakeClickEventOverlay);

    // Test assertions.
    expect(handleClickToggle).not.toBeCalled();

    // Overrides.
    instance._isStatic = false;

    // Apply changes.
    instance._handleClickOverlay(fakeClickEventOverlay);

    // Test assertions.
    expect(handleClickToggle).toBeCalled();
  });

  // ===============================
  // Test `handleClickToggle` event.
  // ===============================

  test('handles `handleClickToggle` event', () => {
    // Apply changes.
    instance._handleClickToggle();
    instance._handleClickToggle(fakeClickEventButton);
    instance._handleClickToggle(fakeKeyEventEnter);
    instance._handleClickToggle(fakeKeyEventInvalid);

    // Test assertions.
    expect(fakeClickEventButton.preventDefault).toBeCalled();
    expect(fakeKeyEventEnter.preventDefault).toBeCalled();
    expect((fakeKeyEventEnter.target as HTMLElement).classList.contains).toBeCalled();
    expect((fakeKeyEventEnter.target as HTMLElement).closest).toBeCalled();
  });

  // ===========================
  // Test `handleFocusIn` event.
  // ===========================

  test('handles `handleFocusIn` event', () => {
    // Spy.
    const focusElement = jest.spyOn(instance, '_focusElement');

    // Overrides.
    instance._isActive = false;

    // Apply changes.
    instance._handleFocusIn();

    // Test assertions.
    expect(focusElement).not.toBeCalled();

    // Overrides.
    instance._isActive = true;

    // Fake active element.
    Object.defineProperty(instance._shadow, 'activeElement', {
      writable: true,
      value: instance._focusTrapList[0],
    });

    // Apply changes.
    instance._handleFocusIn();

    // Fake active element.
    Object.defineProperty(instance._shadow, 'activeElement', {
      writable: true,
      value: instance._focusTrapList[1],
    });

    // Apply changes.
    instance._handleFocusIn();

    // Test assertions.
    expect(focusElement).toBeCalledWith(expect.any(Object));
  });

  // ===========================
  // Test `handleKeyDown` event.
  // ===========================

  test('handles `handleKeyDown` event', () => {
    // Spy.
    const handleClickToggle = jest.spyOn(instance, '_handleClickToggle');
    const handleFocusIn = jest.spyOn(instance, '_handleFocusIn');

    // Overrides.
    instance._isActive = false;

    // Apply changes.
    instance._handleKeyDown(fakeKeyEventTab);
    instance._handleKeyDown(fakeKeyEventEscape);

    // Test assertions.
    expect(handleClickToggle).not.toBeCalled();
    expect(handleFocusIn).not.toBeCalled();

    // Overrides.
    instance._isActive = true;

    // Apply changes.
    instance._handleKeyDown(fakeKeyEventTab);
    instance._handleKeyDown(fakeKeyEventEscape);

    // Test assertions.
    expect(handleClickToggle).toBeCalled();
    expect(handleFocusIn).toBeCalled();
  });

  // ================================
  // Test `isMotionOkay` calculation.
  // ================================

  test('handles `isMotionOkay` calculation', () => {
    // Overrides.
    instance._isAnimated = true;

    // Test assertion.
    expect(instance._isMotionOkay()).toBe(true);
  });

  // ==================================
  // Test `isOutsideModal` calculation.
  // ==================================

  test('handles `isOutsideModal` calculation', () => {
    // Overrides.
    instance._isActive = true;

    // Test assertions.
    expect(instance._isOutsideModal(undefined)).toBe(false);
    expect(instance._isOutsideModal(instance._buttonClose)).toBe(false);
    expect(instance._isOutsideModal(document.createElement('div'))).toBe(true);
  });

  // ====================================
  // Test missing [slot="modal"] element.
  // ====================================

  test('handles missing [slot="modal"] element', () => {
    // Test assertions.
    expect(window.console.error).not.toBeCalled();

    // Initialize without [slot="modal"] element.
    document.body.innerHTML = `<cta-modal></cta-modal>`;

    // Test assertions.
    expect(window.console.error).toBeCalledWith(
      'Required [slot="modal"] not found inside cta-modal.'
    );
  });
});
