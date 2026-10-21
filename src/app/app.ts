import { Component } from '@angular/core';
import { FilterBarComponent } from './components/filter-bar/filter-bar';
import { MapView } from './components/map-view/map-view';
import { BottomNav } from './components/botonera-navegacion/botonera-navegacion';
import { Info } from './components/info/info';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapView, FilterBarComponent, BottomNav, Info],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}