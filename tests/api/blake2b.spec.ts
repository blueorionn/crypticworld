import { test, expect, request } from '@playwright/test'

test.describe('Blake2b Hash API Page', () => {
  test('test for empty data', async ({ request }) => {
    const response = await request.post(
      'http://localhost:3000/api/hash/blake2b',
      {
        data: {},
      }
    )

    expect(await response.status()).toBe(500)
  })

  test('should return Blake2b hash of input text', async ({ request }) => {
    const response = await request.post(
      'http://localhost:3000/api/hash/blake2b',
      {
        data: {
          text: 'hello world',
        },
      }
    )

    expect(await response.ok()).toBeTruthy()

    const json = await response.json()
    const expectedHash =
      '021ced8799296ceca557832ab941a50b4a11f83478cf141f51f933f653ab9fbcc05a037cddbed06e309bf334942c4e58cdf1a46e237911ccd7fcf9787cbc7fd0'

    expect(json.hashed).toBe(expectedHash)
  })

  test('test for special characters', async ({ request }) => {
    const response = await request.post(
      'http://localhost:3000/api/hash/blake2b',
      {
        data: {
          text: '🔥💻🧠✨',
        },
      }
    )

    expect(await response.ok()).toBeTruthy()

    const json = await response.json()
    const expectedHash =
      '786bd8b04582d3bb0ca797f347b104e67e8b527ee21dd56753bd11ad0441437867f6c68b742c51a57480d0192316038b48c0ed5305fb4280f07b497e522412c5'

    expect(json.hashed).toBe(expectedHash)
  })

  test('test for large input', async ({ request }) => {
    const response = await request.post(
      'http://localhost:3000/api/hash/blake2b',
      {
        data: {
          text: 'hello world!'.repeat(1_000_000),
        },
      }
    )

    expect(await response.ok()).toBeTruthy()
    expect(await response.status()).toBe(200)
  })
})
