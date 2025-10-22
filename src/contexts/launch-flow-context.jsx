import { createContext, useContext, useState, useEffect } from 'react'

const LaunchFlowContext = createContext(null)

const STORAGE_KEY = 'canopy_launch_flow_data'

const initialFlowData = {
  language: null,
  repository: null,
  chainConfig: null,
  branding: null,
  links: null,
  launchSettings: null
}

export function LaunchFlowProvider({ children }) {
  const [flowData, setFlowData] = useState(() => {
    // Initialize from sessionStorage if available
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : initialFlowData
    } catch (error) {
      console.error('Failed to load launch flow data from storage:', error)
      return initialFlowData
    }
  })

  // Persist to sessionStorage whenever flowData changes
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(flowData))
    } catch (error) {
      console.error('Failed to save launch flow data to storage:', error)
    }
  }, [flowData])

  const updateFlowData = (step, data) => {
    setFlowData(prev => ({
      ...prev,
      [step]: data
    }))
  }

  const clearFlowData = () => {
    setFlowData(initialFlowData)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear launch flow data from storage:', error)
    }
  }

  const getFlowData = (step) => {
    return step ? flowData[step] : flowData
  }

  const value = {
    flowData,
    updateFlowData,
    clearFlowData,
    getFlowData
  }

  return (
    <LaunchFlowContext.Provider value={value}>
      {children}
    </LaunchFlowContext.Provider>
  )
}

export function useLaunchFlow() {
  const context = useContext(LaunchFlowContext)
  if (!context) {
    throw new Error('useLaunchFlow must be used within a LaunchFlowProvider')
  }
  return context
}
