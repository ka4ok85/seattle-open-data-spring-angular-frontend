import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home.component";
import {ByTypeComponent} from "./by-type.component";
import {ByTypeSpecificComponent} from "./by-type-specific.component";
import {ByZipComponent} from "./by-zip.component";
import {ByZipSpecificComponent} from "./by-zip-specific.component";
import {AboutComponent} from "./about.component";
import {EnvironmentSpecificResolver} from './core/services/environment-specific-resolver.service';

const routes: Routes = [
  {path: '',        component: HomeComponent, resolve: { envSpecific: EnvironmentSpecificResolver }},
  {path: 'by-type', component: ByTypeComponent, resolve: { envSpecific: EnvironmentSpecificResolver }},
  {path: 'by-type/:type', component: ByTypeSpecificComponent, resolve: { envSpecific: EnvironmentSpecificResolver }},
  {path: 'by-zip', component: ByZipComponent, resolve: { envSpecific: EnvironmentSpecificResolver }},
  {path: 'by-zip/:zip', component: ByZipSpecificComponent, resolve: { envSpecific: EnvironmentSpecificResolver }},
  {path: 'about', component: AboutComponent},
];

export const routing = RouterModule.forRoot(routes);