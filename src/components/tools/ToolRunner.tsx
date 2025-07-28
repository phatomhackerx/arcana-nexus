import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Terminal, Play, Square, Copy } from 'lucide-react';

interface ToolRunnerProps {
  tool: {
    id: string;
    name: string;
    category: string;
    command: string;
    parameters?: string[];
  };
  onClose: () => void;
}

export function ToolRunner({ tool, onClose }: ToolRunnerProps) {
  const [command, setCommand] = useState(tool.command);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runTool = () => {
    setIsRunning(true);
    setOutput('');
    
    // Simular execução da ferramenta
    const lines = [
      `Starting ${tool.name}...`,
      `Command: ${command}`,
      '',
      'Scanning target...',
      'Port 22/tcp open ssh',
      'Port 80/tcp open http',
      'Port 443/tcp open https',
      '',
      `${tool.name} completed successfully.`,
      'Results saved to /tmp/scan_results.txt'
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setOutput(prev => prev + lines[currentLine] + '\n');
        currentLine++;
      } else {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 500);
  };

  const stopTool = () => {
    setIsRunning(false);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <Card className="h-full flex flex-col bg-card border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Terminal className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-medium text-foreground">{tool.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {tool.category}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {!isRunning ? (
            <Button onClick={runTool} size="sm" variant="default">
              <Play className="h-4 w-4 mr-1" />
              Run
            </Button>
          ) : (
            <Button onClick={stopTool} size="sm" variant="destructive">
              <Square className="h-4 w-4 mr-1" />
              Stop
            </Button>
          )}
          
          <Button onClick={copyOutput} size="sm" variant="outline" disabled={!output}>
            <Copy className="h-4 w-4" />
          </Button>
          
          <Button onClick={onClose} size="sm" variant="ghost">
            ×
          </Button>
        </div>
      </div>

      {/* Command Input */}
      <div className="p-4 border-b border-border">
        <label className="text-sm font-medium text-muted-foreground mb-2 block">
          Command
        </label>
        <Textarea
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="font-mono text-sm"
          rows={2}
          disabled={isRunning}
        />
      </div>

      {/* Output */}
      <div className="flex-1 p-4">
        <label className="text-sm font-medium text-muted-foreground mb-2 block">
          Output
        </label>
        <div className="bg-muted/30 rounded-md p-3 font-mono text-sm h-full overflow-auto">
          <pre className="whitespace-pre-wrap text-foreground">
            {output || 'Ready to execute...'}
            {isRunning && <span className="animate-pulse">█</span>}
          </pre>
        </div>
      </div>
    </Card>
  );
}