import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {UpdateComponent} from './profile/update/update.component';
import {UpdatePasswordComponent} from './profile/updatePassword/updatePassword.component';
import {DetailComponent} from './profile/detail/detail.component';
import {AproposComponent} from './profile/apropos/apropos.component';


const routes: Routes = [
   /*,
    {
        path: 'create-account',
        loadChildren: () => import('./create-account/create-account.module').then(m => m.CreateAccountPageModule)
    }*/

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
