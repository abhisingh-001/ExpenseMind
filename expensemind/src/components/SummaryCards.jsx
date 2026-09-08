import React from 'react'
import { formatCurrency } from '../utils/calculations.js'

function Card({ label, value, tone, sublabel }) {
  const toneColor = {
    sage: 'text-sage',
    coral: 'text-coral',
    amber: 'text-amber',
  }[tone]

  return (
    <div className="bg-ink-light rounded-xl border border-white/5 p-5 flex-1 min-w-[160px]">
      <p className="font-mono text-xs text-muted mb-2">{label}</p>
      <p className={`font-display text-2xl ${toneColor}`}>{formatCurrency(value)}</p>
      {sublabel && <p className="text-xs text-muted mt-1">{sublabel}</p>}
    </div>
  )
}

export default function SummaryCards({ totals, monthlyBalance }) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <Card label="Total income" value={totals.income} tone="sage" />
      <Card label="Total expenses" value={totals.expense} tone="coral" />
      <Card
        label="Overall balance"
        value={totals.balance}
        tone={totals.balance >= 0 ? 'sage' : 'coral'}
        sublabel={`This month: ${formatCurrency(monthlyBalance)}`}
      />
    </div>
  )
}
