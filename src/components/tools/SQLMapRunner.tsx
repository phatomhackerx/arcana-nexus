import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Database, Play, Square, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SQLMapRunner() {
  const [url, setUrl] = useState('');
  const [technique, setTechnique] = useState('automatic');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const techniques = [
    { value: 'automatic', label: 'Automatic' },
    { value: 'boolean', label: 'Boolean-based blind' },
    { value: 'time', label: 'Time-based blind' },
    { value: 'error', label: 'Error-based' },
    { value: 'union', label: 'UNION query' },
  ];

  const runScan = () => {
    setIsRunning(true);
    setOutput('');
    
    const lines = [
      `        ___`,
      `       __H__`,
      ` ___ ___[.]_____ ___ ___  {1.7.2#stable}`,
      `|_ -| . [']     | .'| . |`,
      `|___|_  ["]_|_|_|__,|  _|`,
      `      |_|V...       |_|   https://sqlmap.org`,
      ``,
      `[*] starting @ ${new Date().toLocaleTimeString()}`,
      `[*] testing connection to the target URL`,
      `[*] testing if the target URL content is stable`,
      `[*] target URL content is stable`,
      `[*] heuristic (basic) test shows that GET parameter 'id' might be injectable`,
      `[INFO] testing for SQL injection on GET parameter 'id'`,
      `[INFO] testing 'AND boolean-based blind - WHERE or HAVING clause'`,
      `[INFO] GET parameter 'id' appears to be 'AND boolean-based blind' injectable`,
      `[INFO] testing 'MySQL >= 5.0 AND error-based - WHERE, HAVING'`,
      `[INFO] GET parameter 'id' is 'MySQL >= 5.0 AND error-based' injectable`,
      ``,
      `[CRITICAL] GET parameter 'id' is vulnerable. Injection type: boolean-based blind`,
      `[INFO] the back-end DBMS is MySQL`,
      `web application technology: PHP 7.4.3, Apache 2.4.41`,
      `back-end DBMS: MySQL >= 5.0`,
      ``,
      `[*] shutting down at ${new Date().toLocaleTimeString()}`
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setOutput(prev => prev + lines[currentLine] + '\n');
        currentLine++;
      } else {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 300);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Database className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-foreground">SQLMap</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Automatic SQL injection tool</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Web Exploitation</Badge>
      </div>

      {/* Configuration */}
      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium text-foreground">Target URL</label>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/page.php?id=1"
            disabled={isRunning}
            className="h-9 sm:h-10 text-sm font-mono"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground">Technique</label>
            <Select value={technique} onValueChange={setTechnique} disabled={isRunning}>
              <SelectTrigger className="h-9 sm:h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {techniques.map(t => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end gap-2">
            {!isRunning ? (
              <Button onClick={runScan} size="sm" className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                Start Scan
              </Button>
            ) : (
              <Button onClick={() => setIsRunning(false)} size="sm" variant="destructive" className="flex-1">
                <Square className="h-4 w-4 mr-2" />
                Stop
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-yellow-500 bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>Only test on systems you own or have explicit permission to test</span>
        </div>
      </div>

      {/* Output */}
      <div className="flex-1 p-3 sm:p-4 overflow-hidden flex flex-col">
        <label className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Output</label>
        <div className="flex-1 bg-muted/20 rounded-lg p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-auto border border-border">
          <pre className="whitespace-pre-wrap text-foreground">
            {output || 'Ready to scan... Configure target URL and click Start Scan.'}
            {isRunning && <span className="animate-pulse">█</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}
