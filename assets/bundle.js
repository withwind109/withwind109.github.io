function boot() {
    this.result = "",
        this.card_id = "",
        this.type = "",
        this.guests = {},
        this.guestState = !0,
        this.allPage = [],
        this.width = window.innerWidth,
        this.height = window.innerHeight,
        this.UI_WIDTH = 750,
        this.UI_HEIGHT = 1220,
        this.seating = 0,
        this.autoState = !1,
        this.musicStatePause = "false",
        this.log = [],
        this.videoNext = !1,
        this.videoHave = !1,
        this.editState = !1,
        this.hideEditState = !1,
        this.infiniteArr = [],
        this.chatNo = 0,
        this.chatSeat = 0,
        this.giftSeat = 0,
        this.defaultGiftSeat = 0,
        this.isCardMaster = !1,
        this.gift_m = 0,
        this.gift_t,
        this.showGiftPage = !0,
        this.giftProperty = {},
        this.send_state = 0,
        this.send_name = "",
        this.send_price = "",
        this.send_wish = "祝你们爱情永驻，甜蜜幸福",
        this.gift_touchSeat = 0,
        this.otherState = {
            chat_state: !1,
            chat_entry: !1,
            chat_gift: !1,
            chat_cash: !1
        },
        this.localhost = location.host.indexOf("api") > -1 ? "//test.hunliji.com" : "//" + location.host,
        this.saashost = location.host.indexOf("www") > -1 ? "//www.yunkexiongdi.com" : "//erptest.hunliji.com",
        this.API = {
            card_info: "/p/wedding/index.php/home/APIInvitationV3/card_h5",
            all_gifts: "/p/wedding/index.php/Home/APICardGift2/index",
            sendCash: "/p/wedding/index.php/Home/APICardCashGift/give",
            sendGift: "/p/wedding/index.php/Home/APICardGift2/give",
            reply: "/p/wedding/index.php/home/APIInvitationV3/reply",
            gifts_and_replies: "/p/wedding/index.php/Home/APICardGift2/gifts_and_replies",
            // sdkData: "/v1/api/app/tracker/batch.json",
            template: "/p/wedding/index.php/Home/APIInvitationV3/previewTemplate",
            otherMapImage: "/p/wedding/index.php/home/APIInvitationV3/card_map_image",
            getInfo: "/saas/index.php/Api/APIYx_wxalbum_appointment",
            appointment: "/saas/index.php/Api/APIYx_wxalbum_appointment"
        },
        this.$giftAni = null,
        this.triggerGiftBtn = "sendGiftBtn",
        this.aniStyle = ""
}

