import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductRegisterComponent } from './components/product-register/product-register.component';
import { PagenofoundComponent } from './pages/pagenofound/pagenofound.component';

const routes: Routes = [
  { path: '', component: ProductRegisterComponent },
  {path:"**",pathMatch:'full', component:PagenofoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
