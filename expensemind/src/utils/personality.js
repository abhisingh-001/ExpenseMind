import { getCategoryBreakdown, getMoodBreakdown, getTotals } from './calculations.js'

/**
 * Derives a "spending personality" archetype from the user's own
 * logged data — no external benchmarks, purely self-referential.
 */
export function getSpendingPersonality(entries) {
  const expenseEntries = entries.filter((e) => e.type === 'expense')
  if (expenseEntries.length < 3) {
    return {
      title: 'Still Gathering Data',
      description: 'Log a few more expenses and tag their mood — your spending personality will reveal itself here.',
      emoji: '🔍',
      color: 'muted',
    }
  }

  const { income, expense } = getTotals(entries)
  const savingsRate = income > 0 ? (income - expense) / income : 0
  const moods = getMoodBreakdown(entries)
  const totalTagged = moods.reduce((s, m) => s + m.value, 0) || 1
  const impulsiveShare = (moods.find((m) => m.mood === 'Impulsive')?.value || 0) / totalTagged
  const regretShare = (moods.find((m) => m.mood === 'Regretted')?.value || 0) / totalTagged
  const necessaryShare = (moods.find((m) => m.mood === 'Necessary')?.value || 0) / totalTagged

  const categories = getCategoryBreakdown(entries).sort((a, b) => b.value - a.value)
  const topCategory = categories[0]?.name || 'Other'

  if (savingsRate > 0.4 && impulsiveShare < 0.15) {
    return {
      title: 'The Strategist',
      description: `You save over ${Math.round(savingsRate * 100)}% of your income and rarely spend on impulse. Your money moves with intention.`,
      emoji: '🧠',
      color: 'sage',
    }
  }

  if (regretShare > 0.25) {
    return {
      title: 'The Reflector',
      description: `A notable share of your spending gets tagged as regretted — mostly around ${topCategory}. Awareness is the first step; try a 24-hour pause before those buys.`,
      emoji: '🪞',
      color: 'coral',
    }
  }

  if (impulsiveShare > 0.3) {
    return {
      title: 'The Spontaneous Spender',
      description: `Impulsive buys make up a big share of your expenses, especially in ${topCategory}. You spend for the moment — just keep an eye on the streak.`,
      emoji: '⚡',
      color: 'amber',
    }
  }

  if (necessaryShare > 0.6) {
    return {
      title: 'The Pragmatist',
      description: `Most of what you spend is tagged necessary. Your money mostly goes where it has to — ${topCategory} leads the list.`,
      emoji: '⚖️',
      color: 'parchment',
    }
  }

  return {
    title: 'The Balanced Spender',
    description: `Your spending is a healthy mix across moods and categories, topped by ${topCategory}. No single pattern dominates.`,
    emoji: '🌤️',
    color: 'amber',
  }
}
