<template>
  <div class="bar-1-section">
    <div class="conv_nav">
      <ul>

        <!-- li>
          <div v-if="modelState.isModel01" class="cursor-off">
            <div class="img-box">
              <img src="@/assets/image/nav_ico_01_on.png" class="img-off" />
            </div>
            <span>CX-ARENA</span>
          </div>
          <div v-if="!modelState.isModel01">
            <a href="/viewer/S01">
              <div class="img-box">
                <img src="@/assets/image/nav_ico_01.png" class="img-off" />
                <img src="@/assets/image/nav_ico_01_on.png" class="img-on" />
              </div>
              <span>CX-ARENA</span>
            </a>
          </div>
        </li>
        <li>
          <div v-if="modelState.isModel02" class="cursor-off">
            <a href="/viewer/S02">
              <div class="img-box">
                <img src="@/assets/image/nav_ico_02_on.png" class="img-off" />
              </div>
              <span>서버룸</span>
            </a>
          </div>
          <div v-if="!modelState.isModel02">
            <a href="/viewer/S02">
              <div class="img-box">
                <img src="@/assets/image/nav_ico_02.png" class="img-off" />
                <img src="@/assets/image/nav_ico_02_on.png" class="img-on" />
              </div>
              <span>서버룸</span>
            </a>
          </div>
        </li>
        <li>
          <div v-if="modelState.isModel03" class="cursor-off">
            <div class="img-box">
              <img src="@/assets/image/nav_ico_03_on.png" class="img-off" />
            </div>
            <span>서버랙</span>
          </div>
          <div v-if="!modelState.isModel03">
            <a href="/viewer/S03">
              <div class="img-box">
                <img src="@/assets/image/nav_ico_03.png" class="img-off" />
                <img src="@/assets/image/nav_ico_03_on.png" class="img-on" />
              </div>
              <span>서버랙</span>
            </a>
          </div>
        </li>

        <li>
          <div class="divide_line"></div>
        </li -->

        <!-- li>
          <div @click.stop="onMenuClick" data-index="4">
            <div class="img-box">
              <img src="@/assets/image/nav_ico_04.png" class="img-off" />
              <img src="@/assets/image/nav_ico_04_on.png" class="img-on" />
            </div>
            <span>카메라</span>
          </div>
        </li -->

        <li>
          <div @click.stop="onMenuClick" data-index="4">
            <div class="img-box">
              <img src="@/assets/image/nav_ico_09.png" class="img-off" />
              <img src="@/assets/image/nav_ico_09_on.png" class="img-on" />
            </div>
            <span>즐겨보기</span>
          </div>
        </li>

        <li>
          <div @click.stop="onMenuClick" data-index="1">
            <div v-if="!state.showAutoRotate" class="img-box">
              <img src="@/assets/image/nav_ico_06.png" class="img-off" />
              <img src="@/assets/image/nav_ico_06_on.png" class="img-on" />
            </div>
            <div v-if="state.showAutoRotate" class="img-box">
              <img src="@/assets/image/nav_ico_06_on.png" class="img-off" />
              <img src="@/assets/image/nav_ico_06.png" class="img-on" />
            </div>
            <span>회전</span>
          </div>
        </li>

        <li>
          <div @click.stop="onMenuClick" data-index="2">
            <div v-if="!state.showWireframe" class="img-box">
              <img src="@/assets/image/nav_ico_07.png" class="img-off" />
              <img src="@/assets/image/nav_ico_07_on.png" class="img-on" />
            </div>
            <div v-if="state.showWireframe" class="img-box">
              <img src="@/assets/image/nav_ico_07_on.png" class="img-off" />
              <img src="@/assets/image/nav_ico_07.png" class="img-on" />
            </div>
            <span>프레임보기</span>
          </div>
        </li>

        <li>
          <div @click.stop="onMenuClick" data-index="3">
            <div v-if="!state.showGrid" class="img-box">
              <img src="@/assets/image/nav_ico_08.png" class="img-off" />
              <img src="@/assets/image/nav_ico_08_on.png" class="img-on" />
            </div>
            <div v-if="state.showGrid" class="img-box">
              <img src="@/assets/image/nav_ico_08_on.png" class="img-off" />
              <img src="@/assets/image/nav_ico_08.png" class="img-on" />
            </div>
            <span>격자보기</span>
          </div>
        </li>
        <!-- li>
          <div @click.stop="onMenuClick" data-index="11">
            <div class="img-box">
              <img src="@/assets/image/nav_ico_05.png" class="img-off" />
              <img src="@/assets/image/nav_ico_05_on.png" class="img-on" />
            </div>
            <span>줌변경</span>
          </div>
        </li -->
        <li>
          <div @click.stop="onMenuClick" data-index="12">
            <span v-if="!state.showMarker" class="img-box">
              <img src="@/assets/image/nav_ico_14.png" class="img-off" />
              <img src="@/assets/image/nav_ico_14_on.png" class="img-on" />
            </span>
            <span v-if="state.showMarker" class="img-box">
              <img src="@/assets/image/nav_ico_14_on.png" class="img-off" />
              <img src="@/assets/image/nav_ico_14.png" class="img-on" />
            </span>
            <span>마커보기</span>
          </div>
        </li>

        <li>
          <div @click.stop="onMenuClick" data-index="13">
            <span v-if="!state.showHideObject" class="img-box">
              <img src="@/assets/image/nav_ico_13.png" class="img-off" />
              <img src="@/assets/image/nav_ico_13_on.png" class="img-on" />
            </span>
            <span v-if="state.showHideObject" class="img-box">
              <img src="@/assets/image/nav_ico_13_on.png" class="img-off" />
              <img src="@/assets/image/nav_ico_13.png" class="img-on" />
            </span>
            <span>숨김객체</span>
          </div>
        </li>

        <li>
          <div @click.stop="onMenuClick" data-index="14">
            <span v-if="!state.showActiveObject" class="img-box">
              <img src="@/assets/image/nav_ico_13.png" class="img-off" />
              <img src="@/assets/image/nav_ico_13_on.png" class="img-on" />
            </span>
            <span v-if="state.showActiveObject" class="img-box">
              <img src="@/assets/image/nav_ico_13_on.png" class="img-off" />
              <img src="@/assets/image/nav_ico_13.png" class="img-on" />
            </span>
            <span>ACT객체</span>
          </div>
        </li>



      </ul>

      <li><div class="divide_line"></div></li>

      <ul>
        <!-- li>
          <div @click.stop="onMenuClick" data-index="5">
            <div class="img-box">
              <img src="@/assets/image/nav_ico_10.png" class="img-off" />
              <img src="@/assets/image/nav_ico_10_on.png" class="img-on" />
            </div>
            <span>삭제</span>
          </div>
        </li -->
        <li>
          <div @click.stop="onMenuClick" data-index="40">
            <div v-if="!state.showEMsg" class="img-box">
              <img src="@/assets/image/nav_ico_11.png" class="img-off" />
              <img src="@/assets/image/nav_ico_11_on.png" class="img-on" />
            </div>
            <div v-if="state.showEMsg" class="img-box">
              <img src="@/assets/image/nav_ico_11_on.png" class="img-off" />
              <img src="@/assets/image/nav_ico_11.png" class="img-on" />
            </div>
            <span>메세지</span>
          </div>
        </li>
        <li>
          <div @click.stop="onMenuClick" data-index="45">
            <span class="img-box">
              <img src="@/assets/image/nav_ico_12.png" class="img-off" />
              <img src="@/assets/image/nav_ico_12_on.png" class="img-on" />
            </span>
            <span>위치정보</span>
          </div>
        </li>

        <li>
          <div @click.stop="onMenuClick" data-index="15">
            <div v-if="!state.isServerEvent" class="img-box">
              <img src="@/assets/image/nav_ico_11.png" class="img-off" />
              <img src="@/assets/image/nav_ico_11_on.png" class="img-on" />
            </div>
            <div v-if="state.isServerEvent" class="img-box">
              <img src="@/assets/image/nav_ico_11_on.png" class="img-off" />
              <img src="@/assets/image/nav_ico_11.png" class="img-on" />
            </div>
            <span>서버이벤트</span>
          </div>
        </li>

        <li><div class="divide_line"></div></li>

        <!-- mslee -->
        <li>
          <div @click.stop="onMenuClick" data-index="95">
            <div v-if="!state.showInsertView" class="img-box">
              <img src="@/assets/image/nav_ico_11.png" class="img-off" />
              <img src="@/assets/image/nav_ico_11_on.png" class="img-on" />
            </div>
            <div v-if="state.showInsertView" class="img-box">
              <img src="@/assets/image/nav_ico_11_on.png" class="img-off" />
              <img src="@/assets/image/nav_ico_11.png" class="img-on" />
            </div>
            <span>객체삽입</span>
          </div>
        </li>

        <!-- mslee -->

        <!-- li>
          <div @click.stop="onMenuClick" data-index="16">
            <span>관계 보기</span>
          </div>
        </li -->

        <!-- li>
          <div class="divide_line"></div>
        </li -->

        <!-- li>
          <a href="http://43.202.111.35:81/">
            <span class="img-box">
              <img src="@/assets/image/nav_ico_12.png" class="img-off" />
              <img src="@/assets/image/nav_ico_12_on.png" class="img-on" />
            </span>
            <span>침수모형</span>
          </a>
        </li -->

      </ul>
    </div>
  </div>
