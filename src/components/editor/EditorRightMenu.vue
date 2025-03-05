<template>
    <div v-if="editSiderYn" class="editor-sidebar">
      <div class="editor-header">
        <span class="editor-title">Editor Tool</span>
        <button class="close-btn" @click="$emit('toggleEditorRightMenu')">닫기</button>
      </div>
  
      <div class="divider"></div>
  
      <div class="product-detail">
        <div class="product-image">
          <img src="@/assets/image/editor/chair1.png" />
        </div>
        <div class="product-info">
          <p class="product-name">{{ localEditorObject.name }}</p>
          <p class="product-dimensions">{{ localEditorObject.scale.x }}W x {{ localEditorObject.scale.y }}H x {{ localEditorObject.scale.z }}D</p>
        </div>
      </div>
  
      <div class="divider"></div>
  
      <div class="property-section">
        <div class="property-title">속성</div>
        <button class="reset-btn">수치 초기화</button>
      </div>

      <div class="divider"></div>

      <div class="property-section">
        <div class="property-title">성능</div>
        <button class="reset-btn" @click="clearConsole">콘솔 클리어</button>
      </div>
  
      <div class="divider"></div>
  
      <div class="size-lock">
        <input type="checkbox" v-model="isRatioPreventYn" />
        <span>원본 비율 유지</span>
      </div>
  
      <div class="input-section">
        <!-- Size Section -->
        <div class="property-group">
          <div @click="toggleCollapse('size')" class="section-header">
            <span class="flex items-center">
              <img class="object-icons" width=22 src="@/assets/image/editor/icon_scale.png" style="margin-right: 5px">
              크기(Scale)
            </span>
            <span :class="{ 'arrow-rotated': !collapsed.size }" class="arrow">▼</span>
          </div>

          <div v-bind:class="{'section-content': true, 'expanded': !collapsed.size}">
            <div class="input-group">
              <span>가로(Width)</span>
              <input type="number" class="input-field" :value="localEditorObject.scale.x" :min="0" :max="maxWidth" @input="sendEditorObjectUpdate('scale', 'x', $event.target.value)" />
            </div>
            <div class="range-group">
              <input type="range" 
                @mousedown="emitScrollStart"
                @mouseup="emitScrollEnd"  :value="localEditorObject.scale.x" :min="0" :max="maxWidth" @input="sendEditorObjectUpdate('scale', 'x', $event.target.value)" style="width: 100%" step="0.1" />
            </div>
  
            <div class="input-group">
              <span>세로(Height)</span>
              <input type="number" class="input-field" :value="localEditorObject.scale.y" :min="0" :max="maxWidth" @input="sendEditorObjectUpdate('scale', 'y', $event.target.value)" />
            </div>
            <div class="range-group">
              <input type="range" 
                @mousedown="emitScrollStart"
                @mouseup="emitScrollEnd"  :value="localEditorObject.scale.y" :min="0" :max="maxWidth" @input="sendEditorObjectUpdate('scale', 'y', $event.target.value)" style="width: 100%" step="0.1" />
            </div>
  
            <div class="input-group">
              <span>깊이(Depth)</span>
              <input type="number" class="input-field" :value="localEditorObject.scale.z" :min="0" :max="maxWidth" @input="sendEditorObjectUpdate('scale', 'z', $event.target.value)" />
            </div>
            <div class="range-group">
              <input type="range" 
                @mousedown="emitScrollStart"
                @mouseup="emitScrollEnd"  :value="localEditorObject.scale.z" :min="0" :max="maxWidth" @input="sendEditorObjectUpdate('scale', 'z', $event.target.value)" style="width: 100%" step="0.1" />
            </div>
          </div>
        </div>
        <!-- Position Section -->
        <div class="property-group">
          <div @click="toggleCollapse('position')" class="section-header">
            <span class="flex items-center">
            <img class="object-icons" width=22 src="@/assets/image/editor/icon_move.png" style="margin-right: 5px">
              위치(Position)
            </span>
            <span :class="{ 'arrow-rotated': !collapsed.position }" class="arrow">▼</span>

          </div>
        
          <div v-bind:class="{'section-content': true, 'expanded': !collapsed.position}">
          <!-- <div v-if="!collapsed.position" class="section-content"> -->
            
            <div class="input-group">
              <span>위치 X</span>
              <input type="number" class="input-field" :value="localEditorObject.position.x" :min="minWidth" :max="maxWidth" @input="sendEditorObjectUpdate('position', 'x', $event.target.value)" />
            </div>
            <div class="range-group">
              <input type="range"
                @mousedown="emitScrollStart"
                @mouseup="emitScrollEnd"  :value="localEditorObject.position.x" :min="minWidth" :max="maxWidth" @input="sendEditorObjectUpdate('position', 'x', $event.target.value)" style="width: 100%" step="0.1" />
            </div>
  
            <div class="input-group">
              <span>위치 Y</span>
              <input type="number" class="input-field" :value="localEditorObject.position.y" :min="minWidth" :max="maxWidth" @input="sendEditorObjectUpdate('position', 'y', $event.target.value)" />
            </div>
            <div class="range-group">
              <input type="range" 
                @mousedown="emitScrollStart"
                @mouseup="emitScrollEnd"  :value="localEditorObject.position.y" :min="minWidth" :max="maxWidth" @input="sendEditorObjectUpdate('position', 'y', $event.target.value)" style="width: 100%" step="0.1" />
            </div>
  
            <div class="input-group">
              <span>위치 Z</span>
              <input type="number" class="input-field" :value="localEditorObject.position.z" :min="minWidth" :max="maxWidth" @input="sendEditorObjectUpdate('position', 'z', $event.target.value)" />
            </div>
            <div class="range-group">
              <input type="range" 
                @mousedown="emitScrollStart"
                @mouseup="emitScrollEnd" 
                :value="localEditorObject.position.z" 
                :min="minWidth" 
                :max="maxWidth" 
                @input="sendEditorObjectUpdate('position', 'z', $event.target.value)" 
                style="width: 100%" 
                step="0.1" 
              />
            </div>
          </div>
        </div>
  
        <!-- Rotation Section -->
        <div class="property-group">
            <div @click="toggleCollapse('rotation')" class="section-header" data-section="rotation">
                <span class="flex items-center">
                  <img class="object-icons" width=22 src="@/assets/image/editor/icon_rotate.png" style="margin-right: 5px">
                  회전(Rotation)
                </span>
                <span :class="{ 'arrow-rotated': !collapsed.rotation }" class="arrow">▼</span>
            </div>
            <div v-bind:class="{'section-content': true, 'expanded': !collapsed.rotation}">
                <div class="input-group">
                    <span>회전 X</span>
                    <input type="number" class="input-field" :value="localEditorObject.rotation.x" :min="minWidth" :max="maxWidth" @input="sendEditorObjectUpdate('rotation', 'x', $event.target.value)" />
                </div>
                    <div class="range-group">
                    <input type="range" 
                @mousedown="emitScrollStart"
                @mouseup="emitScrollEnd"  :value="localEditorObject.rotation.x" :min="minWidth" :max="maxWidth" @input="sendEditorObjectUpdate('rotation', 'x', $event.target.value)" style="width: 100%" step="0.1" />
                </div>

                <div class="input-group">
                    <span>회전 Y</span>
                    <input type="number" class="input-field" :value="localEditorObject.rotation.y" :min="minWidth" :max="maxWidth" @input="sendEditorObjectUpdate('rotation', 'y', $event.target.value)" />
                </div>
                <div class="range-group">
                    <input type="range" 
                @mousedown="emitScrollStart"
                @mouseup="emitScrollEnd"  :value="localEditorObject.rotation.y" :min="minWidth" :max="maxWidth" @input="sendEditorObjectUpdate('rotation', 'y', $event.target.value)" style="width: 100%" step="0.1" />
                </div>

                <div class="input-group">
                    <span>회전 Z</span>
                    <input type="number" class="input-field" :value="localEditorObject.rotation.z" :min="minWidth" :max="maxWidth" @input="sendEditorObjectUpdate('rotation', 'z', $event.target.value)" />
                </div>
                <div class="range-group">
                    <input type="range" 
                @mousedown="emitScrollStart"
                @mouseup="emitScrollEnd"  :value="localEditorObject.rotation.z" :min="minWidth" :max="maxWidth" @input="sendEditorObjectUpdate('rotation', 'z', $event.target.value)" style="width: 100%" step="0.1" />
                </div>
            </div>
        </div>

        <!-- Rotation Section -->
        <div v-if="editMarkerTabYn" class="property-group">
            <div @click="toggleCollapse('marker')" class="section-header" data-section="marker">
                <span class="flex items-center">
                  <img class="object-icons" width=22 src="@/assets/image/editor/icon_rotate.png" style="margin-right: 5px">
                  마커 설정
                </span>
                <span :class="{ 'arrow-rotated': !collapsed.marker }" class="arrow">▼</span>
            </div>
            <div v-bind:class="{'section-content': true, 'expanded': !collapsed.marker}">
                <div class="input-group">
                    <span>사이즈(Size)</span>
                    <input type="number" class="input-field" :value="localEditorObject.marker.size" :min="0" :max="maxWidth" @input="sendEditorObjectUpdate('marker', 'size', $event.target.value)" />
                </div>
                    <div class="range-group">
                    <input type="range" 
                      @mousedown="emitScrollStart"
                      @mouseup="emitScrollEnd"  :value="localEditorObject.marker.size" :min="0" :max="maxWidth" @input="sendEditorObjectUpdate('marker', 'size', $event.target.value)" style="width: 100%" step="0.1" />
                </div>

                <div class="input-group">
                    <span>깊이(Depth)</span>
                    <input type="number" class="input-field" :value="localEditorObject.marker.depth" :min="0" :max="maxWidth" @input="sendEditorObjectUpdate('marker', 'depth', $event.target.value)" />
                </div>
                <div class="range-group">
                    <input type="range" 
                    @mousedown="emitScrollStart"
                    @mouseup="emitScrollEnd"  :value="localEditorObject.marker.depth" :min="0" :max="maxWidth" @input="sendEditorObjectUpdate('marker', 'depth', $event.target.value)" style="width: 100%" step="0.1" />
                </div>

                <div class="input-group">
                    <span>curveSegments</span>
                    <input type="number" class="input-field" :value="localEditorObject.marker.curveSegments" :min="0" :max="maxWidth" @input="sendEditorObjectUpdate('marker', 'curveSegments', $event.target.value)" />
                </div>
                <div class="range-group">
                    <input type="range" 
                    @mousedown="emitScrollStart"
                    @mouseup="emitScrollEnd"  :value="localEditorObject.marker.curveSegments" :min="0" :max="maxWidth" @input="sendEditorObjectUpdate('marker', 'curveSegments', $event.target.value)" style="width: 100%" step="0.1" />
                </div>
            </div>
        </div>



      </div>
    </div>
  </template>
  
  
  
  <script>
  export default {
    props: {
      editSiderYn: Boolean,
      editMarkerTabYn: Boolean,
      editorObject: {
        type: Object,
        required: true
      },
      toggleEditorRightMenu: Function,
      handleScrollStart: Function,
      handleScrollEnd: Function,
    },
    data() {
      return {
        isRatioPreventYn: false,
        step: 0.01,
        minWidth: -10,
        maxWidth: 10,
        collapsed: {
          size: false,
          position: false,
          rotation: false,
          marker: false,
        }
      };
    },
    computed: {
      localEditorObject: {
        get() {
          return this.editorObject;
        },
        set(newValue) {
          this.$emit('update:editorObject', newValue); // 부모에게 값 업데이트 알림
        }
      }
    },
    methods: {
        sendEditorObjectUpdate(group, axis, value) {
            const updatedEditorObject = { ...this.localEditorObject };

            // 만약 'isRatioPreventYn'이 true라면 스케일 비율을 유지하도록 처리
            if (this.isRatioPreventYn && group === 'scale') {
                // 스케일을 모든 축에 동일한 값으로 설정
                updatedEditorObject[group].x = value;
                updatedEditorObject[group].y = value;
                updatedEditorObject[group].z = value;

            } else if (group === 'marker') { 
                this.$emit('update-marker', { axis, value });       

                this.selectedMarkerObject.geometry.parameters.options[axis] = value; 
            } else {
                // 비율을 유지하지 않는 경우에는 해당 축의 값만 업데이트
                updatedEditorObject[group][axis] = value;
            }

            // 업데이트된 객체를 부모에게 전달
            this.$emit('sendEditorObjectUpdate', updatedEditorObject);
        },
        toggleCollapse(section) {
            // 각 섹션의 접힘 상태를 토글
            this.collapsed[section] = !this.collapsed[section];

            // 특정 섹션에서 화살표 회전 상태 변경
            if (section === 'size' || section === 'position' || section === 'rotation' || section === 'marker') {
                this.$nextTick(() => {
                    const arrow = document.querySelector(`.section-header[data-section="${section}"] .arrow`);
                    if (arrow) {
                        arrow.classList.toggle('arrow-rotated', !this.collapsed[section]);
                    }
                });
            }

            // 섹션이 펼쳐지면 'expanded' 클래스를 추가하고, 접히면 제거
            this.$nextTick(() => {
                const sectionContent = document.querySelector(`.section-content.${section}`);
                if (sectionContent) {
                    if (this.collapsed[section]) {
                        sectionContent.classList.remove('expanded');
                    } else {
                        sectionContent.classList.add('expanded');
                    }
                }
            });
        },
        emitScrollStart() {
          this.$emit('scrollStart');
        },
        emitScrollEnd() {
          this.$emit('scrollEnd');
        },
        clearConsole() {
          console.log("콘솔 초기화")
          console.clear();
        }

    },
    

  };
  </script>
  
  <style scoped>

