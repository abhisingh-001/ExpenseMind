import React, { useMemo, useState } from 'react'
import ExpenseItem from './ExpenseItem.jsx'
import Filters from './Filters.jsx'
import ExpenseForm from './ExpenseForm.jsx'
import { useExpenses } from '../context/ExpenseContext.jsx'

export default function ExpenseList() {
  const { state } = useExpenses()
  const [filters, setFilters] = useState({ search: '', category: '', mood: '' })
  const [editingEntry, setEditingEntry] = useState(null)

  const filtered = useMemo(() => {
    return [...state.entries]
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .filter((e) => {
        if (filters.category && e.category !== filters.category) return false
        if (filters.mood && e.mood !== filters.mood) return false
        if (filters.search && !e.note?.toLowerCase().includes(filters.search.toLowerCase())) return false
        return true
      })
  }, [state.entries, filters])

  return (
    <div className="bg-ink-light rounded-xl border border-white/5 p-5">
      <h3 className="font-display text-lg text-parchment mb-4">Transactions</h3>
      <Filters filters={filters} setFilters={setFilters} />
      <div className="max-h-[420px] overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <p className="text-muted text-sm py-6 text-center">No entries match — try a different filter, or add one.</p>
        ) : (
          filtered.map((entry) => <ExpenseItem key={entry.id} entry={entry} onEdit={setEditingEntry} />)
        )}
      </div>

      {editingEntry && <ExpenseForm editingEntry={editingEntry} onClose={() => setEditingEntry(null)} />}
    </div>
  )
}
