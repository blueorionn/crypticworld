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

/**
 * Toggle sidebar
 */
export function toggleSideBar(
  isSideBarOpen: boolean,
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (window && window.innerWidth > 1280) return
  if (isSideBarOpen) setIsSideBarOpen(false)
  if (!isSideBarOpen) setIsSideBarOpen(true)
}
