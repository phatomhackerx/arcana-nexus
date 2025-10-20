import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Wifi, Play, Square, Upload } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function AircrackRunner() {
  const [interface_, setInterface] = useState('wlan0');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [networks, setNetworks] = useState<any[]>([]);

  const startMonitor = () => {
    setIsRunning(true);
    setOutput('');
    setProgress(0);
    
    const mockNetworks = [
      { bssid: '00:11:22:33:44:55', channel: 6, power: -45, beacons: 234, data: 1024, essid: 'HomeNetwork' },
      { bssid: 'AA:BB:CC:DD:EE:FF', channel: 11, power: -62, beacons: 156, data: 512, essid: 'OfficeWiFi' },
      { bssid: 'FF:EE:DD:CC:BB:AA', channel: 1, power: -78, beacons: 89, data: 128, essid: 'Guest-Network' },
    ];

    const lines = [
      `Aircrack-ng 1.7`,
      ``,
      `[*] Enabling monitor mode on ${interface_}...`,
      `[*] Monitor mode enabled on ${interface_}mon`,
      `[*] Starting channel hopping...`,
      ``,
      `CH  6 ][ Elapsed: 12 s ][ 2024-01-15 14:32 ]`,
      ``,
      `BSSID              PWR  Beacons    #Data, #/s  CH   MB   ENC CIPHER  AUTH ESSID`,
      ``
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setOutput(prev => prev + lines[currentLine] + '\n');
        currentLine++;
      } else {
        setNetworks(mockNetworks);
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 400);

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Wifi className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-foreground">Aircrack-ng</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">WiFi network security assessment</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Wireless</Badge>
      </div>

      {/* Configuration */}
      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground">Interface</label>
            <Input
              value={interface_}
              onChange={(e) => setInterface(e.target.value)}
              disabled={isRunning}
              className="h-9 sm:h-10 text-sm"
            />
          </div>

          <div className="flex items-end">
            {!isRunning ? (
              <Button onClick={startMonitor} size="sm" className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Start Monitor
              </Button>
            ) : (
              <Button onClick={() => setIsRunning(false)} size="sm" variant="destructive" className="w-full">
                <Square className="h-4 w-4 mr-2" />
                Stop
              </Button>
            )}
          </div>

          <div className="flex items-end">
            <Button size="sm" variant="outline" className="w-full" disabled={isRunning}>
              <Upload className="h-4 w-4 mr-2" />
              Load Capture
            </Button>
          </div>
        </div>

        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Scanning networks...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      {/* Networks */}
      {networks.length > 0 && (
        <div className="flex-1 p-3 sm:p-4 overflow-auto">
          <h4 className="text-sm font-medium text-foreground mb-3">Detected Networks</h4>
          <div className="space-y-2">
            {networks.map((net, idx) => (
              <div
                key={idx}
                className="p-3 border border-border rounded-lg hover:border-primary/50 transition-all cursor-pointer bg-card/30"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-sm text-foreground truncate">{net.essid}</h5>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{net.bssid}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs ml-2">CH {net.channel}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Power: </span>
                    <span className={net.power > -60 ? 'text-success' : 'text-warning'}>{net.power} dBm</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Beacons: </span>
                    <span className="text-foreground">{net.beacons}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Data: </span>
                    <span className="text-foreground">{net.data}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output */}
      <div className="flex-1 p-3 sm:p-4 overflow-hidden flex flex-col">
        <label className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Console Output</label>
        <div className="flex-1 bg-muted/20 rounded-lg p-2 sm:p-3 font-mono text-xs overflow-auto border border-border">
          <pre className="whitespace-pre-wrap text-foreground">
            {output || 'Ready to scan... Click Start Monitor to begin.'}
            {isRunning && <span className="animate-pulse">█</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
