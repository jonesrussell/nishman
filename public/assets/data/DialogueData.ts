export default interface DialogueData {
  id: string;
  lines: string[];
  metadata: {
    npcName: string;
    conditions: {
      level: number;
      questCompleted?: string;
    };
  };
}