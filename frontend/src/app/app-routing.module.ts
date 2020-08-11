import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTransactionComponent } from './list-transaction/list-transaction.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListTransactionComponent },
  { path: 'add', component: AddTransactionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
