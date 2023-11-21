import {actualizarTabla, ordenarTabla} from "./tabla.js";
import {Monstruo} from "./Monstruo.js";
import {validarDatos, limpiarValidaciones} from "./validaciones.js";
import {
    getTiposAjax,
    getAnunciosAjax,
    getAnunciosAxios,
    getAnunciosFetch,
    createAnuncioAjax,
    createAnuncioAxios,
    createAnuncioFetch,
    updateAnuncioAjax,
    updateAnuncioAxios,
    updateAnuncioFetch,
    deleteAnuncioAjax,
    deleteAnuncioAxios,
    deleteAnuncioFetch,
    getAnuncioPorIdAjax
} from "./db.js";



let id = null; 
let index = null; 
const $form = document.forms[0];
const $containerTabla = document.getElementById("tabla");
const $containerBotones = document.getElementById("botones-container");
const $select = document.getElementById("filtro");
const listaTipos = await getTiposAjax();
const lista = await getAnunciosAjax(); 
let banderaFiltros = false;
let listaFiltrada = filtrarTabla($containerTabla, lista, $select.value);
let listadoCheck = listaFiltrada;
document.getElementById("btnGuardar").disabled = false;
const checkbox = document.querySelectorAll(".chbox");
checkbox.forEach(element => {element.checked = true;}); 
window.addEventListener("load", ()=>{$form.reset();});



$containerBotones.addEventListener("click", async (e) => 
{
    const boton = e.target.textContent;
    if(boton == "Guardar")
    {
        const {txtId, txtNombre, txtAlias, rdoDefensa, txtMiedo, opcTipo, txtFuerza} = $form;
        if(txtId.value === "")
        {
            if(validarDatos($form))
            {
                const newItem = new Monstruo(
                    Date.now(), 
                    txtNombre.value,
                    txtFuerza.value,
                    txtAlias.value, 
                    rdoDefensa.value,
                    parseInt(txtMiedo.value),
                    opcTipo.value
                    );
                limpiarForm();
                createAnuncioAjax(newItem);   //Ajax 
                 //createAnuncioAxios(newItem); Axios
                 //createAnuncioFetch(newItem); Fetch
            }
        }
        else
        {
            if(validarDatos($form) && confirm("¿Desea guardar los cambios?"))
            {
                const newItem = new Monstruo(
                    parseInt(txtId.value), 
                    txtNombre.value,
                    txtFuerza.value,
                    txtAlias.value, 
                    rdoDefensa.value, 
                    parseInt(txtMiedo.value),
                    opcTipo.value
                    );
                limpiarForm();
                updateAnuncioAjax(newItem); //Ajax
                //updateAnuncioAxios(newItem); //Axios
                //updateAnuncioFetch(newItem); //Fetch
            }
        }
    }
    else if(boton == "Eliminar")
    {   
        if(index && confirm("¿ELIMINAR?"))
        {
            deleteAnuncioAjax(id); //Ajax
            //deleteAnuncioAxios(id); //Axios
            //deleteAnuncioFetch(id); //Fetch
            limpiarForm();
        }
    }
    else if(boton == "Cancelar")
    {
        limpiarForm();
        limpiarValidaciones();
    }
});

$containerTabla.addEventListener("click", (e)=>
{
    if(e.target.matches("td")) 
    {
        let selectedItem;
        index = e.target.parentElement.getAttribute("data-id");
        id = listaFiltrada[index].id;
        selectedItem = listaFiltrada.find((item)=>item.id == id);
        cargarFormItem($form, selectedItem);
        document.getElementById("btnCancelar").disabled = false;
        document.getElementById("btnEliminar").disabled = false;
        limpiarValidaciones();
    }
    else if(e.target.matches("th"))
    {   
        let claveSort = e.target.textContent;
        ordenarTabla(listadoCheck, claveSort);
        limpiarForm();
        actualizarTabla($containerTabla, listadoCheck);
    }
});

function cargarFormItem(formulario, item)
{  
    formulario.txtId.value = item.id;
    formulario.txtNombre.value = item.nombre;
    formulario.txtAlias.value = item.alias;
    formulario.rdoDefensa.value = item.defensa;
    formulario.txtMiedo.value = item.miedo;
    formulario.opcTipo.value = item.tipo;
}

function limpiarForm()
{
    id = null;
    index = null;
    document.getElementById("txtId").value = "";
    document.getElementById("btnCancelar").disabled = true;
    document.getElementById("btnEliminar").disabled = true;
    $form.reset();
}

cargarTipos(listaTipos);
function cargarTipos(lista)
{
    let input = document.getElementById("txtTipo");
    lista.forEach(element => {
        const tipo = document.createElement('option');
        input.appendChild(tipo);
        tipo.value = element;
        tipo.textContent = element;
    });
}

function filtrarTabla(contenedor, lista, filtro)
{
    if(filtro != "Todos")
    {
        let listaFiltrada = lista.filter((elemento)=>elemento.defensa == filtro);
        actualizarTabla(contenedor, listaFiltrada);
        banderaFiltros = true;
        return listaFiltrada;
    }
    else
    {
        actualizarTabla(contenedor, lista);
        banderaFiltros = false;
        return lista;
    }
}

$select.addEventListener("change", () => 
{
    listaFiltrada = filtrarTabla($containerTabla, lista, $select.value);
    checkbox.forEach(element => {element.checked = true;});
    limpiarForm();
});

const modificarTabla = () =>
{
    const checked = {};
    checkbox.forEach((elem) => {checked[elem.name] = elem.checked});
    listadoCheck = listaFiltrada.map((elem) =>
    {
        const newElement = {};
        for (const key in elem)
        {
            if(key == "id" || checked[key] == true)
            {
                newElement[key] = elem[key];
            }
        }
        return newElement;
    });
    actualizarTabla($containerTabla, listadoCheck);
};

checkbox.forEach((elem) => elem.addEventListener("click", modificarTabla));
