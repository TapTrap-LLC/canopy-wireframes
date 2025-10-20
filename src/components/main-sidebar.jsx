import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Search, Plus, Zap, BarChart3, Activity, TrendingUp, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import LaunchOverviewDialog from './launch-overview-dialog'

export default function MainSidebar() {
  const navigate = useNavigate()
  const [showDialog, setShowDialog] = useState(false)

  const handleStartLaunch = () => {
    setShowDialog(false)
    navigate('/launchpad/language')
  }

  return (
    <>
      <div className="w-60 border-r border-zinc-800 bg-card flex flex-col justify-between pb-7 h-screen sticky top-0">
        <div className="space-y-4">
          {/* Logo */}
          <div className="px-8 pt-6 pb-2">
            <img
              src="/svg/logo.svg"
              alt="Canopy"
              className="h-4 invert"
            />
          </div>

          {/* Divider */}
          <Separator className="bg-zinc-800" />

          {/* Search and Create */}
          <div className="px-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Search chains"
                className="w-full h-9 pl-10 pr-3 rounded-full bg-transparent text-sm text-white/70 placeholder:text-white/50 focus:outline-none"
              />
            </div>

            <button
              onClick={() => setShowDialog(true)}
              className="w-full h-9 flex items-center gap-3 pl-4 rounded-full bg-transparent text-sm font-medium text-white hover:bg-white/5 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create L1 chain</span>
            </button>
          </div>

        {/* Divider */}
        <Separator className="bg-zinc-800" />

        {/* Navigation */}
        <nav className="px-4 space-y-2">
          <button className="w-full h-9 flex items-center gap-3 px-4 rounded-xl bg-white/10 text-sm font-medium text-white shadow-[0px_2px_3px_0px_rgba(0,0,0,0.1)] transition-colors">
            <Zap className="w-4 h-4" />
            <span>Launchpad</span>
          </button>
          <button className="w-full h-9 flex items-center gap-3 px-4 rounded-xl text-sm font-medium text-white hover:bg-white/5 transition-colors">
            <BarChart3 className="w-4 h-4" />
            <span>Explorer</span>
          </button>
          <button className="w-full h-9 flex items-center gap-3 px-4 rounded-xl text-sm font-medium text-white hover:bg-white/5 transition-colors">
            <Activity className="w-4 h-4" />
            <span>Staking</span>
          </button>
          <button className="w-full h-9 flex items-center gap-3 px-4 rounded-xl text-sm font-medium text-white hover:bg-white/5 transition-colors">
            <TrendingUp className="w-4 h-4" />
            <span>Trade</span>
          </button>
          <button className="w-full h-9 flex items-center gap-3 px-4 rounded-xl text-sm font-medium text-white hover:bg-white/5 transition-colors">
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="px-4 space-y-3">
        {/* Connect Wallet */}
        <button className="w-full h-11 rounded-xl bg-[#0e200e] border border-white/15 text-sm font-medium text-[#1dd13a] backdrop-blur transition-colors hover:bg-[#0e200e]/80">
          Connect wallet
        </button>
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
