import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Target, MoreHorizontal } from 'lucide-react';

interface ProjectHeaderProps {
  project: {
    name: string;
    description: string;
    status: 'active' | 'completed' | 'paused';
    created: string;
    team?: string[];
  };
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'paused': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-foreground">{project.name}</h1>
              <Badge variant={getStatusVariant(project.status)}>
                {project.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{project.description}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{project.created}</span>
              </div>
              
              {project.team && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{project.team.length} members</span>
                </div>
              )}
            </div>
            
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}