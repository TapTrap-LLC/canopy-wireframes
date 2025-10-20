import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Launchpad from '@/pages/launchpad'
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
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Launchpad />} />
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
