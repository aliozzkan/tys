import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import { useAuth, useRedux } from "../../hooks/redux-hooks";
import { Hooks } from "../../services";
import Box from "../atoms/Box";
import IssueFlatList from "../atoms/IssueFlatList";
import ControlTaskItem from "./ControlTaskItem";
import { FlatList, Text } from "react-native";
import CounterItem from "./CounterItem";
import { RFValue } from "react-native-responsive-fontsize";
import Moment from "moment";
import { ICounter } from "../../models/timeline";

interface Props {
  filterData: any;
  searchQuery: string;
}
interface Handles {
  onRefresh: () => void;
  goToday: () => void;
  goUndone: () => void;
}

const CounterList = forwardRef<Handles, Props>((props, ref) => {
  const { project, user } = useAuth();
  const timelineManager = Hooks.CounterTaskTimeline();
  const scrollRef = useRef<FlatList>(null);
  const [
    {
      app: { selectedCampus },
    },
  ] = useRedux();

  function _getList() {
    timelineManager.fetch(project.id);
  }

  useLayoutEffect(() => {
    _getList();
  }, []);

  const data = props.filterData
    ? timelineManager.data?.data.data.filter(onFilter).filter(onSearchFilter)
    : timelineManager.data?.data.data.filter(onSearchFilter);

  function _goUndone() {
    function getIndex(data: any[]) {
      let undoneIndex = 0;
      if (!!data) {
        data.forEach((item: ICounter, currIndex: number) => {
          if (!item.isCompleted) {
            var undoneItem: ICounter = data[undoneIndex];
            if (undoneItem.isCompleted) {
              undoneIndex = currIndex;
            } else if (
              Moment(undoneItem.endDate).diff(item.endDate, "seconds") > 0
            ) {
              undoneIndex = currIndex;
            }
          }
        });
      }
      return undoneIndex;
    }

    const index = getIndex(data);
    if (
      Array.isArray(data) &&
      data?.length > 0 &&
      index !== undefined &&
      !isNaN(index) &&
      index >= 0
    ) {
      scrollRef.current?.scrollToOffset({
        animated: true,
        offset: index * (RFValue(300) + 16),
      });
    }
  }

  function _goToday() {
    function getTodayIndex() {
      if (!!data) {
        let index = 0;
        let closeIndex = 0;
        let close = 0;
        while (index < data.length) {
          const item = data[index];
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
      Array.isArray(data) &&
      data?.length > 0 &&
      index !== undefined &&
      !isNaN(index)
    ) {
      scrollRef.current?.scrollToOffset({
        animated: true,
        offset: index * (RFValue(300) + 16),
      });
    }
  }

  useImperativeHandle(ref, () => ({
    onRefresh: _getList,
    goToday: _goToday,
    goUndone: _goUndone,
  }));

  function onFilter(item: ICounter) {
    if (props.filterData) {
      const { userTypes, completeTypes, onlyMe, counterTypes } =
        props.filterData;
      const filters = [];

      if (completeTypes?.length > 0) {
        filters.push(completeTypes.includes(item.isCompleted ? 1 : 2));
      }

      if (counterTypes?.length > 0) {
        filters.push(counterTypes.includes(item.counterTypeId));
      }

      if (filters.length === 0) return true;

      return !filters.includes(false);
    } else {
      return true;
    }
  }

  function onSearchFilter(item: ICounter) {
    if (item.location.toLowerCase().includes(props.searchQuery.toLowerCase())) {
      return true;
    }
    return false;
  }

  return !timelineManager.isFullfilled || (!!data && data.length > 0) ? (
    <IssueFlatList
      ItemComponent={CounterItem}
      refreshing={timelineManager.isPending}
      onRefresh={_getList}
      data={data}
      scrollRef={scrollRef}
    />
  ) : (
    <Box flex={1} alignItems="center" justifyContent="center">
      <MaterialCommunityIcons name="box-shadow" size={70} />
      <Text>Veri Bulunamadı!</Text>
    </Box>
  );
});

export default CounterList;
