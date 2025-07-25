!function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.moment = t();
}(this, function() {
    'use strict';
    let e, i;
    function f() {
        return e.apply(null, arguments);
    }
    function o(e) {
        return e instanceof Array || '[object Array]' === Object.prototype.toString.call(e);
    }
    function u(e) {
        return null != e && '[object Object]' === Object.prototype.toString.call(e);
    }
    function m(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }
    function l(e) {
        if (Object.getOwnPropertyNames)
            return 0 === Object.getOwnPropertyNames(e).length;
        for (const t in e)
            if (m(e, t))
                return;
        return 1;
    }
    function r(e) {
        return void 0 === e;
    }
    function h(e) {
        return 'number' == typeof e || '[object Number]' === Object.prototype.toString.call(e);
    }
    function a(e) {
        return e instanceof Date || '[object Date]' === Object.prototype.toString.call(e);
    }
    function d(e, t) {
        for (var n = [], s = 0; s < e.length; ++s)
            n.push(t(e[s], s));
        return n;
    }
    function c(e, t) {
        for (const n in t)
            m(t, n) && (e[n] = t[n]);
        return m(t, 'toString') && (e.toString = t.toString),
        m(t, 'valueOf') && (e.valueOf = t.valueOf),
        e;
    }
    function _(e, t, n, s) {
        return xt(e, t, n, s, !0).utc();
    }
    function y(e) {
        return null == e._pf && (e._pf = {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: !1,
            weekdayMismatch: !1
        }),
        e._pf;
    }
    function g(e) {
        if (null == e._isValid) {
            let t = y(e)
              , n = i.call(t.parsedDateParts, function(e) {
                return null != e;
            })
              , s = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && n);
            if (e._strict && (s = s && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour),
            null != Object.isFrozen && Object.isFrozen(e))
                return s;
            e._isValid = s;
        }
        return e._isValid;
    }
    function w(e) {
        const t = _(NaN);
        return null != e ? c(y(t), e) : y(t).userInvalidated = !0,
        t;
    }
    i = Array.prototype.some ? Array.prototype.some : function(e) {
        for (let t = Object(this), n = t.length >>> 0, s = 0; s < n; s++)
            if (s in t && e.call(this, t[s], s, t))
                return !0;
        return !1;
    }
    ;
    let p = f.momentProperties = []
      , t = !1;
    function v(e, t) {
        let n, s, i;
        if (r(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject),
        r(t._i) || (e._i = t._i),
        r(t._f) || (e._f = t._f),
        r(t._l) || (e._l = t._l),
        r(t._strict) || (e._strict = t._strict),
        r(t._tzm) || (e._tzm = t._tzm),
        r(t._isUTC) || (e._isUTC = t._isUTC),
        r(t._offset) || (e._offset = t._offset),
        r(t._pf) || (e._pf = y(t)),
        r(t._locale) || (e._locale = t._locale),
        0 < p.length)
            for (n = 0; n < p.length; n++)
                r(i = t[s = p[n]]) || (e[s] = i);
        return e;
    }
    function k(e) {
        v(this, e),
        this._d = new Date(null != e._d ? e._d.getTime() : NaN),
        this.isValid() || (this._d = new Date(NaN)),
        !1 === t && (t = !0,
        f.updateOffset(this),
        t = !1);
    }
    function M(e) {
        return e instanceof k || null != e && null != e._isAMomentObject;
    }
    function D(e) {
        !1 === f.suppressDeprecationWarnings && 'undefined' != typeof console && console.warn && console.warn('Deprecation warning: ' + e);
    }
    function n(i, r) {
        let a = !0;
        return c(function() {
            if (null != f.deprecationHandler && f.deprecationHandler(null, i),
            a) {
                for (var e, t, n = [], s = 0; s < arguments.length; s++) {
                    if (e = '',
                    'object' == typeof arguments[s]) {
                        for (t in e += '\n[' + s + '] ',
                        arguments[0])
                            m(arguments[0], t) && (e += t + ': ' + arguments[0][t] + ', ');
                        e = e.slice(0, -2);
                    } else
                        e = arguments[s];
                    n.push(e);
                }
                D(i + '\nArguments: ' + Array.prototype.slice.call(n).join('') + '\n' + (new Error).stack),
                a = !1;
            }
            return r.apply(this, arguments);
        }, r);
    }
    let s, S = {};
    function Y(e, t) {
        null != f.deprecationHandler && f.deprecationHandler(e, t),
        S[e] || (D(t),
        S[e] = !0);
    }
    function O(e) {
        return 'undefined' != typeof Function && e instanceof Function || '[object Function]' === Object.prototype.toString.call(e);
    }
    function b(e, t) {
        let n, s = c({}, e);
        for (n in t)
            m(t, n) && (u(e[n]) && u(t[n]) ? (s[n] = {},
            c(s[n], e[n]),
            c(s[n], t[n])) : null != t[n] ? s[n] = t[n] : delete s[n]);
        for (n in e)
            m(e, n) && !m(t, n) && u(e[n]) && (s[n] = c({}, s[n]));
        return s;
    }
    function x(e) {
        null != e && this.set(e);
    }
    f.suppressDeprecationWarnings = !1,
    f.deprecationHandler = null,
    s = Object.keys ? Object.keys : function(e) {
        let t, n = [];
        for (t in e)
            m(e, t) && n.push(t);
        return n;
    }
    ;
    function T(e, t, n) {
        const s = '' + Math.abs(e)
          , i = t - s.length;
        return (0 <= e ? n ? '+' : '' : '-') + Math.pow(10, Math.max(0, i)).toString().substr(1) + s;
    }
    const N = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g
      , P = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g
      , R = {}
      , W = {};
    function C(e, t, n, s) {
        const i = 'string' == typeof s ? function() {
            return this[s]();
        }
        : s;
        e && (W[e] = i),
        t && (W[t[0]] = function() {
            return T(i.apply(this, arguments), t[1], t[2]);
        }
        ),
        n && (W[n] = function() {
            return this.localeData().ordinal(i.apply(this, arguments), e);
        }
        );
    }
    function U(e, t) {
        return e.isValid() ? (t = H(t, e.localeData()),
        R[t] = R[t] || function(s) {
            for (var e, i = s.match(N), t = 0, r = i.length; t < r; t++)
                W[i[t]] ? i[t] = W[i[t]] : i[t] = (e = i[t]).match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, '') : e.replace(/\\/g, '');
            return function(e) {
                for (var t = '', n = 0; n < r; n++)
                    t += O(i[n]) ? i[n].call(e, s) : i[n];
                return t;
            };
        }(t),
        R[t](e)) : e.localeData().invalidDate();
    }
    function H(e, t) {
        let n = 5;
        function s(e) {
            return t.longDateFormat(e) || e;
        }
        for (P.lastIndex = 0; 0 <= n && P.test(e); )
            e = e.replace(P, s),
            P.lastIndex = 0,
            --n;
        return e;
    }
    const F = {};
    function L(e, t) {
        const n = e.toLowerCase();
        F[n] = F[n + 's'] = F[t] = e;
    }
    function V(e) {
        return 'string' == typeof e ? F[e] || F[e.toLowerCase()] : void 0;
    }
    function G(e) {
        let t, n, s = {};
        for (n in e)
            m(e, n) && (t = V(n)) && (s[t] = e[n]);
        return s;
    }
    const E = {};
    function A(e, t) {
        E[e] = t;
    }
    function j(e) {
        return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
    }
    function I(e) {
        return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
    }
    function Z(e) {
        let t = +e
          , n = 0;
        return 0 != t && isFinite(t) && (n = I(t)),
        n;
    }
    function z(t, n) {
        return function(e) {
            return null != e ? (q(this, t, e),
            f.updateOffset(this, n),
            this) : $(this, t);
        };
    }
    function $(e, t) {
        return e.isValid() ? e._d['get' + (e._isUTC ? 'UTC' : '') + t]() : NaN;
    }
    function q(e, t, n) {
        e.isValid() && !isNaN(n) && ('FullYear' === t && j(e.year()) && 1 === e.month() && 29 === e.date() ? (n = Z(n),
        e._d['set' + (e._isUTC ? 'UTC' : '') + t](n, e.month(), xe(n, e.month()))) : e._d['set' + (e._isUTC ? 'UTC' : '') + t](n));
    }
    let B, J = /\d/, Q = /\d\d/, X = /\d{3}/, K = /\d{4}/, ee = /[+-]?\d{6}/, te = /\d\d?/, ne = /\d\d\d\d?/, se = /\d\d\d\d\d\d?/, ie = /\d{1,3}/, re = /\d{1,4}/, ae = /[+-]?\d{1,6}/, oe = /\d+/, ue = /[+-]?\d+/, le = /Z|[+-]\d\d:?\d\d/gi, he = /Z|[+-]\d\d(?::?\d\d)?/gi, de = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
    function ce(e, n, s) {
        B[e] = O(n) ? n : function(e, t) {
            return e && s ? s : n;
        };
    }
    function fe(e, t) {
        return m(B, e) ? B[e](t._strict, t._locale) : new RegExp(me(e.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, s, i) {
            return t || n || s || i;
        })));
    }
    function me(e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }
    B = {};
    const _e = {};
    function ye(e, n) {
        let t, s = n;
        for ('string' == typeof e && (e = [e]),
        h(n) && (s = function(e, t) {
            t[n] = Z(e);
        }
        ),
        t = 0; t < e.length; t++)
            _e[e[t]] = s;
    }
    function ge(e, i) {
        ye(e, function(e, t, n, s) {
            n._w = n._w || {},
            i(e, n._w, n, s);
        });
    }
    let we, pe = 0, ve = 1, ke = 2, Me = 3, De = 4, Se = 5, Ye = 6, Oe = 7, be = 8;
    function xe(e, t) {
        if (isNaN(e) || isNaN(t))
            return NaN;
        let n, s = (t % (n = 12) + n) % n;
        return e += (t - s) / 12,
        1 == s ? j(e) ? 29 : 28 : 31 - s % 7 % 2;
    }
    we = Array.prototype.indexOf ? Array.prototype.indexOf : function(e) {
        for (let t = 0; t < this.length; ++t)
            if (this[t] === e)
                return t;
        return -1;
    }
    ,
    C('M', ['MM', 2], 'Mo', function() {
        return this.month() + 1;
    }),
    C('MMM', 0, 0, function(e) {
        return this.localeData().monthsShort(this, e);
    }),
    C('MMMM', 0, 0, function(e) {
        return this.localeData().months(this, e);
    }),
    L('month', 'M'),
    A('month', 8),
    ce('M', te),
    ce('MM', te, Q),
    ce('MMM', function(e, t) {
        return t.monthsShortRegex(e);
    }),
    ce('MMMM', function(e, t) {
        return t.monthsRegex(e);
    }),
    ye(['M', 'MM'], function(e, t) {
        t[ve] = Z(e) - 1;
    }),
    ye(['MMM', 'MMMM'], function(e, t, n, s) {
        const i = n._locale.monthsParse(e, s, n._strict);
        null != i ? t[ve] = i : y(n).invalidMonth = e;
    });
    const Te = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_')
      , Ne = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_')
      , Pe = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/
      , Re = de
      , We = de;
    function Ce(e, t) {
        let n;
        if (!e.isValid())
            return e;
        if ('string' == typeof t)
            if (/^\d+$/.test(t))
                t = Z(t);
            else if (!h(t = e.localeData().monthsParse(t)))
                return e;
        return n = Math.min(e.date(), xe(e.year(), t)),
        e._d['set' + (e._isUTC ? 'UTC' : '') + 'Month'](t, n),
        e;
    }
    function Ue(e) {
        return null != e ? (Ce(this, e),
        f.updateOffset(this, !0),
        this) : $(this, 'Month');
    }
    function He() {
        function e(e, t) {
            return t.length - e.length;
        }
        for (var t, n = [], s = [], i = [], r = 0; r < 12; r++)
            t = _([2e3, r]),
            n.push(this.monthsShort(t, '')),
            s.push(this.months(t, '')),
            i.push(this.months(t, '')),
            i.push(this.monthsShort(t, ''));
        for (n.sort(e),
        s.sort(e),
        i.sort(e),
        r = 0; r < 12; r++)
            n[r] = me(n[r]),
            s[r] = me(s[r]);
        for (r = 0; r < 24; r++)
            i[r] = me(i[r]);
        this._monthsRegex = new RegExp('^(' + i.join('|') + ')','i'),
        this._monthsShortRegex = this._monthsRegex,
        this._monthsStrictRegex = new RegExp('^(' + s.join('|') + ')','i'),
        this._monthsShortStrictRegex = new RegExp('^(' + n.join('|') + ')','i');
    }
    function Fe(e) {
        return j(e) ? 366 : 365;
    }
    C('Y', 0, 0, function() {
        const e = this.year();
        return e <= 9999 ? T(e, 4) : '+' + e;
    }),
    C(0, ['YY', 2], 0, function() {
        return this.year() % 100;
    }),
    C(0, ['YYYY', 4], 0, 'year'),
    C(0, ['YYYYY', 5], 0, 'year'),
    C(0, ['YYYYYY', 6, !0], 0, 'year'),
    L('year', 'y'),
    A('year', 1),
    ce('Y', ue),
    ce('YY', te, Q),
    ce('YYYY', re, K),
    ce('YYYYY', ae, ee),
    ce('YYYYYY', ae, ee),
    ye(['YYYYY', 'YYYYYY'], pe),
    ye('YYYY', function(e, t) {
        t[pe] = 2 === e.length ? f.parseTwoDigitYear(e) : Z(e);
    }),
    ye('YY', function(e, t) {
        t[pe] = f.parseTwoDigitYear(e);
    }),
    ye('Y', function(e, t) {
        t[pe] = parseInt(e, 10);
    }),
    f.parseTwoDigitYear = function(e) {
        return Z(e) + (68 < Z(e) ? 1900 : 2e3);
    }
    ;
    const Le = z('FullYear', !0);
    function Ve(e) {
        let t, n;
        return e < 100 && 0 <= e ? ((n = Array.prototype.slice.call(arguments))[0] = e + 400,
        t = new Date(Date.UTC.apply(null, n)),
        isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)),
        t;
    }
    function Ge(e, t, n) {
        const s = 7 + t - n;
        return s - (7 + Ve(e, 0, s).getUTCDay() - t) % 7 - 1;
    }
    function Ee(e, t, n, s, i) {
        let r, a = 1 + 7 * (t - 1) + (7 + n - s) % 7 + Ge(e, s, i), o = a <= 0 ? Fe(r = e - 1) + a : a > Fe(e) ? (r = e + 1,
        a - Fe(e)) : (r = e,
        a);
        return {
            year: r,
            dayOfYear: o
        };
    }
    function Ae(e, t, n) {
        let s, i, r = Ge(e.year(), t, n), a = Math.floor((e.dayOfYear() - r - 1) / 7) + 1;
        return a < 1 ? s = a + je(i = e.year() - 1, t, n) : a > je(e.year(), t, n) ? (s = a - je(e.year(), t, n),
        i = e.year() + 1) : (i = e.year(),
        s = a),
        {
            week: s,
            year: i
        };
    }
    function je(e, t, n) {
        const s = Ge(e, t, n)
          , i = Ge(e + 1, t, n);
        return (Fe(e) - s + i) / 7;
    }
    C('w', ['ww', 2], 'wo', 'week'),
    C('W', ['WW', 2], 'Wo', 'isoWeek'),
    L('week', 'w'),
    L('isoWeek', 'W'),
    A('week', 5),
    A('isoWeek', 5),
    ce('w', te),
    ce('ww', te, Q),
    ce('W', te),
    ce('WW', te, Q),
    ge(['w', 'ww', 'W', 'WW'], function(e, t, n, s) {
        t[s.substr(0, 1)] = Z(e);
    });
    function Ie(e, t) {
        return e.slice(t, 7).concat(e.slice(0, t));
    }
    C('d', 0, 'do', 'day'),
    C('dd', 0, 0, function(e) {
        return this.localeData().weekdaysMin(this, e);
    }),
    C('ddd', 0, 0, function(e) {
        return this.localeData().weekdaysShort(this, e);
    }),
    C('dddd', 0, 0, function(e) {
        return this.localeData().weekdays(this, e);
    }),
    C('e', 0, 0, 'weekday'),
    C('E', 0, 0, 'isoWeekday'),
    L('day', 'd'),
    L('weekday', 'e'),
    L('isoWeekday', 'E'),
    A('day', 11),
    A('weekday', 11),
    A('isoWeekday', 11),
    ce('d', te),
    ce('e', te),
    ce('E', te),
    ce('dd', function(e, t) {
        return t.weekdaysMinRegex(e);
    }),
    ce('ddd', function(e, t) {
        return t.weekdaysShortRegex(e);
    }),
    ce('dddd', function(e, t) {
        return t.weekdaysRegex(e);
    }),
    ge(['dd', 'ddd', 'dddd'], function(e, t, n, s) {
        const i = n._locale.weekdaysParse(e, s, n._strict);
        null != i ? t.d = i : y(n).invalidWeekday = e;
    }),
    ge(['d', 'e', 'E'], function(e, t, n, s) {
        t[s] = Z(e);
    });
    const Ze = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_')
      , ze = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_')
      , $e = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_')
      , qe = de
      , Be = de
      , Je = de;
    function Qe() {
        function e(e, t) {
            return t.length - e.length;
        }
        for (var t, n, s, i, r = [], a = [], o = [], u = [], l = 0; l < 7; l++)
            t = _([2e3, 1]).day(l),
            n = me(this.weekdaysMin(t, '')),
            s = me(this.weekdaysShort(t, '')),
            i = me(this.weekdays(t, '')),
            r.push(n),
            a.push(s),
            o.push(i),
            u.push(n),
            u.push(s),
            u.push(i);
        r.sort(e),
        a.sort(e),
        o.sort(e),
        u.sort(e),
        this._weekdaysRegex = new RegExp('^(' + u.join('|') + ')','i'),
        this._weekdaysShortRegex = this._weekdaysRegex,
        this._weekdaysMinRegex = this._weekdaysRegex,
        this._weekdaysStrictRegex = new RegExp('^(' + o.join('|') + ')','i'),
        this._weekdaysShortStrictRegex = new RegExp('^(' + a.join('|') + ')','i'),
        this._weekdaysMinStrictRegex = new RegExp('^(' + r.join('|') + ')','i');
    }
    function Xe() {
        return this.hours() % 12 || 12;
    }
    function Ke(e, t) {
        C(e, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), t);
        });
    }
    function et(e, t) {
        return t._meridiemParse;
    }
    C('H', ['HH', 2], 0, 'hour'),
    C('h', ['hh', 2], 0, Xe),
    C('k', ['kk', 2], 0, function() {
        return this.hours() || 24;
    }),
    C('hmm', 0, 0, function() {
        return '' + Xe.apply(this) + T(this.minutes(), 2);
    }),
    C('hmmss', 0, 0, function() {
        return '' + Xe.apply(this) + T(this.minutes(), 2) + T(this.seconds(), 2);
    }),
    C('Hmm', 0, 0, function() {
        return '' + this.hours() + T(this.minutes(), 2);
    }),
    C('Hmmss', 0, 0, function() {
        return '' + this.hours() + T(this.minutes(), 2) + T(this.seconds(), 2);
    }),
    Ke('a', !0),
    Ke('A', !1),
    L('hour', 'h'),
    A('hour', 13),
    ce('a', et),
    ce('A', et),
    ce('H', te),
    ce('h', te),
    ce('k', te),
    ce('HH', te, Q),
    ce('hh', te, Q),
    ce('kk', te, Q),
    ce('hmm', ne),
    ce('hmmss', se),
    ce('Hmm', ne),
    ce('Hmmss', se),
    ye(['H', 'HH'], Me),
    ye(['k', 'kk'], function(e, t, n) {
        const s = Z(e);
        t[Me] = 24 === s ? 0 : s;
    }),
    ye(['a', 'A'], function(e, t, n) {
        n._isPm = n._locale.isPM(e),
        n._meridiem = e;
    }),
    ye(['h', 'hh'], function(e, t, n) {
        t[Me] = Z(e),
        y(n).bigHour = !0;
    }),
    ye('hmm', function(e, t, n) {
        const s = e.length - 2;
        t[Me] = Z(e.substr(0, s)),
        t[De] = Z(e.substr(s)),
        y(n).bigHour = !0;
    }),
    ye('hmmss', function(e, t, n) {
        const s = e.length - 4
          , i = e.length - 2;
        t[Me] = Z(e.substr(0, s)),
        t[De] = Z(e.substr(s, 2)),
        t[Se] = Z(e.substr(i)),
        y(n).bigHour = !0;
    }),
    ye('Hmm', function(e, t, n) {
        const s = e.length - 2;
        t[Me] = Z(e.substr(0, s)),
        t[De] = Z(e.substr(s));
    }),
    ye('Hmmss', function(e, t, n) {
        const s = e.length - 4
          , i = e.length - 2;
        t[Me] = Z(e.substr(0, s)),
        t[De] = Z(e.substr(s, 2)),
        t[Se] = Z(e.substr(i));
    });
    const tt = z('Hours', !0);
    let nt, st = {
        calendar: {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'L'
        },
        longDateFormat: {
            LTS: 'h:mm:ss A',
            LT: 'h:mm A',
            L: 'MM/DD/YYYY',
            LL: 'MMMM D, YYYY',
            LLL: 'MMMM D, YYYY h:mm A',
            LLLL: 'dddd, MMMM D, YYYY h:mm A'
        },
        invalidDate: 'Invalid date',
        ordinal: '%d',
        dayOfMonthOrdinalParse: /\d{1,2}/,
        relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            ss: '%d seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            w: 'a week',
            ww: '%d weeks',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years'
        },
        months: Te,
        monthsShort: Ne,
        week: {
            dow: 0,
            doy: 6
        },
        weekdays: Ze,
        weekdaysMin: $e,
        weekdaysShort: ze,
        meridiemParse: /[ap]\.?m?\.?/i
    }, it = {}, rt = {};
    function at(e) {
        return e ? e.toLowerCase().replace('_', '-') : e;
    }
    function ot(e) {
        for (var t, n, s, i, r = 0; r < e.length; ) {
            for (t = (i = at(e[r]).split('-')).length,
            n = (n = at(e[r + 1])) ? n.split('-') : null; 0 < t; ) {
                if (s = ut(i.slice(0, t).join('-')))
                    return s;
                if (n && n.length >= t && function(e, t) {
                    for (var n = Math.min(e.length, t.length), s = 0; s < n; s += 1)
                        if (e[s] !== t[s])
                            return s;
                    return n;
                }(i, n) >= t - 1)
                    break;
                t--;
            }
            r++;
        }
        return nt;
    }
    function ut(t) {
        let e;
        if (void 0 === it[t] && 'undefined' != typeof module && module && module.exports)
            try {
                e = nt._abbr,
                require('./locale/' + t),
                lt(e);
            } catch (e) {
                it[t] = null;
            }
        return it[t];
    }
    function lt(e, t) {
        let n;
        return e && ((n = r(t) ? dt(e) : ht(e, t)) ? nt = n : 'undefined' != typeof console && console.warn && console.warn('Locale ' + e + ' not found. Did you forget to load it?')),
        nt._abbr;
    }
    function ht(e, t) {
        if (null === t)
            return delete it[e],
            null;
        let n, s = st;
        if (t.abbr = e,
        null != it[e])
            Y('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'),
            s = it[e]._config;
        else if (null != t.parentLocale)
            if (null != it[t.parentLocale])
                s = it[t.parentLocale]._config;
            else {
                if (null == (n = ut(t.parentLocale)))
                    return rt[t.parentLocale] || (rt[t.parentLocale] = []),
                    rt[t.parentLocale].push({
                        name: e,
                        config: t
                    }),
                    null;
                s = n._config;
            }
        return it[e] = new x(b(s, t)),
        rt[e] && rt[e].forEach(function(e) {
            ht(e.name, e.config);
        }),
        lt(e),
        it[e];
    }
    function dt(e) {
        let t;
        if (e && e._locale && e._locale._abbr && (e = e._locale._abbr),
        !e)
            return nt;
        if (!o(e)) {
            if (t = ut(e))
                return t;
            e = [e];
        }
        return ot(e);
    }
    function ct(e) {
        let t, n = e._a;
        return n && -2 === y(e).overflow && (t = n[ve] < 0 || 11 < n[ve] ? ve : n[ke] < 1 || n[ke] > xe(n[pe], n[ve]) ? ke : n[Me] < 0 || 24 < n[Me] || 24 === n[Me] && (0 !== n[De] || 0 !== n[Se] || 0 !== n[Ye]) ? Me : n[De] < 0 || 59 < n[De] ? De : n[Se] < 0 || 59 < n[Se] ? Se : n[Ye] < 0 || 999 < n[Ye] ? Ye : -1,
        y(e)._overflowDayOfYear && (t < pe || ke < t) && (t = ke),
        y(e)._overflowWeeks && -1 === t && (t = Oe),
        y(e)._overflowWeekday && -1 === t && (t = be),
        y(e).overflow = t),
        e;
    }
    const ft = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/
      , mt = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/
      , _t = /Z|[+-]\d\d(?::?\d\d)?/
      , yt = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, !1], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, !1], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/], ['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, !1], ['YYYYDDD', /\d{7}/], ['YYYYMM', /\d{6}/, !1], ['YYYY', /\d{4}/, !1]]
      , gt = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]]
      , wt = /^\/?Date\((-?\d+)/i
      , pt = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/
      , vt = {
        UT: 0,
        GMT: 0,
        EDT: -240,
        EST: -300,
        CDT: -300,
        CST: -360,
        MDT: -360,
        MST: -420,
        PDT: -420,
        PST: -480
    };
    function kt(e) {
        let t, n, s, i, r, a, o = e._i, u = ft.exec(o) || mt.exec(o);
        if (u) {
            for (y(e).iso = !0,
            t = 0,
            n = yt.length; t < n; t++)
                if (yt[t][1].exec(u[1])) {
                    i = yt[t][0],
                    s = !1 !== yt[t][2];
                    break;
                }
            if (null == i)
                return void (e._isValid = !1);
            if (u[3]) {
                for (t = 0,
                n = gt.length; t < n; t++)
                    if (gt[t][1].exec(u[3])) {
                        r = (u[2] || ' ') + gt[t][0];
                        break;
                    }
                if (null == r)
                    return void (e._isValid = !1);
            }
            if (!s && null != r)
                return void (e._isValid = !1);
            if (u[4]) {
                if (!_t.exec(u[4]))
                    return void (e._isValid = !1);
                a = 'Z';
            }
            e._f = i + (r || '') + (a || ''),
            Ot(e);
        } else
            e._isValid = !1;
    }
    function Mt(e, t, n, s, i, r) {
        const a = [function(e) {
            const t = parseInt(e, 10);
            {
                if (t <= 49)
                    return 2e3 + t;
                if (t <= 999)
                    return 1900 + t;
            }
            return t;
        }(e), Ne.indexOf(t), parseInt(n, 10), parseInt(s, 10), parseInt(i, 10)];
        return r && a.push(parseInt(r, 10)),
        a;
    }
    function Dt(e) {
        let t, n, s, i, r = pt.exec(e._i.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, ''));
        if (r) {
            if (t = Mt(r[4], r[3], r[2], r[5], r[6], r[7]),
            n = r[1],
            s = t,
            i = e,
            n && ze.indexOf(n) !== new Date(s[0],s[1],s[2]).getDay() && (y(i).weekdayMismatch = !0,
            !void (i._isValid = !1)))
                return;
            e._a = t,
            e._tzm = function(e, t, n) {
                if (e)
                    return vt[e];
                if (t)
                    return 0;
                const s = parseInt(n, 10)
                  , i = s % 100;
                return 60 * ((s - i) / 100) + i;
            }(r[8], r[9], r[10]),
            e._d = Ve.apply(null, e._a),
            e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
            y(e).rfc2822 = !0;
        } else
            e._isValid = !1;
    }
    function St(e, t, n) {
        return null != e ? e : null != t ? t : n;
    }
    function Yt(e) {
        let t, n, s, i, r, a, o, u = [];
        if (!e._d) {
            for (a = e,
            o = new Date(f.now()),
            s = a._useUTC ? [o.getUTCFullYear(), o.getUTCMonth(), o.getUTCDate()] : [o.getFullYear(), o.getMonth(), o.getDate()],
            e._w && null == e._a[ke] && null == e._a[ve] && function(e) {
                let t, n, s, i, r, a, o, u, l;
                null != (t = e._w).GG || null != t.W || null != t.E ? (r = 1,
                a = 4,
                n = St(t.GG, e._a[pe], Ae(Tt(), 1, 4).year),
                s = St(t.W, 1),
                ((i = St(t.E, 1)) < 1 || 7 < i) && (u = !0)) : (r = e._locale._week.dow,
                a = e._locale._week.doy,
                l = Ae(Tt(), r, a),
                n = St(t.gg, e._a[pe], l.year),
                s = St(t.w, l.week),
                null != t.d ? ((i = t.d) < 0 || 6 < i) && (u = !0) : null != t.e ? (i = t.e + r,
                (t.e < 0 || 6 < t.e) && (u = !0)) : i = r);
                s < 1 || s > je(n, r, a) ? y(e)._overflowWeeks = !0 : null != u ? y(e)._overflowWeekday = !0 : (o = Ee(n, s, i, r, a),
                e._a[pe] = o.year,
                e._dayOfYear = o.dayOfYear);
            }(e),
            null != e._dayOfYear && (r = St(e._a[pe], s[pe]),
            (e._dayOfYear > Fe(r) || 0 === e._dayOfYear) && (y(e)._overflowDayOfYear = !0),
            n = Ve(r, 0, e._dayOfYear),
            e._a[ve] = n.getUTCMonth(),
            e._a[ke] = n.getUTCDate()),
            t = 0; t < 3 && null == e._a[t]; ++t)
                e._a[t] = u[t] = s[t];
            for (; t < 7; t++)
                e._a[t] = u[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
            24 === e._a[Me] && 0 === e._a[De] && 0 === e._a[Se] && 0 === e._a[Ye] && (e._nextDay = !0,
            e._a[Me] = 0),
            e._d = (e._useUTC ? Ve : function(e, t, n, s, i, r, a) {
                let o;
                return e < 100 && 0 <= e ? (o = new Date(e + 400,t,n,s,i,r,a),
                isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e,t,n,s,i,r,a),
                o;
            }
            ).apply(null, u),
            i = e._useUTC ? e._d.getUTCDay() : e._d.getDay(),
            null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
            e._nextDay && (e._a[Me] = 24),
            e._w && void 0 !== e._w.d && e._w.d !== i && (y(e).weekdayMismatch = !0);
        }
    }
    function Ot(e) {
        if (e._f !== f.ISO_8601)
            if (e._f !== f.RFC_2822) {
                e._a = [],
                y(e).empty = !0;
                for (var t, n, s, i, r, a, o, u = '' + e._i, l = u.length, h = 0, d = H(e._f, e._locale).match(N) || [], c = 0; c < d.length; c++)
                    n = d[c],
                    (t = (u.match(fe(n, e)) || [])[0]) && (0 < (s = u.substr(0, u.indexOf(t))).length && y(e).unusedInput.push(s),
                    u = u.slice(u.indexOf(t) + t.length),
                    h += t.length),
                    W[n] ? (t ? y(e).empty = !1 : y(e).unusedTokens.push(n),
                    r = n,
                    o = e,
                    null != (a = t) && m(_e, r) && _e[r](a, o._a, o, r)) : e._strict && !t && y(e).unusedTokens.push(n);
                y(e).charsLeftOver = l - h,
                0 < u.length && y(e).unusedInput.push(u),
                e._a[Me] <= 12 && !0 === y(e).bigHour && 0 < e._a[Me] && (y(e).bigHour = void 0),
                y(e).parsedDateParts = e._a.slice(0),
                y(e).meridiem = e._meridiem,
                e._a[Me] = function(e, t, n) {
                    let s;
                    if (null == n)
                        return t;
                    return null != e.meridiemHour ? e.meridiemHour(t, n) : (null != e.isPM && ((s = e.isPM(n)) && t < 12 && (t += 12),
                    s || 12 !== t || (t = 0)),
                    t);
                }(e._locale, e._a[Me], e._meridiem),
                null !== (i = y(e).era) && (e._a[pe] = e._locale.erasConvertYear(i, e._a[pe])),
                Yt(e),
                ct(e);
            } else
                Dt(e);
        else
            kt(e);
    }
    function bt(e) {
        let t, n, s = e._i, i = e._f;
        return e._locale = e._locale || dt(e._l),
        null === s || void 0 === i && '' === s ? w({
            nullInput: !0
        }) : ('string' == typeof s && (e._i = s = e._locale.preparse(s)),
        M(s) ? new k(ct(s)) : (a(s) ? e._d = s : o(i) ? function(e) {
            let t, n, s, i, r, a, o = !1;
            if (0 === e._f.length)
                return y(e).invalidFormat = !0,
                e._d = new Date(NaN);
            for (i = 0; i < e._f.length; i++)
                r = 0,
                a = !1,
                t = v({}, e),
                null != e._useUTC && (t._useUTC = e._useUTC),
                t._f = e._f[i],
                Ot(t),
                g(t) && (a = !0),
                r += y(t).charsLeftOver,
                r += 10 * y(t).unusedTokens.length,
                y(t).score = r,
                o ? r < s && (s = r,
                n = t) : (null == s || r < s || a) && (s = r,
                n = t,
                a && (o = !0));
            c(e, n || t);
        }(e) : i ? Ot(e) : r(n = (t = e)._i) ? t._d = new Date(f.now()) : a(n) ? t._d = new Date(n.valueOf()) : 'string' == typeof n ? function(e) {
            const t = wt.exec(e._i);
            null === t ? (kt(e),
            !1 === e._isValid && (delete e._isValid,
            Dt(e),
            !1 === e._isValid && (delete e._isValid,
            e._strict ? e._isValid = !1 : f.createFromInputFallback(e)))) : e._d = new Date(+t[1]);
        }(t) : o(n) ? (t._a = d(n.slice(0), function(e) {
            return parseInt(e, 10);
        }),
        Yt(t)) : u(n) ? function(e) {
            let t, n;
            e._d || (n = void 0 === (t = G(e._i)).day ? t.date : t.day,
            e._a = d([t.year, t.month, n, t.hour, t.minute, t.second, t.millisecond], function(e) {
                return e && parseInt(e, 10);
            }),
            Yt(e));
        }(t) : h(n) ? t._d = new Date(n) : f.createFromInputFallback(t),
        g(e) || (e._d = null),
        e));
    }
    function xt(e, t, n, s, i) {
        let r, a = {};
        return !0 !== t && !1 !== t || (s = t,
        t = void 0),
        !0 !== n && !1 !== n || (s = n,
        n = void 0),
        (u(e) && l(e) || o(e) && 0 === e.length) && (e = void 0),
        a._isAMomentObject = !0,
        a._useUTC = a._isUTC = i,
        a._l = n,
        a._i = e,
        a._f = t,
        a._strict = s,
        (r = new k(ct(bt(a))))._nextDay && (r.add(1, 'd'),
        r._nextDay = void 0),
        r;
    }
    function Tt(e, t, n, s) {
        return xt(e, t, n, s, !1);
    }
    f.createFromInputFallback = n('value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.', function(e) {
        e._d = new Date(e._i + (e._useUTC ? ' UTC' : ''));
    }),
    f.ISO_8601 = function() {}
    ,
    f.RFC_2822 = function() {}
    ;
    const Nt = n('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function() {
        const e = Tt.apply(null, arguments);
        return this.isValid() && e.isValid() ? e < this ? this : e : w();
    })
      , Pt = n('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function() {
        const e = Tt.apply(null, arguments);
        return this.isValid() && e.isValid() ? this < e ? this : e : w();
    });
    function Rt(e, t) {
        let n, s;
        if (1 === t.length && o(t[0]) && (t = t[0]),
        !t.length)
            return Tt();
        for (n = t[0],
        s = 1; s < t.length; ++s)
            t[s].isValid() && !t[s][e](n) || (n = t[s]);
        return n;
    }
    const Wt = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];
    function Ct(e) {
        const t = G(e)
          , n = t.year || 0
          , s = t.quarter || 0
          , i = t.month || 0
          , r = t.week || t.isoWeek || 0
          , a = t.day || 0
          , o = t.hour || 0
          , u = t.minute || 0
          , l = t.second || 0
          , h = t.millisecond || 0;
        this._isValid = function(e) {
            let t, n, s = !1;
            for (t in e)
                if (m(e, t) && (-1 === we.call(Wt, t) || null != e[t] && isNaN(e[t])))
                    return !1;
            for (n = 0; n < Wt.length; ++n)
                if (e[Wt[n]]) {
                    if (s)
                        return !1;
                    parseFloat(e[Wt[n]]) !== Z(e[Wt[n]]) && (s = !0);
                }
            return !0;
        }(t),
        this._milliseconds = +h + 1e3 * l + 6e4 * u + 1e3 * o * 60 * 60,
        this._days = +a + 7 * r,
        this._months = +i + 3 * s + 12 * n,
        this._data = {},
        this._locale = dt(),
        this._bubble();
    }
    function Ut(e) {
        return e instanceof Ct;
    }
    function Ht(e) {
        return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e);
    }
    function Ft(e, n) {
        C(e, 0, 0, function() {
            let e = this.utcOffset()
              , t = '+';
            return e < 0 && (e = -e,
            t = '-'),
            t + T(~~(e / 60), 2) + n + T(~~e % 60, 2);
        });
    }
    Ft('Z', ':'),
    Ft('ZZ', ''),
    ce('Z', he),
    ce('ZZ', he),
    ye(['Z', 'ZZ'], function(e, t, n) {
        n._useUTC = !0,
        n._tzm = Vt(he, e);
    });
    const Lt = /([\+\-]|\d\d)/gi;
    function Vt(e, t) {
        let n, s, i = (t || '').match(e);
        return null === i ? null : 0 === (s = 60 * (n = ((i[i.length - 1] || []) + '').match(Lt) || ['-', 0, 0])[1] + Z(n[2])) ? 0 : '+' === n[0] ? s : -s;
    }
    function Gt(e, t) {
        let n, s;
        return t._isUTC ? (n = t.clone(),
        s = (M(e) || a(e) ? e.valueOf() : Tt(e).valueOf()) - n.valueOf(),
        n._d.setTime(n._d.valueOf() + s),
        f.updateOffset(n, !1),
        n) : Tt(e).local();
    }
    function Et(e) {
        return -Math.round(e._d.getTimezoneOffset());
    }
    function At() {
        return !!this.isValid() && (this._isUTC && 0 === this._offset);
    }
    f.updateOffset = function() {}
    ;
    const jt = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/
      , It = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
    function Zt(e, t) {
        let n, s, i, r = e, a = null;
        return Ut(e) ? r = {
            ms: e._milliseconds,
            d: e._days,
            M: e._months
        } : h(e) || !isNaN(+e) ? (r = {},
        t ? r[t] = +e : r.milliseconds = +e) : (a = jt.exec(e)) ? (n = '-' === a[1] ? -1 : 1,
        r = {
            y: 0,
            d: Z(a[ke]) * n,
            h: Z(a[Me]) * n,
            m: Z(a[De]) * n,
            s: Z(a[Se]) * n,
            ms: Z(Ht(1e3 * a[Ye])) * n
        }) : (a = It.exec(e)) ? (n = '-' === a[1] ? -1 : 1,
        r = {
            y: zt(a[2], n),
            M: zt(a[3], n),
            w: zt(a[4], n),
            d: zt(a[5], n),
            h: zt(a[6], n),
            m: zt(a[7], n),
            s: zt(a[8], n)
        }) : null == r ? r = {} : 'object' == typeof r && ('from'in r || 'to'in r) && (i = function(e, t) {
            let n;
            if (!e.isValid() || !t.isValid())
                return {
                    milliseconds: 0,
                    months: 0
                };
            t = Gt(t, e),
            e.isBefore(t) ? n = $t(e, t) : ((n = $t(t, e)).milliseconds = -n.milliseconds,
            n.months = -n.months);
            return n;
        }(Tt(r.from), Tt(r.to)),
        (r = {}).ms = i.milliseconds,
        r.M = i.months),
        s = new Ct(r),
        Ut(e) && m(e, '_locale') && (s._locale = e._locale),
        Ut(e) && m(e, '_isValid') && (s._isValid = e._isValid),
        s;
    }
    function zt(e, t) {
        const n = e && parseFloat(e.replace(',', '.'));
        return (isNaN(n) ? 0 : n) * t;
    }
    function $t(e, t) {
        const n = {};
        return n.months = t.month() - e.month() + 12 * (t.year() - e.year()),
        e.clone().add(n.months, 'M').isAfter(t) && --n.months,
        n.milliseconds = t - e.clone().add(n.months, 'M'),
        n;
    }
    function qt(s, i) {
        return function(e, t) {
            let n;
            return null === t || isNaN(+t) || (Y(i, 'moment().' + i + '(period, number) is deprecated. Please use moment().' + i + '(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'),
            n = e,
            e = t,
            t = n),
            Bt(this, Zt(e, t), s),
            this;
        };
    }
    function Bt(e, t, n, s) {
        const i = t._milliseconds
          , r = Ht(t._days)
          , a = Ht(t._months);
        e.isValid() && (s = null == s || s,
        a && Ce(e, $(e, 'Month') + a * n),
        r && q(e, 'Date', $(e, 'Date') + r * n),
        i && e._d.setTime(e._d.valueOf() + i * n),
        s && f.updateOffset(e, r || a));
    }
    Zt.fn = Ct.prototype,
    Zt.invalid = function() {
        return Zt(NaN);
    }
    ;
    const Jt = qt(1, 'add')
      , Qt = qt(-1, 'subtract');
    function Xt(e) {
        return 'string' == typeof e || e instanceof String;
    }
    function Kt(e) {
        return M(e) || a(e) || Xt(e) || h(e) || function(t) {
            let e = o(t)
              , n = !1;
            e && (n = 0 === t.filter(function(e) {
                return !h(e) && Xt(t);
            }).length);
            return e && n;
        }(e) || function(e) {
            let t, n, s = u(e) && !l(e), i = !1, r = ['years', 'year', 'y', 'months', 'month', 'M', 'days', 'day', 'd', 'dates', 'date', 'D', 'hours', 'hour', 'h', 'minutes', 'minute', 'm', 'seconds', 'second', 's', 'milliseconds', 'millisecond', 'ms'];
            for (t = 0; t < r.length; t += 1)
                n = r[t],
                i = i || m(e, n);
            return s && i;
        }(e) || null == e;
    }
    function en(e, t) {
        if (e.date() < t.date())
            return -en(t, e);
        const n = 12 * (t.year() - e.year()) + (t.month() - e.month())
          , s = e.clone().add(n, 'months')
          , i = t - s < 0 ? (t - s) / (s - e.clone().add(n - 1, 'months')) : (t - s) / (e.clone().add(1 + n, 'months') - s);
        return -(n + i) || 0;
    }
    function tn(e) {
        let t;
        return void 0 === e ? this._locale._abbr : (null != (t = dt(e)) && (this._locale = t),
        this);
    }
    f.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ',
    f.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';
    const nn = n('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function(e) {
        return void 0 === e ? this.localeData() : this.locale(e);
    });
    function sn() {
        return this._locale;
    }
    const rn = 126227808e5;
    function an(e, t) {
        return (e % t + t) % t;
    }
    function on(e, t, n) {
        return e < 100 && 0 <= e ? new Date(e + 400,t,n) - rn : new Date(e,t,n).valueOf();
    }
    function un(e, t, n) {
        return e < 100 && 0 <= e ? Date.UTC(e + 400, t, n) - rn : Date.UTC(e, t, n);
    }
    function ln(e, t) {
        return t.erasAbbrRegex(e);
    }
    function hn() {
        for (var e = [], t = [], n = [], s = [], i = this.eras(), r = 0, a = i.length; r < a; ++r)
            t.push(me(i[r].name)),
            e.push(me(i[r].abbr)),
            n.push(me(i[r].narrow)),
            s.push(me(i[r].name)),
            s.push(me(i[r].abbr)),
            s.push(me(i[r].narrow));
        this._erasRegex = new RegExp('^(' + s.join('|') + ')','i'),
        this._erasNameRegex = new RegExp('^(' + t.join('|') + ')','i'),
        this._erasAbbrRegex = new RegExp('^(' + e.join('|') + ')','i'),
        this._erasNarrowRegex = new RegExp('^(' + n.join('|') + ')','i');
    }
    function dn(e, t) {
        C(0, [e, e.length], 0, t);
    }
    function cn(e, t, n, s, i) {
        let r;
        return null == e ? Ae(this, s, i).year : ((r = je(e, s, i)) < t && (t = r),
        function(e, t, n, s, i) {
            const r = Ee(e, t, n, s, i)
              , a = Ve(r.year, 0, r.dayOfYear);
            return this.year(a.getUTCFullYear()),
            this.month(a.getUTCMonth()),
            this.date(a.getUTCDate()),
            this;
        }
        .call(this, e, t, n, s, i));
    }
    C('N', 0, 0, 'eraAbbr'),
    C('NN', 0, 0, 'eraAbbr'),
    C('NNN', 0, 0, 'eraAbbr'),
    C('NNNN', 0, 0, 'eraName'),
    C('NNNNN', 0, 0, 'eraNarrow'),
    C('y', ['y', 1], 'yo', 'eraYear'),
    C('y', ['yy', 2], 0, 'eraYear'),
    C('y', ['yyy', 3], 0, 'eraYear'),
    C('y', ['yyyy', 4], 0, 'eraYear'),
    ce('N', ln),
    ce('NN', ln),
    ce('NNN', ln),
    ce('NNNN', function(e, t) {
        return t.erasNameRegex(e);
    }),
    ce('NNNNN', function(e, t) {
        return t.erasNarrowRegex(e);
    }),
    ye(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function(e, t, n, s) {
        const i = n._locale.erasParse(e, s, n._strict);
        i ? y(n).era = i : y(n).invalidEra = e;
    }),
    ce('y', oe),
    ce('yy', oe),
    ce('yyy', oe),
    ce('yyyy', oe),
    ce('yo', function(e, t) {
        return t._eraYearOrdinalRegex || oe;
    }),
    ye(['y', 'yy', 'yyy', 'yyyy'], pe),
    ye(['yo'], function(e, t, n, s) {
        let i;
        n._locale._eraYearOrdinalRegex && (i = e.match(n._locale._eraYearOrdinalRegex)),
        n._locale.eraYearOrdinalParse ? t[pe] = n._locale.eraYearOrdinalParse(e, i) : t[pe] = parseInt(e, 10);
    }),
    C(0, ['gg', 2], 0, function() {
        return this.weekYear() % 100;
    }),
    C(0, ['GG', 2], 0, function() {
        return this.isoWeekYear() % 100;
    }),
    dn('gggg', 'weekYear'),
    dn('ggggg', 'weekYear'),
    dn('GGGG', 'isoWeekYear'),
    dn('GGGGG', 'isoWeekYear'),
    L('weekYear', 'gg'),
    L('isoWeekYear', 'GG'),
    A('weekYear', 1),
    A('isoWeekYear', 1),
    ce('G', ue),
    ce('g', ue),
    ce('GG', te, Q),
    ce('gg', te, Q),
    ce('GGGG', re, K),
    ce('gggg', re, K),
    ce('GGGGG', ae, ee),
    ce('ggggg', ae, ee),
    ge(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function(e, t, n, s) {
        t[s.substr(0, 2)] = Z(e);
    }),
    ge(['gg', 'GG'], function(e, t, n, s) {
        t[s] = f.parseTwoDigitYear(e);
    }),
    C('Q', 0, 'Qo', 'quarter'),
    L('quarter', 'Q'),
    A('quarter', 7),
    ce('Q', J),
    ye('Q', function(e, t) {
        t[ve] = 3 * (Z(e) - 1);
    }),
    C('D', ['DD', 2], 'Do', 'date'),
    L('date', 'D'),
    A('date', 9),
    ce('D', te),
    ce('DD', te, Q),
    ce('Do', function(e, t) {
        return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
    }),
    ye(['D', 'DD'], ke),
    ye('Do', function(e, t) {
        t[ke] = Z(e.match(te)[0]);
    });
    const fn = z('Date', !0);
    C('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear'),
    L('dayOfYear', 'DDD'),
    A('dayOfYear', 4),
    ce('DDD', ie),
    ce('DDDD', X),
    ye(['DDD', 'DDDD'], function(e, t, n) {
        n._dayOfYear = Z(e);
    }),
    C('m', ['mm', 2], 0, 'minute'),
    L('minute', 'm'),
    A('minute', 14),
    ce('m', te),
    ce('mm', te, Q),
    ye(['m', 'mm'], De);
    const mn = z('Minutes', !1);
    C('s', ['ss', 2], 0, 'second'),
    L('second', 's'),
    A('second', 15),
    ce('s', te),
    ce('ss', te, Q),
    ye(['s', 'ss'], Se);
    let _n, yn, gn = z('Seconds', !1);
    for (C('S', 0, 0, function() {
        return ~~(this.millisecond() / 100);
    }),
    C(0, ['SS', 2], 0, function() {
        return ~~(this.millisecond() / 10);
    }),
    C(0, ['SSS', 3], 0, 'millisecond'),
    C(0, ['SSSS', 4], 0, function() {
        return 10 * this.millisecond();
    }),
    C(0, ['SSSSS', 5], 0, function() {
        return 100 * this.millisecond();
    }),
    C(0, ['SSSSSS', 6], 0, function() {
        return 1e3 * this.millisecond();
    }),
    C(0, ['SSSSSSS', 7], 0, function() {
        return 1e4 * this.millisecond();
    }),
    C(0, ['SSSSSSSS', 8], 0, function() {
        return 1e5 * this.millisecond();
    }),
    C(0, ['SSSSSSSSS', 9], 0, function() {
        return 1e6 * this.millisecond();
    }),
    L('millisecond', 'ms'),
    A('millisecond', 16),
    ce('S', ie, J),
    ce('SS', ie, Q),
    ce('SSS', ie, X),
    _n = 'SSSS'; _n.length <= 9; _n += 'S')
        ce(_n, oe);
    function wn(e, t) {
        t[Ye] = Z(1e3 * ('0.' + e));
    }
    for (_n = 'S'; _n.length <= 9; _n += 'S')
        ye(_n, wn);
    yn = z('Milliseconds', !1),
    C('z', 0, 0, 'zoneAbbr'),
    C('zz', 0, 0, 'zoneName');
    const pn = k.prototype;
    function vn(e) {
        return e;
    }
    pn.add = Jt,
    pn.calendar = function(e, t) {
        1 === arguments.length && (arguments[0] ? Kt(arguments[0]) ? (e = arguments[0],
        t = void 0) : function(e) {
            for (var t = u(e) && !l(e), n = !1, s = ['sameDay', 'nextDay', 'lastDay', 'nextWeek', 'lastWeek', 'sameElse'], i = 0; i < s.length; i += 1)
                n = n || m(e, s[i]);
            return t && n;
        }(arguments[0]) && (t = arguments[0],
        e = void 0) : t = e = void 0);
        const n = e || Tt()
          , s = Gt(n, this).startOf('day')
          , i = f.calendarFormat(this, s) || 'sameElse'
          , r = t && (O(t[i]) ? t[i].call(this, n) : t[i]);
        return this.format(r || this.localeData().calendar(i, this, Tt(n)));
    }
    ,
    pn.clone = function() {
        return new k(this);
    }
    ,
    pn.diff = function(e, t, n) {
        let s, i, r;
        if (!this.isValid())
            return NaN;
        if (!(s = Gt(e, this)).isValid())
            return NaN;
        switch (i = 6e4 * (s.utcOffset() - this.utcOffset()),
        t = V(t)) {
        case 'year':
            r = en(this, s) / 12;
            break;
        case 'month':
            r = en(this, s);
            break;
        case 'quarter':
            r = en(this, s) / 3;
            break;
        case 'second':
            r = (this - s) / 1e3;
            break;
        case 'minute':
            r = (this - s) / 6e4;
            break;
        case 'hour':
            r = (this - s) / 36e5;
            break;
        case 'day':
            r = (this - s - i) / 864e5;
            break;
        case 'week':
            r = (this - s - i) / 6048e5;
            break;
        default:
            r = this - s;
        }
        return n ? r : I(r);
    }
    ,
    pn.endOf = function(e) {
        let t, n;
        if (void 0 === (e = V(e)) || 'millisecond' === e || !this.isValid())
            return this;
        switch (n = this._isUTC ? un : on,
        e) {
        case 'year':
            t = n(this.year() + 1, 0, 1) - 1;
            break;
        case 'quarter':
            t = n(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
            break;
        case 'month':
            t = n(this.year(), this.month() + 1, 1) - 1;
            break;
        case 'week':
            t = n(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
            break;
        case 'isoWeek':
            t = n(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
            break;
        case 'day':
        case 'date':
            t = n(this.year(), this.month(), this.date() + 1) - 1;
            break;
        case 'hour':
            t = this._d.valueOf(),
            t += 36e5 - an(t + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5) - 1;
            break;
        case 'minute':
            t = this._d.valueOf(),
            t += 6e4 - an(t, 6e4) - 1;
            break;
        case 'second':
            t = this._d.valueOf(),
            t += 1e3 - an(t, 1e3) - 1;
            break;
        }
        return this._d.setTime(t),
        f.updateOffset(this, !0),
        this;
    }
    ,
    pn.format = function(e) {
        e = e || (this.isUtc() ? f.defaultFormatUtc : f.defaultFormat);
        const t = U(this, e);
        return this.localeData().postformat(t);
    }
    ,
    pn.from = function(e, t) {
        return this.isValid() && (M(e) && e.isValid() || Tt(e).isValid()) ? Zt({
            to: this,
            from: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
    }
    ,
    pn.fromNow = function(e) {
        return this.from(Tt(), e);
    }
    ,
    pn.to = function(e, t) {
        return this.isValid() && (M(e) && e.isValid() || Tt(e).isValid()) ? Zt({
            from: this,
            to: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
    }
    ,
    pn.toNow = function(e) {
        return this.to(Tt(), e);
    }
    ,
    pn.get = function(e) {
        return O(this[e = V(e)]) ? this[e]() : this;
    }
    ,
    pn.invalidAt = function() {
        return y(this).overflow;
    }
    ,
    pn.isAfter = function(e, t) {
        const n = M(e) ? e : Tt(e);
        return !(!this.isValid() || !n.isValid()) && ('millisecond' === (t = V(t) || 'millisecond') ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(t).valueOf());
    }
    ,
    pn.isBefore = function(e, t) {
        const n = M(e) ? e : Tt(e);
        return !(!this.isValid() || !n.isValid()) && ('millisecond' === (t = V(t) || 'millisecond') ? this.valueOf() < n.valueOf() : this.clone().endOf(t).valueOf() < n.valueOf());
    }
    ,
    pn.isBetween = function(e, t, n, s) {
        const i = M(e) ? e : Tt(e)
          , r = M(t) ? t : Tt(t);
        return !!(this.isValid() && i.isValid() && r.isValid()) && (('(' === (s = s || '()')[0] ? this.isAfter(i, n) : !this.isBefore(i, n)) && (')' === s[1] ? this.isBefore(r, n) : !this.isAfter(r, n)));
    }
    ,
    pn.isSame = function(e, t) {
        let n, s = M(e) ? e : Tt(e);
        return !(!this.isValid() || !s.isValid()) && ('millisecond' === (t = V(t) || 'millisecond') ? this.valueOf() === s.valueOf() : (n = s.valueOf(),
        this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf()));
    }
    ,
    pn.isSameOrAfter = function(e, t) {
        return this.isSame(e, t) || this.isAfter(e, t);
    }
    ,
    pn.isSameOrBefore = function(e, t) {
        return this.isSame(e, t) || this.isBefore(e, t);
    }
    ,
    pn.isValid = function() {
        return g(this);
    }
    ,
    pn.lang = nn,
    pn.locale = tn,
    pn.localeData = sn,
    pn.max = Pt,
    pn.min = Nt,
    pn.parsingFlags = function() {
        return c({}, y(this));
    }
    ,
    pn.set = function(e, t) {
        if ('object' == typeof e)
            for (let n = function(e) {
                let t, n = [];
                for (t in e)
                    m(e, t) && n.push({
                        unit: t,
                        priority: E[t]
                    });
                return n.sort(function(e, t) {
                    return e.priority - t.priority;
                }),
                n;
            }(e = G(e)), s = 0; s < n.length; s++)
                this[n[s].unit](e[n[s].unit]);
        else if (O(this[e = V(e)]))
            return this[e](t);
        return this;
    }
    ,
    pn.startOf = function(e) {
        let t, n;
        if (void 0 === (e = V(e)) || 'millisecond' === e || !this.isValid())
            return this;
        switch (n = this._isUTC ? un : on,
        e) {
        case 'year':
            t = n(this.year(), 0, 1);
            break;
        case 'quarter':
            t = n(this.year(), this.month() - this.month() % 3, 1);
            break;
        case 'month':
            t = n(this.year(), this.month(), 1);
            break;
        case 'week':
            t = n(this.year(), this.month(), this.date() - this.weekday());
            break;
        case 'isoWeek':
            t = n(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
            break;
        case 'day':
        case 'date':
            t = n(this.year(), this.month(), this.date());
            break;
        case 'hour':
            t = this._d.valueOf(),
            t -= an(t + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5);
            break;
        case 'minute':
            t = this._d.valueOf(),
            t -= an(t, 6e4);
            break;
        case 'second':
            t = this._d.valueOf(),
            t -= an(t, 1e3);
            break;
        }
        return this._d.setTime(t),
        f.updateOffset(this, !0),
        this;
    }
    ,
    pn.subtract = Qt,
    pn.toArray = function() {
        const e = this;
        return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()];
    }
    ,
    pn.toObject = function() {
        const e = this;
        return {
            years: e.year(),
            months: e.month(),
            date: e.date(),
            hours: e.hours(),
            minutes: e.minutes(),
            seconds: e.seconds(),
            milliseconds: e.milliseconds()
        };
    }
    ,
    pn.toDate = function() {
        return new Date(this.valueOf());
    }
    ,
    pn.toISOString = function(e) {
        if (!this.isValid())
            return null;
        const t = !0 !== e
          , n = t ? this.clone().utc() : this;
        return n.year() < 0 || 9999 < n.year() ? U(n, t ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ') : O(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace('Z', U(n, 'Z')) : U(n, t ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }
    ,
    pn.inspect = function() {
        if (!this.isValid())
            return 'moment.invalid(/* ' + this._i + ' */)';
        let e, t, n, s = 'moment', i = '';
        return this.isLocal() || (s = 0 === this.utcOffset() ? 'moment.utc' : 'moment.parseZone',
        i = 'Z'),
        e = '[' + s + '("]',
        t = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY',
        n = i + '[")]',
        this.format(e + t + '-MM-DD[T]HH:mm:ss.SSS' + n);
    }
    ,
    'undefined' != typeof Symbol && null != Symbol.for && (pn[Symbol.for('nodejs.util.inspect.custom')] = function() {
        return 'Moment<' + this.format() + '>';
    }
    ),
    pn.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
    }
    ,
    pn.toString = function() {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }
    ,
    pn.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
    }
    ,
    pn.valueOf = function() {
        return this._d.valueOf() - 6e4 * (this._offset || 0);
    }
    ,
    pn.creationData = function() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }
    ,
    pn.eraName = function() {
        for (var e, t = this.localeData().eras(), n = 0, s = t.length; n < s; ++n) {
            if (e = this.clone().startOf('day').valueOf(),
            t[n].since <= e && e <= t[n].until)
                return t[n].name;
            if (t[n].until <= e && e <= t[n].since)
                return t[n].name;
        }
        return '';
    }
    ,
    pn.eraNarrow = function() {
        for (var e, t = this.localeData().eras(), n = 0, s = t.length; n < s; ++n) {
            if (e = this.clone().startOf('day').valueOf(),
            t[n].since <= e && e <= t[n].until)
                return t[n].narrow;
            if (t[n].until <= e && e <= t[n].since)
                return t[n].narrow;
        }
        return '';
    }
    ,
    pn.eraAbbr = function() {
        for (var e, t = this.localeData().eras(), n = 0, s = t.length; n < s; ++n) {
            if (e = this.clone().startOf('day').valueOf(),
            t[n].since <= e && e <= t[n].until)
                return t[n].abbr;
            if (t[n].until <= e && e <= t[n].since)
                return t[n].abbr;
        }
        return '';
    }
    ,
    pn.eraYear = function() {
        for (var e, t, n = this.localeData().eras(), s = 0, i = n.length; s < i; ++s)
            if (e = n[s].since <= n[s].until ? 1 : -1,
            t = this.clone().startOf('day').valueOf(),
            n[s].since <= t && t <= n[s].until || n[s].until <= t && t <= n[s].since)
                return (this.year() - f(n[s].since).year()) * e + n[s].offset;
        return this.year();
    }
    ,
    pn.year = Le,
    pn.isLeapYear = function() {
        return j(this.year());
    }
    ,
    pn.weekYear = function(e) {
        return cn.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
    }
    ,
    pn.isoWeekYear = function(e) {
        return cn.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
    }
    ,
    pn.quarter = pn.quarters = function(e) {
        return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3);
    }
    ,
    pn.month = Ue,
    pn.daysInMonth = function() {
        return xe(this.year(), this.month());
    }
    ,
    pn.week = pn.weeks = function(e) {
        const t = this.localeData().week(this);
        return null == e ? t : this.add(7 * (e - t), 'd');
    }
    ,
    pn.isoWeek = pn.isoWeeks = function(e) {
        const t = Ae(this, 1, 4).week;
        return null == e ? t : this.add(7 * (e - t), 'd');
    }
    ,
    pn.weeksInYear = function() {
        const e = this.localeData()._week;
        return je(this.year(), e.dow, e.doy);
    }
    ,
    pn.weeksInWeekYear = function() {
        const e = this.localeData()._week;
        return je(this.weekYear(), e.dow, e.doy);
    }
    ,
    pn.isoWeeksInYear = function() {
        return je(this.year(), 1, 4);
    }
    ,
    pn.isoWeeksInISOWeekYear = function() {
        return je(this.isoWeekYear(), 1, 4);
    }
    ,
    pn.date = fn,
    pn.day = pn.days = function(e) {
        if (!this.isValid())
            return null != e ? this : NaN;
        let t, n, s = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != e ? (t = e,
        n = this.localeData(),
        e = 'string' != typeof t ? t : isNaN(t) ? 'number' == typeof (t = n.weekdaysParse(t)) ? t : null : parseInt(t, 10),
        this.add(e - s, 'd')) : s;
    }
    ,
    pn.weekday = function(e) {
        if (!this.isValid())
            return null != e ? this : NaN;
        const t = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == e ? t : this.add(e - t, 'd');
    }
    ,
    pn.isoWeekday = function(e) {
        if (!this.isValid())
            return null != e ? this : NaN;
        if (null == e)
            return this.day() || 7;
        let t, n, s = (t = e,
        n = this.localeData(),
        'string' == typeof t ? n.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t);
        return this.day(this.day() % 7 ? s : s - 7);
    }
    ,
    pn.dayOfYear = function(e) {
        const t = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return null == e ? t : this.add(e - t, 'd');
    }
    ,
    pn.hour = pn.hours = tt,
    pn.minute = pn.minutes = mn,
    pn.second = pn.seconds = gn,
    pn.millisecond = pn.milliseconds = yn,
    pn.utcOffset = function(e, t, n) {
        let s, i = this._offset || 0;
        if (!this.isValid())
            return null != e ? this : NaN;
        if (null == e)
            return this._isUTC ? i : Et(this);
        if ('string' == typeof e) {
            if (null === (e = Vt(he, e)))
                return this;
        } else
            Math.abs(e) < 16 && !n && (e *= 60);
        return !this._isUTC && t && (s = Et(this)),
        this._offset = e,
        this._isUTC = !0,
        null != s && this.add(s, 'm'),
        i !== e && (!t || this._changeInProgress ? Bt(this, Zt(e - i, 'm'), 1, !1) : this._changeInProgress || (this._changeInProgress = !0,
        f.updateOffset(this, !0),
        this._changeInProgress = null)),
        this;
    }
    ,
    pn.utc = function(e) {
        return this.utcOffset(0, e);
    }
    ,
    pn.local = function(e) {
        return this._isUTC && (this.utcOffset(0, e),
        this._isUTC = !1,
        e && this.subtract(Et(this), 'm')),
        this;
    }
    ,
    pn.parseZone = function() {
        let e;
        return null != this._tzm ? this.utcOffset(this._tzm, !1, !0) : 'string' == typeof this._i && (null != (e = Vt(le, this._i)) ? this.utcOffset(e) : this.utcOffset(0, !0)),
        this;
    }
    ,
    pn.hasAlignedHourOffset = function(e) {
        return !!this.isValid() && (e = e ? Tt(e).utcOffset() : 0,
        (this.utcOffset() - e) % 60 == 0);
    }
    ,
    pn.isDST = function() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
    }
    ,
    pn.isLocal = function() {
        return !!this.isValid() && !this._isUTC;
    }
    ,
    pn.isUtcOffset = function() {
        return !!this.isValid() && this._isUTC;
    }
    ,
    pn.isUtc = At,
    pn.isUTC = At,
    pn.zoneAbbr = function() {
        return this._isUTC ? 'UTC' : '';
    }
    ,
    pn.zoneName = function() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }
    ,
    pn.dates = n('dates accessor is deprecated. Use date instead.', fn),
    pn.months = n('months accessor is deprecated. Use month instead', Ue),
    pn.years = n('years accessor is deprecated. Use year instead', Le),
    pn.zone = n('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', function(e, t) {
        return null != e ? ('string' != typeof e && (e = -e),
        this.utcOffset(e, t),
        this) : -this.utcOffset();
    }),
    pn.isDSTShifted = n('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', function() {
        if (!r(this._isDSTShifted))
            return this._isDSTShifted;
        let e, t = {};
        return v(t, this),
        (t = bt(t))._a ? (e = (t._isUTC ? _ : Tt)(t._a),
        this._isDSTShifted = this.isValid() && 0 < function(e, t, n) {
            for (var s = Math.min(e.length, t.length), i = Math.abs(e.length - t.length), r = 0, a = 0; a < s; a++)
                (n && e[a] !== t[a] || !n && Z(e[a]) !== Z(t[a])) && r++;
            return r + i;
        }(t._a, e.toArray())) : this._isDSTShifted = !1,
        this._isDSTShifted;
    });
    const kn = x.prototype;
    function Mn(e, t, n, s) {
        const i = dt()
          , r = _().set(s, t);
        return i[n](r, e);
    }
    function Dn(e, t, n) {
        if (h(e) && (t = e,
        e = void 0),
        e = e || '',
        null != t)
            return Mn(e, t, n, 'month');
        for (var s = [], i = 0; i < 12; i++)
            s[i] = Mn(e, i, n, 'month');
        return s;
    }
    function Sn(e, t, n, s) {
        t = ('boolean' == typeof e ? h(t) && (n = t,
        t = void 0) : (t = e,
        e = !1,
        h(n = t) && (n = t,
        t = void 0)),
        t || '');
        let i, r = dt(), a = e ? r._week.dow : 0, o = [];
        if (null != n)
            return Mn(t, (n + a) % 7, s, 'day');
        for (i = 0; i < 7; i++)
            o[i] = Mn(t, (i + a) % 7, s, 'day');
        return o;
    }
    kn.calendar = function(e, t, n) {
        const s = this._calendar[e] || this._calendar.sameElse;
        return O(s) ? s.call(t, n) : s;
    }
    ,
    kn.longDateFormat = function(e) {
        const t = this._longDateFormat[e]
          , n = this._longDateFormat[e.toUpperCase()];
        return t || !n ? t : (this._longDateFormat[e] = n.match(N).map(function(e) {
            return 'MMMM' === e || 'MM' === e || 'DD' === e || 'dddd' === e ? e.slice(1) : e;
        }).join(''),
        this._longDateFormat[e]);
    }
    ,
    kn.invalidDate = function() {
        return this._invalidDate;
    }
    ,
    kn.ordinal = function(e) {
        return this._ordinal.replace('%d', e);
    }
    ,
    kn.preparse = vn,
    kn.postformat = vn,
    kn.relativeTime = function(e, t, n, s) {
        const i = this._relativeTime[n];
        return O(i) ? i(e, t, n, s) : i.replace(/%d/i, e);
    }
    ,
    kn.pastFuture = function(e, t) {
        const n = this._relativeTime[0 < e ? 'future' : 'past'];
        return O(n) ? n(t) : n.replace(/%s/i, t);
    }
    ,
    kn.set = function(e) {
        let t, n;
        for (n in e)
            m(e, n) && (O(t = e[n]) ? this[n] = t : this['_' + n] = t);
        this._config = e,
        this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
    }
    ,
    kn.eras = function(e, t) {
        for (var n, s = this._eras || dt('en')._eras, i = 0, r = s.length; i < r; ++i) {
            switch (typeof s[i].since) {
            case 'string':
                n = f(s[i].since).startOf('day'),
                s[i].since = n.valueOf();
                break;
            }
            switch (typeof s[i].until) {
            case 'undefined':
                s[i].until = 1 / 0;
                break;
            case 'string':
                n = f(s[i].until).startOf('day').valueOf(),
                s[i].until = n.valueOf();
                break;
            }
        }
        return s;
    }
    ,
    kn.erasParse = function(e, t, n) {
        let s, i, r, a, o, u = this.eras();
        for (e = e.toUpperCase(),
        s = 0,
        i = u.length; s < i; ++s)
            if (r = u[s].name.toUpperCase(),
            a = u[s].abbr.toUpperCase(),
            o = u[s].narrow.toUpperCase(),
            n)
                switch (t) {
                case 'N':
                case 'NN':
                case 'NNN':
                    if (a === e)
                        return u[s];
                    break;
                case 'NNNN':
                    if (r === e)
                        return u[s];
                    break;
                case 'NNNNN':
                    if (o === e)
                        return u[s];
                    break;
                }
            else if (0 <= [r, a, o].indexOf(e))
                return u[s];
    }
    ,
    kn.erasConvertYear = function(e, t) {
        const n = e.since <= e.until ? 1 : -1;
        return void 0 === t ? f(e.since).year() : f(e.since).year() + (t - e.offset) * n;
    }
    ,
    kn.erasAbbrRegex = function(e) {
        return m(this, '_erasAbbrRegex') || hn.call(this),
        e ? this._erasAbbrRegex : this._erasRegex;
    }
    ,
    kn.erasNameRegex = function(e) {
        return m(this, '_erasNameRegex') || hn.call(this),
        e ? this._erasNameRegex : this._erasRegex;
    }
    ,
    kn.erasNarrowRegex = function(e) {
        return m(this, '_erasNarrowRegex') || hn.call(this),
        e ? this._erasNarrowRegex : this._erasRegex;
    }
    ,
    kn.months = function(e, t) {
        return e ? o(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Pe).test(t) ? 'format' : 'standalone'][e.month()] : o(this._months) ? this._months : this._months.standalone;
    }
    ,
    kn.monthsShort = function(e, t) {
        return e ? o(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Pe.test(t) ? 'format' : 'standalone'][e.month()] : o(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
    }
    ,
    kn.monthsParse = function(e, t, n) {
        let s, i, r;
        if (this._monthsParseExact)
            return function(e, t, n) {
                let s, i, r, a = e.toLocaleLowerCase();
                if (!this._monthsParse)
                    for (this._monthsParse = [],
                    this._longMonthsParse = [],
                    this._shortMonthsParse = [],
                    s = 0; s < 12; ++s)
                        r = _([2e3, s]),
                        this._shortMonthsParse[s] = this.monthsShort(r, '').toLocaleLowerCase(),
                        this._longMonthsParse[s] = this.months(r, '').toLocaleLowerCase();
                return n ? 'MMM' === t ? -1 !== (i = we.call(this._shortMonthsParse, a)) ? i : null : -1 !== (i = we.call(this._longMonthsParse, a)) ? i : null : 'MMM' === t ? -1 !== (i = we.call(this._shortMonthsParse, a)) || -1 !== (i = we.call(this._longMonthsParse, a)) ? i : null : -1 !== (i = we.call(this._longMonthsParse, a)) || -1 !== (i = we.call(this._shortMonthsParse, a)) ? i : null;
            }
            .call(this, e, t, n);
        for (this._monthsParse || (this._monthsParse = [],
        this._longMonthsParse = [],
        this._shortMonthsParse = []),
        s = 0; s < 12; s++) {
            if (i = _([2e3, s]),
            n && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp('^' + this.months(i, '').replace('.', '') + '$','i'),
            this._shortMonthsParse[s] = new RegExp('^' + this.monthsShort(i, '').replace('.', '') + '$','i')),
            n || this._monthsParse[s] || (r = '^' + this.months(i, '') + '|^' + this.monthsShort(i, ''),
            this._monthsParse[s] = new RegExp(r.replace('.', ''),'i')),
            n && 'MMMM' === t && this._longMonthsParse[s].test(e))
                return s;
            if (n && 'MMM' === t && this._shortMonthsParse[s].test(e))
                return s;
            if (!n && this._monthsParse[s].test(e))
                return s;
        }
    }
    ,
    kn.monthsRegex = function(e) {
        return this._monthsParseExact ? (m(this, '_monthsRegex') || He.call(this),
        e ? this._monthsStrictRegex : this._monthsRegex) : (m(this, '_monthsRegex') || (this._monthsRegex = We),
        this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
    }
    ,
    kn.monthsShortRegex = function(e) {
        return this._monthsParseExact ? (m(this, '_monthsRegex') || He.call(this),
        e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (m(this, '_monthsShortRegex') || (this._monthsShortRegex = Re),
        this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
    }
    ,
    kn.week = function(e) {
        return Ae(e, this._week.dow, this._week.doy).week;
    }
    ,
    kn.firstDayOfYear = function() {
        return this._week.doy;
    }
    ,
    kn.firstDayOfWeek = function() {
        return this._week.dow;
    }
    ,
    kn.weekdays = function(e, t) {
        const n = o(this._weekdays) ? this._weekdays : this._weekdays[e && !0 !== e && this._weekdays.isFormat.test(t) ? 'format' : 'standalone'];
        return !0 === e ? Ie(n, this._week.dow) : e ? n[e.day()] : n;
    }
    ,
    kn.weekdaysMin = function(e) {
        return !0 === e ? Ie(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
    }
    ,
    kn.weekdaysShort = function(e) {
        return !0 === e ? Ie(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
    }
    ,
    kn.weekdaysParse = function(e, t, n) {
        let s, i, r;
        if (this._weekdaysParseExact)
            return function(e, t, n) {
                let s, i, r, a = e.toLocaleLowerCase();
                if (!this._weekdaysParse)
                    for (this._weekdaysParse = [],
                    this._shortWeekdaysParse = [],
                    this._minWeekdaysParse = [],
                    s = 0; s < 7; ++s)
                        r = _([2e3, 1]).day(s),
                        this._minWeekdaysParse[s] = this.weekdaysMin(r, '').toLocaleLowerCase(),
                        this._shortWeekdaysParse[s] = this.weekdaysShort(r, '').toLocaleLowerCase(),
                        this._weekdaysParse[s] = this.weekdays(r, '').toLocaleLowerCase();
                return n ? 'dddd' === t ? -1 !== (i = we.call(this._weekdaysParse, a)) ? i : null : 'ddd' === t ? -1 !== (i = we.call(this._shortWeekdaysParse, a)) ? i : null : -1 !== (i = we.call(this._minWeekdaysParse, a)) ? i : null : 'dddd' === t ? -1 !== (i = we.call(this._weekdaysParse, a)) || -1 !== (i = we.call(this._shortWeekdaysParse, a)) || -1 !== (i = we.call(this._minWeekdaysParse, a)) ? i : null : 'ddd' === t ? -1 !== (i = we.call(this._shortWeekdaysParse, a)) || -1 !== (i = we.call(this._weekdaysParse, a)) || -1 !== (i = we.call(this._minWeekdaysParse, a)) ? i : null : -1 !== (i = we.call(this._minWeekdaysParse, a)) || -1 !== (i = we.call(this._weekdaysParse, a)) || -1 !== (i = we.call(this._shortWeekdaysParse, a)) ? i : null;
            }
            .call(this, e, t, n);
        for (this._weekdaysParse || (this._weekdaysParse = [],
        this._minWeekdaysParse = [],
        this._shortWeekdaysParse = [],
        this._fullWeekdaysParse = []),
        s = 0; s < 7; s++) {
            if (i = _([2e3, 1]).day(s),
            n && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp('^' + this.weekdays(i, '').replace('.', '\\.?') + '$','i'),
            this._shortWeekdaysParse[s] = new RegExp('^' + this.weekdaysShort(i, '').replace('.', '\\.?') + '$','i'),
            this._minWeekdaysParse[s] = new RegExp('^' + this.weekdaysMin(i, '').replace('.', '\\.?') + '$','i')),
            this._weekdaysParse[s] || (r = '^' + this.weekdays(i, '') + '|^' + this.weekdaysShort(i, '') + '|^' + this.weekdaysMin(i, ''),
            this._weekdaysParse[s] = new RegExp(r.replace('.', ''),'i')),
            n && 'dddd' === t && this._fullWeekdaysParse[s].test(e))
                return s;
            if (n && 'ddd' === t && this._shortWeekdaysParse[s].test(e))
                return s;
            if (n && 'dd' === t && this._minWeekdaysParse[s].test(e))
                return s;
            if (!n && this._weekdaysParse[s].test(e))
                return s;
        }
    }
    ,
    kn.weekdaysRegex = function(e) {
        return this._weekdaysParseExact ? (m(this, '_weekdaysRegex') || Qe.call(this),
        e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (m(this, '_weekdaysRegex') || (this._weekdaysRegex = qe),
        this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
    }
    ,
    kn.weekdaysShortRegex = function(e) {
        return this._weekdaysParseExact ? (m(this, '_weekdaysRegex') || Qe.call(this),
        e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (m(this, '_weekdaysShortRegex') || (this._weekdaysShortRegex = Be),
        this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
    }
    ,
    kn.weekdaysMinRegex = function(e) {
        return this._weekdaysParseExact ? (m(this, '_weekdaysRegex') || Qe.call(this),
        e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (m(this, '_weekdaysMinRegex') || (this._weekdaysMinRegex = Je),
        this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
    }
    ,
    kn.isPM = function(e) {
        return 'p' === (e + '').toLowerCase().charAt(0);
    }
    ,
    kn.meridiem = function(e, t, n) {
        return 11 < e ? n ? 'pm' : 'PM' : n ? 'am' : 'AM';
    }
    ,
    lt('en', {
        eras: [{
            since: '0001-01-01',
            until: 1 / 0,
            offset: 1,
            name: 'Anno Domini',
            narrow: 'AD',
            abbr: 'AD'
        }, {
            since: '0000-12-31',
            until: -1 / 0,
            offset: 1,
            name: 'Before Christ',
            narrow: 'BC',
            abbr: 'BC'
        }],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(e) {
            const t = e % 10;
            return e + (1 === Z(e % 100 / 10) ? 'th' : 1 == t ? 'st' : 2 == t ? 'nd' : 3 == t ? 'rd' : 'th');
        }
    }),
    f.lang = n('moment.lang is deprecated. Use moment.locale instead.', lt),
    f.langData = n('moment.langData is deprecated. Use moment.localeData instead.', dt);
    const Yn = Math.abs;
    function On(e, t, n, s) {
        const i = Zt(t, n);
        return e._milliseconds += s * i._milliseconds,
        e._days += s * i._days,
        e._months += s * i._months,
        e._bubble();
    }
    function bn(e) {
        return e < 0 ? Math.floor(e) : Math.ceil(e);
    }
    function xn(e) {
        return 4800 * e / 146097;
    }
    function Tn(e) {
        return 146097 * e / 4800;
    }
    function Nn(e) {
        return function() {
            return this.as(e);
        };
    }
    const Pn = Nn('ms')
      , Rn = Nn('s')
      , Wn = Nn('m')
      , Cn = Nn('h')
      , Un = Nn('d')
      , Hn = Nn('w')
      , Fn = Nn('M')
      , Ln = Nn('Q')
      , Vn = Nn('y');
    function Gn(e) {
        return function() {
            return this.isValid() ? this._data[e] : NaN;
        };
    }
    const En = Gn('milliseconds')
      , An = Gn('seconds')
      , jn = Gn('minutes')
      , In = Gn('hours')
      , Zn = Gn('days')
      , zn = Gn('months')
      , $n = Gn('years');
    let qn = Math.round
      , Bn = {
        ss: 44,
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        w: null,
        M: 11
    };
    function Jn(e, t, n, s) {
        let i = Zt(e).abs()
          , r = qn(i.as('s'))
          , a = qn(i.as('m'))
          , o = qn(i.as('h'))
          , u = qn(i.as('d'))
          , l = qn(i.as('M'))
          , h = qn(i.as('w'))
          , d = qn(i.as('y'))
          , c = (r <= n.ss ? ['s', r] : r < n.s && ['ss', r]) || a <= 1 && ['m'] || a < n.m && ['mm', a] || o <= 1 && ['h'] || o < n.h && ['hh', o] || u <= 1 && ['d'] || u < n.d && ['dd', u];
        return null != n.w && (c = c || h <= 1 && ['w'] || h < n.w && ['ww', h]),
        (c = c || l <= 1 && ['M'] || l < n.M && ['MM', l] || d <= 1 && ['y'] || ['yy', d])[2] = t,
        c[3] = 0 < +e,
        c[4] = s,
        function(e, t, n, s, i) {
            return i.relativeTime(t || 1, !!n, e, s);
        }
        .apply(null, c);
    }
    const Qn = Math.abs;
    function Xn(e) {
        return (0 < e) - (e < 0) || +e;
    }
    function Kn() {
        if (!this.isValid())
            return this.localeData().invalidDate();
        let e, t, n, s, i, r, a, o, u = Qn(this._milliseconds) / 1e3, l = Qn(this._days), h = Qn(this._months), d = this.asSeconds();
        return d ? (e = I(u / 60),
        t = I(e / 60),
        u %= 60,
        e %= 60,
        n = I(h / 12),
        h %= 12,
        s = u ? u.toFixed(3).replace(/\.?0+$/, '') : '',
        i = d < 0 ? '-' : '',
        r = Xn(this._months) !== Xn(d) ? '-' : '',
        a = Xn(this._days) !== Xn(d) ? '-' : '',
        o = Xn(this._milliseconds) !== Xn(d) ? '-' : '',
        i + 'P' + (n ? r + n + 'Y' : '') + (h ? r + h + 'M' : '') + (l ? a + l + 'D' : '') + (t || e || u ? 'T' : '') + (t ? o + t + 'H' : '') + (e ? o + e + 'M' : '') + (u ? o + s + 'S' : '')) : 'P0D';
    }
    const es = Ct.prototype;
    return es.isValid = function() {
        return this._isValid;
    }
    ,
    es.abs = function() {
        const e = this._data;
        return this._milliseconds = Yn(this._milliseconds),
        this._days = Yn(this._days),
        this._months = Yn(this._months),
        e.milliseconds = Yn(e.milliseconds),
        e.seconds = Yn(e.seconds),
        e.minutes = Yn(e.minutes),
        e.hours = Yn(e.hours),
        e.months = Yn(e.months),
        e.years = Yn(e.years),
        this;
    }
    ,
    es.add = function(e, t) {
        return On(this, e, t, 1);
    }
    ,
    es.subtract = function(e, t) {
        return On(this, e, t, -1);
    }
    ,
    es.as = function(e) {
        if (!this.isValid())
            return NaN;
        let t, n, s = this._milliseconds;
        if ('month' === (e = V(e)) || 'quarter' === e || 'year' === e)
            switch (t = this._days + s / 864e5,
            n = this._months + xn(t),
            e) {
            case 'month':
                return n;
            case 'quarter':
                return n / 3;
            case 'year':
                return n / 12;
            }
        else
            switch (t = this._days + Math.round(Tn(this._months)),
            e) {
            case 'week':
                return t / 7 + s / 6048e5;
            case 'day':
                return t + s / 864e5;
            case 'hour':
                return 24 * t + s / 36e5;
            case 'minute':
                return 1440 * t + s / 6e4;
            case 'second':
                return 86400 * t + s / 1e3;
            case 'millisecond':
                return Math.floor(864e5 * t) + s;
            default:
                throw new Error('Unknown unit ' + e);
            }
    }
    ,
    es.asMilliseconds = Pn,
    es.asSeconds = Rn,
    es.asMinutes = Wn,
    es.asHours = Cn,
    es.asDays = Un,
    es.asWeeks = Hn,
    es.asMonths = Fn,
    es.asQuarters = Ln,
    es.asYears = Vn,
    es.valueOf = function() {
        return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * Z(this._months / 12) : NaN;
    }
    ,
    es._bubble = function() {
        let e, t, n, s, i, r = this._milliseconds, a = this._days, o = this._months, u = this._data;
        return 0 <= r && 0 <= a && 0 <= o || r <= 0 && a <= 0 && o <= 0 || (r += 864e5 * bn(Tn(o) + a),
        o = a = 0),
        u.milliseconds = r % 1e3,
        e = I(r / 1e3),
        u.seconds = e % 60,
        t = I(e / 60),
        u.minutes = t % 60,
        n = I(t / 60),
        u.hours = n % 24,
        a += I(n / 24),
        o += i = I(xn(a)),
        a -= bn(Tn(i)),
        s = I(o / 12),
        o %= 12,
        u.days = a,
        u.months = o,
        u.years = s,
        this;
    }
    ,
    es.clone = function() {
        return Zt(this);
    }
    ,
    es.get = function(e) {
        return e = V(e),
        this.isValid() ? this[e + 's']() : NaN;
    }
    ,
    es.milliseconds = En,
    es.seconds = An,
    es.minutes = jn,
    es.hours = In,
    es.days = Zn,
    es.weeks = function() {
        return I(this.days() / 7);
    }
    ,
    es.months = zn,
    es.years = $n,
    es.humanize = function(e, t) {
        if (!this.isValid())
            return this.localeData().invalidDate();
        let n, s, i = !1, r = Bn;
        return 'object' == typeof e && (t = e,
        e = !1),
        'boolean' == typeof e && (i = e),
        'object' == typeof t && (r = Object.assign({}, Bn, t),
        null != t.s && null == t.ss && (r.ss = t.s - 1)),
        n = this.localeData(),
        s = Jn(this, !i, r, n),
        i && (s = n.pastFuture(+this, s)),
        n.postformat(s);
    }
    ,
    es.toISOString = Kn,
    es.toString = Kn,
    es.toJSON = Kn,
    es.locale = tn,
    es.localeData = sn,
    es.toIsoString = n('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', Kn),
    es.lang = nn,
    C('X', 0, 0, 'unix'),
    C('x', 0, 0, 'valueOf'),
    ce('x', ue),
    ce('X', /[+-]?\d+(\.\d{1,3})?/),
    ye('X', function(e, t, n) {
        n._d = new Date(1e3 * parseFloat(e));
    }),
    ye('x', function(e, t, n) {
        n._d = new Date(Z(e));
    }),
    f.version = '2.29.1',
    e = Tt,
    f.fn = pn,
    f.min = function() {
        return Rt('isBefore', [].slice.call(arguments, 0));
    }
    ,
    f.max = function() {
        return Rt('isAfter', [].slice.call(arguments, 0));
    }
    ,
    f.now = function() {
        return Date.now ? Date.now() : +new Date;
    }
    ,
    f.utc = _,
    f.unix = function(e) {
        return Tt(1e3 * e);
    }
    ,
    f.months = function(e, t) {
        return Dn(e, t, 'months');
    }
    ,
    f.isDate = a,
    f.locale = lt,
    f.invalid = w,
    f.duration = Zt,
    f.isMoment = M,
    f.weekdays = function(e, t, n) {
        return Sn(e, t, n, 'weekdays');
    }
    ,
    f.parseZone = function() {
        return Tt.apply(null, arguments).parseZone();
    }
    ,
    f.localeData = dt,
    f.isDuration = Ut,
    f.monthsShort = function(e, t) {
        return Dn(e, t, 'monthsShort');
    }
    ,
    f.weekdaysMin = function(e, t, n) {
        return Sn(e, t, n, 'weekdaysMin');
    }
    ,
    f.defineLocale = ht,
    f.updateLocale = function(e, t) {
        let n, s, i;
        return null != t ? (i = st,
        null != it[e] && null != it[e].parentLocale ? it[e].set(b(it[e]._config, t)) : (null != (s = ut(e)) && (i = s._config),
        t = b(i, t),
        null == s && (t.abbr = e),
        (n = new x(t)).parentLocale = it[e],
        it[e] = n),
        lt(e)) : null != it[e] && (null != it[e].parentLocale ? (it[e] = it[e].parentLocale,
        e === lt() && lt(e)) : null != it[e] && delete it[e]),
        it[e];
    }
    ,
    f.locales = function() {
        return s(it);
    }
    ,
    f.weekdaysShort = function(e, t, n) {
        return Sn(e, t, n, 'weekdaysShort');
    }
    ,
    f.normalizeUnits = V,
    f.relativeTimeRounding = function(e) {
        return void 0 === e ? qn : 'function' == typeof e && (qn = e,
        !0);
    }
    ,
    f.relativeTimeThreshold = function(e, t) {
        return void 0 !== Bn[e] && (void 0 === t ? Bn[e] : (Bn[e] = t,
        's' === e && (Bn.ss = t - 1),
        !0));
    }
    ,
    f.calendarFormat = function(e, t) {
        const n = e.diff(t, 'days', !0);
        return n < -6 ? 'sameElse' : n < -1 ? 'lastWeek' : n < 0 ? 'lastDay' : n < 1 ? 'sameDay' : n < 2 ? 'nextDay' : n < 7 ? 'nextWeek' : 'sameElse';
    }
    ,
    f.prototype = pn,
    f.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
        DATE: 'YYYY-MM-DD',
        TIME: 'HH:mm',
        TIME_SECONDS: 'HH:mm:ss',
        TIME_MS: 'HH:mm:ss.SSS',
        WEEK: 'GGGG-[W]WW',
        MONTH: 'YYYY-MM'
    },
    f;
});
//# sourceMappingURL=moment.min.js.map
