
import Vue from 'vue'
// 引入 vssue
import Vssue from 'vssue'
// 引入对应平台的 api 包
import GithubV3 from '@vssue/api-github-v3'
// 引入 vssue 的样式文件
import 'vssue/dist/vssue.css'

Vue.use(Vssue, {
  // 设置要使用的平台 api
  api: GithubV3,

  // 在这里设置你使用的平台的 OAuth App 配置
  owner: 'OWNER_OF_REPO',
  repo: 'NAME_OF_REPO',
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET', // 只有在使用某些平台时需要
})