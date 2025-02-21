<template>
  <div
    v-show="menuVisible"
    class="circle-menu"
    :style="{ top: `${menuY}px`, left: `${menuX}px` }"
  >

    <div
      class="menu-item"
      :class="{ 'disabled': isColliding }"
      style="transform: rotate(-30deg) translate(200px) rotate(30deg); cursor:pointer"
      @click="handleClick('save')"
      @dragenter.stop.prevent
      @dragover.stop.prevent
      @drop.stop.prevent
      @mouseenter="showTooltip('save')"
      @mouseleave="hideTooltip"
    >
      <div class="tooltip-container">
          <img
            class="object-icons"
            width="24px"
            height="24"
            src="@/assets/image/editor/icon_save.png"
            draggable="false"
          />
          <!-- 저장 버튼 위에 툴팁, isColliding 상태에 따라 항상 표시 -->
            <div 
              class="tooltip" 
              v-show="isColliding" 
              :style="[tooltipPosition('save'), { backgroundColor: '#ff5050' }]">
              <span>⚠ Warning: 충돌 감지</span>
            </div>
            <!-- isColliding이 false일 경우 다른 툴팁 표시 -->
            <div class="tooltip" v-show="!isColliding && activeTooltip === 'save'" :style="tooltipPosition('save')">
              <span>저장: 객체 상태를 저장합니다</span>
            </div>
          </div>
        </div>
    
    <div
      class="menu-item"
      style="transform: rotate(0deg) translate(200px) rotate(0deg);"
      @click="handleClick('delete')"
      @dragenter.stop.prevent
      @dragover.stop.prevent
      @drop.stop.prevent
      @mouseenter="showTooltip('delete')"
      @mouseleave="hideTooltip"
    >
      <div>
        <img class="object-icons" width=24px height=24 src="@/assets/image/editor/icon_delete.png" draggable="false"/>
      </div>
      <div class="tooltip" v-show="activeTooltip === 'delete'" :style="tooltipPosition('delete')">
        삭제 : 선택한 객체를 삭제합니다
      </div>
    </div>



    <div
      class="menu-item"
      :class="{ 'disabled': history.length === 0}"
      style="transform: rotate(30deg) translate(200px) rotate(-30deg);"
      @click="handleClick('undo')"
      @dragenter.stop.prevent
      @dragover.stop.prevent
      @drop.stop.prevent
      @mouseenter="showTooltip('undo')"
      @mouseleave="hideTooltip"
    >
      <div>
        <img class="object-icons" width=24px height=24 src="@/assets/image/editor/icon_undo.png" draggable="false"/>
      </div>
      <div class="tooltip" v-show="activeTooltip === 'undo'" :style="tooltipPosition('undo')">
        되돌리기 : 이전 상태로 되돌립니다
      </div>
    </div>


    <div
      class="menu-item"
      style="transform: rotate(60deg) translate(200px) rotate(-60deg);"
      @click="handleClick('rotate')"
      @dragenter.stop.prevent
      @dragover.stop.prevent
      @drop.stop.prevent
      @mouseenter="showTooltip('rotate')"
      @mouseleave="hideTooltip"
    >
      <div>
        <img class="object-icons" width=24px height=24 src="@/assets/image/editor/icon_rotate.png" draggable="false"/>
      </div>
      <div class="tooltip" v-show="activeTooltip === 'rotate'" :style="tooltipPosition('rotate')">
        객체회전 : 선택 객체를 회전합니다
      </div>
    </div>


    <div
      class="menu-item"
      style="transform: rotate(90deg) translate(200px) rotate(-90deg);"
      @click="handleClick('move')"
      @dragenter.stop.prevent
      @dragover.stop.prevent
      @drop.stop.prevent
      @mouseenter="showTooltip('move')"
      @mouseleave="hideTooltip"
    >
      <div>
        <img class="object-icons" width=24px height=24 src="@/assets/image/editor/icon_move.png" draggable="false"/>
      </div>
      <div class="tooltip" v-show="activeTooltip === 'move'" :style="tooltipPosition('move')">
        이동 : 선택 객체를 이동합니다
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuX: Number,
    menuY: Number,
    menuVisible: Boolean,
    isColliding: Boolean,
    history: Array,
  },
  data() {
    return {
      activeTooltip: null // 툴팁을 관리하는 변수
    };
  },
  methods: {
    handleClick(item) {

      if(item === "save" && this.isColliding) return;

      console.log('menuClickItem', item)
      this.$emit('menuItemClicked', item);
    },
    showTooltip(item) {
      console.log(item);
      this.activeTooltip = item; // 해당 항목의 툴팁 표시
    },
    hideTooltip() {
      this.activeTooltip = null; // 툴팁 숨김
    },
    tooltipPosition(item) {
      // 각 버튼에 대해 고정된 위치를 설정
      const positions = {
        save: { top: '-40px', left: '50%', transform: 'translateX(-50%)' },
        delete: { top: '-30px', left: '50%', transform: 'translateX(-50%)' },
        undo: { top: '-30px', left: '50%', transform: 'translateX(-50%)' },
        rotate: { top: '-30px', left: '50%', transform: 'translateX(-50%)' },
        move: { top: '-30px', left: '50%', transform: 'translateX(-50%)' }
      };
      return positions[item];
    },
    onTransitionEnd() {
      console.log('Menu animation complete');
    }
  },
  mounted() {
    console.log('Menu X:', this.menuX);
    console.log('Menu Y:', this.menuY);
    console.log('Menu Visible:', this.menuVisible);
  },
  updated() {
  }
};
</script>

