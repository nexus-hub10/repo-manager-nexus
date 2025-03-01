
import React, { useState } from "react";
import { useRepoContext } from "@/context/RepoContext";
import RepoCard from "./RepoCard";
import AppList from "./AppList";
import AddRepoDialog from "./AddRepoDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const RepoManager: React.FC = () => {
  const { repositories, selectedRepo, selectRepository, deleteRepository } = useRepoContext();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-2 md:p-6">
      {selectedRepo ? (
        // App list view for the selected repository
        <AppList 
          repository={selectedRepo}
          onBack={() => selectRepository(null)}
          onDelete={() => deleteRepository(selectedRepo.id)}
        />
      ) : (
        // Repository list view
        <>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Repositories</h1>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="rounded-full"
              size="icon"
            >
              <Plus size={20} />
            </Button>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            {repositories.length === 0 ? (
              <div className="py-10 md:py-16 text-center">
                <p className="text-muted-foreground mb-4">No repositories added yet.</p>
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className={cn(
                    "animate-pulse transition-all",
                    "hover:animate-none"
                  )}
                >
                  <Plus size={16} className="mr-1" />
                  Add Repository
                </Button>
              </div>
            ) : (
              repositories.map((repo) => (
                <RepoCard
                  key={repo.id}
                  repo={repo}
                  onSelect={() => selectRepository(repo.id)}
                  onDelete={() => deleteRepository(repo.id)}
                />
              ))
            )}
          </div>
          
          <AddRepoDialog 
            open={isAddDialogOpen} 
            onOpenChange={setIsAddDialogOpen} 
          />
        </>
      )}
    </div>
  );
};

export default RepoManager;
