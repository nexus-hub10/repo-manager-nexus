
import React, { createContext, useState, useContext, useEffect } from "react";
import { Repository, App } from "@/types";
import { toast } from "sonner";

interface RepoContextType {
  repositories: Repository[];
  selectedRepo: Repository | null;
  isLoading: boolean;
  addRepository: (url: string) => Promise<void>;
  deleteRepository: (id: string) => void;
  selectRepository: (id: string | null) => void;
}

const RepoContext = createContext<RepoContextType | undefined>(undefined);

export const useRepoContext = () => {
  const context = useContext(RepoContext);
  if (!context) {
    throw new Error("useRepoContext must be used within a RepoProvider");
  }
  return context;
};

export const RepoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load repositories from localStorage on mount
  useEffect(() => {
    const savedRepos = localStorage.getItem("repositories");
    if (savedRepos) {
      try {
        const parsedRepos = JSON.parse(savedRepos);
        setRepositories(parsedRepos);
      } catch (error) {
        console.error("Failed to parse repositories from localStorage", error);
      }
    }
  }, []);

  // Save repositories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("repositories", JSON.stringify(repositories));
  }, [repositories]);

  const addRepository = async (url: string) => {
    setIsLoading(true);
    try {
      // Check if repository already exists
      if (repositories.some((repo) => repo.url === url)) {
        toast.error("Repository already exists");
        setIsLoading(false);
        return;
      }

      // Use CORS proxy if needed
      const proxyUrl = url.startsWith('http') ? `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}` : url;
      
      // Fetch repository data
      console.log("Fetching from:", proxyUrl);
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch repository: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Repository data:", data);
      
      // Extract repo name from the url or data
      const urlObj = new URL(url);
      const hostName = urlObj.hostname.split('.').slice(-2, -1)[0]; // Extract domain name without TLD
      const repoName = data.repoName || data.name || `${hostName.charAt(0).toUpperCase() + hostName.slice(1)} Repo`;
      
      // Extract apps from the repository data
      let apps: App[] = [];
      
      if (Array.isArray(data)) {
        // If data is directly an array of apps
        apps = data.map((app: any) => ({
          name: app.name || app.nome || "Unknown App",
          version: app.version || app.versione || "0.0.0",
          developer: app.developer || app.sviluppatore || undefined,
          downloadUrl: app.downloadUrl || app.download || app.link || "",
          bundleId: app.bundleId || app.bundle_id || undefined,
          icon: app.icon || undefined
        }));
      } else if (data.apps && Array.isArray(data.apps)) {
        // If data has an "apps" property that is an array
        apps = data.apps.map((app: any) => ({
          name: app.name || app.nome || "Unknown App",
          version: app.version || app.versione || "0.0.0",
          developer: app.developer || app.sviluppatore || undefined,
          downloadUrl: app.downloadUrl || app.download || app.link || "",
          bundleId: app.bundleId || app.bundle_id || undefined,
          icon: app.icon || undefined
        }));
      } else {
        // Try to find any array property that might contain apps
        const possibleArrayProps = Object.keys(data).filter(key => Array.isArray(data[key]));
        
        if (possibleArrayProps.length > 0) {
          // Use the first array found
          const arrayProp = possibleArrayProps[0];
          apps = data[arrayProp].map((app: any) => ({
            name: app.name || app.nome || "Unknown App",
            version: app.version || app.versione || "0.0.0",
            developer: app.developer || app.sviluppatore || undefined,
            downloadUrl: app.downloadUrl || app.download || app.link || "",
            bundleId: app.bundleId || app.bundle_id || undefined,
            icon: app.icon || undefined
          }));
        }
      }

      const newRepo: Repository = {
        id: Date.now().toString(),
        name: repoName,
        url,
        apps
      };

      console.log("New repository:", newRepo);
      setRepositories((prevRepos) => [...prevRepos, newRepo]);
      toast.success("Repository added successfully");
    } catch (error) {
      console.error("Error adding repository:", error);
      toast.error("Failed to add repository. Please check the URL and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRepository = (id: string) => {
    setRepositories((prevRepos) => prevRepos.filter((repo) => repo.id !== id));
    
    // If the deleted repo was selected, clear the selection
    if (selectedRepo && selectedRepo.id === id) {
      setSelectedRepo(null);
    }
    
    toast.success("Repository deleted successfully");
  };

  const selectRepository = (id: string | null) => {
    if (id === null) {
      setSelectedRepo(null);
      return;
    }
    
    const repo = repositories.find((r) => r.id === id) || null;
    setSelectedRepo(repo);
  };

  return (
    <RepoContext.Provider
      value={{
        repositories,
        selectedRepo,
        isLoading,
        addRepository,
        deleteRepository,
        selectRepository
      }}
    >
      {children}
    </RepoContext.Provider>
  );
};
