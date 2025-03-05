<template>
  <div>
    <div class="pop-section-con">
      <div class="pop-section-top-section">
        <div class="pop-section-top-tit">상세정보</div>
        <div class="pop-section-top-box">
          <img
            src="@/assets/image/ico_close.png"
            alt="닫기"
            width="12px"
            height="12px"
            style="cursor: pointer"
            @click="closeWidget"
            data-index="89"
          />
        </div>
      </div>

      <div v-if="!objInfo.isDTwin" class="pop-section-content-section">
        <div class="tx">
          <span class="lable">ID</span>
          <span class="lable-tx">{{ objInfo.name }}</span>
        </div>
        <div class="tx">
          <span class="lable">관계</span>
          <span class="lable-tx">{{ objInfo.parent }}</span>
        </div>
        <div class="tx">
          <span class="lable">크기</span>
          <span class="lable-tx">{{ objInfo.size }}</span>
        </div>
        <div class="tx">
          <span class="lable">Position</span>
          <span class="lable-tx">{{ objInfo.position }}</span>
        </div>
        <!-- div class="tx">
          <span class="lable">Rotation</span>
          <span class="lable-tx">0.00, 0.00, 0.00</span>
        </div>
        <div class="tx">
          <span class="lable">카메라 </span>
          <span class="lable-tx">0.88, 3.04, -2.37</span>
        </div>
        <div class="tx">
          <span class="lable">사원수</span>
          <span class="lable-tx">-0.07, 0.92, 0.21, 0.32</span>
        </div -->
      </div>

      <div v-if="objInfo.isDTwin" class="pop-section-content-section">
        <!-- div class="tx">
          <span class="lable">이름</span>
          <span class="lable-tx">{{ objInfo.dtname }}</span>
        </div>
        <div class="tx" v-if="objInfo.descript">
          <span class="lable">설명</span>
          <span class="lable-tx">{{ objInfo.descript }}</span>
        </div>
        <div class="tx">
          <span class="lable">관계</span>
          <span class="lable-tx">{{ objInfo.parent }}</span>
        </div>
        <div class="tx">
          <span class="lable">속성</span>
          <span class="lable-tx">{{ objInfo.attribute }}</span>
        </div -->
        <table board="1">
          <tbody>
            <tr class="tx">
              <td class="lable">이름</td>
              <td class="lable-tx">{{ objInfo.dtname }}</td>
            </tr>
            <tr v-if="objInfo.descript" class="tx">
              <td class="lable">설명</td>
              <td class="lable-tx">{{ objInfo.descript }}</td>
            </tr>
            
            <!-- tr class="tx">
              <td class="lable">관계</td>
              <td class="lable-tx">{{ objInfo.parent  }}</td>
            </tr>
            <tr class="tx">
              <td class="lable">속성</td>
              <td class="lable-tx">{{ objInfo.attribute  }}</td>
            </tr -->
          </tbody>
        </table>
      </div>

      <!-- 여백 라인 st-->
      <div class="mb-1"></div>
      <div class="pop-section-line"></div>
      <div class="mb-4"></div>
      <!-- 여백 라인end-->
      <div class="pop-section-top-tit">
        {{ subTitle }}
      </div>

      <ChartViewer
        v-if="divChart.isShow"
        class="chart-container"
        :width="divChart.width"
        :height="divChart.height"
        :actData="targetObject.userData.digitalTwin.action"
      />

      <VideoViewer
        v-if="divVideo.isShow"
        class="video-container"
        :objName="divVideo.objName"
        :target="divVideo.target"
        :url="divVideo.url"
        :width="divVideo.width"
        :height="divVideo.height"
      />

      <div v-if="divServer.isShow">
        <div class="group-section">
          <table>
            <tbody>
              <tr>
                <td>
                  <span class="group-as-tx">현재값</span>
                  <span class="group-as"
                    ><img src="@/assets/image/img_test_01.png" alt="현재값"
                  /></span>
                </td>
                <td>
                  <span class="group-as-tx">추천값</span>
                  <span class="group-is"
                    ><img src="@/assets/image/img_test_02.png" alt="추천값"
                  /></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="wrapper">
          <button class="btn" @click.stop="onMenuClick" data-index="86">최적화 실행</button>
        </div>
      </div>

      <div v-if="divLink.isShow">
        <div class="group-section">
          <span class="group-as-tx">{{ divLink.title }}</span>
        </div>
        <div v-if="divLink.image">
          <img :src="divLink.image" class="img-round"/>
        </div>
        <div class="wrapper">
          <button @click="linkClick(divLink.url, divLink.target)" class="btn">이동하기</button>
        </div>
      </div>

      <div v-if="divImage.isShow">
        <div class="group-section">
          <span class="group-as-tx">{{ divImage.title }}</span>
        </div>
        <div v-if="divImage.url">
          <img :src="divImage.url" class="img-round"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

