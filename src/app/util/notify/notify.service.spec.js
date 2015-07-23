/**
 * @description notify service unit tests
 */
describe('Notify Service', function() {
  var notifyService;

  beforeEach(module('ngAnimate'));
  beforeEach(module('meanEnt.services.notify'));

  beforeEach(
    inject(function(_notifyService_) {
      notifyService = _notifyService_;
    }));

  it('should notify of success', function() {
    notifyService.success('message', 'title');
  });

  it('should notify of error', function() {
    notifyService.error('message', 'title');
  });
});
