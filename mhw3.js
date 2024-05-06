const destra = document.querySelector('#destra');
const sinistra = document.querySelector('#sinistra');

destra.addEventListener('click', cambiaimg);
sinistra.addEventListener('click', cambiaimg);

function cambiaimg(event)
{
  let image = document.querySelector('#img1alt');
  image.classList.toggle("display")
}

const button = document.createElement("button");
document.body.appendChild(button);
button.innerHTML="up"
button.style.position = "fixed"; 
button.style.bottom = "20px";
button.style.right = "20px";

button.addEventListener('click', risali);

function risali() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  const images = document.querySelectorAll(".ttt img");

  images.forEach((image) => {
      image.dataset.originalSrc = image.src;
  
      image.dataset.hoverSrc = "play.jpg";
  
      image.addEventListener("mouseenter", () => {
          image.src = image.dataset.hoverSrc;
      });
  
      image.addEventListener("mouseleave", () => {
          image.src = image.dataset.originalSrc;
      });
  });


    // Seleziona l'elemento che rappresenta il trigger per generare il div
const triggerElement = document.querySelector('.Bottom');
function onJson(json) {
  console.log('JSON ricevuto');
  // Svuotiamo la libreria
  const library = document.querySelector('#album-view');
  library.innerHTML = '';
  // Leggi il numero di risultati
  const results = json.albums.items;
  let num_results = results.length;
  // Mostriamone al massimo 10
  if(num_results > 10)
    num_results = 10;
  // Processa ciascun risultato
  for(let i=0; i<num_results; i++)
  {
    // Leggi il documento
    const album_data = results[i]
    // Leggiamo info
    const title = album_data.name;
    const selected_image = album_data.images[0].url;
    // Creiamo il div che conterrÃ immagine e didascalia
    const album = document.createElement('div');
    album.classList.add('album');
    // Creiamo l'immagine
    const img = document.createElement('img');
    img.src = selected_image;
    // Creiamo la didascalia
    const caption = document.createElement('span');
    caption.textContent = title;
    // Aggiungiamo immagine e didascalia al div
    album.appendChild(img);
    album.appendChild(caption);
    // Aggiungiamo il div alla libreria
    library.appendChild(album);
  }
}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function search(event)
{
  // Impedisci il submit del form
  event.preventDefault();
  // Leggi valore del campo di testo
  const album_input = document.querySelector('#album');
  const album_value = encodeURIComponent(album_input.value);
  console.log('Eseguo ricerca: ' + album_value);
  // Esegui la richiesta
  fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson);
}

function onTokenJson(json)
{
  // Imposta il token global
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}

// OAuth credentials --- NON SICURO!
const client_id = '7c175c88a7be49ce9efceeeb550429d0';
const client_secret = '6837fdfd4eb842258e608adee605b8d6';
// Dichiara variabile token
let token;
// All'apertura della pagina, richiediamo il token
fetch("https://accounts.spotify.com/api/token",
{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

const sub = document.querySelector("#submit");
sub.addEventListener("click",search);











async function fetchJokeOfTheDay() {
  const url = 'https://dad-jokes7.p.rapidapi.com/dad-jokes/joke-of-the-day';
  const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': '29f2f5cd52msh430133e3cebf62ep1f7ec6jsn6774343f11ee',
          'X-RapidAPI-Host': 'dad-jokes7.p.rapidapi.com'
      }
  };

  try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result.joke;
  } catch (error) {
      console.error(error);
      return 'Failed to fetch joke. Please try again later.';
  }
}

async function displayJoke() {
  const jokeContainer = document.getElementById('joke');
  jokeContainer.textContent = 'Loading...';

  const joke = await fetchJokeOfTheDay();
  jokeContainer.textContent = joke;
}

// Chiamata iniziale per mostrare la barzelletta al caricamento della pagina
displayJoke();