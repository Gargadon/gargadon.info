import { Component } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {

  title = "Acerca de mí";

  constructor(private metaService: Meta) {
    this.updateTag();
  }

  updateTag() {
    this.metaService.updateTag({ name: "description", content: this.title });
    this.metaService.updateTag({ name: "robots", content: "index,follow" });
    this.metaService.updateTag({ property: "og:title", content: "Gargadon's Dungeon :: " + this.title });
    this.metaService.updateTag({ property: "og:type", content: "website" });
    this.metaService.updateTag({ property: "og:url", content: "https://www.gargadon.info/about-me" });
    this.metaService.updateTag({ property: "og:image", content: "https://www.gargadon.info/assets/img/musashi_mochi.png" });
  }
}
