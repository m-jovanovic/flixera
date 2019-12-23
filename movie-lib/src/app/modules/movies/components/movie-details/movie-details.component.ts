import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { MovieDto, MovieApiService } from 'src/app/core';

@Component({
  selector: "ml-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.css"]
})
export class MovieDetailsComponent implements OnInit {
  id: string;
  
  constructor(private route: ActivatedRoute, private movieApi: MovieApiService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
  }
}
