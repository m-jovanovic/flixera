import { Component, OnInit, Input } from '@angular/core';
import { MovieDto } from 'src/core';

@Component({
  selector: 'ml-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movie: MovieDto;

  constructor() { }

  ngOnInit() {
  }

}
