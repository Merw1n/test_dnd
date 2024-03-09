import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { WidgetItem } from "../../components";

import { ITEMS } from "../../../constants/Items";
import { CATEGORIES } from "../../../constants/Categories";

const Dashboard = () => {
  const [categories, setCategories] = useState(CATEGORIES);
  const [items, setItems] = useState(ITEMS);

  const onDeleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const rearangeArr = (arr, sourceIndex, destIndex) => {
    const arrCopy = [...arr];
    const [removed] = arrCopy.splice(sourceIndex, 1);
    arrCopy.splice(destIndex, 0, removed);

    return arrCopy;
  };

  const onDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === "Categories") {
      setCategories(rearangeArr(categories, source.index, destination.index));
    } else if (destination.droppableId !== source.droppableId) {
      setItems((items) =>
        items.map((item) =>
          item.id === parseInt(result.draggableId)
            ? {
                ...item,
                category: parseInt(result.destination.droppableId),
              }
            : item
        )
      );
    } else {
      setItems(rearangeArr(items, source.index, destination.index));
    }
  };

  return (
    <Box className="container py-5" p="50px">
      <DragDropContext onDragEnd={onDragEnd}>
        <Box>
          <Droppable droppableId="Categories" type="droppableItem">
            {(provided) => (
              <Flex ref={provided.innerRef} gap="25px">
                {categories.map((category, index) => (
                  <Draggable
                    draggableId={`category-${category.id}`}
                    key={`category-${category.id}`}
                    index={index}
                  >
                    {(parentProvider) => (
                      <Box
                        minWidth="250px"
                        p="16px"
                        border="1px solid"
                        borderColor="teal"
                        borderRadius="12px"
                        ref={parentProvider.innerRef}
                        {...parentProvider.draggableProps}
                      >
                        <Droppable droppableId={category.id.toString()}>
                          {(provided) => (
                            <Box ref={provided.innerRef}>
                              <Flex flexDirection="column" gap="12px">
                                <Text fontSize="18px" fontWeight="bold">
                                  {category.name}
                                </Text>
                                {items
                                  .filter(
                                    (item) => item.category === category.id
                                  )
                                  .map((item, index) => (
                                    <Draggable
                                      draggableId={item.id.toString()}
                                      key={item.id}
                                      index={index}
                                    >
                                      {(provided) => (
                                        <Box
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <WidgetItem item={item} onDeleteItem={onDeleteItem}/>
                                        </Box>
                                      )}
                                    </Draggable>
                                  ))}
                                {provided.placeholder}
                              </Flex>
                            </Box>
                          )}
                        </Droppable>
                      </Box>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </Flex>
            )}
          </Droppable>
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default Dashboard;
