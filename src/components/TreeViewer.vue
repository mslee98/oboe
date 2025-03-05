<template>
    <div>
      <Treeselect
        v-model="selectedNode"
        :options="treeData"
        placeholder="Select an Object"
        @select="onSelect"
      />
    </div>
  </template>
  
  <script>
  import Treeselect from "vue3-treeselect";
  import "vue3-treeselect/dist/vue3-treeselect.css";
  
  export default {
    props: {
      scene: Object, // Three.js 씬을 부모 컴포넌트에서 전달받음
    },
    components: { Treeselect },
    data() {
      return {
        treeData: [],
        selectedNode: null,
      };
    },
    watch: {
      scene: {
        handler(newScene) {
          if (newScene) {
            this.treeData = this.createTree(newScene);
          }
        },
        immediate: true,
      },
    },
    methods: {

      createTree(object) {

        let objInfo = this.getObjectInfo(object);

        return {
          id: objInfo.id,
          label: objInfo.level,
          children: object.children.map(this.createNode),
        };

      },

      createNode(object) {
        
        let objInfo = this.getObjectInfo(object);
        
        return {
          id: objInfo.id,
          label: objInfo.level,
          children: object.children.map(this.createNode),
        };

      },

      onSelect(node) {
        console.log("Selected Object:", node);
      },

      getObjectInfo(object) {
        let rtn = {
          id: "No Id",
          level: "No Name",
        };

        if(object.uuid) rtn.id = object.uuid;
        else if(object.id) rtn.id = object.id;

        if(object.name) rtn.level = object.name;
        else if(object.type) rtn.level = object.type;

        return rtn;
      }



    },

  };
  </script>