import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

interface HistoryItem {
  companyName: string;
  companyWebsite: string;
  timestamp: string;
  result: any;
}

const History = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
    setHistory(savedHistory);
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Analysis History</h1>
          <p className="text-muted-foreground">
            View your past company analyses
          </p>
        </div>

        <div className="space-y-4">
          {history.length === 0 ? (
            <Card className="p-6">
              <p className="text-center text-muted-foreground">
                No analysis history yet. Start by analyzing a company on the dashboard.
              </p>
            </Card>
          ) : (
            history.map((item, index) => (
              <Card key={index} className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{item.companyName}</h3>
                    <a 
                      href={item.companyWebsite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      {item.companyWebsite}
                    </a>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(item.timestamp), 'PPpp')}
                  </span>
                </div>
                <div className="bg-muted p-4 rounded-lg overflow-auto max-h-96">
                  <pre className="text-sm">
                    {JSON.stringify(item.result, null, 2)}
                  </pre>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default History;