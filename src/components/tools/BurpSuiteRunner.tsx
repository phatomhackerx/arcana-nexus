import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, Play, Square, Search, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function BurpSuiteRunner() {
  const [url, setUrl] = useState('');
  const [requests, setRequests] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const mockRequests = [
    { id: 1, method: 'GET', url: '/api/users', status: 200, size: '2.3 KB', time: '145ms' },
    { id: 2, method: 'POST', url: '/api/login', status: 200, size: '1.1 KB', time: '234ms' },
    { id: 3, method: 'GET', url: '/api/products', status: 200, size: '5.7 KB', time: '98ms' },
    { id: 4, method: 'PUT', url: '/api/profile', status: 403, size: '0.5 KB', time: '67ms' },
  ];

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setRequests(mockRequests);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-foreground">Burp Suite</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Web application security testing</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Web Testing</Badge>
      </div>

      {/* Configuration */}
      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="flex gap-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Target URL (e.g., https://example.com)"
            disabled={isScanning}
            className="flex-1 h-9 sm:h-10 text-sm"
          />
          {!isScanning ? (
            <Button onClick={startScan} size="sm">
              <Play className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Start</span>
            </Button>
          ) : (
            <Button onClick={() => setIsScanning(false)} size="sm" variant="destructive">
              <Square className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Stop</span>
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="proxy" className="flex-1 flex flex-col">
        <TabsList className="mx-3 sm:mx-4 mt-3 sm:mt-4 grid w-auto grid-cols-3 sm:grid-cols-5 h-auto">
          <TabsTrigger value="proxy" className="text-xs px-2 py-2">Proxy</TabsTrigger>
          <TabsTrigger value="scanner" className="text-xs px-2 py-2">Scanner</TabsTrigger>
          <TabsTrigger value="intruder" className="text-xs px-2 py-2">Intruder</TabsTrigger>
          <TabsTrigger value="repeater" className="text-xs px-2 py-2 hidden sm:block">Repeater</TabsTrigger>
          <TabsTrigger value="sequencer" className="text-xs px-2 py-2 hidden sm:block">Sequencer</TabsTrigger>
        </TabsList>

        <TabsContent value="proxy" className="flex-1 p-3 sm:p-4 overflow-auto">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Filter requests..." className="flex-1 h-8 sm:h-9 text-sm" />
              <Button size="sm" variant="outline" className="hidden sm:flex">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/30 px-3 sm:px-4 py-2 grid grid-cols-6 gap-2 text-xs font-medium text-muted-foreground border-b border-border">
                <div className="col-span-1">Method</div>
                <div className="col-span-3">URL</div>
                <div className="col-span-1 hidden sm:block">Status</div>
                <div className="col-span-1 hidden sm:block">Time</div>
              </div>

              {requests.length === 0 ? (
                <div className="p-6 sm:p-8 text-center text-sm text-muted-foreground">
                  {isScanning ? 'Intercepting requests...' : 'No requests captured yet'}
                </div>
              ) : (
                requests.map(req => (
                  <div
                    key={req.id}
                    className="px-3 sm:px-4 py-2 sm:py-3 grid grid-cols-6 gap-2 text-xs sm:text-sm border-b border-border hover:bg-accent/50 cursor-pointer transition-colors"
                  >
                    <div className="col-span-1">
                      <Badge variant={req.method === 'GET' ? 'secondary' : 'default'} className="text-xs">
                        {req.method}
                      </Badge>
                    </div>
                    <div className="col-span-3 text-foreground truncate font-mono text-xs">{req.url}</div>
                    <div className={`col-span-1 hidden sm:block ${req.status === 200 ? 'text-success' : 'text-destructive'}`}>
                      {req.status}
                    </div>
                    <div className="col-span-1 text-muted-foreground hidden sm:block">{req.time}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scanner" className="flex-1 p-3 sm:p-4">
          <div className="text-sm text-muted-foreground">Scanner module - Configure automated vulnerability scanning</div>
        </TabsContent>

        <TabsContent value="intruder" className="flex-1 p-3 sm:p-4">
          <div className="text-sm text-muted-foreground">Intruder module - Automated attacks and fuzzing</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
