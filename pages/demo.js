import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useState } from 'react'

const SYSTEM_PROMPT = `You are an AI system operating under STME:
Structured Multi-State Transition & Evaluation.

Your task is NOT to give advice.
Your task is to decompose the user's problem into structured states and transitions.

Output MUST be valid JSON only.

Before generating states, decompose the problem into three perspectives:

1. Internal: personal goals, values, satisfaction, motivation
2. External: market, environment, opportunities, other people, timing
3. Structural: risks, constraints, pressure, dependencies, irreversible costs

Ensure the generated states cover all three perspectives.
Do not output this decomposition separately.
Only use it to generate better states and transitions.

Schema:
{
  "states": [
    {
      "code": "ψ1",
      "content": "short description",
      "role": "core or functional",
      "perspective": "internal or external",
      "dynamics": "active or static",
      "validity": "real or potential"
    }
  ],
  "transitions": [
    {
      "name": "transition name",
      "from": "ψX",
      "goal": "虛→實 / 靜→動 / 客→主 / other",
      "cost": 0.1,
      "time": 0.1,
      "controllability": 0.1,
      "impact": 0.1
    }
  ]
}

Rules:
- Use 5 to 8 states.
- Use 3 to 5 transitions.
- Scores must be between 0.1 and 1.0.
- State coverage rules:
- At least 2 states must have perspective: internal.
- At least 2 states must have perspective: external.
- At least 2 states must be Structural.
- Each state content must begin with [Internal], [External], or [Structural].
- Each state must represent a distinct factor
- Avoid overlapping meanings between states
- Each state must be actionable or evaluable
- Do not include markdown.
- Do not include explanations.
- Do not make the final decision.`

function priorityScore(t) {
  if (!t.cost || !t.time) return 0
  return Math.round((t.impact * t.controllability) / (t.cost * t.time) * 1000) / 1000
}

function priorityLevel(score) {
  if (score >= 1.5) return { label: 'Critical', cls: 'lvl-critical' }
  if (score >= 1.0) return { label: 'High', cls: 'lvl-high' }
  if (score >= 0.6) return { label: 'Medium', cls: 'lvl-medium' }
  return { label: 'Low', cls: 'lvl-low' }
}

