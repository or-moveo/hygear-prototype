import { useState } from 'react'
import { CaretDown, CaretRight, TrendUp, TrendDown, Calendar, Eye, Info, UserPlus, Clock } from '@phosphor-icons/react'
import TrendBadge from './TrendBadge'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"
const PAGE_SIZE = 5

// Three named tables — Improving / Declining / Missing — laid out in
// THREE COLUMNS side by side and grouped under a single section header.
//
// Two layers of disclosure (UX simplification):
//   1. Outer: the whole component starts COLLAPSED. Clicking the header
//      title row reveals the three columns. This keeps the dashboard quiet
//      until the coach actually wants to dig in.
//   2. Inner: the three columns are an ACCORDION — at most one column is
//      expanded at any time. Default after revealing is "all closed";
//      clicking a column opens just that one. Clicking it again collapses.
//
// Each row carries a small Info indicator (eye icon) so the user knows the
// row is clickable and will open the trainee's detailed profile popup.
//
// Brief constraints honored explicitly:
//   - No "flag" metaphor (no flag icons, no flag-style colors)
//   - Tables are simply named with counts in the collapsible header
//   - First 5 rows + "View all" link when >5 rows
//
// TODO(backend): detection logic (improving / declining / missing) is
// backend-driven — replace the mock data import in the parent.

export default function TraineesNeedingAttention({ data, onSelectTrainee }) {
  // Outer panel is always visible. Inner columns: all closed by default;
  // clicking one opens it and closes the others (accordion).
  const [openKey, setOpenKey] = useState(null)
  const toggle = (key) => setOpenKey(prev => prev === key ? null : key)

  const total = data.improving.length + data.declining.length + data.missing.length + (data.newToday?.length || 0)

  return (
    <div style={{
      background: '#fff', border: '1px solid #dcdcdc', borderRadius: 14,
      boxShadow: '0 4px 14px rgba(34, 50, 84, 0.05)',
      padding: '20px 22px 18px',
      marginBottom: 26, fontFamily: FONT,
    }}>
      {/* Section header (no Hide toggle) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9,
          background: PRIMARY + '18',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Eye size={18} color={PRIMARY} weight="fill" />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#333333' }}>
            Trainees Needing Attention
          </h2>
          <div style={{ fontSize: 12, color: '#8C8C8C', marginTop: 2 }}>
            Performance trends from your recent sessions · {total} trainees
          </div>
        </div>
      </div>

      {/* Four columns — alignItems:start so closed columns stay compact
          (header-only) while the expanded one grows to its natural height. */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 16, alignItems: 'start' }}>
          <Section
            title="Improving"
            subtitle="Performance up >5%"
            TitleIcon={TrendUp}
            accent="#23B870"
            rows={data.improving}
            expanded={openKey === 'improving'}
            onToggle={() => toggle('improving')}
            renderRow={(t) => <PerfRow key={t.id} trainee={t} onSelect={onSelectTrainee} />}
          />
          <Section
            title="Declining"
            subtitle="Performance down >5%"
            TitleIcon={TrendDown}
            accent="#F5365C"
            rows={data.declining}
            expanded={openKey === 'declining'}
            onToggle={() => toggle('declining')}
            renderRow={(t) => <PerfRow key={t.id} trainee={t} onSelect={onSelectTrainee} />}
          />
          <Section
            title="Missing"
            subtitle="Missed 2+ recent sessions"
            TitleIcon={Calendar}
            accent="#8C8C8C"
            rows={data.missing}
            expanded={openKey === 'missing'}
            onToggle={() => toggle('missing')}
            renderRow={(t) => <MissingRow key={t.id} trainee={t} onSelect={onSelectTrainee} />}
          />
          <Section
            title="New"
            subtitle="First session today"
            TitleIcon={UserPlus}
            accent="#3A86FF"
            rows={data.newToday || []}
            expanded={openKey === 'new'}
            onToggle={() => toggle('new')}
            renderRow={(t) => <NewRow key={t.id} trainee={t} onSelect={onSelectTrainee} />}
          />
      </div>
    </div>
  )
}

