import React, { useState } from 'react'
import Modal from './Modal.jsx'

const SECTIONS = [
  {
    id: 'start',
    title: 'Getting started',
    icon: '🚀',
    body: (
      <>
        <p>ExpenseMind is your personal, private expense diary — everything you enter stays on your own device (no server, no account).</p>
        <ol className="list-decimal list-inside space-y-1 mt-2 text-sm">
          <li>Click <strong className="text-amber">+ Add entry</strong> to log your first income or expense.</li>
          <li>For expenses, pick a category and tag the <strong>mood</strong> behind the spend — that's what powers the insights below.</li>
          <li>Keep logging daily. The dashboard fills in automatically as you go.</li>
        </ol>
      </>
    ),
  },
  {
    id: 'mood',
    title: 'Why tag a "mood"?',
    icon: '🎭',
    body: (
      <p>
        Most trackers only ask <em>how much</em> and <em>what category</em>. ExpenseMind also asks{' '}
        <em>how the spend felt</em>: Necessary, Happy spend, Impulsive, Stressed, or Regretted. This single extra
        tap is what turns a plain transaction log into the personality, health-score, and streak insights —
        without it, those cards won't have much to say.
      </p>
    ),
  },
  {
    id: 'summary',
    title: 'Summary cards',
    icon: '💳',
    body: (
      <p>
        The three cards at the top show <strong>total income</strong>, <strong>total expenses</strong>, and your{' '}
        <strong>overall balance</strong> (with this month's balance shown underneath). These update instantly as
        you add, edit, or delete entries.
      </p>
    ),
  },
  {
    id: 'personality',
    title: 'Spending personality',
    icon: '🧠',
    body: (
      <p>
        Once you've logged at least 3 expenses, this card analyzes your savings rate and mood ratios to give you
        an archetype — e.g. <em>The Strategist</em> (high savings, rarely impulsive), <em>The Reflector</em>{' '}
        (spending often tagged regretted), or <em>The Spontaneous Spender</em> (lots of impulsive buys). It's
        based entirely on your own data, not compared to anyone else.
      </p>
    ),
  },
  {
    id: 'health',
    title: 'Budget health score',
    icon: '🩺',
    body: (
      <p>
        A single 0–100 score shown as a gauge. It blends two things: how much of your income you're keeping
        (savings rate) and how much of your spending was mindful rather than impulsive/regretted. Above 70 is{' '}
        <span className="text-sage">Thriving</span>, 40–70 is <span className="text-amber">Steady</span>, below
        40 <span className="text-coral">Needs attention</span>.
      </p>
    ),
  },
  {
    id: 'streak',
    title: 'No-regret streak',
    icon: '🔥',
    body: (
      <p>
        A GitHub-style heatmap of your last 12 weeks. Each square is a day: grey means no spending logged, green
        means you spent but stayed mindful, red means that day included an impulsive or regretted spend. The
        streak counter (top-right) counts consecutive days — including today — without a red day. It resets the
        day you tag a spend as impulsive or regretted, gently nudging you toward mindful spending rather than
        just "spend nothing."
      </p>
    ),
  },
  {
    id: 'charts',
    title: 'Charts',
    icon: '📊',
    body: (
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li><strong>Spending by category</strong> — a donut chart of where your money goes (Food, Bills, Shopping, etc).</li>
        <li><strong>Last 14 days</strong> — a trend area chart of daily spending, useful for spotting spikes.</li>
        <li><strong>Spending by mood</strong> — a bar chart showing how much money sits behind each mood tag.</li>
      </ul>
    ),
  },
  {
    id: 'list',
    title: 'Transactions list',
    icon: '📋',
    body: (
      <p>
        Every entry appears here, newest first. Use the search box to find a note, or the dropdowns to filter by
        category or mood. Hover a row to reveal <strong>Edit</strong> and <strong>Delete</strong>.
      </p>
    ),
  },
  {
    id: 'backup',
    title: 'Backup, import & starting fresh',
    icon: '💾',
    body: (
      <p>
        Your data lives in the browser's LocalStorage, tied to this device and browser only. Click{' '}
        <strong>Export backup</strong> anytime to download a JSON copy, and <strong>Import</strong> to restore it
        (or move it to another browser/device). Nothing is ever sent to a server.
      </p>
    ),
  },
]

export default function GuideModal({ onClose }) {
  const [openId, setOpenId] = useState('start')

  return (
    <Modal title="How ExpenseMind works" onClose={onClose}>
      <div className="max-h-[65vh] overflow-y-auto pr-1 -mr-1 space-y-2">
        {SECTIONS.map((s) => {
          const isOpen = openId === s.id
          return (
            <div key={s.id} className="border border-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenId(isOpen ? null : s.id)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-left bg-ink hover:bg-ink-lighter transition-colors"
              >
                <span className="flex items-center gap-2 text-sm text-parchment">
                  <span aria-hidden="true">{s.icon}</span>
                  {s.title}
                </span>
                <span className="text-muted text-xs">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="px-3 py-3 text-muted bg-ink-light leading-relaxed">{s.body}</div>
              )}
            </div>
          )
        })}
      </div>
      <p className="text-xs text-muted mt-4 text-center">
        You can reopen this guide anytime from the <span className="text-amber">❓ How to use</span> button.
      </p>
    </Modal>
  )
}
