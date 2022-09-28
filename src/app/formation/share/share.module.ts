import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShareRoutingModule } from './share-routing.module';
import { ShareComponent } from './share.component';



@NgModule({
 declarations: [ShareComponent],
 exports: [ShareComponent],
  imports: [
    CommonModule,
    ShareRoutingModule,
    FormsModule,
    IonicModule

  ],

})
export class ShareModule { }
