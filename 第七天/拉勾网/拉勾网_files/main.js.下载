define('emitter/emitter', [], function () {
    function Emitter() {
    }
    var proto = Emitter.prototype;
    proto._getEvents = function () {
        if (!this._events) {
            this._events = {};
        }
        return this._events;
    };
    proto._getMaxListeners = function () {
        if (isNaN(this.maxListeners)) {
            this.maxListeners = 10;
        }
        return this.maxListeners;
    };
    proto.on = function (event, listener) {
        var events = this._getEvents();
        var maxListeners = this._getMaxListeners();
        events[event] = events[event] || [];
        var currentListeners = events[event].length;
        if (currentListeners >= maxListeners && maxListeners !== 0) {
            throw new RangeError('Warning: possible Emitter memory leak detected. ' + currentListeners + ' listeners added.');
        }
        events[event].push(listener);
        return this;
    };
    proto.once = function (event, listener) {
        var me = this;
        function on() {
            me.off(event, on);
            listener.apply(this, arguments);
        }
        on.listener = listener;
        this.on(event, on);
        return this;
    };
    proto.off = function (event, listener) {
        var events = this._getEvents();
        if (0 === arguments.length) {
            this._events = {};
            return this;
        }
        var listeners = events[event];
        if (!listeners) {
            return this;
        }
        if (1 === arguments.length) {
            delete events[event];
            return this;
        }
        var cb;
        for (var i = 0; i < listeners.length; i++) {
            cb = listeners[i];
            if (cb === listener || cb.listener === listener) {
                listeners.splice(i, 1);
                break;
            }
        }
        return this;
    };
    proto.emit = function (event) {
        var events = this._getEvents();
        var listeners = events[event];
        var args = Array.prototype.slice.call(arguments, 1);
        if (listeners) {
            listeners = listeners.slice(0);
            for (var i = 0, len = listeners.length; i < len; i++) {
                listeners[i].apply(this, args);
            }
        }
        return this;
    };
    proto.listeners = function (event) {
        var events = this._getEvents();
        return events[event] || [];
    };
    proto.setMaxListeners = function (number) {
        this.maxListeners = number;
        return this;
    };
    Emitter.mixin = function (obj) {
        for (var key in Emitter.prototype) {
            obj[key] = Emitter.prototype[key];
        }
        return obj;
    };
    return Emitter;
});

define('emitter', ['emitter/emitter'], function ( main ) { return main; });

define('storage/storage', ['require'], function (require) {
    var isSupportLocalStorage;
    var stringify;
    var parse;
    var storage;
    var STORAGE_ID = '_SABER';
    var EVENT = { OUT_OF_LIMIT: 'Out of space limit' };
    isSupportLocalStorage = function () {
        try {
            var support = 'localStorage' in window && window['localStorage'] !== null;
            var test = {
                    k: 'test key',
                    v: 'test value'
                };
            if (support) {
                localStorage.setItem(test.k, test.v);
                support = test.v === localStorage.getItem(test.k);
                localStorage.removeItem(test.k);
            }
            return support;
        } catch (e) {
            return false;
        }
    }();
    stringify = function (v) {
        return JSON.stringify(v);
    };
    parse = function (v) {
        try {
            v = JSON.parse(v);
        } catch (e) {
        }
        return v;
    };
    storage = {
        data: {},
        setItem: function (k, v) {
            this.data[k] = v;
        },
        getItem: function (k) {
            return this.data[k];
        },
        removeItem: function (k) {
            delete this.data[k];
        }
    };
    var SimpleEmitter = function () {
    };
    SimpleEmitter.prototype = {
        on: function (event, listener) {
            if (typeof listener !== 'function') {
                return;
            }
            var events = this.events || (this.events = {});
            events[event] = events[event] || [];
            events[event].push(listener);
            return this;
        },
        emit: function (event) {
            var events = this.events || (this.events = {});
            var listeners = events[event];
            var args = Array.prototype.slice.call(arguments, 1);
            if (listeners) {
                listeners = listeners.slice(0);
                for (var i = 0, len = listeners.length; i < len; i++) {
                    listeners[i].apply(this, args);
                }
            }
            return this;
        }
    };
    SimpleEmitter.mixin = function (obj) {
        var keys = Object.keys(SimpleEmitter.prototype);
        keys.forEach(function (key) {
            obj[key] = SimpleEmitter.prototype[key];
        });
        return obj;
    };
    var LocalStorage = function (options) {
        options = options || {};
        this.storageId = options.storageId || STORAGE_ID;
        this.memoryCache = !!options.memoryCache;
        this.storage = isSupportLocalStorage && !this.memoryCache ? window.localStorage : storage;
    };
    LocalStorage.Event = LocalStorage.prototype.Event = EVENT;
    LocalStorage.prototype = {
        isSupport: function () {
            return isSupportLocalStorage;
        },
        setItem: function (key, val) {
            var data = this._getData();
            data[key] = val;
            try {
                localStorage.setItem(this.storageId, stringify(data));
                return true;
            } catch (err) {
                this.emit(EVENT.OUT_OF_LIMIT, err);
                return false;
            }
        },
        getItem: function (key) {
            return this._getData()[key];
        },
        removeItem: function (key) {
            var data = this._getData();
            delete data[key];
            this.storage.setItem(this.storageId, stringify(data));
        },
        clear: function () {
            this.storage.removeItem(this.storageId);
        },
        key: function () {
            return Object.keys(this._getData());
        },
        _getData: function () {
            var data = this.storage.getItem(this.storageId);
            return data ? parse(data) : {};
        }
    };
    SimpleEmitter.mixin(LocalStorage.prototype);
    return LocalStorage;
});

