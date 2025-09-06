export interface Bookmark {
  id: string
  title: string
  url: string
  description?: string
  favicon?: string
  folderId?: string
  tags: string[]
  createdAt: Date
  lastVisited?: Date
  visits: number
  starred: boolean
}

export interface Folder {
  id: string
  name: string
  parentId?: string
  children?: Folder[]
  color?: string
}

export interface Tag {
  id: string
  name: string
  color?: string
  count: number
}

export type SortBy = 'lastVisited' | 'createdAt' | 'title' | 'visits'
export type ViewMode = 'list' | 'card'

export interface SearchFilters {
  q?: string
  folderId?: string
  tags?: string[]
  sort?: SortBy
  view?: ViewMode
}
