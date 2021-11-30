import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { CoreModule } from '@core/core.module';

import { SharedModule } from '@shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
