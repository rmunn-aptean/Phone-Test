Ext.define('MobileBI.util.CustomAjaxProxy', {
 override: 'Ext.data.proxy.Ajax',
  
   buildUrl: function(request) {
         var  me = this,
              serviceUrl = MobileBI.util.Config.getBaseServiceUrl(),
              url = me.getUrl(request);

       request.setUrl(serviceUrl + url);
       
//      Needs the following header from the server:     
//       Access-Control-Allow-Headers: X-AAL-SessionId
//        request.setHeader("X-AAL-SessionId", MobileManufacturing.util.Config.getSessionId());
         return me.callParent([request]);
     }
});