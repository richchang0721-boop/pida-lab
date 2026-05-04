import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { useState } from 'react'

// ── Scenario definitions ──────────────────────────────────
const SCENARIOS = [
  {
    id: 'buy-car',
    label: 'Buy a Car',
    question: 'Should I buy a car?',
    conditions: [
      'Monthly income: 3000 USD',
      'Car price: 50000 USD',
      'Monthly fixed expenses: 1500 USD',
      'Existing debt: 20000 USD',
      'No private parking space',
      'Main purpose: commuting convenience',
    ],
  },
  {
    id: 'change-jobs',
    label: 'Change Jobs',
    question: 'Should I change jobs?',
    conditions: [
      'Current salary: 4000 USD/month',
      'New offer: 5200 USD/month',
      'Current job has high job security',
      'New role requires relocation',
      'Years at current company: 3',
      'New company is early-stage startup',
      'Current commute: 1.5 hours daily',
    ],
  },
  {
    id: 'start-business',
    label: 'Start a Business',
    question: 'Should I start a business?',
    conditions: [
      'Available savings: 15000 USD',
      'Monthly personal expenses: 2000 USD',
      'Current employment: full-time',
      'Business idea has no validated customers yet',
      'Estimated runway: 7 months',
      'Domain experience: 4 years',
      'No co-founder identified',
    ],
  },
  {
    id: 'travel-abroad',
    label: 'Travel Abroad',
    question: 'Should I travel abroad this year?',
    conditions: [
      'Budget: 3000 USD',
      'Destination: Southeast Asia',
      'Travel dates: not yet confirmed',
      'Visa requirements: visa on arrival available',
      'Flight cost estimate: 800 USD',
      'Hotel cost estimate: 40 USD/night',
      'Safety concerns: low for planned region',
      'Purpose of travel: personal recovery and exploration',
      'Work schedule: 2 weeks annual leave remaining',
    ],
  },
  {
    id: 'investment',
    label: 'Investment Decision',
    question: 'Should I start investing now?',
    conditions: [
      'Available capital: 10000 USD',
      'Monthly income: 3500 USD',
      'Existing debt: 8000 USD',
      'Risk tolerance: medium',
      'Investment target: long-term wealth building',
      'Time horizon: 10 years',
      'Emergency fund: 3 months covered',
      'Expected return assumption: 7% annually',
      'Maximum acceptable loss: 20%',
    ],
  },
]

