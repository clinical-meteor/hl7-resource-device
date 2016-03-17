
Devices = new Meteor.Collection('devices');

if (Meteor.isClient){
  Meteor.subscribe('devices');
}



DeviceSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Device"
    }
});
Devices.attachSchema(DeviceSchema);
