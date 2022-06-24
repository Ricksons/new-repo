<template>
  <div></div>
</template>

<script>
export default {
  props: {
    audioSrc: {
      required: true
    }
  },
  data() {
    return {
      dom: null,
      domFirst: null
    }
  },
  mounted() {
    this.dom = this.$el
    this.createAutoButton()
  },
  methods: {
    cl(e) {
      console.log(e)
    },
    createAutoButton() {
      let src = this.audioSrc

      if (src === 'fas') {
        let e = document.createElement('span')
        e.innerText = "Possible FAS"
        this.dom.appendChild(e)
        return
      }

      let ctx = this
      let audio = document.createElement('audio');
      let source = document.createElement('source');
      source.setAttribute('src', src)
      source.setAttribute('type', 'audio/wav')
      audio.appendChild(source);

      let playButton = document.createElement('div');
      playButton.setAttribute('class', 'el-icon-loading')
      playButton.style.cssText = 'width:30px;height:12px;font-size: 22px'

      audio.oncanplay = function () {
        this.setAttribute('data-floaded', '1')
      };

      source.onerror = function (e) {
        playButton.setAttribute('class', 'el-icon-minus')
      };

      setTimeout(function () {
        if (audio.getAttribute('data-floaded') != '1') {
          source = document.createElement('source')
          source.setAttribute('type', 'audio/wav')
          source.setAttribute('src', src);
          audio.load();
        }
        ;

      }, 4000, audio);

      audio.load()
      //audio.oncanplaythrough = function() {
      audio.onloadedmetadata = function () {
        this.setAttribute('data-dur', audio.duration);
        ctx.changeAutoButtonStatus(playButton, 1)

        // playButton.innerText  = "Play";

        playButton.onclick = function () {
          if (audio.getAttribute('data-status') == 'start') {
            audio.pause();
            audio.currentTime = 0;
            ctx.changeAutoButtonStatus(playButton, 1)
            audio.setAttribute('data-status', '')
          } else {
            audio.play();
            ctx.changeAutoButtonStatus(this, 0)
            audio.setAttribute('data-status', 'start')
          }

        }
      };

      audio.onended = function () {
        audio.pause();
        audio.currentTime = 0;
        ctx.changeAutoButtonStatus(playButton, 1)
        audio.setAttribute('data-status', '')
      };

      this.dom.appendChild(audio)
      this.dom.appendChild(playButton)
    },
    changeAutoButtonStatus(btn, status) {
      // set status to play
      if (status == 1) {
        btn.setAttribute('class', 'el-icon-video-play');
      } else {
        btn.setAttribute('class', 'el-icon-video-pause');
      }
    }
  }
}
</script>
