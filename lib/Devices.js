import SimpleSchema from 'simpl-schema';

// create the object using our BaseModel
Device = BaseModel.extend();

//Assign a collection so the object knows how to perform CRUD operations
Device.prototype._collection = Devices;

// // Create a persistent data store for addresses to be stored.
// // HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
if(typeof Devices === 'undefined'){
  if(Package['clinical:autopublish']){
    Devices = new Mongo.Collection('Devices');
  } else if(Package['clinical:desktop-publish']){    
    Devices = new Mongo.Collection('Devices');
  } else {
    Devices = new Mongo.Collection('Devices', {connection: null});
  }
}


//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Devices._transform = function (document) {
  return new Device(document);
};


DeviceDstu2 = new SimpleSchema({
  'resourceType' : {
    type: String,
    defaultValue: 'Device'
  },
  'identifier' : {
    optional: true,
    type: Array
  }, // Instance id from manufacturer, owner, and others
  'identifier.$' : {
    optional: true,
    type: IdentifierSchema 
  }, // Instance id from manufacturer, owner, and others
  'type' : {
    type: CodeableConceptSchema
  }, // R!  What kind of device this is
  'note' : {
    optional: true,
    type: Array
  }, // Device notes and comments
  'note.$' : {
    optional: true,
    type: AnnotationSchema
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
    type: Array
  }, // Details for human/organization for support
  'contact.$' : {
    optional: true,
    type: ContactPointSchema 
  }, // Details for human/organization for support
  'url' : {
    optional: true,
    type: String
  } // Network address to contact device
});



DeviceStu3 = new SimpleSchema({
  'resourceType' : {
    type: String,
    defaultValue: 'Device'
  },
  'identifier' : {
    optional: true,
    type: Array
  }, // Instance id from manufacturer, owner, and others
  'identifier.$' : {
    optional: true,
    type: IdentifierSchema 
  }, // Instance id from manufacturer, owner, and others
  'udi' : {
    optional: true,
    type: Object
  }, // FDA mandated Unique Device Identifier
  'udi.deviceIdentifier' : {
    optional: true,
    type: String
  }, 
  'udi.name' : {
    optional: true,
    type: String
  }, 
  'udi.jurisdiction' : {
    optional: true,
    type: String
  }, 
  'udi.carrierHRF' : {
    optional: true,
    type: String
  }, 
  'udi.carrierAIDC' : {
    optional: true,
    type: String
  }, 
  'udi.issuer' : {
    optional: true,
    type: String
  }, 
  'udi.entryType' : {
    optional: true,
    type: Code
  }, 
  'status' : {
    optional: true,
    type: Code,
    allowedValues: ['active', 'inactive', 'enterred-in-error', 'unknown']
  },
  'type' : {
    optional: true,
    type: CodeableConceptSchema
  },
  'lotNumber' : {
    optional: true,
    type: String
  }, // Lot number of manufacture
  'manufacturer' : {
    optional: true,
    type: String
  }, // Name of device manufacturer
  'manufactureDate' : {
    optional: true,
    type: Date
  }, // Manufacture date
  'expirationDate' : {
    optional: true,
    type: Date
  }, // Manufacture date
  'model' : {
    optional: true,
    type: String
  }, // Model id assigned by the manufacturer
  'version' : {
    optional: true,
    type: String
  }, // Version number (i.e. software)
  'patient' : {
    optional: true,
    type: ReferenceSchema
  }, // (Organization) Organization responsible for device
  'owner' : {
    optional: true,
    type: ReferenceSchema
  }, // (Organization) Organization responsible for device
  'contact' : {
    optional: true,
    type: Array
  }, // Details for human/organization for support
  'contact.$' : {
    optional: true,
    type: ContactPointSchema 
  }, // Details for human/organization for support
  'location' : {
    optional: true,
    type: ReferenceSchema
  }, // (Location)Where the resource is found
  'url' : {
    optional: true,
    type: String
  }, // Network address to contact device
  'note' : {
    optional: true,
    type: Array
  }, // Device notes and comments
  'note.$' : {
    optional: true,
    type: AnnotationSchema
  }, // Device notes and comments
  'safety' : {
    optional: true,
    type: Array
  }, 
  'safety.$' : {
    optional: true,
    type: CodeableConceptSchema
  }, 
});




DeviceSchema = DeviceDstu2;

BaseSchema.extend(DeviceSchema);
DomainResourceSchema.extend(DeviceSchema);
Devices.attachSchema(DeviceSchema);

export default { Device, Devices, DeviceSchema, DeviceDstu2, DeviceStu3 };