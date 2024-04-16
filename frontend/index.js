document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const questionsDiv = document.getElementById("questionsDiv");
    const questionsForm = document.getElementById("questionsForm");
    const affirmationsDiv = document.getElementById("affirmationsDiv");
    const affirmationsList = document.getElementById("affirmationsList");
    const selectedAffirmationDiv = document.getElementById("selectedAffirmationDiv");
    const selectedAffirmation = document.getElementById("selectedAffirmation");
    const toggleFavoriteBtn = document.getElementById("toggleFavoriteBtn");
    const userProfileDiv = document.getElementById("userProfileDiv");
    const favoritesList = document.getElementById("favoritesList");
    const createAffirmationBtn = document.getElementById("createAffirmationBtn");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        signupDiv.style.display = "none";
        questionsDiv.style.display = "block";
    });
    
    const affirmationsData = [
        { text: "I am confident in my abilities." },
        { text: "I embrace challenges as opportunities for growth." },
        { text: "I am surrounded by love and support." }
    ];
    let favorites = []; 

    function displayAffirmations(affirmations) {
        affirmationsList.innerHTML = ""; 
        affirmations.forEach(affirmation => {
            const li = document.createElement("li");
            li.textContent = affirmation.text;
            affirmationsList.appendChild(li);
        });
        affirmationsDiv.style.display = "block"; 
    }

    
    questionsForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const filteredAffirmations = affirmationsData.slice(0, 2);
        displayAffirmations(filteredAffirmations);
    });

    function displaySelectedAffirmation(affirmationText) {
        selectedAffirmation.textContent = affirmationText;
        selectedAffirmationDiv.style.display = "block";
    }

    affirmationsList.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
            const selectedAffirmationText = event.target.textContent;
            displaySelectedAffirmation(selectedAffirmationText);
        }
    });

    toggleFavoriteBtn.addEventListener("click", function () {
        const selectedAffirmationText = selectedAffirmation.textContent;
        const isFavorite = favorites.includes(selectedAffirmationText);
        if (isFavorite) {
            removeAffirmationFromFavorites(selectedAffirmationText);
        } else {
            addAffirmationToFavorites(selectedAffirmationText);
        }
    });

    function addAffirmationToFavorites(affirmationText) {
        favorites.push(affirmationText);
        updateFavoritesList();
    }

    function removeAffirmationFromFavorites(affirmationText) {
        favorites = favorites.filter(affirmation => affirmation !== affirmationText);
        updateFavoritesList();
    }

    function updateFavoritesList() {
        favoritesList.innerHTML = "";
        favorites.forEach(affirmation => {
            const li = document.createElement("li");
            li.textContent = affirmation;
            favoritesList.appendChild(li);
        });
    }

    createAffirmationBtn.addEventListener("click", function () {
        const newAffirmationText = prompt("Enter your new affirmation:");
        if (newAffirmationText) {
            affirmationsData.push({ text: newAffirmationText });
            displayAffirmations(affirmationsData);
        }
    });

});
