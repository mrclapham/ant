/*
I know this is not how you intended this issue to be solved and that you had a specific BackBone
or possibly Require solution in mind.
I have, however, gone for a pure JS solution due to my rustyness with Backbone.
It is a singleton and may be used throughout the app to store vars and constants.
 */

define([], function() {

    var enums = (function () {
        var instance;

        function createInstance() {
            var instanceObject = {webserviceURL: 'https://cloudservices.arcadiagroup.co.uk/storestock/storestock'}
            return instanceObject;
        }

        return {
            getInstance: function () {
                if (!instance) {
                    instance = createInstance();
                }
                return instance;
            }
        };
    })();

    return enums;


});
