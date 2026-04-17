'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Loader2, ChevronRight } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Lead {
  name: string
  email: string
  phone: string
  service: string
}

type LeadStep = 'name' | 'email' | 'phone' | 'service' | 'done'

const SERVICES = [
  'AI Automation',
  'App Development',
  'Lead Generation',
  'AI Consulting',
  'Sales Funnel Design',
  'Social Media Automation',
  'Other',
]

const BOT_INTRO = `Hi there! 👋 I'm Izzy, your AI assistant for Izzytechub.

Before we dive in, I'd love to know a bit about you so I can give you the best help. It'll only take a moment!

What's your **first name**?`

const WEBHOOK_URL = process.env.NEXT_PUBLIC_NEWSLETTER_WEBHOOK as string

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: BOT_INTRO },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [leadStep, setLeadStep] = useState<LeadStep>('name')
  const [lead, setLead] = useState<Lead>({ name: '', email: '', phone: '', service: '' })
  const [showServicePicker, setShowServicePicker] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  const addMessage = (role: Message['role'], content: string) => {
    setMessages((prev) => [...prev, { role, content }])
  }

  async function notifyWhatsApp(completedLead: Lead, firstQuestion?: string) {
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'chatbot_lead',
          name: completedLead.name,
          email: completedLead.email,
          phone: completedLead.phone || 'Not provided',
          service: completedLead.service,
          firstQuestion: firstQuestion || 'Started chatting',
          source: 'izzytechub.com chatbot',
          timestamp: new Date().toISOString(),
        }),
      })
    } catch {
      // Silent — don't block user experience
    }
  }

  async function streamResponse(userMessages: Message[], currentLead: Lead) {
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: userMessages.map((m) => ({ role: m.role, content: m.content })),
          lead: currentLead,
        }),
      })

      if (!res.ok || !res.body) throw new Error('Stream failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') break
          try {
            const parsed = JSON.parse(data)
            if (parsed.text) {
              assistantText += parsed.text
              setMessages((prev) => {
                const updated = [...prev]
                updated[updated.length - 1] = { role: 'assistant', content: assistantText }
                return updated
              })
            }
          } catch {
            // Skip malformed chunks
          }
        }
      }
    } catch {
      addMessage('assistant', 'Sorry, I ran into an issue. Please try again or reach us on WhatsApp: +1 424 546 0129')
    } finally {
      setLoading(false)
    }
  }

  async function handleLeadStep(value: string) {
    addMessage('user', value)

    if (leadStep === 'name') {
      const updated = { ...lead, name: value.trim() }
      setLead(updated)
      setLeadStep('email')
      setTimeout(() => addMessage('assistant', `Nice to meet you, **${updated.name}**! 😊\n\nWhat's your **email address**? (So we can follow up with you)`), 300)
    } else if (leadStep === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value.trim())) {
        setTimeout(() => addMessage('assistant', "Hmm, that doesn't look like a valid email. Could you double-check it?"), 300)
        return
      }
      const updated = { ...lead, email: value.trim() }
      setLead(updated)
      setLeadStep('phone')
      setTimeout(() => addMessage('assistant', `Got it! 📧\n\nWhat's the best **phone number** to reach you? (You can type "skip" to skip this)`), 300)
    } else if (leadStep === 'phone') {
      const phone = value.toLowerCase() === 'skip' ? '' : value.trim()
      const updated = { ...lead, phone }
      setLead(updated)
      setLeadStep('service')
      setTimeout(() => {
        addMessage('assistant', 'Almost there! 🎯\n\nWhich service are you most interested in?')
        setShowServicePicker(true)
      }, 300)
    }
  }

  async function handleServiceSelect(service: string) {
    const completedLead = { ...lead, service }
    setLead(completedLead)
    setLeadStep('done')
    setShowServicePicker(false)

    addMessage('user', service)

    await notifyWhatsApp(completedLead)

    setTimeout(() => {
      addMessage(
        'assistant',
        `Perfect! I've noted your interest in **${service}**. 🚀\n\nYou're all set — ask me anything about Izzytechub's services, pricing, process, or anything else. I'm here to help!`
      )
    }, 300)
  }

  async function handleSend() {
    const value = input.trim()
    if (!value || loading) return
    setInput('')

    if (leadStep !== 'done') {
      await handleLeadStep(value)
      return
    }

    addMessage('user', value)
    const updatedMessages: Message[] = [...messages, { role: 'user', content: value }]

    // Notify webhook with question on first user message after lead collection
    const isFirstQuestion = messages.filter((m) => m.role === 'user').length === 3
    if (isFirstQuestion) {
      notifyWhatsApp(lead, value)
    }

    await streamResponse(updatedMessages, lead)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function renderMessage(msg: Message, idx: number) {
    const isBot = msg.role === 'assistant'
    return (
      <div key={idx} className={`flex gap-2.5 ${isBot ? '' : 'flex-row-reverse'}`}>
        <div
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
            isBot ? 'bg-red-600' : 'bg-neutral-700'
          }`}
        >
          {isBot ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
        </div>
        <div
          className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isBot
              ? 'bg-neutral-800 text-neutral-100 rounded-tl-sm'
              : 'bg-red-600 text-white rounded-tr-sm'
          }`}
          dangerouslySetInnerHTML={{
            __html: msg.content
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\n/g, '<br>'),
          }}
        />
      </div>
    )
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-red-600 hover:bg-red-500 rounded-full shadow-lg shadow-red-900/40 flex items-center justify-center transition-all duration-200 hover:scale-105"
        aria-label="Open chat"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl shadow-black/60 flex flex-col overflow-hidden"
          style={{ height: '520px' }}>
          {/* Header */}
          <div className="bg-red-600 px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Izzy — AI Assistant</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-red-100 text-xs">Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-neutral-800">
            {messages.map((msg, idx) => renderMessage(msg, idx))}

            {/* Service picker */}
            {showServicePicker && (
              <div className="flex flex-col gap-1.5 pl-9">
                {SERVICES.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleServiceSelect(s)}
                    className="flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-red-600/20 border border-neutral-700 hover:border-red-500/50 rounded-xl text-sm text-neutral-300 hover:text-white transition-all text-left"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    {s}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-neutral-800 px-3.5 py-2.5 rounded-2xl rounded-tl-sm">
                  <Loader2 className="w-4 h-4 text-neutral-400 animate-spin" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-neutral-800 p-3 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading || showServicePicker}
              placeholder={
                leadStep === 'name' ? 'Your first name…'
                : leadStep === 'email' ? 'your@email.com'
                : leadStep === 'phone' ? 'Phone or type "skip"'
                : 'Ask me anything…'
              }
              className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-500/60 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading || showServicePicker}
              className="w-9 h-9 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
