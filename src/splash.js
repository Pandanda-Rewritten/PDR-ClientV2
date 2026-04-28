function getSplashLogoPathForMonth(monthIndex) {
  // JS months are 0-based: 9 = October, 11 = December
  if (monthIndex === 9) return "./assets/pdr-halloween.png";
  if (monthIndex === 11) return "./assets/pdr-christmas.png";
  return "./assets/pdr.png";
}

window.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("pdrlogin");
  if (!img) return;

  const desiredSrc = getSplashLogoPathForMonth(new Date().getMonth());
  if (img.getAttribute("src") === desiredSrc) return;

  const fallbackSrc = "./assets/pdr.png";
  img.addEventListener(
    "error",
    () => {
      if (img.getAttribute("src") !== fallbackSrc) img.setAttribute("src", fallbackSrc);
    },
    { once: true },
  );

  img.setAttribute("src", desiredSrc);
});

