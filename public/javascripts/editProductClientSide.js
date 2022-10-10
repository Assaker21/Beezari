document.querySelectorAll(".product-microcategory-input").forEach((element) => {
  element.addEventListener("click", (_element) => {
    if (element.checked) {
      const sub = element.parentElement.parentElement.parentElement.parentElement;
      element.value = 
      sub.parentElement.parentElement.querySelector(".product-category-name").textContent +
        ">" +
        sub.querySelector(".product-subcategory-name").textContent +
        ">" +
        _element.target.parentElement.querySelector(".product-microcategory-name").textContent;
    } else {
      element.value = "_none";
    }
  });
});