define('storage', ['storage/storage'], function ( main ) { return main; });

define('common/js/config', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    var protocol = window.location.protocol;
    var ctx = protocol + '//www.lagou.com';
    var sctx = protocol + '//suggest.lagou.com';
    var mctx = protocol + '//m.lagou.com';
    module.exports = {
        debug: false,
        title: '\u62C9\u52FE\u7F51',
        titleCustom: '\u8BBE\u7F6E\u5B9A\u5236\u4FE1\u606F',
        titleComDetail: '\u516C\u53F8\u804C\u4F4D',
        titleMineCollect: '\u6211\u7684\u6536\u85CF',
        titleJobDetail: '\u804C\u4F4D\u8BE6\u60C5',
        titleInterview: '\u6211\u7684\u9762\u8BD5',
        host: mctx,
        footertab: [
            {
                name: '\u804C\u4F4D',
                type: 'custom',
                target: '/'
            },
            {
                name: '\u641C\u7D22',
                type: 'search',
                target: '/search.html'
            },
            {
                name: '\u6211\u7684',
                type: 'mine',
                target: '/user/mine.html'
            }
        ],
        wholecountry: '\u5168\u56FD',
        cityholder: '&nbsp;',
        pageSize: 15,
        url: {
            404: '/404.html',
            login: FRONT_LOGIN,
            logout: FRONT_LOGOUT,
            collect: '/weixincollect/jobtitle/list.html',
            deliver: '/weixinResume/resumeDealStatus.html',
            resume: '/user/preview.html',
            customList: '/',
            customPosition: '/position.html',
            customCity: '/city.html',
            customSalary: '/salary.html',
            customStages: '/stages.html',
            positionName: '/position.html',
            city: '/city.html',
            salary: '/salary.html',
            stages: '/stages.html',
            customMine: '/mine.html',
            go2Jobs: '/jobs/',
            go2Company: '/gongsi/',
            deliverdetail: '/user/deliverdetail.html',
            intervieweval: '/interviewEval.html',
            openplus: '/minvite/invitation.html',
            search: '/search.json',
            customlistmore: '/listmore.json',
            positionls: sctx + '/suggestion',
            saveposition: '/saveposition.json',
            savecity: '/savecity.json',
            savesalary: '/savesalary.json',
            savestages: '/savestages.json',
            saveforsearch: '/savebs.json',
            comdetail: '/user/companyjobs.json',
            collectlistmore: '/user/collectlistMore.json',
            collectjson: '/user/collect.json',
            cancelcollectjson: '/user/cancelcollect.json',
            isCanOneKeyDeliver: '/mycenter/isCanOneKeyDeliver.json',
            oneKeyDeliver: '/mycenter/oneKeyDeliver.json',
            deliverresumev2: '/user/oneKeyDeliverResume.json',
            deliverlistmore: '/user/deliverlistMore.json',
            deliverresume: '/user/deliverResume.json',
            setdefaultresume: '/user/setDefaultResume.json',
            confirmresumes: '/user/confirmResumes.json',
            interviewevallistmore: '/interview/experience/byPosition.json',
            interlistmaore: '/minterview/interviewlistMore.json',
            openpluslistmore: '/minvite/invitationMore.json',
            addshieldemail: '/minvite/saveShieldEmailSuffix.json',
            delshieldemail: '/minvite/deleteShieldEmailSuffix.json',
            opencloseplus: '/minvite/openMyResume.json',
            saveInterviewExp: '/mycenter/createInterviewExperience.json',
            confirmOfferReceive: '/mycenter/receiveOffer.json'
        },
        hotWords: [
            '\u4EA7\u54C1\u7ECF\u7406',
            'Java',
            '\u8FD0\u8425',
            'Android',
            'PHP',
            'UI',
            'IOS',
            '\u7F16\u8F91',
            'BD'
        ],
        placeholder: { custompos: '\u8F93\u5165\u4F60\u60F3\u5B9A\u5236\u7684\u804C\u4F4D' },
        customArr: [
            'positionName',
            'city',
            'salary',
            'stages'
        ],
        customMap: {
            positionName: '\u804C\u4F4D\u7C7B\u578B',
            city: '\u5DE5\u4F5C\u5730\u70B9',
            salary: '\u671F\u671B\u85AA\u6C34',
            stages: '\u516C\u53F8\u89C4\u6A21'
        }
    };
});

