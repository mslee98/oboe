<template>
    <div class="pop-section">
        <div class="pop-section-con">

            <div class="pop-section-top">
                <div class="pop-section-top-tit">객체 속성 등록</div>
                <div class="pop-section-top-box">
                    <img
                        src="@/assets/image/ico_close.png"
                        alt="닫기"
                        width="12px"
                        height="12px"
                        style="cursor: pointer"
                        @click="closeWidget"
                        data-index="79"
                    />
                </div>
            </div>
    
            <div class="pop-section-content">
                <b-form size="sm" @submit="onSubmit" @reset="onReset">
                    <div class="pop-section-content-sub">

                        <!-- ///////////////////////////////////////////
                        <b-form-group
                            id="input-group-1"
                            label="이름:"
                            label-for="input-1"
                        >
                            <b-form-input
                                size="sm"
                                v-model="inputData.name"
                                placeholder="이름을 입력하세요."
                            >
                            </b-form-input>
                        </b-form-group>
                        <b-form-group
                            id="input-group-1"
                            label="타이틀:"
                            label-for="input-1"
                        >
                            <b-form-input
                                size="sm"
                                v-model="inputData.dtname"
                                placeholder="이름을 입력하세요."
                            >
                            </b-form-input>
                        </b-form-group>
                        <b-form-group
                            id="input-group-1"
                            label="설명:"
                            label-for="input-1"
                        >
                            <b-form-textarea
                                id="bdpDescript"
                                row="3"
                                max-rows="6"
                                v-model="inputData.descript"
                            ></b-form-textarea>
                        </b-form-group>
                        <b-form-group
                            id="input-group-1"
                            size="sm"
                            label="Display:"
                            label-for="input-1">
                            <b-form-select
                                size="sm"
                                v-model="inputData.display" :options="displaySelectedOpts"></b-form-select>
                        </b-form-group>
                        <b-form-group
                            id="input-group-1"
                            label="Action:"
                            label-for="input-1">
                            <b-form-select
                                size="sm"
                                v-model="inputData.action" 
                                :options="actionSelectedOpts"></b-form-select>
                            </b-form-group>
                        <b-form-group
                            id="input-group-1"
                            label="Target:"
                            label-for="input-1">
                            <b-form-input
                                id="objid"
                                v-model="inputData.target"
                                size="sm"
                                placeholder="Target을 입력하세요."
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            id="input-group-1"
                            label="URL:"
                            label-for="input-1">
                            <b-form-input
                                v-model="inputData.url"
                                size="sm"
                                placeholder="URL을 입력하세요."
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            id="input-group-1"
                            label="사용자 정의 Tag:"
                            label-for="input-1">
                            <b-form-textarea
                                v-model="inputData.extra"
                                size="sm"
                                row="5"
                                max-rows="10"
                            ></b-form-textarea>
                        </b-form-group>
                        ///////////////////////////////////////////-->
                        <b-container fluid>

                            <b-row class="mt-1">
                                <b-col sm="3">ID : </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        size="sm"
                                        v-model="inputData.name"
                                        placeholder="ID를 입력하세요."
                                        readonly
                                        :style="{ 'background-color': '#CCCCCC' }"
                                    >
                                    </b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="mt-1">
                                <b-col sm="3">타이틀 : </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        size="sm"
                                        v-model="inputData.dtname"
                                        placeholder="타이틀을 입력하세요."
                                    >
                                    </b-form-input>
                                </b-col>
                            </b-row> 
                            <b-row class="mt-1">
                                <b-col sm="3">설명 : </b-col>
                                <b-col sm="9">
                                    <b-form-textarea
                                        size="sm"
                                        row="3"
                                        max-rows="6"
                                        v-model="inputData.descript"
                                    ></b-form-textarea>
                                </b-col>
                            </b-row>
                            <b-row class="mt-1">
                                <b-col sm="3">Display : </b-col>
                                <b-col sm="9">
                                    <b-form-select
                                        size="sm"
                                        v-model="inputData.display" :options="displaySelectedOpts"></b-form-select>
                                </b-col>
                            </b-row>
                            <b-row class="mt-1">
                                <b-col sm="3">Action : </b-col>
                                <b-col sm="9">
                                    <b-form-select
                                        size="sm"
                                        v-model="inputData.action" 
                                        :options="actionSelectedOpts"></b-form-select>
                                </b-col>
                            </b-row>
                            <b-row class="mt-1">
                                <b-col sm="3">Target : </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        id="objid"
                                        v-model="inputData.target"
                                        size="sm"
                                        placeholder="Target을 입력하세요."
                                    ></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="mt-1">
                                <b-col sm="3">URL : </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        v-model="inputData.url"
                                        size="sm"
                                        placeholder="URL을 입력하세요."
                                    ></b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="mt-1">
                                <b-col sm="3">사용자 정의 : </b-col>
                                <b-col sm="9">
                                    <b-form-textarea
                                        v-model="inputData.extra"
                                        size="sm"
                                        row="5"
                                        max-rows="10"
                                    ></b-form-textarea>
                                </b-col>
                            </b-row>
    

                            <b-row>
                                <b-col sm="3">
                                    <b-form-checkbox
                                        v-model="currState.isViewRes"
                                        size="sm"
                                    >View Result</b-form-checkbox>
                                </b-col>
                                <b-col sm="9">
                                    <!--b-card v-if="inputData.isViewRes"
                                        class="mt-3"
                                        size="sm"
                                        header="Form Data">
                                        <pre class="m-0">{{ inputData }}</pre>
                                    </b-card -->
                                    <pre v-if="currState.isViewRes"
                                        size="sm">{{ inputData }}</pre>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col sm="3">
                                    <b-form-checkbox
                                        v-model="currState.isViewUserData"
                                        size="sm"
                                    >View User</b-form-checkbox>
                                </b-col>
                                <b-col sm="9">
                                    <!-- b-card v-if="inputData.isViewUserData"
                                        class="mt-3"
                                        size="sm"
                                        header="User Data">
                                        <pre class="m-0">{{ targetObject.userData }}</pre>
                                    </b-card -->
                                    <pre v-if="currState.isViewUserData"
                                        size="xs">{{ userData }}</pre>
                                </b-col>
                            </b-row>

                        </b-container>

                    </div>

                    <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button>
                    <b-button variant="success"
                        @click="onPreviewClick"
                    >미리보기</b-button>

                </b-form>

            </div>

            <!-- div class="wrapper">
                <button class="btn" @click.stop="onMenuClick" data-index="71">등록</button>
                <button class="btn" @click.stop="onMenuClick" data-index="72">미리보기</button>
                <button class="btn" @click.stop="onMenuClick" data-index="78">Reset</button>
                <button class="btn" @click.stop="onMenuClick" data-index="79">취소</button>
            </div -->

        </div>

        <WidgetViewer
            v-if="divWidget.isShow"
            class="widget-container"
            :style="{
            top: `${currState.top}px`,
            }"
            :targetObject="targetObject"
            :userData="userData"
            @setMenuClick="onMenuClick"
            v-stop-propagation
        />

    </div>

