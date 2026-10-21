// src/app/components/map-view/map-view.ts
import {
  AfterViewInit, Component, ElementRef, OnDestroy, OnInit,
  ViewChild, effect, signal, inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Panzoom from '@panzoom/panzoom';
import { FilterService } from '../../services/filter.service';
import { Stand } from '../../models/stand.model';
import { StandDetalle } from '../stand-detalle/stand-detalle';
import { StandsService } from '../../services/stand.service';
import { PlanosService } from '../../services/plano.service';
import { FavoritosService } from '../../services/favoritos.service';


@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule, StandDetalle],
  templateUrl: './map-view.html',
  styleUrls: ['./map-view.css']
})
export class MapView implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('plano', { static: true }) plano!: ElementRef<HTMLDivElement>;

  standSeleccionado = signal<Stand | null>(null);
  private panzoom?: ReturnType<typeof Panzoom>;

  public standsService = inject(StandsService);
  public filterService = inject(FilterService);
  public planosService = inject(PlanosService);
  public favoritosService = inject(FavoritosService);

  //gesto de mantener pulsado
  private longPressTimer: ReturnType<typeof setTimeout> | null = null;
  private longPressDisparado = false;
  private readonly LONG_PRESS_MS = 500;




  constructor() {
    // Al cambiar de plano, resetea el zoom y cierra el detalle
    effect(() => {
      this.planosService.planoActualId();
      this.panzoom?.reset();
      this.standSeleccionado.set(null);
    });
  }

async ngOnInit(): Promise<void> {}

  ngAfterViewInit(): void {
    this.panzoom = Panzoom(this.plano.nativeElement, {
      maxScale: 5,
      minScale: 0.5,
      //contain: 'outside'
    });

    // Zoom con la rueda del ratón
    this.plano.nativeElement.parentElement?.addEventListener('wheel', (e) => {
      this.panzoom?.zoomWithWheel(e);
    });
  }

  ngOnDestroy(): void {
    this.panzoom?.destroy();
  }

  zoomIn(): void  { this.panzoom?.zoomIn(); }
  zoomOut(): void { this.panzoom?.zoomOut(); }
  reset(): void   { this.panzoom?.reset(); }

  seleccionarStand(stand: Stand): void {
    if (this.longPressDisparado) {
      this.longPressDisparado = false;
      return;
    }
    this.standSeleccionado.set(stand);
  }

  cerrarDetalle(): void {
    this.standSeleccionado.set(null);
  }

  iniciarLongPress(stand: Stand): void {
    this.longPressDisparado = false;

    this.longPressTimer = setTimeout(() => {
      this.longPressDisparado = true;
      this.favoritosService.toggle(stand.id);
      if (navigator.vibrate) navigator.vibrate(50);
    }, this.LONG_PRESS_MS);
  }

  cancelarLongPress(): void {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
}


}