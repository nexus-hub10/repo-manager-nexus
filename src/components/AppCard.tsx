
import React from "react";
import { App } from "@/types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AppCardProps {
  app: App;
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <div 
      className={cn(
        "p-4 rounded-lg border border-border bg-card flex items-center",
        "transition-all duration-300 hover:border-accent/50"
      )}
    >
      <Avatar className="h-12 w-12 mr-4">
        {app.icon ? (
          <AvatarImage src={app.icon} alt={app.name} />
        ) : (
          <AvatarFallback className="text-lg bg-accent/10 text-accent-foreground">
            {app.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg truncate">{app.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-muted-foreground">v{app.version}</span>
              {app.developer && (
                <>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground truncate">{app.developer}</span>
                </>
              )}
            </div>
          </div>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="ml-2 flex-shrink-0"
            asChild
          >
            <a href={app.downloadUrl} target="_blank" rel="noopener noreferrer">
              <Download size={16} className="mr-1" />
              Download
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppCard;
