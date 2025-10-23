import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FolderSearch, Play, Square } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

export function DirbRunner() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [findings, setFindings] = useState<Array<{ path: string; code: number; size: string }>>([]);

  const startScan = () => {
    setIsScanning(true);
    setProgress(0);
    setFindings([]);

    const commonPaths = [
      { path: '/admin', code: 200, size: '4.2KB' },
      { path: '/login', code: 200, size: '3.1KB' },
      { path: '/uploads', code: 403, size: '1.5KB' },
      { path: '/backup', code: 403, size: '1.5KB' },
      { path: '/config', code: 403, size: '1.5KB' },
      { path: '/api', code: 200, size: '2.8KB' },
      { path: '/docs', code: 200, size: '5.3KB' },
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < commonPaths.length) {
        setFindings(prev => [...prev, commonPaths[current]]);
        setProgress(((current + 1) / commonPaths.length) * 100);
        current++;
      } else {
        setIsScanning(false);
        clearInterval(interval);
      }
    }, 500);
  };

  const getStatusColor = (code: number) => {
    if (code === 200) return 'bg-green-500/20 text-green-500 border-green-500/50';
    if (code === 403) return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
    return 'bg-red-500/20 text-red-500 border-red-500/50';
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <FolderSearch className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Dirb</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Web content scanner</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Directory Bruteforce</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium">Target URL</label>
          <Input 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            placeholder="http://example.com" 
            disabled={isScanning}
            className="h-9"
          />
        </div>

        {!isScanning ? (
          <Button onClick={startScan} disabled={!url} size="sm" className="w-full">
            <Play className="h-4 w-4 mr-2" />Start Scan
          </Button>
        ) : (
          <Button onClick={() => setIsScanning(false)} size="sm" variant="destructive" className="w-full">
            <Square className="h-4 w-4 mr-2" />Stop
          </Button>
        )}

        {isScanning && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Scanning directories...</span>
              <span>{findings.length} found</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      <div className="flex-1 p-3 sm:p-4 overflow-auto">
        <div className="space-y-2">
          {findings.map((finding, i) => (
            <Card key={i} className="p-3 border border-primary/30 bg-card/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FolderSearch className="h-4 w-4 text-primary" />
                  <span className="font-mono text-sm">{finding.path}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{finding.size}</span>
                  <Badge className={getStatusColor(finding.code)}>
                    {finding.code}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
          {!isScanning && findings.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Enter target URL to discover hidden directories
            </p>
          )}
        </div>
      </div>
    </div>
  );
}