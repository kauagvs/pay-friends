import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyPipe } from './empty.pipe';

describe('EmptyPipe', () => {
  describe('Isolated test', () => {
    const pipe = new EmptyPipe();

    it('should return a dash if the input value is empty', () => {
      expect(pipe.transform('')).toBe('—');
    });

    it('should return a dash if the input value is an empty object', () => {
      expect(pipe.transform({})).toBe('—');
    });

    it('should return a dash if the input value is an empty array', () => {
      expect(pipe.transform([])).toBe('—');
    });

    it('should return the same input value', () => {
      expect(pipe.transform('teste')).toBe('teste');
    });
  });

  describe('Behavior test', () => {
    @Component({
      template: '{{ value | empty }}',
    })
    class TestComponent {
      value: any;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent, EmptyPipe],
      });

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });

    it('should show the same input value', () => {
      component.value = 'teste';
      fixture.detectChanges();
      expect(el.textContent).toContain('teste');
    });

    it('should show a dash if the input value is empty', () => {
      component.value = '';
      fixture.detectChanges();
      expect(el.textContent).toContain('—');
    });

    it('should show a dash if the input value is an empty object', () => {
      component.value = {};
      fixture.detectChanges();
      expect(el.textContent).toContain('—');
    });

    it('should show a dash if the input value is an empty array', () => {
      component.value = [];
      fixture.detectChanges();
      expect(el.textContent).toContain('—');
    });
  });
});
