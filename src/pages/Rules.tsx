import { Layout } from "@/components/Layout";
import { BackButton } from "@/components/BackButton";
import { Search, ExternalLink } from "lucide-react";

const rulePacks = [
  {
    pack: "SEBI MF",
    version: "2025-09-01",
    rules: [
      {
        id: "MF_STD_WARNING_TEXT",
        name: "Standard MF Warning Text",
        description: "Mutual Fund investments are subject to market risks... warning must be present",
        stages: ["S2", "S3", "S4", "S5", "S6"],
        severity: "major",
        citation: { source: "SEBI MF Ad Guidelines", clause: "Standard Warning" },
      },
      {
        id: "MF_PAST_PERFORMANCE",
        name: "Past Performance Disclaimer",
        description: "Any mention of past performance must include disclaimer about future results",
        stages: ["S2", "S3", "S4"],
        severity: "major",
        citation: { source: "SEBI MF Ad Guidelines", clause: "Performance Disclosure" },
      },
    ],
  },
  {
    pack: "ASCI Base",
    version: "2025-09-01",
    rules: [
      {
        id: "ASCI_NO_MISLEADING",
        name: "No Misleading Claims",
        description: "Claims must be truthful, not misleading, and substantiated",
        stages: ["S1", "S2", "S3", "S4"],
        severity: "major",
        citation: { source: "ASCI Code", clause: "Chapter I - Truthful & Honest" },
      },
      {
        id: "ASCI_NO_OFFENSIVE",
        name: "No Offensive Content",
        description: "Content must not be offensive to public decency or morality",
        stages: ["S1", "S2", "S3", "S4"],
        severity: "major",
        citation: { source: "ASCI Code", clause: "Chapter V - Fairness" },
      },
    ],
  },
  {
    pack: "ASCI Influencer",
    version: "2025-09-01",
    rules: [
      {
        id: "INFL_DISCLOSURE_VISIBLE",
        name: "Disclosure Must Be Visible",
        description: "Paid partnership disclosure must be clearly visible and legible",
        stages: ["S3", "S4", "S5"],
        severity: "major",
        citation: { source: "ASCI Influencer Guidelines", clause: "Disclosure Requirements" },
      },
      {
        id: "INFL_DISCLOSURE_TIMING",
        name: "Disclosure Timing",
        description: "For video, disclosure must appear within first 2 seconds and be visible for duration",
        stages: ["S4", "S5"],
        severity: "major",
        citation: { source: "ASCI Influencer Guidelines", clause: "Video Disclosure" },
      },
    ],
  },
  {
    pack: "Exchange Code",
    version: "2025-08-20",
    rules: [
      {
        id: "EXCH_WARNING_LEGIBLE_STATIC",
        name: "Warning Legibility (Static)",
        description: "Warning text must be minimum 10pt on static creatives",
        stages: ["S3"],
        severity: "major",
        citation: { source: "Exchange Ad Code", clause: "Standard Warning Legibility" },
      },
      {
        id: "EXCH_WARNING_DURATION_VIDEO",
        name: "Warning Duration (Video)",
        description: "Warning must be visible for minimum 3 seconds in video",
        stages: ["S4"],
        severity: "major",
        citation: { source: "Exchange Ad Code", clause: "Video Warning Duration" },
      },
    ],
  },
  {
    pack: "AMFI",
    version: "2025-08-20",
    rules: [
      {
        id: "AMFI_DISCLOSURE",
        name: "Fund Disclosure",
        description: "Fund name, scheme type, and risk category must be disclosed",
        stages: ["S2", "S3", "S4"],
        severity: "major",
        citation: { source: "AMFI Guidelines", clause: "Disclosure Requirements" },
      },
    ],
  },
  {
    pack: "IRDAI",
    version: "2025-08-15",
    rules: [
      {
        id: "IRDAI_INSURANCE_NOT_DEPOSIT",
        name: "Insurance is Not a Deposit",
        description: "'Insurance is subject to underwriting and not a deposit' warning required",
        stages: ["S2", "S3", "S4"],
        severity: "major",
        citation: { source: "IRDAI Ad Guidelines", clause: "Standard Warnings" },
      },
    ],
  },
];

export default function Rules() {
  return (
    <Layout>
      <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="space-y-1 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BackButton />
          </div>
          <h1 className="text-5xl font-serif font-light tracking-tight">Rules Library</h1>
          <p className="text-sm text-muted-foreground">Browse all compliance rules by regulatory pack</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search rules..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-input border border-border text-sm"
          />
        </div>

        {/* Rule Packs */}
        <div className="space-y-6">
          {rulePacks.map((pack) => (
            <div key={pack.pack} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-serif font-normal mb-1">{pack.pack}</h2>
                    <p className="text-sm text-muted-foreground">
                      Version {pack.version} • {pack.rules.length} rule{pack.rules.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-border">
                {pack.rules.map((rule) => (
                  <div key={rule.id} className="p-6 hover:bg-muted/20 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{rule.name}</h3>
                            <span className={`
                              text-xs px-2 py-0.5 rounded-full
                              ${rule.severity === 'major' ? 'bg-destructive/20 text-destructive' :
                                rule.severity === 'minor' ? 'bg-warning/20 text-warning' :
                                'bg-muted text-muted-foreground'}
                            `}>
                              {rule.severity}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{rule.description}</p>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Applies to stages: </span>
                            <span className="font-medium">{rule.stages.join(', ')}</span>
                          </div>
                        </div>

                        <a
                          href="#"
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {rule.citation.source} - {rule.citation.clause}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="text-xs font-mono text-muted-foreground">
                        {rule.id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
