const HttpProxyRules = require("http-proxy-rules");

class proxyRulesManager {
    constructor() {
      this.proxyRules;
      this.rules = {};
      this.resetProxyRule();
    }
  
    get getProxyRules() {
      return this.proxyRules;
    }
  
    get getRules() {
        return this.rules
    }
  
    setProxyRule(body) {
      this.rules = Object.assign({}, this.rules, { [body.rule]: body.dest });
      this.updateProxyRule();
    }
  
    updateProxyRule() {
      this.proxyRules = new HttpProxyRules({ rules: this.rules });
    }
  
    resetProxyRule() {
      this.rules = {};
      this.updateProxyRule();
    }
  
    deleteProxyRule(ruleObj) {
      delete this.rules[ruleObj.rule];
      this.updateProxyRule();
    }
  }

  module.exports = proxyRulesManager