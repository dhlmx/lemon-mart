import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  styleUrls: ['./side-nav.component.css'],
  templateUrl: './side-nav.component.html'
})
export class SideNavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

/*
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
*/
