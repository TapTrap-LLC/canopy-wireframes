import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import LanguageSelection from '@/pages/launch-chain/language-selection'
import ConnectRepo from '@/pages/launch-chain/connect-repo'
import ConfigureChain from '@/pages/launch-chain/configure-chain'
import Branding from '@/pages/launch-chain/branding'
import Links from '@/pages/launch-chain/links'
import LaunchSettings from '@/pages/launch-chain/launch-settings'
import Review from '@/pages/launch-chain/review'
import LaunchPage from '@/pages/launch-page'
import LaunchPageOwner from '@/pages/launch-page-owner'
import LaunchPageDraft from '@/pages/launch-page-draft'
import LaunchPageGraduated from '@/pages/launch-page-graduated'
import LaunchOverviewDialog from '@/components/launch-overview-dialog'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'

function HomePage() {
  const navigate = useNavigate()
  const [showDialog, setShowDialog] = useState(false)

  const handleStartLaunch = () => {
    setShowDialog(false)
    navigate('/launchpad/language')
  }

  return (
    <>
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Canopy Launcher</h1>
            <p className="text-lg text-muted-foreground">
              Launch your blockchain network in minutes
            </p>
          </div>
          <Button onClick={() => setShowDialog(true)} size="lg">
            Start Launching
          </Button>
        </div>
      </div>

      <LaunchOverviewDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onStart={handleStartLaunch}
      />
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chain/someone-else-chain" element={<LaunchPage />} />
        <Route path="/chain/my-chain" element={<LaunchPageOwner />} />
        <Route path="/chain/draft-chain" element={<LaunchPageDraft />} />
        <Route path="/chain/graduated-chain" element={<LaunchPageGraduated />} />
        <Route path="/launchpad/language" element={<LanguageSelection />} />
        <Route path="/launchpad/repository" element={<ConnectRepo />} />
        <Route path="/launchpad/configure" element={<ConfigureChain />} />
        <Route path="/launchpad/branding" element={<Branding />} />
        <Route path="/launchpad/links" element={<Links />} />
        <Route path="/launchpad/settings" element={<LaunchSettings />} />
        <Route path="/launchpad/review" element={<Review />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
