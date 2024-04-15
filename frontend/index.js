document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM content loaded");

    const signupForm = document.getElementById("signupForm");
    const signinForm = document.getElementById("signinForm");
    const questionsForm = document.getElementById("questionsForm");
    const signupDiv = document.getElementById("signupDiv");
    const signinDiv = document.getElementById("signinDiv");
    const questionsDiv = document.getElementById("questionsDiv");
    const affirmationDiv = document.getElementById("affirmationsDiv");
    const affirmationList = document.getElementById("affirmationsList");
    const selectedAffirmationDiv = document.getElementById("selectedAffirmationDiv");
    const selectedAffirmation = document.getElementById("selectedAffirmation");
    const chooseAffirmationBtn = document.getElementById("chooseAffirmationBtn");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        signupDiv.style.display = "none";
        questionsDiv.style.display = "block";
    });

    questionsForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const focus = document.getElementById("focus").value;
        const challenges = Array.from(document.getElementById("challenges").selectedOptions).map(option => option.value);
        displayAffirmations(focus, challenges);
    });

    function displayAffirmations(focus, challenges) {
        function getFilteredAffirmations(focus, challenges) {
            let filteredAffirmations = [];

            switch (focus) {
                case "Mental Health":
                    filteredAffirmations.push("You are capable of overcoming any mental health challenge.");
                    filteredAffirmations.push("Your mental well-being is important, and you are worthy of support.");
                    break;
                case "Physical and Emotional Well-Being":
                    filteredAffirmations.push("Your body is strong and resilient, capable of healing and thriving.");
                    filteredAffirmations.push("Embracing self-care practices nurtures your emotional and physical well-being.");
                    break;
                case "Personal Development and Growth":
                    filteredAffirmations.push("Every challenge you face is an opportunity for growth and learning.");
                    filteredAffirmations.push("You are evolving into the best version of yourself with every experience.");
                    break;
                case "Interpersonal Relationships":
                    filteredAffirmations.push("Your relationships are built on a foundation of love, respect, and communication.");
                    filteredAffirmations.push("Your connections with others enrich your life and bring joy.");
                    break;
                default:
                    break;
            }

            challenges.forEach(challenge => {
                switch (challenge) {
                    case "Depression":
                        filteredAffirmations.push("You have the strength to overcome depression and find joy in life.");
                        break;
                    case "Anxiety Disorders":
                        filteredAffirmations.push("You are calm, centered, and in control of your anxiety.");
                        break;
                    case "Chronic Pain":
                        filteredAffirmations.push("Your body is resilient, and you can manage chronic pain with grace and strength.");
                        break;
                    default:
                        break;
                }
            });

            return filteredAffirmations;
        }

        let filteredAffirmations = getFilteredAffirmations(focus, challenges);

        affirmationList.innerHTML = "";
        filteredAffirmations.forEach(affirmation => {
            const affirmationItem = document.createElement("p");
            affirmationItem.textContent = affirmation;
            affirmationList.appendChild(affirmationItem);
        });

        questionsDiv.style.display = "none";
        affirmationDiv.style.display = "block";
    }

    chooseAffirmationBtn.addEventListener("click", function () {
        const affirmations = document.querySelectorAll("#affirmationsList p");
        const randomIndex = Math.floor(Math.random() * affirmations.length);
        const selectedAffirmationText = affirmations[randomIndex].textContent;
        selectedAffirmation.textContent = selectedAffirmationText;
        affirmationDiv.style.display = "none";
        selectedAffirmationDiv.style.display = "block";
    });

});
