/* Runs before paint (blocking, in <head>) so the correct theme is applied
   with no flash. Uses a saved choice, else the visitor's system preference. */
(function () {
  try {
    var t = localStorage.getItem("ww.theme");
    if (!t) t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", t);
  } catch (e) {}
})();
