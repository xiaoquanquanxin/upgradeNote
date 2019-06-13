<template>
	<div id="app">
		<!--购物车-->
		<div class="gwcView">
			<div id="gwc2" v-on:click="closeShoppingCart"
			     style="background-color:#000;opacity: 0.6; width:100%; height:100%; position:fixed; z-index:999;"></div>
			<div class="gwc_cart" style="position:fixed; bottom:0; left:0; z-index:1100; width:100%;">
				<div style="position:relative; float:left;">
					<div class="shopping_chart_tb ml10 cursor" v-if="shoppingcart.totalNumber > 0"
					     v-on:click="openShoppingCart()">
						<img v-bind:src="iconList.shoppingcarticon" style="width:18px;height:18px;">
					</div>
					<div class="shopping_chart_tb ml10 cursor bggrey" v-if="shoppingcart.totalNumber == 0">
						<img v-bind:src="iconList.shoppingcarticon" style="width:18px;height:18px;">
					</div>
					<span class="cartgoods_num" v-if="shoppingcart.totalNumber > 0">{{shoppingcart.totalNumber}}</span>
				</div>
				<div class="gwc_jt"></div>
				<div class="choice_goods">
					<div class="choicegoods_title adafont26">
						<div class="fl" v-on:click="checkAllShopCommodity()">
							<img class="checkImg"
							     v-bind:src="isAllSelected == 1?iconList.checkedicon:iconList.checkicon"> 全选
						</div>
						<div class="title_name">
							<span class="grey"
							      v-if="shoppingcart.selectedNum>0">(已选{{shoppingcart.selectedNum}}件)</span>
						</div>
						<div class="delete_btn" v-if="shoppingcart.totalNumber > 0" v-on:click="clearShoppingCart">清空
						</div>
					</div>
					<div class="plr10" style="width:100%;height:auto;max-height:300px;overflow-y:scroll;">
						<div class="goods_list" v-for="shopCommodity in shoppingcart.commodities">
							<div class="fl select_img" v-on:click="selectShopCommodity(shopCommodity)">
								<img class="checkImg"
								     v-bind:src="shopCommodity.isSelected == 1?iconList.checkedicon:iconList.checkicon">
							</div>
							<div class="goods_pic">
								<img v-bind:src="showImage(defaultList.rectangledefault,shopCommodity.commodityImage)">
							</div>
							<div class="goods_right" style="margin-left: 105px;">
								<div class="goods_name adafont24">{{shopCommodity.commodityName}}</div>
								<div>
									<div class="fl">
										<div class="font_orange fl adafont28" v-if="shopCommodity.discountedPrice > 0">
											{{shopCommodity.discountedPrice | formatDecimal}}
										</div>
										<div class="font_orange fl adafont28" v-else>{{shopCommodity.originalPrice |
											formatDecimal}}
										</div>
										<div class="adafont22 fl ml10" v-if="shopCommodity.discountedPrice > 0">
											<del>{{shopCommodity.originalPrice | formatDecimal}}</del>
										</div>
									</div>
									<div class="goods_num fr" v-if="business.isNormal==1">
										<a class="num_jian"
										   v-if="shopCommodity.commodityNumber > 0"
										   v-on:click="reduceShoppingCart(2,shopCommodity)"></a>
										<span class="goods_shuzi" v-if="shopCommodity.commodityNumber > 0">{{shopCommodity.commodityNumber}}</span>
										<a class="num_zeng"
										   v-on:click="addShoppingCart(2,shopCommodity,$event)"></a>
									</div>
									<div class="goods_num fr" v-else>
										<a class="num_jian"></a>
										<span class="goods_shuzi">{{shopCommodity.commodityNumber}}</span>
										<a class="num_zeng1"></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="ts_txt adafont26" v-if="shoppingcart.isActivity == 1&&shoppingcart.lessMoney>0">
						满{{shoppingcart.fullMoney}}减{{shoppingcart.giftMoney}}，还差{{shoppingcart.lessMoney}}元
					</div>
					<div class="ts_txt adafont26" v-if="shoppingcart.isActivity == 1&&shoppingcart.lessMoney==0">
						已满{{shoppingcart.fullMoney}}，结算减{{shoppingcart.giftMoney}}元
					</div>
					<div class="choicegoods_bottom">
						<div v-bind:class="{total_amount:true,labelEllipsis:true,adafont28:true,less_amout:business.isNormal==1 && shoppingcart.lessSendMoney > 0}">
							{{shoppingcart.totalMoney | priceFormat}}
						</div>
						<div class="business_zbtn" v-if="business.isNormal==1">
							<a v-if="shoppingcart.selectedNum==0" class="font_grey">去结算</a>
							<a class="font_grey labelEllipsis"
							   v-else-if="shoppingcart.lessSendMoney > 0" style="color:white;width: 181px;">还差
								{{shoppingcart.lessSendMoney | formatDecimal}} 起送</a>
							<a v-on:click="goSubmitOrder" v-else style="color:white;">去结算</a>
						</div>
						<div class="business_zbtn" v-else>
							<a class="font_grey" style="color:white;">去结算</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--商家商品标题-->
		<div class="business_top">
			<img v-bind:src="showImage(defaultList.rectangledefault,business.businessImage)" class="business_img">
			<div class="business_backgroud"></div>
			<div class="container-fluid business_content">
				<div class="h20"></div>
				<!-- <div class="topbtn_region">
					<div class="fl">
						<span class="back_btn bgdetail" v-on:click="goBack"></span>
					</div>
					<div class="fr">
						<span v-bind:class="{collection_btn:business.isCollection==0,collection_btn2:business.isCollection==1}" v-on:click="collection(business)"></span>
					</div>
				</div> -->
				<div class="business_price_box">
					<a v-bind:href="urlList.p030019 + '&id=' + business.businessID">
						<div class="business_pic75 fl">
							<img v-bind:src="showImage(defaultList.rectangledefault,business.businessImage)">
							<div class="bussinessbreak2" v-if="business.isNormal==0">商家休息中</div>
						</div>
						<div class="business_nr">
							<div class="business_name twoLine adafont34">{{business.businessName}}</div>
							<div class="business_type ">
								<div style="float:right;">
									<img src="../../static/images/white_go.png" width="9" height="16">
								</div>

								<!--有机器人配送-->
								<!--<span v-if="business.deliveryMethod=='3'" class="adafont22 delivery_spanR">机器人配送</span>-->
								<!--<span v-if="business.deliveryMethod=='2'" class="adafont22 delivery_span">到店自提</span>-->
								<!--<span v-if="business.deliveryMethod=='0' || business.deliveryMethod=='1'" class="adafont22 delivery_span">商家配送</span>-->
								<!--<span v-for="label in business.businessLabels " class="adafont20">{{label.labelName}}</span>-->

								<!--无机器人配送-->
								<span v-if="business.deliveryMethod=='2'" class="adafont22 delivery_span">到店自提</span>
								<span v-else class="adafont22 delivery_span">商家配送</span>
								<span v-for="label in business.businessLabels "
								      class="adafont20">{{label.labelName}}</span>
								<!--到这儿-->

							</div>
							<div class="business_start labelEllipsis">
								<span class="adafont20" v-if="business.sendMoney > 0">起送价 {{business.sendMoney | formatDecimal}}</span>
								<span class="adafont20" v-if="business.sendMoney > 0">|</span>
								<span class="adafont20" v-if="business.isFeeActivity == 0 &business.deliveryFee > 0">配送费 {{business.deliveryFee | formatDecimal}}</span>
								<span class="adafont20" v-if="business.isFeeActivity == 1">{{business.deliveryFeeActivity}}</span>
								<span class="adafont20" v-if="business.isFeeActivity == 0 & business.deliveryFee == 0">免运费</span>
							</div>
							<div class="full_cut clearfix" style="clear: both;"
							     v-if="business.activities&&business.activities.length>0">
								<span class="orange_bg20 fl adafont20">满减</span>
								<span class="fl ml10 labelEllipsis adafont20">{{business.activities | spliceActivity}}</span>
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
		<!--有商品的列表-->
		<div v-if="shows==true">
			<!--普通商品列表-->
			<div class="mt10 clearfix" style="margin-bottom: 50px;">
				<div class="business_mainmenu" v-if="business.commodityCategory && business.commodityCategory.length>0">
					<ul id="menu_category">
						<li style="padding:0;" v-bind:data-categoryid="category.categoryID"
						    v-bind:class="{'selected':index==0}" v-for="(category,index) in business.commodityCategory"
						    v-on:touchstart="changeCategoryTouch()" v-on:click="changeCategoryClick()">
							<a style="padding: 14px 0;" v-bind:href="'#'+category.categoryID" class="twoLine adafont28">{{category.categoryName}}</a>
						</li>
					</ul>
				</div>
				<div id="business_list" class="business_goods_box" v-on:scroll="business_list_scroll()"
				     v-bind:class="business.commodityCategory&&business.commodityCategory.length>0 ?'':'nomarginleft'">
					<div v-for="category in commodityList" ref="commodityList"
					     v-bind:data-categoryid="category.categoryID">
						<a v-bind:name="category.categoryID"></a>
						<div class="businessmenu_choice adafont24"
						     v-if="business.commodityCategory && business.commodityCategory.length>0">
							{{category.categoryName}}
						</div>
						<div class="content" style="margin-bottom: 10px;">
							<div class="plr10">
								<div class="goods_list" v-for="commodity in category.commodityArray"
								     v-on:click="getCategoryID(category.categoryID)">
									<!--实际的li-->
									<section
											v-on:click="locationTo(urlList.p030004 + '&id=' + commodity.commodityID + '&bid=' + business.businessID)"
											style="display: block;width: 100%;height: 100%;">
										<div class="goods_pic">
											<img v-bind:src="showImage(defaultList.rectangledefault,commodity.commodityImage)">
											<!--begin 购物车动画-->
											<!--<img class="img_fly" style="position:absolute; top:-1px; left:0px; z-index:-500;" v-bind:src="commodity.commodityImage">-->
											<!--end 购物车动画-->
										</div>
										<div class="goods_right">
											<div class="goods_name">
                                            <span v-bind:class="{labelTwoEllipsis:true,adafont28:true,singleSpe:commodity.isMoreSpe==0,moreSpe:commodity.isMoreSpe==1}"
                                                  v-if="commodity.isLimit==0||(commodity.isLimit==1&&commodity.limitNumber==0)">
                                                {{commodity.commodityName}}/{{commodity.commodityUnit}}
                                            </span>
												<span v-bind:class="{labelTwoEllipsis:true,adafont28:true,singleSpe:commodity.isMoreSpe==0,moreSpe:commodity.isMoreSpe==1}"
												      v-else>
                                                {{commodity.commodityName}}/{{commodity.commodityUnit}}(限购{{commodity.limitNumber}}{{commodity.commodityUnit}})
                                            </span>
												<!-- <span class="goods_label cursor adafont20" v-if="commodity.isMoreSpe">多规格</span> -->
											</div>
											<div style="overflow: hidden;">
												<div class="fl">
													<div class="font_orange adafont28"
													     v-if="commodity.discountedPrice > 0">
														{{commodity.discountedPrice | formatDecimal}}
													</div>
													<div class="font_orange adafont28" v-else>{{commodity.originalPrice
														| formatDecimal}}
													</div>
													<div class="adafont22" v-if="commodity.discountedPrice > 0">
														<del>{{commodity.originalPrice | formatDecimal}}</del>
													</div>
												</div>
												<!--这个business.isNormal是啥没搞清-->
												<div class="goods_num fr" v-on:click.stop v-if="business.isNormal == 1">
													<!--种类,是否可以直接加到购物车,这个可以-->
													<div v-if="commodity.isMoreSpe == 0">
														<a class="num_jian"
														   v-if="commodity.commodityNumber>0"
														   v-on:click="reduceShoppingCart(1,commodity)"></a>
														<span class="goods_shuzi" v-if="commodity.commodityNumber>0">{{commodity.commodityNumber}}</span>
														<!--begin 购物车动画-->
														<a class="num_zeng"
														   v-on:click="addShoppingCart(1,commodity,$event)"></a>
														<!--end 购物车动画-->
													</div>
													<!--种类,是否可以直接加到购物车,这个不可以,需要打开规格限定框-->
													<div v-else>
														<a class="num_jian"
														   v-on:click="tooltipClick" data-toggle="tooltip"
														   data-trigger="click" data-placement="top"
														   title="多规格商品只能去购物车删除" v-if="commodity.commodityNumber>0"></a>
														<span class="goods_shuzi" v-if="commodity.commodityNumber>0">{{commodity.commodityNumber}}</span>
														<a class="num_zeng"
														   v-on:click="openMoreSpe(commodity,$event)"></a>
													</div>
												</div>
												<div class="goods_num fr" v-on:click.stop v-else>
													<a class="num_jian"
													   v-if="commodity.commodityNumber>0"></a>
													<span class="goods_shuzi" v-if="commodity.commodityNumber>0">{{commodity.commodityNumber}}</span>
													<a class="num_zeng1"></a>
												</div>
											</div>
										</div>
									</section>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--底部固定的购物车和结算那一行-->
			<div class="business_bottom">
				<div style="position:relative; float:left;">
					<div class="shopping_chart_tb ml10 cursor" v-if="shoppingcart.totalNumber > 0"
					     v-on:click="openShoppingCart()">
						<img v-bind:src="iconList.shoppingcarticon" style="width:18px;height:18px;">
					</div>
					<div class="shopping_chart_tb ml10 cursor bggrey" v-if="shoppingcart.totalNumber == 0">
						<img v-bind:src="iconList.shoppingcarticon" style="width:18px;height:18px;">
					</div>
					<span class="cartgoods_num" v-if="shoppingcart.totalNumber > 0">{{shoppingcart.totalNumber}}</span>
				</div>
				<div v-bind:class="{total_amount:true,labelEllipsis:true,adafont28:true,less_amout:business.isNormal==1 && shoppingcart.lessSendMoney > 0}"
				     v-if="shoppingcart.totalNumber > 0">{{shoppingcart.totalMoney | priceFormat}}
				</div>
				<div class="total_amount nocommodity" v-else>未选购商品</div>
				<div class="business_zbtn" v-if="business.isNormal==1">
					<a v-if="shoppingcart.selectedNum==0" class="font_grey">去结算</a>
					<a class="font_grey labelEllipsis"
					   v-else-if="shoppingcart.totalNumber > 0 && shoppingcart.lessSendMoney > 0"
					   style="color:white;width:181px;">还差 {{shoppingcart.lessSendMoney |formatDecimal}} 起送</a>
					<a v-on:click="goSubmitOrder"
					   v-else-if="shoppingcart.totalNumber > 0 && shoppingcart.lessSendMoney == 0 "
					   style="color:white;">去结算</a>
					<a class="font_grey" v-else-if="shoppingcart.totalNumber == 0"
					   style="color:white;">去结算</a>
				</div>
				<div class="business_zbtn" v-else>
					<a class="font_grey" style="color:white;">去结算</a>
				</div>
			</div>
			<!--小球-->
			<div class="ball-container">
				<div v-for="(ball,index) in balls">
					<!--用了两种方式的动画,css和js钩子-->
					<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
						<!--外层动画-->
						<div class="ball" v-show="ball.show" v-bind:data-index="index">
							<!--内层动画-->
							<div class="inner inner-hook"></div>
						</div>
					</transition>
				</div>
			</div>
			<!--限购-->
			<div id="moreSpeModal" class="modal fade" tabindex="-1" role="dialog">
				<div class="modal-dialog moreSpeModal" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" style="outline: none;" data-dismiss="modal"
							        aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 class="modal-title fontcenter adafont28"
							    v-if="currentCommodity.isLimit==0||(currentCommodity.isLimit==1&&currentCommodity.limitNumber==0)">
								{{currentCommodity.commodityName}}/{{currentCommodity.commodityUnit}}
							</h4>
							<h4 class="modal-title fontcenter adafont28" v-else>
								{{currentCommodity.commodityName}}/{{currentCommodity.commodityUnit}}(限购{{currentCommodity.limitNumber}}{{currentCommodity.commodityUnit}})
							</h4>
						</div>
						<div class="modal-body spepadding">
							<div class="tanchukuang_title2 adafont24">{{currentCommodity.speCategory}}</div>
							<div class="tanchukuang_fenlei">
								<a id="spe" class="cursor"
								   v-for="(specification,index) in currentCommodity.specifications">
									<label class="activeSpe adafont26" for="spe"
									       v-if="specification.specificationStock>0"
									       v-on:click="changeSpecification(specification)">{{specification.specificationName}}</label>
									<label class="noActiveSpe adafont26" for="spe" v-else>{{specification.specificationName}}</label>
								</a>
							</div>
						</div>
						<div class="modal-footer">
							<div class="tanchukuang_bottom">
								<div class="tanchukuang_bottom_but cursor" v-on:click="confirmSpecification($event)">
									确定
								</div>
								<div class="tanchukuang_bottom_left" v-if="currentSpecification.specificationStock > 0">
									<span class="font_orange adafont28"
									      v-if="currentSpecification.specificationdisPrice>0">{{currentSpecification.specificationdisPrice | formatDecimal}}</span>
									<span class="font_orange adafont28" v-else>{{currentSpecification.specificationPrice | formatDecimal}}</span>
									<span class="font22 adafont24" v-if="currentSpecification.specificationdisPrice>0">
                                        <del>{{currentSpecification.specificationPrice | formatDecimal}}</del>
                                    </span>
								</div>
								<div class="tanchukuang_bottom_left" v-else></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--没有商品-->
		<div v-if="shows==false" style="margin-top: 10px;">
			<div class="search-empty">
				<span class="ico-search-empty"></span>
				<span class="text adafont26">暂无商品!</span>
			</div>
		</div>
		<!--2019年4月9日17:50:04 自定义小球,上面的transition被屏蔽-->
		<div class="my-ball-container" ref="my-ball-container">

		</div>
	</div>
