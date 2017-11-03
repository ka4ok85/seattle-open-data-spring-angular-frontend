import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home.component";
import { ByTypeComponent } from "./by-type.component";
import { ByTypeSpecificComponent } from "./by-type-specific.component";
import { ByZipComponent } from "./by-zip.component";
import { ByZipSpecificComponent } from "./by-zip-specific.component";
import { HourlyComponent } from "./hourly.component";
import { HourlyAllComponent } from "./hourly-all.component";
import { HourlyByZipComponent } from "./hourly-by-zip.component";
import { HourlyByTypeComponent } from "./hourly-by-type.component";
import { AboutComponent } from "./about.component";
import { AdminComponent } from "./admin.component";
import { AuthGuard } from "./auth-guard.service";
import { LoginComponent } from "./login.component";
import { ProfileComponent } from "./profile.component";


import { EnvironmentSpecificResolver } from './core/services/environment-specific-resolver.service';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { envSpecific: EnvironmentSpecificResolver } },
  { path: 'by-type', component: ByTypeComponent, resolve: { envSpecific: EnvironmentSpecificResolver } },
  { path: 'by-type/:type', component: ByTypeSpecificComponent, resolve: { envSpecific: EnvironmentSpecificResolver } },
  { path: 'by-zip', component: ByZipComponent, resolve: { envSpecific: EnvironmentSpecificResolver } },
  { path: 'by-zip/:zip', component: ByZipSpecificComponent, resolve: { envSpecific: EnvironmentSpecificResolver } },
  {
    path: 'hourly', component: HourlyComponent, resolve: { envSpecific: EnvironmentSpecificResolver },
    children: [
      { path: '', component: HourlyAllComponent, resolve: { envSpecific: EnvironmentSpecificResolver } },
      { path: 'by-type/:type', component: HourlyByTypeComponent, resolve: { envSpecific: EnvironmentSpecificResolver } },
      { path: 'by-zip/:zip', component: HourlyByZipComponent, resolve: { envSpecific: EnvironmentSpecificResolver } }
    ]
  },

  { path: 'about', component: AboutComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], resolve: { envSpecific: EnvironmentSpecificResolver } },
  { path: 'login', component: LoginComponent, resolve: { envSpecific: EnvironmentSpecificResolver } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], resolve: { envSpecific: EnvironmentSpecificResolver } },


];


export const routing = RouterModule.forRoot(routes);