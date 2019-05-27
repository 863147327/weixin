<template>
    <div class="categories">
        <scroll-view :style="{height: height +'px'}" scroll-y class="categories-left">
            <view @click="toggleSelect(index)" :class="['categories-left-item',index===currentIndex?'categories-left-active':'']" v-for="(item,index) in categoryData" :key="item.cat_id">
                <text>{{item.cat_name}}</text>
            </view>
        </scroll-view>
        <scroll-view :style="{height: height +'px'}" scroll-y v-if="categoryData.length>0" class="categories-right">
            <view class="categories-right-item" v-for="(item,index) in categoryData[currentIndex].children" :key="item.cat_id">
                <view class="categories-right-item-title">{{item.cat_name}}</view>
                <view class="categories-right-item-body">
                    <view class="right-body-item" v-for="(it,i) in item.children" :key="it.cat_id">
                        <img :src="it.cat_icon" alt="">
                        <text>{{it.cat_name}}</text>
                    </view>
                </view>
            </view>
        </scroll-view>
    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      categoryData: [],
      height: 0,
      currentIndex: 0
    }
  },
  onLoad () {
    this.getCategoryDat()

    const {windowHeight} = wx.getSystemInfoSync()
    this.height = windowHeight - 10
  },
  methods: {
    async getCategoryDat () {
      const res = await this.$axios.get('categories')
      this.categoryData = res.data.message
    },
    toggleSelect (index) {
      this.currentIndex = index
    }
  }
}
</script>

<style lang="less">
    .categories {
        display: flex;
        margin-top: 10px;
        &-left {
            width: 200rpx;
            display: flex;
            flex-direction: column;
            // justify-content: center;
            align-items: center;
            background-color: #f4f4f4;
            &-item {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 200rpx;
                height: 100rpx;
                position: relative;
                color:#999;
            }
            &-active {
                background: #fff;
                color:#000;
                &::before {
                    position: absolute;
                    content: '';
                    background-color: #ff2d4a;
                    left: 0;
                    top: 10rpx;
                    width: 5px;
                    height: 80rpx;
                }
            }
        }
        &-right {
            flex: 1;
            background-color: white;
            &-item {
                &-title {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color:#666;
                    font-size: 14px;
                    &::before {
                        content: '/';
                        color: #eeeeee;
                        margin-right: 20rpx;
                    }

                    &::after {
                        content: '/';
                        color: #eeeeee;
                        margin-left: 20rpx;
                    }
                }
                &-body {
                    display: flex;
                    flex-wrap: wrap;
                }
            }
        }
    }
    image {
        width: 100rpx;
        height: 80rpx;
    }
    .right-body-item {
        height: 200rpx;
        width: 33.33333%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &-title{
            margin-top:5rpx;
            color:#666;
            font-size: 14px;
        }
    }
    text {
        font-size: 14px;
        color: #666
    }
</style>
