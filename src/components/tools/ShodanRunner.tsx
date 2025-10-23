import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Satellite, Play, MapPin, Server } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function ShodanRunner() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Array<{
    ip: string;
    port: number;
    org: string;
    location: string;
    service: string;
  }>>([]);

  const search = () => {
    setIsSearching(true);
    setResults([
      { ip: '45.33.32.156', port: 22, org: 'Linode', location: 'US', service: 'OpenSSH 7.4' },
      { ip: '104.248.63.24', port: 80, org: 'DigitalOcean', location: 'US', service: 'nginx 1.14.0' },
      { ip: '167.172.54.89', port: 443, org: 'DigitalOcean', location: 'DE', service: 'Apache 2.4.41' },
      { ip: '178.128.221.45', port: 3306, org: 'DigitalOcean', location: 'UK', service: 'MySQL 5.7.30' },
      { ip: '142.93.171.234', port: 21, org: 'DigitalOcean', location: 'CA', service: 'vsftpd 3.0.3' },
    ]);
    
    setTimeout(() => setIsSearching(false), 1500);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Satellite className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Shodan</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Search engine for IoT devices</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">OSINT</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium">Search Query</label>
          <div className="flex gap-2">
            <Input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="apache country:US" 
              disabled={isSearching}
              className="h-9"
            />
            <Button onClick={search} disabled={isSearching || !query} size="sm">
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {['apache', 'nginx', 'port:22', 'country:US', 'org:"Amazon"'].map(filter => (
            <Badge 
              key={filter} 
              variant="outline" 
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => setQuery(filter)}
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex-1 p-3 sm:p-4 overflow-auto">
        <div className="space-y-3">
          {results.map((result, i) => (
            <Card key={i} className="p-4 border border-primary/30 bg-card/50">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-primary" />
                    <span className="font-mono font-semibold text-sm">{result.ip}</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
                    Port {result.port}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>{result.location} • {result.org}</span>
                  </div>
                  <div className="font-mono text-xs">{result.service}</div>
                </div>
              </div>
            </Card>
          ))}
          {results.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Enter a search query to find Internet-connected devices
            </p>
          )}
        </div>
      </div>
    </div>
  );
}