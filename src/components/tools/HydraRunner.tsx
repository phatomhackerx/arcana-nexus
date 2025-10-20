import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Lock, Play, Square, Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

export function HydraRunner() {
  const [target, setTarget] = useState('');
  const [username, setUsername] = useState('');
  const [service, setService] = useState('ssh');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState('');

  const services = [
    { value: 'ssh', label: 'SSH' },
    { value: 'ftp', label: 'FTP' },
    { value: 'http-get', label: 'HTTP GET' },
    { value: 'http-post', label: 'HTTP POST' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'rdp', label: 'RDP' },
    { value: 'smtp', label: 'SMTP' },
    { value: 'vnc', label: 'VNC' },
  ];

  const startAttack = () => {
    setIsRunning(true);
    setProgress(0);
    setOutput('');

    const lines = [
      `Hydra v9.5 starting at ${new Date().toLocaleTimeString()}`,
      `[DATA] max 16 tasks per 1 server`,
      `[DATA] attacking ${service}://${target}:22/`,
      `[22][${service}] host: ${target}   login: ${username}   password: admin123`,
      `[22][${service}] host: ${target}   login: ${username}   password: password`,
      `[STATUS] 156.00 tries/min, 156 tries in 00:01h`,
      `[STATUS] 312.00 tries/min, 312 tries in 00:02h`,
      `[22][${service}] host: ${target}   login: ${username}   password: summer2024`,
      `1 of 1 target successfully completed, 1 valid password found`
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setOutput(prev => prev + lines[currentLine] + '\n');
        setProgress(Math.min(((currentLine + 1) / lines.length) * 100, 100));
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
          <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Hydra</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Network logon cracker</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Bruteforce</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">Target</label>
            <Input value={target} onChange={(e) => setTarget(e.target.value)} placeholder="192.168.1.100" disabled={isRunning} className="h-9" />
          </div>
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">Service</label>
            <Select value={service} onValueChange={setService} disabled={isRunning}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>{services.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium">Username</label>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" disabled={isRunning} className="h-9" />
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" disabled={isRunning} className="flex-1 sm:flex-none">
            <Upload className="h-4 w-4 mr-2" />Wordlist
          </Button>
          {!isRunning ? (
            <Button onClick={startAttack} disabled={!target || !username} size="sm" className="flex-1">
              <Play className="h-4 w-4 mr-2" />Start
            </Button>
          ) : (
            <Button onClick={() => setIsRunning(false)} size="sm" variant="destructive" className="flex-1">
              <Square className="h-4 w-4 mr-2" />Stop
            </Button>
          )}
        </div>

        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Bruteforcing...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      <div className="flex-1 p-3 sm:p-4">
        <div className="h-full bg-muted/20 rounded-lg p-3 font-mono text-xs overflow-auto border border-border">
          <pre className="whitespace-pre-wrap text-foreground">{output || 'Ready to attack... Configure target and credentials.'}{isRunning && <span className="animate-pulse">█</span>}</pre>
        </div>
      </div>
    </div>
  );
}
