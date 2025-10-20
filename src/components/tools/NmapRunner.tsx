import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Terminal, Play, Square, Copy, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function NmapRunner() {
  const [target, setTarget] = useState('');
  const [scanType, setScanType] = useState('quick');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const scanPresets = [
    { id: 'quick', name: 'Quick Scan', cmd: '-T4 -F' },
    { id: 'intense', name: 'Intense Scan', cmd: '-T4 -A -v' },
    { id: 'stealth', name: 'Stealth Scan', cmd: '-sS -T2 -f' },
    { id: 'os', name: 'OS Detection', cmd: '-O -v' },
  ];

  const runScan = () => {
    setIsRunning(true);
    setOutput('');
    
    const preset = scanPresets.find(p => p.id === scanType);
    const lines = [
      `Starting Nmap 7.94 ( https://nmap.org )`,
      `Nmap scan report for ${target || '192.168.1.1'}`,
      `Host is up (0.00045s latency).`,
      `Not shown: 996 closed ports`,
      `PORT     STATE SERVICE    VERSION`,
      `22/tcp   open  ssh        OpenSSH 8.9p1`,
      `80/tcp   open  http       nginx 1.18.0`,
      `443/tcp  open  ssl/http   nginx 1.18.0`,
      `3306/tcp open  mysql      MySQL 8.0.33`,
      ``,
      `Service detection performed. Please report any incorrect results.`,
      `Nmap done: 1 IP address (1 host up) scanned in 12.34 seconds`
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
    }, 400);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-foreground">Nmap Scanner</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Network exploration and security auditing</p>
          </div>
        </div>
        
        <Badge variant="secondary" className="text-xs">Reconnaissance</Badge>
      </div>

      {/* Configuration */}
      <div className="p-3 sm:p-4 border-b border-border space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium text-foreground">Target</label>
          <Input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="IP address or hostname (e.g., 192.168.1.1)"
            disabled={isRunning}
            className="h-9 sm:h-10 text-sm"
          />
        </div>

        <Tabs value={scanType} onValueChange={setScanType} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            {scanPresets.map(preset => (
              <TabsTrigger 
                key={preset.id} 
                value={preset.id}
                className="text-xs px-2 py-2"
                disabled={isRunning}
              >
                {preset.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          {!isRunning ? (
            <Button onClick={runScan} size="sm" className="flex-1 sm:flex-none">
              <Play className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Run Scan</span>
            </Button>
          ) : (
            <Button onClick={() => setIsRunning(false)} size="sm" variant="destructive" className="flex-1 sm:flex-none">
              <Square className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Stop</span>
            </Button>
          )}
          
          <Button size="sm" variant="outline" disabled={!output} className="hidden sm:flex">
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button size="sm" variant="outline" disabled={!output} className="hidden sm:flex">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Output */}
      <div className="flex-1 p-3 sm:p-4 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs sm:text-sm font-medium text-muted-foreground">Output</label>
          <div className="flex gap-1 sm:gap-2 sm:hidden">
            <Button size="sm" variant="ghost" disabled={!output} className="h-7 w-7 p-0">
              <Copy className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" disabled={!output} className="h-7 w-7 p-0">
              <Download className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="flex-1 bg-muted/20 rounded-lg p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-auto border border-border">
          <pre className="whitespace-pre-wrap text-foreground">
            {output || 'Ready to scan... Configure target and scan type above.'}
            {isRunning && <span className="animate-pulse">█</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
