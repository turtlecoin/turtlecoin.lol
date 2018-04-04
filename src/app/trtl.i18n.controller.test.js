describe('i18nController', function() {

    let ctrl, $scope, $q, i18nStrings;
    let mockLanguages = [];

    beforeEach(module('trtlApp.i18n'));

    beforeEach(function () {
        inject(function ($injector, _$rootScope_, $controller) {
            $scope = _$rootScope_.$new();
            $q = $injector.get('$q');
            i18nStrings = $injector.get('i18nStrings');
            ctrl = $controller('i18nController');
        });
    });

    it('should exist', function () {

        expect(ctrl).toBeDefined();
    });

    describe('activate', function () {

        it('should exist', function () {
            expect(ctrl.activate).toBeDefined();
        });

        it('should get the list of available languages', function () {
            ctrl.activate();
            expect(ctrl.languages.length).toEqual(Object.keys(i18nStrings.languages).length);
        });
    });

    describe('loadLanguage', function () {

        it('should exist', function () {
            expect(ctrl.loadLanguage).toBeDefined();
        });

        it('should set the selected language', function (done) {
            ctrl.loadLanguage('en')
            .then(function () {
                expect(ctrl.strings.mockString).toEqual(i18nStrings.languages.en.mockString);
                done();
            });
            $scope.$digest();

        });

        it('should ignore missing languages', function (done) {
            ctrl.loadLanguage('not-a-language')
            .then(function () {

            }, function (err) {
                expect(ctrl.strings.mockString).not.toBeDefined();
                expect(err).toBeDefined();
                done();
            });
            $scope.$digest();
        });

        it('should use previous language on new language failure', function (done) {
            ctrl.loadLanguage('en')
            .then(function () {
                return ctrl.loadLanguage('not-a-language');
            })
            .then(function () {

            }, function (err) {
                expect(ctrl.strings.mockString).toEqual(i18nStrings.languages.en.mockString);
                expect(err).toBeDefined();
                done();
            });
            $scope.$digest();
        });
    });

    describe('switchLanguage', function () {

        it('should exist', function () {
            expect(ctrl.switchLanguage).toBeDefined();
        });

        it('should change the language', function (done) {
            spyOn(ctrl, 'loadLanguage').and.callFake(function (locale) {
                return $q.resolve();
            });
            ctrl.languages = ['en', 'es', 'de'];
            ctrl.selectedLanguage = 'en';
            ctrl.switchLanguage()
            .then(function () {
                expect(ctrl.loadLanguage).toHaveBeenCalledWith('en');
                done();
            });
            $scope.$digest();
        });
    });
});
