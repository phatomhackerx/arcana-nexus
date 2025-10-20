import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X } from 'lucide-react';
import { NmapRunner } from '@/components/tools/NmapRunner';
import { BurpSuiteRunner } from '@/components/tools/BurpSuiteRunner';
import { MetasploitRunner } from '@/components/tools/MetasploitRunner';
import { WiresharkRunner } from '@/components/tools/WiresharkRunner';
import { SQLMapRunner } from '@/components/tools/SQLMapRunner';
import { AircrackRunner } from '@/components/tools/AircrackRunner';
import { MaltegoBrowser } from '@/components/tools/MaltegoBrowser';
import { GhidraRunner } from '@/components/tools/GhidraRunner';
import { HashcatRunner } from '@/components/tools/HashcatRunner';
import { HydraRunner } from '@/components/tools/HydraRunner';
import { SetToolkitRunner } from '@/components/tools/SetToolkitRunner';
import { ToolRunner } from '@/components/tools/ToolRunner';
import { toolsDatabase } from '@/data/tools';

export default function ToolExecutor() {
  const { toolId } = useParams();
  const navigate = useNavigate();

  const tool = toolsDatabase.find(t => t.id === toolId);

  if (!tool) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Tool not found</h2>
          <Button onClick={() => navigate('/tools')} size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tools
          </Button>
        </div>
      </div>
    );
  }

  const renderToolComponent = () => {
    switch (toolId) {
      case 'nmap': return <NmapRunner />;
      case 'burp-suite': return <BurpSuiteRunner />;
      case 'metasploit': return <MetasploitRunner />;
      case 'wireshark': return <WiresharkRunner />;
      case 'sqlmap': return <SQLMapRunner />;
      case 'aircrack-ng': return <AircrackRunner />;
      case 'maltego': return <MaltegoBrowser />;
      case 'ghidra': return <GhidraRunner />;
      case 'hashcat': return <HashcatRunner />;
      case 'hydra': return <HydraRunner />;
      case 'set': return <SetToolkitRunner />;
      default: return <ToolRunner tool={tool} onClose={() => navigate('/tools')} />;
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-background">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-2 sm:p-3 border-b border-border bg-card/20 backdrop-blur-sm">
        <Button
          onClick={() => navigate('/tools')}
          size="sm"
          variant="ghost"
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to Tools</span>
        </Button>
        
        <Button
          onClick={() => navigate('/dashboard')}
          size="sm"
          variant="ghost"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Tool Component */}
      <div className="flex-1 overflow-hidden">
        {renderToolComponent()}
      </div>
    </div>
  );
}
