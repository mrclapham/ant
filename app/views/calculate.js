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
        input: function(){return document.getElementById("inputNumber") },
        calculate : function (dividend)
        {
            var val = this.input.value
            return 2000 // !isNaN(parseFloat( val) ? val/dividend : this.onError());
        },
        onError:function(){
            alert("ERROR")
        },
        
        renderResults: function () {
            this.result = this.calculate(this.dividend);

                $('#result').html('The answer is ' + this.calculate(this.dividend));
        },

        render: function () {

            $(this.el).html(template);
            
            $('.dividend-value').html(this.dividend);
        }
    });

    return CalculateView;
});
