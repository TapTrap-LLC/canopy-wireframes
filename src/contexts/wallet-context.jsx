import { createContext, useContext, useState, useEffect } from 'react'
import walletData from '@/data/wallet.json'

const WalletContext = createContext()

export function WalletProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState(null)

  // Check localStorage for existing connection
  useEffect(() => {
    const storedAddress = localStorage.getItem('walletAddress')
    const storedIsConnected = localStorage.getItem('isWalletConnected')

    if (storedAddress && storedIsConnected === 'true') {
      setWalletAddress(storedAddress)
      setIsConnected(true)
    }
  }, [])

  const connectWallet = () => {
    // Simulate wallet connection - in real app this would call MetaMask/WalletConnect
    const mockAddress = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
    setWalletAddress(mockAddress)
    setIsConnected(true)
    localStorage.setItem('walletAddress', mockAddress)
    localStorage.setItem('isWalletConnected', 'true')
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
    setIsConnected(false)
    localStorage.removeItem('walletAddress')
    localStorage.removeItem('isWalletConnected')
  }

  const getTotalBalance = () => {
    return walletData.totalValue
  }

  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletAddress,
        connectWallet,
        disconnectWallet,
        getTotalBalance,
        formatAddress
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider')
  }
  return context
}
