import { useEffect, useRef } from 'react'

/**
 * Adds .reveal-init on mount and flips .is-visible on elements marked
 * [data-reveal] as they enter the viewport.
 *
 * Browsers with native scroll-driven animations skip this entirely —
 * the reveal is handled purely in CSS (see global.css).
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (CSS.supports('animation-timeline: view()')) return
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!targets.length) return
    el.classList.add('reveal-init')

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    targets.forEach((t) => io.observe(t))
    return () => {
      io.disconnect()
      el.classList.remove('reveal-init')
    }
  }, [])

  return ref
}

/** True when native CSS scroll-driven animations are available. */
export const supportsScrollDriven =
  typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()')

/**
 * JS parallax fallback: sets --p (0..1 progress of each [data-parallax]
 * element through the viewport) on a rAF-throttled scroll listener.
 * When scroll-driven animations are supported, CSS owns the effect and
 * this hook is a no-op.
 */
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (supportsScrollDriven) return
    const el = ref.current
    if (!el) return

    const layers = Array.from(el.querySelectorAll<HTMLElement>('[data-parallax]'))
    if (!layers.length) return

    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      for (const layer of layers) {
        const rect = layer.getBoundingClientRect()
        const total = vh + rect.height
        const p = Math.min(1, Math.max(0, 1 - (rect.top + rect.height) / total))
        layer.style.setProperty('--p', p.toFixed(4))
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return ref
}
