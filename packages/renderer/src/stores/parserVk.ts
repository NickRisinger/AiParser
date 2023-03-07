import {ref} from 'vue';
import {defineStore} from 'pinia';

export const useParserVkStore = defineStore('parserVk', () => {
  const parsersTasks = ref<{groupId: number; tableName: string}[]>([]);

  const addTaskParsing = async (id: number, tableName: string) => {
    parsersTasks.value.push({groupId: id, tableName});
  };

  return {parsersTasks, addTaskParsing};
});