define('common/util/helper', [
    'require',
    'exports',
    'module',
    'common/js/config'
], function (require, exports, module) {
    var config = require('common/js/config');
    template.helper('dateFormat', function (date, format) {
        date = new Date(parseInt(date));
        var map = {
                'M': date.getMonth() + 1,
                'd': date.getDate(),
                'h': date.getHours(),
                'm': date.getMinutes(),
                's': date.getSeconds(),
                'q': Math.floor((date.getMonth() + 3) / 3),
                'S': date.getMilliseconds()
            };
        format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            } else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    });
    template.helper('appendHost', function (url) {
        return config.host + '/' + url;
    });
    template.helper('mathFloor', function (numStr) {
        return Math.floor(parseFloat(numStr));
    });
    module.exports = {};
});

define('common/util/out', [
    'require',
    'exports',
    'module',
    'common/js/config'
], function (require, exports, module) {
    var config = require('common/js/config');
    module.exports = {
        tip: function () {
            if (!config.debug)
                return;
            var method = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);
            console[method].apply(console, args);
        }
    };
});

define('common/util/sets', [
    'require',
    'exports',
    'module',
    'common/js/config'
], function (require, exports, module) {
    var config = require('common/js/config');
    var trimRegExp = function (text) {
        return text.replace(/([\.\?\+\*\^\(\)\\\{\}\$\/])/g, '\\$1');
    };
    module.exports = {
        trimRegExp: trimRegExp,
        isMineOrChildOf: function (target, selector) {
            if (target.filter(selector).length > 0)
                return true;
            return target.closest(selector).length > 0;
        },
        highlights: function (selector, words) {
            typeof words == 'string' && (words = [words]);
            $(selector).each(function () {
                var target = $(this);
                var text = target.html();
                $.each(words, function (index, value) {
                    if (value == '')
                        return;
                    value = trimRegExp(value.toLowerCase());
                    var reg = new RegExp('(' + value + ')', 'gi');
                    reg.test(text) && target.html(target.html().replace(reg, '<em class="hl">$1</em>'));
                });
            });
        },
        inherit: function (child, fatherconstructor, methods) {
            child.prototype = $.extend(new fatherconstructor(), methods);
            child.prototype.constructor = child;
            child.prototype.supertoucher = function () {
                var _super = new fatherconstructor();
                return function (method, args, context) {
                    if (!method)
                        return;
                    args || (args = []);
                    _super[method] && _super[method].apply(context || this, args);
                };
            }();
        },
        inWeixin: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        },
        throttle: function (method, args, context, delay) {
            context = context == undefined ? null : context;
            method.tId && clearTimeout(method.tId);
            method.tId = setTimeout(function () {
                method.apply(context, args);
            }, delay ? delay : 140);
        },
        isSet: function (v) {
            return !!v && v != 'null' && v != 'undefined';
        },
        reflow: function () {
            window.setTimeout(function () {
                document.body.style.display = 'none';
                document.body.offsetHeight;
                document.body.style.display = '';
            }, 0);
        },
        random: function (start) {
            return start + Math.floor(Math.random() * 100000);
        }
    };
});

