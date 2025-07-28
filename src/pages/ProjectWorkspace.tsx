import { useState } from 'react';
import { ProjectWorkspace } from '@/components/projects/ProjectWorkspace';
import { ProjectHeader } from '@/components/layout/ProjectHeader';

const mockProject = {
  id: 'proj_001',
  name: 'Web App Penetration Test',
  description: 'Comprehensive security assessment of e-commerce platform',
  status: 'active' as const,
  tools: ['nmap', 'burp-suite', 'sqlmap'],
  timeline: {
    created: '2024-01-15',
    deadline: '2024-02-15'
  },
  team: ['john.doe', 'jane.smith']
};

export default function ProjectWorkspacePage() {
  return (
    <div className="h-full flex flex-col">
      <ProjectHeader 
        project={{
          name: mockProject.name,
          description: mockProject.description,
          status: mockProject.status,
          created: mockProject.timeline.created,
          team: mockProject.team
        }} 
      />
      <div className="flex-1">
        <ProjectWorkspace project={mockProject} />
      </div>
    </div>
  );
}