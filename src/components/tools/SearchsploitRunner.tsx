import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Play, FileCode, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function SearchsploitRunner() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [exploits, setExploits] = useState<Array<{
    title: string;
    path: string;
    type: string;
    platform: string;
  }>>([]);

  const search = () => {
    setIsSearching(true);
    setExploits([
      {
        title: 'Apache 2.4.49 - Path Traversal & RCE',
        path: 'exploits/linux/webapps/50383.sh',
        type: 'Remote',
        platform: 'Linux'
      },
      {
        title: 'Apache 2.4.49/2.4.50 - Traversal & RCE (Metasploit)',
        path: 'exploits/multiple/webapps/50406.rb',
        type: 'Remote',
        platform: 'Multiple'
      },
      {
        title: 'Apache HTTP Server 2.4.50 - Remote Code Execution',
        path: 'exploits/multiple/webapps/50512.py',
        type: 'Remote',
        platform: 'Multiple'
      },
      {
        title: 'Apache mod_cgi - Remote Code Execution',
        path: 'exploits/linux/remote/39161.txt',
        type: 'Remote',
        platform: 'Linux'
      },
    ]);
    
    setTimeout(() => setIsSearching(false), 800);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Searchsploit</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Exploit database search tool</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Exploitation</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium">Search Query</label>
          <div className="flex gap-2">
            <Input 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              placeholder="apache 2.4" 
              disabled={isSearching}
              className="h-9"
            />
            <Button onClick={search} disabled={isSearching || !query} size="sm">
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {['apache', 'wordpress', 'mysql', 'ssh', 'windows'].map(filter => (
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
        <div className="space-y-2">
          {exploits.map((exploit, i) => (
            <Card key={i} className="p-4 border border-primary/30 bg-card/50 hover:bg-primary/5 transition-colors">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    <FileCode className="h-4 w-4 text-primary mt-1" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">{exploit.title}</h4>
                      <p className="text-xs font-mono text-muted-foreground">{exploit.path}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs">{exploit.type}</Badge>
                  <Badge variant="outline" className="text-xs">{exploit.platform}</Badge>
                </div>
              </div>
            </Card>
          ))}
          {exploits.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Search the Exploit Database for vulnerabilities and exploits
            </p>
          )}
        </div>
      </div>
    </div>
  );
}