define([
    'lodash',
    'backbone',
    'jquery',
    'text!templates/modules/daysOfWeek.html'
], function( _, Backbone, $, template) {
    var DaysOfWeekView = Backbone.View.extend({
        el: '.content',

        initialize : function () {

        	var daysOfTheWeek = ['monday','tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        },

        nextSevenDays : function () {
        	//Task 3 - Complete this function efficiently
            return "This task to be completed"
        },

        render: function () {
            $(this.el).html(template);
            $('#days').html(this.nextSevenDays());
        }
    });

    return DaysOfWeekView;
});
