import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanosService } from '../../services/plano.service';

@Component({
  imports: [CommonModule],
  selector: 'app-botonera-navegacion',
  standalone: true,
  styleUrl: './botonera-navegacion.css',
  templateUrl: './botonera-navegacion.html',
})
export class BottomNav {
  public planosService = inject(PlanosService);
}
