import { Title } from '@angular/platform-browser';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnvSpecific } from 'app/core/models/env-specific';

@Component({
    selector: '',
    templateUrl: './templates/admin.html',
    styles: ['']
})

export class AdminComponent {
    theDataSource: Observable<string>;
    apiURL: string;


    constructor(private http: Http, private route: ActivatedRoute, private titleService: Title) {

    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { envSpecific: EnvSpecific }) => {
                this.titleService.setTitle(data.envSpecific.title + ' | Admin');
                this.apiURL = data.envSpecific.apiURL;
            });

        this.getData(30);
    }

    private getData(days: number) {
        this.theDataSource = this.http.get(this.apiURL + 'admin/data/').map(res => res.json());

        this.theDataSource.subscribe(
            data => {
                console.log(data);

            },
            err => console.log("Can't get Admin Data. Error code: %s, URL: %s ", err.status, err.url),
            () => console.log('Admin Data is retrieved')
        );
    }
}