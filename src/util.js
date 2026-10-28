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