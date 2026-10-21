export type Categoria = 'actividades' |'artesanos' |'comercial'| 'comida' | 'servicios';

export interface Stand {
  id: number;
  nombre: string;
  categoria: Categoria;
  descripcion: string;
  x: number;
  y: number;
  width: number;
  height: number;
}