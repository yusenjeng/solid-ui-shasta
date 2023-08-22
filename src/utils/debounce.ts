function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...funcArgs: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export default debounce
