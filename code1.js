import {
    V as b
} from "./vue.af9652fd.js";
import {
    e as d
} from "./element-ui.51aa7cd1.js";
(function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const a of document.querySelectorAll('link[rel="modulepreload"]')) n(a);
    new MutationObserver(a => {
        for (const s of a)
            if (s.type === "childList")
                for (const u of s.addedNodes) u.tagName === "LINK" && u.rel === "modulepreload" && n(u)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function o(a) {
        const s = {};
        return a.integrity && (s.integrity = a.integrity), a.referrerpolicy && (s.referrerPolicy = a.referrerpolicy), a.crossorigin === "use-credentials" ? s.credentials = "include" : a.crossorigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s
    }

    function n(a) {
        if (a.ep) return;
        a.ep = !0;
        const s = o(a);
        fetch(a.href, s)
    }
})();

function v(t, e, o) {
    Object.defineProperty(t, e, {
        writable: !0,
        enumerable: !0,
        configurable: !0,
        value: o
    })
}

function L(t, e, o, n) {
    n ? n(() => {
        v(t, e, o)
    }) : v(t, e, o)
}
Array(32);
class C {
    constructor(e) {
        this.timer = null, this.time = 10, this.count = 10, this.arr = [];
        var o, n;
        this.time = (o = e.time) != null ? o : 10, this.count = (n = e.count) != null ? n : 10, e.host.startsWith("http://") || e.host.startsWith("https://") ? this.url = e.host + "/logstores/" + e.logstore + "/track" : this.url = "https://" + e.project + "." + e.host + "/logstores/" + e.logstore + "/track", this.opt = e, e.installUnloadHook && typeof e.installUnloadHook == "function" && e.installUnloadHook(() => {
            this.sendImmediateInner()
        })
    }
    assemblePayload(e = this.arr) {
        const o = {
            __logs__: e
        };
        return this.opt.tags && (o.__tags__ = this.opt.tags), this.opt.topic && (o.__topic__ = this.opt.topic), this.opt.source && (o.__source__ = this.opt.source), JSON.stringify(o)
    }
    platformSend() {
        if (this.opt.sendPayload && typeof this.opt.sendPayload == "function") {
            const e = this.assemblePayload();
            this.opt.sendPayload(this.url, e)
        }
    }
    transString(e) {
        let o = {};
        for (let n in e) typeof e[n] == "object" ? o[n] = JSON.stringify(e[n]) : o[n] = String(e[n]);
        return o
    }
    sendImmediateInner() {
        this.arr && this.arr.length > 0 && (this.platformSend(), this.timer != null && (clearTimeout(this.timer), this.timer = null), this.arr = [])
    }
    sendInner() {
        if (this.timer) this.arr.length >= this.count && (clearTimeout(this.timer), this.timer = null, this.sendImmediateInner());
        else {
            const e = this;
            this.arr.length >= this.count || this.time <= 0 ? this.sendImmediateInner() : this.timer = setTimeout(function() {
                e.sendImmediateInner()
            }, this.time * 1e3)
        }
    }
    send(e) {
        const o = this.transString(e);
        this.arr.push(o), this.sendInner()
    }
    sendImmediate(e) {
        const o = this.transString(e);
        this.arr.push(o), this.sendImmediateInner()
    }
    sendBatchLogs(e) {
        const o = e.map(n => this.transString(n));
        this.arr.push(...o), this.sendInner()
    }
    sendBatchLogsImmediate(e) {
        const o = e.map(n => this.transString(n));
        this.arr.push(...o), this.sendImmediateInner()
    }
}

function U(t, e) {
    return navigator && navigator.sendBeacon ? navigator.sendBeacon(`${t}?APIVersion=0.6.0`, e) : !1
}

function w(t, e) {
    const o = new window.XMLHttpRequest;
    o.open("POST", `${t}?APIVersion=0.6.0`, !0), o.send(e)
}

function I(t, e) {
    try {
        if (e.length >= 32768) {
            w(t, e);
            return
        }
        U(t, e) || w(t, e)
    } catch (o) {
        window && window.console && typeof window.console.error == "function" && (console.error(`Failed to log to ali log service because of this exception:
` + o), console.error("Failed log data:", t))
    }
}
class D extends C {
    constructor(e) {
        const o = Object.assign({}, e, {
            installUnloadHook: n => {
                window.addEventListener("beforeunload", () => {
                    n()
                })
            },
            sendPayload: (n, a) => {
                I(n, a)
            }
        });
        super(o)
    }
}
L(window, "SLS_Tracker", D);
let p;
const O = new Uint8Array(16);

