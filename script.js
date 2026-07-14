const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
const yearEl = document.getElementById("year");
const typedText = document.getElementById("typedText");
const filterBtns = document.querySelectorAll(".filter-btn");
const serviceCards = document.querySelectorAll(".service-card");
const countEls = document.querySelectorAll(".count");
const form = document.getElementById("contactForm");
const whatsappSendBtn = document.getElementById("whatsappSendBtn");
const emailSendBtn = document.getElementById("emailSendBtn");
const animateEls = document.querySelectorAll("[data-animate]");
const tiltCards = document.querySelectorAll(".tilt-card");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mainNav.classList.remove("open"));
  });
}

const words = ["মোবাইল অ্যাপ", "ইসলামিক অ্যাপ", "ওয়েবসাইট", "ম্যানেজমেন্ট সফটওয়্যার", "REST API"];
let wordIndex = 0;

if (typedText) {
  setInterval(() => {
    wordIndex = (wordIndex + 1) % words.length;
    typedText.style.opacity = "0";

    setTimeout(() => {
      typedText.textContent = words[wordIndex];
      typedText.style.opacity = "1";
    }, 220);
  }, 2200);
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter || "all";

    serviceCards.forEach((card) => {
      const types = card.dataset.type || "";
      const visible = filter === "all" || types.includes(filter);
      card.classList.toggle("hide", !visible);
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.16,
  }
);

animateEls.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 35, 420)}ms`;
  revealObserver.observe(el);
});

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target || "0");
      let current = 0;
      const step = Math.max(1, Math.round(target / 40));

      const timer = setInterval(() => {
        current += step;

        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        el.textContent = `${current}+`;
      }, 28);

      observer.unobserve(el);
    });
  },
  { threshold: 0.35 }
);

countEls.forEach((el) => counterObserver.observe(el));

if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 7;
      const rotateX = ((y / rect.height) - 0.5) * -7;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
}

function getFormPayload() {
  if (!form || !form.checkValidity()) {
    form?.reportValidity();
    return null;
  }

  const name = document.getElementById("name")?.value.trim() || "";
  const email = document.getElementById("email")?.value.trim() || "";
  const projectType = document.getElementById("projectType")?.value || "";
  const details = document.getElementById("details")?.value.trim() || "N/A";

  return { name, email, projectType, details };
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

if (whatsappSendBtn) {
  whatsappSendBtn.addEventListener("click", () => {
    const payload = getFormPayload();
    if (!payload) return;

    const whatsappNumber = "8801790905350";
    const message = encodeURIComponent(
      `Assalamu Alaikum, নতুন প্রজেক্ট রিকোয়েস্ট:\n\nName: ${payload.name}\nEmail: ${payload.email}\nProject Type: ${payload.projectType}\nProject Details: ${payload.details}`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  });
}

if (emailSendBtn) {
  emailSendBtn.addEventListener("click", () => {
    const payload = getFormPayload();
    if (!payload) return;

    const subject = encodeURIComponent(`New Project Request from ${payload.name}`);
    const body = encodeURIComponent(
      `Name: ${payload.name}\nEmail: ${payload.email}\nProject Type: ${payload.projectType}\nProject Details: ${payload.details}`
    );

    window.location.href = `mailto:hafezmahdihasan50@gmail.com?subject=${subject}&body=${body}`;
  });
}
