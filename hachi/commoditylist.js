var vm = new Vue({
    el: "#app",
    data: {
        urlList: pageList,
        iconList: imageList,
        defaultList: defaultImageList,
        business: {},
        commodityList: [],
        currentCommodity: {},
        currentSpecification: {},
        shoppingcart: {},
        currentCategory: {},
        pageIndex: 0,
        isFirstSpe: 1,
        click: 0,
        selectedCommodities: [],
        isFirstShopping: 1,
        isAllSelected: 1,
        balls: [
            { show: false },
            { show: false },
            { show: false },
            { show: false },
            { show: false }
        ],
        dropBalls: [],
        shows: true
    },
    created: function () {
        this.getUserInfo();
    },
    mounted: function () {//页面加载之后自动调用，常用于页面渲染
        this.$nextTick(function () {//在2.0版本中，加mounted的$nextTick方法，才能使用vm
            this.cartView();
        });
    },
    updated: function () {
        var _this = this;
        if (_this.isFirstSpe == 1) {
            _this.isFirstSpe = 0;
            $("#moreSpeModal .tanchukuang_fenlei a > label.activeSpe:eq(0)").click();
        }

        // bengin 顶部图片高度自适应
        $(".business_img").height($(".business_top").height());
        $(".business_backgroud").height($(".business_top").height());
        // end 顶部图片高度自适应
    },
    methods: {
        selectShopCommodity: function (shopCommodity) {
            var _this = this;

            if (shopCommodity.isSelected == 0) {
                _this.selectedCommodities.push({ commodityID: shopCommodity.commodityID, specificationID: shopCommodity.specificationID });
                if (shopCommodity.discountedPrice <= 0) {
                    _this.shoppingcart.totalMoney += shopCommodity.originalPrice * shopCommodity.commodityNumber;
                }
                else {
                    _this.shoppingcart.totalMoney += shopCommodity.discountedPrice * shopCommodity.commodityNumber;
                }

                _this.shoppingcart.selectedNum += shopCommodity.commodityNumber;
                shopCommodity.isSelected = 1;
            }
            else {
                _this.selectedCommodities.forEach(function (selectedCommodity, index) {
                    if (selectedCommodity.commodityID == shopCommodity.commodityID &&
                        selectedCommodity.specificationID == shopCommodity.specificationID) {
                        _this.selectedCommodities.splice(index, 1);
                        _this.shoppingcart.selectedNum -= shopCommodity.commodityNumber;
                        return false;
                    }
                });
                if (shopCommodity.discountedPrice <= 0) {
                    _this.shoppingcart.totalMoney -= shopCommodity.originalPrice * shopCommodity.commodityNumber;
                }
                else {
                    _this.shoppingcart.totalMoney -= shopCommodity.discountedPrice * shopCommodity.commodityNumber;
                }
                shopCommodity.isSelected = 0;
            }

            if (_this.shoppingcart.selectedNum == _this.shoppingcart.totalNumber) {
                _this.isAllSelected = 1;
            }
            else {
                _this.isAllSelected = 0;
            }
        },
        checkAllShopCommodity: function () {
            var _this = this;
            if (_this.isAllSelected == 0) {
                _this.isAllSelected = 1;
                _this.shoppingcart.selectedNum = _this.shoppingcart.totalNumber;
            }
            else {
                _this.isAllSelected = 0;
                _this.shoppingcart.selectedNum = 0;
            }

            _this.selectedCommodities = [];
            _this.shoppingcart.totalMoney = 0;

            _this.shoppingcart.commodities.forEach(function (currentCommodity, index) {
                currentCommodity.isSelected = _this.isAllSelected;

                if (currentCommodity.isSelected == 1) {
                    _this.selectedCommodities.push({ commodityID: currentCommodity.commodityID, specificationID: currentCommodity.specificationID });

                    if (currentCommodity.discountedPrice <= 0) {
                        _this.shoppingcart.totalMoney += currentCommodity.originalPrice * currentCommodity.commodityNumber;
                    }
                    else {
                        _this.shoppingcart.totalMoney += currentCommodity.discountedPrice * currentCommodity.commodityNumber;
                    }
                }
            });
        },
        tooltipClick: function () {
            this.click++;
            $(event.target).tooltip("show");
            setTimeout(function () {
                $('[data-toggle="tooltip"]').tooltip("hide");
            }, 3000)
        },
        cartView: function () {
            var _this = this;
            _this.setNativeNotRefresh();
            var data = {
                businessID: getQueryString("id")
            };
            _this.getData(_this, "/live/getCommodityCategory", data, function (resData) {
                _this.business = resData;
                document.title = _this.business.businessName;

                _this.shareBuinessCollection(data.businessID, _this.business.isCollection);

                if (_this.business.isNormal == 0) {
                    toast2("商家休息中，暂时不接受订单")
                }
                _this.getShoppingCart();
                if (resData.commodityCategory && resData.commodityCategory.length > 0) {
                    _this.getCommodityByCategory(resData.commodityCategory[0]);

                    _this.getCommodityByCategoryScroll();
                }
                else {
                    _this.getCommodity();

                    _this.getCommodityScroll();
                }
            });
        },
        getCommodity: function () {
            var _this = this;
            var data = {
                businessID: getQueryString("id"),
                pageIndex: 0
            };
            _this.getData(_this, "/live/getCommoditiesByCategory", data, function (resData) {
                _this.commodityList.push({ categoryID: "", categoryName: "", commodityArray: resData });
                if (!(resData && resData.length > 0)) {
                    _this.shows = false
                }
            });
        },
        getCommodityScroll: function () {
            var _this = this;

            _this.scrollGetData(function () {
                _this.pageIndex += 1;
                var data = {
                    businessID: getQueryString("id"),
                    pageIndex: _this.pageIndex
                };

                _this.getData(_this, "/live/getCommoditiesByCategory", data, function (resData) {
                    if (resData && resData.length > 0) {
                        if (_this.commodityList.length > 0) {
                            resData.forEach(function (commodity, index) {
                                _this.commodityList[0].commodityArray.push(commodity);
                            });
                        }
                    }
                });
            });
        },
        getCommodityByCategory: function (category) {
            this.currentCategory = category;
            var _this = this;
            var data = {
                businessID: getQueryString("id"),
                categoryID: category.categoryID,
                pageIndex: 0
            };
            _this.getData(_this, "/live/getCommoditiesByCategory", data, function (resData) {
                if (resData && resData.length > 0) {
                    _this.commodityList.push({ categoryID: category.categoryID, categoryName: category.categoryName, commodityArray: resData });
                    if (resData.length < 20) {
                        _this.getNextCategory();
                    }
                } else {
                    _this.getCommodityByCategoryScroll();
                }
            });
        },
        getCommodityByCategoryScroll: function () {
            var _this = this;

            _this.scrollGetData(function () {
                _this.pageIndex += 1;
                var data = {
                    businessID: getQueryString("id"),
                    categoryID: _this.currentCategory.categoryID,
                    pageIndex: _this.pageIndex
                };

                _this.getData(_this, "/live/getCommoditiesByCategory", data, function (resData) {
                    if (resData && resData.length > 0) {
                        _this.commodityList.forEach(function (category, tindex) {
                            if (category.categoryID == _this.currentCategory.categoryID) {
                                resData.forEach(function (commodity, index) {
                                    category.commodityArray.push(commodity);
                                });
                            }
                        });

                        if (resData.length < 20) {
                            _this.getNextCategory();
                        }
                    } else {
                        _this.getNextCategory();
                    }
                });
            });
        },
        getNextCategory: function () {
            var _this = this;
            var nextIndex = 0;
            _this.business.commodityCategory.forEach(function (category, index) {
                if (category == _this.currentCategory) {
                    nextIndex = index;
                }
            });
            if (nextIndex < _this.business.commodityCategory.length - 1) {
                _this.pageIndex = 0;
                _this.getCommodityByCategory(_this.business.commodityCategory[nextIndex + 1]);
            }
        },
        changeCategory: function (category) {
            this.pageIndex = 0;
            this.commodityList = [];
            // $("#categoryName").html(category.categoryName);
            $("#menu_category > li.selected").removeClass("selected");
            $(event.target).closest("li").addClass("selected");

            this.getCommodityByCategory(category);
        },
        collection: function (business) {
            var _this = this;

            _this.myCollection(_this, business);
        },
        openMoreSpe: function (commodity) {
            if (this.currentCommodity == commodity) {
                $("#moreSpeModal .tanchukuang_fenlei a > label.activeSpe:eq(0)").click();
            }
            else {
                this.isFirstSpe = 1;
                this.currentCommodity = commodity;
            }

            $("#moreSpeModal").modal('show');
        },
        changeSpecification: function (specification) {
            $("#moreSpeModal .tanchukuang_fenlei a.active").removeClass("active");
            $(event.target).closest("a").addClass("active");

            this.currentSpecification = specification;
        },
        confirmSpecification: function (event) {
            var _this = this;

            $("#moreSpeModal").modal('hide');

            _this.currentCommodity.currentSpeID = _this.currentSpecification.specificationID;

            _this.addShoppingCart(1, _this.currentCommodity, event);
        },
        getShoppingCart: function () {
            var _this = this;
            var data = {
                businessID: getQueryString("id")
            };

            _this.getData(_this, "/live/getShoppingCart", data, function (resData) {
                _this.dealShoppingSelect(resData);
                if (_this.shoppingcart.totalNumber == 0) {
                    _this.closeShoppingCart();
                }
            });
        },
        dealShoppingSelect: function (resData) {
            var _this = this;
            if (_this.isFirstShopping == 1) {
                if (resData.commodities) {
                    resData.commodities.forEach(function (commodity, index) {
                        _this.selectedCommodities.push({ commodityID: commodity.commodityID, specificationID: commodity.specificationID });
                        commodity.isSelected = 1;
                    });
                }
                _this.shoppingcart = resData;
                _this.shoppingcart.selectedNum = _this.shoppingcart.totalNumber;
                _this.isFirstShopping = 0;
            }
            else {
                var totalNum = resData.totalNumber;
                resData.commodities.forEach(function (commodity, index) {
                    var isExist = 0;
                    _this.selectedCommodities.forEach(function (selectedCommodity, index) {
                        if (selectedCommodity.commodityID == commodity.commodityID &&
                            selectedCommodity.specificationID == commodity.specificationID) {
                            isExist = 1;
                        }
                    });
                    if (isExist == 0) {
                        if (commodity.discountedPrice <= 0) {
                            resData.totalMoney -= commodity.originalPrice * commodity.commodityNumber;
                        }
                        else {
                            resData.totalMoney -= commodity.discountedPrice * commodity.commodityNumber;
                        }

                        totalNum -= commodity.commodityNumber;
                        commodity.isSelected = 0;
                    }
                    else {
                        commodity.isSelected = 1;
                    }
                });
                _this.shoppingcart = resData;
                _this.shoppingcart.selectedNum = totalNum;
            }

            if (resData.isChange == 1) {
                toast2("购物车内商品发生变化，请核实后下单");
            }
        },
        openShoppingCart: function () {
            var _this = this;

            var data = {
                businessID: getQueryString("id")
            };

            _this.getData(_this, "/live/getShoppingCart", data, function (resData) {
                _this.dealShoppingSelect(resData);
            });

            // bengin 显示购物车后图片遮盖闪烁问题。
            $("#gwc2").fadeIn("3000");
            $(".gwc_cart").fadeIn("3000");
            // end 显示购物车后图片遮盖闪烁问题。
            _this.openH5ShoppingCart();
        },
        closeShoppingCart: function () {
            // bengin 显示购物车后图片遮盖闪烁问题。           
            $("#gwc2").fadeOut("3000");
            $(".gwc_cart").fadeOut("3000");
            // end 显示购物车后图片遮盖闪烁问题。
            this.closeH5ShoppingCart();
        },
        addShoppingCart: function (type, commodity, event) {
            var _this = this;

            var data = {
                businessID: getQueryString("id"),
                commodityID: commodity.commodityID,
                specificationID: type == 1 ? commodity.currentSpeID : commodity.specificationID
            };
            _this.postData(_this, "/live/addShoppingCart", data, function (resData) {
                _this.shoppingcart.totalMoney = resData.totalMoney;
                _this.shoppingcart.totalNumber = resData.commodityNumber;
                commodity.commodityNumber += 1;
                if (type == 2) {
                    _this.addCommodityNum(commodity);
                    _this.drop(event.target);
                    //调用动画
                }
                else {
                    _this.drop(event.target);
                    //调用动画

                    if (_this.selectedCommodities.length == 0) {
                        _this.selectedCommodities.push({ commodityID: commodity.commodityID, specificationID: data.specificationID });
                    }
                    else {
                        var isExist = 0;
                        _this.selectedCommodities.forEach(function (selectedCommodity, index) {
                            if (selectedCommodity.commodityID == commodity.commodityID &&
                                selectedCommodity.specificationID == data.specificationID) {
                                isExist = 1;
                            }
                        });

                        if (isExist == 0) {
                            _this.selectedCommodities.push({ commodityID: commodity.commodityID, specificationID: data.specificationID });
                        }
                    }
                }
                _this.getShoppingCart();
            });
        },
        addCommodityNum: function (commodity) {
            var _this = this;

            _this.commodityList.forEach(function (category, tindex) {
                category.commodityArray.forEach(function (currentCommodity, index) {
                    if (currentCommodity.commodityID == commodity.commodityID) {
                        if (currentCommodity.isMoreSpe == 1) {
                            currentCommodity.commodityNumber += 1;
                        }
                        else {
                            currentCommodity.commodityNumber = commodity.commodityNumber;
                        }
                    }
                });
            });
        },
        reduceShoppingCart: function (type, commodity) {
            var _this = this;

            var data = {
                businessID: getQueryString("id"),
                commodityID: commodity.commodityID,
                specificationID: type == 1 ? commodity.currentSpeID : commodity.specificationID
            };

            _this.postData(_this, "/live/reduceShoppingCart", data, function (resData) {
                _this.shoppingcart.totalMoney = resData.totalMoney;
                _this.shoppingcart.totalNumber = resData.commodityNumber;
                commodity.commodityNumber -= 1;

                if (commodity.commodityNumber == 0) {
                    _this.selectedCommodities.forEach(function (selectedCommodity, index) {
                        if (selectedCommodity.commodityID == commodity.commodityID &&
                            selectedCommodity.specificationID == data.specificationID) {
                            _this.selectedCommodities.splice(index, 1);
                            return false;
                        }
                    });
                }

                if (type == 2) {
                    _this.reduceCommodityNum(commodity);
                }
                _this.getShoppingCart();
            });
        },
        reduceCommodityNum: function (commodity) {
            var _this = this;

            _this.commodityList.forEach(function (category, tindex) {
                category.commodityArray.forEach(function (currentCommodity, index) {
                    if (currentCommodity.commodityID == commodity.commodityID) {
                        if (currentCommodity.isMoreSpe == 1) {
                            currentCommodity.commodityNumber -= 1;
                        }
                        else {
                            currentCommodity.commodityNumber = commodity.commodityNumber;
                        }
                    }
                });
            });
        },
        clearShoppingCart: function () {
            var _this = this;

            layer.open({
                content: '确定要清空购物车？',
                btn: ['确定', '取消'],
                time: 0, //2秒后自动关闭
                yes: function (index) {
                    var data = {
                        businessID: getQueryString("id")
                    };

                    _this.postData(_this, "/live/emptiedShoppingCart", data, function (resData) {
                        _this.shoppingcart.totalMoney = 0;
                        _this.shoppingcart.totalNumber = 0;
                        _this.selectedCommodities = [];

                        for (var commodity in _this.commodityList) {
                            for (var index in _this.commodityList[commodity].commodityArray) {
                                _this.commodityList[commodity].commodityArray[index].commodityNumber = 0;
                            }
                        }

                        _this.closeShoppingCart();
                    });

                    layer.close(index);
                }
            });
        },
        goSubmitOrder: function () {
            var _this = this;
            var commodity = userInfo.userID + new Date().getTime();
            sessionStorage.setItem(commodity, JSON.stringify(_this.selectedCommodities));
            location.href = _this.urlList.p030005 + '&isgobuy=0&id=' + _this.business.businessID + "&commodity=" + encodeURI(commodity);
        },
        //小球动画
        drop: function (el) {
            for (var i = 0; i < this.balls.length; i++) {
                var ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        beforeDrop: function (el) {
            var count = this.balls.length;
            while (count--) {
                var ball = this.balls[count];
                if (ball.show) {
                    var rect = ball.el.getBoundingClientRect();
                    var x = rect.left - 32;
                    var y = -(window.innerHeight - rect.top - 22);
                    el.style.display = '';
                    el.style.webkitTransform = 'translateY(' + y + 'px)';  //translateY
                    el.style.transform = 'translateY(' + y + 'px)';
                    var inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translateX(' + x + 'px)';
                    inner.style.transform = 'translateX(' + x + 'px)';
                }
            }
        },
        dropping: function (el, done) {
            var rf = el.offsetHeight;
            this.$nextTick(function () {
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                var inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
                el.addEventListener('transitionend', done);
            });
        },
        afterDrop: function (el) {
            var ball = this.dropBalls.shift();
            if (ball) {
                ball.show = false;
                el.style.display = 'none';
            }
        }
        //小球动画-end
    }
});