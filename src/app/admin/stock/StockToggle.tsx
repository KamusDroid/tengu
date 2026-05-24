'use client'

import { useState } from 'react'

export default function StockToggle({ id, active }: { id: string; active: boolean }) {
  const [on, setOn] = useState(active)
  const [loading, setLoading] = useState(false)

  async function toggle() {
    setLoading(true)
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, active: !on, name: '', priceCents: 0, currency: 'ars' }),
      })
      if (res.ok) setOn((v) => !v)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      style={{
        width: '36px', height: '20px', borderRadius: '10px', border: 'none',
        background: on ? '#e63946' : 'rgba(240,237,230,0.12)',
        cursor: loading ? 'default' : 'pointer',
        position: 'relative', transition: 'background 0.2s',
      }}
    >
      <span style={{
        position: 'absolute', top: '3px',
        left: on ? '18px' : '3px',
        width: '14px', height: '14px', borderRadius: '50%',
        background: '#fff', transition: 'left 0.2s',
      }} />
    </button>
  )
}
