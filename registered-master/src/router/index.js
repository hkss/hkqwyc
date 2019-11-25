import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import search from '@/components/search'
import my from '@/components/my'
import home from '@/components/home'
import login from '@/components/login'
import help from '@/components/help'
import readMe from '@/components/readMe'
import myRecrd from '@/components/myRecrd'
import recordList from '@/components/recordList'
import room from '@/components/room'
import guahao from '@/components/guahao'
import appoiSure from '@/components/appoiSure'
import zhenR from '@/components/zhenR'
import addZhenR from '@/components/addZhenR'
import guahaoRes from '@/components/guahaoRes'
import oderDet from '@/components/oderDet'
import myMsgList from '@/components/myMsgList'
import msgDet from '@/components/msgDet'
import myRepotList from '@/components/myRepotList'
import reportDet from '@/components/reportDet'
import gaiQ from '@/components/gaiQ'
import balance from '@/components/balance'
import person from '@/components/person'
import setting from '@/components/setting'
import integral from '@/components/integral'
import rules from '@/components/rules'
import editPhone from '@/components/editPhone'
import eaditPwd from '@/components/eaditPwd'
import feedback from '@/components/feedback'
import about from '@/components/about'
import statement from '@/components/statement'
import consulting from '@/components/consulting'
import consultings from '@/components/consultings'
import MedicalLectures from '@/components/MedicalLectures'
import searchRes from '@/components/searchRes'
import fastAsk from '@/components/fastAsk'
import introduceMsg from '@/components/introduceMsg'
import doctorRoom from '@/components/doctorRoom'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      redirect: '/index',
      component: home,
      children: [{
          path: '/index',
          name: 'index',
          component: index
        },
        {
          path: '/consulting',
          name: 'consulting',
          component: consulting
        },
        {
          path: '/my',
          name: 'my',
          component: my
        },
      ]
    },
    {
      path: '/doctorRoom',
      name: 'doctorRoom',
      component: doctorRoom
    },
    {
      path: '/introduceMsg',
      name: 'introduceMsg',
      component: introduceMsg
    },
    {
      path: '/fastAsk',
      name: 'fastAsk',
      component: fastAsk
    },
    {
      path: '/consultings',
      name: 'consultings',
      component: consultings
    },
    {
      path: '/searchRes',
      name: 'searchRes',
      component: searchRes
    },
    {
      path: '/MedicalLectures',
      name: 'MedicalLectures',
      component: MedicalLectures
    },
    {
      path: '/statement',
      name: 'statement',
      component: statement
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/eaditPwd',
      name: 'eaditPwd',
      component: eaditPwd
    },
    {
      path: '/editPhone',
      name: 'editPhone',
      component: editPhone
    },
    {
      path: '/integral',
      name: 'integral',
      component: integral
    },
    {
      path: '/rules',
      name: 'rules',
      component: rules
    },
    {
      path: '/gaiQ',
      name: 'gaiQ',
      component: gaiQ
    },
    {
      path: '/balance',
      name: 'balance',
      component: balance
    },
    {
      path: '/person',
      name: 'person',
      component: person
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '/reportDet',
      name: 'reportDet',
      component: reportDet
    },
    {
      path: '/myRepotList',
      name: 'myRepotList',
      component: myRepotList
    },
    {
      path: '/msgDet',
      name: 'msgDet',
      component: msgDet
    },
    {
      path: '/myMsgList',
      name: 'myMsgList',
      component: myMsgList
    },
    {
      path: '/oderDet',
      name: 'oderDet',
      component: oderDet
    },
    {
      path: '/guahaoRes',
      name: 'guahaoRes',
      component: guahaoRes
    },
    {
      path: '/addZhenR',
      name: 'addZhenR',
      component: addZhenR
    },
    {
      path: '/zhenR',
      name: 'zhenR',
      component: zhenR
    },
    {
      path: '/appoiSure',
      name: 'appoiSure',
      component: appoiSure
    },
    {
      path: '/guahao',
      name: 'guahao',
      component: guahao
    },
    {
      path: '/myRecrd',
      name: 'myRecrd',
      component: myRecrd
    },
    {
      path: '/readMe',
      name: 'readMe',
      component: readMe
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/recordList',
      name: 'recordList',
      component: recordList
    },
    {
      path: '/help',
      name: 'help',
      component: help
    },
    {
      path: '/room',
      name: 'room',
      component: room
    },
  ]
})
