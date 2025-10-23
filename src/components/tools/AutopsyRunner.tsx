import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HardDrive, Upload, Play, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

export function AutopsyRunner() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [files, setFiles] = useState<Array<{ name: string; path: string; size: string; modified: string }>>([]);
  const [artifacts, setArtifacts] = useState<string[]>([]);

  const loadImage = () => {
    setIsLoaded(true);
    setFiles([
      { name: 'document.pdf', path: '/Users/John/Documents/', size: '2.4 MB', modified: '2024-01-15' },
      { name: 'passwords.txt', path: '/Users/John/Desktop/', size: '1.2 KB', modified: '2024-01-20' },
      { name: 'secret.zip', path: '/Users/John/Downloads/', size: '45 MB', modified: '2024-01-18' },
      { name: 'history.db', path: '/Users/John/Library/Safari/', size: '512 KB', modified: '2024-01-22' },
    ]);
    setArtifacts([
      'Web History (452 entries)',
      'Recent Documents (23 files)',
      'Email Messages (156)',
      'Installed Programs (87)',
      'USB Devices (5)',
    ]);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <HardDrive className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">Autopsy</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Digital forensics platform</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Disk Analysis</Badge>
      </div>

      <div className="p-3 sm:p-4 border-b border-border space-y-3">
        {!isLoaded ? (
          <>
            <Button size="sm" variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />Load Disk Image
            </Button>
            <Button onClick={loadImage} size="sm" className="w-full">
              <Play className="h-4 w-4 mr-2" />Analyze
            </Button>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Badge variant="outline" className="justify-center py-2">macOS</Badge>
            <Badge variant="outline" className="justify-center py-2">250 GB</Badge>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-3 sm:p-4">
        {isLoaded ? (
          <Tabs defaultValue="files" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="files">Files ({files.length})</TabsTrigger>
              <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            
            <TabsContent value="files" className="space-y-2 mt-4">
              {files.map((file, i) => (
                <Card key={i} className="p-3 border border-border bg-card/50 hover:bg-primary/5 cursor-pointer transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">{file.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Path: {file.path}</div>
                      <div className="flex justify-between">
                        <span>{file.size}</span>
                        <span>Modified: {file.modified}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="artifacts" className="space-y-2 mt-4">
              {artifacts.map((artifact, i) => (
                <Card key={i} className="p-3 border border-primary/30 bg-card/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{artifact}</span>
                    <Badge variant="outline" className="text-xs">View</Badge>
                  </div>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-4">
              <p className="text-sm text-muted-foreground text-center py-8">
                File activity timeline
              </p>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">Load a disk image to start forensic analysis</p>
          </div>
        )}
      </div>
    </div>
  );
}