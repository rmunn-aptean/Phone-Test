Ext.define('MobileBI.controller.MainController', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            loginButton: '#loginButton',
            appCanvas: 'appcanvas',
            menupanel: 'menupanel',
            qvButton: '#qvButton',
            qvIFrame: '#qvIFrame'
        },
        control: {
            'menuitems': {
                itemtap:  'selectScreen'
            },
            'qvButton': {
                 tap: 'initQV'
            }
        }
    },

    doLogin: function(a, b, c, record) {
        this.getAppCanvas().setActiveItem(1);
    }
    
});