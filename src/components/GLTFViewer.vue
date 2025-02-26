<template>
  <div class="renderer-box">
    <div ref="rendererContainer" class="renderer-container" >
      
      <!-- Top 메뉴 -->
      <!-- div v-show="divMenu.isShow" class="menu-container" v-stop-propagation>
        <button @click.stop="onMenuClick" data-index="91">CXARENA</button>
        <button @click.stop="onMenuClick" data-index="92">서버룸</button>
        <button @click.stop="onMenuClick" data-index="93">서버랙</button>
        <   !-- button @click.stop="onMenuClick" data-index="94">랙Old</button --    >

        <button @click.stop="onMenuClick" data-index="10">Camera</button>
        <button @click.stop="onMenuClick" data-index="11">Zoom</button>
        <button @click.stop="onMenuClick" data-index="9">FOV</button>
        <button @click.stop="onMenuClick" data-index="1">Rotation</button>
        <button @click.stop="onMenuClick" data-index="2">WireFrame</button>
        <button @click.stop="onMenuClick" data-index="3">Grid</button>
        <button @click.stop="onMenuClick" data-index="4">Preset</button>
        <button @click.stop="onMenuClick" data-index="5">Delete</button>
        <button @click.stop="onMenuClick" data-index="6">MSGShow</button>
        <button @click.stop="onMenuClick" data-index="7">MSGClear</button>
        <button @click.stop="onMenuClick" data-index="8">위치정보</button>
      </div -->

      <!-- 화면 Title 메뉴 -->
      <!-- div v-if="GNBar.isShow" class="gnb-container" v-stop-propagation>
        <div class="logo-box">
          <img src="@/assets/image/logo_header.png" alt="3D Conv Viewer" />
        </div>
      </div -->
      <GNBar class="gnb-container"
        v-if="GNBar.isShow"
        :style="{height : `${GNBar.height}px`}"
        :isAdmin="isAdmin"
        :modelId="modelId"
        :menuInfos="menuInfos"
        :isUpdate="GNBar.isUpdate"
        @setMenuClick="onMenuClick"        
        v-stop-propagation
      />

      <!-- 화면 좌측 Side 메뉴 -->
      <SNBar  class="snb-container"
        v-if="SNBar.isShow"
        :style="{
          height: `calc(100% - ${GNBar.isShow ? GNBar.height : 0}px`,
        }"
        :modelId="modelId"
        :state="state"
        @setMenuClick="onMenuClick"
        v-stop-propagation
      />
      <!-- height: `calc(100vh - ${GNBar.isShow ? GNBar.height : 0}px) -->

      <div class="mess-container" v-show="divEMsg.isShow" v-stop-propagation>
        <div class="mess-ctrl">
          <!-- button class="btn" @click="removeEMsgSelected()">선택 삭제</button -->
          <button class="mess-ctrl-btn" @click="removeEMsg(-1)">전체 삭제</button>
        </div>

        <div class="mess-box">
          <div class="mess-box-container">
            <div
              v-for="(message, index) in divEMsg.messages"
              :key="index"
              class="mess-box-group"
            >
              <!-- span class="mess-box-lable">
                <input type="checkbox" v-model="message.selected" />
              </span -->
              <span class="mess-box-lable">●</span>
              <span class="mess-box-tx">{{ message.text }}</span>
              <button class="mess-box-btn" @click="removeEMsg(index)">X</button>
            </div>
          </div>
        </div>
      </div>

      <!-- mslee editor example -->
      <div v-if="state.showInsertView" class="insert-sidebar" v-stop-propagation>
        <!-- Close Button (우측 상단에 배치) -->
          <div class="insert-header">
          <span class="insert-title">Insert Tool</span>
            <button @click="state.showInsertView = !state.showInsertView" class="insert-close-btn">닫기</button>
          </div>

          <div class="divider"></div>

        <!-- Content-->
        <EditorComponent/>
      </div>

      <!-- Circle Menu -->
      <CircleMenuComponent 
        v-show="menuVisible"
        :menu-x="menuX" 
        :menu-y="menuY"
        :isColliding="isColliding"
        :history="history"
        @menuItemClicked="handleCircleMenuClick" 
      ></CircleMenuComponent>

      <!-- 충돌 메시지 -->
      <div>
        <div v-if="isColliding" class="collision-message">
          {{ collisionMessage }}
        </div>
      </div>

      <transition name="fade">
        <div v-if="isMarkerModal" class="modal-overlay" @click.self="toggleCreateMarkerModel">
          <!-- <transition name="slide"> -->
            <div class="modal">
              <button class="close-btn" @click="toggleCreateMarkerModel">×</button>
              <span class="tag">3D 마커 생성</span>
              
              <h2>3D 텍스트 생성</h2>
              
              <div class="guide-message">
                <!-- <img src="@/assets/icons/info.svg" alt="info" class="info-icon"> -->
                <span>3D 마커는 특정 위치를 강조하거나, 사용자와 상호작용하는 요소로 활용할 수 있습니다.</span>
              </div>
              
              <div class="input-container">
                <input type="text" v-model="editorMarker3DText" placeholder="예시) 자동소화장치">
              </div>

              <div class="checkbox-container">
                <input type="checkbox" id="rotate-text" v-model="isTextRotating">
                <label for="rotate-text">텍스트 회전</label>

                <input type="checkbox" id="marker-add" v-model="isTextRotating">
                <label for="marker-add">마커추가</label>
              </div>
              
              <div class="button-group">
                <button class="button create" @click="create3DText">생성</button>

                <button class="button cancel" @click="toggleCreateMarkerModel">취소</button>
              </div>
            </div>
          <!-- </transition> -->
          
        </div>
      </transition>


      <!-- dat gui custom -->
      <EditorRightMenu
        :editSiderYn="editSiderYn"
        :menuVisible="menuVisible"
        :editMarkerTabYn="editMarkerTabYn"
        v-model:editorObject="editorObject"

        @scrollStart="handleScrollStart"
        @scrollEnd="handleScrollEnd"
        
        @toggleEditorRightMenu="toggleEditorRightMenu"
        @sendEditorObjectUpdate="handleEditorObjectUpdate"
      />



      <!-- mslee editor example -->
      

      <WidgetViewer
        v-if="divWidget.isShow"
        class="widget-container"
        :style="{
          top: `${GNBar.isShow ? GNBar.height + 5 : 5}px`,
        }"
        :targetObject="selObject"
        :userData="selUserData"
        @setMenuClick="onMenuClick"
        v-stop-propagation
      />

      <PageViewer
        v-if="divOverlap.isShow"
        class="overlap-container"
        :style="{
          top: `${GNBar.isShow ? GNBar.height + 5 : 5}px`,
        }"
        @setMenuClick="onMenuClick"
        @setCloseOverlap="closeOverlapPage"
        v-stop-propagation
      />

      <ContextMenu
        v-if="contextMenu.isShow"
        class="context-menu"
        :style="{
          top: `${contextMenu.position.y}px`,
          left: `${contextMenu.position.x}px`,
        }"
        :targetObject="selObject"
        @setMenuClick="onMenuClick"
        @setHideObject="hideObject"
        @setRemoveObject="removeObject"
        @setEMsgUser="addEMsgUser"
        @setCloseContextMenu="closeContextMenu"
      />

      <AttribSet
        v-if="divAttSet.isShow"
        class="atrrib-container"
        :style="{
          top: `${GNBar.isShow ? GNBar.height + 5 : 5}px`,
          right: `5px`,
        }"
        :targetObject="selObject"
        @setMenuClick="onMenuClick"
        v-stop-propagation
      />

      <MarkerSet
        v-if="divMarkSet.isShow"
        class="atrrib-container"
        :style="{
          top: `${GNBar.isShow ? GNBar.height + 5 : 5}px`,
          right: `5px`,
        }"
        :targetObject="selObject"
        @setMenuClick="onMenuClick"
        @setMarkerPrev="prevMarker"
        v-stop-propagation
      />

      <ObjAttribViewer
        v-if="divObjAttrib.isShow"
        class="atrrib-container"
        :style="{
          top: `${GNBar.isShow ? GNBar.height + 5 : 5}px`,
          right: `5px`,
        }"
        :targetObject="divObjAttrib.object"
        @setMenuClick="onMenuClick"
        v-stop-propagation
      />

      <div v-for="(item, index) in markObjects" :key="index">
        <D2MarkViewer
          v-if="item.isMarker2D && item.isShow"
          class="mark2d-container"
          :style="item.styleText"
          :targetObject="item"
          @setObjectClick="onObjectExt"
          @setMouseRightClick="onMouseRightClick"
          v-stop-propagation/>        
      </div>

    </div>
    
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import GNBar from "./GNBar.vue";  // GNB(Global Navigation Bar)를 보기 위한 Vue Import
import SNBar from "./SNBar.vue"; // GNB(Sider Navigation Bar)를 보기 위한 Vue Import
// import ChartViewer from "./ChartViewer.vue"; // Chart 보기를 위한 Vue Import
// import VideoViewer from "./VideoViewer.vue"; // Video 보기를 위한 Vue Import
import ContextMenu from "./ContextMenu.vue"; // Context Menu를 보기 위한 Vuew
import WidgetViewer from "./WidgetViewer.vue"; // Context Menu를 보기 위한 Vuew
import PageViewer from "./PageViewer.vue"; // Page 를 보기 위한 Vuew
import D2MarkViewer from "./D2MarkViewer.vue"; // Page 를 보기 위한 Vuew
import AttribSet from "./AttribSet.vue"; // Page 를 보기 위한 Vuew
import MarkerSet from "./MarkerSet.vue"; // Page 를 보기 위한 Vuew
import ObjAttribViewer from "./ObjAttribViewer.vue"; // Page 를 보기 위한 Vuew
import axios from "axios";
import CommUtil from "./comm/CommUtil.js"; // Logger 클래스를 import 합니다.
import Logger from "./comm/CommUtil.js"; // Logger 클래스를 import 합니다.

// mslee import Component

import EditorComponent from "./editor/EditorComponent.vue";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import * as dat from 'dat.gui';
import CircleMenuComponent from './editor/CircleMenuComponent';
import { Easing, Group, Tween } from "@tweenjs/tween.js";
import EditorRightMenu from "./editor/EditorRightMenu.vue";
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
// import { TextureUtils } from "three";

// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';


// import { ViewHelper } from 'three/examples/jsm/helpers/ViewHelper';

// mslee import Component

// const API_ROOT = "/api/"; // API를 조회 하기 위한 주소
// const SSE_ROOT = "/sse"; // API를 조회 하기 위한 주소
import {
  TMS_API_USE,
  API_ROOT,
  SSE_ROOT,
  TMS_API_MENU_LIST, TMS_API_MENU_INFO, TMS_API_GLB_DOWN,
  ASYNC_CHK_INTERVAL, ASYNC_CHK_MAX_LOOP
} from "./comm/global.js"; // 전역 Const 변수를 import

// const API_INIT = "/api/init";
// const APP_MENU_MARGIN = 30; // App.vue(nav-controls>height)에서 메뉴를 선언했을 때 Margin(Rander 사이즈 보상 위해 필요)

// 2D Marker를 화면에 표시 할 때 필요한 Offset
const MARK2D_OFFSET_X = 10; // 가로 축
const MARK2D_OFFSET_Y = 66; // 세로 축

export default {
  name: "GLTFViewer",
  components: {
    GNBar,
    SNBar,
    // ChartViewer,
    // VideoViewer,
    ContextMenu,
    WidgetViewer,
    PageViewer,
    D2MarkViewer,
    AttribSet,
    MarkerSet,
    ObjAttribViewer,
    EditorComponent,//mslee import component
    CircleMenuComponent,
    EditorRightMenu
  },
  props: {
    /*
    userType: {
      type: String,
      default: "",
    },
    modelId: {
      type: String,
      default: "",
    },
    */
  },
  data() {
    return {

      // mslee start
      marker3DAddYn: false,
      edtiorMarkerId: '',
      editorMarkerDescription: '',
      markerTargetMoving: null,

      viewHelper: null,

      saveParams: {
        trs: false,
        onlyVisible: true,
				binary: false,
				maxTextureSize: 4096
      },

      editMarkerTabYn: false,

      editorObject: {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 0, y: 0, z: 0 },
        name: 'Object Name',
        imgPath: '',
        marker: {
          font: '',
          size: 0,
          depth: 0,
          curveSegments: 0,
          bevelEnabled: false,
        }
      },

      /**
       * 에디터 우측 메뉴 사용 여부
       */
      editSiderYn: false,
      
      
      /**
       * 기존 마우스 우클릭 시 ContextMenu를 막기 위한 변수
       * 에디터 모드에서는 컨텍스트 메뉴를 보여주지 않기 위함
       */
      isEditMode: false,

      /**
       * 이 부분 애매함
       * selectedObject로 공통으로 쓸까 말까 고민중
       */
      selectedMarkerObject: null,


      /**
       * 텍스트가 카메라를 바라보게 할 여부
       */
      isTextRotating: false,

      
      editorMarker3DText: '',
      isMarkerModal: false,

      /**
       * tweenjs 사용을 위한 변수
       */
      tweenGroup: new Group(),

      /**
       * redo | undo 기능을 위해 객체 충돌, 위치, 회전 값을 담을 배열
       */
      history: [],

      /**
       * 충돌 감지 여부
       */
      isColliding: false,

      /**
       * 충돌 감지 시 "객체가 UPS_001"과 겹쳤습니다" 처럼 화면에 나타내기 위한 변수
       */
      collisionMessage: '',

      /**
       * CircleMenuComponent(Editor) 메뉴를 보여주는 여부를 위한 변수
       */
      menuVisible: false, 

      /**
       * CircleMenuComponent(Editor) Props로 주기 위한 변수
       * 메뉴 위치 값 X
       */
      menuX: 0,

      /**
       * CircleMenuComponent(Editor) Props로 주기 위한 변수
       * 메뉴 위치 값 Y
       */
      menuY: 0, 

      /**
       * transformControls 제어할 수 있는 변수
       * Editor에서 사용
       */
      selectedObject: null, // transformControls가 attch하기 위한 변수
      // mslee end

      gltfUrl: "",
      scene: null, // Scene 객체 선언
      camera: null,
      renderer: null,
      selObject: null,
      selUserData: null,

      isAdmin: false,
      userType: "",
      modelId: "",

      d3ContId: "",
      content: null,
      clips: [],

      hideObjects: [], // 숨김처리된 Object들 정보
      removeObjects: [], // 삭제 처리된 Object들 정보
      markObjects: [], // 3D Marker에 대한 객체 정보를 보관
      mark2dObjects: [], // 2D Marker에 대한 객체 정보를 보관
      activeObjects: [], // Active Object들에 대한 정보
      outlineObjects: [], // Outline을 그린 Object들에 대한 정보
      textureObjects: [], // Texture를 그리기 위한 Object
      
      font: null,
      eventSource: null,

      // gltfScene: null, // 현재 로드된 모델
      selectedObjectInfo: null,
      selectedObjectName: "",

      GNBar: {
        isShow: true,
        height: 68,
        isUpdate: false,
      },
      menuInfos : [], // 메뉴 정보를 보관할 배열
      SNBar: {
        isShow: true,
        width: 68,
      },
      divWidget: {
        isShow: false,
        isShow2: false,
        type:"",
        position: { x: 0, y: 0 },
        width: 200,
        height: 150,
        timer: null,
        timeout: 10000,
      },
      divInfo: {
        isShow: false,
        position: { x: 0, y: 0 },
        width: 200,
        height: 150,
        timer: null,
      },
      divChart: {
        isShow: false,
        position: { x: 0, y: 0 },
        width: 200,
        height: 150,
        target: "",
        url: "",
        timer: null,
      },
      divMenu: {
        isShow: false,
        position: { x: 0, y: 0 },
        timer: null,
        timeout: 5000,
      },
      divEMsg: {
        isShow: false,
        position: { x: 0, y: 0 },
        timer: null,
        messages: [],
        timeout: 20 * 1000,
        maxCount: 20, // 화면에서 관리할 최대 메세지 수, 0을 입력하면 제한 하지 않음
      },
      divVideo: {
        isShow: false,
        position: { x: 0, y: 0 },
        timer: null,
        timeout: 5 * 1000,
        width: 200,
        height: 150,
        target: "", // hls(http Live Stream) / youtube
        url: "",
      },
      divOverlap: {
        isShow: false,
        position: { x: 0, y: 0 },
        width: 1024,
        height: 768,
      },
      contextMenu: {
        isShow: false,
        position: { x: 0, y: 0 },
        timer: null,
        timeout: 5 * 1000,
      },
      viewActiveObject: {
        isShow: false,
        timer: null,
        timeout: 10 * 1000,
      },
      divAttSet: {
        isShow: false,
        isShow2: false,
        type:"",
        position: { x: 0, y: 0 },
        width: 600,
        height: 600,
        timer: null,
        timeout: 10000,
      },
      divMarkSet: {
        isShow: false,
        position: { x: 0, y: 0 },
        timer: null,
        timeout: 10000,
      },

      divObjAttrib: {
        isShow: false,
        object: null,
      },

      /*
      divMark2d: {
        isShow: false,
        position: { x: 100, y: 1000 },
        title: "2D 마크",
        descript: "2D 마크에 대한 설명입니다.",
        width: 1024,
        height: 768,
      },
      */
      morphs: [],
      currPresetIdx: 0, // 사용자가 선택한 위치의 Index
      presets: [],
      preset: {
        position: { x: 0, y: 2, z: 5 },
        /* rotation: { x: 0, y: 0, z: 0, order: 1 }, */ // quaternion만 사용하고, rotation은 사용하지 않음
        /* quaternion: { x: 0, y: 0, z: 0, w: 1 }, */
        target: { x: 0, y: 0, z: 0 }, // Control에 대한 Target
      },
      presetTimer: {
        timer: null,
        interval: 50, // Interval 한 Step 발생 주기 (ms)
        maxTime: 2000, // 총 Interval 가동 시간 (ms)
        currTime: 0, // 현재 Interval 실행 시간 (ms)
        offset: {
          position: { x: 0, y: 0, z: 0 },
          target: { x: 0, y: 0, z: 0 },
        },
        current: {
          position: { x: 0, y: 0, z: 0 },
          target: { x: 0, y: 0, z: 0 },
        },
        end: {
          position: { x: 0, y: 0, z: 0 },
          target: { x: 0, y: 0, z: 0 },
        },
      },
      state: {
        // async(주로 Loader 사용) 처리 상태 확인 후 선후 관체를 처리함
        // -1:초기 상태, 0:시작, 1:완료, 9:실패 (전체 동일)
        initAsyncTimer: null,
        initAsyncInterval: ASYNC_CHK_INTERVAL, // Timer 수행 주기 (단위 m/s)
        initAsyncCount: 0, // Timer 수행 횟수
        initAsyncRun: false,  // Async 관련 프로세스가 진행 중이라 다른 상태 체크가 필요 없는 경우
        initAsyncStop: false, // Async 체크 프로세스를 중간에 종료를 시켜야 되는 경우
        loadJSON: -1, // JSON 파일이 Load 상태
        loadGLTF: -1, // glb 파일의 Loading 상태
        loadFont: -1, // Font 파일의 Loading 상태
        loadTexture: -1, // Texture 파일의 Loading 상태
        loadBG: -1, // Background 파일의 Loading 상태

        countDTwin: -1,
        countActive: -1,
        countHide: -1,
        countMaterial: -1,
        countTexture:-1,
        countMarker:-1,
        countMarker2D:-1,
        countMarker3D:-1,

        isLoadAll: false,

        showMarker: false, // 마커를 보여 줄지 여부
        showWireframe: false, // Wire Frame 보여 줄지 여부
        showGrid: false, // 화면에 Grid를 보여 줄지 여부
        showAutoRotate: false, // 자동 회전을 할지 여부
        showHideObject: false, // 숨김 처리된 Object를 보여 줄지 여부
        showEMsg: false, // Event Message를 보여 줄지 여부
        showActiveObject: false, // Active Object를 보여 줄지 여부

        showRaycLine: false, // Raycaster Line을 표시 할지 여부
        // arrowHelper: null, // Raycaster Line을 표시할 객체

        isServerEvent: false,

        showInsertView: false, // mslee

        prevCamPos:null,  // 카메라 위치 변경을 감지하기 위해 이전 단계의 Camera 위치를 보관

        camera: {
          type: "Perspective", // JSON에서 설정된 Camera Type
          currType: "Perspective", // 현재 사용하고 있는 Camera Type
          fov: 50,
          near: 0.1,
          far: 1000,
          ortCoef: 5, // OrthographicCamera의 계수
          position:null,
        },

        activeDisplay: {
          type: "color", // Active 객체에 대한 Dispaly Type (color/outline/overdraw)
          color: 0x00ff00,
          lineWidth: 5,   // [outline] Line 굵기
          thresholdAngle: 1,  // [outline] 인접한 면의 면 법선 사이의 각도
          osFactor: -1,
          osUnits: -4,
        },
      },
      fov: {
        curr: 50,
        min: 20,
        max: 150,
        step: 10,
      },
      ortCoef: {
        curr: 5,
        min: 1,
        max: 20,
        step: 1,
      },
      zoom: {
        curr: 1,
        min: 0.1,
        max: 2,
        step: 0.1,
      },
    };
  },
  computed: {},
  watch: {
    modelId: {
      immediate: true, // 컴포넌트가 처음 로드될 때 watch가 즉시 실행
      handler(newVal) {
        console.log(`watch/handler modelId :${newVal}`);
        /*
        if (newVal) {
          // console.log(`watch/handler modelId :${newVal}`);
          // this.initRouter();
          // this.loadGLTF(newVal);
          this.d3ContId = newVal;
          this.loadGLTF(this.d3ContId);
        }
        */
      },
    },

    /*  "immediate: true" 속성 추가가 필요함
    modelId(newVal) {
      console.log(`watch > modelId : ${newVal}`);
      this.d3ContId = newVal;
      this.loadGLTF(this.d3ContId);
    },
    */

    /*
    divWidget(newVal) {
      console.log(`watch > divWidget : ${newVal}`)
    },
    divEMsg(newVal) {
      this.state.showEMsg = newVal.isShow;
      console.log(`watch > divEMsg : showEMsg ${this.state.showEMsg}`)
    },
    */
  },

  mounted() {
    /*
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css';
    document.head.appendChild(link);
    */

    // this.currentComponent();
    this.initRouter();
    this.initThree();


    // this.loadGLTF();
    this.addMouseEventListeners(); // 마우스 이벤트 리스너 추가
    this.addKeyboardEventListeners(); // 키보드 이벤트 리스너 추가
    // this.addServerSentEventListeners(); // SSE 메시지 수신 이벤트 리스너 추가
    window.addEventListener("resize", this.onWindowResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
    
    if(this.state.isServerEvent)  this.toggleServerSentEvent();
  },
  methods: {
    // 라우터 설정에 따라 초기화 JSON 파일 URL을 설정한다.
    initRouter() {
      console.log(`initRouter()`);
      // console.log(` - Router : ${this.$route}`);
      console.log(` - Router Name : ${this.$route.name}`);
      // console.log(` - initParam : ${this.initialParam}`);
      console.log(` - userType : ${this.$route.params.userType}`);
      console.log(` - modelId : ${this.$route.params.modelId}`);
      // console.log(` - isAdmin : ${this.isAdmin}`);

      this.userType = this.$route.params.userType; // 라우터에서 넘어온 모델 ID를 저장함
      if (this.userType == undefined || this.userType == "")  this.userType = "viewer";

      this.modelId = this.$route.params.modelId; // 라우터에서 넘어온 모델 ID를 저장함
      if (this.modelId == undefined || this.modelId == "") {
        this.modelId = TMS_API_USE ? "25" : "S02";
      }
      

      this.isAdmin = false;
      if(this.userType == "admin") this.isAdmin = true;

      // this.d3ContId = this.modelId;
      // this.loadGLTF(this.d3ContId);

      this.loadAPI(this.modelId);


      // async 함수들의 진행 상태를 기반으로 선/후 관계 기반으로 함수를 처리
      this.state.initAsyncTimer = setInterval(() => {
        this.setInitCheckAsync();
      }, this.state.initAsyncInterval);      


      /*
      if (this.modelId == "") {
        this.d3ContId = "S02";
        this.loadGLTF(this.d3ContId);
      }
      */

      /*/ 컨텐츠 ID가 없을 경우 "S02"를 사용하도록 함
      if (this.d3ContId == "") {
        this.d3ContId = "S02";
        this.loadGLTF(this.d3ContId);
      }
      */

    },

    // 3D 콘텐츠를 보여 주기 위한 씬, 카메라, 렌더러 생성
    initThree() {
      console.log(`initThree()`);

      // 씬, 카메라, 렌더러 생성
      const scene = new THREE.Scene();

      this.cameraPer = new THREE.PerspectiveCamera(
        this.fov.curr,
        this.$refs.rendererContainer.clientWidth /
          this.$refs.rendererContainer.clientHeight,
        0.9,
        1000
      );

      const renderer = new THREE.WebGLRenderer({ antialias: true });

      this.renderer = renderer; //mslee
      this.renderer.toneMappingExposure = 1.0;
  
      renderer.setSize(
        this.$refs.rendererContainer.clientWidth,
        this.$refs.rendererContainer.clientHeight
      );

      renderer.setPixelRatio(window.devicePixelRatio);
      this.$refs.rendererContainer.appendChild(renderer.domElement);


      // 후처리 관련 설정
      // const composer = new EffectComposer(renderer);
      // this.composer = composer;

      // const renderPass = new RenderPass(scene, this.cameraPer);
      // composer.addPass(renderPass);

      

      // 궤도 컨트롤을 사용하면 카메라가 대상 주위를 공전을 하기 위해서 사용
      const controls = new OrbitControls(this.cameraPer, renderer.domElement);
      controls.enableDamping = true;  // 마찰 추가
      controls.dampingFactor = 0.25;
      controls.screenSpacePanning = false; // 화면을 벗어나지 않도록 방지
      controls.maxPolarAngle = Math.PI / 2;  // 카메라 기울기 제한

      this.controls = controls; //mslee
      
      // controls.enableDamping = true;   // 애니메이션을 자연스럽게 하기 위해서 사용

      // 카메라 초기 위치 설정
      this.cameraPer.position.set(0, 2, 5);
      // camera.position.set(this.preset.camera);
      /*
      camera.position.set(
        this.preset.camera.x,
        this.preset.camera.y,
        this.preset.camera.z
      );
      */

      this.hemiLight = null;
      this.dirLight = null;

      /*
      // [조명] 하늘 색과 땅 색을 섞은 은은한 조명
      this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
      this.hemiLight.position.set(0, 20, 0);
      scene.add(this.hemiLight);

      // 기존의 DirectionalLight를 밝게 설정
      const intensity = 3;
      this.dirLight = new THREE.DirectionalLight(0xffffff, intensity);
      this.dirLight.position.set(5, 10, 7.5);
      scene.add(this.dirLight);
      */


      // Grid 추가
      this.gridHelper = new THREE.GridHelper(10, 10);
      this.gridHelper.visible = this.state.showGrid; // 초기에는 Grid가 보이지 않음
      scene.add(this.gridHelper);

      this.parentGroup = new THREE.Group();
      scene.add(this.parentGroup);

      // 씬과 카메라를 this에 저장
      this.scene = scene;
      this.camera = this.cameraPer;
      this.renderer = renderer;
      this.controls = controls;
      this.selObject = null; // 사용자가 선택한 Object 객체 저장

      // Raycaster와 마우스 벡터 생성
      this.raycaster = new THREE.Raycaster();
      this.raycaster.params.Mesh.threshold = 0.001; // precision (정밀도) 조정viewHelper.render(renderer);


      this.mouse = new THREE.Vector2();

      this.state.prevCamPos = this.camera.position.clone();


      // 공통 사용을 위해 밖으로 뺌
      this.gtlfLoader = new GLTFLoader();

      this.gltfExporter = new GLTFExporter();

      this.transformControls = new TransformControls(this.camera, renderer.domElement);
      this.transformControls.setSpace('local');
      scene.add(this.transformControls);

      const animate = () => {
        requestAnimationFrame(animate);

        // 만약 controls.enableDamping, controls.autoRotate 둘 중 하나라도 true로 설정될 경우 필수로 호출되어야 함
        controls.update();

        if(this.tweenGroup) {
          this.tweenGroup.update();
        }


        renderer.render(scene, this.camera);

        // 로드된 마커 및 텍스트 오브젝트를 카메라 기준으로 회전
        if( this.markObjects ) {
          this.markObjects.forEach((mark) => {
            mark.mObject.lookAt(this.camera.position);
          })
        }

        if (!this.camera.position.equals(this.state.prevCamPos)) {
          // console.log("Camera position has changed:", this.camera.position);

          // 2D Mark가 존재할 경우 Position을 Update 함
          if(this.state.countMarker2D > 0) this.updateMark2DPos();

          // Camera Position 변경을 체크 하기 위해 이전 단계의 Position 값을 저장
          this.state.prevCamPos.copy(this.camera.position);
        }

        // viewHelper.render(renderer);
      };
      animate();

      scene.add(new THREE.AxesHelper(10,10,10));

      /**
       * @author mslee
       * @evnet OrbitControls => start
       * 
       * @description OrbitControls zoom | move 가 시작될 때 발생하는 이벤트
       * 
       * /src/components/editor/CircleMenuComponent.vue
       * 컴포넌트에 props로 전달되는 변수 menuVisible을 false로 정의
       * 
       * @private 상태저장 tranformControls 로 변경 해야함;; 근데 왜 되냐
       */
       this.controls.addEventListener('start', () => {
        this.menuVisible = false;

        if (this.selectedObject) {
          // 충돌 정보가 있다면 이를 상태에 포함시켜 저장
          const collisions = this.collidingObjects ? [...this.collidingObjects] : [];

          // 현재 상태가 마지막으로 저장된 상태와 다른 경우에만 저장
          const lastSavedState = this.history.length > 0 ? this.history[this.history.length - 1] : null;

          // 선택된 객체와 마지막으로 저장된 객체를 비교
          if (!lastSavedState || !lastSavedState.position.equals(this.selectedObject.position) || 
              !lastSavedState.quaternion.equals(this.selectedObject.quaternion)) {

              // 상태 객체를 저장 (위치, 회전, 충돌 정보 포함)
              const objectState = {
                position: this.selectedObject.position.clone(),
                quaternion: this.selectedObject.quaternion.clone(),
                collisions: collisions // 충돌된 객체들
              };

              // history에 상태 저장
              this.history.push(objectState);
          }
        }
      });

      /**
       * @author mslee
       * @evnet OrbitControls => end
       * 
       * @description OrbitControls zoom | move 가 종료된 후 발생하는 이벤트
       * 
       * 종료된 후 this.selectedObject가 있다면 EditorMenu를 화면에 표시
       */
      this.controls.addEventListener('end', () => {
        if (this.selectedObject) {
          

            // 객체의 월드 좌표를 화면 좌표로 변환하여 메뉴 위치 업데이트
            const { x, y } = this.getScreenPosition(this.selectedObject);
            this.showUIForSelectedObject(x, y);
        }
      });


      /**
       * @author mslee
       * @event TransformControls => objectChange
       *  
       * @description transformControls에서 translate | rotate 로 객체 상태가 변화될 때 발생되는 이벤트
       */
      this.transformControls.addEventListener('objectChange', () => {

        if (this.transformControls.getMode() === 'rotate') {
            this.transformControls.setRotationSnap(Math.PI / 8); // 90도 스냅 적용 - 이거 메뉴에 추가해서 토글로 해야할듯?
        } else {
            this.transformControls.setRotationSnap(null); // 다른 모드에서는 스냅 해제
        }

        if(this.selectedObject) {

          const collidingObject = this.checkCollision(this.selectedObject, this.activeObjects);

          if (collidingObject) {
            this.isColliding = true;  // 충돌 상태 설정
            this.handleCollision(this.collidingObjects[0]);  // 충돌 메시지 처리
          } else {
            this.isColliding = false;  // 충돌 상태 해제
            // this.removeCollisionObjectBoundingBox;
          }
        }
      });

      /**
       * @author mslee
       * @event TransformControls => change
       *  
       * @description 커스텀 GUI 연동을 위한 함수로, 트랜스폼 컨트롤즈는 쿼터니언 속성을 사용하기에 변환
       */
      this.transformControls.addEventListener('change', () => {

        if(this.selectedObject) {
          this.selectedObject.rotation.setFromQuaternion(this.selectedObject.quaternion);

          if(this.selectedMarkerObject) {
            this.selectedMarkerObject.position.x = this.selectedObject.position.x;
            this.selectedMarkerObject.position.z = this.selectedObject.position.z;
          }

        }
      })

      /**
       * @author mslee
       * @event TransformControls => dragging-changed
       * 
       * @description transformCOntrols start / end 이후 발생되는 이벤트
       * tanslate | rotate  시작과 종료를 말함
       */
      this.transformControls.addEventListener('dragging-changed', (event) => {
          // 드래깅 중일 때 버튼을 숨깁니다.
          if (event.value) {

              this.isDragging = true;
              this.menuVisible = false;
          } else {
              this.isDragging = false;

              if (this.selectedObject) {
                // UI 표시
                const { x, y } = this.getScreenPosition(this.selectedObject);
                this.showUIForSelectedObject(x, y);
              }
        }

          this.controls.enabled = !event.value; // dragging 상태가 변경되면 OrbitControls 활성화 여부 조정
      });


      // 드래그 시작 시, 표시될 스타일 추가 mslee
      renderer.domElement.addEventListener('dragenter', (event) => {
        event.preventDefault();
      });

      // 드래그 중일 때
      renderer.domElement.addEventListener('dragover', (event) => {
        event.preventDefault(); // 드래그 가능하게 만듦
      });

      // 드래그가 끝났을 때 (드롭하지 않고 나간 경우)
      renderer.domElement.addEventListener('dragleave', () => {
        
      });

      // 드롭이 되었을 때
      renderer.domElement.addEventListener('drop', (event) => {
        event.preventDefault();

        const droppedData = event.dataTransfer.getData('text'); // 드래그된 데이터 가져오기

        /**
         * eslint 방지용
         * 
         * droppedData는 추후 GLTFLoader를 사용해 Glb/Gltf 모델링 파일을 로드할 때
         * this.gtlfLoader.load(`/editor/${dropperData}, (gltf) => {}) 이런식으로 사용할거임
         */
        console.log(`drop data ${droppedData}`); //eslint 방지용 - droppedData는 

        const message = document.getElementById('drag-message');

        if (message) {
            message.remove();
        }

        // this.gtlfLoader.load('/editor/chair1/old_wooden_chair.gltf', (gltf) => {
        this.gtlfLoader.load('/editor/chair2/chair.gltf', (gltf) => {

          gltf.scene.name = "singleGltf";
          const object = gltf.scene;
          object.scale.set(0.03, 0.03, 0.03);

          this.scene.add(object);

          this.selObject = object;

          this.activeObjects.push(this.selObject);

          this.selectObjectControl(object)

          // const { x, y } = this.getScreenPosition(this.selectedObject);

          // this.menuVisible = true;

          // this.showUIForSelectedObject(x, y);

          // this.historyInit();

          // this.createGUI(object, this.transformControls);
        })
        
        // mslee
      });
  },
 
  /**
   * @function handleCollision
   * @param collidingObject - 충돌 객체의 이름
   * 
   * @description param collidingObject는 checkCollision()에서 충돌된 Object.name을 담은 배열
   * 충돌시 메시지를 띄우는 메서드 
   */
  handleCollision(collidingObject) {

    // 충돌한 객체의 이름을 메시지로 설정
    this.collisionMessage = `⚠ 객체가 ${collidingObject || '알 수 없는 객체'}와 겹쳤습니다! 위치를 변경하세요.`;

    // 충돌 상태를 true로 설정하여 메시지 계속 표시
    this.isColliding = true;
  },

  /**
   * @function clearCollisionMessage
   * 
   * @description Vue <teamplate></template> 내의 추가한 Collision Message를 제거
   * 
   */
  clearCollisionMessage() {
    // 충돌 상태를 false로 설정하여 메시지 사라짐
    this.isColliding = false;
    this.collisionMessage = '';
  },


  /**
   * @function visualizeBoundingBox
   * @param object 
   * @param color 
   * 
   * @description THREE.BoxHelper를 사용해 BoundingBox를 생성 | 변경
   * 
   * 충동 여부에 따라 BoundingBox를 color 값을 적용
   */
  visualizeSelectedObjectBoundingBox(object, color) {

    // 기존의 BoxHelper가 있다면 제거
    if (this.selectedBoxHelper) {
        // BoxHelper의 색상이 다르면 업데이트
        if (color !== this.selectedBoxHelper.material.color.getHex()) {
            this.selectedBoxHelper.material.color.set(color); // 색상 변경
        }
        this.selectedBoxHelper.update(); // BoxHelper 업데이트
    } else {
        // 새로운 BoxHelper 생성
        this.selectedBoxHelper = new THREE.BoxHelper(object, color);  // 전달받은 색상으로 BoxHelper 생성
        this.scene.add(this.selectedBoxHelper);
      }
  },

  /**
   * @ignore 현재 사용하지 않고는 있음 테스트용
   * @function visualizeCollisionObjectBoundingBox
   * @param object 
   * @param color 
   * 
   * @description 임시용 - 어떤 객체랑 충돌이 일어나는지 확인하기 위해 만든 함수
   * 
   * 충돌 객체가 하나만 있지 않을수도 있기 때문에 다수로 처리하던가 추가적인 작업 필요
   */
  visualizeCollisionObjectBoundingBox(object, color) {
    // 기존의 BoxHelper가 있다면 제거
    if (this.collisionBoxHelper) {
        // BoxHelper의 색상이 다르면 업데이트
        if (color !== object.material.color.getHex()) {
          object.material.color.set(color); // 색상 변경
        }
        object.update(); // BoxHelper 업데이트
    } else {
        // 새로운 BoxHelper 생성
        object = new THREE.BoxHelper(object, color);  // 전달받은 색상으로 BoxHelper 생성
        this.scene.add(object);
      }
  },

  /**
   * @ignore 현재 안씀 지워도 상관없음
   * @function removeCollisionObjectBoundingBox
   * @param object 
   * 
   * 
   * @description visualizeCollisionObjectBoundingBox 임시로 사용했던 BoxHelper를 제거하기 위한 용도
   */
  removeCollisionObjectBoundingBox(object) {
    // 충돌이 없을 때 해당 BoxHelper를 제거
    if (this.collisionBoxHelpers && this.collisionBoxHelpers[object.uuid]) {
        const boxHelper = this.collisionBoxHelpers[object.uuid];

        // 씬에서 제거하고 BoxHelper 객체 삭제
        this.scene.remove(boxHelper);
        delete this.collisionBoxHelpers[object.uuid];
    }
  },

  /**
   * @function checkCollision
   * @param object 
   * @param objects 
   * objects 는 this.active
   */
  checkCollision(object, objects) {

      // 선택한 객체의 Bounding Box를 업데이트
      const selectedBox = new THREE.Box3().setFromObject(object);
      
      // 충돌된 객체를 추적할 배열
      this.collidingObjects = [];

      this.visualizeSelectedObjectBoundingBox(object, 0xff0000);


      // 다른 객체들과 충돌 여부를 확인
      for (let i = 0; i < objects.length; i++) {
          const obj = objects[i];

          // 객체의 UUID 확인 (디버깅용)
          // console.log('Checking collision between:', object.uuid, 'and', obj.uuid);

          // 선택된 객체와 비교하여 동일한 객체는 배제
          if (object.uuid === obj.uuid) {
              continue; // 동일한 객체는 충돌 체크를 생략
          }

          const objectBox = new THREE.Box3().setFromObject(obj);
          if(selectedBox.intersectsBox(objectBox)) {
            this.collidingObjects.push(obj.name)

            this.visualizeSelectedObjectBoundingBox(object, 0xff0000);
            // this.visualizeCollisionObjectBoundingBox(obj, 0xff0000);
          }
      }

      // 충돌이 없으면 false 반환
      if (this.collidingObjects.length === 0) {
          this.collidingObjects = []
          this.visualizeSelectedObjectBoundingBox(object, 0x00ff00);
          return false;
      }

      return true;
  },


  /**
   * @function getScreenPosition
   * @param object 
   * Editor에서 객체 이동 후 메뉴를 객체 위치에 맞게 표현하기위한 position 계산 함수
   */
   getScreenPosition(object) {
    const vector = new THREE.Vector3();

    // 3D 공간에서 객체 위치 업데이트
    object.updateMatrixWorld();
    vector.setFromMatrixPosition(object.matrixWorld);

    // 카메라 기준으로 화면 좌표로 변환
    vector.project(this.camera);

    // 렌더러 크기를 기반으로 절반 너비, 절반 높이 계산
    const widthHalf = this.renderer.domElement.clientWidth / 2;
    const heightHalf = this.renderer.domElement.clientHeight / 2;

    // 화면상의 픽셀 위치로 변환
    const x = (vector.x * widthHalf) + widthHalf;
    const y = -(vector.y * heightHalf) + heightHalf;

    // 메뉴 조정 값(여기서 원하는 만큼 조정)
    const menuOffsetX = -200; // 필요에 따라 조정 가능
    const menuOffsetY = -250; // 필요에 따라 조정 가능

    return { x: x + menuOffsetX, y: y + menuOffsetY };
  },



  /**
   * @function showUIForSelectedObject
   * @param x 
   * @param y 
   * TransformControls | OrbitControls 이후 객체 위치에 맞게 Editor 메뉴를 보여주는 함수
   */
  showUIForSelectedObject(x, y) {
    if (this.selectedObject) {
      const screenPosition = new THREE.Vector3();
      this.selectedObject.getWorldPosition(screenPosition);
      screenPosition.project(this.camera);

      this.menuX = x;
      this.menuY = y;
      this.menuVisible = true;
    }
  }, 

  /**
   * @function selectObjectControl
   * @param obj Three.Mesh | THREE.Object3D | THREE.Group
   * 
   * 
   * @description 마우스 우클릭을 통한 ContextMenu에서 이동하기 버튼을 눌렀을 때 이벤트
   * onMenuClick case 96
   * 
   * *** 취소함수도 만들어야함
   * 
   * 해결해야할 사항
   * 
   * 1. 지금 Drop된 모델을 제어하는데 문제가 있어서 파트장님 insObject 가져오는 부분 직접적으로 변경함
   * 만약 단독모델이 이 구조가 아니라면 제어하기 힘들어질수도 있긴할듯?
   * 
   * let parent = object.parent;
   * 
   * if (parent && parent.name === "singleGltf") {
   *  console.log(`Selected object from the 'singleGltf' group: ${object.name}`);
   *  break;
   * }
   * 
   * if (parent && parent.parent && parent.parent.name === "singleGltf") {
   *  console.log(`Selected object from the 'singleGltf' group's child: ${object.name}`);
   *  object = object.parent.parent;
   *  break;
   * }
   * 
   * 2. 객체 이동이 텍스트 메쉬도 포함되니 어느정도 구분을 해줘야할듯?
   * 
   * 3. 지금 selectObjectControl은 따로 인자를 받지 않고 this.selObject만을 사용하는데 인자를 주고 this.selObject 종속성을 없애는것도 방법임
   * 
   * 
   * 
   * 해결된 사항
   * 1.drop된 모델이 될 수 있는 상황도 있음
   * 만약에 객체 우클릭 -> 이동하기 -> 객체선택 -> Drag&Drop 이벤트 발생되면
   * 로드되기전에 조작했던 object가 제어됨
   */
  selectObjectControl(obj) {

    if(!(obj instanceof THREE.Mesh || obj instanceof THREE.Object3D || obj instanceof THREE.Group)) return;

    this.history = [];

    // 다른 객체를 우선 저장
    if(this.selectedObject) {
      this.handleCircleMenuClick('save')
      
      // 이 부분도 자주 쓰이긴 하는데 공통으로 빼도 괜찮을듯
      this.scene.remove(this.selectedBoxHelper); // 씬에서 BoxHelper 제거
      this.selectedBoxHelper.geometry.dispose(); // BoxHelper의 geometry 제거
      this.selectedBoxHelper.material.dispose(); // BoxHelper의 material 제거
      this.selectedBoxHelper = null; // 참조 초기화
    } else {

      if(obj.userData.isMarker) {
        this.transformControls.position.y = (obj.position.y -2);
      } else {
        this.transformControls.position.y = obj.position.y;
        this.transformControls.attach(obj);

      }

    }

    this.selectedObject = obj; // selObject는 우클릭으로 이벤트로 받아온 Three 객체

    this.transformControls.attach(obj);

    this.contextMenu.isShow = false; // 마우스 우클릭 - 컨텍스트 메뉴 false
    this.isEditMode = true; 

    // 우측 에디터 데이터 매핑
    this.editorObject.position = obj.position;
    this.editorObject.rotation = obj.rotation;
    this.editorObject.scale = obj.scale;
    this.editorObject.name = obj.name;

    this.editSiderYn = true; // 우측 에디터 메뉴 Open


    const { x, y } = this.getScreenPosition(obj);

    this.menuVisible = true;

    this.showUIForSelectedObject(x, y);

    if(obj.userData.isIncludeMarker) {
      this.markObjects.some((mark) => {
        if(mark.mObject.uuid === obj.userData.connectId) {
          this.selectedMarkerObject = mark.mObject;

          this.editorObject.marker = {
            size: this.selectedMarkerObject.geometry.parameters.options.size,
            depth: this.selectedMarkerObject.geometry.parameters.options.depth,
            curveSegments : this.selectedMarkerObject.geometry.parameters.options.curveSegments,
            bevelEnabled: this.selectedMarkerObject.geometry.parameters.options.bevelEnabled
          }

          console.log(this.selectedMarkerObject)

        }
      })

      this.editMarkerTabYn = true;
    }

  },



  /**
   * @function handleCircleMenuClick
   * @param menuItem 
   * 
   * @description handleCircleMenuClick은 CircleMenuComponent.vue 작성
   * 
   * CircleMenu(EditorMenu) 클릭 시 클릭 이벤트를 진행하는 함수
   * 
   * 진행중인 사항
   * 파트장님 마우스 우클릭 이벤트할 때 Raycaster transformControls 필터 시켜야함 여기서 막힘!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   * 
   * 추가해야할 사항들로는
   * 1. save된 객체는 this.activeObject 배열에 추가해서 충돌감지할수 있도록 하는 부분
   * 2. 객체가 겹쳐서 메시지가 띄어진 상태에서 삭제하면 메시지가 남아있음 이거 처리해야함
   * 
   * 완료 사항
   * isColliding 변수 즉, 충돌이 감지될 때 저장 버튼을 막기 | 표시
   */
  handleCircleMenuClick(menuItem) {
    switch(menuItem) {
      case "save":

        console.log(`position x : ${this.selectedObject.position.x}`);
        console.log(`position y : ${this.selectedObject.position.y}`);
        console.log(`position z : ${this.selectedObject.position.z}`);
        console.log(`rotation x : ${this.selectedObject.rotation.x}`);
        console.log(`rotation y : ${this.selectedObject.rotation.y}`);
        console.log(`rotation z : ${this.selectedObject.rotation.z}`);

        this.activeObjects.push(this.selectedObject)

        if(this.selectedBoxHelper) {
          this.scene.remove(this.selectedBoxHelper);

          this.selectedBoxHelper.geometry.dispose(); // BoxHelper의 geometry 제거
          this.selectedBoxHelper.material.dispose(); // BoxHelper의 material 제거
          this.selectedBoxHelper = null;

        }

        this.transformControls.detach();
        this.transformControls.position.y = 20;
        // this.transformControls.enabled = false;

        this.saveObject = this.selectedObject.clone(); //임시 테스트

        this.selectedObject = null;
        this.menuVisible = false;
        this.isEditMode = false;

        this.editSiderYn = false;

        this.selectedMarkerObject = null;

        // 우측 에디터 메뉴 마커 탭 활성화 여부
        this.editMarkerTabYn = false;

        // this.options = {
        //   trs: true,
        //   binary: true,
        //   maxTextureSize: 1024,
        //   onlyVisible: true
        // };

        this.gltfExporter.parse(this.saveObject, (gltf) => {

          if(gltf instanceof ArrayBuffer) {
            console.log(gltf)
            this.save( new Blob( [ gltf ], { type: 'application/octet-stream' } ), "scene.glb" );
          } else {
            console.log(gltf)

            const output = JSON.stringify( gltf, null, 2 );
            // this.save( new Blob( [ output ], { type: 'text/plain' } ), "scene.gltf" );
            this.save( new Blob( [ output ], { type: 'application/json' } ), "scene.gltf" );
          }


          // const formData = new FormData();
          // formData.append('file', glbBlob, 'test_001');

          // // API 서버에 POST 요청
          // fetch('http://127.0.0.1:3000/files/upload', {
          //     method: 'POST',
          //     body: formData,
          // })
          // .then(response => response.json())
          // .then(data => {
          //     console.log('File upload successful:', data);
          // })
          // .catch(error => {
          //     console.error('File upload failed:', error);
          // });

        }, (err) => {
          console.log('Gltf/Glb 내보내기 실패', err);
        }
        ,this.options)
        

        break;
      case "delete":

        //내 기능 + ContextMenu delete 이벤트 메서드 사용해도 됨 아직은 안함
        if(this.selectedObject) {
          // BoxHelper 제거
          if (this.selectedBoxHelper) {
              this.scene.remove(this.selectedBoxHelper);
              this.selectedBoxHelper.geometry.dispose();
              this.selectedBoxHelper.material.dispose();
              this.selectedBoxHelper = null;
          }

          this.transformControls.detach();

          // 부모 그룹이 존재하면 부모로부터 자식 객체 제거
          if (this.selectedObject.parent) {
              this.selectedObject.parent.remove(this.selectedObject);
          }

          // 선택된 객체의 자식 및 메모리 해제
          this.selectedObject.traverse((child) => {
              if (child.isMesh) {
                  child.geometry.dispose();  // 기하학 해제
                  if (child.material.map) {
                      child.material.map.dispose();  // 텍스처 해제
                  }
                  child.material.dispose();  // 재질 해제
              }
          });

          this.scene.remove(this.selectedObject);

          // activeObjects에서 해당 객체 제거
          this.activeObjects = this.activeObjects.filter(obj => obj !== this.selectedObject);
          
          this.selectedObject = null;
          this.menuVisible = false;
          
          this.isEditMode = false;

          this.editSiderYn = false;
          this.clearCollisionMessage();

          this.selectedMarkerObject = null;

          // 우측 에디터 메뉴 마커 탭 활성화 여부
          this.editMarkerTabYn = false;


          

        }
        break;
      case "undo":
        console.log("undo");
        if(this.history.length > 0) {

          const lastState = this.history.pop();

          this.selectedObject.position.copy(lastState.position);
          this.selectedObject.quaternion.copy(lastState.quaternion);

          if(lastState.collisions.length > 0) {
            this.isColliding = true;
            this.handleCollision(lastState.collisions[0]);

            this.visualizeSelectedObjectBoundingBox(this.selectedObject, 0xff0000);
          } else {
            this.isColliding = false;
            this.clearCollisionMessage();
            this.visualizeSelectedObjectBoundingBox(this.selectedObject, 0x00ff00);
          }


          if (this.selectedObject) {
            const { x, y } = this.getScreenPosition(this.selectedObject);
            this.showUIForSelectedObject(x, y);
          }
          

        } else {
          alert("이전 상태가 없음")
        }

        // this.menuVisible = false;
        break;
      case "rotate":
        this.transformControls.setMode('rotate')
        break;
      case "move":
        this.transformControls.setMode('translate')
        break;
      default:
        console.log("알 수 없는 항목")
    }
  },

  save(blob, filename) {
    const link = document.createElement( 'a' );
    link.style.display = 'none';
    document.body.appendChild( link );

    link.href = URL.createObjectURL( blob );
    link.download = filename;
    link.click();

    document.body.removeChild(link);

    const formData = new FormData();
    formData.append('file', blob, filename);

    // API 서버에 POST 요청
    fetch('http://127.0.0.1:3000/files/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('File upload successful:', data);
    })
    .catch(error => {
        console.error('File upload failed:', error);
    });
  },

  /**
   * 우선 markObject넣어야 함
   */
  create3DText() {
    if (!this.editorMarker3DText.trim()) {
      alert("텍스트를 입력하세요");
      return;
    }


    // ✅ 1. 텍스트 지오메트리 생성
    const textGeometry = new TextGeometry(this.editorMarker3DText, {
      font: this.font,
      size: 0.18,
      depth: 0.02,
      curveSegments: 12,
      bevelEnabled: false,
    });

    textGeometry.computeBoundingBox();
    textGeometry.center(); // ✅ 텍스트 중앙 정렬


    // ✅ 2. Bounding Box 크기 가져오기
    const bbox = textGeometry.boundingBox;
    const textHeight = bbox.max.y - bbox.min.y; // 텍스트 높이 계산

    // ✅ 3. 텍스트 메시 생성
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    this.scene.add(textMesh);

    // ✅ 4. 선택한 객체의 위치를 기반으로 텍스트 배치
    if (this.selObject) {
      textMesh.position.set(
        this.selObject.position.x,
        this.selObject.position.y + textHeight + 2, //우선 뭐 이거 거의 하드코딩이라고 봐야함
        this.selObject.position.z
      );
    }

    // if(this.isTextRotating) {
    let markObject = {
      name: this.editorMarker3DText,
      isShow: true,    // 초기 보기 설정이 true일 경우
      isMarker2D:false,
      mObject: textMesh,    // 2D/3D 공통
      sphere: null,     // 3D Marker Only
      line: null,       // 3D Marker Only
      // textMesh: null,   // 3D Marker Only
      styleText: "",    // 2D Marker Only
      connect: this.selObject.uuid
    };

    markObject.mObject = textMesh;

    textMesh.userData = {
      isMarker: true,
      connet: this.selObject.uuid,
      name: this.editorMarker3DText
    }

    this.markObjects.push(markObject);
    // }

    this.selObject.userData.isIncludeMarker = true;
    this.selObject.userData.connectId = textMesh.uuid;


    // ✅ 5. Bounding Box 시각화 (디버깅용)
    // const bboxHelper = new THREE.BoxHelper(textMesh);
    // bboxHelper.material.color.set(0xff0000);
    // this.scene.add(bboxHelper);
    // bboxHelper.update();

    // ✅ 6. 카메라 위치 설정
    const distanceFromText = 3; // 텍스트에서 떨어진 거리
    const cameraPosition = {
      x: textMesh.position.x + distanceFromText,
      y: textMesh.position.y + distanceFromText,
      z: textMesh.position.z + distanceFromText
    };


    // ✅ 7. 카메라 애니메이션 (Tween 사용)
    const cameraTween = new Tween(this.camera.position)
      .to(cameraPosition, 2000)
      .easing(Easing.Quadratic.InOut)
      .onUpdate(() => {
        this.cameraPer.lookAt(textMesh.position.clone());
      })
      .onComplete(() => {
        this.controls.target.set(textMesh.position.x, textMesh.position.y, textMesh.position.z);
        this.controls.update();
      })
      .start();


    this.selectedMarkerObject = textMesh;

    // this.selectedObject = textMesh;
    // this.selectObjectControl(textMesh);

    // this.selectMarkerObjectControl(textMesh)
    this.selectObjectControl(textMesh)

    // this.selectMarkerObjectControl();

    this.tweenGroup.add(cameraTween);

    // ✅ 8. 모달 닫기
    this.isMarkerModal = false;
  },

  /**
   * @function handleScrollStart
   * 
   * @description EditRightMenu에서 사용되는 Input type=range 스크롤링 핸들 이벤트
   * 따로 시작 종료를 알 수 없기에 직접 만듬
   */
  handleScrollStart() {
    console.log('Scroll started');
    this.menuVisible = false;

    const collisions = this.collidingObjects ? [...this.collidingObjects] : [];

    const objectState = {
      position: this.selectedObject.position.clone(),
      quaternion: this.selectedObject.quaternion.clone(),
      collisions: collisions // 충돌된 객체들
    };

    this.history.push(objectState);

    // 스크롤 시작 시 실행할 로직 추가
  },

  /**
   * @function handleScrollEnd
   * 
   * @description EditRightMenu에서 사용되는 Input type=range 스크롤링 핸들 이벤트
   * 따로 시작 종료를 알 수 없기에 직접 만듬
   */
  handleScrollEnd() {
    console.log('Scroll ended');
    if(this.selectedObject) {
      const { x, y } = this.getScreenPosition(this.selectedObject);
      this.menuVisible = true;

      this.showUIForSelectedObject(x, y);

      const collisions = this.collidingObjects ? [...this.collidingObjects] : [];

      // 현재 상태가 마지막으로 저장된 상태와 다른 경우에만 저장
      const lastSavedState = this.history.length > 0 ? this.history[this.history.length - 1] : null;

      // 선택된 객체와 마지막으로 저장된 객체를 비교
      if (!lastSavedState || !lastSavedState.position.equals(this.selectedObject.position) || 
          !lastSavedState.quaternion.equals(this.selectedObject.quaternion)) {

          // 상태 객체를 저장 (위치, 회전, 충돌 정보 포함)
          const objectState = {
            position: this.selectedObject.position.clone(),
            quaternion: this.selectedObject.quaternion.clone(),
            collisions: collisions // 충돌된 객체들
          };

          // history에 상태 저장
          this.history.push(objectState);
      }

    }
    // 스크롤 끝났을 때 실행할 로직 추가
  },

  /**
   * @function toggleCreateMarkerModel
   * 
   * @description 마우스 우 클릭 후 "3D마커추가" 클릭 이벤트 
   * case 97번에 해당하는 메뉴 이벤트
   */
   toggleCreateMarkerModel() {
    this.isMarkerModal = !this.isMarkerModal;

    if(!this.isMarkerModal) {
      this.contextMenu.isShow = true;
      this.isEditMode = false;
      
    } else {
      this.contextMenu.isShow = false;
      this.isEditMode = true;

      /** 여기서 넣어줘야함 */
      // this.selectedMarkerObject = this.selObject;
    }
    
  },
  closeEditorMarkerAddBoard() {
    // this.isMarkerModal = false;
  },

  /**
   * @function toggleEditorRightMenu
   * 
   * @description 에디터 툴 토글 함수
   */
  toggleEditorRightMenu() {
    this.editSiderYn = !this.editSiderYn;
  },


  /**
   * @function toggleInsertModal
   * 
   * @description onMenuClick switch문 case 95 에 해당하는 이벤트로
   * 객체 삽입 Sider를 toggle하는 함수
   */
  toggleInserModal() {
    this.state.showInsertView = !this.state.showInsertView;
  },

  /**
   * @function handleEditorObjectUpdate
   * @param updateObject 
   * 
   * @description dat.gui 커스터마이지증로 제작하기 위한 자식 컴포넌트 업데이트용 함수
   * 
   * 양방향 통신으로 부모 컴포넌트에 적긴 했는데
   * 이거 없으면 양방햔 통신이 안됨
   * 
   * 예로 에디터 Scene에서 TransformControls조작된 수치가 에디터 툴에 반영되지 않아짐
   */
  /* eslint-disable no-unused-vars */
  handleEditorObjectUpdate(_) { 
    const collidingObject = this.checkCollision(this.selectedObject, this.activeObjects);

    if (collidingObject) {
      this.isColliding = true;  // 충돌 상태 설정
      this.handleCollision(this.collidingObjects[0]);  // 충돌 메시지 처리
    } else {
      this.isColliding = false;  // 충돌 상태 해제
    }
  },
  /* eslint-disable no-unused-vars */



  /**
   * @function createGUI 현재는 커스터마이징해서 안쓰려고함
   * @param object 
   * @param transformControls
   * 
   * @description Drag & Drop 으로 객체 삽입 후 dat.gui 라이브러리르 사용해
   * gui로 제어할 수 있는 제어 폼을 생성
   * 
   * 이거는 this.selectedObject 여부에 따라 생성/제거 기능이 필요해보임 
   */
  createGUI(object, transformControls) {
    // 새로운 GUI 인스턴스 생성
    const gui = new dat.GUI();

    // 객체의 속성을 조정할 수 있는 폴더 만들기
    const positionFolder = gui.addFolder('Position');
    positionFolder.add(object.position, 'x', -10, 10).step(0.1);
    positionFolder.add(object.position, 'y', -10, 10).step(0.1);
    positionFolder.add(object.position, 'z', -10, 10).step(0.1);
    positionFolder.open();

    const rotationFolder = gui.addFolder('Rotation');
    rotationFolder.add(object.rotation, 'x', 0, Math.PI * 2).step(0.01);
    rotationFolder.add(object.rotation, 'y', 0, Math.PI * 2).step(0.01);
    rotationFolder.add(object.rotation, 'z', 0, Math.PI * 2).step(0.01);
    rotationFolder.open();

    const scaleFolder = gui.addFolder('Scale');
    scaleFolder.add(object.scale, 'x', 0.01, 5).step(0.01);
    scaleFolder.add(object.scale, 'y', 0.01, 5).step(0.01);
    scaleFolder.add(object.scale, 'z', 0.01, 5).step(0.01);
    scaleFolder.open();

      // GUI의 위치를 변경
    const guiDomElement = gui.domElement;
    guiDomElement.style.position = 'absolute'; // 절대 위치
    guiDomElement.style.right = 0;
    guiDomElement.style.top = '68px';

    const guiContainer = document.getElementById('gui-container');
    guiContainer.appendChild(gui.domElement);

    // TransformControls의 모드 변경에 따라 GUI 업데이트
    transformControls.addEventListener('change', () => {
        gui.updateDisplay();
    });
  },
    

    


    // Backend API에서 GLB 파일 정보 및 설정 정보를 조회
    async loadAPI(modelId) {

      let apiUrl = API_ROOT + modelId;

      this.state.loadJSON = 0; // JSON Loader [시작]
      this.state.initAsyncRun = true;

      this.menuInfos = [];
      let baseUrl = (this.isAdmin) ? "/admin/" : "/viewer/";
      let useLocalApi = true;

      // TMS API를 사용하여 값을 조회할 경우
      if(TMS_API_USE) {

        // 전체 메뉴 목록을 조회
        apiUrl = TMS_API_MENU_LIST;

        // API 호출 시 파라미터 추가
        // [임시] 검색 조건으로 사용 (향후 Group Id로 변경 필요)
        // apiUrl += ;

        console.log(`loadAPI(${modelId}) : ${apiUrl}`);

        try {

          const response = await axios.get(apiUrl);
          
          // 정상적으로 API Data를 Read 하였을 경우
          if(response.data.code == 200) {

            // 메뉴 목록을 조회
            const menuList = response.data.result.list;
            menuList.forEach((jData) => {
              if(jData.seq > 0) {

                // console.log("loadAPI() : ", jData.name, jData.description);
                const menu = {
                  id : jData.seq,
                  title : jData.name,
                  description :  jData.description,
                  target : `${baseUrl}${jData.seq}`,
                };
                this.menuInfos.push(menu);

              }
              else {
                // console.log("loadAPI() Skip seq : ", jData.seq);
              }
            });


            // 선택된 모델에 대한 상세 내용을 조회 (GLB / 환경 설정 JSON)
            const apiUrl2 = TMS_API_MENU_INFO + modelId;
            console.log(`loadAPI(${modelId}) : ${apiUrl2}`);

            const response2 = await axios.get(apiUrl2);

            if(response2) {

            // 정상적으로 API Data를 Read 하였을 경우
              if(response2.data.code == 200) {

                this.initState = response2.data.result.settingsJson;

                const fileId = response2.data.result.glbAtchFileId;
                this.gltfUrl = TMS_API_GLB_DOWN + fileId;

                console.log(`loadAPI(${modelId}) Step2 : ${this.gltfUrl}`);

                useLocalApi = false;
              }
              else {
                console.log(`loadAPI(${modelId}) Step2 : HTTP Code ${response2.data.code}`);
                this.initAsyncStop = true;
              }

            }
            else {
              console.log(`loadAPI(${modelId}) Step2 : API Data Read Error`);
              this.initAsyncStop = true;  // Async 체크 프로세스를 종료
            }

          }
          else {
            console.log(`loadAPI(${modelId}) : HTTP Code ${response.data.code}`);
            this.initAsyncStop = true;  // Async 체크 프로세스를 종료
          }

        }
        catch(error) {
          console.log(`loadAPI(${modelId}) : Exception`);
          console.log(error);
          this.initAsyncStop = true;
          this.state.initAsyncRun = false;
        }

      }

      // 자체 API를 사용할 경우
      if(useLocalApi) {

        apiUrl = API_ROOT + modelId;

        console.log("loadAPI() Local API 사용");

        const response = await axios.get(apiUrl);
        this.initState = response.data;

        this.gltfUrl = this.initState.main3DFile; // 3D 콘텐츠 파일 경로
      
        // GNB에서 구성할 메뉴를 설정 (향후 API를 사용하도록 변경 필요)
        let menu = { id : "S01", title : "CX-ARENA", target : `${baseUrl}S01`, };
        this.menuInfos.push(menu);
        menu = { id : "S02", title : "서버룸", target : `${baseUrl}S02`, };
        this.menuInfos.push(menu);
        menu = { id : "S03", title : "서버랙", target : `${baseUrl}S03`, };
        this.menuInfos.push(menu);

      }

      this.state.initAsyncRun = false;
      this.state.loadJSON = 1; // JSON Loader [완료]

    },


    // GLB/GLTF 파일을 로드하여 콘텐츠를 생성
    loadGLTF() {
      this.state.loadGLTF = 0; // GLFT Loader [시작]

      try {
        // 외부 서버에서 glTF 파일 경로 받아오기
        // const modelUrl = API_ROOT + modelId;
        // console.log(`loadGLTF(modelId) URL : ${modelUrl}`);

        // 이전에 Loading된 모델이 있을 경우 제거를 함
        if (this.content) {
          // this.clearGLTF();
          // this.gltfScene.updateMatrixWorld();
          // this.clearGLTF(this.gltfScene);
          // this.gltfScene = null;
          // this.scene.remove(this.gltfScene);
          // this.gltfScene = null;
          // console.log(`loadGLTF(${modelId}) scene.remove`);
        }

        /*
        if (this.currentModel) {
          this.clearGLTF();
          // this.scene.remove(this.currentModel);
          this.currentModel = null;
          console.log(`loadGLTF() scene.remove`);
        }
        */

        // this.state.loadJSON = 0; // JSON Loader [시작]
        // const response = await axios.get(modelUrl);
        // this.initState = response.data;

        if (this.initState) {
          // this.state.loadJSON = 1; // JSON Loader [완료]

          // const gltfUrl = this.initState.main3DFile; // 3D 콘텐츠 파일 경로

          /*
          let camPos = this.camera.postion; // 카메라 포지션
          if (this.initState.preset && this.initState.preset.length > 0) {
            camPos = this.initState.preset.camera;
          }
          */

          console.log(`loadGLTF() main3DFile: ${this.gltfUrl}`);

          // glTF 파일 로드
          const loader = new GLTFLoader();

          // loader.load('/editor/chair1/old_wooden_chair.gltf', (gltf) => {
          //   const chair = gltf.scene
          //   chair.scale.set(0.01, 0.01, 0.01)
          //   this.scene.add(chair)
          // })

          loader.load(
            this.gltfUrl,
            (gltf) => {
              // window.VIEWER.json = gltf;

              const scene = gltf.scene || gltf.scenes[0];
              const clips = gltf.animations || [];

              if (!scene) {
                // Valid, but not supported by this viewer.
                throw new Error(
                  "This model contains no scene, and cannot be viewed here. However," +
                    " it may contain individual 3D resources."
                );
              }

              this.state.loadGLTF = 1; // GLFT Loader [완료]

              /* / Mark에 대한 정보 처리
              if (this.initState.marker && this.initState.marker.length > 0) {
                this.createFont(true);
                // markCount = this.addMarkerJSON();
              }
              */

              this.parentGroup.add(scene);
              this.controls.update();

              this.setState();

              this.setContent(scene, clips);

              // 카메라의 위치를 설정
              this.setPresetInit();

              // JSON에 포함된 내용으로 Display 설정을 함
              this.setObjectDisplay();

              // Light 설정
              this.updateLight();


              /* scene 위치 변경은 정상 동작을 하지 않아 사용하지 않음
              if (this.initState.scene && this.initState.scene.position)
                this.setSceneMove(this.initState.scene.position);
              /////////////////////////////////////////////////// */

              // this.camera.matrixAutoUpdate = false;

              // this.setLightColor(CommUtil.getColorHex(this.initState.directColor));

              /*
              const model = gltf.scene || gltf.scenes[0];
              this.scene.add(model);
              this.gltfScene = model;
              // this.currentModel = model;
              */

              // let digitalTwinCount = 0;

              /*/ JSON Data의 Digital Twin 속성을 객체의 User Data에 추가
              if (
                this.initState.digitTwin &&
                this.initState.digitTwin.length > 0
              ) {
                // 객체들에 대한 Display 속성을 처리함
                digitalTwinCount = this.setObjectUserData();
              }

              console.log(
                `digitTwin : ${this.initState.digitTwin.length} / ${digitalTwinCount}` +
                  `\n - Hide : ${this.hideObjects.length}` +
                  `\n - Remove : ${this.removeObjects.length}` +
                  `\n - Marker : ${this.markObjects.length}`
              );
              */
            },
            undefined,
            (error) => {
              console.error(error);
            }
          );
        } else {
          this.state.loadJSON = 9; // JSON Loader [실패]
          console.log("3DFile URL Empty!");
        }
      } catch (error) {
        this.state.loadJSON = 9; // JSON Loader [실패]
        this.state.loadGLTF = 9; // GLTF Loader [실패]
        console.error("Error loading glTF model:", error);
      }
    },

    // Async로 처리 되는 부분들을 체크하여 선후관계로 처리
    setInitCheckAsync() {
      let isTimerClear = false;

      console.log(`Check Async( ${++this.state.initAsyncCount} ) : ${this.state.initAsyncRun} / ${this.state.initAsyncStop} / ${this.state.loadJSON} / ${this.state.loadGLTF} / ${this.state.loadFont} / ${this.state.loadTexture} / ${this.state.loadBG}`);
      /*
      console.log(`  - JSON : ${this.state.loadJSON}`);
      console.log(`  - GLTF : ${this.state.loadGLTF}`);
      console.log(`  - FONT : ${this.state.loadFont}`);
      console.log(`  - Texture : ${this.state.loadTexture}`);
      console.log(`  - BG  : ${this.state.loadBG}`);
      */

      // 50 회 동작 후 무조건 종료가 되게 함
      if(this.state.initAsyncCount > ASYNC_CHK_MAX_LOOP
        || this.initAsyncStop) {
        isTimerClear = true;
      }

      if(!isTimerClear) {
        // 프로세스가 진행 중일 경우 나머지 작업에 대해서 Skip 수행
        if (this.state.initAsyncRun) return;

        // JSON Loading이 완료 된 경우
        if (this.state.loadJSON == 1) {

          // GNB에 메뉴가 생성 될 수 있도록 플래그를 변경
          if(!this.GNBar.isUpdate) this.GNBar.isUpdate = true;

          switch (this.state.loadGLTF) {
            case -1: // 시작 전 : 대기 수행
              this.loadGLTF();
              break;
            case 0: // 시작은 하였으나, 완료가 되지 않은 경우 : 대기 수행
              break;
            case 1: // Loading을 완료 한 경우 : 아래 작업을 순차적으로 진행
              // Font를 Loading을 시작
              if (this.state.loadFont == -1) this.createFont();
              if (this.state.loadTexture == -1) this.createTexture();
              break;
            case 9: // 시작은 하였으나, 오류가 발생한 경우
              isTimerClear = true;
              break;
          }

          if (this.state.loadGLTF == 1) {

            if(this.state.loadFont &&  this.state.loadTexture) {

              this.state.initAsyncRun = true;

              // Texture를 각 Object에 추가
              if (this.state.countTexture > 0) this.addTextureJSON();

              // Backgroud 설정
              this.setBackgroud();

              // 마커 추가 (Font 생성 완료 후 실행 필요)
              // console.log("setInitCheckAsync() 마커 추가 [시작]");
              if (this.state.countMarker > 0) this.addMarkerJSON();
              // console.log("setInitCheckAsync() 마커 추가 [완료]");

              // Object User Data에 Digital Twin 속성을 입력
              //  - 마커가 Digital Twin 속성을 가질 수 있으므로 마커 추가 후 실행 필요
              // console.log("setInitCheckAsync() Digital Twin -> User Data [시작]");
              if (this.state.countDTwin > 0)   this.setObjectUserData();
              // console.log("setInitCheckAsync() Digital Twin -> User Data [완료]");

              this.state.initAsyncRun = false;

              this.initAsyncStop = true;

            } else {
              console.log(`setInitCheckAsync() wait for Font/Texture Loading`);    
            }

          }
        } else {
          console.log(`setInitCheckAsync() loadJSON : ${this.state.loadJSON}`);
          this.initAsyncStop = true;
        }
      }


      if (isTimerClear) {
        clearTimeout(this.state.initAsyncTimer);
        this.state.isLoadAll = true;
        console.log("setInitCheckAsync() Timer 종료");
      }
    },

    // JSON에서 조회한 정보를 바탕으로 현재 프로그램의 상태를 Update함
    setState() {

      console.log(`setState()`);
      console.log(this);

      // 카메라 설정 정보를 조회 하여 입력
      if (this.initState.camera) {
        const jsonData = this.initState.camera;
        const stateData = this.state.camera;
        if (jsonData.type) stateData.type = jsonData.type;
        if (jsonData.fov) stateData.fov = jsonData.fov;
        if (jsonData.near) stateData.near = jsonData.near;
        if (jsonData.far) stateData.far = jsonData.far;

        this.setFov2Camera2(this.state.camera.fov, this.state.camera.near, this.state.camera.far);
      }

      // Active Object에 대한 Display 설정을 조회하여 입력
      if (this.initState.activeDisplay) {
        const jsonData = this.initState.activeDisplay;
        const stateData = this.state.activeDisplay;
        if (jsonData.type) stateData.type = jsonData.type;
        // Color의 경우 JSON에서는 문자열("#00FF00")을 사용하고, state에서는 16진수(0x00FF00)을 사용하므로 변환하여 입력
        if (jsonData.color) {
          stateData.color = CommUtil.getColorHex(jsonData.color);
        }
        if (jsonData.lineWidth) stateData.lineWidth = jsonData.lineWidth;
        if (jsonData.osFactor) stateData.osFactor = jsonData.osFactor;
        if (jsonData.osUnits) stateData.osUnits = jsonData.osUnits;
      }

      // Widget 관련 정보를 JSON에서 조회하여 변수에 반영
      if (this.initState.widget) {
        const jsonData = this.initState.widget;
        if (jsonData.timeout) this.divWidget.timeout = jsonData.timeout;
        if (jsonData.width) this.divWidget.width = jsonData.width;
        if (jsonData.height) this.divWidget.height = jsonData.height;
        // console.log(`setState() widget : ${jsonData.timeout} / ${jsonData.width} / ${jsonData.height}`)
      }

      // ContextMenu 관련 정보를 JSON에서 조회하여 변수에 반영
      if (this.initState.contextmenu) {
        const jsonData = this.initState.contextmenu;
        if (jsonData.timeout) this.contextMenu.timeout = jsonData.timeout;
        // console.log(`setState() contextmenu : ${jsonData.timeout}`)
      }

      // message Box 관련 정보를 JSON에서 조회하여 변수에 반영
      if (this.initState.message) {
        const jsonData = this.initState.message;
        if (jsonData.timeout) this.divEMsg.timeout = jsonData.timeout;
        // console.log(`setState() message : ${jsonData.timeout} / ${jsonData.width} / ${jsonData.height}`)
      }

      if (this.initState.digitTwin) {
        const jsonData = this.initState.digitTwin;
        this.state.countDTwin = jsonData.length;

        this.state.countActive = 0;
        this.state.countHide = 0;
        this.state.countMaterial = 0;
        let countUnknown = 0;
        jsonData.forEach((jData) => {
          if(jData.display == "active")  this.state.countActive ++;
          else if(jData.display == "hide")  this.state.countHide ++;
          else {
            Logger.warn(`setState() DigitTwin Unknown Type(${jData.type})`);
            countUnknown++;
          }

          if(jData.material)  this.state.countMaterial ++;
        });

        if(countUnknown > 0)
          Logger.warn(`setState() DigitTwin Unknown Count : ${countUnknown}`);

      }
      if (this.initState.marker) {
        const jsonData = this.initState.marker;
        this.state.countMarker = this.initState.marker.length;

        this.state.countMarker2D = 0;
        this.state.countMarker3D = 0;
        let countUnknown = 0;
        jsonData.forEach((jData) => {
          if(jData.type == "line2d") this.state.countMarker2D++;
          else if(jData.type == "line3d" || jData.type == "line") this.state.countMarker3D++;
          else {
            Logger.warn(`setState() Marker Unknown Type(${jData.type})`);
            countUnknown++;
          }

          if(jData.material)  this.state.countMaterial ++;
        });

        if(countUnknown > 0)
          Logger.warn(`setState() Marker Unknown Count : ${countUnknown}`);

      }
      if (this.initState.texture) this.state.countTexture = this.initState.texture.length;

      console.log("setState()"
        + `\n  - JSON Loading : ${this.state.loadJSON}`
        + `\n  - Digital Twin Count : ${this.state.countDTwin}`
        + ` (active : ${this.state.countActive}, hide : ${this.state.countHide})`
        + `\n  - Material : ${this.state.countMaterial}`
        + `\n  - Marker Count : ${this.state.countMarker}`
        + `\n  - Texture Count : ${this.state.countTexture}`
      );

    },


    // 콘텐츠를 생성하여 씬에 추가하여 보여준다.
    setContent(object, clips) {
      this.clearContent();

      object.updateMatrixWorld(); // donmccurdy/three-gltf-viewer#330

      // const box = new THREE.Box3().setFromObject(object);
      // const center = box.getCenter(new THREE.Vector3());

      // object.position.x -= center.x;
      // object.position.y -= center.y;
      // object.position.z -= center.z;

      this.scene.add(object);
      this.content = object;

      let cntNode = 0;
      let cntLight = 0;
      let cntMesh = 0;
      let cntMorph = 0;
      this.content.traverse((node) => {
        // console.log('setContent() ' + node.name + ' light ' + node.isLight + ',  mesh ' + node.isMesh);
        if (node.isLight) {
          cntLight++;
          // console.log(`setContent() ${node.name} is Light`);
        }

        if (node.isMesh) {
          cntMesh++;
          // console.log(`setContent() ${node.name} is Mesh`);
        }

        // Morph 기능이 있을 경우 별도의 메모리로 저장
        if (node.geometry && node.morphTargetInfluences) {
          cntMorph++;

          // Morph 동작을 관리하기 위한 상태 관리 변수 선언
          const morphState = {
            timer: null, // Morph Interval Timer 객체
            isIncrement: !(node.morphTargetInfluences == 1), // 증가 또는 감소할지 여부
            interval: 0, // Interval 동작 주기
            step: 0, // Interval당 변경될 값
            // value: node.morphTargetInfluences, // 현재 Morph 값
            value: 0, // 현재 Morph 값
          };

          const morphInfo = {
            mesh: node,
            state: morphState,
          };

          this.morphs.push(morphInfo);
          // console.log(`setContent() ${node.name} is Morph`);
        }

        cntNode++;
      });

      this.setClips(clips);

      // window.VIEWER.scene = this.content;

      console.log(
        `setContent() Node ${cntNode}, Light ${cntLight}, Mesh ${cntMesh}, Morph ${cntMorph}, Animation ${clips.length}`
      );
    },

    // 애니메이션 콘텐츠를 생성하여 씬에 추가
    setClips(clips) {
      if (this.mixer) {
        this.mixer.stopAllAction();
        this.mixer.uncacheRoot(this.mixer.getRoot());
        this.mixer = null;
      }

      this.clips = clips;
      if (!clips.length) return;

      this.mixer = new THREE.AnimationMixer(this.content);
    },

    // Loading된 GLTF를 Clear함
    // Vue Route를 사용할 경우 Clear가 필요하나, 현재 정상 동작이 되지 않음
    clearContent() {
      console.log("clearContent()");

      if (this.content) {
        this.scene.remove(this.content);

        // dispose geometry
        this.content.traverse((node) => {
          if (!node.geometry) return;

          node.geometry.dispose();
          console.log(`${node.name} dispose`);
        });

        // dispose textures
        this.traverseMaterials(this.content, (material) => {
          for (const key in material) {
            if (key !== "envMap" && material[key] && material[key].isTexture) {
              material[key].dispose();
              console.log(`${material[key]}/${key} material dispose`);
            }
          }
        });
      } else {
        console.log("clearContent() content is Empty!");
      }
    },

    // Material속성을 가진 객체에 대해서 하위 속성부터 순차적으로 제거
    disposeMaterial(material) {
      if (material.map) material.map.dispose();
      if (material.lightMap) material.lightMap.dispose();
      if (material.bumpMap) material.bumpMap.dispose();
      if (material.normalMap) material.normalMap.dispose();
      if (material.specularMap) material.specularMap.dispose();
      if (material.envMap) material.envMap.dispose();
      material.dispose();
    },

    // Material속성을 가진 모든 하위 객체에 대한 Callback 처리
    traverseMaterials(object, callback) {
      object.traverse((node) => {
        if (!node.geometry) return;
        const materials = Array.isArray(node.material)
          ? node.material
          : [node.material];
        materials.forEach(callback);
      });
    },

    // 화면 사이즈 변경에 대한 이벤트 처리 (Camera 상태, 화면 사이즈 등 재 계산)
    onWindowResize() {
      const aspect =
        this.$refs.rendererContainer.clientWidth /
        this.$refs.rendererContainer.clientHeight;

      // PerspectiveCamera 업데이트
      if (this.cameraPer) {
        this.cameraPer.aspect = aspect;
        this.cameraPer.updateProjectionMatrix();
      }

      // OrthographicCamera 업데이트
      if (this.cameraOrt) {
        this.cameraOrt.left = -aspect * this.state.camera.ortCoef;
        this.cameraOrt.right = aspect * this.state.camera.ortCoef;
        this.cameraOrt.updateProjectionMatrix();
      }

      this.renderer.setSize(
        this.$refs.rendererContainer.clientWidth,
        this.$refs.rendererContainer.clientHeight
      );

      // this.composer.setSize(
      //   this.$refs.rendererContainer.clientWidth,
      //   this.$refs.rendererContainer.clientHeight
      // );


      // 2D Mark가 존재할 경우 Position을 Update 함
      if(this.state.countMarker2D > 0) this.updateMark2DPos();

      // mslee - 에디팅 중 resize될 때
      if(this.menuVisible && this.selectedObject) {
        const { x, y } = this.getScreenPosition(this.selectedObject);

        this.showUIForSelectedObject(x, y);
      }

    },

    // 화면에서 마우스에 대한 이벤트 처리 (pointerdown / mousemove)
    addMouseEventListeners() {
      /* mousedown 을 사용하므로 click은 사용하지 않음
      this.$refs.rendererContainer.addEventListener(
        "click",
        this.onMouseClick,
        false
      );
      */

      this.$refs.rendererContainer.addEventListener(
        // "mousedown",
        "pointerdown",
        this.onMouseDown,
        false
      );
      this.$refs.rendererContainer.addEventListener(
        "mousemove",
        this.onMouseMove,
        false
      );

      /*
      mousedown: 마우스 버튼이 눌릴 때만 발생하는 이벤트로, 마우스 장치에만 한정
      pointerdown: 포인터 장치(마우스, 터치스크린, 스타일러스 등)가 눌릴 때 발생하며, 보다 다양한 입력 장치를 지원
      */
    },

    /* / 마우스 Left 버튼 클릭 (사용 하지 않음)
      Mouse Right 버튼을 사용하기 위해서는 onMouseDown 사용
    onMouseClick(event) {}
    /////////////////////////////////////////////// */

    // 마우스 Down에 대한 이벤트 처리 (마우스로 선택된 객체 정보를 확인, 좌/우 클릭에 따른 처리 함수 별도 호출)
    onMouseDown(event) {
      // event.preventDefault(); // 브라우저 기본 컨텍스트 메뉴 차단
      // event.stopPropagation();

      /* / Mouse Left / Right 버튼이 아닐 경우 Skip 수행
      // 휠 클릭을 사용하므로 Skip 하지 않음
      if (!(event.button == 0 || event.button == 2)) {
        console.log(`onMouseDown Skip (${event.button})`);
        return;
      }
      ////////////////////////////////////////////////// */

      // console.log(`onMouseDown (${event.button})`);

      // 광원과 교차 되는 Object 선택

      if(this.isEditMode) return; // mslee

      const insObject = this.intersectObject(event);
      let isClearDiv = false;
      let isClearWidget = false;



      // Mouse Left 버튼 클릭하였을 경우
      if (event.button == 0) {

        if (insObject != null) {

          // Active 객체 보기 설정이 되어 있을 경우 설정 해제 수행
          if(this.state.showActiveObject)
            this.toggleActiveObject();

          // 이전에 선택된 Object가 존재할 경우 Clear를 수행
          this.offObject(this.selObject);
          this.selObject = null;

          // DT Object일 경우
          if(this.onObject(insObject)) {
            this.selObject = insObject;

            this.onMouseLeftClick(event);

          }
          /* / DT Object는 아니지만 마우스 우클릭에 반응을 할 Object일 경우
          else if(this.onObject2(insObject)) {
            this.selObject = insObject;
            if (event.button == 2) {
              this.onMouseRightClick(event);
              isClearWidget = true;
            }
            else {
              isClearDiv = true;
            }
          }
          */
          else {
            console.log(`Not On Obect (${insObject.name})`);
            isClearDiv = true;
          }

          /*/ Logger를 사용하여 클릭된 객체의 정보를 로그로 출력
          Logger.debug(
            `Clicked object: ${intersectedObject.name || "Unnamed"}`,
            "GltfViewer"
          );
          */
        } else {
          console.log("intersect Object is Empty");
          this.selObject = null;
          isClearDiv = true;
        }

        // Widget 또는 ContextMenu를 Clear
        if(isClearDiv)  this.clearDiv();
        else if(isClearWidget && this.divWidget.isShow) this.clearDiv("widget");

      }
      // Mouse Right 버튼 클릭하였을 경우
      else if (event.button == 2) {

        if(this.selectedObject) return //mslee추가 !!!!!!!!!!!!!!!!!!!!!!!!!!

        if (insObject != null) {
          this.selObject = insObject;
        }
        else {
          this.selObject = this.scene;
        }

        this.onMouseRightClick(event);
      }
      else {
        console.warn(`onMouseDown() Not Support Event Button (${event.button})`);
      }

    },

    // 마우스 좌버튼 Down에 대한 이벤트 처리 (DT 객체 확인 후 type에 따른 Component 호출 및 Morph 실행)
    onMouseLeftClick(event) {

      if(event)
        event.stopPropagation(); // 이벤트 전파 중지 (메뉴 Click 시 3D콘텐츠에 대한 반응은 하지 않도록 함)


        // mslee

        // 카메라와 객체 사이의 방향 벡터 계산
        const direction = new THREE.Vector3().subVectors(this.camera.position, this.selObject.position).normalize();

        // 원하는 거리 (객체에서 20 유닛 떨어짐)
        const distance = 20;

        // 객체 위치에서 방향 벡터를 따라 거리를 추가한 위치로 이동
        const targetPosition = this.selObject.position.clone().add(direction.multiplyScalar(distance));

        // 선택된 객체를 바라보는 카메라의 목표 쿼터니언 계산
        const targetQuaternion = new THREE.Quaternion();
        this.camera.lookAt(this.selObject.position);
        targetQuaternion.copy(this.camera.quaternion); // 선택된 객체를 향한 쿼터니언

        // 카메라의 쿼터니언을 원래대로 복원
        const initialQuaternion = this.camera.quaternion.clone();

        // 카메라 위치와 쿼터니언을 동시에 트윈으로 변경
        const cameraTween = new Tween({
            position: this.camera.position.clone(),
            quaternion: initialQuaternion.clone(),
        })
          .to({
            position: targetPosition, // 객체에서 일정 거리만큼 떨어진 위치로 이동
            quaternion: targetQuaternion.clone(), // 선택된 객체를 바라보는 쿼터니언 적용
          }, 1000)
          .easing(Easing.Quadratic.InOut)
          .onUpdate((obj) => {
            // 카메라 위치와 쿼터니언을 업데이트
            this.camera.position.copy(obj.position);
            this.camera.quaternion.copy(obj.quaternion);

            // 카메라 컨트롤 업데이트
            this.controls.update();
          })
          .onComplete(() => {
            // 완료 후 따로 target을 설정하지 않고 자연스럽게 종료
            console.log('카메라 이동 및 회전 완료');
          })
          .start();

        // TweenGroup에 추가
        this.tweenGroup.add(cameraTween);

        
        // mslee




      // console.log(`onMouseLeftClick(${event.button})`);

      this.clearMouseEvent();

      // 위젯 화면을 오픈
      // this.showDivWidget();

      // 정보 보기 화면을 오픈
      // this.showDivInfo(this.selObject);

      // Active Object일 경우 Chart/Video/Link를 처리
      // const dtObject = this.getActiveObject(this.selObject);
      const dtObject = this.getDTObject(this.selObject);
      if (dtObject) {

        console.log( `onMouseLeftClick() ActiveName : ${dtObject.dtname}`);

        const type = dtObject.action.type;
        const target = dtObject.action.target;

        // Type이 없을 경우
        if (type == "undefined" || type == "") {
          console.log(`Active type Empty`);
        }
        // Chart 보기일 경우
        /*
        else if (actObject.type == "chart") {
          this.showDivChart(actObject);
        }
        // Video 보기일 경우
        else if (actObject.type == "video") {
          // console.log("Show Video");
          this.showDivVideo(actObject);
        }
        */
        // Chart/Video/Server에 대해서는 WidgetViewer에서 처리
        else if (
          type == "chart" ||
          type == "video" ||
          type == "link" ||
          type == "image" ||
          type == "server"
        ) {
          // this.selUserData = actObject;

          this.divWidget.type = type;
          this.showDivWidget();

          // console.log(`onMouseLeftClick(${event.button}) `);
        }
        /* / Link 처리일 경우 (2024-09-10, WidgetViewer에서 처리 하도록 변경)
        else if (actObject.type == "link") {
          let isConfirmOk = true;
          if (actObject.confirm) {
            isConfirmOk = confirm(
              `페이지 이동을 하시겠습니니까?\n\n${actObject.url}`
            );
          }

          if (isConfirmOk) {
            // 현재창에서 링크 페이지를 오픈
            if (actObject.target == "self") {
              document.location.href = actObject.url;
            }
            // 새창에 링크 페이지를 오픈
            else window.open(actObject.url);
          }
        }
        ///////////////////////////////////////////////// */
        // Morph 처리일 경우
        else if (type == "morph") {
          this.morphs.forEach((morph) => {
            // JSON에 설정된 type 명과 Morph Mesh 명이 같을 경우
            if (target == morph.mesh.name) {
              const step = dtObject.action.step;
              const interval = dtObject.action.interval;

              console.log(`${type} is Run ( ${step} / ${interval} )`);

              // JSON에서 Active 속성에 대한 세부 속성을 조회
              morph.state.step = step;
              morph.state.interval = interval;

              this.showMorph(morph.mesh, morph.state);
            }
          });
        }
        // target으로 설정된 다른 object가 실행 될 수 있도록 함
        else if (type == "relation") {
          this.onObjectExt(target);
        } else {
          console.log(`unknown type (${type})`);
        }
      } else {
        console.log(`${this.selObject.name} is Not Active`);
      }
      /*
          // console.log(viewObjectInfo);

          // selectedObjectInfo를 부모 컴포넌트로 전달
          // this.$emit("object-selected", viewObjectInfo);

          this.showDivInfo = true;
          // const divObjectInfo = document.getElementById("divObjectInfo");
          /*
          const divObjectInfo = this.$refs.objectInfoContainer;
          let posX = 100;
          let posY = 100;
          if (divObjectInfo) {
            posX =
              this.$refs.rendererContainer.clientWidth -
              divObjectInfo.style.width -
              divObjectInfo.style.padding;
            posY = divObjectInfo.style.padding;
          }

          this.infoPosition = { x: posX, y: posY };

          // Active 설정 된 객체일 경우 Graph를 표시
          if (isActiveObject) {
            this.showDivWidget = true;

            this.chartPosition = {
              x: event.clientX + 2,
              y: event.clientY + 2,
            };
          }

          */
    },

    // 마우스 우버튼 Down에 대한 이벤트 처리 (ContextMenu 처리 함수 호출)
    onMouseRightClick(event) {

      // event.preventDefault(); // 브라우저 기본 컨텍스트 메뉴 차단
      event.stopPropagation(); // 이벤트 전파 중지 (메뉴 Click 시 3D콘텐츠에 대한 반응은 하지 않도록 함)

      this.clearDiv();

      const position = {
        x: event.clientX,
        y: event.clientY,
      };

      // 2D Marker의 경우 Three.js 의 일반 이벤트를 사용할 수 없으므로 objName을 파라미트로 받아서 처리
      if(event.currentTarget.dataset.objName !== undefined) {

        // console.log("onMouseRightClick : ", event.currentTarget.dataset.objName);
        const objName = event.currentTarget.dataset.objName;
        const object = this.scene.getObjectByName(objName);

        if (object) {
          console.log("onMouseRightClick : ", objName);
          this.selObject = object;

          console.log("@@@@@@@@@@@@")
          this.outlinePass.selectedObjects = [this.selObject];
        }
        else {
          console.log("onMouseRightClick : Object Empty");
        }

        // console.log("onMouseRightClick(objName) : ", event.currentTarget.dataset.tarObjName);
        // console.log("onMouseRightClick(userData) : ", event.currentTarget.dataset.userData);

      }

      this.showContextMenu(position);
    },

    // 마우스 움직임에 따른 이벤트 처리 (마우스와 교차되는 객체 확인, 마우스 위치에 따른 메뉴 처리 함수 호출)
    onMouseMove(event) {
      const USE_OBJ_OVERLAP = false;

      // 객체가 감지가 되면 객체명을 Log로 출력
      if (USE_OBJ_OVERLAP) {
        const rect = this.$refs.rendererContainer.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        // 교차된 객체들을 받아옴
        const intersects = this.raycaster.intersectObjects(
          this.scene.children,
          true
        );

        if (intersects.length > 0) {
          if (intersects[0].object.type == "GridHelper") {
            console.log("GridHelper");
            1;
          } else {
            if (this.intersectsObejectName != intersects[0].object.name) {
              this.intersectsObejectName = intersects[0].object.name;
              console.log(
                `Intersected object: ${intersects[0].object.name}`,
                intersects[0].object
              );
            }
          }
        }
      }

      // 상단 50 px 이내로 이동하였을 경우 상단 메뉴를 화면에 표출
      if (event.clientY < 50) {
        this.divMenu.isShow = true;

        // 이미 Timer가 동작 중일 경우에는 종료
        if (this.divMenu.timer) {
          clearTimeout(this.divMenu.timer);
        }

        this.divMenu.timer = setTimeout(() => {
          this.divMenu.isShow = false;
        }, this.divMenu.timeout);
      }
    },

    // Mouse Click 시 이전에 실행 되고 있던 이벤트들을 종료함
    clearMouseEvent() {
      /*
      if (this.contextMenu.timer) {
        this.contextMenu.isShow = false;
        clearTimeout(this.contextMenu.timer);
      }
        */

      this.clearDiv();
    },

    /**
     * @function onMenuClick
     * @param event 
     * 
     * 메뉴 버튼에 따른 각 처리 함수 호출
     * 
     * case 95는 객체 삽입으로 mslee 추가함
     */
    onMenuClick(event) {
      event.stopPropagation(); // 이벤트 전파 중지 (메뉴 Click 시 3D콘텐츠에 대한 반응은 하지 않도록 함)

      const menuIndex = parseInt(event.currentTarget.dataset.index);

      console.log("onMenuClick", menuIndex);

      switch (menuIndex) {
        case 1:
          this.toggleAutoRotate();
          break;
        case 2:
          this.toggleWireframe();
          break;
        case 3:
          this.toggleGrid();
          break;
        case 4:
          this.movePreset(-1);
          break;
        case 5:
          this.hideObject(this.selObject);
          break;
        case 9: // FOV를 변경
          this.setFovChange();
          break;
        case 10: // Camera 처리 방식을 변경
          this.setCameraChange();
          break;
        case 11: // Zoom 변경
          this.setZoomChange();
          break;
        case 12: // 마커 보기 설정
          this.toggleMarker();
          break;
        case 13: // 숨김 객체 보기 설정
          this.toggleHideObject();
          break;
        case 14: // Active 객체 보기 설정
          this.toggleActiveObject();
          break;
        case 15: // SSE 설정
          this.toggleServerSentEvent();
          break;


        case 30: // Object 속성 보기 toggle
          this.divObjAttrib.isShow = !this.divObjAttrib.isShow;
          if(this.divObjAttrib.isShow) {
            if(this.selObject) {
              this.divObjAttrib.object = this.selObject;
            }
            else {
              this.divObjAttrib.object = this.scene;
            }
          }
          break;
        case 31: // Object 속성 보기 Open
          this.divObjAttrib.isShow = true;
          if(this.divObjAttrib.isShow) {
            if(this.selObject) {
              this.divObjAttrib.object = this.selObject;
            }
            else {
              this.divObjAttrib.object = this.scene;
            }
          }
          break;
        case 39: // Object 속성 보기 close
          this.divObjAttrib.isShow = false;
          break;




        // Message 창 관련 처리
        case 40:
          if (this.divEMsg.isShow) {
            this.divEMsg.isShow = false;
            this.state.showEMsg = this.divEMsg.isShow;
          } else this.showEMsg();
          break;
        case 41:
          this.divEMsg.isShow = true;
          break;
        case 45: // Camera 관련 위치 청보를 Event Message에 출력
          if(this.selObject)  this.addEMsgUser("selected-object");
          else  this.addEMsgUser("camera-position");
          break;
        case 48:
          this.removeEMsg(-1);
          break;
        case 49:
          this.divEMsg.isShow = false;
          break;




        // Marker 설정 화면 관련 처리
        case 51: // 화면 Open
          this.divMarkSet.isShow = true;
          this.contextMenu.isShow = false;  // ContextMenu 화면 Close
          if(this.divAttSet.isShow)  this.divAttSet.isShow = false;   // 속성 추가 화면이 열려 있으면 닫아줌
          break;
        case 52: // Submit
          this.divMarkSet.isShow = true;
          break;
        case 55: // 설정 화면 미리 보기
          // this.divMarkSet.isShow = true;
          this.prevMarker(event);
          break;
        case 58: // reset
          this.divMarkSet.isShow = true;
          break;
        case 59: // 화면 Close
          this.divMarkSet.isShow = false;
        break;


        // ContextMenu 화면 관련 처리
        case 61: // 화면 Open
          this.contextMenu.isShow = true;
          break;
        case 69: // 화면 Close
          this.contextMenu.isShow = false;
        break;


        // 속성 등록 화면 관련 처리
        case 71: // 화면 Open
          this.divAttSet.isShow = true;
          this.contextMenu.isShow = false;  // ContextMenu 화면 Close
          if(this.divMarkSet.isShow)  this.divMarkSet.isShow = false;   // 마커 추가 화면이 열려 있으면 닫아줌
          break;
        case 79: // 화면 Close
          this.divAttSet.isShow = false;
          break;


        // Widget 화면 관련 처리
        case 81: // 화면 Open
          this.divWidget.isShow = true;
          this.divAttSet.isShow = false;
          break;
        case 86: // Overlap 페이지 오픈 (최적화 실행)
          this.divOverlap.isShow = true;
          break;
        case 89: // 화면 Close
          this.divWidget.isShow = false;
          break;




        case 91:
          document.location.href = "/viewer/S01";
          break;
        case 92:
          document.location.href = "/viewer/S02";
          break;
        case 93:
          document.location.href = "/viewer/S03";
          break;
        case 94:
          document.location.href = "/viewer/S04";
          break;

        
        case 95:
          // SNBar 객체 삽입 Sider Toggle
          this.toggleInserModal();
          break;
        case 96:

          console.log(this.selObject)
          console.log(this.markObjects)

          if(!(this.selObject instanceof THREE.Mesh || this.selObject instanceof THREE.Object3D || this.selObject instanceof THREE.Group)) {
            
            alert("잘못된 접근입니다.")
            return
          }
          this.selectObjectControl(this.selObject);
          break;
        case 97:
          this.toggleCreateMarkerModel();
          // this.Marker3DAdd()
          break;


        default:
          this.addEMsg(`정의 되지 않은 메뉴 코드 (${menuIndex})`);
      }

      // Menu Timer를 재 기동
      if (this.divMenu.timer) clearTimeout(this.divMenu.timer);
      // 함수를 처리하는 동안 Timer 동작이 종료된 경우
      else this.divMenu.isShow = true;

      this.divMenu.timer = setTimeout(() => {
        this.divMenu.isShow = false;
      }, this.divMenu.timeout);
    },

    // 키보드에 대한 이벤트 처리 (KeyDown)
    addKeyboardEventListeners() {
      window.addEventListener("keydown", this.onKeyDown);
    },

    // 키보드의 특정 Key를 선택했을 때의 이벤트 처리
    onKeyDown(event) {

      if(this.isEditMode) return; //mslee

      // 속성 등록 화면이 열려 있을 경우 단축키 처리를 수행 하지 않음
      // 입력창과 이중 처리가 될 수 있음
      if(this.divAttSet.isShow || this.divMarkSet.isShow) {
        return false;
      }

      console.debug("onKeyDown(event) : " + event.code + " / " + event.altKey);

      // 숫자키를 선택한 경우 (Preset 위치를 이동)
      if (event.code.indexOf("Digit") >= 0) {
        const idx = parseInt(event.code.substring(5));
        /*
        if (this.initState.camera1 && event.code == "Digit1") {
          this.set
          userCamera = this.initState.camera1;
        } else if (this.initState.camera2 && event.code == "Digit2") {
          userCamera = this.initState.camera2;
        } else if (this.initState.camera3 && event.code == "Digit3") {
          userCamera = this.initState.camera3;
        }

        if (userCamera) {
          x = userCamera.x;
          y = userCamera.y;
          z = userCamera.z;
        }

        // 카메라의 위치를 설정
        this.setPreset(x, y, z);
        */

        /*
        if (idx == 0) {
          this.camera.lookAt(0, 0, 0);
          console.log("this.camera.lookAt(0, 0, 0)");
        } else {
          if (this.d3ContId == "S01") {
            let objName = "";
            switch (idx) {
              case 1:
                objName = "Dashboard_002";
                break;
              case 2:
                objName = "SerRackA_007";
                break;
              case 3:
                objName = "Computer_001";
                break;
            }
            const object = this.scene.getObjectByName(objName);
            if (object) {
              if (object.isMesh) {
                this.camera.lookAt(object.position);
                console.log(
                  `${objName.id} position : ${CommUtil.getPos2Text(
                    object.position
                  )}`
                );
              } else {
                console.log(`${object.id} is Mesh`);
              }
            } else console.log(`${objName} is Not Exist`);
          } else {
            this.movePreset(idx);
          }

        }
         */

        this.movePreset(idx);
      }
      // 방향키를 선택한 경우
      else if (event.code.indexOf("Arrow") >= 0) {
        this.setTargetMoveKey(event);
      }
      // 나머지 일반 Key 문자를 입력하였을 경우
      else {
        switch (event.code) {
          case "KeyC":
            // this.clearGLTF();
            // this.renderer.render(this.scene, this.camera);
            // this.renderer.setClearColor(0x000000, 1);
            // this.scene.remove(this.currentModel);
            break;
          case "KeyD": // 선택된 객체를 삭제 함
          case "delete":
            this.hideObject(this.selObject);
            // this.onBtnDeleteClick(event);  // 선택되어 있는 객체를 삭제
            break;
          case "KeyE":    // SSE 수신을 시작 또는 종료
            this.toggleServerSentEvent();
            // this.onBtnDeleteClick(event);  // 선택되어 있는 객체를 삭제
            break;
          case "KeyF": // FOV를 자동으로 변경
            this.setFovChange();
            break;
          case "KeyG":
            this.toggleGrid();
            break;
          case "KeyH":
            this.toggleHideObject();
            break;
          case "KeyI": // camera position 정보를 보여 줌
            if(this.selObject)  this.addEMsgUser("selected-object");
            else  this.addEMsgUser("camera-position");

            // this.addMarkerJSON();

            break;
          case "KeyL": // Raycaster Line을 표시
            this.toggleRaycasterLine();
            break;
          case "KeyM": // Marker를 표시 (숨기기)
            this.toggleMarker();
            break;
          case "KeyW":
            this.toggleWireframe();
            break;
          case "KeyR":
            this.toggleAutoRotate();
            break;
          /* 향후 추가 필요한 단축키 정보
            - HotKey(단축키) 정보 보기
          ////////////////////////////////// */
        }

        // console.log(`event.code : ${event.code}`);
      }
    },

    // SSE(Server Sent Event)를 통해서 서버에서 Client로 보내진 메시지에 대한 처리
    addServerSentEventListeners() {

      let isOpen = false;
      let targetUrl = SSE_ROOT;

      //브라우저가 SSE지원하는지 체크
      if(typeof(EventSource) !== "undefined") {
        console.log("addServerSentEventListeners() SSE 지원");
      } else {
        console.log("addServerSentEventListeners() SSE 미지원");
        return;
      }
      
      // 서버에 SSE를 연결
      this.eventSource = new EventSource(targetUrl);
      console.log("addServerSentEventListeners() Start");

      this.eventSource.addEventListener('time', (event) => {
        this.onSSEMessage('time', event);
      });
      
      this.eventSource.addEventListener('3dviewer', (event) => {
        this.onSSEMessage('3dviewer', event);
      });

      // 서버와 커넥션이 맺어질 때 동작한다
      this.eventSource.addEventListener('open', function(e) {
        console.log(`addServerSentEventListeners() connection is open ${e}`);
        isOpen = true;
      });

      // 서버에서 데이터를 보낼 때 event없이 보내면 동작
      // eventSource.addEventListener('message', function(e) {
      //     console.log(`addServerSentEventListeners() Message ${e}`);
      // });
      this.eventSource.onmessage = (event) =>  {
        console.log('addServerSentEventListeners() Message' , event);
      };

      // 서버에서 에러가 발생하였을 경우 동작
      this.eventSource.onerror = (event) => {
        console.log('addServerSentEventListeners() Error:', event);
        // this.addEMsg(`SSE Error : ${event.message}`);  // 연결 오류일 경우 message는 undefined 임
        if(isOpen)
          this.addEMsg(`SSE Error : ${event.message}`);
        else
          this.addEMsg(`SSE Open Error : ${targetUrl}`);
        this.closeServerSentEventListeners();
      };      

    },

    closeServerSentEventListeners() {
      this.state.isServerEvent = false;
      this.eventSource.close();
      this.eventSource = null;
    },


    // SSE 각 메시지에 type에 대한 처리 수행
    onSSEMessage(type, event) {

      if(type == "time") {
        let msgText = `[${type}] ${event.data}`;
        console.log(`onMessage() ${msgText}`);
        this.addEMsg(msgText);
      }
      else if(type == "3dviewer") {
        let msgText = `[${type}] ${event.data}`;
        console.log(`onMessage() ${msgText}`);
        this.addEMsg(msgText);
      }
      else {
        console.log("onMessage() Unknown type : " + type);
      }

    },



    // Camera 처리 방식을 perspective(원근) / orthograpic(직교) 으로 변경
    setCameraChange() {
      if (this.camera instanceof THREE.PerspectiveCamera) {
        this.setCameraType("Orthographic");
      } else {
        this.setCameraType("Perspective");
      }
    },

    // Camera 처리 방식에 대한 세부 처리
    setCameraType(type) {

      console.log("setCameraType");

      const camState = this.state.camera;

      if (type == "Perspective") {
        if (!this.cameraPer) {
          console.log(`setCameraType Create PerspectiveCamera`);
          this.cameraPer = new THREE.PerspectiveCamera(
            camState.fov,
            window.innerWidth / window.innerHeight,
            camState.near,
            camState.far
          );
        }

        this.camera = this.cameraPer;

        // this.camera.position.x = 120;
        // this.camera.position.y = 60;
        // this.camera.position.z = 180;
        // this.camera.lookAt(this.scene.position);
        camState.currType = "Perspective";
      } else if (type == "Orthographic") {
        const aspect =
          this.$refs.rendererContainer.clientWidth /
          this.$refs.rendererContainer.clientHeight;

        if (!this.cameraOrt) {
          console.log(`setCameraType Create Orthographic`);
          this.cameraOrt = new THREE.OrthographicCamera(
            -aspect * camState.ortCoef,
            aspect * camState.ortCoef,
            camState.ortCoef,
            -camState.ortCoef,
            camState.near,
            camState.far
          );
        }

        this.camera = this.cameraOrt;

        // this.camera.position.x = 120;
        // this.camera.position.y = 60;
        // this.camera.position.z = 180;
        // this.camera.lookAt(this.scene.position);
        camState.currType = "Orthographic";
      } else {
        console.error(`Unknown CameraType (${type})`);
      }

      this.controls.object = this.camera; // controls 객체도 카메라에 맞게 업데이트
      this.camera.updateProjectionMatrix();
      this.controls.update();
    },

    // 사용자가 설정한 Preset 정보를 JSON에서 읽어 옴
    // JSON에 값이 없더라도 초기값으로 하나는 무조건 설정함
    setPresetInit() {
      let isMoveCamera = false;
      if (this.initState.preset && this.initState.preset.length) {
        // JSON 정보를 한번에 메모리로 Copy
        this.presets = this.initState.preset;

        /* / 각 값들에 대해서 검증 또는 재 가공 후 입력
        // 정상적으로 처리가 되지 않음 (push 부분에서 정상 처리가 안 됨)
        this.presets = [];
        for (let i = 0; i < this.initState.preset.length; i++) {
          let currPreset = this.preset;
          currPreset.position = this.initState.preset[i].position;

          if (this.initState.preset[i].quaternion)
            currPreset.quaternion = this.initState.preset[i].quaternion;
          else currPreset.quaternion = { x: 0, y: 0, z: 0, w: 1 };

          switch (i) {
            case 0:
              currPreset.target = { x: 0, y: 0, z: 0 };
              break;
            case 1:
              currPreset.target = { x: 1, y: 0, z: 0 };
              break;
            case 2:
              currPreset.target = { x: 0, y: 1, z: 0 };
              break;
            case 3:
              currPreset.target = { x: 0, y: 0, z: 1 };
              break;
            case 4:
              currPreset.target = { x: 1, y: 1, z: 1 };
              break;
          }

          console.log(
            ` - ${i} : ${CommUtil.getPos2Text(
              currPreset.position
            )} / ${CommUtil.getPos2Text(currPreset.target)}`
          );

          this.presets.push(currPreset);
        }
        /////////////////////////////////////////////////////////// */
        isMoveCamera = true;
        console.log(
          `setPresetInit() ${this.initState.preset.length} -> ${this.presets.length}`
        );
      } else {
        // JSON 정보가 없을 경우 초기값이 입력되어 있는 preset을 사용
        this.presets.push(this.preset);
        console.log("setPresetInit() JSON Preset Empty");
      }

      /* / Preset에 포함되어 있는 정보를 출력
      for (let i = 0; i < this.presets.length; i++) {
        let currPreset = this.presets[i];
        console.log(
          ` - ${i} : ${CommUtil.getPos2Text(
            currPreset.position
          )} / ${CommUtil.getPos2Text(currPreset.target)}`
        );
      }
      /////////////////////////////////////////////////////////// */

      // 0번 Preset 지점으로 이동
      this.currPresetIdx = 0;
      if (isMoveCamera) this.movePreset(0);

      // 카메라 설정에 Move Interval 부분이 포함되어 있을 경우
      if (this.initState.camera.move) {
        this.presetTimer.interval = this.initState.camera.move.interval;
        this.presetTimer.maxTime = this.initState.camera.move.maxTime;
      }
    },

    // 설정된 즐겨보기(Preset)으로 이동
    setPreset(preset) {
      // this.camera.position.set(x, y, z);
      const position = preset.position;
      // const rotation = preset.rotation;  // 사용하지 않음
      // const quaternion = preset.quaternion;
      const target = preset.target;

      console.log(
        `setPreset() Timer : ${CommUtil.getPos2Text(
          position
        )} /  ${CommUtil.getPos2Text(target)}`
      );

      // Timer를 사용하여 서서비 이동할지 여부
      const IS_USE_TIMER = true;

      // 한번에 Position 과 Target을 변경할 경우
      if (IS_USE_TIMER && this.state.isLoadAll) {
        // 자동 회전 설정이 되어 있을 경우 종료
        if (this.state.showAutoRotate) this.toggleAutoRotate();

        if (this.presetTimer.timer) {
          clearInterval(this.presetTimer.timer);
          this.presetTimer.timer = null;
        }

        this.presetTimer.current.position = this.camera.position;
        this.presetTimer.current.target = this.controls.target;

        this.presetTimer.end.position = position;
        this.presetTimer.end.target = target;

        if (
          this.presetTimer.current.position == this.presetTimer.end.position &&
          this.presetTimer.current.target == this.presetTimer.end.target
        ) {
          console.error("Move Position & Target Offset Empty");
        } else {
          const loopCount =
            this.presetTimer.maxTime / this.presetTimer.interval;

          this.presetTimer.offset.position = this.getSolvOffset(
            this.presetTimer.current.position,
            this.presetTimer.end.position,
            loopCount
          );
          this.presetTimer.offset.target = this.getSolvOffset(
            this.presetTimer.current.target,
            this.presetTimer.end.target,
            loopCount
          );

          this.presetTimer.currTime = 0;

          this.presetTimer.timer = setInterval(() => {
            // Max Time에 도달하였을 경우 최종 목적 포지션으로 이동하고, Timer를 종료
            if (this.presetTimer.currTime >= this.presetTimer.maxTime) {
              this.setPresetValue(
                this.presetTimer.end.position,
                this.presetTimer.end.target
              );
              clearInterval(this.presetTimer.timer);
              this.presetTimer.timer = null;
              // Offset 만큼 더해 주면서 Position/Target을 이동
            } else {
              this.presetTimer.current.position = this.getSolvPosition(
                this.presetTimer.current.position,
                this.presetTimer.offset.position
              );
              this.presetTimer.current.target = this.getSolvPosition(
                this.presetTimer.current.target,
                this.presetTimer.offset.target
              );
              this.setPresetValue(
                this.presetTimer.current.position,
                this.presetTimer.current.target
              );
            }
            this.presetTimer.currTime += this.presetTimer.interval;
          }, this.presetTimer.interval);
        }
      } else {
        this.setPresetValue(position, target);
      }
    },

    // Camera의 Position과 Control의 Target을 설정
    /*
    - 회전을 관장하는 rotation/quaternion은 설정이 되지 않아 사용에서 배제함
    - 향후 추가 검토 후 필요할 경우 입력 할 필요가 있음
    */
    setPresetValue(position, target) {
      if (position) {
        this.camera.position.copy(position);
        // this.camera.position.set(position.x, position.y, position.z);
        // console.log(` - Position : ${CommUtil.getPos2Text(position)}`);
      } else {
        // console.log(" - position is undefined");
      }

      /* / 카메라에 대한 rotation을 설정 (사원수(quaternion)를 설정할 경우 별도로 설정하지 않음)
      if (rotation) {
        // this.camera.rotation.copy(rotation);
        this.camera.rotation.copy(new THREE.Euler(rotation.x, rotation.y, rotation.z));

        this.camera.rotation.set(rotation.x, rotation.y, rotation.z);
      }
      else {
        console.log(" - rotation is undefined");
      }
      */

      /* / 카메라에 대한 사원수(quaternion)를 설정
      if (quaternion) {
        this.camera.quaternion.copy(quaternion);
        console.log(` - quaternion : ${CommUtil.getPos2Text(quaternion)}`);
      } else {
        console.log(" - quaternion is undefined");
      }
      //////////////////////////////////////////// */

      // OrbitControls에 대한 Target을 설정
      if (target && this.controls) {
        this.controls.target.copy(target);
        // console.log(` - target : ${CommUtil.getPos2Text(target)}`);
        this.controls.update();
      } else {
        // console.log(" - target is undefined");
      }
    },

    // 사용자 설정한 즐겨보기(Preset)화면 위치로 이동
    movePreset(idx) {
      const presetCount = this.presets.length;

      // console.log(`movePreset() Preset Count : ${presetCount}`);

      // 사용자가 초기 설정한 카메라가 하나 이상 존재 할 경우
      if (presetCount > 0) {
        // 순차적으로 계속 변경함
        if (idx == -1) this.currPresetIdx++;
        // 사용자가 선택한 카메라로 설정 (없는 경우는 총개수 대비 나머지값 사용)
        else this.currPresetIdx = idx;

        if (this.currPresetIdx >= presetCount)
          this.currPresetIdx %= presetCount;
      } else {
        this.currPresetIdx = 0;
      }
      // console.log(` - userIdx : ${this.currPresetIdx}`);
      /*
      console.log(
        ` - Position : ${CommUtil.getPos2Text(
          this.presets[this.currPresetIdx].position
        )}`
      );
      console.log(
        ` - Target : ${CommUtil.getPos2Text(
          this.presets[this.currPresetIdx].target
        )}`
      );
      */

      const currPreset = this.presets[this.currPresetIdx];
      if (presetCount > 0 && currPreset) {
        this.setPreset(currPreset);
      } else {
        console.log(` - Preset Position is Empty`);
      }
    },

    // Zoom 을 설정된 Step 만큼 이동함
    setZoomChange() {
      console.log(`setZoomChange() ${this.zoom.curr.toFixed(2)}`);

      const newZoom = this.getRangeNext(this.zoom);

      this.camera.zoom = newZoom;
      this.camera.updateProjectionMatrix();

      this.zoom.curr = newZoom;
    },

    // FOV를 설정된 Step 만큼 변경 (Min/Max 처리 후 Max 보다 초과 될 경우 Min 값으로 다시 돌아감)
    setFovChange() {

      console.log("setFovChange - !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

      let step = this.fov.step;
      // console.log(`setFovChange() ${this.state.camera.currType}`);

      if (this.state.camera.currType == "Orthographic") {
        const newCoef = this.getRangeNext(this.ortCoef);

        // this.onWindowResize();

        if (newCoef <= 5) {
          this.camera.lookAt(new THREE.Vector3(newCoef, 0, 0));
        } else if (newCoef <= 10) {
          this.camera.lookAt(new THREE.Vector3(0, newCoef, 0));
        } else {
          this.camera.lookAt(new THREE.Vector3(0, 0, newCoef));
          
        }
        this.camera.zoom = newCoef / 10;
        this.camera.updateProjectionMatrix();

        this.ortCoef.curr = newCoef;
      } else {
        const currFov = this.fov.curr;

        // 현재 FOV 값에 따라 Step을 변경 함
        if (currFov >= 100) step *= 5;
        else if (currFov >= 50) step *= 2.5;

        let newFov = currFov + step;

        // 현재 FOV값이 Max값 보다 크거나 같을 경우 (최소값을 사용)
        if (currFov >= this.fov.max) newFov = this.fov.min;
        else if (newFov > this.fov.max) newFov = this.fov.max;

        this.setFov2Camera(newFov);

        console.log(`setFovChange() ${currFov} → ${newFov}`);
      }
      // [임시] 카메라의 Position 정보를 보여 줌
      this.addEMsgUser("camera-position");
    },

    // FOV가 변경되더라도 콘텐츠의 배율이 일정하게 유지 되도록 처리
    setFov2Camera(fov) {

      this.camera.fov = fov;

      // FOV 변경에 따라 카메라 Position을 재 계산할지 여부
      // Position을 자동으로 변경할 경우 FOV가 변경 되더라도 화면에 표출되는 3D콘텐츠의 크기는 유사하게 유지 됨
      const IS_MOVE_POSITION = false;

      let position = this.camera.position;

      this.camera.updateProjectionMatrix();
      this.controls.update();

      // FOV가 변하더라도 화면 위치는 고정이 되도록 처리
      if (IS_MOVE_POSITION) {
        /*
        this.camera.updateProjectionMatrix();
        this.controls.update();

        // 씬의 중심을 기준으로 카메라의 거리를 조정합니다.
        const box = new THREE.Box3().setFromObject(this.scene);
        const size = box.getSize(new THREE.Vector3());
        // const center = box.getCenter(new THREE.Vector3());

        const halfSize = Math.max(size.x, size.y, size.z) / 2;

        const distCurr =
          halfSize / Math.tan(THREE.MathUtils.degToRad(this.fov.curr / 2));
        const distNew = halfSize / Math.tan(THREE.MathUtils.degToRad(fov / 2));

        // this.camera.position.copy(center);
        this.camera.position.z += distNew - distCurr;
        // this.camera.lookAt(center);

        this.controls.update();
        */

        const distCurr = Math.tan(THREE.MathUtils.degToRad(this.fov.curr / 2));
        const distNew = Math.tan(THREE.MathUtils.degToRad(fov / 2));
        let distRate = 1;
        if (distNew != 0) distRate = distCurr / distNew;

        position.x *= distRate;
        position.y *= distRate;
        position.z *= distRate;

        // this.camera.position.copy(position);
      }

      this.fov.curr = fov;
    },

    // FOV / Near / Far를 설정
    setFov2Camera2(fov, near, far) {

      this.camera.fov = fov;
      this.camera.near = near;
      this.camera.far = far;

      this.camera.updateProjectionMatrix();
      this.controls.update();

      this.fov.curr = fov;
    },


    // Scene의 위치를 Position으로 이동
    /* 예상했던 것처럼 동작을 하지 않아 사용하지 않음 */
    // setSceneMove(position) {
    //   // const object = this.scene;
    //   const object = this.parentGroup;

    //   object.position.set(position);

    //   console.log(`setSceneMove() ${CommUtil.getPos2Text(position)}`);
    // },

    // 방향키에 따란 scene 이동 (향후 사용 예정)
    setSceneMoveKey(keyCode) {
      // const object = this.scene;
      const object = this.parentGroup;

      let position = object.position;
      const step = 0.5;

      switch (keyCode) {
        case "ArrowUp":
          position.z += step;
          break;
        case "ArrowDown":
          position.z -= step;
          break;
        case "ArrowLeft":
          position.y += step;
          break;
        case "ArrowRight":
          position.y -= step;
          break;
      }

      this.setSceneMove(position);
    },

    // Object의 위치를 설정된 값에 따란 방향키에 따라 이동
    setTargetMove(target) {
      // console.log(`setTargetMove() ${target}`);
      this.controls.target.copy(target);
      // this.controls.update();

      // console.log(`setTargetMove() ${CommUtil.getPos2Text(target)}`);
    },

    // 입력된 방향키에 따라 키보드 방향에 따라 변경해야 될 Target 위치를 설정
    setTargetMoveKey(event) {
      const keyCode = event.code;
      const keyCtrl = event.ctrlKey;
      const keyAlt = event.altKey;
      const keyShift = event.shiftKey;
      let offset = { x: 0, y: 0, z: 0 };
      let step = 0.1;

      // Ctrl/Shift에 따라 이동 Step 조절
      if (keyCtrl) step /= 4;
      else if (keyShift) step *= 4;

      console.debug(
        `setTargetMoveKey(event) : ${keyCode} [${keyCtrl}/${keyAlt}/${keyShift}]`
      );

      switch (keyCode) {
        case "ArrowUp":
          if (keyCtrl) offset.z = step;
          else offset.y = -step;
          break;
        case "ArrowDown":
          if (keyCtrl) offset.z = -step;
          else offset.y = step;
          break;
        case "ArrowLeft":
          offset.x = step;
          break;
        case "ArrowRight":
          offset.x = -step;
          break;
      }

      const target = {
        x: this.controls.target.x + offset.x,
        y: this.controls.target.y + offset.y,
        z: this.controls.target.z + offset.z,
      };

      this.setTargetMove(target);
    },

  

    // WireFrame을 화면에 표출 여부를 변경
    toggleWireframe() {
      this.state.showWireframe = !this.state.showWireframe;
      if (this.content) {
        this.content.traverse((child) => {
          if (child.isMesh) {
            // child.material.wireframe = !child.material.wireframe;
            child.material.wireframe = this.state.showWireframe;
          }
        });
        Logger.info(
          `Wireframe Mode: ${this.state.showWireframe ? "On" : "Off"}`,
          "GltfViewer"
        );
      }
    },

    // Grid Line을 화면에 표출 여부를 변경
    toggleGrid() {
      this.state.showGrid = !this.state.showGrid;
      this.gridHelper.visible = this.state.showGrid;
      Logger.info(
        `Grid Visibility: ${this.state.showGrid ? "On" : "Off"}`,
        "GltfViewer"
      );
    },

    // Auto Rotation(자동 회전)을 처리 여부를 변경
    toggleAutoRotate() {
      this.state.showAutoRotate = !this.state.showAutoRotate;
      this.controls.autoRotate = this.state.showAutoRotate;
      Logger.info(
        `Auto Rotation : ${this.state.showAutoRotate ? "On" : "Off"}`,
        "GltfViewer"
      );
    },

    // Raycaster Line을 화면에 표출 할지 여부를 변경
    toggleRaycasterLine() {
      this.state.showRaycLine = !this.state.showRaycLine;
      this.showRaycasterLine(this.state.showRaycLine);
      Logger.info(
        `Raycaster Line : ${this.state.showRaycLine ? "On" : "Off"}`,
        "GltfViewer"
      );
    },

    // SSE 메시지 처리를 사용할지 여부를 변경
    toggleServerSentEvent() {
      this.state.isServerEvent = !this.state.isServerEvent;

      if(this.state.isServerEvent) {
        this.addServerSentEventListeners();
      }
      else {
        this.closeServerSentEventListeners();
      }

      const msgText = `ServerEvent : ${this.state.isServerEvent ? "On" : "Off"}`;
      this.addEMsg(msgText);
      Logger.info(msgText, "GltfViewer");

    },




    // Raycaster Line을 화면에 표시
    showRaycasterLine(isShow) {
      const USE_BOXHELPER = true;

      if (isShow) {
        // 이전에 생성된 ArrowHelper Line이 있을 경우 종료함
        if (this.arrowHelper) this.showRaycasterLine(false);

        if (USE_BOXHELPER) {
          const geo = new THREE.BoxGeometry(0, 2, 0);
          const material = new THREE.MeshLambertMaterial({ color: 0x0000ff });
          const mesh = new THREE.Mesh(geo, material);
          // geometry의 bounding box 강제 갱신
          mesh.geometry.computeBoundingBox();
          // Bounding Box 시각화
          this.boxHelper = new THREE.BoxHelper(mesh, 0xff0000);
          this.scene.add(this.boxHelper);
        }

        const origin = this.raycaster.ray.origin; // 시작점 (THREE.Vector3)
        const direction = this.raycaster.ray.direction; // 방향 벡터 (THREE.Vector3)
        const ArrowLen = 20;
        const ArrowColor = 0xff0000;

        this.arrowHelper = new THREE.ArrowHelper(
          direction,
          origin,
          ArrowLen,
          ArrowColor
        ); // 길이 및 색상 설정
        this.scene.add(this.arrowHelper);
      } else {
        if (USE_BOXHELPER) this.scene.remove(this.boxHelper); // 이전 화살표 제거
        this.scene.remove(this.arrowHelper); // 이전 화살표 제거
      }
    },

    // Hide된 객체를 화면에 보여줄지 여부를 변경
    toggleHideObject() {
      this.state.showHideObject = !this.state.showHideObject;
      if (this.hideObjects.length > 0) {
        if (this.state.showHideObject) {
          this.hideRestore("all");
          // this.addEMsg(`숨김 처리 복원 (${this.hideObjects.length})`);
        } else {
          this.hideObjects.forEach((object) => {
            // console.log(`toggleHideObject() : ${object.name}`);
            object.visible = false;
          });
          // this.addEMsg(`숨김 처리 완료 (${this.hideObjects.length})`);
        }

        // TODO Child가 존재할 경우 Child에서도 Hide 속성을 줄 필요 있음
        // (Child Object가 Raycaster에는 반응을 함)

        //////////////////////////////////////////////////////////// */
      } else {
        this.addEMsg("숨김 처리된 객체가 존재하지 않습니다.");
      }
    },

    // Marker를 화면에 보여줄지 여부를 변경
    toggleMarker() {
      this.state.showMarker = !this.state.showMarker;

      if (this.markObjects.length > 0) {

        this.markObjects.forEach((markObj) => {
          if(markObj.mObject && markObj.mObject.parent) {
            console.log(`toggleMarker() :`);
            console.log(markObj.mObject);
            this.setMarkerShow(markObj, this.state.showMarker);
          }
        });

        // 마커 숨김이 되어 있는 동안 위치가 변경되었을 수도 있으므로 2D 마커에 대한 위치 재 계산
        if(this.state.showMarker && this.state.countMarker2D > 0)
          this.updateMark2DPos();

        /*
        if (this.state.showMarker)
          this.addEMsg(`마커 숨김 처리 복원 (${this.markObjects.length})`);
        else this.addEMsg(`마커 숨김 처리 완료 (${this.markObjects.length})`);
        */

      } else {
        this.addEMsg("숨김 처리된 마커 객체가 존재하지 않습니다.");
      }

      /*
      if(this.mark2dObjects.length > 0)
      {
        this.mark2dObjects.forEach((object) => {
          object.isShow = this.state.showMarker;
        });

        // 마커 숨김이 되어 있는 동안 위치가 변경되었을 수도 있으므로 위치 재 계산
        if(this.state.showMarker && this.state.countMarker2D > 0)
          this.updateMark2DPos();
      }
      */


      /*
      if(this.mark2dObjects.length > 0)
      {
        this.divMark2ds = [];
        if(this.state.showMarker)   this.setDivMark();
      }
      */7


      /* / [임시] 선택된 객체가 존재할 경우 2D 마커를 보여 줌
      if(this.selObject) {
        if(this.state.showMarker) {
          this.divMark2d.isShow = true;

          const position = this.getObject2DPos(this.selObject);
          this.divMark2d.position = position;

          // this.divMark2d.position.x = 200;
          // this.divMark2d.position.y = 400;

          this.divMark2d.title = "11111";
          this.divMark2d.descript = "222222222222222222222222222";

          //
          if(this.mark2dObjects.length==0) {
            const pos3D = {x:0,y:0,z:0};
          }
          //
        }
        else {
          this.divMark2d.isShow = false;
        }
      }
      else
        this.divMark2d.isShow = false;
      //////////////////////////////////////////////// */

    },

    // Active 객체를 화면에 보여줄지 여부를 변경
    toggleActiveObject() {
      this.state.showActiveObject = !this.state.showActiveObject;

      console.log(`toggleActiveObject() : ${this.state.showActiveObject}`);

      /*
      // Timer가 작동 중일 경우 종료
      if (this.viewActiveObject.timer) {
        this.viewActiveObject.isShow = false;
        this.state.showActiveObject = this.viewActiveObject.isShow;
        clearTimeout(this.viewActiveObject.timer);
      }
      */

      // 이미 선택된 Object가 존재할 경우 Clear 수행
      if(this.selObject) {
        this.offObject(this.selObject);
        this.selObject = null;
        this.clearDiv();
      }

      if (this.activeObjects.length > 0) {

        const dState = this.state.activeDisplay;
        let type = dState.type;
        let color = dState.color;

        this.activeObjects.forEach((object) => {
          if (this.state.showActiveObject) {
            if(type == "color")
              this.onObjectColor(object, color);
            else if(type == "outline") {
              // outline 처리 시 다소 시간이 소요가 됨
              this.onObjectOutLine(object, color, dState.lineWidth, dState.thresholdAngle);
            }
            else if(type == "box") {
              this.onObjectBox(object, color);
            }
            else if(type == "overdraw")
              this.onObjectOverDraw(object, dState.osFactor, dState.osUnits);
            else
              console.log(`toggleActiveObject() Unknown type(${type})`);
          } else {
            this.offObject(object);
          }
        });

        // Active 보기 설정의 경우 Timer를 사용하여 일정 시간이 지나고 나면 종료함
        if (this.state.showActiveObject) {
          // this.addEMsg(`Active 보기 설정 완료 (${this.activeObjects.length})`);
          /* / 설정된 시간 이후에 Widget 화면을 숨김
          this.viewActiveObject.timer = setTimeout(() => {
            this.toggleActiveObject();
          }, this.viewActiveObject.timeout);
          ////////////////////////////////////////////////////// */
        } else {
          // this.addEMsg(`Active 보기 설정 종료 (${this.activeObjects.length})`);
        }
      } else {
        this.addEMsg("Active 객체가 존재하지 않습니다.");
      }
    },

    // 보기 설정에 대한 부분을 변경
    updateDisplay() {
      // if(this.state)
    },

    // 화면의 조명 설정을 변경
    updateLight() {
      let DLColor = 0xffffff;
      let DLIntensity = 1.2;
      let DLPosition = { x: 5, y: 10, z: 7.5 };

      let HLSkyColor = 0xffffff;
      let HLGroundColor = 0x444444;
      let HLIntensity = 1.2;
      let HLPosition = { x: 0, y: 20, z: 0 };

      // 초기 속성 JSON에서 Light 관련 정보를 조회하여 입력
      if (this.initState.light) {
        if (this.initState.light.direction) {
          const jsonLight = this.initState.light.direction;
          if (jsonLight.color) DLColor = new THREE.Color(jsonLight.color);
          if (jsonLight.intensity) DLIntensity = jsonLight.intensity;
          if (jsonLight.position) DLPosition = jsonLight.position;
        }

        if (this.initState.light.hemisphere) {
          const jsonLight = this.initState.light.hemisphere;
          if (jsonLight.skyColor)
            HLSkyColor = new THREE.Color(jsonLight.skyColor);
          if (jsonLight.groundColor)
            HLGroundColor = new THREE.Color(jsonLight.groundColor);
          if (jsonLight.intensity) HLIntensity = jsonLight.intensity;
          if (jsonLight.position) HLPosition = jsonLight.position;
        }
      }

      // Direction Light가 초기화 되어 있을 경우
      if (this.dirLight) {
        this.dirLight.color.set(DLColor);
        this.dirLight.intensity = DLIntensity;
      }
      // 아직 초기화가 되지 않은 경우
      else {
        this.dirLight = new THREE.DirectionalLight(DLColor, DLIntensity);
        this.dirLight.position.set(DLPosition.x, DLPosition.y, DLPosition.z);
        this.scene.add(this.dirLight);
      }

      // Hemisphere Light가 초기화 되어 있을 경우
      if (this.hemiLight) {
        this.hemiLight.color.set(HLSkyColor);
        this.hemiLight.groundColor.set(HLGroundColor);
        this.hemiLight.intensity = HLIntensity;
      }
      // 아직 초기화가 되지 않은 경우
      else {
        this.hemiLight = new THREE.HemisphereLight(
          HLSkyColor,
          HLGroundColor,
          HLIntensity
        );
        this.hemiLight.position.set(HLPosition.x, HLPosition.y, HLPosition.z);
        this.scene.add(this.hemiLight);
      }

    },


    // Background Color를 설정
    // setLightColor(color) {},

    // Background Image 또는 Color를 설정
    setBackgroud() {
      

      let type = "color";
      let color = "#3E3D42";

      this.state.loadBG = 0; // Background Loader [시작]

      if (this.initState.background) {
        if (this.initState.background.type)
          type = this.initState.background.type;
        if (this.initState.background.color)
          color = new THREE.Color(this.initState.background.color);

        /*
        if (type == "image") {
          // Background Type이 이미지이나, 이미지 주소가 없을 경우 강제로 Color로 변경
          if (!this.initState.bgImage) type = "color";
        }
        */
      }

      if (type == "color") {
        console.log(`setBackgroud() color (${color})`);
        this.scene.background = color;
        this.state.loadBG = 1; // Background Loader [완료]
      } else if (type == "image") {
        // createTexture() / addTextureJSON() 함수로 처리가 되므로 별도 처리를 하지 않음 (현재 함수에서는 별도)

        /*
        const url = this.initState.background.bgImage;
        const textureLoader = new THREE.TextureLoader();
        console.log(`setBackgroud() image (${url})`);
        textureLoader.load(
          url,
          (texture) => {
            // texture.encoding = THREE.sRGBEncoding;
            // texture.minFilter = THREE.LinearMipmapLinearFilter;    // 텍스처의 픽셀들이 화면에서 더 작게 표시될 때 사용
            texture.magFilter = THREE.LinearFilter; // 텍스처의 픽셀들이 화면에서 더 크게 표시될 때 사용
            texture.generateMipmaps = true;
            // texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy(); // Anisotropic filtering
            this.scene.background = texture;

            this.state.loadBG = 1; // Background Loader [완료]
          },
          undefined,
          (error) => {
            console.error(
              "An error happened while loading the background image",
              error
            );
            this.state.loadBG = 9; // Background Loader [실패]
          }
        );
        */
      } else {
        console.log(`setBackgroud() Unknown Type (${type})`);
        this.state.loadBG = 1; // Background Loader [완료]
      }
    },

    // 광원과 교차 되는 오브젝트들을 체크하여 반환
    intersectObject(event) {
      // console.log(`intersectObject()`);

      // 마우스 위치를 정규화된 장치 좌표(-1에서 +1)로 변환
      const rect = this.$refs.rendererContainer.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      if (event.button == 2)
        console.log(
          `intersectObject() mouse(${CommUtil.getPos2Text(this.mouse, 2)})`
        );

      // Raycaster로 마우스 위치로부터 레이캐스트
      this.raycaster.setFromCamera(this.mouse, this.camera);

      // Raycaster Line 설정이 되어 있을 경우 Line을 추가함
      if (this.showRaycLine && event.button == 2) this.showRaycasterLine(true);

      // 교차된 객체들을 받아옴
      const intersects = this.raycaster.intersectObjects(
        this.scene.children,
        true
      );

      let object = null;

      if (intersects.length > 0) {
        // 교차된 모든 오프젝트 중 hide 된 Object를 제외 처리 후 가져올 경우
        // 화면에 보이지는 않지만 Grid Helper로 인하여 원하지 않는 객체가 검출될 수도 있음
        for (let i = 0; i < intersects.length; i++) {
          object = intersects[i].object;
          if (object.visible && object.name) {

            let parent = object.parent;
            
            // 부모의 부모가 "singleGltf" 그룹에 포함되어 있는지 확인
            if (parent && parent.parent && parent.parent.name === "singleGltf") {
              console.log(`Selected object from the 'singleGltf' group's child: ${object.name}`);
              object = object.parent.parent;
              break;
            }
            break;
          } else {
            /*
            if (object) {
              if (object.name) console.debug(`[${i}] ${object.name} is skip`);
              else console.debug(`[${i}] is skip (unnamed)`, object);
            } else {
              console.debug(`[${i}] is skip (Not object)`, intersects[i]);
            }
            ////////////////////////////////////// */
          }
        }
        // 첫번째 Object만 사용할 경우
        // object = intersects[0].object;

        // Scene 이하 최상 위 Parent를 조회 하여 사용
        // const intersectedObject = this.getObjectParent(intersects[0].object);
        // console.log(`${object.name} / ${this.getObjectParent(object).name} `);

        // 휠 클릭을 할 경우 교차된 정보를 Log로 출력
        if (event.button == 1 && intersects.length > 1) {
          for (let i = 0; i < intersects.length; i++) {
            const temp = intersects[i].object;
            let strMsg = `[${i}]`;
            if (temp) {
              strMsg += " ";
              if (temp.name) strMsg += `${temp.name}`;
              else strMsg += "Unnamed";
              if (temp.type) strMsg += ` / ${temp.type}`;
              if (temp.visible) strMsg += " / Visible";
              else strMsg += " / Hide";
              if (temp.messvisible) strMsg += " / Visible";
              else strMsg += " / Hide";
            } else {
              strMsg += " NotObjcet";
            }
            console.debug(strMsg);
          }
        }
        ///////////////////////////////////////////// */
      } else {
        console.log("intersects.length is empty");
      }

      return object;
    },

    // Object가 선택이 된 상태를 표시
    onObject(object) {
      let rtn = false;
      const dtObject = object.userData.digitalTwin;

      if (dtObject) {
        let isOnDisplay = true;
        const dtDisplay = dtObject.display;

        if (dtDisplay == "active" && dtObject.action && dtObject.action.type) {
          const type = dtObject.action.type;

          // type이 Morph일 경우 HighLight를 사용하지 않음
          if (type == "morph") isOnDisplay = false;

          if (isOnDisplay) {

            const dState = this.state.activeDisplay;
            const type = dState.type;
            const color = dState.color;

            if(type == "color")
              this.onObjectColor(object, color);
            else if(type == "outline")
              this.onObjectOutLine(object, color, dState.lineWidth, dState.thresholdAngle);
            else if(type == "box")
              this.onObjectBox(object, color);
            else if(type == "overdraw")
              this.onObjectOverDraw(object, dState.osFactor, dState.osUnits);
            else
              console.log(`onObject() Unknown type(${type})`);

          }
          rtn = true;
        }
      } else {
        console.log(`${object.name} is Not DT Object`);
      }

      return rtn;
    },


    // DT Object는 아니지만, 마우스 우클릭에 반응을 하는 Object
    onObject2(object) {
      let rtn = false;

      if (object.name) {

        if (object.visible == false) {
          rtn = false;
        }
        else if (object.isMesh) {
          rtn = true;
        }
        else if (object.material.emissive) {
          rtn = true;
        }

      } else {
        console.log(`${object.name} is Not Support Object`);
      }

      return rtn;
    },


    // Object 명을 입력 받아 사용자가 클릭한 것과 동일하게 이벤트를 발생 시킴
    onObjectExt(objName) {

      let rtn = true;
      const object = this.scene.getObjectByName(objName);
      if (object) {
        if(this.onObject(object)) {
          this.selObject = object;
          this.onMouseLeftClick();
        }

        rtn = true;
      }
      return rtn;
    },



    // Object가 선택이 되었다가 해제된 경우에 대한 처리
    offObject(object) {
      // 배경을 원복함
      if (object) {

        const type = this.state.activeDisplay.type;

        if(type == "color") {
          if(object.material && object.material.emissive)
            object.material.emissive.setHex(object.currentHex);
        }
        else if(type == "outline" || type == "box") {
          if(this.outlineObjects.length > 0) {
            this.outlineObjects.forEach((line) => {
              this.scene.remove(line);
            });
            this.outlineObjects = []; // 메모리 초기화
          }
        }
        else if(type == "overdraw") {
          object.traverse((child) => {
            child.material.polygonOffset = false;
          });
        }

        // Logger.debug(`${object.name || "Unnamed"} is Clear`, "GltfViewer");
        /*
        console.log(object.currentHex);
        if (object.currentHex) {
          object.material.emissive.setHex(object.currentHex);
          Logger.info(`${object.name || "Unnamed"} is Clear`, "GltfViewer");
        } else {
          CommUtil.debug(
            `${object.name || "Unnamed"} currentHex is Empty`,
            "GltfViewer"
          );
        }
        */
      } else {
        Logger.debug("object is Empty", "GltfViewer");
      }
    },

    // onObject에 대한 Color 처리 (Type : color / outline / overdraw)
    onObjectColor(object, color = 0x00ff00) {
      console.log(`onObjectColor() ${object.name} : ${color}`);

      if (object.material && object.material.emissive) {
        // 원래 가지고 있는 색상 정보를 원복을 위해서 보관
        object.currentHex = object.material.emissive.getHex();

        // 선택된 객체의 Material만 사용 (미 설정이 동일한 Material 속성이 존재하는 객체들이 같이 선택 됨)
        object.material = object.material.clone();

        // 사용자가 지정한 색상으로 변경
        // object.material.emissive.setHex(new THREE.Color(color));
        object.material.emissive.setHex(color);

      } else {
        console.log(
          `${object.name} is Not Supported material.emissive`
        );
      }
    },

    // onObject에 대한 외부 Line 처리 (Type : color / outline / overdraw)
    onObjectOutLine(object, color = 0x00ff00, lineWidth = 2, thresholdAngle = 1 ) {
      console.log(`onObjectOutLine() ${object.name} : ${color} / ${lineWidth}`);

      // 이미 선택된 OutLine이 존재할 경우 제거
      // if (this.selOutLine) this.scene.remove(this.selOutLine);

      if (object.isMesh) {
        const edges = new THREE.EdgesGeometry(object.geometry, thresholdAngle);
        const line = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({
            color: new THREE.Color(color),
            linewidth: lineWidth,
          })
        );

        line.position.copy(object.position);
        line.rotation.copy(object.rotation);
        line.scale.copy(object.scale);

        this.outlineObjects.push(line);

        this.scene.add(line);
        // this.controls.update();
      } else {
        console.log(
          `${object.name} is Not Supported isMesh`
        );
      }
    },

    // Type : color / outline / overdraw
    onObjectBox(object, color = 0x00ff00) {
      console.log(`onObjectBox() ${object.name} : ${color}`);

      // 이미 선택된 OutLine이 존재할 경우 제거
      // if (this.selOutLine) this.scene.remove(this.selOutLine);

      if (object.isMesh) {

        // 바운딩 박스 계산
        const objBox = new THREE.Box3().setFromObject(object);

        // 박스를 생성 (육면체, Line)
        const box = new THREE.Box3Helper(objBox, color);

        this.outlineObjects.push(box);

        this.scene.add(box);
        // this.controls.update();
      } else {
        console.log(
          `${object.name} is Not Supported isMesh`
        );
      }
    },

    // onObject에 대한 Over Draw 처리
    onObjectOverDraw(object, osFactor = -1, osUnits = -4) {
      console.log(
        `onObjectOverdraw() ${object.name} : ${osFactor} / ${osUnits}`
      );

      if (object.material) {
        object.material = object.material.clone();
        object.traverse((child) => {
          child.material.polygonOffset = true;
          child.material.polygonOffsetFactor = osFactor; // 폴리곤을 약간 앞으로 렌더링
          child.material.polygonOffsetUnits = osUnits; // 오프셋 크기 조정
          child.material.needsUpdate = true; // Material 업데이트를 적용
        });

      } else {
        console.log(`${object.name} is Not Supported material`);
      }
    },

    // 선택된 오브젝트를 화면에서 숨김 처리를 함
    hideObject(object) {
      // console.log("hideObject()");
      if (object) {
        this.hideObjects.push(object);

        const objName = object.name;
        // Marker일 경우에 대한 처리
        if(this.isMarker2D(objName)) {
          const markObj = this.getMarkerObject(objName);
          this.setMarkerShow(markObj, false);
        }
        else {
          // console.log(`hideObject() : ${object.name}`);

          // object.visible = false;
          // 자식 객체도 숨김 처리 자식에 대해서 수행을 하지 않을 경우 intersectObject 에서 검출 될 수도 있음
          object.traverse((child) => {
            console.log(`hideObject() object.traverse : ${child.name}`);
            child.visible = false;
          });
        }

      } else {
        console.log(`object is Empty`);
      }
    },


    // Hide된 오브젝트들을 다시 보이게끔 설정함
    hideRestore(objName) {
      if (objName == "all") {
        if (this.hideObjects.length > 0) {
          this.hideObjects.forEach((object) => {
            // object.visible = true;

            /* / 오브젝트들을 반투명하게 설정 ()
            if (object.material) {
              console.log(`hideRestore() ${object.name} set opacity`);
              object.material.transparent = true;
              object.material.opacity = 0.1;
            }
            //////////////////////////////////////// */

            // 하위 객체까지 모두 포함하여 Hide 처리
            object.traverse((child) => {
              child.visible = true;
              if(child.isMesh) {  // 메쉬 객체에만 적용
                // 선택된 객체의 Material만 사용 (미 설정이 동일한 Material 속성이 존재하는 객체들이 같이 선택 됨)
                child.material = child.material.clone();
                child.material.transparent = true;  // 투명 속성 활성화
                child.material.opacity = 0.3;       // 투명도 설정 (0.5 = 50% 투명)
              }
            });


          });
        } else {
          this.addEMsg("숨김 처리된 객체가 존재하지 않습니다.");
        }
      } else {
        const object = this.scene.getObjectByName(objName);
        object.visible = true;
      }
    },

    // 선택된 오브젝트를 scene에서 삭제 함 (Visible 속성으로 복원 불가)
    removeObject(object) {
      // console.log("removeObject()");

      if (object && object.parent) {

        // console.log(`removeObject() : ${object.name} / ${object.parent.name}`);
        this.removeObjects.push({ object, parent: object.parent });

        // Marker일 경우에 대한 처리
        if(this.isMarker2D(object.name)) {
          console.log(`removeObject() Marker : ${object.name}`);
          const markObj = this.getMarkerObject(object.name);
          this.removeMark2(markObj);
        }
        else {
          console.log(`removeObject() : ${object.name} / ${object.parent.name}`);
          object.parent.remove(object);
        }
      } else {
        console.log(`object or parent is Empty`);
      }


    },

    // Remove Object에 대한 복원 (추가적으로 개발이 필요)
    removeRestore() {
      // console.log("removeRestore()");

      // 무조건 Reload로 처리 (parent를 통하여 복원은 parent Object를 찾지 못해 정상적으로 사용이 불가)
      const isReLoad = true;

      if (isReLoad) {
        if (this.hideObjects.length > 0) this.loadGLTF();
        else console.log("Hide Object is Empty");
      } else {
        // parent를 찾지 못하여 정상 처리가 되지 않음
        this.removeObjects.forEach((object, parent) => {
          // object.visible = true;
          // this.scene.add(object);
          if (parent instanceof THREE.Object3D) {
            parent.add(object); // 부모에 객체를 다시 추가합니다.
          } else {
            console.error(
              `Parent[${parent.name}] is not a valid THREE.Object3D instance.`
            );
          }
        });
        this.removeObjects = []; // 메모리 초기화
      }
    },

    // JSON Data의 Digital Twin 속성을 기반으로 Display 설정
    setObjectDisplay() {
      let digitTwinCount = 0;

      if (this.initState.digitTwin && this.initState.digitTwin.length > 0) {
        let hideCount = 0;
        let removeCount = 0;
        let activeCount = 0;
        let normalCount = 0;
        let unknownCount = 0;
        let notObjCount = 0;

        this.initState.digitTwin.forEach((jData) => {
          const object = this.scene.getObjectByName(jData.name);

          if (object) {
            // digital Twin 속성이 hide인 오프젝트만 찾아 숨김 처리
            if (jData.display == "hide") {
              this.hideObject(object);
              hideCount++;
            } else if (jData.display == "remove") {
              this.removeObject(object);
              removeCount++;
            } else if (jData.display == "active") {
              this.activeObjects.push(object);
              activeCount++;
            } else if (jData.display == "normal") {
              normalCount++;
            } else {
              unknownCount++;
              console.log(
                `${jData.name} / ${jData.display} 정의 되지 않은 Display 설정`
              );
            }

            // Materail 속성이 존재 할 경우 (Object의 색상을 변경하여 줌)
            if(jData.material) {

              object.traverse((child) => {
                if (child.isMesh && child.visible) {
                  // tObj.texture.flipY = false;
                  // 메쉬의 재질에 텍스처를 적용
                  if(child.material) {
                    child.material = child.material.clone();
                    if(jData.material.color)
                      child.material.color.set(new THREE.Color(jData.material.color));
                    if(jData.material.emissive) {
                      child.material.emissive.set(new THREE.Color(jData.material.emissive));

                      // 선택 후 원복을 대비하여 기본 색상 정보를 미리 보관
                      child.currentHex = child.material.emissive.getHex();
                    }

                    child.material.needsUpdate = true;

                  }
                }

              });

            }


          } else {
            console.log(`${jData.name} 존재하지 않는 객체`);
            notObjCount++;
          }

          digitTwinCount++;
        });

        console.log(
          `setObjectDisplay() Digital Twin : ${removeCount}` +
            `, hide : ${hideCount},  remove : ${removeCount}` +
            `, active : ${activeCount}, normal : ${normalCount}` +
            `, NotObj : ${notObjCount}, unknown : ${unknownCount}`
        );
      } else {
        console.log(`this.initState.digitTwin is Empty!`);
      }

      return digitTwinCount;
    },

    // JSON Data의 Digital Twin 속성을 객체의 User Data에 추가
    // Hide / Remove 속성도 같이 처리 (Loop 최소화를 위해서 한꺼번에 처리)
    setObjectUserData() {
      if (this.initState.digitTwin && this.initState.digitTwin.length > 0) {
        this.initState.digitTwin.forEach((jData) => {
          const object = this.scene.getObjectByName(jData.name);
          // if (object && jData.display == "active") {   // Active일 경우만 userData에 입력
          if (object) {
            // Active와 상관없이 Digital Twin 속성이 있을 경우 userData에 입력
            // newProperty 입력 전 Log를 출력해도 newProperty 값이 입력된 형태로 Log가 출력됨
            // console.log("User Data(Old) : ", object.userData);

            // 초기 설정 JSON에 입력되어 있는 Digital Twin 속성을 3D 객체의 user Data에 입력
            object.userData.digitalTwin = jData;

            // console.log("User Data (New) : ", object.userData);
            // console.log("User Data (Add) : ", jData.name);
          }
        });
      }
    },

    // 위젯을 화면에 보이도록 처리
    showDivWidget() {
      // console.log( `showDivWidget x,y:${this.divWidget.position.x},${this.divWidget.position.y}`);

      // 모든 위젯들을 종료
      this.clearDiv();

      /*
      console.log(`  - margin : ${this.initState.widget.margin}`);
      console.log(
        `  - widget : ${this.initState.widget.width} x ${this.initState.widget.height}`
      );
      console.log(
        `  - chart : ${this.initState.chart.width} x ${this.initState.chart.height}`
      );
      */

      /* / Mouse Point가 화면은 4분할(2x2) 했을 때 어디에 위치 해 있는지 여부
      // 위젯을 마우스에 따른 위치를 선정할 경우 (우측 상단에 고정하여 사용하므로 사용 하지 않음)
      const marginDef = this.initState.widget.margin;
      const isRight =
        event.clientX > this.$refs.rendererContainer.clientWidth / 2;
      const isBottom =
        event.clientY > this.$refs.rendererContainer.clientHeight / 2;

      let marginX = isRight
        ? -1 * (this.initState.widget.width + marginDef)
        : marginDef;
      let marginY = isBottom
        ? -1 * (this.initState.widget.height + marginDef)
        : marginDef;

      this.divWidget.position = {
        x: event.clientX + marginX,
        y: event.clientY + marginY,
      };
      */

      // this.divWidget.width = 800;
      // this.divWidget.height = 600;
      // this.divWidget.width = this.initState.widget.width;
      // this.divWidget.height = this.initState.widget.height;

      // Widget DIV를 화면에 표출
      this.divWidget.isShow = true;

      // Widget 종료 Timer를 사용하지 않아야 되는 경우를 분리
      let isTimer = true;
      
      // Video일 경우 Timer를 사용하지 않음
      if(this.divWidget.type == "video")  isTimer = false;
      // Chart이고, LineY2R(Line/Y축2개/Realtime)일 경우 Timer를 사용하지 않음
      else if(this.divWidget.type == "chart") {
        const dtObject = this.getDTObject(this.selObject);
        if (dtObject) {
          const target = dtObject.action.target;
          if(target == "LineY2R")
            isTimer = false;
        }
      }

      // type이 video가 아닌 경우에만 Timer를 동작함
      if(isTimer) {
        // 설정된 시간 이후에 Widget 화면을 숨김
        this.divWidget.timer = setTimeout(() => {
          this.divWidget.isShow = false;
        }, this.divWidget.timeout);
      }

      /*
      this.initState.divWidget.timer;
      this.initState.divWidget.width;
      this.initState.divWidget.height;
      */
    },

    /*/ object : 3D 콘텐츠 내 사용자가 선택된 객체
    showDivInfo(object) {
      // Timer가 작동 중일 경우 종료
      if (this.divInfo.timer) clearTimeout(this.divInfo.timer);

      /*  / Chart Timer도 동작 중일 경우 종료
      if (this.divWidget.timer) {
        this.showDivWidget = false;
        clearTimeout(this.divWidget.timer);
      }
      /////////////////////////////////////// *  /

      // Object Info DIV를 화면에 표출
      this.divInfo.isShow = true;

      const actObject = this.getActiveObject(this.selObject);

      // 선택된 객체의 정보 저장
      this.selectedObjectInfo = {
        title: actObject.dtname,
        name: object.name,
        dtname: actObject.dtname,
        parent: this.getObjectParentName(object),
        position: object.position,
        rotation: object.rotation,
        scale: object.scale,
        size: this.getObjectSize(object),
        material: object.material,
        geometry: object.geometry,
        camera: {
          position: this.camera.position,
          rotation: this.camera.rotation,
          quaternion: this.camera.quaternion,
        },
      };

      / * / 설정된 시간 이후에 Object Info DIV를 화면에서 숨김
      this.divInfo.timer = setTimeout(() => {
        this.divInfo.isShow = false;
      }, 1000 * this.initState.objectInfo.timer); * /
    },
    */

    /* / actObject : 설정 JSON에서 activeObject 항목에 포함된 정보 (dtname, type, url, iot, 등)
    showDivChart(actObject) {
      console.log(
        `showDivChart(${actObject.dtname}) : ${this.initState.chart.width} x ${this.initState.chart.height} ( ${actObject.target} / ${actObject.url})`
      );

      // Timer가 작동 중일 경우 종료
      if (this.divChart.timer || this.divChart.isShow) {
        this.selectedObjectName = "";
        this.divChart.isShow = false;
        this.divChart.target = "";
        this.divChart.url = "";
        clearTimeout(this.divChart.timer);
      }

      / * / Widget Timer도 동작 중일 경우 종료
      if (this.divWidget.timer) {
        this.showDivWidget = false;
        clearTimeout(this.divWidget.timer);
      }
      /////////////////////////////////////////// * /

      /*
      this.divChart.width =
        this.divWidget.width -
        this.initState.chart.margin.left -
        this.initState.chart.margin.right;
      this.divChart.height =
        this.divWidget.height -
        this.initState.chart.margin.top -
        this.initState.chart.margin.bottom;
      * /
      // Object Info DIV를 화면에 표출
      this.divChart.isShow = true;

      this.divChart.width = this.initState.chart.width;
      this.divChart.height = this.initState.chart.height;

      this.divChart.target = actObject.target;
      this.divChart.url = actObject.url;

      /* / 설정된 시간 이후에 Chart Info DIV를 화면에서 숨김
      this.divChart.timer = setTimeout(() => {
        this.divChart.isShow = false;
      }, 1000 * this.initState.chart.timer); * /
    },
    ///////////////////////////////////////////////////// */

    /* / actObject : 설정 JSON에서 activeObject 항목에 포함된 정보 (dtname, type, url, iot, 등)
    showDivVideo(actObject) {
      console.log(
        `showDivVideo(${actObject.dtname}) : ${this.initState.video.width} x ${this.initState.video.height} ( ${actObject.target} / ${actObject.url})`
      );

      /* / Timer가 작동 중일 경우 종료
      if (this.divVideo.timer || this.divVideo.isShow) {
        this.selectedObjectName = "";
        this.divVideo.isShow = false;
        this.divVideo.type = "";
        this.divVideo.iot = "";
        clearTimeout(this.divVideo.timer);
      }
      ///////////////////////////////////////////// * /

      // Object Info DIV를 화면에 표출
      this.divVideo.isShow = true;

      this.divVideo.width = this.initState.video.width;
      this.divVideo.height = this.initState.video.height;

      this.divVideo.target = actObject.target;
      this.divVideo.url = actObject.url;

      /* / 설정된 시간 이후에 Chart Info DIV를 화면에서 숨김
      this.divVideo.timer = setTimeout(() => {
        this.divVideo.isShow = false;
      }, 1000 * this.initState.chart.timer); * /
    },
    */

    // 현재 실행 중인 Div를 종료함
    clearDiv(target="all") {

      if(target == "all" || target == "context") {
        this.contextMenu.isShow = false;
      }

      if(target == "all" || target == "widget") {
        // Widget Timer가 동작 중일 경우 종료
        if (this.divWidget.timer) {
          this.divWidget.isShow = false;
          clearTimeout(this.divWidget.timer);
        }
        this.divWidget.isShow = false;
      }

      if(target == "all" || target == "context") {
        this.divInfo.isShow = false;
        this.divChart.isShow = false;
        this.divVideo.isShow = false;
      }

      if(target == "all" || target == "set") {
        this.divAttSet.isShow = false;
        this.divMarkSet.isShow = false;
        this.divObjAttrib.isShow = false;
      }

    },

    // actObject : 설정 JSON에서 activeObject 항목에 포함된 정보 (dtname, type, url, iot, 등)
    showEMsg() {
      // console.log(`showEventMsg()`);

      // Timer가 작동 중일 경우 종료
      if (this.divEMsg.timer || this.divEMsg.isShow) {
        this.divEMsg.isShow = false;
        this.state.showEMsg = this.divEMsg.isShow;
        clearTimeout(this.divEMsg.timer);
      }

      // Object Info DIV를 화면에 표출
      this.divEMsg.isShow = true;
      this.state.showEMsg = this.divEMsg.isShow;

      // 설정된 시간 이후에 Chart Info DIV를 화면에서 숨김
      this.divEMsg.timer = setTimeout(() => {
        this.divEMsg.isShow = false;
        this.state.showEMsg = this.divEMsg.isShow;
      }, this.divEMsg.timeout);
    },

    addEMsg(message) {
      const timestamp = CommUtil.getCurrTime();
      const strMsg = `[${timestamp}] ${message}`;
      const msg = { text: strMsg, selected: false };

      // this.divEMsg.messages.push(msg);   // 제일 뒤에 입력
      this.divEMsg.messages.unshift(msg); // 배열 제일 앞으로 값 입력

      if (
        this.divEMsg.maxCount > 0 &&
        this.divEMsg.messages.length > this.divEMsg.maxCount
      ) {
        // this.divEMsg.messages.shift();  // 배열의 제일 처음 부분을 삭제
        this.divEMsg.messages.pop(); // 배열의 제일 끝 부분을 삭제
      }

      this.showEMsg();
    },

    // 미리 정의된 메시지를 화면에 출력함
    addEMsgUser(type) {
      let strMsg = "";

      const distance = Math.tan(THREE.MathUtils.degToRad(this.fov.curr / 2));

      switch (type) {
        // Camera 관련 위치 청보를 Event Message에 출력
        case "camera-position":
          strMsg =
            "Camera" +
            " Postion : " +
            CommUtil.getPos2Text(this.camera.position) +
            // " Rotation : " + CommUtil.getPos2Text(this.camera.rotation) +
            // " Quaternion : " +
            // CommUtil.getPos2Text(this.camera.quaternion) +
            // " Scene : " + CommUtil.getPos2Text(this.scene.position)
            " Control Target : " +
            CommUtil.getPos2Text(this.controls.target) +
            // " scene : " +
            // CommUtil.getPos2Text(this.scene.position) +
            ".";
          // strMsg = JSON.stringify(cameraState);

          if (this.state.camera.currType == "Perspective")
            strMsg += ` FOV : ${this.fov.curr} (거리 : ${distance.toFixed(3)})`;
          else
            strMsg += ` COEF : ${this.ortCoef.curr} (${this.state.camera.ortCoef})`;

          break;
        // 선택된 객체에 대한 정보를Event Message에 출력
        case "selected-object":
          if (this.selObject) {
            strMsg = `[ ${this.selObject.name} ]`;

            if (this.selObject.position) {
              strMsg += `  position : ${CommUtil.getPos2Text(
                this.selObject.position
              )}`;

              const pos2D = this.getObject2DPos(this.selObject);
              strMsg += `  ( 2D : ${pos2D.x}, ${pos2D.y} )`;


            }
            else strMsg += `  position X`;

            if (this.selObject.isMesh) strMsg += "  Mesh O";
            else strMsg += "  Mesh X";
            if (this.selObject.material) {
              strMsg += "  material";
              if (this.selObject.material.emissive) strMsg += "  emissive O";
              else strMsg += "  emissive X";
            } else strMsg += "  material.emissive X  ";

            if (this.selObject.parent)
              strMsg += `  Parent : ${CommUtil.getObjectParentName(
                this.selObject
              )}`;
          } else strMsg = "선택된 객체가 없음";

          break;
        case "todo-define":
          strMsg = `향후 구현 예정`;
          break;
        default:
          strMsg = `Unknown Type(${type})`;
          break;
      }
      this.addEMsg(strMsg);
    },

    // 선택된 Object에 대한 Event Msssage를 보여 줌
    addEMsgObject() {
      this.addEMsgUser("selected-object");
    },

    // Event Mssage를 삭제 (-1을 입력하면 전체 삭제)
    removeEMsg(index) {
      // 전체 메시지를 삭제함
      if (index == -1) {
        this.divEMsg.messages = [];
      } else {
        this.divEMsg.messages.splice(index, 1);
        this.showEMsg(); // Timeout을 재 시작 할 수 있도록 함
      }

      // Message가 더이상 없을 경우 (2초 후 Event Message 창을 종료)
      if (this.divEMsg.messages.length == 0) {
        setTimeout(() => {
          this.divEMsg.isShow = false;
          this.state.showEMsg = this.divEMsg.isShow;
        }, 2000);
      }
    },

    // check가 된 Event Message를 삭제
    removeEMsgSelected() {
      this.divEMsg.messages = this.divEMsg.messages.filter(
        (message) => !message.selected
      );
    },

    // actObject : 설정 JSON에서 activeObject 항목에 포함된 정보 (dtname, type, url, iot, 등)
    showMorph(mesh, state) {
      // console.log(`showMorph(${mesh.name}) : ${state.value} ( ${state.interval} / ${state.step})`);

      // 현재 해당 Morph에 대한 Interval timer가 동작 중인 경우 종료를 함

      // Interval timer가 동작 중에 클릭을 하면 동작을 멈추도록 함
      if (state.timer) {
        this.setMorphTimerClear(state, mesh.name);
      }
      // 현재 해당 Morph에 대한 Interval timer가 동작 중이지 않은 경우 (JSON에서 값을 조회하고, 필요한 값을 설정 후 Interval을 시작)
      else if (state.step > 0 && state.interval > 0) {
        // 증가 방향에 따라 Morph 값을 설정
        if (state.isIncrement) {
          if (state.value >= 1) state.isIncrement = false;
        } else {
          if (state.value <= 0) state.isIncrement = true;
        }

        // Timer(서서히 변경 되도록)를 사용할지 여부
        const IS_USE_TIMER = true;

        if (IS_USE_TIMER) {
          // 서서히 변할 수 있도록 Interval을 동작 시킴
          state.timer = setInterval(() => {
            let isStop = false;

            if (state.isIncrement) state.value += state.step;
            else state.value -= state.step;

            if (state.value >= 1) {
              state.value = 1;
              if (state.isIncrement) isStop = true;
            } else if (state.value < 0) {
              state.value = 0;
              if (!state.isIncrement) isStop = true;
            }
            // console.log(`${state.value} (${state.interval} / ${state.step})`);

            this.setMorphValue(mesh, state.value);

            // Morph 가 다 처리가 되어 Stop이 필요할 경우
            if (isStop) {
              this.setMorphTimerClear(state, mesh.name);
              state.isIncrement = !state.isIncrement; // 증감 방향을 반대로 변경
            }
          }, state.interval);
        } else {
          // 한번에 값이 변경될 수 있도록 처리
          if (state.isIncrement) state.value = 1;
          else state.value = 0;

          this.setMorphValue(mesh, state.value);
        }
      }
      // Morph 가동이 불가능한 경우
      else {
        console.log(
          `${mesh.name} is Error ( ${state.interval} / ${state.step} )`
        );
      }
    },

    // Morph 객체에 값을 설정
    setMorphValue(mesh, value) {
      // console.log(`showMorph(${mesh.name}) : ${value}`);

      if (mesh.morphTargetInfluences) {
        for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
          mesh.morphTargetInfluences[i] = value;
        }
        // mesh.morphTargetInfluences[0] = value;
      } else {
        console.log(`mesh.morphTargetInfluences is Empty`);
      }
    },

    // Morph Interval Timer를 종료함
    setMorphTimerClear(state, name) {
      console.log(`setMorphTimerClear(${name} )`);

      if (state.timer) {
        clearInterval(state.timer);
        state.timer = null;
      } else {
        console.log(`${name} Interval Timer Not Stated`);
      }
    },

    // Context Manu를 화면에 출력
    showContextMenu(position) {
      // 이미 화면에 표출 되어 있거나, Timer가 동작 중일 경우
      if (this.contextMenu.timer || this.contextMenu.isShow)
        this.closeContextMenu();

      this.contextMenu.isShow = true;
      this.contextMenu.position.x = position.x;
      this.contextMenu.position.y = position.y;

      if (this.selObject != null) {

        /* / 마커일 경우 마커 관련 정보를 userData에 추가
        const isMarker = this.isMarker(this.selObject.name);
        this.selObject.userData.isMarker = isMarker;
        if(isMarker) {
          this.selObject.userData.marker = this.getMarkerJSON(this.selObject.name);
        }
        */

        console.log(
          `showContextMenu (${this.selObject.name}), timeout : ${this.contextMenu.timeout})`
        );
        
      }
      else {
        this.selObject = this.scene;
      }

      // Timer를 시작
      this.contextMenu.timer = setTimeout(() => {
        this.contextMenu.isShow = false;
      }, this.contextMenu.timeout);
    },

    // Context Manu를 화면에서 숨김
    closeContextMenu() {
      if (this.contextMenu.isShow) this.contextMenu.isShow = false;
      if (this.contextMenu.timer) clearTimeout(this.contextMenu.timer);
    },

    // Overlap된 페이지를 종료
    closeOverlapPage() {
      if (this.divOverlap.isShow) this.divOverlap.isShow = false;
    },

    // Mark에서 사용할 Font를 생성
    // async로 처리가 되므로 처리 후 addMarkerJSON을 처리 할 수 있도록 함
    async createFont() {
      // const fontPath = "https://threejs.org/examples/fonts/";
      // const fontName = "helvetiker_regular.typeface.json";
      // const fontName = "NanumMyeongjo_Regular.json";

      // console.log("async createFont() Start");
      this.state.loadFont = 0; // Font Loader [시작]

      if(this.state.countMarker3D > 0) {

        const fontPath = "/font/";
        const fontName = "KoPubDotum Bold_Regular.json";
        const url = fontPath + fontName;
        const loader = new FontLoader();
        loader.load(
          url,
          (loadedFont) => {
            this.font = loadedFont;
            console.log("async createFont() Font Create Complete");

            this.state.loadFont = 1; // Font Loader [완료]

            /*/ Loader를 Async로 가동을 해야 되므로 최초 Font Loading 후
            if (isAddMark) {
              console.log("async createFont() Added JSON Mark Start");
              this.addMarkerJSON();
              console.log("async createFont() Added JSON Mark Complete");
            }
            */
            // this.createText('Hello, World!');  // 폰트를 로드한 후 첫 텍스트 생성
          },
          undefined,
          (error) => {
            console.error("An error happened while loading the font", error);

            this.state.loadFont = 9; // Font Loader [실패]
          }
        );
      } else {
        this.state.loadFont = 1; // Font Loader [완료]
        console.log("async createFont() Marker is Empty");
      }
    },


    // JSON에 포함된 정보를 바탕으로 Marker 메시지를 추가함
    addMarkerJSON() {
      let markCount = 0;

      if (this.state.countMarker > 0) {

        let markCount2D = 0;
        let markCount3D = 0;

        // JSON에서 User Mark 설정 정보를 조회
        const userMarker = this.initState.marker;
        userMarker.forEach((jData) => {
          if (jData.name) {
            // console.log(`addMarkerJSON() : ${jData.name}`);

            if(jData.type == "line3d" || jData.type == "line") markCount3D++;
            else if(jData.type == "line2d") markCount2D++;

            this.addMarker(jData);

            markCount++;
          }
          /////////////////////////////////// */
        });

        console.log(
          `Marker : ${userMarker.length}`
            + ` , Add : ${markCount} / ${userMarker.length}`
            + ` ( 3D : ${markCount3D}, 2D : ${markCount2D} )`
          );

        this.state.showMarker = true;

        if(this.state.countMarker2D > 0)   this.updateMark2DPos();

      } else {
        console.log(`User Marker is Empty`);
      }

      // 2D 마커가 존재할 경우 화면에 추가
      // if(this.mark2dObjects.length > 0)
      //   this.setDivMark();

      return markCount;
    },

    // 3D 화면 위에 Point, line, Text를 통하여 메시지를 추가
    // 주로 특정 Object에 대한 명칭 또는 설명 표출을 위해서 사용
    // FonterLoader를 Async로 처리할 방안 고민 필요********
    addMarker(markJson) {
      if (!this.scene) {
        console.error("addMarker() Scene is not initialized!");
        return;
      }

      console.log(`addMarker() ${markJson.name} / ${markJson.text.title}`);

      let markObject = {
        name: markJson.name,
        isShow: true,    // 초기 보기 설정이 true일 경우
        isMarker2D:false,
        type: markJson.type,
        mObject: null,    // 2D/3D 공통
        sphere: null,     // 3D Marker Only
        line: null,       // 3D Marker Only
        // textMesh: null,   // 3D Marker Only
        styleText: "",    // 2D Marker Only
      };

      this.addMarker2(markObject, markJson);

      markObject.mObject.name = markObject.name;
      markObject.mObject.userData = markJson;
      markObject.mObject.userData.isMarker = true;

      this.scene.add(markObject.mObject);    

      this.markObjects.push(markObject);

    },

    addMarker2(markObject, markJson) {

      const type = markObject.type;
      const mPoint = markJson.point;
      const mLine = markJson.line;
      const mText = markJson.text;

      if(type == "line3d" || type == "line") {      

        markObject.isMarker2D = false;

        // Mark에 대한 Text 생성
        if (mText && mText.color) {
          if (this.font) {
            const textGeometry = new TextGeometry(mText.title, {
              font: this.font,
              size: mText.size,
              depth: mText.depth,
              curveSegments: mText.curveSeg,
              bevelEnabled: false,
            });

            textGeometry.computeBoundingBox();   // Geometry Box 사이즈를 계산

            // Text를 중앙 정렬을 할 경우
            if (mText.align == "center") textGeometry.center();

            const textMaterial = new THREE.MeshBasicMaterial({
              color: new THREE.Color(mText.color),
            });

            markObject.mObject = new THREE.Mesh(textGeometry, textMaterial);
            

            // 텍스트를 표시할 위치
            markObject.mObject.position.set(
              mText.position.x,
              mText.position.y,
              mText.position.z
            );

            // Text를 회전을 할 경우 회전이 필요할 경우
            if (mText.rotation) {
              if (mText.rotation.x != 0)
                markObject.mObject.rotation.x = Math.PI / (180 / mText.rotation.x);
              if (mText.rotation.y != 0)
                markObject.mObject.rotation.y = Math.PI / (180 / mText.rotation.y);
            }

          } else {
            console.log("Mark Text is Empty");
          }
        }
        else {
          markObject.mObject = new THREE.Object3D();          
        }

        // Marker 의 Point를 표시할 구체 생성
        if (mPoint && mPoint.color && mPoint.position) {
          
          const param = CommUtil.chkSphereGeometryParam(mPoint.size);

          console.log(`addMarker(Point) radius : ${param.radius}, segment : ${param.segment}`);
          const sphereGeometry = new THREE.SphereGeometry(
            param.radius,
            param.segment,
            param.segment
          );

          const sphereMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(mPoint.color),
          });

          markObject.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
          markObject.sphere.position.set(
            mPoint.position.x,
            mPoint.position.y,
            mPoint.position.z
          );

          // this.scene.add(markObject.sphere);
          markObject.mObject.add(markObject.sphere);
        }

        // Marker 표시를 위한 Line을 추가
        if (mLine && mLine.positions && mLine.positions.length >= 2) {

          let lineWidth = mLine.size===undefined ? 1 : mLine.size;
          console.log(`addMarker(Point) lineWidth : ${lineWidth}, color : ${mLine.color}`);
          // 3.2 라인(Line) 생성
          const lineMaterial = new THREE.LineBasicMaterial({
            color: new THREE.Color(mLine.color),
            linewidth: 10, // 선의 두께 (기본값: 1)
          });
          const linePoints = [];
          mLine.positions.forEach((pos) => {
            linePoints.push(new THREE.Vector3(pos.x, pos.y, pos.z));
            console.debug(
              ` - line [${linePoints.length}] : ${CommUtil.getPos2Text(pos)}`
            );
          });

          console.log(` - line Position count : (${linePoints.length})`);

          const lineGeometry = new THREE.BufferGeometry().setFromPoints(
            linePoints
          );
          markObject.line = new THREE.Line(lineGeometry, lineMaterial);
          // this.scene.add(markObject.line);
          markObject.mObject.add(markObject.line);

        } else {
          console.log(`Mark's Line Data Emplty (${mLine})`);
        }
      }
      // 2D Line일 경우
      else if(type == "line2d") {

        markObject.isMarker2D = true;

        markObject.mObject = new THREE.Object3D();

        // 빈 Object3D 생성 (2D Marker에 대한 Context Menu 처리를 위해)

        // console.log("emptyObject.name : ", emptyObject.name);

        // mark2dObject.pos2D = this.getPosition2D(mark2dObject.pos3D);

        // this.mark2dObjects.push(marker);

      }
      else {
        Logger.warn(`Unknown Marker Type(${type})`);
        markObject.mObject = new THREE.Object3D();
      }


    },

    // 2D 마커의 위치를 실시간으로 Update함
    updateMark2DPos() {

      if(this.state.countMarker2D > 0) {
        
        this.markObjects.forEach((markObj) => {

          if(markObj.isMarker2D) {

            if(markObj.isShow) {

              const m2dJson = markObj.mObject.userData;
              let styleText = "";

              const tarPos3D = m2dJson.point.position;  // Point에 대한 3D 좌표
              const pos2D = this.getPosition2D(tarPos3D); // 3D 좌표에 대한 2D 좌표 조회

              // let yOffset = MARK2D_OFFSET_Y;
              // let xOffset = MARK2D_OFFSET_X; 
              let pos2D_Y = pos2D.y - MARK2D_OFFSET_Y;

              styleText += `top: ${pos2D_Y}px;`;

              let pos2D_X = pos2D.x;
              // pos2D_Y -= fontSize;    // Font Size에 대한 Y Position Offset
              // pos2D_Y -= yOffset;   // 추가적인 Y Position Offset

              let align = "left";
              if(m2dJson.align)   align = m2dJson.align;
              if(align == "left") {
                if(this.$refs.rendererContainer.clientWidth)
                  pos2D_X = this.$refs.rendererContainer.clientWidth - pos2D.x - MARK2D_OFFSET_X;
                else 
                  pos2D_X = 1280 - pos2D.x - MARK2D_OFFSET_X;
                  styleText += ` right: ${pos2D_X}px;`;
              }
              else {
                pos2D_X = pos2D.x - MARK2D_OFFSET_X;
                styleText += ` left: ${pos2D_X}px;`;
              }

              if(m2dJson.width)
                styleText += ` width: ${m2dJson.width}px;`;

              markObj.styleText = styleText;
              // console.log(divMark.styleText);

            }
          }

        });
      }

    },




    // 마커를 화면에서 제거
    removeMark(index) {

      if (this.markObjects.length > 0) {
        // 전체 Geo Message를 삭제함
        if (index == -1) {
          for (let i = this.markObjects.length - 1; i >= 0; i--) {
            this.removeIntroMsg(i);
          }
        }
        // 특정 Index의 Geo Message를 삭제
        else if (index >= 0 && index < this.markObjects.length) {

          const markObj = this.markObjects[index];
          if(markObj.isMarker2D) {
            this.scene.remove(markObj.mObject);
          }
          else {
            // 씬에서 각각의 객체를 제거
            this.scene.remove(markObj.mObject);
            // this.scene.remove(markObj.sphere);
            // this.scene.remove(markObj.line);
          }

          // 배열에서 객체를 제거
          this.markObjects.splice(index, 1);
        }
      }
    },

    removeMark2(markObj) {

      markObj.isShow = false;
      if(markObj.isMarker2D) {
        this.scene.remove(markObj.mObject);
        this.state.countMarker2D --;
      }
      else {
        // 씬에서 각각의 객체를 제거
        this.scene.remove(markObj.mObject);
        // this.scene.remove(markObj.sphere);
        // this.scene.remove(markObj.line);
        this.state.countMarker3D --;
      }

      this.state.countMarker = this.markObjects.length;

    },

    // Marker를 보이거나, 숨김 처리함
    setMarkerShow(markObj, isShow) {

      // console.log(`setMarkerShow() : ${markObj.name} / ${isShow}`);

      if(markObj.isMarker2D) {
        console.log(`hideObjectMarker() 2D : ${markObj.name} / ${isShow}`);
        if (markObj.mObject) {
          markObj.isShow = isShow;
          markObj.mObject.visible = isShow;
        } 
      }
      else {
        markObj.isShow = isShow;

        console.log(`hideObjectMarker() 3D : ${markObj.name} / ${isShow}`);
        if (markObj.sphere) markObj.sphere.visible = isShow;
        if (markObj.line) markObj.line.visible = isShow;
        if (markObj.mObject) markObj.mObject.visible = isShow;
      } 

    },


    // 마커 오브젝트명을 입력 받아 Marker Object를 반환
    getMarkerObject(objName) {
      if (this.markObjects.length > 0) {
        for(let i = 0; i < this.markObjects.length; i++) {
          if (this.markObjects[i].name === objName) {
            return this.markObjects[i];
          }
        }
      }
      return null;
    },

    // 마커 오브젝트인지 판별하여 반환
    isMarker(objName) {
      const markObj = this.getMarkerObject(objName);
      let rtn = false;
      if(markObj != null)   rtn = true;
      return rtn;
    },

    // 마커 2D 오브젝트인지 판별하여 반환
    isMarker2D(objName) {
      const markObj = this.getMarkerObject(objName);
      let rtn = false;
      if(markObj != null) {
        rtn = markObj.isMarker2D;
      }
      return rtn;
    },



    // 마커에 대한 미리보기를 실행함
    prevMarker(objName, formData) {

      // console.log("prevMarker()", objName, formData);
      // const objName = event.currentTarget.dataset.objName;

      const markObject = this.getMarkerObject(objName);

      if(markObject) {
        // recvData = JSON.parse(JSON.stringify(formData));
        // const recvData = formData;
        const type = formData.type;
        console.log(`prevMarker() ${type}`);
        this.removeMark2(markObject);

        // 1초 후 마커를 다시 보이게끔 처리
        const delay = 1000;
        setTimeout(() => {

          // 마커를 추가 함
          this.addMarker2(markObject, formData);

          markObject.isShow = true;
          markObject.mObject.userData = formData;

          this.scene.add(markObject.mObject);

          console.log(markObject);

        }, delay); 



      }

      /*
      if (this.markObjects.length > 0) {
        for(let i = 0; i < this.markObjects.length; i++) {
          if (this.markObjects[i].name === objName) {
            // recvData = JSON.parse(JSON.stringify(formData));
            const recvData = formData;
            const type = recvData.type;
            this.removeMark(i);
        

            // console.log(`${objName} / ${type}`);
            // console.log(recvData);
            // console.log(formData);
          }
        }
      }
        */

      let markCount = 0;

      return markCount;
    },

    // 마커 오브젝트인지 판별하여 반환
    getMarkerJSON(objName) {
      let jsonText = "";
      if(this.isMarker(objName)) {

        const userMarker = this.initState.marker;
        for(let i = 0; i < userMarker.length; i++) {
          if(userMarker[i].name === objName) {
            jsonText = userMarker[i];
          }
        }

      }
      return jsonText;
    },


    // 오브젝트에서 사용하기 위한 Texture를 생성
    // async로 처리가 되므로 처리 후 addMeshJSON을 처리 할 수 있도록 함
    async createTexture() {

      console.log("async createTexture() Start");
      this.state.loadTexture = 0; // Texture Loader [시작]

      if(this.state.countTexture > 0) {

        const jsonData = this.initState.texture;

        this.textureObjects = [];
        const totalCount = jsonData.length;
        let loadCount = 0;
        const textureLoader = new THREE.TextureLoader();

        jsonData.forEach((jData) => {

          // 이미지를 텍스처로 로드
          textureLoader.load(
            jData.url,
            (texture) => {

              // 영상이 뒤집어졌을 경우 처리
              if(jData.flipY != "undefined") texture.flipY = jData.flipY;

              /*
              const maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
              texture.anisotropy = maxAnisotropy; // 가능한 최대값으로 설정
              texture.encoding = THREE.sRGBEncoding;
              */

              this.textureObjects.push({objName:jData.name, textureObj:texture});
              loadCount++;
              console.log(`Texture loaded successfully : ${jData.name} / ${jData.url} / ${loadCount} / ${totalCount}`);

              // 전체 Loading이 완료 되었을 경우
              if(totalCount == loadCount) {
                console.log(`Texture loaded All successfully : ${loadCount} / ${totalCount}`);
                this.state.loadTexture = 1; // Texture Loader [완료]
              }
            },
            undefined,
            (error) => {
              console.error("An error happened while loading the background image",error);
              this.state.loadTexture = 9; // Texture Loader [실패]
            }        
          );
          
        });
      }
      else {
        console.log(`createTexture() Texture is Empty`);
        this.state.loadTexture = 1; // Texture Loader [완료]
      }

    },


    // JSON에 포함된 정보를 바탕으로 Texture를 생성
    addTextureJSON() {

      let addCount = 0;
      let addCountChild = 0;

      if (this.state.countTexture > 0) {

        this.textureObjects.forEach((tObj) => {

          // 전체 Sence의 BackGround에 Image를 적용
          if(tObj.objName == "background") {
            let bgType = "color";
            if(this.initState.background && this.initState.background.type)
              bgType = this.initState.background.type;

            if(bgType=="image") {
              tObj.textureObj.flipY = true;
              this.scene.background = tObj.textureObj;
              // console.log(`addTextureJSON() Background Add`);
              addCount ++;
            // } else {
            //  console.log(`addTextureJSON() Background Type (${bgType})`);
            }
          } else {
            const object = this.scene.getObjectByName(tObj.objName);
            if (object) {
              console.log(`addTextureJSON() ${tObj.objName} Add Texture`);
              object.traverse((child) => {
                if (child.isMesh && child.visible) {
                  // tObj.texture.flipY = false;
                  // 메쉬의 재질에 텍스처를 적용

                  child.material = child.material.clone();

                  if(child.material.map)
                    child.material.map.dispose();  // 기존 텍스처가 있다면 제거


                  /*
                  child.material.color.set(0xffffff);  // 기본 색상을 흰색으로 초기화 (텍스처의 원래 색상만 보이도록)
                  child.material.emissive.set(0x000000);  // 기본 색상을 흰색으로 초기화 (텍스처의 원래 색상만 보이도록)
                  */

                  /* 추가적인 테스트가 필요함
                  // MeshPhongMaterial이 사용된 경우 specular 속성 변경 가능할 경우
                  if (child.material.isMeshPhongMaterial) {
                    child.material.specular.set(0xAAAAAA);  // 기본 색상을 흰색으로 초기화 (텍스처의 원래
                    child.material.shininess = 50;
                  }
                  ////////////////////////////////////////////// */

                  /* 추가적인 테스트가 필요함
                  if(child.material.isMeshStandardMaterial) {
                    // child.material.roughness = 0.1; // 광택 효과 조정 (roughness가 낮을수록 반짝임이 커짐)
                    // child.material.metalness = 0.9;// 금속성 조절 (metalness가 높을수록 금속성 재질처럼 보임)
                  }
                  ////////////////////////////////////////////// */

                  child.material.map = tObj.textureObj;          // 텍스처 적용
                  child.material.emissiveMap = tObj.textureObj;  // 텍스처 적용
                  child.material.needsUpdate = true; // 재질 업데이트
                  addCountChild ++;
                  // console.log(`addTextureJSON() ${child.name} Add Texture`);
                } else {
                  console.log(`addTextureJSON() ${child.name} is Not Mesh`);
                }
              });
              addCount ++;
            }
            else {
              console.log(`addTextureJSON() ${tObj.objName} is Empty`);
            }            
          }
          
        });

        console.log(
          `addTextureJSON() Texture : ${this.textureObjects.length}` +
            ` , Add : ${addCount} (${addCountChild}) / ${this.textureObjects.length}`
        );

        this.state.showMarker = true;
      } else {
        console.log(`addTextureJSON() User Texture is Empty`);
      }

      return addCount;
    },

    // 객체에 대한 Digital Twin 속성을 반환 
    getDTObject(object) {
      if (object.userData && object.userData.digitalTwin) {
        return object.userData.digitalTwin;
      } else {
        return null;
      }
    },

    // 초기 설정에 Active 설정이된 객체 인지 여부를 반환
    getActiveObject(object) {
      // GLTF 파일 냉 userData에 Digital Twin 속성에서 조회
      if (object.userData && object.userData.digitalTwin) {
        return object.userData.digitalTwin;
      } else {
        let rtnVal;

        // Json에 포함된 Active 자료만 활용
        this.initState.digitTwin.forEach((jData) => {
          // console.debug(`getActiveObject(object) ${object.name} / ${jData.name}`);
          if (jData.name == object.name && jData.display == "active") {
            // console.debug(`getActiveObject(object) ${jData.dtname}`);

            rtnVal = jData;

            /*
            if (jData.action) {
              / *
              rtnVal.type = jData.action.type;
              rtnVal.target = jData.action.target;
              rtnVal.object = jData.action.object;
              rtnVal.confirm = jData.action.confirm;
              rtnVal.url = jData.action.url;
              rtnVal.interval = jData.action.interval;
              rtnVal.step = jData.action.step;
              rtnVal.discipt = jData.action.discipt;
              * /
              rtnVal = jData.action;
              / *
            } else {
              rtnVal.type = "";
              rtnVal.target = "";
              rtnVal.object = "";
              rtnVal.confirm = "";
              rtnVal.url = "";
              rtnVal.interval = 0;
              rtnVal.step = 0;
              rtnVal.discipt = "";
            * /
            }

            // JSON에 포함된 값을 Active Object로 가져 옴
            rtnVal.isActive = true;
            rtnVal.name = object.name;
            rtnVal.parent = this.getObjectParentName(object);
            rtnVal.size = this.getObjectSize(object);
            rtnVal.radius = this.getObjectRadius(object);
            // rtnVal.parent = "333";
            */

            return;
          }
        });

        return rtnVal;
      }
    },

    /* / Object parent 중 차상위 parent를 반환 (scene 이하 최상위)
    // Object parent 구조 : Cube089 > Server_12 > Scene
    getObjectParent(object) {
      if (!object.parent) {
        return object;
      } else if (object.parent.name == "Scene") {
        return object;
      } else {
        return this.getObjectParent(object.parent);
      }
    },

    // Object의 모든 parent 명을 Text로 변환하여 반환
    getObjectParentName(object) {
      let rtnText = "";
      if (object.parent && object.parent.name) {
        rtnText += this.getObjectParentName(object.parent) + " > ";
      }
      if (object.name) rtnText += object.name;
      return rtnText;
    },

    // 3D 객체의 사이즈를 반환 (벡터의 x, y, z 방향의 크기)
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
    ///////////////////////////////////////////////////// */


    // 3D 객체의 화면상 2D Position을 계산하여 반환 (객체 기준)
    getObject2DPos(object) {

      // 3D 객체의 Position (x, y, z)
      const objectPosition = new THREE.Vector3();
      objectPosition.setFromMatrixPosition(object.matrixWorld);

      // 카메라와 2D 화면 좌표 변환을 위한 Vector3 생성
      const projectedPosition = objectPosition.clone();
      projectedPosition.project(this.camera); // 카메라의 관점에서 객체의 위치를 투영

      // 화면 좌표로 변환 (x, y는 픽셀 단위)
      const widthHalf = this.$refs.rendererContainer.clientWidth / 2;
      const heightHalf = this.$refs.rendererContainer.clientHeight / 2;

      // console.log("getObject2DPos () Container Half : ", widthHalf, heightHalf);

      const screenX = (projectedPosition.x * widthHalf) + widthHalf;
      const screenY = -(projectedPosition.y * heightHalf) + heightHalf;

      const position = {x:screenX.toFixed(0), y:screenY.toFixed(0)}

      // 이제 screenX, screenY가 3D 객체의 화면 상 x, y 좌표입니다.
      // console.log("getObject2DPos () 2D Position : ", position.x, position.y);

      return position;
    },


    // 3D 좌표계의 Position을 화면 기준 2D 좌표계로 변환하여 반환 (좌표 기준)
    getPosition2D(pos3D) {

      // 3D 객체의 Position (x, y, z)
      const posObject = new THREE.Vector3();
      posObject.set(pos3D.x, pos3D.y, pos3D.z)
      // objectPosition.setFromMatrixPosition(object.matrixWorld);

      // 카메라와 2D 화면 좌표 변환을 위한 Vector3 생성
      const posDisplay = posObject.clone();
      posDisplay.project(this.camera); // 카메라의 관점에서 객체의 위치를 투영

      // 화면 좌표로 변환 (x, y는 픽셀 단위)
      const widthHalf = this.$refs.rendererContainer.clientWidth / 2;
      const heightHalf = this.$refs.rendererContainer.clientHeight / 2;

      const screenX = (posDisplay.x * widthHalf) + widthHalf;
      const screenY = -(posDisplay.y * heightHalf) + heightHalf;

      // console.log("getObject2DPos() Container Half : ", widthHalf, heightHalf);
      // console.log("getObject2DPos() posDisplay : ", posDisplay.x, posDisplay.y);
      // console.log("getObject2DPos() screen : ", screenX, screenY);

      const position = {x:screenX.toFixed(0), y:screenY.toFixed(0)};

      // 이제 screenX, screenY가 3D 객체의 화면 상 x, y 좌표입니다.
      // console.log("getObject2DPos () 2D Position : ", position.x, position.y);

      return position;
    },



    // 구간으로 설정된 객체에 대해서, step 만큼 값을 변환하여 반환 (min/max에 대한 처리 포함)
    getRangeNext(object) {
      let newVal = 0;
      if (object && object.curr && object.min && object.max && object.step) {
        const currVal = object.curr;
        newVal = currVal + object.step;

        // Max 값보다 커지면 최소값으로 돌아감
        if (currVal >= object.max) newVal = object.min;
        else if (newVal > object.max) newVal = object.max;
      } else {
        console.log(`getRangeNext() Object Error`);
      }
      return newVal;
    },

    // 시작 / 종료 Position 과 totalStep을 입력 받아 1Step에 움직일 값을 계산하여 반환
    getSolvOffset(startPos, EndPos, maxStep) {
      let offset = { x: 0, y: 0, z: 0 };

      if (maxStep != 0) {
        if (startPos.x != EndPos.x)
          offset.x = (EndPos.x - startPos.x) / maxStep;
        if (startPos.y != EndPos.y)
          offset.y = (EndPos.y - startPos.y) / maxStep;
        if (startPos.z != EndPos.z)
          offset.z = (EndPos.z - startPos.z) / maxStep;
      }

      return offset;
    },

    // 현재 Position 과 Offset Position을 입력 받아 신규 position을 반환
    getSolvPosition(currPos, offset) {
      let newPos = { x: 0, y: 0, z: 0 };

      newPos.x = currPos.x + offset.x;
      newPos.y = currPos.y + offset.y;
      newPos.z = currPos.z + offset.z;

      return newPos;
    },

    // 마우스가 특정 위치에 도달하면 함수를 실행
    handleMouseMove(event) {
      if (event.clientY < 50) {
        this.showMenu = true;
        this.resetInactivityTimer();
      }
    },

    handleMenuClick() {
      Logger.info("Menu item clicked", "GltfViewer");
    },

    resetInactivityTimer() {
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer);
      }
      this.inactivityTimer = setTimeout(() => {
        this.showMenu = false;
      }, 10000); // 10초 후 메뉴 숨기기
    },
  },
};
</script>

