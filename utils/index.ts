import algorithms from '@/data/algorithms.json'

export function generateHashUrl(hash: string) {
  return `/hash/${hash}`
}

/**
 * Check if algorithm is supported
 */
export function checkAlgorithmSupport(url: string) {
  return algorithms.find((a) => a.url === generateHashUrl(url))
}
