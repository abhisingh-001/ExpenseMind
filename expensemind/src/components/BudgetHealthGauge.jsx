import React from 'react'

function scoreColor(score) {
  if (score >= 70) return '#7FA98D'
  if (score >= 40) return '#E8A33D'
  return '#D9695F'
}

function scoreLabel(score) {
  if (score >= 70) return 'Thriving'
  if (score >= 40) return 'Steady'
  return 'Needs attention'
}

export default function BudgetHealthGauge({ score }) {
  const radius = 70
  const circumference = Math.PI * radius // semicircle
  const filled = (score / 100) * circumference
  const color = scoreColor(score)

  return (
    <div className="bg-ink-light rounded-xl border border-white/5 p-5 flex flex-col items-center">
      <h3 className="font-display text-lg text-parchment self-start mb-2">Budget health score</h3>
      <svg viewBox="0 0 180 100" className="w-full max-w-[220px]">
        <path
          d="M 10 90 A 80 80 0 0 1 170 90"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 10 90 A 80 80 0 0 1 170 90"
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
        <text x="90" y="78" textAnchor="middle" fontSize="30" fontFamily="Fraunces, serif" fill="#EDEAE3">
          {score}
        </text>
      </svg>
      <p className="text-sm mt-1" style={{ color }}>
        {scoreLabel(score)}
      </p>
      <p className="text-xs text-muted text-center mt-2">
        Blends your savings rate with how much spending was tagged mindful vs. impulsive.
      </p>
    </div>
  )
}
