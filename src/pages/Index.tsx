import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Zap, Terminal, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-2 sm:gap-3">
              <Shield className="h-7 w-7 sm:h-9 sm:w-9 text-primary" />
              <span className="text-xl sm:text-2xl font-bold">PhantomSEC</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link to="/dashboard">
                <Button size="sm">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl w-full text-center space-y-8 sm:space-y-12">
        <div className="flex justify-center mb-8">
          <Shield className="h-20 w-20 sm:h-24 sm:w-24 text-primary animate-pulse-glow" />
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight">
          What do you want to{' '}
          <span className="bg-gradient-primary bg-clip-text text-transparent">hack</span>?
        </h1>

        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search tools, exploits, techniques..."
              className="w-full h-14 pl-12 pr-32 bg-card/50 border-border hover:border-primary focus:border-primary rounded-xl"
            />
            <Button size="sm" className="absolute right-3 top-1/2 -translate-y-1/2 h-8">
              <Zap className="h-4 w-4 mr-1" />Auto
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-16">
          <Link to="/tools">
            <div className="glass-card hover-lift p-6 border border-border hover:border-primary/50">
              <Terminal className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">500+ Tools</h3>
              <p className="text-sm text-muted-foreground">Professional security tools</p>
            </div>
          </Link>
          <Link to="/projects">
            <div className="glass-card hover-lift p-6 border border-border hover:border-primary/50">
              <Shield className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Projects</h3>
              <p className="text-sm text-muted-foreground">Organize operations</p>
            </div>
          </Link>
          <Link to="/ai">
            <div className="glass-card hover-lift p-6 border border-border hover:border-primary/50">
              <Zap className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
              <p className="text-sm text-muted-foreground">Intelligent recommendations</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
