Ext.define('MobileBI.util.I18nContainer', {
    extend: 'Ext.Container',
    xtype: 'i18ncontainer',
    initialize: function() {
        this.callParent();
        this.setData(MobileBI.util.Config.getI18n());
    }
});

