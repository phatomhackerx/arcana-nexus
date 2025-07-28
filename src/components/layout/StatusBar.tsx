import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Wifi, Shield, Cpu, Clock } from 'lucide-react';

export function StatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-6 bg-card/80 backdrop-blur-sm border-t border-border px-4 flex items-center justify-between text-xs">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Activity className="h-3 w-3 text-success" />
          <span className="text-muted-foreground">System: Online</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Shield className="h-3 w-3 text-warning" />
          <span className="text-muted-foreground">Security: Protected</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Cpu className="h-3 w-3 text-primary" />
          <span className="text-muted-foreground">CPU: 45%</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Badge variant="secondary" className="h-4 text-xs">
          3 tools running
        </Badge>
        
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span className="text-muted-foreground">{currentTime}</span>
        </div>
      </div>
    </div>
  );
}