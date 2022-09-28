import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponent } from '../authentification/profile/update/update.component';
import { ProfileComponent } from '../authentification/profile/profile.component';
import { HomePage } from './home.page';
import { ResourcePage } from '../formation/resource/resource.page';
import { AuthentificationGuard } from '../authentification/guards/authentification.guard';
import {DetailComponent} from '@app/authentification/profile/detail/detail.component';
import {UpdatePasswordComponent} from '@app/authentification/profile/updatePassword/updatePassword.component';
import {AproposComponent} from '@app/authentification/profile/apropos/apropos.component';

const routes: Routes = [
    { path: '',
      component: HomePage,

    },
    {
        path: 'resource',
        loadChildren: () => import('../formation/resource/resource.module').then( m => m.ResourcePageModule),
     },
     {
             path: 'favoris',
             loadChildren: () => import('../formation/favoris/favoris.module').then( m => m.FavorisPageModule),
          },
     {
         path: 'questionnaire',
         loadChildren: () => import('../formation/questionnaire/questionnaire.module').then( m => m.QuestionnairePageModule),
      },
    {
        path: 'profile',
        component: ProfileComponent,
        children: [
            {
                path: 'details',
                component: DetailComponent
            },
            {
                path: 'update',
                component: UpdateComponent
            },
            {
                path: 'password',
                component: UpdatePasswordComponent
            },
            {
                path: 'propos',
                component: AproposComponent
            }

        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
