import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Network, Play, Square, Download, Filter } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function WiresharkRunner() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [packets, setPackets] = useState<any[]>([]);

  const mockPackets = [
    { id: 1, time: '0.000000', src: '192.168.1.10', dst: '8.8.8.8', protocol: 'DNS', length: 74, info: 'Standard query A google.com' },
    { id: 2, time: '0.001234', src: '8.8.8.8', dst: '192.168.1.10', protocol: 'DNS', length: 90, info: 'Standard query response' },
    { id: 3, time: '0.002456', src: '192.168.1.10', dst: '142.250.185.46', protocol: 'TCP', length: 66, info: '[SYN] Seq=0 Win=64240' },
    { id: 4, time: '0.025678', src: '142.250.185.46', dst: '192.168.1.10', protocol: 'TCP', length: 66, info: '[SYN, ACK] Seq=0 Ack=1' },
    { id: 5, time: '0.025890', src: '192.168.1.10', dst: '142.250.185.46', protocol: 'TCP', length: 54, info: '[ACK] Seq=1 Ack=1' },
    { id: 6, time: '0.026123', src: '192.168.1.10', dst: '142.250.185.46', protocol: 'HTTP', length: 512, info: 'GET / HTTP/1.1' },
  ];

  const startCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setPackets(mockPackets);
    }, 1000);
  };

  const stopCapture = () => {
    setIsCapturing(false);
  };

  const getProtocolColor = (protocol: string) => {
    switch (protocol) {
      case 'TCP': return 'text-blue-400';
      case 'HTTP': return 'text-green-400';
      case 'DNS': return 'text-yellow-400';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border-b border-border bg-card/30 backdrop-blur-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Network className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-foreground">Wireshark</h3>
            <p className="text-xs text-muted-foreground hidden sm:block">Network protocol analyzer</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">Sniffing</Badge>
      </div>

      {/* Controls */}
      <div className="p-3 sm:p-4 border-b border-border flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="flex gap-2 flex-1">
          {!isCapturing ? (
            <Button onClick={startCapture} size="sm" className="flex-1 sm:flex-none">
              <Play className="h-4 w-4 mr-2" />
              Start Capture
            </Button>
          ) : (
            <Button onClick={stopCapture} size="sm" variant="destructive" className="flex-1 sm:flex-none">
              <Square className="h-4 w-4 mr-2" />
              Stop Capture
            </Button>
          )}
          <Button size="sm" variant="outline" disabled={packets.length === 0} className="hidden sm:flex">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" variant="outline" disabled={packets.length === 0} className="hidden sm:flex">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
        {isCapturing && (
          <Badge variant="destructive" className="text-xs animate-pulse w-fit">
            Capturing...
          </Badge>
        )}
      </div>

      {/* Packet List */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="border-b border-border bg-muted/30 px-3 sm:px-4 py-2 grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground sticky top-0">
            <div className="col-span-1">#</div>
            <div className="col-span-2 hidden sm:block">Time</div>
            <div className="col-span-3 sm:col-span-2">Source</div>
            <div className="col-span-3 sm:col-span-2">Destination</div>
            <div className="col-span-2 sm:col-span-1">Protocol</div>
            <div className="col-span-3 sm:col-span-1 hidden sm:block">Length</div>
            <div className="col-span-3 hidden lg:block">Info</div>
          </div>

          {packets.length === 0 ? (
            <div className="p-6 sm:p-8 text-center text-sm text-muted-foreground">
              {isCapturing ? 'Capturing packets...' : 'No packets captured. Click "Start Capture" to begin.'}
            </div>
          ) : (
            packets.map(packet => (
              <div
                key={packet.id}
                className="px-3 sm:px-4 py-2 sm:py-3 grid grid-cols-12 gap-2 text-xs border-b border-border hover:bg-accent/50 cursor-pointer transition-colors"
              >
                <div className="col-span-1 text-muted-foreground">{packet.id}</div>
                <div className="col-span-2 text-muted-foreground hidden sm:block font-mono">{packet.time}</div>
                <div className="col-span-3 sm:col-span-2 text-foreground font-mono truncate">{packet.src}</div>
                <div className="col-span-3 sm:col-span-2 text-foreground font-mono truncate">{packet.dst}</div>
                <div className={`col-span-2 sm:col-span-1 font-medium ${getProtocolColor(packet.protocol)}`}>
                  {packet.protocol}
                </div>
                <div className="col-span-3 sm:col-span-1 text-muted-foreground hidden sm:block">{packet.length}</div>
                <div className="col-span-3 text-muted-foreground truncate hidden lg:block">{packet.info}</div>
              </div>
            ))
          )}
        </ScrollArea>
      </div>

      {/* Stats */}
      {packets.length > 0 && (
        <div className="p-2 sm:p-3 border-t border-border bg-card/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 sm:gap-6 text-xs">
            <span className="text-muted-foreground">
              Packets: <span className="text-foreground font-medium">{packets.length}</span>
            </span>
            <span className="text-muted-foreground hidden sm:inline">
              Displayed: <span className="text-foreground font-medium">{packets.length}</span>
            </span>
            <span className="text-muted-foreground hidden sm:inline">
              Marked: <span className="text-foreground font-medium">0</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
