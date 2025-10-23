import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Play, Square, Database } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

export function ReconNgRunner() {
  const [domain, setDomain] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hosts, setHosts] = useState<string[]>([]);
  const [contacts, setContacts] = useState<string[]>([]);
  const [modules, setModules] = useState<Array<{ name: string; status: string }>>([]);

  const startRecon = () => {
    setIsRunning(true);
    setHosts([
      'www.example.com',
      'mail.example.com',
      'ftp.example.com',
      'vpn.example.com',
      'api.example.com',
    ]);
    setContacts([
      'admin@example.com',
      'info@example.com',
      'support@example.com',
      'sales@example.com',
    ]);
    setModules([
      { name: 'recon/domains-hosts/google_site_web', status: 'completed' },
      { name: 'recon/hosts-hosts/resolve', status: 'completed' },
      { name: 'recon/domains-contacts/whois_pocs', status: 'running' },
      { name: 'recon/hosts-ports/shodan_hostname', status: 'queued' },
    ]);

    setTimeout(() => {
      setIsRunning(false);
      setModules(prev => prev.map(m => ({ ...m, status: 'completed' })));
    }, 5000);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Database className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Recon-ng</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Reconnaissance framework</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">OSINT</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium">Target Domain</label>
          <Input 
            value={domain} 
            onChange={(e) => setDomain(e.target.value)} 
            placeholder="example.com" 
            disabled={isRunning}
            className="h-9"
          />
        </div>

        {!isRunning ? (
          <Button onClick={startRecon} disabled={!domain} size="sm" className="w-full">
            <Play className="h-4 w-4 mr-2" />Run Modules
          </Button>
        ) : (
          <Button onClick={() => setIsRunning(false)} size="sm" variant="destructive" className="w-full">
            <Square className="h-4 w-4 mr-2" />Stop
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-auto p-3 sm:p-4">
        <Tabs defaultValue="hosts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hosts">Hosts ({hosts.length})</TabsTrigger>
            <TabsTrigger value="contacts">Contacts ({contacts.length})</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hosts" className="space-y-2 mt-4">
            {hosts.map((host, i) => (
              <Card key={i} className="p-3 border border-primary/30 bg-primary/5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">{host}</span>
                  <Badge variant="outline" className="text-xs">Active</Badge>
                </div>
              </Card>
            ))}
            {hosts.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No hosts discovered yet
              </p>
            )}
          </TabsContent>
          
          <TabsContent value="contacts" className="space-y-2 mt-4">
            {contacts.map((contact, i) => (
              <Card key={i} className="p-3 border border-primary/30 bg-primary/5">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-primary" />
                  <span className="font-mono text-sm">{contact}</span>
                </div>
              </Card>
            ))}
            {contacts.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No contacts found yet
              </p>
            )}
          </TabsContent>
          
          <TabsContent value="modules" className="space-y-2 mt-4">
            {modules.map((mod, i) => (
              <Card key={i} className="p-3 border border-border">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs">{mod.name}</span>
                  <Badge 
                    variant={mod.status === 'completed' ? 'default' : 'outline'}
                    className="text-xs"
                  >
                    {mod.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}