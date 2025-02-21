<template>
  <div ref="chart"></div>
</template>

<script>
// import { forEach } from "core-js/core/array";
import * as d3 from "d3";

export default {
  name: "ChartViewer",
  props: {
    /*
    objName: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    */
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 300,
    },
    actData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {

      objName: "",
      target: "",
      url: "",


      dataUrl: "",
      chartData: [],
      dataIndex: [],
      marginInt:false,
      margin: {
        top : 0,
        right : 0,
        bottom : 0,
        left : 0,
      },    // CSS Margin 순서 (상우하좌, top/right/bottom/left)
      d3Colors: [],
      intvObj : {   // interval timer를 관라할 Object
        isRun:false,
        timeloop:500, // interval timer 주기
        id:0,
        target:"",
        objName:""
      },
    };
  },
  watch: {
    actData(newVal, oldVal) {

      this.objName = newVal.name;
      this.target = newVal.target;
      this.url = newVal.url;

      let oldTarget = oldVal && oldVal.target ? oldVal.target : "";

      console.log(`ChartViewer > watch > actData :  ${oldTarget} → ${this.target}`);
      if(this.intvObj.isRun)  this.intvObj.isRun = false; 

      this.updateUserSetting();
      this.fetchChartData(this.actData);
    },
    /*
    target: {
      handler(newVal, oldVal) {
        console.log(`ChartViewer > watch > target :  ${oldVal} → ${newVal}`);
        // this.fetchChartData(newVal, this.url);
      },
      immediate: true // 컴포넌트가 처음 로드될 때도 즉시 실행
    },
    dataIdxs: {
      handler(newVal, oldVal) {
        console.log(`ChartViewer > watch > target :  ${oldVal} → ${newVal}`);
        // this.fetchChartData(this.target, this.url);
      },
      immediate: true // 컴포넌트가 처음 로드될 때도 즉시 실행
    },
    url: {
      handler(newVal, oldVal) {
        console.log(`ChartViewer > watch > url ${oldVal} → ${newVal}`);
        // this.fetchChartData(this.target, newVal);
      },
      immediate: true // 컴포넌트가 처음 로드될 때도 즉시 실행
    },
    */
  },
  mounted() {
    console.log("ChartViewer > mounted()");
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    this.$nextTick(() => {
      this.createChart();
    });
  },
  beforeUnmount() {
    console.log("ChartViewer > beforeUnmount()");
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);

    // interval이 실행 중이 경우 종료함
    if(this.intvObj.isRun)  this.intvObj.isRun = false;
    
  },  
  methods: {
    handleVisibilityChange() {

      /*/ 화면 숨김 또는 종료가 되었을 경우 (정상 동작을 하지 않아 사용 안함)
      if(document.visibilityState != 'visible') {
        this.intvObj.isRun = false;
      }
      ////////////////////////////////////////////////// */

      console.log('ChartViewer > handleVisibilityChange() visibility changed:', document.visibilityState);
    },

    // Chart를 생성하기 위한 기본 설정을 함
    createChart() {
      // console.log(`createChart() Size : ${this.width} x ${this.height}`);

      if (this.$refs.chart) {
        // this.$refs.chart.width = this.width;
        // this.$refs.chart.height = this.width;
        console.log("ChartViewer.createChart() this.$refs.chart is Exist ");
      } else {
        console.log("ChartViewer.createChart() this.$refs.chart is Empty");
      }

      // D3에서 임의 설정 된 Color를 사용
      this.d3Colors = [];
      d3.schemeCategory10.forEach((color) => {
        this.d3Colors.push(color);
      });
      // console.log("createChart() schemeCategory10 : ", d3.schemeCategory10);
      // console.log("createChart() d3Colors : ", this.d3Colors);

      /*
      const svg = d3
        .select(this.$refs.chart)
        .append("svg")
        .attr("width", 300)
        .attr("height", 200);

      svg.append("g").attr("class", "bars");

      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0,180)");

      svg
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(30,0)");

      this.updateChart();
      */


      // Create 하면서 Chart 생성을 한번 더 선택하여 줌
      this.updateUserSetting();
      this.fetchChartData(this.actData);

    },


    // 그래프 Margin에 따른 사이즈를 재조정하여 부모 Div에 적용
    updateParentDiv(margin) {
      const width = this.width + margin.left + margin.right;
      const height = this.height + margin.top + margin.bottom;

      console.log(
        `uChartViewer.pdateParentDiv() Size : ${this.width} x ${this.height} -> ${width} x ${height}`
      );
    },

    // 사용자가 설정한 Setting 값을 반영 (조회 컬럼 Index, Margin 정보, 등)
    updateUserSetting() {

      console.log(`updateUserSetting()`);

      // Data Index 정보를 초기화
      this.dataIndex = [1,2,3,4,5];
      if(this.actData.dataIndex) {
        const userData = this.actData.dataIndex;  // 사용자가 입력한 Data Index
        const userCount = userData.length;  // 사용자가 입력한 Data Index 개수
        userData.forEach((userIndex, index) => {
          if(index < userCount)
            this.dataIndex[index] = userIndex;
          else
            this.dataIndex.push(userIndex);
        });
      }

      // Margin Data를 초기화
      this.marginInt = false;
      if(this.actData.margin) {
        const userData = this.actData.margin;  // 사용자가 입력한 Margin 개수
        const userCount = userData.length;  // 사용자가 입력한 Data Index 개수

        console.log(`User Margin : ${userCount} (${userData})`)

        this.marginInt = true;
        this.margin.top = userData[0];

        // 사용자가 1 개 Data를 입력 했을 경우 (top/right/bottom/left 모두 동일 값 사용)
        if(userCount == 1) {
          this.margin.right = this.margin.top;
          this.margin.bottom = this.margin.top;
          this.margin.left = this.margin.right;
        }
        // 사용자가 2 개 Data를 입력 했을 경우 (첫번째 top/bottom, 두번째 right/left)
        else if(userCount == 2) {
          this.margin.right = userData[1];
          this.margin.bottom = this.margin.top;
          this.margin.left = this.margin.right;
        }
        // 사용자가 3 개 Data를 입력 했을 경우 (첫번째 top, 두번째 right, 3번째 left)
        else if(userCount == 3) {
          this.margin.right = userData[1];
          this.margin.bottom = this.margin.top;
          this.margin.left = userData[2];
        }
        // 사용자가 4 개 Data를 입력 했을 경우 (1:top, 2:right, 3:bottom, 4:left)
        else if(userCount >= 4) {
          this.margin.right = userData[1];
          this.margin.bottom = userData[2];
          this.margin.left = userData[3];
        }
      }

    },


    // Chart에 사용할 Data와 Chart 종류를 매칭하여 관련 함수와 연결
    fetchChartData(actData) {

      if(this.actData.target === undefined || this.actData.target === null)
      {
        return;
      }

      let target = actData.target;
      let url = actData.url;

      console.log(
        `ChartViewer.fetchChartData() ${this.width} x ${this.height} (${target} / ${url})`
      );

      d3.select(this.$refs.chart).selectAll("*").remove();

      // iot 값에 따른 참조 URL 정보
      /*
      if (url) {
        if(url.indexOf("/file") == 0) this.dataUrl = url;
        else  this.dataUrl = "/api/" + url;
      }
      else this.dataUrl = "/api/iot1";
      */

      if (url)  this.dataUrl = url;


      if (target == "") {
        console.log("ChartViewer.fetchChartData() target is empty");
      } else if (target == "BarHor") {
        this.setBarHor();
      } else if (target == "Line01") {
        this.setLine01();
      } else if (target == "LineY2") {
        this.setLineY2();
      } else if (target == "LineY2R") {
        this.setLineY2Realtime();
      } else if (target == "LineD3") {
        this.setLineCSVD3();
      } else if (target == "Line2Bar1Y2") {
        this.setLine2Bar1Y2();
      } else if (target == "Band01") {
        this.setBand01();
      } else if (target == "Gauge") {
        this.setGauge();
      } else {
        this.setDefChart();
      }

      // this.updateChart();
    },


    // 기본 Chart(Line)를 생성하여 화면에 표출
    setDefChart() {
      console.log(`setDefChart() ${this.dataUrl}`);
      console.log(` - Chart Size : ${this.width} x ${this.height}`);

      // const svg = d3.select(this.$refs.chart).select("svg");
      let margin = { top: 10, right: 10, bottom: 30, left: 30 };
      if(this.marginInt) margin = this.margin; // 사용자가 입력한 Margin 적용

      const boxWidth = this.width - margin.left - margin.right;
      const boxHeight = this.height - margin.top - margin.bottom;

      // 임시 데이타
      this.chartData = [
        { name: "M 1", value: 30 },
        { name: "M 2", value: 80 },
        { name: "M 3", value: 45 },
        { name: "M 4", value: 60 },
        { name: "M 5", value: 20 },
        { name: "M 6", value: 90 },
        { name: "M 7", value: 55 },
      ];

      const svg = d3
        .select(this.$refs.chart)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")
        .attr("viewBox", [0, 0, boxWidth, boxHeight]);
      // .attr("transform", `translate(${margin.left},${margin.top})`);

      svg.append("g").attr("class", "bars");
      // svg.append("g").attr("class", "x-axis");
      // .attr("transform", "translate(0,180)");
      // svg.append("g").attr("class", "y-axis");
      // .attr("transform", "translate(30,0)");

      const x = d3
        .scaleBand()
        .rangeRound([0, boxWidth])
        .domain(this.chartData.map((d) => d.name))
        .padding(0.1);
      const y = d3.scaleLinear().rangeRound([0, boxHeight]).domain([100, 0]);

      // X축 추가
      svg
        .append("g")
        .attr(
          "transform",
          `translate(${margin.left},${boxHeight + margin.top})`
        )
        .call(d3.axisBottom(x));

      // Y축 추가
      svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .call(d3.axisLeft(y));

      const g = svg
        .select(".bars")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const bars = g.selectAll(".bar").data(this.chartData);

      bars
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", (d) => boxHeight - y(d.value));

      bars
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", (d) => boxHeight - y(d.value));

      bars.exit().remove();
    },

    // Line 챠트를 생성하여 화면에 표출
    setLine01() {
      // this.dataUrl = "/api/iot3"; // [임시] 고정값 사용
      if(this.dataUrl == "") this.dataUrl = "/napi/iot3"; // [임시] 고정값 사용

      console.log(`setLine01() ${this.dataUrl}`);

      // 차트의 크기와 여백 설정
      let margin = { top: 10, right: 10, bottom: 30, left: 30 };
      if(this.marginInt) margin = this.margin; // 사용자가 입력한 Margin 적용

      const boxWidth = this.width - margin.left - margin.right;
      const boxHeight = this.height - margin.top - margin.bottom;

      console.log(` - Chart Size : ${this.width} x ${this.height}`);
      // console.log(` - Size (div) : ${this.$refs.chart.width} x ${this.$refs.chart.height}`);

      // URL에서 JSON 데이터 로드
      d3.json(this.dataUrl)
        .then((data) => {
          // console.log(data);

          // SVG 요소 생성
          const svg = d3
            .select(this.$refs.chart)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr("viewBox", [0, 0, boxWidth, boxHeight])
            .attr(
              "style",
              "max-width: 100%; height: auto; -webkit-tap-highlight-color: transparent;"
            )
            .attr("transform", `translate(${margin.left},${margin.top})`);

          // X 축 스케일 설정
          const x = d3
            .scaleLinear([20, 40], ["blue", "red"])
            .domain(d3.extent(data, (d) => d.x))
            .range([0, boxWidth]);

          // Y 축 스케일 설정
          const y = d3
            .scaleLinear()
            .domain([
              d3.min(data, (d) => Math.min(d.value, d.value2)),
              d3.max(data, (d) => Math.max(d.value, d.value2)),
            ])
            .range([boxHeight, 0]);

          // X 축 추가
          svg
            .append("g")
            .attr("transform", `translate(0,${boxHeight})`)
            // .tickSizeOuter(0)
            .call(
              d3
                .axisBottom(x)
                // X축 레이블에 5개당 하나 출력 (scaleLinear 일 경우)
                .ticks(5)
            );

          // Y 축 추가
          svg.append("g").call(d3.axisLeft(y));

          // 라인 제너레이터 생성
          const line = d3
            .line()
            .x((d) => x(d.x))
            .y((d) => y(d.value));

          const line2 = d3
            .line()
            .x((d) => x(d.x))
            .y((d) => y(d.value2));

          // 첫 번째 라인 추가
          svg
            .append("path")
            .datum(data)
            .attr("class", "line line1")
            .style("fill", "none")
            .style("stroke", this.d3Colors[0])
            .style("stroke-width", "2px")
            .attr("d", line); ``

          // 두 번째 라인 추가
          svg
            .append("path")
            .datum(data)
            .style("fill", "none")
            .style("stroke", this.d3Colors[1])
            .style("stroke-width", "2px")
            .attr("d", line2);

          // Add a container for each series.
        })
        .catch((error) => {
          console.error("Error loading or parsing data:", error);
        });
    },


    // Line 챠트를 CSV 기반으로 출력하고, 값은 3가지 사용
    setLineCSVD3() {
      // this.dataUrl = "/file/iot02.csv"; // [임시] 고정값 사용
      console.log(`setLineCSV() ${this.dataUrl} / ${this.dataIndex}`);

      // 차트의 크기와 여백 설정
      let margin = { top: 20, right: 10, bottom: 40, left: 10 };
      if(this.marginInt) margin = this.margin; // 사용자가 입력한 Margin 적용

      const boxWidth = this.width - margin.left - margin.right;
      const boxHeight = this.height - margin.top - margin.bottom;

      // 필요로 하는 Data 개수에 대한 Index를 조회 (부족할 경우 임의 할당)
      const dataCount = 3;
      while(this.dataIndex.length < dataCount) { this.dataIndex.push(this.dataIndex.length); }

      // console.log(` - Chart Size : ${this.width} x ${this.height}`);
      // console.log(` - Box Size : ${boxWidth} x ${boxHeight}`);
      // console.log(` - Div Size : ${this.$refs.chart.width} x ${this.$refs.chart.height}`);

      // Create SVG container
      const chart = d3.select(this.$refs.chart)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")
        .attr("viewBox", [0, 0, boxWidth, boxHeight])
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // X축 입력값 Format ("년/월/일 시간")
      const parseTime = d3.timeParse("%Y-%m-%d %H:%M");
      // X축 화면에 출력할 값 Format
      const formatTime = d3.timeFormat("%H:%M");

      // URL에서 JSON 데이터 로드
      d3.csv(this.dataUrl)
        .then((data) => {
          console.log(data);

          // data = data.slice(1); // Title 이외에 1 Line 더 제거

          // Parse time and convert numerical values
          data.forEach(d => {
              d.time = parseTime(Object.values(d)[0]);     // Parse the time from the CSV
              d.value1 = Object.values(d)[this.dataIndex[0]]; // 사용자가 입력한 Index 사용
              d.value2 = Object.values(d)[this.dataIndex[1]]; // 사용자가 입력한 Index 사용
              d.value3 = Object.values(d)[this.dataIndex[2]]; // 사용자가 입력한 Index 사용
          });


          /*
          // SVG 요소 생성
          const svg = d3
            .select(this.$refs.chart)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr("viewBox", [0, 0, boxWidth, boxHeight])
            .attr(
              "style",
              "max-width: 100%; height: auto; -webkit-tap-highlight-color: transparent;"
            )
            .attr("transform", `translate(${margin.left},${margin.top})`);
          */

          // X 축 스케일 설정
          const x = d3.scaleTime()
              .domain(d3.extent(data, d => d.time)) // X scale based on time
              .range([0, boxWidth]);
          let start = Math.floor(d3.min(data, (d) => Math.min(d.value1,d.value2,d.value3)));
          let end = Math.ceil(d3.max(data, (d) => Math.max(d.value1,d.value2,d.value3)));
          if(start == end) {
            start -= 1;
            end += 1;
          }


          // Y 축 스케일 설정
          const y0 = d3
            .scaleLinear()
            .domain([start,end])
            .range([boxHeight, 0]);

          // X축 추가
          const xAxis = d3.axisBottom(x)
              .ticks(12)   // 화면에 12개만 출력
              .tickFormat(formatTime); // Use only the time (hours and minutes)
          chart
            .append("g")
            .attr("transform", `translate(0,${boxHeight})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .style("font-size", "12px")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");


          // Y축
          chart
            .append("g")
            .call(d3.axisLeft(y0))
            .append("text")
            .attr("fill", this.d3Colors[0])
            .attr("x", -margin.left)
            .attr("y", -11)
            .attr("text-anchor", "start")
            .style("font-size", "12px");
          //  .text("온도 (˚C)");

          // Line 차트 Y0 (온도)
          const line1 = d3
            .line()
            .x((d) => x(d.time))
            .y((d) => y0(d.value1));
          chart
            .append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line1)
            .style("fill", "none")
            .style("stroke", this.d3Colors[0])
            .style("stroke-width", "2px");

          // Line 차트 (temperB)
          const line2 = d3
            .line()
            .x((d) => x(d.time))
            .y((d) => y0(d.value2));
          chart
            .append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line2)
            .style("fill", "none")
            .style("stroke", this.d3Colors[1])
            .style("stroke-width", "2px");

          // Line 차트 (temperB)
          const line3 = d3
            .line()
            .x((d) => x(d.time))
            .y((d) => y0(d.value3));
          chart
            .append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line3)
            .style("fill", "none")
            .style("stroke", this.d3Colors[2])
            .style("stroke-width", "2px");

          /*/ Title 추가 (사용하지 않음)
          chart.append("text")
            .attr("x", (this.width / 2))
            .attr("y", 5)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("stroke", "white")
            .text("Line Chart with Legend");
          ///////////////////////////////////////////// */


          // 범례(Legend)정보가 존재 할 경우 (범례를 추가 함)
          if(this.actData.regend && this.actData.regend.length == dataCount) {

            // 범례(Legend) 관련 사이즈 정보
            const legPos = {
              boxMX : 10,  // 범례 전체적의 위치 Margin X
              boxMY : 6,  // 범례 전체적의 위치 Margin Y
              rect : 14,  // Line 색상에 대한 Box Size
              textMX : 5,  // 각 Domain에 대한 Text 위치 Margin X 
              textMY : 7  // 각 Domain에 대한 Text 위치 Margin Y
            };

            const legInfo = d3
              .scaleOrdinal()
              .domain(this.actData.regend)
              .range(this.d3Colors);

            const legend = chart.selectAll(".legend")
                .data(legInfo.domain())
              // .data(["Column 2", "Column 4", "Column 5"])
                .enter()
                .append("g")
                .attr("class", "legend")
                .attr("transform", (d, i) => `translate(${(i * boxWidth) / dataCount + legPos.boxMX}, ${-margin.top + legPos.boxMY})`); // Adjust position

            legend.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", legPos.rect)
                .attr("height", legPos.rect)
              //  .style("fill", (d, i) => this.deColors[i]);
                .style("fill", legInfo);

            legend.append("text")
                .attr("x", legPos.rect + legPos.textMX)
                .attr("y", legPos.textMY)
                .attr("dy", ".35em")
                .style("font-size", "12px")
                .style("fill", "#ffffff")
                .style("text-anchor", "start")
                .text((d) => d);
          }
          else if( this.actData.regend && this.actData.regend.length != dataCount) {
            console.log(`Legend Data mismatch size : count(${dataCount}) ≠ length(${this.actData.dataRegend.length})`);
          }



        })
        .catch((error) => {
          console.error("Error loading or parsing data:", error);
        });
    },




    // Line 챠트에 Y축을 좌/우 2가지를 사용
    setLineY2() {
      // this.dataUrl = "/file/iot01.csv"; // [임시] 고정값 사용
      console.log(`setLineY2() ${this.dataUrl} / ${this.dataIndex}`);

      // 차트의 크기와 여백 설정
      let margin = { top: 25, right: 30, bottom: 40, left: 30 };
      if(this.marginInt) {
        console.log(`setLineY2() margin 수정 전 ${margin}`);
        margin = this.margin; // 사용자가 입력한 Margin 적용
        console.log(`setLineY2() margin 수정 후 ${margin}`);
      }
      

      const boxWidth = this.width - margin.left - margin.right;
      const boxHeight = this.height - margin.top - margin.bottom;

      // 필요로 하는 Data 개수에 대한 Index를 조회 (부족할 경우 임의 할당)
      const dataCount = 2;
      while(this.dataIndex.length < dataCount) { this.dataIndex.push(this.dataIndex.length); }


      // console.log(` - Chart Size : ${this.width} x ${this.height}`);
      // console.log(` - Box Size : ${boxWidth} x ${boxHeight}`);
      // console.log(` - Div Size : ${this.$refs.chart.width} x ${this.$refs.chart.height}`);

      // Create SVG container
      const chart = d3.select(this.$refs.chart)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")
        .attr("viewBox", [0, 0, boxWidth, boxHeight])
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // X축 입력값 Format ("년/월/일 시간")
      const parseTime = d3.timeParse("%Y-%m-%d %H:%M");

      // X축 화면에 출력할 값 Format
      const formatTime = d3.timeFormat("%H:%M");

      // URL에서 JSON 데이터 로드
      d3.csv(this.dataUrl)
        .then((data) => {
          console.log(data);

          data = data.slice(1); // Title에 추가 1Line 더 제거 (Title이 2Line으로 구성되어 있음)

          // Parse time and convert numerical values
          data.forEach(d => {
              d.time = parseTime(Object.values(d)[0]);     // Parse the time from the CSV
              d.value1 = Object.values(d)[this.dataIndex[0]];
              d.value2 = Object.values(d)[this.dataIndex[1]]; // 사용자가 입력한 Index 사용
          });

          /*
          // SVG 요소 생성
          const svg = d3
            .select(this.$refs.chart)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr("viewBox", [0, 0, boxWidth, boxHeight])
            .attr(
              "style",
              "max-width: 100%; height: auto; -webkit-tap-highlight-color: transparent;"
            )
            .attr("transform", `translate(${margin.left},${margin.top})`);
          */

          // X 축 스케일 설정
          const x = d3.scaleTime()
              .domain(d3.extent(data, d => d.time)) // X scale based on time
              .range([0, boxWidth]);

          // Y 축 스케일 설정
          const y0 = d3
            .scaleLinear()
            .domain([Math.floor(d3.min(data, (d) => d.value1)), Math.ceil(d3.max(data, (d) => d.value1))])
            .range([boxHeight, 0]);

          const y1 = d3
            .scaleLinear()
            .domain([Math.floor(d3.min(data, (d) => d.value2)), Math.ceil(d3.max(data, (d) => d.value2))])
            .range([boxHeight, 0]);

          // X축 추가
          const xAxis = d3.axisBottom(x)
              .ticks(17)   // 6개당 한번 출력
              .tickFormat(formatTime); // Use only the time (hours and minutes)
          chart
            .append("g")
            .attr("transform", `translate(0,${boxHeight})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .style("font-size", "12px")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");


          // Y축 (왼쪽, 온도)
          chart
            .append("g")
            .call(d3.axisLeft(y0))
            .append("text")
            .attr("fill", this.d3Colors[0])
            .attr("x", -margin.left)
            .attr("y", -11)
            .attr("text-anchor", "start")
            .style("font-size", "12px")
            .text("온도 (˚C)");

          // Y축 (오른쪽, 습도)
          chart
            .append("g")
            .attr("transform", `translate(${boxWidth},0)`)
            .call(d3.axisRight(y1))
            .append("text")
            .attr("fill", this.d3Colors[1])
            .attr("x", margin.right)
            .attr("y", -11)
            .attr("text-anchor", "end")
            .style("font-size", "12px")
            .text("습도 (%)");

          // Line 차트 Y0 (온도)
          const line1 = d3
            .line()
            .x((d) => x(d.time))
            .y((d) => y0(d.value1));

          chart
            .append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line1)
            .style("fill", "none")
            .style("stroke", this.d3Colors[0])
            .style("stroke-width", "2px");

          // Line 차트 (temperB)
          const line2 = d3
            .line()
            .x((d) => x(d.time))
            .y((d) => y1(d.value2));

          chart
            .append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line2)
            .style("fill", "none")
            .style("stroke", this.d3Colors[1])
            .style("stroke-width", "2px");
            

        })
        .catch((error) => {
          console.error("Error loading or parsing data:", error);
        });
    },


    // Line 챠트에 Y축을 좌/우 2가지를 사용
    // 기본 10~20 개 정도만 보여 주고, Inter발을 사용하여 Data가 흘러 가게끔 처리
    setLineY2Realtime() {
      // this.dataUrl = "/file/iot01.csv"; // [임시] 고정값 사용
      console.log(`setLineY2Realtime() ${this.dataUrl} / ${this.dataIndex}`);

      // 차트의 크기와 여백 설정
      let margin = { top: 25, right: 30, bottom: 40, left: 30 };
      if(this.marginInt) margin = this.margin;  // 사용자가 입력한 Margin 적용
     
      // Only Graph만 표출 될 영역을 재 계산
      const boxWidth = this.width - margin.left - margin.right;
      const boxHeight = this.height - margin.top - margin.bottom;

      // 필요로 하는 Data 개수에 대한 Index를 조회 (부족할 경우 임의 할당)
      const dataCount = 2;
      while(this.dataIndex.length < dataCount) this.dataIndex.push(this.dataIndex.length);

      const displayCount = 50;  // 화면에 출력할 자료 수

      // console.log(` - Chart Size : ${this.width} x ${this.height}`);
      // console.log(` - Box Size : ${boxWidth} x ${boxHeight}`);
      // console.log(` - Div Size : ${this.$refs.chart.width} x ${this.$refs.chart.height}`);

      // Create SVG container
      const chart = d3.select(this.$refs.chart)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")
        .attr("viewBox", [0, 0, boxWidth, boxHeight])
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // X축 입력값 Format ("년/월/일 시간")
      const parseTime = d3.timeParse("%Y-%m-%d %H:%M");

      // X축 화면에 출력할 값 Format
      const formatTime = d3.timeFormat("%H:%M");

      // URL에서 JSON 데이터 로드
      d3.csv(this.dataUrl)
        .then((data) => {
          // console.log(data);

          // data = data.slice(1); // Title에 추가 1Line 더 제거 (Title이 2Line으로 구성되어 있음)

          // Parse time and convert numerical values
          data.forEach(d => {
              d.time = parseTime(Object.values(d)[0]);     // Parse the time from the CSV
              d.value1 = Object.values(d)[this.dataIndex[0]];
              d.value2 = Object.values(d)[this.dataIndex[1]]; // 사용자가 입력한 Index 사용
          });

          let startIdx = 0;
          let totalCount = data.length;
          let dispData = data.slice(startIdx, (startIdx+displayCount));

          console.log(`setLineY2Realtime() totalCount : ${totalCount}`);

          // X 축 스케일 설정
          const x = d3.scaleTime()
              // .domain(d3.extent(dispData, d => d.time)) // X scale based on time
              .range([0, boxWidth]);

          // Y 축 스케일 설정
          const y0 = d3
            .scaleLinear()
            // .domain([Math.floor(d3.min(data, (d) => d.value1)), Math.ceil(d3.max(data, (d) => d.value1))])
            .domain([22.5, 33.5])
            .range([boxHeight, 0]);

          const y1 = d3
            .scaleLinear()
            // .domain([Math.floor(d3.min(data, (d) => d.value2)), Math.ceil(d3.max(data, (d) => d.value2))])
            .domain([35,55])
            .range([boxHeight, 0]);

          // X축 추가
          const xAxis = d3.axisBottom(x)
              .ticks(5)
              .tickFormat(formatTime); // Use only the time (hours and minutes)
          chart
            .append("g")
            .attr("transform", `translate(0,${boxHeight})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .style("font-size", "12px")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

          // Y축 (왼쪽, 온도)
          chart
            .append("g")
            .call(d3.axisLeft(y0))
            .append("text")
            .attr("fill", this.d3Colors[0])
            .attr("x", -margin.left)
            .attr("y", -11)
            .attr("text-anchor", "start")
            .style("font-size", "12px")
            .text("온도 (˚C)");

          // Y축 (오른쪽, 습도)
          chart
            .append("g")
            .attr("transform", `translate(${boxWidth},0)`)
            .call(d3.axisRight(y1))
            .append("text")
            .attr("fill", this.d3Colors[1])
            .attr("x", margin.right)
            .attr("y", -11)
            .attr("text-anchor", "end")
            .style("font-size", "12px")
            .text("습도 (%)");

          this.updateLineY2Realtime(chart, dispData, x, y0, y1);            

          /*
          // Line 차트 Y0 (온도)
          const line1 = d3
            .line()
            .x((d) => x(d.time))
            .y((d) => y0(d.value1));

          chart
            .append("path")
            .datum(dispData)
            .attr("class", "line")
            .attr("d", line1)
            .style("fill", "none")
            .style("stroke", this.d3Colors[0])
            .style("stroke-width", "2px");

          // Line 차트 (temperB)
          const line2 = d3
            .line()
            .x((d) => x(d.time))
            .y((d) => y1(d.value2));

          chart
            .append("path")
            .datum(dispData)
            .attr("class", "line")
            .attr("d", line2)
            .style("fill", "none")
            .style("stroke", this.d3Colors[1])
            .style("stroke-width", "2px");
          */

          // this.updateLineY2Realtime(chart, dispData, x, y0, y1);

          // interval 종료를 위해서 시작한 ojbName과 target을 보관
          this.intvObj.objName = this.objName;
          this.intvObj.target = this.target;
          this.intvObj.isRun = true;
          
          this.intvObj.id = setInterval(() => {
            console.log(`ChartViewer setInterval(${startIdx}) : ${this.objName} / ${this.target}`);
            // console.log(`ChartViewer setInterval()2 :  ${this.isVisible}`);   // undifined

            startIdx++;
            // 마지막 데이터까지 도달하였을 경우
            if(startIdx+displayCount >= totalCount)   this.intvObj.isRun = false;
            /* / objName 또는 target이 변경 되었을 경우 (watch에서 감지 중이므로 사용하지 않음)
            else if(this.intvObj.objName != this.objName
              || this.intvObj.target != this.target)   this.intvObj.isRun;
            ///////////////////////////////////////////// */

            if(this.intvObj.isRun) {
              dispData = data.slice(startIdx, (startIdx+displayCount));
              this.updateLineY2Realtime(chart, dispData, x, y0, y1);
            }
            else {
              this.clearLineY2Realtime();
            }
          }, this.intvObj.timeloop);

        })
        .catch((error) => {
          console.error("Error loading or parsing data:", error);
        });
    },
  
    // Chart 그래프롤 실시간으로 Update 함 (축 내용은 유지하고, Graph만 변경)
    updateLineY2Realtime(chart, dispData, x, y0, y1) {

      // console.log(dispData);

      // 이전에 그려진 그래프가 있을 경우 화면에서 지움
      chart.selectAll(".line").remove();

      // x.domain([0, d3.max(dispData, d => d.index)]);
      x.domain(d3.extent(dispData, d => d.time));

      // Line 차트 Y0 (온도)
      const line1 = d3
        .line()
        .x((d) => x(d.time))
        .y((d) => y0(d.value1));

      chart
        .append("path")
        .datum(dispData)
        .attr("class", "line")
        .attr("d", line1)
        .style("fill", "none")
        .style("stroke", this.d3Colors[0])
        .style("stroke-width", "2px");

      // Line 차트 Y1(습도)
      const line2 = d3
        .line()
        .x((d) => x(d.time))
        .y((d) => y1(d.value2));

      chart
        .append("path")
        .datum(dispData)
        .attr("class", "line")
        .attr("d", line2)
        .style("fill", "none")
        .style("stroke", this.d3Colors[1])
        .style("stroke-width", "2px");

        // chart.call(xAxis);
        // chart.call(d3.axisLeft(y0));
        // chart.call(d3.axisRight(y1));

    },

    // 실시간 Update 챠트를 종료
    clearLineY2Realtime() {

      console.log(`ChartViewer > clearLineY2Realtime() : ${this.intvObj.isRun} / ${this.intvObj.id}`);
      
      clearInterval(this.intvObj.id);
      this.intvObj.isRun = false;

    },



    // 게이지 챠트를 보여 줌
    setGauge() {

      console.log(`setGauge() ${this.dataUrl}`);

      let margin = { top: 20, right: 5, bottom: 20, left: 5 };
      if(this.marginInt) margin = this.margin; // 사용자가 입력한 Margin 적용
      margin.gauge = 0.02;

      const radius =
        Math.min(this.width, this.height) / 2 -
        Math.max(margin.top, margin.right, margin.bottom, margin.left);


      // 예제: 데이터 형식이 { "value": 75, "min": 0, "max": 100 }
      const value = 80;
      const minValue = 0;
      const maxValue = 100;

      // 게이지 색상 설정
      const gaugeColors = [
        { threshold: 0.4, color: "#00ff00" }, // 녹색
        { threshold: 0.8, color: "#ffff00" }, // 노란색
        { threshold: 1.0, color: "#ff0000" }, // 빨간색
      ];

      // JSON 데이터 로드
      d3.json(this.dataUrl)
        .then((data) => {

          if(data !== undefined) {
            if(data.length > 0) {
              console.log(`setGauge() Data Length " ${data.length}`);
            }
          }
        

          const svg = d3
            .select(this.$refs.chart)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr(
              "transform",
              `translate(${this.width / 2}, ${this.height / 2})`
            );

          // 배경 아크를 생성
          let startAngle = -Math.PI / 2;
          for (let i = 0; i < gaugeColors.length; i++) {
            let endAngle = -Math.PI / 2 + Math.PI * gaugeColors[i].threshold;
            if (i + 1 < gaugeColors.length) endAngle -= margin.gauge;

            // console.log(startAngle + " ~ " + endAngle);
            let bgArc = d3
              .arc()
              .innerRadius(radius * 0.8) // 게이지 두께 (작을 수록 두꺼워 짐, 게이지가 아닌 영역의 비율)
              .outerRadius(radius)
              .startAngle(startAngle)
              .endAngle(endAngle);

            svg
              .append("path")
              .datum({
                endAngle: endAngle,
              })
              .attr("d", bgArc)
              .style("fill", gaugeColors[i].color);

            // 다음단계 아크의 시작점 지정 (이전단계 종료지점 + 마진)
            startAngle = endAngle + 2 * margin.gauge;
          }

          const gaugeColor = gaugeColors.find(
            (d) => (value - minValue) / (maxValue - minValue) <= d.threshold
          ).color;

          // 게이지 바늘
          const needle = svg.append("g").attr("class", "needle");

          needle
            .append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", -radius * 0.7)
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr(
              "transform",
              `rotate(${
                (180 * (value - minValue)) / (maxValue - minValue) - 90
              })`
            );

          // 중심점
          needle
            .append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 8)
            .attr("fill", "black");

          // 텍스트 레이블
          svg
            .append("text")
            .attr("x", 0)
            .attr("y", radius * 0.9)
            .attr("text-anchor", "middle")
            .style("fill", gaugeColor) // Text의 색상 (값에 따라 가변)
            .style("font-size", "90px")
            .style("font-family", "Arial") // 폰트 설정
            .style("font-weight", "bold") // 폰트 굵기 설정
            .text(`${value}`);
        })
        .catch((error) => {
          console.error("Error loading or parsing data:", error);
        });
      // return <svg ref={svgRef}></svg>;
    },

    // Bind Chart를 보여 줌
    // 변수명 : [ X축  : x ], [ Y축  : low, high ]
    // y축 레이블이 표시 되지 않음 해결 필요
    setBand01() {

      if(this.dataUrl == "") this.dataUrl = "/napi/iot5"; // [임시] 고정값 사용

      console.log(`setBand01() ${this.dataUrl}`);


      let margin = { top: 25, right: 10, bottom: 30, left: 30 };
      if(this.marginInt) margin = this.margin; // 사용자가 입력한 Margin 적용
      
      const boxWidth = this.width - margin.left - margin.right;
      const boxHeight = this.height - margin.top - margin.bottom;

      // console.log(` - Chart Size : ${this.width} x ${this.height}`);
      // console.log(` - Box Size : ${boxWidth} x ${boxHeight}`);
      // console.log(` - Div Size : ${this.$refs.chart.width} x ${this.$refs.chart.height}`);
     

      // JSON 데이터 로드
      d3.json(this.dataUrl)
        .then((data) => {
          console.log(data);

          const svg = d3
            .select(this.$refs.chart)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr("viewBox", [0, 0, boxWidth, boxHeight])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
            .attr("transform", `translate(${margin.left},${margin.top})`);

          // X 축 스케일 설정
          const x = d3
            // .scaleUtc()
            .scaleBand()
            .domain(data.map((d) => d.x))
            .range([0, boxWidth])
            .padding(0.1);

          // X 축 스케일 설정
          const y = d3
            .scaleLinear()
            .domain([d3.min(data, (d) => d.low), d3.max(data, (d) => d.high)])
            // .nice()
            .range([boxHeight, 0]);

          // X축 추가
          const xAxis = d3.axisBottom(x)
              // .tickValues(x.domain().filter((d, i) => i % 5 === 4));  // X축 레이블에 5개당 하나 출력
              .tickValues(x.domain().filter((d, i) => i % 5 === 4));  // X축 레이블에 5개당 하나 출력

          svg
            .append("g")
            .attr("transform", `translate(0,${boxHeight})`)
            .call(xAxis);

          // Y 축 추가
          const yAxis = d3.axisLeft(y)
            .ticks(5);  // 5개 데이타만 출력
          svg.append("g").call(yAxis);

          /*
          // X축 라벨
          svg
            .append("text")
            .attr("class", "x axis-label")
            .attr("text-anchor", "middle")
            .attr("x", this.width / 2)
            .attr("y", this.height + margin.bottom - 10)
            .text("Date");

          // Y축 라벨
          svg
            .append("text")
            .attr("class", "y axis-label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("x", -this.height / 2)
            .attr("y", -margin.left + 20)
            .text("Temperature (F)");
          */

          // 밴드 그리기
          svg
            .selectAll(".band")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "band")
            .attr("x", (d) => x(d.x))
            .attr("y", (d) => y(d.high))
            .attr("width", x.bandwidth())
            .attr("height", (d) => y(d.low) - y(d.high))
            .attr("fill", "orange");
            // .attr("opacity", 0.6);
            
        })
        .catch((error) => {
          console.error("Error loading or parsing data:", error);
        });
      // return <svg ref={svgRef}></svg>;
    },

    /* 가로 방향으로 Bar Chart을 보여 준다.

    /////////////////////////////////////////////////// */

    setBarHor() {

      // this.dataUrl = "/api/iot4";
      if(this.dataUrl == "") this.dataUrl = "/napi/iot4"; // [임시] 고정값 사용
      console.log(`setBarHor() ${this.dataUrl}`);

      // this.width = 800;
      // this.height = 600;

      // 차트의 크기와 여백 설정
      let margin = { top: 20, right: 10, bottom: 30, left: 58 };
      if(this.marginInt) margin = this.margin; // 사용자가 입력한 Margin 적용

      const boxWidth = this.width - margin.left - margin.right;
      const boxHeight = this.height - margin.top - margin.bottom;

      // console.log(` - Chart Size : ${this.width} x ${this.height}`);
      // console.log(` - Box Size : ${boxWidth} x ${boxHeight}`);
      // console.log(` - Div Size : ${this.$refs.chart.width} x ${this.$refs.chart.height}`);

      // URL에서 JSON 데이터 로드
      d3.json(this.dataUrl)
        .then((data) => {
          console.log(data);

          const svg = d3
            .select(this.$refs.chart)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr("viewBox", [0, 0, boxWidth, boxHeight])
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

          const x = d3.scaleLinear().domain([0, 100]).range([0, boxWidth]);

          const y0 = d3
            .scaleBand()
            .domain(data.map((d) => d.category))
            .range([0, boxHeight])
            .padding(0.1);

          const y1 = d3
            .scaleBand()
            .domain(data[0].items.map((item) => item.name))
            .range([0, y0.bandwidth()])
            .padding(0.2);

          const color = d3
            .scaleOrdinal()
            .domain(data[0].items.map((item) => item.name))
            .range(d3.schemeCategory10);

          svg
            .append("g")
            .attr("transform", `translate(0,${boxHeight})`)
            .call(
              d3
                .axisBottom(x)
                .ticks(5)
                .tickFormat((d) => `${d}%`)
            )
            .selectAll("text")
            .attr("class", "axis-label");

          svg
            .append("g")
            .call(d3.axisLeft(y0))
            .selectAll("text")
            .attr("class", "axis-label");

          const category = svg
            .selectAll(".category")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "category")
            .attr("transform", (d) => `translate(0,${y0(d.category)})`);

          category
            .selectAll(".bar")
            .data((d) => d.items)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("y", (d) => y1(d.name))
            .attr("height", y1.bandwidth())
            .attr("x", 0)
            .attr("width", (d) => x(d.value))
            .attr("fill", (d) => color(d.name));

          // 범례에 대한 Label
          category
            .selectAll(".label")
            .data((d) => d.items)
            .enter()
            .append("text")
            // .attr("class", "label")
            .style("font-size", "10px")
            .style("fill", "#ffffff")
            .attr("x", (d) => x(d.value) + 3)
            .attr("y", (d) => y1(d.name) + y1.bandwidth() / 2)
            .attr("dy", ".35em")
            .text((d) => d.value);

          const legend = svg
            .selectAll(".legend")
            .data(color.domain())
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr(
              "transform",
              (d, i) => `translate(${(i * boxWidth) / 4}, ${-margin.top + 8})`
            );

          legend
            .append("rect")
            .attr("x", 0)
            .attr("y", -5)
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", color);

          // 각 Bar에 대한 Text 정보
          legend
            .append("text")
            .attr("x", 16)
            .attr("y", 0)
            .attr("dy", ".35em")
            .style("font-size", "10px")
            .style("fill", "#ffffff")
            .style("text-anchor", "start")
            .text((d) => d);
        })
        .catch((error) => {
          console.error("Error loading or parsing data:", error);
        });
    },

    // Line 2개와 Bar 1개의 챠트를 보여 줌
    // Y축을 왼쪽과 오른쪽 2개 사용
    setLine2Bar1Y2() {
      // this.dataUrl = "/api/iot1";
      if(this.dataUrl == "") this.dataUrl = "/napi/iot1"; // [임시] 고정값 사용
      console.log(`setLine2Bar1Y2() ${this.dataUrl}`);

      // 차트의 크기와 여백 설정
      let margin = { top: 20, right: 20, bottom: 30, left: 20 };
      if(this.marginInt) margin = this.margin; // 사용자가 입력한 Margin 적용
      
      // const width = this.width + margin.left + margin.right;
      // const height = this.height + margin.top + margin.bottom;
      const boxWidth = this.width - margin.left - margin.right;
      const boxHeight = this.height - margin.top - margin.bottom;

      // this.width = width;
      // this.height = height;

      console.log(` - Chart Size : ${this.width} x ${this.height}`);
      console.log(` - Box Size : ${boxWidth} x ${boxHeight}`);
      // console.log(` - Div Size : ${this.$refs.chart.width} x ${this.$refs.chart.height}`);

      // URL에서 JSON 데이터 로드
      d3.json(this.dataUrl)
        .then((data) => {
          console.log(data);

          const chart = d3
            .select(this.$refs.chart)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr("viewBox", [0, 0, boxWidth, boxHeight])
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

          // X축, Y축 범위 설정
          const x = d3
            .scaleBand()
            .domain(data.map((d) => d.time))
            .range([0, boxWidth])
            .padding(0.1);

          const y0 = d3
            .scaleLinear()
            .domain([15, d3.max(data, (d) => Math.max(d.temperA, d.temperB))])
            .range([boxHeight, 0]);

          const y1 = d3
            .scaleLinear()
            .domain([50, d3.max(data, (d) => d.humiA)])
            .range([boxHeight, 0]);

          // X축
          chart
            .append("g")
            .attr("transform", `translate(0,${boxHeight})`)
            .call(d3.axisBottom(x)
                  .tickValues(d3.range(0,d3.max(data, (d) => Math.max(d.time))+1,2)) // X축 레이블에 5개당 하나 출력 (scaleLinear 일 경우)
                  )
            .selectAll("text")
            .style("text-anchor", "end")
            .style("font-size", "12px")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

          // Y축 (왼쪽, temperA과 temperB)
          chart
            .append("g")
            .call(d3.axisLeft(y0))
            .append("text")
            .attr("fill", "steelblue")
            .attr("x", -margin.left)
            .attr("y", -10)
            .attr("text-anchor", "start")
            .style("font-size", "12px")
            .text("온도 (˚C)");

          // Y축 (오른쪽, humiA)
          chart
            .append("g")
            .attr("transform", `translate(${boxWidth},0)`)
            .call(d3.axisRight(y1))
            .append("text")
            .attr("fill", "red")
            .attr("x", margin.right)
            .attr("y", -10)
            .attr("text-anchor", "end")
            .style("font-size", "12px")
            .text("습도 (%)");

          // Bar 차트를 먼저 출력 (humiA)
          // Bar를 나중에 출력 시 Line 챠트가 안 보일 수 있음
          chart
            .selectAll(".bar.humiA")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar humiA")
            .attr("x", (d) => x(d.time))
            .attr("y", (d) => y1(d.humiA))
            .attr("width", x.bandwidth())
            .attr("height", (d) => boxHeight - y1(d.humiA))
            .style("fill", "orange");

          // Line 차트 (temperA)
          const line1 = d3
            .line()
            .x((d) => x(d.time) + x.bandwidth())
            .y((d) => y0(d.temperA));

          chart
            .append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line1)
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", "2px");

          // Line 차트 (temperB)
          const line2 = d3
            .line()
            .x((d) => x(d.time) + x.bandwidth())
            .y((d) => y0(d.temperB));

          chart
            .append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line2)
            .style("fill", "none")
            .style("stroke", "lightblue")
            .style("stroke-width", "2px");
        })
        .catch((error) => {
          console.error("Error loading or parsing data:", error);
        });

      // return <svg ref={svgRef}></svg>;
    },


    /* ///////////////////////////////////////////
    // File Type에 따라 Data를 Read 
    setChart() {
      
      let fileType = "json";
      let fileUrl = "json";

      if(this.actData.fileType) fileType = this.actData.fileType;
      if(this.actData.url) fileUrl = this.actData.url;

      if(fileType == "json") {

        d3.json(fileUrl)
          .then((data) => {
            this.drawChart(data);
          })
          .catch((error) => {
            console.error("Error JSON data:", error);
          });

      }
      else if(fileType == "csv") {

        d3.csv(fileUrl)
          .then((data) => {
            this.drawChart(data);
          })
          .catch((error) => {
            console.error("Error CSV data:", error);
          });

      }
      else {
        console.log(`setChart() Unknown fileType [${fileType}]`);
      }


    },


    // 입력된 Data를 기반으로 Chart를 생성
    drawChart(data) {

      let chartType = "line";
      let fileUrl = "";

      if(this.actData.chartType) chartType = this.actData.chartType;
      if(this.actData.url) fileUrl = this.actData.url;

      if(fileUrl == "") {
        console.log(`drawChart() fileUrl is Empty`);
        return;
      }

      if(chartType == "line") {
        this.drawLine(data);
      }
      else {
        console.log(`drawChart() Unknown chartType [${chartType}]`);
      }


    },


    // 입력된 Data를 기반으로 Chart를 생성
    drawLine(data) {
      
      // 차트의 크기와 여백 설정
      let margin = { top: 20, right: 10, bottom: 40, left: 10 };
      if(this.marginInt) margin = this.margin; // 사용자가 입력한 Margin 적용

      const boxWidth = this.width - margin.left - margin.right;
      const boxHeight = this.height - margin.top - margin.bottom;

      // dataIndex가 존재하지 않을 경우 임의로 값을 입력
      if(!this.dataIndex) this.dataIndex.push(1);


      // 챠트 Container를 생성
      const svg = d3.select(this.$refs.chart)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")
        .attr("viewBox", [0, 0, boxWidth, boxHeight])
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);      

      
      data.forEach(d => {
        d.so = parseTime(Object.values(d)[0]);
        this.dataIndex.forEach((dIdx,index) => {
          d.vo[index] = Object.values(d)[dIdx];
        })
      });


    },
    */







  },
};
</script>

<style scoped>
.chart {
  position: relative;
  color: #8c8c8c;
}

.bar {
  fill: steelblue;
}

.bar:hover {
  fill: orange;
}

/* 차트 스타일 */
.line {
  fill: none;
  stroke-width: 1px;
}
.line1 {
  stroke: steelblue;
}
.line2 {
  stroke: tomato;
}

.axis-label {
  font-family: "맑은 고딕", sans-serif; /* 맑은 고딕 폰트 설정 */
  font-size: 10px;
}

.legend text {
  font-size: 10px;
  font-family: sans-serif;
  color: red;
}

.legend rect {
  stroke-width: 2;
  stroke: white;
}

.category {
  font-family: "맑은 고딕", sans-serif; /* 맑은 고딕 폰트 설정 */
  font-size: 6px;
  color: #8c8c8c;
}
</style>
