import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Upload, Loader2 } from "lucide-react";

interface QuickComplianceChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Stages available for selection
const STAGES = [
  { value: "S1_CONCEPT_BRIEF", label: "Concept & Brief" },
  { value: "S2_SCRIPT_COPY", label: "Script & Copy" },
  { value: "S3_DESIGN_STATIC", label: "Design & Static" },
  { value: "S4_AV_ROUGHCUT", label: "AV & Rough Cut" },
  { value: "S5_CHANNEL_PACKAGING", label: "Channel Packaging" },
  { value: "S6_APPROVALS_ARCHIVE", label: "Approvals & Archive" },
];

// Guidelines/Rule packs available (updated to match backend keys)
const GUIDELINES = [
  { id: "asci", label: "ASCI Code", description: "Advertising Standards Council of India" },
  { id: "equity", label: "Equity Guidelines", description: "Equity (Cash) Guidelines" },
  { id: "derivatives", label: "Derivatives Guidelines", description: "Derivatives (F&O) Guidelines" },
  { id: "commodities", label: "Commodities Guidelines", description: "Commodities Guidelines" },
  { id: "mutual_fund", label: "Mutual Fund Guidelines", description: "SEBI MF, AMFI Guidelines" },
  { id: "insurance", label: "Insurance Guidelines", description: "IRDAI Guidelines" },
  { id: "ipo", label: "IPO Guidelines", description: "SEBI ICDR Guidelines" },
  { id: "obpp", label: "OBPP Guidelines", description: "Online Bond Platform Providers Guidelines" },
];

export function QuickComplianceChat({ open, onOpenChange }: QuickComplianceChatProps) {
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState("S4_AV_ROUGHCUT");
  const [selectedGuidelines, setSelectedGuidelines] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [showCloseWarning, setShowCloseWarning] = useState(false);

  const toggleGuideline = (guidelineId: string) => {
    setSelectedGuidelines(prev =>
      prev.includes(guidelineId) ? prev.filter(id => id !== guidelineId) : [...prev, guidelineId]
    );
  };

  const canRunCheck = () => {
    return !isChecking;
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleRunCheck = async () => {
    if (!uploadedFile) {
      toast({ title: "No file uploaded", description: "Please upload a file to check.", variant: "destructive" });
      return;
    }

    setIsChecking(true);
    const guidelineNames = selectedGuidelines
      .map(id => GUIDELINES.find(g => g.id === id)?.label)
      .join(", ");
    toast({
      title: "Quick compliance check started",
      description: `Running checks with ${guidelineNames || "auto-detected"}`,
    });

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      let assetType = "TEXT";
      if (uploadedFile.type.startsWith("image/")) assetType = "IMAGE";
      else if (uploadedFile.type.startsWith("video/")) assetType = "VIDEO";
      else if (uploadedFile.type.startsWith("audio/")) assetType = "AUDIO";
      formData.append("asset_type", assetType);

      let backendGuidelines = selectedGuidelines;
      if (selectedGuidelines.length === 0) {
        // Classify first
        const classifyForm = new FormData();
        classifyForm.append("file", uploadedFile);
        const classifyRes = await fetch(`${import.meta.env.VITE_AI_API_URL}/classify-text`, {
          method: "POST",
          body: classifyForm,
        });
        if (!classifyRes.ok) throw new Error("Classification failed");
        const { detected_type } = await classifyRes.json();
        backendGuidelines = TYPE_TO_GUIDELINES?.[detected_type] || ["asci"]; // Assuming TYPE_TO_GUIDELINES is defined elsewhere
      }

      formData.append("guideline_types", JSON.stringify(backendGuidelines));
      formData.append("stages", JSON.stringify([selectedStage]));

      const response = await fetch(`${import.meta.env.VITE_AI_API_URL}/check-text`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Check failed");

      const data = await response.json();
      setHasResults(true);

      toast({ title: "Check complete", description: "Opening results page..." });

      navigate("/qcc/results", {
        state: {
          checkData: {
            results: data,
            stage: selectedStage,
            guidelines: backendGuidelines,
            assetType,
          },
        },
      });
    } catch (e) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setIsChecking(false);
    }
  };

  const handleCloseAttempt = () => {
    if (hasResults) {
      setShowCloseWarning(true);
    } else {
      onOpenChange(false);
    }
  };

  const handleConfirmClose = () => {
    setShowCloseWarning(false);
    setHasResults(false);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleCloseAttempt}>
        <DialogContent className="max-w-3xl p-6 bg-gray-900 text-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">QCC: Quick Compliance Check</DialogTitle>
            <DialogDescription className="text-gray-400">
              Upload your asset and select the stage and guidelines to check against
            </DialogDescription>
          </DialogHeader>

          {/* Upload Section */}
          <div className="space-y-2 mt-4">
            <Label className="text-sm font-medium text-blue-300">Upload Asset</Label>
            <div className="border-2 border-dashed p-6 rounded-lg text-center hover:bg-gray-800 transition-colors">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer block mt-2 text-sm font-medium text-blue-500 hover:underline">
                Click to upload or drag and drop
              </label>
              <p className="text-xs text-gray-500 mt-1">Video, Image, or Text file</p>
              {uploadedFile && <p className="text-sm text-gray-300 mt-2">File: {uploadedFile.name}</p>}
            </div>
          </div>

          {/* Stage Selection */}
          <div className="space-y-2 mt-4">
            <Label className="text-sm font-medium text-blue-300">Production Stage</Label>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                {STAGES.map((stage) => (
                  <SelectItem key={stage.value} value={stage.value} className="hover:bg-gray-700">
                    {stage.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Different stages have different compliance requirements
            </p>
          </div>

          {/* Guidelines Selection */}
          <div className="space-y-2 mt-4">
            <Label className="text-sm font-medium text-blue-300">Guidelines to Check</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {GUIDELINES.map((guideline) => (
                <div key={guideline.id} className="flex items-start space-x-2 p-2 border border-gray-700 rounded-md hover:bg-gray-800">
                  <Checkbox
                    id={guideline.id}
                    checked={selectedGuidelines.includes(guideline.id)}
                    onCheckedChange={() => toggleGuideline(guideline.id)}
                    className="border-gray-600 data-[state=checked]:bg-blue-500"
                  />
                  <div>
                    <Label htmlFor={guideline.id} className="font-medium text-white">{guideline.label}</Label>
                    <p className="text-xs text-gray-400">{guideline.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700" onClick={handleCloseAttempt}>
              Close
            </Button>
            {isChecking ? (
              <Button disabled className="bg-blue-600">
                <Loader2 className="mr-2 animate-spin" /> Checking...
              </Button>
            ) : (
              <Button onClick={handleRunCheck} disabled={!canRunCheck()} className="bg-blue-600 hover:bg-blue-700">
                Run Check
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Close Warning Dialog */}
      <AlertDialog open={showCloseWarning} onOpenChange={setShowCloseWarning}>
        <AlertDialogContent className="bg-gray-900 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved QCC Results</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Your QCC results are ephemeral and will be lost if you close this window without saving. You can save them as an asset to keep a permanent record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-600 text-white hover:bg-gray-700">Keep Open</AlertDialogCancel>
            <AlertDialogAction className="bg-blue-600 hover:bg-blue-700" onClick={handleConfirmClose}>Close Anyway</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}