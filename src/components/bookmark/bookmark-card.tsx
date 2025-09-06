import React from 'react'
import { Star, ExternalLink, MoreVertical, Globe, Clock, Eye } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Bookmark } from '../../types/bookmark'
import { cn } from '../../lib/utils'

interface BookmarkCardProps {
  bookmark: Bookmark
  isSelected?: boolean
  onSelect?: (bookmarkId: string) => void
  onToggleStar?: (bookmarkId: string) => void
  className?: string
}

export function BookmarkCard({
  bookmark,
  isSelected = false,
  onSelect,
  onToggleStar,
  className
}: BookmarkCardProps) {
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
        "group relative flex flex-col gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-300",
        "hover:bg-muted/30 hover:border-border/60 hover:shadow-sm",
        isSelected && "bg-primary/5 border-primary/20 shadow-sm",
        className
      )}
      onClick={handleClick}
    >
      {/* Header with favicon and actions */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
          {bookmark.favicon ? (
            <span className="text-xl">{bookmark.favicon}</span>
          ) : (
            <Globe className="h-5 w-5 text-muted-foreground" />
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
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
              <Button variant="ghost" size="icon" className="h-8 w-8">
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

      {/* Title - always visible */}
      <div className="space-y-2">
        <h3 className="font-medium text-sm leading-5 line-clamp-2">
          {bookmark.title}
        </h3>

        {/* URL - only show on hover */}
        <p className="text-xs text-muted-foreground truncate
                      max-h-0 opacity-0 group-hover:max-h-6 group-hover:opacity-100
                      transition-all duration-300 ease-in-out overflow-hidden">
          {bookmark.url}
        </p>
      </div>

      {/* Description - only show on hover */}
      {bookmark.description && (
        <p className="text-xs text-muted-foreground line-clamp-3 leading-4
                      max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100
                      transition-all duration-300 ease-in-out overflow-hidden">
          {bookmark.description}
        </p>
      )}

      {/* Tags - always visible */}
      {bookmark.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {bookmark.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
              {tag}
            </Badge>
          ))}
          {bookmark.tags.length > 4 && (
            <Badge variant="secondary" className="text-xs px-2 py-0.5">
              +{bookmark.tags.length - 4}
            </Badge>
          )}
        </div>
      )}

      {/* Footer with stats - only show on hover */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t
                      max-h-0 opacity-0 group-hover:max-h-8 group-hover:opacity-100
                      transition-all duration-300 ease-in-out overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{bookmark.visits}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>
              {bookmark.lastVisited
                ? new Date(bookmark.lastVisited).toLocaleDateString('zh-CN')
                : '未访问'
              }
            </span>
          </div>
        </div>
        <div>
          {new Date(bookmark.createdAt).toLocaleDateString('zh-CN')}
        </div>
      </div>
    </div>
  )
}
