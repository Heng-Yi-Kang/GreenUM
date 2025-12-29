import { TreePine } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export function PromptAuth() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center py-6 w-full">
      <div
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-16 w-full max-w-full h-[50vh]">
        
        <TreePine className="w-20 h-20 mb-2" />

        <div className="mb-2 text-center">
        Opps, you haven't sign in yet...
        </div>

        <p className="text-muted-foreground text-center text-sm mb-6 max-w-sm text-balance">
          Sign in to view registered events
        </p>

        <div className="flex justify-center">
          <Button 
          className="w-full bg-green-100 dark:bg-green-900 p-5 rounded-lg text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-all" 
          onClick={() => navigate("/auth")}>Sign in</Button>
        </div>
      </div>
    </div>
  );
}
