import { Component } from '@angular/core';
import { EnvironmentSpecificService } from './core/services/environment-specific.service';
import { EnvSpecific } from './core/models/env-specific';
import { EnvironmentSpecificResolver } from './core/services/environment-specific-resolver.service';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  apiURL: string;

  constructor(envSpecificSvc: EnvironmentSpecificService, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics, public authService: AuthService) {
    envSpecificSvc.subscribe(this, this.setApiURL);
  }

  setApiURL(caller: any, es: EnvSpecific) {
    const thisCaller = caller as AppComponent;
    thisCaller.apiURL = es.apiURL;
  }
}
