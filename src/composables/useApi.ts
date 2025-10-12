import type { Ref } from "vue";

export default function useApi() {
  async function fetchData(url: string, state: Ref<any>) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      state.value = data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  return {
    fetchData,
  };
}
