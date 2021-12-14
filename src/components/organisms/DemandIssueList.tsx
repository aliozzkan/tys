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
import { useAuth, useRedux } from "../../hooks/redux-hooks";
import { IDemand } from "../../models/timeline";
import { Hooks } from "../../services";
import Text from "../atoms/Text";
import DemandIssueItem from "./DemandIssueItem";
import Moment from "moment";
import { FlatList } from "react-native";
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

const DemandIssueList = forwardRef<Handles, Props>((props, ref) => {
  const { project, user } = useAuth();
  const timelineManager = Hooks.DemandTimeline();
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
    ? timelineManager.data?.data.data
        .filter(onFilter)
        .filter(onSearchFilter)
        .filter(onCampusFilter)
    : timelineManager.data?.data.data
        .filter(onSearchFilter)
        .filter(onCampusFilter);

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
        offset: index * (RFValue(180) + 16),
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
      data &&
      data.length > 0 &&
      index !== undefined &&
      !isNaN(index) &&
      index >= -1
    ) {
      scrollRef.current?.scrollToOffset({
        animated: true,
        offset: index * (RFValue(180) + 16),
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

  function onFilter(item: IDemand) {
    if (props.filterData) {
      const { userTypes, demandGroup, completeTypes, onlyMe } =
        props.filterData;
      const isRequiredDoc = item.documents
        .map((doc) => doc.isCompleted)
        .includes(false);

      const filters = [];

      if (userTypes?.length > 0) {
        filters.push(userTypes.includes(item.userTypeID));
      }

      if (completeTypes?.length > 0) {
        const statu = !isRequiredDoc ? 1 : 2;
        filters.push(completeTypes.includes(statu));
      }

      if (demandGroup?.length > 0) {
        filters.push(demandGroup.includes(item.demandGroupID));
      }

      if (onlyMe?.length > 0) {
        let isAssign = false;
        item.documents.some((_document: any) => {
          if (_document.assignUserID === user.id) {
            isAssign = true;
            return true;
          }
        });

        filters.push(isAssign);
      }

      if (filters.length === 0) return true;

      return !filters.includes(false);
    } else {
      return true;
    }
  }

  function onSearchFilter(item: IDemand) {
    if (
      item.demandName.toLowerCase().includes(props.searchQuery.toLowerCase())
    ) {
      return true;
    }
    return false;
  }

  function onCampusFilter(item: IDemand) {
    if (selectedCampus.id === -1) return true;

    return item.campusID === selectedCampus.id;
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
