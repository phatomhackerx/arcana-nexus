import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, Play, Square, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function NiktoRunner() {
  const [target, setTarget] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState('');

  const startScan = () => {
    setIsRunning(true);
    setProgress(0);
    setOutput('');

    const lines = [
      `- Nikto v2.5.0`,
      `+ Target IP: ${target}`,
      `+ Target Hostname: ${target}`,
      `+ Target Port: 80`,
      `+ Start Time: ${new Date().toLocaleString()}`,
      `- Scanning for 6700 items...`,
      `+ Server: Apache/2.4.41 (Ubuntu)`,
      `+ OSVDB-3268: /admin/: Directory indexing found.`,
      `+ OSVDB-3092: /admin/: This might be interesting...`,
      `+ OSVDB-3233: /icons/README: Apache default file found.`,
      `+ Server may leak inodes via ETags, header found with file /, inode: 2c3, size: 5e7b`,
      `+ Allowed HTTP Methods: GET, HEAD, POST, OPTIONS`,
      `+ OSVDB-3233: /admin/config.php: PHP Config file may contain database IDs and passwords.`,
      `+ /admin/login.php: Admin login page found.`,
      `+ 6700 requests: 0 error(s) and 12 item(s) reported on remote host`,
      `+ End Time: ${new Date().toLocaleString()} (12 seconds)`,
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
            <h3 className="font-semibold text-sm sm:text-base">Nikto</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Web server scanner</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Web Scanner</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium">Target URL</label>
          <Input 
            value={target} 
            onChange={(e) => setTarget(e.target.value)} 
            placeholder="http://target.com" 
            disabled={isRunning}
            className="h-9"
          />
        </div>

        <div className="flex gap-2">
          {!isRunning ? (
            <Button onClick={startScan} disabled={!target} size="sm" className="flex-1">
              <Play className="h-4 w-4 mr-2" />Start Scan
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
              <span>Scanning...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      <div className="flex-1 p-3 sm:p-4">
        <div className="h-full bg-muted/20 rounded-lg p-3 font-mono text-xs overflow-auto border border-border">
          <pre className="whitespace-pre-wrap text-foreground">
            {output || 'Ready to scan... Enter target URL and click Start.'}
            {isRunning && <span className="animate-pulse">█</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}