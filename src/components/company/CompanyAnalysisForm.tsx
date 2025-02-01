import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface CompanyData {
  companyName: string;
  companyWebsite: string;
  timestamp?: string;
}

interface AnalysisResponse {
  data: any;
  status: 'success' | 'error';
  message?: string;
}

// Store in localStorage for history
const saveToHistory = (data: CompanyData & { result: any }) => {
  const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
  const newHistory = [{ ...data, timestamp: new Date().toISOString() }, ...history];
  localStorage.setItem('analysisHistory', JSON.stringify(newHistory));
};

export function CompanyAnalysisForm() {
  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: '',
    companyWebsite: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace this URL with your actual n8n webhook URL
      const response = await fetch('https://your-n8n-webhook-url/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze company');
      }

      const data = await response.json();
      setResult({
        data,
        status: 'success',
      });

      // Save to history
      saveToHistory({ ...companyData, result: data });

      toast({
        title: "Analysis Complete",
        description: "Company data has been successfully analyzed.",
      });
    } catch (error) {
      setResult({
        data: null,
        status: 'error',
        message: 'Failed to analyze company data',
      });

      toast({
        title: "Error",
        description: "Failed to analyze company data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in">
      <Card className="p-6 glass-card">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Name</label>
            <Input
              value={companyData.companyName}
              onChange={(e) => setCompanyData(prev => ({
                ...prev,
                companyName: e.target.value
              }))}
              placeholder="Enter company name"
              required
              className="transition-all duration-200"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Website</label>
            <Input
              value={companyData.companyWebsite}
              onChange={(e) => setCompanyData(prev => ({
                ...prev,
                companyWebsite: e.target.value
              }))}
              placeholder="Enter company website"
              type="url"
              required
              className="transition-all duration-200"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full transition-all duration-200" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Company"
            )}
          </Button>
        </form>
      </Card>

      {result && (
        <Card className="p-6 glass-card animate-in">
          <h3 className="text-xl font-bold mb-4">Analysis Results</h3>
          <div className="space-y-4">
            {result.status === 'success' ? (
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            ) : (
              <div className="text-destructive">{result.message}</div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}