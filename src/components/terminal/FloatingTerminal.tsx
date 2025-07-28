import { useState, useRef, useEffect } from 'react';
import { Terminal, X, Maximize2, Minimize2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

interface FloatingTerminalProps {
  onClose: () => void;
}

export function FloatingTerminal({ onClose }: FloatingTerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'output',
      content: 'PhantomSEC Terminal v1.0.0',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'output',
      content: 'Type "help" for available commands.',
      timestamp: new Date()
    }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  help        - Show this help message',
      '  clear       - Clear terminal',
      '  nmap        - Network mapper simulation',
      '  whoami      - Current user info',
      '  pwd         - Print working directory',
      '  ls          - List directory contents',
      '  ping        - Ping a host',
      '  netstat     - Network statistics'
    ],
    clear: () => {
      setLines([]);
      return [];
    },
    nmap: () => [
      'Starting Nmap scan...',
      'Nmap scan report for target.local (192.168.1.100)',
      'Host is up (0.00050s latency).',
      'PORT     STATE SERVICE',
      '22/tcp   open  ssh',
      '80/tcp   open  http',
      '443/tcp  open  https',
      '3389/tcp open  ms-wbt-server',
      '',
      'Nmap done: 1 IP address (1 host up) scanned in 2.34 seconds'
    ],
    whoami: () => ['phantom'],
    pwd: () => ['/home/phantom/tools'],
    ls: () => [
      'burp-suite/',
      'metasploit/',
      'nmap/',
      'wireshark/',
      'aircrack-ng/',
      'sqlmap/',
      'payloads/',
      'scripts/'
    ],
    ping: () => [
      'PING google.com (142.250.191.14): 56 data bytes',
      '64 bytes from 142.250.191.14: icmp_seq=0 ttl=115 time=15.123 ms',
      '64 bytes from 142.250.191.14: icmp_seq=1 ttl=115 time=14.876 ms',
      '64 bytes from 142.250.191.14: icmp_seq=2 ttl=115 time=15.234 ms',
      '',
      '--- google.com ping statistics ---',
      '3 packets transmitted, 3 packets received, 0.0% packet loss'
    ],
    netstat: () => [
      'Active Internet connections',
      'Proto  Local Address      Foreign Address    State',
      'tcp    127.0.0.1:8080     0.0.0.0:*          LISTEN',
      'tcp    127.0.0.1:3000     0.0.0.0:*          LISTEN',
      'tcp    0.0.0.0:22         0.0.0.0:*          LISTEN',
      'tcp    0.0.0.0:80         0.0.0.0:*          LISTEN'
    ]
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add command to history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Add command line
    const commandLine: TerminalLine = {
      id: Date.now().toString(),
      type: 'command',
      content: `phantom@phantomsec:~$ ${trimmedCmd}`,
      timestamp: new Date()
    };

    setLines(prev => [...prev, commandLine]);

    // Execute command
    const baseCmd = trimmedCmd.split(' ')[0];
    const commandFn = commands[baseCmd as keyof typeof commands];
    
    if (commandFn) {
      const output = commandFn();
      if (output.length > 0) {
        const outputLines: TerminalLine[] = output.map((line, index) => ({
          id: `${Date.now()}_${index}`,
          type: 'output',
          content: line,
          timestamp: new Date()
        }));
        setLines(prev => [...prev, ...outputLines]);
      }
    } else {
      const errorLine: TerminalLine = {
        id: `${Date.now()}_error`,
        type: 'error',
        content: `Command not found: ${baseCmd}`,
        timestamp: new Date()
      };
      setLines(prev => [...prev, errorLine]);
    }

    setCurrentCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className={`floating-panel transition-all duration-300 ${
      isMinimized ? 'w-96 h-12' : 'w-[600px] h-[400px]'
    }`} style={{ top: '20%', left: '30%' }}>
      <div className="glass-card h-full flex flex-col bg-black/90">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-border/30 bg-black/50">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-sm font-mono text-green-400">Terminal</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-6 h-6 hover:bg-white/10"
            >
              {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-6 h-6 hover:bg-white/10"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Terminal Content */}
            <ScrollArea className="flex-1 p-4 font-mono text-sm" ref={scrollRef}>
              <div className="space-y-1">
                {lines.map((line) => (
                  <div
                    key={line.id}
                    className={`${
                      line.type === 'command'
                        ? 'text-white'
                        : line.type === 'error'
                        ? 'text-red-400'
                        : 'text-green-300'
                    }`}
                  >
                    {line.content}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border/30 bg-black/50">
              <div className="flex items-center space-x-2">
                <span className="text-green-400 font-mono text-sm">phantom@phantomsec:~$</span>
                <Input
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none focus:ring-0 font-mono text-sm text-white placeholder-gray-500"
                  placeholder="Enter command..."
                  autoFocus
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}