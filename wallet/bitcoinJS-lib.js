!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define([], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).bitcoin = e()
    }
}(function() {
    return function() {
        return function e(t, r, i) {
            function n(o, a) {
                if (!r[o]) {
                    if (!t[o]) {
                        var f = "function" == typeof require && require;
                        if (!a && f)
                            return f(o, !0);
                        if (s)
                            return s(o, !0);
                        var u = new Error("Cannot find module '" + o + "'");
                        throw u.code = "MODULE_NOT_FOUND",
                        u
                    }
                    var c = r[o] = {
                        exports: {}
                    };
                    t[o][0].call(c.exports, function(e) {
                        return n(t[o][1][e] || e)
                    }, c, c.exports, e, t, r, i)
                }
                return r[o].exports
            }
            for (var s = "function" == typeof require && require, o = 0; o < i.length; o++)
                n(i[o]);
            return n
        }
    }()({
        1: [function(e, t, r) {
            "use strict";
            var i = e("safe-buffer").Buffer;
            t.exports = function(e) {
                if (e.length >= 255)
                    throw new TypeError("Alphabet too long");
                var t = new Uint8Array(256);
                t.fill(255);
                for (var r = 0; r < e.length; r++) {
                    var n = e.charAt(r)
                      , s = n.charCodeAt(0);
                    if (255 !== t[s])
                        throw new TypeError(n + " is ambiguous");
                    t[s] = r
                }
                var o = e.length
                  , a = e.charAt(0)
                  , f = Math.log(o) / Math.log(256)
                  , u = Math.log(256) / Math.log(o);
                function c(e) {
                    if ("string" != typeof e)
                        throw new TypeError("Expected String");
                    if (0 === e.length)
                        return i.alloc(0);
                    var r = 0;
                    if (" " !== e[r]) {
                        for (var n = 0, s = 0; e[r] === a; )
                            n++,
                            r++;
                        for (var u = (e.length - r) * f + 1 >>> 0, c = new Uint8Array(u); e[r]; ) {
                            var h = t[e.charCodeAt(r)];
                            if (255 === h)
                                return;
                            for (var d = 0, l = u - 1; (0 !== h || d < s) && -1 !== l; l--,
                            d++)
                                h += o * c[l] >>> 0,
                                c[l] = h % 256 >>> 0,
                                h = h / 256 >>> 0;
                            if (0 !== h)
                                throw new Error("Non-zero carry");
                            s = d,
                            r++
                        }
                        if (" " !== e[r]) {
                            for (var p = u - s; p !== u && 0 === c[p]; )
                                p++;
                            var b = i.allocUnsafe(n + (u - p));
                            b.fill(0, 0, n);
                            for (var m = n; p !== u; )
                                b[m++] = c[p++];
                            return b
                        }
                    }
                }
                return {
                    encode: function(t) {
                        if (!i.isBuffer(t))
                            throw new TypeError("Expected Buffer");
                        if (0 === t.length)
                            return "";
                        for (var r = 0, n = 0, s = 0, f = t.length; s !== f && 0 === t[s]; )
                            s++,
                            r++;
                        for (var c = (f - s) * u + 1 >>> 0, h = new Uint8Array(c); s !== f; ) {
                            for (var d = t[s], l = 0, p = c - 1; (0 !== d || l < n) && -1 !== p; p--,
                            l++)
                                d += 256 * h[p] >>> 0,
                                h[p] = d % o >>> 0,
                                d = d / o >>> 0;
                            if (0 !== d)
                                throw new Error("Non-zero carry");
                            n = l,
                            s++
                        }
                        for (var b = c - n; b !== c && 0 === h[b]; )
                            b++;
                        for (var m = a.repeat(r); b < c; ++b)
                            m += e.charAt(h[b]);
                        return m
                    },
                    decodeUnsafe: c,
                    decode: function(e) {
                        var t = c(e);
                        if (t)
                            return t;
                        throw new Error("Non-base" + o + " character")
                    }
                }
            }
        }
        , {
            "safe-buffer": 54
        }],
        2: [function(e, t, r) {
            "use strict";
            for (var i = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", n = {}, s = 0; s < i.length; s++) {
                var o = i.charAt(s);
                if (void 0 !== n[o])
                    throw new TypeError(o + " is ambiguous");
                n[o] = s
            }
            function a(e) {
                var t = e >> 25;
                return (33554431 & e) << 5 ^ 996825010 & -(t >> 0 & 1) ^ 642813549 & -(t >> 1 & 1) ^ 513874426 & -(t >> 2 & 1) ^ 1027748829 & -(t >> 3 & 1) ^ 705979059 & -(t >> 4 & 1)
            }
            function f(e) {
                for (var t = 1, r = 0; r < e.length; ++r) {
                    var i = e.charCodeAt(r);
                    if (i < 33 || i > 126)
                        throw new Error("Invalid prefix (" + e + ")");
                    t = a(t) ^ i >> 5
                }
                for (t = a(t),
                r = 0; r < e.length; ++r) {
                    var n = e.charCodeAt(r);
                    t = a(t) ^ 31 & n
                }
                return t
            }
            function u(e, t, r, i) {
                for (var n = 0, s = 0, o = (1 << r) - 1, a = [], f = 0; f < e.length; ++f)
                    for (n = n << t | e[f],
                    s += t; s >= r; )
                        s -= r,
                        a.push(n >> s & o);
                if (i)
                    s > 0 && a.push(n << r - s & o);
                else {
                    if (s >= t)
                        throw new Error("Excess padding");
                    if (n << r - s & o)
                        throw new Error("Non-zero padding")
                }
                return a
            }
            t.exports = {
                decode: function(e, t) {
                    if (t = t || 90,
                    e.length < 8)
                        throw new TypeError(e + " too short");
                    if (e.length > t)
                        throw new TypeError("Exceeds length limit");
                    var r = e.toLowerCase()
                      , i = e.toUpperCase();
                    if (e !== r && e !== i)
                        throw new Error("Mixed-case string " + e);
                    var s = (e = r).lastIndexOf("1");
                    if (-1 === s)
                        throw new Error("No separator character for " + e);
                    if (0 === s)
                        throw new Error("Missing prefix for " + e);
                    var o = e.slice(0, s)
                      , u = e.slice(s + 1);
                    if (u.length < 6)
                        throw new Error("Data too short");
                    for (var c = f(o), h = [], d = 0; d < u.length; ++d) {
                        var l = u.charAt(d)
                          , p = n[l];
                        if (void 0 === p)
                            throw new Error("Unknown character " + l);
                        c = a(c) ^ p,
                        d + 6 >= u.length || h.push(p)
                    }
                    if (1 !== c)
                        throw new Error("Invalid checksum for " + e);
                    return {
                        prefix: o,
                        words: h
                    }
                },
                encode: function(e, t, r) {
                    if (r = r || 90,
                    e.length + 7 + t.length > r)
                        throw new TypeError("Exceeds length limit");
                    for (var n = f(e = e.toLowerCase()), s = e + "1", o = 0; o < t.length; ++o) {
                        var u = t[o];
                        if (u >> 5 != 0)
                            throw new Error("Non 5-bit word");
                        n = a(n) ^ u,
                        s += i.charAt(u)
                    }
                    for (o = 0; o < 6; ++o)
                        n = a(n);
                    for (n ^= 1,
                    o = 0; o < 6; ++o) {
                        var c = n >> 5 * (5 - o) & 31;
                        s += i.charAt(c)
                    }
                    return s
                },
                toWords: function(e) {
                    return u(e, 8, 5, !0)
                },
                fromWords: function(e) {
                    return u(e, 5, 8, !1)
                }
            }
        }
        , {}],
        3: [function(e, t, r) {
            var i = e("safe-buffer").Buffer;
            t.exports = {
                check: function(e) {
                    if (e.length < 8)
                        return !1;
                    if (e.length > 72)
                        return !1;
                    if (48 !== e[0])
                        return !1;
                    if (e[1] !== e.length - 2)
                        return !1;
                    if (2 !== e[2])
                        return !1;
                    var t = e[3];
                    if (0 === t)
                        return !1;
                    if (5 + t >= e.length)
                        return !1;
                    if (2 !== e[4 + t])
                        return !1;
                    var r = e[5 + t];
                    return !(0 === r || 6 + t + r !== e.length || 128 & e[4] || t > 1 && 0 === e[4] && !(128 & e[5]) || 128 & e[t + 6] || r > 1 && 0 === e[t + 6] && !(128 & e[t + 7]))
                },
                decode: function(e) {
                    if (e.length < 8)
                        throw new Error("DER sequence length is too short");
                    if (e.length > 72)
                        throw new Error("DER sequence length is too long");
                    if (48 !== e[0])
                        throw new Error("Expected DER sequence");
                    if (e[1] !== e.length - 2)
                        throw new Error("DER sequence length is invalid");
                    if (2 !== e[2])
                        throw new Error("Expected DER integer");
                    var t = e[3];
                    if (0 === t)
                        throw new Error("R length is zero");
                    if (5 + t >= e.length)
                        throw new Error("R length is too long");
                    if (2 !== e[4 + t])
                        throw new Error("Expected DER integer (2)");
                    var r = e[5 + t];
                    if (0 === r)
                        throw new Error("S length is zero");
                    if (6 + t + r !== e.length)
                        throw new Error("S length is invalid");
                    if (128 & e[4])
                        throw new Error("R value is negative");
                    if (t > 1 && 0 === e[4] && !(128 & e[5]))
                        throw new Error("R value excessively padded");
                    if (128 & e[t + 6])
                        throw new Error("S value is negative");
                    if (r > 1 && 0 === e[t + 6] && !(128 & e[t + 7]))
                        throw new Error("S value excessively padded");
                    return {
                        r: e.slice(4, 4 + t),
                        s: e.slice(6 + t)
                    }
                },
                encode: function(e, t) {
                    var r = e.length
                      , n = t.length;
                    if (0 === r)
                        throw new Error("R length is zero");
                    if (0 === n)
                        throw new Error("S length is zero");
                    if (r > 33)
                        throw new Error("R length is too long");
                    if (n > 33)
                        throw new Error("S length is too long");
                    if (128 & e[0])
                        throw new Error("R value is negative");
                    if (128 & t[0])
                        throw new Error("S value is negative");
                    if (r > 1 && 0 === e[0] && !(128 & e[1]))
                        throw new Error("R value excessively padded");
                    if (n > 1 && 0 === t[0] && !(128 & t[1]))
                        throw new Error("S value excessively padded");
                    var s = i.allocUnsafe(6 + r + n);
                    return s[0] = 48,
                    s[1] = s.length - 2,
                    s[2] = 2,
                    s[3] = e.length,
                    e.copy(s, 4),
                    s[4 + r] = 2,
                    s[5 + r] = t.length,
                    t.copy(s, 6 + r),
                    s
                }
            }
        }
        , {
            "safe-buffer": 54
        }],
        4: [function(e, t, r) {
            t.exports = {
                OP_FALSE: 0,
                OP_0: 0,
                OP_PUSHDATA1: 76,
                OP_PUSHDATA2: 77,
                OP_PUSHDATA4: 78,
                OP_1NEGATE: 79,
                OP_RESERVED: 80,
                OP_TRUE: 81,
                OP_1: 81,
                OP_2: 82,
                OP_3: 83,
                OP_4: 84,
                OP_5: 85,
                OP_6: 86,
                OP_7: 87,
                OP_8: 88,
                OP_9: 89,
                OP_10: 90,
                OP_11: 91,
                OP_12: 92,
                OP_13: 93,
                OP_14: 94,
                OP_15: 95,
                OP_16: 96,
                OP_NOP: 97,
                OP_VER: 98,
                OP_IF: 99,
                OP_NOTIF: 100,
                OP_VERIF: 101,
                OP_VERNOTIF: 102,
                OP_ELSE: 103,
                OP_ENDIF: 104,
                OP_VERIFY: 105,
                OP_RETURN: 106,
                OP_TOALTSTACK: 107,
                OP_FROMALTSTACK: 108,
                OP_2DROP: 109,
                OP_2DUP: 110,
                OP_3DUP: 111,
                OP_2OVER: 112,
                OP_2ROT: 113,
                OP_2SWAP: 114,
                OP_IFDUP: 115,
                OP_DEPTH: 116,
                OP_DROP: 117,
                OP_DUP: 118,
                OP_NIP: 119,
                OP_OVER: 120,
                OP_PICK: 121,
                OP_ROLL: 122,
                OP_ROT: 123,
                OP_SWAP: 124,
                OP_TUCK: 125,
                OP_CAT: 126,
                OP_SUBSTR: 127,
                OP_LEFT: 128,
                OP_RIGHT: 129,
                OP_SIZE: 130,
                OP_INVERT: 131,
                OP_AND: 132,
                OP_OR: 133,
                OP_XOR: 134,
                OP_EQUAL: 135,
                OP_EQUALVERIFY: 136,
                OP_RESERVED1: 137,
                OP_RESERVED2: 138,
                OP_1ADD: 139,
                OP_1SUB: 140,
                OP_2MUL: 141,
                OP_2DIV: 142,
                OP_NEGATE: 143,
                OP_ABS: 144,
                OP_NOT: 145,
                OP_0NOTEQUAL: 146,
                OP_ADD: 147,
                OP_SUB: 148,
                OP_MUL: 149,
                OP_DIV: 150,
                OP_MOD: 151,
                OP_LSHIFT: 152,
                OP_RSHIFT: 153,
                OP_BOOLAND: 154,
                OP_BOOLOR: 155,
                OP_NUMEQUAL: 156,
                OP_NUMEQUALVERIFY: 157,
                OP_NUMNOTEQUAL: 158,
                OP_LESSTHAN: 159,
                OP_GREATERTHAN: 160,
                OP_LESSTHANOREQUAL: 161,
                OP_GREATERTHANOREQUAL: 162,
                OP_MIN: 163,
                OP_MAX: 164,
                OP_WITHIN: 165,
                OP_RIPEMD160: 166,
                OP_SHA1: 167,
                OP_SHA256: 168,
                OP_HASH160: 169,
                OP_HASH256: 170,
                OP_CODESEPARATOR: 171,
                OP_CHECKSIG: 172,
                OP_CHECKSIGVERIFY: 173,
                OP_CHECKMULTISIG: 174,
                OP_CHECKMULTISIGVERIFY: 175,
                OP_NOP1: 176,
                OP_NOP2: 177,
                OP_CHECKLOCKTIMEVERIFY: 177,
                OP_NOP3: 178,
                OP_CHECKSEQUENCEVERIFY: 178,
                OP_NOP4: 179,
                OP_NOP5: 180,
                OP_NOP6: 181,
                OP_NOP7: 182,
                OP_NOP8: 183,
                OP_NOP9: 184,
                OP_NOP10: 185,
                OP_PUBKEYHASH: 253,
                OP_PUBKEY: 254,
                OP_INVALIDOPCODE: 255
            }
        }
        , {}],
        5: [function(e, t, r) {
            var i = e("./index.json")
              , n = {};
            for (var s in i) {
                n[i[s]] = s
            }
            t.exports = n
        }
        , {
            "./index.json": 4
        }],
        6: [function(e, t, r) {
            !function(t, r) {
                "use strict";
                function i(e, t) {
                    if (!e)
                        throw new Error(t || "Assertion failed")
                }
                function n(e, t) {
                    e.super_ = t;
                    var r = function() {};
                    r.prototype = t.prototype,
                    e.prototype = new r,
                    e.prototype.constructor = e
                }
                function s(e, t, r) {
                    if (s.isBN(e))
                        return e;
                    this.negative = 0,
                    this.words = null,
                    this.length = 0,
                    this.red = null,
                    null !== e && ("le" !== t && "be" !== t || (r = t,
                    t = 10),
                    this._init(e || 0, t || 10, r || "be"))
                }
                var o;
                "object" == typeof t ? t.exports = s : r.BN = s,
                s.BN = s,
                s.wordSize = 26;
                try {
                    o = e("buffer").Buffer
                } catch (e) {}
                function a(e, t, r) {
                    for (var i = 0, n = Math.min(e.length, r), s = t; s < n; s++) {
                        var o = e.charCodeAt(s) - 48;
                        i <<= 4,
                        i |= o >= 49 && o <= 54 ? o - 49 + 10 : o >= 17 && o <= 22 ? o - 17 + 10 : 15 & o
                    }
                    return i
                }
                function f(e, t, r, i) {
                    for (var n = 0, s = Math.min(e.length, r), o = t; o < s; o++) {
                        var a = e.charCodeAt(o) - 48;
                        n *= i,
                        n += a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a
                    }
                    return n
                }
                s.isBN = function(e) {
                    return e instanceof s || null !== e && "object" == typeof e && e.constructor.wordSize === s.wordSize && Array.isArray(e.words)
                }
                ,
                s.max = function(e, t) {
                    return e.cmp(t) > 0 ? e : t
                }
                ,
                s.min = function(e, t) {
                    return e.cmp(t) < 0 ? e : t
                }
                ,
                s.prototype._init = function(e, t, r) {
                    if ("number" == typeof e)
                        return this._initNumber(e, t, r);
                    if ("object" == typeof e)
                        return this._initArray(e, t, r);
                    "hex" === t && (t = 16),
                    i(t === (0 | t) && t >= 2 && t <= 36);
                    var n = 0;
                    "-" === (e = e.toString().replace(/\s+/g, ""))[0] && n++,
                    16 === t ? this._parseHex(e, n) : this._parseBase(e, t, n),
                    "-" === e[0] && (this.negative = 1),
                    this.strip(),
                    "le" === r && this._initArray(this.toArray(), t, r)
                }
                ,
                s.prototype._initNumber = function(e, t, r) {
                    e < 0 && (this.negative = 1,
                    e = -e),
                    e < 67108864 ? (this.words = [67108863 & e],
                    this.length = 1) : e < 4503599627370496 ? (this.words = [67108863 & e, e / 67108864 & 67108863],
                    this.length = 2) : (i(e < 9007199254740992),
                    this.words = [67108863 & e, e / 67108864 & 67108863, 1],
                    this.length = 3),
                    "le" === r && this._initArray(this.toArray(), t, r)
                }
                ,
                s.prototype._initArray = function(e, t, r) {
                    if (i("number" == typeof e.length),
                    e.length <= 0)
                        return this.words = [0],
                        this.length = 1,
                        this;
                    this.length = Math.ceil(e.length / 3),
                    this.words = new Array(this.length);
                    for (var n = 0; n < this.length; n++)
                        this.words[n] = 0;
                    var s, o, a = 0;
                    if ("be" === r)
                        for (n = e.length - 1,
                        s = 0; n >= 0; n -= 3)
                            o = e[n] | e[n - 1] << 8 | e[n - 2] << 16,
                            this.words[s] |= o << a & 67108863,
                            this.words[s + 1] = o >>> 26 - a & 67108863,
                            (a += 24) >= 26 && (a -= 26,
                            s++);
                    else if ("le" === r)
                        for (n = 0,
                        s = 0; n < e.length; n += 3)
                            o = e[n] | e[n + 1] << 8 | e[n + 2] << 16,
                            this.words[s] |= o << a & 67108863,
                            this.words[s + 1] = o >>> 26 - a & 67108863,
                            (a += 24) >= 26 && (a -= 26,
                            s++);
                    return this.strip()
                }
                ,
                s.prototype._parseHex = function(e, t) {
                    this.length = Math.ceil((e.length - t) / 6),
                    this.words = new Array(this.length);
                    for (var r = 0; r < this.length; r++)
                        this.words[r] = 0;
                    var i, n, s = 0;
                    for (r = e.length - 6,
                    i = 0; r >= t; r -= 6)
                        n = a(e, r, r + 6),
                        this.words[i] |= n << s & 67108863,
                        this.words[i + 1] |= n >>> 26 - s & 4194303,
                        (s += 24) >= 26 && (s -= 26,
                        i++);
                    r + 6 !== t && (n = a(e, t, r + 6),
                    this.words[i] |= n << s & 67108863,
                    this.words[i + 1] |= n >>> 26 - s & 4194303),
                    this.strip()
                }
                ,
                s.prototype._parseBase = function(e, t, r) {
                    this.words = [0],
                    this.length = 1;
                    for (var i = 0, n = 1; n <= 67108863; n *= t)
                        i++;
                    i--,
                    n = n / t | 0;
                    for (var s = e.length - r, o = s % i, a = Math.min(s, s - o) + r, u = 0, c = r; c < a; c += i)
                        u = f(e, c, c + i, t),
                        this.imuln(n),
                        this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
                    if (0 !== o) {
                        var h = 1;
                        for (u = f(e, c, e.length, t),
                        c = 0; c < o; c++)
                            h *= t;
                        this.imuln(h),
                        this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u)
                    }
                }
                ,
                s.prototype.copy = function(e) {
                    e.words = new Array(this.length);
                    for (var t = 0; t < this.length; t++)
                        e.words[t] = this.words[t];
                    e.length = this.length,
                    e.negative = this.negative,
                    e.red = this.red
                }
                ,
                s.prototype.clone = function() {
                    var e = new s(null);
                    return this.copy(e),
                    e
                }
                ,
                s.prototype._expand = function(e) {
                    for (; this.length < e; )
                        this.words[this.length++] = 0;
                    return this
                }
                ,
                s.prototype.strip = function() {
                    for (; this.length > 1 && 0 === this.words[this.length - 1]; )
                        this.length--;
                    return this._normSign()
                }
                ,
                s.prototype._normSign = function() {
                    return 1 === this.length && 0 === this.words[0] && (this.negative = 0),
                    this
                }
                ,
                s.prototype.inspect = function() {
                    return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
                }
                ;
                var u = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"]
                  , c = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
                  , h = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];
                function d(e, t, r) {
                    r.negative = t.negative ^ e.negative;
                    var i = e.length + t.length | 0;
                    r.length = i,
                    i = i - 1 | 0;
                    var n = 0 | e.words[0]
                      , s = 0 | t.words[0]
                      , o = n * s
                      , a = 67108863 & o
                      , f = o / 67108864 | 0;
                    r.words[0] = a;
                    for (var u = 1; u < i; u++) {
                        for (var c = f >>> 26, h = 67108863 & f, d = Math.min(u, t.length - 1), l = Math.max(0, u - e.length + 1); l <= d; l++) {
                            var p = u - l | 0;
                            c += (o = (n = 0 | e.words[p]) * (s = 0 | t.words[l]) + h) / 67108864 | 0,
                            h = 67108863 & o
                        }
                        r.words[u] = 0 | h,
                        f = 0 | c
                    }
                    return 0 !== f ? r.words[u] = 0 | f : r.length--,
                    r.strip()
                }
                s.prototype.toString = function(e, t) {
                    var r;
                    if (e = e || 10,
                    t = 0 | t || 1,
                    16 === e || "hex" === e) {
                        r = "";
                        for (var n = 0, s = 0, o = 0; o < this.length; o++) {
                            var a = this.words[o]
                              , f = (16777215 & (a << n | s)).toString(16);
                            r = 0 !== (s = a >>> 24 - n & 16777215) || o !== this.length - 1 ? u[6 - f.length] + f + r : f + r,
                            (n += 2) >= 26 && (n -= 26,
                            o--)
                        }
                        for (0 !== s && (r = s.toString(16) + r); r.length % t != 0; )
                            r = "0" + r;
                        return 0 !== this.negative && (r = "-" + r),
                        r
                    }
                    if (e === (0 | e) && e >= 2 && e <= 36) {
                        var d = c[e]
                          , l = h[e];
                        r = "";
                        var p = this.clone();
                        for (p.negative = 0; !p.isZero(); ) {
                            var b = p.modn(l).toString(e);
                            r = (p = p.idivn(l)).isZero() ? b + r : u[d - b.length] + b + r
                        }
                        for (this.isZero() && (r = "0" + r); r.length % t != 0; )
                            r = "0" + r;
                        return 0 !== this.negative && (r = "-" + r),
                        r
                    }
                    i(!1, "Base should be between 2 and 36")
                }
                ,
                s.prototype.toNumber = function() {
                    var e = this.words[0];
                    return 2 === this.length ? e += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? e += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && i(!1, "Number can only safely store up to 53 bits"),
                    0 !== this.negative ? -e : e
                }
                ,
                s.prototype.toJSON = function() {
                    return this.toString(16)
                }
                ,
                s.prototype.toBuffer = function(e, t) {
                    return i(void 0 !== o),
                    this.toArrayLike(o, e, t)
                }
                ,
                s.prototype.toArray = function(e, t) {
                    return this.toArrayLike(Array, e, t)
                }
                ,
                s.prototype.toArrayLike = function(e, t, r) {
                    var n = this.byteLength()
                      , s = r || Math.max(1, n);
                    i(n <= s, "byte array longer than desired length"),
                    i(s > 0, "Requested array length <= 0"),
                    this.strip();
                    var o, a, f = "le" === t, u = new e(s), c = this.clone();
                    if (f) {
                        for (a = 0; !c.isZero(); a++)
                            o = c.andln(255),
                            c.iushrn(8),
                            u[a] = o;
                        for (; a < s; a++)
                            u[a] = 0
                    } else {
                        for (a = 0; a < s - n; a++)
                            u[a] = 0;
                        for (a = 0; !c.isZero(); a++)
                            o = c.andln(255),
                            c.iushrn(8),
                            u[s - a - 1] = o
                    }
                    return u
                }
                ,
                Math.clz32 ? s.prototype._countBits = function(e) {
                    return 32 - Math.clz32(e)
                }
                : s.prototype._countBits = function(e) {
                    var t = e
                      , r = 0;
                    return t >= 4096 && (r += 13,
                    t >>>= 13),
                    t >= 64 && (r += 7,
                    t >>>= 7),
                    t >= 8 && (r += 4,
                    t >>>= 4),
                    t >= 2 && (r += 2,
                    t >>>= 2),
                    r + t
                }
                ,
                s.prototype._zeroBits = function(e) {
                    if (0 === e)
                        return 26;
                    var t = e
                      , r = 0;
                    return 0 == (8191 & t) && (r += 13,
                    t >>>= 13),
                    0 == (127 & t) && (r += 7,
                    t >>>= 7),
                    0 == (15 & t) && (r += 4,
                    t >>>= 4),
                    0 == (3 & t) && (r += 2,
                    t >>>= 2),
                    0 == (1 & t) && r++,
                    r
                }
                ,
                s.prototype.bitLength = function() {
                    var e = this.words[this.length - 1]
                      , t = this._countBits(e);
                    return 26 * (this.length - 1) + t
                }
                ,
                s.prototype.zeroBits = function() {
                    if (this.isZero())
                        return 0;
                    for (var e = 0, t = 0; t < this.length; t++) {
                        var r = this._zeroBits(this.words[t]);
                        if (e += r,
                        26 !== r)
                            break
                    }
                    return e
                }
                ,
                s.prototype.byteLength = function() {
                    return Math.ceil(this.bitLength() / 8)
                }
                ,
                s.prototype.toTwos = function(e) {
                    return 0 !== this.negative ? this.abs().inotn(e).iaddn(1) : this.clone()
                }
                ,
                s.prototype.fromTwos = function(e) {
                    return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone()
                }
                ,
                s.prototype.isNeg = function() {
                    return 0 !== this.negative
                }
                ,
                s.prototype.neg = function() {
                    return this.clone().ineg()
                }
                ,
                s.prototype.ineg = function() {
                    return this.isZero() || (this.negative ^= 1),
                    this
                }
                ,
                s.prototype.iuor = function(e) {
                    for (; this.length < e.length; )
                        this.words[this.length++] = 0;
                    for (var t = 0; t < e.length; t++)
                        this.words[t] = this.words[t] | e.words[t];
                    return this.strip()
                }
                ,
                s.prototype.ior = function(e) {
                    return i(0 == (this.negative | e.negative)),
                    this.iuor(e)
                }
                ,
                s.prototype.or = function(e) {
                    return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this)
                }
                ,
                s.prototype.uor = function(e) {
                    return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this)
                }
                ,
                s.prototype.iuand = function(e) {
                    var t;
                    t = this.length > e.length ? e : this;
                    for (var r = 0; r < t.length; r++)
                        this.words[r] = this.words[r] & e.words[r];
                    return this.length = t.length,
                    this.strip()
                }
                ,
                s.prototype.iand = function(e) {
                    return i(0 == (this.negative | e.negative)),
                    this.iuand(e)
                }
                ,
                s.prototype.and = function(e) {
                    return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this)
                }
                ,
                s.prototype.uand = function(e) {
                    return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this)
                }
                ,
                s.prototype.iuxor = function(e) {
                    var t, r;
                    this.length > e.length ? (t = this,
                    r = e) : (t = e,
                    r = this);
                    for (var i = 0; i < r.length; i++)
                        this.words[i] = t.words[i] ^ r.words[i];
                    if (this !== t)
                        for (; i < t.length; i++)
                            this.words[i] = t.words[i];
                    return this.length = t.length,
                    this.strip()
                }
                ,
                s.prototype.ixor = function(e) {
                    return i(0 == (this.negative | e.negative)),
                    this.iuxor(e)
                }
                ,
                s.prototype.xor = function(e) {
                    return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this)
                }
                ,
                s.prototype.uxor = function(e) {
                    return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this)
                }
                ,
                s.prototype.inotn = function(e) {
                    i("number" == typeof e && e >= 0);
                    var t = 0 | Math.ceil(e / 26)
                      , r = e % 26;
                    this._expand(t),
                    r > 0 && t--;
                    for (var n = 0; n < t; n++)
                        this.words[n] = 67108863 & ~this.words[n];
                    return r > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - r),
                    this.strip()
                }
                ,
                s.prototype.notn = function(e) {
                    return this.clone().inotn(e)
                }
                ,
                s.prototype.setn = function(e, t) {
                    i("number" == typeof e && e >= 0);
                    var r = e / 26 | 0
                      , n = e % 26;
                    return this._expand(r + 1),
                    this.words[r] = t ? this.words[r] | 1 << n : this.words[r] & ~(1 << n),
                    this.strip()
                }
                ,
                s.prototype.iadd = function(e) {
                    var t, r, i;
                    if (0 !== this.negative && 0 === e.negative)
                        return this.negative = 0,
                        t = this.isub(e),
                        this.negative ^= 1,
                        this._normSign();
                    if (0 === this.negative && 0 !== e.negative)
                        return e.negative = 0,
                        t = this.isub(e),
                        e.negative = 1,
                        t._normSign();
                    this.length > e.length ? (r = this,
                    i = e) : (r = e,
                    i = this);
                    for (var n = 0, s = 0; s < i.length; s++)
                        t = (0 | r.words[s]) + (0 | i.words[s]) + n,
                        this.words[s] = 67108863 & t,
                        n = t >>> 26;
                    for (; 0 !== n && s < r.length; s++)
                        t = (0 | r.words[s]) + n,
                        this.words[s] = 67108863 & t,
                        n = t >>> 26;
                    if (this.length = r.length,
                    0 !== n)
                        this.words[this.length] = n,
                        this.length++;
                    else if (r !== this)
                        for (; s < r.length; s++)
                            this.words[s] = r.words[s];
                    return this
                }
                ,
                s.prototype.add = function(e) {
                    var t;
                    return 0 !== e.negative && 0 === this.negative ? (e.negative = 0,
                    t = this.sub(e),
                    e.negative ^= 1,
                    t) : 0 === e.negative && 0 !== this.negative ? (this.negative = 0,
                    t = e.sub(this),
                    this.negative = 1,
                    t) : this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this)
                }
                ,
                s.prototype.isub = function(e) {
                    if (0 !== e.negative) {
                        e.negative = 0;
                        var t = this.iadd(e);
                        return e.negative = 1,
                        t._normSign()
                    }
                    if (0 !== this.negative)
                        return this.negative = 0,
                        this.iadd(e),
                        this.negative = 1,
                        this._normSign();
                    var r, i, n = this.cmp(e);
                    if (0 === n)
                        return this.negative = 0,
                        this.length = 1,
                        this.words[0] = 0,
                        this;
                    n > 0 ? (r = this,
                    i = e) : (r = e,
                    i = this);
                    for (var s = 0, o = 0; o < i.length; o++)
                        s = (t = (0 | r.words[o]) - (0 | i.words[o]) + s) >> 26,
                        this.words[o] = 67108863 & t;
                    for (; 0 !== s && o < r.length; o++)
                        s = (t = (0 | r.words[o]) + s) >> 26,
                        this.words[o] = 67108863 & t;
                    if (0 === s && o < r.length && r !== this)
                        for (; o < r.length; o++)
                            this.words[o] = r.words[o];
                    return this.length = Math.max(this.length, o),
                    r !== this && (this.negative = 1),
                    this.strip()
                }
                ,
                s.prototype.sub = function(e) {
                    return this.clone().isub(e)
                }
                ;
                var l = function(e, t, r) {
                    var i, n, s, o = e.words, a = t.words, f = r.words, u = 0, c = 0 | o[0], h = 8191 & c, d = c >>> 13, l = 0 | o[1], p = 8191 & l, b = l >>> 13, m = 0 | o[2], y = 8191 & m, g = m >>> 13, v = 0 | o[3], w = 8191 & v, _ = v >>> 13, S = 0 | o[4], M = 8191 & S, E = S >>> 13, k = 0 | o[5], O = 8191 & k, P = k >>> 13, A = 0 | o[6], I = 8191 & A, x = A >>> 13, T = 0 | o[7], N = 8191 & T, B = T >>> 13, R = 0 | o[8], L = 8191 & R, j = R >>> 13, U = 0 | o[9], q = 8191 & U, C = U >>> 13, H = 0 | a[0], z = 8191 & H, D = H >>> 13, W = 0 | a[1], F = 8191 & W, K = W >>> 13, V = 0 | a[2], J = 8191 & V, G = V >>> 13, X = 0 | a[3], Z = 8191 & X, $ = X >>> 13, Y = 0 | a[4], Q = 8191 & Y, ee = Y >>> 13, te = 0 | a[5], re = 8191 & te, ie = te >>> 13, ne = 0 | a[6], se = 8191 & ne, oe = ne >>> 13, ae = 0 | a[7], fe = 8191 & ae, ue = ae >>> 13, ce = 0 | a[8], he = 8191 & ce, de = ce >>> 13, le = 0 | a[9], pe = 8191 & le, be = le >>> 13;
                    r.negative = e.negative ^ t.negative,
                    r.length = 19;
                    var me = (u + (i = Math.imul(h, z)) | 0) + ((8191 & (n = (n = Math.imul(h, D)) + Math.imul(d, z) | 0)) << 13) | 0;
                    u = ((s = Math.imul(d, D)) + (n >>> 13) | 0) + (me >>> 26) | 0,
                    me &= 67108863,
                    i = Math.imul(p, z),
                    n = (n = Math.imul(p, D)) + Math.imul(b, z) | 0,
                    s = Math.imul(b, D);
                    var ye = (u + (i = i + Math.imul(h, F) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, K) | 0) + Math.imul(d, F) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(d, K) | 0) + (n >>> 13) | 0) + (ye >>> 26) | 0,
                    ye &= 67108863,
                    i = Math.imul(y, z),
                    n = (n = Math.imul(y, D)) + Math.imul(g, z) | 0,
                    s = Math.imul(g, D),
                    i = i + Math.imul(p, F) | 0,
                    n = (n = n + Math.imul(p, K) | 0) + Math.imul(b, F) | 0,
                    s = s + Math.imul(b, K) | 0;
                    var ge = (u + (i = i + Math.imul(h, J) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, G) | 0) + Math.imul(d, J) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(d, G) | 0) + (n >>> 13) | 0) + (ge >>> 26) | 0,
                    ge &= 67108863,
                    i = Math.imul(w, z),
                    n = (n = Math.imul(w, D)) + Math.imul(_, z) | 0,
                    s = Math.imul(_, D),
                    i = i + Math.imul(y, F) | 0,
                    n = (n = n + Math.imul(y, K) | 0) + Math.imul(g, F) | 0,
                    s = s + Math.imul(g, K) | 0,
                    i = i + Math.imul(p, J) | 0,
                    n = (n = n + Math.imul(p, G) | 0) + Math.imul(b, J) | 0,
                    s = s + Math.imul(b, G) | 0;
                    var ve = (u + (i = i + Math.imul(h, Z) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, $) | 0) + Math.imul(d, Z) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(d, $) | 0) + (n >>> 13) | 0) + (ve >>> 26) | 0,
                    ve &= 67108863,
                    i = Math.imul(M, z),
                    n = (n = Math.imul(M, D)) + Math.imul(E, z) | 0,
                    s = Math.imul(E, D),
                    i = i + Math.imul(w, F) | 0,
                    n = (n = n + Math.imul(w, K) | 0) + Math.imul(_, F) | 0,
                    s = s + Math.imul(_, K) | 0,
                    i = i + Math.imul(y, J) | 0,
                    n = (n = n + Math.imul(y, G) | 0) + Math.imul(g, J) | 0,
                    s = s + Math.imul(g, G) | 0,
                    i = i + Math.imul(p, Z) | 0,
                    n = (n = n + Math.imul(p, $) | 0) + Math.imul(b, Z) | 0,
                    s = s + Math.imul(b, $) | 0;
                    var we = (u + (i = i + Math.imul(h, Q) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, ee) | 0) + Math.imul(d, Q) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(d, ee) | 0) + (n >>> 13) | 0) + (we >>> 26) | 0,
                    we &= 67108863,
                    i = Math.imul(O, z),
                    n = (n = Math.imul(O, D)) + Math.imul(P, z) | 0,
                    s = Math.imul(P, D),
                    i = i + Math.imul(M, F) | 0,
                    n = (n = n + Math.imul(M, K) | 0) + Math.imul(E, F) | 0,
                    s = s + Math.imul(E, K) | 0,
                    i = i + Math.imul(w, J) | 0,
                    n = (n = n + Math.imul(w, G) | 0) + Math.imul(_, J) | 0,
                    s = s + Math.imul(_, G) | 0,
                    i = i + Math.imul(y, Z) | 0,
                    n = (n = n + Math.imul(y, $) | 0) + Math.imul(g, Z) | 0,
                    s = s + Math.imul(g, $) | 0,
                    i = i + Math.imul(p, Q) | 0,
                    n = (n = n + Math.imul(p, ee) | 0) + Math.imul(b, Q) | 0,
                    s = s + Math.imul(b, ee) | 0;
                    var _e = (u + (i = i + Math.imul(h, re) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, ie) | 0) + Math.imul(d, re) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(d, ie) | 0) + (n >>> 13) | 0) + (_e >>> 26) | 0,
                    _e &= 67108863,
                    i = Math.imul(I, z),
                    n = (n = Math.imul(I, D)) + Math.imul(x, z) | 0,
                    s = Math.imul(x, D),
                    i = i + Math.imul(O, F) | 0,
                    n = (n = n + Math.imul(O, K) | 0) + Math.imul(P, F) | 0,
                    s = s + Math.imul(P, K) | 0,
                    i = i + Math.imul(M, J) | 0,
                    n = (n = n + Math.imul(M, G) | 0) + Math.imul(E, J) | 0,
                    s = s + Math.imul(E, G) | 0,
                    i = i + Math.imul(w, Z) | 0,
                    n = (n = n + Math.imul(w, $) | 0) + Math.imul(_, Z) | 0,
                    s = s + Math.imul(_, $) | 0,
                    i = i + Math.imul(y, Q) | 0,
                    n = (n = n + Math.imul(y, ee) | 0) + Math.imul(g, Q) | 0,
                    s = s + Math.imul(g, ee) | 0,
                    i = i + Math.imul(p, re) | 0,
                    n = (n = n + Math.imul(p, ie) | 0) + Math.imul(b, re) | 0,
                    s = s + Math.imul(b, ie) | 0;
                    var Se = (u + (i = i + Math.imul(h, se) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, oe) | 0) + Math.imul(d, se) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(d, oe) | 0) + (n >>> 13) | 0) + (Se >>> 26) | 0,
                    Se &= 67108863,
                    i = Math.imul(N, z),
                    n = (n = Math.imul(N, D)) + Math.imul(B, z) | 0,
                    s = Math.imul(B, D),
                    i = i + Math.imul(I, F) | 0,
                    n = (n = n + Math.imul(I, K) | 0) + Math.imul(x, F) | 0,
                    s = s + Math.imul(x, K) | 0,
                    i = i + Math.imul(O, J) | 0,
                    n = (n = n + Math.imul(O, G) | 0) + Math.imul(P, J) | 0,
                    s = s + Math.imul(P, G) | 0,
                    i = i + Math.imul(M, Z) | 0,
                    n = (n = n + Math.imul(M, $) | 0) + Math.imul(E, Z) | 0,
                    s = s + Math.imul(E, $) | 0,
                    i = i + Math.imul(w, Q) | 0,
                    n = (n = n + Math.imul(w, ee) | 0) + Math.imul(_, Q) | 0,
                    s = s + Math.imul(_, ee) | 0,
                    i = i + Math.imul(y, re) | 0,
                    n = (n = n + Math.imul(y, ie) | 0) + Math.imul(g, re) | 0,
                    s = s + Math.imul(g, ie) | 0,
                    i = i + Math.imul(p, se) | 0,
                    n = (n = n + Math.imul(p, oe) | 0) + Math.imul(b, se) | 0,
                    s = s + Math.imul(b, oe) | 0;
                    var Me = (u + (i = i + Math.imul(h, fe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, ue) | 0) + Math.imul(d, fe) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(d, ue) | 0) + (n >>> 13) | 0) + (Me >>> 26) | 0,
                    Me &= 67108863,
                    i = Math.imul(L, z),
                    n = (n = Math.imul(L, D)) + Math.imul(j, z) | 0,
                    s = Math.imul(j, D),
                    i = i + Math.imul(N, F) | 0,
                    n = (n = n + Math.imul(N, K) | 0) + Math.imul(B, F) | 0,
                    s = s + Math.imul(B, K) | 0,
                    i = i + Math.imul(I, J) | 0,
                    n = (n = n + Math.imul(I, G) | 0) + Math.imul(x, J) | 0,
                    s = s + Math.imul(x, G) | 0,
                    i = i + Math.imul(O, Z) | 0,
                    n = (n = n + Math.imul(O, $) | 0) + Math.imul(P, Z) | 0,
                    s = s + Math.imul(P, $) | 0,
                    i = i + Math.imul(M, Q) | 0,
                    n = (n = n + Math.imul(M, ee) | 0) + Math.imul(E, Q) | 0,
                    s = s + Math.imul(E, ee) | 0,
                    i = i + Math.imul(w, re) | 0,
                    n = (n = n + Math.imul(w, ie) | 0) + Math.imul(_, re) | 0,
                    s = s + Math.imul(_, ie) | 0,
                    i = i + Math.imul(y, se) | 0,
                    n = (n = n + Math.imul(y, oe) | 0) + Math.imul(g, se) | 0,
                    s = s + Math.imul(g, oe) | 0,
                    i = i + Math.imul(p, fe) | 0,
                    n = (n = n + Math.imul(p, ue) | 0) + Math.imul(b, fe) | 0,
                    s = s + Math.imul(b, ue) | 0;
                    var Ee = (u + (i = i + Math.imul(h, he) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, de) | 0) + Math.imul(d, he) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(d, de) | 0) + (n >>> 13) | 0) + (Ee >>> 26) | 0,
                    Ee &= 67108863,
                    i = Math.imul(q, z),
                    n = (n = Math.imul(q, D)) + Math.imul(C, z) | 0,
                    s = Math.imul(C, D),
                    i = i + Math.imul(L, F) | 0,
                    n = (n = n + Math.imul(L, K) | 0) + Math.imul(j, F) | 0,
                    s = s + Math.imul(j, K) | 0,
                    i = i + Math.imul(N, J) | 0,
                    n = (n = n + Math.imul(N, G) | 0) + Math.imul(B, J) | 0,
                    s = s + Math.imul(B, G) | 0,
                    i = i + Math.imul(I, Z) | 0,
                    n = (n = n + Math.imul(I, $) | 0) + Math.imul(x, Z) | 0,
                    s = s + Math.imul(x, $) | 0,
                    i = i + Math.imul(O, Q) | 0,
                    n = (n = n + Math.imul(O, ee) | 0) + Math.imul(P, Q) | 0,
                    s = s + Math.imul(P, ee) | 0,
                    i = i + Math.imul(M, re) | 0,
                    n = (n = n + Math.imul(M, ie) | 0) + Math.imul(E, re) | 0,
                    s = s + Math.imul(E, ie) | 0,
                    i = i + Math.imul(w, se) | 0,
                    n = (n = n + Math.imul(w, oe) | 0) + Math.imul(_, se) | 0,
                    s = s + Math.imul(_, oe) | 0,
                    i = i + Math.imul(y, fe) | 0,
                    n = (n = n + Math.imul(y, ue) | 0) + Math.imul(g, fe) | 0,
                    s = s + Math.imul(g, ue) | 0,
                    i = i + Math.imul(p, he) | 0,
                    n = (n = n + Math.imul(p, de) | 0) + Math.imul(b, he) | 0,
                    s = s + Math.imul(b, de) | 0;
                    var ke = (u + (i = i + Math.imul(h, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(h, be) | 0) + Math.imul(d, pe) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(d, be) | 0) + (n >>> 13) | 0) + (ke >>> 26) | 0,
                    ke &= 67108863,
                    i = Math.imul(q, F),
                    n = (n = Math.imul(q, K)) + Math.imul(C, F) | 0,
                    s = Math.imul(C, K),
                    i = i + Math.imul(L, J) | 0,
                    n = (n = n + Math.imul(L, G) | 0) + Math.imul(j, J) | 0,
                    s = s + Math.imul(j, G) | 0,
                    i = i + Math.imul(N, Z) | 0,
                    n = (n = n + Math.imul(N, $) | 0) + Math.imul(B, Z) | 0,
                    s = s + Math.imul(B, $) | 0,
                    i = i + Math.imul(I, Q) | 0,
                    n = (n = n + Math.imul(I, ee) | 0) + Math.imul(x, Q) | 0,
                    s = s + Math.imul(x, ee) | 0,
                    i = i + Math.imul(O, re) | 0,
                    n = (n = n + Math.imul(O, ie) | 0) + Math.imul(P, re) | 0,
                    s = s + Math.imul(P, ie) | 0,
                    i = i + Math.imul(M, se) | 0,
                    n = (n = n + Math.imul(M, oe) | 0) + Math.imul(E, se) | 0,
                    s = s + Math.imul(E, oe) | 0,
                    i = i + Math.imul(w, fe) | 0,
                    n = (n = n + Math.imul(w, ue) | 0) + Math.imul(_, fe) | 0,
                    s = s + Math.imul(_, ue) | 0,
                    i = i + Math.imul(y, he) | 0,
                    n = (n = n + Math.imul(y, de) | 0) + Math.imul(g, he) | 0,
                    s = s + Math.imul(g, de) | 0;
                    var Oe = (u + (i = i + Math.imul(p, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, be) | 0) + Math.imul(b, pe) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(b, be) | 0) + (n >>> 13) | 0) + (Oe >>> 26) | 0,
                    Oe &= 67108863,
                    i = Math.imul(q, J),
                    n = (n = Math.imul(q, G)) + Math.imul(C, J) | 0,
                    s = Math.imul(C, G),
                    i = i + Math.imul(L, Z) | 0,
                    n = (n = n + Math.imul(L, $) | 0) + Math.imul(j, Z) | 0,
                    s = s + Math.imul(j, $) | 0,
                    i = i + Math.imul(N, Q) | 0,
                    n = (n = n + Math.imul(N, ee) | 0) + Math.imul(B, Q) | 0,
                    s = s + Math.imul(B, ee) | 0,
                    i = i + Math.imul(I, re) | 0,
                    n = (n = n + Math.imul(I, ie) | 0) + Math.imul(x, re) | 0,
                    s = s + Math.imul(x, ie) | 0,
                    i = i + Math.imul(O, se) | 0,
                    n = (n = n + Math.imul(O, oe) | 0) + Math.imul(P, se) | 0,
                    s = s + Math.imul(P, oe) | 0,
                    i = i + Math.imul(M, fe) | 0,
                    n = (n = n + Math.imul(M, ue) | 0) + Math.imul(E, fe) | 0,
                    s = s + Math.imul(E, ue) | 0,
                    i = i + Math.imul(w, he) | 0,
                    n = (n = n + Math.imul(w, de) | 0) + Math.imul(_, he) | 0,
                    s = s + Math.imul(_, de) | 0;
                    var Pe = (u + (i = i + Math.imul(y, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(y, be) | 0) + Math.imul(g, pe) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(g, be) | 0) + (n >>> 13) | 0) + (Pe >>> 26) | 0,
                    Pe &= 67108863,
                    i = Math.imul(q, Z),
                    n = (n = Math.imul(q, $)) + Math.imul(C, Z) | 0,
                    s = Math.imul(C, $),
                    i = i + Math.imul(L, Q) | 0,
                    n = (n = n + Math.imul(L, ee) | 0) + Math.imul(j, Q) | 0,
                    s = s + Math.imul(j, ee) | 0,
                    i = i + Math.imul(N, re) | 0,
                    n = (n = n + Math.imul(N, ie) | 0) + Math.imul(B, re) | 0,
                    s = s + Math.imul(B, ie) | 0,
                    i = i + Math.imul(I, se) | 0,
                    n = (n = n + Math.imul(I, oe) | 0) + Math.imul(x, se) | 0,
                    s = s + Math.imul(x, oe) | 0,
                    i = i + Math.imul(O, fe) | 0,
                    n = (n = n + Math.imul(O, ue) | 0) + Math.imul(P, fe) | 0,
                    s = s + Math.imul(P, ue) | 0,
                    i = i + Math.imul(M, he) | 0,
                    n = (n = n + Math.imul(M, de) | 0) + Math.imul(E, he) | 0,
                    s = s + Math.imul(E, de) | 0;
                    var Ae = (u + (i = i + Math.imul(w, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(w, be) | 0) + Math.imul(_, pe) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(_, be) | 0) + (n >>> 13) | 0) + (Ae >>> 26) | 0,
                    Ae &= 67108863,
                    i = Math.imul(q, Q),
                    n = (n = Math.imul(q, ee)) + Math.imul(C, Q) | 0,
                    s = Math.imul(C, ee),
                    i = i + Math.imul(L, re) | 0,
                    n = (n = n + Math.imul(L, ie) | 0) + Math.imul(j, re) | 0,
                    s = s + Math.imul(j, ie) | 0,
                    i = i + Math.imul(N, se) | 0,
                    n = (n = n + Math.imul(N, oe) | 0) + Math.imul(B, se) | 0,
                    s = s + Math.imul(B, oe) | 0,
                    i = i + Math.imul(I, fe) | 0,
                    n = (n = n + Math.imul(I, ue) | 0) + Math.imul(x, fe) | 0,
                    s = s + Math.imul(x, ue) | 0,
                    i = i + Math.imul(O, he) | 0,
                    n = (n = n + Math.imul(O, de) | 0) + Math.imul(P, he) | 0,
                    s = s + Math.imul(P, de) | 0;
                    var Ie = (u + (i = i + Math.imul(M, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(M, be) | 0) + Math.imul(E, pe) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(E, be) | 0) + (n >>> 13) | 0) + (Ie >>> 26) | 0,
                    Ie &= 67108863,
                    i = Math.imul(q, re),
                    n = (n = Math.imul(q, ie)) + Math.imul(C, re) | 0,
                    s = Math.imul(C, ie),
                    i = i + Math.imul(L, se) | 0,
                    n = (n = n + Math.imul(L, oe) | 0) + Math.imul(j, se) | 0,
                    s = s + Math.imul(j, oe) | 0,
                    i = i + Math.imul(N, fe) | 0,
                    n = (n = n + Math.imul(N, ue) | 0) + Math.imul(B, fe) | 0,
                    s = s + Math.imul(B, ue) | 0,
                    i = i + Math.imul(I, he) | 0,
                    n = (n = n + Math.imul(I, de) | 0) + Math.imul(x, he) | 0,
                    s = s + Math.imul(x, de) | 0;
                    var xe = (u + (i = i + Math.imul(O, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(O, be) | 0) + Math.imul(P, pe) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(P, be) | 0) + (n >>> 13) | 0) + (xe >>> 26) | 0,
                    xe &= 67108863,
                    i = Math.imul(q, se),
                    n = (n = Math.imul(q, oe)) + Math.imul(C, se) | 0,
                    s = Math.imul(C, oe),
                    i = i + Math.imul(L, fe) | 0,
                    n = (n = n + Math.imul(L, ue) | 0) + Math.imul(j, fe) | 0,
                    s = s + Math.imul(j, ue) | 0,
                    i = i + Math.imul(N, he) | 0,
                    n = (n = n + Math.imul(N, de) | 0) + Math.imul(B, he) | 0,
                    s = s + Math.imul(B, de) | 0;
                    var Te = (u + (i = i + Math.imul(I, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(I, be) | 0) + Math.imul(x, pe) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(x, be) | 0) + (n >>> 13) | 0) + (Te >>> 26) | 0,
                    Te &= 67108863,
                    i = Math.imul(q, fe),
                    n = (n = Math.imul(q, ue)) + Math.imul(C, fe) | 0,
                    s = Math.imul(C, ue),
                    i = i + Math.imul(L, he) | 0,
                    n = (n = n + Math.imul(L, de) | 0) + Math.imul(j, he) | 0,
                    s = s + Math.imul(j, de) | 0;
                    var Ne = (u + (i = i + Math.imul(N, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(N, be) | 0) + Math.imul(B, pe) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(B, be) | 0) + (n >>> 13) | 0) + (Ne >>> 26) | 0,
                    Ne &= 67108863,
                    i = Math.imul(q, he),
                    n = (n = Math.imul(q, de)) + Math.imul(C, he) | 0,
                    s = Math.imul(C, de);
                    var Be = (u + (i = i + Math.imul(L, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(L, be) | 0) + Math.imul(j, pe) | 0)) << 13) | 0;
                    u = ((s = s + Math.imul(j, be) | 0) + (n >>> 13) | 0) + (Be >>> 26) | 0,
                    Be &= 67108863;
                    var Re = (u + (i = Math.imul(q, pe)) | 0) + ((8191 & (n = (n = Math.imul(q, be)) + Math.imul(C, pe) | 0)) << 13) | 0;
                    return u = ((s = Math.imul(C, be)) + (n >>> 13) | 0) + (Re >>> 26) | 0,
                    Re &= 67108863,
                    f[0] = me,
                    f[1] = ye,
                    f[2] = ge,
                    f[3] = ve,
                    f[4] = we,
                    f[5] = _e,
                    f[6] = Se,
                    f[7] = Me,
                    f[8] = Ee,
                    f[9] = ke,
                    f[10] = Oe,
                    f[11] = Pe,
                    f[12] = Ae,
                    f[13] = Ie,
                    f[14] = xe,
                    f[15] = Te,
                    f[16] = Ne,
                    f[17] = Be,
                    f[18] = Re,
                    0 !== u && (f[19] = u,
                    r.length++),
                    r
                };
                function p(e, t, r) {
                    return (new b).mulp(e, t, r)
                }
                function b(e, t) {
                    this.x = e,
                    this.y = t
                }
                Math.imul || (l = d),
                s.prototype.mulTo = function(e, t) {
                    var r = this.length + e.length;
                    return 10 === this.length && 10 === e.length ? l(this, e, t) : r < 63 ? d(this, e, t) : r < 1024 ? function(e, t, r) {
                        r.negative = t.negative ^ e.negative,
                        r.length = e.length + t.length;
                        for (var i = 0, n = 0, s = 0; s < r.length - 1; s++) {
                            var o = n;
                            n = 0;
                            for (var a = 67108863 & i, f = Math.min(s, t.length - 1), u = Math.max(0, s - e.length + 1); u <= f; u++) {
                                var c = s - u
                                  , h = (0 | e.words[c]) * (0 | t.words[u])
                                  , d = 67108863 & h;
                                a = 67108863 & (d = d + a | 0),
                                n += (o = (o = o + (h / 67108864 | 0) | 0) + (d >>> 26) | 0) >>> 26,
                                o &= 67108863
                            }
                            r.words[s] = a,
                            i = o,
                            o = n
                        }
                        return 0 !== i ? r.words[s] = i : r.length--,
                        r.strip()
                    }(this, e, t) : p(this, e, t)
                }
                ,
                b.prototype.makeRBT = function(e) {
                    for (var t = new Array(e), r = s.prototype._countBits(e) - 1, i = 0; i < e; i++)
                        t[i] = this.revBin(i, r, e);
                    return t
                }
                ,
                b.prototype.revBin = function(e, t, r) {
                    if (0 === e || e === r - 1)
                        return e;
                    for (var i = 0, n = 0; n < t; n++)
                        i |= (1 & e) << t - n - 1,
                        e >>= 1;
                    return i
                }
                ,
                b.prototype.permute = function(e, t, r, i, n, s) {
                    for (var o = 0; o < s; o++)
                        i[o] = t[e[o]],
                        n[o] = r[e[o]]
                }
                ,
                b.prototype.transform = function(e, t, r, i, n, s) {
                    this.permute(s, e, t, r, i, n);
                    for (var o = 1; o < n; o <<= 1)
                        for (var a = o << 1, f = Math.cos(2 * Math.PI / a), u = Math.sin(2 * Math.PI / a), c = 0; c < n; c += a)
                            for (var h = f, d = u, l = 0; l < o; l++) {
                                var p = r[c + l]
                                  , b = i[c + l]
                                  , m = r[c + l + o]
                                  , y = i[c + l + o]
                                  , g = h * m - d * y;
                                y = h * y + d * m,
                                m = g,
                                r[c + l] = p + m,
                                i[c + l] = b + y,
                                r[c + l + o] = p - m,
                                i[c + l + o] = b - y,
                                l !== a && (g = f * h - u * d,
                                d = f * d + u * h,
                                h = g)
                            }
                }
                ,
                b.prototype.guessLen13b = function(e, t) {
                    var r = 1 | Math.max(t, e)
                      , i = 1 & r
                      , n = 0;
                    for (r = r / 2 | 0; r; r >>>= 1)
                        n++;
                    return 1 << n + 1 + i
                }
                ,
                b.prototype.conjugate = function(e, t, r) {
                    if (!(r <= 1))
                        for (var i = 0; i < r / 2; i++) {
                            var n = e[i];
                            e[i] = e[r - i - 1],
                            e[r - i - 1] = n,
                            n = t[i],
                            t[i] = -t[r - i - 1],
                            t[r - i - 1] = -n
                        }
                }
                ,
                b.prototype.normalize13b = function(e, t) {
                    for (var r = 0, i = 0; i < t / 2; i++) {
                        var n = 8192 * Math.round(e[2 * i + 1] / t) + Math.round(e[2 * i] / t) + r;
                        e[i] = 67108863 & n,
                        r = n < 67108864 ? 0 : n / 67108864 | 0
                    }
                    return e
                }
                ,
                b.prototype.convert13b = function(e, t, r, n) {
                    for (var s = 0, o = 0; o < t; o++)
                        s += 0 | e[o],
                        r[2 * o] = 8191 & s,
                        s >>>= 13,
                        r[2 * o + 1] = 8191 & s,
                        s >>>= 13;
                    for (o = 2 * t; o < n; ++o)
                        r[o] = 0;
                    i(0 === s),
                    i(0 == (-8192 & s))
                }
                ,
                b.prototype.stub = function(e) {
                    for (var t = new Array(e), r = 0; r < e; r++)
                        t[r] = 0;
                    return t
                }
                ,
                b.prototype.mulp = function(e, t, r) {
                    var i = 2 * this.guessLen13b(e.length, t.length)
                      , n = this.makeRBT(i)
                      , s = this.stub(i)
                      , o = new Array(i)
                      , a = new Array(i)
                      , f = new Array(i)
                      , u = new Array(i)
                      , c = new Array(i)
                      , h = new Array(i)
                      , d = r.words;
                    d.length = i,
                    this.convert13b(e.words, e.length, o, i),
                    this.convert13b(t.words, t.length, u, i),
                    this.transform(o, s, a, f, i, n),
                    this.transform(u, s, c, h, i, n);
                    for (var l = 0; l < i; l++) {
                        var p = a[l] * c[l] - f[l] * h[l];
                        f[l] = a[l] * h[l] + f[l] * c[l],
                        a[l] = p
                    }
                    return this.conjugate(a, f, i),
                    this.transform(a, f, d, s, i, n),
                    this.conjugate(d, s, i),
                    this.normalize13b(d, i),
                    r.negative = e.negative ^ t.negative,
                    r.length = e.length + t.length,
                    r.strip()
                }
                ,
                s.prototype.mul = function(e) {
                    var t = new s(null);
                    return t.words = new Array(this.length + e.length),
                    this.mulTo(e, t)
                }
                ,
                s.prototype.mulf = function(e) {
                    var t = new s(null);
                    return t.words = new Array(this.length + e.length),
                    p(this, e, t)
                }
                ,
                s.prototype.imul = function(e) {
                    return this.clone().mulTo(e, this)
                }
                ,
                s.prototype.imuln = function(e) {
                    i("number" == typeof e),
                    i(e < 67108864);
                    for (var t = 0, r = 0; r < this.length; r++) {
                        var n = (0 | this.words[r]) * e
                          , s = (67108863 & n) + (67108863 & t);
                        t >>= 26,
                        t += n / 67108864 | 0,
                        t += s >>> 26,
                        this.words[r] = 67108863 & s
                    }
                    return 0 !== t && (this.words[r] = t,
                    this.length++),
                    this
                }
                ,
                s.prototype.muln = function(e) {
                    return this.clone().imuln(e)
                }
                ,
                s.prototype.sqr = function() {
                    return this.mul(this)
                }
                ,
                s.prototype.isqr = function() {
                    return this.imul(this.clone())
                }
                ,
                s.prototype.pow = function(e) {
                    var t = function(e) {
                        for (var t = new Array(e.bitLength()), r = 0; r < t.length; r++) {
                            var i = r / 26 | 0
                              , n = r % 26;
                            t[r] = (e.words[i] & 1 << n) >>> n
                        }
                        return t
                    }(e);
                    if (0 === t.length)
                        return new s(1);
                    for (var r = this, i = 0; i < t.length && 0 === t[i]; i++,
                    r = r.sqr())
                        ;
                    if (++i < t.length)
                        for (var n = r.sqr(); i < t.length; i++,
                        n = n.sqr())
                            0 !== t[i] && (r = r.mul(n));
                    return r
                }
                ,
                s.prototype.iushln = function(e) {
                    i("number" == typeof e && e >= 0);
                    var t, r = e % 26, n = (e - r) / 26, s = 67108863 >>> 26 - r << 26 - r;
                    if (0 !== r) {
                        var o = 0;
                        for (t = 0; t < this.length; t++) {
                            var a = this.words[t] & s
                              , f = (0 | this.words[t]) - a << r;
                            this.words[t] = f | o,
                            o = a >>> 26 - r
                        }
                        o && (this.words[t] = o,
                        this.length++)
                    }
                    if (0 !== n) {
                        for (t = this.length - 1; t >= 0; t--)
                            this.words[t + n] = this.words[t];
                        for (t = 0; t < n; t++)
                            this.words[t] = 0;
                        this.length += n
                    }
                    return this.strip()
                }
                ,
                s.prototype.ishln = function(e) {
                    return i(0 === this.negative),
                    this.iushln(e)
                }
                ,
                s.prototype.iushrn = function(e, t, r) {
                    var n;
                    i("number" == typeof e && e >= 0),
                    n = t ? (t - t % 26) / 26 : 0;
                    var s = e % 26
                      , o = Math.min((e - s) / 26, this.length)
                      , a = 67108863 ^ 67108863 >>> s << s
                      , f = r;
                    if (n -= o,
                    n = Math.max(0, n),
                    f) {
                        for (var u = 0; u < o; u++)
                            f.words[u] = this.words[u];
                        f.length = o
                    }
                    if (0 === o)
                        ;
                    else if (this.length > o)
                        for (this.length -= o,
                        u = 0; u < this.length; u++)
                            this.words[u] = this.words[u + o];
                    else
                        this.words[0] = 0,
                        this.length = 1;
                    var c = 0;
                    for (u = this.length - 1; u >= 0 && (0 !== c || u >= n); u--) {
                        var h = 0 | this.words[u];
                        this.words[u] = c << 26 - s | h >>> s,
                        c = h & a
                    }
                    return f && 0 !== c && (f.words[f.length++] = c),
                    0 === this.length && (this.words[0] = 0,
                    this.length = 1),
                    this.strip()
                }
                ,
                s.prototype.ishrn = function(e, t, r) {
                    return i(0 === this.negative),
                    this.iushrn(e, t, r)
                }
                ,
                s.prototype.shln = function(e) {
                    return this.clone().ishln(e)
                }
                ,
                s.prototype.ushln = function(e) {
                    return this.clone().iushln(e)
                }
                ,
                s.prototype.shrn = function(e) {
                    return this.clone().ishrn(e)
                }
                ,
                s.prototype.ushrn = function(e) {
                    return this.clone().iushrn(e)
                }
                ,
                s.prototype.testn = function(e) {
                    i("number" == typeof e && e >= 0);
                    var t = e % 26
                      , r = (e - t) / 26
                      , n = 1 << t;
                    return !(this.length <= r) && !!(this.words[r] & n)
                }
                ,
                s.prototype.imaskn = function(e) {
                    i("number" == typeof e && e >= 0);
                    var t = e % 26
                      , r = (e - t) / 26;
                    if (i(0 === this.negative, "imaskn works only with positive numbers"),
                    this.length <= r)
                        return this;
                    if (0 !== t && r++,
                    this.length = Math.min(r, this.length),
                    0 !== t) {
                        var n = 67108863 ^ 67108863 >>> t << t;
                        this.words[this.length - 1] &= n
                    }
                    return this.strip()
                }
                ,
                s.prototype.maskn = function(e) {
                    return this.clone().imaskn(e)
                }
                ,
                s.prototype.iaddn = function(e) {
                    return i("number" == typeof e),
                    i(e < 67108864),
                    e < 0 ? this.isubn(-e) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < e ? (this.words[0] = e - (0 | this.words[0]),
                    this.negative = 0,
                    this) : (this.negative = 0,
                    this.isubn(e),
                    this.negative = 1,
                    this) : this._iaddn(e)
                }
                ,
                s.prototype._iaddn = function(e) {
                    this.words[0] += e;
                    for (var t = 0; t < this.length && this.words[t] >= 67108864; t++)
                        this.words[t] -= 67108864,
                        t === this.length - 1 ? this.words[t + 1] = 1 : this.words[t + 1]++;
                    return this.length = Math.max(this.length, t + 1),
                    this
                }
                ,
                s.prototype.isubn = function(e) {
                    if (i("number" == typeof e),
                    i(e < 67108864),
                    e < 0)
                        return this.iaddn(-e);
                    if (0 !== this.negative)
                        return this.negative = 0,
                        this.iaddn(e),
                        this.negative = 1,
                        this;
                    if (this.words[0] -= e,
                    1 === this.length && this.words[0] < 0)
                        this.words[0] = -this.words[0],
                        this.negative = 1;
                    else
                        for (var t = 0; t < this.length && this.words[t] < 0; t++)
                            this.words[t] += 67108864,
                            this.words[t + 1] -= 1;
                    return this.strip()
                }
                ,
                s.prototype.addn = function(e) {
                    return this.clone().iaddn(e)
                }
                ,
                s.prototype.subn = function(e) {
                    return this.clone().isubn(e)
                }
                ,
                s.prototype.iabs = function() {
                    return this.negative = 0,
                    this
                }
                ,
                s.prototype.abs = function() {
                    return this.clone().iabs()
                }
                ,
                s.prototype._ishlnsubmul = function(e, t, r) {
                    var n, s, o = e.length + r;
                    this._expand(o);
                    var a = 0;
                    for (n = 0; n < e.length; n++) {
                        s = (0 | this.words[n + r]) + a;
                        var f = (0 | e.words[n]) * t;
                        a = ((s -= 67108863 & f) >> 26) - (f / 67108864 | 0),
                        this.words[n + r] = 67108863 & s
                    }
                    for (; n < this.length - r; n++)
                        a = (s = (0 | this.words[n + r]) + a) >> 26,
                        this.words[n + r] = 67108863 & s;
                    if (0 === a)
                        return this.strip();
                    for (i(-1 === a),
                    a = 0,
                    n = 0; n < this.length; n++)
                        a = (s = -(0 | this.words[n]) + a) >> 26,
                        this.words[n] = 67108863 & s;
                    return this.negative = 1,
                    this.strip()
                }
                ,
                s.prototype._wordDiv = function(e, t) {
                    var r = (this.length,
                    e.length)
                      , i = this.clone()
                      , n = e
                      , o = 0 | n.words[n.length - 1];
                    0 !== (r = 26 - this._countBits(o)) && (n = n.ushln(r),
                    i.iushln(r),
                    o = 0 | n.words[n.length - 1]);
                    var a, f = i.length - n.length;
                    if ("mod" !== t) {
                        (a = new s(null)).length = f + 1,
                        a.words = new Array(a.length);
                        for (var u = 0; u < a.length; u++)
                            a.words[u] = 0
                    }
                    var c = i.clone()._ishlnsubmul(n, 1, f);
                    0 === c.negative && (i = c,
                    a && (a.words[f] = 1));
                    for (var h = f - 1; h >= 0; h--) {
                        var d = 67108864 * (0 | i.words[n.length + h]) + (0 | i.words[n.length + h - 1]);
                        for (d = Math.min(d / o | 0, 67108863),
                        i._ishlnsubmul(n, d, h); 0 !== i.negative; )
                            d--,
                            i.negative = 0,
                            i._ishlnsubmul(n, 1, h),
                            i.isZero() || (i.negative ^= 1);
                        a && (a.words[h] = d)
                    }
                    return a && a.strip(),
                    i.strip(),
                    "div" !== t && 0 !== r && i.iushrn(r),
                    {
                        div: a || null,
                        mod: i
                    }
                }
                ,
                s.prototype.divmod = function(e, t, r) {
                    return i(!e.isZero()),
                    this.isZero() ? {
                        div: new s(0),
                        mod: new s(0)
                    } : 0 !== this.negative && 0 === e.negative ? (a = this.neg().divmod(e, t),
                    "mod" !== t && (n = a.div.neg()),
                    "div" !== t && (o = a.mod.neg(),
                    r && 0 !== o.negative && o.iadd(e)),
                    {
                        div: n,
                        mod: o
                    }) : 0 === this.negative && 0 !== e.negative ? (a = this.divmod(e.neg(), t),
                    "mod" !== t && (n = a.div.neg()),
                    {
                        div: n,
                        mod: a.mod
                    }) : 0 != (this.negative & e.negative) ? (a = this.neg().divmod(e.neg(), t),
                    "div" !== t && (o = a.mod.neg(),
                    r && 0 !== o.negative && o.isub(e)),
                    {
                        div: a.div,
                        mod: o
                    }) : e.length > this.length || this.cmp(e) < 0 ? {
                        div: new s(0),
                        mod: this
                    } : 1 === e.length ? "div" === t ? {
                        div: this.divn(e.words[0]),
                        mod: null
                    } : "mod" === t ? {
                        div: null,
                        mod: new s(this.modn(e.words[0]))
                    } : {
                        div: this.divn(e.words[0]),
                        mod: new s(this.modn(e.words[0]))
                    } : this._wordDiv(e, t);
                    var n, o, a
                }
                ,
                s.prototype.div = function(e) {
                    return this.divmod(e, "div", !1).div
                }
                ,
                s.prototype.mod = function(e) {
                    return this.divmod(e, "mod", !1).mod
                }
                ,
                s.prototype.umod = function(e) {
                    return this.divmod(e, "mod", !0).mod
                }
                ,
                s.prototype.divRound = function(e) {
                    var t = this.divmod(e);
                    if (t.mod.isZero())
                        return t.div;
                    var r = 0 !== t.div.negative ? t.mod.isub(e) : t.mod
                      , i = e.ushrn(1)
                      , n = e.andln(1)
                      , s = r.cmp(i);
                    return s < 0 || 1 === n && 0 === s ? t.div : 0 !== t.div.negative ? t.div.isubn(1) : t.div.iaddn(1)
                }
                ,
                s.prototype.modn = function(e) {
                    i(e <= 67108863);
                    for (var t = (1 << 26) % e, r = 0, n = this.length - 1; n >= 0; n--)
                        r = (t * r + (0 | this.words[n])) % e;
                    return r
                }
                ,
                s.prototype.idivn = function(e) {
                    i(e <= 67108863);
                    for (var t = 0, r = this.length - 1; r >= 0; r--) {
                        var n = (0 | this.words[r]) + 67108864 * t;
                        this.words[r] = n / e | 0,
                        t = n % e
                    }
                    return this.strip()
                }
                ,
                s.prototype.divn = function(e) {
                    return this.clone().idivn(e)
                }
                ,
                s.prototype.egcd = function(e) {
                    i(0 === e.negative),
                    i(!e.isZero());
                    var t = this
                      , r = e.clone();
                    t = 0 !== t.negative ? t.umod(e) : t.clone();
                    for (var n = new s(1), o = new s(0), a = new s(0), f = new s(1), u = 0; t.isEven() && r.isEven(); )
                        t.iushrn(1),
                        r.iushrn(1),
                        ++u;
                    for (var c = r.clone(), h = t.clone(); !t.isZero(); ) {
                        for (var d = 0, l = 1; 0 == (t.words[0] & l) && d < 26; ++d,
                        l <<= 1)
                            ;
                        if (d > 0)
                            for (t.iushrn(d); d-- > 0; )
                                (n.isOdd() || o.isOdd()) && (n.iadd(c),
                                o.isub(h)),
                                n.iushrn(1),
                                o.iushrn(1);
                        for (var p = 0, b = 1; 0 == (r.words[0] & b) && p < 26; ++p,
                        b <<= 1)
                            ;
                        if (p > 0)
                            for (r.iushrn(p); p-- > 0; )
                                (a.isOdd() || f.isOdd()) && (a.iadd(c),
                                f.isub(h)),
                                a.iushrn(1),
                                f.iushrn(1);
                        t.cmp(r) >= 0 ? (t.isub(r),
                        n.isub(a),
                        o.isub(f)) : (r.isub(t),
                        a.isub(n),
                        f.isub(o))
                    }
                    return {
                        a: a,
                        b: f,
                        gcd: r.iushln(u)
                    }
                }
                ,
                s.prototype._invmp = function(e) {
                    i(0 === e.negative),
                    i(!e.isZero());
                    var t = this
                      , r = e.clone();
                    t = 0 !== t.negative ? t.umod(e) : t.clone();
                    for (var n, o = new s(1), a = new s(0), f = r.clone(); t.cmpn(1) > 0 && r.cmpn(1) > 0; ) {
                        for (var u = 0, c = 1; 0 == (t.words[0] & c) && u < 26; ++u,
                        c <<= 1)
                            ;
                        if (u > 0)
                            for (t.iushrn(u); u-- > 0; )
                                o.isOdd() && o.iadd(f),
                                o.iushrn(1);
                        for (var h = 0, d = 1; 0 == (r.words[0] & d) && h < 26; ++h,
                        d <<= 1)
                            ;
                        if (h > 0)
                            for (r.iushrn(h); h-- > 0; )
                                a.isOdd() && a.iadd(f),
                                a.iushrn(1);
                        t.cmp(r) >= 0 ? (t.isub(r),
                        o.isub(a)) : (r.isub(t),
                        a.isub(o))
                    }
                    return (n = 0 === t.cmpn(1) ? o : a).cmpn(0) < 0 && n.iadd(e),
                    n
                }
                ,
                s.prototype.gcd = function(e) {
                    if (this.isZero())
                        return e.abs();
                    if (e.isZero())
                        return this.abs();
                    var t = this.clone()
                      , r = e.clone();
                    t.negative = 0,
                    r.negative = 0;
                    for (var i = 0; t.isEven() && r.isEven(); i++)
                        t.iushrn(1),
                        r.iushrn(1);
                    for (; ; ) {
                        for (; t.isEven(); )
                            t.iushrn(1);
                        for (; r.isEven(); )
                            r.iushrn(1);
                        var n = t.cmp(r);
                        if (n < 0) {
                            var s = t;
                            t = r,
                            r = s
                        } else if (0 === n || 0 === r.cmpn(1))
                            break;
                        t.isub(r)
                    }
                    return r.iushln(i)
                }
                ,
                s.prototype.invm = function(e) {
                    return this.egcd(e).a.umod(e)
                }
                ,
                s.prototype.isEven = function() {
                    return 0 == (1 & this.words[0])
                }
                ,
                s.prototype.isOdd = function() {
                    return 1 == (1 & this.words[0])
                }
                ,
                s.prototype.andln = function(e) {
                    return this.words[0] & e
                }
                ,
                s.prototype.bincn = function(e) {
                    i("number" == typeof e);
                    var t = e % 26
                      , r = (e - t) / 26
                      , n = 1 << t;
                    if (this.length <= r)
                        return this._expand(r + 1),
                        this.words[r] |= n,
                        this;
                    for (var s = n, o = r; 0 !== s && o < this.length; o++) {
                        var a = 0 | this.words[o];
                        s = (a += s) >>> 26,
                        a &= 67108863,
                        this.words[o] = a
                    }
                    return 0 !== s && (this.words[o] = s,
                    this.length++),
                    this
                }
                ,
                s.prototype.isZero = function() {
                    return 1 === this.length && 0 === this.words[0]
                }
                ,
                s.prototype.cmpn = function(e) {
                    var t, r = e < 0;
                    if (0 !== this.negative && !r)
                        return -1;
                    if (0 === this.negative && r)
                        return 1;
                    if (this.strip(),
                    this.length > 1)
                        t = 1;
                    else {
                        r && (e = -e),
                        i(e <= 67108863, "Number is too big");
                        var n = 0 | this.words[0];
                        t = n === e ? 0 : n < e ? -1 : 1
                    }
                    return 0 !== this.negative ? 0 | -t : t
                }
                ,
                s.prototype.cmp = function(e) {
                    if (0 !== this.negative && 0 === e.negative)
                        return -1;
                    if (0 === this.negative && 0 !== e.negative)
                        return 1;
                    var t = this.ucmp(e);
                    return 0 !== this.negative ? 0 | -t : t
                }
                ,
                s.prototype.ucmp = function(e) {
                    if (this.length > e.length)
                        return 1;
                    if (this.length < e.length)
                        return -1;
                    for (var t = 0, r = this.length - 1; r >= 0; r--) {
                        var i = 0 | this.words[r]
                          , n = 0 | e.words[r];
                        if (i !== n) {
                            i < n ? t = -1 : i > n && (t = 1);
                            break
                        }
                    }
                    return t
                }
                ,
                s.prototype.gtn = function(e) {
                    return 1 === this.cmpn(e)
                }
                ,
                s.prototype.gt = function(e) {
                    return 1 === this.cmp(e)
                }
                ,
                s.prototype.gten = function(e) {
                    return this.cmpn(e) >= 0
                }
                ,
                s.prototype.gte = function(e) {
                    return this.cmp(e) >= 0
                }
                ,
                s.prototype.ltn = function(e) {
                    return -1 === this.cmpn(e)
                }
                ,
                s.prototype.lt = function(e) {
                    return -1 === this.cmp(e)
                }
                ,
                s.prototype.lten = function(e) {
                    return this.cmpn(e) <= 0
                }
                ,
                s.prototype.lte = function(e) {
                    return this.cmp(e) <= 0
                }
                ,
                s.prototype.eqn = function(e) {
                    return 0 === this.cmpn(e)
                }
                ,
                s.prototype.eq = function(e) {
                    return 0 === this.cmp(e)
                }
                ,
                s.red = function(e) {
                    return new S(e)
                }
                ,
                s.prototype.toRed = function(e) {
                    return i(!this.red, "Already a number in reduction context"),
                    i(0 === this.negative, "red works only with positives"),
                    e.convertTo(this)._forceRed(e)
                }
                ,
                s.prototype.fromRed = function() {
                    return i(this.red, "fromRed works only with numbers in reduction context"),
                    this.red.convertFrom(this)
                }
                ,
                s.prototype._forceRed = function(e) {
                    return this.red = e,
                    this
                }
                ,
                s.prototype.forceRed = function(e) {
                    return i(!this.red, "Already a number in reduction context"),
                    this._forceRed(e)
                }
                ,
                s.prototype.redAdd = function(e) {
                    return i(this.red, "redAdd works only with red numbers"),
                    this.red.add(this, e)
                }
                ,
                s.prototype.redIAdd = function(e) {
                    return i(this.red, "redIAdd works only with red numbers"),
                    this.red.iadd(this, e)
                }
                ,
                s.prototype.redSub = function(e) {
                    return i(this.red, "redSub works only with red numbers"),
                    this.red.sub(this, e)
                }
                ,
                s.prototype.redISub = function(e) {
                    return i(this.red, "redISub works only with red numbers"),
                    this.red.isub(this, e)
                }
                ,
                s.prototype.redShl = function(e) {
                    return i(this.red, "redShl works only with red numbers"),
                    this.red.shl(this, e)
                }
                ,
                s.prototype.redMul = function(e) {
                    return i(this.red, "redMul works only with red numbers"),
                    this.red._verify2(this, e),
                    this.red.mul(this, e)
                }
                ,
                s.prototype.redIMul = function(e) {
                    return i(this.red, "redMul works only with red numbers"),
                    this.red._verify2(this, e),
                    this.red.imul(this, e)
                }
                ,
                s.prototype.redSqr = function() {
                    return i(this.red, "redSqr works only with red numbers"),
                    this.red._verify1(this),
                    this.red.sqr(this)
                }
                ,
                s.prototype.redISqr = function() {
                    return i(this.red, "redISqr works only with red numbers"),
                    this.red._verify1(this),
                    this.red.isqr(this)
                }
                ,
                s.prototype.redSqrt = function() {
                    return i(this.red, "redSqrt works only with red numbers"),
                    this.red._verify1(this),
                    this.red.sqrt(this)
                }
                ,
                s.prototype.redInvm = function() {
                    return i(this.red, "redInvm works only with red numbers"),
                    this.red._verify1(this),
                    this.red.invm(this)
                }
                ,
                s.prototype.redNeg = function() {
                    return i(this.red, "redNeg works only with red numbers"),
                    this.red._verify1(this),
                    this.red.neg(this)
                }
                ,
                s.prototype.redPow = function(e) {
                    return i(this.red && !e.red, "redPow(normalNum)"),
                    this.red._verify1(this),
                    this.red.pow(this, e)
                }
                ;
                var m = {
                    k256: null,
                    p224: null,
                    p192: null,
                    p25519: null
                };
                function y(e, t) {
                    this.name = e,
                    this.p = new s(t,16),
                    this.n = this.p.bitLength(),
                    this.k = new s(1).iushln(this.n).isub(this.p),
                    this.tmp = this._tmp()
                }
                function g() {
                    y.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
                }
                function v() {
                    y.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
                }
                function w() {
                    y.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
                }
                function _() {
                    y.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
                }
                function S(e) {
                    if ("string" == typeof e) {
                        var t = s._prime(e);
                        this.m = t.p,
                        this.prime = t
                    } else
                        i(e.gtn(1), "modulus must be greater than 1"),
                        this.m = e,
                        this.prime = null
                }
                function M(e) {
                    S.call(this, e),
                    this.shift = this.m.bitLength(),
                    this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26),
                    this.r = new s(1).iushln(this.shift),
                    this.r2 = this.imod(this.r.sqr()),
                    this.rinv = this.r._invmp(this.m),
                    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m),
                    this.minv = this.minv.umod(this.r),
                    this.minv = this.r.sub(this.minv)
                }
                y.prototype._tmp = function() {
                    var e = new s(null);
                    return e.words = new Array(Math.ceil(this.n / 13)),
                    e
                }
                ,
                y.prototype.ireduce = function(e) {
                    var t, r = e;
                    do {
                        this.split(r, this.tmp),
                        t = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()
                    } while (t > this.n);
                    var i = t < this.n ? -1 : r.ucmp(this.p);
                    return 0 === i ? (r.words[0] = 0,
                    r.length = 1) : i > 0 ? r.isub(this.p) : r.strip(),
                    r
                }
                ,
                y.prototype.split = function(e, t) {
                    e.iushrn(this.n, 0, t)
                }
                ,
                y.prototype.imulK = function(e) {
                    return e.imul(this.k)
                }
                ,
                n(g, y),
                g.prototype.split = function(e, t) {
                    for (var r = Math.min(e.length, 9), i = 0; i < r; i++)
                        t.words[i] = e.words[i];
                    if (t.length = r,
                    e.length <= 9)
                        return e.words[0] = 0,
                        void (e.length = 1);
                    var n = e.words[9];
                    for (t.words[t.length++] = 4194303 & n,
                    i = 10; i < e.length; i++) {
                        var s = 0 | e.words[i];
                        e.words[i - 10] = (4194303 & s) << 4 | n >>> 22,
                        n = s
                    }
                    n >>>= 22,
                    e.words[i - 10] = n,
                    0 === n && e.length > 10 ? e.length -= 10 : e.length -= 9
                }
                ,
                g.prototype.imulK = function(e) {
                    e.words[e.length] = 0,
                    e.words[e.length + 1] = 0,
                    e.length += 2;
                    for (var t = 0, r = 0; r < e.length; r++) {
                        var i = 0 | e.words[r];
                        t += 977 * i,
                        e.words[r] = 67108863 & t,
                        t = 64 * i + (t / 67108864 | 0)
                    }
                    return 0 === e.words[e.length - 1] && (e.length--,
                    0 === e.words[e.length - 1] && e.length--),
                    e
                }
                ,
                n(v, y),
                n(w, y),
                n(_, y),
                _.prototype.imulK = function(e) {
                    for (var t = 0, r = 0; r < e.length; r++) {
                        var i = 19 * (0 | e.words[r]) + t
                          , n = 67108863 & i;
                        i >>>= 26,
                        e.words[r] = n,
                        t = i
                    }
                    return 0 !== t && (e.words[e.length++] = t),
                    e
                }
                ,
                s._prime = function(e) {
                    if (m[e])
                        return m[e];
                    var t;
                    if ("k256" === e)
                        t = new g;
                    else if ("p224" === e)
                        t = new v;
                    else if ("p192" === e)
                        t = new w;
                    else {
                        if ("p25519" !== e)
                            throw new Error("Unknown prime " + e);
                        t = new _
                    }
                    return m[e] = t,
                    t
                }
                ,
                S.prototype._verify1 = function(e) {
                    i(0 === e.negative, "red works only with positives"),
                    i(e.red, "red works only with red numbers")
                }
                ,
                S.prototype._verify2 = function(e, t) {
                    i(0 == (e.negative | t.negative), "red works only with positives"),
                    i(e.red && e.red === t.red, "red works only with red numbers")
                }
                ,
                S.prototype.imod = function(e) {
                    return this.prime ? this.prime.ireduce(e)._forceRed(this) : e.umod(this.m)._forceRed(this)
                }
                ,
                S.prototype.neg = function(e) {
                    return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this)
                }
                ,
                S.prototype.add = function(e, t) {
                    this._verify2(e, t);
                    var r = e.add(t);
                    return r.cmp(this.m) >= 0 && r.isub(this.m),
                    r._forceRed(this)
                }
                ,
                S.prototype.iadd = function(e, t) {
                    this._verify2(e, t);
                    var r = e.iadd(t);
                    return r.cmp(this.m) >= 0 && r.isub(this.m),
                    r
                }
                ,
                S.prototype.sub = function(e, t) {
                    this._verify2(e, t);
                    var r = e.sub(t);
                    return r.cmpn(0) < 0 && r.iadd(this.m),
                    r._forceRed(this)
                }
                ,
                S.prototype.isub = function(e, t) {
                    this._verify2(e, t);
                    var r = e.isub(t);
                    return r.cmpn(0) < 0 && r.iadd(this.m),
                    r
                }
                ,
                S.prototype.shl = function(e, t) {
                    return this._verify1(e),
                    this.imod(e.ushln(t))
                }
                ,
                S.prototype.imul = function(e, t) {
                    return this._verify2(e, t),
                    this.imod(e.imul(t))
                }
                ,
                S.prototype.mul = function(e, t) {
                    return this._verify2(e, t),
                    this.imod(e.mul(t))
                }
                ,
                S.prototype.isqr = function(e) {
                    return this.imul(e, e.clone())
                }
                ,
                S.prototype.sqr = function(e) {
                    return this.mul(e, e)
                }
                ,
                S.prototype.sqrt = function(e) {
                    if (e.isZero())
                        return e.clone();
                    var t = this.m.andln(3);
                    if (i(t % 2 == 1),
                    3 === t) {
                        var r = this.m.add(new s(1)).iushrn(2);
                        return this.pow(e, r)
                    }
                    for (var n = this.m.subn(1), o = 0; !n.isZero() && 0 === n.andln(1); )
                        o++,
                        n.iushrn(1);
                    i(!n.isZero());
                    var a = new s(1).toRed(this)
                      , f = a.redNeg()
                      , u = this.m.subn(1).iushrn(1)
                      , c = this.m.bitLength();
                    for (c = new s(2 * c * c).toRed(this); 0 !== this.pow(c, u).cmp(f); )
                        c.redIAdd(f);
                    for (var h = this.pow(c, n), d = this.pow(e, n.addn(1).iushrn(1)), l = this.pow(e, n), p = o; 0 !== l.cmp(a); ) {
                        for (var b = l, m = 0; 0 !== b.cmp(a); m++)
                            b = b.redSqr();
                        i(m < p);
                        var y = this.pow(h, new s(1).iushln(p - m - 1));
                        d = d.redMul(y),
                        h = y.redSqr(),
                        l = l.redMul(h),
                        p = m
                    }
                    return d
                }
                ,
                S.prototype.invm = function(e) {
                    var t = e._invmp(this.m);
                    return 0 !== t.negative ? (t.negative = 0,
                    this.imod(t).redNeg()) : this.imod(t)
                }
                ,
                S.prototype.pow = function(e, t) {
                    if (t.isZero())
                        return new s(1).toRed(this);
                    if (0 === t.cmpn(1))
                        return e.clone();
                    var r = new Array(16);
                    r[0] = new s(1).toRed(this),
                    r[1] = e;
                    for (var i = 2; i < r.length; i++)
                        r[i] = this.mul(r[i - 1], e);
                    var n = r[0]
                      , o = 0
                      , a = 0
                      , f = t.bitLength() % 26;
                    for (0 === f && (f = 26),
                    i = t.length - 1; i >= 0; i--) {
                        for (var u = t.words[i], c = f - 1; c >= 0; c--) {
                            var h = u >> c & 1;
                            n !== r[0] && (n = this.sqr(n)),
                            0 !== h || 0 !== o ? (o <<= 1,
                            o |= h,
                            (4 === ++a || 0 === i && 0 === c) && (n = this.mul(n, r[o]),
                            a = 0,
                            o = 0)) : a = 0
                        }
                        f = 26
                    }
                    return n
                }
                ,
                S.prototype.convertTo = function(e) {
                    var t = e.umod(this.m);
                    return t === e ? t.clone() : t
                }
                ,
                S.prototype.convertFrom = function(e) {
                    var t = e.clone();
                    return t.red = null,
                    t
                }
                ,
                s.mont = function(e) {
                    return new M(e)
                }
                ,
                n(M, S),
                M.prototype.convertTo = function(e) {
                    return this.imod(e.ushln(this.shift))
                }
                ,
                M.prototype.convertFrom = function(e) {
                    var t = this.imod(e.mul(this.rinv));
                    return t.red = null,
                    t
                }
                ,
                M.prototype.imul = function(e, t) {
                    if (e.isZero() || t.isZero())
                        return e.words[0] = 0,
                        e.length = 1,
                        e;
                    var r = e.imul(t)
                      , i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m)
                      , n = r.isub(i).iushrn(this.shift)
                      , s = n;
                    return n.cmp(this.m) >= 0 ? s = n.isub(this.m) : n.cmpn(0) < 0 && (s = n.iadd(this.m)),
                    s._forceRed(this)
                }
                ,
                M.prototype.mul = function(e, t) {
                    if (e.isZero() || t.isZero())
                        return new s(0)._forceRed(this);
                    var r = e.mul(t)
                      , i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m)
                      , n = r.isub(i).iushrn(this.shift)
                      , o = n;
                    return n.cmp(this.m) >= 0 ? o = n.isub(this.m) : n.cmpn(0) < 0 && (o = n.iadd(this.m)),
                    o._forceRed(this)
                }
                ,
                M.prototype.invm = function(e) {
                    return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this)
                }
            }(void 0 === t || t, this)
        }
        , {
            buffer: 115
        }],
        7: [function(e, t, r) {
            var i;
            function n(e) {
                this.rand = e
            }
            if (t.exports = function(e) {
                return i || (i = new n(null)),
                i.generate(e)
            }
            ,
            t.exports.Rand = n,
            n.prototype.generate = function(e) {
                return this._rand(e)
            }
            ,
            n.prototype._rand = function(e) {
                if (this.rand.getBytes)
                    return this.rand.getBytes(e);
                for (var t = new Uint8Array(e), r = 0; r < t.length; r++)
                    t[r] = this.rand.getByte();
                return t
            }
            ,
            "object" == typeof self)
                self.crypto && self.crypto.getRandomValues ? n.prototype._rand = function(e) {
                    var t = new Uint8Array(e);
                    return self.crypto.getRandomValues(t),
                    t
                }
                : self.msCrypto && self.msCrypto.getRandomValues ? n.prototype._rand = function(e) {
                    var t = new Uint8Array(e);
                    return self.msCrypto.getRandomValues(t),
                    t
                }
                : "object" == typeof window && (n.prototype._rand = function() {
                    throw new Error("Not implemented yet")
                }
                );
            else
                try {
                    var s = e("crypto");
                    if ("function" != typeof s.randomBytes)
                        throw new Error("Not supported");
                    n.prototype._rand = function(e) {
                        return s.randomBytes(e)
                    }
                } catch (e) {}
        }
        , {
            crypto: 115
        }],
        8: [function(e, t, r) {
            var i = e("base-x");
            t.exports = i("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
        }
        , {
            "base-x": 1
        }],
        9: [function(e, t, r) {
            "use strict";
            var i = e("bs58")
              , n = e("safe-buffer").Buffer;
            t.exports = function(e) {
                function t(t) {
                    var r = t.slice(0, -4)
                      , i = t.slice(-4)
                      , n = e(r);
                    if (!(i[0] ^ n[0] | i[1] ^ n[1] | i[2] ^ n[2] | i[3] ^ n[3]))
                        return r
                }
                return {
                    encode: function(t) {
                        var r = e(t);
                        return i.encode(n.concat([t, r], t.length + 4))
                    },
                    decode: function(e) {
                        var r = t(i.decode(e));
                        if (!r)
                            throw new Error("Invalid checksum");
                        return r
                    },
                    decodeUnsafe: function(e) {
                        var r = i.decodeUnsafe(e);
                        if (r)
                            return t(r)
                    }
                }
            }
        }
        , {
            bs58: 8,
            "safe-buffer": 54
        }],
        10: [function(e, t, r) {
            "use strict";
            var i = e("create-hash")
              , n = e("./base");
            t.exports = n(function(e) {
                var t = i("sha256").update(e).digest();
                return i("sha256").update(t).digest()
            })
        }
        , {
            "./base": 9,
            "create-hash": 12
        }],
        11: [function(e, t, r) {
            var i = e("safe-buffer").Buffer
              , n = e("stream").Transform
              , s = e("string_decoder").StringDecoder;
            function o(e) {
                n.call(this),
                this.hashMode = "string" == typeof e,
                this.hashMode ? this[e] = this._finalOrDigest : this.final = this._finalOrDigest,
                this._final && (this.__final = this._final,
                this._final = null),
                this._decoder = null,
                this._encoding = null
            }
            e("inherits")(o, n),
            o.prototype.update = function(e, t, r) {
                "string" == typeof e && (e = i.from(e, t));
                var n = this._update(e);
                return this.hashMode ? this : (r && (n = this._toString(n, r)),
                n)
            }
            ,
            o.prototype.setAutoPadding = function() {}
            ,
            o.prototype.getAuthTag = function() {
                throw new Error("trying to get auth tag in unsupported state")
            }
            ,
            o.prototype.setAuthTag = function() {
                throw new Error("trying to set auth tag in unsupported state")
            }
            ,
            o.prototype.setAAD = function() {
                throw new Error("trying to set aad in unsupported state")
            }
            ,
            o.prototype._transform = function(e, t, r) {
                var i;
                try {
                    this.hashMode ? this._update(e) : this.push(this._update(e))
                } catch (e) {
                    i = e
                } finally {
                    r(i)
                }
            }
            ,
            o.prototype._flush = function(e) {
                var t;
                try {
                    this.push(this.__final())
                } catch (e) {
                    t = e
                }
                e(t)
            }
            ,
            o.prototype._finalOrDigest = function(e) {
                var t = this.__final() || i.alloc(0);
                return e && (t = this._toString(t, e, !0)),
                t
            }
            ,
            o.prototype._toString = function(e, t, r) {
                if (this._decoder || (this._decoder = new s(t),
                this._encoding = t),
                this._encoding !== t)
                    throw new Error("can't switch encodings");
                var i = this._decoder.write(e);
                return r && (i += this._decoder.end()),
                i
            }
            ,
            t.exports = o
        }
        , {
            inherits: 46,
            "safe-buffer": 54,
            stream: 141,
            string_decoder: 142
        }],
        12: [function(e, t, r) {
            "use strict";
            var i = e("inherits")
              , n = e("md5.js")
              , s = e("ripemd160")
              , o = e("sha.js")
              , a = e("cipher-base");
            function f(e) {
                a.call(this, "digest"),
                this._hash = e
            }
            i(f, a),
            f.prototype._update = function(e) {
                this._hash.update(e)
            }
            ,
            f.prototype._final = function() {
                return this._hash.digest()
            }
            ,
            t.exports = function(e) {
                return "md5" === (e = e.toLowerCase()) ? new n : "rmd160" === e || "ripemd160" === e ? new s : new f(o(e))
            }
        }
        , {
            "cipher-base": 11,
            inherits: 46,
            "md5.js": 47,
            ripemd160: 53,
            "sha.js": 56
        }],
        13: [function(e, t, r) {
            var i = e("md5.js");
            t.exports = function(e) {
                return (new i).update(e).digest()
            }
        }
        , {
            "md5.js": 47
        }],
        14: [function(e, t, r) {
            "use strict";
            var i = e("inherits")
              , n = e("./legacy")
              , s = e("cipher-base")
              , o = e("safe-buffer").Buffer
              , a = e("create-hash/md5")
              , f = e("ripemd160")
              , u = e("sha.js")
              , c = o.alloc(128);
            function h(e, t) {
                s.call(this, "digest"),
                "string" == typeof t && (t = o.from(t));
                var r = "sha512" === e || "sha384" === e ? 128 : 64;
                (this._alg = e,
                this._key = t,
                t.length > r) ? t = ("rmd160" === e ? new f : u(e)).update(t).digest() : t.length < r && (t = o.concat([t, c], r));
                for (var i = this._ipad = o.allocUnsafe(r), n = this._opad = o.allocUnsafe(r), a = 0; a < r; a++)
                    i[a] = 54 ^ t[a],
                    n[a] = 92 ^ t[a];
                this._hash = "rmd160" === e ? new f : u(e),
                this._hash.update(i)
            }
            i(h, s),
            h.prototype._update = function(e) {
                this._hash.update(e)
            }
            ,
            h.prototype._final = function() {
                var e = this._hash.digest();
                return ("rmd160" === this._alg ? new f : u(this._alg)).update(this._opad).update(e).digest()
            }
            ,
            t.exports = function(e, t) {
                return "rmd160" === (e = e.toLowerCase()) || "ripemd160" === e ? new h("rmd160",t) : "md5" === e ? new n(a,t) : new h(e,t)
            }
        }
        , {
            "./legacy": 15,
            "cipher-base": 11,
            "create-hash/md5": 13,
            inherits: 46,
            ripemd160: 53,
            "safe-buffer": 54,
            "sha.js": 56
        }],
        15: [function(e, t, r) {
            "use strict";
            var i = e("inherits")
              , n = e("safe-buffer").Buffer
              , s = e("cipher-base")
              , o = n.alloc(128)
              , a = 64;
            function f(e, t) {
                s.call(this, "digest"),
                "string" == typeof t && (t = n.from(t)),
                this._alg = e,
                this._key = t,
                t.length > a ? t = e(t) : t.length < a && (t = n.concat([t, o], a));
                for (var r = this._ipad = n.allocUnsafe(a), i = this._opad = n.allocUnsafe(a), f = 0; f < a; f++)
                    r[f] = 54 ^ t[f],
                    i[f] = 92 ^ t[f];
                this._hash = [r]
            }
            i(f, s),
            f.prototype._update = function(e) {
                this._hash.push(e)
            }
            ,
            f.prototype._final = function() {
                var e = this._alg(n.concat(this._hash));
                return this._alg(n.concat([this._opad, e]))
            }
            ,
            t.exports = f
        }
        , {
            "cipher-base": 11,
            inherits: 46,
            "safe-buffer": 54
        }],
        16: [function(e, t, r) {
            "use strict";
            var i = r;
            i.version = e("../package.json").version,
            i.utils = e("./elliptic/utils"),
            i.rand = e("brorand"),
            i.curve = e("./elliptic/curve"),
            i.curves = e("./elliptic/curves"),
            i.ec = e("./elliptic/ec"),
            i.eddsa = e("./elliptic/eddsa")
        }
        , {
            "../package.json": 31,
            "./elliptic/curve": 19,
            "./elliptic/curves": 22,
            "./elliptic/ec": 23,
            "./elliptic/eddsa": 26,
            "./elliptic/utils": 30,
            brorand: 7
        }],
        17: [function(e, t, r) {
            "use strict";
            var i = e("bn.js")
              , n = e("../utils")
              , s = n.getNAF
              , o = n.getJSF
              , a = n.assert;
            function f(e, t) {
                this.type = e,
                this.p = new i(t.p,16),
                this.red = t.prime ? i.red(t.prime) : i.mont(this.p),
                this.zero = new i(0).toRed(this.red),
                this.one = new i(1).toRed(this.red),
                this.two = new i(2).toRed(this.red),
                this.n = t.n && new i(t.n,16),
                this.g = t.g && this.pointFromJSON(t.g, t.gRed),
                this._wnafT1 = new Array(4),
                this._wnafT2 = new Array(4),
                this._wnafT3 = new Array(4),
                this._wnafT4 = new Array(4),
                this._bitLength = this.n ? this.n.bitLength() : 0;
                var r = this.n && this.p.div(this.n);
                !r || r.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0,
                this.redN = this.n.toRed(this.red))
            }
            function u(e, t) {
                this.curve = e,
                this.type = t,
                this.precomputed = null
            }
            t.exports = f,
            f.prototype.point = function() {
                throw new Error("Not implemented")
            }
            ,
            f.prototype.validate = function() {
                throw new Error("Not implemented")
            }
            ,
            f.prototype._fixedNafMul = function(e, t) {
                a(e.precomputed);
                var r = e._getDoubles()
                  , i = s(t, 1, this._bitLength)
                  , n = (1 << r.step + 1) - (r.step % 2 == 0 ? 2 : 1);
                n /= 3;
                for (var o = [], f = 0; f < i.length; f += r.step) {
                    var u = 0;
                    for (t = f + r.step - 1; t >= f; t--)
                        u = (u << 1) + i[t];
                    o.push(u)
                }
                for (var c = this.jpoint(null, null, null), h = this.jpoint(null, null, null), d = n; d > 0; d--) {
                    for (f = 0; f < o.length; f++) {
                        (u = o[f]) === d ? h = h.mixedAdd(r.points[f]) : u === -d && (h = h.mixedAdd(r.points[f].neg()))
                    }
                    c = c.add(h)
                }
                return c.toP()
            }
            ,
            f.prototype._wnafMul = function(e, t) {
                var r = 4
                  , i = e._getNAFPoints(r);
                r = i.wnd;
                for (var n = i.points, o = s(t, r, this._bitLength), f = this.jpoint(null, null, null), u = o.length - 1; u >= 0; u--) {
                    for (t = 0; u >= 0 && 0 === o[u]; u--)
                        t++;
                    if (u >= 0 && t++,
                    f = f.dblp(t),
                    u < 0)
                        break;
                    var c = o[u];
                    a(0 !== c),
                    f = "affine" === e.type ? c > 0 ? f.mixedAdd(n[c - 1 >> 1]) : f.mixedAdd(n[-c - 1 >> 1].neg()) : c > 0 ? f.add(n[c - 1 >> 1]) : f.add(n[-c - 1 >> 1].neg())
                }
                return "affine" === e.type ? f.toP() : f
            }
            ,
            f.prototype._wnafMulAdd = function(e, t, r, i, n) {
                for (var a = this._wnafT1, f = this._wnafT2, u = this._wnafT3, c = 0, h = 0; h < i; h++) {
                    var d = (k = t[h])._getNAFPoints(e);
                    a[h] = d.wnd,
                    f[h] = d.points
                }
                for (h = i - 1; h >= 1; h -= 2) {
                    var l = h - 1
                      , p = h;
                    if (1 === a[l] && 1 === a[p]) {
                        var b = [t[l], null, null, t[p]];
                        0 === t[l].y.cmp(t[p].y) ? (b[1] = t[l].add(t[p]),
                        b[2] = t[l].toJ().mixedAdd(t[p].neg())) : 0 === t[l].y.cmp(t[p].y.redNeg()) ? (b[1] = t[l].toJ().mixedAdd(t[p]),
                        b[2] = t[l].add(t[p].neg())) : (b[1] = t[l].toJ().mixedAdd(t[p]),
                        b[2] = t[l].toJ().mixedAdd(t[p].neg()));
                        var m = [-3, -1, -5, -7, 0, 7, 5, 1, 3]
                          , y = o(r[l], r[p]);
                        c = Math.max(y[0].length, c),
                        u[l] = new Array(c),
                        u[p] = new Array(c);
                        for (var g = 0; g < c; g++) {
                            var v = 0 | y[0][g]
                              , w = 0 | y[1][g];
                            u[l][g] = m[3 * (v + 1) + (w + 1)],
                            u[p][g] = 0,
                            f[l] = b
                        }
                    } else
                        u[l] = s(r[l], a[l], this._bitLength),
                        u[p] = s(r[p], a[p], this._bitLength),
                        c = Math.max(u[l].length, c),
                        c = Math.max(u[p].length, c)
                }
                var _ = this.jpoint(null, null, null)
                  , S = this._wnafT4;
                for (h = c; h >= 0; h--) {
                    for (var M = 0; h >= 0; ) {
                        var E = !0;
                        for (g = 0; g < i; g++)
                            S[g] = 0 | u[g][h],
                            0 !== S[g] && (E = !1);
                        if (!E)
                            break;
                        M++,
                        h--
                    }
                    if (h >= 0 && M++,
                    _ = _.dblp(M),
                    h < 0)
                        break;
                    for (g = 0; g < i; g++) {
                        var k, O = S[g];
                        0 !== O && (O > 0 ? k = f[g][O - 1 >> 1] : O < 0 && (k = f[g][-O - 1 >> 1].neg()),
                        _ = "affine" === k.type ? _.mixedAdd(k) : _.add(k))
                    }
                }
                for (h = 0; h < i; h++)
                    f[h] = null;
                return n ? _ : _.toP()
            }
            ,
            f.BasePoint = u,
            u.prototype.eq = function() {
                throw new Error("Not implemented")
            }
            ,
            u.prototype.validate = function() {
                return this.curve.validate(this)
            }
            ,
            f.prototype.decodePoint = function(e, t) {
                e = n.toArray(e, t);
                var r = this.p.byteLength();
                if ((4 === e[0] || 6 === e[0] || 7 === e[0]) && e.length - 1 == 2 * r)
                    return 6 === e[0] ? a(e[e.length - 1] % 2 == 0) : 7 === e[0] && a(e[e.length - 1] % 2 == 1),
                    this.point(e.slice(1, 1 + r), e.slice(1 + r, 1 + 2 * r));
                if ((2 === e[0] || 3 === e[0]) && e.length - 1 === r)
                    return this.pointFromX(e.slice(1, 1 + r), 3 === e[0]);
                throw new Error("Unknown point format")
            }
            ,
            u.prototype.encodeCompressed = function(e) {
                return this.encode(e, !0)
            }
            ,
            u.prototype._encode = function(e) {
                var t = this.curve.p.byteLength()
                  , r = this.getX().toArray("be", t);
                return e ? [this.getY().isEven() ? 2 : 3].concat(r) : [4].concat(r, this.getY().toArray("be", t))
            }
            ,
            u.prototype.encode = function(e, t) {
                return n.encode(this._encode(t), e)
            }
            ,
            u.prototype.precompute = function(e) {
                if (this.precomputed)
                    return this;
                var t = {
                    doubles: null,
                    naf: null,
                    beta: null
                };
                return t.naf = this._getNAFPoints(8),
                t.doubles = this._getDoubles(4, e),
                t.beta = this._getBeta(),
                this.precomputed = t,
                this
            }
            ,
            u.prototype._hasDoubles = function(e) {
                if (!this.precomputed)
                    return !1;
                var t = this.precomputed.doubles;
                return !!t && t.points.length >= Math.ceil((e.bitLength() + 1) / t.step)
            }
            ,
            u.prototype._getDoubles = function(e, t) {
                if (this.precomputed && this.precomputed.doubles)
                    return this.precomputed.doubles;
                for (var r = [this], i = this, n = 0; n < t; n += e) {
                    for (var s = 0; s < e; s++)
                        i = i.dbl();
                    r.push(i)
                }
                return {
                    step: e,
                    points: r
                }
            }
            ,
            u.prototype._getNAFPoints = function(e) {
                if (this.precomputed && this.precomputed.naf)
                    return this.precomputed.naf;
                for (var t = [this], r = (1 << e) - 1, i = 1 === r ? null : this.dbl(), n = 1; n < r; n++)
                    t[n] = t[n - 1].add(i);
                return {
                    wnd: e,
                    points: t
                }
            }
            ,
            u.prototype._getBeta = function() {
                return null
            }
            ,
            u.prototype.dblp = function(e) {
                for (var t = this, r = 0; r < e; r++)
                    t = t.dbl();
                return t
            }
        }
        , {
            "../utils": 30,
            "bn.js": 6
        }],
        18: [function(e, t, r) {
            "use strict";
            var i = e("../utils")
              , n = e("bn.js")
              , s = e("inherits")
              , o = e("./base")
              , a = i.assert;
            function f(e) {
                this.twisted = 1 != (0 | e.a),
                this.mOneA = this.twisted && -1 == (0 | e.a),
                this.extended = this.mOneA,
                o.call(this, "edwards", e),
                this.a = new n(e.a,16).umod(this.red.m),
                this.a = this.a.toRed(this.red),
                this.c = new n(e.c,16).toRed(this.red),
                this.c2 = this.c.redSqr(),
                this.d = new n(e.d,16).toRed(this.red),
                this.dd = this.d.redAdd(this.d),
                a(!this.twisted || 0 === this.c.fromRed().cmpn(1)),
                this.oneC = 1 == (0 | e.c)
            }
            function Point(e, t, r, i, s) {
                o.BasePoint.call(this, e, "projective"),
                null === t && null === r && null === i ? (this.x = this.curve.zero,
                this.y = this.curve.one,
                this.z = this.curve.one,
                this.t = this.curve.zero,
                this.zOne = !0) : (this.x = new n(t,16),
                this.y = new n(r,16),
                this.z = i ? new n(i,16) : this.curve.one,
                this.t = s && new n(s,16),
                this.x.red || (this.x = this.x.toRed(this.curve.red)),
                this.y.red || (this.y = this.y.toRed(this.curve.red)),
                this.z.red || (this.z = this.z.toRed(this.curve.red)),
                this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)),
                this.zOne = this.z === this.curve.one,
                this.curve.extended && !this.t && (this.t = this.x.redMul(this.y),
                this.zOne || (this.t = this.t.redMul(this.z.redInvm()))))
            }
            s(f, o),
            t.exports = f,
            f.prototype._mulA = function(e) {
                return this.mOneA ? e.redNeg() : this.a.redMul(e)
            }
            ,
            f.prototype._mulC = function(e) {
                return this.oneC ? e : this.c.redMul(e)
            }
            ,
            f.prototype.jpoint = function(e, t, r, i) {
                return this.point(e, t, r, i)
            }
            ,
            f.prototype.pointFromX = function(e, t) {
                (e = new n(e,16)).red || (e = e.toRed(this.red));
                var r = e.redSqr()
                  , i = this.c2.redSub(this.a.redMul(r))
                  , s = this.one.redSub(this.c2.redMul(this.d).redMul(r))
                  , o = i.redMul(s.redInvm())
                  , a = o.redSqrt();
                if (0 !== a.redSqr().redSub(o).cmp(this.zero))
                    throw new Error("invalid point");
                var f = a.fromRed().isOdd();
                return (t && !f || !t && f) && (a = a.redNeg()),
                this.point(e, a)
            }
            ,
            f.prototype.pointFromY = function(e, t) {
                (e = new n(e,16)).red || (e = e.toRed(this.red));
                var r = e.redSqr()
                  , i = r.redSub(this.c2)
                  , s = r.redMul(this.d).redMul(this.c2).redSub(this.a)
                  , o = i.redMul(s.redInvm());
                if (0 === o.cmp(this.zero)) {
                    if (t)
                        throw new Error("invalid point");
                    return this.point(this.zero, e)
                }
                var a = o.redSqrt();
                if (0 !== a.redSqr().redSub(o).cmp(this.zero))
                    throw new Error("invalid point");
                return a.fromRed().isOdd() !== t && (a = a.redNeg()),
                this.point(a, e)
            }
            ,
            f.prototype.validate = function(e) {
                if (e.isInfinity())
                    return !0;
                e.normalize();
                var t = e.x.redSqr()
                  , r = e.y.redSqr()
                  , i = t.redMul(this.a).redAdd(r)
                  , n = this.c2.redMul(this.one.redAdd(this.d.redMul(t).redMul(r)));
                return 0 === i.cmp(n)
            }
            ,
            s(Point, o.BasePoint),
            f.prototype.pointFromJSON = function(e) {
                return Point.fromJSON(this, e)
            }
            ,
            f.prototype.point = function(e, t, r, i) {
                return new Point(this,e,t,r,i)
            }
            ,
            Point.fromJSON = function(e, t) {
                return new Point(e,t[0],t[1],t[2])
            }
            ,
            Point.prototype.inspect = function() {
                return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
            }
            ,
            Point.prototype.isInfinity = function() {
                return 0 === this.x.cmpn(0) && (0 === this.y.cmp(this.z) || this.zOne && 0 === this.y.cmp(this.curve.c))
            }
            ,
            Point.prototype._extDbl = function() {
                var e = this.x.redSqr()
                  , t = this.y.redSqr()
                  , r = this.z.redSqr();
                r = r.redIAdd(r);
                var i = this.curve._mulA(e)
                  , n = this.x.redAdd(this.y).redSqr().redISub(e).redISub(t)
                  , s = i.redAdd(t)
                  , o = s.redSub(r)
                  , a = i.redSub(t)
                  , f = n.redMul(o)
                  , u = s.redMul(a)
                  , c = n.redMul(a)
                  , h = o.redMul(s);
                return this.curve.point(f, u, h, c)
            }
            ,
            Point.prototype._projDbl = function() {
                var e, t, r, i = this.x.redAdd(this.y).redSqr(), n = this.x.redSqr(), s = this.y.redSqr();
                if (this.curve.twisted) {
                    var o = (u = this.curve._mulA(n)).redAdd(s);
                    if (this.zOne)
                        e = i.redSub(n).redSub(s).redMul(o.redSub(this.curve.two)),
                        t = o.redMul(u.redSub(s)),
                        r = o.redSqr().redSub(o).redSub(o);
                    else {
                        var a = this.z.redSqr()
                          , f = o.redSub(a).redISub(a);
                        e = i.redSub(n).redISub(s).redMul(f),
                        t = o.redMul(u.redSub(s)),
                        r = o.redMul(f)
                    }
                } else {
                    var u = n.redAdd(s);
                    a = this.curve._mulC(this.z).redSqr(),
                    f = u.redSub(a).redSub(a);
                    e = this.curve._mulC(i.redISub(u)).redMul(f),
                    t = this.curve._mulC(u).redMul(n.redISub(s)),
                    r = u.redMul(f)
                }
                return this.curve.point(e, t, r)
            }
            ,
            Point.prototype.dbl = function() {
                return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl()
            }
            ,
            Point.prototype._extAdd = function(e) {
                var t = this.y.redSub(this.x).redMul(e.y.redSub(e.x))
                  , r = this.y.redAdd(this.x).redMul(e.y.redAdd(e.x))
                  , i = this.t.redMul(this.curve.dd).redMul(e.t)
                  , n = this.z.redMul(e.z.redAdd(e.z))
                  , s = r.redSub(t)
                  , o = n.redSub(i)
                  , a = n.redAdd(i)
                  , f = r.redAdd(t)
                  , u = s.redMul(o)
                  , c = a.redMul(f)
                  , h = s.redMul(f)
                  , d = o.redMul(a);
                return this.curve.point(u, c, d, h)
            }
            ,
            Point.prototype._projAdd = function(e) {
                var t, r, i = this.z.redMul(e.z), n = i.redSqr(), s = this.x.redMul(e.x), o = this.y.redMul(e.y), a = this.curve.d.redMul(s).redMul(o), f = n.redSub(a), u = n.redAdd(a), c = this.x.redAdd(this.y).redMul(e.x.redAdd(e.y)).redISub(s).redISub(o), h = i.redMul(f).redMul(c);
                return this.curve.twisted ? (t = i.redMul(u).redMul(o.redSub(this.curve._mulA(s))),
                r = f.redMul(u)) : (t = i.redMul(u).redMul(o.redSub(s)),
                r = this.curve._mulC(f).redMul(u)),
                this.curve.point(h, t, r)
            }
            ,
            Point.prototype.add = function(e) {
                return this.isInfinity() ? e : e.isInfinity() ? this : this.curve.extended ? this._extAdd(e) : this._projAdd(e)
            }
            ,
            Point.prototype.mul = function(e) {
                return this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve._wnafMul(this, e)
            }
            ,
            Point.prototype.mulAdd = function(e, t, r) {
                return this.curve._wnafMulAdd(1, [this, t], [e, r], 2, !1)
            }
            ,
            Point.prototype.jmulAdd = function(e, t, r) {
                return this.curve._wnafMulAdd(1, [this, t], [e, r], 2, !0)
            }
            ,
            Point.prototype.normalize = function() {
                if (this.zOne)
                    return this;
                var e = this.z.redInvm();
                return this.x = this.x.redMul(e),
                this.y = this.y.redMul(e),
                this.t && (this.t = this.t.redMul(e)),
                this.z = this.curve.one,
                this.zOne = !0,
                this
            }
            ,
            Point.prototype.neg = function() {
                return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg())
            }
            ,
            Point.prototype.getX = function() {
                return this.normalize(),
                this.x.fromRed()
            }
            ,
            Point.prototype.getY = function() {
                return this.normalize(),
                this.y.fromRed()
            }
            ,
            Point.prototype.eq = function(e) {
                return this === e || 0 === this.getX().cmp(e.getX()) && 0 === this.getY().cmp(e.getY())
            }
            ,
            Point.prototype.eqXToP = function(e) {
                var t = e.toRed(this.curve.red).redMul(this.z);
                if (0 === this.x.cmp(t))
                    return !0;
                for (var r = e.clone(), i = this.curve.redN.redMul(this.z); ; ) {
                    if (r.iadd(this.curve.n),
                    r.cmp(this.curve.p) >= 0)
                        return !1;
                    if (t.redIAdd(i),
                    0 === this.x.cmp(t))
                        return !0
                }
            }
            ,
            Point.prototype.toP = Point.prototype.normalize,
            Point.prototype.mixedAdd = Point.prototype.add
        }
        , {
            "../utils": 30,
            "./base": 17,
            "bn.js": 6,
            inherits: 46
        }],
        19: [function(e, t, r) {
            "use strict";
            var i = r;
            i.base = e("./base"),
            i.short = e("./short"),
            i.mont = e("./mont"),
            i.edwards = e("./edwards")
        }
        , {
            "./base": 17,
            "./edwards": 18,
            "./mont": 20,
            "./short": 21
        }],
        20: [function(e, t, r) {
            "use strict";
            var i = e("bn.js")
              , n = e("inherits")
              , s = e("./base")
              , o = e("../utils");
            function a(e) {
                s.call(this, "mont", e),
                this.a = new i(e.a,16).toRed(this.red),
                this.b = new i(e.b,16).toRed(this.red),
                this.i4 = new i(4).toRed(this.red).redInvm(),
                this.two = new i(2).toRed(this.red),
                this.a24 = this.i4.redMul(this.a.redAdd(this.two))
            }
            function Point(e, t, r) {
                s.BasePoint.call(this, e, "projective"),
                null === t && null === r ? (this.x = this.curve.one,
                this.z = this.curve.zero) : (this.x = new i(t,16),
                this.z = new i(r,16),
                this.x.red || (this.x = this.x.toRed(this.curve.red)),
                this.z.red || (this.z = this.z.toRed(this.curve.red)))
            }
            n(a, s),
            t.exports = a,
            a.prototype.validate = function(e) {
                var t = e.normalize().x
                  , r = t.redSqr()
                  , i = r.redMul(t).redAdd(r.redMul(this.a)).redAdd(t);
                return 0 === i.redSqrt().redSqr().cmp(i)
            }
            ,
            n(Point, s.BasePoint),
            a.prototype.decodePoint = function(e, t) {
                return this.point(o.toArray(e, t), 1)
            }
            ,
            a.prototype.point = function(e, t) {
                return new Point(this,e,t)
            }
            ,
            a.prototype.pointFromJSON = function(e) {
                return Point.fromJSON(this, e)
            }
            ,
            Point.prototype.precompute = function() {}
            ,
            Point.prototype._encode = function() {
                return this.getX().toArray("be", this.curve.p.byteLength())
            }
            ,
            Point.fromJSON = function(e, t) {
                return new Point(e,t[0],t[1] || e.one)
            }
            ,
            Point.prototype.inspect = function() {
                return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
            }
            ,
            Point.prototype.isInfinity = function() {
                return 0 === this.z.cmpn(0)
            }
            ,
            Point.prototype.dbl = function() {
                var e = this.x.redAdd(this.z).redSqr()
                  , t = this.x.redSub(this.z).redSqr()
                  , r = e.redSub(t)
                  , i = e.redMul(t)
                  , n = r.redMul(t.redAdd(this.curve.a24.redMul(r)));
                return this.curve.point(i, n)
            }
            ,
            Point.prototype.add = function() {
                throw new Error("Not supported on Montgomery curve")
            }
            ,
            Point.prototype.diffAdd = function(e, t) {
                var r = this.x.redAdd(this.z)
                  , i = this.x.redSub(this.z)
                  , n = e.x.redAdd(e.z)
                  , s = e.x.redSub(e.z).redMul(r)
                  , o = n.redMul(i)
                  , a = t.z.redMul(s.redAdd(o).redSqr())
                  , f = t.x.redMul(s.redISub(o).redSqr());
                return this.curve.point(a, f)
            }
            ,
            Point.prototype.mul = function(e) {
                for (var t = e.clone(), r = this, i = this.curve.point(null, null), n = []; 0 !== t.cmpn(0); t.iushrn(1))
                    n.push(t.andln(1));
                for (var s = n.length - 1; s >= 0; s--)
                    0 === n[s] ? (r = r.diffAdd(i, this),
                    i = i.dbl()) : (i = r.diffAdd(i, this),
                    r = r.dbl());
                return i
            }
            ,
            Point.prototype.mulAdd = function() {
                throw new Error("Not supported on Montgomery curve")
            }
            ,
            Point.prototype.jumlAdd = function() {
                throw new Error("Not supported on Montgomery curve")
            }
            ,
            Point.prototype.eq = function(e) {
                return 0 === this.getX().cmp(e.getX())
            }
            ,
            Point.prototype.normalize = function() {
                return this.x = this.x.redMul(this.z.redInvm()),
                this.z = this.curve.one,
                this
            }
            ,
            Point.prototype.getX = function() {
                return this.normalize(),
                this.x.fromRed()
            }
        }
        , {
            "../utils": 30,
            "./base": 17,
            "bn.js": 6,
            inherits: 46
        }],
        21: [function(e, t, r) {
            "use strict";
            var i = e("../utils")
              , n = e("bn.js")
              , s = e("inherits")
              , o = e("./base")
              , a = i.assert;
            function f(e) {
                o.call(this, "short", e),
                this.a = new n(e.a,16).toRed(this.red),
                this.b = new n(e.b,16).toRed(this.red),
                this.tinv = this.two.redInvm(),
                this.zeroA = 0 === this.a.fromRed().cmpn(0),
                this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3),
                this.endo = this._getEndomorphism(e),
                this._endoWnafT1 = new Array(4),
                this._endoWnafT2 = new Array(4)
            }
            function Point(e, t, r, i) {
                o.BasePoint.call(this, e, "affine"),
                null === t && null === r ? (this.x = null,
                this.y = null,
                this.inf = !0) : (this.x = new n(t,16),
                this.y = new n(r,16),
                i && (this.x.forceRed(this.curve.red),
                this.y.forceRed(this.curve.red)),
                this.x.red || (this.x = this.x.toRed(this.curve.red)),
                this.y.red || (this.y = this.y.toRed(this.curve.red)),
                this.inf = !1)
            }
            function u(e, t, r, i) {
                o.BasePoint.call(this, e, "jacobian"),
                null === t && null === r && null === i ? (this.x = this.curve.one,
                this.y = this.curve.one,
                this.z = new n(0)) : (this.x = new n(t,16),
                this.y = new n(r,16),
                this.z = new n(i,16)),
                this.x.red || (this.x = this.x.toRed(this.curve.red)),
                this.y.red || (this.y = this.y.toRed(this.curve.red)),
                this.z.red || (this.z = this.z.toRed(this.curve.red)),
                this.zOne = this.z === this.curve.one
            }
            s(f, o),
            t.exports = f,
            f.prototype._getEndomorphism = function(e) {
                if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
                    var t, r;
                    if (e.beta)
                        t = new n(e.beta,16).toRed(this.red);
                    else {
                        var i = this._getEndoRoots(this.p);
                        t = (t = i[0].cmp(i[1]) < 0 ? i[0] : i[1]).toRed(this.red)
                    }
                    if (e.lambda)
                        r = new n(e.lambda,16);
                    else {
                        var s = this._getEndoRoots(this.n);
                        0 === this.g.mul(s[0]).x.cmp(this.g.x.redMul(t)) ? r = s[0] : (r = s[1],
                        a(0 === this.g.mul(r).x.cmp(this.g.x.redMul(t))))
                    }
                    return {
                        beta: t,
                        lambda: r,
                        basis: e.basis ? e.basis.map(function(e) {
                            return {
                                a: new n(e.a,16),
                                b: new n(e.b,16)
                            }
                        }) : this._getEndoBasis(r)
                    }
                }
            }
            ,
            f.prototype._getEndoRoots = function(e) {
                var t = e === this.p ? this.red : n.mont(e)
                  , r = new n(2).toRed(t).redInvm()
                  , i = r.redNeg()
                  , s = new n(3).toRed(t).redNeg().redSqrt().redMul(r);
                return [i.redAdd(s).fromRed(), i.redSub(s).fromRed()]
            }
            ,
            f.prototype._getEndoBasis = function(e) {
                for (var t, r, i, s, o, a, f, u, c, h = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), d = e, l = this.n.clone(), p = new n(1), b = new n(0), m = new n(0), y = new n(1), g = 0; 0 !== d.cmpn(0); ) {
                    var v = l.div(d);
                    u = l.sub(v.mul(d)),
                    c = m.sub(v.mul(p));
                    var w = y.sub(v.mul(b));
                    if (!i && u.cmp(h) < 0)
                        t = f.neg(),
                        r = p,
                        i = u.neg(),
                        s = c;
                    else if (i && 2 == ++g)
                        break;
                    f = u,
                    l = d,
                    d = u,
                    m = p,
                    p = c,
                    y = b,
                    b = w
                }
                o = u.neg(),
                a = c;
                var _ = i.sqr().add(s.sqr());
                return o.sqr().add(a.sqr()).cmp(_) >= 0 && (o = t,
                a = r),
                i.negative && (i = i.neg(),
                s = s.neg()),
                o.negative && (o = o.neg(),
                a = a.neg()),
                [{
                    a: i,
                    b: s
                }, {
                    a: o,
                    b: a
                }]
            }
            ,
            f.prototype._endoSplit = function(e) {
                var t = this.endo.basis
                  , r = t[0]
                  , i = t[1]
                  , n = i.b.mul(e).divRound(this.n)
                  , s = r.b.neg().mul(e).divRound(this.n)
                  , o = n.mul(r.a)
                  , a = s.mul(i.a)
                  , f = n.mul(r.b)
                  , u = s.mul(i.b);
                return {
                    k1: e.sub(o).sub(a),
                    k2: f.add(u).neg()
                }
            }
            ,
            f.prototype.pointFromX = function(e, t) {
                (e = new n(e,16)).red || (e = e.toRed(this.red));
                var r = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b)
                  , i = r.redSqrt();
                if (0 !== i.redSqr().redSub(r).cmp(this.zero))
                    throw new Error("invalid point");
                var s = i.fromRed().isOdd();
                return (t && !s || !t && s) && (i = i.redNeg()),
                this.point(e, i)
            }
            ,
            f.prototype.validate = function(e) {
                if (e.inf)
                    return !0;
                var t = e.x
                  , r = e.y
                  , i = this.a.redMul(t)
                  , n = t.redSqr().redMul(t).redIAdd(i).redIAdd(this.b);
                return 0 === r.redSqr().redISub(n).cmpn(0)
            }
            ,
            f.prototype._endoWnafMulAdd = function(e, t, r) {
                for (var i = this._endoWnafT1, n = this._endoWnafT2, s = 0; s < e.length; s++) {
                    var o = this._endoSplit(t[s])
                      , a = e[s]
                      , f = a._getBeta();
                    o.k1.negative && (o.k1.ineg(),
                    a = a.neg(!0)),
                    o.k2.negative && (o.k2.ineg(),
                    f = f.neg(!0)),
                    i[2 * s] = a,
                    i[2 * s + 1] = f,
                    n[2 * s] = o.k1,
                    n[2 * s + 1] = o.k2
                }
                for (var u = this._wnafMulAdd(1, i, n, 2 * s, r), c = 0; c < 2 * s; c++)
                    i[c] = null,
                    n[c] = null;
                return u
            }
            ,
            s(Point, o.BasePoint),
            f.prototype.point = function(e, t, r) {
                return new Point(this,e,t,r)
            }
            ,
            f.prototype.pointFromJSON = function(e, t) {
                return Point.fromJSON(this, e, t)
            }
            ,
            Point.prototype._getBeta = function() {
                if (this.curve.endo) {
                    var e = this.precomputed;
                    if (e && e.beta)
                        return e.beta;
                    var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
                    if (e) {
                        var r = this.curve
                          , i = function(e) {
                            return r.point(e.x.redMul(r.endo.beta), e.y)
                        };
                        e.beta = t,
                        t.precomputed = {
                            beta: null,
                            naf: e.naf && {
                                wnd: e.naf.wnd,
                                points: e.naf.points.map(i)
                            },
                            doubles: e.doubles && {
                                step: e.doubles.step,
                                points: e.doubles.points.map(i)
                            }
                        }
                    }
                    return t
                }
            }
            ,
            Point.prototype.toJSON = function() {
                return this.precomputed ? [this.x, this.y, this.precomputed && {
                    doubles: this.precomputed.doubles && {
                        step: this.precomputed.doubles.step,
                        points: this.precomputed.doubles.points.slice(1)
                    },
                    naf: this.precomputed.naf && {
                        wnd: this.precomputed.naf.wnd,
                        points: this.precomputed.naf.points.slice(1)
                    }
                }] : [this.x, this.y]
            }
            ,
            Point.fromJSON = function(e, t, r) {
                "string" == typeof t && (t = JSON.parse(t));
                var i = e.point(t[0], t[1], r);
                if (!t[2])
                    return i;
                function n(t) {
                    return e.point(t[0], t[1], r)
                }
                var s = t[2];
                return i.precomputed = {
                    beta: null,
                    doubles: s.doubles && {
                        step: s.doubles.step,
                        points: [i].concat(s.doubles.points.map(n))
                    },
                    naf: s.naf && {
                        wnd: s.naf.wnd,
                        points: [i].concat(s.naf.points.map(n))
                    }
                },
                i
            }
            ,
            Point.prototype.inspect = function() {
                return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">"
            }
            ,
            Point.prototype.isInfinity = function() {
                return this.inf
            }
            ,
            Point.prototype.add = function(e) {
                if (this.inf)
                    return e;
                if (e.inf)
                    return this;
                if (this.eq(e))
                    return this.dbl();
                if (this.neg().eq(e))
                    return this.curve.point(null, null);
                if (0 === this.x.cmp(e.x))
                    return this.curve.point(null, null);
                var t = this.y.redSub(e.y);
                0 !== t.cmpn(0) && (t = t.redMul(this.x.redSub(e.x).redInvm()));
                var r = t.redSqr().redISub(this.x).redISub(e.x)
                  , i = t.redMul(this.x.redSub(r)).redISub(this.y);
                return this.curve.point(r, i)
            }
            ,
            Point.prototype.dbl = function() {
                if (this.inf)
                    return this;
                var e = this.y.redAdd(this.y);
                if (0 === e.cmpn(0))
                    return this.curve.point(null, null);
                var t = this.curve.a
                  , r = this.x.redSqr()
                  , i = e.redInvm()
                  , n = r.redAdd(r).redIAdd(r).redIAdd(t).redMul(i)
                  , s = n.redSqr().redISub(this.x.redAdd(this.x))
                  , o = n.redMul(this.x.redSub(s)).redISub(this.y);
                return this.curve.point(s, o)
            }
            ,
            Point.prototype.getX = function() {
                return this.x.fromRed()
            }
            ,
            Point.prototype.getY = function() {
                return this.y.fromRed()
            }
            ,
            Point.prototype.mul = function(e) {
                return e = new n(e,16),
                this.isInfinity() ? this : this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [e]) : this.curve._wnafMul(this, e)
            }
            ,
            Point.prototype.mulAdd = function(e, t, r) {
                var i = [this, t]
                  , n = [e, r];
                return this.curve.endo ? this.curve._endoWnafMulAdd(i, n) : this.curve._wnafMulAdd(1, i, n, 2)
            }
            ,
            Point.prototype.jmulAdd = function(e, t, r) {
                var i = [this, t]
                  , n = [e, r];
                return this.curve.endo ? this.curve._endoWnafMulAdd(i, n, !0) : this.curve._wnafMulAdd(1, i, n, 2, !0)
            }
            ,
            Point.prototype.eq = function(e) {
                return this === e || this.inf === e.inf && (this.inf || 0 === this.x.cmp(e.x) && 0 === this.y.cmp(e.y))
            }
            ,
            Point.prototype.neg = function(e) {
                if (this.inf)
                    return this;
                var t = this.curve.point(this.x, this.y.redNeg());
                if (e && this.precomputed) {
                    var r = this.precomputed
                      , i = function(e) {
                        return e.neg()
                    };
                    t.precomputed = {
                        naf: r.naf && {
                            wnd: r.naf.wnd,
                            points: r.naf.points.map(i)
                        },
                        doubles: r.doubles && {
                            step: r.doubles.step,
                            points: r.doubles.points.map(i)
                        }
                    }
                }
                return t
            }
            ,
            Point.prototype.toJ = function() {
                return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one)
            }
            ,
            s(u, o.BasePoint),
            f.prototype.jpoint = function(e, t, r) {
                return new u(this,e,t,r)
            }
            ,
            u.prototype.toP = function() {
                if (this.isInfinity())
                    return this.curve.point(null, null);
                var e = this.z.redInvm()
                  , t = e.redSqr()
                  , r = this.x.redMul(t)
                  , i = this.y.redMul(t).redMul(e);
                return this.curve.point(r, i)
            }
            ,
            u.prototype.neg = function() {
                return this.curve.jpoint(this.x, this.y.redNeg(), this.z)
            }
            ,
            u.prototype.add = function(e) {
                if (this.isInfinity())
                    return e;
                if (e.isInfinity())
                    return this;
                var t = e.z.redSqr()
                  , r = this.z.redSqr()
                  , i = this.x.redMul(t)
                  , n = e.x.redMul(r)
                  , s = this.y.redMul(t.redMul(e.z))
                  , o = e.y.redMul(r.redMul(this.z))
                  , a = i.redSub(n)
                  , f = s.redSub(o);
                if (0 === a.cmpn(0))
                    return 0 !== f.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
                var u = a.redSqr()
                  , c = u.redMul(a)
                  , h = i.redMul(u)
                  , d = f.redSqr().redIAdd(c).redISub(h).redISub(h)
                  , l = f.redMul(h.redISub(d)).redISub(s.redMul(c))
                  , p = this.z.redMul(e.z).redMul(a);
                return this.curve.jpoint(d, l, p)
            }
            ,
            u.prototype.mixedAdd = function(e) {
                if (this.isInfinity())
                    return e.toJ();
                if (e.isInfinity())
                    return this;
                var t = this.z.redSqr()
                  , r = this.x
                  , i = e.x.redMul(t)
                  , n = this.y
                  , s = e.y.redMul(t).redMul(this.z)
                  , o = r.redSub(i)
                  , a = n.redSub(s);
                if (0 === o.cmpn(0))
                    return 0 !== a.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
                var f = o.redSqr()
                  , u = f.redMul(o)
                  , c = r.redMul(f)
                  , h = a.redSqr().redIAdd(u).redISub(c).redISub(c)
                  , d = a.redMul(c.redISub(h)).redISub(n.redMul(u))
                  , l = this.z.redMul(o);
                return this.curve.jpoint(h, d, l)
            }
            ,
            u.prototype.dblp = function(e) {
                if (0 === e)
                    return this;
                if (this.isInfinity())
                    return this;
                if (!e)
                    return this.dbl();
                if (this.curve.zeroA || this.curve.threeA) {
                    for (var t = this, r = 0; r < e; r++)
                        t = t.dbl();
                    return t
                }
                var i = this.curve.a
                  , n = this.curve.tinv
                  , s = this.x
                  , o = this.y
                  , a = this.z
                  , f = a.redSqr().redSqr()
                  , u = o.redAdd(o);
                for (r = 0; r < e; r++) {
                    var c = s.redSqr()
                      , h = u.redSqr()
                      , d = h.redSqr()
                      , l = c.redAdd(c).redIAdd(c).redIAdd(i.redMul(f))
                      , p = s.redMul(h)
                      , b = l.redSqr().redISub(p.redAdd(p))
                      , m = p.redISub(b)
                      , y = l.redMul(m);
                    y = y.redIAdd(y).redISub(d);
                    var g = u.redMul(a);
                    r + 1 < e && (f = f.redMul(d)),
                    s = b,
                    a = g,
                    u = y
                }
                return this.curve.jpoint(s, u.redMul(n), a)
            }
            ,
            u.prototype.dbl = function() {
                return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl()
            }
            ,
            u.prototype._zeroDbl = function() {
                var e, t, r;
                if (this.zOne) {
                    var i = this.x.redSqr()
                      , n = this.y.redSqr()
                      , s = n.redSqr()
                      , o = this.x.redAdd(n).redSqr().redISub(i).redISub(s);
                    o = o.redIAdd(o);
                    var a = i.redAdd(i).redIAdd(i)
                      , f = a.redSqr().redISub(o).redISub(o)
                      , u = s.redIAdd(s);
                    u = (u = u.redIAdd(u)).redIAdd(u),
                    e = f,
                    t = a.redMul(o.redISub(f)).redISub(u),
                    r = this.y.redAdd(this.y)
                } else {
                    var c = this.x.redSqr()
                      , h = this.y.redSqr()
                      , d = h.redSqr()
                      , l = this.x.redAdd(h).redSqr().redISub(c).redISub(d);
                    l = l.redIAdd(l);
                    var p = c.redAdd(c).redIAdd(c)
                      , b = p.redSqr()
                      , m = d.redIAdd(d);
                    m = (m = m.redIAdd(m)).redIAdd(m),
                    e = b.redISub(l).redISub(l),
                    t = p.redMul(l.redISub(e)).redISub(m),
                    r = (r = this.y.redMul(this.z)).redIAdd(r)
                }
                return this.curve.jpoint(e, t, r)
            }
            ,
            u.prototype._threeDbl = function() {
                var e, t, r;
                if (this.zOne) {
                    var i = this.x.redSqr()
                      , n = this.y.redSqr()
                      , s = n.redSqr()
                      , o = this.x.redAdd(n).redSqr().redISub(i).redISub(s);
                    o = o.redIAdd(o);
                    var a = i.redAdd(i).redIAdd(i).redIAdd(this.curve.a)
                      , f = a.redSqr().redISub(o).redISub(o);
                    e = f;
                    var u = s.redIAdd(s);
                    u = (u = u.redIAdd(u)).redIAdd(u),
                    t = a.redMul(o.redISub(f)).redISub(u),
                    r = this.y.redAdd(this.y)
                } else {
                    var c = this.z.redSqr()
                      , h = this.y.redSqr()
                      , d = this.x.redMul(h)
                      , l = this.x.redSub(c).redMul(this.x.redAdd(c));
                    l = l.redAdd(l).redIAdd(l);
                    var p = d.redIAdd(d)
                      , b = (p = p.redIAdd(p)).redAdd(p);
                    e = l.redSqr().redISub(b),
                    r = this.y.redAdd(this.z).redSqr().redISub(h).redISub(c);
                    var m = h.redSqr();
                    m = (m = (m = m.redIAdd(m)).redIAdd(m)).redIAdd(m),
                    t = l.redMul(p.redISub(e)).redISub(m)
                }
                return this.curve.jpoint(e, t, r)
            }
            ,
            u.prototype._dbl = function() {
                var e = this.curve.a
                  , t = this.x
                  , r = this.y
                  , i = this.z
                  , n = i.redSqr().redSqr()
                  , s = t.redSqr()
                  , o = r.redSqr()
                  , a = s.redAdd(s).redIAdd(s).redIAdd(e.redMul(n))
                  , f = t.redAdd(t)
                  , u = (f = f.redIAdd(f)).redMul(o)
                  , c = a.redSqr().redISub(u.redAdd(u))
                  , h = u.redISub(c)
                  , d = o.redSqr();
                d = (d = (d = d.redIAdd(d)).redIAdd(d)).redIAdd(d);
                var l = a.redMul(h).redISub(d)
                  , p = r.redAdd(r).redMul(i);
                return this.curve.jpoint(c, l, p)
            }
            ,
            u.prototype.trpl = function() {
                if (!this.curve.zeroA)
                    return this.dbl().add(this);
                var e = this.x.redSqr()
                  , t = this.y.redSqr()
                  , r = this.z.redSqr()
                  , i = t.redSqr()
                  , n = e.redAdd(e).redIAdd(e)
                  , s = n.redSqr()
                  , o = this.x.redAdd(t).redSqr().redISub(e).redISub(i)
                  , a = (o = (o = (o = o.redIAdd(o)).redAdd(o).redIAdd(o)).redISub(s)).redSqr()
                  , f = i.redIAdd(i);
                f = (f = (f = f.redIAdd(f)).redIAdd(f)).redIAdd(f);
                var u = n.redIAdd(o).redSqr().redISub(s).redISub(a).redISub(f)
                  , c = t.redMul(u);
                c = (c = c.redIAdd(c)).redIAdd(c);
                var h = this.x.redMul(a).redISub(c);
                h = (h = h.redIAdd(h)).redIAdd(h);
                var d = this.y.redMul(u.redMul(f.redISub(u)).redISub(o.redMul(a)));
                d = (d = (d = d.redIAdd(d)).redIAdd(d)).redIAdd(d);
                var l = this.z.redAdd(o).redSqr().redISub(r).redISub(a);
                return this.curve.jpoint(h, d, l)
            }
            ,
            u.prototype.mul = function(e, t) {
                return e = new n(e,t),
                this.curve._wnafMul(this, e)
            }
            ,
            u.prototype.eq = function(e) {
                if ("affine" === e.type)
                    return this.eq(e.toJ());
                if (this === e)
                    return !0;
                var t = this.z.redSqr()
                  , r = e.z.redSqr();
                if (0 !== this.x.redMul(r).redISub(e.x.redMul(t)).cmpn(0))
                    return !1;
                var i = t.redMul(this.z)
                  , n = r.redMul(e.z);
                return 0 === this.y.redMul(n).redISub(e.y.redMul(i)).cmpn(0)
            }
            ,
            u.prototype.eqXToP = function(e) {
                var t = this.z.redSqr()
                  , r = e.toRed(this.curve.red).redMul(t);
                if (0 === this.x.cmp(r))
                    return !0;
                for (var i = e.clone(), n = this.curve.redN.redMul(t); ; ) {
                    if (i.iadd(this.curve.n),
                    i.cmp(this.curve.p) >= 0)
                        return !1;
                    if (r.redIAdd(n),
                    0 === this.x.cmp(r))
                        return !0
                }
            }
            ,
            u.prototype.inspect = function() {
                return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"
            }
            ,
            u.prototype.isInfinity = function() {
                return 0 === this.z.cmpn(0)
            }
        }
        , {
            "../utils": 30,
            "./base": 17,
            "bn.js": 6,
            inherits: 46
        }],
        22: [function(e, t, r) {
            "use strict";
            var i, n = r, s = e("hash.js"), o = e("./curve"), a = e("./utils").assert;
            function f(e) {
                "short" === e.type ? this.curve = new o.short(e) : "edwards" === e.type ? this.curve = new o.edwards(e) : this.curve = new o.mont(e),
                this.g = this.curve.g,
                this.n = this.curve.n,
                this.hash = e.hash,
                a(this.g.validate(), "Invalid curve"),
                a(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O")
            }
            function u(e, t) {
                Object.defineProperty(n, e, {
                    configurable: !0,
                    enumerable: !0,
                    get: function() {
                        var r = new f(t);
                        return Object.defineProperty(n, e, {
                            configurable: !0,
                            enumerable: !0,
                            value: r
                        }),
                        r
                    }
                })
            }
            n.PresetCurve = f,
            u("p192", {
                type: "short",
                prime: "p192",
                p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
                a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
                b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
                n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
                hash: s.sha256,
                gRed: !1,
                g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]
            }),
            u("p224", {
                type: "short",
                prime: "p224",
                p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
                a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
                b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
                n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
                hash: s.sha256,
                gRed: !1,
                g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]
            }),
            u("p256", {
                type: "short",
                prime: null,
                p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
                a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
                b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
                n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
                hash: s.sha256,
                gRed: !1,
                g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]
            }),
            u("p384", {
                type: "short",
                prime: null,
                p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
                a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
                b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
                n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
                hash: s.sha384,
                gRed: !1,
                g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]
            }),
            u("p521", {
                type: "short",
                prime: null,
                p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
                a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
                b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
                n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
                hash: s.sha512,
                gRed: !1,
                g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]
            }),
            u("curve25519", {
                type: "mont",
                prime: "p25519",
                p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
                a: "76d06",
                b: "1",
                n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
                hash: s.sha256,
                gRed: !1,
                g: ["9"]
            }),
            u("ed25519", {
                type: "edwards",
                prime: "p25519",
                p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
                a: "-1",
                c: "1",
                d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
                n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
                hash: s.sha256,
                gRed: !1,
                g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"]
            });
            try {
                i = e("./precomputed/secp256k1")
            } catch (e) {
                i = void 0
            }
            u("secp256k1", {
                type: "short",
                prime: "k256",
                p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
                a: "0",
                b: "7",
                n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
                h: "1",
                hash: s.sha256,
                beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
                lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
                basis: [{
                    a: "3086d221a7d46bcde86c90e49284eb15",
                    b: "-e4437ed6010e88286f547fa90abfe4c3"
                }, {
                    a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
                    b: "3086d221a7d46bcde86c90e49284eb15"
                }],
                gRed: !1,
                g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", i]
            })
        }
        , {
            "./curve": 19,
            "./precomputed/secp256k1": 29,
            "./utils": 30,
            "hash.js": 33
        }],
        23: [function(e, t, r) {
            "use strict";
            var i = e("bn.js")
              , n = e("hmac-drbg")
              , s = e("../utils")
              , o = e("../curves")
              , a = e("brorand")
              , f = s.assert
              , u = e("./key")
              , c = e("./signature");
            function h(e) {
                if (!(this instanceof h))
                    return new h(e);
                "string" == typeof e && (f(o.hasOwnProperty(e), "Unknown curve " + e),
                e = o[e]),
                e instanceof o.PresetCurve && (e = {
                    curve: e
                }),
                this.curve = e.curve.curve,
                this.n = this.curve.n,
                this.nh = this.n.ushrn(1),
                this.g = this.curve.g,
                this.g = e.curve.g,
                this.g.precompute(e.curve.n.bitLength() + 1),
                this.hash = e.hash || e.curve.hash
            }
            t.exports = h,
            h.prototype.keyPair = function(e) {
                return new u(this,e)
            }
            ,
            h.prototype.keyFromPrivate = function(e, t) {
                return u.fromPrivate(this, e, t)
            }
            ,
            h.prototype.keyFromPublic = function(e, t) {
                return u.fromPublic(this, e, t)
            }
            ,
            h.prototype.genKeyPair = function(e) {
                e || (e = {});
                for (var t = new n({
                    hash: this.hash,
                    pers: e.pers,
                    persEnc: e.persEnc || "utf8",
                    entropy: e.entropy || a(this.hash.hmacStrength),
                    entropyEnc: e.entropy && e.entropyEnc || "utf8",
                    nonce: this.n.toArray()
                }), r = this.n.byteLength(), s = this.n.sub(new i(2)); ; ) {
                    var o = new i(t.generate(r));
                    if (!(o.cmp(s) > 0))
                        return o.iaddn(1),
                        this.keyFromPrivate(o)
                }
            }
            ,
            h.prototype._truncateToN = function(e, t) {
                var r = 8 * e.byteLength() - this.n.bitLength();
                return r > 0 && (e = e.ushrn(r)),
                !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e
            }
            ,
            h.prototype.sign = function(e, t, r, s) {
                "object" == typeof r && (s = r,
                r = null),
                s || (s = {}),
                t = this.keyFromPrivate(t, r),
                e = this._truncateToN(new i(e,16));
                for (var o = this.n.byteLength(), a = t.getPrivate().toArray("be", o), f = e.toArray("be", o), u = new n({
                    hash: this.hash,
                    entropy: a,
                    nonce: f,
                    pers: s.pers,
                    persEnc: s.persEnc || "utf8"
                }), h = this.n.sub(new i(1)), d = 0; ; d++) {
                    var l = s.k ? s.k(d) : new i(u.generate(this.n.byteLength()));
                    if (!((l = this._truncateToN(l, !0)).cmpn(1) <= 0 || l.cmp(h) >= 0)) {
                        var p = this.g.mul(l);
                        if (!p.isInfinity()) {
                            var b = p.getX()
                              , m = b.umod(this.n);
                            if (0 !== m.cmpn(0)) {
                                var y = l.invm(this.n).mul(m.mul(t.getPrivate()).iadd(e));
                                if (0 !== (y = y.umod(this.n)).cmpn(0)) {
                                    var g = (p.getY().isOdd() ? 1 : 0) | (0 !== b.cmp(m) ? 2 : 0);
                                    return s.canonical && y.cmp(this.nh) > 0 && (y = this.n.sub(y),
                                    g ^= 1),
                                    new c({
                                        r: m,
                                        s: y,
                                        recoveryParam: g
                                    })
                                }
                            }
                        }
                    }
                }
            }
            ,
            h.prototype.verify = function(e, t, r, n) {
                e = this._truncateToN(new i(e,16)),
                r = this.keyFromPublic(r, n);
                var s = (t = new c(t,"hex")).r
                  , o = t.s;
                if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
                    return !1;
                if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0)
                    return !1;
                var a, f = o.invm(this.n), u = f.mul(e).umod(this.n), h = f.mul(s).umod(this.n);
                return this.curve._maxwellTrick ? !(a = this.g.jmulAdd(u, r.getPublic(), h)).isInfinity() && a.eqXToP(s) : !(a = this.g.mulAdd(u, r.getPublic(), h)).isInfinity() && 0 === a.getX().umod(this.n).cmp(s)
            }
            ,
            h.prototype.recoverPubKey = function(e, t, r, n) {
                f((3 & r) === r, "The recovery param is more than two bits"),
                t = new c(t,n);
                var s = this.n
                  , o = new i(e)
                  , a = t.r
                  , u = t.s
                  , h = 1 & r
                  , d = r >> 1;
                if (a.cmp(this.curve.p.umod(this.curve.n)) >= 0 && d)
                    throw new Error("Unable to find sencond key candinate");
                a = d ? this.curve.pointFromX(a.add(this.curve.n), h) : this.curve.pointFromX(a, h);
                var l = t.r.invm(s)
                  , p = s.sub(o).mul(l).umod(s)
                  , b = u.mul(l).umod(s);
                return this.g.mulAdd(p, a, b)
            }
            ,
            h.prototype.getKeyRecoveryParam = function(e, t, r, i) {
                if (null !== (t = new c(t,i)).recoveryParam)
                    return t.recoveryParam;
                for (var n = 0; n < 4; n++) {
                    var s;
                    try {
                        s = this.recoverPubKey(e, t, n)
                    } catch (e) {
                        continue
                    }
                    if (s.eq(r))
                        return n
                }
                throw new Error("Unable to find valid recovery factor")
            }
        }
        , {
            "../curves": 22,
            "../utils": 30,
            "./key": 24,
            "./signature": 25,
            "bn.js": 6,
            brorand: 7,
            "hmac-drbg": 45
        }],
        24: [function(e, t, r) {
            "use strict";
            var i = e("bn.js")
              , n = e("../utils").assert;
            function s(e, t) {
                this.ec = e,
                this.priv = null,
                this.pub = null,
                t.priv && this._importPrivate(t.priv, t.privEnc),
                t.pub && this._importPublic(t.pub, t.pubEnc)
            }
            t.exports = s,
            s.fromPublic = function(e, t, r) {
                return t instanceof s ? t : new s(e,{
                    pub: t,
                    pubEnc: r
                })
            }
            ,
            s.fromPrivate = function(e, t, r) {
                return t instanceof s ? t : new s(e,{
                    priv: t,
                    privEnc: r
                })
            }
            ,
            s.prototype.validate = function() {
                var e = this.getPublic();
                return e.isInfinity() ? {
                    result: !1,
                    reason: "Invalid public key"
                } : e.validate() ? e.mul(this.ec.curve.n).isInfinity() ? {
                    result: !0,
                    reason: null
                } : {
                    result: !1,
                    reason: "Public key * N != O"
                } : {
                    result: !1,
                    reason: "Public key is not a point"
                }
            }
            ,
            s.prototype.getPublic = function(e, t) {
                return "string" == typeof e && (t = e,
                e = null),
                this.pub || (this.pub = this.ec.g.mul(this.priv)),
                t ? this.pub.encode(t, e) : this.pub
            }
            ,
            s.prototype.getPrivate = function(e) {
                return "hex" === e ? this.priv.toString(16, 2) : this.priv
            }
            ,
            s.prototype._importPrivate = function(e, t) {
                this.priv = new i(e,t || 16),
                this.priv = this.priv.umod(this.ec.curve.n)
            }
            ,
            s.prototype._importPublic = function(e, t) {
                if (e.x || e.y)
                    return "mont" === this.ec.curve.type ? n(e.x, "Need x coordinate") : "short" !== this.ec.curve.type && "edwards" !== this.ec.curve.type || n(e.x && e.y, "Need both x and y coordinate"),
                    void (this.pub = this.ec.curve.point(e.x, e.y));
                this.pub = this.ec.curve.decodePoint(e, t)
            }
            ,
            s.prototype.derive = function(e) {
                return e.mul(this.priv).getX()
            }
            ,
            s.prototype.sign = function(e, t, r) {
                return this.ec.sign(e, this, t, r)
            }
            ,
            s.prototype.verify = function(e, t) {
                return this.ec.verify(e, t, this)
            }
            ,
            s.prototype.inspect = function() {
                return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >"
            }
        }
        , {
            "../utils": 30,
            "bn.js": 6
        }],
        25: [function(e, t, r) {
            "use strict";
            var i = e("bn.js")
              , n = e("../utils")
              , s = n.assert;
            function o(e, t) {
                if (e instanceof o)
                    return e;
                this._importDER(e, t) || (s(e.r && e.s, "Signature without r or s"),
                this.r = new i(e.r,16),
                this.s = new i(e.s,16),
                void 0 === e.recoveryParam ? this.recoveryParam = null : this.recoveryParam = e.recoveryParam)
            }
            function a(e, t) {
                var r = e[t.place++];
                if (!(128 & r))
                    return r;
                for (var i = 15 & r, n = 0, s = 0, o = t.place; s < i; s++,
                o++)
                    n <<= 8,
                    n |= e[o];
                return t.place = o,
                n
            }
            function f(e) {
                for (var t = 0, r = e.length - 1; !e[t] && !(128 & e[t + 1]) && t < r; )
                    t++;
                return 0 === t ? e : e.slice(t)
            }
            function u(e, t) {
                if (t < 128)
                    e.push(t);
                else {
                    var r = 1 + (Math.log(t) / Math.LN2 >>> 3);
                    for (e.push(128 | r); --r; )
                        e.push(t >>> (r << 3) & 255);
                    e.push(t)
                }
            }
            t.exports = o,
            o.prototype._importDER = function(e, t) {
                e = n.toArray(e, t);
                var r = new function() {
                    this.place = 0
                }
                ;
                if (48 !== e[r.place++])
                    return !1;
                if (a(e, r) + r.place !== e.length)
                    return !1;
                if (2 !== e[r.place++])
                    return !1;
                var s = a(e, r)
                  , o = e.slice(r.place, s + r.place);
                if (r.place += s,
                2 !== e[r.place++])
                    return !1;
                var f = a(e, r);
                if (e.length !== f + r.place)
                    return !1;
                var u = e.slice(r.place, f + r.place);
                return 0 === o[0] && 128 & o[1] && (o = o.slice(1)),
                0 === u[0] && 128 & u[1] && (u = u.slice(1)),
                this.r = new i(o),
                this.s = new i(u),
                this.recoveryParam = null,
                !0
            }
            ,
            o.prototype.toDER = function(e) {
                var t = this.r.toArray()
                  , r = this.s.toArray();
                for (128 & t[0] && (t = [0].concat(t)),
                128 & r[0] && (r = [0].concat(r)),
                t = f(t),
                r = f(r); !(r[0] || 128 & r[1]); )
                    r = r.slice(1);
                var i = [2];
                u(i, t.length),
                (i = i.concat(t)).push(2),
                u(i, r.length);
                var s = i.concat(r)
                  , o = [48];
                return u(o, s.length),
                o = o.concat(s),
                n.encode(o, e)
            }
        }
        , {
            "../utils": 30,
            "bn.js": 6
        }],
        26: [function(e, t, r) {
            "use strict";
            var i = e("hash.js")
              , n = e("../curves")
              , s = e("../utils")
              , o = s.assert
              , a = s.parseBytes
              , f = e("./key")
              , u = e("./signature");
            function c(e) {
                if (o("ed25519" === e, "only tested with ed25519 so far"),
                !(this instanceof c))
                    return new c(e);
                e = n[e].curve;
                this.curve = e,
                this.g = e.g,
                this.g.precompute(e.n.bitLength() + 1),
                this.pointClass = e.point().constructor,
                this.encodingLength = Math.ceil(e.n.bitLength() / 8),
                this.hash = i.sha512
            }
            t.exports = c,
            c.prototype.sign = function(e, t) {
                e = a(e);
                var r = this.keyFromSecret(t)
                  , i = this.hashInt(r.messagePrefix(), e)
                  , n = this.g.mul(i)
                  , s = this.encodePoint(n)
                  , o = this.hashInt(s, r.pubBytes(), e).mul(r.priv())
                  , f = i.add(o).umod(this.curve.n);
                return this.makeSignature({
                    R: n,
                    S: f,
                    Rencoded: s
                })
            }
            ,
            c.prototype.verify = function(e, t, r) {
                e = a(e),
                t = this.makeSignature(t);
                var i = this.keyFromPublic(r)
                  , n = this.hashInt(t.Rencoded(), i.pubBytes(), e)
                  , s = this.g.mul(t.S());
                return t.R().add(i.pub().mul(n)).eq(s)
            }
            ,
            c.prototype.hashInt = function() {
                for (var e = this.hash(), t = 0; t < arguments.length; t++)
                    e.update(arguments[t]);
                return s.intFromLE(e.digest()).umod(this.curve.n)
            }
            ,
            c.prototype.keyFromPublic = function(e) {
                return f.fromPublic(this, e)
            }
            ,
            c.prototype.keyFromSecret = function(e) {
                return f.fromSecret(this, e)
            }
            ,
            c.prototype.makeSignature = function(e) {
                return e instanceof u ? e : new u(this,e)
            }
            ,
            c.prototype.encodePoint = function(e) {
                var t = e.getY().toArray("le", this.encodingLength);
                return t[this.encodingLength - 1] |= e.getX().isOdd() ? 128 : 0,
                t
            }
            ,
            c.prototype.decodePoint = function(e) {
                var t = (e = s.parseBytes(e)).length - 1
                  , r = e.slice(0, t).concat(-129 & e[t])
                  , i = 0 != (128 & e[t])
                  , n = s.intFromLE(r);
                return this.curve.pointFromY(n, i)
            }
            ,
            c.prototype.encodeInt = function(e) {
                return e.toArray("le", this.encodingLength)
            }
            ,
            c.prototype.decodeInt = function(e) {
                return s.intFromLE(e)
            }
            ,
            c.prototype.isPoint = function(e) {
                return e instanceof this.pointClass
            }
        }
        , {
            "../curves": 22,
            "../utils": 30,
            "./key": 27,
            "./signature": 28,
            "hash.js": 33
        }],
        27: [function(e, t, r) {
            "use strict";
            var i = e("../utils")
              , n = i.assert
              , s = i.parseBytes
              , o = i.cachedProperty;
            function a(e, t) {
                this.eddsa = e,
                this._secret = s(t.secret),
                e.isPoint(t.pub) ? this._pub = t.pub : this._pubBytes = s(t.pub)
            }
            a.fromPublic = function(e, t) {
                return t instanceof a ? t : new a(e,{
                    pub: t
                })
            }
            ,
            a.fromSecret = function(e, t) {
                return t instanceof a ? t : new a(e,{
                    secret: t
                })
            }
            ,
            a.prototype.secret = function() {
                return this._secret
            }
            ,
            o(a, "pubBytes", function() {
                return this.eddsa.encodePoint(this.pub())
            }),
            o(a, "pub", function() {
                return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv())
            }),
            o(a, "privBytes", function() {
                var e = this.eddsa
                  , t = this.hash()
                  , r = e.encodingLength - 1
                  , i = t.slice(0, e.encodingLength);
                return i[0] &= 248,
                i[r] &= 127,
                i[r] |= 64,
                i
            }),
            o(a, "priv", function() {
                return this.eddsa.decodeInt(this.privBytes())
            }),
            o(a, "hash", function() {
                return this.eddsa.hash().update(this.secret()).digest()
            }),
            o(a, "messagePrefix", function() {
                return this.hash().slice(this.eddsa.encodingLength)
            }),
            a.prototype.sign = function(e) {
                return n(this._secret, "KeyPair can only verify"),
                this.eddsa.sign(e, this)
            }
            ,
            a.prototype.verify = function(e, t) {
                return this.eddsa.verify(e, t, this)
            }
            ,
            a.prototype.getSecret = function(e) {
                return n(this._secret, "KeyPair is public only"),
                i.encode(this.secret(), e)
            }
            ,
            a.prototype.getPublic = function(e) {
                return i.encode(this.pubBytes(), e)
            }
            ,
            t.exports = a
        }
        , {
            "../utils": 30
        }],
        28: [function(e, t, r) {
            "use strict";
            var i = e("bn.js")
              , n = e("../utils")
              , s = n.assert
              , o = n.cachedProperty
              , a = n.parseBytes;
            function f(e, t) {
                this.eddsa = e,
                "object" != typeof t && (t = a(t)),
                Array.isArray(t) && (t = {
                    R: t.slice(0, e.encodingLength),
                    S: t.slice(e.encodingLength)
                }),
                s(t.R && t.S, "Signature without R or S"),
                e.isPoint(t.R) && (this._R = t.R),
                t.S instanceof i && (this._S = t.S),
                this._Rencoded = Array.isArray(t.R) ? t.R : t.Rencoded,
                this._Sencoded = Array.isArray(t.S) ? t.S : t.Sencoded
            }
            o(f, "S", function() {
                return this.eddsa.decodeInt(this.Sencoded())
            }),
            o(f, "R", function() {
                return this.eddsa.decodePoint(this.Rencoded())
            }),
            o(f, "Rencoded", function() {
                return this.eddsa.encodePoint(this.R())
            }),
            o(f, "Sencoded", function() {
                return this.eddsa.encodeInt(this.S())
            }),
            f.prototype.toBytes = function() {
                return this.Rencoded().concat(this.Sencoded())
            }
            ,
            f.prototype.toHex = function() {
                return n.encode(this.toBytes(), "hex").toUpperCase()
            }
            ,
            t.exports = f
        }
        , {
            "../utils": 30,
            "bn.js": 6
        }],
        29: [function(e, t, r) {
            t.exports = {
                doubles: {
                    step: 4,
                    points: [["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a", "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"], ["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508", "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"], ["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739", "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"], ["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640", "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"], ["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c", "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"], ["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda", "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"], ["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa", "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"], ["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0", "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"], ["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d", "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"], ["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d", "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"], ["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1", "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"], ["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0", "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"], ["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047", "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"], ["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862", "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"], ["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7", "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"], ["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd", "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"], ["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83", "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"], ["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a", "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"], ["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8", "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"], ["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d", "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"], ["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725", "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"], ["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754", "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"], ["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c", "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"], ["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6", "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"], ["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39", "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"], ["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891", "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"], ["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b", "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"], ["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03", "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"], ["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d", "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"], ["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070", "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"], ["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4", "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"], ["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da", "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"], ["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11", "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"], ["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e", "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"], ["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41", "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"], ["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef", "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"], ["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8", "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"], ["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d", "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"], ["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96", "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"], ["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd", "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"], ["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5", "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"], ["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266", "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"], ["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71", "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"], ["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac", "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"], ["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751", "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"], ["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e", "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"], ["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241", "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"], ["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3", "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"], ["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f", "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"], ["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19", "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"], ["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be", "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"], ["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9", "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"], ["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2", "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"], ["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13", "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"], ["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c", "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"], ["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba", "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"], ["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151", "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"], ["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073", "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"], ["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458", "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"], ["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b", "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"], ["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366", "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"], ["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa", "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"], ["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0", "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"], ["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787", "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"], ["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e", "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]]
                },
                naf: {
                    wnd: 7,
                    points: [["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9", "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"], ["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4", "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"], ["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc", "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"], ["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe", "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"], ["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb", "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"], ["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8", "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"], ["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e", "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"], ["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34", "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"], ["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c", "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"], ["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5", "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"], ["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f", "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"], ["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714", "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"], ["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729", "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"], ["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db", "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"], ["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4", "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"], ["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5", "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"], ["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479", "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"], ["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d", "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"], ["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f", "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"], ["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb", "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"], ["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9", "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"], ["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963", "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"], ["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74", "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"], ["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530", "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"], ["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b", "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"], ["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247", "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"], ["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1", "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"], ["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120", "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"], ["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435", "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"], ["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18", "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"], ["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8", "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"], ["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb", "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"], ["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f", "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"], ["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143", "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"], ["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba", "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"], ["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45", "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"], ["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a", "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"], ["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e", "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"], ["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8", "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"], ["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c", "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"], ["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519", "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"], ["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab", "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"], ["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca", "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"], ["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf", "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"], ["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610", "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"], ["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4", "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"], ["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c", "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"], ["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940", "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"], ["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980", "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"], ["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3", "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"], ["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf", "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"], ["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63", "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"], ["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448", "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"], ["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf", "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"], ["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5", "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"], ["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6", "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"], ["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5", "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"], ["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99", "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"], ["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51", "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"], ["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5", "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"], ["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5", "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"], ["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997", "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"], ["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881", "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"], ["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5", "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"], ["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66", "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"], ["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726", "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"], ["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede", "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"], ["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94", "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"], ["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31", "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"], ["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51", "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"], ["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252", "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"], ["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5", "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"], ["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b", "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"], ["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4", "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"], ["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f", "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"], ["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889", "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"], ["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246", "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"], ["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984", "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"], ["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a", "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"], ["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030", "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"], ["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197", "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"], ["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593", "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"], ["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef", "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"], ["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38", "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"], ["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a", "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"], ["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111", "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"], ["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502", "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"], ["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea", "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"], ["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26", "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"], ["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986", "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"], ["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e", "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"], ["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4", "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"], ["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda", "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"], ["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859", "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"], ["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f", "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"], ["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c", "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"], ["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942", "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"], ["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a", "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"], ["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80", "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"], ["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d", "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"], ["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1", "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"], ["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63", "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"], ["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352", "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"], ["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193", "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"], ["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00", "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"], ["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58", "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"], ["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7", "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"], ["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8", "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"], ["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e", "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"], ["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d", "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"], ["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b", "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"], ["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f", "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"], ["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6", "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"], ["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297", "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"], ["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a", "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"], ["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c", "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"], ["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52", "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"], ["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb", "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"], ["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065", "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"], ["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917", "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"], ["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9", "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"], ["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3", "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"], ["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57", "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"], ["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66", "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"], ["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8", "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"], ["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721", "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"], ["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180", "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]]
                }
            }
        }
        , {}],
        30: [function(e, t, r) {
            "use strict";
            var i = r
              , n = e("bn.js")
              , s = e("minimalistic-assert")
              , o = e("minimalistic-crypto-utils");
            i.assert = s,
            i.toArray = o.toArray,
            i.zero2 = o.zero2,
            i.toHex = o.toHex,
            i.encode = o.encode,
            i.getNAF = function(e, t, r) {
                var i = new Array(Math.max(e.bitLength(), r) + 1);
                i.fill(0);
                for (var n = 1 << t + 1, s = e.clone(), o = 0; o < i.length; o++) {
                    var a, f = s.andln(n - 1);
                    s.isOdd() ? (a = f > (n >> 1) - 1 ? (n >> 1) - f : f,
                    s.isubn(a)) : a = 0,
                    i[o] = a,
                    s.iushrn(1)
                }
                return i
            }
            ,
            i.getJSF = function(e, t) {
                var r = [[], []];
                e = e.clone(),
                t = t.clone();
                for (var i = 0, n = 0; e.cmpn(-i) > 0 || t.cmpn(-n) > 0; ) {
                    var s, o, a, f = e.andln(3) + i & 3, u = t.andln(3) + n & 3;
                    3 === f && (f = -1),
                    3 === u && (u = -1),
                    s = 0 == (1 & f) ? 0 : 3 != (a = e.andln(7) + i & 7) && 5 !== a || 2 !== u ? f : -f,
                    r[0].push(s),
                    o = 0 == (1 & u) ? 0 : 3 != (a = t.andln(7) + n & 7) && 5 !== a || 2 !== f ? u : -u,
                    r[1].push(o),
                    2 * i === s + 1 && (i = 1 - i),
                    2 * n === o + 1 && (n = 1 - n),
                    e.iushrn(1),
                    t.iushrn(1)
                }
                return r
            }
            ,
            i.cachedProperty = function(e, t, r) {
                var i = "_" + t;
                e.prototype[t] = function() {
                    return void 0 !== this[i] ? this[i] : this[i] = r.call(this)
                }
            }
            ,
            i.parseBytes = function(e) {
                return "string" == typeof e ? i.toArray(e, "hex") : e
            }
            ,
            i.intFromLE = function(e) {
                return new n(e,"hex","le")
            }
        }
        , {
            "bn.js": 6,
            "minimalistic-assert": 49,
            "minimalistic-crypto-utils": 50
        }],
        31: [function(e, t, r) {
            t.exports = {
                _args: [["elliptic@^6.4.0", "/home/sman/bjs/bitcoinjs-lib/node_modules/tiny-secp256k1"]],
                _from: "elliptic@>=6.4.0 <7.0.0",
                _hasShrinkwrap: !1,
                _id: "elliptic@6.5.2",
                _inCache: !0,
                _installable: !0,
                _location: "/elliptic",
                _nodeVersion: "12.11.0",
                _npmOperationalInternal: {
                    host: "s3://npm-registry-packages",
                    tmp: "tmp/elliptic_6.5.2_1574449632470_0.8146993695516966"
                },
                _npmUser: {
                    email: "fedor@indutny.com",
                    name: "indutny"
                },
                _npmVersion: "6.12.1",
                _phantomChildren: {},
                _requested: {
                    name: "elliptic",
                    raw: "elliptic@^6.4.0",
                    rawSpec: "^6.4.0",
                    scope: null,
                    spec: ">=6.4.0 <7.0.0",
                    type: "range"
                },
                _requiredBy: ["/tiny-secp256k1"],
                _resolved: "https://registry.npmjs.org/elliptic/-/elliptic-6.5.2.tgz",
                _shasum: "05c5678d7173c049d8ca433552224a495d0e3762",
                _shrinkwrap: null,
                _spec: "elliptic@^6.4.0",
                _where: "/home/sman/bjs/bitcoinjs-lib/node_modules/tiny-secp256k1",
                author: {
                    email: "fedor@indutny.com",
                    name: "Fedor Indutny"
                },
                bugs: {
                    url: "https://github.com/indutny/elliptic/issues"
                },
                dependencies: {
                    "bn.js": "^4.4.0",
                    brorand: "^1.0.1",
                    "hash.js": "^1.0.0",
                    "hmac-drbg": "^1.0.0",
                    inherits: "^2.0.1",
                    "minimalistic-assert": "^1.0.0",
                    "minimalistic-crypto-utils": "^1.0.0"
                },
                description: "EC cryptography",
                devDependencies: {
                    brfs: "^1.4.3",
                    coveralls: "^3.0.8",
                    grunt: "^1.0.4",
                    "grunt-browserify": "^5.0.0",
                    "grunt-cli": "^1.2.0",
                    "grunt-contrib-connect": "^1.0.0",
                    "grunt-contrib-copy": "^1.0.0",
                    "grunt-contrib-uglify": "^1.0.1",
                    "grunt-mocha-istanbul": "^3.0.1",
                    "grunt-saucelabs": "^9.0.1",
                    istanbul: "^0.4.2",
                    jscs: "^3.0.7",
                    jshint: "^2.10.3",
                    mocha: "^6.2.2"
                },
                directories: {},
                dist: {
                    fileCount: 17,
                    integrity: "sha512-f4x70okzZbIQl/NSRLkI/+tteV/9WqL98zx+SQ69KbXxmVrmjwsNUPn/gYJJ0sHvEak24cZgHIPegRePAtA/xw==",
                    "npm-signature": "-----BEGIN PGP SIGNATURE-----\r\nVersion: OpenPGP.js v3.0.4\r\nComment: https://openpgpjs.org\r\n\r\nwsFcBAEBCAAQBQJd2DHgCRA9TVsSAnZWagAAfx0P/RYZUDcD1KNqpERJSTgL\nlA3wXXXVB78IVwSy9laMD1GdDpsMy71PHjFMZL1NM2ZaZUUi7eiNaYf8sFrP\nQWadLsl3M2tkW6T4AkgxJXMEmbf3k9hCy+ZvRdWKJUF0g44WORvK2SNzDI/C\nIuBZ9xfTS5dZ3jZJOMZNZO4+PHzMQ/pzCGXafuuzsryPlcx0PvIN66xTRQbo\n/ByAl3lIK/C5HsFUkaSxcabcSmZrVuwDw8ciKGrBXjWkXAqLzO0u9HEczucP\n+RNNFvocrTB4ge/4yV4cdGSF7QXkzJ7hPqQgnhj0TrJO//qBERKXffQq91Hr\nU/xdUsX/dnIqpzpV81E36L+0VIxxg66/21ba4qlsho0i57v83Y6jLH3wFud4\n/LGzynTDiwySpREE9Gb3tnXSR3OuZstyJORQwEglAQIp7QcneqGOghNgY4am\nuFkM/6rAJi4tGw8uBn0tgRQZHtmy8XwNtuN/ShRoBzBayN2XVmJrApUxPpJK\nu+v3O0skLnpsXqgCpskrRK4dWtgkItxSZn91DZ219eGZvpFOgS8Jnb/bA07B\nZ7mGgM0B91Bc4ZbUGyGyv17j/p5fItlA0nqX6itwNjBI+BeYlenWXG3JfEjd\npteBvQyvxCHtcnc987HIm6VYGFvj1xlI7eLD4fQXPbuos0jbyEo2ndIU8jIT\nJVlS\r\n=BoXv\r\n-----END PGP SIGNATURE-----\r\n",
                    shasum: "05c5678d7173c049d8ca433552224a495d0e3762",
                    tarball: "https://registry.npmjs.org/elliptic/-/elliptic-6.5.2.tgz",
                    unpackedSize: 118072
                },
                gitHead: "60489415e545efdfd3010ae74b9726facbf08ca8",
                homepage: "https://github.com/indutny/elliptic",
                keywords: ["Cryptography", "EC", "Elliptic", "curve"],
                license: "MIT",
                main: "lib/elliptic.js",
                maintainers: [{
                    name: "indutny",
                    email: "fedor@indutny.com"
                }],
                name: "elliptic",
                optionalDependencies: {},
                readme: "ERROR: No README data found!",
                repository: {
                    type: "git",
                    url: "git+ssh://git@github.com/indutny/elliptic.git"
                },
                scripts: {
                    jscs: "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
                    jshint: "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
                    lint: "npm run jscs && npm run jshint",
                    test: "npm run lint && npm run unit",
                    unit: "istanbul test _mocha --reporter=spec test/index.js",
                    version: "grunt dist && git add dist/"
                },
                version: "6.5.2"
            }
        }
        , {}],
        32: [function(e, t, r) {
            "use strict";
            var i = e("safe-buffer").Buffer
              , n = e("stream").Transform;
            function s(e) {
                n.call(this),
                this._block = i.allocUnsafe(e),
                this._blockSize = e,
                this._blockOffset = 0,
                this._length = [0, 0, 0, 0],
                this._finalized = !1
            }
            e("inherits")(s, n),
            s.prototype._transform = function(e, t, r) {
                var i = null;
                try {
                    this.update(e, t)
                } catch (e) {
                    i = e
                }
                r(i)
            }
            ,
            s.prototype._flush = function(e) {
                var t = null;
                try {
                    this.push(this.digest())
                } catch (e) {
                    t = e
                }
                e(t)
            }
            ,
            s.prototype.update = function(e, t) {
                if (function(e, t) {
                    if (!i.isBuffer(e) && "string" != typeof e)
                        throw new TypeError(t + " must be a string or a buffer")
                }(e, "Data"),
                this._finalized)
                    throw new Error("Digest already called");
                i.isBuffer(e) || (e = i.from(e, t));
                for (var r = this._block, n = 0; this._blockOffset + e.length - n >= this._blockSize; ) {
                    for (var s = this._blockOffset; s < this._blockSize; )
                        r[s++] = e[n++];
                    this._update(),
                    this._blockOffset = 0
                }
                for (; n < e.length; )
                    r[this._blockOffset++] = e[n++];
                for (var o = 0, a = 8 * e.length; a > 0; ++o)
                    this._length[o] += a,
                    (a = this._length[o] / 4294967296 | 0) > 0 && (this._length[o] -= 4294967296 * a);
                return this
            }
            ,
            s.prototype._update = function() {
                throw new Error("_update is not implemented")
            }
            ,
            s.prototype.digest = function(e) {
                if (this._finalized)
                    throw new Error("Digest already called");
                this._finalized = !0;
                var t = this._digest();
                void 0 !== e && (t = t.toString(e)),
                this._block.fill(0),
                this._blockOffset = 0;
                for (var r = 0; r < 4; ++r)
                    this._length[r] = 0;
                return t
            }
            ,
            s.prototype._digest = function() {
                throw new Error("_digest is not implemented")
            }
            ,
            t.exports = s
        }
        , {
            inherits: 46,
            "safe-buffer": 54,
            stream: 141
        }],
        33: [function(e, t, r) {
            var i = r;
            i.utils = e("./hash/utils"),
            i.common = e("./hash/common"),
            i.sha = e("./hash/sha"),
            i.ripemd = e("./hash/ripemd"),
            i.hmac = e("./hash/hmac"),
            i.sha1 = i.sha.sha1,
            i.sha256 = i.sha.sha256,
            i.sha224 = i.sha.sha224,
            i.sha384 = i.sha.sha384,
            i.sha512 = i.sha.sha512,
            i.ripemd160 = i.ripemd.ripemd160
        }
        , {
            "./hash/common": 34,
            "./hash/hmac": 35,
            "./hash/ripemd": 36,
            "./hash/sha": 37,
            "./hash/utils": 44
        }],
        34: [function(e, t, r) {
            "use strict";
            var i = e("./utils")
              , n = e("minimalistic-assert");
            function s() {
                this.pending = null,
                this.pendingTotal = 0,
                this.blockSize = this.constructor.blockSize,
                this.outSize = this.constructor.outSize,
                this.hmacStrength = this.constructor.hmacStrength,
                this.padLength = this.constructor.padLength / 8,
                this.endian = "big",
                this._delta8 = this.blockSize / 8,
                this._delta32 = this.blockSize / 32
            }
            r.BlockHash = s,
            s.prototype.update = function(e, t) {
                if (e = i.toArray(e, t),
                this.pending ? this.pending = this.pending.concat(e) : this.pending = e,
                this.pendingTotal += e.length,
                this.pending.length >= this._delta8) {
                    var r = (e = this.pending).length % this._delta8;
                    this.pending = e.slice(e.length - r, e.length),
                    0 === this.pending.length && (this.pending = null),
                    e = i.join32(e, 0, e.length - r, this.endian);
                    for (var n = 0; n < e.length; n += this._delta32)
                        this._update(e, n, n + this._delta32)
                }
                return this
            }
            ,
            s.prototype.digest = function(e) {
                return this.update(this._pad()),
                n(null === this.pending),
                this._digest(e)
            }
            ,
            s.prototype._pad = function() {
                var e = this.pendingTotal
                  , t = this._delta8
                  , r = t - (e + this.padLength) % t
                  , i = new Array(r + this.padLength);
                i[0] = 128;
                for (var n = 1; n < r; n++)
                    i[n] = 0;
                if (e <<= 3,
                "big" === this.endian) {
                    for (var s = 8; s < this.padLength; s++)
                        i[n++] = 0;
                    i[n++] = 0,
                    i[n++] = 0,
                    i[n++] = 0,
                    i[n++] = 0,
                    i[n++] = e >>> 24 & 255,
                    i[n++] = e >>> 16 & 255,
                    i[n++] = e >>> 8 & 255,
                    i[n++] = 255 & e
                } else
                    for (i[n++] = 255 & e,
                    i[n++] = e >>> 8 & 255,
                    i[n++] = e >>> 16 & 255,
                    i[n++] = e >>> 24 & 255,
                    i[n++] = 0,
                    i[n++] = 0,
                    i[n++] = 0,
                    i[n++] = 0,
                    s = 8; s < this.padLength; s++)
                        i[n++] = 0;
                return i
            }
        }
        , {
            "./utils": 44,
            "minimalistic-assert": 49
        }],
        35: [function(e, t, r) {
            "use strict";
            var i = e("./utils")
              , n = e("minimalistic-assert");
            function s(e, t, r) {
                if (!(this instanceof s))
                    return new s(e,t,r);
                this.Hash = e,
                this.blockSize = e.blockSize / 8,
                this.outSize = e.outSize / 8,
                this.inner = null,
                this.outer = null,
                this._init(i.toArray(t, r))
            }
            t.exports = s,
            s.prototype._init = function(e) {
                e.length > this.blockSize && (e = (new this.Hash).update(e).digest()),
                n(e.length <= this.blockSize);
                for (var t = e.length; t < this.blockSize; t++)
                    e.push(0);
                for (t = 0; t < e.length; t++)
                    e[t] ^= 54;
                for (this.inner = (new this.Hash).update(e),
                t = 0; t < e.length; t++)
                    e[t] ^= 106;
                this.outer = (new this.Hash).update(e)
            }
            ,
            s.prototype.update = function(e, t) {
                return this.inner.update(e, t),
                this
            }
            ,
            s.prototype.digest = function(e) {
                return this.outer.update(this.inner.digest()),
                this.outer.digest(e)
            }
        }
        , {
            "./utils": 44,
            "minimalistic-assert": 49
        }],
        36: [function(e, t, r) {
            "use strict";
            var i = e("./utils")
              , n = e("./common")
              , s = i.rotl32
              , o = i.sum32
              , a = i.sum32_3
              , f = i.sum32_4
              , u = n.BlockHash;
            function c() {
                if (!(this instanceof c))
                    return new c;
                u.call(this),
                this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
                this.endian = "little"
            }
            function h(e, t, r, i) {
                return e <= 15 ? t ^ r ^ i : e <= 31 ? t & r | ~t & i : e <= 47 ? (t | ~r) ^ i : e <= 63 ? t & i | r & ~i : t ^ (r | ~i)
            }
            function d(e) {
                return e <= 15 ? 0 : e <= 31 ? 1518500249 : e <= 47 ? 1859775393 : e <= 63 ? 2400959708 : 2840853838
            }
            function l(e) {
                return e <= 15 ? 1352829926 : e <= 31 ? 1548603684 : e <= 47 ? 1836072691 : e <= 63 ? 2053994217 : 0
            }
            i.inherits(c, u),
            r.ripemd160 = c,
            c.blockSize = 512,
            c.outSize = 160,
            c.hmacStrength = 192,
            c.padLength = 64,
            c.prototype._update = function(e, t) {
                for (var r = this.h[0], i = this.h[1], n = this.h[2], u = this.h[3], c = this.h[4], g = r, v = i, w = n, _ = u, S = c, M = 0; M < 80; M++) {
                    var E = o(s(f(r, h(M, i, n, u), e[p[M] + t], d(M)), m[M]), c);
                    r = c,
                    c = u,
                    u = s(n, 10),
                    n = i,
                    i = E,
                    E = o(s(f(g, h(79 - M, v, w, _), e[b[M] + t], l(M)), y[M]), S),
                    g = S,
                    S = _,
                    _ = s(w, 10),
                    w = v,
                    v = E
                }
                E = a(this.h[1], n, _),
                this.h[1] = a(this.h[2], u, S),
                this.h[2] = a(this.h[3], c, g),
                this.h[3] = a(this.h[4], r, v),
                this.h[4] = a(this.h[0], i, w),
                this.h[0] = E
            }
            ,
            c.prototype._digest = function(e) {
                return "hex" === e ? i.toHex32(this.h, "little") : i.split32(this.h, "little")
            }
            ;
            var p = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]
              , b = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]
              , m = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]
              , y = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]
        }
        , {
            "./common": 34,
            "./utils": 44
        }],
        37: [function(e, t, r) {
            "use strict";
            r.sha1 = e("./sha/1"),
            r.sha224 = e("./sha/224"),
            r.sha256 = e("./sha/256"),
            r.sha384 = e("./sha/384"),
            r.sha512 = e("./sha/512")
        }
        , {
            "./sha/1": 38,
            "./sha/224": 39,
            "./sha/256": 40,
            "./sha/384": 41,
            "./sha/512": 42
        }],
        38: [function(e, t, r) {
            "use strict";
            var i = e("../utils")
              , n = e("../common")
              , s = e("./common")
              , o = i.rotl32
              , a = i.sum32
              , f = i.sum32_5
              , u = s.ft_1
              , c = n.BlockHash
              , h = [1518500249, 1859775393, 2400959708, 3395469782];
            function d() {
                if (!(this instanceof d))
                    return new d;
                c.call(this),
                this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
                this.W = new Array(80)
            }
            i.inherits(d, c),
            t.exports = d,
            d.blockSize = 512,
            d.outSize = 160,
            d.hmacStrength = 80,
            d.padLength = 64,
            d.prototype._update = function(e, t) {
                for (var r = this.W, i = 0; i < 16; i++)
                    r[i] = e[t + i];
                for (; i < r.length; i++)
                    r[i] = o(r[i - 3] ^ r[i - 8] ^ r[i - 14] ^ r[i - 16], 1);
                var n = this.h[0]
                  , s = this.h[1]
                  , c = this.h[2]
                  , d = this.h[3]
                  , l = this.h[4];
                for (i = 0; i < r.length; i++) {
                    var p = ~~(i / 20)
                      , b = f(o(n, 5), u(p, s, c, d), l, r[i], h[p]);
                    l = d,
                    d = c,
                    c = o(s, 30),
                    s = n,
                    n = b
                }
                this.h[0] = a(this.h[0], n),
                this.h[1] = a(this.h[1], s),
                this.h[2] = a(this.h[2], c),
                this.h[3] = a(this.h[3], d),
                this.h[4] = a(this.h[4], l)
            }
            ,
            d.prototype._digest = function(e) {
                return "hex" === e ? i.toHex32(this.h, "big") : i.split32(this.h, "big")
            }
        }
        , {
            "../common": 34,
            "../utils": 44,
            "./common": 43
        }],
        39: [function(e, t, r) {
            "use strict";
            var i = e("../utils")
              , n = e("./256");
            function s() {
                if (!(this instanceof s))
                    return new s;
                n.call(this),
                this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]
            }
            i.inherits(s, n),
            t.exports = s,
            s.blockSize = 512,
            s.outSize = 224,
            s.hmacStrength = 192,
            s.padLength = 64,
            s.prototype._digest = function(e) {
                return "hex" === e ? i.toHex32(this.h.slice(0, 7), "big") : i.split32(this.h.slice(0, 7), "big")
            }
        }
        , {
            "../utils": 44,
            "./256": 40
        }],
        40: [function(e, t, r) {
            "use strict";
            var i = e("../utils")
              , n = e("../common")
              , s = e("./common")
              , o = e("minimalistic-assert")
              , a = i.sum32
              , f = i.sum32_4
              , u = i.sum32_5
              , c = s.ch32
              , h = s.maj32
              , d = s.s0_256
              , l = s.s1_256
              , p = s.g0_256
              , b = s.g1_256
              , m = n.BlockHash
              , y = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
            function g() {
                if (!(this instanceof g))
                    return new g;
                m.call(this),
                this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
                this.k = y,
                this.W = new Array(64)
            }
            i.inherits(g, m),
            t.exports = g,
            g.blockSize = 512,
            g.outSize = 256,
            g.hmacStrength = 192,
            g.padLength = 64,
            g.prototype._update = function(e, t) {
                for (var r = this.W, i = 0; i < 16; i++)
                    r[i] = e[t + i];
                for (; i < r.length; i++)
                    r[i] = f(b(r[i - 2]), r[i - 7], p(r[i - 15]), r[i - 16]);
                var n = this.h[0]
                  , s = this.h[1]
                  , m = this.h[2]
                  , y = this.h[3]
                  , g = this.h[4]
                  , v = this.h[5]
                  , w = this.h[6]
                  , _ = this.h[7];
                for (o(this.k.length === r.length),
                i = 0; i < r.length; i++) {
                    var S = u(_, l(g), c(g, v, w), this.k[i], r[i])
                      , M = a(d(n), h(n, s, m));
                    _ = w,
                    w = v,
                    v = g,
                    g = a(y, S),
                    y = m,
                    m = s,
                    s = n,
                    n = a(S, M)
                }
                this.h[0] = a(this.h[0], n),
                this.h[1] = a(this.h[1], s),
                this.h[2] = a(this.h[2], m),
                this.h[3] = a(this.h[3], y),
                this.h[4] = a(this.h[4], g),
                this.h[5] = a(this.h[5], v),
                this.h[6] = a(this.h[6], w),
                this.h[7] = a(this.h[7], _)
            }
            ,
            g.prototype._digest = function(e) {
                return "hex" === e ? i.toHex32(this.h, "big") : i.split32(this.h, "big")
            }
        }
        , {
            "../common": 34,
            "../utils": 44,
            "./common": 43,
            "minimalistic-assert": 49
        }],
        41: [function(e, t, r) {
            "use strict";
            var i = e("../utils")
              , n = e("./512");
            function s() {
                if (!(this instanceof s))
                    return new s;
                n.call(this),
                this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]
            }
            i.inherits(s, n),
            t.exports = s,
            s.blockSize = 1024,
            s.outSize = 384,
            s.hmacStrength = 192,
            s.padLength = 128,
            s.prototype._digest = function(e) {
                return "hex" === e ? i.toHex32(this.h.slice(0, 12), "big") : i.split32(this.h.slice(0, 12), "big")
            }
        }
        , {
            "../utils": 44,
            "./512": 42
        }],
        42: [function(e, t, r) {
            "use strict";
            var i = e("../utils")
              , n = e("../common")
              , s = e("minimalistic-assert")
              , o = i.rotr64_hi
              , a = i.rotr64_lo
              , f = i.shr64_hi
              , u = i.shr64_lo
              , c = i.sum64
              , h = i.sum64_hi
              , d = i.sum64_lo
              , l = i.sum64_4_hi
              , p = i.sum64_4_lo
              , b = i.sum64_5_hi
              , m = i.sum64_5_lo
              , y = n.BlockHash
              , g = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
            function v() {
                if (!(this instanceof v))
                    return new v;
                y.call(this),
                this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209],
                this.k = g,
                this.W = new Array(160)
            }
            function w(e, t, r, i, n) {
                var s = e & r ^ ~e & n;
                return s < 0 && (s += 4294967296),
                s
            }
            function _(e, t, r, i, n, s) {
                var o = t & i ^ ~t & s;
                return o < 0 && (o += 4294967296),
                o
            }
            function S(e, t, r, i, n) {
                var s = e & r ^ e & n ^ r & n;
                return s < 0 && (s += 4294967296),
                s
            }
            function M(e, t, r, i, n, s) {
                var o = t & i ^ t & s ^ i & s;
                return o < 0 && (o += 4294967296),
                o
            }
            function E(e, t) {
                var r = o(e, t, 28) ^ o(t, e, 2) ^ o(t, e, 7);
                return r < 0 && (r += 4294967296),
                r
            }
            function k(e, t) {
                var r = a(e, t, 28) ^ a(t, e, 2) ^ a(t, e, 7);
                return r < 0 && (r += 4294967296),
                r
            }
            function O(e, t) {
                var r = o(e, t, 14) ^ o(e, t, 18) ^ o(t, e, 9);
                return r < 0 && (r += 4294967296),
                r
            }
            function P(e, t) {
                var r = a(e, t, 14) ^ a(e, t, 18) ^ a(t, e, 9);
                return r < 0 && (r += 4294967296),
                r
            }
            function A(e, t) {
                var r = o(e, t, 1) ^ o(e, t, 8) ^ f(e, t, 7);
                return r < 0 && (r += 4294967296),
                r
            }
            function I(e, t) {
                var r = a(e, t, 1) ^ a(e, t, 8) ^ u(e, t, 7);
                return r < 0 && (r += 4294967296),
                r
            }
            function x(e, t) {
                var r = o(e, t, 19) ^ o(t, e, 29) ^ f(e, t, 6);
                return r < 0 && (r += 4294967296),
                r
            }
            function T(e, t) {
                var r = a(e, t, 19) ^ a(t, e, 29) ^ u(e, t, 6);
                return r < 0 && (r += 4294967296),
                r
            }
            i.inherits(v, y),
            t.exports = v,
            v.blockSize = 1024,
            v.outSize = 512,
            v.hmacStrength = 192,
            v.padLength = 128,
            v.prototype._prepareBlock = function(e, t) {
                for (var r = this.W, i = 0; i < 32; i++)
                    r[i] = e[t + i];
                for (; i < r.length; i += 2) {
                    var n = x(r[i - 4], r[i - 3])
                      , s = T(r[i - 4], r[i - 3])
                      , o = r[i - 14]
                      , a = r[i - 13]
                      , f = A(r[i - 30], r[i - 29])
                      , u = I(r[i - 30], r[i - 29])
                      , c = r[i - 32]
                      , h = r[i - 31];
                    r[i] = l(n, s, o, a, f, u, c, h),
                    r[i + 1] = p(n, s, o, a, f, u, c, h)
                }
            }
            ,
            v.prototype._update = function(e, t) {
                this._prepareBlock(e, t);
                var r = this.W
                  , i = this.h[0]
                  , n = this.h[1]
                  , o = this.h[2]
                  , a = this.h[3]
                  , f = this.h[4]
                  , u = this.h[5]
                  , l = this.h[6]
                  , p = this.h[7]
                  , y = this.h[8]
                  , g = this.h[9]
                  , v = this.h[10]
                  , A = this.h[11]
                  , I = this.h[12]
                  , x = this.h[13]
                  , T = this.h[14]
                  , N = this.h[15];
                s(this.k.length === r.length);
                for (var B = 0; B < r.length; B += 2) {
                    var R = T
                      , L = N
                      , j = O(y, g)
                      , U = P(y, g)
                      , q = w(y, g, v, A, I)
                      , C = _(y, g, v, A, I, x)
                      , H = this.k[B]
                      , z = this.k[B + 1]
                      , D = r[B]
                      , W = r[B + 1]
                      , F = b(R, L, j, U, q, C, H, z, D, W)
                      , K = m(R, L, j, U, q, C, H, z, D, W);
                    R = E(i, n),
                    L = k(i, n),
                    j = S(i, n, o, a, f),
                    U = M(i, n, o, a, f, u);
                    var V = h(R, L, j, U)
                      , J = d(R, L, j, U);
                    T = I,
                    N = x,
                    I = v,
                    x = A,
                    v = y,
                    A = g,
                    y = h(l, p, F, K),
                    g = d(p, p, F, K),
                    l = f,
                    p = u,
                    f = o,
                    u = a,
                    o = i,
                    a = n,
                    i = h(F, K, V, J),
                    n = d(F, K, V, J)
                }
                c(this.h, 0, i, n),
                c(this.h, 2, o, a),
                c(this.h, 4, f, u),
                c(this.h, 6, l, p),
                c(this.h, 8, y, g),
                c(this.h, 10, v, A),
                c(this.h, 12, I, x),
                c(this.h, 14, T, N)
            }
            ,
            v.prototype._digest = function(e) {
                return "hex" === e ? i.toHex32(this.h, "big") : i.split32(this.h, "big")
            }
        }
        , {
            "../common": 34,
            "../utils": 44,
            "minimalistic-assert": 49
        }],
        43: [function(e, t, r) {
            "use strict";
            var i = e("../utils").rotr32;
            function n(e, t, r) {
                return e & t ^ ~e & r
            }
            function s(e, t, r) {
                return e & t ^ e & r ^ t & r
            }
            function o(e, t, r) {
                return e ^ t ^ r
            }
            r.ft_1 = function(e, t, r, i) {
                return 0 === e ? n(t, r, i) : 1 === e || 3 === e ? o(t, r, i) : 2 === e ? s(t, r, i) : void 0
            }
            ,
            r.ch32 = n,
            r.maj32 = s,
            r.p32 = o,
            r.s0_256 = function(e) {
                return i(e, 2) ^ i(e, 13) ^ i(e, 22)
            }
            ,
            r.s1_256 = function(e) {
                return i(e, 6) ^ i(e, 11) ^ i(e, 25)
            }
            ,
            r.g0_256 = function(e) {
                return i(e, 7) ^ i(e, 18) ^ e >>> 3
            }
            ,
            r.g1_256 = function(e) {
                return i(e, 17) ^ i(e, 19) ^ e >>> 10
            }
        }
        , {
            "../utils": 44
        }],
        44: [function(e, t, r) {
            "use strict";
            var i = e("minimalistic-assert")
              , n = e("inherits");
            function s(e, t) {
                return 55296 == (64512 & e.charCodeAt(t)) && (!(t < 0 || t + 1 >= e.length) && 56320 == (64512 & e.charCodeAt(t + 1)))
            }
            function o(e) {
                return (e >>> 24 | e >>> 8 & 65280 | e << 8 & 16711680 | (255 & e) << 24) >>> 0
            }
            function a(e) {
                return 1 === e.length ? "0" + e : e
            }
            function f(e) {
                return 7 === e.length ? "0" + e : 6 === e.length ? "00" + e : 5 === e.length ? "000" + e : 4 === e.length ? "0000" + e : 3 === e.length ? "00000" + e : 2 === e.length ? "000000" + e : 1 === e.length ? "0000000" + e : e
            }
            r.inherits = n,
            r.toArray = function(e, t) {
                if (Array.isArray(e))
                    return e.slice();
                if (!e)
                    return [];
                var r = [];
                if ("string" == typeof e)
                    if (t) {
                        if ("hex" === t)
                            for ((e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (e = "0" + e),
                            n = 0; n < e.length; n += 2)
                                r.push(parseInt(e[n] + e[n + 1], 16))
                    } else
                        for (var i = 0, n = 0; n < e.length; n++) {
                            var o = e.charCodeAt(n);
                            o < 128 ? r[i++] = o : o < 2048 ? (r[i++] = o >> 6 | 192,
                            r[i++] = 63 & o | 128) : s(e, n) ? (o = 65536 + ((1023 & o) << 10) + (1023 & e.charCodeAt(++n)),
                            r[i++] = o >> 18 | 240,
                            r[i++] = o >> 12 & 63 | 128,
                            r[i++] = o >> 6 & 63 | 128,
                            r[i++] = 63 & o | 128) : (r[i++] = o >> 12 | 224,
                            r[i++] = o >> 6 & 63 | 128,
                            r[i++] = 63 & o | 128)
                        }
                else
                    for (n = 0; n < e.length; n++)
                        r[n] = 0 | e[n];
                return r
            }
            ,
            r.toHex = function(e) {
                for (var t = "", r = 0; r < e.length; r++)
                    t += a(e[r].toString(16));
                return t
            }
            ,
            r.htonl = o,
            r.toHex32 = function(e, t) {
                for (var r = "", i = 0; i < e.length; i++) {
                    var n = e[i];
                    "little" === t && (n = o(n)),
                    r += f(n.toString(16))
                }
                return r
            }
            ,
            r.zero2 = a,
            r.zero8 = f,
            r.join32 = function(e, t, r, n) {
                var s = r - t;
                i(s % 4 == 0);
                for (var o = new Array(s / 4), a = 0, f = t; a < o.length; a++,
                f += 4) {
                    var u;
                    u = "big" === n ? e[f] << 24 | e[f + 1] << 16 | e[f + 2] << 8 | e[f + 3] : e[f + 3] << 24 | e[f + 2] << 16 | e[f + 1] << 8 | e[f],
                    o[a] = u >>> 0
                }
                return o
            }
            ,
            r.split32 = function(e, t) {
                for (var r = new Array(4 * e.length), i = 0, n = 0; i < e.length; i++,
                n += 4) {
                    var s = e[i];
                    "big" === t ? (r[n] = s >>> 24,
                    r[n + 1] = s >>> 16 & 255,
                    r[n + 2] = s >>> 8 & 255,
                    r[n + 3] = 255 & s) : (r[n + 3] = s >>> 24,
                    r[n + 2] = s >>> 16 & 255,
                    r[n + 1] = s >>> 8 & 255,
                    r[n] = 255 & s)
                }
                return r
            }
            ,
            r.rotr32 = function(e, t) {
                return e >>> t | e << 32 - t
            }
            ,
            r.rotl32 = function(e, t) {
                return e << t | e >>> 32 - t
            }
            ,
            r.sum32 = function(e, t) {
                return e + t >>> 0
            }
            ,
            r.sum32_3 = function(e, t, r) {
                return e + t + r >>> 0
            }
            ,
            r.sum32_4 = function(e, t, r, i) {
                return e + t + r + i >>> 0
            }
            ,
            r.sum32_5 = function(e, t, r, i, n) {
                return e + t + r + i + n >>> 0
            }
            ,
            r.sum64 = function(e, t, r, i) {
                var n = e[t]
                  , s = i + e[t + 1] >>> 0
                  , o = (s < i ? 1 : 0) + r + n;
                e[t] = o >>> 0,
                e[t + 1] = s
            }
            ,
            r.sum64_hi = function(e, t, r, i) {
                return (t + i >>> 0 < t ? 1 : 0) + e + r >>> 0
            }
            ,
            r.sum64_lo = function(e, t, r, i) {
                return t + i >>> 0
            }
            ,
            r.sum64_4_hi = function(e, t, r, i, n, s, o, a) {
                var f = 0
                  , u = t;
                return f += (u = u + i >>> 0) < t ? 1 : 0,
                f += (u = u + s >>> 0) < s ? 1 : 0,
                e + r + n + o + (f += (u = u + a >>> 0) < a ? 1 : 0) >>> 0
            }
            ,
            r.sum64_4_lo = function(e, t, r, i, n, s, o, a) {
                return t + i + s + a >>> 0
            }
            ,
            r.sum64_5_hi = function(e, t, r, i, n, s, o, a, f, u) {
                var c = 0
                  , h = t;
                return c += (h = h + i >>> 0) < t ? 1 : 0,
                c += (h = h + s >>> 0) < s ? 1 : 0,
                c += (h = h + a >>> 0) < a ? 1 : 0,
                e + r + n + o + f + (c += (h = h + u >>> 0) < u ? 1 : 0) >>> 0
            }
            ,
            r.sum64_5_lo = function(e, t, r, i, n, s, o, a, f, u) {
                return t + i + s + a + u >>> 0
            }
            ,
            r.rotr64_hi = function(e, t, r) {
                return (t << 32 - r | e >>> r) >>> 0
            }
            ,
            r.rotr64_lo = function(e, t, r) {
                return (e << 32 - r | t >>> r) >>> 0
            }
            ,
            r.shr64_hi = function(e, t, r) {
                return e >>> r
            }
            ,
            r.shr64_lo = function(e, t, r) {
                return (e << 32 - r | t >>> r) >>> 0
            }
        }
        , {
            inherits: 46,
            "minimalistic-assert": 49
        }],
        45: [function(e, t, r) {
            "use strict";
            var i = e("hash.js")
              , n = e("minimalistic-crypto-utils")
              , s = e("minimalistic-assert");
            function o(e) {
                if (!(this instanceof o))
                    return new o(e);
                this.hash = e.hash,
                this.predResist = !!e.predResist,
                this.outLen = this.hash.outSize,
                this.minEntropy = e.minEntropy || this.hash.hmacStrength,
                this._reseed = null,
                this.reseedInterval = null,
                this.K = null,
                this.V = null;
                var t = n.toArray(e.entropy, e.entropyEnc || "hex")
                  , r = n.toArray(e.nonce, e.nonceEnc || "hex")
                  , i = n.toArray(e.pers, e.persEnc || "hex");
                s(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"),
                this._init(t, r, i)
            }
            t.exports = o,
            o.prototype._init = function(e, t, r) {
                var i = e.concat(t).concat(r);
                this.K = new Array(this.outLen / 8),
                this.V = new Array(this.outLen / 8);
                for (var n = 0; n < this.V.length; n++)
                    this.K[n] = 0,
                    this.V[n] = 1;
                this._update(i),
                this._reseed = 1,
                this.reseedInterval = 281474976710656
            }
            ,
            o.prototype._hmac = function() {
                return new i.hmac(this.hash,this.K)
            }
            ,
            o.prototype._update = function(e) {
                var t = this._hmac().update(this.V).update([0]);
                e && (t = t.update(e)),
                this.K = t.digest(),
                this.V = this._hmac().update(this.V).digest(),
                e && (this.K = this._hmac().update(this.V).update([1]).update(e).digest(),
                this.V = this._hmac().update(this.V).digest())
            }
            ,
            o.prototype.reseed = function(e, t, r, i) {
                "string" != typeof t && (i = r,
                r = t,
                t = null),
                e = n.toArray(e, t),
                r = n.toArray(r, i),
                s(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"),
                this._update(e.concat(r || [])),
                this._reseed = 1
            }
            ,
            o.prototype.generate = function(e, t, r, i) {
                if (this._reseed > this.reseedInterval)
                    throw new Error("Reseed is required");
                "string" != typeof t && (i = r,
                r = t,
                t = null),
                r && (r = n.toArray(r, i || "hex"),
                this._update(r));
                for (var s = []; s.length < e; )
                    this.V = this._hmac().update(this.V).digest(),
                    s = s.concat(this.V);
                var o = s.slice(0, e);
                return this._update(r),
                this._reseed++,
                n.encode(o, t)
            }
        }
        , {
            "hash.js": 33,
            "minimalistic-assert": 49,
            "minimalistic-crypto-utils": 50
        }],
        46: [function(e, t, r) {
            "function" == typeof Object.create ? t.exports = function(e, t) {
                t && (e.super_ = t,
                e.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }))
            }
            : t.exports = function(e, t) {
                if (t) {
                    e.super_ = t;
                    var r = function() {};
                    r.prototype = t.prototype,
                    e.prototype = new r,
                    e.prototype.constructor = e
                }
            }
        }
        , {}],
        47: [function(e, t, r) {
            "use strict";
            var i = e("inherits")
              , n = e("hash-base")
              , s = e("safe-buffer").Buffer
              , o = new Array(16);
            function a() {
                n.call(this, 64),
                this._a = 1732584193,
                this._b = 4023233417,
                this._c = 2562383102,
                this._d = 271733878
            }
            function f(e, t) {
                return e << t | e >>> 32 - t
            }
            function u(e, t, r, i, n, s, o) {
                return f(e + (t & r | ~t & i) + n + s | 0, o) + t | 0
            }
            function c(e, t, r, i, n, s, o) {
                return f(e + (t & i | r & ~i) + n + s | 0, o) + t | 0
            }
            function h(e, t, r, i, n, s, o) {
                return f(e + (t ^ r ^ i) + n + s | 0, o) + t | 0
            }
            function d(e, t, r, i, n, s, o) {
                return f(e + (r ^ (t | ~i)) + n + s | 0, o) + t | 0
            }
            i(a, n),
            a.prototype._update = function() {
                for (var e = o, t = 0; t < 16; ++t)
                    e[t] = this._block.readInt32LE(4 * t);
                var r = this._a
                  , i = this._b
                  , n = this._c
                  , s = this._d;
                i = d(i = d(i = d(i = d(i = h(i = h(i = h(i = h(i = c(i = c(i = c(i = c(i = u(i = u(i = u(i = u(i, n = u(n, s = u(s, r = u(r, i, n, s, e[0], 3614090360, 7), i, n, e[1], 3905402710, 12), r, i, e[2], 606105819, 17), s, r, e[3], 3250441966, 22), n = u(n, s = u(s, r = u(r, i, n, s, e[4], 4118548399, 7), i, n, e[5], 1200080426, 12), r, i, e[6], 2821735955, 17), s, r, e[7], 4249261313, 22), n = u(n, s = u(s, r = u(r, i, n, s, e[8], 1770035416, 7), i, n, e[9], 2336552879, 12), r, i, e[10], 4294925233, 17), s, r, e[11], 2304563134, 22), n = u(n, s = u(s, r = u(r, i, n, s, e[12], 1804603682, 7), i, n, e[13], 4254626195, 12), r, i, e[14], 2792965006, 17), s, r, e[15], 1236535329, 22), n = c(n, s = c(s, r = c(r, i, n, s, e[1], 4129170786, 5), i, n, e[6], 3225465664, 9), r, i, e[11], 643717713, 14), s, r, e[0], 3921069994, 20), n = c(n, s = c(s, r = c(r, i, n, s, e[5], 3593408605, 5), i, n, e[10], 38016083, 9), r, i, e[15], 3634488961, 14), s, r, e[4], 3889429448, 20), n = c(n, s = c(s, r = c(r, i, n, s, e[9], 568446438, 5), i, n, e[14], 3275163606, 9), r, i, e[3], 4107603335, 14), s, r, e[8], 1163531501, 20), n = c(n, s = c(s, r = c(r, i, n, s, e[13], 2850285829, 5), i, n, e[2], 4243563512, 9), r, i, e[7], 1735328473, 14), s, r, e[12], 2368359562, 20), n = h(n, s = h(s, r = h(r, i, n, s, e[5], 4294588738, 4), i, n, e[8], 2272392833, 11), r, i, e[11], 1839030562, 16), s, r, e[14], 4259657740, 23), n = h(n, s = h(s, r = h(r, i, n, s, e[1], 2763975236, 4), i, n, e[4], 1272893353, 11), r, i, e[7], 4139469664, 16), s, r, e[10], 3200236656, 23), n = h(n, s = h(s, r = h(r, i, n, s, e[13], 681279174, 4), i, n, e[0], 3936430074, 11), r, i, e[3], 3572445317, 16), s, r, e[6], 76029189, 23), n = h(n, s = h(s, r = h(r, i, n, s, e[9], 3654602809, 4), i, n, e[12], 3873151461, 11), r, i, e[15], 530742520, 16), s, r, e[2], 3299628645, 23), n = d(n, s = d(s, r = d(r, i, n, s, e[0], 4096336452, 6), i, n, e[7], 1126891415, 10), r, i, e[14], 2878612391, 15), s, r, e[5], 4237533241, 21), n = d(n, s = d(s, r = d(r, i, n, s, e[12], 1700485571, 6), i, n, e[3], 2399980690, 10), r, i, e[10], 4293915773, 15), s, r, e[1], 2240044497, 21), n = d(n, s = d(s, r = d(r, i, n, s, e[8], 1873313359, 6), i, n, e[15], 4264355552, 10), r, i, e[6], 2734768916, 15), s, r, e[13], 1309151649, 21), n = d(n, s = d(s, r = d(r, i, n, s, e[4], 4149444226, 6), i, n, e[11], 3174756917, 10), r, i, e[2], 718787259, 15), s, r, e[9], 3951481745, 21),
                this._a = this._a + r | 0,
                this._b = this._b + i | 0,
                this._c = this._c + n | 0,
                this._d = this._d + s | 0
            }
            ,
            a.prototype._digest = function() {
                this._block[this._blockOffset++] = 128,
                this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64),
                this._update(),
                this._blockOffset = 0),
                this._block.fill(0, this._blockOffset, 56),
                this._block.writeUInt32LE(this._length[0], 56),
                this._block.writeUInt32LE(this._length[1], 60),
                this._update();
                var e = s.allocUnsafe(16);
                return e.writeInt32LE(this._a, 0),
                e.writeInt32LE(this._b, 4),
                e.writeInt32LE(this._c, 8),
                e.writeInt32LE(this._d, 12),
                e
            }
            ,
            t.exports = a
        }
        , {
            "hash-base": 32,
            inherits: 46,
            "safe-buffer": 54
        }],
        48: [function(e, t, r) {
            (function(e) {
                t.exports = function(t, r) {
                    if (!Array.isArray(t))
                        throw TypeError("Expected values Array");
                    if ("function" != typeof r)
                        throw TypeError("Expected digest Function");
                    for (var i = t.length, n = t.concat(); i > 1; ) {
                        for (var s = 0, o = 0; o < i; o += 2,
                        ++s) {
                            var a = n[o]
                              , f = o + 1 === i ? a : n[o + 1]
                              , u = e.concat([a, f]);
                            n[s] = r(u)
                        }
                        i = s
                    }
                    return n[0]
                }
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            buffer: 116
        }],
        49: [function(e, t, r) {
            function i(e, t) {
                if (!e)
                    throw new Error(t || "Assertion failed")
            }
            t.exports = i,
            i.equal = function(e, t, r) {
                if (e != t)
                    throw new Error(r || "Assertion failed: " + e + " != " + t)
            }
        }
        , {}],
        50: [function(e, t, r) {
            "use strict";
            var i = r;
            function n(e) {
                return 1 === e.length ? "0" + e : e
            }
            function s(e) {
                for (var t = "", r = 0; r < e.length; r++)
                    t += n(e[r].toString(16));
                return t
            }
            i.toArray = function(e, t) {
                if (Array.isArray(e))
                    return e.slice();
                if (!e)
                    return [];
                var r = [];
                if ("string" != typeof e) {
                    for (var i = 0; i < e.length; i++)
                        r[i] = 0 | e[i];
                    return r
                }
                if ("hex" === t)
                    for ((e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (e = "0" + e),
                    i = 0; i < e.length; i += 2)
                        r.push(parseInt(e[i] + e[i + 1], 16));
                else
                    for (i = 0; i < e.length; i++) {
                        var n = e.charCodeAt(i)
                          , s = n >> 8
                          , o = 255 & n;
                        s ? r.push(s, o) : r.push(o)
                    }
                return r
            }
            ,
            i.zero2 = n,
            i.toHex = s,
            i.encode = function(e, t) {
                return "hex" === t ? s(e) : e
            }
        }
        , {}],
        51: [function(e, t, r) {
            var i = e("bitcoin-ops");
            function n(e) {
                return e < i.OP_PUSHDATA1 ? 1 : e <= 255 ? 2 : e <= 65535 ? 3 : 5
            }
            t.exports = {
                encodingLength: n,
                encode: function(e, t, r) {
                    var s = n(t);
                    return 1 === s ? e.writeUInt8(t, r) : 2 === s ? (e.writeUInt8(i.OP_PUSHDATA1, r),
                    e.writeUInt8(t, r + 1)) : 3 === s ? (e.writeUInt8(i.OP_PUSHDATA2, r),
                    e.writeUInt16LE(t, r + 1)) : (e.writeUInt8(i.OP_PUSHDATA4, r),
                    e.writeUInt32LE(t, r + 1)),
                    s
                },
                decode: function(e, t) {
                    var r, n, s = e.readUInt8(t);
                    if (s < i.OP_PUSHDATA1)
                        r = s,
                        n = 1;
                    else if (s === i.OP_PUSHDATA1) {
                        if (t + 2 > e.length)
                            return null;
                        r = e.readUInt8(t + 1),
                        n = 2
                    } else if (s === i.OP_PUSHDATA2) {
                        if (t + 3 > e.length)
                            return null;
                        r = e.readUInt16LE(t + 1),
                        n = 3
                    } else {
                        if (t + 5 > e.length)
                            return null;
                        if (s !== i.OP_PUSHDATA4)
                            throw new Error("Unexpected opcode");
                        r = e.readUInt32LE(t + 1),
                        n = 5
                    }
                    return {
                        opcode: s,
                        number: r,
                        size: n
                    }
                }
            }
        }
        , {
            "bitcoin-ops": 4
        }],
        52: [function(e, t, r) {
            (function(r, i) {
                "use strict";
                var n = 65536
                  , s = 4294967295;
                var o = e("safe-buffer").Buffer
                  , a = i.crypto || i.msCrypto;
                a && a.getRandomValues ? t.exports = function(e, t) {
                    if (e > s)
                        throw new RangeError("requested too many random bytes");
                    var i = o.allocUnsafe(e);
                    if (e > 0)
                        if (e > n)
                            for (var f = 0; f < e; f += n)
                                a.getRandomValues(i.slice(f, f + n));
                        else
                            a.getRandomValues(i);
                    if ("function" == typeof t)
                        return r.nextTick(function() {
                            t(null, i)
                        });
                    return i
                }
                : t.exports = function() {
                    throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11")
                }
            }
            ).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
        , {
            _process: 124,
            "safe-buffer": 54
        }],
        53: [function(e, t, r) {
            "use strict";
            var i = e("buffer").Buffer
              , n = e("inherits")
              , s = e("hash-base")
              , o = new Array(16)
              , a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]
              , f = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]
              , u = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]
              , c = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]
              , h = [0, 1518500249, 1859775393, 2400959708, 2840853838]
              , d = [1352829926, 1548603684, 1836072691, 2053994217, 0];
            function l() {
                s.call(this, 64),
                this._a = 1732584193,
                this._b = 4023233417,
                this._c = 2562383102,
                this._d = 271733878,
                this._e = 3285377520
            }
            function p(e, t) {
                return e << t | e >>> 32 - t
            }
            function b(e, t, r, i, n, s, o, a) {
                return p(e + (t ^ r ^ i) + s + o | 0, a) + n | 0
            }
            function m(e, t, r, i, n, s, o, a) {
                return p(e + (t & r | ~t & i) + s + o | 0, a) + n | 0
            }
            function y(e, t, r, i, n, s, o, a) {
                return p(e + ((t | ~r) ^ i) + s + o | 0, a) + n | 0
            }
            function g(e, t, r, i, n, s, o, a) {
                return p(e + (t & i | r & ~i) + s + o | 0, a) + n | 0
            }
            function v(e, t, r, i, n, s, o, a) {
                return p(e + (t ^ (r | ~i)) + s + o | 0, a) + n | 0
            }
            n(l, s),
            l.prototype._update = function() {
                for (var e = o, t = 0; t < 16; ++t)
                    e[t] = this._block.readInt32LE(4 * t);
                for (var r = 0 | this._a, i = 0 | this._b, n = 0 | this._c, s = 0 | this._d, l = 0 | this._e, w = 0 | this._a, _ = 0 | this._b, S = 0 | this._c, M = 0 | this._d, E = 0 | this._e, k = 0; k < 80; k += 1) {
                    var O, P;
                    k < 16 ? (O = b(r, i, n, s, l, e[a[k]], h[0], u[k]),
                    P = v(w, _, S, M, E, e[f[k]], d[0], c[k])) : k < 32 ? (O = m(r, i, n, s, l, e[a[k]], h[1], u[k]),
                    P = g(w, _, S, M, E, e[f[k]], d[1], c[k])) : k < 48 ? (O = y(r, i, n, s, l, e[a[k]], h[2], u[k]),
                    P = y(w, _, S, M, E, e[f[k]], d[2], c[k])) : k < 64 ? (O = g(r, i, n, s, l, e[a[k]], h[3], u[k]),
                    P = m(w, _, S, M, E, e[f[k]], d[3], c[k])) : (O = v(r, i, n, s, l, e[a[k]], h[4], u[k]),
                    P = b(w, _, S, M, E, e[f[k]], d[4], c[k])),
                    r = l,
                    l = s,
                    s = p(n, 10),
                    n = i,
                    i = O,
                    w = E,
                    E = M,
                    M = p(S, 10),
                    S = _,
                    _ = P
                }
                var A = this._b + n + M | 0;
                this._b = this._c + s + E | 0,
                this._c = this._d + l + w | 0,
                this._d = this._e + r + _ | 0,
                this._e = this._a + i + S | 0,
                this._a = A
            }
            ,
            l.prototype._digest = function() {
                this._block[this._blockOffset++] = 128,
                this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64),
                this._update(),
                this._blockOffset = 0),
                this._block.fill(0, this._blockOffset, 56),
                this._block.writeUInt32LE(this._length[0], 56),
                this._block.writeUInt32LE(this._length[1], 60),
                this._update();
                var e = i.alloc ? i.alloc(20) : new i(20);
                return e.writeInt32LE(this._a, 0),
                e.writeInt32LE(this._b, 4),
                e.writeInt32LE(this._c, 8),
                e.writeInt32LE(this._d, 12),
                e.writeInt32LE(this._e, 16),
                e
            }
            ,
            t.exports = l
        }
        , {
            buffer: 116,
            "hash-base": 32,
            inherits: 46
        }],
        54: [function(e, t, r) {
            var i = e("buffer")
              , n = i.Buffer;
            function s(e, t) {
                for (var r in e)
                    t[r] = e[r]
            }
            function o(e, t, r) {
                return n(e, t, r)
            }
            n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? t.exports = i : (s(i, r),
            r.Buffer = o),
            o.prototype = Object.create(n.prototype),
            s(n, o),
            o.from = function(e, t, r) {
                if ("number" == typeof e)
                    throw new TypeError("Argument must not be a number");
                return n(e, t, r)
            }
            ,
            o.alloc = function(e, t, r) {
                if ("number" != typeof e)
                    throw new TypeError("Argument must be a number");
                var i = n(e);
                return void 0 !== t ? "string" == typeof r ? i.fill(t, r) : i.fill(t) : i.fill(0),
                i
            }
            ,
            o.allocUnsafe = function(e) {
                if ("number" != typeof e)
                    throw new TypeError("Argument must be a number");
                return n(e)
            }
            ,
            o.allocUnsafeSlow = function(e) {
                if ("number" != typeof e)
                    throw new TypeError("Argument must be a number");
                return i.SlowBuffer(e)
            }
        }
        , {
            buffer: 116
        }],
        55: [function(e, t, r) {
            var i = e("safe-buffer").Buffer;
            function n(e, t) {
                this._block = i.alloc(e),
                this._finalSize = t,
                this._blockSize = e,
                this._len = 0
            }
            n.prototype.update = function(e, t) {
                "string" == typeof e && (t = t || "utf8",
                e = i.from(e, t));
                for (var r = this._block, n = this._blockSize, s = e.length, o = this._len, a = 0; a < s; ) {
                    for (var f = o % n, u = Math.min(s - a, n - f), c = 0; c < u; c++)
                        r[f + c] = e[a + c];
                    a += u,
                    (o += u) % n == 0 && this._update(r)
                }
                return this._len += s,
                this
            }
            ,
            n.prototype.digest = function(e) {
                var t = this._len % this._blockSize;
                this._block[t] = 128,
                this._block.fill(0, t + 1),
                t >= this._finalSize && (this._update(this._block),
                this._block.fill(0));
                var r = 8 * this._len;
                if (r <= 4294967295)
                    this._block.writeUInt32BE(r, this._blockSize - 4);
                else {
                    var i = (4294967295 & r) >>> 0
                      , n = (r - i) / 4294967296;
                    this._block.writeUInt32BE(n, this._blockSize - 8),
                    this._block.writeUInt32BE(i, this._blockSize - 4)
                }
                this._update(this._block);
                var s = this._hash();
                return e ? s.toString(e) : s
            }
            ,
            n.prototype._update = function() {
                throw new Error("_update must be implemented by subclass")
            }
            ,
            t.exports = n
        }
        , {
            "safe-buffer": 54
        }],
        56: [function(e, t, r) {
            (r = t.exports = function(e) {
                e = e.toLowerCase();
                var t = r[e];
                if (!t)
                    throw new Error(e + " is not supported (we accept pull requests)");
                return new t
            }
            ).sha = e("./sha"),
            r.sha1 = e("./sha1"),
            r.sha224 = e("./sha224"),
            r.sha256 = e("./sha256"),
            r.sha384 = e("./sha384"),
            r.sha512 = e("./sha512")
        }
        , {
            "./sha": 57,
            "./sha1": 58,
            "./sha224": 59,
            "./sha256": 60,
            "./sha384": 61,
            "./sha512": 62
        }],
        57: [function(e, t, r) {
            var i = e("inherits")
              , n = e("./hash")
              , s = e("safe-buffer").Buffer
              , o = [1518500249, 1859775393, -1894007588, -899497514]
              , a = new Array(80);
            function f() {
                this.init(),
                this._w = a,
                n.call(this, 64, 56)
            }
            function u(e) {
                return e << 30 | e >>> 2
            }
            function c(e, t, r, i) {
                return 0 === e ? t & r | ~t & i : 2 === e ? t & r | t & i | r & i : t ^ r ^ i
            }
            i(f, n),
            f.prototype.init = function() {
                return this._a = 1732584193,
                this._b = 4023233417,
                this._c = 2562383102,
                this._d = 271733878,
                this._e = 3285377520,
                this
            }
            ,
            f.prototype._update = function(e) {
                for (var t, r = this._w, i = 0 | this._a, n = 0 | this._b, s = 0 | this._c, a = 0 | this._d, f = 0 | this._e, h = 0; h < 16; ++h)
                    r[h] = e.readInt32BE(4 * h);
                for (; h < 80; ++h)
                    r[h] = r[h - 3] ^ r[h - 8] ^ r[h - 14] ^ r[h - 16];
                for (var d = 0; d < 80; ++d) {
                    var l = ~~(d / 20)
                      , p = 0 | ((t = i) << 5 | t >>> 27) + c(l, n, s, a) + f + r[d] + o[l];
                    f = a,
                    a = s,
                    s = u(n),
                    n = i,
                    i = p
                }
                this._a = i + this._a | 0,
                this._b = n + this._b | 0,
                this._c = s + this._c | 0,
                this._d = a + this._d | 0,
                this._e = f + this._e | 0
            }
            ,
            f.prototype._hash = function() {
                var e = s.allocUnsafe(20);
                return e.writeInt32BE(0 | this._a, 0),
                e.writeInt32BE(0 | this._b, 4),
                e.writeInt32BE(0 | this._c, 8),
                e.writeInt32BE(0 | this._d, 12),
                e.writeInt32BE(0 | this._e, 16),
                e
            }
            ,
            t.exports = f
        }
        , {
            "./hash": 55,
            inherits: 46,
            "safe-buffer": 54
        }],
        58: [function(e, t, r) {
            var i = e("inherits")
              , n = e("./hash")
              , s = e("safe-buffer").Buffer
              , o = [1518500249, 1859775393, -1894007588, -899497514]
              , a = new Array(80);
            function f() {
                this.init(),
                this._w = a,
                n.call(this, 64, 56)
            }
            function u(e) {
                return e << 5 | e >>> 27
            }
            function c(e) {
                return e << 30 | e >>> 2
            }
            function h(e, t, r, i) {
                return 0 === e ? t & r | ~t & i : 2 === e ? t & r | t & i | r & i : t ^ r ^ i
            }
            i(f, n),
            f.prototype.init = function() {
                return this._a = 1732584193,
                this._b = 4023233417,
                this._c = 2562383102,
                this._d = 271733878,
                this._e = 3285377520,
                this
            }
            ,
            f.prototype._update = function(e) {
                for (var t, r = this._w, i = 0 | this._a, n = 0 | this._b, s = 0 | this._c, a = 0 | this._d, f = 0 | this._e, d = 0; d < 16; ++d)
                    r[d] = e.readInt32BE(4 * d);
                for (; d < 80; ++d)
                    r[d] = (t = r[d - 3] ^ r[d - 8] ^ r[d - 14] ^ r[d - 16]) << 1 | t >>> 31;
                for (var l = 0; l < 80; ++l) {
                    var p = ~~(l / 20)
                      , b = u(i) + h(p, n, s, a) + f + r[l] + o[p] | 0;
                    f = a,
                    a = s,
                    s = c(n),
                    n = i,
                    i = b
                }
                this._a = i + this._a | 0,
                this._b = n + this._b | 0,
                this._c = s + this._c | 0,
                this._d = a + this._d | 0,
                this._e = f + this._e | 0
            }
            ,
            f.prototype._hash = function() {
                var e = s.allocUnsafe(20);
                return e.writeInt32BE(0 | this._a, 0),
                e.writeInt32BE(0 | this._b, 4),
                e.writeInt32BE(0 | this._c, 8),
                e.writeInt32BE(0 | this._d, 12),
                e.writeInt32BE(0 | this._e, 16),
                e
            }
            ,
            t.exports = f
        }
        , {
            "./hash": 55,
            inherits: 46,
            "safe-buffer": 54
        }],
        59: [function(e, t, r) {
            var i = e("inherits")
              , n = e("./sha256")
              , s = e("./hash")
              , o = e("safe-buffer").Buffer
              , a = new Array(64);
            function f() {
                this.init(),
                this._w = a,
                s.call(this, 64, 56)
            }
            i(f, n),
            f.prototype.init = function() {
                return this._a = 3238371032,
                this._b = 914150663,
                this._c = 812702999,
                this._d = 4144912697,
                this._e = 4290775857,
                this._f = 1750603025,
                this._g = 1694076839,
                this._h = 3204075428,
                this
            }
            ,
            f.prototype._hash = function() {
                var e = o.allocUnsafe(28);
                return e.writeInt32BE(this._a, 0),
                e.writeInt32BE(this._b, 4),
                e.writeInt32BE(this._c, 8),
                e.writeInt32BE(this._d, 12),
                e.writeInt32BE(this._e, 16),
                e.writeInt32BE(this._f, 20),
                e.writeInt32BE(this._g, 24),
                e
            }
            ,
            t.exports = f
        }
        , {
            "./hash": 55,
            "./sha256": 60,
            inherits: 46,
            "safe-buffer": 54
        }],
        60: [function(e, t, r) {
            var i = e("inherits")
              , n = e("./hash")
              , s = e("safe-buffer").Buffer
              , o = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]
              , a = new Array(64);
            function f() {
                this.init(),
                this._w = a,
                n.call(this, 64, 56)
            }
            function u(e, t, r) {
                return r ^ e & (t ^ r)
            }
            function c(e, t, r) {
                return e & t | r & (e | t)
            }
            function h(e) {
                return (e >>> 2 | e << 30) ^ (e >>> 13 | e << 19) ^ (e >>> 22 | e << 10)
            }
            function d(e) {
                return (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7)
            }
            function l(e) {
                return (e >>> 7 | e << 25) ^ (e >>> 18 | e << 14) ^ e >>> 3
            }
            i(f, n),
            f.prototype.init = function() {
                return this._a = 1779033703,
                this._b = 3144134277,
                this._c = 1013904242,
                this._d = 2773480762,
                this._e = 1359893119,
                this._f = 2600822924,
                this._g = 528734635,
                this._h = 1541459225,
                this
            }
            ,
            f.prototype._update = function(e) {
                for (var t, r = this._w, i = 0 | this._a, n = 0 | this._b, s = 0 | this._c, a = 0 | this._d, f = 0 | this._e, p = 0 | this._f, b = 0 | this._g, m = 0 | this._h, y = 0; y < 16; ++y)
                    r[y] = e.readInt32BE(4 * y);
                for (; y < 64; ++y)
                    r[y] = 0 | (((t = r[y - 2]) >>> 17 | t << 15) ^ (t >>> 19 | t << 13) ^ t >>> 10) + r[y - 7] + l(r[y - 15]) + r[y - 16];
                for (var g = 0; g < 64; ++g) {
                    var v = m + d(f) + u(f, p, b) + o[g] + r[g] | 0
                      , w = h(i) + c(i, n, s) | 0;
                    m = b,
                    b = p,
                    p = f,
                    f = a + v | 0,
                    a = s,
                    s = n,
                    n = i,
                    i = v + w | 0
                }
                this._a = i + this._a | 0,
                this._b = n + this._b | 0,
                this._c = s + this._c | 0,
                this._d = a + this._d | 0,
                this._e = f + this._e | 0,
                this._f = p + this._f | 0,
                this._g = b + this._g | 0,
                this._h = m + this._h | 0
            }
            ,
            f.prototype._hash = function() {
                var e = s.allocUnsafe(32);
                return e.writeInt32BE(this._a, 0),
                e.writeInt32BE(this._b, 4),
                e.writeInt32BE(this._c, 8),
                e.writeInt32BE(this._d, 12),
                e.writeInt32BE(this._e, 16),
                e.writeInt32BE(this._f, 20),
                e.writeInt32BE(this._g, 24),
                e.writeInt32BE(this._h, 28),
                e
            }
            ,
            t.exports = f
        }
        , {
            "./hash": 55,
            inherits: 46,
            "safe-buffer": 54
        }],
        61: [function(e, t, r) {
            var i = e("inherits")
              , n = e("./sha512")
              , s = e("./hash")
              , o = e("safe-buffer").Buffer
              , a = new Array(160);
            function f() {
                this.init(),
                this._w = a,
                s.call(this, 128, 112)
            }
            i(f, n),
            f.prototype.init = function() {
                return this._ah = 3418070365,
                this._bh = 1654270250,
                this._ch = 2438529370,
                this._dh = 355462360,
                this._eh = 1731405415,
                this._fh = 2394180231,
                this._gh = 3675008525,
                this._hh = 1203062813,
                this._al = 3238371032,
                this._bl = 914150663,
                this._cl = 812702999,
                this._dl = 4144912697,
                this._el = 4290775857,
                this._fl = 1750603025,
                this._gl = 1694076839,
                this._hl = 3204075428,
                this
            }
            ,
            f.prototype._hash = function() {
                var e = o.allocUnsafe(48);
                function t(t, r, i) {
                    e.writeInt32BE(t, i),
                    e.writeInt32BE(r, i + 4)
                }
                return t(this._ah, this._al, 0),
                t(this._bh, this._bl, 8),
                t(this._ch, this._cl, 16),
                t(this._dh, this._dl, 24),
                t(this._eh, this._el, 32),
                t(this._fh, this._fl, 40),
                e
            }
            ,
            t.exports = f
        }
        , {
            "./hash": 55,
            "./sha512": 62,
            inherits: 46,
            "safe-buffer": 54
        }],
        62: [function(e, t, r) {
            var i = e("inherits")
              , n = e("./hash")
              , s = e("safe-buffer").Buffer
              , o = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591]
              , a = new Array(160);
            function f() {
                this.init(),
                this._w = a,
                n.call(this, 128, 112)
            }
            function u(e, t, r) {
                return r ^ e & (t ^ r)
            }
            function c(e, t, r) {
                return e & t | r & (e | t)
            }
            function h(e, t) {
                return (e >>> 28 | t << 4) ^ (t >>> 2 | e << 30) ^ (t >>> 7 | e << 25)
            }
            function d(e, t) {
                return (e >>> 14 | t << 18) ^ (e >>> 18 | t << 14) ^ (t >>> 9 | e << 23)
            }
            function l(e, t) {
                return (e >>> 1 | t << 31) ^ (e >>> 8 | t << 24) ^ e >>> 7
            }
            function p(e, t) {
                return (e >>> 1 | t << 31) ^ (e >>> 8 | t << 24) ^ (e >>> 7 | t << 25)
            }
            function b(e, t) {
                return (e >>> 19 | t << 13) ^ (t >>> 29 | e << 3) ^ e >>> 6
            }
            function m(e, t) {
                return (e >>> 19 | t << 13) ^ (t >>> 29 | e << 3) ^ (e >>> 6 | t << 26)
            }
            function y(e, t) {
                return e >>> 0 < t >>> 0 ? 1 : 0
            }
            i(f, n),
            f.prototype.init = function() {
                return this._ah = 1779033703,
                this._bh = 3144134277,
                this._ch = 1013904242,
                this._dh = 2773480762,
                this._eh = 1359893119,
                this._fh = 2600822924,
                this._gh = 528734635,
                this._hh = 1541459225,
                this._al = 4089235720,
                this._bl = 2227873595,
                this._cl = 4271175723,
                this._dl = 1595750129,
                this._el = 2917565137,
                this._fl = 725511199,
                this._gl = 4215389547,
                this._hl = 327033209,
                this
            }
            ,
            f.prototype._update = function(e) {
                for (var t = this._w, r = 0 | this._ah, i = 0 | this._bh, n = 0 | this._ch, s = 0 | this._dh, a = 0 | this._eh, f = 0 | this._fh, g = 0 | this._gh, v = 0 | this._hh, w = 0 | this._al, _ = 0 | this._bl, S = 0 | this._cl, M = 0 | this._dl, E = 0 | this._el, k = 0 | this._fl, O = 0 | this._gl, P = 0 | this._hl, A = 0; A < 32; A += 2)
                    t[A] = e.readInt32BE(4 * A),
                    t[A + 1] = e.readInt32BE(4 * A + 4);
                for (; A < 160; A += 2) {
                    var I = t[A - 30]
                      , x = t[A - 30 + 1]
                      , T = l(I, x)
                      , N = p(x, I)
                      , B = b(I = t[A - 4], x = t[A - 4 + 1])
                      , R = m(x, I)
                      , L = t[A - 14]
                      , j = t[A - 14 + 1]
                      , U = t[A - 32]
                      , q = t[A - 32 + 1]
                      , C = N + j | 0
                      , H = T + L + y(C, N) | 0;
                    H = (H = H + B + y(C = C + R | 0, R) | 0) + U + y(C = C + q | 0, q) | 0,
                    t[A] = H,
                    t[A + 1] = C
                }
                for (var z = 0; z < 160; z += 2) {
                    H = t[z],
                    C = t[z + 1];
                    var D = c(r, i, n)
                      , W = c(w, _, S)
                      , F = h(r, w)
                      , K = h(w, r)
                      , V = d(a, E)
                      , J = d(E, a)
                      , G = o[z]
                      , X = o[z + 1]
                      , Z = u(a, f, g)
                      , $ = u(E, k, O)
                      , Y = P + J | 0
                      , Q = v + V + y(Y, P) | 0;
                    Q = (Q = (Q = Q + Z + y(Y = Y + $ | 0, $) | 0) + G + y(Y = Y + X | 0, X) | 0) + H + y(Y = Y + C | 0, C) | 0;
                    var ee = K + W | 0
                      , te = F + D + y(ee, K) | 0;
                    v = g,
                    P = O,
                    g = f,
                    O = k,
                    f = a,
                    k = E,
                    a = s + Q + y(E = M + Y | 0, M) | 0,
                    s = n,
                    M = S,
                    n = i,
                    S = _,
                    i = r,
                    _ = w,
                    r = Q + te + y(w = Y + ee | 0, Y) | 0
                }
                this._al = this._al + w | 0,
                this._bl = this._bl + _ | 0,
                this._cl = this._cl + S | 0,
                this._dl = this._dl + M | 0,
                this._el = this._el + E | 0,
                this._fl = this._fl + k | 0,
                this._gl = this._gl + O | 0,
                this._hl = this._hl + P | 0,
                this._ah = this._ah + r + y(this._al, w) | 0,
                this._bh = this._bh + i + y(this._bl, _) | 0,
                this._ch = this._ch + n + y(this._cl, S) | 0,
                this._dh = this._dh + s + y(this._dl, M) | 0,
                this._eh = this._eh + a + y(this._el, E) | 0,
                this._fh = this._fh + f + y(this._fl, k) | 0,
                this._gh = this._gh + g + y(this._gl, O) | 0,
                this._hh = this._hh + v + y(this._hl, P) | 0
            }
            ,
            f.prototype._hash = function() {
                var e = s.allocUnsafe(64);
                function t(t, r, i) {
                    e.writeInt32BE(t, i),
                    e.writeInt32BE(r, i + 4)
                }
                return t(this._ah, this._al, 0),
                t(this._bh, this._bl, 8),
                t(this._ch, this._cl, 16),
                t(this._dh, this._dl, 24),
                t(this._eh, this._el, 32),
                t(this._fh, this._fl, 40),
                t(this._gh, this._gl, 48),
                t(this._hh, this._hl, 56),
                e
            }
            ,
            t.exports = f
        }
        , {
            "./hash": 55,
            inherits: 46,
            "safe-buffer": 54
        }],
        63: [function(e, t, r) {
            (function(r) {
                const i = e("bn.js")
                  , n = new (0,
                e("elliptic").ec)("secp256k1")
                  , s = e("./rfc6979")
                  , o = r.alloc(32, 0)
                  , a = r.from("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141", "hex")
                  , f = r.from("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f", "hex")
                  , u = n.curve.n
                  , c = u.shrn(1)
                  , h = n.curve.g
                  , d = "Expected Private"
                  , l = "Expected Point"
                  , p = "Expected Tweak"
                  , b = "Expected Hash"
                  , m = "Expected Signature"
                  , y = "Expected Extra Data (32 bytes)";
                function g(e) {
                    return r.isBuffer(e) && 32 === e.length
                }
                function v(e) {
                    return !!g(e) && e.compare(a) < 0
                }
                function w(e) {
                    if (!r.isBuffer(e))
                        return !1;
                    if (e.length < 33)
                        return !1;
                    const t = e[0]
                      , i = e.slice(1, 33);
                    if (0 === i.compare(o))
                        return !1;
                    if (i.compare(f) >= 0)
                        return !1;
                    if ((2 === t || 3 === t) && 33 === e.length) {
                        try {
                            O(e)
                        } catch (e) {
                            return !1
                        }
                        return !0
                    }
                    const n = e.slice(33);
                    return 0 !== n.compare(o) && (!(n.compare(f) >= 0) && (4 === t && 65 === e.length))
                }
                function _(e) {
                    return 4 !== e[0]
                }
                function S(e) {
                    return !!g(e) && (e.compare(o) > 0 && e.compare(a) < 0)
                }
                function M(e, t) {
                    return void 0 === e && void 0 !== t ? _(t) : void 0 === e || e
                }
                function E(e) {
                    return new i(e)
                }
                function k(e) {
                    return e.toArrayLike(r, "be", 32)
                }
                function O(e) {
                    return n.curve.decodePoint(e)
                }
                function P(e, t) {
                    return r.from(e._encode(t))
                }
                function A(e, t, i) {
                    if (!g(e))
                        throw new TypeError(b);
                    if (!S(t))
                        throw new TypeError(d);
                    if (void 0 !== i && !g(i))
                        throw new TypeError(y);
                    const n = E(t)
                      , o = E(e);
                    let a, f;
                    s(e, t, function(e) {
                        const t = E(e)
                          , r = h.mul(t);
                        return !r.isInfinity() && 0 !== (a = r.x.umod(u)).isZero() && 0 !== (f = t.invm(u).mul(o.add(n.mul(a))).umod(u)).isZero()
                    }, S, i),
                    f.cmp(c) > 0 && (f = u.sub(f));
                    const l = r.allocUnsafe(64);
                    return k(a).copy(l, 0),
                    k(f).copy(l, 32),
                    l
                }
                t.exports = {
                    isPoint: w,
                    isPointCompressed: function(e) {
                        return !!w(e) && _(e)
                    },
                    isPrivate: S,
                    pointAdd: function(e, t, r) {
                        if (!w(e))
                            throw new TypeError(l);
                        if (!w(t))
                            throw new TypeError(l);
                        const i = O(e)
                          , n = O(t)
                          , s = i.add(n);
                        return s.isInfinity() ? null : P(s, M(r, e))
                    },
                    pointAddScalar: function(e, t, r) {
                        if (!w(e))
                            throw new TypeError(l);
                        if (!v(t))
                            throw new TypeError(p);
                        const i = M(r, e)
                          , n = O(e);
                        if (0 === t.compare(o))
                            return P(n, i);
                        const s = E(t)
                          , a = h.mul(s)
                          , f = n.add(a);
                        return f.isInfinity() ? null : P(f, i)
                    },
                    pointCompress: function(e, t) {
                        if (!w(e))
                            throw new TypeError(l);
                        const r = O(e);
                        if (r.isInfinity())
                            throw new TypeError(l);
                        return P(r, t)
                    },
                    pointFromScalar: function(e, t) {
                        if (!S(e))
                            throw new TypeError(d);
                        const r = E(e)
                          , i = h.mul(r);
                        return i.isInfinity() ? null : P(i, M(t))
                    },
                    pointMultiply: function(e, t, r) {
                        if (!w(e))
                            throw new TypeError(l);
                        if (!v(t))
                            throw new TypeError(p);
                        const i = M(r, e)
                          , n = O(e)
                          , s = E(t)
                          , o = n.mul(s);
                        return o.isInfinity() ? null : P(o, i)
                    },
                    privateAdd: function(e, t) {
                        if (!S(e))
                            throw new TypeError(d);
                        if (!v(t))
                            throw new TypeError(p);
                        const r = E(e)
                          , i = E(t)
                          , n = k(r.add(i).umod(u));
                        return S(n) ? n : null
                    },
                    privateSub: function(e, t) {
                        if (!S(e))
                            throw new TypeError(d);
                        if (!v(t))
                            throw new TypeError(p);
                        const r = E(e)
                          , i = E(t)
                          , n = k(r.sub(i).umod(u));
                        return S(n) ? n : null
                    },
                    sign: function(e, t) {
                        return A(e, t)
                    },
                    signWithEntropy: function(e, t, r) {
                        return A(e, t, r)
                    },
                    verify: function(e, t, i) {
                        if (!g(e))
                            throw new TypeError(b);
                        if (!w(t))
                            throw new TypeError(l);
                        if (!function(e) {
                            const t = e.slice(0, 32)
                              , i = e.slice(32, 64);
                            return r.isBuffer(e) && 64 === e.length && t.compare(a) < 0 && i.compare(a) < 0
                        }(i))
                            throw new TypeError(m);
                        const n = O(t)
                          , s = E(i.slice(0, 32))
                          , o = E(i.slice(32, 64));
                        if (s.gtn(0) <= 0)
                            return !1;
                        if (o.gtn(0) <= 0)
                            return !1;
                        const f = E(e)
                          , c = o.invm(u)
                          , d = f.mul(c).umod(u)
                          , p = s.mul(c).umod(u)
                          , y = h.mulAdd(d, n, p);
                        return !y.isInfinity() && y.x.umod(u).eq(s)
                    }
                }
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            "./rfc6979": 64,
            "bn.js": 6,
            buffer: 116,
            elliptic: 16
        }],
        64: [function(e, t, r) {
            (function(r) {
                const i = e("create-hmac")
                  , n = r.alloc(1, 1)
                  , s = r.alloc(1, 0);
                t.exports = function(e, t, o, a, f) {
                    let u = r.alloc(32, 0)
                      , c = r.alloc(32, 1);
                    u = i("sha256", u).update(c).update(s).update(t).update(e).update(f || "").digest(),
                    c = i("sha256", u).update(c).digest(),
                    u = i("sha256", u).update(c).update(n).update(t).update(e).update(f || "").digest(),
                    c = i("sha256", u).update(c).digest();
                    let h = c = i("sha256", u).update(c).digest();
                    for (; !a(h) || !o(h); )
                        u = i("sha256", u).update(c).update(s).digest(),
                        c = i("sha256", u).update(c).digest(),
                        h = c = i("sha256", u).update(c).digest();
                    return h
                }
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            buffer: 116,
            "create-hmac": 14
        }],
        65: [function(e, t, r) {
            var i = e("./native");
            function n(e) {
                return e.name || e.toString().match(/function (.*?)\s*\(/)[1]
            }
            function s(e) {
                return i.Nil(e) ? "" : n(e.constructor)
            }
            function o(e, t) {
                Error.captureStackTrace && Error.captureStackTrace(e, t)
            }
            function a(e) {
                return i.Function(e) ? e.toJSON ? e.toJSON() : n(e) : i.Array(e) ? "Array" : e && i.Object(e) ? "Object" : void 0 !== e ? e : ""
            }
            function f(e, t, r) {
                var n = function(e) {
                    return i.Function(e) ? "" : i.String(e) ? JSON.stringify(e) : e && i.Object(e) ? "" : e
                }(t);
                return "Expected " + a(e) + ", got" + ("" !== r ? " " + r : "") + ("" !== n ? " " + n : "")
            }
            function u(e, t, r) {
                r = r || s(t),
                this.message = f(e, t, r),
                o(this, u),
                this.__type = e,
                this.__value = t,
                this.__valueTypeName = r
            }
            function c(e, t, r, i, n) {
                e ? (n = n || s(i),
                this.message = function(e, t, r, i, n) {
                    var s = '" of type ';
                    return "key" === t && (s = '" with key type '),
                    f('property "' + a(r) + s + a(e), i, n)
                }(e, r, t, i, n)) : this.message = 'Unexpected property "' + t + '"',
                o(this, u),
                this.__label = r,
                this.__property = t,
                this.__type = e,
                this.__value = i,
                this.__valueTypeName = n
            }
            u.prototype = Object.create(Error.prototype),
            u.prototype.constructor = u,
            c.prototype = Object.create(Error.prototype),
            c.prototype.constructor = u,
            t.exports = {
                TfTypeError: u,
                TfPropertyTypeError: c,
                tfCustomError: function(e, t) {
                    return new u(e,{},t)
                },
                tfSubError: function(e, t, r) {
                    return e instanceof c ? (t = t + "." + e.__property,
                    e = new c(e.__type,t,e.__label,e.__value,e.__valueTypeName)) : e instanceof u && (e = new c(e.__type,t,r,e.__value,e.__valueTypeName)),
                    o(e),
                    e
                },
                tfJSON: a,
                getValueTypeName: s
            }
        }
        , {
            "./native": 68
        }],
        66: [function(e, t, r) {
            (function(r) {
                var i = e("./native")
                  , n = e("./errors");
                function s(e) {
                    return r.isBuffer(e)
                }
                function o(e) {
                    return "string" == typeof e && /^([0-9a-f]{2})+$/i.test(e)
                }
                function a(e, t) {
                    var r = e.toJSON();
                    function i(i) {
                        if (!e(i))
                            return !1;
                        if (i.length === t)
                            return !0;
                        throw n.tfCustomError(r + "(Length: " + t + ")", r + "(Length: " + i.length + ")")
                    }
                    return i.toJSON = function() {
                        return r
                    }
                    ,
                    i
                }
                var f = a.bind(null, i.Array)
                  , u = a.bind(null, s)
                  , c = a.bind(null, o)
                  , h = a.bind(null, i.String);
                var d = Math.pow(2, 53) - 1;
                var l = {
                    ArrayN: f,
                    Buffer: s,
                    BufferN: u,
                    Finite: function(e) {
                        return "number" == typeof e && isFinite(e)
                    },
                    Hex: o,
                    HexN: c,
                    Int8: function(e) {
                        return e << 24 >> 24 === e
                    },
                    Int16: function(e) {
                        return e << 16 >> 16 === e
                    },
                    Int32: function(e) {
                        return (0 | e) === e
                    },
                    Int53: function(e) {
                        return "number" == typeof e && e >= -d && e <= d && Math.floor(e) === e
                    },
                    Range: function(e, t, r) {
                        function n(i, n) {
                            return r(i, n) && i > e && i < t
                        }
                        return r = r || i.Number,
                        n.toJSON = function() {
                            return `${r.toJSON()} between [${e}, ${t}]`
                        }
                        ,
                        n
                    },
                    StringN: h,
                    UInt8: function(e) {
                        return (255 & e) === e
                    },
                    UInt16: function(e) {
                        return (65535 & e) === e
                    },
                    UInt32: function(e) {
                        return e >>> 0 === e
                    },
                    UInt53: function(e) {
                        return "number" == typeof e && e >= 0 && e <= d && Math.floor(e) === e
                    }
                };
                for (var p in l)
                    l[p].toJSON = function(e) {
                        return e
                    }
                    .bind(null, p);
                t.exports = l
            }
            ).call(this, {
                isBuffer: e("../../../../../../usr/local/lib/node_modules/browserify/node_modules/is-buffer/index.js")
            })
        }
        , {
            "../../../../../../usr/local/lib/node_modules/browserify/node_modules/is-buffer/index.js": 121,
            "./errors": 65,
            "./native": 68
        }],
        67: [function(e, t, r) {
            var i = e("./errors")
              , n = e("./native")
              , s = i.tfJSON
              , o = i.TfTypeError
              , a = i.TfPropertyTypeError
              , f = i.tfSubError
              , u = i.getValueTypeName
              , c = {
                arrayOf: function(e, t) {
                    function r(r, i) {
                        return !!n.Array(r) && (!n.Nil(r) && (!(void 0 !== t.minLength && r.length < t.minLength) && (!(void 0 !== t.maxLength && r.length > t.maxLength) && ((void 0 === t.length || r.length === t.length) && r.every(function(t, r) {
                            try {
                                return d(e, t, i)
                            } catch (e) {
                                throw f(e, r)
                            }
                        })))))
                    }
                    return e = h(e),
                    t = t || {},
                    r.toJSON = function() {
                        var r = "[" + s(e) + "]";
                        return void 0 !== t.length ? r += "{" + t.length + "}" : void 0 === t.minLength && void 0 === t.maxLength || (r += "{" + (void 0 === t.minLength ? 0 : t.minLength) + "," + (void 0 === t.maxLength ? 1 / 0 : t.maxLength) + "}"),
                        r
                    }
                    ,
                    r
                },
                maybe: function e(t) {
                    function r(r, i) {
                        return n.Nil(r) || t(r, i, e)
                    }
                    return t = h(t),
                    r.toJSON = function() {
                        return "?" + s(t)
                    }
                    ,
                    r
                },
                map: function(e, t) {
                    function r(r, i) {
                        if (!n.Object(r))
                            return !1;
                        if (n.Nil(r))
                            return !1;
                        for (var s in r) {
                            try {
                                t && d(t, s, i)
                            } catch (e) {
                                throw f(e, s, "key")
                            }
                            try {
                                var o = r[s];
                                d(e, o, i)
                            } catch (e) {
                                throw f(e, s)
                            }
                        }
                        return !0
                    }
                    return e = h(e),
                    t && (t = h(t)),
                    r.toJSON = t ? function() {
                        return "{" + s(t) + ": " + s(e) + "}"
                    }
                    : function() {
                        return "{" + s(e) + "}"
                    }
                    ,
                    r
                },
                object: function(e) {
                    var t = {};
                    for (var r in e)
                        t[r] = h(e[r]);
                    function i(e, r) {
                        if (!n.Object(e))
                            return !1;
                        if (n.Nil(e))
                            return !1;
                        var i;
                        try {
                            for (i in t) {
                                d(t[i], e[i], r)
                            }
                        } catch (e) {
                            throw f(e, i)
                        }
                        if (r)
                            for (i in e)
                                if (!t[i])
                                    throw new a(void 0,i);
                        return !0
                    }
                    return i.toJSON = function() {
                        return s(t)
                    }
                    ,
                    i
                },
                anyOf: function() {
                    var e = [].slice.call(arguments).map(h);
                    function t(t, r) {
                        return e.some(function(e) {
                            try {
                                return d(e, t, r)
                            } catch (e) {
                                return !1
                            }
                        })
                    }
                    return t.toJSON = function() {
                        return e.map(s).join("|")
                    }
                    ,
                    t
                },
                allOf: function() {
                    var e = [].slice.call(arguments).map(h);
                    function t(t, r) {
                        return e.every(function(e) {
                            try {
                                return d(e, t, r)
                            } catch (e) {
                                return !1
                            }
                        })
                    }
                    return t.toJSON = function() {
                        return e.map(s).join(" & ")
                    }
                    ,
                    t
                },
                quacksLike: function(e) {
                    function t(t) {
                        return e === u(t)
                    }
                    return t.toJSON = function() {
                        return e
                    }
                    ,
                    t
                },
                tuple: function() {
                    var e = [].slice.call(arguments).map(h);
                    function t(t, r) {
                        return !n.Nil(t) && (!n.Nil(t.length) && ((!r || t.length === e.length) && e.every(function(e, i) {
                            try {
                                return d(e, t[i], r)
                            } catch (e) {
                                throw f(e, i)
                            }
                        })))
                    }
                    return t.toJSON = function() {
                        return "(" + e.map(s).join(", ") + ")"
                    }
                    ,
                    t
                },
                value: function(e) {
                    function t(t) {
                        return t === e
                    }
                    return t.toJSON = function() {
                        return e
                    }
                    ,
                    t
                }
            };
            function h(e) {
                if (n.String(e))
                    return "?" === e[0] ? c.maybe(e.slice(1)) : n[e] || c.quacksLike(e);
                if (e && n.Object(e)) {
                    if (n.Array(e)) {
                        if (1 !== e.length)
                            throw new TypeError("Expected compile() parameter of type Array of length 1");
                        return c.arrayOf(e[0])
                    }
                    return c.object(e)
                }
                return n.Function(e) ? e : c.value(e)
            }
            function d(e, t, r, i) {
                if (n.Function(e)) {
                    if (e(t, r))
                        return !0;
                    throw new o(i || e,t)
                }
                return d(h(e), t, r)
            }
            for (var l in c.oneOf = c.anyOf,
            n)
                d[l] = n[l];
            for (l in c)
                d[l] = c[l];
            var p = e("./extra");
            for (l in p)
                d[l] = p[l];
            d.compile = h,
            d.TfTypeError = o,
            d.TfPropertyTypeError = a,
            t.exports = d
        }
        , {
            "./errors": 65,
            "./extra": 66,
            "./native": 68
        }],
        68: [function(e, t, r) {
            var i = {
                Array: function(e) {
                    return null !== e && void 0 !== e && e.constructor === Array
                },
                Boolean: function(e) {
                    return "boolean" == typeof e
                },
                Function: function(e) {
                    return "function" == typeof e
                },
                Nil: function(e) {
                    return void 0 === e || null === e
                },
                Number: function(e) {
                    return "number" == typeof e
                },
                Object: function(e) {
                    return "object" == typeof e
                },
                String: function(e) {
                    return "string" == typeof e
                },
                "": function() {
                    return !0
                }
            };
            for (var n in i.Null = i.Nil,
            i)
                i[n].toJSON = function(e) {
                    return e
                }
                .bind(null, n);
            t.exports = i
        }
        , {}],
        69: [function(e, t, r) {
            "use strict";
            var i = e("safe-buffer").Buffer
              , n = 9007199254740991;
            function s(e) {
                if (e < 0 || e > n || e % 1 != 0)
                    throw new RangeError("value out of range")
            }
            function o(e) {
                return s(e),
                e < 253 ? 1 : e <= 65535 ? 3 : e <= 4294967295 ? 5 : 9
            }
            t.exports = {
                encode: function e(t, r, n) {
                    if (s(t),
                    r || (r = i.allocUnsafe(o(t))),
                    !i.isBuffer(r))
                        throw new TypeError("buffer must be a Buffer instance");
                    return n || (n = 0),
                    t < 253 ? (r.writeUInt8(t, n),
                    e.bytes = 1) : t <= 65535 ? (r.writeUInt8(253, n),
                    r.writeUInt16LE(t, n + 1),
                    e.bytes = 3) : t <= 4294967295 ? (r.writeUInt8(254, n),
                    r.writeUInt32LE(t, n + 1),
                    e.bytes = 5) : (r.writeUInt8(255, n),
                    r.writeUInt32LE(t >>> 0, n + 1),
                    r.writeUInt32LE(t / 4294967296 | 0, n + 5),
                    e.bytes = 9),
                    r
                },
                decode: function e(t, r) {
                    if (!i.isBuffer(t))
                        throw new TypeError("buffer must be a Buffer instance");
                    r || (r = 0);
                    var n = t.readUInt8(r);
                    if (n < 253)
                        return e.bytes = 1,
                        n;
                    if (253 === n)
                        return e.bytes = 3,
                        t.readUInt16LE(r + 1);
                    if (254 === n)
                        return e.bytes = 5,
                        t.readUInt32LE(r + 1);
                    e.bytes = 9;
                    var o = t.readUInt32LE(r + 1)
                      , a = 4294967296 * t.readUInt32LE(r + 5) + o;
                    return s(a),
                    a
                },
                encodingLength: o
            }
        }
        , {
            "safe-buffer": 54
        }],
        70: [function(e, t, r) {
            (function(r) {
                var i = e("bs58check");
                function n(e, t) {
                    if (void 0 !== t && e[0] !== t)
                        throw new Error("Invalid network version");
                    if (33 === e.length)
                        return {
                            version: e[0],
                            privateKey: e.slice(1, 33),
                            compressed: !1
                        };
                    if (34 !== e.length)
                        throw new Error("Invalid WIF length");
                    if (1 !== e[33])
                        throw new Error("Invalid compression flag");
                    return {
                        version: e[0],
                        privateKey: e.slice(1, 33),
                        compressed: !0
                    }
                }
                function s(e, t, i) {
                    var n = new r(i ? 34 : 33);
                    return n.writeUInt8(e, 0),
                    t.copy(n, 1),
                    i && (n[33] = 1),
                    n
                }
                t.exports = {
                    decode: function(e, t) {
                        return n(i.decode(e), t)
                    },
                    decodeRaw: n,
                    encode: function(e, t, r) {
                        return "number" == typeof e ? i.encode(s(e, t, r)) : i.encode(s(e.version, e.privateKey, e.compressed))
                    },
                    encodeRaw: s
                }
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            bs58check: 10,
            buffer: 116
        }],
        71: [function(e, t, r) {
            (function(t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                    value: !0
                });
                const i = e("./networks")
                  , n = e("./payments")
                  , s = e("./script")
                  , o = e("./types")
                  , a = e("bech32")
                  , f = e("bs58check")
                  , u = e("typeforce");
                function c(e) {
                    const t = f.decode(e);
                    if (t.length < 21)
                        throw new TypeError(e + " is too short");
                    if (t.length > 21)
                        throw new TypeError(e + " is too long");
                    return {
                        version: t.readUInt8(0),
                        hash: t.slice(1)
                    }
                }
                function h(e) {
                    const r = a.decode(e)
                      , i = a.fromWords(r.words.slice(1));
                    return {
                        version: r.words[0],
                        prefix: r.prefix,
                        data: t.from(i)
                    }
                }
                r.fromBase58Check = c,
                r.fromBech32 = h,
                r.toBase58Check = function(e, r) {
                    u(o.tuple(o.Hash160bit, o.UInt8), arguments);
                    const i = t.allocUnsafe(21);
                    return i.writeUInt8(r, 0),
                    e.copy(i, 1),
                    f.encode(i)
                }
                ,
                r.toBech32 = function(e, t, r) {
                    const i = a.toWords(e);
                    return i.unshift(t),
                    a.encode(r, i)
                }
                ,
                r.fromOutputScript = function(e, t) {
                    t = t || i.bitcoin;
                    try {
                        return n.p2pkh({
                            output: e,
                            network: t
                        }).address
                    } catch (e) {}
                    try {
                        return n.p2sh({
                            output: e,
                            network: t
                        }).address
                    } catch (e) {}
                    try {
                        return n.p2wpkh({
                            output: e,
                            network: t
                        }).address
                    } catch (e) {}
                    try {
                        return n.p2wsh({
                            output: e,
                            network: t
                        }).address
                    } catch (e) {}
                    throw new Error(s.toASM(e) + " has no matching Address")
                }
                ,
                r.toOutputScript = function(e, t) {
                    let r, s;
                    t = t || i.bitcoin;
                    try {
                        r = c(e)
                    } catch (e) {}
                    if (r) {
                        if (r.version === t.pubKeyHash)
                            return n.p2pkh({
                                hash: r.hash
                            }).output;
                        if (r.version === t.scriptHash)
                            return n.p2sh({
                                hash: r.hash
                            }).output
                    } else {
                        try {
                            s = h(e)
                        } catch (e) {}
                        if (s) {
                            if (s.prefix !== t.bech32)
                                throw new Error(e + " has an invalid prefix");
                            if (0 === s.version) {
                                if (20 === s.data.length)
                                    return n.p2wpkh({
                                        hash: s.data
                                    }).output;
                                if (32 === s.data.length)
                                    return n.p2wsh({
                                        hash: s.data
                                    }).output
                            }
                        }
                    }
                    throw new Error(e + " has no matching Script")
                }
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            "./networks": 77,
            "./payments": 79,
            "./script": 87,
            "./types": 113,
            bech32: 2,
            bs58check: 10,
            buffer: 116,
            typeforce: 67
        }],
        72: [function(e, t, r) {
            (function(t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                    value: !0
                });
                const i = e("./bufferutils")
                  , n = e("./crypto")
                  , s = e("./transaction")
                  , o = e("./types")
                  , a = e("merkle-lib/fastRoot")
                  , f = e("typeforce")
                  , u = e("varuint-bitcoin")
                  , c = new TypeError("Cannot compute merkle root for zero transactions")
                  , h = new TypeError("Cannot compute witness commit for non-segwit block");
                class d {
                    constructor() {
                        this.version = 1,
                        this.prevHash = void 0,
                        this.merkleRoot = void 0,
                        this.timestamp = 0,
                        this.witnessCommit = void 0,
                        this.bits = 0,
                        this.nonce = 0,
                        this.transactions = void 0
                    }
                    static fromBuffer(e) {
                        if (e.length < 80)
                            throw new Error("Buffer too small (< 80 bytes)");
                        let t = 0;
                        const r = r => (t += r,
                        e.slice(t - r, t))
                          , i = () => {
                            const r = e.readUInt32LE(t);
                            return t += 4,
                            r
                        }
                          , n = new d;
                        if (n.version = ( () => {
                            const r = e.readInt32LE(t);
                            return t += 4,
                            r
                        }
                        )(),
                        n.prevHash = r(32),
                        n.merkleRoot = r(32),
                        n.timestamp = i(),
                        n.bits = i(),
                        n.nonce = i(),
                        80 === e.length)
                            return n;
                        const o = () => {
                            const r = s.Transaction.fromBuffer(e.slice(t), !0);
                            return t += r.byteLength(),
                            r
                        }
                          , a = ( () => {
                            const r = u.decode(e, t);
                            return t += u.decode.bytes,
                            r
                        }
                        )();
                        n.transactions = [];
                        for (let e = 0; e < a; ++e) {
                            const e = o();
                            n.transactions.push(e)
                        }
                        const f = n.getWitnessCommit();
                        return f && (n.witnessCommit = f),
                        n
                    }
                    static fromHex(e) {
                        return d.fromBuffer(t.from(e, "hex"))
                    }
                    static calculateTarget(e) {
                        const r = ((4278190080 & e) >> 24) - 3
                          , i = 8388607 & e
                          , n = t.alloc(32, 0);
                        return n.writeUIntBE(i, 29 - r, 3),
                        n
                    }
                    static calculateMerkleRoot(e, r) {
                        if (f([{
                            getHash: o.Function
                        }], e),
                        0 === e.length)
                            throw c;
                        if (r && !l(e))
                            throw h;
                        const i = e.map(e => e.getHash(r))
                          , s = a(i, n.hash256);
                        return r ? n.hash256(t.concat([s, e[0].ins[0].witness[0]])) : s
                    }
                    getWitnessCommit() {
                        if (!l(this.transactions))
                            return null;
                        const e = this.transactions[0].outs.filter(e => e.script.slice(0, 6).equals(t.from("6a24aa21a9ed", "hex"))).map(e => e.script.slice(6, 38));
                        if (0 === e.length)
                            return null;
                        const r = e[e.length - 1];
                        return r instanceof t && 32 === r.length ? r : null
                    }
                    hasWitnessCommit() {
                        return this.witnessCommit instanceof t && 32 === this.witnessCommit.length || null !== this.getWitnessCommit()
                    }
                    hasWitness() {
                        return (e = this.transactions)instanceof Array && e.some(e => "object" == typeof e && e.ins instanceof Array && e.ins.some(e => "object" == typeof e && e.witness instanceof Array && e.witness.length > 0));
                        var e
                    }
                    weight() {
                        return 3 * this.byteLength(!1, !1) + this.byteLength(!1, !0)
                    }
                    byteLength(e, t=!0) {
                        return e || !this.transactions ? 80 : 80 + u.encodingLength(this.transactions.length) + this.transactions.reduce( (e, r) => e + r.byteLength(t), 0)
                    }
                    getHash() {
                        return n.hash256(this.toBuffer(!0))
                    }
                    getId() {
                        return i.reverseBuffer(this.getHash()).toString("hex")
                    }
                    getUTCDate() {
                        const e = new Date(0);
                        return e.setUTCSeconds(this.timestamp),
                        e
                    }
                    toBuffer(e) {
                        const r = t.allocUnsafe(this.byteLength(e));
                        let i = 0;
                        const n = e => {
                            e.copy(r, i),
                            i += e.length
                        }
                          , s = e => {
                            r.writeUInt32LE(e, i),
                            i += 4
                        }
                        ;
                        var o;
                        return o = this.version,
                        r.writeInt32LE(o, i),
                        i += 4,
                        n(this.prevHash),
                        n(this.merkleRoot),
                        s(this.timestamp),
                        s(this.bits),
                        s(this.nonce),
                        e || !this.transactions ? r : (u.encode(this.transactions.length, r, i),
                        i += u.encode.bytes,
                        this.transactions.forEach(e => {
                            const t = e.byteLength();
                            e.toBuffer(r, i),
                            i += t
                        }
                        ),
                        r)
                    }
                    toHex(e) {
                        return this.toBuffer(e).toString("hex")
                    }
                    checkTxRoots() {
                        const e = this.hasWitnessCommit();
                        return !(!e && this.hasWitness()) && (this.__checkMerkleRoot() && (!e || this.__checkWitnessCommit()))
                    }
                    checkProofOfWork() {
                        const e = i.reverseBuffer(this.getHash())
                          , t = d.calculateTarget(this.bits);
                        return e.compare(t) <= 0
                    }
                    __checkMerkleRoot() {
                        if (!this.transactions)
                            throw c;
                        const e = d.calculateMerkleRoot(this.transactions);
                        return 0 === this.merkleRoot.compare(e)
                    }
                    __checkWitnessCommit() {
                        if (!this.transactions)
                            throw c;
                        if (!this.hasWitnessCommit())
                            throw h;
                        const e = d.calculateMerkleRoot(this.transactions, !0);
                        return 0 === this.witnessCommit.compare(e)
                    }
                }
                function l(e) {
                    return e instanceof Array && e[0] && e[0].ins && e[0].ins instanceof Array && e[0].ins[0] && e[0].ins[0].witness && e[0].ins[0].witness instanceof Array && e[0].ins[0].witness.length > 0
                }
                r.Block = d
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            "./bufferutils": 73,
            "./crypto": 75,
            "./transaction": 111,
            "./types": 113,
            buffer: 116,
            "merkle-lib/fastRoot": 48,
            typeforce: 67,
            "varuint-bitcoin": 69
        }],
        73: [function(e, t, r) {
            "use strict";
            function i(e, t) {
                if ("number" != typeof e)
                    throw new Error("cannot write a non-number as a number");
                if (e < 0)
                    throw new Error("specified a negative value for writing an unsigned value");
                if (e > t)
                    throw new Error("RangeError: value out of range");
                if (Math.floor(e) !== e)
                    throw new Error("value has a fractional component")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.readUInt64LE = function(e, t) {
                const r = e.readUInt32LE(t);
                let n = e.readUInt32LE(t + 4);
                return i((n *= 4294967296) + r, 9007199254740991),
                n + r
            }
            ,
            r.writeUInt64LE = function(e, t, r) {
                return i(t, 9007199254740991),
                e.writeInt32LE(-1 & t, r),
                e.writeUInt32LE(Math.floor(t / 4294967296), r + 4),
                r + 8
            }
            ,
            r.reverseBuffer = function(e) {
                if (e.length < 1)
                    return e;
                let t = e.length - 1
                  , r = 0;
                for (let i = 0; i < e.length / 2; i++)
                    r = e[i],
                    e[i] = e[t],
                    e[t] = r,
                    t--;
                return e
            }
        }
        , {}],
        74: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("./script")
              , n = e("./templates/multisig")
              , s = e("./templates/nulldata")
              , o = e("./templates/pubkey")
              , a = e("./templates/pubkeyhash")
              , f = e("./templates/scripthash")
              , u = e("./templates/witnesscommitment")
              , c = e("./templates/witnesspubkeyhash")
              , h = e("./templates/witnessscripthash")
              , d = {
                P2MS: "multisig",
                NONSTANDARD: "nonstandard",
                NULLDATA: "nulldata",
                P2PK: "pubkey",
                P2PKH: "pubkeyhash",
                P2SH: "scripthash",
                P2WPKH: "witnesspubkeyhash",
                P2WSH: "witnessscripthash",
                WITNESS_COMMITMENT: "witnesscommitment"
            };
            r.types = d,
            r.output = function(e) {
                if (c.output.check(e))
                    return d.P2WPKH;
                if (h.output.check(e))
                    return d.P2WSH;
                if (a.output.check(e))
                    return d.P2PKH;
                if (f.output.check(e))
                    return d.P2SH;
                const t = i.decompile(e);
                if (!t)
                    throw new TypeError("Invalid script");
                return n.output.check(t) ? d.P2MS : o.output.check(t) ? d.P2PK : u.output.check(t) ? d.WITNESS_COMMITMENT : s.output.check(t) ? d.NULLDATA : d.NONSTANDARD
            }
            ,
            r.input = function(e, t) {
                const r = i.decompile(e);
                if (!r)
                    throw new TypeError("Invalid script");
                return a.input.check(r) ? d.P2PKH : f.input.check(r, t) ? d.P2SH : n.input.check(r, t) ? d.P2MS : o.input.check(r) ? d.P2PK : d.NONSTANDARD
            }
            ,
            r.witness = function(e, t) {
                const r = i.decompile(e);
                if (!r)
                    throw new TypeError("Invalid script");
                return c.input.check(r) ? d.P2WPKH : h.input.check(r, t) ? d.P2WSH : d.NONSTANDARD
            }
        }
        , {
            "./script": 87,
            "./templates/multisig": 90,
            "./templates/nulldata": 93,
            "./templates/pubkey": 94,
            "./templates/pubkeyhash": 97,
            "./templates/scripthash": 100,
            "./templates/witnesscommitment": 103,
            "./templates/witnesspubkeyhash": 105,
            "./templates/witnessscripthash": 108
        }],
        75: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("create-hash");
            function n(e) {
                try {
                    return i("rmd160").update(e).digest()
                } catch (t) {
                    return i("ripemd160").update(e).digest()
                }
            }
            function s(e) {
                return i("sha256").update(e).digest()
            }
            r.ripemd160 = n,
            r.sha1 = function(e) {
                return i("sha1").update(e).digest()
            }
            ,
            r.sha256 = s,
            r.hash160 = function(e) {
                return n(s(e))
            }
            ,
            r.hash256 = function(e) {
                return s(s(e))
            }
        }
        , {
            "create-hash": 12
        }],
        76: [function(e, t, r) {
            (function(t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                    value: !0
                });
                const i = e("./networks")
                  , n = e("./types")
                  , s = e("tiny-secp256k1")
                  , o = e("randombytes")
                  , a = e("typeforce")
                  , f = e("wif")
                  , u = a.maybe(a.compile({
                    compressed: n.maybe(n.Boolean),
                    network: n.maybe(n.Network)
                }));
                class ECPair {
                    constructor(e, t, r) {
                        this.__D = e,
                        this.__Q = t,
                        this.lowR = !1,
                        void 0 === r && (r = {}),
                        this.compressed = void 0 === r.compressed || r.compressed,
                        this.network = r.network || i.bitcoin,
                        void 0 !== t && (this.__Q = s.pointCompress(t, this.compressed))
                    }
                    get privateKey() {
                        return this.__D
                    }
                    get publicKey() {
                        return this.__Q || (this.__Q = s.pointFromScalar(this.__D, this.compressed)),
                        this.__Q
                    }
                    toWIF() {
                        if (!this.__D)
                            throw new Error("Missing private key");
                        return f.encode(this.network.wif, this.__D, this.compressed)
                    }
                    sign(e, r) {
                        if (!this.__D)
                            throw new Error("Missing private key");
                        if (void 0 === r && (r = this.lowR),
                        !1 === r)
                            return s.sign(e, this.__D);
                        {
                            let r = s.sign(e, this.__D);
                            const i = t.alloc(32, 0);
                            let n = 0;
                            for (; r[0] > 127; )
                                n++,
                                i.writeUIntLE(n, 0, 6),
                                r = s.signWithEntropy(e, this.__D, i);
                            return r
                        }
                    }
                    verify(e, t) {
                        return s.verify(e, this.publicKey, t)
                    }
                }
                function c(e, t) {
                    if (a(n.Buffer256bit, e),
                    !s.isPrivate(e))
                        throw new TypeError("Private key not in range [1, n)");
                    return a(u, t),
                    new ECPair(e,void 0,t)
                }
                r.fromPrivateKey = c,
                r.fromPublicKey = function(e, t) {
                    return a(s.isPoint, e),
                    a(u, t),
                    new ECPair(void 0,e,t)
                }
                ,
                r.fromWIF = function(e, t) {
                    const r = f.decode(e)
                      , s = r.version;
                    if (n.Array(t)) {
                        if (!(t = t.filter(e => s === e.wif).pop()))
                            throw new Error("Unknown network version")
                    } else if (t = t || i.bitcoin,
                    s !== t.wif)
                        throw new Error("Invalid network version");
                    return c(r.privateKey, {
                        compressed: r.compressed,
                        network: t
                    })
                }
                ,
                r.makeRandom = function(e) {
                    a(u, e),
                    void 0 === e && (e = {});
                    const t = e.rng || o;
                    let r;
                    do {
                        r = t(32),
                        a(n.Buffer256bit, r)
                    } while (!s.isPrivate(r));
                    return c(r, e)
                }
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            "./networks": 77,
            "./types": 113,
            buffer: 116,
            randombytes: 52,
            "tiny-secp256k1": 63,
            typeforce: 67,
            wif: 70
        }],
        77: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.bitcoin = {
                messagePrefix: "Bitcoin Signed Message:\n",
                bech32: "bc",
                bip32: {
                    public: 76067358,
                    private: 76066276
                },
                pubKeyHash: 0,
                scriptHash: 5,
                wif: 128
            },
            r.regtest = {
                messagePrefix: "Bitcoin Signed Message:\n",
                bech32: "bcrt",
                bip32: {
                    public: 70617039,
                    private: 70615956
                },
                pubKeyHash: 111,
                scriptHash: 196,
                wif: 239
            },
            r.testnet = {
                messagePrefix: "Bitcoin Signed Message:\n",
                bech32: "tb",
                bip32: {
                    public: 70617039,
                    private: 70615956
                },
                pubKeyHash: 111,
                scriptHash: 196,
                wif: 239
            }
        }
        , {}],
        78: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("../networks")
              , n = e("../script")
              , s = e("./lazy")
              , o = e("typeforce")
              , a = n.OPS;
            r.p2data = function(e, t) {
                if (!e.data && !e.output)
                    throw new TypeError("Not enough data");
                t = Object.assign({
                    validate: !0
                }, t || {}),
                o({
                    network: o.maybe(o.Object),
                    output: o.maybe(o.Buffer),
                    data: o.maybe(o.arrayOf(o.Buffer))
                }, e);
                const r = {
                    name: "embed",
                    network: e.network || i.bitcoin
                };
                if (s.prop(r, "output", () => {
                    if (e.data)
                        return n.compile([a.OP_RETURN].concat(e.data))
                }
                ),
                s.prop(r, "data", () => {
                    if (e.output)
                        return n.decompile(e.output).slice(1)
                }
                ),
                t.validate && e.output) {
                    const t = n.decompile(e.output);
                    if (t[0] !== a.OP_RETURN)
                        throw new TypeError("Output is invalid");
                    if (!t.slice(1).every(o.Buffer))
                        throw new TypeError("Output is invalid");
                    if (e.data && !function(e, t) {
                        return e.length === t.length && e.every( (e, r) => e.equals(t[r]))
                    }(e.data, r.data))
                        throw new TypeError("Data mismatch")
                }
                return Object.assign(r, e)
            }
        }
        , {
            "../networks": 77,
            "../script": 87,
            "./lazy": 80,
            typeforce: 67
        }],
        79: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("./embed");
            r.embed = i.p2data;
            const n = e("./p2ms");
            r.p2ms = n.p2ms;
            const s = e("./p2pk");
            r.p2pk = s.p2pk;
            const o = e("./p2pkh");
            r.p2pkh = o.p2pkh;
            const a = e("./p2sh");
            r.p2sh = a.p2sh;
            const f = e("./p2wpkh");
            r.p2wpkh = f.p2wpkh;
            const u = e("./p2wsh");
            r.p2wsh = u.p2wsh
        }
        , {
            "./embed": 78,
            "./p2ms": 81,
            "./p2pk": 82,
            "./p2pkh": 83,
            "./p2sh": 84,
            "./p2wpkh": 85,
            "./p2wsh": 86
        }],
        80: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            }),
            r.prop = function(e, t, r) {
                Object.defineProperty(e, t, {
                    configurable: !0,
                    enumerable: !0,
                    get() {
                        const e = r.call(this);
                        return this[t] = e,
                        e
                    },
                    set(e) {
                        Object.defineProperty(this, t, {
                            configurable: !0,
                            enumerable: !0,
                            value: e,
                            writable: !0
                        })
                    }
                })
            }
            ,
            r.value = function(e) {
                let t;
                return () => void 0 !== t ? t : t = e()
            }
        }
        , {}],
        81: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("../networks")
              , n = e("../script")
              , s = e("./lazy")
              , o = n.OPS
              , a = e("typeforce")
              , f = e("tiny-secp256k1")
              , u = o.OP_RESERVED;
            function c(e, t) {
                return e.length === t.length && e.every( (e, r) => e.equals(t[r]))
            }
            r.p2ms = function(e, t) {
                if (!(e.input || e.output || e.pubkeys && void 0 !== e.m || e.signatures))
                    throw new TypeError("Not enough data");
                function r(e) {
                    return n.isCanonicalScriptSignature(e) || void 0 !== (t.allowIncomplete && e === o.OP_0)
                }
                t = Object.assign({
                    validate: !0
                }, t || {}),
                a({
                    network: a.maybe(a.Object),
                    m: a.maybe(a.Number),
                    n: a.maybe(a.Number),
                    output: a.maybe(a.Buffer),
                    pubkeys: a.maybe(a.arrayOf(f.isPoint)),
                    signatures: a.maybe(a.arrayOf(r)),
                    input: a.maybe(a.Buffer)
                }, e);
                const h = {
                    network: e.network || i.bitcoin
                };
                let d = []
                  , l = !1;
                function p(e) {
                    l || (l = !0,
                    d = n.decompile(e),
                    h.m = d[0] - u,
                    h.n = d[d.length - 2] - u,
                    h.pubkeys = d.slice(1, -2))
                }
                if (s.prop(h, "output", () => {
                    if (e.m && h.n && e.pubkeys)
                        return n.compile([].concat(u + e.m, e.pubkeys, u + h.n, o.OP_CHECKMULTISIG))
                }
                ),
                s.prop(h, "m", () => {
                    if (h.output)
                        return p(h.output),
                        h.m
                }
                ),
                s.prop(h, "n", () => {
                    if (h.pubkeys)
                        return h.pubkeys.length
                }
                ),
                s.prop(h, "pubkeys", () => {
                    if (e.output)
                        return p(e.output),
                        h.pubkeys
                }
                ),
                s.prop(h, "signatures", () => {
                    if (e.input)
                        return n.decompile(e.input).slice(1)
                }
                ),
                s.prop(h, "input", () => {
                    if (e.signatures)
                        return n.compile([o.OP_0].concat(e.signatures))
                }
                ),
                s.prop(h, "witness", () => {
                    if (h.input)
                        return []
                }
                ),
                s.prop(h, "name", () => {
                    if (h.m && h.n)
                        return `p2ms(${h.m} of ${h.n})`
                }
                ),
                t.validate) {
                    if (e.output) {
                        if (p(e.output),
                        !a.Number(d[0]))
                            throw new TypeError("Output is invalid");
                        if (!a.Number(d[d.length - 2]))
                            throw new TypeError("Output is invalid");
                        if (d[d.length - 1] !== o.OP_CHECKMULTISIG)
                            throw new TypeError("Output is invalid");
                        if (h.m <= 0 || h.n > 16 || h.m > h.n || h.n !== d.length - 3)
                            throw new TypeError("Output is invalid");
                        if (!h.pubkeys.every(e => f.isPoint(e)))
                            throw new TypeError("Output is invalid");
                        if (void 0 !== e.m && e.m !== h.m)
                            throw new TypeError("m mismatch");
                        if (void 0 !== e.n && e.n !== h.n)
                            throw new TypeError("n mismatch");
                        if (e.pubkeys && !c(e.pubkeys, h.pubkeys))
                            throw new TypeError("Pubkeys mismatch")
                    }
                    if (e.pubkeys) {
                        if (void 0 !== e.n && e.n !== e.pubkeys.length)
                            throw new TypeError("Pubkey count mismatch");
                        if (h.n = e.pubkeys.length,
                        h.n < h.m)
                            throw new TypeError("Pubkey count cannot be less than m")
                    }
                    if (e.signatures) {
                        if (e.signatures.length < h.m)
                            throw new TypeError("Not enough signatures provided");
                        if (e.signatures.length > h.m)
                            throw new TypeError("Too many signatures provided")
                    }
                    if (e.input) {
                        if (e.input[0] !== o.OP_0)
                            throw new TypeError("Input is invalid");
                        if (0 === h.signatures.length || !h.signatures.every(r))
                            throw new TypeError("Input has invalid signature(s)");
                        if (e.signatures && !c(e.signatures, h.signatures))
                            throw new TypeError("Signature mismatch");
                        if (void 0 !== e.m && e.m !== e.signatures.length)
                            throw new TypeError("Signature count mismatch")
                    }
                }
                return Object.assign(h, e)
            }
        }
        , {
            "../networks": 77,
            "../script": 87,
            "./lazy": 80,
            "tiny-secp256k1": 63,
            typeforce: 67
        }],
        82: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("../networks")
              , n = e("../script")
              , s = e("./lazy")
              , o = e("typeforce")
              , a = n.OPS
              , f = e("tiny-secp256k1");
            r.p2pk = function(e, t) {
                if (!(e.input || e.output || e.pubkey || e.input || e.signature))
                    throw new TypeError("Not enough data");
                t = Object.assign({
                    validate: !0
                }, t || {}),
                o({
                    network: o.maybe(o.Object),
                    output: o.maybe(o.Buffer),
                    pubkey: o.maybe(f.isPoint),
                    signature: o.maybe(n.isCanonicalScriptSignature),
                    input: o.maybe(o.Buffer)
                }, e);
                const r = s.value( () => n.decompile(e.input))
                  , u = {
                    name: "p2pk",
                    network: e.network || i.bitcoin
                };
                if (s.prop(u, "output", () => {
                    if (e.pubkey)
                        return n.compile([e.pubkey, a.OP_CHECKSIG])
                }
                ),
                s.prop(u, "pubkey", () => {
                    if (e.output)
                        return e.output.slice(1, -1)
                }
                ),
                s.prop(u, "signature", () => {
                    if (e.input)
                        return r()[0]
                }
                ),
                s.prop(u, "input", () => {
                    if (e.signature)
                        return n.compile([e.signature])
                }
                ),
                s.prop(u, "witness", () => {
                    if (u.input)
                        return []
                }
                ),
                t.validate) {
                    if (e.output) {
                        if (e.output[e.output.length - 1] !== a.OP_CHECKSIG)
                            throw new TypeError("Output is invalid");
                        if (!f.isPoint(u.pubkey))
                            throw new TypeError("Output pubkey is invalid");
                        if (e.pubkey && !e.pubkey.equals(u.pubkey))
                            throw new TypeError("Pubkey mismatch")
                    }
                    if (e.signature && e.input && !e.input.equals(u.input))
                        throw new TypeError("Signature mismatch");
                    if (e.input) {
                        if (1 !== r().length)
                            throw new TypeError("Input is invalid");
                        if (!n.isCanonicalScriptSignature(u.signature))
                            throw new TypeError("Input has invalid signature")
                    }
                }
                return Object.assign(u, e)
            }
        }
        , {
            "../networks": 77,
            "../script": 87,
            "./lazy": 80,
            "tiny-secp256k1": 63,
            typeforce: 67
        }],
        83: [function(e, t, r) {
            (function(t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                    value: !0
                });
                const i = e("../crypto")
                  , n = e("../networks")
                  , s = e("../script")
                  , o = e("./lazy")
                  , a = e("typeforce")
                  , f = s.OPS
                  , u = e("tiny-secp256k1")
                  , c = e("bs58check");
                r.p2pkh = function(e, r) {
                    if (!(e.address || e.hash || e.output || e.pubkey || e.input))
                        throw new TypeError("Not enough data");
                    r = Object.assign({
                        validate: !0
                    }, r || {}),
                    a({
                        network: a.maybe(a.Object),
                        address: a.maybe(a.String),
                        hash: a.maybe(a.BufferN(20)),
                        output: a.maybe(a.BufferN(25)),
                        pubkey: a.maybe(u.isPoint),
                        signature: a.maybe(s.isCanonicalScriptSignature),
                        input: a.maybe(a.Buffer)
                    }, e);
                    const h = o.value( () => {
                        const t = c.decode(e.address);
                        return {
                            version: t.readUInt8(0),
                            hash: t.slice(1)
                        }
                    }
                    )
                      , d = o.value( () => s.decompile(e.input))
                      , l = e.network || n.bitcoin
                      , p = {
                        name: "p2pkh",
                        network: l
                    };
                    if (o.prop(p, "address", () => {
                        if (!p.hash)
                            return;
                        const e = t.allocUnsafe(21);
                        return e.writeUInt8(l.pubKeyHash, 0),
                        p.hash.copy(e, 1),
                        c.encode(e)
                    }
                    ),
                    o.prop(p, "hash", () => e.output ? e.output.slice(3, 23) : e.address ? h().hash : e.pubkey || p.pubkey ? i.hash160(e.pubkey || p.pubkey) : void 0),
                    o.prop(p, "output", () => {
                        if (p.hash)
                            return s.compile([f.OP_DUP, f.OP_HASH160, p.hash, f.OP_EQUALVERIFY, f.OP_CHECKSIG])
                    }
                    ),
                    o.prop(p, "pubkey", () => {
                        if (e.input)
                            return d()[1]
                    }
                    ),
                    o.prop(p, "signature", () => {
                        if (e.input)
                            return d()[0]
                    }
                    ),
                    o.prop(p, "input", () => {
                        if (e.pubkey && e.signature)
                            return s.compile([e.signature, e.pubkey])
                    }
                    ),
                    o.prop(p, "witness", () => {
                        if (p.input)
                            return []
                    }
                    ),
                    r.validate) {
                        let r = t.from([]);
                        if (e.address) {
                            if (h().version !== l.pubKeyHash)
                                throw new TypeError("Invalid version or Network mismatch");
                            if (20 !== h().hash.length)
                                throw new TypeError("Invalid address");
                            r = h().hash
                        }
                        if (e.hash) {
                            if (r.length > 0 && !r.equals(e.hash))
                                throw new TypeError("Hash mismatch");
                            r = e.hash
                        }
                        if (e.output) {
                            if (25 !== e.output.length || e.output[0] !== f.OP_DUP || e.output[1] !== f.OP_HASH160 || 20 !== e.output[2] || e.output[23] !== f.OP_EQUALVERIFY || e.output[24] !== f.OP_CHECKSIG)
                                throw new TypeError("Output is invalid");
                            const t = e.output.slice(3, 23);
                            if (r.length > 0 && !r.equals(t))
                                throw new TypeError("Hash mismatch");
                            r = t
                        }
                        if (e.pubkey) {
                            const t = i.hash160(e.pubkey);
                            if (r.length > 0 && !r.equals(t))
                                throw new TypeError("Hash mismatch");
                            r = t
                        }
                        if (e.input) {
                            const t = d();
                            if (2 !== t.length)
                                throw new TypeError("Input is invalid");
                            if (!s.isCanonicalScriptSignature(t[0]))
                                throw new TypeError("Input has invalid signature");
                            if (!u.isPoint(t[1]))
                                throw new TypeError("Input has invalid pubkey");
                            if (e.signature && !e.signature.equals(t[0]))
                                throw new TypeError("Signature mismatch");
                            if (e.pubkey && !e.pubkey.equals(t[1]))
                                throw new TypeError("Pubkey mismatch");
                            const n = i.hash160(t[1]);
                            if (r.length > 0 && !r.equals(n))
                                throw new TypeError("Hash mismatch")
                        }
                    }
                    return Object.assign(p, e)
                }
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            "../crypto": 75,
            "../networks": 77,
            "../script": 87,
            "./lazy": 80,
            bs58check: 10,
            buffer: 116,
            "tiny-secp256k1": 63,
            typeforce: 67
        }],
        84: [function(e, t, r) {
            (function(t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                    value: !0
                });
                const i = e("../crypto")
                  , n = e("../networks")
                  , s = e("../script")
                  , o = e("./lazy")
                  , a = e("typeforce")
                  , f = s.OPS
                  , u = e("bs58check");
                r.p2sh = function(e, r) {
                    if (!(e.address || e.hash || e.output || e.redeem || e.input))
                        throw new TypeError("Not enough data");
                    r = Object.assign({
                        validate: !0
                    }, r || {}),
                    a({
                        network: a.maybe(a.Object),
                        address: a.maybe(a.String),
                        hash: a.maybe(a.BufferN(20)),
                        output: a.maybe(a.BufferN(23)),
                        redeem: a.maybe({
                            network: a.maybe(a.Object),
                            output: a.maybe(a.Buffer),
                            input: a.maybe(a.Buffer),
                            witness: a.maybe(a.arrayOf(a.Buffer))
                        }),
                        input: a.maybe(a.Buffer),
                        witness: a.maybe(a.arrayOf(a.Buffer))
                    }, e);
                    let c = e.network;
                    c || (c = e.redeem && e.redeem.network || n.bitcoin);
                    const h = {
                        network: c
                    }
                      , d = o.value( () => {
                        const t = u.decode(e.address);
                        return {
                            version: t.readUInt8(0),
                            hash: t.slice(1)
                        }
                    }
                    )
                      , l = o.value( () => s.decompile(e.input))
                      , p = o.value( () => {
                        const t = l();
                        return {
                            network: c,
                            output: t[t.length - 1],
                            input: s.compile(t.slice(0, -1)),
                            witness: e.witness || []
                        }
                    }
                    );
                    if (o.prop(h, "address", () => {
                        if (!h.hash)
                            return;
                        const e = t.allocUnsafe(21);
                        return e.writeUInt8(h.network.scriptHash, 0),
                        h.hash.copy(e, 1),
                        u.encode(e)
                    }
                    ),
                    o.prop(h, "hash", () => e.output ? e.output.slice(2, 22) : e.address ? d().hash : h.redeem && h.redeem.output ? i.hash160(h.redeem.output) : void 0),
                    o.prop(h, "output", () => {
                        if (h.hash)
                            return s.compile([f.OP_HASH160, h.hash, f.OP_EQUAL])
                    }
                    ),
                    o.prop(h, "redeem", () => {
                        if (e.input)
                            return p()
                    }
                    ),
                    o.prop(h, "input", () => {
                        if (e.redeem && e.redeem.input && e.redeem.output)
                            return s.compile([].concat(s.decompile(e.redeem.input), e.redeem.output))
                    }
                    ),
                    o.prop(h, "witness", () => h.redeem && h.redeem.witness ? h.redeem.witness : h.input ? [] : void 0),
                    o.prop(h, "name", () => {
                        const e = ["p2sh"];
                        return void 0 !== h.redeem && e.push(h.redeem.name),
                        e.join("-")
                    }
                    ),
                    r.validate) {
                        let r = t.from([]);
                        if (e.address) {
                            if (d().version !== c.scriptHash)
                                throw new TypeError("Invalid version or Network mismatch");
                            if (20 !== d().hash.length)
                                throw new TypeError("Invalid address");
                            r = d().hash
                        }
                        if (e.hash) {
                            if (r.length > 0 && !r.equals(e.hash))
                                throw new TypeError("Hash mismatch");
                            r = e.hash
                        }
                        if (e.output) {
                            if (23 !== e.output.length || e.output[0] !== f.OP_HASH160 || 20 !== e.output[1] || e.output[22] !== f.OP_EQUAL)
                                throw new TypeError("Output is invalid");
                            const t = e.output.slice(2, 22);
                            if (r.length > 0 && !r.equals(t))
                                throw new TypeError("Hash mismatch");
                            r = t
                        }
                        const n = e => {
                            if (e.output) {
                                const t = s.decompile(e.output);
                                if (!t || t.length < 1)
                                    throw new TypeError("Redeem.output too short");
                                const n = i.hash160(e.output);
                                if (r.length > 0 && !r.equals(n))
                                    throw new TypeError("Hash mismatch");
                                r = n
                            }
                            if (e.input) {
                                const t = e.input.length > 0
                                  , r = e.witness && e.witness.length > 0;
                                if (!t && !r)
                                    throw new TypeError("Empty input");
                                if (t && r)
                                    throw new TypeError("Input and witness provided");
                                if (t) {
                                    const t = s.decompile(e.input);
                                    if (!s.isPushOnly(t))
                                        throw new TypeError("Non push-only scriptSig")
                                }
                            }
                        }
                        ;
                        if (e.input) {
                            const e = l();
                            if (!e || e.length < 1)
                                throw new TypeError("Input too short");
                            if (!t.isBuffer(p().output))
                                throw new TypeError("Input is invalid");
                            n(p())
                        }
                        if (e.redeem) {
                            if (e.redeem.network && e.redeem.network !== c)
                                throw new TypeError("Network mismatch");
                            if (e.input) {
                                const t = p();
                                if (e.redeem.output && !e.redeem.output.equals(t.output))
                                    throw new TypeError("Redeem.output mismatch");
                                if (e.redeem.input && !e.redeem.input.equals(t.input))
                                    throw new TypeError("Redeem.input mismatch")
                            }
                            n(e.redeem)
                        }
                        if (e.witness && e.redeem && e.redeem.witness && !function(e, t) {
                            return e.length === t.length && e.every( (e, r) => e.equals(t[r]))
                        }(e.redeem.witness, e.witness))
                            throw new TypeError("Witness and redeem.witness mismatch")
                    }
                    return Object.assign(h, e)
                }
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            "../crypto": 75,
            "../networks": 77,
            "../script": 87,
            "./lazy": 80,
            bs58check: 10,
            buffer: 116,
            typeforce: 67
        }],
        85: [function(e, t, r) {
            (function(t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                    value: !0
                });
                const i = e("../crypto")
                  , n = e("../networks")
                  , s = e("../script")
                  , o = e("./lazy")
                  , a = e("typeforce")
                  , f = s.OPS
                  , u = e("tiny-secp256k1")
                  , c = e("bech32")
                  , h = t.alloc(0);
                r.p2wpkh = function(e, r) {
                    if (!(e.address || e.hash || e.output || e.pubkey || e.witness))
                        throw new TypeError("Not enough data");
                    r = Object.assign({
                        validate: !0
                    }, r || {}),
                    a({
                        address: a.maybe(a.String),
                        hash: a.maybe(a.BufferN(20)),
                        input: a.maybe(a.BufferN(0)),
                        network: a.maybe(a.Object),
                        output: a.maybe(a.BufferN(22)),
                        pubkey: a.maybe(u.isPoint),
                        signature: a.maybe(s.isCanonicalScriptSignature),
                        witness: a.maybe(a.arrayOf(a.Buffer))
                    }, e);
                    const d = o.value( () => {
                        const r = c.decode(e.address)
                          , i = r.words.shift()
                          , n = c.fromWords(r.words);
                        return {
                            version: i,
                            prefix: r.prefix,
                            data: t.from(n)
                        }
                    }
                    )
                      , l = e.network || n.bitcoin
                      , p = {
                        name: "p2wpkh",
                        network: l
                    };
                    if (o.prop(p, "address", () => {
                        if (!p.hash)
                            return;
                        const e = c.toWords(p.hash);
                        return e.unshift(0),
                        c.encode(l.bech32, e)
                    }
                    ),
                    o.prop(p, "hash", () => e.output ? e.output.slice(2, 22) : e.address ? d().data : e.pubkey || p.pubkey ? i.hash160(e.pubkey || p.pubkey) : void 0),
                    o.prop(p, "output", () => {
                        if (p.hash)
                            return s.compile([f.OP_0, p.hash])
                    }
                    ),
                    o.prop(p, "pubkey", () => e.pubkey ? e.pubkey : e.witness ? e.witness[1] : void 0),
                    o.prop(p, "signature", () => {
                        if (e.witness)
                            return e.witness[0]
                    }
                    ),
                    o.prop(p, "input", () => {
                        if (p.witness)
                            return h
                    }
                    ),
                    o.prop(p, "witness", () => {
                        if (e.pubkey && e.signature)
                            return [e.signature, e.pubkey]
                    }
                    ),
                    r.validate) {
                        let r = t.from([]);
                        if (e.address) {
                            if (l && l.bech32 !== d().prefix)
                                throw new TypeError("Invalid prefix or Network mismatch");
                            if (0 !== d().version)
                                throw new TypeError("Invalid address version");
                            if (20 !== d().data.length)
                                throw new TypeError("Invalid address data");
                            r = d().data
                        }
                        if (e.hash) {
                            if (r.length > 0 && !r.equals(e.hash))
                                throw new TypeError("Hash mismatch");
                            r = e.hash
                        }
                        if (e.output) {
                            if (22 !== e.output.length || e.output[0] !== f.OP_0 || 20 !== e.output[1])
                                throw new TypeError("Output is invalid");
                            if (r.length > 0 && !r.equals(e.output.slice(2)))
                                throw new TypeError("Hash mismatch");
                            r = e.output.slice(2)
                        }
                        if (e.pubkey) {
                            const t = i.hash160(e.pubkey);
                            if (r.length > 0 && !r.equals(t))
                                throw new TypeError("Hash mismatch");
                            r = t
                        }
                        if (e.witness) {
                            if (2 !== e.witness.length)
                                throw new TypeError("Witness is invalid");
                            if (!s.isCanonicalScriptSignature(e.witness[0]))
                                throw new TypeError("Witness has invalid signature");
                            if (!u.isPoint(e.witness[1]))
                                throw new TypeError("Witness has invalid pubkey");
                            if (e.signature && !e.signature.equals(e.witness[0]))
                                throw new TypeError("Signature mismatch");
                            if (e.pubkey && !e.pubkey.equals(e.witness[1]))
                                throw new TypeError("Pubkey mismatch");
                            const t = i.hash160(e.witness[1]);
                            if (r.length > 0 && !r.equals(t))
                                throw new TypeError("Hash mismatch")
                        }
                    }
                    return Object.assign(p, e)
                }
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            "../crypto": 75,
            "../networks": 77,
            "../script": 87,
            "./lazy": 80,
            bech32: 2,
            buffer: 116,
            "tiny-secp256k1": 63,
            typeforce: 67
        }],
        86: [function(e, t, r) {
            (function(t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                    value: !0
                });
                const i = e("../crypto")
                  , n = e("../networks")
                  , s = e("../script")
                  , o = e("./lazy")
                  , a = e("typeforce")
                  , f = s.OPS
                  , u = e("bech32")
                  , c = t.alloc(0);
                r.p2wsh = function(e, r) {
                    if (!(e.address || e.hash || e.output || e.redeem || e.witness))
                        throw new TypeError("Not enough data");
                    r = Object.assign({
                        validate: !0
                    }, r || {}),
                    a({
                        network: a.maybe(a.Object),
                        address: a.maybe(a.String),
                        hash: a.maybe(a.BufferN(32)),
                        output: a.maybe(a.BufferN(34)),
                        redeem: a.maybe({
                            input: a.maybe(a.Buffer),
                            network: a.maybe(a.Object),
                            output: a.maybe(a.Buffer),
                            witness: a.maybe(a.arrayOf(a.Buffer))
                        }),
                        input: a.maybe(a.BufferN(0)),
                        witness: a.maybe(a.arrayOf(a.Buffer))
                    }, e);
                    const h = o.value( () => {
                        const r = u.decode(e.address)
                          , i = r.words.shift()
                          , n = u.fromWords(r.words);
                        return {
                            version: i,
                            prefix: r.prefix,
                            data: t.from(n)
                        }
                    }
                    )
                      , d = o.value( () => s.decompile(e.redeem.input));
                    let l = e.network;
                    l || (l = e.redeem && e.redeem.network || n.bitcoin);
                    const p = {
                        network: l
                    };
                    if (o.prop(p, "address", () => {
                        if (!p.hash)
                            return;
                        const e = u.toWords(p.hash);
                        return e.unshift(0),
                        u.encode(l.bech32, e)
                    }
                    ),
                    o.prop(p, "hash", () => e.output ? e.output.slice(2) : e.address ? h().data : p.redeem && p.redeem.output ? i.sha256(p.redeem.output) : void 0),
                    o.prop(p, "output", () => {
                        if (p.hash)
                            return s.compile([f.OP_0, p.hash])
                    }
                    ),
                    o.prop(p, "redeem", () => {
                        if (e.witness)
                            return {
                                output: e.witness[e.witness.length - 1],
                                input: c,
                                witness: e.witness.slice(0, -1)
                            }
                    }
                    ),
                    o.prop(p, "input", () => {
                        if (p.witness)
                            return c
                    }
                    ),
                    o.prop(p, "witness", () => {
                        if (e.redeem && e.redeem.input && e.redeem.input.length > 0 && e.redeem.output && e.redeem.output.length > 0) {
                            const t = s.toStack(d());
                            return p.redeem = Object.assign({
                                witness: t
                            }, e.redeem),
                            p.redeem.input = c,
                            [].concat(t, e.redeem.output)
                        }
                        if (e.redeem && e.redeem.output && e.redeem.witness)
                            return [].concat(e.redeem.witness, e.redeem.output)
                    }
                    ),
                    o.prop(p, "name", () => {
                        const e = ["p2wsh"];
                        return void 0 !== p.redeem && e.push(p.redeem.name),
                        e.join("-")
                    }
                    ),
                    r.validate) {
                        let r = t.from([]);
                        if (e.address) {
                            if (h().prefix !== l.bech32)
                                throw new TypeError("Invalid prefix or Network mismatch");
                            if (0 !== h().version)
                                throw new TypeError("Invalid address version");
                            if (32 !== h().data.length)
                                throw new TypeError("Invalid address data");
                            r = h().data
                        }
                        if (e.hash) {
                            if (r.length > 0 && !r.equals(e.hash))
                                throw new TypeError("Hash mismatch");
                            r = e.hash
                        }
                        if (e.output) {
                            if (34 !== e.output.length || e.output[0] !== f.OP_0 || 32 !== e.output[1])
                                throw new TypeError("Output is invalid");
                            const t = e.output.slice(2);
                            if (r.length > 0 && !r.equals(t))
                                throw new TypeError("Hash mismatch");
                            r = t
                        }
                        if (e.redeem) {
                            if (e.redeem.network && e.redeem.network !== l)
                                throw new TypeError("Network mismatch");
                            if (e.redeem.input && e.redeem.input.length > 0 && e.redeem.witness && e.redeem.witness.length > 0)
                                throw new TypeError("Ambiguous witness source");
                            if (e.redeem.output) {
                                if (0 === s.decompile(e.redeem.output).length)
                                    throw new TypeError("Redeem.output is invalid");
                                const t = i.sha256(e.redeem.output);
                                if (r.length > 0 && !r.equals(t))
                                    throw new TypeError("Hash mismatch");
                                r = t
                            }
                            if (e.redeem.input && !s.isPushOnly(d()))
                                throw new TypeError("Non push-only scriptSig");
                            if (e.witness && e.redeem.witness && !function(e, t) {
                                return e.length === t.length && e.every( (e, r) => e.equals(t[r]))
                            }(e.witness, e.redeem.witness))
                                throw new TypeError("Witness and redeem.witness mismatch")
                        }
                        if (e.witness && e.redeem && e.redeem.output && !e.redeem.output.equals(e.witness[e.witness.length - 1]))
                            throw new TypeError("Witness and redeem.output mismatch")
                    }
                    return Object.assign(p, e)
                }
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            "../crypto": 75,
            "../networks": 77,
            "../script": 87,
            "./lazy": 80,
            bech32: 2,
            buffer: 116,
            typeforce: 67
        }],
        87: [function(e, t, r) {
            (function(t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                    value: !0
                });
                const i = e("./script_number")
                  , n = e("./script_signature")
                  , s = e("./types")
                  , o = e("bip66")
                  , a = e("tiny-secp256k1")
                  , f = e("pushdata-bitcoin")
                  , u = e("typeforce");
                r.OPS = e("bitcoin-ops");
                const c = e("bitcoin-ops/map")
                  , h = r.OPS.OP_RESERVED;
                function d(e) {
                    return s.Buffer(e) || function(e) {
                        return s.Number(e) && (e === r.OPS.OP_0 || e >= r.OPS.OP_1 && e <= r.OPS.OP_16 || e === r.OPS.OP_1NEGATE)
                    }(e)
                }
                function l(e) {
                    return s.Array(e) && e.every(d)
                }
                function p(e) {
                    return 0 === e.length ? r.OPS.OP_0 : 1 === e.length ? e[0] >= 1 && e[0] <= 16 ? h + e[0] : 129 === e[0] ? r.OPS.OP_1NEGATE : void 0 : void 0
                }
                function b(e) {
                    return t.isBuffer(e)
                }
                function m(e) {
                    return t.isBuffer(e)
                }
                function y(e) {
                    if (b(e))
                        return e;
                    u(s.Array, e);
                    const r = e.reduce( (e, t) => m(t) ? 1 === t.length && void 0 !== p(t) ? e + 1 : e + f.encodingLength(t.length) + t.length : e + 1, 0)
                      , i = t.allocUnsafe(r);
                    let n = 0;
                    if (e.forEach(e => {
                        if (m(e)) {
                            const t = p(e);
                            if (void 0 !== t)
                                return i.writeUInt8(t, n),
                                void (n += 1);
                            n += f.encode(i, e.length, n),
                            e.copy(i, n),
                            n += e.length
                        } else
                            i.writeUInt8(e, n),
                            n += 1
                    }
                    ),
                    n !== i.length)
                        throw new Error("Could not decode chunks");
                    return i
                }
                function g(e) {
                    if (t = e,
                    s.Array(t))
                        return e;
                    var t;
                    u(s.Buffer, e);
                    const i = [];
                    let n = 0;
                    for (; n < e.length; ) {
                        const t = e[n];
                        if (t > r.OPS.OP_0 && t <= r.OPS.OP_PUSHDATA4) {
                            const t = f.decode(e, n);
                            if (null === t)
                                return null;
                            if ((n += t.size) + t.number > e.length)
                                return null;
                            const r = e.slice(n, n + t.number);
                            n += t.number;
                            const s = p(r);
                            void 0 !== s ? i.push(s) : i.push(r)
                        } else
                            i.push(t),
                            n += 1
                    }
                    return i
                }
                function v(e) {
                    const t = -129 & e;
                    return t > 0 && t < 4
                }
                r.isPushOnly = l,
                r.compile = y,
                r.decompile = g,
                r.toASM = function(e) {
                    return b(e) && (e = g(e)),
                    e.map(e => {
                        if (m(e)) {
                            const t = p(e);
                            if (void 0 === t)
                                return e.toString("hex");
                            e = t
                        }
                        return c[e]
                    }
                    ).join(" ")
                }
                ,
                r.fromASM = function(e) {
                    return u(s.String, e),
                    y(e.split(" ").map(e => void 0 !== r.OPS[e] ? r.OPS[e] : (u(s.Hex, e),
                    t.from(e, "hex"))))
                }
                ,
                r.toStack = function(e) {
                    return e = g(e),
                    u(l, e),
                    e.map(e => m(e) ? e : e === r.OPS.OP_0 ? t.allocUnsafe(0) : i.encode(e - h))
                }
                ,
                r.isCanonicalPubKey = function(e) {
                    return a.isPoint(e)
                }
                ,
                r.isDefinedHashType = v,
                r.isCanonicalScriptSignature = function(e) {
                    return !!t.isBuffer(e) && !!v(e[e.length - 1]) && o.check(e.slice(0, -1))
                }
                ,
                r.number = i,
                r.signature = n
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            "./script_number": 88,
            "./script_signature": 89,
            "./types": 113,
            bip66: 3,
            "bitcoin-ops": 4,
            "bitcoin-ops/map": 5,
            buffer: 116,
            "pushdata-bitcoin": 51,
            "tiny-secp256k1": 63,
            typeforce: 67
        }],
        88: [function(e, t, r) {
            (function(e) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                    value: !0
                }),
                r.decode = function(e, t, r) {
                    t = t || 4,
                    r = void 0 === r || r;
                    const i = e.length;
                    if (0 === i)
                        return 0;
                    if (i > t)
                        throw new TypeError("Script number overflow");
                    if (r && 0 == (127 & e[i - 1]) && (i <= 1 || 0 == (128 & e[i - 2])))
                        throw new Error("Non-minimally encoded script number");
                    if (5 === i) {
                        const t = e.readUInt32LE(0)
                          , r = e.readUInt8(4);
                        return 128 & r ? -(4294967296 * (-129 & r) + t) : 4294967296 * r + t
                    }
                    let n = 0;
                    for (let t = 0; t < i; ++t)
                        n |= e[t] << 8 * t;
                    return 128 & e[i - 1] ? -(n & ~(128 << 8 * (i - 1))) : n
                }
                ,
                r.encode = function(t) {
                    let r = Math.abs(t);
                    const i = (n = r) > 2147483647 ? 5 : n > 8388607 ? 4 : n > 32767 ? 3 : n > 127 ? 2 : n > 0 ? 1 : 0;
                    var n;
                    const s = e.allocUnsafe(i)
                      , o = t < 0;
                    for (let e = 0; e < i; ++e)
                        s.writeUInt8(255 & r, e),
                        r >>= 8;
                    return 128 & s[i - 1] ? s.writeUInt8(o ? 128 : 0, i - 1) : o && (s[i - 1] |= 128),
                    s
                }
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            buffer: 116
        }],
        89: [function(e, t, r) {
            (function(t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                    value: !0
                });
                const i = e("./types")
                  , n = e("bip66")
                  , s = e("typeforce")
                  , o = t.alloc(1, 0);
                function a(e) {
                    let r = 0;
                    for (; 0 === e[r]; )
                        ++r;
                    return r === e.length ? o : 128 & (e = e.slice(r))[0] ? t.concat([o, e], 1 + e.length) : e
                }
                function f(e) {
                    0 === e[0] && (e = e.slice(1));
                    const r = t.alloc(32, 0)
                      , i = Math.max(0, 32 - e.length);
                    return e.copy(r, i),
                    r
                }
                r.decode = function(e) {
                    const r = e.readUInt8(e.length - 1)
                      , i = -129 & r;
                    if (i <= 0 || i >= 4)
                        throw new Error("Invalid hashType " + r);
                    const s = n.decode(e.slice(0, -1))
                      , o = f(s.r)
                      , a = f(s.s);
                    return {
                        signature: t.concat([o, a], 64),
                        hashType: r
                    }
                }
                ,
                r.encode = function(e, r) {
                    s({
                        signature: i.BufferN(64),
                        hashType: i.UInt8
                    }, {
                        signature: e,
                        hashType: r
                    });
                    const o = -129 & r;
                    if (o <= 0 || o >= 4)
                        throw new Error("Invalid hashType " + r);
                    const f = t.allocUnsafe(1);
                    f.writeUInt8(r, 0);
                    const u = a(e.slice(0, 32))
                      , c = a(e.slice(32, 64));
                    return t.concat([n.encode(u, c), f])
                }
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            "./types": 113,
            bip66: 3,
            buffer: 116,
            typeforce: 67
        }],
        90: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("./input");
            r.input = i;
            const n = e("./output");
            r.output = n
        }
        , {
            "./input": 91,
            "./output": 92
        }],
        91: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("../../script")
              , n = e("../../script");
            function s(e) {
                return e === n.OPS.OP_0 || i.isCanonicalScriptSignature(e)
            }
            function o(e, t) {
                const r = i.decompile(e);
                return !(r.length < 2) && (r[0] === n.OPS.OP_0 && (t ? r.slice(1).every(s) : r.slice(1).every(i.isCanonicalScriptSignature)))
            }
            r.check = o,
            o.toJSON = ( () => "multisig input")
        }
        , {
            "../../script": 87
        }],
        92: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("../../script")
              , n = e("../../script")
              , s = e("../../types")
              , o = n.OPS.OP_RESERVED;
            function a(e, t) {
                const r = i.decompile(e);
                if (r.length < 4)
                    return !1;
                if (r[r.length - 1] !== n.OPS.OP_CHECKMULTISIG)
                    return !1;
                if (!s.Number(r[0]))
                    return !1;
                if (!s.Number(r[r.length - 2]))
                    return !1;
                const a = r[0] - o
                  , f = r[r.length - 2] - o;
                return !(a <= 0) && (!(f > 16) && (!(a > f) && (f === r.length - 3 && (!!t || r.slice(1, -2).every(i.isCanonicalPubKey)))))
            }
            r.check = a,
            a.toJSON = ( () => "multi-sig output")
        }
        , {
            "../../script": 87,
            "../../types": 113
        }],
        93: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("../script")
              , n = i.OPS;
            function s(e) {
                const t = i.compile(e);
                return t.length > 1 && t[0] === n.OP_RETURN
            }
            r.check = s,
            s.toJSON = ( () => "null data output");
            const o = {
                check: s
            };
            r.output = o
        }
        , {
            "../script": 87
        }],
        94: [function(e, t, r) {
            arguments[4][90][0].apply(r, arguments)
        }
        , {
            "./input": 95,
            "./output": 96,
            dup: 90
        }],
        95: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("../../script");
            function n(e) {
                const t = i.decompile(e);
                return 1 === t.length && i.isCanonicalScriptSignature(t[0])
            }
            r.check = n,
            n.toJSON = ( () => "pubKey input")
        }
        , {
            "../../script": 87
        }],
        96: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("../../script")
              , n = e("../../script");
            function s(e) {
                const t = i.decompile(e);
                return 2 === t.length && i.isCanonicalPubKey(t[0]) && t[1] === n.OPS.OP_CHECKSIG
            }
            r.check = s,
            s.toJSON = ( () => "pubKey output")
        }
        , {
            "../../script": 87
        }],
        97: [function(e, t, r) {
            arguments[4][90][0].apply(r, arguments)
        }
        , {
            "./input": 98,
            "./output": 99,
            dup: 90
        }],
        98: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("../../script");
            function n(e) {
                const t = i.decompile(e);
                return 2 === t.length && i.isCanonicalScriptSignature(t[0]) && i.isCanonicalPubKey(t[1])
            }
            r.check = n,
            n.toJSON = ( () => "pubKeyHash input")
        }
        , {
            "../../script": 87
        }],
        99: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("../../script")
              , n = e("../../script");
            function s(e) {
                const t = i.compile(e);
                return 25 === t.length && t[0] === n.OPS.OP_DUP && t[1] === n.OPS.OP_HASH160 && 20 === t[2] && t[23] === n.OPS.OP_EQUALVERIFY && t[24] === n.OPS.OP_CHECKSIG
            }
            r.check = s,
            s.toJSON = ( () => "pubKeyHash output")
        }
        , {
            "../../script": 87
        }],
        100: [function(e, t, r) {
            arguments[4][90][0].apply(r, arguments)
        }
        , {
            "./input": 101,
            "./output": 102,
            dup: 90
        }],
        101: [function(e, t, r) {
            (function(t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                    value: !0
                });
                const i = e("../../script")
                  , n = e("../multisig")
                  , s = e("../pubkey")
                  , o = e("../pubkeyhash")
                  , a = e("../witnesspubkeyhash/output")
                  , f = e("../witnessscripthash/output");
                function u(e, r) {
                    const u = i.decompile(e);
                    if (u.length < 1)
                        return !1;
                    const c = u[u.length - 1];
                    if (!t.isBuffer(c))
                        return !1;
                    const h = i.decompile(i.compile(u.slice(0, -1)))
                      , d = i.decompile(c);
                    return !!d && (!!i.isPushOnly(h) && (1 === u.length ? f.check(d) || a.check(d) : !(!o.input.check(h) || !o.output.check(d)) || (!(!n.input.check(h, r) || !n.output.check(d)) || !(!s.input.check(h) || !s.output.check(d)))))
                }
                r.check = u,
                u.toJSON = ( () => "scriptHash input")
            }
            ).call(this, {
                isBuffer: e("../../../../../../../usr/local/lib/node_modules/browserify/node_modules/is-buffer/index.js")
            })
        }
        , {
            "../../../../../../../usr/local/lib/node_modules/browserify/node_modules/is-buffer/index.js": 121,
            "../../script": 87,
            "../multisig": 90,
            "../pubkey": 94,
            "../pubkeyhash": 97,
            "../witnesspubkeyhash/output": 107,
            "../witnessscripthash/output": 110
        }],
        102: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("../../script")
              , n = e("../../script");
            function s(e) {
                const t = i.compile(e);
                return 23 === t.length && t[0] === n.OPS.OP_HASH160 && 20 === t[1] && t[22] === n.OPS.OP_EQUAL
            }
            r.check = s,
            s.toJSON = ( () => "scriptHash output")
        }
        , {
            "../../script": 87
        }],
        103: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("./output");
            r.output = i
        }
        , {
            "./output": 104
        }],
        104: [function(e, t, r) {
            (function(t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                    value: !0
                });
                const i = e("../../script")
                  , n = e("../../script")
                  , s = e("../../types")
                  , o = e("typeforce")
                  , a = t.from("aa21a9ed", "hex");
                function f(e) {
                    const t = i.compile(e);
                    return t.length > 37 && t[0] === n.OPS.OP_RETURN && 36 === t[1] && t.slice(2, 6).equals(a)
                }
                r.check = f,
                f.toJSON = ( () => "Witness commitment output"),
                r.encode = function(e) {
                    o(s.Hash256bit, e);
                    const r = t.allocUnsafe(36);
                    return a.copy(r, 0),
                    e.copy(r, 4),
                    i.compile([n.OPS.OP_RETURN, r])
                }
                ,
                r.decode = function(e) {
                    return o(f, e),
                    i.decompile(e)[1].slice(4, 36)
                }
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            "../../script": 87,
            "../../types": 113,
            buffer: 116,
            typeforce: 67
        }],
        105: [function(e, t, r) {
            arguments[4][90][0].apply(r, arguments)
        }
        , {
            "./input": 106,
            "./output": 107,
            dup: 90
        }],
        106: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("../../script");
            function n(e) {
                const t = i.decompile(e);
                return 2 === t.length && i.isCanonicalScriptSignature(t[0]) && (r = t[1],
                i.isCanonicalPubKey(r) && 33 === r.length);
                var r
            }
            r.check = n,
            n.toJSON = ( () => "witnessPubKeyHash input")
        }
        , {
            "../../script": 87
        }],
        107: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("../../script")
              , n = e("../../script");
            function s(e) {
                const t = i.compile(e);
                return 22 === t.length && t[0] === n.OPS.OP_0 && 20 === t[1]
            }
            r.check = s,
            s.toJSON = ( () => "Witness pubKeyHash output")
        }
        , {
            "../../script": 87
        }],
        108: [function(e, t, r) {
            arguments[4][90][0].apply(r, arguments)
        }
        , {
            "./input": 109,
            "./output": 110,
            dup: 90
        }],
        109: [function(e, t, r) {
            (function(t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                    value: !0
                });
                const i = e("../../script")
                  , n = e("typeforce")
                  , s = e("../multisig")
                  , o = e("../pubkey")
                  , a = e("../pubkeyhash");
                function f(e, r) {
                    if (n(n.Array, e),
                    e.length < 1)
                        return !1;
                    const f = e[e.length - 1];
                    if (!t.isBuffer(f))
                        return !1;
                    const u = i.decompile(f);
                    if (!u || 0 === u.length)
                        return !1;
                    const c = i.compile(e.slice(0, -1));
                    return !(!a.input.check(c) || !a.output.check(u)) || (!(!s.input.check(c, r) || !s.output.check(u)) || !(!o.input.check(c) || !o.output.check(u)))
                }
                r.check = f,
                f.toJSON = ( () => "witnessScriptHash input")
            }
            ).call(this, {
                isBuffer: e("../../../../../../../usr/local/lib/node_modules/browserify/node_modules/is-buffer/index.js")
            })
        }
        , {
            "../../../../../../../usr/local/lib/node_modules/browserify/node_modules/is-buffer/index.js": 121,
            "../../script": 87,
            "../multisig": 90,
            "../pubkey": 94,
            "../pubkeyhash": 97,
            typeforce: 67
        }],
        110: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("../../script")
              , n = e("../../script");
            function s(e) {
                const t = i.compile(e);
                return 34 === t.length && t[0] === n.OPS.OP_0 && 32 === t[1]
            }
            r.check = s,
            s.toJSON = ( () => "Witness scriptHash output")
        }
        , {
            "../../script": 87
        }],
        111: [function(e, t, r) {
            (function(t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                    value: !0
                });
                const i = e("./bufferutils")
                  , n = e("./bufferutils")
                  , s = e("./crypto")
                  , o = e("./script")
                  , a = e("./script")
                  , f = e("./types")
                  , u = e("typeforce")
                  , c = e("varuint-bitcoin");
                function h(e) {
                    const t = e.length;
                    return c.encodingLength(t) + t
                }
                const d = t.allocUnsafe(0)
                  , l = []
                  , p = t.from("0000000000000000000000000000000000000000000000000000000000000000", "hex")
                  , b = t.from("0000000000000000000000000000000000000000000000000000000000000001", "hex")
                  , m = t.from("ffffffffffffffff", "hex")
                  , y = {
                    script: d,
                    valueBuffer: m
                };
                class g {
                    constructor() {
                        this.version = 1,
                        this.locktime = 0,
                        this.ins = [],
                        this.outs = []
                    }
                    static fromBuffer(e, t) {
                        let r = 0;
                        function n(t) {
                            return r += t,
                            e.slice(r - t, r)
                        }
                        function s() {
                            const t = e.readUInt32LE(r);
                            return r += 4,
                            t
                        }
                        function o() {
                            const t = i.readUInt64LE(e, r);
                            return r += 8,
                            t
                        }
                        function a() {
                            const t = c.decode(e, r);
                            return r += c.decode.bytes,
                            t
                        }
                        function f() {
                            return n(a())
                        }
                        function u() {
                            const e = a()
                              , t = [];
                            for (let r = 0; r < e; r++)
                                t.push(f());
                            return t
                        }
                        const h = new g;
                        h.version = function() {
                            const t = e.readInt32LE(r);
                            return r += 4,
                            t
                        }();
                        const d = e.readUInt8(r)
                          , p = e.readUInt8(r + 1);
                        let b = !1;
                        d === g.ADVANCED_TRANSACTION_MARKER && p === g.ADVANCED_TRANSACTION_FLAG && (r += 2,
                        b = !0);
                        const m = a();
                        for (let e = 0; e < m; ++e)
                            h.ins.push({
                                hash: n(32),
                                index: s(),
                                script: f(),
                                sequence: s(),
                                witness: l
                            });
                        const y = a();
                        for (let e = 0; e < y; ++e)
                            h.outs.push({
                                value: o(),
                                script: f()
                            });
                        if (b) {
                            for (let e = 0; e < m; ++e)
                                h.ins[e].witness = u();
                            if (!h.hasWitnesses())
                                throw new Error("Transaction has superfluous witness data")
                        }
                        if (h.locktime = s(),
                        t)
                            return h;
                        if (r !== e.length)
                            throw new Error("Transaction has unexpected data");
                        return h
                    }
                    static fromHex(e) {
                        return g.fromBuffer(t.from(e, "hex"), !1)
                    }
                    static isCoinbaseHash(e) {
                        u(f.Hash256bit, e);
                        for (let t = 0; t < 32; ++t)
                            if (0 !== e[t])
                                return !1;
                        return !0
                    }
                    isCoinbase() {
                        return 1 === this.ins.length && g.isCoinbaseHash(this.ins[0].hash)
                    }
                    addInput(e, t, r, i) {
                        return u(f.tuple(f.Hash256bit, f.UInt32, f.maybe(f.UInt32), f.maybe(f.Buffer)), arguments),
                        f.Null(r) && (r = g.DEFAULT_SEQUENCE),
                        this.ins.push({
                            hash: e,
                            index: t,
                            script: i || d,
                            sequence: r,
                            witness: l
                        }) - 1
                    }
                    addOutput(e, t) {
                        return u(f.tuple(f.Buffer, f.Satoshi), arguments),
                        this.outs.push({
                            script: e,
                            value: t
                        }) - 1
                    }
                    hasWitnesses() {
                        return this.ins.some(e => 0 !== e.witness.length)
                    }
                    weight() {
                        return 3 * this.byteLength(!1) + this.byteLength(!0)
                    }
                    virtualSize() {
                        return Math.ceil(this.weight() / 4)
                    }
                    byteLength(e=!0) {
                        const t = e && this.hasWitnesses();
                        return (t ? 10 : 8) + c.encodingLength(this.ins.length) + c.encodingLength(this.outs.length) + this.ins.reduce( (e, t) => e + 40 + h(t.script), 0) + this.outs.reduce( (e, t) => e + 8 + h(t.script), 0) + (t ? this.ins.reduce( (e, t) => e + function(e) {
                            const t = e.length;
                            return c.encodingLength(t) + e.reduce( (e, t) => e + h(t), 0)
                        }(t.witness), 0) : 0)
                    }
                    clone() {
                        const e = new g;
                        return e.version = this.version,
                        e.locktime = this.locktime,
                        e.ins = this.ins.map(e => ({
                            hash: e.hash,
                            index: e.index,
                            script: e.script,
                            sequence: e.sequence,
                            witness: e.witness
                        })),
                        e.outs = this.outs.map(e => ({
                            script: e.script,
                            value: e.value
                        })),
                        e
                    }
                    hashForSignature(e, r, i) {
                        if (u(f.tuple(f.UInt32, f.Buffer, f.Number), arguments),
                        e >= this.ins.length)
                            return b;
                        const n = o.compile(o.decompile(r).filter(e => e !== a.OPS.OP_CODESEPARATOR))
                          , c = this.clone();
                        if ((31 & i) === g.SIGHASH_NONE)
                            c.outs = [],
                            c.ins.forEach( (t, r) => {
                                r !== e && (t.sequence = 0)
                            }
                            );
                        else if ((31 & i) === g.SIGHASH_SINGLE) {
                            if (e >= this.outs.length)
                                return b;
                            c.outs.length = e + 1;
                            for (let t = 0; t < e; t++)
                                c.outs[t] = y;
                            c.ins.forEach( (t, r) => {
                                r !== e && (t.sequence = 0)
                            }
                            )
                        }
                        i & g.SIGHASH_ANYONECANPAY ? (c.ins = [c.ins[e]],
                        c.ins[0].script = n) : (c.ins.forEach(e => {
                            e.script = d
                        }
                        ),
                        c.ins[e].script = n);
                        const h = t.allocUnsafe(c.byteLength(!1) + 4);
                        return h.writeInt32LE(i, h.length - 4),
                        c.__toBuffer(h, 0, !1),
                        s.hash256(h)
                    }
                    hashForWitnessV0(e, r, n, o) {
                        u(f.tuple(f.UInt32, f.Buffer, f.Satoshi, f.UInt32), arguments);
                        let a = t.from([])
                          , d = 0;
                        function l(e) {
                            d += e.copy(a, d)
                        }
                        function b(e) {
                            d = a.writeUInt32LE(e, d)
                        }
                        function m(e) {
                            d = i.writeUInt64LE(a, e, d)
                        }
                        function y(e) {
                            var t;
                            t = e.length,
                            c.encode(t, a, d),
                            d += c.encode.bytes,
                            l(e)
                        }
                        let v = p
                          , w = p
                          , _ = p;
                        if (o & g.SIGHASH_ANYONECANPAY || (a = t.allocUnsafe(36 * this.ins.length),
                        d = 0,
                        this.ins.forEach(e => {
                            l(e.hash),
                            b(e.index)
                        }
                        ),
                        w = s.hash256(a)),
                        o & g.SIGHASH_ANYONECANPAY || (31 & o) === g.SIGHASH_SINGLE || (31 & o) === g.SIGHASH_NONE || (a = t.allocUnsafe(4 * this.ins.length),
                        d = 0,
                        this.ins.forEach(e => {
                            b(e.sequence)
                        }
                        ),
                        _ = s.hash256(a)),
                        (31 & o) !== g.SIGHASH_SINGLE && (31 & o) !== g.SIGHASH_NONE) {
                            const e = this.outs.reduce( (e, t) => e + 8 + h(t.script), 0);
                            a = t.allocUnsafe(e),
                            d = 0,
                            this.outs.forEach(e => {
                                m(e.value),
                                y(e.script)
                            }
                            ),
                            v = s.hash256(a)
                        } else if ((31 & o) === g.SIGHASH_SINGLE && e < this.outs.length) {
                            const r = this.outs[e];
                            a = t.allocUnsafe(8 + h(r.script)),
                            d = 0,
                            m(r.value),
                            y(r.script),
                            v = s.hash256(a)
                        }
                        a = t.allocUnsafe(156 + h(r)),
                        d = 0;
                        const S = this.ins[e];
                        return b(this.version),
                        l(w),
                        l(_),
                        l(S.hash),
                        b(S.index),
                        y(r),
                        m(n),
                        b(S.sequence),
                        l(v),
                        b(this.locktime),
                        b(o),
                        s.hash256(a)
                    }
                    getHash(e) {
                        return e && this.isCoinbase() ? t.alloc(32, 0) : s.hash256(this.__toBuffer(void 0, void 0, e))
                    }
                    getId() {
                        return n.reverseBuffer(this.getHash(!1)).toString("hex")
                    }
                    toBuffer(e, t) {
                        return this.__toBuffer(e, t, !0)
                    }
                    toHex() {
                        return this.toBuffer(void 0, void 0).toString("hex")
                    }
                    setInputScript(e, t) {
                        u(f.tuple(f.Number, f.Buffer), arguments),
                        this.ins[e].script = t
                    }
                    setWitness(e, t) {
                        u(f.tuple(f.Number, [f.Buffer]), arguments),
                        this.ins[e].witness = t
                    }
                    __toBuffer(e, r, n=!1) {
                        e || (e = t.allocUnsafe(this.byteLength(n)));
                        let s = r || 0;
                        function o(t) {
                            s += t.copy(e, s)
                        }
                        function a(t) {
                            s = e.writeUInt8(t, s)
                        }
                        function f(t) {
                            s = e.writeUInt32LE(t, s)
                        }
                        function u(t) {
                            c.encode(t, e, s),
                            s += c.encode.bytes
                        }
                        function h(e) {
                            u(e.length),
                            o(e)
                        }
                        var d;
                        d = this.version,
                        s = e.writeInt32LE(d, s);
                        const l = n && this.hasWitnesses();
                        var p;
                        return l && (a(g.ADVANCED_TRANSACTION_MARKER),
                        a(g.ADVANCED_TRANSACTION_FLAG)),
                        u(this.ins.length),
                        this.ins.forEach(e => {
                            o(e.hash),
                            f(e.index),
                            h(e.script),
                            f(e.sequence)
                        }
                        ),
                        u(this.outs.length),
                        this.outs.forEach(t => {
                            void 0 !== t.value ? function(t) {
                                s = i.writeUInt64LE(e, t, s)
                            }(t.value) : o(t.valueBuffer),
                            h(t.script)
                        }
                        ),
                        l && this.ins.forEach(e => {
                            u((p = e.witness).length),
                            p.forEach(h)
                        }
                        ),
                        f(this.locktime),
                        void 0 !== r ? e.slice(r, s) : e
                    }
                }
                g.DEFAULT_SEQUENCE = 4294967295,
                g.SIGHASH_ALL = 1,
                g.SIGHASH_NONE = 2,
                g.SIGHASH_SINGLE = 3,
                g.SIGHASH_ANYONECANPAY = 128,
                g.ADVANCED_TRANSACTION_MARKER = 0,
                g.ADVANCED_TRANSACTION_FLAG = 1,
                r.Transaction = g
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            "./bufferutils": 73,
            "./crypto": 75,
            "./script": 87,
            "./types": 113,
            buffer: 116,
            typeforce: 67,
            "varuint-bitcoin": 69
        }],
        112: [function(e, t, r) {
            (function(t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                    value: !0
                });
                const i = e("./address")
                  , n = e("./bufferutils")
                  , s = e("./classify")
                  , o = e("./crypto")
                  , ECPair = e("./ecpair")
                  , a = e("./networks")
                  , f = e("./payments")
                  , u = e("./script")
                  , c = e("./script")
                  , h = e("./transaction")
                  , d = e("./types")
                  , l = e("typeforce")
                  , p = s.types
                  , b = new Set(["p2pkh", "p2pk", "p2wpkh", "p2ms", "p2sh-p2pkh", "p2sh-p2pk", "p2sh-p2wpkh", "p2sh-p2ms", "p2wsh-p2pkh", "p2wsh-p2pk", "p2wsh-p2ms", "p2sh-p2wsh-p2pkh", "p2sh-p2wsh-p2pk", "p2sh-p2wsh-p2ms"]);
                function m(e, t, r) {
                    try {
                        l(e, t)
                    } catch (e) {
                        throw new Error(r)
                    }
                }
                class y {
                    constructor(e=a.bitcoin, t=2500) {
                        this.network = e,
                        this.maximumFeeRate = t,
                        this.__PREV_TX_SET = {},
                        this.__INPUTS = [],
                        this.__TX = new h.Transaction,
                        this.__TX.version = 2,
                        this.__USE_LOW_R = !1
                    }
                    static fromTransaction(e, t) {
                        const r = new y(t);
                        return r.setVersion(e.version),
                        r.setLockTime(e.locktime),
                        e.outs.forEach(e => {
                            r.addOutput(e.script, e.value)
                        }
                        ),
                        e.ins.forEach(e => {
                            r.__addInputUnsafe(e.hash, e.index, {
                                sequence: e.sequence,
                                script: e.script,
                                witness: e.witness
                            })
                        }
                        ),
                        r.__INPUTS.forEach( (t, r) => {
                            !function(e, t, r) {
                                if (e.redeemScriptType !== p.P2MS || !e.redeemScript)
                                    return;
                                if (e.pubkeys.length === e.signatures.length)
                                    return;
                                const i = e.signatures.concat();
                                e.signatures = e.pubkeys.map(n => {
                                    const s = ECPair.fromPublicKey(n);
                                    let o;
                                    return i.some( (n, a) => {
                                        if (!n)
                                            return !1;
                                        const f = u.signature.decode(n)
                                          , c = t.hashForSignature(r, e.redeemScript, f.hashType);
                                        return !!s.verify(c, f.signature) && (i[a] = void 0,
                                        o = n,
                                        !0)
                                    }
                                    ),
                                    o
                                }
                                )
                            }(t, e, r)
                        }
                        ),
                        r
                    }
                    setLowR(e) {
                        return l(l.maybe(l.Boolean), e),
                        void 0 === e && (e = !0),
                        this.__USE_LOW_R = e,
                        e
                    }
                    setLockTime(e) {
                        if (l(d.UInt32, e),
                        this.__INPUTS.some(e => !!e.signatures && e.signatures.some(e => void 0 !== e)))
                            throw new Error("No, this would invalidate signatures");
                        this.__TX.locktime = e
                    }
                    setVersion(e) {
                        l(d.UInt32, e),
                        this.__TX.version = e
                    }
                    addInput(e, r, i, s) {
                        if (!this.__canModifyInputs())
                            throw new Error("No, this would invalidate signatures");
                        let o;
                        if ("string" == typeof (a = e) || a instanceof String)
                            e = n.reverseBuffer(t.from(e, "hex"));
                        else if (function(e) {
                            return e instanceof h.Transaction
                        }(e)) {
                            const t = e.outs[r];
                            s = t.script,
                            o = t.value,
                            e = e.getHash(!1)
                        }
                        var a;
                        return this.__addInputUnsafe(e, r, {
                            sequence: i,
                            prevOutScript: s,
                            value: o
                        })
                    }
                    addOutput(e, t) {
                        if (!this.__canModifyOutputs())
                            throw new Error("No, this would invalidate signatures");
                        return "string" == typeof e && (e = i.toOutputScript(e, this.network)),
                        this.__TX.addOutput(e, t)
                    }
                    build() {
                        return this.__build(!1)
                    }
                    buildIncomplete() {
                        return this.__build(!0)
                    }
                    sign(e, t, r, i, n, s) {
                        !function({input: e, ourPubKey: t, keyPair: r, signatureHash: i, hashType: n, useLowR: s}) {
                            let o = !1;
                            for (const [a,f] of e.pubkeys.entries()) {
                                if (!t.equals(f))
                                    continue;
                                if (e.signatures[a])
                                    throw new Error("Signature already exists");
                                if (33 !== t.length && e.hasWitness)
                                    throw new Error("BIP143 rejects uncompressed public keys in P2WPKH or P2WSH");
                                const c = r.sign(i, s);
                                e.signatures[a] = u.signature.encode(c, n),
                                o = !0
                            }
                            if (!o)
                                throw new Error("Key pair cannot sign for this input")
                        }(function(e, t, r, i, n, s, o, a, c, y, w) {
                            let _;
                            if ("number" == typeof n)
                                _ = n;
                            else {
                                if ("object" != typeof n)
                                    throw new TypeError("TransactionBuilder sign first arg must be TxbSignArg or number");
                                !function(e, t) {
                                    if (!b.has(t.prevOutScriptType))
                                        throw new TypeError(`Unknown prevOutScriptType "${t.prevOutScriptType}"`);
                                    m(l.Number, t.vin, "sign must include vin parameter as Number (input index)"),
                                    m(d.Signer, t.keyPair, "sign must include keyPair parameter as Signer interface"),
                                    m(l.maybe(l.Number), t.hashType, "sign hashType parameter must be a number");
                                    const r = (e[t.vin] || []).prevOutType
                                      , i = t.prevOutScriptType;
                                    switch (i) {
                                    case "p2pkh":
                                        if (r && "pubkeyhash" !== r)
                                            throw new TypeError(`input #${t.vin} is not of type p2pkh: ${r}`);
                                        m(l.value(void 0), t.witnessScript, `${i} requires NO witnessScript`),
                                        m(l.value(void 0), t.redeemScript, `${i} requires NO redeemScript`),
                                        m(l.value(void 0), t.witnessValue, `${i} requires NO witnessValue`);
                                        break;
                                    case "p2pk":
                                        if (r && "pubkey" !== r)
                                            throw new TypeError(`input #${t.vin} is not of type p2pk: ${r}`);
                                        m(l.value(void 0), t.witnessScript, `${i} requires NO witnessScript`),
                                        m(l.value(void 0), t.redeemScript, `${i} requires NO redeemScript`),
                                        m(l.value(void 0), t.witnessValue, `${i} requires NO witnessValue`);
                                        break;
                                    case "p2wpkh":
                                        if (r && "witnesspubkeyhash" !== r)
                                            throw new TypeError(`input #${t.vin} is not of type p2wpkh: ${r}`);
                                        m(l.value(void 0), t.witnessScript, `${i} requires NO witnessScript`),
                                        m(l.value(void 0), t.redeemScript, `${i} requires NO redeemScript`),
                                        m(d.Satoshi, t.witnessValue, `${i} requires witnessValue`);
                                        break;
                                    case "p2ms":
                                        if (r && "multisig" !== r)
                                            throw new TypeError(`input #${t.vin} is not of type p2ms: ${r}`);
                                        m(l.value(void 0), t.witnessScript, `${i} requires NO witnessScript`),
                                        m(l.value(void 0), t.redeemScript, `${i} requires NO redeemScript`),
                                        m(l.value(void 0), t.witnessValue, `${i} requires NO witnessValue`);
                                        break;
                                    case "p2sh-p2wpkh":
                                        if (r && "scripthash" !== r)
                                            throw new TypeError(`input #${t.vin} is not of type p2sh-p2wpkh: ${r}`);
                                        m(l.value(void 0), t.witnessScript, `${i} requires NO witnessScript`),
                                        m(l.Buffer, t.redeemScript, `${i} requires redeemScript`),
                                        m(d.Satoshi, t.witnessValue, `${i} requires witnessValue`);
                                        break;
                                    case "p2sh-p2ms":
                                    case "p2sh-p2pk":
                                    case "p2sh-p2pkh":
                                        if (r && "scripthash" !== r)
                                            throw new TypeError(`input #${t.vin} is not of type ${i}: ${r}`);
                                        m(l.value(void 0), t.witnessScript, `${i} requires NO witnessScript`),
                                        m(l.Buffer, t.redeemScript, `${i} requires redeemScript`),
                                        m(l.value(void 0), t.witnessValue, `${i} requires NO witnessValue`);
                                        break;
                                    case "p2wsh-p2ms":
                                    case "p2wsh-p2pk":
                                    case "p2wsh-p2pkh":
                                        if (r && "witnessscripthash" !== r)
                                            throw new TypeError(`input #${t.vin} is not of type ${i}: ${r}`);
                                        m(l.Buffer, t.witnessScript, `${i} requires witnessScript`),
                                        m(l.value(void 0), t.redeemScript, `${i} requires NO redeemScript`),
                                        m(d.Satoshi, t.witnessValue, `${i} requires witnessValue`);
                                        break;
                                    case "p2sh-p2wsh-p2ms":
                                    case "p2sh-p2wsh-p2pk":
                                    case "p2sh-p2wsh-p2pkh":
                                        if (r && "scripthash" !== r)
                                            throw new TypeError(`input #${t.vin} is not of type ${i}: ${r}`);
                                        m(l.Buffer, t.witnessScript, `${i} requires witnessScript`),
                                        m(l.Buffer, t.redeemScript, `${i} requires witnessScript`),
                                        m(d.Satoshi, t.witnessValue, `${i} requires witnessScript`)
                                    }
                                }(t, n),
                                ({vin: _, keyPair: s, redeemScript: o, hashType: a, witnessValue: c, witnessScript: y} = n)
                            }
                            if (void 0 === s)
                                throw new Error("sign requires keypair");
                            if (s.network && s.network !== e)
                                throw new TypeError("Inconsistent network");
                            if (!t[_])
                                throw new Error("No input at index: " + _);
                            if (a = a || h.Transaction.SIGHASH_ALL,
                            r(a))
                                throw new Error("Transaction needs outputs");
                            const S = t[_];
                            if (void 0 !== S.redeemScript && o && !S.redeemScript.equals(o))
                                throw new Error("Inconsistent redeemScript");
                            const M = s.publicKey || s.getPublicKey && s.getPublicKey();
                            if (!v(S)) {
                                if (void 0 !== c) {
                                    if (void 0 !== S.value && S.value !== c)
                                        throw new Error("Input did not match witnessValue");
                                    l(d.Satoshi, c),
                                    S.value = c
                                }
                                if (!v(S)) {
                                    const e = function(e, t, r, i) {
                                        if (r && i) {
                                            const n = f.p2wsh({
                                                redeem: {
                                                    output: i
                                                }
                                            })
                                              , s = f.p2wsh({
                                                output: r
                                            })
                                              , o = f.p2sh({
                                                redeem: {
                                                    output: r
                                                }
                                            })
                                              , a = f.p2sh({
                                                redeem: n
                                            });
                                            if (!n.hash.equals(s.hash))
                                                throw new Error("Witness script inconsistent with prevOutScript");
                                            if (!o.hash.equals(a.hash))
                                                throw new Error("Redeem script inconsistent with prevOutScript");
                                            const c = g(n.redeem.output, t);
                                            if (!c.pubkeys)
                                                throw new Error(c.type + " not supported as witnessScript (" + u.toASM(i) + ")");
                                            e.signatures && e.signatures.some(e => void 0 !== e) && (c.signatures = e.signatures);
                                            const h = i;
                                            if (c.type === p.P2WPKH)
                                                throw new Error("P2SH(P2WSH(P2WPKH)) is a consensus failure");
                                            return {
                                                redeemScript: r,
                                                redeemScriptType: p.P2WSH,
                                                witnessScript: i,
                                                witnessScriptType: c.type,
                                                prevOutType: p.P2SH,
                                                prevOutScript: o.output,
                                                hasWitness: !0,
                                                signScript: h,
                                                signType: c.type,
                                                pubkeys: c.pubkeys,
                                                signatures: c.signatures,
                                                maxSignatures: c.maxSignatures
                                            }
                                        }
                                        if (r) {
                                            const i = f.p2sh({
                                                redeem: {
                                                    output: r
                                                }
                                            });
                                            if (e.prevOutScript) {
                                                let t;
                                                try {
                                                    t = f.p2sh({
                                                        output: e.prevOutScript
                                                    })
                                                } catch (e) {
                                                    throw new Error("PrevOutScript must be P2SH")
                                                }
                                                if (!i.hash.equals(t.hash))
                                                    throw new Error("Redeem script inconsistent with prevOutScript")
                                            }
                                            const n = g(i.redeem.output, t);
                                            if (!n.pubkeys)
                                                throw new Error(n.type + " not supported as redeemScript (" + u.toASM(r) + ")");
                                            e.signatures && e.signatures.some(e => void 0 !== e) && (n.signatures = e.signatures);
                                            let s = r;
                                            return n.type === p.P2WPKH && (s = f.p2pkh({
                                                pubkey: n.pubkeys[0]
                                            }).output),
                                            {
                                                redeemScript: r,
                                                redeemScriptType: n.type,
                                                prevOutType: p.P2SH,
                                                prevOutScript: i.output,
                                                hasWitness: n.type === p.P2WPKH,
                                                signScript: s,
                                                signType: n.type,
                                                pubkeys: n.pubkeys,
                                                signatures: n.signatures,
                                                maxSignatures: n.maxSignatures
                                            }
                                        }
                                        if (i) {
                                            const r = f.p2wsh({
                                                redeem: {
                                                    output: i
                                                }
                                            });
                                            if (e.prevOutScript) {
                                                const t = f.p2wsh({
                                                    output: e.prevOutScript
                                                });
                                                if (!r.hash.equals(t.hash))
                                                    throw new Error("Witness script inconsistent with prevOutScript")
                                            }
                                            const n = g(r.redeem.output, t);
                                            if (!n.pubkeys)
                                                throw new Error(n.type + " not supported as witnessScript (" + u.toASM(i) + ")");
                                            e.signatures && e.signatures.some(e => void 0 !== e) && (n.signatures = e.signatures);
                                            const s = i;
                                            if (n.type === p.P2WPKH)
                                                throw new Error("P2WSH(P2WPKH) is a consensus failure");
                                            return {
                                                witnessScript: i,
                                                witnessScriptType: n.type,
                                                prevOutType: p.P2WSH,
                                                prevOutScript: r.output,
                                                hasWitness: !0,
                                                signScript: s,
                                                signType: n.type,
                                                pubkeys: n.pubkeys,
                                                signatures: n.signatures,
                                                maxSignatures: n.maxSignatures
                                            }
                                        }
                                        if (e.prevOutType && e.prevOutScript) {
                                            if (e.prevOutType === p.P2SH)
                                                throw new Error("PrevOutScript is " + e.prevOutType + ", requires redeemScript");
                                            if (e.prevOutType === p.P2WSH)
                                                throw new Error("PrevOutScript is " + e.prevOutType + ", requires witnessScript");
                                            if (!e.prevOutScript)
                                                throw new Error("PrevOutScript is missing");
                                            const r = g(e.prevOutScript, t);
                                            if (!r.pubkeys)
                                                throw new Error(r.type + " not supported (" + u.toASM(e.prevOutScript) + ")");
                                            e.signatures && e.signatures.some(e => void 0 !== e) && (r.signatures = e.signatures);
                                            let i = e.prevOutScript;
                                            return r.type === p.P2WPKH && (i = f.p2pkh({
                                                pubkey: r.pubkeys[0]
                                            }).output),
                                            {
                                                prevOutType: r.type,
                                                prevOutScript: e.prevOutScript,
                                                hasWitness: r.type === p.P2WPKH,
                                                signScript: i,
                                                signType: r.type,
                                                pubkeys: r.pubkeys,
                                                signatures: r.signatures,
                                                maxSignatures: r.maxSignatures
                                            }
                                        }
                                        const n = f.p2pkh({
                                            pubkey: t
                                        }).output;
                                        return {
                                            prevOutType: p.P2PKH,
                                            prevOutScript: n,
                                            hasWitness: !1,
                                            signScript: n,
                                            signType: p.P2PKH,
                                            pubkeys: [t],
                                            signatures: [void 0]
                                        }
                                    }(S, M, o, y);
                                    Object.assign(S, e)
                                }
                                if (!v(S))
                                    throw Error(S.prevOutType + " not supported")
                            }
                            let E;
                            E = S.hasWitness ? i.hashForWitnessV0(_, S.signScript, S.value, a) : i.hashForSignature(_, S.signScript, a);
                            return {
                                input: S,
                                ourPubKey: M,
                                keyPair: s,
                                signatureHash: E,
                                hashType: a,
                                useLowR: !!w
                            }
                        }(this.network, this.__INPUTS, this.__needsOutputs.bind(this), this.__TX, e, t, r, i, n, s, this.__USE_LOW_R))
                    }
                    __addInputUnsafe(e, t, r) {
                        if (h.Transaction.isCoinbaseHash(e))
                            throw new Error("coinbase inputs not supported");
                        const i = e.toString("hex") + ":" + t;
                        if (void 0 !== this.__PREV_TX_SET[i])
                            throw new Error("Duplicate TxOut: " + i);
                        let n = {};
                        if (void 0 !== r.script && (n = function e(t, r, i, n) {
                            if (0 === t.length && 0 === r.length)
                                return {};
                            if (!i) {
                                let e = s.input(t, !0)
                                  , n = s.witness(r, !0);
                                e === p.NONSTANDARD && (e = void 0),
                                n === p.NONSTANDARD && (n = void 0),
                                i = e || n
                            }
                            switch (i) {
                            case p.P2WPKH:
                                {
                                    const {output: e, pubkey: t, signature: i} = f.p2wpkh({
                                        witness: r
                                    });
                                    return {
                                        prevOutScript: e,
                                        prevOutType: p.P2WPKH,
                                        pubkeys: [t],
                                        signatures: [i]
                                    }
                                }
                            case p.P2PKH:
                                {
                                    const {output: e, pubkey: r, signature: i} = f.p2pkh({
                                        input: t
                                    });
                                    return {
                                        prevOutScript: e,
                                        prevOutType: p.P2PKH,
                                        pubkeys: [r],
                                        signatures: [i]
                                    }
                                }
                            case p.P2PK:
                                {
                                    const {signature: e} = f.p2pk({
                                        input: t
                                    });
                                    return {
                                        prevOutType: p.P2PK,
                                        pubkeys: [void 0],
                                        signatures: [e]
                                    }
                                }
                            case p.P2MS:
                                {
                                    const {m: e, pubkeys: r, signatures: i} = f.p2ms({
                                        input: t,
                                        output: n
                                    }, {
                                        allowIncomplete: !0
                                    });
                                    return {
                                        prevOutType: p.P2MS,
                                        pubkeys: r,
                                        signatures: i,
                                        maxSignatures: e
                                    }
                                }
                            }
                            if (i === p.P2SH) {
                                const {output: i, redeem: n} = f.p2sh({
                                    input: t,
                                    witness: r
                                })
                                  , o = s.output(n.output)
                                  , a = e(n.input, n.witness, o, n.output);
                                return a.prevOutType ? {
                                    prevOutScript: i,
                                    prevOutType: p.P2SH,
                                    redeemScript: n.output,
                                    redeemScriptType: a.prevOutType,
                                    witnessScript: a.witnessScript,
                                    witnessScriptType: a.witnessScriptType,
                                    pubkeys: a.pubkeys,
                                    signatures: a.signatures
                                } : {}
                            }
                            if (i === p.P2WSH) {
                                const {output: i, redeem: n} = f.p2wsh({
                                    input: t,
                                    witness: r
                                })
                                  , o = s.output(n.output);
                                let a;
                                return (a = o === p.P2WPKH ? e(n.input, n.witness, o) : e(u.compile(n.witness), [], o, n.output)).prevOutType ? {
                                    prevOutScript: i,
                                    prevOutType: p.P2WSH,
                                    witnessScript: n.output,
                                    witnessScriptType: a.prevOutType,
                                    pubkeys: a.pubkeys,
                                    signatures: a.signatures
                                } : {}
                            }
                            return {
                                prevOutType: p.NONSTANDARD,
                                prevOutScript: t
                            }
                        }(r.script, r.witness || [])),
                        void 0 !== r.value && (n.value = r.value),
                        !n.prevOutScript && r.prevOutScript) {
                            let e;
                            if (!n.pubkeys && !n.signatures) {
                                const t = g(r.prevOutScript);
                                t.pubkeys && (n.pubkeys = t.pubkeys,
                                n.signatures = t.signatures),
                                e = t.type
                            }
                            n.prevOutScript = r.prevOutScript,
                            n.prevOutType = e || s.output(r.prevOutScript)
                        }
                        const o = this.__TX.addInput(e, t, r.sequence, r.scriptSig);
                        return this.__INPUTS[o] = n,
                        this.__PREV_TX_SET[i] = !0,
                        o
                    }
                    __build(e) {
                        if (!e) {
                            if (!this.__TX.ins.length)
                                throw new Error("Transaction has no inputs");
                            if (!this.__TX.outs.length)
                                throw new Error("Transaction has no outputs")
                        }
                        const t = this.__TX.clone();
                        if (this.__INPUTS.forEach( (r, i) => {
                            if (!r.prevOutType && !e)
                                throw new Error("Transaction is not complete");
                            const n = function e(t, r, i) {
                                const n = r.pubkeys || [];
                                let s = r.signatures || [];
                                switch (t) {
                                case p.P2PKH:
                                    if (0 === n.length)
                                        break;
                                    if (0 === s.length)
                                        break;
                                    return f.p2pkh({
                                        pubkey: n[0],
                                        signature: s[0]
                                    });
                                case p.P2WPKH:
                                    if (0 === n.length)
                                        break;
                                    if (0 === s.length)
                                        break;
                                    return f.p2wpkh({
                                        pubkey: n[0],
                                        signature: s[0]
                                    });
                                case p.P2PK:
                                    if (0 === n.length)
                                        break;
                                    if (0 === s.length)
                                        break;
                                    return f.p2pk({
                                        signature: s[0]
                                    });
                                case p.P2MS:
                                    {
                                        const e = r.maxSignatures;
                                        s = i ? s.map(e => e || c.OPS.OP_0) : s.filter(e => e);
                                        const t = !i || e === s.length;
                                        return f.p2ms({
                                            m: e,
                                            pubkeys: n,
                                            signatures: s
                                        }, {
                                            allowIncomplete: i,
                                            validate: t
                                        })
                                    }
                                case p.P2SH:
                                    {
                                        const t = e(r.redeemScriptType, r, i);
                                        if (!t)
                                            return;
                                        return f.p2sh({
                                            redeem: {
                                                output: t.output || r.redeemScript,
                                                input: t.input,
                                                witness: t.witness
                                            }
                                        })
                                    }
                                case p.P2WSH:
                                    {
                                        const t = e(r.witnessScriptType, r, i);
                                        if (!t)
                                            return;
                                        return f.p2wsh({
                                            redeem: {
                                                output: r.witnessScript,
                                                input: t.input,
                                                witness: t.witness
                                            }
                                        })
                                    }
                                }
                            }(r.prevOutType, r, e);
                            if (n)
                                t.setInputScript(i, n.input),
                                t.setWitness(i, n.witness);
                            else {
                                if (!e && r.prevOutType === p.NONSTANDARD)
                                    throw new Error("Unknown input type");
                                if (!e)
                                    throw new Error("Not enough information")
                            }
                        }
                        ),
                        !e && this.__overMaximumFees(t.virtualSize()))
                            throw new Error("Transaction has absurd fees");
                        return t
                    }
                    __canModifyInputs() {
                        return this.__INPUTS.every(e => !e.signatures || e.signatures.every(e => {
                            if (!e)
                                return !0;
                            return 0 != (w(e) & h.Transaction.SIGHASH_ANYONECANPAY)
                        }
                        ))
                    }
                    __needsOutputs(e) {
                        return e === h.Transaction.SIGHASH_ALL ? 0 === this.__TX.outs.length : 0 === this.__TX.outs.length && this.__INPUTS.some(e => !!e.signatures && e.signatures.some(e => {
                            if (!e)
                                return !1;
                            return !(w(e) & h.Transaction.SIGHASH_NONE)
                        }
                        ))
                    }
                    __canModifyOutputs() {
                        const e = this.__TX.ins.length
                          , t = this.__TX.outs.length;
                        return this.__INPUTS.every(r => void 0 === r.signatures || r.signatures.every(r => {
                            if (!r)
                                return !0;
                            const i = 31 & w(r);
                            return i === h.Transaction.SIGHASH_NONE || i === h.Transaction.SIGHASH_SINGLE && e <= t
                        }
                        ))
                    }
                    __overMaximumFees(e) {
                        return (this.__INPUTS.reduce( (e, t) => e + (t.value >>> 0), 0) - this.__TX.outs.reduce( (e, t) => e + t.value, 0)) / e > this.maximumFeeRate
                    }
                }
                function g(e, t) {
                    l(d.Buffer, e);
                    const r = s.output(e);
                    switch (r) {
                    case p.P2PKH:
                        {
                            if (!t)
                                return {
                                    type: r
                                };
                            const i = f.p2pkh({
                                output: e
                            }).hash
                              , n = o.hash160(t);
                            return i.equals(n) ? {
                                type: r,
                                pubkeys: [t],
                                signatures: [void 0]
                            } : {
                                type: r
                            }
                        }
                    case p.P2WPKH:
                        {
                            if (!t)
                                return {
                                    type: r
                                };
                            const i = f.p2wpkh({
                                output: e
                            }).hash
                              , n = o.hash160(t);
                            return i.equals(n) ? {
                                type: r,
                                pubkeys: [t],
                                signatures: [void 0]
                            } : {
                                type: r
                            }
                        }
                    case p.P2PK:
                        return {
                            type: r,
                            pubkeys: [f.p2pk({
                                output: e
                            }).pubkey],
                            signatures: [void 0]
                        };
                    case p.P2MS:
                        {
                            const t = f.p2ms({
                                output: e
                            });
                            return {
                                type: r,
                                pubkeys: t.pubkeys,
                                signatures: t.pubkeys.map( () => void 0),
                                maxSignatures: t.m
                            }
                        }
                    }
                    return {
                        type: r
                    }
                }
                function v(e) {
                    return void 0 !== e.signScript && void 0 !== e.signType && void 0 !== e.pubkeys && void 0 !== e.signatures && e.signatures.length === e.pubkeys.length && e.pubkeys.length > 0 && (!1 === e.hasWitness || void 0 !== e.value)
                }
                function w(e) {
                    return e.readUInt8(e.length - 1)
                }
                r.TransactionBuilder = y
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            "./address": 71,
            "./bufferutils": 73,
            "./classify": 74,
            "./crypto": 75,
            "./ecpair": 76,
            "./networks": 77,
            "./payments": 79,
            "./script": 87,
            "./transaction": 111,
            "./types": 113,
            buffer: 116,
            typeforce: 67
        }],
        113: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("typeforce")
              , n = Math.pow(2, 31) - 1;
            function s(e) {
                return i.String(e) && !!e.match(/^(m\/)?(\d+'?\/)*\d+'?$/)
            }
            r.UInt31 = function(e) {
                return i.UInt32(e) && e <= n
            }
            ,
            r.BIP32Path = s,
            s.toJSON = ( () => "BIP32 derivation path"),
            r.Signer = function(e) {
                return (i.Buffer(e.publicKey) || "function" == typeof e.getPublicKey) && "function" == typeof e.sign
            }
            ;
            const o = 21e14;
            r.Satoshi = function(e) {
                return i.UInt53(e) && e <= o
            }
            ,
            r.ECPoint = i.quacksLike("Point"),
            r.Network = i.compile({
                messagePrefix: i.oneOf(i.Buffer, i.String),
                bip32: {
                    public: i.UInt32,
                    private: i.UInt32
                },
                pubKeyHash: i.UInt8,
                scriptHash: i.UInt8,
                wif: i.UInt8
            }),
            r.Buffer256bit = i.BufferN(32),
            r.Hash160bit = i.BufferN(20),
            r.Hash256bit = i.BufferN(32),
            r.Number = i.Number,
            r.Array = i.Array,
            r.Boolean = i.Boolean,
            r.String = i.String,
            r.Buffer = i.Buffer,
            r.Hex = i.Hex,
            r.maybe = i.maybe,
            r.tuple = i.tuple,
            r.UInt8 = i.UInt8,
            r.UInt32 = i.UInt32,
            r.Function = i.Function,
            r.BufferN = i.BufferN,
            r.Null = i.Null,
            r.oneOf = i.oneOf
        }
        , {
            typeforce: 67
        }],
        "/": [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            const i = e("safe-buffer").Buffer;
            r.Buffer = i;
            const n = e("./address");
            r.address = n;
            const s = e("./crypto");
            r.crypto = s;
            const ECPair = e("./ecpair");
            r.ECPair = ECPair;
            const o = e("./payments");
            r.payments = o;
            const a = e("./script");
            r.script = a;
            var f = e("./block");
            r.Block = f.Block;
            var u = e("./script");
            r.opcodes = u.OPS;
            var c = e("./transaction");
            r.Transaction = c.Transaction;
            var h = e("./transaction_builder");
            r.TransactionBuilder = h.TransactionBuilder
        }
        , {
            "./address": 71,
            "./block": 72,
            "./crypto": 75,
            "./ecpair": 76,
            "./payments": 79,
            "./script": 87,
            "./transaction": 111,
            "./transaction_builder": 112,
            "safe-buffer": 54
        }],
        114: [function(e, t, r) {
            "use strict";
            r.byteLength = function(e) {
                var t = u(e)
                  , r = t[0]
                  , i = t[1];
                return 3 * (r + i) / 4 - i
            }
            ,
            r.toByteArray = function(e) {
                var t, r, i = u(e), o = i[0], a = i[1], f = new s(function(e, t, r) {
                    return 3 * (t + r) / 4 - r
                }(0, o, a)), c = 0, h = a > 0 ? o - 4 : o;
                for (r = 0; r < h; r += 4)
                    t = n[e.charCodeAt(r)] << 18 | n[e.charCodeAt(r + 1)] << 12 | n[e.charCodeAt(r + 2)] << 6 | n[e.charCodeAt(r + 3)],
                    f[c++] = t >> 16 & 255,
                    f[c++] = t >> 8 & 255,
                    f[c++] = 255 & t;
                2 === a && (t = n[e.charCodeAt(r)] << 2 | n[e.charCodeAt(r + 1)] >> 4,
                f[c++] = 255 & t);
                1 === a && (t = n[e.charCodeAt(r)] << 10 | n[e.charCodeAt(r + 1)] << 4 | n[e.charCodeAt(r + 2)] >> 2,
                f[c++] = t >> 8 & 255,
                f[c++] = 255 & t);
                return f
            }
            ,
            r.fromByteArray = function(e) {
                for (var t, r = e.length, n = r % 3, s = [], o = 0, a = r - n; o < a; o += 16383)
                    s.push(c(e, o, o + 16383 > a ? a : o + 16383));
                1 === n ? (t = e[r - 1],
                s.push(i[t >> 2] + i[t << 4 & 63] + "==")) : 2 === n && (t = (e[r - 2] << 8) + e[r - 1],
                s.push(i[t >> 10] + i[t >> 4 & 63] + i[t << 2 & 63] + "="));
                return s.join("")
            }
            ;
            for (var i = [], n = [], s = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, f = o.length; a < f; ++a)
                i[a] = o[a],
                n[o.charCodeAt(a)] = a;
            function u(e) {
                var t = e.length;
                if (t % 4 > 0)
                    throw new Error("Invalid string. Length must be a multiple of 4");
                var r = e.indexOf("=");
                return -1 === r && (r = t),
                [r, r === t ? 0 : 4 - r % 4]
            }
            function c(e, t, r) {
                for (var n, s, o = [], a = t; a < r; a += 3)
                    n = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]),
                    o.push(i[(s = n) >> 18 & 63] + i[s >> 12 & 63] + i[s >> 6 & 63] + i[63 & s]);
                return o.join("")
            }
            n["-".charCodeAt(0)] = 62,
            n["_".charCodeAt(0)] = 63
        }
        , {}],
        115: [function(e, t, r) {}
        , {}],
        116: [function(e, t, r) {
            (function(t) {
                "use strict";
                var i = e("base64-js")
                  , n = e("ieee754")
                  , s = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
                r.Buffer = t,
                r.SlowBuffer = function(e) {
                    +e != e && (e = 0);
                    return t.alloc(+e)
                }
                ,
                r.INSPECT_MAX_BYTES = 50;
                var o = 2147483647;
                function a(e) {
                    if (e > o)
                        throw new RangeError('The value "' + e + '" is invalid for option "size"');
                    var r = new Uint8Array(e);
                    return Object.setPrototypeOf(r, t.prototype),
                    r
                }
                function t(e, t, r) {
                    if ("number" == typeof e) {
                        if ("string" == typeof t)
                            throw new TypeError('The "string" argument must be of type string. Received type number');
                        return c(e)
                    }
                    return f(e, t, r)
                }
                function f(e, r, i) {
                    if ("string" == typeof e)
                        return function(e, r) {
                            "string" == typeof r && "" !== r || (r = "utf8");
                            if (!t.isEncoding(r))
                                throw new TypeError("Unknown encoding: " + r);
                            var i = 0 | l(e, r)
                              , n = a(i)
                              , s = n.write(e, r);
                            s !== i && (n = n.slice(0, s));
                            return n
                        }(e, r);
                    if (ArrayBuffer.isView(e))
                        return h(e);
                    if (null == e)
                        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
                    if (C(e, ArrayBuffer) || e && C(e.buffer, ArrayBuffer))
                        return function(e, r, i) {
                            if (r < 0 || e.byteLength < r)
                                throw new RangeError('"offset" is outside of buffer bounds');
                            if (e.byteLength < r + (i || 0))
                                throw new RangeError('"length" is outside of buffer bounds');
                            var n;
                            n = void 0 === r && void 0 === i ? new Uint8Array(e) : void 0 === i ? new Uint8Array(e,r) : new Uint8Array(e,r,i);
                            return Object.setPrototypeOf(n, t.prototype),
                            n
                        }(e, r, i);
                    if ("number" == typeof e)
                        throw new TypeError('The "value" argument must not be of type number. Received type number');
                    var n = e.valueOf && e.valueOf();
                    if (null != n && n !== e)
                        return t.from(n, r, i);
                    var s = function(e) {
                        if (t.isBuffer(e)) {
                            var r = 0 | d(e.length)
                              , i = a(r);
                            return 0 === i.length ? i : (e.copy(i, 0, 0, r),
                            i)
                        }
                        if (void 0 !== e.length)
                            return "number" != typeof e.length || H(e.length) ? a(0) : h(e);
                        if ("Buffer" === e.type && Array.isArray(e.data))
                            return h(e.data)
                    }(e);
                    if (s)
                        return s;
                    if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive])
                        return t.from(e[Symbol.toPrimitive]("string"), r, i);
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
                }
                function u(e) {
                    if ("number" != typeof e)
                        throw new TypeError('"size" argument must be of type number');
                    if (e < 0)
                        throw new RangeError('The value "' + e + '" is invalid for option "size"')
                }
                function c(e) {
                    return u(e),
                    a(e < 0 ? 0 : 0 | d(e))
                }
                function h(e) {
                    for (var t = e.length < 0 ? 0 : 0 | d(e.length), r = a(t), i = 0; i < t; i += 1)
                        r[i] = 255 & e[i];
                    return r
                }
                function d(e) {
                    if (e >= o)
                        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o.toString(16) + " bytes");
                    return 0 | e
                }
                function l(e, r) {
                    if (t.isBuffer(e))
                        return e.length;
                    if (ArrayBuffer.isView(e) || C(e, ArrayBuffer))
                        return e.byteLength;
                    if ("string" != typeof e)
                        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
                    var i = e.length
                      , n = arguments.length > 2 && !0 === arguments[2];
                    if (!n && 0 === i)
                        return 0;
                    for (var s = !1; ; )
                        switch (r) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return i;
                        case "utf8":
                        case "utf-8":
                            return j(e).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * i;
                        case "hex":
                            return i >>> 1;
                        case "base64":
                            return U(e).length;
                        default:
                            if (s)
                                return n ? -1 : j(e).length;
                            r = ("" + r).toLowerCase(),
                            s = !0
                        }
                }
                function p(e, t, r) {
                    var i = e[t];
                    e[t] = e[r],
                    e[r] = i
                }
                function b(e, r, i, n, s) {
                    if (0 === e.length)
                        return -1;
                    if ("string" == typeof i ? (n = i,
                    i = 0) : i > 2147483647 ? i = 2147483647 : i < -2147483648 && (i = -2147483648),
                    H(i = +i) && (i = s ? 0 : e.length - 1),
                    i < 0 && (i = e.length + i),
                    i >= e.length) {
                        if (s)
                            return -1;
                        i = e.length - 1
                    } else if (i < 0) {
                        if (!s)
                            return -1;
                        i = 0
                    }
                    if ("string" == typeof r && (r = t.from(r, n)),
                    t.isBuffer(r))
                        return 0 === r.length ? -1 : m(e, r, i, n, s);
                    if ("number" == typeof r)
                        return r &= 255,
                        "function" == typeof Uint8Array.prototype.indexOf ? s ? Uint8Array.prototype.indexOf.call(e, r, i) : Uint8Array.prototype.lastIndexOf.call(e, r, i) : m(e, [r], i, n, s);
                    throw new TypeError("val must be string, number or Buffer")
                }
                function m(e, t, r, i, n) {
                    var s, o = 1, a = e.length, f = t.length;
                    if (void 0 !== i && ("ucs2" === (i = String(i).toLowerCase()) || "ucs-2" === i || "utf16le" === i || "utf-16le" === i)) {
                        if (e.length < 2 || t.length < 2)
                            return -1;
                        o = 2,
                        a /= 2,
                        f /= 2,
                        r /= 2
                    }
                    function u(e, t) {
                        return 1 === o ? e[t] : e.readUInt16BE(t * o)
                    }
                    if (n) {
                        var c = -1;
                        for (s = r; s < a; s++)
                            if (u(e, s) === u(t, -1 === c ? 0 : s - c)) {
                                if (-1 === c && (c = s),
                                s - c + 1 === f)
                                    return c * o
                            } else
                                -1 !== c && (s -= s - c),
                                c = -1
                    } else
                        for (r + f > a && (r = a - f),
                        s = r; s >= 0; s--) {
                            for (var h = !0, d = 0; d < f; d++)
                                if (u(e, s + d) !== u(t, d)) {
                                    h = !1;
                                    break
                                }
                            if (h)
                                return s
                        }
                    return -1
                }
                function y(e, t, r, i) {
                    r = Number(r) || 0;
                    var n = e.length - r;
                    i ? (i = Number(i)) > n && (i = n) : i = n;
                    var s = t.length;
                    i > s / 2 && (i = s / 2);
                    for (var o = 0; o < i; ++o) {
                        var a = parseInt(t.substr(2 * o, 2), 16);
                        if (H(a))
                            return o;
                        e[r + o] = a
                    }
                    return o
                }
                function g(e, t, r, i) {
                    return q(j(t, e.length - r), e, r, i)
                }
                function v(e, t, r, i) {
                    return q(function(e) {
                        for (var t = [], r = 0; r < e.length; ++r)
                            t.push(255 & e.charCodeAt(r));
                        return t
                    }(t), e, r, i)
                }
                function w(e, t, r, i) {
                    return v(e, t, r, i)
                }
                function _(e, t, r, i) {
                    return q(U(t), e, r, i)
                }
                function S(e, t, r, i) {
                    return q(function(e, t) {
                        for (var r, i, n, s = [], o = 0; o < e.length && !((t -= 2) < 0); ++o)
                            r = e.charCodeAt(o),
                            i = r >> 8,
                            n = r % 256,
                            s.push(n),
                            s.push(i);
                        return s
                    }(t, e.length - r), e, r, i)
                }
                function M(e, t, r) {
                    return 0 === t && r === e.length ? i.fromByteArray(e) : i.fromByteArray(e.slice(t, r))
                }
                function E(e, t, r) {
                    r = Math.min(e.length, r);
                    for (var i = [], n = t; n < r; ) {
                        var s, o, a, f, u = e[n], c = null, h = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                        if (n + h <= r)
                            switch (h) {
                            case 1:
                                u < 128 && (c = u);
                                break;
                            case 2:
                                128 == (192 & (s = e[n + 1])) && (f = (31 & u) << 6 | 63 & s) > 127 && (c = f);
                                break;
                            case 3:
                                s = e[n + 1],
                                o = e[n + 2],
                                128 == (192 & s) && 128 == (192 & o) && (f = (15 & u) << 12 | (63 & s) << 6 | 63 & o) > 2047 && (f < 55296 || f > 57343) && (c = f);
                                break;
                            case 4:
                                s = e[n + 1],
                                o = e[n + 2],
                                a = e[n + 3],
                                128 == (192 & s) && 128 == (192 & o) && 128 == (192 & a) && (f = (15 & u) << 18 | (63 & s) << 12 | (63 & o) << 6 | 63 & a) > 65535 && f < 1114112 && (c = f)
                            }
                        null === c ? (c = 65533,
                        h = 1) : c > 65535 && (c -= 65536,
                        i.push(c >>> 10 & 1023 | 55296),
                        c = 56320 | 1023 & c),
                        i.push(c),
                        n += h
                    }
                    return function(e) {
                        var t = e.length;
                        if (t <= k)
                            return String.fromCharCode.apply(String, e);
                        var r = ""
                          , i = 0;
                        for (; i < t; )
                            r += String.fromCharCode.apply(String, e.slice(i, i += k));
                        return r
                    }(i)
                }
                r.kMaxLength = o,
                t.TYPED_ARRAY_SUPPORT = function() {
                    try {
                        var e = new Uint8Array(1)
                          , t = {
                            foo: function() {
                                return 42
                            }
                        };
                        return Object.setPrototypeOf(t, Uint8Array.prototype),
                        Object.setPrototypeOf(e, t),
                        42 === e.foo()
                    } catch (e) {
                        return !1
                    }
                }(),
                t.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),
                Object.defineProperty(t.prototype, "parent", {
                    enumerable: !0,
                    get: function() {
                        if (t.isBuffer(this))
                            return this.buffer
                    }
                }),
                Object.defineProperty(t.prototype, "offset", {
                    enumerable: !0,
                    get: function() {
                        if (t.isBuffer(this))
                            return this.byteOffset
                    }
                }),
                "undefined" != typeof Symbol && null != Symbol.species && t[Symbol.species] === t && Object.defineProperty(t, Symbol.species, {
                    value: null,
                    configurable: !0,
                    enumerable: !1,
                    writable: !1
                }),
                t.poolSize = 8192,
                t.from = function(e, t, r) {
                    return f(e, t, r)
                }
                ,
                Object.setPrototypeOf(t.prototype, Uint8Array.prototype),
                Object.setPrototypeOf(t, Uint8Array),
                t.alloc = function(e, t, r) {
                    return function(e, t, r) {
                        return u(e),
                        e <= 0 ? a(e) : void 0 !== t ? "string" == typeof r ? a(e).fill(t, r) : a(e).fill(t) : a(e)
                    }(e, t, r)
                }
                ,
                t.allocUnsafe = function(e) {
                    return c(e)
                }
                ,
                t.allocUnsafeSlow = function(e) {
                    return c(e)
                }
                ,
                t.isBuffer = function(e) {
                    return null != e && !0 === e._isBuffer && e !== t.prototype
                }
                ,
                t.compare = function(e, r) {
                    if (C(e, Uint8Array) && (e = t.from(e, e.offset, e.byteLength)),
                    C(r, Uint8Array) && (r = t.from(r, r.offset, r.byteLength)),
                    !t.isBuffer(e) || !t.isBuffer(r))
                        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (e === r)
                        return 0;
                    for (var i = e.length, n = r.length, s = 0, o = Math.min(i, n); s < o; ++s)
                        if (e[s] !== r[s]) {
                            i = e[s],
                            n = r[s];
                            break
                        }
                    return i < n ? -1 : n < i ? 1 : 0
                }
                ,
                t.isEncoding = function(e) {
                    switch (String(e).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                    }
                }
                ,
                t.concat = function(e, r) {
                    if (!Array.isArray(e))
                        throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === e.length)
                        return t.alloc(0);
                    var i;
                    if (void 0 === r)
                        for (r = 0,
                        i = 0; i < e.length; ++i)
                            r += e[i].length;
                    var n = t.allocUnsafe(r)
                      , s = 0;
                    for (i = 0; i < e.length; ++i) {
                        var o = e[i];
                        if (C(o, Uint8Array) && (o = t.from(o)),
                        !t.isBuffer(o))
                            throw new TypeError('"list" argument must be an Array of Buffers');
                        o.copy(n, s),
                        s += o.length
                    }
                    return n
                }
                ,
                t.byteLength = l,
                t.prototype._isBuffer = !0,
                t.prototype.swap16 = function() {
                    var e = this.length;
                    if (e % 2 != 0)
                        throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var t = 0; t < e; t += 2)
                        p(this, t, t + 1);
                    return this
                }
                ,
                t.prototype.swap32 = function() {
                    var e = this.length;
                    if (e % 4 != 0)
                        throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var t = 0; t < e; t += 4)
                        p(this, t, t + 3),
                        p(this, t + 1, t + 2);
                    return this
                }
                ,
                t.prototype.swap64 = function() {
                    var e = this.length;
                    if (e % 8 != 0)
                        throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var t = 0; t < e; t += 8)
                        p(this, t, t + 7),
                        p(this, t + 1, t + 6),
                        p(this, t + 2, t + 5),
                        p(this, t + 3, t + 4);
                    return this
                }
                ,
                t.prototype.toString = function() {
                    var e = this.length;
                    return 0 === e ? "" : 0 === arguments.length ? E(this, 0, e) : function(e, t, r) {
                        var i = !1;
                        if ((void 0 === t || t < 0) && (t = 0),
                        t > this.length)
                            return "";
                        if ((void 0 === r || r > this.length) && (r = this.length),
                        r <= 0)
                            return "";
                        if ((r >>>= 0) <= (t >>>= 0))
                            return "";
                        for (e || (e = "utf8"); ; )
                            switch (e) {
                            case "hex":
                                return A(this, t, r);
                            case "utf8":
                            case "utf-8":
                                return E(this, t, r);
                            case "ascii":
                                return O(this, t, r);
                            case "latin1":
                            case "binary":
                                return P(this, t, r);
                            case "base64":
                                return M(this, t, r);
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return I(this, t, r);
                            default:
                                if (i)
                                    throw new TypeError("Unknown encoding: " + e);
                                e = (e + "").toLowerCase(),
                                i = !0
                            }
                    }
                    .apply(this, arguments)
                }
                ,
                t.prototype.toLocaleString = t.prototype.toString,
                t.prototype.equals = function(e) {
                    if (!t.isBuffer(e))
                        throw new TypeError("Argument must be a Buffer");
                    return this === e || 0 === t.compare(this, e)
                }
                ,
                t.prototype.inspect = function() {
                    var e = ""
                      , t = r.INSPECT_MAX_BYTES;
                    return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(),
                    this.length > t && (e += " ... "),
                    "<Buffer " + e + ">"
                }
                ,
                s && (t.prototype[s] = t.prototype.inspect),
                t.prototype.compare = function(e, r, i, n, s) {
                    if (C(e, Uint8Array) && (e = t.from(e, e.offset, e.byteLength)),
                    !t.isBuffer(e))
                        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
                    if (void 0 === r && (r = 0),
                    void 0 === i && (i = e ? e.length : 0),
                    void 0 === n && (n = 0),
                    void 0 === s && (s = this.length),
                    r < 0 || i > e.length || n < 0 || s > this.length)
                        throw new RangeError("out of range index");
                    if (n >= s && r >= i)
                        return 0;
                    if (n >= s)
                        return -1;
                    if (r >= i)
                        return 1;
                    if (r >>>= 0,
                    i >>>= 0,
                    n >>>= 0,
                    s >>>= 0,
                    this === e)
                        return 0;
                    for (var o = s - n, a = i - r, f = Math.min(o, a), u = this.slice(n, s), c = e.slice(r, i), h = 0; h < f; ++h)
                        if (u[h] !== c[h]) {
                            o = u[h],
                            a = c[h];
                            break
                        }
                    return o < a ? -1 : a < o ? 1 : 0
                }
                ,
                t.prototype.includes = function(e, t, r) {
                    return -1 !== this.indexOf(e, t, r)
                }
                ,
                t.prototype.indexOf = function(e, t, r) {
                    return b(this, e, t, r, !0)
                }
                ,
                t.prototype.lastIndexOf = function(e, t, r) {
                    return b(this, e, t, r, !1)
                }
                ,
                t.prototype.write = function(e, t, r, i) {
                    if (void 0 === t)
                        i = "utf8",
                        r = this.length,
                        t = 0;
                    else if (void 0 === r && "string" == typeof t)
                        i = t,
                        r = this.length,
                        t = 0;
                    else {
                        if (!isFinite(t))
                            throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        t >>>= 0,
                        isFinite(r) ? (r >>>= 0,
                        void 0 === i && (i = "utf8")) : (i = r,
                        r = void 0)
                    }
                    var n = this.length - t;
                    if ((void 0 === r || r > n) && (r = n),
                    e.length > 0 && (r < 0 || t < 0) || t > this.length)
                        throw new RangeError("Attempt to write outside buffer bounds");
                    i || (i = "utf8");
                    for (var s = !1; ; )
                        switch (i) {
                        case "hex":
                            return y(this, e, t, r);
                        case "utf8":
                        case "utf-8":
                            return g(this, e, t, r);
                        case "ascii":
                            return v(this, e, t, r);
                        case "latin1":
                        case "binary":
                            return w(this, e, t, r);
                        case "base64":
                            return _(this, e, t, r);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return S(this, e, t, r);
                        default:
                            if (s)
                                throw new TypeError("Unknown encoding: " + i);
                            i = ("" + i).toLowerCase(),
                            s = !0
                        }
                }
                ,
                t.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                }
                ;
                var k = 4096;
                function O(e, t, r) {
                    var i = "";
                    r = Math.min(e.length, r);
                    for (var n = t; n < r; ++n)
                        i += String.fromCharCode(127 & e[n]);
                    return i
                }
                function P(e, t, r) {
                    var i = "";
                    r = Math.min(e.length, r);
                    for (var n = t; n < r; ++n)
                        i += String.fromCharCode(e[n]);
                    return i
                }
                function A(e, t, r) {
                    var i = e.length;
                    (!t || t < 0) && (t = 0),
                    (!r || r < 0 || r > i) && (r = i);
                    for (var n = "", s = t; s < r; ++s)
                        n += z[e[s]];
                    return n
                }
                function I(e, t, r) {
                    for (var i = e.slice(t, r), n = "", s = 0; s < i.length; s += 2)
                        n += String.fromCharCode(i[s] + 256 * i[s + 1]);
                    return n
                }
                function x(e, t, r) {
                    if (e % 1 != 0 || e < 0)
                        throw new RangeError("offset is not uint");
                    if (e + t > r)
                        throw new RangeError("Trying to access beyond buffer length")
                }
                function T(e, r, i, n, s, o) {
                    if (!t.isBuffer(e))
                        throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (r > s || r < o)
                        throw new RangeError('"value" argument is out of bounds');
                    if (i + n > e.length)
                        throw new RangeError("Index out of range")
                }
                function N(e, t, r, i, n, s) {
                    if (r + i > e.length)
                        throw new RangeError("Index out of range");
                    if (r < 0)
                        throw new RangeError("Index out of range")
                }
                function B(e, t, r, i, s) {
                    return t = +t,
                    r >>>= 0,
                    s || N(e, 0, r, 4),
                    n.write(e, t, r, i, 23, 4),
                    r + 4
                }
                function R(e, t, r, i, s) {
                    return t = +t,
                    r >>>= 0,
                    s || N(e, 0, r, 8),
                    n.write(e, t, r, i, 52, 8),
                    r + 8
                }
                t.prototype.slice = function(e, r) {
                    var i = this.length;
                    e = ~~e,
                    r = void 0 === r ? i : ~~r,
                    e < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i),
                    r < 0 ? (r += i) < 0 && (r = 0) : r > i && (r = i),
                    r < e && (r = e);
                    var n = this.subarray(e, r);
                    return Object.setPrototypeOf(n, t.prototype),
                    n
                }
                ,
                t.prototype.readUIntLE = function(e, t, r) {
                    e >>>= 0,
                    t >>>= 0,
                    r || x(e, t, this.length);
                    for (var i = this[e], n = 1, s = 0; ++s < t && (n *= 256); )
                        i += this[e + s] * n;
                    return i
                }
                ,
                t.prototype.readUIntBE = function(e, t, r) {
                    e >>>= 0,
                    t >>>= 0,
                    r || x(e, t, this.length);
                    for (var i = this[e + --t], n = 1; t > 0 && (n *= 256); )
                        i += this[e + --t] * n;
                    return i
                }
                ,
                t.prototype.readUInt8 = function(e, t) {
                    return e >>>= 0,
                    t || x(e, 1, this.length),
                    this[e]
                }
                ,
                t.prototype.readUInt16LE = function(e, t) {
                    return e >>>= 0,
                    t || x(e, 2, this.length),
                    this[e] | this[e + 1] << 8
                }
                ,
                t.prototype.readUInt16BE = function(e, t) {
                    return e >>>= 0,
                    t || x(e, 2, this.length),
                    this[e] << 8 | this[e + 1]
                }
                ,
                t.prototype.readUInt32LE = function(e, t) {
                    return e >>>= 0,
                    t || x(e, 4, this.length),
                    (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
                }
                ,
                t.prototype.readUInt32BE = function(e, t) {
                    return e >>>= 0,
                    t || x(e, 4, this.length),
                    16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
                }
                ,
                t.prototype.readIntLE = function(e, t, r) {
                    e >>>= 0,
                    t >>>= 0,
                    r || x(e, t, this.length);
                    for (var i = this[e], n = 1, s = 0; ++s < t && (n *= 256); )
                        i += this[e + s] * n;
                    return i >= (n *= 128) && (i -= Math.pow(2, 8 * t)),
                    i
                }
                ,
                t.prototype.readIntBE = function(e, t, r) {
                    e >>>= 0,
                    t >>>= 0,
                    r || x(e, t, this.length);
                    for (var i = t, n = 1, s = this[e + --i]; i > 0 && (n *= 256); )
                        s += this[e + --i] * n;
                    return s >= (n *= 128) && (s -= Math.pow(2, 8 * t)),
                    s
                }
                ,
                t.prototype.readInt8 = function(e, t) {
                    return e >>>= 0,
                    t || x(e, 1, this.length),
                    128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                }
                ,
                t.prototype.readInt16LE = function(e, t) {
                    e >>>= 0,
                    t || x(e, 2, this.length);
                    var r = this[e] | this[e + 1] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }
                ,
                t.prototype.readInt16BE = function(e, t) {
                    e >>>= 0,
                    t || x(e, 2, this.length);
                    var r = this[e + 1] | this[e] << 8;
                    return 32768 & r ? 4294901760 | r : r
                }
                ,
                t.prototype.readInt32LE = function(e, t) {
                    return e >>>= 0,
                    t || x(e, 4, this.length),
                    this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
                }
                ,
                t.prototype.readInt32BE = function(e, t) {
                    return e >>>= 0,
                    t || x(e, 4, this.length),
                    this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
                }
                ,
                t.prototype.readFloatLE = function(e, t) {
                    return e >>>= 0,
                    t || x(e, 4, this.length),
                    n.read(this, e, !0, 23, 4)
                }
                ,
                t.prototype.readFloatBE = function(e, t) {
                    return e >>>= 0,
                    t || x(e, 4, this.length),
                    n.read(this, e, !1, 23, 4)
                }
                ,
                t.prototype.readDoubleLE = function(e, t) {
                    return e >>>= 0,
                    t || x(e, 8, this.length),
                    n.read(this, e, !0, 52, 8)
                }
                ,
                t.prototype.readDoubleBE = function(e, t) {
                    return e >>>= 0,
                    t || x(e, 8, this.length),
                    n.read(this, e, !1, 52, 8)
                }
                ,
                t.prototype.writeUIntLE = function(e, t, r, i) {
                    (e = +e,
                    t >>>= 0,
                    r >>>= 0,
                    i) || T(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                    var n = 1
                      , s = 0;
                    for (this[t] = 255 & e; ++s < r && (n *= 256); )
                        this[t + s] = e / n & 255;
                    return t + r
                }
                ,
                t.prototype.writeUIntBE = function(e, t, r, i) {
                    (e = +e,
                    t >>>= 0,
                    r >>>= 0,
                    i) || T(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                    var n = r - 1
                      , s = 1;
                    for (this[t + n] = 255 & e; --n >= 0 && (s *= 256); )
                        this[t + n] = e / s & 255;
                    return t + r
                }
                ,
                t.prototype.writeUInt8 = function(e, t, r) {
                    return e = +e,
                    t >>>= 0,
                    r || T(this, e, t, 1, 255, 0),
                    this[t] = 255 & e,
                    t + 1
                }
                ,
                t.prototype.writeUInt16LE = function(e, t, r) {
                    return e = +e,
                    t >>>= 0,
                    r || T(this, e, t, 2, 65535, 0),
                    this[t] = 255 & e,
                    this[t + 1] = e >>> 8,
                    t + 2
                }
                ,
                t.prototype.writeUInt16BE = function(e, t, r) {
                    return e = +e,
                    t >>>= 0,
                    r || T(this, e, t, 2, 65535, 0),
                    this[t] = e >>> 8,
                    this[t + 1] = 255 & e,
                    t + 2
                }
                ,
                t.prototype.writeUInt32LE = function(e, t, r) {
                    return e = +e,
                    t >>>= 0,
                    r || T(this, e, t, 4, 4294967295, 0),
                    this[t + 3] = e >>> 24,
                    this[t + 2] = e >>> 16,
                    this[t + 1] = e >>> 8,
                    this[t] = 255 & e,
                    t + 4
                }
                ,
                t.prototype.writeUInt32BE = function(e, t, r) {
                    return e = +e,
                    t >>>= 0,
                    r || T(this, e, t, 4, 4294967295, 0),
                    this[t] = e >>> 24,
                    this[t + 1] = e >>> 16,
                    this[t + 2] = e >>> 8,
                    this[t + 3] = 255 & e,
                    t + 4
                }
                ,
                t.prototype.writeIntLE = function(e, t, r, i) {
                    if (e = +e,
                    t >>>= 0,
                    !i) {
                        var n = Math.pow(2, 8 * r - 1);
                        T(this, e, t, r, n - 1, -n)
                    }
                    var s = 0
                      , o = 1
                      , a = 0;
                    for (this[t] = 255 & e; ++s < r && (o *= 256); )
                        e < 0 && 0 === a && 0 !== this[t + s - 1] && (a = 1),
                        this[t + s] = (e / o >> 0) - a & 255;
                    return t + r
                }
                ,
                t.prototype.writeIntBE = function(e, t, r, i) {
                    if (e = +e,
                    t >>>= 0,
                    !i) {
                        var n = Math.pow(2, 8 * r - 1);
                        T(this, e, t, r, n - 1, -n)
                    }
                    var s = r - 1
                      , o = 1
                      , a = 0;
                    for (this[t + s] = 255 & e; --s >= 0 && (o *= 256); )
                        e < 0 && 0 === a && 0 !== this[t + s + 1] && (a = 1),
                        this[t + s] = (e / o >> 0) - a & 255;
                    return t + r
                }
                ,
                t.prototype.writeInt8 = function(e, t, r) {
                    return e = +e,
                    t >>>= 0,
                    r || T(this, e, t, 1, 127, -128),
                    e < 0 && (e = 255 + e + 1),
                    this[t] = 255 & e,
                    t + 1
                }
                ,
                t.prototype.writeInt16LE = function(e, t, r) {
                    return e = +e,
                    t >>>= 0,
                    r || T(this, e, t, 2, 32767, -32768),
                    this[t] = 255 & e,
                    this[t + 1] = e >>> 8,
                    t + 2
                }
                ,
                t.prototype.writeInt16BE = function(e, t, r) {
                    return e = +e,
                    t >>>= 0,
                    r || T(this, e, t, 2, 32767, -32768),
                    this[t] = e >>> 8,
                    this[t + 1] = 255 & e,
                    t + 2
                }
                ,
                t.prototype.writeInt32LE = function(e, t, r) {
                    return e = +e,
                    t >>>= 0,
                    r || T(this, e, t, 4, 2147483647, -2147483648),
                    this[t] = 255 & e,
                    this[t + 1] = e >>> 8,
                    this[t + 2] = e >>> 16,
                    this[t + 3] = e >>> 24,
                    t + 4
                }
                ,
                t.prototype.writeInt32BE = function(e, t, r) {
                    return e = +e,
                    t >>>= 0,
                    r || T(this, e, t, 4, 2147483647, -2147483648),
                    e < 0 && (e = 4294967295 + e + 1),
                    this[t] = e >>> 24,
                    this[t + 1] = e >>> 16,
                    this[t + 2] = e >>> 8,
                    this[t + 3] = 255 & e,
                    t + 4
                }
                ,
                t.prototype.writeFloatLE = function(e, t, r) {
                    return B(this, e, t, !0, r)
                }
                ,
                t.prototype.writeFloatBE = function(e, t, r) {
                    return B(this, e, t, !1, r)
                }
                ,
                t.prototype.writeDoubleLE = function(e, t, r) {
                    return R(this, e, t, !0, r)
                }
                ,
                t.prototype.writeDoubleBE = function(e, t, r) {
                    return R(this, e, t, !1, r)
                }
                ,
                t.prototype.copy = function(e, r, i, n) {
                    if (!t.isBuffer(e))
                        throw new TypeError("argument should be a Buffer");
                    if (i || (i = 0),
                    n || 0 === n || (n = this.length),
                    r >= e.length && (r = e.length),
                    r || (r = 0),
                    n > 0 && n < i && (n = i),
                    n === i)
                        return 0;
                    if (0 === e.length || 0 === this.length)
                        return 0;
                    if (r < 0)
                        throw new RangeError("targetStart out of bounds");
                    if (i < 0 || i >= this.length)
                        throw new RangeError("Index out of range");
                    if (n < 0)
                        throw new RangeError("sourceEnd out of bounds");
                    n > this.length && (n = this.length),
                    e.length - r < n - i && (n = e.length - r + i);
                    var s = n - i;
                    if (this === e && "function" == typeof Uint8Array.prototype.copyWithin)
                        this.copyWithin(r, i, n);
                    else if (this === e && i < r && r < n)
                        for (var o = s - 1; o >= 0; --o)
                            e[o + r] = this[o + i];
                    else
                        Uint8Array.prototype.set.call(e, this.subarray(i, n), r);
                    return s
                }
                ,
                t.prototype.fill = function(e, r, i, n) {
                    if ("string" == typeof e) {
                        if ("string" == typeof r ? (n = r,
                        r = 0,
                        i = this.length) : "string" == typeof i && (n = i,
                        i = this.length),
                        void 0 !== n && "string" != typeof n)
                            throw new TypeError("encoding must be a string");
                        if ("string" == typeof n && !t.isEncoding(n))
                            throw new TypeError("Unknown encoding: " + n);
                        if (1 === e.length) {
                            var s = e.charCodeAt(0);
                            ("utf8" === n && s < 128 || "latin1" === n) && (e = s)
                        }
                    } else
                        "number" == typeof e ? e &= 255 : "boolean" == typeof e && (e = Number(e));
                    if (r < 0 || this.length < r || this.length < i)
                        throw new RangeError("Out of range index");
                    if (i <= r)
                        return this;
                    var o;
                    if (r >>>= 0,
                    i = void 0 === i ? this.length : i >>> 0,
                    e || (e = 0),
                    "number" == typeof e)
                        for (o = r; o < i; ++o)
                            this[o] = e;
                    else {
                        var a = t.isBuffer(e) ? e : t.from(e, n)
                          , f = a.length;
                        if (0 === f)
                            throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                        for (o = 0; o < i - r; ++o)
                            this[o + r] = a[o % f]
                    }
                    return this
                }
                ;
                var L = /[^+/0-9A-Za-z-_]/g;
                function j(e, t) {
                    var r;
                    t = t || 1 / 0;
                    for (var i = e.length, n = null, s = [], o = 0; o < i; ++o) {
                        if ((r = e.charCodeAt(o)) > 55295 && r < 57344) {
                            if (!n) {
                                if (r > 56319) {
                                    (t -= 3) > -1 && s.push(239, 191, 189);
                                    continue
                                }
                                if (o + 1 === i) {
                                    (t -= 3) > -1 && s.push(239, 191, 189);
                                    continue
                                }
                                n = r;
                                continue
                            }
                            if (r < 56320) {
                                (t -= 3) > -1 && s.push(239, 191, 189),
                                n = r;
                                continue
                            }
                            r = 65536 + (n - 55296 << 10 | r - 56320)
                        } else
                            n && (t -= 3) > -1 && s.push(239, 191, 189);
                        if (n = null,
                        r < 128) {
                            if ((t -= 1) < 0)
                                break;
                            s.push(r)
                        } else if (r < 2048) {
                            if ((t -= 2) < 0)
                                break;
                            s.push(r >> 6 | 192, 63 & r | 128)
                        } else if (r < 65536) {
                            if ((t -= 3) < 0)
                                break;
                            s.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                        } else {
                            if (!(r < 1114112))
                                throw new Error("Invalid code point");
                            if ((t -= 4) < 0)
                                break;
                            s.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                        }
                    }
                    return s
                }
                function U(e) {
                    return i.toByteArray(function(e) {
                        if ((e = (e = e.split("=")[0]).trim().replace(L, "")).length < 2)
                            return "";
                        for (; e.length % 4 != 0; )
                            e += "=";
                        return e
                    }(e))
                }
                function q(e, t, r, i) {
                    for (var n = 0; n < i && !(n + r >= t.length || n >= e.length); ++n)
                        t[n + r] = e[n];
                    return n
                }
                function C(e, t) {
                    return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
                }
                function H(e) {
                    return e != e
                }
                var z = function() {
                    for (var e = new Array(256), t = 0; t < 16; ++t)
                        for (var r = 16 * t, i = 0; i < 16; ++i)
                            e[r + i] = "0123456789abcdef"[t] + "0123456789abcdef"[i];
                    return e
                }()
            }
            ).call(this, e("buffer").Buffer)
        }
        , {
            "base64-js": 114,
            buffer: 116,
            ieee754: 119
        }],
        117: [function(e, t, r) {
            (function(e) {
                function t(e) {
                    return Object.prototype.toString.call(e)
                }
                r.isArray = function(e) {
                    return Array.isArray ? Array.isArray(e) : "[object Array]" === t(e)
                }
                ,
                r.isBoolean = function(e) {
                    return "boolean" == typeof e
                }
                ,
                r.isNull = function(e) {
                    return null === e
                }
                ,
                r.isNullOrUndefined = function(e) {
                    return null == e
                }
                ,
                r.isNumber = function(e) {
                    return "number" == typeof e
                }
                ,
                r.isString = function(e) {
                    return "string" == typeof e
                }
                ,
                r.isSymbol = function(e) {
                    return "symbol" == typeof e
                }
                ,
                r.isUndefined = function(e) {
                    return void 0 === e
                }
                ,
                r.isRegExp = function(e) {
                    return "[object RegExp]" === t(e)
                }
                ,
                r.isObject = function(e) {
                    return "object" == typeof e && null !== e
                }
                ,
                r.isDate = function(e) {
                    return "[object Date]" === t(e)
                }
                ,
                r.isError = function(e) {
                    return "[object Error]" === t(e) || e instanceof Error
                }
                ,
                r.isFunction = function(e) {
                    return "function" == typeof e
                }
                ,
                r.isPrimitive = function(e) {
                    return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || void 0 === e
                }
                ,
                r.isBuffer = e.isBuffer
            }
            ).call(this, {
                isBuffer: e("../../is-buffer/index.js")
            })
        }
        , {
            "../../is-buffer/index.js": 121
        }],
        118: [function(e, t, r) {
            var i = Object.create || function(e) {
                var t = function() {};
                return t.prototype = e,
                new t
            }
              , n = Object.keys || function(e) {
                var t = [];
                for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) && t.push(r);
                return r
            }
              , s = Function.prototype.bind || function(e) {
                var t = this;
                return function() {
                    return t.apply(e, arguments)
                }
            }
            ;
            function o() {
                this._events && Object.prototype.hasOwnProperty.call(this, "_events") || (this._events = i(null),
                this._eventsCount = 0),
                this._maxListeners = this._maxListeners || void 0
            }
            t.exports = o,
            o.EventEmitter = o,
            o.prototype._events = void 0,
            o.prototype._maxListeners = void 0;
            var a, f = 10;
            try {
                var u = {};
                Object.defineProperty && Object.defineProperty(u, "x", {
                    value: 0
                }),
                a = 0 === u.x
            } catch (e) {
                a = !1
            }
            function c(e) {
                return void 0 === e._maxListeners ? o.defaultMaxListeners : e._maxListeners
            }
            function h(e, t, r, n) {
                var s, o, a;
                if ("function" != typeof r)
                    throw new TypeError('"listener" argument must be a function');
                if ((o = e._events) ? (o.newListener && (e.emit("newListener", t, r.listener ? r.listener : r),
                o = e._events),
                a = o[t]) : (o = e._events = i(null),
                e._eventsCount = 0),
                a) {
                    if ("function" == typeof a ? a = o[t] = n ? [r, a] : [a, r] : n ? a.unshift(r) : a.push(r),
                    !a.warned && (s = c(e)) && s > 0 && a.length > s) {
                        a.warned = !0;
                        var f = new Error("Possible EventEmitter memory leak detected. " + a.length + ' "' + String(t) + '" listeners added. Use emitter.setMaxListeners() to increase limit.');
                        f.name = "MaxListenersExceededWarning",
                        f.emitter = e,
                        f.type = t,
                        f.count = a.length,
                        "object" == typeof console && console.warn && console.warn("%s: %s", f.name, f.message)
                    }
                } else
                    a = o[t] = r,
                    ++e._eventsCount;
                return e
            }
            function d() {
                if (!this.fired)
                    switch (this.target.removeListener(this.type, this.wrapFn),
                    this.fired = !0,
                    arguments.length) {
                    case 0:
                        return this.listener.call(this.target);
                    case 1:
                        return this.listener.call(this.target, arguments[0]);
                    case 2:
                        return this.listener.call(this.target, arguments[0], arguments[1]);
                    case 3:
                        return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);
                    default:
                        for (var e = new Array(arguments.length), t = 0; t < e.length; ++t)
                            e[t] = arguments[t];
                        this.listener.apply(this.target, e)
                    }
            }
            function l(e, t, r) {
                var i = {
                    fired: !1,
                    wrapFn: void 0,
                    target: e,
                    type: t,
                    listener: r
                }
                  , n = s.call(d, i);
                return n.listener = r,
                i.wrapFn = n,
                n
            }
            function p(e, t, r) {
                var i = e._events;
                if (!i)
                    return [];
                var n = i[t];
                return n ? "function" == typeof n ? r ? [n.listener || n] : [n] : r ? function(e) {
                    for (var t = new Array(e.length), r = 0; r < t.length; ++r)
                        t[r] = e[r].listener || e[r];
                    return t
                }(n) : m(n, n.length) : []
            }
            function b(e) {
                var t = this._events;
                if (t) {
                    var r = t[e];
                    if ("function" == typeof r)
                        return 1;
                    if (r)
                        return r.length
                }
                return 0
            }
            function m(e, t) {
                for (var r = new Array(t), i = 0; i < t; ++i)
                    r[i] = e[i];
                return r
            }
            a ? Object.defineProperty(o, "defaultMaxListeners", {
                enumerable: !0,
                get: function() {
                    return f
                },
                set: function(e) {
                    if ("number" != typeof e || e < 0 || e != e)
                        throw new TypeError('"defaultMaxListeners" must be a positive number');
                    f = e
                }
            }) : o.defaultMaxListeners = f,
            o.prototype.setMaxListeners = function(e) {
                if ("number" != typeof e || e < 0 || isNaN(e))
                    throw new TypeError('"n" argument must be a positive number');
                return this._maxListeners = e,
                this
            }
            ,
            o.prototype.getMaxListeners = function() {
                return c(this)
            }
            ,
            o.prototype.emit = function(e) {
                var t, r, i, n, s, o, a = "error" === e;
                if (o = this._events)
                    a = a && null == o.error;
                else if (!a)
                    return !1;
                if (a) {
                    if (arguments.length > 1 && (t = arguments[1]),
                    t instanceof Error)
                        throw t;
                    var f = new Error('Unhandled "error" event. (' + t + ")");
                    throw f.context = t,
                    f
                }
                if (!(r = o[e]))
                    return !1;
                var u = "function" == typeof r;
                switch (i = arguments.length) {
                case 1:
                    !function(e, t, r) {
                        if (t)
                            e.call(r);
                        else
                            for (var i = e.length, n = m(e, i), s = 0; s < i; ++s)
                                n[s].call(r)
                    }(r, u, this);
                    break;
                case 2:
                    !function(e, t, r, i) {
                        if (t)
                            e.call(r, i);
                        else
                            for (var n = e.length, s = m(e, n), o = 0; o < n; ++o)
                                s[o].call(r, i)
                    }(r, u, this, arguments[1]);
                    break;
                case 3:
                    !function(e, t, r, i, n) {
                        if (t)
                            e.call(r, i, n);
                        else
                            for (var s = e.length, o = m(e, s), a = 0; a < s; ++a)
                                o[a].call(r, i, n)
                    }(r, u, this, arguments[1], arguments[2]);
                    break;
                case 4:
                    !function(e, t, r, i, n, s) {
                        if (t)
                            e.call(r, i, n, s);
                        else
                            for (var o = e.length, a = m(e, o), f = 0; f < o; ++f)
                                a[f].call(r, i, n, s)
                    }(r, u, this, arguments[1], arguments[2], arguments[3]);
                    break;
                default:
                    for (n = new Array(i - 1),
                    s = 1; s < i; s++)
                        n[s - 1] = arguments[s];
                    !function(e, t, r, i) {
                        if (t)
                            e.apply(r, i);
                        else
                            for (var n = e.length, s = m(e, n), o = 0; o < n; ++o)
                                s[o].apply(r, i)
                    }(r, u, this, n)
                }
                return !0
            }
            ,
            o.prototype.addListener = function(e, t) {
                return h(this, e, t, !1)
            }
            ,
            o.prototype.on = o.prototype.addListener,
            o.prototype.prependListener = function(e, t) {
                return h(this, e, t, !0)
            }
            ,
            o.prototype.once = function(e, t) {
                if ("function" != typeof t)
                    throw new TypeError('"listener" argument must be a function');
                return this.on(e, l(this, e, t)),
                this
            }
            ,
            o.prototype.prependOnceListener = function(e, t) {
                if ("function" != typeof t)
                    throw new TypeError('"listener" argument must be a function');
                return this.prependListener(e, l(this, e, t)),
                this
            }
            ,
            o.prototype.removeListener = function(e, t) {
                var r, n, s, o, a;
                if ("function" != typeof t)
                    throw new TypeError('"listener" argument must be a function');
                if (!(n = this._events))
                    return this;
                if (!(r = n[e]))
                    return this;
                if (r === t || r.listener === t)
                    0 == --this._eventsCount ? this._events = i(null) : (delete n[e],
                    n.removeListener && this.emit("removeListener", e, r.listener || t));
                else if ("function" != typeof r) {
                    for (s = -1,
                    o = r.length - 1; o >= 0; o--)
                        if (r[o] === t || r[o].listener === t) {
                            a = r[o].listener,
                            s = o;
                            break
                        }
                    if (s < 0)
                        return this;
                    0 === s ? r.shift() : function(e, t) {
                        for (var r = t, i = r + 1, n = e.length; i < n; r += 1,
                        i += 1)
                            e[r] = e[i];
                        e.pop()
                    }(r, s),
                    1 === r.length && (n[e] = r[0]),
                    n.removeListener && this.emit("removeListener", e, a || t)
                }
                return this
            }
            ,
            o.prototype.removeAllListeners = function(e) {
                var t, r, s;
                if (!(r = this._events))
                    return this;
                if (!r.removeListener)
                    return 0 === arguments.length ? (this._events = i(null),
                    this._eventsCount = 0) : r[e] && (0 == --this._eventsCount ? this._events = i(null) : delete r[e]),
                    this;
                if (0 === arguments.length) {
                    var o, a = n(r);
                    for (s = 0; s < a.length; ++s)
                        "removeListener" !== (o = a[s]) && this.removeAllListeners(o);
                    return this.removeAllListeners("removeListener"),
                    this._events = i(null),
                    this._eventsCount = 0,
                    this
                }
                if ("function" == typeof (t = r[e]))
                    this.removeListener(e, t);
                else if (t)
                    for (s = t.length - 1; s >= 0; s--)
                        this.removeListener(e, t[s]);
                return this
            }
            ,
            o.prototype.listeners = function(e) {
                return p(this, e, !0)
            }
            ,
            o.prototype.rawListeners = function(e) {
                return p(this, e, !1)
            }
            ,
            o.listenerCount = function(e, t) {
                return "function" == typeof e.listenerCount ? e.listenerCount(t) : b.call(e, t)
            }
            ,
            o.prototype.listenerCount = b,
            o.prototype.eventNames = function() {
                return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : []
            }
        }
        , {}],
        119: [function(e, t, r) {
            r.read = function(e, t, r, i, n) {
                var s, o, a = 8 * n - i - 1, f = (1 << a) - 1, u = f >> 1, c = -7, h = r ? n - 1 : 0, d = r ? -1 : 1, l = e[t + h];
                for (h += d,
                s = l & (1 << -c) - 1,
                l >>= -c,
                c += a; c > 0; s = 256 * s + e[t + h],
                h += d,
                c -= 8)
                    ;
                for (o = s & (1 << -c) - 1,
                s >>= -c,
                c += i; c > 0; o = 256 * o + e[t + h],
                h += d,
                c -= 8)
                    ;
                if (0 === s)
                    s = 1 - u;
                else {
                    if (s === f)
                        return o ? NaN : 1 / 0 * (l ? -1 : 1);
                    o += Math.pow(2, i),
                    s -= u
                }
                return (l ? -1 : 1) * o * Math.pow(2, s - i)
            }
            ,
            r.write = function(e, t, r, i, n, s) {
                var o, a, f, u = 8 * s - n - 1, c = (1 << u) - 1, h = c >> 1, d = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0, l = i ? 0 : s - 1, p = i ? 1 : -1, b = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                for (t = Math.abs(t),
                isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0,
                o = c) : (o = Math.floor(Math.log(t) / Math.LN2),
                t * (f = Math.pow(2, -o)) < 1 && (o--,
                f *= 2),
                (t += o + h >= 1 ? d / f : d * Math.pow(2, 1 - h)) * f >= 2 && (o++,
                f /= 2),
                o + h >= c ? (a = 0,
                o = c) : o + h >= 1 ? (a = (t * f - 1) * Math.pow(2, n),
                o += h) : (a = t * Math.pow(2, h - 1) * Math.pow(2, n),
                o = 0)); n >= 8; e[r + l] = 255 & a,
                l += p,
                a /= 256,
                n -= 8)
                    ;
                for (o = o << n | a,
                u += n; u > 0; e[r + l] = 255 & o,
                l += p,
                o /= 256,
                u -= 8)
                    ;
                e[r + l - p] |= 128 * b
            }
        }
        , {}],
        120: [function(e, t, r) {
            arguments[4][46][0].apply(r, arguments)
        }
        , {
            dup: 46
        }],
        121: [function(e, t, r) {
            function i(e) {
                return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
            }
            t.exports = function(e) {
                return null != e && (i(e) || function(e) {
                    return "function" == typeof e.readFloatLE && "function" == typeof e.slice && i(e.slice(0, 0))
                }(e) || !!e._isBuffer)
            }
        }
        , {}],
        122: [function(e, t, r) {
            var i = {}.toString;
            t.exports = Array.isArray || function(e) {
                return "[object Array]" == i.call(e)
            }
        }
        , {}],
        123: [function(e, t, r) {
            (function(e) {
                "use strict";
                void 0 === e || !e.version || 0 === e.version.indexOf("v0.") || 0 === e.version.indexOf("v1.") && 0 !== e.version.indexOf("v1.8.") ? t.exports = {
                    nextTick: function(t, r, i, n) {
                        if ("function" != typeof t)
                            throw new TypeError('"callback" argument must be a function');
                        var s, o, a = arguments.length;
                        switch (a) {
                        case 0:
                        case 1:
                            return e.nextTick(t);
                        case 2:
                            return e.nextTick(function() {
                                t.call(null, r)
                            });
                        case 3:
                            return e.nextTick(function() {
                                t.call(null, r, i)
                            });
                        case 4:
                            return e.nextTick(function() {
                                t.call(null, r, i, n)
                            });
                        default:
                            for (s = new Array(a - 1),
                            o = 0; o < s.length; )
                                s[o++] = arguments[o];
                            return e.nextTick(function() {
                                t.apply(null, s)
                            })
                        }
                    }
                } : t.exports = e
            }
            ).call(this, e("_process"))
        }
        , {
            _process: 124
        }],
        124: [function(e, t, r) {
            var i, n, s = t.exports = {};
            function o() {
                throw new Error("setTimeout has not been defined")
            }
            function a() {
                throw new Error("clearTimeout has not been defined")
            }
            function f(e) {
                if (i === setTimeout)
                    return setTimeout(e, 0);
                if ((i === o || !i) && setTimeout)
                    return i = setTimeout,
                    setTimeout(e, 0);
                try {
                    return i(e, 0)
                } catch (t) {
                    try {
                        return i.call(null, e, 0)
                    } catch (t) {
                        return i.call(this, e, 0)
                    }
                }
            }
            !function() {
                try {
                    i = "function" == typeof setTimeout ? setTimeout : o
                } catch (e) {
                    i = o
                }
                try {
                    n = "function" == typeof clearTimeout ? clearTimeout : a
                } catch (e) {
                    n = a
                }
            }();
            var u, c = [], h = !1, d = -1;
            function l() {
                h && u && (h = !1,
                u.length ? c = u.concat(c) : d = -1,
                c.length && p())
            }
            function p() {
                if (!h) {
                    var e = f(l);
                    h = !0;
                    for (var t = c.length; t; ) {
                        for (u = c,
                        c = []; ++d < t; )
                            u && u[d].run();
                        d = -1,
                        t = c.length
                    }
                    u = null,
                    h = !1,
                    function(e) {
                        if (n === clearTimeout)
                            return clearTimeout(e);
                        if ((n === a || !n) && clearTimeout)
                            return n = clearTimeout,
                            clearTimeout(e);
                        try {
                            n(e)
                        } catch (t) {
                            try {
                                return n.call(null, e)
                            } catch (t) {
                                return n.call(this, e)
                            }
                        }
                    }(e)
                }
            }
            function b(e, t) {
                this.fun = e,
                this.array = t
            }
            function m() {}
            s.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var r = 1; r < arguments.length; r++)
                        t[r - 1] = arguments[r];
                c.push(new b(e,t)),
                1 !== c.length || h || f(p)
            }
            ,
            b.prototype.run = function() {
                this.fun.apply(null, this.array)
            }
            ,
            s.title = "browser",
            s.browser = !0,
            s.env = {},
            s.argv = [],
            s.version = "",
            s.versions = {},
            s.on = m,
            s.addListener = m,
            s.once = m,
            s.off = m,
            s.removeListener = m,
            s.removeAllListeners = m,
            s.emit = m,
            s.prependListener = m,
            s.prependOnceListener = m,
            s.listeners = function(e) {
                return []
            }
            ,
            s.binding = function(e) {
                throw new Error("process.binding is not supported")
            }
            ,
            s.cwd = function() {
                return "/"
            }
            ,
            s.chdir = function(e) {
                throw new Error("process.chdir is not supported")
            }
            ,
            s.umask = function() {
                return 0
            }
        }
        , {}],
        125: [function(e, t, r) {
            t.exports = e("./lib/_stream_duplex.js")
        }
        , {
            "./lib/_stream_duplex.js": 126
        }],
        126: [function(e, t, r) {
            "use strict";
            var i = e("process-nextick-args")
              , n = Object.keys || function(e) {
                var t = [];
                for (var r in e)
                    t.push(r);
                return t
            }
            ;
            t.exports = h;
            var s = Object.create(e("core-util-is"));
            s.inherits = e("inherits");
            var o = e("./_stream_readable")
              , a = e("./_stream_writable");
            s.inherits(h, o);
            for (var f = n(a.prototype), u = 0; u < f.length; u++) {
                var c = f[u];
                h.prototype[c] || (h.prototype[c] = a.prototype[c])
            }
            function h(e) {
                if (!(this instanceof h))
                    return new h(e);
                o.call(this, e),
                a.call(this, e),
                e && !1 === e.readable && (this.readable = !1),
                e && !1 === e.writable && (this.writable = !1),
                this.allowHalfOpen = !0,
                e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1),
                this.once("end", d)
            }
            function d() {
                this.allowHalfOpen || this._writableState.ended || i.nextTick(l, this)
            }
            function l(e) {
                e.end()
            }
            Object.defineProperty(h.prototype, "writableHighWaterMark", {
                enumerable: !1,
                get: function() {
                    return this._writableState.highWaterMark
                }
            }),
            Object.defineProperty(h.prototype, "destroyed", {
                get: function() {
                    return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed)
                },
                set: function(e) {
                    void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e,
                    this._writableState.destroyed = e)
                }
            }),
            h.prototype._destroy = function(e, t) {
                this.push(null),
                this.end(),
                i.nextTick(t, e)
            }
        }
        , {
            "./_stream_readable": 128,
            "./_stream_writable": 130,
            "core-util-is": 117,
            inherits: 120,
            "process-nextick-args": 123
        }],
        127: [function(e, t, r) {
            "use strict";
            t.exports = s;
            var i = e("./_stream_transform")
              , n = Object.create(e("core-util-is"));
            function s(e) {
                if (!(this instanceof s))
                    return new s(e);
                i.call(this, e)
            }
            n.inherits = e("inherits"),
            n.inherits(s, i),
            s.prototype._transform = function(e, t, r) {
                r(null, e)
            }
        }
        , {
            "./_stream_transform": 129,
            "core-util-is": 117,
            inherits: 120
        }],
        128: [function(e, t, r) {
            (function(r, i) {
                "use strict";
                var n = e("process-nextick-args");
                t.exports = v;
                var s, o = e("isarray");
                v.ReadableState = g;
                e("events").EventEmitter;
                var a = function(e, t) {
                    return e.listeners(t).length
                }
                  , f = e("./internal/streams/stream")
                  , u = e("safe-buffer").Buffer
                  , c = i.Uint8Array || function() {}
                ;
                var h = Object.create(e("core-util-is"));
                h.inherits = e("inherits");
                var d = e("util")
                  , l = void 0;
                l = d && d.debuglog ? d.debuglog("stream") : function() {}
                ;
                var p, b = e("./internal/streams/BufferList"), m = e("./internal/streams/destroy");
                h.inherits(v, f);
                var y = ["error", "close", "destroy", "pause", "resume"];
                function g(t, r) {
                    s = s || e("./_stream_duplex"),
                    t = t || {};
                    var i = r instanceof s;
                    this.objectMode = !!t.objectMode,
                    i && (this.objectMode = this.objectMode || !!t.readableObjectMode);
                    var n = t.highWaterMark
                      , o = t.readableHighWaterMark
                      , a = this.objectMode ? 16 : 16384;
                    this.highWaterMark = n || 0 === n ? n : i && (o || 0 === o) ? o : a,
                    this.highWaterMark = Math.floor(this.highWaterMark),
                    this.buffer = new b,
                    this.length = 0,
                    this.pipes = null,
                    this.pipesCount = 0,
                    this.flowing = null,
                    this.ended = !1,
                    this.endEmitted = !1,
                    this.reading = !1,
                    this.sync = !0,
                    this.needReadable = !1,
                    this.emittedReadable = !1,
                    this.readableListening = !1,
                    this.resumeScheduled = !1,
                    this.destroyed = !1,
                    this.defaultEncoding = t.defaultEncoding || "utf8",
                    this.awaitDrain = 0,
                    this.readingMore = !1,
                    this.decoder = null,
                    this.encoding = null,
                    t.encoding && (p || (p = e("string_decoder/").StringDecoder),
                    this.decoder = new p(t.encoding),
                    this.encoding = t.encoding)
                }
                function v(t) {
                    if (s = s || e("./_stream_duplex"),
                    !(this instanceof v))
                        return new v(t);
                    this._readableState = new g(t,this),
                    this.readable = !0,
                    t && ("function" == typeof t.read && (this._read = t.read),
                    "function" == typeof t.destroy && (this._destroy = t.destroy)),
                    f.call(this)
                }
                function w(e, t, r, i, n) {
                    var s, o = e._readableState;
                    null === t ? (o.reading = !1,
                    function(e, t) {
                        if (t.ended)
                            return;
                        if (t.decoder) {
                            var r = t.decoder.end();
                            r && r.length && (t.buffer.push(r),
                            t.length += t.objectMode ? 1 : r.length)
                        }
                        t.ended = !0,
                        E(e)
                    }(e, o)) : (n || (s = function(e, t) {
                        var r;
                        i = t,
                        u.isBuffer(i) || i instanceof c || "string" == typeof t || void 0 === t || e.objectMode || (r = new TypeError("Invalid non-string/buffer chunk"));
                        var i;
                        return r
                    }(o, t)),
                    s ? e.emit("error", s) : o.objectMode || t && t.length > 0 ? ("string" == typeof t || o.objectMode || Object.getPrototypeOf(t) === u.prototype || (t = function(e) {
                        return u.from(e)
                    }(t)),
                    i ? o.endEmitted ? e.emit("error", new Error("stream.unshift() after end event")) : _(e, o, t, !0) : o.ended ? e.emit("error", new Error("stream.push() after EOF")) : (o.reading = !1,
                    o.decoder && !r ? (t = o.decoder.write(t),
                    o.objectMode || 0 !== t.length ? _(e, o, t, !1) : O(e, o)) : _(e, o, t, !1))) : i || (o.reading = !1));
                    return function(e) {
                        return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length)
                    }(o)
                }
                function _(e, t, r, i) {
                    t.flowing && 0 === t.length && !t.sync ? (e.emit("data", r),
                    e.read(0)) : (t.length += t.objectMode ? 1 : r.length,
                    i ? t.buffer.unshift(r) : t.buffer.push(r),
                    t.needReadable && E(e)),
                    O(e, t)
                }
                Object.defineProperty(v.prototype, "destroyed", {
                    get: function() {
                        return void 0 !== this._readableState && this._readableState.destroyed
                    },
                    set: function(e) {
                        this._readableState && (this._readableState.destroyed = e)
                    }
                }),
                v.prototype.destroy = m.destroy,
                v.prototype._undestroy = m.undestroy,
                v.prototype._destroy = function(e, t) {
                    this.push(null),
                    t(e)
                }
                ,
                v.prototype.push = function(e, t) {
                    var r, i = this._readableState;
                    return i.objectMode ? r = !0 : "string" == typeof e && ((t = t || i.defaultEncoding) !== i.encoding && (e = u.from(e, t),
                    t = ""),
                    r = !0),
                    w(this, e, t, !1, r)
                }
                ,
                v.prototype.unshift = function(e) {
                    return w(this, e, null, !0, !1)
                }
                ,
                v.prototype.isPaused = function() {
                    return !1 === this._readableState.flowing
                }
                ,
                v.prototype.setEncoding = function(t) {
                    return p || (p = e("string_decoder/").StringDecoder),
                    this._readableState.decoder = new p(t),
                    this._readableState.encoding = t,
                    this
                }
                ;
                var S = 8388608;
                function M(e, t) {
                    return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e != e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = function(e) {
                        return e >= S ? e = S : (e--,
                        e |= e >>> 1,
                        e |= e >>> 2,
                        e |= e >>> 4,
                        e |= e >>> 8,
                        e |= e >>> 16,
                        e++),
                        e
                    }(e)),
                    e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0,
                    0))
                }
                function E(e) {
                    var t = e._readableState;
                    t.needReadable = !1,
                    t.emittedReadable || (l("emitReadable", t.flowing),
                    t.emittedReadable = !0,
                    t.sync ? n.nextTick(k, e) : k(e))
                }
                function k(e) {
                    l("emit readable"),
                    e.emit("readable"),
                    x(e)
                }
                function O(e, t) {
                    t.readingMore || (t.readingMore = !0,
                    n.nextTick(P, e, t))
                }
                function P(e, t) {
                    for (var r = t.length; !t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark && (l("maybeReadMore read 0"),
                    e.read(0),
                    r !== t.length); )
                        r = t.length;
                    t.readingMore = !1
                }
                function A(e) {
                    l("readable nexttick read 0"),
                    e.read(0)
                }
                function I(e, t) {
                    t.reading || (l("resume read 0"),
                    e.read(0)),
                    t.resumeScheduled = !1,
                    t.awaitDrain = 0,
                    e.emit("resume"),
                    x(e),
                    t.flowing && !t.reading && e.read(0)
                }
                function x(e) {
                    var t = e._readableState;
                    for (l("flow", t.flowing); t.flowing && null !== e.read(); )
                        ;
                }
                function T(e, t) {
                    return 0 === t.length ? null : (t.objectMode ? r = t.buffer.shift() : !e || e >= t.length ? (r = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.head.data : t.buffer.concat(t.length),
                    t.buffer.clear()) : r = function(e, t, r) {
                        var i;
                        e < t.head.data.length ? (i = t.head.data.slice(0, e),
                        t.head.data = t.head.data.slice(e)) : i = e === t.head.data.length ? t.shift() : r ? function(e, t) {
                            var r = t.head
                              , i = 1
                              , n = r.data;
                            e -= n.length;
                            for (; r = r.next; ) {
                                var s = r.data
                                  , o = e > s.length ? s.length : e;
                                if (o === s.length ? n += s : n += s.slice(0, e),
                                0 === (e -= o)) {
                                    o === s.length ? (++i,
                                    r.next ? t.head = r.next : t.head = t.tail = null) : (t.head = r,
                                    r.data = s.slice(o));
                                    break
                                }
                                ++i
                            }
                            return t.length -= i,
                            n
                        }(e, t) : function(e, t) {
                            var r = u.allocUnsafe(e)
                              , i = t.head
                              , n = 1;
                            i.data.copy(r),
                            e -= i.data.length;
                            for (; i = i.next; ) {
                                var s = i.data
                                  , o = e > s.length ? s.length : e;
                                if (s.copy(r, r.length - e, 0, o),
                                0 === (e -= o)) {
                                    o === s.length ? (++n,
                                    i.next ? t.head = i.next : t.head = t.tail = null) : (t.head = i,
                                    i.data = s.slice(o));
                                    break
                                }
                                ++n
                            }
                            return t.length -= n,
                            r
                        }(e, t);
                        return i
                    }(e, t.buffer, t.decoder),
                    r);
                    var r
                }
                function N(e) {
                    var t = e._readableState;
                    if (t.length > 0)
                        throw new Error('"endReadable()" called on non-empty stream');
                    t.endEmitted || (t.ended = !0,
                    n.nextTick(B, t, e))
                }
                function B(e, t) {
                    e.endEmitted || 0 !== e.length || (e.endEmitted = !0,
                    t.readable = !1,
                    t.emit("end"))
                }
                function R(e, t) {
                    for (var r = 0, i = e.length; r < i; r++)
                        if (e[r] === t)
                            return r;
                    return -1
                }
                v.prototype.read = function(e) {
                    l("read", e),
                    e = parseInt(e, 10);
                    var t = this._readableState
                      , r = e;
                    if (0 !== e && (t.emittedReadable = !1),
                    0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended))
                        return l("read: emitReadable", t.length, t.ended),
                        0 === t.length && t.ended ? N(this) : E(this),
                        null;
                    if (0 === (e = M(e, t)) && t.ended)
                        return 0 === t.length && N(this),
                        null;
                    var i, n = t.needReadable;
                    return l("need readable", n),
                    (0 === t.length || t.length - e < t.highWaterMark) && l("length less than watermark", n = !0),
                    t.ended || t.reading ? l("reading or ended", n = !1) : n && (l("do read"),
                    t.reading = !0,
                    t.sync = !0,
                    0 === t.length && (t.needReadable = !0),
                    this._read(t.highWaterMark),
                    t.sync = !1,
                    t.reading || (e = M(r, t))),
                    null === (i = e > 0 ? T(e, t) : null) ? (t.needReadable = !0,
                    e = 0) : t.length -= e,
                    0 === t.length && (t.ended || (t.needReadable = !0),
                    r !== e && t.ended && N(this)),
                    null !== i && this.emit("data", i),
                    i
                }
                ,
                v.prototype._read = function(e) {
                    this.emit("error", new Error("_read() is not implemented"))
                }
                ,
                v.prototype.pipe = function(e, t) {
                    var i = this
                      , s = this._readableState;
                    switch (s.pipesCount) {
                    case 0:
                        s.pipes = e;
                        break;
                    case 1:
                        s.pipes = [s.pipes, e];
                        break;
                    default:
                        s.pipes.push(e)
                    }
                    s.pipesCount += 1,
                    l("pipe count=%d opts=%j", s.pipesCount, t);
                    var f = (!t || !1 !== t.end) && e !== r.stdout && e !== r.stderr ? c : v;
                    function u(t, r) {
                        l("onunpipe"),
                        t === i && r && !1 === r.hasUnpiped && (r.hasUnpiped = !0,
                        l("cleanup"),
                        e.removeListener("close", y),
                        e.removeListener("finish", g),
                        e.removeListener("drain", h),
                        e.removeListener("error", m),
                        e.removeListener("unpipe", u),
                        i.removeListener("end", c),
                        i.removeListener("end", v),
                        i.removeListener("data", b),
                        d = !0,
                        !s.awaitDrain || e._writableState && !e._writableState.needDrain || h())
                    }
                    function c() {
                        l("onend"),
                        e.end()
                    }
                    s.endEmitted ? n.nextTick(f) : i.once("end", f),
                    e.on("unpipe", u);
                    var h = function(e) {
                        return function() {
                            var t = e._readableState;
                            l("pipeOnDrain", t.awaitDrain),
                            t.awaitDrain && t.awaitDrain--,
                            0 === t.awaitDrain && a(e, "data") && (t.flowing = !0,
                            x(e))
                        }
                    }(i);
                    e.on("drain", h);
                    var d = !1;
                    var p = !1;
                    function b(t) {
                        l("ondata"),
                        p = !1,
                        !1 !== e.write(t) || p || ((1 === s.pipesCount && s.pipes === e || s.pipesCount > 1 && -1 !== R(s.pipes, e)) && !d && (l("false write response, pause", i._readableState.awaitDrain),
                        i._readableState.awaitDrain++,
                        p = !0),
                        i.pause())
                    }
                    function m(t) {
                        l("onerror", t),
                        v(),
                        e.removeListener("error", m),
                        0 === a(e, "error") && e.emit("error", t)
                    }
                    function y() {
                        e.removeListener("finish", g),
                        v()
                    }
                    function g() {
                        l("onfinish"),
                        e.removeListener("close", y),
                        v()
                    }
                    function v() {
                        l("unpipe"),
                        i.unpipe(e)
                    }
                    return i.on("data", b),
                    function(e, t, r) {
                        if ("function" == typeof e.prependListener)
                            return e.prependListener(t, r);
                        e._events && e._events[t] ? o(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]] : e.on(t, r)
                    }(e, "error", m),
                    e.once("close", y),
                    e.once("finish", g),
                    e.emit("pipe", i),
                    s.flowing || (l("pipe resume"),
                    i.resume()),
                    e
                }
                ,
                v.prototype.unpipe = function(e) {
                    var t = this._readableState
                      , r = {
                        hasUnpiped: !1
                    };
                    if (0 === t.pipesCount)
                        return this;
                    if (1 === t.pipesCount)
                        return e && e !== t.pipes ? this : (e || (e = t.pipes),
                        t.pipes = null,
                        t.pipesCount = 0,
                        t.flowing = !1,
                        e && e.emit("unpipe", this, r),
                        this);
                    if (!e) {
                        var i = t.pipes
                          , n = t.pipesCount;
                        t.pipes = null,
                        t.pipesCount = 0,
                        t.flowing = !1;
                        for (var s = 0; s < n; s++)
                            i[s].emit("unpipe", this, r);
                        return this
                    }
                    var o = R(t.pipes, e);
                    return -1 === o ? this : (t.pipes.splice(o, 1),
                    t.pipesCount -= 1,
                    1 === t.pipesCount && (t.pipes = t.pipes[0]),
                    e.emit("unpipe", this, r),
                    this)
                }
                ,
                v.prototype.on = function(e, t) {
                    var r = f.prototype.on.call(this, e, t);
                    if ("data" === e)
                        !1 !== this._readableState.flowing && this.resume();
                    else if ("readable" === e) {
                        var i = this._readableState;
                        i.endEmitted || i.readableListening || (i.readableListening = i.needReadable = !0,
                        i.emittedReadable = !1,
                        i.reading ? i.length && E(this) : n.nextTick(A, this))
                    }
                    return r
                }
                ,
                v.prototype.addListener = v.prototype.on,
                v.prototype.resume = function() {
                    var e = this._readableState;
                    return e.flowing || (l("resume"),
                    e.flowing = !0,
                    function(e, t) {
                        t.resumeScheduled || (t.resumeScheduled = !0,
                        n.nextTick(I, e, t))
                    }(this, e)),
                    this
                }
                ,
                v.prototype.pause = function() {
                    return l("call pause flowing=%j", this._readableState.flowing),
                    !1 !== this._readableState.flowing && (l("pause"),
                    this._readableState.flowing = !1,
                    this.emit("pause")),
                    this
                }
                ,
                v.prototype.wrap = function(e) {
                    var t = this
                      , r = this._readableState
                      , i = !1;
                    for (var n in e.on("end", function() {
                        if (l("wrapped end"),
                        r.decoder && !r.ended) {
                            var e = r.decoder.end();
                            e && e.length && t.push(e)
                        }
                        t.push(null)
                    }),
                    e.on("data", function(n) {
                        (l("wrapped data"),
                        r.decoder && (n = r.decoder.write(n)),
                        !r.objectMode || null !== n && void 0 !== n) && ((r.objectMode || n && n.length) && (t.push(n) || (i = !0,
                        e.pause())))
                    }),
                    e)
                        void 0 === this[n] && "function" == typeof e[n] && (this[n] = function(t) {
                            return function() {
                                return e[t].apply(e, arguments)
                            }
                        }(n));
                    for (var s = 0; s < y.length; s++)
                        e.on(y[s], this.emit.bind(this, y[s]));
                    return this._read = function(t) {
                        l("wrapped _read", t),
                        i && (i = !1,
                        e.resume())
                    }
                    ,
                    this
                }
                ,
                Object.defineProperty(v.prototype, "readableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._readableState.highWaterMark
                    }
                }),
                v._fromList = T
            }
            ).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
        , {
            "./_stream_duplex": 126,
            "./internal/streams/BufferList": 131,
            "./internal/streams/destroy": 132,
            "./internal/streams/stream": 133,
            _process: 124,
            "core-util-is": 117,
            events: 118,
            inherits: 120,
            isarray: 122,
            "process-nextick-args": 123,
            "safe-buffer": 134,
            "string_decoder/": 135,
            util: 115
        }],
        129: [function(e, t, r) {
            "use strict";
            t.exports = s;
            var i = e("./_stream_duplex")
              , n = Object.create(e("core-util-is"));
            function s(e) {
                if (!(this instanceof s))
                    return new s(e);
                i.call(this, e),
                this._transformState = {
                    afterTransform: function(e, t) {
                        var r = this._transformState;
                        r.transforming = !1;
                        var i = r.writecb;
                        if (!i)
                            return this.emit("error", new Error("write callback called multiple times"));
                        r.writechunk = null,
                        r.writecb = null,
                        null != t && this.push(t),
                        i(e);
                        var n = this._readableState;
                        n.reading = !1,
                        (n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark)
                    }
                    .bind(this),
                    needTransform: !1,
                    transforming: !1,
                    writecb: null,
                    writechunk: null,
                    writeencoding: null
                },
                this._readableState.needReadable = !0,
                this._readableState.sync = !1,
                e && ("function" == typeof e.transform && (this._transform = e.transform),
                "function" == typeof e.flush && (this._flush = e.flush)),
                this.on("prefinish", o)
            }
            function o() {
                var e = this;
                "function" == typeof this._flush ? this._flush(function(t, r) {
                    a(e, t, r)
                }) : a(this, null, null)
            }
            function a(e, t, r) {
                if (t)
                    return e.emit("error", t);
                if (null != r && e.push(r),
                e._writableState.length)
                    throw new Error("Calling transform done when ws.length != 0");
                if (e._transformState.transforming)
                    throw new Error("Calling transform done when still transforming");
                return e.push(null)
            }
            n.inherits = e("inherits"),
            n.inherits(s, i),
            s.prototype.push = function(e, t) {
                return this._transformState.needTransform = !1,
                i.prototype.push.call(this, e, t)
            }
            ,
            s.prototype._transform = function(e, t, r) {
                throw new Error("_transform() is not implemented")
            }
            ,
            s.prototype._write = function(e, t, r) {
                var i = this._transformState;
                if (i.writecb = r,
                i.writechunk = e,
                i.writeencoding = t,
                !i.transforming) {
                    var n = this._readableState;
                    (i.needTransform || n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark)
                }
            }
            ,
            s.prototype._read = function(e) {
                var t = this._transformState;
                null !== t.writechunk && t.writecb && !t.transforming ? (t.transforming = !0,
                this._transform(t.writechunk, t.writeencoding, t.afterTransform)) : t.needTransform = !0
            }
            ,
            s.prototype._destroy = function(e, t) {
                var r = this;
                i.prototype._destroy.call(this, e, function(e) {
                    t(e),
                    r.emit("close")
                })
            }
        }
        , {
            "./_stream_duplex": 126,
            "core-util-is": 117,
            inherits: 120
        }],
        130: [function(e, t, r) {
            (function(r, i, n) {
                "use strict";
                var s = e("process-nextick-args");
                function o(e) {
                    var t = this;
                    this.next = null,
                    this.entry = null,
                    this.finish = function() {
                        !function(e, t, r) {
                            var i = e.entry;
                            e.entry = null;
                            for (; i; ) {
                                var n = i.callback;
                                t.pendingcb--,
                                n(r),
                                i = i.next
                            }
                            t.corkedRequestsFree ? t.corkedRequestsFree.next = e : t.corkedRequestsFree = e
                        }(t, e)
                    }
                }
                t.exports = g;
                var a, f = !r.browser && ["v0.10", "v0.9."].indexOf(r.version.slice(0, 5)) > -1 ? n : s.nextTick;
                g.WritableState = y;
                var u = Object.create(e("core-util-is"));
                u.inherits = e("inherits");
                var c = {
                    deprecate: e("util-deprecate")
                }
                  , h = e("./internal/streams/stream")
                  , d = e("safe-buffer").Buffer
                  , l = i.Uint8Array || function() {}
                ;
                var p, b = e("./internal/streams/destroy");
                function m() {}
                function y(t, r) {
                    a = a || e("./_stream_duplex"),
                    t = t || {};
                    var i = r instanceof a;
                    this.objectMode = !!t.objectMode,
                    i && (this.objectMode = this.objectMode || !!t.writableObjectMode);
                    var n = t.highWaterMark
                      , u = t.writableHighWaterMark
                      , c = this.objectMode ? 16 : 16384;
                    this.highWaterMark = n || 0 === n ? n : i && (u || 0 === u) ? u : c,
                    this.highWaterMark = Math.floor(this.highWaterMark),
                    this.finalCalled = !1,
                    this.needDrain = !1,
                    this.ending = !1,
                    this.ended = !1,
                    this.finished = !1,
                    this.destroyed = !1;
                    var h = !1 === t.decodeStrings;
                    this.decodeStrings = !h,
                    this.defaultEncoding = t.defaultEncoding || "utf8",
                    this.length = 0,
                    this.writing = !1,
                    this.corked = 0,
                    this.sync = !0,
                    this.bufferProcessing = !1,
                    this.onwrite = function(e) {
                        !function(e, t) {
                            var r = e._writableState
                              , i = r.sync
                              , n = r.writecb;
                            if (function(e) {
                                e.writing = !1,
                                e.writecb = null,
                                e.length -= e.writelen,
                                e.writelen = 0
                            }(r),
                            t)
                                !function(e, t, r, i, n) {
                                    --t.pendingcb,
                                    r ? (s.nextTick(n, i),
                                    s.nextTick(E, e, t),
                                    e._writableState.errorEmitted = !0,
                                    e.emit("error", i)) : (n(i),
                                    e._writableState.errorEmitted = !0,
                                    e.emit("error", i),
                                    E(e, t))
                                }(e, r, i, t, n);
                            else {
                                var o = S(r);
                                o || r.corked || r.bufferProcessing || !r.bufferedRequest || _(e, r),
                                i ? f(w, e, r, o, n) : w(e, r, o, n)
                            }
                        }(r, e)
                    }
                    ,
                    this.writecb = null,
                    this.writelen = 0,
                    this.bufferedRequest = null,
                    this.lastBufferedRequest = null,
                    this.pendingcb = 0,
                    this.prefinished = !1,
                    this.errorEmitted = !1,
                    this.bufferedRequestCount = 0,
                    this.corkedRequestsFree = new o(this)
                }
                function g(t) {
                    if (a = a || e("./_stream_duplex"),
                    !(p.call(g, this) || this instanceof a))
                        return new g(t);
                    this._writableState = new y(t,this),
                    this.writable = !0,
                    t && ("function" == typeof t.write && (this._write = t.write),
                    "function" == typeof t.writev && (this._writev = t.writev),
                    "function" == typeof t.destroy && (this._destroy = t.destroy),
                    "function" == typeof t.final && (this._final = t.final)),
                    h.call(this)
                }
                function v(e, t, r, i, n, s, o) {
                    t.writelen = i,
                    t.writecb = o,
                    t.writing = !0,
                    t.sync = !0,
                    r ? e._writev(n, t.onwrite) : e._write(n, s, t.onwrite),
                    t.sync = !1
                }
                function w(e, t, r, i) {
                    r || function(e, t) {
                        0 === t.length && t.needDrain && (t.needDrain = !1,
                        e.emit("drain"))
                    }(e, t),
                    t.pendingcb--,
                    i(),
                    E(e, t)
                }
                function _(e, t) {
                    t.bufferProcessing = !0;
                    var r = t.bufferedRequest;
                    if (e._writev && r && r.next) {
                        var i = t.bufferedRequestCount
                          , n = new Array(i)
                          , s = t.corkedRequestsFree;
                        s.entry = r;
                        for (var a = 0, f = !0; r; )
                            n[a] = r,
                            r.isBuf || (f = !1),
                            r = r.next,
                            a += 1;
                        n.allBuffers = f,
                        v(e, t, !0, t.length, n, "", s.finish),
                        t.pendingcb++,
                        t.lastBufferedRequest = null,
                        s.next ? (t.corkedRequestsFree = s.next,
                        s.next = null) : t.corkedRequestsFree = new o(t),
                        t.bufferedRequestCount = 0
                    } else {
                        for (; r; ) {
                            var u = r.chunk
                              , c = r.encoding
                              , h = r.callback;
                            if (v(e, t, !1, t.objectMode ? 1 : u.length, u, c, h),
                            r = r.next,
                            t.bufferedRequestCount--,
                            t.writing)
                                break
                        }
                        null === r && (t.lastBufferedRequest = null)
                    }
                    t.bufferedRequest = r,
                    t.bufferProcessing = !1
                }
                function S(e) {
                    return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
                }
                function M(e, t) {
                    e._final(function(r) {
                        t.pendingcb--,
                        r && e.emit("error", r),
                        t.prefinished = !0,
                        e.emit("prefinish"),
                        E(e, t)
                    })
                }
                function E(e, t) {
                    var r = S(t);
                    return r && (!function(e, t) {
                        t.prefinished || t.finalCalled || ("function" == typeof e._final ? (t.pendingcb++,
                        t.finalCalled = !0,
                        s.nextTick(M, e, t)) : (t.prefinished = !0,
                        e.emit("prefinish")))
                    }(e, t),
                    0 === t.pendingcb && (t.finished = !0,
                    e.emit("finish"))),
                    r
                }
                u.inherits(g, h),
                y.prototype.getBuffer = function() {
                    for (var e = this.bufferedRequest, t = []; e; )
                        t.push(e),
                        e = e.next;
                    return t
                }
                ,
                function() {
                    try {
                        Object.defineProperty(y.prototype, "buffer", {
                            get: c.deprecate(function() {
                                return this.getBuffer()
                            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                        })
                    } catch (e) {}
                }(),
                "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (p = Function.prototype[Symbol.hasInstance],
                Object.defineProperty(g, Symbol.hasInstance, {
                    value: function(e) {
                        return !!p.call(this, e) || this === g && (e && e._writableState instanceof y)
                    }
                })) : p = function(e) {
                    return e instanceof this
                }
                ,
                g.prototype.pipe = function() {
                    this.emit("error", new Error("Cannot pipe, not readable"))
                }
                ,
                g.prototype.write = function(e, t, r) {
                    var i, n = this._writableState, o = !1, a = !n.objectMode && (i = e,
                    d.isBuffer(i) || i instanceof l);
                    return a && !d.isBuffer(e) && (e = function(e) {
                        return d.from(e)
                    }(e)),
                    "function" == typeof t && (r = t,
                    t = null),
                    a ? t = "buffer" : t || (t = n.defaultEncoding),
                    "function" != typeof r && (r = m),
                    n.ended ? function(e, t) {
                        var r = new Error("write after end");
                        e.emit("error", r),
                        s.nextTick(t, r)
                    }(this, r) : (a || function(e, t, r, i) {
                        var n = !0
                          , o = !1;
                        return null === r ? o = new TypeError("May not write null values to stream") : "string" == typeof r || void 0 === r || t.objectMode || (o = new TypeError("Invalid non-string/buffer chunk")),
                        o && (e.emit("error", o),
                        s.nextTick(i, o),
                        n = !1),
                        n
                    }(this, n, e, r)) && (n.pendingcb++,
                    o = function(e, t, r, i, n, s) {
                        if (!r) {
                            var o = function(e, t, r) {
                                e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = d.from(t, r));
                                return t
                            }(t, i, n);
                            i !== o && (r = !0,
                            n = "buffer",
                            i = o)
                        }
                        var a = t.objectMode ? 1 : i.length;
                        t.length += a;
                        var f = t.length < t.highWaterMark;
                        f || (t.needDrain = !0);
                        if (t.writing || t.corked) {
                            var u = t.lastBufferedRequest;
                            t.lastBufferedRequest = {
                                chunk: i,
                                encoding: n,
                                isBuf: r,
                                callback: s,
                                next: null
                            },
                            u ? u.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest,
                            t.bufferedRequestCount += 1
                        } else
                            v(e, t, !1, a, i, n, s);
                        return f
                    }(this, n, a, e, t, r)),
                    o
                }
                ,
                g.prototype.cork = function() {
                    this._writableState.corked++
                }
                ,
                g.prototype.uncork = function() {
                    var e = this._writableState;
                    e.corked && (e.corked--,
                    e.writing || e.corked || e.finished || e.bufferProcessing || !e.bufferedRequest || _(this, e))
                }
                ,
                g.prototype.setDefaultEncoding = function(e) {
                    if ("string" == typeof e && (e = e.toLowerCase()),
                    !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1))
                        throw new TypeError("Unknown encoding: " + e);
                    return this._writableState.defaultEncoding = e,
                    this
                }
                ,
                Object.defineProperty(g.prototype, "writableHighWaterMark", {
                    enumerable: !1,
                    get: function() {
                        return this._writableState.highWaterMark
                    }
                }),
                g.prototype._write = function(e, t, r) {
                    r(new Error("_write() is not implemented"))
                }
                ,
                g.prototype._writev = null,
                g.prototype.end = function(e, t, r) {
                    var i = this._writableState;
                    "function" == typeof e ? (r = e,
                    e = null,
                    t = null) : "function" == typeof t && (r = t,
                    t = null),
                    null !== e && void 0 !== e && this.write(e, t),
                    i.corked && (i.corked = 1,
                    this.uncork()),
                    i.ending || i.finished || function(e, t, r) {
                        t.ending = !0,
                        E(e, t),
                        r && (t.finished ? s.nextTick(r) : e.once("finish", r));
                        t.ended = !0,
                        e.writable = !1
                    }(this, i, r)
                }
                ,
                Object.defineProperty(g.prototype, "destroyed", {
                    get: function() {
                        return void 0 !== this._writableState && this._writableState.destroyed
                    },
                    set: function(e) {
                        this._writableState && (this._writableState.destroyed = e)
                    }
                }),
                g.prototype.destroy = b.destroy,
                g.prototype._undestroy = b.undestroy,
                g.prototype._destroy = function(e, t) {
                    this.end(),
                    t(e)
                }
            }
            ).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("timers").setImmediate)
        }
        , {
            "./_stream_duplex": 126,
            "./internal/streams/destroy": 132,
            "./internal/streams/stream": 133,
            _process: 124,
            "core-util-is": 117,
            inherits: 120,
            "process-nextick-args": 123,
            "safe-buffer": 134,
            timers: 143,
            "util-deprecate": 144
        }],
        131: [function(e, t, r) {
            "use strict";
            var i = e("safe-buffer").Buffer
              , n = e("util");
            t.exports = function() {
                function e() {
                    !function(e, t) {
                        if (!(e instanceof t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, e),
                    this.head = null,
                    this.tail = null,
                    this.length = 0
                }
                return e.prototype.push = function(e) {
                    var t = {
                        data: e,
                        next: null
                    };
                    this.length > 0 ? this.tail.next = t : this.head = t,
                    this.tail = t,
                    ++this.length
                }
                ,
                e.prototype.unshift = function(e) {
                    var t = {
                        data: e,
                        next: this.head
                    };
                    0 === this.length && (this.tail = t),
                    this.head = t,
                    ++this.length
                }
                ,
                e.prototype.shift = function() {
                    if (0 !== this.length) {
                        var e = this.head.data;
                        return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next,
                        --this.length,
                        e
                    }
                }
                ,
                e.prototype.clear = function() {
                    this.head = this.tail = null,
                    this.length = 0
                }
                ,
                e.prototype.join = function(e) {
                    if (0 === this.length)
                        return "";
                    for (var t = this.head, r = "" + t.data; t = t.next; )
                        r += e + t.data;
                    return r
                }
                ,
                e.prototype.concat = function(e) {
                    if (0 === this.length)
                        return i.alloc(0);
                    if (1 === this.length)
                        return this.head.data;
                    for (var t, r, n, s = i.allocUnsafe(e >>> 0), o = this.head, a = 0; o; )
                        t = o.data,
                        r = s,
                        n = a,
                        t.copy(r, n),
                        a += o.data.length,
                        o = o.next;
                    return s
                }
                ,
                e
            }(),
            n && n.inspect && n.inspect.custom && (t.exports.prototype[n.inspect.custom] = function() {
                var e = n.inspect({
                    length: this.length
                });
                return this.constructor.name + " " + e
            }
            )
        }
        , {
            "safe-buffer": 134,
            util: 115
        }],
        132: [function(e, t, r) {
            "use strict";
            var i = e("process-nextick-args");
            function n(e, t) {
                e.emit("error", t)
            }
            t.exports = {
                destroy: function(e, t) {
                    var r = this
                      , s = this._readableState && this._readableState.destroyed
                      , o = this._writableState && this._writableState.destroyed;
                    return s || o ? (t ? t(e) : !e || this._writableState && this._writableState.errorEmitted || i.nextTick(n, this, e),
                    this) : (this._readableState && (this._readableState.destroyed = !0),
                    this._writableState && (this._writableState.destroyed = !0),
                    this._destroy(e || null, function(e) {
                        !t && e ? (i.nextTick(n, r, e),
                        r._writableState && (r._writableState.errorEmitted = !0)) : t && t(e)
                    }),
                    this)
                },
                undestroy: function() {
                    this._readableState && (this._readableState.destroyed = !1,
                    this._readableState.reading = !1,
                    this._readableState.ended = !1,
                    this._readableState.endEmitted = !1),
                    this._writableState && (this._writableState.destroyed = !1,
                    this._writableState.ended = !1,
                    this._writableState.ending = !1,
                    this._writableState.finished = !1,
                    this._writableState.errorEmitted = !1)
                }
            }
        }
        , {
            "process-nextick-args": 123
        }],
        133: [function(e, t, r) {
            t.exports = e("events").EventEmitter
        }
        , {
            events: 118
        }],
        134: [function(e, t, r) {
            var i = e("buffer")
              , n = i.Buffer;
            function s(e, t) {
                for (var r in e)
                    t[r] = e[r]
            }
            function o(e, t, r) {
                return n(e, t, r)
            }
            n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? t.exports = i : (s(i, r),
            r.Buffer = o),
            s(n, o),
            o.from = function(e, t, r) {
                if ("number" == typeof e)
                    throw new TypeError("Argument must not be a number");
                return n(e, t, r)
            }
            ,
            o.alloc = function(e, t, r) {
                if ("number" != typeof e)
                    throw new TypeError("Argument must be a number");
                var i = n(e);
                return void 0 !== t ? "string" == typeof r ? i.fill(t, r) : i.fill(t) : i.fill(0),
                i
            }
            ,
            o.allocUnsafe = function(e) {
                if ("number" != typeof e)
                    throw new TypeError("Argument must be a number");
                return n(e)
            }
            ,
            o.allocUnsafeSlow = function(e) {
                if ("number" != typeof e)
                    throw new TypeError("Argument must be a number");
                return i.SlowBuffer(e)
            }
        }
        , {
            buffer: 116
        }],
        135: [function(e, t, r) {
            "use strict";
            var i = e("safe-buffer").Buffer
              , n = i.isEncoding || function(e) {
                switch ((e = "" + e) && e.toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                case "raw":
                    return !0;
                default:
                    return !1
                }
            }
            ;
            function s(e) {
                var t;
                switch (this.encoding = function(e) {
                    var t = function(e) {
                        if (!e)
                            return "utf8";
                        for (var t; ; )
                            switch (e) {
                            case "utf8":
                            case "utf-8":
                                return "utf8";
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return "utf16le";
                            case "latin1":
                            case "binary":
                                return "latin1";
                            case "base64":
                            case "ascii":
                            case "hex":
                                return e;
                            default:
                                if (t)
                                    return;
                                e = ("" + e).toLowerCase(),
                                t = !0
                            }
                    }(e);
                    if ("string" != typeof t && (i.isEncoding === n || !n(e)))
                        throw new Error("Unknown encoding: " + e);
                    return t || e
                }(e),
                this.encoding) {
                case "utf16le":
                    this.text = f,
                    this.end = u,
                    t = 4;
                    break;
                case "utf8":
                    this.fillLast = a,
                    t = 4;
                    break;
                case "base64":
                    this.text = c,
                    this.end = h,
                    t = 3;
                    break;
                default:
                    return this.write = d,
                    void (this.end = l)
                }
                this.lastNeed = 0,
                this.lastTotal = 0,
                this.lastChar = i.allocUnsafe(t)
            }
            function o(e) {
                return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2
            }
            function a(e) {
                var t = this.lastTotal - this.lastNeed
                  , r = function(e, t, r) {
                    if (128 != (192 & t[0]))
                        return e.lastNeed = 0,
                        "�";
                    if (e.lastNeed > 1 && t.length > 1) {
                        if (128 != (192 & t[1]))
                            return e.lastNeed = 1,
                            "�";
                        if (e.lastNeed > 2 && t.length > 2 && 128 != (192 & t[2]))
                            return e.lastNeed = 2,
                            "�"
                    }
                }(this, e);
                return void 0 !== r ? r : this.lastNeed <= e.length ? (e.copy(this.lastChar, t, 0, this.lastNeed),
                this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (e.copy(this.lastChar, t, 0, e.length),
                void (this.lastNeed -= e.length))
            }
            function f(e, t) {
                if ((e.length - t) % 2 == 0) {
                    var r = e.toString("utf16le", t);
                    if (r) {
                        var i = r.charCodeAt(r.length - 1);
                        if (i >= 55296 && i <= 56319)
                            return this.lastNeed = 2,
                            this.lastTotal = 4,
                            this.lastChar[0] = e[e.length - 2],
                            this.lastChar[1] = e[e.length - 1],
                            r.slice(0, -1)
                    }
                    return r
                }
                return this.lastNeed = 1,
                this.lastTotal = 2,
                this.lastChar[0] = e[e.length - 1],
                e.toString("utf16le", t, e.length - 1)
            }
            function u(e) {
                var t = e && e.length ? this.write(e) : "";
                if (this.lastNeed) {
                    var r = this.lastTotal - this.lastNeed;
                    return t + this.lastChar.toString("utf16le", 0, r)
                }
                return t
            }
            function c(e, t) {
                var r = (e.length - t) % 3;
                return 0 === r ? e.toString("base64", t) : (this.lastNeed = 3 - r,
                this.lastTotal = 3,
                1 === r ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2],
                this.lastChar[1] = e[e.length - 1]),
                e.toString("base64", t, e.length - r))
            }
            function h(e) {
                var t = e && e.length ? this.write(e) : "";
                return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t
            }
            function d(e) {
                return e.toString(this.encoding)
            }
            function l(e) {
                return e && e.length ? this.write(e) : ""
            }
            r.StringDecoder = s,
            s.prototype.write = function(e) {
                if (0 === e.length)
                    return "";
                var t, r;
                if (this.lastNeed) {
                    if (void 0 === (t = this.fillLast(e)))
                        return "";
                    r = this.lastNeed,
                    this.lastNeed = 0
                } else
                    r = 0;
                return r < e.length ? t ? t + this.text(e, r) : this.text(e, r) : t || ""
            }
            ,
            s.prototype.end = function(e) {
                var t = e && e.length ? this.write(e) : "";
                return this.lastNeed ? t + "�" : t
            }
            ,
            s.prototype.text = function(e, t) {
                var r = function(e, t, r) {
                    var i = t.length - 1;
                    if (i < r)
                        return 0;
                    var n = o(t[i]);
                    if (n >= 0)
                        return n > 0 && (e.lastNeed = n - 1),
                        n;
                    if (--i < r || -2 === n)
                        return 0;
                    if ((n = o(t[i])) >= 0)
                        return n > 0 && (e.lastNeed = n - 2),
                        n;
                    if (--i < r || -2 === n)
                        return 0;
                    if ((n = o(t[i])) >= 0)
                        return n > 0 && (2 === n ? n = 0 : e.lastNeed = n - 3),
                        n;
                    return 0
                }(this, e, t);
                if (!this.lastNeed)
                    return e.toString("utf8", t);
                this.lastTotal = r;
                var i = e.length - (r - this.lastNeed);
                return e.copy(this.lastChar, 0, i),
                e.toString("utf8", t, i)
            }
            ,
            s.prototype.fillLast = function(e) {
                if (this.lastNeed <= e.length)
                    return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed),
                    this.lastChar.toString(this.encoding, 0, this.lastTotal);
                e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length),
                this.lastNeed -= e.length
            }
        }
        , {
            "safe-buffer": 134
        }],
        136: [function(e, t, r) {
            t.exports = e("./readable").PassThrough
        }
        , {
            "./readable": 137
        }],
        137: [function(e, t, r) {
            (r = t.exports = e("./lib/_stream_readable.js")).Stream = r,
            r.Readable = r,
            r.Writable = e("./lib/_stream_writable.js"),
            r.Duplex = e("./lib/_stream_duplex.js"),
            r.Transform = e("./lib/_stream_transform.js"),
            r.PassThrough = e("./lib/_stream_passthrough.js")
        }
        , {
            "./lib/_stream_duplex.js": 126,
            "./lib/_stream_passthrough.js": 127,
            "./lib/_stream_readable.js": 128,
            "./lib/_stream_transform.js": 129,
            "./lib/_stream_writable.js": 130
        }],
        138: [function(e, t, r) {
            t.exports = e("./readable").Transform
        }
        , {
            "./readable": 137
        }],
        139: [function(e, t, r) {
            t.exports = e("./lib/_stream_writable.js")
        }
        , {
            "./lib/_stream_writable.js": 130
        }],
        140: [function(e, t, r) {
            arguments[4][54][0].apply(r, arguments)
        }
        , {
            buffer: 116,
            dup: 54
        }],
        141: [function(e, t, r) {
            t.exports = n;
            var i = e("events").EventEmitter;
            function n() {
                i.call(this)
            }
            e("inherits")(n, i),
            n.Readable = e("readable-stream/readable.js"),
            n.Writable = e("readable-stream/writable.js"),
            n.Duplex = e("readable-stream/duplex.js"),
            n.Transform = e("readable-stream/transform.js"),
            n.PassThrough = e("readable-stream/passthrough.js"),
            n.Stream = n,
            n.prototype.pipe = function(e, t) {
                var r = this;
                function n(t) {
                    e.writable && !1 === e.write(t) && r.pause && r.pause()
                }
                function s() {
                    r.readable && r.resume && r.resume()
                }
                r.on("data", n),
                e.on("drain", s),
                e._isStdio || t && !1 === t.end || (r.on("end", a),
                r.on("close", f));
                var o = !1;
                function a() {
                    o || (o = !0,
                    e.end())
                }
                function f() {
                    o || (o = !0,
                    "function" == typeof e.destroy && e.destroy())
                }
                function u(e) {
                    if (c(),
                    0 === i.listenerCount(this, "error"))
                        throw e
                }
                function c() {
                    r.removeListener("data", n),
                    e.removeListener("drain", s),
                    r.removeListener("end", a),
                    r.removeListener("close", f),
                    r.removeListener("error", u),
                    e.removeListener("error", u),
                    r.removeListener("end", c),
                    r.removeListener("close", c),
                    e.removeListener("close", c)
                }
                return r.on("error", u),
                e.on("error", u),
                r.on("end", c),
                r.on("close", c),
                e.on("close", c),
                e.emit("pipe", r),
                e
            }
        }
        , {
            events: 118,
            inherits: 120,
            "readable-stream/duplex.js": 125,
            "readable-stream/passthrough.js": 136,
            "readable-stream/readable.js": 137,
            "readable-stream/transform.js": 138,
            "readable-stream/writable.js": 139
        }],
        142: [function(e, t, r) {
            arguments[4][135][0].apply(r, arguments)
        }
        , {
            dup: 135,
            "safe-buffer": 140
        }],
        143: [function(e, t, r) {
            (function(t, i) {
                var n = e("process/browser.js").nextTick
                  , s = Function.prototype.apply
                  , o = Array.prototype.slice
                  , a = {}
                  , f = 0;
                function u(e, t) {
                    this._id = e,
                    this._clearFn = t
                }
                r.setTimeout = function() {
                    return new u(s.call(setTimeout, window, arguments),clearTimeout)
                }
                ,
                r.setInterval = function() {
                    return new u(s.call(setInterval, window, arguments),clearInterval)
                }
                ,
                r.clearTimeout = r.clearInterval = function(e) {
                    e.close()
                }
                ,
                u.prototype.unref = u.prototype.ref = function() {}
                ,
                u.prototype.close = function() {
                    this._clearFn.call(window, this._id)
                }
                ,
                r.enroll = function(e, t) {
                    clearTimeout(e._idleTimeoutId),
                    e._idleTimeout = t
                }
                ,
                r.unenroll = function(e) {
                    clearTimeout(e._idleTimeoutId),
                    e._idleTimeout = -1
                }
                ,
                r._unrefActive = r.active = function(e) {
                    clearTimeout(e._idleTimeoutId);
                    var t = e._idleTimeout;
                    t >= 0 && (e._idleTimeoutId = setTimeout(function() {
                        e._onTimeout && e._onTimeout()
                    }, t))
                }
                ,
                r.setImmediate = "function" == typeof t ? t : function(e) {
                    var t = f++
                      , i = !(arguments.length < 2) && o.call(arguments, 1);
                    return a[t] = !0,
                    n(function() {
                        a[t] && (i ? e.apply(null, i) : e.call(null),
                        r.clearImmediate(t))
                    }),
                    t
                }
                ,
                r.clearImmediate = "function" == typeof i ? i : function(e) {
                    delete a[e]
                }
            }
            ).call(this, e("timers").setImmediate, e("timers").clearImmediate)
        }
        , {
            "process/browser.js": 124,
            timers: 143
        }],
        144: [function(e, t, r) {
            (function(e) {
                function r(t) {
                    try {
                        if (!e.localStorage)
                            return !1
                    } catch (e) {
                        return !1
                    }
                    var r = e.localStorage[t];
                    return null != r && "true" === String(r).toLowerCase()
                }
                t.exports = function(e, t) {
                    if (r("noDeprecation"))
                        return e;
                    var i = !1;
                    return function() {
                        if (!i) {
                            if (r("throwDeprecation"))
                                throw new Error(t);
                            r("traceDeprecation") ? console.trace(t) : console.warn(t),
                            i = !0
                        }
                        return e.apply(this, arguments)
                    }
                }
            }
            ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }
        , {}]
    }, {}, [])("/")
});
