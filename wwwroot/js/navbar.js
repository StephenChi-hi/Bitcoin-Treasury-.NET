document.addEventListener("DOMContentLoaded", () => {
  const themeBtn = document.getElementById("theme-toggle-btn");
  const overlay = document.getElementById("reveal-overlay");
  const menuToggle = document.getElementById("nav-menu-toggle");
  const navMenu = document.getElementById("nav-links-menu");

  // --- 1. System Theme Detection & Initialization ---
  const getPreferredTheme = () => {
    // Check if the user previously saved a choice
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    // Otherwise, check system preference
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return systemPrefersDark ? "dark" : "light";
  };

  // Apply the initial theme immediately without animation
  const initialTheme = getPreferredTheme();
  document.documentElement.setAttribute("data-theme", initialTheme);

  // Listen for system theme changes in real-time (only updates if user hasn't set a manual override)
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        const newSystemTheme = e.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newSystemTheme);
      }
    });

  // --- 2. Mobile Menu Toggle ---
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("open");
    });
  }

  // --- 3. Circular Reveal Theme System ---
  if (themeBtn && overlay) {
    themeBtn.addEventListener("click", (e) => {
      // Get position coordinates of the clicked button
      const rect = themeBtn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Set coordinates into CSS custom variables
      overlay.style.setProperty("--x", `${x}px`);
      overlay.style.setProperty("--y", `${y}px`);

      // Identify target theme orientation
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      const targetTheme = currentTheme === "light" ? "dark" : "light";

      // Fire the expansion phase
      overlay.classList.add("animating");

      // Halfway through animation, swap backgrounds and save preference
      setTimeout(() => {
        document.documentElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("theme", targetTheme); // Lock in user choice
      }, 400);

      // Clean up the overlay state smoothly when completed
      setTimeout(() => {
        overlay.classList.remove("animating");
        overlay.style.clipPath = "circle(0% at var(--x) var(--y))";
      }, 850);

      // Close responsive mobile menu wrapper on toggle selected
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("open");
      }
    });
  }
});
