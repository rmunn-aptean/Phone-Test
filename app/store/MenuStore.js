Ext.define('MobileBI.store.MenuStore', {
    extend : 'Ext.data.Store',

    config : {
        autoLoad: true,
        model: 'MobileBI.model.MenuItem',
        storeId: 'MenuStore',
        data: [ ]
    },
    
    initialize: function() {
        this.recalcData();
        this.callParent(arguments);
    },
    recalcData: function() {
        var options = [];
        var biConfig = MobileBI.util.Config.getBiConfig();
        
        for (var i = 0; i < biConfig.length; i++) {
            options.push({ DisplayName: biConfig[i].name, DisplayNameToken: '',    visible: 'true' } );
        }
            
//        if ((Ext.os.deviceType !== 'Phone') && (MobileBI.util.Config.getDashboardEnabled() === 'Yes')) {
//            options.push({ DisplayName: 'Dashboard',    DisplayNameToken: 'menu_dashboard',    visible: 'true', xtype: 'dashboardcanvas' });
//        }
        options.push({ DisplayName: 'Log Off',      DisplayNameToken: 'menu_logoff',  visible: 'true', event: 'logOff' });
        this.setData(options);
    }
});

