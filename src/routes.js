import SITEMAP from 'commons/sitemap';
import AuthPage from './containers/AuthPage';
import Home from './containers/Home';
import Purchasing from './containers/Purchasing';
import Logistic from './containers/Logistic';
import Employee from './containers/Employee';
import Supplier from './containers/Supplier';
import NotFound from './containers/NotFound';

export default [
  {
    exact: true,
    path: SITEMAP.index,
    component: Home,
  },
  {
    exact: true,
    path: SITEMAP.pembelian,
    component: Purchasing,
  },
  {
    exact: true,
    path: SITEMAP.logistik,
    component: Logistic,
  },
  {
    exact: true,
    path: SITEMAP.pegawai,
    component: Employee,
  },
  {
    exact: true,
    path: SITEMAP.supplier,
    component: Supplier,
  },
  {
    path: SITEMAP.login,
    component: AuthPage,
  },
  {
    path: '*',
    component: NotFound,
  },
];
