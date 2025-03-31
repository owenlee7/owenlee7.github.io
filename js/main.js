window.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    const path = window.location.pathname;
    const isIndex = path === "/" || path.includes("index.html") || path.includes("index_ko.html");
    const isGS1 = path.includes("GS1.html") || path.includes("GS1_ko.html");
    const isDPP = path.includes("DPP.html") || path.includes("DPP_ko.html");

    

    if (isIndex) {
        console.log("✅ Index 페이지에서 실행");

        gsap.set("#sec02 .W_UI img, #sec02 .M_UI img", { opacity: 0, y: 200 });

        let tl_index_sec02 = gsap.timeline({
            scrollTrigger: {
                trigger: "#sec02",
                start: "top 10%",
                end: "top 50%",
                scrub: 4,
                markers: false,
            }
        });

        tl_index_sec02.to("#sec02 .W_UI img", {
            opacity: 1,
            y: 0,
            duration: 6,
            ease: "power2.out"
        });

        tl_index_sec02.to("#sec02 .M_UI img", {
            opacity: 1,
            y: 0,
            duration: 6,
            ease: "power2.out"
        }, "+=1");

        gsap.set("#sec03 .img-common", { opacity: 0, x: 100 });

        gsap.to("#sec03 .img-common", {
            scrollTrigger: {
                trigger: "#sec03 .img-container",
                start: "top 85%",
                end: "top 50%",
                scrub: 4,
                markers: false,
                toggleActions: "play none none reset"
            },
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.5
        });

        gsap.set("#sec04 .column-left, #sec04 .column-right", { opacity: 0, y: 100 });

        let tl_index_sec04 = gsap.timeline({
            scrollTrigger: {
                trigger: "#sec04",
                start: "top 40%",
                end: "top 50%",
                scrub: 4,
                markers: false,
                toggleActions: "play none none reset"
            }
        });

        tl_index_sec04.to("#sec04 .column-left", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out"
        });

        tl_index_sec04.to("#sec04 .column-right", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out"
        }, "-=0.5");

        gsap.set("#sec05 .img-container", { opacity: 0, x: 100 });

        gsap.to("#sec05 .img-container", {
            scrollTrigger: {
                trigger: "#sec05",
                start: "top 20%",
                end: "top 100%",
                scrub: 5,
                markers: false,
                toggleActions: "play none none reset"
            },
            opacity: 1,
            x: -10,
            duration: 1.5,
            ease: "power2.out"
        });
    }

    if (isGS1) {
        console.log("✅ GS1 페이지에서 실행");

        gsap.set("#sec03 .column-left, #sec03 .column-right", { opacity: 0, y: 100 });

        let tl_GS1_sec03 = gsap.timeline({
            scrollTrigger: {
                trigger: "#sec03",
                start: "top 70%",
                end: "top 40%",
                scrub: 3,
                markers: false,
                toggleActions: "play none none reset"
            }
        });

        tl_GS1_sec03.to("#sec03 .column-left", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out"
        });

        tl_GS1_sec03.to("#sec03 .column-right", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out"
        }, "-=0.5");

        const gs1Containers = document.querySelectorAll("#sec04 .content-container .set-container");
        gsap.set(gs1Containers, { opacity: 0, y: 50 });

        let tl_GS1_sec04 = gsap.timeline({
            scrollTrigger: {
                trigger: "#sec04 .content-container",
                start: "top 100%",
                end: "top 150%",
                scrub: 2,
                markers: false,
                toggleActions: "play none none reset"
            }
        });

        gs1Containers.forEach((container, index) => {
            tl_GS1_sec04.to(container, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }, `+=${index * 0.1}`);
        });
    }


    if (isDPP && window.innerWidth <= 480) {
        console.log("❌ DPP 페이지(480px 이하)에서 애니메이션 실행 안 함!");
        return; // 📌 DPP 페이지에서만 실행 차단
    }
    if (isDPP) {
        console.log("✅ DPP 페이지에서 실행");

        gsap.set("#sec02 .img-container", { opacity: 0, x: 100 });

        gsap.to("#sec02 .img-container", {
            scrollTrigger: {
                trigger: "#sec02",
                start: "top 80%",
                end: "top 40%",
                scrub: false,
                markers: false,
                toggleActions: "play none none reset"
            },
            opacity: 1,
            x: 0,
            duration: 2,
            ease: "power2.out"
        });


        gsap.set("#sec03 .set-container01 img, #sec03 .text-container01, #sec03 .text-container02", { opacity: 0, x: 100 });

        gsap.to("#sec03 .img-container .set-container01 img", {
            scrollTrigger: {
                trigger: "#sec03",
                start: "top 80%",
                end: "top 40%",
                scrub: false,
                markers: false,
                toggleActions: "play none none reset"
            },
            opacity: 1,
            x: 0,
            duration: 2,
            ease: "power2.out"
        });

        gsap.to("#sec03 .text-container01", {
            scrollTrigger: {
                trigger: "#sec03 .text-container01",
                start: "top 75%",
                end: "top 35%",
                scrub: false,
                markers: false,
                toggleActions: "play none none reset"
            },
            opacity: 1,
            x: 0,
            duration: 2,
            ease: "power2.out"
        });

        gsap.to("#sec03 .text-container02", {
            scrollTrigger: {
                trigger: "#sec03 .text-container02",
                start: "top 72%",
                end: "top 32%",
                scrub: false,
                markers: false,
                toggleActions: "play none none reset"
            },
            opacity: 1,
            x: 0,
            duration: 2,
            ease: "power2.out"
        });

        const sec04_titles = document.querySelectorAll("#sec04 .content-container .title4");

        if (!sec04_titles.length) {
            console.error("❌ sec04 내 title4 요소를 찾을 수 없음!");
        } else {
            console.log("✅ #sec04 title4 애니메이션 실행!");

            gsap.set(sec04_titles, { opacity: 0, x: -50 });

            let tl_sec04 = gsap.timeline({
                scrollTrigger: {
                    trigger: "#sec04 .content-container",
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 3,
                    markers: false,
                    toggleActions: "play none none reset"
                }
            });

            sec04_titles.forEach((title, index) => {
                tl_sec04.to(title, {
                    opacity: 1,
                    x: 0,
                    duration: 1.5,
                    ease: "power2.out"
                }, `+=${index * 0.3}`);
            });
        }
        
        const sec05_images = document.querySelectorAll("#sec05 .content-container img");
        gsap.set(sec05_images, { opacity: 0, y: 100 });

        let tl_sec05 = gsap.timeline({
            scrollTrigger: {
                trigger: "#sec05 .content-container",
                start: "top 70%",
                end: "top 100%",
                scrub: 3,
                markers: false,
                toggleActions: "play none none reset"
            }
        });

        sec05_images.forEach((image, index) => {
            tl_sec05.to(image, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power2.out"
            }, `+=${index * 0.2}`);
        });
    }
});
