import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { MovieDto, MovieApiService } from 'src/core';

@Component({
  selector: "ml-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.css"]
})
export class MovieDetailsComponent implements OnInit {
  id: string;
  movie: MovieDto;
  constructor(private route: ActivatedRoute, private movieApi: MovieApiService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");

    this.movieApi.getByImdbId(this.id).subscribe(movie => this.movie = movie);

    console.log(this.movie);
  }
}
