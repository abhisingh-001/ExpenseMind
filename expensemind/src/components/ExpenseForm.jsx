import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Modal from './Modal.jsx'
import { useExpenses } from '../context/ExpenseContext.jsx'
import { CATEGORIES, MOODS, todayISO } from '../utils/calculations.js'

const EMPTY = {
  type: 'expense',
  amount: '',
  category: 'Food',
  mood: 'necessary',
  note: '',
  date: todayISO(),
}

export default function ExpenseForm({ editingEntry, onClose }) {
  const { dispatch } = useExpenses()
  const [form, setForm] = useState(editingEntry || EMPTY)
  const [error, setError] = useState('')

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.amount || Number(form.amount) <= 0) {
      setError('Enter an amount greater than zero.')
      return
    }
    if (!form.date) {
      setError('Pick a date.')
      return
    }

    const entry = {
      ...form,
      amount: Number(form.amount),
      id: editingEntry ? editingEntry.id : uuidv4(),
      category: form.type === 'income' ? 'Income' : form.category,
    }

    dispatch({ type: editingEntry ? 'UPDATE' : 'ADD', payload: entry })
    onClose()
  }

  return (
    <Modal title={editingEntry ? 'Edit entry' : 'Add entry'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex rounded-lg overflow-hidden border border-white/10">
          {['expense', 'income'].map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => update('type', t)}
              className={`flex-1 py-2 text-sm capitalize transition-colors ${
                form.type === t ? 'bg-amber text-ink font-semibold' : 'bg-transparent text-muted hover:text-parchment'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-xs font-mono text-muted mb-1">Amount (₹)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={(e) => update('amount', e.target.value)}
            className="w-full bg-ink border border-white/10 rounded-lg px-3 py-2 text-parchment focus:border-amber outline-none"
            placeholder="0"
          />
        </div>

        {form.type === 'expense' && (
          <div>
            <label className="block text-xs font-mono text-muted mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className="w-full bg-ink border border-white/10 rounded-lg px-3 py-2 text-parchment focus:border-amber outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}

        {form.type === 'expense' && (
          <div>
            <label className="block text-xs font-mono text-muted mb-1">How did this spend feel?</label>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <button
                  type="button"
                  key={m.key}
                  onClick={() => update('mood', m.key)}
                  className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                    form.mood === m.key
                      ? 'border-amber text-amber bg-amber/10'
                      : 'border-white/10 text-muted hover:text-parchment'
                  }`}
                >
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-mono text-muted mb-1">Note</label>
          <input
            type="text"
            value={form.note}
            onChange={(e) => update('note', e.target.value)}
            className="w-full bg-ink border border-white/10 rounded-lg px-3 py-2 text-parchment focus:border-amber outline-none"
            placeholder="Optional note"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-muted mb-1">Date</label>
          <input
            type="date"
            value={form.date}
            max={todayISO()}
            onChange={(e) => update('date', e.target.value)}
            className="w-full bg-ink border border-white/10 rounded-lg px-3 py-2 text-parchment focus:border-amber outline-none"
          />
        </div>

        {error && <p className="text-coral text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-amber text-ink font-semibold hover:bg-amber-soft transition-colors"
        >
          {editingEntry ? 'Save changes' : 'Add entry'}
        </button>
      </form>
    </Modal>
  )
}
