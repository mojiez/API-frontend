﻿export default [
  {
    path: '/',
    icon: 'smile',
    component: './Index',
    menu: {
      name: 'Welcome', // 希望显示的菜单项的文本
    },
  },

  {
    path: '/interface_info/:id',
    component: './InterfaceInfo',
  },

  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },

  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page', menu: { name: 'MainPage'} },
      { path: '/admin/sub-page', component: './Admin/Admin', menu: { name: 'SubPage'} },
      { path: '/admin/interface_info', component: './Admin/InterfaceInfo', menu: { name: 'InterfaceInfoPage'}},
      { path: '/admin/interface_analysis', component: './Admin/InterfaceAnalysis', menu: { name: 'InterfaceAnalysisPage'}},
    ],
    menu: {
      name: 'Admin', // 希望显示的菜单项的文本
    },
  },

  // { icon: 'table', path: '/list', component: './InterfaceInfo', menu: { name: 'AdminInterface' } },

  // // 访问主页时 自动重定向到欢迎页面
  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
