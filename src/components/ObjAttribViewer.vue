<!--
    Vuetify.js을 사용하여 보여 줌 (npm install vuetify)



-->
<template>
    <div>
        <div class="pop-section-con">
            <div class="pop-section-top-section">
              <div class="pop-section-top-tit">객체 속성 정보 {{ objName }}</div>
              <div class="pop-section-top-box">
                <img
                  src="@/assets/image/ico_close.png"
                  alt="닫기"
                  width="12px"
                  height="12px"
                  style="cursor: pointer"
                  @click="closeWidget"
                  data-index="39"
                />
              </div>
            </div>

            <div class="pop-section-content-section">

                <div class="ps1">

                    <b-container fluid>

                        <b-row class="mt-1">
                            <b-col sm="2">name :</b-col>
                            <b-col sm="10">{{attrContent.name}}</b-col>
                        </b-row>

                        <b-row class="mt-1">
                            <b-col sm="2">ID :</b-col>
                            <b-col sm="10">{{attrContent.id}}</b-col>
                        </b-row>

                        <b-row class="mt-1">
                            <b-col sm="2">부모 :</b-col>
                            <b-col sm="10">{{attrContent.parent}}</b-col>
                        </b-row>

                        <b-row class="mt-1">
                            <b-col sm="2">자식 :</b-col>
                            <b-col sm="10">{{attrContent.child}}</b-col>
                        </b-row>

                        <b-row class="mt-1">
                            <b-col sm="2">크기 :</b-col>
                            <b-col sm="10">{{attrContent.size}}</b-col>
                        </b-row>

                        <b-row class="mt-1">
                            <b-col sm="2">위치 :</b-col>
                            <b-col sm="10">{{attrContent.position}}</b-col>
                        </b-row>

                        <b-row class="mt-1">
                            <b-col sm="12">

                                <table><tbody><tr>                                
                                    <td v-for="(text, index) in attrContent.attrBtns"
                                        :key="index">
                                        <div class="btn-tiny">{{ text }}</div>
                                    </td>
                                </tr></tbody></table>

                            </b-col>
                        </b-row>

                    </b-container>

                </div>


                <div class="pop-section-line"></div>

                <div class="ps2">

                    <v-container>
                        <v-card>
                            <!-- v-card-title>Tree Menu</v-card-title -->
                            <v-card-text>
                                <v-list>
                                    <TreeItem v-for="item in treeData" :key="item.id" :item="item" />
                                </v-list>
                            </v-card-text>
                        </v-card>
                    </v-container>

                </div>

                <div class="pop-section-line"></div>

                <div class="ps3">
                    <b-container fluid>

                        <b-row class="mt-1">
                            <b-col sm="12"><pre>{{attrContent.userData}}</pre></b-col>
                        </b-row>

                    </b-container>                    
                </div>

            </div>
        </div>

    </div>
</template>


<script>

import TreeItem from "./TreeItem.vue"; // 트리 아이템 컴포넌트 가져오기

import CommUtil from "./comm/CommUtil.js"; // Logger 클래스를 import 합니다.


export default {
    name: "ObjAttribViewer",
    components: {
        TreeItem,
    },
    props: {
        targetObject: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            objName: "",

            treeData: [],       // 객체의 Child 를 보여 주기 위한 트리 구조
            selectedNode: null,

            // 화면에 Object 속성 정보를 보여 주기 위한 데이터 구조
            attrContent : {
                name : "",
                id : "",
                parent : "",
                child : "",
                size : "",
                postion : "",
                etc : "",
                attrBtns:[],
                userData : "",
            },
            
        };
    },
    mounted() {
        console.log("ObjRelatViewer > mounted()");

        if(this.targetObject) {

            this.setInspectObject();
            
            this.treeData = this.createTree(this.targetObject);

            console.log("treeData : ", this.treeData);


        }

    },
    beforeUnmount() {
        console.log("ObjRelatViewer > beforeUnmount()");
        // document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    },  
    watch: {
        targetObject : {
            hander(newVal) {

                console.log("ObjRelatViewer > watch > targetObject : ", newVal);

                if(newVal) {
                    let oldName = "";
                    // let oldName = oldVal && oldVal.name ? oldVal.name : "Unnamed";
                    let newName = newVal && newVal.name ? newVal.name : "Unnamed";
                    console.log(`ObjRelatViewer > watch > targetObject :  ${oldName} → ${newName}`);

                    this.treeData = this.createTree(newVal);

                }
            },
            // immediate: true,
        },

    },
    methods: {


        // 메뉴에서 버튼을 클릭한 경우
        onMenuClick(event) {
            const menuIndex = parseInt(event.currentTarget.dataset.index);

            if(menuIndex > 16) {
                this.$emit("setMenuClick", event);
            }
        },

        // 위젯 화면을 종료
        closeWidget(event) {
            // alert("화면 Close (구현예정)");
            this.$emit("setMenuClick", event);
        },

        createTree(object) {
            // console.log("createTree() : ", object);
            return [
                {
                    id: object.uuid,
                    name: object.name || "Scene",
                    children: object.children.map(this.createNode),
                },
            ];
        },

        createNode(object) {
            return {
                id: object.uuid,
                name: object.name || "(No Name)",
                children: object.children.map(this.createNode),
            };
        },

        onSelect(node) {
            console.log("Selected Object:", node);
        },

        setInspectObject() {

            this.attrContent.parent = "";
            this.attrContent.position = "";
            this.attrContent.etc = "";
            this.attrContent.attrBtns = [];

            if(this.targetObject) {

                const object = this.targetObject;


                this.attrContent.name = object.name;
                this.attrContent.id = object.id;
                this.attrContent.userData = object.userData;


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

                if(object.type) this.attrContent.attrBtns.push(object.type);

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

        },

        // Object 속성 보기 창 Close



    },
};
</script>


<style scoped>
.pop-section {
    position: fixed;
    width: 485px;
    height: 650px;
    top: 102px;
    left: 1414px;
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
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 12px;
    padding-right: 12px;
    background-color: #1a1a1e;
    color: #fff;
    /* min-width:400px; */
}

.pop-section-top-section {
    display: flex;
    border-bottom: 1px solid #8d8e92;
}
.pop-section-top-tit {
    display: flex;
    padding-bottom: 4px;
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

.pop-section-content-section {
    font-size: 12px;
    margin-top: 0px;
    max-width: 400px;
    text-align: left;
    display: block;
}

.pop-section-content-section .ps1 {
  margin: 5px 0px;
  width: 100%;
}

.pop-section-content-section .ps2 {
  width: 100%;
  max-height: 400px;
  overflow-x:hidden;
  overflow-y:auto;
}

.pop-section-content-section .ps3 {
  width: 100%;
  max-height: 300px;
  overflow-x:auto;
  overflow-y:auto;
}

.pop-section-line {
  display: flex;
  margin: 1px 0px;
  padding: 0px;
  height: 1px;
  background-color: #8d8e92;
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
  width:auto;
}



.v-list {
    color: rgba(255, 255, 255, 1.0);
    background-color: rgba(255, 255, 255, 0);
    min-width: 300px;
}

</style>
    