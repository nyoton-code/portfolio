const skills = ["front-end", "software", "Web design"];
const skillspace = document.querySelector(".skills-listname");

if (skillspace) {
  let i = 0;
  let j = 0;
  let backwards = false;

  function typeEffect() {
    const currentWord = skills[j];
    let typingSpeed = 70;

    if (!backwards) {
      skillspace.textContent = currentWord.slice(0, i + 1);
      i += 1;

      if (i === currentWord.length) {
        backwards = true;
        typingSpeed = 2500;
      }
    } else {
      skillspace.textContent = currentWord.slice(0, i - 1);
      i -= 1;

      if (i === 0) {
        backwards = false;
        j = (j + 1) % skills.length;
        typingSpeed = 400;
      }
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();
}









const counterEls = document.querySelectorAll(".counter");

function animateCounters() {
  counterEls.forEach((counter) => {
    if (counter.dataset.animated === "true") {
      return;
    }

    const target = Number(counter.dataset.target || counter.textContent);
    let current = 0;
    const duration = 1100;
    const stepTime = 20;
    const increment = Math.max(1, Math.ceil(target / (duration / stepTime)));

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = current;
    }, stepTime);

    counter.dataset.animated = "true";
  });
}

const pageNavButtons = document.querySelectorAll(".nav-icon");
const pages = document.querySelectorAll(".page");
const animations = [
  ["anim-out-book", "anim-in-book"],
  ["anim-out-slide", "anim-in-slide"],
  ["anim-out-paper", "anim-in-paper"],
  ["anim-out-spin", "anim-in-spin"],
  ["anim-out-blind", "anim-in-blind"]
];

















let currentPage = document.querySelector(".page.active") || pages[0];
let animationIndex = 0;
let isTransitioning = false;

function updateNavState(activePageId) {
  pageNavButtons.forEach((button) => {
    const isActive = button.dataset.page === activePageId;
    button.classList.toggle("active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function runPageTransition(nextPage) {
  if (!nextPage || isTransitioning || nextPage === currentPage) {
    return;
  }

  if (window.matchMedia("(max-width: 991px)").matches) {
    currentPage.classList.remove("active");
    currentPage.setAttribute("aria-hidden", "true");

    nextPage.classList.add("active");
    nextPage.setAttribute("aria-hidden", "false");

    updateNavState(nextPage.id);
    currentPage = nextPage;
    return;
  }

  isTransitioning = true;
  const leavingPage = currentPage;
  const [outClass, inClass] = animations[animationIndex % animations.length];
  animationIndex += 1;

  updateNavState(nextPage.id);

  leavingPage.classList.remove("active");
  leavingPage.classList.add("leaving", outClass);
  leavingPage.style.zIndex = "9";

  nextPage.classList.add("active", "entering", inClass);
  nextPage.style.zIndex = "20";

  const finalizeTransition = () => {
    leavingPage.classList.remove("leaving", outClass);
    leavingPage.style.zIndex = "";
    leavingPage.setAttribute("aria-hidden", "true");

    nextPage.classList.remove("entering", inClass);
    nextPage.style.zIndex = "";
    nextPage.setAttribute("aria-hidden", "false");

    currentPage = nextPage;
    isTransitioning = false;
  };

  const handleLeaveEnd = (event) => {
    if (event.target === leavingPage) {
      leavingPage.removeEventListener("animationend", handleLeaveEnd);
      finalizeTransition();
    }
  };

  const handleEnterEnd = (event) => {
    if (event.target === nextPage) {
      nextPage.removeEventListener("animationend", handleEnterEnd);
    }
  };

  leavingPage.addEventListener("animationend", handleLeaveEnd, { once: true });
  nextPage.addEventListener("animationend", handleEnterEnd, { once: true });
}

pageNavButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextPage = document.getElementById(button.dataset.page);
    runPageTransition(nextPage);
  });
});

const resumePage = document.getElementById("resume");
const skillProgressBars = document.querySelectorAll(".skill-progress");

function animateProgressBars() {
  skillProgressBars.forEach((item) => {
    if (item.dataset.animated === "true") {
      return;
    }

    const target = Number(item.dataset.skill || 0);
    const circle = item.closest(".circule");
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      item.textContent = current;
      if (circle) {
        circle.style.background = `conic-gradient(#09b4e3 0% ${current}%, #eee ${current}% 100%)`;
      }

      if (current >= target) {
        clearInterval(timer);
      }
    }, 20);

    item.dataset.animated = "true";
  });
}

function handleResumeAnimation() {
  if (resumePage && !resumePage.dataset.skillAnimated) {
    const rect = resumePage.getBoundingClientRect();
    const visible = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;

    if (visible) {
      animateProgressBars();
      animateCounters();
      resumePage.dataset.skillAnimated = "true";
    }
  }
}

window.addEventListener("load", () => {
  animateCounters();
  handleResumeAnimation();
});

window.addEventListener("scroll", handleResumeAnimation, { passive: true });

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow = filter === "all" || category === filter;
      card.style.display = shouldShow ? "" : "none";
    });
  });
});

pageNavButtons.forEach((button) => {
  const target = document.getElementById(button.dataset.page);
  if (target) {
    target.setAttribute("aria-hidden", target.classList.contains("active") ? "false" : "true");
  }
});


window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const activeNav = document.querySelector(".nav-icon.active");
    if (activeNav) {
      const page = document.getElementById(activeNav.dataset.page);
      runPageTransition(page);
    }
  }
});
