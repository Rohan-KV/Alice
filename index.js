const API_KEY = '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';
async function getAIResponse(userMessage) {
    const endpoint = 'https://openrouter.ai/api/v1/chat/completions'; 

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'nousresearch/hermes-3-llama-3.1-405b:free',
                messages: [{ role: 'user', content: userMessage }]
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.choices[0].message.content; 
    } catch (error) {
        console.error('Error fetching AI response:', error);
        return 'Sorry, something went wrong!'; 
    }
}
document.getElementById('sendButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput');
    const userMessage = userInput.value.trim();

    if (userMessage) {
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user';
        userMessageDiv.textContent = userMessage;
        document.getElementById('messages').appendChild(userMessageDiv);

        userInput.value = '';
        const aiResponse = await getAIResponse(userMessage);
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.className = 'message alice';
        aiMessageDiv.textContent = aiResponse;
        document.getElementById('messages').appendChild(aiMessageDiv);
        document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
    }
});
