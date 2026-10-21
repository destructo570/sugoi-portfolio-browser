'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface Portfolio {
  id: number;
  name: string;
  description: string;
  url: string;
  github?: string;
  profile?: string;
}

interface MobileNavProps {
  portfolios: Portfolio[];
  selectedPortfolio: Portfolio | null;
  onSelectPortfolio: (portfolio: Portfolio) => void;
}

export function MobileNav({ portfolios, selectedPortfolio, onSelectPortfolio }: MobileNavProps) {
  if (portfolios.length === 0) return null;

  const currentIndex = Math.max(0, portfolios.findIndex(p => p.id === selectedPortfolio?.id));

  // Wraps around at both ends so the user can cycle through every site
  const cycle = (step: number) => {
    const nextIndex = (currentIndex + step + portfolios.length) % portfolios.length;
    onSelectPortfolio(portfolios[nextIndex]);
  };

  const buttonClass = "w-12 h-12 shrink-0 rounded-full shadow-lg backdrop-blur-md bg-white/70 hover:bg-white/90 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200";

  return (
    <div className="lg:hidden fixed bottom-4 inset-x-0 z-50 px-3 pb-[env(safe-area-inset-bottom)] flex items-center gap-3">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => cycle(-1)}
        className={buttonClass}
        aria-label="Previous portfolio"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <div className="flex-1 flex items-center gap-2 min-w-0 h-12 pl-1.5 pr-4 rounded-full shadow-lg backdrop-blur-md bg-white/70 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700">
        <Avatar className="w-9 h-9">
          <AvatarImage src={selectedPortfolio?.profile} />
          <AvatarFallback className="text-xs">
            {selectedPortfolio?.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
          {selectedPortfolio?.name}
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => cycle(1)}
        className={buttonClass}
        aria-label="Next portfolio"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
