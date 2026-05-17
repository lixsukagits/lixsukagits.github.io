/**
 * use_easter_egg.js
 * Global easter egg event bus — halaman mana saja bisa trigger modal
 * tanpa perlu prop drilling.
 *
 * Cara pakai di halaman:
 *   import { triggerEasterEgg } from '../store/use_easter_egg'
 *   triggerEasterEgg('photo')   // id egg yang ingin ditrigger
 */

// Simple event emitter — tidak butuh library eksternal
const listeners = new Set()

export function triggerEasterEgg(id) {
  listeners.forEach(fn => fn(id))
}

export function onEasterEgg(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}