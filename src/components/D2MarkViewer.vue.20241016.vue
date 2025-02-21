<template>
  <div>
    <table class="mark-table">
        <tr>
          <!-- td v-if="!isLeft" rowspan=3 class="mark-point">◆</td -->
          <td v-if="!isLeft" :style="styleMargin"></td>
          <td :style="styleTitleTd" class="mark-td">
            <div :style="styleTitle" class="mark-title" @click.stop="onTitleClick">{{ title.text }}</div> 
          </td>
          <td v-if="isLeft" :style="styleMargin"></td>
        </tr>
        <tr height="1">
            <td colspan="2" :style="styleLine" class="mark-Line"></td>
        </tr>
        <tr>
          <td v-if="!isLeft" :style="styleMargin"></td>
          <td :style="styleDescript" class="mark-descript">{{ descript.text }}</td>
          <td v-if="isLeft" :style="styleMargin"></td>
        </tr>
    </table>
  </div>
</template>

<script>
/* SNB (Side Navigation Bar) Commponent */

/* ★ ○ ● ◎ ◇ ◆ □ ■ △ ▲ ▽ ▼ → ← ↑ ↓ ↔ 〓 ◁ ◀ ▷ ▶ ♤ ♠ ♡ ♥ ♧ ♣ ⊙ ◈ ▣ ◐           */

export default {
  name: "D2MarkViewer",
  props: {
    targetJson: {
      type: Object,
      required: true,
    },
  },
  data() {
      return {
        tarObjName : "",
        isLeft : false,
        styleMargin : "width:100px",
        styleTitle : "",
        styleDescript : "",
        styleLine : "background-color:#FFFFFF",
        styleTitleTd : "",
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
        },
        descript : {
          text:"",
          color:"#FFFFFF",
          bgColor:"rgba(0, 0, 0, 0)",
          opacity:1,    // 사용하지 않음
          fontSize:16,
          maxWidth:800,
        },
      };
    },  
  mounted() {
    this.setMounted();
  },

  watch: {
    targetJson(newVal, oldVal) {
        console.log("D2Marker > watch > title : ");
        console.log(` - Old : ${oldVal.styleText}`);
        console.log(` - New : ${newVal.styleText}`);
        // this.setState();
      },
  },
  methods: {
    setMounted() {
      console.log(`D2Marker > setMounted :`);
      // console.log(`D2Marker > setMounted : ${this.targetJson.text.title} / ${this.targetJson.text.descript}`);


      if(this.targetJson.target)
        this.tarObjName = this.targetJson.target;


      this.title.text = this.targetJson.text.title;
      this.descript.text = this.targetJson.text.descript;
      // if(targetJson.text.size)   this.fontSize = targetJson.text.size;
      // if(targetJson.text.size2)   this.fontSizeDescript = targetJson.text.size2;

      if(this.targetJson.align && this.targetJson.align=="left")
        this.isLeft = true;

        if(this.targetJson.margin)
        this.styleMargin = `width:${this.targetJson.margin}px;`;

        if(this.targetJson.line.color)
        this.styleLine = `background-color:${this.targetJson.line.color};`;

      if(this.targetJson.text) {
        const jText = this.targetJson.text;

        if(jText.color) this.title.color = jText.color;
        if(jText.bgColor) this.title.bgColor = jText.bgColor;
        if(jText.fontSize) this.title.fontSize = jText.fontSize;

        if(jText.color2) this.descript.color = jText.color2;
        if(jText.bgColor2) this.descript.bgColor = jText.bgColor2;
        if(jText.fontSize2) this.descript.fontSize = jText.fontSize2;

        if(jText.maxWidth) {
          this.title.maxWidth = jText.maxWidth;
          this.descript.maxWidth = jText.maxWidth;
        }

      }

      /*
      if(this.isLeft)   this.styleTitleTd = ` text-align:left;`;
      else   this.styleTitleTd = ` text-align:right;`;
      */
      if(!this.isLeft)  this.styleTitleTd = `justify-content: flex-end;`;

      this.styleTitle = "";
      if(this.tarObjName)
        this.styleTitle += ` cursor:pointer;`;

      this.styleTitle += ` color:${this.title.color};`;
      this.styleTitle += ` background-color:${this.title.bgColor};`;
      // this.styleTitle += ` opacity:${this.title.opacity};`;
      this.styleTitle += ` font-size:${this.title.fontSize}px;`;
      this.styleTitle += ` max-width:${this.title.maxWidth}px;`;


      this.styleDescript = "";
      this.styleDescript += ` color:${this.descript.color};`;
      this.styleDescript += ` background-color:${this.descript.bgColor};`;
      // this.styleDescript += ` opacity:${this.descript.opacity};`;
      this.styleDescript += ` font-size:${this.descript.fontSize}px;`;
      this.styleDescript += ` max-width:${this.descript.maxWidth}px;`;
      if(this.isLeft)   this.styleDescript += ` text-align:left;`;
      else   this.styleDescript += ` text-align:right;`;


      console.log(this.styleTitle);




      /*  
      if(this.targetJson.text.margin)
        this.styleMargin = `width:${this.targetJson.text.margin}px;`
      */


    },

    // Target Object를 Remove 처리 (객체를 제거)
    onTitleClick() {
      if(this.tarObjName) {
        this.$emit("setObjectClick", this.tarObjName);
      }
      else {
        console.log("onTitleClick Target Object Name is Empty");
      }
    },



  },
};
</script>

<style scoped>

.mark-section {
  position: fixed;
}

.mark-table {
  margin: 0px, 0px, 0px, 0px;
  border-spacing: 0px, 0px;
  padding: 0px;
}

.mark-td {
  margin: 0px, 0px, 0px, 0px;
  border-spacing: 0px, 0px;
  padding: 0px;
  display: flex;
}

.mark-point {
  /* background-color: #fff; */
  margin: 0px, 0px, 0px, 0px;
  border-spacing: 0px, 0px;
  padding: 0px;
  font-size: 50px;
  color: white;
}

.mark-Line {
  /* background-color: #fff; */
  border-spacing: 0px, 0px;
  padding: 0px;
}

.mark-title-org {
  padding: 1px 5px;
  background-color: rgba(23, 162, 184, 0.3); /* 배경색과 투명도 */
  border-radius: 5px;
  color: white;
  /* font-weight: bold; */
  text-align: right;
  font-size: 20px;
}

.mark-descript-org {
  padding: 1px 5px;
  color: white;
  /* font-weight: bold; */
  text-align: right;
  font-size: 16px;
}


.mark-title {
  position: relative;
  width:max-content;
  padding: 1px 5px;
  border-radius: 5px;
  font-weight: bold;
  /*
  color: var(--title-color);
  background-color: var(--title-bg-color);
  opacity: var(--title-opacity);
  text-align: var(--title-text-align);
  font-size: var(--title-font-size);
  ) */
}

.mark-descript {
  padding: 1px 5px;
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
