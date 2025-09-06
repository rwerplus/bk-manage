import React from 'react'
import { Folder, Tag, Hash, Clock, Star, MoreHorizontal } from 'lucide-react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

export function LeftNav() {
  const folders = [
    { id: '1', name: '工作', count: 15, children: [
      { id: '2', name: 'AI工具', count: 8 },
      { id: '3', name: '开发资源', count: 7 }
    ]},
    { id: '4', name: '学习', count: 23 },
    { id: '5', name: '娱乐', count: 12 }
  ]

  const tags = [
    { id: '1', name: 'AI', count: 25, color: '#3b82f6' },
    { id: '2', name: 'React', count: 18, color: '#06b6d4' },
    { id: '3', name: 'Design', count: 12, color: '#8b5cf6' },
    { id: '4', name: 'Tools', count: 31, color: '#10b981' }
  ]

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        {/* Quick Access */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground px-2">快速访问</h3>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Star className="mr-3 h-4 w-4" />
              已收藏
              <Badge variant="secondary" className="ml-auto">12</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Clock className="mr-3 h-4 w-4" />
              最近访问
            </Button>
          </div>
        </div>

        <Separator />

        {/* Folders */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-medium text-muted-foreground">文件夹</h3>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {folders.map((folder) => (
              <div key={folder.id}>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Folder className="mr-3 h-4 w-4" />
                  {folder.name}
                  <Badge variant="secondary" className="ml-auto">{folder.count}</Badge>
                </Button>
                {folder.children && (
                  <div className="ml-6 space-y-1 mt-1">
                    {folder.children.map((child) => (
                      <Button key={child.id} variant="ghost" className="w-full justify-start" size="sm">
                        <Folder className="mr-3 h-4 w-4" />
                        {child.name}
                        <Badge variant="secondary" className="ml-auto">{child.count}</Badge>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Tags */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-medium text-muted-foreground">标签</h3>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {tags.map((tag) => (
              <Button key={tag.id} variant="ghost" className="w-full justify-start" size="sm">
                <Hash className="mr-3 h-4 w-4" style={{ color: tag.color }} />
                {tag.name}
                <Badge variant="secondary" className="ml-auto">{tag.count}</Badge>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Smart Groups */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground px-2">智能分组</h3>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Clock className="mr-3 h-4 w-4" />
              今日添加
              <Badge variant="secondary" className="ml-auto">3</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Hash className="mr-3 h-4 w-4" />
              无标签
              <Badge variant="secondary" className="ml-auto">5</Badge>
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
