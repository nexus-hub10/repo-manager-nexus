
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
  const handleDownload = () => {
    // Open the download URL in a new tab
    window.open(app.downloadUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className={cn(
        "p-3 md:p-4 rounded-lg border border-border bg-card flex items-center",
        "transition-all duration-300 hover:border-accent/50"
      )}
    >
      <Avatar className="h-10 w-10 md:h-12 md:w-12 mr-3 md:mr-4 flex-shrink-0 rounded-full overflow-hidden">
        {app.icon ? (
          <AvatarImage src={app.icon} alt={app.name} className="rounded-full object-cover" />
        ) : (
          <AvatarFallback className="text-base md:text-lg bg-accent/10 text-accent-foreground rounded-full">
            {app.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-base md:text-lg truncate">{app.name}</h3>
            <div className="flex items-center space-x-2 mt-0.5 md:mt-1">
              <span className="text-xs text-muted-foreground">v{app.version}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground truncate">{app.developer || "Unknown"}</span>
            </div>
          </div>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="ml-2 flex-shrink-0 text-xs md:text-sm"
            onClick={handleDownload}
          >
            <Download size={14} className="mr-1" />
            <span className="hidden xs:inline">Download</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppCard;
