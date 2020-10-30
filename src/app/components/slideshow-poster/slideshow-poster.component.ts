import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';

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
  constructor() { }

  ngOnInit() {}

}
