<template>
    <div v-if="true" class="modal-overlay">
      <div class="modal">
        <span class="tag">Car in fog <span>5 ideas</span></span>
        
        <h2>Share Board</h2>
        <p>People with link will be able to view conversations and ideas in this board. Changes you make after creating the link will remain private.</p>
        
        <div class="link-container">
          <input type="text" :value="shareLink" readonly>
          <button @click="copyToClipboard">📋</button>
        </div>
        
        <div class="button-group">
          <button class="button stop-share" @click="closeModal">Stop Share</button>
          <button class="button update-copy">⬇ Update & Copy Link</button>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      isOpen: true,
      shareLink: "https://heyli.ai/share/board/2ca81142-563c-4352-81bc-afa3a..."
    };
  },
  methods: {
    closeModal() {
      this.isOpen = false;
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.shareLink);
      alert("Link copied to clipboard!");
    }
  }
};
</script>

<style>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: rgba(50, 50, 50, 0.8);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 15px;
  width: 350px;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}
.tag {
  display: inline-block;
  font-size: 12px;
  background: #444;
  padding: 5px 10px;
  border-radius: 15px;
  margin-bottom: 10px;
}
.modal h2 {
  font-size: 18px;
  margin: 10px 0;
}
.modal p {
  font-size: 14px;
  color: #ccc;
}
.link-container {
  margin-top: 10px;
  background: #555;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.link-container input {
  background: transparent;
  border: none;
  color: #ddd;
  width: 100%;
  outline: none;
}
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.button {
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
.stop-share {
  background: #666;
  color: white;
}
.update-copy {
  background: #888;
  color: white;
}
</style>