/* Widget Viewer Commponent */
import * as THREE from "three";

import ChartViewer from "./ChartViewer.vue"; // Chart 보기를 위한 Vue Import
import VideoViewer from "./VideoViewer.vue"; // Video 보기를 위한 Vue Import

import CommUtil from "./comm/CommUtil.js"; // Logger 클래스를 import 합니다.
// import { forEach } from "core-js/core/array";
// import Logger from "./CommUtil.js"; // Logger 클래스를 import 합니다.

export default {
  name: "WidgetViewer",
  components: {
    ChartViewer,
    VideoViewer,
  },
  props: {
    targetObject: {
      type: Object,
      required: true,
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
      mainTitle: "",
      subTitle: "",
      objInfo: {
        isDTwin:false,
        name: "",
        dtname: "",
        descript: "",
        attribute: "",
        parent: "",
        size: "",
        position: "",
      },

      divChart: {
        objName: "",
        isShow: false,
        position: { x: 0, y: 0 },
        width: 200,
        height: 150,
        target: "",
        url: "",
        timer: null,
      },

      divVideo: {
        objName: "",
        isShow: false,
        position: { x: 0, y: 0 },
        timer: null,
        timeout: 5 * 1000,
        width: 200,
        height: 150,
        target: "", // hls(http Live Stream) / youtube
        url: "",
      },

      divLink: {
        objName: "",
        isShow: false,
        target: "",
        url: "",
        image:"",
      },

      divImage: {
        objName: "",
        isShow: false,
        url: "",
        target: "",
      },

      divServer: {
        objName: "",
        isShow: false,
        position: { x: 0, y: 0 },
        timer: null,
        timeout: 5 * 1000,
        width: 200,
        height: 150,
        target: "", // hls(http Live Stream) / youtube
        url: "",
      },
    };
  },
  mounted() {
    console.log("WidgetViewer > mounted()");
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.showDivWidget();
  },
  beforeUnmount() {
    console.log("WidgetViewer > beforeUnmount()");
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  },  
  watch: {
    targetObject(newVal, oldVal) {
      let oldName = oldVal && oldVal.name ? oldVal.name : "Unnamed";
      let newName = newVal && newVal.name ? newVal.name : "Unnamed";
      console.log(
        `WidgetViewer > watch > targetObject :  ${oldName} → ${newName}`
      );

      this.showDivWidget();
    },
    /*
    userData(newVal, oldVal) {
      let oldName = oldVal && oldVal.dtname ? oldVal.dtname : "Unnamed";
      let newName = newVal && newVal.dtname ? newVal.dtname : "Unnamed";
      console.log(`WidgetViewer > watch > userData :  ${oldName} → ${newName}`);
      // this.showDivWidget();
    },
    */
  },
  methods: {

    handleVisibilityChange() {
      console.log('WidgetViewer > handleVisibilityChange() visibility changed:', document.visibilityState);
    },

    // Widget을 화면에 표출
    showDivWidget() {
      if (!(this.targetObject && this.targetObject.name)) {
        console.log(`showDivWidget() target Object is Empty`);
        return;
      }

      // 선택된 객체에 대해서 화면 표출 정보를 생성
      this.showDivInfo();

      if (this.targetObject.userData.digitalTwin) {

        // const dtObject = this.targetObject;
        // const dtObject = this.userData;
        const dtObject = this.targetObject.userData.digitalTwin;

        console.log(`showDivWidget() : ${dtObject.dtname}`);

        if(dtObject.action && dtObject.action.type) {

          const type = dtObject.action.type;

          this.clearDiv();

          // Chart 보기일 경우
          if (type == "chart") {
            this.showDivChart();
          }
          // Video 보기일 경우
          else if (type == "video") {
            // console.log("Show Video");
            this.showDivVideo();
          }
          // Link 보기일 경우
          else if (type == "link") {
            // console.log("Show Video");
            this.showDivLink();
          }
          // Image 보기일 경우
          else if (type == "image") {
            // console.log("Show Video");
            this.showDivImage();
          }
          // Video 보기일 경우
          else if (type == "server") {
            // console.log("Show Video");
            this.showDivServer();
          }
          else {
            console.log(`showDivWidget() unknown type (${type})`);
            // link / morph는 GltfViewer.vue에서 처리
          }

        }
        else {
          console.log(`showDivWidget() Active type Empty`);

        }

      }
      else {
        console.log(`showDivWidget() Digital Twin is Empty`);

      }

    },

    // 선택된 객체에 대한 정보를 화면에 표출
    showDivInfo() {

      console.log(`showDivInfo()`);

      const objParent = this.getObjectParentName(this.targetObject, false);
      const objSize = this.getObjectSize(this.targetObject);
      const objRadius = this.getObjectRadius(this.targetObject);

      this.objInfo.parent = objParent;
      this.objInfo.size = `${CommUtil.getPos2Text(
        objSize
      )} ( Ø : ${objRadius.toFixed(2)} )`;
      if (this.targetObject.position) {
        this.objInfo.position = CommUtil.getPos2Text(
          this.targetObject.position
        );
      }
      else {
        this.objInfo.position = "";
      }


      if (this.targetObject.userData.digitalTwin) {

        // const dtObject = this.targetObject;
        // const dtObject = this.userData;
        const dtObject = this.targetObject.userData.digitalTwin;

        this.objInfo.isDTwin = true;
        this.objInfo.dtname = dtObject.dtname;
        this.objInfo.descript = dtObject.descript;

        if(dtObject.action) {

          this.objInfo.attribute = dtObject.action.type;

          // 하단 화면의 Title을 설정
          if(dtObject.action.title)
            this.subTitle = dtObject.action.title;
          else
            this.subTitle = dtObject.action.type + " / " + dtObject.action.target;

        }
        else {
          this.objInfo.attribute = "";
          this.objInfo.subTitle = "";
        }

      }
      else {

        this.objInfo.isDTwin = false;
        this.objInfo.name = this.targetObject.name;

       }


    },

    // 선택된 객체에 대한 Chart 를 화면에 표출
    showDivChart() {

      if (!this.targetObject.userData.digitalTwin) {
        console.log(`showDivChart() Digital Twin Element is Empty`);
        return;
      }

      this.getDTInfo(this.divChart);

      // const dtObject = this.targetObject;
      // const dtObject = this.userData;
      // const dtObject = this.targetObject.userData.digitalTwin;

      /* / Timer가 작동 중일 경우 종료
      if (this.divChart.timer || this.divChart.isShow) {
        this.selectedObjectName = "";
        this.divChart.isShow = false;
        this.divChart.target = "";
        this.divChart.url = "";
        clearTimeout(this.divChart.timer);
      }
    */

      /*/ Widget Timer도 동작 중일 경우 종료
      if (this.divWidget.timer) {
        this.showDivWidget = false;
        clearTimeout(this.divWidget.timer);
      }
      /////////////////////////////////////////// */

      /*
      this.divChart.width =
        this.divWidget.width -
        this.initState.chart.margin.left -
        this.initState.chart.margin.right;
      this.divChart.height =
        this.divWidget.height -
        this.initState.chart.margin.top -
        this.initState.chart.margin.bottom;
      */

      // this.divChart.width = this.initState.chart.width;
      // this.divChart.height = this.initState.chart.height;
      this.divChart.width = 400;
      this.divChart.height = 300;

      // this.divChart.dataIdxs = dataIdxs;


      /* / 설정된 시간 이후에 Chart Info DIV를 화면에서 숨김
      this.divChart.timer = setTimeout(() => {
        this.divChart.isShow = false;
      }, 1000 * this.initState.chart.timer); */
    },

    // 선택된 객체에 대한 Video 를 화면에 표출
    showDivVideo() {

      if (!this.targetObject.userData.digitalTwin) {
        console.log(`showDivVideo() Digital Twin Element is Empty`);
        return;
      }

      this.getDTInfo(this.divVideo);

      // const dtObject = this.targetObject.userData.digitalTwin;
      this.divVideo.width = 400;
      this.divVideo.height = 300;

      /* / Timer가 작동 중일 경우 종료
      if (this.divVideo.timer || this.divVideo.isShow) {
        this.selectedObjectName = "";
        this.divVideo.isShow = false;
        this.divVideo.type = "";
        this.divVideo.iot = "";
        clearTimeout(this.divVideo.timer);
      }
      ///////////////////////////////////////////// */



      /* / 설정된 시간 이후에 Chart Info DIV를 화면에서 숨김
      this.divVideo.timer = setTimeout(() => {
        this.divVideo.isShow = false;
      }, 1000 * this.initState.chart.timer); */
    },

    // 선택된 객체에 대한 Link 관련 정보를 화면에 표출
    showDivLink() {

      this.clearDiv();

      this.getDTInfo(this.divLink);

      const dtObject = this.targetObject.userData.digitalTwin;
      if(dtObject.action.image)
        this.divLink.image = dtObject.action.image;
      else
        this.divLink.image = "";

    },

    // 선택된 객체에 대한 Image 관련 정보를 화면에 표출
    showDivImage() {
      this.clearDiv();

      this.getDTInfo(this.divImage);
    },

    // 선택된 객체에 대한 Server 관련 정보를 화면에 표출
    showDivServer() {
      this.clearDiv();
      this.divServer.isShow = true;
    },

    // 현재 화면에 실행 중인 Div를 종료함
    clearDiv() {
      // this.divWidget.isShow = false;
      // this.divInfo.isShow = false;
      this.divChart.isShow = false;
      this.divVideo.isShow = false;
      this.divLink.isShow = false;
      this.divImage.isShow = false;
      this.divServer.isShow = false;
    },

    // 위젯 화면을 종료
    closeWidget(event) {
      // alert("화면 Close (구현예정)");
      this.$emit("setMenuClick", event);
    },

    // Link Type일 경우 버튼을 클릭하면 입력되 URL 페이지로 이동함
    linkClick(url, target) {
      // 현재창에서 링크 페이지를 오픈
      if (target == "self") {
        document.location.href = url;
      }
      // 새창에 링크 페이지를 오픈
      else {
        window.open(url);
      }
    },

    // 메뉴에서 버튼을 클릭한 경우
    onMenuClick(event) {
        this.$emit("setMenuClick", event);
        // const menuIndex = parseInt(event.currentTarget.dataset.index);
    },


     // DT Object에 대한 정보를 Div에 출력
    getDTInfo(targetDiv) {

      const dtObject = this.targetObject.userData.digitalTwin;
      const target = dtObject.action.target;
      const url = dtObject.action.url;

      targetDiv.isShow = true;

      targetDiv.target = target;
      targetDiv.url = url;

      targetDiv.objName = this.targetObject.name;

    },






    // Object에 대한 parent 명을 Text로 반환하여 출력
    getObjectParentName(object, isUseScene=true) {
      let rtnText = "";
      if (object.parent && object.parent.name) {
        if(isUseScene || !(object.parent.name == "Scene"))
          rtnText += this.getObjectParentName(object.parent, isUseScene) + " > ";
      }
      if (object.name) rtnText += object.name;
      return rtnText;
    },

    // 3D 객체의 사이즈를 반환
    getObjectSize(object) {
      // 객체의 경계 상자를 계산하고, 그 크기를 얻는 데 유용
      const box = new THREE.Box3().setFromObject(object);
      const size = new THREE.Vector3();
      box.getSize(size); // 벡터에 x, y, z 방향의 크기를 할당

      return size;
    },

    // 3D 객체의 전체 크기를 반영하는 구의 반지름을 기반으로 크기를 측정하여 반환
    getObjectRadius(object) {
      // 객체의 경계 상자를 계산하고, 그 크기를 얻는 데 유용
      const sphere = new THREE.Sphere();
      const box = new THREE.Box3().setFromObject(object);
      box.getBoundingSphere(sphere);

      // 2. BoundingSphere의 반지름을 얻음
      const radius = sphere.radius;
      return radius;
    },


  },
};
</script>

