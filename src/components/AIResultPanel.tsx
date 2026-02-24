import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, AlertCircle, Info, ExternalLink, Calendar, Building2, Banknote, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AIFlag {
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  indicator: string;
}

interface AIAnalysisResult {
  riskScore: number;
  riskLevel: "high" | "medium" | "low";
  summary: string;
  flags: AIFlag[];
  recommendation: string;
}

interface AIResultPanelProps {
  result: AIAnalysisResult;
}

const AIResultPanel = ({ result }: AIResultPanelProps) => {
  const flagIcon = {
    critical: AlertTriangle,
    warning: AlertCircle,
    info: Info,
  };

  const flagColors = {
    critical: {
      bg: "bg-risk-high/10",
      border: "border-risk-high/20",
      text: "text-risk-high",
      badge: "bg-risk-high/15 text-risk-high",
    },
    warning: {
      bg: "bg-risk-medium/10",
      border: "border-risk-medium/20",
      text: "text-risk-medium",
      badge: "bg-risk-medium/15 text-risk-medium",
    },
    info: {
      bg: "bg-risk-low/10",
      border: "border-risk-low/20",
      text: "text-risk-low",
      badge: "bg-risk-low/15 text-risk-low",
    },
  };

  const riskConfig = {
    high: { label: "Жоғары тәуекел", color: "text-risk-high", stroke: "hsl(var(--risk-high))" },
    medium: { label: "Орташа тәуекел", color: "text-risk-medium", stroke: "hsl(var(--risk-medium))" },
    low: { label: "Төмен тәуекел", color: "text-risk-low", stroke: "hsl(var(--risk-low))" },
  };

  const config = riskConfig[result.riskLevel];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Risk Score Header */}
      <Card className="p-6 border-border/50">
        <div className="flex items-center gap-3 mb-4">
          <Bot className="h-5 w-5 text-gold" />
          <h3 className="text-lg font-display font-semibold text-foreground">ЖИ талдау нәтижесі</h3>
        </div>

        <div className="flex items-center gap-6">
          {/* Score circle */}
          <div className="relative flex-shrink-0">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
              <circle
                cx="48" cy="48" r="40" fill="none"
                stroke={config.stroke}
                strokeWidth="6"
                strokeDasharray={`${(result.riskScore / 100) * 251.3} 251.3`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl font-bold ${config.color}`}>{result.riskScore}</span>
              <span className="text-[10px] text-muted-foreground">/ 100</span>
            </div>
          </div>

          <div className="flex-1">
            <Badge className={`mb-2 ${
              result.riskLevel === "high" ? "bg-risk-high/15 text-risk-high" :
              result.riskLevel === "medium" ? "bg-risk-medium/15 text-risk-medium" :
              "bg-risk-low/15 text-risk-low"
            } border-0`}>
              {config.label}
            </Badge>
            <p className="text-sm text-foreground">{result.summary}</p>
          </div>
        </div>
      </Card>

      {/* Flags */}
      <Card className="p-6 border-border/50">
        <h3 className="text-sm font-semibold text-foreground mb-1">Анықталған белгілер ({result.flags.length})</h3>
        <Separator className="my-3" />

        <div className="space-y-3">
          {result.flags.map((flag, i) => {
            const FlagIcon = flagIcon[flag.type] || Info;
            const colors = flagColors[flag.type] || flagColors.info;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className={`p-4 rounded-lg border ${colors.bg} ${colors.border}`}
              >
                <div className="flex items-start gap-3">
                  <FlagIcon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${colors.text}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-medium text-foreground">{flag.title}</span>
                      <Badge className={`text-xs ${colors.badge} border-0`}>{flag.indicator}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{flag.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Recommendation */}
      <Card className="p-6 border-border/50 gradient-card">
        <h3 className="text-sm font-semibold text-foreground mb-2">ЖИ ұсынысы</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{result.recommendation}</p>
      </Card>
    </motion.div>
  );
};

export default AIResultPanel;
