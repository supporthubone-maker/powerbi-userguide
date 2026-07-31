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
 * Hiển thị thông tin dự án.
 */
function applyProjectConfig() {
  const config =
    getProjectConfig();

  document.title =
    `${config.projectName} | User Guide`;

  document.documentElement.style.setProperty(
    "--primary-color",
    config.primaryColor
  );

  const projectName =
    document.getElementById(
      "projectName"
    );

  const projectDescription =
    document.getElementById(
      "projectDescription"
    );

  const projectLogo =
    document.getElementById(
      "projectLogo"
    );

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
function setupSupportEmail(
  email
) {
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
function renderProjectNotes(
  notes
) {
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

  /*
    Nếu iframe tải lâu, vẫn giữ thông báo.
    Sau 15 giây sẽ đổi nội dung để user biết.
  */
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
 * Ẩn hoặc hiện toàn bộ panel User Guide.
 */
function setupGuideToggle() {
  const pageLayout =
    document.querySelector(
      ".page-layout"
    );

  const guideButton =
    document.getElementById(
      "guideButton"
    );

  if (
    !pageLayout ||
    !guideButton
  ) {
    return;
  }

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

/**
 * Thiết lập tương tác accordion cho các card.
 *
 * - Nhấn card để mở nội dung chi tiết.
 * - Mỗi lần chỉ mở một card.
 * - Nhấn lại card đang mở để đóng.
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

        /*
          Đóng tất cả card trước.
        */
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

        /*
          Nếu card vừa nhấn chưa mở,
          tiến hành mở card đó.
        */
        if (!isActive) {
          card.classList.add(
            "active"
          );

          header.setAttribute(
            "aria-expanded",
            "true"
          );

          /*
            Cuộn card vào vùng dễ nhìn.
          */
          window.setTimeout(() => {
            card.scrollIntoView({
              behavior: "smooth",
              block: "nearest"
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
  setupGuideToggle();
  setupGuideCards();
}

initializeApplication();
