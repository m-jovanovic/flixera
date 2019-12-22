import { Component, OnInit } from "@angular/core";
import { MovieApiService, MovieDto } from "src/core";

@Component({
  selector: "ml-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.css"]
})
export class MovieListComponent implements OnInit {
  movies: MovieDto[] = [];
  cols: number;

  constructor(private movieApi: MovieApiService) {}

  ngOnInit() {
    this.cols = 5;
  }

  onKeyDown(event) {
    if (event.keyCode == 13) {
      console.log(`Searching for: ${event.target.value}`);

      this.movieApi.search(event.target.value)
        .subscribe((movies) => {
          this.movies = [...this.movies, ...movies];
        })
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
