import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { useState, useEffect } from 'react'

// ── Scenario presets ──────────────────────────────────────
const SCENARIO_PRESETS = {
  'buy-car':     { label: 'Buy a Car',        question: 'Should I buy a car?',              conditions: ['Monthly income: 3000 USD','Car price: 50000 USD','Monthly fixed expenses: 1500 USD','Existing debt: 20000 USD','No private parking space'] },
  'travel':      { label: 'Travel Abroad',    question: 'Should I travel abroad this year?', conditions: ['Budget: 3000 USD','Destination: Southeast Asia','Flight cost: 800 USD','Hotel: 40 USD/night','Leave remaining: 2 weeks'] },
  'investment':  { label: 'Investment',       question: 'Should I start investing now?',     conditions: ['Available capital: 10000 USD','Monthly income: 3500 USD','Existing debt: 8000 USD','Risk tolerance: medium','Time horizon: 10 years','Emergency fund: 3 months'] },
  'custom':      { label: 'Custom',           question: '',                                  conditions: [] },
}

// ── System Prompt ─────────────────────────────────────────
const SYSTEM_PROMPT = `You are operating under STME V5:
Structured Multi-State Transition & Evaluation — Full Production Mode.

Input: decision question + known conditions.

Output ONLY valid JSON. No markdown. No explanation. No final answer.

Step 1 — Condition Engine:
Classify each condition as Grounded / Subjective / Unverified / Irrelevant.
Map grounded and subjective conditions into typed constraints:
Financial / Structural / Time / Risk / Psychological / External
Each constraint must have: type, content, severity (Low/Medium/High/Critical), reliability (High/Medium/Low), weight (HIGH/MEDIUM/LOW).

Step 2 — STME Core:
Generate 5–8 states. Use perspectives: Internal / External / Structural.
Generate 3–5 transitions. Score each: cost, time, controllability, impact (0.1–1.0).

Step 3 — Interpretation Engine (V5):
Output a structured interpretation block with:
- dominant_driver: the primary constraint type driving the decision
- activation_status: Blocked / Conditional / Ready
- decision_readiness: Low / Medium / High
- key_issue: one concrete sentence describing the core structural tension

JSON schema:
{
  "condition_check": [{ "condition": "", "classification": "", "reason": "" }],
  "constraints": [{ "type": "", "content": "", "severity": "", "reliability": "", "weight": "" }],
  "states": [{ "code": "ψ1", "content": "", "category": "", "role": "", "perspective": "", "dynamics": "", "validity": "" }],
  "transitions": [{ "name": "", "from": "", "goal": "", "cost": 0.1, "time": 0.1, "controllability": 0.1, "impact": 0.1 }],
  "interpretation": { "dominant_driver": "", "activation_status": "", "decision_readiness": "", "key_issue": "" }
}`

