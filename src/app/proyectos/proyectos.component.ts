import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent implements OnInit{
  ngOnInit(): void { }

  title="Proyectos";

  constructor(private metaService: Meta) {
    this.updateTag();
  }

  updateTag() {
    this.metaService.updateTag({ name: "description", content: this.title });
    this.metaService.updateTag({ name: "robots", content: "index,follow" });
    this.metaService.updateTag({ property: "og:title", content: "Gargadon's Dungeon :: " + this.title });
    this.metaService.updateTag({ property: "og:type", content: "website" });
    this.metaService.updateTag({ property: "og:url", content: "https://www.gargadon.info/proyectos" });
    this.metaService.updateTag({ property: "og:image", content: "https://www.gargadon.info/assets/img/musashi_mochi.png" });
  }
}