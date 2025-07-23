'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { BrowserMock } from '@/components/browser-mock';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { PanelLeft, PanelLeftClose } from 'lucide-react';
import { Toaster } from "@/components/ui/sonner"


interface Portfolio {
  id: number;
  name: string;
  description: string;
  url: string;
  github?: string;
  profile?: string;
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
      <Toaster />
      {/* Main Layout */}
      <div className="h-full w-full p-3">
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