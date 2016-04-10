describe('clinical:hl7-resources-devices', function () {
  var server = meteor();
  var client = browser(server);

  it('Devices should exist on the client', function () {
    return client.execute(function () {
      expect(Devices).to.exist;
    });
  });

  it('Devices should exist on the server', function () {
    return server.execute(function () {
      expect(Devices).to.exist;
    });
  });

});
