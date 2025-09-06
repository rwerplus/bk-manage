import React, { useState } from 'react'
import { cn } from '../../lib/utils'
import { Topbar } from './topbar'
import { LeftNav } from './left-nav'
import { RightPanel } from './right-panel'
import { Sheet, SheetContent } from '../ui/sheet'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Topbar
        onLeftMenuClick={() => setLeftOpen(true)}
        onRightMenuClick={() => setRightOpen(true)}
      />

      <div className="mx-auto max-w-7xl">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Left Navigation - Desktop */}
          <aside className="hidden w-80 border-r bg-muted/10 lg:block">
            <LeftNav />
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-hidden">
            {children}
          </main>

          {/* Right Panel - Desktop */}
          <aside className="hidden w-80 border-l bg-muted/10 xl:block">
            <RightPanel />
          </aside>
        </div>
      </div>

      {/* Left Navigation - Mobile Sheet */}
      <Sheet open={leftOpen} onOpenChange={setLeftOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <LeftNav />
        </SheetContent>
      </Sheet>

      {/* Right Panel - Mobile/Tablet Sheet */}
      <Sheet open={rightOpen} onOpenChange={setRightOpen}>
        <SheetContent side="right" className="w-80 p-0">
          <RightPanel />
        </SheetContent>
      </Sheet>
    </div>
  )
}
