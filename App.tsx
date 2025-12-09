import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ProjectSelectView } from './components/ProjectSelectView';
import { DashboardView } from './components/DashboardView';
import { Project, ProjectId } from './types';
import { PROJECTS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'SELECT' | 'DASHBOARD'>('SELECT');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectSelect = (projectId: ProjectId) => {
    const project = PROJECTS.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setCurrentView('DASHBOARD');
      // Scroll to top
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setSelectedProject(null);
    setCurrentView('SELECT');
  };

  return (
    <Layout>
      {currentView === 'SELECT' && (
        <ProjectSelectView onSelect={handleProjectSelect} />
      )}
      
      {currentView === 'DASHBOARD' && selectedProject && (
        <DashboardView 
          project={selectedProject} 
          onBack={handleBack} 
        />
      )}
    </Layout>
  );
};

export default App;