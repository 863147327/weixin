
const KEY = 'GOODS'
// 取出本地之前的信息
const getLocalGoods = () => {
  return wx.getStorageSync(KEY) || {}
}

const addGoods = goods => {
  // console.log(goods)
  // 取出本地之前存储的商品信息
  const localGoods = getLocalGoods()
  // 新增商品的信息
  if (localGoods[goods.goods_id]) {
    localGoods[goods.goods_id] += goods.goods_number
  } else {
    localGoods[goods.goods_id] = goods.goods_number
  }
  // 保存好回去
  wx.setStorageSync(KEY, localGoods)
}

const updateGoods = goods => {
  // console.log(goods)
  const localGoods = getLocalGoods()
  localGoods[goods.goods_id] = goods.goods_number
  // 保存回去
  wx.setStorageSync(KEY, localGoods)
}

// 删除商品
const deleteGoods = goods_id => {
  const localGoods = getLocalGoods()
  delete localGoods[goods_id]
  wx.setStorageSync(KEY, localGoods)
}

// 按需导出
export {
  addGoods,
  getLocalGoods,
  updateGoods,
  deleteGoods
}
