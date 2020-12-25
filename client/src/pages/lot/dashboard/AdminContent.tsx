import React from "react";
import { withApollo } from "../../../utils/withApollo";
import { Flex } from "@chakra-ui/react";
import AdminMainContent from "./AdminMainContent";
import AdminTopUp from "./AdminTopUp";
import AdminAddAdmin from "./AdminAddAdmin";

interface AdminContentProps {
  contentSelected: string;
  admin: string;
}

const AdminContent: React.FC<AdminContentProps> = ({
  contentSelected,
  admin,
}) => {
  let showedContent;

  switch (contentSelected) {
    case "addadmin":
      showedContent = <AdminAddAdmin admin={admin} />;
      break;
    case "topup":
      showedContent = <AdminTopUp admin={admin} />;
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
