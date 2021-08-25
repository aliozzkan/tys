import React, { FC, useLayoutEffect, useState, useEffect } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TextInput as RNTextInput,
} from "react-native";
import { Box, Card, Text } from "../";
import { Question as IQuestion } from "../../models/question";
import { Hooks } from "../../services";
import TextInput from "../molecules/TextInput";

interface Props {
  maintenanceId: number;
  onChange?: (questions: IQuestion[]) => void
}

const MaintenanceIssueQuestions: FC<Props> = (props) => {
  const questionsManager = Hooks.ListMaintenanceQuestion();
  const [questions, setQuestions] = useState<IQuestion[] | null>(null);


  useEffect(() => {
    if(props.onChange && !!questions) {
      props.onChange(questions);
    }
  }, [questions]);

  useEffect(() => {
    if (questionsManager.data) {
      let data: any[] = [];
      questionsManager.data?.data.data.forEach((quest: any, index: number) => {
        data.push({
          Id: quest.id,
          Question: quest.question,
          SelectedItem: null,
          isDone: true,
          QuestionType: quest.maintenanceQuestionTypeID,
          InitialValue: quest.initialValue,
          EndValue: quest.endValue,
          trueFalseAnswer: quest.trueFalseAnswer,
        });
      });
      setQuestions(data);
    }
  }, [questionsManager.data]);


  useLayoutEffect(() => {
    questionsManager.fetch(props.maintenanceId);
  }, []);

  if (questions === null) {
    return (
      <Box justifyContent="center" alignItems="center" p="l">
        <ActivityIndicator />
      </Box>
    );
  }

  return (
    <Box>
      {questions.map((quest, index) => (
        <Box key={index} mb="s">
          <Text mb="xs">{quest.Question}</Text>
          {quest.QuestionType === 2 && (
            <Box flexDirection="row">
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  const tmpQuestion = [...questions];
                  questions[index].SelectedItem = "Yes";
                  setQuestions(tmpQuestion);
                }}
              >
                <Box
                  backgroundColor={
                    quest.SelectedItem === "Yes" ? "green.400" : "transparent"
                  }
                  borderWidth={1}
                  height={40}
                  borderColor="green.500"
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text
                    color={quest.SelectedItem === "Yes" ? "white" : "green.500"}
                  >
                    Evet
                  </Text>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1, marginLeft: 5 }}
                onPress={() => {
                  const tmpQuestion = [...questions];
                  questions[index].SelectedItem = "No";
                  setQuestions(tmpQuestion);
                }}
              >
                <Box
                  backgroundColor={
                    quest.SelectedItem === "No" ? "red.400" : "transparent"
                  }
                  borderWidth={1}
                  borderColor="red.500"
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                  height={40}
                >
                  <Text
                    color={quest.SelectedItem === "No" ? "white" : "red.500"}
                  >
                    Hayır
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
          )}
          {quest.QuestionType === 1 && (
            <Box backgroundColor="gray.200" borderRadius="s">
              <RNTextInput
                placeholder="Değer Giriniz..."
                style={{ padding: 15 }}
                collapsable
                keyboardType="number-pad"
                onChangeText={(text) => {
                  const tmpQuestion = [...questions];
                  questions[index].SelectedItem = text;
                  setQuestions(tmpQuestion);
                }}
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default MaintenanceIssueQuestions;
