import { Flex, Icon, Text } from "@chakra-ui/react";
import { TrashIcon } from "../../../assets";

const WidgetItem = ({item, onDeleteItem}) => {
  return (
    <Flex
      width="full"
      bg="lightgrey"
      padding="12px"
      borderRadius="12px"
      color="teal"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text>{item.name}</Text>
      <Icon
        as={TrashIcon}
        boxSize="16px"
        color="red"
        cursor="pointer"
        onClick={() => onDeleteItem(item.id)}
      />
    </Flex>
  );
};

export default WidgetItem
