
/*************************************************
 * CACHED DATA FETCH
 *************************************************/

var FOGCache = {

      "data" : {},

      getData: function(cache_id, fn_cb)
      {
          if ( !FOGCache.data[cache_id] ){
              FOGCache.data[cache_id] = {
                                              data: null,
                                              fn_arr: []
                                           };
          }
          if (FOGCache.data[cache_id] && FOGCache.data[cache_id].data) {
              if (fn_cb != null)
                  fn_cb(FOGCache.data[cache_id].data);
              else
                  return FOGCache.data[cache_id].data;
          } else{
              FOGCache.data[cache_id].fn_arr.push(fn_cb);
          }
        },

        setData: function()
        {
              if ( !FOGCache.data[cache_id] ){
                  FOGCache.data[cache_id] = {
                                            data: cache_data,
                                            fn_arr: []
                                         };
              } else {
                  if( FOGCache.data[cache_id].fn_arr &&
                      FOGCache.data[cache_id].fn_arr.length){
                          $.each(FOGCache.data[cache_id].fn_arr, function(index, fn_cb) {
                              fn_cb(cache_data);
                         });
                        FOGCache.data[cache_id] = {
                                            data: cache_data,
                                            fn_arr: []
                                         };
                  } else { /* only set the data */
                      FOGCache.data[cache_id].data = cache_data;
                  } 
              }
        },
};








