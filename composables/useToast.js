import { ref } from "vue";

export function useToast() {
  const showToast = ref(false);
  const toastMessage = ref("");
  const toastType = ref("success");

  function showTempToast(message, type = "success", duration = 5000) {
    toastMessage.value = message;
    toastType.value = type;
    showToast.value = true;
    setTimeout(() => (showToast.value = false), duration);
  }

  return {
    showToast,
    toastMessage,
    toastType,
    showTempToast,
  };
}