// ── Helpers ───────────────────────────────────────────────
function priorityScore(t) {
  if (!t.cost || !t.time) return 0
  return Math.round(Math.min((t.impact * t.controllability) / (t.cost * t.time), 10) * 1000) / 1000
}
function priorityLevel(score) {
  if (score >= 1.5) return { label: 'Critical', cls: 'lvl-critical' }
  if (score >= 1.0) return { label: 'High',     cls: 'lvl-high' }
  if (score >= 0.6) return { label: 'Medium',   cls: 'lvl-medium' }
  return { label: 'Low', cls: 'lvl-low' }
}
function categoriseError(e, status) {
  const msg = e?.message || ''
  if (status === 401 || msg.toLowerCase().includes('api key')) return 'API Key Error → Please check your API Key'
  if (status === 429 || msg.toLowerCase().includes('quota'))   return 'Insufficient Credit → Please add credits'
  if (msg.toLowerCase().includes('json') || msg.toLowerCase().includes('parse')) return 'JSON Error → Invalid system output format'
  return msg || 'Unknown Error → Please try again'
}
function nowLabel() {
  const d = new Date()
  return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}`
}
function tsKey() {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0,19)
}

// ── localStorage History ──────────────────────────────────
const HISTORY_KEY = 'stme_v5_history'
function loadHistory() {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]') } catch { return [] }
}
function saveHistory(records) {
  if (typeof window === 'undefined') return
  localStorage.setItem(HISTORY_KEY, JSON.stringify(records.slice(0, 20)))
}

// ── PDF / Report generation ───────────────────────────────
function downloadJSON(data, id) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a'); a.href = url; a.download = `stme_v5_${id}_${tsKey()}.json`; a.click()
  URL.revokeObjectURL(url)
}
function buildReportText(record) {
  const r = record.result
  const transitions = [...r.transitions].map(t => ({ ...t, score: priorityScore(t) })).sort((a,b) => b.score - a.score)
  const lines = [
    `STME V5 — Decision Report`,
    `Generated: ${record.date}`,
    ``,
    `QUESTION`,
    record.question,
    ``,
    `CONDITIONS`,
    ...record.conditions.map(c => `- ${c}`),
    ``,
    `INTERPRETATION`,
    `Dominant driver: ${r.interpretation?.dominant_driver || '-'}`,
    `Activation status: ${r.interpretation?.activation_status || '-'}`,
    `Decision readiness: ${r.interpretation?.decision_readiness || '-'}`,
    `Key issue: ${r.interpretation?.key_issue || '-'}`,
    ``,
    `TOP TRANSITIONS`,
    ...transitions.slice(0,3).map((t,i) => `${i+1}. ${t.name} — Score ${t.score} · ${priorityLevel(t.score).label}`),
    ``,
    `CONSTRAINTS`,
    ...r.constraints.map(c => `[${c.severity}] ${c.type}: ${c.content}`),
    ``,
    `STME does not make the decision. It preserves the decision space.`,
  ]
  return lines.join('\n')
}
function downloadReport(record) {
  const blob = new Blob([buildReportText(record)], { type: 'text/plain' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a'); a.href = url; a.download = `stme_report_${tsKey()}.txt`; a.click()
  URL.revokeObjectURL(url)
}

// ─────────────────────────────────────────────────────────
export default function DemoV5() {
  // Input state
  const [scenarioKey, setScenarioKey]   = useState('buy-car')
  const [question, setQuestion]         = useState(SCENARIO_PRESETS['buy-car'].question)
  const [conditions, setConditions]     = useState([...SCENARIO_PRESETS['buy-car'].conditions])
  const [apiKey, setApiKey]             = useState('')
  const [showKey, setShowKey]           = useState(false)

  // UI state
  const [activeTab, setActiveTab]       = useState('new')   // 'new' | 'history'
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState('')
  const [result, setResult]             = useState(null)
  const [copied, setCopied]             = useState(false)

  // History
  const [history, setHistory]           = useState([])
  const [historyDetail, setHistoryDetail] = useState(null)

  useEffect(() => { setHistory(loadHistory()) }, [])

  function selectScenario(key) {
    setScenarioKey(key)
    const p = SCENARIO_PRESETS[key]
    setQuestion(p.question)
    setConditions([...p.conditions])
    setResult(null); setError('')
  }
  function updateCondition(i, val) { const n=[...conditions]; n[i]=val; setConditions(n) }
  function addCondition()          { setConditions([...conditions,'']) }
  function removeCondition(i)      { setConditions(conditions.filter((_,idx)=>idx!==i)) }

  async function handleRun() {
    if (!apiKey.trim()) { setError('API Key Error → Please check your API Key'); return }
    const clean = conditions.map(c=>c.trim()).filter(Boolean)
    if (clean.length < 2) { setError('Please enter at least two conditions.'); return }
    setError(''); setResult(null); setLoading(true)

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization':`Bearer ${apiKey.trim()}` },
        body: JSON.stringify({
          model:'gpt-4o-mini',
          messages:[
            { role:'system', content: SYSTEM_PROMPT },
            { role:'user',   content: JSON.stringify({ decision_question: question, known_conditions: clean }, null, 2) }
          ],
          temperature: 0.2
        })
      })
      if (!res.ok) {
        const err = await res.json()
        throw Object.assign(new Error(err.error?.message||''), { status: res.status })
      }
      const data = await res.json()
      let parsed
      try { parsed = JSON.parse(data.choices[0].message.content) } catch { throw new Error('JSON parse failed') }
      setResult(parsed)

      // Save to history
      const record = { id: tsKey(), date: nowLabel(), scenario: scenarioKey, question, conditions: clean, result: parsed }
      const next = [record, ...history]
      setHistory(next)
      saveHistory(next)
    } catch (e) {
      setError(categoriseError(e, e.status))
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    if (!result) return
    navigator.clipboard.writeText(JSON.stringify(result, null, 2))
    setCopied(true); setTimeout(()=>setCopied(false), 2000)
  }

  function replayDecision(record) {
    setScenarioKey(record.scenario || 'custom')
    setQuestion(record.question)
    setConditions([...record.conditions])
    setResult(record.result)
    setActiveTab('new')
    setHistoryDetail(null)
  }

  const transitions = result
    ? [...result.transitions].map(t=>({...t, score: priorityScore(t)})).sort((a,b)=>b.score-a.score)
    : []
  const states     = result?.states || []
  const internal   = states.filter(s => s.category === 'Internal')
  const external   = states.filter(s => s.category === 'External')
  const structural = states.filter(s => s.category === 'Structural')
  const interp     = result?.interpretation

  return (
    <>
      <Head>
        <title>STME V5 — Full Production · PIDA-LAB</title>
        <meta name="description" content="STME V5: Full production mode with Decision History, upgraded Interpretation Engine, and Export." />
      </Head>
      <Nav />

      <div className="demo-page">

        {/* HEADER */}
        <div className="demo-header">
          <Link href="/demo" className="back-link">← Demo Index</Link>
          <div className="v1-version-badge">
            <span className="demo-version-dot dot-v5" />
            V5 · Full Production
          </div>
          <h1 className="static-h1">STME V5</h1>
          <p className="demo-tagline">Decision Builder · Condition Engine · Interpretation · Decision History</p>
          <div className="demo-desc">
            <p>V5 is the full product architecture. It combines all prior layers: condition validation, constraint mapping, STME core analysis, upgraded interpretation, and persistent decision history.</p>
          </div>
        </div>

        {/* LAYER MAP */}
        <div className="v5-layer-map">
          {[
            { n:'1', label:'Input',           sub:'問題 + 條件',                  cls:'v5-layer-1' },
            { n:'2', label:'Condition Engine', sub:'驗證 + 約束',                 cls:'v5-layer-2' },
            { n:'3', label:'STME Core',        sub:'states / transitions',        cls:'v5-layer-3' },
            { n:'4', label:'Interpretation',   sub:'解釋',                        cls:'v5-layer-4' },
            { n:'5', label:'Decision Record',  sub:'歷史 / 回放',                 cls:'v5-layer-5' },
            { n:'6', label:'Interface',        sub:'Web / API / Bot',             cls:'v5-layer-6' },
          ].map(l => (
            <div key={l.n} className={`v5-layer-row ${l.cls}`}>
              <span className="v5-layer-n">Layer {l.n}</span>
              <span className="v5-layer-label">{l.label}</span>
              <span className="v5-layer-sub">{l.sub}</span>
            </div>
          ))}
        </div>

        <div className="static-divider" />

        {/* TABS */}
        <div className="v5-tabs">
          <button className={`v5-tab ${activeTab==='new' ? 'v5-tab-active' : ''}`} onClick={()=>setActiveTab('new')}>New Decision</button>
          <button className={`v5-tab ${activeTab==='history' ? 'v5-tab-active' : ''}`} onClick={()=>{ setActiveTab('history'); setHistoryDetail(null) }}>
            My Decisions {history.length > 0 && <span className="v5-tab-count">{history.length}</span>}
          </button>
        </div>

        {/* ── NEW DECISION TAB ── */}
        {activeTab === 'new' && (
          <>
            {/* API KEY NOTICE */}
            <div className="demo-notice">
              <span className="demo-notice-icon">⚠</span>
              <div>
                <strong>This demo requires your own OpenAI API key.</strong>
                <p>Your API key is used only in your browser/session and is not stored by PIDA Lab.</p>
              </div>
            </div>

            {/* DECISION BUILDER */}
            <div className="v5-section-header">
              <span className="v5-module-dot v5-mod-green" />
              <span className="v5-module-num">1</span>
              Decision Builder
            </div>

            <div className="demo-form">
              {/* Scenario selector */}
              <div className="demo-field">
                <label className="demo-label">[ Scenario ]</label>
                <div className="v4-scenario-grid" style={{marginTop:'0.5rem'}}>
                  {Object.entries(SCENARIO_PRESETS).map(([key,s]) => (
                    <button key={key} className={`v4-scenario-btn ${scenarioKey===key ? 'v4-scenario-active' : ''}`} onClick={()=>selectScenario(key)}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Decision question */}
              <div className="demo-field">
                <label className="demo-label">[ Decision Question ]</label>
                <textarea className="demo-textarea" value={question} onChange={e=>setQuestion(e.target.value)} rows={2} />
              </div>

              {/* Conditions */}
              <div className="demo-field">
                <label className="demo-label">[ Known Conditions ]</label>
                <div style={{marginTop:'0.5rem'}}>
                  {conditions.map((c,i) => (
                    <div key={i} className="demo-input-row" style={{marginBottom:'0.5rem'}}>
                      <input className="demo-input" value={c} placeholder={`Condition ${i+1}`} onChange={e=>updateCondition(i,e.target.value)} />
                      <button className="demo-toggle-btn" onClick={()=>removeCondition(i)}>Remove</button>
                    </div>
                  ))}
                </div>
                <button className="v2-export-btn" onClick={addCondition}>+ Add Condition</button>
              </div>

              {/* API Key */}
              <div className="demo-field">
                <label className="demo-label">OpenAI API Key</label>
                <div className="demo-input-row">
                  <input className="demo-input" type={showKey?'text':'password'} placeholder="sk-..." value={apiKey} onChange={e=>setApiKey(e.target.value)} />
                  <button className="demo-toggle-btn" onClick={()=>setShowKey(v=>!v)}>{showKey?'Hide':'Show'}</button>
                </div>
              </div>

              {error && <div className="demo-error v2-error-block"><span className="v2-error-icon">✕</span>{error}</div>}

              <button className="demo-run-btn" onClick={handleRun} disabled={loading}>
                {loading ? 'Analyzing...' : 'Run STME V5 →'}
              </button>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="demo-loading">
                <div className="demo-loading-bar" />
                <p>Condition Engine → STME Core → Interpretation Engine...</p>
              </div>
            )}

            {/* RESULTS */}
            {result && (
              <div className="demo-results">
                <div className="static-divider" />

                {/* Module 2: Condition Engine */}
                <div className="v5-section-header">
                  <span className="v5-module-dot v5-mod-yellow" />
                  <span className="v5-module-num">2</span>
                  Condition Engine
                </div>

                <div className="demo-section-title">Condition Check</div>
                <div className="demo-transitions">
                  {result.condition_check?.map((c,i) => (
                    <div key={i} className="demo-transition-row">
                      <div className="demo-transition-rank">#{i+1}</div>
                      <div className="demo-transition-info">
                        <div className="demo-transition-name">{c.condition}</div>
                        <div className="demo-transition-meta">{c.reason}</div>
                      </div>
                      <div className="demo-transition-right">
                        <div className={`demo-transition-level ${
                          c.classification==='Grounded'   ? 'lvl-high' :
                          c.classification==='Subjective' ? 'lvl-medium' :
                          c.classification==='Unverified' ? 'lvl-low' : 'v3-cls-irrelevant'
                        }`}>{c.classification}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="demo-section-title" style={{marginTop:'2rem'}}>Constraint Mapping</div>
                <div className="demo-analysis-grid">
                  {result.constraints?.map((c,i) => (
                    <div key={i} className="demo-analysis-card">
                      <div className="demo-analysis-label">{c.type}</div>
                      <div className="demo-analysis-val">{c.severity} · Weight: {c.weight}</div>
                      <div className="demo-analysis-note">{c.content}<br/>Reliability: {c.reliability}</div>
                    </div>
                  ))}
                </div>

                {/* Module 3: STME Core */}
                <div className="v5-section-header" style={{marginTop:'2.5rem'}}>
                  <span className="v5-module-dot v5-mod-blue" />
                  <span className="v5-module-num">3</span>
                  STME Core
                </div>

                <div className="demo-section-title">States</div>
                {[
                  { label:'Internal',   items: internal,   cls:'tag-internal' },
                  { label:'External',   items: external,   cls:'tag-external' },
                  { label:'Structural', items: structural, cls:'tag-structural' },
                ].map(group => group.items.length > 0 && (
                  <div key={group.label} className="demo-state-group">
                    <div className={`demo-state-group-label ${group.cls}`}>{group.label}</div>
                    {group.items.map(s => (
                      <div key={s.code} className="demo-state-row">
                        <span className="demo-state-code">{s.code}</span>
                        <span className="demo-state-content">{s.content.replace(/^\[(Internal|External|Structural)\]\s*/,'')}</span>
                        <div className="demo-state-tags">
                          <span className="demo-badge">{s.role==='core'?'Core (體)':'Functional (用)'}</span>
                          <span className="demo-badge">{s.perspective==='internal'?'Internal (主)':'External (客)'}</span>
                          <span className="demo-badge">{s.dynamics==='active'?'Active (動)':'Static (靜)'}</span>
                          <span className={`demo-badge ${s.validity==='real'?'badge-real':'badge-virtual'}`}>
                            {s.validity==='real'?'Real (實)':'Potential (虛)'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="demo-section-title" style={{marginTop:'2rem'}}>Transitions · Priority Ranked</div>
                <div className="v2-score-formula">
                  Score = (Impact × Controllability) / (Cost × Time) &nbsp;·&nbsp; Higher score → more structurally favorable transition
                </div>
                <div className="demo-transitions">
                  {transitions.map((t,i) => {
                    const lvl = priorityLevel(t.score)
                    return (
                      <div key={i} className="demo-transition-row">
                        <div className="demo-transition-rank">#{i+1}</div>
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

                {/* Module 4: Interpretation Engine V5 */}
                {interp && (
                  <>
                    <div className="v5-section-header" style={{marginTop:'2.5rem'}}>
                      <span className="v5-module-dot v5-mod-red" />
                      <span className="v5-module-num">4</span>
                      Interpretation Engine
                    </div>
                    <div className="v2-interpretation">
                      <div className="v2-interpretation-header">
                        <span className="v2-interpretation-label">— INTERPRETATION —</span>
                        <button className="v1-raw-copy" onClick={()=>navigator.clipboard.writeText(
                          `Dominant driver: ${interp.dominant_driver}\nActivation status: ${interp.activation_status}\nDecision readiness: ${interp.decision_readiness}\n\nKey issue:\n${interp.key_issue}`
                        )}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
                            <rect x="9" y="9" width="13" height="13" rx="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                          </svg>
                        </button>
                      </div>
                      <pre className="v2-interpretation-body">{`Dominant driver: ${interp.dominant_driver}
