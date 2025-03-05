<template>
  <div class="mark-section"
    @contextmenu.prevent="onTitleRightClick">
    <div class="mark-point"
      :style="stylePoint">●</div>
    <div class="mark-title-box"
      :style="styleTitleBox">
      <div class="mark-title"
        :style="styleTitle"
        @click.stop="onTitleClick"
        >{{ title.text }}</div>
    </div>
    <div class="mark-line"
      :style="styleLine"></div>
    <div class="mark-descript"
      :style="styleDescript">{{ descript.text }}</div>
  </div>
</template>

<script>
/* 2D 마커 생성 Commponent
   마커 아이콘 샘플 : ★ ○ ● ◎ ◇ ◆ □ ■ △ ▲ ▽ ▼ → ← ↑ ↓ ↔ 〓 ◁ ◀ ▷ ▶ ♤ ♠ ♡ ♥ ♧ ♣ ⊙ ◈ ▣ ◐
 */

export default {
  name: "D2MarkViewer",
  props: {
    targetObject: {
      type: Object,
      required: true,
    },
  },
  data() {
      return {
        objName : "",
        tarObjName : "",
        isLeft : false,
        styleTitle : "",
        styleDescript : "",
        styleLine : "background-color:#FFFFFF",
        stylePoint : "",
        styleTitleBox : "",
        title : {
          text:"",
          color:"#FFFFFF",
          // bgColor:"#17A2B8",
          // bgColor:"rgba(23, 162, 184, 0.3)",
          bgColor:"rgba(0, 0, 0, 0)",
          opacity:1,    // 사용하지 않음
          textAlign:"left",
          fontSize:40,
          maxWidth:800,
          margin:100,
        },
        descript : {
          text:"",
          color:"#FFFFFF",
          bgColor:"rgba(0, 0, 0, 0)",
          opacity:1,    // 사용하지 않음
          fontSize:16,
          maxWidth:800,
          margin:50,
        },
      };
    },  
  mounted() {
    this.setMounted();
  },

  watch: {
    targetObject(newVal, oldVal) {
      let oldName = oldVal && oldVal.name ? oldVal.name : "Unnamed";
      let newName = newVal && newVal.name ? newVal.name : "Unnamed";
      console.log(`D2MarkerViewer > watch > target : ${oldName} → ${newName}`);
    },
  },
  methods: {

    setMounted() {

      // const thisJson = this.targetJson;
      const thisJson = this.targetObject.mObject.userData;

      // console.log(`D2Marker > setMounted :`);
      // console.log(`D2Marker > setMounted : ${thisJson.text.title} / ${this.targetJson.text.descript}`);

      // Marker Object의 이름
      this.objName = thisJson.name ? thisJson.name : "";

      // Marker Object의 Target Object 명
      this.tarObjName = thisJson.target ? thisJson.target : "";

      this.title.text = thisJson.text.title;
      if(thisJson.text.sub)
        this.descript.text = thisJson.text.sub.title;
      else 
      this.descript.text = "";
      // if(targetJson.text.size)   this.fontSize = targetJson.text.size;
      // if(targetJson.text.size2)   this.fontSizeDescript = targetJson.text.size2;

      this.styleTitle = "";
      this.styleDescript = "";
      this.stylePoint = "";
      this.styleLine = "";
      this.styleTitleBox = "";

      if(thisJson.align && thisJson.align=="left")
        this.isLeft = true;
      /*
      if(thisJson.margin)
          this.styleMargin = `width:${thisJson.margin}px;`;
      */

      if(thisJson.line.color) {
        this.styleLine = `background-color:${thisJson.line.color};`;
        this.stylePoint = `color:${thisJson.line.color};`;
      }

      if(thisJson.text) {
        const jText = thisJson.text;

        if(jText.color) this.title.color = jText.color;
        if(jText.bgColor) this.title.bgColor = jText.bgColor;
        if(jText.fontSize) this.title.fontSize = jText.fontSize;
        if(jText.margin) this.title.margin = jText.fontSize;

        if(jText.sub) {
          if(jText.sub.color) this.descript.color = jText.sub.color;
          if(jText.sub.bgColor) this.descript.bgColor = jText.sub.bgColor;
          if(jText.sub.fontSize) this.descript.fontSize = jText.sub.fontSize;
          if(jText.sub.margin) this.descript.margin = jText.sub.margin;
          else    this.descript.margin = this.title.margin;
        }

        /*
        if(jText.maxWidth) {
          this.title.maxWidth = jText.maxWidth;
          this.descript.maxWidth = jText.maxWidth;
        }
        */

      }

      /*
      if(this.isLeft)   this.styleTitleTd = ` text-align:left;`;
      else   this.styleTitleTd = ` text-align:right;`;
      */

      if(this.tarObjName)
        this.styleTitle += ` cursor:pointer;`;

      this.styleTitle += ` color:${this.title.color};`;
      this.styleTitle += ` background-color:${this.title.bgColor};`;
      // this.styleTitle += ` opacity:${this.title.opacity};`;
      this.styleTitle += ` font-size:${this.title.fontSize}px;`;
      // this.styleTitle += ` max-width:${this.title.maxWidth}px;`;

      this.styleDescript = "";
      this.styleDescript += ` color:${this.descript.color};`;
      this.styleDescript += ` background-color:${this.descript.bgColor};`;
      // this.styleDescript += ` opacity:${this.descript.opacity};`;
      this.styleDescript += ` font-size:${this.descript.fontSize}px;`;
      // this.styleDescript += ` max-width:${this.descript.maxWidth}px;`;

      
      if(this.isLeft) {
        this.styleTitle += ` margin-right:${this.title.margin}px;`;
        this.styleDescript += ` margin-right:${this.descript.margin}px;`;

        // this.styleTitle += ` justify-content: start;`;
        this.styleDescript += ` text-align:left;`;
        this.stylePoint += ` right:0px;`;
        // this.styleLine += ` right:10px;`;
        // this.styleLine += ` padding-right:5px;`;
      }
      else {
        this.styleTitle += ` margin-left:${this.title.margin}px;`;
        this.styleDescript += ` margin-left:${this.descript.margin}px;`;

        this.styleTitleBox += ` justify-content: flex-end;`;
        this.styleDescript += ` text-align:right;`;
        this.styleLine += ` left:10px;`;
        // this.styleLine += ` padding-right:5px;`;
      }

      // console.log(this.styleTitle);
      // console.log(this.styleDescript);

      /*  
      if(thisJson.text.margin)
        this.styleMargin = `width:${thisJson.text.margin}px;`
      */

    },

    // Target Object를 Remove 처리 (객체를 제거)
    onTitleClick(event) {

      console.log("D2MarkViewer onTitleClick() button", event.button);
      
      if(this.tarObjName) {
        this.$emit("setObjectClick", this.tarObjName);
      }
      else {
        console.log("onTitleClick Target Object Name is Empty");
      }
    },

    onTitleRightClick(event) {
      // console.log("D2MarkViewer onTitleRightClick() button", event.button);

      
      if(this.objName != "") {

        // ContextMenu 화면 Open Data Index 설정
        event.currentTarget.dataset.index = 61;
        event.currentTarget.dataset.objName = this.objName;
        // event.currentTarget.dataset.userData = this.targetJson;

        // console.log("D2MarkViewer onTitleRightClick() name", event.currentTarget.dataset.objName);

        this.$emit("setMouseRightClick", event);
      }


    },

  },
};
</script>

