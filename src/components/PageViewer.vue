<template>
  <div>
    <div class="pop-section-con">
      <div v-if="(pageIdx==1)">
        <iframe class="iframe-section" src="/html/SvrOptim01.html"></iframe>
      </div>
      <div v-if="(pageIdx==2)">
        <iframe class="iframe-section" src="/html/SvrOptim02.html"></iframe>
      </div>
    </div>
  </div>
</template>
  
  <script>
  
  /* Page Viewer Commponent */
  
  export default {
    name: "PageViewer",
    props: {
      pageIdx: {
        type: Number,
        default: 1,
        },
      /*
      userData: {
        type: Object,
        required: true,
      },
      */
    },
    data() {
      return {
        
      };
    },
    mounted() {
      // this.showPage();
        window.addEventListener('message', this.receiveMessage);
    },
    beforeUnmount() {
        window.removeEventListener('message', this.receiveMessage);
    },
    watch: {
        pageIdx(newVal, oldVal) {
            console.log(
                `PageViewer > watch > pageIdx :  ${oldVal} → ${newVal}`
        );
  
        this.showPage();
      },
    },
    methods: {
        // targetObject의 속성을 기반으로 관련된 Component를 호출
        showPage() {
            console.log("PageViewer >> showPage");
        },

        // 메시지에 대한 수신 처리 (iFrame 사용 시 프레임 내부에서 외부 페이지와 메시지 처리)
        receiveMessage(event) {
            switch(event.data) {
                case "close" :
                    console.log('PageViewer receiveMessage() : ', event.data);

                    /*/ event 값을 통한 onMenuClick으로는 처리가 되지 않음
                    event.currentTarget.dataset.index = 82;
                    this.onMenuClick(event);
                    ///////////////////////////////////////////////////// */

                    this.onCloseOverlap();
                    
                    break;
                default :
                    // 지속적으로 "react-devtools-content-script" 메시지가 발생하므로 필요 시만 Log 출력
                    // console.log('PageViewer receiveMessage() : ', event.data);
                    break;
            }
            
        },

        // 메뉴에서 버튼을 클릭한 경우
        onMenuClick(event) {
            this.$emit("setMenuClick", event);
            // const menuIndex = parseInt(event.currentTarget.dataset.index);
        },

        // Close 메뉴에 대한 이벤트 처리
        onCloseOverlap() {
            this.$emit("setCloseOverlap");
            // const menuIndex = parseInt(event.currentTarget.dataset.index);
        },
    
    },
  };
  </script>
  
  <style scoped>
  
  .pop-section-con {
    position: relative;
    padding-top: 8px;
    padding-bottom: 4px;
    padding-left: 8px;
    padding-right: 8px;
    background-color: #1a1a1e;
    color: #fff;
    min-width:400px;
  }
  
  .iframe-section {
    border: 0;
    width: 1240px;
    height: 690px;
    border-radius: 0.3rem;
  }
  
  </style>
  