// Test subject.
import './';

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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                        <button class="cta-modal-toggle" type="button">Toggle modal</button>
                    </p>
                </div>

                <div slot="modal">
                    <h2>Hello world</h2>

                    <p>
                        <button class="cta-modal-toggle" type="button">Toggle modal</button>
                    </p>
                </div>
            </cta-modal>
        `;

		// =============
		// Get instance.
		// =============

		instance = document.querySelector('cta-modal');

		// Add `scrollTo` shim.
		instance.modalScroll.scrollTo = jest.fn();

		// Set heading.
		instance.setHeadingId();

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
			target: instance.buttonClose,
		} as unknown as MouseEvent;

		// Fake click event: overlay.
		fakeClickEventOverlay = {
			target: instance.modalOverlay,
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
		expect(instance.modal.getAttribute('aria-labelledby')).toBe(instance.heading?.id);
	});

	// =======================
	// Test attribute changes.
	// =======================

	test('handles attribute changes', () => {
		// Apply changes.
		instance.setAttribute('active', String(false));
		instance.setAttribute('animated', String(false));
		instance.setAttribute('static', String(false));
		instance.setAttribute('close', 'CLOSE_VALUE_1');

		// Test assertions.
		expect(instance.isActive).toBe(false);
		expect(instance.isAnimated).toBe(false);
		expect(instance.isStatic).toBe(false);
		expect(instance.buttonClose.getAttribute('title')).toBe('CLOSE_VALUE_1');

		// Apply changes.
		instance.setAttribute('active', String(true));
		instance.setAttribute('animated', String(true));
		instance.setAttribute('static', String(true));
		instance.setAttribute('close', 'CLOSE_VALUE_2');

		// Test assertions.
		expect(instance.isActive).toBe(true);
		expect(instance.isAnimated).toBe(true);
		expect(instance.isStatic).toBe(true);
		expect(instance.buttonClose.getAttribute('title')).toBe('CLOSE_VALUE_2');
	});

	// ========================
	// Test `focusModal` event.
	// ========================

	test('handles `focusModal` event', () => {
		// Spy.
		const focus = jest.spyOn(instance.modal, 'focus');

		// Test assertions.
		expect(focus).not.toBeCalled();
		expect(instance.modalScroll.scrollTo).not.toBeCalled();

		// Apply changes.
		instance.focusModal();

		// Test assertions.
		expect(focus).toBeCalled();
		expect(instance.modalScroll.scrollTo).toBeCalledWith(0, 0);
	});

	// ==================================
	// Test `isOutsideModal` calculation.
	// ==================================

	test('handles `isOutsideModal` calculation', () => {
		// Overrides.
		instance.isActive = true;

		// Test assertions.
		expect(instance.isOutsideModal(undefined)).toBe(false);
		expect(instance.isOutsideModal(instance.buttonClose)).toBe(false);
		expect(instance.isOutsideModal(document.createElement('div'))).toBe(true);
	});

	// ==========================
	// Test `focusElement` event.
	// ==========================

	test('handles `focusElement` event', () => {
		// Apply changes.
		instance.focusElement(fakeFocusElement);

		// Test assertions.
		expect(fakeFocusElement.focus).toBeCalled();
	});

	// ===============================
	// Test `handleClickToggle` event.
	// ===============================

	test('handles `handleClickToggle` event', () => {
		// Apply changes.
		instance.handleClickToggle();
		instance.handleClickToggle(fakeClickEventButton);
		instance.handleClickToggle(fakeKeyEventEnter);
		instance.handleClickToggle(fakeKeyEventInvalid);

		// Test assertions.
		expect(fakeClickEventButton.preventDefault).toBeCalled();
		expect(fakeKeyEventEnter.preventDefault).toBeCalled();
		expect((fakeKeyEventEnter.target as HTMLElement).classList.contains).toBeCalled();
		expect((fakeKeyEventEnter.target as HTMLElement).closest).toBeCalled();
	});

	// ===========================
	// Test `handleKeyDown` event.
	// ===========================

	test('handles `handleKeyDown` event', () => {
		// Spy.
		const handleClickToggle = jest.spyOn(instance, 'handleClickToggle');
		const handleFocusIn = jest.spyOn(instance, 'handleFocusIn');

		// Overrides.
		instance.isActive = false;

		// Apply changes.
		instance.handleKeyDown(fakeKeyEventTab);
		instance.handleKeyDown(fakeKeyEventEscape);

		// Test assertions.
		expect(handleClickToggle).not.toBeCalled();
		expect(handleFocusIn).not.toBeCalled();

		// Overrides.
		instance.isActive = true;

		// Apply changes.
		instance.handleKeyDown(fakeKeyEventTab);
		instance.handleKeyDown(fakeKeyEventEscape);

		// Test assertions.
		expect(handleClickToggle).toBeCalled();
		expect(handleFocusIn).toBeCalled();
	});

	// ================================
	// Test `handleClickOverlay` event.
	// ================================

	test('handles `handleClickOverlay` event', () => {
		// Spy.
		const handleClickToggle = jest.spyOn(instance, 'handleClickToggle');

		// Overrides.
		instance.isStatic = true;

		// Apply changes.
		instance.handleClickOverlay(fakeClickEventOverlay);

		// Test assertions.
		expect(handleClickToggle).not.toBeCalled();

		// Overrides.
		instance.isStatic = false;

		// Apply changes.
		instance.handleClickOverlay(fakeClickEventOverlay);

		// Test assertions.
		expect(handleClickToggle).toBeCalled();
	});

	// ===========================
	// Test `handleFocusIn` event.
	// ===========================

	test('handles `handleFocusIn` event', () => {
		// Spy.
		const focusElement = jest.spyOn(instance, 'focusElement');

		// Overrides.
		instance.isActive = false;

		// Apply changes.
		instance.handleFocusIn();

		// Test assertions.
		expect(focusElement).not.toBeCalled();

		// Overrides.
		instance.isActive = true;

		// Fake active element.
		Object.defineProperty(instance.shadow, 'activeElement', {
			writable: true,
			value: instance.focusTrapList[0],
		});

		// Apply changes.
		instance.handleFocusIn();

		// Fake active element.
		Object.defineProperty(instance.shadow, 'activeElement', {
			writable: true,
			value: instance.focusTrapList[1],
		});

		// Apply changes.
		instance.handleFocusIn();

		// Test assertions.
		expect(focusElement).toBeCalledWith(expect.any(Object));
	});

	// ==========================
	// Test `isMotionOkay` event.
	// ==========================

	test('handles `isMotionOkay` event', () => {
		// Overrides.
		instance.isAnimated = true;

		// Test assertion.
		expect(instance.isMotionOkay()).toBe(true);
	});
});
