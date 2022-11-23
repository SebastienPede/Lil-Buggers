import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ResourcesComponent } from './resources/resources.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CatalogComponent,
    NavigationComponent,
    ResourcesComponent,
    ContactComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
