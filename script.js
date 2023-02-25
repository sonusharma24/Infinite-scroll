const imageContainer = document.getElementById("image-container");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//Unsplash Api
const count = 10;
const apiKey = "UbgvhvO6U7VhwuEhme7J09qZKZTZghpTo5NUsMC2LLg";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
let photoArray = [];

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// helper function to set attributes on dom elements
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Create elements for links and photos , add to dom
const displayPhoto = () => {
  imagesLoaded = 0;
  totalImages = photoArray.length;
  //run function for each object in photoarray
  photoArray.forEach((photo) => {
    // create <a/> tag to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //create img for photos
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    //put img tag inside <a/> then put img tag inside image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

//get photos from unsplash api
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    console.log(photoArray);
    displayPhoto();
  } catch (error) {
    // catch errors
    alert(`Error ${error.message}`);
  }
};

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
//on load
getPhotos();