</template>
  
<script>


import WidgetViewer from "./WidgetViewer.vue"; // Context Menu를 보기 위한 Vuew

// import CommUtil from "./CommUtil.js"; // Logger 클래스를 import 합니다.
// import { forEach } from "core-js/core/array";
// import Logger from "./CommUtil.js"; // Logger 클래스를 import 합니다.
  
export default {
    name: "AttribInput",
    components: {
        WidgetViewer,
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

            inputData: {
                isDTwin:false,
                name: "",
                dtname: "",
                descript: "",
                display: "",
                action: "",
                url: "",
                target: "",
                extra: ""
            },

            currState : {
                isViewRes:false,
                isViewUserData:false,
                top:0,      // 현재 위젯의 Top 위치
            },

            userData: "",

            displaySelected: "",
            displaySelectedOpts: [       // 향후 공통코드 API를 사용하여 조회 필요
                { text: 'normal', value: 'normal' },
                { text: 'active', value: 'active' },
                { text: 'hide', value: 'hide' },
                { text: 'remove', value: 'remove' }
            ],

            actionSelected: "",
            actionSelectedOpts: [       // 향후 공통코드 API를 사용하여 조회 필요
                { text: 'chart', value: 'chart' },
                { text: 'video', value: 'video' },
                { text: 'link', value: 'link' },
                { text: 'image', value: 'image' },
                { text: 'morph', value: 'morph' }
            ],

            divWidget: {
                isShow: false,
                type:"",
            },

        };
    },
    mounted() {
        console.log("AttribInput > mounted()");
        
        console.log("top : ", document.body.scrollTop);
        // document.addEventListener('visibilitychange', this.handleVisibilityChange);
        // this.showDivWidget();
        this.setObject2InputData();

        // [임시] 현재 창의 Top 위치를 계산적으로 산출해야 함
        // currState.top = document.body.scrollTop;
        this.currState.top = 73;

    },
    beforeUnmount() {
        console.log("AttribInput > beforeUnmount()");
        // document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    },  
    watch: {
        targetObject(newVal, oldVal) {
            let oldName = oldVal && oldVal.name ? oldVal.name : "Unnamed";
            let newName = newVal && newVal.name ? newVal.name : "Unnamed";
            console.log(`AttribInput > watch > targetObject :  ${oldName} → ${newName}`);

            this.setObject2InputData();
        },
    },
    methods: {
  
        handleVisibilityChange() {
            console.log('AttribInput > handleVisibilityChange() visibility changed:',
                document.visibilityState);
        },

        // 입력된 데이터를 바탕으로 내부 변수를 설정
        setObject2InputData() {

            let isClear = true;
            if(this.targetObject && this.targetObject.name) {
                this.inputData.name = this.targetObject.name;

                if(this.targetObject.userData) {

                    this.userData = this.targetObject.userData;

                    if(this.targetObject.userData.digitalTwin) {

                        const dtObject = this.targetObject.userData.digitalTwin;

                        this.inputData.name = dtObject.name;
                        this.inputData.dtname = dtObject.dtname;
                        this.inputData.descript = dtObject.descript;
                        this.inputData.display = dtObject.display;
                        this.inputData.action = dtObject.action.type;
                        this.inputData.target = dtObject.action.target;
                        this.inputData.url = dtObject.action.url;
                        this.inputData.extra = dtObject.action.extra;

                        isClear = false;

                    }
                }
                else {
                    this.userData = "{}";    
                }

            }
            else {
                this.userData = "{}";
                this.inputData.name = "";
            }

            if(isClear) {
                this.inputData.dtname = "";
                this.inputData.descript = "";
                this.inputData.display = "";
                this.inputData.action = "";
                this.inputData.target = "";
                this.inputData.url = "";
                this.inputData.extra = "";
            }
        },

        

        onSubmit(event) {
            event.preventDefault();
            alert(JSON.stringify(this.inputData))
        },

        onReset(event) {
            event.preventDefault();
            this.setObject2InputData();
        },

        onPreviewClick() {

            console.log("onPreviewClick()", );

            if(this.divWidget.isShow) {

                this.divWidget.isShow = false;

            }
            else {
                if(this.inputData.display == "active") {

                    if(this.inputData.action != "") {

                        const dtObject = this.userData.digitalTwin;
                        const dtAction = dtObject.action;

                        this.userData.name = this.inputData.name;

                        dtObject.name = this.inputData.name;
                        dtObject.dtname = this.inputData.dtname;
                        dtObject.descript = this.inputData.descript;
                        dtObject.display = this.inputData.display;

                        dtAction.type = this.inputData.action;
                        dtAction.target = this.inputData.target;
                        dtAction.url = this.inputData.url;

                        this.divWidget.isShow = true;

                    }

                }
                else {
                    this.divWidget.isShow = false;
                }
            }

        },

        // 위젯 화면을 종료
        closeWidget(event) {
            // alert("화면 Close (구현예정)");
            this.$emit("setMenuClick", event);
        },

        // 메뉴에서 버튼을 클릭한 경우
        onMenuClick(event) {
            const menuIndex = parseInt(event.currentTarget.dataset.index);
            if(menuIndex == 89) {
                this.divWidget.isShow = false;
            }
            else {
                this.$emit("setMenuClick", event);
                // const menuIndex = parseInt(event.currentTarget.dataset.index);
            }
        },

    },
};
</script>


<style scoped>
.pop-section {
    position: fixed;
    width: 560px;
    /* height: 200px; */
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
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 12px;
    padding-right: 12px;
    background-color: #1a1a1e;
    color: #fff;
    min-width:400px;
}
  
.pop-section-top {
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
  
.pop-section-content {
    display: flex;
    margin-top: 5px;
    text-align: left;
    display: block;
}

.pop-section-content-sub {
    max-height:600px;
    overflow:auto;
    margin: 10px 0px;
}

.tx {
    display: flex;
    padding-bottom: 10px;
    color: #8c8c8c;
}
.lable {
    display: block;
    color: #8c8c8c;
    width: 120px;
    text-align: left;
    font-weight: bold;
}
.lable-tx {
    display: block;
    color: #fff;
    text-align: left;
    max-width:320px;
}

/* 라운드버튼 */
.wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
}

.btn {
    background-color: #646464;
    margin: 2px 10px;
    padding: 5px 15px;
    border: 0;
    border-radius: 0.3rem;
    color: white;
    cursor: pointer;
    user-select: none;
    font-weight: bold;
    font-size: 14px;
}
 
.widget-container {
  position: fixed;
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
  z-index: 1000;
}
  
</style>
  