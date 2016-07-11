import { provideRouter, RouterConfig} from '@angular/router';

//import { Home }  from './components/home/home';
//import { About}    from './components/about/about';
//import { DisasterCenterRoutes } from './components/home/disaster-center/disaster-center.routes';
import { HomeRoutes }       from './components/home/home.routes';

const routes: RouterConfig = [
    ...HomeRoutes

];

export const APP_ROUTER_PROVIDERS =[
    provideRouter(routes)
];
