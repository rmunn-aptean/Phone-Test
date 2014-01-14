Ext.define('MobileBI.util.Config', {
  singleton: true,
 
  config: {
    loggedIn: false,
    i18n: [],
    features: [],
    baseServiceUrl: "",
    sessionServiceUrl: "",
    sessionId: "",
    QVTicket: "",
    dashboardEnabled: "Yes",
    biConfig: [],
    currentDashboard: -1
  },
 
  constructor: function(config) {
    this.initConfig(config);
    return this;
  },
 
  isWebApp: function() {
    if(document.URL.indexOf('http') !== -1) {
      return true;
    }
    return false;
  },
          
  mergeConfig: function(c) {
      this.setI18n(c.i18n);
      this.setQVTicket(c.QVTicket);
      this.setBiConfig(c.biConfig);
  },
          
  featureEnabled: function(featureName) {
      var features = this.getFeatures();
      return (features.hasOwnProperty(featureName) && (features[featureName] === true));
  }       
});


