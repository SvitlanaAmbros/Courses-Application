import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'courses-app';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (!!localStorage.getItem('login')) {
      this.router.navigateByUrl('courses');
    } else {
      this.router.navigateByUrl('login');
    }
  }
}
