<template>

  <div id="pop-section-2" v-stop-propagation>
    <div class="pop-section-2-con">

      <div class="ps2-section">
        <div class="ps2">
          <ul>
            
            <li style="display:flex; flex-direction: column">
              <table>
                <tbody>
                  <tr>
                    <td>
                    <span id="spanTitle" class="txt-big">{{menuTitle}}</span>
                    </td>
                    <td style="text-align:right;">
                      <div class="pop-section-2-top-box">
                        <img
                          src="@/assets/image/ico_close.png"
                          alt="닫기"
                          width="12px"
                          height="12px"
                          style="cursor: pointer"
                          @click="onMenuClick"
                          data-index="69"
                        />
                      </div>                    
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td
                      v-for="(text, index) in tinyBtns"
                      :key="index"
                    >
                      <div class="btn-tiny">{{ text }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>

            </li>

            <li>
              <div class="pop-section-line"></div>
            </li>

            <li>
              <div v-if="menu.isAttrSetEnable" class="menu-on"
                @click.stop="onMenuClick" data-index="71">
                <img src="@/assets/image/bu_r_ins.png" alt="디지털트윈 속성 추가"/>
                <span class="txt">DT속성추가</span>
              </div>
              <div v-else class="menu-off">
                <img src="@/assets/image/bu_r_ins.png" alt="디지털트윈 속성 추가"/>
                <span class="txt">DT속성추가</span>
              </div>
            </li>

            <li>
              <div v-if="menu.isMarkSetEnable" class="menu-on"
                @click.stop="onMenuClick" data-index="51">
                <img src="@/assets/image/bu_r_ins.png" alt="마커 추가"/>
                <span class="txt">마커 추가</span>
              </div>
              <div v-else class="menu-off">
                <img src="@/assets/image/bu_r_ins.png" alt="마커 추가"/>
                <span class="txt">마커 추가</span>
              </div>
            </li>

            <li>
              <div class="pop-section-line"></div>
            </li>

            <li>
              <div v-if="menu.isHideEnable" class="menu-on" @click.stop="onHideObject">
                <img src="@/assets/image/bu_r_hide.png" title="숨기기"/>
                <span class="txt">숨기기</span>
              </div>
              <div v-else class="menu-off">
                <img src="@/assets/image/bu_r_hide.png" title="숨기기"/>
                <span class="txt">숨기기</span>
              </div>
            </li>
            <li>
              <div v-if="menu.isDeleteEnable" class="menu-on" @click.stop="onRemoveObject">
                <img src="@/assets/image/bu_r_del.png" title="삭제하기"/>
                <span class="txt">삭제하기</span>
              </div>
              <div v-else class="menu-off">
                <img src="@/assets/image/bu_r_del.png" title="삭제하기"/>
                <span class="txt">삭제하기</span>
              </div>
            </li>

            <li>
              <div class="pop-section-line"></div>
            </li>

            <li>
              <div :class="menu.isCopyEnable ? 'menu-on' : 'menu-off'">
                <img src="@/assets/image/bu_r_copy.png" title="복사하기"/>
                <span class="txt">복사하기</span>
              </div>
              <!-- div v-if="!state.isCopyEnable" class="menu-off">
                <img src="@/assets/image/bu_r_copy.png" title="복사하기"/>
                <span class="txt">복사하기</span>
              </div -->
            </li>
            <!-- <li>
              <div :class="menu.isPasteEnable ? 'menu-on' : 'menu-off'">
                <img src="@/assets/image/bu_r_paste.png" title="붙여넣기"/>
                <span class="txt">붙여넣기</span>
              </div>
            </li> -->
            <li>
              <div class="menu-on" @click.stop="onMenuClick" data-index="97">
                <img src="@/assets/image/bu_r_paste.png" title="3D마커추가"/>
                <span class="txt">3D마커추가</span>
              </div>
            </li>
            <li>
              <div class="menu-on" @click.stop="onMenuClick" data-index="96">
                <img src="@/assets/image/bu_r_move.png"/>
                <span class="txt">이동하기</span>
              </div>
            </li>

            <li>
              <div class="pop-section-line"></div>
            </li>

            <li>
              <div class="menu-on" @click.stop="onInspectObject">
                <img src="@/assets/image/bu_r_ins.png" alt="속성보기"/>
                <span class="txt">속성보기</span>
              </div>
            </li>

          </ul>
        </div>

        <div v-if="state.showAttribute" class="attribute-container">
          <ul class="timeline">
            <li><div class="timeline-line"></div></li>
            <li>
              <table width="100%" class="attribute-table">
                <tbody>
                  <tr>
                    <td class="attribute-label">부모 :</td>
                    <td>{{attrContent.parent}}</td>
                  </tr>
                  <tr>
                    <td class="attribute-label">자식 :</td>
                    <td>{{attrContent.child}}</td>
                  </tr>
                  <tr>
                    <td class="attribute-label">크기 :</td>
                    <td>{{attrContent.size}}</td>
                  </tr>
                  <tr>
                    <td class="attribute-label">위치 :</td>
                    <td>{{attrContent.position}}</td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <table class="btn-container">
                        <tbody>
                          <tr>
                            <td
                              v-for="(text, index) in attrContent.attrBtns"
                              :key="index"
                            >
                              <div class="btn-small">{{ text }}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li><div class="timeline-line"></div></li>
          </ul>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

/* Content Menu Commponent */
// import * as THREE from "three";

// import CommUtil from "./comm/CommUtil.js"; // Logger 클래스를 import 합니다.
// import Logger from "./CommUtil.js"; // Logger 클래스를 import 합니다.


export default {
  name: "ContextMenu",
  props: {
    targetObject: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      state: {
        isServerRack: false,
        showAttribute: false,
      },

      // 각 메뉴에 대한 상태 관리
      menu: {
        isAttrSetEnable: false,
        isMarkSetEnable: false,

        isHideEnable: false,
        isDeleteEnable: false,

        isMoveEnable: false,
        isCopyEnable: false,
        isPasteEnable: false,
      },



      menuTitle : "",
      menuAlt : "",
      attrContent : {
        parent : "",
        child : "",
        size : "",
        postion : "",
        etc : "",
        attrBtns:[],
      },
      tinyBtns : [],
    };
  },

  mounted() {
    this.$nextTick(() => {
      // console.log(`ConetextMenu.vue > mounted : ${this.targetObject.name}`);
      this.setMenuTitle()
    });
  },
  watch: {
    targetObject(newVal, oldVal) {
      let oldName = oldVal && oldVal.name ? oldVal.name : "Unnamed";
      let newName = newVal && newVal.name ? newVal.name : "Unnamed";
      console.log(
        `ContextMenu > watch > targetObject :  ${oldName} → ${newName}`
      );

      this.setMenuTitle();

      if(this.state.showAttribute)  this.onInspectObject();


    },
  },
  methods: {

    // 메뉴 Title을 설정하여 준다.
    setMenuTitle() {

      const object = this.targetObject;
      this.tinyBtns = [];

      if(object) {

        if(object.name) {
          this.menuTitle = object.name;
          
          if(object.userData) {
            // console.log("`setMenuTitle() ", object.userData);
            if(object.userData.digitalTwin) {

              const dtObject = object.userData.digitalTwin;
              
              // 객체 속성에 대한 Tiny 버튼을 생성
              if(dtObject.display) {
                // console.log("`setMenuTitle() is Active");
                this.tinyBtns.push(dtObject.display);
                if(dtObject.action && dtObject.action.type) {

                  const type = dtObject.action.type;
                  // console.log("`setMenuTitle() is action");
                  this.tinyBtns.push(type);

                  if(type == "chart" || type == "link" || type == "video")
                    this.tinyBtns.push(dtObject.action.target);


                }
              }

              /* / Digital Twin 속성이 존재할 경우 Title을 변경 (사용하지 않음)

              if(dtObject.dtname) {

                this.menuTitle = dtObject.dtname;

                if(dtObject.descript) {
                  this.menuAlt = dtObject.descript;
                }
                else {
                  this.menuAlt = "";
                }
                let spanTitle = document.getElementById( "spanTitle" ); 
                spanTitle.title = this.menuAlt;
              }
              else {
                console.log("`setMenuTitle() dtname is Empty", dtObject);
              }
              //////////////////////////////////////////////// */
            }
            else {
              console.log("`setMenuTitle() digitalTwin is Empty", object.userData);
            }

            if(object.userData.isMarker) {
              this.tinyBtns.push("marker");
            }

            this.setMenuEnable(true);
            this.setMenuEnable(false, "edit");

          }
        }
        else {
          // Title이 없을 경우 메뉴 창을 종료
          // this.onCloseContextMenu();

          if(object.type)
            this.menuTitle = `[${object.type}]`;
          else
            this.menuTitle = "No Name";

          console.log(object);

          this.setMenuEnable(false);
          this.setMenuEnable(true, "marker");
          this.setMenuEnable(true, "attribute");


        }
      }
      else {
          // Title이 없을 경우 메뉴 창을 종료
          // this.onCloseContextMenu();
      
          this.menuTitle = "Not Object";

          this.setMenuEnable(false);
          this.setMenuEnable(true, "marker");
          this.setMenuEnable(true, "attribute");

      }

    },

    // 메뉴 정보들을 Enable/Disable 설정을 함
    setMenuEnable(isEnable, target="all") {

      if(target == "all" || target == "digitalTwin") {
        this.menu.isAttrSetEnable = isEnable;
      }

      if(target == "all" || target == "marker") {
        this.menu.isMarkSetEnable = isEnable;
      }

      if(target == "all" || target == "visible") {
        this.menu.isHideEnable = isEnable;
        this.menu.isDeleteEnable = isEnable;
      }

      if(target == "all" || target == "edit") {
        this.menu.isMoveEnable = isEnable;
        this.menu.isCopyEnable = isEnable;
        this.menu.isPasteEnable = isEnable;
      }

      if(target == "all" || target == "attribute") {
        this.menu.isAttrEnable = isEnable;
      }

    },




    // Target Object를 Hide 처리 (객체를 제거하지는 않고, Display만 되지 않도록 처리)
    onHideObject() {
      this.$emit("setHideObject", this.targetObject);

      // 명령 수행 후 현재 창을 닫아 줌
      this.onCloseContextMenu();
    },


    // Target Object를 Remove 처리 (객체를 제거)
    onRemoveObject() {
      this.$emit("setRemoveObject", this.targetObject);

      this.onCloseContextMenu(); // 명령 수행 후 Context Menu 종료
    },

    // [속성보기] 메뉴를 선택하였을 경우 : Target Object의 정보를 화면에 출력
    onInspectObject(event) {
      // this.$emit("setEMsgUser", "selected-object");

      // Object 속성 보기 창 Open
      event.currentTarget.dataset.index = 31;
      this.$emit("setMenuClick", event);


      /*
      this.state.showAttribute = !this.state.showAttribute;

      this.attrContent.parent = "";
      this.attrContent.position = "";
      this.attrContent.etc = "";
      this.attrContent.attrBtns = [];

      if(this.state.showAttribute) {
        const object = this.targetObject;

        /  *
        const objParents = CommUtil.getObjectParents(object, true);
        if(objParents.length > 0) {
          let idx = 0;
          objParents.forEach((object) => {
            if(idx > 0) this.attrContent.parent += " > ";
            this.attrContent.parent += object.name;
            idx ++;
          });
        }
          *  /


        const objSize = CommUtil.getObjectSize(object);
        const objRadius = CommUtil.getObjectRadius(object);

        this.attrContent.parent = CommUtil.getObjectParentName(object, true, false);

        if(object.children.length > 0) {
          if(object.children.length > 2) {
            this.attrContent.child = object.children[0].name + ` 외 ${(object.children.length-1)} 개`;
          }
          else {
            this.attrContent.child = CommUtil.getObjectChildName(object);
          }
        }
        else {
          this.attrContent.child = "없음";
        }

        

        this.attrContent.size = `${CommUtil.getPos2Text(objSize)} ( Ø : ${objRadius.toFixed(2)} )`;
        if (object.position)
          this.attrContent.position = CommUtil.getPos2Text(object.position);
        else
          this.attrContent.position = "";

        if(object.isMesh)   this.attrContent.attrBtns.push("mesh");
        if(object.material) {
          this.attrContent.attrBtns.push("material");
          if(object.material.emissive)
            this.attrContent.attrBtns.push("emissive");

            if(object.material.isMeshPhongMaterial)
              this.attrContent.attrBtns.push("MeshPhong");

            if(object.material.isMeshStandardMaterial)
              this.attrContent.attrBtns.push("MeshStandard");

        }

      }

      */


      // this.onCloseContextMenu(); // 명령 수행 후 Context Menu 종료
    },

    // 선택된 객체에 대한 이동 처리
    onMoveObject() {
      this.$emit("setEMsgUser", "todo-define");
    },

    onCloseContextMenu() {
      // Context Menu 표출을 종료
      this.$emit("setCloseContextMenu");
    },

    // 메뉴에서 버튼을 클릭한 경우
    onMenuClick(event) {

      // console.log("ContextMenu > onMenuClick", event.currentTarget.dataset.index);

      this.$emit("setMenuClick", event);
      // const menuIndex = parseInt(event.currentTarget.dataset.index);
    },    


  },
};
</script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}

