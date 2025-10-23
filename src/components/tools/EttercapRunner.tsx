import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Network, Play, Square } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

export function EttercapRunner() {
  const [iface, setIface] = useState('eth0');
  const [target1, setTarget1] = useState('');
  const [target2, setTarget2] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [captures, setCaptures] = useState<Array<{ protocol: string; data: string }>>([]);

  const startMitm = () => {
    setIsRunning(true);
    setCaptures([
      { protocol: 'HTTP', data: 'GET /login.php HTTP/1.1' },
      { protocol: 'FTP', data: 'USER admin' },
      { protocol: 'TELNET', data: 'Login: root' },
      { protocol: 'HTTP', data: 'POST /api/auth - user=admin&pass=...' },
    ]);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Network className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Ettercap</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">MITM attack suite</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">MITM</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium">Interface</label>
          <Input 
            value={iface} 
            onChange={(e) => setIface(e.target.value)} 
            placeholder="eth0" 
            disabled={isRunning}
            className="h-9"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">Target 1</label>
            <Input 
              value={target1} 
              onChange={(e) => setTarget1(e.target.value)} 
              placeholder="192.168.1.1" 
              disabled={isRunning}
              className="h-9 font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">Target 2</label>
            <Input 
              value={target2} 
              onChange={(e) => setTarget2(e.target.value)} 
              placeholder="192.168.1.100" 
              disabled={isRunning}
              className="h-9 font-mono"
            />
          </div>
        </div>

        {!isRunning ? (
          <Button onClick={startMitm} disabled={!iface} size="sm" className="w-full">
            <Play className="h-4 w-4 mr-2" />Start ARP Poisoning
          </Button>
        ) : (
          <Button onClick={() => setIsRunning(false)} size="sm" variant="destructive" className="w-full">
            <Square className="h-4 w-4 mr-2" />Stop
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-auto p-3 sm:p-4">
        <Tabs defaultValue="captures" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="captures">Captures ({captures.length})</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="captures" className="space-y-2 mt-4">
            {captures.map((capture, i) => (
              <Card key={i} className="p-3 border border-primary/30 bg-card/50">
                <div className="space-y-2">
                  <Badge variant="secondary" className="text-xs">{capture.protocol}</Badge>
                  <div className="font-mono text-xs text-muted-foreground break-all">
                    {capture.data}
                  </div>
                </div>
              </Card>
            ))}
            {captures.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No captures yet. Start MITM attack to intercept traffic.
              </p>
            )}
          </TabsContent>
          
          <TabsContent value="stats" className="mt-4 space-y-3">
            <Card className="p-4 border border-border">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Packets intercepted</span>
                  <span className="font-semibold">{captures.length * 127}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Connections</span>
                  <span className="font-semibold">4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Data transferred</span>
                  <span className="font-semibold">2.3 MB</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}