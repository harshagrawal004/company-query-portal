import { Layout } from "@/components/layout/Layout";
import { CompanyAnalysisForm } from "@/components/company/CompanyAnalysisForm";

const Dashboard = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Company Analysis</h1>
          <p className="text-muted-foreground">
            Enter company details to get started with the analysis
          </p>
        </div>
        <CompanyAnalysisForm />
      </div>
    </Layout>
  );
};

export default Dashboard;