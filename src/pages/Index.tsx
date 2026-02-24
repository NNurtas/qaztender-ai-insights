import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TenderAnalysisForm from "@/components/TenderAnalysisForm";
import RiskScoreCard from "@/components/RiskScoreCard";
import TenderDetail from "@/components/TenderDetail";
import StatsPanel from "@/components/StatsPanel";
import { mockTenders, TenderAnalysis } from "@/lib/mockData";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("hero");
  const [selectedTender, setSelectedTender] = useState<TenderAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

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

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setShowResults(false);
    setSelectedTender(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      setSelectedTender(mockTenders[0]);
    }, 2500);
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
            <p className="text-muted-foreground">Самрұқ-Қазына порталынан тендер сілтемесін енгізіп, ЖИ талдау жүргізіңіз</p>
          </motion.div>

          <TenderAnalysisForm onAnalyze={handleAnalyze} isLoading={isAnalyzing} />

          {/* Results */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6"
            >
              {/* Tender List */}
              <div className="lg:col-span-2 space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Табылған тендерлер ({mockTenders.length})
                </h3>
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

              {/* Detail Panel */}
              <div className="lg:col-span-3">
                {selectedTender ? (
                  <TenderDetail tender={selectedTender} />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    Тендерді таңдаңыз
                  </div>
                )}
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
