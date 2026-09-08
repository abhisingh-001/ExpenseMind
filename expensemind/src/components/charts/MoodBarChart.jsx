import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'
import { formatCurrency } from '../../utils/calculations.js'

const MOOD_COLORS = {
  'Necessary': '#8A8F9C',
  'Happy spend': '#7FA98D',
  'Impulsive': '#E8A33D',
  'Stressed': '#E38B83',
  'Regretted': '#D9695F',
}

export default function MoodBarChart({ data }) {
  const chartData = data.map((d) => ({ ...d, label: `${d.emoji} ${d.mood}` }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#8A8F9C' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#8A8F9C' }} axisLine={false} tickLine={false} width={50} />
        <Tooltip
          formatter={(value) => formatCurrency(value)}
          contentStyle={{ background: '#1B202B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
          labelStyle={{ color: '#8A8F9C' }}
          itemStyle={{ color: '#EDEAE3' }}
        />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {chartData.map((d, i) => (
            <Cell key={i} fill={MOOD_COLORS[d.mood] || '#8A8F9C'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