define('common/components/base/main', [
    'require',
    'exports',
    'module',
    'emitter'
], function (require, exports, module) {
    var emitter = require('emitter');
    var AbstractConstructor = function (opt) {
        for (var key in opt) {
            this[key] = opt[key];
        }
        this.init();
    };
    AbstractConstructor.prototype = {
        constructor: AbstractConstructor,
        init: function () {
        },
        show: function () {
            var me = this;
            me.container && me.container.show();
            return me;
        },
        hide: function () {
            var me = this;
            me.container && me.container.hide();
            return me;
        }
    };
    module.exports = AbstractConstructor;
});

define('common/components/dialog-tip/main.atpl', [], function () {
    return '<div class="dialog-tip"><div class="back"><div class="text">{{msg}}</div></div></div>';
});

define('common/components/dialog-tip/main', [
    'require',
    'exports',
    'module',
    '../base/main',
    './main.atpl'
], function (require, exports, module) {
    var Base = require('../base/main');
    var tpl = require('./main.atpl');
    var DELAY = 2500;
    var TdialogConstructor = function (opt) {
        Base.call(this, opt);
    };
    TdialogConstructor.prototype = $.extend(new Base(), {
        constructor: TdialogConstructor,
        init: function () {
            var me = this;
            me.wrapper = $(template.compile(tpl)({ msg: me.msg }));
            return me;
        },
        show: function (delay) {
            var me = this;
            $('body').append(me.wrapper);
            window.setTimeout(function () {
                me.wrapper.remove();
            }, delay || me.delay || DELAY);
            return me;
        }
    });
    module.exports = TdialogConstructor;
});

define('common/util/requester', [
    'require',
    'exports',
    'module',
    'common/util/out',
    'common/js/config',
    'common/components/dialog-tip/main'
], function (require, exports, module) {
    var out = require('common/util/out');
    var config = require('common/js/config');
    var Tip = require('common/components/dialog-tip/main');
    module.exports = {
        exec: function (options) {
            options.success = function (data, status, xhr) {
                out.tip('log', data, status, data.state);
                if (data.state != undefined) {
                    data.state += '';
                    if (data.state == 1)
                        options.succ && options.succ(data, status, xhr);
                    if (data.state == -1 || data.state != 1) {
                        !options.notip && data.state != 304 && data.message && new Tip({ msg: data.message }).show();
                        options.err && options.err(data, status, xhr);
                    }
                    if (data.state.indexOf('21') == 0) {
                        window.location.href = config.url['404'];
                    }
                    if (data.state.indexOf('32') == 0 || data.state == 304) {
                        window.location.href = config.url.login;
                    }
                } else if (data.state == undefined) {
                    options.succ && options.succ(data, status, xhr);
                }
            };
            options.error = function (xhr, errorType, error) {
                out.tip('error', errorType, error);
                options.err && options.err(xhr, errorType, error);
            };
            $.ajax(options);
        }
    };
});

