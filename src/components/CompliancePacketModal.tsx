import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Download, FileText, FileJson } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CompliancePacketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assetTitle: string;
}

export const CompliancePacketModal = ({
  open,
  onOpenChange,
  assetTitle,
}: CompliancePacketModalProps) => {
  const handleGeneratePDF = () => {
    toast({
      title: "PDF Generated",
      description: "Compliance packet PDF has been generated.",
    });
    onOpenChange(false);
  };

  const handleGenerateJSON = () => {
    toast({
      title: "JSON Generated",
      description: "Compliance packet JSON has been generated.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            Generate Compliance Packet
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <p className="text-sm text-muted-foreground">
            This will create an immutable compliance packet for:
          </p>
          <p className="font-medium">{assetTitle}</p>

          <div className="space-y-3">
            <p className="text-sm font-medium">Packet Contents:</p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Final creative file and hash</li>
              <li>• All rule results and citations</li>
              <li>• Version history and changes</li>
              <li>• Applied fixes and suggestions</li>
              <li>• Rule pack versions used</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              className="w-full gap-2 shadow-glow"
              onClick={handleGeneratePDF}
            >
              <FileText className="w-4 h-4" />
              Generate PDF Packet
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleGenerateJSON}
            >
              <FileJson className="w-4 h-4" />
              Generate JSON Packet
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Note: Once generated, the packet is immutable. Any changes to the
            asset will require a new packet.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
