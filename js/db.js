import {girarSpinner, detenerSpinner} from './tabla.js';
const miURL = "http://localhost:3000/monstruos";
const tiposURL = "http://localhost:3000/tipos";




/**
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

export const getCardsFetch = () => 
{
    return new Promise((resolve, reject) => 
    {
        fetch(miURL) // El Fetch retorna una promesa.
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




// AJAX ===================================================================     
// GET
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

// GET por ID
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