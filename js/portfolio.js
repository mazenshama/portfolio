(function() {
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
    // ده عشان يغير لون اللينكات في الناف بار بس
    const navLinks = Array.from(document.querySelectorAll(".site-header a"));

    // التعديل هنا: تحديد كل الروابط في الصفحة اللي بتشاور على سكشن داخلي (بما فيها زرار Hire Me)
    const allInternalLinks = document.querySelectorAll('a[href^="#"]');

    // ===== متغيرات لمنع تداخل الـ Scroll =====
    let isScrolling = false;
    let scrollTimeout;

    // ===== إنشاء Pagination Dots =====
    sections.forEach((id) => {
        const button = document.createElement("button");
        button.type = "button";
        button.setAttribute("aria-label", `Go to ${id}`);
        button.addEventListener("click", () => {
            isScrolling = true;
            setActive(id);
            history.replaceState(null, null, `#${id}`);

            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 1000);
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

                if (!isScrolling) {
                    setActive(sectionId);
                    history.replaceState(null, null, `#${sectionId}`);
                }

                // ===== أنيميشن للكروت في قسم Our Services =====
                if (sectionId === "my-work") {
                    document.querySelectorAll(".service-card").forEach((card, i) => {
                        setTimeout(() => {
                            card.classList.add("show");
                        }, i * 150);
                    });
                }
            }
        }, { threshold: [0.4, 0.6, 0.8] }
    );

    sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

    // ===== Smooth Scrolling لجميع الروابط الداخلية (التعديل الجديد) =====
    allInternalLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href")?.slice(1);
            const targetElement = targetId && document.getElementById(targetId);

            if (targetElement) {
                // إيقاف الـ Observer مؤقتاً
                isScrolling = true;
                setActive(targetId);
                history.replaceState(null, null, `#${targetId}`);

                targetElement.scrollIntoView({ behavior: "smooth" });

                // إعادة تشغيل الـ Observer بعد ثانية
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            }
        });
    });

    // ===== حالة مبدئية =====
    setActive(sections[0]);
})();