</template>

<script>
/* SNB (Side Navigation Bar) Commponent */

export default {
  name: "SNBar",
  props: {
    modelId: {
      type:String,
      default:"S01"
    },
    state: {
      type:Object,
      required: true,
    }
  },
  data() {
    return {
      modelState:{
        isModel01 : false,
        isModel02 : false,
        isModel03 : false,
      }
      
    };
  },  
  mounted() {
    this.setState();
  },

  watch: {
      modelId(newVal, oldVal) {
        console.log(
          `SNBar > watch > targetObject :  ${oldVal} → ${newVal}`
        );
        // this.setState();
      },
  },
  methods: {

    // 메뉴 상태에 따른 icon Enabled 설정을 변경
    setState() {
      if(this.modelId == "S01") {
        this.modelState.isModel01 = true;
        this.modelState.isModel02 = false;
        this.modelState.isModel03 = false;
      }
      else if(this.modelId == "S02") {
        this.modelState.isModel01 = false;
        this.modelState.isModel02 = true;
        this.modelState.isModel03 = false;
      }
      else if(this.modelId == "S03") {
        this.modelState.isModel01 = false;
        this.modelState.isModel02 = false;
        this.modelState.isModel03 = true;        
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
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}

.nav-box img {
  width: 35px;
  height: 35px;
  margin: 0px auto;
  position: relative;
}

img {
  max-width: 100%;
}

.img-box {
  width: 35px;
  height: 35px;
  margin: 0px auto;
  position: relative;
}

.img-off {
  margin: 0px auto;
  position: relative;
}

.img-on {
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
  transition: opacity 0.5s linear;
  /* display: none; */
}

.img-box:hover .img-on {
  opacity: 1;
  /* display: block; */
}

.bar-1-section {
  position: relative;
  width: 67px;
  /* height: 100%; */
  background-color: #4d4d4f;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  border-right: 0.8px solid #6e6e6e;

}

.bar-1-section .conv_nav {
  width: 100%;
}
.bar-1-section .conv_nav ul {
  /* height: 100%; */
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
  margin-top: 10px;
}

.bar-1-section .conv_nav ul li a {
  display: block;
}

.bar-1-section .conv_nav ul li span {
  font-size: 12px;
  color: #fff;
  text-align: center;
  display: block;
}

.bar-1-section .conv_nav_2 {
  width: 66px;
  margin-top: 20px;
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

.divide_line {
  display: flex;
  margin-top: 15px;
  margin-bottom: 8px;
  margin-left: 8px;
  margin-right: 8px;
  border-bottom: 2px solid #8d8e92;
}

.cursor-off {
  cursor: default;
}

</style>
