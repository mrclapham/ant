// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'vm'
], function($, _, Backbone, Vm) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Pages
            'sendMessage': 'sendMessage',
            'calculate' : 'calculate',
            'daysOfWeek' : 'daysOfWeek',
            'stores' : 'stores',

            // Default - catch all
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(options) {
        var appView = options.appView;
        var router = new AppRouter(options);

        router.on('route:sendMessage', function(parameters) {

                require(['views/sendMessage'], function(SendMessageView) {
                var view = Vm.create(appView, 'sendMessage', SendMessageView);
                view.render();
           });

        });

        router.on('route:calculate', function(parameters) {

                require(['views/calculate'], function(CalculateView) {
                var view = Vm.create(appView, 'calculate', CalculateView);
                view.render();
           });

        });


        router.on('route:daysOfWeek', function(parameters) {

            require(['views/daysOfWeek'], function(DaysOfWeekView) {
                var view = Vm.create(appView, 'stores', DaysOfWeekView);
                view.render();
            });

        });

        router.on('route:stores', function(parameters) {

            require(['views/stores'], function(StoresView) {
                var view = Vm.create(appView, 'stores', StoresView);
                view.render();
            });

        });

        router.on('route:defaultAction', function(actions) {


        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
