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




@NgModule({
  declarations: [
    HeaderComponent,
    ChatMessageComponent,
    ImageUploaderComponent,
    LoaderComponent,
    MenuComponent,
    SearchComponent,
  ],
  exports: [
    HeaderComponent,
    ChatMessageComponent,
    ImageUploaderComponent,
    LoaderComponent,
    MenuComponent,
    SearchComponent,
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
