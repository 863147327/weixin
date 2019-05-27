<template>
    <div>
        <!--购物车提示-->
        <view class="empty-car" v-if="isEmpty">
            <image src="/static/img/kong.png"></image>
            <text class="empty-car-tips">购物车还是空的</text>
            <text class="empty-car-tips extra">快去逛逛吧~</text>
        </view>
        <view v-else>
            <!--头部-->
            <view class="shop-head">
                <view class="shop-head-info">
                    <view class="iconfont icon-shop flex-center icon-dianpu"></view>
                    <text class="shop-name">品优购生活馆</text>
                </view>
            </view>
            <!--列表-->
            <block v-for="(item,index) in goodsList" :key="item.goods_id">
                <view class="goods-item">
                    <!--左边选中的图标-->
                    <view @click="toggleSelect(item)" :class="['pubIcon',item.isSelect?'trueIcon':'falseIcon']"></view>
                    <!--中间的图片-->
                    <view class="goods-item-pic">
                        <image :src="item.goods_small_logo" />
                    </view>
                    <!-- 右边的商品信息 -->
                    <view class="goods-item-info">
                        <text class="goods-item-info-title">{{item.goods_name}}</text>
                        <text class="goods-item-info-price">￥{{item.goods_price}}</text>
                        <view class="goods-item-info-edit">
                            <view class="outer">
                                <view :style="{'color':item.goods_number == 1 ? '#ccc' : 'black'}" @click="substrict(item)">-</view>
                                <view class="value">
                                    <input
                                            style="font-size:12px;color:#999;"
                                            v-model="item.goods_number"
                                            @input="changeValue(item)"
                                            type="number"
                                    /></view>
                                <view @click="add(item)" class="add">+</view>
                            </view>
                            <text @click="deleteGood(item)">| 删除</text>
                        </view>
                    </view>
                </view>
            </block>
            <!-- 工具条 -->
            <view class="fixed-bar">
                <view @click="toggleAllSelect" class="allselect">
                    <!-- 左边选中的图标 -->
                    <view :class="['pubIcon',allSelected ? 'trueIcon' : 'falseIcon']"></view>
                    <text style="margin-left:10rpx;color:#999;">全选</text>
                </view>
                <view class="statistics">
                    <view>
                        <text>合计：</text>
                        <text style="color:#ff2d4a;font-size:30rpx;">￥{{totalPrice}}</text>
                    </view>
                    <view>
                        <text>包含运费</text>
                    </view>
                </view>
                <view @click="goToOrderAndPay" :class="['jiesuan',totalCount === 0 ? 'disabled':'']">
                    <text>去结算 ({{totalNumber}})</text>
                </view>
            </view>
        </view>
    </div>
</template>

<script>
  import { getLocalGoods, updateGoods, deleteGoods } from '../../common/cart'

  export default {
    name: 'home',
    data () {
      return {
        isEmpty: true, // 判断是否有数据
        allSelected: true, // 全选
        goodsList: [] // 商品列表
      }
    },
    onShow () {
      this.getGoodsListData()
    },
    computed: {
      // 计算总价钱
      totalPrice () {
        // 声明一个总价钱
        let totalPrice = 0
        this.goodsList.forEach(item => {
          if (item.isSelect) {
            totalPrice += item.goods_number * item.goods_price
          }
        })
        return totalPrice
      },
      // 计算总数量
      totalNumber () {
        // 声明一个总数量
        let totalNumber = 0
        this.goodsList.forEach(item => {
          if (item.isSelect) {
            totalNumber += +item.goods_number
          }
        })
        return totalNumber
      }
    },
    methods: {
      async getGoodsListData () {
        // console.log('1111')
        // 获取本地的商品数据
        const localGoods = getLocalGoods()
        // 获取可枚举的属性字符串数组
        const ids = Object.keys(localGoods)
        if (ids.length === 0) {
          this.isEmpty = true
          return
        }
        // console.log(ids)
        this.isEmpty = false
        // 发送请求
        const res = await this.$axios.get(`goods/goodslist?goods_ids=${ids.join(',')}`)
        // 处理好数据再赋值
        // console.log(res)
        res.data.message.forEach(item => {
          item.goods_number = localGoods[item.goods_id]
          item.isSelect = true
        })

        this.goodsList = res.data.message
      },
      // 全选和反选
      toggleAllSelect () {
        this.allSelected = !this.allSelected
        this.goodsList.forEach(item => {
          item.isSelect = this.allSelected
        })
      },
      // 选择反选
      toggleSelect (item) {
        item.isSelect = !item.isSelect
        // 实现全选
        let allSelected = true
        this.goodsList.some(item => {
          if (!item.isSelect) {
            allSelected = false
            return true
          }
        })
        this.allSelected = allSelected
      },
      // 商品数量减
      substrict (item) {
        if (item.goods_number <= 1) return
        item.goods_number--
        updateGoods(item)
      },
      // 商品数量加
      add (item) {
        item.goods_number++
        updateGoods(item)
      },
      // 商品删除
      deleteGood (item) {
        wx.showModal({
          title: '提示', // 提示的标题,
          content: '是否删除该商品', // 提示的内容,
          showCancel: true, // 是否显示取消按钮,
          cancelText: '取消', // 取消按钮的文字，默认为取消，最多 4 个字符,
          cancelColor: '#000000', // 取消按钮的文字颜色,
          confirmText: '确定', // 确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: '#ff2d4a', // 确定按钮的文字颜色,
          success: res => {
            // console.log(res)
            if (res.confirm) {
              // 找到goodslist里面对应的数据下标
              const deleteIndex = this.goodsList.findIndex(val => val.goods_id === item.goods_id)
              // 使用数据分割方法
              this.goodsList.splice(deleteIndex, 1)
              // 删除本地的数据
              deleteGoods(item.goods_id)
              // 判断是否还要显示数据'
              this.isEmpty = this.goodsList.length === 0
            }
          }
        })
        // wx.showModal({
        //   title: '提示',
        //   content: '这是一个模态弹窗',
        //   success(res) {
        //     if (res.confirm) {
        //       console.log('用户点击确定')
        //     } else if (res.cancel) {
        //       console.log('用户点击取消')
        //     }
        //   }
        // })
      },
      // 输入商品数量规则
      changeValue (item) {
        if (item.goods_number) {
          // 取整
          item.goods_number = parseInt(item.goods_number)
          // 判断是否小于等于0
          if (item.goods_number <= 0) {
            item.goods_number = 1
          }
          updateGoods(item)
        }
      },
      // 取到支付页面
      goToOrderAndPay () {
        // 获取所有选中的商品,把id存入数组ids
        const ids = []
        // 遍历goodslist
        this.goodsList.forEach(item => {
          if (item.isSelect) {
            ids.push(item.goods_id)
          }
        })
        // 判断选中的数量
        if (ids.length === 0) {
          wx.showToast({
            title: '请选择商品进行结算',
            icon: 'none',
            duration: 2000,
            mask: true,
            success: () => {}
          })
          return
        }
        wx.navigateTo({
          url: `/pages/pay/main?ids=` + ids.join(',')
        })
      }
    }
  }