</template>

<script>
	let bbbb ;
	import iii from  './BusinessTop'
    common.commonInit();
    console.log($);
    let isAndroid = (function () {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        if (isAndroid) {
            return 'isAndroid';
        }
    }());
    let $myBallContainer = $('.my-ball-container');
    export default {
        name: 'BusinessTop',
        data() {
            return {
                urlList: configuration.pageList,
                iconList: configuration.imageList,
                defaultList: configuration.defaultImageList,
                business: {},
                eventT: "",
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
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false}
                ],
                dropBalls: [],
                shows: true,


                //  2019年3月15日14:12:21  点击列表更正左侧列表的current
                currentId: 0,

                //  2019年3月18日14:31:52  左侧列表控制右侧列表
                menu_category_finish: true,    //左侧列表点击完成
                //  2019年3月18日16:51:42  检测滚动完成的定时器
                scrollEndTimer: null,
                isScrollEnd: true,          //  滚动是否已完成?

                //  2019年4月8日14:10:19   请求节流
                isClicked: true,
            }
        },
        mounted: function () {//页面加载之后自动调用，常用于页面渲染
            this.$nextTick(function () {//在2.0版本中，加mounted的$nextTick方法，才能使用vm
                this.cartView();
            });
            $myBallContainer = $(this.$refs['my-ball-container']);
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
                let _this = this;

                if (shopCommodity.isSelected == 0) {
                    _this.selectedCommodities.push({
                        commodityID: shopCommodity.commodityID,
                        specificationID: shopCommodity.specificationID
                    });
                    if (shopCommodity.discountedPrice <= 0) {
                        _this.shoppingcart.totalMoney += shopCommodity.originalPrice * shopCommodity.commodityNumber;
                    } else {
                        _this.shoppingcart.totalMoney += shopCommodity.discountedPrice * shopCommodity.commodityNumber;
                    }

                    _this.shoppingcart.selectedNum += shopCommodity.commodityNumber;
                    shopCommodity.isSelected = 1;
                } else {
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
                    } else {
                        _this.shoppingcart.totalMoney -= shopCommodity.discountedPrice * shopCommodity.commodityNumber;
                    }
                    shopCommodity.isSelected = 0;
                }

                if (_this.shoppingcart.selectedNum == _this.shoppingcart.totalNumber) {
                    _this.isAllSelected = 1;
                } else {
                    _this.isAllSelected = 0;
                }
            },
            checkAllShopCommodity: function () {
                let _this = this;
                if (_this.isAllSelected == 0) {
                    _this.isAllSelected = 1;
                    _this.shoppingcart.selectedNum = _this.shoppingcart.totalNumber;
                } else {
                    _this.isAllSelected = 0;
                    _this.shoppingcart.selectedNum = 0;
                }

                _this.selectedCommodities = [];
                _this.shoppingcart.totalMoney = 0;

                _this.shoppingcart.commodities.forEach(function (currentCommodity, index) {
                    currentCommodity.isSelected = _this.isAllSelected;

                    if (currentCommodity.isSelected == 1) {
                        _this.selectedCommodities.push({
                            commodityID: currentCommodity.commodityID,
                            specificationID: currentCommodity.specificationID
                        });

                        if (currentCommodity.discountedPrice <= 0) {
                            _this.shoppingcart.totalMoney += currentCommodity.originalPrice * currentCommodity.commodityNumber;
                        } else {
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
                let _this = this;
                _this.setNativeNotRefresh();
                let data = {
                    businessID: _this.getQueryString("id")
                };
                _this.getData(_this, "/live/getCommodityCategory", data, postDataFn);

                function postDataFn(resData) {
                    _this.$nextTick(function () {
                        _this.business = resData;
                        document.title = _this.business.businessName;

                        _this.shareBuinessCollection(data.businessID, _this.business.isCollection);

                        if (_this.business.isNormal == 0) {
                            toast2("商家休息中，暂时不接受订单")
                        }
                        _this.getShoppingCart();
                        if (resData.commodityCategory && resData.commodityCategory.length > 0) {
                            _this.getCommodityByCategory(resData.commodityCategory[0], 0);
                        } else {
                            _this.getCommodity(0);
                        }
                        //  2019年3月18日17:52:08
                        _this.computed_menu_height();
                    })
                };
            },
            getCommodity: function (pageIndex) {
                let _this = this;
                let data = {
                    businessID: _this.getQueryString("id"),
                    pageIndex: pageIndex
                };
                _this.getData(_this, "/live/getCommoditiesByCategory", data, function (resData) {
                    if (pageIndex === 0) {
                        _this.commodityList.push({categoryID: "", categoryName: "", commodityArray: resData});
                        if (!(resData && resData.length > 0)) {
                            _this.shows = false
                        }
                    } else {
                        if (resData && resData.length > 0) {
                            if (_this.commodityList.length > 0) {
                                resData.forEach(function (item, index) {
                                    _this.commodityList[0].commodityArray.push(item);
                                });
                            }
                        }
                    }
                    if (resData && resData.length >= 20) {
                        _this.getCommodity(pageIndex + 1);
                    }
                });
            },
            //  根据左侧列表项的id,请求右侧的详情
            getCommodityByCategory: function (category, pageIndex) {
                this.currentCategory = category;
                let _this = this;
                let data = {
                    businessID: _this.getQueryString("id"),
                    categoryID: category.categoryID,
                    pageIndex: pageIndex
                };
                //  monk    list    hook


                function getDataFn(resData) {
                    if (resData && resData.length > 0) {
                        if (pageIndex === 0) {
                            _this.commodityList.push({
                                categoryID: category.categoryID,
                                categoryName: category.categoryName,
                                commodityArray: resData
                            });
                        } else {
                            _this.commodityList[_this.commodityList.length - 1].commodityArray = _this.commodityList[_this.commodityList.length - 1].commodityArray.concat(resData)
                        }
                        //  当前页没有更多数据
                        console.log(resData.length)
                        if (resData.length < 20) {
                            _this.getNextCategory();
                        } else {
                            _this.getCommodityByCategory(category, pageIndex + 1)
                        }
                    } else {
                        //  todo    无法确认,这是单列,20条是否会限制??
                        _this.getNextCategory();
                    }

                };
                _this.getData(_this, "/live/getCommoditiesByCategory", data, getDataFn);
            },
            //  请求完右侧的详情,继续请求下一个左侧项的右侧详情,只做逻辑判断
            getNextCategory: function () {
                let _this = this;
                let nextIndex = 0;
                _this.business.commodityCategory.forEach(function (category, index) {
                    if (category == _this.currentCategory) {
                        nextIndex = index;
                    }
                });
                if (nextIndex < _this.business.commodityCategory.length) {
                    if (_this.business.commodityCategory[nextIndex + 1]) {
                        _this.getCommodityByCategory(_this.business.commodityCategory[nextIndex + 1], 0);
                    }
                }
            },
            /**
             * 为了左右两个块分别滑动
             * **/
            //  左侧touch事件
            changeCategoryTouch: function () {
                if (this.isScrollEnd) {
                    return;
                }
                this.changeCategoryEvent(true);
            },
            //  左侧click事件
            changeCategoryClick: function () {
                if (!this.isScrollEnd) {
                    return;
                }
                window.location.replace(event.target.href);
                event.preventDefault();
                this.changeCategoryEvent();
            },
            //  左侧点击以后,出发的样式
            changeCategoryEvent: function (isTouch) {
                let $target = $(event.target);
                this.menu_category_finish = false;
                $('#business_list').css({'overflow-y': 'hidden'});
                let _this = this;
                setTimeout(function () {
                    $("#menu_category > li.selected").removeClass("selected");
                    $target.closest("li").addClass("selected");
                    setTimeout(function () {
                        _this.menu_category_finish = true;
                        $('#business_list').css({'overflow-y': 'auto'});
                        if (isTouch) {
                            _this.isScrollEnd = true;
                            $target[0].click();
                        }
                    }, 10);
                }, 10)
            },

            /**
             * 多规格框
             * */
            //  打开多规格选择框
            openMoreSpe: function (commodity, event) {
                if (this.currentCommodity == commodity) {
                    $("#moreSpeModal .tanchukuang_fenlei a > label.activeSpe:eq(0)").click();
                } else {
                    this.isFirstSpe = 1;
                    this.currentCommodity = commodity;
                }
                this.eventT = event;
                $("#moreSpeModal").modal('show');
            },
            //  更换商品规格?
            changeSpecification: function (specification) {
                $("#moreSpeModal .tanchukuang_fenlei a.active").removeClass("active");
                $(event.target).closest("a").addClass("active");

                this.currentSpecification = specification;
            },
            //  规格框确定按钮
            confirmSpecification: function (event) {
                let _this = this;

                $("#moreSpeModal").modal('hide');

                _this.currentCommodity.currentSpeID = _this.currentSpecification.specificationID;

                _this.addShoppingCart(1, _this.currentCommodity, _this.eventT);
            },

            /**
             * 购物车
             * */
            //  获取刷新来的 购物车的数据
            getShoppingCart: function () {
                let _this = this;
                let data = {
                    businessID: _this.getQueryString("id")
                };



                function getDataFn(resData) {
                    _this.$nextTick(function () {
                        _this.dealShoppingSelect(resData);
                        if (_this.shoppingcart.totalNumber == 0) {
                            _this.closeShoppingCart();
                        }
                    })
                }

                _this.getData(_this, "/live/getShoppingCart", data, getDataFn);
            },
            //  更新购物车里的逻辑
            dealShoppingSelect: function (resData) {
                let _this = this;
                if (_this.isFirstShopping == 1) {
                    if (resData.commodities) {
                        resData.commodities.forEach(function (commodity, index) {
                            _this.selectedCommodities.push({
                                commodityID: commodity.commodityID,
                                specificationID: commodity.specificationID
                            });
                            commodity.isSelected = 1;
                        });
                    }
                    _this.shoppingcart = resData;
                    _this.shoppingcart.selectedNum = _this.shoppingcart.totalNumber;
                    _this.isFirstShopping = 0;
                } else {
                    let totalNum = resData.totalNumber;
                    resData.commodities.forEach(function (commodity, index) {
                        let isExist = 0;
                        _this.selectedCommodities.forEach(function (selectedCommodity, index) {
                            if (selectedCommodity.commodityID == commodity.commodityID &&
                                selectedCommodity.specificationID == commodity.specificationID) {
                                isExist = 1;
                            }
                        });
                        if (isExist == 0) {
                            if (commodity.discountedPrice <= 0) {
                                resData.totalMoney -= commodity.originalPrice * commodity.commodityNumber;
                            } else {
                                resData.totalMoney -= commodity.discountedPrice * commodity.commodityNumber;
                            }

                            totalNum -= commodity.commodityNumber;
                            commodity.isSelected = 0;
                        } else {
                            commodity.isSelected = 1;
                        }
                    });
                    _this.shoppingcart = resData;
                    _this.shoppingcart.selectedNum = totalNum;
                }


                //  2019年3月20日13:52:25
                this.commodityList.forEach(function (value) {
                    value.commodityArray.forEach(function (t, i) {
                        t.commodityNumber = 0;
                        resData.commodities.forEach(function (c) {
                            if (t.commodityID === c.commodityID) {
                                t.commodityNumber += c.commodityNumber;
                            }
                        })

                    })
                });


                if (resData.isChange == 1) {
                    toast2("购物车内商品发生变化，请核实后下单");
                }
            },
            //  打开购物车
            openShoppingCart: function () {
                let _this = this;

                let data = {
                    businessID: _this.getQueryString("id")
                };

                _this.getData(_this, "/live/getShoppingCart", data, function (resData) {
                    _this.dealShoppingSelect(resData);
                });

                // bengin 显示购物车后图片遮盖闪烁问题。
                $("#gwc2").fadeIn("3000");
                $(".gwc_cart").fadeIn("3000");
                // end 显示购物车后图片遮盖闪烁问题。
                _this.openH5ShoppingCart();

                //  静止页面滚动
                $('#business_list').addClass('overflow-hidden');
                $('#menu_category').addClass('overflow-hidden');
            },
            //  关闭购物车
            closeShoppingCart: function () {
                // bengin 显示购物车后图片遮盖闪烁问题。
                $("#gwc2").fadeOut("3000");
                $(".gwc_cart").fadeOut("3000");
                // end 显示购物车后图片遮盖闪烁问题。
                this.closeH5ShoppingCart();

                //  解放滑动
                $('#business_list').removeClass('overflow-hidden');
                $('#menu_category').removeClass('overflow-hidden');
            },

            /**
             * 主列表
             * **/
            //  添加商品
            addShoppingCart: function (type, commodity, event) {
                let _this = this;

                let data = {
                    businessID: _this.getQueryString("id"),
                    commodityID: commodity.commodityID,
                    specificationID: type == 1 ? commodity.currentSpeID : commodity.specificationID
                };
                //  请求节流
                if (!_this.isClicked) {
                    return
                }
                _this.isClicked = false;
                _this.postData(_this, "/live/addShoppingCart", data, function (resData) {
                    _this.shoppingcart.totalMoney = resData.totalMoney;
                    _this.shoppingcart.totalNumber = resData.commodityNumber;
                    commodity.commodityNumber += 1;

                    //  可以下一次点击了
                    _this.isClicked = true;

                    if (type == 2) {
                        _this.addCommodityNum(commodity);
                        _this.drop(event.target);
                        //调用动画
                    } else {
                        _this.drop(event.target);
                        //调用动画

                        if (_this.selectedCommodities.length == 0) {
                            _this.selectedCommodities.push({
                                commodityID: commodity.commodityID,
                                specificationID: data.specificationID
                            });
                        } else {
                            let isExist = 0;
                            _this.selectedCommodities.forEach(function (selectedCommodity, index) {
                                if (selectedCommodity.commodityID == commodity.commodityID &&
                                    selectedCommodity.specificationID == data.specificationID) {
                                    isExist = 1;
                                }
                            });

                            if (isExist == 0) {
                                _this.selectedCommodities.push({
                                    commodityID: commodity.commodityID,
                                    specificationID: data.specificationID
                                });
                            }
                        }
                    }
                    _this.getShoppingCart();
                }, function (message) {
                    //  可以下一次点击了
                    _this.isClicked = true;
                    layer.open({
                        content: message,
                        btn: '确定',
                        shadeClose: false
                    });
                });
            },
            addCommodityNum: function (commodity) {
                let _this = this;

                _this.commodityList.forEach(function (category, tindex) {
                    category.commodityArray.forEach(function (currentCommodity, index) {
                        if (currentCommodity.commodityID == commodity.commodityID) {
                            if (currentCommodity.isMoreSpe == 1) {
                                currentCommodity.commodityNumber += 1;
                            } else {
                                currentCommodity.commodityNumber = commodity.commodityNumber;
                            }
                        }
                    });
                });
            },
            //  减少商品
            reduceShoppingCart: function (type, commodity) {
                let _this = this;

                let data = {
                    businessID: _this.getQueryString("id"),
                    commodityID: commodity.commodityID,
                    specificationID: type == 1 ? commodity.currentSpeID : commodity.specificationID
                };
                //  请求节流
                if (!_this.isClicked) {
                    return
                }
                _this.isClicked = false;

                _this.postData(_this, "/live/reduceShoppingCart", data, function (resData) {
                    _this.shoppingcart.totalMoney = resData.totalMoney;
                    _this.shoppingcart.totalNumber = resData.commodityNumber;
                    commodity.commodityNumber -= 1;

                    //  可以下一次点击了
                    _this.isClicked = true;

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
                }, function (message) {
                    //  可以下一次点击了
                    _this.isClicked = true;
                    layer.open({
                        content: message,
                        btn: '确定',
                        shadeClose: false
                    });
                });
            },
            reduceCommodityNum: function (commodity) {
                let _this = this;

                _this.commodityList.forEach(function (category, tindex) {
                    category.commodityArray.forEach(function (currentCommodity, index) {
                        if (currentCommodity.commodityID == commodity.commodityID) {
                            if (currentCommodity.isMoreSpe == 1) {
                                currentCommodity.commodityNumber -= 1;
                            } else {
                                currentCommodity.commodityNumber = commodity.commodityNumber;
                            }
                        }
                    });
                });
            },
            //  清空购物车
            clearShoppingCart: function () {
                let _this = this;

                layer.open({
                    content: '确定要清空购物车？',
                    btn: ['确定', '取消'],
                    time: 0, //2秒后自动关闭
                    yes: function (index) {
                        let data = {
                            businessID: _this.getQueryString("id")
                        };

                        _this.postData(_this, "/live/emptiedShoppingCart", data, function (resData) {
                            _this.shoppingcart.totalMoney = 0;
                            _this.shoppingcart.totalNumber = 0;
                            _this.selectedCommodities = [];

                            for (let commodity in _this.commodityList) {
                                for (let index in _this.commodityList[commodity].commodityArray) {
                                    _this.commodityList[commodity].commodityArray[index].commodityNumber = 0;
                                }
                            }

                            _this.closeShoppingCart();
                        });

                        layer.close(index);
                    }
                });
            },
            //  去结算
            goSubmitOrder: function () {
                let _this = this;
                let commodity = userInfo.userID + new Date().getTime();
                sessionStorage.setItem(commodity, JSON.stringify(_this.selectedCommodities));
                location.href = _this.urlList.p030005 + '&isgobuy=0&id=' + _this.business.businessID + "&commodity=" + encodeURI(commodity);
            },
            //小球动画
            beforeDrop: function (el) {
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect();
                        let x = rect.left - 32;
                        let y = -(window.innerHeight - rect.top - 22);
                        el.style.display = '';
                        el.style.webkitTransform = 'translateY(' + y + 'px)';  //translateY
                        el.style.transform = 'translateY(' + y + 'px)';
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = 'translateX(' + x + 'px)';
                        inner.style.transform = 'translateX(' + x + 'px)';
                    }
                }
            },
            dropping: function (el, done) {
                let rf = el.offsetHeight;
                this.$nextTick(function () {
                    el.style.webkitTransform = 'translate3d(0,0,0)';
                    el.style.transform = 'translate3d(0,0,0)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0,0,0)';
                    inner.style.transform = 'translate3d(0,0,0)';
                    el.addEventListener('transitionend', done);
                });
            },
            afterDrop: function (el) {
                let ball = this.dropBalls.shift();
                if (ball) {
                    ball.show = false;
                    el.style.display = 'none';
                }
            },
            //小球动画-end

            //  从详情页返回到本页
            backRefash: function () {
                this.isFirstShopping = 1;
                this.getShoppingCart();
            },
            //  点击列表更正左侧列表的current id
            getCategoryID: function (id) {
                this.currentId = id;
            },

            //  滚动列表
            business_list_scroll: function (boolean) {
                let $menu_category = $('#menu_category');
                if (!this.menu_category_finish) {
                    return
                }
                let etscrollTop = event.target.scrollTop;
                let mcoffsetTop = $menu_category.offset().top;
                let mcscrollTop = $menu_category.scrollTop();

                let isOk = false;
                let selectedHeight = $('.selected').height();
                event.stopPropagation();
                this.$refs.commodityList.slice().reverse().forEach(function (t, i) {
                    if (t.offsetTop - mcoffsetTop <= etscrollTop) {
                        if (isOk) {
                            return false;
                        }
                        isOk = true;
                        $menu_category.find("li.selected").removeClass("selected");
                        let $menu_category_li = $menu_category.find('[data-categoryid=' + t.getAttribute('data-categoryid') + ']');
                        let $selected = $menu_category_li.closest("li").addClass("selected");
                        let sotop = $selected.offset().top;

                        let diffY1 = sotop - mcoffsetTop + selectedHeight - $menu_category.height();

                        if (diffY1 >= 0) {
                            $menu_category.scrollTop(mcscrollTop + diffY1)
                        } else if (sotop - mcoffsetTop <= 0) {
                            $menu_category.scrollTop(mcscrollTop + sotop - mcoffsetTop)
                        }
                    }
                });

                if (this.scrollEndTimer) {
                    clearTimeout(this.scrollEndTimer);
                }
                let _this = this;
                this.scrollEndTimer = setTimeout(function () {
                    //  滚动完成是点击事件
                    _this.isScrollEnd = true;
                    _this.scrollEndTimer = null;
                }, 50);
                //  滚动未完成是touch事件
                this.isScrollEnd = false
            },

            //  计算
            computed_menu_height: function () {
                this.$nextTick(function () {
                    let $menu_category = $('#menu_category');
                    let overflowHeight = window.innerHeight - $('#menu_category').offset().top - $('.business_bottom').height() - 8;
                    $menu_category.height(overflowHeight);
                    $menu_category.css({overflow: 'auto', '-webkit-overflow-scrolling': 'touch'});
                    let $business_list = $('#business_list');
                    $business_list.height(overflowHeight);
                    $business_list.css({overflow: 'auto', '-webkit-overflow-scrolling': 'touch'});
                })
            },

            //  跳转
            locationTo: function (url) {
                location.href = url;
            },


            //  测试功能
            toJSON: function (data) {
                return JSON.parse(JSON.stringify(data));
            },

            //  2019年4月9日17:48:18  小球
            drop: function (el) {
                let rect = el.getBoundingClientRect();
                let $horizontalBall = $('<div class="horizontal-ball"></div>');
                let $verticalBall = $('<div class="vertical-ball"></div>');
                $horizontalBall.append($verticalBall);
                $myBallContainer.append($horizontalBall);
                let time = 400;
                /*****
                 * version 1 ,top,left
                 * ****/
                //  兼容性良好，但性能较差
                //  ios采取的版本
                (function () {
                    if (isAndroid) {
                        return;
                    }
                    //  动态加载css
                    (function () {
                        if ($('#os').length) {
                            return;
                        }
                        let $os = $('<style>');
                        $os.attr('id', 'os');
                        $os.html(
                            '.my-ball-container .horizontal-ball {position: fixed;left: 32px;z-index: 200;}.my-ball-container .vertical-ball {width: 16px;height: 16px;border-radius: 50%;position: fixed;}'
                        );
                        $('head').append($os);
                    }());

                    let x = rect.left;
                    let y = (window.innerHeight - rect.top - 16);
                    //  水平移动
                    $horizontalBall.css({
                        left: x,
                    }).animate({left: 32}, time, 'easeInSine', function () {
                        $(this).remove();
                    });
                    //  垂直移动
                    $verticalBall.css({
                        bottom: y,
                    }).css({
                        background: 'RGB(223, 45, 31)',
                    }).animate({
                        bottom: 22,
                    }, time, 'easeInBack');
                }());


                //  他原来的小球，适用于Android
                let _this = this;
                (function () {
                    if (!isAndroid) {
                        return;
                    }
                    for (let i = 0; i < _this.balls.length; i++) {
                        let ball = _this.balls[i];
                        if (!ball.show) {
                            ball.show = true;
                            ball.el = el;
                            _this.dropBalls.push(ball);
                            return;
                        }
                    }
                }());
            }
        }
    }

    jQuery.easing['jswing'] = jQuery.easing['swing'];

    jQuery.extend(jQuery.easing, {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) {
            //alert(jQuery.easing.default);
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
    });
