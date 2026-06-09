(function () {
  // ===== الأقسام الرئيسية =====
  const sections = [
    "cover",
    "about",
    "education",
    "experience",
    "my-work",
    "gallery",
    "contact",
  ];

  const dots = document.querySelector(".dots");
  const navLinks = Array.from(document.querySelectorAll(".site-header a"));

  // ===== إنشاء Pagination Dots =====
  sections.forEach((id) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Go to ${id}`);
    button.addEventListener("click", () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
    dots.appendChild(button);
  });

  const dotButtons = Array.from(dots.querySelectorAll("button"));

  // ===== تحديث الحالة النشطة =====
  const setActive = (id) => {
    // تحديث Navbar
    navLinks.forEach((link) =>
      link.classList.toggle("active", link.getAttribute("href") === "#" + id)
    );

    // تحديث Dots
    dotButtons.forEach((btn, index) =>
      btn.classList.toggle("active", sections[index] === id)
    );
  };

  // ===== Scroll Spy باستخدام IntersectionObserver =====
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible && visible.target && visible.target.id) {
        const sectionId = visible.target.id;
        setActive(sectionId);

        // ===== أنيميشن للكروت في قسم Our Services =====
        if (sectionId === "my-work") {
          document.querySelectorAll(".service-card").forEach((card, i) => {
            setTimeout(() => {
              card.classList.add("show");
            }, i * 150); // تأخير بسيط بين الكروت
          });
        }
      }
    },
    { threshold: [0.4, 0.6, 0.8] }
  );

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  // ===== Smooth Scrolling للروابط =====
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href")?.slice(1);
      const targetElement = targetId && document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ===== حالة مبدئية =====
  setActive(sections[0]);
})();
