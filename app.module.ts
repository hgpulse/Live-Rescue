import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//design material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import {MatCardModule} from '@angular/material/card'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';



// Auth service
import { AuthService } from "./shared/services/auth.service";
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { MapComponent } from './map/map.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    MainNavComponent,
    MapComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    LayoutModule,
    MatButtonModule,
    MatListModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
    FlexLayoutModule
    


  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
