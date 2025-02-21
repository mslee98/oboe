<template>
    <div>
        <div class="pop-section-con">
            <div class="pop-section-top-section">
              <div class="pop-section-top-tit">객체 관계 정보 {{ objName }}</div>
              <div class="pop-section-top-box">
                <img
                  src="@/assets/image/ico_close.png"
                  alt="닫기"
                  width="12px"
                  height="12px"
                  style="cursor: pointer"
                  @click="closeWidget"
                  data-index="16"
                />
              </div>
            </div>

            <div class="mb-15"></div>
            <div class="pop-section-top-section"></div>
            <div class="mb-15"></div>


            <Treeselect
                v-model="selectedNode"
                :options="treeData"
                placeholder="Select an Object"
                @select="onSelect"
            />


            <div class="pop-section-content-section">

                <!-- b-container fluid>

                    <b-row class="mt-1">
                        <b-col sm="1">ID</b-col>
                        <b-col sm="1">LV</b-col>
                        <b-col sm="4">Name</b-col>
                        <b-col sm="4">Parent</b-col>
                    </b-row>

                    <b-row class="mt-1"
                        v-for="(item, index) in objList" :key="index">
                        <b-col sm="1">{{ item.idx }}</b-col>
                        <b-col sm="1">{{ item.level }}</b-col>
                        <b-col sm="4">{{ item.objectName }}</b-col>
                        <b-col sm="4">{{ item.parentName }}</b-col>
                    </b-row>

                </b-container -->

            </div>
        </div>

    </div>
</template>


<script>

import Treeselect from "vue3-treeselect";
import "vue3-treeselect/dist/vue3-treeselect.css";


export default {
    name: "ObjRelatViewer",
    components: {
        Treeselect,
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

            objList: [],

            treeData: [],
            selectedNode: null,
        };
    },
    mounted() {
        console.log("ObjRelatViewer > mounted()");

        if(this.targetObject) {

            this.treeData = this.createTree(this.targetObject);

            console.log("treeData : ", this.treeData);

            // this.setObject2InputData();
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

                    // this.treeData = this.createTree(newVal);

                    this.setObject2InputData();

                }
            },
            // immediate: true,
        },

        /*
        targetObject(newVal, oldVal) {

            console.log("ObjRelatViewer > watch > targetObject : ", newVal);

            if(newVal) {
                // let oldName = "";
                let oldName = oldVal && oldVal.name ? oldVal.name : "Unnamed";
                let newName = newVal && newVal.name ? newVal.name : "Unnamed";
                console.log(`ObjRelatViewer > watch > targetObject :  ${oldName} → ${newName}`);

                // this.treeData = this.createTree(newVal);

                this.setObject2InputData();

            }
        },
        */

    },
    methods: {

        // 입력된 Object에서 존재하는 하위 Object들의 정보를 보여 줌
        setObject2InputData() {

            console.log("setObject2InputData() : ", this.targetObject)

            if(this.targetObject) {

                this.objName = this.targetObject.name ? this.targetObject.name : "";

                this.objList = [];

                let idx = 0;
                let objInfo = this.getObjectInfo(idx, this.targetObject);
                this.objList.push(objInfo);

                this.targetObject.traverse((child) => {
                    idx++;
                    objInfo = this.getObjectInfo(idx, child);
                    this.objList.push(objInfo);
                });
            }

        },

        getObjectInfo(idx, object) {

            const oName = object.name ? object.name : "";
            let pName = "";
            if(object.parent)
                pName = object.parent.name ? object.parent.name : "";
            let level = 0;

            if(oName == "") {
                level = 0;
            }
            else if(oName == "Scene") {
                level = 1;
            }
            else {

                // 부모 객체를 찾아서 부모 객체의 Level + 1을 해당 객체의 Level로 사용
                for(let i=0; i<this.objList.length; i++) {
                    const tmpObj = this.objList[i];
                    // console.log(tmpObj);
                    if(tmpObj) {
                        if(tmpObj.objectName) {
                            const tmpName = tmpObj.objectName;
                            if( tmpName.length > 0
                                && tmpName == pName) {
                                level = this.objList[i].level + 1; 
                                // console.log(`getObjectInfo() : ${idx} / ${level} : ${tmpName}`);
                                break;
                            }

                        }
                    }
                }

            }

            let rtn = {
                idx: idx,
                level: level,
                objectName: oName,
                parentName: pName,
            };

            return rtn;
        },

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
                    label: object.name || "Scene",
                    children: object.children.map(this.createNode),
                },
            ];
        },

        createNode(object) {
            return {
                id: object.uuid,
                label: object.name || "(No Name)",
                children: object.children.map(this.createNode),
            };
        },

        onSelect(node) {
            console.log("Selected Object:", node);
        },

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
    padding-bottom: 15px;
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
    display: flex;
    font-size: 12px;
    margin-top: 10px;
    max-height: 700px;
    text-align: left;
    overflow:auto;
    display: block;
}

/* Treeselect 가로 크기 고정 */
::v-deep(.vue-treeselect) {
  margin-top: 10px !important;
  width: 360px !important;

}

/* Treeselect 텍스트 색상 & 크기 변경 */
::v-deep(.vue-treeselect__label) {
  color: #ff6600 !important;  /* 텍스트 색상 */
  font-size: 12px !important; /* 폰트 크기 */
  font-weight: bold; /* 굵기 */
}

/* 선택된 항목 스타일 */
::v-deep(.vue-treeselect__single-value) {
  color: #00ccff !important; /* 선택된 텍스트 색상 */
  font-size: 12px !important;
  font-weight: bold;
}

/* 노드 hover 시 스타일 */
::v-deep(.vue-treeselect__option--highlight) {
  background-color: rgba(255, 102, 0, 0.1) !important; /* hover 배경 */
  color: #ff6600 !important; /* hover 시 텍스트 색상 */
}


</style>
    
    