<style scoped>

.mark-section {
  /* width:200px; */
  /* color: white; */
}

.mark-point {
  position: absolute;			/* 부모 객체 기준 위치 지정 */
  height:100%;
  display:flex;
  align-items: center ;			/* 세로 bottom 정렬 */
  font-size: 30px;
  /* color: white; */
}

.mark-title-box {
  /* border: 1px solid blue; */
  position: relative;
  height:64px;
  display:flex;
  align-items: flex-end;			  /* 세로 bottom 정렬 */
  /*
  justify-content: flex-end;		/ * 가로 우측 정렬 (td 내부에 div 있을 경우) * /
  font-size:30px;
  padding-left: 100px;
  color: white;
  */
}
.mark-title {
  /* border: 1px solid blue; */
  position: relative;
  padding: 2px 8px;
  border-radius: 5px;
  font-weight: bold;
  /*
  font-size:30px;
  padding-left: 100px;
  color: white;
  */
}

.mark-line {
  position: relative;
  width: calc(100% - 10px);
  height: 1px;
  margin-top : 4px;
  margin-bottom : 4px;
  /*
  padding-left: 5px;
  left:5px;
  background: #FFFFFF;
  */
}

.mark-descript {
  position: relative;
  height:60px;
  /*
  color: white;
  padding-left: 100px;
  font-size:15px;
  text-align:right;
  */
  /* font-weight: bold; */
  /*
  color: var(--descript-color);
  background-color: var(--descript-bg-color);
  opacity: var(--descript-opacity);
  text-align: var(--descript-text-align);
  font-size: var(--descript-font-size);
  */
}

</style>
