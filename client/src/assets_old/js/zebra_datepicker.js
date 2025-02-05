! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function(a) {
    "use strict";
    a.Zebra_DatePicker = function(b, c) {
        var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q = {
                always_visible: !1,
                container: a("body"),
                custom_classes: !1,
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                days_abbr: !1,
                default_position: "above",
                direction: 0,
                disabled_dates: !1,
                enabled_dates: !1,
                first_day_of_week: 1,
                format: "m-d-Y",
                header_captions: {
                    days: "F, Y",
                    months: "Y",
                    years: "Y1 - Y2"
                },
                header_navigation: ["&#171;", "&#187;"],
                icon_position: "right",
                inside: !0,
                lang_clear_date: "Clear date",
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                months_abbr: !1,
                offset: [5, -5],
                open_icon_only: !1,
                pair: !1,
                readonly_element: !0,
                select_other_months: !1,
                show_clear_date: 0,
                show_icon: !0,
                show_other_months: !0,
                show_select_today: "Today",
                show_week_number: !1,
                start_date: !1,
                strict: !1,
                view: "days",
                weekend_days: [0, 6],
                zero_pad: !1,
                onChange: null,
                onClear: null,
                onOpen: null,
                onClose: null,
                onSelect: null
            },
            R = this;
        R.settings = {};
        var S = a(b),
            T = function(b) {
                if (N = Math.floor(65536 * (1 + Math.random())).toString(16), !b) {
                    R.settings = a.extend({}, Q, c);
                    for (var y in S.data()) 0 === y.indexOf("zdp_") && (y = y.replace(/^zdp\_/, ""), void 0 !== Q[y] && (R.settings[y] = "pair" == y ? a(S.data("zdp_" + y)) : S.data("zdp_" + y)))
                }
                R.settings.readonly_element && S.attr("readonly", "readonly");
                var E = {
                        days: ["d", "j", "D"],
                        months: ["F", "m", "M", "n", "t"],
                        years: ["o", "Y", "y"]
                    },
                    F = !1,
                    G = !1,
                    T = !1,
                    W = null;
                for (W in E) a.each(E[W], function(a, b) {
                    R.settings.format.indexOf(b) > -1 && ("days" == W ? F = !0 : "months" == W ? G = !0 : "years" == W && (T = !0))
                });
                H = F && G && T ? ["years", "months", "days"] : !F && G && T ? ["years", "months"] : F && G && !T ? ["months", "days"] : F || G || !T ? F || !G || T ? ["years", "months", "days"] : ["months"] : ["years"], -1 == a.inArray(R.settings.view, H) && (R.settings.view = H[H.length - 1]), x = [], w = [], O = {}, P = [];
                var X;
                for (var Y in R.settings.custom_classes) R.settings.custom_classes.hasOwnProperty(Y) && P.push(Y);
                for (var Z = 0; Z < 2 + P.length; Z++) X = 0 === Z ? R.settings.disabled_dates : 1 == Z ? R.settings.enabled_dates : R.settings.custom_classes[P[Z - 2]], a.isArray(X) && X.length > 0 && a.each(X, function() {
                    for (var b = this.split(" "), c = 0; 4 > c; c++) {
                        b[c] || (b[c] = "*"), b[c] = b[c].indexOf(",") > -1 ? b[c].split(",") : new Array(b[c]);
                        for (var d = 0; d < b[c].length; d++)
                            if (b[c][d].indexOf("-") > -1) {
                                var e = b[c][d].match(/^([0-9]+)\-([0-9]+)/);
                                if (null !== e) {
                                    for (var f = ia(e[1]); f <= ia(e[2]); f++) - 1 == a.inArray(f, b[c]) && b[c].push(f + "");
                                    b[c].splice(d, 1)
                                }
                            }
                        for (d = 0; d < b[c].length; d++) b[c][d] = isNaN(ia(b[c][d])) ? b[c][d] : ia(b[c][d])
                    }
                    0 === Z ? x.push(b) : 1 == Z ? w.push(b) : (void 0 === O[P[Z - 2]] && (O[P[Z - 2]] = []), O[P[Z - 2]].push(b))
                });
                var $, _, aa = new Date,
                    da = R.settings.reference_date ? R.settings.reference_date : S.data("zdp_reference_date") && void 0 !== S.data("zdp_reference_date") ? S.data("zdp_reference_date") : aa;
                if (z = void 0, A = void 0, o = da.getMonth(), l = aa.getMonth(), p = da.getFullYear(), m = aa.getFullYear(), q = da.getDate(), n = aa.getDate(), R.settings.direction === !0) z = da;
                else if (R.settings.direction === !1) A = da, D = A.getMonth(), C = A.getFullYear(), B = A.getDate();
                else if (!a.isArray(R.settings.direction) && ca(R.settings.direction) && ia(R.settings.direction) > 0 || a.isArray(R.settings.direction) && (($ = U(R.settings.direction[0])) || R.settings.direction[0] === !0 || ca(R.settings.direction[0]) && R.settings.direction[0] > 0) && ((_ = U(R.settings.direction[1])) || R.settings.direction[1] === !1 || ca(R.settings.direction[1]) && R.settings.direction[1] >= 0)) z = $ ? $ : new Date(p, o, q + ia(a.isArray(R.settings.direction) ? R.settings.direction[0] === !0 ? 0 : R.settings.direction[0] : R.settings.direction)), o = z.getMonth(), p = z.getFullYear(), q = z.getDate(), _ && +_ >= +z ? A = _ : !_ && R.settings.direction[1] !== !1 && a.isArray(R.settings.direction) && (A = new Date(p, o, q + ia(R.settings.direction[1]))), A && (D = A.getMonth(), C = A.getFullYear(), B = A.getDate());
                else if (!a.isArray(R.settings.direction) && ca(R.settings.direction) && ia(R.settings.direction) < 0 || a.isArray(R.settings.direction) && (R.settings.direction[0] === !1 || ca(R.settings.direction[0]) && R.settings.direction[0] < 0) && (($ = U(R.settings.direction[1])) || ca(R.settings.direction[1]) && R.settings.direction[1] >= 0)) A = new Date(p, o, q + ia(a.isArray(R.settings.direction) ? R.settings.direction[0] === !1 ? 0 : R.settings.direction[0] : R.settings.direction)), D = A.getMonth(), C = A.getFullYear(), B = A.getDate(), $ && +A > +$ ? z = $ : !$ && a.isArray(R.settings.direction) && (z = new Date(C, D, B - ia(R.settings.direction[1]))), z && (o = z.getMonth(), p = z.getFullYear(), q = z.getDate());
                else if (a.isArray(R.settings.disabled_dates) && R.settings.disabled_dates.length > 0)
                    for (var ga in x)
                        if ("*" == x[ga][0] && "*" == x[ga][1] && "*" == x[ga][2] && "*" == x[ga][3]) {
                            var ka = [];
                            if (a.each(w, function() {
                                    var a = this;
                                    "*" != a[2][0] && ka.push(parseInt(a[2][0] + ("*" == a[1][0] ? "12" : ha(a[1][0], 2)) + ("*" == a[0][0] ? "*" == a[1][0] ? "31" : new Date(a[2][0], a[1][0], 0).getDate() : ha(a[0][0], 2)), 10))
                                }), ka.sort(), ka.length > 0) {
                                var ma = (ka[0] + "").match(/([0-9]{4})([0-9]{2})([0-9]{2})/);
                                p = parseInt(ma[1], 10), o = parseInt(ma[2], 10) - 1, q = parseInt(ma[3], 10)
                            }
                            break
                        }
                if (ba(p, o, q)) {
                    for (; ba(p);) z ? (p++, o = 0) : (p--, o = 11);
                    for (; ba(p, o);) z ? (o++, q = 1) : (o--, q = new Date(p, o + 1, 0).getDate()), o > 11 ? (p++, o = 0, q = 1) : 0 > o && (p--, o = 11, q = new Date(p, o + 1, 0).getDate());
                    for (; ba(p, o, q);) z ? q++ : q--, aa = new Date(p, o, q), p = aa.getFullYear(), o = aa.getMonth(), q = aa.getDate();
                    aa = new Date(p, o, q), p = aa.getFullYear(), o = aa.getMonth(), q = aa.getDate()
                }
                var na = U(S.val() || (R.settings.start_date ? R.settings.start_date : ""));
                if (na && R.settings.strict && ba(na.getFullYear(), na.getMonth(), na.getDate()) && S.val(""), b || void 0 === z && void 0 === na || ja(void 0 !== na ? na : z), !R.settings.always_visible) {
                    if (!b) {
                        if (R.settings.show_icon) {
                            "firefox" == la.name && S.is('input[type="text"]') && "inline" == S.css("display") && S.css("display", "inline-block");
                            var oa = a('<span class="Zebra_DatePicker_Icon_Wrapper"></span>').css({
                                display: S.css("display"),
                                position: "static" == S.css("position") ? "relative" : S.css("position"),
                                "float": S.css("float"),
                                top: S.css("top"),
                                right: S.css("right"),
                                bottom: S.css("bottom"),
                                left: S.css("left")
                            });
							//S.outerWidth(!0)
                            "block" == S.css("display") && oa.css("width", '100%'), S.wrap(oa).css({
                                position: "relative",
                                top: "auto",
                                right: "auto",
                                bottom: "auto",
                                left: "auto"
                            }), f = a('<button type="button" class="Zebra_DatePicker_Icon' + ("disabled" == S.attr("disabled") ? " Zebra_DatePicker_Icon_Disabled" : "") + '">Pick a date</button>'), R.icon = f, I = R.settings.open_icon_only ? f : f.add(S)
                        } else I = S;
                        I.bind("click", function(a) {
                            a.preventDefault(), S.attr("disabled") || (e.hasClass("dp_visible") ? R.hide() : R.show())
                        }), !R.settings.readonly_element && R.settings.pair && S.bind("blur.Zebra_DatePicker_" + N, function() {
                            var b;
                            (b = U(a(this).val())) && !ba(b.getFullYear(), b.getMonth(), b.getDate()) && ja(b)
                        }), void 0 !== f && f.insertAfter(S)
                    }
                    if (void 0 !== f) {
                        f.attr("style", ""), R.settings.inside && f.addClass("Zebra_DatePicker_Icon_Inside_" + ("right" == R.settings.icon_position ? "Right" : "Left"));
                        var pa = S.outerWidth(),
                            qa = S.outerHeight(),
                            ra = parseInt(S.css("marginLeft"), 10) || 0,
                            sa = parseInt(S.css("marginTop"), 10) || 0,
                            ta = (f.outerWidth(), f.outerHeight()),
                            ua = parseInt(f.css("marginLeft"), 10) || 0;
                        parseInt(f.css("marginRight"), 10) || 0;
                        R.settings.inside ? (f.css("top", sa + (qa - ta) / 2), "right" == R.settings.icon_position ? f.css("right", 0) : f.css("left", 0)) : f.css({
                            top: sa + (qa - ta) / 2,
                            left: ra + pa + ua
                        }), f.removeClass(" Zebra_DatePicker_Icon_Disabled"), "disabled" == S.attr("disabled") && f.addClass("Zebra_DatePicker_Icon_Disabled")
                    }
                }
                if (L = R.settings.show_select_today !== !1 && a.inArray("days", H) > -1 && !ba(m, l, n) ? R.settings.show_select_today : !1, b) return a(".dp_previous", e).html(R.settings.header_navigation[0]), a(".dp_next", e).html(R.settings.header_navigation[1]), a(".dp_clear", e).html(R.settings.lang_clear_date), void a(".dp_today", e).html(R.settings.show_select_today);
                a(window).bind("resize.Zebra_DatePicker_" + N + ", orientationchange.Zebra_DatePicker_" + N, function() {
                    R.hide(), void 0 !== f && (clearTimeout(M), M = setTimeout(function() {
                        R.update()
                    }, 100))
                });
                var va = '<div class="Zebra_DatePicker"><table class="dp_header"><tr><td class="dp_previous">' + R.settings.header_navigation[0] + '</td><td class="dp_caption">&#032;</td><td class="dp_next">' + R.settings.header_navigation[1] + '</td></tr></table><table class="dp_daypicker"></table><table class="dp_monthpicker"></table><table class="dp_yearpicker"></table><table class="dp_footer"><tr><td class="dp_today"' + (R.settings.show_clear_date !== !1 ? ' style="width:50%"' : "") + ">" + L + '</td><td class="dp_clear"' + (L !== !1 ? ' style="width:50%"' : "") + ">" + R.settings.lang_clear_date + "</td></tr></table></div>";
                e = a(va), R.datepicker = e, g = a("table.dp_header", e), h = a("table.dp_daypicker", e), i = a("table.dp_monthpicker", e), j = a("table.dp_yearpicker", e), K = a("table.dp_footer", e), J = a("td.dp_today", K), k = a("td.dp_clear", K), R.settings.always_visible ? S.attr("disabled") || (R.settings.always_visible.append(e), R.show()) : R.settings.container.append(e), e.delegate("td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month, .dp_week_number)", "mouseover", function() {
                    a(this).addClass("dp_hover")
                }).delegate("td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month, .dp_week_number)", "mouseout", function() {
                    a(this).removeClass("dp_hover")
                }), V(a("td", g)), a(".dp_previous", g).bind("click", function() {
                    "months" == d ? s-- : "years" == d ? s -= 12 : --r < 0 && (r = 11, s--), ea()
                }), a(".dp_caption", g).bind("click", function() {
                    d = "days" == d ? a.inArray("months", H) > -1 ? "months" : a.inArray("years", H) > -1 ? "years" : "days" : "months" == d ? a.inArray("years", H) > -1 ? "years" : a.inArray("days", H) > -1 ? "days" : "months" : a.inArray("days", H) > -1 ? "days" : a.inArray("months", H) > -1 ? "months" : "years", ea()
                }), a(".dp_next", g).bind("click", function() {
                    "months" == d ? s++ : "years" == d ? s += 12 : 12 == ++r && (r = 0, s++), ea()
                }), h.delegate("td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month, .dp_week_number)", "click", function() {
                    R.settings.select_other_months && a(this).attr("class") && null !== (ma = a(this).attr("class").match(/date\_([0-9]{4})(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])/)) ? fa(ma[1], ma[2] - 1, ma[3], "days", a(this)) : fa(s, r, ia(a(this).html()), "days", a(this))
                }), i.delegate("td:not(.dp_disabled)", "click", function() {
                    var b = a(this).attr("class").match(/dp\_month\_([0-9]+)/);
                    r = ia(b[1]), -1 == a.inArray("days", H) ? fa(s, r, 1, "months", a(this)) : (d = "days", R.settings.always_visible && S.val(""), ea())
                }), j.delegate("td:not(.dp_disabled)", "click", function() {
                    s = ia(a(this).html()), -1 == a.inArray("months", H) ? fa(s, 1, 1, "years", a(this)) : (d = "months", R.settings.always_visible && S.val(""), ea())
                }), a(J).bind("click", function(b) {
                    b.preventDefault(), fa(m, l, n, "days", a(".dp_current", h)), R.settings.always_visible && R.show(), R.hide()
                }), a(k).bind("click", function(b) {
                    b.preventDefault(), S.val(""), R.settings.always_visible ? (t = null, u = null, v = null, a("td.dp_selected", e).removeClass("dp_selected")) : (t = null, u = null, v = null, r = null, s = null), R.hide(), R.settings.onClear && "function" == typeof R.settings.onClear && R.settings.onClear.call(S, S)
                }), R.settings.always_visible || (a(document).bind("mousedown.Zebra_DatePicker_" + N + ", touchstart.Zebra_DatePicker_" + N, function(b) {
                    if (e.hasClass("dp_visible")) {
                        if (R.settings.show_icon && a(b.target).get(0) === f.get(0)) return !0;
                        0 === a(b.target).parents().filter(".Zebra_DatePicker").length && R.hide()
                    }
                }), a(document).bind("keyup.Zebra_DatePicker_" + N, function(a) {
                    e.hasClass("dp_visible") && 27 == a.which && R.hide()
                })), ea()
            };
        R.clear_date = function() {
            a(k).trigger("click")
        }, R.destroy = function() {
            void 0 !== R.icon && R.icon.remove(), R.datepicker.remove(), a(document).unbind("keyup.Zebra_DatePicker_" + N), a(document).unbind("mousedown.Zebra_DatePicker_" + N), a(window).unbind("resize.Zebra_DatePicker_" + N), a(window).unbind("orientationchange.Zebra_DatePicker_" + N), S.removeData("Zebra_DatePicker")
        }, R.hide = function() {
            R.settings.always_visible || (aa("hide"), e.removeClass("dp_visible").addClass("dp_hidden"), R.settings.onClose && "function" == typeof R.settings.onClose && R.settings.onClose.call(S, S))
        }, R.set_date = function(a) {
            var b;
            (b = U(a)) && !ba(b.getFullYear(), b.getMonth(), b.getDate()) && (S.val(a), ja(a))
        }, R.show = function() {
            d = R.settings.view;
            var b = U(S.val() || (R.settings.start_date ? R.settings.start_date : ""));
            if (b ? (u = b.getMonth(), r = b.getMonth(), v = b.getFullYear(), s = b.getFullYear(), t = b.getDate(), ba(v, u, t) && (R.settings.strict && S.val(""), r = o, s = p)) : (r = o, s = p), ea(), R.settings.always_visible) e.removeClass("dp_hidden").addClass("dp_visible");
            else {
                if (R.settings.container.is("body")) {
                    var c = e.outerWidth(),
                        g = e.outerHeight(),
                        h = (void 0 !== f ? f.offset().left + f.outerWidth(!0) : S.offset().left + S.outerWidth(!0)) + R.settings.offset[0],
                        i = (void 0 !== f ? f.offset().top : S.offset().top) - g + R.settings.offset[1],
                        j = a(window).width(),
                        k = a(window).height(),
                        l = a(window).scrollTop(),
                        m = a(window).scrollLeft();
                    "below" == R.settings.default_position && (i = (void 0 !== f ? f.offset().top : S.offset().top) + R.settings.offset[1]), h + c > m + j && (h = m + j - c), m > h && (h = m), i + g > l + k && (i = l + k - g), l > i && (i = l), e.css({
                        left: h,
                        top: i
                    })
                } else e.css({
                    left: 0,
                    top: 0
                });
                e.removeClass("dp_hidden").addClass("dp_visible"), aa()
            }
            R.settings.onOpen && "function" == typeof R.settings.onOpen && R.settings.onOpen.call(S, S)
        }, R.update = function(b) {
            R.original_direction && (R.original_direction = R.direction), R.settings = a.extend(R.settings, b), T(!0)
        };
        var U = function(b) {
                if (b += "", "" !== a.trim(b)) {
                    for (var c = W(R.settings.format), d = ["d", "D", "j", "l", "N", "S", "w", "F", "m", "M", "n", "Y", "y"], e = [], f = [], g = null, h = null, i = 0; i < d.length; i++)(g = c.indexOf(d[i])) > -1 && e.push({
                        character: d[i],
                        position: g
                    });
                    if (e.sort(function(a, b) {
                            return a.position - b.position
                        }), a.each(e, function(a, b) {
                            switch (b.character) {
                                case "d":
                                    f.push("0[1-9]|[12][0-9]|3[01]");
                                    break;
                                case "D":
                                    f.push("[a-z]{3}");
                                    break;
                                case "j":
                                    f.push("[1-9]|[12][0-9]|3[01]");
                                    break;
                                case "l":
                                    f.push("[a-z]+");
                                    break;
                                case "N":
                                    f.push("[1-7]");
                                    break;
                                case "S":
                                    f.push("st|nd|rd|th");
                                    break;
                                case "w":
                                    f.push("[0-6]");
                                    break;
                                case "F":
                                    f.push("[a-z]+");
                                    break;
                                case "m":
                                    f.push("0[1-9]|1[012]+");
                                    break;
                                case "M":
                                    f.push("[a-z]{3}");
                                    break;
                                case "n":
                                    f.push("[1-9]|1[012]");
                                    break;
                                case "Y":
                                    f.push("[0-9]{4}");
                                    break;
                                case "y":
                                    f.push("[0-9]{2}")
                            }
                        }), f.length && (e.reverse(), a.each(e, function(a, b) {
                            c = c.replace(b.character, "(" + f[f.length - a - 1] + ")")
                        }), f = new RegExp("^" + c + "$", "ig"), h = f.exec(b))) {
                        var j, k = new Date,
                            l = 1,
                            m = k.getMonth() + 1,
                            n = k.getFullYear(),
                            o = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                            p = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                            q = !0;
                        if (e.reverse(), a.each(e, function(b, c) {
                                if (!q) return !0;
                                switch (c.character) {
                                    case "m":
                                    case "n":
                                        m = ia(h[b + 1]);
                                        break;
                                    case "d":
                                    case "j":
                                        l = ia(h[b + 1]);
                                        break;
                                    case "D":
                                    case "l":
                                    case "F":
                                    case "M":
                                        j = "D" == c.character || "l" == c.character ? R.settings.days : R.settings.months, q = !1, a.each(j, function(a, d) {
                                            if (q) return !0;
                                            if (h[b + 1].toLowerCase() == d.substring(0, "D" == c.character || "M" == c.character ? 3 : d.length).toLowerCase()) {
                                                switch (c.character) {
                                                    case "D":
                                                        h[b + 1] = o[a].substring(0, 3);
                                                        break;
                                                    case "l":
                                                        h[b + 1] = o[a];
                                                        break;
                                                    case "F":
                                                        h[b + 1] = p[a], m = a + 1;
                                                        break;
                                                    case "M":
                                                        h[b + 1] = p[a].substring(0, 3), m = a + 1
                                                }
                                                q = !0
                                            }
                                        });
                                        break;
                                    case "Y":
                                        n = ia(h[b + 1]);
                                        break;
                                    case "y":
                                        n = "19" + ia(h[b + 1])
                                }
                            }), q) {
                            var r = new Date(n, (m || 1) - 1, l || 1);
                            if (r.getFullYear() == n && r.getDate() == (l || 1) && r.getMonth() == (m || 1) - 1) return r
                        }
                    }
                    return !1
                }
            },
            V = function(a) {
                "firefox" == la.name ? a.css("MozUserSelect", "none") : "explorer" == la.name ? a.bind("selectstart", function() {
                    return !1
                }) : a.mousedown(function() {
                    return !1
                })
            },
            W = function(a) {
                return a.replace(/([-.,*+?^${}()|[\]\/\\])/g, "\\$1")
            },
            X = function(b) {
                for (var c = "", d = b.getDate(), e = b.getDay(), f = R.settings.days[e], g = b.getMonth() + 1, h = R.settings.months[g - 1], i = b.getFullYear() + "", j = 0; j < R.settings.format.length; j++) {
                    var k = R.settings.format.charAt(j);
                    switch (k) {
                        case "y":
                            i = i.substr(2);
                        case "Y":
                            c += i;
                            break;
                        case "m":
                            g = ha(g, 2);
                        case "n":
                            c += g;
                            break;
                        case "M":
                            h = a.isArray(R.settings.months_abbr) && void 0 !== R.settings.months_abbr[g - 1] ? R.settings.months_abbr[g - 1] : R.settings.months[g - 1].substr(0, 3);
                        case "F":
                            c += h;
                            break;
                        case "d":
                            d = ha(d, 2);
                        case "j":
                            c += d;
                            break;
                        case "D":
                            f = a.isArray(R.settings.days_abbr) && void 0 !== R.settings.days_abbr[e] ? R.settings.days_abbr[e] : R.settings.days[e].substr(0, 3);
                        case "l":
                            c += f;
                            break;
                        case "N":
                            e++;
                        case "w":
                            c += e;
                            break;
                        case "S":
                            c += d % 10 == 1 && "11" != d ? "st" : d % 10 == 2 && "12" != d ? "nd" : d % 10 == 3 && "13" != d ? "rd" : "th";
                            break;
                        default:
                            c += k
                    }
                }
                return c
            },
            Y = function() {
                var b = new Date(s, r + 1, 0).getDate(),
                    c = new Date(s, r, 1).getDay(),
                    d = new Date(s, r, 0).getDate(),
                    e = c - R.settings.first_day_of_week;
                e = 0 > e ? 7 + e : e, da(R.settings.header_captions.days);
                var f = "<tr>";
                R.settings.show_week_number && (f += "<th>" + R.settings.show_week_number + "</th>");
                for (var g = 0; 7 > g; g++) f += "<th>" + (a.isArray(R.settings.days_abbr) && void 0 !== R.settings.days_abbr[(R.settings.first_day_of_week + g) % 7] ? R.settings.days_abbr[(R.settings.first_day_of_week + g) % 7] : R.settings.days[(R.settings.first_day_of_week + g) % 7].substr(0, 2)) + "</th>";
                for (f += "</tr><tr>", g = 0; 42 > g; g++) {
                    g > 0 && g % 7 === 0 && (f += "</tr><tr>"), g % 7 === 0 && R.settings.show_week_number && (f += '<td class="dp_week_number">' + ka(new Date(s, r, g - e + 1)) + "</td>");
                    var i = g - e + 1;
                    if (R.settings.select_other_months && (e > g || i > b)) {
                        var j = new Date(s, r, i),
                            k = j.getFullYear(),
                            o = j.getMonth(),
                            p = j.getDate();
                        j = k + ha(o + 1, 2) + ha(p, 2)
                    }
                    if (e > g) f += '<td class="' + (R.settings.select_other_months && !ba(k, o, p) ? "dp_not_in_month_selectable date_" + j : "dp_not_in_month") + '">' + (R.settings.select_other_months || R.settings.show_other_months ? ha(d - e + g + 1, R.settings.zero_pad ? 2 : 0) : "&nbsp;") + "</td>";
                    else if (i > b) f += '<td class="' + (R.settings.select_other_months && !ba(k, o, p) ? "dp_not_in_month_selectable date_" + j : "dp_not_in_month") + '">' + (R.settings.select_other_months || R.settings.show_other_months ? ha(i - b, R.settings.zero_pad ? 2 : 0) : "&nbsp;") + "</td>";
                    else {
                        var q = (R.settings.first_day_of_week + g) % 7,
                            w = "",
                            x = _(s, r, i);
                        ba(s, r, i) ? (a.inArray(q, R.settings.weekend_days) > -1 ? w = "dp_weekend_disabled" : w += " dp_disabled", r == l && s == m && n == i && (w += " dp_disabled_current"), "" != x && (w += " " + x + "_disabled")) : (a.inArray(q, R.settings.weekend_days) > -1 && (w = "dp_weekend"), r == u && s == v && t == i && (w += " dp_selected"), r == l && s == m && n == i && (w += " dp_current"), "" != x && (w += " " + x)), f += "<td" + ("" !== w ? ' class="' + a.trim(w) + '"' : "") + ">" + ((R.settings.zero_pad ? ha(i, 2) : i) || "&nbsp;") + "</td>"
                    }
                }
                f += "</tr>", h.html(a(f)), R.settings.always_visible && (E = a("td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month, .dp_week_number)", h)), h.show()
            },
            Z = function() {
                da(R.settings.header_captions.months);
                for (var b = "<tr>", c = 0; 12 > c; c++) {
                    c > 0 && c % 3 === 0 && (b += "</tr><tr>");
                    var d = "dp_month_" + c;
                    ba(s, c) ? d += " dp_disabled" : u !== !1 && u == c && s == v ? d += " dp_selected" : l == c && m == s && (d += " dp_current"), b += '<td class="' + a.trim(d) + '">' + (a.isArray(R.settings.months_abbr) && void 0 !== R.settings.months_abbr[c] ? R.settings.months_abbr[c] : R.settings.months[c].substr(0, 3)) + "</td>"
                }
                b += "</tr>", i.html(a(b)), R.settings.always_visible && (F = a("td:not(.dp_disabled)", i)), i.show()
            },
            $ = function() {
                da(R.settings.header_captions.years);
                for (var b = "<tr>", c = 0; 12 > c; c++) {
                    c > 0 && c % 3 === 0 && (b += "</tr><tr>");
                    var d = "";
                    ba(s - 7 + c) ? d += " dp_disabled" : v && v == s - 7 + c ? d += " dp_selected" : m == s - 7 + c && (d += " dp_current"), b += "<td" + ("" !== a.trim(d) ? ' class="' + a.trim(d) + '"' : "") + ">" + (s - 7 + c) + "</td>"
                }
                b += "</tr>", j.html(a(b)), R.settings.always_visible && (G = a("td:not(.dp_disabled)", j)), j.show()
            },
            _ = function(b, c, d) {
                var e, f, g;
                "undefined" != typeof c && (c += 1);
                for (f in P)
                    if (e = P[f], g = !1, a.each(O[e], function() {
                            if (!g) {
                                var f = this;
                                if ((a.inArray(b, f[2]) > -1 || a.inArray("*", f[2]) > -1) && ("undefined" != typeof c && a.inArray(c, f[1]) > -1 || a.inArray("*", f[1]) > -1) && ("undefined" != typeof d && a.inArray(d, f[0]) > -1 || a.inArray("*", f[0]) > -1)) {
                                    if ("*" == f[3]) return g = e;
                                    var h = new Date(b, c - 1, d).getDay();
                                    if (a.inArray(h, f[3]) > -1) return g = e
                                }
                            }
                        }), g) return g;
                return g || ""
            },
            aa = function(b) {
                if ("explorer" == la.name && 6 == la.version) {
                    if (!y) {
                        var c = ia(e.css("zIndex")) - 1;
                        y = a("<iframe>", {
                            src: 'javascript:document.write("")',
                            scrolling: "no",
                            frameborder: 0,
                            css: {
                                zIndex: c,
                                position: "absolute",
                                top: -1e3,
                                left: -1e3,
                                width: e.outerWidth(),
                                height: e.outerHeight(),
                                filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=0)",
                                display: "none"
                            }
                        }), a("body").append(y)
                    }
                    switch (b) {
                        case "hide":
                            y.hide();
                            break;
                        default:
                            var d = e.offset();
                            y.css({
                                top: d.top,
                                left: d.left,
                                display: "block"
                            })
                    }
                }
            },
            ba = function(b, c, d) {
                if (!(void 0 !== b && !isNaN(b) || void 0 !== c && !isNaN(c) || void 0 !== d && !isNaN(d))) return !1;
                if (1e3 > b) return !0;
                if (a.isArray(R.settings.direction) || 0 !== ia(R.settings.direction)) {
                    var e = ia(ga(b, "undefined" != typeof c ? ha(c, 2) : "", "undefined" != typeof d ? ha(d, 2) : "")),
                        f = (e + "").length;
                    if (8 == f && ("undefined" != typeof z && e < ia(ga(p, ha(o, 2), ha(q, 2))) || "undefined" != typeof A && e > ia(ga(C, ha(D, 2), ha(B, 2))))) return !0;
                    if (6 == f && ("undefined" != typeof z && e < ia(ga(p, ha(o, 2))) || "undefined" != typeof A && e > ia(ga(C, ha(D, 2))))) return !0;
                    if (4 == f && ("undefined" != typeof z && p > e || "undefined" != typeof A && e > C)) return !0
                }
                "undefined" != typeof c && (c += 1);
                var g = !1,
                    h = !1;
                return a.isArray(x) && x.length && a.each(x, function() {
                    if (!g) {
                        var e = this;
                        if ((a.inArray(b, e[2]) > -1 || a.inArray("*", e[2]) > -1) && ("undefined" != typeof c && a.inArray(c, e[1]) > -1 || a.inArray("*", e[1]) > -1) && ("undefined" != typeof d && a.inArray(d, e[0]) > -1 || a.inArray("*", e[0]) > -1)) {
                            if ("*" == e[3]) return g = !0;
                            var f = new Date(b, c - 1, d).getDay();
                            if (a.inArray(f, e[3]) > -1) return g = !0
                        }
                    }
                }), w && a.each(w, function() {
                    if (!h) {
                        var e = this;
                        if ((a.inArray(b, e[2]) > -1 || a.inArray("*", e[2]) > -1) && (h = !0, "undefined" != typeof c))
                            if (h = !0, a.inArray(c, e[1]) > -1 || a.inArray("*", e[1]) > -1) {
                                if ("undefined" != typeof d)
                                    if (h = !0, a.inArray(d, e[0]) > -1 || a.inArray("*", e[0]) > -1) {
                                        if ("*" == e[3]) return h = !0;
                                        var f = new Date(b, c - 1, d).getDay();
                                        if (a.inArray(f, e[3]) > -1) return h = !0;
                                        h = !1
                                    } else h = !1
                            } else h = !1
                    }
                }), w && h ? !1 : x && g ? !0 : !1
            },
            ca = function(a) {
                return (a + "").match(/^\-?[0-9]+$/) ? !0 : !1
            },
            da = function(b) {
                !isNaN(parseFloat(r)) && isFinite(r) && (b = b.replace(/\bm\b|\bn\b|\bF\b|\bM\b/, function(b) {
                    switch (b) {
                        case "m":
                            return ha(r + 1, 2);
                        case "n":
                            return r + 1;
                        case "F":
                            return R.settings.months[r];
                        case "M":
                            return a.isArray(R.settings.months_abbr) && void 0 !== R.settings.months_abbr[r] ? R.settings.months_abbr[r] : R.settings.months[r].substr(0, 3);
                        default:
                            return b
                    }
                })), !isNaN(parseFloat(s)) && isFinite(s) && (b = b.replace(/\bY\b/, s).replace(/\by\b/, (s + "").substr(2)).replace(/\bY1\b/i, s - 7).replace(/\bY2\b/i, s + 4)), a(".dp_caption", g).html(b)
            },
            ea = function() {
                if ("" === h.text() || "days" == d) {
                    if ("" === h.text()) {
                        R.settings.always_visible || e.css("left", -1e3), e.css("visibility", "visible"), Y();
                        var b = h.outerWidth(),
                            c = h.outerHeight();
                        i.css({
                            width: b,
                            height: c
                        }), j.css({
                            width: b,
                            height: c
                        }), g.css("width", b), K.css("width", b), e.css("visibility", "").addClass("dp_hidden")
                    } else Y();
                    i.hide(), j.hide()
                } else "months" == d ? (Z(), h.hide(), j.hide()) : "years" == d && ($(), h.hide(), i.hide());
                if (R.settings.onChange && "function" == typeof R.settings.onChange && void 0 !== d) {
                    var f = "days" == d ? h.find("td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month)") : "months" == d ? i.find("td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month)") : j.find("td:not(.dp_disabled, .dp_weekend_disabled, .dp_not_in_month)");
                    f.each(function() {
                        var b;
                        "days" == d ? a(this).hasClass("dp_not_in_month_selectable") ? (b = a(this).attr("class").match(/date\_([0-9]{4})(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])/), a(this).data("date", b[1] + "-" + b[2] + "-" + b[3])) : a(this).data("date", s + "-" + ha(r + 1, 2) + "-" + ha(ia(a(this).text()), 2)) : "months" == d ? (b = a(this).attr("class").match(/dp\_month\_([0-9]+)/), a(this).data("date", s + "-" + ha(ia(b[1]) + 1, 2))) : a(this).data("date", ia(a(this).text()))
                    }), R.settings.onChange.call(S, d, f, S)
                }
                K.show(), R.settings.show_clear_date === !0 || 0 === R.settings.show_clear_date && "" !== S.val() || R.settings.always_visible && R.settings.show_clear_date !== !1 ? (k.show(), L ? (J.css("width", "50%"), k.css("width", "50%")) : (J.hide(), k.css("width", "100%"))) : (k.hide(), L ? J.show().css("width", "100%") : K.hide())
            },
            fa = function(a, b, c, d, e) {
                var f = new Date(a, b, c, 12, 0, 0),
                    g = "days" == d ? E : "months" == d ? F : G,
                    h = X(f);
                S.val(h), R.settings.always_visible && (u = f.getMonth(), r = f.getMonth(), v = f.getFullYear(), s = f.getFullYear(), t = f.getDate(), g.removeClass("dp_selected"), e.addClass("dp_selected"), "days" == d && e.hasClass("dp_not_in_month_selectable") && R.show()), R.hide(), ja(f), R.settings.onSelect && "function" == typeof R.settings.onSelect && R.settings.onSelect.call(S, h, a + "-" + ha(b + 1, 2) + "-" + ha(c, 2), f, S, ka(f)), S.focus()
            },
            ga = function() {
                for (var a = "", b = 0; b < arguments.length; b++) a += arguments[b] + "";
                return a
            },
            ha = function(a, b) {
                for (a += ""; a.length < b;) a = "0" + a;
                return a
            },
            ia = function(a) {
                return parseInt(a, 10)
            },
            ja = function(b) {
                R.settings.pair && a.each(R.settings.pair, function() {
                    var c = a(this);
                    if (c.data && c.data("Zebra_DatePicker")) {
                        var d = c.data("Zebra_DatePicker");
                        d.update({
                            reference_date: b,
                            direction: 0 === d.settings.direction ? 1 : d.settings.direction
                        }), d.settings.always_visible && d.show()
                    } else c.data("zdp_reference_date", b)
                })
            },
            ka = function(a) {
                var b, c, d, e, f, g, h, i, j, k = a.getFullYear(),
                    l = a.getMonth() + 1,
                    m = a.getDate();
                return 3 > l ? (b = k - 1, c = (b / 4 | 0) - (b / 100 | 0) + (b / 400 | 0), d = ((b - 1) / 4 | 0) - ((b - 1) / 100 | 0) + ((b - 1) / 400 | 0), e = c - d, f = 0, g = m - 1 + 31 * (l - 1)) : (b = k, c = (b / 4 | 0) - (b / 100 | 0) + (b / 400 | 0), d = ((b - 1) / 4 | 0) - ((b - 1) / 100 | 0) + ((b - 1) / 400 | 0), e = c - d, f = e + 1, g = m + ((153 * (l - 3) + 2) / 5 | 0) + 58 + e), h = (b + c) % 7, m = (g + h - f) % 7, i = g + 3 - m, j = 0 > i ? 53 - ((h - e) / 5 | 0) : i > 364 + e ? 1 : (i / 7 | 0) + 1
            },
            la = {
                init: function() {
                    this.name = this.searchString(this.dataBrowser) || "", this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || ""
                },
                searchString: function(a) {
                    for (var b = 0; b < a.length; b++) {
                        var c = a[b].string,
                            d = a[b].prop;
                        if (this.versionSearchString = a[b].versionSearch || a[b].identity, c) {
                            if (-1 != c.indexOf(a[b].subString)) return a[b].identity
                        } else if (d) return a[b].identity
                    }
                },
                searchVersion: function(a) {
                    var b = a.indexOf(this.versionSearchString);
                    if (-1 != b) return parseFloat(a.substring(b + this.versionSearchString.length + 1))
                },
                dataBrowser: [{
                    string: navigator.userAgent,
                    subString: "Firefox",
                    identity: "firefox"
                }, {
                    string: navigator.userAgent,
                    subString: "MSIE",
                    identity: "explorer",
                    versionSearch: "MSIE"
                }]
            };
        la.init(), T()
    }, a.fn.Zebra_DatePicker = function(b) {
        return this.each(function() {
            void 0 !== a(this).data("Zebra_DatePicker") && a(this).data("Zebra_DatePicker").destroy();
            var c = new a.Zebra_DatePicker(this, b);
            a(this).data("Zebra_DatePicker", c)
        })
    }
});