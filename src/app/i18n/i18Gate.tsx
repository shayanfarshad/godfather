// src/app/i18n/I18nGate.tsx
import React, { useEffect, useState } from 'react'
import i18n from './i18n'
import { useAppSelector } from 'src/app/store'

export function I18nGate({ children }: { children: React.ReactNode }) {
  // اگر زبان را در Settings نگه می‌داری، اینجا می‌گیریمش
  const lang = useAppSelector(s => s.Settings.lang) // 'fa' | 'en'
  const [ready, setReady] = useState(i18n.isInitialized)

  // صبر تا init شدن i18n
  useEffect(() => {
    if (i18n.isInitialized) return
    const onInit = () => setReady(true)
    i18n.on('initialized', onInit)
    return () => { i18n.off('initialized', onInit) }
  }, [])

  // هر وقت lang از persist اومد، با i18n همگام کن
  useEffect(() => {
    if (!lang) return
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang).finally(() => setReady(true))
    } else {
      setReady(true)
    }
  }, [lang])

  if (!ready) return null // یا یک Splash کوچک

  return <>{children}</>
}
