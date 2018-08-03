import { Component, OnInit } from '@angular/core';
import { HelperService } from './services/helper.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(
    public helper: HelperService,
    private userService: UserService
  ) {
    helper.Ocultar = false;
  }

  ngOnInit() {
  }

  TokenActive(): boolean {
    let active = true;
    if (localStorage.getItem('userToken') === null) {
      active = false;
    }
    return active;
  }
}
