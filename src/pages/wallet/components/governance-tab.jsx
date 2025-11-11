import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import {
  AlertCircle,
  ChevronRight,
  Clock,
  Check,
  X,
  AlertTriangle,
  TrendingUp,
  Users,
  Shield,
  ArrowLeft
} from 'lucide-react'
import ProposalDetailSheet from './proposal-detail-sheet'

// Mock data for proposals
const mockProposals = [
  {
    id: 1,
    title: 'Lower Transaction Fees',
    network: 'Canopy Network',
    description: 'Reduce fees from 0.3% to 0.25% to increase volume',
    status: 'active',
    urgency: 'urgent',
    endsIn: '2 days',
    votesFor: 65,
    votesAgainst: 35,
    totalVotes: 2500000,
    userVote: null,
    proposedBy: '0x7a3f...9b2c',
    createdAt: '5 days ago',
    endDate: 'Dec 15, 2024',
    quorumReached: true,
    quorumNeeded: 50,
    summary: 'This proposal aims to reduce trading fees from 0.3% to 0.25% to boost trading volume.',
    impact: 'Lower revenue per trade but potentially higher volume.',
    votingPower: 2500
  },
  {
    id: 2,
    title: 'Add NFT Support',
    network: 'Chain1 Network',
    description: 'Enable NFT minting and trading on the platform',
    status: 'active',
    urgency: 'normal',
    endsIn: '5 days',
    votesFor: 78,
    votesAgainst: 22,
    totalVotes: 1800000,
    userVote: 'for',
    proposedBy: '0x9b2c...7a3f',
    createdAt: '3 days ago',
    endDate: 'Dec 18, 2024',
    quorumReached: true,
    quorumNeeded: 50,
    summary: 'Add support for NFT minting, trading, and marketplace features.',
    impact: 'Opens new revenue streams and attracts NFT creators to the platform.',
    votingPower: 2500
  },
  {
    id: 3,
    title: 'Increase Staking Rewards',
    network: 'Canopy Network',
    description: 'Boost staking APY from 12% to 15% for long-term holders',
    status: 'active',
    urgency: 'normal',
    endsIn: '7 days',
    votesFor: 45,
    votesAgainst: 55,
    totalVotes: 900000,
    userVote: 'against',
    proposedBy: '0x5d4e...8b1a',
    createdAt: '2 days ago',
    endDate: 'Dec 20, 2024',
    quorumReached: false,
    quorumNeeded: 50,
    summary: 'Increase staking rewards to incentivize long-term holding.',
    impact: 'Higher inflation but stronger holder incentives.',
    votingPower: 2500
  },
  {
    id: 4,
    title: 'Treasury Diversification',
    network: 'Chain2 Network',
    description: 'Allocate 20% of treasury to stablecoins for stability',
    status: 'passed',
    urgency: 'normal',
    endsIn: 'Passed',
    votesFor: 82,
    votesAgainst: 18,
    totalVotes: 3200000,
    userVote: 'for',
    proposedBy: '0x3c2f...6d8e',
    createdAt: '10 days ago',
    endDate: 'Dec 10, 2024',
    quorumReached: true,
    quorumNeeded: 50,
    summary: 'Diversify treasury holdings to reduce risk.',
    impact: 'More stable treasury value during market volatility.',
    votingPower: 2500
  },
  {
    id: 5,
    title: 'Launch Grants Program',
    network: 'Canopy Network',
    description: 'Create $1M developer grants program',
    status: 'failed',
    urgency: 'normal',
    endsIn: 'Failed',
    votesFor: 35,
    votesAgainst: 65,
    totalVotes: 1500000,
    userVote: null,
    proposedBy: '0x8f3a...2c5d',
    createdAt: '15 days ago',
    endDate: 'Dec 5, 2024',
    quorumReached: true,
    quorumNeeded: 50,
    summary: 'Establish a grants program to fund ecosystem development.',
    impact: 'Would have allocated significant funds to developer incentives.',
    votingPower: 2500
  }
]

