import type { Locale } from "@/lib/i18n";
import type { ProjectProblemKey } from "@/lib/funnel";

export type ContactFormCopy = {
  eyebrow: string;
  headline: [string, string];
  intro: string;
  selectedProblem: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  organisation: string;
  organisationPlaceholder: string;
  website: string;
  websitePlaceholder: string;
  message: string;
  messagePlaceholder: string;
  optional: string;
  diagnosticTitle: string;
  diagnosticText: string;
  diagnosticFocus: string;
  diagnosticPlaceholder: string;
  diagnosticContext: string;
  diagnosticContextPlaceholder: string;
  problemOptions: Record<ProjectProblemKey, string>;
  privacy: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successText: string;
  successDiagnosticText: string;
  fallbackText: string;
  errorText: string;
  retry: string;
};

export const contactFormCopy: Record<Locale, ContactFormCopy> = {
  fr: {
    eyebrow: "COMMENCER LA DISCUSSION",
    headline: ["QUELQUES LIGNES", "SUFFISENT."],
    intro: "Parlez-moi de ce que vous cherchez à obtenir et de ce qui vous arrête aujourd’hui. Je lirai votre message personnellement avant de vous répondre.",
    selectedProblem: "Vous aviez repéré ce point :",
    name: "Votre prénom et votre nom", namePlaceholder: "Comment dois-je vous appeler ?",
    email: "Votre email", emailPlaceholder: "vous@entreprise.com",
    organisation: "Entreprise", organisationPlaceholder: "Nom de l’entreprise",
    website: "Site ou lien utile", websitePlaceholder: "https://",
    message: "Parlez-moi du projet", messagePlaceholder: "Ce que vous voulez obtenir, ce qui bloque et ce que vous avez déjà essayé…",
    optional: "facultatif",
    diagnosticTitle: "Je souhaite aussi une première lecture de ce qu’il faudrait diagnostiquer.",
    diagnosticText: "J’examinerai les éléments partagés avant de vous répondre. Il ne s’agit ni d’un verdict automatique ni d’un audit générique.",
    diagnosticFocus: "Que dois-je regarder en priorité ?", diagnosticPlaceholder: "Choisir un point",
    diagnosticContext: "Un détail à ne pas manquer", diagnosticContextPlaceholder: "Un chiffre, une étape, un outil ou un comportement qui vous semble important…",
    problemOptions: { conversion: "Parcours et conversion", "manual-work": "Travail manuel et automatisation", systems: "Outils, données et connexions", strategy: "Stratégie et priorités" },
    privacy: "Ces informations servent uniquement à comprendre votre demande et à vous répondre. Elles ne vous inscrivent à aucune newsletter.",
    submit: "ENVOYER À GARY", submitting: "ENVOI EN COURS…",
    successTitle: "C’EST ENVOYÉ.", successText: "Merci. Je vais lire personnellement ce que vous m’avez partagé avant de revenir vers vous.",
    successDiagnosticText: "Je regarderai également les éléments indiqués pour préparer une première lecture utile.",
    fallbackText: "Votre messagerie va s’ouvrir avec le message déjà préparé. Il ne vous restera qu’à l’envoyer.",
    errorText: "Le message n’a pas pu partir. Réessayez ou utilisez l’email ou WhatsApp juste au-dessus.", retry: "RÉESSAYER",
  },
  en: {
    eyebrow: "START THE CONVERSATION", headline: ["A FEW LINES", "ARE ENOUGH."],
    intro: "Tell me what you are trying to achieve and what is getting in the way. I will read your message personally before I reply.",
    selectedProblem: "You had identified this point:",
    name: "Your name", namePlaceholder: "What should I call you?", email: "Your email", emailPlaceholder: "you@company.com",
    organisation: "Company", organisationPlaceholder: "Company name", website: "Website or useful link", websitePlaceholder: "https://",
    message: "Tell me about the project", messagePlaceholder: "What you want to achieve, what is stuck, and what you have already tried…", optional: "optional",
    diagnosticTitle: "I would also like an initial view of what needs to be diagnosed.",
    diagnosticText: "I will review what you share before replying. This is not an automated verdict or a generic audit.",
    diagnosticFocus: "What should I look at first?", diagnosticPlaceholder: "Choose one area",
    diagnosticContext: "One detail I should not miss", diagnosticContextPlaceholder: "A number, step, tool, or behavior that seems important…",
    problemOptions: { conversion: "Journey and conversion", "manual-work": "Manual work and automation", systems: "Tools, data, and connections", strategy: "Strategy and priorities" },
    privacy: "This information is used only to understand your request and reply. It will not subscribe you to a newsletter.",
    submit: "SEND TO GARY", submitting: "SENDING…", successTitle: "MESSAGE SENT.",
    successText: "Thank you. I will personally read what you shared before getting back to you.", successDiagnosticText: "I will also review the points you identified so I can prepare a useful first view.",
    fallbackText: "Your email app will open with the message already prepared. You will only need to send it.",
    errorText: "The message could not be sent. Try again or use email or WhatsApp above.", retry: "TRY AGAIN",
  },
  es: {
    eyebrow: "EMPEZAR LA CONVERSACIÓN", headline: ["CON UNAS LÍNEAS", "ES SUFICIENTE."],
    intro: "Cuéntame qué quieres conseguir y qué te está frenando hoy. Leeré personalmente tu mensaje antes de responderte.",
    selectedProblem: "Habías identificado este punto:",
    name: "Tu nombre", namePlaceholder: "¿Cómo quieres que te llame?", email: "Tu email", emailPlaceholder: "tu@empresa.com",
    organisation: "Empresa", organisationPlaceholder: "Nombre de la empresa", website: "Sitio o enlace útil", websitePlaceholder: "https://",
    message: "Cuéntame sobre el proyecto", messagePlaceholder: "Qué quieres conseguir, qué está frenando el avance y qué ya intentaste…", optional: "opcional",
    diagnosticTitle: "También quiero una primera lectura de lo que conviene diagnosticar.",
    diagnosticText: "Revisaré lo que compartas antes de responderte. No es un veredicto automático ni una auditoría genérica.",
    diagnosticFocus: "¿Qué debería revisar primero?", diagnosticPlaceholder: "Elige un punto",
    diagnosticContext: "Un detalle que no debería pasar por alto", diagnosticContextPlaceholder: "Una cifra, una etapa, una herramienta o un comportamiento importante…",
    problemOptions: { conversion: "Recorrido y conversión", "manual-work": "Trabajo manual y automatización", systems: "Herramientas, datos y conexiones", strategy: "Estrategia y prioridades" },
    privacy: "Estos datos solo se usarán para entender tu solicitud y responderte. No te inscriben a ningún boletín.",
    submit: "ENVIAR A GARY", submitting: "ENVIANDO…", successTitle: "YA ESTÁ ENVIADO.",
    successText: "Gracias. Leeré personalmente lo que compartiste antes de responderte.", successDiagnosticText: "También revisaré los puntos indicados para preparar una primera lectura útil.",
    fallbackText: "Se abrirá tu aplicación de correo con el mensaje preparado. Solo tendrás que enviarlo.",
    errorText: "No se pudo enviar el mensaje. Inténtalo otra vez o usa el email o WhatsApp de arriba.", retry: "INTENTAR DE NUEVO",
  },
  pt: {
    eyebrow: "COMEÇAR A CONVERSA", headline: ["ALGUMAS LINHAS", "JÁ BASTAM."],
    intro: "Conte o que você quer alcançar e o que está travando hoje. Vou ler sua mensagem pessoalmente antes de responder.",
    selectedProblem: "Você tinha identificado este ponto:",
    name: "Seu nome", namePlaceholder: "Como devo chamar você?", email: "Seu e-mail", emailPlaceholder: "voce@empresa.com",
    organisation: "Empresa", organisationPlaceholder: "Nome da empresa", website: "Site ou link útil", websitePlaceholder: "https://",
    message: "Conte sobre o projeto", messagePlaceholder: "O que você quer alcançar, o que está travando e o que já tentou…", optional: "opcional",
    diagnosticTitle: "Também quero uma primeira leitura do que precisa ser diagnosticado.",
    diagnosticText: "Vou analisar o que você compartilhar antes de responder. Não é um diagnóstico automático nem uma auditoria genérica.",
    diagnosticFocus: "O que devo analisar primeiro?", diagnosticPlaceholder: "Escolha um ponto",
    diagnosticContext: "Um detalhe que eu não devo ignorar", diagnosticContextPlaceholder: "Um número, etapa, ferramenta ou comportamento importante…",
    problemOptions: { conversion: "Jornada e conversão", "manual-work": "Trabalho manual e automação", systems: "Ferramentas, dados e conexões", strategy: "Estratégia e prioridades" },
    privacy: "Essas informações serão usadas apenas para entender seu pedido e responder. Você não será inscrito em nenhuma newsletter.",
    submit: "ENVIAR PARA GARY", submitting: "ENVIANDO…", successTitle: "MENSAGEM ENVIADA.",
    successText: "Obrigado. Vou ler pessoalmente o que você compartilhou antes de responder.", successDiagnosticText: "Também vou analisar os pontos indicados para preparar uma primeira leitura útil.",
    fallbackText: "Seu aplicativo de e-mail será aberto com a mensagem pronta. Você só precisará enviar.",
    errorText: "Não foi possível enviar. Tente novamente ou use o e-mail ou WhatsApp acima.", retry: "TENTAR NOVAMENTE",
  },
  gcf: {
    eyebrow: "KOUMANSÉ PALÉ", headline: ["DÉOTWA LIGN", "JA SIFI."],
    intro: "Di-mwen ka ou vlé rivé fè é ka ki ka frenné-w jòdijou. An ké li mésaj a-w mwenmen avan an réponn-vou.",
    selectedProblem: "Ou té ja vwè pwen-lasa:",
    name: "Non a-w", namePlaceholder: "Kijan pou an kriyé-w?", email: "Imèl a-w", emailPlaceholder: "ou@antrepriz.com",
    organisation: "Antrepriz", organisationPlaceholder: "Non a antrepriz-la", website: "Sit oben lyen itil", websitePlaceholder: "https://",
    message: "Palé-mwen dè pwojé-la", messagePlaceholder: "Ka ou vlé rivé fè, ka ki ka frenné-w é ka ou ja éséyé…", optional: "si ou vlé",
    diagnosticTitle: "An vlé osi ou fè on prèmyé gadé asi sa ki mérité analizé.",
    diagnosticText: "An ké gadé enfòmasyon-la avan an réponn-vou. A pa on répons otomatik ni on analiz menm biten ba toutmoun.",
    diagnosticFocus: "Ka pou an gadé an prèmyé?", diagnosticPlaceholder: "Chwazi on pwen",
    diagnosticContext: "On détay pou an pa oubliyé", diagnosticContextPlaceholder: "On chif, on étap, on zouti oben on konpòtasyon ki enpòtan…",
    problemOptions: { conversion: "Chimen kliyan é konvèsyon", "manual-work": "Travay a la men é otomatik", systems: "Zouti, doné é koneksyon", strategy: "Stratéji é priyorité" },
    privacy: "Enfòmasyon-lasa ké sèvi sèlman pou konprann demann a-w é réponn-vou. Yo pé ké mété-w adan pon newsletter.",
    submit: "VOYÉ BA GARY", submitting: "KA VOYÉ…", successTitle: "MÉSAJ-LA PATI.",
    successText: "Mèsi. An ké li sa ou voyé la mwenmen avan an réponn-vou.", successDiagnosticText: "An ké gadé osi sé pwen-la ou maké la pou paré on prèmyé analiz ki itil.",
    fallbackText: "Aplikasyon imèl a-w ké wouvè èvè mésaj-la ja paré. Sé voyé tousèl ki ké rété.",
    errorText: "Mésaj-la pa rivé pati. Éséyé ankò oben sèvi èvè imèl-la oben WhatsApp anho la.", retry: "ÉSÉYÉ ANKÒ",
  },
  ar: {
    eyebrow: "ابدأ الحوار", headline: ["بضع كلمات", "تكفي."],
    intro: "أخبرني بما تريد تحقيقه وما الذي يعيقك اليوم. سأقرأ رسالتك بنفسي قبل أن أجيبك.",
    selectedProblem: "كنت قد حددت هذه النقطة:",
    name: "الاسم", namePlaceholder: "بأي اسم أخاطبك؟", email: "البريد الإلكتروني", emailPlaceholder: "you@company.com",
    organisation: "الشركة", organisationPlaceholder: "اسم الشركة", website: "الموقع أو رابط مفيد", websitePlaceholder: "https://",
    message: "حدثني عن المشروع", messagePlaceholder: "ما الذي تريد تحقيقه، وما الذي يعيقك، وما الذي جربته حتى الآن…", optional: "اختياري",
    diagnosticTitle: "أرغب أيضًا في قراءة أولية لما ينبغي تشخيصه.",
    diagnosticText: "سأراجع ما تشاركه قبل الرد. لن يكون ذلك حكمًا آليًا أو تدقيقًا عامًا.",
    diagnosticFocus: "ما الذي ينبغي أن أراجعه أولًا؟", diagnosticPlaceholder: "اختر نقطة",
    diagnosticContext: "تفصيل مهم لا ينبغي إغفاله", diagnosticContextPlaceholder: "رقم أو خطوة أو أداة أو سلوك تراه مهمًا…",
    problemOptions: { conversion: "المسار والتحويل", "manual-work": "العمل اليدوي والأتمتة", systems: "الأدوات والبيانات والربط", strategy: "الاستراتيجية والأولويات" },
    privacy: "تُستخدم هذه المعلومات فقط لفهم طلبك والرد عليك، ولن تُضاف إلى أي نشرة بريدية.",
    submit: "إرسال إلى غاري", submitting: "جارٍ الإرسال…", successTitle: "تم الإرسال.",
    successText: "شكرًا. سأقرأ بنفسي ما شاركته قبل أن أعود إليك.", successDiagnosticText: "وسأراجع أيضًا النقاط التي حددتها لإعداد قراءة أولية مفيدة.",
    fallbackText: "سيفتح تطبيق البريد لديك برسالة جاهزة، ولن يبقى سوى إرسالها.",
    errorText: "تعذر إرسال الرسالة. حاول مرة أخرى أو استخدم البريد الإلكتروني أو واتساب أعلاه.", retry: "المحاولة مجددًا",
  },
  ja: {
    eyebrow: "相談を始める", headline: ["数行だけで", "十分です。"],
    intro: "実現したいことと、今どこで止まっているかを教えてください。内容は私自身が確認してからお返事します。",
    selectedProblem: "先ほど選んだ課題：",
    name: "お名前", namePlaceholder: "お名前をご記入ください", email: "メールアドレス", emailPlaceholder: "you@company.com",
    organisation: "会社名", organisationPlaceholder: "会社名", website: "Webサイト・参考URL", websitePlaceholder: "https://",
    message: "プロジェクトについて", messagePlaceholder: "実現したいこと、止まっている理由、これまで試したこと…", optional: "任意",
    diagnosticTitle: "必要な診断ポイントについて、初期見解も希望します。",
    diagnosticText: "返信前に共有内容を確認します。自動判定や画一的な監査ではありません。",
    diagnosticFocus: "最初に確認すべき点", diagnosticPlaceholder: "項目を選択",
    diagnosticContext: "見落としてほしくない点", diagnosticContextPlaceholder: "重要な数値、工程、ツール、ユーザー行動など…",
    problemOptions: { conversion: "導線・コンバージョン", "manual-work": "手作業・自動化", systems: "ツール・データ・連携", strategy: "戦略・優先順位" },
    privacy: "入力情報はご相談内容の確認と返信のみに使用し、ニュースレターには登録しません。",
    submit: "GARYに送る", submitting: "送信中…", successTitle: "送信しました。",
    successText: "ありがとうございます。内容を私自身が確認してからご連絡します。", successDiagnosticText: "ご指定の点も確認し、役立つ初期見解を準備します。",
    fallbackText: "入力内容を反映したメール画面が開きます。内容を確認して送信してください。",
    errorText: "送信できませんでした。再試行するか、上のメールまたはWhatsAppをご利用ください。", retry: "再試行",
  },
  zh: {
    eyebrow: "开始沟通", headline: ["几句话", "就够了。"],
    intro: "告诉我你想实现什么，以及目前卡在哪里。我会亲自阅读后再回复你。",
    selectedProblem: "你刚才关注的是：",
    name: "姓名", namePlaceholder: "我该如何称呼你？", email: "邮箱", emailPlaceholder: "you@company.com",
    organisation: "公司", organisationPlaceholder: "公司名称", website: "网站或相关链接", websitePlaceholder: "https://",
    message: "介绍一下项目", messagePlaceholder: "你想实现什么、目前卡在哪里、已经尝试过什么…", optional: "选填",
    diagnosticTitle: "我也希望你先判断一下哪些部分值得进一步诊断。",
    diagnosticText: "我会在回复前查看你提供的信息。这不是自动判定，也不是套用模板的审计。",
    diagnosticFocus: "应该先看哪一部分？", diagnosticPlaceholder: "选择一项",
    diagnosticContext: "不能忽略的细节", diagnosticContextPlaceholder: "重要的数据、步骤、工具或用户行为…",
    problemOptions: { conversion: "用户路径与转化", "manual-work": "手工工作与自动化", systems: "工具、数据与连接", strategy: "战略与优先级" },
    privacy: "这些信息仅用于理解你的需求并回复，不会自动订阅任何邮件通讯。",
    submit: "发送给 GARY", submitting: "正在发送…", successTitle: "已发送。",
    successText: "谢谢。我会亲自阅读你提供的信息后再联系你。", successDiagnosticText: "我也会查看你指出的部分，为第一次沟通准备有用的判断。",
    fallbackText: "系统将打开邮件应用并填好内容，你只需确认发送。",
    errorText: "消息未能发送。请重试，或使用上方的邮箱或 WhatsApp。", retry: "重试",
  },
  ko: {
    eyebrow: "대화 시작하기", headline: ["몇 줄이면", "충분합니다."],
    intro: "무엇을 이루고 싶은지, 지금 어디에서 막혀 있는지 알려주세요. 제가 직접 읽고 답변드리겠습니다.",
    selectedProblem: "앞에서 선택한 문제:",
    name: "이름", namePlaceholder: "어떻게 불러드리면 될까요?", email: "이메일", emailPlaceholder: "you@company.com",
    organisation: "회사", organisationPlaceholder: "회사명", website: "웹사이트 또는 참고 링크", websitePlaceholder: "https://",
    message: "프로젝트 이야기", messagePlaceholder: "원하는 결과, 막혀 있는 지점, 지금까지 시도한 내용…", optional: "선택",
    diagnosticTitle: "무엇을 진단해야 할지에 대한 첫 검토도 받고 싶습니다.",
    diagnosticText: "답변 전에 공유해 주신 내용을 살펴봅니다. 자동 판정이나 정형화된 감사가 아닙니다.",
    diagnosticFocus: "무엇을 먼저 봐야 할까요?", diagnosticPlaceholder: "항목 선택",
    diagnosticContext: "놓치지 말아야 할 내용", diagnosticContextPlaceholder: "중요한 수치, 단계, 도구 또는 사용자 행동…",
    problemOptions: { conversion: "사용자 여정과 전환", "manual-work": "수작업과 자동화", systems: "도구, 데이터와 연결", strategy: "전략과 우선순위" },
    privacy: "입력 정보는 문의 내용을 이해하고 답변하는 데만 사용되며 뉴스레터에 등록되지 않습니다.",
    submit: "GARY에게 보내기", submitting: "보내는 중…", successTitle: "전송되었습니다.",
    successText: "감사합니다. 보내주신 내용을 제가 직접 확인한 뒤 연락드리겠습니다.", successDiagnosticText: "표시한 내용도 함께 살펴보고 도움이 되는 첫 검토를 준비하겠습니다.",
    fallbackText: "작성 내용이 포함된 이메일 창이 열립니다. 확인 후 보내기만 하면 됩니다.",
    errorText: "메시지를 보내지 못했습니다. 다시 시도하거나 위의 이메일 또는 WhatsApp을 이용해 주세요.", retry: "다시 시도",
  },
};
