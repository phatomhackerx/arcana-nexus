import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Zap, Play, Square } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

export function MasscanRunner() {
  const [target, setTarget] = useState('');
  const [rate, setRate] = useState('1000');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ports, setPorts] = useState<Array<{ port: number; state: string; service: string }>>([]);

  const startScan = () => {
    setIsRunning(true);
    setProgress(0);
    setPorts([]);

    const commonPorts = [
      { port: 21, state: 'open', service: 'ftp' },
      { port: 22, state: 'open', service: 'ssh' },
      { port: 80, state: 'open', service: 'http' },
      { port: 443, state: 'open', service: 'https' },
      { port: 3306, state: 'open', service: 'mysql' },
      { port: 8080, state: 'open', service: 'http-proxy' },
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < commonPorts.length) {
        setPorts(prev => [...prev, commonPorts[current]]);
        setProgress(((current + 1) / commonPorts.length) * 100);
        current++;
      } else {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 400);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Masscan</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Ultra-fast port scanner</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Network Scanning</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">Target</label>
            <Input 
              value={target} 
              onChange={(e) => setTarget(e.target.value)} 
              placeholder="192.168.1.0/24" 
              disabled={isRunning}
              className="h-9"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">Rate (packets/sec)</label>
            <Input 
              value={rate} 
              onChange={(e) => setRate(e.target.value)} 
              placeholder="1000" 
              disabled={isRunning}
              className="h-9"
            />
          </div>
        </div>

        {!isRunning ? (
          <Button onClick={startScan} disabled={!target} size="sm" className="w-full">
            <Play className="h-4 w-4 mr-2" />Start Fast Scan
          </Button>
        ) : (
          <Button onClick={() => setIsRunning(false)} size="sm" variant="destructive" className="w-full">
            <Square className="h-4 w-4 mr-2" />Stop
          </Button>
        )}

        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Scanning at {rate} packets/sec...</span>
              <span>{ports.length} ports found</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      <div className="flex-1 p-3 sm:p-4 overflow-auto">
        <div className="space-y-2">
          {ports.map((item, i) => (
            <Card key={i} className="p-3 border border-primary/30 bg-primary/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="font-mono">{item.port}</Badge>
                  <span className="text-sm font-medium">{item.service}</span>
                </div>
                <Badge className="bg-green-500/20 text-green-500 border-green-500/50">{item.state}</Badge>
              </div>
            </Card>
          ))}
          {!isRunning && ports.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Ready for ultra-fast scanning... Configure target and rate.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}