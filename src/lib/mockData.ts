export interface TenderAnalysis {
  id: string;
  tenderNumber: string;
  title: string;
  customer: string;
  amount: number;
  method: string;
  riskScore: number; // 0-100
  riskLevel: "high" | "medium" | "low";
  flags: TenderFlag[];
  date: string;
  deadline: string;
  status: string;
}

export interface TenderFlag {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  indicator: string;
}

export const mockTenders: TenderAnalysis[] = [
  {
    id: "1",
    tenderNumber: "SKZ-2026-001247",
    title: "Ақпараттық жүйені модернизациялау бойынша қызмет көрсету",
    customer: "«ҚазМұнайГаз» ҰК» АҚ",
    amount: 245000000,
    method: "Ашық тендер",
    riskScore: 87,
    riskLevel: "high",
    date: "2026-02-20",
    deadline: "2026-03-05",
    status: "Жарияланған",
    flags: [
      {
        id: "f1",
        type: "critical",
        title: "Тар техникалық ерекшеліктер",
        description: "Техникалық ерекшеліктерде нақты бір жеткізушінің бренді көрсетілген (Oracle Database Enterprise Edition 19c). Бұл бәсекелестікті шектейді.",
        indicator: "Брендке сілтеме",
      },
      {
        id: "f2",
        type: "critical",
        title: "Қысқа мерзім",
        description: "Өтінімдерді қабылдау мерзімі 13 күн. Күрделі IT жобасы үшін бұл өте қысқа, бәсекелестікті шектеуі мүмкін.",
        indicator: "Мерзім < 15 күн",
      },
      {
        id: "f3",
        type: "warning",
        title: "Жоғары біліктілік талаптары",
        description: "ISO 27001, ISO 20000, CMMI Level 3 сертификаттары талап етіледі. Нарықта 2-3 компания ғана сәйкес келеді.",
        indicator: "Сертификат шектеуі",
      },
    ],
  },
  {
    id: "2",
    tenderNumber: "SKZ-2026-001389",
    title: "Кеңсе жиһаздарын жеткізу",
    customer: "«Самрұқ-Энерго» АҚ",
    amount: 18500000,
    method: "Баға ұсыныстарын сұрау",
    riskScore: 23,
    riskLevel: "low",
    date: "2026-02-22",
    deadline: "2026-03-15",
    status: "Жарияланған",
    flags: [
      {
        id: "f4",
        type: "info",
        title: "Стандартты сатып алу",
        description: "Техникалық ерекшеліктер жалпы сипатта, нақты брендтерге сілтеме жоқ. Бәсекелестік үшін ашық.",
        indicator: "Қалыпты",
      },
    ],
  },
  {
    id: "3",
    tenderNumber: "SKZ-2026-001456",
    title: "Мұнай құбырын жөндеу жұмыстары",
    customer: "«ҚазТрансОйл» АҚ",
    amount: 890000000,
    method: "Ашық тендер",
    riskScore: 62,
    riskLevel: "medium",
    date: "2026-02-18",
    deadline: "2026-03-10",
    status: "Жарияланған",
    flags: [
      {
        id: "f5",
        type: "warning",
        title: "Географиялық шектеу",
        description: "Тек Атырау облысында тіркелген компаниялар ғана қатыса алады. Бұл бәсекелестікті шектеуі мүмкін.",
        indicator: "Аймақ шектеуі",
      },
      {
        id: "f6",
        type: "warning",
        title: "Тәжірибе талабы",
        description: "Соңғы 3 жылда кемінде 5 ұқсас жоба орындау талабы. Нарыққа жаңа қатысушылар кіре алмайды.",
        indicator: "Тәжірибе > 5 жоба",
      },
    ],
  },
  {
    id: "4",
    tenderNumber: "SKZ-2026-001502",
    title: "Бағдарламалық қамтамасыз етуді лицензиялау",
    customer: "«KEGOC» АҚ",
    amount: 156000000,
    method: "Бір көзден сатып алу",
    riskScore: 95,
    riskLevel: "high",
    date: "2026-02-24",
    deadline: "2026-03-01",
    status: "Жарияланған",
    flags: [
      {
        id: "f7",
        type: "critical",
        title: "Бір көзден сатып алу",
        description: "Тендерсіз тікелей сатып алу. Негіздемесі жеткіліксіз — баламалы шешімдер қарастырылмаған.",
        indicator: "Тікелей сатып алу",
      },
      {
        id: "f8",
        type: "critical",
        title: "Бағаның негізсіздігі",
        description: "Нарықтық баға талдауы жоқ. Ұсынылған баға нарықтық орташа бағадан 40% жоғары.",
        indicator: "Баға > +40%",
      },
      {
        id: "f9",
        type: "critical",
        title: "Өте қысқа мерзім",
        description: "Өтінімдерді қабылдау мерзімі тек 5 күн. Басқа жеткізушілер дайындалып үлгермейді.",
        indicator: "Мерзім < 7 күн",
      },
    ],
  },
  {
    id: "5",
    tenderNumber: "SKZ-2026-001234",
    title: "Көлік құралдарына техникалық қызмет көрсету",
    customer: "«ҚТЖ» ҰК» АҚ",
    amount: 42000000,
    method: "Баға ұсыныстарын сұрау",
    riskScore: 41,
    riskLevel: "medium",
    date: "2026-02-19",
    deadline: "2026-03-12",
    status: "Жарияланған",
    flags: [
      {
        id: "f10",
        type: "warning",
        title: "Шектеулі конкурс",
        description: "Тек Самрұқ-Қазына тобына кіретін ұйымдар арасында. Сыртқы жеткізушілер қатыса алмайды.",
        indicator: "Ішкі конкурс",
      },
    ],
  },
];

export const analysisStats = {
  totalAnalyzed: 1247,
  highRisk: 186,
  mediumRisk: 342,
  lowRisk: 719,
  totalAmount: "2.4 трлн ₸",
  avgRiskScore: 38,
  topFlags: [
    { name: "Брендке сілтеме", count: 89 },
    { name: "Қысқа мерзім", count: 124 },
    { name: "Бір көзден сатып алу", count: 67 },
    { name: "Жоғары біліктілік талаптары", count: 156 },
    { name: "Географиялық шектеу", count: 43 },
  ],
};
