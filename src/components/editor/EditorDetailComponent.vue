<template>
    <div class="detail-container">
        <div style="font-weight: bold; color: #fff; margin: 4px 0 4px 10px; font-size: 1em; text-align: center">2Depth</div>
        <div style="display:flex; justify-content: center; align-items: center;">
            <nav aria-label="breadcrumb" >
                <ol class="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li class="active" v-if="itemId === 1">서버/랙</li>
                    <li class="active" v-else-if="itemId === 2">스토리지</li>
                    <li class="active" v-else-if="itemId === 3">의자/테이블</li>
                    <li class="active" v-else-if="itemId === 4">기타/etc</li>
                </ol>
            </nav>

            <div style="color: #fff; font-weight: bold; display: flex;">
                <!-- <div style="
                    background: linear-gradient(135deg, #286bf2, #1e5ab6); 
                    color: white; 
                    padding: 4px 10px; 
                    border-radius: 8px; 
                    font-size: 0.9em; 
                    font-weight: bold; 
                    text-align: center; 
                    cursor: pointer; 
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
                    transition: transform 0.2s ease, box-shadow 0.2s ease;">
                    추가
                </div>
                <div style="
                    background: linear-gradient(135deg, #286bf2, #1e5ab6); 
                    color: white; 
                    padding: 4px 10px; 
                    border-radius: 8px; 
                    font-size: 0.9em; 
                    font-weight: bold; 
                    text-align: center; 
                    cursor: pointer; 
                    margin-left: 5px;
                    margin-right: 20px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
                    transition: transform 0.2s ease, box-shadow 0.2s ease;">
                    관리
                </div> -->
            </div>
        </div>
    </div>
    <!-- <div class="tab">
        <div class="tab-item">Total: 12</div>
        <div class="tab-item">최신순</div>
        <div class="tab-item">브랜드</div>
    </div> -->


    <div>
        <div class="detail-component" v-if="itemId === 1">
            <div class="hover-card">
                <span class="card-text">서버1</span> 
                <img class="card-image" src="@/assets/image/editor/server1.png" alt="의자/테이블 이미지"/>
            </div>

            <div class="hover-card">
                <span class="card-text">서버2</span> 
                <img class="card-image" src="@/assets/image/editor/server2.png" alt="의자/테이블 이미지"/>
            </div>

            <div class="hover-card">
                <span class="card-text">서버3</span> 
                <img class="card-image" src="@/assets/image/editor/server3.png" alt="의자/테이블 이미지"/>
            </div>

            <div class="hover-card">
                <span class="card-text">서버4</span> 
                <img class="card-image" src="@/assets/image/editor/server4.png" alt="의자/테이블 이미지"/>
            </div>
        </div>

        <div class="detail-component" v-else-if="itemId === 2">
            <div class="hover-card">
                <span class="card-text">스토리지1</span> 
                <img class="card-image" src="@/assets/image/editor/storage1.png" alt="의자/테이블 이미지"/>
            </div>

            <div class="hover-card">
                <span class="card-text">스토리지2</span> 
                <img class="card-image" src="@/assets/image/editor/storage2.png" alt="의자/테이블 이미지"/>
            </div>

            <div class="hover-card">
                <span class="card-text">스토리지3</span> 
                <img class="card-image" src="@/assets/image/editor/storage3.png" alt="의자/테이블 이미지"/>
            </div>

            <div class="hover-card">
                <span class="card-text">스토리지4</span> 
                <img class="card-image" src="@/assets/image/editor/storage4.png" alt="의자/테이블 이미지"/>
            </div>
        </div>

        <div class="detail-component" v-else-if="itemId === 3">
            <div class="hover-card">
                <span class="card-text">의자1</span> 
                <img 
                    class="card-image" 
                    src="@/assets/image/editor/chair1.png" 
                    alt="의자/테이블 이미지"
                    draggable="true"
                    @dragstart="onDragStart($event, 'chair1')"
                />
            </div>

            <div class="hover-card">
                <span class="card-text">의자2</span> 
                <img 
                    class="card-image" 
                    src="@/assets/image/editor/chair2.png" 
                    alt="의자/테이블 이미지"
                    draggable="true"
                    @dragstart="onDragStart($event, 'chair2')"
                />
            </div>

            <div class="hover-card">
                <span class="card-text">의자3</span> 
                <img 
                    class="card-image" 
                    src="@/assets/image/editor/chair3.png" 
                    alt="의자/테이블 이미지"
                    draggable="true"
                    @dragstart="onDragStart($event, 'chair3')"
                />
            </div>

            <div class="hover-card">
                <span class="card-text">의자4</span> 
                <img 
                    class="card-image" 
                    src="@/assets/image/editor/chair4.png" 
                    alt="의자/테이블 이미지"
                    draggable="true"
                    @dragstart="onDragStart($event, 'chair4')"
                />
            </div>

            <div class="hover-card">
                <span class="card-text">의자1</span> 
                <img 
                    class="card-image" 
                    src="@/assets/image/editor/chair1.png" 
                    alt="의자/테이블 이미지"
                    draggable="true"
                    @dragstart="onDragStart($event, 'chair1')"
                />
            </div>

            <div class="hover-card">
                <span class="card-text">의자2</span> 
                <img 
                    class="card-image" 
                    src="@/assets/image/editor/chair2.png" 
                    alt="의자/테이블 이미지"
                    draggable="true"
                    @dragstart="onDragStart($event, 'chair2')"
                />
            </div>

            <div class="hover-card">
                <span class="card-text">의자3</span> 
                <img 
                    class="card-image" 
                    src="@/assets/image/editor/chair3.png" 
                    alt="의자/테이블 이미지"
                    draggable="true"
                    @dragstart="onDragStart($event, 'chair3')"
                />
            </div>

            <div class="hover-card">
                <span class="card-text">의자4</span> 
                <img 
                    class="card-image" 
                    src="@/assets/image/editor/chair4.png" 
                    alt="의자/테이블 이미지"
                    draggable="true"
                    @dragstart="onDragStart($event, 'chair4')"
                />
            </div>
        </div>
        
        <div class="detail-component" v-else-if="itemId === 4">
            <div class="hover-card" >
                <span class="card-text">ETC1</span> 
                <img class="card-image" src="@/assets/image/editor/etc1.png" alt="의자/테이블 이미지"/>
            </div>

            <div class="hover-card">
                <span class="card-text">ETC2</span> 
                <img class="card-image" src="@/assets/image/editor/etc2.png" alt="의자/테이블 이미지"/>
            </div>

            <div class="hover-card">
                <span class="card-text">ETC3</span> 
                <img class="card-image" src="@/assets/image/editor/etc3.png" alt="의자/테이블 이미지"/>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      itemId: {
        type: Number,
        required: true
      }
    },
    methods: {
        onDragStart(event, objectName) {
            event.dataTransfer.setData('text', objectName);
            console.log('드래그 시작')

            // 기존에 있는 텍스트나 아이콘을 표시할 엘리먼트를 만들거나 수정
            const dragMessage = document.createElement('div');
            dragMessage.id = 'drag-message';
            dragMessage.innerHTML = '<span>화면에 Drop 하세요</span>';

            // 스타일 설정
            dragMessage.style.position = 'absolute';
            dragMessage.style.top = '25%';  // 화면 중앙에 배치
            dragMessage.style.left = '50%';
            dragMessage.style.transform = 'translate(-50%, -50%)';  // 중앙 정렬
            dragMessage.style.color = 'white';
            dragMessage.style.fontSize = '24px';
            dragMessage.style.fontWeight = 'bold';
            dragMessage.style.backgroundColor = 'rgba(52, 152, 219, 0.8)';  // 파란색 배경
            dragMessage.style.padding = '15px 30px';
            dragMessage.style.borderRadius = '8px';
            dragMessage.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
            dragMessage.style.zIndex = '1000';  // 최상위 레벨로 배치

            // 애니메이션 추가 (페이드 인 효과)
            dragMessage.style.animation = 'fadeInOut 2s infinite';

            // 렌더러의 컨테이너에 dragMessage를 추가
            document.body.appendChild(dragMessage);

            // 애니메이션을 위한 CSS 추가 (내부 스타일링)
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes fadeInOut {
                    0% {
                    opacity: 0;
                    }
                    50% {
                    opacity: 1;
                    }
                    100% {
                    opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);

            document.addEventListener('dragend', () => {
                const message = document.getElementById('drag-message');
                if (message) {
                    message.remove();
                }
            })
        }
    }
  };
  </script>

<style scoped>

.tab {
    width: 100%;
    color: #fff;
    display: flex;
}

.tab-item {
    width: 100%;
    border: 1px solid #77787c;

}
.breadcrumb {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin-left: 10px;
    font-weight: bold;
    margin-top: 10px;
}   

.breadcrumb li + li::before {
    content: ">";
    padding: 0 8px;
}

.breadcrumb a {
    text-decoration: none;
    color: #286Bf2;
    font-size:0.9em
}

.breadcrumb .active {
    color: #fff;
    font-weight: bold;
    font-size:0.9em
}

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

.detail-component {
    display: flex; 
    justify-content: center;
    flex-wrap: wrap; 
    gap: 10px; 
    padding: 5px;
    overflow-y: auto; /* 스크롤 활성화 */
    max-height: 400px; /* 기본적으로 400px까지 제한 */
}

/* 해상도에 따라 높이를 다르게 설정 */
@media screen and (min-width: 1920px) {
    .detail-component {
        max-height: 700px; /* UHD 화면에 맞는 높이 설정 */
    }
}

@media screen and (max-width: 1920px) {
    .detail-component {
        
        max-height: 350px; /* FHD 화면에 맞는 높이 설정 */
    }
}

</style>