<style scoped>

/* .info-title { */
h2 {
  font-family: "맑은 고딕", sans-serif; /* 맑은 고딕 폰트 설정 */
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}

p {
  font-family: "맑은 고딕", sans-serif; /* 맑은 고딕 폰트 설정 */
  font-size: 12px;
  margin-top: 2px;
  margin-bottom: 2px;
}

.renderer-box {
  position: relative; /* absolute 위치 지정 */
  width: 100%;
  height: 100%;
}

/* height의 경우 100% 설정이 되지 않아, FullScreen일 경우 100vh를 사용하고,
FullScreen이 아닐 경우 특정 사이즈를 지정해야 정상 사용 가능 */
.renderer-container {
  position: relative; /* absolute 위치 지정 */
  width: 100%;
  /* height: 100vh;  /* 브라우저의 전체 크기 */
  /* height: 100%; */ /* 정상 동작하지 않음. 화면 세로 크기가 0으로 생성 됨 */
  height: 100%; /* 정상 동작하지 않음. 화면 세로 크기가 0으로 생성 됨**/
  margin: 0; /* margin 제거 */
  padding: 0; /* padding 제거 */
  /* top: 0;
  left: 0;
  margin: 0; /* margin 제거 * /
  padding: 0; /* padding 제거 */
  display: block;
  z-index: 0; /* object-info 아래로 설정 */
}

