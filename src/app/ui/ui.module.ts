import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MessageComponent],
  imports: [
    CommonModule,RouterModule
  ]
})
export class UiModule { }