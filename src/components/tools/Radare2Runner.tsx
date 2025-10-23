import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Binary, Play, Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Radare2Runner() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [disassembly, setDisassembly] = useState<string[]>([]);
  const [strings, setStrings] = useState<string[]>([]);

  const loadBinary = () => {
    setIsLoaded(true);
    setDisassembly([
      '0x00401000    push    rbp',
      '0x00401001    mov     rbp, rsp',
      '0x00401004    sub     rsp, 0x20',
      '0x00401008    mov     dword [rbp-0x4], edi',
      '0x0040100b    lea     rdi, [str.Hello_World]',
      '0x00401012    call    puts',
      '0x00401017    xor     eax, eax',
      '0x00401019    leave',
      '0x0040101a    ret',
    ]);
    setStrings([
      'Hello World',
      '/lib64/ld-linux-x86-64.so.2',
      'libc.so.6',
      '__libc_start_main',
      'puts',
    ]);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Binary className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Radare2</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Reverse engineering framework</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Reverse Engineering</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        {!isLoaded ? (
          <>
            <Button size="sm" variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />Select Binary
            </Button>
            <Button onClick={loadBinary} size="sm" className="w-full">
              <Play className="h-4 w-4 mr-2" />Analyze
            </Button>
          </>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <Badge variant="outline" className="justify-center py-2">ELF64</Badge>
            <Badge variant="outline" className="justify-center py-2">x86-64</Badge>
            <Badge variant="outline" className="justify-center py-2">Stripped</Badge>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-3 sm:p-4">
        {isLoaded ? (
          <Tabs defaultValue="disasm" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="disasm">Disasm</TabsTrigger>
              <TabsTrigger value="strings">Strings</TabsTrigger>
              <TabsTrigger value="functions">Functions</TabsTrigger>
              <TabsTrigger value="graph">Graph</TabsTrigger>
            </TabsList>
            
            <TabsContent value="disasm" className="mt-4">
              <div className="space-y-1 font-mono text-xs">
                {disassembly.map((line, i) => (
                  <div key={i} className="p-2 bg-muted/20 rounded hover:bg-muted/30 cursor-pointer">
                    {line}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="strings" className="mt-4">
              <div className="space-y-1 font-mono text-xs">
                {strings.map((str, i) => (
                  <div key={i} className="p-2 bg-muted/20 rounded">
                    {str}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="functions" className="mt-4">
              <div className="space-y-2">
                {['main', 'init', 'fini', 'libc_start_main'].map(fn => (
                  <div key={fn} className="p-3 bg-muted/20 rounded border border-border font-mono text-sm">
                    {fn}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="graph" className="mt-4">
              <p className="text-sm text-muted-foreground text-center py-8">
                Control flow graph view
              </p>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">Load a binary to start analysis</p>
          </div>
        )}
      </div>
    </div>
  );
}