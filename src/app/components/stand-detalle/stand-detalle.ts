import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StandsService } from '../../services/stand.service';
import { Stand } from '../../models/stand.model';

@Component({
  selector: 'app-stand-detalle',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './stand-detalle.css',
  templateUrl: './stand-detalle.html',
})
export class StandDetalle {
  @Input({ required: true }) stand!: Stand;
  @Output() cerrar = new EventEmitter<void>();

  constructor(public standsService: StandsService) {}

  cerrarDetalle(): void {
    this.cerrar.emit();
  }
}
