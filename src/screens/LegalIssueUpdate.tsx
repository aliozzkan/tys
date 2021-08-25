import React from "react";
import { Box, Text } from "../components";
import { DoLegalIssueStackProps } from "../navigations/stacks/LegalIssue/LegalIssueDoStack";
import LegalIssueUpdater from "../components/organisms/LegalIssueUpdater";

const LegalIssueUpdate = (props: DoLegalIssueStackProps<"Update">) => {
  return <LegalIssueUpdater data={props.route.params.data} />;
};

export default LegalIssueUpdate;
