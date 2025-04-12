
import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

type AnalysisItem = {
  type: "improvement" | "warning" | "info";
  text: string;
};

type EmailAnalysisProps = {
  analysis: {
    items: AnalysisItem[];
    overallTone: string;
  };
};

const EmailAnalysis = ({ analysis }: EmailAnalysisProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "improvement":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-secondary/50 rounded-md">
        <h3 className="font-medium mb-1">Overall Tone Assessment</h3>
        <p className="text-sm">{analysis.overallTone}</p>
      </div>

      <h3 className="font-medium">Cultural Insights</h3>
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
        {analysis.items.map((item, index) => (
          <Card key={index} className="p-3 flex items-start gap-3">
            {getIcon(item.type)}
            <p className="text-sm">{item.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmailAnalysis;
