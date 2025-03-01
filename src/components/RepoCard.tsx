
import React from "react";
import { Repository } from "@/types";
import Swipeable from "./Swipeable";
import { cn } from "@/lib/utils";

interface RepoCardProps {
  repo: Repository;
  onSelect: () => void;
  onDelete: () => void;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, onSelect, onDelete }) => {
  return (
    <Swipeable onDelete={onDelete}>
      <div
        className={cn(
          "p-6 rounded-lg border border-border bg-card cursor-pointer",
          "hover:border-accent/50 hover:shadow-md transition-all duration-300",
          "hover:translate-y-[-2px]"
        )}
        onClick={onSelect}
      >
        <h2 className="text-2xl font-semibold mb-2 tracking-tight">{repo.name}</h2>
        <p className="text-sm text-muted-foreground truncate mb-2">{repo.url}</p>
        <div className="flex items-center mt-4">
          <div className="bg-secondary inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
            {repo.apps.length} {repo.apps.length === 1 ? "app" : "apps"}
          </div>
        </div>
      </div>
    </Swipeable>
  );
};

export default RepoCard;
