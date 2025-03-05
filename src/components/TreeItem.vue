<template>
    <v-list-group v-if="item.children"
      :value="isOpen" density="compact">
      <template #activator="{ props }">
        <v-list-item v-bind="props" density="compact">
          <v-icon class="mr-2">▶</v-icon>
          {{ item.name }} ( {{ item.children.length }} )
        </v-list-item>
      </template>
      <TreeItem v-for="child in item.children" :key="child.id" :item="child" />
    </v-list-group>
  
    <v-list-item v-else>
      <v-icon class="mr-2">▼</v-icon>
      {{ item.name }}
    </v-list-item>
  </template>
  
  <script>
  export default {
    props: {
      item: Object,
    },
    data() {
      return {
        isOpen: false,
      };
    },
  };
  </script>

  <style scoped>
  .v-list-item-custom {
    padding-left: 10px;
    height: 20px;
    min-height: 20px;
    padding-top: 0px; 
    padding-bottom: 0px;
  }  
  </style>