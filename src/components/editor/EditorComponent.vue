<template>
  <div>
    <div style="font-weight: bold; color: #fff; margin: 4px 0 4px 10px; font-size: 1em; text-align: center">
      1Depth
    </div>
    <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px;">
        <div @click="showDetail(1)" class="hover-card">
            <span class="card-text">서버 / 랙</span> 
            <img class="card-image" src="@/assets/image/editor/server-rack.png" alt="서버/랙 이미지"/>
        </div>

        <div @click="showDetail(2)" class="hover-card">
            <span class="card-text" @click="onCardClick('Storage')">스토리지</span> 
            <img class="card-image" src="@/assets/image/editor/device2.png" alt="서버/랙 이미지"/>
        </div>

        <div @click="showDetail(3)" class="hover-card">
            <span class="card-text">테이블 / 의자</span> 
            <img class="card-image" src="@/assets/image/editor/device3.png" alt="서버/랙 이미지"/>
        </div>

        <div @click="showDetail(4)" class="hover-card">
            <span class="card-text">기타</span> 
            <img class="card-image" src="@/assets/image/editor/device4.png" alt="서버/랙 이미지"/>
        </div>
    </div>

    <!-- divider -->
    <div class="divider" ></div>

    <!-- 기본 화면: 선택된 데이터가 없을 때 중앙 정렬 -->
    <div v-if="!isDetailVisible" class="empty-state-container">
      <p style="text-align: center; color: #fff;">선택된 데이터가 없습니다</p>
      <img class="default-image" width="200px" src="@/assets/image/editor/undraw_file-search_cbur.svg" alt="기본 화면 이미지"/>
    </div>

    <EditorDetailComponent v-if="isDetailVisible" :itemId="selectedItemId" />
  </div>
    
    
  </template>

<script>
import { ref } from 'vue';
import EditorDetailComponent from './EditorDetailComponent.vue';

export default {
  components: {
    EditorDetailComponent
  },
  setup() {
    const isDetailVisible = ref(false);
    const selectedItemId = ref(null);

    // 클릭된 항목에 따라 EditorDetailComponent를 보여주는 함수
    const showDetail = (id) => {
      selectedItemId.value = id;
      isDetailVisible.value = true;
    };

    return {
      isDetailVisible,
      selectedItemId,
      showDetail
    };
  }
};
</script>

<style scoped>
/** mslee */
.hover-card {
  background-color: #f5f5f5;
  width: 120px;
  height: 120px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}

.hover-card:hover {
  background-color: #bdbbbb;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* hover 시 그림자 변경 */
}

.hover-card:hover span {
  font-size: 1em
}

.card-text {
  margin-top: 5px;
  color: #333;
  font-size: 14px;
  font-weight: bold;
}

.card-image {
  width: 90px;
  height: auto;
  transition: transform 0.3s ease; /* 이미지 크기 변화에 대한 부드러운 전환 효과 */
}

.hover-card:hover .card-image {
  
  transform: scale(1.1); /* hover-card에 마우스를 올렸을 때 이미지 크기 10% 확대 */
}

.divider {
    width: 100%;
    border: 1px solid #555;
    margin: 6px 0; /* Reduced margin */
}

.empty-state-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%; /* 부모의 남은 공간을 모두 차지하도록 */
}

/** mslee */
</style>