'use client';

import { Button } from '@/components/ui/button';
import { PanelLeft, PanelLeftClose } from 'lucide-react';
import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import portfoliosData from '@/data/portfolios.json';

interface Portfolio {
  id: number;
  name: string;
  description: string;
  url: string;
  screenshot: string;
}

interface SidebarProps {
  onSelectPortfolio: (portfolio: Portfolio) => void;
  selectedPortfolio: Portfolio | null;
  collapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ onSelectPortfolio, selectedPortfolio, collapsed, setSidebarCollapsed }: SidebarProps) {
  useEffect(() => {
    // Auto-select first portfolio if none selected
    if (portfoliosData.length > 0 && !selectedPortfolio) {
      onSelectPortfolio(portfoliosData[0]);
    }
  }, [onSelectPortfolio, selectedPortfolio]);

  return (
    <div className={`${collapsed ? 'w-16' : 'w-80'} h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col relative overflow-hidden transition-all duration-300`}>
      <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0">
        {collapsed ? (
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSidebarCollapsed(!collapsed)}
              className="w-8 h-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            >
              <PanelLeft className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Sugoi
              </h1>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                Portfolio creators
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSidebarCollapsed(!collapsed)}
              className="w-8 h-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
            >
              <PanelLeftClose className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden relative">
        {/* Top blur bezel */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent dark:from-zinc-900 dark:to-transparent z-10 pointer-events-none"></div>
        
        <ScrollArea className={`h-full ${collapsed ? 'p-2' : 'p-3'} [&>div>div]:!scrollbar-none [&>div>div]:!overflow-y-scroll`}>
          <div className={`${collapsed ? 'space-y-3' : 'space-y-2'}`}>
            {portfoliosData.map((portfolio) => (
              <div
                key={portfolio.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPortfolio?.id === portfolio.id
                    ? 'bg-zinc-100 dark:bg-zinc-800'
                    : 'bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                } ${collapsed ? 'rounded-lg p-2' : 'rounded-lg p-3'}`}
                onClick={() => onSelectPortfolio(portfolio)}
                title={collapsed ? `${portfolio.name} - ${portfolio.description}` : undefined}
              >
                {collapsed ? (
                  <div className="flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-zinc-400 dark:bg-zinc-600 flex items-center justify-center text-white font-semibold text-xs">
                      {portfolio.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-400 dark:bg-zinc-600 flex items-center justify-center text-white font-semibold text-xs">
                      {portfolio.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-zinc-900 dark:text-zinc-100 truncate">
                        {portfolio.name}
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
                        {portfolio.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {!collapsed && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-zinc-900 dark:to-transparent h-8 pointer-events-none"></div>
          <div className="relative p-2">
            <a 
              href="#" 
              className="text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              made by John doe
            </a>
          </div>
        </div>
      )}
    </div>
  );
}