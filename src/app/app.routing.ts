/**
 *   .
 */

import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ModuleWithProviders} from '@angular/core';
import {TestComponent} from './components/test/test.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {WebsiteEditComponent}from './components/website/website-edit/website-edit.component';
import {WebsiteListComponent}from './components/website/website-list/website-list.component';
import {WebsiteNewComponent}from './components/website/website-new/website-new.component';
import {WidgetChooserComponent}from './components/widget/widget-chooser/widget-chooser.component';
import {WidgetEditComponent}from './components/widget/widget-edit/widget-edit.component';
import {WidgetListComponent} from './components/widget/widget-list/widget-list.component';
import {WidgetHeaderComponent}from './components/widget/widget-edit/widget-header/widget-header.component';
import {WidgetImageComponent}from './components/widget/widget-edit/widget-image/widget-image.component';
import {WidgetYoutubeComponent}from './components/widget/widget-edit/widget-youtube/widget-youtube.component';
import {PageListComponent} from "./components/page/page-list/page-list.component";
import {PageNewComponent} from "./components/page/page-new/page-new.component";
import {PageEditComponent} from "./components/page/page-edit/page-edit.component";
import {FlickrImageSearchComponent} from "./components/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component";
import {WidgetHtmlComponent} from "./components/widget/widget-edit/widget-html/widget-html.component";
import {WidgetTextComponent} from "./components/widget/widget-edit/widget-text/widget-text.component";
import {AuthGuard} from "./services/auth-guard.service";



const APP_ROUTES: Routes = [
  {path: '', component : HomeComponent},
  {path: 'test', component: TestComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user/:uid', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'user/:uid/website', component: WebsiteListComponent , canActivate:[AuthGuard]},
  {path: 'user/:uid/website/new', component: WebsiteNewComponent, canActivate:[AuthGuard] },
  {path: 'user/:uid/website/:wid', component: WebsiteEditComponent, canActivate:[AuthGuard] },
  {path: 'user/:uid/website/:wid/page', component: PageListComponent, canActivate:[AuthGuard]},
  {path: 'user/:uid/website/:wid/page/new', component: PageNewComponent },
  {path: 'user/:uid/website/:wid/page/:pid', component: PageEditComponent },
  {path: 'user/:uid/website/:wid/page/:pid/widget', component: WidgetListComponent},
  {path: 'user/:uid/website/:wid/page/:pid/widget/new', component: WidgetChooserComponent },
  {path: 'user/:uid/website/:wid/page/:pid/widget/new/heading', component: WidgetHeaderComponent },
  {path: 'user/:uid/website/:wid/page/:pid/widget/new/youtube', component: WidgetYoutubeComponent },
  {path: 'user/:uid/website/:wid/page/:pid/widget/new/image', component: WidgetImageComponent },
  {path: 'user/:uid/website/:wid/page/:pid/widget/new/html', component: WidgetHtmlComponent },
  {path: 'user/:uid/website/:wid/page/:pid/widget/new/text', component: WidgetTextComponent },
  {path: 'user/:uid/website/:wid/page/:pid/widget/new/image/search', component: FlickrImageSearchComponent },
  {path: 'user/:uid/website/:wid/page/:pid/widget/:wgid', component: WidgetEditComponent }

];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
