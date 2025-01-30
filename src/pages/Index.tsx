import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6 animate-in">
        <h1 className="text-4xl font-bold sm:text-6xl">
          Analyze Companies with AI
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
          Get instant insights about any company. Enter a company name and website to receive detailed analysis powered by AI.
        </p>
        <Button
          size="lg"
          onClick={() => navigate("/dashboard")}
          className="text-lg px-8"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;