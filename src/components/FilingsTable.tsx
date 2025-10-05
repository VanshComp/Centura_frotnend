import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Upload, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Filing {
  id: string;
  authority: string;
  submissionRef: string;
  submittedAt: string;
  submittedBy: string;
  status: "Submitted" | "QueryReceived" | "Approved" | "Rejected";
  ackDocPath?: string;
  decisionDocPath?: string;
  decisionAt?: string;
  notes: string;
}

interface FilingsTableProps {
  caseId: string;
}

export function FilingsTable({ caseId }: FilingsTableProps) {
  const { toast } = useToast();
  const [filings, setFilings] = useState<Filing[]>([
    {
      id: "1",
      authority: "NSE",
      submissionRef: "NSE/MF/2025/0012",
      submittedAt: "2025-11-05",
      submittedBy: "Sarah Chen",
      status: "Submitted",
      ackDocPath: "/docs/nse-ack.pdf",
      notes: "Initial submission for mutual fund campaign",
    },
  ]);

  const [isAddingFiling, setIsAddingFiling] = useState(false);

  const handleAddFiling = () => {
    toast({
      title: "Filing added",
      description: "Exchange filing has been recorded.",
    });
    setIsAddingFiling(false);
  };

  const getStatusBadge = (status: Filing["status"]) => {
    const variants = {
      Submitted: "bg-primary/10 text-primary border-primary/30",
      QueryReceived: "bg-warning/10 text-warning border-warning/30",
      Approved: "bg-success/10 text-success border-success/30",
      Rejected: "bg-destructive/10 text-destructive border-destructive/30",
    };
    return (
      <Badge variant="outline" className={variants[status]}>
        {status}
      </Badge>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium">Exchange/Regulator Filings</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Track submissions to NSE, BSE, SEBI, IRDAI, etc.
          </p>
        </div>
        <Dialog open={isAddingFiling} onOpenChange={setIsAddingFiling}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Filing
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Exchange/Regulator Filing</DialogTitle>
              <DialogDescription>
                Record a new submission to an exchange or regulatory authority.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="authority">Authority</Label>
                <Select>
                  <SelectTrigger id="authority">
                    <SelectValue placeholder="Select authority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nse">NSE</SelectItem>
                    <SelectItem value="bse">BSE</SelectItem>
                    <SelectItem value="sebi">SEBI</SelectItem>
                    <SelectItem value="irdai">IRDAI</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ref">Submission Reference Number</Label>
                <Input id="ref" placeholder="e.g., NSE/MF/2025/0013" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ack">Acknowledgment Document</Label>
                <div className="flex gap-2">
                  <Input id="ack" type="file" />
                  <Button variant="outline" size="icon">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional details about this filing..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingFiling(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddFiling}>Add Filing</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {filings.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground mb-4">No filings recorded yet</p>
          <Button variant="outline" onClick={() => setIsAddingFiling(true)}>
            Add First Filing
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Authority</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Decision Date</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filings.map((filing) => (
              <TableRow key={filing.id}>
                <TableCell className="font-medium">{filing.authority}</TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    {filing.submissionRef}
                  </code>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {new Date(filing.submittedAt).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-muted-foreground">{filing.submittedBy}</div>
                </TableCell>
                <TableCell>{getStatusBadge(filing.status)}</TableCell>
                <TableCell>
                  {filing.decisionAt ? (
                    <div className="flex items-center gap-1">
                      {filing.status === "Approved" ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-destructive" />
                      )}
                      <span className="text-sm">
                        {new Date(filing.decisionAt).toLocaleDateString()}
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">Pending</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {filing.ackDocPath && (
                      <Button variant="ghost" size="sm" className="gap-1">
                        <ExternalLink className="w-3 h-3" />
                        Ack
                      </Button>
                    )}
                    {filing.decisionDocPath && (
                      <Button variant="ghost" size="sm" className="gap-1">
                        <ExternalLink className="w-3 h-3" />
                        Decision
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
