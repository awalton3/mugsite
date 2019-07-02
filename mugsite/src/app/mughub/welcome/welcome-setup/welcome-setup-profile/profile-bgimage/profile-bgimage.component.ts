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
      'https://i.ibb.co/pjG5Rkf/4k-wallpaper-astronomy-evening-2085998.jpg',
      'https://i.ibb.co/PQyS52p/adventure-automobile-classic-2533092.jpg',
      'https://i.ibb.co/hKqTZzd/alley-architecture-buildings-2119106.jpg',
      'https://i.ibb.co/kDGtKr8/anniversary-artificial-beautiful-1803911.jpg',
      'https://i.ibb.co/L9Bwcn0/bloom-blossom-depth-of-field-2184346.jpg',
      'https://i.ibb.co/hfhy5z1/branded-converse-all-star-converse-all-star-2421374.jpg',
      'https://i.ibb.co/0VZMXZd/cobblestone-granite-pebbles-1029604.jpg',
      'https://i.ibb.co/tQFP2K5/environment-flora-foliage-2537632.jpg',
    ]
    this.imageClicked = 'https://i.ibb.co/pjG5Rkf/4k-wallpaper-astronomy-evening-2085998.jpg';
  }

  ngAfterViewInit() {
    // setInterval(() => {this.imagesLoaded = true;}, 3000)
    this.imagesLoaded = true;
  }

  onImageClick(index) {
    this.imageClicked = this.urls[index];
  }

}
