import React from 'react'
import { exportAsFile } from '../utils/localStorage.js'
import { useExpenses } from '../context/ExpenseContext.jsx'
import Logo from './Logo.jsx'

export default function Header({ onAddClick, onGuideClick }) {
  const { state, dispatch } = useExpenses()

  function handleImport(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result)
        if (parsed && Array.isArray(parsed.entries)) {
          dispatch({ type: 'IMPORT', payload: parsed.entries })
        }
      } catch (err) {
        alert('Invalid backup file.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6 mb-8">
      <div className="flex items-center gap-3">
        <Logo size={40} />
        <div>
          <p className="font-mono text-xs tracking-wide text-amber/80 mb-1">your financial diary</p>
          <h1 className="font-display text-3xl sm:text-4xl text-parchment leading-none">ExpenseMind</h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onGuideClick}
          className="text-sm px-3 py-2 rounded-lg border border-amber/40 text-amber hover:bg-amber/10 transition-colors flex items-center gap-1.5"
        >
          <span aria-hidden="true">❓</span> How to use
        </button>
        <label className="cursor-pointer text-sm px-3 py-2 rounded-lg border border-white/15 text-muted hover:text-parchment hover:border-white/30 transition-colors">
          Import
          <input type="file" accept="application/json" className="hidden" onChange={handleImport} />
        </label>
        <button
          onClick={() => exportAsFile(state)}
          className="text-sm px-3 py-2 rounded-lg border border-white/15 text-muted hover:text-parchment hover:border-white/30 transition-colors"
        >
          Export backup
        </button>
        <button
          onClick={onAddClick}
          className="text-sm px-4 py-2 rounded-lg bg-amber text-ink font-semibold hover:bg-amber-soft transition-colors"
        >
          + Add entry
        </button>
      </div>
    </header>
  )
}