.object-icons {
  filter: invert(1) brightness(10); /* 색상 반전 및 밝기 증가 */
}

.editor-sidebar {
  position: fixed;
  top: 68px;
  right: 0;
  width: 300px; /* Reduced width */
  height: 100%;
  background-color: #4d4d4f;
  border-left: 2px solid #444;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 8px; /* Reduced padding */
  display: flex;
  flex-direction: column;
  font-family: 'Arial', sans-serif;
}

.editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px 0 5px;
    font-weight: bold;
}

.editor-title {
    font-size: 1em; /* Slightly smaller font size */
}

.close-btn {
    background-color: #ff5050;
    border: none;
    color: #fff;
    padding: 4px 8px; /* Smaller button size */
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9em;
}

.close-btn:hover {
    background-color: #e04e4e;
}

.divider {
    width: 100%;
    border: 1px solid #555;
    margin: 6px 0; /* Reduced margin */
}

.product-detail {
    display: flex;
    justify-content: space-between;
    padding: 8px; /* Adjusted padding */
    background-color: #444444;
    border-radius: 6px;
    margin-bottom: 2px; /* Reduced margin */
}

.product-image {
    flex: 3;
}

.product-image img {
    border-radius: 6px;
    background-color: #cfcccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    width: 80px; /* Adjusted width */
    height: 80px; /* Adjusted height */
}

