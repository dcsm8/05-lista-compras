import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss']
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem = '';
  itemCompletado;

  constructor(
    private deseosService: DeseosService,
    private activatedRoute: ActivatedRoute
  ) {
    const listaId = this.activatedRoute.snapshot.paramMap.get('listaId');

    this.lista = this.deseosService.obtenerLista(listaId);
  }

  ngOnInit() {}

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = '';
    this.deseosService.guardarStorage();
  }

  cambioCheck(item: ListaItem) {
    const pendientes = this.lista.items.filter(itemData => !itemData.completado)
      .length;

    if (pendientes === 0) {
      this.lista.terminada = true;
      this.lista.terminadaEn = new Date();
    } else {
      this.lista.terminada = false;
      this.lista.terminadaEn = null;
    }

    this.deseosService.guardarStorage();
  }

  borrar(index: number) {
    this.lista.items.splice(index, 1);
    this.deseosService.guardarStorage();
  }
}
