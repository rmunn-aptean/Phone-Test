Ext.define('MobileBI.view.DashboardCanvas', {
    extend: 'Ext.Container',
    xtype: 'dashboardcanvas',
    requires: [
        'Ext.TabPanel'
    ],
    config: {
        listeners: [{
            delegate: '#dashboardTabbar',
            event: 'activeitemchange',
            fn: 'updateQvIFrame'
        }]
    },

    initialize: function() {
        var cd = MobileBI.util.Config.getCurrentDashboard();
        var mitems = [];
        if (cd > -1) {
            var config = MobileBI.util.Config.getBiConfig();
            var conf = config[cd];
            if (conf['sheets'] !== null) {
                for (var i = 0; i < conf['sheets'].length; i++) {
                    var shc = conf['sheets'][i];
                    var iid = '' + i;
                    mitems.push({title: shc.sheetname, iconCls: shc.icon, itemId: iid });
                }
            }
        }
        
        this.setItems([ 
             {
                 id: 'qvIFrameComp',
                 xtype: 'container',
                 html: ''
             },
             {
                id: 'dashboardTabbar',
                xtype: 'tabpanel',
                docked: 'bottom',
                height: 55,
                tabBarPosition: 'bottom',
                items: mitems
             }
        ]);
        this.callParent(arguments);
        
        Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, { buffer: 50 });
        this.updateQvIFrame();
    },
            
    handleOrientationChange: function (t, o, w, h) {
        this.updateQvIFrame();
    },

    updateQvIFrame: function(obj, v) {
        var cd = MobileBI.util.Config.getCurrentDashboard();
        if (cd < 0) {
            return;
        }

        var tabId = '';
        if (this.down("#dashboardTabbar").getActiveItem() !== 0) {
            if (v === undefined) {
                tabId = this.down("#dashboardTabbar").getActiveItem().getItemId();
            } else {
                tabId = v.getItemId();
            }
        }
        var orientation = Ext.Viewport.getOrientation();
        var sheet = null;
        
        var config = MobileBI.util.Config.getBiConfig();
        var conf = config[cd];
        
        var reloadOnOrientationChange = true;
        if ((conf['sheets'] !== null) && (conf['sheets'] !== '')) {
            if (conf['sheets'][tabId] !== undefined) {
                sheet = conf['sheets'][tabId][orientation];
                if (conf['sheets'][tabId]['landscape'] == conf['sheets'][tabId]['portrait']) {
                    reloadOnOrientationChange = false;
                }
            }
        }
        
        console.log("Sheet for " + tabId + "/" + orientation + ": " + sheet);

        var html_filename = "mobile_opendoc_no_tabs.htm";
        if (sheet === null) {
            html_filename = "mobile_opendoc_tabs.htm";
        } 
        
        var qvurl = 'http://67.220.100.42/QvAjaxZfc/' + html_filename + '?document=' + conf.file;

        // If we are not loading the app via the public external IP, use the
        // internal hostname for the QlikView server.
        if (window.location.host.indexOf('67.220') === -1) {
            qvurl = 'http://dga1app01acptbi.prod.lclad.com/QvAjaxZfc/' + html_filename + '?document=' + conf.file;
        }
        
        if (sheet !== null) {
            qvurl = qvurl + '&sheet=' + sheet;
        }

        var qvIF = this.down("#qvIFrameComp");
        if (qvIF.getHtml() === '') {
            qvIF.setHtml('<iframe id="qvIFrame" width="1024" height="1024" scrolling=no style="overflow-y: hidden;" seamless="seamless" src="' + qvurl + '" />');
        } else if (sheet !== null) {
            if ((reloadOnOrientationChange) && (obj !== null)) {
                document.getElementById('qvIFrame').src = qvurl;
            }
        }
    }

});
