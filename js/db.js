const miURL = "http://localhost:3000/monstruos";
const tiposURL = "http://localhost:3000/tipos";
import {girarSpinner, detenerSpinner} from './tabla.js';




/** DOCUMENTACION
 * Realiza una solicitud AJAX para obtener la lista de tipos de monstruos.
 *
 * @function
 * @returns {Promise<Array<string>>} Una promesa que se resuelve con un array de tipos o se rechaza con un objeto de error.
 * @throws {Object} Un objeto que contiene el estado de la solicitud y su descripción si la solicitud no tiene éxito.
 * @async
 * @example
 * // Uso del método
 * getTiposAjax()
 *   .then((tipos) => {
 *     // Manejar la lista de tipos obtenida
 *   })
 *   .catch((error) => {
 *     // Manejar el error de la solicitud
 *   });
 */
export const getTiposAjax = () => 
{
    girarSpinner();
    return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
            }
            else
            {
                reject({status: xhr.status, statusText: xhr.statusText});
            }
            detenerSpinner();
        }
    });
    xhr.open("GET", tiposURL);
    xhr.send();
    });
};


/** DOCUMENTACION
 * Realiza una solicitud Fetch para obtener la lista de monstruos.
 *
 * @function
 * @returns {Promise<Array<Object>>} Una promesa que se resuelve con un array de monstruos o se rechaza con un objeto de error.
 * @throws {Object|String} Un objeto que contiene la respuesta de la solicitud Fetch o un mensaje de error si la solicitud no tiene éxito.
 * @async
 * @example
 * // Uso del método
 * getCardsFetch()
 *   .then((monstruos) => {
 *     // Manejar la lista de monstruos obtenida
 *   })
 *   .catch((error) => {
 *     // Manejar el error de la solicitud
 *   });
 */
export const getCardsFetch = () => 
{
    return new Promise((resolve, reject) => 
    {
        fetch(miURL)
        .then((respuesta)=>{
            if(respuesta.ok)
            {
                return resolve(respuesta.json());
            }
            else
            {
                return reject(respuesta);
            }
        })
        .catch((err)=>{
            return reject(err.message);
        })
    });
};




// AJAX 
// GET

/** DOCUMENTACION
 * Realiza una solicitud Ajax mediante XMLHttpRequest para obtener la lista de anuncios.
 *
 * @function
 * @returns {Promise<Array<Object>>} Una promesa que se resuelve con un array de anuncios o se rechaza con un objeto de error.
 * @throws {Object} Un objeto que contiene el estado y el mensaje de error si la solicitud no tiene éxito.
 * @async
 * @example
 * // Uso del método
 * getAnunciosAjax()
 *   .then((anuncios) => {
 *     // Manejar la lista de anuncios obtenida
 *   })
 *   .catch((error) => {
 *     // Manejar el error de la solicitud
 *   });
 */
export const getAnunciosAjax = () => 
{
    girarSpinner();
    return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
            }
            else
            {
                reject({status: xhr.status, statusText: xhr.statusText});
            }
            detenerSpinner();
        }
    });
    xhr.open("GET", miURL);
    xhr.send();
    });
};


/** DOCUMENTACION
 * Realiza una solicitud Ajax mediante XMLHttpRequest para obtener un anuncio específico por su ID.
 *
 * @function
 * @param {number} id - El ID del anuncio que se desea obtener.
 * @returns {void}
 * @async
 * @example
 * // Uso del método
 * getAnuncioPorIdAjax(1);
 */
export const getAnuncioPorIdAjax = (id) => 
{
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
        }
    });
    xhr.open("GET", miURL + "/" + id);
    xhr.send();
};


/** DOCUMENTACION
 * Realiza una solicitud Ajax mediante XMLHttpRequest para crear un nuevo anuncio.
 *
 * @function
 * @param {Object} anuncio - Objeto que contiene la información del nuevo anuncio.
 * @returns {void}
 * @async
 * @example
 * // Uso del método
 * const nuevoAnuncio = {
 *    nombre: "Nuevo Monstruo",
 *    alias: "Alias Monstruo",
 *    defensa: "Estaca",
 *    fuerza: 75,
 *    miedo: 90,
 *    tipo: "Vampiro"
 * };
 * createAnuncioAjax(nuevoAnuncio);
 */
export const createAnuncioAjax = (anuncio) => 
{
    girarSpinner();
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
            detenerSpinner();
        }
    });
    xhr.open("POST", miURL);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(anuncio));
};



