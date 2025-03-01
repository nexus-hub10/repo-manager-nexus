
import React from "react";
import RepoManager from "@/components/RepoManager";
import { RepoProvider } from "@/context/RepoContext";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <RepoProvider>
          <RepoManager />
        </RepoProvider>
      </div>
    </div>
  );
};

export default Index;
