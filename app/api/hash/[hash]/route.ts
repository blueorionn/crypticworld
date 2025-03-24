import crypto from 'node:crypto'
import { checkAlgorithmSupport } from '@/utils/index'
import { notFound } from 'next/navigation'

export async function POST(request: Request) {
  // check if algorithm is supported
  const url = request.url
  const algorithm = checkAlgorithmSupport(
    url.split('/')[url.split('/').length - 1]
  )
  if (!algorithm) notFound()

  try {
    const body = await request.json()
    const { text } = body

    // validity of body.text
    if (typeof text !== 'string')
      new Response(JSON.stringify({ error: 'Invalid Body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })

    // Processing data
    const hashed = crypto
      .createHash(algorithm.name)
      .update(body.text)
      .digest('hex')

    // Return a new Response with JSON data
    return new Response(JSON.stringify({ text, hashed }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Something went wrong!' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