// ── Mock results per scenario ─────────────────────────────
const MOCK_RESULTS = {
  'buy-car': {
    condition_check: [
      { condition: 'Monthly income: 3000 USD', classification: 'Grounded', reason: 'Concrete measurable financial fact.' },
      { condition: 'Car price: 50000 USD', classification: 'Grounded', reason: 'Specific stated cost.' },
      { condition: 'Monthly fixed expenses: 1500 USD', classification: 'Grounded', reason: 'Concrete stated figure.' },
      { condition: 'Existing debt: 20000 USD', classification: 'Grounded', reason: 'Measurable financial liability.' },
      { condition: 'No private parking space', classification: 'Grounded', reason: 'Factual environmental constraint.' },
      { condition: 'Main purpose: commuting convenience', classification: 'Subjective', reason: 'Value judgment — convenience is not quantified.' },
    ],
    constraints: [
      { type: 'Financial', content: 'Car price represents ~16x monthly income. Financing required.', severity: 'Critical', reliability: 'High' },
      { type: 'Financial', content: 'Existing debt reduces debt capacity and credit eligibility.', severity: 'High', reliability: 'High' },
      { type: 'Structural', content: 'No parking space creates ongoing operational dependency.', severity: 'Medium', reliability: 'High' },
      { type: 'Psychological', content: 'Commuting convenience is the primary driver — not financial necessity.', severity: 'Low', reliability: 'Medium' },
    ],
    states: [
      { code: 'ψ1', content: 'Debt-to-income ratio exceeds safe borrowing threshold', category: 'Structural', role: 'core', perspective: 'internal', dynamics: 'static', validity: 'real' },
      { code: 'ψ2', content: 'No parking solution creates recurring cost and risk', category: 'External', role: 'functional', perspective: 'external', dynamics: 'static', validity: 'real' },
      { code: 'ψ3', content: 'Commuting pressure creates motivation to act', category: 'Internal', role: 'core', perspective: 'internal', dynamics: 'active', validity: 'real' },
      { code: 'ψ4', content: 'Alternative commuting options not yet evaluated', category: 'External', role: 'functional', perspective: 'external', dynamics: 'static', validity: 'potential' },
      { code: 'ψ5', content: 'Monthly cash flow allows minimal savings buffer', category: 'Structural', role: 'functional', perspective: 'internal', dynamics: 'static', validity: 'real' },
    ],
    transitions: [
      { name: 'Evaluate alternatives first', from: 'ψ4', goal: 'Potential→Real', cost: 0.2, time: 0.2, controllability: 0.9, impact: 0.8 },
      { name: 'Resolve debt before purchase', from: 'ψ1', goal: 'Static→Active', cost: 0.4, time: 0.7, controllability: 0.7, impact: 0.9 },
      { name: 'Secure parking arrangement', from: 'ψ2', goal: 'External→Internal', cost: 0.3, time: 0.3, controllability: 0.6, impact: 0.6 },
      { name: 'Proceed with financed purchase', from: 'ψ3', goal: 'Potential→Real', cost: 0.9, time: 0.4, controllability: 0.4, impact: 0.5 },
    ],
  },
  'change-jobs': {
    condition_check: [
      { condition: 'Current salary: 4000 USD/month', classification: 'Grounded', reason: 'Concrete measurable fact.' },
      { condition: 'New offer: 5200 USD/month', classification: 'Grounded', reason: 'Specific stated offer.' },
      { condition: 'Current job has high job security', classification: 'Subjective', reason: 'Perceived security — not verified.' },
      { condition: 'New role requires relocation', classification: 'Grounded', reason: 'Factual structural requirement.' },
      { condition: 'Years at current company: 3', classification: 'Grounded', reason: 'Measurable tenure fact.' },
      { condition: 'New company is early-stage startup', classification: 'Grounded', reason: 'Company stage is factual.' },
      { condition: 'Current commute: 1.5 hours daily', classification: 'Grounded', reason: 'Concrete time cost.' },
    ],
    constraints: [
      { type: 'Financial', content: '30% salary increase offsets short-term transition risk.', severity: 'Medium', reliability: 'High' },
      { type: 'Structural', content: 'Relocation introduces logistical and financial cost.', severity: 'High', reliability: 'High' },
      { type: 'Risk', content: 'Early-stage startup carries higher employment instability.', severity: 'High', reliability: 'Medium' },
      { type: 'Time', content: 'Commute reduction may improve productivity and wellbeing.', severity: 'Low', reliability: 'Medium' },
    ],
    states: [
      { code: 'ψ1', content: 'Salary increase creates financial incentive to move', category: 'Internal', role: 'core', perspective: 'internal', dynamics: 'active', validity: 'real' },
      { code: 'ψ2', content: 'Startup risk introduces income instability potential', category: 'Structural', role: 'core', perspective: 'external', dynamics: 'static', validity: 'potential' },
      { code: 'ψ3', content: 'Relocation cost and disruption not yet quantified', category: 'External', role: 'functional', perspective: 'external', dynamics: 'static', validity: 'potential' },
      { code: 'ψ4', content: 'Current commute represents recoverable time cost', category: 'Internal', role: 'functional', perspective: 'internal', dynamics: 'static', validity: 'real' },
      { code: 'ψ5', content: 'Job security perception at current role unverified', category: 'Structural', role: 'functional', perspective: 'internal', dynamics: 'static', validity: 'potential' },
    ],
    transitions: [
      { name: 'Quantify relocation cost', from: 'ψ3', goal: 'Potential→Real', cost: 0.2, time: 0.2, controllability: 0.9, impact: 0.8 },
      { name: 'Verify startup runway and stability', from: 'ψ2', goal: 'Potential→Real', cost: 0.2, time: 0.3, controllability: 0.8, impact: 0.9 },
      { name: 'Negotiate remote or hybrid option', from: 'ψ3', goal: 'External→Internal', cost: 0.3, time: 0.4, controllability: 0.6, impact: 0.7 },
      { name: 'Accept offer and relocate', from: 'ψ1', goal: 'Static→Active', cost: 0.8, time: 0.6, controllability: 0.5, impact: 0.8 },
    ],
  },
  'start-business': {
    condition_check: [
      { condition: 'Available savings: 15000 USD', classification: 'Grounded', reason: 'Concrete capital figure.' },
      { condition: 'Monthly personal expenses: 2000 USD', classification: 'Grounded', reason: 'Measurable cost baseline.' },
      { condition: 'Current employment: full-time', classification: 'Grounded', reason: 'Factual status.' },
      { condition: 'Business idea has no validated customers yet', classification: 'Grounded', reason: 'Stated factual constraint.' },
      { condition: 'Estimated runway: 7 months', classification: 'Grounded', reason: 'Calculable from savings / expenses.' },
      { condition: 'Domain experience: 4 years', classification: 'Grounded', reason: 'Concrete experience duration.' },
      { condition: 'No co-founder identified', classification: 'Grounded', reason: 'Factual structural gap.' },
    ],
    constraints: [
      { type: 'Financial', content: '7-month runway is below recommended 12-month threshold for early ventures.', severity: 'High', reliability: 'High' },
      { type: 'Structural', content: 'No co-founder increases single-point-of-failure risk across execution.', severity: 'High', reliability: 'High' },
      { type: 'Risk', content: 'No validated customers means product-market fit is unconfirmed.', severity: 'Critical', reliability: 'High' },
      { type: 'Time', content: 'Full-time employment limits bandwidth for parallel validation.', severity: 'Medium', reliability: 'High' },
    ],
    states: [
      { code: 'ψ1', content: 'Runway insufficient for full commitment without validation', category: 'Structural', role: 'core', perspective: 'internal', dynamics: 'static', validity: 'real' },
      { code: 'ψ2', content: 'No customer validation leaves market fit unconfirmed', category: 'External', role: 'core', perspective: 'external', dynamics: 'static', validity: 'potential' },
      { code: 'ψ3', content: 'Domain experience provides execution credibility', category: 'Internal', role: 'functional', perspective: 'internal', dynamics: 'active', validity: 'real' },
      { code: 'ψ4', content: 'Solo structure increases operational and decision risk', category: 'Structural', role: 'functional', perspective: 'internal', dynamics: 'static', validity: 'real' },
      { code: 'ψ5', content: 'Side validation while employed is structurally feasible', category: 'Internal', role: 'functional', perspective: 'internal', dynamics: 'active', validity: 'potential' },
    ],
    transitions: [
      { name: 'Validate with first paying customer', from: 'ψ2', goal: 'Potential→Real', cost: 0.3, time: 0.4, controllability: 0.7, impact: 0.9 },
      { name: 'Begin side project without quitting', from: 'ψ5', goal: 'Static→Active', cost: 0.2, time: 0.3, controllability: 0.9, impact: 0.7 },
      { name: 'Identify co-founder or key partner', from: 'ψ4', goal: 'External→Internal', cost: 0.4, time: 0.6, controllability: 0.5, impact: 0.8 },
      { name: 'Quit and commit full-time', from: 'ψ1', goal: 'Static→Active', cost: 0.9, time: 0.5, controllability: 0.4, impact: 0.7 },
    ],
  },
  'travel-abroad': {
    condition_check: [
      { condition: 'Budget: 3000 USD', classification: 'Grounded', reason: 'Concrete stated budget.' },
      { condition: 'Destination: Southeast Asia', classification: 'Grounded', reason: 'Specific stated destination.' },
      { condition: 'Travel dates: not yet confirmed', classification: 'Unverified', reason: 'No fixed dates — planning stage only.' },
      { condition: 'Visa requirements: visa on arrival available', classification: 'Grounded', reason: 'Factual policy — verifiable.' },
      { condition: 'Flight cost estimate: 800 USD', classification: 'Grounded', reason: 'Concrete cost estimate.' },
      { condition: 'Hotel cost estimate: 40 USD/night', classification: 'Grounded', reason: 'Specific nightly rate.' },
      { condition: 'Safety concerns: low for planned region', classification: 'Subjective', reason: 'Safety perception varies by source.' },
      { condition: 'Purpose of travel: personal recovery and exploration', classification: 'Subjective', reason: 'Motivational — not measurable.' },
      { condition: 'Work schedule: 2 weeks annual leave remaining', classification: 'Grounded', reason: 'Concrete available time constraint.' },
    ],
    constraints: [
      { type: 'Financial', content: 'Budget covers flight + ~55 nights at estimated hotel rate.', severity: 'Low', reliability: 'High' },
      { type: 'Time', content: '2-week leave cap limits maximum trip duration.', severity: 'Medium', reliability: 'High' },
      { type: 'Structural', content: 'Unconfirmed dates introduce scheduling and pricing uncertainty.', severity: 'Medium', reliability: 'Medium' },
      { type: 'Psychological', content: 'Recovery and exploration are primary motivators — outcomes hard to measure.', severity: 'Low', reliability: 'Low' },
    ],
    states: [
      { code: 'ψ1', content: 'Budget is adequate for planned destination and duration', category: 'Internal', role: 'core', perspective: 'internal', dynamics: 'static', validity: 'real' },
      { code: 'ψ2', content: 'Leave window constrains trip length to 14 days maximum', category: 'Structural', role: 'core', perspective: 'external', dynamics: 'static', validity: 'real' },
      { code: 'ψ3', content: 'No confirmed dates creates planning and pricing risk', category: 'External', role: 'functional', perspective: 'external', dynamics: 'static', validity: 'potential' },
      { code: 'ψ4', content: 'Personal recovery goal is unverifiable but structurally valid', category: 'Internal', role: 'functional', perspective: 'internal', dynamics: 'active', validity: 'potential' },
      { code: 'ψ5', content: 'Visa accessibility removes a key friction point', category: 'External', role: 'functional', perspective: 'external', dynamics: 'static', validity: 'real' },
    ],
    transitions: [
      { name: 'Confirm travel dates', from: 'ψ3', goal: 'Potential→Real', cost: 0.1, time: 0.1, controllability: 0.9, impact: 0.8 },
      { name: 'Book flights within budget window', from: 'ψ1', goal: 'Static→Active', cost: 0.3, time: 0.2, controllability: 0.8, impact: 0.7 },
      { name: 'Plan itinerary within leave constraint', from: 'ψ2', goal: 'External→Internal', cost: 0.2, time: 0.2, controllability: 0.9, impact: 0.6 },
      { name: 'Defer to next leave cycle', from: 'ψ3', goal: 'Other', cost: 0.1, time: 0.8, controllability: 0.7, impact: 0.4 },
    ],
  },
  'investment': {
    condition_check: [
      { condition: 'Available capital: 10000 USD', classification: 'Grounded', reason: 'Concrete investable amount.' },
      { condition: 'Monthly income: 3500 USD', classification: 'Grounded', reason: 'Measurable income baseline.' },
      { condition: 'Existing debt: 8000 USD', classification: 'Grounded', reason: 'Concrete liability figure.' },
      { condition: 'Risk tolerance: medium', classification: 'Subjective', reason: 'Self-assessed — not objectively verified.' },
      { condition: 'Investment target: long-term wealth building', classification: 'Subjective', reason: 'Goal framing — not measurable directly.' },
      { condition: 'Time horizon: 10 years', classification: 'Grounded', reason: 'Specific stated duration.' },
      { condition: 'Emergency fund: 3 months covered', classification: 'Grounded', reason: 'Concrete safety buffer.' },
      { condition: 'Expected return assumption: 7% annually', classification: 'Unverified', reason: 'Assumption — not guaranteed.' },
      { condition: 'Maximum acceptable loss: 20%', classification: 'Subjective', reason: 'Stated preference — behavioral tolerance unverified under stress.' },
    ],
    constraints: [
      { type: 'Financial', content: 'Existing debt at 80% of available capital creates opportunity cost tension.', severity: 'High', reliability: 'High' },
      { type: 'Risk', content: 'Medium risk tolerance is self-assessed and may not hold under real drawdown conditions.', severity: 'Medium', reliability: 'Low' },
      { type: 'Time', content: '10-year horizon is sufficient for compound growth under most market scenarios.', severity: 'Low', reliability: 'High' },
      { type: 'Structural', content: '3-month emergency fund provides minimal but present safety buffer.', severity: 'Medium', reliability: 'High' },
    ],
    states: [
      { code: 'ψ1', content: 'Debt-to-capital ratio suggests partial debt resolution before full deployment', category: 'Structural', role: 'core', perspective: 'internal', dynamics: 'static', validity: 'real' },
      { code: 'ψ2', content: 'Long time horizon enables compounding advantage', category: 'Internal', role: 'core', perspective: 'internal', dynamics: 'active', validity: 'real' },
      { code: 'ψ3', content: 'Return assumption of 7% is unverified and market-dependent', category: 'External', role: 'functional', perspective: 'external', dynamics: 'static', validity: 'potential' },
      { code: 'ψ4', content: 'Emergency fund coverage is minimal — additional stress reduces flexibility', category: 'Structural', role: 'functional', perspective: 'internal', dynamics: 'static', validity: 'real' },
      { code: 'ψ5', content: 'Risk tolerance under real loss conditions is untested', category: 'Internal', role: 'functional', perspective: 'internal', dynamics: 'static', validity: 'potential' },
    ],
    transitions: [
      { name: 'Clear high-interest debt first', from: 'ψ1', goal: 'Static→Active', cost: 0.3, time: 0.5, controllability: 0.9, impact: 0.9 },
      { name: 'Begin with diversified low-risk allocation', from: 'ψ5', goal: 'Potential→Real', cost: 0.2, time: 0.2, controllability: 0.8, impact: 0.7 },
      { name: 'Extend emergency fund to 6 months', from: 'ψ4', goal: 'Static→Active', cost: 0.3, time: 0.4, controllability: 0.9, impact: 0.6 },
      { name: 'Deploy full capital immediately', from: 'ψ2', goal: 'Static→Active', cost: 0.7, time: 0.2, controllability: 0.5, impact: 0.8 },
    ],
  },
}

