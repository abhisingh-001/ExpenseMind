import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { formatCurrency } from '../../utils/calculations.js'

export default function TrendLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8A33D" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#E8A33D" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#8A8F9C' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#8A8F9C' }} axisLine={false} tickLine={false} width={50} />
        <Tooltip
          formatter={(value) => formatCurrency(value)}
          contentStyle={{ background: '#1B202B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
          labelStyle={{ color: '#8A8F9C' }}
          itemStyle={{ color: '#EDEAE3' }}
        />
        <Area type="monotone" dataKey="amount" stroke="#E8A33D" strokeWidth={2} fill="url(#trendFill)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
