

// create the object using our BaseModel
Device = BaseModel.extend();

//Assign a collection so the object knows how to perform CRUD operations
Device.prototype._collection = Devices;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Devices = new Mongo.Collection('Devices');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Devices._transform = function (document) {
  return new Device(document);
};


// if (Meteor.isClient){
//   Meteor.subscribe('Devices');
// }

// if (Meteor.isServer){
//   Meteor.publish('Devices', function (argument){
//     if (this.userId) {
//       return Devices.find();
//     } else {
//       return [];
//     }
//   });
// }



DeviceSchema = new SimpleSchema({
  'resourceType' : {
    type: String,
    defaultValue: 'Device'
  },
  'identifier' : {
    optional: true,
    type: [ IdentifierSchema ]
  }, // Instance id from manufacturer, owner, and others
  'type' : {
    optional: true,
    type: CodeableConceptSchema
  }, // R!  What kind of device this is
  'note' : {
    optional: true,
    type: [ AnnotationSchema ]
  }, // Device notes and comments
  'status' : {
    optional: true,
    type: Code
  }, // available | not-available | entered-in-error
  'manufacturer' : {
    optional: true,
    type: String
  }, // Name of device manufacturer
  'model' : {
    optional: true,
    type: String
  }, // Model id assigned by the manufacturer
  'version' : {
    optional: true,
    type: String
  }, // Version number (i.e. software)
  'manufactureDate' : {
    optional: true,
    type: Date
  }, // Manufacture date
  'expiry' : {
    optional: true,
    type: Date
  }, // Date and time of expiry of this device (if applicable)
  'udi' : {
    optional: true,
    type: String
  }, // FDA mandated Unique Device Identifier
  'lotNumber' : {
    optional: true,
    type: String
  }, // Lot number of manufacture
  'owner' : {
    optional: true,
    type: ReferenceSchema
  }, // (Organization) Organization responsible for device
  'location' : {
    optional: true,
    type: ReferenceSchema
  }, // (Location)Where the resource is found
  'patient' : {
    optional: true,
    type: ReferenceSchema
  }, // (Patient) If the resource is affixed to a person
  'contact' : {
    optional: true,
    type: [ ContactPointSchema ]
  }, // Details for human/organization for support
  'url' : {
    optional: true,
    type: String
  } // Network address to contact device
});
Devices.attachSchema(DeviceSchema);

export default { Device, Devices, DeviceSchema };