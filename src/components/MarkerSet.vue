<template>
    <div class="pop-section">
        <div class="pop-section-con">

            <div class="pop-section-top">
                <div class="pop-section-top-tit">마커 추가</div>
                <div class="pop-section-top-box">
                    <img
                        src="@/assets/image/ico_close.png"
                        alt="닫기"
                        width="12px"
                        height="12px"
                        style="cursor: pointer"
                        @click="closeWidget"
                        data-index="59"
                    />
                </div>
            </div>
    
            <div class="pop-section-content">
                <b-form size="sm" @submit="onSubmit" @reset="onReset">
                    <div class="pop-section-content-sub">

                        <b-container size="sm" fluid>

                            <b-row class="mt-1">
                                <b-col sm="3">ID : </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        size="sm"
                                        v-model="inputData.name"
                                        placeholder="ID를 입력하세요."
                                    >
                                    </b-form-input>
                                </b-col>
                            </b-row>
                            <b-row class="mt-1">
                                <b-col sm="3">Type : </b-col>
                                <b-col sm="9">
                                    <b-form-select
                                        size="sm"
                                        v-model="inputData.type" :options="typeSelectedOpts"></b-form-select>
                                </b-col>
                            </b-row>
                            <b-row class="mt-1">
                                <b-col sm="3">설명 : </b-col>
                                <b-col sm="9">
                                    <b-form-textarea
                                        size="sm"
                                        row="2"
                                        max-rows="6"
                                        v-model="inputData.descript"
                                    ></b-form-textarea>
                                </b-col>
                            </b-row>

                            <div class="pop-section-line"></div>

                            <b-row class="mt-2">
                                <b-col sm="3">Text</b-col>
                            </b-row>

                            <b-row class="mt-1">
                                <b-col sm="3"> ▷ 타이틀 : </b-col>
                                <b-col sm="9">
                                    <b-form-input
                                        size="sm"
                                        v-model="inputData.text.title"
                                        placeholder="타이틀을 입력하세요."
                                    >
                                    </b-form-input>
                                </b-col>
                            </b-row>

                            <b-row class="mt-1">
                                <b-col sm="3"> ▷ 설명 : </b-col>
                                <b-col sm="9">
                                    <b-form-textarea
                                        size="sm"
                                        row="3"
                                        max-rows="6"
                                        v-model="inputData.text.descript"
                                    ></b-form-textarea>
                                </b-col>
                            </b-row>

                            <b-row class="mt-1">
                                <b-col sm="3"> ▷ 위치(x,y,z) : </b-col>
                                <b-col sm="3">
                                    <b-form-input size="sm"
                                        v-model="inputData.text.position.x"
                                        type="number"
                                    ></b-form-input>
                                </b-col>
                                <b-col sm="3">
                                    <b-form-input size="sm"
                                        v-model="inputData.text.position.y"
                                        type="number"
                                    ></b-form-input>
                                </b-col>
                                <b-col sm="3">
                                <b-form-input size="sm" 
                                        v-model="inputData.text.position.z"
                                        type="number"
                                    ></b-form-input>
                                </b-col>
                            </b-row>

                            <b-row class="mt-1">
                                <b-col sm="3"> ▷ 회전(x,y,z) : </b-col>
                                <b-col sm="3">
                                    <b-form-input size="sm"
                                        v-model="inputData.text.rotation.x"
                                        type="number"
                                    ></b-form-input>
                                </b-col>
                                <b-col sm="3">
                                    <b-form-input size="sm"
                                        v-model="inputData.text.rotation.y"
                                        type="number"
                                    ></b-form-input>
                                </b-col>
                                <b-col sm="3">
                                <b-form-input size="sm" 
                                        v-model="inputData.text.rotation.z"
                                        type="number"
                                    ></b-form-input>
                                </b-col>
                            </b-row>



                            <b-row class="mt-1">
                                <b-col sm="3"> ▷ aline : </b-col>
                                <b-col sm="3">
                                    <b-form-select
                                        size="sm"
                                        v-model="inputData.text.aline" :options="alineSelectedOpts"></b-form-select>
                                </b-col>
                            </b-row>

                            <b-row class="mt-1">
                                <b-col sm="3"> ▷ Size : </b-col>
                                <b-col sm="3">
                                    <b-form-input size="sm" 
                                        v-model="inputData.text.size"
                                        type="number"
                                    ></b-form-input>
                                </b-col>
                                <b-col sm="3"> ▷ depth : </b-col>
                                <b-col sm="3">
                                    <b-form-input size="sm" 
                                        v-model="inputData.text.depth"
                                        type="number"
                                    ></b-form-input>
                                </b-col>
                            </b-row>

                            <b-row class="mt-1">
                                <b-col sm="3"> ▷ 글자색 : </b-col>
                                <b-col sm="3">
                                    <b-form-input size="sm" 
                                        v-model="inputData.text.color"
                                        type="color"
                                    ></b-form-input>
                                </b-col>
                                <b-col sm="3"> ▷ 배경색 : </b-col>
                                <b-col sm="3">
                                    <b-form-input size="sm" 
                                        v-model="inputData.text.bgcolor"
                                    ></b-form-input>
                                </b-col>
                            </b-row>

                        </b-container>

                        <div class="pop-section-line"></div>

                        <b-container size="sm" fluid>
                        
                            <b-row class="mt-1">
                                <b-col sm="3">Point</b-col>
                            </b-row>

                            <b-row class="mt-1">
                                <b-col> ▷ 사이즈 : </b-col>
                                <b-col>
                                    <b-form-input size="sm"
                                        v-model="inputData.point.size"
                                        type="number"
                                    ></b-form-input>
                                </b-col>
                                <b-col> ▷ 색상 : </b-col>
                                <b-col>
                                    <b-form-input size="sm"
                                        v-model="inputData.point.color"
                                        type="color"
                                    ></b-form-input>
                                </b-col>
                            </b-row>


                            <b-row class="mt-1">
                                <b-col sm="3"> ▷ 위치(x,y,z) : </b-col>
                                <b-col sm="3">
                                    <b-form-input size="sm"
                                        v-model="inputData.point.position.x"
                                        type="number"
                                    ></b-form-input>
                                </b-col>
                                <b-col sm="3">
                                    <b-form-input size="sm"
                                        v-model="inputData.point.position.y"
                                        type="number"
                                    ></b-form-input>
                                </b-col>
                                <b-col sm="3">
                                <b-form-input size="sm" 
                                        v-model="inputData.point.position.z"
                                        type="number"
                                    ></b-form-input>
                                </b-col>
                            </b-row>

                        </b-container>

                        <div class="pop-section-line"></div>

                        <b-container size="sm" fluid>

                            <b-row class="mt-1">
                                <b-col sm="3">Line</b-col>
                                <b-col sm="3"></b-col>
                                <b-col sm="3"> ▷ Point 개수</b-col>
                                <b-col sm="3">
                                    <b-form-input size="sm"
                                        v-model="inputData.line.count"
                                        type="range" min="0" max="5"
                                        @input="onLineCountChange"
                                    ></b-form-input>                             
                                </b-col>
                            </b-row>

                            <b-row v-if="this.inputData.line.count > 0" class="mt-1">
                                <b-col> ▷ 두께 : </b-col>
                                <b-col>
                                    <b-form-input size="sm"
                                        v-model="inputData.line.size"
                                        type="number"
                                    ></b-form-input>
                                </b-col>
                                <b-col> ▷ 색상 : </b-col>
                                <b-col>
                                    <b-form-input size="sm"
                                        v-model="inputData.line.color"
                                        type="color"
                                    ></b-form-input>
                                </b-col>
                            </b-row>

                            <div v-for="(item, index) in linePositions"
                                :key="index"
                            >
                                <b-row class="mt-1">
                                    <b-col sm="3"> ▷ 좌표(x,y,z) : </b-col>
                                    <b-col sm="3">
                                        <b-form-input size="sm"
                                            v-model="linePositions[index].x"
                                            @input="onLinePointChange"
                                            type="number"
                                        ></b-form-input>
                                    </b-col>
                                    <b-col sm="3">
                                        <b-form-input size="sm"
                                            v-model="linePositions[index].y"
                                            @input="onLinePointChange"
                                            type="number"
                                        ></b-form-input>
                                    </b-col>
                                    <b-col sm="3">
                                    <b-form-input size="sm" 
                                            v-model="linePositions[index].z"
                                            @input="onLinePointChange"
                                            type="number"
                                        ></b-form-input>
                                    </b-col>
                                </b-row>
                            </div>

                            <!-- div class="pop-section-line mb-2"></div>

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
                            </b-row -->

                        </b-container>

                        <div class="pop-section-line"></div>

                        <b-container size="sm" fluid>

    
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

    </div>

