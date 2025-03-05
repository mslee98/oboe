<template>
    <div>
      <!-- 로딩 중일 때만 보여지는 로딩 화면 -->
      <div v-if="isSaveLoading" class="loading-overlay">
        <div class="loading-spinner">Loading...</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        isSaveLoading: Boolean
    },
  };
  </script>
  
  <style scoped>
  /* 로딩 오버레이 */
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  /* 로딩 스피너 애니메이션 */
.loading-spinner {
  font-size: 24px;
  color: white;
  font-weight: bold;
  position: relative;
}

.loading-spinner:before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  width: 20px;
  height: 20px;
  border: 4px solid white;
  border-radius: 50%;
  border-top: 4px solid transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
  </style>
  