(function () {
    'use strict';

    angular.module('trtlApp.i18n')
    .controller('i18nController', I18nController);

    I18nController.$inject = [
        '$q',
        '$http',
        'i18nStrings'
    ];

    /**
    * @name i18nController
    * @description Internationalization controller.
    * @param {Service} $q AngularJS callback wrapper / promise service.
    * @param {Service} $http AngularJS http service.
    * @param {Constant} i18nStrings Language translations.
    */
    function I18nController ($q, $http, i18nStrings) {

        const defaultLocale = 'en';
        const localStorageKey = 'trtl-locale';

        let ctrl = {
            navButtonHome: 'home',
            strings: {}
        };

        ctrl.$onInit = function () {

            ctrl.activate();
        };

        /**
        * @name activate
        * @description Initializes the controller.
        */
        ctrl.activate = function () {

            // Get the list of available languages.
            ctrl.languages = Object.keys(i18nStrings.languages);

            // Decide which language should be loaded.

            // First language priority is local storage.
            let languageToLoad = window.localStorage.getItem(localStorageKey);

            // Second priority is browser language.
            let browserLanguage = getBrowserLanguage();
            // Check if browser language is supported.
            if (i18nStrings.languages[browserLanguage]) {

                languageToLoad = languageToLoad || browserLanguage;
            }

            // Use default if languageToLoad has not been determined already.
            ctrl.loadLanguage(languageToLoad || defaultLocale);

            if (ctrl.strings.turtleDescriptionFullLine) {
                console.log('%c%s', 'color: green; font-weight: bold; font-size: 16px;', ctrl.strings.turtleDescriptionFullLine);
            }
        };

        /**
        * @name loadLanguage
        * @description Loads the language file for the specified locale.
        * @param {String} language Language code: en for english, es for spanish, etc.
        * @returns {Promise}
        */
        ctrl.loadLanguage = function (language) {

            return $q(function (resolve, reject) {

                if (i18nStrings.languages[language]) {

                    ctrl.selectedLanguage = language;
                    ctrl.strings = i18nStrings.languages[language];
                    return resolve();
                } else {

                    return reject('404');
                }
            });
        };

        /**
        * @name languageChanged
        * @description Called when the user selects a different language.
        * @returns {Promise}
        */
        ctrl.switchLanguage = function () {

            return ctrl.loadLanguage(ctrl.selectedLanguage)
            .then(function () {

                window.localStorage.setItem(localStorageKey, ctrl.selectedLanguage);
            }, function (err) {

            });
        };

        return ctrl;

        /**
        * @name getBrowserLanguage
        * @description Gets the browser language from navigator.language.
        * @returns {String}
        */
        function getBrowserLanguage () {

            let browserLocale = navigator.languages ?
                navigator.languages[0] : (navigator.language || navigator.userLanguage);
            return browserLocale.substring(0,2);
        };
    };
})();
