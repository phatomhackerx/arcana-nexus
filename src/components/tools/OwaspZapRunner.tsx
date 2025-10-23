import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, Play, Square, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function OwaspZapRunner() {
  const [url, setUrl] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alerts, setAlerts] = useState<Array<{ severity: string; title: string; url: string }>>([]);

  const startScan = () => {
    setIsRunning(true);
    setProgress(0);
    setAlerts([]);

    const findings = [
      { severity: 'High', title: 'SQL Injection', url: '/login.php?id=1' },
      { severity: 'High', title: 'Cross Site Scripting (XSS)', url: '/search.php?q=' },
      { severity: 'Medium', title: 'Missing Anti-CSRF Tokens', url: '/form.php' },
      { severity: 'Medium', title: 'X-Frame-Options Header Not Set', url: '/' },
      { severity: 'Low', title: 'Insecure Cookie', url: '/dashboard' },
      { severity: 'Info', title: 'Application Error Disclosure', url: '/error.php' },
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < findings.length) {
        setAlerts(prev => [...prev, findings[current]]);
        setProgress(((current + 1) / findings.length) * 100);
        current++;
      } else {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 1000);
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'High': return 'bg-red-500/20 text-red-500 border-red-500/50';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'Low': return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
      default: return 'bg-muted-foreground/20 text-muted-foreground border-muted-foreground/50';
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">OWASP ZAP</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Web application security scanner</p>
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
            placeholder="https://example.com" 
            disabled={isRunning}
            className="h-9"
          />
        </div>

        {!isRunning ? (
          <Button onClick={startScan} disabled={!url} size="sm" className="w-full">
            <Play className="h-4 w-4 mr-2" />Start Active Scan
          </Button>
        ) : (
          <Button onClick={() => setIsRunning(false)} size="sm" variant="destructive" className="w-full">
            <Square className="h-4 w-4 mr-2" />Stop
          </Button>
        )}

        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Scanning for vulnerabilities...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-3 sm:p-4">
        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alerts">Alerts ({alerts.length})</TabsTrigger>
            <TabsTrigger value="spider">Spider</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="alerts" className="space-y-2 mt-4">
            {alerts.map((alert, i) => (
              <Card key={i} className="p-3 border border-border">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    <div className="space-y-1 flex-1">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <p className="text-xs text-muted-foreground font-mono">{alert.url}</p>
                    </div>
                  </div>
                  <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                </div>
              </Card>
            ))}
            {alerts.length === 0 && !isRunning && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No alerts yet. Start a scan to find vulnerabilities.
              </p>
            )}
          </TabsContent>
          
          <TabsContent value="spider" className="mt-4">
            <p className="text-sm text-muted-foreground text-center py-8">Spider results will appear here</p>
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <p className="text-sm text-muted-foreground text-center py-8">Request history will appear here</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}