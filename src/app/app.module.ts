import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { AppMaterialModule } from './app-material.module';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import 'hammerjs';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SimpleDialogComponent } from './common/simple-dialog/simple-dialog.component';

import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { UIService } from './common/ui.service';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavigationMenuComponent,
    PageNotFoundComponent,
    SimpleDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule,
    AppMaterialModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    UIService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
