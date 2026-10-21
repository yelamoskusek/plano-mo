// src/app/services/stands.service.ts
import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Stand } from '../models/stand.model';
import { PlanosService } from './plano.service';

@Injectable({ providedIn: 'root' })
export class StandsService {
  private readonly _stands = signal<Stand[]>([]);
  readonly stands = this._stands.asReadonly();

  private http = inject(HttpClient);
  private planosService = inject(PlanosService);
  private cachePorPlano = new Map<string, Stand[]>();


  constructor() {
    effect(() => {
      const planoId = this.planosService.planoActualId();
      this.cargarStandsDePlano(planoId);
    });
  }

  private async cargarStandsDePlano(planoId: string): Promise<void> {
    // Si ya los tenemos en caché, los usamos
    const enCache = this.cachePorPlano.get(planoId);
    if (enCache) {
      this._stands.set(enCache);
      return;
    }

    const plano = this.planosService.planos().find(p => p.id === planoId);
    if (!plano) {
      this._stands.set([]);
      return;
    }

    try {
      const data = await firstValueFrom(
        this.http.get<Stand[]>(plano.archivoStands)
      );
      this.cachePorPlano.set(planoId, data);
      this._stands.set(data);
    } catch {
      this._stands.set([]);
    }
  }

  colorPorCategoria(categoria: string): string {
    const colores: Record<string, string> = {
      actividades: '#f59e0b',
      artesanos: '#3b82f6',
      comercial: '#ec4899',
      comida: '#10b981',
      servicios: '#8b5cf6'
    };
    return colores[categoria] ?? '#6b7280';
  }
}