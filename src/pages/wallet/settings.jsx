import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainSidebar from '@/components/main-sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  ArrowLeft,
  Shield,
  Eye,
  Bell,
  User
} from 'lucide-react'
import { useWallet } from '@/contexts/wallet-context'
import { toast } from 'sonner'

const DEFAULT_SETTINGS = {
  // Security
  autoLockMinutes: 15,
  privacyMode: false,
  requireConfirmation: true,
  confirmationThreshold: 1000,

  // Display
  currency: 'USD',
  language: 'en',
  hideSmallBalances: false,
  smallBalanceThreshold: 1,
  assetSorting: 'value',

  // Notifications
  transactionAlerts: true,
  priceAlerts: false,
  governanceAlerts: true,
  stakingAlerts: true
}

export default function WalletSettings() {
  const navigate = useNavigate()
  const { walletAddress, formatAddress, currentUser } = useWallet()
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [hasChanges, setHasChanges] = useState(false)

  // Get email from currentUser or localStorage
  const userEmail = currentUser?.email || localStorage.getItem('userEmail') || ''

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('walletSettings')
    if (saved) {
      setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) })
    }
  }, [])

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const saveSettings = () => {
    localStorage.setItem('walletSettings', JSON.stringify(settings))
    setHasChanges(false)
    toast.success('Settings saved successfully')
  }

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS)
    localStorage.removeItem('walletSettings')
    setHasChanges(false)
    toast.success('Settings reset to defaults')
  }

  return (
    <div className="flex min-h-screen bg-background">
      <MainSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate('/wallet')}
              className="mb-4 ml-[-14px]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Wallet
            </Button>
            <h1 className="text-3xl font-bold">Wallet Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your wallet preferences and security
            </p>
          </div>

          {/* Security & Privacy */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle>Security & Privacy</CardTitle>
              </div>
              <CardDescription>
                Configure security settings and privacy options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Auto-Lock Timer</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically lock wallet after inactivity
                  </p>
                </div>
                <Select
                  value={settings.autoLockMinutes.toString()}
                  onValueChange={(value) => updateSetting('autoLockMinutes', parseInt(value))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 min</SelectItem>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Privacy Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Hide balances and sensitive information
                  </p>
                </div>
                <Switch
                  checked={settings.privacyMode}
                  onCheckedChange={(checked) => updateSetting('privacyMode', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Transaction Confirmation</Label>
                  <p className="text-sm text-muted-foreground">
                    Require confirmation for large transactions
                  </p>
                </div>
                <Switch
                  checked={settings.requireConfirmation}
                  onCheckedChange={(checked) => updateSetting('requireConfirmation', checked)}
                />
              </div>

              {settings.requireConfirmation && (
                <div className="space-y-2 pl-4 border-l-2">
                  <Label htmlFor="threshold">Confirmation Threshold (USD)</Label>
                  <Input
                    id="threshold"
                    type="number"
                    value={settings.confirmationThreshold}
                    onChange={(e) => updateSetting('confirmationThreshold', parseInt(e.target.value) || 0)}
                    placeholder="1000"
                  />
                  <p className="text-xs text-muted-foreground">
                    Confirm transactions above this amount
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Display Preferences */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                <CardTitle>Display Preferences</CardTitle>
              </div>
              <CardDescription>
                Customize how information is displayed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Display Currency</Label>
                <Select
                  value={settings.currency}
                  onValueChange={(value) => updateSetting('currency', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="JPY">JPY (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => updateSetting('language', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Hide Small Balances</Label>
                  <p className="text-sm text-muted-foreground">
                    Don't show assets below ${settings.smallBalanceThreshold}
                  </p>
                </div>
                <Switch
                  checked={settings.hideSmallBalances}
                  onCheckedChange={(checked) => updateSetting('hideSmallBalances', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label>Asset Sorting</Label>
                <Select
                  value={settings.assetSorting}
                  onValueChange={(value) => updateSetting('assetSorting', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="value">By Value (High to Low)</SelectItem>
                    <SelectItem value="name">By Name (A-Z)</SelectItem>
                    <SelectItem value="custom">Custom Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>
                Configure alert preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Transaction Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when transactions are confirmed
                  </p>
                </div>
                <Switch
                  checked={settings.transactionAlerts}
                  onCheckedChange={(checked) => updateSetting('transactionAlerts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Price Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify on significant price movements
                  </p>
                </div>
                <Switch
                  checked={settings.priceAlerts}
                  onCheckedChange={(checked) => updateSetting('priceAlerts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Governance Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify about new proposals and voting deadlines
                  </p>
                </div>
                <Switch
                  checked={settings.governanceAlerts}
                  onCheckedChange={(checked) => updateSetting('governanceAlerts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Staking Rewards</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify when staking rewards are earned
                  </p>
                </div>
                <Switch
                  checked={settings.stakingAlerts}
                  onCheckedChange={(checked) => updateSetting('stakingAlerts', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <CardTitle>Account Information</CardTitle>
              </div>
              <CardDescription>
                View your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  value={userEmail}
                  readOnly
                  placeholder="user@example.com"
                  className="bg-muted cursor-default"
                />
                <p className="text-xs text-muted-foreground">
                  Changing your email address is not allowed at the moment.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Wallet Address</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={formatAddress(walletAddress)}
                    readOnly
                    className="font-mono bg-muted cursor-default"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(walletAddress)
                      toast.success('Address copied')
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          {hasChanges && (
            <div className="sticky bottom-6 flex justify-end">
              <Button
                onClick={saveSettings}
                size="lg"
                className="shadow-lg"
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
