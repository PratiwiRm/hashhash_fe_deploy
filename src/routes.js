import React from 'react';
import { Redirect } from 'react-router-dom';

import SITEMAP from 'commons/sitemap';
import AuthPage from 'containers/AuthPage';
import Help from 'containers/Help';
import Purchasing from 'containers/Purchasing';
import Logistic from 'containers/Logistic';
import Employee from 'containers/Employee';
import Supplier from 'containers/Supplier';
import Performance from 'containers/Performance';
import NotFound from 'containers/NotFound';

const authenticated = Component => {
  const { token } = window.localStorage;

  if (token) {
    return <Component />;
  }

  return <Redirect to={SITEMAP.login} />;
};

const unAuthenticated = Component => {
  const { token } = window.localStorage;

  if (token) {
    return <Redirect to={SITEMAP.index} />;
  }

  return <Component />;
};

export default [
  {
    exact: true,
    path: SITEMAP.index,
    render: () => <Redirect push to={SITEMAP.pembelian} />,
  },
  {
    exact: true,
    path: SITEMAP.pembelian,
    render: () => authenticated(Purchasing),
  },
  {
    exact: true,
    path: SITEMAP.logistik,
    render: () => authenticated(Logistic),
  },
  {
    exact: true,
    path: SITEMAP.pegawai,
    render: () => authenticated(Employee),
  },
  {
    exact: true,
    path: SITEMAP.supplier,
    render: () => authenticated(Supplier),
  },
  {
    exact: true,
    path: SITEMAP.performa,
    render: () => authenticated(Performance),
  },
  {
    exact: true,
    path: SITEMAP.bantuan,
    render: () => authenticated(Help),
  },
  {
    exact: true,
    path: SITEMAP.login,
    render: () => unAuthenticated(AuthPage),
  },
  {
    path: '*',
    component: NotFound,
  },
];
