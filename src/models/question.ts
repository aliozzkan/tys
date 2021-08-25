export interface Question {
  Id: number;
  Question: string;
  SelectedItem: string;
  isDone: boolean;
  QuestionType: number;
  InitialValue: any;
  EndValue: any;
  trueFalseAnswer: any;
}
