import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { AlertComponent } from './components/alert/alert.component';








@NgModule({
  declarations: [
    HeaderComponent,
    ChatMessageComponent,
    ImageUploaderComponent,
    LoaderComponent,
    MenuComponent,
    SearchComponent,
    AlertComponent,
    

   
    

  ],
  exports: [
    HeaderComponent,
    ChatMessageComponent,
    ImageUploaderComponent,
    LoaderComponent,
    MenuComponent,
    SearchComponent,
    AlertComponent,
    

   

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    
  ]
})
export class SharedModule { }
