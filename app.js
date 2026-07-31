const PROJECT_CONFIG = {
  // ===== CHỈNH THÔNG TIN DỰ ÁN TẠI ĐÂY =====
  projectName: "Acecook Merchandiser Dashboard",

  projectDescription:
    "Theo dõi kết quả vận hành và hiệu quả thực hiện",

  projectCode: "ACE",

  primaryColor: "#D71920",

  // Dán link Power BI dạng reportEmbed / Website or portal tại đây.
  powerBiUrl:
    "DÁN_LINK_POWER_BI_EMBED_VÀO_ĐÂY",

  supportEmail:
    "dashboard.support@company.com",

  notes: [
    "Dữ liệu hiển thị theo phạm vi tài khoản được phân quyền.",
    "Kiểm tra bộ lọc trước khi đối chiếu số liệu.",
    "Một số chỉ số sử dụng dữ liệu phát sinh gần nhất."
  ]
  // ==========================================
};

function applyProjectConfig() {
  document.title =
    `${PROJECT_CONFIG.projectName} | User Guide`;

  document.documentElement.style.setProperty(
    "--primary-color",
    PROJECT_CONFIG.primaryColor
  );

  document.getElementById("projectName").textContent =
    PROJECT_CONFIG.projectName;

  document.getElementById("projectDescription").textContent =
    PROJECT_CONFIG.projectDescription;

  document.getElementById("projectLogo").textContent =
    PROJECT_CONFIG.projectCode;

  const supportEmail =
    document.getElementById("supportEmail");

  supportEmail.textContent =
    PROJECT_CONFIG.supportEmail;

  supportEmail.href =
    `mailto:${PROJECT_CONFIG.supportEmail}`;

  renderProjectNotes();
  loadPowerBiReport();
}

function renderProjectNotes() {
  const noteList =
    document.getElementById("projectNotes");

  noteList.innerHTML = "";

  PROJECT_CONFIG.notes.forEach((note) => {
    const listItem =
      document.createElement("li");

    listItem.textContent = note;
    noteList.appendChild(listItem);
  });
}

function loadPowerBiReport() {
  const frame =
    document.getElementById("powerBiFrame");

  const loadingMessage =
    document.getElementById("loadingMessage");

  if (
    !PROJECT_CONFIG.powerBiUrl ||
    PROJECT_CONFIG.powerBiUrl.includes(
      "DÁN_LINK_POWER_BI"
    )
  ) {
    loadingMessage.textContent =
      "Chưa cấu hình link Power BI trong file app.js.";

    return;
  }

  frame.src = PROJECT_CONFIG.powerBiUrl;

  frame.addEventListener("load", () => {
    loadingMessage.style.display = "none";
  });
}

function setupGuideToggle() {
  const pageLayout =
    document.querySelector(".page-layout");

  const guideButton =
    document.getElementById("guideButton");

  guideButton.addEventListener("click", () => {
    const isHidden =
      pageLayout.classList.toggle("guide-hidden");

    guideButton.textContent =
      isHidden
        ? "Hiện hướng dẫn"
        : "Ẩn hướng dẫn";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyProjectConfig();
  setupGuideToggle();
});
