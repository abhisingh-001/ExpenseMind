import React from 'react'

const LEVEL_COLOR = {
  0: 'bg-white/5',
  1: 'bg-sage/70',
  2: 'bg-coral/70',
}

export default function StreakHeatmap({ heatmap, streak }) {
  // Group into weeks (columns of 7 days)
  const weeks = []
  for (let i = 0; i < heatmap.length; i += 7) {
    weeks.push(heatmap.slice(i, i + 7))
  }

  return (
    <div className="bg-ink-light rounded-xl border border-white/5 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-parchment">No-regret streak</h3>
        <div className="text-right">
          <p className="font-display text-2xl text-amber leading-none">{streak}</p>
          <p className="text-xs text-muted font-mono">day{streak === 1 ? '' : 's'}</p>
        </div>
      </div>
      <p className="text-xs text-muted mb-4">
        Streak breaks only when a spend is tagged <span className="text-coral">impulsive</span> or{' '}
        <span className="text-coral">regretted</span> — mindful days keep it alive.
      </p>
      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <div
                key={day.date}
                title={`${day.date} · ${day.count} entr${day.count === 1 ? 'y' : 'ies'}`}
                className={`w-3 h-3 rounded-sm ${LEVEL_COLOR[day.level]}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-3 text-xs text-muted">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-white/5 inline-block" /> no spend
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-sage/70 inline-block" /> mindful
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-coral/70 inline-block" /> regretted
        </span>
      </div>
    </div>
  )
}
