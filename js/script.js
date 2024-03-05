const userInput = document.getElementById('userInput');
const chatLog = document.getElementById('chatLog');
var prompt = "Seu nome é Luna. Você é uma assistente virtual que responde perguntas sobre sustentabilidade e consumo energético. Não escreva de modo itemizado. Responda de modo breve e direto, utilizando no máximo 100 palavras: \n"

var i = 0;
let speed;
function typeWriter(response, p) {
  speed = 50;

  if (i < response.length) {
    p.innerHTML += response.charAt(i);
    i++;
    setTimeout(() => typeWriter(response, p), speed);
  } else {
    document.getElementById("sendButton").disabled = false;
  }
}

async function sendMessage() {
  userInputValue = userInput.value;
  userInput.value = '';

  var p = document.createElement('p');
  p.innerHTML = "<b>VOCÊ:</b><br>" + userInputValue;
  p.classList = 'sent';
  chatLog.appendChild(p);

  const response = await generateResponse(userInputValue);
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      displayResponse(response);
      resolve();
    }, userInputValue.length * speed); // Esse cálculo baseia-se no tempo que a função typeWriter levará para digitar toda a entrada
  });
  
}

async function generateResponse(inputText) {
  
  const loader = document.querySelector('.loader');
  document.getElementById("sendButton").disabled = true; 
  loader.style.display = 'inline-block'; // Mostra o loader
    const params = {
        messages: [{ "role": "user", "content": prompt + inputText }],
        do_sample: true,
        max_tokens: 300,
        temperature: 0.2,
        top_p: 0.75,
    };

  try {
    const response = await fetch('https://chat.maritaca.ai/api/chat/inference', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Key ' + KEY // Substitua YOUR_API_KEY pelo seu próprio token de autenticação
        },
        body: JSON.stringify(params)
    });

    const responseData = await response.json();

    return responseData.answer;
  } catch (error) {
    console.error('Erro ao gerar resposta:', error);
  } finally {
    loader.style.display = 'none'; // Esconde o loader
  }
}

function displayResponse(response) {
  var p = document.createElement('p');
  p.innerHTML = "<b>LUNA:</b><br>";
  p.classList = 'text-incoming received';
  chatLog.appendChild(p);
  i = 0;
  typeWriter(response, p); 
}