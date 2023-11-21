import {getCardsFetch} from "./db.js";

const lista = await getCardsFetch();

const seccionAnuncios = document.querySelector("#section-cards");

const listaIconos = ["./img/power.png", "./img/klipartz.com.png", "./img/espantap.png", "./img/5710331.png","./img/bruja.png"];

lista.forEach((elemento) => {
    const anuncio = crearAnuncio(elemento);
    seccionAnuncios.appendChild(anuncio);
});

function crearAnuncio(elemento) {
    const article = document.createElement("article");
    article.classList.add("card");
    let i = 0;
    Object.keys(elemento).forEach((key) => 
    {
        if (key !== "id") 
        {
            let clave = document.createElement("h3");
            if(key != "nombre")
            {
                let icono = document.createElement("img");
                icono.classList.add("icono");
                icono.src = listaIconos[i];
                i = i + 1;
                clave.appendChild(icono);
                let parrafo = document.createElement("div");
                parrafo.textContent = key;
                clave.appendChild(parrafo);
            }
            article.appendChild(clave);
            let contenido = document.createElement("p")
            contenido.textContent = elemento[key];
            article.appendChild(contenido);
        }
    });


    return article;
}