import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Link2, Loader2, FileSearch, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface TenderAnalysisFormProps {
  onAnalyze: (tenderText: string) => void;
  onScrapeAndAnalyze: (url: string) => void;
  isLoading: boolean;
  isScraping: boolean;
}

const SAMPLE_TENDER = `Тендер №SKZ-2026-001502
Тақырыбы: Бағдарламалық қамтамасыз етуді лицензиялау — SAP S/4HANA Enterprise Edition
Тапсырыс беруші: «KEGOC» АҚ
Сомасы: 156 000 000 ₸
Сатып алу әдісі: Бір көзден сатып алу

Техникалық ерекшеліктер:
1. SAP S/4HANA Enterprise Edition 2023 лицензиясы — 500 пайдаланушы
2. SAP Fiori UX лицензиясы
3. SAP Analytics Cloud лицензиясы
4. Жеткізуші SAP Gold Partner мәртебесіне ие болуы тиіс
5. Қазақстанда кемінде 10 жыл жұмыс тәжірибесі
6. Соңғы 3 жылда SAP S/4HANA бойынша кемінде 5 жоба орындаған болуы тиіс
7. ISO 27001, ISO 20000 сертификаттары болуы тиіс

Өтінімдерді қабылдау мерзімі: 5 күн (2026-02-24 — 2026-03-01)
Баға негіздемесі: Жеткізуші ұсынған коммерциялық ұсыныс негізінде

Қосымша талаптар:
- Тек Астана қаласында тіркелген компаниялар
- Жарғылық капиталы кемінде 500 млн ₸`;

const TenderAnalysisForm = ({ onAnalyze, onScrapeAndAnalyze, isLoading, isScraping }: TenderAnalysisFormProps) => {
  const [url, setUrl] = useState("");
  const [tenderText, setTenderText] = useState("");
  const [activeTab, setActiveTab] = useState("text");

  const handleAnalyze = () => {
    if (activeTab === "text") {
      onAnalyze(tenderText);
    } else {
      onScrapeAndAnalyze(url);
    }
  };

  const loadSample = () => {
    setTenderText(SAMPLE_TENDER);
    setActiveTab("text");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 shadow-lg border-border/50 gradient-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg gradient-gold flex items-center justify-center">
              <FileSearch className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-display font-semibold text-foreground">Тендерді талдау</h3>
              <p className="text-sm text-muted-foreground">Тендер деректерін енгізіп, ЖИ талдау жүргізіңіз</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={loadSample} className="text-xs">
            Үлгі жүктеу
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="text" className="gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              Мәтін
            </TabsTrigger>
            <TabsTrigger value="url" className="gap-1.5">
              <Link2 className="h-3.5 w-3.5" />
              Сілтеме
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text">
            <Textarea
              value={tenderText}
              onChange={(e) => setTenderText(e.target.value)}
              placeholder="Тендердің техникалық ерекшеліктерін, талаптарын, мерзімін осында қойыңыз..."
              className="min-h-[200px] bg-background border-border text-foreground resize-y"
            />
          </TabsContent>

          <TabsContent value="url">
            <div className="space-y-3">
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://zakup.sk.kz/#/ext(popup:lot/...)"
                  className="pl-10 h-12 bg-background border-border text-foreground"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                🔗 URL енгізіп, деректерді автоматты скрейпинг жасаңыз. Содан кейін ЖИ талдау автоматты басталады.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {["zakup.sk.kz", "goszakup.gov.kz"].map((domain) => (
              <span
                key={domain}
                className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
              >
                {domain}
              </span>
            ))}
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={(isLoading || isScraping) || (activeTab === "text" ? !tenderText.trim() : !url.trim())}
            className="gradient-gold text-accent-foreground font-semibold h-12 px-8 hover:shadow-lg transition-all"
          >
            {isScraping ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Скрейпинг...
              </>
            ) : isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ЖИ талдауда...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                {activeTab === "url" ? "Скрейпинг + Талдау" : "ЖИ талдау"}
              </>
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default TenderAnalysisForm;
