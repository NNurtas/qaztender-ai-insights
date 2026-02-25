import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, ShieldCheck, ShieldAlert, ChevronDown, ChevronUp } from "lucide-react";

interface AnalysisRecord {
  id: string;
  tender_text: string;
  risk_score: number;
  risk_level: string;
  summary: string;
  recommendation: string;
  flags: any[];
  created_at: string;
}

const AnalysisHistory = () => {
  const [records, setRecords] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tender_analyses")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (!error && data) {
      setRecords(data as AnalysisRecord[]);
    }
    setLoading(false);
  };

  const riskColor = (level: string) => {
    switch (level) {
      case "high": return "bg-risk-high/10 text-risk-high border-risk-high/30";
      case "medium": return "bg-risk-medium/10 text-risk-medium border-risk-medium/30";
      default: return "bg-risk-low/10 text-risk-low border-risk-low/30";
    }
  };

  const riskLabel = (level: string) => {
    switch (level) {
      case "high": return "Жоғары";
      case "medium": return "Орташа";
      default: return "Төмен";
    }
  };

  const RiskIcon = ({ level }: { level: string }) => {
    switch (level) {
      case "high": return <ShieldAlert className="h-5 w-5 text-risk-high" />;
      case "medium": return <AlertTriangle className="h-5 w-5 text-risk-medium" />;
      default: return <ShieldCheck className="h-5 w-5 text-risk-low" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <Clock className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <h3 className="font-display font-semibold text-foreground mb-1">Тарих бос</h3>
          <p className="text-sm text-muted-foreground">
            Тендерді талдаған соң нәтижелер мұнда сақталады
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {records.map((record, i) => (
        <motion.div
          key={record.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card
            className="cursor-pointer hover:shadow-md transition-all"
            onClick={() => setExpandedId(expandedId === record.id ? null : record.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <RiskIcon level={record.risk_level} />
                  <div>
                    <CardTitle className="text-base font-display">
                      Тәуекел: {record.risk_score}/100
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(record.created_at).toLocaleString("kk-KZ", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={riskColor(record.risk_level)}>
                    {riskLabel(record.risk_level)}
                  </Badge>
                  {expandedId === record.id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground line-clamp-1">{record.summary}</p>

              {expandedId === record.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 space-y-4"
                >
                  {/* Flags */}
                  {record.flags && record.flags.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground">Анықталған белгілер:</h4>
                      {record.flags.map((flag: any, fi: number) => (
                        <div
                          key={fi}
                          className={`p-3 rounded-lg border text-sm ${
                            flag.type === "critical"
                              ? "bg-risk-high/5 border-risk-high/20"
                              : flag.type === "warning"
                              ? "bg-risk-medium/5 border-risk-medium/20"
                              : "bg-muted/50 border-border"
                          }`}
                        >
                          <span className="font-medium">{flag.title}</span>
                          <p className="text-muted-foreground mt-0.5">{flag.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Recommendation */}
                  {record.recommendation && (
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <h4 className="text-sm font-semibold text-foreground mb-1">Ұсыныс:</h4>
                      <p className="text-sm text-muted-foreground">{record.recommendation}</p>
                    </div>
                  )}

                  {/* Original text preview */}
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <h4 className="text-sm font-semibold text-foreground mb-1">Бастапқы мәтін:</h4>
                    <p className="text-xs text-muted-foreground whitespace-pre-wrap line-clamp-5">
                      {record.tender_text}
                    </p>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default AnalysisHistory;
