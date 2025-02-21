<template>
  <div
    class="video-layer"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <video ref="video" controls></video>
  </div>
</template>

<script>
import Hls from "hls.js";

export default {
  name: "VideoViewer",
  props: {
    target: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 640,
    },
    height: {
      type: Number,
      default: 480,
    },
  },
  data() {
    return {};
  },
  mounted() {
    console.log("VideoViewer mounted");
    // this.boxWidth = this.width;
    // this.boxHeight = this.height;
    this.initVideo();
  },
  watch: {
    url(newVal, oldVal) {
      console.log(`VideoViewer watch > url : ${oldVal} → ${newVal}`);
      this.loadVideo(newVal);
    },
    /*
    width(newVal, oldVal) {
      console.log(`VideoViewer > watch > width : ${oldVal} → ${newVal}`);
      this.resizeVideo(newVal, this.height);
      // this.loadVideo(newVal);
    },
    height(newVal, oldVal) {
      console.log(`VideoViewer > watch > height : ${oldVal} → ${newVal}`);
      this.resizeVideo(this.width, newVal);
      // this.loadVideo(newVal);
    },
    */
  },
  methods: {
    initVideo() {
      console.log(`initVideo`);

      // this.resizeVideo(this.width, this.height);

      if (this.target == "hls") {
        this.loadVideo(this.url);
      } else {
        console.log("${target} is Not Support");
      }
    },


    loadVideo(url) {
      console.log(`loadVideo`);

      const video = this.$refs.video;
      this.resizeVideo(this.width, this.height);
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      }
    },

    
    resizeVideo(width, height) {
      if (width && height) {
        console.log(`resizeVideo() ${width} x ${height}`);
        const video = this.$refs.video;
        // const video = document.getElementById("video");
        if (video) {
          video.width = width;
          video.height = height;
        }
      } else {
        console.log(`resizeVideo() width or height is Empty`);
      }
    },
  },
};
</script>

<style scoped>
.video-layer {
  position: relative;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
  margin: 1 2px;
  /* width: 400px;
  height: 300px; */
}
video {
  width: 100%;
  height: 100%;
}
</style>
