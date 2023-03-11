import {ref} from 'vue';
import {defineStore} from 'pinia';
import {v4 as uuidv4} from 'uuid';
import {startParsingVk} from '#preload';

export const useParserVkStore = defineStore('parserVk', () => {
  const parsersTasks = ref<IParsingTask[]>([]);

  const addTaskParsing = async (groupId: number, tableName: string) => {
    const task: IParsingTask = {
      id: uuidv4(),
      date: new Date(),
      status: true,
      groupId,
      tableName,
    };
    startParsingVk(task);
    parsersTasks.value.push(task);
  };

  const updateTaskParsing = (data: Partial<IParsingTask>) => {
    const index = parsersTasks.value.findIndex(task => task.id === data.id);
    if (index !== -1) {
      parsersTasks.value[index] = {...parsersTasks.value[index], ...data};
    }
  };

  return {parsersTasks, addTaskParsing, updateTaskParsing};
});
