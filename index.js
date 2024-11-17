// Story Data: Each node has text, choices, and an optional path to go back.
const storyNodes = {
    start: {
        text: "Do you idealize someone?",
        choices: [
            { text: "Yes", next: "yes" },
            { text: "No", next: "leave" }
        ]
    },
    yes: {
        text: "Do you feel like you know everything about them?",
        choices: [
            { text: "Yes", next: "yes_iknow" },
            { text: "No", next: "no_idont" }
        ]
    },
    "yes_iknow": {
        text: "Remember, everyone has layers, and 'Inside a person you know, there is someone you don't know.'",
        choices: [
            { text: "I understand", next: "yes_i_get" },
            { text: "I see it differently", next: "different_view" }
        ]
    },
    no_idont: {
        text: "Isn't it strange that you still idealize them?",
        choices: [
            { text: "Start over", next: "start" },
        ]
    },
    leave: {
        text: "Do you find inspiration in others?",
        choices: [
            { text: "Yes", next: "yes_i_get" },
            { text: "No", next: "different_view" }
        ]
    },
    "yes_i_get": {
        text: "That’s great! Drawing inspiration from others can be a wonderful way to learn and grow.",
        choices: [
            { text: "Start over", next: "start" }
        ]
    },
    "different_view": {
        text: "That's perfectly fine. Everyone has their own way of finding direction, whether it's from within or from others.",
        choices: [
            { text: "Start over", next: "start" }
        ]
    }
};

let currentNode = "start";
let storyHistory = [];

// Initialize story on load
document.addEventListener("DOMContentLoaded", function () {
    // playBackgroundMusic();
    loadStoryNode(currentNode);
});

// Load a story node and display it with choices
function loadStoryNode(node) {
    storyHistory.push(node);
    const story = storyNodes[node];
    const storyTextDiv = document.getElementById("story");
    const choicesDiv = document.getElementById("choices");
    // Fade out old content
    fadeOut(storyTextDiv);
    fadeOut(choicesDiv);

    setTimeout(() => {
        // Update story text
        storyTextDiv.textContent = story.text;

        // Clear old choices
        choicesDiv.innerHTML = "";

        // Create new choices
        story.choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice.text;
            button.onclick = function () {
                // playChoiceSound();
                loadStoryNode(choice.next);
            };
            choicesDiv.appendChild(button);
        });

        // Fade in new content
        fadeIn(storyTextDiv);
        fadeIn(choicesDiv);
    }, 500);
}

// Navigate back
function goBack() {
    if (storyHistory.length > 1) {
        storyHistory.pop(); // Remove current node
        loadStoryNode(storyHistory.pop()); // Load the previous node
    }
}

// Fade-in animation
function fadeIn(element) {
    element.style.opacity = 0;
    let opacity = 0;
    const fade = setInterval(() => {
        opacity += 0.05;
        element.style.opacity = opacity;
        if (opacity >= 1) clearInterval(fade);
    }, 30);
}

// Fade-out animation
function fadeOut(element) {
    let opacity = 1;
    const fade = setInterval(() => {
        opacity -= 0.05;
        element.style.opacity = opacity;
        if (opacity <= 0) clearInterval(fade);
    }, 30);
}

// Play background music
// function playBackgroundMusic() {
//     const music = document.getElementById("background-music");
//     music.volume = 0.3;
//     music.play();
// }

// Play choice sound
// function playChoiceSound() {
//     const sound = document.getElementById("choice-sound");
//     sound.play();
// }
