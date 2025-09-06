import React, { useState } from 'react'
import { Search, Plus, Menu, MoreVertical, Bookmark } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

interface TopbarProps {
  onLeftMenuClick: () => void
  onRightMenuClick: () => void
}

export function Topbar({ onLeftMenuClick, onRightMenuClick }: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onLeftMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              <Bookmark className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">BookmarkManager</span>
            </div>
          </div>

          {/* Center Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索书签... (支持 tag:ai folder:tools 语法)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              添加书签
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden"
              onClick={onRightMenuClick}
            >
              <MoreVertical className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium">U</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>导入书签</DropdownMenuItem>
                <DropdownMenuItem>导出书签</DropdownMenuItem>
                <DropdownMenuItem>设置</DropdownMenuItem>
                <DropdownMenuItem>主题切换</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
