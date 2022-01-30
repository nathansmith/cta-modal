// ===============
// Closure: start.
// ===============

(() => {
	// ===========
	// Early exit.
	// ===========

	if (!('customElements' in window)) {
		return;
	}

	// ==========
	// Constants.
	// ==========

	const ACTIVE = 'active';
	const CLICK = 'click';
	const ENTER = 'enter';
	const ESCAPE = 'escape';
	const FOCUSIN = 'focusin';
	const KEYDOWN = 'keydown';
	const SPACE = ' ';
	const TAB = 'tab';

	// ======
	// Style.
	// ======

	const style = `
		<style>
			*,
			*:after,
			*:before {
				box-sizing: border-box;
				margin: 0;
				padding: 0;
			}

			.cta-modal__focus-trap {
				opacity: 0;
				overflow: hidden;

				width: 0;
				height: 0;

				position: fixed;
				top: 0;
				left: 0;
			}

			.cta-modal__scroll {
				overflow-x: hidden;
				overflow-y: auto;

				width: 100%;
				height: 100%;

				position: fixed;
				top: 0;
				left: 0;
				z-index: 2;
			}

			.cta-modal__overlay {
				background-color: rgba(0, 0, 0, 0.5);

				display: flex;
				align-items: center;
				justify-content: center;

				padding-top: 20px;
				padding-left: 20px;
				padding-right: 20px;
				padding-bottom: 20px;

				width: 100%;
				min-height: 100%;
			}

			.cta-modal {
				background-color: #fff;
				border-radius: 4px;
				padding: 20px;

				width: 500px;
				max-width: 100%;

				position: relative;
			}

			.cta-modal__close {
				appearance: none;
				border: 0;
				padding: 0;

				color: #fff;
				background-color: #000;
				border-radius: 50%;
				box-shadow: 0 0 0 1px #fff;

				cursor: pointer;
				font-family: 'Arial', sans-serif;
				font-size: 24px;
				line-height: 30px;
				text-align: center;
				width: 30px;

				transition-duration: 0.25s;
				transition-property: background-color, box-shadow, color;

				transform: translate(50%, -50%);
				position: absolute;
				top: 0;
				right: 0;
			}

			.cta-modal__close:hover {
				color: #000;
				background-color: #fff;
				box-shadow: 0 0 0 1px #000;
			}

			@supports selector(:focus-visible) {
				.cta-modal__close:focus-visible {
					color: #000;
					background-color: #fff;
					box-shadow: 0 0 0 1px #000;
				}
			}

			@supports not selector(:focus-visible) {
				.cta-modal__close:focus {
					color: #000;
					background-color: #fff;
					box-shadow: 0 0 0 1px #000;
				}
			}
		</style>
	`;

	// =========
	// Template.
	// =========

	const focusTrap = `
		<span
			aria-hidden="true"
			class="cta-modal__focus-trap"
			tabindex="0"
		></span>
	`;

	const modal = `
		<slot name="button"></slot>

		<div class="cta-modal__scroll" style="display:none">
			${focusTrap}

			<div class="cta-modal__overlay">
				<div
					aria-modal="true"
					class="cta-modal"
					role="dialog"
					tabindex="-1"
				>
					<button
						class="cta-modal__close"
						title="Close"
						type="button"
					>&times;</button>

					<slot name="modal"></slot>
				</div>
			</div>

			${focusTrap}
		</div>
	`;

	const markup = [style, modal].join('').trim().replace(/\s+/g, ' ');
	const template = document.createElement('template');
	template.innerHTML = markup;

	// ==========
	// Component.
	// ==========

	class CtaModal extends HTMLElement {
		// ============
		// Constructor.
		// ============

		constructor() {
			super();

			// Bind context.
			this.bind();

			// Get flag.
			const isActive = this.getAttribute(ACTIVE) === String(true);

			// Set flag.
			this.isActive = isActive;

			// Shadow DOM.
			this.attachShadow({ mode: 'open' });

			// Add template.
			this.shadowRoot.appendChild(
				// Clone node.
				template.content.cloneNode(true)
			);

			// Get slots.
			this.slotForButton = this.querySelector('[slot="button"]');
			this.slotForModal = this.querySelector('[slot="modal"]');

			// Get elements.
			this.buttonToggleList = this.querySelectorAll('[data-cta-modal="toggle"]');
			this.heading = this.querySelector('h1, h2, h3, h4, h5, h6');

			// Get shadow elements.
			this.buttonClose = this.shadowRoot.querySelector('.cta-modal__close');
			this.focusTrapList = this.shadowRoot.querySelectorAll('.cta-modal__focus-trap');
			this.modal = this.shadowRoot.querySelector('.cta-modal');
			this.modalScroll = this.shadowRoot.querySelector('.cta-modal__scroll');
			this.modalOverlay = this.shadowRoot.querySelector('.cta-modal__overlay');

			// Early exit.
			if (!this.slotForModal) {
				throw new Error('Required `[slot="modal"]` not found inside `<cta-modal>`.');
			}

			// Early exit.
			if (!this.slotForButton) {
				throw new Error('Required `[slot="button"]` not found inside `<cta-modal>`.');
			}

			// Early exit.
			if (!this.slotForButton.querySelector('[data-cta-modal="toggle"]')) {
				throw new Error('Required `[data-cta-modal="toggle"]` not found inside `[slot="button"]`.');
			}

			// Add heading ID.
			this.addHeadingId();

			// Set display.
			this.toggleModalDisplay();
		}

		// ============================
		// Lifecycle: watch attributes.
		// ============================

		static get observedAttributes() {
			return [ACTIVE];
		}

		// ==============================
		// Lifecycle: attributes changed.
		// ==============================

		attributeChangedCallback(name, oldValue, newValue) {
			// Get flag.
			const isActive = newValue === String(true);

			// Changed active="…" value?
			if (name === ACTIVE && oldValue !== newValue) {
				// Set flag.
				this.isActive = isActive;

				// Set display.
				this.toggleModalDisplay();
			}
		}

		// ===============================
		// Lifecycle: bind `this` context.
		// ===============================

		bind() {
			// Get property names.
			const propertyNames = Object.getOwnPropertyNames(
				// Get prototype.
				Object.getPrototypeOf(this)
			);

			// Loop through.
			propertyNames.forEach((name) => {
				// Bind functions.
				if (typeof this[name] === 'function') {
					this[name] = this[name].bind(this);
				}
			});
		}

		// ===========================
		// Lifecycle: component mount.
		// ===========================

		connectedCallback() {
			this.addEvents();
		}

		// =============================
		// Lifecycle: component unmount.
		// =============================

		disconnectedCallback() {
			this.removeEvents();
		}

		// ======================
		// Lifecycle: add events.
		// ======================

		addEvents() {
			// Prevent doubles.
			this.removeEvents();

			document.addEventListener(FOCUSIN, this.handleFocusIn);
			document.addEventListener(KEYDOWN, this.handleKeyDown);

			this.buttonClose.addEventListener(CLICK, this.handleClickToggle);
			this.modalOverlay.addEventListener(CLICK, this.handleClickOverlay);

			// Loop through.
			this.buttonToggleList.forEach((button) => {
				button.addEventListener(CLICK, this.handleClickToggle);
				button.addEventListener(KEYDOWN, this.handleClickToggle);
			});
		}

		// =========================
		// Lifecycle: remove events.
		// =========================

		removeEvents() {
			document.removeEventListener(FOCUSIN, this.handleFocusIn);
			document.removeEventListener(KEYDOWN, this.handleKeyDown);

			this.buttonClose.removeEventListener(CLICK, this.handleClickToggle);
			this.modalOverlay.removeEventListener(CLICK, this.handleClickOverlay);

			// Loop through.
			this.buttonToggleList.forEach((button) => {
				button.removeEventListener(CLICK, this.handleClickToggle);
				button.removeEventListener(KEYDOWN, this.handleClickToggle);
			});
		}

		// =======================
		// Helper: add heading ID.
		// =======================

		addHeadingId() {
			// Add a11y heading.
			if (this.heading) {
				// Get ID.
				const id = this.heading.id || 'ID_FOR_CTA_MODAL_HEADING';

				// Set ID.
				this.heading.setAttribute('id', id);
				this.modal.setAttribute('aria-labelledby', id);
			}
		}

		// =============================
		// Helper: detect outside modal.
		// =============================

		isOutsideModal(element) {
			// Early exit.
			if (!this.isActive || !element) {
				return false;
			}

			// Has element?
			const hasElement = this.contains(element) || this.modal.contains(element);

			// Get boolean.
			const bool = !hasElement;

			// Expose boolean.
			return bool;
		}

		// =====================
		// Helper: toggle modal.
		// =====================

		toggleModalDisplay() {
			// Set attribute.
			this.setAttribute('active', this.isActive);

			// Show or hide?
			this.modalScroll.style.display = this.isActive ? 'block' : 'none';

			// Get active element.
			const activeElement = document.activeElement;

			// Cache active element?
			if (this.isActive && activeElement) {
				this.activeElement = activeElement;
			}
		}

		// =====================
		// Event: overlay click.
		// =====================

		handleClickOverlay(event) {
			// Get layer.
			const { target } = event;

			// Outside modal?
			if (target.classList.contains('cta-modal__overlay')) {
				this.handleClickToggle();
			}
		}

		// ====================
		// Event: toggle modal.
		// ====================

		handleClickToggle(event = {}) {
			// Get key.
			let { key = '' } = event;
			key = key.toLowerCase();

			// Key event?
			if (key) {
				// Active key?
				if ([ENTER, SPACE].includes(key)) {
					// Prevent scroll.
					event.preventDefault();

					// Early exit.
				} else {
					return;
				}
			}

			// Set flag.
			this.isActive = !this.isActive;

			// Set display.
			this.toggleModalDisplay();

			// Focus modal content?
			if (this.isActive) {
				this.modal.focus();

				// Return focus?
			} else if (this.activeElement) {
				this.activeElement.focus();
			}
		}

		// =========================
		// Event: focus in document.
		// =========================

		handleFocusIn() {
			// Get active element.
			const activeElement = this.shadowRoot.activeElement || document.activeElement;

			// Get booleans.
			const isFocusTrap1 = activeElement === this.focusTrapList[0];
			const isFocusTrap2 = activeElement === this.focusTrapList[1];

			// Selector.
			const s = 'a, button, input, select, textarea, [tabindex="0"]';

			// Get elements.
			const focusListReal = Array.from(this.slotForModal.querySelectorAll(s));
			const focusListShadow = Array.from(this.modal.querySelectorAll(s));
			const focusListTotal = focusListShadow.concat(focusListReal);

			// Get first & last items.
			const focusItemFirst = focusListTotal[0];
			const focusItemLast = focusListTotal[focusListTotal.length - 1];

			// Focus trap: above?
			if (isFocusTrap1 && focusItemLast) {
				window.requestAnimationFrame(() => {
					focusItemLast.focus();
				});

				// Focus trap: below?
			} else if (isFocusTrap2 && focusItemFirst) {
				window.requestAnimationFrame(() => {
					focusItemFirst.focus();
				});

				// Outside modal?
			} else if (this.isOutsideModal(activeElement)) {
				window.requestAnimationFrame(() => {
					this.modal.focus();
				});
			}
		}

		// =================
		// Event: key press.
		// =================

		handleKeyDown({ key }) {
			// Get key.
			key = key.toLowerCase();

			// Modal active?
			if (this.isActive) {
				// Escape key?
				if (key === ESCAPE) {
					this.handleClickToggle();
				}

				// Tab key?
				if (key === TAB) {
					this.handleFocusIn();
				}
			}
		}
	}

	// ===============
	// Define element.
	// ===============

	window.customElements.define('cta-modal', CtaModal);
})();

// =============
// Closure: end.
// =============
