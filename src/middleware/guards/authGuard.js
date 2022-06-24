export const authGaurd =  (to, from, guards, guardProps, props) => {
  if ($store.getters['App-User-state/isAuthenticated']) {
    return true
  } else {
    props.redirect = { name: 'portal-home-login'}
    alert($store.state['App-User-state'])
    $store.state['App-User-state'].afterLoginPath = to.path
    $notify.view({
      type: 'warning',
      title: $ml.get('page_access_denied'),
      message: '',
      position: 'center',
      close: false,
      timeout: 1500,
      animateInside: false,
      onClosed: () => {}
    });
    return false
  }
}

export default authGaurd
