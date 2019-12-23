import { Component, OnInit } from "@angular/core";
import { MovieDto } from "src/app/core";
import { MovieSearchService } from 'src/app/core/services/movie-search.service';
import { MovieSearchQuery } from 'src/app/core/store/movie-search.query';
import { Observable } from 'rxjs';

@Component({
  selector: "ml-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.css"]
})
export class MovieListComponent implements OnInit {
  movies: Observable<MovieDto[]>;
  hasMoreMovies: Observable<boolean>;
  cols: number;

  constructor(private movieApi: MovieSearchService, private query: MovieSearchQuery) {}

  ngOnInit() {
    this.cols = 5;
    this.movies = this.query.movies$;
    this.hasMoreMovies = this.query.hasMoreMovies$;
  }

  onKeyDown(event) {
    if (event.keyCode == 13) {
      console.log(`Searching for: ${event.target.value}`);

      this.movieApi.search(event.target.value);
    }
  }

  onResize(event) {
      this.cols = (event.target.innerWidth >= 1700) ? 5 : 
      (event.target.innerWidth >= 1400) ? 4 :
      (event.target.innerWidth >= 1130) ? 3 : 
      (event.target.innerWidth >= 850) ? 2 : 
      1;
  }
}
