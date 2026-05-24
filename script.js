const output = document.getElementById("output");
const loading = document.getElementById("loading");
let button = document.getElementById('download-images-button');
// Array of image URLs
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download/load a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    img.src = url;

    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(`Failed to load image: ${url}`);
    };
  });
}

// Main function
function downloadImages() {
  // Show loading text
  loading.style.display = "block";

  // Remove old images/errors if any
  output.innerHTML = "";
  output.appendChild(loading);

  // Convert all URLs into promises
  const promises = images.map((image) =>
    downloadImage(image.url)
  );

  // Download all images together
  Promise.all(promises)
    .then((loadedImages) => {
      loading.style.display = "none";

      loadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      loading.style.display = "none";

      const errorDiv = document.createElement("div");
      errorDiv.id = "error";
      errorDiv.innerText = error;

      output.appendChild(errorDiv);
    });
}

// Call function
button.addEventListener('click', downloadImages);
//downloadImages();