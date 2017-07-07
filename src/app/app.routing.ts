import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";
import {ByTypeComponent} from "./by-type.component";
import {AboutComponent} from "./about.component";
import {ProductDetailComponentParam} from "./product-param.component";
import { EnvironmentSpecificResolver } from './core/services/environment-specific-resolver.service';

const routes: Routes = [
  {path: '',        component: HomeComponent, resolve: { envSpecific: EnvironmentSpecificResolver }},
  {path: 'by-type', component: ByTypeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'product/:id', component: ProductDetailComponentParam}
];

export const routing = RouterModule.forRoot(routes);