</script>

<style lang="less">
    @PADDING-LEFT: 20rpx;
    .empty-car {
        display: flex;
        flex-direction: column;
        height: 500rpx;
        justify-content: center;
        align-items: center;

        image {
            width: 125rpx;
            height: 124rpx;
        }

        &-tips {
            margin-top: 30rpx;
            font-size: 28rpx;
            color: #666;
        }
    }

    .extra {
        font-size: 24rpx;
        color: #999;
    }

    .shop-head {
        background-color: #fff;
        height: 88rpx;
        display: flex;
        align-items: center;
        padding: 0 @PADDING-LEFT;
        border-bottom: 1px solid #ddd;

        &-info {
            display: flex;
            align-items: center;

            .shop-name {
                margin-left: 10rpx;
            }
        }
    }

    .goods-item {
        height: 220rpx;
        background-color: #fff;
        display: flex;
        align-items: center;
        padding-left: @PADDING-LEFT;
        border-bottom: 1px solid #eee;

        &-pic {
            width: 160rpx;
            height: 160rpx;
            margin-left: 10rpx;
            border: 1px solid #ddd;
            padding: 10rpx;
            border-radius: 5rpx;

            image {
                width: 100%;
                height: 100%;
            }
        }

        &-info {
            flex: 1;
            height: 180rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 0rpx @PADDING-LEFT;

            &-title {
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }

            &-price {
                color: #ff2d4a;
                font-size: 30rpx;
            }

            &-edit {
                display: flex;
                justify-content: space-between;

                .outer {
                    border: 1px solid #ddd;
                    display: flex;
                    align-items: center;
                    border-radius: 5rpx;

                    view {
                        height: 50rpx;
                        width: 50rpx;
                        line-height: 50rpx;
                        text-align: center;
                    }

                    .value {
                        width: 65rpx;
                        border-left: 1px solid #ddd;
                    }

                    .add {
                        border-left: 1px solid #ddd;
                    }
                }
            }
        }
    }

    .pubIcon {
        background: url(https://mcart.jiuxian.com/statics/images/cart/catIcon.png)
        no-repeat 0 0;
        background-size: 300rpx 300rpx;
        width: 55rpx;
        height: 55rpx;
    }

    .trueIcon {
        background-position: 0 -225rpx;
    }
    .falseIcon {
        background-position: -50rpx -225rpx;
    }

    .fixed-bar {
        display: flex;
        height: 98rpx;
        width: 750rpx;
        background-color: #fff;
        position: fixed;
        left: 0;
        bottom: 0;

        .allselect {
            padding-left: @PADDING-LEFT;
            width: 200rpx;
            height: 98rpx;
            display: flex;
            align-items: center;
        }

        .statistics {
            flex: 1;
            display: flex;
            // align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        .jiesuan {
            width: 200rpx;
            height: 98rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ff2d4a;

            text {
                color: #fff;
            }
        }

        .disabled {
            background-color: #ddd;
        }
    }
</style>
