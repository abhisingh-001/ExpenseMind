import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { loadData, saveData } from '../utils/localStorage.js'
import { todayISO } from '../utils/calculations.js'

const ExpenseContext = createContext(null)

// Sample entries are NOT loaded by default — a fresh install starts at zero
// so real users see their own data, not placeholder numbers. This is only
// used when the user explicitly clicks "Try with sample data" from the
// empty state or the guide.
export const DEMO_ENTRIES = [
  { id: 'demo-1', type: 'income', amount: 45000, category: 'Salary', mood: 'necessary', note: 'Monthly salary', date: todayISO(new Date(Date.now() - 6 * 86400000)) },
  { id: 'demo-2', type: 'expense', amount: 850, category: 'Food', mood: 'happy', note: 'Dinner with friends', date: todayISO(new Date(Date.now() - 5 * 86400000)) },
  { id: 'demo-3', type: 'expense', amount: 1200, category: 'Bills', mood: 'necessary', note: 'Electricity bill', date: todayISO(new Date(Date.now() - 4 * 86400000)) },
  { id: 'demo-4', type: 'expense', amount: 2200, category: 'Shopping', mood: 'impulsive', note: 'New sneakers', date: todayISO(new Date(Date.now() - 3 * 86400000)) },
  { id: 'demo-5', type: 'expense', amount: 300, category: 'Travel', mood: 'necessary', note: 'Cab to office', date: todayISO(new Date(Date.now() - 2 * 86400000)) },
  { id: 'demo-6', type: 'expense', amount: 599, category: 'Entertainment', mood: 'happy', note: 'Movie night', date: todayISO(new Date(Date.now() - 1 * 86400000)) },
]

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, entries: [action.payload, ...state.entries] }
    case 'UPDATE':
      return {
        ...state,
        entries: state.entries.map((e) => (e.id === action.payload.id ? action.payload : e)),
      }
    case 'DELETE':
      return { ...state, entries: state.entries.filter((e) => e.id !== action.payload) }
    case 'IMPORT':
      return { ...state, entries: action.payload }
    case 'LOAD_DEMO':
      return { ...state, entries: DEMO_ENTRIES }
    case 'CLEAR_ALL':
      return { ...state, entries: [] }
    default:
      return state
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, () => {
    const saved = loadData()
    return saved && Array.isArray(saved.entries) ? saved : { entries: [] }
  })

  useEffect(() => {
    saveData(state)
  }, [state])

  return <ExpenseContext.Provider value={{ state, dispatch }}>{children}</ExpenseContext.Provider>
}

export function useExpenses() {
  const ctx = useContext(ExpenseContext)
  if (!ctx) throw new Error('useExpenses must be used within ExpenseProvider')
  return ctx
}
