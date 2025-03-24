import algorithms from '@/data/algorithms.json'

export function generateHashUrl(hash: string) {
  return `/hash/${hash}`
}

/**
 * Check if algorithm is supported
 */
export function checkAlgorithmSupport(name: string) {
  return algorithms.find((a) => a.url === generateHashUrl(name))
}
