import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Upload, Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

export function VolatilityRunner() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [processes, setProcesses] = useState<Array<{ pid: number; name: string; ppid: number }>>([]);
  const [network, setNetwork] = useState<Array<{ protocol: string; local: string; remote: string }>>([]);

  const loadDump = () => {
    setIsLoaded(true);
    setProcesses([
      { pid: 4, name: 'System', ppid: 0 },
      { pid: 452, name: 'svchost.exe', ppid: 620 },
      { pid: 1024, name: 'explorer.exe', ppid: 980 },
      { pid: 2156, name: 'chrome.exe', ppid: 1024 },
      { pid: 3044, name: 'malware.exe', ppid: 452 },
    ]);
    setNetwork([
      { protocol: 'TCP', local: '192.168.1.100:49152', remote: '52.84.151.25:443' },
      { protocol: 'TCP', local: '192.168.1.100:49153', remote: '142.250.185.46:80' },
      { protocol: 'UDP', local: '192.168.1.100:53', remote: '8.8.8.8:53' },
    ]);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Volatility</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Memory forensics framework</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Memory Analysis</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        {!isLoaded ? (
          <>
            <Button size="sm" variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />Load Memory Dump
            </Button>
            <Button onClick={loadDump} size="sm" className="w-full">
              <Play className="h-4 w-4 mr-2" />Analyze
            </Button>
          </>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <Badge variant="outline" className="justify-center py-2">Windows 10</Badge>
            <Badge variant="outline" className="justify-center py-2">x64</Badge>
            <Badge variant="outline" className="justify-center py-2">2.4 GB</Badge>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-3 sm:p-4">
        {isLoaded ? (
          <Tabs defaultValue="processes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="processes">Processes</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
              <TabsTrigger value="registry">Registry</TabsTrigger>
            </TabsList>
            
            <TabsContent value="processes" className="space-y-2 mt-4">
              {processes.map((proc, i) => (
                <Card key={i} className={`p-3 border ${proc.name.includes('malware') ? 'border-red-500/50 bg-red-500/5' : 'border-border bg-card/50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-mono font-semibold text-sm">{proc.name}</div>
                      <div className="text-xs text-muted-foreground">
                        PID: {proc.pid} | PPID: {proc.ppid}
                      </div>
                    </div>
                    {proc.name.includes('malware') && (
                      <Badge className="bg-red-500/20 text-red-500 border-red-500/50">
                        Suspicious
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="network" className="space-y-2 mt-4">
              {network.map((conn, i) => (
                <Card key={i} className="p-3 border border-border bg-card/50">
                  <div className="space-y-1">
                    <Badge variant="secondary" className="text-xs">{conn.protocol}</Badge>
                    <div className="font-mono text-xs text-muted-foreground">
                      {conn.local} → {conn.remote}
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="registry" className="mt-4">
              <p className="text-sm text-muted-foreground text-center py-8">
                Registry analysis results
              </p>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">Load a memory dump to start analysis</p>
          </div>
        )}
      </div>
    </div>
  );
}