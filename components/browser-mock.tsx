'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './theme-toggle';

interface Portfolio {
  id: number;
  name: string;
  description: string;
  url: string;
  screenshot: string;
}

interface BrowserMockProps {
  portfolio: Portfolio | null;
}

export function BrowserMock({ portfolio }: BrowserMockProps) {
  const [imageError, setImageError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    setImageError(false);
  }, [portfolio?.screenshot]);

  const handleReload = () => {
    setIframeKey(prev => prev + 1);
  };
  // Default to Perplexity if no portfolio selected
  const displayUrl = portfolio?.url || 'https://www.perplexity.ai/hub';
  const displayName = portfolio?.name || 'Perplexity Hub';
  const displayDescription = portfolio?.description || 'AI-powered search and discovery';

  return (
    <div className="h-full flex flex-col bevel-3d">
      <Card className="h-full bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col">
        {/* Browser Toolbar */}
        <div className="bg-zinc-100 dark:bg-zinc-800 px-3 pt-3 border-zinc-200 dark:border-zinc-700 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-sm text-zinc-600 dark:text-zinc-300 font-mono flex items-center gap-2 mb-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => { }}
                className="w-6 h-6 transition-all duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => { }}
                className="w-6 h-6 transition-all duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
              <div className="">
                <ThemeToggle />
              </div>
            </div>
            {/* Traffic Light Buttons */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>

          {/* URL Bar */}
          <div className="bg-white dark:bg-zinc-700 rounded-lg px-3 py-2 border border-zinc-300 dark:border-zinc-600 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReload}
              className="w-6 h-6 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-600"
            >
              <RotateCcw className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
            </Button>
            <span className="text-sm text-zinc-600 dark:text-zinc-300 font-mono flex-1">
              {displayUrl}
            </span>
          </div>
        </div>

        {/* Viewport */}
        <div className="flex-1 bg-zinc-100 dark:bg-zinc-800 overflow-hidden p-3">
          <div className="h-full overflow-auto rounded-lg">
            <div className="h-full flex items-center justify-center">
              <iframe
                key={iframeKey}
                src={displayUrl}
                className="w-full h-full border-0"
                title={displayName}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}