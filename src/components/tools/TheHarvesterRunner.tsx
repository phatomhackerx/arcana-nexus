import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Globe, Play, Square, Mail, Server } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function TheHarvesterRunner() {
  const [domain, setDomain] = useState('');
  const [source, setSource] = useState('google');
  const [isRunning, setIsRunning] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [subdomains, setSubdomains] = useState<string[]>([]);

  const sources = [
    { value: 'google', label: 'Google' },
    { value: 'bing', label: 'Bing' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'all', label: 'All Sources' },
  ];

  const startHarvest = () => {
    setIsRunning(true);
    setEmails([]);
    setSubdomains([]);

    setTimeout(() => {
      setEmails([
        'admin@' + domain,
        'info@' + domain,
        'support@' + domain,
        'contact@' + domain,
        'sales@' + domain,
      ]);
      setSubdomains([
        'www.' + domain,
        'mail.' + domain,
        'ftp.' + domain,
        'api.' + domain,
        'dev.' + domain,
        'staging.' + domain,
      ]);
      setIsRunning(false);
    }, 3000);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">theHarvester</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Email & domain harvesting</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">OSINT</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">Data Source</label>
            <Select value={source} onValueChange={setSource} disabled={isRunning}>
              <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
              <SelectContent>{sources.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        {!isRunning ? (
          <Button onClick={startHarvest} disabled={!domain} size="sm" className="w-full">
            <Play className="h-4 w-4 mr-2" />Start Harvest
          </Button>
        ) : (
          <Button onClick={() => setIsRunning(false)} size="sm" variant="destructive" className="w-full">
            <Square className="h-4 w-4 mr-2" />Stop
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-auto p-3 sm:p-4">
        {isRunning ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-2">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
              <p className="text-sm text-muted-foreground">Harvesting data from {source}...</p>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="emails" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="emails">
                <Mail className="h-4 w-4 mr-2" />
                Emails ({emails.length})
              </TabsTrigger>
              <TabsTrigger value="subdomains">
                <Server className="h-4 w-4 mr-2" />
                Subdomains ({subdomains.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="emails" className="space-y-2 mt-4">
              {emails.map((email, i) => (
                <div key={i} className="p-2 bg-muted/20 rounded border border-border text-sm font-mono">
                  {email}
                </div>
              ))}
            </TabsContent>
            <TabsContent value="subdomains" className="space-y-2 mt-4">
              {subdomains.map((sub, i) => (
                <div key={i} className="p-2 bg-muted/20 rounded border border-border text-sm font-mono">
                  {sub}
                </div>
              ))}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}