function M() {
    if (!p && (p = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !p)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    return p(O)
}
const i = [];
for (let t = 0; t < 256; ++t) i.push((t + 256).toString(16).slice(1));

function N(t, e = 0) {
    return (i[t[e + 0]] + i[t[e + 1]] + i[t[e + 2]] + i[t[e + 3]] + "-" + i[t[e + 4]] + i[t[e + 5]] + "-" + i[t[e + 6]] + i[t[e + 7]] + "-" + i[t[e + 8]] + i[t[e + 9]] + "-" + i[t[e + 10]] + i[t[e + 11]] + i[t[e + 12]] + i[t[e + 13]] + i[t[e + 14]] + i[t[e + 15]]).toLowerCase()
}
const R = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto),
    y = {
        randomUUID: R
    };

function A(t, e, o) {
    if (y.randomUUID && !e && !t) return y.randomUUID();
    t = t || {};
    const n = t.random || (t.rng || M)();
    if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, e) {
        o = o || 0;
        for (let a = 0; a < 16; ++a) e[o + a] = n[a];
        return e
    }
    return N(n)
}
let _ = null;
const P = "us-west-1.log.aliyuncs.com",
    F = "nc-dn-us";
let m, $ = "prod";
switch ($) {
    case "prod":
        m = "denote";
        break;
    case "dev":
        m = "dev-denote";
        break;
    case "staging":
        m = "dev-denote";
        break;
    default:
        m = "dev-denote";
        break
}
const H = {
    host: P,
    project: F,
    logstore: m,
    time: 3,
    count: 1
};

function V() {
    const e = new Date().getTimezoneOffset(),
        o = new Date().getTime();
    return `${new Date(o+e*60*1e3+8*60*60*1e3).getTime()}`.slice(0, -3)
}

function j() {
    return _ === null && (_ = new D(H)), _
}
async function B() {
    let t = localStorage.getItem("anonymous_user_id");
    t || (t = A(), localStorage.setItem("anonymous_user_id", t));
    const e = V();
    return {
        anonymous_user_id: t || "",
        user_id: 0,
        user_agent: navigator.userAgent,
        accept_language: navigator.language,
        type: "user_behavior",
        log_time: e,
        created_at: e
    }
}
async function h(t) {
    const e = await B();
    j().send(Object.assign(e, t))
}