(function (global, undefined) {
    'use strict';
    var factory = function (window) {
        if (typeof window.document !== 'object') {
            throw new Error('Cookies.js requires a `window` with a `document` object');
        }
        var Cookies = function (key, value, options) {
            return arguments.length === 1 ? Cookies.get(key) : Cookies.set(key, value, options);
        };
        Cookies._document = window.document;
        Cookies._cacheKeyPrefix = 'cookey.';
        Cookies._maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');
        Cookies.defaults = {
            path: '/',
            secure: false
        };
        Cookies.get = function (key) {
            if (Cookies._cachedDocumentCookie !== Cookies._document.cookie) {
                Cookies._renewCache();
            }
            return Cookies._cache[Cookies._cacheKeyPrefix + key];
        };
        Cookies.set = function (key, value, options) {
            options = Cookies._getExtendedOptions(options);
            options.expires = Cookies._getExpiresDate(value === undefined ? -1 : options.expires);
            Cookies._document.cookie = Cookies._generateCookieString(key, value, options);
            return Cookies;
        };
        Cookies.expire = function (key, options) {
            return Cookies.set(key, undefined, options);
        };
        Cookies._getExtendedOptions = function (options) {
            return {
                path: options && options.path || Cookies.defaults.path,
                domain: options && options.domain || Cookies.defaults.domain,
                expires: options && options.expires || Cookies.defaults.expires,
                secure: options && options.secure !== undefined ? options.secure : Cookies.defaults.secure
            };
        };
        Cookies._isValidDate = function (date) {
            return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
        };
        Cookies._getExpiresDate = function (expires, now) {
            now = now || new Date();
            if (typeof expires === 'number') {
                expires = expires === Infinity ? Cookies._maxExpireDate : new Date(now.getTime() + expires * 1000);
            } else if (typeof expires === 'string') {
                expires = new Date(expires);
            }
            if (expires && !Cookies._isValidDate(expires)) {
                throw new Error('`expires` parameter cannot be converted to a valid Date instance');
            }
            return expires;
        };
        Cookies._generateCookieString = function (key, value, options) {
            key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
            key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
            value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
            options = options || {};
            var cookieString = key + '=' + value;
            cookieString += options.path ? ';path=' + options.path : '';
            cookieString += options.domain ? ';domain=' + options.domain : '';
            cookieString += options.expires ? ';expires=' + options.expires.toUTCString() : '';
            cookieString += options.secure ? ';secure' : '';
            return cookieString;
        };
        Cookies._getCacheFromString = function (documentCookie) {
            var cookieCache = {};
            var cookiesArray = documentCookie ? documentCookie.split('; ') : [];
            for (var i = 0; i < cookiesArray.length; i++) {
                var cookieKvp = Cookies._getKeyValuePairFromCookieString(cookiesArray[i]);
                if (cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] === undefined) {
                    cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] = cookieKvp.value;
                }
            }
            return cookieCache;
        };
        Cookies._getKeyValuePairFromCookieString = function (cookieString) {
            var separatorIndex = cookieString.indexOf('=');
            separatorIndex = separatorIndex < 0 ? cookieString.length : separatorIndex;
            return {
                key: decodeURIComponent(cookieString.substr(0, separatorIndex)),
                value: decodeURIComponent(cookieString.substr(separatorIndex + 1))
            };
        };
        Cookies._renewCache = function () {
            Cookies._cache = Cookies._getCacheFromString(Cookies._document.cookie);
            Cookies._cachedDocumentCookie = Cookies._document.cookie;
        };
        Cookies._areEnabled = function () {
            var testKey = 'cookies.js';
            var areEnabled = Cookies.set(testKey, 1).get(testKey) === '1';
            Cookies.expire(testKey);
            return areEnabled;
        };
        Cookies.enabled = Cookies._areEnabled();
        return Cookies;
    };
    var cookiesExport = typeof global.document === 'object' ? factory(global) : factory;
    if (typeof define === 'function' && define.amd) {
        define('cookies/cookies', [], function () {
            return cookiesExport;
        });
    } else if (typeof exports === 'object') {
        if (typeof module === 'object' && typeof module.exports === 'object') {
            exports = module.exports = cookiesExport;
        }
        exports.Cookies = cookiesExport;
    } else {
        global.Cookies = cookiesExport;
    }
}(typeof window === 'undefined' ? this : window));

define('cookies', ['cookies/cookies'], function ( main ) { return main; });

define('common/components/header/tpl/leftcorner.atpl', [], function () {
    return '<div class="left"><span class="corner"></span></div>';
});

define('common/components/header/tpl/rightcorner.atpl', [], function () {
    return '<div class="right">\t<span class="corner"></span></div>';
});

define('common/components/header/tpl/righttext.atpl', [], function () {
    return '<div class="right-text">\t<a class="text" href="/user/interview/experience/rules.html">\u89C4\u5219</a></div>';
});

define('common/components/header/tpl', [
    'require',
    'exports',
    'module',
    './tpl/leftcorner.atpl',
    './tpl/rightcorner.atpl',
    './tpl/righttext.atpl'
], function (require, exports, module) {
    module.exports = {
        leftcorner: require('./tpl/leftcorner.atpl'),
        rightcorner: require('./tpl/rightcorner.atpl'),
        righttext: require('./tpl/righttext.atpl')
    };
});

