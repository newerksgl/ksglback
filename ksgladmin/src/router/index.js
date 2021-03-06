import Vue from 'vue'
import Router from 'vue-router'

//课程模块
import Course from "../components/courseManagement/Course.vue";
import FenLei from "../components/courseManagement/FenLei.vue";
import Coursemng from "../components/courseManagement/Coursemng.vue";
import MoKuaigl from "../components/courseManagement/MoKuaigl.vue";
//证书模块
import Ccie from '../components/ccie/Ccie.vue'
// 用户模块
import User from '../components/linemodule/User.vue'
import RoleManagement from '../components/linemodule/RoleManagement.vue'
import UserManagement from '../components/linemodule/UserManagement.vue'
//考试模块
import Examination from '../components/Examination/Examination.vue'
import ExaminationList from '../components/Examination/ExaminationList.vue'
import AddressSet from '../components/Examination/AddressSet.vue'
//试卷模块
import Paper from '../components/paper/Paper.vue'
import Model from '../components/paper/Model.vue'
import PaperManger from '../components/paper/PaperManger.vue'
import Question from '../components/paper/Question.vue'

import Login from "../components/login/Login.vue";
import ShouYe from '../components/shouye/ShouYe.vue'
import Register from '../components/register/Register.vue'
import Personal from '../components/personal/Personal.vue'
import Privacy from '../components/personal/Privacy.vue'
import Integral from '../components/personal/Integral.vue'

import KaoshiModule from '../components/kaoshiModule/Kaoshi.vue'
import RegionSet from '../components/kaoshiModule/RegionSet.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/shouye' // 默认路径
    }, {
      path: '/login',
      name: 'login',
      component: Login,
    }, {
      path: '/shouye',
      name: 'shouye',
      component: ShouYe
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/linemodule',
      name: 'linemodule',
      component: User,
      children: [
        {
          path: '/rolemanagement',
          name: 'rolemanagement',
          component: RoleManagement
        },
        {
          path: '/usermanagement',
          name: 'usermanagement',
          component: UserManagement
        }

      ]
    }, {
      path: '/course',
      name: 'course',
      component: Course,
      children: [
        {
          path: '/classification',
          name: 'classification',
          component: FenLei
        },
        {
          path: '/coursemng',
          name: 'coursemng',
          component: Coursemng
        },
        {
          path: '/moKuaigl',
          name: 'moKuaigl',
          component: MoKuaigl
        }

      ]
    },
    {
      path: '/ccie',
      name: 'ccie',
      component: Ccie
    },
    {
      path: '/examination',
      name: 'examination',
      component: Examination,
      children: [
        {
          path: '/examinationList',
          name: 'examinationList',
          component: ExaminationList
        },
        {
          path: '/addressSet',
          name: 'addressSet',
          component: AddressSet
        }

      ]
    },
    {
      path: '/paper',
      name: 'paper',
      component: Paper,
      children: [
        {
          path: '/model',
          name: 'model',
          component: Model
        },
        {
          path: '/paperManger',
          name: 'paperManger',
          component: PaperManger
        },
        {
          path: '/question',
          name: 'question',
          component: Question
        }

      ]
    }



  ]
})