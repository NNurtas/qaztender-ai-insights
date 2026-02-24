import { motion } from "framer-motion";
import { Shield, Search, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  return (
    <section className="gradient-hero relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 mb-8">
              <Shield className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold">AI Hackathon 2026 — Мемлекеттік сатып алулар</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold text-primary-foreground mb-6 leading-tight"
          >
            QazTender{" "}
            <span className="text-gradient-gold">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-primary-foreground/70 mb-4 max-w-2xl font-light"
          >
            Мемлекеттік сатып алулардағы бәсекелестікті шектеуді анықтайтын жасанды интеллект жүйесі
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base text-primary-foreground/50 mb-10 max-w-2xl"
          >
            Самрұқ-Қазына порталындағы тендерлерді талдап, манипуляциялық техникалық ерекшеліктерді, «нақты бір жеткізушіге бейімделген» талаптарды анықтайды
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="gradient-gold text-accent-foreground font-semibold text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              onClick={() => onNavigate("analysis")}
            >
              Тендерді талдау
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground/20 text-primary-foreground bg-primary-foreground/5 hover:bg-primary-foreground/10 font-medium text-base px-8 py-6"
              onClick={() => onNavigate("dashboard")}
            >
              Дашборд
            </Button>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap gap-4 mt-16"
          >
            {[
              { icon: Search, label: "Тендерлерді скрейпинг" },
              { icon: Shield, label: "Тәуекелді бағалау" },
              { icon: BarChart3, label: "Статистика" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 px-4 py-2.5"
              >
                <item.icon className="h-4 w-4 text-gold" />
                <span className="text-sm text-primary-foreground/70">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient orb */}
      <div className="absolute -right-32 top-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute -left-32 bottom-0 w-64 h-64 rounded-full bg-gold/3 blur-3xl" />
    </section>
  );
};

export default HeroSection;
