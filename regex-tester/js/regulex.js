var requirejs, require, define;
if (
    ((function (t) {
        function e(t, e) {
            return v.call(t, e);
        }
        function r(t, e) {
            var r,
                n,
                i,
                a,
                s,
                o,
                c,
                h,
                u,
                l,
                f,
                p = e && e.split('/'),
                d = g.map,
                x = (d && d['*']) || {};
            if (t && '.' === t.charAt(0))
                if (e) {
                    for (
                        p = p.slice(0, p.length - 1), t = t.split('/'), s = t.length - 1, g.nodeIdCompat && m.test(t[s]) && (t[s] = t[s].replace(m, '')), t = p.concat(t), u = 0;
                        u < t.length;
                        u += 1
                    )
                        if ('.' === (f = t[u])) t.splice(u, 1), (u -= 1);
                        else if ('..' === f) {
                            if (1 === u && ('..' === t[2] || '..' === t[0])) break;
                            u > 0 && (t.splice(u - 1, 2), (u -= 2));
                        }
                    t = t.join('/');
                } else 0 === t.indexOf('./') && (t = t.substring(2));
            if ((p || x) && d) {
                for (r = t.split('/'), u = r.length; u > 0; u -= 1) {
                    if (((n = r.slice(0, u).join('/')), p))
                        for (l = p.length; l > 0; l -= 1)
                            if ((i = d[p.slice(0, l).join('/')]) && (i = i[n])) {
                                (a = i), (o = u);
                                break;
                            }
                    if (a) break;
                    !c && x && x[n] && ((c = x[n]), (h = u));
                }
                !a && c && ((a = c), (o = h)), a && (r.splice(0, o, a), (t = r.join('/')));
            }
            return t;
        }
        function n(e, r) {
            return function () {
                var n = y.call(arguments, 0);
                return 'string' != typeof n[0] && 1 === n.length && n.push(null), u.apply(t, n.concat([e, r]));
            };
        }
        function i(t) {
            return function (e) {
                return r(e, t);
            };
        }
        function a(t) {
            return function (e) {
                p[t] = e;
            };
        }
        function s(r) {
            if (e(d, r)) {
                var n = d[r];
                delete d[r], (x[r] = !0), h.apply(t, n);
            }
            if (!e(p, r) && !e(x, r)) throw new Error('No ' + r);
            return p[r];
        }
        function o(t) {
            var e,
                r = t ? t.indexOf('!') : -1;
            return r > -1 && ((e = t.substring(0, r)), (t = t.substring(r + 1, t.length))), [e, t];
        }
        function c(t) {
            return function () {
                return (g && g.config && g.config[t]) || {};
            };
        }
        var h,
            u,
            l,
            f,
            p = {},
            d = {},
            g = {},
            x = {},
            v = Object.prototype.hasOwnProperty,
            y = [].slice,
            m = /\.js$/;
        (l = function (t, e) {
            var n,
                a = o(t),
                c = a[0];
            return (
                (t = a[1]),
                c && ((c = r(c, e)), (n = s(c))),
                c ? (t = n && n.normalize ? n.normalize(t, i(e)) : r(t, e)) : ((t = r(t, e)), (a = o(t)), (c = a[0]), (t = a[1]), c && (n = s(c))),
                { f: c ? c + '!' + t : t, n: t, pr: c, p: n }
            );
        }),
            (f = {
                require: function (t) {
                    return n(t);
                },
                exports: function (t) {
                    var e = p[t];
                    return void 0 !== e ? e : (p[t] = {});
                },
                module: function (t) {
                    return { id: t, uri: '', exports: p[t], config: c(t) };
                },
            }),
            (h = function (r, i, o, c) {
                var h,
                    u,
                    g,
                    v,
                    y,
                    m,
                    b = [],
                    _ = typeof o;
                if (((c = c || r), 'undefined' === _ || 'function' === _)) {
                    for (i = !i.length && o.length ? ['require', 'exports', 'module'] : i, y = 0; y < i.length; y += 1)
                        if (((v = l(i[y], c)), 'require' === (u = v.f))) b[y] = f.require(r);
                        else if ('exports' === u) (b[y] = f.exports(r)), (m = !0);
                        else if ('module' === u) h = b[y] = f.module(r);
                        else if (e(p, u) || e(d, u) || e(x, u)) b[y] = s(u);
                        else {
                            if (!v.p) throw new Error(r + ' missing ' + u);
                            v.p.load(v.n, n(c, !0), a(u), {}), (b[y] = p[u]);
                        }
                    (g = o ? o.apply(p[r], b) : void 0), r && (h && h.exports !== t && h.exports !== p[r] ? (p[r] = h.exports) : (g === t && m) || (p[r] = g));
                } else r && (p[r] = o);
            }),
            (requirejs =
                require =
                u =
                    function (e, r, n, i, a) {
                        if ('string' == typeof e) return f[e] ? f[e](r) : s(l(e, r).f);
                        if (!e.splice) {
                            if (((g = e), g.deps && u(g.deps, g.callback), !r)) return;
                            r.splice ? ((e = r), (r = n), (n = null)) : (e = t);
                        }
                        return (
                            (r = r || function () {}),
                            'function' == typeof n && ((n = i), (i = a)),
                            i
                                ? h(t, e, r, n)
                                : setTimeout(function () {
                                      h(t, e, r, n);
                                  }, 4),
                            u
                        );
                    }),
            (u.config = function (t) {
                return u(t);
            }),
            (requirejs._defined = p),
            (define = function (t, r, n) {
                r.splice || ((n = r), (r = [])), e(p, t) || e(d, t) || (d[t] = [t, r, n]);
            }),
            (define.amd = { jQuery: !0 });
    })(),
    define('libs/almond', function () {}),
    'function' != typeof define)
)
    var define = require('amdefine')(module);
