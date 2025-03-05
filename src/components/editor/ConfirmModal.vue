<template>
    <div v-if="isConfirmVisible" id="customConfirm" class="confirm-modal hidden">
        <div class="modal-content">
            <p>Are you sure you want to proceed?</p>
            <div class="buttons">
            <button id="confirmYes">확인</button>
            <button id="confirmNo" @click="confirmCancle">취소</button>
            </div>
        </div>
    </div>
</template>

<script scope>
export default {
    props: {
        isConfirmVisible: Boolean,
        confirmCancle: Function
    },
    data() {
        return {
        activeTooltip: null // 툴팁을 관리하는 변수
        };
    },
}
</script>

<style scope>
.confirm-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: rgba(109, 103, 103, 0.5);
  width: 20%;
  height: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #fff;
  font-size: 1em;
  font-weight: bold;
}

.buttons {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:nth-child(1) {
  background-color: #4caf50;
  color: white;
}

button:nth-child(2) {
  background-color: #f44336;
  color: white;
}
</style>