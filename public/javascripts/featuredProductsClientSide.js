const one_product_id = document.querySelectorAll(".one-product-id");
const one_product_name = document.querySelectorAll(".one-product-name");
const one_product_brand = document.querySelectorAll(".one-product-brand");
const one_product_img = document.querySelectorAll(".one-product-img");
const one_product_price = document.querySelectorAll(".one-product-price");
const one_product_discounted_price = document.querySelectorAll(
  ".one-product-discounted-price"
);
const one_product_purchase_power = document.querySelectorAll(".one-product-purchase-power");
let products = new Array(one_product_id.length);

for (i = 0; i < products.length; i++) {
  products[i] = {
    _id: one_product_id[i].textContent,
    name: one_product_name[i].textContent.toUpperCase(),
    brand: one_product_brand[i].textContent,
    img: one_product_img[i].src,
    price: one_product_price[i].textContent,
    discountedPrice: one_product_discounted_price[i].textContent,
    purchasePower: one_product_purchase_power[i].textContent,
  };
}

RefreshSearches();
RefreshSortables();
RefreshDeletes();
RefreshFeaturedSections();

function RefreshSortables() {
  document.querySelectorAll(".fp-items-wrapper").forEach((element) => {
    new Sortable(element, {
      handle: ".fp-item-handle",
      animation: 200,
    });
  });

  document.querySelectorAll(".fp-products-container").forEach((element) => {
    new Sortable(element, {
      handle: ".fp-product-handle",
      animation: 200,
      scroll: true,
    });
  });
}

function RefreshSearches(e = document) {
  e.querySelectorAll(".search-box").forEach((element) => {
    const search_options_container = element.parentElement.querySelector(
      ".search-options-container"
    );
    search_options_container.innerHTML = "";
    products.forEach((product) => {
      if (product.name.search(element.value.toUpperCase()) >= 0) {
        let option_html = `<div class="search-option-container">
        <img
          src="${product.img}"
        />
        <h6>${product.name}</h6>
        <i class="bx bxs-plus-square add-product-button"></i>
      </div>`;

        search_options_container.innerHTML += option_html;
      }
    });

    // updating add element for search bar
    search_options_container
      .querySelectorAll(".add-product-button")
      .forEach((element) => {
        element.addEventListener("click", (_element) => {
          const name = element.parentElement.querySelector("h6").textContent;
          products.forEach((product) => {
            if (product.name === name) {
              let product_html = document.createElement("div");
              product_html.innerHTML = `<div class="fp-product-handle">
            <i class="bx bx-menu"></i>
          </div>
          <img
            src="${product.img}"
          />
          <h4 class="fp-product-brand">${product.brand}</h4>
          <h4 class="fp-product-name">${product.name}</h4>
          <h4 class="fp-prodcut-price">${product.price}</h4>
          <h4 class="fp-product-discounted-price">${product.discountedPrice}</h4>
          <h4 class="fp-product-purchase-power">Purchase Power: ${product.purchasePower}</h4>
          <input class="product-id" type="hidden" name="_id" value="${product._id}">
          <button class="fp-product-button delete fp-product-delete-button" type="button">DELETE</button>`;
              product_html.classList.toggle("fp-product-container");

              const greatgrandpa =
                element.parentElement.parentElement.parentElement.parentElement;
              greatgrandpa.insertBefore(
                product_html,
                greatgrandpa.querySelector(".search-box-container")
              );
              product_html
                .querySelector(".fp-product-delete-button")
                .addEventListener("click", element => {
                  product_html.remove();

                });
            }
          });
        });
      });

    element.addEventListener("input", (_element) => {
      search_options_container.innerHTML = "";

      products.forEach((product) => {
        if (product.name.search(element.value.toUpperCase()) >= 0) {
          let option_html = `<div class="search-option-container">
          <img
            src="${product.img}"
          />
          <h6>${product.name}</h6>
          <i class="bx bxs-plus-square add-product-button"></i>
        </div>`;

          search_options_container.innerHTML += option_html;
          RefreshInputNames();
        }
      });

      // updating add element for search bar
      search_options_container
        .querySelectorAll(".add-product-button")
        .forEach((element) => {
          element.addEventListener("click", (_element) => {
            const name = element.parentElement.querySelector("h6").textContent;
            products.forEach((product) => {
              if (product.name === name) {
                let product_html = document.createElement("div");
                product_html.innerHTML = `<div class="fp-product-handle">
                <i class="bx bx-menu"></i>
              </div>
              <img
                src="${product.img}"
              />
              <h4 class="fp-product-brand">${product.brand}</h4>
              <h4 class="fp-product-name">${product.name}</h4>
              <h4 class="fp-prodcut-price">${product.price}</h4>
              <h4 class="fp-product-discounted-price">${product.discountedPrice}</h4>
              <h4 class="fp-product-purchase-power">Purchase Power: ${product.purchasePower}</h4>
              <input class="product-id" type="hidden" name="_id" value="${product._id}">
              <button class="fp-product-button delete fp-product-delete-button" type="button">DELETE</button>`;
                product_html.classList.toggle("fp-product-container");

                const greatgrandpa =
                  element.parentElement.parentElement.parentElement
                    .parentElement;
                greatgrandpa.insertBefore(
                  product_html,
                  greatgrandpa.querySelector(".search-box-container")
                );
                product_html
                .querySelector(".fp-product-delete-button")
                .addEventListener("click", element => {
                  product_html.remove();

                  RefreshInputNames();
                });
              }
            });
          });
        });
    });
  });

  RefreshSortables();
}

