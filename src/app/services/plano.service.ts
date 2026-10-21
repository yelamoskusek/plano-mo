// src/app/services/planos.service.ts
import { Injectable, computed, signal } from '@angular/core';
import { Plano } from '../models/plano.model';

@Injectable({ providedIn: 'root' })
export class PlanosService {
private readonly _planos = signal<Plano[]>([
    {
      id: 'principal',
      nombre: 'Principal',
      archivo: 'assets/Plano_A.svg',
      archivoStands: 'assets/stands/principal.json'
    },
    {
      id: 'zona-a',
      nombre: 'Zona A',
      archivo: 'assets/Plano_ZonaA.svg',
      archivoStands: 'assets/stands/zona-a.json'
    },
    {
      id: 'zona-b',
      nombre: 'Zona B',
      archivo: 'assets/Plano_ZonaB.svg',
      archivoStands: 'assets/stands/zona-b.json'
    }
  ]);
  readonly planos = this._planos.asReadonly();

  private readonly _planoActualId = signal<string>('principal');
  readonly planoActualId = this._planoActualId.asReadonly();

  readonly planoActual = computed<Plano>(() => {
    const id = this._planoActualId();
    return this._planos().find(p => p.id === id) ?? this._planos()[0];
  });

  cambiarPlano(id: string): void {
    this._planoActualId.set(id);
  }
}