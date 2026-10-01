export interface LegalSection {
  id: string
  title: string
  paragraphs: string[]
}

export interface LegalDocument {
  title: string
  updated: string
  summary: string[]
  sections: LegalSection[]
  alsoSee: { label: string; to: string }
}
