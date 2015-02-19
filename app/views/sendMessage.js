define([
    'jquery',
    'lodash',
    'backbone',
    'text!templates/modules/sendMessage.htm'
], function(_, Backbone, $, template) {
    var SendMessageView = Backbone.View.extend({
        el: '.content',
                
        render: function() {

            $(this.el).html(template);
            $('#sendButton').on('click',function(event) 
            {
                $('#result').html("You sent '"+ $('#messageText').val() + "' to this view"):
            });
        }
    });

    return SendMessageView;
});
