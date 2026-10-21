// src/app/services/filter.service.ts
import { Injectable, computed, signal } from '@angular/core';
import { Categoria, Stand } from '../models/stand.model';
import { StandsService } from './stand.service';

@Injectable({ providedIn: 'root' })
export class FilterService {
  private readonly _categoriaActiva = signal<Categoria | null>(null);
  readonly categoriaActiva = this._categoriaActiva.asReadonly();

  // Ahora `stands()` ya contiene solo los del plano activo
  readonly standsFiltrados = computed<Stand[]>(() => {
    const cat = this._categoriaActiva();
    const todos = this.standsService.stands();
    return cat ? todos.filter(s => s.categoria === cat) : todos;
  });

  constructor(private standsService: StandsService) {}

  filtrarPor(categoria: Categoria | null): void {
    this._categoriaActiva.set(categoria);
  }

  estaResaltado(stand: Stand): boolean {
    const cat = this._categoriaActiva();
    return cat === null || stand.categoria === cat;
  }
}