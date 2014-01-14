Ext.define('MobileBI.util.TemplateHelpers', {
  singleton: true,
 
  requires: [
      'MobileBI.util.Config'
  ],
 
  config: {
    helpers: {
        i18n: function(token) {
            if ((token === null) || (token.length === 0)) {
                return '';
            }
            var i18n = MobileBI.util.Config.getI18n();
            
            if  (i18n.hasOwnProperty(token)) {
                return i18n[token];
            } else {
                return '[' + token + ']';
            }
        },
        getViewConfig: function(viewName) {
            return MobileBI.util.Config.getViewConfig()[viewName];
        },
        resolve: function(prop, parent) {
            var props = prop.split(".");
            var p = parent;
                for (var i = 0; i < props.length; i++) {
                    if (p.hasOwnProperty(props[i])) {
                        p = p[props[i]];
                    } else {
                        break;
                    }
                }
                return p;
            }
       }
  },
 
  constructor: function(config) {
    this.initConfig(config);
    return this;
  }
 
});
