import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Shield, Search, Globe, Wifi, Lock, Terminal, 
  Database, Zap, Brain, Settings, Home, FolderOpen,
  ChevronRight, ChevronDown, Plus, Bot
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
      { name: 'Dashboard', path: '/', icon: Home },
      { name: 'Projects', path: '/projects', icon: FolderOpen },
      { name: 'Recent Tools', path: '/recent', icon: Zap }
    ]
  },
  {
    id: 'osint',
    label: 'OSINT & Intelligence',
    icon: Search,
    items: [
      { name: 'Domain Analysis', path: '/tools/osint/domains', icon: Globe },
      { name: 'Social Media', path: '/tools/osint/social', icon: Search },
      { name: 'Phone Numbers', path: '/tools/osint/phone', icon: Search },
      { name: 'Geolocation', path: '/tools/osint/geo', icon: Search }
    ]
  },
  {
    id: 'web',
    label: 'Web Hacking',
    icon: Globe,
    items: [
      { name: 'Burp Suite', path: '/tools/web/burp', icon: Shield },
      { name: 'SQLMap', path: '/tools/web/sqlmap', icon: Database },
      { name: 'XSS Hunter', path: '/tools/web/xss', icon: Zap },
      { name: 'Directory Fuzzing', path: '/tools/web/fuzz', icon: Search }
    ]
  },
  {
    id: 'network',
    label: 'Network & Wireless',
    icon: Wifi,
    items: [
      { name: 'Nmap Scanner', path: '/tools/network/nmap', icon: Search },
      { name: 'Aircrack-ng', path: '/tools/wireless/aircrack', icon: Wifi },
      { name: 'Wireshark', path: '/tools/network/wireshark', icon: Wifi },
      { name: 'Metasploit', path: '/tools/network/metasploit', icon: Zap }
    ]
  },
  {
    id: 'crypto',
    label: 'Crypto & Forensics',
    icon: Lock,
    items: [
      { name: 'Hash Cracking', path: '/tools/crypto/hash', icon: Lock },
      { name: 'Steganography', path: '/tools/crypto/stego', icon: Lock },
      { name: 'File Analysis', path: '/tools/forensics/files', icon: Search },
      { name: 'Memory Dump', path: '/tools/forensics/memory', icon: Brain }
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
    <Sidebar className={`transition-all duration-300 ${collapsed ? 'w-16' : 'w-72'} glass-panel border-r border-border/30`}>
      <SidebarHeader className="p-4 border-b border-border/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-primary">PhantomSEC</h1>
              <p className="text-xs text-muted-foreground">Hacker Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        {/* Quick Actions */}
        {!collapsed && (
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
                  onClick={() => !collapsed && toggleGroup(category.id)}
                  className={`w-full justify-between p-3 rounded-xl transition-all duration-200 ${
                    groupActive ? 'bg-primary/10 text-primary border-primary/30' : 'hover:bg-secondary/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <category.icon className="w-5 h-5" />
                    {!collapsed && <span className="font-medium">{category.label}</span>}
                  </div>
                  {!collapsed && (
                    <div className="transition-transform duration-200">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  )}
                </SidebarMenuButton>

                {isExpanded && !collapsed && (
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
                  {!collapsed && <span>AI Assistant</span>}
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
                  {!collapsed && <span>Settings</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}