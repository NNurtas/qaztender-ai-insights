import { motion } from "framer-motion";
import { TenderAnalysis } from "@/lib/mockData";
import { AlertTriangle, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RiskScoreCardProps {
  tender: TenderAnalysis;
  index: number;
  onSelect: (tender: TenderAnalysis) => void;
  isSelected: boolean;
}

const RiskScoreCard = ({ tender, index, onSelect, isSelected }: RiskScoreCardProps) => {
  const riskConfig = {
    high: {
      label: "Жоғары тәуекел",
      icon: AlertTriangle,
      bgClass: "bg-risk-high/10",
      textClass: "text-risk-high",
      borderClass: "border-risk-high/30",
      glowClass: "risk-glow-high",
      badgeClass: "bg-risk-high/15 text-risk-high border-risk-high/30",
    },
    medium: {
      label: "Орташа тәуекел",
      icon: AlertCircle,
      bgClass: "bg-risk-medium/10",
      textClass: "text-risk-medium",
      borderClass: "border-risk-medium/30",
      glowClass: "risk-glow-medium",
      badgeClass: "bg-risk-medium/15 text-risk-medium border-risk-medium/30",
    },
    low: {
      label: "Төмен тәуекел",
      icon: CheckCircle2,
      bgClass: "bg-risk-low/10",
      textClass: "text-risk-low",
      borderClass: "border-risk-low/30",
      glowClass: "risk-glow-low",
      badgeClass: "bg-risk-low/15 text-risk-low border-risk-low/30",
    },
  };

  const config = riskConfig[tender.riskLevel];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card
        className={`p-5 cursor-pointer transition-all duration-300 hover:shadow-lg border ${
          isSelected ? `${config.borderClass} ${config.glowClass} shadow-md` : "border-border/50 hover:border-border"
        }`}
        onClick={() => onSelect(tender)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-muted-foreground">{tender.tenderNumber}</span>
              <Badge variant="outline" className={config.badgeClass + " text-xs"}>
                <Icon className="h-3 w-3 mr-1" />
                {config.label}
              </Badge>
            </div>
            <h4 className="text-sm font-medium text-foreground truncate">{tender.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{tender.customer}</p>
          </div>

          {/* Risk Score Circle */}
          <div className={`relative flex-shrink-0 ml-4`}>
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="24" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke={
                  tender.riskLevel === "high"
                    ? "hsl(var(--risk-high))"
                    : tender.riskLevel === "medium"
                    ? "hsl(var(--risk-medium))"
                    : "hsl(var(--risk-low))"
                }
                strokeWidth="4"
                strokeDasharray={`${(tender.riskScore / 100) * 150.8} 150.8`}
                strokeLinecap="round"
              />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${config.textClass}`}>
              {tender.riskScore}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{new Intl.NumberFormat("kk-KZ").format(tender.amount)} ₸</span>
            <span>•</span>
            <span>{tender.method}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">{tender.flags.length} белгі</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default RiskScoreCard;