.gnb-container {
  position: absolute;
  width: 100%;
  /* height: 70px; */ /* 변수로 처리 */
  /* border: 2px solid red; */
  /* border-bottom: 1px solid #6e6e6e; */
  /* background-color: #2d2e35; */
  z-index: 3;
}

.snb-container {
  position: absolute;
  bottom:0px;
  /* width: 50; */
  /* height: 100%; */
  /* margin-left: 0; */
  /* margin-right: 0; */
  
  /* display: flex;
  justify-content: space-between;
  flex-grow: 1; */
  z-index: 2;
}


/*
.logo-box {
  width: 100%;
  height: 86px;
  padding-left: 0px;
  background-color: #2d2e35;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #6e6e6e;
}

.logo-box img {
  width: 242px;
  padding-left: 38px;
}
*/



.menu-container {
  position: absolute;
  top: 0;
  left: 10%;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  z-index: 1;
  transition: opacity 0.3s;
}

.menu-container button {
  background-color: #2196f3;
  border: none;
  color: white;
  font-size: 16px;
  padding: 5px 5px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 2px;
  transition: background-color 0.3s;
}

.menu-container button:hover {
  background-color: #1976d2;
}

.widget-container {
  position: absolute;
  /* width: 485px;
  height: 650px; 
  top: 5px; */
  right: 5px;
  background-color: #1a1a1e;
  color: #fff;
  border-bottom: 1px solid #8d8e92;
  border-top: 1px solid #8d8e92;
  border-left: 1px solid #8d8e92;
  border-right: 1px solid #8d8e92;
  z-index: 2;
}

