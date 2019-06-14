let userInfo = {};
let interfaceUrl = "https://hachiapp-beta.hachi-tech.com/apiV9/app";
let activityShareBaseUrl = "https://hachiapp.hachi-tech.com/V9";
import vueResource from 'vue-resource/dist/vue-resource';

function commonInit() {
    vueResource(Vue);
    myLayer.layerInit();
    console.log(typeof vueResource);

    /**
     * @version: 0:dev   1:beta   2:production
     * @product: 0:v9    1:v3
     * */
    function urlController(version, project) {
        let interfaceObject = (function () {
            return {
                'v9': {
                    'dev': ['https://hachiapp-dev.pujiapp.com/apiV9/app', 'https://hachiapp-dev.pujiapp.com/V9'],
                    'beta': ['https://hachiapp-beta.hachi-tech.com/apiV9/app', 'https://hachiapp-beta.hachi-tech.com/V9'],
                    'production': ['https://hachiapp.hachi-tech.com/apiV9/app', 'https://hachiapp.hachi-tech.com/V9']
                },
                'v3': {
                    'dev': ['https://hachiappv3-dev.pujiapp.com/api', 'https://hachiappv3-dev.pujiapp.com/V1'],
                    'beta': ['https://hachiappv3-beta.hachi-tech.com/api', 'https://hachiappv3-beta.hachi-tech.com/V1'],
                    'production': ['https://hachiappv3.hachi-tech.com/api', 'https://hachiappv3.hachi-tech.com/V1'],
                },
            }
        }())[version][project];
        interfaceUrl = interfaceObject[0];
        activityShareBaseUrl = interfaceObject[1];
    }

    urlController('v9', 'dev');

    function toast(content) {
        layer.open({
            content: content,
            skin: 'msg',
            time: 2
        })
    }

    Vue.prototype.getQueryString = function (name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    Vue.prototype.getUserInfo = function () {
        if (typeof (H5CallNativieUtils) != "undefined") {
            userInfo = JSON.parse(H5CallNativieUtils.getUserInfo());
        }
    };

    //  加密流程
    function enhanceData(vm, data) {
        //  加密流程
        //  时间戳
        let timeStamp = new Date().getTime() + '';
        // alert('请求时间戳' + timeStamp);
        //  token需要放在加密以前
        data.token = userInfo.userID;
        //  返回的json对象,已经转为json对象了
        let authData = vm.encryption(data, userInfo.mid, timeStamp);
        // alert('返回的authData ' + JSON.stringify(authData));
        //  返回的对象如果有auth,则加入auth,和时间戳
        if (authData.auth) {
            data.auth = authData.auth;
            data.timestamp = timeStamp;
        }
        //  公参等...
        if (data) {
            data.clientIP = userInfo.clientIP;
        }

        let appInfo = {
            "mid": userInfo.mid,
            "imei": userInfo.imei,
            "ip": userInfo.ip,
            "app_version": userInfo.appVersion,
            "phone_model_id": userInfo.phoneModelId,
            "channel_id": userInfo.channelId,
            "channel_name": userInfo.channelName
        };

        // data.jsonData = JSON.stringify(appInfo);

        let basic = {
            "ver": userInfo.appVersion,
            "mid": userInfo.mid,
            "imei": userInfo.imei,
            "platform": userInfo.terminalSource,
            "currentBuildingID": userInfo.buildingID
        };

        // data.basic = JSON.stringify(basic);
        data.basic = (function () {
            if (typeof (H5CallNativieUtils) !== "undefined") {
                return JSON.stringify(basic);
            } else {
                return "share";
            }
        }());

    }

    Vue.prototype.getData = function (vm, url, data, func) {

        enhanceData(vm, data);
        // alert(JSON.stringify(data));
        vm.$http.get(interfaceUrl + url, data).then(function (response) {
            if (response.data.code == 1000) {
                func(response.data.data);
            } else if (response.data.code == 4000) {
                layer.open({
                    content: response.data.message,
                    btn: '确定',
                    shadeClose: false
                });
            } else if (response.data.code == 5000) {
                if (typeof (err) == "undefined") {
                    layer.open({
                        content: response.data.message,
                        btn: '确定',
                        shadeClose: false
                    });
                } else {
                    err(response.data.message);
                }
            } else if (response.data.code == 5001 || response.data.code == 5002 || response.data.code == 7000) {
                if (vm.judgeVersion(201)) {
                    vm.apiErrorCodeProcess(response.data.code, response.data.message);
                } else {
                    layer.open({
                        content: response.data.message,
                        btn: '确定',
                        shadeClose: false
                    });
                }
            } else if (response.data.code == 6000) {
                vm.goLogin();
            }
        }, function (data, status, request) {
            window.location.href = "protocol://android?code=brokenNetwork";
        });
    };
    Vue.prototype.postData = function (vm, url, data, func, err, pageID) {

        data.currentBuildingID = userInfo.buildingID;
        enhanceData(vm, data);
        // alert(JSON.stringify(data));
        let appInfo = {
            "mid": userInfo.mid,
            "imei": userInfo.imei,
            "ip": userInfo.ip,
            "app_version": userInfo.appVersion,
            "phone_model_id": userInfo.phoneModelId,
            "channel_id": userInfo.channelId,
            "channel_name": userInfo.channelName
        };

        // data.jsonData = JSON.stringify(appInfo);
        vm.$http.post(interfaceUrl + url, data, {emulateJSON: true}).then(function (response) {
            if (response.data.code == 1000) {
                func(response.data.data);
            } else if (response.data.code == 4000) {
                layer.open({
                    content: response.data.message,
                    btn: '确定',
                    shadeClose: false
                });
            } else if (response.data.code == 5000) {
                if (typeof (err) == "undefined") {
                    layer.open({
                        content: response.data.message,
                        btn: '确定',
                        shadeClose: false
                    });
                } else {
                    err(response.data.message);
                }
            } else if (response.data.code == 5001 || response.data.code == 5002 || response.data.code == 99991200) {
                if (vm.judgeVersion(201)) {
                    vm.apiErrorCodeProcess(response.data.code, response.data.message);
                } else {
                    layer.open({
                        content: response.data.message,
                        btn: '确定',
                        shadeClose: false
                    });
                }
            } else if (response.data.code == 6000) {
                vm.goLogin(pageID);
            }
        }, function (data, status, request) {
            window.location.href = "protocol://android?code=brokenNetwork";
        });
    };
    Vue.prototype.myCollection = function (vm, business) {
        let data = {
            userID: userInfo.userID,
            buildingID: userInfo.buildingID,
            businessID: business.businessID
        };

        if (business.isCollection == 0) {
            vm.postData(vm, "/live/addBusinessCollection", data, function (resData) {
                vm.item = resData;
                business.isCollection = 1;
                toast('收藏成功');
            });
        } else if (business.isCollection == 1) {
            vm.postData(vm, "/live/cancelBusinessCollection", data, function (resData) {
                vm.item = resData;
                business.isCollection = 0;
                toast('取消收藏');
            });
        }
    };
    Vue.prototype.callPhone = function (phoneCode) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.callPhone(phoneCode);
        }
    };
    Vue.prototype.orderPay = function (orderID, orderCode, orderMoney, orderType) {
        let json = {"orderID": orderID, "orderCode": orderCode, "orderMoney": orderMoney, "orderType": orderType};
        window.location.href = "protocol://android?code=orderPay&data=" + JSON.stringify(json);
    };
    Vue.prototype.goMycoupons = function () {
        window.location.href = "protocol://android?code=goMycoupons";
    };
    Vue.prototype.addAddress = function () {
        window.location.href = "protocol://android?code=addAddress";
    };
    Vue.prototype.editAddress = function (address) {
        event.stopPropagation();
        let json = {"addressID": address.addressID};
        window.location.href = "protocol://android?code=editAddress&data=" + JSON.stringify(json);
    };
    Vue.prototype.filterEmoji = function (emojireg) {
        let ranges = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;

        emojireg = emojireg.replace(ranges, '');

        return emojireg;
    };
    Vue.prototype.goCouponsNote = function () {
        window.location.href = "protocol://android?code=goNativeCouponsNote";
    };
    Vue.prototype.goLogin = function (pageID) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            if (pageID) {
                H5CallNativieUtils.goLogin(pageID);
            } else {
                H5CallNativieUtils.goLogin();
            }
        }
    };
    Vue.prototype.choicePhoto = function () {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.callPicture();
        }
    };
    Vue.prototype.needRefreshData = function (plateID) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.needRefreshData(plateID);
        }
    }
    Vue.prototype.goBack = function () {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.goBack();
        }
    }
    Vue.prototype.goNativeModule = function (moduleCode) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.goNativeModule(moduleCode);
        }
    }
    Vue.prototype.goBulletinDetail = function (bulletinID) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.goBulletinDetail(bulletinID);
        }
    }
    Vue.prototype.setNativeNotRefresh = function () {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.setNativeNotRefresh();
        }
    }
    Vue.prototype.callMapNavigation = function (longitude, latitude) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.callMapNavigation(longitude, latitude);
        }
    }
    Vue.prototype.onActionEvent = function (actionID, actionType, parameterType, parameterId) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.onActionEvent(actionID, actionType, '', '', parameterType, parameterId);
        }
    }
    Vue.prototype.onExposureEvent = function (screenNo, plateID, moduleType, moduleID, moduleName, modulePosition) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.onExposureEvent(screenNo, plateID, moduleType, moduleID, moduleName, modulePosition);
        }
    }
    Vue.prototype.shareBuildingDetail = function (buildingInfo) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.shareBuildingDetail(buildingInfo);
        }
    }
    Vue.prototype.shareBuildingPurchase = function (buildingInfo) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.shareBuildingPurchase(buildingInfo);
        }
    }
    Vue.prototype.shareSpeakingDetail = function (speakingInfo) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.shareSpeakingDetail(speakingInfo);
        }
    }
    //status:0->true 1->false
    Vue.prototype.disableAttentionEidt = function (status) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.disableAttentionEidt(status);
        }
    }
    //imageList->picture url,currentIndex->current picture index,start 1
    Vue.prototype.showBigPicture = function (imageList, currentIndex) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.showBigPicture(imageList, currentIndex);
        }
    }
    Vue.prototype.showBuildingBigPicture = function (buildingID, imageType, currentIndex) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.showBuildingBigPicture(buildingID, imageType, currentIndex);
        }
    }
    Vue.prototype.showBuildingAlbum = function (buildingID) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.showBuildingAlbum(buildingID);
        }
    }
    Vue.prototype.showHuxingBigPicture = function (huxingList, currentIndex) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.showHuxingBigPicture(huxingList, currentIndex);
        }
    }
    Vue.prototype.goVillageComment = function (buildingID) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.goVillageComment(buildingID);
        }
    }
    Vue.prototype.closeTopNavigation = function () {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.closeTopNavigation();
        }
    }
    Vue.prototype.openTopNavigation = function () {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.openTopNavigation();
        }
    }
    //status:0->true 1->false
    Vue.prototype.disableSpeakingPublish = function (status) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.disableSpeakingPublish(status);
        }
    }
    Vue.prototype.saveAttentionEdit = function () {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.saveAttentionEdit();
        }
    };
    Vue.prototype.openBullet = function (pageID) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.openBullet(pageID);
        }
    };
    Vue.prototype.closeWindow = function (pageID) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            if (typeof (H5CallNativieUtils.closeWindow) != "undefined") {
                H5CallNativieUtils.closeWindow(pageID);
            }
        }
    }
    Vue.prototype.goOrderDetail = function (orderID, orderType) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.goOrderDetail(orderID, orderType);
        }
    };
    Vue.prototype.scrollGetData = function (func) {
        window.addEventListener("scroll", function () {
            let scrollTop = $(this).scrollTop();
            let scrollHeight = $(document).height();
            let windowHeight = $(window).height();
            if (scrollTop + windowHeight === scrollHeight) {
                func();
            }
        })
    };
    Vue.filter("formatDecimal", function (value) {
        let f = parseFloat(value);
        if (isNaN(f)) {
            return "";
        }
        return "￥" + f;
        // let f = Math.round(value * 100) / 100;
        // let s = f.toString();
        // let rs = s.indexOf('.');
        // if (rs < 0) {
        //     rs = s.length;
        //     s += '.';
        // }
        // while (s.length <= rs + 2) {
        //     s += '0';
        // }
        // return "￥" + s;
    });
    Vue.filter("spliceActivity", function (activities) {
        let activityDesc = "";
        if (activities) {
            activities.forEach(function (activity, index) {
                if (index == activities.length - 1) {
                    activityDesc += activity.desc;
                } else {
                    activityDesc += activity.desc + ',';
                }
            });
        }

        return activityDesc;
    });
    Vue.filter("formatMention", function (mentionDate) {
        let datetime = new Date(mentionDate);
        let month = datetime.getMonth() + 1 + '月';
        let date = datetime.getDate() + '日';
        return month + date;
    });
    Vue.prototype.bannerImage = function () {
        let image = $(event.target);
        let maxWidth = $(document).width();

        let imgheight = 0;
        if (image.width() > maxWidth) {
            imgheight = image.height() / (image.width() / maxWidth);
        } else {
            imgheight = image.height() * (maxWidth / image.width());
        }

        image.css("height", imgheight + 'px');
    }
    Vue.prototype.speakingImage = function (cloumnNum) {
        let image = $(event.target);
        let maxWidth = image.closest("span").width();
        let imgInitWidth = image.width();
        let imgInitHeight = image.height();

        image.closest("span").css("width", imgInitWidth);
        image.closest("span").css("height", imgInitWidth);
        image.closest("span").css("overflow", "hidden");
        image.closest("span").css("float", "left");
        image.closest("span").css("position", "relative");

        image.closest("div").css("overflow", "hidden");

        let marginright = (image.closest("div").width() - imgInitWidth * cloumnNum - 4) / (cloumnNum - 1);

        if (image.closest("span").next().length > 0) {
            image.closest("span").css("margin-right", marginright);
        }

        let imgheight = 0;

        if (imgInitWidth > maxWidth) {
            imgheight = imgInitHeight / (imgInitWidth / maxWidth);
        } else {
            imgheight = imgInitHeight * (maxWidth / imgInitWidth);
        }

        if (imgheight < imgInitWidth) {
            let imgwidth = imgInitWidth * (imgInitWidth / imgheight);
            image.css("width", imgwidth);
            image.css("height", parseInt(imgInitWidth));
            image.css("margin-left", -(imgwidth - imgInitWidth) / 2);
        } else {
            image.css("margin-top", -(imgheight - imgInitWidth) / 2);
            image.css("width", imgInitWidth);
            image.css("height", parseInt(imgheight));
        }

        image.closest("span").css("vertical-align", "top");
    }
    Vue.prototype.publishImage = function (isAdd) {
        if (isAdd == 1) {
            let cloumnNum = 3;
            let image = $(event.target);
            let maxWidth = image.parent().width();
            let imgInitWidth = image.width();
            let imgInitHeight = image.height();

            image.parent().css("width", imgInitWidth);
            image.parent().css("height", imgInitWidth);
            image.parent().css("overflow", "hidden");
            image.parent().css("float", "left");
            image.parent().css("position", "relative");

            image.closest("ul").css("overflow", "hidden");

            let marginright = (image.closest("ul").width() - imgInitWidth * cloumnNum) / (cloumnNum - 1);

            image.parent().next("li.wetianjia").height(imgInitWidth);
            image.parent().next("li.wetianjia").find("span").css("margin-top", imgInitWidth / 2 - image.parent().next("li.wetianjia").find("span").height() / 2);

            if (image.parent().next().length > 0) {
                image.parent().css("margin-right", marginright);
            }

            let imgheight = 0;

            if (imgInitWidth > maxWidth) {
                imgheight = imgInitHeight / (imgInitWidth / maxWidth);
            } else {
                imgheight = imgInitHeight * (maxWidth / imgInitWidth);
            }

            if (imgheight < imgInitWidth) {
                let imgwidth = imgInitWidth * (imgInitWidth / imgheight);
                image.css("width", imgwidth);
                image.css("height", parseInt(imgInitWidth));
                image.css("margin-left", -(imgwidth - imgInitWidth) / 2);
            } else {
                image.css("margin-top", -(imgheight - imgInitWidth) / 2);
                image.css("width", imgInitWidth);
                image.css("height", parseInt(imgheight));
            }

            image.parent().css("vertical-align", "top");
        }
    }
    Vue.prototype.initPublishImage = function () {
        let imgInitWidth = $("ul.image-list > li").width();
        $("ul.image-list > li").css("height", imgInitWidth);
        let marginright = ($("ul.image-list").width() - imgInitWidth * 3 - 4) / 2;
        $("ul.image-list > li").css("margin-right", marginright);

        $("ul.image-list > li.wetianjia").height(imgInitWidth);
        $("ul.image-list > li.wetianjia").find("span").css("margin-top", imgInitWidth / 2 - $("ul.image-list > li.wetianjia").find("span").height() / 2);
    }
    Vue.prototype.dealUploadImage = function (fileInput, maxLength) {
        let fileArray = [];
        let imgURL = null;
        if (fileInput && fileInput.files) {
            for (let i = 0; i < fileInput.files.length; i++) {
                if (i >= maxLength) {
                    break;
                }

                try {
                    let file = null;
                    if (fileInput.files[i]) {
                        file = fileInput.files[i];
                    } else if (fileInput.files.item(i)) {
                        file = fileInput.files.item(i);
                    }
                    //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
                    try {
                        //Firefox7.0
                        imgURL = file.getAsDataURL();
                    } catch (e) {
                        //Firefox8.0以上
                        imgURL = window.URL.createObjectURL(file);
                    }
                } catch (e) { //这里不知道怎么处理了，如果是遨游的话会报这个异常
                    //支持html5的浏览器,比如高版本的firefox、chrome、ie10
                    if (fileInput.files[i]) {
                        let reader = new FileReader();
                        reader.onload = function (e) {
                            imgURL = e.target.result;
                        };
                        reader.readAsDataURL(fileInput.files[i]);
                    }
                }

                //判断文件大小
                let fileSize = file.size / 1024;

                fileArray.push({file: file, imageUrl: imgURL, fileName: file.name, fileSize: fileSize});
            }
            //哈奇 fanbinchun 修改
            fileInput.value = "";
            return fileArray;
        }
    }
    Vue.prototype.compressImage = function (fileArray, compressImageArray) {
        for (let i = 0; i < fileArray.length; i++) {
            let file = fileArray[i].file;

            let qualityParam = 0.4;
            if (fileArray[i].fileSize > 300) {
                qualityParam = 0.4;
            } else {
                qualityParam = 1;
            }

            //压缩
            (function (index) {
                lrz(file, {
                    quality: qualityParam //设置压缩参数
                }).then(function (rst) {
                    /* 处理成功后执行 */
                    compressImageArray.push({"sort": index, "imgbase64": rst.base64});
                }).catch(function (err) {
                    /* 处理失败后执行 */
                }).always(function () {
                    /* 必然执行 */
                });
            }(i))
        }
    }
    Vue.prototype.addLoading = function () {
        $("div.loadingdiv").css("visibility", "visible");
    }
    Vue.prototype.closeLoading = function () {
        $("div.loadingdiv").css("visibility", "hidden");
    }
    Vue.prototype.isNativeComment = function () {
        if (userInfo.appVersion) {
            let version = userInfo.appVersion.replace('.', '');
            version = version.replace('.', '');

            if (!isNaN(version)) {
                if (parseInt(version) > 200) {
                    return true;
                }
            }
        }

        return false;
    }
    Vue.prototype.judgeVersion = function (appVerson) {
        if (userInfo.appVersion) {
            let version = userInfo.appVersion.replace('.', '');
            version = version.replace('.', '');

            if (!isNaN(version)) {
                if (parseInt(version) > appVerson) {
                    return true;
                }
            }

            return false;
        }

        return false;
    }
    Vue.prototype.goHomeIndex = function (type) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.goHomeIndex(type);
        }
    }
    Vue.prototype.apiErrorCodeProcess = function (code, message) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.apiErrorCodeProcess(code, message);
        }
    }
    Vue.prototype.showImage = function (defaultImage, imageUrl) {
        if (Number(userInfo.isShowDefault) !== 1 && imageUrl) {
            return imageUrl
        }
        return defaultImage;
    }
    Vue.prototype.shareSortMethod = function (method) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.shareSortMethod(method);
        }
    }
    Vue.prototype.shareBuinessCollection = function (businessID, isCollection) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.shareBuinessCollection(businessID, isCollection);
        }
    }
    Vue.prototype.shareProductDetail = function (shareTitle, shareImage, shareUrl) {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.shareProductDetail(shareTitle, shareImage, shareUrl);
        }
    }
    Vue.prototype.openH5ShoppingCart = function () {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.openShoppingCart();
        }
    }
    Vue.prototype.closeH5ShoppingCart = function () {
        if (typeof (H5CallNativieUtils) != "undefined") {
            H5CallNativieUtils.closeShoppingCart();
        }
    }

    function imgError(element) {
        $(element).attr("src", imageList.defaultavatar);
    }

    //  2019年4月16日16:39:41  请求加密,h5call方法
    /**
     * @json:ajax请求后端的参数
     * @mid:mid
     * @timestamp
     * */
    Vue.prototype.encryption = function (data, mid, timestamp) {
        //  json我的参数  mid timeStamp
        if (typeof (H5CallNativieUtils) !== "undefined") {
            //  json: {auth:'md5'}
            // alert('有H5CallNativieUtils.encryption这个方法：'+!!H5CallNativieUtils.encryption);
            // alert('传递的第一个参数是' + JSON.stringify(data));
            return JSON.parse(H5CallNativieUtils.encryption(jsonFiltrate(data), mid, timestamp));
        }
        return {};
    };

    //  通过stringify的原生api进行筛选,排除 null ,'' ,undefined
    function jsonFiltrate(data) {
        return JSON.stringify(data, function (key, value) {
            if (value === null || value === '') {
                return undefined;
            }
            return value;
        })
    }

    //  2019年4月29日15:23:12  为了一些老接口,比如activityIndex.html里面的ajax,他的回调数据和新项目的code值不一样,所以无法封装到Vue.prototype.getData/postData里
    Vue.prototype.activityGetData = function (vm, url, data, func) {

        enhanceData(vm, data);
        // alert(JSON.stringify(data));
        vm.$http.get(interfaceUrl + url, data).then(function (response) {
            func(response.data);
        }, function (data, status, request) {
            window.location.href = "protocol://android?code=brokenNetwork";
        });
    };
    Vue.prototype.activityPostData = function (vm, url, data, func, err, pageID) {

        data.currentBuildingID = userInfo.buildingID;
        enhanceData(vm, data);
        // alert(JSON.stringify(data));
        let appInfo = {
            "mid": userInfo.mid,
            "imei": userInfo.imei,
            "ip": userInfo.ip,
            "app_version": userInfo.appVersion,
            "phone_model_id": userInfo.phoneModelId,
            "channel_id": userInfo.channelId,
            "channel_name": userInfo.channelName
        };

        // data.jsonData = JSON.stringify(appInfo);
        vm.$http.post(interfaceUrl + url, data, {emulateJSON: true}).then(function (response) {
            func(response.data);
        }, function (data, status, request) {
            window.location.href = "protocol://android?code=brokenNetwork";
        });
    };

    //  2019年5月13日16:26:20  补充的方法
    function toast2(content) {
        layer.open({
            content: content,
            btn: "确定",
            shadeClose: false
        })
    }

    //首页导航隐藏
//flag（int:0不显示，1显示）
    function setNavigationVisible(flag) {
        if (uploadflag == 1) {
            let json = {"flag": flag};
            window.location.href = "protocol://android?code=setNavigationVisible&data=" + JSON.stringify(json);
        }
    }

    Vue.filter("priceFormat", function (value) {
        if (value === undefined || value === null) {
            return '';
        }
        value = value * 1000;
        value = Math.round(value);
        value = value / 1000;
        return "￥" + value;
    });
}

export {
    commonInit
}