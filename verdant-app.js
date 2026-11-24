(function () {
  "use strict";

  function setFormStatus(form, message, isError = false) {
    let status = form.querySelector(".form-status, .newsletter-status");
    if (!status) {
      status = document.createElement("p");
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      status.className = "form-status";
      form.appendChild(status);
    }

    status.textContent = message;
    status.style.color = isError ? "#b54747" : "";
  }

  function initializeSmoothNavigation() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function initializeNewsletter() {
    document.querySelectorAll(".newsletter-form").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        setFormStatus(form, "You’re subscribed to Verdant updates.");
        form.reset();
      });
    });
  }

  function initializeLogin() {
    const form = document.querySelector(".login-card");
    if (!form) return;

    const roleInput = form.querySelector("#login-role");
    const roleNote = form.querySelector("#role-note");
    const customerFields = form.querySelector("#customer-fields");
    const adminFields = form.querySelector("#admin-fields");
    const forgotPassword = form.querySelector("#forgot-password");
    const resetPanel = form.querySelector("#reset-panel");
    const verificationMethod = form.querySelector("#verification-method");
    const verificationValue = form.querySelector("#verification-value");
    const verificationCode = form.querySelector("#verification-code");
    const sendCode = form.querySelector("#send-code");
    const verifyReset = form.querySelector("#verify-reset");

    form.querySelectorAll(".role-button").forEach((button) => {
      button.addEventListener("click", () => {
        form.querySelectorAll(".role-button").forEach((item) => {
          item.classList.remove("active");
          item.setAttribute("aria-selected", "false");
        });
        button.classList.add("active");
        button.setAttribute("aria-selected", "true");
        roleInput.value = button.dataset.role;
        const isAdmin = button.dataset.role === "admin";
        customerFields.hidden = isAdmin;
        adminFields.hidden = !isAdmin;
        forgotPassword.hidden = isAdmin;
        resetPanel.classList.remove("open");
        form.querySelector("#email").required = !isAdmin;
        form.querySelector("#password").required = !isAdmin;
        form.querySelector("#username").required = isAdmin;
        form.querySelector("#admin-password").required = isAdmin;
        roleNote.textContent = button.dataset.role === "admin"
          ? "Admin login opens the saved enquiries page."
          : "Customer login redirects to the Verdant home page.";
      });
    });

    forgotPassword.addEventListener("click", () => {
      resetPanel.classList.toggle("open");
      if (resetPanel.classList.contains("open")) verificationValue.focus();
    });

    verificationMethod.addEventListener("change", () => {
      verificationValue.type = verificationMethod.value === "email" ? "email" : "tel";
      verificationValue.placeholder = verificationMethod.value === "email"
        ? "you@example.com"
        : "+1 555 000 0000";
    });

    sendCode.addEventListener("click", () => {
      if (!verificationValue.value.trim()) {
        setFormStatus(form, "Enter your email address or mobile number.", true);
        verificationValue.focus();
        return;
      }
      const method = verificationMethod.value === "email" ? "email" : "mobile number";
      setFormStatus(form, `A verification code was sent to your ${method}.`);
      verificationCode.focus();
    });

    verifyReset.addEventListener("click", () => {
      if (!verificationCode.value.trim()) {
        setFormStatus(form, "Enter the verification code.", true);
        verificationCode.focus();
        return;
      }
      if (!/^\d{6}$/.test(verificationCode.value)) {
        setFormStatus(form, "The verification code must contain 6 digits.", true);
        verificationCode.focus();
        return;
      }
      setFormStatus(form, "Verification successful. Password reset can now continue.");
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const email = form.elements.email?.value.trim() || "";
      const password = form.elements.password?.value || "";
      const username = form.elements.username?.value.trim() || "";
      const adminPassword = form.elements.adminPassword?.value || "";
      const role = roleInput.value;
      const strongAdminPassword =
        /[A-Z]/.test(adminPassword)
        && /[a-z]/.test(adminPassword)
        && /[^A-Za-z0-9]/.test(adminPassword)
        && adminPassword.length >= 12;
      const isAdmin = role === "admin"
        && username === "VerdantAdmin"
        && adminPassword === "Verdant@Admin123"
        && strongAdminPassword;
      if (!isAdmin && role === "admin") {
        setFormStatus(form, "Invalid admin username or password.", true);
        return;
      }

      const status = form.querySelector(".form-status") || document.createElement("p");
      status.className = "form-status";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      status.textContent = role === "admin"
        ? "Admin login successful. Redirecting..."
        : "Customer login successful. Redirecting...";
      status.style.marginTop = "12px";
      status.style.color = "#167a4a";
      status.style.textAlign = "center";
      if (!status.parentNode) form.appendChild(status);

      if (role === "admin") {
        sessionStorage.setItem("verdantAdminSession", "active");
      } else {
        sessionStorage.removeItem("verdantAdminSession");
        sessionStorage.setItem("verdantCustomerSession", "active");
      }
      window.setTimeout(() => {
        window.location.href = role === "admin" ? "Enquiries.html" : "Home.html";
      }, 900);
    });
  }

  function initializeEnquiry() {
    const form = document.querySelector("#enquiry-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const submission = {
        id: Date.now(),
        email: form.elements.email.value.trim(),
        phoneCode: form.elements.phoneCode.value,
        phone: form.elements.phone.value.trim(),
        address: form.elements.address.value.trim(),
        state: form.elements.state.value.trim(),
        country: form.elements.country.value,
        submittedAt: new Date().toISOString()
      };

      const submissions = JSON.parse(localStorage.getItem("verdantEnquiries") || "[]");
      submissions.unshift(submission);
      localStorage.setItem("verdantEnquiries", JSON.stringify(submissions));

      setFormStatus(form, "Thank you! A Verdant advisor will contact you shortly.");
      form.reset();
    });
  }

  function initializePhoneCodeSync() {
    const countrySelect = document.querySelector("#country");
    const phoneCode = document.querySelector("#phone-code");
    if (!countrySelect || !phoneCode) return;

    const countryCodes = {
      "Australia": "+61", "Bahrain": "+973", "Bangladesh": "+880",
      "Belgium": "+32", "Brazil": "+55", "China": "+86",
      "Denmark": "+45", "Egypt": "+20", "France": "+33",
      "Germany": "+49", "India": "+91", "Indonesia": "+62",
      "Italy": "+39", "Japan": "+81", "Kenya": "+254",
      "Kuwait": "+965", "Malaysia": "+60", "Mexico": "+52",
      "Nepal": "+977", "Netherlands": "+31", "New Zealand": "+64",
      "Nigeria": "+234", "Norway": "+47", "Oman": "+968",
      "Pakistan": "+92", "Philippines": "+63", "Qatar": "+974",
      "Russia": "+7", "Saudi Arabia": "+966", "Singapore": "+65",
      "South Africa": "+27", "South Korea": "+82", "Spain": "+34",
      "Sri Lanka": "+94", "Sweden": "+46", "Switzerland": "+41",
      "Thailand": "+66", "Turkey": "+90", "United Arab Emirates": "+971",
      "United Kingdom": "+44", "United States": "+1"
    };

    countrySelect.addEventListener("change", () => {
      if (countryCodes[countrySelect.value]) {
        phoneCode.value = countryCodes[countrySelect.value];
      }
    });
  }

  function initializeSocialLinks() {
    document.querySelectorAll(".footer-social a").forEach((link) => {
      link.addEventListener("click", (event) => event.preventDefault());
    });
  }

  function initializePageEntrance() {
    document.body.classList.add("verdant-page-ready");
  }

  document.addEventListener("DOMContentLoaded", () => {
    initializeSmoothNavigation();
    initializeNewsletter();
    initializeLogin();
    initializeEnquiry();
    initializePhoneCodeSync();
    initializeSocialLinks();
    initializePageEntrance();
  });
})();
