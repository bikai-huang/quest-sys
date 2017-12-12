var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s; (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
$_js = function(a) {
    return (typeof(a) == "object" ? a: document.getElementById(a));
};
$$ = function(a, c) {
    if (c) {
        var b = c.getElementsByTagName(a);
        if (!b || b.length == 0) {
            b = new Array();
            getbyTagName(c, a, b);
            return b;
        }
        return b;
    } else {
        return document.getElementsByTagName(a);
    }
};
String.prototype.dbc2sbc = function() {
    return this.replace(/[\uff01-\uff5e]/g,
    function(b) {
        return String.fromCharCode(b.charCodeAt(0) - 65248);
    }).replace(/\u3000/g, " ");
};
$ce = function(c, d, a) {
    var b = document.createElement(c);
    if (d) {
        b.innerHTML = d;
    }
    a.appendChild(b);
    return b;
};
var spanCode = $_js("spanCode");
var toolTipLayer = $_js("toolTipLayer");
var divChangeQ = $_js("divChangeQ");
var isEnglish = false;
var prevChoiceD = 0;
var choiceStartWithNumber = false;
var bodyWidth = document.documentElement.clientWidth || document.body.clientWidth;
function getbyTagName(b, c, e) {
    var d;
    for (var a = 0; a < b.childNodes.length; a++) {
        d = b.childNodes[a];
        if (d.tagName === c) {
            e.push(d);
        }
        if (d.childNodes.length > 0 && d.nodeType == 1) {
            getbyTagName(d, c, e);
        }
    }
}
function StringBuilder() {
    this._stringArray = new Array();
}
StringBuilder.prototype.append = function(a) {
    this._stringArray.push(a);
};
StringBuilder.prototype.toString = function(a) {
    a = a || "";
    return this._stringArray.join(a);
};
StringBuilder.prototype.clear = function() {
    this._stringArray.length = 0;
};
function cancelInputClick(e) {
    var f = e.div_question_preview;
    var b = $$("input", f);
    for (var d = 0; d < b.length; d++) {
        b[d].onclick = function() {
            if (this.checked) {
                this.checked = false;
                return false;
            }
        };
        b[d].onkeydown = function() {
            this.value = "";
            return false;
        };
    }
    var a = $$("textarea", f);
    for (var d = 0; d < a.length; d++) {
        a[d].onclick = function() {
            return false;
        };
        a[d].onchange = function() {
            this.value = "";
        };
        a[d].onkeydown = function() {
            this.value = "";
            return false;
        };
    }
    var c = $$("select", f);
    for (var d = 0; d < c.length; d++) {
        c[d].onchange = function() {
            this.selectedIndex = 0;
            return false;
        };
    }
}
function replace_specialChar(a) {
    return a.replace(/(§)/g, "ξ").replace(/(¤)/g, "○").replace(/(〒)/g, "╤");
}
function getCoords(a) {
    var d = a.getBoundingClientRect(),
    j = a.ownerDocument,
    f = j.body,
    e = j.documentElement,
    c = e.clientTop || f.clientTop || 0,
    g = e.clientLeft || f.clientLeft || 0,
    h = d.top + (self.pageYOffset || e.scrollTop || f.scrollTop) - c,
    b = d.left + (self.pageXOffset || e.scrollLeft || f.scrollLeft) - g;
    return {
        top: h,
        left: b
    };
}
function sb_setmenuq(b, c, f, e) {
    var k = $_js(b);
    if (c) {
        k.style.display = "block";
        if (k.timeArray) {
            window.clearTimeout(k.timeArray);
            k.timeArray = 0;
        }
        if (!k.onmouseover) {
            k.onmouseover = function() {
                sb_setmenuq(b, true);
            };
            k.onmouseout = function() {
                sb_setmenuq(b, false);
            };
        }
        if (f) {
            var a = document.getElementById("main-wrapper");
            var g = getCoords(a);
            var j = f;
            if (j.parentNode.tagName.toLowerCase() == "li") {
                j = f.parentNode;
            }
            var n = getCoords(j);
            var l = n.left;
            var h = n.top - g.top + j.offsetHeight - 1;
            var m = document.documentElement.clientHeight || document.body.clientHeight;
            if (l + k.offsetWidth > bodyWidth) {
                l = bodyWidth - k.offsetWidth - 30;
            }
            if (h + k.offsetHeight > m) {}
            k.style.left = l + "px";
            k.style.top = h + "px";
        }
    }
    if (!c) {
        k.timeArray = window.setTimeout(function() {
            k.style.display = "none";
            k.style.height = "";
        },
        100);
    }
}
function control_textarea(c, b) {
    var a = document.createElement("textarea");
    a.wrap = "soft";
    a.rows = c;
    a.style.width = b * 10 + "px";
    a.style.height = c * 18 + "px";
    a.className = "inputtext";
    return a;
}
var curdiv = null;
function divQuestionMouseOver() {
    if (curdiv == this) {
        return;
    }
    if (curdiv != null) {
        curdiv.style.background = "";
        var b = curdiv.div_ins_question;
        if (b) {
            b.style.display = "none";
        }
    }
    curdiv = this;
    this.style.background = "#F7F8F9";
    var c = this.dataNode;
    if (c._type == "question" || c._type == "radio" || c._type == "check" || c._type == "matrix" || c._type == "cut" || c._type == "page") {
        var d = this.div_ins_question;
        //d.innerHTML = "<div style='text-align:right;padding-right:20px;'><a href='javascript:void(0);' class='link-UF30' onmouseover='displayChangeQ(this);' onmouseout='hideChangeQ();'>转换题型</a>&nbsp;&nbsp;<a target='_blank' href='/help/help.aspx?helpid=138' class='link-U00a6e6'>查看题型说明</a></div>";
        d.style.display = "";
    }
    if (!isNotClick) {
        var e = c._startLine;
        var a = e * 30;
        txtContent.scrollTop = a;
    }
}
function divQuestionMouseOut() {}
function divQuestionClick() {}
function displayChangeQ(d) {
    var b = curdiv.dataNode;
    var e = b._startLine - 1;
    var a = "<a href='javascript:void(0);' onclick='changeQ(this," + e + ");'>";
    var c = "<div style='padding:5px;line-height:20px;'>";
    if (b._type == "question") {
        c += a + "[段落说明]</a><br/>";
        c += a + "[分页栏]</a>";
    } else {
        if (b._type == "page") {
            c += a + "[段落说明]</a><br/>";
            c += a + "[问答题]</a>";
        } else {
            if (b._type == "cut") {
                c += a + "[问答题]</a><br/>";
                c += a + "[单选题]</a><br/>";
                c += a + "[分页栏]</a>";
            } else {
                if (b._type == "radio") {
                    c += a + "[多选题]</a><br/>";
                    c += a + "[矩阵题]</a><br/>";
                    c += a + "[表格题]</a><br/>";
                    c += a + "[排序题]</a><br/>";
                    c += a + "[比重题]</a>";
                } else {
                    if (b._type == "check") {
                        c += a + "[单选题]</a><br/>";
                        c += a + "[矩阵题]</a><br/>";
                        c += a + "[表格题]</a><br/>";
                        if (!b._tag) {
                            c += a + "[排序题]</a><br/>";
                        } else {
                            c += a + "[多选题]</a><br/>";
                        }
                        c += a + "[比重题]</a>";
                    } else {
                        if (b._type == "matrix") {
                            c += a + "[单选题]</a><br/>";
                            c += a + "[多选题]</a><br/>";
                        }
                    }
                }
            }
        }
    }
    c += "</div>";
    toolTipLayer.innerHTML = c;
    toolTipLayer.divQuestion = curdiv;
    sb_setmenuq(toolTipLayer, true, d);
}
function hideChangeQ() {
    sb_setmenuq(toolTipLayer, false);
}
function changeQ(d, e) {
    var b = txtContent.value.split("\n");
    var a = "";
    for (var c = 0; c < b.length; c++) {
        if (c == e) {
            a += trim(ProcessTitle(b[c])) + trim(d.innerHTML) + "\n";
        } else {
            a += b[c] + "\n";
        }
    }
    txtContent.value = a;
    sb_setmenuq(toolTipLayer, false);
    generateQs(txtContent.value);
    setPosByLine(e);
}
var MatrixType = "[矩阵题]";
var LikertMatrixType = "[矩阵量表题]";
var RevLikertMatrixType = "[矩阵反向量表题]";
var TableType = "[表格题]";
var SumType = "[比重题]";
var SortType = "[排序题]";
var LikertType = "[量表题]";
var ReverseLikertType = "[反向量表题]";
var LabelItem = "[标签]";
var DesignLabelItem = "【标签】";
var CutType = "[段落说明]";
var PageType = "[分页栏]";
var AllQType = "[题目]";
var CheckQType = "[多选题]";
var RadioQType = "[单选题]";
var GapFillType = "[问答题]";
var GapFillTest = "[测试填空题]";
var CeShiQType = "[测试题]";
var CeShiQCheckType = "[测试多选题]";
var CeShiJianDaType = "[测试简答题]";
var label = "";
var qType = "";
var designversion = "7";
var isCompact = false;
var GenerateType = 1;
var qIndex = 1;
var itemValue = 0;
var needExcute = false;
var prevDigit = -1;
var prevMatrixDigit = -1;
var numPerNow = 1;
var isNotClick = false;
var total_page = 0;
var divSurvey = $_js("sur");
var questions = $_js("question");
var firstPage = null;
var questionHolder = null;
var cur = null;
var tempDataNode = null;
var _title = $_js("pater_title");
var _desc = $_js("pater_desc");
var curPos = 0;
var lineCharCount = 2;
var lineIndex = 0;
var lines = null;
var cutStartIndex = 0;
var cutEndIndex = 0;
var pageStartIndex = 0;
var pageEndIndex = 0;
var descStartIndex = -1;
var descEndIndex = -1;
var lastCaretPos = 0;
var isCompleteLoad = true;
var isMergeAnswer = false;
var total_question = 0;
var WjxActivity = new Object();
WjxActivity._use_self_topic = true;
var GapFillStr = "___";
var GapWidth = 21;
var GapFillReplace = "<input style='width:" + GapWidth + "px;' />";
var curChar = 0;
var titleProcessed = false;
var isDigitBig = false;
var firstQuestion = null;
function addQType(e) {
    var h = txtContent.value.length;
    var d = getCaret(txtContent);
    if (d == h) {
        show_status_tip("请先将光标移动到要插入的位置");
        return;
    }
    var f = trim(e.innerHTML);
    var a = getPosLine();
    if (lines[a]) {
        var g = lines[a];
        g = g.replace(MatrixType, "").replace("[矩阵单选题]", "").replace(LikertMatrixType, "").replace(RevLikertMatrixType, "").replace(SortType, "").replace(SumType, "").replace(TableType, "").replace(CutType, "").replace(LikertType, "").replace(ReverseLikertType, "").replace(PageType, "").replace(CheckQType, "").replace(RadioQType, "").replace(CeShiQType, "").replace(CeShiQCheckType, "").replace(GapFillType, "");
        var c = "";
        for (var b = 0; b < lines.length; b++) {
            if (b != a) {
                c += lines[b];
                if (b < lines.length - 1) {
                    c += "\n";
                }
            } else {
                c += g.replace("\r", "") + f + "\n";
            }
        }
        txtContent.value = c;
    } else {
        insertAtCursor(txtContent, f);
    }
    txtContent.onchange();
    setPosByLine(a);
}
function trim(a) {
    if (a && a.replace) {
        return a.replace(/(^[\s\u3000]*)|([\s\u3000]*$)/g, "");
    } else {
        return a;
    }
}
function toInt(a) {
    return parseInt(trim(a));
}
function isEmpty(a) {
    return trim(a) == "";
}
function isInt(a) {
    var b = /^-?[0-9]+$/;
    return b.test(a);
}
String.prototype.contains = function(a) {
    return this.indexOf(a) != -1;
};
String.prototype.endWith = function(a) {
    if (a == null || a == "" || this.length == 0 || a.length > this.length) {
        return false;
    }
    if (this.substring(this.length - a.length) == a) {
        return true;
    } else {
        return false;
    }
    return true;
};
String.prototype.startWith = function(a) {
    if (a == null || a == "" || this.length == 0 || a.length > this.length) {
        return false;
    }
    if (this.substr(0, a.length) == a) {
        return true;
    } else {
        return false;
    }
    return true;
};
function getPosLine() {
    var d = getCaret(txtContent);
    if (d == 0) {
        d = lastCaretPos;
    }
    var a = 0;
    var c = 0;
    for (var b = 0; b < lines.length; b++) {
        c += lines[b].length + 1;
        if (d < c) {
            a = b;
            break;
        }
    }
    lastCaretPos = d;
    return a;
}
function setPos() {
    var a = getPosLine();
    setPosByLine(a);
}
var prevSelQ = null;
function setPosByLine(a) {
    if (a == 0) {
        divSurvey.scrollTop = 0;
        return;
    }
    var d = null;
    for (var b = 0; b < questionHolder.length; b++) {
        var e = questionHolder[b].dataNode._startLine - 1;
        var c = questionHolder[b].dataNode._endLine - 1;
        if (a >= e) {
            d = questionHolder[b];
            if (a <= c) {
                break;
            }
        }
    }
    if (d) {
        for (var b = 0; b < questionHolder.length; b++) {
            questionHolder[b].style.background = "#fff";
        }
        divSurvey.scrollTop = txtContent.scrollTop + "px";
        if (prevSelQ) {
            prevSelQ.style.background = "#fff";
        }
        d.scrollIntoView();
        d.style.background = "#e5f5ff";
        prevSelQ = d;
    }
}
txtContent.onclick = setPos;
var hasExpanded = false;
function expandTxt() {
    var a = document.getElementById("divAddTxt");
    a.style.display = "";
    divSurvey.style.height = "400px";
    divSurvey.style.overflow = "auto";
    divSurvey.style.overflowX = "hidden";
    hasExpanded = true;
}
function clearTxt() {
    if (confirm("确认清空文本框内容吗？")) {
        txtContent.value = "";
    }
}
function changeTxt() {
    var b = document.getElementById("divAddTxt");
    b.style.display = "";
    var a = document.getElementById("divPreview");
    a.style.display = "none";
    b.scrollIntoView(true);
}
function previewQs() {
    if (!txtContent.value) {
        lblMsg.innerHTML = "请复制问卷文本到文本框！";
        return;
    }
    var b = document.getElementById("divId");
    b.style.display = "";
    generateQs(txtContent.value);
    if (questionHolder.length == 0) {
        PDF_launch("divDesignError", 560, 200);
        return;
    }
    var d = document.getElementById("divPreview");
    d.style.display = "";
    var a = document.getElementById("pater_title");
    divSurvey.style.height = "";
    divSurvey.style.overflow = "";
    var c = document.getElementById("paperbutton");
    c.style.display = "";
}
txtContent.onkeyup = txtContent.onchange = function() {
    if (hasExpanded) {
        generateQs(this.value);
        setPos();
    }
};
chkRequire.onclick = cbkChoiceRequire.onclick = function() {
    txtContent.onchange();
};
RegExp.prototype.execAll = function(b) {
    var a = null;
    var d = new Array();
    while (a = this.exec(b)) {
        var c = [];
        for (i in a) {
            if (parseInt(i) == i) {
                c.push(a[i]);
            }
        }
        d.push(c);
    }
    return d;
};
function processKaoShiAnswer(a, m, e, c) {
    var t = new Object();
    var p = /^(\d+)[\.、．]/;
    for (var o = 0; o < e.length; o++) {
        var y = e[o];
        if (!y._isCeShi) {
            continue;
        }
        var z = y._title;
        var x = z.match(p);
        if (x && x[1]) {
            t[x[1]] = y;
        }
    }
    if (c == 2) {
        for (var o = m; o < a.length; o++) {
            var d = a[o];
            var u = /(\d+)[\s\.、：．:]*([A-Z]+)/g.execAll(d);
            for (var n = 0; n < u.length; n++) {
                var g = u[n];
                var h = g[1];
                var k = g[2];
                if (t[h]) {
                    var l = t[h];
                    processAnswer(l, false, k);
                }
            }
        }
    } else {
        for (var o = m; o < a.length; o++) {
            var d = a[o];
            var b = d.match(/^(\d+).*(答案[：:])\s*([A-Z]+)\s*/);
            if (b && b[3]) {
                var h = b[1];
                if (t[h]) {
                    var l = t[h];
                    processAnswer(l, false, b[3]);
                    var w = /^答?案?\s*解析[\:：\s]/;
                    if (a[o + 1]) {
                        var f = trim(a[o + 1]);
                        if (f.match(w)) {
                            var v = "";
                            for (var n = o + 1; n < a.length; n++) {
                                var q = a[n];
                                if (q.match(/^(\d+).*(答案[：:])\s*([A-Z]+)\s*/)) {
                                    break;
                                }
                                if (v) {
                                    v += "<br/>";
                                }
                                v += trim(q);
                            }
                            l._ceshiDesc = v.replace(w, "");
                        }
                    }
                }
            }
        }
    }
    for (var o = 0; o < e.length; o++) {
        createQ(e[o]);
    }
}
function generateQs(C) {
    if (questionHolder) {
        for (var R = 0; R < questionHolder.length; R++) {
            questionHolder[R].dataNode = null;
            questions.removeChild(questionHolder[R]);
        }
        total_page = 0;
        if (firstPage) {
            questions.removeChild(firstPage);
        }
        firstPage = null;
    }
    questionHolder = new Array();
    C = replace_specialChar(C);
    lines = C.split("\n");
    var ah = lines.length;
    var p;
    var h = false;
    var G = "";
    var l = "";
    var ag = "";
    for (lineIndex = 0; lineIndex < ah; lineIndex++) {
        p = lines[lineIndex];
        var O = lines[lineIndex + 1];
        var ak = /^\s*([A-Za-z])[^A-Za-z0-9]/;
        var aE = true;
        if (IsBlank(p) && IsBlank(O)) {
            continue;
        }
        if (IsBlank(p) && O) {
            var au = "";
            var v = O.match(ak);
            if (v) {
                au = v[1];
            }
            if (v && ag) {
                v = ag.match(ak);
                if (v) {
                    G = v[1];
                }
            }
            if ((au == "A" || au == "a") && G == "") {
                aE = false;
                G = au;
                h = true;
            } else {
                if (G && au && au.charCodeAt(0) == G.charCodeAt(0) + 1) {
                    aE = false;
                    G = au;
                    h = true;
                }
            }
        }
        if (!IsBlank(p)) {
            ag = p;
        }
        if (aE) {
            l += p + "\n";
        }
    }
    if (h) {
        txtContent.value = C = l;
        lines = C.split("\n");
        ah = lines.length;
    }
    var r = "";
    var z = "";
    var B = "";
    var an = "";
    var aq = true;
    var aA = "";
    var M = false;
    var aD = true;
    var az = false;
    var P = false;
    qType = "question";
    isDigitBig = false;
    var k = /^\s*([一二三四五六七八九十][\.。、\x20\t．:：]|[（(][一二三四五六七八九十][)）]|第[一二三四五六七八九十])/g;
    var b = 0;
    titleProcessed = false;
    firstQuestion = null;
    lineIndex = 0;
    curChar = 0;
    for (lineIndex = 0; lineIndex < ah; lineIndex++) {
        p = lines[lineIndex];
        if (k.exec(p)) {
            b++;
        }
        if (b > 5) {
            isDigitBig = true;
            break;
        }
    }
    choiceStartWithNumber = false;
    prevChoiceD = 0;
    isCompact = false;
    if (GenerateType == 1) {
        var aa = false;
        var Z = false;
        for (lineIndex = 0; lineIndex < ah; lineIndex++) {
            p = lines[lineIndex];
            if (IsBlank(p)) {
                continue;
            }
            if (StartWithDigit(p)) {
                isCompact = true;
                break;
            }
            if (StartWithQType(p)) {
                isCompact = true;
                break;
            }
            if (aq) {
                r = p;
                aq = false;
            } else {
                if (!aa || !Z) {
                    if (p.contains(CutType) || IsCut(p)) {
                        aa = true;
                        Z = false;
                        cutStartIndex = lineIndex + 1;
                    } else {
                        if (p.contains(PageType)) {
                            Z = true;
                            aa = false;
                            pageStartIndex = lineIndex;
                        } else {
                            if (descStartIndex == -1) {
                                descStartIndex = lineIndex;
                            }
                        }
                    }
                }
                if (aa) {
                    B += p + "<br/>";
                    cutEndIndex = lineIndex + 1;
                } else {
                    if (Z) {
                        an += p + "<br/>";
                        pageEndIndex = lineIndex + 1;
                    } else {
                        z += p + "<br/>";
                        descEndIndex = lineIndex;
                    }
                }
            }
        }
    }
    aq = true;
    if (isCompact) {
        if (isEmpty(r)) {
        	   r = localStorage.getItem('paper-title');
            //r = "请输入您的标题";
        }
        aq = false;
        AddTitle(r);
        tempDataNode = AddPage("");
        firstPage = createQ(tempDataNode);
        if (!isEmpty(B)) {
            tempDataNode = AddCut(B);
            createQ(tempDataNode);
        }
        if (!isEmpty(an)) {
            tempDataNode = AddPage(an);
            createQ(tempDataNode);
        }
        AddDesc(z);
    } else {
        z = "";
        for (lineIndex = 0; lineIndex < ah; lineIndex++) {
            p = lines[lineIndex];
            if (!IsBlank(p)) {
                if (aq) {
                    r = p;
                    AddTitle(r);
                    tempDataNode = AddPage("");
                    firstPage = createQ(tempDataNode);
                    aq = false;
                } else {
                    break;
                }
            }
        }
    }
    try {
        var E = false;
        if (isKaoShi && window.cbAnswer && cbAnswer.checked) {
            E = true;
        }
        if (E) {
            var x = 0;
            for (var R = 0; R < lines.length; R++) {
                var w = lines[R].match(/^\d+.*(答案[：:])\s*([A-Z]+)\s*/);
                if (w && w[2]) {
                    break;
                }
            }
        }
        var af = new Array();
        while (true) {
            if (lineIndex >= ah) {
                break;
            }
            p = trim(lines[lineIndex]);
            if (E) {
                var w = p.match(/^\d+.*(答案[：:])\s*([A-Z]+)\s*/);
                if (w && w[2]) {
                    processKaoShiAnswer(lines, lineIndex, af);
                    break;
                } else {
                    if (p.contains("答案:") || p.contains("答案：")) {
                        processKaoShiAnswer(lines, lineIndex, af, 2);
                        break;
                    }
                }
            }
            if (!titleProcessed) {
                if (!IsBlank(p)) {
                    aA = p;
                    qType = "question";
                    M = false;
                    P = false;
                    if (aA.contains(MatrixType) || aA.contains(LikertMatrixType) || aA.contains(RevLikertMatrixType) || aA.contains("[矩阵单选题]")) {
                        aD = true;
                        qType = "matrix";
                    } else {
                        if (aA.contains(TableType)) {
                            aD = true;
                            az = true;
                            qType = "matrix";
                        } else {
                            if (aA.contains(SumType)) {
                                qType = "sum";
                            } else {
                                if (aA.contains(SortType)) {
                                    qType = "sort";
                                } else {
                                    if (aA.contains(LikertType) || aA.contains(ReverseLikertType)) {
                                        qType = "likert";
                                    } else {
                                        if (aA.contains(CheckQType) || aA.contains(CeShiQCheckType)) {
                                            qType = "check";
                                        } else {
                                            if (aA.contains(RadioQType) || aA.contains(CeShiQType)) {
                                                qType = "radio";
                                            } else {
                                                if (aA.contains(PageType)) {
                                                    qType = "page";
                                                    pageStartIndex = lineIndex + 1;
                                                } else {
                                                    if (aA.contains(GapFillType) || aA.contains(GapFillTest)) {
                                                        qType = "question";
                                                    } else {
                                                        if (aA.contains(CutType) || (isCompact && IsCut(aA))) {
                                                            qType = "cut";
                                                            cutStartIndex = lineIndex + 1;
                                                        } else {
                                                            if (!StartWithDigit(aA)) {
                                                                var K = false;
                                                                for (var ac = lineIndex + 1; ac < ah; ac++) {
                                                                    var ay = lines[ac];
                                                                    if (StartWithDigit(ay)) {
                                                                        K = true;
                                                                        break;
                                                                    }
                                                                }
                                                                if (!K) {
                                                                    qType = "cut";
                                                                    cutStartIndex = lineIndex + 1;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    titleProcessed = true;
                }
                lineIndex++;
            }
            if (titleProcessed) {
                var n = lineIndex;
                var aB = 0;
                var J = false;
                var ax = true;
                var at = false;
                B = "";
                var y = aA.contains(GapFillType) || aA.contains(GapFillTest);
                if (!y) {
                    for (; n < ah; n++) {
                        var ae = lines[n];
                        if (isCompact) {
                            prevIsNewQ = false;
                            if (IsBlank(ae)) {
                                choiceStartWithNumber = false;
                                break;
                            } else {
                                if (StartWithQType(ae)) {
                                    prevDigit = GetStartDigit(ae);
                                    choiceStartWithNumber = false;
                                    break;
                                } else {
                                    if (StartWithDigit(ae)) {
                                        choiceStartWithNumber = false;
                                        break;
                                    }
                                }
                            }
                            aB++;
                        } else {
                            if (IsBlank(ae)) {
                                break;
                            }
                            aB++;
                        }
                    }
                }
                for (; lineIndex < n; lineIndex++) {
                    var ae = trim(lines[lineIndex]);
                    if (qType == "cut" || qType == "page") {
                        B += lines[lineIndex];
                        if (lineIndex < n - 1) {
                            B += "<br/>";
                        }
                        cutEndIndex = lineIndex + 1;
                        pageEndIndex = lineIndex + 1;
                    } else {
                        if (!IsBlank(ae)) {
                            J = true;
                            if (qType == "matrix") {
                                if (aD) {
                                    var al = "103";
                                    if (az) {
                                        al = "303";
                                        itemValue = 0;
                                    }
                                    tempDataNode = AddMatrixTitle(aA, qIndex, al);
                                    qIndex++;
                                    var aw = ae.split(/(\x20|\t)+/ig);
                                    for (var Q = 0; Q < aw.length; Q++) {
                                        if (!isEmpty(trim(aw[Q]))) {
                                            itemValue++;
                                        }
                                        AddSelectItem(tempDataNode, aw[Q]);
                                    }
                                    if (az) {
                                        for (var av = 1; av < tempDataNode._select.length; av++) {
                                            tempDataNode._select[av]._item_value = av;
                                        }
                                    }
                                    aD = false;
                                } else {
                                    if (az) {
                                        var aw = ae.split(/(\x20|\t)+/ig);
                                        for (var Q = 0; Q < aw.length; Q++) {
                                            AddColumn(tempDataNode, aw[Q]);
                                        }
                                        az = false;
                                    } else {
                                        if (ae.startWith(LabelItem)) {
                                            label = ae.substr(4);
                                        } else {
                                            AddMatrixLine(tempDataNode, ae);
                                        }
                                    }
                                }
                            } else {
                                if (qType == "sum") {
                                    if (!P) {
                                        tempDataNode = AddSumTitle(aA, qIndex);
                                        qIndex++;
                                        P = true;
                                    }
                                    if (P) {
                                        if (ae.startWith(LabelItem)) {
                                            label = ae.substr(4);
                                        } else {
                                            AddMatrixLine(tempDataNode, ae);
                                        }
                                    }
                                } else {
                                    if (qType != "sort" && qType != "likert" && qType != "check" && qType != "radio") {
                                        qType = "radio";
                                        if (isCheck(aA)) {
                                            qType = "check";
                                        }
                                    }
                                    var c = false;
                                    if (!M) {
                                        c = false;
                                        if (!c) {
                                            var at = ContainsAB(ae, lines, lineIndex, n);
                                            if (at && !isKaoShi) {
                                                var q = ae.toUpperCase();
                                                for (curChar = 65; curChar < 90; curChar++) {
                                                    var X = String.fromCharCode(curChar);
                                                    var am = String.fromCharCode(curChar + 1);
                                                    var L = q.indexOf(X);
                                                    var F = q.indexOf(am);
                                                    if (L > -1 && F > -1) {
                                                        numPerNow++;
                                                    } else {
                                                        break;
                                                    }
                                                }
                                            } else {
                                                if (aB == 1 && isCompact && !isEnglish && !isKaoShi) {
                                                    var ar = /□|○|①|②|③|④|⑤|⑥|⑦|⑧/ig;
                                                    var aw = ae.split(ar);
                                                    if (aw.length >= 3) {
                                                        numPerNow = aw.length - 1;
                                                    } else {
                                                        var aw = ae.split(/(\d\d?\.|\d\d?、|\(\d\d?\)|（\d\d?）)/ig);
                                                        if (aw.length < 4) {
                                                            aw = ae.split(/(\x20|\t)+/ig);
                                                        }
                                                        if (aw.length < 3) {
                                                            if (aA.contains(RadioQType) || aA.contains(CeShiQType) || aA.contains(CeShiQCheckType)) {
                                                                numPerNow = 6;
                                                            } else {
                                                                qType = "question";
                                                                J = false;
                                                                break;
                                                            }
                                                        } else {
                                                            numPerNow = (aw.length + 1) / 2;
                                                        }
                                                    }
                                                }
                                            }
                                            tempDataNode = AddSelectTitle(aA, qIndex, qType);
                                        }
                                        itemValue = 0;
                                        qIndex++;
                                        M = true;
                                    }
                                    if (M && !c) {
                                        if (ae.startWith(LabelItem)) {
                                            label = ae.substr(4);
                                        } else {
                                            if (qType == "radio" || qType == "likert") {
                                                itemValue++;
                                            }
                                            var aw = null;
                                            var u = false;
                                            if (isCompact) {
                                                if (ax) {
                                                    at = ContainsAB(ae, lines, lineIndex, n);
                                                    ax = false;
                                                    curChar = 65;
                                                }
                                                if (at) {
                                                    var q = ae.toUpperCase();
                                                    var N = null;
                                                    if (isKaoShi) {
                                                        N = q.match(/[A-Z]{2,}/ig);
                                                    } else {
                                                        N = q.match(/[A-Z][A-Z0-9\-]{1,}/ig);
                                                    }
                                                    if (N) {
                                                        for (var aC = 0; aC < N.length; aC++) {
                                                            var W = N[aC].length;
                                                            var S = "";
                                                            for (var ab = 0; ab < W; ab++) {
                                                                S += "*";
                                                            }
                                                            q = q.replace(N[aC], S);
                                                        }
                                                    }
                                                    var d = "";
                                                    var m = 0;
                                                    for (; curChar < 90; curChar++) {
                                                        var X = String.fromCharCode(curChar);
                                                        var am = String.fromCharCode(curChar + 1);
                                                        var D = String.fromCharCode(curChar - 1);
                                                        var L = q.indexOf(X);
                                                        var F = q.indexOf(am);
                                                        var f = q.indexOf(D);
                                                        var H = q.indexOf("其它");
                                                        if (H == -1) {
                                                            H = q.indexOf("其他");
                                                        }
                                                        if (F == -1) {
                                                            am = String.fromCharCode(curChar + 2);
                                                            F = q.indexOf(am);
                                                            if (F > -1) {
                                                                curChar++;
                                                            }
                                                        }
                                                        if (L > -1 && F > -1) {
                                                            d = ae.substring(L, F);
                                                            AddSelectItem(tempDataNode, d);
                                                        } else {
                                                            if (L > -1) {
                                                                d = ae.substring(L);
                                                                AddSelectItem(tempDataNode, d);
                                                            } else {
                                                                if (H > -1 && f == -1) {
                                                                    d = ae.substring(H);
                                                                    AddSelectItem(tempDataNode, d);
                                                                    break;
                                                                } else {
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (isKaoShi && !d) {
                                                        var w = ae.match(/(答案[：:])\s*([A-Z]+)\s*/);
                                                        if (w && w[2]) {
                                                            AddSelectItem(tempDataNode, ae);
                                                        } else {
                                                            var ad = trim(ae).match(/^答?案?\s*解析[\:：\s]/);
                                                            if (ad) {
                                                                AddSelectItem(tempDataNode, ae);
                                                            }
                                                        }
                                                    }
                                                    u = true;
                                                } else {
                                                    if (!isEnglish && !isKaoShi) {
                                                        var ar = /(□|○|①|②|③|④|⑤|⑥|⑦|⑧)/ig;
                                                        aw = ae.split(ar);
                                                        var g = false;
                                                        var t = 1;
                                                        if (aw.length < 4) {
                                                            aw = ae.split(/(\d\d?\.|\d\d?、|\(\d\d?\)|（\d\d?）)/ig);
                                                            if (aw.length < 4) {
                                                                aw = ae.split(/(\x20|\t)+/ig);
                                                                g = true;
                                                                t = 0;
                                                            }
                                                        }
                                                        if (aw.length > 1) {
                                                            u = true;
                                                            for (var Q = t; Q < aw.length; Q++) {
                                                                if (g) {
                                                                    AddSelectItem(tempDataNode, aw[Q]);
                                                                } else {
                                                                    AddSelectItem(tempDataNode, aw[Q] + aw[Q + 1]);
                                                                    Q++;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            if (!u) {
                                                AddSelectItem(tempDataNode, ae);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (J) {
                    tempDataNode._endLine = lineIndex;
                    if (aA.contains(LikertType) || aA.contains(ReverseLikertType) || aA.contains(LikertMatrixType) || aA.contains(RevLikertMatrixType)) {
                        var aj = aA.contains(RevLikertMatrixType) || aA.contains(ReverseLikertType);
                        var ao = 1;
                        if (aj) {
                            ao = tempDataNode._select.length - 1;
                        }
                        for (var av = 1; av < tempDataNode._select.length; av++) {
                            tempDataNode._select[av]._item_value = ao;
                            if (aj) {
                                ao--;
                            } else {
                                ao++;
                            }
                        }
                    } else {
                        if (aA.contains(CeShiQType) || aA.contains(CeShiQCheckType) || isKaoShi) {
                            tempDataNode._hasvalue = true;
                            tempDataNode._isCeShi = true;
                            tempDataNode._ceshiDesc = "";
                            tempDataNode._ceshiValue = 5;
                            var Y = /\,\s*\[\s*(\d+)秒\]\s*$/;
                            var ap = tempDataNode._title.match(Y);
                            if (ap && ap[1]) {
                                tempDataNode._title = tempDataNode._title.replace(Y, "");
                            }
                            var T = /[\(（\[]?\s*(\d+)分[\)）\]]?\s*$/;
                            ap = tempDataNode._title.match(T);
                            if (ap && ap[1]) {
                                tempDataNode._ceshiValue = parseInt(ap[1]) || 5;
                                tempDataNode._title = tempDataNode._title.replace(T, "");
                            }
                            var I = 0;
                            var U = 0;
                            var o = 0;
                            for (var av = 1; av < tempDataNode._select.length; av++) {
                                var A = trim(tempDataNode._select[av]._item_title);
                                if (!A.match(/^[A-Z]/)) {
                                    U = av;
                                } else {
                                    if (o == 0) {
                                        o = av;
                                    }
                                    I++;
                                }
                            }
                            if (U > 0 && o - U == 1 && I >= 2) {
                                var ai = "";
                                for (var av = 1; av < U; av++) {
                                    ai += "<br/>" + tempDataNode._select[av]._item_title;
                                }
                                tempDataNode._title = tempDataNode._title + ai;
                                tempDataNode._select.splice(1, U);
                            }
                            if (!E) {
                                processAnswer(tempDataNode, true);
                            }
                        }
                    }
                    if (tempDataNode._select && tempDataNode._numperrow >= tempDataNode._select.length) {
                        tempDataNode._numperrow = tempDataNode._select.length - 1;
                    }
                    if (E) {
                        af.push(tempDataNode);
                    } else {
                        createQ(tempDataNode);
                    }
                    tempDataNode = null;
                } else {
                    if (qType == "cut" || qType == "page") {
                        if (!isEmpty(B)) {
                            B = aA + "<br/>" + B;
                        } else {
                            B = aA;
                        }
                        if (qType == "cut") {
                            tempDataNode = AddCut(B);
                        } else {
                            tempDataNode = AddPage(B);
                        }
                        createQ(tempDataNode);
                    } else {
                        if (ProcessTitleItems(aA)) {
                            tempDataNode._endLine = lineIndex;
                            createQ(tempDataNode);
                            qIndex++;
                            tempDataNode = null;
                        } else {
                            if (qType == "question") {
                                if (aB == 1) {
                                    for (; lineIndex < n; lineIndex++) {
                                        var ae = lines[lineIndex];
                                        if (!IsBlank(ae)) {
                                            aA += ae;
                                        }
                                    }
                                }
                                tempDataNode = AddQuestion(aA, qIndex);
                                createQ(tempDataNode);
                                qIndex++;
                            }
                        }
                    }
                }
                titleProcessed = false;
            }
        }
    } catch(V) {
        lblMsg.focus();
        lblMsg.innerHTML = "问卷格式不对，<a target='_blank' href='/help/help.aspx?helpid=138&h=1'>查看示例文本</a>";
        if (isKaoShi) {
            lblMsg.innerHTML = "问卷格式不对，<a target='_blank' href='/help/help.aspx?helpid=252&h=1'>查看示例文本</a>";
        }
        return;
    }
}
function processAnswer(h, t, m) {
    var a = false;
    var n = /[\(（]\s*(答案[：:])?\s*([A-K、]+)\s*[\)）]/;
    var l = h._title.match(n);
    if (!m && l && l[2]) {
        m = l[2];
    }
    var j = false;
    var e = h._select.length;
    if (m) {
        var q = m.replace(/、/g, "");
        for (var r = 1; r < e; r++) {
            var c = trim(h._select[r]._item_title);
            for (var o = 0; o < q.length; o++) {
                if (c.startWith(q[o])) {
                    h._select[r]._item_radio = true;
                    a = true;
                    j = true;
                    break;
                }
            }
        }
        if (!a && q.length == 1 && (q[0] == "B" || q[0] == "A") && h._select.length == 3) {
            a = true;
            var g = 1;
            j = true;
            if (q[0] == "B") {
                g = 2;
            }
            h._select[g]._item_radio = true;
        }
        if (q.length > 1) {
            h._type = "check";
        }
    } else {
        var f = 0;
        for (var r = 1; r < h._select.length; r++) {
            var c = trim(h._select[r]._item_title);
            c = c.replace("○", "");
            h._select[r]._item_title = c;
            if (c.contains("（正确答案）") || c.contains("(正确答案)")) {
                h._select[r]._item_radio = true;
                f++;
                h._select[r]._item_title = c.replace("（正确答案）", "").replace("(正确答案)", "");
                a = true;
            }
        }
        if (f > 1 && h._type == "radio") {
            h._type = "check";
        }
    }
    if (!t) {
        if (!a) {
            h._select[1]._item_radio = true;
        }
        return;
    }
    if (e > 2) {
        var u = /^答?案?\s*解析[\:：\s]/;
        var k = trim(h._select[e - 1]._item_title);
        var p = h._select[e - 2]._item_title;
        var b = false;
        if (c.match(u)) {
            h._ceshiDesc = k.replace(u, "");
            h._select.pop();
            b = true;
        }
        var d = /(答案[：:])\s*([A-Z]+)\s*/;
        var l = null;
        if (b) {
            l = p.match(d);
        } else {
            l = k.match(d);
        }
        if (l && l[2]) {
            h._select.pop();
            if (!a) {
                var q = l[2];
                for (var r = 1; r < h._select.length; r++) {
                    var c = trim(h._select[r]._item_title);
                    for (var o = 0; o < q.length; o++) {
                        if (c.startWith(q[o])) {
                            h._select[r]._item_radio = true;
                            a = true;
                            break;
                        }
                    }
                }
                if (!a && q.length == 1 && (q[0] == "B" || q[0] == "A") && h._select.length == 3) {
                    a = true;
                    var g = 1;
                    if (q[0] == "B") {
                        g = 2;
                    }
                    h._select[g]._item_radio = true;
                }
                if (q.length > 1) {
                    h._type = "check";
                }
            }
        }
    }
    if (!a) {
        h._select[1]._item_radio = true;
    } else {
        if (j) {
            h._title = h._title.replace(n, "（）");
        }
    }
    return a;
}
function getCaret(b) {
    if (b.selectionStart) {
        return b.selectionStart;
    } else {
        if (document.selection) {
            b.focus();
            var c = document.selection.createRange();
            if (c == null) {
                return 0;
            }
            var a = b.createTextRange(),
            d = a.duplicate();
            a.moveToBookmark(c.getBookmark());
            d.setEndPoint("EndToStart", a);
            return d.text.length;
        }
    }
    return 0;
}
function createQ(a) {
    var b = create_question(a);
    b.onclick = divQuestionClick;
    b.onmouseover = divQuestionMouseOver;
    b.onmouseout = divQuestionMouseOut;
    questions.appendChild(b);
    if (a._type == "page" && a._topic == "1") {} else {
        questionHolder.push(b);
        if (!firstQuestion) {
            firstQuestion = b;
            isNotClick = true;
            b.onmouseover();
            isNotClick = false;
        }
    }
    return b;
}
function create_question(e) {
    var ab = e._type;
    var t = e._verify;
    var w = e._height > 1;
    _likertMode = e._tag || 0;
    var E = false;
    var f = false;
    if (isMergeAnswer && isCompleteLoad) {
        f = true;
    }
    var A = document.createElement("div");
    A.className = "div_question";
    A.dataNode = e;
    var L = $ce("div", "", A);
    L.className = "div_preview";
    A.div_question_preview = L;
    var J = ab == "question";
    var G = ab == "slider";
    var Q = ab == "sum";
    var O = ab == "page";
    var D = ab == "cut";
    var b = ab == "check";
    var m = ab == "radio";
    var r = m && _likertMode;
    var q = m && _likertMode > 1;
    var g = ab == "radio_down";
    var c = ab == "matrix";
    var a = ab == "matrix" && _likertMode > 300;
    var F = b && _likertMode;
    var U = ab == "fileupload";
    var l = m || g || b || c;
    var Y = !D && !O;
    var M = ab == "gapfill";
    A.isMergeNewAdded = f;
    if (Y) {
        total_question++;
    }
    var k = document.createElement("div");
    if (Y) {
        var C = $ce("div", e._topic + ".", k);
        A.divTopic = C;
        C.className = "div_topic_question";
        if (WjxActivity._use_self_topic) {
            C.style.display = "none";
        }
    }
    if (O) {
        var h = e._iszhenbie;
        var C = $ce("span", "<span style='font-size:14px; font-weight:bold;'>第" + e._topic + "页/共" + total_page + "页</span>", k);
        C.className = "div_topic_page_question";
        A.divTopic = C;
        A.divZhenBie = $ce("span", "<b style='color:red;'>--甄别页</b>", k);
        A.divZhenBie.style.display = h ? "": "none";
        A.divTimeLimit = $ce("span", "", k);
        A.showTimeLimit = function() {
            var ac = "";
            if (this.dataNode._mintime) {
                ac = "最短填写时间：" + this.dataNode._mintime + "秒";
            }
            if (this.dataNode._maxtime) {
                if (ac) {
                    ac += "&nbsp;";
                }
                ac += "最长填写时间：" + this.dataNode._maxtime + "秒";
            }
            if (ac) {
                ac = "&nbsp;&nbsp;<b style='color:green;'>--" + ac + "</b>";
            }
            A.divTimeLimit.innerHTML = ac;
        };
        A.showTimeLimit();
        if (e._topic == "1") {
            A.style.display = "none";
        }
        if (e._topic == "1") {
            isPrevFirstPage = true;
        }
    }
    if (D) {
        k.className = "div_title_cut_question";
    }
    if (Y) {
        k.className = "div_title_question_all";
    }
    var o = $ce("div", "", k);
    var W = e._title;
    if (M) {
        W = replaceGapFill(W, e);
    }
    var S = $ce("span", W, o);
    if (O) {
        o.className = "div_title_page_question";
    } else {
        o.className = "div_title_question";
    }
    A.get_div_title = function() {
        return S;
    };
    if (Y) {
        var Z = $ce("span", "&nbsp;*", o);
        Z.style.color = "red";
        Z.style.display = e._requir ? "": "none";
        A.get_span_required = function() {
            return Z;
        };
        if (J) {
            var v = $ce("span", "", o);
            v.className = "font-a0";
            A.showMinMaxWord = function(ae, ac) {
                var ah = this.dataNode;
                var ad = "";
                var af = type_wd_words;
                var ag = type_wd_minlimit;
                if (ah._verify == "数字" || ah._verify == "小数") {
                    af = "";
                    ag = type_wd_minlimitDigit;
                    ad = type_wd_digitfrom;
                }
                if (!isEmpty(ae) && !isEmpty(ac)) {
                    v.innerHTML = "&nbsp;（" + ad + ac + type_wd_to + ae + af + "）";
                    v.style.display = "";
                } else {
                    if (!isEmpty(ae)) {
                        v.innerHTML = "&nbsp;（" + ae + type_wd_limit + "）";
                        if (ah._verify == "数字" || ah._verify == "小数") {
                            v.innerHTML = "&nbsp;（" + type_wd_maxlimitDigit + ae + "）";
                        }
                        v.style.display = "";
                    } else {
                        if (!isEmpty(ac)) {
                            v.innerHTML = "&nbsp;（" + ag + ac + af + "）";
                            v.style.display = "";
                        } else {
                            v.style.display = "none";
                        }
                    }
                }
            };
            A.showMinMaxWord(e._maxword, e._minword);
            A.get_span_maxword = function() {
                return v;
            };
            if (e._isCeShi && e._answer) {
                var x = $ce("span", "", o);
                x.style.color = "#efa030";
                A.spanCeShi = x;
            }
        }
        if (e._isCeShi && (J || m || b)) {
            var x = $ce("span", "", o);
            x.style.color = "#efa030";
            if (J) {
                var I = "答案：" + e._answer;
                if (e._answer == "简答题无答案") {
                    I = "无标准答案需人工评分";
                }
                x.innerHTML = "（" + I + "，分值：" + (e._ceshiValue || 5) + "分）";
            } else {
                x.innerHTML = "（分值：" + e._ceshiValue + "分）";
            }
            A.spanCeShi = x;
        }
        if (b) {
            var X = document.createElement("span");
            A.updateSpanCheck = function() {
                var ac = this.dataNode;
                ac._lowLimit = ac._lowLimit || "";
                ac._upLimit = ac._upLimit || "";
                if (F) {
                    if (ac._lowLimit != "" && ac._lowLimit != -1) {
                        X.innerHTML = "&nbsp;[" + type_order_limit_begin + "<b>" + ac._lowLimit + "</b>" + type_order_limit_end + "]";
                    } else {
                        X.innerHTML = "&nbsp;[" + type_order + "]";
                    }
                } else {
                    if (ac._lowLimit != "" && ac._upLimit != "") {
                        if (ac._lowLimit == ac._upLimit) {
                            X.innerHTML = "&nbsp;[" + type_check_limit1 + "<b>" + ac._lowLimit + "</b>" + type_check_limit5 + "]";
                        } else {
                            X.innerHTML = "&nbsp;[" + type_check_limit2 + "<b>" + ac._lowLimit + "</b>-<b>" + ac._upLimit + "</b>" + type_check_limit5 + "]";
                        }
                    } else {
                        if (ac._lowLimit != "") {
                            X.innerHTML = "&nbsp;[" + type_check_limit3 + "<b>" + ac._lowLimit + "</b>" + type_check_limit5 + "]";
                        } else {
                            if (ac._upLimit != "") {
                                X.innerHTML = "&nbsp;[" + type_check_limit4 + "<b>" + ac._upLimit + "</b>" + type_check_limit5 + "]";
                            } else {
                                if (!ac._isTouPiao && !ac._isCeShi && !ac._isCePing) {
                                    X.innerHTML = "&nbsp;[" + type_check + "]";
                                }
                            }
                        }
                    }
                }
                X.className = "font-06f";
            };
            A.updateSpanCheck();
            o.appendChild(X);
        } else {
            if (a) {
                var X = $ce("span", "", o);
                A.updateSpanCheck = function() {
                    if (this.dataNode._tag == "301" && this.dataNode._minvalue !== "" && this.dataNode._maxvalue !== "") {
                        X.innerHTML = "&nbsp;[输入" + this.dataNode._minvalue + "到" + this.dataNode._maxvalue + "的数字]";
                        X.className = "font-06f";
                    } else {
                        X.innerHTML = "";
                    }
                    X.style.display = this.dataNode._tag == "301" ? "": "none";
                };
                A.updateSpanCheck();
            } else {
                if (c) {
                    if (e._tag == "102" || e._tag == "103") {
                        var n = $ce("span", "", o);
                        A.updateSpanMatrix = function() {
                            if (e._daoZhi) {
                                var ac = "竖向单选";
                                if (e._tag == "102") {
                                    ac = "竖向多选";
                                }
                                n.innerHTML = "&nbsp;[" + ac + "]";
                                n.className = "font-06f";
                            } else {
                                n.innerHTML = "";
                            }
                        };
                        A.updateSpanMatrix();
                    }
                }
            }
        }
    }
    var R = $ce("div", "", k);
    R.style.clear = "both";
    L.appendChild(k);
    if (Y) {
        var u = document.createElement("div");
        u.className = "div_table_radio_question";
        var p = $ce("div", "", u);
        p.className = "div_table_clear_top";
        L.appendChild(u);
    }
    if (J) {
        var y = control_textarea("1", "50");
        u.appendChild(y);
        var H = null;
        var aa = document.createElement("span");
        u.appendChild(aa);
        aa.style.display = "none";
        H = document.createElement("span");
        H.className = "design-icon design-date";
        u.appendChild(H);
        H.style.display = "none";
        y.style.overflow = "auto";
        y.value = e._default;
        A.showTextAreaUnder = function() {
            y.className = this.dataNode._underline ? "underline": "inputtext";
        };
        A.showTextAreaWidth = function() {
            if (isEmpty(this.dataNode._width)) {
                y.style.width = "62%";
            } else {
                y.style.width = this.dataNode._width + "px";
            }
        };
        A.showTextAreaHeight = function() {
            y.style.height = this.dataNode._height * 18 + "px";
        };
        A.showTextAreaDate = function() {
            var ac = this.dataNode._verify;
            if (ac == "日期" || ac == "生日" || ac == "入学时间") {
                y.style.width = "100px";
                y.style.height = "18px";
                H.style.display = "";
                aa.style.display = "none";
            } else {
                if (ac == "城市单选" || ac == "城市多选" || ac == "省市区") {
                    var ad = "100px";
                    if (ac == "城市多选") {
                        ad = "400px";
                    } else {
                        if (ac == "省市区") {
                            ad = "250px";
                        }
                    }
                    y.style.width = ad;
                    y.style.height = "18px";
                    aa.innerHTML = "&nbsp;<img src='/Images/Mysojump/QuestionnaireMng/Design/city.gif' alt=''/>";
                    aa.style.display = "";
                    H.style.display = "none";
                } else {
                    H.style.display = "none";
                    aa.style.display = "none";
                    this.showTextAreaWidth();
                    this.showTextAreaHeight();
                }
            }
        };
        A.showTextAreaUnder();
        A.showTextAreaWidth();
        A.showTextAreaHeight();
        A.showTextAreaDate();
        A.get_textarea = function() {
            return y;
        };
    }
    if (U) {
        var T = document.createElement("input");
        T.type = "file";
        var K = document.createElement("input");
        K.type = "button";
        K.value = "上传";
        u.appendChild(T);
        $ce("span", "&nbsp;&nbsp;", u);
        u.appendChild(K);
        var j = $ce("div", "请选择上传文件", u);
        A.updateFileUpload = function() {
            T.width = e._width;
            if (e._ext) {
                j.innerHTML = "请选择上传文件，扩展名为" + e._ext;
            } else {
                j.innerHTML = "请选择上传文件，扩展名为" + defaultFileExt;
            }
        };
        A.updateFileUpload();
    }
    if (M) {}
    if (G) {
        var N = $ce("span", e._minvaluetext || "", u);
        N.className = "spanLeft";
        N.style.color = "red";
        A.get_span_min_value_text = function() {
            return N;
        };
        var d = $ce("span", "(" + (e._minvalue || 0) + ")", u);
        d.className = "spanLeft";
        d.style.color = "red";
        A.get_span_min_value = function() {
            return d;
        };
        var z = $ce("span", "(" + (e._maxvalue || 100) + ")", u);
        z.className = "spanRight";
        z.style.color = "red";
        A.get_span_max_value = function() {
            return z;
        };
        var B = $ce("span", e._maxvaluetext || "", u);
        B.className = "spanRight";
        B.style.color = "red";
        A.get_span_max_value_text = function() {
            return B;
        };
        $ce("div", "", u).className = "divclear";
        var H = control_image("/Images/WJX/JoinQuestionnaire/slider1.jpg");
        H.style.width = "10px";
        var V = control_image("/Images/WJX/JoinQuestionnaire/sliderEnd.jpg");
        V.style.width = "97%";
        V.style.height = "23px";
        u.appendChild(H);
        u.appendChild(V);
        $ce("div", "", u).className = "divclear";
        u.style.width = "60%";
        var y = control_textarea("1", "10");
        y.style.display = "none";
    }
    if (Q) {
        A.createSum = function() {
            var ai = new StringBuilder();
            ai.append("<div  class='div_table_clear_top'></div>");
            if (this._referDivQ) {
                ai.append("此题行标题来源于第" + this._referDivQ.dataNode._topic + "题的选中项");
            } else {
                ai.append("<table style='width:100%;' border='0px'  cellpadding='5' cellspacing='0'>");
                var ae = "";
                var ac = "";
                ai.append("<tbody>");
                var ah = new Array();
                ah = trim(e._rowtitle).split("\n");
                var ag = "";
                for (var ad = 0; ad < ah.length; ad++) {
                    if (ad == ah.length - 1) {
                        ae = "";
                        ac = "";
                    }
                    if (ah[ad].length > 4 && ah[ad].substr(0, 4) == "【标签】") {
                        var af = ah[ad].substr(4);
                        ai.append("<tr><th><b style='color:#0066ff;'>" + af + "</b></th><td></td></tr>");
                        ag = "padding-left:10px;";
                        continue;
                    }
                    if (e._rowwidth == "") {
                        ai.append("<tr><th style='" + ac + ag + "'>" + ah[ad] + "</th>");
                    } else {
                        ai.append("<tr><th style='width:" + e._rowwidth + ";" + ac + ag + "'>" + ah[ad] + "</th>");
                    }
                    ai.append("<td  " + ae + "align='left' width='36'><input  type='text' style='width:36px;'/></td>");
                    ai.append("<td  " + ae + "align='left'><img src='/Images/WJX/JoinQuestionnaire/slider1.jpg' style='width: 10px;'/><img src='/Images/WJX/JoinQuestionnaire/sliderEnd.jpg' style='width:250px;height: 23px;'/></td>");
                    ai.append("</tr>");
                }
                ai.append("</tbody></table>");
            }
            ai.append("<div style='margin-top:10px;'><span style='color:#666666;'>" + sum_hint + "</span></div>");
            u.innerHTML = ai.toString("");
        };
        A.createSum();
    }
    if (l) {
        A.createTableRadio = function() {
            var am = this.dataNode;
            var ah = am._isTouPiao;
            var af = am._isCeShi;
            var al = am._isCePing;
            var aI = am._numperrow ? am._numperrow: 1;
            var aj = am._select;
            var aA = am._tag;
            var az = null;
            if (ah) {
                az = new Array();
                var aw = aj.length - 1;
                var ae = 0;
                for (var aO = 1; aO <= aw; aO++) {
                    ae += aO;
                }
                for (var aO = 1; aO <= aw; aO++) {
                    az[aO - 1] = 100 / ae * aO;
                }
            }
            var aB = new StringBuilder();
            aB.append("<div  class='div_table_clear_top'></div>");
            if (this._referDivQ) {
                var aP = "选项";
                if (am._type == "matrix" || am.type == "sum") {
                    aP = "行标题";
                }
                aB.append("此题" + aP + "来源于第" + this._referDivQ.dataNode._topic + "题的选中项");
            } else {
                if (g) {
                    aB.append("<select><option>" + type_radio_down + "</option>");
                    for (var aO = 1; aO < aj.length; aO++) {
                        if (aj[aO]._item_radio) {
                            aB.append("<option selected='selected'>" + trim(aj[aO]._item_title) + "</option>");
                        } else {
                            aB.append("<option>" + trim(aj[aO]._item_title) + "</option>");
                        }
                    }
                    aB.append("</select>");
                }
                if (m || (b && !F)) {
                    aB.append("<ul>");
                    var ag;
                    var aD = "%";
                    if (r) {
                        ag = 40;
                        aD = "px";
                        aI = 1;
                        if (aA == 101) {
                            ag = 105;
                        }
                    } else {
                        ag = (100 / aI) - 1;
                    }
                    var av = false;
                    var ac = 1;
                    for (var aO = 1; aO < aj.length; aO++) {
                        if (ab == "radio" && aA >= 1 && aA != 101 && aO == 1) {
                            var an = "0px";
                            if (aA > 1) {
                                an = "5px";
                            }
                            aB.append("<li class='notchoice' style='padding-right:15px;padding-top:" + an + "'><b>" + aj[1]._item_title + "</b></li>");
                        }
                        if (m && aA > 1 && aA != 101) {
                            if (aO == aj.length - 1) {
                                aB.append("<li style='padding-left:3px;' class='design-icon design-off" + am._tag + "'  ></li>");
                            } else {
                                aB.append("<li  style='padding-left:3px;' class='design-icon design-on" + am._tag + "'  ></li>");
                            }
                        } else {
                            if (aj[aO]._item_label) {
                                if (av) {
                                    aB.append("</ul></li>");
                                }
                                aB.append("<li style='width:100%;'><div><b>" + aj[aO]._item_label + "</b></div><ul>");
                                av = true;
                                ac = 1;
                            }
                            if (aO == aj.length - 1) {
                                aB.append("<li>");
                            } else {
                                aB.append("<li  style='width:" + ag + aD + ";'>");
                            }
                            if (!aj[aO]._item_img) {
                                if (ah) {
                                    aB.append("<div style='float:left;width:" + am._touPiaoWidth + "%;'>");
                                } else {
                                    if (af && aj[aO]._item_radio) {
                                        aB.append("<span style='color:#efa030;'>");
                                    }
                                }
                                if (m) {
                                    aB.append("<input type='radio'");
                                } else {
                                    aB.append("<input type='checkbox'");
                                }
                                if (ab == "radio" && aj[aO]._item_radio) {
                                    aB.append(" checked='checked'");
                                }
                                if (ab == "check" && aj[aO]._item_radio) {
                                    aB.append(" checked='checked'");
                                }
                                if (ab == "radio" && aA == 1) {
                                    aB.append("/>" + trim(aj[aO]._item_value));
                                } else {
                                    aB.append("/>" + trim(aj[aO]._item_title));
                                }
                                if (ah) {
                                    aB.append("</div>");
                                    aB.append("<div style='float:left;'>");
                                    addTouPiao(aB, am, az, aO);
                                    aB.append("</div><div style='clear:both;'></div>");
                                } else {
                                    if (af && aj[aO]._item_radio) {
                                        aB.append("&nbsp;(正确答案)</span>");
                                    } else {
                                        if (al) {
                                            aB.append("<span style='color:#efa030;'>&nbsp;(分值：" + aj[aO]._item_value + ")</span>");
                                        }
                                    }
                                }
                                if (am._hasjump && am._anytimejumpto < 1) {
                                    var ad = "跳转到下一题";
                                    if (aj[aO]._item_jump == "1") {
                                        ad = "结束作答";
                                    } else {
                                        if (aj[aO]._item_jump - 1 > 0) {
                                            ad = "跳转到第" + aj[aO]._item_jump + "题";
                                        }
                                    }
                                    aB.append("<span style='color:#efa030;'>&nbsp;(" + ad + ")</span>");
                                }
                                if (aj[aO]._item_desc) {
                                    aB.append("<div class='div_item_desc'>" + aj[aO]._item_desc + "</div>");
                                }
                            } else {
                                aB.append("<table cellpadding='0' cellspacing='0'><tr><td valign='top'>");
                                if (m) {
                                    aB.append("<input type='radio'");
                                } else {
                                    aB.append("<input type='checkbox'");
                                }
                                if (ab == "radio" && aj[aO]._item_radio) {
                                    aB.append(" checked='checked'");
                                }
                                if (ab == "check" && aj[aO]._item_radio) {
                                    aB.append(" checked='checked'");
                                }
                                if (ab == "radio" && aA == 1) {
                                    aB.append("'/>" + trim(aj[aO]._item_value));
                                } else {
                                    aB.append("'/>");
                                }
                                aB.append("</td><td>");
                                if (aj[aO]._item_imgtext) {
                                    aB.append("<div style='text-align:center;'><img src='" + aj[aO]._item_img + "' alt='' />");
                                    aB.append(trim(aj[aO]._item_title));
                                    aB.append("</div></td>");
                                } else {
                                    aB.append("<div><img src='" + aj[aO]._item_img + "' alt='' /></div></td>");
                                }
                                aB.append("</tr>");
                                if (aj[aO]._item_desc) {
                                    aB.append("<tr><td></td><td>");
                                    aB.append("<div class='div_item_desc'>" + aj[aO]._item_desc + "</div>");
                                    aB.append("</td></tr>");
                                }
                                if (ah) {
                                    aB.append("<tr><td></td><td align='center'>");
                                    addTouPiao(aB, am, az, aO);
                                    aB.append("</td></tr>");
                                }
                                aB.append("</table>");
                            }
                            if (aj[aO]._item_tb) {
                                aB.append(" <input type='text' class='underline' style='color:#999999;' value='" + defaultOtherText + "'/>");
                            }
                            if (aj[aO]._item_tbr) {
                                aB.append(" <span style='color: red;'> *</span>");
                            }
                            aB.append("</li>");
                        }
                        if (m && aA >= 1 && aA != 101 && aO == aj.length - 1) {
                            var an = "0px";
                            if (aA > 1) {
                                an = "5px";
                            }
                            aB.append("<li  class='notchoice'  style='padding-left:15px;padding-top:" + an + "'><b>" + aj[aj.length - 1]._item_title + "</b></li>");
                        }
                        if (aI > 1 && ac % aI == 0) {
                            aB.append("<div style='clear:both;'></div></ul><ul>");
                        }
                        ac++;
                    }
                    aB.append("<div style='clear:both;'></div></ul>");
                    if (av) {
                        aB.append("</li></ul>");
                    }
                    if (af && am._ceshiDesc) {
                        aB.append("<div style='color:#666;margin:3px 0 3px 6px;'>答案解析：" + am._ceshiDesc + "</div>");
                    }
                }
                if (F) {
                    aB.append("<div><ul>");
                    var ag;
                    ag = 100 / aI;
                    for (var aO = 1; aO < aj.length; aO++) {
                        aB.append("<li style='float:none;margin-bottom:6px;padding:3px 0;'><input type='checkbox' style='display:none;' /><span class='sortnum'></span>" + trim(aj[aO]._item_title) + "</li>");
                    }
                    aB.append("</ul>");
                }
                if (c) {
                    var ap = am._daoZhi;
                    var aL = "100%";
                    if (am._mainWidth) {
                        aL = am._mainWidth + "%";
                    }
                    aB.append("<table style='width:" + aL + ";' border='0px'  cellpadding='5' cellspacing='0'>");
                    var ar = "";
                    var ao = "";
                    var aT = "radio";
                    var aF = new Array();
                    aF = trim(am._rowtitle).split("\n");
                    var aE = trim(am._rowtitle2).split("\n");
                    var aH = false;
                    var ak = "";
                    if ((aA == 0) || (aA > 100 && aA < 200) || aA > 300) {
                        aB.append("<thead><tr><th></th>");
                        if (aA > 300) {
                            var aS = trim(am._columntitle).split("\n");
                            for (var aO = 0; aO < aS.length; aO++) {
                                aB.append("<td align='center'>" + trim(aS[aO]) + "</td>");
                            }
                        } else {
                            if (ap) {
                                for (var aO = 0; aO < aF.length; aO++) {
                                    if (aF[aO].length > 4 && aF[aO].substr(0, 4) == "【标签】") {
                                        continue;
                                    }
                                    aB.append("<td align='center'>" + trim(aF[aO]) + "</td>");
                                }
                            } else {
                                for (var aO = 1; aO < aj.length; aO++) {
                                    aB.append("<td align='center'>" + trim(aj[aO]._item_title) + "</td>");
                                }
                            }
                        }
                        ao = "border-bottom:1px solid #efefef;";
                        ar = "style='" + ao + "'";
                        aB.append("</tr></thead>");
                        if (aA == 102) {
                            aT = "checkbox";
                        }
                    }
                    if (aA == 301) {
                        aT = "text";
                    }
                    aB.append("<tbody>");
                    if (aA == "202") {
                        var aQ = am._minvalue;
                        var aC = am._maxvalue;
                        aB.append("<tr><th></th><td align='left' width='410'><table width='100%'><tr><td width='60%'><div style='width:70%'><div style='float:left;color:red;'>" + aQ + "</div><div style='float:right;color:red;'>" + aC + "</div><div style='clear:both;'></div></div></td></tr></table></td><th></th>");
                    }
                    if (!ap) {
                        var aJ = 0;
                        var aG = false;
                        var ay = "";
                        for (var aO = 0; aO < aF.length; aO++) {
                            if (aO == aF.length - 1) {
                                ar = "";
                                ao = "";
                            }
                            ay = aG ? "background:#EFF6FB;": "";
                            if (aF[aO].length > 4 && aF[aO].substr(0, 4) == "【标签】") {
                                var aN = aF[aO].substr(4);
                                aB.append("<tr style='" + ay + "'><th><b style='color:#0066ff;'>" + aN + "</b></th><td colspan='" + aj.length + "'></td>");
                                aB + "</tr>";
                                aH = true;
                                ak = "padding-left:10px;";
                                aG = !aG;
                                ay = aG ? "background:#EFF6FB;": "";
                                continue;
                            }
                            if (am._rowwidth == "") {
                                aB.append("<tr style='" + ay + "'><th style='" + ao + ak + "'>" + aF[aO] + "</th>");
                            } else {
                                aB.append("<tr style='" + ay + "'><th style='width:" + am._rowwidth + ";" + ao + ak + "'>" + aF[aO] + "</th>");
                            }
                            if (aA < 100 && aA) {
                                aB.append("<td><ul>");
                            }
                            if (aA > 200 && aA < 300) {
                                if (aA == 201) {
                                    var aq = am._rowVerify && am._rowVerify[aO] ? am._rowVerify[aO]._verify: "";
                                    var ax = "";
                                    var ai = am._rowVerify && am._rowVerify[aO] ? am._rowVerify[aO]._width: "";
                                    if (ai) {
                                        ai = "width:" + ai + "%";
                                    }
                                    if (aq == "日期") {
                                        ax = "<span class='design-icon design-date'></span>";
                                    } else {
                                        if (aq == "城市单选" || aq == "城市多选" || aq == "省市区") {
                                            ax = "&nbsp;<img src='/Images/Mysojump/QuestionnaireMng/Design/city.gif' alt=''/>";
                                        }
                                    }
                                    aB.append("<td  " + ar + "align='left'><textarea class='inputtext' style='overflow:auto;height:18px;" + ai + "'></textarea>" + ax + "</td>");
                                } else {
                                    if (aA == 202) {
                                        aB.append("<td  " + ar + "align='left' width='60%'><img src='/Images/WJX/JoinQuestionnaire/slider1.jpg' style='width: 10px;'/><img src='/Images/WJX/JoinQuestionnaire/sliderEnd.jpg' style='width:284px;height: 23px;'/></td>");
                                    }
                                }
                            } else {
                                if (aA > 300) {
                                    var aR = "";
                                    if (aA == "303") {
                                        aR += "<select><option>" + type_radio_down + "</option>";
                                        for (var aK = 1; aK < aj.length; aK++) {
                                            aR += "<option>" + trim(aj[aK]._item_title) + "</option>";
                                        }
                                        aR += "</select>";
                                    }
                                    var aS = trim(am._columntitle).split("\n");
                                    var at = Number(300 / aS.length);
                                    for (var aM = 0; aM < aS.length; aM++) {
                                        if (aA == "303") {
                                            aB.append("<td  " + ar + "align='center'>" + aR + "</td>");
                                        } else {
                                            if (aA == "301") {
                                                at = "30";
                                            }
                                            aB.append("<td  " + ar + "align='center'><textarea  type='text' style='overflow:auto;height:18px;width:" + at + "px;'></textarea></td>");
                                        }
                                    }
                                } else {
                                    for (var aM = 1; aM < aj.length; aM++) {
                                        if (aA > 100 || aA == 0) {
                                            aB.append("<td  " + ar + "align='center'><input  type='" + aT + "'/></td>");
                                        } else {
                                            if (aM == aj.length - 1) {
                                                aB.append("<li style='padding-left:3px;' class='design-icon design-off" + aA + "'></li>");
                                            } else {
                                                aB.append("<li style='padding-left:3px;' class='design-icon design-on" + am._tag + "'></li>");
                                            }
                                        }
                                    }
                                }
                            }
                            if (aA < 100 && aA) {
                                aB.append("</ul></td>");
                            }
                            var au = "";
                            if (aJ < aE.length) {
                                au = aE[aJ];
                            }
                            if (am._rowwidth2 == "") {
                                aB.append("<th " + ar + ">" + au + "</th>");
                            } else {
                                aB.append("<th style='width:" + am._rowwidth2 + ";" + ao + "'>" + au + "</th>");
                            }
                            aB.append("</tr>");
                            aG = !aG;
                            aJ++;
                        }
                    } else {
                        for (var aO = 1; aO < aj.length; aO++) {
                            if (aO == aj.length - 1) {
                                ar = "";
                                ao = "";
                            }
                            if (am._rowwidth == "") {
                                aB.append("<tr><th style='" + ao + ak + "'>" + trim(aj[aO]._item_title) + "</th>");
                            } else {
                                aB.append("<tr><th style='width:" + am._rowwidth + ";" + ao + ak + "'>" + trim(aj[aO]._item_title) + "</th>");
                            }
                            for (var aM = 0; aM < aF.length; aM++) {
                                if (aF[aM].length > 4 && aF[aM].substr(0, 4) == "【标签】") {
                                    continue;
                                }
                                aB.append("<td  " + ar + "align='center'><input  type='" + aT + "'/></td>");
                            }
                            aB.append("</tr>");
                        }
                    }
                    aB.append("</tbody></table>");
                }
            }
            aB.append("<div class='div_table_clear_bottom'></div>");
            u.innerHTML = aB.toString("");
        };
        A.createTableRadio(true);
    }
    var P = document.createElement("div");
    P.className = "div_ins_question";
    P.innerHTML = e._ins ? subjectInfo + e._ins: "";
    L.appendChild(P);
    A.div_ins_question = P;
    cancelInputClick(A);
    return A;
}
function SBCCaseToNumberic(a) {
    return a.dbc2sbc();
}
function DBC2SBC(b) {
    var c = b.value;
    var a = c.dbc2sbc();
    if (c != a) {
        b.value = a;
    }
}
function checkEnglish() {
    var a = txtContent.value.split(/[a-z]{6,}/gmi);
    var b = document.getElementById("divEnglish");
    if (a.length >= 20) {
        b.style.display = "";
        isEnglish = true;
        cbEnglish.checked = true;
        cbEnglish.onclick();
    }
}
txtContent.onpaste = function() {
    setTimeout(function() {
        DBC2SBC(txtContent);
        txtContent.value = txtContent.value.replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
        txtContent.onchange();
        checkEnglish();
    },
    40);
};
function GetStartDigit(a) {
    a = trim(a);
    var c = /^\s*([a-zA-Z]|问题|第)?\s*\d+|\(\d\)+|[\uFF10-\uFF19]+|（[\uFF10-\uFF19]+）/g;
    var f = -1;
    var b = c.exec(a);
    if (b) {
        var e = b[0];
        if (e.length > 1 && ((e.charAt(0) >= "a" && e.charAt(0) <= "z") || (e.charAt(0) >= "A" && e.charAt(0) <= "Z"))) {
            e = e.substr(1);
        }
        e = e.replace(/第\s*/, "").replace(/问题\s*/, "");
        var d = SBCCaseToNumberic(e);
        if (!isInt(d)) {
            f = -1;
        } else {
            f = toInt(d);
        }
    }
    if (isDigitBig) {
        c = /^\s*([一二三四五六七八九十]{1,3})/g;
        b = c.exec(a);
        if (b) {
            return ChineseNumberToArabicNumber(b[0]);
        }
    }
    return f;
}
function StartWithDigit(j) {
    var d = GetStartDigit(j);
    if (d == -1) {
        return IsSample(j);
    }
    if (d >= 1000) {
        return false;
    }
    var a = /^\s*\d+\s*[-－—~～]{1,3}\s*\d+/g;
    if (a.test(j) || /^\s*\d+[+次万%千小年以岁元人本个后级GXM分]/.test(j)) {
        return false;
    }
    if (d == prevDigit + 1 && !choiceStartWithNumber) {
        if (qType == "matrix") {
            if (d == prevMatrixDigit + 1) {
                return false;
            }
            if (!StartWithQType(j)) {
                return false;
            }
        }
        prevDigit = d;
        choiceStartWithNumber = false;
        return true;
    }
    if (prevDigit == -1) {
        prevDigit = d;
    }
    if (qType == "matrix") {
        prevMatrixDigit = d;
    }
    a = /\d[\.、]|\(?\d\)|（?\d）/g;
    var e = j.match(a);
    if (e && e.length >= 2) {
        var b = true;
        for (var c = 0; c < e.length; c++) {
            var g = e[c];
            var h = toInt(g);
            if (prevChoiceD != 0) {
                var f = h - prevChoiceD;
                if (f == 0 || h / f - prevChoiceD / f != 1) {
                    b = false;
                }
            }
            prevChoiceD = h;
        }
        if (b) {
            return false;
        } else {
            prevChoiceD = 0;
        }
    }
    if (qType == "matrix") {
        if (!StartWithQType(j)) {
            return false;
        }
    }
    if (isKaoShi) {
        return true;
    }
    if (titleProcessed && qType != "cut" && d == 1) {
        choiceStartWithNumber = true;
    }
    if (choiceStartWithNumber) {
        return false;
    }
    return true;
}
function ChineseNumberToArabicNumber(a) {
    var d = /(^[一二三四五六七八九十]$)|(^十[一二三四五六七八九]$)|(^[二三四五六七八九]十?[一二三四五六七八九]{0,1}$)/;
    if (!d.exec(a)) {
        return - 1;
    }
    var b = -1;
    var c = "";
    var g = "一二三四五六七八九十";
    var f = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var e = a.length;
    switch (e) {
    case 1:
        b = f[g.indexOf(a)];
        break;
    case 2:
        if (a[0] != "十") {
            c = f[g.indexOf(a[0])] + "";
            if (a[1] == "十") {
                c += "0";
            } else {
                c += f[g.indexOf(a[1])];
            }
            b = toInt(c);
        } else {
            c = "1";
            c += f[g.indexOf(a[1])];
            b = toInt(c);
        }
        break;
    case 3:
        c = f[g.indexOf(a[0])] + "";
        c += f[g.indexOf(a[2])] + "";
        b = toInt(c);
        break;
    default:
        break;
    }
    return b;
}
function StartWithQType(a) {
    if (a.contains(MatrixType) || a.contains(LikertMatrixType) || a.contains(RevLikertMatrixType) || a.contains("[矩阵单选题]") || a.contains(SumType) || a.contains(RadioQType) || a.contains(CeShiQType) || a.contains(CeShiQCheckType) || a.contains(SortType) || a.contains(TableType) || a.contains(GapFillType) || a.contains(GapFillTest) || a.contains(LikertType) || a.contains(ReverseLikertType) || a.contains(CutType) || a.contains(PageType) || IsCut(a)) {
        return true;
    }
    if (a.contains(AllQType)) {
        return true;
    }
    return false;
}
function IsCut(a) {
    a = trim(a);
    var b = /^\s*(基本信息|个人信息)/g;
    if (b.exec(a)) {
        return true;
    }
    if (isDigitBig) {
        return false;
    }
    b = /^\s*【?([一二三四五六七八九][\.。、\x20\t．:：]|[（(][一二三四五六七八九][)）]|第[一二三四五六七八九])/g;
    if (b.exec(a)) {
        var c = a.match(/[一二三四五六七八九]/g).length;
        if (c > 2) {
            return false;
        }
        return true;
    }
    return false;
}
var SampleArray = ["公司", "工作", "薪水", "收入", "部门", "职业", "职别", "年龄", "姓名", "性别", "婚", "学校", "年级", "专业", "院系", "邮件", "Email", "手机", "电话", "地址", "城市"];
function IsSample(a) {
    a = trim(a);
    if (a.endWith(":") || a.endWith("：")) {
        for (var b = 0; b < SampleArray.length; b++) {
            if (a.contains(SampleArray[b])) {
                return true;
            }
        }
    }
    return false;
}
function IsBlank(a) {
    if (a == undefined) {
        return false;
    }
    var b = /^(\-|=|_)+$/g;
    a = trim(a);
    if (b.exec(a)) {
        return true;
    }
    if (!isEmpty(a) && a != "\n") {
        return false;
    }
    return true;
}
function IsNumber(a) {
    if (a == "0" || a == "1" || a == "2" || a == "3" || a == "4" || a == "5" || a == "6" || a == "7" || a == "8" || a == "9") {
        return true;
    } else {
        return false;
    }
}
function isCheck(a) {
    if (a.contains("单选")) {
        return false;
    }
    if (isKaoShi) {
        return false;
    }
    if ((a.contains("多") || a.contains("复数") || a.contains("限") || a.contains("最少") || a.contains("至少")) && a.contains("选")) {
        return true;
    }
    if (a.contains("哪些") && !isKaoShi) {
        return true;
    }
    return false;
}
function AddTitle(a) {
    _title.innerHTML = trim(a);
}
function AddDesc(b) {
    _desc.innerHTML = b;
    var a = b.split("\n").length;
    descEndIndex += a;
}
function AddCut(c) {
    var b = new Object();
    b._type = "cut";
    b._title = c.replace(CutType, "");
    b._tag = "";
    b._startLine = cutStartIndex;
    var a = c.split("\n").length;
    b._endLine = cutStartIndex + a;
    return b;
}
function AddQuestion(d, g) {
    if (d.contains(GapFillStr) || d.match(/\{.*?\}/)) {
        return AddGapFill(d, g);
    }
    var c = new Object();
    c._topic = g + "";
    if (d.contains(GapFillTest) || d.contains(CeShiJianDaType) || isKaoShi) {
        c._isCeShi = true;
        var b = /[\(（]?\s*([×错√对])\s*[\)）]?\s*$/;
        var a = d.match(b);
        if (a && a[1]) {
            c._type = "radio";
            c._title = d.replace(b, "");
            c._keyword = "";
            c._relation = "";
            c._hasvalue = true;
            c._ceshiDesc = "";
            c._ceshiValue = 5;
            c._hasjump = false;
            c._anytimejumpto = "0";
            c._requir = true;
            c._ins = "";
            c._randomChoice = false;
            c._verify = "";
            c._numperrow = 1;
            c._select = new Array();
            c._select.push(new Object());
            var f = a[1].contains("对") || a[1].contains("√");
            var e = new Object();
            e._item_title = "对";
            e._item_radio = f;
            e._item_value = "";
            e._item_jump = "0";
            e._item_tb = false;
            e._item_tbr = false;
            e._item_img = "";
            e._item_imgtext = false;
            e._item_desc = "";
            e._item_label = "";
            c._select.push(e);
            e = new Object();
            e._item_title = "错";
            e._item_radio = !f;
            e._item_value = "";
            e._item_jump = "0";
            e._item_tb = false;
            e._item_tbr = false;
            e._item_img = "";
            e._item_imgtext = false;
            e._item_desc = "";
            e._item_label = "";
            c._select.push(e);
            return c;
        } else {
            if (d.contains(CeShiJianDaType)) {
                c._answer = "简答题无答案";
                c._ceshiDesc = "";
            }
        }
    }
    c._type = "question";
    c._title = ProcessTitle(d);
    c._keyword = "";
    c._relation = "";
    c._verify = "";
    c._tag = "";
    c._height = 1;
    c._maxword = "";
    c._requir = chkRequire.checked;
    c._norepeat = false;
    c._default = "";
    c._ins = "";
    c._hasjump = false;
    c._anytimejumpto = "0";
    c._needOnly = false;
    c._hasList = false;
    c._listId = -1;
    c._width = "";
    c._underline = false;
    c._minword = "";
    c._startLine = lineIndex;
    c._endLine = lineIndex;
    return c;
}
function AddPage(b) {
    total_page++;
    var a = new Object();
    a._type = "page";
    a._topic = total_page + "";
    a._title = b.replace(PageType, "");
    a._tag = "";
    a._iszhenbie = false;
    a._mintime = "";
    a._maxtime = "";
    a._startLine = pageStartIndex;
    a._endLine = pageEndIndex;
    return a;
}
function getGapFillCount(b) {
    var d = 0;
    var e = 0;
    var a = b.length;
    var f = b.match(/(\{.*?\})/g);
    if (f) {
        return f.length;
    }
    do {
        e = b.indexOf(GapFillStr, e);
        if (e != -1) {
            d++;
            e += GapFillStr.length;
            for (var c = e; c < a; c++) {
                if (b.charAt(c) != "_") {
                    break;
                }
                e++;
            }
        }
    } while ( e != - 1 );
    return d;
}
function replaceGapFill(o, b) {
    var d = 0;
    var a = 0;
    var h = new StringBuilder();
    var q = 0;
    do {
        a = d;
        d = o.indexOf(GapFillStr, d);
        var f = GapFillStr;
        if (d != -1) {
            var l = 0;
            h.append(o.substr(a, d - a));
            d += GapFillStr.length;
            for (var c = d; c < o.length; c++) {
                if (o[c] != "_") {
                    break;
                }
                l++;
                f += "_";
                d++;
            }
            var e = GapWidth + l * (GapWidth / 3);
            var n = false;
            if (b._rowVerify[q] && b._rowVerify[q]._verify == "日期") {
                e = 70;
                n = true;
            }
            var k = "";
            if (b._isCeShi) {
                var p = b._rowVerify;
                if (p[q]) {
                    var r = (p[q]._answer || "请设置答案");
                    k = r + ":" + (p[q]._ceshiValue || 1) + "分";
                    var g = r.length * 12 + 24;
                    if (e < g) {
                        e = g;
                    }
                }
            }
            var m = GapFillReplace.replace("width:" + GapWidth + "px", "width:" + e + "px");
            if (k) {
                m = m.replace("/>", " value='" + k + "'/>");
            }
            if (b._useTextBox) {
                m = m.replace("/>", " class='inputtext'/>");
            } else {
                m = m.replace("/>", " class='underline'/>");
            }
            h.append(m);
            q++;
        } else {
            if (a < o.length) {
                h.append(o.substr(a));
            }
        }
    } while ( d != - 1 );
    return h.toString();
}
function AddGapFill(b, e) {
    var d = getGapFillCount(b);
    var a = new Object();
    a._type = "gapfill";
    a._topic = e + "";
    a._verify = "";
    if (b.contains(GapFillTest) || isKaoShi) {
        a._isCeShi = true;
    }
    b = ProcessTitle(b);
    a._title = b;
    a._keyword = "";
    a._relation = "";
    a._tag = "";
    a._requir = true;
    a._gapcount = d;
    a._ins = "";
    a._hasjump = false;
    a._anytimejumpto = "0";
    a._useTextBox = false;
    a._rowVerify = new Array();
    if (isKaoShi) {
        var f = b.match(/\{(.*?)\}/g);
        if (f && f.length > 0) {
            for (var c = 0; c < f.length; c++) {
                a._rowVerify[c] = new Object();
                a._rowVerify[c]._answer = trim(f[c].replace("{", "").replace("}", ""));
                a._rowVerify[c]._ceshiValue = 1;
            }
            b = b.replace(/(\{.*?\})/g, "______");
            a._title = b;
        }
    }
    a._startLine = lineIndex;
    a._endLine = lineIndex;
    return a;
}
function AddSelectTitle(d, e, f) {
    var c = new Object();
    c._startLine = lineIndex;
    c._tag = "";
    if (f == "sort") {
        c._type = "check";
        c._tag = "1";
        d = d.replace(SortType, "");
    } else {
        if (f == "likert") {
            c._type = "radio";
            c._tag = "101";
            d = d.replace(LikertType, "").replace(ReverseLikertType, "");
        } else {
            c._type = f;
            d = d.replace(CeShiQType, "").replace(CeShiQCheckType, "");
        }
    }
    c._topic = e + "";
    if (f == "check") {
        var a = /限选(\d)项/;
        var b = d.match(a);
        if (b && b[1] > 0) {
            c._lowLimit = b[1];
            c._upLimit = b[1];
            d = d.replace(a, "");
        }
        a = /最多选(\d)项/;
        b = d.match(a);
        if (b && b[1] > 0) {
            c._upLimit = b[1];
            c._lowLimit = "";
            d = d.replace(a, "");
        }
        a = /[最至]少选(\d)项/;
        b = d.match(a);
        if (b && b[1] > 0) {
            c._lowLimit = b[1];
            c._upLimit = "";
            d = d.replace(a, "");
        }
    }
    d = ProcessTitle(d);
    c._title = d;
    c._keyword = "";
    c._relation = "";
    if (f == "likert") {
        c._hasvalue = true;
    } else {
        c._hasvalue = false;
    }
    c._hasjump = false;
    c._anytimejumpto = "0";
    c._requir = cbkChoiceRequire.checked;
    c._ins = "";
    c._randomChoice = false;
    c._verify = "";
    if (numPerNow >= 6) {
        numPerNow = numPerNow / 2;
    }
    if (d == "您的性别：" && numPerNow == 1) {
        c._verify = "性别";
        numPerNow = 6;
    }
    c._numperrow = numPerNow;
    numPerNow = 1;
    c._select = new Array();
    c._select.push(new Object());
    return c;
}
function AddSelectItem(b, a) {
    a = trim(a).replace("□", "");
    if (!IsBlank(a)) {
        var d = false;
        if (a.endWith(GapFillStr) || a.endWith(GapFillStr + ")") || a.endWith(GapFillStr + "）")) {
            a = a.replace(/[_]/g, "");
            d = true;
        } else {
            if (a.contains("请注明") || a.contains("请说明")) {
                d = true;
            }
        }
        var c = new Object();
        c._item_title = a;
        c._item_radio = false;
        c._item_value = "";
        c._item_jump = "0";
        c._item_tb = d;
        c._item_tbr = false;
        if (d) {
            c._item_tbr = true;
        }
        c._item_img = "";
        c._item_imgtext = false;
        c._item_desc = "";
        c._item_label = label || "";
        label = "";
        b._select.push(c);
    }
}
function AddColumn(b, a) {
    if (isEmpty(trim(a))) {
        return;
    }
    if (!b._columntitle) {
        b._columntitle = a;
    } else {
        b._columntitle += "\n" + a;
    }
}
function AddMatrixTitle(b, c, d) {
    var a = new Object();
    a._startLine = lineIndex;
    a._type = "matrix";
    a._topic = c + "";
    a._keyword = "";
    a._relation = "";
    a._verify = "";
    if (b.contains(LikertMatrixType) || b.contains(RevLikertMatrixType)) {
        d = "101";
    }
    b = ProcessTitle(b);
    if (d == "303") {
        b = b.replace(TableType, "");
    } else {
        b = b.replace(MatrixType, "").replace(LikertMatrixType, "").replace(RevLikertMatrixType, "").replace("[矩阵单选题]", "");
    }
    a._tag = d;
    a._title = b;
    if (d == "303" || d == "101") {
        a._hasvalue = true;
    } else {
        a._hasvalue = false;
    }
    a._hasjump = false;
    a._anytimejumpto = "0";
    a._requir = cbkChoiceRequire.checked;
    a._ins = "";
    a._rowwidth = "";
    a._rowwidth2 = "";
    a._rowtitle = "";
    a._rowtitle2 = "";
    a._columntitle = "";
    a._select = new Array();
    a._select.push(new Object());
    return a;
}
function AddMatrixLine(b, a) {
    if (!IsBlank(a)) {
        if (!b._rowtitle) {
            b._rowtitle = "";
        }
        if (b._rowtitle) {
            b._rowtitle += "\n";
        }
        if (!isEmpty(label)) {
            b._rowtitle += DesignLabelItem + label + "\n";
            label = "";
        }
        b._rowtitle += a;
    }
}
function AddSumTitle(b, c) {
    var a = new Object();
    a._startLine = lineIndex;
    a._verify = "";
    a._type = "sum";
    a._topic = c + "";
    a._keyword = "";
    a._relation = "";
    b = ProcessTitle(b);
    b = b.replace(SumType, "");
    a._title = b;
    a._tag = "";
    a._hasjump = false;
    a._anytimejumpto = "0";
    a._requir = cbkChoiceRequire.checked;
    a._ins = "";
    a._rowwidth = 100;
    a._total = 100;
    return a;
}
function ContainsAB(a, l, k, h) {
    if (isEnglish) {
        return false;
    }
    var j = a.toUpperCase();
    var c = j.indexOf("A");
    var g = false;
    var f = false;
    if (c > -1) {
        g = true;
        if (c + 1 < j.length && j.charAt(c + 1) >= "A" && j.charAt(c + 1) <= "Z") {
            g = false;
        }
    }
    var e = false;
    var d = g && !j.contains("AB");
    if (d) {
        c = j.indexOf("B");
        if (c > -1) {
            f = true;
            if (c + 1 < j.length && j.charAt(c + 1) >= "A" && j.charAt(c + 1) <= "Z") {
                f = false;
            }
        }
        if (!f && k + 1 < h) {
            var b = l[k + 1].toUpperCase();
            c = b.indexOf("B");
            if (c > -1) {
                f = true;
                if (c + 1 < b.length && b.charAt(c + 1) >= "A" && b.charAt(c + 1) <= "Z") {
                    f = false;
                }
            }
        }
        if (f) {
            e = true;
        }
    }
    return e;
}
function regsplit(f, d) {
    var e = f.split(d),
    c = f.match(d),
    a = [e[0]];
    if (!c) {
        return a;
    }
    for (var b = 0; b < c.length; ++b) {
        a[2 * b + 1] = c[b];
        a[2 * b + 2] = e[b + 1];
    }
    return a;
}
function ProcessTitleItems(d) {
    if (isEnglish) {
        return false;
    }
    var e = false;
    var f = null;
    var p = d.toUpperCase();
    var a = d;
    var c = "radio";
    if (isCheck(d)) {
        c = "check";
    }
    var b = p.indexOf("A");
    var l = false;
    var k = false;
    if (b > -1) {
        l = true;
        if (b + 1 < p.length && p.charAt(b + 1) > "A" && p.charAt(b + 1) < "Z") {
            l = false;
        }
    }
    b = p.indexOf("B");
    if (b > -1) {
        k = true;
        if (b + 1 < p.length && p.charAt(b + 1) > "A" && p.charAt(b + 1) < "Z") {
            k = false;
        }
    }
    var h = l && k && !p.contains("AB");
    if (h && !isKaoShi) {
        f = regsplit(d, /[A-Z][^A-Z]/ig);
        a = f[0];
        e = true;
        numPerNow = (f.length - 1) / 2;
        tempDataNode = AddSelectTitle(a, qIndex, c);
        for (var g = 1; g < f.length; g += 2) {
            var m = f[g] + f[g + 1];
            AddSelectItem(tempDataNode, m);
        }
    } else {
        var o = /□|○|①|②|③|④|⑤|⑥|⑦|⑧/ig;
        f = d.split(o);
        if (f.length >= 3) {
            numPerNow = f.length - 1;
            var n = a.search(o);
            a = a.substr(0, n);
            tempDataNode = AddSelectTitle(a, qIndex, c);
            for (var g = 1; g < f.length; g += 1) {
                var m = f[g];
                if (!isEmpty(m)) {
                    AddSelectItem(tempDataNode, m);
                }
            }
            e = true;
        }
    }
    return e;
}
function ProcessTitle(a) {
    var d = 0;
    a = a.replace("[单选题]", "").replace("[复选题]", "").replace("[多选题]", "").replace("[主观题]", "").replace("[问答题]", "").replace("[必答题]", "").replace("(可多选)", "").replace("[排序题]", "").replace("(多选)", "").replace("[矩阵题]", "").replace("[矩阵单选题]", "").replace("[段落说明]", "").replace("[表格题]", "").replace("[比重题]", "").replace("[分页栏]", "").replace(AllQType, "").replace("[测试填空题]", "").replace(CeShiJianDaType, "");
    if (!isCompact && IsNumber(a.charAt(0))) {
        d++;
        for (var b = 1; b < a.length; b++) {
            if (IsNumber(a.charAt(b))) {
                d++;
            } else {
                var e = a.charAt(b);
                if (e == "." || e == "。" || e == "、" || e == " " || e == "．") {
                    d++;
                } else {
                    break;
                }
            }
        }
        return a.substr(d);
    } else {
        return a;
    }
}
function show_status_tip(a) {
    alert(a);
    return;
}
var prevSaveData = "";
function saveMode(e, d) {
    var c = spanCode.getElementsByTagName("input")[0];
    var a = /^\d+$/;
    if (c && !a.test(c.value)) {
        var b = document.getElementById("hrefCode");
        b.onclick = function() {
            if (!c.value) {
                alert("请输入验证码");
                return;
            }
            PDF_close();
            save_paper("", e, d);
        };
        PDF_launch("divCode", 340, 100);
        return;
    }
    if (!isLogin) {
        alert("您需要先登录才能使用此功能，请先注册或登录！");
        PDF_launch("/register/registers.aspx", 640, 640,
        function() {
            if (!isLogin) {
                alert("如果您不注册或者登录，您设计的问卷将无法保存！");
            } else {
                d.style.display = "none";
                save_paper("", e, d);
            }
        },
        "注册问卷星");
        return;
    }
    d.style.display = "none";
    save_paper("", e, d);
}
var hasJoinQuestion = false;
function save_paper(b, t, e) {
    if (questionHolder.length == 0) {
        PDF_launch("divDesignError", 560, 200);
        e.style.display = "";
        return;
    }
    hasJoinQuestion = false;
    loadSaveText(true);
    var T = new Array();
    T[0] = new Object();
    T[0]._title = _title.innerHTML;
    T[0]._tag = _desc.innerHTML;
    T[0]._display_part = false;
    T[0]._display_part_num = 0;
    T[0]._random_mode = "0";
    T[0]._random_begin = "0";
    T[0]._random_end = "0";
    T[1] = firstPage.dataNode;
    var M = false;
    var A = 1;
    var m = 2;
    for (var R = 0; R < questionHolder.length; R++) {
        T[R + 2] = questionHolder[R].dataNode;
        var U = T[R + 2]._type;
        if (U == "page") {
            if (T[R + 2]._topic != m) {
                T[R + 2]._topic = m;
            }
            m++;
        } else {
            if (U != "cut") {
                if (T[R + 2]._topic != A) {
                    T[R + 2]._topic = A;
                }
                A++;
            }
        }
        var y = T[R + 2]._relation;
        if (y && y != "0") {
            var I = y.split(",");
            var z = true;
            var D = I[0];
            var h = I[1].split(";");
            var k = getDataNodeByTopic(D);
            if (k && T[R + 2]._topic - D > 0) {
                var E = k._select;
                var U = k._type;
                if (U == "radio" || U == "radio_down" || U == "check") {
                    for (var F = 0; F < h.length; F++) {
                        var g = h[F];
                        if (g < 1 || g >= E.length) {
                            z = false;
                        }
                    }
                } else {
                    z = false;
                }
            } else {
                z = false;
            }
            if (!z) {
                T[R + 2]._relation = "";
            }
        }
        T[R + 2]._referTopic = "";
        T[R + 2]._referedTopics = "";
        if (questionHolder[R]._referDivQ) {
            T[R + 2]._referTopic = questionHolder[R]._referDivQ.dataNode._topic;
            M = true;
        }
        if (questionHolder[R]._referedArray) {
            T[R + 2]._referedTopics = "";
            for (var G = 0; G < questionHolder[R]._referedArray.length; G++) {
                if (G > 0) {
                    T[R + 2]._referedTopics += ",";
                }
                T[R + 2]._referedTopics += questionHolder[R]._referedArray[G].dataNode._topic;
            }
        }
    }
    var B = 0;
    for (var R = 1; R < T.length; R++) {
        if (T[R]._type == "page") {
            B++;
        }
    }
    T[0]._total_page = B;
    var l = new StringBuilder();
    var Q = false;
    var c = false;
    var x = false;
    var v = false;
    var a = T[0]._title + "§" + T[0]._tag + "§" + T[0]._random_begin + "§" + T[0]._random_end + "§" + T[0]._random_mode + "§" + WjxActivity._use_self_topic;
    a += "§" + T[0]._display_part + "§" + T[0]._display_part_num + "§" + designversion;
    for (var R = 1; R < T.length; R++) {
        switch (T[R]._type) {
        case "question":
            var y = T[R]._relation || "";
            l.append("¤" + T[R]._type + "§" + T[R]._topic + "§" + T[R]._title + "〒" + T[R]._keyword + "〒" + y + "§" + T[R]._tag + "§" + T[R]._height + "§" + T[R]._maxword + "§" + T[R]._requir + "§" + T[R]._norepeat + "§" + T[R]._default + "§" + T[R]._ins + "§" + T[R]._hasjump + "§" + T[R]._anytimejumpto + "§" + T[R]._verify + "§" + T[R]._needOnly + "§" + T[R]._hasList + "§" + T[R]._listId + "§" + T[R]._width + "§" + T[R]._underline + "§" + T[R]._minword);
            if (T[R]._isCeShi) {
                l.append("§" + (T[R]._ceshiValue || 5) + "〒" + (T[R]._answer || "") + "〒" + (T[R]._ceshiDesc || ""));
                v = true;
            }
            hasJoinQuestion = true;
            break;
        case "gapfill":
            var y = T[R]._relation || "";
            var S = getGapFillCount(T[R]._title);
            var q = T[R]._useTextBox ? "true": "";
            l.append("¤" + T[R]._type + "§" + T[R]._topic + "§" + T[R]._title + "〒" + T[R]._keyword + "〒" + y + "§" + T[R]._tag + "§" + T[R]._requir + "§" + S + "§" + T[R]._ins + "§" + T[R]._hasjump + "§" + T[R]._anytimejumpto);
            l.append("§");
            if (T[R]._rowVerify) {
                for (var d = 0; d < S; d++) {
                    if (d > 0) {
                        l.append("〒");
                    }
                    if (!T[R]._rowVerify[d]) {
                        continue;
                    }
                    var o = T[R]._rowVerify[d];
                    l.append(o._verify || "");
                    l.append(",");
                    l.append(o._minword || "");
                    l.append(",");
                    l.append(o._maxword || "");
                    if (T[R]._isCeShi) {
                        l.append(",");
                        l.append(o._ceshiValue || "1");
                        l.append(",");
                        var L = o._answer || "";
                        L = L.replace(/,/g, "，");
                        l.append(L);
                        l.append(",");
                        var O = o._ceshiDesc || "";
                        O = O.replace(/,/g, "，");
                        l.append(O);
                        l.append(",");
                        l.append(o._include);
                    }
                }
            }
            l.append("§");
            l.append(q);
            if (T[R]._isCeShi) {
                l.append("§1");
                v = true;
            }
            hasJoinQuestion = true;
            break;
        case "slider":
            var y = T[R]._relation || "";
            l.append("¤" + T[R]._type + "§" + T[R]._topic + "§" + T[R]._title + "〒" + T[R]._keyword + "〒" + y + "§" + T[R]._tag + "§" + T[R]._requir + "§" + T[R]._minvalue + "§" + T[R]._maxvalue + "§" + T[R]._minvaluetext + "§" + T[R]._maxvaluetext + "§" + T[R]._ins + "§" + T[R]._hasjump + "§" + T[R]._anytimejumpto);
            hasJoinQuestion = true;
            break;
        case "fileupload":
            var y = T[R]._relation || "";
            l.append("¤" + T[R]._type + "§" + T[R]._topic + "§" + T[R]._title + "〒" + T[R]._keyword + "〒" + y + "§" + T[R]._tag + "§" + T[R]._requir + "§" + T[R]._width + "§" + T[R]._ext + "§" + T[R]._maxsize + "§" + T[R]._ins + "§" + T[R]._hasjump + "§" + T[R]._anytimejumpto);
            hasJoinQuestion = true;
            break;
        case "sum":
            var y = T[R]._relation || "";
            l.append("¤" + T[R]._type + "§" + T[R]._topic + "§" + T[R]._title + "〒" + T[R]._keyword + "〒" + y + "§" + T[R]._tag + "§" + T[R]._requir + "§" + T[R]._total + "§" + T[R]._rowtitle + "§" + T[R]._rowwidth + "§0§" + T[R]._ins + "§" + T[R]._hasjump + "§" + T[R]._anytimejumpto);
            l.append("§" + T[R]._referTopic + "§" + T[R]._referedTopics);
            hasJoinQuestion = true;
            break;
        case "cut":
            l.append("¤" + T[R]._type + "§" + T[R]._title + "§" + T[R]._tag);
            break;
        case "page":
            l.append("¤" + T[R]._type + "§" + T[R]._topic + "§" + T[R]._title + "§" + T[R]._tag);
            var p = T[R]._iszhenbie ? "true": "";
            l.append("§" + p);
            l.append("§" + T[R]._mintime);
            if (T[R]._mintime) {
                Q = true;
            }
            l.append("§" + T[R]._maxtime);
            if (T[R]._maxtime) {
                c = true;
            }
            break;
        case "check":
        case "radio_down":
        case "radio":
        case "matrix":
            var y = T[R]._relation || "";
            T[R]._tag = isNaN(T[R]._tag) ? 0 : T[R]._tag;
            var N = T[R]._mainWidth || "";
            l.append("¤" + T[R]._type + "§" + T[R]._topic + "§" + T[R]._title + "〒" + T[R]._keyword + "〒" + y + "〒" + N + "§" + T[R]._tag + "§");
            if (T[R]._type == "matrix") {
                if (!T[R]._rowtitle) {
                    T[R]._rowtitle = "&nbsp;";
                }
                l.append(T[R]._rowtitle + "〒" + T[R]._rowtitle2 + "〒" + T[R]._columntitle);
            } else {
                l.append(T[R]._numperrow + "〒" + T[R]._randomChoice);
            }
            l.append("§" + T[R]._hasvalue + "§" + T[R]._hasjump + "§" + T[R]._anytimejumpto + "§" + T[R]._requir);
            if (T[R]._type == "check") {
                l.append("," + T[R]._lowLimit + "," + T[R]._upLimit);
            }
            if (T[R]._type == "matrix") {
                l.append("§" + T[R]._rowwidth + "〒" + T[R]._rowwidth2);
                if (T[R]._tag == "202" || T[R]._tag == "301") {
                    l.append("〒" + T[R]._minvalue + "〒" + T[R]._maxvalue);
                } else {
                    if (T[R]._tag == "102" || T[R]._tag == "103") {
                        var n = T[R]._daoZhi || "";
                        l.append("〒" + n);
                    } else {
                        if (T[R]._tag == "201") {
                            if (T[R]._rowVerify) {
                                l.append("〒");
                                var H = trim(T[R]._rowtitle).split("\n");
                                var K = 0;
                                for (var d = 0; d < H.length; d++) {
                                    if (H[d].substring(0, 4) == "【标签】") {
                                        continue;
                                    }
                                    if (T[R]._rowVerify[K]) {
                                        var o = T[R]._rowVerify[K];
                                        l.append(K + ",");
                                        l.append(o._verify || "");
                                        l.append(",");
                                        l.append(o._minword || "");
                                        l.append(",");
                                        l.append(o._maxword || "");
                                        l.append(",");
                                        l.append(o._width || "");
                                        l.append(";");
                                    }
                                    K++;
                                }
                            }
                        }
                    }
                }
            } else {
                if (T[R]._isTouPiao) {
                    l.append("§" + T[R]._isTouPiao + "〒" + T[R]._touPiaoWidth + "〒" + T[R]._displayTiao + "〒" + T[R]._displayNum + "〒" + T[R]._displayPercent);
                    x = true;
                } else {
                    if (T[R]._isCeShi) {
                        l.append("§ceshi〒" + T[R]._ceshiValue + "〒" + T[R]._ceshiDesc);
                        v = true;
                    } else {
                        if (T[R]._isCePing) {
                            l.append("§ceping");
                        } else {
                            l.append("§");
                        }
                    }
                }
            }
            l.append("§" + T[R]._ins + "§" + T[R]._verify);
            l.append("§" + T[R]._referTopic + "§" + T[R]._referedTopics);
            for (var P = 1; P < T[R]._select.length; P++) {
                l.append("§" + T[R]._select[P]._item_title + "〒" + T[R]._select[P]._item_radio + "〒" + T[R]._select[P]._item_value + "〒" + T[R]._select[P]._item_jump + "〒" + T[R]._select[P]._item_tb + "〒" + T[R]._select[P]._item_tbr + "〒" + T[R]._select[P]._item_img + "〒" + T[R]._select[P]._item_imgtext + "〒" + T[R]._select[P]._item_desc + "〒" + T[R]._select[P]._item_label);
            }
            hasJoinQuestion = true;
            break;
        }
    }
    if (!hasJoinQuestion) {
        PDF_launch("divDesignError", 560, 200);
        e.style.display = "";
        return;
    }
    var w = getXmlHttp();
    var C = false;
    var u = spanCode.getElementsByTagName("input")[0];
    var r = "";
    if (u) {
        r = "&verify=" + encodeURIComponent(u.value);
    }
    var f = "/Handler/designtxt.ashx?t=" + (new Date()).valueOf() + r + "&curid=" + activityID;
    if (isEnglish) {
        f += "&eng=1";
    }
    if (C) {
        w.open("post", f, false);
    } else {
        w.open("post", f);
    }
    w.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if (!C) {
        w.onreadystatechange = function() {
            if (w.readyState != 4) {
                return;
            }
            if (w.status != 200) {
                show_status_tip("很抱歉，由于网络异常您的保存没有成功，请再试一次！", 6000);
                return;
            }
            afterSave(unescape(w.responseText), b, J, t, e);
        };
    }
    a += "§" + M + "§" + Q + "§" + c + "§" + x + "§" + v;
    var J = a + l.toString("");
    l.clear();
    if (J == prevSaveData) {
        saveSuc(b);
    } else {
        w.send("surveydata=" + encodeURIComponent(J));
        if (C) {
            afterSave(unescape(w.responseText), b, J, t, e);
        }
    }
}
function getXmlHttp() {
    var a;
    try {
        a = new XMLHttpRequest();
    } catch(b) {
        try {
            a = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(b) {
            try {
                a = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(b) {}
        }
    }
    return a;
}
function getTop(b) {
    if (!b) {
        return;
    }
    var a = b.offsetLeft;
    var c = b.offsetTop;
    while (b = b.offsetParent) {
        a += b.offsetLeft;
        c += b.offsetTop;
    }
    return {
        x: a,
        y: c
    };
}
function refresh_validate() {
    var b = spanCode.getElementsByTagName("img")[0];
    var a = spanCode.getElementsByTagName("input")[0];
    if (a) {
        a.value = "";
    }
    if (b) {
        b.src = "/AntiSpamImageGen.aspx?t=" + (new Date()).valueOf();
    }
}
function afterSave(d, b, c, f, e) {
    if (d == "error") {
        windowGotoUrl("/Error/Error.aspx?source=designQHandler");
    } else {
        if (d == "timeout") {
            show_status_tip("您的登录信息超时，请重新登录，谢谢！");
            PDF_launch("/loginsmall.aspx", 480, 522);
            e.style.display = "";
        } else {
            if (d == "code") {
                show_status_tip("验证码不正确，请重新输入！");
                refresh_validate();
                e.style.display = "";
            } else {
                if (d == "badcontent") {
                    alert("很抱歉，问卷内容未通过审核，可能是因为您的问卷包含不当信息。\r\n如果您确认您的问卷内容没有任何问题，请与我们电话联系！");
                    window.location = "/html/contactus.aspx";
                } else {
                    if (d == "large") {
                        alert("您的问卷包含的数据过多，请适当精简，谢谢！");
                    } else {
                        if (d == "empty") {
                            alert("数据为空，请重试，谢谢！");
                        } else {
                            if (d == "haspub") {
                                alert("抱歉，此问卷已发布，不能再通过文本方式进行修改。您可以返回到”我的问卷“页面点击“设计问卷”--》“编辑问卷”进行修改！");
                            } else {
                                var a = d.split("&")[0];
                                switch (a) {
                                case "true":
                                    prevSaveData = c;
                                    activityID = d.split("&")[1];
                                    saveSuc(b, f);
                                    break;
                                case "false":
                                    alert("您输入的验证码有误，请重新输入！");
                                    break;
                                case "version":
                                    alert("很抱歉，由于问卷星系统版本升级，您本次操作未能成功执行，请您刷新页面或者重启浏览器后再次尝试！\n请注意：页面上的信息可能没有保存，请您先保存重要的数据后再刷新或重启浏览器！");
                                    break;
                                default:
                                    alert("服务器返回错误，请刷新页面或者重新再试一次！如果还是有错误，请单击返回“我的问卷”选择放弃更改并返回");
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
function windowGotoUrl(a) {
    window.location.href = a;
}
function saveSuc(a, c) {
    var b = "/wjx/design/designstart.aspx?activity=" + activityID;
    if (c == 2) {
        b = "/wjx/design/editquestionnaire.aspx?activity=" + activityID;
    }
    window.location = b;
}
var prevText = "";
function loadSaveText(d) {
    if (!isLogin) {
        return;
    }
    var c = "/Handler/loadsavedesigntxt.ashx?t=" + (new Date()).valueOf();
    var b = getXmlHttp();
    b.onreadystatechange = function() {
        if (b.readyState == 4) {
            if (b.status == 200) {
                if (!d) {
                    var e = unescape(b.responseText);
                    if (e) {
                        txtContent.value = e;
                    }
                } else {}
            }
        }
    };
    if (d) {
        var a = txtContent.value;
        if (prevText != a) {
            b.open("post", c);
            b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            b.send("text=" + encodeURIComponent(a));
            prevText = a;
        }
    } else {
        b.open("get", c);
        b.send(null);
    }
}
function valMobile(d) {
    var b = /(^\d{11}$)/;
    var c = txtMobile.value;
    var e = "lblMobMsg";
    var a = $(e);
    if (!c) {
        a.innerHTML = "请输入手机号码，问卷星工作人员创建完问卷后，会通过短信通知您！";
        return false;
    }
    if (c) {
        if (!b.exec(c)) {
            a.innerHTML = "手机号码输入不正确，请重新输入！";
            return false;
        }
    }
    return true;
}
var prevSubmitText = "";
function showApply() {
    var a = $("divApply");
    a.style.display = a.style.display == "none" ? "": "none";
}
function submitText(d) {
    if (!valMobile(d)) {
        return;
    }
    if (!txtContent.value) {
        lblMobMsg.innerHTML = "提交内容不能为空，请复制您的问卷文本到文本框中！";
        return;
    }
    PDF_close();
    var c = "/Handler/submitdesigntxt.ashx?t=" + (new Date()).valueOf();
    c += "&mob=" + txtMobile.value;
    var b = getXmlHttp();
    var a = txtContent.value;
    b.onreadystatechange = function() {
        if (b.readyState != 4) {
            return;
        }
        if (b.status != 200) {
            show_status_tip("很抱歉，由于网络异常您的提交没有成功，请再试一次！", 6000);
            return;
        }
        var f = b.responseText;
        if (f.indexOf("exceed") > -1) {
            divSubmitMsg.innerHTML = "您于" + f.split(",")[1] + "申请创建问卷的请求还未处理，处理完后才能再次申请。<br/>问卷星工作人员创建完问卷后，会通过短信和邮件通知您！";
        } else {
            if (f.indexOf("ok") > -1) {
                var e = f.split(",");
                if (e[1]) {
                    divSubmitMsg.innerHTML = "提交成功！您前面还有<b style='color:red;font-size:16px;'>" + e[1] + "</b>个用户在等待！<br/>问卷星工作人员创建完问卷后，会通过短信和邮件通知您！";
                } else {
                    divSubmitMsg.innerHTML = "提交成功！问卷星工作人员创建完问卷后，会通过短信和邮件通知您！";
                }
            }
        }
        PDF_launch("divNotStarnd", 480, 100);
    };
    if (prevSubmitText != a) {
        b.open("post", c);
        b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        b.send("text=" + encodeURIComponent(a));
        prevSubmitText = a;
    } else {
        divSubmitMsg.innerHTML = "您刚才申请创建问卷的请求还未处理，处理完后才能再次申请。<br/>问卷星工作人员创建完问卷后，会通过短信和邮件通知您！";
        PDF_launch("divNotStarnd", 480, 100);
    }
}
setInterval(function() {
    loadSaveText(true);
},
60000);
if (window.cbEnglish) {
    cbEnglish.onclick = function() {
        isEnglish = cbEnglish.checked;
        generateQs(txtContent.value);
    };
    isEnglish = cbEnglish.checked;
    if (isEnglish) {
        cbEnglish.onclick();
        cbEnglish.checked = true;
    }
    checkEnglish();
}