if (
    (define('Kit', [], function () {
        function t(e, a) {
            return e._Set
                ? e
                : (a || (e = n(e)),
                  (e.contains = function (t, n) {
                      return !!~r(e, t, n);
                  }),
                  (e.indexOf = function (t, n) {
                      return r(e, t, n);
                  }),
                  (e.toArray = function () {
                      return i(e);
                  }),
                  (e.union = function (r) {
                      r = t(r);
                      for (var n = e.length + r.length, a = new e.constructor(n), s = 0, o = 0, c = 0; c < n; c++)
                          e[s] === r[o] ? ((a[c] = e[s++]), o++, n--) : e[s] < r[o] ? (a[c] = e[s++]) : (a[c] = r[o++]);
                      return (a.length = n), t(a.length === n ? a : i(a, n), !0);
                  }),
                  (e.inspect = e.toArray),
                  (e._Set = !0),
                  e);
        }
        function e(t, e) {
            return t < e ? E : t === e ? C : k;
        }
        function r(t, r, n) {
            var i,
                a,
                s = 0,
                o = t.length,
                c = o - 1;
            if (o < 1) return -1;
            if (((n = n || e), 1 === o)) return n(r, t[s]) === C ? s : -1;
            if (n(r, t[s]) === E || n(r, t[c]) === k) return -1;
            do {
                if (((i = s + ((c - s + 1) >> 1)), (a = n(r, t[i])) === C)) return i;
                a === E ? (c = i - 1) : (s = i + 1);
            } while (s <= c);
            return -1;
        }
        function n(t) {
            var e = t.length;
            if (e <= 1) return t;
            for (var r, n, a, s = 1, o = (e / 3) | 0; s < o; ) s = 3 * s + 1;
            for (; s > 0; ) {
                for (r = s; r < e; r++) for (n = r; n >= s && t[n] < t[n - s]; n -= s) (a = t[n]), (t[n] = t[n - s]), (t[n - s] = a);
                s = (s / 3) | 0;
            }
            var c = t[0];
            for (r = 1, n = 1; r < e; r++) t[r] !== c && (c = t[n++] = t[r]);
            return (t.length = n), t.length === n ? t : i(t, n);
        }
        function i(t, e) {
            e = void 0 === e ? t.length : e;
            for (var r = new t.constructor(e), n = e; n--; ) r[n] = t[n];
            return r;
        }
        function a(t) {
            for (var e, r = {}, n = 0, i = 0, a = t.length; n < a; n++) (e = t[n]), r.hasOwnProperty(e) || ((r[e] = 1), (t[i++] = e));
            return (t.length = i), t;
        }
        function s(t) {
            var e,
                r,
                n,
                i = t.length,
                a = (1e10 * Math.random()).toString(32) + (+new Date()).toString(32);
            for (e = r = 0; e < i; e++) null != (n = t[e]) && (n.hasOwnProperty(a) || (Object.defineProperty(n, a, { value: 1, enumerable: !1 }), (t[r++] = n)));
            for (e = r; e--; ) t[e][a] = void 0;
            return (t.length = r), t;
        }
        function o(t) {
            t = t.map(function (t) {
                return t[1] ? t : t + t;
            });
            var e, r, i, a, s, o;
            (t = n(t)), (o = t.length);
            var c,
                h,
                u = Object.create(null),
                l = Object.create(null),
                f = Object.create(null);
            for (e = 0; e < o; e++)
                for (s = t[e], h = s[1], l[s[0]] = !0, f[h] = !0, r = e; r < o; r++)
                    if ((c = t[r][0]) >= h) {
                        c === h && (u[h] = !0);
                        break;
                    }
            var g = n(t.join('').split('')),
                x = Object.keys(u),
                v = g[0],
                y = Object.create(null),
                m = Object.create(null);
            for (e = 0; e < o; e++) y[t[e]] = [];
            if (u[v])
                for (e = 0; e < o; e++)
                    if (((s = t[e]), s[0] === v)) y[s].push(v);
                    else if (s[0] > v) break;
            for (e = 0, a = g.length - 1; e < a; e++) {
                if (((c = g[e]), (h = g[e + 1]), f[c] && (c = d(c)), l[h] && (h = p(h)), c <= h))
                    for (v = c === h ? c : c + h, r = 0; r < o && ((s = t[r]), !(s[0] > h)); r++) s[0] <= c && h <= s[1] && (y[s].push(v), x.push(v));
                if (((c = g[e]), (h = g[e + 1]), u[h])) for (r = 0; r < o && ((s = t[r]), !(s[0] > h)); r++) s[0] <= h && h <= s[1] && y[s].push(h);
            }
            x = n(x);
            for (i in y) m[i[0] === i[1] ? i[0] : i] = y[i];
            return { ranges: x, map: m };
        }
        function c(t) {
            var e = String.fromCharCode(65535);
            t = o(t).ranges;
            var r = [];
            if (!t.length) return r;
            '\0' !== t[0][0] && t.unshift(e);
            var n = t.length - 1;
            return (
                (t[n][1] || t[n][0]) !== e && t.push('\0'),
                t.reduce(function (t, e) {
                    var n = d(t[1] || t[0]),
                        i = p(e[0]);
                    return n < i && r.push(n + i), n === i && r.push(n), e;
                }),
                r
            );
        }
        function h(t) {
            t = t.split('');
            var e = [],
                r = [],
                n = '^' === t[0] && t.length > 1 && t.shift();
            return (
                t.forEach(function (t) {
                    if ('-' == e[0] && e.length > 1) {
                        if (e[1] > t) throw new Error('Charset range out of order:' + e[1] + '-' + t + '!');
                        r.push(e[1] + t), e.splice(0, 2);
                    } else e.unshift(t);
                }),
                (r = r.concat(e)),
                n ? c(r) : o(r).ranges
            );
        }
        function u(t) {
            if (!t.length) return [];
            var e = [t[0]];
            return (
                t.reduce(function (t, r) {
                    var n = e.length - 1;
                    return t[t.length - 1] === p(r[0]) ? (e[n] = e[n][0] + r[r.length - 1]) : (e.push(r), r);
                }),
                e.reduce(function (t, e) {
                    return 2 === e.length && e[0] === p(e[1]) ? (t.push(e[0]), t.push(e[1])) : t.push(e), t;
                }, [])
            );
        }
        function l(t) {
            return String.fromCharCode(t);
        }
        function f(t) {
            return t.charCodeAt(0);
        }
        function p(t) {
            return String.fromCharCode(t.charCodeAt(0) - 1);
        }
        function d(t) {
            return String.fromCharCode(t.charCodeAt(0) + 1);
        }
        function g(t, e) {
            var r = /[\x00-\x1F\x7F-\x9F]/,
                n = /[\u009F-\uFFFF]/;
            return (t = t
                .split('')
                .map(function (t) {
                    return !e && S.hasOwnProperty(t)
                        ? S[t]
                        : n.test(t)
                        ? '\\u' + ('00' + f(t).toString(16).toUpperCase()).slice(-4)
                        : r.test(t)
                        ? '\\x' + ('0' + f(t).toString(16).toUpperCase()).slice(-2)
                        : t;
                })
                .join(''));
        }
        function x(t) {
            return [].concat.apply([], t);
        }
        function v(t, e) {
            return new Array(e + 1).join(t);
        }
        function y() {
            var t = _.call(arguments);
            if (w) Function.prototype.apply.apply(console.log, [console, t]);
            else {
                var e = require('util');
                t.forEach(function (t) {
                    console.log(e.inspect(t, { showHidden: !1, customInspect: !0, depth: 64, colors: !0 }));
                });
            }
        }
        function m(t) {
            for (var e, r = t.toString(), n = /^\s+function\s+([a-zA-Z]\w+)\s*\(/gm, i = []; (e = n.exec(r)); ) i.push(e[1]);
            for (var t, a = []; (t = i.pop()); ) a.push(t + ':' + t);
            return '{\n' + a.join(',\n') + '\n}';
        }
        var b = Array.prototype,
            _ = b.slice,
            w = (function () {
                return '[object Window]' === this.toString();
            })(),
            E = -1,
            C = 0,
            k = 1,
            S = { '\n': '\\n', '\t': '\\t', '\f': '\\f', '\r': '\\r', ' ': ' ', '\\': '\\\\', '\0': '\\0' };
        return {
            sortUnique: n,
            idUnique: s,
            hashUnique: a,
            Set: t,
            repeats: v,
            negate: c,
            coalesce: u,
            classify: o,
            parseCharset: h,
            chr: l,
            ord: f,
            pred: p,
            succ: d,
            toPrint: g,
            flatten2: x,
            log: y,
            isBrowser: w,
            locals: m,
        };
    }),
    'function' != typeof define)
)
    var define = require('amdefine')(module);
if (
    (define('NFA', ['./Kit'], function (t) {
        function e(e) {
            e = e.compact ? c(e) : e;
            var s,
                o = {},
                h = e.trans,
                u = {};
            for (s = 0, n = e.accepts.length; s < n; s++) o[e.accepts[s]] = !0;
            var l;
            for (s = 0, n = h.length; s < n; s++)
                (l = h[s]),
                    l.charset ? (l.ranges = 'string' == typeof l.charset ? t.parseCharset(l.charset) : l.charset) : (l.eMove = !0),
                    l.from.forEach(function (t) {
                        var e = (u[t] = u[t] || { eMoveStates: [], eMove: [], charMove: {}, trans: [], ranges: [] });
                        l.eMove ? (e.eMoveStates = e.eMoveStates.concat(l.to)) : (e.ranges = e.ranges.concat(l.ranges)), e.trans.push(l);
                    });
            return (
                Object.keys(u).forEach(function (e) {
                    var r = u[e],
                        n = r.trans,
                        i = r.charMove,
                        a = r.eMove,
                        s = r.ranges,
                        o = t.classify(s),
                        c = o.map;
                    n.forEach(function (e) {
                        e.eMove
                            ? e.to.forEach(function (t) {
                                  a.push({ to: t, action: e.action, assert: e.assert, eMove: !0 });
                              })
                            : t
                                  .flatten2(
                                      e.ranges.map(function (t) {
                                          return c[t];
                                      })
                                  )
                                  .forEach(function (t) {
                                      (i[t] = i[t] || []).push(e);
                                  });
                    }),
                        (s = t.Set(
                            o.ranges.filter(function (t) {
                                return !!t[1];
                            })
                        )),
                        (r.ranges = s),
                        Object.keys(i).forEach(function (t) {
                            var e = i[t],
                                r = [];
                            n.forEach(function (t) {
                                t.to.forEach(function (n) {
                                    (t.eMove || ~e.indexOf(t)) && r.push({ to: n, action: t.action, assert: t.assert, eMove: t.eMove });
                                });
                            }),
                                (i[t] = r);
                        }),
                        delete r.trans,
                        delete r.eMoveStates;
                }),
                { accepts: o, router: u, input: a, assertDFA: i, accept: r }
            );
        }
        function r(t) {
            return this.accepts.hasOwnProperty(t);
        }
        function i() {
            for (var e, r = this.router, n = Object.keys(r), i = 0, a = n.length; i < a; i++) {
                if (((e = r[n[i]]), e.eMove.length > 1)) throw new Error('DFA Assertion Fail!\nFrom state `' + n[i] + '` can goto to multi ε-move states!');
                for (var s = e.charMove, o = Object.keys(s), c = 0, h = o.length; c < h; c++) {
                    if (1 !== s[o[c]].length) throw (t.log(s), new Error('DFA Assertion Fail!\nFrom state `' + n[i] + '` via charset `' + o[c] + '` can goto to multi states!'));
                }
                if (o.length && e.eMove.length) throw new Error('DFA Assertion Fail!\nFrom state `' + n[i] + '` can goto extra ε-move state!');
            }
            return !0;
        }
        function a(e, r, n) {
            function i(e, r, o, c, h) {
                t: for (;;) {
                    var u,
                        l,
                        f,
                        p,
                        d = a.router[o];
                    if (!d) break;
                    var g,
                        x = d.eMove,
                        v = d.charMove;
                    r < e.length ? ((u = e[r]), (g = v.hasOwnProperty(u) ? v[u] : (l = s(d.ranges, u)) ? v[l] : x)) : (g = x);
                    for (var y, m, b, _ = c.length, w = h, E = 0, C = g.length; E < C; E++) {
                        if (((y = g[E]), (f = y.eMove ? 0 : 1), (h = w), c.splice(0, c.length - _), (_ = c.length), y.assert)) {
                            if (!1 === (m = y.assert(c, u, r, o, e))) continue;
                            'number' == typeof m && ((r += m), (h += m));
                        }
                        if ((y.action && (c = y.action(c, u, r, o, e) || c), (h = y.eMove ? h : r), n && t.log(u + ':' + o + '>' + y.to), E === C - 1)) {
                            (r += f), (o = y.to);
                            continue t;
                        }
                        if (((b = i(e, r + f, y.to, c, h)), b.acceptable)) return b;
                        p = b;
                    }
                    if (p) return p;
                    break;
                }
                return { stack: c, lastIndex: h, lastState: o, acceptable: a.accept(o) };
            }
            r = r || 0;
            var a = this;
            return i(e, r, 'start', [], r - 1);
        }
        function s(t, e) {
            var r = t.indexOf(e, o);
            return !!~r && t[r];
        }
        function o(t, e) {
            var r = e[0];
            return t > e[1] ? 1 : t < r ? -1 : 0;
        }
        function c(t) {
            t.accepts = t.accepts.split(',');
            for (var e, r, n, i, a = t.trans, s = a.length; s--; )
                (e = a[s]), (r = e[0].split('>')), (n = r[0].split(',')), (i = r[1].split(',')), (a[s] = { from: n, to: i, charset: e[1], action: e[2], assert: e[3] });
            return (t.compact = !1), t;
        }
        return e;
    }),
    'function' != typeof define)
)
    var define = require('amdefine')(module);
if (
    (define('parse', ['./NFA', './Kit'], function (t, e) {
        function r() {
            var t = Object.keys(p)
                .map(function (t) {
                    return t + '=' + JSON.stringify(p[t]);
                })
                .join(';');
            (function () {
                return this;
            })().eval(t);
        }
        function n(t) {
            (this.raw = t.raw), (this.tree = t.tree), (this.groupCount = t.groupCount);
        }
        function i(t, e) {
            d = e;
            var r,
                i,
                s,
                p = a();
            (r = p.input(t, 0, e)), (i = r.stack), (i = v.endChoice(i)), (s = r.lastState);
            var g = r.acceptable && r.lastIndex === t.length - 1;
            if (!g) {
                var x;
                switch (s) {
                    case 'charsetRangeEndWithNullChar':
                        x = {
                            type: 'CharsetRangeEndWithNullChar',
                            message: 'Charset range end with NUL char does not make sense!\nBecause [a-\\0] is not a valid range.\nAnd [\\0-\\0] should be rewritten into [\\0].',
                        };
                        break;
                    case 'repeatErrorFinal':
                        x = { type: 'NothingRepeat', message: 'Nothing to repeat!' };
                        break;
                    case 'digitFollowNullError':
                        x = { type: 'DigitFollowNullError', message: "The '\\0' represents the <NUL> char and cannot be followed by a decimal digit!" };
                        break;
                    case 'charsetRangeEndClass':
                        x = { type: 'CharsetRangeEndClass', message: 'Charset range ends with class such as "\\w\\W\\d\\D\\s\\S" is invalid!' };
                        break;
                    case 'charsetOctEscape':
                        x = {
                            type: 'DecimalEscape',
                            message: "Decimal escape appears in charset is invalid.Because it can't be explained as  backreference.And octal escape is deprecated!",
                        };
                        break;
                    default:
                        0 === s.indexOf('charset')
                            ? (x = { type: 'UnclosedCharset', message: 'Unterminated character class!' })
                            : ')' === t[r.lastIndex]
                            ? (x = { type: 'UnmatchedParen', message: 'Unmatched end parenthesis!' })
                            : ((x = { type: 'UnexpectedChar', message: 'Unexpected char!' }), r.lastIndex++);
                }
                if (x) throw ((x.lastIndex = r.lastIndex), (x.astStack = r.stack), (x.lastState = s), new f(x));
            }
            if (i._parentGroup) throw new f({ type: 'UnterminatedGroup', message: 'Unterminated group!', lastIndex: i._parentGroup.indices[0], lastState: s, astStack: i });
            if (g) {
                var y = i.groupCounter ? i.groupCounter.i : 0;
                delete i.groupCounter, h(i, t, t.length), (i = o(i));
                var m = new n({ raw: t, groupCount: y, tree: i });
                return m.traverse(l, CHARSET_NODE), m.traverse(u, ASSERT_NODE), c(i), (d = !1), m;
            }
        }
        function a() {
            return g || (g = t(E, d)), g;
        }
        function s(t, e, r) {
            Object.defineProperty(t, e, { value: r, enumerable: d, writable: !0, configurable: !0 });
        }
        function o(t) {
            return t.filter(function (t) {
                return t.type == EXACT_NODE && t.concatTemp ? (delete t.concatTemp, !!t.chars) : (t.sub ? (t.sub = o(t.sub)) : t.branches && (t.branches = t.branches.map(o)), !0);
            });
        }
        function c(t) {
            function e(t) {
                t.sub ? c(t.sub) : t.branches && t.branches.map(c);
            }
            var r = t[0];
            e(r);
            for (var n, i = 1, a = 1, s = t.length; i < s; i++) {
                if (((n = t[i]), n.type === EXACT_NODE)) {
                    if (r.type === EXACT_NODE && !r.repeat && !n.repeat) {
                        (r.indices[1] = n.indices[1]), (r.raw += n.raw), (r.chars += n.chars);
                        continue;
                    }
                } else e(n);
                (t[a++] = n), (r = n);
            }
            r && (t.length = a);
        }
        function h(t, e, r) {
            if (!t.length) return void t.push({ type: EMPTY_NODE, indices: [r, r] });
            t.reduce(function (t, r) {
                return (
                    r.indices.push(t),
                    (r.raw = e.slice(r.indices[0], t)),
                    r.type === GROUP_NODE || (r.type === ASSERT_NODE && r.sub)
                        ? h(r.sub, e, r.endParenIndex)
                        : r.type === CHOICE_NODE
                        ? (r.branches.reduce(function (t, r) {
                              h(r, e, t);
                              var n = r[0];
                              return (n ? n.indices[0] : t) - 1;
                          }, t),
                          r.branches.reverse())
                        : r.type === EXACT_NODE && (r.concatTemp || (r.chars = r.chars || r.raw)),
                    r.indices[0]
                );
            }, r),
                t.reverse();
        }
        function u(t) {
            if (t.repeat) {
                var e = t.assertionType,
                    r = "Nothing to repeat! Repeat after assertion doesn't make sense!";
                if ('AssertLookahead' === e || 'AssertNegativeLookahead' === e) {
                    var n = 'AssertLookahead' === e ? '?=' : '?!',
                        i = '(' + n + 'b)';
                    r += '\n/a' + i + '+/、/a' + i + '{1,n}/ are the same as /a' + i + '/。\n/a' + i + '*/、/a' + i + '{0,n}/、/a' + i + '?/ are the same as /a/。';
                }
                throw new f({ type: 'NothingRepeat', lastIndex: t.indices[1] - 1, message: r });
            }
        }
        function l(t) {
            t.ranges = e.sortUnique(
                t.ranges.map(function (t) {
                    if (t[0] > t[1]) throw new f({ type: 'OutOfOrder', lastIndex: t.lastIndex, message: 'Range [' + t.join('-') + '] out of order in character class!' });
                    return t.join('');
                })
            );
        }
        function f(t) {
            (this.name = 'RegexSyntaxError'),
                (this.type = t.type),
                (this.lastIndex = t.lastIndex),
                (this.lastState = t.lastState),
                (this.astStack = t.astStack),
                (this.message = t.message),
                Object.defineProperty(this, 'stack', { value: new Error(t.message).stack, enumerable: !1 });
        }
        var p = {
            EXACT_NODE: 'exact',
            CHARSET_NODE: 'charset',
            CHOICE_NODE: 'choice',
            GROUP_NODE: 'group',
            ASSERT_NODE: 'assert',
            DOT_NODE: 'dot',
            BACKREF_NODE: 'backref',
            EMPTY_NODE: 'empty',
            AssertLookahead: 'AssertLookahead',
            AssertNegativeLookahead: 'AssertNegativeLookahead',
            AssertNonWordBoundary: 'AssertNonWordBoundary',
            AssertWordBoundary: 'AssertWordBoundary',
            AssertEnd: 'AssertEnd',
            AssertBegin: 'AssertBegin',
        };
        r(),
            (n.prototype.traverse = function (t, e) {
                function r(t, n) {
                    t.forEach(function (t) {
                        (e && t.type !== e) || n(t),
                            t.sub
                                ? r(t.sub, n)
                                : t.branches &&
                                  t.branches.forEach(function (t) {
                                      r(t, n);
                                  });
                    });
                }
                r(this.tree, t);
            });
        var d;
        (i.Constants = p), (i.exportConstants = r), (i.RegexSyntaxError = f), (i.getNFAParser = a);
        var g;
        f.prototype.toString = function () {
            return this.name + ' ' + this.type + ':' + this.message;
        };
        var x = { n: '\n', r: '\r', t: '\t', v: '\v', f: '\f' },
            v = (function () {
                function t(t, e, r) {
                    var n = t[0];
                    (!n || n.type != EXACT_NODE || n.repeat || (n.chars && !n.concatTemp)) && t.unshift({ type: EXACT_NODE, indices: [r] }), n && n.concatTemp && (n.chars += e);
                }
                function e(t, e, r) {
                    t.unshift({ type: DOT_NODE, indices: [r] });
                }
                function r(t, e, r) {
                    t.unshift({ type: EXACT_NODE, chars: '\0', indices: [r - 1] });
                }
                function n(t, e, r) {
                    t.unshift({ type: ASSERT_NODE, indices: [r], assertionType: AssertBegin });
                }
                function i(t, e, r, n, i) {
                    t.unshift({ type: ASSERT_NODE, indices: [r], assertionType: AssertEnd });
                }
                function a(t, e, r) {
                    t.unshift({ type: ASSERT_NODE, indices: [r - 1], assertionType: 'b' == e ? AssertWordBoundary : AssertNonWordBoundary });
                }
                function o(t, e, r) {
                    t[0].type !== EXACT_NODE && t.unshift({ type: EXACT_NODE, indices: [r] });
                }
                function c(t, e, r) {
                    s(t[0], '_commaIndex', r);
                }
                function h(t, e, r, n, i) {
                    var a,
                        s = t[0],
                        o = i.lastIndexOf('{', r),
                        c = parseInt(i.slice(o + 1, s._commaIndex || r), 10);
                    if (s._commaIndex) {
                        if ((a = s._commaIndex + 1 == r ? 1 / 0 : parseInt(i.slice(s._commaIndex + 1, r), 10)) < c)
                            throw new f({ type: 'OutOfOrder', lastState: n, lastIndex: r, astStack: t, message: 'Numbers out of order in {} quantifier!' });
                        delete s._commaIndex;
                    } else a = c;
                    s.indices[0] >= o && t.shift(), d(t, c, a, o, i);
                }
                function u(t, e, r, n, i) {
                    d(t, 0, 1 / 0, r, i);
                }
                function l(t, e, r, n, i) {
                    d(t, 0, 1, r, i);
                }
                function p(t, e, r, n, i) {
                    d(t, 1, 1 / 0, r, i);
                }
                function d(t, e, r, n, i) {
                    var a = t[0],
                        o = { min: e, max: r, nonGreedy: !1 },
                        c = n - 1;
                    if ((a.chars && 1 === a.chars.length && (c = a.indices[0]), a.type === EXACT_NODE)) {
                        var h = { type: EXACT_NODE, repeat: o, chars: a.chars ? a.chars : i[c], indices: [c] };
                        a.indices[0] === c && t.shift(), t.unshift(h);
                    } else a.repeat = o;
                    s(o, 'beginIndex', n - t[0].indices[0]);
                }
                function g(t) {
                    t[0].repeat.nonGreedy = !0;
                }
                function v(t, e, r) {
                    t.unshift({ concatTemp: !0, type: EXACT_NODE, chars: '', indices: [r] });
                }
                function y(t, e, r) {
                    x.hasOwnProperty(e) && (e = x[e]), t.unshift({ type: EXACT_NODE, chars: e, indices: [r - 1] });
                }
                function m(t, e, r) {
                    t.unshift({ type: CHARSET_NODE, indices: [r - 1], chars: '', ranges: [], classes: [e], exclude: !1 });
                }
                function b(t, e, r, n, i) {
                    (e = String.fromCharCode(parseInt(i[r - 1] + e, 16))), t.shift(), t.unshift({ type: EXACT_NODE, chars: e, indices: [r - 3] });
                }
                function _(t, e, r, n, i) {
                    (e = String.fromCharCode(parseInt(i.slice(r - 3, r + 1), 16))), t.shift(), t.unshift({ type: EXACT_NODE, chars: e, indices: [r - 5] });
                }
                function w(t, e, r) {
                    var n = (t.groupCounter = t.groupCounter || { i: 0 });
                    n.i++;
                    var i = { type: GROUP_NODE, num: n.i, sub: [], indices: [r], _parentStack: t };
                    return (t = i.sub), s(t, '_parentGroup', i), (t.groupCounter = n), t;
                }
                function E(t) {
                    var e = t._parentGroup;
                    (e.nonCapture = !0), (e.num = void 0), t.groupCounter.i--;
                }
                function C(t, e, r) {
                    var n = t._parentGroup;
                    (n.type = ASSERT_NODE), (n.assertionType = '=' == e ? AssertLookahead : AssertNegativeLookahead), (n.num = void 0), t.groupCounter.i--;
                }
                function k(t, e, r, n, i) {
                    t = A(t);
                    var a = t._parentGroup;
                    if (!a) throw new f({ type: 'UnexpectedChar', lastIndex: r, lastState: n, astStack: t, message: 'Unexpected end parenthesis!' });
                    return delete t._parentGroup, delete t.groupCounter, (t = a._parentStack), delete a._parentStack, t.unshift(a), (a.endParenIndex = r), t;
                }
                function S(t, e, r) {
                    var n,
                        i = [];
                    if (t._parentChoice)
                        (n = t._parentChoice),
                            n.branches.unshift(i),
                            s(i, '_parentChoice', n),
                            s(i, '_parentGroup', n),
                            (i.groupCounter = t.groupCounter),
                            delete t._parentChoice,
                            delete t.groupCounter;
                    else {
                        var a = t[t.length - 1];
                        (n = { type: CHOICE_NODE, indices: [a ? a.indices[0] : r - 1], branches: [] }),
                            s(n, '_parentStack', t),
                            n.branches.unshift(t.slice()),
                            (t.length = 0),
                            t.unshift(n),
                            (i.groupCounter = t.groupCounter),
                            s(i, '_parentChoice', n),
                            s(i, '_parentGroup', n),
                            n.branches.unshift(i);
                    }
                    return i;
                }
                function A(t) {
                    if (t._parentChoice) {
                        var e = t._parentChoice;
                        delete t._parentChoice, delete t._parentGroup, delete t.groupCounter;
                        var r = e._parentStack;
                        return delete e._parentStack, r;
                    }
                    return t;
                }
                function B(t, e, r) {
                    t.unshift({ type: CHARSET_NODE, indices: [r], classes: [], ranges: [], chars: '' });
                }
                function N(t) {
                    t[0].exclude = !0;
                }
                function O(t, e, r) {
                    t[0].chars += e;
                }
                function T(t, e, r) {
                    x.hasOwnProperty(e) && (e = x[e]), (t[0].chars += e);
                }
                function R(t, e, r) {
                    t[0].chars += '\0';
                }
                function I(t, e) {
                    t[0].classes.push(e);
                }
                function M(t, e, r, n, i) {
                    var a = t[0];
                    (e = String.fromCharCode(parseInt(a.chars.slice(-1) + e, 16))), (a.chars = a.chars.slice(0, -2)), (a.chars += e);
                }
                function F(t, e, r, n, i) {
                    var a = t[0];
                    (e = String.fromCharCode(parseInt(a.chars.slice(-3) + e, 16))), (a.chars = a.chars.slice(0, -4)), (a.chars += e);
                }
                function D(t, e, r, n, i) {
                    var a = t[0],
                        s = a.chars.slice(-2);
                    (s = [s[0], e]), (s.lastIndex = r), a.ranges.push(s), (a.chars = a.chars.slice(0, -2));
                }
                function P(t, e) {
                    x.hasOwnProperty(e) && (e = x[e]), D.apply(this, arguments);
                }
                function L(t, e, r) {
                    var n = t[0],
                        i = n.chars.slice(-3) + e;
                    n.chars = n.chars.slice(0, -3);
                    var a = n.ranges.pop();
                    (e = String.fromCharCode(parseInt(i, 16))), (a = [a[0], e]), (a.lastIndex = r), n.ranges.push(a);
                }
                function z(t, e, r) {
                    var n = t[0],
                        i = n.chars.slice(-1) + e;
                    n.chars = n.chars.slice(0, -1);
                    var a = n.ranges.pop();
                    (e = String.fromCharCode(parseInt(i, 16))), (a = [a[0], e]), (a.lastIndex = r), n.ranges.push(a);
                }
                function j(t, e, r, n) {
                    function i(t, e) {
                        return !!e._parentGroup && (e._parentGroup.num == t ? t : i(t, e._parentGroup._parentStack));
                    }
                    var a = t[0],
                        s = parseInt(e, 10),
                        o = 'escape' === n,
                        c = t.groupCounter,
                        h = (c && c.i) || 0;
                    if ((o ? ((a = { type: BACKREF_NODE, indices: [r - 1] }), t.unshift(a)) : (s = parseInt(a.num + '' + s, 10)), s > h))
                        throw new f({
                            type: 'InvalidBackReference',
                            lastIndex: r,
                            astStack: t,
                            lastState: n,
                            message: 'Back reference number(' + s + ') greater than current groups count(' + h + ').',
                        });
                    if (i(s, t))
                        throw new f({ type: 'InvalidBackReference', lastIndex: r, astStack: t, lastState: n, message: 'Recursive back reference in group (' + s + ') itself.' });
                    a.num = s;
                }
                return {
                    escapeStart: v,
                    exact: t,
                    dot: e,
                    nullChar: r,
                    assertBegin: n,
                    assertEnd: i,
                    assertWordBoundary: a,
                    repeatnStart: o,
                    repeatnComma: c,
                    repeatNonGreedy: g,
                    repeatnEnd: h,
                    repeat1: p,
                    repeat01: l,
                    repeat0: u,
                    charClassEscape: m,
                    normalEscape: y,
                    unicodeEscape: _,
                    hexEscape: b,
                    charClassEscape: m,
                    groupStart: w,
                    groupNonCapture: E,
                    backref: j,
                    groupToAssertion: C,
                    groupEnd: k,
                    choice: S,
                    endChoice: A,
                    charsetStart: B,
                    charsetExclude: N,
                    charsetContent: O,
                    charsetNullChar: R,
                    charsetClassEscape: I,
                    charsetHexEscape: M,
                    charsetUnicodeEscape: F,
                    charsetRangeEnd: D,
                    charsetNormalEscape: T,
                    charsetRangeEndNormalEscape: P,
                    charsetRangeEndUnicodeEscape: L,
                    charsetRangeEndHexEscape: z,
                };
            })(),
            y = '0-9a-fA-F',
            m = 'repeatnStart,repeatn_1,repeatn_2,repeatnErrorStart,repeatnError_1,repeatnError_2',
            b = 'hexEscape1,hexEscape2',
            _ = 'unicodeEscape1,unicodeEscape2,unicodeEscape3,unicodeEscape4',
            w = 'charsetUnicodeEscape1,charsetUnicodeEscape2,charsetUnicodeEscape3,charsetUnicodeEscape4,charsetHexEscape1,charsetHexEscape2',
            E = {
                compact: !0,
                accepts: 'start,begin,end,repeat0,repeat1,exact,repeatn,repeat01,repeatNonGreedy,choice,' + m + ',nullChar,digitBackref,' + _ + ',' + b,
                trans: [
                    ['start,begin,end,exact,repeatNonGreedy,repeat0,repeat1,repeat01,groupStart,groupQualifiedStart,choice,repeatn>exact', '^+*?^$.|(){[\\', v.exact],
                    ['hexEscape1,hexEscape2,unicodeEscape1,unicodeEscape2,unicodeEscape3,unicodeEscape4>exact', '^+*?^$.|(){[\\0-9a-fA-F', v.exact],
                    ['nullChar>exact', '^+*?^$.|(){[\\0-9', v.exact],
                    [
                        m +
                            ',nullChar,digitBackref,' +
                            _ +
                            ',' +
                            b +
                            ',start,begin,end,exact,repeatNonGreedy,repeat0,repeat1,repeat01,groupStart,groupQualifiedStart,choice,repeatn>exact',
                        '.',
                        v.dot,
                    ],
                    [
                        'start,groupStart,groupQualifiedStart,end,begin,exact,repeat0,repeat1,repeat01,repeatn,repeatNonGreedy,choice,' +
                            m +
                            ',nullChar,digitBackref,' +
                            _ +
                            ',' +
                            b +
                            '>begin',
                        '^',
                        v.assertBegin,
                    ],
                    [m + ',nullChar,digitBackref,' + _ + ',' + b + ',exact>repeatnStart', '{', v.repeatnStart],
                    ['start,begin,end,groupQualifiedStart,groupStart,repeat0,repeat1,repeatn,repeat01,repeatNonGreedy,choice>repeatnErrorStart', '{', v.exact],
                    ['repeatnStart>repeatn_1', '0-9', v.exact],
                    ['repeatn_1>repeatn_1', '0-9', v.exact],
                    ['repeatn_1>repeatn_2', ',', v.repeatnComma],
                    ['repeatn_2>repeatn_2', '0-9', v.exact],
                    ['repeatn_1,repeatn_2>repeatn', '}', v.repeatnEnd],
                    ['repeatnStart,repeatnErrorStart>exact', '}', v.exact],
                    ['repeatnStart,repeatnErrorStart>exact', '^+*?^$.|(){[\\0-9}', v.exact],
                    ['repeatnErrorStart>repeatnError_1', '0-9', v.exact],
                    ['repeatnError_1>repeatnError_1', '0-9', v.exact],
                    ['repeatnError_1>repeatnError_2', ',', v.exact],
                    ['repeatnError_2>repeatnError_2', '0-9', v.exact],
                    ['repeatnError_2,repeatnError_1>repeatErrorFinal', '}'],
                    ['repeatn_1,repeatnError_1>exact', '^+*?^$.|(){[\\0-9,}', v.exact],
                    ['repeatn_2,repeatnError_2>exact', '^+*?^$.|(){[\\0-9}', v.exact],
                    ['exact,' + m + ',nullChar,digitBackref,' + _ + ',' + b + '>repeat0', '*', v.repeat0],
                    ['exact,' + m + ',nullChar,digitBackref,' + _ + ',' + b + '>repeat1', '+', v.repeat1],
                    ['exact,' + m + ',nullChar,digitBackref,' + _ + ',' + b + '>repeat01', '?', v.repeat01],
                    ['choice>repeatErrorFinal', '*+?'],
                    ['repeat0,repeat1,repeat01,repeatn>repeatNonGreedy', '?', v.repeatNonGreedy],
                    ['repeat0,repeat1,repeat01,repeatn>repeatErrorFinal', '+*'],
                    [
                        'start,begin,end,groupStart,groupQualifiedStart,exact,repeatNonGreedy,repeat0,repeat1,repeat01,repeatn,choice,' +
                            m +
                            ',nullChar,digitBackref,' +
                            _ +
                            ',' +
                            b +
                            '>escape',
                        '\\',
                        v.escapeStart,
                    ],
                    ['escape>nullChar', '0', v.nullChar],
                    ['nullChar>digitFollowNullError', '0-9'],
                    ['escape>exact', '^dDwWsSux0-9bB1-9', v.normalEscape],
                    ['escape>exact', 'bB', v.assertWordBoundary],
                    ['escape>exact', 'dDwWsS', v.charClassEscape],
                    ['escape>unicodeEscape1', 'u', v.exact],
                    ['unicodeEscape1>unicodeEscape2', y, v.exact],
                    ['unicodeEscape2>unicodeEscape3', y, v.exact],
                    ['unicodeEscape3>unicodeEscape4', y, v.exact],
                    ['unicodeEscape4>exact', y, v.unicodeEscape],
                    ['escape>hexEscape1', 'x', v.exact],
                    ['hexEscape1>hexEscape2', y, v.exact],
                    ['hexEscape2>exact', y, v.hexEscape],
                    ['escape>digitBackref', '1-9', v.backref],
                    ['digitBackref>digitBackref', '0-9', v.backref],
                    ['digitBackref>exact', '^+*?^$.|(){[\\0-9', v.exact],
                    [
                        'exact,begin,end,repeat0,repeat1,repeat01,repeatn,repeatNonGreedy,start,groupStart,groupQualifiedStart,choice,' +
                            m +
                            ',nullChar,digitBackref,' +
                            _ +
                            ',' +
                            b +
                            '>groupStart',
                        '(',
                        v.groupStart,
                    ],
                    ['groupStart>groupQualify', '?'],
                    ['groupQualify>groupQualifiedStart', ':', v.groupNonCapture],
                    ['groupQualify>groupQualifiedStart', '=', v.groupToAssertion],
                    ['groupQualify>groupQualifiedStart', '!', v.groupToAssertion],
                    [
                        m +
                            ',nullChar,digitBackref,' +
                            _ +
                            ',' +
                            b +
                            ',groupStart,groupQualifiedStart,begin,end,exact,repeat1,repeat0,repeat01,repeatn,repeatNonGreedy,choice>exact',
                        ')',
                        v.groupEnd,
                    ],
                    [
                        'start,begin,end,groupStart,groupQualifiedStart,exact,repeat0,repeat1,repeat01,repeatn,repeatNonGreedy,choice,' +
                            m +
                            ',nullChar,digitBackref,' +
                            _ +
                            ',' +
                            b +
                            '>choice',
                        '|',
                        v.choice,
                    ],
                    [
                        'start,groupStart,groupQualifiedStart,begin,exact,repeat0,repeat1,repeat01,repeatn,repeatNonGreedy,choice,' +
                            m +
                            ',nullChar,digitBackref,' +
                            _ +
                            ',' +
                            b +
                            '>end',
                        '$',
                        v.assertEnd,
                    ],
                    [
                        'exact,begin,end,repeat0,repeat1,repeat01,repeatn,repeatNonGreedy,groupQualifiedStart,groupStart,start,choice,' +
                            m +
                            ',nullChar,digitBackref,' +
                            _ +
                            ',' +
                            b +
                            '>charsetStart',
                        '[',
                        v.charsetStart,
                    ],
                    ['charsetStart>charsetExclude', '^', v.charsetExclude],
                    ['charsetStart>charsetContent', '^\\]^', v.charsetContent],
                    ['charsetExclude>charsetContent', '^\\]', v.charsetContent],
                    ['charsetContent,charsetClass>charsetContent', '^\\]-', v.charsetContent],
                    ['charsetClass>charsetContent', '-', v.charsetContent],
                    [w + ',charsetStart,charsetContent,charsetNullChar,charsetClass,charsetExclude,charsetRangeEnd>charsetEscape', '\\'],
                    ['charsetEscape>charsetContent', '^dDwWsSux0-9', v.charsetNormalEscape],
                    ['charsetEscape>charsetNullChar', '0', v.charsetNullChar],
                    ['charsetEscape>charsetOctEscape', '1-9'],
                    ['charsetRangeEndEscape>charsetOctEscape', '1-9'],
                    ['charsetNullChar>digitFollowNullError', '0-9'],
                    ['charsetNullChar>charsetContent', '^0-9\\]-', v.charsetContent],
                    ['charsetEscape>charsetClass', 'dDwWsS', v.charsetClassEscape],
                    ['charsetEscape>charsetUnicodeEscape1', 'u', v.charsetContent],
                    ['charsetUnicodeEscape1>charsetUnicodeEscape2', y, v.charsetContent],
                    ['charsetUnicodeEscape2>charsetUnicodeEscape3', y, v.charsetContent],
                    ['charsetUnicodeEscape3>charsetUnicodeEscape4', y, v.charsetContent],
                    ['charsetUnicodeEscape4>charsetContent', y, v.charsetUnicodeEscape],
                    ['charsetEscape>charsetHexEscape1', 'x', v.charsetContent],
                    ['charsetHexEscape1>charsetHexEscape2', y, v.charsetContent],
                    ['charsetHexEscape2>charsetContent', y, v.charsetHexEscape],
                    [w + '>charsetContent', '^\\]0-9a-fA-F-', v.charsetContent],
                    [w + ',charsetNullChar,charsetContent>charsetRangeStart', '-', v.charsetContent],
                    ['charsetRangeStart>charsetRangeEnd', '^\\]', v.charsetRangeEnd],
                    ['charsetRangeEnd>charsetContent', '^\\]', v.charsetContent],
                    ['charsetRangeStart>charsetRangeEndEscape', '\\'],
                    ['charsetRangeEndEscape>charsetRangeEnd', '^dDwWsSux0-9bB1-9', v.charsetRangeEndNormalEscape],
                    ['charsetRangeEndEscape>charsetRangeEndWithNullChar', '0'],
                    ['charsetRangeEndEscape>charsetRangeEndUnicodeEscape1', 'u', v.charsetRangeEnd],
                    ['charsetRangeEndUnicodeEscape1>charsetRangeEndUnicodeEscape2', y, v.charsetContent],
                    ['charsetRangeEndUnicodeEscape2>charsetRangeEndUnicodeEscape3', y, v.charsetContent],
                    ['charsetRangeEndUnicodeEscape3>charsetRangeEndUnicodeEscape4', y, v.charsetContent],
                    ['charsetRangeEndUnicodeEscape4>charsetRangeEnd', y, v.charsetRangeEndUnicodeEscape],
                    ['charsetRangeEndEscape>charsetRangeEndHexEscape1', 'x', v.charsetRangeEnd],
                    ['charsetRangeEndHexEscape1>charsetRangeEndHexEscape2', y, v.charsetContent],
                    ['charsetRangeEndHexEscape2>charsetRangeEnd', y, v.charsetRangeEndHexEscape],
                    ['charsetRangeEndEscape>charsetRangeEndClass', 'dDwWsS'],
                    ['charsetRangeEndUnicodeEscape1,charsetRangeEndHexEscape1>charsetContent', '^\\]0-9a-fA-F', v.charsetContent],
                    [
                        'charsetRangeEndUnicodeEscape2,charsetRangeEndUnicodeEscape3,charsetRangeEndUnicodeEscape4,charsetRangeEndHexEscape2>charsetRangeStart',
                        '-',
                        v.charsetContent,
                    ],
                    [
                        w +
                            ',charsetRangeEndUnicodeEscape1,charsetRangeEndHexEscape1,charsetRangeEndUnicodeEscape2,charsetRangeEndUnicodeEscape3,charsetRangeEndUnicodeEscape4,charsetRangeEndHexEscape2,charsetNullChar,charsetRangeStart,charsetContent,charsetClass,charsetExclude,charsetRangeEnd>exact',
                        ']',
                    ],
                ],
            };
        return i;
    }),
    'function' != typeof define)
)
    var define = require('amdefine')(module);
if (
    (define('RegExp', ['./parse', './Kit', './NFA'], function (t, e, r) {
        function n(e, r) {
            if (!(this instanceof n)) return new n(e, r);
            e += '';
            var o = {};
            'string' == typeof r
                ? ((r = r.toLowerCase()),
                  ~r.indexOf('i') && (o.ignoreCase = !0),
                  ~r.indexOf('m') && (o.multiline = !0),
                  ~r.indexOf('g') && (o.global = !0),
                  ~r.indexOf('d') && (o.debug = !0))
                : (o = r);
            var c = (this.ast = t(e));
            (this.source = e),
                (this.multiline = !!o.multiline),
                (this.global = !!o.global),
                (this.ignoreCase = !!o.ignoreCase),
                (this.debug = !!o.debug),
                (this.flags = ''),
                this.multiline && (this.flags += 'm'),
                this.ignoreCase && (this.flags += 'i'),
                this.global && (this.flags += 'g'),
                p(this, ['source', 'options', 'multiline', 'global', 'ignoreCase', 'flags', 'debug']);
            var h = this.ignoreCase;
            c.traverse(function (t) {
                s(t, h);
            }, CHARSET_NODE),
                c.traverse(function (t) {
                    i(t, h);
                }, EXACT_NODE),
                this.multiline && c.traverse(a, ASSERT_NODE);
        }
        function i(t, e) {
            var r;
            (r = t.chars.split('')),
                (r = e
                    ? r.map(function (t) {
                          return /[a-z]/.test(t) ? [t, t.toUpperCase()] : /[A-Z]/.test(t) ? [t, t.toLowerCase()] : [t];
                      })
                    : r.map(function (t) {
                          return [t];
                      })),
                (t.explained = r);
        }
        function a(t) {
            var e = t.assertionType;
            (e !== AssertBegin && e !== AssertEnd) || (t.multiline = !0);
        }
        function s(t, r) {
            var n = t.chars.split('');
            (n = n.concat(
                e.flatten2(
                    t.classes.map(function (t) {
                        return g[t];
                    })
                )
            )),
                (n = n.concat(t.ranges)),
                r && (n = o(n)),
                (n = e.classify(n).ranges),
                t.exclude && (n = e.negate(n)),
                (n = e.coalesce(n)),
                (t.explained = n);
        }
        function o(t) {
            return e.flatten2(
                t.map(function (t) {
                    var r = e.classify([t, 'az', 'AZ']).map[t];
                    return e.flatten2(
                        r.map(function (t) {
                            return /[a-z]/.test(t) ? [t, t.toUpperCase()] : /[A-Z]/.test(t) ? [t, t.toLowerCase()] : [t];
                        })
                    );
                })
            );
        }
        function c(t, e) {
            var r,
                n = [];
            return (
                (e = e || ['start']),
                (r = t.reduce(function (t, e) {
                    var r = h(e, t);
                    return (n = n.concat(r.trans)), r.accepts;
                }, e)),
                { accepts: r, trans: n }
            );
        }
        function h(t, e) {
            return t.repeat ? f(t, e) : m[t.type](t, e);
        }
        function u(t, e, r) {
            for (var n, i, a, s = 0, o = t.length; s < o; s++)
                if (((a = t[s]), a.num === e))
                    if (a.type === y) i = a.index;
                    else if (a.type === v) {
                        n = a.index;
                        break;
                    }
            if (void 0 !== n && void 0 !== i) return r.slice(n, i);
        }
        function l() {
            return 'q' + x++;
        }
        function f(t, e) {
            var r,
                n,
                i = m[t.type],
                a = [],
                s = t.repeat,
                o = s.min,
                c = s.max;
            for (n = o; n--; ) (r = i(t, e)), (a = a.concat(r.trans)), (e = r.accepts);
            var h = [],
                u = [].concat(e);
            if (isFinite(c)) for (; c > o; c--) (r = i(t, e)), (h = h.concat(r.trans)), (e = r.accepts), (u = u.concat(r.accepts));
            else {
                var f = e.slice();
                (r = i(t, e)), (h = h.concat(r.trans)), (u = u.concat(r.accepts)), h.push({ from: r.accepts, to: f, charset: !1 });
            }
            var p = [l()];
            return (
                s.nonGreedy ? (a.push({ from: u, to: p, charset: !1 }), (a = a.concat(h))) : ((a = a.concat(h)), a.push({ from: u, to: p, charset: !1 })), { accepts: p, trans: a }
            );
        }
        function p(t, e) {
            e.forEach(function (e) {
                Object.defineProperty(t, e, { writable: !1, enumerable: !0 });
            });
        }
        t.exportConstants(),
            (n.DEBUG = n.D = 1),
            (n.MULTILINE = n.M = 2),
            (n.GLOBAL = n.G = 4),
            (n.IGNORECASE = n.I = 8),
            (n.prototype = {
                toString: function () {
                    return '/' + this.source + '/' + this.flags;
                },
                test: function (t) {
                    return null !== this.exec(t);
                },
                exec: function (t) {
                    for (var e, r = this.getNFA(), n = this.global ? this.lastIndex || 0 : 0, i = t.length; n < i && ((e = r.input(t, n)), !e.acceptable); n++);
                    if (!e || !e.acceptable) return (this.lastIndex = 0), null;
                    var a = new Array(this.ast.groupCount + 1);
                    a[0] = t.slice(n, e.lastIndex + 1);
                    for (var s = e.stack, o = 1, c = a.length; o < c; o++) a[o] = u(s, o, t);
                    return (this.lastIndex = e.lastIndex + 1), (a.index = n), (a.input = t), a;
                },
                getNFA: function () {
                    if (this._nfa) return this._nfa;
                    var t,
                        e = this.ast;
                    return (x = 1), (t = c(e.tree)), (t = r(t, this.debug)), (this._nfa = t), t;
                },
            });
        var d = e.parseCharset('^\n\r\u2028\u2029'),
            g = { d: ['09'], w: ['AZ', 'az', '09', '_'], s: ' \f\n\r\t\v ᠎           \u2028\u2029  　'.split('') };
        ['d', 'w', 's'].forEach(function (t) {
            g[t.toUpperCase()] = e.negate(g[t]);
        });
        var x = 0,
            v = 'GroupCaptureStart',
            y = 'GroupCaptureEnd',
            m = (function () {
                function t(t, e) {
                    var r,
                        n = [];
                    return (
                        t.explained.forEach(function (t) {
                            n.push({ from: e, to: (r = [l()]), charset: t }), (e = r);
                        }),
                        { accepts: r, trans: n }
                    );
                }
                function e(t, e) {
                    var r = [l()];
                    return { accepts: r, trans: [{ from: e, to: r, charset: t.explained }] };
                }
                function n(t, e) {
                    var r = [l()];
                    return { accepts: r, trans: [{ from: e, to: r, charset: d }] };
                }
                function i(t, e) {
                    var r = [l()];
                    return { accepts: r, trans: [{ from: e, to: r, charset: !1 }] };
                }
                function a(t, e) {
                    var r = [l()],
                        n = [
                            {
                                from: e,
                                to: r,
                                charset: !1,
                                action:
                                    !t.nonCapture &&
                                    function (e, r, n) {
                                        e.unshift({ type: v, num: t.num, index: n });
                                    },
                            },
                        ];
                    e = r;
                    var i = c(t.sub, e);
                    n = n.concat(i.trans);
                    var a = [l()];
                    return (
                        n.push({
                            from: i.accepts,
                            to: a,
                            charset: !1,
                            action:
                                !t.nonCapture &&
                                function (e, r, n) {
                                    e.unshift({ type: y, num: t.num, index: n });
                                },
                        }),
                        { accepts: a, trans: n }
                    );
                }
                function s(t, e) {
                    var r = [l()],
                        n = t.num;
                    return {
                        accepts: r,
                        trans: [
                            {
                                from: e,
                                to: r,
                                charset: !1,
                                assert: function (t, e, r, i, a) {
                                    var s = u(t, n, a);
                                    return void 0 === s && (s = ''), a.slice(r, r + s.length) === s && s.length;
                                },
                            },
                        ],
                    };
                }
                function o(t, e) {
                    var r = [],
                        n = [];
                    return (
                        t.branches.forEach(function (t) {
                            var i = c(t, e);
                            (r = r.concat(i.trans)), (n = n.concat(i.accepts));
                        }),
                        { trans: r, accepts: n }
                    );
                }
                function h(t, e) {
                    function n(t) {
                        var e = r(c(t.sub, ['start']));
                        return function (t, r, n, i, a) {
                            return e.input(a, n, null, t).acceptable;
                        };
                    }
                    function i(t, e) {
                        return !!(a(t - 1, e) ^ a(t, e));
                    }
                    function a(t, e) {
                        return -1 !== t && t !== e.length && /\w/.test(e[t]);
                    }
                    function s(t, e, r, n, i) {
                        return 0 === r || '\n' === i[r - 1];
                    }
                    function o(t, e, r, n, i) {
                        return 0 === r;
                    }
                    function h(t, e, r, n, i) {
                        return r === i.length || '\n' === e;
                    }
                    function u(t, e, r, n, i) {
                        return r === i.length;
                    }
                    var f;
                    switch (t.assertionType) {
                        case AssertBegin:
                            f = t.multiline ? s : o;
                            break;
                        case AssertEnd:
                            f = t.multiline ? h : u;
                            break;
                        case AssertWordBoundary:
                            f = function (t, e, r, n, a) {
                                return i(r, a);
                            };
                            break;
                        case AssertNonWordBoundary:
                            f = function (t, e, r, n, a) {
                                return !i(r, a);
                            };
                            break;
                        case AssertLookahead:
                            f = n(t);
                            break;
                        case AssertNegativeLookahead:
                            f = (function (t) {
                                var e = n(t);
                                return function () {
                                    return !e.apply(this, arguments);
                                };
                            })(t);
                    }
                    return (function (t, e, r) {
                        var n = [l()];
                        return { accepts: n, trans: [{ from: e, to: n, charset: !1, assert: r }] };
                    })(t, e, f);
                }
                return { assert: h, choice: o, backref: s, group: a, empty: i, charset: e, dot: n, exact: t };
            })();
        return n;
    }),
    'function' != typeof define)
)
    var define = require('amdefine')(module);
if (
    (define('visualize', ['./Kit', './parse'], function (t, e) {
        function r(t, e) {
            if (((e = e || 'normal'), S[t] && S[t][e])) return S[t][e];
            y.attr({ 'font-size': t, 'font-weight': e });
            var r = y.getBBox();
            return (S[t] = S[t] || {}), (S[t][e] = { width: r.width / ((y.attr('text').length - 1) / 2), height: r.height / 2 });
        }
        function n(t) {
            y = t.text(-1e3, -1e3, 'XgfTlM|.q\nXgfTlM|.q').attr({ 'font-family': E, 'font-size': m });
        }
        function i(t, e, i) {
            i.clear(), i.setSize(0, 0);
            var o = i.rect(0, 0, 0, 0);
            o.attr('fill', w), o.attr('stroke', w), n(i), (C = !!~e.indexOf('m'));
            var c = d(t.tree);
            c.unshift(x('/', B.delimiter)), c.unshift(x('RegExp: ')), c.push(x('/', B.delimiter)), e && c.push(x(e, B.flags));
            var h = r(m, 'bold'),
                u = k,
                l = h.height / 2 + k,
                f = 0,
                p = 0;
            (f = c.reduce(function (t, e) {
                return (e.x = t), (e.y = l), t + e.text.length * h.width;
            }, u)),
                (f += k),
                (p = h.height + 2 * k),
                (c = i.add(c)),
                i.setSize(f, h.height + 2 * k);
            var g = a(t.tree, 0, 0);
            (p = Math.max(g.height + 3 * k + h.height, p)),
                (f = Math.max(g.width + 2 * k, f)),
                i.setSize(f, p),
                o.attr('width', f),
                o.attr('height', p),
                s(g.items, k, 2 * k + h.height - g.y),
                i.add(g.items);
        }
        function a(t, e, r) {
            return t.unshift({ type: 'startPoint' }), t.push({ type: 'endPoint' }), o(t, e, r);
        }
        function s(t, e, r) {
            t.forEach(function (t) {
                t._translate ? t._translate(e, r) : ((t.x += e), (t.y += r));
            });
        }
        function o(t, e, r) {
            var n = [],
                i = [],
                a = 0,
                s = 0,
                o = e,
                c = r,
                h = r;
            if (!t.length) return A.empty(null, e, r);
            t.forEach(function (t) {
                var e;
                (e = t.repeat ? A.repeat(t, o, r) : A[t.type](t, o, r)),
                    n.push(e),
                    (o += e.width + _),
                    (a += e.width),
                    (c = Math.min(c, e.y)),
                    (h = Math.max(h, e.y + e.height)),
                    (i = i.concat(e.items));
            }),
                (s = h - c),
                n.reduce(function (t, e) {
                    a += _;
                    var n = u(t.lineOutX, r, e.lineInX);
                    return i.push(n), e;
                });
            var l = n[0].lineInX,
                f = n[n.length - 1].lineOutX;
            return { items: i, width: a, height: s, x: e, y: c, lineInX: l, lineOutX: f };
        }
        function c(e, n, i, a, s) {
            e = t.toPrint(e);
            var o = r(m),
                c = e.length * o.width,
                h = o.height + 12,
                u = c + 12,
                l = { type: 'rect', x: n, y: i - h / 2, width: u, height: h, stroke: 'none', fill: a || 'transparent' },
                f = { type: 'text', x: n + u / 2, y: i, text: e, 'font-size': m, 'font-family': E, fill: s || 'black' };
            return { text: f, rect: l, items: [l, f], width: u, height: h, x: n, y: l.y, lineInX: n, lineOutX: n + u };
        }
        function h(t, e, n, i) {
            var a,
                s = r(b),
                o = n.split('\n'),
                c = o.length * s.height;
            (a =
                o.length > 1
                    ? Math.max.apply(
                          Math,
                          o.map(function (t) {
                              return t.length;
                          })
                      )
                    : n.length),
                (a *= s.width);
            return {
                label: { type: 'text', x: t, y: e - c / 2 - 4, text: n, 'font-size': b, 'font-family': E, fill: i || '#444' },
                x: t - a / 2,
                y: e - c - 4,
                width: a,
                height: c + 4,
            };
        }
        function u(t, e, r) {
            return {
                type: 'path',
                x: t,
                y: e,
                path: ['M', t, e, 'H', r],
                'stroke-linecap': 'butt',
                'stroke-linejoin': 'round',
                stroke: '#333',
                'stroke-width': 2,
                _translate: function (t, e) {
                    var r = this.path;
                    (r[1] += t), (r[2] += e), (r[4] += t);
                },
            };
        }
        function l(t, e, r, n) {
            var i,
                a,
                s = t > r ? -1 : 1,
                o = e > n ? -1 : 1;
            return (
                Math.abs(e - n) < 15
                    ? ((i = ['M', t, e, 'C', t + Math.min(Math.abs(r - t) / 2, 10) * s, e, r - (r - t) / 2, n, r, n]),
                      (a = function (t, e) {
                          var r = this.path;
                          (r[1] += t), (r[2] += e), (r[4] += t), (r[5] += e), (r[6] += t), (r[7] += e), (r[8] += t), (r[9] += e);
                      }))
                    : ((i = [
                          'M',
                          t,
                          e,
                          'Q',
                          t + 10 * s,
                          e,
                          t + 10 * s,
                          e + 10 * o,
                          'V',
                          Math.abs(e - n) < 20 ? e + 10 * o : n - 10 * o,
                          'Q',
                          t + 10 * s,
                          n,
                          t + 10 * s * 2,
                          n,
                          'H',
                          r,
                      ]),
                      (a = function (t, e) {
                          var r = this.path;
                          (r[1] += t),
                              (r[2] += e),
                              (r[4] += t),
                              (r[5] += e),
                              (r[6] += t),
                              (r[7] += e),
                              (r[9] += e),
                              (r[11] += t),
                              (r[12] += e),
                              (r[13] += t),
                              (r[14] += e),
                              (r[16] += t);
                      })),
                { type: 'path', path: i, 'stroke-linecap': 'butt', 'stroke-linejoin': 'round', stroke: '#333', 'stroke-width': 2, _translate: a }
            );
        }
        function f(t, e, r) {
            return {
                items: [
                    {
                        type: 'circle',
                        fill: r,
                        cx: t + 10,
                        cy: e,
                        r: 10,
                        stroke: 'none',
                        _translate: function (t, e) {
                            (this.cx += t), (this.cy += e);
                        },
                    },
                ],
                width: 20,
                height: 20,
                x: t,
                y: e,
                lineInX: t,
                lineOutX: t + 20,
            };
        }
        function p(t) {
            if (Array.isArray(t)) {
                for (var e = t, r = 0; r < e.length; r++) if (!p(e[r])) return !1;
                return !0;
            }
            var n = t;
            return n.type === EMPTY_NODE || (n.type === GROUP_NODE && void 0 === n.num ? p(n.sub) : n.type === CHOICE_NODE ? p(n.branches) : void 0);
        }
        function d(e) {
            var r = [];
            return (
                e.forEach(function (e) {
                    if (e.sub)
                        r.push(x('(')),
                            e.type === ASSERT_NODE ? (e.assertionType === AssertLookahead ? r.push(x('?=')) : r.push(x('?!'))) : e.nonCapture && r.push(x('?:')),
                            (r = r.concat(d(e.sub))),
                            r.push(x(')'));
                    else if (e.branches)
                        e.branches.map(d).forEach(function (t) {
                            (r = r.concat(t)), r.push(x('|'));
                        }),
                            r.pop();
                    else {
                        var n = B[e.type] || B.defaults;
                        switch (e.type) {
                            case CHARSET_NODE:
                                var i = v(e);
                                (!i || e.exclude) && r.push(x('[')),
                                    e.exclude && r.push(x('^', B.charsetExclude)),
                                    e.ranges.forEach(function (t) {
                                        r.push(x(g(t[0] + '-' + t[1]), B.charsetRange));
                                    }),
                                    e.classes.forEach(function (t) {
                                        r.push(x('\\' + t, B.charsetClass));
                                    }),
                                    r.push(x(g(e.chars), B.charsetChars)),
                                    (!i || e.exclude) && r.push(x(']'));
                                break;
                            default:
                                var a = e.raw || '';
                                e.repeat && (a = a.slice(0, e.repeat.beginIndex)), (a = t.toPrint(a, !0)), r.push(x(a, n));
                        }
                    }
                    if (e.repeat) {
                        var s = e.repeat.min,
                            o = e.repeat.max;
                        0 === s && o === 1 / 0
                            ? r.push(x('*'))
                            : 1 === s && o === 1 / 0
                            ? r.push(x('+'))
                            : 0 === s && 1 === o
                            ? r.push(x('?'))
                            : (r.push(x('{')), r.push(x(s)), s === o ? r.push(x('}')) : (r.push(x(',')), isFinite(o) && r.push(x(o)), r.push(x('}')))),
                            e.repeat.nonGreedy && r.push(x('?', B.repeatNonGreedy));
                    }
                }),
                r
            );
        }
        function g(e) {
            return (e = t.toPrint(e)), e.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
        }
        function x(t, e) {
            return (e = e || B[t] || B.defaults), { type: 'text', 'font-size': m, 'font-family': E, text: t + '', fill: e, 'text-anchor': 'start', 'font-weight': 'bold' };
        }
        function v(t) {
            return !t.chars && !t.ranges.length && 1 === t.classes.length;
        }
        e.exportConstants();
        var y,
            m = 16,
            b = 14,
            _ = 16,
            w = 'transparent',
            E = 'DejaVu Sans Mono,monospace',
            C = !1,
            k = 10,
            S = {},
            A = {
                startPoint: function (t, e, r) {
                    return f(e, r, 'r(0.5,0.5)#EFE-green');
                },
                endPoint: function (t, e, r) {
                    return f(e, r, 'r(0.5,0.5)#FFF-#000');
                },
                empty: function (t, e, r) {
                    return { items: [u(e, r, e + 10)], width: 10, height: 2, x: e, y: r, lineInX: e, lineOutX: e + 10 };
                },
                exact: function (t, e, r) {
                    return c(t.chars, e, r, 'skyblue');
                },
                dot: function (t, e, r) {
                    var n = c('AnyCharExceptNewLine', e, r, 'DarkGreen', 'white');
                    return (n.rect.r = 10), (n.rect.tip = 'AnyChar except CR LF'), n;
                },
                backref: function (t, e, r) {
                    var n = c('Backref #' + t.num, e, r, 'navy', 'white');
                    return (n.rect.r = 8), n;
                },
                repeat: function (t, e, r) {
                    function n(t) {
                        return t + (t < 2 ? ' time' : ' times');
                    }
                    function i(t, e) {
                        var r = this.path;
                        (r[1] += t),
                            (r[2] += e),
                            (r[4] += t),
                            (r[5] += e),
                            (r[6] += t),
                            (r[7] += e),
                            (r[9] += e),
                            (r[11] += t),
                            (r[12] += e),
                            (r[13] += t),
                            (r[14] += e),
                            (r[16] += t),
                            (r[18] += t),
                            (r[19] += e),
                            (r[20] += t),
                            (r[21] += e),
                            (r[23] += e),
                            (r[25] += t),
                            (r[26] += e),
                            (r[27] += t),
                            (r[28] += e);
                    }
                    if (p(t)) return A.empty(null, e, r);
                    var a = t.repeat,
                        o = '',
                        c = [];
                    if (a.min === a.max && 0 === a.min) return A.empty(null, e, r);
                    var u = A[t.type](t, e, r),
                        l = u.width,
                        f = u.height;
                    if (a.min === a.max && 1 === a.min) return u;
                    a.min === a.max ? (o += n(a.min)) : ((o += a.min), isFinite(a.max) ? (o += (a.max - a.min > 1 ? ' to ' : ' or ') + n(a.max)) : (o += ' or more times'));
                    var d = 10,
                        g = 0,
                        x = 10,
                        v = u.y + u.height - r,
                        y = 20 + u.width;
                    l = y;
                    var m;
                    1 !== a.max
                        ? ((v += 10),
                          (f += 10),
                          (m = {
                              type: 'path',
                              path: [
                                  'M',
                                  u.x + 10,
                                  r,
                                  'Q',
                                  e,
                                  r,
                                  e,
                                  r + x,
                                  'V',
                                  r + v - x,
                                  'Q',
                                  e,
                                  r + v,
                                  e + x,
                                  r + v,
                                  'H',
                                  e + y - x,
                                  'Q',
                                  e + y,
                                  r + v,
                                  e + y,
                                  r + v - x,
                                  'V',
                                  r + x,
                                  'Q',
                                  e + y,
                                  r,
                                  u.x + u.width + 10,
                                  r,
                              ],
                              _translate: i,
                              stroke: 'maroon',
                              'stroke-width': 2,
                          }),
                          a.nonGreedy && ((m.stroke = 'Brown'), (m['stroke-dasharray'] = '-')),
                          c.push(m))
                        : (o = !1);
                    var b;
                    if (0 === a.min) {
                        var _ = r - u.y + 10,
                            w = y + 20;
                        (d += 10),
                            (g = -12),
                            (l = w),
                            (f += 10),
                            (b = {
                                type: 'path',
                                path: [
                                    'M',
                                    e,
                                    r,
                                    'Q',
                                    e + x,
                                    r,
                                    e + x,
                                    r - x,
                                    'V',
                                    r - _ + x,
                                    'Q',
                                    e + x,
                                    r - _,
                                    e + 20,
                                    r - _,
                                    'H',
                                    e + w - 20,
                                    'Q',
                                    e + w - x,
                                    r - _,
                                    e + w - x,
                                    r - _ + x,
                                    'V',
                                    r - x,
                                    'Q',
                                    e + w - x,
                                    r,
                                    e + w,
                                    r,
                                ],
                                _translate: i,
                                stroke: a.nonGreedy ? 'darkgreen' : '#333',
                                'stroke-width': 2,
                            }),
                            m && s([m], 10, 0),
                            c.push(b);
                    }
                    if (o) {
                        var E = h(e + l / 2, r, o);
                        s([E.label], 0, v + E.height + 4), c.push(E.label), (f += 4 + E.height);
                        var C = (Math.max(E.width, l) - l) / 2;
                        C && s(c, C, 0), (l = Math.max(E.width, l)), (d += C);
                    }
                    return s(u.items, d, 0), (c = c.concat(u.items)), { items: c, width: l, height: f, x: e, y: u.y + g, lineInX: u.lineInX + d, lineOutX: u.lineOutX + d };
                },
                choice: function (t, e, r) {
                    if (p(t)) return A.empty(null, e, r);
                    var n = 0,
                        i = 0,
                        a = t.branches.map(function (t) {
                            var a = o(t, e, r);
                            return (n += a.height), (i = Math.max(i, a.width)), a;
                        });
                    (n += 6 * (a.length - 1) + 8), (i += 40);
                    var c = e + i / 2,
                        h = r - n / 2 + 4,
                        f = e + i,
                        d = [];
                    return (
                        a.forEach(function (t) {
                            var n = c - t.width / 2;
                            s(t.items, n - t.x, h - t.y), (d = d.concat(t.items));
                            var a = r + h - t.y,
                                o = l(e, r, e + 20, a),
                                p = l(f, r, e + i - 20, a);
                            d.push(o, p),
                                e + 20 !== n - t.x + t.lineInX && d.push(u(e + 20, a, n - t.x + t.lineInX)),
                                t.lineOutX + n - t.x != e + i - 20 && d.push(u(t.lineOutX + n - t.x, a, e + i - 20)),
                                (t.x = n),
                                (t.y = h),
                                (h += t.height + 6);
                        }),
                        { items: d, width: i, height: n, x: e, y: r - n / 2, lineInX: e, lineOutX: f }
                    );
                },
                charset: function (t, e, r) {
                    var n = { d: 'Digit', D: 'NonDigit', w: 'Word', W: 'NonWord', s: 'WhiteSpace', S: 'NonWhiteSpace' },
                        i = t.exclude ? 'Pink' : 'Khaki',
                        a = t.exclude ? '#C00' : '';
                    if (v(t)) {
                        var o = c(n[t.classes[0]], e, r, 'Green', 'white');
                        if (((o.rect.r = 5), t.exclude)) {
                            var u = h(o.x + o.width / 2, o.y, 'None of:', a),
                                l = o.items;
                            l.push(u.label);
                            var f = o.width,
                                p = Math.max(u.width, o.width),
                                d = (p - f) / 2;
                            return s(l, d, 0), { items: l, width: p, height: o.height + u.height, x: Math.min(u.x, o.x), y: u.y, lineInX: d + o.x, lineOutX: d + o.x + o.width };
                        }
                        return o;
                    }
                    if (!t.chars && !t.ranges.length && !t.classes.length) {
                        var o = c('AnyChar', e, r, 'green', 'white');
                        return (o.rect.r = 5), o;
                    }
                    var g,
                        x,
                        y = [],
                        p = 0,
                        m = 0;
                    t.chars && ((g = c(t.chars, e, r, 'LightSkyBlue', 'black')), (g.rect.r = 5), y.push(g), (p = g.width)),
                        t.ranges.forEach(function (t) {
                            t = t.split('').join('-');
                            var n = c(t, e, r, 'teal', 'white');
                            (n.rect.r = 5), y.push(n), (p = Math.max(n.width, p));
                        }),
                        t.classes.forEach(function (t) {
                            var i = c(n[t], e, r, 'Green', 'white');
                            (i.rect.r = 5), y.push(i), (p = Math.max(i.width, p));
                        }),
                        (x = y[0].height);
                    var b = [],
                        _ = [];
                    y.sort(function (t, e) {
                        return e.width - t.width;
                    }),
                        y.forEach(function (t) {
                            2 * t.width + 4 > p ? b.push(t) : _.push(t);
                        }),
                        (y = b);
                    for (var w, E; _.length; ) {
                        if (((w = _.pop()), !(E = _.pop()))) {
                            y.push(w);
                            break;
                        }
                        w.width - E.width > 2
                            ? (y.push(w), _.push(E))
                            : (s(E.items, w.width + 4, 0),
                              y.push({ items: w.items.concat(E.items), width: w.width + E.width + 4, height: w.height, x: w.x, y: w.y }),
                              (m -= w.height));
                    }
                    (p += 12), (m = 4 * (y.length - 1) + y.length * x + 12);
                    var C = { type: 'rect', x: e, y: r - m / 2, r: 4, width: p, height: m, stroke: 'none', fill: i },
                        k = C.y + 6,
                        l = [C];
                    y.forEach(function (t) {
                        s(t.items, e - t.x + (p - t.width) / 2, k - t.y), (l = l.concat(t.items)), (k += t.height + 4);
                    });
                    var u = h(C.x + C.width / 2, C.y, (t.exclude ? 'None' : 'One') + ' of:', a);
                    l.push(u.label);
                    var f = p;
                    p = Math.max(u.width, p);
                    var d = (p - f) / 2;
                    return s(l, d, 0), { items: l, width: p, height: m + u.height, x: Math.min(u.x, e), y: u.y, lineInX: d + e, lineOutX: d + e + C.width };
                },
                group: function (t, e, r) {
                    if (p(t)) return A.empty(null, e, r);
                    var n = o(t.sub, e, r);
                    if (t.num) {
                        s(n.items, 10, 0);
                        var i = n.width + 20,
                            a = n.height + 20,
                            c = { type: 'rect', x: e, y: n.y - 10, r: 6, width: i, height: a, 'stroke-dasharray': '.', stroke: 'silver', 'stroke-width': 2 },
                            u = h(c.x + c.width / 2, c.y - 2, 'Group #' + t.num),
                            l = n.items.concat([c, u.label]),
                            f = Math.max(u.width, i),
                            d = (f - i) / 2;
                        return d && s(l, d, 0), { items: l, width: f, height: a + u.height + 4, x: e, y: u.y, lineInX: d + n.lineInX + 10, lineOutX: d + n.lineOutX + 10 };
                    }
                    return n;
                },
                assert: function (t, e, r) {
                    var n,
                        i = {
                            AssertNonWordBoundary: { bg: 'maroon', fg: 'white' },
                            AssertWordBoundary: { bg: 'purple', fg: 'white' },
                            AssertEnd: { bg: 'Indigo', fg: 'white' },
                            AssertBegin: { bg: 'Indigo', fg: 'white' },
                        },
                        a = t.assertionType,
                        o = a.replace('Assert', '') + '!';
                    if ((n = i[a])) return !C || ('AssertBegin' !== a && 'AssertEnd' !== a) || (o = 'Line' + o), c(o, e, r, n.bg, n.fg);
                    var u, l;
                    a === AssertLookahead
                        ? ((u = 'CornflowerBlue'), (l = 'darkgreen'), (o = 'Followed by:'))
                        : a === AssertNegativeLookahead && ((u = '#F63'), (l = 'Purple'), (o = 'Not followed by:'));
                    var f = A.group(t, e, r),
                        p = f.height + 16,
                        d = f.width + 16,
                        g = { type: 'rect', x: e, y: f.y - 8, r: 6, width: d, height: p, 'stroke-dasharray': '-', stroke: u, 'stroke-width': 2 },
                        x = h(g.x + d / 2, g.y, o, l),
                        v = Math.max(d, x.width),
                        y = (v - d) / 2;
                    return (
                        s(f.items, y + 8, 0),
                        y && s([g, x.label], y, 0),
                        { items: f.items.concat([g, x.label]), width: v, height: g.height + x.height, x: e, y: x.y, lineInX: y + f.lineInX + 8, lineOutX: y + f.lineOutX + 8 }
                    );
                },
            },
            B = {
                delimiter: 'Indigo',
                flags: 'darkgreen',
                exact: '#334',
                dot: 'darkblue',
                backref: 'teal',
                $: 'purple',
                '^': 'purple',
                '\\b': '#F30',
                '\\B': '#F30',
                '(': 'blue',
                ')': 'blue',
                '?=': 'darkgreen',
                '?!': 'red',
                '?:': 'grey',
                '[': 'navy',
                ']': 'navy',
                '|': 'blue',
                '{': 'maroon',
                ',': 'maroon',
                '}': 'maroon',
                '*': 'maroon',
                '+': 'maroon',
                '?': 'maroon',
                repeatNonGreedy: '#F61',
                defaults: 'black',
                charsetRange: 'olive',
                charsetClass: 'navy',
                charsetExclude: 'red',
                charsetChars: '#534',
            };
        return i;
    }),
    (function (t) {
        var e,
            r,
            n = 'hasOwnProperty',
            i = /[\.\/]/,
            a = function () {},
            s = function (t, e) {
                return t - e;
            },
            o = { n: {} },
            c = function (t, n) {
                t = String(t);
                var i,
                    a = r,
                    o = Array.prototype.slice.call(arguments, 2),
                    h = c.listeners(t),
                    u = 0,
                    l = [],
                    f = {},
                    p = [],
                    d = e;
                (e = t), (r = 0);
                for (var g = 0, x = h.length; g < x; g++) 'zIndex' in h[g] && (l.push(h[g].zIndex), h[g].zIndex < 0 && (f[h[g].zIndex] = h[g]));
                for (l.sort(s); l[u] < 0; ) if (((i = f[l[u++]]), p.push(i.apply(n, o)), r)) return (r = a), p;
                for (g = 0; g < x; g++)
                    if ('zIndex' in (i = h[g]))
                        if (i.zIndex == l[u]) {
                            if ((p.push(i.apply(n, o)), r)) break;
                            do {
                                if ((u++, (i = f[l[u]]), i && p.push(i.apply(n, o)), r)) break;
                            } while (i);
                        } else f[i.zIndex] = i;
                    else if ((p.push(i.apply(n, o)), r)) break;
                return (r = a), (e = d), p.length ? p : null;
            };
        (c._events = o),
            (c.listeners = function (t) {
                var e,
                    r,
                    n,
                    a,
                    s,
                    c,
                    h,
                    u,
                    l = t.split(i),
                    f = o,
                    p = [f],
                    d = [];
                for (a = 0, s = l.length; a < s; a++) {
                    for (u = [], c = 0, h = p.length; c < h; c++) for (f = p[c].n, r = [f[l[a]], f['*']], n = 2; n--; ) (e = r[n]) && (u.push(e), (d = d.concat(e.f || [])));
                    p = u;
                }
                return d;
            }),
            (c.on = function (t, e) {
                if (((t = String(t)), 'function' != typeof e)) return function () {};
                for (var r = t.split(i), n = o, s = 0, c = r.length; s < c; s++) (n = n.n), (n = (n.hasOwnProperty(r[s]) && n[r[s]]) || (n[r[s]] = { n: {} }));
                for (n.f = n.f || [], s = 0, c = n.f.length; s < c; s++) if (n.f[s] == e) return a;
                return (
                    n.f.push(e),
                    function (t) {
                        +t == +t && (e.zIndex = +t);
                    }
                );
            }),
            (c.f = function (t) {
                var e = [].slice.call(arguments, 1);
                return function () {
                    c.apply(null, [t, null].concat(e).concat([].slice.call(arguments, 0)));
                };
            }),
            (c.stop = function () {
                r = 1;
            }),
            (c.nt = function (t) {
                return t ? new RegExp('(?:\\.|\\/|^)' + t + '(?:\\.|\\/|$)').test(e) : e;
            }),
            (c.nts = function () {
                return e.split(i);
            }),
            (c.off = c.unbind =
                function (t, e) {
                    if (!t) return void (c._events = o = { n: {} });
                    var r,
                        a,
                        s,
                        h,
                        u,
                        l,
                        f,
                        p = t.split(i),
                        d = [o];
                    for (h = 0, u = p.length; h < u; h++)
                        for (l = 0; l < d.length; l += s.length - 2) {
                            if (((s = [l, 1]), (r = d[l].n), '*' != p[h])) r[p[h]] && s.push(r[p[h]]);
                            else for (a in r) r[n](a) && s.push(r[a]);
                            d.splice.apply(d, s);
                        }
                    for (h = 0, u = d.length; h < u; h++)
                        for (r = d[h]; r.n; ) {
                            if (e) {
                                if (r.f) {
                                    for (l = 0, f = r.f.length; l < f; l++)
                                        if (r.f[l] == e) {
                                            r.f.splice(l, 1);
                                            break;
                                        }
                                    !r.f.length && delete r.f;
                                }
                                for (a in r.n)
                                    if (r.n[n](a) && r.n[a].f) {
                                        var g = r.n[a].f;
                                        for (l = 0, f = g.length; l < f; l++)
                                            if (g[l] == e) {
                                                g.splice(l, 1);
                                                break;
                                            }
                                        !g.length && delete r.n[a].f;
                                    }
                            } else {
                                delete r.f;
                                for (a in r.n) r.n[n](a) && r.n[a].f && delete r.n[a].f;
                            }
                            r = r.n;
                        }
                }),
            (c.once = function (t, e) {
                var r = function () {
                    return c.unbind(t, r), e.apply(this, arguments);
                };
                return c.on(t, r);
            }),
            (c.version = '0.4.2'),
            (c.toString = function () {
                return 'You are running Eve 0.4.2';
            }),
            'undefined' != typeof module && module.exports
                ? (module.exports = c)
                : void 0 !== define
                ? define('eve', [], function () {
                      return c;
                  })
                : (t.eve = c);
    })(window || this),
    (function (t, e) {
        'function' == typeof define && define.amd
            ? define('libs/raphael', ['eve'], function (r) {
                  return e(t, r);
              })
            : e(t, t.eve);
    })(this, function (t, e) {
        function r(t) {
            if (r.is(t, 'function')) return b ? t() : e.on('raphael.DOMload', t);
            if (r.is(t, W)) return r._engine.create[N](r, t.splice(0, 3 + r.is(t[0], H))).add(t);
            var n = Array.prototype.slice.call(arguments, 0);
            if (r.is(n[n.length - 1], 'function')) {
                var i = n.pop();
                return b
                    ? i.call(r._engine.create[N](r, n))
                    : e.on('raphael.DOMload', function () {
                          i.call(r._engine.create[N](r, n));
                      });
            }
            return r._engine.create[N](r, arguments);
        }
        function n(t) {
            if ('function' == typeof t || Object(t) !== t) return t;
            var e = new t.constructor();
            for (var r in t) t[k](r) && (e[r] = n(t[r]));
            return e;
        }
        function i(t, e) {
            for (var r = 0, n = t.length; r < n; r++) if (t[r] === e) return t.push(t.splice(r, 1)[0]);
        }
        function a(t, e, r) {
            function n() {
                var a = Array.prototype.slice.call(arguments, 0),
                    s = a.join('␀'),
                    o = (n.cache = n.cache || {}),
                    c = (n.count = n.count || []);
                return o[k](s) ? (i(c, s), r ? r(o[s]) : o[s]) : (c.length >= 1e3 && delete o[c.shift()], c.push(s), (o[s] = t[N](e, a)), r ? r(o[s]) : o[s]);
            }
            return n;
        }
        function s() {
            return this.hex;
        }
        function o(t, e) {
            for (var r = [], n = 0, i = t.length; i - 2 * !e > n; n += 2) {
                var a = [
                    { x: +t[n - 2], y: +t[n - 1] },
                    { x: +t[n], y: +t[n + 1] },
                    { x: +t[n + 2], y: +t[n + 3] },
                    { x: +t[n + 4], y: +t[n + 5] },
                ];
                e
                    ? n
                        ? i - 4 == n
                            ? (a[3] = { x: +t[0], y: +t[1] })
                            : i - 2 == n && ((a[2] = { x: +t[0], y: +t[1] }), (a[3] = { x: +t[2], y: +t[3] }))
                        : (a[0] = { x: +t[i - 2], y: +t[i - 1] })
                    : i - 4 == n
                    ? (a[3] = a[2])
                    : n || (a[0] = { x: +t[n], y: +t[n + 1] }),
                    r.push([
                        'C',
                        (-a[0].x + 6 * a[1].x + a[2].x) / 6,
                        (-a[0].y + 6 * a[1].y + a[2].y) / 6,
                        (a[1].x + 6 * a[2].x - a[3].x) / 6,
                        (a[1].y + 6 * a[2].y - a[3].y) / 6,
                        a[2].x,
                        a[2].y,
                    ]);
            }
            return r;
        }
        function c(t, e, r, n, i) {
            return t * (t * (-3 * e + 9 * r - 9 * n + 3 * i) + 6 * e - 12 * r + 6 * n) - 3 * e + 3 * r;
        }
        function h(t, e, r, n, i, a, s, o, h) {
            null == h && (h = 1), (h = h > 1 ? 1 : h < 0 ? 0 : h);
            for (
                var u = h / 2,
                    l = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816],
                    f = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472],
                    p = 0,
                    d = 0;
                d < 12;
                d++
            ) {
                var g = u * l[d] + u,
                    x = c(g, t, r, i, s),
                    v = c(g, e, n, a, o),
                    y = x * x + v * v;
                p += f[d] * z.sqrt(y);
            }
            return u * p;
        }
        function u(t, e, r, n, i, a, s, o, c) {
            if (!(c < 0 || h(t, e, r, n, i, a, s, o) < c)) {
                var u,
                    l = 0.5,
                    f = 1 - l;
                for (u = h(t, e, r, n, i, a, s, o, f); X(u - c) > 0.01; ) (l /= 2), (f += (u < c ? 1 : -1) * l), (u = h(t, e, r, n, i, a, s, o, f));
                return f;
            }
        }
        function l(t, e, r, n, i, a, s, o) {
            if (!(j(t, r) < U(i, s) || U(t, r) > j(i, s) || j(e, n) < U(a, o) || U(e, n) > j(a, o))) {
                var c = (t * n - e * r) * (i - s) - (t - r) * (i * o - a * s),
                    h = (t * n - e * r) * (a - o) - (e - n) * (i * o - a * s),
                    u = (t - r) * (a - o) - (e - n) * (i - s);
                if (u) {
                    var l = c / u,
                        f = h / u,
                        p = +l.toFixed(2),
                        d = +f.toFixed(2);
                    if (
                        !(
                            p < +U(t, r).toFixed(2) ||
                            p > +j(t, r).toFixed(2) ||
                            p < +U(i, s).toFixed(2) ||
                            p > +j(i, s).toFixed(2) ||
                            d < +U(e, n).toFixed(2) ||
                            d > +j(e, n).toFixed(2) ||
                            d < +U(a, o).toFixed(2) ||
                            d > +j(a, o).toFixed(2)
                        )
                    )
                        return { x: l, y: f };
                }
            }
        }
        function f(t, e, n) {
            var i = r.bezierBBox(t),
                a = r.bezierBBox(e);
            if (!r.isBBoxIntersect(i, a)) return n ? 0 : [];
            for (var s = h.apply(0, t), o = h.apply(0, e), c = j(~~(s / 5), 1), u = j(~~(o / 5), 1), f = [], p = [], d = {}, g = n ? 0 : [], x = 0; x < c + 1; x++) {
                var v = r.findDotsAtSegment.apply(r, t.concat(x / c));
                f.push({ x: v.x, y: v.y, t: x / c });
            }
            for (x = 0; x < u + 1; x++) (v = r.findDotsAtSegment.apply(r, e.concat(x / u))), p.push({ x: v.x, y: v.y, t: x / u });
            for (x = 0; x < c; x++)
                for (var y = 0; y < u; y++) {
                    var m = f[x],
                        b = f[x + 1],
                        _ = p[y],
                        w = p[y + 1],
                        E = X(b.x - m.x) < 0.001 ? 'y' : 'x',
                        C = X(w.x - _.x) < 0.001 ? 'y' : 'x',
                        k = l(m.x, m.y, b.x, b.y, _.x, _.y, w.x, w.y);
                    if (k) {
                        if (d[k.x.toFixed(4)] == k.y.toFixed(4)) continue;
                        d[k.x.toFixed(4)] = k.y.toFixed(4);
                        var S = m.t + X((k[E] - m[E]) / (b[E] - m[E])) * (b.t - m.t),
                            A = _.t + X((k[C] - _[C]) / (w[C] - _[C])) * (w.t - _.t);
                        S >= 0 && S <= 1.001 && A >= 0 && A <= 1.001 && (n ? g++ : g.push({ x: k.x, y: k.y, t1: U(S, 1), t2: U(A, 1) }));
                    }
                }
            return g;
        }
        function p(t, e, n) {
            (t = r._path2curve(t)), (e = r._path2curve(e));
            for (var i, a, s, o, c, h, u, l, p, d, g = n ? 0 : [], x = 0, v = t.length; x < v; x++) {
                var y = t[x];
                if ('M' == y[0]) (i = c = y[1]), (a = h = y[2]);
                else {
                    'C' == y[0] ? ((p = [i, a].concat(y.slice(1))), (i = p[6]), (a = p[7])) : ((p = [i, a, i, a, c, h, c, h]), (i = c), (a = h));
                    for (var m = 0, b = e.length; m < b; m++) {
                        var _ = e[m];
                        if ('M' == _[0]) (s = u = _[1]), (o = l = _[2]);
                        else {
                            'C' == _[0] ? ((d = [s, o].concat(_.slice(1))), (s = d[6]), (o = d[7])) : ((d = [s, o, s, o, u, l, u, l]), (s = u), (o = l));
                            var w = f(p, d, n);
                            if (n) g += w;
                            else {
                                for (var E = 0, C = w.length; E < C; E++) (w[E].segment1 = x), (w[E].segment2 = m), (w[E].bez1 = p), (w[E].bez2 = d);
                                g = g.concat(w);
                            }
                        }
                    }
                }
            }
            return g;
        }
        function d(t, e, r, n, i, a) {
            null != t
                ? ((this.a = +t), (this.b = +e), (this.c = +r), (this.d = +n), (this.e = +i), (this.f = +a))
                : ((this.a = 1), (this.b = 0), (this.c = 0), (this.d = 1), (this.e = 0), (this.f = 0));
        }
        function g() {
            return this.x + I + this.y + I + this.width + ' × ' + this.height;
        }
        function x(t, e, r, n, i, a) {
            function s(t) {
                return ((u * t + h) * t + c) * t;
            }
            function o(t, e) {
                var r, n, i, a, o, l;
                for (i = t, l = 0; l < 8; l++) {
                    if (((a = s(i) - t), X(a) < e)) return i;
                    if (((o = (3 * u * i + 2 * h) * i + c), X(o) < 1e-6)) break;
                    i -= a / o;
                }
                if (((r = 0), (n = 1), (i = t) < r)) return r;
                if (i > n) return n;
                for (; r < n; ) {
                    if (((a = s(i)), X(a - t) < e)) return i;
                    t > a ? (r = i) : (n = i), (i = (n - r) / 2 + r);
                }
                return i;
            }
            var c = 3 * e,
                h = 3 * (n - e) - c,
                u = 1 - c - h,
                l = 3 * r,
                f = 3 * (i - r) - l,
                p = 1 - l - f;
            return (function (t, e) {
                var r = o(t, e);
                return ((p * r + f) * r + l) * r;
            })(t, 1 / (200 * a));
        }
        function v(t, e) {
            var r = [],
                n = {};
            if (((this.ms = e), (this.times = 1), t)) {
                for (var i in t) t[k](i) && ((n[Z(i)] = t[i]), r.push(Z(i)));
                r.sort(ut);
            }
            (this.anim = n), (this.top = r[r.length - 1]), (this.percents = r);
        }
        function y(t, n, i, a, s, o) {
            i = Z(i);
            var c,
                h,
                u,
                l,
                f,
                p,
                g = t.ms,
                v = {},
                y = {},
                m = {};
            if (a)
                for (_ = 0, E = oe.length; _ < E; _++) {
                    var b = oe[_];
                    if (b.el.id == n.id && b.anim == t) {
                        b.percent != i ? (oe.splice(_, 1), (u = 1)) : (h = b), n.attr(b.totalOrigin);
                        break;
                    }
                }
            else a = +y;
            for (var _ = 0, E = t.percents.length; _ < E; _++) {
                if (t.percents[_] == i || t.percents[_] > a * t.top) {
                    (i = t.percents[_]), (f = t.percents[_ - 1] || 0), (g = (g / t.top) * (i - f)), (l = t.percents[_ + 1]), (c = t.anim[i]);
                    break;
                }
                a && n.attr(t.anim[t.percents[_]]);
            }
            if (c) {
                if (h) (h.initstatus = a), (h.start = new Date() - h.ms * a);
                else {
                    for (var C in c)
                        if (c[k](C) && (rt[k](C) || n.paper.customAttributes[k](C)))
                            switch (((v[C] = n.attr(C)), null == v[C] && (v[C] = et[C]), (y[C] = c[C]), rt[C])) {
                                case H:
                                    m[C] = (y[C] - v[C]) / g;
                                    break;
                                case 'colour':
                                    v[C] = r.getRGB(v[C]);
                                    var S = r.getRGB(y[C]);
                                    m[C] = { r: (S.r - v[C].r) / g, g: (S.g - v[C].g) / g, b: (S.b - v[C].b) / g };
                                    break;
                                case 'path':
                                    var A = Ft(v[C], y[C]),
                                        B = A[1];
                                    for (v[C] = A[0], m[C] = [], _ = 0, E = v[C].length; _ < E; _++) {
                                        m[C][_] = [0];
                                        for (var N = 1, T = v[C][_].length; N < T; N++) m[C][_][N] = (B[_][N] - v[C][_][N]) / g;
                                    }
                                    break;
                                case 'transform':
                                    var R = n._,
                                        I = jt(R[C], y[C]);
                                    if (I)
                                        for (v[C] = I.from, y[C] = I.to, m[C] = [], m[C].real = !0, _ = 0, E = v[C].length; _ < E; _++)
                                            for (m[C][_] = [v[C][_][0]], N = 1, T = v[C][_].length; N < T; N++) m[C][_][N] = (y[C][_][N] - v[C][_][N]) / g;
                                    else {
                                        var D = n.matrix || new d(),
                                            P = {
                                                _: { transform: R.transform },
                                                getBBox: function () {
                                                    return n.getBBox(1);
                                                },
                                            };
                                        (v[C] = [D.a, D.b, D.c, D.d, D.e, D.f]),
                                            Lt(P, y[C]),
                                            (y[C] = P._.transform),
                                            (m[C] = [
                                                (P.matrix.a - D.a) / g,
                                                (P.matrix.b - D.b) / g,
                                                (P.matrix.c - D.c) / g,
                                                (P.matrix.d - D.d) / g,
                                                (P.matrix.e - D.e) / g,
                                                (P.matrix.f - D.f) / g,
                                            ]);
                                    }
                                    break;
                                case 'csv':
                                    var L = M(c[C])[F](w),
                                        z = M(v[C])[F](w);
                                    if ('clip-rect' == C) for (v[C] = z, m[C] = [], _ = z.length; _--; ) m[C][_] = (L[_] - v[C][_]) / g;
                                    y[C] = L;
                                    break;
                                default:
                                    for (L = [][O](c[C]), z = [][O](v[C]), m[C] = [], _ = n.paper.customAttributes[C].length; _--; ) m[C][_] = ((L[_] || 0) - (z[_] || 0)) / g;
                            }
                    var j = c.easing,
                        U = r.easing_formulas[j];
                    if (!U)
                        if ((U = M(j).match($)) && 5 == U.length) {
                            var X = U;
                            U = function (t) {
                                return x(t, +X[1], +X[2], +X[3], +X[4], g);
                            };
                        } else U = ft;
                    if (
                        ((p = c.start || t.start || +new Date()),
                        (b = {
                            anim: t,
                            percent: i,
                            timestamp: p,
                            start: p + (t.del || 0),
                            status: 0,
                            initstatus: a || 0,
                            stop: !1,
                            ms: g,
                            easing: U,
                            from: v,
                            diff: m,
                            to: y,
                            el: n,
                            callback: c.callback,
                            prev: f,
                            next: l,
                            repeat: o || t.times,
                            origin: n.attr(),
                            totalOrigin: s,
                        }),
                        oe.push(b),
                        a && !h && !u && ((b.stop = !0), (b.start = new Date() - g * a), 1 == oe.length))
                    )
                        return he();
                    u && (b.start = new Date() - b.ms * a), 1 == oe.length && ce(he);
                }
                e('raphael.anim.start.' + n.id, n, t);
            }
        }
        function m(t) {
            for (var e = 0; e < oe.length; e++) oe[e].el.paper == t && oe.splice(e--, 1);
        }
        (r.version = '2.1.2'), (r.eve = e);
        var b,
            _,
            w = /[, ]+/,
            E = { circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1 },
            C = /\{(\d+)\}/g,
            k = 'hasOwnProperty',
            S = { doc: document, win: t },
            A = { was: Object.prototype[k].call(S.win, 'Raphael'), is: S.win.Raphael },
            B = function () {
                this.ca = this.customAttributes = {};
            },
            N = 'apply',
            O = 'concat',
            T = 'ontouchstart' in S.win || (S.win.DocumentTouch && S.doc instanceof DocumentTouch),
            R = '',
            I = ' ',
            M = String,
            F = 'split',
            D = 'click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel'[F](I),
            P = { mousedown: 'touchstart', mousemove: 'touchmove', mouseup: 'touchend' },
            L = M.prototype.toLowerCase,
            z = Math,
            j = z.max,
            U = z.min,
            X = z.abs,
            G = z.pow,
            q = z.PI,
            H = 'number',
            W = 'array',
            V = Object.prototype.toString,
            Q =
                ((r._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i),
                /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i),
            Y = { NaN: 1, Infinity: 1, '-Infinity': 1 },
            $ = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
            K = z.round,
            Z = parseFloat,
            J = parseInt,
            tt = M.prototype.toUpperCase,
            et = (r._availableAttrs = {
                'arrow-end': 'none',
                'arrow-start': 'none',
                blur: 0,
                'clip-rect': '0 0 1e9 1e9',
                cursor: 'default',
                cx: 0,
                cy: 0,
                fill: '#fff',
                'fill-opacity': 1,
                font: '10px "Arial"',
                'font-family': '"Arial"',
                'font-size': '10',
                'font-style': 'normal',
                'font-weight': 400,
                gradient: 0,
                height: 0,
                href: 'http://raphaeljs.com/',
                'letter-spacing': 0,
                opacity: 1,
                path: 'M0,0',
                r: 0,
                rx: 0,
                ry: 0,
                src: '',
                stroke: '#000',
                'stroke-dasharray': '',
                'stroke-linecap': 'butt',
                'stroke-linejoin': 'butt',
                'stroke-miterlimit': 0,
                'stroke-opacity': 1,
                'stroke-width': 1,
                target: '_blank',
                'text-anchor': 'middle',
                title: 'Raphael',
                transform: '',
                width: 0,
                x: 0,
                y: 0,
            }),
            rt = (r._availableAnimAttrs = {
                blur: H,
                'clip-rect': 'csv',
                cx: H,
                cy: H,
                fill: 'colour',
                'fill-opacity': H,
                'font-size': H,
                height: H,
                opacity: H,
                path: 'path',
                r: H,
                rx: H,
                ry: H,
                stroke: 'colour',
                'stroke-opacity': H,
                'stroke-width': H,
                transform: 'transform',
                width: H,
                x: H,
                y: H,
            }),
            nt =
                /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
            it = { hs: 1, rg: 1 },
            at = /,?([achlmqrstvxz]),?/gi,
            st =
                /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
            ot =
                /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
            ct =
                /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,
            ht =
                ((r._radial_gradient =
                    /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/),
                {}),
            ut = function (t, e) {
                return Z(t) - Z(e);
            },
            lt = function () {},
            ft = function (t) {
                return t;
            },
            pt = (r._rectPath = function (t, e, r, n, i) {
                return i
                    ? [
                          ['M', t + i, e],
                          ['l', r - 2 * i, 0],
                          ['a', i, i, 0, 0, 1, i, i],
                          ['l', 0, n - 2 * i],
                          ['a', i, i, 0, 0, 1, -i, i],
                          ['l', 2 * i - r, 0],
                          ['a', i, i, 0, 0, 1, -i, -i],
                          ['l', 0, 2 * i - n],
                          ['a', i, i, 0, 0, 1, i, -i],
                          ['z'],
                      ]
                    : [['M', t, e], ['l', r, 0], ['l', 0, n], ['l', -r, 0], ['z']];
            }),
            dt = function (t, e, r, n) {
                return null == n && (n = r), [['M', t, e], ['m', 0, -n], ['a', r, n, 0, 1, 1, 0, 2 * n], ['a', r, n, 0, 1, 1, 0, -2 * n], ['z']];
            },
            gt = (r._getPath = {
                path: function (t) {
                    return t.attr('path');
                },
                circle: function (t) {
                    var e = t.attrs;
                    return dt(e.cx, e.cy, e.r);
                },
                ellipse: function (t) {
                    var e = t.attrs;
                    return dt(e.cx, e.cy, e.rx, e.ry);
                },
                rect: function (t) {
                    var e = t.attrs;
                    return pt(e.x, e.y, e.width, e.height, e.r);
                },
                image: function (t) {
                    var e = t.attrs;
                    return pt(e.x, e.y, e.width, e.height);
                },
                text: function (t) {
                    var e = t._getBBox();
                    return pt(e.x, e.y, e.width, e.height);
                },
                set: function (t) {
                    var e = t._getBBox();
                    return pt(e.x, e.y, e.width, e.height);
                },
            }),
            xt = (r.mapPath = function (t, e) {
                if (!e) return t;
                var r, n, i, a, s, o, c;
                for (t = Ft(t), i = 0, s = t.length; i < s; i++)
                    for (c = t[i], a = 1, o = c.length; a < o; a += 2) (r = e.x(c[a], c[a + 1])), (n = e.y(c[a], c[a + 1])), (c[a] = r), (c[a + 1] = n);
                return t;
            });
        if (
            ((r._g = S), (r.type = S.win.SVGAngle || S.doc.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1') ? 'SVG' : 'VML'), 'VML' == r.type)
        ) {
            var vt,
                yt = S.doc.createElement('div');
            if (((yt.innerHTML = '<v:shape adj="1"/>'), (vt = yt.firstChild), (vt.style.behavior = 'url(#default#VML)'), !vt || 'object' != typeof vt.adj)) return (r.type = R);
            yt = null;
        }
        (r.svg = !(r.vml = 'VML' == r.type)),
            (r._Paper = B),
            (r.fn = _ = B.prototype = r.prototype),
            (r._id = 0),
            (r._oid = 0),
            (r.is = function (t, e) {
                return (
                    (e = L.call(e)),
                    'finite' == e
                        ? !Y[k](+t)
                        : 'array' == e
                        ? t instanceof Array
                        : ('null' == e && null === t) ||
                          (e == typeof t && null !== t) ||
                          ('object' == e && t === Object(t)) ||
                          ('array' == e && Array.isArray && Array.isArray(t)) ||
                          V.call(t).slice(8, -1).toLowerCase() == e
                );
            }),
            (r.angle = function (t, e, n, i, a, s) {
                if (null == a) {
                    var o = t - n,
                        c = e - i;
                    return o || c ? (180 + (180 * z.atan2(-c, -o)) / q + 360) % 360 : 0;
                }
                return r.angle(t, e, a, s) - r.angle(n, i, a, s);
            }),
            (r.rad = function (t) {
                return ((t % 360) * q) / 180;
            }),
            (r.deg = function (t) {
                return ((180 * t) / q) % 360;
            }),
            (r.snapTo = function (t, e, n) {
                if (((n = r.is(n, 'finite') ? n : 10), r.is(t, W))) {
                    for (var i = t.length; i--; ) if (X(t[i] - e) <= n) return t[i];
                } else {
                    t = +t;
                    var a = e % t;
                    if (a < n) return e - a;
                    if (a > t - n) return e - a + t;
                }
                return e;
            });
        r.createUUID = (function (t, e) {
            return function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(t, e).toUpperCase();
            };
        })(/[xy]/g, function (t) {
            var e = (16 * z.random()) | 0;
            return ('x' == t ? e : (3 & e) | 8).toString(16);
        });
        r.setWindow = function (t) {
            e('raphael.setWindow', r, S.win, t), (S.win = t), (S.doc = S.win.document), r._engine.initWin && r._engine.initWin(S.win);
        };
        var mt = function (t) {
                if (r.vml) {
                    var e,
                        n = /^\s+|\s+$/g;
                    try {
                        var i = new ActiveXObject('htmlfile');
                        i.write('<body>'), i.close(), (e = i.body);
                    } catch (t) {
                        e = createPopup().document.body;
                    }
                    var s = e.createTextRange();
                    mt = a(function (t) {
                        try {
                            e.style.color = M(t).replace(n, R);
                            var r = s.queryCommandValue('ForeColor');
                            return (r = ((255 & r) << 16) | (65280 & r) | ((16711680 & r) >>> 16)), '#' + ('000000' + r.toString(16)).slice(-6);
                        } catch (t) {
                            return 'none';
                        }
                    });
                } else {
                    var o = S.doc.createElement('i');
                    (o.title = 'Raphaël Colour Picker'),
                        (o.style.display = 'none'),
                        S.doc.body.appendChild(o),
                        (mt = a(function (t) {
                            return (o.style.color = t), S.doc.defaultView.getComputedStyle(o, R).getPropertyValue('color');
                        }));
                }
                return mt(t);
            },
            bt = function () {
                return 'hsb(' + [this.h, this.s, this.b] + ')';
            },
            _t = function () {
                return 'hsl(' + [this.h, this.s, this.l] + ')';
            },
            wt = function () {
                return this.hex;
            },
            Et = function (t, e, n) {
                if ((null == e && r.is(t, 'object') && 'r' in t && 'g' in t && 'b' in t && ((n = t.b), (e = t.g), (t = t.r)), null == e && r.is(t, 'string'))) {
                    var i = r.getRGB(t);
                    (t = i.r), (e = i.g), (n = i.b);
                }
                return (t > 1 || e > 1 || n > 1) && ((t /= 255), (e /= 255), (n /= 255)), [t, e, n];
            },
            Ct = function (t, e, n, i) {
                (t *= 255), (e *= 255), (n *= 255);
                var a = { r: t, g: e, b: n, hex: r.rgb(t, e, n), toString: wt };
                return r.is(i, 'finite') && (a.opacity = i), a;
            };
        (r.color = function (t) {
            var e;
            return (
                r.is(t, 'object') && 'h' in t && 's' in t && 'b' in t
                    ? ((e = r.hsb2rgb(t)), (t.r = e.r), (t.g = e.g), (t.b = e.b), (t.hex = e.hex))
                    : r.is(t, 'object') && 'h' in t && 's' in t && 'l' in t
                    ? ((e = r.hsl2rgb(t)), (t.r = e.r), (t.g = e.g), (t.b = e.b), (t.hex = e.hex))
                    : (r.is(t, 'string') && (t = r.getRGB(t)),
                      r.is(t, 'object') && 'r' in t && 'g' in t && 'b' in t
                          ? ((e = r.rgb2hsl(t)), (t.h = e.h), (t.s = e.s), (t.l = e.l), (e = r.rgb2hsb(t)), (t.v = e.b))
                          : ((t = { hex: 'none' }), (t.r = t.g = t.b = t.h = t.s = t.v = t.l = -1))),
                (t.toString = wt),
                t
            );
        }),
            (r.hsb2rgb = function (t, e, r, n) {
                this.is(t, 'object') && 'h' in t && 's' in t && 'b' in t && ((r = t.b), (e = t.s), (t = t.h), (n = t.o)), (t *= 360);
                var i, a, s, o, c;
                return (
                    (t = (t % 360) / 60),
                    (c = r * e),
                    (o = c * (1 - X((t % 2) - 1))),
                    (i = a = s = r - c),
                    (t = ~~t),
                    (i += [c, o, 0, 0, o, c][t]),
                    (a += [o, c, c, o, 0, 0][t]),
                    (s += [0, 0, o, c, c, o][t]),
                    Ct(i, a, s, n)
                );
            }),
            (r.hsl2rgb = function (t, e, r, n) {
                this.is(t, 'object') && 'h' in t && 's' in t && 'l' in t && ((r = t.l), (e = t.s), (t = t.h)),
                    (t > 1 || e > 1 || r > 1) && ((t /= 360), (e /= 100), (r /= 100)),
                    (t *= 360);
                var i, a, s, o, c;
                return (
                    (t = (t % 360) / 60),
                    (c = 2 * e * (r < 0.5 ? r : 1 - r)),
                    (o = c * (1 - X((t % 2) - 1))),
                    (i = a = s = r - c / 2),
                    (t = ~~t),
                    (i += [c, o, 0, 0, o, c][t]),
                    (a += [o, c, c, o, 0, 0][t]),
                    (s += [0, 0, o, c, c, o][t]),
                    Ct(i, a, s, n)
                );
            }),
            (r.rgb2hsb = function (t, e, r) {
                (r = Et(t, e, r)), (t = r[0]), (e = r[1]), (r = r[2]);
                var n, i, a, s;
                return (
                    (a = j(t, e, r)),
                    (s = a - U(t, e, r)),
                    (n = 0 == s ? null : a == t ? (e - r) / s : a == e ? (r - t) / s + 2 : (t - e) / s + 4),
                    (n = (((n + 360) % 6) * 60) / 360),
                    (i = 0 == s ? 0 : s / a),
                    { h: n, s: i, b: a, toString: bt }
                );
            }),
            (r.rgb2hsl = function (t, e, r) {
                (r = Et(t, e, r)), (t = r[0]), (e = r[1]), (r = r[2]);
                var n, i, a, s, o, c;
                return (
                    (s = j(t, e, r)),
                    (o = U(t, e, r)),
                    (c = s - o),
                    (n = 0 == c ? null : s == t ? (e - r) / c : s == e ? (r - t) / c + 2 : (t - e) / c + 4),
                    (n = (((n + 360) % 6) * 60) / 360),
                    (a = (s + o) / 2),
                    (i = 0 == c ? 0 : a < 0.5 ? c / (2 * a) : c / (2 - 2 * a)),
                    { h: n, s: i, l: a, toString: _t }
                );
            }),
            (r._path2string = function () {
                return this.join(',').replace(at, '$1');
            });
        r._preload = function (t, e) {
            var r = S.doc.createElement('img');
            (r.style.cssText = 'position:absolute;left:-9999em;top:-9999em'),
                (r.onload = function () {
                    e.call(this), (this.onload = null), S.doc.body.removeChild(this);
                }),
                (r.onerror = function () {
                    S.doc.body.removeChild(this);
                }),
                S.doc.body.appendChild(r),
                (r.src = t);
        };
        (r.getRGB = a(function (t) {
            if (!t || (t = M(t)).indexOf('-') + 1) return { r: -1, g: -1, b: -1, hex: 'none', error: 1, toString: s };
            if ('none' == t) return { r: -1, g: -1, b: -1, hex: 'none', toString: s };
            !(it[k](t.toLowerCase().substring(0, 2)) || '#' == t.charAt()) && (t = mt(t));
            var e,
                n,
                i,
                a,
                o,
                c,
                h = t.match(Q);
            return h
                ? (h[2] && ((i = J(h[2].substring(5), 16)), (n = J(h[2].substring(3, 5), 16)), (e = J(h[2].substring(1, 3), 16))),
                  h[3] && ((i = J((o = h[3].charAt(3)) + o, 16)), (n = J((o = h[3].charAt(2)) + o, 16)), (e = J((o = h[3].charAt(1)) + o, 16))),
                  h[4] &&
                      ((c = h[4][F](nt)),
                      (e = Z(c[0])),
                      '%' == c[0].slice(-1) && (e *= 2.55),
                      (n = Z(c[1])),
                      '%' == c[1].slice(-1) && (n *= 2.55),
                      (i = Z(c[2])),
                      '%' == c[2].slice(-1) && (i *= 2.55),
                      'rgba' == h[1].toLowerCase().slice(0, 4) && (a = Z(c[3])),
                      c[3] && '%' == c[3].slice(-1) && (a /= 100)),
                  h[5]
                      ? ((c = h[5][F](nt)),
                        (e = Z(c[0])),
                        '%' == c[0].slice(-1) && (e *= 2.55),
                        (n = Z(c[1])),
                        '%' == c[1].slice(-1) && (n *= 2.55),
                        (i = Z(c[2])),
                        '%' == c[2].slice(-1) && (i *= 2.55),
                        ('deg' == c[0].slice(-3) || '°' == c[0].slice(-1)) && (e /= 360),
                        'hsba' == h[1].toLowerCase().slice(0, 4) && (a = Z(c[3])),
                        c[3] && '%' == c[3].slice(-1) && (a /= 100),
                        r.hsb2rgb(e, n, i, a))
                      : h[6]
                      ? ((c = h[6][F](nt)),
                        (e = Z(c[0])),
                        '%' == c[0].slice(-1) && (e *= 2.55),
                        (n = Z(c[1])),
                        '%' == c[1].slice(-1) && (n *= 2.55),
                        (i = Z(c[2])),
                        '%' == c[2].slice(-1) && (i *= 2.55),
                        ('deg' == c[0].slice(-3) || '°' == c[0].slice(-1)) && (e /= 360),
                        'hsla' == h[1].toLowerCase().slice(0, 4) && (a = Z(c[3])),
                        c[3] && '%' == c[3].slice(-1) && (a /= 100),
                        r.hsl2rgb(e, n, i, a))
                      : ((h = { r: e, g: n, b: i, toString: s }),
                        (h.hex = '#' + (16777216 | i | (n << 8) | (e << 16)).toString(16).slice(1)),
                        r.is(a, 'finite') && (h.opacity = a),
                        h))
                : { r: -1, g: -1, b: -1, hex: 'none', error: 1, toString: s };
        }, r)),
            (r.hsb = a(function (t, e, n) {
                return r.hsb2rgb(t, e, n).hex;
            })),
            (r.hsl = a(function (t, e, n) {
                return r.hsl2rgb(t, e, n).hex;
            })),
            (r.rgb = a(function (t, e, r) {
                return '#' + (16777216 | r | (e << 8) | (t << 16)).toString(16).slice(1);
            })),
            (r.getColor = function (t) {
                var e = (this.getColor.start = this.getColor.start || { h: 0, s: 1, b: t || 0.75 }),
                    r = this.hsb2rgb(e.h, e.s, e.b);
                return (e.h += 0.075), e.h > 1 && ((e.h = 0), (e.s -= 0.2), e.s <= 0 && (this.getColor.start = { h: 0, s: 1, b: e.b })), r.hex;
            }),
            (r.getColor.reset = function () {
                delete this.start;
            }),
            (r.parsePathString = function (t) {
                if (!t) return null;
                var e = kt(t);
                if (e.arr) return At(e.arr);
                var n = { a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0 },
                    i = [];
                return (
                    r.is(t, W) && r.is(t[0], W) && (i = At(t)),
                    i.length ||
                        M(t).replace(st, function (t, e, r) {
                            var a = [],
                                s = e.toLowerCase();
                            if (
                                (r.replace(ct, function (t, e) {
                                    e && a.push(+e);
                                }),
                                'm' == s && a.length > 2 && (i.push([e][O](a.splice(0, 2))), (s = 'l'), (e = 'm' == e ? 'l' : 'L')),
                                'r' == s)
                            )
                                i.push([e][O](a));
                            else for (; a.length >= n[s] && (i.push([e][O](a.splice(0, n[s]))), n[s]); );
                        }),
                    (i.toString = r._path2string),
                    (e.arr = At(i)),
                    i
                );
            }),
            (r.parseTransformString = a(function (t) {
                if (!t) return null;
                var e = [];
                return (
                    r.is(t, W) && r.is(t[0], W) && (e = At(t)),
                    e.length ||
                        M(t).replace(ot, function (t, r, n) {
                            var i = [];
                            L.call(r);
                            n.replace(ct, function (t, e) {
                                e && i.push(+e);
                            }),
                                e.push([r][O](i));
                        }),
                    (e.toString = r._path2string),
                    e
                );
            }));
        var kt = function (t) {
            var e = (kt.ps = kt.ps || {});
            return (
                e[t] ? (e[t].sleep = 100) : (e[t] = { sleep: 100 }),
                setTimeout(function () {
                    for (var r in e) e[k](r) && r != t && !--e[r].sleep && delete e[r];
                }),
                e[t]
            );
        };
        (r.findDotsAtSegment = function (t, e, r, n, i, a, s, o, c) {
            var h = 1 - c,
                u = G(h, 3),
                l = G(h, 2),
                f = c * c,
                p = f * c,
                d = u * t + 3 * l * c * r + 3 * h * c * c * i + p * s,
                g = u * e + 3 * l * c * n + 3 * h * c * c * a + p * o,
                x = t + 2 * c * (r - t) + f * (i - 2 * r + t),
                v = e + 2 * c * (n - e) + f * (a - 2 * n + e),
                y = r + 2 * c * (i - r) + f * (s - 2 * i + r),
                m = n + 2 * c * (a - n) + f * (o - 2 * a + n),
                b = h * t + c * r,
                _ = h * e + c * n,
                w = h * i + c * s,
                E = h * a + c * o,
                C = 90 - (180 * z.atan2(x - y, v - m)) / q;
            return (x > y || v < m) && (C += 180), { x: d, y: g, m: { x: x, y: v }, n: { x: y, y: m }, start: { x: b, y: _ }, end: { x: w, y: E }, alpha: C };
        }),
            (r.bezierBBox = function (t, e, n, i, a, s, o, c) {
                r.is(t, 'array') || (t = [t, e, n, i, a, s, o, c]);
                var h = Mt.apply(null, t);
                return { x: h.min.x, y: h.min.y, x2: h.max.x, y2: h.max.y, width: h.max.x - h.min.x, height: h.max.y - h.min.y };
            }),
            (r.isPointInsideBBox = function (t, e, r) {
                return e >= t.x && e <= t.x2 && r >= t.y && r <= t.y2;
            }),
            (r.isBBoxIntersect = function (t, e) {
                var n = r.isPointInsideBBox;
                return (
                    n(e, t.x, t.y) ||
                    n(e, t.x2, t.y) ||
                    n(e, t.x, t.y2) ||
                    n(e, t.x2, t.y2) ||
                    n(t, e.x, e.y) ||
                    n(t, e.x2, e.y) ||
                    n(t, e.x, e.y2) ||
                    n(t, e.x2, e.y2) ||
                    (((t.x < e.x2 && t.x > e.x) || (e.x < t.x2 && e.x > t.x)) && ((t.y < e.y2 && t.y > e.y) || (e.y < t.y2 && e.y > t.y)))
                );
            }),
            (r.pathIntersection = function (t, e) {
                return p(t, e);
            }),
            (r.pathIntersectionNumber = function (t, e) {
                return p(t, e, 1);
            }),
            (r.isPointInsidePath = function (t, e, n) {
                var i = r.pathBBox(t);
                return (
                    r.isPointInsideBBox(i, e, n) &&
                    p(
                        t,
                        [
                            ['M', e, n],
                            ['H', i.x2 + 10],
                        ],
                        1
                    ) %
                        2 ==
                        1
                );
            }),
            (r._removedFactory = function (t) {
                return function () {
                    e('raphael.log', null, 'Raphaël: you are calling to method “' + t + '” of removed object', t);
                };
            });
        var St = (r.pathBBox = function (t) {
                var e = kt(t);
                if (e.bbox) return n(e.bbox);
                if (!t) return { x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0 };
                t = Ft(t);
                for (var r, i = 0, a = 0, s = [], o = [], c = 0, h = t.length; c < h; c++)
                    if (((r = t[c]), 'M' == r[0])) (i = r[1]), (a = r[2]), s.push(i), o.push(a);
                    else {
                        var u = Mt(i, a, r[1], r[2], r[3], r[4], r[5], r[6]);
                        (s = s[O](u.min.x, u.max.x)), (o = o[O](u.min.y, u.max.y)), (i = r[5]), (a = r[6]);
                    }
                var l = U[N](0, s),
                    f = U[N](0, o),
                    p = j[N](0, s),
                    d = j[N](0, o),
                    g = p - l,
                    x = d - f,
                    v = { x: l, y: f, x2: p, y2: d, width: g, height: x, cx: l + g / 2, cy: f + x / 2 };
                return (e.bbox = n(v)), v;
            }),
            At = function (t) {
                var e = n(t);
                return (e.toString = r._path2string), e;
            },
            Bt = (r._pathToRelative = function (t) {
                var e = kt(t);
                if (e.rel) return At(e.rel);
                (r.is(t, W) && r.is(t && t[0], W)) || (t = r.parsePathString(t));
                var n = [],
                    i = 0,
                    a = 0,
                    s = 0,
                    o = 0,
                    c = 0;
                'M' == t[0][0] && ((i = t[0][1]), (a = t[0][2]), (s = i), (o = a), c++, n.push(['M', i, a]));
                for (var h = c, u = t.length; h < u; h++) {
                    var l = (n[h] = []),
                        f = t[h];
                    if (f[0] != L.call(f[0]))
                        switch (((l[0] = L.call(f[0])), l[0])) {
                            case 'a':
                                (l[1] = f[1]), (l[2] = f[2]), (l[3] = f[3]), (l[4] = f[4]), (l[5] = f[5]), (l[6] = +(f[6] - i).toFixed(3)), (l[7] = +(f[7] - a).toFixed(3));
                                break;
                            case 'v':
                                l[1] = +(f[1] - a).toFixed(3);
                                break;
                            case 'm':
                                (s = f[1]), (o = f[2]);
                            default:
                                for (var p = 1, d = f.length; p < d; p++) l[p] = +(f[p] - (p % 2 ? i : a)).toFixed(3);
                        }
                    else {
                        (l = n[h] = []), 'm' == f[0] && ((s = f[1] + i), (o = f[2] + a));
                        for (var g = 0, x = f.length; g < x; g++) n[h][g] = f[g];
                    }
                    var v = n[h].length;
                    switch (n[h][0]) {
                        case 'z':
                            (i = s), (a = o);
                            break;
                        case 'h':
                            i += +n[h][v - 1];
                            break;
                        case 'v':
                            a += +n[h][v - 1];
                            break;
                        default:
                            (i += +n[h][v - 2]), (a += +n[h][v - 1]);
                    }
                }
                return (n.toString = r._path2string), (e.rel = At(n)), n;
            }),
            Nt = (r._pathToAbsolute = function (t) {
                var e = kt(t);
                if (e.abs) return At(e.abs);
                if (((r.is(t, W) && r.is(t && t[0], W)) || (t = r.parsePathString(t)), !t || !t.length)) return [['M', 0, 0]];
                var n = [],
                    i = 0,
                    a = 0,
                    s = 0,
                    c = 0,
                    h = 0;
                'M' == t[0][0] && ((i = +t[0][1]), (a = +t[0][2]), (s = i), (c = a), h++, (n[0] = ['M', i, a]));
                for (var u, l, f = 3 == t.length && 'M' == t[0][0] && 'R' == t[1][0].toUpperCase() && 'Z' == t[2][0].toUpperCase(), p = h, d = t.length; p < d; p++) {
                    if ((n.push((u = [])), (l = t[p]), l[0] != tt.call(l[0])))
                        switch (((u[0] = tt.call(l[0])), u[0])) {
                            case 'A':
                                (u[1] = l[1]), (u[2] = l[2]), (u[3] = l[3]), (u[4] = l[4]), (u[5] = l[5]), (u[6] = +(l[6] + i)), (u[7] = +(l[7] + a));
                                break;
                            case 'V':
                                u[1] = +l[1] + a;
                                break;
                            case 'H':
                                u[1] = +l[1] + i;
                                break;
                            case 'R':
                                for (var g = [i, a][O](l.slice(1)), x = 2, v = g.length; x < v; x++) (g[x] = +g[x] + i), (g[++x] = +g[x] + a);
                                n.pop(), (n = n[O](o(g, f)));
                                break;
                            case 'M':
                                (s = +l[1] + i), (c = +l[2] + a);
                            default:
                                for (x = 1, v = l.length; x < v; x++) u[x] = +l[x] + (x % 2 ? i : a);
                        }
                    else if ('R' == l[0]) (g = [i, a][O](l.slice(1))), n.pop(), (n = n[O](o(g, f))), (u = ['R'][O](l.slice(-2)));
                    else for (var y = 0, m = l.length; y < m; y++) u[y] = l[y];
                    switch (u[0]) {
                        case 'Z':
                            (i = s), (a = c);
                            break;
                        case 'H':
                            i = u[1];
                            break;
                        case 'V':
                            a = u[1];
                            break;
                        case 'M':
                            (s = u[u.length - 2]), (c = u[u.length - 1]);
                        default:
                            (i = u[u.length - 2]), (a = u[u.length - 1]);
                    }
                }
                return (n.toString = r._path2string), (e.abs = At(n)), n;
            }),
            Ot = function (t, e, r, n) {
                return [t, e, r, n, r, n];
            },
            Tt = function (t, e, r, n, i, a) {
                return [(1 / 3) * t + (2 / 3) * r, (1 / 3) * e + (2 / 3) * n, (1 / 3) * i + (2 / 3) * r, (1 / 3) * a + (2 / 3) * n, i, a];
            },
            Rt = function (t, e, r, n, i, s, o, c, h, u) {
                var l,
                    f = (120 * q) / 180,
                    p = (q / 180) * (+i || 0),
                    d = [],
                    g = a(function (t, e, r) {
                        return { x: t * z.cos(r) - e * z.sin(r), y: t * z.sin(r) + e * z.cos(r) };
                    });
                if (u) (C = u[0]), (k = u[1]), (w = u[2]), (E = u[3]);
                else {
                    (l = g(t, e, -p)), (t = l.x), (e = l.y), (l = g(c, h, -p)), (c = l.x), (h = l.y);
                    var x = (z.cos((q / 180) * i), z.sin((q / 180) * i), (t - c) / 2),
                        v = (e - h) / 2,
                        y = (x * x) / (r * r) + (v * v) / (n * n);
                    y > 1 && ((y = z.sqrt(y)), (r *= y), (n *= y));
                    var m = r * r,
                        b = n * n,
                        _ = (s == o ? -1 : 1) * z.sqrt(X((m * b - m * v * v - b * x * x) / (m * v * v + b * x * x))),
                        w = (_ * r * v) / n + (t + c) / 2,
                        E = (_ * -n * x) / r + (e + h) / 2,
                        C = z.asin(((e - E) / n).toFixed(9)),
                        k = z.asin(((h - E) / n).toFixed(9));
                    (C = t < w ? q - C : C), (k = c < w ? q - k : k), C < 0 && (C = 2 * q + C), k < 0 && (k = 2 * q + k), o && C > k && (C -= 2 * q), !o && k > C && (k -= 2 * q);
                }
                var S = k - C;
                if (X(S) > f) {
                    var A = k,
                        B = c,
                        N = h;
                    (k = C + f * (o && k > C ? 1 : -1)), (c = w + r * z.cos(k)), (h = E + n * z.sin(k)), (d = Rt(c, h, r, n, i, 0, o, B, N, [k, A, w, E]));
                }
                S = k - C;
                var T = z.cos(C),
                    R = z.sin(C),
                    I = z.cos(k),
                    M = z.sin(k),
                    D = z.tan(S / 4),
                    P = (4 / 3) * r * D,
                    L = (4 / 3) * n * D,
                    j = [t, e],
                    U = [t + P * R, e - L * T],
                    G = [c + P * M, h - L * I],
                    H = [c, h];
                if (((U[0] = 2 * j[0] - U[0]), (U[1] = 2 * j[1] - U[1]), u)) return [U, G, H][O](d);
                d = [U, G, H][O](d).join()[F](',');
                for (var W = [], V = 0, Q = d.length; V < Q; V++) W[V] = V % 2 ? g(d[V - 1], d[V], p).y : g(d[V], d[V + 1], p).x;
                return W;
            },
            It = function (t, e, r, n, i, a, s, o, c) {
                var h = 1 - c;
                return { x: G(h, 3) * t + 3 * G(h, 2) * c * r + 3 * h * c * c * i + G(c, 3) * s, y: G(h, 3) * e + 3 * G(h, 2) * c * n + 3 * h * c * c * a + G(c, 3) * o };
            },
            Mt = a(function (t, e, r, n, i, a, s, o) {
                var c,
                    h = i - 2 * r + t - (s - 2 * i + r),
                    u = 2 * (r - t) - 2 * (i - r),
                    l = t - r,
                    f = (-u + z.sqrt(u * u - 4 * h * l)) / 2 / h,
                    p = (-u - z.sqrt(u * u - 4 * h * l)) / 2 / h,
                    d = [e, o],
                    g = [t, s];
                return (
                    X(f) > '1e12' && (f = 0.5),
                    X(p) > '1e12' && (p = 0.5),
                    f > 0 && f < 1 && ((c = It(t, e, r, n, i, a, s, o, f)), g.push(c.x), d.push(c.y)),
                    p > 0 && p < 1 && ((c = It(t, e, r, n, i, a, s, o, p)), g.push(c.x), d.push(c.y)),
                    (h = a - 2 * n + e - (o - 2 * a + n)),
                    (u = 2 * (n - e) - 2 * (a - n)),
                    (l = e - n),
                    (f = (-u + z.sqrt(u * u - 4 * h * l)) / 2 / h),
                    (p = (-u - z.sqrt(u * u - 4 * h * l)) / 2 / h),
                    X(f) > '1e12' && (f = 0.5),
                    X(p) > '1e12' && (p = 0.5),
                    f > 0 && f < 1 && ((c = It(t, e, r, n, i, a, s, o, f)), g.push(c.x), d.push(c.y)),
                    p > 0 && p < 1 && ((c = It(t, e, r, n, i, a, s, o, p)), g.push(c.x), d.push(c.y)),
                    { min: { x: U[N](0, g), y: U[N](0, d) }, max: { x: j[N](0, g), y: j[N](0, d) } }
                );
            }),
            Ft = (r._path2curve = a(
                function (t, e) {
                    var r = !e && kt(t);
                    if (!e && r.curve) return At(r.curve);
                    for (
                        var n = Nt(t),
                            i = e && Nt(e),
                            a = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
                            s = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
                            o = function (t, e, r) {
                                var n,
                                    i,
                                    a = { T: 1, Q: 1 };
                                if (!t) return ['C', e.x, e.y, e.x, e.y, e.x, e.y];
                                switch ((!(t[0] in a) && (e.qx = e.qy = null), t[0])) {
                                    case 'M':
                                        (e.X = t[1]), (e.Y = t[2]);
                                        break;
                                    case 'A':
                                        t = ['C'][O](Rt[N](0, [e.x, e.y][O](t.slice(1))));
                                        break;
                                    case 'S':
                                        'C' == r || 'S' == r ? ((n = 2 * e.x - e.bx), (i = 2 * e.y - e.by)) : ((n = e.x), (i = e.y)), (t = ['C', n, i][O](t.slice(1)));
                                        break;
                                    case 'T':
                                        'Q' == r || 'T' == r ? ((e.qx = 2 * e.x - e.qx), (e.qy = 2 * e.y - e.qy)) : ((e.qx = e.x), (e.qy = e.y)),
                                            (t = ['C'][O](Tt(e.x, e.y, e.qx, e.qy, t[1], t[2])));
                                        break;
                                    case 'Q':
                                        (e.qx = t[1]), (e.qy = t[2]), (t = ['C'][O](Tt(e.x, e.y, t[1], t[2], t[3], t[4])));
                                        break;
                                    case 'L':
                                        t = ['C'][O](Ot(e.x, e.y, t[1], t[2]));
                                        break;
                                    case 'H':
                                        t = ['C'][O](Ot(e.x, e.y, t[1], e.y));
                                        break;
                                    case 'V':
                                        t = ['C'][O](Ot(e.x, e.y, e.x, t[1]));
                                        break;
                                    case 'Z':
                                        t = ['C'][O](Ot(e.x, e.y, e.X, e.Y));
                                }
                                return t;
                            },
                            c = function (t, e) {
                                if (t[e].length > 7) {
                                    t[e].shift();
                                    for (var r = t[e]; r.length; ) t.splice(e++, 0, ['C'][O](r.splice(0, 6)));
                                    t.splice(e, 1), (l = j(n.length, (i && i.length) || 0));
                                }
                            },
                            h = function (t, e, r, a, s) {
                                t &&
                                    e &&
                                    'M' == t[s][0] &&
                                    'M' != e[s][0] &&
                                    (e.splice(s, 0, ['M', a.x, a.y]), (r.bx = 0), (r.by = 0), (r.x = t[s][1]), (r.y = t[s][2]), (l = j(n.length, (i && i.length) || 0)));
                            },
                            u = 0,
                            l = j(n.length, (i && i.length) || 0);
                        u < l;
                        u++
                    ) {
                        (n[u] = o(n[u], a)), c(n, u), i && (i[u] = o(i[u], s)), i && c(i, u), h(n, i, a, s, u), h(i, n, s, a, u);
                        var f = n[u],
                            p = i && i[u],
                            d = f.length,
                            g = i && p.length;
                        (a.x = f[d - 2]),
                            (a.y = f[d - 1]),
                            (a.bx = Z(f[d - 4]) || a.x),
                            (a.by = Z(f[d - 3]) || a.y),
                            (s.bx = i && (Z(p[g - 4]) || s.x)),
                            (s.by = i && (Z(p[g - 3]) || s.y)),
                            (s.x = i && p[g - 2]),
                            (s.y = i && p[g - 1]);
                    }
                    return i || (r.curve = At(n)), i ? [n, i] : n;
                },
                null,
                At
            )),
            Dt =
                ((r._parseDots = a(function (t) {
                    for (var e = [], n = 0, i = t.length; n < i; n++) {
                        var a = {},
                            s = t[n].match(/^([^:]*):?([\d\.]*)/);
                        if (((a.color = r.getRGB(s[1])), a.color.error)) return null;
                        (a.color = a.color.hex), s[2] && (a.offset = s[2] + '%'), e.push(a);
                    }
                    for (n = 1, i = e.length - 1; n < i; n++)
                        if (!e[n].offset) {
                            for (var o = Z(e[n - 1].offset || 0), c = 0, h = n + 1; h < i; h++)
                                if (e[h].offset) {
                                    c = e[h].offset;
                                    break;
                                }
                            c || ((c = 100), (h = i)), (c = Z(c));
                            for (var u = (c - o) / (h - n + 1); n < h; n++) (o += u), (e[n].offset = o + '%');
                        }
                    return e;
                })),
                (r._tear = function (t, e) {
                    t == e.top && (e.top = t.prev), t == e.bottom && (e.bottom = t.next), t.next && (t.next.prev = t.prev), t.prev && (t.prev.next = t.next);
                })),
            Pt =
                ((r._tofront = function (t, e) {
                    e.top !== t && (Dt(t, e), (t.next = null), (t.prev = e.top), (e.top.next = t), (e.top = t));
                }),
                (r._toback = function (t, e) {
                    e.bottom !== t && (Dt(t, e), (t.next = e.bottom), (t.prev = null), (e.bottom.prev = t), (e.bottom = t));
                }),
                (r._insertafter = function (t, e, r) {
                    Dt(t, r), e == r.top && (r.top = t), e.next && (e.next.prev = t), (t.next = e.next), (t.prev = e), (e.next = t);
                }),
                (r._insertbefore = function (t, e, r) {
                    Dt(t, r), e == r.bottom && (r.bottom = t), e.prev && (e.prev.next = t), (t.prev = e.prev), (e.prev = t), (t.next = e);
                }),
                (r.toMatrix = function (t, e) {
                    var r = St(t),
                        n = {
                            _: { transform: R },
                            getBBox: function () {
                                return r;
                            },
                        };
                    return Lt(n, e), n.matrix;
                })),
            Lt =
                ((r.transformPath = function (t, e) {
                    return xt(t, Pt(t, e));
                }),
                (r._extractTransform = function (t, e) {
                    if (null == e) return t._.transform;
                    e = M(e).replace(/\.{3}|\u2026/g, t._.transform || R);
                    var n = r.parseTransformString(e),
                        i = 0,
                        a = 0,
                        s = 0,
                        o = 1,
                        c = 1,
                        h = t._,
                        u = new d();
                    if (((h.transform = n || []), n))
                        for (var l = 0, f = n.length; l < f; l++) {
                            var p,
                                g,
                                x,
                                v,
                                y,
                                m = n[l],
                                b = m.length,
                                _ = M(m[0]).toLowerCase(),
                                w = m[0] != _,
                                E = w ? u.invert() : 0;
                            't' == _ && 3 == b
                                ? w
                                    ? ((p = E.x(0, 0)), (g = E.y(0, 0)), (x = E.x(m[1], m[2])), (v = E.y(m[1], m[2])), u.translate(x - p, v - g))
                                    : u.translate(m[1], m[2])
                                : 'r' == _
                                ? 2 == b
                                    ? ((y = y || t.getBBox(1)), u.rotate(m[1], y.x + y.width / 2, y.y + y.height / 2), (i += m[1]))
                                    : 4 == b && (w ? ((x = E.x(m[2], m[3])), (v = E.y(m[2], m[3])), u.rotate(m[1], x, v)) : u.rotate(m[1], m[2], m[3]), (i += m[1]))
                                : 's' == _
                                ? 2 == b || 3 == b
                                    ? ((y = y || t.getBBox(1)), u.scale(m[1], m[b - 1], y.x + y.width / 2, y.y + y.height / 2), (o *= m[1]), (c *= m[b - 1]))
                                    : 5 == b &&
                                      (w ? ((x = E.x(m[3], m[4])), (v = E.y(m[3], m[4])), u.scale(m[1], m[2], x, v)) : u.scale(m[1], m[2], m[3], m[4]), (o *= m[1]), (c *= m[2]))
                                : 'm' == _ && 7 == b && u.add(m[1], m[2], m[3], m[4], m[5], m[6]),
                                (h.dirtyT = 1),
                                (t.matrix = u);
                        }
                    (t.matrix = u),
                        (h.sx = o),
                        (h.sy = c),
                        (h.deg = i),
                        (h.dx = a = u.e),
                        (h.dy = s = u.f),
                        1 == o && 1 == c && !i && h.bbox ? ((h.bbox.x += +a), (h.bbox.y += +s)) : (h.dirtyT = 1);
                })),
            zt = function (t) {
                var e = t[0];
                switch (e.toLowerCase()) {
                    case 't':
                        return [e, 0, 0];
                    case 'm':
                        return [e, 1, 0, 0, 1, 0, 0];
                    case 'r':
                        return 4 == t.length ? [e, 0, t[2], t[3]] : [e, 0];
                    case 's':
                        return 5 == t.length ? [e, 1, 1, t[3], t[4]] : 3 == t.length ? [e, 1, 1] : [e, 1];
                }
            },
            jt = (r._equaliseTransform = function (t, e) {
                (e = M(e).replace(/\.{3}|\u2026/g, t)), (t = r.parseTransformString(t) || []), (e = r.parseTransformString(e) || []);
                for (var n, i, a, s, o = j(t.length, e.length), c = [], h = [], u = 0; u < o; u++) {
                    if (
                        ((a = t[u] || zt(e[u])),
                        (s = e[u] || zt(a)),
                        a[0] != s[0] || ('r' == a[0].toLowerCase() && (a[2] != s[2] || a[3] != s[3])) || ('s' == a[0].toLowerCase() && (a[3] != s[3] || a[4] != s[4])))
                    )
                        return;
                    for (c[u] = [], h[u] = [], n = 0, i = j(a.length, s.length); n < i; n++) n in a && (c[u][n] = a[n]), n in s && (h[u][n] = s[n]);
                }
                return { from: c, to: h };
            });
        (r._getContainer = function (t, e, n, i) {
            var a;
            if (null != (a = null != i || r.is(t, 'object') ? t : S.doc.getElementById(t)))
                return a.tagName
                    ? null == e
                        ? { container: a, width: a.style.pixelWidth || a.offsetWidth, height: a.style.pixelHeight || a.offsetHeight }
                        : { container: a, width: e, height: n }
                    : { container: 1, x: t, y: e, width: n, height: i };
        }),
            (r.pathToRelative = Bt),
            (r._engine = {}),
            (r.path2curve = Ft),
            (r.matrix = function (t, e, r, n, i, a) {
                return new d(t, e, r, n, i, a);
            }),
            (function (t) {
                function e(t) {
                    return t[0] * t[0] + t[1] * t[1];
                }
                function n(t) {
                    var r = z.sqrt(e(t));
                    t[0] && (t[0] /= r), t[1] && (t[1] /= r);
                }
                (t.add = function (t, e, r, n, i, a) {
                    var s,
                        o,
                        c,
                        h,
                        u = [[], [], []],
                        l = [
                            [this.a, this.c, this.e],
                            [this.b, this.d, this.f],
                            [0, 0, 1],
                        ],
                        f = [
                            [t, r, i],
                            [e, n, a],
                            [0, 0, 1],
                        ];
                    for (
                        t &&
                            t instanceof d &&
                            (f = [
                                [t.a, t.c, t.e],
                                [t.b, t.d, t.f],
                                [0, 0, 1],
                            ]),
                            s = 0;
                        s < 3;
                        s++
                    )
                        for (o = 0; o < 3; o++) {
                            for (h = 0, c = 0; c < 3; c++) h += l[s][c] * f[c][o];
                            u[s][o] = h;
                        }
                    (this.a = u[0][0]), (this.b = u[1][0]), (this.c = u[0][1]), (this.d = u[1][1]), (this.e = u[0][2]), (this.f = u[1][2]);
                }),
                    (t.invert = function () {
                        var t = this,
                            e = t.a * t.d - t.b * t.c;
                        return new d(t.d / e, -t.b / e, -t.c / e, t.a / e, (t.c * t.f - t.d * t.e) / e, (t.b * t.e - t.a * t.f) / e);
                    }),
                    (t.clone = function () {
                        return new d(this.a, this.b, this.c, this.d, this.e, this.f);
                    }),
                    (t.translate = function (t, e) {
                        this.add(1, 0, 0, 1, t, e);
                    }),
                    (t.scale = function (t, e, r, n) {
                        null == e && (e = t), (r || n) && this.add(1, 0, 0, 1, r, n), this.add(t, 0, 0, e, 0, 0), (r || n) && this.add(1, 0, 0, 1, -r, -n);
                    }),
                    (t.rotate = function (t, e, n) {
                        (t = r.rad(t)), (e = e || 0), (n = n || 0);
                        var i = +z.cos(t).toFixed(9),
                            a = +z.sin(t).toFixed(9);
                        this.add(i, a, -a, i, e, n), this.add(1, 0, 0, 1, -e, -n);
                    }),
                    (t.x = function (t, e) {
                        return t * this.a + e * this.c + this.e;
                    }),
                    (t.y = function (t, e) {
                        return t * this.b + e * this.d + this.f;
                    }),
                    (t.get = function (t) {
                        return +this[M.fromCharCode(97 + t)].toFixed(4);
                    }),
                    (t.toString = function () {
                        return r.svg
                            ? 'matrix(' + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ')'
                            : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
                    }),
                    (t.toFilter = function () {
                        return (
                            'progid:DXImageTransform.Microsoft.Matrix(M11=' +
                            this.get(0) +
                            ', M12=' +
                            this.get(2) +
                            ', M21=' +
                            this.get(1) +
                            ', M22=' +
                            this.get(3) +
                            ', Dx=' +
                            this.get(4) +
                            ', Dy=' +
                            this.get(5) +
                            ", sizingmethod='auto expand')"
                        );
                    }),
                    (t.offset = function () {
                        return [this.e.toFixed(4), this.f.toFixed(4)];
                    }),
                    (t.split = function () {
                        var t = {};
                        (t.dx = this.e), (t.dy = this.f);
                        var i = [
                            [this.a, this.c],
                            [this.b, this.d],
                        ];
                        (t.scalex = z.sqrt(e(i[0]))),
                            n(i[0]),
                            (t.shear = i[0][0] * i[1][0] + i[0][1] * i[1][1]),
                            (i[1] = [i[1][0] - i[0][0] * t.shear, i[1][1] - i[0][1] * t.shear]),
                            (t.scaley = z.sqrt(e(i[1]))),
                            n(i[1]),
                            (t.shear /= t.scaley);
                        var a = -i[0][1],
                            s = i[1][1];
                        return (
                            s < 0 ? ((t.rotate = r.deg(z.acos(s))), a < 0 && (t.rotate = 360 - t.rotate)) : (t.rotate = r.deg(z.asin(a))),
                            (t.isSimple = !(+t.shear.toFixed(9) || (t.scalex.toFixed(9) != t.scaley.toFixed(9) && t.rotate))),
                            (t.isSuperSimple = !+t.shear.toFixed(9) && t.scalex.toFixed(9) == t.scaley.toFixed(9) && !t.rotate),
                            (t.noRotation = !+t.shear.toFixed(9) && !t.rotate),
                            t
                        );
                    }),
                    (t.toTransformString = function (t) {
                        var e = t || this[F]();
                        return e.isSimple
                            ? ((e.scalex = +e.scalex.toFixed(4)),
                              (e.scaley = +e.scaley.toFixed(4)),
                              (e.rotate = +e.rotate.toFixed(4)),
                              (e.dx || e.dy ? 't' + [e.dx, e.dy] : R) +
                                  (1 != e.scalex || 1 != e.scaley ? 's' + [e.scalex, e.scaley, 0, 0] : R) +
                                  (e.rotate ? 'r' + [e.rotate, 0, 0] : R))
                            : 'm' + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
                    });
            })(d.prototype);
        var Ut = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
        ('Apple Computer, Inc.' == navigator.vendor && ((Ut && Ut[1] < 4) || 'iP' == navigator.platform.slice(0, 2))) || ('Google Inc.' == navigator.vendor && Ut && Ut[1] < 8)
            ? (_.safari = function () {
                  var t = this.rect(-99, -99, this.width + 99, this.height + 99).attr({ stroke: 'none' });
                  setTimeout(function () {
                      t.remove();
                  });
              })
            : (_.safari = lt);
        for (
            var Xt = function () {
                    this.returnValue = !1;
                },
                Gt = function () {
                    return this.originalEvent.preventDefault();
                },
                qt = function () {
                    this.cancelBubble = !0;
                },
                Ht = function () {
                    return this.originalEvent.stopPropagation();
                },
                Wt = function (t) {
                    var e = S.doc.documentElement.scrollTop || S.doc.body.scrollTop,
                        r = S.doc.documentElement.scrollLeft || S.doc.body.scrollLeft;
                    return { x: t.clientX + r, y: t.clientY + e };
                },
                Vt = (function () {
                    return S.doc.addEventListener
                        ? function (t, e, r, n) {
                              var i = function (t) {
                                  var e = Wt(t);
                                  return r.call(n, t, e.x, e.y);
                              };
                              if ((t.addEventListener(e, i, !1), T && P[e])) {
                                  var a = function (e) {
                                      for (var i = Wt(e), a = e, s = 0, o = e.targetTouches && e.targetTouches.length; s < o; s++)
                                          if (e.targetTouches[s].target == t) {
                                              (e = e.targetTouches[s]), (e.originalEvent = a), (e.preventDefault = Gt), (e.stopPropagation = Ht);
                                              break;
                                          }
                                      return r.call(n, e, i.x, i.y);
                                  };
                                  t.addEventListener(P[e], a, !1);
                              }
                              return function () {
                                  return t.removeEventListener(e, i, !1), T && P[e] && t.removeEventListener(P[e], i, !1), !0;
                              };
                          }
                        : S.doc.attachEvent
                        ? function (t, e, r, n) {
                              var i = function (t) {
                                  t = t || S.win.event;
                                  var e = S.doc.documentElement.scrollTop || S.doc.body.scrollTop,
                                      i = S.doc.documentElement.scrollLeft || S.doc.body.scrollLeft,
                                      a = t.clientX + i,
                                      s = t.clientY + e;
                                  return (t.preventDefault = t.preventDefault || Xt), (t.stopPropagation = t.stopPropagation || qt), r.call(n, t, a, s);
                              };
                              return (
                                  t.attachEvent('on' + e, i),
                                  function () {
                                      return t.detachEvent('on' + e, i), !0;
                                  }
                              );
                          }
                        : void 0;
                })(),
                Qt = [],
                Yt = function (t) {
                    for (
                        var r,
                            n = t.clientX,
                            i = t.clientY,
                            a = S.doc.documentElement.scrollTop || S.doc.body.scrollTop,
                            s = S.doc.documentElement.scrollLeft || S.doc.body.scrollLeft,
                            o = Qt.length;
                        o--;

                    ) {
                        if (((r = Qt[o]), T && t.touches)) {
                            for (var c, h = t.touches.length; h--; )
                                if (((c = t.touches[h]), c.identifier == r.el._drag.id)) {
                                    (n = c.clientX), (i = c.clientY), (t.originalEvent ? t.originalEvent : t).preventDefault();
                                    break;
                                }
                        } else t.preventDefault();
                        var u,
                            l = r.el.node,
                            f = l.nextSibling,
                            p = l.parentNode,
                            d = l.style.display;
                        S.win.opera && p.removeChild(l),
                            (l.style.display = 'none'),
                            (u = r.el.paper.getElementByPoint(n, i)),
                            (l.style.display = d),
                            S.win.opera && (f ? p.insertBefore(l, f) : p.appendChild(l)),
                            u && e('raphael.drag.over.' + r.el.id, r.el, u),
                            e('raphael.drag.move.' + r.el.id, r.move_scope || r.el, n + s - r.el._drag.x, i + a - r.el._drag.y, n + s, i + a, t);
                    }
                },
                $t = function (t) {
                    r.unmousemove(Yt).unmouseup($t);
                    for (var n, i = Qt.length; i--; ) (n = Qt[i]), (n.el._drag = {}), e('raphael.drag.end.' + n.el.id, n.end_scope || n.start_scope || n.move_scope || n.el, t);
                    Qt = [];
                },
                Kt = (r.el = {}),
                Zt = D.length;
            Zt--;

        )
            !(function (t) {
                (r[t] = Kt[t] =
                    function (e, n) {
                        return (
                            r.is(e, 'function') &&
                                ((this.events = this.events || []), this.events.push({ name: t, f: e, unbind: Vt(this.shape || this.node || S.doc, t, e, n || this) })),
                            this
                        );
                    }),
                    (r['un' + t] = Kt['un' + t] =
                        function (e) {
                            for (var n = this.events || [], i = n.length; i--; )
                                n[i].name != t || (!r.is(e, 'undefined') && n[i].f != e) || (n[i].unbind(), n.splice(i, 1), !n.length && delete this.events);
                            return this;
                        });
            })(D[Zt]);
        (Kt.data = function (t, n) {
            var i = (ht[this.id] = ht[this.id] || {});
            if (0 == arguments.length) return i;
            if (1 == arguments.length) {
                if (r.is(t, 'object')) {
                    for (var a in t) t[k](a) && this.data(a, t[a]);
                    return this;
                }
                return e('raphael.data.get.' + this.id, this, i[t], t), i[t];
            }
            return (i[t] = n), e('raphael.data.set.' + this.id, this, n, t), this;
        }),
            (Kt.removeData = function (t) {
                return null == t ? (ht[this.id] = {}) : ht[this.id] && delete ht[this.id][t], this;
            }),
            (Kt.getData = function () {
                return n(ht[this.id] || {});
            }),
            (Kt.hover = function (t, e, r, n) {
                return this.mouseover(t, r).mouseout(e, n || r);
            }),
            (Kt.unhover = function (t, e) {
                return this.unmouseover(t).unmouseout(e);
            });
        var Jt = [];
        (Kt.drag = function (t, n, i, a, s, o) {
            function c(c) {
                (c.originalEvent || c).preventDefault();
                var h = c.clientX,
                    u = c.clientY,
                    l = S.doc.documentElement.scrollTop || S.doc.body.scrollTop,
                    f = S.doc.documentElement.scrollLeft || S.doc.body.scrollLeft;
                if (((this._drag.id = c.identifier), T && c.touches))
                    for (var p, d = c.touches.length; d--; )
                        if (((p = c.touches[d]), (this._drag.id = p.identifier), p.identifier == this._drag.id)) {
                            (h = p.clientX), (u = p.clientY);
                            break;
                        }
                (this._drag.x = h + f),
                    (this._drag.y = u + l),
                    !Qt.length && r.mousemove(Yt).mouseup($t),
                    Qt.push({ el: this, move_scope: a, start_scope: s, end_scope: o }),
                    n && e.on('raphael.drag.start.' + this.id, n),
                    t && e.on('raphael.drag.move.' + this.id, t),
                    i && e.on('raphael.drag.end.' + this.id, i),
                    e('raphael.drag.start.' + this.id, s || a || this, c.clientX + f, c.clientY + l, c);
            }
            return (this._drag = {}), Jt.push({ el: this, start: c }), this.mousedown(c), this;
        }),
            (Kt.onDragOver = function (t) {
                t ? e.on('raphael.drag.over.' + this.id, t) : e.unbind('raphael.drag.over.' + this.id);
            }),
            (Kt.undrag = function () {
                for (var t = Jt.length; t--; ) Jt[t].el == this && (this.unmousedown(Jt[t].start), Jt.splice(t, 1), e.unbind('raphael.drag.*.' + this.id));
                !Jt.length && r.unmousemove(Yt).unmouseup($t), (Qt = []);
            }),
            (_.circle = function (t, e, n) {
                var i = r._engine.circle(this, t || 0, e || 0, n || 0);
                return this.__set__ && this.__set__.push(i), i;
            }),
            (_.rect = function (t, e, n, i, a) {
                var s = r._engine.rect(this, t || 0, e || 0, n || 0, i || 0, a || 0);
                return this.__set__ && this.__set__.push(s), s;
            }),
            (_.ellipse = function (t, e, n, i) {
                var a = r._engine.ellipse(this, t || 0, e || 0, n || 0, i || 0);
                return this.__set__ && this.__set__.push(a), a;
            }),
            (_.path = function (t) {
                t && !r.is(t, 'string') && !r.is(t[0], W) && (t += R);
                var e = r._engine.path(r.format[N](r, arguments), this);
                return this.__set__ && this.__set__.push(e), e;
            }),
            (_.image = function (t, e, n, i, a) {
                var s = r._engine.image(this, t || 'about:blank', e || 0, n || 0, i || 0, a || 0);
                return this.__set__ && this.__set__.push(s), s;
            }),
            (_.text = function (t, e, n) {
                var i = r._engine.text(this, t || 0, e || 0, M(n));
                return this.__set__ && this.__set__.push(i), i;
            }),
            (_.set = function (t) {
                !r.is(t, 'array') && (t = Array.prototype.splice.call(arguments, 0, arguments.length));
                var e = new le(t);
                return this.__set__ && this.__set__.push(e), (e.paper = this), (e.type = 'set'), e;
            }),
            (_.setStart = function (t) {
                this.__set__ = t || this.set();
            }),
            (_.setFinish = function (t) {
                var e = this.__set__;
                return delete this.__set__, e;
            }),
            (_.setSize = function (t, e) {
                return r._engine.setSize.call(this, t, e);
            }),
            (_.setViewBox = function (t, e, n, i, a) {
                return r._engine.setViewBox.call(this, t, e, n, i, a);
            }),
            (_.top = _.bottom = null),
            (_.raphael = r);
        var te = function (t) {
            var e = t.getBoundingClientRect(),
                r = t.ownerDocument,
                n = r.body,
                i = r.documentElement,
                a = i.clientTop || n.clientTop || 0,
                s = i.clientLeft || n.clientLeft || 0;
            return { y: e.top + (S.win.pageYOffset || i.scrollTop || n.scrollTop) - a, x: e.left + (S.win.pageXOffset || i.scrollLeft || n.scrollLeft) - s };
        };
        (_.getElementByPoint = function (t, e) {
            var r = this,
                n = r.canvas,
                i = S.doc.elementFromPoint(t, e);
            if (S.win.opera && 'svg' == i.tagName) {
                var a = te(n),
                    s = n.createSVGRect();
                (s.x = t - a.x), (s.y = e - a.y), (s.width = s.height = 1);
                var o = n.getIntersectionList(s, null);
                o.length && (i = o[o.length - 1]);
            }
            if (!i) return null;
            for (; i.parentNode && i != n.parentNode && !i.raphael; ) i = i.parentNode;
            return i == r.canvas.parentNode && (i = n), (i = i && i.raphael ? r.getById(i.raphaelid) : null);
        }),
            (_.getElementsByBBox = function (t) {
                var e = this.set();
                return (
                    this.forEach(function (n) {
                        r.isBBoxIntersect(n.getBBox(), t) && e.push(n);
                    }),
                    e
                );
            }),
            (_.getById = function (t) {
                for (var e = this.bottom; e; ) {
                    if (e.id == t) return e;
                    e = e.next;
                }
                return null;
            }),
            (_.forEach = function (t, e) {
                for (var r = this.bottom; r; ) {
                    if (!1 === t.call(e, r)) return this;
                    r = r.next;
                }
                return this;
            }),
            (_.getElementsByPoint = function (t, e) {
                var r = this.set();
                return (
                    this.forEach(function (n) {
                        n.isPointInside(t, e) && r.push(n);
                    }),
                    r
                );
            }),
            (Kt.isPointInside = function (t, e) {
                var n = (this.realPath = gt[this.type](this));
                return this.attr('transform') && this.attr('transform').length && (n = r.transformPath(n, this.attr('transform'))), r.isPointInsidePath(n, t, e);
            }),
            (Kt.getBBox = function (t) {
                if (this.removed) return {};
                var e = this._;
                return t
                    ? ((!e.dirty && e.bboxwt) || ((this.realPath = gt[this.type](this)), (e.bboxwt = St(this.realPath)), (e.bboxwt.toString = g), (e.dirty = 0)), e.bboxwt)
                    : ((e.dirty || e.dirtyT || !e.bbox) &&
                          ((!e.dirty && this.realPath) || ((e.bboxwt = 0), (this.realPath = gt[this.type](this))),
                          (e.bbox = St(xt(this.realPath, this.matrix))),
                          (e.bbox.toString = g),
                          (e.dirty = e.dirtyT = 0)),
                      e.bbox);
            }),
            (Kt.clone = function () {
                if (this.removed) return null;
                var t = this.paper[this.type]().attr(this.attr());
                return this.__set__ && this.__set__.push(t), t;
            }),
            (Kt.glow = function (t) {
                if ('text' == this.type) return null;
                t = t || {};
                var e = {
                        width: (t.width || 10) + (+this.attr('stroke-width') || 1),
                        fill: t.fill || !1,
                        opacity: t.opacity || 0.5,
                        offsetx: t.offsetx || 0,
                        offsety: t.offsety || 0,
                        color: t.color || '#000',
                    },
                    r = e.width / 2,
                    n = this.paper,
                    i = n.set(),
                    a = this.realPath || gt[this.type](this);
                a = this.matrix ? xt(a, this.matrix) : a;
                for (var s = 1; s < r + 1; s++)
                    i.push(
                        n.path(a).attr({
                            stroke: e.color,
                            fill: e.fill ? e.color : 'none',
                            'stroke-linejoin': 'round',
                            'stroke-linecap': 'round',
                            'stroke-width': +((e.width / r) * s).toFixed(3),
                            opacity: +(e.opacity / r).toFixed(3),
                        })
                    );
                return i.insertBefore(this).translate(e.offsetx, e.offsety);
            });
        var ee = function (t, e, n, i, a, s, o, c, l) {
                return null == l ? h(t, e, n, i, a, s, o, c) : r.findDotsAtSegment(t, e, n, i, a, s, o, c, u(t, e, n, i, a, s, o, c, l));
            },
            re = function (t, e) {
                return function (n, i, a) {
                    n = Ft(n);
                    for (var s, o, c, h, u, l = '', f = {}, p = 0, d = 0, g = n.length; d < g; d++) {
                        if (((c = n[d]), 'M' == c[0])) (s = +c[1]), (o = +c[2]);
                        else {
                            if (((h = ee(s, o, c[1], c[2], c[3], c[4], c[5], c[6])), p + h > i)) {
                                if (e && !f.start) {
                                    if (((u = ee(s, o, c[1], c[2], c[3], c[4], c[5], c[6], i - p)), (l += ['C' + u.start.x, u.start.y, u.m.x, u.m.y, u.x, u.y]), a)) return l;
                                    (f.start = l), (l = ['M' + u.x, u.y + 'C' + u.n.x, u.n.y, u.end.x, u.end.y, c[5], c[6]].join()), (p += h), (s = +c[5]), (o = +c[6]);
                                    continue;
                                }
                                if (!t && !e) return (u = ee(s, o, c[1], c[2], c[3], c[4], c[5], c[6], i - p)), { x: u.x, y: u.y, alpha: u.alpha };
                            }
                            (p += h), (s = +c[5]), (o = +c[6]);
                        }
                        l += c.shift() + c;
                    }
                    return (
                        (f.end = l), (u = t ? p : e ? f : r.findDotsAtSegment(s, o, c[0], c[1], c[2], c[3], c[4], c[5], 1)), u.alpha && (u = { x: u.x, y: u.y, alpha: u.alpha }), u
                    );
                };
            },
            ne = re(1),
            ie = re(),
            ae = re(0, 1);
        (r.getTotalLength = ne),
            (r.getPointAtLength = ie),
            (r.getSubpath = function (t, e, r) {
                if (this.getTotalLength(t) - r < 1e-6) return ae(t, e).end;
                var n = ae(t, r, 1);
                return e ? ae(n, e).end : n;
            }),
            (Kt.getTotalLength = function () {
                var t = this.getPath();
                if (t) return this.node.getTotalLength ? this.node.getTotalLength() : ne(t);
            }),
            (Kt.getPointAtLength = function (t) {
                var e = this.getPath();
                if (e) return ie(e, t);
            }),
            (Kt.getPath = function () {
                var t,
                    e = r._getPath[this.type];
                if ('text' != this.type && 'set' != this.type) return e && (t = e(this)), t;
            }),
            (Kt.getSubpath = function (t, e) {
                var n = this.getPath();
                if (n) return r.getSubpath(n, t, e);
            });
        var se = (r.easing_formulas = {
            linear: function (t) {
                return t;
            },
            '<': function (t) {
                return G(t, 1.7);
            },
            '>': function (t) {
                return G(t, 0.48);
            },
            '<>': function (t) {
                var e = 0.48 - t / 1.04,
                    r = z.sqrt(0.1734 + e * e),
                    n = r - e,
                    i = G(X(n), 1 / 3) * (n < 0 ? -1 : 1),
                    a = -r - e,
                    s = G(X(a), 1 / 3) * (a < 0 ? -1 : 1),
                    o = i + s + 0.5;
                return 3 * (1 - o) * o * o + o * o * o;
            },
            backIn: function (t) {
                var e = 1.70158;
                return t * t * ((e + 1) * t - e);
            },
            backOut: function (t) {
                t -= 1;
                var e = 1.70158;
                return t * t * ((e + 1) * t + e) + 1;
            },
            elastic: function (t) {
                return t == !!t ? t : G(2, -10 * t) * z.sin((2 * q * (t - 0.075)) / 0.3) + 1;
            },
            bounce: function (t) {
                var e,
                    r = 7.5625,
                    n = 2.75;
                return (
                    t < 1 / n
                        ? (e = r * t * t)
                        : t < 2 / n
                        ? ((t -= 1.5 / n), (e = r * t * t + 0.75))
                        : t < 2.5 / n
                        ? ((t -= 2.25 / n), (e = r * t * t + 0.9375))
                        : ((t -= 2.625 / n), (e = r * t * t + 0.984375)),
                    e
                );
            },
        });
        (se.easeIn = se['ease-in'] = se['<']),
            (se.easeOut = se['ease-out'] = se['>']),
            (se.easeInOut = se['ease-in-out'] = se['<>']),
            (se['back-in'] = se.backIn),
            (se['back-out'] = se.backOut);
        var oe = [],
            ce =
                t.requestAnimationFrame ||
                t.webkitRequestAnimationFrame ||
                t.mozRequestAnimationFrame ||
                t.oRequestAnimationFrame ||
                t.msRequestAnimationFrame ||
                function (t) {
                    setTimeout(t, 16);
                },
            he = function () {
                for (var t = +new Date(), n = 0; n < oe.length; n++) {
                    var i = oe[n];
                    if (!i.el.removed && !i.paused) {
                        var a,
                            s,
                            o = t - i.start,
                            c = i.ms,
                            h = i.easing,
                            u = i.from,
                            l = i.diff,
                            f = i.to,
                            p = (i.t, i.el),
                            d = {},
                            g = {};
                        if (
                            (i.initstatus
                                ? ((o = ((i.initstatus * i.anim.top - i.prev) / (i.percent - i.prev)) * c),
                                  (i.status = i.initstatus),
                                  delete i.initstatus,
                                  i.stop && oe.splice(n--, 1))
                                : (i.status = (i.prev + (i.percent - i.prev) * (o / c)) / i.anim.top),
                            !(o < 0))
                        )
                            if (o < c) {
                                var x = h(o / c);
                                for (var v in u)
                                    if (u[k](v)) {
                                        switch (rt[v]) {
                                            case H:
                                                a = +u[v] + x * c * l[v];
                                                break;
                                            case 'colour':
                                                a = 'rgb(' + [ue(K(u[v].r + x * c * l[v].r)), ue(K(u[v].g + x * c * l[v].g)), ue(K(u[v].b + x * c * l[v].b))].join(',') + ')';
                                                break;
                                            case 'path':
                                                a = [];
                                                for (var m = 0, b = u[v].length; m < b; m++) {
                                                    a[m] = [u[v][m][0]];
                                                    for (var _ = 1, w = u[v][m].length; _ < w; _++) a[m][_] = +u[v][m][_] + x * c * l[v][m][_];
                                                    a[m] = a[m].join(I);
                                                }
                                                a = a.join(I);
                                                break;
                                            case 'transform':
                                                if (l[v].real)
                                                    for (a = [], m = 0, b = u[v].length; m < b; m++)
                                                        for (a[m] = [u[v][m][0]], _ = 1, w = u[v][m].length; _ < w; _++) a[m][_] = u[v][m][_] + x * c * l[v][m][_];
                                                else {
                                                    var E = function (t) {
                                                        return +u[v][t] + x * c * l[v][t];
                                                    };
                                                    a = [['m', E(0), E(1), E(2), E(3), E(4), E(5)]];
                                                }
                                                break;
                                            case 'csv':
                                                if ('clip-rect' == v) for (a = [], m = 4; m--; ) a[m] = +u[v][m] + x * c * l[v][m];
                                                break;
                                            default:
                                                var C = [][O](u[v]);
                                                for (a = [], m = p.paper.customAttributes[v].length; m--; ) a[m] = +C[m] + x * c * l[v][m];
                                        }
                                        d[v] = a;
                                    }
                                p.attr(d),
                                    (function (t, r, n) {
                                        setTimeout(function () {
                                            e('raphael.anim.frame.' + t, r, n);
                                        });
                                    })(p.id, p, i.anim);
                            } else {
                                if (
                                    ((function (t, n, i) {
                                        setTimeout(function () {
                                            e('raphael.anim.frame.' + n.id, n, i), e('raphael.anim.finish.' + n.id, n, i), r.is(t, 'function') && t.call(n);
                                        });
                                    })(i.callback, p, i.anim),
                                    p.attr(f),
                                    oe.splice(n--, 1),
                                    i.repeat > 1 && !i.next)
                                ) {
                                    for (s in f) f[k](s) && (g[s] = i.totalOrigin[s]);
                                    i.el.attr(g), y(i.anim, i.el, i.anim.percents[0], null, i.totalOrigin, i.repeat - 1);
                                }
                                i.next && !i.stop && y(i.anim, i.el, i.next, null, i.totalOrigin, i.repeat);
                            }
                    }
                }
                r.svg && p && p.paper && p.paper.safari(), oe.length && ce(he);
            },
            ue = function (t) {
                return t > 255 ? 255 : t < 0 ? 0 : t;
            };
        (Kt.animateWith = function (t, e, n, i, a, s) {
            var o = this;
            if (o.removed) return s && s.call(o), o;
            var c = n instanceof v ? n : r.animation(n, i, a, s);
            y(c, o, c.percents[0], null, o.attr());
            for (var h = 0, u = oe.length; h < u; h++)
                if (oe[h].anim == e && oe[h].el == t) {
                    oe[u - 1].start = oe[h].start;
                    break;
                }
            return o;
        }),
            (Kt.onAnimation = function (t) {
                return t ? e.on('raphael.anim.frame.' + this.id, t) : e.unbind('raphael.anim.frame.' + this.id), this;
            }),
            (v.prototype.delay = function (t) {
                var e = new v(this.anim, this.ms);
                return (e.times = this.times), (e.del = +t || 0), e;
            }),
            (v.prototype.repeat = function (t) {
                var e = new v(this.anim, this.ms);
                return (e.del = this.del), (e.times = z.floor(j(t, 0)) || 1), e;
            }),
            (r.animation = function (t, e, n, i) {
                if (t instanceof v) return t;
                (!r.is(n, 'function') && n) || ((i = i || n || null), (n = null)), (t = Object(t)), (e = +e || 0);
                var a,
                    s,
                    o = {};
                for (s in t) t[k](s) && Z(s) != s && Z(s) + '%' != s && ((a = !0), (o[s] = t[s]));
                return a ? (n && (o.easing = n), i && (o.callback = i), new v({ 100: o }, e)) : new v(t, e);
            }),
            (Kt.animate = function (t, e, n, i) {
                var a = this;
                if (a.removed) return i && i.call(a), a;
                var s = t instanceof v ? t : r.animation(t, e, n, i);
                return y(s, a, s.percents[0], null, a.attr()), a;
            }),
            (Kt.setTime = function (t, e) {
                return t && null != e && this.status(t, U(e, t.ms) / t.ms), this;
            }),
            (Kt.status = function (t, e) {
                var r,
                    n,
                    i = [],
                    a = 0;
                if (null != e) return y(t, this, -1, U(e, 1)), this;
                for (r = oe.length; a < r; a++)
                    if (((n = oe[a]), n.el.id == this.id && (!t || n.anim == t))) {
                        if (t) return n.status;
                        i.push({ anim: n.anim, status: n.status });
                    }
                return t ? 0 : i;
            }),
            (Kt.pause = function (t) {
                for (var r = 0; r < oe.length; r++)
                    oe[r].el.id != this.id || (t && oe[r].anim != t) || (!1 !== e('raphael.anim.pause.' + this.id, this, oe[r].anim) && (oe[r].paused = !0));
                return this;
            }),
            (Kt.resume = function (t) {
                for (var r = 0; r < oe.length; r++)
                    if (oe[r].el.id == this.id && (!t || oe[r].anim == t)) {
                        var n = oe[r];
                        !1 !== e('raphael.anim.resume.' + this.id, this, n.anim) && (delete n.paused, this.status(n.anim, n.status));
                    }
                return this;
            }),
            (Kt.stop = function (t) {
                for (var r = 0; r < oe.length; r++)
                    oe[r].el.id != this.id || (t && oe[r].anim != t) || (!1 !== e('raphael.anim.stop.' + this.id, this, oe[r].anim) && oe.splice(r--, 1));
                return this;
            }),
            e.on('raphael.remove', m),
            e.on('raphael.clear', m),
            (Kt.toString = function () {
                return 'Raphaël’s object';
            });
        var le = function (t) {
                if (((this.items = []), (this.length = 0), (this.type = 'set'), t))
                    for (var e = 0, r = t.length; e < r; e++)
                        !t[e] ||
                            (t[e].constructor != Kt.constructor && t[e].constructor != le) ||
                            ((this[this.items.length] = this.items[this.items.length] = t[e]), this.length++);
            },
            fe = le.prototype;
        (fe.push = function () {
            for (var t, e, r = 0, n = arguments.length; r < n; r++)
                !(t = arguments[r]) || (t.constructor != Kt.constructor && t.constructor != le) || ((e = this.items.length), (this[e] = this.items[e] = t), this.length++);
            return this;
        }),
            (fe.pop = function () {
                return this.length && delete this[this.length--], this.items.pop();
            }),
            (fe.forEach = function (t, e) {
                for (var r = 0, n = this.items.length; r < n; r++) if (!1 === t.call(e, this.items[r], r)) return this;
                return this;
            });
        for (var pe in Kt)
            Kt[k](pe) &&
                (fe[pe] = (function (t) {
                    return function () {
                        var e = arguments;
                        return this.forEach(function (r) {
                            r[t][N](r, e);
                        });
                    };
                })(pe));
        return (
            (fe.attr = function (t, e) {
                if (t && r.is(t, W) && r.is(t[0], 'object')) for (var n = 0, i = t.length; n < i; n++) this.items[n].attr(t[n]);
                else for (var a = 0, s = this.items.length; a < s; a++) this.items[a].attr(t, e);
                return this;
            }),
            (fe.clear = function () {
                for (; this.length; ) this.pop();
            }),
            (fe.splice = function (t, e, r) {
                (t = t < 0 ? j(this.length + t, 0) : t), (e = j(0, U(this.length - t, e)));
                var n,
                    i = [],
                    a = [],
                    s = [];
                for (n = 2; n < arguments.length; n++) s.push(arguments[n]);
                for (n = 0; n < e; n++) a.push(this[t + n]);
                for (; n < this.length - t; n++) i.push(this[t + n]);
                var o = s.length;
                for (n = 0; n < o + i.length; n++) this.items[t + n] = this[t + n] = n < o ? s[n] : i[n - o];
                for (n = this.items.length = this.length -= e - o; this[n]; ) delete this[n++];
                return new le(a);
            }),
            (fe.exclude = function (t) {
                for (var e = 0, r = this.length; e < r; e++) if (this[e] == t) return this.splice(e, 1), !0;
            }),
            (fe.animate = function (t, e, n, i) {
                (r.is(n, 'function') || !n) && (i = n || null);
                var a,
                    s,
                    o = this.items.length,
                    c = o,
                    h = this;
                if (!o) return this;
                i &&
                    (s = function () {
                        !--o && i.call(h);
                    }),
                    (n = r.is(n, 'string') ? n : s);
                var u = r.animation(t, e, n, s);
                for (a = this.items[--c].animate(u); c--; )
                    this.items[c] && !this.items[c].removed && this.items[c].animateWith(a, u, u), (this.items[c] && !this.items[c].removed) || o--;
                return this;
            }),
            (fe.insertAfter = function (t) {
                for (var e = this.items.length; e--; ) this.items[e].insertAfter(t);
                return this;
            }),
            (fe.getBBox = function () {
                for (var t = [], e = [], r = [], n = [], i = this.items.length; i--; )
                    if (!this.items[i].removed) {
                        var a = this.items[i].getBBox();
                        t.push(a.x), e.push(a.y), r.push(a.x + a.width), n.push(a.y + a.height);
                    }
                return (t = U[N](0, t)), (e = U[N](0, e)), (r = j[N](0, r)), (n = j[N](0, n)), { x: t, y: e, x2: r, y2: n, width: r - t, height: n - e };
            }),
            (fe.clone = function (t) {
                t = this.paper.set();
                for (var e = 0, r = this.items.length; e < r; e++) t.push(this.items[e].clone());
                return t;
            }),
            (fe.toString = function () {
                return 'Raphaël‘s set';
            }),
            (fe.glow = function (t) {
                var e = this.paper.set();
                return (
                    this.forEach(function (r, n) {
                        var i = r.glow(t);
                        null != i &&
                            i.forEach(function (t, r) {
                                e.push(t);
                            });
                    }),
                    e
                );
            }),
            (fe.isPointInside = function (t, e) {
                var r = !1;
                return (
                    this.forEach(function (n) {
                        if (n.isPointInside(t, e)) return (r = !0), !1;
                    }),
                    r
                );
            }),
            (r.registerFont = function (t) {
                if (!t.face) return t;
                this.fonts = this.fonts || {};
                var e = { w: t.w, face: {}, glyphs: {} },
                    r = t.face['font-family'];
                for (var n in t.face) t.face[k](n) && (e.face[n] = t.face[n]);
                if ((this.fonts[r] ? this.fonts[r].push(e) : (this.fonts[r] = [e]), !t.svg)) {
                    e.face['units-per-em'] = J(t.face['units-per-em'], 10);
                    for (var i in t.glyphs)
                        if (t.glyphs[k](i)) {
                            var a = t.glyphs[i];
                            if (
                                ((e.glyphs[i] = {
                                    w: a.w,
                                    k: {},
                                    d:
                                        a.d &&
                                        'M' +
                                            a.d.replace(/[mlcxtrv]/g, function (t) {
                                                return { l: 'L', c: 'C', x: 'z', t: 'm', r: 'l', v: 'c' }[t] || 'M';
                                            }) +
                                            'z',
                                }),
                                a.k)
                            )
                                for (var s in a.k) a[k](s) && (e.glyphs[i].k[s] = a.k[s]);
                        }
                }
                return t;
            }),
            (_.getFont = function (t, e, n, i) {
                if (((i = i || 'normal'), (n = n || 'normal'), (e = +e || { normal: 400, bold: 700, lighter: 300, bolder: 800 }[e] || 400), r.fonts)) {
                    var a = r.fonts[t];
                    if (!a) {
                        var s = new RegExp('(^|\\s)' + t.replace(/[^\w\d\s+!~.:_-]/g, R) + '(\\s|$)', 'i');
                        for (var o in r.fonts)
                            if (r.fonts[k](o) && s.test(o)) {
                                a = r.fonts[o];
                                break;
                            }
                    }
                    var c;
                    if (a)
                        for (
                            var h = 0, u = a.length;
                            h < u && ((c = a[h]), c.face['font-weight'] != e || (c.face['font-style'] != n && c.face['font-style']) || c.face['font-stretch'] != i);
                            h++
                        );
                    return c;
                }
            }),
            (_.print = function (t, e, n, i, a, s, o, c) {
                (s = s || 'middle'), (o = j(U(o || 0, 1), -1)), (c = j(U(c || 1, 3), 1));
                var h,
                    u = M(n)[F](R),
                    l = 0,
                    f = 0,
                    p = R;
                if ((r.is(i, 'string') && (i = this.getFont(i)), i)) {
                    h = (a || 16) / i.face['units-per-em'];
                    for (
                        var d = i.face.bbox[F](w), g = +d[0], x = d[3] - d[1], v = 0, y = +d[1] + ('baseline' == s ? x + +i.face.descent : x / 2), m = 0, b = u.length;
                        m < b;
                        m++
                    ) {
                        if ('\n' == u[m]) (l = 0), (E = 0), (f = 0), (v += x * c);
                        else {
                            var _ = (f && i.glyphs[u[m - 1]]) || {},
                                E = i.glyphs[u[m]];
                            (l += f ? (_.w || i.w) + ((_.k && _.k[u[m]]) || 0) + i.w * o : 0), (f = 1);
                        }
                        E && E.d && (p += r.transformPath(E.d, ['t', l * h, v * h, 's', h, h, g, y, 't', (t - g) / h, (e - y) / h]));
                    }
                }
                return this.path(p).attr({ fill: '#000', stroke: 'none' });
            }),
            (_.add = function (t) {
                if (r.is(t, 'array')) for (var e, n = this.set(), i = 0, a = t.length; i < a; i++) (e = t[i] || {}), E[k](e.type) && n.push(this[e.type]().attr(e));
                return n;
            }),
            (r.format = function (t, e) {
                var n = r.is(e, W) ? [0][O](e) : arguments;
                return (
                    t &&
                        r.is(t, 'string') &&
                        n.length - 1 &&
                        (t = t.replace(C, function (t, e) {
                            return null == n[++e] ? R : n[e];
                        })),
                    t || R
                );
            }),
            (r.fullfill = (function () {
                var t = /\{([^\}]+)\}/g,
                    e = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
                    r = function (t, r, n) {
                        var i = n;
                        return (
                            r.replace(e, function (t, e, r, n, a) {
                                (e = e || n), i && (e in i && (i = i[e]), 'function' == typeof i && a && (i = i()));
                            }),
                            (i = (null == i || i == n ? t : i) + '')
                        );
                    };
                return function (e, n) {
                    return String(e).replace(t, function (t, e) {
                        return r(t, e, n);
                    });
                };
            })()),
            (r.ninja = function () {
                return A.was ? (S.win.Raphael = A.is) : delete Raphael, r;
            }),
            (r.st = fe),
            (function (t, e, n) {
                function i() {
                    /in/.test(t.readyState) ? setTimeout(i, 9) : r.eve('raphael.DOMload');
                }
                null == t.readyState &&
                    t.addEventListener &&
                    (t.addEventListener(
                        'DOMContentLoaded',
                        (n = function () {
                            t.removeEventListener('DOMContentLoaded', n, !1), (t.readyState = 'complete');
                        }),
                        !1
                    ),
                    (t.readyState = 'loading')),
                    i();
            })(document),
            e.on('raphael.DOMload', function () {
                b = !0;
            }),
            (function () {
                if (r.svg) {
                    var t = 'hasOwnProperty',
                        e = String,
                        n = parseFloat,
                        i = parseInt,
                        a = Math,
                        s = a.max,
                        o = a.abs,
                        c = a.pow,
                        h = /[, ]+/,
                        u = r.eve,
                        l = '',
                        f = ' ',
                        p = 'http://www.w3.org/1999/xlink',
                        d = {
                            block: 'M5,0 0,2.5 5,5z',
                            classic: 'M5,0 0,2.5 5,5 3.5,3 3.5,2z',
                            diamond: 'M2.5,0 5,2.5 2.5,5 0,2.5z',
                            open: 'M6,1 1,3.5 6,6',
                            oval: 'M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z',
                        },
                        g = {};
                    r.toString = function () {
                        return 'Your browser supports SVG.\nYou are running Raphaël ' + this.version;
                    };
                    var x = function (n, i) {
                            if (i) {
                                'string' == typeof n && (n = x(n));
                                for (var a in i) i[t](a) && ('xlink:' == a.substring(0, 6) ? n.setAttributeNS(p, a.substring(6), e(i[a])) : n.setAttribute(a, e(i[a])));
                            } else (n = r._g.doc.createElementNS('http://www.w3.org/2000/svg', n)), n.style && (n.style.webkitTapHighlightColor = 'rgba(0,0,0,0)');
                            return n;
                        },
                        v = function (t, i) {
                            var h = 'linear',
                                u = t.id + i,
                                f = 0.5,
                                p = 0.5,
                                d = t.node,
                                g = t.paper,
                                v = d.style,
                                y = r._g.doc.getElementById(u);
                            if (!y) {
                                if (
                                    ((i = e(i).replace(r._radial_gradient, function (t, e, r) {
                                        if (((h = 'radial'), e && r)) {
                                            (f = n(e)), (p = n(r));
                                            var i = 2 * (p > 0.5) - 1;
                                            c(f - 0.5, 2) + c(p - 0.5, 2) > 0.25 && (p = a.sqrt(0.25 - c(f - 0.5, 2)) * i + 0.5) && 0.5 != p && (p = p.toFixed(5) - 1e-5 * i);
                                        }
                                        return l;
                                    })),
                                    (i = i.split(/\s*\-\s*/)),
                                    'linear' == h)
                                ) {
                                    var m = i.shift();
                                    if (((m = -n(m)), isNaN(m))) return null;
                                    var b = [0, 0, a.cos(r.rad(m)), a.sin(r.rad(m))],
                                        _ = 1 / (s(o(b[2]), o(b[3])) || 1);
                                    (b[2] *= _), (b[3] *= _), b[2] < 0 && ((b[0] = -b[2]), (b[2] = 0)), b[3] < 0 && ((b[1] = -b[3]), (b[3] = 0));
                                }
                                var w = r._parseDots(i);
                                if (!w) return null;
                                if (
                                    ((u = u.replace(/[\(\)\s,\xb0#]/g, '_')), t.gradient && u != t.gradient.id && (g.defs.removeChild(t.gradient), delete t.gradient), !t.gradient)
                                ) {
                                    (y = x(h + 'Gradient', { id: u })),
                                        (t.gradient = y),
                                        x(y, 'radial' == h ? { fx: f, fy: p } : { x1: b[0], y1: b[1], x2: b[2], y2: b[3], gradientTransform: t.matrix.invert() }),
                                        g.defs.appendChild(y);
                                    for (var E = 0, C = w.length; E < C; E++)
                                        y.appendChild(x('stop', { offset: w[E].offset ? w[E].offset : E ? '100%' : '0%', 'stop-color': w[E].color || '#fff' }));
                                }
                            }
                            return x(d, { fill: 'url(#' + u + ')', opacity: 1, 'fill-opacity': 1 }), (v.fill = l), (v.opacity = 1), (v.fillOpacity = 1), 1;
                        },
                        y = function (t) {
                            var e = t.getBBox(1);
                            x(t.pattern, { patternTransform: t.matrix.invert() + ' translate(' + e.x + ',' + e.y + ')' });
                        },
                        m = function (n, i, a) {
                            if ('path' == n.type) {
                                for (
                                    var s,
                                        o,
                                        c,
                                        h,
                                        u,
                                        f = e(i).toLowerCase().split('-'),
                                        p = n.paper,
                                        v = a ? 'end' : 'start',
                                        y = n.node,
                                        m = n.attrs,
                                        b = m['stroke-width'],
                                        _ = f.length,
                                        w = 'classic',
                                        E = 3,
                                        C = 3,
                                        k = 5;
                                    _--;

                                )
                                    switch (f[_]) {
                                        case 'block':
                                        case 'classic':
                                        case 'oval':
                                        case 'diamond':
                                        case 'open':
                                        case 'none':
                                            w = f[_];
                                            break;
                                        case 'wide':
                                            C = 5;
                                            break;
                                        case 'narrow':
                                            C = 2;
                                            break;
                                        case 'long':
                                            E = 5;
                                            break;
                                        case 'short':
                                            E = 2;
                                    }
                                if (
                                    ('open' == w
                                        ? ((E += 2), (C += 2), (k += 2), (c = 1), (h = a ? 4 : 1), (u = { fill: 'none', stroke: m.stroke }))
                                        : ((h = c = E / 2), (u = { fill: m.stroke, stroke: 'none' })),
                                    n._.arrows
                                        ? a
                                            ? (n._.arrows.endPath && g[n._.arrows.endPath]--, n._.arrows.endMarker && g[n._.arrows.endMarker]--)
                                            : (n._.arrows.startPath && g[n._.arrows.startPath]--, n._.arrows.startMarker && g[n._.arrows.startMarker]--)
                                        : (n._.arrows = {}),
                                    'none' != w)
                                ) {
                                    var S = 'raphael-marker-' + w,
                                        A = 'raphael-marker-' + v + w + E + C;
                                    r._g.doc.getElementById(S) ? g[S]++ : (p.defs.appendChild(x(x('path'), { 'stroke-linecap': 'round', d: d[w], id: S })), (g[S] = 1));
                                    var B,
                                        N = r._g.doc.getElementById(A);
                                    N
                                        ? (g[A]++, (B = N.getElementsByTagName('use')[0]))
                                        : ((N = x(x('marker'), { id: A, markerHeight: C, markerWidth: E, orient: 'auto', refX: h, refY: C / 2 })),
                                          (B = x(x('use'), {
                                              'xlink:href': '#' + S,
                                              transform: (a ? 'rotate(180 ' + E / 2 + ' ' + C / 2 + ') ' : l) + 'scale(' + E / k + ',' + C / k + ')',
                                              'stroke-width': (1 / ((E / k + C / k) / 2)).toFixed(4),
                                          })),
                                          N.appendChild(B),
                                          p.defs.appendChild(N),
                                          (g[A] = 1)),
                                        x(B, u);
                                    var O = c * ('diamond' != w && 'oval' != w);
                                    a
                                        ? ((s = n._.arrows.startdx * b || 0), (o = r.getTotalLength(m.path) - O * b))
                                        : ((s = O * b), (o = r.getTotalLength(m.path) - (n._.arrows.enddx * b || 0))),
                                        (u = {}),
                                        (u['marker-' + v] = 'url(#' + A + ')'),
                                        (o || s) && (u.d = r.getSubpath(m.path, s, o)),
                                        x(y, u),
                                        (n._.arrows[v + 'Path'] = S),
                                        (n._.arrows[v + 'Marker'] = A),
                                        (n._.arrows[v + 'dx'] = O),
                                        (n._.arrows[v + 'Type'] = w),
                                        (n._.arrows[v + 'String'] = i);
                                } else
                                    a
                                        ? ((s = n._.arrows.startdx * b || 0), (o = r.getTotalLength(m.path) - s))
                                        : ((s = 0), (o = r.getTotalLength(m.path) - (n._.arrows.enddx * b || 0))),
                                        n._.arrows[v + 'Path'] && x(y, { d: r.getSubpath(m.path, s, o) }),
                                        delete n._.arrows[v + 'Path'],
                                        delete n._.arrows[v + 'Marker'],
                                        delete n._.arrows[v + 'dx'],
                                        delete n._.arrows[v + 'Type'],
                                        delete n._.arrows[v + 'String'];
                                for (u in g)
                                    if (g[t](u) && !g[u]) {
                                        var T = r._g.doc.getElementById(u);
                                        T && T.parentNode.removeChild(T);
                                    }
                            }
                        },
                        b = {
                            '': [0],
                            none: [0],
                            '-': [3, 1],
                            '.': [1, 1],
                            '-.': [3, 1, 1, 1],
                            '-..': [3, 1, 1, 1, 1, 1],
                            '. ': [1, 3],
                            '- ': [4, 3],
                            '--': [8, 3],
                            '- .': [4, 3, 1, 3],
                            '--.': [8, 3, 1, 3],
                            '--..': [8, 3, 1, 3, 1, 3],
                        },
                        _ = function (t, r, n) {
                            if ((r = b[e(r).toLowerCase()])) {
                                for (
                                    var i = t.attrs['stroke-width'] || '1',
                                        a = { round: i, square: i, butt: 0 }[t.attrs['stroke-linecap'] || n['stroke-linecap']] || 0,
                                        s = [],
                                        o = r.length;
                                    o--;

                                )
                                    s[o] = r[o] * i + (o % 2 ? 1 : -1) * a;
                                x(t.node, { 'stroke-dasharray': s.join(',') });
                            }
                        },
                        w = function (n, a) {
                            var c = n.node,
                                u = n.attrs,
                                f = c.style.visibility;
                            c.style.visibility = 'hidden';
                            for (var d in a)
                                if (a[t](d)) {
                                    if (!r._availableAttrs[t](d)) continue;
                                    var g = a[d];
                                    switch (((u[d] = g), d)) {
                                        case 'blur':
                                            n.blur(g);
                                            break;
                                        case 'title':
                                            var b = c.getElementsByTagName('title');
                                            if (b.length && (b = b[0])) b.firstChild.nodeValue = g;
                                            else {
                                                b = x('title');
                                                var w = r._g.doc.createTextNode(g);
                                                b.appendChild(w), c.appendChild(b);
                                            }
                                            break;
                                        case 'href':
                                        case 'target':
                                            var C = c.parentNode;
                                            if ('a' != C.tagName.toLowerCase()) {
                                                var k = x('a');
                                                C.insertBefore(k, c), k.appendChild(c), (C = k);
                                            }
                                            'target' == d ? C.setAttributeNS(p, 'show', 'blank' == g ? 'new' : g) : C.setAttributeNS(p, d, g);
                                            break;
                                        case 'cursor':
                                            c.style.cursor = g;
                                            break;
                                        case 'transform':
                                            n.transform(g);
                                            break;
                                        case 'arrow-start':
                                            m(n, g);
                                            break;
                                        case 'arrow-end':
                                            m(n, g, 1);
                                            break;
                                        case 'clip-rect':
                                            var S = e(g).split(h);
                                            if (4 == S.length) {
                                                n.clip && n.clip.parentNode.parentNode.removeChild(n.clip.parentNode);
                                                var A = x('clipPath'),
                                                    B = x('rect');
                                                (A.id = r.createUUID()),
                                                    x(B, { x: S[0], y: S[1], width: S[2], height: S[3] }),
                                                    A.appendChild(B),
                                                    n.paper.defs.appendChild(A),
                                                    x(c, { 'clip-path': 'url(#' + A.id + ')' }),
                                                    (n.clip = B);
                                            }
                                            if (!g) {
                                                var N = c.getAttribute('clip-path');
                                                if (N) {
                                                    var O = r._g.doc.getElementById(N.replace(/(^url\(#|\)$)/g, l));
                                                    O && O.parentNode.removeChild(O), x(c, { 'clip-path': l }), delete n.clip;
                                                }
                                            }
                                            break;
                                        case 'path':
                                            'path' == n.type &&
                                                (x(c, { d: g ? (u.path = r._pathToAbsolute(g)) : 'M0,0' }),
                                                (n._.dirty = 1),
                                                n._.arrows &&
                                                    ('startString' in n._.arrows && m(n, n._.arrows.startString), 'endString' in n._.arrows && m(n, n._.arrows.endString, 1)));
                                            break;
                                        case 'width':
                                            if ((c.setAttribute(d, g), (n._.dirty = 1), !u.fx)) break;
                                            (d = 'x'), (g = u.x);
                                        case 'x':
                                            u.fx && (g = -u.x - (u.width || 0));
                                        case 'rx':
                                            if ('rx' == d && 'rect' == n.type) break;
                                        case 'cx':
                                            c.setAttribute(d, g), n.pattern && y(n), (n._.dirty = 1);
                                            break;
                                        case 'height':
                                            if ((c.setAttribute(d, g), (n._.dirty = 1), !u.fy)) break;
                                            (d = 'y'), (g = u.y);
                                        case 'y':
                                            u.fy && (g = -u.y - (u.height || 0));
                                        case 'ry':
                                            if ('ry' == d && 'rect' == n.type) break;
                                        case 'cy':
                                            c.setAttribute(d, g), n.pattern && y(n), (n._.dirty = 1);
                                            break;
                                        case 'r':
                                            'rect' == n.type ? x(c, { rx: g, ry: g }) : c.setAttribute(d, g), (n._.dirty = 1);
                                            break;
                                        case 'src':
                                            'image' == n.type && c.setAttributeNS(p, 'href', g);
                                            break;
                                        case 'stroke-width':
                                            (1 == n._.sx && 1 == n._.sy) || (g /= s(o(n._.sx), o(n._.sy)) || 1),
                                                n.paper._vbSize && (g *= n.paper._vbSize),
                                                c.setAttribute(d, g),
                                                u['stroke-dasharray'] && _(n, u['stroke-dasharray'], a),
                                                n._.arrows &&
                                                    ('startString' in n._.arrows && m(n, n._.arrows.startString), 'endString' in n._.arrows && m(n, n._.arrows.endString, 1));
                                            break;
                                        case 'stroke-dasharray':
                                            _(n, g, a);
                                            break;
                                        case 'fill':
                                            var T = e(g).match(r._ISURL);
                                            if (T) {
                                                A = x('pattern');
                                                var R = x('image');
                                                (A.id = r.createUUID()),
                                                    x(A, { x: 0, y: 0, patternUnits: 'userSpaceOnUse', height: 1, width: 1 }),
                                                    x(R, { x: 0, y: 0, 'xlink:href': T[1] }),
                                                    A.appendChild(R),
                                                    (function (t) {
                                                        r._preload(T[1], function () {
                                                            var e = this.offsetWidth,
                                                                r = this.offsetHeight;
                                                            x(t, { width: e, height: r }), x(R, { width: e, height: r }), n.paper.safari();
                                                        });
                                                    })(A),
                                                    n.paper.defs.appendChild(A),
                                                    x(c, { fill: 'url(#' + A.id + ')' }),
                                                    (n.pattern = A),
                                                    n.pattern && y(n);
                                                break;
                                            }
                                            var I = r.getRGB(g);
                                            if (I.error) {
                                                if (('circle' == n.type || 'ellipse' == n.type || 'r' != e(g).charAt()) && v(n, g)) {
                                                    if ('opacity' in u || 'fill-opacity' in u) {
                                                        var M = r._g.doc.getElementById(c.getAttribute('fill').replace(/^url\(#|\)$/g, l));
                                                        if (M) {
                                                            var F = M.getElementsByTagName('stop');
                                                            x(F[F.length - 1], {
                                                                'stop-opacity': ('opacity' in u ? u.opacity : 1) * ('fill-opacity' in u ? u['fill-opacity'] : 1),
                                                            });
                                                        }
                                                    }
                                                    (u.gradient = g), (u.fill = 'none');
                                                    break;
                                                }
                                            } else
                                                delete a.gradient,
                                                    delete u.gradient,
                                                    !r.is(u.opacity, 'undefined') && r.is(a.opacity, 'undefined') && x(c, { opacity: u.opacity }),
                                                    !r.is(u['fill-opacity'], 'undefined') && r.is(a['fill-opacity'], 'undefined') && x(c, { 'fill-opacity': u['fill-opacity'] });
                                            I[t]('opacity') && x(c, { 'fill-opacity': I.opacity > 1 ? I.opacity / 100 : I.opacity });
                                        case 'stroke':
                                            (I = r.getRGB(g)),
                                                c.setAttribute(d, I.hex),
                                                'stroke' == d && I[t]('opacity') && x(c, { 'stroke-opacity': I.opacity > 1 ? I.opacity / 100 : I.opacity }),
                                                'stroke' == d &&
                                                    n._.arrows &&
                                                    ('startString' in n._.arrows && m(n, n._.arrows.startString), 'endString' in n._.arrows && m(n, n._.arrows.endString, 1));
                                            break;
                                        case 'gradient':
                                            ('circle' == n.type || 'ellipse' == n.type || 'r' != e(g).charAt()) && v(n, g);
                                            break;
                                        case 'opacity':
                                            u.gradient && !u[t]('stroke-opacity') && x(c, { 'stroke-opacity': g > 1 ? g / 100 : g });
                                        case 'fill-opacity':
                                            if (u.gradient) {
                                                (M = r._g.doc.getElementById(c.getAttribute('fill').replace(/^url\(#|\)$/g, l))),
                                                    M && ((F = M.getElementsByTagName('stop')), x(F[F.length - 1], { 'stop-opacity': g }));
                                                break;
                                            }
                                        default:
                                            'font-size' == d && (g = i(g, 10) + 'px');
                                            var D = d.replace(/(\-.)/g, function (t) {
                                                return t.substring(1).toUpperCase();
                                            });
                                            (c.style[D] = g), (n._.dirty = 1), c.setAttribute(d, g);
                                    }
                                }
                            E(n, a), (c.style.visibility = f);
                        },
                        E = function (n, a) {
                            if ('text' == n.type && (a[t]('text') || a[t]('font') || a[t]('font-size') || a[t]('x') || a[t]('y'))) {
                                var s = n.attrs,
                                    o = n.node,
                                    c = o.firstChild ? i(r._g.doc.defaultView.getComputedStyle(o.firstChild, l).getPropertyValue('font-size'), 10) : 10;
                                if (a[t]('text')) {
                                    for (s.text = a.text; o.firstChild; ) o.removeChild(o.firstChild);
                                    for (var h, u = e(a.text).split('\n'), f = [], p = 0, d = u.length; p < d; p++)
                                        (h = x('tspan')), p && x(h, { dy: 1.2 * c, x: s.x }), h.appendChild(r._g.doc.createTextNode(u[p])), o.appendChild(h), (f[p] = h);
                                } else for (f = o.getElementsByTagName('tspan'), p = 0, d = f.length; p < d; p++) p ? x(f[p], { dy: 1.2 * c, x: s.x }) : x(f[0], { dy: 0 });
                                x(o, { x: s.x, y: s.y }), (n._.dirty = 1);
                                var g = n._getBBox(),
                                    v = s.y - (g.y + g.height / 2);
                                v && r.is(v, 'finite') && x(f[0], { dy: v });
                            }
                        },
                        C = function (t, e) {
                            (this[0] = this.node = t),
                                (t.raphael = !0),
                                (this.id = r._oid++),
                                (t.raphaelid = this.id),
                                (this.matrix = r.matrix()),
                                (this.realPath = null),
                                (this.paper = e),
                                (this.attrs = this.attrs || {}),
                                (this._ = { transform: [], sx: 1, sy: 1, deg: 0, dx: 0, dy: 0, dirty: 1 }),
                                !e.bottom && (e.bottom = this),
                                (this.prev = e.top),
                                e.top && (e.top.next = this),
                                (e.top = this),
                                (this.next = null);
                        },
                        k = r.el;
                    (C.prototype = k),
                        (k.constructor = C),
                        (r._engine.path = function (t, e) {
                            var r = x('path');
                            e.canvas && e.canvas.appendChild(r);
                            var n = new C(r, e);
                            return (n.type = 'path'), w(n, { fill: 'none', stroke: '#000', path: t }), n;
                        }),
                        (k.rotate = function (t, r, i) {
                            if (this.removed) return this;
                            if (((t = e(t).split(h)), t.length - 1 && ((r = n(t[1])), (i = n(t[2]))), (t = n(t[0])), null == i && (r = i), null == r || null == i)) {
                                var a = this.getBBox(1);
                                (r = a.x + a.width / 2), (i = a.y + a.height / 2);
                            }
                            return this.transform(this._.transform.concat([['r', t, r, i]])), this;
                        }),
                        (k.scale = function (t, r, i, a) {
                            if (this.removed) return this;
                            if (
                                ((t = e(t).split(h)),
                                t.length - 1 && ((r = n(t[1])), (i = n(t[2])), (a = n(t[3]))),
                                (t = n(t[0])),
                                null == r && (r = t),
                                null == a && (i = a),
                                null == i || null == a)
                            )
                                var s = this.getBBox(1);
                            return (
                                (i = null == i ? s.x + s.width / 2 : i),
                                (a = null == a ? s.y + s.height / 2 : a),
                                this.transform(this._.transform.concat([['s', t, r, i, a]])),
                                this
                            );
                        }),
                        (k.translate = function (t, r) {
                            return this.removed
                                ? this
                                : ((t = e(t).split(h)),
                                  t.length - 1 && (r = n(t[1])),
                                  (t = n(t[0]) || 0),
                                  (r = +r || 0),
                                  this.transform(this._.transform.concat([['t', t, r]])),
                                  this);
                        }),
                        (k.transform = function (e) {
                            var n = this._;
                            if (null == e) return n.transform;
                            if (
                                (r._extractTransform(this, e),
                                this.clip && x(this.clip, { transform: this.matrix.invert() }),
                                this.pattern && y(this),
                                this.node && x(this.node, { transform: this.matrix }),
                                1 != n.sx || 1 != n.sy)
                            ) {
                                var i = this.attrs[t]('stroke-width') ? this.attrs['stroke-width'] : 1;
                                this.attr({ 'stroke-width': i });
                            }
                            return this;
                        }),
                        (k.hide = function () {
                            return !this.removed && this.paper.safari((this.node.style.display = 'none')), this;
                        }),
                        (k.show = function () {
                            return !this.removed && this.paper.safari((this.node.style.display = '')), this;
                        }),
                        (k.remove = function () {
                            if (!this.removed && this.node.parentNode) {
                                var t = this.paper;
                                t.__set__ && t.__set__.exclude(this),
                                    u.unbind('raphael.*.*.' + this.id),
                                    this.gradient && t.defs.removeChild(this.gradient),
                                    r._tear(this, t),
                                    'a' == this.node.parentNode.tagName.toLowerCase()
                                        ? this.node.parentNode.parentNode.removeChild(this.node.parentNode)
                                        : this.node.parentNode.removeChild(this.node);
                                for (var e in this) this[e] = 'function' == typeof this[e] ? r._removedFactory(e) : null;
                                this.removed = !0;
                            }
                        }),
                        (k._getBBox = function () {
                            if ('none' == this.node.style.display) {
                                this.show();
                                var t = !0;
                            }
                            var e = {};
                            try {
                                e = this.node.getBBox();
                            } catch (t) {
                            } finally {
                                e = e || {};
                            }
                            return t && this.hide(), e;
                        }),
                        (k.attr = function (e, n) {
                            if (this.removed) return this;
                            if (null == e) {
                                var i = {};
                                for (var a in this.attrs) this.attrs[t](a) && (i[a] = this.attrs[a]);
                                return i.gradient && 'none' == i.fill && (i.fill = i.gradient) && delete i.gradient, (i.transform = this._.transform), i;
                            }
                            if (null == n && r.is(e, 'string')) {
                                if ('fill' == e && 'none' == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                                if ('transform' == e) return this._.transform;
                                for (var s = e.split(h), o = {}, c = 0, l = s.length; c < l; c++)
                                    (e = s[c]),
                                        e in this.attrs
                                            ? (o[e] = this.attrs[e])
                                            : r.is(this.paper.customAttributes[e], 'function')
                                            ? (o[e] = this.paper.customAttributes[e].def)
                                            : (o[e] = r._availableAttrs[e]);
                                return l - 1 ? o : o[s[0]];
                            }
                            if (null == n && r.is(e, 'array')) {
                                for (o = {}, c = 0, l = e.length; c < l; c++) o[e[c]] = this.attr(e[c]);
                                return o;
                            }
                            if (null != n) {
                                var f = {};
                                f[e] = n;
                            } else null != e && r.is(e, 'object') && (f = e);
                            for (var p in f) u('raphael.attr.' + p + '.' + this.id, this, f[p]);
                            for (p in this.paper.customAttributes)
                                if (this.paper.customAttributes[t](p) && f[t](p) && r.is(this.paper.customAttributes[p], 'function')) {
                                    var d = this.paper.customAttributes[p].apply(this, [].concat(f[p]));
                                    this.attrs[p] = f[p];
                                    for (var g in d) d[t](g) && (f[g] = d[g]);
                                }
                            return w(this, f), this;
                        }),
                        (k.toFront = function () {
                            if (this.removed) return this;
                            'a' == this.node.parentNode.tagName.toLowerCase()
                                ? this.node.parentNode.parentNode.appendChild(this.node.parentNode)
                                : this.node.parentNode.appendChild(this.node);
                            var t = this.paper;
                            return t.top != this && r._tofront(this, t), this;
                        }),
                        (k.toBack = function () {
                            if (this.removed) return this;
                            var t = this.node.parentNode;
                            'a' == t.tagName.toLowerCase()
                                ? t.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild)
                                : t.firstChild != this.node && t.insertBefore(this.node, this.node.parentNode.firstChild),
                                r._toback(this, this.paper);
                            this.paper;
                            return this;
                        }),
                        (k.insertAfter = function (t) {
                            if (this.removed) return this;
                            var e = t.node || t[t.length - 1].node;
                            return (
                                e.nextSibling ? e.parentNode.insertBefore(this.node, e.nextSibling) : e.parentNode.appendChild(this.node), r._insertafter(this, t, this.paper), this
                            );
                        }),
                        (k.insertBefore = function (t) {
                            if (this.removed) return this;
                            var e = t.node || t[0].node;
                            return e.parentNode.insertBefore(this.node, e), r._insertbefore(this, t, this.paper), this;
                        }),
                        (k.blur = function (t) {
                            var e = this;
                            if (0 != +t) {
                                var n = x('filter'),
                                    i = x('feGaussianBlur');
                                (e.attrs.blur = t),
                                    (n.id = r.createUUID()),
                                    x(i, { stdDeviation: +t || 1.5 }),
                                    n.appendChild(i),
                                    e.paper.defs.appendChild(n),
                                    (e._blur = n),
                                    x(e.node, { filter: 'url(#' + n.id + ')' });
                            } else e._blur && (e._blur.parentNode.removeChild(e._blur), delete e._blur, delete e.attrs.blur), e.node.removeAttribute('filter');
                            return e;
                        }),
                        (r._engine.circle = function (t, e, r, n) {
                            var i = x('circle');
                            t.canvas && t.canvas.appendChild(i);
                            var a = new C(i, t);
                            return (a.attrs = { cx: e, cy: r, r: n, fill: 'none', stroke: '#000' }), (a.type = 'circle'), x(i, a.attrs), a;
                        }),
                        (r._engine.rect = function (t, e, r, n, i, a) {
                            var s = x('rect');
                            t.canvas && t.canvas.appendChild(s);
                            var o = new C(s, t);
                            return (
                                (o.attrs = { x: e, y: r, width: n, height: i, r: a || 0, rx: a || 0, ry: a || 0, fill: 'none', stroke: '#000' }),
                                (o.type = 'rect'),
                                x(s, o.attrs),
                                o
                            );
                        }),
                        (r._engine.ellipse = function (t, e, r, n, i) {
                            var a = x('ellipse');
                            t.canvas && t.canvas.appendChild(a);
                            var s = new C(a, t);
                            return (s.attrs = { cx: e, cy: r, rx: n, ry: i, fill: 'none', stroke: '#000' }), (s.type = 'ellipse'), x(a, s.attrs), s;
                        }),
                        (r._engine.image = function (t, e, r, n, i, a) {
                            var s = x('image');
                            x(s, { x: r, y: n, width: i, height: a, preserveAspectRatio: 'none' }), s.setAttributeNS(p, 'href', e), t.canvas && t.canvas.appendChild(s);
                            var o = new C(s, t);
                            return (o.attrs = { x: r, y: n, width: i, height: a, src: e }), (o.type = 'image'), o;
                        }),
                        (r._engine.text = function (t, e, n, i) {
                            var a = x('text');
                            t.canvas && t.canvas.appendChild(a);
                            var s = new C(a, t);
                            return (
                                (s.attrs = { x: e, y: n, 'text-anchor': 'middle', text: i, font: r._availableAttrs.font, stroke: 'none', fill: '#000' }),
                                (s.type = 'text'),
                                w(s, s.attrs),
                                s
                            );
                        }),
                        (r._engine.setSize = function (t, e) {
                            return (
                                (this.width = t || this.width),
                                (this.height = e || this.height),
                                this.canvas.setAttribute('width', this.width),
                                this.canvas.setAttribute('height', this.height),
                                this._viewBox && this.setViewBox.apply(this, this._viewBox),
                                this
                            );
                        }),
                        (r._engine.create = function () {
                            var t = r._getContainer.apply(0, arguments),
                                e = t && t.container,
                                n = t.x,
                                i = t.y,
                                a = t.width,
                                s = t.height;
                            if (!e) throw new Error('SVG container not found.');
                            var o,
                                c = x('svg'),
                                h = 'overflow:hidden;';
                            return (
                                (n = n || 0),
                                (i = i || 0),
                                (a = a || 512),
                                (s = s || 342),
                                x(c, { height: s, version: 1.1, width: a, xmlns: 'http://www.w3.org/2000/svg' }),
                                1 == e
                                    ? ((c.style.cssText = h + 'position:absolute;left:' + n + 'px;top:' + i + 'px'), r._g.doc.body.appendChild(c), (o = 1))
                                    : ((c.style.cssText = h + 'position:relative'), e.firstChild ? e.insertBefore(c, e.firstChild) : e.appendChild(c)),
                                (e = new r._Paper()),
                                (e.width = a),
                                (e.height = s),
                                (e.canvas = c),
                                e.clear(),
                                (e._left = e._top = 0),
                                o && (e.renderfix = function () {}),
                                e.renderfix(),
                                e
                            );
                        }),
                        (r._engine.setViewBox = function (t, e, r, n, i) {
                            u('raphael.setViewBox', this, this._viewBox, [t, e, r, n, i]);
                            var a,
                                o,
                                c = s(r / this.width, n / this.height),
                                h = this.top,
                                l = i ? 'xMidYMid meet' : 'xMinYMin';
                            for (
                                null == t
                                    ? (this._vbSize && (c = 1), delete this._vbSize, (a = '0 0 ' + this.width + f + this.height))
                                    : ((this._vbSize = c), (a = t + f + e + f + r + f + n)),
                                    x(this.canvas, { viewBox: a, preserveAspectRatio: l });
                                c && h;

                            )
                                (o = 'stroke-width' in h.attrs ? h.attrs['stroke-width'] : 1), h.attr({ 'stroke-width': o }), (h._.dirty = 1), (h._.dirtyT = 1), (h = h.prev);
                            return (this._viewBox = [t, e, r, n, !!i]), this;
                        }),
                        (r.prototype.renderfix = function () {
                            var t,
                                e = this.canvas,
                                r = e.style;
                            try {
                                t = e.getScreenCTM() || e.createSVGMatrix();
                            } catch (r) {
                                t = e.createSVGMatrix();
                            }
                            var n = -t.e % 1,
                                i = -t.f % 1;
                            (n || i) &&
                                (n && ((this._left = (this._left + n) % 1), (r.left = this._left + 'px')), i && ((this._top = (this._top + i) % 1), (r.top = this._top + 'px')));
                        }),
                        (r.prototype.clear = function () {
                            r.eve('raphael.clear', this);
                            for (var t = this.canvas; t.firstChild; ) t.removeChild(t.firstChild);
                            (this.bottom = this.top = null),
                                (this.desc = x('desc')).appendChild(r._g.doc.createTextNode('Created with Raphaël ' + r.version)),
                                t.appendChild(this.desc),
                                t.appendChild((this.defs = x('defs')));
                        }),
                        (r.prototype.remove = function () {
                            u('raphael.remove', this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
                            for (var t in this) this[t] = 'function' == typeof this[t] ? r._removedFactory(t) : null;
                        });
                    var S = r.st;
                    for (var A in k)
                        k[t](A) &&
                            !S[t](A) &&
                            (S[A] = (function (t) {
                                return function () {
                                    var e = arguments;
                                    return this.forEach(function (r) {
                                        r[t].apply(r, e);
                                    });
                                };
                            })(A));
                }
            })(),
            (function () {
                if (r.vml) {
                    var t = 'hasOwnProperty',
                        e = String,
                        n = parseFloat,
                        i = Math,
                        a = i.round,
                        s = i.max,
                        o = i.min,
                        c = i.abs,
                        h = /[, ]+/,
                        u = r.eve,
                        l = ' ',
                        f = '',
                        p = { M: 'm', L: 'l', C: 'c', Z: 'x', m: 't', l: 'r', c: 'v', z: 'x' },
                        d = /([clmz]),?([^clmz]*)/gi,
                        g = / progid:\S+Blur\([^\)]+\)/g,
                        x = /-?[^,\s-]+/g,
                        v = 'position:absolute;left:0;top:0;width:1px;height:1px',
                        y = 21600,
                        m = { path: 1, rect: 1, image: 1 },
                        b = { circle: 1, ellipse: 1 },
                        _ = function (t) {
                            var n = /[ahqstv]/gi,
                                i = r._pathToAbsolute;
                            if ((e(t).match(n) && (i = r._path2curve), (n = /[clmz]/g), i == r._pathToAbsolute && !e(t).match(n))) {
                                var s = e(t).replace(d, function (t, e, r) {
                                    var n = [],
                                        i = 'm' == e.toLowerCase(),
                                        s = p[e];
                                    return (
                                        r.replace(x, function (t) {
                                            i && 2 == n.length && ((s += n + p['m' == e ? 'l' : 'L']), (n = [])), n.push(a(t * y));
                                        }),
                                        s + n
                                    );
                                });
                                return s;
                            }
                            var o,
                                c,
                                h = i(t);
                            s = [];
                            for (var u = 0, g = h.length; u < g; u++) {
                                (o = h[u]), (c = h[u][0].toLowerCase()), 'z' == c && (c = 'x');
                                for (var v = 1, m = o.length; v < m; v++) c += a(o[v] * y) + (v != m - 1 ? ',' : f);
                                s.push(c);
                            }
                            return s.join(l);
                        },
                        w = function (t, e, n) {
                            var i = r.matrix();
                            return i.rotate(-t, 0.5, 0.5), { dx: i.x(e, n), dy: i.y(e, n) };
                        },
                        E = function (t, e, r, n, i, a) {
                            var s = t._,
                                o = t.matrix,
                                h = s.fillpos,
                                u = t.node,
                                f = u.style,
                                p = 1,
                                d = '',
                                g = y / e,
                                x = y / r;
                            if (((f.visibility = 'hidden'), e && r)) {
                                if (((u.coordsize = c(g) + l + c(x)), (f.rotation = a * (e * r < 0 ? -1 : 1)), a)) {
                                    var v = w(a, n, i);
                                    (n = v.dx), (i = v.dy);
                                }
                                if ((e < 0 && (d += 'x'), r < 0 && (d += ' y') && (p = -1), (f.flip = d), (u.coordorigin = n * -g + l + i * -x), h || s.fillsize)) {
                                    var m = u.getElementsByTagName('fill');
                                    (m = m && m[0]),
                                        u.removeChild(m),
                                        h && ((v = w(a, o.x(h[0], h[1]), o.y(h[0], h[1]))), (m.position = v.dx * p + l + v.dy * p)),
                                        s.fillsize && (m.size = s.fillsize[0] * c(e) + l + s.fillsize[1] * c(r)),
                                        u.appendChild(m);
                                }
                                f.visibility = 'visible';
                            }
                        };
                    r.toString = function () {
                        return 'Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël ' + this.version;
                    };
                    var C = function (t, r, n) {
                            for (var i = e(r).toLowerCase().split('-'), a = n ? 'end' : 'start', s = i.length, o = 'classic', c = 'medium', h = 'medium'; s--; )
                                switch (i[s]) {
                                    case 'block':
                                    case 'classic':
                                    case 'oval':
                                    case 'diamond':
                                    case 'open':
                                    case 'none':
                                        o = i[s];
                                        break;
                                    case 'wide':
                                    case 'narrow':
                                        h = i[s];
                                        break;
                                    case 'long':
                                    case 'short':
                                        c = i[s];
                                }
                            var u = t.node.getElementsByTagName('stroke')[0];
                            (u[a + 'arrow'] = o), (u[a + 'arrowlength'] = c), (u[a + 'arrowwidth'] = h);
                        },
                        k = function (i, c) {
                            i.attrs = i.attrs || {};
                            var u = i.node,
                                p = i.attrs,
                                d = u.style,
                                g =
                                    m[i.type] &&
                                    (c.x != p.x ||
                                        c.y != p.y ||
                                        c.width != p.width ||
                                        c.height != p.height ||
                                        c.cx != p.cx ||
                                        c.cy != p.cy ||
                                        c.rx != p.rx ||
                                        c.ry != p.ry ||
                                        c.r != p.r),
                                x = b[i.type] && (p.cx != c.cx || p.cy != c.cy || p.r != c.r || p.rx != c.rx || p.ry != c.ry),
                                v = i;
                            for (var w in c) c[t](w) && (p[w] = c[w]);
                            if (
                                (g && ((p.path = r._getPath[i.type](i)), (i._.dirty = 1)),
                                c.href && (u.href = c.href),
                                c.title && (u.title = c.title),
                                c.target && (u.target = c.target),
                                c.cursor && (d.cursor = c.cursor),
                                'blur' in c && i.blur(c.blur),
                                ((c.path && 'path' == i.type) || g) &&
                                    ((u.path = _(~e(p.path).toLowerCase().indexOf('r') ? r._pathToAbsolute(p.path) : p.path)),
                                    'image' == i.type && ((i._.fillpos = [p.x, p.y]), (i._.fillsize = [p.width, p.height]), E(i, 1, 1, 0, 0, 0))),
                                'transform' in c && i.transform(c.transform),
                                x)
                            ) {
                                var k = +p.cx,
                                    A = +p.cy,
                                    B = +p.rx || +p.r || 0,
                                    O = +p.ry || +p.r || 0;
                                (u.path = r.format('ar{0},{1},{2},{3},{4},{1},{4},{1}x', a((k - B) * y), a((A - O) * y), a((k + B) * y), a((A + O) * y), a(k * y))),
                                    (i._.dirty = 1);
                            }
                            if ('clip-rect' in c) {
                                var T = e(c['clip-rect']).split(h);
                                if (4 == T.length) {
                                    (T[2] = +T[2] + +T[0]), (T[3] = +T[3] + +T[1]);
                                    var R = u.clipRect || r._g.doc.createElement('div'),
                                        I = R.style;
                                    (I.clip = r.format('rect({1}px {2}px {3}px {0}px)', T)),
                                        u.clipRect ||
                                            ((I.position = 'absolute'),
                                            (I.top = 0),
                                            (I.left = 0),
                                            (I.width = i.paper.width + 'px'),
                                            (I.height = i.paper.height + 'px'),
                                            u.parentNode.insertBefore(R, u),
                                            R.appendChild(u),
                                            (u.clipRect = R));
                                }
                                c['clip-rect'] || (u.clipRect && (u.clipRect.style.clip = 'auto'));
                            }
                            if (i.textpath) {
                                var M = i.textpath.style;
                                c.font && (M.font = c.font),
                                    c['font-family'] && (M.fontFamily = '"' + c['font-family'].split(',')[0].replace(/^['"]+|['"]+$/g, f) + '"'),
                                    c['font-size'] && (M.fontSize = c['font-size']),
                                    c['font-weight'] && (M.fontWeight = c['font-weight']),
                                    c['font-style'] && (M.fontStyle = c['font-style']);
                            }
                            if (
                                ('arrow-start' in c && C(v, c['arrow-start']),
                                'arrow-end' in c && C(v, c['arrow-end'], 1),
                                null != c.opacity ||
                                    null != c['stroke-width'] ||
                                    null != c.fill ||
                                    null != c.src ||
                                    null != c.stroke ||
                                    null != c['stroke-width'] ||
                                    null != c['stroke-opacity'] ||
                                    null != c['fill-opacity'] ||
                                    null != c['stroke-dasharray'] ||
                                    null != c['stroke-miterlimit'] ||
                                    null != c['stroke-linejoin'] ||
                                    null != c['stroke-linecap'])
                            ) {
                                var F = u.getElementsByTagName('fill');
                                if (
                                    ((F = F && F[0]),
                                    !F && (F = N('fill')),
                                    'image' == i.type && c.src && (F.src = c.src),
                                    c.fill && (F.on = !0),
                                    (null != F.on && 'none' != c.fill && null !== c.fill) || (F.on = !1),
                                    F.on && c.fill)
                                ) {
                                    var D = e(c.fill).match(r._ISURL);
                                    if (D) {
                                        F.parentNode == u && u.removeChild(F), (F.rotate = !0), (F.src = D[1]), (F.type = 'tile');
                                        var P = i.getBBox(1);
                                        (F.position = P.x + l + P.y),
                                            (i._.fillpos = [P.x, P.y]),
                                            r._preload(D[1], function () {
                                                i._.fillsize = [this.offsetWidth, this.offsetHeight];
                                            });
                                    } else
                                        (F.color = r.getRGB(c.fill).hex),
                                            (F.src = f),
                                            (F.type = 'solid'),
                                            r.getRGB(c.fill).error &&
                                                (v.type in { circle: 1, ellipse: 1 } || 'r' != e(c.fill).charAt()) &&
                                                S(v, c.fill, F) &&
                                                ((p.fill = 'none'), (p.gradient = c.fill), (F.rotate = !1));
                                }
                                if ('fill-opacity' in c || 'opacity' in c) {
                                    var L = ((+p['fill-opacity'] + 1 || 2) - 1) * ((+p.opacity + 1 || 2) - 1) * ((+r.getRGB(c.fill).o + 1 || 2) - 1);
                                    (L = o(s(L, 0), 1)), (F.opacity = L), F.src && (F.color = 'none');
                                }
                                u.appendChild(F);
                                var z = u.getElementsByTagName('stroke') && u.getElementsByTagName('stroke')[0],
                                    j = !1;
                                !z && (j = z = N('stroke')),
                                    ((c.stroke && 'none' != c.stroke) ||
                                        c['stroke-width'] ||
                                        null != c['stroke-opacity'] ||
                                        c['stroke-dasharray'] ||
                                        c['stroke-miterlimit'] ||
                                        c['stroke-linejoin'] ||
                                        c['stroke-linecap']) &&
                                        (z.on = !0),
                                    ('none' == c.stroke || null === c.stroke || null == z.on || 0 == c.stroke || 0 == c['stroke-width']) && (z.on = !1);
                                var U = r.getRGB(c.stroke);
                                z.on && c.stroke && (z.color = U.hex), (L = ((+p['stroke-opacity'] + 1 || 2) - 1) * ((+p.opacity + 1 || 2) - 1) * ((+U.o + 1 || 2) - 1));
                                var X = 0.75 * (n(c['stroke-width']) || 1);
                                if (
                                    ((L = o(s(L, 0), 1)),
                                    null == c['stroke-width'] && (X = p['stroke-width']),
                                    c['stroke-width'] && (z.weight = X),
                                    X && X < 1 && (L *= X) && (z.weight = 1),
                                    (z.opacity = L),
                                    c['stroke-linejoin'] && (z.joinstyle = c['stroke-linejoin'] || 'miter'),
                                    (z.miterlimit = c['stroke-miterlimit'] || 8),
                                    c['stroke-linecap'] && (z.endcap = 'butt' == c['stroke-linecap'] ? 'flat' : 'square' == c['stroke-linecap'] ? 'square' : 'round'),
                                    'stroke-dasharray' in c)
                                ) {
                                    var G = {
                                        '-': 'shortdash',
                                        '.': 'shortdot',
                                        '-.': 'shortdashdot',
                                        '-..': 'shortdashdotdot',
                                        '. ': 'dot',
                                        '- ': 'dash',
                                        '--': 'longdash',
                                        '- .': 'dashdot',
                                        '--.': 'longdashdot',
                                        '--..': 'longdashdotdot',
                                    };
                                    z.dashstyle = G[t](c['stroke-dasharray']) ? G[c['stroke-dasharray']] : f;
                                }
                                j && u.appendChild(z);
                            }
                            if ('text' == v.type) {
                                v.paper.canvas.style.display = f;
                                var q = v.paper.span,
                                    H = p.font && p.font.match(/\d+(?:\.\d*)?(?=px)/);
                                (d = q.style),
                                    p.font && (d.font = p.font),
                                    p['font-family'] && (d.fontFamily = p['font-family']),
                                    p['font-weight'] && (d.fontWeight = p['font-weight']),
                                    p['font-style'] && (d.fontStyle = p['font-style']),
                                    (H = n(p['font-size'] || (H && H[0])) || 10),
                                    (d.fontSize = 100 * H + 'px'),
                                    v.textpath.string && (q.innerHTML = e(v.textpath.string).replace(/</g, '&#60;').replace(/&/g, '&#38;').replace(/\n/g, '<br>'));
                                var W = q.getBoundingClientRect();
                                (v.W = p.w = (W.right - W.left) / 100),
                                    (v.H = p.h = (W.bottom - W.top) / 100),
                                    (v.X = p.x),
                                    (v.Y = p.y + v.H / 2),
                                    ('x' in c || 'y' in c) && (v.path.v = r.format('m{0},{1}l{2},{1}', a(p.x * y), a(p.y * y), a(p.x * y) + 1));
                                for (var V = ['x', 'y', 'text', 'font', 'font-family', 'font-weight', 'font-style', 'font-size'], Q = 0, Y = V.length; Q < Y; Q++)
                                    if (V[Q] in c) {
                                        v._.dirty = 1;
                                        break;
                                    }
                                switch (p['text-anchor']) {
                                    case 'start':
                                        (v.textpath.style['v-text-align'] = 'left'), (v.bbx = v.W / 2);
                                        break;
                                    case 'end':
                                        (v.textpath.style['v-text-align'] = 'right'), (v.bbx = -v.W / 2);
                                        break;
                                    default:
                                        (v.textpath.style['v-text-align'] = 'center'), (v.bbx = 0);
                                }
                                v.textpath.style['v-text-kern'] = !0;
                            }
                        },
                        S = function (t, a, s) {
                            t.attrs = t.attrs || {};
                            var o = (t.attrs, Math.pow),
                                c = 'linear',
                                h = '.5 .5';
                            if (
                                ((t.attrs.gradient = a),
                                (a = e(a).replace(r._radial_gradient, function (t, e, r) {
                                    return (
                                        (c = 'radial'),
                                        e &&
                                            r &&
                                            ((e = n(e)),
                                            (r = n(r)),
                                            o(e - 0.5, 2) + o(r - 0.5, 2) > 0.25 && (r = i.sqrt(0.25 - o(e - 0.5, 2)) * (2 * (r > 0.5) - 1) + 0.5),
                                            (h = e + l + r)),
                                        f
                                    );
                                })),
                                (a = a.split(/\s*\-\s*/)),
                                'linear' == c)
                            ) {
                                var u = a.shift();
                                if (((u = -n(u)), isNaN(u))) return null;
                            }
                            var p = r._parseDots(a);
                            if (!p) return null;
                            if (((t = t.shape || t.node), p.length)) {
                                t.removeChild(s), (s.on = !0), (s.method = 'none'), (s.color = p[0].color), (s.color2 = p[p.length - 1].color);
                                for (var d = [], g = 0, x = p.length; g < x; g++) p[g].offset && d.push(p[g].offset + l + p[g].color);
                                (s.colors = d.length ? d.join() : '0% ' + s.color),
                                    'radial' == c
                                        ? ((s.type = 'gradientTitle'), (s.focus = '100%'), (s.focussize = '0 0'), (s.focusposition = h), (s.angle = 0))
                                        : ((s.type = 'gradient'), (s.angle = (270 - u) % 360)),
                                    t.appendChild(s);
                            }
                            return 1;
                        },
                        A = function (t, e) {
                            (this[0] = this.node = t),
                                (t.raphael = !0),
                                (this.id = r._oid++),
                                (t.raphaelid = this.id),
                                (this.X = 0),
                                (this.Y = 0),
                                (this.attrs = {}),
                                (this.paper = e),
                                (this.matrix = r.matrix()),
                                (this._ = { transform: [], sx: 1, sy: 1, dx: 0, dy: 0, deg: 0, dirty: 1, dirtyT: 1 }),
                                !e.bottom && (e.bottom = this),
                                (this.prev = e.top),
                                e.top && (e.top.next = this),
                                (e.top = this),
                                (this.next = null);
                        },
                        B = r.el;
                    (A.prototype = B),
                        (B.constructor = A),
                        (B.transform = function (t) {
                            if (null == t) return this._.transform;
                            var n,
                                i = this.paper._viewBoxShift,
                                a = i ? 's' + [i.scale, i.scale] + '-1-1t' + [i.dx, i.dy] : f;
                            i && (n = t = e(t).replace(/\.{3}|\u2026/g, this._.transform || f)), r._extractTransform(this, a + t);
                            var s,
                                o = this.matrix.clone(),
                                c = this.skew,
                                h = this.node,
                                u = ~e(this.attrs.fill).indexOf('-'),
                                p = !e(this.attrs.fill).indexOf('url(');
                            if ((o.translate(1, 1), p || u || 'image' == this.type))
                                if (((c.matrix = '1 0 0 1'), (c.offset = '0 0'), (s = o.split()), (u && s.noRotation) || !s.isSimple)) {
                                    h.style.filter = o.toFilter();
                                    var d = this.getBBox(),
                                        g = this.getBBox(1),
                                        x = d.x - g.x,
                                        v = d.y - g.y;
                                    (h.coordorigin = x * -y + l + v * -y), E(this, 1, 1, x, v, 0);
                                } else (h.style.filter = f), E(this, s.scalex, s.scaley, s.dx, s.dy, s.rotate);
                            else (h.style.filter = f), (c.matrix = e(o)), (c.offset = o.offset());
                            return n && (this._.transform = n), this;
                        }),
                        (B.rotate = function (t, r, i) {
                            if (this.removed) return this;
                            if (null != t) {
                                if (((t = e(t).split(h)), t.length - 1 && ((r = n(t[1])), (i = n(t[2]))), (t = n(t[0])), null == i && (r = i), null == r || null == i)) {
                                    var a = this.getBBox(1);
                                    (r = a.x + a.width / 2), (i = a.y + a.height / 2);
                                }
                                return (this._.dirtyT = 1), this.transform(this._.transform.concat([['r', t, r, i]])), this;
                            }
                        }),
                        (B.translate = function (t, r) {
                            return this.removed
                                ? this
                                : ((t = e(t).split(h)),
                                  t.length - 1 && (r = n(t[1])),
                                  (t = n(t[0]) || 0),
                                  (r = +r || 0),
                                  this._.bbox && ((this._.bbox.x += t), (this._.bbox.y += r)),
                                  this.transform(this._.transform.concat([['t', t, r]])),
                                  this);
                        }),
                        (B.scale = function (t, r, i, a) {
                            if (this.removed) return this;
                            if (
                                ((t = e(t).split(h)),
                                t.length - 1 && ((r = n(t[1])), (i = n(t[2])), (a = n(t[3])), isNaN(i) && (i = null), isNaN(a) && (a = null)),
                                (t = n(t[0])),
                                null == r && (r = t),
                                null == a && (i = a),
                                null == i || null == a)
                            )
                                var s = this.getBBox(1);
                            return (
                                (i = null == i ? s.x + s.width / 2 : i),
                                (a = null == a ? s.y + s.height / 2 : a),
                                this.transform(this._.transform.concat([['s', t, r, i, a]])),
                                (this._.dirtyT = 1),
                                this
                            );
                        }),
                        (B.hide = function () {
                            return !this.removed && (this.node.style.display = 'none'), this;
                        }),
                        (B.show = function () {
                            return !this.removed && (this.node.style.display = f), this;
                        }),
                        (B._getBBox = function () {
                            return this.removed ? {} : { x: this.X + (this.bbx || 0) - this.W / 2, y: this.Y - this.H, width: this.W, height: this.H };
                        }),
                        (B.remove = function () {
                            if (!this.removed && this.node.parentNode) {
                                this.paper.__set__ && this.paper.__set__.exclude(this),
                                    r.eve.unbind('raphael.*.*.' + this.id),
                                    r._tear(this, this.paper),
                                    this.node.parentNode.removeChild(this.node),
                                    this.shape && this.shape.parentNode.removeChild(this.shape);
                                for (var t in this) this[t] = 'function' == typeof this[t] ? r._removedFactory(t) : null;
                                this.removed = !0;
                            }
                        }),
                        (B.attr = function (e, n) {
                            if (this.removed) return this;
                            if (null == e) {
                                var i = {};
                                for (var a in this.attrs) this.attrs[t](a) && (i[a] = this.attrs[a]);
                                return i.gradient && 'none' == i.fill && (i.fill = i.gradient) && delete i.gradient, (i.transform = this._.transform), i;
                            }
                            if (null == n && r.is(e, 'string')) {
                                if ('fill' == e && 'none' == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                                for (var s = e.split(h), o = {}, c = 0, l = s.length; c < l; c++)
                                    (e = s[c]),
                                        e in this.attrs
                                            ? (o[e] = this.attrs[e])
                                            : r.is(this.paper.customAttributes[e], 'function')
                                            ? (o[e] = this.paper.customAttributes[e].def)
                                            : (o[e] = r._availableAttrs[e]);
                                return l - 1 ? o : o[s[0]];
                            }
                            if (this.attrs && null == n && r.is(e, 'array')) {
                                for (o = {}, c = 0, l = e.length; c < l; c++) o[e[c]] = this.attr(e[c]);
                                return o;
                            }
                            var f;
                            null != n && ((f = {}), (f[e] = n)), null == n && r.is(e, 'object') && (f = e);
                            for (var p in f) u('raphael.attr.' + p + '.' + this.id, this, f[p]);
                            if (f) {
                                for (p in this.paper.customAttributes)
                                    if (this.paper.customAttributes[t](p) && f[t](p) && r.is(this.paper.customAttributes[p], 'function')) {
                                        var d = this.paper.customAttributes[p].apply(this, [].concat(f[p]));
                                        this.attrs[p] = f[p];
                                        for (var g in d) d[t](g) && (f[g] = d[g]);
                                    }
                                f.text && 'text' == this.type && (this.textpath.string = f.text), k(this, f);
                            }
                            return this;
                        }),
                        (B.toFront = function () {
                            return !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && r._tofront(this, this.paper), this;
                        }),
                        (B.toBack = function () {
                            return this.removed
                                ? this
                                : (this.node.parentNode.firstChild != this.node &&
                                      (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), r._toback(this, this.paper)),
                                  this);
                        }),
                        (B.insertAfter = function (t) {
                            return this.removed
                                ? this
                                : (t.constructor == r.st.constructor && (t = t[t.length - 1]),
                                  t.node.nextSibling ? t.node.parentNode.insertBefore(this.node, t.node.nextSibling) : t.node.parentNode.appendChild(this.node),
                                  r._insertafter(this, t, this.paper),
                                  this);
                        }),
                        (B.insertBefore = function (t) {
                            return this.removed
                                ? this
                                : (t.constructor == r.st.constructor && (t = t[0]), t.node.parentNode.insertBefore(this.node, t.node), r._insertbefore(this, t, this.paper), this);
                        }),
                        (B.blur = function (t) {
                            var e = this.node.runtimeStyle,
                                n = e.filter;
                            return (
                                (n = n.replace(g, f)),
                                0 != +t
                                    ? ((this.attrs.blur = t),
                                      (e.filter = n + l + ' progid:DXImageTransform.Microsoft.Blur(pixelradius=' + (+t || 1.5) + ')'),
                                      (e.margin = r.format('-{0}px 0 0 -{0}px', a(+t || 1.5))))
                                    : ((e.filter = n), (e.margin = 0), delete this.attrs.blur),
                                this
                            );
                        }),
                        (r._engine.path = function (t, e) {
                            var r = N('shape');
                            (r.style.cssText = v), (r.coordsize = y + l + y), (r.coordorigin = e.coordorigin);
                            var n = new A(r, e),
                                i = { fill: 'none', stroke: '#000' };
                            t && (i.path = t), (n.type = 'path'), (n.path = []), (n.Path = f), k(n, i), e.canvas.appendChild(r);
                            var a = N('skew');
                            return (a.on = !0), r.appendChild(a), (n.skew = a), n.transform(f), n;
                        }),
                        (r._engine.rect = function (t, e, n, i, a, s) {
                            var o = r._rectPath(e, n, i, a, s),
                                c = t.path(o),
                                h = c.attrs;
                            return (c.X = h.x = e), (c.Y = h.y = n), (c.W = h.width = i), (c.H = h.height = a), (h.r = s), (h.path = o), (c.type = 'rect'), c;
                        }),
                        (r._engine.ellipse = function (t, e, r, n, i) {
                            var a = t.path();
                            a.attrs;
                            return (a.X = e - n), (a.Y = r - i), (a.W = 2 * n), (a.H = 2 * i), (a.type = 'ellipse'), k(a, { cx: e, cy: r, rx: n, ry: i }), a;
                        }),
                        (r._engine.circle = function (t, e, r, n) {
                            var i = t.path();
                            i.attrs;
                            return (i.X = e - n), (i.Y = r - n), (i.W = i.H = 2 * n), (i.type = 'circle'), k(i, { cx: e, cy: r, r: n }), i;
                        }),
                        (r._engine.image = function (t, e, n, i, a, s) {
                            var o = r._rectPath(n, i, a, s),
                                c = t.path(o).attr({ stroke: 'none' }),
                                h = c.attrs,
                                u = c.node,
                                l = u.getElementsByTagName('fill')[0];
                            return (
                                (h.src = e),
                                (c.X = h.x = n),
                                (c.Y = h.y = i),
                                (c.W = h.width = a),
                                (c.H = h.height = s),
                                (h.path = o),
                                (c.type = 'image'),
                                l.parentNode == u && u.removeChild(l),
                                (l.rotate = !0),
                                (l.src = e),
                                (l.type = 'tile'),
                                (c._.fillpos = [n, i]),
                                (c._.fillsize = [a, s]),
                                u.appendChild(l),
                                E(c, 1, 1, 0, 0, 0),
                                c
                            );
                        }),
                        (r._engine.text = function (t, n, i, s) {
                            var o = N('shape'),
                                c = N('path'),
                                h = N('textpath');
                            (n = n || 0),
                                (i = i || 0),
                                (s = s || ''),
                                (c.v = r.format('m{0},{1}l{2},{1}', a(n * y), a(i * y), a(n * y) + 1)),
                                (c.textpathok = !0),
                                (h.string = e(s)),
                                (h.on = !0),
                                (o.style.cssText = v),
                                (o.coordsize = y + l + y),
                                (o.coordorigin = '0 0');
                            var u = new A(o, t),
                                p = { fill: '#000', stroke: 'none', font: r._availableAttrs.font, text: s };
                            (u.shape = o),
                                (u.path = c),
                                (u.textpath = h),
                                (u.type = 'text'),
                                (u.attrs.text = e(s)),
                                (u.attrs.x = n),
                                (u.attrs.y = i),
                                (u.attrs.w = 1),
                                (u.attrs.h = 1),
                                k(u, p),
                                o.appendChild(h),
                                o.appendChild(c),
                                t.canvas.appendChild(o);
                            var d = N('skew');
                            return (d.on = !0), o.appendChild(d), (u.skew = d), u.transform(f), u;
                        }),
                        (r._engine.setSize = function (t, e) {
                            var n = this.canvas.style;
                            return (
                                (this.width = t),
                                (this.height = e),
                                t == +t && (t += 'px'),
                                e == +e && (e += 'px'),
                                (n.width = t),
                                (n.height = e),
                                (n.clip = 'rect(0 ' + t + ' ' + e + ' 0)'),
                                this._viewBox && r._engine.setViewBox.apply(this, this._viewBox),
                                this
                            );
                        }),
                        (r._engine.setViewBox = function (t, e, n, i, a) {
                            r.eve('raphael.setViewBox', this, this._viewBox, [t, e, n, i, a]);
                            var o,
                                c,
                                h = this.width,
                                u = this.height,
                                l = 1 / s(n / h, i / u);
                            return (
                                a && ((o = u / i), (c = h / n), n * o < h && (t -= (h - n * o) / 2 / o), i * c < u && (e -= (u - i * c) / 2 / c)),
                                (this._viewBox = [t, e, n, i, !!a]),
                                (this._viewBoxShift = { dx: -t, dy: -e, scale: l }),
                                this.forEach(function (t) {
                                    t.transform('...');
                                }),
                                this
                            );
                        });
                    var N;
                    (r._engine.initWin = function (t) {
                        var e = t.document;
                        e.createStyleSheet().addRule('.rvml', 'behavior:url(#default#VML)');
                        try {
                            !e.namespaces.rvml && e.namespaces.add('rvml', 'urn:schemas-microsoft-com:vml'),
                                (N = function (t) {
                                    return e.createElement('<rvml:' + t + ' class="rvml">');
                                });
                        } catch (t) {
                            N = function (t) {
                                return e.createElement('<' + t + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                            };
                        }
                    }),
                        r._engine.initWin(r._g.win),
                        (r._engine.create = function () {
                            var t = r._getContainer.apply(0, arguments),
                                e = t.container,
                                n = t.height,
                                i = t.width,
                                a = t.x,
                                s = t.y;
                            if (!e) throw new Error('VML container not found.');
                            var o = new r._Paper(),
                                c = (o.canvas = r._g.doc.createElement('div')),
                                h = c.style;
                            return (
                                (a = a || 0),
                                (s = s || 0),
                                (i = i || 512),
                                (n = n || 342),
                                (o.width = i),
                                (o.height = n),
                                i == +i && (i += 'px'),
                                n == +n && (n += 'px'),
                                (o.coordsize = 216e5 + l + 216e5),
                                (o.coordorigin = '0 0'),
                                (o.span = r._g.doc.createElement('span')),
                                (o.span.style.cssText = 'position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;'),
                                c.appendChild(o.span),
                                (h.cssText = r.format('top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden', i, n)),
                                1 == e
                                    ? (r._g.doc.body.appendChild(c), (h.left = a + 'px'), (h.top = s + 'px'), (h.position = 'absolute'))
                                    : e.firstChild
                                    ? e.insertBefore(c, e.firstChild)
                                    : e.appendChild(c),
                                (o.renderfix = function () {}),
                                o
                            );
                        }),
                        (r.prototype.clear = function () {
                            r.eve('raphael.clear', this),
                                (this.canvas.innerHTML = f),
                                (this.span = r._g.doc.createElement('span')),
                                (this.span.style.cssText = 'position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;'),
                                this.canvas.appendChild(this.span),
                                (this.bottom = this.top = null);
                        }),
                        (r.prototype.remove = function () {
                            r.eve('raphael.remove', this), this.canvas.parentNode.removeChild(this.canvas);
                            for (var t in this) this[t] = 'function' == typeof this[t] ? r._removedFactory(t) : null;
                            return !0;
                        });
                    var O = r.st;
                    for (var T in B)
                        B[t](T) &&
                            !O[t](T) &&
                            (O[T] = (function (t) {
                                return function () {
                                    var e = arguments;
                                    return this.forEach(function (r) {
                                        r[t].apply(r, e);
                                    });
                                };
                            })(T));
                }
            })(),
            A.was ? (S.win.Raphael = r) : (Raphael = r),
            r
        );
    }),
    'function' != typeof define)
)
    var define = require('amdefine')(module);
define('regulex', ['./Kit', './NFA', './RegExp', './parse', './visualize', './libs/raphael'], function (t, e, r, n, i, a) {
    return { Kit: t, NFA: e, RegExp: r, parse: n, Raphael: a, visualize: i };
});
