/*
options:
    color = the accent color of bottom and text. default is #2196F3
    title = the title in top screen
    factor = the factor to open as croper . -1 not set cropper as first page, 0 set cropper as image width and height size, 1, 1.2,2,.... set width depend on height. default is -1
    maxWidth = maximum of width image output. default is 2560
    maxHeight = maximum of height image output. default is 1440
    quality = factor of quality image output (0.92, 0.80, ...) default deppend to size of width and height input image.if be false is faster ignoreing this property (maxWidth,maxHeight,quality,type)
    type = type of image output ('image/jpeg' , 'image/png' , 'image/webp') default 'image/jpeg' 
*/
"use strict";
!function () {
    // ========================= global element var 
    const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];
    var inputarray = [];
    var urlarray = [];
    var selected = [];
    var ind = 0;
    var holdrotan = -1;
    var af = [100, 100, 100, 0, 0, 0, 0];
    var afo = [0, 0, 0, 0, 0];
    var img;
    var imgpar;
    var fimg;
    var mainimg;
    var simg;
    var mimg;
    var fr;
    var imf;
    var fes;
    var fef;
    var felt;
    var felb;
    var ferb;
    var fert;
    var fet;
    var fel;
    var feb;
    var fer;
    var hfactor = -1;
    var option;
    var mfreame;
    var filterf;
    var ifile;
    var isel;
    var iframe;
    var holdst;
    var ffc;
    var opna
    var hilight;
    var blm;
    var ifdoc;
    var titlenum;
    var titleselect;
    // ========================= image event var
    var rechange = false;
    var fclick = false;
    var isclick = false;
    var isrotate = false;
    var e1;
    var e2;
    var e3;
    var e4;
    var e5;
    var e6;
    var e7;
    var e8;
    var y;
    var x;
    var fw;
    var fh;
    var ft;
    var fl;
    // ========================= touch event var
    var istoch;
    var hypoth;
    var factor;
    var ofwi;
    var ofhe;
    var ofto;
    var ofle;
    // ======================== btn var
    var rotater;
    var rotate90;
    var filefill;
    var shorot;

    var cropbtn;
    var backbtn1;
    var backbtn;
    var tunebtn;

    var cancel;
    var reset;
    var secrop;
    var apply;

    var ftrc;
    var ftrr;
    var ftrd;

    var slra;
    var rng;
    var rads;

    window.Sharpimg = function (input_files, opt = []) {
        option = opt;
        urlarray = []
        inputarray = Array.from(input_files).filter(function (inp) {
            if (allowedFileTypes.includes(inp.type) || inp.type == "video/mp4") {
                urlarray.push(URL.createObjectURL(inp))
                return true
            }
            return false
        })
        change_file(ind)

        selected = []
        if (!opt.selected)
            opt.selected = Array.from(inputarray.keys())

        opt.selected.forEach(key => selected[key] = null);

        if (inputarray == undefined || inputarray.length == 0 || !option.ondata) {
            console.error("Sharpimg: check prameters")
            return SharpimgClose();
        }

        if (opt.silent) {
            return f_apply()
        }

        holdst = document.createElement('style');
        holdst.innerHTML = "body>*:not(#Sharpimg){display:none}"
        document.querySelector('head').appendChild(holdst);
        iframe = document.createElement('div');
        iframe.id = "Sharpimg";
        iframe.style = "top:0;left:0;width:100%;height:100%;position:absolute;";

        if (typeof iframe.attachShadow != "undefined") {
            ifdoc = iframe.attachShadow({ mode: 'closed' })
        } else {
            ifdoc = iframe.createShadowRoot();
        }
        ifdoc.innerHTML = `<div oncontextmenu="event.preventDefault();" id=mainsharpimg><style>#mainsharpimg{width:100%;height:100%;font-family:sans-serif;color:#fff;-webkit-tap-highlight-color:transparent;-moz-user-select:none;user-select:none}*{border:0;outline:0;position:relative;box-sizing:border-box}img{-webkit-user-drag:none}.cropfr,.filterf,.mainframe{height:100%;width:100%;overflow:hidden;background-color:#000}.fretools{height:60px;background:#000;display:flex;flex-flow:row;font-size:1.5em;padding-top:.5em}.fretools div{flex:1;text-align:center;cursor:pointer}.friamge{padding:15px;overflow:hidden;width:100%;height:1px}.image_frame{display: block;width:100%;}.image_frame_par{transform-origin:top left;width:100%;top:0;left:0;pointer-events:none;display:inline-block;position:absolute}.frame{position:absolute;width:100%;height:100%;box-shadow:0 0 0 2px rgba(255,255,255,0.7),0 0 0 200vw rgba(0,0,0,0.54);z-index:1}.felb,.felt,.ferb,.fert{width:40px;height:40px;position:absolute}.felt{left:-8px;top:-8px}.felb{left:-8px;bottom:-8px}.ferb{right:-8px;bottom:-8px}.fert{top:-8px;right:-8px}.felb>div,.felt>div,.ferb>div,.fert>div{width:20px;height:20px;position:absolute;pointer-events:none}.felt div{left:5px;top:5px;box-shadow:inset 3px 3px #eee}.felb div{left:5px;bottom:5px;box-shadow:inset 3px -3px #eee}.ferb div{right:5px;bottom:5px;box-shadow:inset -3px -3px #eee}.fert div{top:5px;right:5px;box-shadow:inset -3px 3px #eee}.feb,.fel,.fer,.fet{position:absolute}.fel{width:40px;height:100%;left:-20px}.feb{width:100%;height:40px;bottom:-20px}.fer{width:40px;height:100%;right:-20px}.fet{width:100%;height:40px;top:-20px}.ferl{opacity:0;transition:opacity .3s;position:absolute;background:rgba(255,255,255,0.7)}@media (pointer:fine){.frame:active .ferl{opacity:1}}.frameac .ferl{opacity:1}.few1{width:2px;height:100%;left:66%}.few2{width:2px;height:100%;left:33%}.feh1{width:100%;height:2px;top:33%}.feh2{width:100%;height:2px;bottom:33%}.framfil{width:100%;height:100%;display:none;}.rotate{height:45px}.icons{cursor:pointer;text-align:center;width:50px;height:50px;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;fill:#fff}.icons svg{pointer-events:none;width:28px;height:28px}.imagetool{left:50%;transform:translateX(-50%);max-width:800px;padding:5px}.rotatep{text-align:center}.rotatep ._range{margin-top:9px;max-width:400px;left:50%;transform:translateX(-50%)}.filefill{opacity:0;position:absolute;top:0;left:0;bottom:0;right:0}.maintool{position:absolute;bottom:0;width:100%;justify-content:center;height:60px;font-size:25px}#ftrd,#secrop{color:var(--color)}.title{z-index:10;position:absolute;width:100%;padding:10px;}.titlenum:not(:empty){font-weight:bold;font-size:19px;text-align:center;padding:4px 8px;background:#ff000000;margin:9px 10px;min-width:36px;height:36px;border-radius:100px;border:3px solid #fff;}.titleselect{background:#ff000000;margin:7px 10px;width:40px;height:40px;border-radius:100px;border:3px solid #fff;transition:140ms;}.titleselect.a{background:var(--color);border:3px solid transparent}.titleselect svg{fill:#fff;left:-7px;top:-7px;width:48px;height:48px;position:absolute;display:none}.titleselect.a svg{display:block}.title>span{font-size:25px;padding:10px;display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.mainframe:after{content:"";width:100%;height:0px;top:0;z-index:2;position:absolute;box-shadow: 0px -17px 124px 55px #060606f0;}.apply{width:55px;height:55px;border-radius:100px;background-color:var(--color);left:50%;transform:translateX(-50%);bottom:7px}.apply .icons{width:55px;height:55px;-webkit-mask-size:38px 38px}.maintool>div{margin:0 30px;z-index:3;}.mainimg{height:1px;overflow:hidden}.maintool:after{content:"";width:100%;height:0px;bottom:0;z-index:2;position:absolute;box-shadow: 0px -17px 124px 55px #060606f0;}.simg{width:100%;height:100%;position:absolute;}.fimg,.mimg{width:100%;height:100%;object-fit:contain;pointer-events:none;}.pause:after,.pause:before{z-index:1;content:"";position:absolute;width:70px;height:70px;display:flex;top:50%;left:50%;transform:translate(-50%,-50%);border-radius:100px}.pause:before{background:#339}.pause:after{background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23fff' class='st0' d='M4,12V8.4c0-4.4,3.1-6.2,7-4l3.1,1.8L17.1,8c3.8,2.2,3.8,5.8,0,8l-3.1,1.8L11,19.6c-3.8,2.2-7,0.4-7-4V12z'/%3E%3C/svg%3E") center/35px no-repeat;margin-left:2px;}.col{display:flex;flex-flow:column}.row{display:flex;flex-flow:row}.ff{flex:1}.col>.ff{height:1px}.row>.ff{width:1px}.rowfit{display:flex;flex-flow:row;padding:15px}.fimgp{margin-right:25px;width:1px}._range{--color:#fff;--off-color:#555;padding:0 15px}._range>div{height:3px;width:100%;box-sizing:content-box;background-clip:content-box;background-color:var(--off-color);padding:15px 0;user-select:none;-webkit-tap-highlight-color:transparent;position:relative}._range[val]>div>div:first-child,._range[valmin]>div>div:nth-child(1),._range[valmin]>div>div:nth-child(2){width:32px;height:32px;padding:9px;box-sizing:border-box;background-clip:content-box;border-radius:20px;background-color:var(--color);margin-top:-14.5px;margin-left:-16px;position:absolute;display:inline-block;z-index:1;cursor:pointer}._range[val]>div>div:nth-child(2),._range[valmin]>div>div:nth-child(3){height:3px;position:absolute;background:red;display:inline-block;background-color:var(--color)}.filop{height:100%;width:450px;overflow-y:auto;margin-top:15px;align-items:center}.rads>div{margin:20px 13px 0px 0px;top:-3px;display:flex;justify-content:space-evenly;}.filop::-webkit-scrollbar{display:none}.rengs ._range{width:98%;margin-bottom:10px}.fimgp:active .fimg{filter:unset!important}.fimgp:active .hilight{display:none}.opna{width:150px;text-align:right;line-height:43px;font-size:18px;padding-right:15px;padding-top:4px}.opna div{display:inline-block;width:40px;color:var(--color)}.decbtn{opacity:.5;pointer-events:none}.shorot{margin-top:20px;color:var(--color)}.hilight{width:100%;height:100%;pointer-events:none;position:absolute;z-index:2;mix-blend-mode:screen;background-color:#fff;opacity:0;-webkit-mask-size:contain;-webkit-mask-repeat:no-repeat;-webkit-mask-position:center}.rads input{-webkit-appearance:none;appearance:none;width:22px;height:22px;margin:0;margin-right:2px;display:inline-block;border-radius:20px;border:2px solid}.rads input:not(:checked){background:0 0!important}@-moz-document url-prefix(){.fimg,.hilight{height:88vh}@media only screen and (max-width:900px){.fimg,.hilight{height:55vh}}}@media only screen and (max-width:900px){.titleselect{width:35px;height:35px}.titlenum:not(:empty){font-size:15px;padding:5px 6px;min-width:32px;height:32px;}.titleselect svg{left:-7px;top:-6px;width:42px;height:42px}.few1,.few2{width:1.5px;}.feh1,.feh2{height:1.5px;}.title>span{font-size:22px;padding:12px;}.maintool {padding-right:60px;}.maintool>div{margin:0 10px;}.applyp{position:absolute;right:13px;}.apply{width:45px;height:45px;bottom:-2px}.apply .icons{width:45px;height:45px;}.rengs{margin-top:9px}.fretools{font-size:.9em;padding-top:1.2em}.icons svg{width:24px;height:24px}.opna{font-size:15px;width:130px}.title{font-size:20px}.rowfit{flex-flow:column}.filop{height:180px;width:100%;align-items:unset}.fimgp{width:auto;margin-right:0;height:1px;overflow:hidden}.rads input{width:18px;height:18px;margin:0}}</style><meta charset=utf-8><div class="col mainframe"><div class="title row"><div class="icons backbtn1"><svg viewBox="0 0 24 24"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path></svg></div><span class="ff">Image crop</span><div class=titlenum></div><div class=titleselect><svg viewBox="0 0 24 24"><path d="M11.56 1.266a10.96 10.96 0 0 0-5.245 1.616C5.021 3.689 3.681 5.028 2.893 6.3a10.78 10.78 0 0 0-1.392 7.96 10.952 10.952 0 0 0 1.381 3.425c.811 1.3 2.133 2.622 3.433 3.433a10.982 10.982 0 0 0 3.429 1.383c1.412.307 3.1.307 4.512 0a11.016 11.016 0 0 0 3.438-1.389c1.286-.802 2.616-2.132 3.418-3.418a10.746 10.746 0 0 0 1.603-6.311c-.043-.73-.097-.904-.337-1.087-.135-.103-.184-.116-.438-.116-.252 0-.304.013-.433.112-.29.221-.306.298-.279 1.315.026.954-.011 1.49-.152 2.2a9.297 9.297 0 0 1-2.535 4.734c-1.335 1.335-3.12 2.265-4.941 2.575-1.095.186-2.432.165-3.494-.056-3.332-.692-6.048-3.217-7.002-6.51-.464-1.601-.464-3.499 0-5.1a9.267 9.267 0 0 1 7.928-6.652c.566-.061 1.928-.029 2.428.058.821.143 1.638.39 2.355.713.2.09.427.178.504.195.492.111.985-.414.843-.896-.108-.365-.303-.498-1.303-.89a11.019 11.019 0 0 0-4.299-.712M21.8 3.288c-.171.036-.43.288-4.99 4.844l-4.809 4.806-1.311-1.304c-1.24-1.235-1.32-1.307-1.5-1.345-.58-.12-1.021.321-.901.901.038.181.115.266 1.625 1.783.925.929 1.652 1.627 1.743 1.675.194.1.48.106.666.013.192-.096 10.22-10.119 10.324-10.318.211-.406-.013-.951-.429-1.044a5.11 5.11 0 0 0-.178-.038.958.958 0 0 0-.24.027"/></svg></div></div><div class="ff mainimg"></div><div class="row maintool"><div class="icons backbtn"><svg viewBox="0 0 24 24"><path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"/></svg></div><div class="icons cropbtn"><svg viewBox="0 0 24 24"><path d="M17 15h2V7c0-1.1-.9-2-2-2H9v2h7c.55 0 1 .45 1 1v7zm-9 2c-.55 0-1-.45-1-1V2c0-.55-.45-1-1-1s-1 .45-1 1v3H2c-.55 0-1 .45-1 1s.45 1 1 1h3v10c0 1.1.9 2 2 2h10v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1H8z"/></svg></div><div class="icons tunebtn"><svg viewBox="0 0 24 24"><path d="M3 18c0 .55.45 1 1 1h5v-2H4c-.55 0-1 .45-1 1zM3 6c0 .55.45 1 1 1h9V5H4c-.55 0-1 .45-1 1zm10 14v-1h7c.55 0 1-.45 1-1s-.45-1-1-1h-7v-1c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1zM7 10v1H4c-.55 0-1 .45-1 1s.45 1 1 1h3v1c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1zm14 2c0-.55-.45-1-1-1h-9v2h9c.55 0 1-.45 1-1zm-5-3c.55 0 1-.45 1-1V7h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V4c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1z"/></svg></div><div class=applyp><div class="ff apply"><div class=icons><svg viewBox="0 0 24 24"><path d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z"/></svg></div></div></div></div></div><div class="col cropfr"style=display:none><div class="ff friamge"><div class=framfil><div class=frame><div class=fet></div><div class=fel></div><div class=feb></div><div class=fer></div><div class=felt><div></div></div><div class=felb><div></div></div><div class=ferb><div></div></div><div class=fert><div></div></div><div class="ferl few1"></div><div class="ferl few2"></div><div class="ferl feh1"></div><div class="ferl feh2"></div></div><div class=image_frame_par><img class=image_frame></div></div></div><div><div class="row imagetool"><div class="icons slra"><select class=filefill><option value=-1>Free<option value=0>Orginal<option value=1>Square<option value=1.5>2:3<option value=1.666>3:5<option value=1.333>3:4<option value=1.25>4:5<option value=1.4>5:7<option value=1.777>9:16</select> <svg viewBox="0 0 24 24"><path d="M16 10h-2v2h2v-2zm0 4h-2v2h2v-2zm-8-4H6v2h2v-2zm4 0h-2v2h2v-2zm8-6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1 14H5c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"/></svg></div><div class="ff rotatep"><div class=shorot>0</div></div><div class="icons rotate90"rot=0><svg viewBox="0 0 24 24"><path d="M5.93 7.83l-3.65 3.66c-.78.78-.78 2.05 0 2.83l3.66 3.66c.78.78 2.05.78 2.83 0l3.66-3.65c.78-.78.78-2.05 0-2.83L8.76 7.82c-.79-.78-2.05-.78-2.83.01zM4.4 12.19l2.25-2.25c.39-.39 1.02-.39 1.42 0l2.24 2.24c.39.39.39 1.02 0 1.41l-2.25 2.25c-.39.39-1.02.39-1.42 0L4.4 13.61c-.39-.39-.39-1.03 0-1.42zm14.96-5.55C17.61 4.88 15.3 4 13 4v-.83c0-.89-1.08-1.34-1.71-.71L9.47 4.29c-.39.39-.39 1.02 0 1.41l1.83 1.83c.62.63 1.7.19 1.7-.7V6c2.02 0 4.03.86 5.45 2.61 2.05 2.52 2.05 6.27 0 8.79C17.03 19.14 15.02 20 13 20c-.78 0-1.55-.13-2.29-.39-.36-.12-.75-.01-1.02.26-.5.5-.34 1.39.34 1.62.96.34 1.96.51 2.97.51 2.3 0 4.61-.88 6.36-2.64 3.52-3.51 3.52-9.21 0-12.72z"/></svg></div></div></div><div class=fretools><div id=cancel>CANCEL</div><div id=reset>RESET</div><div id=secrop>CROP</div></div></div><div class="col filterf"style=display:none><div class="ff rowfit"><div class="ff fimgp"><div class=hilight></div><img class=fimg></div><div class="row filop"><div class=opna>Brightness<div>0</div>Contrast<div>0</div>Saturate<div>0</div>Fade<div>0</div>Shadow<div>0</div>Alpha<div>0</div>Shadow<div></div>highlight<div></div></div><div class="ff rengs"><div class=filtrrng></div><div><div class=rads><div><input name=h style=background:#fff;border-color:#fff type=radio value=ffffff checked> <input name=h style=background:#fd4c4c;border-color:#fd4c4c type=radio value=fd4c4c> <input name=h style=background:#f48022;border-color:#f48022 type=radio value=f48022> <input name=h style=background:#ffcd00;border-color:#ffcd00 type=radio value=ffcd00> <input name=h style=background:#81d281;border-color:#81d281 type=radio value=81d281> <input name=h style=background:#71c5d6;border-color:#71c5d6 type=radio value=71c5d6> <input name=h style=background:#0072bc;border-color:#0072bc type=radio value=0072bc> <input name=h style=background:#662d91;border-color:#662d91 type=radio value=662d91> <input name=h style=background:#222;border-color:#222 type=radio value=222222></div><div><input name=h style=background:#fff;border-color:#fff type=radio value=ffffff h> <input name=h style=background:#fd4c4c;border-color:#fd4c4c type=radio value=fd4c4c h> <input name=h style=background:#f48022;border-color:#f48022 type=radio value=f48022 h> <input name=h style=background:#ffcd00;border-color:#ffcd00 type=radio value=ffcd00 h> <input name=h style=background:#81d281;border-color:#81d281 type=radio value=81d281 h> <input name=h style=background:#71c5d6;border-color:#71c5d6 type=radio value=71c5d6 h> <input name=h style=background:#0072bc;border-color:#0072bc type=radio value=0072bc h> <input name=h style=background:#662d91;border-color:#662d91 type=radio value=662d91 h> <input name=h style=background:#222;border-color:#222 type=radio value=222222 h></div></div></div></div></div></div><div class=fretools><div id=ftrc>CANCEL</div><div id=ftrr>RESET</div><div id=ftrd>DONE</div></div></div></div>`;
        document.body.insertAdjacentElement('afterbegin', iframe);

        // select elements
        titleselect = esc(".titleselect");
        titlenum = esc(".titlenum");
        img = esc(".image_frame_par");
        imgpar = esc(".image_frame");
        fimg = esc(".fimg");
        mainimg = esc(".mainimg");
        fr = esc(".cropfr");
        imf = esc(".friamge");
        fes = esc(".frame");
        fef = esc(".framfil");
        felt = esc(".felt");
        felb = esc(".felb");
        ferb = esc(".ferb");
        fert = esc(".fert");
        fet = esc(".fet");
        fel = esc(".fel");
        feb = esc(".feb");
        fer = esc(".fer");
        cancel = esc("#cancel");
        reset = esc("#reset");
        secrop = esc("#secrop");
        ftrc = esc("#ftrc");
        ftrr = esc("#ftrr");
        ftrd = esc("#ftrd");
        rotater = esc(".rotater");
        rotate90 = esc(".rotate90");
        shorot = esc(".shorot");
        filefill = esc(".filefill");
        mfreame = esc(".mainframe");
        filterf = esc(".filterf");
        slra = esc(".slra");

        opna = esc(".opna");

        cropbtn = esc(".cropbtn");
        tunebtn = esc(".tunebtn");
        backbtn1 = esc(".backbtn1");
        backbtn = esc(".backbtn");
        apply = esc(".apply");
        hilight = esc(".hilight");

        rads = esc(".rads");
        rng = esc('.filtrrng');



        if (ind == 0) {
            mainimg.innerHTML = '<div class=simg i="' + 0 + '" style="left:0%;top:0%"></div>' + (inputarray.length > 1 ? '<div class=simg style="left:100%;top:0%" i="' + 1 + '"></div>' : "");
            simg = mainimg.children[0]
        } else if (ind == inputarray.length - 1) {
            mainimg.innerHTML = '<div class=simg style="left:-100%;top:0%" i="' + (ind - 1) + '"></div><div class=simg i="' + ind + '" style="left:0%;top:0%"></div>';
            simg = mainimg.children[1]
        } else {
            mainimg.innerHTML = '<div class=simg style="left:-100%;top:0%" i="' + (ind - 1) + '"></div><div class=simg i="' + ind + '" style="left:0%;top:0%"></div><div class=simg style="left:100%;top:0%" i="' + (ind + 1) + '"></div>';
            simg = mainimg.children[1]
        }
        create_mimg()
        // simg.style.visibility = "visible"
        mimg = simg.firstChild

        rng.appendChild(_range('<div class="_range" center=100 val=100 max=150 min=50 filt=0></div>', rngchange));
        rng.appendChild(_range('<div class="_range" center=100 val=100 max=150 min=50 filt=1></div>', rngchange));
        rng.appendChild(_range('<div class="_range" center=100 val=100 max=200 min=0 filt=2></div>', rngchange));
        rng.appendChild(_range('<div class="_range" val=0 max=200 min=0 filt=3></div>', rngchange));
        rng.appendChild(_range('<div class="_range" center=0 val=0 max=30 min=-30 filt=4></div>', rngchange));
        rng.appendChild(_range('<div class="_range" val=0 max=50 min=0 filt=5></div>', rngchange));
        var rotaterp = esc(".rotatep")
        rotater = _range('<div class="_range" center=0 val=0 max=45 min=-45></div>', f_input);
        rotaterp.insertBefore(rotater, rotaterp.firstChild);
        // call functions

        titleselect.addEventListener('click', select_item);
        imgpar.addEventListener('load', f_loadcrop);
        fimg.addEventListener('load', f_fimgl);
        mimg.addEventListener('load', checkoriantion);
        if (mimg.tagName == "IMG")
            mimg.style.visibility = "hidden"
        // mpuse event
        imf.addEventListener("mousedown", f_msdown);
        imf.addEventListener("mousemove", f_msmove);
        imf.addEventListener("mouseup", f_moseup);
        imf.addEventListener("mouseleave", f_moseup);
        // touch event
        imf.addEventListener("touchstart", f_tstart);
        imf.addEventListener("touchmove", f_tmove);
        imf.addEventListener("touchend", f_tend);
        // scroll event
        imf.addEventListener('wheel', f_scroll);
        // btn event
        rotate90.addEventListener('click', f_rotate90);
        //setup inputs
        rads.addEventListener('click', f_rads);

        var cols = document.createElement('style');
        if (option.color == undefined) {
            cols.innerHTML = "#mainsharpimg{--color:#2196F3}"
        } else {
            cols.innerHTML = "#mainsharpimg{--color:" + option.color + "}";
        }
        ifdoc.appendChild(cols);

        if (typeof option.title != "undefined") {
            esc(".title span").innerHTML = option.title
        }

        if (option.factor != undefined)
            hfactor = option.factor;
        else {
            hfactor = -1;
        }

        if (hfactor == -1) {
            filefill.addEventListener('change', f_filefill);
            cancel.onclick = f_backtom;
            mimg.src = isel;
        } else {
            slra.style.visibility = "hidden";
            ffc = true;
            cancel.onclick = SharpimgClose;
            mfreame.style.display = "none";
            fr.style.display = "flex";
            f_res();
            imgpar.src = isel;
        }
        // define calback functions

        reset.onclick = f_resbtn;
        secrop.onclick = f_croped;

        tunebtn.onclick = f_tune;
        apply.onclick = f_apply;
        cropbtn.onclick = f_cropbtn;
        backbtn1.onclick = SharpimgClose;
        backbtn.onclick = SharpimgClose;

        ftrc.onclick = f_backtom;
        ftrr.onclick = f_ftrr;
        ftrd.onclick = f_ftrd;

        window.addEventListener("keydown", f_dsk);
        window.addEventListener('resize', f_res);
        f_res();
        call_main_movement()
        check_item_page(simg)
    }
    function create_mimg() {
        for (let i = 0; i < mainimg.children.length; i++) {
            const child = mainimg.children[i]
            const c_ind = +child.getAttribute("i")
            if (!child.classList.contains("loaded")) {
                child.classList.add("loaded")
                // if (c_ind == ind) {
                //     simg = child
                // }
                if (allowedFileTypes.includes(inputarray[c_ind].type))
                    child.innerHTML = '<img class=mimg src="' + urlarray[c_ind] + '">'
                else {
                    child.innerHTML = '<video loop class=mimg src="' + urlarray[c_ind] + '">'
                    child.classList.add("pause")
                }
            }
        }
    }
    function main_click(e) {
        if (mimg.paused) {
            mimg.play()
            simg.classList.remove("pause")
        } else if (mimg.pause) {
            mimg.pause()
            simg.classList.add("pause")
        }
        else if (e) {
            select_item()
        }
    }
    function select_item() {
        if (ind in selected) {
            titleselect.classList.remove("a")
            delete selected[ind]
        }
        else {
            titleselect.classList.add("a")
            selected[ind] = null
        }
        titlenum.innerHTML = Object.keys(selected).length || ""
    }
    function check_item_page(last) {
        if (!(ind in selected)) {
            titleselect.classList.remove("a")
        }
        else {
            titleselect.classList.add("a")
        }
        titlenum.innerHTML = Object.keys(selected).length || ""
        cropbtn.style.fill = (ifile.data && ifile.data.crop) ? "var(--color)" : "";
        tunebtn.style.fill = (ifile.data && ifile.data.tun) ? "var(--color)" : "";
        if (last.firstChild.pause) {
            last.firstChild.pause();
            last.firstChild.currentTime = 0;
            last.classList.add("pause")
        }
        if (mimg.paused) {
            cropbtn.classList.add("decbtn")
            tunebtn.classList.add("decbtn")
        } else {
            cropbtn.classList.remove("decbtn")
            tunebtn.classList.remove("decbtn")
        }
    }
    function change_file(i, inp) {
        if (inp) {
            inp.data = ifile.data || {}
            inputarray[i] = inp
            urlarray[i] = URL.createObjectURL(inp)
        }
        ifile = inputarray[i];
        isel = urlarray[i];
    }

    function f_loadcrop() {
        fef.style.display = "block";
        imgpar.style.visibility = "hidden";
        checkoriantion.call(imgpar)
        f_res()
    }
    function esc(a) {
        return ifdoc.querySelector(a);
    }
    function f_rads() {
        var rg = rng.children[5];
        if (rg.val == "0") {
            rg.setVal(15);
            rngchange.call(rg);
        }
        var t = rads.querySelector("input:checked");
        if (typeof t.attributes.h != "undefined") {
            blm = false;
            hilight.style.setProperty("mix-blend-mode", "unset");
        } else {
            blm = true;
            hilight.style.setProperty("mix-blend-mode", "screen");
        }
        hilight.style.backgroundColor = "#" + t.value;
    }
    function f_resbtn() {
        reset_rot()
        f_res();
    }
    function f_backtom() {
        reset_rot()
        ftrd.classList.remove("decbtn");
        secrop.classList.remove("decbtn");
        fr.style.display = "none";
        filterf.style.display = "none";
        mfreame.style.display = "flex";
        mimg.src = isel;
    }
    function f_ftrr() {
        fimg.style.filter = "";
        for (var i = 0; i < rng.children.length; i++) {
            var th = rng.children[i];
            th.setVal(th.attributes.val.value);
            rngchange.call(th);
        }
    }
    function f_ftrd() {
        ftrd.classList.add("decbtn");
        const index = ind
        setTimeout(function () {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var w = fimg.naturalWidth;
            var h = fimg.naturalHeight;
            canvas.width = w;
            canvas.height = h;
            ctx.filter = "brightness(" + (af[0] + afo[0]) + "%) contrast(" + (af[1] + afo[1]) + "%) saturate(" + Math.max(af[2] + afo[2], 0) + "%) invert(" + (af[3] + afo[3]) + "%)";
            ctx.drawImage(fimg, 0, 0, w, h);
            ctx.filter = "none";
            if (blm) {
                ctx.globalCompositeOperation = 'screen'
            }
            ctx.fillStyle = "#" + rads.querySelector("input:checked").value;
            ctx.globalAlpha = af[5] / 100;
            ctx.fillRect(0, 0, w, h);
            canvas.toBlob(function (file) {
                change_file(index, file)
                file.data.tun = true
                tunebtn.style.fill = "var(--color)";
                f_backtom();
                f_ftrr();
            });
        }, 5);
    }
    function rngchange() {
        var fil = this.attributes.filt.value;
        var ret = Number(this.val);
        if (fil == "5") {
            hilight.style.opacity = ret / 100;
            af[5] = ret;
            opna.children[5].innerHTML = Math.floor(af[5]);
            return;
        }
        if (fil == "3") {
            ret = ret / 10;
        } else if (fil == "4") {
            if (ret < 0) {
                afo[0] = ret / 4;
                afo[2] = ret;
            } else {
                afo[0] = ret / 2;
                afo[2] = ret / 1.3;
            }
            afo[1] = -ret;
        }
        af[fil] = ret;
        fimg.style.filter = "brightness(" + (af[0] + afo[0]) + "%) contrast(" + (af[1] + afo[1]) + "%) saturate(" + Math.max(af[2] + afo[2], 0) + "%) invert(" + (af[3] + afo[3]) + "%)";
        this.parentElement;
        opna.children[0].innerHTML = Math.floor(af[0] - 100)
        opna.children[1].innerHTML = Math.floor(af[1] - 100)
        opna.children[2].innerHTML = Math.floor(af[2] - 100)
        opna.children[3].innerHTML = Math.floor(af[3])
        opna.children[4].innerHTML = Math.floor(af[4])

    }
    function f_tune() {
        mfreame.style.display = "none";
        filterf.style.display = "flex";
        fimg.src = isel;
    }
    function f_fimgl() {
        hilight.style.setProperty("-webkit-mask-image", "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + fimg.naturalWidth + "' height='" + fimg.naturalHeight + "'%3E%3Crect width='100%25' height='100%25' /%3E%3C/svg%3E\")")
        holdroteate_fimg(fimg)
    }
    function f_cropbtn() {
        mfreame.style.display = "none";
        fr.style.display = "flex";
        fef.style.display = "none";
        imgpar.src = isel;
        reset_rot()
        if (ffc) {
            cancel.onclick = f_backtom
            ffc = false;
        }
    }
    function f_apply() {
        var keys = Object.keys(selected)
        keys.sort(function (a, b) { return a - b; })
        close_f()
        // apply.classList.add("decbtn"); 
        for (const key in selected) {
            if (allowedFileTypes.includes(inputarray[key].type))
                output(urlarray[key], key)
            else {
                extractFrameFromBlob(urlarray[key], key)
            }
        }
    }
    async function extractFrameFromBlob(url, key) {
        const video = document.createElement("video");
        video.src = url;
        video.addEventListener("loadedmetadata", () => {
            video.currentTime = Math.round(1 * (video.duration || 100) / 100);
        });
        video.addEventListener("seeked", () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, video.videoWidth, canvas.height);
            var quality = option.quality
            if (quality === undefined) {
                var size = ifile.size;
                var quality = 0.3;
                if (size < 40960) {
                    quality = 0.94;
                } else if (size < 102400) {
                    quality = 0.8;
                } else if (size < 204800) {
                    quality = 0.6;
                } else if (size < 614400) {
                    quality = 0.5;
                } else if (size < 1048576) {
                    quality = 0.4;
                }
            }
            canvas.toBlob(option.ondata.bind(null, key, inputarray[key]), option.type || 'image/jpeg', quality || 1);
        });

    }
    function output(url, key) {
        if (option.quality == -1) {
            return option.ondata(key, ifile)
        }
        var exit = document.createElement("img")
        exit.addEventListener("load", function () {
            var lastw = exit.naturalWidth
            var lasth = exit.naturalHeight
            var rot = (holdrotan + 1) * 90
            if (holdrotan != -1) {
                var canvas1 = document.createElement('canvas');
                var ctx1 = canvas1.getContext('2d');
                var w = exit.naturalWidth
                var h = exit.naturalHeight

                if (rot == 90 || rot == 270) {
                    lastw = h;
                    lasth = w;
                    canvas1.width = h;
                    canvas1.height = w;
                    ctx1.translate(h / 2, w / 2);
                } else if (rot == 0 || rot == 180) {
                    canvas1.width = w;
                    canvas1.height = h;
                    lastw = w;
                    lasth = h;
                    ctx1.translate(w / 2, h / 2);
                }
                ctx1.rotate(rot * Math.PI / 180);
                ctx1.drawImage(exit, -w / 2, -h / 2, w, h);
                exit = canvas1
            }

            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var objfit = getObjectFitSize(option.maxWidth || 2560, option.maxHeight || 1440, lastw, lasth);
            var w = objfit.width;
            var h = objfit.height;
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(exit, 0, 0, w, h);
            var quality = option.quality
            if (quality === undefined) {
                var size = ifile.size;
                var quality = 0.4;
                if (size < 40960) {
                    quality = 1;
                } else if (size < 102400) {
                    quality = 0.94;
                } else if (size < 204800) {
                    quality = 0.8;
                } else if (size < 614400) {
                    quality = 0.6;
                } else if (size < 1048576) {
                    quality = 0.5;
                }
            }
            canvas.toBlob(option.ondata.bind(null, key), option.type || 'image/jpeg', quality || 1);
        })
        exit.src = url
    }
    window.SharpimgClose = close_f
    function close_f() {
        // apply.classList.remove("decbtn");
        window.removeEventListener("keydown", f_dsk);
        window.removeEventListener('resize', f_res);
        holdst && holdst.remove();
        iframe && iframe.remove();
        option.onclose && option.onclose()
    }
    function getObjectFitSize(containerWidth, containerHeight, width, height) {
        containerWidth = Math.min(width, containerWidth)
        containerHeight = Math.min(height, containerHeight)
        var doRatio = width / height;
        var cRatio = containerWidth / containerHeight;
        var targetWidth = 0;
        var targetHeight = 0;
        if (doRatio > cRatio) {
            targetWidth = containerWidth;
            targetHeight = targetWidth / doRatio;
        } else {
            targetHeight = containerHeight;
            targetWidth = targetHeight * doRatio;
        }
        return {
            width: targetWidth,
            height: targetHeight,
        };
    }

    function f_filefill() {
        hfactor = Number(this.value)
        f_res();
    }
    function imagew(e) {
        if (isrotate)
            img.style.height = e
        else
            img.style.width = e
    }

    function f_rotate90(rot) {
        if (typeof rot != "number")
            rot = +rotate90.attributes["rot"].value;
        var rotat;
        var trans;
        if (rot == 0) {
            rotat = 1;
            isrotate = true
            trans = "rotate(" + 90 + "deg) translate(0,-100%)"
        } else if (rot == 1) {
            rotat = 2;
            isrotate = false
            trans = "rotate(" + 180 + "deg) translate(-100%,-100%)"
        } else if (rot == 2) {
            rotat = 3;
            isrotate = true
            trans = "rotate(" + 270 + "deg) translate(-100%,0)"
        } else if (rot == 3) {
            rotat = 0;
            isrotate = false
            trans = "rotate(" + 0 + "deg) translate(0,0)"
        }

        if (!isrotate) {
            img.style.height = "auto"
            imgpar.style.height = "auto"
            imgpar.style.width = "100%"
        } else {
            img.style.width = "auto"
            imgpar.style.width = "auto"
            imgpar.style.height = "100%"
        }
        f_res();
        rotate90.setAttribute("rot", rotat);
        img.style.transform = trans
        rotater.setVal(0);
        f_input.call(rotater);
    }

    function reset_rot() {
        rotate90.setAttribute("rot", 0);
        imgpar.style.transform = ''
        img.style.transform = ''
        img.style.height = "auto"
        imgpar.style.height = "auto"
        imgpar.style.width = "100%"
        isrotate = false
        rotater.setVal(0);
        f_input.call(rotater);
        call_holdrot()
    }

    function f_input() {
        imgpar.style.transform = "rotate(" + Number(this.val) + "deg)";
        shorot.innerHTML = Number(this.val);
    }
    function f_croped() {
        const index = ind
        secrop.classList.add("decbtn");
        setTimeout(function () {
            var rot = +rotate90.attributes["rot"].value * 90
            var output = imgpar;
            var lastw = imgpar.naturalWidth
            var lasth = imgpar.naturalHeight

            // if (true) {
            var canvas1 = document.createElement('canvas');
            var ctx1 = canvas1.getContext('2d');
            var w = imgpar.naturalWidth
            var h = imgpar.naturalHeight

            if (rot == 90 || rot == 270) {
                lastw = h;
                lasth = w;
                canvas1.width = h;
                canvas1.height = w;
                ctx1.translate(h / 2, w / 2);
            } else if (rot == 0 || rot == 180) {
                canvas1.width = w;
                canvas1.height = h;
                lastw = w;
                lasth = h;
                ctx1.translate(w / 2, h / 2);
            }
            ctx1.rotate(rot * Math.PI / 180);
            ctx1.drawImage(output, -w / 2, -h / 2, w, h);
            output = canvas1
            // }

            if (rotater.val != 0) {
                var canvas2 = document.createElement('canvas');
                var ctx2 = canvas2.getContext('2d');
                var w = lastw
                var h = lasth
                canvas2.width = w;
                canvas2.height = h;
                ctx2.translate(w / 2, h / 2);
                ctx2.rotate(rotater.val * Math.PI / 180);
                ctx2.drawImage(output, -w / 2, -h / 2, w, h);
                output = canvas2
            }
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var w = fes.offsetWidth / img.offsetWidth * imgpar.naturalWidth
            var h = fes.offsetHeight / img.offsetHeight * imgpar.naturalHeight;

            canvas.width = w;
            canvas.height = h;

            ctx.drawImage(output, (fes.offsetLeft - img.offsetLeft) / img.offsetWidth * imgpar.naturalWidth, (fes.offsetTop - img.offsetTop) / img.offsetHeight * imgpar.naturalHeight, w, h, 0, 0, w, h);

            canvas.toBlob(function (file) {
                if (typeof canvas1 != "undefined")
                    canvas1.remove();
                if (typeof canvas2 != "undefined")
                    canvas2.remove();
                canvas.remove();
                change_file(index, file)
                file.data.crop = true
                cropbtn.style.fill = "var(--color)";
                reset_rot()
                holdrotan = -1;
                holdroteate_fimg(mimg)
                f_backtom();
            });
        }, 5);
    }

    function f_res() {
        var fulw = fef.offsetWidth;
        var fulh = fef.offsetHeight;
        var imgw = (isrotate ? imgpar.naturalHeight : imgpar.naturalWidth);
        var imgh = (isrotate ? imgpar.naturalWidth : imgpar.naturalHeight);
        var secih = fulw * imgh / imgw;
        if (hfactor == -1 || hfactor == 0) {
            var comp = secih;
        } else {
            var comp = (fulw * hfactor);
        }
        if (comp > fulh) {
            var seciw = fulh * imgw / imgh;
            if (hfactor == -1 || hfactor == 0) {
                var frew = seciw;
            } else {
                var frew = fulh / hfactor;
            }
            fes.style.width = frew + "px";
            fes.style.height = fulh + "px";
            fes.style.left = (fulw - frew) / 2 + "px";
            fes.style.top = 0;
            if (seciw < frew) {
                imagew(frew + "px")
                img.style.top = (fulh - (isrotate ? img.offsetWidth : img.offsetHeight)) / 2 + "px";
                img.style.left = (fulw - frew) / 2 + "px";
            } else {
                imagew(seciw + "px")
                img.style.left = (fulw - seciw) / 2 + "px";
                img.style.top = 0;
            }
        } else {
            fes.style.width = fulw + "px";
            fes.style.height = comp + "px";
            fes.style.top = (fulh - comp) / 2 + "px";
            fes.style.left = 0;
            if (secih < comp) {
                imagew(comp * fulw / secih + "px")
                img.style.top = (fulh - (isrotate ? img.offsetWidth : img.offsetHeight)) / 2 + "px";
                img.style.left = (fulw - (isrotate ? img.offsetHeight : img.offsetWidth)) / 2 + "px";
            } else {
                imagew(fulw + "px")
                img.style.top = (fulh - secih) / 2 + "px";
                img.style.left = 0;
            }
        }
    }

    function f_msdown(e) {
        var tar = e.target;
        e1 = tar.isEqualNode(felt);
        e2 = tar.isEqualNode(felb);
        e3 = tar.isEqualNode(ferb);
        e4 = tar.isEqualNode(fert);
        e5 = tar.isEqualNode(fet);
        e6 = tar.isEqualNode(fel);
        e7 = tar.isEqualNode(feb);
        e8 = tar.isEqualNode(fer);
        if (e1 || e2 || e3 || e4 || e5 || e6 || e7 || e8) {
            if (e1 || e5) {
                x = e.pageX - fes.offsetLeft;
                y = e.pageY - fes.offsetTop;
                fw = e.pageX + fes.offsetWidth;
                fh = e.pageY + fes.offsetHeight;
            } else if (e2 || e6) {
                x = e.pageX - fes.offsetLeft;
                fw = e.pageX + fes.offsetWidth;
                fh = e.pageY - fes.offsetHeight;
            } else if (e3 || e7) {
                fw = e.pageX - fes.offsetWidth;
                fh = e.pageY - fes.offsetHeight;
            } else if (e4 || e8) {
                y = e.pageY - fes.offsetTop;
                fw = e.pageX - fes.offsetWidth;
                fh = e.pageY + fes.offsetHeight;
            }
            if (hfactor == -1) fclick = true;
            else {
                if (hfactor == 0) {
                    hfactor = (isrotate ? img.offsetWidth : img.offsetHeight) / (isrotate ? img.offsetHeight : img.offsetWidth)
                }
                rechange = true;
                fw = fes.offsetWidth;
                ft = fes.offsetTop;
                fl = fes.offsetLeft;
                x = e.pageX;
                y = e.pageY;
            }
        } else {
            isclick = true;
            x = e.pageX - img.offsetLeft;
            y = e.pageY - img.offsetTop;
        }
    }

    function f_msmove(e) {
        if (isclick) {
            img.style.left = (e.pageX - x) + 'px';
            img.style.top = (e.pageY - y) + 'px';
        } else if (fclick) {
            if (e1) {
                fes.style.left = (e.pageX - x) + 'px';
                fes.style.top = (e.pageY - y) + 'px';
                fes.style.width = (fw - e.pageX) + 'px';
                fes.style.height = (fh - e.pageY) + 'px';
            } else if (e2) {
                fes.style.left = (e.pageX - x) + 'px';
                fes.style.width = (fw - e.pageX) + 'px';
                fes.style.height = (e.pageY - fh) + 'px';
            } else if (e3) {
                fes.style.width = (e.pageX - fw) + 'px';
                fes.style.height = (e.pageY - fh) + 'px';
            } else if (e4) {
                fes.style.top = (e.pageY - y) + 'px';
                fes.style.width = (e.pageX - fw) + 'px';
                fes.style.height = (fh - e.pageY) + 'px';
            } else if (e5) {
                fes.style.top = (e.pageY - y) + 'px';
                fes.style.height = (fh - e.pageY) + 'px';
            } else if (e6) {
                fes.style.left = (e.pageX - x) + 'px';
                fes.style.width = (fw - e.pageX) + 'px';
            } else if (e7) {
                fes.style.height = (e.pageY - fh) + 'px';
            } else if (e8) {
                fes.style.width = (e.pageX - fw) + 'px';
            }
        } else if (rechange) {
            if (e1 || e5) {
                var w = ((x - e.pageX + y - e.pageY) / (1 + hfactor));
                fes.style.top = ft - w * hfactor + 'px';
                fes.style.left = fl - w + 'px';
                fes.style.width = fw + w + 'px';
                fes.style.height = (fw + w) * hfactor + 'px';
            } else if (e2 || e6) {
                var w = ((x - e.pageX + e.pageY - y) / (1 + hfactor));
                fes.style.left = fl - w + 'px';
                fes.style.width = fw + w + 'px';
                fes.style.height = (fw + w) * hfactor + 'px';
            } else if (e3 || e7) {
                var w = ((e.pageX - x + e.pageY - y) / (1 + hfactor)) + fw;
                fes.style.width = w + 'px';
                fes.style.height = w * hfactor + 'px';
            } else if (e4 || e8) {
                var w = ((e.pageX - x + y - e.pageY) / (1 + hfactor));
                fes.style.top = ft - w * hfactor + 'px';
                fes.style.width = fw + w + 'px';
                fes.style.height = (fw + w) * hfactor + 'px';
            }
        }
    }

    function f_moseup() {
        if (isclick) {
            isclick = false;
            img.style.transition = "all 300ms";
            if (img.offsetLeft > fes.offsetLeft) {
                img.style.left = fes.offsetLeft + "px";
            } else if (img.offsetLeft + (isrotate ? img.offsetHeight : img.offsetWidth) < fes.offsetLeft + fes.offsetWidth) {
                img.style.left = fes.offsetLeft + fes.offsetWidth - (isrotate ? img.offsetHeight : img.offsetWidth) + "px";
            }
            if (img.offsetTop > fes.offsetTop) {
                img.style.top = fes.offsetTop + "px";
            } else if (img.offsetTop + (isrotate ? img.offsetWidth : img.offsetHeight) < fes.offsetTop + fes.offsetHeight) {
                img.style.top = fes.offsetTop + fes.offsetHeight - (isrotate ? img.offsetWidth : img.offsetHeight) + "px";
            }
            setTimeout(function () {
                img.style.transition = "none"
            }, 300);
        } else if (fclick || rechange) {
            rechange = false;
            fclick = false;
            fes.style.transition = "all 300ms";
            img.style.transition = "all 300ms";
            var crh = (fes.offsetHeight * fef.offsetWidth / fes.offsetWidth);
            if (crh > fef.offsetHeight) {
                var crw = (fes.offsetWidth * fef.offsetHeight / fes.offsetHeight);
                var crt = 0;
                var crl = ((fef.offsetWidth - crw) / 2);
                var criw = crw * (isrotate ? img.offsetHeight : img.offsetWidth) / fes.offsetWidth;
                var crih = criw * (isrotate ? img.offsetWidth : img.offsetHeight) / (isrotate ? img.offsetHeight : img.offsetWidth);
                crh = fef.offsetHeight;
            } else {
                var crw = fef.offsetWidth;
                var crt = ((fef.offsetHeight - crh) / 2);
                var crl = 0;
                var criw = crw * (isrotate ? img.offsetHeight : img.offsetWidth) / fes.offsetWidth;
                var crih = criw * (isrotate ? img.offsetWidth : img.offsetHeight) / (isrotate ? img.offsetHeight : img.offsetWidth);
            }
            var ileft = fes.offsetLeft - (criw * ((fes.offsetLeft - img.offsetLeft) / (isrotate ? img.offsetHeight : img.offsetWidth))) + crl - fes.offsetLeft;
            var itop = fes.offsetTop - (crih * ((fes.offsetTop - img.offsetTop) / (isrotate ? img.offsetWidth : img.offsetHeight))) + crt - fes.offsetTop;
            img.style.left = ileft + "px";
            img.style.top = itop + "px";
            imagew(criw + "px")
            fes.style.width = crw + "px";
            fes.style.height = crh + "px";
            fes.style.left = crl + "px";
            fes.style.top = crt + "px";
            if (crih < crh) {
                criw2 = crh * criw / crih;
                crih = criw2 * crih / criw;
                imagew(criw2 + "px")
                criw = criw2;
            }
            if (criw < crw) {
                imagew(crw + "px")
                crih = crw * crih / criw;
                criw = crw;
            }
            if (ileft > crl) {
                img.style.left = crl + "px";
            } else if (ileft + criw < crl + crw) {
                img.style.left = crl + crw - criw + "px";
            }
            if (itop > crt) {
                img.style.top = crt + "px";
            } else if (itop + crih < crt + crh) {
                img.style.top = crt + crh - crih + "px";
            }
            setTimeout(function () {
                fes.style.transition = "none"
                img.style.transition = "none"
            }, 300);
        }
    }

    function f_tstart(e) {
        fes.classList.add("frameac");
        istoch = e.touches.length == 2;
        var tar = e.target;
        e1 = tar.isEqualNode(felt);
        e2 = tar.isEqualNode(felb);
        e3 = tar.isEqualNode(ferb);
        e4 = tar.isEqualNode(fert);
        e5 = tar.isEqualNode(fet);
        e6 = tar.isEqualNode(fel);
        e7 = tar.isEqualNode(feb);
        e8 = tar.isEqualNode(fer);
        if (istoch) {
            ofwi = (isrotate ? img.offsetHeight : img.offsetWidth);
            ofhe = (isrotate ? img.offsetWidth : img.offsetHeight);
            ofle = img.offsetLeft;
            ofto = img.offsetTop;
            hypoth = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
            var rect = fef.getBoundingClientRect();
            x = ((e.touches[0].pageX + e.touches[1].pageX) / 2) - rect.left;
            y = ((e.touches[0].pageY + e.touches[1].pageY) / 2) - rect.top;
            factor = ((isrotate ? img.offsetHeight : img.offsetWidth) / fef.offsetWidth) * 1.6;
        }
        else if (e1 || e2 || e3 || e4 || e5 || e6 || e7 || e8) {
            e = e.touches[0];
            if (e1 || e5) {
                x = e.pageX - fes.offsetLeft;
                y = e.pageY - fes.offsetTop;
                fw = e.pageX + fes.offsetWidth;
                fh = e.pageY + fes.offsetHeight;
            } else if (e2 || e6) {
                x = e.pageX - fes.offsetLeft;
                fw = e.pageX + fes.offsetWidth;
                fh = e.pageY - fes.offsetHeight;
            } else if (e3 || e7) {
                fw = e.pageX - fes.offsetWidth;
                fh = e.pageY - fes.offsetHeight;
            } else if (e4 || e8) {
                y = e.pageY - fes.offsetTop;
                fw = e.pageX - fes.offsetWidth;
                fh = e.pageY + fes.offsetHeight;
            }
            if (hfactor == -1) fclick = true;
            else {
                if (hfactor == 0) {
                    hfactor = (isrotate ? img.offsetWidth : img.offsetHeight) / (isrotate ? img.offsetHeight : img.offsetWidth)
                }
                rechange = true;
                fw = fes.offsetWidth;
                ft = fes.offsetTop;
                fl = fes.offsetLeft;
                x = e.pageX;
                y = e.pageY;
            }
        } else {
            isclick = true;
            x = e.touches[0].pageX - img.offsetLeft;
            y = e.touches[0].pageY - img.offsetTop;
        }
    }

    function f_tmove(e) {
        e.preventDefault();
        if (istoch) {
            var dist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
            var o = (dist - hypoth) * factor;
            var secw = ofwi + o;
            var sech = secw * ofhe / ofwi;
            img.style.left = (ofle - x) / ofwi * (secw) + x + "px";
            img.style.top = (ofto - y) / ofhe * (sech) + y + "px";
            imagew(secw + "px")
        } else if (fclick) {
            e = e.touches[0];
            if (e1) {
                fes.style.left = (e.pageX - x) + 'px';
                fes.style.top = (e.pageY - y) + 'px';
                fes.style.width = (fw - e.pageX) + 'px';
                fes.style.height = (fh - e.pageY) + 'px';
            } else if (e2) {
                fes.style.left = (e.pageX - x) + 'px';
                fes.style.width = (fw - e.pageX) + 'px';
                fes.style.height = (e.pageY - fh) + 'px';
            } else if (e3) {
                fes.style.width = (e.pageX - fw) + 'px';
                fes.style.height = (e.pageY - fh) + 'px';
            } else if (e4) {
                fes.style.top = (e.pageY - y) + 'px';
                fes.style.width = (e.pageX - fw) + 'px';
                fes.style.height = (fh - e.pageY) + 'px';
            } else if (e5) {
                fes.style.top = (e.pageY - y) + 'px';
                fes.style.height = (fh - e.pageY) + 'px';
            } else if (e6) {
                fes.style.left = (e.pageX - x) + 'px';
                fes.style.width = (fw - e.pageX) + 'px';
            } else if (e7) {
                fes.style.height = (e.pageY - fh) + 'px';
            } else if (e8) {
                fes.style.width = (e.pageX - fw) + 'px';
            }
        } else if (rechange) {
            e = e.touches[0];
            if (e1 || e5) {
                var w = ((x - e.pageX + y - e.pageY) / (1 + hfactor));
                fes.style.top = ft - w * hfactor + 'px';
                fes.style.left = fl - w + 'px';
                fes.style.width = fw + w + 'px';
                fes.style.height = (fw + w) * hfactor + 'px';
            } else if (e2 || e6) {
                var w = ((x - e.pageX + e.pageY - y) / (1 + hfactor));
                fes.style.left = fl - w + 'px';
                fes.style.width = fw + w + 'px';
                fes.style.height = (fw + w) * hfactor + 'px';
            } else if (e3 || e7) {
                var w = ((e.pageX - x + e.pageY - y) / (1 + hfactor)) + fw;
                fes.style.width = w + 'px';
                fes.style.height = w * hfactor + 'px';
            } else if (e4 || e8) {
                var w = ((e.pageX - x + y - e.pageY) / (1 + hfactor));
                fes.style.top = ft - w * hfactor + 'px';
                fes.style.width = fw + w + 'px';
                fes.style.height = (fw + w) * hfactor + 'px';
            }
        } else if (isclick) {
            img.style.left = (e.touches[0].pageX - x) + 'px';
            img.style.top = (e.touches[0].pageY - y) + 'px';
        }
    }

    function f_tend(e) {
        fes.classList.remove("frameac");
        if (istoch) {
            x = e.touches[0].pageX - img.offsetLeft;
            y = e.touches[0].pageY - img.offsetTop;
            istoch = false;
            if ((isrotate ? img.offsetHeight : img.offsetWidth) < fes.offsetWidth) {
                imagew(fes.offsetWidth + "px")
            }
            if ((isrotate ? img.offsetWidth : img.offsetHeight) < fes.offsetHeight) {
                imagew(fes.offsetHeight * (isrotate ? img.offsetHeight : img.offsetWidth) / (isrotate ? img.offsetWidth : img.offsetHeight) + "px")
            }
            if (img.offsetLeft > fes.offsetLeft) {
                img.style.left = fes.offsetLeft + "px";
            } else if (img.offsetLeft + (isrotate ? img.offsetHeight : img.offsetWidth) < fes.offsetLeft + fes.offsetWidth) {
                img.style.left = fes.offsetLeft + fes.offsetWidth - (isrotate ? img.offsetHeight : img.offsetWidth) + "px";
            }
            if (img.offsetTop > fes.offsetTop) {
                img.style.top = fes.offsetTop + "px";
            } else if (img.offsetTop + (isrotate ? img.offsetWidth : img.offsetHeight) < fes.offsetTop + fes.offsetHeight) {
                img.style.top = fes.offsetTop + fes.offsetHeight - (isrotate ? img.offsetWidth : img.offsetHeight) + "px";
            }
        } else {
            f_moseup();
        }
    }

    function f_dsk(e) {
        if (e.ctrlKey == true && (e.which == '61' || e.which == '107' || e.which == '173' || e.which == '109' || e.which == '187' || e.which == '189')) {
            e.preventDefault();
        }
    }

    function f_scroll(e) {
        if (e.deltaMode == 1) {
            var dl = e.deltaY * 30;
        } else {
            var dl = e.deltaY * 1;
        }
        e.preventDefault();
        var rect = fef.getBoundingClientRect();
        var lastw = (isrotate ? img.offsetHeight : img.offsetWidth);
        var lasth = (isrotate ? img.offsetWidth : img.offsetHeight);
        var secw = (isrotate ? img.offsetHeight : img.offsetWidth) - dl * ((isrotate ? img.offsetHeight : img.offsetWidth) / fef.offsetWidth);
        var sech = secw * lasth / lastw;
        var elx = e.pageX - rect.left;
        var ely = e.pageY - rect.top;
        imagew(secw + "px")
        var chh = (isrotate ? img.offsetWidth : img.offsetHeight) < fes.offsetHeight
        if ((isrotate ? img.offsetWidth : img.offsetHeight) < fes.offsetHeight) {
            imagew(fes.offsetHeight * secw / sech + "px")
        }
        var chw = (isrotate ? img.offsetHeight : img.offsetWidth) < fes.offsetWidth;
        if ((isrotate ? img.offsetHeight : img.offsetWidth) < fes.offsetWidth) {
            imagew(fes.offsetWidth + "px")
        }
        if (!chh && !chw) {
            img.style.top = (img.offsetTop - ely) / lasth * sech + ely + "px";
            img.style.left = (img.offsetLeft - elx) / lastw * secw + elx + "px";
        }
        if (img.offsetLeft > fes.offsetLeft) {
            img.style.left = fes.offsetLeft + "px";
        } else if (img.offsetLeft + (isrotate ? img.offsetHeight : img.offsetWidth) < fes.offsetLeft + fes.offsetWidth) {
            img.style.left = fes.offsetLeft + fes.offsetWidth - (isrotate ? img.offsetHeight : img.offsetWidth) + "px";
        }
        if (img.offsetTop > fes.offsetTop) {
            img.style.top = fes.offsetTop + "px";
        } else if (img.offsetTop + (isrotate ? img.offsetWidth : img.offsetHeight) < fes.offsetTop + fes.offsetHeight) {
            img.style.top = fes.offsetTop + fes.offsetHeight - (isrotate ? img.offsetWidth : img.offsetHeight) + "px";
        }
    }
    function getOrientation(file, callback) {
        var out = { 0x0112: -1 }
        var reader = new FileReader();
        reader.onload = function (e) {

            var view = new DataView(e.target.result);
            if (view.getUint16(0, false) != 0xFFD8) {
                out[0x0112] = -2
                return callback(out);
            }
            var length = view.byteLength, offset = 2;
            while (offset < length) {
                if (view.getUint16(offset + 2, false) <= 8) {
                    return callback(out);
                }
                var marker = view.getUint16(offset, false);
                offset += 2;
                if (marker == 0xFFE1) {
                    if (view.getUint32(offset += 2, false) != 0x45786966) {
                        return callback(out);
                    }

                    var little = view.getUint16(offset += 6, false) == 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    var tags = view.getUint16(offset, little);
                    offset += 2;
                    for (var i = 0; i < tags; i++) {
                        out[view.getUint16(offset + (i * 12), little)] = view.getUint16(offset + (i * 12) + 8, little)
                    }
                    return callback(out);
                }
                else if ((marker & 0xFF00) != 0xFF00) {
                    break;
                }
                else {
                    offset += view.getUint16(offset, false);
                }
            }
            return callback(out);
        };
        reader.readAsArrayBuffer(file);
    }
    function checkoriantion() {
        var that = this
        getOrientation(ifile, function (e) {
            that.style.visibility = "visible"
            if ((e[0x0112] == 6 || e[0x0112] == 8) && e[0x0100] != that.naturalWidth)
                return;
            if (e[0x0112] == 6) {
                holdrotan = 0
            }
            else if (e[0x0112] == 3) {
                holdrotan = 1
            }
            else if (e[0x0112] == 8) {
                holdrotan = 2
            }
            else {
                holdrotan = -1
            }
            call_holdrot()
            holdroteate_fimg(mimg)
        })
    }
    function call_holdrot() {
        if (holdrotan != -1) {
            f_rotate90(holdrotan)
        }
    }
    function holdroteate_fimg(image) {
        if (holdrotan == 0 || holdrotan == 2) {
            var fulw = Math.abs(image.naturalHeight / image.naturalWidth);
            var fulh = Math.abs(image.naturalWidth / image.naturalHeight);
            image.style.width = (100 / (fulw)) + "%"
            image.style.height = (100 / (fulh)) + "%"
            image.style.left = ((100 - (100 / (fulw))) / 2) + "%"
            image.style.top = ((100 - (100 / (fulh))) / 2) + "%"
        } else {
            image.style.width = "100%"
            image.style.height = "100%"
            image.style.left = "0"
            image.style.top = "0"
        }
        image.style.transform = "rotate(" + (holdrotan * 90 + 90) + "deg)";
    }


    // =============================================================== main movement

    const maxz = 1000, minz = 50
    var _fes, _fef;
    var hcon;
    var imd, imdt, imt, iml;
    var _x, _y, _isclick;

    var _istoch;
    var _hypoth;
    var _factor;

    var _rect;
    var canmove;
    var DRM;
    var witchof;
    var is_ani_run;
    var checkdbl
    function call_main_movement() {
        _fes = mfreame;
        _fef = mainimg;

        DRM = new dragMomentum_f()
        _fef.addEventListener("mousedown", f_msdown_main);
        _fes.addEventListener("mousemove", f_msmove_main);
        _fes.addEventListener("mouseleave", f_moseup_main);
        _fes.addEventListener("mouseup", f_tend_main);
        _fef.addEventListener('wheel', f_scroll_main);
        // touch event
        _fef.addEventListener("touchstart", f_tstart_main, { passive: true });
        _fef.addEventListener("touchmove", f_tmove_main, { passive: true });
        _fef.addEventListener("touchend", f_tend_main, { passive: true });
        _fef.addEventListener("dblclick", f_doblc_main);
    }
    function f_go_main() {
        if (inputarray.length != ind + 1) {
            ++ind;
            simg.style.left = "-100%";
            simg.style.visibility = ""
            f_rsf()
            var last = simg
            simg = simg.nextElementSibling;
            mimg = simg.firstChild
            simg.style.visibility = "visible"
            simg.style.transition = "all 150ms";
            setTimeout(function () {
                simg.style.left = "0%";
            }, 30);
            if (_fef.children.length == 3) {
                _fef.children[0].remove();
            }
            if (inputarray.length != ind + 1) {
                _fef.insertAdjacentHTML('beforeend', '<div class=simg style="left:100%;top:0%" i="' + (ind + 1) + '"><div>');
            }
            change_file(ind)
            check_item_page(last)
            create_mimg()
        }
    }
    function f_back_main() {
        if (ind != 0) {
            --ind;
            simg.style.left = "100%";
            simg.style.visibility = ""
            f_rsf()
            var last = simg
            simg = simg.previousElementSibling;
            mimg = simg.firstChild
            simg.style.visibility = "visible"
            simg.style.transition = "all 150ms";
            setTimeout(function () {
                simg.style.left = "0%";
            }, 30);
            if (_fef.children.length == 3) {
                _fef.children[2].remove();
            }
            if (0 != ind) {
                _fef.insertAdjacentHTML('afterbegin', '<div class=simg style="left:-100%;top:0%" i="' + (ind - 1) + '"><div>');
            }
            change_file(ind)
            check_item_page(last)
            create_mimg()
        }
    }
    function f_doblc_main(e) {
        clearTimeout(checkdbl)
        simg.style.transition = "all 120ms";
        if (hcon)
            hcon = false
        if (simg.offsetWidth > _fef.offsetWidth) {
            simg.style.left = "0%";
            f_rsf()
        } else {
            _rect = _fef.getBoundingClientRect();
            var elx = (e.pageX - _rect.left) * 100 / _fef.offsetWidth;
            var ely = (e.pageY - _rect.top) * 100 / _fef.offsetHeight;
            var imdl = imd;
            imd = 300
            imdt = imd

            imt = (imt - ely) / imdl * imd + ely;
            iml = (iml - elx) / imdl * imd + elx;


            var bor = get_image_border()

            // ==============     make percent    == if not full sceen
            bor[0] = Math.min((bor[0] * imd / 100), (imd - 100) / 2)
            bor[1] = Math.min((bor[1] * imd / 100), (imd - 100) / 2)

            iml = Math.min(Math.max(iml, - (imd - 100 - bor[0])), -bor[0])
            imt = Math.min(Math.max(imt, - (imd - 100 - bor[1])), -bor[1])


            simg.style.top = imt + "%";
            simg.style.left = iml + "%";

            simg.style.width = imd + "%";
            simg.style.height = imd + "%";
        }
    }
    function f_rsf() {
        imd = 100, imdt = 100, imt = 0, iml = 0;
        simg.style.top = imt + "%";
        simg.style.width = imd + "%";
        simg.style.height = imd + "%";
    }
    function f_msdown_main(e) {
        simg.style.transition = "none"
        DRM.start(e.clientX, e.clientY, e.timeStamp)
        _isclick = true;
        _x = e.pageX - simg.offsetLeft;
        _y = e.pageY - simg.offsetTop;
        canmove = simg.offsetHeight > _fef.offsetHeight
        if (is_ani_run < new Date().getTime())
            hcon = true;
        repare_vars()
    }
    function f_msmove_main(e) {
        if (_isclick) {
            DRM.move(e.clientX, e.clientY, e.timeStamp);
            simg.style.left = (e.pageX - _x) + 'px';
            if (canmove)
                simg.style.top = (e.pageY - _y) + 'px';
            if (hcon)
                hcon = false
        }
    }
    function f_moseup_main() {
        simg.style.transition = "all 300ms";
        // ==================================================== by px
        // var ofw = Math.max(simg.offsetWidth, _fef.offsetWidth)
        // var ofh = Math.max(simg.offsetHeight, _fef.offsetHeight)
        // var oft = Math.min(Math.max(simg.offsetTop, - (ofh - _fef.offsetHeight)), 0)
        // var ofl = Math.min(Math.max(simg.offsetLeft, - (ofw - _fef.offsetWidth)), 0)

        var bor = get_image_border()
        var ofw = Math.max(simg.offsetWidth * 100 / _fef.offsetWidth, 100)
        var ofh = Math.max(simg.offsetHeight * 100 / _fef.offsetHeight, 100)

        var ofl = simg.offsetLeft * 100 / _fef.offsetWidth
        var oft = simg.offsetTop * 100 / _fef.offsetHeight
        // =============== cehck max zoom
        if (ofw > maxz) {
            ofl = ((ofl - 50) / ofw * maxz) + 50;
            oft = ((oft - 50) / ofh * maxz) + 50;
            ofw = maxz;
            ofh = maxz;
        }

        // ==============     make percent    == if not full sceen
        bor[0] = Math.min((bor[0] * ofw / 100), (ofw - 100) / 2)
        bor[1] = Math.min((bor[1] * ofh / 100), (ofh - 100) / 2)

        ofl = Math.min(Math.max(ofl, - (ofw - 100 - bor[0])), -bor[0])
        oft = Math.min(Math.max(oft, - (ofh - 100 - bor[1])), -bor[1])

        if (_istoch) {
            _istoch = false;
        }
        if (_isclick) {
            // move slide
            _isclick = false;
            if (simg.offsetLeft > 0) {
                if (simg.offsetLeft / _fef.offsetWidth > 0.15 && ind != 0) {
                    simg.style.transition = "none"
                    return f_back_main();
                }
            } else if (simg.offsetLeft + simg.offsetWidth < _fef.offsetWidth) {
                if ((simg.offsetLeft + simg.offsetWidth) / _fef.offsetWidth < .85 && inputarray.length != ind + 1) {
                    simg.style.transition = "none"
                    return f_go_main()
                }
            }
        }
        imt = oft
        iml = ofl
        simg.style.top = oft + "%";
        simg.style.left = ofl + "%";

        imd = ofw
        imdt = ofw
        simg.style.width = ofw + "%";
        simg.style.height = ofh + "%";
    }
    function get_image_border() {
        var spus = _fef.offsetWidth * (mimg.naturalHeight || mimg.videoHeight) / (mimg.naturalWidth || mimg.videoWidth)

        // console.log((spus - _fef.offsetHeight) / ((mimg.naturalHeight || mimg.videoHeight) / (mimg.naturalWidth || mimg.videoWidth)), _fef.offsetWidth - (_fef.offsetHeight * (mimg.naturalWidth || mimg.videoWidth) / (mimg.naturalHeight || mimg.videoHeight)))

        if (spus > _fef.offsetHeight)
            return [((_fef.offsetWidth - (_fef.offsetHeight * (mimg.naturalWidth || mimg.videoWidth) / (mimg.naturalHeight || mimg.videoHeight))) * 100 / _fef.offsetWidth) / 2, 0]
        else
            return [0, ((_fef.offsetHeight - spus) * 100 / _fef.offsetHeight) / 2]
    }
    function f_tend_main(e) {
        if (_isclick) {
            if (DRM.ME.length == 2
                && Math.abs(DRM.ME[0].x - DRM.ME[1].x) < 3
                && Math.abs(DRM.ME[0].y - DRM.ME[1].y) < 3) {
                clearTimeout(checkdbl)
                checkdbl = setTimeout(main_click.bind(null, window.matchMedia("(pointer: fine)").matches, e.target), 250);
            }
            var bor = get_image_border()
            var ofw = Math.max(simg.offsetWidth * 100 / _fef.offsetWidth, 100)
            var ofh = Math.max(simg.offsetHeight * 100 / _fef.offsetHeight, 100)
            // ==============     make percent    == if not full sceen
            bor[0] = Math.min((bor[0] * ofw / 100), (ofw - 100) / 2)
            bor[1] = Math.min((bor[1] * ofh / 100), (ofh - 100) / 2)

            var ofl = simg.offsetLeft * 100 / _fef.offsetWidth
            var oft = simg.offsetTop * 100 / _fef.offsetHeight

            if (oft < -bor[1] && oft > (- (ofh - 100 - bor[1])) &&
                ofl < -bor[0] && ofl > (- (ofw - 100 - bor[0]))) {
                DRM.end(simg,
                    e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
                    e.changedTouches ? e.changedTouches[0].clientY : e.clientY,
                    e.timeStamp);
                _isclick = false;

                return;
            }
            f_moseup_main()
        } else if (_istoch) {
            f_moseup_main()
        }
    }
    function f_tstart_main(e) {
        _istoch = e.touches.length == 2;
        if (_istoch) {
            _isclick = false;
            _hypoth = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
            _rect = _fef.getBoundingClientRect();
            _x = (((e.touches[0].pageX + e.touches[1].pageX) / 2) - _rect.left) * 100 / _fef.offsetWidth;
            _y = (((e.touches[0].pageY + e.touches[1].pageY) / 2) - _rect.top) * 100 / _fef.offsetHeight;

            _factor = (_fef.offsetWidth * (mimg.naturalWidth || mimg.videoWidth) / (mimg.naturalHeight || mimg.videoHeight) > _fef.offsetHeight) ? simg.offsetHeight : simg.offsetWidth

            witchof = (_fef.offsetWidth * (mimg.naturalWidth || mimg.videoWidth) / (mimg.naturalHeight || mimg.videoHeight) > _fef.offsetHeight) ? _fef.offsetHeight : _fef.offsetWidth
        } else {
            simg.style.transition = "none"
            DRM.start(e.touches[0].clientX, e.touches[0].clientY, e.timeStamp)
            e = e.touches[0]
            _x = e.pageX - simg.offsetLeft;
            _y = e.pageY - simg.offsetTop;
            _isclick = true;
            canmove = simg.offsetHeight > _fef.offsetHeight
            if (is_ani_run < new Date().getTime())
                hcon = false;
        }
        repare_vars()
    }
    function f_tmove_main(e) {
        if (e.cancelable)
            e.preventDefault();
        if (_istoch) {
            var dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
            // =====              make %             = pinch location effect ============================
            var o = (((dist - _hypoth)) * 100 / witchof) * (_factor / _hypoth);

            var imdl = imd;

            imd = Math.max(o + imdt, minz)

            simg.style.width = imd + "%";
            simg.style.height = imd + "%";

            imt = (imt - _y) / imdl * imd + _y;
            iml = (iml - _x) / imdl * imd + _x;

            simg.style.top = imt + "%";
            simg.style.left = iml + "%";

        } else if (_isclick) {
            DRM.move(e.touches[0].clientX, e.touches[0].clientY, e.timeStamp);
            e = e.touches[0]
            simg.style.left = (e.pageX - _x) + 'px';
            if (canmove)
                simg.style.top = (e.pageY - _y) + 'px';
            if (hcon)
                hcon = false
        }
    }
    function repare_vars() {
        imd = simg.offsetWidth * 100 / _fef.offsetWidth
        imdt = imd
        imt = simg.offsetTop * 100 / _fef.offsetHeight
        iml = simg.offsetLeft * 100 / _fef.offsetWidth
    }
    function f_scroll_main(e) {
        if (is_ani_run >= new Date().getTime()) {
            // =========== stop ani
            DRM.start(0, 0, 0)
            setTimeout(function () {
                scroll(e)
            }, 30);
        } else {
            scroll(e)
        }
    }
    function scroll(e) {
        if (e.deltaMode == 1) {
            var dl = e.deltaY * 6;
        } else {
            var dl = e.deltaY / 30;
        }
        witchof = (_fef.offsetWidth * (mimg.naturalWidth || mimg.videoWidth) / (mimg.naturalHeight || mimg.videoHeight) > _fef.offsetHeight) ? _fef.offsetHeight : _fef.offsetWidth
        _factor = (_fef.offsetWidth * (mimg.naturalWidth || mimg.videoWidth) / (mimg.naturalHeight || mimg.videoHeight) > _fef.offsetHeight) ? simg.offsetHeight : simg.offsetWidth

        dl = (dl * 100 / witchof) * (_factor / witchof) * 15;


        e.preventDefault();
        simg.style.transition = "none"

        _rect = _fef.getBoundingClientRect();
        var elx = (e.pageX - _rect.left) * 100 / _fef.offsetWidth;
        var ely = (e.pageY - _rect.top) * 100 / _fef.offsetHeight;

        var imdl = imd;
        imd = Math.min(Math.max(imd - dl, 100), maxz)
        imt = ((imt - ely) / imdl * imd) + ely;
        iml = ((iml - elx) / imdl * imd) + elx;

        var bor = get_image_border()

        // ==============     make percent    == if not full sceen
        bor[0] = Math.min((bor[0] * imd / 100), (imd - 100) / 2)
        bor[1] = Math.min((bor[1] * imd / 100), (imd - 100) / 2)

        iml = Math.min(Math.max(iml, - (imd - 100 - bor[0])), -bor[0])
        imt = Math.min(Math.max(imt, - (imd - 100 - bor[1])), -bor[1])

        simg.style.top = imt + "%";
        simg.style.left = iml + "%";

        simg.style.width = imd + "%";
        simg.style.height = imd + "%";
    }
    function dragMomentum_f() {
        this.ME = []
        var ME = this.ME
        var ani;
        var minDistance = 10;
        // change this for greater or lesser momentum 
        // var easeType = 'easeOutBack';
        this.move = function (x, y, t, force) {
            if (force || (t - ME[ME.length - 1].t > 40)) {
                ME.push({ x, y, t });
                if (ME.length > 2) {
                    ME.shift();
                }
            }
        }
        this.start = function (Xa, Ya, Ta) {
            this.move(Xa, Ya, Ta, true)
            this.move(Xa, Ya, Ta, true)
            if (ani) {
                is_ani_run = 0
                ani()
            }
        };
        this.end = function (elmnt, x2, y2, t2) {
            if (!ME[0])
                return;
            var lastE = ME.shift();
            var x1 = lastE.x;
            var y1 = lastE.y;
            var t1 = lastE.t;

            var dMs = Math.max(t2 - t1, 1);
            // Speeds
            var speedX = Math.max(Math.min((x2 - x1) / dMs, 1), -1),
                speedY = Math.max(Math.min((y2 - y1) / dMs, 1), -1);
            var distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
            if (distance > minDistance) {
                // Momentum
                distance /= 3.5

                var bor = get_image_border()
                var ofw = Math.max(img.offsetWidth * 100 / fef.offsetWidth, 100)
                var ofh = Math.max(img.offsetHeight * 100 / fef.offsetHeight, 100)
                bor[0] = Math.min((bor[0] * ofw / 100), (ofw - 100) / 2)
                bor[1] = Math.min((bor[1] * ofh / 100), (ofh - 100) / 2)
                is_ani_run = (new Date().getTime()) + 50 + Math.max(Math.abs(speedX), Math.abs(speedY)) * 2000
                ani = animate(function (currentStep) {
                    if (Math.abs(speedX) > .02 && Math.abs(speedX) > .02) {
                        speedX *= (currentStep);
                        speedY *= (currentStep);
                        iml = Math.min(Math.max((elmnt.offsetLeft + (speedX * distance)) * 100 / fef.offsetWidth, - (ofw - 100 - bor[0])), -bor[0])
                        imt = Math.min(Math.max((elmnt.offsetTop + (speedY * distance)) * 100 / fef.offsetHeight, - (ofh - 100 - bor[1])), -bor[1])

                        elmnt.style.left = iml + "%";
                        elmnt.style.top = imt + "%";
                    }
                }, Math.max(Math.abs(speedX), Math.abs(speedY)) * 2000);
            }
        };
    };
    function animate(cb, dur) {
        var st = -1
        function step(s) {
            if (st == -1)
                st = s
            s = s - st
            if (s <= dur) {
                window.requestAnimationFrame(step);
                cb(1 - (s / dur), s)
            } else {
                cb(0, dur)
            }
        }
        window.requestAnimationFrame(step);
        return function () {
            st = dur + 1;
        }
    }
}();


