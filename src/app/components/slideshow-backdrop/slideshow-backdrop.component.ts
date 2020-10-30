import { Component, OnInit , Input} from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';

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
  constructor() { }

  ngOnInit() {}

}
