


var JogSearchController = {


    autocompleteHtml : function (item)
    {
        return '<img src="'+item.pic+'" width="25px">'+
               '<span>'+item.name+'</span>';
    },


    init: function(data)
    {

        $("#jog_search").autocomplete(
            data, 
            {
                multiple: false,
                minChars: 1,
                autoFill: true,
                max: 6,
                mustMatch: false,
                parse: function(data){
                    return $.map(data, function(item) {
                        return { data: item, value: item.name, result: item };
                    });
                },
                formatMatch: function(item) {
                    return item.name;
                },
                formatItem: function(item) {
                    return JogSearchController.autocompleteHtml(item);
                }
            }).result(function(e, item) {
                  console.log(item); 
                  window.location = "http://whispering-plains-8323.herokuapp.com/show/"+item.srv_uid ;
                  
            }); 
    }, 




};