const state = {
  // 是否登录
  islogin: [{
    state: false,
    user:{}
  }],
  account: [{
    balance:'',
    integral:'',
    vocation:''
  }],
  bedmanager: false,
  beddirections: false,
  orderState: true,
  order: {},
  hospital: '',
  dateTime: '',
  resultType: [{
    state: false
  }, {}],
}

export default state