Activation status: ${interp.activation_status}
Decision readiness: ${interp.decision_readiness}

Key issue:
${interp.key_issue}`}</pre>
                    </div>
                  </>
                )}

                {/* Final Note */}
                <div className="demo-final-note">
                  <div className="demo-section-title">Final STME Note</div>
                  <p>STME does not make the decision. It preserves the decision space and identifies transition priorities.</p>
                  <div className="demo-top-transitions">
                    {transitions.slice(0,2).map((t,i)=>(
                      <div key={i} className="demo-top-item">
                        <span className="demo-top-num">{i+1}.</span>
                        <span className="demo-top-name">{t.name}</span>
                        <span className="demo-top-score">Score {t.score} · {priorityLevel(t.score).label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Module 6: Export / Audit */}
                <div className="v5-section-header" style={{marginTop:'2rem'}}>
                  <span className="v5-module-dot v5-mod-black" />
                  <span className="v5-module-num">6</span>
                  Export / Audit
                </div>
                <div className="v2-export-row">
                  <button className="v2-export-btn" onClick={handleCopy}>{copied?'✓ Copied':'[Copy Result]'}</button>
                  <button className="v2-export-btn" onClick={()=>downloadJSON(result, scenarioKey)}>[Download JSON]</button>
                  <button className="v2-export-btn" onClick={()=>downloadReport({ question, conditions, result, date: nowLabel() })}>[Download Report]</button>
                </div>

              </div>
            )}
          </>
        )}

        {/* ── HISTORY TAB ── */}
        {activeTab === 'history' && (
          <div className="v5-history">
            <div className="v5-section-header">
              <span className="v5-module-dot v5-mod-purple" />
              <span className="v5-module-num">5</span>
              Decision History
            </div>

            {history.length === 0 ? (
              <div className="v5-history-empty">No decisions recorded yet. Run your first analysis to begin.</div>
            ) : historyDetail ? (
              /* Detail view */
              <div>
                <button className="back-link" style={{marginBottom:'1.5rem', cursor:'pointer', background:'none', border:'none'}}
                  onClick={()=>setHistoryDetail(null)}>← Back to list</button>
                <div className="demo-version-card" style={{marginBottom:'1rem'}}>
                  <div className="v5-hist-meta">{historyDetail.date} · {SCENARIO_PRESETS[historyDetail.scenario]?.label || 'Custom'}</div>
                  <div className="demo-transition-name" style={{marginBottom:'0.5rem'}}>{historyDetail.question}</div>
                  <div className="v5-hist-conditions">
                    {historyDetail.conditions.map((c,i)=><div key={i} className="demo-transition-meta">- {c}</div>)}
                  </div>
                </div>
                {historyDetail.result?.interpretation && (
                  <div className="v2-interpretation" style={{marginBottom:'1rem'}}>
                    <div className="v2-interpretation-header"><span className="v2-interpretation-label">— INTERPRETATION —</span></div>
                    <pre className="v2-interpretation-body">{`Dominant driver: ${historyDetail.result.interpretation.dominant_driver}