<style scoped>
.pop-section {
  position: fixed;
  width: 485px;
  height: 650px;
  background-color: #1a1a1e;
  color: #fff;
  border-bottom: 1px solid #8d8e92;
  border-top: 1px solid #8d8e92;
  border-left: 1px solid #8d8e92;
  border-right: 1px solid #8d8e92;
  z-index: 1;
}

.pop-section-con {
  position: relative;
  padding: 16px 16px;
  background-color: #1a1a1e;
  color: #fff;
  min-width:400px;
}

.pop-section-top-section {
  display: flex;
  border-bottom: 1px solid #8d8e92;
}
.pop-section-top-tit {
  display: flex;
  padding-bottom: 2px;
  font-size: 20px;
  text-align: left;
  color: #fff;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}
.pop-section-top-box {
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
  justify-content: flex-end;
  vertical-align: middle;
}

.pop-section-line {
  display: flex;
  margin: 1px 0px;
  padding: 0px;
  height: 1px;
  background-color: #8d8e92;
}

.pop-section-content-section {
  display: flex;
  margin-top: 6px;
  text-align: left;
  display: block;
}
.tx {
  display: flex;
  padding-bottom: 10px;
  color: #8c8c8c;
}
.lable {
  display: block;
  color: #8c8c8c;
  width: 80px;
  text-align: left;
  font-weight: bold;
}
.lable-tx {
  display: block;
  color: #fff;
  text-align: left;
  max-width:320px;
}

.group-section {
  display: flex;
  gap: 20px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  flex-direction: column;
  /* border: 1px solid red; */
}
.group-as-tx {
  flex-basis: 0;
  flex-grow: 1;
  display: block;
  margin-bottom: 10px;
  text-align: center;
  line-height: 24px;
  font-weight: bold;
  color: #8c8c8c;
  justify-content: center;
  flex-direction: column;
}
.group-as {
  flex-basis: 0;
  flex-grow: 1;
  display: block;
  justify-content: center;
  flex-direction: column;
}
.group-is-tx {
  flex-basis: 0;
  flex-grow: 1;
  display: block;
  margin-bottom: 10px;
  text-align: center;
  line-height: 24px;
  font-weight: bold;
  color: #8c8c8c;
  justify-content: center;
  flex-direction: row;
}
.group-is {
  flex-basis: 0;
  flex-grow: 1;
  display: block;
  justify-content: center;
  flex-direction: column;
}

/* 라운드버튼 */
.wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.btn {
  background-color: #646464;
  padding: 5px 15px;
  border: 0;
  border-radius: 0.3rem;
  color: white;
  cursor: pointer;
  user-select: none;
  font-weight: bold;
  font-size: 14px;
}

/* 하단 여백 */
.mb-30 {
  margin-bottom: 30px;
}
.mb-15 {
  margin-bottom: 15px;
}

.img-round {
  border-radius: 10px; /* 모서리를 라운드 처리 */
}


</style>
