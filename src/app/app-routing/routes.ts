import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { Menu2Component } from '../menu2/menu2.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'menu',     component: MenuComponent },
  { path: 'dishdetail/:idd',     component: DishdetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'contactus',     component: ContactComponent },
  { path: 'aboutus',     component: AboutComponent },
  { path: 'm2',     component: Menu2Component },
]