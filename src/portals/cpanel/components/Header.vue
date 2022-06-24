<template>
  <div>
    <header id="header" class="alt">
      <a href="/" class="logo"><strong>JIKATEL</strong> <span>FAS FREE ROUTE</span></a>
      <nav>
        <router-link :to="{name: 'portal-home-login'}" v-if="$route.name !== 'portal-home-login'">
          Login
        </router-link>
        <router-link :to="{name: 'portal-home-signup'}" v-if="$route.name !== 'portal-home-signup'">
          Signup
        </router-link>
        <!--<a href="#menu">Menu</a>-->
      </nav>
    </header>

    <nav id="menu">
      <ul class="links">
        <li><a href="index.html">Home</a></li>
        <li><a href="landing.html">Landing</a></li>
        <li><a href="generic.html">Generic</a></li>
        <li><a href="elements.html">Elements</a></li>
      </ul>
      <ul class="actions stacked">
        <li><a href="#" class="button primary fit">Get Started</a></li>
        <li><a href="#" class="button fit">Log In</a></li>
      </ul>
    </nav>
  </div>
</template>
