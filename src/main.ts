import { importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';
import { ServiceWorkerModule } from '@angular/service-worker';
import { bootstrapApplication } from '@angular/platform-browser';
import { User, Oggetto, Status } from './app/global';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
    providers: [
        provideZoneChangeDetection(),
        provideIonicAngular(),
        provideRouter(routes),
        importProvidersFrom(ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        })),
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        User,
        Oggetto,
        Status,
        provideHttpClient(withXhr()),
    ]
}).catch((err) => console.log(err));
