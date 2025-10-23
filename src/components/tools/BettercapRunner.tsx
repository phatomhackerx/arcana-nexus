import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Network, Play, Square } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function BettercapRunner() {
  const [iface, setIface] = useState('eth0');
  const [isRunning, setIsRunning] = useState(false);
  const [hosts, setHosts] = useState<Array<{ ip: string; mac: string; vendor: string }>>([]);
  const [events, setEvents] = useState<string[]>([]);

  const startCapture = () => {
    setIsRunning(true);
    setHosts([
      { ip: '192.168.1.1', mac: '00:11:22:33:44:55', vendor: 'Router Corp' },
      { ip: '192.168.1.10', mac: 'AA:BB:CC:DD:EE:FF', vendor: 'Apple Inc.' },
      { ip: '192.168.1.15', mac: '11:22:33:44:55:66', vendor: 'Samsung' },
    ]);
    setEvents([
      '[net.probe] Starting network discovery...',
      '[net.recon] Found 3 hosts on network',
      '[arp.spoof] ARP spoofing module loaded',
      '[http.proxy] Proxy listening on port 8080',
    ]);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Network className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Bettercap</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Network attack framework</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Sniffing</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium">Network Interface</label>
          <Input 
            value={iface} 
            onChange={(e) => setIface(e.target.value)} 
            placeholder="eth0" 
            disabled={isRunning}
            className="h-9"
          />
        </div>

        {!isRunning ? (
          <Button onClick={startCapture} disabled={!iface} size="sm" className="w-full">
            <Play className="h-4 w-4 mr-2" />Start
          </Button>
        ) : (
          <Button onClick={() => setIsRunning(false)} size="sm" variant="destructive" className="w-full">
            <Square className="h-4 w-4 mr-2" />Stop
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-auto p-3 sm:p-4">
        <Tabs defaultValue="hosts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hosts">Hosts ({hosts.length})</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hosts" className="space-y-2 mt-4">
            {hosts.map((host, i) => (
              <div key={i} className="p-3 bg-muted/20 rounded border border-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-medium">{host.ip}</span>
                  <Badge variant="secondary" className="text-xs">Active</Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  <div>MAC: {host.mac}</div>
                  <div>Vendor: {host.vendor}</div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="events" className="mt-4">
            <div className="space-y-1 font-mono text-xs">
              {events.map((event, i) => (
                <div key={i} className="p-2 bg-muted/20 rounded">{event}</div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="modules" className="mt-4">
            <div className="space-y-2">
              {['net.probe', 'net.recon', 'arp.spoof', 'http.proxy', 'dns.spoof'].map(mod => (
                <div key={mod} className="flex items-center justify-between p-3 bg-muted/20 rounded border border-border">
                  <span className="font-mono text-sm">{mod}</span>
                  <Badge variant="outline" className="text-xs">Ready</Badge>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}