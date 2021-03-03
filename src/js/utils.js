const FOCUSABLE = `button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]):not([data-focus-trap])`

export function focusOnFirstChild(el) {
  const focusable = el.querySelector(FOCUSABLE)
  if (focusable) {
    focusable.focus()
  }
}

// Trap focus inside a modal between two invisible, focusable nodes with the attribute
// "data-focus-trap" and tabindex="0"
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html
export function onFocusModalTrap(modal) {
  if (modal.contains(document.activeElement)) {
    const focusable = modal.querySelector(FOCUSABLE)
    if ("focusTrap" in document.activeElement.dataset && focusable) {
      focusable.focus()
    }
  }
}
