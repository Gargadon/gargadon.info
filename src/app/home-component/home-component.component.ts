<<<<<<< HEAD
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { EntriesService } from '../entries.service';
import { MarkdownService } from 'ngx-markdown';
import { isPlatformServer } from '@angular/common';
=======
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
>>>>>>> parent of b7cb0ab (New blog API)

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
<<<<<<< HEAD
export class HomeComponentComponent implements OnInit {
=======
export class HomeComponentComponent implements OnInit{

  ngOnInit(): void {

  }
>>>>>>> parent of b7cb0ab (New blog API)

  isServer = isPlatformServer(this.platformId);
  title = "Página principal";
<<<<<<< HEAD
  entradas: any[];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private metaService: Meta, private entries: EntriesService, private markdownService: MarkdownService) {
    this.entries.recibirEntradas().subscribe({
      next: (data) => {this.entradas = data},
      error: (e) => console.error(e)
    })

    this.markdownService.renderer.image = (src: string, alt: string) => {
      return '<img src="' + src + '" alt="' + alt + '" style="max-width:100%">';
    };
  }

  ngOnInit() {
    this.updateTag();
  }
    
=======

  constructor(private metaService: Meta) {
    this.updateTag();
  }
>>>>>>> parent of b7cb0ab (New blog API)

updateTag() {
  this.metaService.updateTag({ name: "description", content: this.title });
  this.metaService.updateTag({ name: "robots", content: "index,follow" });
  this.metaService.updateTag({ property: "og:title", content: "Gargadon's Dungeon :: " + this.title });
  this.metaService.updateTag({ property: "og:type", content: "website" });
  this.metaService.updateTag({ property: "og:url", content: "https://www.gargadon.info/" });
  this.metaService.updateTag({ property: "og:image", content: "https://www.gargadon.info/assets/img/musashi_mochi.webp" });
}
}