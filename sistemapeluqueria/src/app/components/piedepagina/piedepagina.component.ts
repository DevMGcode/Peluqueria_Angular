import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-piedepagina',
    templateUrl: './piedepagina.component.html',
    styleUrls: ['./piedepagina.component.css'],
    standalone: false
})
export class PiedepaginaComponent implements OnInit {

  newsEmail   = '';
  newsLoading = false;
  newsSuccess = false;
  newsShake   = false;

  constructor() {}
  ngOnInit(): void {}

  suscribirse(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.newsEmail)) {
      this.newsShake = true;
      setTimeout(() => { this.newsShake = false; }, 600);
      return;
    }
    this.newsLoading = true;
    setTimeout(() => {
      this.newsLoading = false;
      this.newsSuccess = true;
    }, 1800);
  }
}
