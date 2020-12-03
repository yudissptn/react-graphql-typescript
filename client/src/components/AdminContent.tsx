import React from "react";
import { withApollo } from "../utils/withApollo";
import { Flex, Text } from "@chakra-ui/react";
import AdminMainContent from "./AdminMainContent";

interface AdminContentProps {
  contentSelected: string;
}

const AdminContent: React.FC<AdminContentProps> = ({ contentSelected }) => {
  let showedContent;

  switch (contentSelected) {
    case "addadmin":
      showedContent = <Text>This is add admin</Text>;
      break;
    case "topup":
      showedContent = <Text>This is topup</Text>;
      break;
    default:
      showedContent = <AdminMainContent />;
  }

  return (
    <Flex grow={1} borderTopWidth={"4px"} borderColor={"teal.600"} p={5}>
      {showedContent}
    </Flex>
  );
};

export default withApollo({ ssr: false })(AdminContent);
