import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes } from '@angular/router';

import { AppComponent } from './app.component';
import{ HomeComponent} from './components/home/home.component';
import{ ResultComponent} from './components/result/result.component';
import { MyService } from '../app/my.service';

const appRoutes : Routes = [
  { path:"", component:HomeComponent},
 // { path:"home", component:HomeComponent},
  { path:"result", component:ResultComponent}
  ];

@NgModule({
  declarations: [AppComponent,HomeComponent,ResultComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
   RouterModule.forRoot(appRoutes)
  ],
  providers: [MyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
