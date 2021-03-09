import smoothscroll from "smoothscroll-polyfill"

import { focusOnFirstChild, onFocusModalTrap } from "./utils"

smoothscroll.polyfill()

function setupScrollBlur(el) {
  const targetEl = document.getElementById(el.dataset.scrollBlur)

  // Different ratios to handle weird iOS bug
  const ratio = window.innerWidth > 600 ? 0.25 : 0.025
  const threshold = [ratio]

  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      targetEl.classList.toggle("blur", entry.intersectionRatio >= ratio)
    })
  }

  new IntersectionObserver(handleIntersect, {
    root: null,
    rootMargin: "0px",
    threshold,
  }).observe(el)
}

function setupModal() {
  const modal = document.getElementById("modal")
  let openEl = null

  const handleDocClick = (event) => {
    if ("modal" in event.target.dataset) {
      closeModal()
    }
  }

  const onKeydown = (event) => {
    if (event.key === "Escape") {
      closeModal()
    }
  }

  const onFocus = () => onFocusModalTrap(modal)

  const removeListeners = () => {
    document.removeEventListener("click", handleDocClick)
    document.removeEventListener("keydown", onKeydown)
    document.removeEventListener("focus", onFocus)
  }

  const closeModal = () => {
    modal.classList.add("hidden")
    // Hide all section content
    modal
      .querySelectorAll("[data-section]:not(.hidden)")
      .forEach((el) => el.classList.add("hidden"))
    removeListeners()
    // Refocus to opener
    if (openEl) {
      openEl.focus()
      openEl = null
    }
  }

  const openModal = (sectionId) => {
    modal
      .querySelectorAll(`[data-section="${sectionId}"]`)
      .forEach((el) => el.classList.remove("hidden"))
    modal.classList.remove("hidden")
    focusOnFirstChild(modal)

    document.addEventListener("click", handleDocClick, false)
    document.addEventListener("keydown", onKeydown, false)
    document.addEventListener("focus", onFocus, true)
  }

  document.getElementById("close-modal").addEventListener("click", closeModal)

  document.querySelectorAll("[data-modal-section]").forEach((el) => {
    el.addEventListener("click", () => {
      openModal(el.dataset.modalSection)
      openEl = el
    })
  })
}

document.addEventListener("DOMContentLoaded", () => {
  setupModal()
  document.querySelectorAll("[data-scroll-blur]").forEach(setupScrollBlur)
})
