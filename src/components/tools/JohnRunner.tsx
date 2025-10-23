import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Key, Play, Square, Upload } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function JohnRunner() {
  const [hashType, setHashType] = useState('md5');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [output, setOutput] = useState('');

  const hashTypes = [
    { value: 'md5', label: 'MD5' },
    { value: 'sha1', label: 'SHA-1' },
    { value: 'sha256', label: 'SHA-256' },
    { value: 'ntlm', label: 'NTLM' },
    { value: 'bcrypt', label: 'bcrypt' },
  ];

  const startCrack = () => {
    setIsRunning(true);
    setProgress(0);
    setOutput('');

    const lines = [
      `John the Ripper 1.9.0`,
      `Loaded 3 password hashes with 3 different salts (${hashType})`,
      `Press 'q' or Ctrl-C to abort, almost any other key for status`,
      ``,
      `0g 0:00:00:05  0g/s 2456p/s 2456c/s 2456C/s 123456..password`,
      `password123      (user1)`,
      `0g 0:00:00:12  0g/s 2398p/s 2398c/s 2398C/s qwerty..admin`,
      `letmein          (user2)`,
      `0g 0:00:00:18  0g/s 2341p/s 2341c/s 2341C/s welcome..dragon`,
      ``,
      `Session completed`,
      `2 password hashes cracked, 1 left`
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setOutput(prev => prev + lines[currentLine] + '\n');
        setProgress(((currentLine + 1) / lines.length) * 100);
        currentLine++;
      } else {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Key className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">John the Ripper</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Password hash cracker</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Password Attacks</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium">Hash Type</label>
          <Select value={hashType} onValueChange={setHashType} disabled={isRunning}>
            <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
            <SelectContent>{hashTypes.map(h => <SelectItem key={h.value} value={h.value}>{h.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" disabled={isRunning} className="flex-1 sm:flex-none">
            <Upload className="h-4 w-4 mr-2" />Hash File
          </Button>
          <Button size="sm" variant="outline" disabled={isRunning} className="flex-1 sm:flex-none">
            <Upload className="h-4 w-4 mr-2" />Wordlist
          </Button>
        </div>

        {!isRunning ? (
          <Button onClick={startCrack} size="sm" className="w-full">
            <Play className="h-4 w-4 mr-2" />Start Cracking
          </Button>
        ) : (
          <Button onClick={() => setIsRunning(false)} size="sm" variant="destructive" className="w-full">
            <Square className="h-4 w-4 mr-2" />Stop
          </Button>
        )}

        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Cracking hashes...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>

      <div className="flex-1 p-3 sm:p-4">
        <div className="h-full bg-muted/20 rounded-lg p-3 font-mono text-xs overflow-auto border border-border">
          <pre className="whitespace-pre-wrap text-foreground">
            {output || 'Ready to crack... Upload hash file and wordlist to begin.'}
            {isRunning && <span className="animate-pulse">█</span>}
          </pre>
        </div>
      </div>
    </div>
  );
}