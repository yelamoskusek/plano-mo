import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterService } from '../../services/filter.service';
import { Categoria } from '../../models/stand.model';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-bar.html',
  styleUrls: ['./filter-bar.css']
})
export class FilterBarComponent {
  categorias: Categoria[] = ['artesanos', 'doujin', 'artistas', 'comida', 'servicios'];

  constructor(public filterService: FilterService) {}
}