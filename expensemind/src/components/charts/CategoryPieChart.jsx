import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { formatCurrency } from '../../utils/calculations.js'

const COLORS = ['#E8A33D', '#7FA98D', '#D9695F', '#8A8F9C', '#F0BB6B', '#9CC0AC', '#E38B83']

export default function CategoryPieChart({ data }) {
  if (data.length === 0) {
    return <p className="text-muted text-sm py-10 text-center">No expenses logged yet.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="#12151C" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => formatCurrency(value)}
          contentStyle={{ background: '#1B202B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
          itemStyle={{ color: '#EDEAE3' }}
        />
        <Legend wrapperStyle={{ fontSize: 12, color: '#8A8F9C' }} />
      </PieChart>
    </ResponsiveContainer>
  )
}
