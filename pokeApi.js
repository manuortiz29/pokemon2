const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const ITEMS_PER_PAGE = 20;

function getPokemon(offset) {
  fetch(`${API_BASE_URL}?offset=${offset}&limit=${ITEMS_PER_PAGE}`)
    .then(response => response.json())
    .then(data => {
      displayPokemon(data.results);
      createPagination(data.next, data.previous);
    })
    .catch(error => {
      console.error('Error al obtener los Pokémon:', error);
    });
}

function displayPokemon(pokemonData) {
  const pokemonCards = document.getElementById('pokemon-cards');
  pokemonCards.innerHTML = '';

  pokemonData.forEach(pokemon => {
    fetch(pokemon.url)
      .then(response => response.json())
      .then(data => {
        const card = document.createElement('div');
        card.classList.add('col-md-3');
        card.innerHTML = `
          <div class="card">
            <img src="${data.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
            <div class="card-body">
              <h5 class="card-title">${pokemon.name}</h5>
              <p class="card-text"><b>Status:</b> ${data.stats[0].stat.name}</p> <p class="card-text"><b>Especie:</b> ${data.species.name}</p>
            </div>
          </div>
        `;
        pokemonCards.appendChild(card);
      });
  });
}

function createPagination(nextUrl, prevUrl) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  if (prevUrl) {
    const prevButton = document.createElement('li');
    prevButton.classList.add('page-item');
    prevButton.innerHTML = `<a class="page-link" href="#" onclick="getPokemon('${new URL(prevUrl).searchParams.get('offset')}')">Previous</a>`;
    pagination.appendChild(prevButton);
  }

  if (nextUrl) {
    const nextButton = document.createElement('li');
    nextButton.classList.add('page-item');
    nextButton.innerHTML = `<a class="page-link" href="#" onclick="getPokemon('${new URL(nextUrl).searchParams.get('offset')}')">Next</a>`;
    pagination.appendChild(nextButton);
  }
}

getPokemon(0);