/**
 * Realiza una solicitud Ajax mediante XMLHttpRequest para eliminar un anuncio por su ID.
 *
 * @function
 * @param {number} id - ID del anuncio que se va a eliminar.
 * @returns {void}
 * @async
 * @example
 * // Uso del método
 * const anuncioId = 123; // Reemplazar con el ID del anuncio que se desea eliminar
 * deleteAnuncioAjax(anuncioId);
 */
export const deleteAnuncioAjax = (id) => 
{
    girarSpinner();
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log("Borrado");
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
            detenerSpinner();
        }
    });
    xhr.open("DELETE", miURL + "/" + id);
    xhr.send();
};




export const updateAnuncioAjax = (anuncio) => 
{
    girarSpinner();
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", ()=> {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else
            {
                console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
            }
            detenerSpinner();
        }
    });
    xhr.open("PUT", miURL + "/" + anuncio.id);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.send(JSON.stringify(anuncio));
};

export const getAnunciosAxios = () => 
{
    girarSpinner();
    return new Promise((resolve, reject) =>{
        axios.get(miURL)            // El Axios trabaja con Ajax, retorna una Promesa
        .then((res)=> // ({data})
        {
            const {data} = res;
            resolve(data);
        })
        .catch((err)=>
        {
            reject(err.message);
        })
        .finally(()=>{
            detenerSpinner();
        });
    });
};

export const createAnuncioAxios = async (anuncio) => 
{
    girarSpinner();
    try 
    {
        let {datos} = await axios.post(miURL, anuncio, {"Content-Type": "application/json;charset=utf-8"});
    } 
    catch (err) 
    {
        console.error(err.message);
    }
    finally
    {
        detenerSpinner();
    }
};


export const deleteAnuncioAxios = async (id) => 
{
    girarSpinner();
    try
    {
        let {data} = await axios.delete(miURL + "/" + id);
        console.log(data);
    }
    catch(err)
    {
        console.error(err.message);
    }
    finally
    {
        detenerSpinner();
    }
};


export const updateAnuncioAxios = async (anuncio) => 
{
    girarSpinner();
    try 
    {
        let {datos} = await axios.put(miURL + "/" + anuncio.id, anuncio, {"Content-Type": "application/json;charset=utf-8"});
    } 
    catch (err) 
    {
        console.error(err.message);
    }
    finally
    {
        detenerSpinner();
    }
};


export const getAnunciosFetch = () => 
{
    girarSpinner();
    return new Promise((resolve, reject) => 
    {
        fetch(miURL) 
        .then((respuesta)=>{
            if(respuesta.ok)
            {
                return resolve(respuesta.json());
            }
            else
            {
                return reject(respuesta);
            }
        })
        .catch((err)=>{
            return reject(err.message);
        })
        .finally(()=>{
            detenerSpinner();
        })
    });
};

export const createAnuncioFetch = (anuncio) => 
{
    girarSpinner();
    fetch(miURL, { 
        method: "POST",
        headers: {"Content-Type": "application/json;charset=utf-8"},
        body: JSON.stringify(anuncio)
    })
    .then((respuesta)=>{
        if(respuesta.ok)
        {
            return respuesta.json();
        }
        else
        {
            return Promise.reject(respuesta);
        }
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`);
    })
    .finally(()=>{
        detenerSpinner();
    })
};

export const deleteAnuncioFetch = (id) => 
{
    girarSpinner();
    fetch(miURL + "/" + id, {
        method: "DELETE"
    })
    .then((respuesta)=>{
        if(!respuesta.ok) return Promise.reject(respuesta);
        console.log("Borrado con exito");
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`);
    })
    .finally(()=>{
        detenerSpinner();
    })
};

export const updateAnuncioFetch = (anuncio) => 
{
    girarSpinner();
    fetch(miURL + "/" + anuncio.id, {   
        method: "PUT",
        headers: {"Content-Type": "application/json;charset=utf-8"},
        body: JSON.stringify(anuncio)
    })
    .then((respuesta)=>{
        if(respuesta.ok)
        {
            return respuesta.json();
        }
        else
        {
            return Promise.reject(respuesta);
        }
    })
    .catch((err)=>{
        console.error(`Error: ${err.status} - ${err.statusText}`);
    })
    .finally(()=>{
        detenerSpinner();
    })
};