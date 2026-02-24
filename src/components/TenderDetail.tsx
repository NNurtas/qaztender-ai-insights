import { motion } from "framer-motion";
import { TenderAnalysis } from "@/lib/mockData";
import { AlertTriangle, CheckCircle2, AlertCircle, Info, ExternalLink, Calendar, Building2, Banknote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface TenderDetailProps {
  tender: TenderAnalysis;
}

const TenderDetail = ({ tender }: TenderDetailProps) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Header */}
      <Card className="p-6 border-border/50">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-xs font-mono text-muted-foreground">{tender.tenderNumber}</span>
            <h2 className="text-lg font-display font-semibold text-foreground mt-1">{tender.title}</h2>
          </div>
          <a
            href={`https://zakup.sk.kz`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span>{tender.customer}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Banknote className="h-4 w-4" />
            <span>{new Intl.NumberFormat("kk-KZ").format(tender.amount)} ₸</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Мерзімі: {tender.deadline}</span>
          </div>
          <div>
            <Badge variant="outline" className="text-xs">{tender.method}</Badge>
          </div>
        </div>
      </Card>

      {/* AI Analysis */}
      <Card className="p-6 border-border/50">
        <h3 className="text-sm font-semibold text-foreground mb-1">ЖИ талдауы</h3>
        <p className="text-xs text-muted-foreground mb-4">Анықталған тәуекел белгілері</p>
        <Separator className="mb-4" />

        <div className="space-y-3">
          {tender.flags.map((flag, i) => {
            const FlagIcon = flagIcon[flag.type];
            const colors = flagColors[flag.type];

            return (
              <motion.div
                key={flag.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className={`p-4 rounded-lg border ${colors.bg} ${colors.border}`}
              >
                <div className="flex items-start gap-3">
                  <FlagIcon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${colors.text}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
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
        <h3 className="text-sm font-semibold text-foreground mb-2">Ұсыныс</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {tender.riskLevel === "high"
            ? "Бұл тендерде бәсекелестікті шектеу белгілері анықталды. Тиісті мемлекеттік органдарға хабарлау ұсынылады. Техникалық ерекшеліктерді қайта қарау қажет."
            : tender.riskLevel === "medium"
            ? "Тендерде ішінара шектеулер бар. Техникалық ерекшеліктерді кеңейту арқылы бәсекелестікті арттыруға болады."
            : "Тендер ашық және бәсекеге қабілетті. Маңызды тәуекел белгілері анықталған жоқ."}
        </p>
      </Card>
    </motion.div>
  );
};

export default TenderDetail;