function RefreshDeletes() {
  document.querySelectorAll(".fp-product-delete-button").forEach((element) => {
    element.addEventListener("click", () => {
      element.parentElement.remove();
    });
  });

  document.querySelectorAll(".fp-delete-button").forEach((element) => {
    element.addEventListener("click", () => {
      element.parentElement.parentElement.remove();
    });
  });
}

function RefreshFeaturedSections() {
  document.querySelectorAll(".fp-item-add-more").forEach(element => {
    element.addEventListener("click", () => {
      let section_html = document.createElement("div");
      section_html.classList.toggle("fp-item-container");
      section_html.innerHTML = `<div class="fp-item-handle">
      <i class="bx bx-menu"></i>
    </div>
    <div class="fp-item-details">
      <label for="title">Title: </label>
      <input name="title" class="title-input" type="text" value="Under LBP 24,000" id="title">
      <button class="fp-delete-button" type="button">DELETE</button>
      <div class="fp-products-container"> 
        <div class="fp-product-container search-box-container">
          <input
            class="search-box"
            value=""
            type="text"
            name="searchValue"
          />
          <div class="search-options-container">
          </div>
        </div>
      </div>
    </div>`;

      const instantiatedElement = element.parentElement.parentElement.querySelector(".fp-items-wrapper").appendChild(section_html);

      instantiatedElement.querySelector(".fp-delete-button").addEventListener("click", (e) => {
        e.target.parentElement.parentElement.remove();
      });

      RefreshSearches(section_html);
    });
  });

  RefreshInputNames();
}

function RefreshInputNames() {
  const ies = document.querySelectorAll(".fp-items-container");

  for(i = 0; i < ies.length; i++) {
    const jes = ies[i].querySelectorAll(".fp-item-container");

    for(j = 0; j < jes.length; j++) {
      const kes = jes[j].querySelectorAll(".fp-product-container");

      jes[j].querySelector(".title-input").name = "title_" + i + "_" + j;

      for(k = 0; k < kes.length - 1; k++) {
        kes[k].querySelector(".product-id").name = "id_" + i + "_" + j + "_" + k;
      }
    }
  }
}

document.querySelector(".fp-capsule").addEventListener("submit", () => {
  RefreshInputNames();
});
