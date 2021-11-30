import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  isLoading: Subject<boolean>;

  constructor(private loaderService: LoaderService, private router: Router) {
    this.isLoading = this.loaderService.isLoading;
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError,
        ),
      )
      .subscribe((event) => {
        if (this.router.getCurrentNavigation().extras.state?.from === 'login') {
          if (event instanceof NavigationStart) {
            this.loaderService.show();
            return;
          }

          // Fake timeout
          setTimeout(() => {
            this.loaderService.hide();
          }, 3000);
        }
      });
  }
}
