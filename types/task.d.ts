export {};

declare global {
  export interface IParsingTask {
    id: string;
    date: Date;
    status: boolean;
    groupId: number;
    tableName: string;
  }
}
