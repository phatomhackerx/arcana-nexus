import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code2, Upload, Play, FileCode } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

export function GhidraRunner() {
  const [selectedFile, setSelectedFile] = useState('');
  const [decompiled, setDecompiled] = useState('');

  const mockFunctions = [
    { addr: '0x00401000', name: 'main', size: 256 },
    { addr: '0x00401100', name: 'authenticate', size: 128 },
    { addr: '0x00401180', name: 'validate_input', size: 96 },
    { addr: '0x004011e0', name: 'process_data', size: 192 },
  ];

  const mockDecompiled = `
int main(int argc, char** argv) {
    char username[64];
    char password[64];
    
    printf("Enter username: ");
    scanf("%s", username);
    
    printf("Enter password: ");
    scanf("%s", password);
    
    if (authenticate(username, password) == 0) {
        printf("Authentication failed\\n");
        return 1;
    }
    
    printf("Access granted\\n");
    process_data(username);
    
    return 0;
}

int authenticate(char* user, char* pass) {
    // Vulnerable: hardcoded credentials
    if (strcmp(user, "admin") == 0 && 
        strcmp(pass, "password123") == 0) {
        return 1;
    }
    return 0;
}
  `.trim();

  const loadFile = () => {
    setSelectedFile('sample_binary.exe');
    setDecompiled(mockDecompiled);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-foreground">Ghidra</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Software reverse engineering suite (NSA)</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Reverse Engineering</Badge>
      </div>

      {/* Toolbar */}
      <div className="p-3 sm:p-4 border-b border-border flex flex-wrap gap-2">
        <Button onClick={loadFile} size="sm" variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Load Binary</span>
          <span className="sm:hidden">Load</span>
        </Button>
        <Button size="sm" variant="outline" disabled={!selectedFile}>
          <Play className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Auto Analyze</span>
          <span className="sm:hidden">Analyze</span>
        </Button>
        <Button size="sm" variant="outline" disabled={!selectedFile}>
          <FileCode className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Export</span>
        </Button>
        
        {selectedFile && (
          <Badge variant="secondary" className="ml-auto text-xs">
            {selectedFile}
          </Badge>
        )}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="decompiler" className="flex-1 flex flex-col">
        <TabsList className="mx-3 sm:mx-4 mt-3 grid w-auto grid-cols-3 h-auto">
          <TabsTrigger value="functions" className="text-xs px-2 py-2">Functions</TabsTrigger>
          <TabsTrigger value="decompiler" className="text-xs px-2 py-2">Decompiler</TabsTrigger>
          <TabsTrigger value="assembly" className="text-xs px-2 py-2">Assembly</TabsTrigger>
        </TabsList>

        <TabsContent value="functions" className="flex-1 p-3 sm:p-4 overflow-auto">
          {!selectedFile ? (
            <div className="text-center text-muted-foreground py-8">
              <Code2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Load a binary file to see functions</p>
            </div>
          ) : (
            <ScrollArea className="h-full">
              <div className="space-y-1">
                <div className="grid grid-cols-3 gap-2 px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/30 rounded-t-lg">
                  <span>Address</span>
                  <span>Function</span>
                  <span className="hidden sm:block">Size</span>
                </div>
                {mockFunctions.map((func, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-3 gap-2 px-3 py-2 text-xs border border-border rounded-lg hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <span className="font-mono text-muted-foreground">{func.addr}</span>
                    <span className="text-foreground font-medium">{func.name}</span>
                    <span className="text-muted-foreground hidden sm:block">{func.size}B</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>

        <TabsContent value="decompiler" className="flex-1 p-3 sm:p-4 overflow-hidden">
          {!decompiled ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <FileCode className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Select a function to decompile</p>
              </div>
            </div>
          ) : (
            <div className="h-full bg-muted/20 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-auto border border-border">
              <pre className="text-foreground">
                <code>{decompiled}</code>
              </pre>
            </div>
          )}
        </TabsContent>

        <TabsContent value="assembly" className="flex-1 p-3 sm:p-4 overflow-auto">
          <div className="h-full bg-muted/20 rounded-lg p-3 sm:p-4 font-mono text-xs overflow-auto border border-border">
            <pre className="text-foreground">
              {!selectedFile ? (
                <span className="text-muted-foreground">Load a binary to see assembly code...</span>
              ) : (
                `
00401000  push    ebp
00401001  mov     ebp, esp
00401003  sub     esp, 0x80
00401009  push    offset aEnterUsername  ; "Enter username: "
0040100e  call    printf
00401013  add     esp, 4
00401016  lea     eax, [ebp-0x40]
00401019  push    eax
0040101a  push    offset aS              ; "%s"
0040101f  call    scanf
00401024  add     esp, 8
                `.trim()
              )}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
