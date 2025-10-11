import type { Ref } from "vue";

export async function fetchData(url: string, state: Ref<any>) {
  try {
    const response = await fetch(url);
    state.value = await response.json();
  } catch (error) {
    console.error(error);
  }
}