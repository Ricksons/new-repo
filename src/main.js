import {createApp} from 'vue'
import './registerServiceWorker'
import boot from 'devegram-vu3-booting-system/src/index'
import {hkms} from 'devegram-vue-hkms/src/hkms'


import App from './system-services/views/App'
import store from '@/system-services/store/index'
import router from './system-services/router/index'
import notification from '@/system-services/notification/notify'
import {ajaxManagerConfig} from '@/system-services/ajax-manager/ajaxManagerConfig'
import {initUILang} from '@/system-services/language/index'

const app = createApp(App)
const globalData = {
	'$store' : store,
	'$router' : router,
	'$hkms' : hkms(),
	'$notify': notification,
	...initUILang(),
	'$W_LOGGER_DEBUG' : true,
	'$dbugLogger': false
}

const beforeBoot = async (gd) => {
	return new Promise( function (resolve) {
		(async () => {
			ajaxManagerConfig(gd.$store)
			gd.$hkms.store = gd.$store
			gd.$hkms.router = gd.$router
			await gd.$hkms.bootDefaultVuexModules()
			await gd.$hkms.bootUserPermissions()
			await gd.$store.dispatch('App-App-state/doneLoading')
			resolve()
		})()
	})
}


boot({app, beforeBoot, globalData}).then((gb) => {
	app.use(gb.$router).mount('#app')
})
