
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import ToneSelector from "@/components/ToneSelector";
import EmailAnalysis from "@/components/EmailAnalysis";
import AppHeader from "@/components/AppHeader";
import { processEmail } from "@/lib/emailProcessor";

const Index = () => {
  const [originalEmail, setOriginalEmail] = useState("");
  const [rewrittenEmail, setRewrittenEmail] = useState("");
  const [selectedTone, setSelectedTone] = useState("british");
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const { toast } = useToast();

  const handleRewriteEmail = async () => {
    if (!originalEmail.trim()) {
      toast({
        title: "Email content required",
        description: "Please enter an email to rewrite.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await processEmail(originalEmail, selectedTone);
      setRewrittenEmail(result.rewrittenEmail);
      setAnalysis(result.analysis);
      toast({
        title: "Email rewritten successfully",
        description: `Your email has been rewritten in ${selectedTone} business style.`,
      });
    } catch (error) {
      console.error("Error rewriting email:", error);
      toast({
        title: "Error processing your request",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (rewrittenEmail) {
      navigator.clipboard.writeText(rewrittenEmail);
      toast({
        title: "Copied to clipboard",
        description: "The rewritten email has been copied to your clipboard.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <AppHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Original Email</h2>
          <Textarea
            placeholder="Paste your email here..."
            className="min-h-[300px] mb-4"
            value={originalEmail}
            onChange={(e) => setOriginalEmail(e.target.value)}
          />
          <div className="flex flex-col gap-4">
            <ToneSelector value={selectedTone} onChange={setSelectedTone} />
            <Button 
              onClick={handleRewriteEmail}
              disabled={isProcessing || !originalEmail.trim()}
              className="w-full"
            >
              {isProcessing ? "Rewriting..." : "Rewrite Email"}
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Rewritten Email</h2>
          <Tabs defaultValue="result" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="result">Result</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="result" className="mt-4">
              <Textarea
                className="min-h-[300px] mb-4"
                value={rewrittenEmail}
                readOnly
                placeholder="Your rewritten email will appear here..."
              />
              <Button 
                onClick={handleCopyToClipboard}
                disabled={!rewrittenEmail}
                className="w-full"
              >
                Copy to Clipboard
              </Button>
            </TabsContent>
            <TabsContent value="analysis" className="mt-4">
              {analysis ? (
                <EmailAnalysis analysis={analysis} />
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  Analysis will appear after rewriting your email.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Index;
