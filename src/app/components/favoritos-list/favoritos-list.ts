// src/app/components/favoritos-list/favoritos-list.ts
import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritosService, FavoritoResuelto } from '../../services/favoritos.service';
import { PlanosService } from '../../services/plano.service';
import { StandsService } from '../../services/stand.service';

@Component({
  selector: 'app-favoritos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos-list.html',
  styleUrls: ['./favoritos-list.css']
})
export class FavoritosList {
  public favoritosService = inject(FavoritosService);
  public planosService = inject(PlanosService);
  public standsService = inject(StandsService);

  readonly favoritos = signal<FavoritoResuelto[]>([]);

  constructor() {
    effect(() => {
      // Escucha los IDs y re-resuelve cuando cambian
      this.favoritosService.ids();
      this.favoritosService.resolverFavoritos().then(lista => {
        this.favoritos.set(lista);
      });
    });
  }

  irAlPlano(fav: FavoritoResuelto): void {
    this.planosService.cambiarPlano(fav.planoId);
  }

  nombrePlano(planoId: string): string {
    return this.planosService.planos().find(p => p.id === planoId)?.nombre ?? planoId;
  }

  colorCategoria(categoria: string): string {
    return this.standsService.colorPorCategoria(categoria);
  }
}