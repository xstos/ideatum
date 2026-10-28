import {LitElement, html, render} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import {removeCommentsFromFragment, setCursorToEnd} from "./util.js";
import {dummy} from "./foo.js";
function myTemplate() {
    return html`<x- id="cursor" t="cursor"/>`;
}

render(myTemplate(), app);
cursor.render()
document.addEventListener("input",onInput)
document.addEventListener("keydown",onKeyDown)
window.addEventListener("focus", onFocus)
//document.addEventListener("focusout", onLostFocus)

function focusCursor() {
    setCursorToEnd(cursorInput)
}
function onFocus(e) {
    //console.log("focus",e)
    focusCursor()
}
function onLostFocus(e) {
    //console.log("lostFocus",e)
    focusCursor()
}
function cursorIsFocused() {
    return document.activeElement === cursorInput
}
function onInput(e) {
    if (!cursorIsFocused()) return;
    const txt = cursorInput.textContent
    //console.log(txt)
    if (txt.length<1) return
    const fragment = document.createDocumentFragment();
    const chars = [...txt]
    const spans = chars.map(c=>html`<span>${c}</span>`)
    const h =html`${spans}`
    render(h,fragment)
    removeCommentsFromFragment(fragment)
    cursor.before(fragment)
    cursorInput.innerHTML=""
}
function onKeyDown(e) {
    var k = e.key
    if (k==="Control" || k==="Alt" || k==="Shift") return
    if (e.shiftKey) k = "Shift+" + k
    if (e.altKey) k = "Alt+" + k
    if (e.ctrlKey) k = "Control+" + k

    console.log(k)
    if (!cursorIsFocused()) {
        if (k==="Escape") {
            focusCursor()
        }
    }

    if (k === "Backspace") {
        var sib = cursor.previousElementSibling
        if (!sib) {
            return;
        }
        sib.remove()
    }
    else if (k === "Delete") {
        var sib = cursor.nextElementSibling
        if (!sib) {
            return;
        }
        sib.remove()
    }
    else if (k === "ArrowLeft") {
        var sib = cursor.previousElementSibling
        if (!sib) {
            return;
        }
        sib.before(cursor)
        focusCursor()
    }
    else if (k === "ArrowRight") {
        var sib = cursor.nextElementSibling
        if (!sib) {
            return;
        }
        sib.after(cursor)
        focusCursor()
    } else if (k === "Control+Enter") {

    } else if (k==="Enter") {
        var el = document.createElement("br")
        cursor.before(el)
        e.preventDefault()
    }
}