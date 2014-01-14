Ext.define('MobileBI.controller.LoginController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginView: 'loginview',
            menupanel: 'menupanel',
            appCanvas: 'appcanvas',
            menuitems: 'menuitems'
        },
        control: {
            loginView: {
                signInCommand: 'onSignInCommand'
            },
            menupanel: {
                logOff: 'logOffCommand'
            }
        }
    },
    
    onSignInCommand: function (view, server, username, password) {
        console.log('Server: ' + server + '\nUsername: ' + username + '\nPassword: ' + password);
        var me = this,
            loginView = me.getLoginView();

        if (username.length === 0 || password.length === 0) {
            loginView.showSignInFailedMessage(MobileBI.util.I18n.translate('please_enter_username_password'));
            return;
        }

        loginView.setMasked({
             xtype: 'loadmask',
             message: MobileBI.util.I18n.translate('signing_in')
        });

        Ext.Ajax.request({
            url: server + '/auth',
            method: 'get',
            useDefaultXhrHeader: false,
            params: {
                username: username,
                password: password
            },
            success: function (response) {

                var loginResponse = Ext.JSON.decode(response.responseText);

                if (loginResponse.success === true) {
                    // The server will send a token that can be used throughout the app to confirm that the user is authenticated.
                    me.sessionToken = loginResponse.sessionId;
                    me.signInSuccess();     //Just simulating success.
                    me.loadConfiguration(server);
                } else {
                    me.signInFailure(MobileBI.util.I18n.translate('invalid_password'));
                }
            },
            failure: function (response) {
                me.sessionToken = null;
                me.signInFailure(MobileBI.util.I18n.translate('invalid_password') + '.');
            }
        });
    },
               
    signInSuccess: function () {
        console.log('Signed in.');
        var loginView = this.getLoginView();
        loginView.setMasked(false);
    },
            
    signInFailure: function (message) {
        var loginView = this.getLoginView();
        loginView.showSignInFailedMessage(message);
        loginView.setMasked(false);
    },
            
    initQlikViewConfig: function() {
        var me = this;
        
        console.log("Calling: " + 'http://67.220.100.42/QvAjaxZfc/authenticate.aspx?type=html&try=/QvAjaxZfc/success.html&back=/LoginPage.htm&webticket=' + MobileBI.util.Config.getQVTicket());
        
        Ext.Ajax.request({
            url: 'http://67.220.100.42/QvAjaxZfc/authenticate.aspx?type=html&try=/QvAjaxZfc/success.html&back=www.boston.com&webticket=' + MobileBI.util.Config.getQVTicket(),
            method: 'get',
            useDefaultXhrHeader: false,
            disableCaching: false,
            withCredentials: true,
//            params: {
//                sessionId: me.sessionToken
//            },
            success: function (response) {
                console.log(response.responseText);
                console.log('QlikView authentication Successful!');
                
                me.getAppCanvas().add({xtype: 'sessioncanvas'});
                me.getMenuitems().refresh();
                me.getAppCanvas().setActiveItem(1);
                me.getLoginView().setMasked(false);
            },
            failure: function (response) {
                me.sessionToken = null;
                me.signInFailure('Failed to authenticate with QlikView.');
                loginView.setMasked(false);
            }
        });
        
    },
            
    loadConfiguration: function (server) {
        console.log('Loading config...');
        var me = this,
            loginView = me.getLoginView();

        loginView.setMasked({
             xtype: 'loadmask',
             message: MobileBI.util.I18n.translate('loading_config')
        });

        Ext.Ajax.request({
            url: server + '/config/' + MobileBI.util.I18n.getBrowserLanguage() + '/' + Ext.os.deviceType,
            method: 'get',
            useDefaultXhrHeader: false,
            params: {
                sessionId: me.sessionToken
            },
            success: function (response) {
                MobileBI.util.Config.mergeConfig(Ext.JSON.decode(response.responseText));
                console.log('Config loaded!');
                if (false && (MobileBI.util.Config.getQVTicket() !== '')) {
                    me.initQlikViewConfig();
                } else {
                    me.getAppCanvas().add({xtype: 'sessioncanvas'});
                    me.getMenuitems().refresh();
                    me.getAppCanvas().setActiveItem(1);
                }
                var mstore = Ext.getStore("MenuStore");
                if (mstore !== undefined) {
                    mstore.recalcData();
                }
                loginView.setMasked(false);
            },
            failure: function (response) {
                me.sessionToken = null;
                me.signInFailure('Failed to retreive app configuration. Please try again later.');
            }
        });
    },



    logOffCommand: function () {

        var me = this;
        console.log("Logging off - phase 2");

         var store = Ext.getStore("JobOrdersSearch");
         if (store !== undefined) {
             store.setData([]);
         }
         Ext.Ajax.request({
            url: MobileBI.util.Config.getSessionServiceUrl() + '/logoff',
            method: 'get',
            useDefaultXhrHeader: false,
            params: {
                sessionToken: me.sessionToken
            },
            success: function (response) {
                // TODO
            },
            failure: function (response) {
                // TODO 
            }
        });
        this.getAppCanvas().setActiveItem(0);
        me.getAppCanvas().destroySessionCanvas();
   }    
    
    
});