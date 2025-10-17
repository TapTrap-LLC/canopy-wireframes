import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ChevronLeft, ChevronRight, Globe, Github } from 'lucide-react'

// Custom social icons
const TwitterIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const DiscordIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
)

export default function OverviewTab({ chainData, currentGalleryIndex, setCurrentGalleryIndex }) {
  const getSocialIcon = (platform) => {
    switch(platform) {
      case 'twitter': return <TwitterIcon />
      case 'discord': return <DiscordIcon />
      case 'website': return <Globe className="w-4 h-4" />
      case 'github': return <Github className="w-4 h-4" />
      default: return null
    }
  }

  const navigateGallery = (direction) => {
    if (direction === 'prev') {
      setCurrentGalleryIndex(prev => prev === 0 ? chainData.gallery.length - 1 : prev - 1)
    } else {
      setCurrentGalleryIndex(prev => prev === chainData.gallery.length - 1 ? 0 : prev + 1)
    }
  }

  return (
    <div className="space-y-6 mt-4">
      {/* About and Gallery Card */}
      <Card className="p-6">
        <div className="space-y-6">
          {/* About Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {chainData.socialLinks.slice(0, 4).map((link, idx) => {
                const isGithub = link.platform === 'github'

                return (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
                  >
                    {getSocialIcon(link.platform)}
                    {isGithub && (
                      <span className="text-xs text-white">23 stars</span>
                    )}
                  </a>
                )
              })}
            </div>
            <h3 className="text-lg font-semibold">
              Token Chain Project: Revolutionizing Digital Asset Management
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {chainData.description}
            </p>
          </div>

          <Separator />

          {/* Gallery Section */}
          <div className="space-y-4">
            {/* Main Gallery Display */}
            <div className="relative aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              <span className="text-muted-foreground">Gallery Image {currentGalleryIndex + 1}</span>

              {/* Navigation Arrows */}
              {chainData.gallery.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={() => navigateGallery('prev')}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={() => navigateGallery('next')}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto">
              {chainData.gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentGalleryIndex(idx)}
                  className={`flex-shrink-0 w-24 h-16 rounded-lg bg-muted flex items-center justify-center transition-all ${
                    currentGalleryIndex === idx ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <span className="text-xs text-muted-foreground">{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Notes Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Notes</h3>
        <p className="text-sm text-muted-foreground">No notes yet...</p>
      </Card>
    </div>
  )
}
