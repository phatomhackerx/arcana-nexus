import { Clock, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ProjectCardProps {
  name: string;
  target: string;
  status: string;
  progress: number;
}

export function ProjectCard({ name, target, status, progress }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-500';
      case 'Planning': return 'bg-yellow-500';
      case 'Completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="hover-lift cursor-pointer">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-sm line-clamp-1">{name}</h3>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Target className="w-3 h-3" />
              <span className="line-clamp-1">{target}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
              <span className="text-xs font-medium">{status}</span>
            </div>
            <span className="text-xs text-muted-foreground">{progress}%</span>
          </div>
          
          <Progress value={progress} className="h-1" />
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>Updated 2h ago</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>Active</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}