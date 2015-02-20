define([
    'jquery',
    'lodash',
    'backbone',
    'text!templates/modules/stores.html'
], function($, _, Backbone, template) {

    // again - the dependencies were in the wrong order and the 'l' was missing from the template path.
    var StoresView = Backbone.View.extend({
        el: '.content',

        render: function() {

            $(this.el).html(template);


            $('#sendButton').on('click',function(event)
            {
                $('#result').html("You sent '"+ $('#messageText').val() + "' to this view");

            });

        }
    });

    return StoresView;
});