/* 리스트 스타일 초기화 */
ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* 팝업 기본 스타일 */
#pop-section-2 {
  text-align: left;
  position: fixed;
  min-width: 160px;
  background-color: #2d2f36; /* 어두운 배경 */
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4); /* 부드러운 그림자 추가 및 강도 증가 */
  padding: 8px;
  z-index: 9999;
  transition: transform 0.2s ease-in-out;
  overflow: hidden; /* 팝업 크기 조정 */
}

/* 팝업 컨테이너 */
.pop-section-2-con {
  padding: 10px;
  background-color: #2d2f36;
  border-radius: 8px;
}

/* 팝업 상단 영역 */
.pop-section-2-top-section {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #3a3f47;
  padding-bottom: 8px;
  margin-bottom: 8px;
}

/* 닫기 버튼 */
.pop-section-2-top-box {
  display: flex;
  justify-content: flex-end;
  padding-left: 10px;
  cursor: pointer;
  color: #8e929d;
  font-size: 16px; /* 더 명확하게 크기 조정 */
}

/* 팝업 메뉴 항목 */
.ps2-section {
  width: 100%;
}

.ps2-section .ps2 ul {
  display: flex;
  flex-direction: column;
}

.ps2-section .ps2 ul li {
  margin-bottom: 4px; /* 항목 간격을 좀 더 좁혔습니다 */
  transition: background-color 0.2s ease;
  border-radius: 5px;
  display:flex;
  
  flex-wrap: wrap;
  
  cursor: pointer;
}

