import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TenderAnalysisForm from "@/components/TenderAnalysisForm";
import RiskScoreCard from "@/components/RiskScoreCard";
import TenderDetail from "@/components/TenderDetail";
import StatsPanel from "@/components/StatsPanel";
import AIResultPanel from "@/components/AIResultPanel";
import { mockTenders, TenderAnalysis } from "@/lib/mockData";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("hero");
  const [selectedTender, setSelectedTender] = useState<TenderAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const { toast } = useToast();

  const analysisRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      analysis: analysisRef,
      dashboard: dashboardRef,
    };
    if (refs[section]?.current) {
      refs[section].current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAnalyze = async (tenderText: string) => {
    setIsAnalyzing(true);
    setShowResults(false);
    setAiResult(null);
    setSelectedTender(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-tender", {
        body: { tenderData: tenderText },
      });

      if (error) throw error;

      if (data?.success && data?.analysis) {
        setAiResult(data.analysis);
        setShowResults(true);
        toast({
          title: "Талдау аяқталды",
          description: `Тәуекел деңгейі: ${data.analysis.riskScore}/100`,
        });
      } else if (data?.error) {
        throw new Error(data.error);
      }
    } catch (err: any) {
      console.error("Analysis error:", err);
      toast({
        title: "Қате",
        description: err.message || "Талдау кезінде қате пайда болды",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentSection={currentSection} onNavigate={handleNavigate} />

      {/* Hero */}
      <HeroSection onNavigate={handleNavigate} />

      {/* Analysis Section */}
      <section ref={analysisRef} className="py-16 px-6" id="analysis">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">Тендерді талдау</h2>
            <p className="text-muted-foreground">Тендер деректерін енгізіп, жасанды интеллект арқылы тәуекелді бағалаңыз</p>
          </motion.div>

          <TenderAnalysisForm onAnalyze={handleAnalyze} isLoading={isAnalyzing} />

          {/* AI Results */}
          {showResults && aiResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <AIResultPanel result={aiResult} />
            </motion.div>
          )}

          {/* Demo tenders */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                Демо тендерлер (үлгі деректер)
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 space-y-3">
                  {mockTenders.map((tender, i) => (
                    <RiskScoreCard
                      key={tender.id}
                      tender={tender}
                      index={i}
                      onSelect={setSelectedTender}
                      isSelected={selectedTender?.id === tender.id}
                    />
                  ))}
                </div>
                <div className="lg:col-span-3">
                  {selectedTender ? (
                    <TenderDetail tender={selectedTender} />
                  ) : (
                    <div className="flex items-center justify-center h-64 text-muted-foreground text-sm border border-dashed border-border rounded-lg">
                      Тендерді таңдаңыз
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Dashboard Section */}
      <section ref={dashboardRef} className="py-16 px-6 bg-muted/30" id="dashboard">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">Дашборд</h2>
            <p className="text-muted-foreground">Жалпы статистика және тәуекел талдауы</p>
          </motion.div>

          <StatsPanel />
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-hero py-8 px-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-primary-foreground">QazTender AI</span>
            <span className="text-primary-foreground/50 text-sm">— AI Hackathon 2026</span>
          </div>
          <p className="text-xs text-primary-foreground/40">
            Самрұқ-Қазына порталы деректері негізінде жасалған MVP
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
