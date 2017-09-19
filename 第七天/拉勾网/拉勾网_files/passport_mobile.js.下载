/**
 * passport 单点登录模块入口文件【移动端】
 * @author pooky@lagou.com
 * @date 2014-01-28
 * @dependency lazyload
 * @global window.PASSPORT
 */

/**
 * 使用需知：
 * 使用script标签引入：
 * <script
 *     id="_lgpassport_"
 *     data-css-site="1"
 *     data-css-popup="1"
 *     src="https://passport.lagou.com/static/js/passport.js"></script>
 *
 * @id 必须，使用此默认值即可
 * @data-css-site 是否加载site.css（如果所使用的业务页面已经加载了site.css，则请将它设
 *     置为0，节省流量）
 * @data-css-popup 是否加载和弹窗浮层相关的css（如果所使用的业务页面已经加载了弹窗的样式，
 *     则请将它设置为0，节省流量）
 *
 * 具体使用:
 *
 *   // 监听自动登录
 *   PASSPORT.on( 'autologin:succ', function ( data ) {
 *       alert( 'autologin:succ ' + data );
 *       window.location.reload();
 *   } );
 *   PASSPORT.on( 'autologin:fail', function ( data ) {
 *
 *   } );
 *
 *   // 监听弹窗登录
 *   PASSPORT.on( 'popuplogin:succ', function ( data ) {
 *       alert( 'popuplogin:succ ' + data );
 *       window.location.reload();
 *   } );
 *   PASSPORT.on( 'popuplogin:fail', function ( data ) {
 *
 *   } );
 *
 *   // 触发自动登录
 *   PASSPORT.auto();
 *
 *   // 触发弹窗登录
 *   PASSPORT.popup();
 *
 *   // 跨系统调用工具方法
 *
 *
 *   // 【直接手动触发，不建议直接调用】触发远程登录，采用回调函数方式
 *   // 在有远程调用的地方，请使用`PASSPORT.util.rpc`函数
 *   PASSPORT.remote( 'http://server123',
 *       // 成功
 *       function ( data ) {
 *           alert( 'remotelogin:succ ' + data );
 *       },
 *       // 失败
 *       function ( data ) {
 *           alert( 'remotelogin:fail ' + data );
 *       }
 *   );
 *
 * !!!有关跨站请求、跨域请求登录不同步的处理逻辑：
 *
 *  1.如果调用发现用户未在该系统登录，则返回:【这一步是在业务逻辑层做的判断】
 *   {
 *       "content": {
 *           "data": {
 *               "crossServiceUrl": "http://xxxx.xxxx.com/crossServiceAjaxRequest.html"
 *           },
 *           "rows": []
 *       },
 *       "message": "should redirect to crossServiceUrl",
 *       "state": 10001
 *   }
 *
 *   2.js创建一个隐藏iframe【此处只需调用PASSPORT.remoteLogin( service )】，传入service参数即可
 *   当状态码是10001时，前端用js创建一个隐藏的iframe：
 *   https://passport.lagou.com/ajaxLogin/login.html?
 *       service=ENCODE(上面得到的crossServiceUrl)&
 *       osc=ENCODE(回调方法名+参数)&
 *       ofc=ENCODE(回调方法名+参数)
 *
 *   3.如果用户登录成功，将回调2步传入的osc对应的方法【只需监听：remotelogin:succ/fail】
 *
 *   4.如果登录成功，js应再重新发起一次同样的请求。【此处应该和业务逻辑相关，PASSPORT不作处理】
 */

