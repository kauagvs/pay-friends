import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Subject } from 'rxjs';

type Layouts = 'full' | 'spacing';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  layout: Layouts;

  pageTitle: string;

  private unsubscribeAll: Subject<any>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setPageData();
      }
    });

    this.setPageData();
  }

  setPageData(): void {
    this.activatedRoute.firstChild?.data.subscribe((data) => {
      this.layout = data?.layout ?? 'spacing';
      this.pageTitle = data?.title;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
