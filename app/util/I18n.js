Ext.define('MobileBI.util.I18n', {
    singleton : true,

    config : {
    	defaultLanguage : 'en',
        browserLanguage : 'en', 
        translations : {
        	'en' : {
        		'title' : 'Mobile BI',
                        'login_username' : 'Username',
                        'login_password' : 'Password',
                        'login_site' : 'Site',
                        'login_button_log_in' : 'Log In',
                        'invalid_password' : 'Invalid Password',
                        'please_enter_username_password' : 'Please enter your username and password.',
                        'signing_in' : 'Signing In...',
                        'loading_config' : 'Loading Configuration'
                                
                },
        	'fr' : {
        		'title' : 'Bonjour!',
                        'login_username' : 'Nom d\'utilisateur',
                        'login_password' : 'Mot de passe',
                        'login_site' : 'Serveur',
                        'login_button_log_in' : 'Connexion',
                        'invalid_password': 'Mot de passe invalide',
                        'please_enter_username_password' : 'Entrez votre nom d\'utilisateur et mot de passe.',
                        'signing_in' : 'Connexion...',
                        'loading_config' : 'Chargement de la Configuration'
        	},
        	'de' : {
        		'title' : 'Willkommen!',
                        'login_username' : 'Benutzername',
                        'login_password' : 'Passwort',
                        'login_site' : 'Server',
                        'login_button_log_in' : 'Anmelden'
        	}
        }
    },

    constructor: function(config) {
        this.initConfig(config);
        this.callParent([config]);
        var browserLanguage = window.navigator.userLanguage || window.navigator.language;
        this.setBrowserLanguage(browserLanguage.slice(0,2));
    },
    
    translate: function (key) {
    	
    	// Get browser language
    	var browserLanguage = this.getBrowserLanguage();
    	
    	// Is it defined ? if not : use default
    	var language = this.getTranslations()[browserLanguage] === undefined ? this.getDefaultLanguage() : browserLanguage;
//    	console.log("language = " + browserLanguage);
    	// Translate
    	var translation = "[" + key + "]";
    	if (this.getTranslations()[language][key] === undefined) {
    		// Key not found in language : tries default one
    		if (this.getTranslations()[this.getDefaultLanguage()][key] !== undefined) {
    			translation = this.getTranslations()[this.getDefaultLanguage()][key];
    		} else {
                     var i18n = MobileBI.util.Config.getI18n();
                     if  (i18n.hasOwnProperty(key)) {
                         translation = i18n[key];
                     }
                }
    	} else {
    		// Key found
    		translation = this.getTranslations()[language][key];
    	}
    	
    	// If there is more than one argument : format string
    	if (arguments.length > 1) {
    	    var tokenCount = arguments.length - 2;
            for( var token = 0; token <= tokenCount; token++ )
    	    {
    	    	translation = translation.replace( new RegExp( "\\{" + token + "\\}", "gi" ), arguments[ token + 1 ] );
    	    }
    	}
    	return translation;
    }
});