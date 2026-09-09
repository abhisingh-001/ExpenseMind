# ExpenseMind — Mood-Aware Personal Expense Tracker

> A modern, responsive personal finance tracker built with React that combines everyday expense management with mood-based financial insights.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Styling-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-Data%20Visualization-8884D8)](https://recharts.org/)
[![License](https://img.shields.io/badge/License-Educational%20Project-lightgrey)](#)

**Live Demo:** https://expense-mind.vercel.app/

---

## 📌 About the Project

**ExpenseMind** is a client-side personal expense tracker developed as part of the **SPARKIIT Full Stack Web Development Internship**.

The project goes beyond basic income-and-expense CRUD operations by connecting spending records with the user's **mood** and generating simple behavioral insights.

The application focuses on:

- Easy expense and income management
- Category-based financial organization
- Mood-aware spending tracking
- Interactive financial visualizations
- Persistent browser storage
- Responsive user experience
- Personal spending insights

The application runs entirely on the client side and stores user data in the browser using `localStorage`.

---

## ✨ Key Features

### 💰 Expense & Income Management
- Add income and expense entries
- Edit existing transactions
- Delete transactions
- Form validation
- Category and mood tagging

### 📊 Financial Dashboard
- Total income
- Total expenses
- Overall balance
- Current-month balance
- Category-wise spending breakdown

### 🧠 Mood-Based Financial Insights

ExpenseMind records the mood associated with spending and uses that information to generate three additional insights:

#### 1. Spending Personality
Generates a simple spending personality based on the user's own savings rate and mood-related spending patterns.

#### 2. Budget Health Score
A 0–100 score that combines savings performance with the relationship between mindful and impulsive/regretted spending.

#### 3. No-Regret Streak
A GitHub-style heatmap and streak counter that tracks consecutive days without impulsive or regretted spending.

---

## 📈 Data Visualization

ExpenseMind uses **Recharts** to provide interactive visualizations:

- **Category Pie Chart** — spending distribution by category
- **14-Day Trend Chart** — recent spending trend
- **Mood Bar Chart** — spending grouped by mood

These visualizations help users understand their financial behavior at a glance.

---

## 🔎 Search & Filtering

Transactions can be explored using:

- Search by note
- Filter by category
- Filter by mood
- Combined filtering for easier transaction analysis

---

## 💾 Data Persistence

ExpenseMind uses the browser's **LocalStorage API** to persist user data.

This means:

- Data remains available after refreshing the page
- No backend or database is required
- User data stays on the device/browser
- Data can be exported and imported using JSON

> **Privacy note:** Since the application uses browser LocalStorage, data is stored locally and is not synchronized across devices.

---

## 📱 Responsive Design

The interface is designed with a mobile-first approach and adapts to:

- 📱 Mobile devices
- 💻 Desktop screens
- 🖥️ Larger displays

The dashboard layout, forms, transaction lists, charts, and navigation adapt to different screen sizes.

---

## 🎨 User Experience

ExpenseMind includes a dedicated first-run experience rather than displaying pre-filled dummy data.

### First-Time User Flow

- Starts with an empty dashboard
- Displays an onboarding / "How to use" guide
- Provides a quick-start checklist
- Allows users to try the application with sample data
- Provides a "Clear all data" option
- Includes a custom ExpenseMind logo and favicon

This approach keeps the application ready for real personal use while still allowing evaluators to explore its functionality quickly.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend UI development |
| **React Hooks** | Component and state logic |
| **Context API** | Global state management |
| **useReducer** | Centralized transaction state updates |
| **Recharts** | Data visualization |
| **Tailwind CSS** | Responsive UI styling |
| **LocalStorage** | Client-side data persistence |
| **Vite** | Development and build tooling |

---

## 🏗️ Project Architecture

```text
ExpenseMind
│
├── src/
│   │
│   ├── components/
│   │   ├── charts/
│   │   │   ├── CategoryPieChart.jsx
│   │   │   ├── TrendLineChart.jsx
│   │   │   └── MoodBarChart.jsx
│   │   │
│   │   ├── Header.jsx
│   │   ├── Logo.jsx
│   │   ├── SummaryCards.jsx
│   │   ├── ExpenseForm.jsx
│   │   ├── ExpenseList.jsx
│   │   ├── ExpenseItem.jsx
│   │   ├── Filters.jsx
│   │   ├── Modal.jsx
│   │   ├── GuideModal.jsx
│   │   ├── EmptyState.jsx
│   │   ├── StreakHeatmap.jsx
│   │   ├── BudgetHealthGauge.jsx
│   │   └── PersonalityCard.jsx
│   │
│   ├── context/
│   │   └── ExpenseContext.jsx
│   │
│   ├── utils/
│   │   ├── calculations.js
│   │   ├── personality.js
│   │   └── localStorage.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
