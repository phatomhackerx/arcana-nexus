import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Shield, Search, Globe, Wifi, Lock, Terminal, 
  Database, Zap, Brain, Settings, Home, FolderOpen,
  ChevronRight, ChevronDown, Plus, Bot, Code, Activity, 
  Network, Key
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const toolCategories = [
  {
    id: 'overview',
    label: 'Overview',
    icon: Home,
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: Home },
      { name: 'Projects', path: '/projects', icon: FolderOpen },
      { name: 'Tools Hub', path: '/tools', icon: Terminal }
    ]
  },
  {
    id: 'osint',
    label: 'OSINT & Intelligence',
    icon: Search,
    items: [
      { name: 'Sherlock', path: '/tools/sherlock', icon: Search },
      { name: 'theHarvester', path: '/tools/theharvester', icon: Globe },
      { name: 'Maltego', path: '/tools/maltego', icon: Database },
      { name: 'Recon-ng', path: '/tools/recon-ng', icon: Search },
      { name: 'Shodan CLI', path: '/tools/shodan-cli', icon: Globe }
    ]
  },
  {
    id: 'web',
    label: 'Web Hacking',
    icon: Globe,
    items: [
      { name: 'Burp Suite', path: '/tools/burp-suite', icon: Shield },
      { name: 'SQLMap', path: '/tools/sqlmap', icon: Database },
      { name: 'OWASP ZAP', path: '/tools/owasp-zap', icon: Shield },
      { name: 'Nikto', path: '/tools/nikto', icon: Search },
      { name: 'Gobuster', path: '/tools/gobuster', icon: FolderOpen },
      { name: 'Dirb', path: '/tools/dirb', icon: Search }
    ]
  },
  {
    id: 'network',
    label: 'Network & Wireless',
    icon: Wifi,
    items: [
      { name: 'Nmap', path: '/tools/nmap', icon: Search },
      { name: 'Masscan', path: '/tools/masscan', icon: Zap },
      { name: 'Netdiscover', path: '/tools/netdiscover', icon: Wifi },
      { name: 'Aircrack-ng', path: '/tools/aircrack-ng', icon: Wifi },
      { name: 'Wifite', path: '/tools/wifite', icon: Wifi },
      { name: 'Reaver', path: '/tools/reaver', icon: Lock }
    ]
  },
  {
    id: 'exploitation',
    label: 'Exploitation',
    icon: Zap,
    items: [
      { name: 'Metasploit', path: '/tools/metasploit', icon: Terminal },
      { name: 'Searchsploit', path: '/tools/searchsploit', icon: Search },
      { name: 'BeEF', path: '/tools/beef', icon: Globe },
      { name: 'SET Toolkit', path: '/tools/set', icon: Shield }
    ]
  },
  {
    id: 'password',
    label: 'Password Attacks',
    icon: Lock,
    items: [
      { name: 'John the Ripper', path: '/tools/john', icon: Lock },
      { name: 'Hashcat', path: '/tools/hashcat', icon: Key },
      { name: 'Hydra', path: '/tools/hydra', icon: Terminal },
      { name: 'Medusa', path: '/tools/medusa', icon: Lock }
    ]
  },
  {
    id: 'sniffing',
    label: 'Sniffing & MITM',
    icon: Wifi,
    items: [
      { name: 'Wireshark', path: '/tools/wireshark', icon: Activity },
      { name: 'Bettercap', path: '/tools/bettercap', icon: Wifi },
      { name: 'Ettercap', path: '/tools/ettercap', icon: Network }
    ]
  },
  {
    id: 'forensics',
    label: 'Forensics',
    icon: Brain,
    items: [
      { name: 'Volatility', path: '/tools/volatility', icon: Brain },
      { name: 'Autopsy', path: '/tools/autopsy', icon: Search }
    ]
  },
  {
    id: 'reverse',
    label: 'Reverse Engineering',
    icon: Code,
    items: [
      { name: 'Ghidra', path: '/tools/ghidra', icon: Code },
      { name: 'Radare2', path: '/tools/radare2', icon: Terminal }
    ]
  }
];

export function MainSidebar() {
  const sidebar = useSidebar();
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['overview']);
  const [collapsed, setCollapsed] = useState(false);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (items: any[]) => items.some(item => isActive(item.path));

  return (
    <Sidebar className="glass-panel border-r border-border/30">
      <SidebarHeader className="p-4 border-b border-border/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          {sidebar.state !== 'collapsed' && (
            <div>
              <h1 className="text-xl font-bold text-primary">PhantomSEC</h1>
              <p className="text-xs text-muted-foreground">Hacker Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        {/* Quick Actions */}
        {sidebar.state !== 'collapsed' && (
          <div className="mb-6 space-y-2">
            <Button className="w-full glass-card hover-glow" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
            <Button variant="secondary" className="w-full" size="sm">
              <Terminal className="w-4 h-4 mr-2" />
              Terminal
            </Button>
          </div>
        )}

        {/* Tool Categories */}
        <div className="space-y-2">
          {toolCategories.map((category) => {
            const isExpanded = expandedGroups.includes(category.id);
            const groupActive = isGroupActive(category.items);

            return (
              <SidebarGroup key={category.id}>
                <SidebarMenuButton
                  onClick={() => sidebar.state !== 'collapsed' && toggleGroup(category.id)}
                  className={`w-full justify-between p-3 rounded-xl transition-all duration-200 ${
                    groupActive ? 'bg-primary/10 text-primary border-primary/30' : 'hover:bg-secondary/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <category.icon className="w-5 h-5" />
                    {sidebar.state !== 'collapsed' && <span className="font-medium">{category.label}</span>}
                  </div>
                  {sidebar.state !== 'collapsed' && (
                    <div className="transition-transform duration-200">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  )}
                </SidebarMenuButton>

                {isExpanded && sidebar.state !== 'collapsed' && (
                  <SidebarGroupContent className="mt-2 ml-2 space-y-1">
                    <SidebarMenu>
                      {category.items.map((item) => (
                        <SidebarMenuItem key={item.path}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.path}
                              className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                                isActive(item.path)
                                  ? 'bg-primary text-primary-foreground shadow-glow'
                                  : 'hover:bg-secondary/50 text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              <item.icon className="w-4 h-4" />
                              <span className="text-sm">{item.name}</span>
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                )}
              </SidebarGroup>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 pt-4 border-t border-border/30">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink
                  to="/ai"
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                    isActive('/ai')
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary/50'
                  }`}
                >
                  <Bot className="w-5 h-5" />
                  {sidebar.state !== 'collapsed' && <span>AI Assistant</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink
                  to="/settings"
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                    isActive('/settings')
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary/50'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  {sidebar.state !== 'collapsed' && <span>Settings</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}