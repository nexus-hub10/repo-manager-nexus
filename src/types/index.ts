
export interface App {
  name: string;
  version: string;
  developer?: string;
  downloadUrl: string;
  bundleId?: string;
  icon?: string;
}

export interface Repository {
  id: string;
  name: string;
  url: string;
  apps: App[];
}

export interface SwipeableProps {
  onDelete: () => void;
  children: React.ReactNode;
}
