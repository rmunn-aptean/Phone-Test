Ext.define('MobileBI.model.MenuItem', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
                {name: 'DisplayName',  type: 'string'},
                {name: 'DisplayNameToken',  type: 'string'},
                {name: 'Visible',  type: 'string'},
                {name: 'xtype', type: 'string' },
                {name: 'event', type: 'string' }
            ]
    }
});


