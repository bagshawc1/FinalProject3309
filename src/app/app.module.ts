import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontendComponent } from './frontend/frontend.component';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseService } from './services/firebase.service';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    FrontendComponent,
    LoginpageComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyA9qhLSYg6-idvWajoiWhLSbiefE6Q8Dtw",
      authDomain: "se3309-66be0.firebaseapp.com",
      projectId: "se3309-66be0",
      storageBucket: "se3309-66be0.appspot.com",
      messagingSenderId: "223495009937",
      appId: "1:223495009937:web:0605b6321fb891458ab130"
    }),

  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }