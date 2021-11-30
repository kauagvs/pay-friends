import { TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../../angular-material.module';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  describe('Teste isolado', () => {
    let component: PaginatorComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [PaginatorComponent],
        imports: [FormsModule, ReactiveFormsModule, AngularMaterialModule],
      }).compileComponents();
    });

    beforeEach(() => {
      component = new PaginatorComponent();
    });

    it('Deveria verificar ngOnChanges', () => {
      const ngOnChanges = jest.spyOn(component, 'ngOnChanges');

      component.ngOnChanges({});

      expect(ngOnChanges).toHaveBeenCalled();
    });

    it('Deveria calcular total de páginas igual ao máximo de páginas', () => {
      component.length = 70;
      component.ngOnChanges({});

      expect(component.totalPages).toBe(component.maxPages);
    });

    it('Deveria não criar paginação caso "length" seja zero', () => {
      component.ngOnChanges({});

      expect(component.totalPages).toBe(0);
      expect(component.pages).toEqual([]);
    });

    it('Deveria paginar para página selecionada', () => {
      const selectedPage = 6;
      const pageChange = jest.spyOn(component.pageChange, 'emit');

      component.length = 70;
      component.ngOnChanges({});
      component.setPage(selectedPage);

      expect(component.page).toBe(selectedPage);
      expect(pageChange).toHaveBeenCalledWith({ page: selectedPage, pageSize: component.pageSize });
    });

    it('Deveria paginar para página anterior', () => {
      jest.spyOn(component.pageChange, 'emit');

      const TEST_CASES_FOR_PAGES = [2, 5, 1];

      component.ngOnChanges({});

      for (const page of TEST_CASES_FOR_PAGES) {
        component.length = 70;
        component.page = page;
        component.previousPage();

        if (page > 1) {
          const expectedPage = page - 1;
          expect(component.page).toBe(expectedPage);
          expect(component.pageChange.emit).toHaveBeenCalledWith({
            page: expectedPage,
            pageSize: component.pageSize,
          });
        } else {
          expect(component.page).toBe(page);
        }
      }
    });

    it('Deveria paginar para próxima página', () => {
      jest.spyOn(component.pageChange, 'emit');

      const TEST_CASES_FOR_PAGES = [2, 5, 7];

      component.ngOnChanges({});

      for (const page of TEST_CASES_FOR_PAGES) {
        component.length = 70;
        component.page = page;
        component.nextPage();

        if (page < component.totalPages) {
          const expectedPage = page + 1;
          expect(component.page).toBe(expectedPage);
          expect(component.pageChange.emit).toHaveBeenCalledWith({
            page: expectedPage,
            pageSize: component.pageSize,
          });
        } else {
          expect(component.page).toBe(page);
        }
      }
    });
  });
});
