# CTA Modal 🦒

CTA Modal is a self-contained call to action [ARIA modal](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html), built as a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components). It has zero runtime dependencies beyond a single JavaScript file, and only requires authoring HTML to use.

- To see it in action, check out the [demo page](https://host.sonspring.com/cta-modal/).

- All the TypeScript code is well tested, with 💯 [coverage](https://host.sonspring.com/cta-modal/coverage/cta-modal.ts.html).

- The compiled [cta-modal.js](https://host.sonspring.com/cta-modal/dist/cta-modal.js) file is less than 10 kilobytes.

- You can view the source code on [GitHub](https://github.com/nathansmith/cta-modal).

---

## How to use: install

If you are using [Node](https://nodejs.org/en/) with [NPM](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/)) the install would look something like this.

```bash
# NPM.
npm install cta-modal
```

```bash
# Yarn.
yarn add cta-modal
```

Then simply import it into your own `*.js` or `*.ts` file.

```javascript
// Node.
require('cta-modal');
```

```javascript
// ES6.
import 'cta-modal';
```

---

## How to use: flat file

If you are building a site where you want to include CTA Modal directly, then download the [cta-modal.js](https://host.sonspring.com/cta-modal/dist/cta-modal.js) file and reference it within your own `*.html` file.

```html
<head>
  <script src="/path/to/cta-modal.js"></script>
</head>
```

**Note:** Alternatively, you can put the `script` at the end of your page, before the closing `</body>` tag.

But you may see a flash of unstyled content, before the JS is parsed and attaches to the `<cta-modal>` tag. Placing it in the `<head>` ensures that the JS is parsed _ahead_ of time (no pun intended).

---

## How to use: basics

After ensuring the JS is loaded in your code, all you need to do is type HTML like so.

The rest of the details are abstracted away. Additional accessibility hooks are added automatically.

<!-- prettier-ignore -->
```html
<cta-modal>

  <div slot="button">
    <p>
      <button
        class="cta-modal-toggle"
        type="button"
      >Open modal</button>
    </p>
  </div>

  <div slot="modal">
    <h2>Modal title</h2>
    <p>Modal content</p>
    <p>
      <button
        class="cta-modal-toggle"
        type="button"
      >Close modal</button>
    </p>
  </div>

</cta-modal>
```

**Note:** The inner tags with `slot` attributes yield specific functionality. Beyond that, any markup you want can go inside each of them.

- `<div slot="button">` is **optional**.

  It contains anything you want shown in the _page_ (not in the _modal_).

- `<div slot="modal">` is **required**.

  It contains anything you want shown in the _modal_ (not in the _page_).

If you do not include a `slot="button"` element, then you will need to manually control setting the `<cta-modal active="true">` attribute yourself.

---

## How to use: extras

There are a few optional attributes that can be set on the `<cta-modal>` tag.

<!-- prettier-ignore -->
```html
<cta-modal
  active="true"

  animated="false"

  close="Get outta here!"

  static="true"
>
  <!-- etc. -->
</cta-modal>
```

- `active="true"` — Implicitly `false` by default.

  You can use this to force a modal to display, without a user clicking anything.

  I suggest using this sparingly, because we all know that unexpected modals can be annoying.

- `animated="false"` — Implicitly `true` by default.

  This will cause the modal to hide/show immediately, without a fade animation.

  If a user has their operating system's preference set for `prefers-reduced-motion` the animation will be disabled regardless of the flag.

- `close="TEXT HERE"` — Implicitly `"Close"` by default.

  You can use this attribute to localize the text string shown in the close button's `title="Close"` tooltip.

  Whatever you put here will be shown on mouse hover, and will be read aloud to [screen readers](https://en.wikipedia.org/wiki/Screen_reader).

- `static="true"` — Implicitly `false` by default.

  This will prevent clicks on the page overlay from triggering a modal close.

  Additionally, the `escape` key will be ignored. Whereas, normally that key would also dismiss the modal.

---

## How to use: styling

If you want to override the default styles of the modal, that needs to be done via CSS variables. The reason for this is Web Components use the [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) which does not inherit styles from the parent page.

The following variables have been set to their default values. Feel free to tweak them to your liking.

```css
cta-modal {
  /* Modal overlay. */
  --cta-modal-overlay-background-color: rgba(0, 0, 0, 0.5);
  --cta-modal-overlay-padding-top: 20px;
  --cta-modal-overlay-padding-left: 20px;
  --cta-modal-overlay-padding-right: 20px;
  --cta-modal-overlay-padding-bottom: 20px;
  --cta-modal-overlay-z-index: 100000;

  /* Modal window. */
  --cta-modal-background-color: #fff;
  --cta-modal-border-radius: 5px;
  --cta-modal-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5);
  --cta-modal-padding-top: 20px;
  --cta-modal-padding-left: 20px;
  --cta-modal-padding-right: 20px;
  --cta-modal-padding-bottom: 20px;
  --cta-modal-width: 500px;

  /* Modal close button. */
  --cta-modal-close-color: #fff;
  --cta-modal-close-background-color: #000;
  --cta-modal-close-border-radius: 50%;
  --cta-modal-close-box-shadow: 0 0 0 1px #fff;
  --cta-modal-close-display: block;
  --cta-modal-close-font-family: 'Arial', sans-serif;
  --cta-modal-close-font-size: 23px;
  --cta-modal-close-line-height: 26px;
  --cta-modal-close-width: 26px;

  /* Modal close button - hover. */
  --cta-modal-close-color-hover: #000;
  --cta-modal-close-background-color-hover: #fff;
  --cta-modal-close-box-shadow-hover: 0 0 0 1px #000;
}
```

### Styling content

If you want to target content that is displayed within a modal, you can use a descendant selector scoped to the context of the `cta-modal` tag.

For instance: Let's say you want to make all content within the `slot="button"` area blue, and wanted to make all the content within the `slot="modal"` area red. That would look something like this.

```css
cta-modal [slot='button'] {
  color: blue;
}

cta-modal [slot='modal'] {
  color: red;
}
```

### No close button

Here is another scenario. Perhaps you want to have a static modal, with only a single toggle trigger to close it. If you intend to provide that yourself, you can hide the default close button with CSS such as this.

```css
cta-modal[static='true'] {
  --cta-modal-close-display: none;
}
```

### Dark mode

If you want to provide a different set of style overrides for users who prefer [dark mode](https://css-tricks.com/dark-modes-with-css/), you can scope your selector within a media query. This would make the modal background dark gray.

```css
@media (prefers-color-scheme: dark) {
  cta-modal {
    --cta-modal-background-color: #333;

    /* Dark mode overrides here. */
  }
}
```

Or, you could scope the selector to a specific extra attribute of your choosing. Let's say some modals in your page need to be dark, whereas others do not. You might consider this approach.

```css
cta-modal {
  --cta-modal-background-color: #fff;

  /* Default overrides here. */
}

cta-modal[theme='dark'] {
  --cta-modal-background-color: #333;

  /* Dark mode overrides here. */
}
```

---

Created by [Nathan Smith](http://twitter.com/nathansmith). Licensed under [MIT](https://en.wikipedia.org/wiki/MIT_License) and [GPL](https://en.wikipedia.org/wiki/GNU_General_Public_License).
