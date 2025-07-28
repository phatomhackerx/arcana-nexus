import { useState } from 'react';
import { Plus, Filter, Search, Grid, List, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const projects = [
  {
    id: '1',
    name: 'Corporate Network Assessment',
    target: 'TechCorp Inc.',
    status: 'In Progress',
    progress: 65,
    priority: 'High',
    tools: ['Nmap', 'Metasploit', 'Burp Suite'],
    findings: 12,
    created: '2024-01-15',
    updated: '2024-01-20'
  },
  {
    id: '2',
    name: 'Web Application Security Review',
    target: 'app.example.com',
    status: 'Planning',
    progress: 25,
    priority: 'Medium',
    tools: ['Burp Suite', 'OWASP ZAP', 'SQLMap'],
    findings: 3,
    created: '2024-01-18',
    updated: '2024-01-18'
  },
  {
    id: '3',
    name: 'Mobile App Penetration Test',
    target: 'Android Banking App',
    status: 'Completed',
    progress: 100,
    priority: 'High',
    tools: ['MobSF', 'Frida', 'APKTool'],
    findings: 8,
    created: '2024-01-10',
    updated: '2024-01-17'
  }
];

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-500';
      case 'Planning': return 'bg-yellow-500';
      case 'Completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-500 border-red-500';
      case 'Medium': return 'text-yellow-500 border-yellow-500';
      case 'Low': return 'text-green-500 border-green-500';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your security assessments and operations</p>
        </div>
        <Button className="glass-card hover-glow">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
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

      {/* Project Views */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {projects.map((project) => (
              <Card key={project.id} className="glass-card hover-lift cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription>{project.target}</CardDescription>
                    </div>
                    <Badge variant="outline" className={getPriorityColor(project.priority)}>
                      {project.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                      <span className="text-sm font-medium">{project.status}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tools:</span>
                      <span className="font-medium">{project.tools.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Findings:</span>
                      <span className="font-medium text-red-500">{project.findings}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.tools.slice(0, 3).map((tool) => (
                      <Badge key={tool} variant="secondary" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                    {project.tools.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tools.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kanban" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Planning', 'In Progress', 'Completed'].map((status) => (
              <Card key={status} className="glass-card">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {status}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {projects
                    .filter(project => project.status === status)
                    .map((project) => (
                      <Card key={project.id} className="p-4 hover-lift cursor-pointer">
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.target}</p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className={getPriorityColor(project.priority)}>
                            {project.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {project.findings} findings
                          </span>
                        </div>
                      </Card>
                    ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Project Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={project.id} className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${getStatusColor(project.status)}`} />
                      {index < projects.length - 1 && (
                        <div className="w-0.5 h-16 bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.target}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Created: {project.created}</span>
                        <span>Updated: {project.updated}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}