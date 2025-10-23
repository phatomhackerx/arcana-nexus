import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Beef, Play, Users, Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

export function BeefRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [hookedBrowsers, setHookedBrowsers] = useState<Array<{
    id: string;
    ip: string;
    browser: string;
    os: string;
    timestamp: string;
  }>>([]);

  const start = () => {
    setIsRunning(true);
    setHookedBrowsers([
      {
        id: 'b1',
        ip: '192.168.1.50',
        browser: 'Chrome 120.0',
        os: 'Windows 10',
        timestamp: '2 min ago'
      },
      {
        id: 'b2',
        ip: '192.168.1.75',
        browser: 'Firefox 121.0',
        os: 'macOS',
        timestamp: '5 min ago'
      },
    ]);
  };

  const modules = [
    { name: 'Get Cookie', category: 'Browser', status: 'ready' },
    { name: 'Redirect Browser', category: 'Browser', status: 'ready' },
    { name: 'Fake Notification', category: 'Social Engineering', status: 'ready' },
    { name: 'Pretty Theft', category: 'Social Engineering', status: 'ready' },
    { name: 'Clippy', category: 'Social Engineering', status: 'ready' },
    { name: 'Raw JavaScript', category: 'Misc', status: 'ready' },
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">BeEF</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Browser Exploitation Framework</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Browser Exploitation</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        {!isRunning ? (
          <Button onClick={start} size="sm" className="w-full">
            <Play className="h-4 w-4 mr-2" />Start BeEF Server
          </Button>
        ) : (
          <div className="space-y-2">
            <div className="p-3 bg-muted/20 rounded-lg border border-border">
              <div className="text-xs text-muted-foreground">Hook URL</div>
              <div className="font-mono text-sm mt-1 text-primary">
                http://192.168.1.100:3000/hook.js
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">Server running on port 3000</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-3 sm:p-4">
        <Tabs defaultValue="hooked" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hooked">
              <Users className="h-4 w-4 mr-2" />
              Hooked ({hookedBrowsers.length})
            </TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hooked" className="space-y-2 mt-4">
            {hookedBrowsers.map((browser) => (
              <Card key={browser.id} className="p-4 border border-primary/30 bg-card/50">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-semibold text-sm">{browser.ip}</span>
                    <Badge className="bg-green-500/20 text-green-500 border-green-500/50 text-xs">
                      Online
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Browser: {browser.browser}</div>
                    <div>OS: {browser.os}</div>
                    <div>Connected: {browser.timestamp}</div>
                  </div>
                </div>
              </Card>
            ))}
            {hookedBrowsers.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No hooked browsers yet. Inject the hook script into a page.
              </p>
            )}
          </TabsContent>
          
          <TabsContent value="modules" className="space-y-2 mt-4">
            {modules.map((mod, i) => (
              <Card key={i} className="p-3 border border-border hover:bg-primary/5 cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{mod.name}</div>
                    <div className="text-xs text-muted-foreground">{mod.category}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">{mod.status}</Badge>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}