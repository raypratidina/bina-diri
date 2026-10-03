export type ActivityTheme = 'pink' | 'blue' | 'mint' | 'yellow' | 'purple'

export interface MaterialSummary {
  id: string
  title: string
  theme: ActivityTheme
  image: string
  imageAlt: string
}

export interface MaterialStep {
  id: string
  text: string
  image: string
  imageAlt: string
}

export interface Material extends MaterialSummary {
  intro: { text: string; image: string; imageAlt: string }
  steps: MaterialStep[]
  completion: { text: string; image: string; imageAlt: string }
}
