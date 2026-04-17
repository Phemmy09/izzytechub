import Anthropic from '@anthropic-ai/sdk'
import { readFileSync } from 'fs'
import { join } from 'path'
import { NextRequest } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function getKnowledgeBase(): string {
  try {
    return readFileSync(join(process.cwd(), 'lib/chatbot-knowledge.md'), 'utf-8')
  } catch {
    return ''
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages, lead } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages' }), { status: 400 })
    }

    const kb = getKnowledgeBase()
    const leadContext = lead
      ? `\n\nYou are currently chatting with:\n- Name: ${lead.name}\n- Email: ${lead.email}\n- Phone: ${lead.phone || 'Not provided'}\n- Service Interest: ${lead.service}`
      : ''

    const systemPrompt = `You are Izzy, the friendly AI assistant for Izzytechub — an AI automation and consulting agency led by Israel O. Dare. Your job is to help visitors learn about Izzytechub's services, answer questions, and guide them toward booking a consultation.

Keep responses concise (2–4 sentences max unless a detailed answer is needed). Be warm, professional, and helpful. Always encourage prospects to reach out via WhatsApp (+1 424 546 0129) or the contact form for specific project inquiries.

Never make up pricing, timelines, or guarantees beyond what's in the knowledge base.${leadContext}

--- KNOWLEDGE BASE ---
${kb}`

    const stream = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      stream: true,
      system: [
        {
          type: 'text',
          text: systemPrompt,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              )
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (err) {
    console.error('Chat API error:', err)
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
