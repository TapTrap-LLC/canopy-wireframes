import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { ArrowRight, Rocket, Code2, Github, Settings, Palette, Link as LinkIcon } from 'lucide-react'

export default function LaunchOverviewDialog({ open, onClose, onStart }) {
  const requirements = [
    {
      icon: Code2,
      title: 'Choose your language',
      description: 'Select from Python, Go, Rust, or TypeScript blockchain templates'
    },
    {
      icon: Github,
      title: 'Connect your repository',
      description: 'Link your GitHub account and fork our starter template'
    },
    {
      icon: Settings,
      title: 'Configure your chain',
      description: 'Set up tokenomics, block time, and network parameters'
    },
    {
      icon: Palette,
      title: 'Customize your brand',
      description: 'Add logo, colors, description, social links, and documentation'
    },
    {
      icon: Rocket,
      title: 'Review and launch',
      description: 'Confirm everything looks good and deploy to Canopy'
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl">Launch Your Blockchain</DialogTitle>
          <DialogDescription className="text-base">
            Create and deploy your own Layer 1 blockchain in just a few steps. Here's what you'll need to do:
          </DialogDescription>
        </DialogHeader>

        {/* Requirements */}
        <div className="space-y-4 py-4">
          {requirements.map((req, index) => {
            const Icon = req.icon
            return (
              <div key={index} className="flex gap-4">
                {/* Icon */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  {index < requirements.length - 1 && (
                    <div className="w-px h-full bg-border mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <h3 className="font-semibold text-base mb-1">
                    {req.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {req.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Takes about 10 minutes to complete
          </p>
          <Button onClick={onStart} size="lg" className="gap-2">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
