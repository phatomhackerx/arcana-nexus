import { useState } from 'react';
import { 
  Shield, Search, Globe, Wifi, Lock, Terminal, 
  Database, Zap, Brain, Plus, Activity, Clock,
  TrendingUp, AlertTriangle, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ToolCard } from '@/components/tools/ToolCard';
import { ProjectCard } from '@/components/projects/ProjectCard';

const recentTools = [
  { name: 'Nmap Scanner', category: 'Network', icon: Search, lastUsed: '2 hours ago', status: 'active' },
  { name: 'Burp Suite', category: 'Web', icon: Globe, lastUsed: '4 hours ago', status: 'idle' },
  { name: 'Metasploit', category: 'Exploit', icon: Zap, lastUsed: '1 day ago', status: 'idle' },
  { name: 'Wireshark', category: 'Network', icon: Wifi, lastUsed: '2 days ago', status: 'idle' }
];

const recentProjects = [
  { name: 'Web App Pentest', target: 'example.com', status: 'In Progress', progress: 75 },
  { name: 'Network Recon', target: '192.168.1.0/24', status: 'Planning', progress: 25 },
  { name: 'Mobile App Analysis', target: 'Android APK', status: 'Completed', progress: 100 }
];

const stats = [
  { label: 'Active Projects', value: '3', icon: Activity, trend: '+2 this week' },
  { label: 'Tools Available', value: '47', icon: Terminal, trend: '+5 new tools' },
  { label: 'Vulnerabilities Found', value: '23', icon: AlertTriangle, trend: '+8 this month' },
  { label: 'Success Rate', value: '94%', icon: TrendingUp, trend: '+3% improved' }
];

export default function Dashboard() {
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  });

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {greeting}, Phantom
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Ready to explore the digital realm?
          </p>
        </div>
        <div className="flex space-x-3">
          <Button className="glass-card hover-glow">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
          <Button variant="secondary" className="glass-card">
            <Terminal className="w-4 h-4 mr-2" />
            Terminal
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.label} className="glass-card hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                  <p className="text-xs text-primary mt-1">
                    {stat.trend}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tools */}
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Terminal className="w-5 h-5" />
                    <span>Recent Tools</span>
                  </CardTitle>
                  <CardDescription>
                    Your most recently used security tools
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentTools.map((tool) => (
                  <ToolCard
                    key={tool.name}
                    name={tool.name}
                    category={tool.category}
                    icon={tool.icon}
                    description={`Last used ${tool.lastUsed}`}
                    status={tool.status}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Projects */}
        <div>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Active Projects</span>
              </CardTitle>
              <CardDescription>
                Current security assessments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentProjects.map((project) => (
                <ProjectCard
                  key={project.name}
                  name={project.name}
                  target={project.target}
                  status={project.status}
                  progress={project.progress}
                />
              ))}
              <Button 
                variant="outline" 
                className="w-full mt-4"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>
            Common tasks and tool shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Port Scan', icon: Search, color: 'bg-blue-500' },
              { name: 'Web Fuzz', icon: Globe, color: 'bg-green-500' },
              { name: 'SQL Inject', icon: Database, color: 'bg-red-500' },
              { name: 'WiFi Crack', icon: Wifi, color: 'bg-purple-500' },
              { name: 'Hash Crack', icon: Lock, color: 'bg-yellow-500' },
              { name: 'AI Assist', icon: Brain, color: 'bg-pink-500' }
            ].map((action) => (
              <Button
                key={action.name}
                variant="outline"
                className="h-20 flex-col space-y-2 hover-lift"
              >
                <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs">{action.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}