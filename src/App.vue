<template>
  <div>

    <!-- 브라우저 화면을 100% 사용할 사용할 경우-->
    <div v-if="showFullScreen" id="app"
      :style="{ height: '100vh' }">
      <router-view />
    </div>

    <!-- 화면의 일부로 들어갈 경우 -->
    <div v-else>
      <table class="app-table">
        <tbody>
          <tr height="8%">
            <td rowspan="3" width="2%"></td>
            <td width="80%">3D Conv Viewer</td>
            <td rowspan="3" width="2%"></td>
          </tr>  
          <tr height="90%">
            <td class="app-td">
              <div id="app"
                :style="{
                  height: `${showHeight}px`,
                }">
                <router-view />
              </div>
            </td>
          </tr>
          <tr height="2%"><td>3D Conv Bottom</td></tr>
        </tbody>
      </table>
    </div>


    <!-- div class="control-jumbotron">
      <b-jumbotron
        header="BootstrapVue"
        lead="Bootstrap v4 Components for Vue.js 2"
      >
        <p>For more information visit website</p>
        <b-button variant="primary" href="#">More Info</b-button>
      </b-jumbotron>

      <b-container>
        <b-row>
          <b-col>
            <h1 class="text-center">Hello, BootstrapVueNext!</h1>
            <b-button variant="primary">Primary Button</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div -->

    <!-- nav class="nav-controls">
      <ul>
        <li><button @click="goLink('Home')">Home</button></li>
        <li><button @click="goLink('S01')">CX아레나</button></li>
        <li><button @click="goLink('S02')">서버실</button></li>
        <li><button @click="goLink('S03')">서버랙</button></li>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/S01">CX아레나</router-link></li>
        <li><router-link to="/S02">서버실</router-link></li>
        <li><router-link to="/S02">서버실</router-link></li>
      </ul>
    </nav -->
    <!-- router-view / -->

    <!-- div class="controls">
      <button @click="goLink('Home')">Home</button>
      <button @click="goLink('S01')">CX아레나</button>
      <button @click="goLink('S02')">서버실</button>
      <button @click="goLink('S03')">서버랙</button>
      <br /><br / -->
    <!-- router-link :to="{ name: 'Home' }">Home</router-link><br /><br />
      <router-link :to="{ name: 'Viewer', params: { modelId: 'S01' } }"
        >CXArena</router-link
      ><br /><br />
      <router-link :to="{ name: 'Viewer', params: { modelId: 'S02' } }"
        >DCenter</router-link
      ><br /><br />
      <router-link :to="{ name: 'Viewer', params: { modelId: 'S03' } }"
        >SRack</router-link
      ><br /><br / -->
    <!-- button @click="updateWireFrame">WF</button><br /><br />
      <button @click="updateGrid">Grid</button><br /><br />
      <button @click="restoreObjects">복원</button -->
    <!-- /div -->

    <!-- GLTFViewer ref="gltfViewer" @object-selected="onObjectSelected" / -->
  </div>
</template>

<script>
// import GLTFViewer from "./components/GLTFViewer.vue";
// import ChartViewer from "./components/ChartViewer.vue";

export default {
  name: "App",
  components: {
    // GLTFViewer,
    // ChartViewer,
  },
  data() {
    return {
      showFullScreen: true,
      showHeight:700
    };
  },
  created() {
    // console.log(`App.vue created() : ${this.$router.name}`);
  },
  methods: {
    // CS ARENA 전체 페이지 화면으로 일동
    goLink(routeName) {
      // this.$router.push({ name: routeName });
      if (routeName == "" || routeName == "Home") document.location.href = `/`;
      else document.location.href = `/viewer/${routeName}`;
    },
    updateWireFrame() {
      this.$refs.gltfViewer.toggleWireframe();
    },
    updateGrid() {
      this.$refs.gltfViewer.toggleGrid();
    },

    onObjectSelected(info) {
      console.log("onObjectSelected(info)");
      this.selectedObjectInfo = info;
      if (this.selectedObjectInfo.name) {
        this.showChart(this.selectedObjectInfo.name);
      }
    },
    restoreObjects() {
      this.$refs.gltfViewer.restoreObjects();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  /* border: 2px solid red; */
  width: 100%;
  overflow: hidden; /* 스크롤바 없이 넘치는 내용이 숨김 */  
}

.app-table {
  margin: 0px;
  padding: 0px;
  width:100%;
  height:100%;
  border: 2px solid blue;
  background-color: #FFFFFF;
}

.app-td {
  margin: 0px;
  padding: 0px;
  border: 2px solid red;
}


/*
.nav-controls {
  position: relative;
  padding: 0px;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 30px;
  text-align: left;
  background-color: rgb(171, 238, 202); /* 배경색과 투명도 * /
  border-radius: 3px;
  z-index: 1;
}

.nav-controls button {
  background-color: rgb(243, 226, 152); /* 배경색과 투명도 * /
  border: none;
  color: rgb(12, 12, 12);
  font-size: 14px;
  padding: 1px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin: 3px 2px;
  transition: background-color 0.3s;
}

nav ul {
  list-style-type: none;
  padding: 0;
}
nav ul li {
  display: inline;
  font-size: 14px;
  margin-left: 10px;
  margin-right: 10px;
}
*/

</style>
