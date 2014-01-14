Ext.define('MobileBI.view.Menu', {
    extend: 'Ext.Panel',
    xtype: 'menupanel',
    requires: ['Ext.dataview.List', 'MobileBI.view.MenuItems'],
    
    config: {
        layout: 'vbox',
        items: [{
           xtype: 'menuitems'
        }],
        left: -2000,  // avoid momentary blink before correct positioning
        modal: true,
        hideOnMaskTap: true,
        listeners: [{
            delegate: 'menuitems',
            event: 'itemtap',
            fn: 'processEvents'
        }]
    },
    
    logOff : function() {
        this.fireEvent('logOff');
    },
            
    processEvents : function(a, b, c, record) {
        var tEvent = record.get('event');
        if (tEvent !== null) {
            console.log("processEvents event = " + tEvent);
            this.fireEvent(tEvent);
        }

    }
});

