import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {
  slideOpts = {
    slidesPerView : 3.3,
    freeMode: true
  };
  @Input() peliculas : Pelicula[]=[];
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
