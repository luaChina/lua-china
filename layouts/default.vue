<template>
    <div class="bg-light d-flex flex-column main" id="app">
        <app-header></app-header>
        <main class="container pt-3 main-content" role="main">
            <nuxt />
        </main>
        <app-foot></app-foot>
    </div>
</template>
<script>
import header from "~/components/app-header.vue";
import footer from "~/components/app-footer.vue";
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
export default {
  name: "layout",
  components: {
        "app-header": header,
        "app-foot": footer
    },
     mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            setTimeout(() => this.$nuxt.$loading.finish(), 500);
        });
        // init sentry
        Sentry.init({
            dsn: "https://b11425e91d854dc8a9a62b2ac1cc1590@sentry.io/1329324",
            integrations: [new Integrations.BrowserTracing()],
            tracesSampleRate: 1.0,
        });
        // init baidu seo
        var bp = document.createElement("script");
        bp.src = "https://zz.bdstatic.com/linksubmit/push.js";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    }
    };
</script>
<style>
.main {
    min-height: 100vh;
}
.main-content {
    flex: 1;
}
html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
}

.button--grey:hover {
    color: #fff;
    background-color: #35495e;
}
</style>
