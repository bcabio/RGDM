require = function t(e, r, n) {
    function i(s, o) {
        if (!r[s]) {
            if (!e[s]) {
                var u = typeof require == "function" && require;
                if (!o && u) return u(s, !0);
                if (a) return a(s, !0);
                var f = new Error("Cannot find module '" + s + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var h = r[s] = {
                exports: {}
            };
            e[s][0].call(h.exports, function(t) {
                var r = e[s][1][t];
                return i(r ? r : t)
            }, h, h.exports, t, e, r, n)
        }
        return r[s].exports
    }
    var a = typeof require == "function" && require;
    for (var s = 0; s < n.length; s++) i(n[s]);
    return i
}({
    1: [function(t, e, r) {}, {}],
    2: [function(t, e, r) {
        "use strict";
        var n = t("base64-js");
        var i = t("ieee754");
        r.Buffer = u;
        r.SlowBuffer = b;
        r.INSPECT_MAX_BYTES = 50;
        var a = 2147483647;
        r.kMaxLength = a;
        u.TYPED_ARRAY_SUPPORT = s();
        if (!u.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
            console.error("This browser lacks typed array (Uint8Array) support which is required by " + "`buffer` v5.x. Use `buffer` v4.x if you require old browser support.")
        }

        function s() {
            try {
                var t = new Uint8Array(1);
                t.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42
                    }
                };
                return t.foo() === 42
            } catch (t) {
                return false
            }
        }

        function o(t) {
            if (t > a) {
                throw new RangeError("Invalid typed array length")
            }
            var e = new Uint8Array(t);
            e.__proto__ = u.prototype;
            return e
        }

        function u(t, e, r) {
            if (typeof t === "number") {
                if (typeof e === "string") {
                    throw new Error("If encoding is specified then the first argument must be a string")
                }
                return c(t)
            }
            return f(t, e, r)
        }
        if (typeof Symbol !== "undefined" && Symbol.species && u[Symbol.species] === u) {
            Object.defineProperty(u, Symbol.species, {
                value: null,
                configurable: true,
                enumerable: false,
                writable: false
            })
        }
        u.poolSize = 8192;

        function f(t, e, r) {
            if (typeof t === "number") {
                throw new TypeError('"value" argument must not be a number')
            }
            if (t instanceof ArrayBuffer) {
                return v(t, e, r)
            }
            if (typeof t === "string") {
                return p(t, e)
            }
            return y(t)
        }
        u.from = function(t, e, r) {
            return f(t, e, r)
        };
        u.prototype.__proto__ = Uint8Array.prototype;
        u.__proto__ = Uint8Array;

        function h(t) {
            if (typeof t !== "number") {
                throw new TypeError('"size" argument must be a number')
            } else if (t < 0) {
                throw new RangeError('"size" argument must not be negative')
            }
        }

        function l(t, e, r) {
            h(t);
            if (t <= 0) {
                return o(t)
            }
            if (e !== undefined) {
                return typeof r === "string" ? o(t).fill(e, r) : o(t).fill(e)
            }
            return o(t)
        }
        u.alloc = function(t, e, r) {
            return l(t, e, r)
        };

        function c(t) {
            h(t);
            return o(t < 0 ? 0 : d(t) | 0)
        }
        u.allocUnsafe = function(t) {
            return c(t)
        };
        u.allocUnsafeSlow = function(t) {
            return c(t)
        };

        function p(t, e) {
            if (typeof e !== "string" || e === "") {
                e = "utf8"
            }
            if (!u.isEncoding(e)) {
                throw new TypeError('"encoding" must be a valid string encoding')
            }
            var r = w(t, e) | 0;
            var n = o(r);
            var i = n.write(t, e);
            if (i !== r) {
                n = n.slice(0, i)
            }
            return n
        }

        function g(t) {
            var e = t.length < 0 ? 0 : d(t.length) | 0;
            var r = o(e);
            for (var n = 0; n < e; n += 1) {
                r[n] = t[n] & 255
            }
            return r
        }

        function v(t, e, r) {
            if (e < 0 || t.byteLength < e) {
                throw new RangeError("'offset' is out of bounds")
            }
            if (t.byteLength < e + (r || 0)) {
                throw new RangeError("'length' is out of bounds")
            }
            var n;
            if (e === undefined && r === undefined) {
                n = new Uint8Array(t)
            } else if (r === undefined) {
                n = new Uint8Array(t, e)
            } else {
                n = new Uint8Array(t, e, r)
            }
            n.__proto__ = u.prototype;
            return n
        }

        function y(t) {
            if (u.isBuffer(t)) {
                var e = d(t.length) | 0;
                var r = o(e);
                if (r.length === 0) {
                    return r
                }
                t.copy(r, 0, 0, e);
                return r
            }
            if (t) {
                if (ArrayBuffer.isView(t) || "length" in t) {
                    if (typeof t.length !== "number" || W(t.length)) {
                        return o(0)
                    }
                    return g(t)
                }
                if (t.type === "Buffer" && Array.isArray(t.data)) {
                    return g(t.data)
                }
            }
            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
        }

        function d(t) {
            if (t >= a) {
                throw new RangeError("Attempt to allocate Buffer larger than maximum " + "size: 0x" + a.toString(16) + " bytes")
            }
            return t | 0
        }

        function b(t) {
            if (+t != t) {
                t = 0
            }
            return u.alloc(+t)
        }
        u.isBuffer = function t(e) {
            return e != null && e._isBuffer === true
        };
        u.compare = function t(e, r) {
            if (!u.isBuffer(e) || !u.isBuffer(r)) {
                throw new TypeError("Arguments must be Buffers")
            }
            if (e === r) return 0;
            var n = e.length;
            var i = r.length;
            for (var a = 0, s = Math.min(n, i); a < s; ++a) {
                if (e[a] !== r[a]) {
                    n = e[a];
                    i = r[a];
                    break
                }
            }
            if (n < i) return -1;
            if (i < n) return 1;
            return 0
        };
        u.isEncoding = function t(e) {
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
                    return true;
                default:
                    return false
            }
        };
        u.concat = function t(e, r) {
            if (!Array.isArray(e)) {
                throw new TypeError('"list" argument must be an Array of Buffers')
            }
            if (e.length === 0) {
                return u.alloc(0)
            }
            var n;
            if (r === undefined) {
                r = 0;
                for (n = 0; n < e.length; ++n) {
                    r += e[n].length
                }
            }
            var i = u.allocUnsafe(r);
            var a = 0;
            for (n = 0; n < e.length; ++n) {
                var s = e[n];
                if (!u.isBuffer(s)) {
                    throw new TypeError('"list" argument must be an Array of Buffers')
                }
                s.copy(i, a);
                a += s.length
            }
            return i
        };

        function w(t, e) {
            if (u.isBuffer(t)) {
                return t.length
            }
            if (ArrayBuffer.isView(t) || t instanceof ArrayBuffer) {
                return t.byteLength
            }
            if (typeof t !== "string") {
                t = "" + t
            }
            var r = t.length;
            if (r === 0) return 0;
            var n = false;
            for (;;) {
                switch (e) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return r;
                    case "utf8":
                    case "utf-8":
                    case undefined:
                        return K(t).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return r * 2;
                    case "hex":
                        return r >>> 1;
                    case "base64":
                        return Z(t).length;
                    default:
                        if (n) return K(t).length;
                        e = ("" + e).toLowerCase();
                        n = true
                }
            }
        }
        u.byteLength = w;

        function m(t, e, r) {
            var n = false;
            if (e === undefined || e < 0) {
                e = 0
            }
            if (e > this.length) {
                return ""
            }
            if (r === undefined || r > this.length) {
                r = this.length
            }
            if (r <= 0) {
                return ""
            }
            r >>>= 0;
            e >>>= 0;
            if (r <= e) {
                return ""
            }
            if (!t) t = "utf8";
            while (true) {
                switch (t) {
                    case "hex":
                        return P(this, e, r);
                    case "utf8":
                    case "utf-8":
                        return U(this, e, r);
                    case "ascii":
                        return x(this, e, r);
                    case "latin1":
                    case "binary":
                        return D(this, e, r);
                    case "base64":
                        return N(this, e, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return R(this, e, r);
                    default:
                        if (n) throw new TypeError("Unknown encoding: " + t);
                        t = (t + "").toLowerCase();
                        n = true
                }
            }
        }
        u.prototype._isBuffer = true;

        function k(t, e, r) {
            var n = t[e];
            t[e] = t[r];
            t[r] = n
        }
        u.prototype.swap16 = function t() {
            var e = this.length;
            if (e % 2 !== 0) {
                throw new RangeError("Buffer size must be a multiple of 16-bits")
            }
            for (var r = 0; r < e; r += 2) {
                k(this, r, r + 1)
            }
            return this
        };
        u.prototype.swap32 = function t() {
            var e = this.length;
            if (e % 4 !== 0) {
                throw new RangeError("Buffer size must be a multiple of 32-bits")
            }
            for (var r = 0; r < e; r += 4) {
                k(this, r, r + 3);
                k(this, r + 1, r + 2)
            }
            return this
        };
        u.prototype.swap64 = function t() {
            var e = this.length;
            if (e % 8 !== 0) {
                throw new RangeError("Buffer size must be a multiple of 64-bits")
            }
            for (var r = 0; r < e; r += 8) {
                k(this, r, r + 7);
                k(this, r + 1, r + 6);
                k(this, r + 2, r + 5);
                k(this, r + 3, r + 4)
            }
            return this
        };
        u.prototype.toString = function t() {
            var e = this.length;
            if (e === 0) return "";
            if (arguments.length === 0) return U(this, 0, e);
            return m.apply(this, arguments)
        };
        u.prototype.equals = function t(e) {
            if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
            if (this === e) return true;
            return u.compare(this, e) === 0
        };
        u.prototype.inspect = function t() {
            var e = "";
            var n = r.INSPECT_MAX_BYTES;
            if (this.length > 0) {
                e = this.toString("hex", 0, n).match(/.{2}/g).join(" ");
                if (this.length > n) e += " ... "
            }
            return "<Buffer " + e + ">"
        };
        u.prototype.compare = function t(e, r, n, i, a) {
            if (!u.isBuffer(e)) {
                throw new TypeError("Argument must be a Buffer")
            }
            if (r === undefined) {
                r = 0
            }
            if (n === undefined) {
                n = e ? e.length : 0
            }
            if (i === undefined) {
                i = 0
            }
            if (a === undefined) {
                a = this.length
            }
            if (r < 0 || n > e.length || i < 0 || a > this.length) {
                throw new RangeError("out of range index")
            }
            if (i >= a && r >= n) {
                return 0
            }
            if (i >= a) {
                return -1
            }
            if (r >= n) {
                return 1
            }
            r >>>= 0;
            n >>>= 0;
            i >>>= 0;
            a >>>= 0;
            if (this === e) return 0;
            var s = a - i;
            var o = n - r;
            var f = Math.min(s, o);
            var h = this.slice(i, a);
            var l = e.slice(r, n);
            for (var c = 0; c < f; ++c) {
                if (h[c] !== l[c]) {
                    s = h[c];
                    o = l[c];
                    break
                }
            }
            if (s < o) return -1;
            if (o < s) return 1;
            return 0
        };

        function E(t, e, r, n, i) {
            if (t.length === 0) return -1;
            if (typeof r === "string") {
                n = r;
                r = 0
            } else if (r > 2147483647) {
                r = 2147483647
            } else if (r < -2147483648) {
                r = -2147483648
            }
            r = +r;
            if (isNaN(r)) {
                r = i ? 0 : t.length - 1
            }
            if (r < 0) r = t.length + r;
            if (r >= t.length) {
                if (i) return -1;
                else r = t.length - 1
            } else if (r < 0) {
                if (i) r = 0;
                else return -1
            }
            if (typeof e === "string") {
                e = u.from(e, n)
            }
            if (u.isBuffer(e)) {
                if (e.length === 0) {
                    return -1
                }
                return T(t, e, r, n, i)
            } else if (typeof e === "number") {
                e = e & 255;
                if (typeof Uint8Array.prototype.indexOf === "function") {
                    if (i) {
                        return Uint8Array.prototype.indexOf.call(t, e, r)
                    } else {
                        return Uint8Array.prototype.lastIndexOf.call(t, e, r)
                    }
                }
                return T(t, [e], r, n, i)
            }
            throw new TypeError("val must be string, number or Buffer")
        }

        function T(t, e, r, n, i) {
            var a = 1;
            var s = t.length;
            var o = e.length;
            if (n !== undefined) {
                n = String(n).toLowerCase();
                if (n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le") {
                    if (t.length < 2 || e.length < 2) {
                        return -1
                    }
                    a = 2;
                    s /= 2;
                    o /= 2;
                    r /= 2
                }
            }

            function u(t, e) {
                if (a === 1) {
                    return t[e]
                } else {
                    return t.readUInt16BE(e * a)
                }
            }
            var f;
            if (i) {
                var h = -1;
                for (f = r; f < s; f++) {
                    if (u(t, f) === u(e, h === -1 ? 0 : f - h)) {
                        if (h === -1) h = f;
                        if (f - h + 1 === o) return h * a
                    } else {
                        if (h !== -1) f -= f - h;
                        h = -1
                    }
                }
            } else {
                if (r + o > s) r = s - o;
                for (f = r; f >= 0; f--) {
                    var l = true;
                    for (var c = 0; c < o; c++) {
                        if (u(t, f + c) !== u(e, c)) {
                            l = false;
                            break
                        }
                    }
                    if (l) return f
                }
            }
            return -1
        }
        u.prototype.includes = function t(e, r, n) {
            return this.indexOf(e, r, n) !== -1
        };
        u.prototype.indexOf = function t(e, r, n) {
            return E(this, e, r, n, true)
        };
        u.prototype.lastIndexOf = function t(e, r, n) {
            return E(this, e, r, n, false)
        };

        function S(t, e, r, n) {
            r = Number(r) || 0;
            var i = t.length - r;
            if (!n) {
                n = i
            } else {
                n = Number(n);
                if (n > i) {
                    n = i
                }
            }
            var a = e.length;
            if (a % 2 !== 0) throw new TypeError("Invalid hex string");
            if (n > a / 2) {
                n = a / 2
            }
            for (var s = 0; s < n; ++s) {
                var o = parseInt(e.substr(s * 2, 2), 16);
                if (isNaN(o)) return s;
                t[r + s] = o
            }
            return s
        }

        function I(t, e, r, n) {
            return Q(K(e, t.length - r), t, r, n)
        }

        function B(t, e, r, n) {
            return Q(X(e), t, r, n)
        }

        function A(t, e, r, n) {
            return B(t, e, r, n)
        }

        function C(t, e, r, n) {
            return Q(Z(e), t, r, n)
        }

        function L(t, e, r, n) {
            return Q(J(e, t.length - r), t, r, n)
        }
        u.prototype.write = function t(e, r, n, i) {
            if (r === undefined) {
                i = "utf8";
                n = this.length;
                r = 0
            } else if (n === undefined && typeof r === "string") {
                i = r;
                n = this.length;
                r = 0
            } else if (isFinite(r)) {
                r = r >>> 0;
                if (isFinite(n)) {
                    n = n >>> 0;
                    if (i === undefined) i = "utf8"
                } else {
                    i = n;
                    n = undefined
                }
            } else {
                throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported")
            }
            var a = this.length - r;
            if (n === undefined || n > a) n = a;
            if (e.length > 0 && (n < 0 || r < 0) || r > this.length) {
                throw new RangeError("Attempt to write outside buffer bounds")
            }
            if (!i) i = "utf8";
            var s = false;
            for (;;) {
                switch (i) {
                    case "hex":
                        return S(this, e, r, n);
                    case "utf8":
                    case "utf-8":
                        return I(this, e, r, n);
                    case "ascii":
                        return B(this, e, r, n);
                    case "latin1":
                    case "binary":
                        return A(this, e, r, n);
                    case "base64":
                        return C(this, e, r, n);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return L(this, e, r, n);
                    default:
                        if (s) throw new TypeError("Unknown encoding: " + i);
                        i = ("" + i).toLowerCase();
                        s = true
                }
            }
        };
        u.prototype.toJSON = function t() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        };

        function N(t, e, r) {
            if (e === 0 && r === t.length) {
                return n.fromByteArray(t)
            } else {
                return n.fromByteArray(t.slice(e, r))
            }
        }

        function U(t, e, r) {
            r = Math.min(t.length, r);
            var n = [];
            var i = e;
            while (i < r) {
                var a = t[i];
                var s = null;
                var o = a > 239 ? 4 : a > 223 ? 3 : a > 191 ? 2 : 1;
                if (i + o <= r) {
                    var u, f, h, l;
                    switch (o) {
                        case 1:
                            if (a < 128) {
                                s = a
                            }
                            break;
                        case 2:
                            u = t[i + 1];
                            if ((u & 192) === 128) {
                                l = (a & 31) << 6 | u & 63;
                                if (l > 127) {
                                    s = l
                                }
                            }
                            break;
                        case 3:
                            u = t[i + 1];
                            f = t[i + 2];
                            if ((u & 192) === 128 && (f & 192) === 128) {
                                l = (a & 15) << 12 | (u & 63) << 6 | f & 63;
                                if (l > 2047 && (l < 55296 || l > 57343)) {
                                    s = l
                                }
                            }
                            break;
                        case 4:
                            u = t[i + 1];
                            f = t[i + 2];
                            h = t[i + 3];
                            if ((u & 192) === 128 && (f & 192) === 128 && (h & 192) === 128) {
                                l = (a & 15) << 18 | (u & 63) << 12 | (f & 63) << 6 | h & 63;
                                if (l > 65535 && l < 1114112) {
                                    s = l
                                }
                            }
                    }
                }
                if (s === null) {
                    s = 65533;
                    o = 1
                } else if (s > 65535) {
                    s -= 65536;
                    n.push(s >>> 10 & 1023 | 55296);
                    s = 56320 | s & 1023
                }
                n.push(s);
                i += o
            }
            return _(n)
        }
        var M = 4096;

        function _(t) {
            var e = t.length;
            if (e <= M) {
                return String.fromCharCode.apply(String, t)
            }
            var r = "";
            var n = 0;
            while (n < e) {
                r += String.fromCharCode.apply(String, t.slice(n, n += M))
            }
            return r
        }

        function x(t, e, r) {
            var n = "";
            r = Math.min(t.length, r);
            for (var i = e; i < r; ++i) {
                n += String.fromCharCode(t[i] & 127)
            }
            return n
        }

        function D(t, e, r) {
            var n = "";
            r = Math.min(t.length, r);
            for (var i = e; i < r; ++i) {
                n += String.fromCharCode(t[i])
            }
            return n
        }

        function P(t, e, r) {
            var n = t.length;
            if (!e || e < 0) e = 0;
            if (!r || r < 0 || r > n) r = n;
            var i = "";
            for (var a = e; a < r; ++a) {
                i += G(t[a])
            }
            return i
        }

        function R(t, e, r) {
            var n = t.slice(e, r);
            var i = "";
            for (var a = 0; a < n.length; a += 2) {
                i += String.fromCharCode(n[a] + n[a + 1] * 256)
            }
            return i
        }
        u.prototype.slice = function t(e, r) {
            var n = this.length;
            e = ~~e;
            r = r === undefined ? n : ~~r;
            if (e < 0) {
                e += n;
                if (e < 0) e = 0
            } else if (e > n) {
                e = n
            }
            if (r < 0) {
                r += n;
                if (r < 0) r = 0
            } else if (r > n) {
                r = n
            }
            if (r < e) r = e;
            var i = this.subarray(e, r);
            i.__proto__ = u.prototype;
            return i
        };

        function O(t, e, r) {
            if (t % 1 !== 0 || t < 0) throw new RangeError("offset is not uint");
            if (t + e > r) throw new RangeError("Trying to access beyond buffer length")
        }
        u.prototype.readUIntLE = function t(e, r, n) {
            e = e >>> 0;
            r = r >>> 0;
            if (!n) O(e, r, this.length);
            var i = this[e];
            var a = 1;
            var s = 0;
            while (++s < r && (a *= 256)) {
                i += this[e + s] * a
            }
            return i
        };
        u.prototype.readUIntBE = function t(e, r, n) {
            e = e >>> 0;
            r = r >>> 0;
            if (!n) {
                O(e, r, this.length)
            }
            var i = this[e + --r];
            var a = 1;
            while (r > 0 && (a *= 256)) {
                i += this[e + --r] * a
            }
            return i
        };
        u.prototype.readUInt8 = function t(e, r) {
            e = e >>> 0;
            if (!r) O(e, 1, this.length);
            return this[e]
        };
        u.prototype.readUInt16LE = function t(e, r) {
            e = e >>> 0;
            if (!r) O(e, 2, this.length);
            return this[e] | this[e + 1] << 8
        };
        u.prototype.readUInt16BE = function t(e, r) {
            e = e >>> 0;
            if (!r) O(e, 2, this.length);
            return this[e] << 8 | this[e + 1]
        };
        u.prototype.readUInt32LE = function t(e, r) {
            e = e >>> 0;
            if (!r) O(e, 4, this.length);
            return (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216
        };
        u.prototype.readUInt32BE = function t(e, r) {
            e = e >>> 0;
            if (!r) O(e, 4, this.length);
            return this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
        };
        u.prototype.readIntLE = function t(e, r, n) {
            e = e >>> 0;
            r = r >>> 0;
            if (!n) O(e, r, this.length);
            var i = this[e];
            var a = 1;
            var s = 0;
            while (++s < r && (a *= 256)) {
                i += this[e + s] * a
            }
            a *= 128;
            if (i >= a) i -= Math.pow(2, 8 * r);
            return i
        };
        u.prototype.readIntBE = function t(e, r, n) {
            e = e >>> 0;
            r = r >>> 0;
            if (!n) O(e, r, this.length);
            var i = r;
            var a = 1;
            var s = this[e + --i];
            while (i > 0 && (a *= 256)) {
                s += this[e + --i] * a
            }
            a *= 128;
            if (s >= a) s -= Math.pow(2, 8 * r);
            return s
        };
        u.prototype.readInt8 = function t(e, r) {
            e = e >>> 0;
            if (!r) O(e, 1, this.length);
            if (!(this[e] & 128)) return this[e];
            return (255 - this[e] + 1) * -1
        };
        u.prototype.readInt16LE = function t(e, r) {
            e = e >>> 0;
            if (!r) O(e, 2, this.length);
            var n = this[e] | this[e + 1] << 8;
            return n & 32768 ? n | 4294901760 : n
        };
        u.prototype.readInt16BE = function t(e, r) {
            e = e >>> 0;
            if (!r) O(e, 2, this.length);
            var n = this[e + 1] | this[e] << 8;
            return n & 32768 ? n | 4294901760 : n
        };
        u.prototype.readInt32LE = function t(e, r) {
            e = e >>> 0;
            if (!r) O(e, 4, this.length);
            return this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
        };
        u.prototype.readInt32BE = function t(e, r) {
            e = e >>> 0;
            if (!r) O(e, 4, this.length);
            return this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
        };
        u.prototype.readFloatLE = function t(e, r) {
            e = e >>> 0;
            if (!r) O(e, 4, this.length);
            return i.read(this, e, true, 23, 4)
        };
        u.prototype.readFloatBE = function t(e, r) {
            e = e >>> 0;
            if (!r) O(e, 4, this.length);
            return i.read(this, e, false, 23, 4)
        };
        u.prototype.readDoubleLE = function t(e, r) {
            e = e >>> 0;
            if (!r) O(e, 8, this.length);
            return i.read(this, e, true, 52, 8)
        };
        u.prototype.readDoubleBE = function t(e, r) {
            e = e >>> 0;
            if (!r) O(e, 8, this.length);
            return i.read(this, e, false, 52, 8)
        };

        function F(t, e, r, n, i, a) {
            if (!u.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (e > i || e < a) throw new RangeError('"value" argument is out of bounds');
            if (r + n > t.length) throw new RangeError("Index out of range")
        }
        u.prototype.writeUIntLE = function t(e, r, n, i) {
            e = +e;
            r = r >>> 0;
            n = n >>> 0;
            if (!i) {
                var a = Math.pow(2, 8 * n) - 1;
                F(this, e, r, n, a, 0)
            }
            var s = 1;
            var o = 0;
            this[r] = e & 255;
            while (++o < n && (s *= 256)) {
                this[r + o] = e / s & 255
            }
            return r + n
        };
        u.prototype.writeUIntBE = function t(e, r, n, i) {
            e = +e;
            r = r >>> 0;
            n = n >>> 0;
            if (!i) {
                var a = Math.pow(2, 8 * n) - 1;
                F(this, e, r, n, a, 0)
            }
            var s = n - 1;
            var o = 1;
            this[r + s] = e & 255;
            while (--s >= 0 && (o *= 256)) {
                this[r + s] = e / o & 255
            }
            return r + n
        };
        u.prototype.writeUInt8 = function t(e, r, n) {
            e = +e;
            r = r >>> 0;
            if (!n) F(this, e, r, 1, 255, 0);
            this[r] = e & 255;
            return r + 1
        };
        u.prototype.writeUInt16LE = function t(e, r, n) {
            e = +e;
            r = r >>> 0;
            if (!n) F(this, e, r, 2, 65535, 0);
            this[r] = e & 255;
            this[r + 1] = e >>> 8;
            return r + 2
        };
        u.prototype.writeUInt16BE = function t(e, r, n) {
            e = +e;
            r = r >>> 0;
            if (!n) F(this, e, r, 2, 65535, 0);
            this[r] = e >>> 8;
            this[r + 1] = e & 255;
            return r + 2
        };
        u.prototype.writeUInt32LE = function t(e, r, n) {
            e = +e;
            r = r >>> 0;
            if (!n) F(this, e, r, 4, 4294967295, 0);
            this[r + 3] = e >>> 24;
            this[r + 2] = e >>> 16;
            this[r + 1] = e >>> 8;
            this[r] = e & 255;
            return r + 4
        };
        u.prototype.writeUInt32BE = function t(e, r, n) {
            e = +e;
            r = r >>> 0;
            if (!n) F(this, e, r, 4, 4294967295, 0);
            this[r] = e >>> 24;
            this[r + 1] = e >>> 16;
            this[r + 2] = e >>> 8;
            this[r + 3] = e & 255;
            return r + 4
        };
        u.prototype.writeIntLE = function t(e, r, n, i) {
            e = +e;
            r = r >>> 0;
            if (!i) {
                var a = Math.pow(2, 8 * n - 1);
                F(this, e, r, n, a - 1, -a)
            }
            var s = 0;
            var o = 1;
            var u = 0;
            this[r] = e & 255;
            while (++s < n && (o *= 256)) {
                if (e < 0 && u === 0 && this[r + s - 1] !== 0) {
                    u = 1
                }
                this[r + s] = (e / o >> 0) - u & 255
            }
            return r + n
        };
        u.prototype.writeIntBE = function t(e, r, n, i) {
            e = +e;
            r = r >>> 0;
            if (!i) {
                var a = Math.pow(2, 8 * n - 1);
                F(this, e, r, n, a - 1, -a)
            }
            var s = n - 1;
            var o = 1;
            var u = 0;
            this[r + s] = e & 255;
            while (--s >= 0 && (o *= 256)) {
                if (e < 0 && u === 0 && this[r + s + 1] !== 0) {
                    u = 1
                }
                this[r + s] = (e / o >> 0) - u & 255
            }
            return r + n
        };
        u.prototype.writeInt8 = function t(e, r, n) {
            e = +e;
            r = r >>> 0;
            if (!n) F(this, e, r, 1, 127, -128);
            if (e < 0) e = 255 + e + 1;
            this[r] = e & 255;
            return r + 1
        };
        u.prototype.writeInt16LE = function t(e, r, n) {
            e = +e;
            r = r >>> 0;
            if (!n) F(this, e, r, 2, 32767, -32768);
            this[r] = e & 255;
            this[r + 1] = e >>> 8;
            return r + 2
        };
        u.prototype.writeInt16BE = function t(e, r, n) {
            e = +e;
            r = r >>> 0;
            if (!n) F(this, e, r, 2, 32767, -32768);
            this[r] = e >>> 8;
            this[r + 1] = e & 255;
            return r + 2
        };
        u.prototype.writeInt32LE = function t(e, r, n) {
            e = +e;
            r = r >>> 0;
            if (!n) F(this, e, r, 4, 2147483647, -2147483648);
            this[r] = e & 255;
            this[r + 1] = e >>> 8;
            this[r + 2] = e >>> 16;
            this[r + 3] = e >>> 24;
            return r + 4
        };
        u.prototype.writeInt32BE = function t(e, r, n) {
            e = +e;
            r = r >>> 0;
            if (!n) F(this, e, r, 4, 2147483647, -2147483648);
            if (e < 0) e = 4294967295 + e + 1;
            this[r] = e >>> 24;
            this[r + 1] = e >>> 16;
            this[r + 2] = e >>> 8;
            this[r + 3] = e & 255;
            return r + 4
        };

        function j(t, e, r, n, i, a) {
            if (r + n > t.length) throw new RangeError("Index out of range");
            if (r < 0) throw new RangeError("Index out of range")
        }

        function q(t, e, r, n, a) {
            e = +e;
            r = r >>> 0;
            if (!a) {
                j(t, e, r, 4, 3.4028234663852886e38, -3.4028234663852886e38)
            }
            i.write(t, e, r, n, 23, 4);
            return r + 4
        }
        u.prototype.writeFloatLE = function t(e, r, n) {
            return q(this, e, r, true, n)
        };
        u.prototype.writeFloatBE = function t(e, r, n) {
            return q(this, e, r, false, n)
        };

        function z(t, e, r, n, a) {
            e = +e;
            r = r >>> 0;
            if (!a) {
                j(t, e, r, 8, 1.7976931348623157e308, -1.7976931348623157e308)
            }
            i.write(t, e, r, n, 52, 8);
            return r + 8
        }
        u.prototype.writeDoubleLE = function t(e, r, n) {
            return z(this, e, r, true, n)
        };
        u.prototype.writeDoubleBE = function t(e, r, n) {
            return z(this, e, r, false, n)
        };
        u.prototype.copy = function t(e, r, n, i) {
            if (!n) n = 0;
            if (!i && i !== 0) i = this.length;
            if (r >= e.length) r = e.length;
            if (!r) r = 0;
            if (i > 0 && i < n) i = n;
            if (i === n) return 0;
            if (e.length === 0 || this.length === 0) return 0;
            if (r < 0) {
                throw new RangeError("targetStart out of bounds")
            }
            if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
            if (i < 0) throw new RangeError("sourceEnd out of bounds");
            if (i > this.length) i = this.length;
            if (e.length - r < i - n) {
                i = e.length - r + n
            }
            var a = i - n;
            var s;
            if (this === e && n < r && r < i) {
                for (s = a - 1; s >= 0; --s) {
                    e[s + r] = this[s + n]
                }
            } else if (a < 1e3) {
                for (s = 0; s < a; ++s) {
                    e[s + r] = this[s + n]
                }
            } else {
                Uint8Array.prototype.set.call(e, this.subarray(n, n + a), r)
            }
            return a
        };
        u.prototype.fill = function t(e, r, n, i) {
            if (typeof e === "string") {
                if (typeof r === "string") {
                    i = r;
                    r = 0;
                    n = this.length
                } else if (typeof n === "string") {
                    i = n;
                    n = this.length
                }
                if (e.length === 1) {
                    var a = e.charCodeAt(0);
                    if (a < 256) {
                        e = a
                    }
                }
                if (i !== undefined && typeof i !== "string") {
                    throw new TypeError("encoding must be a string")
                }
                if (typeof i === "string" && !u.isEncoding(i)) {
                    throw new TypeError("Unknown encoding: " + i)
                }
            } else if (typeof e === "number") {
                e = e & 255
            }
            if (r < 0 || this.length < r || this.length < n) {
                throw new RangeError("Out of range index")
            }
            if (n <= r) {
                return this
            }
            r = r >>> 0;
            n = n === undefined ? this.length : n >>> 0;
            if (!e) e = 0;
            var s;
            if (typeof e === "number") {
                for (s = r; s < n; ++s) {
                    this[s] = e
                }
            } else {
                var o = u.isBuffer(e) ? e : new u(e, i);
                var f = o.length;
                for (s = 0; s < n - r; ++s) {
                    this[s + r] = o[s % f]
                }
            }
            return this
        };
        var V = /[^+\/0-9A-Za-z-_]/g;

        function Y(t) {
            t = H(t).replace(V, "");
            if (t.length < 2) return "";
            while (t.length % 4 !== 0) {
                t = t + "="
            }
            return t
        }

        function H(t) {
            if (t.trim) return t.trim();
            return t.replace(/^\s+|\s+$/g, "")
        }

        function G(t) {
            if (t < 16) return "0" + t.toString(16);
            return t.toString(16)
        }

        function K(t, e) {
            e = e || Infinity;
            var r;
            var n = t.length;
            var i = null;
            var a = [];
            for (var s = 0; s < n; ++s) {
                r = t.charCodeAt(s);
                if (r > 55295 && r < 57344) {
                    if (!i) {
                        if (r > 56319) {
                            if ((e -= 3) > -1) a.push(239, 191, 189);
                            continue
                        } else if (s + 1 === n) {
                            if ((e -= 3) > -1) a.push(239, 191, 189);
                            continue
                        }
                        i = r;
                        continue
                    }
                    if (r < 56320) {
                        if ((e -= 3) > -1) a.push(239, 191, 189);
                        i = r;
                        continue
                    }
                    r = (i - 55296 << 10 | r - 56320) + 65536
                } else if (i) {
                    if ((e -= 3) > -1) a.push(239, 191, 189)
                }
                i = null;
                if (r < 128) {
                    if ((e -= 1) < 0) break;
                    a.push(r)
                } else if (r < 2048) {
                    if ((e -= 2) < 0) break;
                    a.push(r >> 6 | 192, r & 63 | 128)
                } else if (r < 65536) {
                    if ((e -= 3) < 0) break;
                    a.push(r >> 12 | 224, r >> 6 & 63 | 128, r & 63 | 128)
                } else if (r < 1114112) {
                    if ((e -= 4) < 0) break;
                    a.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, r & 63 | 128)
                } else {
                    throw new Error("Invalid code point")
                }
            }
            return a
        }

        function X(t) {
            var e = [];
            for (var r = 0; r < t.length; ++r) {
                e.push(t.charCodeAt(r) & 255)
            }
            return e
        }

        function J(t, e) {
            var r, n, i;
            var a = [];
            for (var s = 0; s < t.length; ++s) {
                if ((e -= 2) < 0) break;
                r = t.charCodeAt(s);
                n = r >> 8;
                i = r % 256;
                a.push(i);
                a.push(n)
            }
            return a
        }

        function Z(t) {
            return n.toByteArray(Y(t))
        }

        function Q(t, e, r, n) {
            for (var i = 0; i < n; ++i) {
                if (i + r >= e.length || i >= t.length) break;
                e[i + r] = t[i]
            }
            return i
        }

        function W(t) {
            return t !== t
        }
    }, {
        "base64-js": 3,
        ieee754: 4
    }],
    3: [function(t, e, r) {
        "use strict";
        r.byteLength = h;
        r.toByteArray = l;
        r.fromByteArray = g;
        var n = [];
        var i = [];
        var a = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
        var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (var o = 0, u = s.length; o < u; ++o) {
            n[o] = s[o];
            i[s.charCodeAt(o)] = o
        }
        i["-".charCodeAt(0)] = 62;
        i["_".charCodeAt(0)] = 63;

        function f(t) {
            var e = t.length;
            if (e % 4 > 0) {
                throw new Error("Invalid string. Length must be a multiple of 4")
            }
            return t[e - 2] === "=" ? 2 : t[e - 1] === "=" ? 1 : 0
        }

        function h(t) {
            return t.length * 3 / 4 - f(t)
        }

        function l(t) {
            var e, r, n, s, o, u;
            var h = t.length;
            o = f(t);
            u = new a(h * 3 / 4 - o);
            n = o > 0 ? h - 4 : h;
            var l = 0;
            for (e = 0, r = 0; e < n; e += 4, r += 3) {
                s = i[t.charCodeAt(e)] << 18 | i[t.charCodeAt(e + 1)] << 12 | i[t.charCodeAt(e + 2)] << 6 | i[t.charCodeAt(e + 3)];
                u[l++] = s >> 16 & 255;
                u[l++] = s >> 8 & 255;
                u[l++] = s & 255
            }
            if (o === 2) {
                s = i[t.charCodeAt(e)] << 2 | i[t.charCodeAt(e + 1)] >> 4;
                u[l++] = s & 255
            } else if (o === 1) {
                s = i[t.charCodeAt(e)] << 10 | i[t.charCodeAt(e + 1)] << 4 | i[t.charCodeAt(e + 2)] >> 2;
                u[l++] = s >> 8 & 255;
                u[l++] = s & 255
            }
            return u
        }

        function c(t) {
            return n[t >> 18 & 63] + n[t >> 12 & 63] + n[t >> 6 & 63] + n[t & 63]
        }

        function p(t, e, r) {
            var n;
            var i = [];
            for (var a = e; a < r; a += 3) {
                n = (t[a] << 16) + (t[a + 1] << 8) + t[a + 2];
                i.push(c(n))
            }
            return i.join("")
        }

        function g(t) {
            var e;
            var r = t.length;
            var i = r % 3;
            var a = "";
            var s = [];
            var o = 16383;
            for (var u = 0, f = r - i; u < f; u += o) {
                s.push(p(t, u, u + o > f ? f : u + o))
            }
            if (i === 1) {
                e = t[r - 1];
                a += n[e >> 2];
                a += n[e << 4 & 63];
                a += "=="
            } else if (i === 2) {
                e = (t[r - 2] << 8) + t[r - 1];
                a += n[e >> 10];
                a += n[e >> 4 & 63];
                a += n[e << 2 & 63];
                a += "="
            }
            s.push(a);
            return s.join("")
        }
    }, {}],
    4: [function(t, e, r) {
        r.read = function(t, e, r, n, i) {
            var a, s;
            var o = i * 8 - n - 1;
            var u = (1 << o) - 1;
            var f = u >> 1;
            var h = -7;
            var l = r ? i - 1 : 0;
            var c = r ? -1 : 1;
            var p = t[e + l];
            l += c;
            a = p & (1 << -h) - 1;
            p >>= -h;
            h += o;
            for (; h > 0; a = a * 256 + t[e + l], l += c, h -= 8) {}
            s = a & (1 << -h) - 1;
            a >>= -h;
            h += n;
            for (; h > 0; s = s * 256 + t[e + l], l += c, h -= 8) {}
            if (a === 0) {
                a = 1 - f
            } else if (a === u) {
                return s ? NaN : (p ? -1 : 1) * Infinity
            } else {
                s = s + Math.pow(2, n);
                a = a - f
            }
            return (p ? -1 : 1) * s * Math.pow(2, a - n)
        };
        r.write = function(t, e, r, n, i, a) {
            var s, o, u;
            var f = a * 8 - i - 1;
            var h = (1 << f) - 1;
            var l = h >> 1;
            var c = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
            var p = n ? 0 : a - 1;
            var g = n ? 1 : -1;
            var v = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
            e = Math.abs(e);
            if (isNaN(e) || e === Infinity) {
                o = isNaN(e) ? 1 : 0;
                s = h
            } else {
                s = Math.floor(Math.log(e) / Math.LN2);
                if (e * (u = Math.pow(2, -s)) < 1) {
                    s--;
                    u *= 2
                }
                if (s + l >= 1) {
                    e += c / u
                } else {
                    e += c * Math.pow(2, 1 - l)
                }
                if (e * u >= 2) {
                    s++;
                    u /= 2
                }
                if (s + l >= h) {
                    o = 0;
                    s = h
                } else if (s + l >= 1) {
                    o = (e * u - 1) * Math.pow(2, i);
                    s = s + l
                } else {
                    o = e * Math.pow(2, l - 1) * Math.pow(2, i);
                    s = 0
                }
            }
            for (; i >= 8; t[r + p] = o & 255, p += g, o /= 256, i -= 8) {}
            s = s << i | o;
            f += i;
            for (; f > 0; t[r + p] = s & 255, p += g, s /= 256, f -= 8) {}
            t[r + p - g] |= v * 128
        }
    }, {}],
    MidiPlayer: [function(t, e, r) {
        (function(e) {
            "use strict";
            var n = {
                VERSION: "1.1.0",
                NOTES: []
            };
            (function() {
                var t = [
                    ["C"],
                    ["C#", "Db"],
                    ["D"],
                    ["D#", "Eb"],
                    ["E"],
                    ["F"],
                    ["F#", "Gb"],
                    ["G"],
                    ["G#", "Ab"],
                    ["A"],
                    ["A#", "Bb"],
                    ["B"]
                ];
                var e = 0;
                var r = function r(i) {
                    t.forEach(function(t) {
                        t.forEach(function(t) {
                            return n.NOTES[e] = t + i
                        });
                        e++
                    })
                };
                for (var i = -1; i <= 9; i++) {
                    r(i)
                }
            })();
            r.Constants = n;
            "use strict";
            var i = function() {
                function t(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || false;
                        n.configurable = true;
                        if ("value" in n) n.writable = true;
                        Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, r, n) {
                    if (r) t(e.prototype, r);
                    if (n) t(e, n);
                    return e
                }
            }();

            function a(t, e) {
                if (!(t instanceof e)) {
                    throw new TypeError("Cannot call a class as a function")
                }
            }
            var s = function() {
                function e(t, r) {
                    a(this, e);
                    this.sampleRate = 5;
                    this.startTime = 0;
                    this.buffer = r || null;
                    this.division;
                    this.format;
                    this.setIntervalId = null;
                    this.tracks = [];
                    this.tempo = 120;
                    this.startTick = 0;
                    this.tick = 0;
                    this.lastTick = null;
                    this.inLoop = false;
                    this.totalTicks = 0;
                    this.events = [];
                    this.eventListeners = {};
                    if (typeof t === "function") this.on("midiEvent", t)
                }
                i(e, [{
                    key: "loadFile",
                    value: function e(r) {
                        var n = t("fs");
                        this.buffer = n.readFileSync(r);
                        return this.fileLoaded()
                    }
                }, {
                    key: "loadArrayBuffer",
                    value: function t(e) {
                        this.buffer = new Uint8Array(e);
                        return this.fileLoaded()
                    }
                }, {
                    key: "loadDataUri",
                    value: function t(e) {
                        var r = u.atob(e.split(",")[1]);
                        var n = new Uint8Array(r.length);
                        for (var i = 0; i < r.length; i++) {
                            n[i] = r.charCodeAt(i)
                        }
                        this.buffer = n;
                        return this.fileLoaded()
                    }
                }, {
                    key: "getFilesize",
                    value: function t() {
                        return this.buffer ? this.buffer.length : 0
                    }
                }, {
                    key: "fileLoaded",
                    value: function t() {
                        if (!this.validate()) throw "Invalid MIDI file; should start with MThd";
                        return this.getDivision().getFormat().getTracks().dryRun()
                    }
                }, {
                    key: "validate",
                    value: function t() {
                        return u.bytesToLetters(this.buffer.slice(0, 4)) === "MThd"
                    }
                }, {
                    key: "getFormat",
                    value: function t() {
                        this.format = u.bytesToNumber(this.buffer.slice(8, 10));
                        return this
                    }
                }, {
                    key: "getTracks",
                    value: function t() {
                        this.tracks = [];
                        this.buffer.forEach(function(t, e) {
                            if (u.bytesToLetters(this.buffer.slice(e, e + 4)) == "MTrk") {
                                var r = u.bytesToNumber(this.buffer.slice(e + 4, e + 8));
                                this.tracks.push(new o(this.tracks.length, this.buffer.slice(e + 8, e + 8 + r)))
                            }
                        }, this);
                        return this
                    }
                }, {
                    key: "enableTrack",
                    value: function t(e) {
                        this.tracks[e - 1].enable();
                        return this
                    }
                }, {
                    key: "disableTrack",
                    value: function t(e) {
                        this.tracks[e - 1].disable();
                        return this
                    }
                }, {
                    key: "getDivision",
                    value: function t() {
                        this.division = u.bytesToNumber(this.buffer.slice(12, 14));
                        return this
                    }
                }, {
                    key: "playLoop",
                    value: function t(e) {
                        if (!this.inLoop) {
                            this.inLoop = true;
                            this.tick = this.getCurrentTick();
                            this.tracks.forEach(function(t) {
                                if (!e && this.endOfFile()) {
                                    this.triggerPlayerEvent("endOfFile");
                                    this.stop()
                                } else {
                                    var r = t.handleEvent(this.tick, e);
                                    if (r && !e) this.emitEvent(r)
                                }
                            }, this);
                            if (!e) this.triggerPlayerEvent("playing", {
                                tick: this.tick
                            });
                            this.inLoop = false
                        }
                    }
                }, {
                    key: "setStartTime",
                    value: function t(e) {
                        this.startTime = e;
                        console.log("MidiPlayer.js: setStartTime: " + this.startTime)
                    }
                }, {
                    key: "play",
                    value: function t() {
                        if (this.isPlaying()) {
                            console.log("Already playing...");
                            return false
                        }
                        if (!this.startTime) {
                            this.startTime = (new Date).getTime()
                        }
                        this.setIntervalId = setInterval(this.playLoop.bind(this), this.sampleRate);
                        return this
                    }
                }, {
                    key: "pause",
                    value: function t() {
                        clearInterval(this.setIntervalId);
                        this.setIntervalId = false;
                        this.startTick = this.tick;
                        this.startTime = 0;
                        return this
                    }
                }, {
                    key: "stop",
                    value: function t() {
                        clearInterval(this.setIntervalId);
                        this.setIntervalId = false;
                        this.startTick = 0;
                        this.startTime = 0;
                        this.resetTracks();
                        return this
                    }
                }, {
                    key: "isPlaying",
                    value: function t() {
                        return this.setIntervalId > 0
                    }
                }, {
                    key: "dryRun",
                    value: function t() {
                        this.resetTracks();
                        while (!this.endOfFile()) {
                            this.playLoop(true)
                        }
                        this.events = this.getEvents();
                        this.totalTicks = this.getTotalTicks();
                        this.startTick = 0;
                        this.startTime = 0;
                        this.resetTracks();
                        this.triggerPlayerEvent("fileLoaded", this);
                        return this
                    }
                }, {
                    key: "resetTracks",
                    value: function t() {
                        this.tracks.forEach(function(t) {
                            return t.reset()
                        });
                        return this
                    }
                }, {
                    key: "getEvents",
                    value: function t() {
                        return this.tracks.map(function(t) {
                            return t.events
                        })
                    }
                }, {
                    key: "getTotalTicks",
                    value: function t() {
                        return Math.max.apply(null, this.tracks.map(function(t) {
                            return t.delta
                        }))
                    }
                }, {
                    key: "getSongTime",
                    value: function t() {
                        return this.totalTicks / this.division / this.tempo * 60
                    }
                }, {
                    key: "getSongTimeRemaining",
                    value: function t() {
                        return Math.round((this.totalTicks - this.tick) / this.division / this.tempo * 60)
                    }
                }, {
                    key: "getSongPercentRemaining",
                    value: function t() {
                        return Math.round(this.getSongTimeRemaining() / this.getSongTime() * 100)
                    }
                }, {
                    key: "bytesProcessed",
                    value: function t() {
                        return 14 + this.tracks.length * 8 + this.tracks.reduce(function(t, e) {
                            return {
                                pointer: t.pointer + e.pointer
                            }
                        }, {
                            pointer: 0
                        }).pointer
                    }
                }, {
                    key: "endOfFile",
                    value: function t() {
                        return this.bytesProcessed() == this.buffer.length
                    }
                }, {
                    key: "getCurrentTick",
                    value: function t() {
                        return Math.round(((new Date).getTime() - this.startTime) / 1e3 * (this.division * (this.tempo / 60))) + this.startTick
                    }
                }, {
                    key: "emitEvent",
                    value: function t(e) {
                        if (e.hasOwnProperty("name") && e.name === "Set Tempo") this.tempo = e.data;
                        this.triggerPlayerEvent("midiEvent", e);
                        return this
                    }
                }, {
                    key: "on",
                    value: function t(e, r) {
                        if (!this.eventListeners.hasOwnProperty(e)) this.eventListeners[e] = [];
                        this.eventListeners[e].push(r);
                        return this
                    }
                }, {
                    key: "triggerPlayerEvent",
                    value: function t(e, r) {
                        if (this.eventListeners.hasOwnProperty(e)) this.eventListeners[e].forEach(function(t) {
                            return t(r || {})
                        });
                        return this
                    }
                }]);
                return e
            }();
            r.Player = s;
            "use strict";
            var i = function() {
                function t(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || false;
                        n.configurable = true;
                        if ("value" in n) n.writable = true;
                        Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, r, n) {
                    if (r) t(e.prototype, r);
                    if (n) t(e, n);
                    return e
                }
            }();

            function a(t, e) {
                if (!(t instanceof e)) {
                    throw new TypeError("Cannot call a class as a function")
                }
            }
            var o = function() {
                function t(e, r) {
                    a(this, t);
                    this.enabled = true;
                    this.pointer = 0;
                    this.lastTick = 0;
                    this.lastStatus = null;
                    this.index = e;
                    this.data = r;
                    this.delta = 0;
                    this.runningDelta = 0;
                    this.events = []
                }
                i(t, [{
                    key: "reset",
                    value: function t() {
                        this.enabled = true;
                        this.pointer = 0;
                        this.lastTick = 0;
                        this.lastStatus = null;
                        this.delta = 0;
                        this.runningDelta = 0;
                        return this
                    }
                }, {
                    key: "enable",
                    value: function t() {
                        this.enabled = true;
                        return this
                    }
                }, {
                    key: "disable",
                    value: function t() {
                        this.enabled = false;
                        return this
                    }
                }, {
                    key: "getCurrentByte",
                    value: function t() {
                        return this.data[this.pointer]
                    }
                }, {
                    key: "getDeltaByteCount",
                    value: function t() {
                        var e = this.getCurrentByte();
                        var r = 1;
                        while (e >= 128) {
                            e = this.data[this.pointer + r];
                            r++
                        }
                        return r
                    }
                }, {
                    key: "getDelta",
                    value: function t() {
                        return u.readVarInt(this.data.slice(this.pointer, this.pointer + this.getDeltaByteCount()))
                    }
                }, {
                    key: "handleEvent",
                    value: function t(e, r) {
                        r = r || false;
                        if (this.pointer < this.data.length && (r || e - this.lastTick >= this.getDelta())) {
                            var n = this.parseEvent();
                            if (this.enabled) return n
                        }
                        return null
                    }
                }, {
                    key: "getStringData",
                    value: function t(e) {
                        var r = this.pointer;
                        var n = 1;
                        var i = u.readVarInt(this.data.slice(e + 2, e + 2 + n));
                        var a = i;
                        return u.bytesToLetters(this.data.slice(e + n + 2, e + n + i + 2))
                    }
                }, {
                    key: "parseEvent",
                    value: function t() {
                        var e = this.pointer + this.getDeltaByteCount();
                        var r = {};
                        var i = this.getDeltaByteCount();
                        r.track = this.index + 1;
                        r.delta = this.getDelta();
                        this.lastTick = this.lastTick + r.delta;
                        this.runningDelta += r.delta;
                        r.tick = this.runningDelta;
                        if (this.data[e] == 255) {
                            switch (this.data[e + 1]) {
                                case 0:
                                    r.name = "Sequence Number";
                                    break;
                                case 1:
                                    r.name = "Text Event";
                                    r.string = this.getStringData(e);
                                    break;
                                case 2:
                                    r.name = "Copyright Notice";
                                    break;
                                case 3:
                                    r.name = "Sequence/Track Name";
                                    r.string = this.getStringData(e);
                                    break;
                                case 4:
                                    r.name = "Instrument Name";
                                    r.string = this.getStringData(e);
                                    break;
                                case 5:
                                    r.name = "Lyric";
                                    r.string = this.getStringData(e);
                                    break;
                                case 6:
                                    r.name = "Marker";
                                    break;
                                case 7:
                                    r.name = "Cue Point";
                                    r.string = this.getStringData(e);
                                    break;
                                case 9:
                                    r.name = "Device Name";
                                    r.string = this.getStringData(e);
                                    break;
                                case 32:
                                    r.name = "MIDI Channel Prefix";
                                    break;
                                case 33:
                                    r.name = "MIDI Port";
                                    r.data = u.bytesToNumber([this.data[e + 3]]);
                                    break;
                                case 47:
                                    r.name = "End of Track";
                                    break;
                                case 81:
                                    r.name = "Set Tempo";
                                    r.data = Math.round(6e7 / u.bytesToNumber(this.data.slice(e + 3, e + 6)));
                                    this.tempo = r.data;
                                    break;
                                case 84:
                                    r.name = "SMTPE Offset";
                                    break;
                                case 88:
                                    r.name = "Time Signature";
                                    break;
                                case 89:
                                    r.name = "Key Signature";
                                    break;
                                case 127:
                                    r.name = "Sequencer-Specific Meta-event";
                                    break;
                                default:
                                    r.name = "Unknown: " + this.data[e + 1].toString(16);
                                    break
                            }
                            var a = this.data[this.pointer + i + 2];
                            this.pointer += i + 3 + a
                        } else if (this.data[e] == 240) {
                            r.name = "Sysex";
                            var a = this.data[this.pointer + i + 1];
                            this.pointer += i + 2 + a
                        } else {
                            if (this.data[e] < 128) {
                                r.running = true;
                                r.noteNumber = this.data[e];
                                r.noteName = n.NOTES[this.data[e]];
                                r.velocity = this.data[e + 1];
                                if (this.lastStatus <= 143) {
                                    r.name = "Note off";
                                    r.channel = this.lastStatus - 128 + 1
                                } else if (this.lastStatus <= 159) {
                                    r.name = "Note on";
                                    r.channel = this.lastStatus - 144 + 1
                                }
                                this.pointer += i + 2
                            } else {
                                this.lastStatus = this.data[e];
                                if (this.data[e] <= 143) {
                                    r.name = "Note off";
                                    r.channel = this.lastStatus - 128 + 1;
                                    r.noteNumber = this.data[e + 1];
                                    r.noteName = n.NOTES[this.data[e + 1]];
                                    r.velocity = Math.round(this.data[e + 2] / 127 * 100);
                                    this.pointer += i + 3
                                } else if (this.data[e] <= 159) {
                                    r.name = "Note on";
                                    r.channel = this.lastStatus - 144 + 1;
                                    r.noteNumber = this.data[e + 1];
                                    r.noteName = n.NOTES[this.data[e + 1]];
                                    r.velocity = Math.round(this.data[e + 2] / 127 * 100);
                                    this.pointer += i + 3
                                } else if (this.data[e] <= 175) {
                                    r.name = "Polyphonic Key Pressure";
                                    r.channel = this.lastStatus - 160 + 1;
                                    r.note = n.NOTES[this.data[e + 1]];
                                    r.pressure = event[2];
                                    this.pointer += i + 3
                                } else if (this.data[e] <= 191) {
                                    r.name = "Controller Change";
                                    r.channel = this.lastStatus - 176 + 1;
                                    r.number = this.data[e + 1];
                                    r.value = this.data[e + 2];
                                    this.pointer += i + 3
                                } else if (this.data[e] <= 207) {
                                    r.name = "Program Change";
                                    r.channel = this.lastStatus - 192 + 1;
                                    this.pointer += i + 2
                                } else if (this.data[e] <= 223) {
                                    r.name = "Channel Key Pressure";
                                    r.channel = this.lastStatus - 208 + 1;
                                    this.pointer += i + 2
                                } else if (this.data[e] <= 239) {
                                    r.name = "Pitch Bend";
                                    r.channel = this.lastStatus - 224 + 1;
                                    this.pointer += i + 3
                                } else {
                                    r.name = "Unknown.  Pointer: " + this.pointer.toString() + " " + e.toString() + " " + this.data.length
                                }
                            }
                        }
                        this.delta += r.delta;
                        this.events.push(r);
                        return r
                    }
                }, {
                    key: "endOfTrack",
                    value: function t() {
                        if (this.data[this.pointer + 1] == 255 && this.data[this.pointer + 2] == 47 && this.data[this.pointer + 3] == 0) {
                            return true
                        }
                        return false
                    }
                }]);
                return t
            }();
            "use strict";
            var i = function() {
                function t(t, e) {
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        n.enumerable = n.enumerable || false;
                        n.configurable = true;
                        if ("value" in n) n.writable = true;
                        Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, r, n) {
                    if (r) t(e.prototype, r);
                    if (n) t(e, n);
                    return e
                }
            }();

            function a(t, e) {
                if (!(t instanceof e)) {
                    throw new TypeError("Cannot call a class as a function")
                }
            }
            var u = function() {
                function t() {
                    a(this, t)
                }
                i(t, null, [{
                    key: "byteToHex",
                    value: function t(e) {
                        return ("0" + e.toString(16)).slice(-2)
                    }
                }, {
                    key: "bytesToHex",
                    value: function e(r) {
                        var n = [];
                        r.forEach(function(e) {
                            return n.push(t.byteToHex(e))
                        });
                        return n.join("")
                    }
                }, {
                    key: "hexToNumber",
                    value: function t(e) {
                        return parseInt(e, 16)
                    }
                }, {
                    key: "bytesToNumber",
                    value: function e(r) {
                        return t.hexToNumber(t.bytesToHex(r))
                    }
                }, {
                    key: "bytesToLetters",
                    value: function t(e) {
                        var r = [];
                        e.forEach(function(t) {
                            return r.push(String.fromCharCode(t))
                        });
                        return r.join("")
                    }
                }, {
                    key: "decToBinary",
                    value: function t(e) {
                        return (e >>> 0).toString(2)
                    }
                }, {
                    key: "readVarInt",
                    value: function t(e) {
                        var r = 0;
                        e.forEach(function(t) {
                            var e = t;
                            if (e & 128) {
                                r += e & 127;
                                r <<= 7
                            } else {
                                r += e
                            }
                        });
                        return r
                    }
                }, {
                    key: "atob",
                    value: function(t) {
                        function e(e) {
                            return t.apply(this, arguments)
                        }
                        e.toString = function() {
                            return t.toString()
                        };
                        return e
                    }(function(t) {
                        if (typeof atob === "function") return atob(t);
                        return new e(t, "base64").toString("binary")
                    })
                }]);
                return t
            }();
            r.Utils = u
        }).call(this, t("buffer").Buffer)
    }, {
        buffer: 2,
        fs: 1
    }]
}, {}, []);