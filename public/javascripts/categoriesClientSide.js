RefreshDeletes();
RefreshCategoryAdd();
RefreshCategorySortable();
RefreshSubcategoryAdd();
RefreshSubcategorySortable();
RefreshMicrocategoryAdd();
RefreshMicrocategorySortable();
RefreshCounts();

function RefreshDeletes() {
  document.querySelectorAll(".bxs-trash-alt").forEach((element) => {
    element.addEventListener("click", (_element) => {
      _element.target.parentElement.parentElement.parentElement.remove();
      RefreshCounts();
    });
  });
}

function RefreshCategoryAdd() {
  document.querySelectorAll(".category-add-one").forEach((element) => {
    if (!element.matches(".marked")) {
      element.classList.toggle("marked");
      element.addEventListener("click", (_element) => {
        var e = document.createElement("div");
        e.classList.add("category-container");
        e.innerHTML = `<div class="category-handle-container">
      <i class='bx bx-menu handle'></i>
  </div>
  <div class="category-item-container">
      <div class="category-details-container">
          <input class="category-name" type="text" name="categoryName" value="CATEGORY">
          <i class='bx bxs-trash-alt' ></i>
      </div>
      <div class="subcategories-container">
          <input type="hidden" name="subcategoriesCount" class="subcategoriesCount">
          <button class="subcategory-add-one button" type="button">ADD SUBCATEGORY</button>
      </div>
  </div>`;
        _element.target.parentElement.insertBefore(
          e,
          _element.target
        );
        RefreshDeletes();
        RefreshSubcategorySortable();
        RefreshSubcategoryAdd();
        RefreshCounts();
      });
    }
  });
}

function RefreshCategorySortable() {
  new Sortable(document.querySelector(".categories-container"), {
    handle: ".category-handle-container",
    animation: 200,
  });
}

function RefreshSubcategoryAdd() {
  document.querySelectorAll(".subcategory-add-one").forEach((element) => {
    if (!element.matches(".marked")) {
      element.classList.toggle("marked");
      element.addEventListener("click", (_element) => {
        var e = document.createElement("div");
        e.classList.add("subcategory-container");
        e.innerHTML = `<div class="subcategory-handle-container">
          <i class='bx bx-menu handle'></i>
      </div>
      <div class="subcategory-item-container">
          <div class="subcategory-details-container">
              <input class="subcategory-name" type="text" name="subcategoryName" value="">
              <i class='bx bxs-trash-alt' ></i>
          </div>
          <div class="microcategories-container">   
              <input type="hidden" name="microcategoriesCount" class="microcategoriesCount">                     
              <button class="microcategory-add-one button" type="button">ADD MICROCATEGORY</button>
          </div>
      </div>`;
        _element.target.parentElement.insertBefore(
          e,
          _element.target
        );
        RefreshDeletes();
        RefreshMicrocategoryAdd();
        RefreshMicrocategorySortable();
        RefreshCounts();
      });
    }
  });
}

function RefreshSubcategorySortable() {
  document.querySelectorAll(".subcategories-container").forEach((element) => {
    new Sortable(element, {
      handle: ".subcategory-handle-container",
      animation: 200,
    });
  });
}

function RefreshMicrocategoryAdd() {
  document.querySelectorAll(".microcategory-add-one").forEach((element) => {
    if (!element.matches(".marked")) {
      element.classList.toggle("marked");
      element.addEventListener("click", (_element) => {
        var e = document.createElement("div");
        e.classList.add("microcategory-container");
        e.innerHTML = `<div class="microcategory-handle-container">
          <i class='bx bx-menu handle'></i>
      </div>
      <div class="microcategory-item-container">
          <div class="microcategory-details-container">
              <input class="microcategory-name" type="text" name="microcategoryName" value="">
              <i class='bx bxs-trash-alt' ></i>
          </div>
      </div> `;
        _element.target.parentElement.insertBefore(
          e,
          _element.target
        );
        RefreshDeletes();
        RefreshCounts();
      });
    }
  });
}

function RefreshMicrocategorySortable() {
  document.querySelectorAll(".microcategories-container").forEach((element) => {
    new Sortable(element, {
      handle: ".microcategory-handle-container",
      animation: 200,
    });
  });
}

function RefreshCounts() {
  document.querySelector(".categoriesCount").value = document.querySelectorAll(
    ".category-container"
  ).length;
  document.querySelectorAll(".subcategoriesCount").forEach((element) => {
    const e = element.parentElement.querySelectorAll(".subcategory-container");
    if (e == null) element.value = 0;
    else element.value = e.length;
  });
  document.querySelectorAll(".microcategoriesCount").forEach((element) => {
    const e = element.parentElement.querySelectorAll(
      ".microcategory-container"
    );

    if (e == null) element.value = 0;
    else element.value = e.length;
  });
}