.product-info {
    flex: 7;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    /* justify-content: flex-start; */

    justify-content: center;  
    align-items: flex-start;
}

.product-name {
    font-weight: bold;
    font-size: 0.9em; /* Reduced font size */
}

.product-dimensions {
    font-size: 0.8em; /* Adjust size for better readability */
}

.property-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 10px; /* Adjusted padding */
    font-size: 0.9em; /* Reduced font size */
    font-weight: bold;
    margin-bottom: 5px;
}

.reset-btn {
    background-color: #5f5f5f;
    border: none;
    color: #fff;
    padding: 4px 8px; /* Adjusted button size */
    border-radius: 5px;
    cursor: pointer;
}

.reset-btn:hover {
    background-color: #484848;
}

.size-lock {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #444;
    padding: 4px 12px; /* Adjusted padding */
    border-radius: 5px;
    font-size: 0.9em;
    margin-bottom: 6px;
}

.input-section {
    overflow-y: auto;
    margin: 0px; /* Adjusted margin */
}

.input-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9em; /* Adjusted font size */
    padding: 6px 0; /* Adjusted padding */
}

.input-field {
    padding: 4px; /* Adjusted padding */
    font-size: 0.9em; /* Adjusted font size */
    background-color: #444;
    color: #fff;
    border: 1px solid #666;
    border-radius: 5px;
    width: 100px;
}

