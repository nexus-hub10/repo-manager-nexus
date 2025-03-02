
import React from "react";
import RepoManager from "@/components/RepoManager";
import { RepoProvider } from "@/context/RepoContext";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <div className="container mx-auto px-2 py-4 md:px-4 md:py-8">
        <RepoProvider>
          <RepoManager />
        </RepoProvider>
      </div>
    </div>
  );
};

export default Index;
