import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Genre, PeliculaDetalle, RespuestaCredits, RespuestaMDB } from '../interfaces/interfaces';

const URL = environment.url;
const apiKey= environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private popularesPage=0;
  generos : Genre[]=[];
  constructor( 
    private http: HttpClient
  ) 
  { }

  private ejecutarQuery<T>(query: string){
    query = URL + query;
    console.log('URL-->',URL);
    console.log('apiKey-->',apiKey);
    query += `&api_key=${ apiKey }&language=es&include_image_language=es` ;
    //query += '&api_key='+apiKey+'&language=es&include_image_language=es' ;
    console.log('QUERY-->',query);
    return this.http.get<T>(query);
  }

  getFeature(){
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth()+1,0 ).getDate();
    const mes = hoy.getMonth()+1;
    let mesString;
    if(mes<10){
      mesString='0'+mes;
    }else{
      mesString=mes;
    }
    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);

    //return this.http.get<RespuestaMDB>('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=2e2a0a846bfd2245ebea578e2940e1a7&include_image_language=es&language=es');

  }

  getPopulares(){
    this.popularesPage++;
    const query=`/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB> (query);
  }

  getPeliculaDetalle(id:string){
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }
  getActoresPelicula(id:string){
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  buscarPeliculas(texto: string){
      return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${ texto }`);
  }
  cargarGeneros(): Promise<Genre[]>{
    return new Promise(resolve=>{
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe(
        resp=>{this.generos=resp['genres'];
        console.log('GENEROS-->',this.generos);
        resolve(this.generos);
      });
    })
  }
}
