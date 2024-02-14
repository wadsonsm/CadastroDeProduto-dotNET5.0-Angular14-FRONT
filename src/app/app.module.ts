import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRegisterComponent } from './components/product-register/product-register.component';
import { HttpClientModule } from '@angular/common/http';
import { PagenofoundComponent } from './pages/pagenofound/pagenofound.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductRegisterComponent,
    PagenofoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
