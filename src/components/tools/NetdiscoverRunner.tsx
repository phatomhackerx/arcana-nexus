import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Network, Play, Square, Wifi } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

export function NetdiscoverRunner() {
  const [network, setNetwork] = useState('192.168.1.0/24');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [devices, setDevices] = useState<Array<{
    ip: string;
    mac: string;
    vendor: string;
    count: number;
  }>>([]);

  const startScan = () => {
    setIsScanning(true);
    setProgress(0);
    setDevices([]);

    const mockDevices = [
      { ip: '192.168.1.1', mac: '00:11:22:33:44:55', vendor: 'TP-Link Technologies', count: 1 },
      { ip: '192.168.1.10', mac: 'AA:BB:CC:DD:EE:FF', vendor: 'Apple, Inc.', count: 3 },
      { ip: '192.168.1.15', mac: '11:22:33:44:55:66', vendor: 'Samsung Electronics', count: 2 },
      { ip: '192.168.1.20', mac: 'FF:EE:DD:CC:BB:AA', vendor: 'Amazon Technologies', count: 1 },
      { ip: '192.168.1.25', mac: '12:34:56:78:9A:BC', vendor: 'Google, Inc.', count: 1 },
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < mockDevices.length) {
        setDevices(prev => [...prev, mockDevices[current]]);
        setProgress(((current + 1) / mockDevices.length) * 100);
        current++;
      } else {
        setIsScanning(false);
        clearInterval(interval);
      }
    }, 600);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Network className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Netdiscover</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">ARP reconnaissance tool</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Network Discovery</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium">Network Range</label>
          <Input 
            value={network} 
            onChange={(e) => setNetwork(e.target.value)} 
            placeholder="192.168.1.0/24" 
            disabled={isScanning}
            className="h-9 font-mono"
          />
        </div>

        {!isScanning ? (
          <Button onClick={startScan} disabled={!network} size="sm" className="w-full">
            <Play className="h-4 w-4 mr-2" />Start Discovery
          </Button>
        ) : (
          <Button onClick={() => setIsScanning(false)} size="sm" variant="destructive" className="w-full">
            <Square className="h-4 w-4 mr-2" />Stop
          </Button>
        )}

        {isScanning && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Scanning network...</span>
              <span>{devices.length} devices found</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      <div className="flex-1 p-3 sm:p-4 overflow-auto">
        <div className="space-y-2">
          {devices.map((device, i) => (
            <Card key={i} className="p-3 border border-primary/30 bg-card/50">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-primary" />
                    <span className="font-mono font-semibold text-sm">{device.ip}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div>MAC: {device.mac}</div>
                    <div>Vendor: {device.vendor}</div>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {device.count} {device.count === 1 ? 'packet' : 'packets'}
                </Badge>
              </div>
            </Card>
          ))}
          {!isScanning && devices.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Configure network range and start discovery
            </p>
          )}
        </div>
      </div>
    </div>
  );
}