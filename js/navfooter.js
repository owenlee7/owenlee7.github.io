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

    // ✅ Contact Us 팝업 HTML 로드 및 이벤트 설정
    fetch("contactus.html")
        .then(response => response.text())
        .then(data => {
            // 팝업 HTML을 body의 맨 끝에 삽입
            document.body.insertAdjacentHTML("beforeend", data);

            // 팝업 관련 요소 가져오기 (ID contactModal는 그대로 사용)
            var contactus = document.getElementById("contactModal");
            var contactBtn = document.getElementById("contactBtn");
            var closeBtn = document.querySelector("#contactModal .close");

            // 팝업 열기 및 닫기 함수 (스크롤 방지 기능 제거)
            function openModal() {
                contactus.style.display = "block";
            }

            function closeModal() {
                contactus.style.display = "none";
            }

            // Contact Us 버튼 클릭 시 모달 열기
            if (contactBtn) {
                contactBtn.addEventListener("click", function (event) {
                    event.preventDefault(); // 기본 앵커 동작 방지
                    openModal();
                });
            }

            // 닫기 버튼 클릭 시 모달 닫기
            if (closeBtn) {
                closeBtn.addEventListener("click", function () {
                    closeModal();
                });
            }

            // 모달 영역 밖 클릭 시 모달 닫기
            window.addEventListener("click", function (event) {
                if (event.target === contactus) {
                    closeModal();
                }
            });

            // 폼 제출 처리 (데모용: 제출 후 알림 표시)
            var contactForm = document.getElementById("contactForm");
            if (contactForm) {
                contactForm.addEventListener("submit", function (event) {
                    alert("Thank you for contacting us!");
                    closeModal();
                });
            }
        });


    function setupHamburgerMenu() {
        const hamburger = document.querySelector(".hamburger");
        const menu = document.querySelector(".menu");
        let autoCloseTimer; // 타이머 변수를 선언합니다.

        if (!hamburger || !menu) return;

        hamburger.addEventListener("click", function (event) {
            event.stopPropagation();
            // 메뉴 토글
            menu.classList.toggle("show");

            // 기존 타이머가 있다면 제거
            if (autoCloseTimer) {
                clearTimeout(autoCloseTimer);
            }
            // 메뉴가 열린 상태라면, 5초 후 자동으로 닫히게 합니다.
            if (menu.classList.contains("show")) {
                autoCloseTimer = setTimeout(() => {
                    menu.classList.remove("show");
                }, 3000);
            }
        });

        document.addEventListener("click", function (event) {
            if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
                menu.classList.remove("show");
                if (autoCloseTimer) {
                    clearTimeout(autoCloseTimer);
                }
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
    // switchLanguage를 전역으로 노출
    window.switchLanguage = switchLanguage;

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
    // switchLanguage(localStorage.getItem("selectedLanguage") || "en");
});
