import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTagsComponent } from './add-tags/add-tags.component';
import { CommonService } from './services/common.service';

@NgModule({
  declarations: [
    AppComponent,
    AddTagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [BsModalService,CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
