import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Wifi, Play, Square } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function ReaverRunner() {
  const [bssid, setBssid] = useState('');
  const [iface, setIface] = useState('wlan0mon');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState('');

  const startAttack = () => {
    setIsRunning(true);
    setProgress(0);
    setOutput('');

    const lines = [
      `Reaver v1.6.6 WiFi Protected Setup Attack Tool`,
      `Copyright (c) 2011, Tactical Network Solutions, Craig Heffner`,
      ``,
      `[+] Waiting for beacon from ${bssid}`,
      `[+] Received beacon from ${bssid}`,
      `[+] Trying pin "12345670"`,
      `[+] Sending authentication request`,
      `[+] Sending association request`,
      `[+] Associated with ${bssid} (ESSID: TestNetwork)`,
      `[+] Trying pin "23456781"`,
      `[+] Sending EAPOL START request`,
      `[+] Received M1 message`,
      `[+] Sending M2 message`,
      `[+] WPS PIN: '12345670'`,
      `[+] WPA PSK: 'MySecurePassword123'`,
      `[+] AP SSID: 'TestNetwork'`
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setOutput(prev => prev + lines[currentLine] + '\n');
        setProgress(((currentLine + 1) / lines.length) * 100);
        currentLine++;
      } else {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Wifi className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Reaver</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">WPS attack tool</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">WPS Attack</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">Interface</label>
            <Input 
              value={iface} 
              onChange={(e) => setIface(e.target.value)} 
              placeholder="wlan0mon" 
              disabled={isRunning}
              className="h-9 font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">BSSID</label>
            <Input 
              value={bssid} 
              onChange={(e) => setBssid(e.target.value)} 
              placeholder="AA:BB:CC:DD:EE:FF" 
              disabled={isRunning}
              className="h-9 font-mono"
            />
          </div>
        </div>

        {!isRunning ? (
          <Button onClick={startAttack} disabled={!bssid || !iface} size="sm" className="w-full">
            <Play className="h-4 w-4 mr-2" />Start WPS Attack
          </Button>
        ) : (
          <Button onClick={() => setIsRunning(false)} size="sm" variant="destructive" className="w-full">
            <Square className="h-4 w-4 mr-2" />Stop
          </Button>
        )}

        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Attacking WPS...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      <div className="flex-1 p-3 sm:p-4">
        <div className="h-full bg-muted/20 rounded-lg p-3 font-mono text-xs overflow-auto border border-border">
          <pre className="whitespace-pre-wrap text-foreground">
            {output || 'Ready to attack WPS-enabled access point...'}
            {isRunning && <span className="animate-pulse">█</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}