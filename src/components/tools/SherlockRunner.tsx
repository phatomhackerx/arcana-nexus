import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Play, Square, ExternalLink } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

export function SherlockRunner() {
  const [username, setUsername] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<Array<{ platform: string; found: boolean; url: string }>>([]);

  const platforms = [
    { name: 'GitHub', url: 'https://github.com/' },
    { name: 'Twitter', url: 'https://twitter.com/' },
    { name: 'Instagram', url: 'https://instagram.com/' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/' },
    { name: 'Facebook', url: 'https://facebook.com/' },
    { name: 'Reddit', url: 'https://reddit.com/user/' },
    { name: 'Pinterest', url: 'https://pinterest.com/' },
    { name: 'YouTube', url: 'https://youtube.com/@' },
  ];

  const startSearch = () => {
    setIsRunning(true);
    setProgress(0);
    setResults([]);

    let current = 0;
    const interval = setInterval(() => {
      if (current < platforms.length) {
        const found = Math.random() > 0.5;
        setResults(prev => [...prev, {
          platform: platforms[current].name,
          found,
          url: platforms[current].url + username
        }]);
        setProgress(((current + 1) / platforms.length) * 100);
        current++;
      } else {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 600);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Sherlock</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Hunt social media accounts</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">OSINT</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium">Target Username</label>
          <Input 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="johndoe" 
            disabled={isRunning}
            className="h-9"
          />
        </div>

        {!isRunning ? (
          <Button onClick={startSearch} disabled={!username} size="sm" className="w-full">
            <Play className="h-4 w-4 mr-2" />Start Hunt
          </Button>
        ) : (
          <Button onClick={() => setIsRunning(false)} size="sm" variant="destructive" className="w-full">
            <Square className="h-4 w-4 mr-2" />Stop
          </Button>
        )}

        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Searching platforms...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      <div className="flex-1 p-3 sm:p-4 overflow-auto">
        <div className="space-y-2">
          {results.map((result, i) => (
            <Card key={i} className={`p-3 border ${result.found ? 'border-primary/50 bg-primary/5' : 'border-border bg-muted/20'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${result.found ? 'bg-primary' : 'bg-muted-foreground'}`} />
                  <span className="font-medium text-sm">{result.platform}</span>
                  {result.found && <Badge variant="secondary" className="text-xs">Found</Badge>}
                </div>
                {result.found && (
                  <Button size="sm" variant="ghost" asChild>
                    <a href={result.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}