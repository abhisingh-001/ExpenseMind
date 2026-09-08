import React from 'react'
import { MOODS, formatCurrency } from '../utils/calculations.js'
import { useExpenses } from '../context/ExpenseContext.jsx'

export default function ExpenseItem({ entry, onEdit }) {
  const { dispatch } = useExpenses()
  const mood = MOODS.find((m) => m.key === entry.mood)
  const isIncome = entry.type === 'income'

  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-white/5 last:border-0 group">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-xl shrink-0">{isIncome ? '💰' : mood?.emoji || '🧾'}</span>
        <div className="min-w-0">
          <p className="text-parchment text-sm truncate">{entry.note || entry.category}</p>
          <p className="text-xs text-muted font-mono">
            {entry.category} · {entry.date}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className={`font-mono text-sm ${isIncome ? 'text-sage' : 'text-coral'}`}>
          {isIncome ? '+' : '-'}
          {formatCurrency(entry.amount)}
        </span>
        <button
          onClick={() => onEdit(entry)}
          className="opacity-0 group-hover:opacity-100 text-muted hover:text-amber text-xs transition-opacity"
        >
          Edit
        </button>
        <button
          onClick={() => dispatch({ type: 'DELETE', payload: entry.id })}
          className="opacity-0 group-hover:opacity-100 text-muted hover:text-coral text-xs transition-opacity"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
