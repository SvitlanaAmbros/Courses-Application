import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {LoadingService} from '@shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'courses-app';
  public showLoading: boolean;

  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');

    translate.use('en');
  }

  ngOnInit(): void {
  }
}
