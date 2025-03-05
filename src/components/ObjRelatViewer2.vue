<!--
    vue3-treeselect을 사용하여 보여 줌 (npm install vue3-treeselect 필요)
    Select 박스 형태라 보는데, 불편함이 다소 존재

    아래 에러가 Tree 선택할 때마다 계속 발생 하여 해결이 필요
    [Vue warn]: Property "$createElement" was accessed during render but is not defined on instance.
-->
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

            <div class="pop-section-content-section">

                <Treeselect
                    v-model="selectedNode"
                    :options="treeData"
                    placeholder="Select an Object"
                    @select="onSelect"
                />

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
    font-size: 12px;
    margin-top: 10px;
    max-height: 700px;
    text-align: left;
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
    
    