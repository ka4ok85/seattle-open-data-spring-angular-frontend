import { Component } from '@angular/core';
import { EnvironmentSpecificService } from './core/services/environment-specific.service';
import { EnvSpecific } from './core/models/env-specific';
import { EnvironmentSpecificResolver } from './core/services/environment-specific-resolver.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  apiURL: string;

  constructor(envSpecificSvc: EnvironmentSpecificService) {
    envSpecificSvc.subscribe(this, this.setApiURL);
  }

  setApiURL(caller: any, es: EnvSpecific) {
    const thisCaller = caller as AppComponent;
    thisCaller.apiURL = es.apiURL;
  }
}
