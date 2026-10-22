// src/app/models/plano.model.ts
export type PlanoTipo = 'mapa' | 'lista';


export interface Plano {
  id: string;
  nombre: string;
  tipo: PlanoTipo;
  archivo?: string;   // ruta del SVG en /public/assets
  archivoStands? : string; //json con los stand de su planta
}