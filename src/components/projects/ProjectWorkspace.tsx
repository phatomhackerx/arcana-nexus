import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToolRunner } from '../tools/ToolRunner';
import { Plus, Grid3X3, List, Target, Clock, Users } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'paused';
  tools: string[];
  timeline: {
    created: string;
    deadline?: string;
  };
}

interface ProjectWorkspaceProps {
  project: Project;
}

export function ProjectWorkspace({ project }: ProjectWorkspaceProps) {
  const [activeTools, setActiveTools] = useState<any[]>([]);
  const [view, setView] = useState<'overview' | 'tools' | 'timeline'>('overview');

  const availableTools = [
    { id: 'nmap', name: 'Nmap', category: 'Network Scanning', command: 'nmap -sV -sC target.com' },
    { id: 'dirb', name: 'Dirb', category: 'Web Scanning', command: 'dirb http://target.com' },
    { id: 'sqlmap', name: 'SQLMap', category: 'SQL Injection', command: 'sqlmap -u "http://target.com/page?id=1"' },
    { id: 'nikto', name: 'Nikto', category: 'Web Vulnerability', command: 'nikto -h http://target.com' },
    { id: 'hydra', name: 'Hydra', category: 'Brute Force', command: 'hydra -l admin -P passwords.txt target.com ssh' }
  ];

  const addTool = (tool: any) => {
    setActiveTools(prev => [...prev, { ...tool, id: `${tool.id}_${Date.now()}` }]);
  };

  const removeTool = (toolId: string) => {
    setActiveTools(prev => prev.filter(t => t.id !== toolId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-white';
      case 'completed': return 'bg-muted text-muted-foreground';
      case 'paused': return 'bg-warning text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Project Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{project.name}</h1>
            <p className="text-muted-foreground mt-1">{project.description}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {project.timeline.created}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        {/* Tools Sidebar */}
        <div className="w-80 border-r border-border bg-muted/20">
          <div className="p-4 border-b border-border">
            <h3 className="font-medium text-foreground mb-3">Available Tools</h3>
            <ScrollArea className="h-80">
              <div className="space-y-2">
                {availableTools.map((tool) => (
                  <Card key={tool.id} className="p-3 cursor-pointer hover:bg-accent/50" onClick={() => addTool(tool)}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{tool.name}</div>
                        <div className="text-xs text-muted-foreground">{tool.category}</div>
                      </div>
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Active Tools */}
          <div className="p-4">
            <h3 className="font-medium text-foreground mb-3">
              Active Tools ({activeTools.length})
            </h3>
            <div className="space-y-1">
              {activeTools.map((tool) => (
                <div key={tool.id} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                  <span className="text-sm">{tool.name}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeTool(tool.id)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 p-6">
          <Tabs value={view} onValueChange={(v: any) => setView(v)}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">
                <Target className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="tools">
                <Grid3X3 className="h-4 w-4 mr-2" />
                Tools ({activeTools.length})
              </TabsTrigger>
              <TabsTrigger value="timeline">
                <Clock className="h-4 w-4 mr-2" />
                Timeline
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="text-2xl font-bold text-foreground">{activeTools.length}</div>
                  <div className="text-sm text-muted-foreground">Active Tools</div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold text-success">5</div>
                  <div className="text-sm text-muted-foreground">Vulnerabilities Found</div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold text-warning">3</div>
                  <div className="text-sm text-muted-foreground">Hosts Scanned</div>
                </Card>
              </div>
              
              <Card className="p-6">
                <h3 className="font-medium mb-4">Project Notes</h3>
                <div className="bg-muted/30 rounded p-4 font-mono text-sm">
                  <p>Target: example.com</p>
                  <p>Scope: Web application penetration test</p>
                  <p>Findings: SQL injection on login page, XSS on contact form</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="tools">
              <div className="grid grid-cols-2 gap-4 h-[600px]">
                {activeTools.slice(0, 4).map((tool, index) => (
                  <ToolRunner
                    key={tool.id}
                    tool={tool}
                    onClose={() => removeTool(tool.id)}
                  />
                ))}
                
                {activeTools.length === 0 && (
                  <div className="col-span-2 flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Grid3X3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No tools active. Add tools from the sidebar to get started.</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="timeline">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <div>
                      <div className="font-medium">Project Created</div>
                      <div className="text-sm text-muted-foreground">{project.timeline.created}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <div>
                      <div className="font-medium">Initial Scan Started</div>
                      <div className="text-sm text-muted-foreground">2 hours ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <div>
                      <div className="font-medium">Vulnerabilities Identified</div>
                      <div className="text-sm text-muted-foreground">1 hour ago</div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}