
/*************************************************
 * CACHED DATA FETCH
 *************************************************/

var JOGCache = {

      "data" : {},

      getData: function(cache_id, fn_cb)
      {
          if ( !JOGCache.data[cache_id] ){
              JOGCache.data[cache_id] = {
                                              data: null,
                                              fn_arr: []
                                           };
          }
          if (JOGCache.data[cache_id] && JOGCache.data[cache_id].data) {
              if (fn_cb != null)
                  fn_cb(JOGCache.data[cache_id].data);
              else
                  return JOGCache.data[cache_id].data;
          } else{
              JOGCache.data[cache_id].fn_arr.push(fn_cb);
          }
        },

        setData: function(cache_id, cache_data)
        {
              if ( !JOGCache.data[cache_id] ){
                  JOGCache.data[cache_id] = {
                                            data: cache_data,
                                            fn_arr: []
                                         };
              } else {
                  if( JOGCache.data[cache_id].fn_arr &&
                      JOGCache.data[cache_id].fn_arr.length){
                          $.each(JOGCache.data[cache_id].fn_arr, function(index, fn_cb) {
                              fn_cb(cache_data);
                         });
                        JOGCache.data[cache_id] = {
                                            data: cache_data,
                                            fn_arr: []
                                         };
                  } else { /* only set the data */
                      JOGCache.data[cache_id].data = cache_data;
                  } 
              }
        },

        
};








