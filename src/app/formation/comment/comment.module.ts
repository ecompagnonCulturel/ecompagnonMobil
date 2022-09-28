import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentPageRoutingModule } from './comment-routing.module';

import { CommentPage } from './comment.page';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CommentPageRoutingModule,
        MatIconModule
    ],
  declarations: [CommentPage]
})
export class CommentPageModule {}
