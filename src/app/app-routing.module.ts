import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './main/welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'home', component: WelcomeComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth/auth.module').then(m => m.AuthModule) },
  { path: 'courses', loadChildren: () => import('./courses/courses/courses.module').then(m => m.CoursesModule) },
  { path: 'main', loadChildren: () => import('./main/main/main.module').then(m => m.MainModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
