import { useState, useEffect } from 'react'

/**
 * Custom hook for auto-saving form data with debouncing
 * @param {Array} dependencies - Array of values to watch for changes
 * @param {boolean} repoConnected - Whether the repo is connected (auto-save only works after repo connection)
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 1000)
 * @returns {Object} - { isSaving, lastSaved }
 */
export function useAutoSave(dependencies = [], repoConnected = false, debounceMs = 1000) {
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)

  useEffect(() => {
    if (!repoConnected) return // Don't save if repo not connected

    // Check if there's any actual data to save
    const hasData = dependencies.some(dep => {
      if (typeof dep === 'string') return dep.trim().length > 0
      if (Array.isArray(dep)) return dep.length > 0
      if (typeof dep === 'object' && dep !== null) return Object.keys(dep).length > 0
      return dep !== null && dep !== undefined
    })

    if (!hasData) return

    const timeoutId = setTimeout(() => {
      setIsSaving(true)

      // Simulate API call to save draft
      // In production, replace this with your actual API call
      setTimeout(() => {
        setIsSaving(false)
        setLastSaved('a few seconds ago')
      }, 800)
    }, debounceMs)

    return () => clearTimeout(timeoutId)
  }, [...dependencies, repoConnected])

  return { isSaving, lastSaved }
}
