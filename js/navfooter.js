document.addEventListener("DOMContentLoaded", function () {

    // ✅ 네비게이션 로드
    fetch("nav.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("nav-container").innerHTML = data;
            setupHamburgerMenu();

            // ✅ 저장된 언어 적용
            const savedLang = localStorage.getItem("selectedLanguage") || "en";
            switchLanguage(savedLang);
        });

    // ✅ 푸터 로드 (하나의 파일로 합쳤으므로 언어만 변경)
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-container").innerHTML = data;
            updateFooterLanguage(localStorage.getItem("selectedLanguage") || "en");
        });

    function setupHamburgerMenu() {
        const hamburger = document.querySelector(".hamburger");
        const menu = document.querySelector(".menu");

        if (!hamburger || !menu) return;

        hamburger.addEventListener("click", function (event) {
            event.stopPropagation();
            menu.classList.toggle("show");
        });

        document.addEventListener("click", function (event) {
            if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
                menu.classList.remove("show");
            }
        });
    }

    function switchLanguage(lang) {
        localStorage.setItem("selectedLanguage", lang);

        const langEn = document.getElementById("lang-en");
        const langKo = document.getElementById("lang-ko");
        const navbarBrand = document.querySelector(".navbar-brand");
        const navLinks = document.querySelectorAll(".nav-link");
        const contactButton = document.querySelector(".mobile-only");

        if (lang === "ko") {
            navbarBrand.href = "index_ko.html";
            navLinks.forEach(link => link.href = link.getAttribute("data-ko"));
            contactButton.href = "index_ko.html";

            langKo.classList.add("active");
            langEn.classList.remove("active");

            if (!window.location.pathname.includes("_ko.html")) {
                window.location.href = window.location.pathname.replace(".html", "_ko.html");
            }
        } else {
            navbarBrand.href = "index.html";
            navLinks.forEach(link => link.href = link.getAttribute("data-en"));
            contactButton.href = "index.html";

            langEn.classList.add("active");
            langKo.classList.remove("active");

            if (window.location.pathname.includes("_ko.html")) {
                window.location.href = window.location.pathname.replace("_ko.html", ".html");
            }
        }

        // ✅ 푸터 언어 변경 적용
        updateFooterLanguage(lang);
    }

    function updateFooterLanguage(lang) {
        const enFooter = document.querySelector(".footer-info.en");
        const koFooter = document.querySelector(".footer-info.ko");

        if (!enFooter || !koFooter) return;

        if (lang === "ko") {
            enFooter.style.display = "none";
            koFooter.style.display = "block";
        } else {
            enFooter.style.display = "block";
            koFooter.style.display = "none";
        }
    }

    // ✅ 언어 선택 버튼 이벤트 리스너 추가
    document.addEventListener("click", function (event) {
        if (event.target.id === "lang-en") {
            switchLanguage("en");
        } else if (event.target.id === "lang-ko") {
            switchLanguage("ko");
        }
    });

    // ✅ 페이지 로드 시 저장된 언어 유지
    switchLanguage(localStorage.getItem("selectedLanguage") || "en");
});
