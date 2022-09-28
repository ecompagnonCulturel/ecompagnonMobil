import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { UserModule } from '../authentification/user.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatGridListModule} from '@angular/material/grid-list';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
   // MatExpansionModule,
   // ResourcePageModule,
   // FavorisPageModule,
    UserModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    FlexLayoutModule,
    MatGridListModule

  ],
  declarations: [HomePage]
})
export class HomePageModule {}
