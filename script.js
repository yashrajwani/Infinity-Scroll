const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let imagesLoaded = 10;
let totalImages;

// Unsplash API
const apiKey = "Q8Br_s6EVJT7tvK6BY2OL9ay5LCG0amdGfQNkBUXPgE";
const count = 30;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

console.log(apiUrl);

// helper fn
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Check if img loaded
function imgLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    // console.log(ready);
  }
//   console.log(imagesLoaded);
}

// Add photos to img container
function displayPhotos() {
  totalImages = photosArray.length;
  // for each photo
  photosArray.forEach((photo) => {
    // Create <a> ele to link to unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, { href: photo.links.html, target: "_blank" });

    // img tag
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Check if finished loading
    img.addEventListener("load", imgLoaded);

    item.append(img);
    imgContainer.append(item);

    // console.log(photo);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// Check if scrolled to end
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    imagesLoaded = 0;
    getPhotos();
  }
});

// On start up
getPhotos();
