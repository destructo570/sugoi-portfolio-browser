'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Minus, RotateCcw, Square, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './theme-toggle';
import { Sidebar } from './sidebar';
import { toast } from 'sonner';
import Loader from './loader/loader';

interface Portfolio {
  id: number;
  name: string;
  description: string;
  url: string;
  github?: string;
  profile?: string;
}

interface BrowserMockProps {
  portfolio: Portfolio | null;
  onSelectPortfolio: (portfolio: Portfolio) => void;
  selectedPortfolio: Portfolio | null;
  collapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}


export function BrowserMock() {
  const [iframeKey, setIframeKey] = useState(0);
  const [loading, setLoading] = useState(false);

  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [collapsed, setSidebarCollapsed] = useState(false);

  const handleSelectPortfolio = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
    handleReload()
  };

  useEffect(() => {
    setLoading(true);
  }, [selectedPortfolio?.url]);

  const handleReload = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="h-full w-full flex flex-col bevel-3d bg-indigo-500">
      <Card className="h-full bg-opacity-30 bg-zinc-300 dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-row h-full">

        <div className={`${collapsed ? 'w-16' : 'w-80'} h-full transition-all duration-300`}>
          <Sidebar
            onSelectPortfolio={handleSelectPortfolio}
            selectedPortfolio={selectedPortfolio}
            collapsed={collapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        </div>
        <div className="w-full">
          {/* Browser Toolbar */}
          <div className="bg-opacity-60 bg-zinc-100 dark:bg-opacity-100 dark:bg-zinc-800 px-3 pt-3 border-zinc-200 dark:border-zinc-700 flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="text-sm text-zinc-600 dark:text-zinc-300 font-mono flex items-center gap-2 mb-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => { }}
                  className="w-6 h-6 transition-all duration-200 hover:bg-zinc-400/20 dark:hover:bg-zinc-700"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => { }}
                  className="w-6 h-6 transition-all duration-200 hover:bg-zinc-400/20 dark:hover:bg-zinc-700"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <div className="">
                  <ThemeToggle />
                </div>
              </div>
              {/* Traffic Light Buttons */}
              <div className="flex items-center space-x-2 mb-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => { }}
                  className="w-6 h-6 transition-all duration-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-700"
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => { }}
                  className="w-6 h-6 transition-all duration-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-700"
                >
                  <Square className="w-3 h-3" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => { }}
                  className="w-6 h-6 transition-all duration-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-700"
                >
                  <X className="w-4 h-4" />
                </Button>

              </div>
            </div>

            {/* URL Bar */}
            <div className="bg-white dark:bg-zinc-700 rounded-lg px-2 py-2 border border-zinc-300 dark:border-zinc-600 flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReload}
                className="w-6 h-6 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-600"
              >
                <RotateCcw className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
              </Button>
              <span className="text-sm text-zinc-600 dark:text-zinc-300 font-mono flex-1" onClick={() => {
                navigator.clipboard.writeText(selectedPortfolio?.url || '');
                toast.success('Copied to clipboard', {
                  position: 'top-right',
                });
              }}>
                {selectedPortfolio?.url}
              </span>
            </div>
          </div>

          {/* Viewport */}
          <div className="flex-1 bg-opacity-60 bg-zinc-100 dark:bg-zinc-800 overflow-hidden p-3 pb-[100px] h-full">
            <div className="h-full overflow-auto rounded-lg  shadow-md">
              <div className="h-full flex items-center justify-center">
                {loading ? <Loader /> : null}
                <iframe
                  key={iframeKey}
                  src={selectedPortfolio?.url}
                  className={`h-full border-0 ${loading ? 'opacity-0 w-0' : 'opacity-100 w-full'}`}
                  onLoad={() => setLoading(false)}
                  title={selectedPortfolio?.name}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
                />              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}