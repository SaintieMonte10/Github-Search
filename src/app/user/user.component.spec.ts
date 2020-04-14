import { Component, OnInit } from "@angular/core";
import { User } from "../user";
import { UserService } from "../service-user.service";
import { Repository } from "../repository";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  providers: [UserService], //add the providers to the component
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  username: User;
  repos: Repository;

  check(rep) {
    interface ApiResponse {
      login: string;
      public_repos: number;
      followers: number;
      following: number;
      created_at: Date;
      html_url: string;
      avatar_url: string;
    }
    this.http
      .get<ApiResponse>(
        "https://api.github.com/users/" +
          rep.username +
          "?access_token=" +
          "bf04e1750690a4ffa6030fe8c4920ece706e8f1d"
      )
      .subscribe(data => {
        this.repos.login = data.login;
        this.repos.public_repos = data.public_repos;
        this.repos.followers = data.followers;
        this.repos.created_at = data.created_at;
        this.repos.html_url = data.html_url;
        this.repos.avatar_url = data.avatar_url;
      });
    console.log(this.repos);
  }
  constructor(private http: HttpClient) {
    this.repos = new Repository("", 0, 0, 0, new Date(), "", "");
  }

  ngOnInit() {
      
  }
}