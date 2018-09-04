import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { CardTitle, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import { GlassCard, VerticalCanvas, Glass } from 'meteor/clinical:glass-ui';

import DeviceDetail from './DeviceDetail';
import DevicesTable from './DevicesTable';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

Session.setDefault('fhirVersion', 'v1.0.2');
Session.setDefault('selectedDeviceId', false);

export class DevicesPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      tabIndex: Session.get('devicePageTabIndex'),
      deviceSearchFilter: Session.get('deviceSearchFilter'),
      currentDeviceId: Session.get('selectedDeviceId'),
      fhirVersion: Session.get('fhirVersion'),
      selectedDevice: false
    };

    if (Session.get('selectedDeviceId')){
      data.selectedDevice = Devices.findOne({_id: Session.get('selectedDeviceId')});
    } else {
      data.selectedDevice = false;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    return data;
  }

  handleTabChange(index){
    Session.set('devicePageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedDeviceId', false);
    Session.set('deviceUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In DevicesPage render');
    return (
      <div id='devicesPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title='Devices' />
            <CardText>
              <Tabs id="devicesPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newDeviceTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <DeviceDetail 
                  id='newDevice'
                  fhirVersion={ this.data.fhirVersion }
                  device={ this.data.selectedDevice }
                  deviceId={ this.data.currentDeviceId } />  
               </Tab>
               <Tab className="deviceListTab" label='Devices' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <DevicesTable />
               </Tab>
               <Tab className="deviceDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <DeviceDetail 
                  id='deviceDetails' 
                  fhirVersion={ this.data.fhirVersion }
                  device={ this.data.selectedDevice }
                  deviceId={ this.data.currentDeviceId } />  
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(DevicesPage.prototype, ReactMeteorData);

export default DevicesPage;