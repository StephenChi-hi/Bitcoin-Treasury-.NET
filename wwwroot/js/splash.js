document.addEventListener("DOMContentLoaded", () => {
  const percentage = document.querySelector("#splash-percentage");
  const splashScreen = document.querySelector("#splash-screen");

  if (!splashScreen || !percentage) return;

  if (
    document.documentElement.classList.contains("dark") ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    splashScreen.classList.add("dark");
  }

  let count = 0;
  // Reduced incremental step size so it tracks closer to our ~4 second animation timeline
  const counterInterval = setInterval(() => {
    count += Math.random() * 3.5;
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
      }, 600); // Small extra buffer for the final letters to breathe
    }
  }, 120);
});