.ps2-section .ps2 ul li div {
  display: flex;
  margin: 2px;
}

/* 메뉴 항목에 마우스 오버 시 스타일 */
.ps2-section .ps2 ul li:hover {
  background-color: #3c4048; /* 약간 밝은 색으로 하이라이트 */
}



/* 메뉴 항목 텍스트 스타일 */
.ps2-section .ps2 ul li a {
  display: flex;
  align-items: center;
  padding: 6px 12px; /* 왼쪽 간격을 줄였습니다 */
  font-size: 14px;
  color: #fff;
  font-weight: 400;
  transition: color 0.2s ease;
}

/* 메뉴 항목 텍스트 마우스 오버 */
.ps2-section .ps2 ul li a:hover {
  color: #ff5f57; /* 강조 색상 */
}

/* 아이콘 및 텍스트 스타일 */
.ps2-box img {
  margin-right: 10px; /* 아이콘과 텍스트 간격을 줄였습니다 */
  width: 14px;
  height: 14px;
}

.txt {
  flex-grow: 1;
  margin-left: 5px;
  font-size: 14px; /* 글자 크기를 조금 줄였습니다 */
  color: #fff;
  line-height: 18px;
}

/* 비활성화된 메뉴 항목 */
.menu-off {
  opacity: 0.5;
}

/* 버튼 스타일 */
.btn-tiny {
  background-color: #4e5056;
  margin: 0px 2px;
  padding: 4px 8px; /* 버튼 여백을 조금 더 키웠습니다 */
  border: 1px solid #626566;
  border-radius: 4px;
  color: white;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* 버튼 호버 시 색상 변경 */
.btn-tiny:hover {
  background-color: #646969;
}

/* 팝업 하단 라인 */
.pop-section-line {
  display: flex;
  border-bottom: 1px solid #3a3f47;
  margin-bottom: 8px;
}

/* 팝업 애니메이션 */
#pop-section-2 {
  transform: translateY(10px);
  opacity: 0;
  animation: pop-up 0.3s ease-out forwards; /* 팝업이 올라오는 애니메이션 */
}

@keyframes pop-up {
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}



</style>
