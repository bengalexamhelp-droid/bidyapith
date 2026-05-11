const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelectorAll(".nav-links a");
const previewCards = Array.from(document.querySelectorAll(".preview-card"));
const dots = Array.from(document.querySelectorAll(".dots button"));
const prevButton = document.querySelector('[data-preview="prev"]');
const nextButton = document.querySelector('[data-preview="next"]');
const statusMessage = document.querySelector("#statusMessage");
const downloadButton = document.querySelector("#downloadButton");
const qrButton = document.querySelector("#qrButton");

let activePreview = 0;

function setPreview(index) {
  activePreview = (index + previewCards.length) % previewCards.length;
  previewCards.forEach((card, cardIndex) => {
    card.classList.toggle("active", cardIndex === activePreview);
  });
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === activePreview);
  });
  previewCards[activePreview].scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest",
  });
}

menuButton?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

prevButton?.addEventListener("click", () => setPreview(activePreview - 1));
nextButton?.addEventListener("click", () => setPreview(activePreview + 1));
dots.forEach((dot, index) => dot.addEventListener("click", () => setPreview(index)));

downloadButton?.addEventListener("click", () => {
  statusMessage.textContent = "Android app download is ready. Connect your APK link here.";
});

qrButton?.addEventListener("click", () => {
  statusMessage.textContent = "QR code preview selected for quick mobile install.";
  document.querySelector(".qr-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id") || "home";
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { threshold: 0.35 }
);

document.querySelectorAll("main > section").forEach((section) => observer.observe(section));
