import { Layout } from "@/components/Layout";
import { BackButton } from "@/components/BackButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RotateCcw, Download, Save, AlertCircle, PanelRightClose, PanelRightOpen } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, XCircle, ExternalLink } from "lucide-react";

// Assume StatusBadge is a custom component; if not, replace with <div> or similar

export default function QCCResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const checkData = location.state?.checkData;

  const [checkRunning, setCheckRunning] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(true);

  useEffect(() => {
    if (!checkData) {
      toast({ title: "No check data", description: "Redirecting to dashboard...", variant: "destructive" });
      navigate("/dashboard");
    }
  }, [checkData, navigate]);

  if (!checkData) return null;

  const { results, stage, guidelines, assetType } = checkData;

  if (!results || !results.evaluations) {
    return (
      <Layout className="bg-gray-900 text-white">
        <Alert variant="destructive" className="mx-4 bg-red-900 text-red-200">
          <AlertDescription>No results data available. Please re-run the compliance check.</AlertDescription>
        </Alert>
      </Layout>
    );
  }

  const handleReRun = () => {
    setCheckRunning(true);
    toast({ title: "Re-running check", description: "Running compliance checks again..." });

    setTimeout(() => {
      setCheckRunning(false);
      toast({ title: "Check complete", description: "Results updated" });
    }, 2000);
  };

  const handleDownload = () => {
    toast({ title: "Downloading report", description: "JSON and PDF reports are being prepared..." });
  };

  const handleSaveAsAsset = () => {
    toast({ title: "Save as Asset", description: "This will create a permanent asset with this check" });
  };

  const packs = results.evaluations?.map((ev) => ({
    pack: ev.guideline,
    rules: ev.categories?.flatMap((cat) =>
      cat.sub_criteria?.map((sub) => {
        let status = sub.pass_fail.toLowerCase() === "pass" ? "pass" : "fail";
        if (sub.pass_fail === "Fail" && cat.status === "Warning") {
          status = "warning";
        }
        return {
          id: sub.name.toUpperCase(),
          status,
          severity: cat.status === "Pass" ? "minor" : cat.status === "Warning" ? "major" : "critical",
          reason: `${cat.category} - ${sub.name}: ${sub.pass_fail}`,
          evidence: sub.evidence,
          suggestedFix: "", // Suggested fixes are in improvements section
          citations: [{ source: ev.guideline, clause: cat.category, url: "#" }],
          confidence: Math.round(sub.confidence * 100),
        };
      }) ?? []
    ) ?? [],
  })) ?? [];

  // Calculate counts across all rules
  const allRules = packs.flatMap((p) => p.rules);
  const passCount = allRules.filter((r) => r.status === "pass").length;
  const warningCount = allRules.filter((r) => r.status === "warning").length;
  const failCount = allRules.filter((r) => r.status === "fail").length;

  return (
    <Layout className="bg-gray-900 text-white">
      {/* Top Navigation Bar */}
      <div className="flex items-center space-x-2 p-4 bg-gray-800 shadow-sm rounded-b-lg">
        <BackButton />
        <Breadcrumbs items={[{ label: "Dashboard", to: "/dashboard" }, { label: "QCC Results" }]} />
      </div>

      {/* Dynamic Action Bar */}
      <div className="flex justify-between items-center my-4 px-4 space-y-0">
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700 text-lg" onClick={() => setPreviewOpen(!previewOpen)}>
            {previewOpen ? <PanelRightClose className="mr-2 h-4 w-4" /> : <PanelRightOpen className="mr-2 h-4 w-4" />} Preview
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700 text-lg" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
          <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700 text-lg" onClick={handleReRun} disabled={checkRunning}>
            <RotateCcw className="mr-2 h-4 w-4" /> Re-run
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-lg" onClick={handleSaveAsAsset}>
            <Save className="mr-2 h-4 w-4" /> Save as Asset
          </Button>
        </div>
      </div>

      {/* Alert Banner */}
      <Alert variant="warning" className="mx-4 bg-yellow-900 text-yellow-200 rounded-md text-lg">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This is an ephemeral check. Results will be lost unless you save as an asset.
        </AlertDescription>
      </Alert>

      {/* Results Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 px-4">
        {/* Collapsible Preview */}
        {previewOpen && (
          <div className="md:col-span-1 bg-gray-800 p-4 rounded-lg shadow border border-gray-700 overflow-y-auto max-h-[80vh]">
            <p className="font-semibold text-lg mb-2 text-blue-300">Asset Preview</p>
            <p className="text-lg text-gray-300">Asset type: {assetType || "Unknown"}</p>
            {/* Add preview component based on assetType if needed */}
          </div>
        )}

        {/* Rule Results */}
        <div className="md:col-span-3 bg-gray-800 p-4 rounded-lg shadow overflow-y-auto max-h-[80vh] space-y-4">
          <p className="font-semibold text-lg text-white">Compliance Results</p>

          {/* Overall Status Box */}
          <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 space-y-2">
            <p className="font-medium text-lg text-blue-300">Overall Status</p>
            <Progress value={results.overall_accuracy_percentage} className="w-full bg-gray-700 h-2" />
            <p className="text-center mt-1 text-lg text-white">{results.overall_accuracy_percentage}% - {results.overall_status}</p>
          </div>

          {/* Counts Box */}
          <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 flex space-x-4 justify-center">
            <div className="bg-red-900 text-red-200 px-2 py-1 rounded-full text-lg">Fail ({failCount})</div>
            <div className="bg-yellow-900 text-yellow-200 px-2 py-1 rounded-full text-lg">Warning ({warningCount})</div>
            <div className="bg-green-900 text-green-200 px-2 py-1 rounded-full text-lg">Pass ({passCount})</div>
          </div>

          {/* Rule Packs Box */}
          <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 space-y-2">
            <Accordion type="single" collapsible className="text-gray-300 space-y-2">
              {packs.map((pack, packIdx) => (
                <AccordionItem value={`pack-${packIdx}`} key={packIdx} className="border-gray-700">
                  <AccordionTrigger className="font-medium text-lg text-white hover:text-blue-300 py-2">{pack.pack}</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    {pack.rules.map((rule) => {
                      const StatusIcon = rule.status === "pass" ? CheckCircle2 : rule.status === "warning" ? AlertTriangle : XCircle;
                      const statusColor =
                        rule.status === "pass" ? "text-green-400" : rule.status === "warning" ? "text-yellow-400" : "text-red-400";

                      return (
                        <div key={rule.id} className="border-b border-gray-700 py-2 last:border-b-0">
                          <div className="flex items-center space-x-2">
                            <StatusIcon className={`h-4 w-4 ${statusColor}`} />
                            <span className="font-medium text-lg text-white">{rule.reason}</span>
                            <span className="text-lg text-gray-400">({rule.severity})</span>
                          </div>
                          {rule.evidence && (
                            <p className="text-lg text-gray-300 mt-1">
                              <strong>Evidence:</strong> {rule.evidence}
                            </p>
                          )}
                          {rule.suggestedFix && (
                            <p className="text-lg text-gray-300 mt-1">
                              <strong>Suggested Fix:</strong> {rule.suggestedFix}
                            </p>
                          )}
                          {rule.citations.length > 0 && (
                            <div className="text-lg text-gray-300 mt-1 flex items-center">
                              <strong>Citations:</strong>
                              {rule.citations.map((citation, idx) => (
                                <a key={idx} href={citation.url} className="ml-2 text-blue-500 hover:underline">
                                  {citation.clause} <ExternalLink className="h-3 w-3 inline" />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* What is Right Section */}
          <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 space-y-2 overflow-y-auto max-h-[300px]">
            <p className="font-semibold text-lg text-blue-300">What is Right</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-300 text-lg">
              {results.what_is_right?.map((item, idx) => (
                <li key={idx}>{item}</li>
              )) || <li className="text-gray-500 text-lg">No positive aspects detected.</li>}
            </ul>
          </div>

          {/* Improvements Section */}
          <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 space-y-2 overflow-y-auto max-h-[300px]">
            <p className="font-semibold text-lg text-blue-300">Improvements</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-300 text-lg">
              {results.improvements?.map((item, idx) => (
                <li key={idx}>{item}</li>
              )) || <li className="text-gray-500 text-lg">No improvements suggested.</li>}
            </ul>
          </div>

          {/* Anomalies Section */}
          <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 space-y-2 overflow-y-auto max-h-[300px]">
            <p className="font-semibold text-lg text-blue-300">Anomalies Detected</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-300 text-lg">
              {results.anomalies_detected?.map((item, idx) => (
                <li key={idx}>{item}</li>
              )) || <li className="text-gray-500 text-lg">No anomalies detected.</li>}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}