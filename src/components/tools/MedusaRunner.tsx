import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, Play, Square } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function MedusaRunner() {
  const [target, setTarget] = useState('');
  const [username, setUsername] = useState('');
  const [service, setService] = useState('ssh');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState('');

  const services = [
    { value: 'ssh', label: 'SSH' },
    { value: 'ftp', label: 'FTP' },
    { value: 'telnet', label: 'Telnet' },
    { value: 'http', label: 'HTTP' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'smb', label: 'SMB' },
  ];

  const startAttack = () => {
    setIsRunning(true);
    setProgress(0);
    setOutput('');

    const lines = [
      `Medusa v2.2 [http://www.foofus.net] (C) JoMo-Kun / Foofus Networks`,
      ``,
      `ACCOUNT CHECK: [${service}] Host: ${target} (1 of 1) User: ${username} (1 of 1) Password: admin (1 of 150)`,
      `ACCOUNT CHECK: [${service}] Host: ${target} (1 of 1) User: ${username} (1 of 1) Password: password (2 of 150)`,
      `ACCOUNT CHECK: [${service}] Host: ${target} (1 of 1) User: ${username} (1 of 1) Password: 123456 (3 of 150)`,
      `ACCOUNT CHECK: [${service}] Host: ${target} (1 of 1) User: ${username} (1 of 1) Password: letmein (4 of 150)`,
      `ACCOUNT FOUND: [${service}] Host: ${target} User: ${username} Password: letmein [SUCCESS]`,
      ``,
      `Medusa has finished (0.00023 tasks/s)`
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
    }, 700);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Medusa</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Parallel login brute-forcer</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Password Attacks</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">Target</label>
            <Input 
              value={target} 
              onChange={(e) => setTarget(e.target.value)} 
              placeholder="192.168.1.100" 
              disabled={isRunning}
              className="h-9"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">Username</label>
            <Input 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="admin" 
              disabled={isRunning}
              className="h-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium">Service</label>
          <Select value={service} onValueChange={setService} disabled={isRunning}>
            <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
            <SelectContent>{services.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        {!isRunning ? (
          <Button onClick={startAttack} disabled={!target || !username} size="sm" className="w-full">
            <Play className="h-4 w-4 mr-2" />Start Attack
          </Button>
        ) : (
          <Button onClick={() => setIsRunning(false)} size="sm" variant="destructive" className="w-full">
            <Square className="h-4 w-4 mr-2" />Stop
          </Button>
        )}

        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Brute forcing...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      <div className="flex-1 p-3 sm:p-4">
        <div className="h-full bg-muted/20 rounded-lg p-3 font-mono text-xs overflow-auto border border-border">
          <pre className="whitespace-pre-wrap text-foreground">
            {output || 'Ready to start parallel brute force attack...'}
            {isRunning && <span className="animate-pulse">█</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}