export default function GovernanceTab({ userVotingPower = 2500 }) {
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [detailSheetOpen, setDetailSheetOpen] = useState(false)
  const [filter, setFilter] = useState('all') // all, active, passed, failed

  const handleProposalClick = (proposal) => {
    setSelectedProposal(proposal)
    setDetailSheetOpen(true)
  }

  const getUrgencyBadge = (urgency) => {
    if (urgency === 'urgent') {
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertCircle className="w-3 h-3" />
          URGENT
        </Badge>
      )
    }
    return null
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'passed':
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Passed
          </Badge>
        )
      case 'failed':
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  const getFilteredProposals = () => {
    if (filter === 'all') return mockProposals
    return mockProposals.filter(p => p.status === filter)
  }

  const activeProposalsCount = mockProposals.filter(p => p.status === 'active').length
  const votedProposalsCount = mockProposals.filter(p => p.userVote !== null).length

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Voting Power</p>
                <p className="text-2xl font-bold">{userVotingPower.toLocaleString()} CNPY</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Proposals</p>
                <p className="text-2xl font-bold">{activeProposalsCount}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Votes Cast</p>
                <p className="text-2xl font-bold">{votedProposalsCount}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All Proposals
        </Button>
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('active')}
        >
          Active ({activeProposalsCount})
        </Button>
        <Button
          variant={filter === 'passed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('passed')}
        >
          Passed
        </Button>
        <Button
          variant={filter === 'failed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('failed')}
        >
          Failed
        </Button>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {getFilteredProposals().map((proposal) => (
          <Card
            key={proposal.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleProposalClick(proposal)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getUrgencyBadge(proposal.urgency)}
                    {getStatusBadge(proposal.status)}
                    {proposal.status === 'active' && (
                      <Badge variant="outline" className="gap-1">
                        <Clock className="w-3 h-3" />
                        Ends in {proposal.endsIn}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{proposal.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{proposal.network}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{proposal.description}</p>

              {proposal.status === 'active' && (
                <>
                  {/* Voting Progress */}
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Check className="w-4 h-4 text-green-600" />
                          For ({proposal.votesFor}%)
                        </span>
                        <span className="text-muted-foreground">
                          {((proposal.totalVotes * proposal.votesFor) / 100).toLocaleString()} CNPY
                        </span>
                      </div>
                      <Progress value={proposal.votesFor} className="h-2 bg-muted" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <X className="w-4 h-4 text-red-600" />
                          Against ({proposal.votesAgainst}%)
                        </span>
                        <span className="text-muted-foreground">
                          {((proposal.totalVotes * proposal.votesAgainst) / 100).toLocaleString()} CNPY
                        </span>
                      </div>
                      <Progress value={proposal.votesAgainst} className="h-2 bg-muted" />
                    </div>
                  </div>

                  {/* Voting Status */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        Total: {proposal.totalVotes.toLocaleString()} CNPY
                      </span>
                      {proposal.quorumReached ? (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Check className="w-3 h-3 mr-1" />
                          Quorum Reached
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Quorum Not Met
                        </Badge>
                      )}
                    </div>
                    {proposal.userVote && (
                      <Badge variant="secondary">
                        Your Vote: {proposal.userVote === 'for' ? '✓ For' : '✗ Against'}
                      </Badge>
                    )}
                    {!proposal.userVote && proposal.status === 'active' && (
                      <Badge variant="outline">Not Voted</Badge>
                    )}
                  </div>
                </>
              )}

              {proposal.status !== 'active' && (
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    Final: {proposal.votesFor}% For, {proposal.votesAgainst}% Against
                  </div>
                  {proposal.userVote && (
                    <Badge variant="secondary">
                      You voted: {proposal.userVote === 'for' ? 'For' : 'Against'}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Proposal Detail Sheet */}
      <ProposalDetailSheet
        open={detailSheetOpen}
        onOpenChange={setDetailSheetOpen}
        proposal={selectedProposal}
        userVotingPower={userVotingPower}
      />
    </div>
  )
}