.atrrib-container {
  position: absolute;
  /* width: 485px;
  height: 650px; 
  top: 5px;
  right: 5px; */
  background-color: #1a1a1e;
  color: #fff;
  border-bottom: 1px solid #8d8e92;
  border-top: 1px solid #8d8e92;
  border-left: 1px solid #8d8e92;
  border-right: 1px solid #8d8e92;
  z-index: 2;
}


.overlap-container {
  position: absolute;
  /* width: 485px;
  height: 650px; 
  top: 5px; */
  left: 78px;
  /* align:center;
  vertical-align: middle; */
  background-color: #1a1a1e;
  color: #fff;
  border-bottom: 1px solid #8d8e92;
  border-top: 1px solid #8d8e92;
  border-left: 1px solid #8d8e92;
  border-right: 1px solid #8d8e92;
  z-index: 2;
}

.mark2d-container {
  position: absolute;
  background-color:transparent;;
  z-index: 1;
}

.widget-container-old {
  padding: 10px;
  top: 5px;
  right: 5px;
  background-color: rgba(240, 240, 240, 0.4); /* 배경색과 투명도 */
  border: 1px solid #ccc;
  border-radius: 5px;
  position: absolute;
  text-align: center;
  z-index: 1; /* object-info 아래로 설정 */
}

