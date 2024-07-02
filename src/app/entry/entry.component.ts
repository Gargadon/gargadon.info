import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { EntriesService } from '../entries.service';
import { isPlatformServer } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { MarkdownService, MarkedRenderer } from 'ngx-markdown';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css'
})
export class EntryComponent implements OnInit{

  entrada: any[];
  isServer = isPlatformServer(this.platformId);
  title:string;
  id: number;

  ngOnInit() { }

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private titleService: Title, private route: ActivatedRoute, private router: Router, private metaService: Meta, private entries: EntriesService, private markdownService: MarkdownService) {
    this.id = parseInt(this.route.snapshot.queryParams['id']);
    this.entries.recibirEntradaSingular(this.id).subscribe({
      next: (data) => { this.entrada = data, this.title = data?.[0]?.title, this.titleService.setTitle(this.title); this.updateTag(); },
      error: (e) => console.error(e)
    });

    this.markdownService.renderer.image = (src: string, alt: string) => {
      return '<img src="' + src + '" alt="' + alt + '" style="max-width:100%">';
    };
  }

  updateTag() {
    this.metaService.updateTag({ name: "description", content: this.title });
    this.metaService.updateTag({ name: "robots", content: "index,follow" });
    this.metaService.updateTag({ property: "og:title", content: "Gargadon's Dungeon :: " + this.title });
    this.metaService.updateTag({ property: "og:type", content: "website" });
    this.metaService.updateTag({ property: "og:url", content: "https://www.gargadon.info/" });
    this.metaService.updateTag({ property: "og:image", content: "https://www.gargadon.info/assets/img/musashi_mochi.webp" });
  }
}