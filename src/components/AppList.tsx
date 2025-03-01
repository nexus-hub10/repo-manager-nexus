
import React from "react";
import { Repository } from "@/types";
import AppCard from "./AppCard";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{repository.name}</h1>
          <p className="text-sm text-muted-foreground mt-1 truncate">{repository.url}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="destructive" size="icon" onClick={onDelete}>
            <X size={20} />
          </Button>
        </div>
      </div>
      
      <Button
        variant="outline"
        className="mb-6"
        onClick={onBack}
      >
        Back to Repositories
      </Button>
      
      <div className="space-y-4">
        {sortedApps.length === 0 ? (
          <div className="py-12 text-center">
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
