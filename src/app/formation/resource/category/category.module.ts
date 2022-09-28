import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
//import { FavorisPageModule } from '../../favoris/favoris.module';
import {MatDividerModule} from '@angular/material/divider';
import { IonicModule  } from '@ionic/angular';
import { CategoryPageRoutingModule } from './category-routing.module';
import { PipeModule } from '../../../_helpers/pipe/pipe.module';
import { CategoryPage } from './category.page';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ScrollingModule,
        DragDropModule,
        IonicModule,
        MatDividerModule,
        PipeModule,
        MatListModule,
        MatIconModule,

        //  FavorisPageModule


    ],
  declarations: [CategoryPage]
})

export class CategoryPageModule {}

