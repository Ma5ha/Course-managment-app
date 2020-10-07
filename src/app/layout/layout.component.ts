import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/core/auth.service';

@Component({
  selector: 'cm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
