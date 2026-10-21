// src/app/services/favoritos.service.ts
import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly STORAGE_KEY = 'stands-favoritos';
  private readonly _ids = signal<Set<number>>(this.cargarDeStorage());
  readonly ids = this._ids.asReadonly();

  constructor() {
    // Cada cambio se guarda automáticamente en localStorage
    effect(() => {
      const ids = Array.from(this._ids());
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ids));
    });
  }

  esFavorito(id: number): boolean {
    return this._ids().has(id);
  }

  toggle(id: number): void {
    this._ids.update(actuales => {
      const nuevos = new Set(actuales);
      if (nuevos.has(id)) {
        nuevos.delete(id);
      } else {
        nuevos.add(id);
      }
      return nuevos;
    });
  }

  private cargarDeStorage(): Set<number> {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? new Set<number>(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  }
}