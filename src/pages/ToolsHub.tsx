import { useState } from 'react';
import { Search, Filter, Grid, List, Terminal, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const toolCategories = [
  {
    id: 'osint',
    name: 'OSINT & Intelligence',
    description: 'Open Source Intelligence gathering tools',
    tools: [
      { name: 'Sherlock', category: 'Social Media', description: 'Find usernames across social networks', status: 'Available' },
      { name: 'theHarvester', category: 'Email/Domain', description: 'Gather emails, subdomains, hosts', status: 'Available' },
      { name: 'Maltego', category: 'Link Analysis', description: 'Interactive data mining platform', status: 'Pro' },
      { name: 'Shodan', category: 'Device Search', description: 'Search engine for internet devices', status: 'API' }
    ]
  },
  {
    id: 'web',
    name: 'Web Application Security',
    description: 'Tools for testing web applications',
    tools: [
      { name: 'Burp Suite', category: 'Proxy/Scanner', description: 'Web vulnerability scanner', status: 'Available' },
      { name: 'OWASP ZAP', category: 'Proxy/Scanner', description: 'Free security testing proxy', status: 'Available' },
      { name: 'SQLMap', category: 'SQL Injection', description: 'Automatic SQL injection tool', status: 'Available' },
      { name: 'Nikto', category: 'Web Scanner', description: 'Web server scanner', status: 'Available' }
    ]
  },
  {
    id: 'network',
    name: 'Network Security',
    description: 'Network analysis and exploitation tools',
    tools: [
      { name: 'Nmap', category: 'Port Scanner', description: 'Network discovery and security auditing', status: 'Available' },
      { name: 'Metasploit', category: 'Exploitation', description: 'Penetration testing framework', status: 'Available' },
      { name: 'Wireshark', category: 'Packet Analysis', description: 'Network protocol analyzer', status: 'Available' },
      { name: 'Masscan', category: 'Port Scanner', description: 'Fast port scanner', status: 'Available' }
    ]
  }
];

export default function ToolsHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-500';
      case 'Pro': return 'bg-blue-500';
      case 'API': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const allTools = toolCategories.flatMap(category => 
    category.tools.map(tool => ({ ...tool, categoryName: category.name }))
  );

  const filteredTools = allTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           tool.categoryName.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tools Hub</h1>
          <p className="text-muted-foreground">Comprehensive security testing toolkit</p>
        </div>
        <Button className="glass-card hover-glow">
          <Terminal className="w-4 h-4 mr-2" />
          Custom Tool
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tool Categories */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Tools</TabsTrigger>
          <TabsTrigger value="osint">OSINT</TabsTrigger>
          <TabsTrigger value="web">Web Security</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredTools.map((tool, index) => (
              <Card key={`${tool.name}-${index}`} className="glass-card hover-lift cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {tool.name}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-2">
                        <span>{tool.category}</span>
                        <Badge variant="secondary">
                          {tool.categoryName}
                        </Badge>
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(tool.status)}`} />
                      <span className="text-xs text-muted-foreground">{tool.status}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button size="sm" className="hover-glow">
                        <Play className="w-3 h-3 mr-1" />
                        Launch
                      </Button>
                      <Button variant="outline" size="sm">
                        Info
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      ⭐
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {toolCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
            </Card>
            
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {category.tools.map((tool) => (
                <Card key={tool.name} className="glass-card hover-lift cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {tool.name}
                        </CardTitle>
                        <CardDescription>{tool.category}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(tool.status)}`} />
                        <span className="text-xs text-muted-foreground">{tool.status}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Button size="sm" className="hover-glow">
                          <Play className="w-3 h-3 mr-1" />
                          Launch
                        </Button>
                        <Button variant="outline" size="sm">
                          Info
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        ⭐
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}