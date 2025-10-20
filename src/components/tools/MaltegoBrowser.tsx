import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Network, Mail, User, MapPin, Building } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function MaltegoBrowser() {
  const [target, setTarget] = useState('');
  const [entities, setEntities] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const entityTypes = [
    { icon: User, label: 'Person', color: 'text-blue-400' },
    { icon: Mail, label: 'Email', color: 'text-green-400' },
    { icon: Network, label: 'Domain', color: 'text-purple-400' },
    { icon: MapPin, label: 'Location', color: 'text-yellow-400' },
    { icon: Building, label: 'Organization', color: 'text-red-400' },
  ];

  const mockResults = [
    { type: 'Person', value: 'John Doe', icon: User, color: 'text-blue-400' },
    { type: 'Email', value: 'john.doe@example.com', icon: Mail, color: 'text-green-400' },
    { type: 'Domain', value: 'example.com', icon: Network, color: 'text-purple-400' },
    { type: 'Location', value: 'San Francisco, CA', icon: MapPin, color: 'text-yellow-400' },
    { type: 'Organization', value: 'Example Corp', icon: Building, color: 'text-red-400' },
  ];

  const runTransform = () => {
    setIsSearching(true);
    setTimeout(() => {
      setEntities(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Network className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-foreground">Maltego</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">OSINT and link analysis platform</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">OSINT</Badge>
      </div>

      {/* Search */}
      <div className="p-3 sm:p-4 border-b border-border">
        <div className="flex gap-2">
          <Input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Enter target (domain, email, person, organization...)"
            disabled={isSearching}
            className="flex-1 h-10 text-sm"
          />
          <Button onClick={runTransform} disabled={isSearching || !target} size="sm">
            <Search className="h-4 w-4 mr-2" />
            {isSearching ? 'Searching...' : 'Transform'}
          </Button>
        </div>
      </div>

      {/* Entity Types */}
      <div className="p-3 sm:p-4 border-b border-border">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {entityTypes.map((entity) => (
            <button
              key={entity.label}
              className="p-2 sm:p-3 border border-border rounded-lg hover:border-primary/50 transition-all text-left"
            >
              <entity.icon className={`h-5 w-5 ${entity.color} mb-2`} />
              <p className="text-xs font-medium text-foreground">{entity.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <Tabs defaultValue="graph" className="flex-1 flex flex-col">
        <TabsList className="mx-3 sm:mx-4 mt-3 grid w-auto grid-cols-2 h-auto">
          <TabsTrigger value="graph" className="text-xs px-3 py-2">Graph View</TabsTrigger>
          <TabsTrigger value="list" className="text-xs px-3 py-2">Entity List</TabsTrigger>
        </TabsList>

        <TabsContent value="graph" className="flex-1 p-3 sm:p-4">
          <div className="h-full border border-border rounded-lg bg-muted/10 flex items-center justify-center">
            {entities.length === 0 ? (
              <div className="text-center text-muted-foreground">
                <Network className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Graph visualization will appear here</p>
                <p className="text-xs mt-1">Run a transform to see connections</p>
              </div>
            ) : (
              <div className="relative w-full h-full p-6">
                {/* Central Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-semibold text-primary truncate px-2">{target}</span>
                  </div>
                </div>
                
                {/* Connected Nodes */}
                {entities.map((entity, idx) => {
                  const angle = (idx * 360) / entities.length;
                  const radius = 120;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  return (
                    <div
                      key={idx}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                      }}
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/50 transition-all cursor-pointer">
                        <entity.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${entity.color}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="list" className="flex-1 p-3 sm:p-4 overflow-auto">
          {entities.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p className="text-sm">No entities found yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {entities.map((entity, idx) => (
                <div key={idx} className="p-3 border border-border rounded-lg hover:border-primary/50 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <entity.icon className={`h-5 w-5 ${entity.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{entity.value}</p>
                      <p className="text-xs text-muted-foreground">{entity.type}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">{entity.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
