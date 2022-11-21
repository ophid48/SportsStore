import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  selected = 'catalog';

  constructor(private router: Router, activateRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  isSelect(test: string) {
    return test === this.selected;
  }

  navClick(str: string) {
    this.selected = str;
    this.router.navigateByUrl('/' + str).then();
  }
}
