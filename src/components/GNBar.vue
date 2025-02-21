<template>
    <div class="gnb-box" :style="styleBox">
      <div class="gnb-logo">
        <img src="@/assets/image/logo_header.png" alt="3D Conv Viewer" />
      </div>
      <div v-if="isAdmin" class="gnb-admin">
        관리자 모드
      </div>
      <div class="menu-box">
        <div v-for="(btnInfo, index) in btnInfos"
          :key="index">
          <!-- div class="menu-btn">{{ btnInfo.id }}</div -->
          <div class="menu-btn" :style="btnInfo.styleText" @click="moveMenu(btnInfo.target)" :title="btnInfo.description">{{ btnInfo.title }}</div>
        </div>
      </div>
    </div>
</template>
  
  <script>
  /* GNB (Global Navigation Bar) Commponent */

  import Logger from "./comm/CommUtil.js"; // Logger 클래스를 import 합니다.`
 
  export default {
    name: "GNBar",
    props: {
      isAdmin: {
        type: Boolean,
        default:false
      },
      modelId: {
        type:String,
        default:"S01"
      },
      menuInfos : {
        type: Array
      },
      isUpdate: {
        type: Boolean,
        default:false
      },
    },
    data() {
      return {
        btnInfos : [],  // 메뉴 버튼 목록
        styleBox : "",  // 배경 관련 스타일 정보
        baseUrl : "/viewer/",
      };
    },
    mounted() {
      this.setMenuInit();
    },
    watch: {
      /*
      modelId(newVal, oldVal) {
        console.log(`GNBar watch > modelId : ${oldVal} → ${newVal}`);
        // if(newVal != undefined && newVal != "") this.setMenuInit();
      },
      */
      /*
      menuInfos(newVal, oldVal) {
        console.log(`GNBar watch > menuInfos : ${oldVal.length} → ${newVal.length}`);
        // this.setMenuInit();
      },
      */

      isUpdate(newVal, oldVal) {
        console.log(`GNBar watch > isUpdate : ${oldVal} → ${newVal}`);

        // Update 플래그가 생성되면 메뉴 초기화 진행
        if(newVal)
          this.setMenuInit();
      },


    },      
    methods: {

      // 메뉴 초기화
      setMenuInit() {
        Logger.debug(`setMenuInit : ${this.menuInfos.length}`, "GNBar");

        // 관리자/사용자에 대한 각각 다른 스타일 적용
        if(this.isAdmin)
          this.styleBox = "background-color: #91871d;";
        else
          this.styleBox = "background-color: #2d2e35;";




        if(this.menuInfos.length == 0)
          return;

        this.btns = [];

        // 관리자일 경우 미리보기 버튼을 추가
        if(this.isAdmin) {
          const menu = { id : "", title : "미리보기", target : `/viewer/${this.modelId}`, };
          this.setBtnInfo(menu);
        }
        /* / 관리자가 아닐 경우 관리자 화면으로 가는 버튼을 추가 (사용 하지 않음)
        else {
          const menu = { id : "", title : "관리자모드", target : `/admin/${this.modelId}`, };
          this.setBtnInfo(menu);
        }        
        ////////////////////////////////////////////////// */

        // 각 메뉴 버튼을 생성함
        this.menuInfos.forEach((menu) => {
          this.setBtnInfo(menu);
        });


      },


      // menu 정보를 바탕으로 각 메뉴를 생성함
      setBtnInfo(menu) {

        const btn = {
            id : menu.id,
            title : menu.title,
            target : menu.target,
            description : menu.description,
            styleText : "",
          }

        // 현재 modelId와 동일할 경우 target을 제거
        if(btn.id == this.modelId)  btn.target = "";

        // CommUtil.debug(`setMenuInit() id : ${btn.id}, title : ${btn.title}`, "GNBar");

        // target 값에 따라 각각 다른 Button 스타일을 적용
        if(btn.target != "") {
          // cursor를 Point로 변경
          btn.styleText = "cursor:pointer;";
        }
        else {
          // menu-btn:hover 와 동일한 스타일 적용
          btn.styleText = "background-color:#6e6e6e;";
        }

        this.btnInfos.push(btn);

      },

      moveMenu(target) {
        if(target != "") {
          document.location.href = target;
        }
      },

      // 메뉴에서 버튼을 클릭한 경우
      onMenuClick(event) {
        this.$emit("setMenuClick", event);
        // const menuIndex = parseInt(event.currentTarget.dataset.index);
      },
    },
  };
  </script>
  
  <style scoped>
  .gnb-box {
    position: absolute;
    width: 100%;
    height: 100%;
    /* background-color: #2d2e35; */  /* 배경 색상은 관리자 모드와 분리하기 위해 프로그램에서 설정 */
    display: flex;
    /* justify-content: center; */  /* 수평 중앙 정렬 */
    align-items: center;  /* 수직 중앙 정렬 */
    border-bottom: 1px solid #6e6e6e;
    /* border: 2px solid red; */

  }

  .gnb-logo {
    position:relative;
    margin-left: 30px;  /* 왼쪽 여백 */
    /* display: flex; */
    /* align-items: center; */  /* 수직 중앙 정렬 */

    /* top: 16px; */
    /* width: 242px; */
    /* padding-left: 38px; */

  }

  .gnb-admin {
    position:relative;

    margin-left: 40px;  /* 왼쪽 여백 */

    font-size: 24px;
    font-weight: 800;
    color: #fff;

    /* display: flex; */
    /* align-items: center; */  /* 수직 중앙 정렬 */

    /* top: 16px; */
    /* width: 242px; */
    /* padding-left: 38px; */

  }


  .menu-box {
    position:absolute;
    right:0px;
    bottom:0px;
    margin-right: 5px;

    font-size: 20px;
    color: #fff;
    display: flex;
    align-items: center;  /* 수직 중앙 정렬 */
  }

  .menu-btn {
    /* width:100px; */
    /* height: 18px; */
    border: 1.5px solid #fff;
    border-radius: 5px;
    margin: 0px 5px 5px 5px;
    padding: 5px 10px 5px 10px;
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    transition: background-color 1s ease, color 1s ease;
  }

  .menu-btn:hover {
    background-color:#00C473;
    /* border: 1.5px solid #1A889A; */
    /* color: #00f; */
  }


  </style>
  