import {LitElement, html, render} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';

export function greet() {
    return `Hello!`;
}


var ignorePos=false
const foo = {
    cursor: {
        ctor(o) {
            //o.attachShadow({mode: 'open'});
        },
        mount(o) {
            var h=html`<div id="cursor" style="display: inline-block; min-width: 1ch; padding-left: 1px; background-color: cyan" contenteditable="plaintext-only"><br /></div>`

            render(h,o)

            setCursorToEnd(cursor)
        }
    },
    pos: {
        ctor(o) {
            o.index=o.getAttribute("i")
        },
        mount(o) {
            if (ignorePos) return
            var h=html`${o.index+""}`
            render(h,o)
        },
        unmount(o) {
            if (ignorePos) return
            cursor.render()
        }
    }
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
document.addEventListener('input', (e) => {
    return
    //debugger
    var x={
        target: e.target,
        value: e.target.value,
        data: e.data,
    }
    var it = e.inputType
    if (it==="deleteContentBackward") {
        log.innerText=log.innerText.slice(0,-1)

    } else {
        var d = x.data
        if (d===" ") {
            log.innerHTML+="&nbsp"
        } else {
            log.innerText += d
        }

    }
    //cursor.innerText="[]"
    setCursorToEnd(cursor)
}, true);
function on(typeString,evt,o) {
    foo[typeString][evt](o);
}
class X extends HTMLElement {
    constructor() {
        super();
        this.t=this.getAttribute("t")
        on(this.t,"ctor",this)
    }
    connectedCallback(){
        on(this.t,"mount",this)
    }
    disconnectedCallback(){
        on(this.t,"unmount",this)
    }
}
customElements.define('x-', X);
