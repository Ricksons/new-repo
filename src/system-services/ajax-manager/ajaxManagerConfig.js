export const ajaxManagerConfig = async (store) => {
  await store.dispatch('ajaxManager/setService', [
    {
      name: 'AMS',
      config: {
        url: process.env.VUE_APP_AMS_SERVICE_URL,
        port: process.env.VUE_APP_AMS_SERVICE_PORT,
        apiVer: null,
        token: ''
      }
    },
    {
      name: 'github',
      config: {
        url: 'https://google.com',
        port: '1',
        apiVer: 'v2',
        token: ''
      }
    }
  ]).then(() => {
    // console.log('services 2', $store.state.ajaxManager.services.github.path)
  })

  await $store.dispatch('ajaxManager/setErrorHandler', (error) => {
    if (error.response) {
      let errorCode = error.response.status
      if (errorCode === 401) {
        if (!localStorage.getItem('redirected_to_login')) {
          iziToast.warning({
            title: 'Caution',
            message: 'You have to check your credentials',
            position: 'center',
            timeout: 1000,
            animateInside: false,
            close: false,
            onClosed: () => {}
          });
          localStorage.setItem('redirected_to_login', 1)
          setTimeout(() => {
            $router.push({ name: 'module->user->logout'})
          }, 600)
        }
      }
    } else {
      console.log('ajax manager Error Handler', error)
    }
  })
}
