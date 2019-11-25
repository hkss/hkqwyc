import * as types from './mutation-types'
const mutations = {
  // 是否登录
  [types.SET_ISLOGIN](state, islogin) {
    state.islogin = islogin
  },
  // 信息管理
  [types.SET_BEDMANAGER](state, bedmanager) {
    state.bedmanager = bedmanager
  },
  // 账户管理
  [types.SET_ACCOUNT](state, account) {
    state.account = account
  },
  // 订单管理
  [types.SET_ORDER_STATE](state, orderState) {
    state.orderState = orderState
  },
   // 订单
   [types.SET_ORDER](state, order) {
     state.order = order
   },
  // 使用说明
  [types.SET_DIRECTIONS](state, beddirections) {
    state.beddirections = beddirections
  }, 
  //选择医院 
  [types.SET_HOSPITAL](state, hospital) {
    state.hospital = hospital
  },
  //选择日期
  [types.SET_DATE_TIME](state, dateTime) {
    state.dateTime = dateTime
  },
   //结果
   [types.SET_RESULT_TYPE](state, resultType) {
     state.resultType = resultType
   }


}

export default mutations
