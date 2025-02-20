
  document.addEventListener("DOMContentLoaded", function () {
    const bgContainer = document.getElementById("background-container");
    const bgImages = ["id.jpg", "id1.jpg", "id2.jpg"];
    const heroData = [
        { text1: "Design", text2: "Drives Experience" },
        { text1: "Innovate.", text2: "Engage. Connect" },
        { text1: "Connect.", text2: "Create. Inspire" }
    ];
    const circles = document.querySelectorAll(".circle");
    const videoControl = document.getElementById("video-control");
    let currentIndex = 0;
    let isVideoPlaying = false;

    // Function to update hero text dynamically
    function updateHeroText() {
        const heroText = document.getElementById("hero-text");
        gsap.to(heroText, { opacity: 0, y: 20, duration: 0.5, onComplete: () => {
            heroText.innerHTML = `${heroData[currentIndex].text1}<br>${heroData[currentIndex].text2}`;
            gsap.to(heroText, { opacity: 1, y: 0, duration: 0.5 });
        }});
    }

    // Function to update background image and active circle
    function updateBackground() {
        if (!isVideoPlaying) {
            bgContainer.innerHTML = `<img src="${bgImages[currentIndex]}" class="bg" alt="Background">`;
            gsap.fromTo(".bg", { opacity: 0.5 }, { opacity: 1, duration: 1 });

            updateHeroText(); 
            applyMouseOverEffects();
            updateCircles();
        }
    }

    // Auto-change background every 5 seconds
    setInterval(() => {
        if (!isVideoPlaying) {
            currentIndex = (currentIndex + 1) % bgImages.length;
            updateBackground();
        }
    }, 5000);

    // Function to toggle video playback
    function toggleVideo() {
        isVideoPlaying = !isVideoPlaying;
        if (isVideoPlaying) {
            bgContainer.innerHTML = `
                <video class="bg" autoplay loop muted style="width: 100%; height: 100%; object-fit: cover;">
                    <source src="video1.mp4" type="video/mp4">
                </video>`;
            videoControl.src = "pause_icon.png";
        } else {
            updateBackground();
            videoControl.src = "play_icon.png";
        }
    }

    // Function to apply mouse over effects
    function applyMouseOverEffects() {
        const img = document.querySelector(".bg");
        if (img && img.tagName !== "VIDEO") { // Exclude video elements
            img.style.filter = "brightness(80%)";
    
            img.addEventListener("mouseenter", () => {
                gsap.to(img, { css: { filter: "brightness(100%)" }, duration: 0.3, ease: "power1.out" });
            });
    
            img.addEventListener("mouseleave", () => {
                gsap.to(img, { css: { filter: "brightness(70%)" }, duration: 0.3, ease: "power1.out" });
            });
        }
    }
    
    

    // Function to update circles (Red class shift)
    function updateCircles() {
        document.querySelectorAll(".circle, .red").forEach((dot, index) => {
            dot.className = index === currentIndex ? "red" : "circle";
        });
    }

    // Click event for circles to switch images and text
    circles.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            currentIndex = index;
            updateBackground();
        });
    });

    // Video play/pause button
    videoControl.addEventListener("click", toggleVideo);

    // Initial Load Animations
    gsap.from(".header", { opacity: 0, y: -50, duration: 1 });
    gsap.from(".main h2", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
    gsap.from(".explore", { opacity: 0, scale: 0.8, duration: 1, delay: 1 });

    // Set Initial Background
    updateBackground();
});
