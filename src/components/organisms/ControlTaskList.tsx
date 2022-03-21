import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import { FlatList } from "react-native";
import { Box, IssueFlatList, Text } from "../";
import { useAuth, useRedux } from "../../hooks/redux-hooks";
import { IControlTask } from "../../models/timeline";
import { Hooks } from "../../services";
import ControlTaskItem from "./ControlTaskItem";
import Moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  filterData: any;
  searchQuery: string;
}
interface Handles {
  onRefresh: () => void;
  goToday: () => void;
  goUndone: () => void;
}

const ControlTaskList = forwardRef<Handles, Props>((props, ref) => {
  const { project, user } = useAuth();
  const timelineManager = Hooks.ControlTaskTimeline();
  const scrollRef = useRef<FlatList>(null);
  const [
    {
      app: { selectedCampus },
    },
  ] = useRedux();

  function _getList() {
    timelineManager.fetch(project.id);
  }

  const data = props.filterData
    ? timelineManager.data?.data.data.filter(onFilter).filter(onSearchFilter).filter(onCampusFilter)
    : timelineManager.data?.data.data.filter(onSearchFilter).filter(onCampusFilter);

  function _goUndone() {
    function getIndex(data: any[]) {
      let undoneIndex = 0;
      if (!!data) {
        data.forEach((item: IControlTask, currIndex: number) => {
          if (!item.isCompleted) {
            var undoneItem: IControlTask = data[undoneIndex];
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

  useLayoutEffect(() => {
    _getList();
  }, []);

  useImperativeHandle(ref, () => ({
    onRefresh: _getList,
    goToday: _goToday,
    goUndone: _goUndone,
  }));

  function onFilter(item: IControlTask) {
    if (props.filterData) {
      const { userTypes, completeTypes, onlyMe } = props.filterData;
      const filters = [];

      if (completeTypes?.length > 0) {
        filters.push(completeTypes.includes(item.isCompleted ? 1 : 2));
      }
      if (userTypes?.length > 0) {
        filters.push(userTypes.includes(item.userTypeID));
      }
      if(onlyMe?.length > 0) {
        filters.push((item as any).userID === user.id)
      }


      if (filters.length === 0) return true;

      return !filters.includes(false);
    } else {
      return true;
    }
  }

  function onSearchFilter(item: IControlTask) {
    if (
      item.controlName.toLowerCase().includes(props.searchQuery.toLowerCase())
    ) {
      return true;
    }
    return false;
  }

  function onCampusFilter(item: IControlTask) {
    if(selectedCampus.id === -1) {
      return true;
    } 

    return item.campusID === selectedCampus.id;
  }

  return !timelineManager.isFullfilled || (!!data && data.length > 0) ? (
    <IssueFlatList
      ItemComponent={ControlTaskItem}
      refreshing={timelineManager.isPending}
      onRefresh={_getList}
      scrollRef={scrollRef}
      data={data}
    />
  ) : (
    <Box flex={1} alignItems="center" justifyContent="center">
      <MaterialCommunityIcons name="box-shadow" size={70} />
      <Text>Veri Bulunamadı!</Text>
    </Box>
  );
});

export default ControlTaskList;
