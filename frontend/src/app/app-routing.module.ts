import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerComponent } from './components/owners/owner.component';


const routes: Routes = [
  { path: '', redirectTo: '/owners', pathMatch: 'full' },
  { path: 'owners', component: OwnerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