</script>

<style scoped>
	.select_img {
		margin: 9px 3px 5px 0px;
		display: inline-block;
	}

	.business_top {
		background-size: auto;
		position: relative;
		overflow: hidden;
		padding-bottom: 0;
	}

	/* bengin 顶部背景图灰度*/

	.business_img {
		display: block;
		position: absolute;
		width: 100%;
		filter: blur(35px) grayscale(90%);
		-webkit-filter: blur(35px) grayscale(90%);
	}

	/* end 顶部背景图灰度*/

	.business_backgroud {
		position: absolute;
		width: 100%;
		opacity: 0.3;
		background-color: #000;
	}

	.business_content {
		position: absolute;
		width: 100%;
	}

	.choice_goods {
		position: relative;
		height: auto;
	}

	.title_name > span:nth-child(1) {
		margin-right: 7px;
	}

	/*多规格*/

	.modal-header {
		padding-bottom: 0px;
		border: none;
	}

	.modal-footer {
		padding: 0px;
		text-align: inherit;
		border-top: none;
		background: #F8F8F8;
		border-radius: 0px 0px 6px 6px;
	}

	button.close:hover,
	button.close:active,
	button.close:focus {
		border: 0 !important;
	}

	/*小球动画*/

	.ball-container .ball {
		position: fixed;
		/*小球动画必须脱离html布局流*/
		left: 32px;
		bottom: 22px;
		z-index: 200;
		transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
	}

	.inner {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: RGB(223, 45, 31);
		transition: all 0.4s linear;
	}

	.search-empty {
		text-align: center;
		padding-top: 160px;
	}

	.empty_tip {
		font-size: 1.5rem;
		color: gray;
	}

	.ico-search-empty {
		display: block;
		margin: 0 auto 15px;
		width: 10rem;
		height: 10rem;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-position: center;
		background-image: url(../../static/images/icon/nodata.png);
		background-size: 100%;
	}

	.business_price_box {
		margin-top: 44px;
	}

	.delivery_span {
		border: none !important;
		background-color: #5F9CE0 !important;
		color: rgb(255, 255, 255);
	}

	.delivery_spanR {
		border: none !important;
		background-color: #df2d1f !important;
		color: rgb(255, 255, 255);
	}

	/*bug6759,底部跟着滑动*/
	.overflow-hidden {
		overflow: hidden !important;
	}
</style>