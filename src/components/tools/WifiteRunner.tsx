import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, Play, Square, WifiOff } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

export function WifiteRunner() {
  const [isScanning, setIsScanning] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [networks, setNetworks] = useState<Array<{
    bssid: string;
    channel: number;
    power: number;
    encryption: string;
    essid: string;
  }>>([]);

  const startScan = () => {
    setIsScanning(true);
    setNetworks([
      { bssid: 'AA:BB:CC:DD:EE:FF', channel: 6, power: -45, encryption: 'WPA2', essid: 'Home_Network' },
      { bssid: '11:22:33:44:55:66', channel: 11, power: -67, encryption: 'WPA', essid: 'Office_WiFi' },
      { bssid: 'FF:EE:DD:CC:BB:AA', channel: 1, power: -82, encryption: 'WEP', essid: 'Guest_Network' },
    ]);
    
    setTimeout(() => setIsScanning(false), 2000);
  };

  const attack = () => {
    setIsAttacking(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsAttacking(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Wifi className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Wifite</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Automated wireless attack tool</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">WiFi Auditing</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="flex gap-2">
          {!isScanning ? (
            <Button onClick={startScan} size="sm" className="flex-1">
              <Play className="h-4 w-4 mr-2" />Scan Networks
            </Button>
          ) : (
            <Button disabled size="sm" className="flex-1">
              <WifiOff className="h-4 w-4 mr-2 animate-pulse" />Scanning...
            </Button>
          )}
        </div>

        {isAttacking && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Attacking network...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      <div className="flex-1 p-3 sm:p-4 overflow-auto">
        <div className="space-y-2">
          {networks.map((network, i) => (
            <Card key={i} className="p-4 border border-primary/30 bg-card/50">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-sm">{network.essid}</span>
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {network.bssid}
                    </div>
                  </div>
                  <Badge 
                    className={
                      network.encryption === 'WEP' 
                        ? 'bg-red-500/20 text-red-500 border-red-500/50'
                        : 'bg-green-500/20 text-green-500 border-green-500/50'
                    }
                  >
                    {network.encryption}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Channel {network.channel}</span>
                  <span>Power: {network.power} dBm</span>
                </div>
                <Button 
                  size="sm" 
                  className="w-full" 
                  onClick={attack}
                  disabled={isAttacking}
                >
                  Attack Network
                </Button>
              </div>
            </Card>
          ))}
          {networks.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Start scanning to discover wireless networks
            </p>
          )}
        </div>
      </div>
    </div>
  );
}