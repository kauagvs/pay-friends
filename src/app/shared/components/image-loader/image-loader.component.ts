import { Component, Input, OnInit } from '@angular/core';

import { Utils } from '@core/utils/utils';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss'],
})
export class ImageLoaderComponent implements OnInit {
  @Input() src: string;

  @Input() width: number;

  id: string;

  loadingImage: boolean;

  loadedImage: boolean;

  hasImageLoadingError: boolean;

  ngOnInit(): void {
    this.id = Utils.generateUUID();
    this.width = this.width ?? 50;
    this.loadImage();
  }

  loadImage(): void {
    if (this.src) {
      this.loadingImage = true;
      this.loadedImage = false;
      this.hasImageLoadingError = false;

      const image = new Image();
      image.src = `${this.src}?${Date.now()}`;

      image.onload = () => {
        this.loadingImage = false;
        this.loadedImage = true;
      };

      image.onerror = () => {
        this.loadingImage = false;
        this.hasImageLoadingError = true;
      };
    }
  }

  reloadImage(): void {
    this.loadImage();
  }
}
