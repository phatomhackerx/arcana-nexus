import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { KeyRound, Play, Square, Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

export function HashcatRunner() {
  const [hash, setHash] = useState('');
  const [hashType, setHashType] = useState('0');
  const [attackMode, setAttackMode] = useState('0');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState('');

  const hashTypes = [
    { value: '0', label: 'MD5' },
    { value: '100', label: 'SHA1' },
    { value: '1000', label: 'NTLM' },
    { value: '1400', label: 'SHA256' },
    { value: '3200', label: 'bcrypt' },
  ];

  const attackModes = [
    { value: '0', label: 'Straight (Dictionary)' },
    { value: '1', label: 'Combination' },
    { value: '3', label: 'Brute-force' },
    { value: '6', label: 'Hybrid Wordlist + Mask' },
  ];

  const startCrack = () => {
    setIsRunning(true);
    setProgress(0);
    setResult('');

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsRunning(false);
          setResult('5f4dcc3b5aa765d61d8327deb882cf99:password');
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <KeyRound className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-foreground">Hashcat</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Advanced password recovery</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Password Cracking</Badge>
      </div>

      {/* Configuration */}
      <div className="p-3 sm:p-4 space-y-3 border-b border-border">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium text-foreground">Hash</label>
          <div className="flex gap-2">
            <Input
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              placeholder="Enter hash or load from file"
              disabled={isRunning}
              className="flex-1 h-9 sm:h-10 text-sm font-mono"
            />
            <Button size="sm" variant="outline" disabled={isRunning}>
              <Upload className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Load</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground">Hash Type</label>
            <Select value={hashType} onValueChange={setHashType} disabled={isRunning}>
              <SelectTrigger className="h-9 sm:h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {hashTypes.map(t => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground">Attack Mode</label>
            <Select value={attackMode} onValueChange={setAttackMode} disabled={isRunning}>
              <SelectTrigger className="h-9 sm:h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {attackModes.map(m => (
                  <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          {!isRunning ? (
            <Button onClick={startCrack} size="sm" disabled={!hash} className="flex-1 sm:flex-none">
              <Play className="h-4 w-4 mr-2" />
              Start Attack
            </Button>
          ) : (
            <Button onClick={() => setIsRunning(false)} size="sm" variant="destructive" className="flex-1 sm:flex-none">
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
          )}
        </div>
      </div>

      {/* Progress */}
      {isRunning && (
        <div className="p-3 sm:p-4 border-b border-border space-y-3">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Cracking in progress...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-muted-foreground">Speed: </span>
              <span className="text-foreground">1.2 GH/s</span>
            </div>
            <div>
              <span className="text-muted-foreground">Tried: </span>
              <span className="text-foreground">4.5M</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-muted-foreground">Temp: </span>
              <span className="text-foreground">72°C</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-muted-foreground">Time: </span>
              <span className="text-foreground">00:02:34</span>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="flex-1 p-3 sm:p-4 overflow-auto">
        {result ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-success">
              <KeyRound className="h-5 w-5" />
              <h4 className="font-semibold text-sm sm:text-base">Hash Cracked!</h4>
            </div>
            <div className="p-3 sm:p-4 bg-success/10 border border-success/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Result:</p>
              <p className="font-mono text-xs sm:text-sm text-foreground break-all">{result}</p>
            </div>
            <div className="p-3 sm:p-4 bg-muted/20 border border-border rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Statistics:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mt-2">
                <div>Time elapsed: 2m 34s</div>
                <div>Candidates tested: 4,567,890</div>
                <div>Average speed: 1.2 GH/s</div>
                <div>Recovery rate: 100%</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <KeyRound className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Configure attack and click Start to begin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
