import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AppShell } from '../../components/layout/app-shell'
import { BookmarkList } from '../../components/bookmark/bookmark-list'
import { Bookmark, ViewMode, SortBy } from '../../types/bookmark'

// Mock data for development
const mockBookmarks: Bookmark[] = [
  {
    id: '1',
    title: 'React Documentation - The library for web and native user interfaces',
    url: 'https://react.dev',
    description: 'React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.',
    favicon: '⚛️',
    folderId: '2',
    tags: ['React', 'JavaScript', 'Frontend', 'Documentation'],
    createdAt: new Date('2024-01-15'),
    lastVisited: new Date('2024-08-30T14:00:00'),
    visits: 25,
    starred: true
  },
  {
    id: '2',
    title: 'Tailwind CSS - A utility-first CSS framework',
    url: 'https://tailwindcss.com',
    description: 'Rapidly build modern websites without ever leaving your HTML.',
    favicon: '🎨',
    folderId: '2',
    tags: ['CSS', 'Tailwind', 'Design', 'Frontend'],
    createdAt: new Date('2024-01-20'),
    lastVisited: new Date('2024-08-30T09:00:00'),
    visits: 18,
    starred: false
  },
  {
    id: '3',
    title: 'shadcn/ui Components',
    url: 'https://ui.shadcn.com',
    description: 'Beautifully designed components built with Radix UI and Tailwind CSS.',
    favicon: '🔧',
    folderId: '2',
    tags: ['UI', 'Components', 'React', 'Design System'],
    createdAt: new Date('2024-02-01'),
    lastVisited: new Date('2024-08-29T16:30:00'),
    visits: 12,
    starred: true
  },
  {
    id: '4',
    title: 'Vite - Next Generation Frontend Tooling',
    url: 'https://vitejs.dev',
    description: 'Get ready for a development environment that can finally catch up with you.',
    favicon: '⚡',
    folderId: '2',
    tags: ['Vite', 'Build Tool', 'Frontend', 'Development'],
    createdAt: new Date('2024-02-10'),
    lastVisited: new Date('2024-08-28T11:15:00'),
    visits: 8,
    starred: false
  },
  {
    id: '5',
    title: 'GitHub - Build and ship software on a single, collaborative platform',
    url: 'https://github.com',
    description: 'GitHub is where over 100 million developers shape the future of software, together.',
    favicon: '🐙',
    folderId: '1',
    tags: ['Git', 'Development', 'Collaboration', 'Open Source'],
    createdAt: new Date('2024-01-10'),
    lastVisited: new Date('2024-08-30T12:45:00'),
    visits: 45,
    starred: true
  },
  {
    id: '6',
    title: 'ChatGPT by OpenAI',
    url: 'https://chat.openai.com',
    description: 'A conversational AI system that listens, learns, and challenges',
    favicon: '🤖',
    folderId: '1',
    tags: ['AI', 'ChatGPT', 'OpenAI', 'Assistant'],
    createdAt: new Date('2024-01-25'),
    lastVisited: new Date('2024-08-30T08:20:00'),
    visits: 67,
    starred: true
  }
]

export default function BookmarkPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedBookmarkId, setSelectedBookmarkId] = useState<string>()

  // Extract query parameters
  const viewMode = (searchParams.get('view') as ViewMode) || 'list'
  const sortBy = (searchParams.get('sort') as SortBy) || 'lastVisited'
  const query = searchParams.get('q') || ''
  const folderId = searchParams.get('folder')
  const tagIds = searchParams.get('tags')?.split(',').filter(Boolean) || []

  // Filter and sort bookmarks based on query parameters
  let filteredBookmarks = [...mockBookmarks]

  // Apply folder filter
  if (folderId) {
    filteredBookmarks = filteredBookmarks.filter(b => b.folderId === folderId)
  }

  // Apply tag filter
  if (tagIds.length > 0) {
    filteredBookmarks = filteredBookmarks.filter(b => 
      tagIds.some(tagId => b.tags.includes(tagId))
    )
  }

  // Apply text search
  if (query) {
    const lowercaseQuery = query.toLowerCase()
    filteredBookmarks = filteredBookmarks.filter(b => 
      b.title.toLowerCase().includes(lowercaseQuery) ||
      b.description?.toLowerCase().includes(lowercaseQuery) ||
      b.url.toLowerCase().includes(lowercaseQuery) ||
      b.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  // Apply sorting
  filteredBookmarks.sort((a, b) => {
    switch (sortBy) {
      case 'lastVisited':
        const aVisited = a.lastVisited || new Date(0)
        const bVisited = b.lastVisited || new Date(0)
        return bVisited.getTime() - aVisited.getTime()
      case 'createdAt':
        return b.createdAt.getTime() - a.createdAt.getTime()
      case 'title':
        return a.title.localeCompare(b.title)
      case 'visits':
        return b.visits - a.visits
      default:
        return 0
    }
  })

  const handleViewModeChange = (mode: ViewMode) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('view', mode)
    setSearchParams(newParams)
  }

  const handleSortChange = (sort: SortBy) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('sort', sort)
    setSearchParams(newParams)
  }

  const handleBookmarkSelect = (bookmarkId: string) => {
    setSelectedBookmarkId(bookmarkId)
  }

  const handleBookmarkToggleStar = (bookmarkId: string) => {
    // TODO: Implement star toggle logic
    console.log('Toggle star for bookmark:', bookmarkId)
  }

  return (
    <AppShell>
      <BookmarkList
        bookmarks={filteredBookmarks}
        viewMode={viewMode}
        sortBy={sortBy}
        selectedBookmarkId={selectedBookmarkId}
        onBookmarkSelect={handleBookmarkSelect}
        onBookmarkToggleStar={handleBookmarkToggleStar}
        onViewModeChange={handleViewModeChange}
        onSortChange={handleSortChange}
      />
    </AppShell>
  )
}

BookmarkPage.getLayout = (page: React.ReactElement) => page
