import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './form/main-page.component';
import { ImageUploadModule } from 'angular2-image-upload';

const appRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'new',
    loadChildren: './lazy/new-product.lazy.module#NewProductModule'
  },
  {
    path: 'edit/:id',
    loadChildren: './lazy/new-product.lazy.module#NewProductModule'
  },
  {
    path: 'view/:id',
    loadChildren: './lazy/product.lazy.module#ProductModule'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    ImageUploadModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
