define([
    'lodash',
    'backbone',
    'jquery',
    'text!templates/modules/calculate.html'
], function(_, Backbone, $, template) {
    var CalculateView = Backbone.View.extend({
        el: '.content',
        events : {'click #sendButton' : 'renderResults'},
        dividend : 5,
        result: null,
        calculate : function (dividend)
        {
            var val = null;
            try{
                val = document.getElementById("inputNumber").value
            }catch(e){
                //-- it sometimes errors if the Dom has not rendered.
            }

            return isNaN(parseFloat(val)) ? "<h3 style='color:#ff00ff;;'>ERROR: Please enter a number</h3>" : 'The answer is ' +String(val/this.dividend);
        },

        renderResults: function () {
                $('#result').html(this.calculate(this.dividend));
        },

        render: function () {

            $(this.el).html(template);

            $('.dividend-value').html(this.dividend);
        }
    });

    return CalculateView;
});
