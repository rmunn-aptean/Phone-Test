Ext.define('MobileBI.view.AppCanvas', {
    extend: 'Ext.Container',
    xtype: 'appcanvas',
    requires: [
        'MobileBI.view.LoginView',
        'MobileBI.view.SessionCanvas'
    ],
    config: {
        layout: 'card',
        items: [
            { xtype: 'loginview' }
        ]
    },
    destroySessionCanvas: function() {
        this.remove(this.getInnerItems()[1], true);
    }
});