function T(t, e, o, n, a, s, u, S) {
    var r = typeof t == "function" ? t.options : t;
    e && (r.render = e, r.staticRenderFns = o, r._compiled = !0), n && (r.functional = !0), s && (r._scopeId = "data-v-" + s);
    var c;
    if (u ? (c = function(l) {
            l = l || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !l && typeof __VUE_SSR_CONTEXT__ < "u" && (l = __VUE_SSR_CONTEXT__), a && a.call(this, l), l && l._registeredComponents && l._registeredComponents.add(u)
        }, r._ssrRegister = c) : a && (c = S ? function() {
            a.call(this, (r.functional ? this.parent : this).$root.$options.shadowRoot)
        } : a), c)
        if (r.functional) {
            r._injectStyles = c;
            var x = r.render;
            r.render = function(k, g) {
                return c.call(g), x(k, g)
            }
        } else {
            var f = r.beforeCreate;
            r.beforeCreate = f ? [].concat(f, c) : [c]
        } return {
        exports: t,
        options: r
    }
}
const E = {
    name: "TikTokAdsDownloader",
    components: {
        [d.exports.Input.name]: d.exports.Input,
        [d.exports.Button.name]: d.exports.Button,
        [d.exports.Message.name]: d.exports.Message
    },
    data() {
        return {
            downloadUrl: "",
            downloadStatus: {
                status: "generating",
                loading: !1
            },
            downloadLocalLoading: !1,
            videoLoading: !0,
            downloadData: {}
        }
    },
    methods: {
        pasteContent() {
            let t = this;
            h({
                action_id: "ttcc_video_paste_url"
            }), navigator.clipboard ? navigator.clipboard.readText().then(function(e) {
                t.downloadUrl = e
            }).catch(function(e) {
                d.exports.Message.warning("Unable to read clipboard contents, please enter video URL.")
            }) : d.exports.Message.warning("Unable to read clipboard contents, please enter video URL.")
        },
        getVideoData() {
            let t = this;
            h({
                action_id: "ttcc_video_get_video_detail",
                custom: {
                    video_url: t.downloadUrl
                }
            }), t.downloadStatus.loading = !0;
            let e = new Headers;
            e.append("Content-Type", "application/x-www-form-urlencoded");
            let o = new URLSearchParams;
            o.append("video_url", t.downloadUrl), fetch("https://denote.net/api/v1/download-ttad", {
                method: "POST",
                headers: e,
                body: o,
                redirect: "follow"
            }).then(a => a.json()).then(a => {
                a.code === 1e5 ? (t.downloadData = a.data, t.downloadData.data.video_info.play = t.convertToHttps(t.downloadData.data.video_info.play), t.downloadData.data.video_info.cover = t.convertToHttps(t.downloadData.data.video_info.cover)) : d.exports.Message.error(a.message), t.downloadStatus.loading = !1
            }).catch(a => {
                t.downloadStatus.loading = !1, d.exports.Message.error(a)
            })
        },
        saveToDenote() {
            h({
                action_id: "ttcc_video_save_denote",
                custom: {
                    video_url: this.downloadUrl
                }
            }), window.open("/user/register?utm_source=ttcc_video_downloader")
        },
        downloadLocal() {
            let t = this;
            h({
                action_id: "ttcc_video_download_local",
                custom: {
                    video_url: t.downloadUrl
                }
            }), t.downloadLocalLoading = !0;
            let e = this.downloadData.data.video_info.play,
                o = t.convertToHttps(e);
            try {
                fetch(o).then(n => n.blob()).then(n => {
                    const a = document.createElement("a"),
                        s = window.URL.createObjectURL(n);
                    a.href = s, a.download = t.downloadData.data.vid + ".mp4", document.body.appendChild(a), a.click(), document.body.removeChild(a), window.URL.revokeObjectURL(s), t.downloadLocalLoading = !1
                }).catch(n => {
                    t.downloadLocalLoading = !1
                })
            } catch {
                window.open(o), t.downloadLocalLoading = !1
            }
        },
        convertToHttps(t) {
            return t.startsWith("http://") ? "https://" + t.substring(7) : t.startsWith("https://") ? t : "https://" + t
        }
    }
};
var W = function() {
        var e = this,
            o = e._self._c;
        return o("div", {
            staticClass: "nc-container"
        }, [o("div", {
            staticStyle: {
                display: "flex"
            }
        }, [o("el-input", {
            attrs: {
                placeholder: "https://ads.tiktok.com/business/creativecenter/topads/xxxxxxxxxx/pc/en"
            },
            model: {
                value: e.downloadUrl,
                callback: function(n) {
                    e.downloadUrl = n
                },
                expression: "downloadUrl"
            }
        }), o("el-button", {
            staticClass: "nc-submit-btn",
            attrs: {
                loading: e.downloadStatus.loading
            },
            on: {
                click: e.getVideoData
            }
        }, [e._v(" Remove Watermark ")])], 1), e.downloadData.code === 0 ? o("div", {
            staticClass: "nc-ad"
        }, [o("div", {
            staticClass: "nc-ad-video",
            staticStyle: {
                "max-width": "250px"
            }
        }, [o("video", {
            staticClass: "video",
            staticStyle: {
                width: "100%",
                height: "auto"
            },
            attrs: {
                poster: e.downloadData.data.video_info.cover,
                preload: "none",
                controls: "controls"
            }
        }, [o("source", {
            attrs: {
                src: e.downloadData.data.video_info.play,
                type: "video/mp4"
            }
        })])]), o("div", {
            staticClass: "nc-ad-details"
        }, [o("div", {
            staticStyle: {
                overflow: "auto"
            }
        }, [e._m(0), o("div", [o("div", {
            staticClass: "nc-span-title"
        }, [e._v(" Ad caption ")]), o("div", {
            staticClass: "nc-span-title-text"
        }, [e._v(" " + e._s(e.downloadData.data.title) + " ")])]), o("div", [o("div", {
            staticClass: "nc-span-title"
        }, [e._v(" Keyword insights ")]), o("div", e._l(e.downloadData.data.keyword_list, function(n) {
            return o("span", {
                staticClass: "nc-span-title-text"
            }, [e._v(" " + e._s(n) + ", ")])
        }), 0)])]), o("div", {
            staticClass: "nc-ad-details-btn"
        }, [o("el-button", {
            staticClass: "nc-btn-save",
            attrs: {
                icon: "el-icon-upload"
            },
            on: {
                click: e.saveToDenote
            }
        }, [e._v(" Save to Denote ")]), o("el-button", {
            staticClass: "nc-bth-download",
            attrs: {
                loading: e.downloadLocalLoading,
                icon: "el-icon-download"
            },
            on: {
                click: e.downloadLocal
            }
        }, [e._v(" Download to Local ")])], 1)])]) : e._e()])
    },
    J = [function() {
        var t = this,
            e = t._self._c;
        return e("div", {
            staticClass: "nc-div-title"
        }, [e("i", {
            staticClass: "el-icon-s-data"
        }), t._v(" AD Details ")])
    }],
    q = T(E, W, J, !1, null, "af830aed", null, null);
