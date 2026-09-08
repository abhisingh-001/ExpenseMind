import React, { useEffect } from 'react'

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-ink-light border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl text-parchment">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-muted hover:text-parchment text-xl leading-none"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
