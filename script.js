const DOGS_TO_FETCH = 15;
let DOGS_FETCHED = 0;

function main() {
  setupScrollToTopButton();
  setupMoreDogsButton();
  getDogs(DOGS_TO_FETCH);
  escModal();
}

async function getDogs(numberOfDogs) {
  const page = (DOGS_FETCHED + numberOfDogs) / numberOfDogs - 1;
  const response = await fetch(
    `https://api.thedogapi.com/v1/breeds?page=${page}&order=desc&limit=${numberOfDogs}`,
    {
      method: "get",
      headers: {
        "x-api-key":
          "live_yOnbrVsZCcsffeeisScz8EByvFsHEtIubmS7wtwC8jyfu0KNQzBDjA8ZhpBikYw9",
      },
    }
  );

  const json = await response.json();
  json.map(createDogPhoto);
  DOGS_FETCHED += numberOfDogs;
}

function createDogPhoto(data) {
  // document.getElementById("dogs").innerHTML += `<img src=${data} />`;

  const dogImg = document.createElement("img");
  dogImg.setAttribute("src", data.image.url);
  dogImg.setAttribute("alt", data.name);
  dogImg.setAttribute("class", "zoom-img");

  document.getElementById("dogs").appendChild(dogImg);

  addClickListenerToDogPhoto(dogImg, data);

  lightBoxBg.addEventListener("click", function () {
    lightBoxBg.classList.remove("active");

    visibleImages();

    visibleButtonAddMoreDogs();
  });
}

function addClickListenerToDogPhoto(dogImg, data) {
  dogImg.addEventListener("click", function () {
    const lightBoxBg = document.querySelector("#lightBoxBg");

    const container = document.querySelector(".container");
    container.style.minHeight = 0;

    lightBoxBg.classList.add("active");

    const lightBoxImage = document.createElement("img");
    lightBoxImage.src = dogImg.src;
    lightBoxImage.id = "lightBoxImage";

    // removing previous images
    const allBackgroundImages = lightBoxBg.querySelectorAll("img");
    for (let item of allBackgroundImages) {
      item.remove();
    }

    const header = document.createElement("h2");
    header.id = "header";
    header.textContent = dogImg.alt;
    lightBoxBg.appendChild(header);

    const breadGroup = document.createElement("p");
    breadGroup.id = "breadGroup";
    breadGroup.textContent = data.breed_group;
    breadGroup.style.color = "#ffe6f9";
    lightBoxBg.appendChild(breadGroup);

    const lifeSpan = document.createElement("p");
    lifeSpan.id = "lifeSpan";
    lifeSpan.textContent = data.life_span;
    lifeSpan.style.color = "#ffe6f9";
    lightBoxBg.appendChild(lifeSpan);

    const bredFor = document.createElement("p");
    bredFor.id = "bredFor";
    bredFor.textContent = data.bred_for;
    bredFor.style.color = "#ffe6f9";
    lightBoxBg.appendChild(bredFor);

    const temperament = document.createElement("p");
    temperament.id = "temperament";
    temperament.textContent = data.temperament;
    temperament.style.color = "#ffe6f9";
    lightBoxBg.appendChild(temperament);

    // removing previous headers
    const allHeaders = lightBoxBg.querySelectorAll("h2");
    for (let item of allHeaders) {
      item.remove();
    }

    // removing previous paragraphs
    const allParagraphs = lightBoxBg.querySelectorAll("p");
    for (let item of allParagraphs) {
      item.remove();
    }

    const div = document.createElement("div");
    lightBoxBg.appendChild(div);
    div.id = "wrapInside";
    div.insertBefore(header, null);
    div.insertBefore(breadGroup, null);
    div.insertBefore(lifeSpan, null);
    div.insertBefore(bredFor, null);
    div.insertBefore(temperament, null);
    div.insertBefore(lightBoxImage, null);

    lightBoxBg.appendChild(lightBoxImage);

    hideImages();

    hideButtonAddMoreImages();
  });
}

function setupScrollToTopButton() {
  const scrollBtn = document.querySelector(".scroll-to-top");
  const scrollFooter = document.querySelector("footer");

  const refreshButton = () => {
    if (document.documentElement.scrollTop <= 150) {
      scrollBtn.style.display = "none";
      scrollFooter.style.display = "none";
    } else {
      scrollBtn.style.display = "block";
      scrollFooter.style.display = "block";
    }
  };

  refreshButton();

  scrollBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  document.addEventListener("scroll", () => {
    refreshButton();
  });
}

function setupMoreDogsButton() {
  const dogsBtn = document.querySelector(".btn");

  dogsBtn.addEventListener("click", () => {
    getDogs(DOGS_TO_FETCH);
  });
}

function escModal() {
  const modal = document.querySelector("#lightBoxBg");

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      modal.classList.remove("active");

      visibleImages();

      visibleButtonAddMoreDogs();
    }
  });
}

function visibleImages() {
  const zoomImgs = document.getElementsByClassName("zoom-img");

  for (const item of zoomImgs) {
    item.style.display = "block";
  }
}

function visibleButtonAddMoreDogs() {
  const btn = document.querySelector(".btn");

  btn.style.display = "block";
}

function hideImages() {
  const zoomImgs = document.getElementsByClassName("zoom-img");

  for (const item of zoomImgs) {
    item.style.display = "none";
  }
}

function hideButtonAddMoreImages() {
  const btn = document.querySelector(".btn");

  btn.style.display = "none";
}

main();
