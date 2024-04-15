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
                    filteredAffirmations.push("I am worthy of love, understanding, and compassion. Despite any challenges I face, I acknowledge that my worthiness is inherent and not determined by external factors. I embrace my vulnerabilities as part of my humanity, allowing myself to experience a range of emotions without judgment. With each breath, I cultivate self-compassion, knowing that it is okay to seek support when needed. Today, I choose to prioritize my mental well-being by nurturing myself with kindness and acceptance.");
                    filteredAffirmations.push("Your mental well-being is important, and you are worthy of support.");
                    break;
                case "Physical and Emotional Well-Being":
                    filteredAffirmations.push("I affirm my commitment to nurturing both my physical and emotional health. I recognize the interconnectedness between the two and strive to maintain a balanced lifestyle that supports my overall well-being. I prioritize activities that promote physical strength and vitality, such as regular exercise and nutritious eating, while also dedicating time to nourish my emotional state through practices like mindfulness, self-reflection, and seeking support from loved ones. By caring for both my body and mind, I empower myself to lead a fulfilling and harmonious life.");
                    filteredAffirmations.push("Embracing self-care practices nurtures your emotional and physical well-being.");
                    break;
                case "Personal Development and Growth":
                    filteredAffirmations.push("I affirm my dedication to personal development and growth, recognizing it as a lifelong journey of self-discovery and improvement. I embrace opportunities for learning and self-reflection, seeking to expand my knowledge, skills, and understanding of myself and the world around me. I approach challenges with curiosity and openness, viewing them as opportunities for growth and self-discovery. With each new experience, I cultivate resilience and deepen my understanding of myself, enriching my life and contributing to the world around me.");
                    filteredAffirmations.push("You are evolving into the best version of yourself with every experience.");
                    break;
                case "Interpersonal Relationships":
                    filteredAffirmations.push("I affirm my commitment to nurturing healthy interpersonal relationships built on mutual respect, understanding, and empathy. I recognize the importance of genuine connections in fostering a sense of belonging and support. I prioritize active listening and authentic communication, seeking to understand others' perspectives with compassion and openness. I cultivate trust and appreciation in my relationships, valuing each individual's unique qualities and contributions. By fostering meaningful connections, I create a supportive network that enriches my life and enhances my well-being.");
                    filteredAffirmations.push("Your connections with others enrich your life and bring joy.");
                    break;
                default:
                    break;
            }

            challenges.forEach(challenge => {
                switch (challenge) {
                    case "Depression":
                        filteredAffirmations.push("Despite the weight of depression that may sometimes cloud my mind, I recognize my inner strength and resilience. I affirm that I am capable of finding moments of lightness and joy even amid darkness. I embrace self-compassion and reach out for support when needed, knowing that healing is a journey and that I am worthy of love, happiness, and inner peace.");
                        break;
                    case "Anxiety Disorders":
                        filteredAffirmations.push("Despite the challenges that anxiety may present, I affirm my ability to find calmness and clarity within myself. I embrace mindfulness practices and deep breathing techniques to soothe my mind and body. I trust in my resilience and adaptability, knowing that I can navigate through moments of discomfort with grace and strength.",
                        "In the face of anxiety, I choose to cultivate a sense of inner peace and tranquility. I acknowledge that anxiety is a temporary state, and I have the power to shift my focus toward thoughts of positivity and empowerment. I surround myself with supportive individuals and engage in activities that bring me joy, knowing that I am worthy of peace and serenity.");
                        break;
                    case "Chronic Pain":
                        filteredAffirmations.push("I affirm my ability to navigate the challenges of chronic pain with strength and resilience. Despite the discomfort and limitations it may bring, I choose to approach each day with courage and determination. I embrace self-compassion and patience as I explore various coping strategies and treatment options, knowing that healing is a gradual process. I seek support from healthcare professionals and loved ones who understand and empathize with my journey, and I remain hopeful for moments of relief and comfort along the way.");
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
        selectedAffirmationDiv.style.display = "block"; 
        affirmationDiv.style.display = "none";
    });
});        