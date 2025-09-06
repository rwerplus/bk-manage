import React from 'react'
import { Star, ExternalLink, MoreVertical, Globe } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Bookmark } from '../../types/bookmark'
import { cn } from '../../lib/utils'

interface BookmarkItemProps {
  bookmark: Bookmark
  isSelected?: boolean
  onSelect?: (bookmarkId: string) => void
  onToggleStar?: (bookmarkId: string) => void
  className?: string
}

export function BookmarkItem({
  bookmark,
  isSelected = false,
  onSelect,
  onToggleStar,
  className
}: BookmarkItemProps) {
  const handleClick = () => {
    onSelect?.(bookmark.id)
  }

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleStar?.(bookmark.id)
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-300",
        "hover:bg-muted/50 hover:border-border/60",
        isSelected && "bg-primary/5 border-primary/20",
        className
      )}
      onClick={handleClick}
    >
      {/* Favicon */}
      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-muted flex items-center justify-center">
        {bookmark.favicon ? (
          <span className="text-lg">{bookmark.favicon}</span>
        ) : (
          <Globe className="h-4 w-4 text-muted-foreground" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-sm leading-5 line-clamp-1">
            {bookmark.title}
          </h3>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleStarClick}
            >
              <Star className={cn(
                "h-4 w-4",
                bookmark.starred
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              )} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  打开链接
                </DropdownMenuItem>
                <DropdownMenuItem>编辑</DropdownMenuItem>
                <DropdownMenuItem>移动到文件夹</DropdownMenuItem>
                <DropdownMenuItem>复制链接</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Description - only show on hover */}
        {bookmark.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-4
                        max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100
                        transition-all duration-300 ease-in-out overflow-hidden">
            {bookmark.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {bookmark.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0">
                {tag}
              </Badge>
            ))}
            {bookmark.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                +{bookmark.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Last visited - only show on hover */}
          <div className="text-xs text-muted-foreground
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {bookmark.lastVisited ? new Date(bookmark.lastVisited).toLocaleDateString('zh-CN') : '未访问'}
          </div>
        </div>
      </div>
    </div>
  )
}
