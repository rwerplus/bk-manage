import React, { useState } from 'react'
import { Grid, List, ArrowUpDown, Filter, MoreHorizontal } from 'lucide-react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Badge } from '../ui/badge'
import { BookmarkItem } from './bookmark-item'
import { BookmarkCard } from './bookmark-card'
import { Bookmark, ViewMode, SortBy } from '../../types/bookmark'
import { cn } from '../../lib/utils'

interface BookmarkListProps {
  bookmarks: Bookmark[]
  viewMode?: ViewMode
  sortBy?: SortBy
  selectedBookmarkId?: string
  onBookmarkSelect?: (bookmarkId: string) => void
  onBookmarkToggleStar?: (bookmarkId: string) => void
  onViewModeChange?: (mode: ViewMode) => void
  onSortChange?: (sort: SortBy) => void
  className?: string
}

export function BookmarkList({
  bookmarks,
  viewMode = 'list',
  sortBy = 'lastVisited',
  selectedBookmarkId,
  onBookmarkSelect,
  onBookmarkToggleStar,
  onViewModeChange,
  onSortChange,
  className
}: BookmarkListProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const isBatchMode = selectedIds.length > 0

  const sortLabels: Record<SortBy, string> = {
    lastVisited: '最后访问',
    createdAt: '创建时间', 
    title: '标题',
    visits: '访问次数'
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            共 {bookmarks.length} 个书签
          </span>
          {isBatchMode && (
            <>
              <Separator orientation="vertical" className="h-4" />
              <Badge variant="secondary">已选择 {selectedIds.length} 个</Badge>
              <Button variant="outline" size="sm">批量操作</Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                {sortLabels[sortBy]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onSortChange?.('lastVisited')}>
                最后访问
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange?.('createdAt')}>
                创建时间
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange?.('title')}>
                标题
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSortChange?.('visits')}>
                访问次数
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter */}
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>

          {/* View Mode Toggle */}
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange?.('list')}
              className="rounded-r-none"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'card' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange?.('card')}
              className="rounded-l-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>全选</DropdownMenuItem>
              <DropdownMenuItem>取消选择</DropdownMenuItem>
              <DropdownMenuItem>导出选中</DropdownMenuItem>
              <DropdownMenuItem>批量编辑</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {bookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <List className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-2">暂无书签</h3>
              <p className="text-sm text-muted-foreground mb-4">
                开始添加你的第一个书签吧
              </p>
              <Button>添加书签</Button>
            </div>
          ) : (
            <div className={cn(
              viewMode === 'card' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-2"
            )}>
              {bookmarks.map((bookmark) => (
                viewMode === 'card' ? (
                  <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    isSelected={selectedBookmarkId === bookmark.id}
                    onSelect={onBookmarkSelect}
                    onToggleStar={onBookmarkToggleStar}
                  />
                ) : (
                  <BookmarkItem
                    key={bookmark.id}
                    bookmark={bookmark}
                    isSelected={selectedBookmarkId === bookmark.id}
                    onSelect={onBookmarkSelect}
                    onToggleStar={onBookmarkToggleStar}
                  />
                )
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