.info-container {
  font-family: Pretendard; /* 맑은 고딕 폰트 설정 */
  font-size: 12px;
  padding: 5px;
  /*
  top: 10px;
  right: 10px;
  */
  text-align: left;
  background-color: rgba(23, 162, 184, 0.5); /* 배경색과 투명도 */
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;
  z-index: 2;
}

.chart-container {
  position: relative;
  /* width: 500px;
  height: 400px; */
  margin-top: 5px;
  background-color: rgba(209, 236, 241, 0.5); /* 배경색과 투명도 */
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 2;
}

.video-container {
  position: relative;
  /* width: 500px;
  height: 400px; */
  margin-top: 5px;
  background-color: rgba(209, 236, 241, 0.5); /* 배경색과 투명도 */
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 2;
}

.message {
  display: absolute;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.message button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.context-menu {
  background-color: rgba(209, 236, 241, 0.5); /* 배경색과 투명도 */
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 10;
}

/* 메세지창 */
.mess-container {
  position: absolute;
  /* left:0px; */
  width: calc(100% - 67px);;
  /* height:280px; */
  bottom:0px;
  right:0px;

  /* height: 400px; */
  /* top: calc(100vh - 166px); */
  /* bottom:0px; */

  z-index: 1;
}

.mess-ctrl {
  position: relative;
  width:fit-content;
  margin-left: 10px;
  
  /* justify-content: flex-end; */
}

.mess-ctrl-btn {
  background-color: #646464;
  padding: 5px 15px;
  margin-left: 5px;
  border: 0;
  border-radius: 0.3rem;
  color: white;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  font-weight: bold;
}

.mess-box {
  position: relative;
  width: 100%;
  height: 125px;
  /* margin-left: 67px; */
  margin-top: 5px;
  /* padding-top: 10px; */
  background-color: #1a1a1e;
  color: #fff;
  border-top: 1px solid #8d8e92;
  /* border: 1px solid blue; */
}

.mess-box-container {
  position: relative;
  width: calc(100% - 10px);
  height: calc(100% - 12px);
  overflow: auto;
  padding: 2px;
  padding-top: 8px;
  background-clip: padding-box;
}

.mess-box-container::-webkit-scrollbar {
  width: 12px;
  height: 8px;
  background-color: #aaa;
}

.mess-box-container::-webkit-scrollbar-track {
  background: gray;
}

.mess-box-container::-webkit-scrollbar-thumb {
  background: #fff;
  background-clip: padding-box;
  border: 1px solid transparent;
  border-radius: 8px;
}

.mess-box-group {
  text-align: left;
  margin-top: 0px;
}

.mess-box-lable {
  padding-left: 10px;
  color: #8c8c8c;
}

.mess-box-tx {
  padding-left: 5px;
  padding-bottom: 5px;
  color: #fff;
  text-align: left;
}

.mess-box-btn {
  background-color: #646464;
  padding: 1px 5px;
  margin-left: 10px;
  border: 0;
  border-radius: 0.3rem;
  color: white;
  cursor: pointer;
  user-select: none;
  font-weight: bold;
}


/** mslee */
.collision-message {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff5050;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* .slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter {
  transform: translateY(50px);
}
.slide-leave-to {
  transform: translateY(50px);
} */

/** 마커 생성 모달 */

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  display: block;
  background: rgba(50, 50, 50, 0.8);
  backdrop-filter: blur(10px);
  padding: 25px;
  border-radius: 20px;
  width: 400px;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  position: relative;
  max-height: 350px;
}
.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}
.tag {
  display: inline-block;
  font-size: 12px;
  background: #444;
  padding: 5px 12px;
  border-radius: 15px;
  margin-bottom: 10px;
}
.modal h2 {
  font-size: 20px;
  margin: 15px 0;
}
.modal p {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 15px;
}
.guide-message {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px;
  border-radius: 8px;
  margin: 10px 0;
  color: #ddd;
  font-size: 14px;
}
.info-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}
.input-container {
  margin-top: 10px;
  background: #555;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-container input {
  background: transparent;
  border: none;
  color: #ffffff;
  width: 100%;
  outline: none;
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  background: #666;
}
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 5px;
}
.button {
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.button:hover {
  filter: brightness(1.2);
  transform: scale(1.05);
}
.cancel {
  background: #d32f2f;
  color: white;
}
.create {
  background: #4caf50;
  color: white;
}

.checkbox-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  gap: 8px;
}

