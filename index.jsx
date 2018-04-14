
import DevicesPage from './client/DevicesPage';
import DevicesTable from './client/DevicesTable';

var DynamicRoutes = [{
  'name': 'DevicesPage',
  'path': '/devices',
  'component': DevicesPage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'Devices',
  'to': '/devices',
  'href': '/devices'
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  DevicesPage,
  DevicesTable
};


