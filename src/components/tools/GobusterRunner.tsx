import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FolderSearch, Play, Square, Upload } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function GobusterRunner() {
  const [url, setUrl] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [found, setFound] = useState<Array<{ path: string; status: number }>>([]);

  const startBruteforce = () => {
    setIsRunning(true);
    setProgress(0);
    setFound([]);

    const paths = [
      { path: '/admin', status: 200 },
      { path: '/login', status: 200 },
      { path: '/api', status: 403 },
      { path: '/backup', status: 301 },
      { path: '/config', status: 403 },
      { path: '/dashboard', status: 302 },
      { path: '/uploads', status: 200 },
      { path: '/.git', status: 403 },
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < paths.length) {
        setFound(prev => [...prev, paths[current]]);
        setProgress(((current + 1) / paths.length) * 100);
        current++;
      } else {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 500);
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-500';
    if (status >= 300 && status < 400) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <FolderSearch className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Gobuster</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Directory bruteforcer</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Web Hacking</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium">Target URL</label>
          <Input 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            placeholder="http://target.com" 
            disabled={isRunning}
            className="h-9"
          />
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" disabled={isRunning} className="flex-1 sm:flex-none">
            <Upload className="h-4 w-4 mr-2" />Wordlist
          </Button>
          {!isRunning ? (
            <Button onClick={startBruteforce} disabled={!url} size="sm" className="flex-1">
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
              <span>Bruteforcing directories...</span>
              <span>{found.length} found</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      <div className="flex-1 p-3 sm:p-4 overflow-auto">
        <div className="space-y-1">
          {found.map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2 bg-muted/20 rounded border border-border text-sm font-mono">
              <Badge className={getStatusColor(item.status)} variant="outline">{item.status}</Badge>
              <span className="text-foreground">{item.path}</span>
            </div>
          ))}
          {!isRunning && found.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Ready to bruteforce... Configure target and click Start.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}