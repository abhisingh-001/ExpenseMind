import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import SummaryCards from './components/SummaryCards.jsx'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import CategoryPieChart from './components/charts/CategoryPieChart.jsx'
import TrendLineChart from './components/charts/TrendLineChart.jsx'
import MoodBarChart from './components/charts/MoodBarChart.jsx'
import StreakHeatmap from './components/StreakHeatmap.jsx'
import BudgetHealthGauge from './components/BudgetHealthGauge.jsx'
import PersonalityCard from './components/PersonalityCard.jsx'
import GuideModal from './components/GuideModal.jsx'
import EmptyState from './components/EmptyState.jsx'
import { useExpenses } from './context/ExpenseContext.jsx'
import {
  getTotals,
  getMonthlyTotals,
  getCategoryBreakdown,
  getMoodBreakdown,
  getDailyTrend,
  getNoRegretStreak,
  getHeatmapData,
  getBudgetHealthScore,
  todayISO,
} from './utils/calculations.js'
import { getSpendingPersonality } from './utils/personality.js'

const GUIDE_SEEN_KEY = 'expensemind_seen_guide'

export default function App() {
  const { state, dispatch } = useExpenses()
  const [showForm, setShowForm] = useState(false)
  const [showGuide, setShowGuide] = useState(false)

  const isEmpty = state.entries.length === 0

  // Auto-open the guide once for brand-new visitors so they know what
  // the app does before they type anything in.
  useEffect(() => {
    const seen = window.localStorage.getItem(GUIDE_SEEN_KEY)
    if (!seen) {
      setShowGuide(true)
      window.localStorage.setItem(GUIDE_SEEN_KEY, '1')
    }
  }, [])

  const totals = useMemo(() => getTotals(state.entries), [state.entries])
  const monthlyTotals = useMemo(() => getMonthlyTotals(state.entries, todayISO().slice(0, 7)), [state.entries])
  const categoryData = useMemo(() => getCategoryBreakdown(state.entries), [state.entries])
  const moodData = useMemo(() => getMoodBreakdown(state.entries), [state.entries])
  const trendData = useMemo(() => getDailyTrend(state.entries), [state.entries])
  const streak = useMemo(() => getNoRegretStreak(state.entries), [state.entries])
  const heatmap = useMemo(() => getHeatmapData(state.entries), [state.entries])
  const healthScore = useMemo(() => getBudgetHealthScore(state.entries), [state.entries])
  const personality = useMemo(() => getSpendingPersonality(state.entries), [state.entries])

  function handleClearAll() {
    if (window.confirm('This will permanently delete all your entries on this device. Continue?')) {
      dispatch({ type: 'CLEAR_ALL' })
    }
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-8 lg:px-12 max-w-6xl mx-auto">
      <Header onAddClick={() => setShowForm(true)} onGuideClick={() => setShowGuide(true)} />

      {isEmpty ? (
        <EmptyState onAddClick={() => setShowForm(true)} onGuideClick={() => setShowGuide(true)} />
      ) : (
        <>
          <SummaryCards totals={totals} monthlyBalance={monthlyTotals.balance} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
            <PersonalityCard personality={personality} />
            <BudgetHealthGauge score={healthScore} />
            <StreakHeatmap heatmap={heatmap} streak={streak} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <div className="bg-ink-light rounded-xl border border-white/5 p-5">
              <h3 className="font-display text-lg text-parchment mb-2">Spending by category</h3>
              <CategoryPieChart data={categoryData} />
            </div>
            <div className="bg-ink-light rounded-xl border border-white/5 p-5">
              <h3 className="font-display text-lg text-parchment mb-2">Last 14 days</h3>
              <TrendLineChart data={trendData} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <div className="bg-ink-light rounded-xl border border-white/5 p-5">
              <h3 className="font-display text-lg text-parchment mb-2">Spending by mood</h3>
              <MoodBarChart data={moodData} />
            </div>
            <ExpenseList />
          </div>
        </>
      )}

      {showForm && <ExpenseForm onClose={() => setShowForm(false)} />}
      {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}

      <footer className="text-center text-xs text-muted font-mono mt-10 pb-4 space-y-1">
        <p>ExpenseMind — data stays on your device via LocalStorage</p>
        <p>© 2026 ExpenseMind · Developed by Abhishek Singh</p>
        {!isEmpty && (
          <button onClick={handleClearAll} className="underline hover:text-coral transition-colors">
            Start fresh — clear all data
          </button>
        )}
      </footer>
    </div>
  )
}
