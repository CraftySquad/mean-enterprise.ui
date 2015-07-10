/**
 * @description loader service unit test
 */
describe('Loader Service', function() {
  var loaderService;

  beforeEach(module('meanEnt.services.loader'));

  beforeEach(
    inject(function(_loaderService_) {
      loaderService = _loaderService_;
    }));

  it('should get and set app loading', function() {
    expect(loaderService.appLoading()).toBeFalsy();
    loaderService.setAppLoading(true);
    expect(loaderService.appLoading()).toBeTruthy();
  });

  it('should get and set priming', function() {
    expect(loaderService.priming()).toBeTruthy();
    loaderService.setPriming(false);
    expect(loaderService.priming()).toBeFalsy();
  });
});
