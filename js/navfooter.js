document.addEventListener("DOMContentLoaded", function () {

    // ✅ 네비게이션 로드
    fetch("nav.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("nav-container").innerHTML = data;
            setupHamburgerMenu();

            // ✅ 저장된 언어 적용
            const savedLang = localStorage.getItem("selectedLanguage") || "en";
            switchLanguage(savedLang, false);
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

    /**
     * switchLanguage 함수
     * @param {string} lang - "en" 또는 "ko"
     * @param {boolean} redirect - URL 리다이렉션 여부 (초기 로드 시 false로 호출 가능)
     */
    function switchLanguage(lang, redirect = true) {
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

            if (redirect) {
                // 루트나 영어 index일 경우 명시적으로 Korean index로 이동
                if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
                    window.location.href = "/index_ko.html";
                } 
                // 현재 URL에 ".html"이 포함되어 있고, 아직 "_ko.html"이 아닌 경우
                else if (window.location.pathname.endsWith(".html") && !window.location.pathname.includes("_ko.html")) {
                    window.location.href = window.location.pathname.replace(".html", "_ko.html");
                }
            }
        } else {
            navbarBrand.href = "index.html";
            navLinks.forEach(link => link.href = link.getAttribute("data-en"));
            contactButton.href = "index.html";

            langEn.classList.add("active");
            langKo.classList.remove("active");

            if (redirect) {
                // 루트나 한글 index일 경우 명시적으로 English index로 이동
                if (window.location.pathname === "/" || window.location.pathname === "/index_ko.html") {
                    window.location.href = "/index.html";
                } 
                // 현재 URL이 "_ko.html"을 포함하고 있을 경우
                else if (window.location.pathname.endsWith(".html") && window.location.pathname.includes("_ko.html")) {
                    window.location.href = window.location.pathname.replace("_ko.html", ".html");
                }
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
