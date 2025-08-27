// Simple console log to show the script is loaded
console.log("Time Machine Conversations loaded!");


// DOM elements
const characterSelect = document.getElementById('characterSelect');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

let currentCharacter = null;

const characters = {
    einstein: {
        name: "Albert Einstein",
        era: "1879-1955",
        greeting: "Guten Tag! I am Albert Einstein. I'm delighted to discuss physics, philosophy, or the mysteries of the universe with you."
    },
    shakespeare: {
        name: "William Shakespeare",
        era: "1564-1616", 
        greeting: "Good morrow to thee! I am William Shakespeare, humble playwright and poet. What tale or verse shall we discuss?"
    },
    twain: {
        name: "Mark Twain",
        era: "1835-1910",
        greeting: "Howdy! I'm Mark Twain, writer and humorist. I reckon we can have ourselves a fine conversation about life, literature, or whatever strikes your fancy!"
    }
};

characterSelect.addEventListener('change', function() {
    const selectedValue = this.value;
    
    if (selectedValue && characters[selectedValue]) {
        currentCharacter = selectedValue;
        chatMessages.innerHTML = '';
        
        addMessage('assistant', characters[selectedValue].greeting, characters[selectedValue].name);
        
        userInput.disabled = false;
        sendButton.disabled = false;
        userInput.placeholder = `Chat with ${characters[selectedValue].name}...`;
        userInput.focus();
        
        console.log(`Selected character: ${characters[selectedValue].name}`);
    } else {
        // Disable input if no character selected
        currentCharacter = null;
        userInput.disabled = true;
        sendButton.disabled = true;
        chatMessages.innerHTML = '<p><em>Select a historical figure to start your conversation...</em></p>';
    }
});

sendButton.addEventListener('click', sendMessage);

userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    
    if (message && currentCharacter) {
        addMessage('user', message);
        
        userInput.value = '';
        
        setTimeout(() => {
            const character = characters[currentCharacter];
            const response = generateCharacterResponse(message, character);
            addMessage('assistant', response, character.name);
        }, 500);
    }
}

function generateCharacterResponse(userMessage, character) {
    const responses = {
        einstein: [
            "Fascinating question! In the realm of physics, we must consider the relationship between space and time...",
            "Ah, this reminds me of my work on relativity. The universe is far more mysterious than we can imagine.",
            "Very interesting! Let me share a thought experiment with you..."
        ],
        shakespeare: [
            "Ah, what a question worthy of the finest sonnet! Let me ponder this with thee...",
            "As the Bard himself might say, 'All the world's a stage' and your query plays its part.",
            "Methinks thou dost ask wisely. Let me weave words as I am wont to do..."
        ],
        twain: [
            "Well, I'll be! That's a mighty fine question you've got there, partner.",
            "Now that's the kind of thinking that makes life interesting! Let me tell you what I reckon...",
            "Well, shoot! That reminds me of a story I once heard..."
        ]
    };
    
    const characterResponses = responses[character.name.toLowerCase().split(' ')[0]];
    
    const randomIndex = Math.floor(Math.random() * characterResponses.length);
    return characterResponses[randomIndex];
}

function addMessage(role, content, characterName = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    
    if (role === 'assistant' && characterName) {
        messageDiv.innerHTML = `<strong>${characterName}:</strong> ${content}`;
    } else if (role === 'user') {
        messageDiv.innerHTML = `<strong>You:</strong> ${content}`;
    } else {
        messageDiv.innerHTML = content;
    }
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to the bottom to show the new message
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

console.log("Character selection functionality loaded!");