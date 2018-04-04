describe('i18nController', function() {

    let ctrl, $scope, $q;

    beforeEach(module('trtlApp'));

    beforeEach(function () {
        inject(function ($injector, _$rootScope_, $controller) {
            $scope = _$rootScope_.$new();
            $q = $injector.get('$q');
            ctrl = $controller('trtlController');
        });
    });

    it('should exist', function () {

        expect(ctrl).toBeDefined();
    });
});
