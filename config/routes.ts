export default [
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  {
    path: '/welcome',
    icon: 'smile',
    component: './Welcome',
    menu: {
      name: 'Welcome', // 希望显示的菜单项的文本
    },
  },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page', menu: { name: 'MainPage'} },
      { path: '/admin/sub-page', component: './Admin/Admin', menu: { name: 'SubPage'} },
      { path: '/admin/interface_info', component: './Admin/InterfaceInfo', menu: { name: 'InterfaceInfoPage'}},
    ],
    menu: {
      name: 'Admin', // 希望显示的菜单项的文本
    },
  },

  // { icon: 'table', path: '/list', component: './InterfaceInfo', menu: { name: 'AdminInterface' } },

  // 访问主页时 自动重定向到欢迎页面
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
