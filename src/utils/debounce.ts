export function debounce<Args extends unknown[]>(
  func: (...args: Args) => Promise<void>,
  wait: number
): (...args: Args) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Args): void {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      void func(...args);
    }, wait);
  };
}
