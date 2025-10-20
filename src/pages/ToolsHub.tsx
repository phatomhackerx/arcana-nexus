import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Grid, List, Terminal, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toolsDatabase, categories } from '@/data/tools';

export default function ToolsHub() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredTools = toolsDatabase.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
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
      <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 h-auto">
          <TabsTrigger value="all" className="text-xs px-2 py-2">All</TabsTrigger>
          {categories.map(cat => (
            <TabsTrigger key={cat} value={cat} className="text-xs px-2 py-2">
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-6 mt-6">
          <div className={`grid gap-4 sm:gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredTools.map((tool) => (
              <Card 
                key={tool.id} 
                className="glass-card hover-lift cursor-pointer group border border-border hover:border-primary/50 transition-all"
                onClick={() => navigate(`/tools/${tool.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors truncate">
                        {tool.name}
                      </CardTitle>
                      <CardDescription className="flex flex-wrap items-center gap-2 text-xs">
                        <Badge variant="secondary" className="text-xs">
                          {tool.subcategory}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            tool.difficulty === 'beginner' ? 'border-success text-success' :
                            tool.difficulty === 'intermediate' ? 'border-warning text-warning' :
                            'border-destructive text-destructive'
                          }`}
                        >
                          {tool.difficulty}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    {tool.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {tool.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button size="sm" className="w-full group-hover:shadow-glow">
                    <Play className="w-3 h-3 mr-2" />
                    Launch
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <Terminal className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
              <p className="text-muted-foreground">No tools found matching your criteria</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}