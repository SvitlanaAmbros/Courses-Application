import { Component, OnInit } from '@angular/core';

import { LoadingService } from '@shared/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  private showLoading: boolean;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.getLoadingState()
      .subscribe(res => this.showLoading = res);
  }

}
