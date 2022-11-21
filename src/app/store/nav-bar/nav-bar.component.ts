import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  selected = 'Каталог';

  constructor() {}

  ngOnInit(): void {}

  isSelect(test: string) {
    return test === this.selected;
  }
}
