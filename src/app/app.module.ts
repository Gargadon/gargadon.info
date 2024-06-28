import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withNoHttpTransferCache } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { EmpleadoHijoComponenteComponent } from './empleado-hijo-componente/empleado-hijo-componente.component';
import { CaracteristicasEmpleadoComponenteComponent } from './caracteristicas-empleado-componente/caracteristicas-empleado-componente.component';
import { ServicioEmpleadosService } from './servicio-empleados.service';
import { EmpleadosService } from './empleados.service';
import { DataServices } from './data.services';
import { HomeComponentComponent } from './home-component/home-component.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ActualizaComponent } from './actualiza/actualiza.component';
import { ErrorComponent } from './error/error.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { AnimeuwuComponent } from './proyectos/animeuwu/animeuwu.component';
import { EmpleadosComponent } from './proyectos/empleados/empleados.component';
import { MainComponent } from './proyectos/main/main.component';
import { FooterComponent } from './footer/footer.component';
import { DiceComponent } from './proyectos/dice/dice.component';
import { Login2Component } from './proyectos/login/login.component';
import { HttpClient,  provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { LogoutComponent } from './logout/logout.component';


var titulo = "Gargadon's Dungeon :: "

const appRoutes: Routes = [
  { path: '', component: HomeComponentComponent, title: titulo + "Página Principal" },
  { path: 'logout', component: LogoutComponent, title: titulo + "Cerrar sesión" },
  {
    path: 'proyectos', component: ProyectosComponent, title: titulo + "Proyectos",
    children: [
      {
        path: '', component: MainComponent
      },
      {
        path: 'animeuwu', component: AnimeuwuComponent, title: titulo + "AnimeUWU"
      },
      {
        path: 'dice', component: DiceComponent, title: titulo + "Dados"
      },
      {
        path: 'login', component: Login2Component, title: titulo + "Login"
      },
      {
        path: 'empleados',
        children: [
          {
            path: '', component: EmpleadosComponent, title: titulo + "Lista de empleados"
          },
          {
            path: 'actualiza/:id', component: ActualizaComponent, title: titulo + "Actualizando lista de empleados"
          }
        ]
      }
    ]
  },
  { path: 'about-me', component: AboutMeComponent, title: titulo + "Acerca de mí" },
  { path: '**', component: ErrorComponent, title: titulo + "Página no encontrada" }
];

@NgModule({
  declarations: [
    AppComponent,
    EmpleadoHijoComponenteComponent,
    CaracteristicasEmpleadoComponenteComponent,
    HomeComponentComponent,
    ProyectosComponent,
    NavbarComponent,
    ActualizaComponent,
    ErrorComponent,
    AboutMeComponent,
    AnimeuwuComponent,
    EmpleadosComponent,
    FooterComponent,
    DiceComponent,
    LoginComponent,
    Login2Component,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClient(withFetch()), SsrCookieService, ServicioEmpleadosService, DataServices, EmpleadosService, provideClientHydration(withNoHttpTransferCache())],
  bootstrap: [AppComponent]
})
export class AppModule { }
