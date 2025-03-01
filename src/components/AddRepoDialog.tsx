
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRepoContext } from "@/context/RepoContext";

interface AddRepoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddRepoDialog: React.FC<AddRepoDialogProps> = ({ open, onOpenChange }) => {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { addRepository, isLoading } = useRepoContext();

  const validateUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    
    if (value) {
      setIsValid(validateUrl(value));
    } else {
      setIsValid(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url || !validateUrl(url)) {
      setIsValid(false);
      return;
    }
    
    await addRepository(url);
    setUrl("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight">Add Repository</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="repo-url">Repository URL</Label>
              <Input
                id="repo-url"
                placeholder="https://example.com/repo.json"
                value={url}
                onChange={handleUrlChange}
                className={!isValid ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {!isValid && (
                <p className="text-sm text-destructive mt-1">Please enter a valid URL</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Repository"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRepoDialog;
