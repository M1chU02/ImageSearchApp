const accessKey = "";

document.getElementById("search-btn").addEventListener("click", function () {
  const query = document.getElementById("search-input").value;
  if (query) {
    fetchImages(query);
  }
});

async function fetchImages(query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=20`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayImages(data.results);
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

function displayImages(images) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  if (images.length === 0) {
    gallery.innerHTML = "<p>No images found. Try another keyword!</p>";
    return;
  }

  images.forEach((image) => {
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("image-item");
    imgDiv.innerHTML = `
      <a href="${image.links.html}" target="_blank">
        <img src="${image.urls.regular}" alt="${image.alt_description}" />
      </a>
    `;
    gallery.appendChild(imgDiv);
  });
}
