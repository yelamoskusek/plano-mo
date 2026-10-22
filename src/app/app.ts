import { Component, inject } from '@angular/core';
import { FilterBarComponent } from './components/filter-bar/filter-bar';
import { MapView } from './components/map-view/map-view';
import { BottomNav } from './components/botonera-navegacion/botonera-navegacion';
import { Info } from './components/info/info';
import { PlanosService } from './services/plano.service';
import { FavoritosList } from './components/favoritos-list/favoritos-list';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapView, FilterBarComponent, BottomNav, Info, FavoritosList],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  public planosService = inject(PlanosService);


}