Activation status: ${historyDetail.result.interpretation.activation_status}
Decision readiness: ${historyDetail.result.interpretation.decision_readiness}

Key issue:
${historyDetail.result.interpretation.key_issue}`}</pre>
                  </div>
                )}
                <div className="v2-export-row">
                  <button className="v2-export-btn" onClick={()=>replayDecision(historyDetail)}>[Replay Decision]</button>
                  <button className="v2-export-btn" onClick={()=>downloadJSON(historyDetail.result, historyDetail.id)}>[Download JSON]</button>
                  <button className="v2-export-btn" onClick={()=>downloadReport(historyDetail)}>[Download Report]</button>
                </div>
              </div>
            ) : (
              /* List view */
              <div className="v5-history-list">
                {history.map((rec,i) => (
                  <div key={rec.id} className="demo-transition-row v5-history-row" style={{cursor:'pointer'}} onClick={()=>setHistoryDetail(rec)}>
                    <div className="demo-transition-rank">#{i+1}</div>
                    <div className="demo-transition-info">
                      <div className="demo-transition-name">{rec.question}</div>
                      <div className="demo-transition-meta">{rec.date} · {SCENARIO_PRESETS[rec.scenario]?.label || 'Custom'} · {rec.conditions.length} conditions</div>
                    </div>
                    {rec.result?.interpretation && (
                      <div className="demo-transition-right">
                        <div className={`demo-transition-level ${
                          rec.result.interpretation.activation_status === 'Ready'       ? 'lvl-high' :
                          rec.result.interpretation.activation_status === 'Conditional' ? 'lvl-medium' : 'lvl-low'
                        }`}>{rec.result.interpretation.activation_status}</div>
                      </div>
                    )}
                  </div>
                ))}
                <button className="v2-export-btn" style={{marginTop:'1rem'}} onClick={()=>{
                  if (window.confirm('Clear all decision history?')) { setHistory([]); saveHistory([]) }
                }}>Clear History</button>
              </div>
            )}
          </div>
        )}

        {/* ROADMAP */}
        <div className="static-divider" />
        <div className="v5-roadmap">
          <div className="v5-roadmap-title">What's Next — STME Roadmap</div>

          <div className="v5-roadmap-grid">

            {/* API */}
            <div className="v5-roadmap-card">
              <div className="v5-roadmap-card-header">
                <span className="v5-roadmap-tag">Future</span>
                五、API 架構
              </div>
              <pre className="v5-roadmap-pre">{`POST /stme/v5

Input:
- question
- conditions

Output:
- constraints
- states
- transitions
- interpretation`}</pre>
              <div className="v5-roadmap-note">
                企業可以接：投資系統 · AI工具 · 決策流程
              </div>
            </div>

            {/* Bot */}
            <div className="v5-roadmap-card">
              <div className="v5-roadmap-card-header">
                <span className="v5-roadmap-tag">Future</span>
                六、Bot 角色（LINE / WhatsApp）
              </div>
              <pre className="v5-roadmap-pre">{`功能：
收問題
收條件
回傳分析連結

不做：
✕ STME完整分析`}</pre>
              <div className="v5-roadmap-note">
                Web是腦，Bot只是手
              </div>
            </div>

          </div>
        </div>

        <div className="static-divider" />
        <div className="static-footer-note">
          <span>PIDA Lab</span> · Rethinking AI Systems, Decision &amp; Responsibility
        </div>
      </div>
      <Footer />
    </>
  )
}
