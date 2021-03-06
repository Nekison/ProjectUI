import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
// Services
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav') public sideNav: MatSidenav;

  constructor(
    public media: ObservableMedia,
    public helperService: HelperService,
    private router: Router,
  ) {
    media.asObservable()
      .pipe(
        filter((change: MediaChange) => change.mqAlias === 'xs')
      ).subscribe(() => this.sideNav.close());
    media.asObservable()
      .pipe(
        filter((change: MediaChange) => change.mqAlias === 'sm')
      ).subscribe(() => this.sideNav.open());
  }

  ngOnInit() {
    this.helperService.SlideMenu = this.sideNav;
  }

  goRouteLink(url: string) {
    this.router.navigateByUrl('', { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  }
  get_UserName_Local_Storage() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.Email;
  }

  // Roles and Permissions

  verifyPermission(permit: string): boolean {
    const permissions: string[] = JSON.parse(localStorage.getItem('Permissions'));
    return permissions.includes(permit);
  }
}
