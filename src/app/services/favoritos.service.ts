// src/app/services/favoritos.service.ts
import { Injectable, signal, effect, inject } from '@angular/core';
import { Stand } from '../models/stand.model';
import { HttpClient } from '@angular/common/http';
import { PlanosService } from './plano.service';
import { firstValueFrom } from 'rxjs';

export interface FavoritoResuelto {
  stand: Stand;
  planoId: string;
}

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly STORAGE_KEY = 'stands-favoritos';
  private readonly _ids = signal<Set<number>>(this.cargarDeStorage());
  readonly ids = this._ids.asReadonly();

  private http = inject(HttpClient);
  private planosService = inject(PlanosService);
  private cacheStandsPorPlano = new Map<string, Stand[]>();


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

  async resolverFavoritos(): Promise<FavoritoResuelto[]> {
    const ids = this._ids();
    if (ids.size === 0) return [];

    const planos = this.planosService.planos().filter(p => p.tipo === 'mapa');
    const resueltos: FavoritoResuelto[] = [];

    for (const plano of planos) {
      if (!plano.archivoStands) continue;

      let stands = this.cacheStandsPorPlano.get(plano.id);
      if (!stands) {
        try {
          stands = await firstValueFrom(
            this.http.get<Stand[]>(plano.archivoStands)
          );
          this.cacheStandsPorPlano.set(plano.id, stands);
        } catch {
          stands = [];
        }
      }

      for (const stand of stands) {
        if (ids.has(stand.id)) {
          resueltos.push({ stand, planoId: plano.id });
        }
      }
    }

    resueltos.sort((a, b) => a.stand.nombre.localeCompare(b.stand.nombre));
    return resueltos;
  }

}