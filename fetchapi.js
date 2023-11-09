// Function to fetch meal categories and populate the dropdown
function fetchMealCategories() {
  fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then((response) => response.json())
    .then((data) => {
      const categoryDropdown = document.getElementById("searchData");

      data.meals.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.strCategory;
        option.textContent = category.strCategory;
        categoryDropdown.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching meal categories: " + error);
    });
}

// Call the fetchMealCategories function to load meal categories
fetchMealCategories();

// Get references to the modal and its content
const modal = document.getElementById("mealModal");
const modalContent = document.getElementById("mealModalContent");

function openModal(mealName) {
  modalContent.innerHTML = "Loading...";

  // Fetch meal details based on the provided meal name
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      if (meal) {
        // Generate HTML for displaying meal details
        const html = `
          <h3>${meal.strMeal}</h3>
          <p><strong>Ingredients:</strong></p>
          <ul>
            ${Object.keys(meal)
              .filter((key) => key.startsWith("strIngredient") && meal[key])
              .map((key) => `<li>${meal[key]} - ${meal[`strMeasure${key.slice(-1)}`]}</li>`)
              .join("")}
          </ul>
          <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
          <p><strong>YouTube URL:</strong> <a href="${meal.strYoutube}" target="_blank">Watch Video</a></p>
          <p><strong>Source:</strong> <a href="${meal.strSource}" target="_blank">View Source</a></p> <!-- Add this line -->
        `;
        modalContent.innerHTML = html;
      } else {
        modalContent.innerHTML = "Meal details not found.";
      }
    })
    .catch((error) => {
      console.error("Error fetching meal details: " + error);
      modalContent.innerHTML = "Error fetching meal details.";
    });

  modal.style.display = "block";
}


// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

// Add event listener to close the modal when the close button is clicked
document.getElementById("mealModalClose").addEventListener("click", closeModal);

// Add event listener to open the modal when a meal image is clicked
document.body.addEventListener("click", (event) => {
  if (event.target.matches(".meal-image")) {
    openModal(event.target.getAttribute("data-meal-name"));
  }
});

// Function to handle button click for fetching and displaying recipes
function buttonClicked() {
  var mealCategory = document.getElementById("searchData").value;

  if (mealCategory) {
    // Fetch and display recipes based on the selected meal category
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategory}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals && data.meals.length > 0) {
          displaysuggestRecipe(data.meals);
          displayPlanMealButton(); // Display the "Plan meal" button
        } else {
          document.getElementById("suggestRecipe").innerHTML = "No meals found for the selected category.";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        document.getElementById("suggestRecipe").innerHTML = "Error fetching data.";
      });
  }
}

// Function to display suggested recipes
function displaysuggestRecipe(meals) {
  const suggestRecipe = document.getElementById("suggestRecipe");
  suggestRecipe.innerHTML = '';

  meals.forEach((meal) => {
    const div = document.createElement('div');
    div.innerHTML = `<b>${meal.strMeal}</b><br><br>`;

    if (meal.strMealThumb) {
      const img = document.createElement('img');
      img.src = meal.strMealThumb;
      img.style.maxWidth = '200px';
      img.classList.add('meal-image');
      img.setAttribute('data-meal-name', meal.strMeal); // Add meal name as a data attribute
      div.appendChild(img);
    }

    div.innerHTML += '<br><br>';
    suggestRecipe.appendChild(div); // Append to the 'suggestRecipe' div
  });
}

// Function to navigate to the meal planning page
function navigateToCRUDPage() {
  window.location.href = 'plan.html';
}

// Function to display the "Plan meal" button
function displayPlanMealButton() {
  const planMealButton = document.getElementById("planMealButton");
  if (planMealButton) {
    planMealButton.style.display = "block";
  }
}
