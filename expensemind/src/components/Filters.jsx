import React from 'react'
import { CATEGORIES, MOODS } from '../utils/calculations.js'

export default function Filters({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <input
        type="text"
        placeholder="Search notes..."
        value={filters.search}
        onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
        className="bg-ink-light border border-white/10 rounded-lg px-3 py-2 text-sm text-parchment focus:border-amber outline-none flex-1 min-w-[160px]"
      />
      <select
        value={filters.category}
        onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
        className="bg-ink-light border border-white/10 rounded-lg px-3 py-2 text-sm text-parchment focus:border-amber outline-none"
      >
        <option value="">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        value={filters.mood}
        onChange={(e) => setFilters((f) => ({ ...f, mood: e.target.value }))}
        className="bg-ink-light border border-white/10 rounded-lg px-3 py-2 text-sm text-parchment focus:border-amber outline-none"
      >
        <option value="">All moods</option>
        {MOODS.map((m) => (
          <option key={m.key} value={m.key}>
            {m.emoji} {m.label}
          </option>
        ))}
      </select>
    </div>
  )
}
