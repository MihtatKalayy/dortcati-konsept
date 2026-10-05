import { type RefObject, useEffect } from 'react'

/**
 * Yerel <dialog> öğesini `open` durumuyla eşitler (showModal/close) ve açıkken
 * arka planın kaymasını engeller. Modal açıkken sayfanın geri kalanı etkileşime
 * kapanır; kapanınca tarayıcı odağı açan öğeye geri verir.
 */
export function useModalDialog(ref: RefObject<HTMLDialogElement | null>, open: boolean) {
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [ref, open])

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = previous
    }
  }, [open])
}
