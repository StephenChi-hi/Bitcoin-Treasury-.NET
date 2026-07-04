/* wwwroot/js/splash.js */
document.addEventListener("DOMContentLoaded", () => {
  const percentage = document.querySelector("#splash-percentage");
  const splashScreen = document.querySelector("#splash-screen");

  if (!splashScreen || !percentage) return; // Guard clause in case layout changes

  // Check dark mode
  if (
    document.documentElement.classList.contains("dark") ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    splashScreen.classList.add("dark");
  }

  let count = 0;
  const counterInterval = setInterval(() => {
    count += Math.random() * 8;
    if (count < 100) {
      percentage.textContent = Math.floor(count) + "%";
    } else {
      clearInterval(counterInterval);
      percentage.textContent = "100%";

      setTimeout(() => {
        splashScreen.classList.add("hide");
        setTimeout(() => {
          splashScreen.remove();
        }, 700);
      }, 500);
    }
  }, 100);
});
