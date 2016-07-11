import { RouterConfig }          from '@angular/router';

//import {DisasterCenter} from './disaster-center/disaster-center';
import {Home} from './home';
export const HomeRoutes: RouterConfig = [
    { path: '', terminal: true, redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Home}
];
