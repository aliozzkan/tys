import React, { Fragment, useEffect, useLayoutEffect } from "react";
import { Box, Text } from "../components";
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Hooks } from "../services";
import { useAuth } from "../hooks/redux-hooks";
import { Authenticator } from "../helper/authenticator";
import { Feather } from "@expo/vector-icons";

const ProjectSelect = () => {
  const projectsManager = Hooks.ProjectList();
  const { user, token } = useAuth();

  useLayoutEffect(() => {
    projectsManager.fetch(user.id);
  }, []);

  useEffect(() => {
    if (projectsManager.isFullfilled) {
      if (!!projectsManager.data?.data.data && projectsManager.data?.data.data.length === 1) {
        Authenticator.SetProject(
          token,
          user,
          projectsManager.data?.data.data[0]
        );
      }
    }
  }, [projectsManager.status]);

  return (
    <Fragment>
      {!!projectsManager.data?.data?.data?.length &&
      projectsManager.data?.data.data.length > 1 ? (
        <SafeAreaView>
        <Box>
          <Box p="m">
            <Text variant="header">Proje Seçimi</Text>
          </Box>
          {projectsManager.data?.data.data.map((project, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                Authenticator.SetProject(token, user, project);
              }}
            >
              <Box
                p="m"
                backgroundColor="gray.100"
                borderRadius="s"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mb="m"
                mx="m"
              >
                <Text variant="bodyHeader">{project.name}</Text>
                <Feather name="arrow-right" size={20} />
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
        </SafeAreaView>
      ) : (
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </Box>
      )}
    </Fragment>
  );
};

export default ProjectSelect;
