import React from 'react'

/**
 * ExpenseMind brand mark — an open diary/journal with a rupee mark,
 * used in the header and as the browser favicon (see index.html).
 */
export default function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="#E8A33D" />
      <path
        d="M24 14c-3.5-2.2-8-2.8-11-2v20c3-1 7.5-0.4 11 2 3.5-2.4 8-3 11-2V12c-3-0.8-7.5-0.2-11 2Z"
        fill="#12151C"
        opacity="0.9"
      />
      <line x1="24" y1="14" x2="24" y2="34" stroke="#E8A33D" strokeWidth="1.4" />
      <text
        x="24"
        y="27"
        textAnchor="middle"
        fontSize="13"
        fontFamily="Georgia, serif"
        fontWeight="700"
        fill="#E8A33D"
      >
        ₹
      </text>
    </svg>
  )
}
