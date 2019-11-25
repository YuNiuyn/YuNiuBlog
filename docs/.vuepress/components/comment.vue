<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>
<script>
export default {
  name: 'comment',
  data() {
    return {};
  },
  mounted() {
    let body = document.querySelector('.gitalk-container');
    let script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js';
    body.appendChild(script);
    script.onload = () => {
      const commentConfig = {
        clientID: '6cb636b554f085a166bd',
        clientSecret: 'facac7da33bcc4c77bb121810cb9c661a09d1c45',
        repo: 'https://github.com/YuNiuyn/YuNiuBlog',
        owner: 'YuNiuyn',
        admin: ['YuNiuyn'],
        id: location.pathname,
        distractionFreeMode: false,
      };
      const gitalk = new Gitalk(commentConfig);
      gitalk.render('gitalk-container');
    };
  },
};
</script>
<style>
@import 'gittalk.css';
</style>