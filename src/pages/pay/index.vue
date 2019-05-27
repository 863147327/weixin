<template>
    <div>
        <!-- 1.收获地址选择 -->
        <view @click="chooseAddress" class="address">
            <view v-if="address" class="address-info">
                <view class="address-info-name-phone">
                    <view>
                        <text style="font-size:12px;">收货人：{{address.userName}}</text>
                    </view>
                    <view style="display:flex;align-items: center;">
                        <text style="margin-right:36rpx;font-size:12px;">{{address.telNumber}}</text>
                        <view class="iconfont-tap icon-jiantouyou"></view>
                    </view>
                </view>
                <view class="address-info-detail-info">
                    <text style="font-size:12px;">收货地址：{{address.detailAddress}}</text>
                </view>
            </view>
            <view v-else class="address-add">
                <text style="font-size:12px;">+ 新增地址</text>
            </view>
            <view class="address-pic">
                <image src="/static/img/cart_border@2x.png"/>
            </view>
        </view>

    </div>
</template>

<script>
  import chooseAddress from '../../mixins/chooseAddress'

  export default {
    mixins: [chooseAddress],
    name: 'index',
    data () {
      return {
        address: null // 是否有地址
      }
    },
    onLoad (options) {
      // 如果已经有地址了，就显示地址
      if (wx.getStorageSync('address')) {
        this.address = wx.getStorageSync('address')
      }
      console.log(options)
    }
  }
</script>

<style scoped lang="less">
    .address {
        height: 222rpx;
        background-color: #fff;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        &-info {
            display: flex;
            height: 160rpx;
            flex: 1;
            flex-direction: column;
            justify-content: space-around;
            &-name-phone {
                display: flex;
                justify-content: space-between;
                padding: 0rpx 30rpx;
            }
            &-detail-info {
                padding: 0rpx 30rpx;
            }
        }
        &-add {
            width: 360rpx;
            height: 88rpx;
            line-height: 88rpx;
            text-align: center;
            margin: 100px auto;
            color: #999;
            background-color: #f4f4f4;
        }
        &-pic {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 750rpx;
            height: 15rpx;
            image {
                width: 100%;
                height: 100%;
            }
        }
    }
    .iconfont-tap {
        font-family: 'iconfont' !important;
        font-size: 32rpx;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        min-width: 88rpx;
        min-height: 88rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon-jiantouyou {
        position: absolute;
        top: 32rpx;
        right: 0;
    }
    .icon-jiantouyou:before {
        font-size: 24rpx;
        color: #999;
        line-height: 1;
        width: 15rpx;
        height: 25rpx;
    }
    .order-list {
        background-color: #fff;
    }
    .product-item {
        display: flex;
        padding: 30rpx 20rpx;
        position: relative;
        &::after {
            content: '';
            position: absolute;
            left: 20rpx;
            right: 0;
            bottom: 0;
            border-bottom: 1rpx solid #ddd;
        }
        .product-left {
            width: 200rpx;
            height: 200rpx;
            background-color: #eee;
            margin-right: 26rpx;
            image {
                width: 100%;
                height: 100%;
            }
        }
        .product-right {
            width: 480rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            .product-name {
                height: 84rpx;
                font-size: 30rpx;
                line-height: 1.4;
                /* 多行文字隐藏省略号 */
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            &-price {
                text {
                    color: #ff2d4a;
                }
                &-symbol,
                &-decimal {
                    font-size: 28rpx;
                }
                &-integer {
                    font-size: 44rpx;
                }
            }
            &-num {
                position: absolute;
                right: 0;
                bottom: 0;
                letter-spacing: 2rpx;
                color: #999;
            }
        }
    }
    .order-total {
        background-color: #fff;
        margin-top: 20rpx;
        height: 300rpx;
        &-item {
            height: 80rpx;
            display: flex;
            align-items: center;
            padding: 0rpx 30rpx;
            justify-content: space-between;
            &-price {
                color: #ff2d4a;
            }
        }
    }
    .wxLogin {
        margin-top: 10rpx;
        width: 720rpx;
    }
    .wxPay {
        margin-top: 10rpx;
        margin-left: 15rpx;
        width: 720rpx;
        background-color: #00c000;
        display: flex;
        height: 80rpx;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 32rpx;
        border-radius: 5rpx;
    }
</style>
