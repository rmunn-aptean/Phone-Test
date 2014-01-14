Ext.define('MobileBI.view.LoginView', {
    extend: 'Ext.form.Panel',
    xtype: 'loginview',
    requires: [
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.Button',
        'Ext.field.Select',
        'Ext.Label',
        'Ext.util.DelayedTask'],
    style: 'background-color: #fffff;',
    config: {
        layout : {
            type  : 'vbox',
            pack  : 'center',
            align : 'middle'
        },
        scrollable: null,
        listeners: [{
            delegate: '#loginButton',
            event: 'tap',
            fn: 'onLogInButtonTap'
        }]
    },
    initialize: function() {
        this.setItems([
            {
                xtype: 'component',
                itemId: 'header',
                html: '<div id="loadingApteanLogo"></div>',
                style: 'border-bottom: 2px solid #df1e36; padding-bottom: 3px;',
                width: 300
            },{
                xtype: 'component',
                itemId: 'header2',
                html: '<div id="mobileBIImage"></div>',
                style: 'text-align: right',
                align: 'right',
                width: 300
            },{
                xtype: 'label',
                html: 'Login failed. Please enter the correct credentials.',
                itemId: 'signInFailedLabel',
                hidden: true,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style: 'color:#df1e36; font-size: 80%; margin:5px 0px;'
            }, {
                xtype: 'emailfield',
                name: 'email',
                itemId: 'usernamePrompt',
                label: MobileBI.util.I18n.translate('login_username'),
                labelWidth: '40%',
                labelCls: 'mmLoginLabel',
                width: 300
            }, {
                xtype: 'passwordfield',
                name: 'password',
                itemId: 'passwordPrompt',
                label: MobileBI.util.I18n.translate('login_password'),
                labelWidth: '40%',
                labelCls: 'mmLoginLabel',
                width: 300
            }, {
                xtype: 'button',
                id: 'loginButton',
                text: MobileBI.util.I18n.translate('login_button_log_in'),
                padding: '8px',
                style: 'font-size: 80%; background-color: #f7f7f7;',
                width: 300
            }]);
        this.callParent(arguments);
    },
               
    onLogInButtonTap: function () {
        var me = this;
        var usernameField = me.down('#usernamePrompt'),
            passwordField = me.down('#passwordPrompt'),
            label = me.down('#signInFailedLabel');

        label.hide();

        var username = usernameField.getValue(),
            password = passwordField.getValue();
  
        var server = 'http://' + window.location.host + '/bi/v1';
         
        // If we are not loading the app via the public external IP, use the
        // internal hostname for the web services server.
        if (window.location.host.indexOf('67.220') === -1) {
            server = 'http://dga1dbs01mobm2m.prod.lclad.com/bi/v1';
        }
        
        MobileBI.util.Config.setSessionServiceUrl(server);

        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task = Ext.create('Ext.util.DelayedTask', function () {
            label.setHtml('');
            me.fireEvent('signInCommand', me, server, username, password);
            usernameField.setValue('');
            passwordField.setValue('');
        });

        task.delay(500);
    },
           
    showSignInFailedMessage: function (message) {
        var label = this.down('#signInFailedLabel');
        label.setHtml(message);
        label.show();
    }

});