import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Pelicula,RespuestaMDB } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  buscando=false;
  textoBuscar ='';
  ideas: string[]=['Spiderman','Superman','Gladiador','Avengers'];
  peliculas: Pelicula[] = [] ;
  constructor( private moviesService:MoviesService,
                private modalCtrl:ModalController) {}

  buscar( event ){
    this.buscando=true;
    const valor: string=event.detail.value;

    if(valor.length===0){
      this.buscando=false;
      this.peliculas=[];
      return;
    }
    this.moviesService.buscarPeliculas(valor)
    .subscribe(
      (resp: RespuestaMDB)=>{
        console.log('RESP-->',resp);
        this.peliculas=resp.results;
        this.buscando=false;
      }
    );
  }

  async detalle(id:string){
    const modal=await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.present();
  }

}
