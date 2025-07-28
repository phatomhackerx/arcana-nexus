import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MainSidebar } from './MainSidebar';
import { AIAssistant } from '../ai/AIAssistant';
import { FloatingTerminal } from '../terminal/FloatingTerminal';

export function MainLayout() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background font-inter">
        <div className="flex w-full min-h-screen">
          <MainSidebar />
          
          <main className="flex-1 relative overflow-hidden">
            <Outlet />
          </main>
          
          {/* AI Assistant - Fixed Right Panel */}
          <AIAssistant 
            isOpen={isAIOpen} 
            onToggle={() => setIsAIOpen(!isAIOpen)} 
          />
          
          {/* Floating Terminal */}
          {isTerminalOpen && (
            <FloatingTerminal 
              onClose={() => setIsTerminalOpen(false)} 
            />
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}