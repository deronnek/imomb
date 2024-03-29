/*
    Copyright(c) 2010 Sencha Inc.
    licensing@sencha.com
    http://www.sencha.com/touchlicense
*/
Ext = {
    version: "0.9.3",
    versionDetail: {
        major: 0,
        minor: 9,
        patch: 3
    }
};
Ext.setup = function(b) {
    var f = Ext.platform;
    if (b && typeof b == "object") {
        if (b.addMetaTags !== false) {
            var g = Ext.get(document.createElement("meta")),
                c = Ext.get(document.createElement("meta")),
                j = Ext.get(document.createElement("meta")),
                a = Ext.get(document.createElement("link")),
                d = Ext.get(document.createElement("link"));
            g.set({
                name: "viewport",
                content: "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0;"
            });
            if (b.fullscreen !== false) {
                c.set({
                    name: "apple-mobile-web-app-capable",
                    content: "yes"
                });
                if (Ext.isString(b.statusBarStyle)) {
                    j.set({
                        name: "apple-mobile-web-app-status-bar-style",
                        content: b.statusBarStyle
                    })
                }
            }
            if (Ext.isString(b.tabletStartupScreen) && f.isTablet) {
                a.set({
                    rel: "apple-touch-startup-image",
                    href: b.tabletStartupScreen
                })
            } else {
                if (Ext.isString(b.phoneStartupScreen) && f.isPhone) {
                    a.set({
                        rel: "apple-touch-startup-image",
                        href: b.phoneStartupScreen
                    })
                }
            }
            if (b.icon) {
                b.phoneIcon = b.tabletIcon = b.icon
            }
            var k = (b.glossOnIcon === false) ? "-precomposed" : "";
            if (Ext.isString(b.tabletIcon) && f.isTablet) {
                d.set({
                    rel: "apple-touch-icon" + k,
                    href: b.tabletIcon
                })
            } else {
                if (Ext.isString(b.phoneIcon) && f.isPhone) {
                    d.set({
                        rel: "apple-touch-icon" + k,
                        href: b.phoneIcon
                    })
                }
            }
            var h = Ext.get(document.getElementsByTagName("head")[0]);
            h.appendChild(g);
            if (c.getAttribute("name")) {
                h.appendChild(c)
            }
            if (j.getAttribute("name")) {
                h.appendChild(j)
            }
            if (d.getAttribute("href")) {
                h.appendChild(d)
            }
            if (a.getAttribute("href")) {
                h.appendChild(a)
            }
        }
        if (Ext.isArray(b.preloadImages)) {
            for (var e = b.preloadImages.length - 1; e >= 0; e--) {
                (new Image()).src = b.preloadImages[e]
            }
        }
        if (Ext.isFunction(b.onReady)) {
            Ext.onReady(b.onReady, b.scope || window)
        }
    }
};
Ext.apply = function(b, a, d) {
    if (d) {
        Ext.apply(b, d)
    }
    if (b && a && typeof a == "object") {
        for (var c in a) {
            b[c] = a[c]
        }
    }
    return b
};
Ext.apply(Ext, {
    userAgent: navigator.userAgent.toLowerCase(),
    cache: {},
    idSeed: 1000,
    BLANK_IMAGE_URL: "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    isStrict: document.compatMode == "CSS1Compat",
    emptyFn: function() {},
    isSecure: /^https/i.test(window.location.protocol),
    isReady: false,
    enableGarbageCollector: true,
    enableListenerCollection: true,
    applyIf: function(b, a) {
        var c, d;
        if (b) {
            for (c in a) {
                if (b[c] === d) {
                    b[c] = a[c]
                }
            }
        }
        return b
    },
    repaint: function() {
        var a = Ext.getBody().createChild({
            cls: "x-mask x-mask-transparent"
        });
        setTimeout(function() {
            a.remove()
        }, 0)
    },
    id: function(a, b) {
        return (a = Ext.getDom(a) || {}).id = a.id || (b || "ext-gen") + (++Ext.idSeed)
    },
    extend: function() {
        var b = function(d) {
            for (var c in d) {
                this[c] = d[c]
            }
        };
        var a = Object.prototype.constructor;
        return function(c, h, f) {
            if (Ext.isObject(h)) {
                f = h;
                h = c;
                c = f.constructor != a ? f.constructor : function() {
                    h.apply(this, arguments)
                }
            }
            var e = function() {}, d, g = h.prototype;
            e.prototype = g;
            d = c.prototype = new e();
            d.constructor = c;
            c.superclass = g;
            if (g.constructor == a) {
                g.constructor = h
            }
            c.override = function(i) {
                Ext.override(c, i)
            };
            d.superclass = d.supr = (function() {
                return g
            });
            d.override = b;
            c.override(f);
            c.extend = function(i) {
                return Ext.extend(c, i)
            };
            c.prototype.proto = c.prototype;
            return c
        }
    }(),
    override: function(a, b) {
        if (b) {
            Ext.apply(a.prototype, b)
        }
    },
    namespace: function() {
        var e = arguments.length,
            d, f, c, a, h, g, b;
        for (d = 0; d < e; d++) {
            f = arguments[d];
            g = f.split(".");
            b = window[g[0]] = Object(window[g[0]]);
            for (a = 1, h = g.length; a < h; a++) {
                b = b[g[a]] = Object(b[g[a]])
            }
        }
        return b
    },
    urlEncode: function(f, d) {
        var b, a = [],
            c = encodeURIComponent;
        Ext.iterate(f, function(e, g) {
            b = Ext.isEmpty(g);
            Ext.each(b ? e : g, function(h) {
                a.push("&", c(e), "=", (!Ext.isEmpty(h) && (h != e || !b)) ? (Ext.isDate(h) ? Ext.encode(h).replace(/"/g, "") : c(h)) : "")
            })
        });
        if (!d) {
            a.shift();
            d = ""
        }
        return d + a.join("")
    },
    urlDecode: function(c, b) {
        if (Ext.isEmpty(c)) {
            return {}
        }
        var g = {}, f = c.split("&"),
            h = decodeURIComponent,
            a, e;
        Ext.each(f, function(d) {
            d = d.split("=");
            a = h(d[0]);
            e = h(d[1]);
            g[a] = b || !g[a] ? e : [].concat(g[a]).concat(e)
        });
        return g
    },
    htmlEncode: function(a) {
        return Ext.util.Format.htmlEncode(a)
    },
    htmlDecode: function(a) {
        return Ext.util.Format.htmlDecode(a)
    },
    urlAppend: function(a, b) {
        if (!Ext.isEmpty(b)) {
            return a + (a.indexOf("?") === -1 ? "?" : "&") + b
        }
        return a
    },
    toArray: function(c, b, a) {
        return Array.prototype.slice.call(c, b || 0, a || c.length)
    },
    each: function(e, d, c) {
        if (Ext.isEmpty(e, true)) {
            return 0
        }
        if (!Ext.isIterable(e) || Ext.isPrimitive(e)) {
            e = [e]
        }
        for (var b = 0, a = e.length; b < a; b++) {
            if (d.call(c || e[b], e[b], b, e) === false) {
                return b
            }
        }
        return true
    },
    iterate: function(c, b, a) {
        if (Ext.isEmpty(c)) {
            return
        }
        if (Ext.isIterable(c)) {
            Ext.each(c, b, a);
            return
        } else {
            if (Ext.isObject(c)) {
                for (var d in c) {
                    if (c.hasOwnProperty(d)) {
                        if (b.call(a || c, d, c[d], c) === false) {
                            return
                        }
                    }
                }
            }
        }
    },
    pluck: function(a, c) {
        var b = [];
        Ext.each(a, function(d) {
            b.push(d[c])
        });
        return b
    },
    getDom: function(a) {
        if (!a || !document) {
            return null
        }
        return a.dom ? a.dom : (typeof a == "string" ? document.getElementById(a) : a)
    },
    getBody: function() {
        return Ext.get(document.body || false)
    },
    getDoc: function() {
        return Ext.get(document)
    },
    getCmp: function(a) {
        return Ext.ComponentMgr.get(a)
    },
    getOrientation: function() {
        return window.innerHeight > window.innerWidth ? "portrait" : "landscape"
    },
    removeNode: function(a) {
        if (a && a.parentNode && a.tagName != "BODY") {
            Ext.EventManager.removeAll(a);
            a.parentNode.removeChild(a);
            delete Ext.cache[a.id]
        }
    },
    destroy: function() {
        var c = arguments.length,
            b, a;
        for (b = 0; b < c; b++) {
            a = arguments[b];
            if (a) {
                if (Ext.isArray(a)) {
                    this.destroy.apply(this, a)
                } else {
                    if (Ext.isFunction(a.destroy)) {
                        a.destroy()
                    } else {
                        if (a.dom) {
                            a.remove()
                        }
                    }
                }
            }
        }
    },
    isIterable: function(a) {
        if (Ext.isArray(a) || a.callee) {
            return true
        }
        if (/NodeList|HTMLCollection/.test(Object.prototype.toString.call(a))) {
            return true
        }
        return ((typeof a.nextNode != "undefined" || a.item) && Ext.isNumber(a.length))
    },
    num: function(b, a) {
        b = Number(Ext.isEmpty(b) || Ext.isArray(b) || typeof b == "boolean" || (typeof b == "string" && b.trim().length == 0) ? NaN : b);
        return isNaN(b) ? a : b
    },
    isEmpty: function(b, a) {
        return b == null || ((Ext.isArray(b) && !b.length)) || (!a ? b === "" : false)
    },
    isArray: function(a) {
        return Object.prototype.toString.apply(a) === "[object Array]"
    },
    isDate: function(a) {
        return Object.prototype.toString.apply(a) === "[object Date]"
    },
    isObject: function(a) {
        return !!a && Object.prototype.toString.call(a) === "[object Object]"
    },
    isPrimitive: function(a) {
        return Ext.isString(a) || Ext.isNumber(a) || Ext.isBoolean(a)
    },
    isFunction: function(a) {
        return Object.prototype.toString.apply(a) === "[object Function]"
    },
    isNumber: function(a) {
        return Object.prototype.toString.apply(a) === "[object Number]" && isFinite(a)
    },
    isString: function(a) {
        return Object.prototype.toString.apply(a) === "[object String]"
    },
    isBoolean: function(a) {
        return Object.prototype.toString.apply(a) === "[object Boolean]"
    },
    isElement: function(a) {
        return !!a && a.tagName
    },
    isDefined: function(a) {
        return typeof a !== "undefined"
    },
    escapeRe: function(a) {
        return a.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1")
    }
});
Ext.SSL_SECURE_URL = Ext.isSecure && "about:blank";
Ext.ns = Ext.namespace;
Ext.ns("Ext.util", "Ext.data", "Ext.list", "Ext.form", "Ext.menu", "Ext.state", "Ext.layout", "Ext.app", "Ext.ux", "Ext.plugins", "Ext.direct");
Ext.apply(Function.prototype, {
    createInterceptor: function(b, a) {
        if (!Ext.isFunction(b)) {
            return this
        } else {
            var c = this;
            return function() {
                var e = this,
                    d = arguments;
                b.target = e;
                b.method = c;
                if (b.apply(a || e || window, d) !== false) {
                    return c.apply(e || window, d)
                }
                return null
            }
        }
    },
    createDelegate: function(c, b, a) {
        var d = this;
        return function() {
            var f = b || arguments;
            if (a === true) {
                f = Array.prototype.slice.call(arguments, 0);
                f = f.concat(b)
            } else {
                if (Ext.isNumber(a)) {
                    f = Array.prototype.slice.call(arguments, 0);
                    var e = [a, 0].concat(b);
                    Array.prototype.splice.apply(f, e)
                }
            }
            return d.apply(c || window, f)
        }
    },
    defer: function(c, e, b, a) {
        var d = this.createDelegate(e, b, a);
        if (c > 0) {
            return setTimeout(d, c)
        }
        d();
        return 0
    }
});
Ext.applyIf(String.prototype, {
    escape: function(a) {
        return a.replace(/('|\\)/g, "\\$1")
    },
    toggle: function(b, a) {
        return this == b ? a : b
    },
    trim: function() {
        var a = /^\s+|\s+$/g;
        return function() {
            return this.replace(a, "")
        }
    }()
});
Ext.applyIf(String, {
    escape: function(a) {
        return a.replace(/('|\\)/g, "\\$1")
    },
    leftPad: function(d, b, c) {
        var a = String(d);
        if (!c) {
            c = " "
        }
        while (a.length < b) {
            a = c + a
        }
        return a
    },
    format: function(b) {
        var a = Ext.toArray(arguments, 1);
        return b.replace(/\{(\d+)\}/g, function(c, d) {
            return a[d]
        })
    }
});
Ext.applyIf(Date.prototype, {
    getElapsed: function(a) {
        return Math.abs((a || new Date()).getTime() - this.getTime())
    }
});
Ext.applyIf(Array.prototype, {
    indexOf: function(b, c) {
        var a = this.length;
        c = c || 0;
        c += (c < 0) ? a : 0;
        for (; c < a; ++c) {
            if (this[c] === b) {
                return c
            }
        }
        return -1
    },
    remove: function(b) {
        var a = this.indexOf(b);
        if (a != -1) {
            this.splice(a, 1)
        }
        return this
    },
    contains: function(a) {
        return this.indexOf(a) !== -1
    }
});
Ext.applyIf(Number.prototype, {
    constrain: function(b, a) {
        var c = parseInt(this, 10);
        if (typeof b == "number") {
            c = Math.max(c, b)
        }
        if (typeof a == "number") {
            c = Math.min(c, a)
        }
        return c
    }
});
(function() {
    var c = Ext.Element = Ext.extend(Object, {
        defaultUnit: "px",
        constructor: function(d, e) {
            var f = typeof d == "string" ? document.getElementById(d) : d,
                g;
            if (!f) {
                return null
            }
            g = f.id;
            if (!e && g && Ext.cache[g]) {
                return Ext.cache[g].el
            }
            this.dom = f;
            this.id = g || Ext.id(f)
        },
        set: function(h, e) {
            var f = this.dom,
                d, g;
            for (d in h) {
                if (h.hasOwnProperty(d)) {
                    g = h[d];
                    if (d == "style") {
                        this.applyStyles(g)
                    } else {
                        if (d == "cls") {
                            f.className = g
                        } else {
                            if (e !== false) {
                                f.setAttribute(d, g)
                            } else {
                                f[d] = g
                            }
                        }
                    }
                }
            }
            return this
        },
        is: function(d) {
            return Ext.DomQuery.is(this.dom, d)
        },
        getValue: function(d) {
            var e = this.dom.value;
            return d ? parseInt(e, 10) : e
        },
        addListener: function(d, g, f, e) {
            Ext.EventManager.on(this.dom, d, g, f || this, e);
            return this
        },
        removeListener: function(d, f, e) {
            Ext.EventManager.un(this.dom, d, f, e);
            return this
        },
        removeAllListeners: function() {
            Ext.EventManager.removeAll(this.dom);
            return this
        },
        purgeAllListeners: function() {
            Ext.EventManager.purgeElement(this, true);
            return this
        },
        remove: function() {
            var d = this,
                e = d.dom;
            if (e) {
                delete d.dom;
                Ext.removeNode(e)
            }
        },
        isAncestor: function(e) {
            var d = this.dom;
            e = Ext.getDom(e);
            if (d && e) {
                return d.contains(e)
            }
            return false
        },
        isDescendent: function(d) {
            return Ext.fly(d).isAncestorOf(this)
        },
        contains: function(d) {
            return !d ? false : this.isAncestor(d)
        },
        getAttribute: function(e, f) {
            var g = this.dom;
            return g.getAttributeNS(f, e) || g.getAttribute(f + ":" + e) || g.getAttribute(e) || g[e]
        },
        setHTML: function(d) {
            if (this.dom) {
                this.dom.innerHTML = d
            }
            return this
        },
        getHTML: function() {
            return this.dom ? this.dom.innerHTML : ""
        },
        hide: function() {
            this.setVisible(false);
            return this
        },
        show: function() {
            this.setVisible(true);
            return this
        },
        setVisible: function(h, d) {
            var e = this,
                g = e.dom,
                f = this.getVisibilityMode();
            switch (f) {
                case c.VISIBILITY:
                    this.removeClass(["x-hidden-display", "x-hidden-offsets"]);
                    this[h ? "removeClass" : "addClass"]("x-hidden-visibility");
                    break;
                case c.DISPLAY:
                    this.removeClass(["x-hidden-visibility", "x-hidden-offsets"]);
                    this[h ? "removeClass" : "addClass"]("x-hidden-display");
                    break;
                case c.OFFSETS:
                    this.removeClass(["x-hidden-visibility", "x-hidden-display"]);
                    this[h ? "removeClass" : "addClass"]("x-hidden-offsets");
                    break
            }
            return e
        },
        getVisibilityMode: function() {
            var e = this.dom,
                d = c.data(e, "visibilityMode");
            if (d === undefined) {
                c.data(e, "visibilityMode", d = c.DISPLAY)
            }
            return d
        },
        setDisplayMode: function(d) {
            c.data(this.dom, "visibilityMode", d);
            return this
        }
    });
    var a = c.prototype;
    c.VISIBILITY = 1;
    c.DISPLAY = 2;
    c.OFFSETS = 3;
    c.addMethods = function(d) {
        Ext.apply(a, d)
    };
    a.on = a.addListener;
    a.un = a.removeListener;
    a.update = a.setHTML;
    c.get = function(d) {
        var g, f, h;
        if (!d) {
            return null
        }
        if (typeof d == "string") {
            if (!(f = document.getElementById(d))) {
                return null
            }
            if (Ext.cache[d] && Ext.cache[d].el) {
                g = Ext.cache[d].el;
                g.dom = f
            } else {
                g = c.addToCache(new c(f))
            }
            return g
        } else {
            if (d.tagName) {
                if (!(h = d.id)) {
                    h = Ext.id(d)
                }
                if (Ext.cache[h] && Ext.cache[h].el) {
                    g = Ext.cache[h].el;
                    g.dom = d
                } else {
                    g = c.addToCache(new c(d))
                }
                return g
            } else {
                if (d instanceof c) {
                    if (d != c.docEl) {
                        d.dom = document.getElementById(d.id) || d.dom
                    }
                    return d
                } else {
                    if (d.isComposite) {
                        return d
                    } else {
                        if (Ext.isArray(d)) {
                            return c.select(d)
                        } else {
                            if (d == document) {
                                if (!c.docEl) {
                                    var e = function() {};
                                    e.prototype = a;
                                    c.docEl = new e();
                                    c.docEl.dom = document
                                }
                                return c.docEl
                            }
                        }
                    }
                }
            }
        }
        return null
    };
    c.addToCache = function(d, e) {
        e = e || d.id;
        Ext.cache[e] = {
            el: d,
            data: {},
            events: {}
        };
        return d
    };
    c.data = function(e, d, f) {
        e = c.get(e);
        if (!e) {
            return null
        }
        var g = Ext.cache[e.id].data;
        if (arguments.length == 2) {
            return g[d]
        } else {
            return (g[d] = f)
        }
    };
    c.garbageCollect = function() {
        if (!Ext.enableGarbageCollector) {
            clearInterval(c.collectorThreadId)
        } else {
            var g, d, f, e;
            for (g in Ext.cache) {
                e = Ext.cache[g];
                if (e.skipGarbageCollection) {
                    continue
                }
                d = e.el;
                f = d.dom;
                if (!f || !f.parentNode || (!f.offsetParent && !document.getElementById(g))) {
                    if (Ext.enableListenerCollection) {
                        Ext.EventManager.removeAll(f)
                    }
                    delete Ext.cache[eid]
                }
            }
        }
    };
    c.Flyweight = function(d) {
        this.dom = d
    };
    var b = function() {};
    b.prototype = a;
    c.Flyweight.prototype = new b;
    c.Flyweight.prototype.isFlyweight = true;
    c._flyweights = {};
    c.fly = function(f, d) {
        var e = null;
        d = d || "_global";
        f = Ext.getDom(f);
        if (f) {
            (c._flyweights[d] = c._flyweights[d] || new c.Flyweight()).dom = f;
            e = c._flyweights[d]
        }
        return e
    };
    Ext.get = c.get;
    Ext.fly = c.fly
})();
Ext.applyIf(Ext.Element, {
    unitRe: /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,
    camelRe: /(-[a-z])/gi,
    opacityRe: /alpha\(opacity=(.*)\)/i,
    propertyCache: {},
    borders: {
        l: "border-left-width",
        r: "border-right-width",
        t: "border-top-width",
        b: "border-bottom-width"
    },
    paddings: {
        l: "padding-left",
        r: "padding-right",
        t: "padding-top",
        b: "padding-bottom"
    },
    margins: {
        l: "margin-left",
        r: "margin-right",
        t: "margin-top",
        b: "margin-bottom"
    },
    addUnits: function(a) {
        if (a === "" || a == "auto" || a === undefined) {
            a = a || ""
        } else {
            if (!isNaN(a) || !this.unitRe.test(a)) {
                a = a + (this.defaultUnit || "px")
            }
        }
        return a
    },
    parseBox: function(b) {
        if (typeof b != "string") {
            b = b.toString()
        }
        var c = b.split(" "),
            a = c.length;
        if (a == 1) {
            c[1] = c[2] = c[3] = c[0]
        } else {
            if (a == 2) {
                c[2] = c[0];
                c[3] = c[1]
            } else {
                if (a == 3) {
                    c[3] = c[1]
                }
            }
        }
        return {
            top: parseInt(c[0], 10) || 0,
            right: parseInt(c[1], 10) || 0,
            bottom: parseInt(c[2], 10) || 0,
            left: parseInt(c[3], 10) || 0
        }
    },
    camelReplaceFn: function(b, c) {
        return c.charAt(1).toUpperCase()
    },
    normalize: function(a) {
        return this.propertyCache[a] || (this.propertyCache[a] = a == "float" ? "cssFloat" : a.replace(this.camelRe, this.camelReplaceFn))
    },
    getDocumentHeight: function() {
        return Math.max(!Ext.isStrict ? document.body.scrollHeight : document.documentElement.scrollHeight, this.getViewportHeight())
    },
    getDocumentWidth: function() {
        return Math.max(!Ext.isStrict ? document.body.scrollWidth : document.documentElement.scrollWidth, this.getViewportWidth())
    },
    getViewportHeight: function() {
        return window.innerHeight
    },
    getViewportWidth: function() {
        return window.innerWidth
    },
    getViewSize: function() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    },
    getOrientation: function() {
        return (window.innerHeight > window.innerWidth) ? "portrait" : "landscape"
    },
    fromPoint: function(a, b) {
        return Ext.get(document.elementFromPoint(a, b))
    }
});
Ext.Element.addMethods({
    getY: function(a) {
        return this.getXY(a)[1]
    },
    getX: function(a) {
        return this.getXY(a)[0]
    },
    getXY: function() {
        var a = window.webkitConvertPointFromNodeToPage(this.dom, new WebKitPoint(0, 0));
        return [a.x, a.y]
    },
    getOffsetsTo: function(a) {
        var c = this.getXY(),
            b = Ext.fly(a, "_internal").getXY();
        return [c[0] - b[0], c[1] - b[1]]
    },
    setXY: function(d) {
        var b = this;
        if (arguments.length > 1) {
            d = [d, arguments[1]]
        }
        var c = b.translatePoints(d),
            a = b.dom.style;
        for (d in c) {
            if (!isNaN(c[d])) {
                a[d] = c[d] + "px"
            }
        }
        return b
    },
    setX: function(a) {
        return this.setXY([a, this.getY()])
    },
    setY: function(a) {
        return this.setXY([this.getX(), a])
    },
    setLeft: function(a) {
        this.setStyle("left", Ext.Element.addUnits(a));
        return this
    },
    setTop: function(a) {
        this.setStyle("top", Ext.Element.addUnits(a));
        return this
    },
    setTopLeft: function(c, b) {
        var a = Ext.Element.addUnits;
        this.setStyle("top", a(c));
        this.setStyle("left", a(b));
        return this
    },
    setRight: function(a) {
        this.setStyle("right", Ext.Element.addUnits(a));
        return this
    },
    setBottom: function(a) {
        this.setStyle("bottom", Ext.Element.addUnits(a));
        return this
    },
    getLeft: function(a) {
        return parseInt(this.getStyle("left"), 10) || 0
    },
    getRight: function(a) {
        return parseInt(this.getStyle("right"), 10) || 0
    },
    getTop: function(a) {
        return parseInt(this.getStyle("top"), 10) || 0
    },
    getBottom: function(a) {
        return parseInt(this.getStyle("bottom"), 10) || 0
    },
    setBox: function(d, c, b, a) {
        var e;
        if (Ext.isObject(d)) {
            b = d.width;
            a = d.height;
            c = d.top;
            d = d.left
        }
        if (d !== e || c !== e || b !== e || a !== e) {
            if (d !== e) {
                this.setLeft(d)
            }
            if (c !== e) {
                this.setTop(c)
            }
            if (b !== e) {
                this.setWidth(b)
            }
            if (a !== e) {
                this.setHeight(a)
            }
        }
        return this
    },
    getBox: function(g, j) {
        var h = this,
            e = h.dom,
            c = e.offsetWidth,
            k = e.offsetHeight,
            n, f, d, a, m, i;
        if (!j) {
            n = h.getXY()
        } else {
            if (g) {
                n = [0, 0]
            } else {
                n = [parseInt(h.getStyle("left"), 10) || 0, parseInt(h.getStyle("top"), 10) || 0]
            }
        }
        if (!g) {
            f = {
                x: n[0],
                y: n[1],
                0: n[0],
                1: n[1],
                width: c,
                height: k
            }
        } else {
            d = h.getBorderWidth.call(h, "l") + h.getPadding.call(h, "l");
            a = h.getBorderWidth.call(h, "r") + h.getPadding.call(h, "r");
            m = h.getBorderWidth.call(h, "t") + h.getPadding.call(h, "t");
            i = h.getBorderWidth.call(h, "b") + h.getPadding.call(h, "b");
            f = {
                x: n[0] + d,
                y: n[1] + m,
                0: n[0] + d,
                1: n[1] + m,
                width: c - (d + a),
                height: k - (m + i)
            }
        }
        f.left = f.x;
        f.top = f.y;
        f.right = f.x + f.width;
        f.bottom = f.y + f.height;
        return f
    },
    getPageBox: function(e) {
        var g = this,
            c = g.dom,
            j = c.offsetWidth,
            f = c.offsetHeight,
            m = g.getXY(),
            k = m[1],
            a = m[0] + j,
            i = m[1] + f,
            d = m[0];
        if (e) {
            return new Ext.util.Region(k, a, i, d)
        } else {
            return {
                left: d,
                top: k,
                width: j,
                height: f,
                right: a,
                bottom: i
            }
        }
    },
    translatePoints: function(a, g) {
        g = isNaN(a[1]) ? g : a[1];
        a = isNaN(a[0]) ? a : a[0];
        var d = this,
            e = d.isStyle("position", "relative"),
            f = d.getXY(),
            b = parseInt(d.getStyle("left"), 10),
            c = parseInt(d.getStyle("top"), 10);
        b = !isNaN(b) ? b : (e ? 0 : d.dom.offsetLeft);
        c = !isNaN(c) ? c : (e ? 0 : d.dom.offsetTop);
        return {
            left: (a - f[0] + b),
            top: (g - f[1] + c)
        }
    }
});
(function() {
    Ext.Element.classReCache = {};
    var b = Ext.Element,
        a = document.defaultView;
    b.addMethods({
        marginRightRe: /marginRight/i,
        trimRe: /^\s+|\s+$/g,
        spacesRe: /\s+/,
        addClass: function(g) {
            var h = this,
                f, c, e, d = [];
            if (!Ext.isArray(g)) {
                if (g && !this.hasClass(g)) {
                    h.dom.className += " " + g
                }
            } else {
                for (f = 0, c = g.length; f < c; f++) {
                    e = g[f];
                    if (e && !h.hasClass(e)) {
                        d.push(e)
                    }
                }
                if (d.length) {
                    h.dom.className += " " + d.join(" ")
                }
            }
            return h
        },
        removeClass: function(h) {
            var j = this,
                g, d, c, f, e;
            if (!Ext.isArray(h)) {
                h = [h]
            }
            if (j.dom && j.dom.className) {
                e = j.dom.className.replace(this.trimRe, "").split(this.spacesRe);
                for (g = 0, c = h.length; g < c; g++) {
                    f = h[g];
                    if (typeof f == "string") {
                        f = f.replace(this.trimRe, "");
                        d = e.indexOf(f);
                        if (d != -1) {
                            e.splice(d, 1)
                        }
                    }
                }
                j.dom.className = e.join(" ")
            }
            return j
        },
        mask: function(h, d) {
            var f = this,
                g = f.dom,
                e = Ext.Element.data(g, "mask"),
                c;
            f.addClass("x-masked");
            if (f.getStyle("position") == "static") {
                f.addClass("x-masked-relative")
            }
            if (e) {
                e.remove()
            }
            c = f.createChild({
                cls: "x-mask" + (h ? " x-mask-transparent" : ""),
                html: d || ""
            });
            Ext.Element.data(g, "mask", c)
        },
        unmask: function() {
            var d = this,
                e = d.dom,
                c = Ext.Element.data(e, "mask");
            if (c) {
                c.remove();
                Ext.Element.data(e, "mask", undefined)
            }
            d.removeClass(["x-masked", "x-masked-relative"])
        },
        radioClass: function(f) {
            var g = this.dom.parentNode.childNodes,
                d;
            f = Ext.isArray(f) ? f : [f];
            for (var e = 0, c = g.length; e < c; e++) {
                d = g[e];
                if (d && d.nodeType == 1) {
                    Ext.fly(d, "_internal").removeClass(f)
                }
            }
            return this.addClass(f)
        },
        toggleClass: function(c) {
            return this.hasClass(c) ? this.removeClass(c) : this.addClass(c)
        },
        hasClass: function(c) {
            return c && (" " + this.dom.className + " ").indexOf(" " + c + " ") != -1
        },
        replaceClass: function(d, c) {
            return this.removeClass(d).addClass(c)
        },
        isStyle: function(c, d) {
            return this.getStyle(c) == d
        },
        getStyle: function(i) {
            var h = this.dom,
                d, g, f, c = Ext.platform,
                e = h.style;
            i = b.normalize(i);
            f = (a) ? a.getComputedStyle(h, "") : h.currentStyle;
            d = (f) ? f[i] : null;
            if (d && !c.correctRightMargin && this.marginRightRe.test(i) && e.position != "absolute" && d != "0px") {
                g = e.display;
                e.display = "inline-block";
                d = a.getComputedStyle(h, null)[i];
                e.display = g
            }
            d || (d = e[i]);
            if (!c.correctTransparentColor && d == "rgba(0, 0, 0, 0)") {
                d = "transparent"
            }
            return d
        },
        setStyle: function(f, e) {
            var c, d;
            if (typeof f == "string") {
                c = {};
                c[f] = e;
                f = c
            }
            for (d in f) {
                if (f.hasOwnProperty(d)) {
                    this.dom.style[b.normalize(d)] = f[d]
                }
            }
            return this
        },
        applyStyles: function(e) {
            if (e) {
                var d, c, f = this.dom;
                if (typeof e == "function") {
                    e = e.call()
                }
                if (typeof e == "string") {
                    e = e.trim().split(/\s*(?::|;)\s*/);
                    for (d = 0, c = e.length; d < c;) {
                        f.style[b.normalize(e[d++])] = e[d++]
                    }
                } else {
                    if (typeof e == "object") {
                        this.setStyle(e)
                    }
                }
            }
        },
        getHeight: function(d) {
            var e = this.dom,
                c = d ? (e.clientHeight - this.getPadding("tb")) : e.offsetHeight;
            return c > 0 ? c : 0
        },
        getWidth: function(c) {
            var e = this.dom,
                d = c ? (e.clientWidth - this.getPadding("lr")) : e.offsetWidth;
            return d > 0 ? d : 0
        },
        setWidth: function(c) {
            var d = this;
            d.dom.style.width = b.addUnits(c);
            return d
        },
        setHeight: function(c) {
            var d = this;
            d.dom.style.height = b.addUnits(c);
            return d
        },
        setSize: function(d, c) {
            var e = this;
            if (Ext.isObject(d)) {
                c = d.height;
                d = d.width
            }
            e.dom.style.width = b.addUnits(d);
            e.dom.style.height = b.addUnits(c);
            return e
        },
        getBorderWidth: function(c) {
            return this.sumStyles(c, b.borders)
        },
        getPadding: function(c) {
            return this.sumStyles(c, b.paddings)
        },
        getMargin: function(c) {
            return this.sumStyles(c, b.margins)
        },
        getViewSize: function() {
            var c = document,
                d = this.dom;
            if (d == c || d == c.body) {
                return {
                    width: b.getViewportWidth(),
                    height: b.getViewportHeight()
                }
            } else {
                return {
                    width: d.clientWidth,
                    height: d.clientHeight
                }
            }
        },
        getSize: function(d) {
            var c = this.dom;
            return {
                width: Math.max(0, d ? (c.clientWidth - this.getPadding("lr")) : c.offsetWidth),
                height: Math.max(0, d ? (c.clientHeight - this.getPadding("tb")) : c.offsetHeight)
            }
        },
        repaint: function() {
            var c = this.dom;
            this.addClass("x-repaint");
            c.style.background = "transparent none";
            setTimeout(function() {
                c.style.background = null;
                Ext.get(c).removeClass("x-repaint")
            }, 1);
            return this
        },
        getOuterWidth: function() {
            return this.getWidth() + this.getMargin("lr")
        },
        getOuterHeight: function() {
            return this.getHeight() + this.getMargin("tb")
        },
        sumStyles: function(h, g) {
            var j = 0,
                d = h.match(/\w/g),
                c = d.length,
                f, e;
            for (e = 0; e < c; e++) {
                f = d[e] && parseFloat(this.getStyle(g[d[e]])) || 0;
                if (f) {
                    j += Math.abs(f)
                }
            }
            return j
        }
    })
})();
Ext.Element.addMethods({
    findParent: function(h, g, c) {
        var e = this.dom,
            a = document.body,
            f = 0,
            d;
        g = g || 50;
        if (isNaN(g)) {
            d = Ext.getDom(g);
            g = Number.MAX_VALUE
        }
        while (e && e.nodeType == 1 && f < g && e != a && e != d) {
            if (Ext.DomQuery.is(e, h)) {
                return c ? Ext.get(e) : e
            }
            f++;
            e = e.parentNode
        }
        return null
    },
    findParentNode: function(d, c, a) {
        var b = Ext.fly(this.dom.parentNode, "_internal");
        return b ? b.findParent(d, c, a) : null
    },
    up: function(b, a) {
        return this.findParentNode(b, a, true)
    },
    select: function(a, b) {
        return Ext.Element.select(a, this.dom, b)
    },
    query: function(a) {
        return Ext.DomQuery.select(a, this.dom)
    },
    down: function(a, b) {
        var c = Ext.DomQuery.selectNode(a, this.dom);
        return b ? c : Ext.get(c)
    },
    child: function(a, b) {
        var d, c = this,
            e;
        e = Ext.get(c).id;
        e = e.replace(/[\.:]/g, "\\$0");
        d = Ext.DomQuery.selectNode("#" + e + " > " + a, c.dom);
        return b ? d : Ext.get(d)
    },
    parent: function(a, b) {
        return this.matchNode("parentNode", "parentNode", a, b)
    },
    next: function(a, b) {
        return this.matchNode("nextSibling", "nextSibling", a, b)
    },
    prev: function(a, b) {
        return this.matchNode("previousSibling", "previousSibling", a, b)
    },
    first: function(a, b) {
        return this.matchNode("nextSibling", "firstChild", a, b)
    },
    last: function(a, b) {
        return this.matchNode("previousSibling", "lastChild", a, b)
    },
    matchNode: function(b, e, a, c) {
        var d = this.dom[e];
        while (d) {
            if (d.nodeType == 1 && (!a || Ext.DomQuery.is(d, a))) {
                return !c ? Ext.get(d) : d
            }
            d = d[b]
        }
        return null
    }
});
Ext.Element.addMethods({
    appendChild: function(a) {
        return Ext.get(a).appendTo(this)
    },
    appendTo: function(a) {
        Ext.getDom(a).appendChild(this.dom);
        return this
    },
    insertBefore: function(a) {
        a = Ext.getDom(a);
        a.parentNode.insertBefore(this.dom, a);
        return this
    },
    insertAfter: function(a) {
        a = Ext.getDom(a);
        a.parentNode.insertBefore(this.dom, a.nextSibling);
        return this
    },
    insertFirst: function(b, a) {
        b = b || {};
        if (b.nodeType || b.dom || typeof b == "string") {
            b = Ext.getDom(b);
            this.dom.insertBefore(b, this.dom.firstChild);
            return !a ? Ext.get(b) : b
        } else {
            return this.createChild(b, this.dom.firstChild, a)
        }
    },
    insertSibling: function(e, c, d) {
        var f = this,
            b, a = (c || "before").toLowerCase() == "after",
            g;
        if (Ext.isArray(e)) {
            g = f;
            Ext.each(e, function(h) {
                b = Ext.fly(g, "_internal").insertSibling(h, c, d);
                if (a) {
                    g = b
                }
            });
            return b
        }
        e = e || {};
        if (e.nodeType || e.dom) {
            b = f.dom.parentNode.insertBefore(Ext.getDom(e), a ? f.dom.nextSibling : f.dom);
            if (!d) {
                b = Ext.get(b)
            }
        } else {
            if (a && !f.dom.nextSibling) {
                b = Ext.DomHelper.append(f.dom.parentNode, e, !d)
            } else {
                b = Ext.DomHelper[a ? "insertAfter" : "insertBefore"](f.dom, e, !d)
            }
        }
        return b
    },
    replace: function(a) {
        a = Ext.get(a);
        this.insertBefore(a);
        a.remove();
        return this
    },
    createChild: function(b, a, c) {
        b = b || {
            tag: "div"
        };
        if (a) {
            return Ext.DomHelper.insertBefore(a, b, c !== true)
        } else {
            return Ext.DomHelper[!this.dom.firstChild ? "overwrite" : "append"](this.dom, b, c !== true)
        }
    },
    wrap: function(a, b) {
        var c = Ext.DomHelper.insertBefore(this.dom, a || {
            tag: "div"
        }, !b);
        c.dom ? c.dom.appendChild(this.dom) : c.appendChild(this.dom);
        return c
    },
    insertHtml: function(b, c, a) {
        var d = Ext.DomHelper.insertHtml(b, this.dom, c);
        return a ? Ext.get(d) : d
    }
});
Ext.platform = {
    isWebkit: /webkit/i.test(Ext.userAgent),
    isPhone: /android|iphone/i.test(Ext.userAgent) && !(/ipad/i.test(Ext.userAgent)),
    isTablet: /ipad/i.test(Ext.userAgent),
    isChrome: /chrome/i.test(Ext.userAgent),
    isAndroidOS: /android/i.test(Ext.userAgent),
    isIPhoneOS: /iphone|ipad/i.test(Ext.userAgent),
    hasOrientationChange: ("onorientationchange" in window),
    hasTouch: ("ontouchstart" in window)
};
Ext.util.Observable = Ext.extend(Object, {
    isObservable: true,
    constructor: function(a) {
        var b = this,
            c = b.events;
        Ext.apply(b, a);
        if (b.listeners) {
            b.on(b.listeners);
            delete b.listeners
        }
        b.events = c || {}
    },
    filterOptRe: /^(?:scope|delay|buffer|single)$/,
    fireEvent: function() {
        var h = this,
            c = Ext.toArray(arguments),
            e = c[0].toLowerCase(),
            d = true,
            g = h.events[e],
            b = h.eventQueue,
            f;
        if (h.eventsSuspended === true && b) {
            b.push(c)
        } else {
            if (g && g.bubble && g.isEvent) {
                if (g.fire.apply(g, c.slice(1)) === false) {
                    return false
                }
                f = h.getBubbleTarget && h.getBubbleTarget();
                if (f && f.isObservable) {
                    if (!f.events[e] || !Ext.isObject(f.events[e]) || !f.events[e].bubble) {
                        f.enableBubble(e)
                    }
                    return f.fireEvent.apply(f, c)
                }
            } else {
                if (g && g.isEvent) {
                    c.shift();
                    d = g.fire.apply(g, c)
                }
            }
        }
        return d
    },
    addListener: function(b, d, c, g) {
        var f = this,
            a, e;
        if (Ext.isObject(b)) {
            g = b;
            for (b in g) {
                a = g[b];
                if (!f.filterOptRe.test(b)) {
                    f.addListener(b, a.fn || a, a.scope || g.scope, a.fn ? a : g)
                }
            }
        } else {
            b = b.toLowerCase();
            f.events[b] = f.events[b] || true;
            e = f.events[b] || true;
            if (Ext.isBoolean(e)) {
                f.events[b] = e = new Ext.util.Event(f, b)
            }
            e.addListener(d, c, Ext.isObject(g) ? g : {})
        }
    },
    removeListener: function(b, d, c) {
        var f = this,
            a, e;
        if (Ext.isObject(b)) {
            var g = b;
            for (b in g) {
                a = g[b];
                if (!f.filterOptRe.test(b)) {
                    f.removeListener(b, a.fn || a, a.scope || g.scope)
                }
            }
        } else {
            b = b.toLowerCase();
            e = f.events[b];
            if (e.isEvent) {
                e.removeListener(d, c)
            }
        }
    },
    purgeListeners: function() {
        var b = this.events,
            c, a;
        for (a in b) {
            c = b[a];
            if (c.isEvent) {
                c.clearListeners()
            }
        }
    },
    addEvents: function(e) {
        var d = this;
        d.events = d.events || {};
        if (Ext.isString(e)) {
            var b = arguments,
                c = b.length;
            while (c--) {
                d.events[b[c]] = d.events[b[c]] || true
            }
        } else {
            Ext.applyIf(d.events, e)
        }
    },
    hasListener: function(a) {
        var b = this.events[a];
        return b.isEvent === true && b.listeners.length > 0
    },
    suspendEvents: function(a) {
        this.eventsSuspended = true;
        if (a && !this.eventQueue) {
            this.eventQueue = []
        }
    },
    resumeEvents: function() {
        var a = this,
            b = a.eventQueue || [];
        a.eventsSuspended = false;
        delete a.eventQueue;
        Ext.each(b, function(c) {
            a.fireEvent.apply(a, c)
        })
    },
    relayEvents: function(d, a) {
        var c = this;

        function b(e) {
            return function() {
                return c.fireEvent.apply(c, [e].concat(Ext.toArray(arguments)))
            }
        }
        Ext.each(a, function(e) {
            c.events[e] = c.events[e] || true;
            d.on(e, b(e), c)
        })
    },
    enableBubble: function(a) {
        var b = this;
        if (!Ext.isEmpty(a)) {
            a = Ext.isArray(a) ? a : Ext.toArray(arguments);
            Ext.each(a, function(c) {
                c = c.toLowerCase();
                var d = b.events[c] || true;
                if (Ext.isBoolean(d)) {
                    d = new Ext.util.Event(b, c);
                    b.events[c] = d
                }
                d.bubble = true
            })
        }
    }
});
Ext.override(Ext.util.Observable, {
    on: Ext.util.Observable.prototype.addListener,
    un: Ext.util.Observable.prototype.removeListener
});
Ext.util.Observable.releaseCapture = function(a) {
    a.fireEvent = Ext.util.Observable.prototype.fireEvent
};
Ext.util.Observable.capture = function(c, b, a) {
    c.fireEvent = c.fireEvent.createInterceptor(b, a)
};
Ext.util.Observable.observe = function(a, b) {
    if (a) {
        if (!a.fireEvent) {
            Ext.applyIf(a, new Ext.util.Observable());
            Ext.util.Observable.capture(a.prototype, a.fireEvent, a)
        }
        if (typeof b == "object") {
            a.on(b)
        }
        return a
    }
};
Ext.util.Event = Ext.extend(Object, (function() {
    function b(e, f, g, d) {
        f.task = new Ext.util.DelayedTask();
        return function() {
            f.task.delay(g.buffer, e, d, Ext.toArray(arguments))
        }
    }
    function a(e, f, g, d) {
        return function() {
            var h = new Ext.util.DelayedTask();
            if (!f.tasks) {
                f.tasks = []
            }
            f.tasks.push(h);
            h.delay(g.delay || 10, e, d, Ext.toArray(arguments))
        }
    }
    function c(e, f, g, d) {
        return function() {
            f.ev.removeListener(f.fn, d);
            return e.apply(d, arguments)
        }
    }
    return {
        isEvent: true,
        constructor: function(e, d) {
            this.name = d;
            this.observable = e;
            this.listeners = []
        },
        addListener: function(f, e, d) {
            var g = this,
                h;
            e = e || g.observable;
            if (!g.isListening(f, e)) {
                h = g.createListener(f, e, d);
                if (g.firing) {
                    g.listeners = g.listeners.slice(0)
                }
                g.listeners.push(h)
            }
        },
        createListener: function(f, e, h) {
            h = h || {};
            e = e || this.observable;
            var g = {
                fn: f,
                scope: e,
                o: h,
                ev: this
            }, d = f;
            if (h.delay) {
                d = a(d, g, h, e)
            }
            if (h.buffer) {
                d = b(d, g, h, e)
            }
            if (h.single) {
                d = c(d, g, h, e)
            }
            g.fireFn = d;
            return g
        },
        findListener: function(h, g) {
            var f = this.listeners,
                d = f.length,
                j, e;
            while (d--) {
                j = f[d];
                if (j) {
                    e = j.scope;
                    if (j.fn == h && (e == g || e == this.observable)) {
                        return d
                    }
                }
            }
            return -1
        },
        isListening: function(e, d) {
            return this.findListener(e, d) !== -1
        },
        removeListener: function(g, f) {
            var h = this,
                e, i, d;
            if ((e = h.findListener(g, f)) != -1) {
                i = h.listeners[e];
                if (h.firing) {
                    h.listeners = h.listeners.slice(0)
                }
                if (i.task) {
                    i.task.cancel();
                    delete l.task
                }
                d = i.tasks && i.tasks.length;
                if (d) {
                    while (d--) {
                        i.tasks[d].cancel()
                    }
                    delete i.tasks
                }
                h.listeners.splice(e, 1);
                return true
            }
            return false
        },
        clearListeners: function() {
            var e = this.listeners,
                d = e.length;
            while (d--) {
                this.removeListener(e[d].fn, e[d].scope)
            }
        },
        fire: function() {
            var h = this,
                f = h.listeners,
                g = f.length,
                e, d, j;
            if (g > 0) {
                h.firing = true;
                for (e = 0; e < g; e++) {
                    j = f[e];
                    d = arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
                    if (j.o) {
                        d.push(j.o)
                    }
                    if (j && j.fireFn.apply(j.scope || h.observable, d) === false) {
                        return (h.firing = false)
                    }
                }
            }
            h.firing = false;
            return true
        }
    }
})());
Ext.EventManager = {
    optionsRe: /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|horizontal|vertical)$/,
    touchRe: /^(?:pinch|pinchstart|tap|doubletap|swipe|swipeleft|swiperight|scroll|scrollstart|scrollend|touchstart|touchmove|touchend|taphold|tapstart|tapcancel)$/i,
    windowId: "ext-window",
    documentId: "ext-document",
    addListener: function(b, a, e, d, g) {
        if (Ext.isObject(a)) {
            this.handleListenerConfig(b, a);
            return
        }
        var f = Ext.getDom(b);
        if (!f) {
            throw 'Error listening for "' + a + '". Element "' + b + "\" doesn't exist."
        }
        if (!e) {
            throw 'Error listening for "' + a + '". No handler function specified'
        }
        var h = this.touchRe.test(a);
        var c = this.createListenerWrap(f, a, e, d, g, h);
        this.getEventListenerCache(f, a).push({
            fn: e,
            wrap: c,
            scope: d
        });
        if (h) {
            Ext.TouchEventManager.addEventListener(f, a, c, g)
        } else {
            f.addEventListener(a, c, false)
        }
    },
    removeListener: function(g, k, m, n) {
        if (Ext.isObject(k)) {
            this.handleListenerConfig(g, k, true);
            return
        }
        var e = Ext.getDom(g),
            a = this.getEventListenerCache(e, k),
            h = a.length,
            f, c, b, d;
        while (h--) {
            c = a[h];
            if (c && (!m || c.fn == m) && (!n || c.scope === n)) {
                b = c.wrap;
                if (b.task) {
                    clearTimeout(b.task);
                    delete b.task
                }
                f = b.tasks && b.tasks.length;
                if (f) {
                    while (f--) {
                        clearTimeout(b.tasks[f])
                    }
                    delete b.tasks
                }
                if (this.touchRe.test(k)) {
                    Ext.TouchEventManager.removeEventListener(e, k, b)
                } else {
                    e.removeEventListener(k, b, false)
                }
                a.splice(h, 1)
            }
        }
    },
    removeAll: function(b) {
        var d = Ext.getDom(b),
            a = this.getElementEventCache(d),
            c;
        for (c in a) {
            this.removeListener(c)
        }
        Ext.cache[d.id].events = {}
    },
    purgeElement: function(d, e, b) {
        var f = Ext.getDom(d),
            c = 0,
            a;
        if (b) {
            this.removeListener(f, b)
        } else {
            this.removeAll(f)
        }
        if (e && f && f.childNodes) {
            for (a = d.childNodes.length; c < a; c++) {
                this.purgeElement(d.childNodes[c], e, b)
            }
        }
    },
    handleListenerConfig: function(d, b, a) {
        var c, e;
        for (c in b) {
            if (!this.optionsRe.test(c)) {
                e = b[c];
                if (Ext.isFunction(e)) {
                    this[(a ? "remove" : "add") + "Listener"](d, c, e, b.scope, b)
                } else {
                    this[(a ? "remove" : "add") + "Listener"](d, c, b.fn, b.scope, b)
                }
            }
        }
    },
    getId: function(a) {
        var b = true,
            c;
        a = Ext.getDom(a);
        if (a === document) {
            c = this.documentId
        } else {
            if (a === window) {
                c = this.windowId
            } else {
                c = Ext.id(a);
                b = false
            }
        }
        if (!Ext.cache[c]) {
            Ext.Element.addToCache(new Ext.Element(a), c);
            if (b) {
                Ext.cache[c].skipGarbageCollection = true
            }
        }
        return c
    },
    createListenerWrap: function(h, a, c, b, g, i) {
        g = !Ext.isObject(g) ? {} : g;
        var d = ["if(!window.Ext) {return;}"];
        if (i) {
            d.push("e = new Ext.TouchEventObjectImpl(e);")
        } else {
            if (g.buffer || g.delay) {
                d.push("e = new Ext.EventObjectImpl(e);")
            } else {
                d.push("e = Ext.EventObject.setEvent(e);")
            }
        }
        if (g.delegate) {
            d.push('var t = e.getTarget("' + g.delegate + '", this);');
            d.push("if(!t) {return;}")
        } else {
            d.push("var t = e.target;")
        }
        if (g.target) {
            d.push("if(e.target !== o.target) {return;}")
        }
        if (g.stopEvent) {
            d.push("e.stopEvent();")
        } else {
            if (g.preventDefault) {
                d.push("e.preventDefault();")
            }
            if (g.stopPropagation) {
                d.push("e.stopPropagation();")
            }
        }
        if (g.normalized) {
            d.push("e = e.browserEvent;")
        }
        if (g.buffer) {
            d.push("(wrap.task && clearTimeout(wrap.task));");
            d.push("wrap.task = setTimeout(function(){")
        }
        if (g.delay) {
            d.push("wrap.tasks = wrap.tasks || [];");
            d.push("wrap.tasks.push(setTimeout(function(){")
        }
        d.push("fn.call(scope || dom, e, t, o);");
        if (g.single) {
            d.push("Ext.EventManager.removeListener(dom, ename, fn, scope);")
        }
        if (g.delay) {
            d.push("}, " + g.delay + "));")
        }
        if (g.buffer) {
            d.push("}, " + g.buffer + ");")
        }
        var e = new Function("e", "o", "fn", "scope", "ename", "dom", "wrap", d.join("\n"));
        return function(f) {
            e.call(h, f, g, c, b, a, h, arguments.callee)
        }
    },
    getEventListenerCache: function(c, a) {
        var b = this.getElementEventCache(c);
        return b[a] || (b[a] = [])
    },
    getElementEventCache: function(b) {
        var a = Ext.cache[this.getId(b)];
        return a.events || (a.events = {})
    },
    onDocumentReady: function(d, c, b) {
        var f = this,
            g = f.readyEvent,
            e;
        if (Ext.isReady) {
            g || (g = new Ext.util.Event());
            g.addListener(d, c, b);
            g.fire();
            g.listeners = []
        } else {
            if (!g) {
                g = f.readyEvent = new Ext.util.Event();
                var a = function() {
                    Ext.isReady = true;
                    document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                    window.removeEventListener("load", arguments.callee, false);
                    if (e) {
                        clearInterval(e)
                    }
                    setTimeout(function() {
                        var i = Ext.Element.getViewportWidth(),
                            j = Ext.Element.getViewportHeight();
                        Ext.orientation = Ext.Element.getOrientation();
                        Ext.TouchEventManager.init();
                        g.fire({
                            orientation: Ext.orientation,
                            width: i,
                            height: j
                        });
                        g.listeners = []
                    }, 300)
                };
                document.addEventListener("DOMContentLoaded", a, false);
                if (Ext.platform.isWebKit) {
                    e = setInterval(function() {
                        if (/loaded|complete/.test(document.readyState)) {
                            clearInterval(e);
                            e = null;
                            a()
                        }
                    }, 10)
                }
                window.addEventListener("load", a, false)
            }
            b = b || {};
            b.delay = b.delay || 1;
            g.addListener(d, c, b)
        }
    },
    onWindowResize: function(c, b, a) {
        var e = this,
            f = e.resizeEvent;
        if (!f) {
            e.resizeEvent = f = new Ext.util.Event();
            var d = function() {
                f.fire(Ext.Element.getViewportWidth(), Ext.Element.getViewportHeight())
            };
            this.addListener(window, "resize", d, this)
        }
        f.addListener(c, b, a)
    },
    onOrientationChange: function(c, b, a) {
        var e = this,
            d = e.orientationEvent;
        if (!d) {
            e.orientationEvent = d = new Ext.util.Event();
            var f = function(k) {
                var g = Ext.Element.getViewportWidth(),
                    j = Ext.Element.getViewportHeight(),
                    i = Ext.Element.getOrientation();
                if (i != Ext.orientation) {
                    Ext.orientation = i;
                    d.fire(i, g, j)
                }
                return i
            };
            if (Ext.platform.hasOrientationChange && !Ext.platform.isAndroidOS) {
                this.addListener(window, "orientationchange", f, this, {
                    delay: 50
                })
            } else {
                this.addListener(window, "resize", f, this, {
                    buffer: 10
                })
            }
        }
        d.addListener(c, b, a)
    }
};
Ext.EventManager.on = Ext.EventManager.addListener;
Ext.EventManager.un = Ext.EventManager.removeListener;
Ext.onReady = Ext.EventManager.onDocumentReady;
Ext.EventObjectImpl = Ext.extend(Object, {
    constructor: function(a) {
        if (a) {
            this.setEvent(a.browserEvent || a)
        }
    },
    setEvent: function(c) {
        var b = this;
        if (c == b || (c && c.browserEvent)) {
            return c
        }
        b.browserEvent = c;
        if (c) {
            b.type = c.type;
            var a = c.target;
            b.target = a && a.nodeType == 3 ? a.parentNode : a;
            b.xy = [c.pageX, c.pageY];
            b.timestamp = c.timeStamp
        } else {
            b.target = null;
            b.xy = [0, 0]
        }
        return b
    },
    stopEvent: function() {
        this.stopPropagation();
        this.preventDefault()
    },
    preventDefault: function() {
        if (this.browserEvent) {
            this.browserEvent.preventDefault()
        }
    },
    stopPropagation: function() {
        if (this.browserEvent) {
            this.browserEvent.stopPropagation()
        }
    },
    getPageX: function() {
        return this.xy[0]
    },
    getPageY: function() {
        return this.xy[1]
    },
    getXY: function() {
        return this.xy
    },
    getTarget: function(b, c, a) {
        return b ? Ext.fly(this.target).findParent(b, c, a) : (a ? Ext.get(this.target) : this.target)
    },
    getTime: function() {
        return this.timestamp
    }
});
Ext.EventObject = new Ext.EventObjectImpl();
(function() {
    var a = function() {
        var f = Ext.getBody(),
            c = [];
        if (!f) {
            return false
        }
        var e = Ext.platform;
        if (e.isPhone) {
            c.push("x-phone")
        }
        if (e.isTablet) {
            c.push("x-tablet")
        }
        if (e.isTablet && e.isIPhoneOS) {
            c.push("x-ipad")
        }
        if (e.isIPhoneOS) {
            c.push("x-iphone-os")
        }
        if (e.isAndroidOS) {
            c.push("x-android-os")
        }
        if (c.length) {
            f.addClass(c)
        }
        var h = document.createElement("div"),
            g = document,
            b, d;
        h.innerHTML = '<div style="height:30px;width:50px;"><div style="height:20px;width:20px;"></div></div><div style="float:left;background-color:transparent;">';
        f.dom.appendChild(h);
        d = h.lastChild;
        e.correctRightMargin = true;
        e.correctTransparentColor = true;
        if ((b = g.defaultView)) {
            if (b.getComputedStyle(h.firstChild.firstChild, null).marginRight != "0px") {
                e.correctRightMargin = false
            }
            if (b.getComputedStyle(d, null).backgroundColor != "transparent") {
                e.correctTransparentColor = false
            }
        }
        e.cssFloat = !! d.style.cssFloat;
        f.dom.removeChild(h);
        return true
    };
    if (!a()) {
        Ext.onReady(a)
    }
})();
Ext.TouchEventManager = Ext.apply({}, {
    swipeThreshold: 35,
    scrollThreshold: 5,
    touchEndThreshold: 35,
    tapThreshold: 5,
    tapHoldInterval: 250,
    swipeTime: 1000,
    doubleTapThreshold: 800,
    multiTouchendThreshold: 50,
    init: function() {
        this.targets = {
            all: [],
            touchstart: [],
            touchmove: [],
            touchend: [],
            tap: [],
            tapstart: [],
            taphold: [],
            tapcancel: [],
            doubletap: [],
            swipe: [],
            scrollstart: [],
            scroll: [],
            scrollend: [],
            pinch: [],
            pinchstart: []
        };
        this.listeners = {};
        this.tracks = {};
        this.doubleTapTargets = {};
        this.pinchTargets = {};
        this.useTouch = Ext.platform.hasTouch && !Ext.platform.isChrome;
        if (this.useTouch) {
            document.addEventListener("touchstart", this.onTouchStart, false);
            document.addEventListener("touchmove", this.onTouchMove, false);
            document.addEventListener("touchend", this.onTouchEnd, false)
        } else {
            document.addEventListener("mousedown", this.onTouchStart, false);
            document.addEventListener("mousemove", this.onTouchMove, false);
            document.addEventListener("mouseup", this.onTouchEnd, false)
        }
    },
    onTouchStart: function(f) {
        var c = Ext.TouchEventManager,
            d = c.useTouch ? (f.touches || f.touch && [f.touch] || null) : [f],
            b = d.length,
            a;
        for (a = 0; a < b; a++) {
            c.startTrack(d[a], f)
        }
        c.multiTouch = b > 1
    },
    startTrack: function(d, g) {
        var i = this,
            h = (d.target.nodeType == 3) ? d.target.parentNode : d.target,
            k = h,
            f = i.targets,
            m = d.identifier != undefined ? d.identifier : "mouse",
            j, c, a, b;
        b = i.tracks[m] = {
            browserEvent: g,
            startTime: g.timeStamp,
            previousTime: g.timeStamp,
            startX: d.pageX,
            startY: d.pageY,
            previousX: d.pageX,
            previousY: d.pageY,
            touch: d,
            target: h,
            scrolling: false,
            end: false,
            move: false,
            targets: {},
            scrollBounds: {
                right: window.innerWidth,
                bottom: window.innerHeight
            }
        };
        if (Ext.platform.isAndroidOS) {
            if (!["input", "select", "textarea"].contains(h.tagName.toLowerCase())) {
                g.preventDefault();
                g.stopPropagation()
            }
        }
        while (k) {
            if (i.targets.all.indexOf(k) !== -1) {
                a = k.id;
                j = i.listeners[a];
                b.events = b.events || {};
                for (c in j) {
                    b.events[c] = b.events[c] || {};
                    b.events[c][a] = j[c];
                    b.events[c][a].dom = k;
                    b.targets[a] = j[c]
                }
            }
            k = k.parentNode
        }
        i.lastTouchId = m;
        if (b.events) {
            g = {
                time: g.timeStamp,
                pageX: d.pageX,
                pageY: d.pageY,
                touch: d,
                touches: g.touches ? g.touches : [g.touch],
                browserEvent: g
            };
            if (b.events.touchstart && i.fireListeners("touchstart", b, g) === false) {
                b.end = true;
                return
            }
            if (b.events.tapstart && i.fireListeners("tapstart", b, g) === false) {
                b.end = true;
                b.tap = true;
                return
            }
            if (b.events.taphold) {
                b.tapHoldIntervalId = setInterval(i.tapHoldHandler.createDelegate(b), i.tapHoldInterval);
                b.tap = true
            }
            if (b.events.tap || b.events.tapcancel || b.events.doubletap) {
                b.tap = true
            }
            b.move = b.end = true
        }
    },
    onTouchMove: function(H) {
        var L = Ext.TouchEventManager,
            y = L.useTouch ? H.changedTouches : [H],
            v = y.length,
            D, t, C, B;
        H.preventDefault();
        H.stopPropagation();
        for (D = 0; D < v; D++) {
            t = y[D];
            C = L.tracks[t.identifier != undefined ? t.identifier : "mouse"];
            if (!C || !C.move) {
                continue
            }
            var G = C.startX,
                F = C.startY,
                c = t.pageX,
                b = t.pageY,
                j = C.previousX,
                g = C.previousY,
                K = c - G,
                I = b - F,
                d = Math.abs(K),
                a = Math.abs(I),
                k = c - j,
                h = b - g,
                s = H.timeStamp,
                A = C.startTime,
                q = C.previousTime,
                o = s - A,
                z = s - q,
                p = H;
            if (C.tap && d >= L.tapThreshold || a >= L.tapThreshold) {
                if (C.events.taphold) {
                    clearInterval(C.tapHoldIntervalId);
                    C.tapHoldIntervalId = null;
                    delete C.events.taphold
                }
                if (C.events.tapcancel) {
                    L.fireListeners("tapcancel", C, {
                        originalEvent: H
                    });
                    delete C.events.tapcancel
                }
                if (C.events.doubletap) {
                    delete C.events.doubletap
                }
                delete C.events.tap;
                C.tap = false
            }
            H = {
                pageX: c,
                pageY: b,
                touches: p.touches,
                startX: G,
                startY: F,
                previousX: C.previousX,
                previousY: C.previousY,
                deltaX: K,
                deltaY: I,
                previousDeltaX: k,
                previousDeltaY: h,
                time: s,
                startTime: A,
                previousTime: q,
                deltaTime: o,
                previousDeltaTime: z,
                browserEvent: p
            };
            if (C.events.touchmove && L.fireListeners("touchmove", C, H) === false) {
                C.previousTime = s;
                C.previousX = c;
                C.previousY = b;
                C.previousDeltaX = k;
                C.previousDeltaY = h;
                continue
            }
            if (!C.scrolling && C.events.swipe) {
                if (a - d > 2 || o > L.swipeTime) {
                    delete C.events.swipe
                } else {
                    if (d > L.swipeThreshold && d > a) {
                        delete C.events.scroll;
                        delete C.events.scrollstart;
                        delete C.events.scrollend;
                        L.fireListeners("swipe", C, {
                            browserEvent: p,
                            direction: (K < 0) ? "left" : "right",
                            distance: d,
                            time: s,
                            deltaTime: o
                        });
                        delete C.events.swipe
                    }
                }
                continue
            }
            if (L.multiTouch && !C.scrolling && C.events.pinch) {
                var u, n, M, f = L.pinch;
                if (!C.pinching && !f) {
                    for (B in C.events.pinch) {
                        u = L.pinchTargets[B];
                        if (u && u != C) {
                            delete C.events.scroll;
                            delete C.events.scrollstart;
                            delete C.events.scrollend;
                            delete C.events.swipe;
                            delete u.events.scroll;
                            delete u.events.scrollstart;
                            delete u.events.scrollend;
                            delete u.events.swipe;
                            H = f = L.pinch = {
                                browserEvent: p,
                                touches: [C.touch, u.touch],
                                distance: Math.sqrt(Math.pow(Math.abs(C.touch.pageX - u.touch.pageX), 2) + Math.pow(Math.abs(C.touch.pageY - u.touch.pageY), 2))
                            };
                            C.pinching = u.pinching = true;
                            L.fireListeners("pinchstart", C, H);
                            f.previousDistance = f.distance;
                            f.previousScale = 1;
                            return
                        } else {
                            L.pinchTargets[B] = C
                        }
                    }
                }
                if (C.pinching && f) {
                    n = Math.sqrt(Math.pow(Math.abs(f.touches[0].pageX - f.touches[1].pageX), 2) + Math.pow(Math.abs(f.touches[0].pageY - f.touches[1].pageY), 2));
                    M = n / f.distance;
                    H = {
                        browserEvent: C.browserEvent,
                        time: s,
                        touches: f.touches,
                        scale: M,
                        deltaScale: M - 1,
                        previousScale: f.previousScale,
                        previousDeltaScale: M - f.previousScale,
                        distance: n,
                        deltaDistance: n - f.distance,
                        startDistance: f.distance,
                        previousDistance: f.previousDistance,
                        previousDeltaDistance: n - f.previousDistance
                    };
                    L.fireListeners("pinch", C, H);
                    f.previousScale = M;
                    f.previousDistance = n;
                    return
                }
            }
            if (C.events.scroll || C.events.scrollstart || C.events.scrollend) {
                if (!C.scrolling && (d >= L.scrollThreshold || a >= L.scrollThreshold)) {
                    C.scrolling = true;
                    delete C.events.swipe;
                    var J = C.targets,
                        m, r, w, E;
                    E = 0;
                    for (B in J) {
                        E++
                    }
                    if (E > 1) {
                        for (B in J) {
                            for (w = 0, E = J[B].length; w < E; w++) {
                                m = J[B][w].options;
                                if (!m) {
                                    continue
                                }
                                if (m && (m.vertical === true && m.horizontal === false && d >= a) || (m.vertical === false && m.horizontal === true && d <= a)) {
                                    for (r in C.events) {
                                        delete C.events[r][B]
                                    }
                                }
                            }
                        }
                    }
                    if (C.events.scrollstart) {
                        L.fireListeners("scrollstart", C, {
                            browserEvent: C.browserEvent,
                            time: s,
                            pageX: c,
                            pageY: b
                        })
                    }
                } else {
                    if (C.scrolling) {
                        L.fireListeners("scroll", C, H)
                    }
                }
            }
            if (!C.tap) {
                if (d > a) {
                    if (K > 0) {
                        if (C.scrollBounds.right - c < L.touchEndThreshold) {
                            L.onTouchEnd(p);
                            return
                        }
                    } else {
                        if (c < L.touchEndThreshold) {
                            L.onTouchEnd(p);
                            return
                        }
                    }
                } else {
                    if (I > 0) {
                        if (C.scrollBounds.bottom - b < L.touchEndThreshold) {
                            L.onTouchEnd(p);
                            return
                        }
                    } else {
                        if (b < L.touchEndThreshold) {
                            L.onTouchEnd(p);
                            return
                        }
                    }
                }
            }
            C.previousTime = s;
            C.previousX = c;
            C.previousY = b;
            C.previousDeltaX = k;
            C.previousDeltaY = h
        }
    },
    onTouchEnd: function(g) {
        var k = Ext.TouchEventManager,
            j = k.tracks,
            f = k.useTouch ? g.changedTouches : [g],
            h = f.length,
            c, a, d, m, b;
        for (d = 0; d < h; d++) {
            c = f[d];
            a = j[c.identifier != undefined ? c.identifier : "mouse"];
            if (!a || !a.end) {
                continue
            }
            b = {
                browserEvent: g,
                pageX: a.previousX,
                pageY: a.previousY,
                deltaX: a.previousX - a.startX,
                deltaY: a.previousY - a.startY,
                previousDeltaX: a.previousDeltaX,
                previousDeltaY: a.previousDeltaY,
                deltaTime: g.timeStamp - a.startTime,
                previousDeltaTime: g.timeStamp - a.previousTime,
                time: g.timeStamp
            };
            if (a.events.touchend && k.fireListeners("touchend", a, b) === false) {
                break
            }
            if (a.events.taphold) {
                clearInterval(a.tapHoldIntervalId);
                k.tapHoldIntervalId = null
            }
            if (a.scrolling && a.events.scrollend) {
                k.fireListeners("scrollend", a, b)
            } else {
                if (a.events.tap) {
                    k.fireListeners("tap", a, {
                        browserEvent: g,
                        time: g.timeStamp,
                        pageX: a.startX,
                        pageY: a.startY,
                        touch: a.touch
                    })
                }
            }
            if (a.events.doubletap && !k.multiTouch) {
                m = a.target.id;
                if (!k.doubleTapTargets[m]) {
                    k.doubleTapTargets[m] = g.timeStamp
                } else {
                    if (g.timeStamp - k.doubleTapTargets[m] <= k.doubleTapThreshold) {
                        k.fireListeners("doubletap", a, {
                            browserEvent: g,
                            time: g.timeStamp,
                            pageX: a.startX,
                            pageY: a.startY,
                            touch: a.touch
                        });
                        delete k.doubleTapTargets[m]
                    } else {
                        k.doubleTapTargets[m] = g.timeStamp
                    }
                }
            }
            delete j[c.identifier]
        }
        k.tracks = {};
        k.pinchTargets = {};
        k.pinch = null
    },
    tapHoldHandler: function() {
        var b = Ext.TouchEventManager,
            a = this,
            c = (new Date()).getTime();
        b.fireListeners("taphold", a, {
            time: c,
            startTime: a.startTime,
            deltaTime: c - a.startTime,
            pageX: a.startX,
            pageY: a.startY,
            touch: a.touch
        })
    },
    addEventListener: function(e, b, c, d) {
        if (!this.targets[b]) {
            return
        }
        if (!this.targets.all.contains(e)) {
            this.targets.all.push(e)
        }
        if (!this.targets[b].contains(e)) {
            this.targets[b].push(e)
        }
        var f = Ext.id(e),
            a;
        c.options = d;
        c.ename = b;
        this.listeners[f] = this.listeners[f] || {};
        this.listeners[f][b] = this.listeners[f][b] || [];
        this.listeners[f][b].push(c);
        for (f in this.tracks) {
            a = this.tracks[f];
            if (a && (e == document || e === a.target || Ext.get(e).contains(a.target))) {
                a.events[b] = a.events[b] || {};
                a.events[b][f] = a.events[b][f] || [];
                a.events[b][f].push(c);
                if (/touchmove|scroll|swipe|tap|doubletap/i.test(b)) {
                    a.move = true
                }
                if (/touchend|scrollend|tapcancel|tap|doubletap|/i.test(b)) {
                    a.end = true
                }
            }
        }
    },
    removeEventListener: function(f, b, d) {
        if (!this.targets[b]) {
            return
        }
        this.targets[b].remove(f);
        var g = Ext.id(f),
            c = this.listeners[g],
            e, a = false;
        if (c && c[b]) {
            c[b].remove(d);
            for (e in c) {
                a = true;
                break
            }
            if (!c[b].length) {
                delete c[b]
            }
            if (!a) {
                this.targets.all.remove(f);
                delete c[g]
            }
        }
    },
    fireListeners: function(d, b, h) {
        var m = Ext.TouchEventManager;
        h.type = d;
        h.target = b.target;
        h.touch = b.touch;
        h.identifier = b.touch.identifier;
        var g = b.events[d],
            j, n, c, a, f, k;
        if (g) {
            for (a in g) {
                n = g[a];
                for (f = 0, k = n.length; f < k; f++) {
                    c = n[f];
                    if (c.call(n.dom, h) === false || h.cancel === true) {
                        if (h.browserEvent) {
                            h.browserEvent.stopPropagation();
                            h.browserEvent.preventDefault()
                        }
                        return false
                    }
                }
            }
        }
        return true
    },
    createListenerWrap: Ext.EventManager.createListenerWrap
});
Ext.TouchEventObjectImpl = Ext.extend(Object, {
    constructor: function(a) {
        if (a) {
            this.setEvent(a)
        }
    },
    setEvent: function(a) {
        this.event = a;
        Ext.apply(this, a);
        return this
    },
    stopEvent: function() {
        this.stopPropagation();
        this.preventDefault()
    },
    stopPropagation: function() {
        this.event.cancel = true
    },
    preventDefault: function() {
        this.event.prevent = true
    },
    getTarget: function(b, c, a) {
        if (b) {
            return Ext.fly(this.target).findParent(b, c, a)
        } else {
            return a ? Ext.get(this.target) : this.target
        }
    }
});
Ext.TouchEventObject = new Ext.TouchEventObjectImpl();
Ext.util.OfflineDebug = function() {
    var e = ["uncached", "idle", "checking", "downloading", "updateready", "obsolete"],
        d = ["cached", "checking", "downloading", "error", "noupdate", "obsolete", "progress", "updateready"],
        c = window.applicationCache;
    var b = function(j) {
        var g = (navigator.onLine) ? "yes" : "no",
            f = e[c.status],
            h = j.type;
        var i = "online: " + g;
        i += ", event: " + h;
        i += ", status: " + f;
        if (h == "error" && navigator.onLine) {
            i += " There was an unknown error, check your Cache Manifest."
        }
        if (console && console.log) {
            console.log(i)
        }
    };
    for (var a = d.length - 1; a >= 0; a--) {
        c.addEventListener(d[a], b, false)
    }
    c.addEventListener("updateready", function(f) {
        if (e[cache.status] != "idle") {
            cache.swapCache();
            console.log("Swapped/updated the Cache Manifest.")
        }
    }, false);
    return {
        checkForUpdates: function() {
            c.update()
        }
    }
};
Ext.util.GeoLocation = Ext.extend(Ext.util.Observable, {
    coords: null,
    hasGeoLocation: false,
    autoUpdate: true,
    constructor: function(a) {
        a = a || {};
        Ext.apply(this, a);
        this.hasGeoLocation = !! navigator.geolocation;
        this.addEvents("beforeupdate", "update");
        Ext.util.GeoLocation.superclass.constructor.call(this);
        if (this.autoUpdate) {
            this.updateLocation()
        }
    },
    getLocation: function(c, a) {
        var b = this;
        if (b.hasGeoLocation && !b.coords) {
            b.updateLocation(c, a)
        } else {
            if (b.hasGeoLocation && c) {
                setTimeout(function() {
                    c.call(a || b, b.coords, b)
                }, 0)
            } else {
                if (c) {
                    setTimeout(function() {
                        c.call(a || b, null, b)
                    }, 0)
                }
            }
        }
    },
    updateLocation: function(c, a) {
        var b = this;
        if (b.hasGeoLocation) {
            b.fireEvent("beforeupdate", b);
            navigator.geolocation.getCurrentPosition(function(d) {
                b.coords = b.parseCoords(d);
                if (c) {
                    c.call(a || b, b.coords, b)
                }
                b.fireEvent("update", b.coords, b)
            })
        } else {
            setTimeout(function() {
                if (c) {
                    c.call(a || b, null, b)
                }
                b.fireEvent("update", false, b)
            }, 0)
        }
    },
    parseCoords: function(a) {
        return {
            latitude: a.coords.latitude,
            longitude: a.coords.longitude,
            original: a
        }
    }
});
Ext.util.MixedCollection = function(b, a) {
    this.items = [];
    this.map = {};
    this.keys = [];
    this.length = 0;
    this.addEvents("clear", "add", "replace", "remove", "sort");
    this.allowFunctions = b === true;
    if (a) {
        this.getKey = a
    }
    Ext.util.MixedCollection.superclass.constructor.call(this)
};
Ext.extend(Ext.util.MixedCollection, Ext.util.Observable, {
    allowFunctions: false,
    add: function(b, c) {
        if (arguments.length == 1) {
            c = arguments[0];
            b = this.getKey(c)
        }
        if (typeof b != "undefined" && b !== null) {
            var a = this.map[b];
            if (typeof a != "undefined") {
                return this.replace(b, c)
            }
            this.map[b] = c
        }
        this.length++;
        this.items.push(c);
        this.keys.push(b);
        this.fireEvent("add", this.length - 1, c, b);
        return c
    },
    getKey: function(a) {
        return a.id
    },
    addAll: function(e) {
        if (arguments.length > 1 || Ext.isArray(e)) {
            var b = arguments.length > 1 ? arguments : e;
            for (var d = 0, a = b.length; d < a; d++) {
                this.add(b[d])
            }
        } else {
            for (var c in e) {
                if (this.allowFunctions || typeof e[c] != "function") {
                    this.add(c, e[c])
                }
            }
        }
    },
    each: function(e, d) {
        var b = [].concat(this.items);
        for (var c = 0, a = b.length; c < a; c++) {
            if (e.call(d || b[c], b[c], c, a) === false) {
                break
            }
        }
    },
    eachKey: function(d, c) {
        for (var b = 0, a = this.keys.length; b < a; b++) {
            d.call(c || window, this.keys[b], this.items[b], b, a)
        }
    },
    replace: function(c, d) {
        if (arguments.length == 1) {
            d = arguments[0];
            c = this.getKey(d)
        }
        var a = this.map[c];
        if (typeof c == "undefined" || c === null || typeof a == "undefined") {
            return this.add(c, d)
        }
        var b = this.indexOfKey(c);
        this.items[b] = d;
        this.map[c] = d;
        this.fireEvent("replace", c, a, d);
        return d
    },
    find: function(d, c) {
        for (var b = 0, a = this.items.length; b < a; b++) {
            if (d.call(c || window, this.items[b], this.keys[b])) {
                return this.items[b]
            }
        }
        return null
    },
    insert: function(a, b, c) {
        if (arguments.length == 2) {
            c = arguments[1];
            b = this.getKey(c)
        }
        if (this.containsKey(b)) {
            this.suspendEvents();
            this.removeKey(b);
            this.resumeEvents()
        }
        if (a >= this.length) {
            return this.add(b, c)
        }
        this.length++;
        this.items.splice(a, 0, c);
        if (typeof b != "undefined" && b !== null) {
            this.map[b] = c
        }
        this.keys.splice(a, 0, b);
        this.fireEvent("add", a, c, b);
        return c
    },
    remove: function(a) {
        return this.removeAt(this.indexOf(a))
    },
    removeAt: function(a) {
        if (a < this.length && a >= 0) {
            this.length--;
            var c = this.items[a];
            this.items.splice(a, 1);
            var b = this.keys[a];
            if (typeof b != "undefined") {
                delete this.map[b]
            }
            this.keys.splice(a, 1);
            this.fireEvent("remove", c, b);
            return c
        }
        return false
    },
    removeKey: function(a) {
        return this.removeAt(this.indexOfKey(a))
    },
    getCount: function() {
        return this.length
    },
    indexOf: function(a) {
        return this.items.indexOf(a)
    },
    indexOfKey: function(a) {
        return this.keys.indexOf(a)
    },
    item: function(b) {
        var a = this.map[b],
            c = a !== undefined ? a : (typeof b == "number") ? this.items[b] : undefined;
        return !Ext.isFunction(c) || this.allowFunctions ? c : null
    },
    itemAt: function(a) {
        return this.items[a]
    },
    key: function(a) {
        return this.map[a]
    },
    contains: function(a) {
        return this.indexOf(a) != -1
    },
    containsKey: function(a) {
        return typeof this.map[a] != "undefined"
    },
    clear: function() {
        this.length = 0;
        this.items = [];
        this.keys = [];
        this.map = {};
        this.fireEvent("clear")
    },
    first: function() {
        return this.items[0]
    },
    last: function() {
        return this.items[this.length - 1]
    },
    _sort: function(j, a, h) {
        var d, e, b = String(a).toUpperCase() == "DESC" ? -1 : 1,
            g = [],
            k = this.keys,
            f = this.items;
        h = h || function(i, c) {
            return i - c
        };
        for (d = 0, e = f.length; d < e; d++) {
            g[g.length] = {
                key: k[d],
                value: f[d],
                index: d
            }
        }
        g.sort(function(i, c) {
            var m = h(i[j], c[j]) * b;
            if (m === 0) {
                m = (i.index < c.index ? -1 : 1)
            }
            return m
        });
        for (d = 0, e = g.length; d < e; d++) {
            f[d] = g[d].value;
            k[d] = g[d].key
        }
        this.fireEvent("sort", this)
    },
    sort: function(a, b) {
        this._sort("value", a, b)
    },
    getRange: function(e, a) {
        var b = this.items;
        if (b.length < 1) {
            return []
        }
        e = e || 0;
        a = Math.min(typeof a == "undefined" ? this.length - 1 : a, this.length - 1);
        var c, d = [];
        if (e <= a) {
            for (c = e; c <= a; c++) {
                d[d.length] = b[c]
            }
        } else {
            for (c = e; c >= a; c--) {
                d[d.length] = b[c]
            }
        }
        return d
    },
    filter: function(n, m, g, h, e) {
        if (Ext.isObject(n)) {
            n = [n]
        }
        if (Ext.isArray(n)) {
            var b = [];
            for (var f = 0, d = n.length; f < d; f++) {
                var a = n[f],
                    c = a.fn,
                    o = a.scope || this;
                if (typeof c != "function") {
                    c = this.createFilterFn(a.property, a.value, a.anyMatch, a.caseSensitive, a.exactMatch)
                }
                b.push({
                    fn: c,
                    scope: o
                })
            }
            var k = this.createMultipleFilterFn(b)
        } else {
            var k = this.createFilterFn(n, m, g, h, e)
        }
        return (k === false ? this : this.filterBy(k))
    },
    filterBy: function(f, e) {
        var g = new Ext.util.MixedCollection();
        g.getKey = this.getKey;
        var b = this.keys,
            d = this.items;
        for (var c = 0, a = d.length; c < a; c++) {
            if (f.call(e || this, d[c], b[c])) {
                g.add(b[c], d[c])
            }
        }
        return g
    },
    findIndex: function(c, b, e, d, a) {
        if (Ext.isEmpty(b, false)) {
            return -1
        }
        b = this.createValueMatcher(b, d, a);
        return this.findIndexBy(function(f) {
            return f && b.test(f[c])
        }, null, e)
    },
    findIndexBy: function(f, e, g) {
        var b = this.keys,
            d = this.items;
        for (var c = (g || 0), a = d.length; c < a; c++) {
            if (f.call(e || this, d[c], b[c])) {
                return c
            }
        }
        return -1
    },
    createFilterFn: function(d, c, e, a, b) {
        if (Ext.isEmpty(c, false)) {
            return false
        }
        c = this.createValueMatcher(c, e, a, b);
        return function(f) {
            return c.test(f[d])
        }
    },
    createMultipleFilterFn: function(a) {
        return function(b) {
            var h = true;
            for (var d = 0, c = a.length; d < c; d++) {
                var g = a[d],
                    f = g.fn,
                    e = g.scope;
                h = h && f.call(e, b);
                if (h !== true) {
                    break
                }
            }
            return h
        }
    },
    createValueMatcher: function(c, e, a, b) {
        if (!c.exec) {
            var d = Ext.escapeRe;
            c = String(c);
            if (e === true) {
                c = d(c)
            } else {
                c = "^" + d(c);
                if (b === true) {
                    c += "$"
                }
            }
            c = new RegExp(c, a ? "" : "i")
        }
        return c
    },
    clone: function() {
        var e = new Ext.util.MixedCollection();
        var b = this.keys,
            d = this.items;
        for (var c = 0, a = d.length; c < a; c++) {
            e.add(b[c], d[c])
        }
        e.getKey = this.getKey;
        return e
    }
});
Ext.util.MixedCollection.prototype.get = Ext.util.MixedCollection.prototype.item;
Ext.util.TapRepeater = Ext.extend(Ext.util.Observable, {
    constructor: function(b, a) {
        this.el = Ext.get(b);
        Ext.apply(this, a);
        this.addEvents("touchstart", "tap", "touchend");
        this.el.on({
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            scope: this
        });
        if (this.preventDefault || this.stopDefault) {
            this.el.on("tap", this.eventOptions, this)
        }
        Ext.util.TapRepeater.superclass.constructor.call(this)
    },
    interval: 10,
    delay: 250,
    preventDefault: true,
    stopDefault: false,
    timer: 0,
    eventOptions: function(a) {
        if (this.preventDefault) {
            a.preventDefault()
        }
        if (this.stopDefault) {
            a.stopEvent()
        }
    },
    destroy: function() {
        Ext.destroy(this.el);
        this.purgeListeners()
    },
    onTouchStart: function(a) {
        clearTimeout(this.timer);
        if (this.pressClass) {
            this.el.addClass(this.pressClass)
        }
        this.tapStartTime = new Date();
        this.fireEvent("touchstart", this, a);
        this.fireEvent("tap", this, a);
        if (this.accelerate) {
            this.delay = 400
        }
        this.timer = this.tap.defer(this.delay || this.interval, this, [a])
    },
    tap: function(a) {
        this.fireEvent("tap", this, a);
        this.timer = this.tap.defer(this.accelerate ? this.easeOutExpo(this.tapStartTime.getElapsed(), 400, -390, 12000) : this.interval, this, [a])
    },
    easeOutExpo: function(e, a, g, f) {
        return (e == f) ? a + g : g * (-Math.pow(2, -10 * e / f) + 1) + a
    },
    onTouchEnd: function(a) {
        clearTimeout(this.timer);
        this.el.removeClass(this.pressClass);
        this.fireEvent("touchend", this, a)
    }
});
Ext.util.Region = Ext.extend(Object, {
    constructor: function(d, f, a, c) {
        var e = this;
        e.top = d;
        e[1] = d;
        e.right = f;
        e.bottom = a;
        e.left = c;
        e[0] = c
    },
    contains: function(b) {
        var a = this;
        return (b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom)
    },
    intersect: function(g) {
        var f = this,
            d = Math.max(f.top, g.top),
            e = Math.min(f.right, g.right),
            a = Math.min(f.bottom, g.bottom),
            c = Math.max(f.left, g.left);
        if (a >= d && e >= c) {
            return new Ext.util.Region(d, e, a, c)
        } else {
            return false
        }
    },
    union: function(g) {
        var f = this,
            d = Math.min(f.top, g.top),
            e = Math.max(f.right, g.right),
            a = Math.max(f.bottom, g.bottom),
            c = Math.min(f.left, g.left);
        return new Ext.util.Region(d, e, a, c)
    },
    constrainTo: function(b) {
        var a = this;
        a.top = a.top.constrain(b.top, b.bottom);
        a.bottom = a.bottom.constrain(b.top, b.bottom);
        a.left = a.left.constrain(b.left, b.right);
        a.right = a.right.constrain(b.left, b.right);
        return a
    },
    adjust: function(d, f, a, c) {
        var e = this;
        e.top += d;
        e.left += c;
        e.right += f;
        e.bottom += a;
        return e
    }
});
Ext.util.Region.getRegion = function(a) {
    return Ext.fly(a).getPageBox(true)
};
Ext.CompositeElement = function(b, a) {
    this.elements = [];
    this.add(b, a);
    this.el = new Ext.Element.Flyweight()
};
Ext.CompositeElement.prototype = {
    isComposite: true,
    getElement: function(a) {
        var b = this.el;
        b.dom = a;
        b.id = a.id;
        return b
    },
    transformElement: function(a) {
        return Ext.getDom(a)
    },
    getCount: function() {
        return this.elements.length
    },
    add: function(d, b) {
        var e = this,
            f = e.elements;
        if (!d) {
            return this
        }
        if (typeof d == "string") {
            d = Ext.Element.selectorFunction(d, b)
        } else {
            if (d.isComposite) {
                d = d.elements
            } else {
                if (!Ext.isIterable(d)) {
                    d = [d]
                }
            }
        }
        for (var c = 0, a = d.length; c < a; ++c) {
            f.push(e.transformElement(d[c]))
        }
        return e
    },
    invoke: function(f, b) {
        var g = this,
            d = g.elements,
            a = d.length,
            h, c;
        for (c = 0; c < a; c++) {
            h = d[c];
            if (h) {
                Ext.Element.prototype[f].apply(g.getElement(h), b)
            }
        }
        return g
    },
    item: function(b) {
        var d = this,
            c = d.elements[b],
            a = null;
        if (c) {
            a = d.getElement(c)
        }
        return a
    },
    addListener: function(b, h, g, f) {
        var d = this.elements,
            a = d.length,
            c, j;
        for (c = 0; c < a; c++) {
            j = d[c];
            if (j) {
                Ext.EventManager.on(j, b, h, g || j, f)
            }
        }
        return this
    },
    each: function(f, d) {
        var g = this,
            c = g.elements,
            a = c.length,
            b, h;
        for (b = 0; b < a; b++) {
            h = c[b];
            if (h) {
                h = this.getElement(h);
                if (f.call(d || h, h, g, b)) {
                    break
                }
            }
        }
        return g
    },
    fill: function(a) {
        var b = this;
        b.elements = [];
        b.add(a);
        return b
    },
    filter: function(a) {
        var b = [],
            d = this,
            e = d.elements,
            c = Ext.isFunction(a) ? a : function(f) {
                return f.is(a)
            };
        d.each(function(h, f, g) {
            if (c(h, g) !== false) {
                b[b.length] = d.transformElement(h)
            }
        });
        d.elements = b;
        return d
    },
    first: function() {
        return this.item(0)
    },
    last: function() {
        return this.item(this.getCount() - 1)
    },
    contains: function(a) {
        return this.indexOf(a) != -1
    },
    indexOf: function(a) {
        return this.elements.indexOf(this.transformElement(a))
    },
    clear: function() {
        this.elements = []
    }
};
Ext.CompositeElement.prototype.on = Ext.CompositeElement.prototype.addListener;
(function() {
    var c, b = Ext.Element.prototype,
        a = Ext.CompositeElement.prototype;
    for (c in b) {
        if (Ext.isFunction(b[c])) {
            (function(d) {
                a[d] = a[d] || function() {
                    return this.invoke(d, arguments)
                }
            }).call(a, c)
        }
    }
})();
if (Ext.DomQuery) {
    Ext.Element.selectorFunction = Ext.DomQuery.select
}
Ext.Element.select = function(a, b, d) {
    var c;
    d = (d === false) ? false : true;
    if (typeof a == "string") {
        c = Ext.Element.selectorFunction(a, b)
    } else {
        if (a.length !== undefined) {
            c = a
        } else {
            throw "Invalid selector"
        }
    }
    return d ? new Ext.CompositeElement(c) : c
};
Ext.select = Ext.Element.select;
Ext.CompositeElementLite = Ext.CompositeElement;
Ext.apply(Ext.CompositeElementLite.prototype, {
    addElements: function(c, a) {
        if (!c) {
            return this
        }
        if (typeof c == "string") {
            c = Ext.Element.selectorFunction(c, a)
        }
        var b = this.elements;
        Ext.each(c, function(d) {
            b.push(Ext.get(d))
        });
        return this
    },
    first: function() {
        return this.item(0)
    },
    last: function() {
        return this.item(this.getCount() - 1)
    },
    contains: function(a) {
        return this.indexOf(a) != -1
    },
    removeElement: function(d, e) {
        var c = this,
            a = this.elements,
            b;
        Ext.each(d, function(f) {
            if ((b = (a[f] || a[f = c.indexOf(f)]))) {
                if (e) {
                    if (b.dom) {
                        b.remove()
                    } else {
                        Ext.removeNode(b)
                    }
                }
                a.splice(f, 1)
            }
        });
        return this
    },
    replaceElement: function(e, c, a) {
        var b = !isNaN(e) ? e : this.indexOf(e),
            f;
        if (b > -1) {
            c = Ext.getDom(c);
            if (a) {
                f = this.elements[b];
                f.parentNode.insertBefore(c, f);
                Ext.removeNode(f)
            }
            this.elements.splice(b, 1, c)
        }
        return this
    }
});
Ext.DomHelper = {
    emptyTags: /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,
    confRe: /tag|children|cn|html$/i,
    endRe: /end/i,
    markup: function(h) {
        var d = "",
            c, g, f, a, j;
        if (typeof h == "string") {
            d = h
        } else {
            if (Ext.isArray(h)) {
                for (var e = 0; e < h.length; e++) {
                    if (h[e]) {
                        d += this.markup(h[e])
                    }
                }
            } else {
                d += "<" + (h.tag = h.tag || "div");
                for (c in h) {
                    g = h[c];
                    if (!this.confRe.test(c)) {
                        if (typeof g == "object") {
                            d += " " + c + '="';
                            for (f in g) {
                                d += f + ":" + g[f] + ";"
                            }
                            d += '"'
                        } else {
                            d += " " + ({
                                cls: "class",
                                htmlFor: "for"
                            }[c] || c) + '="' + g + '"'
                        }
                    }
                }
                if (this.emptyTags.test(h.tag)) {
                    d += "/>"
                } else {
                    d += ">";
                    if ((j = h.children || h.cn)) {
                        d += this.markup(j)
                    } else {
                        if (h.html) {
                            d += h.html
                        }
                    }
                    d += "</" + h.tag + ">"
                }
            }
        }
        return d
    },
    applyStyles: function(d, e) {
        if (e) {
            var b = 0,
                a, c;
            d = Ext.fly(d);
            if (typeof e == "function") {
                e = e.call()
            }
            if (typeof e == "string") {
                e = e.trim().split(/\s*(?::|;)\s*/);
                for (a = e.length; b < a;) {
                    d.setStyle(e[b++], e[b++])
                }
            } else {
                if (Ext.isObject(e)) {
                    d.setStyle(e)
                }
            }
        }
    },
    insertHtml: function(f, a, g) {
        var e = {}, c, i, h, j, d, b;
        f = f.toLowerCase();
        e.beforebegin = ["BeforeBegin", "previousSibling"];
        e.afterend = ["AfterEnd", "nextSibling"];
        h = a.ownerDocument.createRange();
        i = "setStart" + (this.endRe.test(f) ? "After" : "Before");
        if (e[f]) {
            h[i](a);
            j = h.createContextualFragment(g);
            a.parentNode.insertBefore(j, f == "beforebegin" ? a : a.nextSibling);
            return a[(f == "beforebegin" ? "previous" : "next") + "Sibling"]
        } else {
            d = (f == "afterbegin" ? "first" : "last") + "Child";
            if (a.firstChild) {
                h[i](a[d]);
                j = h.createContextualFragment(g);
                if (f == "afterbegin") {
                    a.insertBefore(j, a.firstChild)
                } else {
                    a.appendChild(j)
                }
            } else {
                a.innerHTML = g
            }
            return a[d]
        }
        throw 'Illegal insertion point -> "' + f + '"'
    },
    insertBefore: function(a, c, b) {
        return this.doInsert(a, c, b, "beforebegin")
    },
    insertAfter: function(a, c, b) {
        return this.doInsert(a, c, b, "afterend", "nextSibling")
    },
    insertFirst: function(a, c, b) {
        return this.doInsert(a, c, b, "afterbegin", "firstChild")
    },
    append: function(a, c, b) {
        return this.doInsert(a, c, b, "beforeend", "", true)
    },
    overwrite: function(a, c, b) {
        a = Ext.getDom(a);
        a.innerHTML = this.markup(c);
        return b ? Ext.get(a.firstChild) : a.firstChild
    },
    doInsert: function(d, f, e, g, c, a) {
        var b = this.insertHtml(g, Ext.getDom(d), this.markup(f));
        return e ? Ext.get(b, true) : b
    }
};
Ext.DomQuery = {
    select: function(h, b) {
        var g = [],
            d, f, e, c, a;
        b = b || document;
        if (typeof b == "string") {
            b = document.getElementById(b)
        }
        h = h.split(",");
        for (f = 0, c = h.length; f < c; f++) {
            if (typeof h[f] == "string") {
                d = b.querySelectorAll(h[f]);
                for (e = 0, a = d.length; e < a; e++) {
                    g.push(d[e])
                }
            }
        }
        return g
    },
    selectNode: function(b, a) {
        return Ext.DomQuery.select(b, a)[0]
    },
    is: function(a, b) {
        if (typeof a == "string") {
            a = document.getElementById(a)
        }
        return Ext.DomQuery.select(b).indexOf(a) !== -1
    }
};
Ext.Element.selectorFunction = Ext.DomQuery.select;
Ext.query = Ext.DomQuery.select;
Ext.Anim = Ext.extend(Object, {
    isAnim: true,
    defaultConfig: {
        from: {},
        to: {},
        duration: 250,
        delay: 0,
        easing: "ease-in-out",
        autoClear: true,
        autoReset: false,
        autoShow: true,
        out: true,
        direction: null,
        reverse: false
    },
    opposites: {
        left: "right",
        right: "left",
        up: "down",
        down: "up"
    },
    constructor: function(a) {
        a = Ext.apply({}, a || {}, this.defaultConfig);
        this.config = a;
        Ext.Anim.superclass.constructor.call(this);
        this.running = []
    },
    initConfig: function(c, b) {
        var e = this,
            d = {}, a = Ext.apply({}, b || {}, e.config);
        a.el = c = Ext.get(c);
        if (a.reverse && e.opposites[a.direction]) {
            a.direction = e.opposites[a.direction]
        }
        if (e.config.before) {
            e.config.before.call(a, c, a)
        }
        if (b.before) {
            b.before.call(a.scope || a, c, a)
        }
        return a
    },
    run: function(c, a) {
        c = Ext.get(c);
        a = a || {};
        var d = this,
            b = c.dom.style,
            e, f = a.after;
        a = this.initConfig(c, a);
        if (d.running[c.id]) {
            c.un("webkitTransitionEnd", d.onTransitionEnd, d)
        }
        b.webkitTransitionDuration = "0ms";
        for (e in a.from) {
            b[e] = a.from[e]
        }
        setTimeout(function() {
            if (a.is3d === true) {
                c.parent().setStyle({
                    "-webkit-perspective": "1200",
                    "-webkit-transform-style": "preserve-3d"
                })
            }
            b.webkitTransitionDuration = a.duration + "ms";
            b.webkitTransitionProperty = "all";
            b.webkitTransitionTimingFunction = a.easing;
            c.on("webkitTransitionEnd", d.onTransitionEnd, d, {
                single: true,
                config: a,
                after: f
            });
            for (e in a.to) {
                b[e] = a.to[e]
            }
        }, a.delay || 5);
        d.running[c.id] = a;
        return d
    },
    onTransitionEnd: function(e, c, g) {
        c = Ext.get(c);
        var b = c.dom.style,
            a = g.config,
            f, d = this;
        if (a.autoClear) {
            for (f in a.to) {
                b[f] = ""
            }
        }
        b.webkitTransitionDuration = null;
        b.webkitTransitionProperty = null;
        b.webkitTransitionTimingFunction = null;
        if (a.is3d) {
            c.parent().setStyle({
                "-webkit-perspective": "",
                "-webkit-transform-style": ""
            })
        }
        if (d.config.after) {
            d.config.after.call(a, c, a)
        }
        if (g.after) {
            g.after.call(a.scope || d, c, a)
        }
        delete d.running[c.id]
    }
});
Ext.Anim.seed = 1000;
Ext.Anim.run = function(b, c, a) {
    if (b.isComponent) {
        b = b.el
    }
    if (c.isAnim) {
        c.run(b, a)
    } else {
        if (Ext.isObject(c)) {
            a = Ext.apply({}, a || {}, c);
            c = c.type
        }
        if (!Ext.anims[c]) {
            throw c + " is not a valid animation type."
        } else {
            Ext.anims[c].run(b, a)
        }
    }
};
Ext.anims = {
    fade: new Ext.Anim({
        before: function(b) {
            var c = 1,
                a = 1,
                e = b.getStyle("z-index") == "auto" ? 0 : b.getStyle("z-index"),
                d = e;
            if (this.out) {
                a = 0
            } else {
                d = e + 1;
                c = 0
            }
            this.from = {
                opacity: c,
                "z-index": d
            };
            this.to = {
                opacity: a,
                "z-index": d
            }
        }
    }),
    slide: new Ext.Anim({
        direction: "left",
        cover: false,
        reveal: false,
        before: function(b) {
            var a = b.getStyle("z-index") == "auto" ? 0 : b.getStyle("z-index"),
                e = a + 1,
                h = 0,
                f = 0,
                i = 0,
                g = 0,
                c = b.getHeight(),
                d = b.getWidth();
            if (this.direction == "left" || this.direction == "right") {
                if (this.out == true) {
                    h = -d
                } else {
                    i = d
                }
            } else {
                if (this.direction == "up" || this.direction == "down") {
                    if (this.out == true) {
                        f = -c
                    } else {
                        g = c
                    }
                }
            }
            if (this.direction == "right" || this.direction == "down") {
                f *= -1;
                h *= -1;
                g *= -1;
                i *= -1
            }
            if (this.cover && this.out) {
                h = 0;
                f = 0;
                e = a
            } else {
                if (this.reveal && !this.out) {
                    i = 0;
                    g = 0;
                    e = a
                }
            }
            this.from = {
                "-webkit-transform": "translate3d(" + i + "px, " + g + "px, 0)",
                "z-index": e,
                opacity: 0.99
            };
            this.to = {
                "-webkit-transform": "translate3d(" + h + "px, " + f + "px, 0)",
                "z-index": e,
                opacity: 1
            }
        }
    }),
    flip: new Ext.Anim({
        is3d: true,
        direction: "left",
        before: function(c) {
            var f = "Y",
                a = 1,
                b = 1,
                e = 0,
                d = 0;
            if (this.out) {
                d = -180;
                b = 0.8
            } else {
                e = 180;
                a = 0.8
            }
            if (this.direction == "up" || this.direction == "down") {
                f = "X"
            }
            if (this.direction == "right" || this.direction == "down") {
                d *= -1;
                e *= -1
            }
            this.from = {
                "-webkit-transform": "rotate" + f + "(" + e + "deg) scale(" + a + ")",
                "-webkit-backface-visibility": "hidden"
            };
            this.to = {
                "-webkit-transform": "rotate" + f + "(" + d + "deg) scale(" + b + ")",
                "-webkit-backface-visibility": "hidden"
            }
        }
    }),
    cube: new Ext.Anim({
        is3d: true,
        direction: "left",
        style: "outer",
        before: function(b) {
            var o = "0% 0%",
                p = 0,
                a = 0,
                k = "Y",
                h = 0,
                i = 0,
                m = 1,
                e = 1,
                g, f = b.getWidth(),
                d = b.getHeight(),
                n = true,
                c = " translateX(0)",
                j = "";
            if (this.direction == "left" || this.direction == "right") {
                if (this.out) {
                    o = "100% 100%";
                    i = f;
                    e = 0.5;
                    a = -90
                } else {
                    o = "0% 0%";
                    h = f;
                    m = 0.5;
                    p = 90
                }
            } else {
                if (this.direction == "up" || this.direction == "down") {
                    k = "X";
                    if (this.out) {
                        o = "100% 100%";
                        i = d;
                        a = 90
                    } else {
                        o = "0% 0%";
                        h = d;
                        p = -90
                    }
                }
            }
            if (this.direction == "down" || this.direction == "right") {
                p *= -1;
                a *= -1;
                o = (o == "0% 0%") ? "100% 100%" : "0% 0%"
            }
            if (this.style == "inner") {
                h *= -1;
                i *= -1;
                p *= -1;
                a *= -1;
                if (!this.out) {
                    j = " translateX(0px)";
                    o = "0% 50%"
                } else {
                    j = c;
                    o = "100% 50%"
                }
            }
            this.from = {
                "-webkit-transform": "rotate" + k + "(" + p + "deg)" + (n ? " translateZ(" + h + "px)" : "") + c,
                "-webkit-transform-origin": o
            };
            this.to = {
                "-webkit-transform": "rotate" + k + "(" + a + "deg) translateZ(" + i + "px)" + j,
                "-webkit-transform-origin": o
            }
        },
        duration: 250
    }),
    pop: new Ext.Anim({
        scaleOnExit: false,
        before: function(d) {
            var b = 1,
                c = 1,
                g = 1,
                a = 1,
                h = d.getStyle("z-index") == "auto" ? 0 : d.getStyle("z-index"),
                f = h,
                e = h;
            if (!this.out) {
                b = 0.01;
                f = h + 1;
                e = h + 1;
                g = 0
            } else {
                if (this.scaleOnExit) {
                    c = 0.01;
                    a = 0
                } else {
                    a = 0.8
                }
            }
            this.from = {
                "-webkit-transform": "scale(" + b + ")",
                "-webkit-transform-origin": "50% 50%",
                opacity: g,
                "z-index": f
            };
            this.to = {
                "-webkit-transform": "scale(" + c + ")",
                "-webkit-transform-origin": "50% 50%",
                opacity: a,
                "z-index": e
            }
        }
    }),
    wipe: new Ext.Anim({
        before: function(d) {
            var e = d.getStyle("z-index"),
                a = "",
                b = "100%",
                c = "100%";
            if (!this.out) {
                zindex = e + 1;
                a = "-webkit-gradient(linear, left bottom, right bottom, from(transparent), to(#000), color-stop(66%, #000), color-stop(33%, transparent))";
                b = d.getHeight() * 100 + "px";
                c = d.getHeight();
                this.from = {
                    "-webkit-mask-image": a,
                    "-webkit-mask-size": d.getWidth() * 3 + "px " + d.getHeight() + "px",
                    "z-index": zIndex,
                    "-webkit-mask-position-x": 0
                };
                this.to = {
                    "-webkit-mask-image": a,
                    "-webkit-mask-size": d.getWidth() * 3 + "px " + d.getHeight() + "px",
                    "z-index": zIndex,
                    "-webkit-mask-position-x": -d.getWidth() * 2 + "px"
                }
            }
        },
        duration: 500
    })
};
if (!this.JSON) {
    this.JSON = {}
}(function() {
    function f(n) {
        return n < 10 ? "0" + n : n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function(key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap,
            partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
            case "string":
                return quote(value);
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
            case "null":
                return String(value);
            case "object":
                if (!value) {
                    return "null"
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null"
                    }
                    v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === "string") {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v)
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                gap = mind;
                return v
        }
    }
    if (typeof JSON.stringify !== "function") {
        JSON.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function(text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}());
Ext.util.JSON = {
    encode: function(a) {
        return JSON.stringify(a)
    },
    decode: function(a) {
        return JSON.parse(a)
    }
};
Ext.encode = Ext.util.JSON.encode;
Ext.decode = Ext.util.JSON.decode;
Ext.util.JSONP = {
    queue: [],
    current: null,
    request: function(d) {
        d = d || {};
        if (!d.url) {
            return
        }
        var b = this;
        d.params = d.params || {};
        if (d.callbackKey) {
            d.params[d.callbackKey] = "Ext.util.JSONP.callback"
        }
        var c = Ext.urlEncode(d.params);
        var a = document.createElement("script");
        a.type = "text/javascript";
        this.queue.push({
            url: d.url,
            script: a,
            callback: d.callback || function() {},
            scope: d.scope || window,
            params: c || null
        });
        if (!this.current) {
            this.next()
        }
    },
    next: function() {
        this.current = null;
        if (this.queue.length) {
            this.current = this.queue.shift();
            this.current.script.src = this.current.url + (this.current.params ? ("?" + this.current.params) : "");
            document.getElementsByTagName("head")[0].appendChild(this.current.script)
        }
    },
    callback: function(a) {
        this.current.callback.call(this.current.scope, a);
        document.getElementsByTagName("head")[0].removeChild(this.current.script);
        this.next()
    }
};
Ext.util.Scroller = Ext.extend(Ext.util.Observable, {
    bounces: true,
    momentumResetTime: 400,
    friction: 0.3,
    acceleration: 25,
    momentum: true,
    horizontal: false,
    vertical: true,
    snap: false,
    scrollbars: true,
    fps: 60,
    springTension: 0.2,
    ui: "dark",
    scrollToEasing: "cubic-bezier(0.4, .75, 0.5, .95)",
    scrollToDuration: 500,
    preventActualScroll: false,
    translateOpen: Ext.platform.isAndroidOS ? "translate(" : "translate3d(",
    translateClose: Ext.platform.isAndroidOS ? ")" : ", 0px)",
    constructor: function(f, d) {
        var g = this;
        d = d || {};
        Ext.apply(g, d);
        g.addEvents("scrollstart", "scrollend", "scroll");
        Ext.util.Scroller.superclass.constructor.call(g);
        var a = g.scroller = Ext.get(f);
        a.addClass("x-scroller");
        g.parent = a.parent();
        g.parent.addClass("x-scroller-parent");
        g.offset = {
            x: 0,
            y: 0
        };
        g.omega = 1 - (g.friction / 10);
        g.parent.on({
            touchstart: g.onTouchStart,
            scrollstart: g.onScrollStart,
            scroll: g.onScroll,
            scrollend: g.onScrollEnd,
            horizontal: g.horizontal,
            vertical: g.vertical,
            scope: g
        });
        if (g.bounces !== false) {
            var e = g.bounces === "both" || g.bounces === true,
                b = e || g.bounces === "horizontal",
                c = e || g.bounces === "vertical";
            g.bounces = {
                horizontal: b,
                vertical: c
            }
        }
        if (g.scrollbars) {
            if (g.horizontal) {
                g.scrollbarX = new Ext.util.Scroller.Scrollbar(g, "horizontal")
            }
            if (g.vertical) {
                g.scrollbarY = new Ext.util.Scroller.Scrollbar(g, "vertical")
            }
        }
        g.scroller.on({
            webkitTransitionEnd: g.onTransitionEnd,
            scope: g
        })
    },
    onTouchStart: function(f) {
        var d = this,
            a = d.scroller,
            c = a.dom.style,
            b;
        if (!f || f.touches.length > 1) {
            return
        }
        d.updateBounds();
        d.followTouch = f.touch;
        if (d.animating) {
            clearInterval(d.scrollInterval);
            if (d.inTransition) {
                c.webkitTransitionDuration = "0ms";
                b = new WebKitCSSMatrix(window.getComputedStyle(a.dom).webkitTransform);
                c.webkitTransform = d.translateOpen + b.m41 + "px, " + b.m42 + "px" + d.translateClose;
                d.offset = {
                    x: b.m41,
                    y: b.m42
                };
                d.inTransition = false
            }
            d.snapToBounds(false);
            if (d.scrollbarX) {
                d.scrollbarX.stop()
            }
            if (d.scrollbarY) {
                d.scrollbarY.stop()
            }
            d.animating = false;
            d.fireEvent("scrollend", d, d.offset)
        }
        if (d.momentum) {
            d.resetMomentum(f)
        }
    },
    onScrollStart: function(c, a) {
        var b = this;
        if (!c || c.touch != b.followTouch) {
            return
        }
        if (b.momentum) {
            b.addMomentum(c)
        }
        b.fireEvent("scrollstart", c, b)
    },
    onScroll: function(b, i) {
        var d = this;
        if (!b || b.touch != d.followTouch) {
            return
        }
        b.stopEvent();
        var g = b.previousDeltaX,
            c = b.previousDeltaY,
            a = d.horizontal ? (d.offset.x + g) : 0,
            j = d.vertical ? (d.offset.y + c) : 0,
            h = d.constrainToBounds({
                x: a,
                y: j
            }),
            f;
        d.bouncing = false;
        if (d.bounces) {
            if (d.bounces.horizontal && h.x != a) {
                a = d.offset.x + (g / 2);
                d.bouncing = true
            } else {
                a = h.x
            }
            if (d.bounces.vertical && h.y != j) {
                j = d.offset.y + (c / 2);
                d.bouncing = true
            } else {
                j = h.y
            }
            f = {
                x: a,
                y: j
            }
        } else {
            f = h
        }
        d._scrollTo(f);
        if (d.momentum) {
            d.addMomentum(b)
        }
    },
    onScrollEnd: function(g, j) {
        var i = this;
        if (g.touch != i.followTouch) {
            return
        }
        if (i.momentum) {
            i.validateMomentum(g);
            if (i.momentumPoints.length > 1) {
                var b = i.momentumPoints,
                    f = b.shift(),
                    h = b.pop(),
                    a = {
                        x: h.offset.x - f.offset.x,
                        y: h.offset.y - f.offset.y
                    }, d = (h.time - f.time),
                    c = {
                        x: a.x / (d / i.acceleration),
                        y: a.y / (d / i.acceleration)
                    };
                i.applyVelocity(c)
            }
        }
        if (!i.animating) {
            i.snapToBounds(true)
        }
        if (!i.animating) {
            i.fireEvent("scrollend", i, i.offset)
        }
    },
    onTransitionEnd: function() {
        var a = this;
        if (a.inTransition) {
            a.scroller.dom.style.webkitTransitionDuration = "0ms";
            a.inTransition = false;
            a.fireEvent("scrollend", a, a.offset)
        }
    },
    scrollTo: function(e, a, d) {
        var c = this;
        e = c.constrainToBounds({
            x: Math.round(-e.x),
            y: Math.round(-e.y)
        });
        clearInterval(c.scrollInterval);
        if (a && !c.preventActualScroll) {
            c.animating = true;
            c.inTransition = true;
            var b = c.scroller.dom.style;
            b.webkitTransitionTimingFunction = d || c.scrollToEasing;
            b.webkitTransitionDuration = (typeof a == "number") ? (a + "ms") : (c.scrollToDuration + "ms");
            b.webkitTransform = c.translateOpen + e.x + "px, " + e.y + "px" + c.translateClose;
            c.offset = e;
            if (c.scrollbarX) {
                c.scrollbarX.scrollTo(e, a, d || c.scrollToEasing)
            }
            if (c.scrollbarY) {
                c.scrollbarY.scrollTo(e, a, d || c.scrollToEasing)
            }
        } else {
            c._scrollTo({
                x: e.x,
                y: e.y
            })
        }
    },
    _scrollTo: function(c) {
        var b = this;
        b.offset = {
            x: Math.round(c.x),
            y: Math.round(c.y)
        };
        if (!b.preventActualScroll) {
            var a = b.scroller.dom.style;
            a.webkitTransitionDuration = "0ms";
            a.webkitTransform = b.translateOpen + b.offset.x + "px, " + b.offset.y + "px" + b.translateClose;
            if (b.scrollbarX) {
                b.scrollbarX.scrollTo(b.offset)
            }
            if (b.scrollbarY) {
                b.scrollbarY.scrollTo(b.offset)
            }
        }
        b.fireEvent("scroll", b, b.getOffset())
    },
    getOffset: function() {
        return {
            x: -this.offset.x,
            y: -this.offset.y
        }
    },
    applyVelocity: function(d) {
        d = d || {
            x: 0,
            y: 0
        };
        var c = this,
            f = c.offset,
            b = (new Date()).getTime(),
            a = c.deceleration = {
                startTime: b,
                startOffset: {
                    x: f.x,
                    y: f.y
                },
                logFriction: Math.log(c.omega),
                velocity: d
            }, g = c.constrainToBounds(f),
            e = c.bounce = {};
        c.decelerating = true;
        c.bouncing = false;
        if (c.bounces) {
            if (c.bounces.horizontal && g.x != f.x) {
                e.horizontal = {
                    startTime: b - ((1 / c.springTension) * c.acceleration),
                    startOffset: g.x,
                    velocity: (f.x - g.x) * c.springTension * Math.E
                };
                d.x = 0
            }
            if (c.bounces.vertical && g.y != f.y) {
                e.vertical = {
                    startTime: b - ((1 / c.springTension) * c.acceleration),
                    startOffset: g.y,
                    velocity: (f.y - g.y) * c.springTension * Math.E
                };
                d.y = 0
            }
            c.bouncing = true
        }
        c.animating = true;
        c.decelerating = true;
        c.scrollInterval = setInterval(function() {
            c.handleScrollFrame()
        }, 1000 / this.fps)
    },
    handleScrollFrame: function() {
        var i = this,
            e = i.deceleration,
            n = i.bounce = i.bounce || {}, c = i.offset,
            a = (new Date()).getTime(),
            f = (a - e.startTime),
            k = Math.pow(i.omega, f / i.acceleration),
            d = {
                x: e.velocity.x * k,
                y: e.velocity.y * k
            }, h = {
                x: c.x,
                y: c.y
            }, b = {}, m, g, j;
        if (Math.abs(d.x) < 1 && Math.abs(d.y) < 1) {
            i.decelerating = false
        }
        if (!n.horizontal && Math.abs(d.x) >= 1) {
            b.x = ((e.velocity.x / e.logFriction) - (e.velocity.x * (k / e.logFriction)));
            h.x = e.startOffset.x - b.x
        }
        if (!n.vertical && Math.abs(d.y) >= 1) {
            b.y = ((e.velocity.y / e.logFriction) - (e.velocity.y * (k / e.logFriction)));
            h.y = e.startOffset.y - b.y
        }
        j = i.constrainToBounds(h);
        if (j.x != h.x) {
            if (i.bounces && i.bounces.horizontal) {
                if (!n.horizontal) {
                    n.horizontal = {
                        startTime: a,
                        startOffset: j.x,
                        velocity: d.x
                    };
                    i.bouncing = true
                }
            } else {
                h.x = j.x
            }
            e.velocity.x = 0
        }
        if (j.y != h.y) {
            if (i.bounces && i.bounces.vertical) {
                if (!n.vertical) {
                    n.vertical = {
                        startTime: a,
                        startOffset: j.y,
                        velocity: d.y
                    };
                    i.bouncing = true
                }
            } else {
                h.y = j.y
            }
            e.velocity.y = 0
        }
        if (n.horizontal && n.horizontal.startTime != a) {
            f = (a - n.horizontal.startTime);
            m = (f / i.acceleration) * Math.pow(Math.E, -i.springTension * (f / i.acceleration));
            b.x = n.horizontal.velocity * m;
            g = n.horizontal.startOffset;
            if (Math.abs(b.x) <= 1) {
                b.x = 0;
                delete n.horizontal
            }
            h.x = g + b.x
        }
        if (n.vertical && n.vertical.startTime != a) {
            f = (a - n.vertical.startTime);
            m = (f / i.acceleration) * Math.pow(Math.E, -i.springTension * (f / i.acceleration));
            b.y = n.vertical.velocity * m;
            g = n.vertical.startOffset;
            if (Math.abs(b.y) <= 1) {
                b.y = 0;
                delete n.vertical
            }
            h.y = g + b.y
        }
        if (!n.vertical && !n.horizontal) {
            i.bouncing = false
        }
        i._scrollTo(h);
        if ((!i.bounces || !i.bouncing) && !i.decelerating) {
            clearInterval(i.scrollInterval);
            i.animating = false;
            i.snapToBounds(false);
            i.fireEvent("scrollend", i, i.offset);
            return
        }
    },
    snapToBounds: function(a, d) {
        var b = this,
            c = b.constrainToBounds(b.offset);
        if (b.snap) {
            if (b.snap === true) {
                b.snap = {
                    x: 50,
                    y: 50
                }
            } else {
                if (Ext.isNumber(b.snap)) {
                    b.snap = {
                        x: b.snap,
                        y: b.snap
                    }
                }
            }
            if (b.snap.y) {
                c.y = Math.round(c.y / b.snap.y) * b.snap.y
            }
            if (b.snap.x) {
                c.x = Math.round(c.x / b.snap.x) * b.snap.x
            }
        }
        if (c.x != b.offset.x || c.y != b.offset.y) {
            if (b.snap) {
                b.scrollTo({
                    x: -c.x,
                    y: -c.y
                }, 150, "ease-in-out")
            } else {
                if (a) {
                    b.applyVelocity()
                } else {
                    b._scrollTo(c)
                }
            }
        }
    },
    updateBounds: function() {
        var a = this;
        a.parentSize = {
            width: a.parent.getWidth(true),
            height: a.parent.getHeight(true)
        };
        a.contentSize = {
            width: a.scroller.dom.scrollWidth,
            height: a.scroller.dom.scrollHeight
        };
        a.size = {
            width: Math.max(a.contentSize.width, a.parentSize.width),
            height: Math.max(a.contentSize.height, a.parentSize.height)
        };
        a.bounds = {
            x: a.parentSize.width - a.size.width,
            y: a.parentSize.height - a.size.height
        };
        if (a.scrollbarX) {
            a.scrollbarX.update()
        }
        if (a.scrollbarY) {
            a.scrollbarY.update()
        }
    },
    constrainToBounds: function(a) {
        if (!this.bounds) {
            this.updateBounds()
        }
        return {
            x: Math.min(Math.max(this.bounds.x, a.x), 0),
            y: Math.min(Math.max(this.bounds.y, a.y), 0)
        }
    },
    resetMomentum: function(a) {
        this.momentumPoints = [];
        if (a) {
            this.addMomentum(a)
        }
    },
    addMomentum: function(b) {
        var a = this;
        a.validateMomentum(b);
        a.momentumPoints.push({
            time: b.time,
            offset: {
                x: a.offset.x,
                y: a.offset.y
            }
        })
    },
    validateMomentum: function(c) {
        var a = this.momentumPoints,
            b = c.time;
        while (a.length) {
            if (b - a[0].time <= this.momentumResetTime) {
                break
            }
            a.shift()
        }
    },
    destroy: function() {
        var a = this;
        a.scroller.removeClass("x-scroller");
        a.parent.removeClass("x-scroller-parent");
        a.parent.un({
            touchstart: a.onTouchStart,
            scrollstart: a.onScrollStart,
            scrollend: a.onScrollEnd,
            scroll: a.onScroll,
            horizontal: a.horizontal,
            vertical: a.vertical,
            scope: a
        });
        clearInterval(a.scrollInterval);
        if (a.scrollbars) {
            if (a.horizontal) {
                a.scrollbarX.destroy()
            }
            if (a.vertical) {
                a.scrollbarY.destroy()
            }
        }
        a.scroller.un({
            DOMSubtreeModified: a.updateBounds,
            webkitTransitionEnd: a.onTransitionEnd,
            scope: a
        })
    }
});
Ext.util.Scroller.Scrollbar = Ext.extend(Object, {
    minSize: 4,
    size: 0,
    offset: 10,
    translateOpen: Ext.platform.isAndroidOS ? "translate(" : "translate3d(",
    translateClose: Ext.platform.isAndroidOS ? ")" : ", 0px)",
    constructor: function(a, c) {
        var b = this;
        b.scroller = a;
        b.container = a.parent;
        b.direction = c;
        b.bar = b.container.createChild({
            cls: "x-scrollbar x-scrollbar-" + c + " x-scrollbar-" + a.ui
        });
        b.bar.on("webkitTransitionEnd", this.onTransitionEnd, this);
        b.hide()
    },
    destroy: function() {
        this.bar.un("webkitTransitionEnd", this.onTransitionEnd, this);
        this.bar.remove()
    },
    update: function() {
        var e = this,
            b = e.scroller,
            g = b.contentSize,
            f = b.parentSize,
            c = b.size,
            a, d;
        if (e.direction == "vertical") {
            if (g.height > f.height) {
                e.size = Math.round((f.height * f.height) / c.height);
                e.autoShow = true
            } else {
                e.autoShow = false
            }
        } else {
            if (g.width > f.width) {
                e.size = Math.round((f.width * f.width) / c.width);
                e.autoShow = true
            } else {
                e.autoShow = false
            }
        }
    },
    scrollTo: function(f, b, d) {
        var e = this,
            c = e.scroller,
            a = e.bar.dom.style,
            i = 0,
            h = 0,
            j = e.size,
            g;
        if (!e.autoShow) {
            return
        }
        if (e.hidden) {
            e.show();
            e.hideTimeout = setTimeout(function() {
                e.hide()
            }, 1000)
        }
        if (e.direction == "horizontal") {
            if (c.bouncing) {
                g = c.constrainToBounds(f);
                j = Math.max(j - Math.abs(f.x - g.x), e.minSize);
                if (f.x > g.x) {
                    i = g.x + e.offset
                } else {
                    if (f.x < g.x) {
                        i = c.parentSize.width - j - e.offset
                    }
                }
                a.width = j + "px";
                e.resized = true
            } else {
                i = ((c.parentSize.width - j - (e.offset * 2)) / c.bounds.x * c.offset.x) + e.offset;
                if (e.resized == undefined || e.resized) {
                    a.width = j + "px";
                    e.resized = false
                }
            }
        } else {
            if (c.bouncing) {
                g = c.constrainToBounds(f);
                j = Math.max(j - Math.abs(f.y - g.y), e.minSize);
                if (f.y > g.y) {
                    h = g.y + e.offset
                } else {
                    if (f.y < g.y) {
                        h = c.parentSize.height - j - e.offset
                    }
                }
                a.height = j + "px";
                e.resized = true
            } else {
                h = ((c.parentSize.height - j - (e.offset * 2)) / c.bounds.y * c.offset.y) + e.offset;
                if (e.resized == undefined || e.resized) {
                    a.height = j + "px";
                    e.resized = false
                }
            }
        }
        if (b) {
            a.webkitTransitionDuration = (typeof b == "number" ? b : c.scrollToDuration) + "ms, 500ms";
            a.webkitTransitionTimingFunction = d;
            e.inTransition = true
        } else {
            a.webkitTransitionDuration = "0ms, 500ms";
            e.inTransition = false
        }
        a.webkitTransform = e.translateOpen + i + "px, " + h + "px" + this.translateClose
    },
    hide: function() {
        this.bar.setStyle("opacity", "0");
        this.hidden = true
    },
    show: function() {
        this.bar.setStyle("opacity", "1");
        this.hidden = false
    },
    onTransitionEnd: function() {
        this.inTransition = false
    },
    stop: function() {
        var c = this,
            b = c.bar.dom.style,
            a;
        if (this.inTransition) {
            b.webkitTransitionDuration = "0ms";
            a = new WebKitCSSMatrix(window.getComputedStyle(c.bar.dom).webkitTransform);
            b.webkitTransform = c.translateOpen + a.m41 + "px, " + a.m42 + "px" + c.translateClose
        }
    }
});
Ext.util.Draggable = Ext.extend(Ext.util.Observable, {
    baseCls: "x-draggable",
    dragCls: "x-dragging",
    proxyCls: "x-draggable-proxy",
    direction: "both",
    delay: 0,
    cancelSelector: null,
    disabled: false,
    revert: false,
    constrain: window,
    group: "base",
    grid: null,
    snap: null,
    proxy: null,
    stack: false,
    constrainRegion: null,
    dragging: false,
    vertical: false,
    horizontal: false,
    threshold: 0,
    constructor: function(b, a) {
        a = a || {};
        Ext.apply(this, a);
        this.addEvents("dragstart", "beforedragend", "dragend", "drag");
        this.el = Ext.get(b);
        Ext.util.Draggable.superclass.constructor.call(this);
        if (this.direction == "both") {
            this.horizontal = true;
            this.vertical = true
        } else {
            if (this.direction == "horizontal") {
                this.horizontal = true
            } else {
                this.vertical = true
            }
        }
        this.el.addClass(this.baseCls);
        this.tapEvent = (this.delay > 0) ? "taphold" : "tapstart";
        this.initialRegion = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };
        if (!this.disabled) {
            this.enable()
        }
    },
    onTapEvent: function(b, a) {
        if (Ext.platform.isAndroidOS) {
            b.browserEvent.preventDefault();
            b.browserEvent.stopPropagation()
        }
        if (this.cancelSelector && b.getTarget(this.cancelSelector)) {
            return
        }
        if (!this.dragging && (b.type === "tapstart" || b.deltaTime >= this.delay)) {
            this.canDrag = true
        }
    },
    prepareDrag: function(c) {
        this.reset();
        if (this.constrain) {
            if (this.constrain === window) {
                var a = window.innerWidth,
                    b = window.innerHeight;
                this.constrainRegion = new Ext.util.Region(0, a, b, 0)
            } else {
                this.constrainRegion = Ext.fly(this.constrain).getPageBox(true)
            }
        }
        this.startRegion = this.getProxyEl().getPageBox(true);
        this.offsetToCorner = {
            x: c.pageX - this.startRegion.left,
            y: c.pageY - this.startRegion.top
        }
    },
    onDragStart: function(a) {
        this.prepareDrag(a);
        if (!this.dragging) {
            this.el.addClass(this.dragCls);
            this.dragging = true;
            this.fireEvent("dragstart", this, a)
        }
    },
    onTouchMove: function(c) {
        c.stopEvent();
        if (!this.canDrag) {
            return
        }
        if (!this.dragging) {
            if (Math.abs(c.deltaX) >= this.threshold || Math.abs(c.deltaY) >= this.threshold) {
                this.onDragStart(c)
            } else {
                return
            }
        }
        var a = 0,
            f = 0,
            b = this.initialRegion,
            d = this.constrainRegion;
        if (this.horizontal) {
            a = c.pageX - this.initialRegion.left - this.offsetToCorner.x
        }
        if (this.vertical) {
            f = c.pageY - this.initialRegion.top - this.offsetToCorner.y
        }
        if (this.constrain) {
            if (b.left + a < d.left) {
                a = d.left - b.left
            }
            if (b.right + a > d.right) {
                a = d.right - b.right
            }
            if (b.top + f < d.top) {
                f = d.top - b.top
            }
            if (b.bottom + f > d.bottom) {
                f = d.bottom - b.bottom
            }
        }
        this.transformTo(a, f);
        this.fireEvent("drag", this, c)
    },
    transformTo: function(b, e) {
        var a = this.getProxyEl(),
            c = this.initialRegion,
            d = this.startPosition || {
                x: 0,
                y: 0
            };
        a.dom.style.webkitTransform = "translate3d(" + b + "px, " + e + "px, 0px)";
        this.transform = {
            x: b,
            y: e
        };
        this.position = {
            x: d.x + b,
            y: d.y + e
        };
        this.region = new Ext.util.Region(c.top + e, c.right + b, c.bottom + e, c.left + b)
    },
    moveTo: function(a, b) {
        this.transformTo(a - this.initialRegion.left, b - this.initialRegion.top)
    },
    reset: function() {
        var a = this.getProxyEl();
        this.startPosition = this.position = {
            x: a.getLeft() || 0,
            y: a.getTop() || 0
        };
        this.transformTo(0, 0);
        this.initialRegion = this.region = a.getPageBox(true);
        this.transform = {
            x: 0,
            y: 0
        }
    },
    onTouchEnd: function(d) {
        this.canDrag = false;
        this.dragging = false;
        this.fireEvent("beforedragend", this, d);
        var b = this.getProxyEl();
        if (this.revert && !this.cancelRevert && this.transform) {
            new Ext.Anim({
                from: {
                    "-webkit-transform": "translate3d(" + this.transform.x + "px, " + this.transform.y + "px, 0px)"
                },
                to: {
                    "-webkit-transform": "translate3d(0px, 0px, 0px)"
                },
                duration: 200
            }).run(b)
        } else {
            if (this.transform) {
                var c = b.dom.style,
                    a = this.position;
                c.webkitTransform = null;
                c.left = a.x + "px";
                c.top = a.y + "px"
            }
        }
        this.transform = this.startPosition = null;
        this.el.removeClass(this.dragCls);
        this.fireEvent("dragend", this, d)
    },
    enable: function() {
        this.el.on(this.tapEvent, this.onTapEvent, this, {
            horizontal: this.horizontal,
            vertical: this.vertical
        });
        this.el.on({
            touchmove: this.onTouchMove,
            touchend: this.onTouchEnd,
            scope: this
        });
        this.disabled = false
    },
    disable: function() {
        this.el.un(this.tapEvent, this.onTapEvent, this);
        this.disabled = true
    },
    destroy: function() {
        this.el.removeClass(this.baseCls);
        this.purgeListeners();
        this.el.un(this.tapEvent, this.onTapEvent, this);
        this.el.un({
            touchmove: this.onTouchMove,
            touchend: this.onTouchEnd,
            scope: this
        })
    },
    getProxyEl: function() {
        return this.proxy || this.el
    }
});
Ext.util.Droppable = Ext.extend(Ext.util.Observable, {
    baseCls: "x-droppable",
    activeCls: "x-drop-active",
    invalidCls: "x-drop-invalid",
    hoverCls: "x-drop-hover",
    validDropMode: "intersect",
    disabled: false,
    group: "base",
    tolerance: null,
    constructor: function(b, a) {
        a = a || {};
        Ext.apply(this, a);
        this.addEvents("dropactivate", "dropdeactivate", "dropenter", "dropleave", "drop");
        this.el = Ext.get(b);
        Ext.util.Droppable.superclass.constructor.call(this);
        if (!this.disabled) {
            this.enable()
        }
        this.el.addClass(this.baseCls)
    },
    onDragStart: function(a, b) {
        if (a.group === this.group) {
            this.monitoring = true;
            this.el.addClass(this.activeCls);
            this.region = this.el.getPageBox(true);
            a.on({
                drag: this.onDrag,
                beforedragend: this.onBeforeDragEnd,
                dragend: this.onDragEnd,
                scope: this
            });
            if (this.isDragOver(a)) {
                this.setCanDrop(true, a, b)
            }
            this.fireEvent("dropactivate", this, a, b)
        } else {
            a.on({
                dragend: function() {
                    this.el.removeClass(this.invalidCls)
                },
                scope: this,
                single: true
            });
            this.el.addClass(this.invalidCls)
        }
    },
    isDragOver: function(a, b) {
        return this.region[this.validDropMode](a.region)
    },
    onDrag: function(a, b) {
        this.setCanDrop(this.isDragOver(a), a, b)
    },
    setCanDrop: function(c, a, b) {
        if (c && !this.canDrop) {
            this.canDrop = true;
            this.el.addClass(this.hoverCls);
            this.fireEvent("dropenter", this, a, b)
        } else {
            if (!c && this.canDrop) {
                this.canDrop = false;
                this.el.removeClass(this.hoverCls);
                this.fireEvent("dropleave", this, a, b)
            }
        }
    },
    onBeforeDragEnd: function(a, b) {
        a.cancelRevert = this.canDrop
    },
    onDragEnd: function(a, b) {
        this.monitoring = false;
        this.el.removeClass(this.activeCls);
        a.un({
            drag: this.onDrag,
            beforedragend: this.onBeforeDragEnd,
            dragend: this.onDragEnd,
            scope: this
        });
        if (this.canDrop) {
            this.canDrop = false;
            this.el.removeClass(this.hoverCls);
            this.fireEvent("drop", this, a, b)
        }
        this.fireEvent("dropdeactivate", this, a, b)
    },
    enable: function() {
        if (!this.mgr) {
            this.mgr = Ext.util.Observable.observe(Ext.util.Draggable)
        }
        this.mgr.on({
            dragstart: this.onDragStart,
            scope: this
        });
        this.disabled = false
    },
    disable: function() {
        this.mgr.un({
            dragstart: this.onDragStart,
            scope: this
        });
        this.disabled = true
    }
});
Ext.util.Sortable = Ext.extend(Ext.util.Observable, {
    baseCls: "x-sortable",
    direction: "vertical",
    cancelSelector: null,
    constrain: window,
    group: "base",
    revert: true,
    itemSelector: null,
    handleSelector: null,
    disabled: false,
    delay: 0,
    sorting: false,
    vertical: false,
    horizontal: false,
    constructor: function(b, a) {
        a = a || {};
        Ext.apply(this, a);
        this.addEvents("sortstart", "sortend", "sortchange");
        this.el = Ext.get(b);
        Ext.util.Sortable.superclass.constructor.call(this);
        if (this.direction == "horizontal") {
            this.horizontal = true
        } else {
            if (this.direction == "vertical") {
                this.vertical = true
            } else {
                this.horizontal = this.vertical = true
            }
        }
        this.el.addClass(this.baseCls);
        this.tapEvent = (this.delay > 0) ? "taphold" : "tapstart";
        if (!this.disabled) {
            this.enable()
        }
    },
    onTapEvent: function(c, a) {
        if (this.cancelSelector && c.getTarget(this.cancelSelector)) {
            return
        }
        if (this.handleSelector && !c.getTarget(this.handleSelector)) {
            return
        }
        if (!this.sorting && (c.type === "tapstart" || c.deltaTime >= this.delay)) {
            var b = c.getTarget(this.itemSelector);
            if (b) {
                this.onSortStart(c, b)
            }
        }
    },
    onSortStart: function(c, b) {
        this.sorting = true;
        var a = new Ext.util.Draggable(b, {
            delay: this.delay,
            revert: this.revert,
            direction: this.direction,
            constrain: this.constrain === true ? this.el : this.constrain
        });
        a.on({
            drag: this.onDrag,
            dragend: this.onDragEnd,
            scope: this
        });
        this.dragEl = b;
        this.calculateBoxes();
        a.canDrag = true;
        this.fireEvent("sortstart", this, c)
    },
    calculateBoxes: function() {
        this.items = [];
        var b = this.el.select(this.itemSelector, false),
            f = b.length,
            a, e, c, d;
        for (a = 0; a < f; a++) {
            c = b[a];
            if (c != this.dragEl) {
                e = Ext.fly(c).getPageBox(true);
                e.el = c;
                this.items.push(e)
            }
        }
    },
    onDrag: function(m, c) {
        var g = this.items,
            f = g.length,
            h = m.region,
            d = false,
            b, a, j, k;
        for (b = 0; b < f; b++) {
            k = g[b];
            a = h.intersect(k);
            if (a) {
                if (this.vertical && Math.abs(a.top - a.bottom) > (h.bottom - h.top) / 2) {
                    if (h.bottom > k.top && k.top > h.top) {
                        m.el.insertAfter(k.el)
                    } else {
                        m.el.insertBefore(k.el)
                    }
                    d = true
                } else {
                    if (this.horizontal && Math.abs(a.left - a.right) > (h.right - h.left) / 2) {
                        if (h.right > k.left && k.left > h.left) {
                            m.el.insertAfter(k.el)
                        } else {
                            m.el.insertBefore(k.el)
                        }
                        d = true
                    }
                }
                if (d) {
                    m.reset();
                    m.moveTo(h.left, h.top);
                    this.calculateBoxes();
                    this.fireEvent("sortchange", this, m.el, this.el.select(this.itemSelector, false).indexOf(m.el.dom));
                    return
                }
            }
        }
    },
    onDragEnd: function(a, b) {
        a.destroy();
        this.sorting = false;
        this.fireEvent("sortend", this, a, b)
    },
    enable: function() {
        this.el.on(this.tapEvent, this.onTapEvent, this);
        this.disabled = false
    },
    disable: function() {
        this.el.un(this.tapEvent, this.onTapEvent, this);
        this.disabled = true
    }
});
Ext.util.Format = function() {
    return {
        defaultDateFormat: "m/d/Y",
        ellipsis: function(c, a, d) {
            if (c && c.length > a) {
                if (d) {
                    var e = c.substr(0, a - 2),
                        b = Math.max(e.lastIndexOf(" "), e.lastIndexOf("."), e.lastIndexOf("!"), e.lastIndexOf("?"));
                    if (b == -1 || b < (a - 15)) {
                        return c.substr(0, a - 3) + "..."
                    } else {
                        return e.substr(0, b) + "..."
                    }
                } else {
                    return c.substr(0, a - 3) + "..."
                }
            }
            return c
        },
        htmlEncode: function(a) {
            return !a ? a : String(a).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
        },
        htmlDecode: function(a) {
            return !a ? a : String(a).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
        },
        date: function(a, b) {
            if (!a) {
                return ""
            }
            if (!Ext.isDate(a)) {
                a = new Date(Date.parse(a))
            }
            return a.dateFormat(b || Ext.util.Format.defaultDateFormat)
        }
    }
}();
(function() {
    Date.useStrict = false;

    function b(d) {
        var c = Array.prototype.slice.call(arguments, 1);
        return d.replace(/\{(\d+)\}/g, function(e, f) {
            return c[f]
        })
    }
    Date.formatCodeToRegex = function(d, c) {
        var e = Date.parseCodes[d];
        if (e) {
            e = typeof e == "function" ? e() : e;
            Date.parseCodes[d] = e
        }
        return e ? Ext.applyIf({
            c: e.c ? b(e.c, c || "{0}") : e.c
        }, e) : {
            g: 0,
            c: null,
            s: Ext.escapeRe(d)
        }
    };
    var a = Date.formatCodeToRegex;
    Ext.apply(Date, {
        parseFunctions: {
            "M$": function(d, c) {
                var e = new RegExp("\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/");
                var f = (d || "").match(e);
                return f ? new Date(((f[1] || "") + f[2]) * 1) : null
            }
        },
        parseRegexes: [],
        formatFunctions: {
            "M$": function() {
                return "\\/Date(" + this.getTime() + ")\\/"
            }
        },
        y2kYear: 50,
        MILLI: "ms",
        SECOND: "s",
        MINUTE: "mi",
        HOUR: "h",
        DAY: "d",
        MONTH: "mo",
        YEAR: "y",
        defaults: {},
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNumbers: {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11
        },
        getShortMonthName: function(c) {
            return Date.monthNames[c].substring(0, 3)
        },
        getShortDayName: function(c) {
            return Date.dayNames[c].substring(0, 3)
        },
        getMonthNumber: function(c) {
            return Date.monthNumbers[c.substring(0, 1).toUpperCase() + c.substring(1, 3).toLowerCase()]
        },
        formatCodes: {
            d: "String.leftPad(this.getDate(), 2, '0')",
            D: "Date.getShortDayName(this.getDay())",
            j: "this.getDate()",
            l: "Date.dayNames[this.getDay()]",
            N: "(this.getDay() ? this.getDay() : 7)",
            S: "this.getSuffix()",
            w: "this.getDay()",
            z: "this.getDayOfYear()",
            W: "String.leftPad(this.getWeekOfYear(), 2, '0')",
            F: "Date.monthNames[this.getMonth()]",
            m: "String.leftPad(this.getMonth() + 1, 2, '0')",
            M: "Date.getShortMonthName(this.getMonth())",
            n: "(this.getMonth() + 1)",
            t: "this.getDaysInMonth()",
            L: "(this.isLeapYear() ? 1 : 0)",
            o: "(this.getFullYear() + (this.getWeekOfYear() == 1 && this.getMonth() > 0 ? +1 : (this.getWeekOfYear() >= 52 && this.getMonth() < 11 ? -1 : 0)))",
            Y: "this.getFullYear()",
            y: "('' + this.getFullYear()).substring(2, 4)",
            a: "(this.getHours() < 12 ? 'am' : 'pm')",
            A: "(this.getHours() < 12 ? 'AM' : 'PM')",
            g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
            G: "this.getHours()",
            h: "String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
            H: "String.leftPad(this.getHours(), 2, '0')",
            i: "String.leftPad(this.getMinutes(), 2, '0')",
            s: "String.leftPad(this.getSeconds(), 2, '0')",
            u: "String.leftPad(this.getMilliseconds(), 3, '0')",
            O: "this.getGMTOffset()",
            P: "this.getGMTOffset(true)",
            T: "this.getTimezone()",
            Z: "(this.getTimezoneOffset() * -60)",
            c: function() {
                for (var j = "Y-m-dTH:i:sP", g = [], f = 0, d = j.length; f < d; ++f) {
                    var h = j.charAt(f);
                    g.push(h == "T" ? "'T'" : Date.getFormatCode(h))
                }
                return g.join(" + ")
            },
            U: "Math.round(this.getTime() / 1000)"
        },
        isValid: function(o, c, n, j, f, g, e) {
            j = j || 0;
            f = f || 0;
            g = g || 0;
            e = e || 0;
            var k = new Date(o, c - 1, n, j, f, g, e);
            return o == k.getFullYear() && c == k.getMonth() + 1 && n == k.getDate() && j == k.getHours() && f == k.getMinutes() && g == k.getSeconds() && e == k.getMilliseconds()
        },
        parseDate: function(d, f, c) {
            var e = Date.parseFunctions;
            if (e[f] == null) {
                Date.createParser(f)
            }
            return e[f](d, Ext.isDefined(c) ? c : Date.useStrict)
        },
        getFormatCode: function(d) {
            var c = Date.formatCodes[d];
            if (c) {
                c = typeof c == "function" ? c() : c;
                Date.formatCodes[d] = c
            }
            return c || ("'" + String.escape(d) + "'")
        },
        createFormat: function(g) {
            var f = [],
                c = false,
                e = "";
            for (var d = 0; d < g.length; ++d) {
                e = g.charAt(d);
                if (!c && e == "\\") {
                    c = true
                } else {
                    if (c) {
                        c = false;
                        f.push("'" + String.escape(e) + "'")
                    } else {
                        f.push(Date.getFormatCode(e))
                    }
                }
            }
            Date.formatFunctions[g] = new Function("return " + f.join("+"))
        },
        createParser: function() {
            var c = ["var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,", "def = Date.defaults,", "results = String(input).match(Date.parseRegexes[{0}]);", "if(results){", "{1}", "if(u != null){", "v = new Date(u * 1000);", "}else{", "dt = (new Date()).clearTime();", "y = Ext.num(y, Ext.num(def.y, dt.getFullYear()));", "m = Ext.num(m, Ext.num(def.m - 1, dt.getMonth()));", "d = Ext.num(d, Ext.num(def.d, dt.getDate()));", "h  = Ext.num(h, Ext.num(def.h, dt.getHours()));", "i  = Ext.num(i, Ext.num(def.i, dt.getMinutes()));", "s  = Ext.num(s, Ext.num(def.s, dt.getSeconds()));", "ms = Ext.num(ms, Ext.num(def.ms, dt.getMilliseconds()));", "if(z >= 0 && y >= 0){", "v = new Date(y, 0, 1, h, i, s, ms);", "v = !strict? v : (strict === true && (z <= 364 || (v.isLeapYear() && z <= 365))? v.add(Date.DAY, z) : null);", "}else if(strict === true && !Date.isValid(y, m + 1, d, h, i, s, ms)){", "v = null;", "}else{", "v = new Date(y, m, d, h, i, s, ms);", "}", "}", "}", "if(v){", "if(zz != null){", "v = v.add(Date.SECOND, -v.getTimezoneOffset() * 60 - zz);", "}else if(o){", "v = v.add(Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));", "}", "}", "return v;"].join("\n");
            return function(m) {
                var e = Date.parseRegexes.length,
                    n = 1,
                    f = [],
                    k = [],
                    j = false,
                    d = "";
                for (var h = 0; h < m.length; ++h) {
                    d = m.charAt(h);
                    if (!j && d == "\\") {
                        j = true
                    } else {
                        if (j) {
                            j = false;
                            k.push(String.escape(d))
                        } else {
                            var g = a(d, n);
                            n += g.g;
                            k.push(g.s);
                            if (g.g && g.c) {
                                f.push(g.c)
                            }
                        }
                    }
                }
                Date.parseRegexes[e] = new RegExp("^" + k.join("") + "$");
                Date.parseFunctions[m] = new Function("input", "strict", b(c, e, f.join("")))
            }
        }(),
        parseCodes: {
            d: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
            },
            j: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,2})"
            },
            D: function() {
                for (var c = [], d = 0; d < 7; c.push(Date.getShortDayName(d)), ++d) {}
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + c.join("|") + ")"
                }
            },
            l: function() {
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + Date.dayNames.join("|") + ")"
                }
            },
            N: {
                g: 0,
                c: null,
                s: "[1-7]"
            },
            S: {
                g: 0,
                c: null,
                s: "(?:st|nd|rd|th)"
            },
            w: {
                g: 0,
                c: null,
                s: "[0-6]"
            },
            z: {
                g: 1,
                c: "z = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,3})"
            },
            W: {
                g: 0,
                c: null,
                s: "(?:\\d{2})"
            },
            F: function() {
                return {
                    g: 1,
                    c: "m = parseInt(Date.getMonthNumber(results[{0}]), 10);\n",
                    s: "(" + Date.monthNames.join("|") + ")"
                }
            },
            M: function() {
                for (var c = [], d = 0; d < 12; c.push(Date.getShortMonthName(d)), ++d) {}
                return Ext.applyIf({
                    s: "(" + c.join("|") + ")"
                }, a("F"))
            },
            m: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(\\d{2})"
            },
            n: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(\\d{1,2})"
            },
            t: {
                g: 0,
                c: null,
                s: "(?:\\d{2})"
            },
            L: {
                g: 0,
                c: null,
                s: "(?:1|0)"
            },
            o: function() {
                return a("Y")
            },
            Y: {
                g: 1,
                c: "y = parseInt(results[{0}], 10);\n",
                s: "(\\d{4})"
            },
            y: {
                g: 1,
                c: "var ty = parseInt(results[{0}], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",
                s: "(\\d{1,2})"
            },
            a: {
                g: 1,
                c: "if (results[{0}] == 'am') {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
                s: "(am|pm)"
            },
            A: {
                g: 1,
                c: "if (results[{0}] == 'AM') {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
                s: "(AM|PM)"
            },
            g: function() {
                return a("G")
            },
            G: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,2})"
            },
            h: function() {
                return a("H")
            },
            H: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
            },
            i: {
                g: 1,
                c: "i = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
            },
            s: {
                g: 1,
                c: "s = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
            },
            u: {
                g: 1,
                c: "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
                s: "(\\d+)"
            },
            O: {
                g: 1,
                c: ["o = results[{0}];", "var sn = o.substring(0,1),", "hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),", "mn = o.substring(3,5) % 60;", "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n"].join("\n"),
                s: "([+-]\\d{4})"
            },
            P: {
                g: 1,
                c: ["o = results[{0}];", "var sn = o.substring(0,1),", "hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),", "mn = o.substring(4,6) % 60;", "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n"].join("\n"),
                s: "([+-]\\d{2}:\\d{2})"
            },
            T: {
                g: 0,
                c: null,
                s: "[A-Z]{1,4}"
            },
            Z: {
                g: 1,
                c: "zz = results[{0}] * 1;\nzz = (-43200 <= zz && zz <= 50400)? zz : null;\n",
                s: "([+-]?\\d{1,5})"
            },
            c: function() {
                var e = [],
                    c = [a("Y", 1), a("m", 2), a("d", 3), a("h", 4), a("i", 5), a("s", 6), {
                        c: "ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"
                    }, {
                        c: ["if(results[8]) {", "if(results[8] == 'Z'){", "zz = 0;", "}else if (results[8].indexOf(':') > -1){", a("P", 8).c, "}else{", a("O", 8).c, "}", "}"].join("\n")
                    }];
                for (var f = 0, d = c.length; f < d; ++f) {
                    e.push(c[f].c)
                }
                return {
                    g: 1,
                    c: e.join(""),
                    s: [c[0].s, "(?:", "-", c[1].s, "(?:", "-", c[2].s, "(?:", "(?:T| )?", c[3].s, ":", c[4].s, "(?::", c[5].s, ")?", "(?:(?:\\.|,)(\\d+))?", "(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?", ")?", ")?", ")?"].join("")
                }
            },
            U: {
                g: 1,
                c: "u = parseInt(results[{0}], 10);\n",
                s: "(-?\\d+)"
            }
        }
    })
}());
Ext.apply(Date.prototype, {
    dateFormat: function(a) {
        if (Date.formatFunctions[a] == null) {
            Date.createFormat(a)
        }
        return Date.formatFunctions[a].call(this)
    },
    getTimezone: function() {
        return this.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "")
    },
    getGMTOffset: function(a) {
        return (this.getTimezoneOffset() > 0 ? "-" : "+") + String.leftPad(Math.floor(Math.abs(this.getTimezoneOffset()) / 60), 2, "0") + (a ? ":" : "") + String.leftPad(Math.abs(this.getTimezoneOffset() % 60), 2, "0")
    },
    getDayOfYear: function() {
        var b = 0,
            e = this.clone(),
            a = this.getMonth(),
            c;
        for (c = 0, e.setDate(1), e.setMonth(0); c < a; e.setMonth(++c)) {
            b += e.getDaysInMonth()
        }
        return b + this.getDate() - 1
    },
    getWeekOfYear: function() {
        var a = 86400000,
            b = 7 * a;
        return function() {
            var d = Date.UTC(this.getFullYear(), this.getMonth(), this.getDate() + 3) / a,
                c = Math.floor(d / 7),
                e = new Date(c * b).getUTCFullYear();
            return c - Math.floor(Date.UTC(e, 0, 7) / b) + 1
        }
    }(),
    isLeapYear: function() {
        var a = this.getFullYear();
        return !!((a & 3) == 0 && (a % 100 || (a % 400 == 0 && a)))
    },
    getFirstDayOfMonth: function() {
        var a = (this.getDay() - (this.getDate() - 1)) % 7;
        return (a < 0) ? (a + 7) : a
    },
    getLastDayOfMonth: function() {
        return this.getLastDateOfMonth().getDay()
    },
    getFirstDateOfMonth: function() {
        return new Date(this.getFullYear(), this.getMonth(), 1)
    },
    getLastDateOfMonth: function() {
        return new Date(this.getFullYear(), this.getMonth(), this.getDaysInMonth())
    },
    getDaysInMonth: function() {
        var a = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return function() {
            var b = this.getMonth();
            return b == 1 && this.isLeapYear() ? 29 : a[b]
        }
    }(),
    getSuffix: function() {
        switch (this.getDate()) {
            case 1:
            case 21:
            case 31:
                return "st";
            case 2:
            case 22:
                return "nd";
            case 3:
            case 23:
                return "rd";
            default:
                return "th"
        }
    },
    clone: function() {
        return new Date(this.getTime())
    },
    isDST: function() {
        return new Date(this.getFullYear(), 0, 1).getTimezoneOffset() != this.getTimezoneOffset()
    },
    clearTime: function(f) {
        if (f) {
            return this.clone().clearTime()
        }
        var b = this.getDate();
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);
        if (this.getDate() != b) {
            for (var a = 1, e = this.add(Date.HOUR, a); e.getDate() != b; a++, e = this.add(Date.HOUR, a)) {}
            this.setDate(b);
            this.setHours(e.getHours())
        }
        return this
    },
    add: function(b, c) {
        var e = this.clone();
        if (!b || c === 0) {
            return e
        }
        switch (b.toLowerCase()) {
            case Date.MILLI:
                e.setMilliseconds(this.getMilliseconds() + c);
                break;
            case Date.SECOND:
                e.setSeconds(this.getSeconds() + c);
                break;
            case Date.MINUTE:
                e.setMinutes(this.getMinutes() + c);
                break;
            case Date.HOUR:
                e.setHours(this.getHours() + c);
                break;
            case Date.DAY:
                e.setDate(this.getDate() + c);
                break;
            case Date.MONTH:
                var a = this.getDate();
                if (a > 28) {
                    a = Math.min(a, this.getFirstDateOfMonth().add("mo", c).getLastDateOfMonth().getDate())
                }
                e.setDate(a);
                e.setMonth(this.getMonth() + c);
                break;
            case Date.YEAR:
                e.setFullYear(this.getFullYear() + c);
                break
        }
        return e
    },
    between: function(c, a) {
        var b = this.getTime();
        return c.getTime() <= b && b <= a.getTime()
    }
});
Date.prototype.format = Date.prototype.dateFormat;
if (Ext.isSafari && (navigator.userAgent.match(/WebKit\/(\d+)/)[1] || NaN) < 420) {
    Ext.apply(Date.prototype, {
        _xMonth: Date.prototype.setMonth,
        _xDate: Date.prototype.setDate,
        setMonth: function(a) {
            if (a <= -1) {
                var d = Math.ceil(-a),
                    c = Math.ceil(d / 12),
                    b = (d % 12) ? 12 - d % 12 : 0;
                this.setFullYear(this.getFullYear() - c);
                return this._xMonth(b)
            } else {
                return this._xMonth(a)
            }
        },
        setDate: function(a) {
            return this.setTime(this.getTime() - (this.getDate() - a) * 86400000)
        }
    })
}
Ext.Template = function(d) {
    var e = this,
        b = arguments,
        c = [];
    if (Ext.isArray(d)) {
        d = d.join("")
    } else {
        if (b.length > 1) {
            Ext.each(b, function(a) {
                if (Ext.isObject(a)) {
                    Ext.apply(e, a)
                } else {
                    c.push(a)
                }
            });
            d = c.join("")
        }
    }
    e.html = d;
    if (e.compiled) {
        e.compile()
    }
};
Ext.Template.prototype = {
    re: /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
    argsRe: /^\s*['"](.*)["']\s*$/,
    compileARe: /\\/g,
    compileBRe: /(\r\n|\n)/g,
    compileCRe: /'/g,
    disableFormats: false,
    applyTemplate: function(h) {
        var e = this,
            a = e.disableFormats !== true,
            g = Ext.util.Format,
            c = e,
            j, b, d;
        if (e.compiled) {
            return e.compiled(h)
        }
        function f(i, n, o, k) {
            if (o && a) {
                if (o.substr(0, 5) == "this.") {
                    return c.call(o.substr(5), h[n], h)
                } else {
                    if (k) {
                        j = e.argsRe;
                        k = k.split(",");
                        for (b = 0, d = k.length; b < d; b++) {
                            k[b] = k[b].replace(j, "$1")
                        }
                        k = [h[n]].concat(k)
                    } else {
                        k = [h[n]]
                    }
                    return g[o].apply(g, k)
                }
            } else {
                return h[n] !== undefined ? h[n] : ""
            }
        }
        return e.html.replace(e.re, f)
    },
    set: function(a, c) {
        var b = this;
        b.html = a;
        b.compiled = null;
        return c ? b.compile() : b
    },
    compile: function() {
        var me = this,
            fm = Ext.util.Format,
            useF = me.disableFormats !== true,
            body;

        function fn(m, name, format, args) {
            if (format && useF) {
                args = args ? "," + args : "";
                if (format.substr(0, 5) != "this.") {
                    format = "fm." + format + "("
                } else {
                    format = 'this.call("' + format.substr(5) + '", ';
                    args = ", values"
                }
            } else {
                args = "";
                format = "(values['" + name + "'] == undefined ? '' : "
            }
            return "'," + format + "values['" + name + "']" + args + ") ,'"
        }
        if (Ext.isGecko) {
            body = "this.compiled = function(values){ return '" + me.html.replace(me.compileARe, "\\\\").replace(me.compileBRe, "\\n").replace(me.compileCRe, "\\'").replace(me.re, fn) + "';};"
        } else {
            body = ["this.compiled = function(values){ return ['"];
            body.push(me.html.replace(me.compileARe, "\\\\").replace(me.compileBRe, "\\n").replace(me.compileCRe, "\\'").replace(me.re, fn));
            body.push("'].join('');};");
            body = body.join("")
        }
        eval(body);
        return me
    },
    insertFirst: function(b, a, c) {
        return this.doInsert("afterBegin", b, a, c)
    },
    insertBefore: function(b, a, c) {
        return this.doInsert("beforeBegin", b, a, c)
    },
    insertAfter: function(b, a, c) {
        return this.doInsert("afterEnd", b, a, c)
    },
    append: function(b, a, c) {
        return this.doInsert("beforeEnd", b, a, c)
    },
    doInsert: function(c, e, b, a) {
        e = Ext.getDom(e);
        var d = Ext.DomHelper.insertHtml(c, e, this.applyTemplate(b));
        return a ? Ext.get(d, true) : d
    },
    overwrite: function(b, a, c) {
        b = Ext.getDom(b);
        b.innerHTML = this.applyTemplate(a);
        return c ? Ext.get(b.firstChild, true) : b.firstChild
    },
    call: function(c, b, a) {
        return this[c](b, a)
    }
};
Ext.Template.prototype.apply = Ext.Template.prototype.applyTemplate;
Ext.Template.from = function(b, a) {
    b = Ext.getDom(b);
    return new Ext.Template(b.value || b.innerHTML, a || "")
};
Ext.XTemplate = function() {
    Ext.XTemplate.superclass.constructor.apply(this, arguments);
    var y = this,
        h = y.html,
        q = /<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/,
        d = /^<tpl\b[^>]*?for="(.*?)"/,
        v = /^<tpl\b[^>]*?if="(.*?)"/,
        x = /^<tpl\b[^>]*?exec="(.*?)"/,
        r, p = 0,
        j = [],
        o = "values",
        w = "parent",
        k = "xindex",
        n = "xcount",
        e = "return ",
        c = "with(values){ ";
    h = ["<tpl>", h, "</tpl>"].join("");
    while ((r = h.match(q))) {
        var b = r[0].match(d),
            a = r[0].match(v),
            A = r[0].match(x),
            f = null,
            g = null,
            t = null,
            z = b && b[1] ? b[1] : "",
            u;
        if (a) {
            f = a && a[1] ? a[1] : null;
            if (f) {
                g = new Function(o, w, k, n, c + "try{" + e + (Ext.util.Format.htmlDecode(f)) + ";}catch(e){return;}}")
            }
        }
        if (A) {
            f = A && A[1] ? A[1] : null;
            if (f) {
                t = new Function(o, w, k, n, c + (Ext.util.Format.htmlDecode(f)) + "; }")
            }
        }
        if (z) {
            switch (z) {
                case ".":
                    z = new Function(o, w, c + e + o + "; }");
                    break;
                case "..":
                    z = new Function(o, w, c + e + w + "; }");
                    break;
                default:
                    z = new Function(o, w, c + e + z + "; }")
            }
        }
        j.push({
            id: p,
            target: z,
            exec: t,
            test: g,
            body: r[1] || ""
        });
        h = h.replace(r[0], "{xtpl" + p + "}");
        ++p
    }
    for (u = j.length - 1; u >= 0; --u) {
        y.compileTpl(j[u])
    }
    y.master = j[j.length - 1];
    y.tpls = j
};
Ext.extend(Ext.XTemplate, Ext.Template, {
    re: /\{([\w-\.\#]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\\]\s?[\d\.\+\-\*\\\(\)]+)?\}/g,
    codeRe: /\{\[((?:\\\]|.|\n)*?)\]\}/g,
    applySubTemplate: function(a, j, h, d, c) {
        var g = this,
            f, m = g.tpls[a],
            k, b = [],
            e;
        if ((m.test && !m.test.call(g, j, h, d, c)) || (m.exec && m.exec.call(g, j, h, d, c))) {
            return ""
        }
        k = m.target ? m.target.call(g, j, h) : j;
        f = k.length;
        h = m.target ? j : h;
        if (m.target && Ext.isArray(k)) {
            for (e = 0, f = k.length; e < f; e++) {
                b[b.length] = m.compiled.call(g, k[e], h, e + 1, f)
            }
            return b.join("")
        }
        return m.compiled.call(g, k, h, d, c)
    },
    compileTpl: function(tpl) {
        var fm = Ext.util.Format,
            useF = this.disableFormats !== true,
            body;

        function fn(m, name, format, args, math) {
            var v;
            if (name.substr(0, 4) == "xtpl") {
                return "',this.applySubTemplate(" + name.substr(4) + ", values, parent, xindex, xcount),'"
            }
            if (name == ".") {
                v = 'typeof values == "string" ? values : ""'
            } else {
                if (name == "#") {
                    v = "xindex"
                } else {
                    if (name.indexOf(".") != -1) {
                        v = "values." + name
                    } else {
                        v = "values['" + name + "']"
                    }
                }
            }
            if (math) {
                v = "(" + v + math + ")"
            }
            if (format && useF) {
                args = args ? "," + args : "";
                if (format.substr(0, 5) != "this.") {
                    format = "fm." + format + "("
                } else {
                    format = 'this.call("' + format.substr(5) + '", ';
                    args = ", values"
                }
            } else {
                args = "";
                format = "(" + v + " === undefined ? '' : "
            }
            return "'," + format + v + args + "),'"
        }
        function codeFn(m, code) {
            return "',(" + code.replace(/\\'/g, "'") + "),'"
        }
        body = ["tpl.compiled = function(values, parent, xindex, xcount){return ['"];
        body.push(tpl.body.replace(/(\r\n|\n)/g, "\\n").replace(/'/g, "\\'").replace(this.re, fn).replace(this.codeRe, codeFn));
        body.push("'].join('');};");
        body = body.join("");
        eval(body);
        return this
    },
    applyTemplate: function(a) {
        return this.master.compiled.call(this, a, {}, 1, 1)
    },
    compile: function() {
        return this
    }
});
Ext.XTemplate.prototype.apply = Ext.XTemplate.prototype.applyTemplate;
Ext.XTemplate.from = function(b, a) {
    b = Ext.getDom(b);
    return new Ext.XTemplate(b.value || b.innerHTML, a || {})
};
Ext.util.DelayedTask = function(d, c, a) {
    var e = this,
        f, b = function() {
            clearInterval(f);
            f = null;
            d.apply(c, a || [])
        };
    this.delay = function(h, j, i, g) {
        e.cancel();
        d = j || d;
        c = i || c;
        a = g || a;
        f = setInterval(b, h)
    };
    this.cancel = function() {
        if (f) {
            clearInterval(f);
            f = null
        }
    }
};
Ext.data.Connection = Ext.extend(Ext.util.Observable, {
    method: "post",
    url: null,
    disableCaching: true,
    disableCachingParam: "_dc",
    timeout: 30000,
    useDefaultHeader: true,
    defaultPostHeader: "application/x-www-form-urlencoded; charset=UTF-8",
    useDefaultXhrHeader: true,
    defaultXhrHeader: "XMLHttpRequest",
    requests: {},
    constructor: function(a) {
        a = a || {};
        Ext.apply(this, a);
        this.addEvents("beforerequest", "requestcomplete", "requestexception");
        Ext.data.Connection.superclass.constructor.call(this)
    },
    request: function(c) {
        var k = this;
        if (k.fireEvent("beforerequest", k, c) !== false) {
            var g = c.params,
                b = c.url || k.url,
                h, i, f, d = c.urlParams,
                a, m, n;
            if (Ext.isFunction(g)) {
                g = g.call(c.scope || window, c)
            }
            if (Ext.isFunction(b)) {
                b = b.call(c.scope || window, c)
            }
            i = c.rawData || c.xmlData || c.jsonData || null;
            if (c.jsonData && !Ext.isPrimitive(c.jsonData)) {
                i = Ext.encode(i)
            }
            g = Ext.isObject(g) ? Ext.urlEncode(g) : g;
            d = Ext.isObject(d) ? Ext.urlEncode(d) : d;
            a = (c.method || k.method || ((g || i) ? "POST" : "GET")).toUpperCase();
            if (a === "GET" && c.disableCaching !== false && !k.disableCaching) {
                b = Ext.urlAppend(b, c.disableCachingParam || k.disableCachingParam + "=" + (new Date().getTime()))
            }
            if ((a == "GET" || i) && g) {
                b = Ext.urlAppend(b, g);
                g = null
            }
            if (d) {
                b = Ext.urlAppend(b, d)
            }
            if (c.autoAbort === true || k.autoAbort) {
                k.abort()
            }
            n = new XMLHttpRequest();
            n.open(a.toUpperCase(), b, true);
            f = Ext.apply({}, c.headers || {}, k.defaultHeaders || {});
            if (!f["Content-Type"] && (i || g)) {
                f["Content-Type"] = i ? (c.rawData ? "text/plain" : (c.xmlData ? "text/xml" : "application/json")) : k.defaultPostHeader
            }
            if (k.useDefaultXhrHeader && !f["X-Requested-With"]) {
                f["X-Requested-With"] = k.defaultXhrHeader
            }
            for (m in f) {
                if (f.hasOwnProperty(m)) {
                    try {
                        n.setRequestHeader(m, f[m])
                    } catch (j) {
                        k.fireEvent("exception", m, f[m])
                    }
                }
            }
            h = {
                id: ++Ext.data.Connection.requestId,
                xhr: n,
                headers: f,
                options: c,
                timeout: setTimeout(function() {
                    h.timedout = true;
                    k.abort(h)
                }, c.timeout || k.timeout)
            };
            k.requests[h.id] = h;
            n.onreadystatechange = k.onStateChange.createDelegate(k, [h]);
            n.send(i || g || null);
            return h
        } else {
            return c.callback ? c.callback.apply(c.scope, [c, undefined, undefined]) : null
        }
    },
    isLoading: function(a) {
        return a && !{
            0: true,
            4: true
        }[a.xhr.readyState]
    },
    abort: function(a) {
        if (a && this.isLoading(a)) {
            a.xhr.abort();
            clearTimeout(a.timeout);
            delete(a.timeout);
            a.aborted = true;
            this.onComplete(a)
        } else {
            if (!a) {
                var b;
                for (b in this.requests) {
                    this.abort(this.requests[b])
                }
            }
        }
    },
    onStateChange: function(a) {
        if (a.xhr.readyState == 4) {
            clearTimeout(a.timeout);
            delete a.timeout;
            this.onComplete(a)
        }
    },
    onComplete: function(d) {
        var a = d.xhr.status,
            c = d.options,
            e = true,
            b;
        if ((a >= 200 && a < 300) || a == 304) {
            b = this.createResponse(d);
            this.fireEvent("requestcomplete", this, b, c);
            if (c.success) {
                if (!c.scope) {
                    c.success(b, c)
                } else {
                    c.success.call(c.scope, b, c)
                }
            }
        } else {
            e = false;
            switch (a) {
                case 12002:
                case 12029:
                case 12030:
                case 12031:
                case 12152:
                case 13030:
                    b = this.createException(d);
                default:
                    b = this.createResponse(d)
            }
            this.fireEvent("requestexception", this, b, c);
            if (c.failure) {
                if (!c.scope) {
                    c.failure(b, c)
                } else {
                    c.failure.call(c.scope, b, c)
                }
            }
        }
        if (c.callback) {
            if (!c.scope) {
                c.callback(c, e, b)
            } else {
                c.callback.call(c.scope, c, e, b)
            }
        }
        delete this.requests[d.id]
    },
    createResponse: function(a) {
        var g = a.xhr,
            b = {}, h = g.getAllResponseHeaders().replace(/\r\n/g, "\n").split("\n"),
            c = h.length,
            i, d, f, e;
        while (c--) {
            i = h[c];
            d = i.indexOf(":");
            if (d >= 0) {
                f = i.substr(0, d).toLowerCase();
                if (i.charAt(d + 1) == " ") {
                    ++d
                }
                b[f] = i.substr(d + 1)
            }
        }
        delete a.xhr;
        return {
            request: a,
            requestId: a.id,
            status: g.status,
            statusText: g.statusText,
            getResponseHeader: function(j) {
                return b[j.toLowerCase()]
            },
            getAllResponseHeaders: function() {
                return b
            },
            responseText: g.responseText,
            responseXML: g.responseXML
        }
    },
    createException: function(a) {
        return {
            request: a,
            requestId: a.id,
            status: a.aborted ? -1 : 0,
            statusText: a.aborted ? "transaction aborted" : "communication failure",
            aborted: a.aborted,
            timedout: a.timedout
        }
    }
});
Ext.data.Connection.requestId = 0;
Ext.Ajax = new Ext.data.Connection({
    autoAbort: false
});
Ext.AbstractManager = Ext.extend(Object, {
    typeName: "type",
    constructor: function(a) {
        Ext.apply(this, a || {});
        this.all = new Ext.util.MixedCollection();
        this.types = {}
    },
    get: function(a) {
        return this.all.get(a)
    },
    register: function(a) {
        this.all.add(a)
    },
    unregister: function(a) {
        this.all.remove(a)
    },
    registerType: function(b, a) {
        this.types[b] = a;
        a[this.typeName] = b
    },
    isRegistered: function(a) {
        return this.types[a] !== undefined
    },
    create: function(a, d) {
        var b = a[this.typeName] || a.type || d,
            c = this.types[b];
        if (c == undefined) {
            throw new Error(String.format("The '{0}' type has not been registered with this manager", b))
        }
        return new c(a)
    },
    onAvailable: function(d, c, b) {
        var a = this.all;
        a.on("add", function(e, f) {
            if (f.id == d) {
                c.call(b || f, f);
                a.un("add", c, b)
            }
        })
    }
});
Ext.PluginMgr = new Ext.AbstractManager({
    typeName: "ptype",
    create: function(b, c) {
        var a = this.types[b.ptype || c];
        if (a.init) {
            return a
        } else {
            return new a(b)
        }
    },
    findByType: function(c, f) {
        var e = [],
            b = this.types;
        for (var a in b) {
            var d = b[a];
            if (d.type == c && (f === true && d.isDefault)) {
                e.push(d)
            }
        }
        return e
    }
});
Ext.preg = function() {
    return Ext.PluginMgr.registerType.apply(Ext.PluginMgr, arguments)
};
Ext.ComponentMgr = new Ext.AbstractManager({
    typeName: "xtype",
    create: function(a, b) {
        return a.render ? a : new this.types[a.xtype || b](a)
    }
});
Ext.reg = function() {
    return Ext.ComponentMgr.registerType.apply(Ext.ComponentMgr, arguments)
};
Ext.create = function() {
    return Ext.ComponentMgr.create.apply(Ext.ComponentMgr, arguments)
};
Ext.data.Batch = Ext.extend(Ext.util.Observable, {
    autoStart: false,
    current: -1,
    total: 0,
    running: false,
    complete: false,
    exception: false,
    pauseOnException: true,
    constructor: function(a) {
        Ext.apply(this, a || {});
        this.operations = [];
        this.addEvents("complete", "exception", "operation-complete");
        Ext.data.Batch.superclass.constructor.call(this, a)
    },
    add: function(a) {
        this.total++;
        a.setBatch(this);
        this.operations.push(a)
    },
    start: function() {
        this.exception = false;
        this.running = true;
        this.runNextOperation()
    },
    runNextOperation: function() {
        this.runOperation(this.current + 1)
    },
    pause: function() {
        this.running = false
    },
    runOperation: function(d) {
        var c = this.operations,
            b = c[d];
        if (b == undefined) {
            this.running = false;
            this.complete = true;
            this.fireEvent("complete", this, c[c.length - 1])
        } else {
            this.current = d;
            var a = function(e) {
                var f = e.hasException();
                if (f) {
                    this.fireEvent("exception", this, e)
                } else {
                    this.fireEvent("operation-complete", this, e)
                }
                if (f && this.pauseOnException) {
                    this.pause()
                } else {
                    e.markCompleted();
                    this.runNextOperation()
                }
            };
            b.markStarted();
            this.proxy[b.action](b, a, this)
        }
    }
});
Ext.data.Model = Ext.extend(Ext.util.Observable, {
    evented: false,
    isModel: true,
    dirty: false,
    phantom: false,
    editing: false,
    idProperty: "id",
    constructor: function(e, g) {
        e = e || {};
        if (this.evented) {
            this.addEvents()
        }
        var a = this.fields.items,
            d = a.length,
            f, b, c;
        for (c = 0; c < d; c++) {
            f = a[c];
            b = f.name;
            if (e[b] == undefined) {
                e[b] = f.defaultValue
            }
        }
        this.internalId = (g || g === 0) ? g : Ext.data.Model.id(this);
        this.data = e;
        this.modified = {};
        Ext.data.Model.superclass.constructor.apply(this)
    },
    markDirty: function() {
        this.dirty = true;
        if (!this.modified) {
            this.modified = {}
        }
        this.fields.each(function(a) {
            this.modified[a.name] = this.data[a.name]
        }, this)
    },
    getId: function() {
        return this.get(this.idProperty)
    },
    setId: function(a) {
        this.set(this.idProperty, a)
    },
    get: function(a) {
        return this.data[a]
    },
    set: function(b, a) {
        this.data[b] = a;
        this.dirty = true;
        if (!this.editing) {
            this.afterEdit()
        }
    },
    getChanges: function() {
        var a = this.modified,
            b = {}, c;
        for (c in a) {
            if (a.hasOwnProperty(c)) {
                b[c] = this.data[c]
            }
        }
        return b
    },
    isModified: function(a) {
        return !!(this.modified && this.modified.hasOwnProperty(a))
    },
    copy: function(a) {
        return new this.constructor(Ext.apply({}, this.data), a || this.internalId)
    },
    reject: function(a) {
        var b = this.modified,
            c;
        for (c in b) {
            if (typeof b[c] != "function") {
                this.data[c] = b[c]
            }
        }
        this.dirty = false;
        this.editing = false;
        delete this.modified;
        if (a !== true) {
            this.afterReject()
        }
    },
    commit: function(a) {
        this.dirty = false;
        this.editing = false;
        delete this.modified;
        if (a !== true) {
            this.afterCommit()
        }
    },
    join: function(a) {
        this.store = a
    },
    unjoin: function(a) {
        delete this.store
    },
    afterEdit: function() {
        this.callStore("afterEdit")
    },
    afterReject: function() {
        this.callStore("afterReject")
    },
    afterCommit: function() {
        this.callStore("afterCommit")
    },
    callStore: function(b) {
        var a = this.store;
        if (a != undefined && typeof a[b] == "function") {
            a[b](this)
        }
    }
});
Ext.data.Model.id = function(a) {
    a.phantom = true;
    return [Ext.data.Model.PREFIX, "-", Ext.data.Model.AUTO_ID++].join("")
};
Ext.ns("Ext.data.Record");
Ext.data.Record.id = Ext.data.Model.id;
Ext.data.Model.PREFIX = "ext-record";
Ext.data.Model.AUTO_ID = 1;
Ext.data.Model.EDIT = "edit";
Ext.data.Model.REJECT = "reject";
Ext.data.Model.COMMIT = "commit";
Ext.data.Field = Ext.extend(Object, {
    constructor: function(b) {
        if (Ext.isString(b)) {
            b = {
                name: b
            }
        }
        Ext.apply(this, b);
        var d = Ext.data.Types,
            a = this.sortType,
            c;
        if (this.type) {
            if (Ext.isString(this.type)) {
                this.type = Ext.data.Types[this.type.toUpperCase()] || d.AUTO
            }
        } else {
            this.type = d.AUTO
        }
        if (Ext.isString(a)) {
            this.sortType = Ext.data.SortTypes[a]
        } else {
            if (Ext.isEmpty(a)) {
                this.sortType = this.type.sortType
            }
        }
        if (!this.convert) {
            this.convert = this.type.convert
        }
    },
    dateFormat: null,
    defaultValue: "",
    mapping: null,
    sortType: null,
    sortDir: "ASC",
    allowBlank: true
});
Ext.data.SortTypes = {
    none: function(a) {
        return a
    },
    stripTagsRE: /<\/?[^>]+>/gi,
    asText: function(a) {
        return String(a).replace(this.stripTagsRE, "")
    },
    asUCText: function(a) {
        return String(a).toUpperCase().replace(this.stripTagsRE, "")
    },
    asUCString: function(a) {
        return String(a).toUpperCase()
    },
    asDate: function(a) {
        if (!a) {
            return 0
        }
        if (Ext.isDate(a)) {
            return a.getTime()
        }
        return Date.parse(String(a))
    },
    asFloat: function(a) {
        var b = parseFloat(String(a).replace(/,/g, ""));
        return isNaN(b) ? 0 : b
    },
    asInt: function(a) {
        var b = parseInt(String(a).replace(/,/g, ""), 10);
        return isNaN(b) ? 0 : b
    }
};
Ext.data.Types = new function() {
    var a = Ext.data.SortTypes;
    Ext.apply(this, {
        stripRe: /[\$,%]/g,
        AUTO: {
            convert: function(b) {
                return b
            },
            sortType: a.none,
            type: "auto"
        },
        STRING: {
            convert: function(b) {
                return (b === undefined || b === null) ? "" : String(b)
            },
            sortType: a.asUCString,
            type: "string"
        },
        INT: {
            convert: function(b) {
                return b !== undefined && b !== null && b !== "" ? parseInt(String(b).replace(Ext.data.Types.stripRe, ""), 10) : 0
            },
            sortType: a.none,
            type: "int"
        },
        FLOAT: {
            convert: function(b) {
                return b !== undefined && b !== null && b !== "" ? parseFloat(String(b).replace(Ext.data.Types.stripRe, ""), 10) : 0
            },
            sortType: a.none,
            type: "float"
        },
        BOOL: {
            convert: function(b) {
                return b === true || b === "true" || b == 1
            },
            sortType: a.none,
            type: "bool"
        },
        DATE: {
            convert: function(c) {
                var d = this.dateFormat;
                if (!c) {
                    return null
                }
                if (Ext.isDate(c)) {
                    return c
                }
                if (d) {
                    if (d == "timestamp") {
                        return new Date(c * 1000)
                    }
                    if (d == "time") {
                        return new Date(parseInt(c, 10))
                    }
                    return Date.parseDate(c, d)
                }
                var b = Date.parse(c);
                return b ? new Date(b) : null
            },
            sortType: a.asDate,
            type: "date"
        }
    });
    Ext.apply(this, {
        BOOLEAN: this.BOOL,
        INTEGER: this.INT,
        NUMBER: this.FLOAT
    })
};
Ext.ModelMgr = new Ext.AbstractManager({
    typeName: "mtype",
    registerType: function(a, c) {
        var g = Ext.PluginMgr,
            d = g.findByType("model", true),
            h = c.fields || [],
            f = Ext.extend(Ext.data.Model, c);
        var j = c.plugins || [];
        for (var i = 0, b = j.length; i < b; i++) {
            d.push(g.create(j[i]))
        }
        var e = new Ext.util.MixedCollection(false, function(k) {
            return k.name
        });
        for (var i = 0, b = h.length; i < b; i++) {
            e.add(new Ext.data.Field(h[i]))
        }
        Ext.override(f, {
            fields: e,
            plugins: d
        });
        for (var i = 0, b = d.length; i < b; i++) {
            d[i].bootstrap(f, c)
        }
        this.types[a] = f;
        return f
    },
    getModel: function(b) {
        var a = b;
        if (typeof a == "string") {
            a = this.types[a]
        }
        return a
    },
    create: function(c, b) {
        var a = typeof b == "function" ? b : this.types[b || c.name];
        return new a(c)
    }
});
Ext.regModel = function() {
    return Ext.ModelMgr.registerType.apply(Ext.ModelMgr, arguments)
};
Ext.data.Operation = Ext.extend(Object, {
    synchronous: true,
    action: undefined,
    filters: undefined,
    sorters: undefined,
    group: undefined,
    start: undefined,
    limit: undefined,
    batch: undefined,
    started: false,
    running: false,
    complete: false,
    success: undefined,
    exception: false,
    error: undefined,
    constructor: function(a) {
        Ext.apply(this, a || {})
    },
    markStarted: function() {
        this.started = true;
        this.running = true
    },
    markCompleted: function() {
        this.complete = true;
        this.running = false
    },
    markException: function(a) {
        this.exception = true;
        this.success = false;
        this.running = false;
        this.error = a
    },
    hasException: function() {
        return this.exception === true
    },
    getError: function() {
        return this.error
    },
    getRecords: function() {
        var a = this.getResultSet();
        return (a == undefined ? [] : a.records)
    },
    getResultSet: function() {
        return this.resultSet
    },
    isStarted: function() {
        return this.started === true
    },
    isRunning: function() {
        return this.running === true
    },
    isComplete: function() {
        return this.complete === true
    },
    wasSuccessful: function() {
        return this.isComplete() && this.success === true
    },
    setBatch: function(a) {
        this.batch = a
    },
    allowWrite: function() {
        return this.action != "read"
    }
});
Ext.data.ProxyMgr = new Ext.AbstractManager({});
Ext.data.ReaderMgr = new Ext.AbstractManager({
    typeName: "rtype"
});
Ext.data.Request = Ext.extend(Object, {
    action: undefined,
    params: undefined,
    method: "GET",
    url: undefined,
    constructor: function(a) {
        Ext.apply(this, a || {})
    }
});
Ext.data.ResultSet = Ext.extend(Object, {
    loaded: true,
    count: 0,
    total: 0,
    success: false,
    constructor: function(a) {
        Ext.apply(this, a || {});
        if (a.count == undefined) {
            this.count = this.records.length
        }
    }
});
Ext.data.Store = Ext.extend(Ext.util.Observable, {
    remoteSort: false,
    remoteFilter: false,
    autoLoad: false,
    autoSave: false,
    groupField: undefined,
    groupDir: "ASC",
    pageSize: 25,
    batchUpdateMode: "operation",
    filterOnLoad: true,
    sortOnLoad: true,
    currentPage: 1,
    implicitModel: true,
    defaultProxyType: "memory",
    constructor: function(a) {
        this.addEvents("add", "remove", "update", "datachanged");
        this.removed = [];
        this.sortToggle = {};
        this.data = new Ext.util.MixedCollection(false, function(b) {
            return b.id
        });
        if (a.data) {
            this.inlineData = a.data;
            delete a.data
        }
        Ext.data.Store.superclass.constructor.apply(this, arguments);
        this.model = Ext.ModelMgr.getModel(a.model);
        if (!this.model && a.fields) {
            this.model = Ext.regModel("ImplicitModel-" + this.storeId || Ext.id(), {
                fields: a.fields
            });
            delete this.fields;
            this.implicitModel = true
        }
        this.setProxy(a.proxy);
        if (this.inlineData) {
            this.loadData(this.inlineData);
            delete this.inlineData
        } else {
            if (this.autoLoad) {
                this.load.defer(10, this, [typeof this.autoLoad == "object" ? this.autoLoad : undefined])
            }
        }
        if (this.id) {
            this.storeId = this.id;
            delete this.id;
            Ext.StoreMgr.register(this)
        }
    },
    setProxy: function(a) {
        if (a == undefined || typeof a == "string") {
            a = {
                type: a
            }
        }
        if (!(a instanceof Ext.data.Proxy)) {
            Ext.applyIf(a, {
                type: this.defaultProxyType,
                model: this.model
            });
            this.proxy = Ext.data.ProxyMgr.create(a)
        } else {
            this.proxy.setModel(this.model)
        }
        return this.proxy
    },
    getProxy: function() {
        return this.proxy
    },
    getGroups: function() {
        var d = this.data.items,
            f = d.length,
            a = [],
            c = {}, b, g, h, e;
        for (e = 0; e < f; e++) {
            b = d[e];
            g = this.getGroupString(b);
            h = c[g];
            if (h == undefined) {
                h = {
                    name: g,
                    children: []
                };
                a.push(h);
                c[g] = h
            }
            h.children.push(b)
        }
        return a
    },
    getGroupString: function(a) {
        return a.get(this.groupField)
    },
    insert: function(c, b) {
        b = [].concat(b);
        for (var d = 0, a = b.length; d < a; d++) {
            this.data.insert(c, b[d]);
            b[d].join(this)
        }
        if (this.snapshot) {
            this.snapshot.addAll(b)
        }
        this.fireEvent("add", this, b, c)
    },
    add: function() {
        var a = Array.prototype.slice.apply(arguments),
            c = a.length,
            b;
        for (b = 0; b < c; b++) {
            if (!(a[b] instanceof Ext.data.Model)) {
                a[b] = Ext.ModelMgr.create(a[b], this.model)
            }
        }
        this.insert(this.data.length, a);
        return a
    },
    create: function(b) {
        b = b || {};
        Ext.applyIf(b, {
            action: "create",
            records: this.getNewRecords()
        });
        var a = new Ext.data.Operation(b);
        return this.proxy.create(a, this.onProxyWrite, this)
    },
    each: function(b, a) {
        this.data.each(b, a)
    },
    remove: function(b) {
        if (!Ext.isArray(b)) {
            b = [b]
        }
        var e = b.length,
            d, c, a;
        for (d = 0; d < e; d++) {
            a = b[d];
            this.removed.push(a);
            c = this.data.indexOf(a);
            if (this.snapshot) {
                this.snapshot.remove(a)
            }
            if (c > -1) {
                a.unjoin(this);
                this.data.removeAt(c);
                this.fireEvent("remove", this, a, c)
            }
        }
        this.fireEvent("datachanged", this)
    },
    removeAt: function(b) {
        var a = this.getAt(b);
        if (a) {
            this.remove(a)
        }
    },
    destroy: function(b) {
        b = b || {};
        Ext.applyIf(b, {
            action: "destroy",
            records: this.getRemovedRecords()
        });
        var a = new Ext.data.Operation(b);
        return this.proxy.destroy(a, this.onProxyWrite, this)
    },
    update: function(b) {
        b = b || {};
        Ext.applyIf(b, {
            action: "update",
            records: this.getUpdatedRecords()
        });
        var a = new Ext.data.Operation(b);
        return this.proxy.update(a, this.onProxyWrite, this)
    },
    read: function(b) {
        b = b || {};
        Ext.applyIf(b, {
            action: "read",
            filters: this.filters,
            sorters: this.sorters,
            group: {
                field: this.groupField,
                direction: this.groupDir
            },
            start: 0,
            limit: this.pageSize,
            addRecords: false
        });
        var a = new Ext.data.Operation(b);
        return this.proxy.read(a, this.onProxyRead, this)
    },
    onProxyRead: function(b) {
        var a = b.getRecords();
        this.loadRecords(a, b.addRecords);
        var c = b.callback;
        if (typeof c == "function") {
            c.call(b.scope || this, a, b, b.wasSuccessful())
        }
    },
    onProxyWrite: function(c) {
        var g = this.data,
            f = c.action,
            b = c.getRecords(),
            e = b.length,
            a, d;
        if (f == "create" || f == "update") {
            for (d = 0; d < e; d++) {
                a = b[d];
                a.phantom = false;
                a.join(this);
                g.replace(a)
            }
        } else {
            if (f == "destroy") {
                for (d = 0; d < e; d++) {
                    a = b[d];
                    a.unjoin(this);
                    g.remove(a)
                }
                this.removed = []
            }
        }
        this.fireEvent("datachanged");
        var h = c.callback;
        if (typeof h == "function") {
            h.call(c.scope || this, b, c, c.wasSuccessful())
        }
    },
    onBatchOperationComplete: function(b, a) {},
    onBatchComplete: function(c, a) {
        var b = c.operations,
            e = b.length,
            d;
        this.suspendEvents();
        for (d = 0; d < e; d++) {
            this.onProxyWrite(b[d])
        }
        this.resumeEvents();
        this.fireEvent("datachanged", this)
    },
    onBatchException: function(b, a) {},
    getNewRecords: function() {
        return this.data.filterBy(this.filterNew).items
    },
    filterNew: function(a) {
        return a.phantom == true
    },
    getUpdatedRecords: function() {
        return this.data.filterBy(this.filterDirty).items
    },
    filterDirty: function(a) {
        return a.dirty == true
    },
    getRemovedRecords: function() {
        return this.removed
    },
    defaultSortDirection: "ASC",
    sort: function(h, g, a) {
        h = h || this.sorters;
        g = (this.sortToggle[name] || this.defaultSortDirection).toggle("ASC", "DESC");
        this.sortToggle[name] = g;
        if (typeof h == "string") {
            h = [{
                field: h,
                direction: g
            }]
        }
        this.sortInfo = {
            sorters: h,
            direction: g
        };
        if (this.remoteSort) {
            this.read()
        } else {
            if (h == undefined || h.length == 0) {
                return
            }
            var b = [],
                e = h.length,
                c;
            for (c = 0; c < e; c++) {
                b.push(this.createSortFunction(h[c].field, h[c].direction))
            }
            var f = g.toUpperCase() == "DESC" ? -1 : 1;
            var d = function(n, m) {
                var k = b[0].call(this, n, m);
                if (b.length > 1) {
                    for (var p = 1, o = b.length; p < o; p++) {
                        k = k || b[p].call(this, n, m)
                    }
                }
                return f * k
            };
            this.data.sort(g, d);
            if (!a) {
                this.fireEvent("datachanged", this)
            }
        }
    },
    createSortFunction: function(d, c) {
        c = c || "ASC";
        var b = c.toUpperCase() == "DESC" ? -1 : 1;
        var a = this.model.prototype.fields,
            e = a.get(d).sortType;
        return function(g, f) {
            var i = e(g.data[d]),
                h = e(f.data[d]);
            return b * (i > h ? 1 : (i < h ? -1 : 0))
        }
    },
    filter: function(b, a) {
        this.filters = b || this.filters;
        if (this.remoteFilter) {
            this.read()
        } else {
            this.snapshot = this.snapshot || this.data.clone();
            this.data = this.data.filter(this.filters);
            if (!a) {
                this.fireEvent("datachanged", this)
            }
        }
    },
    clearFilter: function(a) {
        if (this.isFiltered()) {
            this.data = this.snapshot.clone();
            delete this.snapshot;
            if (a !== true) {
                this.fireEvent("datachanged", this)
            }
        }
    },
    isFiltered: function() {
        return !!this.snapshot && this.snapshot != this.data
    },
    sync: function() {
        this.proxy.batch({
            create: this.getNewRecords(),
            update: this.getUpdatedRecords(),
            destroy: this.getRemovedRecords()
        }, this.getBatchListeners())
    },
    getBatchListeners: function() {
        var a = {
            scope: this,
            exception: this.onBatchException
        };
        if (this.batchUpdateMode == "operation") {
            a.operationComplete = this.onBatchOperationComplete
        } else {
            a.complete = this.onBatchComplete
        }
        return a
    },
    save: function() {
        return this.sync.apply(this, arguments)
    },
    load: function() {
        return this.read.apply(this, arguments)
    },
    loadRecords: function(a, d) {
        if (!d) {
            this.data.clear()
        }
        for (var b = 0, c = a.length; b < c; b++) {
            a[b].join(this)
        }
        this.data.addAll(a);
        if (this.filterOnLoad) {
            this.filter()
        }
        if (this.sortOnLoad) {
            this.sort()
        }
        this.fireEvent("datachanged", this)
    },
    afterEdit: function(a) {
        this.fireEvent("update", this, a, Ext.data.Model.EDIT)
    },
    afterReject: function(a) {
        this.fireEvent("update", this, a, Ext.data.Model.REJECT)
    },
    afterCommit: function(a) {
        if (this.autoSave) {
            this.sync()
        }
        this.fireEvent("update", this, a, Ext.data.Model.COMMIT)
    },
    loadData: function(f, a) {
        var c = this.model,
            d, e, b;
        for (d = 0, e = f.length; d < e; d++) {
            b = f[d];
            if (!(b instanceof Ext.data.Model)) {
                f[d] = Ext.ModelMgr.create(b, c)
            }
        }
        this.loadRecords(f, a)
    },
    loadPage: function(a) {
        this.currentPage = a;
        this.read({
            start: (a - 1) * this.pageSize,
            limit: this.pageSize
        })
    },
    nextPage: function() {
        this.loadPage(this.currentPage + 1)
    },
    previousPage: function() {
        this.loadPage(this.currentPage - 1)
    },
    destroyStore: function() {
        if (!this.isDestroyed) {
            if (this.storeId) {
                Ext.StoreMgr.unregister(this)
            }
            this.clearData();
            this.data = null;
            Ext.destroy(this.proxy);
            this.reader = this.writer = null;
            this.purgeListeners();
            this.isDestroyed = true;
            if (this.implicitModel) {
                Ext.destroy(this.model)
            }
        }
    },
    clearData: function() {
        this.data.each(function(a) {
            a.unjoin()
        });
        this.data.clear()
    },
    find: function(d, c, f, e, a) {
        var b = this.createFilterFn(d, c, e, a);
        return b ? this.data.findIndexBy(b, null, f) : -1
    },
    createFilterFn: function(d, c, e, a, b) {
        if (Ext.isEmpty(c, false)) {
            return false
        }
        c = this.data.createValueMatcher(c, e, a, b);
        return function(f) {
            return c.test(f.data[d])
        }
    },
    findExact: function(b, a, c) {
        return this.data.findIndexBy(function(d) {
            return d.get(b) === a
        }, this, c)
    },
    findBy: function(b, a, c) {
        return this.data.findIndexBy(b, a, c)
    },
    getCount: function() {
        return this.data.length || 0
    },
    getAt: function(a) {
        return this.data.itemAt(a)
    },
    getRange: function(b, a) {
        return this.data.getRange(b, a)
    },
    getById: function(a) {
        return (this.snapshot || this.data).find(function(b) {
            return b.getId() === a
        })
    },
    indexOf: function(a) {
        return this.data.indexOf(a)
    },
    indexOfId: function(a) {
        return this.data.indexOfKey(a)
    },
    getSortState: function() {
        return this.sortInfo
    }
});
Ext.StoreMgr = Ext.apply(new Ext.util.MixedCollection(), {
    register: function() {
        for (var a = 0, b;
        (b = arguments[a]); a++) {
            this.add(b)
        }
    },
    unregister: function() {
        for (var a = 0, b;
        (b = arguments[a]); a++) {
            this.remove(this.lookup(b))
        }
    },
    lookup: function(e) {
        if (Ext.isArray(e)) {
            var b = ["field1"],
                d = !Ext.isArray(e[0]);
            if (!d) {
                for (var c = 2, a = e[0].length; c <= a; ++c) {
                    b.push("field" + c)
                }
            }
            return new Ext.data.ArrayStore({
                data: e,
                fields: b,
                expandData: d,
                autoDestroy: true,
                autoCreated: true
            })
        }
        return Ext.isObject(e) ? (e.events ? e : Ext.create(e, "store")) : this.get(e)
    },
    getKey: function(a) {
        return a.storeId
    }
});
Ext.data.WriterMgr = new Ext.AbstractManager({});
Ext.data.Tree = Ext.extend(Ext.util.Observable, {
    constructor: function(a) {
        this.nodeHash = {};
        this.root = null;
        if (a) {
            this.setRootNode(a)
        }
        this.addEvents("append", "remove", "move", "insert", "beforeappend", "beforeremove", "beforemove", "beforeinsert");
        Ext.data.Tree.superclass.constructor.call(this)
    },
    pathSeparator: "/",
    proxyNodeEvent: function() {
        return this.fireEvent.apply(this, arguments)
    },
    getRootNode: function() {
        return this.root
    },
    setRootNode: function(a) {
        this.root = a;
        a.ownerTree = this;
        a.isRoot = true;
        this.registerNode(a);
        return a
    },
    getNodeById: function(a) {
        return this.nodeHash[a]
    },
    registerNode: function(a) {
        this.nodeHash[a.id] = a
    },
    unregisterNode: function(a) {
        delete this.nodeHash[a.id]
    },
    toString: function() {
        return "[Tree" + (this.id ? " " + this.id : "") + "]"
    }
});
Ext.data.Node = Ext.extend(Ext.util.Observable, {
    constructor: function(a) {
        this.attributes = a || {};
        this.leaf = this.attributes.leaf;
        this.id = this.attributes.id;
        if (!this.id) {
            this.id = Ext.id(null, "xnode-");
            this.attributes.id = this.id
        }
        this.childNodes = [];
        this.parentNode = null;
        this.firstChild = null;
        this.lastChild = null;
        this.previousSibling = null;
        this.nextSibling = null;
        this.addEvents({
            append: true,
            remove: true,
            move: true,
            insert: true,
            beforeappend: true,
            beforeremove: true,
            beforemove: true,
            beforeinsert: true
        });
        this.listeners = this.attributes.listeners;
        Ext.data.Node.superclass.constructor.call(this)
    },
    fireEvent: function(b) {
        if (Ext.data.Node.superclass.fireEvent.apply(this, arguments) === false) {
            return false
        }
        var a = this.getOwnerTree();
        if (a) {
            if (a.proxyNodeEvent.apply(a, arguments) === false) {
                return false
            }
        }
        return true
    },
    isLeaf: function() {
        return this.leaf === true
    },
    setFirstChild: function(a) {
        this.firstChild = a
    },
    setLastChild: function(a) {
        this.lastChild = a
    },
    isLast: function() {
        return (!this.parentNode ? true : this.parentNode.lastChild == this)
    },
    isFirst: function() {
        return (!this.parentNode ? true : this.parentNode.firstChild == this)
    },
    hasChildNodes: function() {
        return !this.isLeaf() && this.childNodes.length > 0
    },
    isExpandable: function() {
        return this.attributes.expandable || this.hasChildNodes()
    },
    appendChild: function(e) {
        var f = false;
        if (Ext.isArray(e)) {
            f = e
        } else {
            if (arguments.length > 1) {
                f = arguments
            }
        }
        if (f) {
            for (var d = 0, a = f.length; d < a; d++) {
                this.appendChild(f[d])
            }
        } else {
            if (this.fireEvent("beforeappend", this.ownerTree, this, e) === false) {
                return false
            }
            var b = this.childNodes.length;
            var c = e.parentNode;
            if (c) {
                if (e.fireEvent("beforemove", e.getOwnerTree(), e, c, this, b) === false) {
                    return false
                }
                c.removeChild(e)
            }
            b = this.childNodes.length;
            if (b === 0) {
                this.setFirstChild(e)
            }
            this.childNodes.push(e);
            e.parentNode = this;
            var g = this.childNodes[b - 1];
            if (g) {
                e.previousSibling = g;
                g.nextSibling = e
            } else {
                e.previousSibling = null
            }
            e.nextSibling = null;
            this.setLastChild(e);
            e.setOwnerTree(this.getOwnerTree());
            this.fireEvent("append", this.ownerTree, this, e, b);
            if (c) {
                e.fireEvent("move", this.ownerTree, e, c, this, b)
            }
            return e
        }
    },
    removeChild: function(c, b) {
        var a = this.childNodes.indexOf(c);
        if (a == -1) {
            return false
        }
        if (this.fireEvent("beforeremove", this.ownerTree, this, c) === false) {
            return false
        }
        this.childNodes.splice(a, 1);
        if (c.previousSibling) {
            c.previousSibling.nextSibling = c.nextSibling
        }
        if (c.nextSibling) {
            c.nextSibling.previousSibling = c.previousSibling
        }
        if (this.firstChild == c) {
            this.setFirstChild(c.nextSibling)
        }
        if (this.lastChild == c) {
            this.setLastChild(c.previousSibling)
        }
        this.fireEvent("remove", this.ownerTree, this, c);
        if (b) {
            c.destroy(true)
        } else {
            c.clear()
        }
        return c
    },
    clear: function(a) {
        this.setOwnerTree(null, a);
        this.parentNode = this.previousSibling = this.nextSibling = null;
        if (a) {
            this.firstChild = this.lastChild = null
        }
    },
    destroy: function(a) {
        if (a === true) {
            this.purgeListeners();
            this.clear(true);
            Ext.each(this.childNodes, function(b) {
                b.destroy(true)
            });
            this.childNodes = null
        } else {
            this.remove(true)
        }
    },
    insertBefore: function(d, a) {
        if (!a) {
            return this.appendChild(d)
        }
        if (d == a) {
            return false
        }
        if (this.fireEvent("beforeinsert", this.ownerTree, this, d, a) === false) {
            return false
        }
        var b = this.childNodes.indexOf(a);
        var c = d.parentNode;
        var e = b;
        if (c == this && this.childNodes.indexOf(d) < b) {
            e--
        }
        if (c) {
            if (d.fireEvent("beforemove", d.getOwnerTree(), d, c, this, b, a) === false) {
                return false
            }
            c.removeChild(d)
        }
        if (e === 0) {
            this.setFirstChild(d)
        }
        this.childNodes.splice(e, 0, d);
        d.parentNode = this;
        var f = this.childNodes[e - 1];
        if (f) {
            d.previousSibling = f;
            f.nextSibling = d
        } else {
            d.previousSibling = null
        }
        d.nextSibling = a;
        a.previousSibling = d;
        d.setOwnerTree(this.getOwnerTree());
        this.fireEvent("insert", this.ownerTree, this, d, a);
        if (c) {
            d.fireEvent("move", this.ownerTree, d, c, this, e, a)
        }
        return d
    },
    remove: function(a) {
        if (this.parentNode) {
            this.parentNode.removeChild(this, a)
        }
        return this
    },
    removeAll: function(a) {
        var c = this.childNodes,
            b;
        while ((b = c[0])) {
            this.removeChild(b, a)
        }
        return this
    },
    item: function(a) {
        return this.childNodes[a]
    },
    replaceChild: function(a, c) {
        var b = c ? c.nextSibling : null;
        this.removeChild(c);
        this.insertBefore(a, b);
        return c
    },
    indexOf: function(a) {
        return this.childNodes.indexOf(a)
    },
    getOwnerTree: function() {
        if (!this.ownerTree) {
            var a = this;
            while (a) {
                if (a.ownerTree) {
                    this.ownerTree = a.ownerTree;
                    break
                }
                a = a.parentNode
            }
        }
        return this.ownerTree
    },
    getDepth: function() {
        var b = 0;
        var a = this;
        while (a.parentNode) {
            ++b;
            a = a.parentNode
        }
        return b
    },
    setOwnerTree: function(a, b) {
        if (a != this.ownerTree) {
            if (this.ownerTree) {
                this.ownerTree.unregisterNode(this)
            }
            this.ownerTree = a;
            if (b !== true) {
                Ext.each(this.childNodes, function(c) {
                    c.setOwnerTree(a)
                })
            }
            if (a) {
                a.registerNode(this)
            }
        }
    },
    setId: function(b) {
        if (b !== this.id) {
            var a = this.ownerTree;
            if (a) {
                a.unregisterNode(this)
            }
            this.id = this.attributes.id = b;
            if (a) {
                a.registerNode(this)
            }
            this.onIdChange(b)
        }
    },
    onIdChange: Ext.emptyFn,
    getPath: function(c) {
        c = c || "id";
        var e = this.parentNode;
        var a = [this.attributes[c]];
        while (e) {
            a.unshift(e.attributes[c]);
            e = e.parentNode
        }
        var d = this.getOwnerTree().pathSeparator;
        return d + a.join(d)
    },
    bubble: function(c, b, a) {
        var d = this;
        while (d) {
            if (c.apply(b || d, a || [d]) === false) {
                break
            }
            d = d.parentNode
        }
    },
    cascade: function(f, e, b) {
        if (f.apply(e || this, b || [this]) !== false) {
            var d = this.childNodes;
            for (var c = 0, a = d.length; c < a; c++) {
                d[c].cascade(f, e, b)
            }
        }
    },
    eachChild: function(f, e, b) {
        var d = this.childNodes;
        for (var c = 0, a = d.length; c < a; c++) {
            if (f.apply(e || this, b || [d[c]]) === false) {
                break
            }
        }
    },
    findChild: function(b, c, a) {
        return this.findChildBy(function() {
            return this.attributes[b] == c
        }, null, a)
    },
    findChildBy: function(g, f, b) {
        var e = this.childNodes,
            a = e.length,
            d = 0,
            h, c;
        for (; d < a; d++) {
            h = e[d];
            if (g.call(f || h, h) === true) {
                return h
            } else {
                if (b) {
                    c = h.findChildBy(g, f, b);
                    if (c != null) {
                        return c
                    }
                }
            }
        }
        return null
    },
    sort: function(e, d) {
        var c = this.childNodes;
        var a = c.length;
        if (a > 0) {
            var f = d ? function() {
                    e.apply(d, arguments)
                } : e;
            c.sort(f);
            for (var b = 0; b < a; b++) {
                var g = c[b];
                g.previousSibling = c[b - 1];
                g.nextSibling = c[b + 1];
                if (b === 0) {
                    this.setFirstChild(g)
                }
                if (b == a - 1) {
                    this.setLastChild(g)
                }
            }
        }
    },
    contains: function(a) {
        return a.isAncestor(this)
    },
    isAncestor: function(a) {
        var b = this.parentNode;
        while (b) {
            if (b == a) {
                return true
            }
            b = b.parentNode
        }
        return false
    },
    toString: function() {
        return "[Node" + (this.id ? " " + this.id : "") + "]"
    }
});
Ext.data.Proxy = Ext.extend(Ext.util.Observable, {
    batchOrder: "create,update,destroy",
    constructor: function(a) {
        Ext.data.Proxy.superclass.constructor.call(this, a);
        Ext.apply(this, a || {})
    },
    setModel: function(a) {
        this.model = Ext.ModelMgr.getModel(a)
    },
    getModel: function() {
        return this.model
    },
    create: Ext.emptyFn,
    read: Ext.emptyFn,
    update: Ext.emptyFn,
    destroy: Ext.emptyFn,
    batch: function(b, c) {
        var a = new Ext.data.Batch({
            proxy: this,
            listeners: c || {}
        });
        Ext.each(this.batchOrder.split(","), function(d) {
            a.add(new Ext.data.Operation({
                action: d,
                records: b[d]
            }))
        }, this);
        a.start();
        return a
    }
});
Ext.data.DataProxy = Ext.data.Proxy;
Ext.data.ProxyMgr.registerType("proxy", Ext.data.Proxy);
Ext.data.ServerProxy = Ext.extend(Ext.data.Proxy, {
    noCache: true,
    cacheString: "_dc",
    defaultReaderType: "json",
    defaultWriterType: "json",
    constructor: function(a) {
        Ext.data.ServerProxy.superclass.constructor.call(this, a);
        this.extraParams = a.extraParams || {};
        this.nocache = this.noCache;
        this.setReader(this.reader);
        this.setWriter(this.writer)
    },
    setReader: function(a) {
        if (a == undefined || typeof a == "string") {
            a = {
                type: a
            }
        }
        if (!(a instanceof Ext.data.Reader)) {
            Ext.applyIf(a, {
                model: this.model,
                type: this.defaultReaderType
            });
            this.reader = Ext.data.ReaderMgr.create(a)
        }
        return this.reader
    },
    getReader: function() {
        return this.reader
    },
    setWriter: function(a) {
        if (a == undefined || typeof a == "string") {
            a = {
                type: a
            }
        }
        if (!(a instanceof Ext.data.Writer)) {
            Ext.applyIf(a, {
                model: this.model,
                type: this.defaultWriterType
            });
            this.writer = Ext.data.WriterMgr.create(a)
        }
        return this.writer
    },
    getWriter: function() {
        return this.writer
    },
    setModel: function(b) {
        Ext.data.ServerProxy.superclass.setModel.call(this, b);
        b = this.model;
        var a = this.reader;
        if (a && !a.model) {
            this.reader.setModel(b)
        }
        if (this.writer) {
            this.writer.model = b
        }
    },
    create: function() {
        return this.doRequest.apply(this, arguments)
    },
    read: function() {
        return this.doRequest.apply(this, arguments)
    },
    update: function() {
        return this.doRequest.apply(this, arguments)
    },
    destroy: function() {
        return this.doRequest.apply(this, arguments)
    },
    buildRequest: function(a) {
        var c = Ext.applyIf(a.params || {}, this.extraParams || {});
        c = Ext.applyIf(c, {
            start: a.start,
            limit: a.limit,
            group: a.group,
            filters: a.filters,
            sorters: a.sorters
        });
        var b = new Ext.data.Request({
            params: c,
            action: a.action,
            records: a.records,
            operation: a
        });
        b.url = this.buildUrl(b);
        a.request = b;
        return b
    },
    buildUrl: function(b) {
        var a = b.url || this.url;
        if (this.noCache) {
            a = Ext.urlAppend(a, String.format("{0}={1}", this.cacheString, (new Date().getTime())))
        }
        return a
    },
    doRequest: function(a, c, b) {
        throw new Error("The doRequest function has not been implemented on your Ext.data.ServerProxy subclass. See src/data/ServerProxy.js for details")
    },
    afterRequest: Ext.emptyFn,
    onDestroy: function() {
        Ext.destroy(this.reader, this.writer);
        Ext.data.ServerProxy.superclass.destroy.apply(this, arguments)
    }
});
Ext.data.AjaxProxy = Ext.extend(Ext.data.ServerProxy, {
    actionMethods: {
        create: "POST",
        read: "GET",
        update: "POST",
        destroy: "POST"
    },
    doRequest: function(a, e, b) {
        var d = this.getWriter(),
            c = this.buildRequest(a, e, b);
        if (a.allowWrite()) {
            c = d.write(c)
        }
        Ext.apply(c, {
            scope: this,
            callback: this.createRequestCallback(c, a, e, b),
            method: this.getMethod(c)
        });
        Ext.Ajax.request(c);
        return c
    },
    getMethod: function(a) {
        return this.actionMethods[a.action]
    },
    createRequestCallback: function(d, a, e, b) {
        var c = this;
        return function(i, j, h) {
            if (j === true) {
                var g = c.getReader(),
                    f = g.read(h);
                Ext.apply(a, {
                    response: h,
                    resultSet: f
                });
                a.markCompleted()
            } else {
                this.fireEvent("exception", this, "response", a);
                a.markException()
            }
            if (typeof e == "function") {
                e.call(b || c, a)
            }
            c.afterRequest(d, true)
        }
    }
});
Ext.data.ProxyMgr.registerType("ajax", Ext.data.AjaxProxy);
Ext.data.HttpProxy = Ext.data.AjaxProxy;
Ext.data.RestProxy = Ext.extend(Ext.data.AjaxProxy, {
    actionMethods: {
        create: "POST",
        read: "GET",
        update: "PUT",
        destroy: "DELETE"
    },
    api: {
        create: "create",
        read: "read",
        update: "update",
        destroy: "destroy"
    }
});
Ext.data.ProxyMgr.registerType("rest", Ext.data.RestProxy);
Ext.apply(Ext, {
    getHead: function() {
        var a;
        return function() {
            if (a == undefined) {
                a = Ext.get(document.getElementsByTagName("head")[0])
            }
            return a
        }
    }()
});
Ext.data.ScriptTagProxy = Ext.extend(Ext.data.ServerProxy, {
    defaultWriterType: "base",
    timeout: 30000,
    callbackParam: "callback",
    scriptIdPrefix: "stcScript",
    callbackPrefix: "stcCallback",
    recordParam: "records",
    lastRequest: undefined,
    doRequest: function(f, j, k) {
        var i = String.format,
            a = ++Ext.data.ScriptTagProxy.TRANS_ID,
            c = i("{0}{1}", this.scriptIdPrefix, a),
            d = i("{0}{1}", this.callbackPrefix, a);
        var e = this.getWriter(),
            g = this.buildRequest(f),
            b = Ext.urlAppend(g.url, i("{0}={1}", this.callbackParam, d));
        if (f.allowWrite()) {
            g = e.write(g)
        }
        Ext.apply(g, {
            url: b,
            transId: a,
            scriptId: c,
            stCallback: d
        });
        g.timeoutId = this.createTimeoutHandler.defer(this.timeout, this, [g]);
        window[d] = this.createRequestCallback(g, f, j, k);
        var h = document.createElement("script");
        h.setAttribute("src", b);
        h.setAttribute("type", "text/javascript");
        h.setAttribute("id", c);
        Ext.getHead().appendChild(h);
        f.markStarted();
        this.lastRequest = g;
        return g
    },
    createRequestCallback: function(d, a, e, b) {
        var c = this;
        return function(h) {
            var g = c.getReader(),
                f = g.read(h);
            Ext.apply(a, {
                response: h,
                resultSet: f
            });
            a.markCompleted();
            if (typeof e == "function") {
                e.call(b || c, a)
            }
            c.afterRequest(d, true)
        }
    },
    afterRequest: function() {
        var a = function(b) {
            return function() {
                window[b] = undefined;
                try {
                    delete window[b]
                } catch (c) {}
            }
        };
        return function(c, b) {
            Ext.get(c.scriptId).remove();
            clearTimeout(c.timeoutId);
            var d = c.stCallback;
            if (b) {
                a(d)();
                this.lastRequest.completed = true
            } else {
                window[d] = a(d)
            }
        }
    }(),
    buildUrl: function(c) {
        var b = Ext.data.ScriptTagProxy.superclass.buildUrl.call(this, c);
        b = Ext.urlAppend(b, Ext.urlEncode(c.params));
        var a = c.records;
        if (Ext.isArray(a) && a.length > 0) {
            b = Ext.urlAppend(b, String.format("{0}={1}", this.recordParam, this.encodeRecords(a)))
        }
        return b
    },
    destroy: function() {
        this.abort();
        Ext.data.ScriptTagProxy.superclass.destroy.apply(this, arguments)
    },
    isLoading: function() {
        var a = this.lastRequest;
        return (a != undefined && !a.completed)
    },
    abort: function() {
        if (this.isLoading()) {
            this.afterRequest(this.lastRequest)
        }
    },
    encodeRecords: function(a) {
        var d = "";
        for (var b = 0, c = a.length; b < c; b++) {
            d += Ext.urlEncode(a[b].data)
        }
        return d
    },
    createTimeoutHandler: function(a) {
        this.afterRequest(a, false);
        this.fireEvent("exception", this, "response", a.action, {
            response: null,
            options: a.options
        });
        if (typeof a.callback == "function") {
            a.callback.call(a.scope || window, null, a.options, false)
        }
    }
});
Ext.data.ScriptTagProxy.TRANS_ID = 1000;
Ext.data.ProxyMgr.registerType("scripttag", Ext.data.ScriptTagProxy);
Ext.data.ClientProxy = Ext.extend(Ext.data.Proxy, {
    clear: function() {
        throw new Error("The Ext.data.ClientProxy subclass that you are using has not defined a 'clear' function. See src/data/ClientProxy.js for details.")
    }
});
Ext.data.MemoryProxy = Ext.extend(Ext.data.ClientProxy, {
    constructor: function(a) {
        Ext.data.MemoryProxy.superclass.constructor.call(this, a);
        this.data = {}
    }
});
Ext.data.ProxyMgr.registerType("memory", Ext.data.MemoryProxy);
Ext.data.WebStorageProxy = Ext.extend(Ext.data.ClientProxy, {
    id: undefined,
    constructor: function(a) {
        Ext.data.WebStorageProxy.superclass.constructor.call(this, a);
        if (this.getStorageObject() == undefined) {
            throw new Error("Local Storage is not supported in this browser, please use another type of data proxy")
        }
        this.id = this.id || (this.store ? this.store.storeId : undefined);
        if (this.id == undefined) {
            throw new Error("No unique id was provided to the local storage proxy. See Ext.data.LocalStorageProxy documentation for details")
        }
        this.initialize()
    },
    create: function(e, h, j) {
        var d = e.records,
            c = d.length,
            a = this.getIds(),
            f, g;
        for (f = 0; f < c; f++) {
            g = d[f];
            if (g.phantom) {
                g.phantom = false;
                var b = this.getNextId();
                this.setRecord(g, b);
                a.push(b)
            }
        }
        this.setIds(a);
        if (typeof h == "function") {
            h.call(j || this, e)
        }
    },
    read: function(e, h, j) {
        var d = [],
            a = this.getIds(),
            c = a.length,
            f, b, g;
        for (f = 0; f < c; f++) {
            d.push(this.getRecord(a[f]))
        }
        e.resultSet = new Ext.data.ResultSet({
            records: d,
            total: d.length,
            loaded: true
        });
        if (typeof h == "function") {
            h.call(j || this, e)
        }
    },
    update: function(b, f, d) {
        var a = b.records,
            e = a.length,
            c;
        for (c = 0; c < e; c++) {
            this.setRecord(a[c])
        }
        if (typeof f == "function") {
            f.call(d || this, b)
        }
    },
    destroy: function(b, h, e) {
        var a = b.records,
            f = a.length,
            d = this.getIds(),
            g = [].concat(d),
            c;
        for (c = 0; c < f; c++) {
            g.remove(d[c]);
            this.removeRecord(d[c], false)
        }
        this.setIds(g);
        if (typeof h == "function") {
            h.call(e || this, b)
        }
    },
    getRecord: function(c) {
        var a = Ext.decode(this.getStorageObject().getItem(this.getRecordKey(c))),
            e = {}, h = this.model,
            j = h.prototype.fields.items,
            d = j.length,
            f, k, b;
        for (f = 0; f < d; f++) {
            k = j[f];
            b = k.name;
            if (typeof k.decode == "function") {
                e[b] = k.decode(a[b])
            } else {
                e[b] = a[b]
            }
        }
        var g = new h(e);
        g.phantom = false;
        return g
    },
    setRecord: function(j, c) {
        if (c) {
            j.setId(c)
        } else {
            c = j.getId()
        }
        var a = j.data,
            f = {}, h = this.model,
            k = h.prototype.fields.items,
            d = k.length,
            g, m, b;
        for (g = 0; g < d; g++) {
            m = k[g];
            b = m.name;
            if (typeof m.encode == "function") {
                f[b] = m.encode(a[b], j)
            } else {
                f[b] = a[b]
            }
        }
        var e = this.getStorageObject(),
            n = this.getRecordKey(c);
        e.removeItem(n);
        e.setItem(n, Ext.encode(f))
    },
    removeRecord: function(c, b) {
        if (c instanceof Ext.data.Model) {
            c = c.getId()
        }
        if (b !== false) {
            var a = this.getIds();
            a.remove(c);
            this.setIds(a)
        }
        this.getStorageObject().removeItem(this.getRecordKey(c))
    },
    getRecordKey: function(a) {
        if (a instanceof Ext.data.Model) {
            a = a.getId()
        }
        return String.format("{0}-{1}", this.id, a)
    },
    getRecordCounterKey: function() {
        return String.format("{0}-counter", this.id)
    },
    getIds: function() {
        var a = (this.getStorageObject().getItem(this.id) || "").split(",");
        if (a.length == 1 && a[0] == "") {
            a = []
        }
        return a
    },
    setIds: function(a) {
        var b = this.getStorageObject(),
            c = a.join(",");
        if (Ext.isEmpty(c)) {
            b.removeItem(this.id)
        } else {
            b.setItem(this.id, c)
        }
    },
    getNextId: function() {
        var c = this.getStorageObject(),
            a = this.getRecordCounterKey(),
            b = +c[a],
            d = b ? b + 1 : 1;
        c.setItem(a, d);
        return parseInt(d, 10)
    },
    initialize: function() {
        var a = this.getStorageObject();
        a.setItem(this.id, a.getItem(this.id) || "")
    },
    clear: function() {
        var d = this.getStorageObject(),
            c = this.getIds(),
            a = c.length,
            b;
        for (b = 0; b < a; b++) {
            this.removeRecord(c[b])
        }
        d.removeItem(this.getRecordCounterKey());
        d.removeItem(this.id)
    },
    getStorageObject: function() {
        throw new Error("The getStorageObject function has not been defined in your Ext.data.WebStorageProxy subclass")
    }
});
Ext.data.LocalStorageProxy = Ext.extend(Ext.data.WebStorageProxy, {
    getStorageObject: function() {
        return localStorage
    }
});
Ext.data.ProxyMgr.registerType("localstorage", Ext.data.LocalStorageProxy);
Ext.data.SessionStorageProxy = Ext.extend(Ext.data.WebStorageProxy, {
    getStorageObject: function() {
        return sessionStorage
    }
});
Ext.data.ProxyMgr.registerType("sessionstorage", Ext.data.SessionStorageProxy);
Ext.data.Reader = Ext.extend(Object, {
    root: "",
    constructor: function(a) {
        Ext.apply(this, a || {});
        this.model = Ext.ModelMgr.getModel(a.model);
        if (this.model) {
            this.buildExtractors()
        }
    },
    setModel: function(a) {
        this.model = Ext.ModelMgr.getModel(a);
        delete this.extractorFunctions;
        this.buildExtractors()
    },
    read: function(a) {
        var b = a;
        if (a.responseText) {
            b = this.getResponseData(a)
        }
        return this.readRecords(b)
    },
    readRecords: function(e) {
        this.rawData = e;
        var e = this.getData(e),
            a = this.getRoot(e),
            c = a.length,
            f = true;
        if (this.totalProperty) {
            var d = parseInt(this.getTotal(e), 10);
            if (!isNaN(d)) {
                c = d
            }
        }
        if (this.successProperty) {
            var d = this.getSuccess(e);
            if (d === false || d === "false") {
                f = false
            }
        }
        var b = this.extractData(a, true);
        return new Ext.data.ResultSet({
            total: c || b.length,
            count: b.length,
            records: b,
            success: f
        })
    },
    extractData: function(j, a) {
        var k = [],
            e = [],
            h = this.model,
            c = j.length,
            m = this.idProperty;
        for (var f = 0; f < c; f++) {
            var d = j[f],
                k = this.extractValues(d),
                b = this.getId(d);
            if (a === true) {
                var g = new h(k, b);
                g.raw = d;
                e.push(g)
            } else {
                k[idProperty] = b;
                e.push(k)
            }
        }
        return e
    },
    extractValues: function(f) {
        var a = this.model.prototype.fields.items,
            d = a.length,
            b = {};
        for (var c = 0; c < d; c++) {
            var g = a[c],
                e = this.extractorFunctions[c](f) || g.defaultValue;
            b[g.name] = g.convert(e, f)
        }
        return b
    },
    getData: function(a) {
        return a
    },
    getRoot: function(a) {
        return a
    },
    getResponseData: function(a) {
        throw new Error("getResponseData must be implemented in the Ext.data.Reader subclass")
    },
    onMetaChange: function(a) {
        Ext.apply(this, a || {});
        delete this.extractorFunctions;
        this.buildExtractors()
    },
    buildExtractors: function() {
        if (this.extractorFunctions) {
            return
        }
        var m = this.id || this.idProperty,
            k = this.totalProperty,
            f = this.successProperty,
            j = this.messageProperty;
        if (k) {
            this.getTotal = this.createAccessor(k)
        }
        if (f) {
            this.getSuccess = this.createAccessor(f)
        }
        if (j) {
            this.getMessage = this.createAccessor(j)
        }
        if (m) {
            var d = this.createAccessor(m);
            this.getId = function(i) {
                var n = d(i);
                return (n == undefined || n == "") ? null : n
            }
        } else {
            this.getId = function() {
                return null
            }
        }
        var e = this.model.prototype.fields.items,
            g = [];
        for (var c = 0, b = e.length; c < b; c++) {
            var h = e[c],
                a = (h.mapping !== undefined && h.mapping !== null) ? h.mapping : h.name;
            g.push(this.createAccessor(a))
        }
        this.extractorFunctions = g
    }
});
Ext.data.Writer = Ext.extend(Object, {
    constructor: function(a) {
        Ext.apply(this, a)
    },
    write: function(e) {
        var b = e.operation,
            a = b.records || [],
            f = [];
        for (var c = 0, d = a.length; c < d; c++) {
            f.push(this.getRecordData(a[c]))
        }
        return this.writeRecords(e, f)
    },
    getRecordData: function(a) {
        return a.data
    }
});
Ext.data.WriterMgr.registerType("base", Ext.data.Writer);
Ext.data.JsonWriter = Ext.extend(Ext.data.Writer, {
    root: "records",
    encode: false,
    writeRecords: function(a, b) {
        if (this.encode === true) {
            b = Ext.encode(b)
        }
        a.jsonData = a.jsonData || {};
        a.jsonData[this.root] = b;
        return a
    }
});
Ext.data.WriterMgr.registerType("json", Ext.data.JsonWriter);
Ext.data.JsonReader = Ext.extend(Ext.data.Reader, {
    readRecords: function(a) {
        if (a.metaData) {
            this.onMetaChange(a.metaData)
        }
        this.jsonData = a;
        return Ext.data.JsonReader.superclass.readRecords.call(this, a)
    },
    getResponseData: function(a) {
        var b = Ext.decode(a.responseText);
        if (!b) {
            throw {
                message: "Ext.data.JsonReader.read: Json object not found"
            }
        }
        return b
    },
    buildExtractors: function() {
        Ext.data.JsonReader.superclass.buildExtractors.apply(this, arguments);
        if (this.root) {
            this.getRoot = this.createAccessor(this.root)
        } else {
            this.getRoot = function(a) {
                return a
            }
        }
    },
    createAccessor: function() {
        var a = /[\[\.]/;
        return function(c) {
            if (Ext.isEmpty(c)) {
                return Ext.emptyFn
            }
            if (Ext.isFunction(c)) {
                return c
            }
            var b = String(c).search(a);
            if (b >= 0) {
                return new Function("obj", "return obj" + (b > 0 ? "." : "") + c)
            }
            return function(d) {
                return d[c]
            }
        }
    }()
});
Ext.data.ReaderMgr.registerType("json", Ext.data.JsonReader);
Ext.data.ArrayReader = Ext.extend(Ext.data.JsonReader, {
    buildExtractors: function() {
        Ext.data.ArrayReader.superclass.buildExtractors.apply(this, arguments);
        var a = this.model.prototype.fields.items,
            c = a.length,
            d = [],
            b;
        for (b = 0; b < c; b++) {
            d.push(function(e) {
                return function(f) {
                    return f[e]
                }
            }(a[b].mapping || b))
        }
        this.extractorFunctions = d
    }
});
Ext.data.ReaderMgr.registerType("array", Ext.data.ArrayReader);
Ext.data.ArrayStore = Ext.extend(Ext.data.Store, {
    constructor: function(a) {
        a = a || {};
        Ext.applyIf(a, {
            proxy: {
                type: "memory",
                reader: "array"
            }
        });
        Ext.data.ArrayStore.superclass.constructor.call(this, a)
    },
    loadData: function(e, b) {
        if (this.expandData === true) {
            var d = [],
                c, a;
            for (c = 0, a = e.length; c < a; c++) {
                d[d.length] = [e[c]]
            }
            e = d
        }
        Ext.data.ArrayStore.superclass.loadData.call(this, e, b)
    }
});
Ext.reg("arraystore", Ext.data.ArrayStore);
Ext.data.SimpleStore = Ext.data.ArrayStore;
Ext.reg("simplestore", Ext.data.SimpleStore);
Ext.data.JsonStore = Ext.extend(Ext.data.Store, {
    constructor: function(a) {
        a = a || {};
        Ext.applyIf(a, {
            proxy: {
                type: "ajax",
                reader: "json",
                writer: "json"
            }
        });
        Ext.data.JsonStore.superclass.constructor.call(this, a)
    }
});
Ext.reg("jsonstore", Ext.data.JsonStore);
Ext.data.JsonPStore = Ext.extend(Ext.data.Store, {
    constructor: function(a) {
        Ext.data.JsonPStore.superclass.constructor.call(this, Ext.apply(a, {
            reader: new Ext.data.JsonReader(a),
            proxy: new Ext.data.ScriptTagProxy(a)
        }))
    }
});
Ext.reg("jsonpstore", Ext.data.JsonPStore);
Ext.data.XmlWriter = Ext.extend(Ext.data.Writer, {
    documentRoot: "xmlData",
    header: "",
    record: "record",
    writeRecords: function(b, c) {
        var a = this.buildTpl(b, c);
        b.xmlData = a.apply(c);
        return b
    },
    buildTpl: function(e, f) {
        if (this.tpl) {
            return this.tpl
        }
        var c = [],
            b = this.documentRoot,
            a = this.record,
            g, d;
        if (this.header) {
            c.push(header)
        }
        c.push("<", b, ">");
        if (f.length > 0) {
            c.push('<tpl for="."><', a, ">");
            g = f[0];
            for (d in g) {
                if (g.hasOwnProperty(d)) {
                    c.push("<", d, ">{", d, "}</", d, ">")
                }
            }
            c.push("</", a, "></tpl>")
        }
        c.push("</", b, ">");
        this.tpl = new Ext.XTemplate(c.join(""));
        return this.tpl
    }
});
Ext.data.WriterMgr.registerType("xml", Ext.data.XmlWriter);
Ext.data.XmlReader = Ext.extend(Ext.data.Reader, {
    createAccessor: function() {
        var a = function(d, c, b) {
            var e = Ext.DomQuery.selectNode(d, c),
                f;
            if (e && e.firstChild) {
                f = e.firstChild.nodeValue
            }
            return Ext.isEmpty(f) ? b : f
        };
        return function(b) {
            var c;
            if (b == this.totalProperty) {
                c = function(d, f) {
                    var e = a(b, d, defaultValue);
                    return parseFloat(e)
                }
            } else {
                if (b == this.successProperty) {
                    c = function(d, f) {
                        var e = a(b, d, true);
                        return (e !== false && e !== "false")
                    }
                } else {
                    c = function(d, e) {
                        return a(b, d, e)
                    }
                }
            }
            return c
        }
    }(),
    getResponseData: function(a) {
        var b = a.responseXML;
        if (!b) {
            throw {
                message: "Ext.data.XmlReader.read: XML data not found"
            }
        }
        return b
    },
    getData: function(a) {
        return a.documentElement || a
    },
    getRoot: function(a) {
        return Ext.DomQuery.select(this.root, a)
    },
    constructor: function(a) {
        a = a || {};
        Ext.applyIf(a, {
            idProperty: a.idPath || a.id,
            successProperty: a.success,
            root: a.record
        });
        Ext.data.XmlReader.superclass.constructor.call(this, a)
    },
    readRecords: function(a) {
        this.xmlData = a;
        return Ext.data.XmlReader.superclass.readRecords.call(this, a)
    }
});
Ext.data.ReaderMgr.registerType("xml", Ext.data.XmlReader);
Ext.data.XmlStore = Ext.extend(Ext.data.Store, {
    constructor: function(a) {
        a = a || {};
        a = a || {};
        Ext.applyIf(a, {
            proxy: {
                type: "ajax",
                reader: "xml",
                writer: "xml"
            }
        });
        Ext.data.XmlStore.superclass.constructor.call(this, a)
    }
});
Ext.reg("xmlstore", Ext.data.XmlStore);
Ext.Component = Ext.extend(Ext.util.Observable, {
    disabled: false,
    hidden: false,
    renderTpl: ['<div <tpl if="id">id="{id}" </tpl>class="{baseCls} {cls} {cmpCls}<tpl if="ui"> {uiBase}-{ui}</tpl>"<tpl if="style"> style="{style}"</tpl>></div>'],
    disabledClass: "x-item-disabled",
    styleHtmlContent: false,
    allowDomMove: true,
    autoShow: false,
    rendered: false,
    tplWriteMode: "overwrite",
    bubbleEvents: [],
    isComponent: true,
    autoRender: true,
    actionMode: "el",
    baseCls: "x-component",
    monPropRe: /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/,
    domEventsRe: /^(?:tap|doubletap|pinch|unpich|swipe|swipeleft|swiperight|scroll|scrollstart|scrollend|touchstart|touchmove|touchend|taphold|tapstart|tapcancel)$/i,
    floatingCls: "x-floating",
    modal: false,
    floating: false,
    draggable: false,
    centered: false,
    hideOnMaskTap: true,
    showAnimation: null,
    monitorOrientation: false,
    constructor: function(b) {
        b = b || {};
        this.initialConfig = b;
        Ext.apply(this, b);
        this.addEvents("beforeactivate", "activate", "beforedeactivate", "deactivate", "added", "disable", "enable", "beforeshow", "show", "beforehide", "hide", "removed", "beforerender", "render", "afterrender", "beforedestroy", "destroy", "resize", "move", "beforeorientationchange", "orientationchange");
        this.getId();
        Ext.ComponentMgr.register(this);
        Ext.Component.superclass.constructor.call(this);
        this.mons = [];
        this.renderData = this.renderData || {};
        this.renderSelectors = this.renderSelectors || {};
        this.initComponent();
        if (this.plugins) {
            if (Ext.isArray(this.plugins)) {
                for (var c = 0, a = this.plugins.length; c < a; c++) {
                    this.plugins[c] = this.initPlugin(this.plugins[c])
                }
            } else {
                this.plugins = this.initPlugin(this.plugins)
            }
        }
        if (this.renderTo) {
            this.render(this.renderTo);
            delete this.renderTo
        }
        if (this.fullscreen || this.floating) {
            this.monitorOrientation = true
        }
        if (this.fullscreen) {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.cls = (this.cls || "") + " x-fullscreen";
            this.render(document.body)
        }
    },
    initComponent: function() {
        this.enableBubble(this.bubbleEvents)
    },
    initPlugin: function(a) {
        if (a.ptype && typeof a.init != "function") {
            a = Ext.PluginMgr.create(a)
        } else {
            if (typeof a == "string") {
                a = Ext.PluginMgr.create({
                    ptype: a
                })
            }
        }
        a.init(this);
        return a
    },
    initLayout: function(a, c) {
        var b = {};
        if (!a) {
            a = c
        }
        if (Ext.isObject(a) && !a.layout) {
            b = a;
            a = b.type
        }
        if (typeof a == "string") {
            a = new Ext.layout.TYPES[a.toLowerCase()](b)
        }
        return a
    },
    render: function(b, a) {
        var c = [];
        if (!this.rendered && this.fireEvent("beforerender", this) !== false) {
            if (!b && this.el) {
                this.el = Ext.get(this.el);
                b = this.el.dom.parentNode;
                this.allowDomMove = false
            }
            this.container = Ext.get(b);
            if (this.ctCls) {
                this.container.addClass(this.ctCls)
            }
            this.rendered = true;
            if (a !== undefined) {
                if (Ext.isNumber(a)) {
                    a = this.container.dom.childNodes[a]
                } else {
                    a = Ext.getDom(a)
                }
            }
            this.onRender(this.container, a || null);
            if (this.autoShow) {
                this.el.show()
            }
            delete this.style;
            delete this.cls;
            if (this.floating) {
                this.setFloating(true)
            }
            if (this.draggable) {
                this.setDraggable(true)
            }
            this.fireEvent("render", this);
            if (this.scroll) {
                this.setScrollable(this.scroll)
            }
            var e = this.getContentTarget();
            if (this.html) {
                e.update(Ext.DomHelper.markup(this.html));
                delete this.html
            }
            if (this.contentEl) {
                var d = Ext.getDom(this.contentEl);
                Ext.fly(d).show();
                e.appendChild(d)
            }
            if (this.tpl) {
                if (!this.tpl.compile) {
                    this.tpl = new Ext.XTemplate(this.tpl)
                }
                if (this.data) {
                    this.tpl[this.tplWriteMode](e, this.data);
                    delete this.data
                }
            }
            this.afterRender(this.container);
            if (this.styleHtmlContent) {
                e.addClass("x-htmlcontent")
            }
            if (this.hidden) {
                this.onHide()
            }
            if (this.disabled) {
                this.disable(true)
            }
            this.fireEvent("afterrender", this)
        }
        return this
    },
    onRender: function(b, a) {
        var c = this.el,
            d = this.renderTpl;
        if (!c) {
            if (d) {
                Ext.applyIf(this.renderData, {
                    id: this.id,
                    baseCls: this.baseCls,
                    cls: this.cls,
                    cmpCls: this.cmpCls,
                    uiBase: this.cmpCls ? this.cmpCls : this.baseCls,
                    ui: this.ui,
                    style: this.style
                });
                if (typeof a == "number") {
                    a = b.dom.childNodes[a] || null
                }
                if (Ext.isArray(d)) {
                    d = this.proto.renderTpl = new Ext.XTemplate(d)
                }
                if (a) {
                    c = d.insertBefore(a, this.renderData, true)
                } else {
                    c = d.append(b, this.renderData, true)
                }
            }
        } else {
            c = Ext.get(c);
            if (this.allowDomMove !== false) {
                b.dom.insertBefore(c.dom, a)
            }
        }
        Ext.apply(this, this.applyRefs(c.dom));
        this.el = c
    },
    applyRefs: function(c) {
        var d, b = this.renderSelectors || {}, a = {};
        for (d in b) {
            a[d] = Ext.get(Ext.DomQuery.selectNode(b[d], c))
        }
        return a
    },
    afterRender: function() {
        this.componentLayout = this.initLayout(this.componentLayout, "component");
        this.setComponentLayout(this.componentLayout);
        if (!this.ownerCt) {
            this.setSize(this.width, this.height)
        }
        if (this.x || this.y) {
            this.setPosition(this.x, this.y)
        }
        if (this.minWidth) {
            this.el.setStyle("min-width", this.minWidth + "px")
        }
        if (this.maxWidth) {
            this.el.setStyle("max-width", this.maxWidth + "px")
        }
        if (this.minHeight) {
            this.el.setStyle("min-height", this.minHeight + "px")
        }
        if (this.maxHeight) {
            this.el.setStyle("max-height", this.maxHeight + "px")
        }
        if (this.relayDomEvents) {
            this.relayEvents(this.el, this.relayDomEvents)
        }
        if (this.monitorOrientation) {
            if (this.fullscreen) {
                this.setOrientation(Ext.Element.getOrientation())
            }
            Ext.EventManager.onOrientationChange(this.setOrientation, this)
        }
        this.initEvents()
    },
    setOrientation: function(b, a, c) {
        if (b != this.orientation) {
            if (this.fireEvent("beforeorientationchange", this, b, a, c) !== false) {
                if (this.fullscreen) {
                    this.setSize(a, c)
                }
                if (this.floating && this.centered) {
                    this.setCentered(true, true)
                }
                if (this.orientation) {
                    this.el.removeClass("x-" + this.orientation)
                }
                this.el.addClass("x-" + b);
                this.orientation = b;
                this.onOrientationChange(b, a, c);
                this.fireEvent("orientationchange", this, b, a, c)
            }
        }
    },
    onOrientationChange: function(b, a, c) {
        Ext.repaint.defer(50)
    },
    hideBrowserChrome: function() {
        setTimeout(function() {
            window.scrollTo(0, 0);
            this.setSize(window.innerWidth, window.innerHeight)
        }, 100)
    },
    addListener: function(a) {
        if (!Ext.isObject(a) && this.domEventsRe.test(a)) {
            if (this.rendered) {
                this.relayEvents(this.el, a)
            } else {
                this.relayDomEvents = this.relayDomEvents || [];
                this.relayDomEvents.push(a)
            }
            return null
        }
        return Ext.Component.superclass.addListener.apply(this, arguments)
    },
    setScrollable: function(c) {
        if (c !== false) {
            var e = Ext.isObject(c) ? c.direction : c,
                d = e === "both",
                a = d || e === "horizontal",
                b = d || e === true || e === "vertical";
            c = Ext.apply({}, Ext.isObject(c) ? c : {}, {
                jumpTo: this.jumpTo,
                momentum: true,
                horizontal: a,
                vertical: b
            });
            this.scrollEl = this.getContentTarget().createChild();
            this.originalGetContentTarget = this.getContentTarget;
            this.getContentTarget = function() {
                return this.scrollEl
            };
            this.scroller = new Ext.util.Scroller(this.scrollEl, c)
        } else {
            this.getContentTarget = this.originalGetContentTarget;
            this.scroller.destroy()
        }
    },
    setFloating: function(b, a) {
        this.floating = !! b;
        if (this.rendered) {
            if (b !== false) {
                this.el.addClass(this.floatingCls);
                if (a) {
                    this.show()
                }
            } else {
                this.el.removeClass(this.floatingCls);
                Ext.getDoc().un("touchstart", this.onFloatingTouchStart, this)
            }
        }
    },
    setDraggable: function(a, b) {
        this.draggable = !! a;
        if (this.rendered) {
            if (a === false) {
                if (this.dragObj) {
                    this.dragObj.disable()
                }
            } else {
                if (b) {
                    this.show()
                }
                if (this.dragObj) {
                    this.dragObj.enable()
                } else {
                    this.dragObj = new Ext.util.Draggable(this.el, Ext.apply({}, this.dragConfig || {}));
                    this.relayEvents(this.dragObj, ["dragstart", "drag", "dragend"])
                }
            }
        }
    },
    initEvents: function() {
        if (this.monitorResize === true) {
            Ext.EventManager.onWindowResize(this.setSize, this)
        }
    },
    setComponentLayout: function(a) {
        if (this.componentLayout && this.componentLayout != a) {
            this.componentLayout.setOwner(null)
        }
        this.componentLayout = a;
        a.setOwner(this)
    },
    doComponentLayout: function(a, b) {
        if (this.rendered && this.componentLayout) {
            this.componentLayout.layout(a, b)
        }
        return this
    },
    afterComponentLayout: function() {
        if (this.scrollEl) {
            if (this.scroller.horizontal) {
                this.scrollEl.setStyle("min-width", (this.body || this.el).getWidth(true) + "px");
                this.scrollEl.setHeight((this.body || this.el).getHeight(true) || null)
            } else {
                this.scrollEl.setStyle("min-height", (this.body || this.el).getHeight(true) + "px");
                this.scrollEl.setWidth((this.body || this.el).getWidth(true) || null)
            }
            this.scroller.updateBounds()
        }
    },
    setPosition: function(a, e) {
        if (Ext.isObject(a)) {
            e = a.y;
            a = a.x
        }
        if (!this.rendered) {
            return this
        }
        var b = this.adjustPosition(a, e),
            c = this.getPositionEl(),
            d;
        a = b.x;
        e = b.y;
        if (a !== d || e !== d) {
            if (e !== d && a !== d) {
                c.setBox(a, e)
            } else {
                if (a !== d) {
                    c.setLeft(a)
                } else {
                    if (e !== d) {
                        c.setTop(e)
                    }
                }
            }
            this.onPosition(a, e);
            this.fireEvent("move", this, a, e)
        }
        return this
    },
    onPosition: Ext.emptyFn,
    setSize: function(a, b) {
        if (Ext.isObject(a)) {
            b = a.height;
            a = a.width
        }
        a = a !== undefined ? a : this.width;
        b = b !== undefined ? b : this.height;
        if (a !== undefined) {
            a = a.constrain(this.boxMinWidth, this.boxMaxWidth)
        }
        if (b !== undefined) {
            b = b.constrain(this.boxMinHeight, this.boxMaxHeight)
        }
        if (!this.rendered) {
            this.width = a;
            this.height = b;
            return this
        }
        if (this.cacheSizes !== false && this.lastSize && this.lastSize.width == a && this.lastSize.height == b) {
            return this
        }
        this.lastSize = {
            width: a,
            height: b
        };
        var c = this.adjustSize(a, b);
        a = c.width;
        b = c.height;
        if (a !== undefined || b !== undefined) {
            this.doComponentLayout(a, b);
            this.onResize(a, b);
            this.fireEvent("resize", this, a, b)
        }
        return this
    },
    setWidth: function(a) {
        return this.setSize(a)
    },
    setHeight: function(a) {
        return this.setSize(undefined, a)
    },
    getSize: function() {
        return this.getResizeEl().getSize()
    },
    getWidth: function() {
        return this.getResizeEl().getWidth()
    },
    getHeight: function() {
        return this.getResizeEl().getHeight()
    },
    getOuterSize: function() {
        var a = this.getResizeEl();
        return {
            width: a.getOuterWidth(),
            height: a.getOuterHeight()
        }
    },
    getTargetBox: function() {
        return this.el.getBox(true, true)
    },
    getResizeEl: function() {
        return this.el
    },
    onResize: Ext.emptyFn,
    adjustSize: function(a, b) {
        if (this.autoWidth) {
            a = "auto"
        }
        if (this.autoHeight) {
            b = "auto"
        }
        return {
            width: a,
            height: b
        }
    },
    adjustPosition: function(a, b) {
        return {
            x: a,
            y: b
        }
    },
    getId: function() {
        return this.id || (this.id = "ext-comp-" + (++Ext.Component.AUTO_ID))
    },
    getItemId: function() {
        return this.itemId || this.getId()
    },
    getEl: function() {
        return this.el
    },
    getActionEl: function() {
        return this[this.actionMode]
    },
    getBubbleTarget: function() {
        return this.ownerCt
    },
    getContentTarget: function() {
        return this.el
    },
    addClass: function(a) {
        if (this.el) {
            this.el.addClass(a)
        } else {
            this.cls = this.cls ? this.cls + " " + a : a
        }
        return this
    },
    removeClass: function(a) {
        if (this.el) {
            this.el.removeClass(a)
        } else {
            if (this.cls) {
                this.cls = this.cls.split(" ").remove(a).join(" ")
            }
        }
        return this
    },
    enable: function(a) {
        if (this.rendered) {
            this.onEnable()
        }
        this.disabled = false;
        if (a !== true) {
            this.fireEvent("enable", this)
        }
        return this
    },
    disable: function(a) {
        if (this.rendered) {
            this.onDisable()
        }
        this.disabled = true;
        if (a !== true) {
            this.fireEvent("disable", this)
        }
        return this
    },
    onEnable: function() {
        this.getActionEl().removeClass(this.disabledClass);
        this.el.dom.disabled = false
    },
    onDisable: function() {
        this.getActionEl().addClass(this.disabledClass);
        this.el.dom.disabled = true
    },
    setDisabled: function(a) {
        return this[a ? "disable" : "enable"]()
    },
    show: function(a) {
        if (this.fireEvent("beforeshow", this) !== false) {
            if (this.anchorEl) {
                this.anchorEl.hide()
            }
            this.hidden = false;
            if (!this.rendered && this.autoRender) {
                this.render(Ext.isBoolean(this.autoRender) ? Ext.getBody() : this.autoRender)
            }
            if (this.rendered) {
                this.onShow(a)
            }
            this.fireEvent("show", this)
        }
        return this
    },
    showBy: function(b, d, e) {
        e = e || [0, 20];
        if (!this.floating) {
            return this
        }
        if (b.isComponent) {
            b = b.el
        } else {
            b = Ext.get(b)
        }
        var h = b.getPageBox();
        this.x = h.left + e[0];
        this.y = h.bottom + e[1];
        this.show(d);
        if (!this.anchorEl) {
            this.anchorEl = this.el.createChild({
                cls: "x-anchor"
            })
        }
        this.anchorEl.show();
        var g = Ext.Element.getViewSize(),
            c = this.el.getPageBox(),
            a, f;
        if (c.right > g.width) {
            a = h.right - e[0] - c.width;
            this.anchorEl.removeClass("x-anchor-left").addClass("x-anchor-right")
        } else {
            this.anchorEl.removeClass("x-anchor-right").addClass("x-anchor-left")
        }
        if (c.bottom > g.height) {
            f = h.top - e[1] - c.height;
            this.anchorEl.removeClass("x-anchor-top").addClass("x-anchor-bottom")
        } else {
            this.anchorEl.removeClass("x-anchor-bottom").addClass("x-anchor-top")
        }
        if (a != undefined || f != undefined) {
            this.setPosition(a != undefined ? a : this.x, f != undefined ? f : this.y)
        }
        return this
    },
    setCentered: function(b, d) {
        this.centered = b;
        if (this.rendered && d) {
            var a, c;
            if (!this.ownerCt) {
                a = (Ext.Element.getViewportWidth() / 2) - (this.getWidth() / 2);
                c = (Ext.Element.getViewportHeight() / 2) - (this.getHeight() / 2)
            } else {
                a = (this.ownerCt.getContentTarget().getWidth() / 2) - (this.getWidth() / 2);
                c = (this.ownerCt.getContentTarget().getHeight() / 2) - (this.getHeight() / 2)
            }
            this.setPosition(a, c)
        }
        return this
    },
    hide: function(a) {
        if (this.fireEvent("beforehide", this) !== false) {
            this.hidden = true;
            if (this.rendered) {
                this.onHide(a)
            }
            this.fireEvent("hide", this)
        }
        return this
    },
    onShow: function(d) {
        d = d || this.showAnimation;
        if (this.floating) {
            this.el.appendTo(document.body);
            this.getVisibilityEl().show();
            if (d) {
                this.el.setStyle("opacity", 0.01)
            }
            if (this.centered) {
                this.setCentered(true, true)
            } else {
                this.setPosition(this.x, this.y)
            }
            if (d) {
                var a = {}, b, e = Ext.getDoc();
                if (Ext.isObject(d) && !d.run) {
                    a = Ext.apply({}, d || {});
                    b = a.type
                } else {
                    if (Ext.isString(d)) {
                        b = d
                    } else {
                        if (d.run) {
                            d.run(this.el, {
                                out: false
                            });
                            this.showAnimation = d;
                            return
                        }
                    }
                }
                function c(f) {
                    f.preventDefault()
                }
                e.on("click", c, this, {
                    single: true
                });
                a.after = function() {
                    (function() {
                        e.un("click", c, this)
                    }).defer(50, this)
                };
                a.scope = this;
                a.out = false;
                a.autoClear = true;
                Ext.anims[b].run(this.el, a);
                this.showAnimation = b
            }
            delete this.lastSize;
            this.doComponentLayout(this.width, this.height);
            if (this.modal) {
                if (this.ownerCt) {
                    this.ownerCt.el.mask()
                } else {
                    Ext.getBody().mask()
                }
            }
            if (this.hideOnMaskTap) {
                Ext.getDoc().on("touchstart", this.onFloatingTouchStart, this)
            }
        } else {
            this.getVisibilityEl().show()
        }
    },
    onFloatingTouchStart: function(c, a) {
        var b = Ext.getDoc();
        if (!this.el.contains(a)) {
            b.on("touchend", function(d) {
                this.hide();
                d.stopEvent()
            }, this, {
                single: true
            });
            c.stopEvent()
        }
    },
    onHide: function(b) {
        b = b || this.showAnimation;
        if (this.hideOnMaskTap && this.floating) {
            Ext.getDoc().un("touchstart", this.onFloatingTouchStart, this)
        }
        if (this.floating && this.modal) {
            if (this.ownerCt) {
                this.ownerCt.el.unmask()
            } else {
                Ext.getBody().unmask()
            }
        }
        if (b) {
            var c = {}, a;
            if (Ext.isObject(b) && !b.run) {
                c = Ext.apply({}, b || {});
                a = c.type
            } else {
                if (Ext.isString(b)) {
                    a = b
                }
            }
            c.after = function() {
                this.getVisibilityEl().hide()
            };
            c.scope = this;
            c.out = true;
            c.autoClear = true;
            Ext.anims[a].run(this.el, c)
        } else {
            this.getVisibilityEl().hide()
        }
    },
    mon: function(f, b, d, c, a) {
        if (Ext.isObject(b)) {
            var h = b,
                g;
            for (g in h) {
                if (this.monPropRe.test(g)) {
                    continue
                }
                this.mons.push({
                    item: f,
                    ename: g,
                    fn: h[g],
                    scope: h.scope
                });
                if (typeof h[g] == "function") {
                    f.on(g, h[g], h.scope, h)
                } else {
                    f.on(g, h[g])
                }
            }
            return
        }
        this.mons.push({
            item: f,
            ename: b,
            fn: d,
            scope: c
        });
        f.on(b, d, c, a)
    },
    mun: function(j, b, h, k) {
        if (Ext.isObject(b)) {
            for (var f in b) {
                if (this.monPropRe.test(f)) {
                    continue
                }
                if (typeof b[f] == "function") {
                    this.mun(j, f, b[f], b.scope)
                } else {
                    this.mun(j, f, b[f].fn, b[f].scope)
                }
            }
            return
        }
        var c = this.mons.slice(),
            g = c.length,
            d, a;
        for (d = 0; d < g; d++) {
            a = c[d];
            if (a.item === j && a.ename === b && (!h || a.fn === h) && (!k || a.scope === k)) {
                this.mons.remove(a);
                j.un(a.ename, a.fn, a.scope)
            }
        }
    },
    purgeListeners: function() {
        Ext.Component.superclass.purgeListeners.call(this);
        this.clearMons()
    },
    clearMons: function() {
        var b = this.mons,
            d = b.length,
            a, c;
        for (a = 0; a < d; a++) {
            c = b[a];
            c.item.un(c.ename, c.fn, c.scope)
        }
        this.mons = []
    },
    beforeDestroy: function() {
        this.clearMons();
        if (this.monitorResize) {
            Ext.EventManager.removeResizeListener(this.doComponentLayout, this)
        }
    },
    destroy: function() {
        if (!this.isDestroyed) {
            if (this.fireEvent("beforedestroy", this) !== false) {
                this.destroying = true;
                this.beforeDestroy();
                if (this.ownerCt && this.ownerCt.remove) {
                    this.ownerCt.remove(this, false)
                }
                if (this.rendered) {
                    this.el.remove();
                    if (this.actionMode == "container" || this.removeMode == "container") {
                        this.container.remove()
                    }
                }
                this.onDestroy();
                Ext.ComponentMgr.unregister(this);
                this.fireEvent("destroy", this);
                this.purgeListeners();
                this.destroying = false;
                this.isDestroyed = true
            }
        }
    },
    onDestroy: Ext.emptyFn,
    update: function(b, d, a) {
        var c = this.getContentTarget();
        if (this.tpl && typeof b !== "string") {
            this.data = b;
            this.tpl[this.tplWriteMode](c, b || {})
        } else {
            var e = Ext.isObject(b) ? Ext.DomHelper.markup(b) : b;
            if (this.rendered) {
                c.update(e, d, a)
            } else {
                this.html = e
            }
        }
        this.doComponentLayout();
        Ext.repaint()
    },
    onAdded: function(a, b) {
        this.ownerCt = a;
        this.fireEvent("added", this, a, b)
    },
    onRemoved: function() {
        this.fireEvent("removed", this, this.ownerCt);
        delete this.ownerCt
    },
    setVisible: function(a) {
        return this[a ? "show" : "hide"]()
    },
    isVisible: function() {
        if (!this.rendered) {
            return false
        }
        var a = this,
            b = true;
        while (a) {
            if (a.hidden) {
                b = false;
                break
            }
            a = a.ownerCt
        }
        return b
    },
    getPositionEl: function() {
        return this.positionEl || this.el
    },
    getVisibilityEl: function() {
        return this.el
    }
});
Ext.layout.TYPES = {};
Ext.Component.AUTO_ID = 1000;
Ext.BoxComponent = Ext.Component;
Ext.reg("component", Ext.Component);
Ext.reg("box", Ext.BoxComponent);
Ext.Component.prototype.on = Ext.Component.prototype.addListener;
Ext.Button = Ext.extend(Ext.Component, {
    hidden: false,
    disabled: false,
    pressEvent: "tap",
    baseCls: "x-button",
    pressedCls: "x-button-pressed",
    badgeText: "",
    badgeCls: "x-badge",
    hasBadgeCls: "x-hasbadge",
    labelCls: "x-button-label",
    ui: "normal",
    isButton: true,
    pressedDelay: 0,
    afterRender: function(c, a) {
        this.mon(this.el, this.pressEvent, this.onPress, this);
        this.mon(this.el, "tapstart", this.onTapStart, this);
        this.mon(this.el, "tapcancel", this.onTapCancel, this);
        Ext.Button.superclass.afterRender.call(this, c, a);
        var f = this.text,
            d = this.icon,
            b = this.iconCls,
            e = this.badgeText;
        this.text = this.icon = this.iconCls = this.badgeText = null;
        this.setText(f);
        this.setIcon(d);
        this.setIconClass(b);
        this.setBadge(e)
    },
    onTapStart: function() {
        if (!this.disabled) {
            var a = this;
            if (a.pressedDelay) {
                a.pressedTimeout = setTimeout(function() {
                    a.el.addClass(a.pressedCls)
                }, Ext.isNumber(a.pressedDelay) ? a.pressedDelay : 100)
            } else {
                a.el.addClass(a.pressedCls)
            }
        }
    },
    onTapCancel: function() {
        if (this.pressedTimeout) {
            clearTimeout(this.pressedTimeout);
            delete this.pressedTimeout
        }
        this.el.removeClass(this.pressedCls)
    },
    setHandler: function(b, a) {
        this.handler = b;
        this.scope = a;
        return this
    },
    setText: function(a) {
        if (this.rendered) {
            if (!this.textEl && a) {
                this.textEl = this.el.createChild({
                    tag: "span",
                    html: a,
                    cls: this.labelCls
                })
            } else {
                if (this.textEl && a != this.text) {
                    if (a) {
                        this.textEl.setHTML(a)
                    } else {
                        this.textEl.remove();
                        this.textEl = null
                    }
                }
            }
        }
        this.text = a;
        return this
    },
    setIcon: function(a) {
        if (this.rendered) {
            if (!this.iconEl && a) {
                this.iconEl = this.el.createChild({
                    tag: "img",
                    src: Ext.BLANK_IMAGE_URL,
                    style: "background-image: " + (a ? "url(" + a + ")" : "")
                })
            } else {
                if (this.iconEl && a != this.icon) {
                    if (a) {
                        this.iconEl.setStyle("background-image", a ? "url(" + a + ")" : "")
                    } else {
                        this.iconEl.remove();
                        this.iconEl = null
                    }
                }
            }
        }
        this.icon = a;
        return this
    },
    setIconClass: function(a) {
        if (this.rendered) {
            if (!this.iconEl && a) {
                this.iconEl = this.el.createChild({
                    tag: "img",
                    src: Ext.BLANK_IMAGE_URL,
                    cls: a
                })
            } else {
                if (this.iconEl && a != this.iconCls) {
                    if (a) {
                        if (this.iconCls) {
                            this.iconEl.removeClass(this.iconCls)
                        }
                        this.iconEl.addClass(a)
                    } else {
                        this.iconEl.remove();
                        this.iconEl = null
                    }
                }
            }
        }
        this.iconCls = a;
        return this
    },
    setBadge: function(a) {
        if (this.rendered) {
            if (!this.badgeEl && a) {
                this.badgeEl = this.el.createChild({
                    tag: "span",
                    cls: this.badgeCls,
                    html: a
                });
                this.el.addClass(this.hasBadgeCls)
            } else {
                if (this.badgeEl && a != this.badgeText) {
                    if (a) {
                        this.badgeEl.setHTML(a);
                        this.el.addClass(this.hasBadgeCls)
                    } else {
                        this.badgeEl.remove();
                        this.badgeEl = null;
                        this.el.removeClass(this.hasBadgeCls)
                    }
                }
            }
        }
        this.badgeText = a;
        return this
    },
    getText: function() {
        return this.text
    },
    getBadgeText: function() {
        return this.badgeText
    },
    onDisable: function() {
        this.onDisableChange(true)
    },
    onEnable: function() {
        this.onDisableChange(false)
    },
    onDisableChange: function(a) {
        if (this.el) {
            this.el[a ? "addClass" : "removeClass"](this.disabledClass);
            this.el.dom.disabled = a
        }
        this.disabled = a
    },
    onPress: function(a) {
        if (!this.disabled) {
            this.onTapCancel();
            if (this.handler) {
                this.handler.call(this.scope || this, this, a)
            }
        }
    }
});
Ext.reg("button", Ext.Button);
Ext.Container = Ext.extend(Ext.Component, {
    autoDestroy: true,
    defaultType: "panel",
    isContainer: true,
    baseCls: "x-container",
    animation: null,
    initComponent: function() {
        Ext.Container.superclass.initComponent.call(this);
        this.addEvents("afterlayout", "beforeadd", "beforeremove", "add", "remove", "beforecardswitch", "cardswitch");
        this.initItems()
    },
    initItems: function() {
        var a = this.items;
        this.items = new Ext.util.MixedCollection(false, this.getComponentId);
        if (a) {
            this.add(a)
        }
    },
    setLayout: function(a) {
        if (this.layout && this.layout != a) {
            this.layout.setOwner(null)
        }
        this.layout = a;
        a.setOwner(this)
    },
    prepareItems: function(a, c) {
        if (!Ext.isArray(a)) {
            a = [a]
        }
        var e, b, d;
        for (b = 0, d = a.length; b < d; b++) {
            e = a[b];
            if (c) {
                e = this.applyDefaults(e)
            }
            a[b] = this.lookupComponent(e)
        }
        return a
    },
    applyDefaults: function(b) {
        var a = this.defaults;
        if (a) {
            if (Ext.isFunction(a)) {
                a = a.call(this, b)
            }
            if (typeof b == "string") {
                b = Ext.ComponentMgr.get(b);
                Ext.apply(b, a)
            } else {
                if (!b.events) {
                    Ext.applyIf(b, a)
                } else {
                    Ext.apply(b, a)
                }
            }
        }
        return b
    },
    lookupComponent: function(a) {
        if (typeof a == "string") {
            return Ext.ComponentMgr.get(a)
        } else {
            if (!a.events) {
                return this.createComponent(a)
            }
        }
        return a
    },
    createComponent: function(a, d) {
        if (a.render) {
            return a
        }
        var b = Ext.create(Ext.apply({
            ownerCt: this
        }, a), d || this.defaultType);
        delete b.initialConfig.ownerCt;
        delete b.ownerCt;
        return b
    },
    afterRender: function() {
        this.layout = this.initLayout(this.layout, "auto");
        this.setLayout(this.layout);
        Ext.Container.superclass.afterRender.call(this)
    },
    doLayout: function() {
        if (this.rendered && this.layout) {
            this.layout.layout()
        }
        return this
    },
    afterLayout: function(a) {
        if (this.floating && this.centered) {
            this.setCentered(true, true)
        }
        if (this.scroller) {
            this.scroller.updateBounds()
        }
        this.fireEvent("afterlayout", this, a)
    },
    getLayoutTarget: function() {
        return this.el
    },
    getComponentId: function(a) {
        return a.getItemId()
    },
    add: function() {
        var f = Array.prototype.slice.call(arguments),
            d = -1;
        if (typeof f[0] == "number") {
            d = f.shift()
        }
        var a = f.length > 1;
        if (a || Ext.isArray(f[0])) {
            var g = a ? f : f[0],
                b = [],
                c, e, j;
            for (c = 0, e = g.length; c < e; c++) {
                j = g[c];
                if (d != -1) {
                    j = this.add(d + c, j)
                } else {
                    j = this.add(j)
                }
                b.push(j)
            }
            return b
        }
        var h = this.prepareItems(f[0], true)[0];
        d = (d !== -1) ? d : this.items.length;
        if (this.fireEvent("beforeadd", this, h, d) !== false && this.onBeforeAdd(h) !== false) {
            this.items.insert(d, h);
            h.onAdded(this, d);
            this.onAdd(h);
            this.fireEvent("add", this, h, d)
        }
        return h
    },
    onAdd: Ext.emptyFn,
    onRemove: Ext.emptyFn,
    insert: function(b, a) {
        this.add(b, a)
    },
    onBeforeAdd: function(a) {
        if (a.ownerCt) {
            a.ownerCt.remove(a, false)
        }
        if (this.hideBorders === true) {
            a.border = (a.border === true)
        }
    },
    remove: function(a, b) {
        var d = this.getComponent(a);
        if (d && this.fireEvent("beforeremove", this, d) !== false) {
            this.doRemove(d, b);
            this.fireEvent("remove", this, d)
        }
        return d
    },
    doRemove: function(c, b) {
        var d = this.layout,
            a = d && this.rendered;
        if (a) {
            d.onRemove(c)
        }
        this.items.remove(c);
        c.onRemoved();
        this.onRemove(c);
        if (b === true || (b !== false && this.autoDestroy)) {
            c.destroy()
        }
        if (a) {
            d.afterRemove(c)
        }
    },
    removeAll: function(b) {
        var f, d = this.items.items.slice(),
            a = [],
            e = d.length,
            c;
        for (c = 0; c < e; c++) {
            f = d[c];
            this.remove(f, b);
            if (f.ownerCt !== this) {
                a.push(f)
            }
        }
        return a
    },
    getComponent: function(a) {
        if (Ext.isObject(a)) {
            a = a.getItemId()
        }
        return this.items.get(a)
    },
    onShow: function() {
        Ext.Container.superclass.onShow.apply(this, arguments);
        if (Ext.isDefined(this.deferLayout)) {
            delete this.deferLayout;
            this.doLayout(true)
        }
    },
    getLayout: function() {
        if (!this.layout) {
            var a = new Ext.layout.AutoLayout(this.layoutConfig);
            this.setLayout(a)
        }
        return this.layout
    },
    setScrollable: function(a) {
        Ext.Container.superclass.setScrollable.call(this, a);
        if (a !== false) {
            this.originalGetLayoutTarget = this.getLayoutTarget;
            this.getLayoutTarget = function() {
                return this.scrollEl
            }
        } else {
            this.getLayoutTarget = this.originalGetLayoutTarget
        }
    },
    beforeDestroy: function() {
        var a;
        if (this.items) {
            a = this.items.first();
            while (a) {
                this.doRemove(a, true);
                a = this.items.first()
            }
        }
        Ext.destroy(this.layout);
        Ext.Container.superclass.beforeDestroy.call(this)
    },
    getActiveItem: function() {
        if (this.layout && this.layout.type === "card") {
            return this.layout.activeItem
        } else {
            return null
        }
    },
    setCard: function(a, b) {
        this.layout.setActiveItem(a, b);
        return this
    },
    onBeforeCardSwitch: function(a, b, c) {
        return this.fireEvent("beforecardswitch", this, a, b, this.items.indexOf(a), c)
    },
    onCardSwitch: function(a, b, c) {
        return this.fireEvent("cardswitch", this, a, b, this.items.indexOf(a), c)
    }
});
Ext.Container.LAYOUTS = Ext.layout.TYPES;
Ext.reg("container", Ext.Container);
Ext.SplitButton = Ext.extend(Ext.Container, {
    defaultType: "button",
    cmpCls: "x-splitbutton",
    activeCls: "x-button-active",
    allowMultiple: false,
    initComponent: function() {
        this.layout = {
            type: "hbox",
            align: "stretch"
        };
        Ext.SplitButton.superclass.initComponent.call(this)
    },
    afterRender: function() {
        Ext.SplitButton.superclass.afterRender.call(this);
        this.mon(this.el, {
            tap: this.onTap,
            scope: this
        })
    },
    afterLayout: function(a) {
        Ext.SplitButton.superclass.afterLayout.call(this, a);
        if (!this.initialized) {
            this.items.each(function(b) {
                if (b.active) {
                    this.setActive(b)
                }
            }, this);
            this.initialized = true
        }
    },
    onTap: function(b, a) {
        a = b.getTarget(".x-button");
        if (a && !this.disabled) {
            this.setActive(Ext.getCmp(a.id))
        }
    },
    getActive: function() {
        return this.allowMultiple ? this.activeButtons : this.activeButton
    },
    setActive: function(b) {
        if (Ext.isNumber(b)) {
            b = this.items.get(b)
        } else {
            if (Ext.isString(b)) {
                b = Ext.getCmp(b)
            } else {
                if (!b.isButton) {
                    b = null
                }
            }
        }
        if (this.allowMultiple) {
            this.activeButtons = this.activeButtons || [];
            if (b) {
                var a = this.activeButtons.indexOf(b);
                if (a == -1) {
                    this.activeButtons.push(b);
                    b.el.addClass(this.activeCls)
                } else {
                    this.activeButtons.splice(a, 1);
                    b.el.removeClass(this.activeCls)
                }
            }
        } else {
            this.activeButton = b;
            if (this.activeButton) {
                b.el.radioClass(this.activeCls)
            }
        }
    },
    disable: function() {
        this.items.each(function(a) {
            a.disable()
        }, this);
        Ext.SplitButton.superclass.disable.apply(this, arguments)
    },
    enable: function() {
        this.items.each(function(a) {
            a.enable()
        }, this);
        Ext.SplitButton.superclass.enable.apply(this, arguments)
    }
});
Ext.reg("splitbutton", Ext.SplitButton);
Ext.Panel = Ext.extend(Ext.Container, {
    baseCls: "x-panel",
    padding: undefined,
    scroll: false,
    fullscreen: false,
    isPanel: true,
    componentLayout: "dock",
    renderTpl: ['<div <tpl if="id">id="{id}"</tpl> class="{baseCls} {cls} {cmpCls}<tpl if="ui"> {uiBase}-{ui}</tpl>" <tpl if="style"> style="{style}"</tpl>>', '<div class="{baseCls}-body"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>></div>', "</div>"],
    initComponent: function() {
        Ext.Panel.superclass.initComponent.call(this);
        this.addEvents("bodyresize", "activate", "deactivate")
    },
    initItems: function() {
        Ext.Panel.superclass.initItems.call(this);
        var a = this.dockedItems;
        this.dockedItems = new Ext.util.MixedCollection(false, this.getComponentId);
        if (a) {
            this.addDocked(a)
        }
    },
    onRender: function(c, b) {
        var a = [],
            d;
        if (this.padding != d) {
            a.push("padding: " + Ext.Element.parseBox((this.padding === true) ? 5 : this.padding))
        }
        if (this.margin != d) {
            a.push("margin: " + Ext.Element.parseBox((this.margin === true) ? 1 : this.margin))
        }
        if (this.border != d) {
            a.push("border-width: " + Ext.Element.parseBox((this.border === true) ? 1 : this.border))
        }
        Ext.applyIf(this.renderData, {
            bodyStyle: a.length ? a.join(";") : d
        });
        Ext.applyIf(this.renderSelectors, {
            body: ":first-child"
        });
        Ext.Panel.superclass.onRender.call(this, c, b)
    },
    addDocked: function(a, e) {
        a = this.prepareItems(a);
        var d, b, c;
        for (b = 0, c = a.length; b < c; b++) {
            d = a[b];
            if (e !== undefined) {
                this.dockedItems.insert(e + b, d)
            } else {
                this.dockedItems.add(d)
            }
            d.onAdded(this, b);
            this.onDockedAdd(d)
        }
        if (this.rendered) {
            this.doComponentLayout()
        }
    },
    onDockedAdd: Ext.emptyFn,
    onDockedRemove: Ext.emptyFn,
    insertDocked: function(b, a) {
        this.addDocked(a, b)
    },
    removeDocked: function(d, b) {
        if (!this.dockedItems.contains(d)) {
            return d
        }
        var c = this.componentLayout,
            a = c && this.rendered;
        if (a) {
            c.onRemove(d)
        }
        this.dockedItems.remove(d);
        d.onRemoved();
        this.onDockedRemove(d);
        if (b === true || (b !== false && this.autoDestroy)) {
            d.destroy()
        }
        if (a) {
            c.afterRemove(d)
        }
        if (this.rendered) {
            this.doComponentLayout()
        }
        return d
    },
    getDockedItems: function() {
        if (this.dockedItems && this.dockedItems.items.length) {
            return this.dockedItems.items.slice()
        }
        return []
    },
    getLayoutTarget: function() {
        return this.body
    },
    getContentTarget: function() {
        return this.body
    },
    getTargetSize: function() {
        var a = this.body.getViewSize();
        a.width -= this.body.getPadding("lr");
        a.height -= this.body.getPadding("tb");
        return a
    }
});
Ext.reg("panel", Ext.Panel);
Ext.DataPanel = Ext.extend(Ext.Panel, {
    blockRefresh: false,
    initComponent: function() {
        if (Ext.isString(this.tpl) || Ext.isArray(this.tpl)) {
            this.tpl = new Ext.XTemplate(this.tpl)
        }
        this.store = Ext.StoreMgr.lookup(this.store);
        this.all = new Ext.CompositeElementLite();
        this.instances = new Ext.util.MixedCollection();
        if (this.components) {
            if (Ext.isFunction(this.components)) {
                this.components = [{
                    config: this.components
                }]
            } else {
                if (Ext.isObject(this.components)) {
                    this.components = [this.components]
                }
            }
            if (!this.tpl) {
                this.tpl = new Ext.XTemplate('<tpl for="."><div class="x-list-item"></div></tpl>', {
                    compiled: true
                });
                this.itemSelector = ".x-list-item"
            }
        }
        Ext.DataPanel.superclass.initComponent.call(this)
    },
    afterRender: function() {
        Ext.DataPanel.superclass.afterRender.call(this);
        var e = this.components,
            d, b, a, c;
        if (e) {
            for (b = 0, d = e.length; b < d; b++) {
                a = e[b];
                if (a.listeners) {
                    a.delegateCls = Ext.id(null, "x-cmp-");
                    a.listeners.delegate = (a.targetSelector || this.itemSelector) + " > ." + a.delegateCls;
                    this.mon(this.getTemplateTarget(), a.listeners)
                }
            }
        }
        if (this.store) {
            this.bindStore(this.store, true)
        }
    },
    getStore: function() {
        return this.store
    },
    refresh: function() {
        if (!this.rendered) {
            return
        }
        var b = this.getTemplateTarget(),
            a = this.store.getRange();
        if (a.length < 1) {
            this.all.clear()
        } else {
            this.tpl.overwrite(b, this.collectData(a, 0));
            this.all.fill(Ext.query(this.itemSelector, b.dom))
        }
        this.updateItems(0)
    },
    getTemplateTarget: function() {
        return this.scrollEl || this.body
    },
    prepareData: function(a) {
        return a
    },
    collectData: function(a, e) {
        var c = [],
            b, d = a.length;
        for (b = 0; b < d; b++) {
            c[c.length] = this.prepareData(a[b].data, e + b, a[b])
        }
        return c
    },
    bindStore: function(a, b) {
        if (!this.rendered) {
            this.store = a;
            return
        }
        if (!b && this.store) {
            if (a !== this.store && this.store.autoDestroy) {
                this.store.destroyStore()
            } else {
                this.store.un({
                    scope: this,
                    beforeload: this.onBeforeLoad,
                    datachanged: this.onDataChanged,
                    add: this.onAdd,
                    remove: this.onRemove,
                    update: this.onUpdate,
                    clear: this.refresh
                })
            }
            if (!a) {
                this.store = null
            }
        }
        if (a) {
            a = Ext.StoreMgr.lookup(a);
            a.on({
                scope: this,
                beforeload: this.onBeforeLoad,
                datachanged: this.onDataChanged,
                add: this.onAdd,
                remove: this.onRemove,
                update: this.onUpdate,
                clear: this.refresh
            })
        }
        this.store = a;
        if (a) {
            this.refresh()
        }
    },
    onBeforeLoad: Ext.emptyFn,
    bufferRender: function(a, b) {
        var c = document.createElement("div");
        this.tpl.overwrite(c, this.collectData(a, b));
        return Ext.query(this.itemSelector, c)
    },
    onUpdate: function(f, a) {
        var b = this.store.indexOf(a),
            e, c, d;
        if (b > -1) {
            e = this.isSelected(b);
            c = this.all.elements[b];
            d = this.bufferRender([a], b)[0];
            this.all.replaceElement(b, d, true);
            if (e) {
                this.selected.replaceElement(c, d);
                this.all.item(b).addClass(this.selectedClass)
            }
            this.updateItems(b, b)
        }
    },
    onAdd: function(f, d, e) {
        if (this.all.getCount() === 0) {
            this.refresh();
            return
        }
        var c = this.bufferRender(d, e),
            g, b = this.all.elements;
        if (e < this.all.getCount()) {
            g = this.all.item(e).insertSibling(c, "before", true);
            b.splice.apply(b, [e, 0].concat(c))
        } else {
            g = this.all.last().insertSibling(c, "after", true);
            b.push.apply(b, c)
        }
        this.updateItems(e)
    },
    onRemove: function(c, a, b) {
        this.deselect(b);
        this.all.removeElement(b, true);
        this.updateItems(b);
        if (this.store.getCount() === 0) {
            this.refresh()
        }
    },
    refreshNode: function(a) {
        this.onUpdate(this.store, this.store.getAt(a))
    },
    updateItems: function(d, c) {
        var b = this.all.elements;
        d = d || 0;
        c = c || ((c === 0) ? 0 : (b.length - 1));
        for (var a = d; a <= c; a++) {
            b[a].viewIndex = a;
            if (this.components) {
                this.createInstances(b[a])
            }
        }
        this.cleanInstances()
    },
    createInstances: function(f) {
        var h = Ext.id(f),
            e = this.components,
            d = e.length,
            c, b, a, g;
        for (c = 0; c < d; c++) {
            b = e[c];
            g = b.targetSelector ? Ext.fly(f).down(b.targetSelector, true) : f;
            if (g) {
                if (Ext.isObject(b.config)) {
                    a = Ext.create(b.config, "button")
                } else {
                    if (Ext.isFunction(b.config)) {
                        a = b.config.call(this, this.getRecord(f), f, f.viewIndex)
                    }
                }
                if (a) {
                    this.instances.add(a);
                    a.addClass(b.delegateCls);
                    a.render(g);
                    a.doComponentLayout()
                }
            }
        }
    },
    cleanInstances: function() {
        this.instances.each(function(a) {
            if (!document.getElementById(a.id)) {
                this.instances.remove(a);
                a.destroy()
            }
        }, this)
    },
    onDataChanged: function() {
        if (this.blockRefresh !== true) {
            this.refresh.apply(this, arguments)
        }
    },
    findItemFromChild: function(a) {
        return Ext.fly(a).findParent(this.itemSelector, this.getTemplateTarget())
    },
    getRecords: function(b) {
        var e = [],
            d = b,
            a = d.length,
            c;
        for (c = 0; c < a; c++) {
            e[e.length] = this.store.getAt(d[c].viewIndex)
        }
        return e
    },
    getRecord: function(a) {
        return this.store.getAt(a.viewIndex)
    },
    getNode: function(b) {
        if (Ext.isString(b)) {
            return document.getElementById(b)
        } else {
            if (Ext.isNumber(b)) {
                return this.all.elements[b]
            } else {
                if (b instanceof Ext.data.Model) {
                    var a = this.store.indexOf(b);
                    return this.all.elements[a]
                }
            }
        }
        return b
    },
    getNodes: function(e, a) {
        var d = this.all.elements,
            b = [],
            c;
        e = e || 0;
        a = !Ext.isDefined(a) ? Math.max(d.length - 1, 0) : a;
        if (e <= a) {
            for (c = e; c <= a && d[c]; c++) {
                b.push(d[c])
            }
        } else {
            for (c = e; c >= a && d[c]; c--) {
                b.push(d[c])
            }
        }
        return b
    },
    indexOf: function(a) {
        a = this.getNode(a);
        if (Ext.isNumber(a.viewIndex)) {
            return a.viewIndex
        }
        return this.all.indexOf(a)
    },
    onDestroy: function() {
        this.all.clear();
        Ext.DataPanel.superclass.onDestroy.call(this);
        this.bindStore(null)
    }
});
Ext.reg("datapanel", Ext.DataPanel);
Ext.DataView = Ext.extend(Ext.DataPanel, {
    scroll: "vertical",
    selectedCls: "x-item-selected",
    pressedCls: "x-item-pressed",
    pressedDelay: 100,
    emptyText: "",
    deferEmptyText: true,
    last: false,
    initComponent: function() {
        Ext.DataView.superclass.initComponent.call(this);
        this.addEvents("itemtap", "itemdoubletap", "containertap", "selectionchange", "beforeselect");
        this.selected = new Ext.CompositeElementLite()
    },
    afterRender: function() {
        Ext.DataView.superclass.afterRender.call(this);
        this.mon(this.getTemplateTarget(), {
            tap: this.onTap,
            tapstart: this.onTapStart,
            tapcancel: this.onTapCancel,
            touchend: this.onTapCancel,
            doubletap: this.onDoubleTap,
            scope: this
        })
    },
    refresh: function() {
        if (!this.rendered) {
            return
        }
        var a = this.getTemplateTarget();
        a.update("");
        this.clearSelections(false, true);
        if (this.store.getRange().length < 1 && (!this.deferEmptyText || this.hasSkippedEmptyText)) {
            a.update(this.emptyText)
        }
        this.hasSkippedEmptyText = true;
        Ext.DataView.superclass.refresh.call(this)
    },
    onTap: function(c) {
        var b = c.getTarget(this.itemSelector, this.getTemplateTarget());
        if (b) {
            Ext.fly(b).removeClass(this.pressedCls);
            var a = this.indexOf(b);
            if (this.onItemTap(b, a, c) !== false) {
                c.stopEvent();
                this.fireEvent("itemtap", this, a, b, c)
            }
        } else {
            if (this.fireEvent("containertap", this, c) !== false) {
                this.onContainerTap(c)
            }
        }
    },
    onTapStart: function(d, a) {
        var c = this,
            b = d.getTarget(c.itemSelector, c.getTemplateTarget());
        if (b) {
            if (c.pressedDelay) {
                if (c.pressedTimeout) {
                    clearTimeout(c.pressedTimeout)
                }
                c.pressedTimeout = setTimeout(function() {
                    Ext.fly(b).addClass(c.pressedCls)
                }, Ext.isNumber(c.pressedDelay) ? c.pressedDelay : 100)
            } else {
                Ext.fly(b).addClass(c.pressedCls)
            }
        }
    },
    onTapCancel: function(d, a) {
        var c = this,
            b = d.getTarget(c.itemSelector, c.getTemplateTarget());
        if (c.pressedTimeout) {
            clearTimeout(c.pressedTimeout);
            delete c.pressedTimeout
        }
        if (b) {
            Ext.fly(b).removeClass(c.pressedCls)
        }
    },
    onContainerTap: function(a) {
        this.clearSelections()
    },
    onDoubleTap: function(b) {
        var a = b.getTarget(this.itemSelector, this.getTemplateTarget());
        if (a) {
            this.fireEvent("itemdoubletap", this, this.indexOf(a), a, b)
        }
    },
    onItemTap: function(b, a, c) {
        if (this.pressedTimeout) {
            clearTimeout(this.pressedTimeout);
            delete this.pressedTimeout
        }
        if (this.multiSelect) {
            this.doMultiSelection(b, a, c);
            c.preventDefault()
        } else {
            if (this.singleSelect) {
                this.doSingleSelection(b, a, c);
                c.preventDefault()
            }
        }
        return true
    },
    doSingleSelection: function(b, a, c) {
        if (this.isSelected(a)) {
            this.deselect(a)
        } else {
            this.select(a, false)
        }
    },
    doMultiSelection: function(b, a, c) {
        if (this.isSelected(a)) {
            this.deselect(a)
        } else {
            this.select(a, true)
        }
    },
    getSelectionCount: function() {
        return this.selected.getCount()
    },
    getSelectedNodes: function() {
        return this.selected.elements
    },
    getSelectedIndexes: function() {
        var b = [],
            d = this.selected.elements,
            a = d.length,
            c;
        for (c = 0; c < a; c++) {
            b.push(d[c].viewIndex)
        }
        return b
    },
    getSelectedRecords: function() {
        var d = [],
            c = this.selected.elements,
            a = c.length,
            b;
        for (b = 0; b < a; b++) {
            d[d.length] = this.store.getAt(c[b].viewIndex)
        }
        return d
    },
    clearSelections: function(a, b) {
        if ((this.multiSelect || this.singleSelect) && this.selected.getCount() > 0) {
            if (!b) {
                this.selected.removeClass(this.selectedCls)
            }
            this.selected.clear();
            this.last = false;
            if (!a) {
                this.fireEvent("selectionchange", this, this.selected.elements, this.getSelectedRecords())
            }
        }
    },
    isSelected: function(a) {
        return this.selected.contains(this.getNode(a))
    },
    deselect: function(a) {
        if (this.isSelected(a)) {
            a = this.getNode(a);
            this.selected.removeElement(a);
            if (this.last == a.viewIndex) {
                this.last = false
            }
            Ext.fly(a).removeClass(this.selectedCls);
            this.fireEvent("selectionchange", this, this.selected.elements, [])
        }
    },
    select: function(d, f, b) {
        if (Ext.isArray(d)) {
            if (!f) {
                this.clearSelections(true)
            }
            for (var c = 0, a = d.length; c < a; c++) {
                this.select(d[c], true, true)
            }
            if (!b) {
                this.fireEvent("selectionchange", this, this.selected.elements, this.getSelectedRecords())
            }
        } else {
            var e = this.getNode(d);
            if (!f) {
                this.clearSelections(true)
            }
            if (e && !this.isSelected(e)) {
                if (this.fireEvent("beforeselect", this, e, this.selected.elements) !== false) {
                    Ext.fly(e).addClass(this.selectedCls);
                    this.selected.add(e);
                    this.last = e.viewIndex;
                    if (!b) {
                        this.fireEvent("selectionchange", this, this.selected.elements, this.getSelectedRecords())
                    }
                }
            }
        }
    },
    selectRange: function(c, a, b) {
        if (!b) {
            this.clearSelections(true)
        }
        this.select(this.getNodes(c, a), true)
    },
    onBeforeLoad: function() {
        if (this.loadingText) {
            this.clearSelections(false, true);
            this.getTemplateTarget().update('<div class="loading-indicator">' + this.loadingText + "</div>");
            this.all.clear()
        }
    },
    onDestroy: function() {
        this.selected.clear();
        Ext.DataView.superclass.onDestroy.call(this)
    }
});
Ext.DataView.prototype.setStore = Ext.DataView.prototype.bindStore;
Ext.reg("dataview", Ext.DataView);
Ext.List = Ext.extend(Ext.DataView, {
    cmpCls: "x-list",
    pinHeaders: true,
    indexBar: false,
    grouped: false,
    renderTpl: ['<div <tpl if="id">id="{id}"</tpl> class="{baseCls} {cls} {cmpCls}<tpl if="ui"> {uiBase}-{ui}</tpl>" <tpl if="style"> style="{style}"</tpl>>', '<div class="{baseCls}-body"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>', '<tpl if="grouped"><h3 class="x-list-header x-list-header-swap x-hidden-display"></h3></tpl>', "</div>", "</div>"],
    groupTpl: ['<tpl for=".">', '<div class="x-list-group x-group-{id}">', '<h3 class="x-list-header">{group}</h3>', '<div class="x-list-group-items">', "{items}", "</div>", "</div>", "</tpl>"],
    disclosure: false,
    initComponent: function() {
        if (this.scroll !== false) {
            this.scroll = {
                direction: "vertical",
                scrollbars: false
            }
        }
        if (this.grouped) {
            this.itemTpl = this.tpl;
            if (Ext.isString(this.itemTpl) || Ext.isArray(this.itemTpl)) {
                this.itemTpl = new Ext.XTemplate(this.itemTpl)
            }
            if (Ext.isString(this.groupTpl) || Ext.isArray(this.groupTpl)) {
                this.tpl = new Ext.XTemplate(this.groupTpl)
            }
        } else {
            this.indexBar = false
        }
        if (this.indexBar) {
            var a = Ext.apply({}, Ext.isObject(this.indexBar) ? this.indexBar : {}, {
                xtype: "indexbar",
                dock: "right",
                overlay: true,
                alphabet: true
            });
            this.indexBar = new Ext.IndexBar(a);
            this.dockedItems = this.dockedItems || [];
            this.dockedItems.push(this.indexBar);
            this.cls = this.cls || "";
            this.cls += " x-list-indexed"
        } else {
            if (this.scroll) {
                this.scroll.scrollbars = true
            }
        }
        Ext.List.superclass.initComponent.call(this);
        if (this.disclosure) {
            if (Ext.isFunction(this.disclosure)) {
                this.disclosure = {
                    scope: this,
                    handler: this.disclosure
                }
            }
            this.components = this.components || [];
            this.components.push({
                config: Ext.apply({}, this.disclosure.config || {}, {
                    xtype: "button",
                    baseCls: "x-disclosure"
                }),
                listeners: {
                    tap: this.onDisclosureTap,
                    scope: this
                }
            })
        }
        this.on("deactivate", this.onDeactivate, this);
        this.addEvents("disclose")
    },
    onRender: function() {
        if (this.grouped) {
            Ext.applyIf(this.renderData, {
                grouped: true
            });
            Ext.applyIf(this.renderSelectors, {
                header: ".x-list-header-swap"
            })
        }
        Ext.List.superclass.onRender.apply(this, arguments)
    },
    onDeactivate: function() {
        this.clearSelections()
    },
    afterRender: function() {
        if (!this.grouped) {
            this.el.addClass("x-list-flat")
        }
        this.getTemplateTarget().addClass("x-list-parent");
        Ext.List.superclass.afterRender.call(this)
    },
    initEvents: function() {
        Ext.List.superclass.initEvents.call(this);
        if (this.grouped) {
            if (this.pinHeaders && this.scroll) {
                this.mon(this.scroller, {
                    scrollstart: this.onScrollStart,
                    scroll: this.onScroll,
                    scope: this
                })
            }
            if (this.indexBar) {
                this.mon(this.indexBar, {
                    index: this.onIndex,
                    scope: this
                })
            }
        }
    },
    onDisclosureTap: function(f, c) {
        var d = this.findItemFromChild(c);
        if (d) {
            var a = this.getRecord(d),
                b = this.indexOf(d);
            this.fireEvent("disclose", a, d, b);
            if (Ext.isObject(this.disclosure) && this.disclosure.handler) {
                this.disclosure.handler.call(this, a, d, b)
            }
        }
    },
    setActiveGroup: function(a) {
        if (a) {
            if (!this.activeGroup || this.activeGroup.header != a.header) {
                this.header.show();
                this.header.setHTML(a.header.getHTML())
            }
        } else {
            this.header.hide()
        }
        this.activeGroup = a
    },
    getClosestGroups: function(g) {
        var a = this.groupOffsets,
            d = a.length,
            f, b, e, c;
        for (b = 0; b < d; b++) {
            f = a[b];
            if (f.offset > g.y) {
                c = f;
                break
            }
            e = f
        }
        return {
            current: e,
            next: c
        }
    },
    updateItems: function() {
        Ext.List.superclass.updateItems.apply(this, arguments);
        this.updateOffsets()
    },
    afterLayout: function() {
        Ext.List.superclass.afterLayout.apply(this, arguments);
        this.updateOffsets()
    },
    updateOffsets: function() {
        if (this.grouped) {
            this.groupOffsets = [];
            var c = this.body.query("h3.x-list-header"),
                b = c.length,
                d, a;
            for (a = 0; a < b; a++) {
                d = Ext.get(c[a]);
                d.setDisplayMode(Ext.Element.VISIBILITY);
                this.groupOffsets.push({
                    header: d,
                    offset: d.dom.offsetTop
                })
            }
        }
    },
    onScrollStart: function() {
        var a = this.scroller.getOffset();
        this.closest = this.getClosestGroups(a);
        this.setActiveGroup(this.closest.current)
    },
    onScroll: function(a, d, c) {
        if (!this.closest) {
            this.closest = this.getClosestGroups(d)
        }
        if (!this.headerHeight) {
            this.headerHeight = this.header.getHeight()
        }
        if (d.y <= 0) {
            if (this.activeGroup) {
                this.setActiveGroup(false);
                this.closest.next = this.closest.current
            }
            return
        } else {
            if ((this.closest.next && d.y > this.closest.next.offset) || (d.y < this.closest.current.offset)) {
                this.closest = this.getClosestGroups(d);
                this.setActiveGroup(this.closest.current)
            }
        }
        if (this.closest.next && d.y > 0 && this.closest.next.offset - d.y < this.headerHeight) {
            var b = this.headerHeight - (this.closest.next.offset - d.y);
            this.header.setStyle("-webkit-transform", "translate(0, -" + b + "px)");
            this.transformed = true
        } else {
            if (this.transformed) {
                this.header.setStyle("-webkit-transform", null);
                this.transformed = false
            }
        }
    },
    onIndex: function(e, g, f) {
        var k = e.get("key").toLowerCase(),
            c = this.store.getGroups(),
            h = c.length,
            j, d, b, a;
        for (d = 0; d < h; d++) {
            j = c[d];
            a = this.getGroupId(j);
            if (a == k || a > k) {
                b = a;
                break
            } else {
                b = a
            }
        }
        b = this.body.down(".x-group-" + a);
        if (b) {
            this.scroller.scrollTo({
                x: 0,
                y: b.getOffsetsTo(this.scrollEl)[1]
            }, false, null, true)
        }
    },
    getGroupId: function(a) {
        return a.name.toLowerCase()
    },
    collectData: function(e, m) {
        this.store.sort(null, null, true);
        if (!this.grouped) {
            return Ext.List.superclass.collectData.call(this, e, m)
        }
        var g = [],
            d = this.store.getGroups(),
            h = d.length,
            b, a, j, k, f;
        for (f = 0, h = d.length; f < h; f++) {
            k = d[f];
            b = k.children;
            for (j = 0, a = b.length; j < a; j++) {
                b[j] = b[j].data
            }
            g.push({
                group: k.name,
                id: this.getGroupId(k),
                items: this.itemTpl.apply(b)
            })
        }
        return g
    },
    onUpdate: function(b, a) {
        if (this.grouped) {
            this.refresh()
        } else {
            Ext.List.superclass.onUpdate.apply(this, arguments)
        }
    },
    onAdd: function(c, a, b) {
        if (this.grouped) {
            this.refresh()
        } else {
            Ext.List.superclass.onAdd.apply(this, arguments)
        }
    },
    onRemove: function(c, a, b) {
        if (this.grouped) {
            this.refresh()
        } else {
            Ext.List.superclass.onRemove.apply(this, arguments)
        }
    }
});
Ext.reg("list", Ext.List);
Ext.IndexBar = Ext.extend(Ext.DataPanel, {
    cmpCls: "x-indexbar",
    direction: "vertical",
    tpl: '<tpl for="."><span class="x-indexbar-item">{value}</span></tpl>',
    itemSelector: "span.x-indexbar-item",
    letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    initComponent: function() {
        this.componentLayout = new Ext.layout.AutoComponentLayout();
        if (!this.store) {
            this.store = new Ext.data.Store({
                model: "IndexBarModel"
            })
        }
        if (this.alphabet == true) {
            this.ui = this.ui || "alphabet"
        }
        if (this.direction == "horizontal") {
            this.horizontal = true
        } else {
            this.vertical = true
        }
        this.addEvents("index");
        Ext.IndexBar.superclass.initComponent.call(this)
    },
    afterRender: function() {
        Ext.IndexBar.superclass.afterRender.call(this);
        if (this.alphabet === true) {
            this.loadAlphabet()
        }
        if (this.vertical) {
            this.el.addClass(this.cmpCls + "-vertical")
        } else {
            if (this.horizontal) {
                this.el.addClass(this.cmpCls + "-horizontal")
            }
        }
    },
    loadAlphabet: function() {
        var e = this.letters,
            a = e.length,
            d = [],
            b, c;
        for (b = 0; b < a; b++) {
            c = e[b];
            d.push({
                key: c.toLowerCase(),
                value: c
            })
        }
        this.store.loadData(d)
    },
    initEvents: function() {
        Ext.IndexBar.superclass.initEvents.call(this);
        this.mon(this.body, {
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            touchmove: this.onTouchMove,
            scope: this
        })
    },
    onTouchStart: function(b, a) {
        this.el.addClass(this.cmpCls + "-pressed");
        this.pageBox = this.body.getPageBox();
        this.onTouchMove(b)
    },
    onTouchEnd: function(b, a) {
        this.el.removeClass(this.cmpCls + "-pressed")
    },
    onTouchMove: function(d) {
        var c, b = this,
            a, f = b.pageBox;
        if (!f) {
            f = b.pageBox = b.body.getPageBox()
        }
        if (b.vertical) {
            if (d.pageY > f.bottom || d.pageY < f.top) {
                return
            }
            c = Ext.Element.fromPoint(f.left + (f.width / 2), d.pageY)
        } else {
            if (b.horizontal) {
                if (d.pageX > f.right || d.pageX < f.left) {
                    return
                }
                c = Ext.Element.fromPoint(d.pageX, f.top + (f.height / 2))
            }
        }
        if (c) {
            a = b.getRecord(c.dom);
            if (a) {
                b.fireEvent("index", a, c, b.indexOf(c))
            }
        }
    }
});
Ext.reg("indexbar", Ext.IndexBar);
Ext.regModel("IndexBarModel", {
    fields: ["key", "value"]
});
Ext.Toolbar = Ext.extend(Ext.Container, {
    defaultType: "button",
    baseCls: "x-toolbar",
    titleCls: "x-toolbar-title",
    ui: null,
    layout: null,
    titleEl: null,
    initComponent: function() {
        this.layout = Ext.apply({}, this.layout || {}, {
            type: "hbox",
            align: "center"
        });
        Ext.Toolbar.superclass.initComponent.call(this)
    },
    afterRender: function() {
        Ext.Toolbar.superclass.afterRender.call(this);
        if (this.title) {
            this.titleEl = this.el.createChild({
                cls: this.titleCls,
                html: this.title
            })
        }
    },
    setTitle: function(a) {
        this.title = a;
        if (this.rendered) {
            if (!this.titleEl) {
                this.titleEl = this.el.createChild({
                    cls: this.titleCls,
                    html: this.title
                })
            }
            this.titleEl.setHTML(a)
        }
    },
    showTitle: function() {
        if (this.titleEl) {
            this.titleEl.show()
        }
    },
    hideTitle: function() {
        if (this.titleEl) {
            this.titleEl.hide()
        }
    }
});
Ext.reg("toolbar", Ext.Toolbar);
Ext.Spacer = Ext.extend(Ext.Component, {
    initComponent: function() {
        if (!this.width) {
            this.flex = 1
        }
        Ext.Spacer.superclass.initComponent.call(this)
    },
    onRender: function() {
        Ext.Spacer.superclass.onRender.apply(this, arguments);
        if (this.flex) {
            this.el.setStyle("-webkit-box-flex", this.flex)
        }
    }
});
Ext.reg("spacer", Ext.Spacer);
Ext.TabBar = Ext.extend(Ext.Panel, {
    cmpCls: "x-tabbar",
    activeTab: null,
    defaultType: "tab",
    sortable: false,
    sortHoldThreshold: 350,
    initComponent: function() {
        this.addEvents("change");
        this.layout = Ext.apply({}, this.layout || {}, {
            type: "hbox",
            align: "middle"
        });
        Ext.TabBar.superclass.initComponent.call(this);
        var a = this.cardLayout;
        if (a) {
            this.cardLayout = null;
            this.setCardLayout(a)
        }
    },
    initEvents: function() {
        if (this.sortable) {
            this.sortable = new Ext.util.Sortable(this.el, {
                itemSelector: ".x-tab",
                direction: "horizontal",
                delay: this.sortHoldThreshold,
                constrain: true
            });
            this.mon(this.sortable, "sortchange", this.onSortChange, this)
        }
        this.mon(this.el, {
            tap: this.onTap,
            scope: this
        });
        Ext.TabBar.superclass.initEvents.call(this)
    },
    onTap: function(b, a) {
        a = b.getTarget(".x-tab");
        if (a) {
            this.onTabTap(Ext.getCmp(a.id))
        }
    },
    onSortChange: function(c, b, a) {},
    onTabTap: function(a) {
        this.activeTab = a;
        if (this.cardLayout) {
            this.cardLayout.setActiveItem(a.card)
        }
        this.fireEvent("change", this, a, a.card)
    },
    setCardLayout: function(a) {
        if (this.cardLayout) {
            this.mun(this.cardLayout.owner, {
                add: this.onCardAdd,
                remove: this.onCardRemove,
                scope: this
            })
        }
        this.cardLayout = a;
        if (a) {
            this.mon(a.owner, {
                add: this.onCardAdd,
                remove: this.onCardRemove,
                scope: this
            })
        }
    },
    onCardAdd: function(a, b) {
        b.tab = this.add({
            xtype: "tab",
            card: b
        })
    },
    onCardRemove: function(a, c) {
        var b = this.items.items,
            f = b.length,
            d, e;
        for (d = 0; d < f; d++) {
            e = b[d];
            if (e.card === c) {
                e.card = null;
                this.remove(e, true);
                return
            }
        }
    },
    getCardLayout: function() {
        return this.cardLayout
    }
});
Ext.reg("tabbar", Ext.TabBar);
Ext.Tab = Ext.extend(Ext.Button, {
    isTab: true,
    baseCls: "x-tab",
    pressedCls: "x-tab-pressed",
    activeCls: "x-tab-active",
    initComponent: function() {
        this.addEvents("activate", "deactivate");
        Ext.Tab.superclass.initComponent.call(this);
        var a = this.card;
        if (a) {
            this.card = null;
            this.setCard(a)
        }
    },
    setCard: function(a) {
        if (this.card) {
            this.mun(this.card, {
                activate: this.activate,
                deactivate: this.deactivate,
                scope: this
            })
        }
        this.card = a;
        if (a) {
            Ext.apply(this, a.tab || {});
            this.setText(this.title || a.title || this.text);
            this.setIconClass(this.iconCls || a.iconCls);
            this.setBadge(this.badgeText || a.badgeText);
            this.mon(a, {
                beforeactivate: this.activate,
                beforedeactivate: this.deactivate,
                scope: this
            })
        }
    },
    getCard: function() {
        return this.card
    },
    activate: function() {
        this.el.addClass(this.activeCls);
        this.fireEvent("activate", this)
    },
    deactivate: function() {
        this.el.removeClass(this.activeCls);
        this.fireEvent("deactivate", this)
    }
});
Ext.reg("tab", Ext.Tab);
Ext.TabPanel = Ext.extend(Ext.Panel, {
    animation: null,
    tabBarPosition: "top",
    cmpCls: "x-tabpanel",
    ui: "dark",
    initComponent: function() {
        var a = new Ext.layout.CardLayout(this.layout || {});
        this.layout = null;
        this.setLayout(a);
        this.tabBar = new Ext.TabBar(Ext.apply({}, this.tabBar || {}, {
            cardLayout: a,
            animation: this.animation,
            dock: this.tabBarPosition,
            ui: this.ui,
            sortable: this.sortable
        }));
        if (this.dockedItems && !Ext.isArray(this.dockedItems)) {
            this.dockedItems = [this.dockedItems]
        } else {
            if (!this.dockedItems) {
                this.dockedItems = []
            }
        }
        this.dockedItems.push(this.tabBar);
        Ext.TabPanel.superclass.initComponent.call(this)
    },
    getTabBar: function() {
        return this.tabBar
    },
    afterLayout: function() {
        Ext.TabPanel.superclass.afterLayout.call(this);
        this.getTabBar().doLayout()
    }
});
Ext.reg("tabpanel", Ext.TabPanel);
Ext.Carousel = Ext.extend(Ext.Panel, {
    cmpCls: "x-carousel",
    indicator: true,
    ui: null,
    direction: "horizontal",
    initComponent: function() {
        this.layout = {
            type: "card",
            sizeAllCards: true,
            hideInactive: false,
            extraCls: "x-carousel-item",
            targetCls: "x-carousel-body",
            setOwner: function(b) {
                Ext.layout.CardLayout.superclass.setOwner.call(this, b)
            }
        };
        if (this.indicator) {
            var a = Ext.isObject(this.indicator) ? this.indicator : {};
            this.indicator = new Ext.Carousel.Indicator(Ext.apply({}, a, {
                direction: this.direction,
                carousel: this,
                ui: this.ui
            }))
        }
        Ext.Carousel.superclass.initComponent.call(this)
    },
    afterRender: function() {
        Ext.Carousel.superclass.afterRender.call(this);
        this.body.on({
            scroll: this.onScroll,
            scrollend: this.onScrollEnd,
            horizontal: this.direction == "horizontal",
            vertical: this.direction == "vertical",
            scope: this
        });
        this.el.addClass(this.cmpCls + "-" + this.direction)
    },
    afterLayout: function() {
        Ext.Carousel.superclass.afterLayout.apply(this, arguments);
        this.currentSize = this.body.getSize();
        this.currentScroll = {
            x: 0,
            y: 0
        };
        this.updateCardPositions();
        var a = this.layout.getActiveItem();
        if (a && this.indicator) {
            this.indicator.onBeforeCardSwitch(this, a, null, this.items.indexOf(a))
        }
    },
    onScroll: function(b) {
        this.currentScroll = {
            x: b.deltaX,
            y: b.deltaY
        };
        var a = this.items.items.indexOf(this.layout.activeItem);
        if (this.direction == "horizontal" && ((a == 0 && b.deltaX > 0) || (a == this.items.length - 1 && b.deltaX < 0))) {
            this.currentScroll.x = b.deltaX / 2
        } else {
            if (this.direction == "vertical" && ((a == 0 && b.deltaY > 0) || (a == this.items.length - 1 && b.deltaY < 0))) {
                this.currentScroll.y = b.deltaY / 2
            }
        }
        this.updateCardPositions()
    },
    updateCardPositions: function(a) {
        var g = this.items.items,
            f = g.length,
            c, b, e, d;
        for (c = 0; c < f; c++) {
            b = g[c];
            if (this.isCardInRange(b)) {
                if (b.hidden) {
                    b.show()
                }
                e = b.el;
                d = e.dom.style;
                if (a) {
                    if (b === this.layout.activeItem) {
                        e.on("webkitTransitionEnd", this.onTransitionEnd, this, {
                            single: true
                        })
                    }
                    d.webkitTransitionDuration = "300ms"
                } else {
                    d.webkitTransitionDuration = "0ms"
                }
                if (this.direction == "horizontal") {
                    d.webkitTransform = "translate3d(" + this.getCardOffset(b) + "px, 0, 0)"
                } else {
                    d.webkitTransform = "translate3d(0, " + this.getCardOffset(b) + "px, 0)"
                }
            } else {
                if (!b.hidden) {
                    b.hide()
                }
            }
        }
    },
    getCardOffset: function(c) {
        var d = this.getCardIndexOffset(c),
            b = this.currentSize,
            a = this.currentScroll;
        return this.direction == "horizontal" ? (d * b.width) + a.x : (d * b.height) + a.y
    },
    getCardIndexOffset: function(a) {
        return this.items.items.indexOf(a) - this.getActiveIndex()
    },
    isCardInRange: function(a) {
        return Math.abs(this.getCardIndexOffset(a)) <= 2
    },
    getActiveIndex: function() {
        return this.items.indexOf(this.layout.activeItem)
    },
    onScrollEnd: function(d, b) {
        var a, c;
        if (this.direction == "horizontal") {
            c = d.deltaX;
            a = d.previousDeltaX
        } else {
            c = d.deltaY;
            a = d.previousDeltaY
        }
        if (c < 0 && Math.abs(c) > 3 && a <= 0 && this.layout.getNext()) {
            this.next()
        } else {
            if (c > 0 && Math.abs(c) > 3 && a >= 0 && this.layout.getPrev()) {
                this.prev()
            } else {
                this.scrollToCard(this.layout.activeItem)
            }
        }
    },
    onBeforeCardSwitch: function(a) {
        if (!this.customScroll && this.items.indexOf(a) != -1) {
            var b = a.el.dom.style;
            b.webkitTransitionDuration = null;
            b.webkitTransform = null
        }
        return Ext.Carousel.superclass.onBeforeCardSwitch.apply(this, arguments)
    },
    scrollToCard: function(a) {
        this.currentScroll = {
            x: 0,
            y: 0
        };
        this.oldCard = this.layout.activeItem;
        if (a != this.oldCard && this.isCardInRange(a) && this.onBeforeCardSwitch(a, this.oldCard, this.items.indexOf(a), true) !== false) {
            this.layout.activeItem = a;
            if (this.direction == "horizontal") {
                this.currentScroll.x = -this.getCardOffset(a)
            } else {
                this.currentScroll.y = -this.getCardOffset(a)
            }
        }
        this.updateCardPositions(true)
    },
    onTransitionEnd: function(b, a) {
        this.customScroll = false;
        this.currentScroll = {
            x: 0,
            y: 0
        };
        if (this.oldCard && this.layout.activeItem != this.oldCard) {
            this.onCardSwitch(this.layout.activeItem, this.oldCard, this.items.indexOf(this.layout.activeItem), true)
        }
        delete this.oldCard
    },
    onCardSwitch: function(a, c, b, d) {
        this.currentScroll = {
            x: 0,
            y: 0
        };
        this.updateCardPositions();
        Ext.Carousel.superclass.onCardSwitch.apply(this, arguments)
    },
    next: function() {
        var a = this.layout.getNext();
        if (a) {
            this.customScroll = true;
            this.scrollToCard(a)
        }
        return this
    },
    prev: function() {
        var a = this.layout.getPrev();
        if (a) {
            this.customScroll = true;
            this.scrollToCard(a)
        }
        return this
    }
});
Ext.reg("carousel", Ext.Carousel);
Ext.Carousel.Indicator = Ext.extend(Ext.Component, {
    baseCls: "x-carousel-indicator",
    initComponent: function() {
        if (this.carousel.rendered) {
            this.render(this.carousel.body);
            this.onBeforeCardSwitch(null, null, this.carousel.items.indexOf(this.carousel.layout.getActiveItem()))
        } else {
            this.carousel.on("render", function() {
                this.render(this.carousel.body)
            }, this, {
                single: true
            })
        }
        Ext.Carousel.Indicator.superclass.initComponent.call(this)
    },
    onRender: function() {
        Ext.Carousel.Indicator.superclass.onRender.apply(this, arguments);
        for (var a = 0, b = this.carousel.items.length; a < b; a++) {
            this.createIndicator()
        }
        this.mon(this.carousel, {
            beforecardswitch: this.onBeforeCardSwitch,
            add: this.onCardAdd,
            remove: this.onCardRemove,
            scope: this
        });
        this.mon(this.el, {
            tap: this.onTap,
            scope: this
        });
        this.el.addClass(this.baseCls + "-" + this.direction)
    },
    onTap: function(d, a) {
        var b = this.el.getPageBox(),
            c = b.left + (b.width / 2);
        if (d.pageX > c) {
            this.carousel.next()
        } else {
            this.carousel.prev()
        }
    },
    createIndicator: function() {
        this.indicators = this.indicators || [];
        this.indicators.push(this.el.createChild({
            tag: "span"
        }))
    },
    onBeforeCardSwitch: function(d, c, a, b) {
        if (Ext.isNumber(b) && b != -1 && this.indicators[b]) {
            this.indicators[b].radioClass("x-carousel-indicator-active")
        }
    },
    onCardAdd: function() {
        this.createIndicator()
    },
    onCardRemove: function() {
        this.indicators.pop().remove()
    }
});
Ext.reg("carouselindicator", Ext.Carousel.Indicator);
Ext.Map = Ext.extend(Ext.Component, {
    baseCls: "x-map",
    getLocation: false,
    map: null,
    geo: null,
    maskMap: false,
    initComponent: function() {
        this.mapOptions = this.mapOptions || {};
        Ext.Map.superclass.initComponent.call(this);
        if (this.getLocation) {
            this.geo = new Ext.util.GeoLocation();
            this.geo.on("update", this.onGeoUpdate, this)
        } else {
            this.on({
                afterrender: this.update,
                activate: this.onUpdate,
                scope: this,
                single: true
            })
        }
    },
    onGeoUpdate: function(a) {
        if (a) {
            this.mapOptions.center = new google.maps.LatLng(a.latitude, a.longitude)
        }
        if (this.rendered) {
            this.update()
        } else {
            this.on("activate", this.onUpdate, this, {
                single: true
            })
        }
    },
    onUpdate: function(c, b, a) {
        this.update(a.data || null)
    },
    update: function(a) {
        var b;
        if (Ext.platform.isTablet && Ext.platform.isIPhoneOS) {
            Ext.apply(this.mapOptions, {
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.ZOOM_PAN
                }
            })
        }
        Ext.applyIf(this.mapOptions, {
            center: new google.maps.LatLng(37.381592, -122.135672),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        if (!this.hidden && this.rendered) {
            if (this.maskMap && !this.mask) {
                this.el.mask();
                this.mask = true
            }
            if (this.map && this.el && this.el.dom && this.el.dom.firstChild) {
                Ext.fly(this.el.dom.firstChild).remove()
            }
            this.map = new google.maps.Map(this.el.dom, this.mapOptions)
        } else {
            this.on("activate", this.onUpdate, this, {
                single: true,
                data: a
            })
        }
    }
});
Ext.reg("map", Ext.Map);
Ext.NestedList = Ext.extend(Ext.Panel, {
    cmpCls: "x-nested-list",
    layout: "card",
    animation: "slide",
    backButton: null,
    backText: "Back",
    initComponent: function() {
        this.backButton = new Ext.Button({
            text: this.backText,
            ui: "back",
            handler: this.onBackTap,
            scope: this,
            hidden: true
        });
        if (!this.toolbar || !this.toolbar.isComponent) {
            this.toolbar = Ext.apply({}, this.toolbar || {}, {
                dock: "top",
                xtype: "toolbar",
                ui: "light",
                items: []
            });
            this.toolbar.items.unshift(this.backButton);
            this.toolbar = new Ext.Toolbar(this.toolbar);
            this.dockedItems = this.dockedItems || [];
            this.dockedItems.push(this.toolbar)
        } else {
            this.toolbar.insert(0, this.backButton)
        }
        var a = this.items;
        this.items = null;
        Ext.NestedList.superclass.initComponent.call(this);
        this.addEvents("listchange");
        this.listIndex = 0;
        this.setList(a, true);
        this.on({
            beforeactivate: this.onBeforeActivate,
            beforedeactivate: this.onBeforeDeactivate,
            scope: this
        })
    },
    setList: function(c, d) {
        var a = d ? c : c.items;
        if (!c.isList) {
            c = new Ext.Container({
                isList: true,
                baseCls: "x-list",
                cls: "x-list-flat",
                defaults: {
                    xtype: "button",
                    baseCls: "x-list-item",
                    pressedCls: "x-item-pressed",
                    ui: null,
                    pressedDelay: true
                },
                listeners: {
                    afterrender: function() {
                        this.getContentTarget().addClass("x-list-parent")
                    }
                },
                scroll: "vertical",
                items: a,
                text: c.text
            })
        }
        this.lists = this.lists || [];
        if (!this.lists.contains(c)) {
            this.lists.push(this.add(c))
        }
        var b = (this.lists.indexOf(c) < this.lists.indexOf(this.activeItem));
        if (this.rendered) {
            this.setCard(c, d ? false : {
                type: this.animation,
                reverse: b
            })
        }
        this.activeItem = c
    },
    afterRender: function() {
        Ext.NestedList.superclass.afterRender.call(this);
        this.mon(this.body, {
            tap: this.onTap,
            scope: this
        })
    },
    onTap: function(b, a) {
        a = b.getTarget(".x-list-item");
        if (a) {
            this.onItemTap(Ext.getCmp(a.id))
        }
    },
    onItemTap: function(a) {
        a.el.radioClass("x-item-selected");
        if (a.items) {
            this.backButton.show();
            this.setList(a);
            this.listIndex++
        }
        this.fireEvent("listchange", this, a)
    },
    onBackTap: function() {
        this.listIndex--;
        var b = this.lists[this.listIndex];
        if (this.listIndex === 0) {
            this.backButton.hide()
        }
        this.activeItem.on("deactivate", function(c) {
            this.lists.remove(c);
            c.destroy()
        }, this, {
            single: true
        });
        this.setList(b);
        var a = this;
        setTimeout(function() {
            b.el.select(".x-item-selected").removeClass("x-item-selected")
        }, 500);
        this.fireEvent("listchange", this, b)
    },
    onBeforeDeactivate: function() {
        this.backButton.hide();
        this.toolbar.doLayout();
        this.initialActivate = true
    },
    onBeforeActivate: function() {
        if (this.initialActivate && this.listIndex !== 0) {
            this.backButton.show();
            this.toolbar.doLayout()
        }
        var a = this;
        setTimeout(function() {
            a.activeItem.el.select(".x-item-selected").removeClass("x-item-selected")
        }, 500)
    }
});
Ext.reg("nestedlist", Ext.NestedList);
Ext.regModel("KeyValueModel", {
    fields: [{
        name: "key",
        type: "string"
    }, {
        name: "value",
        type: "auto"
    }]
});
Ext.Picker = Ext.extend(Ext.Panel, {
    cmpCls: "x-picker",
    centered: true,
    displayField: "key",
    valueField: "value",
    useTitles: true,
    activeCls: "x-picker-active-item",
    rowHeight: false,
    align: "left",
    pickerItemCls: "li.x-picker-item",
    chosenCls: "x-picker-chosen-item",
    model: "KeyValueModel",
    initComponent: function() {
        var a = [],
            b, e, c, d;
        this.layout = {
            type: "hbox",
            align: "stretch"
        };
        for (b = 0, d = this.slots.length; b < d; b++) {
            e = this.slots[b];
            c = {
                xtype: "dataview",
                itemSelector: this.pickerItemCls,
                isSlot: true,
                flex: 1,
                listeners: {
                    itemtap: this.onItemTap,
                    scope: this
                },
                scroll: {
                    direction: "vertical",
                    scrollbars: false,
                    snap: true,
                    friction: 0.5,
                    index: b,
                    listeners: {
                        scrollend: this.onScrollEnd,
                        scope: this
                    }
                },
                tpl: '<ul class="x-picker-{align}"><tpl for="."><li class="x-picker-item {cls} <tpl if="extra">x-picker-invalid</tpl>">{' + this.displayField + "}</li></tpl></ul>",
                store: new Ext.data.Store({
                    model: this.model,
                    data: e.items
                })
            };
            if (this.useTitles) {
                c.dockedItems = [{
                    xtype: "toolbar",
                    dock: "top",
                    title: e.title || e.text
                }]
            }
            a.push(c)
        }
        this.items = a;
        this.activeEls = [];
        this.lastEls = [];
        Ext.Picker.superclass.initComponent.call(this);
        this.addEvents("pick")
    },
    getSelectedEls: function() {
        var d, g, a, c = [],
            b = 0,
            f = this.slots.length,
            h = this.pickerItemCls + ":not(.x-picker-invalid)";
        for (; b < f; b++) {
            d = this.activeEls[b];
            g = d.getXY();
            g[0] += (d.getWidth() / 2);
            g[1] += (d.getHeight() / 2);
            d.hide();
            a = document.elementFromPoint(g[0], g[1]);
            if (a.innerText === "") {
                var e = Ext.fly(a).next(h) || Ext.fly(a).prev(h);
                if (e) {
                    a = e.dom;
                    this.scrollToNode(this.items.itemAt(b), a)
                }
            }
            c.push(a);
            d.show()
        }
        this.lastEls = c;
        return c
    },
    getValue: function() {
        var f = {}, c = this.getSelectedEls(),
            b, a, e, d;
        for (b = 0, d = c.length; b < d; b++) {
            if (Ext.DomQuery.is(c[b], this.pickerItemCls)) {
                a = this.slots[b].name || Ext.id();
                e = this.items.itemAt(b).getRecord(c[b]);
                f[a] = e.get(this.valueField)
            }
        }
        return f
    },
    scrollToNode: function(b, e, a) {
        var d = Ext.fly(e).getOffsetsTo(b.body),
            c = this.items.indexOf(b);
        if (a !== false) {
            a = true
        }
        b.scroller.scrollTo({
            x: 0,
            y: (-d[1] + this.activeEls[c].getTop())
        }, a ? 200 : false)
    },
    onItemTap: function(b, a, c) {
        this.scrollToNode(b, c)
    },
    afterLayout: function() {
        Ext.Picker.superclass.afterLayout.apply(this, arguments);
        if (this.initialized) {
            return
        }
        if (!this.rowHeight) {
            var o = this.el.down(this.pickerItemCls);
            var b = o.getHeight();
            this.rowHeight = b;
            this.items.each(function(i) {
                if (i.scroller) {
                    i.scroller.snap = b
                }
            })
        }
        var a, r, n, t, c, s, q, f, e, g = this.slots.length,
            p, k, m, h = this.items.itemAt(0).body;
        a = h.getHeight();
        r = Math.ceil(a / this.rowHeight);
        n = Math.max((Math.floor(r / 2)) - 1, 1);
        t = (a / this.rowHeight) - n - 1;
        c = Math.floor(t) + 0.5 > t;
        s = c ? 0 : -1;
        q = Math.floor(a / this.rowHeight);
        for (f = 0; f < g; f++) {
            p = this.slots[f];
            var d = this.items.itemAt(f).store;
            k = p.items;
            for (e = 0; e < q; e++) {
                if (e < n) {
                    d.insert(0, Ext.ModelMgr.create({
                        key: "",
                        value: "",
                        extra: true
                    }, this.model))
                } else {
                    if (e > (n + s)) {
                        d.add(Ext.ModelMgr.create({
                            key: "",
                            value: "",
                            extra: true
                        }, this.model))
                    }
                }
            }
            m = Ext.DomHelper.append(this.items.itemAt(f).body, {
                cls: "x-picker-chosen"
            }, true);
            m.setTop((n) * this.rowHeight + h.getTop());
            m.setWidth(h.getWidth());
            this.activeEls[f] = m
        }
        if (this.value !== undefined) {
            this.setValue(this.value, false)
        } else {
            this.onScrollEnd()
        }
        this.initialized = true
    },
    setValue: function(e, c) {
        var f = 0,
            g = this.slots.length,
            b, h = this.items,
            j;
        for (; f < g; f++) {
            j = this.value[this.slots[f].name];
            if (j) {
                b = h.itemAt(f);
                var k = b.store.find(this.valueField, j),
                    a = b.store.getAt(k),
                    d = b.getNode(a);
                this.scrollToNode(b, d, c)
            }
        }
    },
    onScrollEnd: function(h) {
        if (h) {
            var j = h.index,
                c = this.items.itemAt(j),
                d = this.lastEls[j],
                g = d ? c.getRecord(d) : undefined,
                b = g ? g.get(this.valueField) : undefined,
                e = this.getSelectedEls(),
                a = c.getRecord(e[j]);
            if (d) {
                Ext.fly(d).removeClass(this.chosenCls)
            }
            Ext.fly(e[j]).addClass(this.chosenCls);
            this.fireEvent("pick", this, this.slots[j].name, a.get(this.valueField), b, a)
        } else {
            var f = 0,
                e = this.getSelectedEls(),
                k = e.length;
            for (; f < k; f++) {
                Ext.fly(e[f]).addClass(this.chosenCls)
            }
        }
    }
});
Ext.reg("picker", Ext.Picker);
Ext.DatePicker = Ext.extend(Ext.Picker, {
    yearFrom: 1980,
    yearTo: new Date().getFullYear(),
    monthText: "Month",
    dayText: "Day",
    yearText: "Year",
    initComponent: function() {
        var j = this.yearFrom,
            e = this.yearTo,
            f = [],
            g;
        if (j > e) {
            var c = j;
            j = e;
            e = c
        }
        for (var d = j; d <= e; d++) {
            f.push({
                key: d,
                value: d
            })
        }
        var a;
        if (this.value) {
            a = this.getDaysInMonth(this.value.month, this.value.year)
        } else {
            a = this.getDaysInMonth(0, new Date().getFullYear())
        }
        var h = [];
        for (d = 0; d < a; d++) {
            h.push({
                key: d + 1,
                value: d + 1
            })
        }
        var b = [];
        for (d = 0, g = Date.monthNames.length; d < g; d++) {
            b.push({
                key: Date.monthNames[d],
                value: d
            })
        }
        this.slots = [{
            text: this.monthText,
            name: "month",
            align: "left",
            items: b
        }, {
            text: this.dayText,
            name: "day",
            align: "center",
            items: h
        }, {
            text: this.yearText,
            name: "year",
            align: "right",
            items: f
        }];
        Ext.DatePicker.superclass.initComponent.call(this);
        this.on("pick", this.onPick, this)
    },
    getValue: function() {
        var d = Ext.DatePicker.superclass.getValue.call(this),
            c, b = this.getDaysInMonth(d.month, d.year);
        if (d.day !== "") {
            c = Math.min(d.day, b)
        } else {
            c = b;
            var e = this.items.itemAt(1),
                a = e.store.find(this.valueField, b),
                f = e.store.getAt(a),
                g = e.getNode(f);
            this.scrollToNode(e, g)
        }
        return new Date(d.year, d.month, c)
    },
    onPick: function(e, d, g, f) {
        if (d === "month" || d === "year") {
            var h = this.items.itemAt(1);
            var b = h.store;
            var c = this.getValue();
            var a = this.getDaysInMonth(c.getMonth(), c.getFullYear());
            b.filter([{
                fn: function(i) {
                    return i.get("extra") === true || i.get("value") <= a
                }
            }]);
            this.onScrollEnd(h.scroller)
        }
    },
    getDaysInMonth: function(c, b) {
        var a = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return c == 1 && this.isLeapYear(b) ? 29 : a[c]
    },
    isLeapYear: function(a) {
        return !!((a & 3) === 0 && (a % 100 || (a % 400 === 0 && a)))
    }
});
Ext.reg("datepicker", Ext.DatePicker);
Ext.Media = Ext.extend(Ext.Container, {
    url: "",
    enableControls: true,
    autoResume: false,
    autoPause: true,
    preload: true,
    playing: false,
    afterRender: function() {
        var a = this.getConfiguration();
        Ext.apply(a, {
            src: this.url,
            preload: this.preload ? "auto" : "none"
        });
        if (this.enableControls) {
            a.controls = "controls"
        }
        if (this.loop) {
            a.loop = "loop"
        }
        this.media = this.el.createChild(a);
        Ext.Media.superclass.afterRender.call(this);
        this.on({
            scope: this,
            activate: this.onActivate,
            beforedeactivate: this.onDeactivate
        })
    },
    onActivate: function() {
        if (this.autoResume && !this.playing) {
            this.play()
        }
    },
    onDeactivate: function() {
        if (this.autoPause && this.playing) {
            this.pause()
        }
    },
    play: function() {
        this.media.dom.play();
        this.playing = true
    },
    pause: function() {
        this.media.dom.pause();
        this.playing = false
    },
    toggle: function() {
        if (this.playing) {
            this.pause()
        } else {
            this.play()
        }
    }
});
Ext.reg("media", Ext.Media);
Ext.Video = Ext.extend(Ext.Media, {
    poster: "",
    cmpCls: "x-video",
    afterRender: function() {
        Ext.Video.superclass.afterRender.call(this);
        if (this.poster) {
            this.media.hide();
            this.ghost = this.el.createChild({
                cls: "x-video-ghost",
                style: "width: 100%; height: 100%; background: #000 url(" + this.poster + ") center center no-repeat; -webkit-background-size: 100% auto;"
            });
            this.ghost.on("tap", this.onGhostTap, this, {
                single: true
            })
        }
    },
    onGhostTap: function() {
        this.media.show();
        this.ghost.hide();
        this.play()
    },
    getConfiguration: function() {
        return {
            tag: "video",
            width: "100%",
            height: "100%"
        }
    }
});
Ext.reg("video", Ext.Video);
Ext.Audio = Ext.extend(Ext.Media, {
    cmpCls: "x-audio",
    onActivate: function() {
        Ext.Audio.superclass.onActivate.call(this);
        if (Ext.platform.isPhone) {
            this.media.show()
        }
    },
    onDeactivate: function() {
        Ext.Audio.superclass.onDeactivate.call(this);
        if (Ext.platform.isPhone) {
            this.media.hide()
        }
    },
    getConfiguration: function() {
        var a = !this.enableControls;
        if (Ext.platform.isPhone) {
            return {
                tag: "embed",
                type: "audio/mpeg",
                target: "myself",
                controls: "true",
                hidden: a
            }
        } else {
            return {
                tag: "audio",
                hidden: a
            }
        }
    }
});
Ext.reg("audio", Ext.Audio);
Ext.form.FormPanel = Ext.extend(Ext.Panel, {
    standardSubmit: false,
    cmpCls: "x-form",
    url: undefined,
    baseParams: undefined,
    renderTpl: ['<form <tpl if="id">id="{id}"</tpl> class="{baseCls} {cls} {cmpCls}<tpl if="ui"> {uiBase}-{ui}</tpl>" <tpl if="style"> style="{style}"</tpl>>', '<div class="{baseCls}-body"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>></div>', "</form>"],
    waitTpl: new Ext.XTemplate('<div class="{cls}">{message}&hellip;</div>'),
    initComponent: function() {
        this.addEvents("submit", "beforesubmit", "exception");
        Ext.form.FormPanel.superclass.initComponent.call(this)
    },
    afterRender: function() {
        Ext.form.FormPanel.superclass.afterRender.call(this);
        this.el.on("submit", this.onSubmit, this)
    },
    onSubmit: function(b, a) {
        if (!this.standardSubmit || this.fireEvent("beforesubmit", this, this.getValues(true)) === false) {
            if (b) {
                b.stopEvent()
            }
        }
    },
    submit: function(a) {
        var b = this.el.dom || {};
        a = Ext.applyIf(a || {}, {
            url: this.url || b.action,
            submitDisabled: false,
            method: b.method || "post",
            params: null,
            autoAbort: false,
            waitMsg: null,
            headers: null,
            success: Ext.emptyFn,
            failure: Ext.emptyFn
        });
        var c = this.getValues(this.standardSubmit || !a.submitDisabled);
        if (this.standardSubmit) {
            if (b) {
                if (a.url && Ext.isEmpty(b.action)) {
                    b.action = a.url
                }
                b.method = (a.method || b.method).toLowerCase();
                b.submit()
            }
            return null
        }
        if (this.fireEvent("beforesubmit", this, c, a) !== false) {
            if (a.waitMsg) {
                this.showMask(a.waitMsg)
            }
            return Ext.Ajax.request({
                url: a.url,
                method: a.method,
                rawData: Ext.urlEncode(Ext.apply(Ext.apply({}, this.baseParams || {}), a.params || {}, c)),
                autoAbort: a.autoAbort,
                headers: Ext.apply({
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }, a.headers || {}),
                scope: this,
                callback: function(e, g, d) {
                    var f = d;
                    this.hideMask();
                    if (g) {
                        f = Ext.decode(f.responseText);
                        g = !! f.success;
                        if (g) {
                            if (typeof e.success == "function") {
                                e.success.call(e.scope, this, f)
                            }
                            this.fireEvent("submit", this, f);
                            return
                        }
                    }
                    if (typeof e.failure == "function") {
                        e.failure.call(e.scope, this, f)
                    }
                    this.fireEvent("exception", this, f)
                }
            })
        }
    },
    loadModel: function(a) {
        if (a && a.data) {
            this.setValues(a.data)
        }
        return this
    },
    updateModel: function(b, e) {
        var a, c, d;
        if (b && (a = b.fields)) {
            c = this.getValues(e);
            for (d in c) {
                if (c.hasOwnProperty(d) && a.containsKey(d)) {
                    b.set(d, c[d])
                }
            }
        }
        return this
    },
    setValues: function(b) {
        var a = this.getFields(),
            c, d;
        b = b || {};
        for (c in b) {
            if (b.hasOwnProperty(c) && c in a) {
                d = a[c];
                d.setValue && d.setValue(b[c])
            }
        }
        return this
    },
    getValues: function(d) {
        var a = this.getFields(),
            e, b = {}, c;
        for (c in a) {
            if (a.hasOwnProperty(c)) {
                e = a[c];
                if (d && e.disabled) {
                    continue
                }
                if (e.getValue) {
                    b[c] = e.getGroupValue ? e.getGroupValue() : e.getValue()
                }
            }
        }
        return b
    },
    reset: function() {
        var a = this.getFields(),
            b;
        for (b in a) {
            if (a.hasOwnProperty(b)) {
                a[b].reset()
            }
        }
    },
    getFields: function() {
        var a = {};
        var b = function(c) {
            if (c.isField) {
                a[c.getName()] = c
            }
            if (c.isContainer) {
                c.items.each(b)
            }
        };
        this.items.each(b);
        return a
    },
    showMask: function(a, b) {
        a = Ext.isString(a) ? {
            message: a,
            transparent: false
        } : a;
        if (a && this.waitTpl) {
            this.maskTarget = b = Ext.get(b || a.target) || this.el;
            b && b.mask( !! a.transparent, this.waitTpl.apply(a))
        }
        return this
    },
    hideMask: function() {
        if (this.maskTarget) {
            this.maskTarget.unmask();
            delete this.maskTarget
        }
        return this
    }
});
Ext.form.FormPanel.prototype.load = Ext.form.FormPanel.prototype.loadModel;
Ext.reg("form", Ext.form.FormPanel);
Ext.form.FieldSet = Ext.extend(Ext.Panel, {
    cmpCls: "x-form-fieldset",
    initComponent: function() {
        this.componentLayout = new Ext.layout.AutoComponentLayout();
        Ext.form.FieldSet.superclass.initComponent.call(this)
    },
    afterLayout: function(a) {
        Ext.form.FieldSet.superclass.afterLayout.call(this, a);
        if (this.title && !this.titleEl) {
            this.titleEl = this.el.insertFirst({
                cls: this.cmpCls + "-title",
                html: this.title
            })
        } else {
            if (this.titleEl) {
                this.el.insertFirst(this.titleEl)
            }
        }
        if (this.instructions && !this.instructionsEl) {
            this.instructionsEl = this.el.createChild({
                cls: this.cmpCls + "-instructions",
                html: this.instructions
            })
        } else {
            if (this.instructionsEl) {
                this.el.appendChild(this.instructionsEl)
            }
        }
    }
});
Ext.reg("fieldset", Ext.form.FieldSet);
Ext.form.Field = Ext.extend(Ext.Component, {
    ui: "text",
    isField: true,
    baseCls: "x-field",
    inputCls: undefined,
    focusClass: "x-field-focus",
    placeHolder: undefined,
    autoComplete: undefined,
    autoCapitalize: undefined,
    renderTpl: ['<div <tpl if="id">id="{id}" </tpl>class="{baseCls}<tpl if="required"> {required}</tpl><tpl if="cls"> {cls}</tpl><tpl if="cmpCls"> {cmpCls}</tpl><tpl if="ui"> {uiBase}-{ui}</tpl> <tpl if="label">{labelAlign}</tpl>" <tpl if="style"> style="{style}"</tpl>>', '<tpl if="label"><label <tpl if="fieldEl">for="{inputId}"</tpl>><span>{label}</span></label></tpl>', '<tpl if="fieldEl"><input id="{inputId}" type="{type}" name="{name}" class="{fieldCls}"', '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>', '<tpl if="placeholder">placeholder="{placeholder}" </tpl>', '<tpl if="style">style="{style}" </tpl>', '<tpl if="maxlength">maxlength="{maxlength}" </tpl>', '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>', '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>', '<tpl if="autoCorrect">autocorrect="{autoCorrect}" </tpl>', "/></tpl>", '<tpl if="showClear"><div class="x-field-clear x-hidden-display"></div></tpl>', '<tpl if="maskField"><div class="x-field-mask"></div></tpl>', "</div>"],
    disabled: false,
    isFormField: true,
    hasFocus: false,
    autoCreateField: true,
    inputType: "text",
    label: null,
    labelWidth: 100,
    labelAlign: "left",
    required: false,
    maskField: false,
    initComponent: function() {
        this.label = this.label || this.fieldLabel;
        Ext.form.Field.superclass.initComponent.call(this);
        this.addEvents("focus", "blur", "change", "keyup")
    },
    getName: function() {
        return this.name || this.id || ""
    },
    onRender: function(e, b) {
        var f = this,
            h = f.renderData,
            g = f.autoComplete,
            d = f.autoCapitalize,
            a = f.autoCorrect;
        Ext.applyIf(h, {
            disabled: f.disabled,
            fieldCls: "x-input-" + f.inputType + (f.inputCls ? " " + f.inputCls : ""),
            fieldEl: !f.fieldEl && f.autoCreateField,
            inputId: Ext.id(),
            label: f.label,
            labelAlign: "x-label-align-" + f.labelAlign,
            name: f.name || f.id,
            placeholder: f.placeholder,
            required: f.required ? "x-field-required" : undefined,
            style: f.style,
            tabIndex: f.tabIndex,
            maxlength: f.maxLength,
            type: f.inputType,
            maskField: f.maskField,
            showClear: f.showClear
        });
        var c = /true|on/i;
        if (typeof g != "undefined") {
            h.autoComplete = c.test(g + "") ? "on" : "off"
        }
        if (typeof d != "undefined") {
            h.autoCapitalize = c.test(d + "") ? "on" : "off"
        }
        if (typeof a != "undefined") {
            h.autoCorrect = c.test(a + "") ? "on" : "off"
        }
        Ext.applyIf(f.renderSelectors, {
            mask: ".x-field-mask",
            labelEl: "label",
            clearEl: ".x-field-clear",
            fieldEl: "." + h.fieldCls.trim().replace(/ /g, ".")
        });
        Ext.form.Field.superclass.onRender.call(f, e, b);
        if (f.fieldEl) {
            f.mon(f.fieldEl, {
                focus: f.onFocus,
                blur: f.onBlur,
                change: f.onChange,
                keyup: f.onKeyUp,
                paste: f.checkClear,
                scope: f
            });
            if (f.maskField) {
                f.mon(f.mask, {
                    tap: f.onMaskTap,
                    scope: f
                })
            }
            if (f.clearEl) {
                f.mon(f.clearEl, {
                    scope: this,
                    tap: this.onClearTap
                })
            }
        }
    },
    onEnable: function() {
        this.getActionEl().removeClass(this.disabledClass);
        this.el.dom.disabled = false;
        this.fieldEl.dom.disabled = false;
        this.checkClear()
    },
    onDisable: function() {
        this.getActionEl().addClass(this.disabledClass);
        this.el.dom.disabled = true;
        this.fieldEl.dom.disabled = true;
        this.checkClear(true)
    },
    initValue: function() {
        if (this.value !== undefined) {
            this.setValue(this.value)
        }
        this.originalValue = this.getValue()
    },
    isDirty: function() {
        if (this.disabled || !this.rendered) {
            return false
        }
        return String(this.getValue()) !== String(this.originalValue)
    },
    onClearTap: function() {
        this.setValue("")
    },
    checkClear: function(c) {
        var b = this.clearEl,
            d = this.fieldEl,
            a = this.getValue();
        if (!(b && d)) {
            return
        }
        a = Ext.isEmpty(a) ? "" : String(a);
        if (c || a.length === 0) {
            b.addClass("x-hidden-display");
            d.removeClass("x-field-clearable")
        } else {
            b.removeClass("x-hidden-display");
            d.addClass("x-field-clearable")
        }
    },
    afterRender: function() {
        Ext.form.Field.superclass.afterRender.call(this);
        this.initValue();
        this.checkClear()
    },
    onKeyUp: function(a) {
        this.checkClear();
        this.fireEvent("keyup", this, a)
    },
    onMaskTap: function(a) {
        this.mask.hide()
    },
    onChange: function(a) {
        this.checkClear();
        this.fireEvent("change", this, this.getValue())
    },
    reset: function() {
        this.setValue(this.originalValue)
    },
    beforeFocus: Ext.emptyFn,
    undoNativeScroll: function() {
        var a = this.el.parent();
        while (a) {
            if (a.getStyle("overflow") == "hidden") {
                a.dom.scrollTop = 0;
                a.dom.scrollLeft = 0
            }
            a = a.parent()
        }
    },
    onFocus: function(b) {
        var a = this;
        setTimeout(function() {
            a.undoNativeScroll()
        }, 0);
        this.beforeFocus();
        if (this.focusClass) {
            this.el.addClass(this.focusClass)
        }
        if (!this.hasFocus) {
            this.hasFocus = true;
            this.startValue = this.getValue();
            this.fireEvent("focus", this)
        }
    },
    beforeBlur: Ext.emptyFn,
    onBlur: function() {
        this.beforeBlur();
        if (this.focusClass) {
            this.el.removeClass(this.focusClass)
        }
        this.hasFocus = false;
        var a = this.getValue();
        if (String(a) !== String(this.startValue)) {
            this.fireEvent("change", this, a, this.startValue)
        }
        this.fireEvent("blur", this);
        if (this.maskField) {
            this.mask.show()
        }
        this.postBlur()
    },
    postBlur: Ext.emptyFn,
    getValue: function() {
        if (!this.rendered || !this.fieldEl) {
            return this.value
        }
        return this.fieldEl.getValue() || ""
    },
    setValue: function(a) {
        this.value = a;
        if (this.rendered && this.fieldEl) {
            this.fieldEl.dom.value = (Ext.isEmpty(a) ? "" : a)
        }
        this.checkClear();
        return this
    }
});
Ext.reg("field", Ext.form.Field);
Ext.form.Slider = Ext.extend(Ext.form.Field, {
    ui: "slider",
    inputCls: "x-slider",
    minValue: 0,
    maxValue: 100,
    animate: true,
    value: 0,
    renderTpl: ['<div <tpl if="id">id="{id}" </tpl>class="{baseCls} {cls} {cmpCls}<tpl if="ui"> {uiBase}-{ui}</tpl> <tpl if="label">{labelAlign}</tpl>" <tpl if="style"> style="{style}"</tpl>>', '<tpl if="label"><label <tpl if="fieldEl">for="{inputId}"</tpl>>{label}</label></tpl>', '<tpl if="fieldEl"><div id="{inputId}" name="{name}" class="{fieldCls}"', '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>', '<tpl if="style">style="{style}" </tpl>', "/></tpl>", '<div class="x-field-mask"></div>', "</div>"],
    increment: 1,
    constructor: function(a) {
        this.addEvents("beforechange", "change", "drag");
        Ext.form.Slider.superclass.constructor.call(this, a)
    },
    initComponent: function() {
        this.values = [this.value];
        Ext.form.Slider.superclass.initComponent.apply(this, arguments);
        if (this.thumbs == undefined) {
            var a = [],
                b = this.values,
                d = b.length,
                c;
            for (c = 0; c < d; c++) {
                a[a.length] = new Ext.form.Slider.Thumb({
                    value: b[c],
                    slider: this,
                    listeners: {
                        scope: this,
                        drag: this.onDrag,
                        dragend: this.onThumbDragEnd
                    }
                })
            }
            this.thumbs = a
        }
    },
    setValue: function(d) {
        var c = this,
            a = c.getThumb(),
            b = a.getValue(),
            e = c.constrain(d);
        if (c.fireEvent("beforechange", c, a, b, e) !== false) {
            this.moveThumb(a, this.getPixelValue(e, a));
            a.setValue(e);
            c.doComponentLayout();
            c.fireEvent("change", c, a, b, e)
        }
    },
    constrain: function(e) {
        var b = this.increment,
            g = Math.floor(Math.abs(e / b)),
            c = this.minValue + (g * b),
            a = Math.min(c + b, this.maxValue),
            f = e - c,
            d = a - e;
        return (f < d) ? c : a
    },
    getValue: function() {
        return this.getThumb().getValue()
    },
    getThumb: function() {
        return this.thumbs[0]
    },
    getSliderValue: function(b, d) {
        var f = d.el.getOuterWidth(),
            g = f / 2,
            a = this.fieldEl.getWidth() - f,
            c = this.maxValue - this.minValue,
            e = c / a;
        return this.minValue + (e * (b - g))
    },
    getPixelValue: function(f, c) {
        var e = c.el.getOuterWidth(),
            g = e / 2,
            a = this.fieldEl.getWidth() - e,
            b = this.maxValue - this.minValue,
            d = a / b;
        return (d * (f - this.minValue)) + g
    },
    renderThumbs: function() {
        var a = this.thumbs,
            c = a.length,
            b;
        for (b = 0; b < c; b++) {
            a[b].render(this.fieldEl)
        }
    },
    onThumbDragEnd: function(a) {
        this.setValue(this.getThumbValue(a))
    },
    getThumbValue: function(b) {
        var d = b.thumb,
            e = this.fieldEl.getPageBox(),
            c = d.el.getPageBox(),
            f = c.width,
            g = f / 2,
            a = (c.left - e.left) + g;
        return this.getSliderValue(a, d)
    },
    onDrag: function(a) {
        var b = this.getThumbValue(a);
        this.fireEvent("drag", this, a.thumb, this.constrain(b))
    },
    onTap: function(d) {
        var b = this.fieldEl.getPageBox(),
            c = d.pageX - b.left,
            a = this.getNearest(c);
        this.setValue(this.getSliderValue(c, a))
    },
    moveThumb: function(b, c, a) {
        var d = b.el.getOuterWidth() / 2;
        b.el.setLeft(c - d)
    },
    afterRender: function(a) {
        this.renderThumbs();
        Ext.form.Slider.superclass.afterRender.apply(this, arguments);
        this.fieldEl.on({
            scope: this,
            tap: this.onTap
        })
    },
    getNearest: function(a) {
        return this.thumbs[0]
    }
});
Ext.reg("slider", Ext.form.Slider);
Ext.form.Slider.Thumb = Ext.extend(Ext.form.Field, {
    isField: false,
    ui: "thumb",
    autoCreateField: false,
    draggable: true,
    value: 0,
    onRender: function() {
        Ext.form.Slider.Thumb.superclass.onRender.apply(this, arguments);
        this.dragConfig = {
            direction: "horizontal",
            constrain: this.slider.fieldEl,
            revert: false,
            thumb: this
        }
    },
    setValue: function(a) {
        this.value = a
    },
    getValue: function() {
        return this.value
    }
});
Ext.reg("thumb", Ext.form.Slider.Thumb);
Ext.form.Toggle = Ext.extend(Ext.form.Slider, {
    minValue: 0,
    maxValue: 1,
    ui: "toggle",
    minValueCls: "x-toggle-off",
    maxValueCls: "x-toggle-on",
    toggle: function() {
        var a = this.thumbs[0],
            b = a.getValue();
        this.setValue(b == this.minValue ? this.maxValue : this.minValue)
    },
    setValue: function(a) {
        Ext.form.Toggle.superclass.setValue.apply(this, arguments);
        var b = this.fieldEl;
        if (this.constrain(a) === this.minValue) {
            b.addClass(this.minValueCls);
            b.removeClass(this.maxValueCls)
        } else {
            b.addClass(this.maxValueCls);
            b.removeClass(this.minValueCls)
        }
    },
    onTap: function() {
        this.toggle()
    }
});
Ext.reg("toggle", Ext.form.Toggle);
Ext.form.TextField = Ext.extend(Ext.form.Field, {
    type: "text",
    maskField: Ext.platform.isIPhoneOS
});
Ext.reg("textfield", Ext.form.TextField);
Ext.form.PasswordField = Ext.extend(Ext.form.Field, {
    maskField: Ext.platform.isIPhoneOS,
    inputType: "password"
});
Ext.reg("passwordfield", Ext.form.PasswordField);
Ext.form.EmailField = Ext.extend(Ext.form.TextField, {
    inputType: "email",
    autoCapitalize: false
});
Ext.reg("emailfield", Ext.form.EmailField);
Ext.form.UrlField = Ext.extend(Ext.form.TextField, {
    inputType: "url",
    autoCapitalize: false
});
Ext.reg("urlfield", Ext.form.UrlField);
Ext.form.SearchField = Ext.extend(Ext.form.Field, {
    inputType: "search"
});
Ext.reg("searchfield", Ext.form.SearchField);
Ext.form.NumberField = Ext.extend(Ext.form.Field, {
    inputType: "number",
    minValue: undefined,
    maxValue: undefined,
    stepValue: undefined,
    renderTpl: ['<div <tpl if="id">id="{id}" </tpl>class="{baseCls} {cls} {cmpCls}<tpl if="ui"> {uiBase}-{ui}</tpl> <tpl if="label">{labelAlign}</tpl>" <tpl if="style"> style="{style}"</tpl>>', '<tpl if="label"><label <tpl if="fieldEl">for="{inputId}"</tpl>>{label}</label></tpl>', '<tpl if="fieldEl"><input id="{inputId}" type="{type}" name="{name}" class="{fieldCls}"', '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>', '<tpl if="placeholder">placeholder="{placeholder}" </tpl>', '<tpl if="style">style="{style}" </tpl>', '<tpl if="minValue != undefined">min="{minValue}" </tpl>', '<tpl if="maxValue != undefined">max="{maxValue}" </tpl>', '<tpl if="stepValue != undefined">step="{stepValue}" </tpl>', '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>', '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>', "/></tpl>", '<tpl if="showClear"><div class="x-field-clear x-hidden-display"></div></tpl>', "</div>"],
    ui: "number",
    maskField: Ext.platform.isIPhoneOS,
    onRender: function(b, a) {
        Ext.apply(this.renderData, {
            maxValue: this.maxValue,
            minValue: this.minValue,
            stepValue: this.stepValue
        });
        Ext.form.NumberField.superclass.onRender.call(this, b, a)
    }
});
Ext.reg("numberfield", Ext.form.NumberField);
Ext.form.SpinnerField = Ext.extend(Ext.form.NumberField, {
    cmpCls: "x-spinner",
    minValue: Number.NEGATIVE_INFINITY,
    maxValue: Number.MAX_VALUE,
    incrementValue: 1,
    accelerate: true,
    defaultValue: 0,
    cycle: false,
    disableInput: false,
    renderTpl: ['<div <tpl if="id">id="{id}" </tpl>class="{baseCls} {cls} {cmpCls}<tpl if="ui"> {uiBase}-{ui}</tpl> <tpl if="label">{labelAlign}</tpl>" <tpl if="style"> style="{style}"</tpl>>', '<tpl if="label"><label <tpl if="fieldEl">for="{inputId}"</tpl>>{label}</label></tpl>', '<tpl if="fieldEl">', '<div class="{cmpCls}-body">', '<div class="{cmpCls}-down"><span>-</span></div>', '<input id="{inputId}" type="number" name="{name}" class="{fieldCls}"', '<tpl if="disableInput">disabled </tpl>', '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>', '<tpl if="placeholder">placeholder="{placeholder}" </tpl>', '<tpl if="style">style="{style}" </tpl>', '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>', "/>", '<div class="{cmpCls}-up"><span>+</span></div>', "</div>", "</tpl>", '<div class="x-field-mask"></div>', "</div>"],
    initComponent: function() {
        this.addEvents("spin", "spindown", "spinup");
        Ext.form.SpinnerField.superclass.initComponent.call(this)
    },
    onRender: function(b, a) {
        var c = this;
        c.renderData.disableInput = c.disableInput;
        Ext.applyIf(c.renderSelectors, {
            spinUpEl: ".x-spinner-up",
            spinDownEl: ".x-spinner-down"
        });
        Ext.form.SpinnerField.superclass.onRender.call(c, b, a);
        c.downRepeater = c.createRepeater(c.spinDownEl, c.onSpinDown);
        c.upRepeater = c.createRepeater(c.spinUpEl, c.onSpinUp)
    },
    createRepeater: function(b, a) {
        var c = new Ext.util.TapRepeater(b, {
            accelerate: this.accelerate
        });
        this.mon(c, {
            tap: a,
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            preventDefault: true,
            scope: this
        });
        return c
    },
    onSpinDown: function() {
        if (!this.disabled) {
            this.spin(true)
        }
    },
    onSpinUp: function() {
        if (!this.disabled) {
            this.spin(false)
        }
    },
    onTouchStart: function(a) {
        a.el.addClass("x-button-pressed")
    },
    onTouchEnd: function(a) {
        a.el.removeClass("x-button-pressed")
    },
    spin: function(h) {
        var e = this,
            f = parseFloat(e.getValue()),
            b = e.incrementValue,
            d = e.cycle,
            c = e.minValue,
            a = e.maxValue,
            g = h ? "down" : "up";
        if (h) {
            f -= b
        } else {
            f += b
        }
        f = (isNaN(f)) ? e.defaultValue : f;
        if (f < c) {
            f = d ? a : c
        } else {
            if (f > a) {
                f = d ? c : a
            }
        }
        e.setValue(f);
        this.fireEvent("spin" + g, this, f);
        this.fireEvent("spin", this, f, g)
    },
    destroy: function() {
        Ext.destroy(this.downRepeater, this.upRepeater);
        Ext.form.SpinnerField.superclass.destroy.call(this, arguments)
    }
});
Ext.reg("spinnerfield", Ext.form.SpinnerField);
Ext.form.HiddenField = Ext.extend(Ext.form.Field, {
    inputType: "hidden",
    ui: "hidden",
    autoCreateField: false
});
Ext.reg("hidden", Ext.form.HiddenField);
Ext.form.UrlField = Ext.extend(Ext.form.TextField, {
    inputType: "url",
    autoCapitalize: false
});
Ext.reg("urlfield", Ext.form.UrlField);
Ext.form.Checkbox = Ext.extend(Ext.form.Field, {
    inputType: "checkbox",
    ui: "checkbox",
    checked: false,
    inputValue: undefined,
    constructor: function(a) {
        this.addEvents("check");
        Ext.form.Checkbox.superclass.constructor.call(this, a)
    },
    renderTpl: ['<div <tpl if="id">id="{id}" </tpl>class="{baseCls}<tpl if="required"> {required}</tpl><tpl if="cls"> {cls}</tpl><tpl if="cmpCls"> {cmpCls}</tpl><tpl if="ui"> {uiBase}-{ui}</tpl> <tpl if="label">{labelAlign}</tpl>" <tpl if="style"> style="{style}"</tpl>>', '<tpl if="label"><label <tpl if="fieldEl">for="{inputId}"</tpl>><span>{label}</span></label></tpl>', '<tpl if="fieldEl"><input id="{inputId}" type="{type}" name="{name}" class="{fieldCls}"', '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>', '<tpl if="style">style="{style}" </tpl> value="{inputValue}" ', "/></tpl>", "</div>"],
    onRender: function(b, a) {
        this.renderData.inputValue = this.inputValue || this.value || "";
        Ext.form.Checkbox.superclass.onRender.call(this, b, a);
        if (this.checked) {
            this.setValue(true)
        } else {
            this.checked = this.fieldEl.dom.checked
        }
    },
    getValue: function() {
        if (this.rendered) {
            return this.fieldEl.dom.checked
        }
        return this.checked
    },
    setValue: function(a) {
        var b = this.checked;
        this.checked = (a === true || a === "true" || a == "1" || String(a).toLowerCase() == "on");
        if (this.rendered) {
            this.fieldEl.dom.checked = this.checked;
            this.fieldEl.dom.defaultChecked = this.checked
        }
        if (b != this.checked) {
            this.fireEvent("check", this, this.checked)
        }
    }
});
Ext.reg("checkbox", Ext.form.Checkbox);
Ext.form.Radio = Ext.extend(Ext.form.Checkbox, {
    inputType: "radio",
    ui: "radio",
    getGroupValue: function() {
        var a = this.el.up("form") || Ext.getBody(),
            b = a.down("input[name=" + this.fieldEl.dom.name + "]:checked", true);
        return b ? b.value : null
    },
    onClick: function() {
        if (this.fieldEl.dom.checked != this.checked) {
            var a = this.getCheckEl().select("input[name=" + this.fieldEl.dom.name + "]");
            a.each(function(b) {
                if (b.dom.id == this.id) {
                    this.setValue(true)
                } else {
                    Ext.getCmp(b.dom.id).setValue(false)
                }
            }, this)
        }
    },
    setValue: function(a) {
        if (typeof a == "boolean") {
            Ext.form.Radio.superclass.setValue.call(this, a)
        } else {
            if (this.rendered && a != undefined) {
                var b, c = this.getCheckEl().down("input[name=" + this.fieldEl.dom.name + "][value=" + a + "]");
                if (c && (b = c.up("." + this.renderData.baseCls))) {
                    Ext.getCmp(b.id).setValue(true)
                }
            }
        }
    },
    getCheckEl: function() {
        if (this.inGroup) {
            return this.el.up(".x-form-radio-group")
        }
        return this.el.up("form") || Ext.getBody()
    }
});
Ext.reg("radio", Ext.form.Radio);
Ext.form.Select = Ext.extend(Ext.form.Field, {
    ui: "select",
    valueField: "value",
    displayField: "text",
    renderTpl: ['<div <tpl if="id">id="{id}" </tpl>class="{baseCls} {cls} {cmpCls}<tpl if="ui"> {uiBase}-{ui}</tpl> <tpl if="label">{labelAlign}</tpl>" <tpl if="style"> style="{style}"</tpl>>', '<tpl if="label"><label <tpl if="fieldEl">for="{inputId}"</tpl>>{label}</label></tpl>', '<tpl if="fieldEl"><select id="{inputId}" type="{type}" name="{name}" class="{fieldCls}"', '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>', '<tpl if="placeholder">placeholder="{placeholder}" </tpl>', '<tpl if="style">style="{style}" </tpl>', '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>', "</select></tpl>", "</div>"],
    onRender: function(c, a) {
        Ext.form.Select.superclass.onRender.call(this, c, a);
        if (this.options) {
            this.setOptions()
        } else {
            var b = this.store || {};
            delete this.store;
            this.bindStore(b, b.getCount && b.getCount() > 0)
        }
    },
    getOptionsTpl: function() {
        return new Ext.XTemplate('<tpl for="options">', '<option value="{' + this.valueField + '}">{' + this.displayField + "}</option>", "</tpl>", {
            compiled: true
        })
    },
    setOptions: function(c, a) {
        var d = this;
        c || (a = false);
        c = c || d.options;
        if (Ext.isArray(c)) {
            if (d.rendered) {
                var b = d.getOptionsTpl();
                if (b && b.applyTemplate) {
                    if (a && d.fieldEl.child("option")) {
                        b.insertAfter(d.fieldEl.dom.lastChild, {
                            options: c
                        })
                    } else {
                        b.overwrite(d.fieldEl, {
                            options: c
                        })
                    }
                } else {
                    throw "Error: Missing/invalid options template."
                }
            }
            d.options = a ? (d.options || []).concat(c) : c
        }
        return d
    },
    getStore: function() {
        return this.store
    },
    bindStore: function(a, d) {
        var c = this,
            b = {
                datachanged: c.onDataChanged,
                scope: c
            };
        if (c.store) {
            c.store.un(b);
            c.store = null
        }
        if (a && a.getRange) {
            c.store = a;
            a.on(b);
            if (d) {
                c.onDataChanged(a)
            }
        }
        return c
    },
    onDataChanged: function(a) {
        a = a || this.store;
        if (a && a.getRange) {
            this.setOptions(Ext.pluck(a.data.items, "data"))
        }
    },
    onDestroy: function() {
        this.bindStore(null);
        Ext.form.Select.superclass.onDestroy.call(this)
    }
});
Ext.reg("select", Ext.form.Select);
Ext.form.TextArea = Ext.extend(Ext.form.TextField, {
    maskField: Ext.platform.isIPhoneOS,
    maxRows: undefined,
    autoCapitalize: false,
    renderTpl: ['<div <tpl if="id">id="{id}" </tpl>class="{baseCls} {cls} {cmpCls}<tpl if="ui"> {uiBase}-{ui}</tpl> <tpl if="label">{labelAlign}</tpl>" <tpl if="style"> style="{style}"</tpl>>', '<tpl if="label"><label <tpl if="fieldEl">for="{inputId}"</tpl>>{label}</label></tpl>', '<tpl if="fieldEl"><textarea id="{inputId}" type="{type}" name="{name}" class="{fieldCls}"', '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>', '<tpl if="placeholder">placeholder="{placeholder}" </tpl>', '<tpl if="style">style="{style}" </tpl>', '<tpl if="maxRows != undefined">rows="{maxRows}" </tpl>', '<tpl if="maxlength != undefined">maxlength="{maxlength}" </tpl>', '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>', '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>', "></textarea></tpl>", '<tpl if="showClear"><div class="x-field-clear x-hidden-display"></div></tpl>', '<tpl if="maskField"><div class="x-field-mask"></div></tpl>', "</div>"],
    ui: "textarea",
    onRender: function(b, a) {
        this.renderData.maxRows = this.maxRows;
        Ext.form.TextArea.superclass.onRender.call(this, b, a)
    }
});
Ext.reg("textarea", Ext.form.TextArea);
Ext.layout.Layout = Ext.extend(Object, {
    type: "layout",
    constructor: function(a) {
        this.id = Ext.id(null, "ext-layout-");
        Ext.apply(this, a)
    },
    setOwner: function(a) {
        this.owner = a
    },
    layout: function() {
        var a = this.owner,
            b = this.getTarget();
        if (!this.layedOut && !Ext.isEmpty(this.targetCls)) {
            b.addClass(this.targetCls)
        }
        this.onLayout(a, b, arguments.length ? arguments : []);
        this.layedOut = true;
        this.afterLayout()
    },
    afterLayout: Ext.emptyFn,
    getLayoutItems: Ext.emptyFn,
    getTarget: Ext.emptyFn,
    onLayout: Ext.emptyFn,
    onRemove: Ext.emptyFn,
    onDestroy: Ext.emptyFn,
    isValidParent: function(a, b) {
        var c = a.el ? a.el.dom : Ext.getDom(a);
        return b && (c.parentNode == (b.dom || b))
    },
    renderItems: function(a, e) {
        var d = a.length,
            b, c;
        for (b = 0; b < d; b++) {
            c = a[b];
            if (c && !c.rendered) {
                this.renderItem(c, b, e)
            } else {
                if (!this.isValidParent(c, e)) {
                    this.moveItem(c, b, e)
                }
            }
            this.configureItem(c, b)
        }
    },
    renderItem: function(b, a, c) {
        if (!b.rendered) {
            b.render(c, a)
        }
    },
    getTargetBox: function() {
        return this.getTarget().getBox(true, true)
    },
    moveItem: function(b, a, c) {
        if (typeof a == "number") {
            a = c.dom.childNodes[a]
        }
        c = c.dom || c;
        c.insertBefore(b.getPositionEl().dom, a || null);
        b.container = c;
        this.configureItem(b, a)
    },
    configureItem: function(b, a) {
        if (this.extraCls) {
            b.getPositionEl().addClass(this.extraCls)
        }
    },
    afterRemove: function(a) {
        if (this.extraCls && a.rendered) {
            a.getPositionEl().removeClass(this.extraCls)
        }
    },
    destroy: function() {
        if (!Ext.isEmpty(this.targetCls)) {
            var a = this.owner.getLayoutTarget();
            if (a) {
                a.removeClass(this.targetCls)
            }
        }
        this.onDestroy()
    }
});
Ext.layout.ComponentLayout = Ext.extend(Ext.layout.Layout, {
    onLayout: function(a, d, b) {
        var c = a.layout;
        a.afterComponentLayout(this);
        if (c && typeof c.layout == "function") {
            c.layout()
        }
    },
    getLayoutItems: function() {
        return []
    },
    getTarget: function() {
        return this.owner.getResizeEl()
    },
    setTargetSize: function(a, b) {
        var c = this.getTarget();
        if (a !== undefined && b !== undefined) {
            c.setSize(a, b)
        } else {
            if (b !== undefined) {
                c.setHeight(b)
            } else {
                if (a !== undefined) {
                    c.setWidth(a)
                }
            }
        }
    }
});
Ext.layout.AutoComponentLayout = Ext.extend(Ext.layout.ComponentLayout, {
    type: "component",
    onLayout: function(a, e, c) {
        var b = c[0],
            d = c[1];
        b = (typeof b == "number" || b == "auto") ? c[0] : undefined;
        d = (typeof d == "number" || d == "auto") ? c[1] : undefined;
        this.setTargetSize(b, d);
        Ext.layout.AutoComponentLayout.superclass.onLayout.call(this, a, e, c)
    }
});
Ext.layout.TYPES.component = Ext.layout.AutoComponentLayout;
Ext.layout.DockLayout = Ext.extend(Ext.layout.ComponentLayout, {
    type: "dock",
    renderHidden: false,
    extraCls: "x-docked",
    onLayout: function(a, g, d) {
        var c = this.getLayoutItems(),
            b = d[0],
            e = d[1];
        var f = this.info = {
            boxes: [],
            panelSize: {
                width: b,
                height: e
            }
        };
        this.renderItems(c, g);
        this.setTargetSize(b, e);
        this.dockItems(c);
        Ext.layout.DockLayout.superclass.onLayout.call(this, a, g)
    },
    getLayoutItems: function() {
        return this.owner.getDockedItems() || []
    },
    configureItem: function(a, b) {
        Ext.layout.DockLayout.superclass.configureItem.call(this, a, b);
        if (this.extraCls) {
            a.getPositionEl().addClass(this.extraCls + "-" + a.dock)
        }
        if (a.overlay) {
            a.getPositionEl().addClass(this.extraCls + "-overlay")
        }
    },
    afterRemove: function(a) {
        Ext.layout.DockLayout.superclass.afterRemove.call(this, a);
        if (this.extraCls) {
            a.getPositionEl().removeClass(this.extraCls + "-" + a.dock)
        }
        if (a.overlay) {
            a.getPositionEl().removeClass(this.extraCls + "-overlay")
        }
    },
    dockItems: function(j, a) {
        this.calculateDockBoxes(j, a);
        var c = this.info,
            f = c.boxes,
            h = f.length,
            b = this.owner,
            g = this.getTarget(),
            e, d;
        b.body.setBox({
            width: c.targetBox.width || null,
            height: c.targetBox.height || null,
            top: (c.targetBox.top - b.el.getPadding("t")),
            left: (c.targetBox.left - b.el.getPadding("l"))
        });
        for (d = 0; d < h; d++) {
            e = f[d];
            e.item.setPosition(e.left, e.top)
        }
    },
    calculateDockBoxes: function(k, a) {
        var g = this.getTarget(),
            b = this.owner,
            o = b.body,
            c = this.info,
            j = k.length,
            n, d, f, m, e;
        c.panelSize = g.getSize();
        c.targetBox = this.getTargetBox();
        c.targetBox.left -= g.getBorderWidth("l");
        c.targetBox.top -= g.getBorderWidth("t");
        for (d = 0; d < j; d++) {
            n = k[d];
            if (n.hidden && !this.renderHidden) {
                continue
            }
            f = this.initBox(n);
            n.setSize(f);
            if (f.width == undefined) {
                f.width = n.getWidth()
            }
            if (f.height == undefined) {
                f.height = n.getHeight()
            }
            f = this.adjustSizedBox(f, d);
            c.boxes.push(f)
        }
    },
    adjustSizedBox: function(d, b) {
        var a = this.info.targetBox,
            c = d.item;
        switch (d.type) {
            case "top":
                d.top = a.top;
                if (!c.overlay) {
                    a.top += d.height;
                    a.height -= d.height
                }
                break;
            case "left":
                d.left = a.left;
                if (!c.overlay) {
                    a.left += d.width;
                    a.width -= d.width
                }
                break;
            case "bottom":
                d.top = (a.top + a.height) - d.height;
                if (!c.overlay) {
                    a.height -= d.height
                }
                break;
            case "right":
                d.left = (a.left + a.width) - d.width;
                if (!c.overlay) {
                    a.width -= d.width
                }
                break
        }
        return d
    },
    initBox: function(d) {
        var b = this.info.targetBox,
            a = (d.dock == "top" || d.dock == "bottom"),
            c = {
                item: d,
                type: d.dock
            };
        if (d.stretch !== false) {
            if (a) {
                c.left = b.left;
                c.width = b.width
            } else {
                c.top = b.top;
                c.height = b.height
            }
            c.stretched = true
        } else {
            d.setSize(d.width || undefined, d.height || undefined);
            c.width = d.getWidth();
            c.height = d.getHeight();
            if (a) {
                c.left = b.left;
                if (d.align == "right") {
                    c.left += (b.width - c.width)
                } else {
                    if (d.align == "center") {
                        c.left += ((b.width - c.width) / 2)
                    }
                }
            } else {
                c.top = b.top;
                if (d.align == "bottom") {
                    c.top += (b.height - c.height)
                } else {
                    if (d.align == "center") {
                        c.top += ((b.height - c.height) / 2)
                    }
                }
            }
        }
        return c
    }
});
Ext.layout.TYPES.dock = Ext.layout.DockLayout;
Ext.layout.FieldLayout = Ext.extend(Ext.layout.ComponentLayout, {
    type: "field",
    onLayout: function(a, e, c) {
        var b = c[0],
            d = c[1];
        this.owner = a;
        this.handleLabel();
        a.el.setSize(b, d);
        Ext.layout.FieldLayout.superclass.onLayout.call(this, a, e)
    },
    handleLabel: function() {
        this.owner.labelEl.setWidth(this.owner.labelWidth)
    }
});
Ext.layout.TYPES.field = Ext.layout.FieldLayout;
Ext.layout.ContainerLayout = Ext.extend(Ext.layout.Layout, {
    onLayout: function(a, b) {
        this.renderItems(this.getLayoutItems(), b)
    },
    afterLayout: function() {
        this.owner.afterLayout(this)
    },
    getLayoutItems: function() {
        return this.owner && this.owner.items && this.owner.items.items || []
    },
    getTarget: function() {
        return this.owner.getLayoutTarget()
    },
    getRenderedItems: function() {
        var f = this.getTarget(),
            a = this.getLayoutItems(),
            d = a.length,
            e = [],
            b, c;
        for (b = 0; b < d; b++) {
            c = a[b];
            if (c.rendered && this.isValidParent(c, f)) {
                e.push(c)
            }
        }
        return e
    },
    getVisibleItems: function() {
        var f = this.getTarget(),
            b = this.getLayoutItems(),
            e = b.length,
            a = [],
            c, d;
        for (c = 0; c < e; c++) {
            d = b[c];
            if (d.rendered && this.isValidParent(d, f) && d.hidden !== true) {
                a.push(d)
            }
        }
        return a
    }
});
Ext.layout.TYPES.container = Ext.layout.ContainerLayout;
Ext.layout.AutoContainerLayout = Ext.extend(Ext.layout.ContainerLayout, {
    type: "container",
    onLayout: function(a, e) {
        var b = this.getLayoutItems(),
            d = b.length,
            c;
        this.renderItems(b, e);
        for (c = 0; c < d; c++) {
            b[c].doComponentLayout(b[c].width || undefined, b[c].height || undefined)
        }
    }
});
Ext.layout.TYPES.auto = Ext.layout.AutoContainerLayout;
Ext.layout.BoxLayout = Ext.extend(Ext.layout.ContainerLayout, {
    type: "box",
    targetCls: "x-layout-box",
    innerCls: "x-layout-box-inner",
    pack: "start",
    direction: "normal",
    align: "center",
    onLayout: function(b, d) {
        Ext.layout.BoxLayout.superclass.onLayout.call(this, b, d);
        var a, c;
        if (this.pack === "left" || this.pack === "top") {
            this.pack = "start"
        } else {
            if (this.pack === "right" || this.pack === "bottom") {
                this.pack = "end"
            }
        }
        this.innerCt.setStyle({
            "-webkit-box-orient": this.orientation,
            "-webkit-box-direction": this.direction,
            "-webkit-box-pack": this.pack,
            "-webkit-box-align": this.align
        });
        if (d != this.innerCt) {
            c = d.getWidth(true);
            a = d.getHeight(true);
            if (c > 0) {
                this.innerCt.setWidth(c)
            }
            if (a > 0) {
                this.innerCt.setHeight(a)
            }
            this.innerCt.setSize(d.getWidth(true), d.getHeight(true))
        }
        this.handleBoxes(d);
        if (this.totalWidth) {
            this.innerCt.setWidth(Math.max(d.getWidth(true), this.totalWidth));
            var a = d.getHeight(true);
            if (a > 0) {
                this.innerCt.setHeight(a)
            }
        }
        if (this.totalHeight) {
            this.innerCt.setHeight(Math.max(d.getHeight(true), this.totalHeight));
            var c = d.getWidth(true);
            if (c > 0) {
                this.innerCt.setWidth(c)
            }
        }
    },
    renderItems: function(a) {
        if (!this.innerCt) {
            if (this.owner.scrollEl) {
                this.innerCt = this.owner.scrollEl.addClass(this.innerCls)
            } else {
                this.innerCt = this.getTarget().createChild({
                    cls: this.innerCls
                })
            }
        }
        Ext.layout.BoxLayout.superclass.renderItems.call(this, a, this.innerCt)
    }
});
Ext.layout.TYPES.hbox = Ext.layout.HBoxLayout = Ext.extend(Ext.layout.BoxLayout, {
    orientation: "horizontal",
    handleBoxes: function(g) {
        var a = this.getLayoutItems(),
            f = a.length,
            d, e, c, b;
        if (g === this.innerCt) {
            g.setWidth(g.parent().getWidth(true))
        }
        for (c = 0; c < f; c++) {
            e = a[c];
            if (e.flex != undefined) {
                e.el.setWidth(0);
                e.el.setStyle("-webkit-box-flex", e.flex)
            } else {
                e.doComponentLayout(e.width, e.height)
            }
        }
        this.totalWidth = 0;
        for (c = 0; c < f; c++) {
            e = a[c];
            if (e.flex != undefined) {
                d = e.el.getWidth();
                e.el.setStyle("-webkit-box-flex", null);
                e.doComponentLayout(d, e.height || undefined)
            }
            this.totalWidth += (e.el.getWidth() + e.el.getMargin("lr"))
        }
    }
});
Ext.layout.TYPES.vbox = Ext.layout.VBoxLayout = Ext.extend(Ext.layout.BoxLayout, {
    orientation: "vertical",
    handleBoxes: function(g) {
        var b = this.getLayoutItems(),
            f = b.length,
            e, d, c, a;
        if (g === this.innerCt) {
            g.setHeight(g.parent().getHeight(true))
        }
        for (d = 0; d < f; d++) {
            e = b[d];
            if (e.flex != undefined) {
                e.el.setHeight(0);
                e.el.setStyle("-webkit-box-flex", e.flex)
            } else {
                e.doComponentLayout(e.width, e.height)
            }
        }
        this.totalHeight = 0;
        for (d = 0; d < f; d++) {
            e = b[d];
            if (e.flex != undefined) {
                a = e.el.getHeight();
                e.el.setStyle("-webkit-box-flex", null);
                e.doComponentLayout(e.width || undefined, a)
            }
            this.totalHeight += (e.el.getHeight() + e.el.getMargin("tb"))
        }
    }
});
Ext.layout.FitLayout = Ext.extend(Ext.layout.ContainerLayout, {
    extraCls: "x-fit-item",
    targetCls: "x-layout-fit",
    type: "fit",
    onLayout: function(a, b) {
        Ext.layout.FitLayout.superclass.onLayout.call(this, a, b);
        if (a.items.length > 0) {
            this.setItemBox(a.items.items[0], this.getTargetBox())
        }
    },
    setItemBox: function(b, a) {
        if (b && a.height > 0) {
            a.width -= b.el.getMargin("lr");
            a.height -= b.el.getMargin("tb");
            b.setSize(a);
            b.setPosition(a)
        }
    }
});
Ext.layout.TYPES.fit = Ext.layout.FitLayout;
Ext.layout.CardLayout = Ext.extend(Ext.layout.FitLayout, {
    type: "card",
    sizeAllCards: false,
    hideInactive: true,
    layoutOnActivate: false,
    onLayout: function() {
        var f = this.getActiveItem();
        Ext.layout.FitLayout.superclass.onLayout.apply(this, arguments);
        var b = this.getLayoutItems(),
            e = b.length,
            a = this.getTargetBox(),
            c, d;
        if (this.sizeAllCards) {
            for (c = 0; c < e; c++) {
                d = b[c];
                this.setItemBox(d, a)
            }
        } else {
            if (f) {
                this.setItemBox(f, a)
            }
        }
        if (!this.layedOut && f) {
            if (f.fireEvent("beforeactivate", f) !== false) {
                f.fireEvent("activate", f)
            }
        }
    },
    getActiveItem: function() {
        if (!this.activeItem && this.owner) {
            this.activeItem = this.parseActiveItem(this.owner.activeItem)
        }
        if (this.activeItem && this.owner.items.items.indexOf(this.activeItem) != -1) {
            return this.activeItem
        }
        return null
    },
    parseActiveItem: function(a) {
        if (a && a.isComponent) {
            return a
        } else {
            if (typeof a == "number" || a == undefined) {
                return this.getLayoutItems()[a || 0]
            } else {
                return this.owner.getComponent(a)
            }
        }
    },
    configureItem: function(b, a) {
        Ext.layout.FitLayout.superclass.configureItem.call(this, b, a);
        if (this.hideInactive && this.activeItem !== b) {
            b.hide()
        } else {
            b.show()
        }
    },
    setActiveItem: function(b, f) {
        var e = this,
            a = e.owner,
            g = Ext.getDoc(),
            d = e.activeItem,
            c;
        f = (f == undefined) ? a.animation : f;
        b = e.parseActiveItem(b);
        c = a.items.indexOf(b);
        if (c == -1) {
            a.add(b)
        }
        if (b && d != b && a.onBeforeCardSwitch(b, d, c, !! f) !== false) {
            if (!b.rendered) {
                e.renderItem(b, a.items.length, e.getTarget());
                e.configureItem(b, 0)
            }
            if (b.hidden) {
                b.show()
            }
            if (!e.sizeAllCards) {
                e.setItemBox(b, e.getTargetBox())
            }
            if (e.layoutOnActivate) {
                b.doComponentLayout()
            }
            e.activeItem = b;
            if (b.fireEvent("beforeactivate", b, d) === false) {
                return
            }
            if (d && d.fireEvent("beforedeactivate", d, b) === false) {
                return
            }
            if (f) {
                g.on("click", Ext.emptyFn, e, {
                    single: true,
                    preventDefault: true
                });
                Ext.Anim.run(b, f, {
                    out: false,
                    autoClear: true,
                    scope: e,
                    after: function() {
                        (function() {
                            g.un("click", Ext.emptyFn, e)
                        }).defer(50, e);
                        b.fireEvent("activate", b, d);
                        if (!d) {
                            a.onCardSwitch(b, d, c, true)
                        }
                    }
                });
                if (d) {
                    Ext.Anim.run(d, f, {
                        out: true,
                        autoClear: true,
                        scope: e,
                        after: function() {
                            d.fireEvent("deactivate", d, b);
                            if (e.hideInactive && e.activeItem != d) {
                                d.hide()
                            }
                            a.onCardSwitch(b, d, c, true)
                        }
                    })
                }
            } else {
                b.fireEvent("activate", b, d);
                if (d) {
                    d.fireEvent("deactivate", d, b);
                    if (e.hideInactive) {
                        d.hide()
                    }
                }
                a.onCardSwitch(b, d, c, false)
            }
            return b
        }
        return false
    },
    getNext: function(c) {
        var a = this.getLayoutItems(),
            b = a.indexOf(this.activeItem);
        return a[b + 1] || (c ? a[0] : false)
    },
    next: function(b, a) {
        return this.setActiveItem(this.getNext(a), b)
    },
    getPrev: function(c) {
        var a = this.getLayoutItems(),
            b = a.indexOf(this.activeItem);
        return a[b - 1] || (c ? a[a.length - 1] : false)
    },
    prev: function(b, a) {
        return this.setActiveItem(this.getPrev(a), b)
    }
});
Ext.layout.TYPES.card = Ext.layout.CardLayout;
