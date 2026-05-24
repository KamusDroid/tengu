'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import * as es from './content/es'
import * as en from './content/en'
import * as it from './content/it'

export type Locale = 'es' | 'en' | 'it'

const content = { es, en, it }

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'es'
  const saved = localStorage.getItem('tengu_locale') as Locale | null
  if (saved && saved in content) return saved
  const lang = navigator.language.toLowerCase()
  if (lang.startsWith('it')) return 'it'
  if (lang.startsWith('en')) return 'en'
  return 'es'
}

type Content = typeof es

type I18nCtx = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: Content
}

const I18nContext = createContext<I18nCtx>({
  locale: 'es',
  setLocale: () => {},
  t: es,
})

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es')

  useEffect(() => {
    setLocaleState(detectLocale())
  }, [])

  function setLocale(l: Locale) {
    localStorage.setItem('tengu_locale', l)
    setLocaleState(l)
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: content[locale] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