define('common/components/header/main', [
    'require',
    'exports',
    'module',
    '../base/main',
    './tpl'
], function (require, exports, module) {
    var Base = require('../base/main');
    var tpl = require('./tpl');
    var HeaderConstructor = function (opt) {
        if (!opt.container)
            throw 'need container!';
        opt.title = opt.title || 'default title';
        Base.call(this, opt);
    };
    HeaderConstructor.prototype = $.extend(new Base(), {
        constructor: HeaderConstructor,
        init: function () {
            var me = this;
            me.render();
            return me;
        },
        render: function () {
            var me = this;
            me.container.text(me.title);
            if (me.leftcorner)
                me.handleLeft();
            if (me.rightcorner) {
                me.handriRight();
            }
            if (me.righttext) {
                me.handriText();
            }
            return me;
        },
        handleLeft: function () {
            var me = this;
            me.leftcornerTarget = $(tpl.leftcorner);
            me.container.append(me.leftcornerTarget);
            me.leftcornerTarget.bind('click', function () {
                me.emitter.emit('header:leftcorner', 'clickvalue');
            });
            return me;
        },
        handriRight: function () {
            var me = this;
            me.rightconrnerTarget = $(tpl.rightcorner);
            me.container.append(me.rightconrnerTarget);
            me.rightconrnerTarget.bind('click', function () {
                me.emitter.emit('header:rightcorner', 'clickvalue2');
            });
            return me;
        },
        handriText: function () {
            var me = this;
            me.righttextTarget = $(tpl.righttext);
            me.container.append(me.righttextTarget);
            me.righttextTarget.bind('click', function (e) {
                me.emitter.emit('header:righttext', 'clickvalue3');
            });
            return me;
        }
    });
    module.exports = HeaderConstructor;
});

define('common/components/footer/main.atpl', [], function () {
    return '<!--\u901A\u7528footer\u7EC4\u4EF6\u6A21\u677F@author pooky@lagou.com-->{{each tab as value i}}<div data-name="{{value.name}}" data-index="{{i}}"data-type="{{value.type}}" class="footer-tab-{{value.type}}{{value.selected}}"><span class="icon{{value.selected}}"></span><span class="text">{{value.name}}</span></div>{{/each}}';
});

define('common/components/footer/main', [
    'require',
    'exports',
    'module',
    '../base/main',
    './main.atpl'
], function (require, exports, module) {
    var Base = require('../base/main');
    var tpl = require('./main.atpl');
    var FooterConstructor = function (opt) {
        if (!opt.container)
            throw 'need container!';
        Base.call(this, opt);
    };
    FooterConstructor.prototype = $.extend(new Base(), {
        constructor: FooterConstructor,
        init: function () {
            var me = this;
            me.render().bindEvent();
            return me;
        },
        render: function () {
            var me = this;
            $.each(me.tab, function (index, value) {
                value.type == me.selected && (me.tab[index].selected = ' selected');
            });
            me.renderEngine || (me.renderEngine = template.compile(tpl));
            me.container.html(me.renderEngine(me));
            return me;
        },
        bindEvent: function () {
            var me = this;
            me.container.on('click', 'div', function () {
                var target = $(this);
                if (target.hasClass('selected'))
                    return;
                me.emitter.emit('footer:changetab', target.data('name'), target.data('type'), target.data('index'));
            });
            return me;
        }
    });
    module.exports = FooterConstructor;
});

define('common/components/list/tpl/more.atpl', [], function () {
    return '<li class="activeable list-more">\u52A0\u8F7D\u66F4\u591A</li>';
});

define('common/components/list/tpl/empty.atpl', [], function () {
    return '<li class="list-empty"><span class="icon"></span><span class="text">\u62C9\u52FE\u4E0A\u6682\u65F6\u6CA1\u6709\u8FD9\u6837\u7684\u804C\u4F4D</span></li>';
});

define('common/components/list/tpl', [
    'require',
    'exports',
    'module',
    './tpl/more.atpl',
    './tpl/empty.atpl'
], function (require, exports, module) {
    module.exports = {
        more: require('./tpl/more.atpl'),
        empty: require('./tpl/empty.atpl')
    };
});