!function () {

    var _range = document.createElement('style');
    _range.type = "text/css";
    _range.innerHTML = "._range{--color:#2196F3;--off-color:#d7dce0;padding:0 15px}._range>div{height:3px;width:100%;box-sizing:content-box;background-clip:content-box;background-color:var(--off-color);padding:15px 0;user-select:none;-webkit-tap-highlight-color:transparent;position:relative}._range[val]>div>div:first-child,._range[valmin]>div>div:nth-child(1),._range[valmin]>div>div:nth-child(2){width:32px;height:32px;padding:9px;box-sizing:border-box;background-clip:content-box;border-radius:20px;background-color:var(--color);margin-top:-14.5px;margin-left:-16px;position:absolute;display:inline-block;z-index:1;cursor:pointer}._range[val]>div>div:nth-child(2),._range[valmin]>div>div:nth-child(3){height:3px;position:absolute;background:red;display:inline-block;background-color:var(--color)}"
    document.querySelector('head').appendChild(_range);

    var evt = new Event("input", { "bubbles": true, "cancelable": true });
    var ismin = true;
    var isdrag = false;
    var isone;
    var minl;
    var maxl;
    var tar;
    var parerntw;
    var parerntl;
    var rangec;
    var par;
    var min;
    var max;
    var le
    window._range = function (str, f) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = str;
        var th = wrapper.firstChild;
        var at = th.attributes;
        if (typeof at.val != "undefined") {
            th.innerHTML = '<div><div></div><div></div></div>'
            th.addEventListener("mousedown", dragone);
            th.addEventListener("touchstart", dragone);
            sv.call(th, Number(at.val.value))
            th.setVal = sv
        } else {
            th.innerHTML = '<div><div></div><div></div><div></div></div>'
            th.addEventListener("mousedown", dragrange);
            th.addEventListener("touchstart", dragrange);
            svm.call(th, Number(at.valmin.value), Number(at.valmax.value));
            th.setVal = svm
        }
        if (typeof f != "undefined")
            th.addEventListener("input", f);
        return th;
    }
    document.addEventListener("DOMContentLoaded", function () {
        var range = document.querySelectorAll("._range");
        for (var i = 0; i < range.length; i++) {
            var th = range[i];
            var at = th.attributes;
            if (typeof at.val != "undefined") {
                th.innerHTML = '<div><div></div><div></div></div>'
                th.addEventListener("mousedown", dragone);
                th.addEventListener("touchstart", dragone);
                sv.call(th, Number(at.val.value))
                th.setVal = sv
            } else {
                th.innerHTML = '<div><div></div><div></div><div></div></div>'
                th.addEventListener("mousedown", dragrange);
                th.addEventListener("touchstart", dragrange);
                svm.call(th, Number(at.valmin.value), Number(at.valmax.value));
                th.setVal = svm
            }
        }
    });
    function sv(e) {
        var at = this.attributes;
        var min = Number(at.min.value);
        var max = Number(at.max.value);
        this.val = e;
        var val = 100 * (e - min) / (max - min);
        var wi = val
        var left = 0
        if (typeof at.center != "undefined") {
            const med = 100 * (Number(at.center.value) - min) / (max - min)
            if (med > val) {
                left = Number(val)
                wi = med - Number(val);
            } else {
                left = med
                wi = Number(val) - med;
            }
        }
        this.children[0].children[0].style.left = val + "%"
        this.children[0].children[1].style.width = wi + "%"
        this.children[0].children[1].style.left = left + "%"
    }
    function svm(m, x) {
        var at = this.attributes;
        var min = Number(at.min.value);
        var max = Number(at.max.value);
        this.valmin = m;
        this.valmax = x;
        var valmin = 100 * (this.valmin - min) / (max - min);
        var valmax = 100 * (this.valmax - min) / (max - min);
        this.children[0].children[0].style.left = valmin + "%"
        this.children[0].children[1].style.left = valmax + "%"
        this.children[0].children[2].style.left = valmin + "%"
        this.children[0].children[2].style.width = (valmax - valmin) + "%"
    }
    function dragone(e) {
        var cl = e.target;
        par = cl.parentNode.parentNode;
        if (!this.isEqualNode(par))
            return;
        if (Array.prototype.indexOf.call(par.children[0].children, cl) == 0) {
            isdrag = true;
            isone = true;

            min = Number(par.attributes.min.value);
            max = Number(par.attributes.max.value);

            if (typeof par.attributes.center != "undefined")
                maxl = 100 * (Number(par.attributes.center.value) - min) / (max - min)
            else
                maxl = 0;
            tar = cl;
            parerntw = par.children[0].offsetWidth;
            parerntl = par.children[0].getBoundingClientRect().left
            rangec = par.children[0].children[1];
        }
    }
    function dragrange(e) {
        var cl = e.target;
        par = cl.parentNode.parentNode;
        if (!this.isEqualNode(par))
            return;
        var indx = Array.prototype.indexOf.call(par.children[0].children, cl);
        ismin = (indx == 0)
        if (ismin || indx == 1) {
            isdrag = true;
            tar = cl;
            parerntw = par.children[0].offsetWidth;
            parerntl = par.children[0].getBoundingClientRect().left
            rangec = par.children[0].children[2];

            min = Number(par.attributes.min.value);
            max = Number(par.attributes.max.value);
            minl = 100 * (par.valmin - min) / (max - min)
            maxl = 100 * (par.valmax - min) / (max - min)
        }
    }
    window.addEventListener("mousemove", function (e) {
        if (isdrag) {
            le = (e.pageX - parerntl) * 100 / parerntw
            if (isone) {
                if (le < 0) {
                    if (par.val != min) {
                        le = 0
                    } else
                        return;
                } else if (le > 100) {
                    if (par.val != max) {
                        le = 100
                    } else
                        return;
                }
                if (maxl > le) {
                    rangec.style.left = le + "%"
                    rangec.style.width = (maxl - le) + "%";
                } else {
                    rangec.style.left = maxl + "%"
                    rangec.style.width = (le - maxl) + "%";
                }
                par.val = Math.floor(((max - min) * le / 100) + min)
            } else {
                if (ismin) {
                    if (le < 0) {
                        if (par.valmin != min) {
                            le = 0
                        } else
                            return;
                    } else if (le > maxl) {
                        if (par.valmin != par.valmax) {
                            le = maxl
                        } else
                            return;
                    }
                    rangec.style.left = le + "%";
                    rangec.style.width = maxl - le + "%";
                    par.valmin = Math.floor(((max - min) * le / 100) + min)
                } else {
                    if (le > 100) {
                        if (par.valmax != max) {
                            le = 100
                        } else
                            return;
                    } else if (le < minl) {
                        if (par.valmax != par.valmin) {
                            le = minl
                        } else
                            return;
                    }
                    rangec.style.width = le - minl + "%";
                    par.valmax = Math.floor(((max - min) * le / 100) + min)
                }
            }
            tar.style.left = le + "%"
            par.dispatchEvent(evt);
        }
    })
    window.addEventListener("touchmove", function (e) {
        if (isdrag) {
            le = (e.touches[0].pageX - parerntl) * 100 / parerntw
            if (isone) {
                if (le < 0) {
                    if (par.val != min) {
                        le = 0
                    } else
                        return;
                } else if (le > 100) {
                    if (par.val != max) {
                        le = 100
                    } else
                        return;
                }
                if (maxl > le) {
                    rangec.style.left = le + "%"
                    rangec.style.width = (maxl - le) + "%";
                } else {
                    rangec.style.left = maxl + "%"
                    rangec.style.width = (le - maxl) + "%";
                }
                par.val = Math.floor(((max - min) * le / 100) + min)
            } else {
                if (ismin) {
                    if (le < 0) {
                        if (par.valmin != min) {
                            le = 0
                        } else
                            return;
                    } else if (le > maxl) {
                        if (par.valmin != par.valmax) {
                            le = maxl
                        } else
                            return;
                    }
                    rangec.style.left = le + "%";
                    rangec.style.width = maxl - le + "%";
                    par.valmin = Math.floor(((max - min) * le / 100) + min)
                    par.valminpersent = le
                } else {
                    if (le > 100) {
                        if (par.valmax != max) {
                            le = 100
                        } else
                            return;
                    } else if (le < minl) {
                        if (par.valmax != par.valmin) {
                            le = minl
                        } else
                            return;
                    }
                    rangec.style.width = le - minl + "%";
                    par.valmax = Math.floor(((max - min) * le / 100) + min)
                    par.valmaxpersent = le
                }
            }
            tar.style.left = le + "%"
            par.dispatchEvent(evt);
        }
    })
    window.addEventListener("mouseleave", leave)
    window.addEventListener("mouseup", leave);
    window.addEventListener("touchend", leave);
    function leave() {
        if (isdrag) {
            isdrag = false
            if (isone) {
                isone = false
            } else {
                if (ismin) {
                    par.children[0].children[0].style.zIndex = "2"
                    par.children[0].children[1].style.zIndex = "1"
                } else {
                    par.children[0].children[0].style.zIndex = "1"
                    par.children[0].children[1].style.zIndex = "2"
                }
            }
        }
    }
}();