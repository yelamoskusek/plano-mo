// src/app/models/plano.model.ts
export interface Plano {
  id: string;
  nombre: string;
  archivo: string;   // ruta del SVG en /public/assets
  archivoStands : string; //json con los stand de su planta
}