define('common/components/list/main', [
    'require',
    'exports',
    'module',
    '../base/main',
    './tpl'
], function (require, exports, module) {
    var Base = require('../base/main');
    var tpl = require('./tpl');
    var ListConstructor = function (opt) {
        Base.call(this, opt);
    };
    ListConstructor.prototype = $.extend(new Base(), {
        constructor: ListConstructor,
        init: function () {
            var me = this;
            me.sets().render();
            return me;
        },
        sets: function () {
            var me = this;
            me.pen = template.compile($.trim($('#' + me.layout).html()));
            me.totalpage = Math.ceil(me.total / me.pagesize);
            me.more = $(tpl.more);
            return me;
        },
        render: function () {
            var me = this;
            if (me.data) {
                me.refresh();
            }
            me.bindEvents();
            return me;
        },
        append: function () {
            var me = this;
            me.more.remove();
            me.moreappened = false;
            me.totalpage = Math.ceil(me.total / me.pagesize);
            me.container.append(me.pen({ list: me.adata }));
            me.handleMore();
            me.show();
            return me;
        },
        refresh: function () {
            var me = this;
            me.more.remove();
            me.moreappened = false;
            me.totalpage = Math.ceil(me.total / me.pagesize);
            me.container.html(me.pen({ list: me.data }));
            me.handleMore();
            me.show();
            return me;
        },
        handleEmpty: function () {
            var me = this;
            me.container.html(tpl.empty);
            return me;
        },
        handleMore: function () {
            var me = this;
            me.more.text('\u52A0\u8F7D\u66F4\u591A');
            me.pending = false;
            if (!me.data.length) {
                me.moreappened && me.more.hide();
                me.handleEmpty();
                return me;
            }
            if (me.totalpage == me.curpage) {
                me.moreappened && me.more.hide();
                return me;
            }
            me.moreappened && me.more.show();
            if (!me.moreappened) {
                me.container.append(me.more);
                me.moreappened = true;
            }
            return me;
        },
        bindEvents: function () {
            var me = this;
            me.container.on('click', '.list-item', function () {
                var target = $(this);
                me.emitter.emit('list:itemclick', target.data('positionid'), target.data('companyid'));
            });
            me.container.on('click', '.list-more', function () {
                var target = $(this);
                if (me.pending)
                    return;
                me.pending = true;
                me.more.text('\u52A0\u8F7D\u4E2D...');
                me.emitter.emit('list:moreclick');
            });
            return me;
        }
    });
    module.exports = ListConstructor;
});

define('common/components/copyright/tpl/copyright.atpl', [], function () {
    return '<p>\xA92015 lagou.com, all right reserved </p><div class="copyright-item"><span class="phone">\u79FB\u52A8\u7248&nbsp;\xB7&nbsp;</span><span class="computer">\u7535\u8111\u7248&nbsp;\xB7&nbsp;</span><a href="#header">\u56DE\u9876\u90E8</a></div>';
});

define('common/components/copyright/tpl', [
    'require',
    'exports',
    'module',
    './tpl/copyright.atpl'
], function (require, exports, module) {
    module.exports = { copyright: require('./tpl/copyright.atpl') };
});

define('common/components/copyright/main', [
    'require',
    'exports',
    'module',
    '../base/main',
    './tpl'
], function (require, exports, module) {
    var Base = require('../base/main');
    var tpl = require('./tpl');
    var CopyRightConstructor = function (opt) {
        if (!opt.container)
            throw 'need container!';
        Base.call(this, opt);
    };
    CopyRightConstructor.prototype = $.extend(new Base(), {
        constructor: CopyRightConstructor,
        init: function () {
            var me = this;
            me.render();
            return me;
        },
        render: function () {
            var me = this;
            me.cTarget = $(tpl.copyright);
            me.container.append(me.cTarget);
            return me;
        }
    });
    module.exports = CopyRightConstructor;
});

