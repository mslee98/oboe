<template>
  <!-- div class="context-menu" v-stop-propagation>
    <ul>
      <li @click="onHideObject">Hide Object</li>
      <li @click="onRemoveObject">Remove Object</li>
      <li @click="onInspectObject">Inspect Object</li>
      <li @click="onMoveObject">Move Object</li>
      <li @click="onCloseContextMenu">Close</li>
    </ul>
  </div -->

  <div id="pop-section-2" v-stop-propagation>
    <div class="pop-section-2-con">
      <!-- div class="pop-section-2-top-section">
        <div class="pop-section-2-top-box">
          <img
            @click.stop="onCloseContextMenu"
            style="cursor: pointer"
            src="@/assets/image/ico_close.png"
            alt="닫기"
            width="12px"
            height="12px"
          />
        </div>
      </div -->

      <div class="ps2-section">
        <div class="ps2">
          <ul>
            
            <li>
              <table width="100%">
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

        <div v-if="state.showAttribute" class="ps2">
          <ul>
            <li><div class="pop-section-line"></div></li>
            <li>
              <table width="100%">
                <tbody>
                  <tr>
                    <td>부모 :</td>
                    <td>{{attrContent.parent}}</td>
                  </tr>
                  <tr>
                    <td>자식 :</td>
                    <td>{{attrContent.child}}</td>
                  </tr>
                  <tr>
                    <td>크기 :</td>
                    <td>{{attrContent.size}}</td>
                  </tr>
                  <tr>
                    <td>위치 :</td>
                    <td>{{attrContent.position}}</td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <table>
                        <tbody>
                          <tr>
                            <td
                              v-for="(text, index) in attrContent.attrBtns"
                              :key="index"
                            >
                              <div class="btn-tiny">{{ text }}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
              </tbody>
            </table>
            </li>
            <li><div class="pop-section-line"></div></li>
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
/*
.context-menu {
  position: fixed;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 5;
}
.context-menu ul {
  list-style: none;
  margin: 0;
  padding: 5px 0;
}
.context-menu ul li {
  padding: 8px 15px;
  cursor: pointer;
}
.context-menu ul li:hover {
  background-color: #eee;
}

.not-enable {
  cursor: default;
}
.not-enable:hover {
  background-color: white;
}
*/
a {
  color: inherit;
  text-decoration: none;
}

ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: left;
}

/** 우클릭 팝업 **/
#pop-section-2 {
  position: fixed;
  /* width: 160px;
  height: 220px;
  top: 479px;
  left: 1009px; */
  min-width: 160px;
  background-color: #1a1a1e;
  color: #fff;
  border-radius: 10px;
/* z-index: 1; */
}
.pop-section-2-con {
  position: relative;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #1a1a1e;
  border-radius: 10px;
  color: #fff;
}
.pop-section-2-top-section {
  display: flex;
  border-bottom: 0px solid #8d8e92;
}
.pop-section-2-top-box {
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
  padding-left: 10px;
  justify-content: flex-end;
  vertical-align: top;
}

/** 우클릭 팝업 텍스트 **/
.ps2-box img {
  /* width: 19px;
  height: 19px; */
  margin-right: 10px;
  cursor: pointer;
}

.ps2-section {
  flex-grow: 1;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
.ps2-section .ps2 {
  width: 100%;
}
.ps2-section .ps2 ul {
  display: flex;
  flex-direction: column;
}
.ps2-section .ps2 ul li {
  flex-grow: 1;
  box-sizing: border-box;
  margin-bottom: 8px;
}
.ps2-section .ps2 ul li a {
  display: block;
}


.menu-on {
  cursor: pointer;
}

.menu-off {
  opacity: 0.5;
}


img {
  vertical-align: middle;
}

.img-off {
  opacity: 0.5;
}

span {
  vertical-align: bottom;
}

.txt {
  flex-grow: 1;
  margin-left: 10px;
  box-sizing: border-box;
  font-size: 15px;
  color: #fff;
  line-height: 20px;
}

.txt-off {
  flex-grow: 1;
  margin-left: 15px;
  box-sizing: border-box;
  font-size: 15px;
  color: #747474;;
  line-height: 20px;
}

.ps2-section .ps2 .txt-big {
  flex-grow: 1;
  box-sizing: border-box;
  margin-bottom: 8px;
  font-size: 17px;
  color: #fff;
  line-height: 20px;
  vertical-align: middle;
}

.pop-section-line {
  display: flex;
  border-bottom: 1px solid #8d8e92;
}

.btn-tiny {
  background-color: #646464;
  margin: 0px 1px;
  padding: 1px 5px;
  border: 1;
  border-radius: 0.2rem;
  color: white;
  /* font-weight: bold; */
  font-size: 12px;
}



</style>