// ── System prompt (same as V3) ────────────────────────────
const SYSTEM_PROMPT = `You are operating under STME V3:
Condition-Based Structured Multi-State Transition & Evaluation.

The user will provide:
1. A main decision question
2. Multiple known conditions

Your task is NOT to answer the decision.
Your task is to validate, classify, and convert conditions into decision constraints,
then generate STME states and transitions.

Before generating STME states, classify each condition as:

1. Grounded - factual, measurable, directly stated, or concrete
2. Subjective - preference, emotion, desire, fear, value judgment
3. Unverified - prediction, assumption, exaggeration, unsupported claim
4. Irrelevant - unrelated to the decision question

Then convert relevant conditions into constraints:
Financial / Structural / Time / Risk / Psychological / External

Rules:
- Do NOT make the final decision.
- Do NOT recommend an action.
- Output valid JSON only.
- Do not include markdown.

JSON Schema:
{
  "condition_check": [{ "condition": "", "classification": "Grounded / Subjective / Unverified / Irrelevant", "reason": "" }],
  "constraints": [{ "type": "Financial / Structural / Time / Risk / Psychological / External", "content": "", "severity": "Low / Medium / High / Critical", "reliability": "High / Medium / Low" }],
  "states": [{ "code": "ψ1", "content": "", "category": "Internal / External / Structural", "role": "core or functional", "perspective": "internal or external", "dynamics": "active or static", "validity": "real or potential" }],
  "transitions": [{ "name": "", "from": "ψX", "goal": "Potential→Real / Static→Active / External→Internal / Other", "cost": 0.1, "time": 0.1, "controllability": 0.1, "impact": 0.1 }]
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
  if (status === 429 || msg.toLowerCase().includes('quota') || msg.toLowerCase().includes('credit')) return 'Insufficient Credit → Please add credits'
  if (msg.toLowerCase().includes('json') || msg.toLowerCase().includes('parse')) return 'JSON Error → Invalid system output format'
  return msg || 'Unknown Error → Please try again'
}
function downloadJSON(data, scenarioId) {
  const ts   = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `stme_v4_${scenarioId}_${ts}.json`
  a.click()
  URL.revokeObjectURL(url)
}
function buildInterpretation(result, transitions) {
  const constraints = result?.constraints || []
  const high        = constraints.filter(c => ['High', 'Critical'].includes(c.severity))
  const financial   = constraints.filter(c => c.type === 'Financial')
  const top         = transitions[0]
  return [
    high.length > 0
      ? `This decision space contains ${high.length} high-pressure constraint(s).`
      : `This decision space does not show critical constraint pressure.`,
    financial.length > 0
      ? `Financial constraints are present and should be treated as primary decision boundaries.`
      : `Financial pressure is not dominant in the provided conditions.`,
    top ? `Highest-priority transition: "${top.name}" (Score ${top.score}).` : '',
    `STME V4 does not make the decision. It models the reality around the decision before convergence.`
  ].filter(Boolean).join('\n\n')
}

// ─────────────────────────────────────────────────────────
export default function DemoV4() {
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [conditions, setConditions]             = useState([])
  const [question, setQuestion]                 = useState('')
  const [mode, setMode]                         = useState('demo')   // 'demo' | 'full'
  const [apiKey, setApiKey]                     = useState('')
  const [showKey, setShowKey]                   = useState(false)
  const [loading, setLoading]                   = useState(false)
  const [result, setResult]                     = useState(null)
  const [error, setError]                       = useState('')
  const [copied, setCopied]                     = useState(false)

  function selectScenario(s) {
    setSelectedScenario(s)
    setQuestion(s.question)
    setConditions([...s.conditions])
    setResult(null)
    setError('')
  }

  function updateCondition(i, val) {
    const next = [...conditions]; next[i] = val; setConditions(next)
  }
  function addCondition()       { setConditions([...conditions, '']) }
  function removeCondition(i)   { setConditions(conditions.filter((_, idx) => idx !== i)) }

  async function handleRun() {
    if (!selectedScenario) { setError('Please select a scenario first.'); return }

    // Demo Mode — use mock
    if (mode === 'demo') {
      setLoading(true)
      setError('')
      setResult(null)
      setTimeout(() => {
        setResult(MOCK_RESULTS[selectedScenario.id])
        setLoading(false)
      }, 900)
      return
    }

    // Full Analysis — requires API key
    if (!apiKey.trim()) { setError('API Key Error → Please check your API Key'); return }
    const cleanConditions = conditions.map(c => c.trim()).filter(Boolean)
    if (cleanConditions.length < 2) { setError('Please enter at least two known conditions.'); return }

    setError(''); setResult(null); setLoading(true)
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey.trim()}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: JSON.stringify({ decision_question: question, known_conditions: cleanConditions }, null, 2) }
          ],
          temperature: 0.2
        })
      })
      if (!res.ok) {
        const err = await res.json()
        throw Object.assign(new Error(err.error?.message || ''), { status: res.status })
      }
      const data = await res.json()
      let parsed
      try { parsed = JSON.parse(data.choices[0].message.content) }
      catch { throw new Error('JSON parse failed') }
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

  const states      = result?.states || []
  const transitions = result
    ? [...result.transitions].map(t => ({ ...t, score: priorityScore(t) })).sort((a, b) => b.score - a.score)
    : []
  const internal    = states.filter(s => s.category === 'Internal')
  const external    = states.filter(s => s.category === 'External')
  const structural  = states.filter(s => s.category === 'Structural')
  const interpretation = result ? buildInterpretation(result, transitions) : ''

  return (
    <>
      <Head>
        <title>STME V4 — Guided Scenario Demo · PIDA-LAB</title>
        <meta name="description" content="STME V4: Choose a scenario, load example conditions, run STME with or without your own API key." />
      </Head>
      <Nav />

      <div className="demo-page">

        {/* HEADER */}
        <div className="demo-header">
          <Link href="/demo" className="back-link">← Demo Index</Link>
          <div className="v1-version-badge">
            <span className="demo-version-dot dot-v4" />
            V4 · Guided Scenario Demo
          </div>
          <h1 className="static-h1">STME V4</h1>
          <p className="demo-tagline">Choose a scenario. Load example conditions. Run STME with or without your own API key.</p>
          <div className="demo-desc">
            <p>V4 combines guided scenario selection with condition-based analysis. Select a preset scenario, customise conditions if needed, then run in Demo Mode or Full Analysis.</p>
          </div>
        </div>

        <div className="static-divider" />

        {/* MODE SELECTOR */}
        <div className="v4-mode-card">
          <div className="v4-mode-row">
            <button
              className={`v4-mode-btn ${mode === 'demo' ? 'v4-mode-active' : ''}`}
              onClick={() => setMode('demo')}
            >
              <span className="v4-mode-title">Free Demo Mode</span>
              <span className="v4-mode-desc">使用預設的 mock 範例資料 · 不需要 API Key · 讓人理解 STME</span>
            </button>
            <button
              className={`v4-mode-btn ${mode === 'full' ? 'v4-mode-active' : ''}`}
              onClick={() => setMode('full')}
            >
              <span className="v4-mode-title">User API Key Mode</span>
              <span className="v4-mode-desc">使用者輸入自己的 API Key · 跑完整 STME</span>
            </button>
          </div>
        </div>

        {/* SCENARIO SELECTOR */}
        <div className="v4-scenario-section">
          <div className="demo-section-title">Choose a Scenario</div>
          <div className="v4-scenario-grid">
            {SCENARIOS.map((s, i) => (
              <button
                key={s.id}
                className={`v4-scenario-btn ${selectedScenario?.id === s.id ? 'v4-scenario-active' : ''}`}
                onClick={() => selectScenario(s)}
              >
                <span className="v4-scenario-num">{i + 1}.</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONDITIONS + FORM — shown after scenario selected */}
        {selectedScenario && (
          <div className="demo-form">
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
                    <button className="demo-toggle-btn" onClick={() => removeCondition(i)}>Remove</button>
                  </div>
                ))}
              </div>
              <button className="v2-export-btn" onClick={addCondition}>+ Add Condition</button>
            </div>

            {/* API Key input — only in full mode */}
            {mode === 'full' && (
              <div className="demo-field">
                <label className="demo-label">OpenAI API Key</label>
                <div className="demo-notice" style={{ marginBottom: '0.75rem' }}>
                  <span className="demo-notice-icon">⚠</span>
                  <div>
                    <strong>Your API key is used only in your browser/session and is not stored by PIDA Lab.</strong>
                  </div>
                </div>
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
            )}

            {error && (
              <div className="demo-error v2-error-block">
                <span className="v2-error-icon">✕</span>
                {error}
              </div>
            )}

            <button className="demo-run-btn" onClick={handleRun} disabled={loading}>
              {loading ? 'Analyzing...' : mode === 'demo' ? 'Run Demo Analysis →' : 'Run Full STME Analysis →'}
            </button>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="demo-loading">
            <div className="demo-loading-bar" />
            <p>{mode === 'demo' ? 'Loading mock scenario data...' : 'Validating conditions and modeling decision structure...'}</p>
          </div>
        )}

        {/* RESULTS */}
        {result && (
          <div className="demo-results">
            <div className="static-divider" />

            {mode === 'demo' && (
              <div className="v4-demo-badge">DEMO MODE — Mock Data</div>
            )}

            {/* CONDITION CHECK */}
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

            {/* CONSTRAINTS */}
            <div className="demo-section-title" style={{ marginTop: '2rem' }}>Constraint Mapping</div>
            <div className="demo-analysis-grid">
              {result.constraints?.map((c, i) => (
                <div key={i} className="demo-analysis-card">
                  <div className="demo-analysis-label">{c.type}</div>
                  <div className="demo-analysis-val">{c.severity}</div>
                  <div className="demo-analysis-note">{c.content}<br />Reliability: {c.reliability}</div>
                </div>
              ))}
            </div>

            {/* STATES */}
            <div className="demo-section-title" style={{ marginTop: '2rem' }}>States</div>
            {[
              { label: 'Internal',   items: internal,   cls: 'tag-internal' },
              { label: 'External',   items: external,   cls: 'tag-external' },
              { label: 'Structural', items: structural, cls: 'tag-structural' },
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

            {/* TRANSITIONS */}
            <div className="demo-section-title" style={{ marginTop: '2rem' }}>Transitions · Priority Ranked</div>
            <div className="v2-score-formula">
              Score = (Impact × Controllability) / (Cost × Time) &nbsp;·&nbsp; Higher score → more structurally favorable transition
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

            {/* FINAL NOTE */}
            <div className="demo-final-note">
              <div className="demo-section-title">Final STME Note</div>
              <p>STME V4 does not make the decision.</p>
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

            {/* INTERPRETATION */}
            <div className="v2-interpretation">
              <div className="v2-interpretation-header">
                <span className="v2-interpretation-label">— V4 INTERPRETATION —</span>
                <button className="v1-raw-copy" onClick={() => navigator.clipboard.writeText(interpretation)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
                    <rect x="9" y="9" width="13" height="13" rx="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                </button>
              </div>
              <pre className="v2-interpretation-body">{interpretation}</pre>
            </div>

            {/* EXPORT */}
            <div className="v2-export-row">
              <button className="v2-export-btn" onClick={handleCopyResult}>
                {copied ? '✓ Copied' : '[Copy Result]'}
              </button>
              <button className="v2-export-btn" onClick={() => downloadJSON(result, selectedScenario?.id || 'unknown')}>
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
