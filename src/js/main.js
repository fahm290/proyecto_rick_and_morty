let characters = [];

fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .then((data) => {
        console.log(data.results);

        characters = data.results;

        drawCard(data.results[7]);
        // por cada result
        // haz un drawCard de ese result
        drawCards(data.results)
        clearCards()
    });

function configureInput(){
    // 1. seleccionar el input
    // 2. tenemos que añadirle un callback para cuando pulsamos enter
    // 3. al pulsar enter, imprimir lo que hay escrito en el input
    // al final llamar a drawcard para que imprima las que coincidan
    let inputBuscador = document.querySelector(".menu__buscador");
    inputBuscador.onkeypress = clickCallback;

    function clickCallback(event){
        let valorInput = inputBuscador.value;
        if( event.keyCode ===13){
            //let filterCharacters = characters.filter(character=> character.name.toLowerCase().includes(valorInput) && character.gender.toLowerCase() == "male");
            let filterCharacters = characters.filter(character=> character.name.toLowerCase().includes(valorInput.toLowerCase()));
            clearCards();
            drawCards(filterCharacters);
        }
    }
}

configureInput()




function drawCards(characters){
    // 1. pinta una card por cada character
    for (let item of characters) {
        drawCard(item);
    }
}

function clearCards(){
    // 2. elimina todas las tarjetas del html
    let container = document.querySelector(".section-cards__container");
    container.innerHTML = "";

}


function drawCard(characterData) {
    console.log(characterData);
    let template = `
   
    <div class="card__content">
        <div class="card__box-img">
            <img class="card__img" src=${characterData.image} alt="" class="card__img" />
        </div>

        <div class="card__box-text">
            <div class="card__name">${characterData.name}</div>
            <div class="card__text">
                <p class="card__status">
                    <span class="card__status-circle"></span>${characterData.status}
                </p>
                <p class="card__type">- ${characterData.species}</p>
            </div>
        </div>
    </div>

    `;
    function clickCallback() {
        showModal(characterData);
    }

    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.innerHTML = template;
    card.onclick = clickCallback;
    let container = document.querySelector(".section-cards__container");
    container.appendChild(card);
}

function showModal(characterData) {
    let modal = document.querySelector("#characterModal");
    modal.classList.remove("hidden");

    let modalContainer= document.querySelector(".modal__container");

    let template = `<div class="modal__img">
            <img src="${characterData.image}" alt="imagen de carta">
        </div>

        <div class="modal__text">

            <div class="modal__title">${characterData.name}</div>
            
            <div class="modal__class">
                <p class="modal__status">
                    <span class="modal__status-circle"></span>${characterData.status}
                </p>
                <p class="modal__type">${characterData.species}</p>
            </div>
            <div class="modal__details">
                <p class="modal__details-regular">Gender</p>
                <p class="modal__details-bold">Male</p>
            </div>

            <div class="modal__details">
                <p class="modal__details-regular">Origin</p>
                <p class="modal__details-bold">Earth</p>
            </div>

            <div class="modal__details">
                <p class="modal__details-regular">Last know location</p>
                <p class="modal__details-bold">Earth</p>
            </div>

        </div>

        <a class="botonCerrar" href="#">
            <img src="src/img/icons8-macos-cerrar-32.png" alt="icono de cerrar">
        </a>`;

    modalContainer.innerHTML = template;

    let botonCerrar = document.querySelector(".botonCerrar");
    //botonCerrar.setAttribute("class", "botonCerrar");
    botonCerrar.onclick = hideModal;

    function hideModal(){
        let modal = document.querySelector("#characterModal");
        modal.classList.add("hidden");
    }

}

console.log("hola")