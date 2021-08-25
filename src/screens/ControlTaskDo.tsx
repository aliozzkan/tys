import React, { useLayoutEffect, useEffect, useState } from "react";
import { ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import {
  Container,
  Box,
  Text,
  Divider,
  FileSelector,
  Button,
} from "../components";
import { Hooks } from "../services";
import { ControlTaskIssueStackProps as PageProps } from "../navigations/stacks/ControlTask/ControlTaskDoStack";
import TextInput from "../components/molecules/TextInput";
import { useAuth } from "../hooks/redux-hooks";

const ControlTaskDo = (props: PageProps<"ControlTaskDo">) => {
  const { user, project } = useAuth();
  const [questions, setQuestions] = useState<any>(null);
  const questionManager = Hooks.QuestionList();
  const doManager = Hooks.DoControlTask();

  useLayoutEffect(() => {
    questionManager.fetch(props.route.params.data.controlQuestionGroupID);
  }, []);

  useEffect(() => {
    if (questionManager.data) {
      let data: any[] = [];
      questionManager.data.data.data.forEach((quest: any, index: number) => {
        data.push({
          Id: quest.id,
          Question: quest.question,
          SelectedItem: null,
          isDone: true,
          QuestionType: quest.controlQuestionTypeID,
          InitialValue: quest.initialValue,
          EndValue: quest.endValue,
          Note: "",
          trueFalseAnswer: quest.trueFalseAnswer,
          files: [],
        });
      });
      setQuestions(data);
    }
  }, [questionManager.data]);

  async function handleClickComplete() {
    await doManager.fetch({
      answer: JSON.stringify(
        questions.map((question: any) => ({
          question: question.Question,
          answer: question.SelectedItem,
          note: question.Note,
          id: question.Id,
        }))
      ),
      controlID: props.route.params.data.controlId,
      controlTaskMaintenanceID:
        props.route.params.data.controlTaskMaintenanceID,
      completedUserID: user.id,
      completedUserName: `${user.name} ${user.surname}`,
      state: true,
      explain: "",
      projectID: project.id,
      documents: [...questions.map((question: any) => question.files)].flat(),
    });
  }

  useEffect(() => {
    if (doManager.data?.data.success === true) {
      Alert.alert(
        "Başarılı!",
        "Bakım başarıyla gerçekleşti.",
        [
          {
            text: "Tamam",
            onPress: () => {
              props.navigation.goBack();
            },
          },
        ],
        {
          onDismiss: () => {
            props.navigation.goBack();
          },
        }
      );
    } else if (doManager.isRejected || doManager.data?.data.success === false) {
      Alert.alert(
        "Hata!",
        doManager.data?.data.message || "Bakım yapılırken hata gerçekleşti",
        [
          {
            text: "Tamam",
            onPress: () => {
              doManager.onReset();
            },
          },
        ]
      );
    }
  }, [doManager.data?.data.success]);

  if (questions === null) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    );
  }
  return (
    <Container keyboardable scrollabe>
      {questions.map((question: any, index: number) => (
        <ControlQuestion
          question={question}
          key={index}
          onChange={(question) => {
            const tmp = [...questions];
            tmp[index] = question;
            setQuestions(tmp);
          }}
        />
      ))}
      <Button
        colorScheme="blue"
        label="Denetim Yap"
        isLoading={doManager.isPending}
        onPress={handleClickComplete}
      />
      <Box height={100} />
    </Container>
  );
};

export enum ControlAnswer {
  cantAgree = "Kabul Edilemez",
  canDevelop = "Geliştirilebilir",
  good = "İyi",
  notInterest = "İlgili değil",
}

const answers = [
  {
    title: "Kabul Edilemez",
    value: ControlAnswer.cantAgree,
    isNegative: true,
    color: "red",
  },
  {
    title: "Geliştirilebilir",
    value: ControlAnswer.canDevelop,
    isNegative: false,
    color: "orange",
  },
  {
    title: "İyi",
    value: ControlAnswer.good,
    isNegative: false,
    color: "green",
  },
  {
    title: "İlgili Değil",
    value: ControlAnswer.notInterest,
    isNegative: true,
    color: "gray",
  },
];

interface ControlQuestionProps {
  question: any;
  onChange: (question: any) => void;
}

const ControlQuestion = (props: ControlQuestionProps) => {
  return (
    <Box
      backgroundColor="white"
      p="m"
      m="m"
      marginBottom="zero"
      borderRadius="s"
    >
      <Text variant="bodyHeader">{props.question.Question}</Text>
      <Divider />
      {answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            let tmp = { ...props.question };
            tmp.SelectedItem = answer.value;
            props.onChange(tmp);
          }}
        >
          <Box
            borderWidth={1}
            backgroundColor={
              props.question.SelectedItem === answer.value
                ? (`${answer.color}.200` as any)
                : "transparent"
            }
            borderColor={`${answer.color}.400` as any}
            p="m"
            mb="xs"
          >
            <Text color={`${answer.color}.800` as any}>{answer.title}</Text>
          </Box>
        </TouchableOpacity>
      ))}

      <Box mt="s">
        <TextInput
          label="Soru Notu"
          onChangeText={(txt) => {
            let tmp = { ...props.question };
            tmp.Note = txt;
            props.onChange(tmp);
          }}
          value={props.question.Note}
        />
      </Box>

      {!!answers.find((answer) => answer.value === props.question.SelectedItem)
        ?.isNegative && (
        <Box mt="m">
          <FileSelector
            onChange={(files) => {
              let tmp = { ...props.question };
              tmp.files = files.map((_file) => ({
                base64: _file.base64,
                extension: "jpeg",
                questionId: `${props.question.Id}`,
              }));
              props.onChange(tmp);
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ControlTaskDo;
