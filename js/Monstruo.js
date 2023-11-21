import {Personaje} from "./Personaje.js";

export class Monstruo extends Personaje 
{
    constructor(
        id,
        nombre,
        fuerza,
        alias,
        defensa,
        miedo,
        tipo,
    ) 
    {
        try 
        {
            super(id, nombre, fuerza);
            this.alias = alias;
            this.defensa = defensa;
            this.miedo = miedo;
            this.tipo = tipo;
        } 
        catch (ex) 
        {
            throw ex;
        }
    }
}