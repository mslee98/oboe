<!--
    Vuetify.js을 사용하여 보여 줌 (npm install vuetify)



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

            <!-- div class="mb-15"></div>
            <div class="pop-section-top-section"></div>
            <div class="mb-15"></div -->

            <div class="pop-section-content-section">

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
        </div>

    </div>
</template>


<script>

import TreeItem from "./TreeItem.vue"; // 트리 아이템 컴포넌트 가져오기


export default {
    name: "ObjRelatViewer",
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
    max-width: 300px;
    max-height: 700px;
    text-align: left;
    overflow:auto;
    display: block;
}


.v-list {
    color: rgba(255, 255, 255, 1.0);
    background-color: rgba(255, 255, 255, 0);
    min-width: 300px;
}

</style>
    