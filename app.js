const PROJECT_CONFIG =
  window.PROJECT_CONFIG || {};

function applyProjectConfig() {
  const config = {
    projectName:
      PROJECT_CONFIG.projectName ||
      "Power BI Dashboard",

    projectDescription:
      PROJECT_CONFIG.projectDescription ||
      "Hướng dẫn sử dụng và tương tác báo cáo",

    projectCode:
      PROJECT_CONFIG.projectCode ||
      "BI",

    primaryColor:
      PROJECT_CONFIG.primaryColor ||
      "#2563EB",

    powerBiUrl:
      PROJECT_CONFIG.powerBiUrl ||
      "",

    supportEmail:
      PROJECT_CONFIG.supportEmail ||
      "dashboard.support@company.com",

    notes:
      Array.isArray(PROJECT_CONFIG.notes)
        ? PROJECT_CONFIG.notes
        : []
  };

  document.title =
    `${config.projectName} | User Guide`;

  document.documentElement.style.setProperty(
    "--primary-color",
    config.primaryColor
  );

  document.getElementById(
    "projectName"
  ).textContent =
    config.projectName;

  document.getElementById(
    "projectDescription"
  ).textContent =
    config.projectDescription;

  document.getElementById(
    "projectLogo"
  ).textContent =
    config.projectCode;

  const supportEmail =
    document.getElementById(
      "supportEmail"
    );

  supportEmail.textContent =
    config.supportEmail;

  supportEmail.href =
    `mailto:${config.supportEmail}`;

  renderProjectNotes(
    config.notes
  );

  loadPowerBiReport(
    config.powerBiUrl
  );
}

function renderProjectNotes(notes) {
  const noteList =
    document.getElementById(
      "projectNotes"
    );

  noteList.innerHTML = "";

  if (!notes.length) {
    const listItem =
      document.createElement("li");

    listItem.textContent =
      "Kiểm tra bộ lọc trước khi đối chiếu số liệu.";

    noteList.appendChild(
      listItem
    );

    return;
  }

  notes.forEach((note) => {
    const listItem =
      document.createElement("li");

    listItem.textContent = note;

    noteList.appendChild(
      listItem
    );
  });
}

function loadPowerBiReport(
  powerBiUrl
) {
  const frame =
    document.getElementById(
      "powerBiFrame"
    );

  const loadingMessage =
    document.getElementById(
      "loadingMessage"
    );

  if (
    !powerBiUrl ||
    powerBiUrl.includes(
      "DÁN_LINK_POWER_BI"
    )
  ) {
    loadingMessage.textContent =
      "Chưa cấu hình link Power BI cho dự án này.";

    return;
  }

  frame.src = powerBiUrl;

  frame.addEventListener(
    "load",
    () => {
      loadingMessage.style.display =
        "none";
    }
  );
}

function setupGuideToggle() {
  const pageLayout =
    document.querySelector(
      ".page-layout"
    );

  const guideButton =
    document.getElementById(
      "guideButton"
    );

  guideButton.addEventListener(
    "click",
    () => {
      const isHidden =
        pageLayout.classList.toggle(
          "guide-hidden"
        );

      guideButton.textContent =
        isHidden
          ? "Hiện hướng dẫn"
          : "Ẩn hướng dẫn";
    }
  );
}

applyProjectConfig();
setupGuideToggle();
