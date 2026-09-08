import React from 'react'
import { useExpenses } from '../context/ExpenseContext.jsx'

export default function EmptyState({ onAddClick, onGuideClick }) {
  const { dispatch } = useExpenses()

  return (
    <div className="bg-ink-light rounded-xl border border-dashed border-white/15 p-10 text-center mb-8">
      <p className="text-4xl mb-3" aria-hidden="true">📖</p>
      <h2 className="font-display text-2xl text-parchment mb-2">Your financial diary is empty</h2>
      <p className="text-muted text-sm max-w-md mx-auto mb-6">
        Log your first income or expense to start seeing your spending personality, budget health score, and
        no-regret streak build up over time.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onAddClick}
          className="text-sm px-5 py-2.5 rounded-lg bg-amber text-ink font-semibold hover:bg-amber-soft transition-colors"
        >
          + Add your first entry
        </button>
        <button
          onClick={() => dispatch({ type: 'LOAD_DEMO' })}
          className="text-sm px-5 py-2.5 rounded-lg border border-white/15 text-muted hover:text-parchment hover:border-white/30 transition-colors"
        >
          Try with sample data
        </button>
        <button
          onClick={onGuideClick}
          className="text-sm px-5 py-2.5 rounded-lg border border-amber/40 text-amber hover:bg-amber/10 transition-colors"
        >
          ❓ How does this work?
        </button>
      </div>
    </div>
  )
}