function Section({ title, subtitle, TitleIcon, accent, rows, expanded, onToggle, renderRow }) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? rows : rows.slice(0, PAGE_SIZE)
  const hasMore = rows.length > PAGE_SIZE

  return (
    <div style={{
      background: '#fff', border: '1px solid #dcdcdc', borderRadius: 12,
      borderTop: `4px solid ${accent}`,
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 18px', background: '#fff', border: 'none',
          borderBottom: expanded ? '1px solid #f0f0f0' : 'none',
          cursor: 'pointer', fontFamily: FONT, textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: accent + '18',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <TitleIcon size={18} color={accent} weight="bold" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: '#333333' }}>{title}</span>
              <span style={{
                background: accent, color: '#fff',
                borderRadius: 999, padding: '2px 10px',
                fontSize: 12, fontWeight: 700, minWidth: 24, textAlign: 'center',
              }}>{rows.length}</span>
            </div>
            <div style={{ fontSize: 12, color: '#8C8C8C', marginTop: 2 }}>{subtitle}</div>
          </div>
        </div>
        {expanded ? <CaretDown size={15} color="#8C8C8C" /> : <CaretRight size={15} color="#8C8C8C" />}
      </button>

      {expanded && rows.length === 0 && (
        <div style={{ padding: '16px 18px', fontSize: 13, color: '#8C8C8C' }}>
          No trainees in this category.
        </div>
      )}

      {expanded && rows.length > 0 && (
        <div style={{ flex: 1 }}>
          {visible.map(renderRow)}
          {hasMore && (
            <div style={{ padding: '10px 18px', borderTop: '1px solid #f0f0f0', textAlign: 'right' }}>
              <button
                onClick={() => setShowAll(s => !s)}
                style={{
                  background: 'transparent', border: 'none', color: PRIMARY,
                  fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: FONT,
                }}
              >
                {showAll ? 'Show less' : `View all (${rows.length})`}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function RowShell({ children, onSelect }) {
  return (
    <div
      onClick={onSelect}
      style={{
        display: 'grid', gridTemplateColumns: '1fr auto auto',
        alignItems: 'center', gap: 10,
        padding: '12px 18px',
        borderTop: '1px solid #f0f0f0',
        cursor: 'pointer', transition: 'background 0.12s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#FAFBFD'}
      onMouseLeave={e => e.currentTarget.style.background = '#fff'}
    >
      {children}
    </div>
  )
}

function MoreInfoIcon() {
  return (
    <div title="View profile" style={{
      width: 24, height: 24, borderRadius: 6,
      background: '#FAFBFD', border: '1px solid #dcdcdc',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Info size={12} color="#8C8C8C" weight="bold" />
    </div>
  )
}

function PerfRow({ trainee, onSelect }) {
  return (
    <RowShell onSelect={() => onSelect?.(trainee)}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#333333' }}>{trainee.name}</div>
        <div style={{ fontSize: 12, color: '#8C8C8C', marginTop: 2 }}>Last: {formatDate(trainee.lastSession)}</div>
      </div>
      <TrendBadge delta={trainee.trendDelta} size="lg" />
      <MoreInfoIcon />
    </RowShell>
  )
}

function MissingRow({ trainee, onSelect }) {
  return (
    <RowShell onSelect={() => onSelect?.(trainee)}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#333333' }}>{trainee.name}</div>
        <div style={{ fontSize: 12, color: '#8C8C8C', marginTop: 2 }}>Last: {formatDate(trainee.lastAttended)}</div>
      </div>
      <span style={{
        background: '#FAFBFD', border: '1px solid #dcdcdc',
        borderRadius: 999, padding: '3px 10px',
        fontSize: 12, fontWeight: 700, color: '#8C8C8C',
      }}>
        {trainee.sessionsMissed} missed
      </span>
      <MoreInfoIcon />
    </RowShell>
  )
}

function NewRow({ trainee, onSelect }) {
  return (
    <RowShell onSelect={() => onSelect?.(trainee)}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#333333' }}>{trainee.name}</div>
        <div style={{ fontSize: 12, color: '#8C8C8C', marginTop: 2 }}>{trainee.firstSessionClass}</div>
      </div>
      <span style={{
        background: '#e0eeff', color: '#3A86FF', border: '1px solid #3A86FF40',
        borderRadius: 999, padding: '3px 10px',
        fontSize: 12, fontWeight: 700,
        display: 'inline-flex', alignItems: 'center', gap: 4,
      }}>
        <Clock size={11} weight="bold" />{trainee.firstSessionTime}
      </span>
      <MoreInfoIcon />
    </RowShell>
  )
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
