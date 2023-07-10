import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-denied',
  templateUrl: './denied.page.html',
  styleUrls: ['./denied.page.scss'],
})
export class DeniedPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  login(){
    this.router.navigate(['login']);
  }
}
