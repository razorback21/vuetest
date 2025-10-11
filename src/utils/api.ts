import type { Ref } from "vue";

export async function fetchData(url: string, state: Ref<any>) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    state.value = data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
