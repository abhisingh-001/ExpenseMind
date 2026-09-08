# ExpenseMind — Mood-Aware Personal Finance Tracker

A responsive personal expense tracker built for the SPARKIIT Full Stack Web
Development internship. Unlike a standard expense tracker, ExpenseMind pairs
every expense with the **mood** it was made in, and turns that data into three
unique, self-referential insights:

1. **Spending Personality** — a plain-language archetype (e.g. "The
   Strategist", "The Reflector") derived from the user's own savings rate and
   mood ratios — no external benchmarking.
2. **Budget Health Score** — a single 0–100 score (shown as a gauge) blending
   savings rate with the ratio of mindful vs. impulsive/regretted spending.
3. **No-Regret Streak** — a GitHub-style heatmap and streak counter that
   tracks consecutive days without an "impulsive" or "regretted" expense,
   gamifying mindful spending rather than just zero spending.

It also ships as a **real, usable app**, not just a demo:

- **Starts empty** — no placeholder data. A brand-new user sees their own
  blank diary, not someone else's fake numbers.
- **Built-in "❓ How to use" guide** — an in-app accordion modal explaining
  what every card, chart, and button does, plus a quick-start checklist. It
  also auto-opens once on a visitor's very first launch.
- **"Try with sample data"** button on the empty state, for anyone who wants
  to explore the features before committing their own numbers — and a
  **"Clear all data"** link to wipe everything and start fresh anytime.
- A custom **logo/brand mark** (open-diary + ₹ icon) used in the header and
  as the browser favicon.

## Tech stack

- React 18 (functional components + Hooks: `useState`, `useEffect`,
  `useReducer`, `useContext`, `useMemo`)
- Context API + `useReducer` for global state management
- Recharts for the pie / area / bar charts
- Tailwind CSS for styling (custom "financial diary" color palette)
- Browser `localStorage` for persistence (no backend required)

## Getting started

```bash
npm install
npm run dev       # starts the dev server (default: http://localhost:5173)
npm run build     # production build into /dist
```

## Project structure

```
src/
  components/
    charts/            # CategoryPieChart, TrendLineChart, MoodBarChart
    Header.jsx
    Logo.jsx            # brand mark (also used as favicon)
    SummaryCards.jsx
    ExpenseForm.jsx     # add / edit modal
    ExpenseList.jsx     # searchable, filterable transaction list
    ExpenseItem.jsx
    Filters.jsx
    Modal.jsx
    GuideModal.jsx      # "How to use" accordion guide
    EmptyState.jsx      # zero-data first-run screen
    StreakHeatmap.jsx   # no-regret streak heatmap
    BudgetHealthGauge.jsx
    PersonalityCard.jsx
  context/
    ExpenseContext.jsx  # Context API + useReducer global store (starts empty)
  utils/
    calculations.js     # totals, breakdowns, streak, health score
    personality.js      # spending-personality logic
    localStorage.js      # persistence + JSON export/import
  App.jsx
  main.jsx
  index.css
```

## Core features (mapped to internship requirements)

- Add / edit / delete expense and income entries — modal form with
  validation.
- Category tagging (Food, Travel, Bills, Shopping, Health, Entertainment,
  Other) with dropdown filtering, plus **mood tagging** (unique addition).
- Summary cards: total income, total expenses, overall balance, and current
  month's balance.
- Recharts visualizations: category-wise pie chart, 14-day spending trend
  area chart, and spending-by-mood bar chart.
- Persistent state via `localStorage`, with JSON export/import for backups.
- Fully responsive layout (mobile-first grid, collapses to single column).
- Search-by-note and filter-by-category/mood on the transaction list.
- In-app onboarding guide and a zero-data empty state for real-world use.

## Notes for the report

- The app starts with **zero data** by default (real-world friendly). To get
  a populated dashboard for screenshots, open the app and click **"Try with
  sample data"** on the empty-state screen, or use the **How to use** guide
  to walk through each feature first.
- The "unique" angle to highlight in the report: (1) mood-based tagging
  feeding three derived insights (personality, health score, streak) instead
  of a plain income/expense CRUD app, and (2) a genuine first-run experience
  — empty state, guided onboarding, and a custom brand mark — rather than a
  college-assignment demo pre-filled with dummy numbers.