define('custom/list/main', [
    'require',
    'exports',
    'module',
    'emitter',
    'storage',
    'common/util/helper',
    'common/js/config',
    'common/util/out',
    'common/util/sets',
    'common/util/requester',
    'cookies',
    'common/components/header/main',
    'common/components/footer/main',
    'common/components/list/main',
    'common/components/copyright/main'
], function (require, exports, module) {
    var Emitter = require('emitter');
    var Storage = require('storage');
    require('common/util/helper');
    var config = require('common/js/config');
    var out = require('common/util/out');
    var sets = require('common/util/sets');
    var requester = require('common/util/requester');
    var Cookies = require('cookies');
    var emitter = new Emitter();
    var Header = require('common/components/header/main');
    var Footer = require('common/components/footer/main');
    var List = require('common/components/list/main');
    if (sets.isSet(global.custom)) {
        global.custom = $.parseJSON(global.custom);
    }
    var header = new Header({
            emitter: emitter,
            title: config.title,
            container: $('#header')
        });
    var footer = new Footer({
            emitter: emitter,
            tab: config.footertab,
            selected: 'custom',
            container: $('#footer')
        });
    var list = new List({
            emitter: emitter,
            container: $('#content .list'),
            layout: 'tpl-list',
            data: global.page.result,
            curpage: 1,
            pagesize: config.pageSize,
            total: global.page.totalCount
        });
    emitter.on('footer:changetab', function (name, type, index) {
        out.tip('log', name, type, index);
        top.location.href = config.footertab[index].target;
    });
    emitter.on('list:itemclick', function (pid, cid) {
        out.tip('info', 'list:itemclick', pid, cid);
        top.location.href = config.url.go2Jobs + pid + '.html';
    });
    emitter.on('list:moreclick', function () {
        out.tip('info', 'list:moreclick');
        list.curpage++;
        request(append);
    });
    function request(callback) {
        requester.exec({
            url: config.url.customlistmore,
            dataType: 'json',
            data: {
                pageNo: list.curpage,
                pageSize: config.pageSize
            },
            succ: function (data, status, xhr) {
                callback(data, status);
            },
            err: function (xhr, errorType, error) {
            }
        });
    }
    function append(data) {
        var pageData = data.content.data.page;
        list.adata = pageData.result || [];
        list.curpage = pageData.pageNo;
        list.total = pageData.totalCount;
        list.append();
    }
    function refresh(data) {
        var pageData = data.content.data.page;
        list.data = pageData.result || [];
        list.curpage = pageData.pageNo;
        list.total = pageData.totalCount;
        list.refresh();
    }
    var info = $('#content .custom-info');
    var infotext = info.find('.info');
    var icon = info.find('.icon');
    var text = info.find('.text');
    var go = info.find('.go');
    if (global.isLogin) {
        if (global.custom) {
            infotext.text(function () {
                var r = [];
                $.each(config.customArr, function (index, item) {
                    global.custom[item] && r.push(global.custom[item]);
                });
                return r.join('/') || '10\u79D2\u949F\u5B9A\u5236\u804C\u4F4D';
            }());
            text.text('\u7F16\u8F91');
            icon.css({ display: 'inline-block' });
            go.attr('href', config.url.customMine);
        } else {
            infotext.text('10\u79D2\u949F\u5B9A\u5236\u804C\u4F4D');
            text.text('\u7F16\u8F91\u5B9A\u5236\u4FE1\u606F');
            go.attr('href', config.url.customPosition + '?s=1');
        }
    }
    info.show();
    var CopyRight = require('common/components/copyright/main');
    var copyright = new CopyRight({
            emitter: emitter,
            container: $('#copyright')
        });
    var computer = $('#copyright .copyright-item span.computer');
    var phone = $('#copyright .copyright-item span.phone');
    if (Cookies.get('view_change_key') == '1') {
        computer.addClass('active').siblings('span').removeClass('active');
    } else {
        phone.addClass('active').siblings('span').removeClass('active');
    }
    computer.click(function () {
        if (Cookies.enabled) {
            Cookies.set('view_change_key', '1', { domain: 'lagou.com' });
        }
        top.location.href = 'https://www.lagou.com?m=2';
    });
    phone.click(function () {
        if (Cookies.enabled) {
            Cookies.set('view_change_key', '0', { domain: 'lagou.com' });
        }
        top.location.href = 'https://m.lagou.com';
    });
    $('#push_bottom .close_btn').click(function (e) {
        $('#push_bottom').hide();
        e.preventDefault();
    });
    $('#downloadPopup .close_btn').click(function () {
        $('#downloadPopup').hide();
        $('#push_bottom').show().addClass('slideInUp');
    });
    localStorage.getItem('haveShowDownloadPopup') ? function () {
        $('#push_bottom').show();
    }() : function () {
        localStorage.setItem('haveShowDownloadPopup', 1);
        $('#downloadPopup').show();
    }();
});