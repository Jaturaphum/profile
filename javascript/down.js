document.getElementById("profile").addEventListener("click", function () {
  [].map.call(document.querySelectorAll(".profile"), function (el) {
    el.classList.toggle("profile--open");
  });
});
