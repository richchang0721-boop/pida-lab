import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { useState } from 'react'

const SYSTEM_PROMPT = `You are operating under STME V3:
Condition-Based Structured Multi-State Transition & Evaluation.

The user will provide:
1. A main decision question
2. Multiple known conditions

Your task is NOT to answer the decision.
Your task is to validate, classify, and convert conditions into decision constraints,
then generate STME states and transitions.

Before generating STME states, classify each condition as:

1. Grounded
- factual, measurable, directly stated, or concrete

2. Subjective
- preference, emotion, desire, fear, value judgment

3. Unverified
- prediction, assumption, exaggeration, unsupported claim

4. Irrelevant
- unrelated to the decision question

Then convert relevant conditions into constraints:

- Financial
- Structural
- Time
- Risk
- Psychological
- External

Rules:
- Do NOT make the final decision.
- Do NOT recommend an action.
- Do NOT treat all conditions as equally reliable.
- Grounded conditions become primary constraints.
- Subjective conditions become internal states or psychological drivers.
- Unverified conditions become potential states.
- Irrelevant conditions should be excluded unless they reveal bias.
- Output valid JSON only.
- Do not include markdown.

JSON Schema:
{
  "condition_check": [
    {
      "condition": "",
      "classification": "Grounded / Subjective / Unverified / Irrelevant",
      "reason": ""
    }
  ],
  "constraints": [
    {
      "type": "Financial / Structural / Time / Risk / Psychological / External",
      "content": "",
      "severity": "Low / Medium / High / Critical",
      "reliability": "High / Medium / Low"
    }
  ],
  "states": [
    {
      "code": "ψ1",
      "content": "",
      "category": "Internal / External / Structural",
      "role": "core or functional",
      "perspective": "internal or external",
      "dynamics": "active or static",
      "validity": "real or potential"
    }
  ],
  "transitions": [
    {
      "name": "",
      "from": "ψX",
      "goal": "Potential→Real / Static→Active / External→Internal / Other",
      "cost": 0.1,
      "time": 0.1,
      "controllability": 0.1,
      "impact": 0.1
    }
  ]
}`

function priorityScore(t) {
  if (!t.cost || !t.time) return 0
  const score = (t.impact * t.controllability) / (t.cost * t.time)
  return Math.round(Math.min(score, 10) * 1000) / 1000
}

function priorityLevel(score) {
  if (score >= 1.5) return { label: 'Critical', cls: 'lvl-critical' }
  if (score >= 1.0) return { label: 'High', cls: 'lvl-high' }
  if (score >= 0.6) return { label: 'Medium', cls: 'lvl-medium' }
  return { label: 'Low', cls: 'lvl-low' }
}

function categoriseError(e, status) {
  const msg = e?.message || ''
  if (status === 401 || msg.toLowerCase().includes('api key')) {
    return 'API Key Error → Please check your API Key'
  }
  if (status === 429 || msg.toLowerCase().includes('quota') || msg.toLowerCase().includes('credit')) {
    return 'Insufficient Credit → Please add credits'
  }
  if (msg.toLowerCase().includes('json') || msg.toLowerCase().includes('parse')) {
    return 'JSON Error → Invalid system output format'
  }
  return msg || 'Unknown Error → Please try again'
}

