Ext.define('MobileBI.view.MenuItems', {
    extend: 'Ext.List',
    xtype: 'menuitems',
    requires: ['MobileBI.util.Config'],
    
    config: {
        itemTpl: new Ext.XTemplate('{DisplayNameToken:this.i18n(values.DisplayName)}',  
            {
                i18n: function(token, defaultValue) {
                    if ((token === null) || (token.length === 0)) {
                        return defaultValue;
                    }
                    var i18n = MobileBI.util.Config.getI18n();

                    if  (i18n.hasOwnProperty(token)) {
                        return i18n[token];
                    } else {
                        return '[' + token + ']';
                    }
                }
            }),

        title: 'Menu',
        store: 'MenuStore',
        allowDeselect: false,
        singleSelect: true,
        width: 200,
        height: 280
    }
});