input[type="range"] {
    width: 100%;
    height: 6px;
    background: #777;
    border-radius: 5px;
    outline: none;
}

input[type="range"]:focus {
    background: #666;
}

/* 화살표 기본 스타일 */
.arrow {
    transition: transform 0.3s ease;
    font-size:1em; /* 화살표 크기 */
    display: inline-block;
    margin-left: 10px; /* 텍스트와 화살표 간의 여백 */
}

/* 화살표가 회전할 때 적용할 클래스 */
.arrow-rotated {
    transform: rotate(180deg); /* 화살표 아래로 회전 */
}

    /* 섹션 헤더 스타일 */
.section-header {
    cursor: pointer;
    background-color: #444;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    height: 40px;
    margin-bottom: 6px;
}

.section-header:hover {
    background-color: #4d4d4d;
    box-shadow: -4px 0 10px rgba(0, 0, 0, 0.5);

}

.section-header p {
    margin: 0;
    line-height: 1.2;
}
    

/* 섹션이 접힐 때 */
.section-content {
  max-height: 0;
  padding: 0 10px;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, padding 0.3s ease-in-out;
}

/* 섹션이 펼쳐졌을 때 */
.section-content.expanded {
  max-height: 1000px; /* 충분히 큰 값으로 설정 */
  opacity: 1;
  padding: 10px;
}


</style>
