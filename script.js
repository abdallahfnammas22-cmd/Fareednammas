document.addEventListener("DOMContentLoaded", () => {
  const state = {
    page: "home",
    role: "طالب"
  };

  const knowledgeBase = [
    {
      keywords: ["السلامة", "ppe", "معدات الوقاية", "ورشة", "مخاطر", "حوادث"],
      answer:
        "بحسب منهج BTEC في الهندسة، السلامة في الورشة تشمل تقييم المخاطر، اتباع إجراءات الطوارئ، استخدام معدات الوقاية الشخصية المناسبة، والتأكد من خلو منطقة العمل من الأخطار قبل البدء."
    },
    {
      keywords: ["رياضيات", "math", "مثلثات", "قياس", "graph", "جبر"],
      answer:
        "وحدة الرياضيات لفنيي الهندسة تغطي الحسابات الأساسية، الرسوم البيانية، القياس، والجبر وحساب المثلثات لحل المسائل الهندسية."
    },
    {
      keywords: ["رسم", "drawing", "الرسم الهندسي", "أبعاد"],
      answer:
        "وحدة الرسم الهندسي تركز على قراءة الرسومات، فهم الأبعاد والرموز، واستخدام الرسم كوسيلة أساسية للتواصل الفني."
    },
    {
      keywords: ["لحام", "welding"],
      answer:
        "وحدة اللحام تشمل مبادئ اللحام، إجراءات السلامة، أنواع العمليات، وفهم الاستخدامات العملية في البيئات المهنية."
    },
    {
      keywords: ["دوائر", "circuit", "الكترون", "electrical", "مقاومة", "جهد", "تيار"],
      answer:
        "المحتوى الكهربائي في BTEC يغطي بناء الدوائر الكهربائية والإلكترونية، اختبارها، ومفاهيم مثل الجهد والتيار والمقاومة."
    },
    {
      keywords: ["مركبات", "سيارات", "vehicle", "صيانة المركبات"],
      answer:
        "وحدة صيانة المركبات تركز على الفحص والخدمة والصيانة وتشخيص الأعطال ضمن إطار مهني عملي."
    },
    {
      keywords: ["تحسين", "quality", "جودة"],
      answer:
        "تقنيات تحسين الأعمال في BTEC تهدف إلى رفع الكفاءة، دعم الجودة، وتقليل الهدر وتحسين الأداء."
    },
    {
      keywords: ["برمجة", "programming", "code"],
      answer:
        "وحدة البرمجة العامة تقدم أساسيات التفكير البرمجي، بناء الخوارزميات، والمنطق البرمجي."
    }
  ];

  function matchAnswer(question) {
    const q = question.trim().toLowerCase();

    const hit = knowledgeBase.find((item) =>
      item.keywords.some((keyword) => q.includes(keyword.toLowerCase()))
    );

    if (hit) return hit.answer;

    return "أنا مساعد BTEC مخصص فقط لمحتوى الهندسة الموجود في المنهج. اسألني عن السلامة، الرياضيات الهندسية، الرسم الهندسي، اللحام، الدوائر الكهربائية والإلكترونية، البرمجة، أو صيانة المركبات.";
  }

  function setActiveButton(buttons, activeValue, attrName) {
    buttons.forEach((btn) => {
      const isActive = btn.getAttribute(attrName) === activeValue;
      btn.classList.toggle("active", isActive);
    });
  }

  function showPage(pageName) {
    state.page = pageName;

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => {
      section.style.display =
        section.getAttribute("data-section") === pageName ? "block" : "none";
    });

    const pageButtons = document.querySelectorAll("[data-page]");
    setActiveButton(pageButtons, pageName, "data-page");
  }

  function setRole(roleName) {
    state.role = roleName;
    const roleButtons = document.querySelectorAll("[data-role]");
    setActiveButton(roleButtons, roleName, "data-role");
  }

  function appendMessage(role, text) {
    const messagesBox = document.querySelector("#assistant-messages");
    if (!messagesBox) return;

    const wrapper = document.createElement("div");
    wrapper.className = `message-row ${role}`;

    const bubble = document.createElement("div");
    bubble.className = `message-bubble ${role}`;
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    messagesBox.appendChild(wrapper);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function sendAssistantMessage(customText) {
    const input = document.querySelector("#assistant-input");
    if (!input && !customText) return;

    const question = (customText || input.value || "").trim();
    if (!question) return;

    appendMessage("user", question);
    appendMessage("assistant", matchAnswer(question));

    if (input) input.value = "";
  }

  function filterMaterials() {
    const input = document.querySelector("#materials-search");
    const cards = document.querySelectorAll(".unit-card");
    if (!input || !cards.length) return;

    const query = input.value.trim().toLowerCase();

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? "block" : "none";
    });
  }

  document.querySelectorAll("[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = btn.getAttribute("data-page");
      showPage(page);
    });
  });

  document.querySelectorAll("[data-role]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const role = btn.getAttribute("data-role");
      setRole(role);
    });
  });

  const askNowBtn = document.querySelector("#ask-now-btn");
  if (askNowBtn) {
    askNowBtn.addEventListener("click", () => showPage("assistant"));
  }

  const openAssistantBtn = document.querySelector("#open-assistant-btn");
  if (openAssistantBtn) {
    openAssistantBtn.addEventListener("click", () => showPage("assistant"));
  }

  const viewUnitsBtn = document.querySelector("#view-units-btn");
  if (viewUnitsBtn) {
    viewUnitsBtn.addEventListener("click", () => showPage("materials"));
  }

  const assistantSendBtn = document.querySelector("#assistant-send");
  if (assistantSendBtn) {
    assistantSendBtn.addEventListener("click", () => sendAssistantMessage());
  }

  const assistantInput = document.querySelector("#assistant-input");
  if (assistantInput) {
    assistantInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        sendAssistantMessage();
      }
    });
  }

  document.querySelectorAll("[data-question]").forEach((btn) => {
    btn.addEventListener("click", () => {
      sendAssistantMessage(btn.getAttribute("data-question"));
    });
  });

  const materialsSearch = document.querySelector("#materials-search");
  if (materialsSearch) {
    materialsSearch.addEventListener("input", filterMaterials);
  }

  showPage("home");
  setRole("طالب");
});
