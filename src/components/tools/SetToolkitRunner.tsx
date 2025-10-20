import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Play, Mail, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function SetToolkitRunner() {
  const [attackType, setAttackType] = useState('');
  const [targetEmail, setTargetEmail] = useState('');
  const [templateUrl, setTemplateUrl] = useState('');

  const attacks = [
    { id: 'spear', name: 'Spear-Phishing Attack', icon: Mail, desc: 'Targeted email phishing' },
    { id: 'website', name: 'Website Attack', icon: Globe, desc: 'Clone and host phishing site' },
    { id: 'mass', name: 'Mass Mailer Attack', icon: Users, desc: 'Send emails to multiple targets' },
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">SET (Social Engineering Toolkit)</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Social engineering attack framework</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Social Engineering</Badge>
      </div>

      <Tabs defaultValue="select" className="flex-1 flex flex-col">
        <TabsList className="mx-3 sm:mx-4 mt-3 grid w-auto grid-cols-2 h-auto">
          <TabsTrigger value="select" className="text-xs px-3 py-2">Select Attack</TabsTrigger>
          <TabsTrigger value="config" className="text-xs px-3 py-2" disabled={!attackType}>Configure</TabsTrigger>
        </TabsList>

        <TabsContent value="select" className="flex-1 p-3 sm:p-4 space-y-3">
          <p className="text-sm text-muted-foreground mb-4">Select an attack vector:</p>
          <div className="grid grid-cols-1 gap-3">
            {attacks.map(attack => (
              <button
                key={attack.id}
                onClick={() => setAttackType(attack.id)}
                className={`p-4 border rounded-lg text-left transition-all ${
                  attackType === attack.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <attack.icon className={`h-6 w-6 ${attackType === attack.id ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{attack.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{attack.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="config" className="flex-1 p-3 sm:p-4 space-y-4">
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Email</label>
              <Input value={targetEmail} onChange={(e) => setTargetEmail(e.target.value)} placeholder="victim@example.com" className="h-9" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Template URL</label>
              <Input value={templateUrl} onChange={(e) => setTemplateUrl(e.target.value)} placeholder="https://example.com/login" className="h-9" />
            </div>
            <Button size="sm" className="w-full">
              <Play className="h-4 w-4 mr-2" />
              Launch Attack
            </Button>
          </div>

          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-xs text-yellow-500">
            ⚠️ Only use on authorized targets with explicit permission
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
