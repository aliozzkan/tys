import { MaterialCommunityIcons } from "@expo/vector-icons";
import Moment from "moment";
import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import { FlatList } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Box, IssueFlatList, Text } from "../";
import { useAuth, useRedux } from "../../hooks/redux-hooks";
import { ILegal } from "../../models/timeline";
import { Hooks } from "../../services";
import LegalIssueItem from "./LegalIssueItem";

interface LegalIssueListProps {
  filterData?: any;
  searchQuery: string;
}
interface LegalIssueListHandles {
  onRefresh: () => void;
  goToday: () => void;
  goUndone: () => void;
}

const LegalIssueList = forwardRef<LegalIssueListHandles, LegalIssueListProps>(
  (props, ref) => {
    const { project } = useAuth();
    const timelineManager = Hooks.LegalTimeline();
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
          data.forEach((item: ILegal, currIndex: number) => {
            if (!item.isCompleted) {
              var undoneItem: ILegal = data[undoneIndex];
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

      const index = getIndex(timelineManager.data?.data.data);
      if (
        !!data &&
        data.length > 0 &&
        index !== undefined &&
        !isNaN(index) &&
        index >= -1
      ) {
        scrollRef.current?.scrollToOffset({
          animated: true,
          offset: index * (RFValue(300) + 16),
        });
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
        !!data &&
        data.length > 0 &&
        index !== undefined &&
        !isNaN(index) &&
        index >= -1
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

    function onFilter(item: ILegal) {
      if (props.filterData) {
        const { userTypes, legalStatus, completeTypes } = props.filterData;
        const filters = [];

        if (completeTypes?.length > 0) {
          filters.push(completeTypes.includes(item.isCompleted ? 1 : 2));
        }
        if (legalStatus?.length > 0) {
          filters.push(legalStatus.includes(item.status));
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

    function onSearchFilter(item: ILegal) {
      if (
        item.inventoryName
          .toLowerCase()
          .includes(props.searchQuery.toLowerCase())
      ) {
        return true;
      }
      return false;
    }

    function onCampusFilter(item: ILegal) {
      if(selectedCampus.id === -1) return true;
      
      return selectedCampus.id === item.campusID;
      
    }

    return !timelineManager.isFullfilled || (!!data && data.length > 0) ? (
      <IssueFlatList
        ItemComponent={LegalIssueItem}
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
  }
);

export default LegalIssueList;
