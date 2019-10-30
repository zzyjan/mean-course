import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileSelectDirective } from 'ng2-file-upload';



import { AppComponent } from './app.component';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {HeaderComponent} from './header/header.component';
import {PostListComponent} from './posts/post-list/post-list.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { MenuComponent } from './menu/menu.component';
import {DemoMaterialModule} from './angular-material.module';
import { BankControlComponent } from './system/bank-control/bank-control.component';
import { IcbcControlComponent } from './system/icbc-control/icbc-control.component';
// import { EmpControlComponent} from './system/emp-control/emp-control.component';
import { MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntlCro } from './setting/paginatorIntl-module';
import { FrontPageComponent } from './system/front-page/front-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    BankControlComponent,
    // EmpControlComponent,
    FrontPageComponent,
    FileSelectDirective,
    IcbcControlComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    DemoMaterialModule,
    NgxDatatableModule
  ],
  // let the angular interceptor using custom incerceptor
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
