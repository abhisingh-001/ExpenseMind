import React from 'react'

export default function PersonalityCard({ personality }) {
  return (
    <div className="bg-gradient-to-br from-ink-lighter to-ink-light rounded-xl border border-white/5 p-5">
      <p className="font-mono text-xs text-muted mb-3">your spending personality</p>
      <div className="flex items-start gap-3">
        <span className="text-3xl">{personality.emoji}</span>
        <div>
          <h3 className="font-display text-xl text-parchment">{personality.title}</h3>
          <p className="text-sm text-muted mt-1 leading-relaxed">{personality.description}</p>
        </div>
      </div>
    </div>
  )
}
