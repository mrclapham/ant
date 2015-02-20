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

        nextSevenDays : function (dow) {
        	//Task 3 - Complete this function efficiently
            var daysOfTheWeek = ['sunday', 'monday','tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
                days = 7,
                startDate = new Date(),
                returnString ="<ul>";

            this.makeLi = function(d){
                return '<li>'+ daysOfTheWeek[d.getDay()]+' '+ (d.getDate()) +'.'+ (d.getMonth()+1) +'.'+ d.getFullYear()+'</li>'
            }

            for(var i=1; i<days; i++){
                startDate.setDate(startDate.getDate()+1);
                returnString+=this.makeLi(new Date(startDate));
            }
            returnString+='</ul>';
            console.log(returnString)
           return(returnString);

            //return "This task to be completed"
        },

        render: function () {
            $(this.el).html(template);
            $('#days').html(this.nextSevenDays());
        }
    });

    return DaysOfWeekView;
});