.custom-checkbox {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
}

.custom-checkbox:checked {
  background-color: #4caf50;
  border-color: #4caf50;
}

.custom-checkbox:checked::after {
  content: "✔";
  font-size: 12px;
  color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.checkbox-container label {
  font-size: 14px;
  color: #ddd;
  cursor: pointer;
}


/** insert tool */
.insert-sidebar {
  position: fixed;
  top: 68px;
  left: 66px;
  width: 300px; /* Reduced width */
  height: calc(100% - 68px);
  background-color: #4d4d4f;
  border-left: 2px solid #444;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 8px; /* Reduced padding */
  display: flex;
  flex-direction: column;
  font-family: 'Arial', sans-serif;
}

.insert-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px 0 5px;
    font-weight: bold;
}

.insert-title {
    font-size: 1em; /* Slightly smaller font size */
}

.insert-close-btn {
    background-color: #ff5050;
    border: none;
    color: #fff;
    padding: 4px 8px; /* Smaller button size */
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9em;
}

.insert-close-btn:hover {
    background-color: #e04e4e;
}

.divider {
    width: 100%;
    border: 1px solid #555;
    margin: 6px 0; /* Reduced margin */
}






/** mslee */

/*
.nav-box img {
  width: 35px;
  height: 35px;
}

.bar-1-section {
  font-family: "Pretendard Variable", Pretendard, -apple-system,
    BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
    "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  flex-grow: 1;
  width: 100%;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
.bar-1-section .conv_nav {
  width: 66px;
}
.bar-1-section .conv_nav ul {
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.bar-1-section .conv_nav ul li {
  flex-grow: 1;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  margin-bottom: 8px;
}
.bar-1-section .conv_nav ul li:first-child {
  margin-top: 15px;
}

.bar-1-section .conv_nav ul li a {
  display: block;
}

.bar-1-section .conv_nav ul li span {
  font-size: 13px;
  color: #fff;
  text-align: center;
  display: block;
}

.bar-1-section .conv_nav_2 {
  width: 66px;
  margin-top: 30px;
}
.bar-1-section .conv_nav_2 > ul {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.bar-1-section .conv_nav_2 ul li {
  flex-grow: 1;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  margin-bottom: 8px;
}

.bar-1-section .conv_nav_2 ul li span {
  font-size: 13px;
  color: #fff;
  text-align: center;
  display: block;
}

.bar-1-section .conv_nav_2 ul li a {
  display: block;
}

.content-bar-section {
  margin-top: 38px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
*/
</style>