export default function Demo() {
  const [apiKey, setApiKey] = useState('')
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [showKey, setShowKey] = useState(false)

  async function handleRun() {
    if (!apiKey.trim()) { setError('Please enter your OpenAI API key.'); return }
    if (!question.trim()) { setError('Please enter a decision question.'); return }
    setError(''); setResult(null); setLoading(true)

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: question }
          ],
          temperature: 0.2
        })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error?.message || `API error ${res.status}`)
      }

      const data = await res.json()
      const content = data.choices[0].message.content
      const parsed = JSON.parse(content)
      setResult(parsed)
    } catch (e) {
      setError(e.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const transitions = result
    ? [...result.transitions].map(t => ({ ...t, score: priorityScore(t) })).sort((a, b) => b.score - a.score)
    : []

  const states = result?.states || []
  const internal = states.filter(s => s.content.startsWith('[Internal]'))
  const external = states.filter(s => s.content.startsWith('[External]'))
  const structural = states.filter(s => s.content.startsWith('[Structural]'))

  const coreReal = states.filter(s => s.role === 'core' && s.validity === 'real').length
  const coreVirtual = states.filter(s => s.role === 'core' && s.validity === 'potential').length
  const userDriven = states.filter(s => s.perspective === 'internal').length
  const extDriven = states.filter(s => s.perspective === 'external').length
  const active = states.filter(s => s.dynamics === 'active').length
  const staticS = states.filter(s => s.dynamics === 'static').length

  return (
    <>
      <Head>
        <title>STME Demo — PIDA-LAB</title>
        <meta name="description" content="STME: A structured decision-space explorer. This demo does not make decisions for users." />
      </Head>
      <Nav />

      <div className="demo-page">
        {/* HEADER */}
        <div className="demo-header">
          <Link href="/" className="back-link">← Home</Link>
          <div className="static-label">Demo</div>
          <h1 className="static-h1">STME Demo</h1>
          <p className="demo-tagline">A structured decision-space explorer.</p>
          <div className="demo-desc">
            <p>STME is not a decision tool. It is a system for preserving decision structure under uncertainty.</p>
            <p>This demo does not provide answers. It exposes the internal states, pressures, and transitions that shape a decision before it collapses into a single outcome.</p>
          </div>
        </div>

        <div className="static-divider" />

        {/* API KEY NOTICE */}
        <div className="demo-notice">
          <span className="demo-notice-icon">⚠</span>
          <div>
            <strong>This demo requires your own OpenAI API key.</strong>
            <p>Your API key is used only in your browser/session and is not stored by PIDA Lab.</p>
          </div>
        </div>

        {/* INPUT FORM */}
        <div className="demo-form">
          <div className="demo-field">
            <label className="demo-label">OpenAI API Key</label>
            <div className="demo-input-row">
              <input
                className="demo-input"
                type={showKey ? 'text' : 'password'}
                placeholder="sk-..."
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
              />
              <button className="demo-toggle-btn" onClick={() => setShowKey(v => !v)}>
                {showKey ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="demo-field">
            <label className="demo-label">Decision Question</label>
            <textarea
              className="demo-textarea"
              placeholder="e.g. Should I quit my job and start a company this year?"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              rows={3}
            />
          </div>

          {error && <div className="demo-error">{error}</div>}

          <button
            className="demo-run-btn"
            onClick={handleRun}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Run STME Analysis →'}
          </button>
        </div>

        {/* RESULTS */}
        {loading && (
          <div className="demo-loading">
            <div className="demo-loading-bar" />
            <p>Decomposing states and transitions...</p>
          </div>
        )}

        {result && (
          <div className="demo-results">
            <div className="static-divider" />

            {/* STATES */}
            <div className="demo-section-title">States</div>
            {[
              { label: 'Internal', items: internal, cls: 'tag-internal' },
              { label: 'External', items: external, cls: 'tag-external' },
              { label: 'Structural', items: structural, cls: 'tag-structural' },
            ].map(group => group.items.length > 0 && (
              <div key={group.label} className="demo-state-group">
                <div className={`demo-state-group-label ${group.cls}`}>{group.label}</div>
                {group.items.map(s => (
                  <div key={s.code} className="demo-state-row">
                    <span className="demo-state-code">{s.code}</span>
                    <span className="demo-state-content">{s.content.replace(/^\[(Internal|External|Structural)\]\s*/, '')}</span>
                    <div className="demo-state-tags">
                      <span className="demo-badge">{s.role === 'core' ? 'Core (體)' : 'Functional (用)'}</span>
                      <span className="demo-badge">{s.perspective === 'internal' ? 'Internal (主)' : 'External (客)'}</span>
                      <span className="demo-badge">{s.dynamics === 'active' ? 'Active (動)' : 'Static (靜)'}</span>
                      <span className={`demo-badge ${s.validity === 'real' ? 'badge-real' : 'badge-virtual'}`}>
                        {s.validity === 'real' ? 'Real (實)' : 'Potential (虛)'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* STRUCTURAL ANALYSIS */}
            <div className="demo-section-title" style={{marginTop:'2rem'}}>Structural Analysis</div>
            <div className="demo-analysis-grid">
              <div className="demo-analysis-card">
                <div className="demo-analysis-label">Core / Functional</div>
                <div className="demo-analysis-val">Real {coreReal} · Potential {coreVirtual}</div>
                <div className="demo-analysis-note">
                  {coreVirtual > coreReal ? 'Core feasibility still partially potential.' : 'Core feasibility has real grounding.'}
                </div>
              </div>
              <div className="demo-analysis-card">
                <div className="demo-analysis-label">Perspective Balance</div>
                <div className="demo-analysis-val">Internal {userDriven} · External {extDriven}</div>
                <div className="demo-analysis-note">
                  {extDriven > userDriven ? 'External dominant — environment drives the decision.' : 'Internal dominant — self-driven factors sufficient.'}
                </div>
              </div>
              <div className="demo-analysis-card">
                <div className="demo-analysis-label">Dynamics Balance</div>
                <div className="demo-analysis-val">Active {active} · Static {staticS}</div>
                <div className="demo-analysis-note">
                  {staticS > active ? 'Static dominant — activation required.' : 'Active dominant — system already in motion.'}
                </div>
              </div>
            </div>

            {/* TRANSITIONS */}
            <div className="demo-section-title" style={{marginTop:'2rem'}}>Transitions · Priority Ranked</div>
            <div className="demo-transitions">
              {transitions.map((t, i) => {
                const lvl = priorityLevel(t.score)
                return (
                  <div key={i} className="demo-transition-row">
                    <div className="demo-transition-rank">#{i + 1}</div>
                    <div className="demo-transition-info">
                      <div className="demo-transition-name">{t.name}</div>
                      <div className="demo-transition-meta">
                        From {t.from} · {t.goal}
                      </div>
                    </div>
                    <div className="demo-transition-scores">
                      <span className="demo-score-item">Cost <b>{t.cost}</b></span>
                      <span className="demo-score-item">Time <b>{t.time}</b></span>
                      <span className="demo-score-item">Ctrl <b>{t.controllability}</b></span>
                      <span className="demo-score-item">Impact <b>{t.impact}</b></span>
                    </div>
                    <div className="demo-transition-right">
                      <div className="demo-transition-score">{t.score}</div>
                      <div className={`demo-transition-level ${lvl.cls}`}>{lvl.label}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* FINAL NOTE */}
            <div className="demo-final-note">
              <div className="demo-section-title">Final STME Note</div>
              <p>STME does not make the decision.</p>
              <p>It preserves the decision space and identifies transition priorities.</p>
              <div className="demo-top-transitions">
                {transitions.slice(0, 2).map((t, i) => (
                  <div key={i} className="demo-top-item">
                    <span className="demo-top-num">{i + 1}.</span>
                    <span className="demo-top-name">{t.name}</span>
                    <span className="demo-top-score">Score {t.score} · {priorityLevel(t.score).label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="static-divider" />
        <div className="static-footer-note">
          <span>PIDA Lab</span> · Rethinking AI Systems, Decision &amp; Responsibility
        </div>
      </div>

      <Footer />
    </>
  )
}
