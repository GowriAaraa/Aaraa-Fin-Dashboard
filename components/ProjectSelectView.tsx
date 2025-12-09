import React, { useState } from 'react';
import { Project, ProjectId } from '../types';
import { PROJECTS } from '../constants';
import { GlassCard } from './ui/GlassCard';
import { ChevronRight, Building2, MapPin } from 'lucide-react';

interface ProjectSelectViewProps {
  onSelect: (projectId: ProjectId) => void;
}

export const ProjectSelectView: React.FC<ProjectSelectViewProps> = ({ onSelect }) => {
  const [selectedId, setSelectedId] = useState<ProjectId | null>(null);

  const handleSubmit = () => {
    if (selectedId) {
      onSelect(selectedId);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto animate-fade-in-up">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Select Project</h1>
        <p className="text-gray-500 text-lg">Choose an active site to view financial metrics.</p>
      </div>

      <div className="w-full grid gap-4 mb-8">
        {PROJECTS.map((project) => (
          <GlassCard
            key={project.id}
            onClick={() => setSelectedId(project.id)}
            className={`p-5 flex items-center justify-between group transition-all duration-200 ${
              selectedId === project.id 
                ? 'ring-2 ring-apple-blue bg-white' 
                : 'hover:bg-white/80'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${selectedId === project.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="w-3 h-3" />
                  {project.location}
                </div>
              </div>
            </div>
            
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              selectedId === project.id 
                ? 'border-apple-blue bg-apple-blue' 
                : 'border-gray-300'
            }`}>
              {selectedId === project.id && (
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedId}
        className={`
          w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2
          ${selectedId 
            ? 'bg-apple-dark text-white hover:bg-black transform hover:-translate-y-1 shadow-blue-500/20' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
        `}
      >
        View Dashboard
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};