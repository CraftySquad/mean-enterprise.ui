/**
 * @file storage service unit tests
 */
describe('storage service', function() {
  var $window;
  var storageService;

  beforeEach(module('meanEnt.services.storage'));

  beforeEach(
    inject(function(_$window_, _storageService_) {
      $window = _$window_;
      storageService = _storageService_;
    })
  );

  afterEach(function() {
    $window.localStorage.clear();
  });

  it('should clear', function() {
    $window.localStorage['testKey1'] = 'testValue';
    $window.localStorage['testKey2'] = 'testValue';

    expect($window.localStorage.length).toBe(2);

    storageService.clear();

    expect($window.localStorage.length).toBe(0);
  });

  it('should get simple', function() {
    $window.localStorage['testKey'] = 'testValue';

    var value = storageService.get('testKey');
    expect(value).toBe('testValue');
  });

  it('should get object', function() {
    var obj = {
      someKey: 'someValue',
      anotherKey: 'anotherValue'
    };
    $window.localStorage['testKey'] = JSON.stringify(obj);

    var value = storageService.getObject('testKey');
    expect(value).toEqual(obj);
  });

  it('should remove key', function() {
    $window.localStorage['testKey'] = 'testValue';

    var value = storageService.get('testKey');
    expect(value).toBe('testValue');

    storageService.removeKey('testKey');
    var emptyValue = storageService.get('testValue', null);
    expect(emptyValue).toBe(null);
  });

  it('should set simple', function() {
    storageService.set('testKey', 'simpleValue');

    var value = $window.localStorage['testKey'];
    expect(value).toBe('simpleValue');
  });

  it('should set object', function() {
    var obj = {
      someKey: 'someValue',
      anotherKey: 'anotherValue'
    };
    storageService.set('testKey', obj);

    var value = storageService.getObject('testKey');
    expect(value).toEqual(obj);
  });
});