<style scoped>

.object-icons {
  filter: invert(1) brightness(10); /* 색상 반전 및 밝기 증가 */
}

.circle-menu {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  opacity: 1;
  transform: scale(0.5);
  transition: opacity 0.3s ease, transform 0.3s ease;
  animation: menuAppear 0.5s ease-out forwards;
  pointer-events: none;
}

@keyframes menuAppear {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.menu-item {
  position: absolute;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #6bc6ff, #3513bc); /* 그라데이션 배경 */
  border-radius: 50%;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  opacity: 1; /* 기본 opacity를 1로 설정 */
  transform: rotate(0deg) translate(0px) rotate(0deg);
  transition: opacity 0.3s ease, transform 0.5s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  transition-delay: calc(var(--index) * 0.1s);
  pointer-events: auto; 
}

/* 충돌 감지 시 저장 버튼 비활성화 */
.menu-item.disabled {
  background: linear-gradient(45deg, #a0a0a0, #3f3f3f);
  pointer-events: none;
  cursor: not-allowed;
}

.menu-item:hover {
  background-color: #000000;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
}

.menu-item:hover .object-icons {
  transform: scale(1.1);
}

.menu-item:active {
  background-color: #d32f2f; /* 클릭 시 색상 변화 */
}

.menu-item:focus {
  outline: none;
}

.circle-menu[style*="top"] .menu-item:nth-child(1) {
  transform: rotate(-30deg) translate(200px) rotate(30deg);
}

.circle-menu[style*="top"] .menu-item:nth-child(2) {
  transform: rotate(0deg) translate(200px) rotate(0deg);
}

.circle-menu[style*="top"] .menu-item:nth-child(3) {
  transform: rotate(30deg) translate(200px) rotate(-30deg);
}

.circle-menu[style*="top"] .menu-item:nth-child(4) {
  transform: rotate(60deg) translate(200px) rotate(-60deg);
}

.circle-menu[style*="top"] .menu-item:nth-child(5) {
  transform: rotate(90deg) translate(200px) rotate(-90deg);
}

/* 충돌 감지 툴팁 스타일 */
.tooltip-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tooltip {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  /* background-color: #ff5050; */
  background-color: #4caf50;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  opacity: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
}

</style>
