import React from 'react'
import { Clock, ExternalLink, Edit, Trash2, Move, Copy, Star } from 'lucide-react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'

export function RightPanel() {
  const recentBookmarks = [
    {
      id: '1',
      title: 'React Documentation',
      url: 'https://react.dev',
      favicon: '📚',
      visitedAt: '2小时前'
    },
    {
      id: '2', 
      title: 'Tailwind CSS',
      url: 'https://tailwindcss.com',
      favicon: '🎨',
      visitedAt: '5小时前'
    },
    {
      id: '3',
      title: 'shadcn/ui Components',
      url: 'https://ui.shadcn.com',
      favicon: '🔧',
      visitedAt: '1天前'
    }
  ]

  const selectedBookmark = {
    id: '1',
    title: 'React Documentation - The library for web and native user interfaces',
    url: 'https://react.dev',
    description: 'React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.',
    favicon: '📚',
    tags: ['React', 'JavaScript', 'Frontend'],
    createdAt: '2024-01-15',
    lastVisited: '2小时前',
    visits: 25,
    starred: true
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        {/* Selected Bookmark Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">书签详情</h3>
          
          {selectedBookmark ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{selectedBookmark.favicon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm leading-5 line-clamp-2">
                      {selectedBookmark.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {selectedBookmark.url}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Star className={`h-4 w-4 ${selectedBookmark.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </Button>
                </div>
                
                {selectedBookmark.description && (
                  <p className="text-sm text-muted-foreground leading-5">
                    {selectedBookmark.description}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-1">
                {selectedBookmark.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <div>创建：{selectedBookmark.createdAt}</div>
                <div>最后访问：{selectedBookmark.lastVisited}</div>
                <div>访问次数：{selectedBookmark.visits}</div>
              </div>

              <div className="flex gap-1">
                <Button variant="outline" size="sm" className="flex-1">
                  <ExternalLink className="mr-2 h-3 w-3" />
                  打开
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm">
                  <Move className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground text-sm">
              选择一个书签查看详情
            </div>
          )}
        </div>

        <Separator />

        {/* Recent Bookmarks */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">最近访问</h3>
          <div className="space-y-2">
            {recentBookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer"
              >
                <span className="text-lg">{bookmark.favicon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{bookmark.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{bookmark.url}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {bookmark.visitedAt}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Similar Bookmarks */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">相似书签</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer">
              <span className="text-lg">⚛️</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Next.js Documentation</p>
                <p className="text-xs text-muted-foreground truncate">https://nextjs.org</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer">
              <span className="text-lg">📦</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Vite Documentation</p>
                <p className="text-xs text-muted-foreground truncate">https://vitejs.dev</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
