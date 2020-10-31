import { Component, OnInit } from '@angular/core';
import { RespuestaMDB, Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[]=[];
  populares: Pelicula[]=[];

  slideOpts = {
    slidesPerView : 1.1,
    freeMode: true
  };

  constructor(
    private moviesService : MoviesService
  ) {}
  ngOnInit() {
   this.moviesService.getFeature().subscribe(
     (resp: RespuestaMDB)=>{
      
      this.peliculasRecientes = resp.results;
     }
   );
   this.getPopulares();
  }

  cargarMas(){
    this.getPopulares();
  }

  getPopulares(){
    this.moviesService.getPopulares().subscribe(
      resp=>{
        const arrTemp =[...this.populares, ...resp.results];
        this.populares=arrTemp;
     }
    );
  }

}
