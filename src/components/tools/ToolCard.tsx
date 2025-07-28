import { Play, Info, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ToolCardProps {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  status: string;
}

export function ToolCard({ name, category, icon: Icon, description, status }: ToolCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="tool-card group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-xs text-muted-foreground">{category}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            <Button size="sm" className="h-7 px-2 text-xs">
              <Play className="w-3 h-3 mr-1" />
              Launch
            </Button>
            <Button variant="outline" size="sm" className="h-7 px-2">
              <Info className="w-3 h-3" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
            <Star className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}