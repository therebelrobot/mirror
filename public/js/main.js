// Localstorage helper

var _ls = {
  comp: function () {
    if (!window.localStorage) {
      window.localStorage = {
        getItem: function (sKey) {
          if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
          return unescape(document.cookie.replace(new RegExp('(?:^|.*;\\s*)' + escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'), '$1'))
        },
        key: function (nKeyId) {
          return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, '').split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId])
        },
        setItem: function (sKey, sValue) {
          if (!sKey) { return; }
          document.cookie = escape(sKey) + '=' + escape(sValue) + '; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/'
          this.length = document.cookie.match(/\=/g).length
        },
        length: 0,
        removeItem: function (sKey) {
          if (!sKey || !this.hasOwnProperty(sKey)) { return; }
          document.cookie = escape(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
          this.length--
        },
        hasOwnProperty: function (sKey) {
          return (new RegExp('(?:^|;\\s*)' + escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
        }
      }
      window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length
    }
  },
  getAll: function () {
    var allKeys = Object.keys(localStorage)
    return allKeys
  },
  exists: function (key) {
    var allKeys = _ls.getAll()
    if (allKeys.indexOf(key) > -1) {
      return true
    } else {
      return false
    }
  },
  retrieve: function (key) {
    if (_ls.exists(key)) {
      var results = localStorage.getItem(key)
      console.log('SUCCESS: ', key, ' retrieved from localStorage', 'ls')
      return results
    } else {
      console.log('FAILED: ', key, ' does not exist in localStorage', 'ls')
      return false
    }
  },
  write: function (key, str) {
    if (!_ls.exists(key)) {
      localStorage.setItem(key, str)
      console.log('SUCCESS: stored ', key, ' in localStorage', 'ls')
    } else {
      console.log('FAILED: ', key, ' already exists. Please remove before continuing', 'ls')
      return false
    }
  },
  remove: function (key) {
    if (_ls.exists(key)) {
      localStorage.removeItem(key)
      console.log('SUCCESS: ', key, ' removed from localStorage', 'ls')
      return true
    } else {
      console.log('FAILED: ', key, ' does not exist in localStorage', 'ls')
      return false
    }
  }
}

// Application logic

$(document).ready(function () {
  _ls.comp()
  // Grab url parameters and save in localstorage
  var url = window.location.href
  params = {
    source:'',
    target:''
  }
  var paramsToLocalhost = false
  var JSONparams
  if (url.indexOf('?') > -1) {
    var tmpParams = url.split('?')[1]
    if (tmpParams.indexOf('&') > -1) {
      tmpParams = tmpParams.split('&')
    } else {
      tmpParams = [tmpParams]
    }
    console.log(tmpParams)
    tmpParams = _.map(tmpParams, function (param) {
      var newParam = {}
      param = param.split('=')
      newParam.key = param[0]
      newParam.value = param[1]
      return newParam
    })
    _.forEach(tmpParams, function (param) {
      params[param.key] = param.value
    })
    JSONparams = JSON.stringify(params)
    _ls.write('mirror-params', JSONparams)
    paramsToLocalhost = true
  }
  // retrieve/clear params from localstorage
  if (_ls.exists('mirror-params') && !paramsToLocalhost) {
    JSONparams = _ls.retrieve('mirror-params')
    params = JSON.parse(JSONparams)
    _ls.remove('mirror-params')
  }
  window.vm = new Vue({
    el: '#vue-app',
    data: {
      params: params
    }
  })
})
