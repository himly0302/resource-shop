import { useState, useEffect } from 'react'
import { loadConfigs, loadIndex, clearCache } from '@/services/data'
import type { Configs, CategoryIndex } from '@/services/data'

export function useConfigs() {
  const [configs, setConfigs] = useState<Configs>({})
  const [index, setIndex] = useState<CategoryIndex[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = async () => {
    setLoading(true)
    setError(null)
    clearCache()
    try {
      const [cfg, idx] = await Promise.all([loadConfigs(), loadIndex()])
      setConfigs(cfg)
      setIndex(idx)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return { configs, index, loading, error, refresh }
}