boot.prototype = function () {
    return changeImgUrl = function (a) {
        return a
    }
        ,
        wxsq = function () {
            var a = this
                , b = 99 / this.UI_WIDTH * this.width + "px"
                , c = 110 / this.UI_WIDTH * this.width + "px"
                , d = 80 / this.UI_WIDTH * this.width + "px"
                , e = 26 / this.UI_WIDTH * this.width + "px"
                , f = 96 / this.UI_WIDTH * this.width + "px"
                , g = 56 / this.UI_WIDTH * this.width + "px"
                , h = 30 / this.UI_WIDTH * this.width + "px"
                , i = 690 / this.UI_WIDTH * this.width + "px"
                ,
                j = '<div id="shouquan" style="background: #fff;z-index: 50;width: ' + i + ";display:-webkit-box;border-bottom:1px solid #e7e7e7;padding:0 " + h + "; height:" + b + "; line-height: " + b + "; font-size: " + e + "; color: #000; position:fixed; top:-" + c + '; -webkit-transition: top 600ms ease-in;">' + "<span>是否愿意接受新人的回复消息</span>" + '<div style="margin-left: ' + d + '; text-align: center;">' + '<span style="line-height: ' + g + ";display: inline-block;background:#1aad19;color:white; width: " + f + "; height: " + g + '; border-radius: 4px;border: 2px solid #179c16;" id="shouquanYes">是</span>' + '<span style="line-height: ' + g + ";display: inline-block;background:#f8f8f8;margin-left:" + h + ";width: " + f + "; height: " + g + '; border-radius: 4px;border: 2px solid #dfdfdf;" id="shouquanNo">否</span>' + "</div>" + "</div>";
            $("#other").append(j),
                $(document).on("touchstart", "#shouquanYes", function () {
                    var b, c, d;
                    sessionStorage.setItem("current_seating", a.seating),
                        b = "http://" + location.host + "/p/wedding/index.php/home/APICardUserReply/wechat_callback/id/" + a.confirm_id + "/type/" + (a.confirm_type || ""),
                        c = /test/.test(location.host) || /dev/.test(location.host) ? "wx7bbc8b9ae20e760f" : "wx6260e0fbaa341dd2",
                        d = /test/.test(location.host) || /dev/.test(location.host) ? "TY5GWj5brELDZlmBwK8r4VxwCX6quS-xfxvXH6CZQvA" : "ZzjyGF-sqXAXAQ2eff0P_RG8yblzA50SMJk1NXwUTZ4",
                        location.href = "https://mp.weixin.qq.com/mp/subscribemsg?action=get_confirm&appid=" + c + "&scene=1000&template_id=" + d + "&redirect_url=" + encodeURIComponent(b) + "&reserved=test#wechat_redirect"
                }),
                $(document).on("touchstart", "#shouquanNo", function () {
                    $("#shouquan").css("top", "-" + c)
                })
        }
        ,
        wxsq_event = function (a, b) {
            this.confirm_id = b,
                this.confirm_type = a,
                $("#shouquan").css("top", "0px")
        }
        ,
        ajax_reply = function (a, b, c) {
            var d = this;
            $.ajax({
                url: d.localhost + d.API.reply,
                type: "post",
                data: a,
                success: function (a) {
                    0 == a.status.RetCode && (d.CardRepliesV2_id = c ? null : a.data && a.data.id,
                        d.winMsg({
                            img: d.changeImgUrl("//qnm.hunliji.com/o_1bjph0pq0u9aoib3fqo87169m7.png"),
                            disMsg: "发送成功",
                            id: "giftPageBtn",
                            col: "送祝福"
                        }),
                        d.chatState = !1,
                        b ? b() : null)
                }
            })
        }
        ,
        ajax_gifts = function () {
            var a = this;
            $.ajax({
                url: a.localhost + a.API.all_gifts,
                type: "get",
                data: {
                    with_myb: a.with_myb ? 1 : 0
                },
                success: function (b) {
                    0 == b.status.RetCode && (a.allGifts = b.data.list,
                        b.data.list.forEach(function (b, c) {
                            1 == b.is_select && (a.giftSeat = c,
                                a.defaultGiftSeat = c)
                        }),
                        a.selectGift(),
                        a.giftPage(),
                        a.selectGift_v2(),
                    a.getCookie("showGiftPage") && (a.showGiftPage = !1,
                        $("#giftPage").css({
                            top: 0,
                            opacity: 1
                        }),
                        a.animateGiftAni(),
                        $("#upImg").hide(),
                        setTimeout(function () {
                            a.writeCookie("showGiftPage", "", -1)
                        }, 300)))
                }
            })
        }
        ,
        ajax_info = function () {
            var a = this
                , b = document.createElement("div")
                , c = document.createElement("div")
                , d = document.createElement("div");
            b.setAttribute("id", "wrap"),
                c.setAttribute("id", "all-page"),
                d.setAttribute("id", "other"),
                b.appendChild(c),
                document.body.appendChild(d),
                document.body.appendChild(b),
            a.getCookie("editState") && a.type && (this.editState = a.getCookie("editState")),
                this.card_id = this.getParams("card_id"),
                this.type = this.getParams("type"),
                a.isCardMaster = "cardMaster" === this.getParams("appName"),
                b = {
                    "status": {
                        "RetCode": 0,
                        "msg": "success"
                    },
                    "data": {
                        "guest_template": 1,
                        "cardInfo": {
                            "id": "11209722",
                            "bride_name": "\u4e56\u96f7\u674e",
                            "groom_name": "\u81ed\u5510\u8d85",
                            "latitude": "29.556040000000",
                            "longtitude": "106.575138000000",
                            "place": "\u82ad\u83f2\u5723\u5bb4",
                            "version": "1",
                            "time": "2018-06-03 22:44:00",
                            "user_id": "7876874",
                            "theme_id": "194",
                            "map_type": "1",
                            "set_up": {
                                "danmu": "1",
                                "wish": "1",
                                "gift": "1",
                                "gold": "1",
                                "is_auto_fund": 0,
                                "id": "11209722",
                                "created_at": "2018-04-09 22:45:42",
                                "updated_at": "2018-04-09 22:45:42",
                                "insurance_refund": "0"
                            },
                            "card_claim": {
                                "is_open": 1,
                                "total_income": 0,
                                "need_auth": 0
                            },
                            "preview_link": "https:\/\/www.hunliji.com\/p\/wedding\/Public\/wap\/invitationCard\/demonew.html?card_id=MTEyMDk3MjJmaXJlX2Nsb3Vk&appName=weddingUser&type=app",
                            "preview_only_link": "https:\/\/www.hunliji.com\/p\/wedding\/Public\/wap\/invitationCard\/demonew.html?card_id=MTEyMDk3MjJmaXJlX2Nsb3Vk&appName=weddingUser&type=app&edit=0",
                            "map_image": "http:\/\/qnm.hunliji.com\/FrhJ4j5uGMrk16_CK2OSR1AYUEvV",
                            "card_saas_info": null
                        },
                        "page": [
                            {
                                "id": "93164670",
                                "layout": {
                                    "background": "http:\/\/qnm.hunliji.com\/o_1bnnou1k7150ge9q16t71ofdkom5u.png",
                                    "elements": [
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "1000ms"
                                            ],
                                            "height": "26",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnoqq9u17k11r7h9sn13gil02u.png",
                                            "rotate": "",
                                            "width": "750",
                                            "x": "0",
                                            "y": "1164",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_0",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "zoomIn"
                                            ],
                                            "delay": [
                                                "800ms"
                                            ],
                                            "height": "53",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnoqs5uf0a1huu19f71s5b17sb33.png",
                                            "rotate": "",
                                            "width": "36",
                                            "x": "357",
                                            "y": "911",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_1",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "rollIn"
                                            ],
                                            "delay": [
                                                "500ms"
                                            ],
                                            "height": "144",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnor21t1qb6iv3d1e5552q13k.png",
                                            "rotate": "",
                                            "width": "144",
                                            "x": "88",
                                            "y": "70",
                                            "z_order": "1",
                                            "duration": [
                                                "1500ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_3",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "0ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInRight"
                                            ],
                                            "delay": [
                                                "500ms"
                                            ],
                                            "height": "552",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnor5dg1mstkg7pbcub7s1840.png",
                                            "rotate": "",
                                            "width": "750",
                                            "x": "0",
                                            "y": "292",
                                            "z_order": "3",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_4",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInUp"
                                            ],
                                            "delay": [
                                                "1000ms"
                                            ],
                                            "height": "62",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnor85dg5t1u8u15p0elnrhl4c.png",
                                            "rotate": "",
                                            "width": "64",
                                            "x": "263",
                                            "y": "1135",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_5",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "0ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInUp"
                                            ],
                                            "delay": [
                                                "1200ms"
                                            ],
                                            "height": "24",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnorbdt1i6h1c4noh0o62694o.png",
                                            "rotate": "",
                                            "width": "78",
                                            "x": "265",
                                            "y": "1159",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_6",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInUp"
                                            ],
                                            "delay": [
                                                "1400ms"
                                            ],
                                            "height": "24",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnordp296d64014908js9t354.png",
                                            "rotate": "",
                                            "width": "71",
                                            "x": "259",
                                            "y": "1159",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_7",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "3500ms",
                                            "inf_duration": "8000ms",
                                            "animate": [
                                                "fadeInRight"
                                            ],
                                            "delay": [
                                                "1000ms"
                                            ],
                                            "height": "85",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqimqikn841hsetnr96mu6f.png",
                                            "rotate": "",
                                            "width": "129",
                                            "x": "522",
                                            "y": "1102",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_8",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "1500ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "1000ms"
                                            ],
                                            "height": "22",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnq63oua1sphicp1e551jsj15fm3i.png",
                                            "rotate": "",
                                            "width": "103",
                                            "x": "325",
                                            "y": "102",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_9",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "0ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "1200ms"
                                            ],
                                            "height": "26",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnq63ts214fekfes3ao0mr303n.png",
                                            "rotate": "",
                                            "width": "319",
                                            "x": "325",
                                            "y": "140",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_10",
                                            "line_spacing": null
                                        },
                                        {
                                            "animate": [
                                                "fadeInRight"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/Fg_94Or0h7Ztq52FPoz3ZCp1z_sq",
                                            "delay": [
                                                "500"
                                            ],
                                            "rotate": 0,
                                            "x": "0",
                                            "y": "282",
                                            "width": "750",
                                            "height": "575",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnnost386tp13ie1093v4t1ora5n.png",
                                                "width": "750",
                                                "height": "575"
                                            },
                                            "z_order": "2",
                                            "id": 13339,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "img": "../image/ydddr.jpg",
                                            "delay": [
                                                "1500"
                                            ],
                                            "rotate": "0",
                                            "x": "13",
                                            "y": "1007",
                                            "width": "719",
                                            "height": "32",
                                            "z_order": "2",
                                            "id": 17067,
                                            "type": "text",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "text_type": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            // "img": "http:\/\/qnm.hunliji.com\/FvBxHvxrxXRNRi28vOCPuN3W8rIx",
                                            "img": "../image/date.png",
                                            "delay": [
                                                "1000"
                                            ],
                                            "rotate": "0",
                                            "x": "101",
                                            "y": "106",
                                            "width": "130",
                                            "height": "33",
                                            "z_order": "2",
                                            "id": 17068,
                                            "type": "text",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "text_type": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "img": "./image/tc_name.png",
                                            "delay": [
                                                "1000"
                                            ],
                                            "rotate": "0",
                                            "x": "208",
                                            "y": "902",
                                            "width": "120",
                                            "height": "65",
                                            "z_order": "2",
                                            "id": 17070,
                                            "type": "text",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "text_type": "groom",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "img": "./image/ll_name.png",
                                            "delay": [
                                                "1000"
                                            ],
                                            "rotate": "0",
                                            "x": "421",
                                            "y": "902",
                                            "width": "120",
                                            "height": "65",
                                            "z_order": "2",
                                            "id": 17071,
                                            "type": "text",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "text_type": "bride",
                                            "edit_btn_position": 0
                                        }
                                    ]
                                }
                            },
                            {
                                "id": "93164671",
                                "layout": {
                                    "background": "http:\/\/qnm.hunliji.com\/o_1bnnqokoau69n12un12drkb88n.png",
                                    "elements": [
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "1000ms"
                                            ],
                                            "height": "32",
                                            "img": "../image/ccbfk.jpg",
                                            "rotate": "",
                                            "width": "509",
                                            "x": "165",
                                            "y": "68",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_0",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "1500ms"
                                            ],
                                            "height": "36",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqljf0c5q1ntp2qj1j9melv86.png",
                                            "rotate": "",
                                            "width": "71",
                                            "x": "39",
                                            "y": "99",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_1",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInLeft"
                                            ],
                                            "delay": [
                                                "500ms"
                                            ],
                                            "height": "63",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqlof11ggr1isng5m1ihm1vre8i.png",
                                            "rotate": "",
                                            "width": "71",
                                            "x": "93",
                                            "y": "62",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_2",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "500ms"
                                            ],
                                            "height": "26",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqr5rm1b4tjlj1sj6pv7m3093.png",
                                            "rotate": "",
                                            "width": "750",
                                            "x": "0",
                                            "y": "1164",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_3",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInUp"
                                            ],
                                            "delay": [
                                                "1000ms"
                                            ],
                                            "height": "62",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqrccm8m3c1j6ob93br59f.png",
                                            "rotate": "",
                                            "width": "64",
                                            "x": "263",
                                            "y": "1135",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_4",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInUp"
                                            ],
                                            "delay": [
                                                "1200ms"
                                            ],
                                            "height": "24",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqrec116p2is3rno14qm1sbq9r.png",
                                            "rotate": "",
                                            "width": "78",
                                            "x": "265",
                                            "y": "1159",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_5",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInUp"
                                            ],
                                            "delay": [
                                                "1400ms"
                                            ],
                                            "height": "24",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqrk2gjr7kfdngrbki250a7.png",
                                            "rotate": "",
                                            "width": "71",
                                            "x": "259",
                                            "y": "1159",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_6",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInRight"
                                            ],
                                            "delay": [
                                                "1000ms"
                                            ],
                                            "height": "85",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqsotts3q1gsto6l3qnv05aj.png",
                                            "rotate": "",
                                            "width": "129",
                                            "x": "522",
                                            "y": "1102",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_7",
                                            "line_spacing": null
                                        },
                                        {
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/Fj2oDKgmK-Wp0WnwK5NaaOZU2lpV",
                                            "delay": [
                                                "100"
                                            ],
                                            "rotate": 0,
                                            "x": "36",
                                            "y": "178",
                                            "width": "675",
                                            "height": "875",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnnr00al1mf21lh8tse1d2t3mqb6.png",
                                                "width": "675",
                                                "height": "875"
                                            },
                                            "z_order": "1",
                                            "id": 7743,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        }
                                    ]
                                }
                            },
                            {
                                "id": "93164672",
                                "layout": {
                                    "background": "http:\/\/qnm.hunliji.com\/o_1bnnrmj1va0s1vii15i1tjj17p16s.png",
                                    "elements": [
                                        {
                                            "infinite": "",
                                            "inf_delay": "",
                                            "inf_duration": "",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "1000"
                                            ],
                                            "height": "62",
                                            "img": "http://qnm.hunliji.com/o_1c05v78an1lqb76217jvq341u1l7l.png",
                                            "rotate": "",
                                            "width": "150",
                                            "x": "500",
                                            "y": "85",
                                            "z_order": "1",
                                            "duration": [
                                                "2000"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_0",
                                            "line_spacing": ""
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "",
                                            "inf_duration": "",
                                            "animate": [
                                                "rotateInDownRight"
                                            ],
                                            "delay": [
                                                "1000"
                                            ],
                                            "height": "191",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnr47pc28vrk3k6c17gf6lc20.png",
                                            "rotate": "",
                                            "width": "203",
                                            "x": "547",
                                            "y": "1029",
                                            "z_order": "1",
                                            "duration": [
                                                "2000"
                                            ],
                                            "is_down": "1",
                                            "is_scale": "0",
                                            "id": "ele_1",
                                            "line_spacing": ""
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "",
                                            "inf_duration": "",
                                            "animate": [
                                                "rollIn"
                                            ],
                                            "delay": [
                                                "1000"
                                            ],
                                            "height": "78",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnr4i0k1vdg13udp2e1ms11ubj2h.png",
                                            "rotate": "",
                                            "width": "78",
                                            "x": "641",
                                            "y": "922",
                                            "z_order": "1",
                                            "duration": [
                                                "2000"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_3",
                                            "line_spacing": ""
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "",
                                            "inf_duration": "",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "500"
                                            ],
                                            "height": "314",
                                            "img": "../image/wmjhl.jpg",
                                            "rotate": "",
                                            "width": "59",
                                            "x": "492",
                                            "y": "261",
                                            "z_order": "1",
                                            "duration": [
                                                "2000"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_4",
                                            "line_spacing": ""
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "",
                                            "inf_duration": "",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "800"
                                            ],
                                            "height": "500",
                                            "img": "../image/hxhn.jpg",
                                            "rotate": "",
                                            "width": "110",
                                            "x": "576",
                                            "y": "377",
                                            "z_order": "1",
                                            "duration": [
                                                "2000"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_5",
                                            "line_spacing": ""
                                        },
                                        {
                                            "animate": [
                                                "fadeInDown"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/FqIUrfbZF24K420mz_kYKnObqj7B",
                                            "delay": [
                                                "250"
                                            ],
                                            "rotate": 0,
                                            "x": "1",
                                            "y": "0",
                                            "width": "425 ",
                                            "height": "397",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnnr5dg86k9j0c1v3k139hlk25g.png",
                                                "width": "425 ",
                                                "height": "397"
                                            },
                                            "z_order": "1",
                                            "id": 7757,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "3000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeInDown"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/FhGPLSkRne9jr7XNOMP3WvTuniDU",
                                            "delay": [
                                                "100"
                                            ],
                                            "rotate": 0,
                                            "x": "33",
                                            "y": "381",
                                            "width": "425",
                                            "height": "445",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnnr5npltjk64vbn91p731fmu5q.png",
                                                "width": "425",
                                                "height": "445"
                                            },
                                            "z_order": "1",
                                            "id": 7758,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "3000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeInDown"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/FjU7IurNibWh6ugakPFNDestYGtd",
                                            "delay": [
                                                "50"
                                            ],
                                            "rotate": 0,
                                            "x": "65",
                                            "y": "809",
                                            "width": "425",
                                            "height": "411",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnnr5sfk8fqchd1ple1nv1uo85v.png",
                                                "width": "425",
                                                "height": "411"
                                            },
                                            "z_order": "1",
                                            "id": 7759,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "3000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        }
                                    ]
                                }
                            },
                            {
                                "id": "93164673",
                                "layout": {
                                    "background": "http:\/\/qnm.hunliji.com\/o_1bnnqokoau69n12un12drkb88n.png",
                                    "elements": [
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "500ms"
                                            ],
                                            "height": "26",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqr5rm1b4tjlj1sj6pv7m3093.png",
                                            "rotate": "",
                                            "width": "750",
                                            "x": "0",
                                            "y": "1164",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_0",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInUp"
                                            ],
                                            "delay": [
                                                "1000ms"
                                            ],
                                            "height": "62",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqrccm8m3c1j6ob93br59f.png",
                                            "rotate": "",
                                            "width": "64",
                                            "x": "263",
                                            "y": "1135",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_1",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInUp"
                                            ],
                                            "delay": [
                                                "1200ms"
                                            ],
                                            "height": "24",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqrec116p2is3rno14qm1sbq9r.png",
                                            "rotate": "",
                                            "width": "78",
                                            "x": "265",
                                            "y": "1159",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_2",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInUp"
                                            ],
                                            "delay": [
                                                "1400ms"
                                            ],
                                            "height": "24",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqrk2gjr7kfdngrbki250a7.png",
                                            "rotate": "",
                                            "width": "71",
                                            "x": "259",
                                            "y": "1159",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_3",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInRight"
                                            ],
                                            "delay": [
                                                "1000ms"
                                            ],
                                            "height": "85",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqsotts3q1gsto6l3qnv05aj.png",
                                            "rotate": "",
                                            "width": "129",
                                            "x": "522",
                                            "y": "1102",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_4",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInRight"
                                            ],
                                            "delay": [
                                                "900ms"
                                            ],
                                            "height": "145",
                                            "img": "http://qnm.hunliji.com/o_1c060iaro1cp025h1skrniv1e7b6c.png",
                                            "rotate": "",
                                            "width": "144",
                                            "x": "527",
                                            "y": "75",
                                            "z_order": "1",
                                            "duration": [
                                                "1000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_6",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "600ms"
                                            ],
                                            "height": "150",
                                            "img": "../image/love.png",
                                            "rotate": "",
                                            "width": "490",
                                            "x": "39",
                                            "y": "70",
                                            "z_order": "2",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_14",
                                            "line_spacing": null
                                        },
                                        {
                                            "animate": [
                                                "fadeInLeft"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/FiEfnfTjNaRc8G800LcBvkIMoHOk",
                                            "delay": [
                                                "700"
                                            ],
                                            "rotate": 0,
                                            "x": "0",
                                            "y": "275",
                                            "width": "289",
                                            "height": "353",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnnrtt6d20711ll1a39e1d17ta7n.png",
                                                "width": "289",
                                                "height": "353"
                                            },
                                            "z_order": "1",
                                            "id": 7981,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeInLeft"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/FiR7OmuJSh065VNT4JUWyX1u8lNK",
                                            "delay": [
                                                "100"
                                            ],
                                            "rotate": 0,
                                            "x": "301",
                                            "y": "275",
                                            "width": "376",
                                            "height": "353",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnnrufdo1svv1pqq13hqe4ioes96.png",
                                                "width": "376",
                                                "height": "353"
                                            },
                                            "z_order": "1",
                                            "id": 7982,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeInRight"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/FkzT9vC2G1lKgkL9b8fFACwGViPg",
                                            "delay": [
                                                "700"
                                            ],
                                            "rotate": 0,
                                            "x": "64",
                                            "y": "668",
                                            "width": "376",
                                            "height": "353",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnnruhk1129s19n119msjmv2tq9b.png",
                                                "width": "376",
                                                "height": "353"
                                            },
                                            "z_order": "1",
                                            "id": 7983,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeInRight"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/Fl710sYQxM1wSKHl4xbQIvm6Cjne",
                                            "delay": [
                                                "1300"
                                            ],
                                            "rotate": 0,
                                            "x": "453",
                                            "y": "668",
                                            "width": "289",
                                            "height": "353",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnnrull5123uoar1n56154a1ivv9g.png",
                                                "width": "289",
                                                "height": "353"
                                            },
                                            "z_order": "1",
                                            "id": 7984,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        }
                                    ]
                                }
                            },
                            {
                                "id": "93164674",
                                "layout": {
                                    "background": "http:\/\/qnm.hunliji.com\/o_1bnnqokoau69n12un12drkb88n.png",
                                    "elements": [
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "500ms"
                                            ],
                                            "height": "26",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqr5rm1b4tjlj1sj6pv7m3093.png",
                                            "rotate": "",
                                            "width": "750",
                                            "x": "0",
                                            "y": "1164",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_0",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInUp"
                                            ],
                                            "delay": [
                                                "1000ms"
                                            ],
                                            "height": "62",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqrccm8m3c1j6ob93br59f.png",
                                            "rotate": "",
                                            "width": "64",
                                            "x": "263",
                                            "y": "1135",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_1",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInUp"
                                            ],
                                            "delay": [
                                                "1200ms"
                                            ],
                                            "height": "24",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqrec116p2is3rno14qm1sbq9r.png",
                                            "rotate": "",
                                            "width": "78",
                                            "x": "265",
                                            "y": "1159",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_2",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInUp"
                                            ],
                                            "delay": [
                                                "1400ms"
                                            ],
                                            "height": "24",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqrk2gjr7kfdngrbki250a7.png",
                                            "rotate": "",
                                            "width": "71",
                                            "x": "259",
                                            "y": "1159",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_3",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInRight"
                                            ],
                                            "delay": [
                                                "1000ms"
                                            ],
                                            "height": "85",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnnqsotts3q1gsto6l3qnv05aj.png",
                                            "rotate": "",
                                            "width": "129",
                                            "x": "522",
                                            "y": "1102",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_4",
                                            "line_spacing": null
                                        },
                                        {
                                            "animate": [
                                                "fadeInLeft"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/Fp31_RQ2pLTAKc3UeL_V7QsyuXwZ",
                                            "delay": [
                                                "500"
                                            ],
                                            "rotate": 0,
                                            "x": "27",
                                            "y": "33",
                                            "width": "691",
                                            "height": "490",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bno8t4qr1mai90r1uf5h6vkpc6u.png",
                                                "width": "691",
                                                "height": "490"
                                            },
                                            "z_order": "1",
                                            "id": 7704,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeInRight"
                                            ],
                                            "img": "http://qnm.hunliji.com/FiJ5Qs__LrOv2k4-_tYySrafGqjS",
                                            "delay": [
                                                "500"
                                            ],
                                            "rotate": 0,
                                            "x": "27",
                                            "y": "571",
                                            "width": "691",
                                            "height": "490",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bno97dd42nt2hffj6v1216897r.png",
                                                "width": "691",
                                                "height": "490"
                                            },
                                            "z_order": "1",
                                            "id": 7705,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "2000ms"
                                            ],
                                            "height": "190",
                                            "img": "http://qnm.hunliji.com/o_1c05v7b203manp61t00d2i8ho81.png",
                                            "rotate": "",
                                            "width": "280",
                                            "x": "20",
                                            "y": "500",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_1",
                                            "line_spacing": null
                                        },
                                    ]
                                }
                            },
                            {
                                "id": "93164675",
                                "layout": {
                                    "background": "http:\/\/qnm.hunliji.com\/o_1bnob26sj1ghooa2b831p8gase7t.jpg",
                                    "elements": [
                                        {
                                            "infinite": "",
                                            "inf_delay": "",
                                            "inf_duration": "",
                                            "animate": [
                                                "fadeInLeft"
                                            ],
                                            "delay": [
                                                "1500"
                                            ],
                                            "height": "49",
                                            "img": "http://qnm.hunliji.com/o_1c05uagddrun1ts1p5n1bv11vdf8t.png",
                                            "rotate": "",
                                            "width": "100",
                                            "x": "62",
                                            "y": "650",
                                            "z_order": "1",
                                            "duration": [
                                                "2000"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_2",
                                            "line_spacing": ""
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "",
                                            "inf_duration": "",
                                            "animate": [
                                                "zoomIn"
                                            ],
                                            "delay": [
                                                "500"
                                            ],
                                            "height": "91",
                                            "img": "../image/hui.jpg",
                                            "rotate": "",
                                            "width": "97",
                                            "x": "110",
                                            "y": "516",
                                            "z_order": "1",
                                            "duration": [
                                                "2000"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_3",
                                            "line_spacing": ""
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "",
                                            "inf_duration": "",
                                            "animate": [
                                                "zoomIn"
                                            ],
                                            "delay": [
                                                "800"
                                            ],
                                            "height": "91",
                                            "img": "../image/yi.jpg",
                                            "rotate": "",
                                            "width": "97",
                                            "x": "172",
                                            "y": "583",
                                            "z_order": "1",
                                            "duration": [
                                                "2000"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_4",
                                            "line_spacing": ""
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "",
                                            "inf_duration": "",
                                            "animate": [
                                                "rollIn"
                                            ],
                                            "delay": [
                                                "500"
                                            ],
                                            "height": "68",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bno9n6v4pv0198cfr1o0m1j6847.png",
                                            "rotate": "",
                                            "width": "71",
                                            "x": "461",
                                            "y": "509",
                                            "z_order": "1",
                                            "duration": [
                                                "2000"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_5",
                                            "line_spacing": ""
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "",
                                            "inf_duration": "",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "1600"
                                            ],
                                            "height": "250",
                                            "img": "../image/wmqg.png",
                                            "rotate": "",
                                            "width": "100",
                                            "x": "284",
                                            "y": "508",
                                            "z_order": "1",
                                            "duration": [
                                                "2000"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_6",
                                            "line_spacing": ""
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "",
                                            "inf_duration": "",
                                            "animate": [
                                                "rotateInDownRight"
                                            ],
                                            "delay": [
                                                "500"
                                            ],
                                            "height": "200",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnoas2p91khn1f821bual1erhp7o.png",
                                            "rotate": "",
                                            "width": "209",
                                            "x": "541",
                                            "y": "545",
                                            "z_order": "1",
                                            "duration": [
                                                "2000"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_7",
                                            "line_spacing": ""
                                        },
                                        {
                                            "animate": [
                                                "fadeInUp"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/FvPqctJpqCHQXNioz4eb2DV1VBBB",
                                            "delay": [
                                                "500"
                                            ],
                                            "rotate": 0,
                                            "x": "382",
                                            "y": "730",
                                            "width": "368",
                                            "height": "465",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnoa839o1kmk8fgkkf3bvksg69.png",
                                                "width": "368",
                                                "height": "465"
                                            },
                                            "z_order": "1",
                                            "id": 7747,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeInUp"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/FrO45hLxmo2w5fHkoTSCfpBwnXJF",
                                            "delay": [
                                                "500"
                                            ],
                                            "rotate": 0,
                                            "x": "0",
                                            "y": "757",
                                            "width": "392",
                                            "height": "463",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnoa89i2ger1m19cq1r7d167j6j.png",
                                                "width": "392",
                                                "height": "463"
                                            },
                                            "z_order": "1",
                                            "id": 7748,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeInDown"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/FrE0ICO2rlmNqtGEs9gEe67pJk8X",
                                            "delay": [
                                                "500"
                                            ],
                                            "rotate": 0,
                                            "x": "357",
                                            "y": "0",
                                            "width": "393",
                                            "height": "462",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnoa8dcfv64q3vot119iottj6t.png",
                                                "width": "393",
                                                "height": "462"
                                            },
                                            "z_order": "1",
                                            "id": 7749,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeInDown"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/Fn3q7Huk-IEFkUDmswjGAQLDuqpK",
                                            "delay": [
                                                "500"
                                            ],
                                            "rotate": 0,
                                            "x": "0",
                                            "y": "25",
                                            "width": "367",
                                            "height": "464",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnoa9e9u1vg56icp13ikhcmv77.png",
                                                "width": "367",
                                                "height": "464"
                                            },
                                            "z_order": "1",
                                            "id": 7750,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        }
                                    ]
                                }
                            },
                            {
                                "id": "93164676",
                                "layout": {
                                    "background": "http:\/\/qnm.hunliji.com\/o_1bnob4nuoqh85s11kj2188beuh11.jpg",
                                    "elements": [
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "100ms"
                                            ],
                                            "height": "31",
                                            "img": "../image/andmyt.jpg",
                                            "rotate": "",
                                            "width": "180",
                                            "x": "293",
                                            "y": "81",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_0",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "300ms"
                                            ],
                                            "height": "20",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnob60giur83qf1lgb19bas8r1p.png",
                                            "rotate": "",
                                            "width": "585",
                                            "x": "88",
                                            "y": "153",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_1",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "500ms"
                                            ],
                                            "height": "21",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnob6a541chv14lf1j5v1phvv8e25.png",
                                            "rotate": "",
                                            "width": "595",
                                            "x": "80",
                                            "y": "203",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_2",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "700ms"
                                            ],
                                            "height": "22",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnob6h7pipc5741tja1vh31hk02h.png",
                                            "rotate": "",
                                            "width": "334",
                                            "x": "74",
                                            "y": "253",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_3",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "1200ms"
                                            ],
                                            "height": "23",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnob6u7413781j9udk7re71krg2t.png",
                                            "rotate": "",
                                            "width": "435",
                                            "x": "6",
                                            "y": "1147",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_4",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInRight"
                                            ],
                                            "delay": [
                                                "1400ms"
                                            ],
                                            "height": "81",
                                            "img": "http:\/\/qnm.hunliji.com\/o_1bnob73ee1f7u1da1qfs1goi1bbo39.png",
                                            "rotate": "",
                                            "width": "123",
                                            "x": "56",
                                            "y": "1089",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_5",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "delay": [
                                                "1600ms"
                                            ],
                                            "height": "63",
                                            "img": "http://qnm.hunliji.com/o_1c060gdpn17hivvr134319qtftf5k.png",
                                            "rotate": "",
                                            "width": "120",
                                            "x": "514",
                                            "y": "270",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_6",
                                            "line_spacing": null
                                        },
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInLeft"
                                            ],
                                            "delay": [
                                                "1000ms"
                                            ],
                                            "height": "138",
                                            "img": "../image/cx.jpg",
                                            "rotate": "",
                                            "width": "335",
                                            "x": "46",
                                            "y": "906",
                                            "z_order": "1",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_8",
                                            "line_spacing": null
                                        },
                                        {
                                            "animate": [
                                                "fadeInLeft"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/Frwv_wX8QfAug6EXJ6-DYpeadvGx",
                                            "delay": [
                                                "700"
                                            ],
                                            "rotate": 0,
                                            "x": "40",
                                            "y": "318",
                                            "width": "372",
                                            "height": "540",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnob853i1dgs1mqr6km17gdeuq57.png",
                                                "width": "372",
                                                "height": "540"
                                            },
                                            "z_order": "1",
                                            "id": 7738,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "img": "http://qnm.hunliji.com/Frchsv-7BxujpYfQHV6J95wpuFjO",
                                            "delay": [
                                                "1000"
                                            ],
                                            "rotate": 0,
                                            "x": "435",
                                            "y": "431",
                                            "width": "283",
                                            "height": "238",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnob8fqh1qfj1t0dmba1a6uni65q.png",
                                                "width": "283",
                                                "height": "238"
                                            },
                                            "z_order": "1",
                                            "id": 7739,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "img": "http://qnm.hunliji.com/FomXNdRTFtoI5KoRrYi_fZHzroAu",
                                            "delay": [
                                                "1500"
                                            ],
                                            "rotate": 0,
                                            "x": "435",
                                            "y": "675",
                                            "width": "283",
                                            "height": "238",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnob8jh119safe0fmuro01sf16d.png",
                                                "width": "283",
                                                "height": "238"
                                            },
                                            "z_order": "1",
                                            "id": 7740,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/FizikRLskVBUbuo2hYzdqwugyGOl",
                                            "delay": [
                                                "2000"
                                            ],
                                            "rotate": 0,
                                            "x": "435",
                                            "y": "919",
                                            "width": "283",
                                            "height": "238",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnob8os2ssn4k6gjf1p6ia1670.png",
                                                "width": "283",
                                                "height": "238"
                                            },
                                            "z_order": "1",
                                            "id": 7741,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        }
                                    ]
                                }
                            },
                            {
                                "id": "93164677",
                                "layout": {
                                    "background": "http:\/\/qnm.hunliji.com\/o_1bnpg9tjd1246v2igpp16lhdnq31.png",
                                    "elements": [
                                        {
                                            "infinite": "",
                                            "inf_delay": "ms",
                                            "inf_duration": "ms",
                                            "animate": [
                                                "fadeInDown"
                                            ],
                                            "delay": [
                                                "500ms"
                                            ],
                                            "height": "1030",
                                            "rotate": "",
                                            "width": "666",
                                            "x": "43",
                                            "y": "148",
                                            "z_order": "2",
                                            "duration": [
                                                "2000ms"
                                            ],
                                            "is_down": "0",
                                            "is_scale": "0",
                                            "id": "ele_0",
                                            "line_spacing": null
                                        },
                                        {
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "img": "http:\/\/qnm.hunliji.com\/FkgZT4CUegEYOjwUaWW-n1sSWptO",
                                            "delay": [
                                                "10"
                                            ],
                                            "rotate": 0,
                                            "x": "0",
                                            "y": "0",
                                            "width": "750",
                                            "height": "1220",
                                            "mask": {
                                                "img": "http:\/\/qnm.hunliji.com\/o_1bnpg7oagvpm1a7ibb9psophs2s.png",
                                                "width": "750",
                                                "height": "1220"
                                            },
                                            "z_order": "1",
                                            "id": 7742,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "img": "../image/invite.png",
                                            "delay": [
                                                "2000"
                                            ],
                                            "rotate": "0",
                                            "x": "55",
                                            "y": "198",
                                            "width": "642",
                                            "height": "42",
                                            "z_order": "3",
                                            "id": 10791,
                                            "type": "text",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "text_type": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "img": "../image/invite-map.png",
                                            "delay": [
                                                "1000"
                                            ],
                                            "rotate": "0",
                                            "x": "55",
                                            "y": "414",
                                            "width": "642",
                                            "height": "42",
                                            "z_order": "3",
                                            "id": 10791,
                                            "type": "text",
                                            "is_scale": "1",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "text_type": "",
                                            "edit_btn_position": 0
                                        },
                                        {
                                            "animate": [
                                                "fadeIn"
                                            ],
                                            "img": "../image/last.png",
                                            "delay": [
                                                "10"
                                            ],
                                            "rotate": 0,
                                            "x": "50",
                                            "y": "32",
                                            "width": "320",
                                            "height": "80",
                                            "z_order": "1",
                                            "id": 7742,
                                            "type": "image",
                                            "is_scale": "0",
                                            "is_down": "0",
                                            "duration": [
                                                "2000"
                                            ],
                                            "infinite": "",
                                            "inf_duration": "",
                                            "inf_delay": "",
                                            "edit_btn_position": 0
                                        },
                                    ],
                                    "layTemplate": "layTemplate_feedback",
                                    "attendButton": {
                                        "textColor": "#ffffff",
                                        "fillColor": "#8cbef0",
                                        "boxColor": "#8cbef0"
                                    }
                                }
                            }
                        ],
                        "music": {
                            "audio": "http://music01.cloud7.com.cn/d959285480d853083b5624b10c98007b.mp3",
                            "img": "http:\/\/qnm.hunliji.com\/o_1bo9huhc71g8d17jc5fi1hch1lm413.png",
                            "close_img": "http:\/\/qnm.hunliji.com\/o_1bo9hufjh5knctn13q625sk1ju.png"
                        },
                        "page_icon": "http:\/\/qnm.hunliji.com\/o_1bo9hukls105i1vs91b5ir9n9p518.png",
                        "share_img": "http:\/\/qnm.hunliji.com\/Fg_94Or0h7Ztq52FPoz3ZCp1z_sq",
                        "share": {
                            "title": "\u81ed\u5510\u8d85&\u4e56\u96f7\u674e\u7684\u5a5a\u793c\u9080\u8bf7",
                            "icon": "http:\/\/qnm.hunliji.com\/Fg_94Or0h7Ztq52FPoz3ZCp1z_sq?imageView2\/1\/w\/150\/h\/150",
                            "desc": "\u6211\u4eec\u5c06\u572806\u670803\u65e5\u4e3e\u884c\u5a5a\u793c\uff0c\u8bda\u631a\u9080\u8bf7\u60a8\u7684\u5230\u6765",
                            "min_program_hdimagepath": "http:\/\/qnm.hunliji.com\/Fg_94Or0h7Ztq52FPoz3ZCp1z_sq"
                        },
                        "theme_background": "http:\/\/qnm.hunliji.com\/o_1bnpgvlnl4crappsu4ogr1rv05a.png"
                    },
                    "current_time": 1523366366
                }
            ;

            var c, d, e, f, g;
            if (0 == b.status.RetCode) {
                if (1 == b.data.cardInfo.closed && !a.type)
                    return a.closeCardState(),
                        void 0;
                if (a.result = b.data,
                        a.card_claim = a.result.cardInfo.card_claim && a.result.cardInfo.card_claim.is_open,
                        a.total_income = a.result.cardInfo.card_claim && a.result.cardInfo.card_claim.total_income || "",
                        a.need_auth = a.result.cardInfo.card_claim && a.result.cardInfo.card_claim.need_auth || "",
                        document.getElementById("all-page").style.height = a.height + "px",
                        a.init(),
                        a.musicOpen = a.result.music.img || a.changeImgUrl("//qnm.hunliji.com/o_1bi67lq091qtt1gfs60cpadqjj7.png"),
                        a.musicClose = a.result.music.close_img || a.changeImgUrl("//qnm.hunliji.com/o_1bi67m2q63tilg81vh1q3v10g6c.png"),
                        a.pageIcon = a.result.page_icon || a.changeImgUrl("//qnm.hunliji.com/o_1agpam0fsibn2814j110101jcr7.png"),
                        setTimeout(function () {
                            a.otherAction({
                                chat_state: 1 == a.result.cardInfo.set_up.danmu ? !0 : !1,
                                chat_entry: 1 == a.result.cardInfo.set_up.wish ? !0 : !1,
                                chat_gift: 1 == a.result.cardInfo.set_up.gift ? !0 : !1,
                                chat_cash: 1 == a.result.cardInfo.set_up.gold ? !0 : !1
                            })
                        }),
                    a.getCookie("musicStatePause") && (a.musicStatePause = "false",
                    a.type && (a.musicStatePause = "false",
                        a.writeCookie("musicStatePause", "false", 360))),
                    1 == b.data.cardInfo.closed && !a.type)
                    return !1;
                b.data.music.audio && (a.type && $("body").on("touchstart", function () {
                    "false" == a.musicStatePause && document.getElementById("playMusic").play()
                }),
                    document.getElementById("playMusic").setAttribute("src", b.data.music.audio),
                "false" == a.musicStatePause && document.getElementById("playMusic").play(),
                navigator.userAgent.indexOf("iPhone") > -1 && (wx.config({
                    debug: !1,
                    appId: "",
                    timestamp: 1,
                    nonceStr: "",
                    signature: "",
                    jsApiList: []
                }),
                    wx.ready(function () {
                        "false" == a.musicStatePause && document.getElementById("playMusic").play()
                    })),
                    c = document.createElement("div"),
                    d = document.createElement("img"),
                    e = a.musicOpen,
                    f = a.musicClose,
                    d.setAttribute("src", "true" != a.musicStatePause ? e : f),
                    c.setAttribute("id", "musicBtn"),
                    c.appendChild(d),
                    c.style.width = 84 / a.UI_WIDTH * a.width + "px",
                    c.style.top = 20 / a.UI_WIDTH * a.width + "px",
                    c.style.right = 20 / a.UI_WIDTH * a.width + "px",
                    document.getElementById("other").appendChild(c),
                    g = document.getElementById("playMusic"),
                    g.addEventListener("timeupdate", function () {
                        "false" == a.musicStatePause && $("#musicBtn").addClass("rotate")
                    }))
            }
            //     }
            // })
        }
        ,
        closeCardState = function () {
            $(".loadmore-loading").remove();
            var a = document.createElement("div");
            a.setAttribute("id", "closedCard"),
                a.innerHTML = '<img src="' + this.changeImgUrl("//qnm.hunliji.com/o_1c0gi5mnl1kpa172p17s18vkdm67.png") + '" />',
                a.style.marginTop = 264 / this.UI_WIDTH * this.width + "px",
                document.body.appendChild(a)
        }
        ,
        init = function () {
            function i(b, c) {
                if ($(".winBgt").length >= 1)
                    return $(".bgt_tit").text(b),
                        $(".bgt_col").text(c),
                        $(".winBgt").show(),
                        $("#chatBox").show(),
                        !1;
                var d = document.createElement("div")
                    , e = document.createElement("div");
                e.setAttribute("class", "winBgt"),
                    d.setAttribute("id", "chatBox"),
                    d.style.padding = 60 / a.UI_WIDTH * a.width + "px",
                    d.innerHTML = '<img class="c_btn" style="position:absolute;top:0;right:0;width:' + 60 / a.UI_WIDTH * a.width + 'px" src="' + a.changeImgUrl("http://qnm.hunliji.com/o_1blaqnfq612e8arl1lb3g53n2u7.png") + '"/>                <dl>                  <dt><h3 class="bgt_tit">' + b + '</h3></dt>                  <dd><p3 class="bgt_col">' + c + "</p></dd>                </dl>",
                    document.getElementById("other").appendChild(e),
                    document.getElementById("other").appendChild(d)
            }

            var e, f, g, h, a = this, b = {}, c = 0, d = null;
            for (this.is_get_confirm = 1 == this.getCookie("is_get_confirm") || !1,
                     this.with_myb = this.getParams("with_myb"),
                     sessionStorage.backUrl = location.href,
                 this.result.theme_background && $("body").css({
                     background: "url(" + this.result.theme_background + ") 0 0 no-repeat",
                     "background-size": "100% 100%"
                 }),
                     this.result.page.forEach(function (b, c) {
                         b.layout.layTemplate && (a.guests.no = c,
                             a.guests.html = b,
                             a.buttonBg = b.layout.attendButton.boxColor,
                             a.textColor = b.layout.attendButton.textColor)
                     }),
                     0 == a.result.guest_template ? a.guestPageHide(!0) : null,
                     b = a.result.share ? {
                         imgUrl: a.result.share.icon,
                         link: a.result.share.url,
                         desc: a.result.share.desc,
                         title: a.result.share.title
                     } : {
                         imgUrl: "" + a.result.share_img,
                         link: a.isWeiXin() ? location.origin + "/p/wedding/Public/wap/invitationCard/demonew.html" + location.search : location.href,
                         desc: a.result.cardInfo.groom_name + "与" + a.result.cardInfo.bride_name + "要结婚了，诚挚邀请您光临。",
                         title: a.result.cardInfo.groom_name + "与" + a.result.cardInfo.bride_name + "的结婚邀请"
                     },
                     // wxShare.setWeiXinData({
                     //     appId: "",
                     //     imgUrl: b.imgUrl,
                     //     link: b.link,
                     //     desc: b.desc,
                     //     title: b.title
                     // }),
                     e = [],
                     f = a.result.page[0].layout.elements,
                     g = 0; g < f.length; g++)
                e.push(f[g].img);
            this.loading(e, function () {
                $(".loadmore-loading").remove(),
                    $("#musicBtn").css({
                        "margin-top": 0
                    }),
                    $("#all-page").empty().append(a.createPage(a.result.page).slice(0, 1)),
                    setTimeout(function () {
                        1 == $("#all-page div.layout").length && $("#all-page").append(a.createPage(a.result.page).slice(1))
                    }, 300),
                    a.addStyleNode(),
                document.getElementById("vid") && (document.getElementById("vid").muted = "muted"),
                    a.upDownIcon(),
                $("#vid").length > 0 && (document.getElementById("vid").addEventListener("loadedmetadata", function () {
                }),
                    document.getElementById("vid").addEventListener("timeupdate", function () {
                        $("#video").parent().removeClass("vhave")
                    }),
                    document.getElementById("vid").addEventListener("play", function () {
                    })),
                    a.touchAction(),
                a.videoHave && navigator.userAgent.indexOf("Android") <= -1 && $("#video").parent().addClass("vhave"),
                    setTimeout(function () {
                        a.getCookie("editState") && a.type && (a.editState = "true" == a.getCookie("editState") ? !0 : !1),
                        a.type && a.getParams("edit") && (a.editState = 1 == a.getParams("edit") ? !0 : !1),
                            a.editIconState(a.editState)
                    }, 0),
                    a.sdk(),
                a.is_get_confirm || (sessionStorage.getItem("gift_id") && a.wxsq_event("CardGift2Recv", sessionStorage.getItem("gift_id")),
                sessionStorage.getItem("cash_id") && a.wxsq_event("CardGift2Recv", sessionStorage.getItem("cash_id"))),
                    setTimeout(function () {
                        sessionStorage.getItem("current_seating") && (a.gotoPage(sessionStorage.getItem("current_seating")),
                            a.chatMsg())
                    }, 300)
            }),
                this.allImg(this.result),
                // this.ajax_gifts(),
                h = document.documentElement.clientHeight || document.body.clientHeight,
                $(window).on("resize", function () {
                    var a = document.documentElement.clientHeight || document.body.clientHeight;
                    h > a ? navigator.userAgent.indexOf("Android") > -1 && $("#gusetBox").css({
                        bottom: h - a + "px",
                        top: a - $("#gusetBox").height() + "px"
                    }) : navigator.userAgent.indexOf("Android") > -1 && $("#gusetBox").css({
                        bottom: "0",
                        top: "auto"
                    })
                }),
                $(document).on("touchstart", ".c_btn,.winBgt", function () {
                    $(".winBgt").hide(),
                        $("#chatBox").hide()
                }),
                $(document).on("touchstart", ".c_g p", function () {
                    var b = ($(this).text().split("："),
                        $(this).find("span").text())
                        , c = $(this).find("em").text();
                    i(b, c)
                }),
                $(document).on("touchstart", "#musicBtn", function () {
                    var b = $(this);
                    b.hasClass("rotate") ? (a.musicStatePause = "true",
                        a.writeCookie("musicStatePause", "true", 360),
                        document.getElementById("playMusic").pause(),
                        b.removeClass("rotate"),
                        $("#musicBtn img").attr("src", a.musicClose)) : (a.musicStatePause = "false",
                        a.writeCookie("musicStatePause", "false", 360),
                        document.getElementById("playMusic").play(),
                        $("#musicBtn img").attr("src", a.musicOpen))
                }),
                $(document).on("touchstart", "#video", function () {
                    document.getElementById("vid").muted = "muted",
                        document.getElementById("vid").play(),
                        $(".videoMH").removeClass("nosee")
                }),
                $(document).on("touchstart", ".noVideo", function () {
                    location.reload()
                }),
                $(document).on("touchstart", ".navigation", function () {
                    return a.type ? !1 : (location.href = a.mapUrl,
                        void 0)
                }),
                $(document).on("touchstart", ".dwIcon", function () {
                    return a.type ? !1 : (location.href = a.mapUrl,
                        void 0)
                }),
                // $(document).on("touchstart", "#sendBtnWin", function () {
                //     $(".winMsg").remove(),
                //         $(".winBg").remove()
                // }),
                $(document).on("touchstart", ".editIcon", function () {
                    var b = {}
                        , c = $(this);
                    b.id = c.attr("id"),
                        b.page_id = c.attr("page_id"),
                        b.type = c.attr("type"),
                    c.attr("videoP") && (b.video_path = c.attr("videoP"),
                        b.video_width = c.attr("videoW"),
                        b.video_height = c.attr("videoH")),
                        c.hasClass("card_info") ? a.editCard_app("a", {
                            cardInfo: !0
                        }) : a.editCard_app("b", b)
                }),
                $(document).on("touchstart", ".edit_icon_pop_container", function () {
                    var b = {}
                        , c = $(this);
                    b.id = c.attr("id"),
                        b.page_id = c.attr("page_id"),
                        b.type = "image",
                        a.editCard_app("b", b)
                }),
                // $(document).on("touchstart", ".sureBtn", function () {
                //     var b = $(".ac_wish_txt")
                //         , c = $(".ac_name_txt");
                //     return b.blur(),
                //         c.blur(),
                //         clearInterval(d),
                //         b.val().trim() ? c.val().trim() ? (a.send_name = c.val(),
                //             a.ajax_reply({
                //                 card_id: a.card_id,
                //                 name: a.send_name,
                //                 state: 3,
                //                 wish_language: b.val()
                //             }, function () {
                //                 b.val(""),
                //                     a.getGifts_replies(1)
                //             }),
                //             $("#allCode").css({
                //                 zIndex: "-1",
                //                 opacity: 0
                //             }),
                //             void 0) : (a.outputMsg("请输入您的姓名"),
                //             void 0) : (a.outputMsg("请留下您的祝福"),
                //             void 0)
                // }),
                // $(document).on("input", ".ac_wish_txt,.ac_name_txt", function () {
                //     $(".ac_wish_txt").val().trim() && $(".ac_name_txt").val().trim() ? $(".sureBtn").addClass("active") : $(".sureBtn").removeClass("active"),
                //     $(this).hasClass("ac_name_txt") && (a.send_name = $(this).val().trim())
                // }),
                // $(document).on("input", "#nameTxtV2", function () {
                //     $(this).val().trim() ? $("#sendGiftBtnV2").addClass("active") : $("#sendGiftBtnV2").removeClass("active"),
                //         a.send_name = $(this).val().trim()
                // }),
                // $(document).on("focus", ".ac_wish_txt", function () {
                //     a.chatState || (a.chatState = !0,
                //         $(this).addClass("zc"),
                //         $(this).val("").focus()),
                //     navigator.userAgent.indexOf("iPhone") > -1 && navigator.userAgent.indexOf("iPhone OS 11") <= -1 && (d = setInterval(function () {
                //         document.body.scrollTop = document.body.scrollHeight
                //     }, 200))
                // }),
                // $(document).on("blur", ".ac_wish_txt", function () {
                //     $(this).val().trim() || (a.chatState = !1,
                //         $(this).removeClass("zc"),
                //         $(this).val("")),
                //         clearInterval(d)
                // }),
                // $(document).on("touchend", "#allCode_bg", function () {
                //     setTimeout(function () {
                //         $(".ac_wish_txt").val("").blur(),
                //             $(".ac_name_txt").blur()
                //     }, 300)
                // }),
                // $(document).on("touchend", "#guestBg", function () {
                //     setTimeout(function () {
                //         $("#gusetName").val("").blur()
                //     }, 300)
                // }),
                // $(document).on("touchend", "#wishTxt", function(b) {
                //     return b.stopPropagation(),
                //     $(".ac_wish_txt").val().trim() && $(".ac_name_txt").val().trim() ? $(".sureBtn").addClass("active") : $(".sureBtn").removeClass("active"),
                //     a.type ? (a.outputMsg("请先发送请帖"),
                //     !1) : $(this).parent().parent().hasClass("noAction") ? !1 : ("" != a.send_name && $(".ac_name_txt").val(a.send_name),
                //     setTimeout(function() {
                //         $("#allCode").css({
                //             zIndex: 9,
                //             opacity: 1
                //         }),
                //         $("#allCode_bg").css({
                //             "-webkit-transform": "translateY(0)"
                //         })
                //     }, 300),
                //     navigator.userAgent.indexOf("Android") > -1 ? setTimeout(function() {
                //         $(".ac_wish_txt").focus()
                //     }, 300) : navigator.userAgent.indexOf("iPhone") > -1 && $(".ac_wish_txt").focus(),
                //     void 0)
                // }),
                $(document).on("touchend", "#allCode_bg", function () {
                    $(this).css({
                        "-webkit-transform": "translateY(" + a.height + "px)"
                    }),
                        $("#allCode").css({
                            zIndex: "-1",
                            opacity: 0
                        })
                }),
                // $(document).on("focus", ".ac_name_txt", function () {
                //     $(this).val() || $(this).addClass("zc"),
                //     navigator.userAgent.indexOf("iPhone") > -1 && navigator.userAgent.indexOf("iPhone OS 11") <= -1 && (d = setInterval(function () {
                //         document.body.scrollTop = document.body.scrollHeight
                //     }, 200))
                // }),
                // $(document).on("blur", ".ac_name_txt", function () {
                //     $(this).val().trim() || $(this).removeClass("zc"),
                //         clearInterval(d)
                // }),
                // $(document).on("touchstart", "#giftShow", function () {
                //     return a.type ? (a.outputMsg("请先发送请帖"),
                //         !1) : $(this).parent().hasClass("nobody") ? !1 : (a.sdkData({
                //         action: "giftShow",
                //         eventable_type: "Card",
                //         additional: {
                //             ip: a.ip,
                //             card_id: a.card_id,
                //             num: a.rans(32)
                //         }
                //     }),
                //         a.mzClick(),
                //     "" != a.send_name && $("#nameTxt").val(a.send_name),
                //         $("#send_gift").css("-webkit-transform", "translateY(0)"),
                //         $("#bgc").show(),
                //         a.mzImp(),
                //         a.animateGiftAni(),
                //         void 0)
                // }),
                $(document).on("touchstart", "#bgc", function () {
                    $("#send_gift").css("-webkit-transform", "translateY(100%)"),
                        $("#bgc").hide(),
                        a.$giftAni.removeClass("animate"),
                        document.activeElement.blur(),
                    !a.is_get_confirm && a.CardRepliesV2_id && a.wxsq_event("CardRepliesV2", a.CardRepliesV2_id)
                }),
                $(document).on("focus", "#nameTxt", function () {
                    "" == a.send_name && $(this).addClass("zc")
                }),
                $(document).on("blur", "#nameTxt", function () {
                    $(this).val().trim() ? a.send_name = $(this).val() : $(this).removeClass("zc")
                }),
                // $(document).on("touchstart", "#sendGiftBtn", function () {
                //     $("#send_gift").css("-webkit-transform", "translateY(100%)"),
                //         $("#bgc").hide(),
                //         sessionStorage.setItem("current_seating", a.seating)
                // }),
                // $(document).on("touchstart", "#sendGiftBtnV2", function () {
                //     var c, b = $("#nameTxtV2");
                //     return b.val().trim() ? (a.send_name = b.val(),
                //         $("#gift_bg").css({
                //             "-webkit-transform": "translateY(" + a.height + "px)"
                //         }),
                //         b.blur(),
                //         setTimeout(function () {
                //             $("#gift_form").removeClass("active")
                //         }, 300),
                //         sessionStorage.setItem("current_seating", a.seating),
                //         c = (new Date).getTime(),
                //         a.sendGift({
                //             payName: a.send_name,
                //             paySouName: a.user_name,
                //             payApi: a.API.sendGift,
                //             payGift: a.giftProperty.title,
                //             payParams: {
                //                 current_time: c,
                //                 card_gift2_id: a.giftProperty.id,
                //                 card_id: a.card_id,
                //                 giver_name: a.send_name,
                //                 user_id: a.user_id,
                //                 wishes: a.send_wish
                //             },
                //             payMoney: a.giftProperty.price,
                //             payCallBack: "/p/wedding/Public/hlj-m/card-pay-success/index.html"
                //         }),
                //         b.blur(),
                //         $("body").append('<div class="loadmore-loading"><div></div><p></p></div>'),
                //         void 0) : (a.outputMsg("请填写姓名"),
                //         !1)
                // }),
                // $(document).on("touchstart", ".red_packets a", function (a) {
                //     c = a.changedTouches[0].clientY
                // }),
                // $(document).on("touchend", ".red_packets a", function (b) {
                //     if (b.changedTouches[0].clientY - c < 10 && b.changedTouches[0].clientY - c >= 0) {
                //         if (a.type)
                //             return a.outputMsg("请先发送请帖"),
                //                 !1;
                //         if ($(this).parent().hasClass("nobody"))
                //             return !1;
                //         a.sdkData({
                //             action: "priceShow",
                //             eventable_type: "Card",
                //             additional: {
                //                 ip: a.ip,
                //                 card_id: a.card_id,
                //                 num: a.rans(32)
                //             }
                //         }),
                //         "" != a.send_name && $(".red_packets_name_txt").val(a.send_name),
                //             $("#red_packets_bg").removeClass("hide").css({
                //                 zIndex: "12",
                //                 opacity: 1
                //             }),
                //             $("#red_packets_form").removeClass("hide").css({
                //                 zIndex: "12",
                //                 opacity: 1
                //             }),
                //             $(".money").css({
                //                 "-webkit-animation": "money 1000ms ease-in-out 100ms forwards"
                //             }),
                //             a.writeCookie("giftPage_enter", !0, 1),
                //             a.$giftAni.removeClass("animate")
                //     }
                // }),
                // $(document).on("touchstart", ".close_red_packets", function () {
                //     $("#red_packets_bg").addClass("hide").css({
                //         zIndex: "-1",
                //         opacity: 0
                //     }),
                //         $("#red_packets_form").addClass("hide").css({
                //             zIndex: "-1",
                //             opacity: 0
                //         }),
                //         $(".money").css({
                //             "-webkit-animation": "none"
                //         })
                // }),
                // $(document).on("touchstart", "#priceShow", function () {
                //     return a.type ? (a.outputMsg("请先发送请帖"),
                //         !1) : $(this).parent().hasClass("nobody") ? !1 : (a.sdkData({
                //         action: "priceShow",
                //         eventable_type: "Card",
                //         additional: {
                //             ip: a.ip,
                //             card_id: a.card_id,
                //             num: a.rans(32)
                //         }
                //     }),
                //     "" != a.send_name && ($(".red_packets_name_txt").val(a.send_name),
                //         $(".red_packets_name_txt").addClass("zc")),
                //         $("#red_packets_bg").removeClass("hide").css({
                //             zIndex: "12",
                //             opacity: 1
                //         }),
                //         $("#red_packets_form").removeClass("hide").css({
                //             zIndex: "12",
                //             opacity: 1
                //         }),
                //         $(".money").css({
                //             "-webkit-animation": "money 1000ms ease-in-out 100ms both"
                //         }),
                //         void 0)
                // }),
                // $(document).on("touchstart", "#sendPriceBtnV2", function () {
                //     if ("请输入您的姓名" != $(".red_packets_name_txt").val() && "" != $(".red_packets_name_txt").val().replace(/[ ]/g, ""))
                //         if (a.send_name = $(".red_packets_name_txt").val(),
                //             "" == $(".red_packets_money_txt").val().replace(/[ ]/g, "") || "请输入礼金金额" == $(".red_packets_money_txt").val().replace(/[ ]/g, ""))
                //             a.outputMsg("请输入礼金金额");
                //         else if (isNaN($(".red_packets_money_txt").val()))
                //             a.outputMsg("礼金金额输入不合法");
                //         else if (parseInt($(".red_packets_money_txt").val()) < 1)
                //             a.outputMsg("礼金金额不能小于1元");
                //         else if (parseInt($(".red_packets_money_txt").val()) > 3e3)
                //             a.outputMsg("已超出微信单笔支付3000元的限额，请调整金额后再试");
                //         else {
                //             a.send_price = $(".red_packets_money_txt").val(),
                //                 $("#red_packets_bg").addClass("hide").css({
                //                     zIndex: "-1",
                //                     opacity: 0
                //                 }),
                //                 $("#red_packets_form").addClass("hide").css({
                //                     zIndex: "-1",
                //                     opacity: 0
                //                 }),
                //             a.getCookie("giftPage_enter") && a.writeCookie("showGiftPage", !0, 1),
                //                 sessionStorage.setItem("current_seating", a.seating);
                //             var b = (new Date).getTime();
                //             a.sendCash({
                //                 api: a.API.sendCash,
                //                 callback: "/p/wedding/Public/hlj-m/card-pay-success/index.html",
                //                 data: {
                //                     card_id: a.card_id,
                //                     current_time: b,
                //                     giver_name: a.send_name,
                //                     price: a.send_price
                //                 },
                //                 SouName: a.user_name
                //             }),
                //                 a.writeCookie("giftPage_enter", "", -1),
                //                 $(".red_packets_name_txt").blur(),
                //                 $(".red_packets_money_txt").blur(),
                //                 $("body").append('<div class="loadmore-loading"><div></div><p></p></div>')
                //         }
                //     else
                //         a.outputMsg("请填写姓名")
                // }),
            navigator.userAgent.indexOf("Android") > -1 && $(document).on("touchend", "img", function (a) {
                a.preventDefault()
            }),
                this.get_infinite(),
                a.wxsq()
        }
        ,
        hideEdit = function (a) {
            a ? ($(".editIcon").addClass("nosee"),
                this.hideEditState = !0) : ($(".editIcon").removeClass("nosee"),
                this.hideEditState = !1)
        }
        ,
        otherAction = function (a) {
            this.otherState = a;
            for (var b in this.otherState)
                "chat_state" == b ? this.otherState[b] ? ($(".chat_dis").removeClass("nosee"),
                    $("#giftModule").removeClass("nosee")) : ($(".chat_dis").addClass("nosee"),
                    $("#giftModule").addClass("nosee")) : "chat_entry" == b ? this.otherState[b] ? $(".c_txt ").removeClass("noAction") : $(".c_txt ").addClass("noAction") : "chat_gift" == b ? this.otherState[b] ? $("#giftShow").parent().removeClass("nobody") : $("#giftShow").parent().addClass("nobody") : "chat_cash" == b && (this.otherState[b] ? $("#priceShow").parent().removeClass("nobody") : $("#priceShow").parent().addClass("nobody"))
        }
        ,
        guestPageHide = function (a) {
            var b = this;
            b.guestState = a,
                this.result.page.forEach(function (a, c) {
                    a.layout.layTemplate && (b.guests.no = c, b.guests.html = a)
                });
            b.guestState ? (b.guestState = !1, b.delPage(b.guests.no),
                $("#chat_msg").show(),
                $("#chat_msg").css("opacity", 1)) : (b.addPage(b.guests.html, "guestPageHide"),
                $("#chat_msg").hide(),
                $("#chat_msg").css("opacity", 0),
                $(".mapSeat").attr("src", b.mapSrc)),
            "0px" == $("#lastAbout").css("top") && ($("#lastAbout").css({
                top: b.height + "px"
            }),
                b.lastState = !1,
                b.lastDown = !0)
        }
        ,
        get_infinite = function () {
            var a, b, c, d;
            for (this.infiniteArr.length > 0 ? this.infiniteArr = [] : null,
                     a = 0; a < this.result.page.length; a++)
                for (b = 0; b < this.result.page[a].layout.elements.length; b++)
                    this.result.page[a].layout.elements[b].infinite && (c = {},
                        d = this.result.page[a].layout.elements,
                        c.page_id = this.result.page[a].id,
                        c.id = d[b].id || Math.round(1e16 * Math.random()),
                        c.infinite = d[b].infinite,
                        c.inf_duration = d[b].inf_duration || "1000ms",
                        c.inf_delay = d[b].inf_delay || "0ms",
                        c.delay = d[b].delay || "0ms",
                        c.duration = d[b].duration || "1000ms",
                        c.animate = d[b].animate,
                        this.infiniteArr.push(c))
        },
        winMsg = function (a) {
            var g, h, i, j, k, m, c = document.createElement("div"), d = "", e = this,
                f = document.createElement("div");
            f.setAttribute("class", "winBg"),
                c.setAttribute("class", "winMsg"),
                c.style.width = 480 / this.UI_WIDTH * this.width + "px",
                c.style.top = 350 / this.UI_WIDTH * this.width + "px",
                c.style.paddingBottom = 45 / this.UI_WIDTH * this.width + "px",
                g = 65 / this.UI_WIDTH * this.width + "px",
                h = 34 / this.UI_WIDTH * this.width + "px",
                i = 32 / this.UI_WIDTH * this.width + "px",
                j = 72 / this.UI_WIDTH * this.width + "px",
                k = 45 / this.UI_WIDTH * this.width + "px",
            20 / this.UI_WIDTH * this.width + "px",
                m = 25 / this.UI_WIDTH * this.width + "px",
                d = e.getCookie("cardPrice") || e.getCookie("cardGift") ? '<div id="iknow" class="winMsgBtn" style="margin-top:' + k + ";font-size:" + i + ";height:" + j + ";line-height:" + j + '">知道啦</div>' : e.otherState.chat_gift && e.otherState.chat_cash ? '<div id="' + a.id + '" class="winMsgBtn" style="margin-top:' + k + ";font-size:" + i + ";height:" + j + ";line-height:" + j + '">' + a.col + "</div>" : '<div id="iknow" class="winMsgBtn" style="margin-top:' + k + ";font-size:" + i + ";height:" + j + ";line-height:" + j + '">知道啦</div>',
            (1 == e.send_state || 2 == e.send_state) && (d = "",
                d = e.otherState.chat_gift && e.otherState.chat_cash ? '<div id="' + a.id + '" class="winMsgBtn" style="margin-top:' + k + ";font-size:" + i + ";height:" + j + ";line-height:" + j + '">' + a.col + "</div>" : '<div id="iknow" class="winMsgBtn" style="margin-top:' + k + ";font-size:" + i + ";height:" + j + ";line-height:" + j + '">知道啦</div>',
            "" == d && (d = '<div id="iknow" class="winMsgBtn" style="margin-top:' + k + ";font-size:" + i + ";height:" + j + ";line-height:" + j + '">知道啦</div>')),
                c.innerHTML = '<i class="closedBtn"></i><img style="margin-top:' + g + '" src="' + e.changeImgUrl(a.img) + '"/><span style="margin-top:' + m + ";font-size:" + h + '">' + a.disMsg + "</span>" + d,
                document.body.appendChild(c),
                document.body.appendChild(f),
                $("#iknow").on("touchend", function (a) {
                    a.stopPropagation(),
                        $(".winMsg").remove(),
                        $(".winBg").remove(),
                        $("#allCode_bg").css({
                            "-webkit-transform": "translateY(" + e.height + "px)"
                        }),
                    !e.is_get_confirm && e.CardRepliesV2_id && e.wxsq_event("CardRepliesV2", e.CardRepliesV2_id)
                }),
                $(".closedBtn").on("touchend", function (a) {
                    a.stopPropagation(),
                        $(".winMsg").remove(),
                        $(".winBg").remove(),
                        $("#allCode_bg").css({
                            "-webkit-transform": "translateY(" + e.height + "px)"
                        }),
                    !e.is_get_confirm && e.CardRepliesV2_id && e.wxsq_event("CardRepliesV2", e.CardRepliesV2_id)
                }),
                $(document).on("touchstart", "#giftPageBtn", function (a) {
                    a.stopPropagation(),
                        $(".winMsg").remove(),
                        $(".winBg").remove(),
                        $("#allCode_bg").css({
                            "-webkit-transform": "translateY(" + e.height + "px)"
                        }),
                        e.showGiftPage = !1,
                        $(".layout").eq(e.seating).addClass("hide").css({
                            "-webkit-transform": "translateY(" + e.height + ")"
                        }),
                        $(".ele_background_" + e.seating).addClass("hide"),
                        e.seating = e.result.page.length - 1,
                        e.otherMap(e.srcMap),
                        $(".layout").eq(e.seating).removeClass("hide").css({
                            "-webkit-transform": "translateY(0)"
                        }),
                        $(".ele_background_" + e.seating).removeClass("hide").css({
                            "-webkit-transform": "translateY(0)"
                        }),
                        $("#chat_msg").hide(),
                        $("#chat_msg").css("opacity", 0),
                        $("#giftPage").css({
                            top: 0,
                            opacity: 1
                        }),
                        e.animateGiftAni(),
                        $("#upImg").hide()
                })
        }
        ,
        outputMsg = function (a, b) {
            if ($(".msgWin").length > 0)
                return !1;
            var c = document.createElement("div");
            b && (c.style.width = "60%",
                c.style.background = "rgba(0,0,0,.6)"),
                c.style.zIndex = 999,
                c.setAttribute("class", "msgWin"),
                c.innerHTML = "<p>" + a + "</p>",
                document.getElementById("other").appendChild(c),
                setTimeout(function () {
                    b || $(".msgWin").remove()
                }, 1500)
        }
        ,
        loadAnimate = function (a) {
            function h(a) {
                g.save(),
                    g.strokeStyle = "#fca7a7",
                    g.lineWidth = 16,
                    g.beginPath(),
                    g.arc(b.cx / 2, b.cy / 2, b.cr, -Math.PI / 2, -Math.PI / 2 + d * a + .5, !1),
                    g.stroke(),
                    g.restore()
            }

            function i() {
                if (g.clearRect(0, 0, canvas.width, canvas.height),
                        h(c),
                    100 > c)
                    c += .2;
                else if (a)
                    return $("#canvas").remove(),
                        a(),
                        !1;
                setTimeout(i, b.speed)
            }

            var e, f, g, b = {}, c = 1, d = 2 * Math.PI / 100;
            b.cx = 200,
                b.cy = 200,
                b.cr = 60,
                b.speed = 1,
                e = document.createElement("div"),
                f = document.createElement("canvas"),
                g = f.getContext("2d"),
                e.setAttribute("id", "canvasBox"),
                e.style.width = 100 / this.UI_WIDTH * this.width + "px",
                e.style.height = 100 / this.UI_WIDTH * this.width + "px",
                f.style.position = "absolute",
                f.style.margin = "auto",
                f.style.top = "0",
                f.style.right = "0",
                f.style.bottom = "0",
                f.style.left = "0",
                f.style.zIndex = "9",
                f.setAttribute("width", b.cx),
                f.setAttribute("height", b.cy),
                f.setAttribute("id", "canvas"),
                document.body.appendChild(e),
                document.getElementById("canvasBox").appendChild(f),
                i()
        }
        ,
        allImg = function (a) {
            var c, d, e,
                b = [this.changeImgUrl("//qnm.hunliji.com/o_1bid6p3ojgs8uptnu919pd5os7.png"), this.changeImgUrl("//qnm.hunliji.com/o_1bke091mk1p7jimp192lvqrkl87.png")];
            for (c = 0; c < a.page.length; c++)
                for (d = 0; d < a.page[c].layout.elements.length; d++)
                    a.page[c].layout.elements[d].img && (e = a.page[c].layout.elements[d].img,
                        b.push(e));
            this.loading(b, function () {
            })
        }
        ,
        loading = function (a, b) {
            var d, e, c = 0;
            for (d = 0; d < a.length; d++)
                a[d] || a.splice(d, 1),
                    e = new Image,
                    e.onload = function () {
                        c++,
                        c >= a.length && b && b()
                    }
                    ,
                    e.src = this.changeImgUrl(a[d])
        }
        ,
        rov_infinite = function (a) {
            var b, c, d, e, f;
            for (this.timeAni ? clearTimeout(this.timeAni) : null,
                     b = this,
                     c = b.infiniteArr,
                     d = c.length,
                     e = b.seating,
                     a > 0 ? e++ : e--,
                     f = 0; d > f; f++)
                c[f].page_id == this.result.page[this.seating].id && $(".ani_" + b.result.page[b.seating].id + "_" + c[f].id).hasClass("infinite") && ($(".ani_" + b.result.page[b.seating].id + "_" + c[f].id).removeClass(c[f].infinite),
                    $(".ani_" + b.result.page[b.seating].id + "_" + c[f].id).removeClass("infinite"),
                    $(".ani_" + b.result.page[b.seating].id + "_" + c[f].id).css({
                        "-webkit-animation-delay": c[f].delay
                    }),
                    $(".ani_" + b.result.page[b.seating].id + "_" + c[f].id).css({
                        "-webkit-animation-duration": c[f].duration
                    }),
                    $(".ani_" + b.result.page[b.seating].id + "_" + c[f].id).addClass(c[f].animate)),
                f >= d - 1 && (b.timeAni = setTimeout(function () {
                    b.add_infinite()
                }, 1600))
        }
        ,
        add_infinite = function () {
            var e, a = this, b = this.infiniteArr, c = b.length;
            for ($(".animated"),
                     a.timeAni ? clearTimeout(a.timeAni) : null,
                     e = 0; c > e; e++)
                a.result.page[a.seating].id == b[e].page_id && void 0 != b[e].page_id && ($(".ani_" + a.result.page[a.seating].id + "_" + b[e].id).removeClass(b[e].animate),
                    $(".ani_" + a.result.page[a.seating].id + "_" + b[e].id).addClass(b[e].infinite),
                    $(".ani_" + a.result.page[a.seating].id + "_" + b[e].id).addClass("infinite"),
                    $(".ani_" + a.result.page[a.seating].id + "_" + b[e].id).css({
                        "-webkit-animation-duration": b[e].inf_duration
                    }),
                    $(".ani_" + a.result.page[a.seating].id + "_" + b[e].id).css({
                        "-webkit-animation-delay": b[e].inf_delay
                    }))
        }
        ,
        addStyle = function (a, b) {
            var f, g, c = "", d = "linear";
            switch (a.infinite) {
                case "animate_leftTop":
                    c = "leftTop_rotate",
                        d = "ease-in-out";
                    break;
                case "animate_leftBottom":
                    c = "leftBottom_rotate",
                        d = "ease-in-out";
                    break;
                case "animate_rightTop":
                    c = "rightTop_rotate",
                        d = "ease-in-out";
                    break;
                case "animate_rightBottom":
                    c = "rightBottom_rotate",
                        d = "ease-in-out";
                    break;
                case "rotate":
                    c = "rotate";
                    break;
                case "bounce":
                    c = "bounce";
                    break;
                case "flash":
                    c = "flash";
                    break;
                case "pulse":
                    c = "pulse";
                    break;
                case "rubberBand":
                    c = "rubberBand";
                    break;
                case "shake":
                    c = "shake";
                    break;
                case "headShake":
                    c = "headShake";
                    break;
                case "swing":
                    c = "swing";
                    break;
                case "tada":
                    c = "tada";
                    break;
                case "wobble":
                    c = "wobble";
                    break;
                case "jello":
                    c = "jello";
                    break;
                case "bounceIn":
                    c = "bounceIn";
                    break;
                case "bounceInDown":
                    c = "bounceInDown";
                    break;
                case "bounceInLeft":
                    c = "bounceInLeft";
                    break;
                case "bounceInRight":
                    c = "bounceInRight";
                    break;
                case "bounceInUp":
                    c = "bounceInUp";
                    break;
                case "bounceOut":
                    c = "bounceOut";
                    break;
                case "bounceOutDown":
                    c = "bounceOutDown";
                    break;
                case "bounceOutLeft":
                    c = "bounceOutLeft";
                    break;
                case "bounceOutRight":
                    c = "bounceOutRight";
                    break;
                case "bounceOutUp":
                    c = "bounceOutUp";
                    break;
                case "fadeIn":
                    c = "fadeIn";
                    break;
                case "fadeInDown":
                    c = "fadeInDown";
                    break;
                case "fadeInDownBig":
                    c = "fadeInDownBig";
                    break;
                case "fadeInLeft":
                    c = "fadeInLeft";
                    break;
                case "fadeInLeftBig":
                    c = "fadeInLeftBig";
                    break;
                case "fadeInRighting":
                    c = "fadeInRight";
                    break;
                case "fadeInRightBig":
                    c = "fadeInRightBig";
                    break;
                case "fadeInUp":
                    c = "fadeInUp";
                    break;
                case "fadeInUpBig":
                    c = "fadeInUpBig";
                    break;
                case "fadeOut":
                    c = "fadeOut";
                    break;
                case "fadeOutDown":
                    c = "fadeOutDown";
                    break;
                case "fadeOutDownBig":
                    c = "fadeOutDownBig";
                    break;
                case "fadeOutLeft":
                    c = "fadeOutLeft";
                    break;
                case "fadeOutLeftBig":
                    c = "fadeOutLeftBig";
                    break;
                case "fadeOutRight":
                    c = "fadeOutRight";
                    break;
                case "fadeOutRightBig":
                    c = "fadeOutRightBig";
                    break;
                case "fadeOutUp":
                    c = "fadeOutUp";
                    break;
                case "fadeOutUpBig":
                    c = "fadeOutUpBig";
                    break;
                case "flipInX":
                    c = "flipInX";
                    break;
                case "flipInY":
                    c = "flipInY";
                    break;
                case "flipOutX":
                    c = "flipOutX";
                    break;
                case "flipOutY":
                    c = "flipOutY";
                    break;
                case "lightSpeedIn":
                    c = "lightSpeedIn";
                    break;
                case "lightSpeedOut":
                    c = "lightSpeedOut";
                    break;
                case "rotateIn":
                    c = "rotateIn";
                    break;
                case "rotateInDownLeft":
                    c = "rotateInDownLeft";
                    break;
                case "rotateInDownRight":
                    c = "rotateInDownRight";
                    break;
                case "rotateInUpLeft":
                    c = "rotateInUpLeft";
                    break;
                case "rotateInUpRight":
                    c = "rotateInUpRight";
                    break;
                case "hinge":
                    c = "hinge";
                    break;
                case "jackInTheBox":
                    c = "jackInTheBox";
                    break;
                case "rollIn":
                    c = "rollIn";
                    break;
                case "rollOut":
                    c = "rollOut";
                    break;
                case "zoomIn":
                    c = "zoomIn";
                    break;
                case "zoomInDown":
                    c = "zoomInDown";
                    break;
                case "zoomInLeft":
                    c = "zoomInLeft";
                    break;
                case "zoomInRight":
                    c = "zoomInRight";
                    break;
                case "zoomInUp":
                    c = "zoomInUp";
                    break;
                case "zoomOut":
                    c = "zoomOut";
                    break;
                case "zoomOutDown":
                    c = "zoomOutDown";
                    break;
                case "zoomOutLeft":
                    c = "zoomOutLeft";
                    break;
                case "zoomOutRight":
                    c = "zoomOutRight";
                    break;
                case "zoomOutUp":
                    c = "zoomOutUp";
                    break;
                case "slideInDown":
                    c = "slideInDown";
                    break;
                case "slideInLeft":
                    c = "slideInLeft";
                    break;
                case "slideInRight":
                    c = "slideInRight";
                    break;
                case "slideInUp":
                    c = "slideInUp";
                    break;
                case "slideOutDown":
                    c = "slideOutDown";
                    break;
                case "slideOutLeft":
                    c = "slideOutLeft";
                    break;
                case "slideOutRight":
                    c = "slideOutRight";
                    break;
                case "slideOutUp":
                    c = "slideOutUp";
                    break;
                case "fadeInNormal":
                    c = "fadeInNormal",
                        a.animationDuration[b.indexOf("fadeInNormal")] = "1000";
                    break;
                case "pullDown":
                    c = "pullDown",
                        a.animationDuration[b.indexOf("pullDown")] = "1000"
            }
            if ((!a.animationDuration || a.animationDuration.indexOf("0") > -1 || a.animationDuration.indexOf("0ms") > -1 || a.animationDuration.indexOf("ms") > -1 || a.animationDuration.indexOf("") > -1) && (b.indexOf("fadeInNormal") > -1 ? a.animationDuration[b.indexOf("fadeInNormal")] = "1000ms" : b.indexOf("slideLeft") > -1 ? a.animationDuration[b.indexOf("slideLeft")] = "1000ms" : b.indexOf("bounceInRight") > -1 ? a.animationDuration[b.indexOf("bounceInRight")] = "1000ms" : b.indexOf("stretchLeft") > -1 ? a.animationDuration[b.indexOf("stretchLeft")] = "1000ms" : b.indexOf("fadeIn") > -1 ? a.animationDuration[b.indexOf("fadeIn")] = "1000ms" : b.indexOf("bounceInLeft") > -1 ? a.animationDuration[b.indexOf("bounceInLeft")] = "1000ms" : b.indexOf("stretchRight") > -1 && (a.animationDuration[b.indexOf("stretchRight")] = "1000ms")),
                    a.animationDuration.indexOf("0") > -1 ? a.animationDuration[a.animationDuration.indexOf("0")] = "1000ms" : a.animationDuration.indexOf("0ms") > -1 ? a.animationDuration[a.animationDuration.indexOf("0ms")] = "1000ms" : a.animationDuration.indexOf("ms") > -1 ? a.animationDuration[a.animationDuration.indexOf("ms")] = "1000ms" : a.animationDuration.indexOf("") > -1 && (a.animationDuration[a.animationDuration.indexOf("")] = "1000ms"),
                "" != c && (c = "," + c + " " + a.inf_duration + " " + d + " " + a.inf_delay + " forwards infinite"),
                    f = [],
                    Array.isArray(b)) {
                for (g = 0; g < b.length; g++)
                    "ms" == a.animationDelay[g] ? a.animationDelay[g] = "0ms" : a.animationDelay[g] && a.animationDelay[g].indexOf("ms") <= "-1" && (a.animationDelay[g] = a.animationDelay[g] + "ms"),
                        "ms" == a.animationDuration[g] ? a.animationDuration[g] = "0ms" : a.animationDuration[g] && a.animationDuration[g].indexOf("ms") <= "-1" && (a.animationDuration[g] = a.animationDuration[g] + "ms"),
                        0 == g ? f.push(b[g] + " " + a.animationDuration[g] + " ease-in-out " + a.animationDelay[g] + " both 1" + c) : f.push(b[g] + " " + a.animationDuration[g] + " ease-in-out " + a.animationDelay[g] + " forwards 1" + c);
                return ".ani_" + a.page_id + "_" + a.id + " {-webkit-animation:" + f.join(",") + "; }"
            }
            return ".ani_" + a.page_id + "_" + a.id + " {-webkit-animation:" + b + " " + a.animationDuration + " ease-in-out " + a.animationDelay + " both 1" + c + "; }"
        }
        ,
        createPage = function (a) {
            var b = this
                , c = b.UI_WIDTH
                , d = b.UI_HEIGHT
                , e = b.width
                , f = b.height;
            return this.allPage = a.map(function (a, g) {
                var i, j, k, l, h = "";
                return a.layout.layTemplate ? b.guestsPage(a, g) : null,
                    a.layout.elements.forEach(function (i, j) {
                        var k, l, m, n, o, p, q, r, s, t, v, w, x;
                        i.video_path ? b.videoNext = g - 1 : null,
                            k = Number(i.y / c) * e,
                            l = "",
                        1 == i.is_scale && (k = Number(i.y / d) * f),
                        i.mask && (l = "-webkit-mask-image:url(" + b.changeImgUrl(i.mask.img) + ");-webkit-mask-size:100% 100%;"),
                            m = {
                                width: Number(i.width / c) * e + "px",
                                height: Number(i.height / c) * e + "px",
                                left: Number(i.x / c) * e + "px",
                                top: k + "px",
                                zIndex: i.z_order,
                                animationDelay: i.delay || 0,
                                animationDuration: i.duration || 0,
                                type: i.type || null,
                                isdown: 0 == i.is_down ? !1 : !0,
                                id: i.id || Math.round(1e16 * Math.random()),
                                page_id: a.id,
                                text_type: i.text_type || null,
                                infinite: i.infinite || null,
                                mask: l,
                                inf_delay: i.inf_delay || 0,
                                inf_duration: i.inf_duration || 0,
                                edit_btn_position: i.edit_btn_position || null
                            },
                            m.animationDelay = m.animationDelay,
                            m.animationDuration = m.animationDuration,
                            "ms" == m.inf_delay ? m.inf_delay = "0ms" : "" != m.inf_delay && m.inf_delay.indexOf("ms") <= "-1" && (m.inf_delay = m.inf_delay + "ms"),
                            "ms" == m.inf_duration ? m.inf_duration = "0ms" : "" != m.inf_duration && m.inf_duration.indexOf("ms") <= "-1" && (m.inf_duration = m.inf_duration + "ms"),
                            n = b.UI_HEIGHT - i.y - i.height,
                            n = Number(n / b.UI_WIDTH) * e + "px",
                            o = m.isdown ? "bottom:" + n : "top:" + m.top,
                            p = "position:fixed;width:" + m.width + ";height:" + m.height + ";left:" + m.left + ";" + o + ";z-index:" + m.zIndex,
                        b.type && 1 == b.getParams("edit") && b.positionIcon(m, o, i, j, a.layout.elements.length, g),
                            q = "",
                            r = "",
                        i.height >= b.UI_HEIGHT && (Number(i.height / b.UI_WIDTH) * e > f && (f = Number(i.height / b.UI_WIDTH) * e),
                            r = Math.round(i.width / i.height * b.height) - b.width,
                            r /= 2,
                            q = "-webkit-transform:translateX(-" + r + "px);width:auto;height:" + f + "px"),
                            s = i.animate,
                            t = "",
                        m.infinite && (t = "inf=" + m.infinite),
                            b.type ? i.original_path && "" !== i.original_path ? (i.video_path ? i.video_path : i.original_path,
                                b.videoHave = !0,
                                h += '<div class="videoMH nosee"></div><div id="video" class="animated ' + s + " ani_" + m.page_id + "_" + m.id + '" videoW="' + i.video_width + '" videoP="' + i.video_path + '" videoH="' + i.video_height + '" style="width:' + b.width + "px;height:" + b.height + 'px;position:relative;overflow:hidden;">                <video id="vid" class="IIV"                x-webkit-airplay="true"                 webkit-playsinline                playsinline                preload="true"                height="100%"                loop="true"                 x5-video-player-type="h5"                 x5-video-player-fullscreen="true"                 style="min-height:100%;min-width:100%;margin-left:-' + (i.video_width / i.video_height * b.height - b.width) / 2 + 'px;"                 poster="' + i.original_path + "?vframe/jpg/offset/1|imageView2/1/w/" + i.video_width + "/h/" + i.video_height + '"                 src="' + i.original_path + '"></video>              </div>') : (v = "",
                                w = "",
                                x = "",
                            i.width >= 750 && i.height >= 1220 && (v = b.height + "px",
                                w = "auto",
                                x = (b.UI_WIDTH / b.UI_HEIGHT * b.height - b.width) / 2,
                            0 >= x && (w = "100%")),
                            "map" == m.type && (v = "100%"),
                            i.img || (i.img = ""),
                                b.aniStyle += b.addStyle(m, s),
                                h += "<div " + t + ' class="animated ani_' + m.page_id + "_" + m.id + '" style="' + p + '">                    ' + ("map" == m.type ? '<img class="dwIcon" src="' + b.changeImgUrl("http://qnm.hunliji.com/o_1blaaggv063m34kok21s8k1irnc.png") + '"><div class="navigation" style="position: absolute; width: ' + 100 / b.UI_WIDTH * b.width + "px; height: " + 56 / b.UI_WIDTH * b.width + "px; right: 0; top:0; background: #7c7c7c; opacity: 0.6; color: white;font-size: " + 28 / b.UI_WIDTH * b.width + "px;line-height: " + 56 / b.UI_WIDTH * b.width + "px; text-align: center; border-bottom-left-radius: " + 5 / b.UI_WIDTH * b.width + 'px;">导航</div>' : "") + '                    <img style="' + m.mask + ";width:" + w + ";height:" + v + ";margin-left:-" + x + 'px" class="pageImg ' + ("map" == m.type ? "mapSeat" : "") + '" type="' + m.type + '" page_id="' + m.page_id + '" id="' + m.id + '" style="' + q + '" src="' + b.changeImgUrl(i.img) + '" />                </div>') : i.video_path && "" != i.video_path ? (b.videoHave = !0,
                                h += '<div class="videoMH nosee"></div><div id="video" class="animated ' + s + " ani_" + m.page_id + "_" + m.id + '" videoW="' + i.video_width + '" videoP="' + i.video_path + '" videoH="' + i.video_height + '" style="width:' + b.width + "px;height:" + b.height + 'px;position:relative;overflow:hidden;">                <video id="vid" class="IIV"                x-webkit-airplay="true"                 webkit-playsinline                playsinline                preload="true"                loop="true"                 x5-video-player-type="h5"                 x5-video-player-fullscreen="true"                 style="min-height:100%;min-width:100%;margin-left:-' + (i.video_width / i.video_height * b.height - b.width) / 2 + 'px;"                 poster="' + i.video_path + "?vframe/jpg/offset/1|imageView2/1/w/" + i.video_width + "/h/" + i.video_height + '"                 src="' + i.video_path + '"></video>              </div>') : "" == i.video_path && void 0 != i.video_path || null === i.video_path ? h += '<div style="position:fixed;top:0;bottom:0;left:0;right:0;background:#f2f3f6;z-index:9">                        <img class="noVideo" style="position:fixed;top:0;bottom:0;left:0;right:0; width:35%;margin:auto;" src="' + b.changeImgUrl("//qnm.hunliji.com/o_1bk442tda19uemst1jia1db31d007.png") + '" />                    </div>' : (v = "",
                                w = "",
                                x = "",
                            i.height >= 1220 && (v = b.height + "px",
                                w = "auto",
                                x = (b.UI_WIDTH / b.UI_HEIGHT * b.height - b.width) / 2,
                            0 >= x && (w = "100%")),
                            "map" == m.type && (v = "100%"),
                            i.img || (i.img = ""),
                                b.aniStyle += b.addStyle(m, s),
                                h += "<div " + t + ' class="animated ani_' + m.page_id + "_" + m.id + '" style="' + p + '">                    ' + ("map" == m.type ? '<img class="dwIcon" src="' + b.changeImgUrl("http://qnm.hunliji.com/o_1blaaggv063m34kok21s8k1irnc.png") + '"><div class="navigation" style="position: absolute; width: ' + 100 / b.UI_WIDTH * b.width + "px; height: " + 56 / b.UI_WIDTH * b.width + "px; right: 0; top:0; background: #7c7c7c; opacity: 0.6; color: white;font-size: " + 28 / b.UI_WIDTH * b.width + "px;line-height: " + 56 / b.UI_WIDTH * b.width + "px; text-align: center; border-bottom-left-radius: " + 5 / b.UI_WIDTH * b.width + 'px;">导航</div>' : "") + '                    <img style="' + m.mask + ";width:" + w + ";height:" + v + ";margin-left:-" + x + 'px" class="pageImg ' + ("map" == m.type ? "mapSeat" : "") + '" type="' + m.type + '" page_id="' + m.page_id + '" id="' + m.id + '" style="' + q + '" src="' + b.changeImgUrl(i.img) + '" />                </div>')
                    }),
                    i = b.height,
                    j = 0,
                g <= b.seating && (i = 0,
                    j = 1),
                    k = "",
                    l = "",
                a.layout.layTemplate && (k = "guestPage"),
                    b.type ? '<div class="ebg ele_background_' + g + '" style="position:fixed;top:0;left:0;z-index:0;-webkit-transition-duration:600ms;opacity:' + j + '"><img style="width:' + b.width + "px;height:" + b.height + 'px;" src="' + b.changeImgUrl(a.layout.background) + '"/></div><div id="' + k + '" page_id="' + a.id + '" style="height:' + b.height + 'px" class="layout ' + (b.seating == g ? " " : "hide ") + " " + k + '">' + l + h + "</div>" : '<div class="ebg ele_background_' + g + '" style="position:fixed;top:0;left:0;z-index:0;-webkit-transition-duration:600ms;-webkit-transform:translateY(' + i + 'px);"><img style="width:' + b.width + "px;height:" + b.height + 'px;" src="' + b.changeImgUrl(a.layout.background) + '"/></div><div id="' + k + '" page_id="' + a.id + '" style="height:' + b.height + 'px" class="layout ' + (b.seating == g ? " " : "hide ") + " " + k + '">' + l + h + "</div>"
            })
        }
        ,
        guestsPage = function (a, b) {
            //     var d, e, f, g, h, i, c = this;
            //     this.mapHave = !0,
            //         this.mapNum = b,
            //         c = this,
            //         d = {},
            //         d.w = 686,
            //         d.h = 386,
            //         d.b = 132,
            //         d.x = this.result.cardInfo.latitude,
            //         d.y = this.result.cardInfo.longtitude,
            //         c.result.cardInfo.map_type ? 1 == c.result.cardInfo.map_type ? d.coordtype = 5 : 0 == c.result.cardInfo.map_type && (d.coordtype = 3) : d.coordtype = 3,
            //         e = document.createElement("div"),
            //         e.setAttribute("id", "map"),
            //         e.setAttribute("class", "animated fadeIn"),
            //         e.style.bottom = d.b / this.UI_WIDTH * this.width + "px",
            //         e.style.width = d.w / this.UI_WIDTH * this.width + "px",
            //         f = "//apis.map.qq.com/ws/staticmap/v2/?center=" + d.x + "," + d.y + "&zoom=12&size=686*386&maptype=roadmap&markers=size:large|color:0xFFCCFF|label:k|" + d.x + "," + d.y + "&key=QLPBZ-3O6R4-GJDUO-DITBG-UHR7K-E6B2G",
            //         c.srcMap = f,
            //         g = c.result.cardInfo.groom_name + " 和 " + c.result.cardInfo.bride_name + " 诚挚邀请",
            //         c.mapUrl = "//apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + d.x + "," + d.y + ";coordtype:" + d.coordtype + ";title:" + c.result.cardInfo.place + ";addr:" + g + "&key=QLPBZ-3O6R4-GJDUO-DITBG-UHR7K-E6B2G&referer=hunliji",
            //         h = document.createElement("div"),
            //         h.setAttribute("id", "updownIcon"),
            //         h.style.bottom = 160 / this.UI_WIDTH * this.width + 34 + "px",
            //         h.innerHTML = '<img src="' + c.changeImgUrl(this.pageIcon) + '"/>',
            //         i = document.createElement("div"),
            //         i.setAttribute("id", "guest_action"),
            //         i.setAttribute("class", "fadeIn"),
            //         i.style.bottom = 48 / c.UI_WIDTH * c.width + "px",
            //         i.innerHTML = '<p id="guestBtn" style="margin: 0;width:' + 305 / c.UI_WIDTH * c.width + "px;height:" + 88 / c.UI_WIDTH * c.width + "px;line-height:" + 88 / c.UI_WIDTH * c.width + "px;border-radius: " + 44 / c.UI_WIDTH * c.width + 'px;">宾客回复</p>    <p id="toGiftBtn" style="margin: 0;width:' + 305 / c.UI_WIDTH * c.width + "px;height:" + 88 / c.UI_WIDTH * c.width + "px;line-height:" + 86 / c.UI_WIDTH * c.width + "px;border-radius: " + 44 / c.UI_WIDTH * c.width + 'px;">送祝福</p>',
            //         // setTimeout(function () {
            //         //     $("#guestPage").find("#guestBtn").length >= 1 || (document.getElementById("guestPage") && document.getElementById("guestPage").appendChild(i),
            //         //     c.isIphoneX() && $("#guest_action").css({
            //         //         bottom: "58px"
            //         //     }),
            //         //     c.type || document.getElementById("guestPage") && document.getElementById("guestPage").appendChild(h),
            //         //         c.guestAction())
            //         // }, 300)
        }
        ,
        otherMap = function (a) {
            // var b = this;
            // $.ajax({
            //     url: b.API.otherMapImage + "?id=" + b.card_id,
            //     type: "get",
            //     success: function (c) {
            //         b.mapSrc = c.data.map_image ? b.result.cardInfo.map_image ? b.result.cardInfo.map_image : c.data.map_image ? c.data.map_image : a : b.result.cardInfo.map_image ? b.result.cardInfo.map_image : a,
            //             $(".mapSeat").attr("src", b.mapSrc)
            //     }
            // })
        }
        ,
        guestAction = function () {
            var h, k, a = document.createElement("div"), b = this, c = 1, d = document.createElement("div"),
                e = document.createElement("div"), f = null, g = document.body.scrollTop;
            e.style.display = "none",
                e.style.zIndex = "999",
                e.style.position = "relative",
                e.style.height = this.height + "px",
                d.style.height = this.height + "px",
                d.setAttribute("id", "guestBg"),
                a.setAttribute("id", "gusetBox"),
                h = 30 / b.UI_WIDTH * b.width,
            140 / b.UI_WIDTH * b.width,
            64 / b.UI_WIDTH * b.width,
                k = '<div id="gusetCode" style="padding:0 ' + h + "px 0 " + h + 'px; ">                              <div class="guest-reply"><i style="font-weight:700">您的姓名</i><input id="gusetName" class="guset_name" style="width:70%;margin-left:' + h + "px;padding:" + h + "px 0 " + h + 'px 0;" type="text" placeholder="请输入您的姓名..."/></div>                              <div class="guset_set" style="padding:' + h + "px 0 " + h + 'px 0;">                                <div style="font-weight:700">是否赴宴</div><div class="guset_icon" style="-webkit-box-flex:18"><p state=0><span class="sk">赴宴</span></p><p state=1><span>待定</span></p><p state=2><span>有事</span></p></div></div></div>',
                a.innerHTML = k + "<div class='send_box'>              <div class='guest_num' style='height:" + Number(100 / this.UI_WIDTH * this.width) + "px;line-height:" + Number(100 / this.UI_WIDTH * this.width) + "px'><div class='numpre'>赴宴人数</div><div><p class='disNum_col' style='width:" + Number(192 / this.UI_WIDTH * this.width) + "px;line-height:" + Number(64 / this.UI_WIDTH * this.width) + "px;height:" + Number(64 / this.UI_WIDTH * this.width) + "px'><i class='gnl addNum'>-</i><i class='disNum'>1</i><i class='gnr addNum ak'>+</i></p></div></div><div id='sendNum' style='line-height:" + Number(100 / this.UI_WIDTH * this.width) + "px'>确定</div>            </div>",
                e.appendChild(a),
                e.appendChild(d),
            document.getElementById("guestPage") && document.getElementById("guestPage").appendChild(e),
            b.isIphoneX() && $("#gusetBox").css({
                "padding-bottom": "34px",
                background: "#fff"
            }),
                $("#gusetBox").css({
                    bottom: "0"
                }),
                b.otherState.chat_gift && b.otherState.chat_cash ? ($("#toGiftBtn").show(),
                    $("#guestBtn").css({
                        margin: "0",
                        width: 305 / b.UI_WIDTH * b.width + "px"
                    })) : ($("#toGiftBtn").hide(),
                    $("#guestBtn").css({
                        margin: "0 auto",
                        width: 500 / b.UI_WIDTH * b.width + "px"
                    })),
                $(document).on("touchstart", ".guset_icon p", function () {
                    var a = $(".guset_icon p").index(this);
                    b.send_state = $(this).attr("state"),
                        $(".guset_icon p span").removeClass("sk"),
                        $(this).find("span").addClass("sk"),
                        1 == a || 2 == a ? ($(".guest_num div").css({
                            opacity: "0"
                        }),
                            $(".guest_num .numpre").css({
                                opacity: "0"
                            })) : ($(".guest_num div").css({
                            opacity: "1"
                        }),
                            $(".guest_num .numpre").css({
                                opacity: "1"
                            }))
                }),
                $(document).on("touchstart", "#guestBg", function () {
                    var a = $(this);
                    $("#gusetBox").css({
                        bottom: "-200px"
                    }),
                        a.hide(),
                        $("#gusetName").blur(),
                        document.body.scrollTop = g,
                        clearInterval(f),
                        setTimeout(function () {
                            e.style.display = "none",
                                $("#guestPage").find(".animated").show(),
                                $("#map").show(),
                                $("#updownIcon").show()
                        }, 600)
                }),
                $("#toGiftBtn").on("touchend", function () {
                    return b.type ? b.seating == b.result.page.length - 1 ? (b.outputMsg("请先发送请帖"),
                        !1) : !1 : (b.showGiftPage = !1,
                        $("#giftPage").css({
                            top: 0,
                            opacity: 1
                        }),
                        b.animateGiftAni(),
                        $("#upImg").hide(),
                        void 0)
                }),
                $("#guestBtn").on("touchend", function () {
                    return b.type ? b.seating == b.result.page.length - 1 ? (b.outputMsg("请先发送请帖"),
                        !1) : !1 : ($("#updownIcon").hide(),
                    "" != b.send_name && $("#gusetName").val(b.send_name),
                        e.style.display = "block",
                        setTimeout(function () {
                            $("#guestBg").show(),
                                $("#gusetBox").css({
                                    bottom: 0
                                })
                        }),
                        $(".disNum_col").css({
                            left: $(".numpre").width() + "px"
                        }),
                        navigator.userAgent.indexOf("Android") > -1 ? setTimeout(function () {
                            $("#gusetName").focus()
                        }, 300) : navigator.userAgent.indexOf("iPhone") > -1 && ($("#gusetName").focus(),
                        navigator.userAgent.indexOf("iPhone OS 11") <= -1 && (f = setInterval(function () {
                            document.body.scrollTop = document.body.scrollHeight
                        }, 200))),
                    navigator.userAgent.indexOf("iPhone OS 11") <= -1 && (document.querySelector("#gusetBox").scrollIntoView(!1),
                        document.querySelector(".send_box").scrollIntoView(!1),
                        document.querySelector("#gusetName").scrollIntoView(!1)),
                        void 0)
                }),
                $(document).on("touchend", "#gusetName", function () {
                    navigator.userAgent.indexOf("iPhone OS 11") <= -1 && (document.querySelector("#gusetBox").scrollIntoView(!1),
                        document.querySelector(".send_box").scrollIntoView(!1),
                        document.querySelector("#gusetName").scrollIntoView(!1))
                }),
                $("#sendNum").on("touchstart", function () {
                    return b.type ? (b.outputMsg("请先发送请帖"),
                        !1) : ("" != $("#gusetName").val() ? (b.send_name = $("#gusetName").val(),
                        $("#gusetBox").css({
                            bottom: "-200px"
                        }),
                        $("#guestBg").hide(),
                        setTimeout(function () {
                            e.style.display = "none",
                                $("#guestPage").find(".animated").show(),
                                $("#map").show(),
                                b.fy = !0,
                                b.ajax_reply({
                                    card_id: b.card_id,
                                    count: 1 == b.send_state || 2 == b.send_state ? 0 : c,
                                    name: b.send_name,
                                    state: b.send_state
                                }, null, !0),
                                $("#gusetName").blur(),
                                $("#updownIcon").show()
                        }, 600),
                        document.body.scrollTop = g,
                        clearInterval(f)) : b.outputMsg("请填写您的姓名"),
                        void 0)
                }),
                $(document).on("touchstart", ".gnl", function () {
                    $(".addNum").index(this),
                    c > 1 && (c--,
                        1 == c ? $(".addNum").eq(0).removeClass("ak") : null),
                        $(".disNum").text(c)
                }),
                $(document).on("touchstart", ".gnr", function () {
                    $(".addNum").index(this),
                        c++,
                        $(".addNum").eq(0).addClass("ak"),
                        $(".disNum").text(c)
                })
        }
        ,
        musicStatePause = function () {
            return this.musicStatePause
        }
        ,
        changeMusic = function (a) {
            var c, d, e, f, g, b = this;
            return document.getElementById("playMusic").setAttribute("src", a),
            "false" == this.musicStatePause && document.getElementById("playMusic").play(),
                null == a && $("#musicBtn").length > 0 ? ($("#musicBtn").remove(),
                    !1) : (0 == $("#musicBtn").length && (c = document.createElement("div"),
                    d = document.createElement("img"),
                    e = b.musicOpen,
                    f = b.musicClose,
                    d.setAttribute("src", "true" != b.musicStatePause ? e : f),
                    c.setAttribute("id", "musicBtn"),
                    c.appendChild(d),
                    c.style.width = 72 / b.UI_WIDTH * b.width + "px",
                    c.style.top = 32 / b.UI_WIDTH * b.width + "px",
                    c.style.right = 32 / b.UI_WIDTH * b.width + "px",
                    c.style.marginTop = "0px",
                    document.getElementById("other").appendChild(c),
                    g = document.getElementById("playMusic"),
                    g.addEventListener("timeupdate", function () {
                        "false" == b.musicStatePause && $("#musicBtn").addClass("rotate")
                    })),
                    void 0)
        }
        ,
        musicPause = function (a) {
            var b = this;
            a ? (this.musicStatePause = !0,
                this.writeCookie("musicStatePause", "true", 360),
                document.getElementById("playMusic").pause(),
                $("#musicBtn").removeClass("rotate"),
                $("#musicBtn img").attr("src", b.musicClose)) : (this.musicStatePause = !1,
                this.writeCookie("musicStatePause", "false", 360),
                document.getElementById("playMusic").play(),
                $("#musicBtn").addClass("rotate"),
                $("#musicBtn img").attr("src", b.musicOpen))
        }
        ,
        changeVideo = function (a, b, c) {
            var e, f, d = this;
            b / c >= d.width / d.height ? (e = d.height * (b / c),
                $("#vid").css({
                    "margin-left": "-" + (e - d.width) / 2 + "px",
                    "margin-top": 0,
                    "margin-bottom": 0,
                    "margin-bottom": "-" + (e - d.width) / 2 + "px"
                })) : (f = d.width * (c / b),
                $("#vid").css({
                    "margin-top": "-" + (f - d.height) / 2 + "px",
                    "margin-left": 0,
                    "margin-right": 0,
                    "margin-bottom": "-" + (f - d.height) / 2 + "px"
                })),
                $("#vid").attr("src", a),
                $("#vid").attr("poster", a + "?vframe/jpg/offset/1|imageView2/1/w/" + d.width + "/h/" + d.width),
            document.getElementById("vid") && (document.getElementById("vid").muted = "muted",
                document.getElementById("vid").play()),
                d.result.page.forEach(function (d) {
                    d.layout.elements.forEach(function (d) {
                        d.video_path && (d.video_path = a,
                            d.original_path = a,
                            d.video_width = b,
                            d.video_height = c)
                    })
                })
        }
        ,
        exchangePage = function (a, b) {
            var c = this.result.page[a]
                , d = this.result.page[b];
            this.result.page[a] = d,
                this.result.page[b] = c,
                this.seatState = !0,
                this.seating == a ? (this.seating = b,
                b == this.result.page.length - 1 && (this.sortS = a)) : this.seating == b && (this.seating = a,
                    this.exPage = a + 1)
        }
        ,
        editIconState = function (a) {
            var e, f, b = this, c = $(".editIcon"), d = $(".edit_icon_pop_container");
            if (!b.type && !b.getParams("edit"))
                return !1;
            if (b.editState = a,
                    b.writeCookie("editState", a, 360),
                    a) {
                for (e = 0; e < c.length; e++)
                    c.eq(e).attr("page_id") == b.result.page[b.seating].id && c.eq(e).removeClass("hide");
                f = 0,
                    f = 0 === d.length % 2 ? d.length / 2 - 1 : Math.floor(d.length / 2),
                    "true" === localStorage.getItem("edit_icon_pop_tip") ? d.eq(f).addClass("hide") : d.eq(f).attr("page_id") == b.result.page[b.seating].id ? setTimeout(function () {
                        d.eq(f).attr("page_id") == b.result.page[b.seating].id ? (d.eq(f).removeClass("hide"),
                            d.eq(f).find(".edit_icon_poptip").addClass("pop_tip_zoom")) : d.eq(f).addClass("hide")
                    }, 3e3) : d.eq(f).addClass("hide")
            } else
                c.removeClass("hide"),
                    c.addClass("hide"),
                    d.removeClass("hide").addClass("hide")
        }
        ,
        addPage = function (a, b) {
            var e, f, c = this, d = !1;
            if (this.result.page.forEach(function (a, b) {
                    a.layout.layTemplate && (d = !0,
                        c.result.page.splice(b, 1))
                }),
                    c.result.page.push(a),
                    !this.guestState && b ? (d ? c.result.page.push(c.guests.html) : null,
                        c.guestState = !0,
                        c.seating = c.result.page.length - 1) : this.guestState ? (c.result.page.push(c.guests.html),
                        c.seating = c.result.page.length - 2) : c.seating = c.result.page.length - 1,
                    c.get_infinite(),
                this.seatState && (c.seatState = !1),
                    $("#all-page").empty().append(c.createPage(c.result.page)),
                    c.addStyleNode(),
                    c.editState)
                for (e = $(".editIcon"),
                         e.addClass("hide"),
                         f = 0; f < e.length; f++)
                    e.eq(f).attr("page_id") == c.result.page[c.seating].id && e.eq(f).removeClass("hide")
        }
        ,
        editCard_app = function (a, b) {
            if ("a" == a)
                navigator.userAgent.indexOf("Android") > -1 ? window.messageHandlers.onEditBasicInfo(JSON.stringify(b)) : navigator.userAgent.indexOf("iPhone") > -1 && window.webkit.messageHandlers.onEditBasicInfo.postMessage(b);
            else if (navigator.userAgent.indexOf("Android") > -1 ? window.messageHandlers.onEditPageHole(JSON.stringify(b)) : navigator.userAgent.indexOf("iPhone") > -1 && window.webkit.messageHandlers.onEditPageHole.postMessage(b),
                "image" == b.type) {
                localStorage.setItem("edit_icon_pop_tip", "true");
                var c = $(".edit_icon_pop_container");
                setTimeout(function () {
                    c.addClass("hide")
                }, 100)
            }
        }
        ,
        editPageHoles = function (a) {
            var d, b = $(".pageImg"), c = b.length;
            for (d = 0; c > d; d++)
                a.forEach(function (a) {
                    var e = b.eq(d);
                    e.attr("page_id") == a.page_id && e.attr("id") == a.id && e.attr("type") == a.type && e.attr("src", a.img)
                });
            this.result.page.forEach(function (b) {
                a.forEach(function (a) {
                    b.id == a.page_id && b.layout.elements.forEach(function (b) {
                        b.id && b.id == a.id && b.type == a.type && (b.img = a.img)
                    })
                })
            })
        }
        ,
        delPage = function (a) {
            function d() {
                var a, c, d, e;
                for (a = 0; a < $(".ebg").length; a++)
                    $(".ebg").eq(a).removeClass("ele_background_" + a);
                for (c = $(".editIcon"),
                         d = 0; d < c.length; d++)
                    c.eq(d).attr("page_id") == b && c.eq(d).remove();
                for (e = $(".edit_icon_pop_container"),
                         d = 0; d < e.length; d++)
                    e.eq(d).attr("page_id") == b && e.eq(d).remove();
                setTimeout(function () {
                    for (var a = 0; a < $(".layout").length; a++)
                        $(".layout").eq(a).attr("page_id") == b && ($(".layout").eq(a).remove(),
                            $(".ebg").eq(a).remove())
                }, 100),
                    setTimeout(function () {
                        for (var a = 0; a < $(".ebg").length; a++)
                            $(".ebg").eq(a).addClass("ele_background_" + a)
                    }, 200)
            }

            if (0 >= a)
                return !1;
            var b = this.result.page[a].id
                , c = this;
            this.result.page.splice(a, 1),
                c.seating == a ? c.gotoPage(a - 1) : c.seating > a && c.seating--,
                setTimeout(function () {
                    d()
                }, 600)
        }
        ,
        getCurrentPage = function () {
            return this.seating
        }
        ,
        gotoPage = function (a) {
            var d, e, f, g, h, b = this, c = b.seating;
            if (a == c)
                return !1;
            for (d = 0,
                     0 == a ? $("#upImg").show() : $("#upImg").hide(); a >= d;)
                $(".ele_background_" + d).css({
                    "-webkit-transform": "translateY(0)"
                }),
                    d++;
            if ($("#video").parent().removeClass("vhave"),
                    $("#video").on("touchstart", function () {
                        navigator.userAgent.indexOf("Android") > -1 && (document.getElementById("vid").muted = "muted",
                            document.getElementById("vid").play())
                    }),
                    c > a ? ($(".layout").eq(a).removeClass("hide").css({
                        "-webkit-transform": "scale(1) translateY(0)"
                    }),
                        $(".layout").eq(c).addClass("hide").css({
                            "-webkit-transform": "translateY(0)"
                        })) : ($(".layout").eq(a).removeClass("hide").css({
                        "-webkit-transform": "translateY(0)"
                    }),
                        $(".layout").eq(c).addClass("hide")),
                    b.seating = a,
                    b.seatState = !1,
                    $("#other .editIcon").remove(),
                    $("#all-page").empty().append(b.createPage(b.result.page)),
                    b.addStyleNode(),
                a >= b.result.page.length - 1 && (b.otherMap(b.srcMap),
                    $(".mapSeat").attr("src", b.mapSrc),
                    $("#upImg").hide(),
                    setTimeout(function () {
                        $("#updownIcon").hide()
                    }, 300)),
                    !b.editState)
                return !1;
            for (e = $(".editIcon"),
                     e.addClass("hide"),
                     f = 0; f < e.length; f++)
                e.eq(f).attr("page_id") == b.result.page[b.seating].id && e.eq(f).removeClass("hide");
            g = $(".edit_icon_pop_container"),
                g.addClass("hide"),
                h = 0,
                h = 0 === g.length % 2 ? g.length / 2 - 1 : Math.floor(g.length / 2),
            g.eq(h).attr("page_id") == b.result.page[b.seating].id && ("true" === localStorage.getItem("edit_icon_pop_tip") ? g.eq(h).addClass("hide") : g.eq(h).attr("page_id") == b.result.page[b.seating].id ? setTimeout(function () {
                g.eq(h).attr("page_id") == b.result.page[b.seating].id ? (g.eq(h).removeClass("hide"),
                    g.eq(h).find(".edit_icon_poptip").addClass("pop_tip_zoom")) : g.eq(h).addClass("hide")
            }, 3e3) : g.eq(h).addClass("hide")),
            b.hideEditState && (e.addClass("nosee"),
                g.eq(h).addClass("hide"))
        }
        ,
        autoPlayPage = function () {
            if (1 == this.editState)
                return !1;
            var b, a = this, c = a.seating;
            return a.autoState ? (a.seating <= a.result.page.length - 1 && $("#upImg").show(),
                clearTimeout(b),
                !1) : ($("#upImg").hide(),
                $("#video").parent().removeClass("vhave"),
                c < a.result.page.length - 1 ? (c++,
                    a.gotoPage(c),
                    b = setTimeout(function () {
                        a.autoPlayPage(),
                            clearTimeout(b)
                    }, 7e3)) : (c = 0,
                    $(".ebg").css({
                        "-webkit-transform": "translateY(" + a.height + "px)"
                    }),
                    a.gotoPage(c),
                    b = setTimeout(function () {
                        a.autoPlayPage(),
                            clearTimeout(b)
                    }, 7e3)),
                void 0)
        }
        ,
        positionIcon = function (a, b, c, d, e, f) {
            var g, h, i, j, k, l, m, n, o, p;
            if (this.log = [],
                    g = this,
                    h = g.width,
                    i = b,
                    c.text_type) {
                if (g.log.push({
                        text_type: c.text_type,
                        x: c.x,
                        y: c.y,
                        w: c.width,
                        h: c.height,
                        id: c.id,
                        page_id: a.page_id
                    }),
                    d == e - 1) {
                    for (j = {},
                             j.x = this.log[0].x,
                             j.y = this.log[0].y,
                             k = 0; k < this.log.length; k++)
                        Number(j.x) > Number(this.log[k].x) ? j.x = this.log[k].x : null,
                            Number(j.y) < Number(this.log[k].y) ? j.y = this.log[k].y : null,
                        j.x == this.log[k].x && (j.w = this.log[k].w,
                            Number(j.w) < Number(this.log[k].w) ? j.w = this.log[k].w : null),
                        j.y == this.log[k].y && (j.h = this.log[k].h,
                            Number(j.h) < Number(this.log[k].h) ? j.h = this.log[k].h : null);
                    return i = a.isdown ? "bottom:" + Number((g.UI_HEIGHT - j.y - j.h / 2) / g.UI_WIDTH * h + 25) + "px" : c.height >= g.UI_HEIGHT ? "top:" + (g.height - 25) / 2 + "px" : "top:" + Number(Number(j.y) / 2 + j.h / g.UI_WIDTH * h / 2 - 25) + "px",
                        l = {
                            top: i,
                            left: Number(j.x / g.UI_WIDTH) * h + Number(j.w / g.UI_WIDTH) * h / 2 - 25 + "px"
                        },
                        m = '<div class="editIcon edit_text card_info hide" page_id="' + a.page_id + '" id="' + a.id + '" type="' + a.type + '" style="' + l.top + ";left:" + l.left + '"><i></i><em></em><img src="' + g.changeImgUrl("//qnm.hunliji.com/o_1blae19da7r21etql8r1h45nv2m.png") + '" /></div>',
                        $("#other").append(m),
                        !1
                }
                return !1
            }
            if (a.type) {
                if (l = {
                        top: i,
                        left: Number(c.x / g.UI_WIDTH) * h + Number(c.width / g.UI_WIDTH) * h / 2 - 25 + "px"
                    },
                        a.isdown ? c.video_path ? (l.top = "bottom:" + Number(g.height / 2 - 35) + "px",
                            l.left = (g.width - 25) / 2 + "px") : l.top = "bottom:" + Number((g.UI_HEIGHT - c.y - c.height / 2) / g.UI_WIDTH * h - 25) + "px" : c.video_width ? l.top = "top:120px" : (n = Number(a.top.replace("px", "")),
                            o = Number(a.height.replace("px", "")),
                            l.top = "top:" + (n + (o - 50) / 2) + "px"),
                        a.edit_btn_position)
                    switch (a.edit_btn_position.toString()) {
                        case "1":
                            n = Number(a.top.replace("px", "")),
                                o = Number(a.height.replace("px", "")) / 10,
                                l.top = "top:" + (n + o) + "px";
                            break;
                        case "2":
                            n = Number(a.top.replace("px", "")),
                                o = Number(a.height.replace("px", "")),
                                l.top = "top:" + (n + o - 50 - o / 10) + "px"
                    }
                m = '<div  class="editIcon edit_img hide ' + ("map" == a.type ? "card_info" : "") + " " + (c.video_width ? "videoIcon" : "") + '" videoW="' + c.video_width + '" videoH="' + c.video_height + '" videoP="' + c.video_path + '" page_id="' + a.page_id + '" id="' + a.id + '" type="' + a.type + '" style="' + l.top + ";left:" + l.left + '"><i></i><em></em><img src="' + ("map" == a.type || "text" == a.type ? g.changeImgUrl("//qnm.hunliji.com/o_1blae19da7r21etql8r1h45nv2m.png") : g.changeImgUrl("//qnm.hunliji.com/o_1blae09s8fcu12qrpgv1qgh1tijh.png")) + '" /></div>',
                    p = "",
                "image" == a.type && 0 == f && (p = '<div style="' + l.top + ";position:fixed;z-index:999999;width:54px;height:54px;left:" + l.left + '" class="edit_icon_pop_container hide" page_id="' + a.page_id + '"id="' + a.id + '"><div class="edit_icon_poptip_wrap "><div class="edit_icon_poptip">上传照片</div></div></div>'),
                    m += p,
                    $("#other").append(m)
            }
        }
        ,
        selectGift_v2 = function () {
            function l() {
                a.innerHTML = '<div id ="giftMoreV2" class="gift_box_v2" style="width:' + 626 / c.UI_WIDTH * c.width + "px;padding: " + 20 / c.UI_WIDTH * c.width + 'px 0px"><ul id ="g_bd_wrap_v2" style="width:' + 626 / c.UI_WIDTH * c.width * Math.ceil(e.length / 8) + 'px;overflow-x:hidden">' + b + '</ul><div class="pageGiftV2"></div></div>          </div></div>',
                document.getElementById("gift_lists") && document.getElementById("gift_lists").appendChild(a),
                    $(".g_bd_v2").css({
                        width: 626 / c.UI_WIDTH * c.width
                    })
            }

            function m() {
                var a, b, c;
                for (a = 0; a < $(".g_bd_v2").length; a++)
                    a > 1 && $(".g_bd_v2").eq(a).hide();
                for (b = 0,
                         c = ""; b < Math.ceil($(".g_bd_v2").length);)
                    c += "<i></i>",
                        b++;
                $(".pageGiftV2").append(c),
                    $(".pageGiftV2").find("i").eq(0).addClass("ko"),
                $(".pageGiftV2 i").length <= 1 && $(".pageGiftV2").hide()
            }

            var e, f, g, h, i, j, k, a = document.createElement("div"), b = "", c = this;
            for (a.setAttribute("id", "send_gift_v2"),
                     e = c.allGifts,
                     f = "",
                     g = "",
                     h = 0,
                     i = 0,
                     j = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 17, 18],
                     k = 0; k < e.length; k++)
                8 > h && e[k].icon2 && (f += '<div class="gift-ratio-v2"><div class="gift-ratio-wrap"><div class="gift-item" price="' + e[k].price + '" cid="' + e[k].id + '" title="' + e[k].title + '" desc="' + e[k].desc + '" src="' + e[k].icon + '">' + '<div><img src="' + e[k].icon2 + '?imageView2/0/w/90" alt="' + e[k].title + '">' + "<p>" + e[k].title + "</p>" + '<p class="p2">￥' + e[k].price + "</p>" + "</div></div></div></div>",
                    h++,
                    i++,
                    h > 7 ? (h = 0,
                        g = '<li class="g_bd_v2">' + f + "</li>",
                        f = "",
                        b += g) : j.indexOf(i) > -1 && e.length == i && (g = '<li class="g_bd_v2">' + f + "</li>",
                        f = "",
                        b += g));
            setTimeout(function () {
                l(),
                    m(),
                    c.gift_action_v2(),
                    c.getGifts_replies()
            }, 300)
        }
        ,
        giftsMarquee = function () {
            var c, d, e, f, a = this, b = "";
            for (b = "",
                     c = 0,
                     d = a.gifts.length; d > c; c++)
                b += a.gifts[c].card_gift ? '<p><strong style="margin-right:4px">' + a.gifts[c].giver_name + '</strong>送了<i style="margin-right:13px">' + a.gifts[c].card_gift.title + "</i>" + a.gifts[c].card_gift.desc + "</p>" : '<p><strong style="margin-right:10px">' + a.gifts[c].giver_name + "</strong>送了<b>" + a.gifts[c].price + "</b>元红包</p>";
            $("#scrollBox2 li").eq(0).html(b),
            $("#scrollBox2 li p").length > 4 && ($("#scrollBox2 li").eq(1).html(b),
                e = null,
                f = 1,
                $("#scrollBox2 li").css({
                    height: $("#scrollBox2 li").height() + "px"
                }),
                $("#scrollBox2").css({
                    "-webkit-transform": "translateY(0px)"
                }),
                e = setInterval(function () {
                    var a = $("#scrollBox2").css("-webkit-transform").replace(/[^0-9\-,]/g, "").split(",")[0] - f;
                    $("#scrollBox2").css({
                        "-webkit-transform": "translateY(" + a + "px)"
                    }),
                    $("#scrollBox2").css("-webkit-transform").replace(/[^0-9\-,]/g, "").split(",")[0] <= -$("#scrollBox2 li").height() && $("#scrollBox2").css({
                        "-webkit-transform": "translateY(0px)"
                    })
                }, 50))
        }
        ,
        giftPage = function () {
            var d, e, g, i, j, a = this, b = 0;
            return $("#giftPage").length > 0 || this.type ? !1 : (a.createRedPackets(),
                d = "",
                d = '<div id="giftPage">                  <div class="gift_warp">                    <div class="gift_content"><ul id="scrollBox2"><li></li><li></li></ul><span></span></div>                    <div class="gift_list">                    <div id="gift_lists"></div>                    <a class="send_gift_btn">送礼物</a>                    </div>                  </div>                  <div class="red_packets">                    <a><img src="' + a.changeImgUrl("http://qnm.hunliji.com/o_1br6ro5okqdi16qb1tv465a1oc015.png") + '"/></a>                    <i class="gift_tishi_v2"></i>                  </div>                  <div id="updownIconV2"><img src="' + a.changeImgUrl("http://qnm.hunliji.com/o_1br11t4b71j27alrfgbca1itkm.png") + '" style="width:28px;height:12px"></div>                  <div class="package_icon hide"></div>                </div>',
                e = 24 / a.UI_WIDTH * a.width,
            16 / a.UI_WIDTH * a.width,
                g = 120 / a.UI_WIDTH * a.width,
            72 / a.UI_WIDTH * a.width,
                i = '<div id="gift_bg" style="transform:translateY(' + a.height + 'px);"></div><div id="gift_form" style="padding:0 ' + e + "px 0 " + e + 'px; ">                                <div class="send_user">                                  <div class="send_user_bd"><i><b>赠送人：</b></i><input class="send_user_txt" id="nameTxtV2" type="text" value="" placeholder="请输入您的姓名"/></div>                                  <div class="send_user_btn"><button type="button" class="sendGiftBtn" id="sendGiftBtnV2" style="width:' + g + 'px;">去支付</button></div>                                </div>                                <div class="gift_name"><p><b>赠送的礼物：</b><i class="gift_name_txt"></i></p></div>                                </div>',
                $("#other").append(d),
                $("#gift_form").length <= 0 ? $("#other").append(i) : null,
                a.lastAbout(),
                $("#giftPage").css({
                    top: this.height + "px",
                    width: this.width + "px",
                    height: this.height + "px",
                    background: "url(" + a.changeImgUrl("http://qnm.hunliji.com/o_1br0kno0d70o5f12gk1nei53lh.png") + ") repeat-y 0 0",
                    "background-size": "100%"
                }),
                $(".gift_warp").css({
                    width: 700 / this.UI_WIDTH * this.width + "px",
                    background: "#fff",
                    "border-radius": "20px",
                    margin: "auto",
                    "margin-top": 40 / this.UI_WIDTH * this.width + "px",
                    padding: 40 / this.UI_WIDTH * this.width + "px 0"
                }),
                $(".red_packets").css({
                    width: 734 / this.UI_WIDTH * this.width + "px",
                    margin: "auto",
                    "padding-top": 16 / this.UI_WIDTH * this.width + "px"
                }),
                $(".red_packets a").css({
                    display: "block"
                }),
                $(".red_packets i").css({
                    display: "block",
                    width: 700 / this.UI_WIDTH * this.width + "px",
                    height: "25px",
                    margin: "auto",
                    "text-align": "center"
                }),
                $(".send_gift_btn").css({
                    display: "block",
                    width: 600 / this.UI_WIDTH * this.width + "px",
                    height: 80 / this.UI_HEIGHT * this.height + "px",
                    border: "1px solid #f25863",
                    color: "#f25863",
                    "text-align": "center",
                    "line-height": 80 / this.UI_HEIGHT * this.height + "px",
                    "font-size": "14px",
                    "border-radius": "10px",
                    margin: "auto"
                }),
                $(".gift_content").css({
                    position: "relative",
                    color: "#000",
                    margin: "0 16px",
                    "border-bottom": "1px solid #e2e2e2",
                    height: 224 / this.UI_HEIGHT * this.height + "px",
                    overflow: "hidden"
                }),
                $(".gift_content ul").css({
                    margin: "0 " + 20 / this.UI_WIDTH * this.width + "px " + 20 / this.UI_WIDTH * this.width + "px",
                    "line-height": 52 / this.UI_HEIGHT * this.height + "px"
                }),
                $(".gift_content span").css({
                    height: 28 / this.UI_WIDTH * this.width + "px"
                }),
                $(".send_user_bd").css({
                    width: 480 / this.UI_WIDTH * this.width + "px"
                }),
                $(".send_user_txt").css({
                    width: 340 / this.UI_WIDTH * this.width + "px"
                }),
                $(".package_icon").css({
                    width: 136 / this.UI_WIDTH * this.width + "px",
                    height: 102 / this.UI_WIDTH * this.width + "px"
                }),
                $(document).on("touchend", "#gift_bg", function () {
                    setTimeout(function () {
                        $(".nameTxtV2").val("").blur()
                    }, 300)
                }),
                $(document).on("touchstart", "#gift_bg", function () {
                    $(this).css({
                        "-webkit-transform": "translateY(" + a.height + "px)"
                    }),
                        $("#gift_form").removeClass("active"),
                        $("#nameTxtV2").blur()
                }),
                $(document).on("touchstart", ".send_gift_btn,#sendGiftBtn", function (a) {
                    b = a.changedTouches[0].clientY
                }),
                $(document).on("touchend", ".send_gift_btn,#sendGiftBtn", function (c) {
                    var d = $(this).hasClass("send_gift_btn");
                    d && a.writeCookie("showGiftPage", !0, 1),
                    (!d || c.changedTouches[0].clientY - b < 10 && c.changedTouches[0].clientY - b >= 0) && ($(".gift_name_txt").text(a.giftProperty.title + "（￥" + a.giftProperty.price + "）"),
                        a.send_name ? ($("#nameTxtV2").val(a.send_name),
                            $("#sendGiftBtnV2").addClass("active")) : $("#sendGiftBtnV2").removeClass("active"),
                        setTimeout(function () {
                            $("#gift_form").addClass("active"),
                                $("#gift_bg").css({
                                    "-webkit-transform": "translateY(0)"
                                })
                        }, 300),
                        navigator.userAgent.indexOf("Android") > -1 ? setTimeout(function () {
                            $("#nameTxtV2").focus()
                        }, 300) : $("#nameTxtV2").focus(),
                        a.$giftAni.removeClass("animate"))
                }),
                j = new Hammer(document.getElementById("giftPage")),
                a = this,
                j.get("swipe").set({
                    direction: Hammer.DIRECTION_ALL
                }),
                j.on("swipe", function (b) {
                    var c = b.deltaY;
                    if (c > 100 && "0px" == $("#giftPage").css("top") && a.seating == a.result.page.length - 1 && !a.showGiftPage)
                        return a.showGiftPage = !0,
                            $("#giftPage").css({
                                top: a.height + "px",
                                opacity: 0
                            }),
                            a.$giftAni.removeClass("animate"),
                            !1;
                    if (-100 > c)
                        a.seating <= a.result.page.length - 2 || !$(".layout").eq(a.result.page.length - 1).hasClass("hide") && a.seating == a.result.page.length - 1 && $("#lastAbout").css("top") == a.height + "px" && a.lastDown && 0 == a.showGiftPage && (a.lastDown = !1,
                            $("#lastAbout").css({
                                top: 0,
                                opacity: 1
                            }),
                            a.$giftAni.removeClass("animate"),
                        a.make || (a.sdkData({
                            action: "make",
                            eventable_type: "Card",
                            additional: {
                                ip: a.ip,
                                card_id: a.card_id,
                                num: a.rans(32)
                            }
                        }, function () {
                        }),
                            a.make = 1)),
                            $("#upImg").hide();
                    else {
                        if ("0px" == $("#lastAbout").css("top") && a.seating == a.result.page.length - 1 && !a.lastDown)
                            return a.lastDown = !0,
                                $("#lastAbout").css({
                                    top: a.height + "px",
                                    opacity: 0
                                }),
                                !1;
                        a.seating <= 1 && $("#upImg").show()
                    }
                }),
                void 0)
        }
        ,
        createRedPackets = function () {
            var f, g, a = this, b = 24 / a.UI_WIDTH * a.width;
            return 16 / a.UI_WIDTH * a.width,
            120 / a.UI_WIDTH * a.width,
            72 / a.UI_WIDTH * a.width,
                f = '<div id="red_packets_bg" class="hide"></div>        <div id="red_packets_form" class="hide">        <div class="container"><div class="flip"><div class="front"><img src="' + a.changeImgUrl("http://qnm.hunliji.com/o_1br3sqcqfihrqq73fn1rcs2iru.png") + '" style="width:100%;height:100%"/></div><div class="back"><img src="' + a.changeImgUrl("http://qnm.hunliji.com/o_1br6i7odt1hf345lpm1dqdog610.png") + '" style="width:100%;height:100%"/></div></div></div>        <div class="money"></div>        <div class="red_packets_before"></div>        <div class="red_packets_wrap">        <div class="red_packets_name"><i>赠送人：</i><input class="red_packets_name_txt"  style="padding:' + b + "px 0 " + b + 'px 0;" type="text" value="" placeholder="请输入您的姓名"/></div>        <div class="red_packets_money"><i>礼金金额：</i><input class="red_packets_money_txt"  style="padding:' + b + "px 0 " + b + 'px 0;" type="number" value="" placeholder="请输入礼金金额"/></div>        <i class="red_packets_tip"></i>        <a class="red_packets_btn" id="sendPriceBtnV2"><img src="' + a.changeImgUrl("http://qnm.hunliji.com/o_1br6i543210sh1ftisg57fe135tr.png") + '"/></a>        </div>        <a class="close_red_packets"><img src="' + a.changeImgUrl("http://qnm.hunliji.com/o_1br37s33k1155ams19a6h471nrb7.png") + '"/></a>        </div>',
                $("#red_packets_bg").length <= 0 ? ($("#other").append(f),
                    $(".container").css({
                        width: 636 / this.UI_WIDTH * this.width + "px",
                        height: 183 / this.UI_HEIGHT * this.height + "px"
                    }),
                    $(".front").css({
                        width: 636 / this.UI_WIDTH * this.width + "px",
                        height: 183 / this.UI_HEIGHT * this.height + "px"
                    }),
                    $(".back").css({
                        width: 636 / this.UI_WIDTH * this.width + "px",
                        height: 183 / this.UI_HEIGHT * this.height + "px"
                    }),
                    $(".close_red_packets").css({
                        width: 104 / a.UI_WIDTH * a.width + "px",
                        height: 104 / a.UI_WIDTH * a.width + "px",
                        "text-align": "center"
                    }),
                    $(".close_red_packets img").css({
                        width: 52 / a.UI_WIDTH * a.width + "px",
                        height: 52 / a.UI_WIDTH * a.width + "px",
                        "margin-top": "25%"
                    }),
                    $(".red_packets_wrap").css({
                        position: "relative",
                        "z-index": "13px",
                        top: 80 / a.UI_WIDTH * a.width + "px"
                    }),
                    $("#red_packets_form").css({
                        width: 636 / this.UI_WIDTH * this.width + "px",
                        height: 860 / this.UI_HEIGHT * this.height + "px",
                        margin: "0 auto",
                        top: 294 / this.UI_WIDTH * this.width + "px"
                    }),
                    $(".red_packets_btn").css({
                        display: "block",
                        width: 520 / a.UI_WIDTH * a.width + "px",
                        height: 88 / a.UI_HEIGHT * a.height + "px",
                        margin: "auto"
                    }),
                    $(".red_packets_name").css({
                        width: 520 / a.UI_WIDTH * a.width + "px"
                    }),
                    $(".red_packets_money").css({
                        width: 520 / a.UI_WIDTH * a.width + "px"
                    }),
                    $(".red_packets_wrap input").css({
                        width: 330 / a.UI_WIDTH * a.width + "px"
                    }),
                    g = a.isCardMaster ? "//qnm.hunliji.com/o_1c7ajea971ka5ic41gpj2ta1h677.png" : "//qnm.hunliji.com/o_1br1ih4sf1gj9vah1gphldi8ic15.png",
                    $(".red_packets_tip").css({
                        display: "block",
                        width: 460 / this.UI_WIDTH * this.width + "px",
                        height: "25px",
                        margin: "auto",
                        "margin-bottom": 30 / this.UI_WIDTH * this.width + "px",
                        background: "url(" + a.changeImgUrl(g) + ") no-repeat 0 0",
                        "background-size": "100%"
                    }),
                    $(".money").css({
                        width: 565 / a.UI_WIDTH * a.width + "px",
                        height: 700 / a.UI_HEIGHT * a.height + "px"
                    }),
                    void 0) : !1
        }
        ,
        lastAbout = function () {
            var c, d, e, f, g, h, i, j, a = this, b = a.result.cardInfo.card_saas_info;
            return $("#lastAbout").length > 0 || this.type ? !1 : (this.lastState = !0,
                this.lastDown = !0,
                c = {},
                d = "",
                c.url = "/p/wedding/Public/wap/invitationCard/feedBack_new/#/index/" + this.card_id + "?appName=" + (a.isCardMaster ? "cardMaster" : ""),
                b ? (this.getSaasMerchantInfo(b.saas_merchant_id),
                    d = '<div id="lastAbout">                      <div class="qrcode"><img src="' + a.changeImgUrl(b.saas_qrcode) + '"/></div>                      <h3 class="name"></h3>                      <p class="address"></p>                      <div class="btn_group">                        <a class="contactUs" href="javascript:;">联系我们</a>                        <a class="appoint" href="javascript:;">预约到店</a>                        <span class="support">技术支持：婚礼纪</span>                      </div>                    </div>',
                    e = 30 / a.UI_WIDTH * a.width,
                    f = 180 / a.UI_WIDTH * a.width,
                    g = 72 / a.UI_WIDTH * a.width,
                    h = '<div id="contact_bg" style="transform:translateY(' + a.height + 'px);"></div><div id="contact" style="padding:0 ' + e + "px 0 " + e + 'px; ">                                    <div class="appoint_title">留下您的联系方式以方便预约</div>                                    <div class="appoint_phone"><i>联系电话</i><input class="appoint_phone_txt" style="padding:' + e + "px 0 " + e + 'px 0;" type="text" value="" placeholder="请输入联系电话"/></div>                                    <div class="appoint_name">                                      <div class="appoint_name_bd"><i>您的姓名</i><input class="appoint_name_txt" style="padding:' + e + "px 0 " + e + 'px 0;" type="text" value="" placeholder="请输入您的姓名"/></div>                                      <div class="appoint_name_btn"><span class="appointBtn" style="width:' + f + "px;height:" + g + "px;line-height:" + g + 'px">立即预约</span></div>                                    </div></div>',
                    $("#contact").length <= 0 ? $("#other").append(h) : null) : (i = a.isCardMaster ? "请帖由请帖大师APP制作" : "请帖由婚礼纪APP制作",
                    d = 1 == this.card_claim ? '<div id="lastAbout">              <div class="logo"><img src="' + a.changeImgUrl(c.logo) + '"/></div>              <h5>长按二维码制作电子请帖</h5>              <div class="two2d"><img src="' + a.changeImgUrl(c.twoImg) + '"/></div>              <div class="make_desc">' + i + '</div>              <div class="moreIcon"><a id="claim"><em>领取礼包</em></a><a href="' + (c.url + "&claim=1&need_auth=" + this.need_auth + "&total_income=" + this.total_income) + '"><span>礼金提现与投诉建议</span></a></div></div>' : '<div id="lastAbout">            <div class="logo"><img src="' + a.changeImgUrl(c.logo) + '"/></div>            <h5>长按二维码制作电子请帖</h5>            <div class="two2d"><img src="' + a.changeImgUrl(c.twoImg) + '"/></div>            <div class="make_desc">' + i + '</div>            <div class="moreIcon"><a id="claim"><em>领取礼包</em></a><a style="color:#fff;opacity:0.7" href="' + c.url + '"><span>礼金提现与投诉建议</span></a></div>          </div>'),
                $(document).on("touchstart", ".appoint", function () {
                    setTimeout(function () {
                        $("#contact").css({
                            zIndex: 9,
                            opacity: 1
                        }),
                            $("#contact_bg").css({
                                "-webkit-transform": "translateY(0)"
                            })
                    }, 300),
                        navigator.userAgent.indexOf("Android") > -1 ? setTimeout(function () {
                            $(".appoint_phone_txt").focus()
                        }, 300) : $(".appoint_phone_txt").focus()
                }),
                $(document).on("touchstart", ".appointBtn", function () {
                    var e, c = $(".appoint_phone_txt").val(), d = $(".appoint_name_txt").val();
                    return /^1\d{10}$/.test(c) ? d ? (e = {
                        phone: c,
                        name: d,
                        merchant_id: b.saas_merchant_id,
                        f_wxcard_id: a.card_id
                    },
                        $.ajax({
                            url: a.saashost + a.API.appointment,
                            type: "post",
                            data: e,
                            success: function (b) {
                                0 == b.status.RetCode ? ($(".appoint_phone_txt").blur(),
                                    $(".appoint_name_txt").blur(),
                                    a.outputMsg("预约成功"),
                                    $("#contact").css({
                                        zIndex: "-1",
                                        opacity: 0
                                    })) : 84 == b.status.RetCode && a.outputMsg("您已经预约成功，不能重复预约！")
                            }
                        }),
                        void 0) : (a.outputMsg("请输入您的姓名"),
                        !1) : (a.outputMsg("请输入11位手机号"),
                        !1)
                }),
                $(document).on("touchend", "#contact_bg", function (a) {
                    a.stopPropagation(),
                        setTimeout(function () {
                            $(".appoint_name_txt").val("").blur(),
                                $(".appoint_name_txt").blur()
                        }, 300)
                }),
                $(document).on("touchstart", "#contact_bg", function (b) {
                    b.stopPropagation(),
                        $(this).css({
                            "-webkit-transform": "translateY(" + a.height + "px)"
                        }),
                        $("#contact").css({
                            zIndex: "-1",
                            opacity: 0
                        }),
                        $(".appoint_phone_txt").blur(),
                        $(".appoint_name_txt").blur()
                }),
                $(document).on("touchstart", "#lastAbout", function (a) {
                    a.stopPropagation(),
                        $("#contact").css({
                            zIndex: "-1",
                            opacity: 0
                        }),
                        $(".appoint_phone_txt").blur(),
                        $(".appoint_name_txt").blur()
                }),
                // $(document).on("touchstart", "#claim", function () {
                //     a.sdkData({
                //         action: "insurance",
                //         eventable_type: "Card",
                //         additional: {
                //             ip: a.ip,
                //             card_id: a.card_id,
                //             num: a.rans(32)
                //         }
                //     }),
                //         location.href = "https://creditcard.ecitic.com/h5/shenqing/yan_x/ql2.html?sid=SJ51SY"
                // }),
                $("#other").append(d),
                $("#lastAbout").css({
                    top: this.height + "px",
                    "padding-top": 138 / this.UI_WIDTH * this.width + "px",
                    width: this.width + "px",
                    height: this.height + "px"
                }),
                $(".logo").css({
                    width: c.logo_w / this.UI_WIDTH * this.width + "px"
                }),
                $(".two2d").css({
                    width: c.towImg_w / this.UI_WIDTH * this.width + "px"
                }),
                $(".moreIcon").css({
                    marginTop: 40 / this.UI_WIDTH * this.width + "px",
                    width: c.towImg_w / this.UI_WIDTH * this.width + "px"
                }),
                $(".moreIcon a").eq(1).css({
                    marginTop: (this.width <= 320 ? 100 : 125) / this.UI_WIDTH * this.width + "px"
                }),
                $(".support").css({
                    "margin-top": (this.width <= 320 ? 160 : 200) / this.UI_HEIGHT * this.height + "px",
                    display: "block",
                    "text-align": "center",
                    color: "#999"
                }),
            navigator.userAgent.indexOf("Android") > -1 && ($(".moreIcon a").eq(1).css({
                marginTop: (this.width <= 320 ? 30 : 110) / this.UI_WIDTH * this.width + "px"
            }),
                $(".support").css({
                    "margin-top": (this.width <= 320 ? 160 : 200) / this.UI_HEIGHT * this.height + "px",
                    display: "block",
                    "text-align": "center",
                    color: "#999"
                }),
            (navigator.userAgent.indexOf("HUAWEI") > -1 || navigator.userAgent.indexOf("LG") > -1) && ($("#lastAbout").css({
                top: this.height + "px",
                "padding-top": 98 / this.UI_WIDTH * this.width + "px",
                width: this.width + "px",
                height: this.height + "px"
            }),
                $(".moreIcon a").eq(1).css({
                    marginTop: (this.width <= 320 ? 30 : 62) / this.UI_WIDTH * this.width + "px"
                }),
                $(".support").css({
                    "margin-top": (this.width <= 320 ? 160 : 200) / this.UI_HEIGHT * this.height + "px",
                    display: "block",
                    "text-align": "center",
                    color: "#999"
                }))),
                $("#lastAbout h5").css({
                    "margin-top": 60 / this.UI_WIDTH * this.width + "px",
                    "margin-bottom": 20 / this.UI_WIDTH * this.width + "px",
                    "font-size": 28 / this.UI_WIDTH * this.width + "px"
                }),
                $("#lastAbout h3").css({
                    "margin-top": 32 / this.UI_WIDTH * this.width + "px",
                    "font-size": 32 / this.UI_WIDTH * this.width + "px"
                }),
                $("#lastAbout p").css({
                    "margin-top": 162 / this.UI_WIDTH * this.width + "px",
                    "font-size": 28 / this.UI_WIDTH * this.width + "px"
                }),
                $(".qrcode").css({
                    width: c.towImg_w / this.UI_WIDTH * this.width + "px",
                    margin: "auto",
                    "margin-top": 60 / this.UI_HEIGHT * this.height + "px",
                    border: "1px solid #e7e7e7"
                }),
                $("#lastAbout .make_desc").css({
                    "font-size": 24 / this.UI_WIDTH * this.width + "px",
                    color: "#aaa",
                    "text-align": "center",
                    "margin-top": 20 / this.UI_WIDTH * this.width + "px"
                }),
                $(".address").css({
                    color: "#666",
                    margin: "auto",
                    width: 430 / this.UI_WIDTH * this.width + "px",
                    "font-size": 28 / this.UI_WIDTH * this.width + "px",
                    "text-align": "center",
                    "margin-bottom": 55 / this.UI_HEIGHT * this.height + "px"
                }),
                $(".btn_group a").css({
                    margin: "auto",
                    width: 430 / this.UI_WIDTH * this.width + "px",
                    height: 72 / this.UI_HEIGHT * this.height + "px",
                    "line-height": 72 / this.UI_HEIGHT * this.height + "px",
                    color: "#fff",
                    "font-size": 28 / this.UI_WIDTH * this.width + "px",
                    display: "block",
                    "text-align": "center",
                    "margin-top": 20 / this.UI_HEIGHT * this.height + "px"
                }),
                $(".name").css({
                    color: "#000",
                    "margin-top": 70 / this.UI_HEIGHT * this.height + "px",
                    "margin-bottom": 20 / this.UI_HEIGHT * this.height + "px",
                    "font-weight": "700"
                }),
                $(".btn_group .contactUs").css({
                    background: "#f83244"
                }),
                $(".btn_group .appoint").css({
                    background: "#333"
                }),
                j = new Hammer(document.getElementById("lastAbout")),
                a = this,
                j.get("swipe").set({
                    direction: Hammer.DIRECTION_ALL
                }),
                j.on("swipe", function (b) {
                    var c = b.deltaY;
                    return c > 0 && "0px" == $("#lastAbout").css("top") && a.seating == a.result.page.length - 1 && !a.lastDown ? (a.lastDown = !0,
                        $("#lastAbout").css({
                            top: a.height + "px",
                            opacity: 0
                        }),
                        !1) : void 0
                }),
                void 0)
        }
        ,
        getSaasMerchantInfo = function (a) {
            var b = this;
            $.ajax({
                url: b.saashost + b.API.getInfo,
                type: "get",
                data: {
                    merchant_id: a
                },
                success: function (a) {
                    0 == a.status.RetCode && ($("#lastAbout .name").html(a.data.name),
                        $("#lastAbout .address").html(a.data.address),
                        $("#lastAbout").css({
                            background: "rgba(253, 254, 254,.9)"
                        }),
                        a.data.contact_phone ? $(".contactUs").attr("href", "tel:" + a.data.contact_phone) : $(".contactUs").attr("href", "tel:" + a.data.phone))
                }
            })
        }
        ,
        upDownIcon = function () {
            var a = this
                , b = document.createElement("div");
            b.setAttribute("id", "upImg"),
                b.style.bottom = 80 / this.UI_WIDTH * this.width + "px",
                b.innerHTML = '<img src="' + a.changeImgUrl(a.pageIcon) + '"/>',
                document.body.appendChild(b)
        }
        ,
        iosReg = function () {
            var b = navigator.userAgent.toLowerCase()
                , c = b.match(/cpu iphone os (.*?) like mac os/);
            return c && c[1].split(/_/g)[0] < 9 ? c[1].split(/_/g)[0] : void 0
        }
        ,
        isIphoneX = function () {
            return navigator.userAgent.indexOf("iPhone") > -1 && 812 == screen.height && 375 == screen.width
        }
        ,
        touchAction = function () {
            var a = new Hammer(document.getElementById("wrap"))
                , b = this
                , c = b.type ? 100 : 600;
            b.type && $(".layout").css({
                "-webkit-transition-duration": "300ms"
            }),
                a.get("swipe").set({
                    direction: Hammer.DIRECTION_ALL
                }),
                a.on("swipe", function (a) {
                    var e, f, g, h, i, d = a.deltaY;
                    if (b.seating >= b.result.page.length - 2 && b.otherMap(b.srcMap),
                            b.autoState = !0,
                        0 > d)
                        b.seating <= b.result.page.length - 2 || (b.otherState.chat_gift && b.otherState.chat_cash ? $(".layout").eq(b.result.page.length - 1).hasClass("hide") || b.seating != b.result.page.length - 1 || $("#giftPage").css("top") != b.height + "px" || (b.showGiftPage = !1,
                            $("#giftPage").css({
                                top: 0,
                                opacity: 1
                            }),
                            b.animateGiftAni(),
                            $("#upImg").hide()) : !$(".layout").eq(b.result.page.length - 1).hasClass("hide") && b.seating == b.result.page.length - 1 && $("#lastAbout").css("top") == b.height + "px" && b.lastDown && (b.lastDown = !1,
                            $("#lastAbout").css({
                                top: 0,
                                opacity: 1
                            }),
                            b.$giftAni.removeClass("animate"),
                        b.make || (b.sdkData({
                            action: "make",
                            eventable_type: "Card",
                            additional: {
                                ip: b.ip,
                                card_id: b.card_id,
                                num: b.rans(32)
                            }
                        }, function () {
                        }),
                            b.make = 1))),
                            $("#upImg").hide();
                    else {
                        if ("0px" == $("#lastAbout").css("top") && b.seating == b.result.page.length - 1 && !b.lastDown)
                            return b.lastDown = !0,
                                $("#lastAbout").css({
                                    top: b.height + "px",
                                    opacity: 0
                                }),
                                !1;
                        b.seating <= 1 && $("#upImg").show()
                    }
                    if (d > 0 && b.seating > 0 ? (b.seatState && (e = b.seating,
                            b.exPage ? e = b.exPage + 1 : b.sortS && (e = Number(b.sortS + 1)),
                            b.seatState = !1,
                            $(".layout").eq(e - 1).css({
                                "-webkit-transform": "translateY(" + b.height + "px)"
                            }),
                            $("#all-page").css({
                                opacity: 0
                            }),
                            $(".ele_background_" + Number(e - 1)).css({
                                "-webkit-transform": "translateY(" + b.height + "px)"
                            }),
                            setTimeout(function () {
                                $("#all-page").css({
                                    opacity: 1
                                }),
                                    $("#all-page").empty().append(b.createPage(b.result.page)),
                                    b.addStyleNode()
                            }, 600)),
                        navigator.userAgent.indexOf("Android") > -1 && b.seating - 2 == b.videoNext && document.getElementById("vid") && setTimeout(function () {
                            document.getElementById("vid").muted = "muted",
                                document.getElementById("vid").play()
                        }, 600),
                            b.seating--,
                            b.type ? ($(".layout").eq(b.seating + 1).css({
                                opacity: "0"
                            }),
                                $(".ele_background_" + Number(b.seating + 1)).css({
                                    opacity: "0"
                                }),
                                setTimeout(function () {
                                    $(".layout").eq(b.seating).removeClass("hide").css({
                                        opacity: "1"
                                    }),
                                        $(".layout").eq(b.seating + 1).addClass("hide").css({
                                            opacity: "1"
                                        }),
                                    b.result.theme_background && ($(".ele_background_" + Number(b.seating)).css({
                                        "-webkit-transform": "translateY(0px)"
                                    }),
                                        $(".ele_background_" + Number(b.seating + 1)).css({
                                            "-webkit-transform": "translateY(" + b.height + "px)"
                                        }))
                                }, c)) : ($(".layout").eq(b.seating + 1).css({
                                "-webkit-transform": "translateY(" + b.height + "px)"
                            }),
                                $(".ele_background_" + Number(b.seating + 1)).css({
                                    "-webkit-transform": "translateY(" + b.height + "px)"
                                }),
                                setTimeout(function () {
                                    $(".layout").eq(b.seating).removeClass("hide").css({
                                        "-webkit-transform": "scale(1) translateY(0)"
                                    }),
                                        $(".layout").eq(b.seating + 1).addClass("hide").css({
                                            "-webkit-transform": "translateY(" + b.height + "px)"
                                        }),
                                    b.result.theme_background && ($(".ele_background_" + Number(b.seating)).css({
                                        "-webkit-transform": "translateY(0px)"
                                    }),
                                        $(".ele_background_" + Number(b.seating + 1)).css({
                                            "-webkit-transform": "translateY(" + b.height + "px)"
                                        }))
                                }, c))) : 0 > d && b.seating < b.result.page.length && b.seating != b.result.page.length - 1 && (b.seatState && (e = b.seating,
                        b.exPage && (e = b.exPage + 1),
                            b.seatState = !1,
                            $(".layout").eq(e - 1).css({
                                "-webkit-transform": "translateY(-" + b.height + "px)"
                            }),
                            $("#all-page").css({
                                opacity: 0
                            }),
                            $(".ele_background_" + Number(e - 1)).css({
                                "-webkit-transform": "translateY(-" + b.height + "px)"
                            }),
                            setTimeout(function () {
                                $("#all-page").css({
                                    opacity: 1
                                }),
                                    $("#all-page").empty().append(b.createPage(b.result.page)),
                                    b.addStyleNode()
                            }, 600)),
                        navigator.userAgent.indexOf("Android") > -1 && b.seating == b.videoNext && document.getElementById("vid") && setTimeout(function () {
                            document.getElementById("vid").muted = "muted",
                                document.getElementById("vid").play()
                        }, 600),
                            b.seating++,
                            b.type ? ($(".layout").eq(b.seating - 1).css({
                                opacity: "0"
                            }),
                                $(".ele_background_" + b.seating).css({
                                    opacity: "1"
                                }),
                                setTimeout(function () {
                                    $(".layout").eq(b.seating).removeClass("hide"),
                                        $(".layout").eq(b.seating - 1).addClass("hide"),
                                    b.result.theme_background && ($(".ele_background_" + Number(b.seating - 1)).css({
                                        "-webkit-transform": "translateY(" + b.height + "px)"
                                    }),
                                        $(".ele_background_" + b.seating).css({
                                            "-webkit-transform": "translateY(0px)"
                                        }))
                                }, c)) : ($(".layout").eq(b.seating - 1).css({
                                "-webkit-transform": "scale(1) translateY(-" + 1.2 * b.height + "px)"
                            }),
                                $(".ele_background_" + b.seating).css({
                                    "-webkit-transform": "translateY(0)"
                                }),
                                setTimeout(function () {
                                    $(".layout").eq(b.seating).removeClass("hide").css({
                                        "-webkit-transform": "translateY(0)"
                                    }),
                                        $(".layout").eq(b.seating - 1).addClass("hide"),
                                    b.result.theme_background && $(".ele_background_" + Number(b.seating - 1)).css({
                                        "-webkit-transform": "translateY(" + b.height + "px)"
                                    })
                                }, c))),
                            // setTimeout(function () {
                            //     b.chatMsg()
                            // }, 600),
                        b.editState && (b.type || b.getParams("edit"))) {
                        for (f = $(".editIcon"),
                                 f.addClass("hide"),
                                 g = 0; g < f.length; g++)
                            f.eq(g).attr("page_id") == b.result.page[b.seating].id && f.eq(g).removeClass("hide");
                        h = $(".edit_icon_pop_container"),
                            h.addClass("hide"),
                            i = 0,
                            i = 0 === h.length % 2 ? h.length / 2 - 1 : Math.floor(h.length / 2),
                            "true" === localStorage.getItem("edit_icon_pop_tip") ? h.eq(i).addClass("hide") : h.eq(i).attr("page_id") == b.result.page[b.seating].id ? setTimeout(function () {
                                h.eq(i).attr("page_id") == b.result.page[b.seating].id ? (h.eq(i).removeClass("hide"),
                                    h.eq(i).find(".edit_icon_poptip").addClass("pop_tip_zoom")) : h.eq(i).addClass("hide")
                            }, 3e3) : h.eq(i).addClass("hide")
                    }
                })
        }
        ,
        getParams = function (a) {
            function c() {
                var a, b, f, c = /\+/g, d = /([^&=]+)=?([^&]*)/g, e = function (a) {
                    return decodeURIComponent(a.replace(c, " "))
                };
                for (f = window.location.hash.substring() ? window.location.hash.substring().split("?")[1] : window.location.search.substring(1),
                         a = {}; b = d.exec(f);)
                    a[e(b[1])] = e(b[2]);
                return a
            }

            var b = c();
            return b[a]
        }
        ,
        sendCash = function (a) {
            var b = this;
            $.ajax({
                url: b.localhost + a.api,
                type: "post",
                data: a.data,
                success: function (c) {
                    0 == c.status.RetCode ? (sessionStorage.setItem("gift_id", ""),
                        sessionStorage.setItem("cash_id", c.data["entity_id"] || ""),
                        b.wxPaySend(a, c.data.pay_params, "cash"),
                        $(".loadmore-loading").remove()) : (b.msgMax("请在微信客户端进行支付操作", "确定"),
                        $(".loadmore-loading").remove())
                }
            })
        }
        ,
        sendGift = function (a) {
            var b = this;
            $.ajax({
                url: b.localhost + a.payApi,
                type: "post",
                data: a.payParams,
                success: function (c) {
                    0 == c.status.RetCode ? (sessionStorage.setItem("cash_id", ""),
                        sessionStorage.setItem("gift_id", c.data["entity_id"] || ""),
                        b.wxPaySend(a, c.data.pay_params, "payGift"),
                        $(".loadmore-loading").remove()) : (b.msgMax("请在微信客户端进行支付操作", "确定"),
                        $(".loadmore-loading").remove())
                }
            })
        }
        ,
        wxPaySend = function (a, b, c) {
            var d = this;
            b && WeixinJSBridge.invoke("getBrandWCPayRequest", JSON.parse(b), function (e) {
                if ($(".msgMax_box") && $(".msgMax_box").remove(),
                    "get_brand_wcpay_request:ok" == e.err_msg) {
                    var f = "";
                    f = "payGift" == c ? a.payCallBack + "?type=gift&payGift=" + a.payGift + "&payMoney=" + a.payMoney : a.callback + "?type=cash&payMoney=" + a.data.price,
                    d.isCardMaster && (f += "&appName=cardMaster"),
                        window.location.href = f,
                        pay.writeCookie("cardPrice", !0),
                        pay.writeCookie("cashGiftName", a.giver_name)
                } else
                    "get_brand_wcpay_request:cancel" == e.err_msg ? d.msgMax2BTN(["朕意已决", "立即支付"], function () {
                        d.wxPaySend(a, b, c)
                    }) : "get_brand_wcpay_request:fail" == e.err_msg && (d.msgMax(e.err_code + e.err_desc + e.err_msg, "确定"),
                        d.writeCookie("showGiftPage", !1, -1))
            })
        }
        ,
        msgMax = function (a, b, c) {
            $("body").append('<div class="msgMax_box" style="position:fixed;top:0;left:0;bottom:0;right:0;background:rgba(0,0,0,0.6);z-index:999"></div><div class="msgMax_box" style="margin:auto;position:fixed;top:0;left:0;bottom:0;right:0;width:75%;height:' + .25 * $(window).height() + 'px;background:#fff;border-radius:8px;text-align:center;font-size:.7rem;z-index:9999"><p style="padding:0 18px;display:table-cell;vertical-align:middle;color:#666;width:' + .75 * $(window).width() + "px;height:" + .18 * $(window).height() + 'px;line-height:1rem;">' + a + '</p><div class="msgMax_btn" style="color:#ff705e;border-top:1px solid #e5e5e5;line-height:' + .07 * $(window).height() + 'px;">' + b + "</div></div>"),
                $(document).on("touchstart", ".msgMax_btn", function () {
                    $(".msgMax_box").remove()
                }),
            c && c()
        }
        ,
        msgMax2BTN = function (a, b) {
            $("body").append('<div class="msgMax_box" style="position:fixed;top:0;left:0;bottom:0;right:0;background:rgba(0,0,0,0.6);z-index:999"></div><div class="msgMax_box" style="margin:auto;position:fixed;top:0;left:0;bottom:0;right:0;width:75%;height:' + .3 * $(window).height() + 'px;background:#fff;border-radius:8px;text-align:center;font-size:.7rem;z-index:9999"><p style="padding:0 18px;display:table-cell;vertical-align:middle;color:#666;width:' + .75 * $(window).width() + "px;height:" + .23 * $(window).height() + 'px;line-height:1rem;">亲，您真的要放弃支付吗？<br>新人会难过的哟</p><div class="msgMax_btn" style="display:-webkit-box;color:#ff705e;border-top:1px solid #e5e5e5;line-height:' + .07 * $(window).height() + 'px;"><div class="cancelBtn" style="-webkit-box-flex:1;border-right:1px solid #e5e5e5;color:#ddd">' + a[0] + '</div><div class="payBtn" style="-webkit-box-flex:1;color:#1aad19">' + a[1] + "</div></div></div>");
            var c = this;
            $(".cancelBtn").on("touchend", function () {
                $(".msgMax_box").remove(),
                    c.writeCookie("showGiftPage", !1, -1)
            }),
                $(".payBtn").on("touchend", function () {
                    b && b()
                })
        }
        ,
        isWeiXin = function () {
            var a = window.navigator.userAgent.toLowerCase();
            return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1
        }
        ,
        isWXwork = function () {
            var a = window.navigator.userAgent.toLowerCase();
            return "wxwork" == a.match(/wxwork/i) ? !0 : !1
        }
        ,
        writeCookie = function (a, b, c) {
            var d = "";
            null != c && (d = new Date((new Date).getTime() + 36e5 * c),
                d = "; expires=" + d.toGMTString()),
                document.cookie = a + "=" + escape(b) + d + ";path=/"
        }
        ,
        getCookie = function (a) {
            var b = document.cookie
                , c = b.indexOf("" + a + "=");
            return -1 == c && (c = b.indexOf(a + "=")),
                -1 == c ? b = null : (c = b.indexOf("=", c) + 1,
                    cookieEndAt = b.indexOf(";", c),
                -1 == cookieEndAt && (cookieEndAt = b.length),
                    b = unescape(b.substring(c, cookieEndAt))),
                b
        }
        ,
        sdkData = function (a, b, c) {
            // var d = this
            //     , e = '{"events":[' + JSON.stringify(a) + "]}"
            //     , f = this.getParams("appName") || "";
            // $.ajax({
            //     url: d.API.sdkData,
            //     type: "post",
            //     data: e,
            //     headers: {
            //         appName: f
            //     },
            //     success: function () {
            //         b && b()
            //     },
            //     error: function () {
            //         c && c()
            //     }
            // })
        }
        ,
        rans = function (a) {
            var b, c, d;
            if (localStorage.getItem("rans"))
                return localStorage.getItem("rans");
            for (a = a || 32,
                     b = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
                     c = b.length,
                     d = "",
                     i = 0; a > i; i++)
                d += b.charAt(Math.floor(Math.random() * c));
            return localStorage.setItem("rans", d),
                d
        }
        ,
        sdk = function () {
            var a = this
                , b = a.result.cardInfo.card_saas_info;
            $.ajax({
                url: "https://www.hunliji.com/sms/ip",
                type: "get",
                success: function (b) {
                    a.ip = b,
                        localStorage.setItem("ip", b)
                }
            }),
                setTimeout(function () {
                    a.sdkData({
                        action: "view",
                        eventable_type: "Card",
                        additional: {
                            ip: a.ip,
                            card_id: a.card_id,
                            num: a.rans(32),
                            tag: b ? "saas" : ""
                        }
                    })
                }, 3e3)
        }
        ,
        animateGiftAni = function () {
            var a = this;
            a.$giftAni.removeClass("animate"),
                a.$giftAni.find("img").attr("src", a.giftProperty.imgUrl),
                a.$giftAni.find("span").text(a.giftProperty.desc),
                a.$giftAni.css("top", a.showGiftPage ? "120px" : "80px"),
                setTimeout(function () {
                    a.$giftAni.addClass("animate")
                }, 10)
        }
        ,
        giftSelection = function (a) {
            var e, b = this, c = 0, d = b.defaultGiftSeat;
            a.forEach(function (a) {
                a.card_gift && "蜜月保" == a.card_gift.title && c++
            }),
            c > 0 && 3 > c && b.allGifts.forEach(function (a, b) {
                "蜜月保" === a.title && (d = b)
            }),
                $(".gift-ratio").hammer ? (new Hammer.Manager($(".gift-ratio").eq(d)[0]).emit("tap", {
                    from: "jsTap"
                }),
                    new Hammer.Manager($(".gift-ratio-v2").eq(d)[0]).emit("tap", {
                        from: "jsTap"
                    })) : e = setInterval(function () {
                    $(".gift-ratio").hammer && (new Hammer.Manager($(".gift-ratio").eq(d)[0]).emit("tap", {
                        from: "jsTap"
                    }),
                        new Hammer.Manager($(".gift-ratio-v2").eq(d)[0]).emit("tap", {
                            from: "jsTap"
                        }),
                        clearInterval(e))
                }, 1e3)
        }
        ,
        mzImp = function () {
            var b = navigator.userAgent.indexOf("iPhone") > -1 ? 1 : navigator.userAgent.indexOf("Android") > -1 ? 0 : navigator.userAgent.indexOf("Windows Phone") > -1 ? 2 : 3;
            $.ajax({
                url: "https://g.cn.miaozhen.com/x/k=2075581&p=7DqRx&dx=__IPDX__&rt=2&ns=__IP__&ni=__IESID__&v=__LOC__&xa=__ADPLATFORM__&tr=__REQUESTID__&mo=" + b + "&m0=__OPENUDID__&m0a=__DUID__&m1=__ANDROIDID1__&m1a=__ANDROIDID__&m2=__IMEI__&m4=__AAID__&m5=__IDFA__&m6=__MAC1__&m6a=__MAC__&o=",
                type: "get",
                dataType: "jsonp",
                headers: {
                    "Content-Type": "application/x-javascript"
                },
                success: function () {
                }
            })
        }
        ,
        mzClick = function () {
            var b = navigator.userAgent.indexOf("iPhone") > -1 ? 1 : navigator.userAgent.indexOf("Android") > -1 ? 0 : navigator.userAgent.indexOf("Windows Phone") > -1 ? 2 : 3;
            $.ajax({
                url: "https://e.cn.miaozhen.com/r/k=2075581&p=7DqRx&dx=__IPDX__&rt=2&ns=__IP__&ni=__IESID__&v=__LOC__&xa=__ADPLATFORM__&tr=__REQUESTID__&mo=" + b + "&m0=__OPENUDID__&m0a=__DUID__&m1=__ANDROIDID1__&m1a=__ANDROIDID__&m2=__IMEI__&m4=__AAID__&m5=__IDFA__&m6=__MAC1__&m6a=__MAC__&o=",
                type: "get",
                dataType: "jsonp",
                success: function () {
                }
            })
        }
        ,
        addStyleNode = function () {
            var a = document.createElement("style")
                , b = this;
            a.innerHTML = b.aniStyle,
            $("head").find("style").length > 0 && $("head").find("style").remove(),
                $("head").append(a)
        }
        ,
        {
            addStyleNode: addStyleNode,
            mzClick: mzClick,
            mzImp: mzImp,
            giftSelection: giftSelection,
            changeImgUrl: changeImgUrl,
            wxPaySend: wxPaySend,
            msgMax: msgMax,
            msgMax2BTN: msgMax2BTN,
            isWeiXin: isWeiXin,
            wxsq: wxsq,
            wxsq_event: wxsq_event,
            otherAction: otherAction,
            guestPageHide: guestPageHide,
            ajax_reply: ajax_reply,
            ajax_info: ajax_info,
            ajax_gifts: ajax_gifts,
            closeCardState: closeCardState,
            init: init,
            hideEdit: hideEdit,
            get_infinite: get_infinite,
            // selectGift: selectGift,
            // getGifts_replies: getGifts_replies,
            // chatMsg: chatMsg,
            // gift_action: gift_action,
            winMsg: winMsg,
            outputMsg: outputMsg,
            loadAnimate: loadAnimate,
            allImg: allImg,
            loading: loading,
            add_infinite: add_infinite,
            rov_infinite: rov_infinite,
            otherMap: otherMap,
            addStyle: addStyle,
            createPage: createPage,
            guestsPage: guestsPage,
            guestAction: guestAction,
            musicPause: musicPause,
            changeVideo: changeVideo,
            changeMusic: changeMusic,
            musicStatePause: musicStatePause,
            exchangePage: exchangePage,
            addPage: addPage,
            editPageHoles: editPageHoles,
            delPage: delPage,
            getCurrentPage: getCurrentPage,
            gotoPage: gotoPage,
            autoPlayPage: autoPlayPage,
            positionIcon: positionIcon,
            lastAbout: lastAbout,
            giftPage: giftPage,
            selectGift_v2: selectGift_v2,
            // gift_action_v2: gift_action_v2,
            upDownIcon: upDownIcon,
            iosReg: iosReg,
            touchAction: touchAction,
            editCard_app: editCard_app,
            editIconState: editIconState,
            getParams: getParams,
            sendGift: sendGift,
            sendCash: sendCash,
            writeCookie: writeCookie,
            getCookie: getCookie,
            rans: rans,
            sdkData: sdkData,
            sdk: sdk,
            getSaasMerchantInfo: getSaasMerchantInfo,
            createRedPackets: createRedPackets,
            giftsMarquee: giftsMarquee,
            isIphoneX: isIphoneX,
            isWXwork: isWXwork,
            animateGiftAni: animateGiftAni,
            // giftTishi: giftTishi
        }
}();
var INVITATION_CARD = new boot;
// !INVITATION_CARD.isWXwork() && INVITATION_CARD.isWeiXin() && "/p/wedding/Home/Pay/card_page" != location.pathname && (location.href = "/p/wedding/Home/Pay/card_page" + location.search),
INVITATION_CARD.ajax_info();
