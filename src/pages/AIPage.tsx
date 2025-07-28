import { useState } from 'react';
import { Bot, Send, Mic, Code, Shield, Search, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const aiTemplates = [
  {
    id: 'exploit',
    title: 'Exploit Analysis',
    description: 'Analyze vulnerabilities and suggest exploits',
    prompt: 'Analyze this vulnerability and suggest appropriate exploitation techniques:',
    icon: Shield
  },
  {
    id: 'payload',
    title: 'Payload Generation',
    description: 'Generate custom payloads for testing',
    prompt: 'Generate a payload for the following scenario:',
    icon: Code
  },
  {
    id: 'recon',
    title: 'Reconnaissance Planning',
    description: 'Plan information gathering strategies',
    prompt: 'Create a reconnaissance plan for this target:',
    icon: Search
  },
  {
    id: 'report',
    title: 'Report Generation',
    description: 'Generate professional security reports',
    prompt: 'Create a security assessment report based on these findings:',
    icon: FileText
  }
];

const conversations = [
  {
    id: '1',
    title: 'XSS Payload Analysis',
    preview: 'Generated custom XSS payloads for bypassing WAF...',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    title: 'Network Scan Results',
    preview: 'Analyzed Nmap scan and identified potential vulnerabilities...',
    timestamp: '5 hours ago'
  },
  {
    id: '3',
    title: 'SQL Injection Testing',
    preview: 'Crafted SQL injection payloads for authentication bypass...',
    timestamp: '1 day ago'
  }
];

export default function AIPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTemplateSelect = (template: typeof aiTemplates[0]) => {
    setSelectedTemplate(template.id);
    setInput(template.prompt + ' ');
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      // In real implementation, this would process the AI response
    }, 2000);
  };

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span>AI Security Assistant</span>
          </h1>
          <p className="text-muted-foreground">Advanced AI-powered security analysis and assistance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="glass-card">
            <Mic className="w-4 h-4 mr-2" />
            Voice Input
          </Button>
          <Button className="glass-card hover-glow">
            New Session
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Templates and History */}
        <div className="lg:col-span-1 space-y-6">
          {/* AI Templates */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">AI Templates</CardTitle>
              <CardDescription>Pre-built prompts for common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiTemplates.map((template) => (
                <Button
                  key={template.id}
                  variant={selectedTemplate === template.id ? 'default' : 'outline'}
                  className="w-full justify-start h-auto p-3"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex items-start space-x-3">
                    <template.icon className="w-4 h-4 mt-0.5 shrink-0" />
                    <div className="text-left">
                      <div className="font-medium text-sm">{template.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {template.description}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Recent Conversations */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Recent Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className="p-3 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                    >
                      <h4 className="font-medium text-sm">{conv.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {conv.preview}
                      </p>
                      <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Input Area */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">AI Assistant Interface</CardTitle>
              <CardDescription>
                Describe your security challenge or paste your data for analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe your security testing scenario, paste scan results, or ask for exploit recommendations..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-32 resize-none"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Badge variant="secondary">GPT-4</Badge>
                  <Badge variant="outline">Security Expert</Badge>
                  <Badge variant="outline">Real-time</Badge>
                </div>
                <Button 
                  onClick={handleGenerate}
                  disabled={!input.trim() || isGenerating}
                  className="hover-glow"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Generate Response
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Response Area */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">AI Response</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-64 space-y-4">
                {isGenerating ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="text-center space-y-2">
                      <div className="animate-pulse-glow w-12 h-12 rounded-full bg-gradient-primary mx-auto flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-sm text-muted-foreground">AI is analyzing your request...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-secondary/30 border border-border/30">
                      <p className="text-sm text-muted-foreground mb-2">AI Assistant:</p>
                      <p className="text-foreground">
                        Welcome to the AI Security Assistant! I'm here to help you with:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                        <li>Vulnerability analysis and exploitation techniques</li>
                        <li>Custom payload generation for various attack vectors</li>
                        <li>Security tool recommendations and configurations</li>
                        <li>Penetration testing methodology and planning</li>
                        <li>Report generation and finding documentation</li>
                      </ul>
                      <p className="mt-3 text-sm">
                        Choose a template from the sidebar or describe your security testing scenario to get started.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Scan Analysis', icon: Search },
              { name: 'Exploit DB', icon: Shield },
              { name: 'Payload Builder', icon: Code },
              { name: 'Report Helper', icon: FileText }
            ].map((action) => (
              <Button
                key={action.name}
                variant="outline"
                className="h-20 flex-col space-y-2 glass-card hover-lift"
              >
                <action.icon className="w-6 h-6" />
                <span className="text-sm">{action.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}