const z = q.exports;
const K = {
    name: "App",
    components: {
        TikTokAdsDownloader: z
    },
    data() {
        return {}
    },
    methods: {},
    created() {},
    mounted() {}
};
var Y = function() {
        var e = this,
            o = e._self._c;
        return o("div", {
            attrs: {
                id: "app"
            }
        }, [o("div", {
            staticClass: "grid-content"
        }, [o("TikTokAdsDownloader")], 1)])
    },
    G = [],
    X = T(K, Y, G, !1, null, "b834ae01", null, null);
const Z = X.exports;
var Q = {
    el: {
        colorpicker: {
            confirm: "OK",
            clear: "Clear"
        },
        datepicker: {
            now: "Now",
            today: "Today",
            cancel: "Cancel",
            clear: "Clear",
            confirm: "OK",
            selectDate: "Select date",
            selectTime: "Select time",
            startDate: "Start Date",
            startTime: "Start Time",
            endDate: "End Date",
            endTime: "End Time",
            prevYear: "Previous Year",
            nextYear: "Next Year",
            prevMonth: "Previous Month",
            nextMonth: "Next Month",
            year: "",
            month1: "January",
            month2: "February",
            month3: "March",
            month4: "April",
            month5: "May",
            month6: "June",
            month7: "July",
            month8: "August",
            month9: "September",
            month10: "October",
            month11: "November",
            month12: "December",
            week: "week",
            weeks: {
                sun: "Sun",
                mon: "Mon",
                tue: "Tue",
                wed: "Wed",
                thu: "Thu",
                fri: "Fri",
                sat: "Sat"
            },
            months: {
                jan: "Jan",
                feb: "Feb",
                mar: "Mar",
                apr: "Apr",
                may: "May",
                jun: "Jun",
                jul: "Jul",
                aug: "Aug",
                sep: "Sep",
                oct: "Oct",
                nov: "Nov",
                dec: "Dec"
            }
        },
        select: {
            loading: "Loading",
            noMatch: "No matching data",
            noData: "No data",
            placeholder: "Select"
        },
        cascader: {
            noMatch: "No matching data",
            loading: "Loading",
            placeholder: "Select",
            noData: "No data"
        },
        pagination: {
            goto: "Go to",
            pagesize: "/page",
            total: "Total {total}",
            pageClassifier: ""
        },
        messagebox: {
            title: "Message",
            confirm: "OK",
            cancel: "Cancel",
            error: "Illegal input"
        },
        upload: {
            deleteTip: "press delete to remove",
            delete: "Delete",
            preview: "Preview",
            continue: "Continue"
        },
        table: {
            emptyText: "No Data",
            confirmFilter: "Confirm",
            resetFilter: "Reset",
            clearFilter: "All",
            sumText: "Sum"
        },
        tree: {
            emptyText: "No Data"
        },
        transfer: {
            noMatch: "No matching data",
            noData: "No data",
            titles: ["List 1", "List 2"],
            filterPlaceholder: "Enter keyword",
            noCheckedFormat: "{total} items",
            hasCheckedFormat: "{checked}/{total} checked"
        },
        image: {
            error: "FAILED"
        },
        pageHeader: {
            title: "Back"
        },
        popconfirm: {
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        },
        empty: {
            description: "No Data"
        }
    }
};
b.use(Q);
new b({
    render: t => t(Z)
}).$mount("#app");