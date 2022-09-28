import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoryPageModule } from './category/category.module';
import { CoursPageModule } from './cours/cours.module';
import { CategoryDetailPageModule } from './category/category-detail/category-detail.module';
import { ResourcePageRoutingModule } from './resource-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
//import {ShareModule} from '../share/share.module';
//import {ShareComponent} from '../share/share.component';

import { ResourcePage } from './resource.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
   ResourcePageRoutingModule,
    CategoryPageModule,
   // CategoryDetailPageModule,
    CoursPageModule,
    ScrollingModule,
    DragDropModule,
   // ShareModule

  ],
  declarations: [ResourcePage],
//  entryComponents: [ShareComponent]
})
export class ResourcePageModule {}
