export type ActivityTheme = 'pink' | 'blue' | 'mint' | 'yellow' | 'purple'

export interface MaterialArtwork {
  image: string
  imageAlt: string
  imageLayout?: 'portrait'
}

export interface MaterialSummary extends MaterialArtwork {
  id: string
  title: string
  theme: ActivityTheme
}

export interface MaterialStep extends MaterialArtwork {
  id: string
  text: string
}

export interface Material extends MaterialSummary {
  intro: MaterialArtwork & { text: string }
  steps: MaterialStep[]
  completion: { text: string; image: string; imageAlt: string }
}
