import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
  @Input() length = 0;

  @Input() page = 1;

  @Input() pageSize = 10;

  @Input() maxPages = 7;

  @Input() pageSizeOptions = [10, 25, 50, 100];

  @Input() showFirstLastButtons = false;

  @Output() pageChange = new EventEmitter();

  pages: number[];

  totalPages: number;

  private minPagesAccepted = 7;

  ngOnChanges(changes: SimpleChanges): void {
    this.setDefaults();

    if (changes.length?.currentValue !== changes.length?.previousValue) {
      this.length = changes.length?.currentValue;
      this.updatePages();
    }

    if (changes.page?.currentValue !== changes.page?.previousValue) {
      this.page = changes.page.currentValue;
      this.updatePages();
    }

    if (changes.pageSize?.currentValue !== changes.pageSize?.previousValue) {
      this.pageSize = changes.pageSize?.currentValue;
      this.updatePages();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      const previousPage = this.page - 1;
      this.setPage(previousPage);
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      const nextPage = this.page + 1;
      this.setPage(nextPage);
    }
  }

  setPage(page: number): void {
    this.page = page;
    this.updatePages();
    this.pageChanged();
  }

  pageSizeChange(): void {
    this.resetPage();
    this.resetTotalPages();
    this.updatePages();
    this.pageChanged();
  }

  private pageChanged(): void {
    const { page, pageSize } = this;
    this.pageChange.emit({ page, pageSize });
  }

  private updatePages() {
    const length = this.totalPages >= this.maxPages ? this.maxPages : this.totalPages;

    this.pages = Array.from({ length }, (_, index) => {
      if (this.totalPages === this.maxPages || index === 0) {
        return index + 1;
      }

      if (
        (index === 1 && this.page > Math.round(this.maxPages / 2)) ||
        (index === this.maxPages - 2 && this.page < this.totalPages - Math.floor(this.maxPages / 2))
      ) {
        return 0;
      }

      if (index === this.maxPages - 1) {
        return this.totalPages;
      }

      if (this.page <= Math.round(this.maxPages / 2)) {
        return index + 1;
      }

      if (this.page <= this.totalPages - Math.floor(this.maxPages / 2)) {
        return this.page + index - Math.round(this.maxPages / 2) + 1;
      }

      return this.totalPages - this.maxPages + index + 1;
    });
  }

  private resetPage(): void {
    this.page = 1;
  }

  private resetPages(): void {
    this.pages = [];
  }

  private resetTotalPages(): void {
    this.totalPages = Math.ceil(this.length / this.pageSize);
  }

  private validateMaxPages(): void {
    if (this.maxPages < this.minPagesAccepted) {
      this.maxPages = this.minPagesAccepted;
    }
  }

  private validatePage(): void {
    if (this.page > this.totalPages) {
      this.resetPage();
    }
  }

  private setDefaults(): void {
    this.resetPages();
    this.resetTotalPages();
    this.validateMaxPages();
    this.validatePage();
  }
}
