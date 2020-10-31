import { Component, OnInit , Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {
  slideOpts = {
    slidesPerView : 1.3,
    freeMode: true
  };

  @Input() peliculas: Pelicula[] = [];
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  async verDetalle(id:string){
    const modal=await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.present();
  }

}
