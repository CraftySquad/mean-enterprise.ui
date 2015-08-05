/**
 * @description loader service unit test
 */
describe('Loading Service', function() {
  var loadingService;

  beforeEach(module('meanEnt.loading'));

  beforeEach(
    inject(function(_loadingService_) {
      loadingService = _loadingService_;
    }));

  it('should show the loading screen', function() {
    expect(loadingService.loading().isLoading).toBeFalsy();
    loadingService.show();

    expect(loadingService.loading().isLoading).toBeTruthy();
  });

  it('should hide the loading screen', function() {
    loadingService.show();
    expect(loadingService.loading().isLoading).toBeTruthy();

    loadingService.hide();
    expect(loadingService.loading().isLoading).toBeFalsy();
  });
});