( function() {

    /**
     * 调试模式
     * @type {Boolean}
     */
    var DEBUG  = false;

    /**
     * 版本号
     * @type {String}
     */
    var VERSION = '1.0.2';

    /**
     * 需要获取到自己的id
     * @type {String}
     */
    var ID = '_lgpassport_';

    /**
     * 构建iframe的index
     *
     * @type {Number}
     */
    var IFRAMEINDEX = 0;

    /**
     * 用来保存回调函数，键名既是index
     *
     * @type {Object}
     */
    var CALLBACKS = {

        // 远程调用的回调
        remote: {
            // 以index为索引
            // 2: {
            //     succ: func..
            //     fail: func..
            // }
        }

    };

    /**
     * 当前执行的脚本元素
     * @type {[type]}
     */
    var CURRENTSCRIPT = document.getElementById( ID );

    /**
     * url正则匹配
     * @type {RegExp}
     */
    var REGEXPURL = /^(https?):\/\/((?:[\u4E00-\u9FA5a-z0-9.-]|%[0-9A-F]{2}){2,})(?::(\d+))?((?:\/(?:[a-z0-9-._~!$&'()*+,;=:@]|%[0-9A-F]{2})*)*)(?:\?((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?(?:#((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?$/i;

    /**
     * 请求目标地址
     * @type {Object}
     */
    var REMOTE = {

        // 中心
        server: 'https://passport.lagou.com',

        // 弹框登录的提交地址
        poplogin: '/login/login.json',

        // 弹窗登录中转
        poptransfer: '/ajaxLogin/frameGrant.html',

        // 自动登录中转
        autologin: '/ajaxLogin/login.html'

    };

    /**
     * 模版
     * @type {Object}
     */
    var TEMPLATES = {

    };

    function analyzeUri( config ) {

        var loc = top.location;
        var origin = {
            protocol: loc.protocol.substring( 0, loc.protocol.length - 1 ),
            hostname: loc.hostname,
            port: loc.port || '80' // 默认80端口
        };

        var targetMatches = REGEXPURL.exec( config.url );

        // 不为null，则说明有匹配【需要判断是否跨域】
        // 如果为null，则说明是不加域名的绝对地址请求，例如：'/a/c.json'【不用跨域】
        if ( targetMatches && targetMatches.length ) {
             var target = {
                protocol: targetMatches[ 1 ],
                hostname: targetMatches[ 2 ],
                port: targetMatches[ 3 ] || '80'
            };

            // 如果跨域
            if ( origin.protocol != target.protocol
               || origin.hostname != target.hostname
               || origin.port != target.port) {
                config.dataType = 'jsonp';
                config.jsonp = 'jsoncallback';
            }
        }

    }

    /**
     * 工具集
     * @type {Object}
     */
    var util = {

        /**
         * 跨系统调用[jsonp]
         *
         * @param {Object} opt 请求参数
         *
         * @param {string} opt.url 请求路径
         * @param {string} opt.type optional 请求方法 'GET/POST'，默认'POST'
         * @param {Object} opt.params 请求参数
         * @param {Function} opt.succ 成功
         * @param {Function} opt.fail 失败
         */
        rpc: function( opt ) {

            if ( !opt.url )
                return;

            opt.type || ( opt.type = 'POST' );
            opt.params || ( opt.params = { } );

            var me = arguments.callee;

            util.tinfo( 'Start passport.rpc: ' + opt.url );

            var config = {

                type: opt.type,
                data: opt.params,
                url: opt.url,
                dataType: 'json',
                // jsonp: 'jsoncallback'

            };

            // 分析url是否跨域
            analyzeUri( config );

            $.ajax( config ).done( function( result, textStatus, jqXHR ){

                util.tinfo( 'passport.rpc.succ: ' + textStatus );

                // 判断是不是跨系统，且未登录
                if ( result.state == '10001' ) {
                    var crossServiceUrl = result.content.data.crossServiceUrl.replace(/^https?\:/i, window.location.protocol); // 兼容 http/https

                    PASSPORT.remote(
                      crossServiceUrl,
                      // 成功
                      function ( data ) {
                          util.tinfo( 'passport.rpc.remote.succ' );
                          me( opt );
                      },
                      // 失败
                      function ( data ) {
                          util.tinfo( 'passport.rpc.remote.fail' );
                          opt.fail && opt.fail.apply( null, [ data ] );
                      }
                    );

                    return;
                }

                // 如果跨系统已经登录，则正常响应
                opt.succ && opt.succ.apply( null, arguments );

            } ).fail( function ( jqXHR, textStatus, errorThrown ) {
                util.tinfo( 'passport.rpc.fail: ' + textStatus );
                opt.fail && opt.fail.apply( null, arguments );
            } );

        },

        /**
         * 得到默认的请求url
         *
         * @param  {string} url    url
         * @param  {Object} params 参数
         */
        getTargetUrl: function( url, params ) {

            var pas = {
                fl: ( params.fl != undefined ? params.fl : true ),
                service: params.service,
                osc: params.osc,
                ofc: params.ofc,
                pfurl: util.getCurEncodeUrl()
            };

            return url + '?' + $.param( pas );

        },

        //得到当前页面的url
        getCurEncodeUrl: function() {
            return encodeURIComponent( document.URL );
        },

        //创建iframe
        createIframe: function( id, encodeUrl ) {
            var iframe = '<iframe src="'
                + encodeUrl
                // + '" id="' + id
                // 每一个iframe要区分自己
                + '" id="' + id + '_' + IFRAMEINDEX
                + '" style="display:none;"></iframe>';
            $( 'body' ).append( iframe );

            // 当前构建完毕要自加
            IFRAMEINDEX ++;
        },
        // 请求器
        requester: function( params, callback ) {
            params.dataType = params.dataType || 'json';
            params.type = params.type || 'POST';
            params.data = params.data || {};
            $.ajax( params ).done( function( response ) {
                callback && callback( response );
            } );
        },

        /**
         * 日志头设置
         * @type {String}
         */
        tipheader: 'Lagou Passport v' + VERSION + ' -> ',

        /**
         * 展示日志
         */
        tip: function () {
            if ( !DEBUG )
                return;
            var method = arguments[ 0 ];
            var args = Array.prototype.slice.call( arguments, 1 );
            console[ method ].apply( console, args );
        },

        tinfo: function ( msg ) {
            util.tip( 'info', util.tipheader + msg );
        }

    };

    util.tinfo( 'Enter passport...' );

    /**
     * 事件处理器
     */
    var Emitter = (function () {

        /**
         * Emitter
         *
         * @exports Emitter
         * @constructor
         */
        function Emitter() {}

        /**
         * Emitter的prototype（为了便于访问）
         *
         * @inner
         */
        var proto = Emitter.prototype;

        /**
         * 获取事件列表
         * 若还没有任何事件则初始化列表
         *
         * @private
         * @return {Object}
         */
        proto._getEvents = function () {
            if (!this._events) {
                this._events = {};
            }

            return this._events;
        };

        /**
         * 获取最大监听器个数
         * 若尚未设置，则初始化最大个数为10
         *
         * @private
         * @return {number}
         */
        proto._getMaxListeners = function () {
            if (isNaN(this.maxListeners)) {
                this.maxListeners = 10;
            }

            return this.maxListeners;
        };

        /**
         * 挂载事件
         *
         * @public
         * @param {string} event 事件名
         * @param {Function} listener 监听器
         * @return {Emitter}
         */
        proto.on = function (event, listener) {
            var events = this._getEvents();
            var maxListeners = this._getMaxListeners();

            events[event] = events[event] || [];

            var currentListeners = events[event].length;
            if (currentListeners >= maxListeners && maxListeners !== 0) {
                throw new RangeError(
                    'Warning: possible Emitter memory leak detected. '
                    + currentListeners
                    + ' listeners added.'
               );
            }

            events[event].push(listener);

            return this;
        };

        /**
         * 挂载只执行一次的事件
         *
         * @public
         * @param {string} event 事件名
         * @param {Function} listener 监听器
         * @return {Emitter}
         */
        proto.once = function (event, listener) {
            var me = this;

            function on() {
                me.off(event, on);
                listener.apply(this, arguments);
            }
            // 挂到on上以方便删除
            on.listener = listener;

            this.on(event, on);

            return this;
        };

        /**
         * 注销事件与监听器
         * 任何参数都`不传`将注销当前实例的所有事件
         * 只传入`event`将注销该事件下挂载的所有监听器
         * 传入`event`与`listener`将只注销该监听器
         *
         * @public
         * @param {string=} event 事件名
         * @param {Function=} listener 监听器
         * @return {Emitter}
         */
        proto.off = function (event, listener) {
            var events = this._getEvents();

            // 移除所有事件
            if (0 === arguments.length) {
                this._events = {};
                return this;
            }

            var listeners = events[event];
            if (!listeners) {
                return this;
            }

            // 移除指定事件下的所有监听器
            if (1 === arguments.length) {
                delete events[event];
                return this;
            }

            // 移除指定监听器（包括对once的处理）
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

        /**
         * 触发事件
         *
         * @public
         * @param {string} event 事件名
         * @param {...*} args 传递给监听器的参数，可以有多个
         * @return {Emitter}
         */
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

        /**
         * 返回指定事件的监听器列表
         *
         * @public
         * @param {string} event 事件名
         * @return {Array} 监听器列表
         */
        proto.listeners = function (event) {
            var events = this._getEvents();
            return events[event] || [];
        };

        /**
         * 设置监听器的最大个数，为0时不限制
         *
         * @param {number} number 监听器个数
         * @return {Emitter}
         */
        proto.setMaxListeners = function (number) {
            this.maxListeners = number;

            return this;
        };

        /**
         * 将Emitter混入目标对象
         *
         * @param {Object} obj 目标对象
         * @return {Object} 混入Emitter后的对象
         */
        Emitter.mixin = function (obj) {
            for (var key in Emitter.prototype) {
                obj[key] = Emitter.prototype[key];
            }
            return obj;
        };

        return Emitter;

    } )();

    var READY = true;

    /**
     * 事件中转中心
     * @type {Emitter}
     */
    var emitterControler = new Emitter();

    /**
     * 资源准备完毕
     */
    function ready4Next() {

        util.tinfo( 'Resource Ready!' );

        READY = true;

    }

    /**
     * 因为要等待依赖资源加载完毕才可以调用某个函数，故设置此函数
     */
    var delayWrapper = function ( func ) {

        return function () {

            var delay = 70;

            var args = arguments;

            if ( !READY ) {
                window.setTimeout( function () {
                    args.callee.apply( null, args );
                }, delay );
            }
            else {
                // 资源准备就绪开始执行，参数直接传递至func
                func.apply( null, args );
            }

        };

    };

    /**
     * 删除无用的iframe
     * @param  {string} type  类型
     * @param  {number} index 索引
     */
    function delIframe( type, index ) {

        var id = type + '_' + index;
        $( '#' + id ).remove();
        util.tinfo( 'Iframe ' + id + ' removed' );

    }

    /**
     * 使用PASSPORT全局变量对外
     * @type {Object}
     */
    window.PASSPORT = window.PASSPORT || {

        /**
         * 绑定自定义事件【针对`auto`，`popup`的监听器】
         * @param  {string} event    事件类型
         * @param  {Function} listener  监听器
         */
        on: function () {
            emitterControler.on.apply( emitterControler, arguments );
        },

        /**
         * 触发自动登录
         * @desc 监听事件[ autologin:xxx ]
         */
        auto: delayWrapper( function () {
            var encodeUrl = util.getCurEncodeUrl();
            var turl = util.getTargetUrl(
                REMOTE.server + REMOTE.autologin,
                {
                    fl: '1',
                    service: encodeUrl,
                    osc: 'PASSPORT._ascb(' + IFRAMEINDEX + ')',
                    ofc: 'PASSPORT._afcb(' + IFRAMEINDEX + ')'
                }
            );
            util.createIframe( 'auto_login_iframe', turl );
        } ),

        /**
         * 以下两个为自动登录的回调
         *
         * @private
         * @param  {[type]} data [description]
         */
        _ascb: function ( index, data ) {
            util.tinfo( 'Call of PASSPORT._ascb' + index + ': ' + data );
            emitterControler.emit( 'autologin:succ', data );
            delIframe( 'auto_login_iframe', index );
        },
        _afcb: function ( index, data ) {
            util.tinfo( 'Call of PASSPORT._afcb' + index + ': ' + data );
            emitterControler.emit( 'autologin:fail', data );
            delIframe( 'auto_login_iframe', index );
        },

        /**
         * 远程登录
         * @param  {string} server 响应出10001的接口url
         */
        remote: delayWrapper( function ( server, succ, fail ) {
            util.tinfo( 'Remote request: ' + server + ' '
                + succ + ' '
                + fail );
            // 放入回调
            CALLBACKS.remote[ IFRAMEINDEX ] = { };
            if ( succ ) {
                CALLBACKS.remote[ IFRAMEINDEX ].succ = succ;
            }
            if ( fail ) {
                CALLBACKS.remote[ IFRAMEINDEX ].fail = fail;
            }
            util.tinfo( 'Remote request put into callbacks: ' + JSON.stringify(
                CALLBACKS.remote ) );
            var turl = util.getTargetUrl(
                REMOTE.server + REMOTE.autologin,
                {
                    fl: '3',
                    service: server,
                    osc: 'PASSPORT._rscb(' + IFRAMEINDEX + ')',
                    ofc: 'PASSPORT._rfcb(' + IFRAMEINDEX + ')'
                }
            );
            util.createIframe( 'remote_login_iframe', turl );
        } ),

        /**
         * 以下两个为远程登录的回调
         *
         * @private
         * @param  {[type]} data [description]
         */
        _rscb: function ( index, data ) {
            util.tinfo( 'Call of PASSPORT._rscb' + index + ': ' + data );
            emitterControler.emit( 'remotelogin:succ', data );
            delIframe( 'remote_login_iframe', index );
            // 触发回调函数
            CALLBACKS.remote[ index ]
                && CALLBACKS.remote[ index ].succ
                && CALLBACKS.remote[ index ].succ( data );
        },
        _rfcb: function ( index, data ) {
            util.tinfo( 'Call of PASSPORT._rfcb' + index + ': ' + data );
            emitterControler.emit( 'remotelogin:fail', data );
            delIframe( 'remote_login_iframe', index );
            // 触发回调函数
            CALLBACKS.remote[ index ]
                && CALLBACKS.remote[ index ].fail
                && CALLBACKS.remote[ index ].fail( data );
        },

        util: {
            rpc: delayWrapper( util.rpc )
        }

    };

} )();
