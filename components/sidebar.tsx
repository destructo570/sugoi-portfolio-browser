'use client';

import { Button } from '@/components/ui/button';
import { PanelLeft, PanelLeftClose, Github, Coffee } from 'lucide-react';
import { useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import portfoliosData from '@/data/portfolios.json';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Star } from "coolshapes-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
    <div className={`${collapsed ? 'w-16' : 'w-80'} bg-opacity-60 bg-zinc-100 dark:bg-zinc-800 h-full bg-white dark:bg-zinc-900 flex flex-col relative overflow-hidden transition-all duration-300`}>
      <div className="p-3 pb-0 flex-shrink-0 align-self-start">
        {collapsed ? (
          <div className="flex justify-center">
            <div className="text-sm text-zinc-600 dark:text-zinc-300 font-mono flex items-center gap-2 mb-1">

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!collapsed)}
                className="w-6 h-6 transition-all duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                <PanelLeft className="h-4 w-4" />
              </Button>
            </div>

          </div>
        ) : (
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Star noise={true} className="w-4 h-4" />
              <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Sugoi
              </h1>

            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-300 font-mono flex items-center gap-2 mb-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!collapsed)}
                className="w-6 h-6 transition-all duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                <PanelLeftClose className="h-4 w-4" />
              </Button>
            </div>

          </div>
        )}
      </div>
      {!collapsed ? <div className="min-h-[42px] flex items-center px-3 gap-3">
        <Tooltip>
          <TooltipTrigger asChild>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!collapsed)}
              className="w-10 h-10 transition-all duration-200 bg-zinc-400/20 hover:bg-zinc-400/40 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              <Github className="h-4 w-4" />
            </Button>

          </TooltipTrigger>
          <TooltipContent>
            <p>Fork on Github</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!collapsed)}
              className="w-10 h-10 transition-all duration-200 bg-zinc-400/20 hover:bg-zinc-400/40 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              <Coffee className="h-4 w-4" />
            </Button>

          </TooltipTrigger>
          <TooltipContent>
            <p>Buy me a coffee</p>
          </TooltipContent>
        </Tooltip>

      </div> : null}
      <div className="flex-1 overflow-hidden relative">
        {/* Top blur bezel */}
        {/* <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-zinc-100 to-transparent dark:from-zinc-900 dark:to-transparent z-10 pointer-events-none"></div> */}

        <ScrollArea className={`h-full ${collapsed ? 'p-2' : 'p-3'} [&>div>div]:!scrollbar-none [&>div>div]:!overflow-y-scroll`}>
          <div className={`${collapsed ? 'space-y-3' : 'space-y-2'}`}>
            {portfoliosData.map((portfolio) => (
              <div
                key={portfolio.id}
                className={`cursor-pointer bg-transparent transition-all duration-200  ${selectedPortfolio?.id === portfolio.id
                  ? 'bg-zinc-50/50 dark:bg-zinc-700 shadow-sm'
                  : 'bg-transparent hover:bg-zinc-400/20 dark:hover:bg-zinc-800'
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
                      <Avatar>
                        <AvatarImage src={portfolio?.profile} />
                        <AvatarFallback>{portfolio.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
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
          {/* <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-zinc-900 dark:to-transparent h-8 pointer-events-none"></div> */}
          <div className="relative p-2 pt-0 flex justify-center">
            <a
              href="https://www.destructo.dev"
              target="_blank"
              className="text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              Made by Vishal Kashi
            </a>
          </div>
        </div>
      )}
    </div>
  );
}