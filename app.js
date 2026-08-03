const PROJECT_CONFIG =
  window.PROJECT_CONFIG || {};

/**
 * Chuẩn hóa cấu hình dự án.
 */
function getProjectConfig() {
  return {
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
}

/**
 * Áp dụng thông tin dự án lên giao diện.
 */
function applyProjectConfig() {
  const config =
    getProjectConfig();

  document.title =
    `${config.projectName} | Dashboard`;

  document.documentElement.style.setProperty(
    "--primary-color",
    config.primaryColor
  );

  const projectName =
    document.getElementById("projectName");

  const projectDescription =
    document.getElementById(
      "projectDescription"
    );

  const projectLogo =
    document.getElementById("projectLogo");

  if (projectName) {
    projectName.textContent =
      config.projectName;
  }

  if (projectDescription) {
    projectDescription.textContent =
      config.projectDescription;
  }

  if (projectLogo) {
    projectLogo.textContent =
      config.projectCode;
  }

  setupSupportEmail(
    config.supportEmail
  );

  renderProjectNotes(
    config.notes
  );

  loadPowerBiReport(
    config.powerBiUrl
  );
}

/**
 * Hiển thị email hỗ trợ.
 */
function setupSupportEmail(email) {
  const supportEmail =
    document.getElementById(
      "supportEmail"
    );

  if (!supportEmail) {
    return;
  }

  supportEmail.textContent =
    email;

  supportEmail.href =
    `mailto:${email}`;
}

/**
 * Hiển thị ghi chú riêng của dự án.
 */
function renderProjectNotes(notes) {
  const noteList =
    document.getElementById(
      "projectNotes"
    );

  if (!noteList) {
    return;
  }

  noteList.innerHTML = "";

  const finalNotes =
    notes.length
      ? notes
      : [
          "Kiểm tra bộ lọc trước khi đối chiếu số liệu.",
          "Dữ liệu hiển thị theo phạm vi tài khoản được phân quyền."
        ];

  finalNotes.forEach((note) => {
    const listItem =
      document.createElement("li");

    listItem.textContent =
      note;

    noteList.appendChild(
      listItem
    );
  });
}

/**
 * Nhúng Power BI vào iframe.
 */
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

  if (!frame || !loadingMessage) {
    return;
  }

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

  frame.src =
    powerBiUrl;

  frame.addEventListener(
    "load",
    () => {
      loadingMessage.style.display =
        "none";
    }
  );

  window.setTimeout(() => {
    if (
      loadingMessage.style.display !==
      "none"
    ) {
      loadingMessage.textContent =
        "Dashboard đang tải hoặc yêu cầu đăng nhập Power BI.";
    }
  }, 15000);
}

/**
 * Chuyển đổi giữa tab Dashboard và Hướng dẫn sử dụng.
 */
function setupMainTabs() {
  const tabButtons =
    document.querySelectorAll(
      ".main-tab"
    );

  const views =
    document.querySelectorAll(
      ".main-view"
    );

  tabButtons.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        const targetView =
          button.dataset.view;

        tabButtons.forEach(
          (item) => {
            const isActive =
              item === button;

            item.classList.toggle(
              "active",
              isActive
            );

            item.setAttribute(
              "aria-selected",
              String(isActive)
            );
          }
        );

        views.forEach((view) => {
          const isTarget =
            view.id ===
            `${targetView}View`;

          view.classList.toggle(
            "active",
            isTarget
          );

          view.setAttribute(
            "aria-hidden",
            String(!isTarget)
          );
        });
      }
    );
  });
}

/**
 * Thiết lập accordion cho các card hướng dẫn.
 *
 * - Nhấn để mở/đóng card.
 * - Mỗi lần chỉ mở một card.
 * - Card đang mở sẽ chiếm toàn bộ chiều ngang.
 */
function setupGuideCards() {
  const guideCards =
    document.querySelectorAll(
      ".guide-card"
    );

  guideCards.forEach((card) => {
    const header =
      card.querySelector(
        ".guide-card-header"
      );

    if (!header) {
      return;
    }

    header.addEventListener(
      "click",
      () => {
        const isActive =
          card.classList.contains(
            "active"
          );

        guideCards.forEach(
          (item) => {
            item.classList.remove(
              "active"
            );

            const itemHeader =
              item.querySelector(
                ".guide-card-header"
              );

            if (itemHeader) {
              itemHeader.setAttribute(
                "aria-expanded",
                "false"
              );
            }
          }
        );

        if (!isActive) {
          card.classList.add(
            "active"
          );

          header.setAttribute(
            "aria-expanded",
            "true"
          );

          window.setTimeout(() => {
            card.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }, 100);
        }
      }
    );
  });
}

/**
 * Khởi chạy website.
 */
function initializeApplication() {
  applyProjectConfig();
  setupMainTabs();
  setupGuideCards();
}

initializeApplication();
