import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Link2, Loader2, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface TenderAnalysisFormProps {
  onAnalyze: () => void;
  isLoading: boolean;
}

const TenderAnalysisForm = ({ onAnalyze, isLoading }: TenderAnalysisFormProps) => {
  const [url, setUrl] = useState("https://zakup.sk.kz/#/ext(popup:lot/3795965/advert/3583283)");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 shadow-lg border-border/50 gradient-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg gradient-gold flex items-center justify-center">
            <FileSearch className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-display font-semibold text-foreground">Тендерді талдау</h3>
            <p className="text-sm text-muted-foreground">Самрұқ-Қазына порталынан тендер сілтемесін енгізіңіз</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://zakup.sk.kz/#/ext(popup:lot/...)"
              className="pl-10 h-12 bg-background border-border text-foreground"
            />
          </div>
          <Button
            onClick={onAnalyze}
            disabled={isLoading || !url}
            className="gradient-gold text-accent-foreground font-semibold h-12 px-8 hover:shadow-lg transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Талдау...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Талдау
              </>
            )}
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {["zakup.sk.kz", "goszakup.gov.kz"].map((domain) => (
            <span
              key={domain}
              className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              {domain}
            </span>
          ))}
          <span className="text-xs text-muted-foreground flex items-center">
            — қолдау көрсетілетін порталдар
          </span>
        </div>
      </Card>
    </motion.div>
  );
};

export default TenderAnalysisForm;
