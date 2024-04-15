document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM content loaded");

    const signupForm = document.getElementById("signupForm");
    const signinForm = document.getElementById("signinForm");
    const questionsForm = document.getElementById("questionsForm");
    const profileForm = document.getElementById("profileForm");
    const signupDiv = document.getElementById("signupDiv");
    const signinDiv = document.getElementById("signinDiv");
    const questionsDiv = document.getElementById("questionsDiv");
    const profileDiv = document.getElementById("profileDiv");
    const confirmationDiv = document.getElementById("confirmationDiv");
    const affirmationDiv = document.getElementById("affirmationDiv");

    signupDiv.style.display = "block";
    signinDiv.style.display = "none";
    profileDiv.style.display = "none";
    questionsDiv.style.display = "none";
    confirmationDiv.style.display = "none";
    affirmationDiv.style.display = "none";

    console.log("Signup div:", signupDiv.style.display);

    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error('Failed to sign up');
            }

            signupDiv.style.display = "none";
            profileDiv.style.display = "block";
        } catch (error) {
            console.error('Error signing up:', error);
        }
    });

    signinForm.addEventListener("submit", function (event) {
        event.preventDefault();
        signupDiv.style.display = "none";
        signinDiv.style.display = "none";
        questionsDiv.style.display = "block";
    });

    profileForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const gender = document.getElementById("gender").value;
        const language = document.getElementById("language").value;

        try {
            const response = await fetch('/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    age: age,
                    gender: gender,
                    language: language
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create profile');
            }

            profileDiv.style.display = "none";
            questionsDiv.style.display = "block";
        } catch (error) {
            console.error('Error creating profile:', error);
        }
    });

    questionsForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const focus = document.getElementById("focus").value;
        const challenges = Array.from(document.getElementById("challenges").selectedOptions).map(option => option.value);

        try {
            const filteredAffirmations = getFilteredAffirmations(focus, challenges);
            displayAffirmations(filteredAffirmations);

        } catch (error) {
            console.error('Error submitting answers:', error);
        }
    });

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

    function displayAffirmations(affirmations) {
        const affirmationContainer = document.getElementById("affirmationContainer");
        affirmationContainer.innerHTML = ""; 

        affirmations.forEach(affirmation => {
            const affirmationElement = document.createElement("p");
            affirmationElement.textContent = affirmation;
            affirmationContainer.appendChild(affirmationElement);
        });

        questionsDiv.style.display = "none";
        affirmationDiv.style.display = "block";
    }
});
