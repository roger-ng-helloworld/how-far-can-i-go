var hwTemplates = {};

hwTemplates["../../views/app.html"] = '<h1 class="col-xs-16">How far can I go</h1>\n\n<div class="right-rail col-md-11 col-md-push-5 ">\n	<div class="js-slider slider"></div>\n	<div class="js-map map"></div>\n</div>\n\n<div class="js-prices prices col-md-5 col-md-pull-11 hidden-xs hidden-sm"></div>\n ', 
hwTemplates["../../views/map.html"] = '<div id="js-google-maps" class="google-maps">Google Maps</div>', 
hwTemplates["../../views/origin.html"] = '<select can-value="origin">\n	<option value="sydney">Sydney</option>\n	<option value="melbourne">Melbourne</option>\n	<option value="brisbane">Brisbane</option>\n	<option value="perth">Perth</option>\n	<option value="adelaide">Adelaide</option>\n	<option value="darwin">Darwin</option>\n	<option value="hobart">Hobart</option>\n</select>', 
hwTemplates["../../views/prices.html"] = '<div class="price-panel col-xs-16">\n<h2>Deals</h2>\n<ul>\n	\n	{{#products}}\n		<li>\n			<div class="img"><img src="{{img}}" /></div>\n			<div class="city">{{city}}</div>\n			<div class="date">{{date}} | {{journeyType}}</div>\n			<div class="journey-type"></div>\n			<div class="price">${{price}}</div>\n			<div class="cta"><a class="btn full" href="{{cta}}" target="_blank">View</a></div>\n		</li>\n	{{/products}}\n	\n</ul>\n</div>', 
hwTemplates["../../views/slider.html"] = '<div id="js-slider"></div>\n\n<p>\n\nTravelling from \n\n<select can-value="origin">\n	<option value="sydney">Sydney</option>\n	<option value="melbourne">Melbourne</option>\n	<option value="canberra">Canberra</option>\n	<option value="brisbane">Brisbane</option>\n	<option value="perth">Perth</option>\n	<option value="adelaide">Adelaide</option>\n	<option value="darwin">Darwin</option>\n	<option value="hobart">Hobart</option>\n</select>\n\nwith the budget of \n\n<span class="budget">${{budget}}</span>\n\n</p>', 
function(window, undefined) {
    function isArraylike(obj) {
        var length = obj.length, type = jQuery.type(obj);
        return jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || "function" !== type && (0 === length || "number" == typeof length && length > 0 && length - 1 in obj);
    }
    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.match(core_rnotwhite) || [], function(_, flag) {
            object[flag] = !0;
        }), object;
    }
    function internalData(elem, name, data, pvt) {
        if (jQuery.acceptData(elem)) {
            var ret, thisCache, internalKey = jQuery.expando, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
            if (id && cache[id] && (pvt || cache[id].data) || data !== undefined || "string" != typeof name) return id || (id = isNode ? elem[internalKey] = core_deletedIds.pop() || jQuery.guid++ : internalKey), 
            cache[id] || (cache[id] = isNode ? {} : {
                toJSON: jQuery.noop
            }), ("object" == typeof name || "function" == typeof name) && (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)), 
            thisCache = cache[id], pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data), 
            data !== undefined && (thisCache[jQuery.camelCase(name)] = data), "string" == typeof name ? (ret = thisCache[name], 
            null == ret && (ret = thisCache[jQuery.camelCase(name)])) : ret = thisCache, ret;
        }
    }
    function internalRemoveData(elem, name, pvt) {
        if (jQuery.acceptData(elem)) {
            var thisCache, i, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
            if (cache[id]) {
                if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
                    jQuery.isArray(name) ? name = name.concat(jQuery.map(name, jQuery.camelCase)) : name in thisCache ? name = [ name ] : (name = jQuery.camelCase(name), 
                    name = name in thisCache ? [ name ] : name.split(" ")), i = name.length;
                    for (;i--; ) delete thisCache[name[i]];
                    if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) return;
                }
                (pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) && (isNode ? jQuery.cleanData([ elem ], !0) : jQuery.support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = null);
            }
        }
    }
    function dataAttr(elem, key, data) {
        if (data === undefined && 1 === elem.nodeType) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            if (data = elem.getAttribute(name), "string" == typeof data) {
                try {
                    data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}
                jQuery.data(elem, key, data);
            } else data = undefined;
        }
        return data;
    }
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) if (("data" !== name || !jQuery.isEmptyObject(obj[name])) && "toJSON" !== name) return !1;
        return !0;
    }
    function returnTrue() {
        return !0;
    }
    function returnFalse() {
        return !1;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    function sibling(cur, dir) {
        do cur = cur[dir]; while (cur && 1 !== cur.nodeType);
        return cur;
    }
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
        });
        if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not;
        });
        if ("string" == typeof qualifier) {
            if (isSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return jQuery.inArray(elem, qualifier) >= 0 !== not;
        });
    }
    function createSafeFragment(document) {
        var list = nodeNames.split("|"), safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) for (;list.length; ) safeFrag.createElement(list.pop());
        return safeFrag;
    }
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(1 === content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }
    function disableScript(elem) {
        return elem.type = (null !== jQuery.find.attr(elem, "type")) + "/" + elem.type, 
        elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
    }
    function setGlobalEval(elems, refElements) {
        for (var elem, i = 0; null != (elem = elems[i]); i++) jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
    }
    function cloneCopyEvent(src, dest) {
        if (1 === dest.nodeType && jQuery.hasData(src)) {
            var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
            if (events) {
                delete curData.handle, curData.events = {};
                for (type in events) for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i]);
            }
            curData.data && (curData.data = jQuery.extend({}, curData.data));
        }
    }
    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;
        if (1 === dest.nodeType) {
            if (nodeName = dest.nodeName.toLowerCase(), !jQuery.support.noCloneEvent && dest[jQuery.expando]) {
                data = jQuery._data(dest);
                for (e in data.events) jQuery.removeEvent(dest, e, data.handle);
                dest.removeAttribute(jQuery.expando);
            }
            "script" === nodeName && dest.text !== src.text ? (disableScript(dest).text = src.text, 
            restoreScript(dest)) : "object" === nodeName ? (dest.parentNode && (dest.outerHTML = src.outerHTML), 
            jQuery.support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML) && (dest.innerHTML = src.innerHTML)) : "input" === nodeName && manipulation_rcheckableType.test(src.type) ? (dest.defaultChecked = dest.checked = src.checked, 
            dest.value !== src.value && (dest.value = src.value)) : "option" === nodeName ? dest.defaultSelected = dest.selected = src.defaultSelected : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue);
        }
    }
    function getAll(context, tag) {
        var elems, elem, i = 0, found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll(tag || "*") : undefined;
        if (!found) for (found = [], elems = context.childNodes || context; null != (elem = elems[i]); i++) !tag || jQuery.nodeName(elem, tag) ? found.push(elem) : jQuery.merge(found, getAll(elem, tag));
        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], found) : found;
    }
    function fixDefaultChecked(elem) {
        manipulation_rcheckableType.test(elem.type) && (elem.defaultChecked = elem.checked);
    }
    function vendorPropName(style, name) {
        if (name in style) return name;
        for (var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--; ) if (name = cssPrefixes[i] + capName, 
        name in style) return name;
        return origName;
    }
    function isHidden(elem, el) {
        return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem);
    }
    function showHide(elements, show) {
        for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], 
        elem.style && (values[index] = jQuery._data(elem, "olddisplay"), display = elem.style.display, 
        show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName)))) : values[index] || (hidden = isHidden(elem), 
        (display && "none" !== display || !hidden) && jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
        for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), 
        isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), 
        "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), 
        "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = !0, val = "width" === name ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (0 >= val || null == val) {
            if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), 
            rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]), 
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    function css_defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(doc.documentElement), 
        doc = (iframe[0].contentWindow || iframe[0].contentDocument).document, doc.write("<!doctype html><html><body>"), 
        doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display), 
        display;
    }
    function actualDisplay(name, doc) {
        var elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = jQuery.css(elem[0], "display");
        return elem.remove(), display;
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
            traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add);
        }); else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj); else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];
            if (jQuery.isFunction(func)) for (;dataType = dataTypes[i++]; ) "+" === dataType[0] ? (dataType = dataType.slice(1) || "*", 
            (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func);
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), 
                inspect(dataTypeOrTransport), !1);
            }), selected;
        }
        var inspected = {}, seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) src[key] !== undefined && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep), target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var firstDataType, ct, finalDataType, type, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; ) dataTypes.shift(), 
        ct === undefined && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
        }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                firstDataType || (firstDataType = type);
            }
            finalDataType = finalDataType || firstDataType;
        }
        return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), 
        responses[finalDataType]) : void 0;
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current; ) if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), 
        !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), 
        prev = current, current = dataTypes.shift()) if ("*" === current) current = prev; else if ("*" !== prev && prev !== current) {
            if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), 
            tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], 
                dataTypes.unshift(tmp[1]));
                break;
            }
            if (conv !== !0) if (conv && s["throws"]) response = conv(response); else try {
                response = conv(response);
            } catch (e) {
                return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                };
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }
    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }
    function createFxNow() {
        return setTimeout(function() {
            fxNow = undefined;
        }), fxNow = jQuery.now();
    }
    function createTween(value, prop, animation) {
        for (var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++) if (tween = collection[index].call(animation, prop, value)) return tween;
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) return !1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [ animation, percent, remaining ]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [ animation ]), 
            !1);
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween), tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) return this;
                for (stopped = !0; length > index; index++) animation.tweens[index].run(1);
                return gotoEnd ? deferred.resolveWith(elem, [ animation, gotoEnd ]) : deferred.rejectWith(elem, [ animation, gotoEnd ]), 
                this;
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); length > index; index++) if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
        return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), 
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], 
        value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), 
        index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], 
        hooks && "expand" in hooks) {
            value = hooks.expand(value), delete props[name];
            for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing);
        } else specialEasing[name] = easing;
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = jQuery._data(elem, "fxshow");
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, 
        oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire();
        }), hooks.unqueued++, anim.always(function() {
            anim.always(function() {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire();
            });
        })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [ style.overflow, style.overflowX, style.overflowY ], 
        "inline" === jQuery.css(elem, "display") && "none" === jQuery.css(elem, "float") && (jQuery.support.inlineBlockNeedsLayout && "inline" !== css_defaultDisplay(elem.nodeName) ? style.zoom = 1 : style.display = "inline-block")), 
        opts.overflow && (style.overflow = "hidden", jQuery.support.shrinkWrapBlocks || anim.always(function() {
            style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
        }));
        for (prop in props) if (value = props[prop], rfxtypes.exec(value)) {
            if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) continue;
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
        }
        if (!jQuery.isEmptyObject(orig)) {
            dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = jQuery._data(elem, "fxshow", {}), 
            toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide();
            }), anim.done(function() {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop]);
            });
            for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), 
            prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, 
            tween.start = "width" === prop || "height" === prop ? 1 : 0));
        }
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    function genFx(type, includeWidth) {
        var which, attrs = {
            height: type
        }, i = 0;
        for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], 
        attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs;
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType ? elem.defaultView || elem.parentWindow : !1;
    }
    var readyList, rootjQuery, core_strundefined = typeof undefined, location = window.location, document = window.document, docElem = document.documentElement, _jQuery = window.jQuery, _$ = window.$, class2type = {}, core_deletedIds = [], core_version = "1.10.2", core_concat = core_deletedIds.concat, core_push = core_deletedIds.push, core_slice = core_deletedIds.slice, core_indexOf = core_deletedIds.indexOf, core_toString = class2type.toString, core_hasOwn = class2type.hasOwnProperty, core_trim = core_version.trim, jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context, rootjQuery);
    }, core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, core_rnotwhite = /\S+/g, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, rvalidchars = /^[\],:{}\s]*$/, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    }, completed = function(event) {
        (document.addEventListener || "load" === event.type || "complete" === document.readyState) && (detach(), 
        jQuery.ready());
    }, detach = function() {
        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", completed, !1), 
        window.removeEventListener("load", completed, !1)) : (document.detachEvent("onreadystatechange", completed), 
        window.detachEvent("onload", completed));
    };
    jQuery.fn = jQuery.prototype = {
        jquery: core_version,
        constructor: jQuery,
        init: function(selector, context, rootjQuery) {
            var match, elem;
            if (!selector) return this;
            if ("string" == typeof selector) {
                if (match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [ null, selector, null ] : rquickExpr.exec(selector), 
                !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
                if (match[1]) {
                    if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), 
                    rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                    return this;
                }
                if (elem = document.getElementById(match[2]), elem && elem.parentNode) {
                    if (elem.id !== match[2]) return rootjQuery.find(selector);
                    this.length = 1, this[0] = elem;
                }
                return this.context = document, this.selector = selector, this;
            }
            return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, 
            this) : jQuery.isFunction(selector) ? rootjQuery.ready(selector) : (selector.selector !== undefined && (this.selector = selector.selector, 
            this.context = selector.context), jQuery.makeArray(selector, this));
        },
        selector: "",
        length: 0,
        toArray: function() {
            return core_slice.call(this);
        },
        get: function(num) {
            return null == num ? this.toArray() : 0 > num ? this[this.length + num] : this[num];
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this, ret.context = this.context, ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        ready: function(fn) {
            return jQuery.ready.promise().done(fn), this;
        },
        slice: function() {
            return this.pushStack(core_slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (0 > i ? len : 0);
            return this.pushStack(j >= 0 && len > j ? [ this[j] ] : []);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: core_push,
        sort: [].sort,
        splice: [].splice
    }, jQuery.fn.init.prototype = jQuery.fn, jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[1] || {}, 
        i = 2), "object" == typeof target || jQuery.isFunction(target) || (target = {}), 
        length === i && (target = this, --i); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, 
        target[name] = jQuery.extend(deep, clone, copy)) : copy !== undefined && (target[name] = copy));
        return target;
    }, jQuery.extend({
        expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
        noConflict: function(deep) {
            return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), 
            jQuery;
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0);
        },
        ready: function(wait) {
            if (wait === !0 ? !--jQuery.readyWait : !jQuery.isReady) {
                if (!document.body) return setTimeout(jQuery.ready);
                jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [ jQuery ]), 
                jQuery.fn.trigger && jQuery(document).trigger("ready").off("ready"));
            }
        },
        isFunction: function(obj) {
            return "function" === jQuery.type(obj);
        },
        isArray: Array.isArray || function(obj) {
            return "array" === jQuery.type(obj);
        },
        isWindow: function(obj) {
            return null != obj && obj == obj.window;
        },
        isNumeric: function(obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        type: function(obj) {
            return null == obj ? String(obj) : "object" == typeof obj || "function" == typeof obj ? class2type[core_toString.call(obj)] || "object" : typeof obj;
        },
        isPlainObject: function(obj) {
            var key;
            if (!obj || "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return !1;
            try {
                if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (e) {
                return !1;
            }
            if (jQuery.support.ownLast) for (key in obj) return core_hasOwn.call(obj, key);
            for (key in obj) ;
            return key === undefined || core_hasOwn.call(obj, key);
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return !1;
            return !0;
        },
        error: function(msg) {
            throw new Error(msg);
        },
        parseHTML: function(data, context, keepScripts) {
            if (!data || "string" != typeof data) return null;
            "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
            var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
            return parsed ? [ context.createElement(parsed[1]) ] : (parsed = jQuery.buildFragment([ data ], context, scripts), 
            scripts && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
        },
        parseJSON: function(data) {
            return window.JSON && window.JSON.parse ? window.JSON.parse(data) : null === data ? data : "string" == typeof data && (data = jQuery.trim(data), 
            data && rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) ? new Function("return " + data)() : void jQuery.error("Invalid JSON: " + data);
        },
        parseXML: function(data) {
            var xml, tmp;
            if (!data || "string" != typeof data) return null;
            try {
                window.DOMParser ? (tmp = new DOMParser(), xml = tmp.parseFromString(data, "text/xml")) : (xml = new ActiveXObject("Microsoft.XMLDOM"), 
                xml.async = "false", xml.loadXML(data));
            } catch (e) {
                xml = undefined;
            }
            return xml && xml.documentElement && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), 
            xml;
        },
        noop: function() {},
        globalEval: function(data) {
            data && jQuery.trim(data) && (window.execScript || function(data) {
                window.eval.call(window, data);
            })(data);
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray) for (;length > i && (value = callback.apply(obj[i], args), value !== !1); i++) ; else for (i in obj) if (value = callback.apply(obj[i], args), 
                value === !1) break;
            } else if (isArray) for (;length > i && (value = callback.call(obj[i], i, obj[i]), 
            value !== !1); i++) ; else for (i in obj) if (value = callback.call(obj[i], i, obj[i]), 
            value === !1) break;
            return obj;
        },
        trim: core_trim && !core_trim.call("\ufeff ") ? function(text) {
            return null == text ? "" : core_trim.call(text);
        } : function(text) {
            return null == text ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [ arr ] : arr) : core_push.call(ret, arr)), 
            ret;
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (core_indexOf) return core_indexOf.call(arr, elem, i);
                for (len = arr.length, i = i ? 0 > i ? Math.max(0, len + i) : i : 0; len > i; i++) if (i in arr && arr[i] === elem) return i;
            }
            return -1;
        },
        merge: function(first, second) {
            var l = second.length, i = first.length, j = 0;
            if ("number" == typeof l) for (;l > j; j++) first[i++] = second[j]; else for (;second[j] !== undefined; ) first[i++] = second[j++];
            return first.length = i, first;
        },
        grep: function(elems, callback, inv) {
            var retVal, ret = [], i = 0, length = elems.length;
            for (inv = !!inv; length > i; i++) retVal = !!callback(elems[i], i), inv !== retVal && ret.push(elems[i]);
            return ret;
        },
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            if (isArray) for (;length > i; i++) value = callback(elems[i], i, arg), null != value && (ret[ret.length] = value); else for (i in elems) value = callback(elems[i], i, arg), 
            null != value && (ret[ret.length] = value);
            return core_concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var args, proxy, tmp;
            return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), 
            jQuery.isFunction(fn) ? (args = core_slice.call(arguments, 2), proxy = function() {
                return fn.apply(context || this, args.concat(core_slice.call(arguments)));
            }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : undefined;
        },
        access: function(elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0, length = elems.length, bulk = null == key;
            if ("object" === jQuery.type(key)) {
                chainable = !0;
                for (i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw);
            } else if (value !== undefined && (chainable = !0, jQuery.isFunction(value) || (raw = !0), 
            bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
                return bulk.call(jQuery(elem), value);
            })), fn)) for (;length > i; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
            return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
        },
        now: function() {
            return new Date().getTime();
        },
        swap: function(elem, options, callback, args) {
            var ret, name, old = {};
            for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
            ret = callback.apply(elem, args || []);
            for (name in options) elem.style[name] = old[name];
            return ret;
        }
    }), jQuery.ready.promise = function(obj) {
        if (!readyList) if (readyList = jQuery.Deferred(), "complete" === document.readyState) setTimeout(jQuery.ready); else if (document.addEventListener) document.addEventListener("DOMContentLoaded", completed, !1), 
        window.addEventListener("load", completed, !1); else {
            document.attachEvent("onreadystatechange", completed), window.attachEvent("onload", completed);
            var top = !1;
            try {
                top = null == window.frameElement && document.documentElement;
            } catch (e) {}
            top && top.doScroll && !function doScrollCheck() {
                if (!jQuery.isReady) {
                    try {
                        top.doScroll("left");
                    } catch (e) {
                        return setTimeout(doScrollCheck, 50);
                    }
                    detach(), jQuery.ready();
                }
            }();
        }
        return readyList.promise(obj);
    }, jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    }), rootjQuery = jQuery(document), function(window, undefined) {
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), 
            context = context || document, results = results || [], !selector || "string" != typeof selector) return results;
            if (1 !== (nodeType = context.nodeType) && 9 !== nodeType) return [];
            if (documentIsHTML && !seed) {
                if (match = rquickExpr.exec(selector)) if (m = match[1]) {
                    if (9 === nodeType) {
                        if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                        if (elem.id === m) return results.push(elem), results;
                    } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), 
                    results;
                } else {
                    if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), 
                    results;
                    if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), 
                    results;
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (nid = old = expando, newContext = context, newSelector = 9 === nodeType && selector, 
                    1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                        for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), 
                        nid = "[id='" + nid + "'] ", i = groups.length; i--; ) groups[i] = nid + toSelector(groups[i]);
                        newContext = rsibling.test(selector) && context.parentNode || context, newSelector = groups.join(",");
                    }
                    if (newSelector) try {
                        return push.apply(results, newContext.querySelectorAll(newSelector)), results;
                    } catch (qsaError) {} finally {
                        old || context.removeAttribute("id");
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            function cache(key, value) {
                return keys.push(key += " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key] = value;
            }
            var keys = [];
            return cache;
        }
        function markFunction(fn) {
            return fn[expando] = !0, fn;
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return !1;
            } finally {
                div.parentNode && div.parentNode.removeChild(div), div = null;
            }
        }
        function addHandle(attrs, handler) {
            for (var arr = attrs.split("|"), i = attrs.length; i--; ) Expr.attrHandle[arr[i]] = handler;
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) return diff;
            if (cur) for (;cur = cur.nextSibling; ) if (cur === b) return -1;
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument, markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; ) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]));
                });
            });
        }
        function setFilters() {}
        function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), 
                groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }), soFar = soFar.slice(matched.length));
                for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                }), soFar = soFar.slice(matched.length));
                if (!matched) break;
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }
        function toSelector(tokens) {
            for (var i = 0, len = tokens.length, selector = ""; len > i; i++) selector += tokens[i].value;
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && "parentNode" === dir, doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml);
            } : function(elem, context, xml) {
                var data, cache, outerCache, dirkey = dirruns + " " + doneName;
                if (xml) {
                    for (;elem = elem[dir]; ) if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0;
                } else for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) if (outerCache = elem[expando] || (elem[expando] = {}), 
                (cache = outerCache[dir]) && cache[0] === dirkey) {
                    if ((data = cache[1]) === !0 || data === cachedruns) return data === !0;
                } else if (cache = outerCache[dir] = [ dirkey ], cache[1] = matcher(elem, context, xml) || cachedruns, 
                cache[1] === !0) return !0;
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; ) if (!matchers[i](elem, context, xml)) return !1;
                return !0;
            } : matchers[0];
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++) (elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), 
            mapped && map.push(i));
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), 
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), 
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), 
                postFilter(temp, [], context, xml), i = temp.length; i--; ) (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [], i = matcherOut.length; i--; ) (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        for (i = matcherOut.length; i--; ) (elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem));
                    }
                } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), 
                postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
            });
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf.call(checkContext, elem) > -1;
            }, implicitRelative, !0), matchers = [ function(elem, context, xml) {
                return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            } ]; len > i; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ addCombinator(elementMatcher(matchers), matcher) ]; else {
                if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                    for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++) ;
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                        value: " " === tokens[i - 2].type ? "*" : ""
                    })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens));
                }
                matchers.push(matcher);
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var matcherCachedRuns = 0, bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, expandContext) {
                var elem, j, matcher, setMatched = [], matchedCount = 0, i = "0", unmatched = seed && [], outermost = null != expandContext, contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", expandContext && context.parentNode || context), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1;
                for (outermost && (outermostContext = context !== document && context, cachedruns = matcherCachedRuns); null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0; matcher = elementMatchers[j++]; ) if (matcher(elem, context, xml)) {
                            results.push(elem);
                            break;
                        }
                        outermost && (dirruns = dirrunsUnique, cachedruns = ++matcherCachedRuns);
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem));
                }
                if (matchedCount += i, bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++]; ) matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0) for (;i--; ) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results);
                }
                return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), 
                unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
            return results;
        }
        function select(selector, context, results, seed) {
            var i, tokens, token, type, find, match = tokenize(selector);
            if (!seed && 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], 
                    !context) return results;
                    selector = selector.slice(tokens.shift().value.length);
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], 
                !Expr.relative[type = token.type]); ) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && context.parentNode || context))) {
                    if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), 
                    results;
                    break;
                }
            }
            return compile(selector, match)(seed, context, !documentIsHTML, results, rsibling.test(selector)), 
            results;
        }
        var i, support, cachedruns, Expr, getText, isXML, compile, outermostContext, sortInput, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), hasDuplicate = !1, sortOrder = function(a, b) {
            return a === b ? (hasDuplicate = !0, 0) : 0;
        }, strundefined = typeof undefined, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = arr.indexOf || function(elem) {
            for (var i = 0, len = this.length; len > i; i++) if (this[i] === elem) return i;
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace(3, 8) + ")*)|.*)\\)|)", rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rsibling = new RegExp(whitespace + "*[+~]"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
        };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), 
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    for (var j = target.length, i = 0; target[j++] = els[i++]; ) ;
                    target.length = j - 1;
                }
            };
        }
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? "HTML" !== documentElement.nodeName : !1;
        }, support = Sizzle.support = {}, setDocument = Sizzle.setDocument = function(node) {
            var doc = node ? node.ownerDocument || node : preferredDoc, parent = doc.defaultView;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, 
            docElem = doc.documentElement, documentIsHTML = !isXML(doc), parent && parent.attachEvent && parent !== parent.top && parent.attachEvent("onbeforeunload", function() {
                setDocument();
            }), support.attributes = assert(function(div) {
                return div.className = "i", !div.getAttribute("className");
            }), support.getElementsByTagName = assert(function(div) {
                return div.appendChild(doc.createComment("")), !div.getElementsByTagName("*").length;
            }), support.getElementsByClassName = assert(function(div) {
                return div.innerHTML = "<div class='a'></div><div class='a i'></div>", div.firstChild.className = "i", 
                2 === div.getElementsByClassName("i").length;
            }), support.getById = assert(function(div) {
                return docElem.appendChild(div).id = expando, !doc.getElementsByName || !doc.getElementsByName(expando).length;
            }), support.getById ? (Expr.find.ID = function(id, context) {
                if (typeof context.getElementById !== strundefined && documentIsHTML) {
                    var m = context.getElementById(id);
                    return m && m.parentNode ? [ m ] : [];
                }
            }, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId;
                };
            }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                    return node && node.value === attrId;
                };
            }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                return typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag) : void 0;
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    for (;elem = results[i++]; ) 1 === elem.nodeType && tmp.push(elem);
                    return tmp;
                }
                return results;
            }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                return typeof context.getElementsByClassName !== strundefined && documentIsHTML ? context.getElementsByClassName(className) : void 0;
            }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
                div.innerHTML = "<select><option selected=''></option></select>", div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), 
                div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked");
            }), assert(function(div) {
                var input = doc.createElement("input");
                input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("t", ""), 
                div.querySelectorAll("[t^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), 
                div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), 
                div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:");
            })), (support.matchesSelector = rnative.test(matches = docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), 
                rbuggyMatches.push("!=", pseudos);
            }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), 
            contains = rnative.test(docElem.contains) || docElem.compareDocumentPosition ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, sortOrder = docElem.compareDocumentPosition ? function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);
                return compare ? 1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || contains(preferredDoc, a) ? -1 : b === doc || contains(preferredDoc, b) ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0 : 4 & compare ? -1 : 1 : a.compareDocumentPosition ? -1 : 1;
            } : function(a, b) {
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (a === b) return hasDuplicate = !0, 0;
                if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
                if (aup === bup) return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode; ) ap.unshift(cur);
                for (cur = b; cur = cur.parentNode; ) bp.unshift(cur);
                for (;ap[i] === bp[i]; ) i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            }, doc) : document;
        }, Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        }, Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), 
            support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret;
            } catch (e) {}
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        }, Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context), 
            contains(context, elem);
        }, Sizzle.attr = function(elem, name) {
            (elem.ownerDocument || elem) !== document && setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
            return val === undefined ? support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null : val;
        }, Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        }, Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), 
            results.sort(sortOrder), hasDuplicate) {
                for (;elem = results[i++]; ) elem === results[i] && (j = duplicates.push(i));
                for (;j--; ) results.splice(duplicates[j], 1);
            }
            return results;
        }, getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
                } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
            } else for (;node = elem[i]; i++) ret += getText(node);
            return ret;
        }, Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape), match[3] = (match[4] || match[5] || "").replace(runescape, funescape), 
                    "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), 
                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), 
                    match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), 
                    match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[5] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] && match[4] !== undefined ? match[2] = match[4] : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), 
                    match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                        return !0;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test("string" == typeof elem.className && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0;
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3), forward = "last" !== type.slice(-4), ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                for (;dir; ) {
                                    for (node = elem; node = node[dir]; ) if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                    start = dir = "only" === type && !start && "nextSibling";
                                }
                                return !0;
                            }
                            if (start = [ forward ? parent.firstChild : parent.lastChild ], forward && useCache) {
                                for (outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], 
                                nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], 
                                node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); ) if (1 === node.nodeType && ++diff && node === elem) {
                                    outerCache[type] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1]; else for (;(node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [ dirruns, diff ]), 
                            node !== elem)); ) ;
                            return diff -= last, diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ], 
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; ) idx = indexOf.call(seed, matched[i]), 
                        seed[idx] = !(matches[idx] = matched[i]);
                    }) : function(elem) {
                        return fn(elem, 0, args);
                    }) : fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; ) (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem));
                    }) : function(elem, context, xml) {
                        return input[0] = elem, matcher(input, null, xml, results), !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), 
                    lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
                        var elemLang;
                        do if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), 
                        elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return !1;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: function(elem) {
                    return elem.disabled === !1;
                },
                disabled: function(elem) {
                    return elem.disabled === !0;
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeName > "@" || 3 === elem.nodeType || 4 === elem.nodeType) return !1;
                    return !0;
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name;
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || attr.toLowerCase() === elem.type);
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ 0 > argument ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; --i >= 0; ) matchIndexes.push(i);
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; ++i < length; ) matchIndexes.push(i);
                    return matchIndexes;
                })
            }
        }, Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: !0,
            reset: !0
        }) Expr.pseudos[i] = createButtonPseudo(i);
        setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters(), 
        compile = Sizzle.compile = function(selector, group) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                for (group || (group = tokenize(selector)), i = group.length; i--; ) cached = matcherFromTokens(group[i]), 
                cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
            }
            return cached;
        }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, 
        support.detectDuplicates = hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
            return 1 & div1.compareDocumentPosition(document.createElement("div"));
        }), assert(function(div) {
            return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href");
        }) || addHandle("type|href|height|width", function(elem, name, isXML) {
            return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2);
        }), support.attributes && assert(function(div) {
            return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value");
        }) || addHandle("value", function(elem, name, isXML) {
            return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue;
        }), assert(function(div) {
            return null == div.getAttribute("disabled");
        }) || addHandle(booleans, function(elem, name, isXML) {
            var val;
            return isXML ? void 0 : (val = elem.getAttributeNode(name)) && val.specified ? val.value : elem[name] === !0 ? name.toLowerCase() : null;
        }), jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, 
        jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, 
        jQuery.contains = Sizzle.contains;
    }(window);
    var optionsCache = {};
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, firingLength, firingIndex, firingStart, list = [], stack = !options.once && [], fire = function(data) {
            for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, 
            firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                memory = !1;
                break;
            }
            firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable());
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    !function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg);
                        });
                    }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, 
                    fire(memory));
                }
                return this;
            },
            remove: function() {
                return list && jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; ) list.splice(index, 1), 
                    firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--);
                }), this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length);
            },
            empty: function() {
                return list = [], firingLength = 0, this;
            },
            disable: function() {
                return list = stack = memory = undefined, this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                return stack = undefined, memory || self.disable(), this;
            },
            locked: function() {
                return !stack;
            },
            fireWith: function(context, args) {
                return !list || fired && !stack || (args = args || [], args = [ context, args.slice ? args.slice() : args ], 
                firing ? stack.push(args) : fire(args)), this;
            },
            fire: function() {
                return self.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    }, jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var action = tuple[0], fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                            });
                        }), fns = null;
                    }).promise();
                },
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add, stateString && list.add(function() {
                    state = stateString;
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), 
                    this;
                }, deferred[tuple[0] + "With"] = list.fireWith;
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
        },
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = core_slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this, values[i] = arguments.length > 1 ? core_slice.call(arguments) : value, 
                    values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values);
                };
            };
            if (length > 1) for (progressValues = new Array(length), progressContexts = new Array(length), 
            resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
        }
    }), jQuery.support = function(support) {
        var all, a, input, select, fragment, opt, eventName, isSupported, i, div = document.createElement("div");
        if (div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        all = div.getElementsByTagName("*") || [], a = div.getElementsByTagName("a")[0], 
        !a || !a.style || !all.length) return support;
        select = document.createElement("select"), opt = select.appendChild(document.createElement("option")), 
        input = div.getElementsByTagName("input")[0], a.style.cssText = "top:1px;float:left;opacity:.5", 
        support.getSetAttribute = "t" !== div.className, support.leadingWhitespace = 3 === div.firstChild.nodeType, 
        support.tbody = !div.getElementsByTagName("tbody").length, support.htmlSerialize = !!div.getElementsByTagName("link").length, 
        support.style = /top/.test(a.getAttribute("style")), support.hrefNormalized = "/a" === a.getAttribute("href"), 
        support.opacity = /^0.5/.test(a.style.opacity), support.cssFloat = !!a.style.cssFloat, 
        support.checkOn = !!input.value, support.optSelected = opt.selected, support.enctype = !!document.createElement("form").enctype, 
        support.html5Clone = "<:nav></:nav>" !== document.createElement("nav").cloneNode(!0).outerHTML, 
        support.inlineBlockNeedsLayout = !1, support.shrinkWrapBlocks = !1, support.pixelPosition = !1, 
        support.deleteExpando = !0, support.noCloneEvent = !0, support.reliableMarginRight = !0, 
        support.boxSizingReliable = !0, input.checked = !0, support.noCloneChecked = input.cloneNode(!0).checked, 
        select.disabled = !0, support.optDisabled = !opt.disabled;
        try {
            delete div.test;
        } catch (e) {
            support.deleteExpando = !1;
        }
        input = document.createElement("input"), input.setAttribute("value", ""), support.input = "" === input.getAttribute("value"), 
        input.value = "t", input.setAttribute("type", "radio"), support.radioValue = "t" === input.value, 
        input.setAttribute("checked", "t"), input.setAttribute("name", "t"), fragment = document.createDocumentFragment(), 
        fragment.appendChild(input), support.appendChecked = input.checked, support.checkClone = fragment.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        div.attachEvent && (div.attachEvent("onclick", function() {
            support.noCloneEvent = !1;
        }), div.cloneNode(!0).click());
        for (i in {
            submit: !0,
            change: !0,
            focusin: !0
        }) div.setAttribute(eventName = "on" + i, "t"), support[i + "Bubbles"] = eventName in window || div.attributes[eventName].expando === !1;
        div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", 
        support.clearCloneStyle = "content-box" === div.style.backgroundClip;
        for (i in jQuery(support)) break;
        return support.ownLast = "0" !== i, jQuery(function() {
            var container, marginDiv, tds, divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", body = document.getElementsByTagName("body")[0];
            body && (container = document.createElement("div"), container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", 
            body.appendChild(container).appendChild(div), div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", 
            tds = div.getElementsByTagName("td"), tds[0].style.cssText = "padding:0;margin:0;border:0;display:none", 
            isSupported = 0 === tds[0].offsetHeight, tds[0].style.display = "", tds[1].style.display = "none", 
            support.reliableHiddenOffsets = isSupported && 0 === tds[0].offsetHeight, div.innerHTML = "", 
            div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", 
            jQuery.swap(body, null != body.style.zoom ? {
                zoom: 1
            } : {}, function() {
                support.boxSizing = 4 === div.offsetWidth;
            }), window.getComputedStyle && (support.pixelPosition = "1%" !== (window.getComputedStyle(div, null) || {}).top, 
            support.boxSizingReliable = "4px" === (window.getComputedStyle(div, null) || {
                width: "4px"
            }).width, marginDiv = div.appendChild(document.createElement("div")), marginDiv.style.cssText = div.style.cssText = divReset, 
            marginDiv.style.marginRight = marginDiv.style.width = "0", div.style.width = "1px", 
            support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight)), 
            typeof div.style.zoom !== core_strundefined && (div.innerHTML = "", div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1", 
            support.inlineBlockNeedsLayout = 3 === div.offsetWidth, div.style.display = "block", 
            div.innerHTML = "<div></div>", div.firstChild.style.width = "5px", support.shrinkWrapBlocks = 3 !== div.offsetWidth, 
            support.inlineBlockNeedsLayout && (body.style.zoom = 1)), body.removeChild(container), 
            container = div = tds = marginDiv = null);
        }), all = select = fragment = opt = a = input = null, support;
    }({});
    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        noData: {
            applet: !0,
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(elem) {
            return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando], 
            !!elem && !isEmptyDataObject(elem);
        },
        data: function(elem, name, data) {
            return internalData(elem, name, data);
        },
        removeData: function(elem, name) {
            return internalRemoveData(elem, name);
        },
        _data: function(elem, name, data) {
            return internalData(elem, name, data, !0);
        },
        _removeData: function(elem, name) {
            return internalRemoveData(elem, name, !0);
        },
        acceptData: function(elem) {
            if (elem.nodeType && 1 !== elem.nodeType && 9 !== elem.nodeType) return !1;
            var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
            return !noData || noData !== !0 && elem.getAttribute("classid") === noData;
        }
    }), jQuery.fn.extend({
        data: function(key, value) {
            var attrs, name, data = null, i = 0, elem = this[0];
            if (key === undefined) {
                if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
                    for (attrs = elem.attributes; i < attrs.length; i++) name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), 
                    dataAttr(elem, name, data[name]));
                    jQuery._data(elem, "parsedAttrs", !0);
                }
                return data;
            }
            return "object" == typeof key ? this.each(function() {
                jQuery.data(this, key);
            }) : arguments.length > 1 ? this.each(function() {
                jQuery.data(this, key, value);
            }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : null;
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key);
            });
        }
    }), jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            return elem ? (type = (type || "fx") + "queue", queue = jQuery._data(elem, type), 
            data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) : queue.push(data)), 
            queue || []) : void 0;
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), 
            delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery._removeData(elem, type + "queue"), jQuery._removeData(elem, key);
                })
            });
        }
    }), jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type);
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        delay: function(time, type) {
            return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", 
            this.queue(type, function(next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function() {
                    clearTimeout(timeout);
                };
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [ elements ]);
            };
            for ("string" != typeof type && (obj = type, type = undefined), type = type || "fx"; i--; ) tmp = jQuery._data(elements[i], type + "queueHooks"), 
            tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(), defer.promise(obj);
        }
    });
    var nodeHook, boolHook, rclass = /[\t\r\n\f]/g, rreturn = /\r/g, rfocusable = /^(?:input|select|textarea|button|object)$/i, rclickable = /^(?:a|area)$/i, ruseDefault = /^(?:checked|selected)$/i, getSetAttribute = jQuery.support.getSetAttribute, getSetInput = jQuery.support.input;
    jQuery.fn.extend({
        attr: function(name, value) {
            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        },
        prop: function(name, value) {
            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return name = jQuery.propFix[name] || name, this.each(function() {
                try {
                    this[name] = undefined, delete this[name];
                } catch (e) {}
            });
        },
        addClass: function(value) {
            var classes, elem, cur, clazz, j, i = 0, len = this.length, proceed = "string" == typeof value && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(core_rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                for (j = 0; clazz = classes[j++]; ) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                elem.className = jQuery.trim(cur);
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, i = 0, len = this.length, proceed = 0 === arguments.length || "string" == typeof value && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(core_rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                for (j = 0; clazz = classes[j++]; ) for (;cur.indexOf(" " + clazz + " ") >= 0; ) cur = cur.replace(" " + clazz + " ", " ");
                elem.className = value ? jQuery.trim(cur) : "";
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : jQuery.isFunction(value) ? this.each(function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
            }) : this.each(function() {
                if ("string" === type) for (var className, i = 0, self = jQuery(this), classNames = value.match(core_rnotwhite) || []; className = classNames[i++]; ) self.hasClass(className) ? self.removeClass(className) : self.addClass(className); else (type === core_strundefined || "boolean" === type) && (this.className && jQuery._data(this, "__className__", this.className), 
                this.className = this.className || value === !1 ? "" : jQuery._data(this, "__className__") || "");
            });
        },
        hasClass: function(selector) {
            for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
            return !1;
        },
        val: function(value) {
            var ret, hooks, isFunction, elem = this[0];
            {
                if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                    var val;
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, 
                    null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                        return null == value ? "" : value + "";
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], 
                    hooks && "set" in hooks && hooks.set(this, val, "value") !== undefined || (this.value = val));
                });
                if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], 
                hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined ? ret : (ret = elem.value, 
                "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
            }
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null != val ? val : elem.text;
                }
            },
            select: {
                get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++) if (option = options[i], 
                    (option.selected || i === index) && (jQuery.support.optDisabled ? !option.disabled : null === option.getAttribute("disabled")) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                        if (value = jQuery(option).val(), one) return value;
                        values.push(value);
                    }
                    return values;
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--; ) option = options[i], 
                    (option.selected = jQuery.inArray(jQuery(option).val(), values) >= 0) && (optionSet = !0);
                    return optionSet || (elem.selectedIndex = -1), values;
                }
            }
        },
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === core_strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), 
            hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), 
            value === undefined ? hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), 
            null == ret ? undefined : ret) : null !== value ? hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem.setAttribute(name, value + ""), 
            value) : void jQuery.removeAttr(elem, name));
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(core_rnotwhite);
            if (attrNames && 1 === elem.nodeType) for (;name = attrNames[i++]; ) propName = jQuery.propFix[name] || name, 
            jQuery.expr.match.bool.test(name) ? getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem[propName] = !1 : elem[jQuery.camelCase("default-" + name)] = elem[propName] = !1 : jQuery.attr(elem, name, ""), 
            elem.removeAttribute(getSetAttribute ? name : propName);
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!jQuery.support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value;
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), 
            notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), 
            value !== undefined ? hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
                }
            }
        }
    }), boolHook = {
        set: function(elem, value, name) {
            return value === !1 ? jQuery.removeAttr(elem, name) : getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name) : elem[jQuery.camelCase("default-" + name)] = elem[name] = !0, 
            name;
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = jQuery.expr.attrHandle[name] || jQuery.find.attr;
        jQuery.expr.attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ? function(elem, name, isXML) {
            var fn = jQuery.expr.attrHandle[name], ret = isXML ? undefined : (jQuery.expr.attrHandle[name] = undefined) != getter(elem, name, isXML) ? name.toLowerCase() : null;
            return jQuery.expr.attrHandle[name] = fn, ret;
        } : function(elem, name, isXML) {
            return isXML ? undefined : elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null;
        };
    }), getSetInput && getSetAttribute || (jQuery.attrHooks.value = {
        set: function(elem, value, name) {
            return jQuery.nodeName(elem, "input") ? void (elem.defaultValue = value) : nodeHook && nodeHook.set(elem, value, name);
        }
    }), getSetAttribute || (nodeHook = {
        set: function(elem, value, name) {
            var ret = elem.getAttributeNode(name);
            return ret || elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name)), 
            ret.value = value += "", "value" === name || value === elem.getAttribute(name) ? value : undefined;
        }
    }, jQuery.expr.attrHandle.id = jQuery.expr.attrHandle.name = jQuery.expr.attrHandle.coords = function(elem, name, isXML) {
        var ret;
        return isXML ? undefined : (ret = elem.getAttributeNode(name)) && "" !== ret.value ? ret.value : null;
    }, jQuery.valHooks.button = {
        get: function(elem, name) {
            var ret = elem.getAttributeNode(name);
            return ret && ret.specified ? ret.value : undefined;
        },
        set: nodeHook.set
    }, jQuery.attrHooks.contenteditable = {
        set: function(elem, value, name) {
            nodeHook.set(elem, "" === value ? !1 : value, name);
        }
    }, jQuery.each([ "width", "height" ], function(i, name) {
        jQuery.attrHooks[name] = {
            set: function(elem, value) {
                return "" === value ? (elem.setAttribute(name, "auto"), value) : void 0;
            }
        };
    })), jQuery.support.hrefNormalized || jQuery.each([ "href", "src" ], function(i, name) {
        jQuery.propHooks[name] = {
            get: function(elem) {
                return elem.getAttribute(name, 4);
            }
        };
    }), jQuery.support.style || (jQuery.attrHooks.style = {
        get: function(elem) {
            return elem.style.cssText || undefined;
        },
        set: function(elem, value) {
            return elem.style.cssText = value + "";
        }
    }), jQuery.support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex), 
            null;
        }
    }), jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    }), jQuery.support.enctype || (jQuery.propFix.enctype = "encoding"), jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0;
            }
        }, jQuery.support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null === elem.getAttribute("value") ? "on" : elem.value;
        });
    });
    var rformElems = /^(?:input|select|textarea)$/i, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
            if (elemData) {
                for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), 
                handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), 
                (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                    return typeof jQuery === core_strundefined || e && jQuery.event.triggered === e.type ? undefined : jQuery.event.dispatch.apply(eventHandle.elem, arguments);
                }, eventHandle.elem = elem), types = (types || "").match(core_rnotwhite) || [ "" ], 
                t = types.length; t--; ) tmp = rtypenamespace.exec(types[t]) || [], type = origType = tmp[1], 
                namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, 
                type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, 
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, 
                special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || (elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent && elem.attachEvent("on" + type, eventHandle))), 
                special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), 
                selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), 
                jQuery.event.global[type] = !0);
                elem = null;
            }
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(core_rnotwhite) || [ "" ], t = types.length; t--; ) if (tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                    for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, 
                    handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    origCount = j = handlers.length; j--; ) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), 
                    handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                    origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), 
                    delete events[type]);
                } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle, jQuery._removeData(elem, "events"));
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [ elem || document ], type = core_hasOwn.call(event, "type") ? event.type : event, namespaces = core_hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), 
            type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, 
            event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), 
            event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), 
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            event.result = undefined, event.target || (event.target = elem), data = null == data ? [ event ] : jQuery.makeArray(data, [ event ]), 
            special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), 
                    tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); ) event.type = i > 1 ? bubbleType : special.bindType || type, 
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle"), 
                handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === !1 && event.preventDefault();
                if (event.type = type, !onlyHandlers && !event.isDefaultPrevented() && (!special._default || special._default.apply(eventPath.pop(), data) === !1) && jQuery.acceptData(elem) && ontype && elem[type] && !jQuery.isWindow(elem)) {
                    tmp = elem[ontype], tmp && (elem[ontype] = null), jQuery.event.triggered = type;
                    try {
                        elem[type]();
                    } catch (e) {}
                    jQuery.event.triggered = undefined, tmp && (elem[ontype] = tmp);
                }
                return event.result;
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, ret, handleObj, matched, j, handlerQueue = [], args = core_slice.call(arguments), handlers = (jQuery._data(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); ) for (event.currentTarget = matched.elem, 
                j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); ) (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj, 
                event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), 
                ret !== undefined && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event), event.result;
            }
        },
        handlers: function(event, handlers) {
            var sel, handleObj, matches, i, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type)) for (;cur != this; cur = cur.parentNode || this) if (1 === cur.nodeType && (cur.disabled !== !0 || "click" !== event.type)) {
                for (matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], sel = handleObj.selector + " ", 
                matches[sel] === undefined && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length), 
                matches[sel] && matches.push(handleObj);
                matches.length && handlerQueue.push({
                    elem: cur,
                    handlers: matches
                });
            }
            return delegateCount < handlers.length && handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            }), handlerQueue;
        },
        fix: function(event) {
            if (event[jQuery.expando]) return event;
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), 
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), 
            i = copy.length; i--; ) prop = copy[i], event[prop] = originalEvent[prop];
            return event.target || (event.target = originalEvent.srcElement || document), 3 === event.target.nodeType && (event.target = event.target.parentNode), 
            event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), 
                event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var body, eventDoc, doc, button = original.button, fromElement = original.fromElement;
                return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, 
                doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), 
                event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), 
                !event.relatedTarget && fromElement && (event.relatedTarget = fromElement === event.target ? original.toElement : fromElement), 
                event.which || button === undefined || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), 
                event;
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) try {
                        return this.focus(), !1;
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === safeActiveElement() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return jQuery.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    event.result !== undefined && (event.originalEvent.returnValue = event.result);
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: !0,
                originalEvent: {}
            });
            bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), 
            e.isDefaultPrevented() && event.preventDefault();
        }
    }, jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1);
    } : function(elem, type, handle) {
        var name = "on" + type;
        elem.detachEvent && (typeof elem[name] === core_strundefined && (elem[name] = null), 
        elem.detachEvent(name, handle));
    }, jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, 
        this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || src.returnValue === !1 || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse) : this.type = src, 
        props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), 
        void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props);
    }, jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && (e.stopPropagation && e.stopPropagation(), 
            e.cancelBubble = !0);
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue, this.stopPropagation();
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, 
                ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
            }
        };
    }), jQuery.support.submitBubbles || (jQuery.event.special.submit = {
        setup: function() {
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                var elem = e.target, form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                form && !jQuery._data(form, "submitBubbles") && (jQuery.event.add(form, "submit._submit", function(event) {
                    event._submit_bubble = !0;
                }), jQuery._data(form, "submitBubbles", !0));
            });
        },
        postDispatch: function(event) {
            event._submit_bubble && (delete event._submit_bubble, this.parentNode && !event.isTrigger && jQuery.event.simulate("submit", this.parentNode, event, !0));
        },
        teardown: function() {
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.remove(this, "._submit");
        }
    }), jQuery.support.changeBubbles || (jQuery.event.special.change = {
        setup: function() {
            return rformElems.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (jQuery.event.add(this, "propertychange._change", function(event) {
                "checked" === event.originalEvent.propertyName && (this._just_changed = !0);
            }), jQuery.event.add(this, "click._change", function(event) {
                this._just_changed && !event.isTrigger && (this._just_changed = !1), jQuery.event.simulate("change", this, event, !0);
            })), !1) : void jQuery.event.add(this, "beforeactivate._change", function(e) {
                var elem = e.target;
                rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles") && (jQuery.event.add(elem, "change._change", function(event) {
                    !this.parentNode || event.isSimulated || event.isTrigger || jQuery.event.simulate("change", this.parentNode, event, !0);
                }), jQuery._data(elem, "changeBubbles", !0));
            });
        },
        handle: function(event) {
            var elem = event.target;
            return this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type ? event.handleObj.handler.apply(this, arguments) : void 0;
        },
        teardown: function() {
            return jQuery.event.remove(this, "._change"), !rformElems.test(this.nodeName);
        }
    }), jQuery.support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var attaches = 0, handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0);
        };
        jQuery.event.special[fix] = {
            setup: function() {
                0 === attaches++ && document.addEventListener(orig, handler, !0);
            },
            teardown: function() {
                0 === --attaches && document.removeEventListener(orig, handler, !0);
            }
        };
    }), jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var type, origFn;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector, selector = undefined);
                for (type in types) this.on(type, selector, data, types[type], one);
                return this;
            }
            if (null == data && null == fn ? (fn = selector, data = selector = undefined) : null == fn && ("string" == typeof selector ? (fn = data, 
            data = undefined) : (fn = data, data = selector, selector = undefined)), fn === !1) fn = returnFalse; else if (!fn) return this;
            return 1 === one && (origFn = fn, fn = function(event) {
                return jQuery().off(event), origFn.apply(this, arguments);
            }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, 
            jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), 
            this;
            if ("object" == typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this;
            }
            return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = undefined), 
            fn === !1 && (fn = returnFalse), this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0;
        }
    });
    var isSimple = /^.[^:#\[\.,]*$/, rparentsprev = /^(?:parents|prev(?:Until|All))/, rneedsContext = jQuery.expr.match.needsContext, guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.fn.extend({
        find: function(selector) {
            var i, ret = [], self = this, len = self.length;
            if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(self[i], this)) return !0;
            }));
            for (i = 0; len > i; i++) jQuery.find(selector, self[i], ret);
            return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, 
            ret;
        },
        has: function(target) {
            var i, targets = jQuery(target, this), len = targets.length;
            return this.filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(this, targets[i])) return !0;
            });
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0));
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1));
        },
        is: function(selector) {
            return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length;
        },
        closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, ret = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                cur = ret.push(cur);
                break;
            }
            return this.pushStack(ret.length > 1 ? jQuery.unique(ret) : ret);
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(selector, context) {
            var set = "string" == typeof selector ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [ selector ] : selector), all = jQuery.merge(this.get(), set);
            return this.pushStack(jQuery.unique(all));
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        }
    }), jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (ret = jQuery.filter(selector, ret)), 
            this.length > 1 && (guaranteedUnique[name] || (ret = jQuery.unique(ret)), rparentsprev.test(name) && (ret = ret.reverse())), 
            this.pushStack(ret);
        };
    }), jQuery.extend({
        filter: function(expr, elems, not) {
            var elem = elems[0];
            return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
                return 1 === elem.nodeType;
            }));
        },
        dir: function(elem, dir, until) {
            for (var matched = [], cur = elem[dir]; cur && 9 !== cur.nodeType && (until === undefined || 1 !== cur.nodeType || !jQuery(cur).is(until)); ) 1 === cur.nodeType && matched.push(cur), 
            cur = cur[dir];
            return matched;
        },
        sibling: function(n, elem) {
            for (var r = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && r.push(n);
            return r;
        }
    });
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"), rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, manipulation_rcheckableType = /^(?:checkbox|radio)$/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    }, safeFragment = createSafeFragment(document), fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
    wrapMap.th = wrapMap.td, jQuery.fn.extend({
        text: function(value) {
            return jQuery.access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling);
            });
        },
        remove: function(selector, keepData) {
            for (var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null != (elem = elems[i]); i++) keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)), 
            elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), 
            elem.parentNode.removeChild(elem));
            return this;
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++) {
                for (1 === elem.nodeType && jQuery.cleanData(getAll(elem, !1)); elem.firstChild; ) elem.removeChild(elem.firstChild);
                elem.options && jQuery.nodeName(elem, "select") && (elem.options.length = 0);
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, 
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return jQuery.access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (value === undefined) return 1 === elem.nodeType ? elem.innerHTML.replace(rinlinejQuery, "") : undefined;
                if ("string" == typeof value && !rnoInnerhtml.test(value) && (jQuery.support.htmlSerialize || !rnoshimcache.test(value)) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (;l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
                        elem.innerHTML = value);
                        elem = 0;
                    } catch (e) {}
                }
                elem && this.empty().append(value);
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var args = jQuery.map(this, function(elem) {
                return [ elem.nextSibling, elem.parentNode ];
            }), i = 0;
            return this.domManip(arguments, function(elem) {
                var next = args[i++], parent = args[i++];
                parent && (next && next.parentNode !== parent && (next = this.nextSibling), jQuery(this).remove(), 
                parent.insertBefore(elem, next));
            }, !0), i ? this : this.remove();
        },
        detach: function(selector) {
            return this.remove(selector, !0);
        },
        domManip: function(args, callback, allowIntersection) {
            args = core_concat.apply([], args);
            var first, node, hasScripts, scripts, doc, fragment, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || !(1 >= l || "string" != typeof value || jQuery.support.checkClone) && rchecked.test(value)) return this.each(function(index) {
                var self = set.eq(index);
                isFunction && (args[0] = value.call(this, index, self.html())), self.domManip(args, callback, allowIntersection);
            });
            if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, !allowIntersection && this), 
            first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), 
            first)) {
                for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; l > i; i++) node = fragment, 
                i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), 
                callback.call(this[i], node, i);
                if (hasScripts) for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), 
                i = 0; hasScripts > i; i++) node = scripts[i], rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl(node.src) : jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, "")));
                fragment = first = null;
            }
            return this;
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, i = 0, ret = [], insert = jQuery(selector), last = insert.length - 1; last >= i; i++) elems = i === last ? this : this.clone(!0), 
            jQuery(insert[i])[original](elems), core_push.apply(ret, elems.get());
            return this.pushStack(ret);
        };
    }), jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
            if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(!0) : (fragmentDiv.innerHTML = elem.outerHTML, 
            fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(jQuery.support.noCloneEvent && jQuery.support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (destElements = getAll(clone), 
            srcElements = getAll(elem), i = 0; null != (node = srcElements[i]); ++i) destElements[i] && fixCloneNodeIssues(node, destElements[i]);
            if (dataAndEvents) if (deepDataAndEvents) for (srcElements = srcElements || getAll(elem), 
            destElements = destElements || getAll(clone), i = 0; null != (node = srcElements[i]); i++) cloneCopyEvent(node, destElements[i]); else cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), 
            destElements = srcElements = node = null, clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            for (var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length, safe = createSafeFragment(context), nodes = [], i = 0; l > i; i++) if (elem = elems[i], 
            elem || 0 === elem) if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem); else if (rhtml.test(elem)) {
                for (tmp = tmp || safe.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase(), 
                wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], 
                j = wrap[0]; j--; ) tmp = tmp.lastChild;
                if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem) && nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0])), 
                !jQuery.support.tbody) for (elem = "table" !== tag || rtbody.test(elem) ? "<table>" !== wrap[1] || rtbody.test(elem) ? 0 : tmp : tmp.firstChild, 
                j = elem && elem.childNodes.length; j--; ) jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length && elem.removeChild(tbody);
                for (jQuery.merge(nodes, tmp.childNodes), tmp.textContent = ""; tmp.firstChild; ) tmp.removeChild(tmp.firstChild);
                tmp = safe.lastChild;
            } else nodes.push(context.createTextNode(elem));
            for (tmp && safe.removeChild(tmp), jQuery.support.appendChecked || jQuery.grep(getAll(nodes, "input"), fixDefaultChecked), 
            i = 0; elem = nodes[i++]; ) if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), 
            tmp = getAll(safe.appendChild(elem), "script"), contains && setGlobalEval(tmp), 
            scripts)) for (j = 0; elem = tmp[j++]; ) rscriptType.test(elem.type || "") && scripts.push(elem);
            return tmp = null, safe;
        },
        cleanData: function(elems, acceptData) {
            for (var elem, type, id, data, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = jQuery.support.deleteExpando, special = jQuery.event.special; null != (elem = elems[i]); i++) if ((acceptData || jQuery.acceptData(elem)) && (id = elem[internalKey], 
            data = id && cache[id])) {
                if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                cache[id] && (delete cache[id], deleteExpando ? delete elem[internalKey] : typeof elem.removeAttribute !== core_strundefined ? elem.removeAttribute(internalKey) : elem[internalKey] = null, 
                core_deletedIds.push(id));
            }
        },
        _evalUrl: function(url) {
            return jQuery.ajax({
                url: url,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            });
        }
    }), jQuery.fn.extend({
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) return this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i));
            });
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                    for (var elem = this; elem.firstChild && 1 === elem.firstChild.nodeType; ) elem = elem.firstChild;
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            return jQuery.isFunction(html) ? this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i));
            }) : this.each(function() {
                var self = jQuery(this), contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html);
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes);
            }).end();
        }
    });
    var iframe, getStyles, curCSS, ralpha = /alpha\([^)]*\)/i, ropacity = /opacity\s*=\s*([^)]*)/, rposition = /^(top|right|bottom|left)$/, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/, rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"), rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"), rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"), elemdisplay = {
        BODY: "block"
    }, cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: 0,
        fontWeight: 400
    }, cssExpand = [ "Top", "Right", "Bottom", "Left" ], cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
    jQuery.fn.extend({
        css: function(name, value) {
            return jQuery.access(this, function(elem, name, value) {
                var len, styles, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map;
                }
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, !0);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide();
            });
        }
    }), jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), 
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], value === undefined) return hooks && "get" in hooks && (ret = hooks.get(elem, !1, extra)) !== undefined ? ret : style[name];
                if (type = typeof value, "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), 
                type = "number"), !(null == value || "number" === type && isNaN(value) || ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), 
                jQuery.support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), 
                hooks && "set" in hooks && (value = hooks.set(elem, value, extra)) === undefined))) try {
                    style[name] = value;
                } catch (e) {}
            }
        },
        css: function(elem, name, extra, styles) {
            var num, val, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), 
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), 
            val === undefined && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), 
            "" === extra || extra ? (num = parseFloat(val), extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val;
        }
    }), window.getComputedStyle ? (getStyles = function(elem) {
        return window.getComputedStyle(elem, null);
    }, curCSS = function(elem, name, _computed) {
        var width, minWidth, maxWidth, computed = _computed || getStyles(elem), ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined, style = elem.style;
        return computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), 
        rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, 
        maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, 
        ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), 
        ret;
    }) : document.documentElement.currentStyle && (getStyles = function(elem) {
        return elem.currentStyle;
    }, curCSS = function(elem, name, _computed) {
        var left, rs, rsLeft, computed = _computed || getStyles(elem), ret = computed ? computed[name] : undefined, style = elem.style;
        return null == ret && style && style[name] && (ret = style[name]), rnumnonpx.test(ret) && !rposition.test(name) && (left = style.left, 
        rs = elem.runtimeStyle, rsLeft = rs && rs.left, rsLeft && (rs.left = elem.currentStyle.left), 
        style.left = "fontSize" === name ? "1em" : ret, ret = style.pixelLeft + "px", style.left = left, 
        rsLeft && (rs.left = rsLeft)), "" === ret ? "auto" : ret;
    }), jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                return computed ? 0 === elem.offsetWidth && rdisplayswap.test(jQuery.css(elem, "display")) ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra);
                }) : getWidthOrHeight(elem, name, extra) : void 0;
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0);
            }
        };
    }), jQuery.support.opacity || (jQuery.cssHooks.opacity = {
        get: function(elem, computed) {
            return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : computed ? "1" : "";
        },
        set: function(elem, value) {
            var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" : "", filter = currentStyle && currentStyle.filter || style.filter || "";
            style.zoom = 1, (value >= 1 || "" === value) && "" === jQuery.trim(filter.replace(ralpha, "")) && style.removeAttribute && (style.removeAttribute("filter"), 
            "" === value || currentStyle && !currentStyle.filter) || (style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity);
        }
    }), jQuery(function() {
        jQuery.support.reliableMarginRight || (jQuery.cssHooks.marginRight = {
            get: function(elem, computed) {
                return computed ? jQuery.swap(elem, {
                    display: "inline-block"
                }, curCSS, [ elem, "marginRight" ]) : void 0;
            }
        }), !jQuery.support.pixelPosition && jQuery.fn.position && jQuery.each([ "top", "left" ], function(i, prop) {
            jQuery.cssHooks[prop] = {
                get: function(elem, computed) {
                    return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : void 0;
                }
            };
        });
    }), jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || !jQuery.support.reliableHiddenOffsets && "none" === (elem.style && elem.style.display || jQuery.css(elem, "display"));
    }, jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [ value ]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded;
            }
        }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
    });
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !manipulation_rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    }), jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (traditional === undefined && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), 
        jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
            add(this.name, this.value);
        }); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+");
    }, jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    }), jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    var ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(), ajax_rquery = /\?/, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, _load = jQuery.fn.load, prefilters = {}, transports = {}, allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load) return _load.apply(this, arguments);
        var selector, response, type, self = this, off = url.indexOf(" ");
        return off >= 0 && (selector = url.slice(off, url.length), url = url.slice(0, off)), 
        jQuery.isFunction(params) ? (callback = params, params = undefined) : params && "object" == typeof params && (type = "POST"), 
        self.length > 0 && jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
        }).complete(callback && function(jqXHR, status) {
            self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
        }), this;
    }, jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    }), jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = undefined, 
                responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && 300 > status || 304 === status, 
                responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), 
                isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), 
                modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), 
                modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, 
                success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, 
                (status || !statusText) && (statusText = "error", 0 > status && (status = 0))), 
                jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", 
                isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) : deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]), 
                jqXHR.statusCode(statusCode), statusCode = undefined, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]), 
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]), 
                --jQuery.active || jQuery.event.trigger("ajaxStop")));
            }
            "object" == typeof url && (options = url, url = undefined), options = options || {};
            var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); ) responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return null == match ? null : match;
                },
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, 
                    requestHeaders[name] = value), this;
                },
                overrideMimeType: function(type) {
                    return state || (s.mimeType = type), this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) if (2 > state) for (code in map) statusCode[code] = [ statusCode[code], map[code] ]; else jqXHR.always(map[jqXHR.status]);
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText), done(0, finalText), this;
                }
            };
            if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, 
            jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), 
            s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(core_rnotwhite) || [ "" ], 
            null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))), 
            s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), 
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
            fireGlobals = s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), 
            s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, 
            s.hasContent || (s.data && (cacheURL = s.url += (ajax_rquery.test(cacheURL) ? "&" : "?") + s.data, 
            delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + ajax_nonce++) : cacheURL + (ajax_rquery.test(cacheURL) ? "&" : "?") + "_=" + ajax_nonce++)), 
            s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), 
            jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), 
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), 
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]), 
                s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout));
                try {
                    state = 1, transport.send(requestHeaders, done);
                } catch (e) {
                    if (!(2 > state)) throw e;
                    done(-1, e);
                }
            } else done(-1, "No Transport");
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    }), jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = undefined), 
            jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text), text;
            }
        }
    }), jQuery.ajaxPrefilter("script", function(s) {
        s.cache === undefined && (s.cache = !1), s.crossDomain && (s.type = "GET", s.global = !1);
    }), jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || jQuery("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script"), script.async = !0, s.scriptCharset && (script.charset = s.scriptCharset), 
                    script.src = s.url, script.onload = script.onreadystatechange = function(_, isAbort) {
                        (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) && (script.onload = script.onreadystatechange = null, 
                        script.parentNode && script.parentNode.removeChild(script), script = null, isAbort || callback(200, "success"));
                    }, head.insertBefore(script, head.firstChild);
                },
                abort: function() {
                    script && script.onload(undefined, !0);
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + ajax_nonce++;
            return this[callback] = !0, callback;
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, 
        jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (ajax_rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), 
        s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
        }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
            responseContainer = arguments;
        }, jqXHR.always(function() {
            window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, 
            oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), 
            responseContainer = overwritten = undefined;
        }), "script") : void 0;
    });
    var xhrCallbacks, xhrSupported, xhrId = 0, xhrOnUnloadAbort = window.ActiveXObject && function() {
        var key;
        for (key in xhrCallbacks) xhrCallbacks[key](undefined, !0);
    };
    jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
        return !this.isLocal && createStandardXHR() || createActiveXHR();
    } : createStandardXHR, xhrSupported = jQuery.ajaxSettings.xhr(), jQuery.support.cors = !!xhrSupported && "withCredentials" in xhrSupported, 
    xhrSupported = jQuery.support.ajax = !!xhrSupported, xhrSupported && jQuery.ajaxTransport(function(s) {
        if (!s.crossDomain || jQuery.support.cors) {
            var callback;
            return {
                send: function(headers, complete) {
                    var handle, i, xhr = s.xhr();
                    if (s.username ? xhr.open(s.type, s.url, s.async, s.username, s.password) : xhr.open(s.type, s.url, s.async), 
                    s.xhrFields) for (i in s.xhrFields) xhr[i] = s.xhrFields[i];
                    s.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(s.mimeType), s.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (i in headers) xhr.setRequestHeader(i, headers[i]);
                    } catch (err) {}
                    xhr.send(s.hasContent && s.data || null), callback = function(_, isAbort) {
                        var status, responseHeaders, statusText, responses;
                        try {
                            if (callback && (isAbort || 4 === xhr.readyState)) if (callback = undefined, handle && (xhr.onreadystatechange = jQuery.noop, 
                            xhrOnUnloadAbort && delete xhrCallbacks[handle]), isAbort) 4 !== xhr.readyState && xhr.abort(); else {
                                responses = {}, status = xhr.status, responseHeaders = xhr.getAllResponseHeaders(), 
                                "string" == typeof xhr.responseText && (responses.text = xhr.responseText);
                                try {
                                    statusText = xhr.statusText;
                                } catch (e) {
                                    statusText = "";
                                }
                                status || !s.isLocal || s.crossDomain ? 1223 === status && (status = 204) : status = responses.text ? 200 : 404;
                            }
                        } catch (firefoxAccessException) {
                            isAbort || complete(-1, firefoxAccessException);
                        }
                        responses && complete(status, statusText, responses, responseHeaders);
                    }, s.async ? 4 === xhr.readyState ? setTimeout(callback) : (handle = ++xhrId, xhrOnUnloadAbort && (xhrCallbacks || (xhrCallbacks = {}, 
                    jQuery(window).unload(xhrOnUnloadAbort)), xhrCallbacks[handle] = callback), xhr.onreadystatechange = callback) : callback();
                },
                abort: function() {
                    callback && callback(undefined, !0);
                }
            };
        }
    });
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
        "*": [ function(prop, value) {
            var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
            if (start && start[3] !== unit) {
                unit = unit || start[3], parts = parts || [], start = +target || 1;
                do scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit); while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations);
            }
            return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, 
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween;
        } ]
    };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props, props = [ "*" ]) : props = props.split(" ");
            for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], 
            tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback);
        },
        prefilter: function(callback, prepend) {
            prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback);
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, 
            this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, 
            this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), 
                result && "auto" !== result ? result : 0) : tween.elem[tween.prop];
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now;
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
        }
    }, jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
        };
    }), jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                (empty || jQuery._data(this, "finish")) && anim.stop(!0);
            };
            return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd);
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = undefined), 
            clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = jQuery._data(this);
                if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), 
                dequeue = !1, timers.splice(index, 1));
                (dequeue || !gotoEnd) && jQuery.dequeue(this, type);
            });
        },
        finish: function(type) {
            return type !== !1 && (type = type || "fx"), this.each(function() {
                var index, data = jQuery._data(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), 
                index = timers.length; index--; ) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), 
                timers.splice(index, 1));
                for (index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish;
            });
        }
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    }), jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, 
        (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, 
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
        }, opt;
    }, jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        }
    }, jQuery.timers = [], jQuery.fx = Tween.prototype.init, jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers, i = 0;
        for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(), fxNow = undefined;
    }, jQuery.fx.timer = function(timer) {
        timer() && jQuery.timers.push(timer) && jQuery.fx.start();
    }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval));
    }, jQuery.fx.stop = function() {
        clearInterval(timerId), timerId = null;
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fx.step = {}, jQuery.expr && jQuery.expr.filters && (jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    }), jQuery.fn.offset = function(options) {
        if (arguments.length) return options === undefined ? this : this.each(function(i) {
            jQuery.offset.setOffset(this, options, i);
        });
        var docElem, win, box = {
            top: 0,
            left: 0
        }, elem = this[0], doc = elem && elem.ownerDocument;
        if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== core_strundefined && (box = elem.getBoundingClientRect()), 
        win = getWindow(doc), {
            top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
            left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
        }) : box;
    }, jQuery.offset = {
        setOffset: function(elem, options, i) {
            var position = jQuery.css(elem, "position");
            "static" === position && (elem.style.position = "relative");
            var curTop, curLeft, curElem = jQuery(elem), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [ curCSSTop, curCSSLeft ]) > -1, props = {}, curPosition = {};
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, 
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), 
            jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), 
            null != options.left && (props.left = options.left - curOffset.left + curLeft), 
            "using" in options ? options.using.call(elem, props) : curElem.css(props);
        }
    }, jQuery.fn.extend({
        position: function() {
            if (this[0]) {
                var offsetParent, offset, parentOffset = {
                    top: 0,
                    left: 0
                }, elem = this[0];
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), 
                offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), 
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), 
                {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.offsetParent;
                return offsetParent || docElem;
            });
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return jQuery.access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return val === undefined ? win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method] : void (win ? win.scrollTo(top ? jQuery(win).scrollLeft() : val, top ? val : jQuery(win).scrollTop()) : elem[method] = val);
            }, method, val, arguments.length, null);
        };
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return jQuery.access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, 
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            };
        });
    }), jQuery.fn.size = function() {
        return this.length;
    }, jQuery.fn.andSelf = jQuery.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = jQuery : (window.jQuery = window.$ = jQuery, 
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery;
    }));
}(window), function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery" ], factory) : factory(jQuery);
}(function($) {
    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img, nodeName = element.nodeName.toLowerCase();
        return "area" === nodeName ? (map = element.parentNode, mapName = map.name, element.href && mapName && "map" === map.nodeName.toLowerCase() ? (img = $("img[usemap=#" + mapName + "]")[0], 
        !!img && visible(img)) : !1) : (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element);
    }
    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function() {
            return "hidden" === $.css(this, "visibility");
        }).length;
    }
    function datepicker_getZindex(elem) {
        for (var position, value; elem.length && elem[0] !== document; ) {
            if (position = elem.css("position"), ("absolute" === position || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10), 
            !isNaN(value) && 0 !== value)) return value;
            elem = elem.parent();
        }
        return 0;
    }
    function Datepicker() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, 
        this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", 
        this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", 
        this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", 
        this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", 
        this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
            dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
            dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, $.extend(this._defaults, this.regional[""]), this.regional.en = $.extend(!0, {}, this.regional[""]), 
        this.regional["en-US"] = $.extend(!0, {}, this.regional.en), this.dpDiv = datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
    }
    function datepicker_bindHover(dpDiv) {
        var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return dpDiv.delegate(selector, "mouseout", function() {
            $(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && $(this).removeClass("ui-datepicker-prev-hover"), 
            -1 !== this.className.indexOf("ui-datepicker-next") && $(this).removeClass("ui-datepicker-next-hover");
        }).delegate(selector, "mouseover", function() {
            $.datepicker._isDisabledDatepicker(datepicker_instActive.inline ? dpDiv.parent()[0] : datepicker_instActive.input[0]) || ($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), 
            $(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && $(this).addClass("ui-datepicker-prev-hover"), 
            -1 !== this.className.indexOf("ui-datepicker-next") && $(this).addClass("ui-datepicker-next-hover"));
        });
    }
    function datepicker_extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) null == props[name] && (target[name] = props[name]);
        return target;
    }
    $.ui = $.ui || {}, $.extend($.ui, {
        version: "1.11.0",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), $.fn.extend({
        scrollParent: function() {
            var position = this.css("position"), excludeStaticParent = "absolute" === position, scrollParent = this.parents().filter(function() {
                var parent = $(this);
                return excludeStaticParent && "static" === parent.css("position") ? !1 : /(auto|scroll)/.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"));
            }).eq(0);
            return "fixed" !== position && scrollParent.length ? scrollParent : $(this[0].ownerDocument || document);
        },
        uniqueId: function() {
            var uuid = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++uuid);
                });
            };
        }(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && $(this).removeAttr("id");
            });
        }
    }), $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
            return function(elem) {
                return !!$.data(elem, dataName);
            };
        }) : function(elem, i, match) {
            return !!$.data(elem, match[3]);
        },
        focusable: function(element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")));
        },
        tabbable: function(element) {
            var tabIndex = $.attr(element, "tabindex"), isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
        }
    }), $("<a>").outerWidth(1).jquery || $.each([ "Width", "Height" ], function(i, name) {
        function reduce(elem, size, border, margin) {
            return $.each(side, function() {
                size -= parseFloat($.css(elem, "padding" + this)) || 0, border && (size -= parseFloat($.css(elem, "border" + this + "Width")) || 0), 
                margin && (size -= parseFloat($.css(elem, "margin" + this)) || 0);
            }), size;
        }
        var side = "Width" === name ? [ "Left", "Right" ] : [ "Top", "Bottom" ], type = name.toLowerCase(), orig = {
            innerWidth: $.fn.innerWidth,
            innerHeight: $.fn.innerHeight,
            outerWidth: $.fn.outerWidth,
            outerHeight: $.fn.outerHeight
        };
        $.fn["inner" + name] = function(size) {
            return void 0 === size ? orig["inner" + name].call(this) : this.each(function() {
                $(this).css(type, reduce(this, size) + "px");
            });
        }, $.fn["outer" + name] = function(size, margin) {
            return "number" != typeof size ? orig["outer" + name].call(this, size) : this.each(function() {
                $(this).css(type, reduce(this, size, !0, margin) + "px");
            });
        };
    }), $.fn.addBack || ($.fn.addBack = function(selector) {
        return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
    }), $("<a>").data("a-b", "a").removeData("a-b").data("a-b") && ($.fn.removeData = function(removeData) {
        return function(key) {
            return arguments.length ? removeData.call(this, $.camelCase(key)) : removeData.call(this);
        };
    }($.fn.removeData)), $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), 
    $.fn.extend({
        focus: function(orig) {
            return function(delay, fn) {
                return "number" == typeof delay ? this.each(function() {
                    var elem = this;
                    setTimeout(function() {
                        $(elem).focus(), fn && fn.call(elem);
                    }, delay);
                }) : orig.apply(this, arguments);
            };
        }($.fn.focus),
        disableSelection: function() {
            var eventType = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.bind(eventType + ".ui-disableSelection", function(event) {
                    event.preventDefault();
                });
            };
        }(),
        enableSelection: function() {
            return this.unbind(".ui-disableSelection");
        },
        zIndex: function(zIndex) {
            if (void 0 !== zIndex) return this.css("zIndex", zIndex);
            if (this.length) for (var position, value, elem = $(this[0]); elem.length && elem[0] !== document; ) {
                if (position = elem.css("position"), ("absolute" === position || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10), 
                !isNaN(value) && 0 !== value)) return value;
                elem = elem.parent();
            }
            return 0;
        }
    }), $.ui.plugin = {
        add: function(module, option, set) {
            var i, proto = $.ui[module].prototype;
            for (i in set) proto.plugins[i] = proto.plugins[i] || [], proto.plugins[i].push([ option, set[i] ]);
        },
        call: function(instance, name, args, allowDisconnected) {
            var i, set = instance.plugins[name];
            if (set && (allowDisconnected || instance.element[0].parentNode && 11 !== instance.element[0].parentNode.nodeType)) for (i = 0; i < set.length; i++) instance.options[set[i][0]] && set[i][1].apply(instance.element, args);
        }
    }, $.extend($.ui, {
        datepicker: {
            version: "1.11.0"
        }
    });
    var datepicker_instActive;
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv;
        },
        setDefaults: function(settings) {
            return datepicker_extendRemove(this._defaults, settings || {}), this;
        },
        _attachDatepicker: function(target, settings) {
            var nodeName, inline, inst;
            nodeName = target.nodeName.toLowerCase(), inline = "div" === nodeName || "span" === nodeName, 
            target.id || (this.uuid += 1, target.id = "dp" + this.uuid), inst = this._newInst($(target), inline), 
            inst.settings = $.extend({}, settings || {}), "input" === nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst);
        },
        _newInst: function(target, inline) {
            var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: id,
                input: target,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: inline,
                dpDiv: inline ? datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            };
        },
        _connectDatepicker: function(target, inst) {
            var input = $(target);
            inst.append = $([]), inst.trigger = $([]), input.hasClass(this.markerClassName) || (this._attachments(input, inst), 
            input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), 
            this._autoSize(inst), $.data(target, "datepicker", inst), inst.settings.disabled && this._disableDatepicker(target));
        },
        _attachments: function(input, inst) {
            var showOn, buttonText, buttonImage, appendText = this._get(inst, "appendText"), isRTL = this._get(inst, "isRTL");
            inst.append && inst.append.remove(), appendText && (inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>"), 
            input[isRTL ? "before" : "after"](inst.append)), input.unbind("focus", this._showDatepicker), 
            inst.trigger && inst.trigger.remove(), showOn = this._get(inst, "showOn"), ("focus" === showOn || "both" === showOn) && input.focus(this._showDatepicker), 
            ("button" === showOn || "both" === showOn) && (buttonText = this._get(inst, "buttonText"), 
            buttonImage = this._get(inst, "buttonImage"), inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                src: buttonImage,
                alt: buttonText,
                title: buttonText
            }) : $("<button type='button'></button>").addClass(this._triggerClass).html(buttonImage ? $("<img/>").attr({
                src: buttonImage,
                alt: buttonText,
                title: buttonText
            }) : buttonText)), input[isRTL ? "before" : "after"](inst.trigger), inst.trigger.click(function() {
                return $.datepicker._datepickerShowing && $.datepicker._lastInput === input[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0] ? ($.datepicker._hideDatepicker(), 
                $.datepicker._showDatepicker(input[0])) : $.datepicker._showDatepicker(input[0]), 
                !1;
            }));
        },
        _autoSize: function(inst) {
            if (this._get(inst, "autoSize") && !inst.inline) {
                var findMax, max, maxI, i, date = new Date(2009, 11, 20), dateFormat = this._get(inst, "dateFormat");
                dateFormat.match(/[DM]/) && (findMax = function(names) {
                    for (max = 0, maxI = 0, i = 0; i < names.length; i++) names[i].length > max && (max = names[i].length, 
                    maxI = i);
                    return maxI;
                }, date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"))), 
                date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - date.getDay())), 
                inst.input.attr("size", this._formatDate(inst, date).length);
            }
        },
        _inlineDatepicker: function(target, inst) {
            var divSpan = $(target);
            divSpan.hasClass(this.markerClassName) || (divSpan.addClass(this.markerClassName).append(inst.dpDiv), 
            $.data(target, "datepicker", inst), this._setDate(inst, this._getDefaultDate(inst), !0), 
            this._updateDatepicker(inst), this._updateAlternate(inst), inst.settings.disabled && this._disableDatepicker(target), 
            inst.dpDiv.css("display", "block"));
        },
        _dialogDatepicker: function(input, date, onSelect, settings, pos) {
            var id, browserWidth, browserHeight, scrollX, scrollY, inst = this._dialogInst;
            return inst || (this.uuid += 1, id = "dp" + this.uuid, this._dialogInput = $("<input type='text' id='" + id + "' style='position: absolute; top: -100px; width: 0px;'/>"), 
            this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), 
            inst = this._dialogInst = this._newInst(this._dialogInput, !1), inst.settings = {}, 
            $.data(this._dialogInput[0], "datepicker", inst)), datepicker_extendRemove(inst.settings, settings || {}), 
            date = date && date.constructor === Date ? this._formatDate(inst, date) : date, 
            this._dialogInput.val(date), this._pos = pos ? pos.length ? pos : [ pos.pageX, pos.pageY ] : null, 
            this._pos || (browserWidth = document.documentElement.clientWidth, browserHeight = document.documentElement.clientHeight, 
            scrollX = document.documentElement.scrollLeft || document.body.scrollLeft, scrollY = document.documentElement.scrollTop || document.body.scrollTop, 
            this._pos = [ browserWidth / 2 - 100 + scrollX, browserHeight / 2 - 150 + scrollY ]), 
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), 
            inst.settings.onSelect = onSelect, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), 
            this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), 
            $.data(this._dialogInput[0], "datepicker", inst), this;
        },
        _destroyDatepicker: function(target) {
            var nodeName, $target = $(target), inst = $.data(target, "datepicker");
            $target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(), 
            $.removeData(target, "datepicker"), "input" === nodeName ? (inst.append.remove(), 
            inst.trigger.remove(), $target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === nodeName || "span" === nodeName) && $target.removeClass(this.markerClassName).empty());
        },
        _enableDatepicker: function(target) {
            var nodeName, inline, $target = $(target), inst = $.data(target, "datepicker");
            $target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(), 
            "input" === nodeName ? (target.disabled = !1, inst.trigger.filter("button").each(function() {
                this.disabled = !1;
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === nodeName || "span" === nodeName) && (inline = $target.children("." + this._inlineClass), 
            inline.children().removeClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), 
            this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return value === target ? null : value;
            }));
        },
        _disableDatepicker: function(target) {
            var nodeName, inline, $target = $(target), inst = $.data(target, "datepicker");
            $target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(), 
            "input" === nodeName ? (target.disabled = !0, inst.trigger.filter("button").each(function() {
                this.disabled = !0;
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === nodeName || "span" === nodeName) && (inline = $target.children("." + this._inlineClass), 
            inline.children().addClass("ui-state-disabled"), inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), 
            this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return value === target ? null : value;
            }), this._disabledInputs[this._disabledInputs.length] = target);
        },
        _isDisabledDatepicker: function(target) {
            if (!target) return !1;
            for (var i = 0; i < this._disabledInputs.length; i++) if (this._disabledInputs[i] === target) return !0;
            return !1;
        },
        _getInst: function(target) {
            try {
                return $.data(target, "datepicker");
            } catch (err) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function(target, name, value) {
            var settings, date, minDate, maxDate, inst = this._getInst(target);
            return 2 === arguments.length && "string" == typeof name ? "defaults" === name ? $.extend({}, $.datepicker._defaults) : inst ? "all" === name ? $.extend({}, inst.settings) : this._get(inst, name) : null : (settings = name || {}, 
            "string" == typeof name && (settings = {}, settings[name] = value), void (inst && (this._curInst === inst && this._hideDatepicker(), 
            date = this._getDateDatepicker(target, !0), minDate = this._getMinMaxDate(inst, "min"), 
            maxDate = this._getMinMaxDate(inst, "max"), datepicker_extendRemove(inst.settings, settings), 
            null !== minDate && void 0 !== settings.dateFormat && void 0 === settings.minDate && (inst.settings.minDate = this._formatDate(inst, minDate)), 
            null !== maxDate && void 0 !== settings.dateFormat && void 0 === settings.maxDate && (inst.settings.maxDate = this._formatDate(inst, maxDate)), 
            "disabled" in settings && (settings.disabled ? this._disableDatepicker(target) : this._enableDatepicker(target)), 
            this._attachments($(target), inst), this._autoSize(inst), this._setDate(inst, date), 
            this._updateAlternate(inst), this._updateDatepicker(inst))));
        },
        _changeDatepicker: function(target, name, value) {
            this._optionDatepicker(target, name, value);
        },
        _refreshDatepicker: function(target) {
            var inst = this._getInst(target);
            inst && this._updateDatepicker(inst);
        },
        _setDateDatepicker: function(target, date) {
            var inst = this._getInst(target);
            inst && (this._setDate(inst, date), this._updateDatepicker(inst), this._updateAlternate(inst));
        },
        _getDateDatepicker: function(target, noDefault) {
            var inst = this._getInst(target);
            return inst && !inst.inline && this._setDateFromField(inst, noDefault), inst ? this._getDate(inst) : null;
        },
        _doKeyDown: function(event) {
            var onSelect, dateStr, sel, inst = $.datepicker._getInst(event.target), handled = !0, isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
            if (inst._keyEvent = !0, $.datepicker._datepickerShowing) switch (event.keyCode) {
              case 9:
                $.datepicker._hideDatepicker(), handled = !1;
                break;

              case 13:
                return sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv), 
                sel[0] && $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]), 
                onSelect = $.datepicker._get(inst, "onSelect"), onSelect ? (dateStr = $.datepicker._formatDate(inst), 
                onSelect.apply(inst.input ? inst.input[0] : null, [ dateStr, inst ])) : $.datepicker._hideDatepicker(), 
                !1;

              case 27:
                $.datepicker._hideDatepicker();
                break;

              case 33:
                $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                break;

              case 34:
                $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                break;

              case 35:
                (event.ctrlKey || event.metaKey) && $.datepicker._clearDate(event.target), handled = event.ctrlKey || event.metaKey;
                break;

              case 36:
                (event.ctrlKey || event.metaKey) && $.datepicker._gotoToday(event.target), handled = event.ctrlKey || event.metaKey;
                break;

              case 37:
                (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? 1 : -1, "D"), 
                handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                break;

              case 38:
                (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, -7, "D"), 
                handled = event.ctrlKey || event.metaKey;
                break;

              case 39:
                (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? -1 : 1, "D"), 
                handled = event.ctrlKey || event.metaKey, event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                break;

              case 40:
                (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, 7, "D"), 
                handled = event.ctrlKey || event.metaKey;
                break;

              default:
                handled = !1;
            } else 36 === event.keyCode && event.ctrlKey ? $.datepicker._showDatepicker(this) : handled = !1;
            handled && (event.preventDefault(), event.stopPropagation());
        },
        _doKeyPress: function(event) {
            var chars, chr, inst = $.datepicker._getInst(event.target);
            return $.datepicker._get(inst, "constrainInput") ? (chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat")), 
            chr = String.fromCharCode(null == event.charCode ? event.keyCode : event.charCode), 
            event.ctrlKey || event.metaKey || " " > chr || !chars || chars.indexOf(chr) > -1) : void 0;
        },
        _doKeyUp: function(event) {
            var date, inst = $.datepicker._getInst(event.target);
            if (inst.input.val() !== inst.lastVal) try {
                date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input ? inst.input.val() : null, $.datepicker._getFormatConfig(inst)), 
                date && ($.datepicker._setDateFromField(inst), $.datepicker._updateAlternate(inst), 
                $.datepicker._updateDatepicker(inst));
            } catch (err) {}
            return !0;
        },
        _showDatepicker: function(input) {
            if (input = input.target || input, "input" !== input.nodeName.toLowerCase() && (input = $("input", input.parentNode)[0]), 
            !$.datepicker._isDisabledDatepicker(input) && $.datepicker._lastInput !== input) {
                var inst, beforeShow, beforeShowSettings, isFixed, offset, showAnim, duration;
                inst = $.datepicker._getInst(input), $.datepicker._curInst && $.datepicker._curInst !== inst && ($.datepicker._curInst.dpDiv.stop(!0, !0), 
                inst && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0])), 
                beforeShow = $.datepicker._get(inst, "beforeShow"), beforeShowSettings = beforeShow ? beforeShow.apply(input, [ input, inst ]) : {}, 
                beforeShowSettings !== !1 && (datepicker_extendRemove(inst.settings, beforeShowSettings), 
                inst.lastVal = null, $.datepicker._lastInput = input, $.datepicker._setDateFromField(inst), 
                $.datepicker._inDialog && (input.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(input), 
                $.datepicker._pos[1] += input.offsetHeight), isFixed = !1, $(input).parents().each(function() {
                    return isFixed |= "fixed" === $(this).css("position"), !isFixed;
                }), offset = {
                    left: $.datepicker._pos[0],
                    top: $.datepicker._pos[1]
                }, $.datepicker._pos = null, inst.dpDiv.empty(), inst.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), $.datepicker._updateDatepicker(inst), offset = $.datepicker._checkOffset(inst, offset, isFixed), 
                inst.dpDiv.css({
                    position: $.datepicker._inDialog && $.blockUI ? "static" : isFixed ? "fixed" : "absolute",
                    display: "none",
                    left: offset.left + "px",
                    top: offset.top + "px"
                }), inst.inline || (showAnim = $.datepicker._get(inst, "showAnim"), duration = $.datepicker._get(inst, "duration"), 
                inst.dpDiv.css("z-index", datepicker_getZindex($(input)) + 1), $.datepicker._datepickerShowing = !0, 
                $.effects && $.effects.effect[showAnim] ? inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration) : inst.dpDiv[showAnim || "show"](showAnim ? duration : null), 
                $.datepicker._shouldFocusInput(inst) && inst.input.focus(), $.datepicker._curInst = inst));
            }
        },
        _updateDatepicker: function(inst) {
            this.maxRows = 4, datepicker_instActive = inst, inst.dpDiv.empty().append(this._generateHTML(inst)), 
            this._attachHandlers(inst), inst.dpDiv.find("." + this._dayOverClass + " a");
            var origyearshtml, numMonths = this._getNumberOfMonths(inst), cols = numMonths[1], width = 17;
            inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), 
            cols > 1 && inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", width * cols + "em"), 
            inst.dpDiv[(1 !== numMonths[0] || 1 !== numMonths[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), 
            inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), 
            inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(inst) && inst.input.focus(), 
            inst.yearshtml && (origyearshtml = inst.yearshtml, setTimeout(function() {
                origyearshtml === inst.yearshtml && inst.yearshtml && inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml), 
                origyearshtml = inst.yearshtml = null;
            }, 0));
        },
        _shouldFocusInput: function(inst) {
            return inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && !inst.input.is(":focus");
        },
        _checkOffset: function(inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth(), dpHeight = inst.dpDiv.outerHeight(), inputWidth = inst.input ? inst.input.outerWidth() : 0, inputHeight = inst.input ? inst.input.outerHeight() : 0, viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()), viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());
            return offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth : 0, offset.left -= isFixed && offset.left === inst.input.offset().left ? $(document).scrollLeft() : 0, 
            offset.top -= isFixed && offset.top === inst.input.offset().top + inputHeight ? $(document).scrollTop() : 0, 
            offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0), 
            offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) : 0), 
            offset;
        },
        _findPos: function(obj) {
            for (var position, inst = this._getInst(obj), isRTL = this._get(inst, "isRTL"); obj && ("hidden" === obj.type || 1 !== obj.nodeType || $.expr.filters.hidden(obj)); ) obj = obj[isRTL ? "previousSibling" : "nextSibling"];
            return position = $(obj).offset(), [ position.left, position.top ];
        },
        _hideDatepicker: function(input) {
            var showAnim, duration, postProcess, onClose, inst = this._curInst;
            !inst || input && inst !== $.data(input, "datepicker") || this._datepickerShowing && (showAnim = this._get(inst, "showAnim"), 
            duration = this._get(inst, "duration"), postProcess = function() {
                $.datepicker._tidyDialog(inst);
            }, $.effects && ($.effects.effect[showAnim] || $.effects[showAnim]) ? inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess) : inst.dpDiv["slideDown" === showAnim ? "slideUp" : "fadeIn" === showAnim ? "fadeOut" : "hide"](showAnim ? duration : null, postProcess), 
            showAnim || postProcess(), this._datepickerShowing = !1, onClose = this._get(inst, "onClose"), 
            onClose && onClose.apply(inst.input ? inst.input[0] : null, [ inst.input ? inst.input.val() : "", inst ]), 
            this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1);
        },
        _tidyDialog: function(inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
        },
        _checkExternalClick: function(event) {
            if ($.datepicker._curInst) {
                var $target = $(event.target), inst = $.datepicker._getInst($target[0]);
                ($target[0].id !== $.datepicker._mainDivId && 0 === $target.parents("#" + $.datepicker._mainDivId).length && !$target.hasClass($.datepicker.markerClassName) && !$target.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst) && $.datepicker._hideDatepicker();
            }
        },
        _adjustDate: function(id, offset, period) {
            var target = $(id), inst = this._getInst(target[0]);
            this._isDisabledDatepicker(target[0]) || (this._adjustInstDate(inst, offset + ("M" === period ? this._get(inst, "showCurrentAtPos") : 0), period), 
            this._updateDatepicker(inst));
        },
        _gotoToday: function(id) {
            var date, target = $(id), inst = this._getInst(target[0]);
            this._get(inst, "gotoCurrent") && inst.currentDay ? (inst.selectedDay = inst.currentDay, 
            inst.drawMonth = inst.selectedMonth = inst.currentMonth, inst.drawYear = inst.selectedYear = inst.currentYear) : (date = new Date(), 
            inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), 
            inst.drawYear = inst.selectedYear = date.getFullYear()), this._notifyChange(inst), 
            this._adjustDate(target);
        },
        _selectMonthYear: function(id, select, period) {
            var target = $(id), inst = this._getInst(target[0]);
            inst["selected" + ("M" === period ? "Month" : "Year")] = inst["draw" + ("M" === period ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10), 
            this._notifyChange(inst), this._adjustDate(target);
        },
        _selectDay: function(id, month, year, td) {
            var inst, target = $(id);
            $(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0]) || (inst = this._getInst(target[0]), 
            inst.selectedDay = inst.currentDay = $("a", td).html(), inst.selectedMonth = inst.currentMonth = month, 
            inst.selectedYear = inst.currentYear = year, this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear)));
        },
        _clearDate: function(id) {
            var target = $(id);
            this._selectDate(target, "");
        },
        _selectDate: function(id, dateStr) {
            var onSelect, target = $(id), inst = this._getInst(target[0]);
            dateStr = null != dateStr ? dateStr : this._formatDate(inst), inst.input && inst.input.val(dateStr), 
            this._updateAlternate(inst), onSelect = this._get(inst, "onSelect"), onSelect ? onSelect.apply(inst.input ? inst.input[0] : null, [ dateStr, inst ]) : inst.input && inst.input.trigger("change"), 
            inst.inline ? this._updateDatepicker(inst) : (this._hideDatepicker(), this._lastInput = inst.input[0], 
            "object" != typeof inst.input[0] && inst.input.focus(), this._lastInput = null);
        },
        _updateAlternate: function(inst) {
            var altFormat, date, dateStr, altField = this._get(inst, "altField");
            altField && (altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat"), 
            date = this._getDate(inst), dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst)), 
            $(altField).each(function() {
                $(this).val(dateStr);
            }));
        },
        noWeekends: function(date) {
            var day = date.getDay();
            return [ day > 0 && 6 > day, "" ];
        },
        iso8601Week: function(date) {
            var time, checkDate = new Date(date.getTime());
            return checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)), time = checkDate.getTime(), 
            checkDate.setMonth(0), checkDate.setDate(1), Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1;
        },
        parseDate: function(format, value, settings) {
            if (null == format || null == value) throw "Invalid arguments";
            if (value = "object" == typeof value ? value.toString() : value + "", "" === value) return null;
            var iFormat, dim, extra, date, iValue = 0, shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff, shortYearCutoff = "string" != typeof shortYearCutoffTemp ? shortYearCutoffTemp : new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10), dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames, year = -1, month = -1, day = -1, doy = -1, literal = !1, lookAhead = function(match) {
                var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                return matches && iFormat++, matches;
            }, getNumber = function(match) {
                var isDoubled = lookAhead(match), size = "@" === match ? 14 : "!" === match ? 20 : "y" === match && isDoubled ? 4 : "o" === match ? 3 : 2, digits = new RegExp("^\\d{1," + size + "}"), num = value.substring(iValue).match(digits);
                if (!num) throw "Missing number at position " + iValue;
                return iValue += num[0].length, parseInt(num[0], 10);
            }, getName = function(match, shortNames, longNames) {
                var index = -1, names = $.map(lookAhead(match) ? longNames : shortNames, function(v, k) {
                    return [ [ k, v ] ];
                }).sort(function(a, b) {
                    return -(a[1].length - b[1].length);
                });
                if ($.each(names, function(i, pair) {
                    var name = pair[1];
                    return value.substr(iValue, name.length).toLowerCase() === name.toLowerCase() ? (index = pair[0], 
                    iValue += name.length, !1) : void 0;
                }), -1 !== index) return index + 1;
                throw "Unknown name at position " + iValue;
            }, checkLiteral = function() {
                if (value.charAt(iValue) !== format.charAt(iFormat)) throw "Unexpected literal at position " + iValue;
                iValue++;
            };
            for (iFormat = 0; iFormat < format.length; iFormat++) if (literal) "'" !== format.charAt(iFormat) || lookAhead("'") ? checkLiteral() : literal = !1; else switch (format.charAt(iFormat)) {
              case "d":
                day = getNumber("d");
                break;

              case "D":
                getName("D", dayNamesShort, dayNames);
                break;

              case "o":
                doy = getNumber("o");
                break;

              case "m":
                month = getNumber("m");
                break;

              case "M":
                month = getName("M", monthNamesShort, monthNames);
                break;

              case "y":
                year = getNumber("y");
                break;

              case "@":
                date = new Date(getNumber("@")), year = date.getFullYear(), month = date.getMonth() + 1, 
                day = date.getDate();
                break;

              case "!":
                date = new Date((getNumber("!") - this._ticksTo1970) / 1e4), year = date.getFullYear(), 
                month = date.getMonth() + 1, day = date.getDate();
                break;

              case "'":
                lookAhead("'") ? checkLiteral() : literal = !0;
                break;

              default:
                checkLiteral();
            }
            if (iValue < value.length && (extra = value.substr(iValue), !/^\s+/.test(extra))) throw "Extra/unparsed characters found in date: " + extra;
            if (-1 === year ? year = new Date().getFullYear() : 100 > year && (year += new Date().getFullYear() - new Date().getFullYear() % 100 + (shortYearCutoff >= year ? 0 : -100)), 
            doy > -1) for (month = 1, day = doy; ;) {
                if (dim = this._getDaysInMonth(year, month - 1), dim >= day) break;
                month++, day -= dim;
            }
            if (date = this._daylightSavingAdjust(new Date(year, month - 1, day)), date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) throw "Invalid date";
            return date;
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
        formatDate: function(format, date, settings) {
            if (!date) return "";
            var iFormat, dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames, lookAhead = function(match) {
                var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                return matches && iFormat++, matches;
            }, formatNumber = function(match, value, len) {
                var num = "" + value;
                if (lookAhead(match)) for (;num.length < len; ) num = "0" + num;
                return num;
            }, formatName = function(match, value, shortNames, longNames) {
                return lookAhead(match) ? longNames[value] : shortNames[value];
            }, output = "", literal = !1;
            if (date) for (iFormat = 0; iFormat < format.length; iFormat++) if (literal) "'" !== format.charAt(iFormat) || lookAhead("'") ? output += format.charAt(iFormat) : literal = !1; else switch (format.charAt(iFormat)) {
              case "d":
                output += formatNumber("d", date.getDate(), 2);
                break;

              case "D":
                output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                break;

              case "o":
                output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                break;

              case "m":
                output += formatNumber("m", date.getMonth() + 1, 2);
                break;

              case "M":
                output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                break;

              case "y":
                output += lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100;
                break;

              case "@":
                output += date.getTime();
                break;

              case "!":
                output += 1e4 * date.getTime() + this._ticksTo1970;
                break;

              case "'":
                lookAhead("'") ? output += "'" : literal = !0;
                break;

              default:
                output += format.charAt(iFormat);
            }
            return output;
        },
        _possibleChars: function(format) {
            var iFormat, chars = "", literal = !1, lookAhead = function(match) {
                var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                return matches && iFormat++, matches;
            };
            for (iFormat = 0; iFormat < format.length; iFormat++) if (literal) "'" !== format.charAt(iFormat) || lookAhead("'") ? chars += format.charAt(iFormat) : literal = !1; else switch (format.charAt(iFormat)) {
              case "d":
              case "m":
              case "y":
              case "@":
                chars += "0123456789";
                break;

              case "D":
              case "M":
                return null;

              case "'":
                lookAhead("'") ? chars += "'" : literal = !0;
                break;

              default:
                chars += format.charAt(iFormat);
            }
            return chars;
        },
        _get: function(inst, name) {
            return void 0 !== inst.settings[name] ? inst.settings[name] : this._defaults[name];
        },
        _setDateFromField: function(inst, noDefault) {
            if (inst.input.val() !== inst.lastVal) {
                var dateFormat = this._get(inst, "dateFormat"), dates = inst.lastVal = inst.input ? inst.input.val() : null, defaultDate = this._getDefaultDate(inst), date = defaultDate, settings = this._getFormatConfig(inst);
                try {
                    date = this.parseDate(dateFormat, dates, settings) || defaultDate;
                } catch (event) {
                    dates = noDefault ? "" : dates;
                }
                inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), 
                inst.drawYear = inst.selectedYear = date.getFullYear(), inst.currentDay = dates ? date.getDate() : 0, 
                inst.currentMonth = dates ? date.getMonth() : 0, inst.currentYear = dates ? date.getFullYear() : 0, 
                this._adjustInstDate(inst);
            }
        },
        _getDefaultDate: function(inst) {
            return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
        },
        _determineDate: function(inst, date, defaultDate) {
            var offsetNumeric = function(offset) {
                var date = new Date();
                return date.setDate(date.getDate() + offset), date;
            }, offsetString = function(offset) {
                try {
                    return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst));
                } catch (e) {}
                for (var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date(), year = date.getFullYear(), month = date.getMonth(), day = date.getDate(), pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, matches = pattern.exec(offset); matches; ) {
                    switch (matches[2] || "d") {
                      case "d":
                      case "D":
                        day += parseInt(matches[1], 10);
                        break;

                      case "w":
                      case "W":
                        day += 7 * parseInt(matches[1], 10);
                        break;

                      case "m":
                      case "M":
                        month += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                        break;

                      case "y":
                      case "Y":
                        year += parseInt(matches[1], 10), day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                    }
                    matches = pattern.exec(offset);
                }
                return new Date(year, month, day);
            }, newDate = null == date || "" === date ? defaultDate : "string" == typeof date ? offsetString(date) : "number" == typeof date ? isNaN(date) ? defaultDate : offsetNumeric(date) : new Date(date.getTime());
            return newDate = newDate && "Invalid Date" === newDate.toString() ? defaultDate : newDate, 
            newDate && (newDate.setHours(0), newDate.setMinutes(0), newDate.setSeconds(0), newDate.setMilliseconds(0)), 
            this._daylightSavingAdjust(newDate);
        },
        _daylightSavingAdjust: function(date) {
            return date ? (date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0), date) : null;
        },
        _setDate: function(inst, date, noChange) {
            var clear = !date, origMonth = inst.selectedMonth, origYear = inst.selectedYear, newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
            inst.selectedDay = inst.currentDay = newDate.getDate(), inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth(), 
            inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear(), origMonth === inst.selectedMonth && origYear === inst.selectedYear || noChange || this._notifyChange(inst), 
            this._adjustInstDate(inst), inst.input && inst.input.val(clear ? "" : this._formatDate(inst));
        },
        _getDate: function(inst) {
            var startDate = !inst.currentYear || inst.input && "" === inst.input.val() ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
            return startDate;
        },
        _attachHandlers: function(inst) {
            var stepMonths = this._get(inst, "stepMonths"), id = "#" + inst.id.replace(/\\\\/g, "\\");
            inst.dpDiv.find("[data-handler]").map(function() {
                var handler = {
                    prev: function() {
                        $.datepicker._adjustDate(id, -stepMonths, "M");
                    },
                    next: function() {
                        $.datepicker._adjustDate(id, +stepMonths, "M");
                    },
                    hide: function() {
                        $.datepicker._hideDatepicker();
                    },
                    today: function() {
                        $.datepicker._gotoToday(id);
                    },
                    selectDay: function() {
                        return $.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), 
                        !1;
                    },
                    selectMonth: function() {
                        return $.datepicker._selectMonthYear(id, this, "M"), !1;
                    },
                    selectYear: function() {
                        return $.datepicker._selectMonthYear(id, this, "Y"), !1;
                    }
                };
                $(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
            });
        },
        _generateHTML: function(inst) {
            var maxDraw, prevText, prev, nextText, next, currentText, gotoDate, controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin, monthNames, monthNamesShort, beforeShowDay, showOtherMonths, selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate, cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows, printDate, dRow, tbody, daySettings, otherMonth, unselectable, tempDate = new Date(), today = this._daylightSavingAdjust(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())), isRTL = this._get(inst, "isRTL"), showButtonPanel = this._get(inst, "showButtonPanel"), hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"), navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"), numMonths = this._getNumberOfMonths(inst), showCurrentAtPos = this._get(inst, "showCurrentAtPos"), stepMonths = this._get(inst, "stepMonths"), isMultiMonth = 1 !== numMonths[0] || 1 !== numMonths[1], currentDate = this._daylightSavingAdjust(inst.currentDay ? new Date(inst.currentYear, inst.currentMonth, inst.currentDay) : new Date(9999, 9, 9)), minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), drawMonth = inst.drawMonth - showCurrentAtPos, drawYear = inst.drawYear;
            if (0 > drawMonth && (drawMonth += 12, drawYear--), maxDate) for (maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate())), 
            maxDraw = minDate && minDate > maxDraw ? minDate : maxDraw; this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw; ) drawMonth--, 
            0 > drawMonth && (drawMonth = 11, drawYear--);
            for (inst.drawMonth = drawMonth, inst.drawYear = drawYear, prevText = this._get(inst, "prevText"), 
            prevText = navigationAsDateFormat ? this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)) : prevText, 
            prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>", 
            nextText = this._get(inst, "nextText"), nextText = navigationAsDateFormat ? this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)) : nextText, 
            next = this._canAdjustMonth(inst, 1, drawYear, drawMonth) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>", 
            currentText = this._get(inst, "currentText"), gotoDate = this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today, 
            currentText = navigationAsDateFormat ? this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)) : currentText, 
            controls = inst.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(inst, "closeText") + "</button>", 
            buttonPanel = showButtonPanel ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "", 
            firstDay = parseInt(this._get(inst, "firstDay"), 10), firstDay = isNaN(firstDay) ? 0 : firstDay, 
            showWeek = this._get(inst, "showWeek"), dayNames = this._get(inst, "dayNames"), 
            dayNamesMin = this._get(inst, "dayNamesMin"), monthNames = this._get(inst, "monthNames"), 
            monthNamesShort = this._get(inst, "monthNamesShort"), beforeShowDay = this._get(inst, "beforeShowDay"), 
            showOtherMonths = this._get(inst, "showOtherMonths"), selectOtherMonths = this._get(inst, "selectOtherMonths"), 
            defaultDate = this._getDefaultDate(inst), html = "", row = 0; row < numMonths[0]; row++) {
                for (group = "", this.maxRows = 4, col = 0; col < numMonths[1]; col++) {
                    if (selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay)), 
                    cornerClass = " ui-corner-all", calender = "", isMultiMonth) {
                        if (calender += "<div class='ui-datepicker-group", numMonths[1] > 1) switch (col) {
                          case 0:
                            calender += " ui-datepicker-group-first", cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                            break;

                          case numMonths[1] - 1:
                            calender += " ui-datepicker-group-last", cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                            break;

                          default:
                            calender += " ui-datepicker-group-middle", cornerClass = "";
                        }
                        calender += "'>";
                    }
                    for (calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" + (/all|left/.test(cornerClass) && 0 === row ? isRTL ? next : prev : "") + (/all|right/.test(cornerClass) && 0 === row ? isRTL ? prev : next : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + "</div><table class='ui-datepicker-calendar'><thead><tr>", 
                    thead = showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "", 
                    dow = 0; 7 > dow; dow++) day = (dow + firstDay) % 7, thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
                    for (calender += thead + "</tr></thead><tbody>", daysInMonth = this._getDaysInMonth(drawYear, drawMonth), 
                    drawYear === inst.selectedYear && drawMonth === inst.selectedMonth && (inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)), 
                    leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7, curRows = Math.ceil((leadDays + daysInMonth) / 7), 
                    numRows = isMultiMonth && this.maxRows > curRows ? this.maxRows : curRows, this.maxRows = numRows, 
                    printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays)), 
                    dRow = 0; numRows > dRow; dRow++) {
                        for (calender += "<tr>", tbody = showWeek ? "<td class='ui-datepicker-week-col'>" + this._get(inst, "calculateWeek")(printDate) + "</td>" : "", 
                        dow = 0; 7 > dow; dow++) daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [ printDate ]) : [ !0, "" ], 
                        otherMonth = printDate.getMonth() !== drawMonth, unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && minDate > printDate || maxDate && printDate > maxDate, 
                        tbody += "<td class='" + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + (printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent || defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime() ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + (otherMonth && !showOtherMonths || !daySettings[2] ? "" : " title='" + daySettings[2].replace(/'/g, "&#39;") + "'") + (unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" : unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" + (printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + (otherMonth ? " ui-priority-secondary" : "") + "' href='#'>" + printDate.getDate() + "</a>") + "</td>", 
                        printDate.setDate(printDate.getDate() + 1), printDate = this._daylightSavingAdjust(printDate);
                        calender += tbody + "</tr>";
                    }
                    drawMonth++, drawMonth > 11 && (drawMonth = 0, drawYear++), calender += "</tbody></table>" + (isMultiMonth ? "</div>" + (numMonths[0] > 0 && col === numMonths[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), 
                    group += calender;
                }
                html += group;
            }
            return html += buttonPanel, inst._keyEvent = !1, html;
        },
        _generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
            var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear, changeMonth = this._get(inst, "changeMonth"), changeYear = this._get(inst, "changeYear"), showMonthAfterYear = this._get(inst, "showMonthAfterYear"), html = "<div class='ui-datepicker-title'>", monthHtml = "";
            if (secondary || !changeMonth) monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>"; else {
                for (inMinYear = minDate && minDate.getFullYear() === drawYear, inMaxYear = maxDate && maxDate.getFullYear() === drawYear, 
                monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", 
                month = 0; 12 > month; month++) (!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()) && (monthHtml += "<option value='" + month + "'" + (month === drawMonth ? " selected='selected'" : "") + ">" + monthNamesShort[month] + "</option>");
                monthHtml += "</select>";
            }
            if (showMonthAfterYear || (html += monthHtml + (!secondary && changeMonth && changeYear ? "" : "&#xa0;")), 
            !inst.yearshtml) if (inst.yearshtml = "", secondary || !changeYear) html += "<span class='ui-datepicker-year'>" + drawYear + "</span>"; else {
                for (years = this._get(inst, "yearRange").split(":"), thisYear = new Date().getFullYear(), 
                determineYear = function(value) {
                    var year = value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) : value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10);
                    return isNaN(year) ? thisYear : year;
                }, year = determineYear(years[0]), endYear = Math.max(year, determineYear(years[1] || "")), 
                year = minDate ? Math.max(year, minDate.getFullYear()) : year, endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear, 
                inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; endYear >= year; year++) inst.yearshtml += "<option value='" + year + "'" + (year === drawYear ? " selected='selected'" : "") + ">" + year + "</option>";
                inst.yearshtml += "</select>", html += inst.yearshtml, inst.yearshtml = null;
            }
            return html += this._get(inst, "yearSuffix"), showMonthAfterYear && (html += (!secondary && changeMonth && changeYear ? "" : "&#xa0;") + monthHtml), 
            html += "</div>";
        },
        _adjustInstDate: function(inst, offset, period) {
            var year = inst.drawYear + ("Y" === period ? offset : 0), month = inst.drawMonth + ("M" === period ? offset : 0), day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + ("D" === period ? offset : 0), date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
            inst.selectedDay = date.getDate(), inst.drawMonth = inst.selectedMonth = date.getMonth(), 
            inst.drawYear = inst.selectedYear = date.getFullYear(), ("M" === period || "Y" === period) && this._notifyChange(inst);
        },
        _restrictMinMax: function(inst, date) {
            var minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), newDate = minDate && minDate > date ? minDate : date;
            return maxDate && newDate > maxDate ? maxDate : newDate;
        },
        _notifyChange: function(inst) {
            var onChange = this._get(inst, "onChangeMonthYear");
            onChange && onChange.apply(inst.input ? inst.input[0] : null, [ inst.selectedYear, inst.selectedMonth + 1, inst ]);
        },
        _getNumberOfMonths: function(inst) {
            var numMonths = this._get(inst, "numberOfMonths");
            return null == numMonths ? [ 1, 1 ] : "number" == typeof numMonths ? [ 1, numMonths ] : numMonths;
        },
        _getMinMaxDate: function(inst, minMax) {
            return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
        },
        _getDaysInMonth: function(year, month) {
            return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
        },
        _getFirstDayOfMonth: function(year, month) {
            return new Date(year, month, 1).getDay();
        },
        _canAdjustMonth: function(inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst), date = this._daylightSavingAdjust(new Date(curYear, curMonth + (0 > offset ? offset : numMonths[0] * numMonths[1]), 1));
            return 0 > offset && date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth())), 
            this._isInRange(inst, date);
        },
        _isInRange: function(inst, date) {
            var yearSplit, currentYear, minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), minYear = null, maxYear = null, years = this._get(inst, "yearRange");
            return years && (yearSplit = years.split(":"), currentYear = new Date().getFullYear(), 
            minYear = parseInt(yearSplit[0], 10), maxYear = parseInt(yearSplit[1], 10), yearSplit[0].match(/[+\-].*/) && (minYear += currentYear), 
            yearSplit[1].match(/[+\-].*/) && (maxYear += currentYear)), (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()) && (!minYear || date.getFullYear() >= minYear) && (!maxYear || date.getFullYear() <= maxYear);
        },
        _getFormatConfig: function(inst) {
            var shortYearCutoff = this._get(inst, "shortYearCutoff");
            return shortYearCutoff = "string" != typeof shortYearCutoff ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10), 
            {
                shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, "dayNamesShort"),
                dayNames: this._get(inst, "dayNames"),
                monthNamesShort: this._get(inst, "monthNamesShort"),
                monthNames: this._get(inst, "monthNames")
            };
        },
        _formatDate: function(inst, day, month, year) {
            day || (inst.currentDay = inst.selectedDay, inst.currentMonth = inst.selectedMonth, 
            inst.currentYear = inst.selectedYear);
            var date = day ? "object" == typeof day ? day : this._daylightSavingAdjust(new Date(year, month, day)) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
            return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
        }
    }), $.fn.datepicker = function(options) {
        if (!this.length) return this;
        $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick), 
        $.datepicker.initialized = !0), 0 === $("#" + $.datepicker._mainDivId).length && $("body").append($.datepicker.dpDiv);
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof options || "isDisabled" !== options && "getDate" !== options && "widget" !== options ? "option" === options && 2 === arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [ this[0] ].concat(otherArgs)) : this.each(function() {
            "string" == typeof options ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [ this ].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options);
        }) : $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [ this[0] ].concat(otherArgs));
    }, $.datepicker = new Datepicker(), $.datepicker.initialized = !1, $.datepicker.uuid = new Date().getTime(), 
    $.datepicker.version = "1.11.0";
    $.datepicker;
}), function(window) {
    function isArraylike(obj) {
        var length = obj.length, type = $.type(obj);
        return "function" === type || $.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj;
    }
    if (!window.jQuery) {
        var $ = function(selector, context) {
            return new $.fn.init(selector, context);
        };
        $.isWindow = function(obj) {
            return null != obj && obj == obj.window;
        }, $.type = function(obj) {
            return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
        }, $.isArray = Array.isArray || function(obj) {
            return "array" === $.type(obj);
        }, $.isPlainObject = function(obj) {
            var key;
            if (!obj || "object" !== $.type(obj) || obj.nodeType || $.isWindow(obj)) return !1;
            try {
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (e) {
                return !1;
            }
            for (key in obj) ;
            return void 0 === key || hasOwn.call(obj, key);
        }, $.each = function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray) for (;length > i && (value = callback.apply(obj[i], args), value !== !1); i++) ; else for (i in obj) if (value = callback.apply(obj[i], args), 
                value === !1) break;
            } else if (isArray) for (;length > i && (value = callback.call(obj[i], i, obj[i]), 
            value !== !1); i++) ; else for (i in obj) if (value = callback.call(obj[i], i, obj[i]), 
            value === !1) break;
            return obj;
        }, $.data = function(node, key, value) {
            if (void 0 === value) {
                var id = node[$.expando], store = id && cache[id];
                if (void 0 === key) return store;
                if (store && key in store) return store[key];
            } else if (void 0 !== key) {
                var id = node[$.expando] || (node[$.expando] = ++$.uuid);
                return cache[id] = cache[id] || {}, cache[id][key] = value, value;
            }
        }, $.removeData = function(node, keys) {
            var id = node[$.expando], store = id && cache[id];
            store && $.each(keys, function(_, key) {
                delete store[key];
            });
        }, $.extend = function() {
            var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
            for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
            i++), "object" != typeof target && "function" !== $.type(target) && (target = {}), 
            i === length && (target = this, i--); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
            copy = options[name], target !== copy && (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
            clone = src && $.isArray(src) ? src : []) : clone = src && $.isPlainObject(src) ? src : {}, 
            target[name] = $.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
            return target;
        }, $.queue = function(elem, type, data) {
            function $makeArray(arr, results) {
                var ret = results || [];
                return null != arr && (isArraylike(Object(arr)) ? !function(first, second) {
                    for (var len = +second.length, j = 0, i = first.length; len > j; ) first[i++] = second[j++];
                    if (len !== len) for (;void 0 !== second[j]; ) first[i++] = second[j++];
                    return first.length = i, first;
                }(ret, "string" == typeof arr ? [ arr ] : arr) : [].push.call(ret, arr)), ret;
            }
            if (elem) {
                type = (type || "fx") + "queue";
                var q = $.data(elem, type);
                return data ? (!q || $.isArray(data) ? q = $.data(elem, type, $makeArray(data)) : q.push(data), 
                q) : q || [];
            }
        }, $.dequeue = function(elems, type) {
            $.each(elems.nodeType ? [ elems ] : elems, function(i, elem) {
                type = type || "fx";
                var queue = $.queue(elem, type), fn = queue.shift();
                "inprogress" === fn && (fn = queue.shift()), fn && ("fx" === type && queue.unshift("inprogress"), 
                fn.call(elem, function() {
                    $.dequeue(elem, type);
                }));
            });
        }, $.fn = $.prototype = {
            init: function(selector) {
                if (selector.nodeType) return this[0] = selector, this;
                throw new Error("Not a DOM node.");
            },
            offset: function() {
                var box = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
                return {
                    top: box.top + (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                    left: box.left + (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                };
            },
            position: function() {
                function offsetParent() {
                    for (var offsetParent = this.offsetParent || document; offsetParent && "html" === !offsetParent.nodeType.toLowerCase && "static" === offsetParent.style.position; ) offsetParent = offsetParent.offsetParent;
                    return offsetParent || document;
                }
                var elem = this[0], offsetParent = offsetParent.apply(elem), offset = this.offset(), parentOffset = /^(?:body|html)$/i.test(offsetParent.nodeName) ? {
                    top: 0,
                    left: 0
                } : $(offsetParent).offset();
                return offset.top -= parseFloat(elem.style.marginTop) || 0, offset.left -= parseFloat(elem.style.marginLeft) || 0, 
                offsetParent.style && (parentOffset.top += parseFloat(offsetParent.style.borderTopWidth) || 0, 
                parentOffset.left += parseFloat(offsetParent.style.borderLeftWidth) || 0), {
                    top: offset.top - parentOffset.top,
                    left: offset.left - parentOffset.left
                };
            }
        };
        var cache = {};
        $.expando = "velocity" + new Date().getTime(), $.uuid = 0;
        for (var class2type = {}, hasOwn = class2type.hasOwnProperty, toString = class2type.toString, types = "Boolean Number String Function Array Date RegExp Object Error".split(" "), i = 0; i < types.length; i++) class2type["[object " + types[i] + "]"] = types[i].toLowerCase();
        $.fn.init.prototype = $.fn, window.Velocity = {
            Utilities: $
        };
    }
}(window), function(factory) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = factory() : "function" == typeof define && define.amd ? define(factory) : factory();
}(function() {
    return function(global, window, document, undefined) {
        function compactSparseArray(array) {
            for (var index = -1, length = array ? array.length : 0, result = []; ++index < length; ) {
                var value = array[index];
                value && result.push(value);
            }
            return result;
        }
        function sanitizeElements(elements) {
            return Type.isWrapped(elements) ? elements = [].slice.call(elements) : Type.isNode(elements) && (elements = [ elements ]), 
            elements;
        }
        function Data(element) {
            var response = $.data(element, "velocity");
            return null === response ? undefined : response;
        }
        function generateStep(steps) {
            return function(p) {
                return Math.round(p * steps) * (1 / steps);
            };
        }
        function generateBezier(mX1, mY1, mX2, mY2) {
            function A(aA1, aA2) {
                return 1 - 3 * aA2 + 3 * aA1;
            }
            function B(aA1, aA2) {
                return 3 * aA2 - 6 * aA1;
            }
            function C(aA1) {
                return 3 * aA1;
            }
            function calcBezier(aT, aA1, aA2) {
                return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
            }
            function getSlope(aT, aA1, aA2) {
                return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
            }
            function newtonRaphsonIterate(aX, aGuessT) {
                for (var i = 0; NEWTON_ITERATIONS > i; ++i) {
                    var currentSlope = getSlope(aGuessT, mX1, mX2);
                    if (0 === currentSlope) return aGuessT;
                    var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
                    aGuessT -= currentX / currentSlope;
                }
                return aGuessT;
            }
            function calcSampleValues() {
                for (var i = 0; kSplineTableSize > i; ++i) mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
            }
            function binarySubdivide(aX, aA, aB) {
                var currentX, currentT, i = 0;
                do currentT = aA + (aB - aA) / 2, currentX = calcBezier(currentT, mX1, mX2) - aX, 
                currentX > 0 ? aB = currentT : aA = currentT; while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
                return currentT;
            }
            function getTForX(aX) {
                for (var intervalStart = 0, currentSample = 1, lastSample = kSplineTableSize - 1; currentSample != lastSample && mSampleValues[currentSample] <= aX; ++currentSample) intervalStart += kSampleStepSize;
                --currentSample;
                var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]), guessForT = intervalStart + dist * kSampleStepSize, initialSlope = getSlope(guessForT, mX1, mX2);
                return initialSlope >= NEWTON_MIN_SLOPE ? newtonRaphsonIterate(aX, guessForT) : 0 == initialSlope ? guessForT : binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
            }
            function precompute() {
                _precomputed = !0, (mX1 != mY1 || mX2 != mY2) && calcSampleValues();
            }
            var NEWTON_ITERATIONS = 4, NEWTON_MIN_SLOPE = .001, SUBDIVISION_PRECISION = 1e-7, SUBDIVISION_MAX_ITERATIONS = 10, kSplineTableSize = 11, kSampleStepSize = 1 / (kSplineTableSize - 1), float32ArraySupported = "Float32Array" in window;
            if (4 !== arguments.length) return !1;
            for (var i = 0; 4 > i; ++i) if ("number" != typeof arguments[i] || isNaN(arguments[i]) || !isFinite(arguments[i])) return !1;
            mX1 = Math.min(mX1, 1), mX2 = Math.min(mX2, 1), mX1 = Math.max(mX1, 0), mX2 = Math.max(mX2, 0);
            var mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize), _precomputed = !1, f = function(aX) {
                return _precomputed || precompute(), mX1 === mY1 && mX2 === mY2 ? aX : 0 === aX ? 0 : 1 === aX ? 1 : calcBezier(getTForX(aX), mY1, mY2);
            };
            f.getControlPoints = function() {
                return [ {
                    x: mX1,
                    y: mY1
                }, {
                    x: mX2,
                    y: mY2
                } ];
            };
            var str = "generateBezier(" + [ mX1, mY1, mX2, mY2 ] + ")";
            return f.toString = function() {
                return str;
            }, f;
        }
        function getEasing(value, duration) {
            var easing = value;
            return Type.isString(value) ? Velocity.Easings[value] || (easing = !1) : easing = Type.isArray(value) && 1 === value.length ? generateStep.apply(null, value) : Type.isArray(value) && 2 === value.length ? generateSpringRK4.apply(null, value.concat([ duration ])) : Type.isArray(value) && 4 === value.length ? generateBezier.apply(null, value) : !1, 
            easing === !1 && (easing = Velocity.Easings[Velocity.defaults.easing] ? Velocity.defaults.easing : EASING_DEFAULT), 
            easing;
        }
        function tick(timestamp) {
            if (timestamp) for (var timeCurrent = new Date().getTime(), i = 0, callsLength = Velocity.State.calls.length; callsLength > i; i++) if (Velocity.State.calls[i]) {
                var callContainer = Velocity.State.calls[i], call = callContainer[0], opts = callContainer[2], timeStart = callContainer[3], firstTick = !!timeStart;
                timeStart || (timeStart = Velocity.State.calls[i][3] = timeCurrent - 16);
                for (var percentComplete = Math.min((timeCurrent - timeStart) / opts.duration, 1), j = 0, callLength = call.length; callLength > j; j++) {
                    var tweensContainer = call[j], element = tweensContainer.element;
                    if (Data(element)) {
                        var transformPropertyExists = !1;
                        if (opts.display !== undefined && null !== opts.display && "none" !== opts.display) {
                            if ("flex" === opts.display) {
                                var flexValues = [ "-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex" ];
                                $.each(flexValues, function(i, flexValue) {
                                    CSS.setPropertyValue(element, "display", flexValue);
                                });
                            }
                            CSS.setPropertyValue(element, "display", opts.display);
                        }
                        opts.visibility !== undefined && "hidden" !== opts.visibility && CSS.setPropertyValue(element, "visibility", opts.visibility);
                        for (var property in tweensContainer) if ("element" !== property) {
                            var currentValue, tween = tweensContainer[property], easing = Type.isString(tween.easing) ? Velocity.Easings[tween.easing] : tween.easing;
                            if (1 === percentComplete) currentValue = tween.endValue; else if (currentValue = tween.startValue + (tween.endValue - tween.startValue) * easing(percentComplete), 
                            !firstTick && currentValue === tween.currentValue) continue;
                            if (tween.currentValue = currentValue, CSS.Hooks.registered[property]) {
                                var hookRoot = CSS.Hooks.getRoot(property), rootPropertyValueCache = Data(element).rootPropertyValueCache[hookRoot];
                                rootPropertyValueCache && (tween.rootPropertyValue = rootPropertyValueCache);
                            }
                            var adjustedSetData = CSS.setPropertyValue(element, property, tween.currentValue + (0 === parseFloat(currentValue) ? "" : tween.unitType), tween.rootPropertyValue, tween.scrollData);
                            CSS.Hooks.registered[property] && (CSS.Normalizations.registered[hookRoot] ? Data(element).rootPropertyValueCache[hookRoot] = CSS.Normalizations.registered[hookRoot]("extract", null, adjustedSetData[1]) : Data(element).rootPropertyValueCache[hookRoot] = adjustedSetData[1]), 
                            "transform" === adjustedSetData[0] && (transformPropertyExists = !0);
                        }
                        opts.mobileHA && Data(element).transformCache.translate3d === undefined && (Data(element).transformCache.translate3d = "(0px, 0px, 0px)", 
                        transformPropertyExists = !0), transformPropertyExists && CSS.flushTransformCache(element);
                    }
                }
                opts.display !== undefined && "none" !== opts.display && (Velocity.State.calls[i][2].display = !1), 
                opts.visibility !== undefined && "hidden" !== opts.visibility && (Velocity.State.calls[i][2].visibility = !1), 
                opts.progress && opts.progress.call(callContainer[1], callContainer[1], percentComplete, Math.max(0, timeStart + opts.duration - timeCurrent), timeStart), 
                1 === percentComplete && completeCall(i);
            }
            Velocity.State.isTicking && ticker(tick);
        }
        function completeCall(callIndex, isStopped) {
            if (!Velocity.State.calls[callIndex]) return !1;
            for (var call = Velocity.State.calls[callIndex][0], elements = Velocity.State.calls[callIndex][1], opts = Velocity.State.calls[callIndex][2], resolver = Velocity.State.calls[callIndex][4], remainingCallsExist = !1, i = 0, callLength = call.length; callLength > i; i++) {
                var element = call[i].element;
                if (isStopped || opts.loop || ("none" === opts.display && CSS.setPropertyValue(element, "display", opts.display), 
                "hidden" === opts.visibility && CSS.setPropertyValue(element, "visibility", opts.visibility)), 
                opts.loop !== !0 && ($.queue(element)[1] === undefined || !/\.velocityQueueEntryFlag/i.test($.queue(element)[1])) && Data(element)) {
                    Data(element).isAnimating = !1, Data(element).rootPropertyValueCache = {};
                    var transformHAPropertyExists = !1;
                    $.each(CSS.Lists.transforms3D, function(i, transformName) {
                        var defaultValue = /^scale/.test(transformName) ? 1 : 0, currentValue = Data(element).transformCache[transformName];
                        Data(element).transformCache[transformName] !== undefined && new RegExp("^\\(" + defaultValue + "[^.]").test(currentValue) && (transformHAPropertyExists = !0, 
                        delete Data(element).transformCache[transformName]);
                    }), opts.mobileHA && (transformHAPropertyExists = !0, delete Data(element).transformCache.translate3d), 
                    transformHAPropertyExists && CSS.flushTransformCache(element), CSS.Values.removeClass(element, "velocity-animating");
                }
                if (!isStopped && opts.complete && !opts.loop && i === callLength - 1) try {
                    opts.complete.call(elements, elements);
                } catch (error) {
                    setTimeout(function() {
                        throw error;
                    }, 1);
                }
                resolver && opts.loop !== !0 && resolver(elements), opts.loop !== !0 || isStopped || ($.each(Data(element).tweensContainer, function(propertyName, tweenContainer) {
                    /^rotate/.test(propertyName) && 360 === parseFloat(tweenContainer.endValue) && (tweenContainer.endValue = 0, 
                    tweenContainer.startValue = 360);
                }), Velocity(element, "reverse", {
                    loop: !0,
                    delay: opts.delay
                })), opts.queue !== !1 && $.dequeue(element, opts.queue);
            }
            Velocity.State.calls[callIndex] = !1;
            for (var j = 0, callsLength = Velocity.State.calls.length; callsLength > j; j++) if (Velocity.State.calls[j] !== !1) {
                remainingCallsExist = !0;
                break;
            }
            remainingCallsExist === !1 && (Velocity.State.isTicking = !1, delete Velocity.State.calls, 
            Velocity.State.calls = []);
        }
        var $, IE = function() {
            if (document.documentMode) return document.documentMode;
            for (var i = 7; i > 4; i--) {
                var div = document.createElement("div");
                if (div.innerHTML = "<!--[if IE " + i + "]><span></span><![endif]-->", div.getElementsByTagName("span").length) return div = null, 
                i;
            }
            return undefined;
        }(), rAFShim = function() {
            var timeLast = 0;
            return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
                var timeDelta, timeCurrent = new Date().getTime();
                return timeDelta = Math.max(0, 16 - (timeCurrent - timeLast)), timeLast = timeCurrent + timeDelta, 
                setTimeout(function() {
                    callback(timeCurrent + timeDelta);
                }, timeDelta);
            };
        }(), Type = {
            isString: function(variable) {
                return "string" == typeof variable;
            },
            isArray: Array.isArray || function(variable) {
                return "[object Array]" === Object.prototype.toString.call(variable);
            },
            isFunction: function(variable) {
                return "[object Function]" === Object.prototype.toString.call(variable);
            },
            isNode: function(variable) {
                return variable && variable.nodeType;
            },
            isNodeList: function(variable) {
                return "object" == typeof variable && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(variable)) && variable.length !== undefined && (0 === variable.length || "object" == typeof variable[0] && variable[0].nodeType > 0);
            },
            isWrapped: function(variable) {
                return variable && (variable.jquery || window.Zepto && window.Zepto.zepto.isZ(variable));
            },
            isSVG: function(variable) {
                return window.SVGElement && variable instanceof window.SVGElement;
            },
            isEmptyObject: function(variable) {
                for (var name in variable) return !1;
                return !0;
            }
        }, isJQuery = !1;
        if (global.fn && global.fn.jquery ? ($ = global, isJQuery = !0) : $ = window.Velocity.Utilities, 
        8 >= IE && !isJQuery) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
        if (7 >= IE) return void (jQuery.fn.velocity = jQuery.fn.animate);
        var DURATION_DEFAULT = 400, EASING_DEFAULT = "swing", Velocity = {
            State: {
                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                isAndroid: /Android/i.test(navigator.userAgent),
                isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                isChrome: window.chrome,
                isFirefox: /Firefox/i.test(navigator.userAgent),
                prefixElement: document.createElement("div"),
                prefixMatches: {},
                scrollAnchor: null,
                scrollPropertyLeft: null,
                scrollPropertyTop: null,
                isTicking: !1,
                calls: []
            },
            CSS: {},
            Utilities: $,
            Redirects: {},
            Easings: {},
            Promise: window.Promise,
            defaults: {
                queue: "",
                duration: DURATION_DEFAULT,
                easing: EASING_DEFAULT,
                begin: undefined,
                complete: undefined,
                progress: undefined,
                display: undefined,
                visibility: undefined,
                loop: !1,
                delay: !1,
                mobileHA: !0,
                _cacheValues: !0
            },
            init: function(element) {
                $.data(element, "velocity", {
                    isSVG: Type.isSVG(element),
                    isAnimating: !1,
                    computedStyle: null,
                    tweensContainer: null,
                    rootPropertyValueCache: {},
                    transformCache: {}
                });
            },
            hook: null,
            mock: !1,
            version: {
                major: 1,
                minor: 1,
                patch: 0
            },
            debug: !1
        };
        window.pageYOffset !== undefined ? (Velocity.State.scrollAnchor = window, Velocity.State.scrollPropertyLeft = "pageXOffset", 
        Velocity.State.scrollPropertyTop = "pageYOffset") : (Velocity.State.scrollAnchor = document.documentElement || document.body.parentNode || document.body, 
        Velocity.State.scrollPropertyLeft = "scrollLeft", Velocity.State.scrollPropertyTop = "scrollTop");
        var generateSpringRK4 = function() {
            function springAccelerationForState(state) {
                return -state.tension * state.x - state.friction * state.v;
            }
            function springEvaluateStateWithDerivative(initialState, dt, derivative) {
                var state = {
                    x: initialState.x + derivative.dx * dt,
                    v: initialState.v + derivative.dv * dt,
                    tension: initialState.tension,
                    friction: initialState.friction
                };
                return {
                    dx: state.v,
                    dv: springAccelerationForState(state)
                };
            }
            function springIntegrateState(state, dt) {
                var a = {
                    dx: state.v,
                    dv: springAccelerationForState(state)
                }, b = springEvaluateStateWithDerivative(state, .5 * dt, a), c = springEvaluateStateWithDerivative(state, .5 * dt, b), d = springEvaluateStateWithDerivative(state, dt, c), dxdt = 1 / 6 * (a.dx + 2 * (b.dx + c.dx) + d.dx), dvdt = 1 / 6 * (a.dv + 2 * (b.dv + c.dv) + d.dv);
                return state.x = state.x + dxdt * dt, state.v = state.v + dvdt * dt, state;
            }
            return function springRK4Factory(tension, friction, duration) {
                var have_duration, dt, last_state, initState = {
                    x: -1,
                    v: 0,
                    tension: null,
                    friction: null
                }, path = [ 0 ], time_lapsed = 0, tolerance = 1e-4, DT = .016;
                for (tension = parseFloat(tension) || 500, friction = parseFloat(friction) || 20, 
                duration = duration || null, initState.tension = tension, initState.friction = friction, 
                have_duration = null !== duration, have_duration ? (time_lapsed = springRK4Factory(tension, friction), 
                dt = time_lapsed / duration * DT) : dt = DT; ;) if (last_state = springIntegrateState(last_state || initState, dt), 
                path.push(1 + last_state.x), time_lapsed += 16, !(Math.abs(last_state.x) > tolerance && Math.abs(last_state.v) > tolerance)) break;
                return have_duration ? function(percentComplete) {
                    return path[percentComplete * (path.length - 1) | 0];
                } : time_lapsed;
            };
        }();
        Velocity.Easings = {
            linear: function(p) {
                return p;
            },
            swing: function(p) {
                return .5 - Math.cos(p * Math.PI) / 2;
            },
            spring: function(p) {
                return 1 - Math.cos(4.5 * p * Math.PI) * Math.exp(6 * -p);
            }
        }, $.each([ [ "ease", [ .25, .1, .25, 1 ] ], [ "ease-in", [ .42, 0, 1, 1 ] ], [ "ease-out", [ 0, 0, .58, 1 ] ], [ "ease-in-out", [ .42, 0, .58, 1 ] ], [ "easeInSine", [ .47, 0, .745, .715 ] ], [ "easeOutSine", [ .39, .575, .565, 1 ] ], [ "easeInOutSine", [ .445, .05, .55, .95 ] ], [ "easeInQuad", [ .55, .085, .68, .53 ] ], [ "easeOutQuad", [ .25, .46, .45, .94 ] ], [ "easeInOutQuad", [ .455, .03, .515, .955 ] ], [ "easeInCubic", [ .55, .055, .675, .19 ] ], [ "easeOutCubic", [ .215, .61, .355, 1 ] ], [ "easeInOutCubic", [ .645, .045, .355, 1 ] ], [ "easeInQuart", [ .895, .03, .685, .22 ] ], [ "easeOutQuart", [ .165, .84, .44, 1 ] ], [ "easeInOutQuart", [ .77, 0, .175, 1 ] ], [ "easeInQuint", [ .755, .05, .855, .06 ] ], [ "easeOutQuint", [ .23, 1, .32, 1 ] ], [ "easeInOutQuint", [ .86, 0, .07, 1 ] ], [ "easeInExpo", [ .95, .05, .795, .035 ] ], [ "easeOutExpo", [ .19, 1, .22, 1 ] ], [ "easeInOutExpo", [ 1, 0, 0, 1 ] ], [ "easeInCirc", [ .6, .04, .98, .335 ] ], [ "easeOutCirc", [ .075, .82, .165, 1 ] ], [ "easeInOutCirc", [ .785, .135, .15, .86 ] ] ], function(i, easingArray) {
            Velocity.Easings[easingArray[0]] = generateBezier.apply(null, easingArray[1]);
        });
        var CSS = Velocity.CSS = {
            RegEx: {
                isHex: /^#([A-f\d]{3}){1,2}$/i,
                valueUnwrap: /^[A-z]+\((.*)\)$/i,
                wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
            },
            Lists: {
                colors: [ "fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor" ],
                transformsBase: [ "translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ" ],
                transforms3D: [ "transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY" ]
            },
            Hooks: {
                templates: {
                    textShadow: [ "Color X Y Blur", "black 0px 0px 0px" ],
                    boxShadow: [ "Color X Y Blur Spread", "black 0px 0px 0px 0px" ],
                    clip: [ "Top Right Bottom Left", "0px 0px 0px 0px" ],
                    backgroundPosition: [ "X Y", "0% 0%" ],
                    transformOrigin: [ "X Y Z", "50% 50% 0px" ],
                    perspectiveOrigin: [ "X Y", "50% 50%" ]
                },
                registered: {},
                register: function() {
                    for (var i = 0; i < CSS.Lists.colors.length; i++) {
                        var rgbComponents = "color" === CSS.Lists.colors[i] ? "0 0 0 1" : "255 255 255 1";
                        CSS.Hooks.templates[CSS.Lists.colors[i]] = [ "Red Green Blue Alpha", rgbComponents ];
                    }
                    var rootProperty, hookTemplate, hookNames;
                    if (IE) for (rootProperty in CSS.Hooks.templates) {
                        hookTemplate = CSS.Hooks.templates[rootProperty], hookNames = hookTemplate[0].split(" ");
                        var defaultValues = hookTemplate[1].match(CSS.RegEx.valueSplit);
                        "Color" === hookNames[0] && (hookNames.push(hookNames.shift()), defaultValues.push(defaultValues.shift()), 
                        CSS.Hooks.templates[rootProperty] = [ hookNames.join(" "), defaultValues.join(" ") ]);
                    }
                    for (rootProperty in CSS.Hooks.templates) {
                        hookTemplate = CSS.Hooks.templates[rootProperty], hookNames = hookTemplate[0].split(" ");
                        for (var i in hookNames) {
                            var fullHookName = rootProperty + hookNames[i], hookPosition = i;
                            CSS.Hooks.registered[fullHookName] = [ rootProperty, hookPosition ];
                        }
                    }
                },
                getRoot: function(property) {
                    var hookData = CSS.Hooks.registered[property];
                    return hookData ? hookData[0] : property;
                },
                cleanRootPropertyValue: function(rootProperty, rootPropertyValue) {
                    return CSS.RegEx.valueUnwrap.test(rootPropertyValue) && (rootPropertyValue = rootPropertyValue.match(CSS.RegEx.valueUnwrap)[1]), 
                    CSS.Values.isCSSNullValue(rootPropertyValue) && (rootPropertyValue = CSS.Hooks.templates[rootProperty][1]), 
                    rootPropertyValue;
                },
                extractValue: function(fullHookName, rootPropertyValue) {
                    var hookData = CSS.Hooks.registered[fullHookName];
                    if (hookData) {
                        var hookRoot = hookData[0], hookPosition = hookData[1];
                        return rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue), 
                        rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];
                    }
                    return rootPropertyValue;
                },
                injectValue: function(fullHookName, hookValue, rootPropertyValue) {
                    var hookData = CSS.Hooks.registered[fullHookName];
                    if (hookData) {
                        var rootPropertyValueParts, rootPropertyValueUpdated, hookRoot = hookData[0], hookPosition = hookData[1];
                        return rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue), 
                        rootPropertyValueParts = rootPropertyValue.toString().match(CSS.RegEx.valueSplit), 
                        rootPropertyValueParts[hookPosition] = hookValue, rootPropertyValueUpdated = rootPropertyValueParts.join(" ");
                    }
                    return rootPropertyValue;
                }
            },
            Normalizations: {
                registered: {
                    clip: function(type, element, propertyValue) {
                        switch (type) {
                          case "name":
                            return "clip";

                          case "extract":
                            var extracted;
                            return CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue) ? extracted = propertyValue : (extracted = propertyValue.toString().match(CSS.RegEx.valueUnwrap), 
                            extracted = extracted ? extracted[1].replace(/,(\s+)?/g, " ") : propertyValue), 
                            extracted;

                          case "inject":
                            return "rect(" + propertyValue + ")";
                        }
                    },
                    blur: function(type, element, propertyValue) {
                        switch (type) {
                          case "name":
                            return "-webkit-filter";

                          case "extract":
                            var extracted = parseFloat(propertyValue);
                            if (!extracted && 0 !== extracted) {
                                var blurComponent = propertyValue.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                extracted = blurComponent ? blurComponent[1] : 0;
                            }
                            return extracted;

                          case "inject":
                            return parseFloat(propertyValue) ? "blur(" + propertyValue + ")" : "none";
                        }
                    },
                    opacity: function(type, element, propertyValue) {
                        if (8 >= IE) switch (type) {
                          case "name":
                            return "filter";

                          case "extract":
                            var extracted = propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);
                            return propertyValue = extracted ? extracted[1] / 100 : 1;

                          case "inject":
                            return element.style.zoom = 1, parseFloat(propertyValue) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(propertyValue), 10) + ")";
                        } else switch (type) {
                          case "name":
                            return "opacity";

                          case "extract":
                            return propertyValue;

                          case "inject":
                            return propertyValue;
                        }
                    }
                },
                register: function() {
                    9 >= IE || Velocity.State.isGingerbread || (CSS.Lists.transformsBase = CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D));
                    for (var i = 0; i < CSS.Lists.transformsBase.length; i++) !function() {
                        var transformName = CSS.Lists.transformsBase[i];
                        CSS.Normalizations.registered[transformName] = function(type, element, propertyValue) {
                            switch (type) {
                              case "name":
                                return "transform";

                              case "extract":
                                return Data(element) === undefined || Data(element).transformCache[transformName] === undefined ? /^scale/i.test(transformName) ? 1 : 0 : Data(element).transformCache[transformName].replace(/[()]/g, "");

                              case "inject":
                                var invalid = !1;
                                switch (transformName.substr(0, transformName.length - 1)) {
                                  case "translate":
                                    invalid = !/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);
                                    break;

                                  case "scal":
                                  case "scale":
                                    Velocity.State.isAndroid && Data(element).transformCache[transformName] === undefined && 1 > propertyValue && (propertyValue = 1), 
                                    invalid = !/(\d)$/i.test(propertyValue);
                                    break;

                                  case "skew":
                                    invalid = !/(deg|\d)$/i.test(propertyValue);
                                    break;

                                  case "rotate":
                                    invalid = !/(deg|\d)$/i.test(propertyValue);
                                }
                                return invalid || (Data(element).transformCache[transformName] = "(" + propertyValue + ")"), 
                                Data(element).transformCache[transformName];
                            }
                        };
                    }();
                    for (var i = 0; i < CSS.Lists.colors.length; i++) !function() {
                        var colorName = CSS.Lists.colors[i];
                        CSS.Normalizations.registered[colorName] = function(type, element, propertyValue) {
                            switch (type) {
                              case "name":
                                return colorName;

                              case "extract":
                                var extracted;
                                if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) extracted = propertyValue; else {
                                    var converted, colorNames = {
                                        black: "rgb(0, 0, 0)",
                                        blue: "rgb(0, 0, 255)",
                                        gray: "rgb(128, 128, 128)",
                                        green: "rgb(0, 128, 0)",
                                        red: "rgb(255, 0, 0)",
                                        white: "rgb(255, 255, 255)"
                                    };
                                    /^[A-z]+$/i.test(propertyValue) ? converted = colorNames[propertyValue] !== undefined ? colorNames[propertyValue] : colorNames.black : CSS.RegEx.isHex.test(propertyValue) ? converted = "rgb(" + CSS.Values.hexToRgb(propertyValue).join(" ") + ")" : /^rgba?\(/i.test(propertyValue) || (converted = colorNames.black), 
                                    extracted = (converted || propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                                }
                                return 8 >= IE || 3 !== extracted.split(" ").length || (extracted += " 1"), extracted;

                              case "inject":
                                return 8 >= IE ? 4 === propertyValue.split(" ").length && (propertyValue = propertyValue.split(/\s+/).slice(0, 3).join(" ")) : 3 === propertyValue.split(" ").length && (propertyValue += " 1"), 
                                (8 >= IE ? "rgb" : "rgba") + "(" + propertyValue.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
                            }
                        };
                    }();
                }
            },
            Names: {
                camelCase: function(property) {
                    return property.replace(/-(\w)/g, function(match, subMatch) {
                        return subMatch.toUpperCase();
                    });
                },
                SVGAttribute: function(property) {
                    var SVGAttributes = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                    return (IE || Velocity.State.isAndroid && !Velocity.State.isChrome) && (SVGAttributes += "|transform"), 
                    new RegExp("^(" + SVGAttributes + ")$", "i").test(property);
                },
                prefixCheck: function(property) {
                    if (Velocity.State.prefixMatches[property]) return [ Velocity.State.prefixMatches[property], !0 ];
                    for (var vendors = [ "", "Webkit", "Moz", "ms", "O" ], i = 0, vendorsLength = vendors.length; vendorsLength > i; i++) {
                        var propertyPrefixed;
                        if (propertyPrefixed = 0 === i ? property : vendors[i] + property.replace(/^\w/, function(match) {
                            return match.toUpperCase();
                        }), Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])) return Velocity.State.prefixMatches[property] = propertyPrefixed, 
                        [ propertyPrefixed, !0 ];
                    }
                    return [ property, !1 ];
                }
            },
            Values: {
                hexToRgb: function(hex) {
                    var rgbParts, shortformRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                    return hex = hex.replace(shortformRegex, function(m, r, g, b) {
                        return r + r + g + g + b + b;
                    }), rgbParts = longformRegex.exec(hex), rgbParts ? [ parseInt(rgbParts[1], 16), parseInt(rgbParts[2], 16), parseInt(rgbParts[3], 16) ] : [ 0, 0, 0 ];
                },
                isCSSNullValue: function(value) {
                    return 0 == value || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value);
                },
                getUnitType: function(property) {
                    return /^(rotate|skew)/i.test(property) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property) ? "" : "px";
                },
                getDisplayType: function(element) {
                    var tagName = element && element.tagName.toString().toLowerCase();
                    return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName) ? "inline" : /^(li)$/i.test(tagName) ? "list-item" : /^(tr)$/i.test(tagName) ? "table-row" : "block";
                },
                addClass: function(element, className) {
                    element.classList ? element.classList.add(className) : element.className += (element.className.length ? " " : "") + className;
                },
                removeClass: function(element, className) {
                    element.classList ? element.classList.remove(className) : element.className = element.className.toString().replace(new RegExp("(^|\\s)" + className.split(" ").join("|") + "(\\s|$)", "gi"), " ");
                }
            },
            getPropertyValue: function(element, property, rootPropertyValue, forceStyleLookup) {
                function computePropertyValue(element, property) {
                    function revertDisplay() {
                        toggleDisplay && CSS.setPropertyValue(element, "display", "none");
                    }
                    var computedValue = 0;
                    if (8 >= IE) computedValue = $.css(element, property); else {
                        var toggleDisplay = !1;
                        if (/^(width|height)$/.test(property) && 0 === CSS.getPropertyValue(element, "display") && (toggleDisplay = !0, 
                        CSS.setPropertyValue(element, "display", CSS.Values.getDisplayType(element))), !forceStyleLookup) {
                            if ("height" === property && "border-box" !== CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase()) {
                                var contentBoxHeight = element.offsetHeight - (parseFloat(CSS.getPropertyValue(element, "borderTopWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderBottomWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingTop")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingBottom")) || 0);
                                return revertDisplay(), contentBoxHeight;
                            }
                            if ("width" === property && "border-box" !== CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase()) {
                                var contentBoxWidth = element.offsetWidth - (parseFloat(CSS.getPropertyValue(element, "borderLeftWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderRightWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingLeft")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingRight")) || 0);
                                return revertDisplay(), contentBoxWidth;
                            }
                        }
                        var computedStyle;
                        computedStyle = Data(element) === undefined ? window.getComputedStyle(element, null) : Data(element).computedStyle ? Data(element).computedStyle : Data(element).computedStyle = window.getComputedStyle(element, null), 
                        (IE || Velocity.State.isFirefox) && "borderColor" === property && (property = "borderTopColor"), 
                        computedValue = 9 === IE && "filter" === property ? computedStyle.getPropertyValue(property) : computedStyle[property], 
                        ("" === computedValue || null === computedValue) && (computedValue = element.style[property]), 
                        revertDisplay();
                    }
                    if ("auto" === computedValue && /^(top|right|bottom|left)$/i.test(property)) {
                        var position = computePropertyValue(element, "position");
                        ("fixed" === position || "absolute" === position && /top|left/i.test(property)) && (computedValue = $(element).position()[property] + "px");
                    }
                    return computedValue;
                }
                var propertyValue;
                if (CSS.Hooks.registered[property]) {
                    var hook = property, hookRoot = CSS.Hooks.getRoot(hook);
                    rootPropertyValue === undefined && (rootPropertyValue = CSS.getPropertyValue(element, CSS.Names.prefixCheck(hookRoot)[0])), 
                    CSS.Normalizations.registered[hookRoot] && (rootPropertyValue = CSS.Normalizations.registered[hookRoot]("extract", element, rootPropertyValue)), 
                    propertyValue = CSS.Hooks.extractValue(hook, rootPropertyValue);
                } else if (CSS.Normalizations.registered[property]) {
                    var normalizedPropertyName, normalizedPropertyValue;
                    normalizedPropertyName = CSS.Normalizations.registered[property]("name", element), 
                    "transform" !== normalizedPropertyName && (normalizedPropertyValue = computePropertyValue(element, CSS.Names.prefixCheck(normalizedPropertyName)[0]), 
                    CSS.Values.isCSSNullValue(normalizedPropertyValue) && CSS.Hooks.templates[property] && (normalizedPropertyValue = CSS.Hooks.templates[property][1])), 
                    propertyValue = CSS.Normalizations.registered[property]("extract", element, normalizedPropertyValue);
                }
                return /^[\d-]/.test(propertyValue) || (propertyValue = Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property) ? /^(height|width)$/i.test(property) ? element.getBBox()[property] : element.getAttribute(property) : computePropertyValue(element, CSS.Names.prefixCheck(property)[0])), 
                CSS.Values.isCSSNullValue(propertyValue) && (propertyValue = 0), Velocity.debug >= 2 && console.log("Get " + property + ": " + propertyValue), 
                propertyValue;
            },
            setPropertyValue: function(element, property, propertyValue, rootPropertyValue, scrollData) {
                var propertyName = property;
                if ("scroll" === property) scrollData.container ? scrollData.container["scroll" + scrollData.direction] = propertyValue : "Left" === scrollData.direction ? window.scrollTo(propertyValue, scrollData.alternateValue) : window.scrollTo(scrollData.alternateValue, propertyValue); else if (CSS.Normalizations.registered[property] && "transform" === CSS.Normalizations.registered[property]("name", element)) CSS.Normalizations.registered[property]("inject", element, propertyValue), 
                propertyName = "transform", propertyValue = Data(element).transformCache[property]; else {
                    if (CSS.Hooks.registered[property]) {
                        var hookName = property, hookRoot = CSS.Hooks.getRoot(property);
                        rootPropertyValue = rootPropertyValue || CSS.getPropertyValue(element, hookRoot), 
                        propertyValue = CSS.Hooks.injectValue(hookName, propertyValue, rootPropertyValue), 
                        property = hookRoot;
                    }
                    if (CSS.Normalizations.registered[property] && (propertyValue = CSS.Normalizations.registered[property]("inject", element, propertyValue), 
                    property = CSS.Normalizations.registered[property]("name", element)), propertyName = CSS.Names.prefixCheck(property)[0], 
                    8 >= IE) try {
                        element.style[propertyName] = propertyValue;
                    } catch (error) {
                        Velocity.debug && console.log("Browser does not support [" + propertyValue + "] for [" + propertyName + "]");
                    } else Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property) ? element.setAttribute(property, propertyValue) : element.style[propertyName] = propertyValue;
                    Velocity.debug >= 2 && console.log("Set " + property + " (" + propertyName + "): " + propertyValue);
                }
                return [ propertyName, propertyValue ];
            },
            flushTransformCache: function(element) {
                function getTransformFloat(transformProperty) {
                    return parseFloat(CSS.getPropertyValue(element, transformProperty));
                }
                var transformString = "";
                if ((IE || Velocity.State.isAndroid && !Velocity.State.isChrome) && Data(element).isSVG) {
                    var SVGTransforms = {
                        translate: [ getTransformFloat("translateX"), getTransformFloat("translateY") ],
                        skewX: [ getTransformFloat("skewX") ],
                        skewY: [ getTransformFloat("skewY") ],
                        scale: 1 !== getTransformFloat("scale") ? [ getTransformFloat("scale"), getTransformFloat("scale") ] : [ getTransformFloat("scaleX"), getTransformFloat("scaleY") ],
                        rotate: [ getTransformFloat("rotateZ"), 0, 0 ]
                    };
                    $.each(Data(element).transformCache, function(transformName) {
                        /^translate/i.test(transformName) ? transformName = "translate" : /^scale/i.test(transformName) ? transformName = "scale" : /^rotate/i.test(transformName) && (transformName = "rotate"), 
                        SVGTransforms[transformName] && (transformString += transformName + "(" + SVGTransforms[transformName].join(" ") + ") ", 
                        delete SVGTransforms[transformName]);
                    });
                } else {
                    var transformValue, perspective;
                    $.each(Data(element).transformCache, function(transformName) {
                        return transformValue = Data(element).transformCache[transformName], "transformPerspective" === transformName ? (perspective = transformValue, 
                        !0) : (9 === IE && "rotateZ" === transformName && (transformName = "rotate"), void (transformString += transformName + transformValue + " "));
                    }), perspective && (transformString = "perspective" + perspective + " " + transformString);
                }
                CSS.setPropertyValue(element, "transform", transformString);
            }
        };
        CSS.Hooks.register(), CSS.Normalizations.register(), Velocity.hook = function(elements, arg2, arg3) {
            var value = undefined;
            return elements = sanitizeElements(elements), $.each(elements, function(i, element) {
                if (Data(element) === undefined && Velocity.init(element), arg3 === undefined) value === undefined && (value = Velocity.CSS.getPropertyValue(element, arg2)); else {
                    var adjustedSet = Velocity.CSS.setPropertyValue(element, arg2, arg3);
                    "transform" === adjustedSet[0] && Velocity.CSS.flushTransformCache(element), value = adjustedSet;
                }
            }), value;
        };
        var animate = function() {
            function getChain() {
                return isUtility ? promiseData.promise || null : elementsWrapped;
            }
            function processElement() {
                function buildQueue(next) {
                    function parsePropertyValue(valueData, skipResolvingEasing) {
                        var endValue = undefined, easing = undefined, startValue = undefined;
                        return Type.isArray(valueData) ? (endValue = valueData[0], !Type.isArray(valueData[1]) && /^[\d-]/.test(valueData[1]) || Type.isFunction(valueData[1]) || CSS.RegEx.isHex.test(valueData[1]) ? startValue = valueData[1] : (Type.isString(valueData[1]) && !CSS.RegEx.isHex.test(valueData[1]) || Type.isArray(valueData[1])) && (easing = skipResolvingEasing ? valueData[1] : getEasing(valueData[1], opts.duration), 
                        valueData[2] !== undefined && (startValue = valueData[2]))) : endValue = valueData, 
                        skipResolvingEasing || (easing = easing || opts.easing), Type.isFunction(endValue) && (endValue = endValue.call(element, elementsIndex, elementsLength)), 
                        Type.isFunction(startValue) && (startValue = startValue.call(element, elementsIndex, elementsLength)), 
                        [ endValue || 0, easing, startValue ];
                    }
                    function separateValue(property, value) {
                        var unitType, numericValue;
                        return numericValue = (value || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(match) {
                            return unitType = match, "";
                        }), unitType || (unitType = CSS.Values.getUnitType(property)), [ numericValue, unitType ];
                    }
                    function calculateUnitRatios() {
                        var sameRatioIndicators = {
                            myParent: element.parentNode || document.body,
                            position: CSS.getPropertyValue(element, "position"),
                            fontSize: CSS.getPropertyValue(element, "fontSize")
                        }, samePercentRatio = sameRatioIndicators.position === callUnitConversionData.lastPosition && sameRatioIndicators.myParent === callUnitConversionData.lastParent, sameEmRatio = sameRatioIndicators.fontSize === callUnitConversionData.lastFontSize;
                        callUnitConversionData.lastParent = sameRatioIndicators.myParent, callUnitConversionData.lastPosition = sameRatioIndicators.position, 
                        callUnitConversionData.lastFontSize = sameRatioIndicators.fontSize;
                        var measurement = 100, unitRatios = {};
                        if (sameEmRatio && samePercentRatio) unitRatios.emToPx = callUnitConversionData.lastEmToPx, 
                        unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth, unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight; else {
                            var dummy = Data(element).isSVG ? document.createElementNS("http://www.w3.org/2000/svg", "rect") : document.createElement("div");
                            Velocity.init(dummy), sameRatioIndicators.myParent.appendChild(dummy), $.each([ "overflow", "overflowX", "overflowY" ], function(i, property) {
                                Velocity.CSS.setPropertyValue(dummy, property, "hidden");
                            }), Velocity.CSS.setPropertyValue(dummy, "position", sameRatioIndicators.position), 
                            Velocity.CSS.setPropertyValue(dummy, "fontSize", sameRatioIndicators.fontSize), 
                            Velocity.CSS.setPropertyValue(dummy, "boxSizing", "content-box"), $.each([ "minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height" ], function(i, property) {
                                Velocity.CSS.setPropertyValue(dummy, property, measurement + "%");
                            }), Velocity.CSS.setPropertyValue(dummy, "paddingLeft", measurement + "em"), unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth = (parseFloat(CSS.getPropertyValue(dummy, "width", null, !0)) || 1) / measurement, 
                            unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight = (parseFloat(CSS.getPropertyValue(dummy, "height", null, !0)) || 1) / measurement, 
                            unitRatios.emToPx = callUnitConversionData.lastEmToPx = (parseFloat(CSS.getPropertyValue(dummy, "paddingLeft")) || 1) / measurement, 
                            sameRatioIndicators.myParent.removeChild(dummy);
                        }
                        return null === callUnitConversionData.remToPx && (callUnitConversionData.remToPx = parseFloat(CSS.getPropertyValue(document.body, "fontSize")) || 16), 
                        null === callUnitConversionData.vwToPx && (callUnitConversionData.vwToPx = parseFloat(window.innerWidth) / 100, 
                        callUnitConversionData.vhToPx = parseFloat(window.innerHeight) / 100), unitRatios.remToPx = callUnitConversionData.remToPx, 
                        unitRatios.vwToPx = callUnitConversionData.vwToPx, unitRatios.vhToPx = callUnitConversionData.vhToPx, 
                        Velocity.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(unitRatios), element), 
                        unitRatios;
                    }
                    if (opts.begin && 0 === elementsIndex) try {
                        opts.begin.call(elements, elements);
                    } catch (error) {
                        setTimeout(function() {
                            throw error;
                        }, 1);
                    }
                    if ("scroll" === action) {
                        var scrollPositionCurrent, scrollPositionCurrentAlternate, scrollPositionEnd, scrollDirection = /^x$/i.test(opts.axis) ? "Left" : "Top", scrollOffset = parseFloat(opts.offset) || 0;
                        opts.container ? Type.isWrapped(opts.container) || Type.isNode(opts.container) ? (opts.container = opts.container[0] || opts.container, 
                        scrollPositionCurrent = opts.container["scroll" + scrollDirection], scrollPositionEnd = scrollPositionCurrent + $(element).position()[scrollDirection.toLowerCase()] + scrollOffset) : opts.container = null : (scrollPositionCurrent = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + scrollDirection]], 
                        scrollPositionCurrentAlternate = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + ("Left" === scrollDirection ? "Top" : "Left")]], 
                        scrollPositionEnd = $(element).offset()[scrollDirection.toLowerCase()] + scrollOffset), 
                        tweensContainer = {
                            scroll: {
                                rootPropertyValue: !1,
                                startValue: scrollPositionCurrent,
                                currentValue: scrollPositionCurrent,
                                endValue: scrollPositionEnd,
                                unitType: "",
                                easing: opts.easing,
                                scrollData: {
                                    container: opts.container,
                                    direction: scrollDirection,
                                    alternateValue: scrollPositionCurrentAlternate
                                }
                            },
                            element: element
                        }, Velocity.debug && console.log("tweensContainer (scroll): ", tweensContainer.scroll, element);
                    } else if ("reverse" === action) {
                        if (!Data(element).tweensContainer) return void $.dequeue(element, opts.queue);
                        "none" === Data(element).opts.display && (Data(element).opts.display = "auto"), 
                        "hidden" === Data(element).opts.visibility && (Data(element).opts.visibility = "visible"), 
                        Data(element).opts.loop = !1, Data(element).opts.begin = null, Data(element).opts.complete = null, 
                        options.easing || delete opts.easing, options.duration || delete opts.duration, 
                        opts = $.extend({}, Data(element).opts, opts);
                        var lastTweensContainer = $.extend(!0, {}, Data(element).tweensContainer);
                        for (var lastTween in lastTweensContainer) if ("element" !== lastTween) {
                            var lastStartValue = lastTweensContainer[lastTween].startValue;
                            lastTweensContainer[lastTween].startValue = lastTweensContainer[lastTween].currentValue = lastTweensContainer[lastTween].endValue, 
                            lastTweensContainer[lastTween].endValue = lastStartValue, Type.isEmptyObject(options) || (lastTweensContainer[lastTween].easing = opts.easing), 
                            Velocity.debug && console.log("reverse tweensContainer (" + lastTween + "): " + JSON.stringify(lastTweensContainer[lastTween]), element);
                        }
                        tweensContainer = lastTweensContainer;
                    } else if ("start" === action) {
                        var lastTweensContainer;
                        Data(element).tweensContainer && Data(element).isAnimating === !0 && (lastTweensContainer = Data(element).tweensContainer), 
                        $.each(propertiesMap, function(property, value) {
                            if (RegExp("^" + CSS.Lists.colors.join("$|^") + "$").test(property)) {
                                var valueData = parsePropertyValue(value, !0), endValue = valueData[0], easing = valueData[1], startValue = valueData[2];
                                if (CSS.RegEx.isHex.test(endValue)) {
                                    for (var colorComponents = [ "Red", "Green", "Blue" ], endValueRGB = CSS.Values.hexToRgb(endValue), startValueRGB = startValue ? CSS.Values.hexToRgb(startValue) : undefined, i = 0; i < colorComponents.length; i++) {
                                        var dataArray = [ endValueRGB[i] ];
                                        easing && dataArray.push(easing), startValueRGB !== undefined && dataArray.push(startValueRGB[i]), 
                                        propertiesMap[property + colorComponents[i]] = dataArray;
                                    }
                                    delete propertiesMap[property];
                                }
                            }
                        });
                        for (var property in propertiesMap) {
                            var valueData = parsePropertyValue(propertiesMap[property]), endValue = valueData[0], easing = valueData[1], startValue = valueData[2];
                            property = CSS.Names.camelCase(property);
                            var rootProperty = CSS.Hooks.getRoot(property), rootPropertyValue = !1;
                            if (Data(element).isSVG || CSS.Names.prefixCheck(rootProperty)[1] !== !1 || CSS.Normalizations.registered[rootProperty] !== undefined) {
                                (opts.display !== undefined && null !== opts.display && "none" !== opts.display || opts.visibility !== undefined && "hidden" !== opts.visibility) && /opacity|filter/.test(property) && !startValue && 0 !== endValue && (startValue = 0), 
                                opts._cacheValues && lastTweensContainer && lastTweensContainer[property] ? (startValue === undefined && (startValue = lastTweensContainer[property].endValue + lastTweensContainer[property].unitType), 
                                rootPropertyValue = Data(element).rootPropertyValueCache[rootProperty]) : CSS.Hooks.registered[property] ? startValue === undefined ? (rootPropertyValue = CSS.getPropertyValue(element, rootProperty), 
                                startValue = CSS.getPropertyValue(element, property, rootPropertyValue)) : rootPropertyValue = CSS.Hooks.templates[rootProperty][1] : startValue === undefined && (startValue = CSS.getPropertyValue(element, property));
                                var separatedValue, endValueUnitType, startValueUnitType, operator = !1;
                                if (separatedValue = separateValue(property, startValue), startValue = separatedValue[0], 
                                startValueUnitType = separatedValue[1], separatedValue = separateValue(property, endValue), 
                                endValue = separatedValue[0].replace(/^([+-\/*])=/, function(match, subMatch) {
                                    return operator = subMatch, "";
                                }), endValueUnitType = separatedValue[1], startValue = parseFloat(startValue) || 0, 
                                endValue = parseFloat(endValue) || 0, "%" === endValueUnitType && (/^(fontSize|lineHeight)$/.test(property) ? (endValue /= 100, 
                                endValueUnitType = "em") : /^scale/.test(property) ? (endValue /= 100, endValueUnitType = "") : /(Red|Green|Blue)$/i.test(property) && (endValue = endValue / 100 * 255, 
                                endValueUnitType = "")), /[\/*]/.test(operator)) endValueUnitType = startValueUnitType; else if (startValueUnitType !== endValueUnitType && 0 !== startValue) if (0 === endValue) endValueUnitType = startValueUnitType; else {
                                    elementUnitConversionData = elementUnitConversionData || calculateUnitRatios();
                                    var axis = /margin|padding|left|right|width|text|word|letter/i.test(property) || /X$/.test(property) || "x" === property ? "x" : "y";
                                    switch (startValueUnitType) {
                                      case "%":
                                        startValue *= "x" === axis ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight;
                                        break;

                                      case "px":
                                        break;

                                      default:
                                        startValue *= elementUnitConversionData[startValueUnitType + "ToPx"];
                                    }
                                    switch (endValueUnitType) {
                                      case "%":
                                        startValue *= 1 / ("x" === axis ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
                                        break;

                                      case "px":
                                        break;

                                      default:
                                        startValue *= 1 / elementUnitConversionData[endValueUnitType + "ToPx"];
                                    }
                                }
                                switch (operator) {
                                  case "+":
                                    endValue = startValue + endValue;
                                    break;

                                  case "-":
                                    endValue = startValue - endValue;
                                    break;

                                  case "*":
                                    endValue = startValue * endValue;
                                    break;

                                  case "/":
                                    endValue = startValue / endValue;
                                }
                                tweensContainer[property] = {
                                    rootPropertyValue: rootPropertyValue,
                                    startValue: startValue,
                                    currentValue: startValue,
                                    endValue: endValue,
                                    unitType: endValueUnitType,
                                    easing: easing
                                }, Velocity.debug && console.log("tweensContainer (" + property + "): " + JSON.stringify(tweensContainer[property]), element);
                            } else Velocity.debug && console.log("Skipping [" + rootProperty + "] due to a lack of browser support.");
                        }
                        tweensContainer.element = element;
                    }
                    tweensContainer.element && (CSS.Values.addClass(element, "velocity-animating"), 
                    call.push(tweensContainer), "" === opts.queue && (Data(element).tweensContainer = tweensContainer, 
                    Data(element).opts = opts), Data(element).isAnimating = !0, elementsIndex === elementsLength - 1 ? (Velocity.State.calls.length > 1e4 && (Velocity.State.calls = compactSparseArray(Velocity.State.calls)), 
                    Velocity.State.calls.push([ call, elements, opts, null, promiseData.resolver ]), 
                    Velocity.State.isTicking === !1 && (Velocity.State.isTicking = !0, tick())) : elementsIndex++);
                }
                var elementUnitConversionData, element = this, opts = $.extend({}, Velocity.defaults, options), tweensContainer = {};
                switch (Data(element) === undefined && Velocity.init(element), parseFloat(opts.delay) && opts.queue !== !1 && $.queue(element, opts.queue, function(next) {
                    Velocity.velocityQueueEntryFlag = !0, Data(element).delayTimer = {
                        setTimeout: setTimeout(next, parseFloat(opts.delay)),
                        next: next
                    };
                }), opts.duration.toString().toLowerCase()) {
                  case "fast":
                    opts.duration = 200;
                    break;

                  case "normal":
                    opts.duration = DURATION_DEFAULT;
                    break;

                  case "slow":
                    opts.duration = 600;
                    break;

                  default:
                    opts.duration = parseFloat(opts.duration) || 1;
                }
                Velocity.mock !== !1 && (Velocity.mock === !0 ? opts.duration = opts.delay = 1 : (opts.duration *= parseFloat(Velocity.mock) || 1, 
                opts.delay *= parseFloat(Velocity.mock) || 1)), opts.easing = getEasing(opts.easing, opts.duration), 
                opts.begin && !Type.isFunction(opts.begin) && (opts.begin = null), opts.progress && !Type.isFunction(opts.progress) && (opts.progress = null), 
                opts.complete && !Type.isFunction(opts.complete) && (opts.complete = null), opts.display !== undefined && null !== opts.display && (opts.display = opts.display.toString().toLowerCase(), 
                "auto" === opts.display && (opts.display = Velocity.CSS.Values.getDisplayType(element))), 
                opts.visibility !== undefined && null !== opts.visibility && (opts.visibility = opts.visibility.toString().toLowerCase()), 
                opts.mobileHA = opts.mobileHA && Velocity.State.isMobile && !Velocity.State.isGingerbread, 
                opts.queue === !1 ? opts.delay ? setTimeout(buildQueue, opts.delay) : buildQueue() : $.queue(element, opts.queue, function(next, clearQueue) {
                    return clearQueue === !0 ? (promiseData.promise && promiseData.resolver(elements), 
                    !0) : (Velocity.velocityQueueEntryFlag = !0, void buildQueue(next));
                }), "" !== opts.queue && "fx" !== opts.queue || "inprogress" === $.queue(element)[0] || $.dequeue(element);
            }
            var isUtility, elementsWrapped, argumentIndex, elements, propertiesMap, options, syntacticSugar = arguments[0] && ($.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || Type.isString(arguments[0].properties));
            if (Type.isWrapped(this) ? (isUtility = !1, argumentIndex = 0, elements = this, 
            elementsWrapped = this) : (isUtility = !0, argumentIndex = 1, elements = syntacticSugar ? arguments[0].elements : arguments[0]), 
            elements = sanitizeElements(elements)) {
                syntacticSugar ? (propertiesMap = arguments[0].properties, options = arguments[0].options) : (propertiesMap = arguments[argumentIndex], 
                options = arguments[argumentIndex + 1]);
                var elementsLength = elements.length, elementsIndex = 0;
                if ("stop" !== propertiesMap && !$.isPlainObject(options)) {
                    var startingArgumentPosition = argumentIndex + 1;
                    options = {};
                    for (var i = startingArgumentPosition; i < arguments.length; i++) Type.isArray(arguments[i]) || !/^(fast|normal|slow)$/i.test(arguments[i]) && !/^\d/.test(arguments[i]) ? Type.isString(arguments[i]) || Type.isArray(arguments[i]) ? options.easing = arguments[i] : Type.isFunction(arguments[i]) && (options.complete = arguments[i]) : options.duration = arguments[i];
                }
                var promiseData = {
                    promise: null,
                    resolver: null,
                    rejecter: null
                };
                isUtility && Velocity.Promise && (promiseData.promise = new Velocity.Promise(function(resolve, reject) {
                    promiseData.resolver = resolve, promiseData.rejecter = reject;
                }));
                var action;
                switch (propertiesMap) {
                  case "scroll":
                    action = "scroll";
                    break;

                  case "reverse":
                    action = "reverse";
                    break;

                  case "stop":
                    $.each(elements, function(i, element) {
                        Data(element) && Data(element).delayTimer && (clearTimeout(Data(element).delayTimer.setTimeout), 
                        Data(element).delayTimer.next && Data(element).delayTimer.next(), delete Data(element).delayTimer);
                    });
                    var callsToStop = [];
                    return $.each(Velocity.State.calls, function(i, activeCall) {
                        activeCall && $.each(activeCall[1], function(k, activeElement) {
                            var queueName = Type.isString(options) ? options : "";
                            return options !== undefined && activeCall[2].queue !== queueName ? !0 : void $.each(elements, function(l, element) {
                                element === activeElement && (options !== undefined && ($.each($.queue(element, queueName), function(_, item) {
                                    Type.isFunction(item) && item(null, !0);
                                }), $.queue(element, queueName, [])), Data(element) && "" === queueName && $.each(Data(element).tweensContainer, function(m, activeTween) {
                                    activeTween.endValue = activeTween.currentValue;
                                }), callsToStop.push(i));
                            });
                        });
                    }), $.each(callsToStop, function(i, j) {
                        completeCall(j, !0);
                    }), promiseData.promise && promiseData.resolver(elements), getChain();

                  default:
                    if (!$.isPlainObject(propertiesMap) || Type.isEmptyObject(propertiesMap)) {
                        if (Type.isString(propertiesMap) && Velocity.Redirects[propertiesMap]) {
                            var opts = $.extend({}, options), durationOriginal = opts.duration, delayOriginal = opts.delay || 0;
                            return opts.backwards === !0 && (elements = $.extend(!0, [], elements).reverse()), 
                            $.each(elements, function(elementIndex, element) {
                                parseFloat(opts.stagger) ? opts.delay = delayOriginal + parseFloat(opts.stagger) * elementIndex : Type.isFunction(opts.stagger) && (opts.delay = delayOriginal + opts.stagger.call(element, elementIndex, elementsLength)), 
                                opts.drag && (opts.duration = parseFloat(durationOriginal) || (/^(callout|transition)/.test(propertiesMap) ? 1e3 : DURATION_DEFAULT), 
                                opts.duration = Math.max(opts.duration * (opts.backwards ? 1 - elementIndex / elementsLength : (elementIndex + 1) / elementsLength), .75 * opts.duration, 200)), 
                                Velocity.Redirects[propertiesMap].call(element, element, opts || {}, elementIndex, elementsLength, elements, promiseData.promise ? promiseData : undefined);
                            }), getChain();
                        }
                        var abortError = "Velocity: First argument (" + propertiesMap + ") was not a property map, a known action, or a registered redirect. Aborting.";
                        return promiseData.promise ? promiseData.rejecter(new Error(abortError)) : console.log(abortError), 
                        getChain();
                    }
                    action = "start";
                }
                var callUnitConversionData = {
                    lastParent: null,
                    lastPosition: null,
                    lastFontSize: null,
                    lastPercentToPxWidth: null,
                    lastPercentToPxHeight: null,
                    lastEmToPx: null,
                    remToPx: null,
                    vwToPx: null,
                    vhToPx: null
                }, call = [];
                $.each(elements, function(i, element) {
                    Type.isNode(element) && processElement.call(element);
                });
                var reverseCallsCount, opts = $.extend({}, Velocity.defaults, options);
                if (opts.loop = parseInt(opts.loop), reverseCallsCount = 2 * opts.loop - 1, opts.loop) for (var x = 0; reverseCallsCount > x; x++) {
                    var reverseOptions = {
                        delay: opts.delay,
                        progress: opts.progress
                    };
                    x === reverseCallsCount - 1 && (reverseOptions.display = opts.display, reverseOptions.visibility = opts.visibility, 
                    reverseOptions.complete = opts.complete), animate(elements, "reverse", reverseOptions);
                }
                return getChain();
            }
        };
        Velocity = $.extend(animate, Velocity), Velocity.animate = animate;
        var ticker = window.requestAnimationFrame || rAFShim;
        return Velocity.State.isMobile || document.hidden === undefined || document.addEventListener("visibilitychange", function() {
            document.hidden ? (ticker = function(callback) {
                return setTimeout(function() {
                    callback(!0);
                }, 16);
            }, tick()) : ticker = window.requestAnimationFrame || rAFShim;
        }), global.Velocity = Velocity, global !== window && (global.fn.velocity = animate, 
        global.fn.velocity.defaults = Velocity.defaults), $.each([ "Down", "Up" ], function(i, direction) {
            Velocity.Redirects["slide" + direction] = function(element, options, elementsIndex, elementsSize, elements, promiseData) {
                var opts = $.extend({}, options), begin = opts.begin, complete = opts.complete, computedValues = {
                    height: "",
                    marginTop: "",
                    marginBottom: "",
                    paddingTop: "",
                    paddingBottom: ""
                }, inlineValues = {};
                opts.display === undefined && (opts.display = "Down" === direction ? "inline" === Velocity.CSS.Values.getDisplayType(element) ? "inline-block" : "block" : "none"), 
                opts.begin = function() {
                    begin && begin.call(elements, elements);
                    for (var property in computedValues) {
                        inlineValues[property] = element.style[property];
                        var propertyValue = Velocity.CSS.getPropertyValue(element, property);
                        computedValues[property] = "Down" === direction ? [ propertyValue, 0 ] : [ 0, propertyValue ];
                    }
                    inlineValues.overflow = element.style.overflow, element.style.overflow = "hidden";
                }, opts.complete = function() {
                    for (var property in inlineValues) element.style[property] = inlineValues[property];
                    complete && complete.call(elements, elements), promiseData && promiseData.resolver(elements);
                }, Velocity(element, computedValues, opts);
            };
        }), $.each([ "In", "Out" ], function(i, direction) {
            Velocity.Redirects["fade" + direction] = function(element, options, elementsIndex, elementsSize, elements, promiseData) {
                var opts = $.extend({}, options), propertiesMap = {
                    opacity: "In" === direction ? 1 : 0
                }, originalComplete = opts.complete;
                elementsIndex !== elementsSize - 1 ? opts.complete = opts.begin = null : opts.complete = function() {
                    originalComplete && originalComplete.call(elements, elements), promiseData && promiseData.resolver(elements);
                }, opts.display === undefined && (opts.display = "In" === direction ? "auto" : "none"), 
                Velocity(this, propertiesMap, opts);
            };
        }), Velocity;
    }(window.jQuery || window.Zepto || window, window, document);
}), function(factory) {
    "function" == typeof require && "object" == typeof exports ? module.exports = factory() : "function" == typeof define && define.amd ? define([ "velocity" ], factory) : factory();
}(function() {
    return function(global, window, document, undefined) {
        function greaterSemver(primary, secondary) {
            var versionInts = [];
            return primary && secondary ? ($.each([ primary, secondary ], function(i, versionObject) {
                var versionIntsComponents = [];
                $.each(versionObject, function(component, value) {
                    for (;value.toString().length < 5; ) value = "0" + value;
                    versionIntsComponents.push(value);
                }), versionInts.push(versionIntsComponents.join(""));
            }), parseFloat(versionInts[0]) > parseFloat(versionInts[1])) : !1;
        }
        if (!global.Velocity || !global.Velocity.Utilities) return void (window.console && console.log("Velocity UI Pack: Velocity must be loaded first. Aborting."));
        var Velocity = global.Velocity, $ = Velocity.Utilities, velocityVersion = Velocity.version, requiredVersion = {
            major: 1,
            minor: 1,
            patch: 0
        };
        if (greaterSemver(requiredVersion, velocityVersion)) {
            var abortError = "Velocity UI Pack: You need to update Velocity (jquery.velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";
            throw alert(abortError), new Error(abortError);
        }
        Velocity.RegisterEffect = Velocity.RegisterUI = function(effectName, properties) {
            function animateParentHeight(elements, direction, totalDuration, stagger) {
                var parentNode, totalHeightDelta = 0;
                $.each(elements.nodeType ? [ elements ] : elements, function(i, element) {
                    stagger && (totalDuration += i * stagger), parentNode = element.parentNode, $.each([ "height", "paddingTop", "paddingBottom", "marginTop", "marginBottom" ], function(i, property) {
                        totalHeightDelta += parseFloat(Velocity.CSS.getPropertyValue(element, property));
                    });
                }), Velocity.animate(parentNode, {
                    height: ("In" === direction ? "+" : "-") + "=" + totalHeightDelta
                }, {
                    queue: !1,
                    easing: "ease-in-out",
                    duration: totalDuration * ("In" === direction ? .6 : 1)
                });
            }
            return Velocity.Redirects[effectName] = function(element, redirectOptions, elementsIndex, elementsSize, elements, promiseData) {
                function injectFinalCallbacks() {
                    redirectOptions.display !== undefined && "none" !== redirectOptions.display || !/Out$/.test(effectName) || $.each(elements.nodeType ? [ elements ] : elements, function(i, element) {
                        Velocity.CSS.setPropertyValue(element, "display", "none");
                    }), redirectOptions.complete && redirectOptions.complete.call(elements, elements), 
                    promiseData && promiseData.resolver(elements || element);
                }
                var finalElement = elementsIndex === elementsSize - 1;
                "function" == typeof properties.defaultDuration ? properties.defaultDuration = properties.defaultDuration.call(elements, elements) : properties.defaultDuration = parseFloat(properties.defaultDuration);
                for (var callIndex = 0; callIndex < properties.calls.length; callIndex++) {
                    var call = properties.calls[callIndex], propertyMap = call[0], redirectDuration = redirectOptions.duration || properties.defaultDuration || 1e3, durationPercentage = call[1], callOptions = call[2] || {}, opts = {};
                    if (opts.duration = redirectDuration * (durationPercentage || 1), opts.queue = redirectOptions.queue || "", 
                    opts.easing = callOptions.easing || "ease", opts.delay = parseFloat(callOptions.delay) || 0, 
                    opts._cacheValues = callOptions._cacheValues || !0, 0 === callIndex) {
                        if (opts.delay += parseFloat(redirectOptions.delay) || 0, 0 === elementsIndex && (opts.begin = function() {
                            redirectOptions.begin && redirectOptions.begin.call(elements, elements);
                            var direction = effectName.match(/(In|Out)$/);
                            direction && "In" === direction[0] && propertyMap.opacity !== undefined && $.each(elements.nodeType ? [ elements ] : elements, function(i, element) {
                                Velocity.CSS.setPropertyValue(element, "opacity", 0);
                            }), redirectOptions.animateParentHeight && direction && animateParentHeight(elements, direction[0], redirectDuration + opts.delay, redirectOptions.stagger);
                        }), null !== redirectOptions.display) if (redirectOptions.display !== undefined && "none" !== redirectOptions.display) opts.display = redirectOptions.display; else if (/In$/.test(effectName)) {
                            var defaultDisplay = Velocity.CSS.Values.getDisplayType(element);
                            opts.display = "inline" === defaultDisplay ? "inline-block" : defaultDisplay;
                        }
                        redirectOptions.visibility && "hidden" !== redirectOptions.visibility && (opts.visibility = redirectOptions.visibility);
                    }
                    callIndex === properties.calls.length - 1 && (opts.complete = function() {
                        if (properties.reset) {
                            for (var resetProperty in properties.reset) {
                                var resetValue = properties.reset[resetProperty];
                                Velocity.CSS.Hooks.registered[resetProperty] !== undefined || "string" != typeof resetValue && "number" != typeof resetValue || (properties.reset[resetProperty] = [ properties.reset[resetProperty], properties.reset[resetProperty] ]);
                            }
                            var resetOptions = {
                                duration: 0,
                                queue: !1
                            };
                            finalElement && (resetOptions.complete = injectFinalCallbacks), Velocity.animate(element, properties.reset, resetOptions);
                        } else finalElement && injectFinalCallbacks();
                    }, "hidden" === redirectOptions.visibility && (opts.visibility = redirectOptions.visibility)), 
                    Velocity.animate(element, propertyMap, opts);
                }
            }, Velocity;
        }, Velocity.RegisterEffect.packagedEffects = {
            "callout.bounce": {
                defaultDuration: 550,
                calls: [ [ {
                    translateY: -30
                }, .25 ], [ {
                    translateY: 0
                }, .125 ], [ {
                    translateY: -15
                }, .125 ], [ {
                    translateY: 0
                }, .25 ] ]
            },
            "callout.shake": {
                defaultDuration: 800,
                calls: [ [ {
                    translateX: -11
                }, .125 ], [ {
                    translateX: 11
                }, .125 ], [ {
                    translateX: -11
                }, .125 ], [ {
                    translateX: 11
                }, .125 ], [ {
                    translateX: -11
                }, .125 ], [ {
                    translateX: 11
                }, .125 ], [ {
                    translateX: -11
                }, .125 ], [ {
                    translateX: 0
                }, .125 ] ]
            },
            "callout.flash": {
                defaultDuration: 1100,
                calls: [ [ {
                    opacity: [ 0, "easeInOutQuad", 1 ]
                }, .25 ], [ {
                    opacity: [ 1, "easeInOutQuad" ]
                }, .25 ], [ {
                    opacity: [ 0, "easeInOutQuad" ]
                }, .25 ], [ {
                    opacity: [ 1, "easeInOutQuad" ]
                }, .25 ] ]
            },
            "callout.pulse": {
                defaultDuration: 825,
                calls: [ [ {
                    scaleX: 1.1,
                    scaleY: 1.1
                }, .5 ], [ {
                    scaleX: 1,
                    scaleY: 1
                }, .5 ] ]
            },
            "callout.swing": {
                defaultDuration: 950,
                calls: [ [ {
                    rotateZ: 15
                }, .2 ], [ {
                    rotateZ: -10
                }, .2 ], [ {
                    rotateZ: 5
                }, .2 ], [ {
                    rotateZ: -5
                }, .2 ], [ {
                    rotateZ: 0
                }, .2 ] ]
            },
            "callout.tada": {
                defaultDuration: 1e3,
                calls: [ [ {
                    scaleX: .9,
                    scaleY: .9,
                    rotateZ: -3
                }, .1 ], [ {
                    scaleX: 1.1,
                    scaleY: 1.1,
                    rotateZ: 3
                }, .1 ], [ {
                    scaleX: 1.1,
                    scaleY: 1.1,
                    rotateZ: -3
                }, .1 ], [ "reverse", .125 ], [ "reverse", .125 ], [ "reverse", .125 ], [ "reverse", .125 ], [ "reverse", .125 ], [ {
                    scaleX: 1,
                    scaleY: 1,
                    rotateZ: 0
                }, .2 ] ]
            },
            "transition.fadeIn": {
                defaultDuration: 500,
                calls: [ [ {
                    opacity: [ 1, 0 ]
                } ] ]
            },
            "transition.fadeOut": {
                defaultDuration: 500,
                calls: [ [ {
                    opacity: [ 0, 1 ]
                } ] ]
            },
            "transition.flipXIn": {
                defaultDuration: 700,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    transformPerspective: [ 800, 800 ],
                    rotateY: [ 0, -55 ]
                } ] ],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipXOut": {
                defaultDuration: 700,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    transformPerspective: [ 800, 800 ],
                    rotateY: 55
                } ] ],
                reset: {
                    transformPerspective: 0,
                    rotateY: 0
                }
            },
            "transition.flipYIn": {
                defaultDuration: 800,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    transformPerspective: [ 800, 800 ],
                    rotateX: [ 0, -45 ]
                } ] ],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipYOut": {
                defaultDuration: 800,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    transformPerspective: [ 800, 800 ],
                    rotateX: 25
                } ] ],
                reset: {
                    transformPerspective: 0,
                    rotateX: 0
                }
            },
            "transition.flipBounceXIn": {
                defaultDuration: 900,
                calls: [ [ {
                    opacity: [ .725, 0 ],
                    transformPerspective: [ 400, 400 ],
                    rotateY: [ -10, 90 ]
                }, .5 ], [ {
                    opacity: .8,
                    rotateY: 10
                }, .25 ], [ {
                    opacity: 1,
                    rotateY: 0
                }, .25 ] ],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipBounceXOut": {
                defaultDuration: 800,
                calls: [ [ {
                    opacity: [ .9, 1 ],
                    transformPerspective: [ 400, 400 ],
                    rotateY: -10
                }, .5 ], [ {
                    opacity: 0,
                    rotateY: 90
                }, .5 ] ],
                reset: {
                    transformPerspective: 0,
                    rotateY: 0
                }
            },
            "transition.flipBounceYIn": {
                defaultDuration: 850,
                calls: [ [ {
                    opacity: [ .725, 0 ],
                    transformPerspective: [ 400, 400 ],
                    rotateX: [ -10, 90 ]
                }, .5 ], [ {
                    opacity: .8,
                    rotateX: 10
                }, .25 ], [ {
                    opacity: 1,
                    rotateX: 0
                }, .25 ] ],
                reset: {
                    transformPerspective: 0
                }
            },
            "transition.flipBounceYOut": {
                defaultDuration: 800,
                calls: [ [ {
                    opacity: [ .9, 1 ],
                    transformPerspective: [ 400, 400 ],
                    rotateX: -15
                }, .5 ], [ {
                    opacity: 0,
                    rotateX: 90
                }, .5 ] ],
                reset: {
                    transformPerspective: 0,
                    rotateX: 0
                }
            },
            "transition.swoopIn": {
                defaultDuration: 850,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    transformOriginX: [ "100%", "50%" ],
                    transformOriginY: [ "100%", "100%" ],
                    scaleX: [ 1, 0 ],
                    scaleY: [ 1, 0 ],
                    translateX: [ 0, -700 ],
                    translateZ: 0
                } ] ],
                reset: {
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.swoopOut": {
                defaultDuration: 850,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    transformOriginX: [ "50%", "100%" ],
                    transformOriginY: [ "100%", "100%" ],
                    scaleX: 0,
                    scaleY: 0,
                    translateX: -700,
                    translateZ: 0
                } ] ],
                reset: {
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    scaleX: 1,
                    scaleY: 1,
                    translateX: 0
                }
            },
            "transition.whirlIn": {
                defaultDuration: 850,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    transformOriginX: [ "50%", "50%" ],
                    transformOriginY: [ "50%", "50%" ],
                    scaleX: [ 1, 0 ],
                    scaleY: [ 1, 0 ],
                    rotateY: [ 0, 160 ]
                }, 1, {
                    easing: "easeInOutSine"
                } ] ]
            },
            "transition.whirlOut": {
                defaultDuration: 750,
                calls: [ [ {
                    opacity: [ 0, "easeInOutQuint", 1 ],
                    transformOriginX: [ "50%", "50%" ],
                    transformOriginY: [ "50%", "50%" ],
                    scaleX: 0,
                    scaleY: 0,
                    rotateY: 160
                }, 1, {
                    easing: "swing"
                } ] ],
                reset: {
                    scaleX: 1,
                    scaleY: 1,
                    rotateY: 0
                }
            },
            "transition.shrinkIn": {
                defaultDuration: 750,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    transformOriginX: [ "50%", "50%" ],
                    transformOriginY: [ "50%", "50%" ],
                    scaleX: [ 1, 1.5 ],
                    scaleY: [ 1, 1.5 ],
                    translateZ: 0
                } ] ]
            },
            "transition.shrinkOut": {
                defaultDuration: 600,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    transformOriginX: [ "50%", "50%" ],
                    transformOriginY: [ "50%", "50%" ],
                    scaleX: 1.3,
                    scaleY: 1.3,
                    translateZ: 0
                } ] ],
                reset: {
                    scaleX: 1,
                    scaleY: 1
                }
            },
            "transition.expandIn": {
                defaultDuration: 700,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    transformOriginX: [ "50%", "50%" ],
                    transformOriginY: [ "50%", "50%" ],
                    scaleX: [ 1, .625 ],
                    scaleY: [ 1, .625 ],
                    translateZ: 0
                } ] ]
            },
            "transition.expandOut": {
                defaultDuration: 700,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    transformOriginX: [ "50%", "50%" ],
                    transformOriginY: [ "50%", "50%" ],
                    scaleX: .5,
                    scaleY: .5,
                    translateZ: 0
                } ] ],
                reset: {
                    scaleX: 1,
                    scaleY: 1
                }
            },
            "transition.bounceIn": {
                defaultDuration: 800,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    scaleX: [ 1.05, .3 ],
                    scaleY: [ 1.05, .3 ]
                }, .4 ], [ {
                    scaleX: .9,
                    scaleY: .9,
                    translateZ: 0
                }, .2 ], [ {
                    scaleX: 1,
                    scaleY: 1
                }, .5 ] ]
            },
            "transition.bounceOut": {
                defaultDuration: 800,
                calls: [ [ {
                    scaleX: .95,
                    scaleY: .95
                }, .35 ], [ {
                    scaleX: 1.1,
                    scaleY: 1.1,
                    translateZ: 0
                }, .35 ], [ {
                    opacity: [ 0, 1 ],
                    scaleX: .3,
                    scaleY: .3
                }, .3 ] ],
                reset: {
                    scaleX: 1,
                    scaleY: 1
                }
            },
            "transition.bounceUpIn": {
                defaultDuration: 800,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    translateY: [ -30, 1e3 ]
                }, .6, {
                    easing: "easeOutCirc"
                } ], [ {
                    translateY: 10
                }, .2 ], [ {
                    translateY: 0
                }, .2 ] ]
            },
            "transition.bounceUpOut": {
                defaultDuration: 1e3,
                calls: [ [ {
                    translateY: 20
                }, .2 ], [ {
                    opacity: [ 0, "easeInCirc", 1 ],
                    translateY: -1e3
                }, .8 ] ],
                reset: {
                    translateY: 0
                }
            },
            "transition.bounceDownIn": {
                defaultDuration: 800,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    translateY: [ 30, -1e3 ]
                }, .6, {
                    easing: "easeOutCirc"
                } ], [ {
                    translateY: -10
                }, .2 ], [ {
                    translateY: 0
                }, .2 ] ]
            },
            "transition.bounceDownOut": {
                defaultDuration: 1e3,
                calls: [ [ {
                    translateY: -20
                }, .2 ], [ {
                    opacity: [ 0, "easeInCirc", 1 ],
                    translateY: 1e3
                }, .8 ] ],
                reset: {
                    translateY: 0
                }
            },
            "transition.bounceLeftIn": {
                defaultDuration: 750,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    translateX: [ 30, -1250 ]
                }, .6, {
                    easing: "easeOutCirc"
                } ], [ {
                    translateX: -10
                }, .2 ], [ {
                    translateX: 0
                }, .2 ] ]
            },
            "transition.bounceLeftOut": {
                defaultDuration: 750,
                calls: [ [ {
                    translateX: 30
                }, .2 ], [ {
                    opacity: [ 0, "easeInCirc", 1 ],
                    translateX: -1250
                }, .8 ] ],
                reset: {
                    translateX: 0
                }
            },
            "transition.bounceRightIn": {
                defaultDuration: 750,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    translateX: [ -30, 1250 ]
                }, .6, {
                    easing: "easeOutCirc"
                } ], [ {
                    translateX: 10
                }, .2 ], [ {
                    translateX: 0
                }, .2 ] ]
            },
            "transition.bounceRightOut": {
                defaultDuration: 750,
                calls: [ [ {
                    translateX: -30
                }, .2 ], [ {
                    opacity: [ 0, "easeInCirc", 1 ],
                    translateX: 1250
                }, .8 ] ],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideUpIn": {
                defaultDuration: 900,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    translateY: [ 0, 20 ],
                    translateZ: 0
                } ] ]
            },
            "transition.slideUpOut": {
                defaultDuration: 900,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    translateY: -20,
                    translateZ: 0
                } ] ],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideDownIn": {
                defaultDuration: 900,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    translateY: [ 0, -20 ],
                    translateZ: 0
                } ] ]
            },
            "transition.slideDownOut": {
                defaultDuration: 900,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    translateY: 20,
                    translateZ: 0
                } ] ],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideLeftIn": {
                defaultDuration: 1e3,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    translateX: [ 0, -20 ],
                    translateZ: 0
                } ] ]
            },
            "transition.slideLeftOut": {
                defaultDuration: 1050,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    translateX: -20,
                    translateZ: 0
                } ] ],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideRightIn": {
                defaultDuration: 1e3,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    translateX: [ 0, 20 ],
                    translateZ: 0
                } ] ]
            },
            "transition.slideRightOut": {
                defaultDuration: 1050,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    translateX: 20,
                    translateZ: 0
                } ] ],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideUpBigIn": {
                defaultDuration: 850,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    translateY: [ 0, 75 ],
                    translateZ: 0
                } ] ]
            },
            "transition.slideUpBigOut": {
                defaultDuration: 800,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    translateY: -75,
                    translateZ: 0
                } ] ],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideDownBigIn": {
                defaultDuration: 850,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    translateY: [ 0, -75 ],
                    translateZ: 0
                } ] ]
            },
            "transition.slideDownBigOut": {
                defaultDuration: 800,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    translateY: 75,
                    translateZ: 0
                } ] ],
                reset: {
                    translateY: 0
                }
            },
            "transition.slideLeftBigIn": {
                defaultDuration: 800,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    translateX: [ 0, -75 ],
                    translateZ: 0
                } ] ]
            },
            "transition.slideLeftBigOut": {
                defaultDuration: 750,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    translateX: -75,
                    translateZ: 0
                } ] ],
                reset: {
                    translateX: 0
                }
            },
            "transition.slideRightBigIn": {
                defaultDuration: 800,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    translateX: [ 0, 75 ],
                    translateZ: 0
                } ] ]
            },
            "transition.slideRightBigOut": {
                defaultDuration: 750,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    translateX: 75,
                    translateZ: 0
                } ] ],
                reset: {
                    translateX: 0
                }
            },
            "transition.perspectiveUpIn": {
                defaultDuration: 800,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    transformPerspective: [ 800, 800 ],
                    transformOriginX: [ 0, 0 ],
                    transformOriginY: [ "100%", "100%" ],
                    rotateX: [ 0, -180 ]
                } ] ]
            },
            "transition.perspectiveUpOut": {
                defaultDuration: 850,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    transformPerspective: [ 800, 800 ],
                    transformOriginX: [ 0, 0 ],
                    transformOriginY: [ "100%", "100%" ],
                    rotateX: -180
                } ] ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateX: 0
                }
            },
            "transition.perspectiveDownIn": {
                defaultDuration: 800,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    transformPerspective: [ 800, 800 ],
                    transformOriginX: [ 0, 0 ],
                    transformOriginY: [ 0, 0 ],
                    rotateX: [ 0, 180 ]
                } ] ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveDownOut": {
                defaultDuration: 850,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    transformPerspective: [ 800, 800 ],
                    transformOriginX: [ 0, 0 ],
                    transformOriginY: [ 0, 0 ],
                    rotateX: 180
                } ] ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateX: 0
                }
            },
            "transition.perspectiveLeftIn": {
                defaultDuration: 950,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    transformPerspective: [ 2e3, 2e3 ],
                    transformOriginX: [ 0, 0 ],
                    transformOriginY: [ 0, 0 ],
                    rotateY: [ 0, -180 ]
                } ] ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveLeftOut": {
                defaultDuration: 950,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    transformPerspective: [ 2e3, 2e3 ],
                    transformOriginX: [ 0, 0 ],
                    transformOriginY: [ 0, 0 ],
                    rotateY: -180
                } ] ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateY: 0
                }
            },
            "transition.perspectiveRightIn": {
                defaultDuration: 950,
                calls: [ [ {
                    opacity: [ 1, 0 ],
                    transformPerspective: [ 2e3, 2e3 ],
                    transformOriginX: [ "100%", "100%" ],
                    transformOriginY: [ 0, 0 ],
                    rotateY: [ 0, 180 ]
                } ] ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%"
                }
            },
            "transition.perspectiveRightOut": {
                defaultDuration: 950,
                calls: [ [ {
                    opacity: [ 0, 1 ],
                    transformPerspective: [ 2e3, 2e3 ],
                    transformOriginX: [ "100%", "100%" ],
                    transformOriginY: [ 0, 0 ],
                    rotateY: 180
                } ] ],
                reset: {
                    transformPerspective: 0,
                    transformOriginX: "50%",
                    transformOriginY: "50%",
                    rotateY: 0
                }
            }
        };
        for (var effectName in Velocity.RegisterEffect.packagedEffects) Velocity.RegisterEffect(effectName, Velocity.RegisterEffect.packagedEffects[effectName]);
        Velocity.RunSequence = function(originalSequence) {
            var sequence = $.extend(!0, [], originalSequence);
            sequence.length > 1 && ($.each(sequence.reverse(), function(i, currentCall) {
                var nextCall = sequence[i + 1];
                if (nextCall) {
                    var timing = currentCall.options && currentCall.options.sequenceQueue === !1 ? "begin" : "complete", callbackOriginal = nextCall.options && nextCall.options[timing], options = {};
                    options[timing] = function() {
                        var elements = nextCall.elements.nodeType ? [ nextCall.elements ] : nextCall.elements;
                        callbackOriginal && callbackOriginal.call(elements, elements), Velocity(currentCall);
                    }, nextCall.options = $.extend({}, nextCall.options, options);
                }
            }), sequence.reverse()), Velocity(sequence[0]);
        };
    }(window.jQuery || window.Zepto || window, window, document);
}), function(window, $, undefined) {
    var getComputedStyle = document.defaultView && document.defaultView.getComputedStyle, rupper = /([A-Z])/g, rdashAlpha = /-([a-z])/gi, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    }, getStyle = function(elem) {
        return getComputedStyle ? getComputedStyle(elem, null) : elem.currentStyle ? elem.currentStyle : void 0;
    }, rfloat = /float/i, rnumpx = /^-?\d+(?:px)?$/i, rnum = /^-?\d/;
    $.styles = function(el, styles) {
        if (!el) return null;
        for (var oldName, val, left, rsLeft, camelCase, name, currentS = getStyle(el), style = el.style, results = {}, i = 0; i < styles.length; i++) name = styles[i], 
        oldName = name.replace(rdashAlpha, fcamelCase), rfloat.test(name) && (name = $.support.cssFloat ? "float" : "styleFloat", 
        oldName = "cssFloat"), getComputedStyle ? (name = name.replace(rupper, "-$1").toLowerCase(), 
        val = currentS.getPropertyValue(name), "opacity" === name && "" === val && (val = "1"), 
        results[oldName] = val) : (camelCase = name.replace(rdashAlpha, fcamelCase), results[oldName] = currentS[name] || currentS[camelCase], 
        !rnumpx.test(results[oldName]) && rnum.test(results[oldName]) && (left = style.left, 
        rsLeft = el.runtimeStyle.left, el.runtimeStyle.left = el.currentStyle.left, style.left = "fontSize" === camelCase ? "1em" : results[oldName] || 0, 
        results[oldName] = style.pixelLeft + "px", style.left = left, el.runtimeStyle.left = rsLeft));
        return results;
    }, $.fn.styles = function() {
        return $.styles(this[0], $.makeArray(arguments));
    };
    var animationNum = 0, styleSheet = null, cache = [], browser = null, oldanimate = $.fn.animate, getStyleSheet = function() {
        if (!styleSheet) {
            var style = document.createElement("style");
            style.setAttribute("type", "text/css"), style.setAttribute("media", "screen"), document.getElementsByTagName("head")[0].appendChild(style), 
            window.createPopup || style.appendChild(document.createTextNode("")), styleSheet = style.sheet;
        }
        return styleSheet;
    }, removeAnimation = function(sheet, name) {
        for (var j = sheet.cssRules.length - 1; j >= 0; j--) {
            var rule = sheet.cssRules[j];
            if (7 === rule.type && rule.name == name) return void sheet.deleteRule(j);
        }
    }, passThrough = function(props, ops) {
        var nonElement = !(this[0] && this[0].nodeType), isInline = !nonElement && "inline" === $(this).css("display") && "none" === $(this).css("float");
        for (var name in props) if ("show" == props[name] || "hide" == props[name] || "toggle" == props[name] || $.isArray(props[name]) || props[name] < 0 || "zIndex" == name || "z-index" == name || "scrollTop" == name || "scrollLeft" == name) return !0;
        return props.jquery === !0 || null === getBrowser() || $.isEmptyObject(props) || ops && 4 == ops.length || ops && "string" == typeof ops[2] || $.isPlainObject(ops) || isInline || nonElement;
    }, cssValue = function(origName, value) {
        return "number" != typeof value || $.cssNumber[origName] ? value : value += "px";
    }, getBrowser = function() {
        if (!browser) {
            var t, el = document.createElement("fakeelement"), transitions = {
                transition: {
                    transitionEnd: "transitionEnd",
                    prefix: ""
                },
                MozTransition: {
                    transitionEnd: "animationend",
                    prefix: "-moz-"
                },
                WebkitTransition: {
                    transitionEnd: "webkitAnimationEnd",
                    prefix: "-webkit-"
                }
            };
            for (t in transitions) el.style[t] !== undefined && (browser = transitions[t]);
        }
        return browser;
    }, ffProps = {
        top: function(el) {
            return el.position().top;
        },
        left: function(el) {
            return el.position().left;
        },
        width: function(el) {
            return el.width();
        },
        height: function(el) {
            return el.height();
        },
        fontSize: function(el) {
            return "1em";
        }
    }, addPrefix = function(properties) {
        var result = {};
        return $.each(properties, function(name, value) {
            result[getBrowser().prefix + name] = value;
        }), result;
    }, getAnimation = function(style) {
        var sheet, name, last;
        return $.each(cache, function(i, animation) {
            style === animation.style ? (name = animation.name, animation.age = 0) : animation.age += 1;
        }), name || (sheet = getStyleSheet(), name = "jquerypp_animation_" + animationNum++, 
        sheet.insertRule("@" + getBrowser().prefix + "keyframes " + name + " " + style, sheet.cssRules && sheet.cssRules.length || 0), 
        cache.push({
            name: name,
            style: style,
            age: 0
        }), cache.sort(function(first, second) {
            return first.age - second.age;
        }), cache.length > 20 && (last = cache.pop(), removeAnimation(sheet, last.name))), 
        name;
    };
    $.fn.animate = function(props, speed, easing, callback) {
        if (passThrough.apply(this, arguments)) return oldanimate.apply(this, arguments);
        var optall = $.speed(speed, easing, callback);
        return this.queue(optall.queue, function(done) {
            var current, prop, animationName, dataKey, properties = [], to = "", self = $(this), duration = optall.duration, style = "{ from {", animationEnd = function(currentCSS, exec) {
                self.css(currentCSS), self.css(addPrefix({
                    "animation-duration": "",
                    "animation-name": "",
                    "animation-fill-mode": "",
                    "animation-play-state": ""
                })), $.isFunction(optall.old) && exec && optall.old.call(self[0], !0), $.removeData(self, dataKey, !0);
            }, finishAnimation = function() {
                animationEnd(props, !0), done();
            };
            for (prop in props) properties.push(prop);
            "-moz-" === getBrowser().prefix && $.each(properties, function(i, prop) {
                var converter = ffProps[$.camelCase(prop)];
                converter && "auto" == self.css(prop) && self.css(prop, converter(self));
            }), current = self.styles.apply(self, properties), $.each(properties, function(i, cur) {
                var name = cur.replace(/([A-Z]|^ms)/g, "-$1").toLowerCase();
                style += name + " : " + cssValue(cur, current[cur]) + "; ", to += name + " : " + cssValue(cur, props[cur]) + "; ";
            }), style += "} to {" + to + " }}", animationName = getAnimation(style), dataKey = animationName + ".run", 
            $._data(this, dataKey, {
                stop: function(gotoEnd) {
                    self.css(addPrefix({
                        "animation-play-state": "paused"
                    })), self.off(getBrowser().transitionEnd, finishAnimation), gotoEnd ? animationEnd(props, !0) : animationEnd(self.styles.apply(self, properties), !1);
                }
            }), self.css(addPrefix({
                "animation-duration": duration + "ms",
                "animation-name": animationName,
                "animation-fill-mode": "forwards"
            })), self.one(getBrowser().transitionEnd, finishAnimation);
        }), this;
    }, $.fn.compare = function(element) {
        try {
            element = element.jquery ? element[0] : element;
        } catch (e) {
            return null;
        }
        if (window.HTMLElement) {
            var s = HTMLElement.prototype.toString.call(element);
            if ("[xpconnect wrapped native prototype]" == s || "[object XULElement]" == s || "[object Window]" === s) return null;
        }
        if (this[0].compareDocumentPosition) return this[0].compareDocumentPosition(element);
        if (this[0] == document && element != document) return 8;
        var number = (this[0] !== element && this[0].contains(element) && 16) + (this[0] != element && element.contains(this[0]) && 8), docEl = document.documentElement;
        return this[0].sourceIndex && (number += this[0].sourceIndex < element.sourceIndex && 4, 
        number += this[0].sourceIndex > element.sourceIndex && 2, number += (this[0].ownerDocument !== element.ownerDocument || this[0] != docEl && this[0].sourceIndex <= 0 || element != docEl && element.sourceIndex <= 0) && 1), 
        number;
    }, $.toJSON = function(o, replacer, space, recurse) {
        if ("object" == typeof JSON && JSON.stringify) return JSON.stringify(o, replacer, space);
        !recurse && $.isFunction(replacer) && (o = replacer("", o)), "number" == typeof space && (space = "          ".substring(0, space)), 
        space = "string" == typeof space ? space.substring(0, 10) : "";
        var type = typeof o;
        if (null === o) return "null";
        if ("undefined" == type || "function" == type) return undefined;
        if ("number" == type || "boolean" == type) return o + "";
        if ("string" == type) return $.quoteString(o);
        if ("object" == type) {
            if ("function" == typeof o.toJSON) return $.toJSON(o.toJSON(), replacer, space, !0);
            if (o.constructor === Date) {
                var month = o.getUTCMonth() + 1;
                10 > month && (month = "0" + month);
                var day = o.getUTCDate();
                10 > day && (day = "0" + day);
                var year = o.getUTCFullYear(), hours = o.getUTCHours();
                10 > hours && (hours = "0" + hours);
                var minutes = o.getUTCMinutes();
                10 > minutes && (minutes = "0" + minutes);
                var seconds = o.getUTCSeconds();
                10 > seconds && (seconds = "0" + seconds);
                var milli = o.getUTCMilliseconds();
                return 100 > milli && (milli = "0" + milli), 10 > milli && (milli = "0" + milli), 
                '"' + year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds + "." + milli + 'Z"';
            }
            var process = $.isFunction(replacer) ? function(k, v) {
                return replacer(k, v);
            } : function(k, v) {
                return v;
            }, nl = space ? "\n" : "", sp = space ? " " : "";
            if (o.constructor === Array) {
                for (var ret = [], i = 0; i < o.length; i++) ret.push(($.toJSON(process(i, o[i]), replacer, space, !0) || "null").replace(/^/gm, space));
                return "[" + nl + ret.join("," + nl) + nl + "]";
            }
            var proplist, pairs = [];
            $.isArray(replacer) && (proplist = $.map(replacer, function(v) {
                return "string" == typeof v || "number" == typeof v ? v + "" : null;
            }));
            for (var k in o) {
                var name, val, type = typeof k;
                if (!proplist || -1 != $.inArray(k + "", proplist)) {
                    if ("number" == type) name = '"' + k + '"'; else {
                        if ("string" != type) continue;
                        name = $.quoteString(k);
                    }
                    val = $.toJSON(process(k, o[k]), replacer, space, !0), "undefined" != typeof val && pairs.push((name + ":" + sp + val).replace(/^/gm, space));
                }
            }
            return "{" + nl + pairs.join("," + nl) + nl + "}";
        }
    }, $.evalJSON = function(src) {
        return "object" == typeof JSON && JSON.parse ? JSON.parse(src) : eval("(" + src + ")");
    }, $.secureEvalJSON = function(src) {
        if ("object" == typeof JSON && JSON.parse) return JSON.parse(src);
        var filtered = src;
        if (filtered = filtered.replace(/\\["\\\/bfnrtu]/g, "@"), filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]"), 
        filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, ""), /^[\],:{}\s]*$/.test(filtered)) return eval("(" + src + ")");
        throw new SyntaxError("Error parsing JSON, source is not valid.");
    }, $.quoteString = function(string) {
        return string.match(_escapeable) ? '"' + string.replace(_escapeable, function(a) {
            var c = _meta[a];
            return "string" == typeof c ? c : (c = a.charCodeAt(), "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16));
        }) + '"' : '"' + string + '"';
    };
    var _escapeable = /["\\\x00-\x1f\x7f-\x9f]/g, _meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    };
    $.cookie = function(name, value, options) {
        if ("undefined" == typeof value) {
            var cookieValue = null;
            if (document.cookie && "" != document.cookie) for (var cookies = document.cookie.split(";"), i = 0; i < cookies.length; i++) {
                var cookie = $.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == name + "=") {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
            if ($.evalJSON && cookieValue && cookieValue.match(/^\s*\{/)) try {
                cookieValue = $.evalJSON(cookieValue);
            } catch (e) {}
            return cookieValue;
        }
        options = options || {}, null === value && (value = "", options.expires = -1), "object" == typeof value && $.toJSON && (value = $.toJSON(value));
        var expires = "";
        if (options.expires && ("number" == typeof options.expires || options.expires.toUTCString)) {
            var date;
            "number" == typeof options.expires ? (date = new Date(), date.setTime(date.getTime() + 24 * options.expires * 60 * 60 * 1e3)) : date = options.expires, 
            expires = "; expires=" + date.toUTCString();
        }
        var path = options.path ? "; path=" + options.path : "", domain = options.domain ? "; domain=" + options.domain : "", secure = options.secure ? "; secure" : "";
        document.cookie = [ name, "=", encodeURIComponent(value), expires, path, domain, secure ].join("");
    };
    var weird = /button|select/i, getBoxes = {}, checks = {
        width: [ "Left", "Right" ],
        height: [ "Top", "Bottom" ],
        oldOuterHeight: $.fn.outerHeight,
        oldOuterWidth: $.fn.outerWidth,
        oldInnerWidth: $.fn.innerWidth,
        oldInnerHeight: $.fn.innerHeight
    }, supportsSetter = $.fn.jquery >= "1.8.0";
    $.each({
        width: "Width",
        height: "Height"
    }, function(lower, Upper) {
        getBoxes[lower] = function(el, boxes) {
            var val = 0;
            if (!weird.test(el.nodeName)) {
                var myChecks = [];
                $.each(checks[lower], function() {
                    var direction = this;
                    $.each(boxes, function(name, val) {
                        val && myChecks.push(name + direction + ("border" == name ? "Width" : ""));
                    });
                }), $.each($.styles(el, myChecks), function(name, value) {
                    val += parseFloat(value) || 0;
                });
            }
            return val;
        }, supportsSetter || ($.fn["outer" + Upper] = function(v, margin) {
            var first = this[0];
            return "number" == typeof v ? (first && this[lower](v - getBoxes[lower](first, {
                padding: !0,
                border: !0,
                margin: margin
            })), this) : first ? checks["oldOuter" + Upper].apply(this, arguments) : null;
        }, $.fn["inner" + Upper] = function(v) {
            var first = this[0];
            return "number" == typeof v ? (first && this[lower](v - getBoxes[lower](first, {
                padding: !0
            })), this) : first ? checks["oldInner" + Upper].apply(this, arguments) : null;
        });
        var animate = function(boxes) {
            return function(fx) {
                0 == fx[supportsSetter ? "pos" : "state"] && (fx.start = $(fx.elem)[lower](), fx.end = fx.end - getBoxes[lower](fx.elem, boxes)), 
                fx.elem.style[lower] = fx.pos * (fx.end - fx.start) + fx.start + "px";
            };
        };
        $.fx.step["outer" + Upper] = animate({
            padding: !0,
            border: !0
        }), $.fx.step["outer" + Upper + "Margin"] = animate({
            padding: !0,
            border: !0,
            margin: !0
        }), $.fx.step["inner" + Upper] = animate({
            padding: !0
        });
    });
    var keyBreaker = /[^\[\]]+/g, convertValue = function(value) {
        return $.isNumeric(value) ? parseFloat(value) : "true" === value ? !0 : "false" === value ? !1 : "" === value || null === value ? undefined : value;
    }, nestData = function(elem, type, data, parts, value, seen, fullName) {
        var name = parts.shift();
        if (fullName = fullName ? fullName + "." + name : name, parts.length) data[name] || (data[name] = {}), 
        nestData(elem, type, data[name], parts, value, seen, fullName); else {
            if (fullName in seen && "radio" != type && !$.isArray(data[name]) ? name in data ? data[name] = [ data[name] ] : data[name] = [] : seen[fullName] = !0, 
            ("radio" == type || "checkbox" == type) && !elem.is(":checked")) return;
            data[name] ? data[name].push(value) : data[name] = value;
        }
    };
    $.fn.extend({
        formParams: function(params) {
            var convert;
            return !!params === params && (convert = params, params = null), params ? this.setParams(params) : this.getParams(convert);
        },
        setParams: function(params) {
            this.find("[name]").each(function() {
                var $this = $(this), value = params[$this.attr("name")];
                value !== undefined && ($this.is(":radio") ? $this.val() == value && $this.attr("checked", !0) : $this.is(":checkbox") ? (value = $.isArray(value) ? value : [ value ], 
                $.inArray($this.val(), value) > -1 && $this.attr("checked", !0)) : $this.val(value));
            });
        },
        getParams: function(convert) {
            var data = {}, seen = {};
            return this.find("[name]:not(:disabled)").each(function() {
                var parts, $this = $(this), type = $this.attr("type"), name = $this.attr("name"), value = $this.val();
                "submit" != type && name && (parts = name.match(keyBreaker), parts.length || (parts = [ name ]), 
                convert && (value = convertValue(value)), nestData($this, type, data, parts, value, seen));
            }), data;
        }
    }), $.fn.range = function() {
        return $.Range(this[0]);
    };
    var convertType = function(type) {
        return type.replace(/([a-z])([a-z]+)/gi, function(all, first, next) {
            return first + next.toLowerCase();
        }).replace(/_/g, "");
    }, reverse = function(type) {
        return type.replace(/^([a-z]+)_TO_([a-z]+)/i, function(all, first, last) {
            return last + "_TO_" + first;
        });
    }, getWindow = function(element) {
        return element ? element.ownerDocument.defaultView || element.ownerDocument.parentWindow : window;
    }, bisect = function(el, start, end) {
    }, support = {};
    $.Range = function(range) {
        return this.constructor !== $.Range ? new $.Range(range) : (range && range.jquery && (range = range[0]), 
        void (!range || range.nodeType ? (this.win = getWindow(range), this.win.document.createRange ? this.range = this.win.document.createRange() : this.win && this.win.document.body && this.win.document.body.createTextRange && (this.range = this.win.document.body.createTextRange()), 
        range && this.select(range)) : null != range.clientX || null != range.pageX || null != range.left ? this.moveToPoint(range) : range.originalEvent && range.originalEvent.touches && range.originalEvent.touches.length ? this.moveToPoint(range.originalEvent.touches[0]) : range.originalEvent && range.originalEvent.changedTouches && range.originalEvent.changedTouches.length ? this.moveToPoint(range.originalEvent.changedTouches[0]) : this.range = range));
    }, $.Range.current = function(el) {
        var selection, win = getWindow(el);
        return win.getSelection ? (selection = win.getSelection(), new $.Range(selection.rangeCount ? selection.getRangeAt(0) : win.document.createRange())) : new $.Range(win.document.selection.createRange());
    }, $.extend($.Range.prototype, {
        moveToPoint: function(point) {
            var clientX = point.clientX, clientY = point.clientY;
            if (!clientX) {
                var off = scrollOffset();
                clientX = (point.pageX || point.left || 0) - off.left, clientY = (point.pageY || point.top || 0) - off.top;
            }
            if (support.moveToPoint) return this.range = $.Range().range, this.range.moveToPoint(clientX, clientY), 
            this;
            for (var parent = document.elementFromPoint(clientX, clientY), n = 0; n < parent.childNodes.length; n++) {
                var node = parent.childNodes[n];
                if (3 === node.nodeType || 4 === node.nodeType) for (var range = $.Range(node), length = range.toString().length, i = 1; length + 1 > i; i++) {
                    var rect = range.end(i).rect();
                    if (rect.left <= clientX && rect.left + rect.width >= clientX && rect.top <= clientY && rect.top + rect.height >= clientY) return range.start(i - 1), 
                    this.range = range.range, this;
                }
            }
            var previous;
            iterate(parent.childNodes, function(textNode) {
                var range = $.Range(textNode);
                return range.rect().top > point.clientY ? !1 : void (previous = range);
            }), previous ? (previous.start(previous.toString().length), this.range = previous.range) : this.range = $.Range(parent).range;
        },
        window: function() {
            return this.win || window;
        },
        overlaps: function(elRange) {
            elRange.nodeType && (elRange = $.Range(elRange).select(elRange));
            var startToStart = this.compare("START_TO_START", elRange), endToEnd = this.compare("END_TO_END", elRange);
            return 0 >= startToStart && endToEnd >= 0 ? !0 : startToStart >= 0 && this.compare("START_TO_END", elRange) <= 0 ? !0 : this.compare("END_TO_START", elRange) >= 0 && 0 >= endToEnd ? !0 : !1;
        },
        collapse: function(toStart) {
            return this.range.collapse(toStart === undefined ? !0 : toStart), this;
        },
        toString: function() {
            return "string" == typeof this.range.text ? this.range.text : this.range.toString();
        },
        start: function(set) {
            if (set === undefined) {
                if (this.range.startContainer) return {
                    container: this.range.startContainer,
                    offset: this.range.startOffset
                };
                var start = this.clone().collapse().parent(), startRange = $.Range(start).select(start).collapse();
                return startRange.move("END_TO_START", this), {
                    container: start,
                    offset: startRange.toString().length
                };
            }
            if (this.range.setStart) if ("number" == typeof set) this.range.setStart(this.range.startContainer, set); else if ("string" == typeof set) {
                var res = callMove(this.range.startContainer, this.range.startOffset, parseInt(set, 10));
                this.range.setStart(res.node, res.offset);
            } else this.range.setStart(set.container, set.offset); else if ("string" == typeof set) this.range.moveStart("character", parseInt(set, 10)); else {
                var offset, container = this.start().container;
                "number" == typeof set ? offset = set : (container = set.container, offset = set.offset);
                var newPoint = $.Range(container).collapse();
                newPoint.range.move(offset), this.move("START_TO_START", newPoint);
            }
            return this;
        },
        end: function(set) {
            if (set === undefined) {
                if (this.range.startContainer) return {
                    container: this.range.endContainer,
                    offset: this.range.endOffset
                };
                var end = this.clone().collapse(!1).parent(), endRange = $.Range(end).select(end).collapse();
                return endRange.move("END_TO_END", this), {
                    container: end,
                    offset: endRange.toString().length
                };
            }
            if (this.range.setEnd) if ("number" == typeof set) this.range.setEnd(this.range.endContainer, set); else if ("string" == typeof set) {
                var res = callMove(this.range.endContainer, this.range.endOffset, parseInt(set, 10));
                this.range.setEnd(res.node, res.offset);
            } else this.range.setEnd(set.container, set.offset); else if ("string" == typeof set) this.range.moveEnd("character", parseInt(set, 10)); else {
                var offset, container = this.end().container;
                "number" == typeof set ? offset = set : (container = set.container, offset = set.offset);
                var newPoint = $.Range(container).collapse();
                newPoint.range.move(offset), this.move("END_TO_START", newPoint);
            }
            return this;
        },
        parent: function() {
            if (this.range.commonAncestorContainer) return this.range.commonAncestorContainer;
            var parentElement = this.range.parentElement(), range = this.range;
            return iterate(parentElement.childNodes, function(txtNode) {
                return $.Range(txtNode).range.inRange(range) ? (parentElement = txtNode, !1) : void 0;
            }), parentElement;
        },
        rect: function(from) {
            var rect = this.range.getBoundingClientRect();
            if (rect.height || rect.width || (rect = this.range.getClientRects()[0]), "page" === from) {
                var off = scrollOffset();
                rect = $.extend({}, rect), rect.top += off.top, rect.left += off.left;
            }
            return rect;
        },
        rects: function(from) {
            var j, rects = $.map($.makeArray(this.range.getClientRects()).sort(function(rect1, rect2) {
                return rect2.width * rect2.height - rect1.width * rect1.height;
            }), function(rect) {
                return $.extend({}, rect);
            }), i = 0;
            for (rects.length; i < rects.length; ) {
                var cur = rects[i], found = !1;
                for (j = i + 1; j < rects.length; ) if (withinRect(cur, rects[j])) {
                    if (rects[j].width) {
                        found = rects[j];
                        break;
                    }
                    rects.splice(j, 1);
                } else j++;
                found ? rects.splice(i, 1) : i++;
            }
            if ("page" == from) {
                var off = scrollOffset();
                return $.each(rects, function(ith, item) {
                    item.top += off.top, item.left += off.left;
                });
            }
            return rects;
        }
    }), function() {
        var fn = $.Range.prototype, range = $.Range().range;
        fn.compare = range.compareBoundaryPoints ? function(type, range) {
            return this.range.compareBoundaryPoints(this.window().Range[reverse(type)], range.range);
        } : function(type, range) {
            return this.range.compareEndPoints(convertType(type), range.range);
        }, fn.move = range.setStart ? function(type, range) {
            var rangesRange = range.range;
            switch (type) {
              case "START_TO_END":
                this.range.setStart(rangesRange.endContainer, rangesRange.endOffset);
                break;

              case "START_TO_START":
                this.range.setStart(rangesRange.startContainer, rangesRange.startOffset);
                break;

              case "END_TO_END":
                this.range.setEnd(rangesRange.endContainer, rangesRange.endOffset);
                break;

              case "END_TO_START":
                this.range.setEnd(rangesRange.startContainer, rangesRange.startOffset);
            }
            return this;
        } : function(type, range) {
            return this.range.setEndPoint(convertType(type), range.range), this;
        };
        var cloneFunc = range.cloneRange ? "cloneRange" : "duplicate";
        range.selectNodeContents ? "selectNodeContents" : "moveToElementText";
        fn.clone = function() {
            return $.Range(this.range[cloneFunc]());
        }, fn.select = range.selectNodeContents ? function(el) {
            if (el) this.range.selectNodeContents(el); else {
                var selection = this.window().getSelection();
                selection.removeAllRanges(), selection.addRange(this.range);
            }
            return this;
        } : function(el) {
            if (el) if (3 === el.nodeType) {
                var end, parent = el.parentNode, start = 0;
                iterate(parent.childNodes, function(txtNode) {
                    return txtNode === el ? (end = start + txtNode.nodeValue.length, !1) : void (start += txtNode.nodeValue.length);
                }), this.range.moveToElementText(parent), this.range.moveEnd("character", end - this.range.text.length), 
                this.range.moveStart("character", start);
            } else this.range.moveToElementText(el); else this.range.select();
            return this;
        };
    }();
    var iterate = function(elems, cb) {
        for (var elem, i = 0; elems[i]; i++) if (elem = elems[i], 3 === elem.nodeType || 4 === elem.nodeType) {
            if (cb(elem) === !1) return !1;
        } else if (8 !== elem.nodeType && iterate(elem.childNodes, cb) === !1) return !1;
    }, isText = function(node) {
        return 3 === node.nodeType || 4 === node.nodeType;
    }, iteratorMaker = function(toChildren, toNext) {
        return function(node, mustMoveRight) {
            return node[toChildren] && !mustMoveRight ? isText(node[toChildren]) ? node[toChildren] : arguments.callee(node[toChildren]) : node[toNext] ? isText(node[toNext]) ? node[toNext] : arguments.callee(node[toNext]) : node.parentNode ? arguments.callee(node.parentNode, !0) : void 0;
        };
    }, getNextTextNode = iteratorMaker("firstChild", "nextSibling"), getPrevTextNode = iteratorMaker("lastChild", "previousSibling"), callMove = function(container, offset, howMany) {
        var mover = 0 > howMany ? getPrevTextNode : getNextTextNode;
        return isText(container) ? 0 > offset + howMany ? move(mover(container), offset + howMany) : move(container, offset + howMany) : (container = container.childNodes[offset] ? container.childNodes[offset] : container.lastChild, 
        isText(container) || (container = mover(container)), move(container, howMany));
    }, move = function(from, howMany) {
        var mover = 0 > howMany ? getPrevTextNode : getNextTextNode;
        for (howMany = Math.abs(howMany); from && howMany >= from.nodeValue.length; ) howMany -= from.nodeValue.length, 
        from = mover(from);
        return {
            node: from,
            offset: mover === getNextTextNode ? howMany : from.nodeValue.length - howMany
        };
    }, supportWhitespace, isWhitespace = function(el) {
        return null == supportWhitespace && (supportWhitespace = "isElementContentWhitespace" in el), 
        supportWhitespace ? el.isElementContentWhitespace : 3 === el.nodeType && "" == el.data.trim();
    }, within = function(rect, point) {
        return rect.left <= point.clientX && rect.left + rect.width >= point.clientX && rect.top <= point.clientY && rect.top + rect.height >= point.clientY;
    }, withinRect = function(outer, inner) {
        return within(outer, {
            clientX: inner.left,
            clientY: inner.top
        }) && within(outer, {
            clientX: inner.left + inner.width,
            clientY: inner.top
        }) && within(outer, {
            clientX: inner.left,
            clientY: inner.top + inner.height
        }) && within(outer, {
            clientX: inner.left + inner.width,
            clientY: inner.top + inner.height
        });
    }, scrollOffset = function(win) {
        var win = win || window;
        return doc = win.document.documentElement, body = win.document.body, {
            left: (doc && doc.scrollLeft || body && body.scrollLeft || 0) + (doc.clientLeft || 0),
            top: (doc && doc.scrollTop || body && body.scrollTop || 0) + (doc.clientTop || 0)
        };
    };
    support.moveToPoint = !!$.Range().range.moveToPoint;
    var getWindow = function(element) {
        return element ? element.ownerDocument.defaultView || element.ownerDocument.parentWindow : window;
    }, getElementsSelection = function(el, win) {
        var current = $.Range.current(el).clone(), entireElement = $.Range(el).select(el);
        return current.overlaps(entireElement) ? (current.compare("START_TO_START", entireElement) < 1 ? (startPos = 0, 
        current.move("START_TO_START", entireElement)) : (fromElementToCurrent = entireElement.clone(), 
        fromElementToCurrent.move("END_TO_START", current), startPos = fromElementToCurrent.toString().length), 
        current.compare("END_TO_END", entireElement) >= 0 ? endPos = entireElement.toString().length : endPos = startPos + current.toString().length, 
        {
            start: startPos,
            end: endPos,
            width: endPos - startPos
        }) : null;
    }, getSelection = function(el) {
        var win = getWindow(el);
        if (el.selectionStart !== undefined) return document.activeElement && document.activeElement != el && el.selectionStart == el.selectionEnd && 0 == el.selectionStart ? {
            start: el.value.length,
            end: el.value.length,
            width: 0
        } : {
            start: el.selectionStart,
            end: el.selectionEnd,
            width: el.selectionEnd - el.selectionStart
        };
        if (win.getSelection) return getElementsSelection(el, win);
        try {
            if ("input" == el.nodeName.toLowerCase()) {
                var real = getWindow(el).document.selection.createRange(), r = el.createTextRange();
                r.setEndPoint("EndToStart", real);
                var start = r.text.length;
                return {
                    start: start,
                    end: start + real.text.length,
                    width: real.text.length
                };
            }
            var res = getElementsSelection(el, win);
            if (!res) return res;
            var current = $.Range.current().clone(), r2 = current.clone().collapse().range, r3 = current.clone().collapse(!1).range;
            return r2.moveStart("character", -1), r3.moveStart("character", -1), 0 != res.startPos && "" == r2.text && (res.startPos += 2), 
            0 != res.endPos && "" == r3.text && (res.endPos += 2), res;
        } catch (e) {
            return {
                start: el.value.length,
                end: el.value.length,
                width: 0
            };
        }
    }, select = function(el, start, end) {
        var win = getWindow(el);
        if (el.setSelectionRange) end === undefined ? (el.focus(), el.setSelectionRange(start, start)) : (el.select(), 
        el.selectionStart = start, el.selectionEnd = end); else if (el.createTextRange) {
            var r = el.createTextRange();
            r.moveStart("character", start), end = end || start, r.moveEnd("character", end - el.value.length), 
            r.select();
        } else if (win.getSelection) {
            var doc = win.document, sel = win.getSelection(), range = doc.createRange(), ranges = [ start, end !== undefined ? end : start ];
            getCharElement([ el ], ranges), range.setStart(ranges[0].el, ranges[0].count), range.setEnd(ranges[1].el, ranges[1].count), 
            sel.removeAllRanges(), sel.addRange(range);
        } else if (win.document.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(el), range.collapse(), range.moveStart("character", start), 
            range.moveEnd("character", end !== undefined ? end : start), range.select();
        }
    }, replaceWithLess = function(start, len, range, el) {
        "number" == typeof range[0] && range[0] < len && (range[0] = {
            el: el,
            count: range[0] - start
        }), "number" == typeof range[1] && range[1] <= len && (range[1] = {
            el: el,
            count: range[1] - start
        });
    }, getCharElement = function(elems, range, len) {
        var elem, start;
        len = len || 0;
        for (var i = 0; elems[i]; i++) elem = elems[i], 3 === elem.nodeType || 4 === elem.nodeType ? (start = len, 
        len += elem.nodeValue.length, replaceWithLess(start, len, range, elem)) : 8 !== elem.nodeType && (len = getCharElement(elem.childNodes, range, len));
        return len;
    };
    $.fn.selection = function(start, end) {
        return start !== undefined ? this.each(function() {
            select(this, start, end);
        }) : getSelection(this[0]);
    }, $.fn.selection.getCharElement = getCharElement;
    var withinBox = function(x, y, left, top, width, height) {
        return y >= top && top + height > y && x >= left && left + width > x;
    };
    $.fn.within = function(left, top, useOffsetCache) {
        var ret = [];
        return this.each(function() {
            var q = jQuery(this);
            if (this == document.documentElement) return ret.push(this);
            var offset = useOffsetCache ? $.data(this, "offsetCache") || $.data(this, "offsetCache", q.offset()) : q.offset(), res = withinBox(left, top, offset.left, offset.top, this.offsetWidth, this.offsetHeight);
            res && ret.push(this);
        }), this.pushStack($.unique(ret), "within", left + "," + top);
    }, $.fn.withinBox = function(left, top, width, height, useOffsetCache) {
        var ret = [];
        return this.each(function() {
            var q = jQuery(this);
            if (this == document.documentElement) return ret.push(this);
            var offset = useOffsetCache ? $.data(this, "offset") || $.data(this, "offset", q.offset()) : q.offset(), ew = q.width(), eh = q.height(), res = !(offset.top > top + height || offset.top + eh < top || offset.left > left + width || offset.left + ew < left);
            res && ret.push(this);
        }), this.pushStack($.unique(ret), "withinBox", $.makeArray(arguments).join(","));
    }, $.fn.triggerAsync = function(type, data, success, prevented) {
        if ("function" == typeof data && (prevented = success, success = data, data = undefined), 
        this.length) {
            var el = this;
            setTimeout(function() {
                el.trigger({
                    type: type,
                    _success: success,
                    _prevented: prevented
                }, data);
            }, 0);
        } else success && success.call(this);
        return this;
    };
    var types = {}, rnamespaces = /\.(.*)$/, $event = $.event;
    $event.special["default"] = {
        add: function(handleObj) {
            types[handleObj.namespace.replace(rnamespaces, "")] = !0;
        },
        setup: function() {
            return !0;
        }
    };
    var oldTrigger = $event.trigger;
    $event.trigger = function(event, data, elem, onlyHandlers) {
        var type = event.type || event, event = "object" == typeof event ? event[$.expando] ? event : new $.Event(type, event) : new $.Event(type), res = oldTrigger.call($.event, event, data, elem, onlyHandlers), paused = event.isPaused && event.isPaused();
        return onlyHandlers || event.isDefaultPrevented() || 0 === event.type.indexOf("default") || (oldTrigger("default." + event.type, data, elem), 
        event._success && event._success(event)), onlyHandlers || !event.isDefaultPrevented() || 0 === event.type.indexOf("default") || paused || event._prevented && event._prevented(event), 
        paused && (event.isDefaultPrevented = event.pausedState.isDefaultPrevented, event.isPropagationStopped = event.pausedState.isPropagationStopped), 
        res;
    };
    var oldClean = $.cleanData;
    $.cleanData = function(elems) {
        for (var elem, i = 0; (elem = elems[i]) !== undefined; i++) $(elem).triggerHandler("destroyed");
        oldClean(elems);
    };
    var getSetZero = function(v) {
        return v !== undefined ? this.array[0] = v : this.array[0];
    }, getSetOne = function(v) {
        return v !== undefined ? this.array[1] = v : this.array[1];
    };
    $.Vector = function(arr) {
        var array = $.isArray(arr) ? arr : $.makeArray(arguments);
        this.update(array);
    }, $.Vector.prototype = {
        app: function(f) {
            var i, newArr = [];
            for (i = 0; i < this.array.length; i++) newArr.push(f(this.array[i], i));
            return new $.Vector(newArr);
        },
        plus: function() {
            var i, args = arguments[0] instanceof $.Vector ? arguments[0].array : $.makeArray(arguments), arr = this.array.slice(0), vec = new $.Vector();
            for (i = 0; i < args.length; i++) arr[i] = (arr[i] ? arr[i] : 0) + args[i];
            return vec.update(arr);
        },
        minus: function() {
            var i, args = arguments[0] instanceof $.Vector ? arguments[0].array : $.makeArray(arguments), arr = this.array.slice(0), vec = new $.Vector();
            for (i = 0; i < args.length; i++) arr[i] = (arr[i] ? arr[i] : 0) - args[i];
            return vec.update(arr);
        },
        equals: function() {
            var i, args = arguments[0] instanceof $.Vector ? arguments[0].array : $.makeArray(arguments), arr = this.array.slice(0), vec = new $.Vector();
            for (i = 0; i < args.length; i++) if (arr[i] != args[i]) return null;
            return vec.update(arr);
        },
        x: getSetZero,
        left: getSetZero,
        width: getSetZero,
        y: getSetOne,
        top: getSetOne,
        height: getSetOne,
        toString: function() {
            return "(" + this.array.join(", ") + ")";
        },
        update: function(array) {
            var i;
            if (this.array) for (i = 0; i < this.array.length; i++) delete this.array[i];
            for (this.array = array, i = 0; i < array.length; i++) this[i] = this.array[i];
            return this;
        }
    }, $.Event.prototype.vector = function() {
        var touches = "ontouchend" in document && this.originalEvent.touches && this.originalEvent.touches.length ? this.originalEvent.changedTouches[0] : this;
        if (this.originalEvent.synthetic) {
            var doc = document.documentElement, body = document.body;
            return new $.Vector(touches.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0), touches.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0));
        }
        return new $.Vector(touches.pageX, touches.pageY);
    }, $.fn.offsetv = function() {
        if (this[0] == window) return new $.Vector(window.pageXOffset ? window.pageXOffset : document.documentElement.scrollLeft, window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop);
        var offset = this.offset();
        return new $.Vector(offset.left, offset.top);
    }, $.fn.dimensionsv = function(which) {
        return this[0] != window && which ? new $.Vector(this[which + "Width"](), this[which + "Height"]()) : new $.Vector(this.width(), this.height());
    };
    var event = $.event, findHelper = function(events, types, callback, selector) {
        var t, type, typeHandlers, all, h, handle, namespaces, namespace, match;
        for (t = 0; t < types.length; t++) for (type = types[t], all = type.indexOf(".") < 0, 
        all || (namespaces = type.split("."), type = namespaces.shift(), namespace = new RegExp("(^|\\.)" + namespaces.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)")), 
        typeHandlers = (events[type] || []).slice(0), h = 0; h < typeHandlers.length; h++) handle = typeHandlers[h], 
        match = all || namespace.test(handle.namespace), match && (selector ? handle.selector === selector && callback(type, handle.origHandler || handle.handler) : null === selector ? callback(type, handle.origHandler || handle.handler, handle.selector) : handle.selector || callback(type, handle.origHandler || handle.handler));
    };
    event.find = function(el, types, selector) {
        var events = ($._data(el) || {}).events, handlers = [];
        return events ? (findHelper(events, types, function(type, handler) {
            handlers.push(handler);
        }, selector), handlers) : handlers;
    }, event.findBySelector = function(el, types) {
        var events = $._data(el).events, selectors = {}, add = function(selector, event, handler) {
            var select = selectors[selector] || (selectors[selector] = {}), events = select[event] || (select[event] = []);
            events.push(handler);
        };
        return events ? (findHelper(events, types, function(type, handler, selector) {
            add(selector || "", type, handler);
        }, null), selectors) : selectors;
    }, event.supportTouch = "ontouchend" in document, $.fn.respondsTo = function(events) {
        return this.length ? event.find(this[0], $.isArray(events) ? events : [ events ]).length > 0 : !1;
    }, $.fn.triggerHandled = function(event, data) {
        return event = "string" == typeof event ? $.Event(event) : event, this.trigger(event, data), 
        event.handled;
    }, event.setupHelper = function(types, startingEvent, onFirst) {
        onFirst || (onFirst = startingEvent, startingEvent = null);
        var add = function(handleObj) {
            var bySelector, selector = handleObj.selector || "", namespace = handleObj.namespace ? "." + handleObj.namespace : "";
            selector ? (bySelector = event.find(this, types, selector), bySelector.length || $(this).delegate(selector, startingEvent + namespace, onFirst)) : event.find(this, types, selector).length || event.add(this, startingEvent + namespace, onFirst, {
                selector: selector,
                delegate: this
            });
        }, remove = function(handleObj) {
            var bySelector, selector = handleObj.selector || "";
            selector ? (bySelector = event.find(this, types, selector), bySelector.length || $(this).undelegate(selector, startingEvent, onFirst)) : event.find(this, types, selector).length || event.remove(this, startingEvent, onFirst, {
                selector: selector,
                delegate: this
            });
        };
        $.each(types, function() {
            event.special[this] = {
                add: add,
                remove: remove,
                setup: function() {},
                teardown: function() {}
            };
        });
    }, $.event.reverse = function(name, attributes) {
        var bound = $(), count = 0, dispatch = $.event.handle || $.event.dispatch;
        return $.event.special[name] = {
            setup: function() {
                return this !== window && (bound.push(this), $.unique(bound)), this !== window;
            },
            teardown: function() {
                return bound = bound.not(this), this !== window;
            },
            add: function(handleObj) {
                var origHandler = handleObj.handler;
                handleObj.origHandler = origHandler, handleObj.handler = function(ev, data) {
                    var isWindow = this === window;
                    if (attributes && attributes.handler) {
                        var result = attributes.handler.apply(this, arguments);
                        if (result === !0) return;
                    }
                    if (0 === count) {
                        count++;
                        var where = data === !1 ? ev.target : this;
                        if (dispatch.call(where, ev, data), ev.isPropagationStopped()) return void count--;
                        for (var child, sub, index = bound.index(this), length = bound.length; ++index < length && (child = bound[index]) && (isWindow || $.contains(where, child)); ) if (dispatch.call(child, ev, data), 
                        ev.isPropagationStopped()) for (;++index < length && (sub = bound[index]); ) if (!$.contains(child, sub)) {
                            index--;
                            break;
                        }
                        ev.stopImmediatePropagation(), count--;
                    } else handleObj.origHandler.call(this, ev, data);
                };
            }
        }, $([ document, window ]).bind(name, function() {}), $.event.special[name];
    }, $.event.special.move || $.event.reverse("move");
    var bind = function(object, method) {
        var args = Array.prototype.slice.call(arguments, 2);
        return function() {
            var args2 = [ this ].concat(args, $.makeArray(arguments));
            return method.apply(object, args2);
        };
    }, event = $.event, clearSelection = window.getSelection ? function() {
        window.getSelection().removeAllRanges();
    } : function() {}, supportTouch = "ontouchend" in document, startEvent = supportTouch ? "touchstart" : "mousedown", stopEvent = supportTouch ? "touchend" : "mouseup", moveEvent = supportTouch ? "touchmove" : "mousemove", preventTouchScroll = function(ev) {
        ev.preventDefault();
    };
    $.Drag = function() {}, $.extend($.Drag, {
        lowerName: "drag",
        current: null,
        distance: 0,
        mousedown: function(ev, element) {
            var isLeftButton = 0 === ev.button || 1 == ev.button, doEvent = isLeftButton || supportTouch;
            if (doEvent && !this.current) {
                var drag = new $.Drag(), delegate = ev.delegateTarget || element, selector = ev.handleObj.selector, self = this;
                this.current = drag, drag.setup({
                    element: element,
                    delegate: ev.delegateTarget || element,
                    selector: ev.handleObj.selector,
                    moved: !1,
                    _distance: this.distance,
                    callbacks: {
                        dragdown: event.find(delegate, [ "dragdown" ], selector),
                        draginit: event.find(delegate, [ "draginit" ], selector),
                        dragover: event.find(delegate, [ "dragover" ], selector),
                        dragmove: event.find(delegate, [ "dragmove" ], selector),
                        dragout: event.find(delegate, [ "dragout" ], selector),
                        dragend: event.find(delegate, [ "dragend" ], selector),
                        dragcleanup: event.find(delegate, [ "dragcleanup" ], selector)
                    },
                    destroyed: function() {
                        self.current = null;
                    }
                }, ev);
            }
        }
    }), $.extend($.Drag.prototype, {
        setup: function(options, ev) {
            $.extend(this, options), this.element = $(this.element), this.event = ev, this.moved = !1, 
            this.allowOtherDrags = !1;
            var mousemove = bind(this, this.mousemove), mouseup = bind(this, this.mouseup);
            this._mousemove = mousemove, this._mouseup = mouseup, this._distance = options.distance ? options.distance : 0, 
            this.mouseStartPosition = ev.vector(), $(document).bind(moveEvent, mousemove), $(document).bind(stopEvent, mouseup), 
            supportTouch && $(document).bind(moveEvent, preventTouchScroll), this.callEvents("down", this.element, ev) || (this.noSelection(this.delegate), 
            clearSelection());
        },
        destroy: function() {
            $(document).unbind(moveEvent, this._mousemove), $(document).unbind(stopEvent, this._mouseup), 
            supportTouch && $(document).unbind(moveEvent, preventTouchScroll), this.moved || (this.event = this.element = null), 
            supportTouch || this.selection(this.delegate), this.destroyed();
        },
        mousemove: function(docEl, ev) {
            if (!this.moved) {
                var dist = Math.sqrt(Math.pow(ev.pageX - this.event.pageX, 2) + Math.pow(ev.pageY - this.event.pageY, 2));
                if (dist < this._distance) return !1;
                this.init(this.element, ev), this.moved = !0;
            }
            this.element.trigger("move", this);
            var pointer = ev.vector();
            this._start_position && this._start_position.equals(pointer) || this.draw(pointer, ev);
        },
        mouseup: function(docEl, event) {
            this.moved && this.end(event), this.destroy();
        },
        noSelection: function(elm) {
            elm = elm || this.delegate, document.documentElement.onselectstart = function() {
                return !1;
            }, document.documentElement.unselectable = "on", this.selectionDisabled = this.selectionDisabled ? this.selectionDisabled.add(elm) : $(elm), 
            this.selectionDisabled.css("-moz-user-select", "-moz-none");
        },
        selection: function() {
            this.selectionDisabled && (document.documentElement.onselectstart = function() {}, 
            document.documentElement.unselectable = "off", this.selectionDisabled.css("-moz-user-select", ""));
        },
        init: function(element, event) {
            element = $(element);
            var startElement = this.movingElement = this.element = $(element);
            this._cancelled = !1, this.event = event, this.mouseElementPosition = this.mouseStartPosition.minus(this.element.offsetv()), 
            this.callEvents("init", element, event), this._cancelled !== !0 && (this.startPosition = startElement != this.movingElement ? this.movingElement.offsetv() : this.currentDelta(), 
            this.makePositioned(this.movingElement), this.oldZIndex = this.movingElement.css("zIndex"), 
            this.movingElement.css("zIndex", 1e3), !this._only && this.constructor.responder && this.constructor.responder.compile(event, this));
        },
        makePositioned: function(that) {
            var style, pos = that.css("position");
            pos && "static" != pos || (style = {
                position: "relative"
            }, window.opera && (style.top = "0px", style.left = "0px"), that.css(style));
        },
        callEvents: function(type, element, event, drop) {
            var i, cbs = this.callbacks[this.constructor.lowerName + type];
            for (i = 0; i < cbs.length; i++) cbs[i].call(element, event, this, drop);
            return cbs.length;
        },
        currentDelta: function() {
            return new $.Vector(parseInt(this.movingElement.css("left"), 10) || 0, parseInt(this.movingElement.css("top"), 10) || 0);
        },
        draw: function(pointer, event) {
            this._cancelled || (clearSelection(), this.location = pointer.minus(this.mouseElementPosition), 
            this.move(event), this._cancelled || (event.isDefaultPrevented() || this.position(this.location), 
            !this._only && this.constructor.responder && this.constructor.responder.show(pointer, this, event)));
        },
        position: function(newOffsetv) {
            var style, dragged_element_css_offset = this.currentDelta(), dragged_element_position_vector = this.movingElement.offsetv().minus(dragged_element_css_offset);
            this.required_css_position = newOffsetv.minus(dragged_element_position_vector), 
            this.offsetv = newOffsetv, style = this.movingElement[0].style, this._cancelled || this._horizontal || (style.top = this.required_css_position.top() + "px"), 
            this._cancelled || this._vertical || (style.left = this.required_css_position.left() + "px");
        },
        move: function(event) {
            this.callEvents("move", this.element, event);
        },
        over: function(event, drop) {
            this.callEvents("over", this.element, event, drop);
        },
        out: function(event, drop) {
            this.callEvents("out", this.element, event, drop);
        },
        end: function(event) {
            if (!this._cancelled) {
                if (!this._only && this.constructor.responder && this.constructor.responder.end(event, this), 
                this.callEvents("end", this.element, event), this._revert) {
                    var self = this;
                    this.movingElement.animate({
                        top: this.startPosition.top() + "px",
                        left: this.startPosition.left() + "px"
                    }, function() {
                        self.cleanup.apply(self, arguments);
                    });
                } else this.cleanup(event);
                this.event = null;
            }
        },
        cleanup: function(event) {
            this.movingElement.css({
                zIndex: this.oldZIndex
            }), this.movingElement[0] === this.element[0] || this.movingElement.has(this.element[0]).length || this.element.has(this.movingElement[0]).length || this.movingElement.css({
                display: "none"
            }), this._removeMovingElement && this.movingElement.remove(), event && this.callEvents("cleanup", this.element, event), 
            this.movingElement = this.element = this.event = null;
        },
        cancel: function() {
            this._cancelled = !0, !this._only && this.constructor.responder && this.constructor.responder.clear(this.event.vector(), this, this.event), 
            this.destroy();
        },
        ghost: function(parent) {
            var ghost = this.movingElement.clone().css("position", "absolute");
            return parent ? $(parent).append(ghost) : $(this.movingElement).after(ghost), ghost.width(this.movingElement.width()).height(this.movingElement.height()), 
            ghost.offset(this.movingElement.offset()), this.movingElement = ghost, this.noSelection(ghost), 
            this._removeMovingElement = !0, ghost;
        },
        representative: function(element, offsetX, offsetY) {
            this._offsetX = offsetX || 0, this._offsetY = offsetY || 0;
            var p = this.mouseStartPosition;
            return this.movingElement = $(element), this.movingElement.css({
                top: p.y() - this._offsetY + "px",
                left: p.x() - this._offsetX + "px",
                display: "block",
                position: "absolute"
            }).show(), this.noSelection(this.movingElement), this.mouseElementPosition = new $.Vector(this._offsetX, this._offsetY), 
            this;
        },
        revert: function(val) {
            return this._revert = val === undefined ? !0 : val, this;
        },
        vertical: function() {
            return this._vertical = !0, this;
        },
        horizontal: function() {
            return this._horizontal = !0, this;
        },
        only: function(only) {
            return this._only = only === undefined ? !0 : only;
        },
        distance: function(val) {
            return val !== undefined ? (this._distance = val, this) : this._distance;
        }
    }), event.setupHelper([ "dragdown", "draginit", "dragover", "dragmove", "dragout", "dragend", "dragcleanup" ], startEvent, function(e) {
        $.Drag.mousedown.call($.Drag, e, this);
    });
    var round = function(x, m) {
        return Math.round(x / m) * m;
    };
    $.Drag.prototype.step = function(amount, container, center) {
        "number" == typeof amount && (amount = {
            x: amount,
            y: amount
        }), container = container || $(document.body), this._step = amount;
        var styles = container.styles("borderTopWidth", "paddingTop", "borderLeftWidth", "paddingLeft"), top = parseInt(styles.borderTopWidth) + parseInt(styles.paddingTop), left = parseInt(styles.borderLeftWidth) + parseInt(styles.paddingLeft);
        return this._step.offset = container.offsetv().plus(left, top), this._step.center = center, 
        this;
    }, function() {
        var oldPosition = $.Drag.prototype.position;
        $.Drag.prototype.position = function(offsetPositionv) {
            if (this._step) {
                var step = this._step, center = step.center && step.center.toLowerCase(), movingSize = this.movingElement.dimensionsv("outer"), lot = step.offset.top() - (center && "x" != center ? movingSize.height() / 2 : 0), lof = step.offset.left() - (center && "y" != center ? movingSize.width() / 2 : 0);
                this._step.x && offsetPositionv.left(Math.round(lof + round(offsetPositionv.left() - lof, this._step.x))), 
                this._step.y && offsetPositionv.top(Math.round(lot + round(offsetPositionv.top() - lot, this._step.y)));
            }
            oldPosition.call(this, offsetPositionv);
        };
    }(), $.Drag.prototype.limit = function(container, center) {
        var styles = container.styles("borderTopWidth", "paddingTop", "borderLeftWidth", "paddingLeft"), paddingBorder = new $.Vector(parseInt(styles.borderLeftWidth, 10) + parseInt(styles.paddingLeft, 10) || 0, parseInt(styles.borderTopWidth, 10) + parseInt(styles.paddingTop, 10) || 0);
        return this._limit = {
            offset: container.offsetv().plus(paddingBorder),
            size: container.dimensionsv(),
            center: center === !0 ? "both" : center
        }, this;
    };
    var oldPosition = $.Drag.prototype.position;
    $.Drag.prototype.position = function(offsetPositionv) {
        if (this._limit) {
            var limit = this._limit, center = limit.center && limit.center.toLowerCase(), movingSize = this.movingElement.dimensionsv("outer"), halfHeight = center && "x" != center ? movingSize.height() / 2 : 0, halfWidth = center && "y" != center ? movingSize.width() / 2 : 0, lot = limit.offset.top(), lof = limit.offset.left(), height = limit.size.height(), width = limit.size.width();
            offsetPositionv.top() + halfHeight < lot && offsetPositionv.top(lot - halfHeight), 
            offsetPositionv.top() + movingSize.height() - halfHeight > lot + height && offsetPositionv.top(lot + height - movingSize.height() + halfHeight), 
            offsetPositionv.left() + halfWidth < lof && offsetPositionv.left(lof - halfWidth), 
            offsetPositionv.left() + movingSize.width() - halfWidth > lof + width && offsetPositionv.left(lof + width - movingSize.left() + halfWidth);
        }
        oldPosition.call(this, offsetPositionv);
    };
    var event = $.event, eventNames = [ "dropover", "dropon", "dropout", "dropinit", "dropmove", "dropend" ];
    if ($.Drop = function(callbacks, element) {
        $.extend(this, callbacks), this.element = $(element);
    }, $.each(eventNames, function() {
        event.special[this] = {
            add: function(handleObj) {
                var el = $(this), current = el.data("dropEventCount") || 0;
                el.data("dropEventCount", current + 1), 0 == current && $.Drop.addElement(this);
            },
            remove: function() {
                var el = $(this), current = el.data("dropEventCount") || 0;
                el.data("dropEventCount", current - 1), 1 >= current && $.Drop.removeElement(this);
            }
        };
    }), $.extend($.Drop, {
        lowerName: "drop",
        _rootElements: [],
        _elements: $(),
        last_active: [],
        endName: "dropon",
        addElement: function(el) {
            for (var i = 0; i < this._rootElements.length; i++) if (el == this._rootElements[i]) return;
            this._rootElements.push(el);
        },
        removeElement: function(el) {
            for (var i = 0; i < this._rootElements.length; i++) if (el == this._rootElements[i]) return void this._rootElements.splice(i, 1);
        },
        sortByDeepestChild: function(a, b) {
            var compare = a.element.compare(b.element);
            return 16 & compare || 4 & compare ? 1 : 8 & compare || 2 & compare ? -1 : 0;
        },
        isAffected: function(point, moveable, responder) {
            return responder.element != moveable.element && 1 == responder.element.within(point[0], point[1], responder._cache).length;
        },
        deactivate: function(responder, mover, event) {
            mover.out(event, responder), responder.callHandlers(this.lowerName + "out", responder.element[0], event, mover);
        },
        activate: function(responder, mover, event) {
            mover.over(event, responder), responder.callHandlers(this.lowerName + "over", responder.element[0], event, mover);
        },
        move: function(responder, mover, event) {
            responder.callHandlers(this.lowerName + "move", responder.element[0], event, mover);
        },
        compile: function(event, drag) {
            if (this.dragging || drag) {
                this.dragging || (this.dragging = drag, this.last_active = []);
                for (var el, drops, selector, dropResponders, newEls = [], dragging = this.dragging, i = 0; i < this._rootElements.length; i++) {
                    el = this._rootElements[i];
                    var drops = $.event.findBySelector(el, eventNames);
                    for (selector in drops) {
                        dropResponders = selector ? jQuery(selector, el) : [ el ];
                        for (var e = 0; e < dropResponders.length; e++) this.addCallbacks(dropResponders[e], drops[selector], dragging) && newEls.push(dropResponders[e]);
                    }
                }
                this.add(newEls, event, dragging);
            }
        },
        addCallbacks: function(el, callbacks, onlyNew) {
            var origData = $.data(el, "_dropData");
            if (!origData) return $.data(el, "_dropData", new $.Drop(callbacks, el)), !0;
            if (!onlyNew) {
                var origCbs = origData;
                for (var eventName in callbacks) origCbs[eventName] = origCbs[eventName] ? origCbs[eventName].concat(callbacks[eventName]) : callbacks[eventName];
                return !1;
            }
        },
        add: function(newEls, event, drag, dragging) {
            for (var drop, i = 0; i < newEls.length; ) drop = $.data(newEls[i], "_dropData"), 
            drop.callHandlers(this.lowerName + "init", newEls[i], event, drag), drop._canceled ? newEls.splice(i, 1) : i++;
            this._elements.push.apply(this._elements, newEls);
        },
        show: function(point, moveable, event) {
            moveable.element;
            if (this._elements.length) {
                for (var j, la, toBeActivated, aff, drag, affected = [], propagate = !0, i = 0, oldLastActive = this.last_active, self = this; i < this._elements.length; ) drag = $.data(this._elements[i], "_dropData"), 
                drag ? (i++, self.isAffected(point, moveable, drag) && affected.push(drag)) : this._elements.splice(i, 1);
                for (affected.sort(this.sortByDeepestChild), event.stopRespondPropagate = function() {
                    propagate = !1;
                }, toBeActivated = affected.slice(), this.last_active = affected, j = 0; j < oldLastActive.length; j++) {
                    for (la = oldLastActive[j], i = 0; aff = toBeActivated[i]; ) {
                        if (la == aff) {
                            toBeActivated.splice(i, 1);
                            break;
                        }
                        i++;
                    }
                    if (aff || this.deactivate(la, moveable, event), !propagate) return;
                }
                for (var i = 0; i < toBeActivated.length; i++) if (this.activate(toBeActivated[i], moveable, event), 
                !propagate) return;
                for (i = 0; i < affected.length; i++) if (this.move(affected[i], moveable, event), 
                !propagate) return;
            }
        },
        end: function(event, moveable) {
            for (var la, dropData, endName = this.lowerName + "end", onEvent = $.Event(this.endName, event), i = 0; i < this.last_active.length && (la = this.last_active[i], 
            this.isAffected(event.vector(), moveable, la) && la[this.endName] && la.callHandlers(this.endName, null, onEvent, moveable), 
            !onEvent.isPropagationStopped()); i++) ;
            for (var r = 0; r < this._elements.length; r++) dropData = $.data(this._elements[r], "_dropData"), 
            dropData && dropData.callHandlers(endName, null, event, moveable);
            this.clear();
        },
        clear: function() {
            this._elements.each(function() {
                $.removeData(this, "_dropData");
            }), this._elements = $(), delete this.dragging;
        }
    }), $.Drag.responder = $.Drop, $.extend($.Drop.prototype, {
        callHandlers: function(method, el, ev, drag) {
            for (var length = this[method] ? this[method].length : 0, i = 0; length > i; i++) this[method][i].call(el || this.element[0], ev, this, drag);
        },
        cache: function(value) {
            this._cache = null != value ? value : !0;
        },
        cancel: function() {
            this._canceled = !0;
        }
    }), $.Drag.prototype.scrolls = function(elements, options) {
        for (var elements = $(elements), i = 0; i < elements.length; i++) this.constructor.responder._elements.push(elements.eq(i).data("_dropData", new $.Scrollable(elements[i], options))[0]);
    }, $.Scrollable = function(element, options) {
        this.element = jQuery(element), this.options = $.extend({
            distance: 30,
            delta: function(diff, distance) {
                return (distance - diff) / 2;
            },
            direction: "xy"
        }, options), this.x = -1 != this.options.direction.indexOf("x"), this.y = -1 != this.options.direction.indexOf("y");
    }, $.extend($.Scrollable.prototype, {
        init: function(element) {
            this.element = jQuery(element);
        },
        callHandlers: function(method, el, ev, drag) {
            this[method](el || this.element[0], ev, this, drag);
        },
        dropover: function() {},
        dropon: function() {
            this.clear_timeout();
        },
        dropout: function() {
            this.clear_timeout();
        },
        dropinit: function() {},
        dropend: function() {},
        clear_timeout: function() {
            this.interval && (clearTimeout(this.interval), this.interval = null);
        },
        distance: function(diff) {
            return (30 - diff) / 2;
        },
        dropmove: function(el, ev, drop, drag) {
            this.clear_timeout();
            var mouse = ev.vector(), location_object = $(el == document.documentElement ? window : el), dimensions = location_object.dimensionsv("outer"), position = location_object.offsetv(), bottom = position.y() + dimensions.y() - mouse.y(), top = mouse.y() - position.y(), right = position.x() + dimensions.x() - mouse.x(), left = mouse.x() - position.x(), dx = 0, dy = 0, distance = this.options.distance;
            if (distance > bottom && this.y ? dy = this.options.delta(bottom, distance) : distance > top && this.y && (dy = -this.options.delta(top, distance)), 
            distance > right && this.options && this.x ? dx = this.options.delta(right, distance) : distance > left && this.x && (dx = -this.options.delta(left, distance)), 
            dx || dy) {
                var self = this;
                this.interval = setTimeout(function() {
                    self.move($(el), drag.movingElement, dx, dy, ev, ev.clientX, ev.clientY, ev.screenX, ev.screenY);
                }, 15);
            }
        },
        move: function(scroll_element, drag_element, dx, dy, ev) {
            scroll_element.scrollTop(scroll_element.scrollTop() + dy), scroll_element.scrollLeft(scroll_element.scrollLeft() + dx), 
            drag_element.trigger($.event.fix({
                type: "mousemove",
                clientX: ev.clientX,
                clientY: ev.clientY,
                screenX: ev.screenX,
                screenY: ev.screenY,
                pageX: ev.pageX,
                pageY: ev.pageY
            }));
        }
    }), Object.defineProperties) {
        var set = function(obj, prop, val) {
            return val !== undefined && Object.defineProperty(obj, prop, {
                value: val
            }), val;
        }, special = {
            pageX: function(original) {
                if (original) {
                    var eventDoc = this.target.ownerDocument || document;
                    return doc = eventDoc.documentElement, body = eventDoc.body, original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                }
            },
            pageY: function(original) {
                if (original) {
                    var eventDoc = this.target.ownerDocument || document;
                    return doc = eventDoc.documentElement, body = eventDoc.body, original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                }
            },
            relatedTarget: function(original) {
                return original ? original.fromElement === this.target ? original.toElement : original.fromElement : void 0;
            },
            metaKey: function(originalEvent) {
                return originalEvent ? originalEvent.ctrlKey : void 0;
            },
            which: function(original) {
                return original ? null != original.charCode ? original.charCode : original.keyCode : void 0;
            }
        };
        $.each($.event.keyHooks.props.concat($.event.mouseHooks.props).concat($.event.props), function(i, prop) {
            "target" !== prop && !function() {
                Object.defineProperty($.Event.prototype, prop, {
                    get: function() {
                        var originalValue = this.originalEvent && this.originalEvent[prop];
                        return this["_" + prop] !== undefined ? this["_" + prop] : set(this, prop, special[prop] && originalValue === undefined ? special[prop].call(this, this.originalEvent) : originalValue);
                    },
                    set: function(newValue) {
                        this["_" + prop] = newValue;
                    }
                });
            }();
        }), $.event.fix = function(event) {
            if (event[$.expando]) return event;
            var originalEvent = event, event = $.Event(originalEvent);
            return event.target = originalEvent.target, event.target || (event.target = originalEvent.srcElement || document), 
            3 === event.target.nodeType && (event.target = event.target.parentNode), event;
        };
    }
    $.Hover = function() {
        this._delay = $.Hover.delay, this._distance = $.Hover.distance, this._leave = $.Hover.leave;
    }, $.extend($.Hover, {
        delay: 100,
        distance: 10,
        leave: 0
    }), $.extend($.Hover.prototype, {
        delay: function(delay) {
            return this._delay = delay, this;
        },
        distance: function(distance) {
            return this._distance = distance, this;
        },
        leave: function(leave) {
            return this._leave = leave, this;
        }
    });
    var event = $.event, handle = event.handle, onmouseenter = function(ev) {
        var delegate = ev.delegateTarget || ev.currentTarget, selector = ev.handleObj.selector, pending = $.data(delegate, "_hover" + selector);
        if (pending) {
            if (!pending.forcing) {
                pending.forcing = !0, clearTimeout(pending.leaveTimer);
                var leaveTime = pending.leaving ? Math.max(0, pending.hover.leave - (new Date() - pending.leaving)) : pending.hover.leave, self = this;
                setTimeout(function() {
                    pending.callHoverLeave(), onmouseenter.call(self, ev);
                }, leaveTime);
            }
        } else {
            var timer, leaveTimer, loc = {
                pageX: ev.pageX,
                pageY: ev.pageY
            }, dist = 0, enteredEl = this, hovered = !1, lastEv = ev, hover = new $.Hover(), callHoverLeave = function() {
                $.each(event.find(delegate, [ "hoverleave" ], selector), function() {
                    this.call(enteredEl, ev, hover);
                }), cleanUp();
            }, mousemove = function(ev) {
                clearTimeout(leaveTimer), dist += Math.pow(ev.pageX - loc.pageX, 2) + Math.pow(ev.pageY - loc.pageY, 2), 
                loc = {
                    pageX: ev.pageX,
                    pageY: ev.pageY
                }, lastEv = ev;
            }, mouseleave = function(ev) {
                clearTimeout(timer), hovered ? 0 === hover._leave ? callHoverLeave() : (clearTimeout(leaveTimer), 
                pending.leaving = new Date(), leaveTimer = pending.leaveTimer = setTimeout(function() {
                    callHoverLeave();
                }, hover._leave)) : cleanUp();
            }, cleanUp = function() {
                $(enteredEl).unbind("mouseleave", mouseleave), $(enteredEl).unbind("mousemove", mousemove), 
                $.removeData(delegate, "_hover" + selector);
            }, hoverenter = function() {
                $.each(event.find(delegate, [ "hoverenter" ], selector), function() {
                    this.call(enteredEl, lastEv, hover);
                }), hovered = !0;
            };
            pending = {
                callHoverLeave: callHoverLeave,
                hover: hover
            }, $.data(delegate, "_hover" + selector, pending), $(enteredEl).bind("mousemove", mousemove).bind("mouseleave", mouseleave), 
            $.each(event.find(delegate, [ "hoverinit" ], selector), function() {
                this.call(enteredEl, ev, hover);
            }), 0 === hover._delay ? hoverenter() : timer = setTimeout(function() {
                return dist < hover._distance && 0 == $(enteredEl).queue().length ? void hoverenter() : (dist = 0, 
                void (timer = setTimeout(arguments.callee, hover._delay)));
            }, hover._delay);
        }
    };
    event.setupHelper([ "hoverinit", "hoverenter", "hoverleave", "hovermove" ], "mouseenter", onmouseenter);
    var uaMatch = function(ua) {
        ua = ua.toLowerCase();
        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    }, keymap = {}, reverseKeyMap = {}, currentBrowser = uaMatch(navigator.userAgent).browser;
    $.event.key = function(browser, map) {
        if (browser === undefined) return keymap;
        map === undefined && (map = browser, browser = currentBrowser), keymap[browser] || (keymap[browser] = {}), 
        $.extend(keymap[browser], map), reverseKeyMap[browser] || (reverseKeyMap[browser] = {});
        for (var name in map) reverseKeyMap[browser][map[name]] = name;
    }, $.event.key({
        "\b": "8",
        "	": "9",
        "\r": "13",
        shift: "16",
        ctrl: "17",
        alt: "18",
        "pause-break": "19",
        caps: "20",
        escape: "27",
        "num-lock": "144",
        "scroll-lock": "145",
        print: "44",
        "page-up": "33",
        "page-down": "34",
        end: "35",
        home: "36",
        left: "37",
        up: "38",
        right: "39",
        down: "40",
        insert: "45",
        "delete": "46",
        " ": "32",
        "0": "48",
        "1": "49",
        "2": "50",
        "3": "51",
        "4": "52",
        "5": "53",
        "6": "54",
        "7": "55",
        "8": "56",
        "9": "57",
        a: "65",
        b: "66",
        c: "67",
        d: "68",
        e: "69",
        f: "70",
        g: "71",
        h: "72",
        i: "73",
        j: "74",
        k: "75",
        l: "76",
        m: "77",
        n: "78",
        o: "79",
        p: "80",
        q: "81",
        r: "82",
        s: "83",
        t: "84",
        u: "85",
        v: "86",
        w: "87",
        x: "88",
        y: "89",
        z: "90",
        num0: "96",
        num1: "97",
        num2: "98",
        num3: "99",
        num4: "100",
        num5: "101",
        num6: "102",
        num7: "103",
        num8: "104",
        num9: "105",
        "*": "106",
        "+": "107",
        "-": "109",
        ".": "110",
        "/": "111",
        ";": "186",
        "=": "187",
        ",": "188",
        "-": "189",
        ".": "190",
        "/": "191",
        "`": "192",
        "[": "219",
        "\\": "220",
        "]": "221",
        "'": "222",
        "left window key": "91",
        "right window key": "92",
        "select key": "93",
        f1: "112",
        f2: "113",
        f3: "114",
        f4: "115",
        f5: "116",
        f6: "117",
        f7: "118",
        f8: "119",
        f9: "120",
        f10: "121",
        f11: "122",
        f12: "123"
    }), $.Event.prototype.keyName = function() {
        var event = this, test = /\w/, key_Key = reverseKeyMap[currentBrowser][(event.keyCode || event.which) + ""], char_Key = String.fromCharCode(event.keyCode || event.which), key_Char = event.charCode && reverseKeyMap[currentBrowser][event.charCode + ""], char_Char = event.charCode && String.fromCharCode(event.charCode);
        return char_Char && test.test(char_Char) ? char_Char.toLowerCase() : key_Char && test.test(key_Char) ? char_Char.toLowerCase() : char_Key && test.test(char_Key) ? char_Key.toLowerCase() : key_Key && test.test(key_Key) ? key_Key.toLowerCase() : "keypress" == event.type ? event.keyCode ? String.fromCharCode(event.keyCode) : String.fromCharCode(event.which) : !event.keyCode && event.which ? String.fromCharCode(event.which) : reverseKeyMap[currentBrowser][event.keyCode + ""];
    };
    var current, rnamespaces = /\.(.*)$/, returnFalse = function() {
        return !1;
    }, returnTrue = function() {
        return !0;
    };
    $.Event.prototype.isPaused = returnFalse, $.Event.prototype.pause = function() {
        this.pausedState = {
            isDefaultPrevented: this.isDefaultPrevented() ? returnTrue : returnFalse,
            isPropagationStopped: this.isPropagationStopped() ? returnTrue : returnFalse
        }, this.stopImmediatePropagation(), this.preventDefault(), this.isPaused = returnTrue;
    }, $.Event.prototype.resume = function() {
        var handleObj = this.handleObj, currentTarget = this.currentTarget, origType = $.event.special[handleObj.origType], origHandle = origType && origType.handle;
        origType || ($.event.special[handleObj.origType] = {}), $.event.special[handleObj.origType].handle = function(ev) {
            ev.handleObj === handleObj && ev.currentTarget === currentTarget && (origType ? $.event.special[handleObj.origType].handle = origHandle : delete $.event.special[handleObj.origType]);
        }, delete this.pausedState, this.isPaused = this.isImmediatePropagationStopped = returnFalse, 
        this.isPropagationStopped() || $.event.trigger(this, [], this.target);
    };
    var win = $(window), windowWidth = 0, windowHeight = 0, timer;
    $(function() {
        windowWidth = win.width(), windowHeight = win.height();
    }), $.event.reverse("resize", {
        handler: function(ev, data) {
            var isWindow = this === window;
            if (isWindow && ev.originalEvent) {
                var width = win.width(), height = win.height();
                return (width != windowWidth || height != windowHeight) && (windowWidth = width, 
                windowHeight = height, clearTimeout(timer), timer = setTimeout(function() {
                    win.trigger("resize");
                }, 1)), !0;
            }
        }
    });
    var isPhantom = /Phantom/.test(navigator.userAgent), supportTouch = !isPhantom && "ontouchend" in document, scrollEvent = "touchmove scroll", touchStartEvent = supportTouch ? "touchstart" : "mousedown", touchStopEvent = supportTouch ? "touchend" : "mouseup", touchMoveEvent = supportTouch ? "touchmove" : "mousemove", data = function(event) {
        var d = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
        return {
            time: new Date().getTime(),
            coords: [ d.pageX, d.pageY ],
            origin: $(event.target)
        };
    }, swipe = $.event.swipe = {
        delay: 500,
        max: 320,
        min: 30
    };
    $.event.setupHelper([ "swipe", "swipeleft", "swiperight", "swipeup", "swipedown" ], touchStartEvent, function(ev) {
        function moveHandler(event) {
            start && (stop = data(event), Math.abs(start.coords[0] - stop.coords[0]) > 10 && event.preventDefault());
        }
        var stop, start = data(ev), delegate = ev.delegateTarget || ev.currentTarget, selector = ev.handleObj.selector, entered = this;
        $(document.documentElement).bind(touchMoveEvent, moveHandler).one(touchStopEvent, function(event) {
            if ($(this).unbind(touchMoveEvent, moveHandler), start && stop) {
                var deltaX = Math.abs(start.coords[0] - stop.coords[0]), deltaY = Math.abs(start.coords[1] - stop.coords[1]), distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                if (stop.time - start.time < swipe.delay && distance >= swipe.min && distance <= swipe.max) {
                    var events = [ "swipe" ];
                    deltaX >= swipe.min && deltaY < swipe.min ? events.push(start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight") : deltaY >= swipe.min && deltaX < swipe.min && events.push(start.coords[1] < stop.coords[1] ? "swipedown" : "swipeup"), 
                    $.each($.event.find(delegate, events, selector), function() {
                        this.call(entered, ev, {
                            start: start,
                            end: stop
                        });
                    });
                }
            }
            start = stop = undefined;
        });
    });
}(this, jQuery), function(factory) {
    if ("function" == typeof define && define.amd) define([], factory); else if ("object" == typeof exports) {
        var fs = require("fs");
        module.exports = factory(), module.exports.css = function() {
            return fs.readFileSync(__dirname + "/nouislider.min.css", "utf8");
        };
    } else window.noUiSlider = factory();
}(function() {
    "use strict";
    function unique(array) {
        return array.filter(function(a) {
            return this[a] ? !1 : this[a] = !0;
        }, {});
    }
    function closest(value, to) {
        return Math.round(value / to) * to;
    }
    function offset(elem) {
        var rect = elem.getBoundingClientRect(), doc = elem.ownerDocument, win = doc.defaultView || doc.parentWindow, docElem = doc.documentElement, xOff = win.pageXOffset;
        return /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (xOff = 0), {
            top: rect.top + win.pageYOffset - docElem.clientTop,
            left: rect.left + xOff - docElem.clientLeft
        };
    }
    function isNumeric(a) {
        return "number" == typeof a && !isNaN(a) && isFinite(a);
    }
    function accurateNumber(number) {
        var p = Math.pow(10, 7);
        return Number((Math.round(number * p) / p).toFixed(7));
    }
    function addClassFor(element, className, duration) {
        addClass(element, className), setTimeout(function() {
            removeClass(element, className);
        }, duration);
    }
    function limit(a) {
        return Math.max(Math.min(a, 100), 0);
    }
    function asArray(a) {
        return Array.isArray(a) ? a : [ a ];
    }
    function countDecimals(numStr) {
        var pieces = numStr.split(".");
        return pieces.length > 1 ? pieces[1].length : 0;
    }
    function addClass(el, className) {
        el.classList ? el.classList.add(className) : el.className += " " + className;
    }
    function removeClass(el, className) {
        el.classList ? el.classList.remove(className) : el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
    function hasClass(el, className) {
        el.classList ? el.classList.contains(className) : new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
    }
    function subRangeRatio(pa, pb) {
        return 100 / (pb - pa);
    }
    function fromPercentage(range, value) {
        return 100 * value / (range[1] - range[0]);
    }
    function toPercentage(range, value) {
        return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0]);
    }
    function isPercentage(range, value) {
        return value * (range[1] - range[0]) / 100 + range[0];
    }
    function getJ(value, arr) {
        for (var j = 1; value >= arr[j]; ) j += 1;
        return j;
    }
    function toStepping(xVal, xPct, value) {
        if (value >= xVal.slice(-1)[0]) return 100;
        var va, vb, pa, pb, j = getJ(value, xVal);
        return va = xVal[j - 1], vb = xVal[j], pa = xPct[j - 1], pb = xPct[j], pa + toPercentage([ va, vb ], value) / subRangeRatio(pa, pb);
    }
    function fromStepping(xVal, xPct, value) {
        if (value >= 100) return xVal.slice(-1)[0];
        var va, vb, pa, pb, j = getJ(value, xPct);
        return va = xVal[j - 1], vb = xVal[j], pa = xPct[j - 1], pb = xPct[j], isPercentage([ va, vb ], (value - pa) * subRangeRatio(pa, pb));
    }
    function getStep(xPct, xSteps, snap, value) {
        if (100 === value) return value;
        var a, b, j = getJ(value, xPct);
        return snap ? (a = xPct[j - 1], b = xPct[j], value - a > (b - a) / 2 ? b : a) : xSteps[j - 1] ? xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]) : value;
    }
    function handleEntryPoint(index, value, that) {
        var percentage;
        if ("number" == typeof value && (value = [ value ]), "[object Array]" !== Object.prototype.toString.call(value)) throw new Error("noUiSlider: 'range' contains invalid value.");
        if (percentage = "min" === index ? 0 : "max" === index ? 100 : parseFloat(index), 
        !isNumeric(percentage) || !isNumeric(value[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
        that.xPct.push(percentage), that.xVal.push(value[0]), percentage ? that.xSteps.push(isNaN(value[1]) ? !1 : value[1]) : isNaN(value[1]) || (that.xSteps[0] = value[1]);
    }
    function handleStepPoint(i, n, that) {
        return n ? void (that.xSteps[i] = fromPercentage([ that.xVal[i], that.xVal[i + 1] ], n) / subRangeRatio(that.xPct[i], that.xPct[i + 1])) : !0;
    }
    function Spectrum(entry, snap, direction, singleStep) {
        this.xPct = [], this.xVal = [], this.xSteps = [ singleStep || !1 ], this.xNumSteps = [ !1 ], 
        this.snap = snap, this.direction = direction;
        var index, ordered = [];
        for (index in entry) entry.hasOwnProperty(index) && ordered.push([ entry[index], index ]);
        for (ordered.sort(function(a, b) {
            return a[0] - b[0];
        }), index = 0; index < ordered.length; index++) handleEntryPoint(ordered[index][1], ordered[index][0], this);
        for (this.xNumSteps = this.xSteps.slice(0), index = 0; index < this.xNumSteps.length; index++) handleStepPoint(index, this.xNumSteps[index], this);
    }
    function testStep(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'step' is not numeric.");
        parsed.singleStep = entry;
    }
    function testRange(parsed, entry) {
        if ("object" != typeof entry || Array.isArray(entry)) throw new Error("noUiSlider: 'range' is not an object.");
        if (void 0 === entry.min || void 0 === entry.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
        parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.dir, parsed.singleStep);
    }
    function testStart(parsed, entry) {
        if (entry = asArray(entry), !Array.isArray(entry) || !entry.length || entry.length > 2) throw new Error("noUiSlider: 'start' option is incorrect.");
        parsed.handles = entry.length, parsed.start = entry;
    }
    function testSnap(parsed, entry) {
        if (parsed.snap = entry, "boolean" != typeof entry) throw new Error("noUiSlider: 'snap' option must be a boolean.");
    }
    function testAnimate(parsed, entry) {
        if (parsed.animate = entry, "boolean" != typeof entry) throw new Error("noUiSlider: 'animate' option must be a boolean.");
    }
    function testConnect(parsed, entry) {
        if ("lower" === entry && 1 === parsed.handles) parsed.connect = 1; else if ("upper" === entry && 1 === parsed.handles) parsed.connect = 2; else if (entry === !0 && 2 === parsed.handles) parsed.connect = 3; else {
            if (entry !== !1) throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
            parsed.connect = 0;
        }
    }
    function testOrientation(parsed, entry) {
        switch (entry) {
          case "horizontal":
            parsed.ort = 0;
            break;

          case "vertical":
            parsed.ort = 1;
            break;

          default:
            throw new Error("noUiSlider: 'orientation' option is invalid.");
        }
    }
    function testMargin(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'margin' option must be numeric.");
        if (parsed.margin = parsed.spectrum.getMargin(entry), !parsed.margin) throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.");
    }
    function testLimit(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'limit' option must be numeric.");
        if (parsed.limit = parsed.spectrum.getMargin(entry), !parsed.limit) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.");
    }
    function testDirection(parsed, entry) {
        switch (entry) {
          case "ltr":
            parsed.dir = 0;
            break;

          case "rtl":
            parsed.dir = 1, parsed.connect = [ 0, 2, 1, 3 ][parsed.connect];
            break;

          default:
            throw new Error("noUiSlider: 'direction' option was not recognized.");
        }
    }
    function testBehaviour(parsed, entry) {
        if ("string" != typeof entry) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
        var tap = entry.indexOf("tap") >= 0, drag = entry.indexOf("drag") >= 0, fixed = entry.indexOf("fixed") >= 0, snap = entry.indexOf("snap") >= 0;
        parsed.events = {
            tap: tap || snap,
            drag: drag,
            fixed: fixed,
            snap: snap
        };
    }
    function testFormat(parsed, entry) {
        if (parsed.format = entry, "function" == typeof entry.to && "function" == typeof entry.from) return !0;
        throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
    }
    function testOptions(options) {
        var tests, parsed = {
            margin: 0,
            limit: 0,
            animate: !0,
            format: defaultFormatter
        };
        tests = {
            step: {
                r: !1,
                t: testStep
            },
            start: {
                r: !0,
                t: testStart
            },
            connect: {
                r: !0,
                t: testConnect
            },
            direction: {
                r: !0,
                t: testDirection
            },
            snap: {
                r: !1,
                t: testSnap
            },
            animate: {
                r: !1,
                t: testAnimate
            },
            range: {
                r: !0,
                t: testRange
            },
            orientation: {
                r: !1,
                t: testOrientation
            },
            margin: {
                r: !1,
                t: testMargin
            },
            limit: {
                r: !1,
                t: testLimit
            },
            behaviour: {
                r: !0,
                t: testBehaviour
            },
            format: {
                r: !1,
                t: testFormat
            }
        };
        var defaults = {
            connect: !1,
            direction: "ltr",
            behaviour: "tap",
            orientation: "horizontal"
        };
        return Object.keys(defaults).forEach(function(name) {
            void 0 === options[name] && (options[name] = defaults[name]);
        }), Object.keys(tests).forEach(function(name) {
            var test = tests[name];
            if (void 0 === options[name]) {
                if (test.r) throw new Error("noUiSlider: '" + name + "' is required.");
                return !0;
            }
            test.t(parsed, options[name]);
        }), parsed.pips = options.pips, parsed.style = parsed.ort ? "top" : "left", parsed;
    }
    function getPositions(a, b, delimit) {
        var c = a + b[0], d = a + b[1];
        return delimit ? (0 > c && (d += Math.abs(c)), d > 100 && (c -= d - 100), [ limit(c), limit(d) ]) : [ c, d ];
    }
    function fixEvent(e) {
        e.preventDefault();
        var x, y, touch = 0 === e.type.indexOf("touch"), mouse = 0 === e.type.indexOf("mouse"), pointer = 0 === e.type.indexOf("pointer"), event = e;
        return 0 === e.type.indexOf("MSPointer") && (pointer = !0), touch && (x = e.changedTouches[0].pageX, 
        y = e.changedTouches[0].pageY), (mouse || pointer) && (x = e.clientX + window.pageXOffset, 
        y = e.clientY + window.pageYOffset), event.points = [ x, y ], event.cursor = mouse || pointer, 
        event;
    }
    function addHandle(direction, index) {
        var origin = document.createElement("div"), handle = document.createElement("div"), additions = [ "-lower", "-upper" ];
        return direction && additions.reverse(), addClass(handle, Classes[3]), addClass(handle, Classes[3] + additions[index]), 
        addClass(origin, Classes[2]), origin.appendChild(handle), origin;
    }
    function addConnection(connect, target, handles) {
        switch (connect) {
          case 1:
            addClass(target, Classes[7]), addClass(handles[0], Classes[6]);
            break;

          case 3:
            addClass(handles[1], Classes[6]);

          case 2:
            addClass(handles[0], Classes[7]);

          case 0:
            addClass(target, Classes[6]);
        }
    }
    function addHandles(nrHandles, direction, base) {
        var index, handles = [];
        for (index = 0; nrHandles > index; index += 1) handles.push(base.appendChild(addHandle(direction, index)));
        return handles;
    }
    function addSlider(direction, orientation, target) {
        addClass(target, Classes[0]), addClass(target, Classes[8 + direction]), addClass(target, Classes[4 + orientation]);
        var div = document.createElement("div");
        return addClass(div, Classes[1]), target.appendChild(div), div;
    }
    function closure(target, options) {
        function getGroup(mode, values, stepped) {
            if ("range" === mode || "steps" === mode) return scope_Spectrum.xVal;
            if ("count" === mode) {
                var v, spread = 100 / (values - 1), i = 0;
                for (values = []; (v = i++ * spread) <= 100; ) values.push(v);
                mode = "positions";
            }
            return "positions" === mode ? values.map(function(value) {
                return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
            }) : "values" === mode ? stepped ? values.map(function(value) {
                return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
            }) : values : void 0;
        }
        function generateSpread(density, mode, group) {
            var originalSpectrumDirection = scope_Spectrum.direction, indexes = {}, firstInRange = scope_Spectrum.xVal[0], lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1], ignoreFirst = !1, ignoreLast = !1, prevPct = 0;
            return scope_Spectrum.direction = 0, group = unique(group.slice().sort(function(a, b) {
                return a - b;
            })), group[0] !== firstInRange && (group.unshift(firstInRange), ignoreFirst = !0), 
            group[group.length - 1] !== lastInRange && (group.push(lastInRange), ignoreLast = !0), 
            group.forEach(function(current, index) {
                var step, i, q, newPct, pctDifference, pctPos, type, steps, realSteps, stepsize, low = current, high = group[index + 1];
                if ("steps" === mode && (step = scope_Spectrum.xNumSteps[index]), step || (step = high - low), 
                low !== !1 && void 0 !== high) for (i = low; high >= i; i += step) {
                    for (newPct = scope_Spectrum.toStepping(i), pctDifference = newPct - prevPct, steps = pctDifference / density, 
                    realSteps = Math.round(steps), stepsize = pctDifference / realSteps, q = 1; realSteps >= q; q += 1) pctPos = prevPct + q * stepsize, 
                    indexes[pctPos.toFixed(5)] = [ "x", 0 ];
                    type = group.indexOf(i) > -1 ? 1 : "steps" === mode ? 2 : 0, !index && ignoreFirst && (type = 0), 
                    i === high && ignoreLast || (indexes[newPct.toFixed(5)] = [ i, type ]), prevPct = newPct;
                }
            }), scope_Spectrum.direction = originalSpectrumDirection, indexes;
        }
        function addMarking(spread, filterFunc, formatter) {
            function getSize(type) {
                return [ "-normal", "-large", "-sub" ][type];
            }
            function getTags(offset, source, values) {
                return 'class="' + source + " " + source + "-" + style + " " + source + getSize(values[1]) + '" style="' + options.style + ": " + offset + '%"';
            }
            function addSpread(offset, values) {
                scope_Spectrum.direction && (offset = 100 - offset), values[1] = values[1] && filterFunc ? filterFunc(values[0], values[1]) : values[1], 
                element.innerHTML += "<div " + getTags(offset, "noUi-marker", values) + "></div>", 
                values[1] && (element.innerHTML += "<div " + getTags(offset, "noUi-value", values) + ">" + formatter.to(values[0]) + "</div>");
            }
            var style = [ "horizontal", "vertical" ][options.ort], element = document.createElement("div");
            return addClass(element, "noUi-pips"), addClass(element, "noUi-pips-" + style), 
            Object.keys(spread).forEach(function(a) {
                addSpread(a, spread[a]);
            }), element;
        }
        function pips(grid) {
            var mode = grid.mode, density = grid.density || 1, filter = grid.filter || !1, values = grid.values || !1, stepped = grid.stepped || !1, group = getGroup(mode, values, stepped), spread = generateSpread(density, mode, group), format = grid.format || {
                to: Math.round
            };
            return scope_Target.appendChild(addMarking(spread, filter, format));
        }
        function baseSize() {
            return scope_Base["offset" + [ "Width", "Height" ][options.ort]];
        }
        function fireEvent(event, handleNumber) {
            void 0 !== handleNumber && (handleNumber = Math.abs(handleNumber - options.dir)), 
            Object.keys(scope_Events).forEach(function(targetEvent) {
                var eventType = targetEvent.split(".")[0];
                event === eventType && scope_Events[targetEvent].forEach(function(callback) {
                    callback(asArray(valueGet()), handleNumber, inSliderOrder(Array.prototype.slice.call(scope_Values)));
                });
            });
        }
        function inSliderOrder(values) {
            return 1 === values.length ? values[0] : options.dir ? values.reverse() : values;
        }
        function attach(events, element, callback, data) {
            var method = function(e) {
                return scope_Target.hasAttribute("disabled") ? !1 : hasClass(scope_Target, Classes[14]) ? !1 : (e = fixEvent(e), 
                events === actions.start && void 0 !== e.buttons && e.buttons > 1 ? !1 : (e.calcPoint = e.points[options.ort], 
                void callback(e, data)));
            }, methods = [];
            return events.split(" ").forEach(function(eventName) {
                element.addEventListener(eventName, method, !1), methods.push([ eventName, method ]);
            }), methods;
        }
        function move(event, data) {
            var positions, i, handles = data.handles || scope_Handles, state = !1, proposal = 100 * (event.calcPoint - data.start) / baseSize(), handleNumber = handles[0] === scope_Handles[0] ? 0 : 1;
            if (positions = getPositions(proposal, data.positions, handles.length > 1), state = setHandle(handles[0], positions[handleNumber], 1 === handles.length), 
            handles.length > 1) {
                if (state = setHandle(handles[1], positions[handleNumber ? 0 : 1], !1) || state) for (i = 0; i < data.handles.length; i++) fireEvent("slide", i);
            } else state && fireEvent("slide", handleNumber);
        }
        function end(event, data) {
            var active = scope_Base.getElementsByClassName(Classes[15]), handleNumber = data.handles[0] === scope_Handles[0] ? 0 : 1;
            active.length && removeClass(active[0], Classes[15]), event.cursor && (document.body.style.cursor = "", 
            document.body.removeEventListener("selectstart", document.body.noUiListener));
            var d = document.documentElement;
            d.noUiListeners.forEach(function(c) {
                d.removeEventListener(c[0], c[1]);
            }), removeClass(scope_Target, Classes[12]), fireEvent("set", handleNumber), fireEvent("change", handleNumber);
        }
        function start(event, data) {
            var d = document.documentElement;
            if (1 === data.handles.length && (addClass(data.handles[0].children[0], Classes[15]), 
            data.handles[0].hasAttribute("disabled"))) return !1;
            event.stopPropagation();
            var moveEvent = attach(actions.move, d, move, {
                start: event.calcPoint,
                handles: data.handles,
                positions: [ scope_Locations[0], scope_Locations[scope_Handles.length - 1] ]
            }), endEvent = attach(actions.end, d, end, {
                handles: data.handles
            });
            if (d.noUiListeners = moveEvent.concat(endEvent), event.cursor) {
                document.body.style.cursor = getComputedStyle(event.target).cursor, scope_Handles.length > 1 && addClass(scope_Target, Classes[12]);
                var f = function() {
                    return !1;
                };
                document.body.noUiListener = f, document.body.addEventListener("selectstart", f, !1);
            }
        }
        function tap(event) {
            var handleNumber, to, location = event.calcPoint, total = 0;
            return event.stopPropagation(), scope_Handles.forEach(function(a) {
                total += offset(a)[options.style];
            }), handleNumber = total / 2 > location || 1 === scope_Handles.length ? 0 : 1, location -= offset(scope_Base)[options.style], 
            to = 100 * location / baseSize(), options.events.snap || addClassFor(scope_Target, Classes[14], 300), 
            scope_Handles[handleNumber].hasAttribute("disabled") ? !1 : (setHandle(scope_Handles[handleNumber], to), 
            fireEvent("slide", handleNumber), fireEvent("set", handleNumber), fireEvent("change", handleNumber), 
            void (options.events.snap && start(event, {
                handles: [ scope_Handles[total] ]
            })));
        }
        function events(behaviour) {
            var i, drag;
            if (!behaviour.fixed) for (i = 0; i < scope_Handles.length; i += 1) attach(actions.start, scope_Handles[i].children[0], start, {
                handles: [ scope_Handles[i] ]
            });
            behaviour.tap && attach(actions.start, scope_Base, tap, {
                handles: scope_Handles
            }), behaviour.drag && (drag = [ scope_Base.getElementsByClassName(Classes[7])[0] ], 
            addClass(drag[0], Classes[10]), behaviour.fixed && drag.push(scope_Handles[drag[0] === scope_Handles[0] ? 1 : 0].children[0]), 
            drag.forEach(function(element) {
                attach(actions.start, element, start, {
                    handles: scope_Handles
                });
            }));
        }
        function setHandle(handle, to, noLimitOption) {
            var trigger = handle !== scope_Handles[0] ? 1 : 0, lowerMargin = scope_Locations[0] + options.margin, upperMargin = scope_Locations[1] - options.margin, lowerLimit = scope_Locations[0] + options.limit, upperLimit = scope_Locations[1] - options.limit;
            return scope_Handles.length > 1 && (to = trigger ? Math.max(to, lowerMargin) : Math.min(to, upperMargin)), 
            noLimitOption !== !1 && options.limit && scope_Handles.length > 1 && (to = trigger ? Math.min(to, lowerLimit) : Math.max(to, upperLimit)), 
            to = scope_Spectrum.getStep(to), to = limit(parseFloat(to.toFixed(7))), to === scope_Locations[trigger] ? !1 : (handle.style[options.style] = to + "%", 
            handle.previousSibling || (removeClass(handle, Classes[17]), to > 50 && addClass(handle, Classes[17])), 
            scope_Locations[trigger] = to, scope_Values[trigger] = scope_Spectrum.fromStepping(to), 
            fireEvent("update", trigger), !0);
        }
        function setValues(count, values) {
            var i, trigger, to;
            for (options.limit && (count += 1), i = 0; count > i; i += 1) trigger = i % 2, to = values[trigger], 
            null !== to && to !== !1 && ("number" == typeof to && (to = String(to)), to = options.format.from(to), 
            (to === !1 || isNaN(to) || setHandle(scope_Handles[trigger], scope_Spectrum.toStepping(to), i === 3 - options.dir) === !1) && fireEvent("update", trigger));
        }
        function valueSet(input) {
            var count, i, values = asArray(input);
            for (options.dir && options.handles > 1 && values.reverse(), options.animate && -1 !== scope_Locations[0] && addClassFor(scope_Target, Classes[14], 300), 
            count = scope_Handles.length > 1 ? 3 : 1, 1 === values.length && (count = 1), setValues(count, values), 
            i = 0; i < scope_Handles.length; i++) fireEvent("set", i);
        }
        function valueGet() {
            var i, retour = [];
            for (i = 0; i < options.handles; i += 1) retour[i] = options.format.to(scope_Values[i]);
            return inSliderOrder(retour);
        }
        function destroy() {
            Classes.forEach(function(cls) {
                cls && removeClass(scope_Target, cls);
            }), scope_Target.innerHTML = "", delete scope_Target.noUiSlider;
        }
        function getCurrentStep() {
            var retour = scope_Locations.map(function(location, index) {
                var step = scope_Spectrum.getApplicableStep(location), stepDecimals = countDecimals(String(step[2])), value = scope_Values[index], increment = 100 === location ? null : step[2], prev = Number((value - step[2]).toFixed(stepDecimals)), decrement = 0 === location ? null : prev >= step[1] ? step[2] : step[0] || !1;
                return [ decrement, increment ];
            });
            return inSliderOrder(retour);
        }
        function bindEvent(namespacedEvent, callback) {
            scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [], scope_Events[namespacedEvent].push(callback), 
            "update" === namespacedEvent.split(".")[0] && scope_Handles.forEach(function(a, index) {
                fireEvent("update", index);
            });
        }
        function removeEvent(namespacedEvent) {
            var event = namespacedEvent.split(".")[0], namespace = namespacedEvent.substring(event.length);
            Object.keys(scope_Events).forEach(function(bind) {
                var tEvent = bind.split(".")[0], tNamespace = bind.substring(tEvent.length);
                event && event !== tEvent || namespace && namespace !== tNamespace || delete scope_Events[bind];
            });
        }
        var scope_Base, scope_Handles, scope_Target = target, scope_Locations = [ -1, -1 ], scope_Spectrum = options.spectrum, scope_Values = [], scope_Events = {};
        if (scope_Target.noUiSlider) throw new Error("Slider was already initialized.");
        return scope_Base = addSlider(options.dir, options.ort, scope_Target), scope_Handles = addHandles(options.handles, options.dir, scope_Base), 
        addConnection(options.connect, scope_Target, scope_Handles), events(options.events), 
        options.pips && pips(options.pips), {
            destroy: destroy,
            steps: getCurrentStep,
            on: bindEvent,
            off: removeEvent,
            get: valueGet,
            set: valueSet
        };
    }
    function initialize(target, originalOptions) {
        if (!target.nodeName) throw new Error("noUiSlider.create requires a single element.");
        var options = testOptions(originalOptions, target), slider = closure(target, options);
        slider.set(options.start), target.noUiSlider = slider;
    }
    var actions = window.navigator.pointerEnabled ? {
        start: "pointerdown",
        move: "pointermove",
        end: "pointerup"
    } : window.navigator.msPointerEnabled ? {
        start: "MSPointerDown",
        move: "MSPointerMove",
        end: "MSPointerUp"
    } : {
        start: "mousedown touchstart",
        move: "mousemove touchmove",
        end: "mouseup touchend"
    }, Classes = [ "noUi-target", "noUi-base", "noUi-origin", "noUi-handle", "noUi-horizontal", "noUi-vertical", "noUi-background", "noUi-connect", "noUi-ltr", "noUi-rtl", "noUi-dragable", "", "noUi-state-drag", "", "noUi-state-tap", "noUi-active", "", "noUi-stacking" ];
    Spectrum.prototype.getMargin = function(value) {
        return 2 === this.xPct.length ? fromPercentage(this.xVal, value) : !1;
    }, Spectrum.prototype.toStepping = function(value) {
        return value = toStepping(this.xVal, this.xPct, value), this.direction && (value = 100 - value), 
        value;
    }, Spectrum.prototype.fromStepping = function(value) {
        return this.direction && (value = 100 - value), accurateNumber(fromStepping(this.xVal, this.xPct, value));
    }, Spectrum.prototype.getStep = function(value) {
        return this.direction && (value = 100 - value), value = getStep(this.xPct, this.xSteps, this.snap, value), 
        this.direction && (value = 100 - value), value;
    }, Spectrum.prototype.getApplicableStep = function(value) {
        var j = getJ(value, this.xPct), offset = 100 === value ? 2 : 1;
        return [ this.xNumSteps[j - 2], this.xVal[j - offset], this.xNumSteps[j - offset] ];
    }, Spectrum.prototype.convert = function(value) {
        return this.getStep(this.toStepping(value));
    };
    var defaultFormatter = {
        to: function(value) {
            return value.toFixed(2);
        },
        from: Number
    };
    return {
        create: initialize
    };
}), function(undefined) {
    var __m4 = function() {
        var can = window.can || {};
        ("undefined" == typeof GLOBALCAN || GLOBALCAN !== !1) && (window.can = can), can.k = function() {}, 
        can.isDeferred = function(obj) {
            return obj && "function" == typeof obj.then && "function" == typeof obj.pipe;
        };
        var cid = 0;
        return can.cid = function(object, name) {
            return object._cid || (cid++, object._cid = (name || "") + cid), object._cid;
        }, can.VERSION = "@EDGE", can.simpleExtend = function(d, s) {
            for (var prop in s) d[prop] = s[prop];
            return d;
        }, can.frag = function(item) {
            var frag;
            return item && "string" != typeof item ? 11 === item.nodeType ? item : "number" == typeof item.nodeType ? (frag = document.createDocumentFragment(), 
            frag.appendChild(item), frag) : "number" == typeof item.length ? (frag = document.createDocumentFragment(), 
            can.each(item, function(item) {
                frag.appendChild(can.frag(item));
            }), frag) : (frag = can.buildFragment("" + item, document.body), frag.childNodes.length || frag.appendChild(document.createTextNode("")), 
            frag) : (frag = can.buildFragment(null == item ? "" : "" + item, document.body), 
            frag.childNodes.length || frag.appendChild(document.createTextNode("")), frag);
        }, can.__reading = function() {}, can;
    }(), __m5 = function(can) {
        var setImmediate = window.setImmediate || function(cb) {
            return setTimeout(cb, 0);
        }, attr = {
            MutationObserver: window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
            map: {
                "class": "className",
                value: "value",
                innerText: "innerText",
                textContent: "textContent",
                checked: !0,
                disabled: !0,
                readonly: !0,
                required: !0,
                src: function(el, val) {
                    return null == val || "" === val ? (el.removeAttribute("src"), null) : (el.setAttribute("src", val), 
                    val);
                },
                style: function(el, val) {
                    return el.style.cssText = val || "";
                }
            },
            defaultValue: [ "input", "textarea" ],
            set: function(el, attrName, val) {
                var oldValue;
                attr.MutationObserver || (oldValue = attr.get(el, attrName));
                var newValue, tagName = el.nodeName.toString().toLowerCase(), prop = attr.map[attrName];
                "function" == typeof prop ? newValue = prop(el, val) : prop === !0 ? (newValue = el[attrName] = !0, 
                "checked" === attrName && "radio" === el.type && can.inArray(tagName, attr.defaultValue) >= 0 && (el.defaultChecked = !0)) : prop ? (newValue = el[prop] = val, 
                "value" === prop && can.inArray(tagName, attr.defaultValue) >= 0 && (el.defaultValue = val)) : (el.setAttribute(attrName, val), 
                newValue = val), attr.MutationObserver || newValue === oldValue || attr.trigger(el, attrName, oldValue);
            },
            trigger: function(el, attrName, oldValue) {
                return can.data(can.$(el), "canHasAttributesBindings") ? setImmediate(function() {
                    can.trigger(el, {
                        type: "attributes",
                        attributeName: attrName,
                        target: el,
                        oldValue: oldValue,
                        bubbles: !1
                    }, []);
                }) : void 0;
            },
            get: function(el, attrName) {
                var prop = attr.map[attrName];
                return "string" == typeof prop && el[prop] ? el[prop] : el.getAttribute(attrName);
            },
            remove: function(el, attrName) {
                var oldValue;
                attr.MutationObserver || (oldValue = attr.get(el, attrName));
                var setter = attr.map[attrName];
                "function" == typeof setter && setter(el, undefined), setter === !0 ? el[attrName] = !1 : "string" == typeof setter ? el[setter] = "" : el.removeAttribute(attrName), 
                attr.MutationObserver || null == oldValue || attr.trigger(el, attrName, oldValue);
            },
            has: function() {
                var el = document.createElement("div");
                return el.hasAttribute ? function(el, name) {
                    return el.hasAttribute(name);
                } : function(el, name) {
                    return null !== el.getAttribute(name);
                };
            }()
        };
        return attr;
    }(__m4), __m6 = function(can) {
        return can.addEvent = function(event, handler) {
            var allEvents = this.__bindEvents || (this.__bindEvents = {}), eventList = allEvents[event] || (allEvents[event] = []);
            return eventList.push({
                handler: handler,
                name: event
            }), this;
        }, can.listenTo = function(other, event, handler) {
            var idedEvents = this.__listenToEvents;
            idedEvents || (idedEvents = this.__listenToEvents = {});
            var otherId = can.cid(other), othersEvents = idedEvents[otherId];
            othersEvents || (othersEvents = idedEvents[otherId] = {
                obj: other,
                events: {}
            });
            var eventsEvents = othersEvents.events[event];
            eventsEvents || (eventsEvents = othersEvents.events[event] = []), eventsEvents.push(handler), 
            can.bind.call(other, event, handler);
        }, can.stopListening = function(other, event, handler) {
            var idedEvents = this.__listenToEvents, iterIdedEvents = idedEvents, i = 0;
            if (!idedEvents) return this;
            if (other) {
                var othercid = can.cid(other);
                if ((iterIdedEvents = {})[othercid] = idedEvents[othercid], !idedEvents[othercid]) return this;
            }
            for (var cid in iterIdedEvents) {
                var eventsEvents, othersEvents = iterIdedEvents[cid];
                other = idedEvents[cid].obj, event ? (eventsEvents = {})[event] = othersEvents.events[event] : eventsEvents = othersEvents.events;
                for (var eventName in eventsEvents) {
                    var handlers = eventsEvents[eventName] || [];
                    for (i = 0; i < handlers.length; ) handler && handler === handlers[i] || !handler ? (can.unbind.call(other, eventName, handlers[i]), 
                    handlers.splice(i, 1)) : i++;
                    handlers.length || delete othersEvents.events[eventName];
                }
                can.isEmptyObject(othersEvents.events) && delete idedEvents[cid];
            }
            return this;
        }, can.removeEvent = function(event, fn, __validate) {
            if (!this.__bindEvents) return this;
            for (var ev, events = this.__bindEvents[event] || [], i = 0, isFunction = "function" == typeof fn; i < events.length; ) ev = events[i], 
            (__validate ? __validate(ev, event, fn) : isFunction && ev.handler === fn || !isFunction && (ev.cid === fn || !fn)) ? events.splice(i, 1) : i++;
            return this;
        }, can.dispatch = function(event, args) {
            var events = this.__bindEvents;
            if (events) {
                "string" == typeof event && (event = {
                    type: event
                });
                var eventName = event.type, handlers = (events[eventName] || []).slice(0), passed = [ event ];
                args && passed.push.apply(passed, args);
                for (var i = 0, len = handlers.length; len > i; i++) handlers[i].handler.apply(this, passed);
                return event;
            }
        }, can.one = function(event, handler) {
            var one = function() {
                return can.unbind.call(this, event, one), handler.apply(this, arguments);
            };
            return can.bind.call(this, event, one), this;
        }, can.event = {
            on: function() {
                return 0 === arguments.length && can.Control && this instanceof can.Control ? can.Control.prototype.on.call(this) : can.addEvent.apply(this, arguments);
            },
            off: function() {
                return 0 === arguments.length && can.Control && this instanceof can.Control ? can.Control.prototype.off.call(this) : can.removeEvent.apply(this, arguments);
            },
            bind: can.addEvent,
            unbind: can.removeEvent,
            delegate: function(selector, event, handler) {
                return can.addEvent.call(this, event, handler);
            },
            undelegate: function(selector, event, handler) {
                return can.removeEvent.call(this, event, handler);
            },
            trigger: can.dispatch,
            one: can.one,
            addEvent: can.addEvent,
            removeEvent: can.removeEvent,
            listenTo: can.listenTo,
            stopListening: can.stopListening,
            dispatch: can.dispatch
        }, can.event;
    }(__m4), __m7 = function(can) {
        var isArrayLike = function(obj) {
            var length = obj.length;
            return "function" != typeof arr && (0 === length || "number" == typeof length && length > 0 && length - 1 in obj);
        };
        return can.each = function(elements, callback, context) {
            var key, len, item, i = 0;
            if (elements) if (isArrayLike(elements)) if (can.List && elements instanceof can.List) for (len = elements.attr("length"); len > i && (item = elements.attr(i), 
            callback.call(context || item, item, i, elements) !== !1); i++) ; else for (len = elements.length; len > i && (item = elements[i], 
            callback.call(context || item, item, i, elements) !== !1); i++) ; else if ("object" == typeof elements) if (can.Map && elements instanceof can.Map || elements === can.route) {
                var keys = can.Map.keys(elements);
                for (i = 0, len = keys.length; len > i && (key = keys[i], item = elements.attr(key), 
                callback.call(context || item, item, key, elements) !== !1); i++) ;
            } else for (key in elements) if (elements.hasOwnProperty(key) && callback.call(context || elements[key], elements[key], key, elements) === !1) break;
            return elements;
        }, can;
    }(__m4), __m8 = function(can) {
        can.inserted = function(elems) {
            elems = can.makeArray(elems);
            for (var children, elem, inDocument = !1, doc = can.$(document.contains ? document : document.body), i = 0; (elem = elems[i]) !== undefined; i++) {
                if (!inDocument) {
                    if (!elem.getElementsByTagName) continue;
                    if (!can.has(doc, elem).length) return;
                    inDocument = !0;
                }
                if (inDocument && elem.getElementsByTagName) {
                    children = can.makeArray(elem.getElementsByTagName("*")), can.trigger(elem, "inserted", [], !1);
                    for (var child, j = 0; (child = children[j]) !== undefined; j++) can.trigger(child, "inserted", [], !1);
                }
            }
        }, can.appendChild = function(el, child) {
            var children;
            children = 11 === child.nodeType ? can.makeArray(child.childNodes) : [ child ], 
            el.appendChild(child), can.inserted(children);
        }, can.insertBefore = function(el, child, ref) {
            var children;
            children = 11 === child.nodeType ? can.makeArray(child.childNodes) : [ child ], 
            el.insertBefore(child, ref), can.inserted(children);
        };
    }(__m4), __m2 = function($, can, attr, event) {
        var isBindableElement = function(node) {
            return node.nodeName && (1 === node.nodeType || 9 === node.nodeType) || node == window;
        };
        $.extend(can, $, {
            trigger: function(obj, event, args, bubbles) {
                isBindableElement(obj) ? $.event.trigger(event, args, obj, !bubbles) : obj.trigger ? obj.trigger(event, args) : ("string" == typeof event && (event = {
                    type: event
                }), event.target = event.target || obj, args && (args.length && "string" == typeof args ? args = [ args ] : args.length || (args = [ args ])), 
                args || (args = []), can.dispatch.call(obj, event, args));
            },
            event: can.event,
            addEvent: can.addEvent,
            removeEvent: can.removeEvent,
            buildFragment: function(elems, context) {
                var ret;
                return elems = [ elems ], context = context || document, context = !context.nodeType && context[0] || context, 
                context = context.ownerDocument || context, ret = $.buildFragment(elems, context), 
                ret.cacheable ? $.clone(ret.fragment) : ret.fragment || ret;
            },
            $: $,
            each: can.each,
            bind: function(ev, cb) {
                return this.bind && this.bind !== can.bind ? this.bind(ev, cb) : isBindableElement(this) ? $.event.add(this, ev, cb) : can.addEvent.call(this, ev, cb), 
                this;
            },
            unbind: function(ev, cb) {
                return this.unbind && this.unbind !== can.unbind ? this.unbind(ev, cb) : isBindableElement(this) ? $.event.remove(this, ev, cb) : can.removeEvent.call(this, ev, cb), 
                this;
            },
            delegate: function(selector, ev, cb) {
                return this.delegate ? this.delegate(selector, ev, cb) : isBindableElement(this) ? $(this).delegate(selector, ev, cb) : can.bind.call(this, ev, cb), 
                this;
            },
            undelegate: function(selector, ev, cb) {
                return this.undelegate ? this.undelegate(selector, ev, cb) : isBindableElement(this) ? $(this).undelegate(selector, ev, cb) : can.unbind.call(this, ev, cb), 
                this;
            },
            proxy: function(fn, context) {
                return function() {
                    return fn.apply(context, arguments);
                };
            },
            attr: attr
        }), can.on = can.bind, can.off = can.unbind, $.each([ "append", "filter", "addClass", "remove", "data", "get", "has" ], function(i, name) {
            can[name] = function(wrapped) {
                return wrapped[name].apply(wrapped, can.makeArray(arguments).slice(1));
            };
        });
        var oldClean = $.cleanData;
        $.cleanData = function(elems) {
            $.each(elems, function(i, elem) {
                elem && can.trigger(elem, "removed", [], !1);
            }), oldClean(elems);
        };
        var cbIndex, oldDomManip = $.fn.domManip;
        if ($.fn.domManip = function(args, cb1, cb2) {
            for (var i = 1; i < arguments.length; i++) if ("function" == typeof arguments[i]) {
                cbIndex = i;
                break;
            }
            return oldDomManip.apply(this, arguments);
        }, $(document.createElement("div")).append(document.createElement("div")), $.fn.domManip = 2 === cbIndex ? function(args, table, callback) {
            return oldDomManip.call(this, args, table, function(elem) {
                var elems;
                11 === elem.nodeType && (elems = can.makeArray(elem.childNodes));
                var ret = callback.apply(this, arguments);
                return can.inserted(elems ? elems : [ elem ]), ret;
            });
        } : function(args, callback) {
            return oldDomManip.call(this, args, function(elem) {
                var elems;
                11 === elem.nodeType && (elems = can.makeArray(elem.childNodes));
                var ret = callback.apply(this, arguments);
                return can.inserted(elems ? elems : [ elem ]), ret;
            });
        }, can.attr.MutationObserver) $.event.special.attributes = {
            setup: function() {
                var self = this, observer = new can.attr.MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        var copy = can.simpleExtend({}, mutation);
                        can.trigger(self, copy, []);
                    });
                });
                observer.observe(this, {
                    attributes: !0,
                    attributeOldValue: !0
                }), can.data(can.$(this), "canAttributesObserver", observer);
            },
            teardown: function() {
                can.data(can.$(this), "canAttributesObserver").disconnect(), $.removeData(this, "canAttributesObserver");
            }
        }; else {
            var oldAttr = $.attr;
            $.attr = function(el, attrName) {
                var oldValue, newValue;
                arguments.length >= 3 && (oldValue = oldAttr.call(this, el, attrName));
                var res = oldAttr.apply(this, arguments);
                return arguments.length >= 3 && (newValue = oldAttr.call(this, el, attrName)), newValue !== oldValue && can.attr.trigger(el, attrName, oldValue), 
                res;
            };
            var oldRemove = $.removeAttr;
            $.removeAttr = function(el, attrName) {
                var oldValue = oldAttr.call(this, el, attrName), res = oldRemove.apply(this, arguments);
                return null != oldValue && can.attr.trigger(el, attrName, oldValue), res;
            }, $.event.special.attributes = {
                setup: function() {
                    can.data(can.$(this), "canHasAttributesBindings", !0);
                },
                teardown: function() {
                    $.removeData(this, "canHasAttributesBindings");
                }
            };
        }
        return function() {
            var text = "<-\n>", frag = can.buildFragment(text, document);
            if (text !== frag.childNodes[0].nodeValue) {
                var oldBuildFragment = can.buildFragment;
                can.buildFragment = function(content, context) {
                    var res = oldBuildFragment(content, context);
                    return 1 === res.childNodes.length && 3 === res.childNodes[0].nodeType && (res.childNodes[0].nodeValue = content), 
                    res;
                };
            }
        }(), $.event.special.inserted = {}, $.event.special.removed = {}, can;
    }(jQuery, __m4, __m5, __m6, __m7, __m8), __m10 = function(can) {
        var isFunction = can.isFunction, makeArray = can.makeArray, hookupId = 1, makeRenderer = function(textRenderer) {
            var renderer = function() {
                return $view.frag(textRenderer.apply(this, arguments));
            };
            return renderer.render = function() {
                return textRenderer.apply(textRenderer, arguments);
            }, renderer;
        }, checkText = function(text, url) {
            if (!text.length) throw "can.view: No template or empty template:" + url;
        }, get = function(obj, async) {
            var type, el, id, url = "string" == typeof obj ? obj : obj.url, suffix = obj.engine && "." + obj.engine || url.match(/\.[\w\d]+$/);
            if (url.match(/^#/) && (url = url.substr(1)), (el = document.getElementById(url)) && (suffix = "." + el.type.match(/\/(x\-)?(.+)/)[2]), 
            suffix || $view.cached[url] || (url += suffix = $view.ext), can.isArray(suffix) && (suffix = suffix[0]), 
            id = $view.toId(url), url.match(/^\/\//) && (url = url.substr(2), url = window.steal ? steal.config().root.mapJoin("" + steal.id(url)) : url), 
            window.require && require.toUrl && (url = require.toUrl(url)), type = $view.types[suffix], 
            $view.cached[id]) return $view.cached[id];
            if (el) return $view.registerView(id, el.innerHTML, type);
            var d = new can.Deferred();
            return can.ajax({
                async: async,
                url: url,
                dataType: "text",
                error: function(jqXHR) {
                    checkText("", url), d.reject(jqXHR);
                },
                success: function(text) {
                    checkText(text, url), $view.registerView(id, text, type, d);
                }
            }), d;
        }, getDeferreds = function(data) {
            var deferreds = [];
            if (can.isDeferred(data)) return [ data ];
            for (var prop in data) can.isDeferred(data[prop]) && deferreds.push(data[prop]);
            return deferreds;
        }, usefulPart = function(resolved) {
            return can.isArray(resolved) && "success" === resolved[1] ? resolved[0] : resolved;
        }, $view = can.view = can.template = function(view, data, helpers, callback) {
            isFunction(helpers) && (callback = helpers, helpers = undefined);
            var result;
            return result = isFunction(view) ? view(data, helpers, callback) : $view.renderAs("fragment", view, data, helpers, callback);
        };
        return can.extend($view, {
            frag: function(result, parentNode) {
                return $view.hookup($view.fragment(result), parentNode);
            },
            fragment: function(result) {
                if ("string" != typeof result && 11 === result.nodeType) return result;
                var frag = can.buildFragment(result, document.body);
                return frag.childNodes.length || frag.appendChild(document.createTextNode("")), 
                frag;
            },
            toId: function(src) {
                return can.map(src.toString().split(/\/|\./g), function(part) {
                    return part ? part : void 0;
                }).join("_");
            },
            toStr: function(txt) {
                return null == txt ? "" : "" + txt;
            },
            hookup: function(fragment, parentNode) {
                var id, func, hookupEls = [];
                return can.each(fragment.childNodes ? can.makeArray(fragment.childNodes) : fragment, function(node) {
                    1 === node.nodeType && (hookupEls.push(node), hookupEls.push.apply(hookupEls, can.makeArray(node.getElementsByTagName("*"))));
                }), can.each(hookupEls, function(el) {
                    el.getAttribute && (id = el.getAttribute("data-view-id")) && (func = $view.hookups[id]) && (func(el, parentNode, id), 
                    delete $view.hookups[id], el.removeAttribute("data-view-id"));
                }), fragment;
            },
            hookups: {},
            hook: function(cb) {
                return $view.hookups[++hookupId] = cb, " data-view-id='" + hookupId + "'";
            },
            cached: {},
            cachedRenderers: {},
            cache: !0,
            register: function(info) {
                this.types["." + info.suffix] = info, can[info.suffix] = $view[info.suffix] = function(id, text) {
                    var renderer, renderFunc;
                    if (!text) return renderFunc = function() {
                        return renderer || (renderer = info.fragRenderer ? info.fragRenderer(null, id) : makeRenderer(info.renderer(null, id))), 
                        renderer.apply(this, arguments);
                    }, renderFunc.render = function() {
                        var textRenderer = info.renderer(null, id);
                        return textRenderer.apply(textRenderer, arguments);
                    }, renderFunc;
                    var registeredRenderer = function() {
                        return renderer || (renderer = info.fragRenderer ? info.fragRenderer(id, text) : info.renderer(id, text)), 
                        renderer.apply(this, arguments);
                    };
                    return info.fragRenderer ? $view.preload(id, registeredRenderer) : $view.preloadStringRenderer(id, registeredRenderer);
                };
            },
            types: {},
            ext: ".ejs",
            registerScript: function(type, id, src) {
                return "can.view.preloadStringRenderer('" + id + "'," + $view.types["." + type].script(id, src) + ");";
            },
            preload: function(id, renderer) {
                var def = $view.cached[id] = new can.Deferred().resolve(function(data, helpers) {
                    return renderer.call(data, data, helpers);
                });
                return def.__view_id = id, $view.cachedRenderers[id] = renderer, renderer;
            },
            preloadStringRenderer: function(id, stringRenderer) {
                return this.preload(id, makeRenderer(stringRenderer));
            },
            render: function(view, data, helpers, callback) {
                return can.view.renderAs("string", view, data, helpers, callback);
            },
            renderTo: function(format, renderer, data, helpers) {
                return ("string" === format && renderer.render ? renderer.render : renderer)(data, helpers);
            },
            renderAs: function(format, view, data, helpers, callback) {
                isFunction(helpers) && (callback = helpers, helpers = undefined);
                var reading, deferred, dataCopy, async, response, deferreds = getDeferreds(data);
                if (deferreds.length) return deferred = new can.Deferred(), dataCopy = can.extend({}, data), 
                deferreds.push(get(view, !0)), can.when.apply(can, deferreds).then(function(resolved) {
                    var result, objs = makeArray(arguments), renderer = objs.pop();
                    if (can.isDeferred(data)) dataCopy = usefulPart(resolved); else for (var prop in data) can.isDeferred(data[prop]) && (dataCopy[prop] = usefulPart(objs.shift()));
                    result = can.view.renderTo(format, renderer, dataCopy, helpers), deferred.resolve(result, dataCopy), 
                    callback && callback(result, dataCopy);
                }, function() {
                    deferred.reject.apply(deferred, arguments);
                }), deferred;
                if (reading = can.__clearReading(), async = isFunction(callback), deferred = get(view, async), 
                reading && can.__setReading(reading), async) response = deferred, deferred.then(function(renderer) {
                    callback(data ? can.view.renderTo(format, renderer, data, helpers) : renderer);
                }); else {
                    if ("resolved" === deferred.state() && deferred.__view_id) {
                        var currentRenderer = $view.cachedRenderers[deferred.__view_id];
                        return data ? can.view.renderTo(format, currentRenderer, data, helpers) : currentRenderer;
                    }
                    deferred.then(function(renderer) {
                        response = data ? can.view.renderTo(format, renderer, data, helpers) : renderer;
                    });
                }
                return response;
            },
            registerView: function(id, text, type, def) {
                var renderer, info = "object" == typeof type ? type : $view.types[type || $view.ext];
                return renderer = info.fragRenderer ? info.fragRenderer(id, text) : makeRenderer(info.renderer(id, text)), 
                def = def || new can.Deferred(), $view.cache && ($view.cached[id] = def, def.__view_id = id, 
                $view.cachedRenderers[id] = renderer), def.resolve(renderer);
            }
        }), can;
    }(__m2), __m9 = function(can) {
        var attr = can.view.attr = function(attributeName, attrHandler) {
            if (!attrHandler) {
                var cb = attributes[attributeName];
                if (!cb) for (var i = 0, len = regExpAttributes.length; len > i; i++) {
                    var attrMatcher = regExpAttributes[i];
                    if (attrMatcher.match.test(attributeName)) {
                        cb = attrMatcher.handler;
                        break;
                    }
                }
                return cb;
            }
            "string" == typeof attributeName ? attributes[attributeName] = attrHandler : regExpAttributes.push({
                match: attributeName,
                handler: attrHandler
            });
        }, attributes = {}, regExpAttributes = [], automaticCustomElementCharacters = /[-\:]/, tag = can.view.tag = function(tagName, tagHandler) {
            if (!tagHandler) {
                var cb = tags[tagName.toLowerCase()];
                return !cb && automaticCustomElementCharacters.test(tagName) && (cb = function() {}), 
                cb;
            }
            window.html5 && (window.html5.elements += " " + tagName, window.html5.shivDocument()), 
            tags[tagName.toLowerCase()] = tagHandler;
        }, tags = {};
        return can.view.callbacks = {
            _tags: tags,
            _attributes: attributes,
            _regExpAttributes: regExpAttributes,
            tag: tag,
            attr: attr,
            tagHandler: function(el, tagName, tagData) {
                var res, helperTagCallback = tagData.options.attr("tags." + tagName), tagCallback = helperTagCallback || tags[tagName], scope = tagData.scope;
                if (tagCallback) {
                    var reads = can.__clearReading();
                    res = tagCallback(el, tagData), can.__setReading(reads);
                } else res = scope;
                if (res && tagData.subtemplate) {
                    scope !== res && (scope = scope.add(res));
                    var result = tagData.subtemplate(scope, tagData.options), frag = "string" == typeof result ? can.view.frag(result) : result;
                    can.appendChild(el, frag);
                }
            }
        }, can.view.callbacks;
    }(__m2, __m10), __m13 = function(can) {
        var strUndHash = /_|-/, strColons = /\=\=/, strWords = /([A-Z]+)([A-Z][a-z])/g, strLowUp = /([a-z\d])([A-Z])/g, strDash = /([a-z\d])([A-Z])/g, strReplacer = /\{([^\}]+)\}/g, strQuote = /"/g, strSingleQuote = /'/g, strHyphenMatch = /-+(.)?/g, strCamelMatch = /[a-z][A-Z]/g, getNext = function(obj, prop, add) {
            var result = obj[prop];
            return result === undefined && add === !0 && (result = obj[prop] = {}), result;
        }, isContainer = function(current) {
            return /^f|^o/.test(typeof current);
        }, convertBadValues = function(content) {
            var isInvalid = null === content || content === undefined || isNaN(content) && "" + content == "NaN";
            return "" + (isInvalid ? "" : content);
        };
        return can.extend(can, {
            esc: function(content) {
                return convertBadValues(content).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(strQuote, "&#34;").replace(strSingleQuote, "&#39;");
            },
            getObject: function(name, roots, add) {
                var current, i, container, rootsLength, parts = name ? name.split(".") : [], length = parts.length, r = 0;
                if (roots = can.isArray(roots) ? roots : [ roots || window ], rootsLength = roots.length, 
                !length) return roots[0];
                for (r; rootsLength > r; r++) {
                    for (current = roots[r], container = undefined, i = 0; length > i && isContainer(current); i++) container = current, 
                    current = getNext(container, parts[i]);
                    if (container !== undefined && current !== undefined) break;
                }
                if (add === !1 && current !== undefined && delete container[parts[i - 1]], add === !0 && current === undefined) for (current = roots[0], 
                i = 0; length > i && isContainer(current); i++) current = getNext(current, parts[i], !0);
                return current;
            },
            capitalize: function(s, cache) {
                return s.charAt(0).toUpperCase() + s.slice(1);
            },
            camelize: function(str) {
                return convertBadValues(str).replace(strHyphenMatch, function(match, chr) {
                    return chr ? chr.toUpperCase() : "";
                });
            },
            hyphenate: function(str) {
                return convertBadValues(str).replace(strCamelMatch, function(str, offset) {
                    return str.charAt(0) + "-" + str.charAt(1).toLowerCase();
                });
            },
            underscore: function(s) {
                return s.replace(strColons, "/").replace(strWords, "$1_$2").replace(strLowUp, "$1_$2").replace(strDash, "_").toLowerCase();
            },
            sub: function(str, data, remove) {
                var obs = [];
                return str = str || "", obs.push(str.replace(strReplacer, function(whole, inside) {
                    var ob = can.getObject(inside, data, remove === !0 ? !1 : undefined);
                    return ob === undefined || null === ob ? (obs = null, "") : isContainer(ob) && obs ? (obs.push(ob), 
                    "") : "" + ob;
                })), null === obs ? obs : obs.length <= 1 ? obs[0] : obs;
            },
            replacer: strReplacer,
            undHash: strUndHash
        }), can;
    }(__m2), __m12 = function(can) {
        var initializing = 0;
        return can.Construct = function() {
            return arguments.length ? can.Construct.extend.apply(can.Construct, arguments) : void 0;
        }, can.extend(can.Construct, {
            constructorExtends: !0,
            newInstance: function() {
                var args, inst = this.instance();
                return inst.setup && (args = inst.setup.apply(inst, arguments)), inst.init && inst.init.apply(inst, args || arguments), 
                inst;
            },
            _inherit: function(newProps, oldProps, addTo) {
                can.extend(addTo || newProps, newProps || {});
            },
            _overwrite: function(what, oldProps, propName, val) {
                what[propName] = val;
            },
            setup: function(base, fullName) {
                this.defaults = can.extend(!0, {}, base.defaults, this.defaults);
            },
            instance: function() {
                initializing = 1;
                var inst = new this();
                return initializing = 0, inst;
            },
            extend: function(fullName, klass, proto) {
                function Constructor() {
                    return initializing ? void 0 : this.constructor !== Constructor && arguments.length && Constructor.constructorExtends ? Constructor.extend.apply(Constructor, arguments) : Constructor.newInstance.apply(Constructor, arguments);
                }
                "string" != typeof fullName && (proto = klass, klass = fullName, fullName = null), 
                proto || (proto = klass, klass = null), proto = proto || {};
                var parts, current, _fullName, _shortName, name, shortName, namespace, prototype, _super_class = this, _super = this.prototype;
                prototype = this.instance(), can.Construct._inherit(proto, _super, prototype);
                for (name in _super_class) _super_class.hasOwnProperty(name) && (Constructor[name] = _super_class[name]);
                can.Construct._inherit(klass, _super_class, Constructor), fullName && (parts = fullName.split("."), 
                shortName = parts.pop(), current = can.getObject(parts.join("."), window, !0), namespace = current, 
                _fullName = can.underscore(fullName.replace(/\./g, "_")), _shortName = can.underscore(shortName), 
                current[shortName] = Constructor), can.extend(Constructor, {
                    constructor: Constructor,
                    prototype: prototype,
                    namespace: namespace,
                    _shortName: _shortName,
                    fullName: fullName,
                    _fullName: _fullName
                }), shortName !== undefined && (Constructor.shortName = shortName), Constructor.prototype.constructor = Constructor;
                var t = [ _super_class ].concat(can.makeArray(arguments)), args = Constructor.setup.apply(Constructor, t);
                return Constructor.init && Constructor.init.apply(Constructor, args || t), Constructor;
            }
        }), can.Construct.prototype.setup = function() {}, can.Construct.prototype.init = function() {}, 
        can.Construct;
    }(__m13), __m11 = function(can) {
        var basicProcessor, bind = function(el, ev, callback) {
            return can.bind.call(el, ev, callback), function() {
                can.unbind.call(el, ev, callback);
            };
        }, isFunction = can.isFunction, extend = can.extend, each = can.each, slice = [].slice, paramReplacer = /\{([^\}]+)\}/g, special = can.getObject("$.event.special", [ can ]) || {}, delegate = function(el, selector, ev, callback) {
            return can.delegate.call(el, selector, ev, callback), function() {
                can.undelegate.call(el, selector, ev, callback);
            };
        }, binder = function(el, ev, callback, selector) {
            return selector ? delegate(el, can.trim(selector), ev, callback) : bind(el, ev, callback);
        }, Control = can.Control = can.Construct({
            setup: function() {
                if (can.Construct.setup.apply(this, arguments), can.Control) {
                    var funcName, control = this;
                    control.actions = {};
                    for (funcName in control.prototype) control._isAction(funcName) && (control.actions[funcName] = control._action(funcName));
                }
            },
            _shifter: function(context, name) {
                var method = "string" == typeof name ? context[name] : name;
                return isFunction(method) || (method = context[method]), function() {
                    return context.called = name, method.apply(context, [ this.nodeName ? can.$(this) : this ].concat(slice.call(arguments, 0)));
                };
            },
            _isAction: function(methodName) {
                var val = this.prototype[methodName], type = typeof val;
                return "constructor" !== methodName && ("function" === type || "string" === type && isFunction(this.prototype[val])) && !!(special[methodName] || processors[methodName] || /[^\w]/.test(methodName));
            },
            _action: function(methodName, options) {
                if (paramReplacer.lastIndex = 0, options || !paramReplacer.test(methodName)) {
                    var convertedName = options ? can.sub(methodName, this._lookup(options)) : methodName;
                    if (!convertedName) return null;
                    var arr = can.isArray(convertedName), name = arr ? convertedName[1] : convertedName, parts = name.split(/\s+/g), event = parts.pop();
                    return {
                        processor: processors[event] || basicProcessor,
                        parts: [ name, parts.join(" "), event ],
                        delegate: arr ? convertedName[0] : undefined
                    };
                }
            },
            _lookup: function(options) {
                return [ options, window ];
            },
            processors: {},
            defaults: {}
        }, {
            setup: function(element, options) {
                var arr, cls = this.constructor, pluginname = cls.pluginName || cls._fullName;
                return this.element = can.$(element), pluginname && "can_control" !== pluginname && this.element.addClass(pluginname), 
                arr = can.data(this.element, "controls"), arr || (arr = [], can.data(this.element, "controls", arr)), 
                arr.push(this), this.options = extend({}, cls.defaults, options), this.on(), [ this.element, this.options ];
            },
            on: function(el, selector, eventName, func) {
                if (!el) {
                    this.off();
                    var funcName, ready, cls = this.constructor, bindings = this._bindings, actions = cls.actions, element = this.element, destroyCB = can.Control._shifter(this, "destroy");
                    for (funcName in actions) actions.hasOwnProperty(funcName) && (ready = actions[funcName] || cls._action(funcName, this.options, this), 
                    ready && (bindings.control[funcName] = ready.processor(ready.delegate || element, ready.parts[2], ready.parts[1], funcName, this)));
                    return can.bind.call(element, "removed", destroyCB), bindings.user.push(function(el) {
                        can.unbind.call(el, "removed", destroyCB);
                    }), bindings.user.length;
                }
                return "string" == typeof el && (func = eventName, eventName = selector, selector = el, 
                el = this.element), func === undefined && (func = eventName, eventName = selector, 
                selector = null), "string" == typeof func && (func = can.Control._shifter(this, func)), 
                this._bindings.user.push(binder(el, eventName, func, selector)), this._bindings.user.length;
            },
            off: function() {
                var el = this.element[0], bindings = this._bindings;
                bindings && (each(bindings.user || [], function(value) {
                    value(el);
                }), each(bindings.control || {}, function(value) {
                    value(el);
                })), this._bindings = {
                    user: [],
                    control: {}
                };
            },
            destroy: function() {
                if (null !== this.element) {
                    var controls, Class = this.constructor, pluginName = Class.pluginName || Class._fullName;
                    this.off(), pluginName && "can_control" !== pluginName && this.element.removeClass(pluginName), 
                    controls = can.data(this.element, "controls"), controls.splice(can.inArray(this, controls), 1), 
                    can.trigger(this, "destroyed"), this.element = null;
                }
            }
        }), processors = can.Control.processors;
        return basicProcessor = function(el, event, selector, methodName, control) {
            return binder(el, event, can.Control._shifter(control, methodName), selector);
        }, each([ "change", "click", "contextmenu", "dblclick", "keydown", "keyup", "keypress", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "reset", "resize", "scroll", "select", "submit", "focusin", "focusout", "mouseenter", "mouseleave", "touchstart", "touchmove", "touchcancel", "touchend", "touchleave", "inserted", "removed" ], function(v) {
            processors[v] = basicProcessor;
        }), Control;
    }(__m2, __m12), __m16 = function(can) {
        return can.bindAndSetup = function() {
            return can.addEvent.apply(this, arguments), this._init || (this._bindings ? this._bindings++ : (this._bindings = 1, 
            this._bindsetup && this._bindsetup())), this;
        }, can.unbindAndTeardown = function(ev, handler) {
            return can.removeEvent.apply(this, arguments), null === this._bindings ? this._bindings = 0 : this._bindings--, 
            !this._bindings && this._bindteardown && this._bindteardown(), this;
        }, can;
    }(__m2), __m17 = function(can) {
        var bubble = can.bubble = {
            event: function(map, eventName) {
                return map.constructor._bubbleRule(eventName, map);
            },
            childrenOf: function(parentMap, eventName) {
                parentMap._each(function(child, prop) {
                    child && child.bind && bubble.toParent(child, parentMap, prop, eventName);
                });
            },
            teardownChildrenFrom: function(parentMap, eventName) {
                parentMap._each(function(child) {
                    bubble.teardownFromParent(parentMap, child, eventName);
                });
            },
            toParent: function(child, parent, prop, eventName) {
                can.listenTo.call(parent, child, eventName, function() {
                    var args = can.makeArray(arguments), ev = args.shift();
                    args[0] = (can.List && parent instanceof can.List ? parent.indexOf(child) : prop) + (args[0] ? "." + args[0] : ""), 
                    ev.triggeredNS = ev.triggeredNS || {}, ev.triggeredNS[parent._cid] || (ev.triggeredNS[parent._cid] = !0, 
                    can.trigger(parent, ev, args));
                });
            },
            teardownFromParent: function(parent, child, eventName) {
                child && child.unbind && can.stopListening.call(parent, child, eventName);
            },
            isBubbling: function(parent, eventName) {
                return parent._bubbleBindings && parent._bubbleBindings[eventName];
            },
            bind: function(parent, eventName) {
                if (!parent._init) {
                    var bubbleEvent = bubble.event(parent, eventName);
                    bubbleEvent && (parent._bubbleBindings || (parent._bubbleBindings = {}), parent._bubbleBindings[bubbleEvent] ? parent._bubbleBindings[bubbleEvent]++ : (parent._bubbleBindings[bubbleEvent] = 1, 
                    bubble.childrenOf(parent, bubbleEvent)));
                }
            },
            unbind: function(parent, eventName) {
                var bubbleEvent = bubble.event(parent, eventName);
                bubbleEvent && (parent._bubbleBindings && parent._bubbleBindings[bubbleEvent]--, 
                parent._bubbleBindings && !parent._bubbleBindings[bubbleEvent] && (delete parent._bubbleBindings[bubbleEvent], 
                bubble.teardownChildrenFrom(parent, bubbleEvent), can.isEmptyObject(parent._bubbleBindings) && delete parent._bubbleBindings));
            },
            add: function(parent, child, prop) {
                if (child instanceof can.Map && parent._bubbleBindings) for (var eventName in parent._bubbleBindings) parent._bubbleBindings[eventName] && (bubble.teardownFromParent(parent, child, eventName), 
                bubble.toParent(child, parent, prop, eventName));
            },
            removeMany: function(parent, children) {
                for (var i = 0, len = children.length; len > i; i++) bubble.remove(parent, children[i]);
            },
            remove: function(parent, child) {
                if (child instanceof can.Map && parent._bubbleBindings) for (var eventName in parent._bubbleBindings) parent._bubbleBindings[eventName] && bubble.teardownFromParent(parent, child, eventName);
            },
            set: function(parent, prop, value, current) {
                return can.Map.helpers.isObservable(value) && bubble.add(parent, value, prop), can.Map.helpers.isObservable(current) && bubble.remove(parent, current), 
                value;
            }
        };
        return bubble;
    }(__m2), __m18 = function(can) {
        var batchNum = 1, transactions = 0, batchEvents = [], stopCallbacks = [];
        can.batch = {
            start: function(batchStopHandler) {
                transactions++, batchStopHandler && stopCallbacks.push(batchStopHandler);
            },
            stop: function(force, callStart) {
                if (force ? transactions = 0 : transactions--, 0 === transactions) {
                    var i, len, items = batchEvents.slice(0), callbacks = stopCallbacks.slice(0);
                    for (batchEvents = [], stopCallbacks = [], batchNum++, callStart && can.batch.start(), 
                    i = 0, len = items.length; len > i; i++) can.dispatch.apply(items[i][0], items[i][1]);
                    for (i = 0, len = callbacks.length; i < callbacks.length; i++) callbacks[i]();
                }
            },
            trigger: function(item, event, args) {
                if (!item._init) {
                    if (0 === transactions) return can.dispatch.call(item, event, args);
                    event = "string" == typeof event ? {
                        type: event
                    } : event, event.batchNum = batchNum, batchEvents.push([ item, [ event, args ] ]);
                }
            }
        };
    }(__m4), __m15 = function(can, bind, bubble) {
        var madeMap = null, teardownMap = function() {
            for (var cid in madeMap) madeMap[cid].added && delete madeMap[cid].obj._cid;
            madeMap = null;
        }, getMapFromObject = function(obj) {
            return madeMap && madeMap[obj._cid] && madeMap[obj._cid].instance;
        }, serializeMap = null, Map = can.Map = can.Construct.extend({
            setup: function() {
                if (can.Construct.setup.apply(this, arguments), can.Map) {
                    this.defaults || (this.defaults = {}), this._computes = [];
                    for (var prop in this.prototype) "define" !== prop && "function" != typeof this.prototype[prop] ? this.defaults[prop] = this.prototype[prop] : this.prototype[prop].isComputed && this._computes.push(prop);
                    this.helpers.define && this.helpers.define(this);
                }
                !can.List || this.prototype instanceof can.List || (this.List = Map.List.extend({
                    Map: this
                }, {}));
            },
            _bubble: bubble,
            _bubbleRule: function(eventName) {
                return ("change" === eventName || eventName.indexOf(".") >= 0) && "change";
            },
            _computes: [],
            bind: can.bindAndSetup,
            on: can.bindAndSetup,
            unbind: can.unbindAndTeardown,
            off: can.unbindAndTeardown,
            id: "id",
            helpers: {
                define: null,
                attrParts: function(attr, keepKey) {
                    return keepKey ? [ attr ] : "object" == typeof attr ? attr : ("" + attr).split(".");
                },
                addToMap: function(obj, instance) {
                    var teardown;
                    madeMap || (teardown = teardownMap, madeMap = {});
                    var hasCid = obj._cid, cid = can.cid(obj);
                    return madeMap[cid] || (madeMap[cid] = {
                        obj: obj,
                        instance: instance,
                        added: !hasCid
                    }), teardown;
                },
                isObservable: function(obj) {
                    return obj instanceof can.Map || obj && obj === can.route;
                },
                canMakeObserve: function(obj) {
                    return obj && !can.isDeferred(obj) && (can.isArray(obj) || can.isPlainObject(obj));
                },
                serialize: function(map, how, where) {
                    var cid = can.cid(map), firstSerialize = !1;
                    return serializeMap || (firstSerialize = !0, serializeMap = {
                        attr: {},
                        serialize: {}
                    }), serializeMap[how][cid] = where, map.each(function(val, name) {
                        var result, isObservable = Map.helpers.isObservable(val), serialized = isObservable && serializeMap[how][can.cid(val)];
                        result = serialized ? serialized : "serialize" === how ? Map.helpers._serialize(map, name, val) : Map.helpers._getValue(map, name, val, how), 
                        result !== undefined && (where[name] = result);
                    }), can.__reading(map, "__keys"), firstSerialize && (serializeMap = null), where;
                },
                _serialize: function(map, name, val) {
                    return Map.helpers._getValue(map, name, val, "serialize");
                },
                _getValue: function(map, name, val, how) {
                    return Map.helpers.isObservable(val) ? val[how]() : val;
                }
            },
            keys: function(map) {
                var keys = [];
                can.__reading(map, "__keys");
                for (var keyName in map._data) keys.push(keyName);
                return keys;
            }
        }, {
            setup: function(obj) {
                this._data = {}, can.cid(this, ".map"), this._init = 1;
                var defaultValues = this._setupDefaults();
                this._setupComputes(defaultValues);
                var teardownMapping = obj && can.Map.helpers.addToMap(obj, this), data = can.extend(can.extend(!0, {}, defaultValues), obj);
                this.attr(data), teardownMapping && teardownMapping(), this.bind("change", can.proxy(this._changes, this)), 
                delete this._init;
            },
            _setupComputes: function() {
                var computes = this.constructor._computes;
                this._computedBindings = {};
                for (var prop, i = 0, len = computes.length; len > i; i++) prop = computes[i], this[prop] = this[prop].clone(this), 
                this._computedBindings[prop] = {
                    count: 0
                };
            },
            _setupDefaults: function() {
                return this.constructor.defaults || {};
            },
            _bindsetup: function() {},
            _bindteardown: function() {},
            _changes: function(ev, attr, how, newVal, oldVal) {
                can.batch.trigger(this, {
                    type: attr,
                    batchNum: ev.batchNum,
                    target: ev.target
                }, [ newVal, oldVal ]);
            },
            _triggerChange: function(attr, how, newVal, oldVal) {
                bubble.isBubbling(this, "change") ? can.batch.trigger(this, {
                    type: "change",
                    target: this
                }, [ attr, how, newVal, oldVal ]) : can.batch.trigger(this, attr, [ newVal, oldVal ]), 
                ("remove" === how || "add" === how) && can.batch.trigger(this, {
                    type: "__keys",
                    target: this
                });
            },
            _each: function(callback) {
                var data = this.__get();
                for (var prop in data) data.hasOwnProperty(prop) && callback(data[prop], prop);
            },
            attr: function(attr, val) {
                var type = typeof attr;
                return "string" !== type && "number" !== type ? this._attrs(attr, val) : 1 === arguments.length ? (can.__reading(this, attr), 
                this._get(attr)) : (this._set(attr, val), this);
            },
            each: function() {
                return can.each.apply(undefined, [ this ].concat(can.makeArray(arguments)));
            },
            removeAttr: function(attr) {
                var isList = can.List && this instanceof can.List, parts = can.Map.helpers.attrParts(attr), prop = parts.shift(), current = isList ? this[prop] : this._data[prop];
                return parts.length && current ? current.removeAttr(parts) : ("string" == typeof attr && ~attr.indexOf(".") && (prop = attr), 
                this._remove(prop, current), current);
            },
            _remove: function(prop, current) {
                prop in this._data && (delete this._data[prop], prop in this.constructor.prototype || delete this[prop], 
                this._triggerChange(prop, "remove", undefined, current));
            },
            _get: function(attr) {
                attr = "" + attr;
                var dotIndex = attr.indexOf(".");
                if (dotIndex >= 0) {
                    var value = this.__get(attr);
                    if (value !== undefined) return value;
                    var first = attr.substr(0, dotIndex), second = attr.substr(dotIndex + 1), current = this.__get(first);
                    return current && current._get ? current._get(second) : undefined;
                }
                return this.__get(attr);
            },
            __get: function(attr) {
                return attr ? this._computedBindings[attr] ? this[attr]() : this._data[attr] : this._data;
            },
            __type: function(value, prop) {
                if (!(value instanceof can.Map) && can.Map.helpers.canMakeObserve(value)) {
                    var cached = getMapFromObject(value);
                    if (cached) return cached;
                    if (can.isArray(value)) {
                        var List = can.List;
                        return new List(value);
                    }
                    var Map = this.constructor.Map || can.Map;
                    return new Map(value);
                }
                return value;
            },
            _set: function(attr, value, keepKey) {
                attr = "" + attr;
                var current, dotIndex = attr.indexOf(".");
                if (!keepKey && dotIndex >= 0) {
                    var first = attr.substr(0, dotIndex), second = attr.substr(dotIndex + 1);
                    if (current = this._init ? undefined : this.__get(first), !Map.helpers.isObservable(current)) throw "can.Map: Object does not exist";
                    current._set(second, value);
                } else this.__convert && (value = this.__convert(attr, value)), current = this._init ? undefined : this.__get(attr), 
                this.__set(attr, this.__type(value, attr), current);
            },
            __set: function(prop, value, current) {
                if (value !== current) {
                    var changeType = current !== undefined || this.__get().hasOwnProperty(prop) ? "set" : "add";
                    this.___set(prop, this.constructor._bubble.set(this, prop, value, current)), this._triggerChange(prop, changeType, value, current), 
                    current && this.constructor._bubble.teardownFromParent(this, current);
                }
            },
            ___set: function(prop, val) {
                this._computedBindings[prop] ? this[prop](val) : this._data[prop] = val, "function" == typeof this.constructor.prototype[prop] || this._computedBindings[prop] || (this[prop] = val);
            },
            bind: function(eventName, handler) {
                var computedBinding = this._computedBindings && this._computedBindings[eventName];
                if (computedBinding) if (computedBinding.count) computedBinding.count++; else {
                    computedBinding.count = 1;
                    var self = this;
                    computedBinding.handler = function(ev, newVal, oldVal) {
                        can.batch.trigger(self, {
                            type: eventName,
                            batchNum: ev.batchNum,
                            target: self
                        }, [ newVal, oldVal ]);
                    }, this[eventName].bind("change", computedBinding.handler);
                }
                return this.constructor._bubble.bind(this, eventName), can.bindAndSetup.apply(this, arguments);
            },
            unbind: function(eventName, handler) {
                var computedBinding = this._computedBindings && this._computedBindings[eventName];
                return computedBinding && (1 === computedBinding.count ? (computedBinding.count = 0, 
                this[eventName].unbind("change", computedBinding.handler), delete computedBinding.handler) : computedBinding.count--), 
                this.constructor._bubble.unbind(this, eventName), can.unbindAndTeardown.apply(this, arguments);
            },
            serialize: function() {
                return can.Map.helpers.serialize(this, "serialize", {});
            },
            _attrs: function(props, remove) {
                if (props === undefined) return Map.helpers.serialize(this, "attr", {});
                props = can.simpleExtend({}, props);
                var prop, newVal, self = this;
                can.batch.start(), this.each(function(curVal, prop) {
                    if ("_cid" !== prop) {
                        if (newVal = props[prop], newVal === undefined) return void (remove && self.removeAttr(prop));
                        self.__convert && (newVal = self.__convert(prop, newVal)), Map.helpers.isObservable(newVal) ? self.__set(prop, self.__type(newVal, prop), curVal) : Map.helpers.isObservable(curVal) && Map.helpers.canMakeObserve(newVal) ? curVal.attr(newVal, remove) : curVal !== newVal && self.__set(prop, self.__type(newVal, prop), curVal), 
                        delete props[prop];
                    }
                });
                for (prop in props) "_cid" !== prop && (newVal = props[prop], this._set(prop, newVal, !0));
                return can.batch.stop(), this;
            },
            compute: function(prop) {
                if (can.isFunction(this.constructor.prototype[prop])) return can.compute(this[prop], this);
                var reads = prop.split("."), last = reads.length - 1, options = {
                    args: []
                };
                return can.compute(function(newVal) {
                    return arguments.length ? void can.compute.read(this, reads.slice(0, last)).value.attr(reads[last], newVal) : can.compute.read(this, reads, options).value;
                }, this);
            }
        });
        return Map.prototype.on = Map.prototype.bind, Map.prototype.off = Map.prototype.unbind, 
        Map;
    }(__m2, __m16, __m17, __m12, __m18), __m19 = function(can, Map, bubble) {
        var splice = [].splice, spliceRemovesProps = function() {
            var obj = {
                0: "a",
                length: 1
            };
            return splice.call(obj, 0, 1), !obj[0];
        }(), list = Map.extend({
            Map: Map
        }, {
            setup: function(instances, options) {
                this.length = 0, can.cid(this, ".map"), this._init = 1, this._setupComputes(), instances = instances || [];
                var teardownMapping;
                can.isDeferred(instances) ? this.replace(instances) : (teardownMapping = instances.length && can.Map.helpers.addToMap(instances, this), 
                this.push.apply(this, can.makeArray(instances || []))), teardownMapping && teardownMapping(), 
                this.bind("change", can.proxy(this._changes, this)), can.simpleExtend(this, options), 
                delete this._init;
            },
            _triggerChange: function(attr, how, newVal, oldVal) {
                Map.prototype._triggerChange.apply(this, arguments);
                var index = +attr;
                ~attr.indexOf(".") || isNaN(index) || ("add" === how ? (can.batch.trigger(this, how, [ newVal, index ]), 
                can.batch.trigger(this, "length", [ this.length ])) : "remove" === how ? (can.batch.trigger(this, how, [ oldVal, index ]), 
                can.batch.trigger(this, "length", [ this.length ])) : can.batch.trigger(this, how, [ newVal, index ]));
            },
            __get: function(attr) {
                return attr ? this[attr] && this[attr].isComputed && can.isFunction(this.constructor.prototype[attr]) ? this[attr]() : this[attr] : this;
            },
            ___set: function(attr, val) {
                this[attr] = val, +attr >= this.length && (this.length = +attr + 1);
            },
            _remove: function(prop, current) {
                isNaN(+prop) ? (delete this[prop], this._triggerChange(prop, "remove", undefined, current)) : this.splice(prop, 1);
            },
            _each: function(callback) {
                for (var data = this.__get(), i = 0; i < data.length; i++) callback(data[i], i);
            },
            serialize: function() {
                return Map.helpers.serialize(this, "serialize", []);
            },
            splice: function(index, howMany) {
                var i, j, args = can.makeArray(arguments), added = [];
                for (i = 2; i < args.length; i++) args[i] = bubble.set(this, i, this.__type(args[i], i)), 
                added.push(args[i]);
                howMany === undefined && (howMany = args[1] = this.length - index);
                var removed = splice.apply(this, args), cleanRemoved = removed;
                if (added.length && removed.length) for (j = 0; j < removed.length; j++) can.inArray(removed[j], added) >= 0 && cleanRemoved.splice(j, 1);
                if (!spliceRemovesProps) for (i = this.length; i < removed.length + this.length; i++) delete this[i];
                return can.batch.start(), howMany > 0 && (this._triggerChange("" + index, "remove", undefined, removed), 
                bubble.removeMany(this, removed)), args.length > 2 && this._triggerChange("" + index, "add", args.slice(2), removed), 
                can.batch.stop(), removed;
            },
            _attrs: function(items, remove) {
                return items === undefined ? Map.helpers.serialize(this, "attr", []) : (items = can.makeArray(items), 
                can.batch.start(), this._updateAttrs(items, remove), void can.batch.stop());
            },
            _updateAttrs: function(items, remove) {
                for (var len = Math.min(items.length, this.length), prop = 0; len > prop; prop++) {
                    var curVal = this[prop], newVal = items[prop];
                    Map.helpers.isObservable(curVal) && Map.helpers.canMakeObserve(newVal) ? curVal.attr(newVal, remove) : curVal !== newVal && this._set(prop, newVal);
                }
                items.length > this.length ? this.push.apply(this, items.slice(this.length)) : items.length < this.length && remove && this.splice(items.length);
            }
        }), getArgs = function(args) {
            return args[0] && can.isArray(args[0]) ? args[0] : can.makeArray(args);
        };
        return can.each({
            push: "length",
            unshift: 0
        }, function(where, name) {
            var orig = [][name];
            list.prototype[name] = function() {
                for (var res, val, args = [], len = where ? this.length : 0, i = arguments.length; i--; ) val = arguments[i], 
                args[i] = bubble.set(this, i, this.__type(val, i));
                return res = orig.apply(this, args), (!this.comparator || args.length) && this._triggerChange("" + len, "add", args, undefined), 
                res;
            };
        }), can.each({
            pop: "length",
            shift: 0
        }, function(where, name) {
            list.prototype[name] = function() {
                var args = getArgs(arguments), len = where && this.length ? this.length - 1 : 0, res = [][name].apply(this, args);
                return this._triggerChange("" + len, "remove", undefined, [ res ]), res && res.unbind && bubble.remove(this, res), 
                res;
            };
        }), can.extend(list.prototype, {
            indexOf: function(item, fromIndex) {
                return this.attr("length"), can.inArray(item, this, fromIndex);
            },
            join: function() {
                return [].join.apply(this.attr(), arguments);
            },
            reverse: function() {
                var list = can.makeArray([].reverse.call(this));
                this.replace(list);
            },
            slice: function() {
                var temp = Array.prototype.slice.apply(this, arguments);
                return new this.constructor(temp);
            },
            concat: function() {
                var args = [];
                return can.each(can.makeArray(arguments), function(arg, i) {
                    args[i] = arg instanceof can.List ? arg.serialize() : arg;
                }), new this.constructor(Array.prototype.concat.apply(this.serialize(), args));
            },
            forEach: function(cb, thisarg) {
                return can.each(this, cb, thisarg || this);
            },
            replace: function(newList) {
                return can.isDeferred(newList) ? newList.then(can.proxy(this.replace, this)) : this.splice.apply(this, [ 0, this.length ].concat(can.makeArray(newList || []))), 
                this;
            },
            filter: function(callback, thisArg) {
                var filtered, filteredList = new can.List(), self = this;
                return this.each(function(item, index, list) {
                    filtered = callback.call(thisArg | self, item, index, self), filtered && filteredList.push(item);
                }), filteredList;
            }
        }), can.List = Map.List = list, can.List;
    }(__m2, __m15, __m17), __m20 = function(can, bind) {
        var stack = [];
        can.__read = function(func, self) {
            stack.push({});
            var value = func.call(self);
            return {
                value: value,
                observed: stack.pop()
            };
        }, can.__reading = function(obj, event) {
            stack.length && (stack[stack.length - 1][obj._cid + "|" + event] = {
                obj: obj,
                event: event + ""
            });
        }, can.__clearReading = function() {
            if (stack.length) {
                var ret = stack[stack.length - 1];
                return stack[stack.length - 1] = {}, ret;
            }
        }, can.__setReading = function(o) {
            stack.length && (stack[stack.length - 1] = o);
        }, can.__addReading = function(o) {
            stack.length && can.simpleExtend(stack[stack.length - 1], o);
        };
        var getValueAndBind = function(func, context, oldObserved, onchanged) {
            var info = can.__read(func, context), newObserveSet = info.observed;
            return bindNewSet(oldObserved, newObserveSet, onchanged), unbindOldSet(oldObserved, onchanged), 
            info;
        }, bindNewSet = function(oldObserved, newObserveSet, onchanged) {
            for (var name in newObserveSet) bindOrPreventUnbinding(oldObserved, newObserveSet, name, onchanged);
        }, bindOrPreventUnbinding = function(oldObserved, newObserveSet, name, onchanged) {
            if (oldObserved[name]) delete oldObserved[name]; else {
                var obEv = newObserveSet[name];
                obEv.obj.bind(obEv.event, onchanged);
            }
        }, unbindOldSet = function(oldObserved, onchanged) {
            for (var name in oldObserved) {
                var obEv = oldObserved[name];
                obEv.obj.unbind(obEv.event, onchanged);
            }
        }, updateOnChange = function(compute, newValue, oldValue, batchNum) {
            newValue !== oldValue && can.batch.trigger(compute, batchNum ? {
                type: "change",
                batchNum: batchNum
            } : "change", [ newValue, oldValue ]);
        }, setupComputeHandlers = function(compute, func, context, setCachedValue) {
            var readInfo, onchanged, batchNum;
            return {
                on: function(updater) {
                    onchanged || (onchanged = function(ev) {
                        if (compute.bound && (ev.batchNum === undefined || ev.batchNum !== batchNum)) {
                            var oldValue = readInfo.value;
                            readInfo = getValueAndBind(func, context, readInfo.observed, onchanged), updater(readInfo.value, oldValue, ev.batchNum), 
                            batchNum = batchNum = ev.batchNum;
                        }
                    }), readInfo = getValueAndBind(func, context, {}, onchanged), setCachedValue(readInfo.value), 
                    compute.hasDependencies = !can.isEmptyObject(readInfo.observed);
                },
                off: function(updater) {
                    for (var name in readInfo.observed) {
                        var ob = readInfo.observed[name];
                        ob.obj.unbind(ob.event, onchanged);
                    }
                }
            };
        }, setupSingleBindComputeHandlers = function(compute, func, context, setCachedValue) {
            var readInfo, oldValue, onchanged, batchNum;
            return {
                on: function(updater) {
                    onchanged || (onchanged = function(ev) {
                        if (compute.bound && (ev.batchNum === undefined || ev.batchNum !== batchNum)) {
                            var newValue = func.call(context);
                            updater(newValue, oldValue, ev.batchNum), oldValue = newValue, batchNum = batchNum = ev.batchNum;
                        }
                    }), readInfo = getValueAndBind(func, context, {}, onchanged), oldValue = readInfo.value, 
                    setCachedValue(readInfo.value), compute.hasDependencies = !can.isEmptyObject(readInfo.observed);
                },
                off: function(updater) {
                    for (var name in readInfo.observed) {
                        var ob = readInfo.observed[name];
                        ob.obj.unbind(ob.event, onchanged);
                    }
                }
            };
        }, isObserve = function(obj) {
            return obj instanceof can.Map || obj && obj.__get;
        }, k = function() {};
        can.compute = function(getterSetter, context, eventName, bindOnce) {
            if (getterSetter && getterSetter.isComputed) return getterSetter;
            for (var computed, value, form, on = k, off = k, get = function() {
                return value;
            }, set = function(newVal) {
                value = newVal;
            }, setCached = set, args = [], updater = function(newValue, oldValue, batchNum) {
                setCached(newValue), updateOnChange(computed, newValue, oldValue, batchNum);
            }, i = 0, arglen = arguments.length; arglen > i; i++) args[i] = arguments[i];
            if (computed = function(newVal) {
                if (arguments.length) {
                    var old = value, setVal = set.call(context, newVal, old);
                    return computed.hasDependencies ? get.call(context) : (value = setVal === undefined ? get.call(context) : setVal, 
                    updateOnChange(computed, value, old), value);
                }
                return stack.length && computed.canReadForChangeEvent !== !1 && (can.__reading(computed, "change"), 
                computed.bound || can.compute.temporarilyBind(computed)), computed.bound ? value : get.call(context);
            }, "function" == typeof getterSetter) {
                set = getterSetter, get = getterSetter, computed.canReadForChangeEvent = eventName === !1 ? !1 : !0;
                var handlers = bindOnce ? setupSingleBindComputeHandlers(computed, getterSetter, context || this, setCached) : setupComputeHandlers(computed, getterSetter, context || this, setCached);
                on = handlers.on, off = handlers.off;
            } else if (context) if ("string" == typeof context) {
                var propertyName = context, isObserve = getterSetter instanceof can.Map;
                if (isObserve) {
                    computed.hasDependencies = !0;
                    var handler;
                    get = function() {
                        return getterSetter.attr(propertyName);
                    }, set = function(newValue) {
                        getterSetter.attr(propertyName, newValue);
                    }, on = function(update) {
                        handler = function(ev, newVal, oldVal) {
                            update(newVal, oldVal, ev.batchNum);
                        }, getterSetter.bind(eventName || propertyName, handler), value = can.__read(get).value;
                    }, off = function(update) {
                        getterSetter.unbind(eventName || propertyName, handler);
                    };
                } else get = function() {
                    return getterSetter[propertyName];
                }, set = function(newValue) {
                    getterSetter[propertyName] = newValue;
                }, on = function(update) {
                    handler = function() {
                        update(get(), value);
                    }, can.bind.call(getterSetter, eventName || propertyName, handler), value = can.__read(get).value;
                }, off = function(update) {
                    can.unbind.call(getterSetter, eventName || propertyName, handler);
                };
            } else if ("function" == typeof context) value = getterSetter, set = context, context = eventName, 
            form = "setter"; else {
                value = getterSetter;
                var options = context, oldUpdater = updater;
                if (context = options.context || options, get = options.get || get, set = options.set || function() {
                    return value;
                }, options.fn) {
                    var data, fn = options.fn;
                    get = function() {
                        return fn.call(context, value);
                    }, 0 === fn.length ? data = setupComputeHandlers(computed, fn, context, setCached) : 1 === fn.length ? data = setupComputeHandlers(computed, function() {
                        return fn.call(context, value);
                    }, context, setCached) : (updater = function(newVal) {
                        newVal !== undefined && oldUpdater(newVal, value);
                    }, data = setupComputeHandlers(computed, function() {
                        var res = fn.call(context, value, function(newVal) {
                            oldUpdater(newVal, value);
                        });
                        return res !== undefined ? res : value;
                    }, context, setCached)), on = data.on, off = data.off;
                } else updater = function() {
                    var newVal = get.call(context);
                    oldUpdater(newVal, value);
                };
                on = options.on || on, off = options.off || off;
            } else value = getterSetter;
            return can.cid(computed, "compute"), can.simpleExtend(computed, {
                isComputed: !0,
                _bindsetup: function() {
                    this.bound = !0;
                    var oldReading = can.__clearReading();
                    on.call(this, updater), can.__setReading(oldReading);
                },
                _bindteardown: function() {
                    off.call(this, updater), this.bound = !1;
                },
                bind: can.bindAndSetup,
                unbind: can.unbindAndTeardown,
                clone: function(context) {
                    return context && ("setter" === form ? args[2] = context : args[1] = context), can.compute.apply(can, args);
                }
            });
        };
        var computes, unbindComputes = function() {
            for (var i = 0, len = computes.length; len > i; i++) computes[i].unbind("change", k);
            computes = null;
        };
        return can.compute.temporarilyBind = function(compute) {
            compute.bind("change", k), computes || (computes = [], setTimeout(unbindComputes, 10)), 
            computes.push(compute);
        }, can.compute.truthy = function(compute) {
            return can.compute(function() {
                var res = compute();
                return "function" == typeof res && (res = res()), !!res;
            });
        }, can.compute.async = function(initialValue, asyncComputer, context) {
            return can.compute(initialValue, {
                fn: asyncComputer,
                context: context
            });
        }, can.compute.read = function(parent, reads, options) {
            options = options || {};
            for (var type, prev, foundObs, cur = parent, i = 0, readLength = reads.length; readLength > i; i++) if (prev = cur, 
            prev && prev.isComputed && (options.foundObservable && options.foundObservable(prev, i), 
            prev = prev()), isObserve(prev) ? (!foundObs && options.foundObservable && options.foundObservable(prev, i), 
            foundObs = 1, cur = "function" == typeof prev[reads[i]] && prev.constructor.prototype[reads[i]] === prev[reads[i]] ? options.returnObserveMethods ? cur[reads[i]] : "constructor" === reads[i] && prev instanceof can.Construct ? prev[reads[i]] : prev[reads[i]].apply(prev, options.args || []) : cur.attr(reads[i])) : cur = prev[reads[i]], 
            type = typeof cur, cur && cur.isComputed && !options.isArgument && readLength - 1 > i ? (!foundObs && options.foundObservable && options.foundObservable(prev, i + 1), 
            cur = cur()) : i < reads.length - 1 && "function" === type && options.executeAnonymousFunctions && !(can.Construct && cur.prototype instanceof can.Construct) && (cur = cur()), 
            i < reads.length - 1 && (null === cur || "function" !== type && "object" !== type)) return options.earlyExit && options.earlyExit(prev, i, cur), 
            {
                value: undefined,
                parent: prev
            };
            return "function" != typeof cur || can.Construct && cur.prototype instanceof can.Construct || (options.isArgument ? cur.isComputed || options.proxyMethods === !1 || (cur = can.proxy(cur, prev)) : (cur.isComputed && !foundObs && options.foundObservable && options.foundObservable(cur, i), 
            cur = cur.call(prev))), cur === undefined && options.earlyExit && options.earlyExit(prev, i - 1), 
            {
                value: cur,
                parent: prev
            };
        }, can.compute;
    }(__m2, __m16, __m18), __m14 = function(can) {
        return can.Observe = can.Map, can.Observe.startBatch = can.batch.start, can.Observe.stopBatch = can.batch.stop, 
        can.Observe.triggerBatch = can.batch.trigger, can;
    }(__m2, __m15, __m19, __m20), __m22 = function(can) {
        var escapeReg = /(\\)?\./g, escapeDotReg = /\\\./g, getNames = function(attr) {
            var names = [], last = 0;
            return attr.replace(escapeReg, function(first, second, index) {
                second || (names.push(attr.slice(last, index).replace(escapeDotReg, ".")), last = index + first.length);
            }), names.push(attr.slice(last).replace(escapeDotReg, ".")), names;
        }, Scope = can.Construct.extend({
            read: can.compute.read
        }, {
            init: function(context, parent) {
                this._context = context, this._parent = parent, this.__cache = {};
            },
            attr: function(key) {
                var previousReads = can.__clearReading(), res = this.read(key, {
                    isArgument: !0,
                    returnObserveMethods: !0,
                    proxyMethods: !1
                }).value;
                return can.__setReading(previousReads), res;
            },
            add: function(context) {
                return context !== this._context ? new this.constructor(context, this) : this;
            },
            computeData: function(key, options) {
                options = options || {
                    args: []
                };
                var rootObserve, rootReads, self = this, computeData = {
                    compute: can.compute(function(newVal) {
                        if (!arguments.length) {
                            if (rootObserve) return can.compute.read(rootObserve, rootReads, options).value;
                            var data = self.read(key, options);
                            return rootObserve = data.rootObserve, rootReads = data.reads, computeData.scope = data.scope, 
                            computeData.initialValue = data.value, computeData.reads = data.reads, computeData.root = rootObserve, 
                            data.value;
                        }
                        if (rootObserve.isComputed && !rootReads.length) rootObserve(newVal); else {
                            var last = rootReads.length - 1;
                            can.compute.read(rootObserve, rootReads.slice(0, last)).value.attr(rootReads[last], newVal);
                        }
                    })
                };
                return computeData;
            },
            compute: function(key, options) {
                return this.computeData(key, options).compute;
            },
            read: function(attr, options) {
                var stopLookup;
                if ("./" === attr.substr(0, 2)) stopLookup = !0, attr = attr.substr(2); else {
                    if ("../" === attr.substr(0, 3)) return this._parent.read(attr.substr(3), options);
                    if (".." === attr) return {
                        value: this._parent._context
                    };
                    if ("." === attr || "this" === attr) return {
                        value: this._context
                    };
                }
                for (var context, defaultObserve, defaultComputeReadings, defaultScope, currentObserve, currentReads, names = -1 === attr.indexOf("\\.") ? attr.split(".") : getNames(attr), scope = this, defaultReads = [], defaultPropertyDepth = -1; scope; ) {
                    if (context = scope._context, null !== context) {
                        var data = can.compute.read(context, names, can.simpleExtend({
                            foundObservable: function(observe, nameIndex) {
                                currentObserve = observe, currentReads = names.slice(nameIndex);
                            },
                            earlyExit: function(parentValue, nameIndex) {
                                nameIndex > defaultPropertyDepth && (defaultObserve = currentObserve, defaultReads = currentReads, 
                                defaultPropertyDepth = nameIndex, defaultScope = scope, defaultComputeReadings = can.__clearReading());
                            },
                            executeAnonymousFunctions: !0
                        }, options));
                        if (data.value !== undefined) return {
                            scope: scope,
                            rootObserve: currentObserve,
                            value: data.value,
                            reads: currentReads
                        };
                    }
                    can.__clearReading(), scope = stopLookup ? null : scope._parent;
                }
                return defaultObserve ? (can.__setReading(defaultComputeReadings), {
                    scope: defaultScope,
                    rootObserve: defaultObserve,
                    reads: defaultReads,
                    value: undefined
                }) : {
                    names: names,
                    value: undefined
                };
            }
        });
        return can.view.Scope = Scope, Scope;
    }(__m2, __m12, __m15, __m19, __m10, __m20), __m24 = function(can) {
        var selectsCommentNodes = function() {
            return 1 === can.$(document.createComment("~")).length;
        }(), elements = {
            tagToContentPropMap: {
                option: "textContent" in document.createElement("option") ? "textContent" : "innerText",
                textarea: "value"
            },
            attrMap: can.attr.map,
            attrReg: /([^\s=]+)[\s]*=[\s]*/,
            defaultValue: can.attr.defaultValue,
            tagMap: {
                "": "span",
                colgroup: "col",
                table: "tbody",
                tr: "td",
                ol: "li",
                ul: "li",
                tbody: "tr",
                thead: "tr",
                tfoot: "tr",
                select: "option",
                optgroup: "option"
            },
            reverseTagMap: {
                col: "colgroup",
                tr: "tbody",
                option: "select",
                td: "tr",
                th: "tr",
                li: "ul"
            },
            getParentNode: function(el, defaultParentNode) {
                return defaultParentNode && 11 === el.parentNode.nodeType ? defaultParentNode : el.parentNode;
            },
            setAttr: can.attr.set,
            getAttr: can.attr.get,
            removeAttr: can.attr.remove,
            contentText: function(text) {
                return "string" == typeof text ? text : text || 0 === text ? "" + text : "";
            },
            after: function(oldElements, newFrag) {
                var last = oldElements[oldElements.length - 1];
                last.nextSibling ? can.insertBefore(last.parentNode, newFrag, last.nextSibling) : can.appendChild(last.parentNode, newFrag);
            },
            replace: function(oldElements, newFrag) {
                elements.after(oldElements, newFrag), can.remove(can.$(oldElements)).length < oldElements.length && !selectsCommentNodes && can.each(oldElements, function(el) {
                    8 === el.nodeType && el.parentNode.removeChild(el);
                });
            }
        };
        return can.view.elements = elements, elements;
    }(__m2, __m10), __m23 = function(can, elements, viewCallbacks) {
        var newLine = /(\r|\n)+/g, notEndTag = /\//, clean = function(content) {
            return content.split("\\").join("\\\\").split("\n").join("\\n").split('"').join('\\"').split("	").join("\\t");
        }, getTag = function(tagName, tokens, i) {
            if (tagName) return tagName;
            for (;i < tokens.length; ) {
                if ("<" === tokens[i] && !notEndTag.test(tokens[i + 1])) return elements.reverseTagMap[tokens[i + 1]] || "span";
                i++;
            }
            return "";
        }, bracketNum = function(content) {
            return --content.split("{").length - --content.split("}").length;
        }, myEval = function(script) {
            eval(script);
        }, attrReg = /([^\s]+)[\s]*=[\s]*$/, startTxt = "var ___v1ew = [];", finishTxt = "return ___v1ew.join('')", put_cmd = "___v1ew.push(\n", insert_cmd = put_cmd, htmlTag = null, quote = null, beforeQuote = null, rescan = null, getAttrName = function() {
            var matches = beforeQuote.match(attrReg);
            return matches && matches[1];
        }, status = function() {
            return quote ? "'" + getAttrName() + "'" : htmlTag ? 1 : 0;
        }, top = function(stack) {
            return stack[stack.length - 1];
        }, Scanner;
        return can.view.Scanner = Scanner = function(options) {
            can.extend(this, {
                text: {},
                tokens: []
            }, options), this.text.options = this.text.options || "", this.tokenReg = [], this.tokenSimple = {
                "<": "<",
                ">": ">",
                '"': '"',
                "'": "'"
            }, this.tokenComplex = [], this.tokenMap = {};
            for (var token, i = 0; token = this.tokens[i]; i++) token[2] ? (this.tokenReg.push(token[2]), 
            this.tokenComplex.push({
                abbr: token[1],
                re: new RegExp(token[2]),
                rescan: token[3]
            })) : (this.tokenReg.push(token[1]), this.tokenSimple[token[1]] = token[0]), this.tokenMap[token[0]] = token[1];
            this.tokenReg = new RegExp("(" + this.tokenReg.slice(0).concat([ "<", ">", '"', "'" ]).join("|") + ")", "g");
        }, Scanner.prototype = {
            helpers: [],
            scan: function(source, name) {
                var tokens = [], last = 0, simple = this.tokenSimple, complex = this.tokenComplex;
                source = source.replace(newLine, "\n"), this.transform && (source = this.transform(source)), 
                source.replace(this.tokenReg, function(whole, part) {
                    var offset = arguments[arguments.length - 2];
                    if (offset > last && tokens.push(source.substring(last, offset)), simple[whole]) tokens.push(whole); else for (var token, i = 0; token = complex[i]; i++) if (token.re.test(whole)) {
                        tokens.push(token.abbr), token.rescan && tokens.push(token.rescan(part));
                        break;
                    }
                    last = offset + part.length;
                }), last < source.length && tokens.push(source.substr(last));
                var lastToken, bracketCount, token, attrName, content = "", buff = [ startTxt + (this.text.start || "") ], put = function(content, bonus) {
                    buff.push(put_cmd, '"', clean(content), '"' + (bonus || "") + ");");
                }, endStack = [], startTag = null, magicInTag = !1, specialStates = {
                    attributeHookups: [],
                    tagHookups: [],
                    lastTagHookup: ""
                }, popTagHookup = function() {
                    specialStates.lastTagHookup = specialStates.tagHookups.pop() + specialStates.tagHookups.length;
                }, tagName = "", tagNames = [], popTagName = !1, specialAttribute = !1, i = 0, tmap = this.tokenMap;
                for (htmlTag = quote = beforeQuote = null; (token = tokens[i++]) !== undefined; ) {
                    if (null === startTag) switch (token) {
                      case tmap.left:
                      case tmap.escapeLeft:
                      case tmap.returnLeft:
                        magicInTag = htmlTag && 1;

                      case tmap.commentLeft:
                        startTag = token, content.length && put(content), content = "";
                        break;

                      case tmap.escapeFull:
                        magicInTag = htmlTag && 1, rescan = 1, startTag = tmap.escapeLeft, content.length && put(content), 
                        rescan = tokens[i++], content = rescan.content || rescan, rescan.before && put(rescan.before), 
                        tokens.splice(i, 0, tmap.right);
                        break;

                      case tmap.commentFull:
                        break;

                      case tmap.templateLeft:
                        content += tmap.left;
                        break;

                      case "<":
                        0 !== tokens[i].indexOf("!--") && (htmlTag = 1, magicInTag = 0), content += token;
                        break;

                      case ">":
                        htmlTag = 0;
                        var emptyElement = "/" === content.substr(content.length - 1) || "--" === content.substr(content.length - 2), attrs = "";
                        if (specialStates.attributeHookups.length && (attrs = "attrs: ['" + specialStates.attributeHookups.join("','") + "'], ", 
                        specialStates.attributeHookups = []), tagName + specialStates.tagHookups.length !== specialStates.lastTagHookup && tagName === top(specialStates.tagHookups)) emptyElement && (content = content.substr(0, content.length - 1)), 
                        buff.push(put_cmd, '"', clean(content), '"', ",can.view.pending({tagName:'" + tagName + "'," + attrs + "scope: " + (this.text.scope || "this") + this.text.options), 
                        emptyElement ? (buff.push("}));"), content = "/>", popTagHookup()) : "<" === tokens[i] && tokens[i + 1] === "/" + tagName ? (buff.push("}));"), 
                        content = token, popTagHookup()) : (buff.push(",subtemplate: function(" + this.text.argNames + "){\n" + startTxt + (this.text.start || "")), 
                        content = ""); else if (magicInTag || !popTagName && elements.tagToContentPropMap[tagNames[tagNames.length - 1]] || attrs) {
                            var pendingPart = ",can.view.pending({" + attrs + "scope: " + (this.text.scope || "this") + this.text.options + '}),"';
                            emptyElement ? put(content.substr(0, content.length - 1), pendingPart + '/>"') : put(content, pendingPart + '>"'), 
                            content = "", magicInTag = 0;
                        } else content += token;
                        (emptyElement || popTagName) && (tagNames.pop(), tagName = tagNames[tagNames.length - 1], 
                        popTagName = !1), specialStates.attributeHookups = [];
                        break;

                      case "'":
                      case '"':
                        if (htmlTag) if (quote && quote === token) {
                            quote = null;
                            var attr = getAttrName();
                            if (viewCallbacks.attr(attr) && specialStates.attributeHookups.push(attr), specialAttribute) {
                                content += token, put(content), buff.push(finishTxt, "}));\n"), content = "", specialAttribute = !1;
                                break;
                            }
                        } else if (null === quote && (quote = token, beforeQuote = lastToken, attrName = getAttrName(), 
                        "img" === tagName && "src" === attrName || "style" === attrName)) {
                            put(content.replace(attrReg, "")), content = "", specialAttribute = !0, buff.push(insert_cmd, "can.view.txt(2,'" + getTag(tagName, tokens, i) + "'," + status() + ",this,function(){", startTxt), 
                            put(attrName + "=" + token);
                            break;
                        }

                      default:
                        if ("<" === lastToken) {
                            tagName = "!--" === token.substr(0, 3) ? "!--" : token.split(/\s/)[0];
                            var cleanedTagName, isClosingTag = !1;
                            0 === tagName.indexOf("/") && (isClosingTag = !0, cleanedTagName = tagName.substr(1)), 
                            isClosingTag ? (top(tagNames) === cleanedTagName && (tagName = cleanedTagName, popTagName = !0), 
                            top(specialStates.tagHookups) === cleanedTagName && (put(content.substr(0, content.length - 1)), 
                            buff.push(finishTxt + "}}) );"), content = "><", popTagHookup())) : (tagName.lastIndexOf("/") === tagName.length - 1 && (tagName = tagName.substr(0, tagName.length - 1)), 
                            "!--" !== tagName && viewCallbacks.tag(tagName) && ("content" === tagName && elements.tagMap[top(tagNames)] && (token = token.replace("content", elements.tagMap[top(tagNames)])), 
                            specialStates.tagHookups.push(tagName)), tagNames.push(tagName));
                        }
                        content += token;
                    } else switch (token) {
                      case tmap.right:
                      case tmap.returnRight:
                        switch (startTag) {
                          case tmap.left:
                            bracketCount = bracketNum(content), 1 === bracketCount ? (buff.push(insert_cmd, "can.view.txt(0,'" + getTag(tagName, tokens, i) + "'," + status() + ",this,function(){", startTxt, content), 
                            endStack.push({
                                before: "",
                                after: finishTxt + "}));\n"
                            })) : (last = endStack.length && -1 === bracketCount ? endStack.pop() : {
                                after: ";"
                            }, last.before && buff.push(last.before), buff.push(content, ";", last.after));
                            break;

                          case tmap.escapeLeft:
                          case tmap.returnLeft:
                            bracketCount = bracketNum(content), bracketCount && endStack.push({
                                before: finishTxt,
                                after: "}));\n"
                            });
                            for (var escaped = startTag === tmap.escapeLeft ? 1 : 0, commands = {
                                insert: insert_cmd,
                                tagName: getTag(tagName, tokens, i),
                                status: status(),
                                specialAttribute: specialAttribute
                            }, ii = 0; ii < this.helpers.length; ii++) {
                                var helper = this.helpers[ii];
                                if (helper.name.test(content)) {
                                    content = helper.fn(content, commands), helper.name.source === /^>[\s]*\w*/.source && (escaped = 0);
                                    break;
                                }
                            }
                            "object" == typeof content ? content.startTxt && content.end && specialAttribute ? buff.push(insert_cmd, "can.view.toStr( ", content.content, "() ) );") : (content.startTxt ? buff.push(insert_cmd, "can.view.txt(\n" + ("string" == typeof status() || (null != content.escaped ? content.escaped : escaped)) + ",\n'" + tagName + "',\n" + status() + ",\nthis,\n") : content.startOnlyTxt && buff.push(insert_cmd, "can.view.onlytxt(this,\n"), 
                            buff.push(content.content), content.end && buff.push("));")) : specialAttribute ? buff.push(insert_cmd, content, ");") : buff.push(insert_cmd, "can.view.txt(\n" + ("string" == typeof status() || escaped) + ",\n'" + tagName + "',\n" + status() + ",\nthis,\nfunction(){ " + (this.text.escape || "") + "return ", content, bracketCount ? startTxt : "}));\n"), 
                            rescan && rescan.after && rescan.after.length && (put(rescan.after.length), rescan = null);
                        }
                        startTag = null, content = "";
                        break;

                      case tmap.templateLeft:
                        content += tmap.left;
                        break;

                      default:
                        content += token;
                    }
                    lastToken = token;
                }
                content.length && put(content), buff.push(";");
                var template = buff.join(""), out = {
                    out: (this.text.outStart || "") + template + " " + finishTxt + (this.text.outEnd || "")
                };
                return myEval.call(out, "this.fn = (function(" + this.text.argNames + "){" + out.out + "});\r\n//# sourceURL=" + name + ".js"), 
                out;
            }
        }, can.view.pending = function(viewData) {
            var hooks = can.view.getHooks();
            return can.view.hook(function(el) {
                can.each(hooks, function(fn) {
                    fn(el);
                }), viewData.templateType = "legacy", viewData.tagName && viewCallbacks.tagHandler(el, viewData.tagName, viewData), 
                can.each(viewData && viewData.attrs || [], function(attributeName) {
                    viewData.attributeName = attributeName;
                    var callback = viewCallbacks.attr(attributeName);
                    callback && callback(el, viewData);
                });
            });
        }, can.view.tag("content", function(el, tagData) {
            return tagData.scope;
        }), can.view.Scanner = Scanner, Scanner;
    }(__m10, __m24, __m9), __m27 = function(can) {
        var canExpando = !0;
        try {
            document.createTextNode("")._ = 0;
        } catch (ex) {
            canExpando = !1;
        }
        var nodeMap = {}, textNodeMap = {}, expando = "ejs_" + Math.random(), _id = 0, id = function(node, localMap) {
            var _textNodeMap = localMap || textNodeMap, id = readId(node, _textNodeMap);
            return id ? id : canExpando || 3 !== node.nodeType ? (++_id, node[expando] = (node.nodeName ? "element_" : "obj_") + _id) : (++_id, 
            _textNodeMap["text_" + _id] = node, "text_" + _id);
        }, readId = function(node, textNodeMap) {
            if (canExpando || 3 !== node.nodeType) return node[expando];
            for (var textNodeID in textNodeMap) if (textNodeMap[textNodeID] === node) return textNodeID;
        }, splice = [].splice, push = [].push, itemsInChildListTree = function(list) {
            for (var count = 0, i = 0, len = list.length; len > i; i++) {
                var item = list[i];
                item.nodeType ? count++ : count += itemsInChildListTree(item);
            }
            return count;
        }, replacementMap = function(replacements, idMap) {
            for (var map = {}, i = 0, len = replacements.length; len > i; i++) {
                var node = nodeLists.first(replacements[i]);
                map[id(node, idMap)] = replacements[i];
            }
            return map;
        }, nodeLists = {
            id: id,
            update: function(nodeList, newNodes) {
                var oldNodes = nodeLists.unregisterChildren(nodeList);
                newNodes = can.makeArray(newNodes);
                var oldListLength = nodeList.length;
                return splice.apply(nodeList, [ 0, oldListLength ].concat(newNodes)), nodeList.replacements ? nodeLists.nestReplacements(nodeList) : nodeLists.nestList(nodeList), 
                oldNodes;
            },
            nestReplacements: function(list) {
                for (var index = 0, idMap = {}, rMap = replacementMap(list.replacements, idMap), rCount = list.replacements.length; index < list.length && rCount; ) {
                    var node = list[index], replacement = rMap[readId(node, idMap)];
                    replacement && (list.splice(index, itemsInChildListTree(replacement), replacement), 
                    rCount--), index++;
                }
                list.replacements = [];
            },
            nestList: function(list) {
                for (var index = 0; index < list.length; ) {
                    var node = list[index], childNodeList = nodeMap[id(node)];
                    childNodeList ? childNodeList !== list && list.splice(index, itemsInChildListTree(childNodeList), childNodeList) : nodeMap[id(node)] = list, 
                    index++;
                }
            },
            last: function(nodeList) {
                var last = nodeList[nodeList.length - 1];
                return last.nodeType ? last : nodeLists.last(last);
            },
            first: function(nodeList) {
                var first = nodeList[0];
                return first.nodeType ? first : nodeLists.first(first);
            },
            register: function(nodeList, unregistered, parent) {
                return nodeList.unregistered = unregistered, nodeList.parentList = parent, parent === !0 ? nodeList.replacements = [] : parent ? (parent.replacements.push(nodeList), 
                nodeList.replacements = []) : nodeLists.nestList(nodeList), nodeList;
            },
            unregisterChildren: function(nodeList) {
                var nodes = [];
                return can.each(nodeList, function(node) {
                    node.nodeType ? (nodeList.replacements || delete nodeMap[id(node)], nodes.push(node)) : push.apply(nodes, nodeLists.unregister(node));
                }), nodes;
            },
            unregister: function(nodeList) {
                var nodes = nodeLists.unregisterChildren(nodeList);
                if (nodeList.unregistered) {
                    var unregisteredCallback = nodeList.unregistered;
                    delete nodeList.unregistered, delete nodeList.replacements, unregisteredCallback();
                }
                return nodes;
            },
            nodeMap: nodeMap
        };
        return can.view.nodeLists = nodeLists, nodeLists;
    }(__m2, __m24), __m28 = function(can) {
        function makeMap(str) {
            for (var obj = {}, items = str.split(","), i = 0; i < items.length; i++) obj[items[i]] = !0;
            return obj;
        }
        var alphaNumericHU = "-A-Za-z0-9_", attributeNames = "[a-zA-Z_:][" + alphaNumericHU + ":.]+", spaceEQspace = "\\s*=\\s*", dblQuote2dblQuote = '"((?:\\\\.|[^"])*)"', quote2quote = "'((?:\\\\.|[^'])*)'", attributeEqAndValue = "(?:" + spaceEQspace + "(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>\\s]+))?", matchStash = "\\{\\{[^\\}]*\\}\\}\\}?", stash = "\\{\\{([^\\}]*)\\}\\}\\}?", startTag = new RegExp("^<([" + alphaNumericHU + "]+)((?:\\s*(?:(?:(?:" + attributeNames + ")?" + attributeEqAndValue + ")|(?:" + matchStash + ")+))*)\\s*(\\/?)>"), endTag = new RegExp("^<\\/([" + alphaNumericHU + "]+)[^>]*>"), attr = new RegExp("(?:(?:(" + attributeNames + ")|" + stash + ")(?:" + spaceEQspace + "(?:(?:" + dblQuote2dblQuote + ")|(?:" + quote2quote + ")|([^>\\s]+)))?)", "g"), mustache = new RegExp(stash, "g"), txtBreak = /<|\{\{/, empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed"), block = makeMap("address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"), inline = makeMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), special = makeMap("script,style"), HTMLParser = function(html, handler) {
            function parseStartTag(tag, tagName, rest, unary) {
                if (tagName = tagName.toLowerCase(), block[tagName]) for (;stack.last() && inline[stack.last()]; ) parseEndTag("", stack.last());
                closeSelf[tagName] && stack.last() === tagName && parseEndTag("", tagName), unary = empty[tagName] || !!unary, 
                handler.start(tagName, unary), unary || stack.push(tagName), HTMLParser.parseAttrs(rest, handler), 
                handler.end(tagName, unary);
            }
            function parseEndTag(tag, tagName) {
                var pos;
                if (tagName) for (pos = stack.length - 1; pos >= 0 && stack[pos] !== tagName; pos--) ; else pos = 0;
                if (pos >= 0) {
                    for (var i = stack.length - 1; i >= pos; i--) handler.close && handler.close(stack[i]);
                    stack.length = pos;
                }
            }
            function parseMustache(mustache, inside) {
                handler.special && handler.special(inside);
            }
            var index, chars, match, stack = [], last = html;
            for (stack.last = function() {
                return this[this.length - 1];
            }; html; ) {
                if (chars = !0, stack.last() && special[stack.last()]) html = html.replace(new RegExp("([\\s\\S]*?)</" + stack.last() + "[^>]*>"), function(all, text) {
                    return text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), 
                    handler.chars && handler.chars(text), "";
                }), parseEndTag("", stack.last()); else if (0 === html.indexOf("<!--") ? (index = html.indexOf("-->"), 
                index >= 0 && (handler.comment && handler.comment(html.substring(4, index)), html = html.substring(index + 3), 
                chars = !1)) : 0 === html.indexOf("</") ? (match = html.match(endTag), match && (html = html.substring(match[0].length), 
                match[0].replace(endTag, parseEndTag), chars = !1)) : 0 === html.indexOf("<") ? (match = html.match(startTag), 
                match && (html = html.substring(match[0].length), match[0].replace(startTag, parseStartTag), 
                chars = !1)) : 0 === html.indexOf("{{") && (match = html.match(mustache), match && (html = html.substring(match[0].length), 
                match[0].replace(mustache, parseMustache))), chars) {
                    index = html.search(txtBreak);
                    var text = 0 > index ? html : html.substring(0, index);
                    html = 0 > index ? "" : html.substring(index), handler.chars && text && handler.chars(text);
                }
                if (html === last) throw "Parse Error: " + html;
                last = html;
            }
            parseEndTag(), handler.done();
        };
        return HTMLParser.parseAttrs = function(rest, handler) {
            (null != rest ? rest : "").replace(attr, function(text, name, special, dblQuote, singleQuote, val) {
                if (special && handler.special(special), name || dblQuote || singleQuote || val) {
                    var value = arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : arguments[5] ? arguments[5] : fillAttrs[name.toLowerCase()] ? name : "";
                    handler.attrStart(name || "");
                    for (var chars, last = mustache.lastIndex = 0, res = mustache.exec(value); res; ) chars = value.substring(last, mustache.lastIndex - res[0].length), 
                    chars.length && handler.attrValue(chars), handler.special(res[1]), last = mustache.lastIndex, 
                    res = mustache.exec(value);
                    chars = value.substr(last, value.length), chars && handler.attrValue(chars), handler.attrEnd(name || "");
                }
            });
        }, can.view.parser = HTMLParser, HTMLParser;
    }(__m10), __m26 = function(can, elements, view, nodeLists, parser) {
        elements = elements || can.view.elements, nodeLists = nodeLists || can.view.NodeLists, 
        parser = parser || can.view.parser;
        var setup = function(el, bind, unbind) {
            var tornDown = !1, teardown = function() {
                return tornDown || (tornDown = !0, unbind(data), can.unbind.call(el, "removed", teardown)), 
                !0;
            }, data = {
                teardownCheck: function(parent) {
                    return parent ? !1 : teardown();
                }
            };
            return can.bind.call(el, "removed", teardown), bind(data), data;
        }, listen = function(el, compute, change) {
            return setup(el, function() {
                compute.bind("change", change);
            }, function(data) {
                compute.unbind("change", change), data.nodeList && nodeLists.unregister(data.nodeList);
            });
        }, getAttributeParts = function(newVal) {
            var attr, attrs = {};
            return parser.parseAttrs(newVal, {
                attrStart: function(name) {
                    attrs[name] = "", attr = name;
                },
                attrValue: function(value) {
                    attrs[attr] += value;
                },
                attrEnd: function() {}
            }), attrs;
        }, splice = [].splice, isNode = function(obj) {
            return obj && obj.nodeType;
        }, addTextNodeIfNoChildren = function(frag) {
            frag.childNodes.length || frag.appendChild(document.createTextNode(""));
        }, live = {
            list: function(el, compute, render, context, parentNode, nodeList) {
                var list, masterNodeList = nodeList || [ el ], indexMap = [], add = function(ev, items, index) {
                    var frag = document.createDocumentFragment(), newNodeLists = [], newIndicies = [];
                    can.each(items, function(item, key) {
                        var itemNodeList = [];
                        nodeList && nodeLists.register(itemNodeList, null, !0);
                        var itemIndex = can.compute(key + index), itemHTML = render.call(context, item, itemIndex, itemNodeList), gotText = "string" == typeof itemHTML, itemFrag = can.frag(itemHTML);
                        itemFrag = gotText ? can.view.hookup(itemFrag) : itemFrag;
                        var childNodes = can.makeArray(itemFrag.childNodes);
                        nodeList ? (nodeLists.update(itemNodeList, childNodes), newNodeLists.push(itemNodeList)) : newNodeLists.push(nodeLists.register(childNodes)), 
                        frag.appendChild(itemFrag), newIndicies.push(itemIndex);
                    });
                    var masterListIndex = index + 1;
                    if (masterNodeList[masterListIndex]) {
                        var el = nodeLists.first(masterNodeList[masterListIndex]);
                        can.insertBefore(el.parentNode, frag, el);
                    } else elements.after(1 === masterListIndex ? [ text ] : [ nodeLists.last(masterNodeList[masterListIndex - 1]) ], frag);
                    splice.apply(masterNodeList, [ masterListIndex, 0 ].concat(newNodeLists)), splice.apply(indexMap, [ index, 0 ].concat(newIndicies));
                    for (var i = index + newIndicies.length, len = indexMap.length; len > i; i++) indexMap[i](i);
                }, remove = function(ev, items, index, duringTeardown, fullTeardown) {
                    if (duringTeardown || !data.teardownCheck(text.parentNode)) {
                        var removedMappings = masterNodeList.splice(index + 1, items.length), itemsToRemove = [];
                        can.each(removedMappings, function(nodeList) {
                            var nodesToRemove = nodeLists.unregister(nodeList);
                            [].push.apply(itemsToRemove, nodesToRemove);
                        }), indexMap.splice(index, items.length);
                        for (var i = index, len = indexMap.length; len > i; i++) indexMap[i](i);
                        fullTeardown || can.remove(can.$(itemsToRemove));
                    }
                }, text = document.createTextNode(""), teardownList = function(fullTeardown) {
                    list && list.unbind && list.unbind("add", add).unbind("remove", remove), remove({}, {
                        length: masterNodeList.length - 1
                    }, 0, !0, fullTeardown);
                }, updateList = function(ev, newList, oldList) {
                    teardownList(), list = newList || [], list.bind && list.bind("add", add).bind("remove", remove), 
                    add({}, list, 0);
                };
                parentNode = elements.getParentNode(el, parentNode);
                var data = setup(parentNode, function() {
                    can.isFunction(compute) && compute.bind("change", updateList);
                }, function() {
                    can.isFunction(compute) && compute.unbind("change", updateList), teardownList(!0);
                });
                nodeList ? (elements.replace(masterNodeList, text), nodeLists.update(masterNodeList, [ text ]), 
                nodeList.unregistered = data.teardownCheck) : live.replace(masterNodeList, text, data.teardownCheck), 
                updateList({}, can.isFunction(compute) ? compute() : compute);
            },
            html: function(el, compute, parentNode, nodeList) {
                var data;
                parentNode = elements.getParentNode(el, parentNode), data = listen(parentNode, compute, function(ev, newVal, oldVal) {
                    var attached = nodeLists.first(nodes).parentNode;
                    attached && makeAndPut(newVal), data.teardownCheck(nodeLists.first(nodes).parentNode);
                });
                var nodes = nodeList || [ el ], makeAndPut = function(val) {
                    var isString = !isNode(val), frag = can.frag(val), oldNodes = can.makeArray(nodes);
                    addTextNodeIfNoChildren(frag), isString && (frag = can.view.hookup(frag, parentNode)), 
                    oldNodes = nodeLists.update(nodes, frag.childNodes), elements.replace(oldNodes, frag);
                };
                data.nodeList = nodes, nodeList ? nodeList.unregistered = data.teardownCheck : nodeLists.register(nodes, data.teardownCheck), 
                makeAndPut(compute());
            },
            replace: function(nodes, val, teardown) {
                var oldNodes = nodes.slice(0), frag = can.frag(val);
                return nodeLists.register(nodes, teardown), "string" == typeof val && (frag = can.view.hookup(frag, nodes[0].parentNode)), 
                nodeLists.update(nodes, frag.childNodes), elements.replace(oldNodes, frag), nodes;
            },
            text: function(el, compute, parentNode, nodeList) {
                var parent = elements.getParentNode(el, parentNode), data = listen(parent, compute, function(ev, newVal, oldVal) {
                    "unknown" != typeof node.nodeValue && (node.nodeValue = can.view.toStr(newVal)), 
                    data.teardownCheck(node.parentNode);
                }), node = document.createTextNode(can.view.toStr(compute()));
                nodeList ? (nodeList.unregistered = data.teardownCheck, data.nodeList = nodeList, 
                nodeLists.update(nodeList, [ node ]), elements.replace([ el ], node)) : data.nodeList = live.replace([ el ], node, data.teardownCheck);
            },
            setAttributes: function(el, newVal) {
                var attrs = getAttributeParts(newVal);
                for (var name in attrs) can.attr.set(el, name, attrs[name]);
            },
            attributes: function(el, compute, currentValue) {
                var oldAttrs = {}, setAttrs = function(newVal) {
                    var name, newAttrs = getAttributeParts(newVal);
                    for (name in newAttrs) {
                        var newValue = newAttrs[name], oldValue = oldAttrs[name];
                        newValue !== oldValue && can.attr.set(el, name, newValue), delete oldAttrs[name];
                    }
                    for (name in oldAttrs) elements.removeAttr(el, name);
                    oldAttrs = newAttrs;
                };
                listen(el, compute, function(ev, newVal) {
                    setAttrs(newVal);
                }), arguments.length >= 3 ? oldAttrs = getAttributeParts(currentValue) : setAttrs(compute());
            },
            attributePlaceholder: "__!!__",
            attributeReplace: /__!!__/g,
            attribute: function(el, attributeName, compute) {
                listen(el, compute, function(ev, newVal) {
                    elements.setAttr(el, attributeName, hook.render());
                });
                var hooks, wrapped = can.$(el);
                hooks = can.data(wrapped, "hooks"), hooks || can.data(wrapped, "hooks", hooks = {});
                var hook, attr = elements.getAttr(el, attributeName), parts = attr.split(live.attributePlaceholder), goodParts = [];
                goodParts.push(parts.shift(), parts.join(live.attributePlaceholder)), hooks[attributeName] ? hooks[attributeName].computes.push(compute) : hooks[attributeName] = {
                    render: function() {
                        var i = 0, newAttr = attr ? attr.replace(live.attributeReplace, function() {
                            return elements.contentText(hook.computes[i++]());
                        }) : elements.contentText(hook.computes[i++]());
                        return newAttr;
                    },
                    computes: [ compute ],
                    batchNum: undefined
                }, hook = hooks[attributeName], goodParts.splice(1, 0, compute()), elements.setAttr(el, attributeName, goodParts.join(""));
            },
            specialAttribute: function(el, attributeName, compute) {
                listen(el, compute, function(ev, newVal) {
                    elements.setAttr(el, attributeName, getValue(newVal));
                }), elements.setAttr(el, attributeName, getValue(compute()));
            },
            simpleAttribute: function(el, attributeName, compute) {
                listen(el, compute, function(ev, newVal) {
                    elements.setAttr(el, attributeName, newVal);
                }), elements.setAttr(el, attributeName, compute());
            }
        };
        live.attr = live.simpleAttribute, live.attrs = live.attributes;
        var newLine = /(\r|\n)+/g, getValue = function(val) {
            var regexp = /^["'].*["']$/;
            return val = val.replace(elements.attrReg, "").replace(newLine, ""), regexp.test(val) ? val.substr(1, val.length - 2) : val;
        };
        return can.view.live = live, live;
    }(__m2, __m24, __m10, __m27, __m28), __m25 = function(can, elements, live) {
        var lastHookups, pendingHookups = [], tagChildren = function(tagName) {
            var newTag = elements.tagMap[tagName] || "span";
            return "span" === newTag ? "@@!!@@" : "<" + newTag + ">" + tagChildren(newTag) + "</" + newTag + ">";
        }, contentText = function(input, tag) {
            if ("string" == typeof input) return input;
            if (!input && 0 !== input) return "";
            var hook = input.hookup && function(el, id) {
                input.hookup.call(input, el, id);
            } || "function" == typeof input && input;
            return hook ? tag ? "<" + tag + " " + can.view.hook(hook) + "></" + tag + ">" : (pendingHookups.push(hook), 
            "") : "" + input;
        }, contentEscape = function(txt, tag) {
            return "string" == typeof txt || "number" == typeof txt ? can.esc(txt) : contentText(txt, tag);
        }, withinTemplatedSectionWithinAnElement = !1, emptyHandler = function() {};
        return can.extend(can.view, {
            live: live,
            setupLists: function() {
                var data, old = can.view.lists;
                return can.view.lists = function(list, renderer) {
                    return data = {
                        list: list,
                        renderer: renderer
                    }, Math.random();
                }, function() {
                    return can.view.lists = old, data;
                };
            },
            getHooks: function() {
                var hooks = pendingHookups.slice(0);
                return lastHookups = hooks, pendingHookups = [], hooks;
            },
            onlytxt: function(self, func) {
                return contentEscape(func.call(self));
            },
            txt: function(escape, tagName, status, self, func) {
                var value, listData, compute, attributeName, tag = elements.tagMap[tagName] || "span", setupLiveBinding = !1, unbind = emptyHandler;
                if (withinTemplatedSectionWithinAnElement) value = func.call(self); else {
                    ("string" == typeof status || 1 === status) && (withinTemplatedSectionWithinAnElement = !0);
                    var listTeardown = can.view.setupLists();
                    unbind = function() {
                        compute.unbind("change", emptyHandler);
                    }, compute = can.compute(func, self, !1), compute.bind("change", emptyHandler), 
                    listData = listTeardown(), value = compute(), withinTemplatedSectionWithinAnElement = !1, 
                    setupLiveBinding = compute.hasDependencies;
                }
                if (listData) return unbind(), "<" + tag + can.view.hook(function(el, parentNode) {
                    live.list(el, listData.list, listData.renderer, self, parentNode);
                }) + "></" + tag + ">";
                if (!setupLiveBinding || "function" == typeof value) return unbind(), (withinTemplatedSectionWithinAnElement || 2 === escape || !escape ? contentText : contentEscape)(value, 0 === status && tag);
                var contentProp = elements.tagToContentPropMap[tagName];
                return 0 !== status || contentProp ? 1 === status ? (pendingHookups.push(function(el) {
                    live.attributes(el, compute, compute()), unbind();
                }), compute()) : 2 === escape ? (attributeName = status, pendingHookups.push(function(el) {
                    live.specialAttribute(el, attributeName, compute), unbind();
                }), compute()) : (attributeName = 0 === status ? contentProp : status, (0 === status ? lastHookups : pendingHookups).push(function(el) {
                    live.attribute(el, attributeName, compute), unbind();
                }), live.attributePlaceholder) : "<" + tag + can.view.hook(escape && "object" != typeof value ? function(el, parentNode) {
                    live.text(el, compute, parentNode), unbind();
                } : function(el, parentNode) {
                    live.html(el, compute, parentNode), unbind();
                }) + ">" + tagChildren(tag) + "</" + tag + ">";
            }
        }), can;
    }(__m10, __m24, __m26, __m13), __m21 = function(can) {
        can.view.ext = ".mustache";
        var SCOPE = "scope", HASH = "___h4sh", CONTEXT_OBJ = "{scope:" + SCOPE + ",options:options}", SPECIAL_CONTEXT_OBJ = "{scope:" + SCOPE + ",options:options, special: true}", ARG_NAMES = SCOPE + ",options", argumentsRegExp = /((([^\s]+?=)?('.*?'|".*?"))|.*?)\s/g, literalNumberStringBooleanRegExp = /^(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false|null|undefined)|((.+?)=(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false)|(.+))))$/, makeLookupLiteral = function(type) {
            return '{get:"' + type.replace(/"/g, '\\"') + '"}';
        }, isLookup = function(obj) {
            return obj && "string" == typeof obj.get;
        }, isObserveLike = function(obj) {
            return obj instanceof can.Map || obj && !!obj._get;
        }, isArrayLike = function(obj) {
            return obj && obj.splice && "number" == typeof obj.length;
        }, makeConvertToScopes = function(original, scope, options) {
            var originalWithScope = function(ctx, opts) {
                return original(ctx || scope, opts);
            };
            return function(updatedScope, updatedOptions) {
                return updatedScope === undefined || updatedScope instanceof can.view.Scope || (updatedScope = scope.add(updatedScope)), 
                updatedOptions === undefined || updatedOptions instanceof can.view.Options || (updatedOptions = options.add(updatedOptions)), 
                originalWithScope(updatedScope, updatedOptions || options);
            };
        }, Mustache = function(options, helpers) {
            if (this.constructor !== Mustache) {
                var mustache = new Mustache(options);
                return function(data, options) {
                    return mustache.render(data, options);
                };
            }
            return "function" == typeof options ? void (this.template = {
                fn: options
            }) : (can.extend(this, options), void (this.template = this.scanner.scan(this.text, this.name)));
        };
        can.Mustache = window.Mustache = Mustache, Mustache.prototype.render = function(data, options) {
            return data instanceof can.view.Scope || (data = new can.view.Scope(data || {})), 
            options instanceof can.view.Options || (options = new can.view.Options(options || {})), 
            options = options || {}, this.template.fn.call(data, data, options);
        }, can.extend(Mustache.prototype, {
            scanner: new can.view.Scanner({
                text: {
                    start: "",
                    scope: SCOPE,
                    options: ",options: options",
                    argNames: ARG_NAMES
                },
                tokens: [ [ "returnLeft", "{{{", "{{[{&]" ], [ "commentFull", "{{!}}", "^[\\s\\t]*{{!.+?}}\\n" ], [ "commentLeft", "{{!", "(\\n[\\s\\t]*{{!|{{!)" ], [ "escapeFull", "{{}}", "(^[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}$)", function(content) {
                    return {
                        before: /^\n.+?\n$/.test(content) ? "\n" : "",
                        content: content.match(/\{\{(.+?)\}\}/)[1] || ""
                    };
                } ], [ "escapeLeft", "{{" ], [ "returnRight", "}}}" ], [ "right", "}}" ] ],
                helpers: [ {
                    name: /^>[\s]*\w*/,
                    fn: function(content, cmd) {
                        var templateName = can.trim(content.replace(/^>\s?/, "")).replace(/["|']/g, "");
                        return "can.Mustache.renderPartial('" + templateName + "'," + ARG_NAMES + ")";
                    }
                }, {
                    name: /^\s*data\s/,
                    fn: function(content, cmd) {
                        var attr = content.match(/["|'](.*)["|']/)[1];
                        return "can.proxy(function(__){can.data(can.$(__),'" + attr + "', this.attr('.')); }, " + SCOPE + ")";
                    }
                }, {
                    name: /\s*\(([\$\w]+)\)\s*->([^\n]*)/,
                    fn: function(content) {
                        var quickFunc = /\s*\(([\$\w]+)\)\s*->([^\n]*)/, parts = content.match(quickFunc);
                        return "can.proxy(function(__){var " + parts[1] + "=can.$(__);with(" + SCOPE + ".attr('.')){" + parts[2] + "}}, this);";
                    }
                }, {
                    name: /^.*$/,
                    fn: function(content, cmd) {
                        var mode = !1, result = {
                            content: "",
                            startTxt: !1,
                            startOnlyTxt: !1,
                            end: !1
                        };
                        if (content = can.trim(content), content.length && (mode = content.match(/^([#^\/]|else$)/))) {
                            switch (mode = mode[0]) {
                              case "#":
                              case "^":
                                cmd.specialAttribute ? result.startOnlyTxt = !0 : (result.startTxt = !0, result.escaped = 0);
                                break;

                              case "/":
                                return result.end = !0, result.content += 'return ___v1ew.join("");}}])', result;
                            }
                            content = content.substring(1);
                        }
                        if ("else" !== mode) {
                            var m, args = [], hashes = [], i = 0;
                            result.content += "can.Mustache.txt(\n" + (cmd.specialAttribute ? SPECIAL_CONTEXT_OBJ : CONTEXT_OBJ) + ",\n" + (mode ? '"' + mode + '"' : "null") + ",", 
                            (can.trim(content) + " ").replace(argumentsRegExp, function(whole, arg) {
                                i && (m = arg.match(literalNumberStringBooleanRegExp)) ? m[2] ? args.push(m[0]) : hashes.push(m[4] + ":" + (m[6] ? m[6] : makeLookupLiteral(m[5]))) : args.push(makeLookupLiteral(arg)), 
                                i++;
                            }), result.content += args.join(","), hashes.length && (result.content += ",{" + HASH + ":{" + hashes.join(",") + "}}");
                        }
                        switch (mode && "else" !== mode && (result.content += ",[\n\n"), mode) {
                          case "^":
                          case "#":
                            result.content += "{fn:function(" + ARG_NAMES + "){var ___v1ew = [];";
                            break;

                          case "else":
                            result.content += 'return ___v1ew.join("");}},\n{inverse:function(' + ARG_NAMES + "){\nvar ___v1ew = [];";
                            break;

                          default:
                            result.content += ")";
                        }
                        return mode || (result.startTxt = !0, result.end = !0), result;
                    }
                } ]
            })
        });
        for (var helpers = can.view.Scanner.prototype.helpers, i = 0; i < helpers.length; i++) Mustache.prototype.scanner.helpers.unshift(helpers[i]);
        return Mustache.txt = function(scopeAndOptions, mode, name) {
            for (var hash, helper, scope = scopeAndOptions.scope, options = scopeAndOptions.options, args = [], helperOptions = {
                fn: function() {},
                inverse: function() {}
            }, context = scope.attr("."), getHelper = !0, i = 3; i < arguments.length; i++) {
                var arg = arguments[i];
                if (mode && can.isArray(arg)) helperOptions = can.extend.apply(can, [ helperOptions ].concat(arg)); else if (arg && arg[HASH]) {
                    hash = arg[HASH];
                    for (var prop in hash) isLookup(hash[prop]) && (hash[prop] = Mustache.get(hash[prop].get, scopeAndOptions, !1, !0));
                } else arg && isLookup(arg) ? args.push(Mustache.get(arg.get, scopeAndOptions, !1, !0)) : args.push(arg);
            }
            if (isLookup(name)) {
                var get = name.get;
                name = Mustache.get(name.get, scopeAndOptions, args.length, !1), getHelper = get === name;
            }
            if (helperOptions.fn = makeConvertToScopes(helperOptions.fn, scope, options), helperOptions.inverse = makeConvertToScopes(helperOptions.inverse, scope, options), 
            "^" === mode) {
                var tmp = helperOptions.fn;
                helperOptions.fn = helperOptions.inverse, helperOptions.inverse = tmp;
            }
            return (helper = getHelper && "string" == typeof name && Mustache.getHelper(name, options) || can.isFunction(name) && !name.isComputed && {
                fn: name
            }) ? (can.extend(helperOptions, {
                context: context,
                scope: scope,
                contexts: scope,
                hash: hash
            }), args.push(helperOptions), function() {
                return helper.fn.apply(context, args) || "";
            }) : function() {
                var value;
                value = can.isFunction(name) && name.isComputed ? name() : name;
                var i, argIsObserve, arg, validArgs = args.length ? args : [ value ], valid = !0, result = [];
                if (mode) for (i = 0; i < validArgs.length; i++) arg = validArgs[i], argIsObserve = "undefined" != typeof arg && isObserveLike(arg), 
                isArrayLike(arg) ? "#" === mode ? valid = valid && !!(argIsObserve ? arg.attr("length") : arg.length) : "^" === mode && (valid = valid && !(argIsObserve ? arg.attr("length") : arg.length)) : valid = "#" === mode ? valid && !!arg : "^" === mode ? valid && !arg : valid;
                if (valid) {
                    if ("#" === mode) {
                        if (isArrayLike(value)) {
                            var isObserveList = isObserveLike(value);
                            for (i = 0; i < value.length; i++) result.push(helperOptions.fn(isObserveList ? value.attr("" + i) : value[i]));
                            return result.join("");
                        }
                        return helperOptions.fn(value || {}) || "";
                    }
                    return "^" === mode ? helperOptions.inverse(value || {}) || "" : "" + (null != value ? value : "");
                }
                return "";
            };
        }, Mustache.get = function(key, scopeAndOptions, isHelper, isArgument) {
            var context = scopeAndOptions.scope.attr("."), options = scopeAndOptions.options || {};
            if (isHelper) {
                if (Mustache.getHelper(key, options)) return key;
                if (scopeAndOptions.scope && can.isFunction(context[key])) return context[key];
            }
            var computeData = scopeAndOptions.scope.computeData(key, {
                isArgument: isArgument,
                args: [ context, scopeAndOptions.scope ]
            }), compute = computeData.compute;
            can.compute.temporarilyBind(compute);
            var initialValue = computeData.initialValue;
            return initialValue !== undefined && computeData.scope === scopeAndOptions.scope || !Mustache.getHelper(key, options) ? compute.hasDependencies ? compute : initialValue : key;
        }, Mustache.resolve = function(value) {
            return isObserveLike(value) && isArrayLike(value) && value.attr("length") ? value : can.isFunction(value) ? value() : value;
        }, can.view.Options = can.view.Scope.extend({
            init: function(data, parent) {
                data.helpers || data.partials || data.tags || (data = {
                    helpers: data
                }), can.view.Scope.prototype.init.apply(this, arguments);
            }
        }), Mustache._helpers = {}, Mustache.registerHelper = function(name, fn) {
            this._helpers[name] = {
                name: name,
                fn: fn
            };
        }, Mustache.getHelper = function(name, options) {
            var helper = options.attr("helpers." + name);
            return helper ? {
                fn: helper
            } : this._helpers[name];
        }, Mustache.render = function(partial, scope, options) {
            if (!can.view.cached[partial]) {
                var reads = can.__clearReading();
                scope.attr("partial") && (partial = scope.attr("partial")), can.__setReading(reads);
            }
            return can.view.render(partial, scope, options);
        }, Mustache.safeString = function(str) {
            return {
                toString: function() {
                    return str;
                }
            };
        }, Mustache.renderPartial = function(partialName, scope, options) {
            var partial = options.attr("partials." + partialName);
            return partial ? partial.render ? partial.render(scope, options) : partial(scope, options) : can.Mustache.render(partialName, scope, options);
        }, can.each({
            "if": function(expr, options) {
                var value;
                return value = can.isFunction(expr) ? can.compute.truthy(expr)() : !!Mustache.resolve(expr), 
                value ? options.fn(options.contexts || this) : options.inverse(options.contexts || this);
            },
            unless: function(expr, options) {
                return Mustache._helpers["if"].fn.apply(this, [ can.isFunction(expr) ? can.compute(function() {
                    return !expr();
                }) : !expr, options ]);
            },
            each: function(expr, options) {
                var keys, key, i, resolved = Mustache.resolve(expr), result = [];
                if (can.view.lists && (resolved instanceof can.List || expr && expr.isComputed && resolved === undefined)) return can.view.lists(expr, function(item, index) {
                    return options.fn(options.scope.add({
                        "@index": index
                    }).add(item));
                });
                if (expr = resolved, expr && isArrayLike(expr)) {
                    for (i = 0; i < expr.length; i++) result.push(options.fn(options.scope.add({
                        "@index": i
                    }).add(expr[i])));
                    return result.join("");
                }
                if (isObserveLike(expr)) {
                    for (keys = can.Map.keys(expr), i = 0; i < keys.length; i++) key = keys[i], result.push(options.fn(options.scope.add({
                        "@key": key
                    }).add(expr[key])));
                    return result.join("");
                }
                if (expr instanceof Object) {
                    for (key in expr) result.push(options.fn(options.scope.add({
                        "@key": key
                    }).add(expr[key])));
                    return result.join("");
                }
            },
            "with": function(expr, options) {
                var ctx = expr;
                return expr = Mustache.resolve(expr), expr ? options.fn(ctx) : void 0;
            },
            log: function(expr, options) {
                "undefined" != typeof console && console.log && (options ? console.log(expr, options.context) : console.log(expr.context));
            }
        }, function(fn, name) {
            Mustache.registerHelper(name, fn);
        }), can.view.register({
            suffix: "mustache",
            contentType: "x-mustache-template",
            script: function(id, src) {
                return "can.Mustache(function(" + ARG_NAMES + ") { " + new Mustache({
                    text: src,
                    name: id
                }).template.out + " })";
            },
            renderer: function(id, text) {
                return Mustache({
                    text: text,
                    name: id
                });
            }
        }), can.mustache.registerHelper = can.proxy(can.Mustache.registerHelper, can.Mustache), 
        can.mustache.safeString = can.Mustache.safeString, can;
    }(__m2, __m22, __m10, __m23, __m20, __m25), __m29 = function(can) {
        var isContentEditable = function() {
            var values = {
                "": !0,
                "true": !0,
                "false": !1
            }, editable = function(el) {
                if (el && el.getAttribute) {
                    var attr = el.getAttribute("contenteditable");
                    return values[attr];
                }
            };
            return function(el) {
                var val = editable(el);
                return "boolean" == typeof val ? val : !!editable(el.parentNode);
            };
        }(), removeCurly = function(value) {
            return "{" === value[0] && "}" === value[value.length - 1] ? value.substr(1, value.length - 2) : value;
        };
        can.view.attr("can-value", function(el, data) {
            var trueValue, falseValue, attr = removeCurly(el.getAttribute("can-value")), value = data.scope.computeData(attr, {
                args: []
            }).compute;
            return "input" === el.nodeName.toLowerCase() && ("checkbox" === el.type && (trueValue = can.attr.has(el, "can-true-value") ? el.getAttribute("can-true-value") : !0, 
            falseValue = can.attr.has(el, "can-false-value") ? el.getAttribute("can-false-value") : !1), 
            "checkbox" === el.type || "radio" === el.type) ? void new Checked(el, {
                value: value,
                trueValue: trueValue,
                falseValue: falseValue
            }) : "select" === el.nodeName.toLowerCase() && el.multiple ? void new Multiselect(el, {
                value: value
            }) : isContentEditable(el) ? void new Content(el, {
                value: value
            }) : void new Value(el, {
                value: value
            });
        });
        var special = {
            enter: function(data, el, original) {
                return {
                    event: "keyup",
                    handler: function(ev) {
                        return 13 === ev.keyCode ? original.call(this, ev) : void 0;
                    }
                };
            }
        };
        can.view.attr(/can-[\w\.]+/, function(el, data) {
            var attributeName = data.attributeName, event = attributeName.substr("can-".length), handler = function(ev) {
                var attr = removeCurly(el.getAttribute(attributeName)), scopeData = data.scope.read(attr, {
                    returnObserveMethods: !0,
                    isArgument: !0
                });
                return scopeData.value.call(scopeData.parent, data.scope._context, can.$(this), ev);
            };
            if (special[event]) {
                var specialData = special[event](data, el, handler);
                handler = specialData.handler, event = specialData.event;
            }
            can.bind.call(el, event, handler);
        });
        var Value = can.Control.extend({
            init: function() {
                "SELECT" === this.element[0].nodeName.toUpperCase() ? setTimeout(can.proxy(this.set, this), 1) : this.set();
            },
            "{value} change": "set",
            set: function() {
                if (this.element) {
                    var val = this.options.value();
                    this.element[0].value = null == val ? "" : val;
                }
            },
            change: function() {
                this.element && this.options.value(this.element[0].value);
            }
        }), Checked = can.Control.extend({
            init: function() {
                this.isCheckbox = "checkbox" === this.element[0].type.toLowerCase(), this.check();
            },
            "{value} change": "check",
            check: function() {
                if (this.isCheckbox) {
                    var value = this.options.value(), trueValue = this.options.trueValue || !0;
                    this.element[0].checked = value === trueValue;
                } else {
                    var setOrRemove = this.options.value() == this.element[0].value ? "set" : "remove";
                    can.attr[setOrRemove](this.element[0], "checked", !0);
                }
            },
            change: function() {
                this.isCheckbox ? this.options.value(this.element[0].checked ? this.options.trueValue : this.options.falseValue) : this.element[0].checked && this.options.value(this.element[0].value);
            }
        }), Multiselect = Value.extend({
            init: function() {
                this.delimiter = ";", this.set();
            },
            set: function() {
                var newVal = this.options.value();
                "string" == typeof newVal ? (newVal = newVal.split(this.delimiter), this.isString = !0) : newVal && (newVal = can.makeArray(newVal));
                var isSelected = {};
                can.each(newVal, function(val) {
                    isSelected[val] = !0;
                }), can.each(this.element[0].childNodes, function(option) {
                    option.value && (option.selected = !!isSelected[option.value]);
                });
            },
            get: function() {
                var values = [], children = this.element[0].childNodes;
                return can.each(children, function(child) {
                    child.selected && child.value && values.push(child.value);
                }), values;
            },
            change: function() {
                var value = this.get(), currentValue = this.options.value();
                this.isString || "string" == typeof currentValue ? (this.isString = !0, this.options.value(value.join(this.delimiter))) : currentValue instanceof can.List ? currentValue.attr(value, !0) : this.options.value(value);
            }
        }), Content = can.Control.extend({
            init: function() {
                this.set(), this.on("blur", "setValue");
            },
            "{value} change": "set",
            set: function() {
                var val = this.options.value();
                this.element[0].innerHTML = "undefined" == typeof val ? "" : val;
            },
            setValue: function() {
                this.options.value(this.element[0].innerHTML);
            }
        });
    }(__m2, __m21, __m11), __m1 = function(can, viewCallbacks) {
        var ignoreAttributesRegExp = /^(dataViewId|class|id)$/i, paramReplacer = /\{([^\}]+)\}/g, Component = can.Component = can.Construct.extend({
            setup: function() {
                if (can.Construct.setup.apply(this, arguments), can.Component) {
                    var self = this, scope = this.prototype.scope;
                    if (this.Control = ComponentControl.extend(this.prototype.events), scope && ("object" != typeof scope || scope instanceof can.Map) ? scope.prototype instanceof can.Map && (this.Map = scope) : this.Map = can.Map.extend(scope || {}), 
                    this.attributeScopeMappings = {}, can.each(this.Map ? this.Map.defaults : {}, function(val, prop) {
                        "@" === val && (self.attributeScopeMappings[prop] = prop);
                    }), this.prototype.template) if ("function" == typeof this.prototype.template) {
                        var temp = this.prototype.template;
                        this.renderer = function() {
                            return can.view.frag(temp.apply(null, arguments));
                        };
                    } else this.renderer = can.view.mustache(this.prototype.template);
                    can.view.tag(this.prototype.tag, function(el, options) {
                        new self(el, options);
                    });
                }
            }
        }, {
            setup: function(el, hookupOptions) {
                var scopePropertyUpdating, componentScope, frag, initalScopeData = {}, component = this, twoWayBindings = {};
                if (can.each(this.constructor.attributeScopeMappings, function(val, prop) {
                    initalScopeData[prop] = el.getAttribute(can.hyphenate(val));
                }), can.each(can.makeArray(el.attributes), function(node, index) {
                    var name = can.camelize(node.nodeName.toLowerCase()), value = node.value;
                    if (!(component.constructor.attributeScopeMappings[name] || ignoreAttributesRegExp.test(name) || viewCallbacks.attr(node.nodeName))) {
                        if ("{" === value[0] && "}" === value[value.length - 1]) value = value.substr(1, value.length - 2); else if ("legacy" !== hookupOptions.templateType) return void (initalScopeData[name] = value);
                        var computeData = hookupOptions.scope.computeData(value, {
                            args: []
                        }), compute = computeData.compute, handler = function(ev, newVal) {
                            scopePropertyUpdating = name, componentScope.attr(name, newVal), scopePropertyUpdating = null;
                        };
                        compute.bind("change", handler), initalScopeData[name] = compute(), compute.hasDependencies ? (can.bind.call(el, "removed", function() {
                            compute.unbind("change", handler);
                        }), twoWayBindings[name] = computeData) : compute.unbind("change", handler);
                    }
                }), this.constructor.Map) componentScope = new this.constructor.Map(initalScopeData); else if (this.scope instanceof can.Map) componentScope = this.scope; else if (can.isFunction(this.scope)) {
                    var scopeResult = this.scope(initalScopeData, hookupOptions.scope, el);
                    componentScope = scopeResult instanceof can.Map ? scopeResult : scopeResult.prototype instanceof can.Map ? new scopeResult(initalScopeData) : new (can.Map.extend(scopeResult))(initalScopeData);
                }
                var handlers = {};
                can.each(twoWayBindings, function(computeData, prop) {
                    handlers[prop] = function(ev, newVal) {
                        scopePropertyUpdating !== prop && computeData.compute(newVal);
                    }, componentScope.bind(prop, handlers[prop]);
                }), can.bind.call(el, "removed", function() {
                    can.each(handlers, function(handler, prop) {
                        componentScope.unbind(prop, handlers[prop]);
                    });
                }), can.isEmptyObject(this.constructor.attributeScopeMappings) && "legacy" === hookupOptions.templateType || can.bind.call(el, "attributes", function(ev) {
                    var camelized = can.camelize(ev.attributeName);
                    twoWayBindings[camelized] || componentScope.attr(camelized, el.getAttribute(ev.attributeName));
                }), this.scope = componentScope, can.data(can.$(el), "scope", this.scope);
                var renderedScope = hookupOptions.scope.add(this.scope), options = {
                    helpers: {}
                };
                can.each(this.helpers || {}, function(val, prop) {
                    can.isFunction(val) && (options.helpers[prop] = function() {
                        return val.apply(componentScope, arguments);
                    });
                }), this._control = new this.constructor.Control(el, {
                    scope: this.scope
                }), this.constructor.renderer ? (options.tags || (options.tags = {}), options.tags.content = function contentHookup(el, rendererOptions) {
                    var subtemplate = hookupOptions.subtemplate || rendererOptions.subtemplate;
                    subtemplate && (delete options.tags.content, can.view.live.replace([ el ], subtemplate(rendererOptions.scope, rendererOptions.options)), 
                    options.tags.content = contentHookup);
                }, frag = this.constructor.renderer(renderedScope, hookupOptions.options.add(options))) : frag = "legacy" === hookupOptions.templateType ? can.view.frag(hookupOptions.subtemplate ? hookupOptions.subtemplate(renderedScope, hookupOptions.options.add(options)) : "") : hookupOptions.subtemplate ? hookupOptions.subtemplate(renderedScope, hookupOptions.options.add(options)) : document.createDocumentFragment(), 
                can.appendChild(el, frag);
            }
        }), ComponentControl = can.Control.extend({
            _lookup: function(options) {
                return [ options.scope, options, window ];
            },
            _action: function(methodName, options, controlInstance) {
                var hasObjectLookup, readyCompute;
                if (paramReplacer.lastIndex = 0, hasObjectLookup = paramReplacer.test(methodName), 
                controlInstance || !hasObjectLookup) {
                    if (hasObjectLookup) {
                        readyCompute = can.compute(function() {
                            var delegate, name = methodName.replace(paramReplacer, function(matched, key) {
                                var value;
                                return "scope" === key ? (delegate = options.scope, "") : (key = key.replace(/^scope\./, ""), 
                                value = can.compute.read(options.scope, key.split("."), {
                                    isArgument: !0
                                }).value, value === undefined && (value = can.getObject(key)), "string" == typeof value ? value : (delegate = value, 
                                ""));
                            }), parts = name.split(/\s+/g), event = parts.pop();
                            return {
                                processor: this.processors[event] || this.processors.click,
                                parts: [ name, parts.join(" "), event ],
                                delegate: delegate || undefined
                            };
                        }, this);
                        var handler = function(ev, ready) {
                            controlInstance._bindings.control[methodName](controlInstance.element), controlInstance._bindings.control[methodName] = ready.processor(ready.delegate || controlInstance.element, ready.parts[2], ready.parts[1], methodName, controlInstance);
                        };
                        return readyCompute.bind("change", handler), controlInstance._bindings.readyComputes[methodName] = {
                            compute: readyCompute,
                            handler: handler
                        }, readyCompute();
                    }
                    return can.Control._action.apply(this, arguments);
                }
            }
        }, {
            setup: function(el, options) {
                return this.scope = options.scope, can.Control.prototype.setup.call(this, el, options);
            },
            off: function() {
                this._bindings && can.each(this._bindings.readyComputes || {}, function(value) {
                    value.compute.unbind("change", value.handler);
                }), can.Control.prototype.off.apply(this, arguments), this._bindings.readyComputes = {};
            }
        });
        return window.$ && $.fn && ($.fn.scope = function(attr) {
            return attr ? this.data("scope").attr(attr) : this.data("scope");
        }), can.scope = function(el, attr) {
            return el = can.$(el), attr ? can.data(el, "scope").attr(attr) : can.data(el, "scope");
        }, Component;
    }(__m2, __m9, __m11, __m14, __m21, __m29), __m30 = function(can) {
        var pipe = function(def, thisArg, func) {
            var d = new can.Deferred();
            return def.then(function() {
                var args = can.makeArray(arguments), success = !0;
                try {
                    args[0] = func.apply(thisArg, args);
                } catch (e) {
                    success = !1, d.rejectWith(d, [ e ].concat(args));
                }
                success && d.resolveWith(d, args);
            }, function() {
                d.rejectWith(this, arguments);
            }), "function" == typeof def.abort && (d.abort = function() {
                return def.abort();
            }), d;
        }, modelNum = 0, getId = function(inst) {
            return can.__reading(inst, inst.constructor.id), inst.__get(inst.constructor.id);
        }, ajax = function(ajaxOb, data, type, dataType, success, error) {
            var params = {};
            if ("string" == typeof ajaxOb) {
                var parts = ajaxOb.split(/\s+/);
                params.url = parts.pop(), parts.length && (params.type = parts.pop());
            } else can.extend(params, ajaxOb);
            return params.data = "object" != typeof data || can.isArray(data) ? data : can.extend(params.data || {}, data), 
            params.url = can.sub(params.url, params.data, !0), can.ajax(can.extend({
                type: type || "post",
                dataType: dataType || "json",
                success: success,
                error: error
            }, params));
        }, makeRequest = function(modelObj, type, success, error, method) {
            var args;
            can.isArray(modelObj) ? (args = modelObj[1], modelObj = modelObj[0]) : args = modelObj.serialize(), 
            args = [ args ];
            var deferred, jqXHR, model = modelObj.constructor;
            return ("update" === type || "destroy" === type) && args.unshift(getId(modelObj)), 
            jqXHR = model[type].apply(model, args), deferred = pipe(jqXHR, modelObj, function(data) {
                return modelObj[method || type + "d"](data, jqXHR), modelObj;
            }), jqXHR.abort && (deferred.abort = function() {
                jqXHR.abort();
            }), deferred.then(success, error), deferred;
        }, initializers = {
            models: function(prop) {
                return function(instancesRawData, oldList) {
                    if (can.Model._reqs++, instancesRawData) {
                        if (instancesRawData instanceof this.List) return instancesRawData;
                        var self = this, tmp = [], ListClass = self.List || ML, modelList = oldList instanceof can.List ? oldList : new ListClass(), rawDataIsArray = can.isArray(instancesRawData), rawDataIsList = instancesRawData instanceof ML, raw = rawDataIsArray ? instancesRawData : rawDataIsList ? instancesRawData.serialize() : can.getObject(prop || "data", instancesRawData);
                        if ("undefined" == typeof raw) throw new Error("Could not get any raw data while converting using .models");
                        return modelList.length && modelList.splice(0), can.each(raw, function(rawPart) {
                            tmp.push(self.model(rawPart));
                        }), modelList.push.apply(modelList, tmp), rawDataIsArray || can.each(instancesRawData, function(val, prop) {
                            "data" !== prop && modelList.attr(prop, val);
                        }), setTimeout(can.proxy(this._clean, this), 1), modelList;
                    }
                };
            },
            model: function(prop) {
                return function(attributes) {
                    if (attributes) {
                        "function" == typeof attributes.serialize && (attributes = attributes.serialize()), 
                        this.parseModel ? attributes = this.parseModel.apply(this, arguments) : prop && (attributes = can.getObject(prop || "data", attributes));
                        var id = attributes[this.id], model = (id || 0 === id) && this.store[id] ? this.store[id].attr(attributes, this.removeAttr || !1) : new this(attributes);
                        return model;
                    }
                };
            }
        }, parserMaker = function(prop) {
            return function(attributes) {
                return prop ? can.getObject(prop || "data", attributes) : attributes;
            };
        }, parsers = {
            parseModel: parserMaker,
            parseModels: parserMaker
        }, ajaxMethods = {
            create: {
                url: "_shortName",
                type: "post"
            },
            update: {
                data: function(id, attrs) {
                    attrs = attrs || {};
                    var identity = this.id;
                    return attrs[identity] && attrs[identity] !== id && (attrs["new" + can.capitalize(id)] = attrs[identity], 
                    delete attrs[identity]), attrs[identity] = id, attrs;
                },
                type: "put"
            },
            destroy: {
                type: "delete",
                data: function(id, attrs) {
                    return attrs = attrs || {}, attrs.id = attrs[this.id] = id, attrs;
                }
            },
            findAll: {
                url: "_shortName"
            },
            findOne: {}
        }, ajaxMaker = function(ajaxMethod, str) {
            return function(data) {
                return data = ajaxMethod.data ? ajaxMethod.data.apply(this, arguments) : data, ajax(str || this[ajaxMethod.url || "_url"], data, ajaxMethod.type || "get");
            };
        }, createURLFromResource = function(model, name) {
            if (model.resource) {
                var resource = model.resource.replace(/\/+$/, "");
                return "findAll" === name || "create" === name ? resource : resource + "/{" + model.id + "}";
            }
        };
        can.Model = can.Map.extend({
            fullName: "can.Model",
            _reqs: 0,
            setup: function(base, fullName, staticProps, protoProps) {
                if ("string" !== fullName && (protoProps = staticProps, staticProps = fullName), 
                protoProps || (protoProps = staticProps), this.store = {}, can.Map.setup.apply(this, arguments), 
                can.Model) {
                    staticProps && staticProps.List ? (this.List = staticProps.List, this.List.Map = this) : this.List = base.List.extend({
                        Map: this
                    }, {});
                    var self = this, clean = can.proxy(this._clean, self);
                    can.each(ajaxMethods, function(method, name) {
                        if (can.isFunction(self[name]) || (self[name] = ajaxMaker(method, self[name] ? self[name] : createURLFromResource(self, name))), 
                        self["make" + can.capitalize(name)]) {
                            var newMethod = self["make" + can.capitalize(name)](self[name]);
                            can.Construct._overwrite(self, base, name, function() {
                                can.Model._reqs++;
                                var def = newMethod.apply(this, arguments), then = def.then(clean, clean);
                                return then.abort = def.abort, then;
                            });
                        }
                    }), can.each(initializers, function(makeInitializer, name) {
                        var parseName = "parse" + can.capitalize(name), dataProperty = self[name];
                        "string" == typeof dataProperty ? (can.Construct._overwrite(self, base, parseName, parsers[parseName](dataProperty)), 
                        can.Construct._overwrite(self, base, name, makeInitializer(dataProperty))) : protoProps && (protoProps[name] || protoProps[parseName]) || can.Construct._overwrite(self, base, parseName, parsers[parseName]());
                    }), can.each(parsers, function(makeParser, name) {
                        "string" == typeof self[name] && can.Construct._overwrite(self, base, name, makeParser(self[name]));
                    }), "can.Model" !== self.fullName && self.fullName || (self.fullName = "Model" + ++modelNum), 
                    can.Model._reqs = 0, this._url = this._shortName + "/{" + this.id + "}";
                }
            },
            _ajax: ajaxMaker,
            _makeRequest: makeRequest,
            _clean: function() {
                if (can.Model._reqs--, !can.Model._reqs) for (var id in this.store) this.store[id]._bindings || delete this.store[id];
                return arguments[0];
            },
            models: initializers.models("data"),
            model: initializers.model()
        }, {
            setup: function(attrs) {
                var id = attrs && attrs[this.constructor.id];
                can.Model._reqs && null != id && (this.constructor.store[id] = this), can.Map.prototype.setup.apply(this, arguments);
            },
            isNew: function() {
                var id = getId(this);
                return !(id || 0 === id);
            },
            save: function(success, error) {
                return makeRequest(this, this.isNew() ? "create" : "update", success, error);
            },
            destroy: function(success, error) {
                if (this.isNew()) {
                    var self = this, def = can.Deferred();
                    return def.then(success, error), def.done(function(data) {
                        self.destroyed(data);
                    }).resolve(self);
                }
                return makeRequest(this, "destroy", success, error, "destroyed");
            },
            _bindsetup: function() {
                return this.constructor.store[this.__get(this.constructor.id)] = this, can.Map.prototype._bindsetup.apply(this, arguments);
            },
            _bindteardown: function() {
                return delete this.constructor.store[getId(this)], can.Map.prototype._bindteardown.apply(this, arguments);
            },
            ___set: function(prop, val) {
                can.Map.prototype.___set.call(this, prop, val), prop === this.constructor.id && this._bindings && (this.constructor.store[getId(this)] = this);
            }
        });
        var makeGetterHandler = function(name) {
            var parseName = "parse" + can.capitalize(name);
            return function(data) {
                return this[parseName] && (data = this[parseName].apply(this, arguments)), this[name](data);
            };
        }, createUpdateDestroyHandler = function(data) {
            return this.parseModel ? this.parseModel.apply(this, arguments) : this.model(data);
        }, responseHandlers = {
            makeFindAll: makeGetterHandler("models"),
            makeFindOne: makeGetterHandler("model"),
            makeCreate: createUpdateDestroyHandler,
            makeUpdate: createUpdateDestroyHandler
        };
        can.each(responseHandlers, function(method, name) {
            can.Model[name] = function(oldMethod) {
                return function() {
                    var args = can.makeArray(arguments), oldArgs = can.isFunction(args[1]) ? args.splice(0, 1) : args.splice(0, 2), def = pipe(oldMethod.apply(this, oldArgs), this, method);
                    return def.then(args[0], args[1]), def;
                };
            };
        }), can.each([ "created", "updated", "destroyed" ], function(funcName) {
            can.Model.prototype[funcName] = function(attrs) {
                var stub, constructor = this.constructor;
                stub = attrs && "object" == typeof attrs && this.attr(attrs.attr ? attrs.attr() : attrs), 
                can.dispatch.call(this, {
                    type: "change",
                    target: this
                }, [ funcName ]), can.dispatch.call(constructor, funcName, [ this ]);
            };
        });
        var ML = can.Model.List = can.List.extend({
            _bubbleRule: function(eventName, list) {
                return can.List._bubbleRule(eventName, list) || "destroyed";
            }
        }, {
            setup: function(params) {
                can.isPlainObject(params) && !can.isArray(params) ? (can.List.prototype.setup.apply(this), 
                this.replace(this.constructor.Map.findAll(params))) : can.List.prototype.setup.apply(this, arguments), 
                this._init = 1, this.bind("destroyed", can.proxy(this._destroyed, this)), delete this._init;
            },
            _destroyed: function(ev, attr) {
                if (/\w+/.test(attr)) for (var index; (index = this.indexOf(ev.target)) > -1; ) this.splice(index, 1);
            }
        });
        return can.Model;
    }(__m2, __m15, __m19), __m32 = function(can) {
        var digitTest = /^\d+$/, keyBreaker = /([^\[\]]+)|(\[\])/g, paramTest = /([^?#]*)(#.*)?$/, prep = function(str) {
            return decodeURIComponent(str.replace(/\+/g, " "));
        };
        return can.extend(can, {
            deparam: function(params) {
                var pairs, lastPart, data = {};
                return params && paramTest.test(params) && (pairs = params.split("&"), can.each(pairs, function(pair) {
                    var parts = pair.split("="), key = prep(parts.shift()), value = prep(parts.join("=")), current = data;
                    if (key) {
                        parts = key.match(keyBreaker);
                        for (var j = 0, l = parts.length - 1; l > j; j++) current[parts[j]] || (current[parts[j]] = digitTest.test(parts[j + 1]) || "[]" === parts[j + 1] ? [] : {}), 
                        current = current[parts[j]];
                        lastPart = parts.pop(), "[]" === lastPart ? current.push(value) : current[lastPart] = value;
                    }
                })), data;
            }
        }), can;
    }(__m2, __m13), __m31 = function(can) {
        var timer, curParams, lastHash, changingData, matcher = /\:([\w\.]+)/g, paramsMatcher = /^(?:&[^=]+=[^&]*)+/, makeProps = function(props) {
            var tags = [];
            return can.each(props, function(val, name) {
                tags.push(("className" === name ? "class" : name) + '="' + ("href" === name ? val : can.esc(val)) + '"');
            }), tags.join(" ");
        }, matchesData = function(route, data) {
            var count = 0, i = 0, defaults = {};
            for (var name in route.defaults) route.defaults[name] === data[name] && (defaults[name] = 1, 
            count++);
            for (;i < route.names.length; i++) {
                if (!data.hasOwnProperty(route.names[i])) return -1;
                defaults[route.names[i]] || count++;
            }
            return count;
        }, location = window.location, wrapQuote = function(str) {
            return (str + "").replace(/([.?*+\^$\[\]\\(){}|\-])/g, "\\$1");
        }, each = can.each, extend = can.extend, stringify = function(obj) {
            return obj && "object" == typeof obj ? (obj = obj instanceof can.Map ? obj.attr() : can.isFunction(obj.slice) ? obj.slice() : can.extend({}, obj), 
            can.each(obj, function(val, prop) {
                obj[prop] = stringify(val);
            })) : obj !== undefined && null !== obj && can.isFunction(obj.toString) && (obj = obj.toString()), 
            obj;
        }, removeBackslash = function(str) {
            return str.replace(/\\/g, "");
        }, onRouteDataChange = function(ev, attr, how, newval) {
            changingData = 1, clearTimeout(timer), timer = setTimeout(function() {
                changingData = 0;
                var serialized = can.route.data.serialize(), path = can.route.param(serialized, !0);
                can.route._call("setURL", path), lastHash = path;
            }, 10);
        };
        can.route = function(url, defaults) {
            var root = can.route._call("root");
            root.lastIndexOf("/") === root.length - 1 && 0 === url.indexOf("/") && (url = url.substr(1)), 
            defaults = defaults || {};
            for (var res, next, names = [], test = "", lastIndex = matcher.lastIndex = 0, querySeparator = can.route._call("querySeparator"), matchSlashes = can.route._call("matchSlashes"); res = matcher.exec(url); ) names.push(res[1]), 
            test += removeBackslash(url.substring(lastIndex, matcher.lastIndex - res[0].length)), 
            next = "\\" + (removeBackslash(url.substr(matcher.lastIndex, 1)) || querySeparator + (matchSlashes ? "" : "|/")), 
            test += "([^" + next + "]" + (defaults[res[1]] ? "*" : "+") + ")", lastIndex = matcher.lastIndex;
            return test += url.substr(lastIndex).replace("\\", ""), can.route.routes[url] = {
                test: new RegExp("^" + test + "($|" + wrapQuote(querySeparator) + ")"),
                route: url,
                names: names,
                defaults: defaults,
                length: url.split("/").length
            }, can.route;
        }, extend(can.route, {
            param: function(data, _setRoute) {
                var route, matchCount, matches = 0, routeName = data.route, propCount = 0;
                if (delete data.route, each(data, function() {
                    propCount++;
                }), each(can.route.routes, function(temp, name) {
                    return matchCount = matchesData(temp, data), matchCount > matches && (route = temp, 
                    matches = matchCount), matchCount >= propCount ? !1 : void 0;
                }), can.route.routes[routeName] && matchesData(can.route.routes[routeName], data) === matches && (route = can.route.routes[routeName]), 
                route) {
                    var after, cpy = extend({}, data), res = route.route.replace(matcher, function(whole, name) {
                        return delete cpy[name], data[name] === route.defaults[name] ? "" : encodeURIComponent(data[name]);
                    }).replace("\\", "");
                    return each(route.defaults, function(val, name) {
                        cpy[name] === val && delete cpy[name];
                    }), after = can.param(cpy), _setRoute && can.route.attr("route", route.route), res + (after ? can.route._call("querySeparator") + after : "");
                }
                return can.isEmptyObject(data) ? "" : can.route._call("querySeparator") + can.param(data);
            },
            deparam: function(url) {
                var root = can.route._call("root");
                root.lastIndexOf("/") === root.length - 1 && 0 === url.indexOf("/") && (url = url.substr(1));
                var route = {
                    length: -1
                }, querySeparator = can.route._call("querySeparator"), paramsMatcher = can.route._call("paramsMatcher");
                if (each(can.route.routes, function(temp, name) {
                    temp.test.test(url) && temp.length > route.length && (route = temp);
                }), route.length > -1) {
                    var parts = url.match(route.test), start = parts.shift(), remainder = url.substr(start.length - (parts[parts.length - 1] === querySeparator ? 1 : 0)), obj = remainder && paramsMatcher.test(remainder) ? can.deparam(remainder.slice(1)) : {};
                    return obj = extend(!0, {}, route.defaults, obj), each(parts, function(part, i) {
                        part && part !== querySeparator && (obj[route.names[i]] = decodeURIComponent(part));
                    }), obj.route = route.route, obj;
                }
                return url.charAt(0) !== querySeparator && (url = querySeparator + url), paramsMatcher.test(url) ? can.deparam(url.slice(1)) : {};
            },
            data: new can.Map({}),
            map: function(data) {
                var appState;
                appState = data.prototype instanceof can.Map ? new data() : data, can.route.data = appState;
            },
            routes: {},
            ready: function(val) {
                return val !== !0 && (can.route._setup(), can.route.setState()), can.route;
            },
            url: function(options, merge) {
                return merge && (options = can.extend({}, can.route.deparam(can.route._call("matchingPartOfURL")), options)), 
                can.route._call("root") + can.route.param(options);
            },
            link: function(name, options, props, merge) {
                return "<a " + makeProps(extend({
                    href: can.route.url(options, merge)
                }, props)) + ">" + name + "</a>";
            },
            current: function(options) {
                return this._call("matchingPartOfURL") === can.route.param(options);
            },
            bindings: {
                hashchange: {
                    paramsMatcher: paramsMatcher,
                    querySeparator: "&",
                    matchSlashes: !1,
                    bind: function() {
                        can.bind.call(window, "hashchange", setState);
                    },
                    unbind: function() {
                        can.unbind.call(window, "hashchange", setState);
                    },
                    matchingPartOfURL: function() {
                        return location.href.split(/#!?/)[1] || "";
                    },
                    setURL: function(path) {
                        return location.hash = "#!" + path, path;
                    },
                    root: "#!"
                }
            },
            defaultBinding: "hashchange",
            currentBinding: null,
            _setup: function() {
                can.route.currentBinding || (can.route._call("bind"), can.route.bind("change", onRouteDataChange), 
                can.route.currentBinding = can.route.defaultBinding);
            },
            _teardown: function() {
                can.route.currentBinding && (can.route._call("unbind"), can.route.unbind("change", onRouteDataChange), 
                can.route.currentBinding = null), clearTimeout(timer), changingData = 0;
            },
            _call: function() {
                var args = can.makeArray(arguments), prop = args.shift(), binding = can.route.bindings[can.route.currentBinding || can.route.defaultBinding], method = binding[prop];
                return method.apply ? method.apply(binding, args) : method;
            }
        }), each([ "bind", "unbind", "on", "off", "delegate", "undelegate", "removeAttr", "compute", "_get", "__get" ], function(name) {
            can.route[name] = function() {
                return can.route.data[name] ? can.route.data[name].apply(can.route.data, arguments) : void 0;
            };
        }), can.route.attr = function(attr, val) {
            var newArguments, type = typeof attr;
            return newArguments = val === undefined ? arguments : "string" !== type && "number" !== type ? [ stringify(attr), val ] : [ attr, stringify(val) ], 
            can.route.data.attr.apply(can.route.data, newArguments);
        };
        var setState = can.route.setState = function() {
            var hash = can.route._call("matchingPartOfURL"), oldParams = curParams;
            if (curParams = can.route.deparam(hash), !changingData || hash !== lastHash) {
                can.batch.start();
                for (var attr in oldParams) curParams[attr] || can.route.removeAttr(attr);
                can.route.attr(curParams), can.batch.stop();
            }
        };
        return can.route;
    }(__m2, __m15, __m19, __m32), __m33 = function(can) {
        return can.Control.processors.route = function(el, event, selector, funcName, controller) {
            selector = selector || "", can.route.routes[selector] || ("/" === selector[0] && (selector = selector.substring(1)), 
            can.route(selector));
            var batchNum, check = function(ev, attr, how) {
                if (can.route.attr("route") === selector && (ev.batchNum === undefined || ev.batchNum !== batchNum)) {
                    batchNum = ev.batchNum;
                    var d = can.route.attr();
                    delete d.route, can.isFunction(controller[funcName]) ? controller[funcName](d) : controller[controller[funcName]](d);
                }
            };
            return can.route.bind("change", check), function() {
                can.route.unbind("change", check);
            };
        }, can;
    }(__m2, __m31, __m11), __m34 = function(can) {
        var extend = can.extend, EJS = function(options) {
            if (this.constructor !== EJS) {
                var ejs = new EJS(options);
                return function(data, helpers) {
                    return ejs.render(data, helpers);
                };
            }
            return "function" == typeof options ? void (this.template = {
                fn: options
            }) : (extend(this, options), void (this.template = this.scanner.scan(this.text, this.name)));
        };
        return can.EJS = EJS, EJS.prototype.render = function(object, extraHelpers) {
            return object = object || {}, this.template.fn.call(object, object, new EJS.Helpers(object, extraHelpers || {}));
        }, extend(EJS.prototype, {
            scanner: new can.view.Scanner({
                text: {
                    outStart: "with(_VIEW) { with (_CONTEXT) {",
                    outEnd: "}}",
                    argNames: "_CONTEXT,_VIEW",
                    context: "this"
                },
                tokens: [ [ "templateLeft", "<%%" ], [ "templateRight", "%>" ], [ "returnLeft", "<%==" ], [ "escapeLeft", "<%=" ], [ "commentLeft", "<%#" ], [ "left", "<%" ], [ "right", "%>" ], [ "returnRight", "%>" ] ],
                helpers: [ {
                    name: /\s*\(([\$\w]+)\)\s*->([^\n]*)/,
                    fn: function(content) {
                        var quickFunc = /\s*\(([\$\w]+)\)\s*->([^\n]*)/, parts = content.match(quickFunc);
                        return "can.proxy(function(__){var " + parts[1] + "=can.$(__);" + parts[2] + "}, this);";
                    }
                } ],
                transform: function(source) {
                    return source.replace(/<%([\s\S]+?)%>/gm, function(whole, part) {
                        var foundBracketPair, i, brackets = [];
                        part.replace(/[{}]/gm, function(bracket, offset) {
                            brackets.push([ bracket, offset ]);
                        });
                        do for (foundBracketPair = !1, i = brackets.length - 2; i >= 0; i--) if ("{" === brackets[i][0] && "}" === brackets[i + 1][0]) {
                            brackets.splice(i, 2), foundBracketPair = !0;
                            break;
                        } while (foundBracketPair);
                        if (brackets.length >= 2) {
                            var bracket, result = [ "<%" ], last = 0;
                            for (i = 0; bracket = brackets[i]; i++) result.push(part.substring(last, last = bracket[1])), 
                            "{" === bracket[0] && i < brackets.length - 1 || "}" === bracket[0] && i > 0 ? result.push("{" === bracket[0] ? "{ %><% " : " %><% }") : result.push(bracket[0]), 
                            ++last;
                            return result.push(part.substring(last), "%>"), result.join("");
                        }
                        return "<%" + part + "%>";
                    });
                }
            })
        }), EJS.Helpers = function(data, extras) {
            this._data = data, this._extras = extras, extend(this, extras);
        }, EJS.Helpers.prototype = {
            list: function(list, cb) {
                can.each(list, function(item, i) {
                    cb(item, i, list);
                });
            },
            each: function(list, cb) {
                can.isArray(list) ? this.list(list, cb) : can.view.lists(list, cb);
            }
        }, can.view.register({
            suffix: "ejs",
            script: function(id, src) {
                return "can.EJS(function(_CONTEXT,_VIEW) { " + new EJS({
                    text: src,
                    name: id
                }).template.out + " })";
            },
            renderer: function(id, text) {
                return EJS({
                    text: text,
                    name: id
                });
            }
        }), can.ejs.Helpers = EJS.Helpers, can;
    }(__m2, __m10, __m13, __m20, __m23, __m25), __m36 = function(can, elements) {
        function processNode(node, paths, location) {
            var callback, el, p, i, len, loc = location, nodeType = typeof node, getCallback = function() {
                return callback || (callback = {
                    path: location,
                    callbacks: []
                }, paths.push(callback), loc = []), callback;
            };
            if ("object" === nodeType) {
                if (node.tag) {
                    if (el = document.createElement(node.tag), node.attrs) for (var attrName in node.attrs) {
                        var value = node.attrs[attrName];
                        "function" == typeof value ? getCallback().callbacks.push({
                            callback: value
                        }) : el.setAttribute(attrName, value);
                    }
                    if (node.attributes) for (i = 0, len = node.attributes.length; len > i; i++) getCallback().callbacks.push({
                        callback: node.attributes[i]
                    });
                    node.children && node.children.length && (p = callback ? callback.paths = [] : paths, 
                    el.appendChild(processNodes(node.children, p, loc)));
                } else if (node.comment && (el = document.createComment(node.comment), node.callbacks)) for (i = 0, 
                len = node.attributes.length; len > i; i++) getCallback().callbacks.push({
                    callback: node.callbacks[i]
                });
            } else "string" === nodeType ? el = document.createTextNode(node) : "function" === nodeType && (keepsTextNodes ? (el = document.createTextNode(""), 
            getCallback().callbacks.push({
                callback: node
            })) : (el = document.createComment("~"), getCallback().callbacks.push({
                callback: function() {
                    var el = document.createTextNode("");
                    return elements.replace([ this ], el), node.apply(el, arguments);
                }
            })));
            return el;
        }
        function hydratePath(el, pathData, args) {
            for (var callbackData, path = pathData.path, callbacks = pathData.callbacks, paths = pathData.paths, child = el, i = 0, len = path.length; len > i; i++) child = child.childNodes[path[i]];
            for (i = 0, len = callbacks.length; len > i; i++) callbackData = callbacks[i], callbackData.callback.apply(child, args);
            if (paths && paths.length) for (i = paths.length - 1; i >= 0; i--) hydratePath(child, paths[i], args);
        }
        function makeTarget(nodes) {
            var paths = [], frag = processNodes(nodes, paths, []);
            return {
                paths: paths,
                clone: frag,
                hydrate: function() {
                    for (var cloned = cloneNode(this.clone), args = can.makeArray(arguments), i = paths.length - 1; i >= 0; i--) hydratePath(cloned, paths[i], args);
                    return cloned;
                }
            };
        }
        var processNodes = function(nodes, paths, location) {
            for (var frag = document.createDocumentFragment(), i = 0, len = nodes.length; len > i; i++) {
                var node = nodes[i];
                frag.appendChild(processNode(node, paths, location.concat(i)));
            }
            return frag;
        }, keepsTextNodes = function() {
            var testFrag = document.createDocumentFragment(), div = document.createElement("div");
            div.appendChild(document.createTextNode("")), div.appendChild(document.createTextNode("")), 
            testFrag.appendChild(div);
            var cloned = testFrag.cloneNode(!0);
            return 2 === cloned.childNodes[0].childNodes.length;
        }(), clonesWork = function() {
            var a = document.createElement("a");
            a.innerHTML = "<xyz></xyz>";
            var clone = a.cloneNode(!0);
            return "<xyz></xyz>" === clone.innerHTML;
        }(), cloneNode = clonesWork ? function(el) {
            return el.cloneNode(!0);
        } : function(node) {
            var copy;
            if (1 === node.nodeType ? copy = document.createElement(node.nodeName) : 3 === node.nodeType ? copy = document.createTextNode(node.nodeValue) : 8 === node.nodeType ? copy = document.createComment(node.nodeValue) : 11 === node.nodeType && (copy = document.createDocumentFragment()), 
            node.attributes) {
                var attributes = can.makeArray(node.attributes);
                can.each(attributes, function(node) {
                    node && node.specified && copy.setAttribute(node.nodeName, node.nodeValue);
                });
            }
            return node.childNodes && can.each(node.childNodes, function(child) {
                copy.appendChild(cloneNode(child));
            }), copy;
        };
        return makeTarget.keepsTextNodes = keepsTextNodes, can.view.target = makeTarget, 
        makeTarget;
    }(__m2, __m24), __m38 = function() {
        return {
            isArrayLike: function(obj) {
                return obj && obj.splice && "number" == typeof obj.length;
            },
            isObserveLike: function(obj) {
                return obj instanceof can.Map || obj && !!obj._get;
            },
            emptyHandler: function() {},
            jsonParse: function(str) {
                return "'" === str[0] ? str.substr(1, str.length - 2) : "undefined" === str ? undefined : window.JSON ? JSON.parse(str) : eval("(" + str + ")");
            },
            mixins: {
                last: function() {
                    return this.stack[this.stack.length - 1];
                },
                add: function(chars) {
                    this.last().add(chars);
                },
                subSectionDepth: function() {
                    return this.stack.length - 1;
                }
            }
        };
    }(__m2), __m40 = function(can, utils, live) {
        live = live || can.view.live;
        var resolve = function(value) {
            return utils.isObserveLike(value) && utils.isArrayLike(value) && value.attr("length") ? value : can.isFunction(value) ? value() : value;
        }, helpers = {
            each: function(items, options) {
                var keys, key, i, resolved = resolve(items), result = [];
                if (resolved instanceof can.List || items && items.isComputed && resolved === undefined) return function(el) {
                    var cb = function(item, index, parentNodeList) {
                        return options.fn(options.scope.add({
                            "@index": index
                        }).add(item), options.options, parentNodeList);
                    };
                    live.list(el, items, cb, options.context, el.parentNode, options.nodeList);
                };
                var expr = resolved;
                if (expr && utils.isArrayLike(expr)) for (i = 0; i < expr.length; i++) result.push(options.fn(options.scope.add({
                    "@index": i
                }).add(expr[i]))); else if (utils.isObserveLike(expr)) for (keys = can.Map.keys(expr), 
                i = 0; i < keys.length; i++) key = keys[i], result.push(options.fn(options.scope.add({
                    "@key": key
                }).add(expr[key]))); else if (expr instanceof Object) for (key in expr) result.push(options.fn(options.scope.add({
                    "@key": key
                }).add(expr[key])));
                return result;
            },
            "if": function(expr, options) {
                var value;
                return value = can.isFunction(expr) ? can.compute.truthy(expr)() : !!resolve(expr), 
                value ? options.fn(options.scope || this) : options.inverse(options.scope || this);
            },
            unless: function(expr, options) {
                return helpers["if"].apply(this, [ can.isFunction(expr) ? can.compute(function() {
                    return !expr();
                }) : !expr, options ]);
            },
            "with": function(expr, options) {
                var ctx = expr;
                return expr = resolve(expr), expr ? options.fn(ctx) : void 0;
            },
            log: function(expr, options) {
                "undefined" != typeof console && console.log && (options ? console.log(expr, options.context) : console.log(expr.context));
            },
            data: function(attr) {
                var data = 2 === arguments.length ? this : arguments[1];
                return function(el) {
                    can.data(can.$(el), attr, data || this.context);
                };
            }
        };
        return {
            registerHelper: function(name, callback) {
                helpers[name] = callback;
            },
            getHelper: function(name, options) {
                var helper = options.attr("helpers." + name);
                return helper || (helper = helpers[name]), helper ? {
                    fn: helper
                } : void 0;
            }
        };
    }(__m2, __m38, __m26), __m39 = function(can, utils, mustacheHelpers, live, elements, Scope, nodeLists) {
        live = live || can.view.live, elements = elements || can.view.elements, Scope = Scope || can.view.Scope, 
        nodeLists = nodeLists || can.view.nodeLists;
        var argumentsRegExp = /((([^\s]+?=)?('.*?'|".*?"))|.*?)\s/g, literalNumberStringBooleanRegExp = /^(?:(?:('.*?'|".*?")|([0-9]+\.?[0-9]*|true|false|null|undefined))|(?:(.+?)=(?:(?:('.*?'|".*?")|([0-9]+\.?[0-9]*|true|false|null|undefined))|(.+))))$/, mustacheLineBreakRegExp = /(?:(?:^|(\r?)\n)(\s*)(\{\{([^\}]*)\}\}\}?)([^\S\n\r]*)($|\r?\n))|(\{\{([^\}]*)\}\}\}?)/g, isLookup = function(obj) {
            return obj && "string" == typeof obj.get;
        }, getItemsFragContent = function(items, isObserveList, helperOptions, options) {
            for (var frag = document.createDocumentFragment(), i = 0, len = items.length; len > i; i++) append(frag, helperOptions.fn(isObserveList ? items.attr("" + i) : items[i], options));
            return frag;
        }, append = function(frag, content) {
            content && frag.appendChild("string" == typeof content ? document.createTextNode(content) : content);
        }, getItemsStringContent = function(items, isObserveList, helperOptions, options) {
            for (var txt = "", i = 0, len = items.length; len > i; i++) txt += helperOptions.fn(isObserveList ? items.attr("" + i) : items[i], options);
            return txt;
        }, getKeyComputeData = function(key, scope, isArgument) {
            var data = scope.computeData(key, {
                isArgument: isArgument,
                args: [ scope.attr("."), scope ]
            });
            return can.compute.temporarilyBind(data.compute), data;
        }, getKeyArgValue = function(key, scope) {
            var data = getKeyComputeData(key, scope, !0);
            return data.compute.hasDependencies ? data.compute : data.initialValue;
        }, convertToScopes = function(helperOptions, scope, options, nodeList, truthyRenderer, falseyRenderer) {
            truthyRenderer && (helperOptions.fn = makeRendererConvertScopes(truthyRenderer, scope, options, nodeList)), 
            falseyRenderer && (helperOptions.inverse = makeRendererConvertScopes(falseyRenderer, scope, options, nodeList));
        }, makeRendererConvertScopes = function(renderer, parentScope, parentOptions, nodeList) {
            var rendererWithScope = function(ctx, opts, parentNodeList) {
                return renderer(ctx || parentScope, opts, parentNodeList);
            };
            return function(newScope, newOptions, parentNodeList) {
                var reads = can.__clearReading();
                newScope === undefined || newScope instanceof can.view.Scope || (newScope = parentScope.add(newScope)), 
                newOptions === undefined || newOptions instanceof core.Options || (newOptions = parentOptions.add(newOptions));
                var result = rendererWithScope(newScope, newOptions || parentOptions, parentNodeList || nodeList);
                return can.__setReading(reads), result;
            };
        }, core = {
            expressionData: function(expression) {
                var args = [], hashes = {}, i = 0;
                return (can.trim(expression) + " ").replace(argumentsRegExp, function(whole, arg) {
                    var m;
                    i && (m = arg.match(literalNumberStringBooleanRegExp)) ? m[1] || m[2] ? args.push(utils.jsonParse(m[1] || m[2])) : hashes[m[3]] = m[6] ? {
                        get: m[6]
                    } : utils.jsonParse(m[4] || m[5]) : args.push({
                        get: arg
                    }), i++;
                }), {
                    name: args.shift(),
                    args: args,
                    hash: hashes
                };
            },
            makeEvaluator: function(scope, options, nodeList, mode, exprData, truthyRenderer, falseyRenderer, stringOnly) {
                for (var helper, initialValue, args = [], hash = {}, helperOptions = {
                    fn: function() {},
                    inverse: function() {}
                }, context = scope.attr("."), name = exprData.name, looksLikeAHelper = exprData.args.length || !can.isEmptyObject(exprData.hash), i = 0, len = exprData.args.length; len > i; i++) {
                    var arg = exprData.args[i];
                    arg && isLookup(arg) ? args.push(getKeyArgValue(arg.get, scope, !0)) : args.push(arg);
                }
                for (var prop in exprData.hash) isLookup(exprData.hash[prop]) ? hash[prop] = getKeyArgValue(exprData.hash[prop].get, scope) : hash[prop] = exprData.hash[prop];
                if (isLookup(name) && (looksLikeAHelper && (helper = mustacheHelpers.getHelper(name.get, options), 
                helper || "function" != typeof context[name.get] || (helper = {
                    fn: context[name.get]
                })), !helper)) {
                    var get = name.get, computeData = getKeyComputeData(name.get, scope, !1), compute = computeData.compute;
                    initialValue = computeData.initialValue, computeData.reads && 1 === computeData.reads.length && computeData.root instanceof can.Map && (compute = can.compute(computeData.root, computeData.reads[0])), 
                    name = computeData.compute.hasDependencies ? compute : initialValue, looksLikeAHelper || initialValue !== undefined ? "function" == typeof initialValue && (helper = {
                        fn: initialValue
                    }) : helper = mustacheHelpers.getHelper(get, options);
                }
                if ("^" === mode) {
                    var temp = truthyRenderer;
                    truthyRenderer = falseyRenderer, falseyRenderer = temp;
                }
                return helper ? (convertToScopes(helperOptions, scope, options, nodeList, truthyRenderer, falseyRenderer), 
                can.simpleExtend(helperOptions, {
                    context: context,
                    scope: scope,
                    contexts: scope,
                    hash: hash,
                    nodeList: nodeList
                }), args.push(helperOptions), function() {
                    return helper.fn.apply(context, args) || "";
                }) : mode ? "#" === mode || "^" === mode ? (convertToScopes(helperOptions, scope, options, nodeList, truthyRenderer, falseyRenderer), 
                function() {
                    var value;
                    if (value = can.isFunction(name) && name.isComputed ? name() : name, utils.isArrayLike(value)) {
                        var isObserveList = utils.isObserveLike(value);
                        return (isObserveList ? value.attr("length") : value.length) ? (stringOnly ? getItemsStringContent : getItemsFragContent)(value, isObserveList, helperOptions, options) : helperOptions.inverse(scope, options);
                    }
                    return value ? helperOptions.fn(value || scope, options) : helperOptions.inverse(scope, options);
                }) : void 0 : name && name.isComputed ? name : function() {
                    return "" + (null != name ? name : "");
                };
            },
            makeLiveBindingPartialRenderer: function(partialName, state) {
                return partialName = can.trim(partialName), function(scope, options, parentSectionNodeList) {
                    var res, partial = options.attr("partials." + partialName);
                    res = partial ? partial.render ? partial.render(scope, options) : partial(scope, options) : can.view.render(partialName, scope, options), 
                    res = can.frag(res);
                    var nodeList = [ this ];
                    nodeLists.register(nodeList, null, state.directlyNested ? parentSectionNodeList || !0 : !0), 
                    nodeLists.update(nodeList, res.childNodes), elements.replace([ this ], res);
                };
            },
            makeStringBranchRenderer: function(mode, expression) {
                var exprData = expressionData(expression), fullExpression = mode + expression;
                return function(scope, options, truthyRenderer, falseyRenderer) {
                    var evaluator = scope.__cache[fullExpression];
                    (mode || !evaluator) && (evaluator = makeEvaluator(scope, options, null, mode, exprData, truthyRenderer, falseyRenderer, !0), 
                    mode || (scope.__cache[fullExpression] = evaluator));
                    var res = evaluator();
                    return null == res ? "" : "" + res;
                };
            },
            makeLiveBindingBranchRenderer: function(mode, expression, state) {
                var exprData = expressionData(expression);
                return function(scope, options, parentSectionNodeList, truthyRenderer, falseyRenderer) {
                    var nodeList = [ this ];
                    nodeList.expression = expression, nodeLists.register(nodeList, null, state.directlyNested ? parentSectionNodeList || !0 : !0);
                    var evaluator = makeEvaluator(scope, options, nodeList, mode, exprData, truthyRenderer, falseyRenderer, state.tag), compute = can.compute(evaluator, null, !1, !0);
                    compute.bind("change", can.k);
                    var value = compute();
                    if ("function" == typeof value) {
                        var old = can.__clearReading();
                        value(this), can.__setReading(old);
                    } else compute.hasDependencies ? state.attr ? live.simpleAttribute(this, state.attr, compute) : state.tag ? live.attributes(this, compute) : state.text && "object" != typeof value ? live.text(this, compute, this.parentNode, nodeList) : live.html(this, compute, this.parentNode, nodeList) : state.attr ? can.attr.set(this, state.attr, value) : state.tag ? live.setAttributes(this, value) : state.text && "string" == typeof value ? this.nodeValue = value : value && elements.replace([ this ], can.frag(value));
                    compute.unbind("change", can.k);
                };
            },
            splitModeFromExpression: function(expression, state) {
                expression = can.trim(expression);
                var mode = expression[0];
                return "#/{&^>!".indexOf(mode) >= 0 ? expression = can.trim(expression.substr(1)) : mode = null, 
                "{" === mode && state.node && (mode = null), {
                    mode: mode,
                    expression: expression
                };
            },
            cleanLineEndings: function(template) {
                return template.replace(mustacheLineBreakRegExp, function(whole, returnBefore, spaceBefore, special, expression, spaceAfter, returnAfter, spaceLessSpecial, spaceLessExpression, matchIndex) {
                    spaceAfter = spaceAfter || "", returnBefore = returnBefore || "", spaceBefore = spaceBefore || "";
                    var modeAndExpression = splitModeFromExpression(expression || spaceLessExpression, {});
                    return spaceLessSpecial || ">{".indexOf(modeAndExpression.mode) >= 0 ? whole : "^#!/".indexOf(modeAndExpression.mode) >= 0 ? special + (0 !== matchIndex && returnAfter.length ? returnBefore + "\n" : "") : spaceBefore + special + spaceAfter + (spaceBefore.length || 0 !== matchIndex ? returnBefore + "\n" : "");
                });
            },
            Options: can.view.Scope.extend({
                init: function(data, parent) {
                    data.helpers || data.partials || data.tags || (data = {
                        helpers: data
                    }), can.view.Scope.prototype.init.apply(this, arguments);
                }
            })
        }, makeEvaluator = core.makeEvaluator, expressionData = core.expressionData, splitModeFromExpression = core.splitModeFromExpression;
        return core;
    }(__m2, __m38, __m40, __m26, __m24, __m22, __m27), __m37 = function(can, target, utils, mustacheCore) {
        var decodeHTML = function() {
            var el = document.createElement("div");
            return function(html) {
                return -1 === html.indexOf("&") ? html.replace(/\r\n/g, "\n") : (el.innerHTML = html, 
                0 === el.childNodes.length ? "" : el.childNodes[0].nodeValue);
            };
        }(), HTMLSectionBuilder = function() {
            this.stack = [ new HTMLSection() ];
        };
        can.extend(HTMLSectionBuilder.prototype, utils.mixins), can.extend(HTMLSectionBuilder.prototype, {
            startSubSection: function(process) {
                var newSection = new HTMLSection(process);
                return this.stack.push(newSection), newSection;
            },
            endSubSectionAndReturnRenderer: function() {
                if (this.last().isEmpty()) return this.stack.pop(), null;
                var htmlSection = this.endSection();
                return can.proxy(htmlSection.compiled.hydrate, htmlSection.compiled);
            },
            startSection: function(process) {
                var newSection = new HTMLSection(process);
                this.last().add(newSection.targetCallback), this.stack.push(newSection);
            },
            endSection: function() {
                return this.last().compile(), this.stack.pop();
            },
            inverse: function() {
                this.last().inverse();
            },
            compile: function() {
                var compiled = this.stack.pop().compile();
                return function(scope, options) {
                    return scope instanceof can.view.Scope || (scope = new can.view.Scope(scope || {})), 
                    options instanceof mustacheCore.Options || (options = new mustacheCore.Options(options || {})), 
                    compiled.hydrate(scope, options);
                };
            },
            push: function(chars) {
                this.last().push(chars);
            },
            pop: function() {
                return this.last().pop();
            }
        });
        var HTMLSection = function(process) {
            this.data = "targetData", this.targetData = [], this.targetStack = [];
            var self = this;
            this.targetCallback = function(scope, options, sectionNode) {
                process.call(this, scope, options, sectionNode, can.proxy(self.compiled.hydrate, self.compiled), self.inverseCompiled && can.proxy(self.inverseCompiled.hydrate, self.inverseCompiled));
            };
        };
        return can.extend(HTMLSection.prototype, {
            inverse: function() {
                this.inverseData = [], this.data = "inverseData";
            },
            push: function(data) {
                this.add(data), this.targetStack.push(data);
            },
            pop: function() {
                return this.targetStack.pop();
            },
            add: function(data) {
                "string" == typeof data && (data = decodeHTML(data)), this.targetStack.length ? this.targetStack[this.targetStack.length - 1].children.push(data) : this[this.data].push(data);
            },
            compile: function() {
                return this.compiled = target(this.targetData), this.inverseData && (this.inverseCompiled = target(this.inverseData), 
                delete this.inverseData), delete this.targetData, delete this.targetStack, this.compiled;
            },
            children: function() {
                return this.targetStack.length ? this.targetStack[this.targetStack.length - 1].children : this[this.data];
            },
            isEmpty: function() {
                return !this.targetData.length;
            }
        }), HTMLSectionBuilder;
    }(__m2, __m36, __m38, __m39), __m41 = function(can, live, utils) {
        live = live || can.view.live;
        var TextSectionBuilder = function() {
            this.stack = [ new TextSection() ];
        }, emptyHandler = function() {};
        can.extend(TextSectionBuilder.prototype, utils.mixins), can.extend(TextSectionBuilder.prototype, {
            startSection: function(process) {
                var subSection = new TextSection();
                this.last().add({
                    process: process,
                    truthy: subSection
                }), this.stack.push(subSection);
            },
            endSection: function() {
                this.stack.pop();
            },
            inverse: function() {
                this.stack.pop();
                var falseySection = new TextSection();
                this.last().last().falsey = falseySection, this.stack.push(falseySection);
            },
            compile: function(state) {
                var renderer = this.stack[0].compile();
                return function(scope, options) {
                    var compute = can.compute(function() {
                        return renderer(scope, options);
                    }, this, !1, !0);
                    compute.bind("change", emptyHandler);
                    var value = compute();
                    compute.hasDependencies ? (state.attr ? live.simpleAttribute(this, state.attr, compute) : live.attributes(this, compute), 
                    compute.unbind("change", emptyHandler)) : state.attr ? can.attr.set(this, state.attr, value) : live.setAttributes(this, value);
                };
            }
        });
        var passTruthyFalsey = function(process, truthy, falsey) {
            return function(scope, options) {
                return process.call(this, scope, options, truthy, falsey);
            };
        }, TextSection = function() {
            this.values = [];
        };
        return can.extend(TextSection.prototype, {
            add: function(data) {
                this.values.push(data);
            },
            last: function() {
                return this.values[this.values.length - 1];
            },
            compile: function() {
                for (var values = this.values, len = values.length, i = 0; len > i; i++) {
                    var value = this.values[i];
                    "object" == typeof value && (values[i] = passTruthyFalsey(value.process, value.truthy && value.truthy.compile(), value.falsey && value.falsey.compile()));
                }
                return function(scope, options) {
                    for (var value, txt = "", i = 0; len > i; i++) value = values[i], txt += "string" == typeof value ? value : value.call(this, scope, options);
                    return txt;
                };
            }
        }), TextSectionBuilder;
    }(__m2, __m26, __m38), __m35 = function(can, parser, target, HTMLSectionBuilder, TextSectionBuilder, mustacheCore, mustacheHelpers, viewCallbacks) {
        function stache(template) {
            template = mustacheCore.cleanLineEndings(template);
            var section = new HTMLSectionBuilder(), state = {
                node: null,
                attr: null,
                sectionElementStack: [],
                text: !1
            }, makeRendererAndUpdateSection = function(section, mode, stache) {
                if (">" === mode) section.add(mustacheCore.makeLiveBindingPartialRenderer(stache, state)); else if ("/" === mode) section.endSection(), 
                section instanceof HTMLSectionBuilder && state.sectionElementStack.pop(); else if ("else" === mode) section.inverse(); else {
                    var makeRenderer = section instanceof HTMLSectionBuilder ? mustacheCore.makeLiveBindingBranchRenderer : mustacheCore.makeStringBranchRenderer;
                    "{" === mode || "&" === mode ? section.add(makeRenderer(null, stache, copyState())) : "#" === mode || "^" === mode ? (section.startSection(makeRenderer(mode, stache, copyState())), 
                    section instanceof HTMLSectionBuilder && state.sectionElementStack.push("section")) : section.add(makeRenderer(null, stache, copyState({
                        text: !0
                    })));
                }
            }, copyState = function(overwrites) {
                var cur = {
                    tag: state.node && state.node.tag,
                    attr: state.attr && state.attr.name,
                    directlyNested: "section" === state.sectionElementStack[state.sectionElementStack.length - 1]
                };
                return overwrites ? can.simpleExtend(cur, overwrites) : cur;
            }, addAttributesCallback = function(node, callback) {
                node.attributes || (node.attributes = []), node.attributes.push(callback);
            };
            return parser(template, {
                start: function(tagName, unary) {
                    state.node = {
                        tag: tagName,
                        children: []
                    };
                },
                end: function(tagName, unary) {
                    var isCustomTag = viewCallbacks.tag(tagName);
                    unary ? (section.add(state.node), isCustomTag && addAttributesCallback(state.node, function(scope, options) {
                        viewCallbacks.tagHandler(this, tagName, {
                            scope: scope,
                            options: options,
                            subtemplate: null,
                            templateType: "stache"
                        });
                    })) : (section.push(state.node), state.sectionElementStack.push("element"), isCustomTag && section.startSubSection()), 
                    state.node = null;
                },
                close: function(tagName) {
                    var renderer, isCustomTag = viewCallbacks.tag(tagName);
                    isCustomTag && (renderer = section.endSubSectionAndReturnRenderer());
                    var oldNode = section.pop();
                    isCustomTag && addAttributesCallback(oldNode, function(scope, options) {
                        viewCallbacks.tagHandler(this, tagName, {
                            scope: scope,
                            options: options,
                            subtemplate: renderer,
                            templateType: "stache"
                        });
                    }), state.sectionElementStack.pop();
                },
                attrStart: function(attrName) {
                    state.node.section ? state.node.section.add(attrName + '="') : state.attr = {
                        name: attrName,
                        value: ""
                    };
                },
                attrEnd: function(attrName) {
                    if (state.node.section) state.node.section.add('" '); else {
                        state.node.attrs || (state.node.attrs = {}), state.node.attrs[state.attr.name] = state.attr.section ? state.attr.section.compile(copyState()) : state.attr.value;
                        var attrCallback = viewCallbacks.attr(attrName);
                        attrCallback && (state.node.attributes || (state.node.attributes = []), state.node.attributes.push(function(scope, options) {
                            attrCallback(this, {
                                attributeName: attrName,
                                scope: scope,
                                options: options
                            });
                        })), state.attr = null;
                    }
                },
                attrValue: function(value) {
                    var section = state.node.section || state.attr.section;
                    section ? section.add(value) : state.attr.value += value;
                },
                chars: function(text) {
                    section.add(text);
                },
                special: function(text) {
                    var firstAndText = mustacheCore.splitModeFromExpression(text, state), mode = firstAndText.mode, expression = firstAndText.expression;
                    if ("else" === expression) return void (state.attr && state.attr.section ? state.attr.section : section).inverse();
                    if ("!" !== mode) if (state.node && state.node.section) makeRendererAndUpdateSection(state.node.section, mode, expression), 
                    0 === state.node.section.subSectionDepth() && (state.node.attributes.push(state.node.section.compile(copyState())), 
                    delete state.node.section); else if (state.attr) state.attr.section || (state.attr.section = new TextSectionBuilder(), 
                    state.attr.value && state.attr.section.add(state.attr.value)), makeRendererAndUpdateSection(state.attr.section, mode, expression); else if (state.node) if (state.node.attributes || (state.node.attributes = []), 
                    mode) {
                        if ("#" !== mode && "^" !== mode) throw mode + " is currently not supported within a tag.";
                        state.node.section || (state.node.section = new TextSectionBuilder()), makeRendererAndUpdateSection(state.node.section, mode, expression);
                    } else state.node.attributes.push(mustacheCore.makeLiveBindingBranchRenderer(null, expression, copyState())); else makeRendererAndUpdateSection(section, mode, expression);
                },
                comment: function(text) {
                    section.add({
                        comment: text
                    });
                },
                done: function() {}
            }), section.compile();
        }
        parser = parser || can.view.parser, viewCallbacks = viewCallbacks || can.view.callbacks;
        var escMap = {
            "\n": "\\n",
            "\r": "\\r",
            "\u2028": "\\u2028",
            "\u2029": "\\u2029"
        }, esc = function(string) {
            return ("" + string).replace(/["'\\\n\r\u2028\u2029]/g, function(character) {
                return "'\"\\".indexOf(character) >= 0 ? "\\" + character : escMap[character];
            });
        };
        return can.view.register({
            suffix: "stache",
            contentType: "x-stache-template",
            fragRenderer: function(id, text) {
                return stache(text);
            },
            script: function(id, src) {
                return 'can.stache("' + esc(src) + '")';
            }
        }), can.view.ext = ".stache", can.extend(can.stache, mustacheHelpers), can.extend(stache, mustacheHelpers), 
        can.stache.safeString = stache.safeString = function(text) {
            return {
                toString: function() {
                    return text;
                }
            };
        }, stache;
    }(__m2, __m28, __m36, __m37, __m41, __m39, __m40, __m9), __m42 = function(can) {
        return can.extend(can.List.prototype, {
            filter: function(callback) {
                var filtered = new this.constructor(), self = this, generator = function(element, index) {
                    var binder = function(ev, val) {
                        var index = filtered.indexOf(element);
                        val || -1 === index || filtered.splice(index, 1), val && -1 === index && filtered.push(element);
                    }, compute = can.compute(function() {
                        return callback(element, self.indexOf(element), self);
                    });
                    compute.bind("change", binder), binder(null, compute());
                };
                return this.bind("add", function(ev, data, index) {
                    can.each(data, function(element, i) {
                        generator(element, index + i);
                    });
                }), this.bind("remove", function(ev, data, index) {
                    can.each(data, function(element, i) {
                        var index = filtered.indexOf(element);
                        -1 !== index && filtered.splice(index, 1);
                    });
                }), this.forEach(generator), filtered;
            },
            map: function(callback) {
                var mapped = new can.List(), self = this, generator = function(element, index) {
                    var compute = can.compute(function() {
                        return callback(element, index, self);
                    });
                    compute.bind("change", function(ev, val) {
                        mapped.splice(index, 1, val);
                    }), mapped.splice(index, 0, compute());
                };
                return this.forEach(generator), this.bind("add", function(ev, data, index) {
                    can.each(data, function(element, i) {
                        generator(element, index + i);
                    });
                }), this.bind("remove", function(ev, data, index) {
                    mapped.splice(index, data.length);
                }), mapped;
            }
        }), can.List;
    }(__m2, __m15, __m19, __m20), __m43 = function(can) {
        var oldBubbleRule = can.List._bubbleRule;
        if (can.List._bubbleRule = function(eventName, list) {
            return list.comparator ? "change" : oldBubbleRule.apply(this, arguments);
        }, can.Model) {
            var oldModelListBubble = can.Model.List._bubbleRule;
            can.Model.List._bubbleRule = function(eventName, list) {
                return list.comparator ? "change" : oldModelListBubble.apply(this, arguments);
            };
        }
        var proto = can.List.prototype, _changes = proto._changes, setup = proto.setup;
        can.extend(proto, {
            comparator: undefined,
            sortIndexes: [],
            sortedIndex: function(item) {
                for (var itemCompare = item.attr(this.comparator), equaled = 0, i = 0, length = this.length; length > i; i++) if (item !== this[i]) {
                    if (itemCompare <= this[i].attr(this.comparator)) return i + equaled;
                } else equaled = -1;
                return i + equaled;
            },
            sort: function(method, silent) {
                var comparator = this.comparator, args = comparator ? [ function(a, b) {
                    return a = "function" == typeof a[comparator] ? a[comparator]() : a[comparator], 
                    b = "function" == typeof b[comparator] ? b[comparator]() : b[comparator], a === b ? 0 : b > a ? -1 : 1;
                } ] : [ method ];
                return silent || can.trigger(this, "reset"), Array.prototype.sort.apply(this, args);
            }
        });
        var getArgs = function(args) {
            return args[0] && can.isArray(args[0]) ? args[0] : can.makeArray(args);
        };
        return can.each({
            push: "length",
            unshift: 0
        }, function(where, name) {
            var proto = can.List.prototype, old = proto[name];
            proto[name] = function() {
                var args = getArgs(arguments), len = where ? this.length : 0, res = old.apply(this, arguments);
                return this.comparator && args.length && (this.sort(null, !0), can.batch.trigger(this, "reset", [ args ]), 
                this._triggerChange("" + len, "add", args, undefined)), res;
            };
        }), proto._changes = function(ev, attr, how, newVal, oldVal) {
            if (this.comparator && /^\d+./.test(attr)) {
                var index = +/^\d+/.exec(attr)[0], item = this[index];
                if ("undefined" != typeof item) {
                    var newIndex = this.sortedIndex(item);
                    if (newIndex !== index) return [].splice.call(this, index, 1), [].splice.call(this, newIndex, 0, item), 
                    can.trigger(this, "move", [ item, newIndex, index ]), void can.trigger(this, "change", [ attr.replace(/^\d+/, newIndex), how, newVal, oldVal ]);
                }
            }
            _changes.apply(this, arguments);
        }, proto.setup = function(instances, options) {
            setup.apply(this, arguments), this.comparator && this.sort();
        }, can.Map;
    }(__m2, __m19), __m44 = function(can) {
        var isArray = can.isArray;
        can.Object = {};
        var same = can.Object.same = function(a, b, compares, aParent, bParent, deep) {
            var compare, aType = typeof a, aArray = isArray(a), comparesType = typeof compares;
            if (("string" === comparesType || null === compares) && (compares = compareMethods[compares], 
            comparesType = "function"), "function" === comparesType) return compares(a, b, aParent, bParent);
            if (compares = compares || {}, null === a || null === b) return a === b;
            if (a instanceof Date || b instanceof Date) return a === b;
            if (-1 === deep) return "object" === aType || a === b;
            if (aType !== typeof b || aArray !== isArray(b)) return !1;
            if (a === b) return !0;
            if (aArray) {
                if (a.length !== b.length) return !1;
                for (var i = 0; i < a.length; i++) if (compare = compares[i] === undefined ? compares["*"] : compares[i], 
                !same(a[i], b[i], a, b, compare)) return !1;
                return !0;
            }
            if ("object" === aType || "function" === aType) {
                var bCopy = can.extend({}, b);
                for (var prop in a) {
                    if (compare = compares[prop] === undefined ? compares["*"] : compares[prop], !same(a[prop], b[prop], compare, a, b, deep === !1 ? -1 : undefined)) return !1;
                    delete bCopy[prop];
                }
                for (prop in bCopy) if (compares[prop] === undefined || !same(undefined, b[prop], compares[prop], a, b, deep === !1 ? -1 : undefined)) return !1;
                return !0;
            }
            return !1;
        };
        can.Object.subsets = function(checkSet, sets, compares) {
            for (var len = sets.length, subsets = [], i = 0; len > i; i++) {
                var set = sets[i];
                can.Object.subset(checkSet, set, compares) && subsets.push(set);
            }
            return subsets;
        }, can.Object.subset = function(subset, set, compares) {
            compares = compares || {};
            for (var prop in set) if (!same(subset[prop], set[prop], compares[prop], subset, set)) return !1;
            return !0;
        };
        var compareMethods = {
            "null": function() {
                return !0;
            },
            i: function(a, b) {
                return ("" + a).toLowerCase() === ("" + b).toLowerCase();
            },
            eq: function(a, b) {
                return a === b;
            },
            similar: function(a, b) {
                return a == b;
            }
        };
        return compareMethods.eqeq = compareMethods.similar, can.Object;
    }(__m2), __m45 = function(can) {
        if (!can.Object) throw new Error("can.fixture depends on can.Object. Please include it before can.fixture.");
        var getUrl = function(url) {
            return "undefined" != typeof steal ? can.isFunction(steal.config) ? steal.config().root.mapJoin(url).toString() : steal.root.join(url).toString() : (can.fixture.rootUrl || "") + url;
        }, updateSettings = function(settings, originalOptions) {
            if (can.fixture.on) {
                var log = function() {};
                settings.type = settings.type || settings.method || "GET";
                var data = overwrite(settings);
                if (!settings.fixture) return void ("file:" === window.location.protocol && log("ajax request to " + settings.url + ", no fixture found"));
                if ("string" == typeof settings.fixture && can.fixture[settings.fixture] && (settings.fixture = can.fixture[settings.fixture]), 
                "string" == typeof settings.fixture) {
                    var url = settings.fixture;
                    /^\/\//.test(url) && (url = getUrl(settings.fixture.substr(2))), data && (url = can.sub(url, data)), 
                    delete settings.fixture, settings.url = url, settings.data = null, settings.type = "GET", 
                    settings.error || (settings.error = function(xhr, error, message) {
                        throw "fixtures.js Error " + error + " " + message;
                    });
                } else settings.dataTypes && settings.dataTypes.splice(0, 0, "fixture"), data && originalOptions && (originalOptions.data = originalOptions.data || {}, 
                can.extend(originalOptions.data, data));
            }
        }, extractResponse = function(status, statusText, responses, headers) {
            return "number" != typeof status && (headers = statusText, responses = status, statusText = "success", 
            status = 200), "string" != typeof statusText && (headers = responses, responses = statusText, 
            statusText = "success"), status >= 400 && 599 >= status && (this.dataType = "text"), 
            [ status, statusText, extractResponses(this, responses), headers ];
        }, extractResponses = function(settings, responses) {
            var next = settings.dataTypes ? settings.dataTypes[0] : settings.dataType || "json";
            if (!responses || !responses[next]) {
                var tmp = {};
                tmp[next] = responses, responses = tmp;
            }
            return responses;
        };
        if (can.ajaxPrefilter && can.ajaxTransport) can.ajaxPrefilter(updateSettings), can.ajaxTransport("fixture", function(s, original) {
            s.dataTypes.shift();
            var timeout, stopped = !1;
            return {
                send: function(headers, callback) {
                    timeout = setTimeout(function() {
                        var success = function() {
                            stopped === !1 && callback.apply(null, extractResponse.apply(s, arguments));
                        }, result = s.fixture(original, success, headers, s);
                        result !== undefined && callback(200, "success", extractResponses(s, result), {});
                    }, can.fixture.delay);
                },
                abort: function() {
                    stopped = !0, clearTimeout(timeout);
                }
            };
        }); else {
            var AJAX = can.ajax;
            can.ajax = function(settings) {
                if (updateSettings(settings, settings), settings.fixture) {
                    var timeout, deferred = new can.Deferred(), stopped = !1;
                    return deferred.getResponseHeader = function() {}, deferred.then(settings.success, settings.fail), 
                    deferred.abort = function() {
                        clearTimeout(timeout), stopped = !0, deferred.reject(deferred);
                    }, timeout = setTimeout(function() {
                        var success = function() {
                            var response = extractResponse.apply(settings, arguments), status = response[0];
                            (status >= 200 && 300 > status || 304 === status) && stopped === !1 ? deferred.resolve(response[2][settings.dataType]) : deferred.reject(deferred, "error", response[1]);
                        }, result = settings.fixture(settings, success, settings.headers, settings);
                        result !== undefined && deferred.resolve(result);
                    }, can.fixture.delay), deferred;
                }
                return AJAX(settings);
            };
        }
        var overwrites = [], find = function(settings, exact) {
            for (var i = 0; i < overwrites.length; i++) if ($fixture._similar(settings, overwrites[i], exact)) return i;
            return -1;
        }, overwrite = function(settings) {
            var index = find(settings);
            return index > -1 ? (settings.fixture = overwrites[index].fixture, $fixture._getData(overwrites[index].url, settings.url)) : void 0;
        }, getId = function(settings) {
            var id = settings.data.id;
            return id === undefined && "number" == typeof settings.data && (id = settings.data), 
            id === undefined && settings.url.replace(/\/(\d+)(\/|$|\.)/g, function(all, num) {
                id = num;
            }), id === undefined && (id = settings.url.replace(/\/(\w+)(\/|$|\.)/g, function(all, num) {
                "update" !== num && (id = num);
            })), id === undefined && (id = Math.round(1e3 * Math.random())), id;
        }, $fixture = can.fixture = function(settings, fixture) {
            if (fixture !== undefined) {
                if ("string" == typeof settings) {
                    var matches = settings.match(/(GET|POST|PUT|DELETE) (.+)/i);
                    settings = matches ? {
                        url: matches[2],
                        type: matches[1]
                    } : {
                        url: settings
                    };
                }
                var index = find(settings, !!fixture);
                if (index > -1 && overwrites.splice(index, 1), null == fixture) return;
                settings.fixture = fixture, overwrites.push(settings);
            } else can.each(settings, function(fixture, url) {
                $fixture(url, fixture);
            });
        }, replacer = can.replacer;
        return can.extend(can.fixture, {
            _similar: function(settings, overwrite, exact) {
                return exact ? can.Object.same(settings, overwrite, {
                    fixture: null
                }) : can.Object.subset(settings, overwrite, can.fixture._compare);
            },
            _compare: {
                url: function(a, b) {
                    return !!$fixture._getData(b, a);
                },
                fixture: null,
                type: "i"
            },
            _getData: function(fixtureUrl, url) {
                var order = [], fixtureUrlAdjusted = fixtureUrl.replace(".", "\\.").replace("?", "\\?"), res = new RegExp(fixtureUrlAdjusted.replace(replacer, function(whole, part) {
                    return order.push(part), "([^/]+)";
                }) + "$").exec(url), data = {};
                return res ? (res.shift(), can.each(order, function(name) {
                    data[name] = res.shift();
                }), data) : null;
            },
            store: function(count, make, filter) {
                var types, items, reset, currentId = 0, findOne = function(id) {
                    for (var i = 0; i < items.length; i++) if (id == items[i].id) return items[i];
                }, methods = {};
                if (can.isArray(count) && "string" == typeof count[0] ? (types = count, count = make, 
                make = filter, filter = arguments[3]) : "string" == typeof count && (types = [ count + "s", count ], 
                count = make, make = filter, filter = arguments[3]), "number" == typeof count) items = [], 
                reset = function() {
                    items = [];
                    for (var i = 0; count > i; i++) {
                        var item = make(i, items);
                        item.id || (item.id = i), currentId = Math.max(item.id + 1, currentId + 1) || items.length, 
                        items.push(item);
                    }
                    can.isArray(types) && (can.fixture["~" + types[0]] = items, can.fixture["-" + types[0]] = methods.findAll, 
                    can.fixture["-" + types[1]] = methods.findOne, can.fixture["-" + types[1] + "Update"] = methods.update, 
                    can.fixture["-" + types[1] + "Destroy"] = methods.destroy, can.fixture["-" + types[1] + "Create"] = methods.create);
                }; else {
                    filter = make;
                    var initialItems = count;
                    reset = function() {
                        items = initialItems.slice(0);
                    };
                }
                return can.extend(methods, {
                    findAll: function(request) {
                        request = request || {};
                        var retArr = items.slice(0);
                        request.data = request.data || {}, can.each((request.data.order || []).slice(0).reverse(), function(name) {
                            var split = name.split(" ");
                            retArr = retArr.sort(function(a, b) {
                                return "ASC" !== split[1].toUpperCase() ? a[split[0]] < b[split[0]] ? 1 : a[split[0]] === b[split[0]] ? 0 : -1 : a[split[0]] < b[split[0]] ? -1 : a[split[0]] === b[split[0]] ? 0 : 1;
                            });
                        }), can.each((request.data.group || []).slice(0).reverse(), function(name) {
                            var split = name.split(" ");
                            retArr = retArr.sort(function(a, b) {
                                return a[split[0]] > b[split[0]];
                            });
                        });
                        var offset = parseInt(request.data.offset, 10) || 0, limit = parseInt(request.data.limit, 10) || items.length - offset, i = 0;
                        for (var param in request.data) if (i = 0, request.data[param] !== undefined && (-1 !== param.indexOf("Id") || -1 !== param.indexOf("_id"))) for (;i < retArr.length; ) request.data[param] != retArr[i][param] ? retArr.splice(i, 1) : i++;
                        if ("function" == typeof filter) for (i = 0; i < retArr.length; ) filter(retArr[i], request) ? i++ : retArr.splice(i, 1); else if ("object" == typeof filter) for (i = 0; i < retArr.length; ) can.Object.subset(retArr[i], request.data, filter) ? i++ : retArr.splice(i, 1);
                        return {
                            count: retArr.length,
                            limit: request.data.limit,
                            offset: request.data.offset,
                            data: retArr.slice(offset, offset + limit)
                        };
                    },
                    findOne: function(request, response) {
                        var item = findOne(getId(request));
                        return "undefined" == typeof item ? response(404, "Requested resource not found") : void response(item);
                    },
                    update: function(request, response) {
                        var id = getId(request), item = findOne(id);
                        return "undefined" == typeof item ? response(404, "Requested resource not found") : (can.extend(item, request.data), 
                        void response({
                            id: id
                        }, {
                            location: request.url || "/" + getId(request)
                        }));
                    },
                    destroy: function(request, response) {
                        var id = getId(request), item = findOne(id);
                        if ("undefined" == typeof item) return response(404, "Requested resource not found");
                        for (var i = 0; i < items.length; i++) if (items[i].id == id) {
                            items.splice(i, 1);
                            break;
                        }
                        return {};
                    },
                    create: function(settings, response) {
                        var item = make(items.length, items);
                        can.extend(item, settings.data), item.id || (item.id = currentId++), items.push(item), 
                        response({
                            id: item.id
                        }, {
                            location: settings.url + "/" + item.id
                        });
                    }
                }), reset(), can.extend({
                    getId: getId,
                    find: function(settings) {
                        return findOne(getId(settings));
                    },
                    reset: reset
                }, methods);
            },
            rand: function randomize(arr, min, max) {
                if ("number" == typeof arr) return "number" == typeof min ? arr + Math.floor(Math.random() * (min - arr)) : Math.floor(Math.random() * arr);
                var rand = randomize;
                if (min === undefined) return rand(arr, rand(arr.length + 1));
                var res = [];
                arr = arr.slice(0), max || (max = min), max = min + Math.round(rand(max - min));
                for (var i = 0; max > i; i++) res.push(arr.splice(rand(arr.length), 1)[0]);
                return res;
            },
            xhr: function(xhr) {
                return can.extend({}, {
                    abort: can.noop,
                    getAllResponseHeaders: function() {
                        return "";
                    },
                    getResponseHeader: function() {
                        return "";
                    },
                    open: can.noop,
                    overrideMimeType: can.noop,
                    readyState: 4,
                    responseText: "",
                    responseXML: null,
                    send: can.noop,
                    setRequestHeader: can.noop,
                    status: 200,
                    statusText: "OK"
                }, xhr);
            },
            on: !0
        }), can.fixture.delay = 200, can.fixture.rootUrl = getUrl(""), can.fixture["-handleFunction"] = function(settings) {
            return "string" == typeof settings.fixture && can.fixture[settings.fixture] && (settings.fixture = can.fixture[settings.fixture]), 
            "function" == typeof settings.fixture ? (setTimeout(function() {
                settings.success && settings.success.apply(null, settings.fixture(settings, "success")), 
                settings.complete && settings.complete.apply(null, settings.fixture(settings, "complete"));
            }, can.fixture.delay), !0) : !1;
        }, can.fixture.overwrites = overwrites, can.fixture.make = can.fixture.store, can.fixture;
    }(__m2, __m13, __m44);
    window.can = __m4;
}(), function() {
    "use strict";
    var PricesCont = can.Control.extend({
        defaults: {}
    }, {
        init: function(element, options) {
            this.renderElm();
        },
        "{observables} products": function() {
            this.element.velocity("fadeIn", {
                duration: 500
            });
        },
        renderElm: function() {
            var template = can.view(can.mustache(hwTemplates["../../views/prices.html"]), this.options.observables);
            this.element.html(template);
        }
    });
    window.PricesCont = PricesCont;
}(), function() {
    "use strict";
    var OriginCont = can.Control.extend({
        defaults: {}
    }, {
        init: function(element, options) {
            this.renderElm();
        },
        renderElm: function() {
            var template = can.view(can.mustache(hwTemplates["../../views/origin.html"]), this.options.observables);
            this.element.html(template);
        }
    });
    window.OriginCont = OriginCont;
}(), can.fixture("POST http://innovation-day-lachlan.cloudapp.net/home/findall", function(data) {
    var db = [ {
        city: "Melbourne",
        date: "26 Sep 2015",
        journeyType: "Round trip",
        price: 200,
        latLong: [ -37.814107, 144.96328 ],
        cta: "http://helloworld.com.au",
        img: "http://www.minimovers.com.au/wp/wp-content/uploads/2014/02/removalists-sydney-city-minimovers.jpg"
    }, {
        city: "Brisbane",
        date: "27 Sep 2015",
        journeyType: "Round trip",
        price: 300,
        latLong: [ -27.471011, 153.023449 ],
        cta: "http://helloworld.com.au",
        img: "http://www.visionandimagination.com/Places/Wellington-Point-Brisbane/i-TPM3sp7/0/S/IMG_3301%20Brisbane_-S.jpg"
    }, {
        city: "Perth",
        date: "28 Sep 2015",
        journeyType: "Round trip",
        price: 500,
        latLong: [ -31.953513, 115.857047 ],
        cta: "http://helloworld.com.au",
        img: "http://cdn.lifestyle.com.au/cache/400x200/factsheets/thumbnails/TRAVEL-Perth-Skyline-Swan-river.jpg"
    }, {
        city: "Kuala Lumpur",
        date: "28 Sep 2015",
        journeyType: "Round trip",
        price: 900,
        latLong: [ 3.139003, 101.686855 ],
        cta: "http://helloworld.com.au",
        img: "http://www.grandseasonshotel.com/pics/places2.jpg"
    }, {
        city: "Abu Dhabi",
        date: "28 Sep 2015",
        journeyType: "One way",
        price: 1900,
        latLong: [ 24.299174, 54.697277 ],
        cta: "http://helloworld.com.au",
        img: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRNOGvJW_LSb7ruLoIB0qh0n9OvCr_71dpa46PMH1BCCtwGxhdbmQ"
    }, {
        city: "Munich",
        date: "28 Sep 2015",
        journeyType: "Round trip",
        price: 3e3,
        latLong: [ 48.135125, 11.581981 ],
        cta: "http://helloworld.com.au",
        img: "https://www.explorica.com/~/media/Images/Tour%20Pictures/destinations/bpm.ashx"
    }, {
        city: "London",
        date: "28 Sep 2015",
        journeyType: "Round trip",
        price: 4500,
        latLong: [ 51.507351, -.127758 ],
        cta: "http://helloworld.com.au",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Tower_Bridge_London_Feb_2006.jpg/400px-Tower_Bridge_London_Feb_2006.jpg"
    }, {
        city: "New York",
        date: "28 Sep 2015",
        journeyType: "Round trip",
        price: 6500,
        latLong: [ 40.712784, -74.005941 ],
        cta: "http://helloworld.com.au",
        img: "http://thumbs.dreamstime.com/x/new-york-harbor-twin-towers-1138773.jpg"
    }, {
        city: "Chicago",
        date: "28 Sep 2015",
        journeyType: "Round trip",
        price: 7e3,
        latLong: [ 41.878114, -87.629798 ],
        cta: "http://helloworld.com.au",
        img: "http://adcstatic.com/imagenes/destinos/c/renta-autos-chicago.jpg"
    }, {
        city: "San Francisco",
        date: "28 Sep 2015",
        journeyType: "Round trip",
        price: 7800,
        latLong: [ 37.774929, -122.419416 ],
        cta: "http://helloworld.com.au",
        img: "http://i0.wp.com/www.headforpoints.com/wp-content/uploads/2014/10/San-Francisco.jpg?resize=400%2C200"
    } ], rightPrices = [];
    return can.each(db, function(val) {
        val.price <= data.data.budget && rightPrices.push(val);
    }), rightPrices;
}), function() {
    "use strict";
    var SliderCont = can.Control.extend({
        init: function(element, options) {
            this.renderElm(), this.insertSlider();
        },
        insertSlider: function() {
            var self = this, slider = document.getElementById("js-slider");
            noUiSlider.create(slider, {
                start: 0,
                animate: !1,
                range: {
                    min: 0,
                    max: 8e3
                }
            }), slider.noUiSlider.on("update", function(a, b, c) {
                self.options.observables.attr("budget", Math.round(c));
            }), slider.noUiSlider.on("change", function(a, b, c) {
                self.getList();
            });
        },
        getList: function() {
            var self = this;
            can.ajax({
                data: {
                    origin: this.options.observables.attr("origin"),
                    budget: this.options.observables.attr("budget")
                },
                type: "POST",
                url: "http://innovation-day-lachlan.cloudapp.net/home/findall",
                success: function(data) {
                    self.options.observables.attr("products", data.reverse());
                }
            });
        },
        renderElm: function() {
            var template = can.view(can.mustache(hwTemplates["../../views/slider.html"]), this.options.observables);
            this.element.html(template);
        }
    });
    window.SliderCont = SliderCont;
}(), function() {
    "use strict";
    var MapCont = can.Control.extend({
        init: function(element, options) {
            this.renderElement(), google.maps.event.addDomListener(window, "load", this.enableGoogleMaps());
        },
        "{observables} products": function() {
            this.setMarkers();
        },
        enableGoogleMaps: function() {
            var mapOptions = {
                zoom: 2,
                center: new google.maps.LatLng(0, 0)
            };
            this.options.googleMarkers = [], this.options.map = new google.maps.Map(document.getElementById("js-google-maps"), mapOptions), 
            this.options.map.setCenter(new google.maps.LatLng(-23.241346, 133.989258));
        },
        setMarkers: function() {
            var self = this, image = {
                url: "img/helloworld-marker.png",
                size: new google.maps.Size(19, 23),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(9, 11)
            }, shape = {
                coords: [ 0, 0, 0, 23, 19, 23, 19, 0 ],
                type: "poly"
            };
            can.each(this.options.googleMarkers, function(val, ind) {
                val.setMap(null);
            }), this.options.googleMarkers = [], can.each(this.options.observables.products, function(val, ind) {
                var infoWindowContent = '<div><div class="gs-city">' + val.city + '</div><div class="gs-date">' + val.date + " | " + val.journeyType + '</div><div class="gs-price">$' + val.price + '</div><div class="gs-cta"><a class="btn full" href="' + val.cta + '" target="_blank">View</a></div></div>', infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent,
                    maxWidth: 250
                }), myLatLng = new google.maps.LatLng(val.latLong[0], val.latLong[1]), marker = new google.maps.Marker({
                    position: myLatLng,
                    map: self.options.map,
                    icon: image,
                    shape: shape,
                    title: val.city,
                    zIndex: ind,
                    animation: google.maps.Animation.DROP
                });
                self.options.googleMarkers.push(marker), google.maps.event.addListener(marker, "click", function() {
                    infoWindow.open(self.options.map, marker);
                });
            });
        },
        renderElement: function() {
            var template = can.view(can.mustache(hwTemplates["../../views/map.html"]), this.options.observables);
            this.element.html(template);
        }
    });
    window.MapCont = MapCont;
}(), function() {
    "use strict";
    var AppCont = can.Control.extend({
        defaults: {
            observables: new can.Map({
                origin: "sydney",
                budget: 0,
                products: []
            })
        }
    }, {
        init: function(element, options) {
            this.renderElm(), this.populateProduct();
        },
        populateProduct: function() {
            new PricesCont(this.element.find(".js-prices"), {
                observables: this.options.observables
            }), new SliderCont(this.element.find(".js-slider"), {
                observables: this.options.observables
            }), new MapCont(this.element.find(".js-map"), {
                observables: this.options.observables
            });
        },
        renderElm: function() {
            var template = can.view(can.mustache(hwTemplates["../../views/app.html"]), {});
            this.element.html(template);
        }
    });
    window.AppCont = AppCont;
}();