const isPrimitive = x => ['number', 'string', 'boolean'].includes(typeof x);
class Custom extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadow.appendChild(document.importNode(this.newTag.content, true));
  }
  get newTag () {
    return this.constructor.newTag;
  }
  static get observedAttributes() {
    return this.newTag.attrs || [];
  }
}
function customFrom(newTag) {
  class NewCustom extends Custom {}
  NewCustom.newTag = newTag;
  NewCustom.observedAttributes.forEach(attr =>
    Object.defineProperty(NewCustom.prototype, attr, {
      get () {
        return this.getAttribute(attr);
      },
      set (x) {
        if (!isPrimitive(x)) {
          throw new TypeError(`${attr} must be primitive`);
        }
        this.setAttribute(attr, x);
      }
    })
  );
  return NewCustom;
}
customElements.define('new-tag', class NewTag extends HTMLElement {
  connectedCallback() {
    customElements.define(this.getAttribute('tag-name'), customFrom(this));
  }
  get content () {
    return this.querySelector('template').content;
  }
  get attrs () {
    return this.getAttribute('attrs').split(',').map(x => x.trim());
  }
});
