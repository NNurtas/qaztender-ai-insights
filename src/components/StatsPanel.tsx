import { motion } from "framer-motion";
import { analysisStats } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { BarChart3, AlertTriangle, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

const StatsPanel = () => {
  const stats = [
    {
      label: "Талданған тендерлер",
      value: analysisStats.totalAnalyzed.toLocaleString(),
      icon: BarChart3,
      color: "text-foreground",
    },
    {
      label: "Жоғары тәуекел",
      value: analysisStats.highRisk.toString(),
      icon: AlertTriangle,
      color: "text-risk-high",
    },
    {
      label: "Орташа тәуекел",
      value: analysisStats.mediumRisk.toString(),
      icon: AlertCircle,
      color: "text-risk-medium",
    },
    {
      label: "Төмен тәуекел",
      value: analysisStats.lowRisk.toString(),
      icon: CheckCircle2,
      color: "text-risk-low",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="p-4 border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Top flags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Card className="p-5 border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-gold" />
            <h3 className="text-sm font-semibold text-foreground">Ең жиі кездесетін белгілер</h3>
          </div>
          <div className="space-y-3">
            {analysisStats.topFlags.map((flag, i) => (
              <div key={flag.name} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{flag.name}</span>
                    <span className="text-xs font-mono text-muted-foreground">{flag.count}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full gradient-gold rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(flag.count / 200) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default StatsPanel;
