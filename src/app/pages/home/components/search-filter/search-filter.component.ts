import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

export interface SearchFilter {
  q: string;
  name: string;
  title: string;
  date: string;
  value: string;
  isPaid: string;
}

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent {
  filters: SearchFilter;

  @Output() filtersChanged = new EventEmitter();

  @ViewChild('filterMenuTrigger') filterMenuTrigger: MatMenuTrigger;

  constructor() {
    this.setDefaults();
  }

  clearFilters(refresh = false): void {
    this.filters = {
      q: '',
      name: '',
      title: '',
      date: '',
      value: '',
      isPaid: '',
    };

    if (refresh) {
      this.filter();
    }
  }

  close(): void {
    this.filterMenuTrigger.closeMenu();
  }

  filter(): void {
    const { q, title, date, value, isPaid, name } = this.filters;

    this.filtersChanged.emit({
      q,

      // Secondary filters
      title,
      date,
      value,
      isPaid,
      name,
    });

    // this.close();
  }

  hasSomeSecondaryFilterFilled(): boolean {
    const { title, date, value, isPaid, name } = this.filters;
    return !!title || !!date || !!value || isPaid !== '' || !!name;
  }

  private setDefaults(): void {
    this.clearFilters();
  }
}
