// ===========================
// START: if "customElements".
// ===========================

if ('customElements' in window) {
	// ==========
	// Constants.
	// ==========

	const ACTIVE = 'active';
	const ANIMATED = 'animated';
	const ANIMATION_DURATION = 250;
	const ARIA_LABELLEDBY = 'aria-labelledby';
	const BLOCK = 'block';
	const CLICK = 'click';
	const CLOSE = 'close';
	const CLOSE_TITLE = 'Close';
	const DATA_IS_HIDE = 'data-cta-modal-is-hide';
	const DATA_IS_SHOW = 'data-cta-modal-is-show';
	const DOM_CONTENT_LOADED = 'DOMContentLoaded';
	const EMPTY_STRING = '';
	const ENTER = 'enter';
	const ESCAPE = 'escape';
	const FOCUSIN = 'focusin';
	const HIDDEN = 'hidden';
	const ID = 'id';
	const ID_FOR_CTA_MODAL_HEADING = 'ID_FOR_CTA_MODAL_HEADING';
	const KEYDOWN = 'keydown';
	const MEDIA_QUERY_FOR_MOTION = '(prefers-reduced-motion: no-preference)';
	const NONE = 'none';
	const SPACE = ' ';
	const STATIC = 'static';
	const TAB = 'tab';
	const TEMPLATE = 'template';
	const TITLE = 'title';

	const FOCUSABLE_SELECTORS = [
		'a:not([disabled])',
		'button:not([disabled])',
		'input:not([disabled]):not([type="hidden"])',
		'select:not([disabled])',
		'textarea:not([disabled])',
		'[tabindex="0"]:not([disabled])',
	].join(',');

	// ======
	// Style.
	// ======

	const STYLE = `
		<style>
			*,
			*:after,
			*:before {
				box-sizing: border-box;
				margin: 0;
				padding: 0;
			}

			@media (prefers-reduced-motion: reduce) {
				*,
				*:after,
				*:before {
					animation: none !important;
					transition: none !important;
				}
			}

			@keyframes ANIMATION-SHOW-cta-modal-overlay {
				0% {
					opacity: 0;
				}

				100% {
					opacity: 1;
				}
			}

			@keyframes ANIMATION-SHOW-cta-modal {
				0% {
					transform: scale(0.95);
				}

				100% {
					transform: scale(1);
				}
			}

			@keyframes ANIMATION-HIDE-cta-modal-overlay {
				0% {
					opacity: 1;
				}

				100% {
					opacity: 0;
				}
			}

			@keyframes ANIMATION-HIDE-cta-modal {
				0% {
					transform: scale(1);
				}

				100% {
					transform: scale(0.95);
				}
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

				z-index: 100000;
				position: fixed;
				top: 0;
				left: 0;
			}

			.cta-modal__overlay {
				background-color: var(--cta-modal-overlay-background-color, rgba(0, 0, 0, 0.5));
				display: flex;
				align-items: center;
				justify-content: center;

				padding-top: var(--cta-modal-overlay-padding-top, 20px);
				padding-left: var(--cta-modal-overlay-padding-left, 20px);
				padding-right: var(--cta-modal-overlay-padding-right, 20px);
				padding-bottom: var(--cta-modal-overlay-padding-bottom, 20px);

				width: 100%;
				min-height: 100%;
			}

			.cta-modal {
				background-color: var(--cta-modal-background-color, #fff);
				border-radius: var(--cta-modal-border-radius, 5px);
				box-shadow: var(--cta-modal-box-shadow, 0 2px 5px 0 rgba(0, 0, 0, 0.5));

				padding-top: var(--cta-modal-padding-top, 20px);
				padding-left: var(--cta-modal-padding-left, 20px);
				padding-right: var(--cta-modal-padding-right, 20px);
				padding-bottom: var(--cta-modal-padding-bottom, 20px);

				width: var(--cta-modal-width, 500px);
				max-width: 100%;

				position: relative;
			}

			[${DATA_IS_SHOW}='true'] .cta-modal__overlay {
				animation-duration: ${ANIMATION_DURATION}ms;
				animation-name: ANIMATION-SHOW-cta-modal-overlay;
			}

			[${DATA_IS_SHOW}='true'] .cta-modal {
				animation-duration: ${ANIMATION_DURATION}ms;
				animation-name: ANIMATION-SHOW-cta-modal;
			}

			[${DATA_IS_HIDE}='true'] .cta-modal__overlay {
				animation-duration: ${ANIMATION_DURATION}ms;
				animation-name: ANIMATION-HIDE-cta-modal-overlay;
				opacity: 0;
			}

			[${DATA_IS_HIDE}='true'] .cta-modal {
				animation-duration: ${ANIMATION_DURATION}ms;
				animation-name: ANIMATION-HIDE-cta-modal;
				transform: scale(0.95);
			}

			.cta-modal__close {
				appearance: none;
				touch-action: none;
				user-select: none;

				border: 0;
				padding: 0;

				color: var(--cta-modal-close-color, #fff);
				background-color: var(--cta-modal-close-background-color, #000);
				border-radius: var(--cta-modal-close-border-radius, 50%);
				box-shadow: var(--cta-modal-close-box-shadow, 0 0 0 1px #fff);
				display: var(--cta-modal-close-display, block);

				cursor: pointer;
				font-family: var(--cta-modal-close-font-family, 'Arial', sans-serif);
				font-size: var(--cta-modal-close-font-size, 23px);
				text-align: center;

				line-height: var(--cta-modal-close-line-height, 26px);
				width: var(--cta-modal-close-width, 26px);

				transform: translate(40%, -40%);
				position: absolute;
				top: 0;
				right: 0;
			}

			.cta-modal__close:hover {
				color: var(--cta-modal-close-color-hover, #000);
				background-color: var(--cta-modal-close-background-color-hover, #fff);
				box-shadow: var(--cta-modal-close-box-shadow-hover, 0 0 0 1px #000);
			}

			@supports selector(:focus-visible) {
				.cta-modal__close:focus-visible {
					color: var(--cta-modal-close-color-hover, #000);
					background-color: var(--cta-modal-close-background-color-hover, #fff);
					box-shadow: var(--cta-modal-close-box-shadow-hover, 0 0 0 1px #000);
				}
			}

			@supports not selector(:focus-visible) {
				.cta-modal__close:focus {
					color: var(--cta-modal-close-color-hover, #000);
					background-color: var(--cta-modal-close-background-color-hover, #fff);
					box-shadow: var(--cta-modal-close-box-shadow-hover, 0 0 0 1px #000);
				}
			}
		</style>
	`;

	// =========
	// Template.
	// =========

	const FOCUS_TRAP = `
		<span
			aria-hidden="true"
			class="cta-modal__focus-trap"
			tabindex="0"
		></span>
	`;

	const MODAL = `
		<slot name="button"></slot>

		<div class="cta-modal__scroll" style="display:none">
			${FOCUS_TRAP}

			<div class="cta-modal__overlay">
				<div
					aria-modal="true"
					class="cta-modal"
					role="dialog"
					tabindex="-1"
				>
					<button
						class="cta-modal__close"
						type="button"
					>&times;</button>

					<slot name="modal"></slot>
				</div>
			</div>

			${FOCUS_TRAP}
		</div>
	`;

	// Get markup.
	const markup = [STYLE, MODAL].join(EMPTY_STRING).trim().replace(/\s+/g, SPACE);

	// Get template.
	const template = document.createElement(TEMPLATE);
	template.innerHTML = markup;

	// ==========
	// Component.
	// ==========

	class CtaModal extends HTMLElement {
		// Read-only types.
		readonly buttonClose: HTMLElement;
		readonly heading: HTMLElement | null;
		readonly modal: HTMLElement;
		readonly modalOverlay: HTMLElement;
		readonly modalScroll: HTMLElement;
		readonly shadow: ShadowRoot;
		readonly slotForButton: HTMLElement | null;
		readonly slotForModal: HTMLElement | null;

		// Normal types.
		activeElement: HTMLElement | null = null;
		focusTrapList: NodeListOf<HTMLElement>;
		isActive = false;
		isAnimated = true;
		isHideShow = false;
		isStatic = false;
		timerForHide: number | undefined;
		timerForShow: number | undefined;

		// =======================
		// Lifecycle: constructor.
		// =======================

		constructor() {
			// Parent constructor.
			super();

			// Bind context.
			this.bind();

			// Shadow DOM.
			this.shadow = this.attachShadow({ mode: 'closed' });

			// Add template.
			this.shadow.appendChild(
				// Clone node.
				template.content.cloneNode(true)
			);

			// Get slots.
			this.slotForButton = this.querySelector('[slot="button"');
			this.slotForModal = this.querySelector('[slot="modal"]');

			// Get elements.
			this.heading = this.querySelector('h1, h2, h3, h4, h5, h6');

			// Get shadow elements.
			this.buttonClose = this.shadow.querySelector('.cta-modal__close') as HTMLElement;
			this.focusTrapList = this.shadow.querySelectorAll('.cta-modal__focus-trap');
			this.modal = this.shadow.querySelector('.cta-modal') as HTMLElement;
			this.modalOverlay = this.shadow.querySelector('.cta-modal__overlay') as HTMLElement;
			this.modalScroll = this.shadow.querySelector('.cta-modal__scroll') as HTMLElement;

			// Early exit.
			if (!this.slotForModal) {
				window.console.error('Required [slot="modal"] not found inside <cta-modal>.');
			}

			// Set animation flag.
			this.setAnimationFlag();

			// Set close text.
			this.setCloseTitle();

			// Set heading ID.
			this.setHeadingId();

			// Set static flag.
			this.setStaticFlag();

			/*
			=====
			NOTE:
			=====

			We set this flag last, because the UI visuals within
			are contingent on some of the other flags being set.
		*/

			// Set active flag.
			this.setActiveFlag();
		}

		// ============================
		// Lifecycle: watch attributes.
		// ============================

		static get observedAttributes() {
			return [ACTIVE, ANIMATED, CLOSE, STATIC];
		}

		// ==============================
		// Lifecycle: attributes changed.
		// ==============================

		attributeChangedCallback(name: string, oldValue: string, newValue: string) {
			// Changed active="…" value?
			if (name === ACTIVE && oldValue !== newValue) {
				this.setActiveFlag();
			}

			// Changed animated="…" value?
			if (name === ANIMATED && oldValue !== newValue) {
				this.setAnimationFlag();
			}

			// Changed close="…" value?
			if (name === CLOSE && oldValue !== newValue) {
				this.setCloseTitle();
			}

			// Changed static="…" value?
			if (name === STATIC && oldValue !== newValue) {
				this.setStaticFlag();
			}
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

		// ============================
		// Helper: bind `this` context.
		// ============================

		bind() {
			// Get property names.
			const propertyNames = Object.getOwnPropertyNames(
				// Get prototype.
				Object.getPrototypeOf(this)
			) as (keyof CtaModal)[];

			// Loop through.
			propertyNames.forEach((name) => {
				// Bind functions.
				if (typeof this[name] === 'function') {
					/*
				=====
				NOTE:
				=====

					Why use "@ts-expect-error" here?

					Calling `*.bind(this)` is a standard practice
					when using JavaScript classes. It is necessary
					for functions that might change context because
					they are interacting directly with DOM elements.

					Basically, I am telling TypeScript:

					"Let me live my life!"

					😎
				*/

					// @ts-expect-error bind
					this[name] = this[name].bind(this);
				}
			});
		}

		// ===================
		// Helper: add events.
		// ===================

		addEvents() {
			// Prevent doubles.
			this.removeEvents();

			document.addEventListener(FOCUSIN, this.handleFocusIn);
			document.addEventListener(KEYDOWN, this.handleKeyDown);

			this.buttonClose.addEventListener(CLICK, this.handleClickToggle);
			this.modalOverlay.addEventListener(CLICK, this.handleClickOverlay);

			if (this.slotForButton) {
				this.slotForButton.addEventListener(CLICK, this.handleClickToggle);
				this.slotForButton.addEventListener(KEYDOWN, this.handleClickToggle);
			}

			if (this.slotForModal) {
				this.slotForModal.addEventListener(CLICK, this.handleClickToggle);
				this.slotForModal.addEventListener(KEYDOWN, this.handleClickToggle);
			}
		}

		// ======================
		// Helper: remove events.
		// ======================

		removeEvents() {
			document.removeEventListener(FOCUSIN, this.handleFocusIn);
			document.removeEventListener(KEYDOWN, this.handleKeyDown);

			this.buttonClose.removeEventListener(CLICK, this.handleClickToggle);
			this.modalOverlay.removeEventListener(CLICK, this.handleClickOverlay);

			if (this.slotForButton) {
				this.slotForButton.removeEventListener(CLICK, this.handleClickToggle);
				this.slotForButton.removeEventListener(KEYDOWN, this.handleClickToggle);
			}

			if (this.slotForModal) {
				this.slotForModal.removeEventListener(CLICK, this.handleClickToggle);
				this.slotForModal.removeEventListener(KEYDOWN, this.handleClickToggle);
			}
		}

		// ===========================
		// Helper: set animation flag.
		// ===========================

		setAnimationFlag() {
			this.isAnimated = this.getAttribute(ANIMATED) !== String(false);
		}

		// =======================
		// Helper: add close text.
		// =======================

		setCloseTitle() {
			// Get title.
			const title = this.getAttribute(CLOSE) || CLOSE_TITLE;

			// Set title.
			this.buttonClose.setAttribute(TITLE, title);
		}

		// =======================
		// Helper: add heading ID.
		// =======================

		setHeadingId() {
			// Add a11y heading.
			if (this.heading) {
				// Get ID.
				const id = this.heading.id || ID_FOR_CTA_MODAL_HEADING;

				// Set ID.
				this.heading.setAttribute(ID, id);
				this.modal.setAttribute(ARIA_LABELLEDBY, id);
			}
		}

		// ========================
		// Helper: set active flag.
		// ========================

		setActiveFlag() {
			// Get flag.
			const isActive = this.getAttribute(ACTIVE) === String(true);

			// Set flag.
			this.isActive = isActive;

			// Set display.
			this.toggleModalDisplay(() => {
				// Focus modal?
				if (this.isActive) {
					this.focusModal();
				}
			});
		}

		// ========================
		// Helper: set static flag.
		// ========================

		setStaticFlag() {
			this.isStatic = this.getAttribute(STATIC) === String(true);
		}

		// ======================
		// Helper: focus element.
		// ======================

		focusElement(element: HTMLElement) {
			window.requestAnimationFrame(() => {
				if (typeof element.focus === 'function') {
					element.focus();
				}
			});
		}

		// ====================
		// Helper: focus modal.
		// ====================

		focusModal() {
			window.requestAnimationFrame(() => {
				this.modal.focus();
				this.modalScroll.scrollTo(0, 0);
			});
		}

		// =============================
		// Helper: detect outside modal.
		// =============================

		isOutsideModal(element?: HTMLElement) {
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

		// ===========================
		// Helper: detect motion pref.
		// ===========================

		isMotionOkay() {
			// Get pref.
			const { matches } = window.matchMedia(MEDIA_QUERY_FOR_MOTION);

			// Expose boolean.
			return this.isAnimated && matches;
		}

		// =====================
		// Helper: toggle modal.
		// =====================

		toggleModalDisplay(f: unknown) {
			// Set attribute.
			this.setAttribute(ACTIVE, String(this.isActive));

			// Get booleans.
			const isModalVisible = this.modalScroll.style.display === BLOCK;
			const isMotionOkay = this.isMotionOkay();

			// Get delay.
			const delay = isMotionOkay ? ANIMATION_DURATION : 0;

			// Get scrollbar width.
			const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

			// Get active element.
			const activeElement = document.activeElement as HTMLElement;

			// Cache active element?
			if (this.isActive && activeElement) {
				this.activeElement = activeElement;
			}

			// =============
			// Modal active?
			// =============

			if (this.isActive) {
				// Show modal.
				this.modalScroll.style.display = BLOCK;

				// Hide scrollbar.
				document.documentElement.style.overflow = HIDDEN;

				// Add placeholder?
				if (scrollbarWidth) {
					document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
				}

				// Set flag.
				if (isMotionOkay) {
					this.isHideShow = true;
					this.modalScroll.setAttribute(DATA_IS_SHOW, String(true));
				}

				// Fire callback?
				if (typeof f === 'function') {
					f();
				}

				// Await CSS animation.
				this.timerForShow = window.setTimeout(() => {
					// Clear.
					clearTimeout(this.timerForShow);

					// Remove flag.
					this.isHideShow = false;
					this.modalScroll.removeAttribute(DATA_IS_SHOW);

					// Delay.
				}, delay);

				/*
				=====
				NOTE:
				=====

					We want to ensure that the modal is currently
					visible, because we do not want to put scroll
					back on the `<body>` unnecessarily.

					The reason is that another `<cta-modal>` in
					the page might have been pre-rendered with an
					`active="true"` attribute. If so, we want to
					leave the body's overflow value alone.
				*/
			} else if (isModalVisible) {
				// Set flag.
				if (isMotionOkay) {
					this.isHideShow = true;
					this.modalScroll.setAttribute(DATA_IS_HIDE, String(true));
				}

				// Await CSS animation.
				this.timerForHide = window.setTimeout(() => {
					// Clear.
					clearTimeout(this.timerForHide);

					// Remove flag.
					this.isHideShow = false;
					this.modalScroll.removeAttribute(DATA_IS_HIDE);

					// Hide modal.
					this.modalScroll.style.display = NONE;

					// Show scrollbar.
					document.documentElement.style.overflow = EMPTY_STRING;

					// Remove placeholder.
					document.documentElement.style.paddingRight = EMPTY_STRING;

					// Fire callback?
					if (typeof f === 'function') {
						f();
					}

					// Delay.
				}, delay);
			}
		}

		// =====================
		// Event: overlay click.
		// =====================

		handleClickOverlay(event: MouseEvent) {
			// Early exit.
			if (this.isHideShow || this.isStatic) {
				return;
			}

			// Get layer.
			const target = event.target as HTMLElement;

			// Outside modal?
			if (target.classList.contains('cta-modal__overlay')) {
				this.handleClickToggle();
			}
		}

		// ====================
		// Event: toggle modal.
		// ====================

		handleClickToggle(event?: MouseEvent | KeyboardEvent) {
			// Set later.
			let key = EMPTY_STRING;
			let target = null;

			// Event exists?
			if (event) {
				if (event.target) {
					target = event.target as HTMLElement;
				}

				// Get key.
				if ((event as KeyboardEvent).key) {
					key = (event as KeyboardEvent).key;
					key = key.toLowerCase();
				}
			}

			// Set later.
			let button;

			// Target exists?
			if (target) {
				// Direct click.
				if (target.classList.contains('cta-modal__close')) {
					button = target as HTMLButtonElement;

					// Delegated click.
				} else if (typeof target.closest === 'function') {
					button = target.closest('.cta-modal-toggle') as HTMLButtonElement;
				}
			}

			// Get booleans.
			const isValidEvent = event && typeof event.preventDefault === 'function';
			const isValidClick = !!(button && isValidEvent && !key);
			const isValidKey = !!(button && isValidEvent && [ENTER, SPACE].includes(key));

			const isButtonDisabled = !!(button && button.disabled);
			const isButtonMissing = !!(isValidEvent && !button);
			const isWrongKeyEvent = !!(key && !isValidKey);

			// Early exit.
			if (isButtonDisabled || isButtonMissing || isWrongKeyEvent) {
				return;
			}

			// Prevent default?
			if (isValidKey || isValidClick) {
				event.preventDefault();
			}

			// Set flag.
			this.isActive = !this.isActive;

			// Set display.
			this.toggleModalDisplay(() => {
				// Focus modal?
				if (this.isActive) {
					this.focusModal();

					// Return focus?
				} else if (this.activeElement) {
					this.focusElement(this.activeElement);
				}
			});
		}

		// =========================
		// Event: focus in document.
		// =========================

		handleFocusIn() {
			// Early exit.
			if (!this.isActive) {
				return;
			}

			// prettier-ignore
			const activeElement = (
				// Get active element.
				this.shadow.activeElement ||
				document.activeElement
			) as HTMLElement;

			// Get booleans.
			const isFocusTrap1 = activeElement === this.focusTrapList[0];
			const isFocusTrap2 = activeElement === this.focusTrapList[1];

			// Set later.
			let focusListReal: HTMLElement[] = [];

			// Slot exists?
			if (this.slotForModal) {
				// Get "real" elements.
				focusListReal = Array.from(
					this.slotForModal.querySelectorAll(FOCUSABLE_SELECTORS)
				) as HTMLElement[];
			}

			// Get "shadow" elements.
			const focusListShadow = Array.from(
				this.modal.querySelectorAll(FOCUSABLE_SELECTORS)
			) as HTMLElement[];

			// Get "total" elements.
			const focusListTotal = focusListShadow.concat(focusListReal);

			// Get first & last items.
			const focusItemFirst = focusListTotal[0];
			const focusItemLast = focusListTotal[focusListTotal.length - 1];

			// Focus trap: above?
			if (isFocusTrap1 && focusItemLast) {
				this.focusElement(focusItemLast);

				// Focus trap: below?
			} else if (isFocusTrap2 && focusItemFirst) {
				this.focusElement(focusItemFirst);

				// Outside modal?
			} else if (this.isOutsideModal(activeElement)) {
				this.focusModal();
			}
		}

		// =================
		// Event: key press.
		// =================

		handleKeyDown({ key }: KeyboardEvent) {
			// Early exit.
			if (!this.isActive) {
				return;
			}

			// Get key.
			key = key.toLowerCase();

			// Escape key?
			if (key === ESCAPE && !this.isHideShow && !this.isStatic) {
				this.handleClickToggle();
			}

			// Tab key?
			if (key === TAB) {
				this.handleFocusIn();
			}
		}
	}

	// ===============
	// Define element.
	// ===============

	window.addEventListener(DOM_CONTENT_LOADED, () => {
		window.customElements.define('cta-modal', CtaModal);
	});
}

// =========================
// END: if "customElements".
// =========================
