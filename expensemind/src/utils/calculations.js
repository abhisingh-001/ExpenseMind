export const CATEGORIES = ['Food', 'Travel', 'Bills', 'Shopping', 'Health', 'Entertainment', 'Other']

export const MOODS = [
  { key: 'necessary', label: 'Necessary', emoji: '🧾' },
  { key: 'happy', label: 'Happy spend', emoji: '😄' },
  { key: 'impulsive', label: 'Impulsive', emoji: '⚡' },
  { key: 'stressed', label: 'Stressed', emoji: '😣' },
  { key: 'regret', label: 'Regretted', emoji: '😞' },
]

export function todayISO(d = new Date()) {
  return d.toISOString().slice(0, 10)
}

export function getTotals(entries) {
  let income = 0
  let expense = 0
  for (const e of entries) {
    if (e.type === 'income') income += Number(e.amount)
    else expense += Number(e.amount)
  }
  return { income, expense, balance: income - expense }
}

export function getMonthlyTotals(entries, monthStr) {
  const filtered = entries.filter((e) => e.date.slice(0, 7) === monthStr)
  return getTotals(filtered)
}

export function getCategoryBreakdown(entries) {
  const map = {}
  for (const e of entries) {
    if (e.type !== 'expense') continue
    map[e.category] = (map[e.category] || 0) + Number(e.amount)
  }
  return Object.entries(map).map(([name, value]) => ({ name, value }))
}

export function getMoodBreakdown(entries) {
  const map = {}
  for (const e of entries) {
    if (e.type !== 'expense') continue
    const mood = e.mood || 'necessary'
    map[mood] = (map[mood] || 0) + Number(e.amount)
  }
  return MOODS.map((m) => ({ mood: m.label, emoji: m.emoji, value: map[m.key] || 0 }))
}

export function getDailyTrend(entries, days = 14) {
  const result = []
  const today = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const iso = todayISO(d)
    const dayTotal = entries
      .filter((e) => e.date === iso && e.type === 'expense')
      .reduce((sum, e) => sum + Number(e.amount), 0)
    result.push({ date: iso.slice(5), amount: dayTotal })
  }
  return result
}

/**
 * No-spend streak: counts consecutive days (ending today) where
 * no "impulsive" or "regret" mood expense was logged. Rewards
 * mindful spending rather than zero spending.
 */
export function getNoRegretStreak(entries) {
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const iso = todayISO(d)
    const dayEntries = entries.filter((e) => e.date === iso && e.type === 'expense')
    const hadRegret = dayEntries.some((e) => e.mood === 'impulsive' || e.mood === 'regret')
    if (hadRegret) break
    streak += 1
  }
  return streak
}

/**
 * Builds a 12-week heatmap grid (like a contribution graph) marking
 * each day as: no spending logged, mindful spending, or regretted spending.
 */
export function getHeatmapData(entries, weeks = 12) {
  const days = []
  const today = new Date()
  const totalDays = weeks * 7
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const iso = todayISO(d)
    const dayEntries = entries.filter((e) => e.date === iso && e.type === 'expense')
    let level = 0 // 0 = no spend, 1 = mindful, 2 = regretted
    if (dayEntries.length > 0) {
      const hadRegret = dayEntries.some((e) => e.mood === 'impulsive' || e.mood === 'regret')
      level = hadRegret ? 2 : 1
    }
    days.push({ date: iso, level, count: dayEntries.length })
  }
  return days
}

/**
 * Budget Health Score (0-100): blends savings rate, spending
 * consistency, and mindful-spend ratio into a single number.
 */
export function getBudgetHealthScore(entries) {
  const { income, expense } = getTotals(entries)
  if (income === 0 && expense === 0) return 50

  const savingsRate = income > 0 ? Math.max(0, Math.min(1, (income - expense) / income)) : 0
  const savingsScore = savingsRate * 60

  const expenseEntries = entries.filter((e) => e.type === 'expense')
  const regretCount = expenseEntries.filter((e) => e.mood === 'impulsive' || e.mood === 'regret').length
  const mindfulRatio = expenseEntries.length > 0 ? 1 - regretCount / expenseEntries.length : 1
  const mindfulScore = mindfulRatio * 40

  return Math.round(Math.max(0, Math.min(100, savingsScore + mindfulScore)))
}

export function formatCurrency(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
    Number(n) || 0
  )
}
