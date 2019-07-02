import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'profile-bgimage',
  templateUrl: './profile-bgimage.component.html',
  styleUrls: ['./profile-bgimage.component.css']
})
export class ProfileBgimageComponent implements OnInit, AfterViewInit {

  urls: string[];
  imagesLoaded = false;
  imageClicked: string;

  constructor() { }

  ngOnInit() {
    this.urls = [
      'https://i.ibb.co/6mfPz9G/7.jpg',
      'https://i.ibb.co/T0fbXbH/6.jpg',
      'https://i.ibb.co/9VYq6wc/5.jpg',
      'https://i.ibb.co/HDBt1m4/4.jpg',
      'https://i.ibb.co/0C9znsS/3.jpg',
      'https://i.ibb.co/tx4fJ4y/2.jpg',
      // 'https://i.ibb.co/ZX47Jg6/1.jpg'
    ]
    this.imageClicked = 'https://i.ibb.co/ZX47Jg6/1.jpg';
  }

  ngAfterViewInit() {
    // setInterval(() => {this.imagesLoaded = true;}, 3000)
    this.imagesLoaded = true;
  }

  onImageClick(index) {
    this.imageClicked = this.urls[index];
  }

}
