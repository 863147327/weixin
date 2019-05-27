<template>
    <div>
        <swiper indicator-dots autoplay circular indicator-active-color="#fff">
            <block v-for="item in swiperData" :key="item.id">
                <navigator target="" :url="item.navigator_url" open-type="navigate">
                    <swiper-item>
                        <image mode="aspectFill" :src="item.image_src"></image>
                    </swiper-item>
                </navigator>
            </block>
        </swiper>
        <!-- 分类导航 -->
        <div class="categories">
            <div class="category-item" v-for="item in catitemsData" :key="item.name">
                <img :src="item.image_src">
            </div>
        </div>

        <!-- 楼层 -->
        <div class="floor">
            <div v-for="item in floordataData" :key="item.name">
                <div class="floor-head">
                    <img :src="item.floor_title.image_src" alt="">
                </div>
                <div class="floor-body">
                    <div class="floor-body-left">
                        <image :src="item.product_list[0].image_src"></image>
                    </div>
                    <div class="floor-body-right">
                        <div v-for="(it,i) in item.product_list" v-if="i>0" :key="it.name">
                            <image class="floor-body-right-img" :src="it.image_src" :style="{width: it.image_width+'rpx'}"></image>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--底部提示-->
        <div class="end-tips">
            <!--<span class="iconfont icon-xiao"></span>-->
            <span class="iconfont icon-xiaolian"></span>
            <span class="bottomline">我是有底线的哦~</span>
        </div>
        <!--回到顶部-->
        <div v-show="showToTop">
            <div @click="toTop" class="to-top">
                <image src="/static/img/arrow_top@2x.png" alt="" />
                <text>顶部</text>
            </div>
        </div>
    </div>

</template>

<script>
export default {
  data () {
    return {
      swiperData: null,
      catitemsData: null,
      floordataData: null,
      showToTop: false
    }
  },
  onPageScroll ({scrollTop}) {
    if (scrollTop > 80) {
      if (this.showToTop) return
      this.showToTop = true
    } else {
      if (!this.showToTop) return
      this.showToTop = false
    }
  },
  onLoad () {
    this.getSwiperData()
    this.getcategory()
    this.getfloordata()
  },
  methods: {
    async getSwiperData () {
      console.log('11')
      const res = await this.$axios.get('home/swiperdata')
      this.swiperData = res.data.message
      console.log(res)
      // this.swiperData = res.data.message
      // this.$axios
      //   .get('https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata')
      //   .then(res => {
      //     console.log(res.data)
      //   })
    },
    async getcategory () {
      const res = await this.$axios.get('home/catitems')
      this.catitemsData = res.data.message
    },
    async getfloordata () {
      const res = await this.$axios.get('home/floordata')
      this.floordataData = res.data.message
      console.log(this.$axios.ab)
    },
    toTop () {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    }
  }
}
</script>

<style lang="less">
  swiper {
    width: 750rpx;
    height: 400rpx;
    image {
      width: 750rpx;
      height: 400rpx;
    }
  }
  .categories {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #ffffff;
  height: 150rpx;
  .category-item {
    width: 120rpx;
    height: 120rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.floor {
  margin-top: 20rpx;
  background-color: white;
  &-head {
    width: 750rpx;
    height: 59rpx;
    image {
      margin: 10rpx 0rpx 0rpx 10rpx;
      width: 100%;
      height: 100%;
    }
  }
  &-body {
    display: flex;
    padding: 20rpx 16rpx 10rpx 16rpx;
    &-left {
      width: 232rpx;
      height: 386rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    &-right {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      &-img {
        height: 188rpx;
        margin: 0 0 10rpx 10rpx;
      }
    }
  }
}
.end-tips {
  display: flex;
  height: 100rpx;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #888;
  .bottomline {
    margin-left: 5rpx;
  }
}
.to-top {
  width: 90rpx;
  height: 90rpx;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  position: fixed;
  right: 40rpx;
  bottom: 50rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  image {
    width: 24rpx;
    height: 14rpx;
  }
  text {
    margin-top: 20rpx;
    color: #999;
  }
}
</style>
