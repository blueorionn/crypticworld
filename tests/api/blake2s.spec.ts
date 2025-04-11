import { test, expect } from '@playwright/test'

test.describe('Blake2s Hash API Page', () => {
  test('test for empty data', async ({ request }) => {
    const response = await request.post('/api/hash/blake2s', {
      data: {},
    })

    expect(await response.status()).toBe(500)
  })

  test('should return Blake2s hash of input text', async ({ request }) => {
    const response = await request.post('/api/hash/blake2s', {
      data: {
        text: 'hello world',
      },
    })

    expect(await response.ok()).toBeTruthy()

    const json = await response.json()
    const expectedHash =
      '9aec6806794561107e594b1f6a8a6b0c92a0cba9acf5e5e93cca06f781813b0b'

    expect(json.hashed).toBe(expectedHash)
  })

  test('test for special characters', async ({ request }) => {
    const response = await request.post('/api/hash/blake2s', {
      data: {
        text: '🔥💻🧠✨',
      },
    })

    expect(await response.ok()).toBeTruthy()

    const json = await response.json()
    const expectedHash =
      'd80e0ccb7c66586f6361ced8af575a9757ef35479bec410e6d72232f0e526e8f'

    expect(json.hashed).toBe(expectedHash)
  })

  test('test for large input', async ({ request }) => {
    const response = await request.post('/api/hash/blake2s', {
      data: {
        text: 'hello world!'.repeat(1_000_000),
      },
    })

    expect(await response.ok()).toBeTruthy()
    expect(await response.status()).toBe(200)
  })
})
