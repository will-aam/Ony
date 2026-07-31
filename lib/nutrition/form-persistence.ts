"use client"

import { useEffect, useRef, useCallback } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { AnamneseFormValues } from "./schema"

const STORAGE_KEY = "ony:anamnese:draft"
const STEP_KEY = "ony:anamnese:step"

// ─── Salvar / Carregar ────────────────────────────────────────────────────────

export function salvarRascunho(values: AnamneseFormValues): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values))
  } catch {
    // localStorage indisponível (ex: modo privado com storage bloqueado)
  }
}

export function carregarRascunho(): AnamneseFormValues | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AnamneseFormValues
  } catch {
    return null
  }
}

export function salvarEtapa(index: number): void {
  try {
    localStorage.setItem(STEP_KEY, String(index))
  } catch {
    //
  }
}

export function carregarEtapa(): number {
  try {
    const raw = localStorage.getItem(STEP_KEY)
    if (raw === null) return 0
    const n = parseInt(raw, 10)
    return isNaN(n) ? 0 : n
  } catch {
    return 0
  }
}

export function limparRascunho(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(STEP_KEY)
  } catch {
    //
  }
}

// ─── Hook de auto-save ────────────────────────────────────────────────────────

/**
 * Persiste os valores do formulário no localStorage toda vez que eles mudam,
 * com um debounce de 500 ms para não degradar a performance de digitação.
 */
export function useFormPersistence(
  methods: UseFormReturn<AnamneseFormValues>,
  stepIndex: number,
): void {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Persist step index imediatamente
  useEffect(() => {
    salvarEtapa(stepIndex)
  }, [stepIndex])

  // Persist form values com debounce
  useEffect(() => {
    const subscription = methods.watch((values) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        salvarRascunho(values as AnamneseFormValues)
      }, 500)
    })

    return () => {
      subscription.unsubscribe()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [methods])
}

// ─── Hook para limpar rascunho ao finalizar ───────────────────────────────────

export function useLimparRascunho() {
  return useCallback(() => {
    limparRascunho()
  }, [])
}
