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

	const CLICK = 'click';
	const FOCUSIN = 'focusin';
	const KEYDOWN = 'keydown';

	// ======
	// Style.
	// ======

	const style = `
		<style>
			.cta-modal__focus-trap {
				opacity: 0;
				overflow: hidden;

				width: 0;
				height: 0;

				position: fixed;
				top: 0;
				left: 0;
			}

			.cta-modal__overlay {
				background-color: rgba(0, 0, 0, 0.5);
				display: flex;

				width: 100%;
				height: 100%;

				z-index: 2;
				position: fixed;
				top: 0;
				left: 0;
			}

			.cta-modal__scroll {
				display: flex;
				align-items: center;
				justify-content: center;

				width: 100%;
				min-height: 100%;
			}

			.cta-modal {
				background-color: #fff;
				padding: 20px;

				width: 500px;
				max-width: 100%;

				position: relative;
			}

			.cta-modal > :last-child {
				margin-bottom: 0;
			}

			.cta-modal__close {
				appearance: none;
				border: 0;
				padding: 0;

				color: #fff;
				background-color: #000;
				border-radius: 50%;
				box-shadow: 0 0 0 1px #fff;

				font-size: 20px;
				text-decoration: center;

				line-height: 30px;
				width: 30px;

				transform: translate(50%, -50%);
				position: absolute;
				top: 0;
				right: 0;
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
			tabindex={0}
		></span>
	`;

	const modal = `
		<p>
			<button class="cta-modal__toggle" type="button"></button>
		</p>

		<div class="cta-modal__overlay">
			${focusTrap}

			<div class="cta-modal__scroll">
				<div
					aria-modal="true"
					class="cta-modal"
					role="dialog"
					tabindex="-1"
				>
					<button class="cta-modal__close" title="Close">&times;</button>
					<slot />
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
		// Constructor.
		constructor() {
			super();

			// Get flag.
			const isActive = this.getAttribute('active') === 'true';

			// Set flag.
			this.isActive = isActive;

			// Shadow DOM.
			this.attachShadow({ mode: 'open' });

			// Add template.
			this.shadowRoot.appendChild(
				// Clone node.
				template.content.cloneNode(true)
			);

			// Get elements.
			this.buttonClose = this.shadowRoot.querySelector('.cta-modal__close');
			this.buttonToggle = this.shadowRoot.querySelector('.cta-modal__toggle');

			this.modal = this.shadowRoot.querySelector('.cta-modal');
			this.modalOverlay = this.shadowRoot.querySelector('.cta-modal__overlay');

			// Set button text.
			this.buttonToggle.textContent = this.getAttribute('text') || 'Toggle modal';

			// Set display.
			this.toggleModalDisplay();
		}

		// Mount.
		connectedCallback() {
			// Add events.
			this.addEvents();
		}

		// Unmount.
		disconnectedCallback() {
			this.removeEvents();
		}

		// Add events.
		addEvents() {
			this.removeEvents();

			document.addEventListener(FOCUSIN, this.handleFocusIn.bind(this));
			document.addEventListener(KEYDOWN, this.handleKeyDown.bind(this));

			this.buttonClose.addEventListener(CLICK, this.handleClickToggle.bind(this));
			this.buttonToggle.addEventListener(CLICK, this.handleClickToggle.bind(this));
			this.modalOverlay.addEventListener(CLICK, this.handleClickOverlay.bind(this));
		}

		// Remove events.
		removeEvents() {
			document.removeEventListener(FOCUSIN, this.handleFocusIn);
			document.removeEventListener(KEYDOWN, this.handleKeyDown);

			this.buttonClose.removeEventListener(CLICK, this.handleClickToggle);
			this.buttonToggle.removeEventListener(CLICK, this.handleClickToggle);
			this.modalOverlay.removeEventListener(CLICK, this.handleClickOverlay);
		}

		// Toggle modal.
		toggleModalDisplay() {
			// Show or hide?
			this.modalOverlay.style.display = this.isActive ? 'block' : 'none';

			// Focus modal?
			if (this.isActive) {
				this.modal.focus();
			}
		}

		// Event: overlay click.
		handleClickOverlay(event) {
			// Get layer.
			const { target } = event;
			const isOutsideModal = !target.closest('.cta-modal');

			// Outside modal?
			if (isOutsideModal) {
				// TODO: DEBUG THIS.
				this.handleClickToggle();
			}
		}

		// Event: toggle modal.
		handleClickToggle() {
			// Set flag.
			this.isActive = !this.isActive;

			// Set display.
			this.toggleModalDisplay();
		}

		// Event: focus in document.
		handleFocusIn() {
			// Early exit.
			if (!this.isActive || !document.activeElement) {
				return;
			}

			// Get boolean.
			const isOutsideModal = !document.activeElement.closest('.cta-modal__overlay');

			// Outside modal?
			if (isOutsideModal) {
				// TODO: DEBUG THIS.
				this.modal.focus();
			}
		}

		// Event: escape key.
		handleKeyDown({ key }) {
			if (this.isActive && key.toLowerCase() === 'escape') {
				this.handleClickToggle();
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
