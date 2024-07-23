// index.js

// Callbacks
const handleClick = (ramen) => {
  console.log("handleClick called with ramen:", ramen); // Debug log
  const detailImg = document.querySelector("#ramen-detail > .detail-image");
  const detailName = document.querySelector("#ramen-detail > .name");
  const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  detailImg.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailsRating.textContent = ramen.rating;
  detailsComment.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRamen = {
      name: event.target['new-name'].value,
      restaurant: event.target['new-restaurant'].value,
      image: event.target['new-image'].value,
      rating: event.target['new-rating'].value,
      comment: event.target['new-comment'].value
    };

    // Send POST request to the backend to save the new ramen
    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRamen) // Convert the new ramen object to a JSON string
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to save new ramen');
      }
      return response.json(); // Parse the JSON response
    })
    .then(savedRamen => {
      console.log("Saved ramen data:", savedRamen); // Debug log
      addRamenToMenu(savedRamen); // Add new ramen to menu
      form.reset(); // Reset form fields
    })
    .catch(error => {
      console.error(error); // Logs errors to the console
    });
  });
}

const addRamenToMenu = (ramen) => {
  const ramenMenu = document.getElementById('ramen-menu');
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener('click', () => handleClick(ramen));
  ramenMenu.appendChild(img);
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
  .then(response => response.json())
  .then(ramens => {
    ramens.forEach(ramen => addRamenToMenu(ramen));
  })
  .catch(error => console.error('Failed to fetch ramens:', error));
};

const main = () => {
  displayRamens();
  addSubmitListener();
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
