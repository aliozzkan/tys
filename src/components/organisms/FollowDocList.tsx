import React, {
  useLayoutEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { FlatList, RefreshControl } from "react-native";
import { Box, IssueFlatList, Text } from "../";
import { useAuth, useRedux } from "../../hooks/redux-hooks";
import { IFollowDoc } from "../../models/timeline";
import { Hooks } from "../../services";
import { spacing } from "../../theme";
import FollowDocItem from "./FollowDocItem";
import Moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface FollowDocListProps {
  filterData: any;
  searchQuery: string;
}
interface FollowDocListHandles {
  onRefresh: () => void;
  goToday: () => void;
  goUndone: () => void;
}

const FollowDocList = forwardRef<FollowDocListHandles, FollowDocListProps>(
  (props, ref) => {
    const { project, user } = useAuth();
    const timelineManager = Hooks.DocumentTimeline();
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
          data.forEach((item: IFollowDoc, currIndex: number) => {
            if (!item.isCompleted) {
              var undoneItem: IFollowDoc = data[undoneIndex];
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
        data &&
        data.length > 0 &&
        index !== undefined &&
        !isNaN(index) &&
        index >= -1
      ) {
        scrollRef.current?.scrollToOffset({
          animated: true,
          offset: index * (RFValue(235) + 16),
        });
      }
    }

    function _goToday() {
      function getTodayIndex() {
        if (!!timelineManager.data?.data.data) {
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
        data &&
        data.length > 0 &&
        index !== undefined &&
        !isNaN(index) &&
        index >= -1
      ) {
        scrollRef.current?.scrollToOffset({
          animated: true,
          offset: index * (RFValue(235) + 16),
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

    function onFilter(item: IFollowDoc) {
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
          filters.push((item as any).assignUserID === user.id);
        }

        if (filters.length === 0) return true;

        return !filters.includes(false);
      } else {
        return true;
      }
    }

    function onSearchFilter(item: IFollowDoc) {
      if (
        item.documentName
          .toLowerCase()
          .includes(props.searchQuery.toLowerCase())
      ) {
        return true;
      }
      return false;
    }

    function onCampusFilter(item: IFollowDoc) {
      if(selectedCampus.id === -1) return true;
      
      return item.campusID === selectedCampus.id;
    }

    return !timelineManager.isFullfilled || (!!data && data.length > 0) ? (
      <IssueFlatList
        ItemComponent={FollowDocItem}
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

export default FollowDocList;