</template>
  
<script>


import CodeUtil from "./comm/CodeUtil.js"; // Logger 클래스를 import 합니다.
// import { forEach } from "core-js/core/array";
// import Logger from "./CommUtil.js"; // Logger 클래스를 import 합니다.

const INIT_LINE_COUNT = 2;
const INIT_TEXT_COLOR = "#FFFFFF";
const INIT_BG_COLOR = "rgba(170, 170, 255, 0.3)";
const INIT_POSITION = {x:0, y:0, Z:0};


export default {
    name: "MarkerSet",
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
                type: "",
                descript: "",
                text: {
                    title:"",
                    descript:"",
                    aline: "",
                    size: 0,
                    depth: 0,
                    color: "",
                    bgcolor: "",
                    position:{
                        x:0,
                        y:0,
                        z:0,
                    },
                    rotation:{
                        x:0,
                        y:0,
                        z:0,
                    },                
                },
                fontsize: 0,
                point: {
                    size:0,
                    color:"",
                    position:{
                        x:0,
                        y:0,
                        z:0,
                    },
                },
                line: {
                    count: INIT_LINE_COUNT,
                    size: 0,
                    color: "",
                    positions: [],
                },
            },

            currState : {
                isMarker:false,
                isViewRes:false,
                isViewUserData:false,
                top:0,      // 현재 위젯의 Top 위치
            },

            userData: "",

            isPoint: false,
            isLine: false,

            typeSelectedOpts:[],

            /*
            typeSelectedOpts: [       // 향후 API를 사용하여 조회 필요
                { text: 'Line3D', value: 'Line3D' },
                { text: 'Line2D', value: 'Line2D' },
            ],
            */

            alineSelectedOpts: [       // 향후 API를 사용하여 조회 필요
                { text: 'left', value: 'left' },
                { text: 'center', value: 'center' },
                { text: 'right', value: 'right' },
            ],

            divWidget: {
                isShow: false,
                type:"",
            },

            linePositions: [],

        };
    },
    mounted() {

        console.log("AttribInput > mounted()");
        
        console.log("top : ", document.body.scrollTop);

        // type code 정보를 설정
        this.typeSelectedOpts = [];
        const typeCodes = CodeUtil.getCodes("marker_type");
        typeCodes.forEach((code) => {
            const typeCode = {text:code, value:code};
            this.typeSelectedOpts.push(typeCode);
        });
        


        // document.addEventListener('visibilitychange', this.handleVisibilityChange);
        // this.showDivWidget();
        this.setObject2InputData();

        // [임시] 현재 창의 Top 위치를 계산적으로 산출해야 함
        // currState.top = document.body.scrollTop;
        this.currState.top = 73;

        let point = {x:0,y:0,z:0};
        this.linePositions.push(point);
        // this.linePositions.push(point);

        this.onLineCountChange();

    },

    beforeUnmount() {
        console.log("AttribInput > beforeUnmount()");
        // document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    },

    watch: {
        targetObject(newVal, oldVal) {
            let oldName = oldVal && oldVal.name ? oldVal.name : "Unnamed";
            let newName = newVal && newVal.name ? newVal.name : "Unnamed";
            console.log(`AttribInput > watch > targetObject : ${oldName} → ${newName}`);

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
            if(this.targetObject && this.targetObject.name
                && this.targetObject.userData
                && this.targetObject.userData.isMarker
            ) {


                console.log("setObject2InputData() : ");
                console.log(this.targetObject.userData);

                const markJson = this.targetObject.userData;

                this.userData = markJson;

                this.currState.isMarker = true;

                this.inputData.name = markJson.name;
                this.inputData.descript = markJson.descript;
                this.inputData.type = markJson.type;

                // Text 설정
                this.inputData.text.title = markJson.text.title;
                this.inputData.text.descript = markJson.text.descript;
                this.inputData.text.aline = markJson.text.aline;
                this.inputData.text.size = markJson.text.size;
                this.inputData.text.depth = markJson.text.depth;
                this.inputData.text.color = markJson.text.color;
                this.inputData.text.bgColor = markJson.text.bgColor;
                this.inputData.text.position = markJson.text.position;
                this.inputData.text.rotation = markJson.text.rotation;

                // Point 설정
                if(markJson.point) {
                    this.inputData.point.size = markJson.point.size;
                    this.inputData.point.color = markJson.point.color;
                    this.inputData.point.position = markJson.point.position;
                }

                // Line 설정
                if(markJson.line) {
                    this.inputData.line.size = markJson.line.size;
                    this.inputData.line.color = markJson.line.color;

                    if(markJson.line.positions && markJson.line.positions.length) {
                        this.inputData.line.count = markJson.line.positions.length;
                        this.inputData.line.positions = markJson.line.positions;
                    }
                    else {
                        this.setInitDataLine();
                    }

                }
                else {
                    this.setInitDataLine();
                }

                this.linePositions = this.inputData.line.positions;
                isClear = false;

            }
            else {
                this.userData = "{}";
                this.inputData.name = "";
            }


            if(isClear) {
                this.inputData.name = "";
                this.inputData.descript = "";
                this.inputData.type = "";
            }
        },

        setInitData() {

            this.inputData.name = "";
            this.inputData.descript = "";
            this.inputData.type = this.typeSelectedOpts[0].value;

            // Text 설정
            this.inputData.text.title = "";
            this.inputData.text.descript = "";
            this.inputData.text.aline = "";
            this.inputData.text.size = 0;
            this.inputData.text.color = INIT_TEXT_COLOR;
            this.inputData.text.bgColor = INIT_BG_COLOR;
            this.inputData.text.position = INIT_POSITION;

            // Point 설정
            this.inputData.point.size = 0;
            this.inputData.point.color = INIT_TEXT_COLOR;
            this.inputData.point.position = INIT_POSITION;

            // Line 설정
            this.inputData.point.size = 0;
            this.inputData.point.color = INIT_BG_COLOR;
            this.inputData.point.position = INIT_POSITION;

            this.inputData.line.positions = [];

        },

        // 초기 데이터 중 Line 부분에 대한 초기화를 수행
        setInitDataLine() {

            this.inputData.line.count = 0;
            this.inputData.line.positions = [];

            /* / 초기 2개를 무조건 보여 줄 경우
            this.inputData.line.count = INIT_LINE_COUNT;
            this.inputData.line.positions = [];
            for(let i=0; i<this.inputData.line.count; i++) {
                let point = INIT_POSITION;
                this.inputData.line.positions.push(point);
            }
            /////////////////////////////////////// */

        },






        onSubmit(event) {
            event.preventDefault();
            alert(JSON.stringify(this.inputData))
        },

        onReset(event) {
            event.preventDefault();
            this.setObject2InputData();
        },

        // Line Count를 변경하였을 경우
        onLineCountChange() {

            const countOrg = this.linePositions.length;
            const count = this.inputData.line.count;

            console.log(`onLineCountChange() : ${countOrg} → ${count}`);

            if(countOrg > count) {
                for(let i=countOrg-1; i>=count; i--) {
                    this.linePositions.pop();
                }
            }
            else if(countOrg < count) {
                for(let i=countOrg; i<count; i++) {
                    let point = {x:0,y:0,z:0};
                    this.linePositions.push(point);
                }
            }

        },


        // Line Count를 변경하였을 경우
        onLinePointChange() {
            this.inputData.line.positions = this.linePositions;
        },


        onPreviewClick() {

            // console.log("onPreviewClick()", );
            // event.currentTarget.dataset.index = 55;
            // event.currentTarget.dataset.objName = this.inputData.name;
            // event.currentTarget.dataset.userData = JSON.parse(this.inputData);

            this.$emit("setMarkerPrev", this.inputData.name, this.inputData);

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
    max-height:700px;
    overflow:auto;
    margin: 10px 0px;
}

.pop-section-line {
    margin-top: 5px;
    margin-bottom: 2px;
    border-bottom: 1px solid #8d8e92;
    width:100%;
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
  