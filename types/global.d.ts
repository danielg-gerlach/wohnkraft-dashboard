// This file ensures auto-imported composables are recognized
import '#imports'

declare global {
  interface Window {
    location: {
      href: string
    }
  }
}