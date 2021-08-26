import React, {
  useLayoutEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { FlatList, RefreshControl } from "react-native";
import { Box, IssueFlatList, Text } from "../";
import { useAuth } from "../../hooks/redux-hooks";
import { IMaintenanceIssue } from "../../models/timeline";
import { Hooks } from "../../services";
import { spacing } from "../../theme";
import MaintenanceIssueItem from "./MaintenanceIssueItem";
import Moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface MaintenanceIssueListProps {
  filterData?: any;
}
interface MaintenanceIssueListHandles {
  onRefresh: () => void;
  goToday: () => void;
  goUndone: () => void;
}

const MaintenanceIssueList = forwardRef<
  MaintenanceIssueListHandles,
  MaintenanceIssueListProps
>((props, ref) => {
  const { project } = useAuth();
  const scrollRef = useRef<FlatList>(null);
  const timelineManager = Hooks.MaintenanceTimeline();

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
        data.forEach((item: IMaintenanceIssue, currIndex: number) => {
          if (!item.isMaintenanceComplete) {
            var undoneItem: IMaintenanceIssue = data[undoneIndex];
            if (
              undoneItem.isMaintenanceComplete ||
              Moment(undoneItem.endDate).diff(item.endDate, "seconds") > 0
            ) {
              undoneIndex = currIndex;
            }
          }
        });
      }
      return undoneIndex;
    }

    const index = getIndex(timelineManager.data?.data.data);
    if (
      data &&
      data?.length > 0 &&
      index !== undefined &&
      !isNaN(index) &&
      index >= 0
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
      index >= 0
    ) {
      scrollRef.current?.scrollToIndex({ index, animated: true });
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

  function onFilter(item: IMaintenanceIssue) {
    if (props.filterData) {
      const {
        maintenanceStatus,
        maintenanceTypes,
        periods,
        userTypes,
        completeTypes,
      } = props.filterData;
      const filters = [];

      if (maintenanceStatus?.length > 0) {
        filters.push(
          maintenanceStatus.includes(item.maintenanceTransactionStatus)
        );
      }
      if (completeTypes?.length > 0) {
        filters.push(completeTypes.includes(item.isMaintenanceComplete ? 1 : 2));
      }
      if (maintenanceTypes?.length > 0) {
        filters.push(maintenanceTypes.includes(item.maintenanceTypeID));
      }
      if (periods?.length > 0) {
        filters.push(periods.includes(item.maintenancePeriodID));
      }
      if (userTypes?.length > 0) {
        filters.push(userTypes.includes(item.userTypeId));
      }

      if (filters.length === 0) return true;

      return !filters.includes(false);
    } else {
      return true;
    }
  }

  return !timelineManager.isFullfilled || (!!data && data.length > 0) ? (
    <IssueFlatList
      ItemComponent={MaintenanceIssueItem}
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

export default MaintenanceIssueList;
