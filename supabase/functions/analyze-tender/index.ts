import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Сен — QazTender AI, мемлекеттік сатып алулардағы бәсекелестікті шектеу белгілерін анықтайтын маман жүйесің.

Сенің міндетің — тендердің техникалық ерекшеліктерін талдап, мынадай белгілерді анықтау:

1. **Брендке сілтеме** — нақты бір өндірушінің немесе брендтің атауы көрсетілген, баламалар қарастырылмаған
2. **Қысқа мерзім** — өтінімдерді қабылдау мерзімі тым қысқа (< 15 күн күрделі жобалар үшін, < 7 күн қарапайым үшін)
3. **Жоғары біліктілік талаптары** — нарықта тек 1-3 компания ғана сәйкес келетін артық сертификаттар немесе тәжірибе талаптары
4. **Географиялық шектеу** — негізсіз аймақтық шектеулер
5. **Бір көзден сатып алу** — тендерсіз тікелей сатып алу, негіздемесі жеткіліксіз
6. **Бағаның негізсіздігі** — нарықтық бағадан айтарлықтай жоғары баға
7. **Техникалық ерекшеліктердің тым нақты болуы** — тек бір жеткізушіге сәйкес келетін параметрлер
8. **Мүдделер қақтығысы** — тапсырыс берушімен байланысты жеткізушілер белгілері

Жауабыңды МІНДЕТТІ түрде мына JSON форматында бер:
{
  "riskScore": 0-100 (жалпы тәуекел деңгейі),
  "riskLevel": "high" | "medium" | "low",
  "summary": "Қысқаша қорытынды (1-2 сөйлем)",
  "flags": [
    {
      "type": "critical" | "warning" | "info",
      "title": "Белгі атауы",
      "description": "Толық сипаттама",
      "indicator": "Қысқа индикатор"
    }
  ],
  "recommendation": "Толық ұсыныс"
}

Тек JSON қайтар, басқа мәтін жазба. Қазақ тілінде жауап бер.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tenderData } = await req.json();

    if (!tenderData || typeof tenderData !== "string" || tenderData.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Тендер деректері қажет" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "AI қызметі конфигурацияланбаған" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Analyzing tender data, length:", tenderData.length);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Мына тендерді талда:\n\n${tenderData}` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Сұраныс лимиті асылды, кейінірек қайталаңыз" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Кредит жеткіліксіз" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI қызметінде қате пайда болды" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "AI жауап бермеді" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse JSON from AI response (may have markdown code blocks)
    let parsed;
    try {
      const cleaned = content.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      return new Response(
        JSON.stringify({ error: "AI жауабын өңдеу мүмкін болмады", raw: content }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Analysis complete, risk score:", parsed.riskScore);

    // Save to database
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const saveRes = await fetch(`${supabaseUrl}/rest/v1/tender_analyses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          tender_text: tenderData.substring(0, 5000),
          risk_score: parsed.riskScore,
          risk_level: parsed.riskLevel,
          summary: parsed.summary,
          recommendation: parsed.recommendation,
          flags: parsed.flags,
        }),
      });
      if (!saveRes.ok) {
        console.error("Failed to save analysis:", await saveRes.text());
      } else {
        const saved = await saveRes.json();
        parsed.id = saved[0]?.id;
        console.log("Analysis saved with id:", parsed.id);
      }
    } catch (saveErr) {
      console.error("Save error:", saveErr);
    }

    return new Response(
      JSON.stringify({ success: true, analysis: parsed }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Analyze tender error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Белгісіз қате" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