function downloadJSON(data) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `stme_v3_result_${ts}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function buildV3Interpretation(result, transitions) {
  const constraints = result?.constraints || []
  const high = constraints.filter(c => ['High', 'Critical'].includes(c.severity))
  const financial = constraints.filter(c => c.type === 'Financial')
  const structural = constraints.filter(c => c.type === 'Structural')
  const top = transitions[0]

  return [
    high.length > 0
      ? `This decision space contains ${high.length} high-pressure constraint(s).`
      : `This decision space does not show critical constraint pressure.`,
    financial.length > 0
      ? `Financial constraints are present and should be treated as primary decision boundaries.`
      : `Financial pressure is not dominant in the provided conditions.`,
    structural.length > 0
      ? `Structural constraints may affect feasibility beyond personal preference.`
      : `Structural constraints appear limited based on the provided conditions.`,
    top
      ? `Highest-priority transition: "${top.name}" (Score ${top.score}).`
      : '',
    `STME V3 does not make the decision. It models the reality around the decision before convergence.`
  ].filter(Boolean).join('\n\n')
}

const EXAMPLE_CONDITIONS = [
  'Monthly income: 3000 USD',
  'Car price: 50000 USD',
  'Monthly fixed expenses: 1500 USD',
  'Existing debt: 20000 USD',
  'No private parking space',
  'Main purpose: commuting convenience'
]

export default function DemoV3() {
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [question, setQuestion] = useState('Should I buy a car?')
  const [conditions, setConditions] = useState(EXAMPLE_CONDITIONS)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function updateCondition(index, value) {
    const next = [...conditions]
    next[index] = value
    setConditions(next)
  }

  function addCondition() {
    setConditions([...conditions, ''])
  }

  function removeCondition(index) {
    setConditions(conditions.filter((_, i) => i !== index))
  }

  async function handleRun() {
    if (!apiKey.trim()) {
      setError('API Key Error → Please check your API Key')
      return
    }
    if (!question.trim()) {
      setError('Please enter a decision question.')
      return
    }

    const cleanConditions = conditions.map(c => c.trim()).filter(Boolean)
    if (cleanConditions.length < 2) {
      setError('Please enter at least two known conditions.')
      return
    }

    setError('')
    setResult(null)
    setLoading(true)

    const userPayload = {
      decision_question: question,
      known_conditions: cleanConditions
    }

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: JSON.stringify(userPayload, null, 2) }
          ],
          temperature: 0.2
        })
      })

      if (!res.ok) {
        const err = await res.json()
        throw Object.assign(new Error(err.error?.message || ''), { status: res.status })
      }

      const data = await res.json()
      const content = data.choices[0].message.content

      let parsed
      try {
        parsed = JSON.parse(content)
      } catch {
        throw new Error('JSON parse failed')
      }

      setResult(parsed)
    } catch (e) {
      setError(categoriseError(e, e.status))
    } finally {
      setLoading(false)
    }
  }

  function handleCopyResult() {
    if (!result) return
    navigator.clipboard.writeText(JSON.stringify(result, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const states = result?.states || []
  const transitions = result
    ? [...result.transitions].map(t => ({ ...t, score: priorityScore(t) })).sort((a, b) => b.score - a.score)
    : []

  const internal = states.filter(s => s.category === 'Internal')
  const external = states.filter(s => s.category === 'External')
  const structural = states.filter(s => s.category === 'Structural')
  const interpretation = result ? buildV3Interpretation(result, transitions) : ''

  return (
    <>
      <Head>
        <title>STME V3 — Condition-Based Demo · PIDA-LAB</title>
        <meta name="description" content="STME V3: Condition-based structured decision modeling." />
      </Head>

      <Nav />

      <div className="demo-page">
        <div className="demo-header">
          <Link href="/demo" className="back-link">← Demo Index</Link>

          <div className="v1-version-badge">
            <span className="demo-version-dot dot-v3" />
            V3 · Condition-Based Analysis
          </div>

          <h1 className="static-h1">STME V3</h1>
          <p className="demo-tagline">Models reality through user-provided conditions.</p>

          <div className="demo-desc">
            <p>V1 analyzes a question. V2 explains the structure. V3 validates conditions and maps them into constraints before STME analysis.</p>
          </div>
        </div>

        <div className="static-divider" />

        <div className="demo-notice">
          <span className="demo-notice-icon">⚠</span>
          <div>
            <strong>This demo requires your own OpenAI API key.</strong>
            <p>Your API key is used only in your browser/session and is not stored by PIDA Lab.</p>
          </div>
        </div>

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
              value={question}
              onChange={e => setQuestion(e.target.value)}
              rows={2}
            />
          </div>

          <div className="demo-field">
            <label className="demo-label">Known Conditions</label>
            <div className="v3-condition-list">
              {conditions.map((c, i) => (
                <div key={i} className="demo-input-row" style={{ marginBottom: '0.5rem' }}>
                  <input
                    className="demo-input"
                    value={c}
                    placeholder={`Condition ${i + 1}`}
                    onChange={e => updateCondition(i, e.target.value)}
                  />
                  <button className="demo-toggle-btn" onClick={() => removeCondition(i)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button className="v2-export-btn" onClick={addCondition}>
              + Add Condition
            </button>
          </div>

          {error && (
            <div className="demo-error v2-error-block">
              <span className="v2-error-icon">✕</span>
              {error}
            </div>
          )}

          <button className="demo-run-btn" onClick={handleRun} disabled={loading}>
            {loading ? 'Analyzing...' : 'Run STME V3 Analysis →'}
          </button>
        </div>

        {loading && (
          <div className="demo-loading">
            <div className="demo-loading-bar" />
            <p>Validating conditions and modeling decision structure...</p>
          </div>
        )}

        {result && (
          <div className="demo-results">
            <div className="static-divider" />

            <div className="demo-section-title">Condition Check</div>
            <div className="demo-transitions">
              {result.condition_check?.map((c, i) => (
                <div key={i} className="demo-transition-row">
                  <div className="demo-transition-rank">#{i + 1}</div>
                  <div className="demo-transition-info">
                    <div className="demo-transition-name">{c.condition}</div>
                    <div className="demo-transition-meta">{c.reason}</div>
                  </div>
                  <div className="demo-transition-right">
                    <div className={`demo-transition-level ${
                      c.classification === 'Grounded'   ? 'lvl-high' :
                      c.classification === 'Subjective' ? 'lvl-medium' :
                      c.classification === 'Unverified' ? 'lvl-low' :
                      'v3-cls-irrelevant'
                    }`}>{c.classification}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="demo-section-title" style={{ marginTop: '2rem' }}>Constraint Mapping</div>
            <div className="demo-analysis-grid">
              {result.constraints?.map((c, i) => (
                <div key={i} className="demo-analysis-card">
                  <div className="demo-analysis-label">{c.type}</div>
                  <div className="demo-analysis-val">{c.severity}</div>
                  <div className="demo-analysis-note">
                    {c.content}
                    <br />
                    Reliability: {c.reliability}
                  </div>
                </div>
              ))}
            </div>

            <div className="demo-section-title" style={{ marginTop: '2rem' }}>States</div>
            {[
              { label: 'Internal', items: internal, cls: 'tag-internal' },
              { label: 'External', items: external, cls: 'tag-external' },
              { label: 'Structural', items: structural, cls: 'tag-structural' }
            ].map(group => group.items.length > 0 && (
              <div key={group.label} className="demo-state-group">
                <div className={`demo-state-group-label ${group.cls}`}>{group.label}</div>
                {group.items.map(s => (
                  <div key={s.code} className="demo-state-row">
                    <span className="demo-state-code">{s.code}</span>
                    <span className="demo-state-content">{s.content}</span>
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

            <div className="demo-section-title" style={{ marginTop: '2rem' }}>Transitions · Priority Ranked</div>
            <div className="v2-score-formula">
              Score = (Impact × Controllability) / (Cost × Time) · Higher score → more structurally favorable transition
            </div>

            <div className="demo-transitions">
              {transitions.map((t, i) => {
                const lvl = priorityLevel(t.score)
                return (
                  <div key={i} className="demo-transition-row">
                    <div className="demo-transition-rank">#{i + 1}</div>
                    <div className="demo-transition-info">
                      <div className="demo-transition-name">{t.name}</div>
                      <div className="demo-transition-meta">From {t.from} · {t.goal}</div>
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

            <div className="demo-final-note">
              <div className="demo-section-title">Final STME Note</div>
              <p>STME V3 does not make the decision.</p>
              <p>It validates conditions, maps constraints, and identifies transition priorities.</p>
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

            <div className="v2-interpretation">
              <div className="v2-interpretation-header">
                <span className="v2-interpretation-label">— V3 INTERPRETATION —</span>
              </div>
              <pre className="v2-interpretation-body">{interpretation}</pre>
            </div>

            <div className="v2-export-row">
              <button className="v2-export-btn" onClick={handleCopyResult}>
                {copied ? '✓ Copied' : '[Copy Result]'}
              </button>
              <button className="v2-export-btn" onClick={() => downloadJSON(result)}>
                [Download JSON]
              </button>
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