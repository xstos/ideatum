import {LitElement, html, render} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';

var ignorePos = false
const foo = {
    cursor: {
        ctor(o) {
            //o.attachShadow({mode: 'open'});
        },
        mount(o) {
            var h = html`<div id="cursorInput"
                              tabindex="-1"
                     style="display: inline-block;
                             caret-shape: block;
                             min-width: 1ch;
                             padding-left: 0px;
                             border: 1px solid white;"
                     contenteditable="plaintext-only"></div>`;
            function _render() {
                render(h,o)
                setCursorToEnd(cursorInput)
            }
            o.render=_render
            console.log("cursor mounted")
        },
        unmount(o) {

        }
    }

}

function on(typeString, evt, o) {
    foo[typeString][evt](o);
}

class X extends HTMLElement {
    constructor() {
        super();
        this.t = this.getAttribute("t")
        on(this.t, "ctor", this)
    }

    connectedCallback() {
        on(this.t, "mount", this)
    }

    disconnectedCallback() {
        on(this.t, "unmount", this)
    }
}

customElements.define('x-', X);

export function removeCommentsFromFragment(fragment) {
    const walker = document.createTreeWalker(
        fragment,
        NodeFilter.SHOW_COMMENT,
        null
    );

    const commentNodes = [];
    while (walker.nextNode()) {
        commentNodes.push(walker.currentNode);
    }

    commentNodes.forEach(node => node.parentNode.removeChild(node));
    return fragment;
}

export function setCursorToEnd(element) {
    // Focus the contenteditable element first
    element.focus();

    // Create a new range and get the current window selection
    const range = document.createRange();
    const selection = window.getSelection();

    // Select all the content inside the element
    range.selectNodeContents(element);

    // Collapse the range to the very end (false means collapse to end)
    range.collapse(false);

    // Clear any existing selections and apply the new range
    selection.removeAllRanges();
    selection.addRange(range);
}