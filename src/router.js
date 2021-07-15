import nProgress from 'nprogress'
import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import NotFound from './views/NotFound.vue'
import NetworkIssue from './views/NetworkIssue.vue'
import Example from './views/Example.vue'
import store from '@/store/store.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store.dispatch('event/fetchEvent', routeTo.params.id).then(event => {
          routeTo.params.event = event
        next()
        }).catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: '404', params: { resource: 'event' }})
          } else {
            next ({ name: 'network-issue'})
          }
        })
      }
    },
    {
      path: '7404',
      name: '404',
      component: NotFound
    },
    {
      path: '*',
      redirect: { name: '404'}
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
    },
    {
      path: '/example',
      component: Example
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  nProgress.start()
  next()
})

router.afterEach(() => {
  nProgress.done()
})

export default router