import { Home } from 'app/containers/Home/Loadable';
import { Login } from 'app/containers/Login/Loadable';
import { Register } from 'app/containers/Register/Loadable';
import { Profile } from 'app/containers/Profile/Loadable';
import { RegisterTutor } from 'app/containers/RegisterTutor/Loadable';

export const privateRoutes = [
  {
    path: '/profile',
    component: Profile,
    key: 'profile',
  },
  {
    path: '/',
    component: Home,
    key: 'home',
  },
  {
    path: '/register-tutor',
    component: RegisterTutor,
    key: 'register-tutor',
  },
];

export const publicRoutes = [
  {
    path: '/',
    component: Home,
    key: 'home',
  },
  {
    path: '/login',
    component: Login,
    key: 'login',
  },
  {
    path: '/register',
    component: Register,
    key: 'register',
  },
];
