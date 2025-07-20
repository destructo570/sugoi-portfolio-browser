'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { BrowserMock } from '@/components/browser-mock';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { PanelLeft, PanelLeftClose } from 'lucide-react';

interface Portfolio {
  id: number;
  name: string;
  description: string;
  url: string;
  screenshot: string;
}

export default function Home() {
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSelectPortfolio = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
  };

  return (
    <div className="h-screen relative overflow-hidden bg-gradient-to-r from-purple-200 via-violet-400 to-indigo-600 dark:bg-none dark:bg-zinc-950">
      {/* Header with controls */}

      {/* Main Layout */}
      <div className="h-full w-full p-3">
        {/* Floating Sidebar */}
        {/* <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} h-full transition-all duration-300`}>
          <Sidebar
            onSelectPortfolio={handleSelectPortfolio}
            selectedPortfolio={selectedPortfolio}
            collapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        </div> */}

        {/* Browser Mock */}
        {/* <div className="flex-1 h-full">
          
        </div> */}
        <BrowserMock
          portfolio={selectedPortfolio}
          onSelectPortfolio={handleSelectPortfolio}
          selectedPortfolio={selectedPortfolio}
          collapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
      </div>
    </div>
  );
}