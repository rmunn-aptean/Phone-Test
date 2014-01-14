Ext.define('MobileBI.view.SessionCanvas', {
    extend: 'Ext.Container',
    xtype: 'sessioncanvas',
    requires: [
        'MobileBI.view.DashboardCanvas',
        'MobileBI.view.Menu'
    ],
    config: {
        layout: 'fit'
    },
    initialize: function() {
        this.setItems([
            {
            xtype: 'toolbar',
            docked: 'top',
            title: MobileBI.util.I18n.translate('app_title'), 
            items: [ 
                {
                    xtype: 'button',
                    id: 'backButton',
                    ui: 'back',
                    text: 'Back',
                    hidden: true,
                    showAnimation: 'fade',
                    hideAnimation: 'fadeOut'
                },
                {
                    xtype: 'button',
                    id: 'menuButton',
                    iconCls: 'list',
                    right: '0',
                    handler: function() {
                        Ext.Viewport.toggleMenu('right');
                    }
                }
            ]
            },
            {
                 xtype: 'dashboardcanvas'
            }
        ]);
        
        
        var items = [];
        var biConfig = MobileBI.util.Config.getBiConfig();
        var me = this;
        
        for (var i = 0; i < biConfig.length; i++) {
            var dbid = i;
            items.push({    text: biConfig[i].name,
                            itemId: 'db_' + dbid,
                            biConfigId: dbid,
                            scope: this,
                            handler: function(o, e, e2) { 
                               Ext.Viewport.hideMenu('right');
                               MobileBI.util.Config.setCurrentDashboard(o.config.biConfigId);
                               me.remove(this.getInnerItems()[0], true);
                               me.add({xtype: 'dashboardcanvas'});
                            } 
                         });
        }
        var menu = Ext.create('Ext.Menu', { items: items });
        Ext.Viewport.setMenu(menu, { side: 'right', reveal: true});
        Ext.Viewport.showMenu('right');
        this.callParent(arguments);
    }
});
