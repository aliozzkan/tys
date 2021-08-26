import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import { Box, IssueFlatList } from "../";
import { useAuth } from "../../hooks/redux-hooks";
import { IDemand } from "../../models/timeline";
import { Hooks } from "../../services";
import Text from "../atoms/Text";
import DemandIssueItem from "./DemandIssueItem";
import Moment from "moment";
import { FlatList } from "react-native";

interface Props {
  filterData: any;
}
interface Handles {
  onRefresh: () => void;
  goToday: () => void;
  goUndone: () => void;
}

const DemandIssueList = forwardRef<Handles, Props>((props, ref) => {
  const { project } = useAuth();
  const timelineManager = Hooks.DemandTimeline();
  const scrollRef = useRef<FlatList>(null);

  function _getList() {
    timelineManager.fetch(project.id);
  }

  const data = props.filterData
    ? timelineManager.data?.data.data.filter(onFilter)
    : timelineManager.data?.data.data;

  function _goUndone() {
    function getIndex(data: any[]) {
      let undoneIndex = 0;
      if (!!data) {
        data.forEach((item: IDemand, currIndex: number) => {
          const itemCompleted = item.documents
            .map((_item) => _item.isCompleted)
            .includes(false);
          if (!itemCompleted) {
            var undoneItem: IDemand = data[undoneIndex];
            const undoneCompleted = undoneItem.documents
              .map((_item) => _item.isCompleted)
              .includes(false);
            undoneIndex = currIndex;
          }
        });
      }
      return undoneIndex;
    }

    const index = getIndex(timelineManager.data?.data.data);
    if (
      data &&
      data.length > 0 &&
      index !== undefined &&
      !isNaN(index) &&
      index >= -1
    ) {
      scrollRef.current?.scrollToIndex({ index, animated: true });
    }
  }

  function _goToday() {
    function getTodayIndex() {
      if (!!timelineManager.data?.data.data) {
        let index = 0;
        let closeIndex = 0;
        let close = 0;
        while (index < timelineManager.data.data.data.length) {
          const item = timelineManager.data.data.data[index];
          const day = Moment(item.endDate).diff(Moment(), "days") + 0;
          if (index === 0) {
            closeIndex = index;
            close = day;
          } else {
            if (0 - day < close) {
              closeIndex = index;
              close = day;
            }
          }
          index++;
        }
        return closeIndex;
      }
    }
    const index = getTodayIndex();
    if (
      data &&
      data.length > 0 &&
      index !== undefined &&
      !isNaN(index) &&
      index >= -1
    ) {
      scrollRef.current?.scrollToIndex({ index: index!, animated: true });
    }
  }

  useLayoutEffect(() => {
    _getList();
  }, []);

  useImperativeHandle(ref, () => ({
    onRefresh: _getList,
    goToday: _goToday,
    goUndone: _goUndone,
  }));

  function onFilter(item: IDemand) {
    if (props.filterData) {
      const { userTypes, demandGroup, completeTypes } = props.filterData;
      const isRequiredDoc = item.documents
        .map((doc) => doc.isCompleted)
        .includes(false);

      const filters = [];

      if (userTypes?.length > 0) {
        filters.push(userTypes.includes(item.userTypeID));
      }

      if(completeTypes?.length > 0) {
        const statu = !isRequiredDoc ? 1 : 2;
        filters.push(completeTypes.includes(statu));
        
      }

      if (demandGroup?.length > 0) {
        filters.push(demandGroup.includes(item.demandGroupID));
      }

      if (filters.length === 0) return true;

      return !filters.includes(false);
    } else {
      return true;
    }
  }

  return !timelineManager.isFullfilled || (!!data && data.length > 0) ? (
    <IssueFlatList
      ItemComponent={DemandIssueItem}
      refreshing={timelineManager.isPending}
      scrollRef={scrollRef}
      onRefresh={_getList}
      data={data}
    />
  ) : (
    <Box flex={1} alignItems="center" justifyContent="center">
      <MaterialCommunityIcons name="box-shadow" size={70} />
      <Text>Veri Bulunamadı!</Text>
    </Box>
  );
});

export default DemandIssueList;
