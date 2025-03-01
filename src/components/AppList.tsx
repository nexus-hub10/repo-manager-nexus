
import React from "react";
import { Repository } from "@/types";
import AppCard from "./AppCard";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppListProps {
  repository: Repository;
  onBack: () => void;
  onDelete: () => void;
}

const AppList: React.FC<AppListProps> = ({ repository, onBack, onDelete }) => {
  // Sort apps alphabetically by name
  const sortedApps = [...repository.apps].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight truncate">{repository.name}</h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">{repository.url}</p>
          </div>
          
          <Button variant="destructive" size="icon" onClick={onDelete} className="ml-2 flex-shrink-0">
            <X size={18} />
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="mb-3 md:mb-4 w-full md:w-auto"
          onClick={onBack}
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Repositories
        </Button>
      </div>
      
      <div className="space-y-3 md:space-y-4">
        {sortedApps.length === 0 ? (
          <div className="py-8 md:py-12 text-center">
            <p className="text-muted-foreground">This repository doesn't contain any apps.</p>
          </div>
        ) : (
          sortedApps.map((app, index) => (
            <AppCard key={`${app.name}-${index}`} app={app} />
          ))
        )}
      </div>
    </div>
  );
};

export default AppList;
