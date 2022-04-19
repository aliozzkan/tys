import {
  AuthApiFactory,
  Project,
  ProjectApiFactory,
  CampusApiFactory,
  Campus,
  BuildApiFactory,
  Build,
  FloorApiFactory,
  RoomApiFactory,
  Floor,
  Room,
  GroupApiFactory,
  Group,
  Brand,
  Model,
  InventoryApiFactory,
  UsersApiFactory,
  UserType,
  InventoryMaintenanceTypeApiFactory,
  MaintenanceCommonApiFactory,
  MaintenanceQuestionApiFactory,
  DocumentApiFactory,
  DemandApiFactory,
  InventoryCapacityApiFactory,
  MaintenanceReportApiFactory,
  InventoryMaintenanceDetailApiFactory,
  InventoryLegalInspectionApiFactory,
  ControlTaskApiFactory,
  CounterApiFactory,
} from "./swagger/api";
import { useFetchManager } from "../hooks/fetch-manager";
import axios, { AxiosInstance } from "axios";
import { store } from "../store";
import { __mode__, api } from "../constants";
import { IMaintenanceIssueDetail } from "../models/timeline";
import { IMaintenanceStatusDesc } from "../models/response";

const BASE_URL = "https://siemensapi.tesisyonetim.pro";
const TEST_URL = "https://siemensapitest.tesisyonetim.pro";
const APL_URL = "https://tysapi.tesisyonetim.pro/";
const API_URL =
  __mode__ === api.test ? TEST_URL : __mode__ === api.apl ? APL_URL : BASE_URL;

const axiosInstance = (): AxiosInstance => {
  const axiosInstance = axios.create();
  // Add a request interceptor
  axiosInstance.interceptors.request.use((config) => {
    return new Promise((resolve) => {
      config.headers.Authorization = "Bearer " + store.getState().auth.jwt;
      resolve(config);
    });
  });

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log("Interceptors Error", error);

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const founds = [undefined, API_URL, axiosInstance()] as const;

const API = {
  AuthAPI: AuthApiFactory(...founds),
  ProjectAPI: ProjectApiFactory(...founds),
  CampusAPI: CampusApiFactory(...founds),
  BuildAPI: BuildApiFactory(...founds),
  FloorAPI: FloorApiFactory(...founds),
  RoomAPI: RoomApiFactory(...founds),
  GroupAPI: GroupApiFactory(...founds),
  InventoryAPI: InventoryApiFactory(...founds),
  UserAPI: UsersApiFactory(...founds),
  MaintenanceAPI: MaintenanceCommonApiFactory(...founds),
  InventoryMaintenance: InventoryMaintenanceTypeApiFactory(...founds),
  MaintenanceQuestion: MaintenanceQuestionApiFactory(...founds),
  Document: DocumentApiFactory(...founds),
  DemandAPI: DemandApiFactory(...founds),
  InventoryCapacityAPI: InventoryCapacityApiFactory(...founds),
  ReportAPI: MaintenanceReportApiFactory(...founds),
  MaintenanceDetailAPI: InventoryMaintenanceDetailApiFactory(...founds),
  InventoryLegalInspectionAPI: InventoryLegalInspectionApiFactory(...founds),
  ControlTaskAPI: ControlTaskApiFactory(...founds),
  CounterAPI: CounterApiFactory(...founds),
  MaintenanceReport: MaintenanceReportApiFactory(...founds),
};

export const Hooks = {
  Login: () =>
    useFetchManager<typeof API.AuthAPI.apiAuthLoginGet>(
      API.AuthAPI.apiAuthLoginGet
    ),
  ProjectList: () =>
    useFetchManager<
      typeof API.UserAPI.apiUsersGetUserProjectByUserIDGet,
      Project[]
    >(API.UserAPI.apiUsersGetUserProjectByUserIDGet),
  MaintenanceTimeline: () =>
    useFetchManager<
      typeof API.MaintenanceAPI.apiMaintenanceCommonMaintenanceTimeLineGet
    >(API.MaintenanceAPI.apiMaintenanceCommonMaintenanceTimeLineGet),
  MaintenanceTimelineDetail: () =>
    useFetchManager<
      typeof API.MaintenanceAPI.apiMaintenanceCommonMaintenanceTimeLineDetailGet,
      IMaintenanceIssueDetail
    >(API.MaintenanceAPI.apiMaintenanceCommonMaintenanceTimeLineDetailGet),
  ListMaintenanceQuestion: () =>
    useFetchManager<
      typeof API.MaintenanceQuestion.apiMaintenanceQuestionGetInventoryQuestionListGet
    >(
      API.MaintenanceQuestion.apiMaintenanceQuestionGetInventoryQuestionListGet
    ),
  DoMaintenance: () =>
    useFetchManager<
      typeof API.MaintenanceDetailAPI.apiInventoryMaintenanceDetailDoMaintenanceProcessPost
    >(
      API.MaintenanceDetailAPI
        .apiInventoryMaintenanceDetailDoMaintenanceProcessPost
    ),
  MaintenanceDescription: () =>
    useFetchManager<
      typeof API.MaintenanceAPI.apiMaintenanceCommonMaintenanceTimeLineStatusDescGet,
      IMaintenanceStatusDesc[]
    >(API.MaintenanceAPI.apiMaintenanceCommonMaintenanceTimeLineStatusDescGet),
  LegalTimeline: () =>
    useFetchManager<
      typeof API.InventoryLegalInspectionAPI.apiInventoryLegalInspectionGetInventoryLegalInspectionTimelineGet
    >(
      API.InventoryLegalInspectionAPI
        .apiInventoryLegalInspectionGetInventoryLegalInspectionTimelineGet
    ),
  LegalDescription: () =>
    useFetchManager<
      typeof API.InventoryLegalInspectionAPI.apiInventoryLegalInspectionGetInventoryLegalInspectionTimelineStatusDescGet
    >(
      API.InventoryLegalInspectionAPI
        .apiInventoryLegalInspectionGetInventoryLegalInspectionTimelineStatusDescGet
    ),
  DoLegalMaintenance: () =>
    useFetchManager<
      typeof API.InventoryLegalInspectionAPI.apiInventoryLegalInspectionDoInventoryLegalInspectionMaintenancePost
    >(
      API.InventoryLegalInspectionAPI
        .apiInventoryLegalInspectionDoInventoryLegalInspectionMaintenancePost
    ),
  UpdateLegalMaintenance: () =>
    useFetchManager<
      typeof API.InventoryLegalInspectionAPI.apiInventoryLegalInspectionUpdateInventoryLegalInspectionTypePost
    >(
      API.InventoryLegalInspectionAPI
        .apiInventoryLegalInspectionUpdateInventoryLegalInspectionTypePost
    ),
  DemandTimeline: () =>
    useFetchManager<typeof API.DemandAPI.apiDemandGetDemandTimeLineGet>(
      API.DemandAPI.apiDemandGetDemandTimeLineGet
    ),
  UploadDemandDocument: () =>
    useFetchManager<typeof API.DemandAPI.apiDemandUploadDemandDocumentPost>(
      API.DemandAPI.apiDemandUploadDemandDocumentPost
    ),
  DemandGroupList: () =>
    useFetchManager<typeof API.DemandAPI.apiDemandGetDemandGroupListGet>(
      API.DemandAPI.apiDemandGetDemandGroupListGet
    ),
  DocumentTimeline: () =>
    useFetchManager<typeof API.Document.apiDocumentGetDocumentTimelineGet>(
      API.Document.apiDocumentGetDocumentTimelineGet
    ),
  DocumentTimelineDesc: () =>
    useFetchManager<
      typeof API.Document.apiDocumentGetDocumentTimelineStatusDescGet
    >(API.Document.apiDocumentGetDocumentTimelineStatusDescGet),
  DoDocumentMaintenance: () =>
    useFetchManager<typeof API.Document.apiDocumentDoDocumentMaintenancePost>(
      API.Document.apiDocumentDoDocumentMaintenancePost
    ),
  DoUpdateDocument: () =>
    useFetchManager<
      typeof API.Document.apiDocumentDoUpdateDocumentMaintenancePost
    >(API.Document.apiDocumentDoUpdateDocumentMaintenancePost),
  ControlTaskTimeline: () =>
    useFetchManager<
      typeof API.ControlTaskAPI.apiControlTaskGetControlTimelineGet
    >(API.ControlTaskAPI.apiControlTaskGetControlTimelineGet),
  ControlTaskTimelineDesc: () =>
    useFetchManager<
      typeof API.ControlTaskAPI.apiControlTaskGetControlTimelineStatusDescGet
    >(API.ControlTaskAPI.apiControlTaskGetControlTimelineStatusDescGet),
  QuestionList: () =>
    useFetchManager<
      typeof API.ControlTaskAPI.apiControlTaskControlQuestionListGet
    >(API.ControlTaskAPI.apiControlTaskControlQuestionListGet),
  DoControlTask: () =>
    useFetchManager<
      typeof API.ControlTaskAPI.apiControlTaskDoControlMaintenancePost
    >(API.ControlTaskAPI.apiControlTaskDoControlMaintenancePost),
  UserTypeList: () =>
    useFetchManager<typeof API.UserAPI.apiUsersGetUserTypeListGet>(
      API.UserAPI.apiUsersGetUserTypeListGet
    ),
  PeriodList: () =>
    useFetchManager<
      typeof API.MaintenanceAPI.apiMaintenanceCommonGetMaintenancePeriodListByProjectIdGet
    >(
      API.MaintenanceAPI
        .apiMaintenanceCommonGetMaintenancePeriodListByProjectIdGet
    ),
  UserInfo: () =>
    useFetchManager<typeof API.UserAPI.apiUsersGetUserByIdGet>(
      API.UserAPI.apiUsersGetUserByIdGet
    ),
  UpdateUserInfo: () =>
    useFetchManager<typeof API.UserAPI.apiUsersUpdateUserPost>(
      API.UserAPI.apiUsersUpdateUserPost
    ),
  ChangePassword: () =>
    useFetchManager<typeof API.UserAPI.apiUsersUpdateUserPasswordChangeGet>(
      API.UserAPI.apiUsersUpdateUserPasswordChangeGet
    ),
  CampusList: () =>
    useFetchManager<typeof API.CampusAPI.apiCampusGetCampusListByProjectIDGet>(
      API.CampusAPI.apiCampusGetCampusListByProjectIDGet
    ),
  VersionControl: () =>
    useFetchManager<typeof API.UserAPI.apiUsersVersionControlGet>(
      API.UserAPI.apiUsersVersionControlGet
    ),
  CounterTaskTimeline: () =>
    useFetchManager<typeof API.CounterAPI.apiCounterCounterTimelineGet>(
      API.CounterAPI.apiCounterCounterTimelineGet
    ),
  CounterColorDesc: () =>
    useFetchManager<typeof API.CounterAPI.apiCounterCounterTimelineStatusGet>(
      API.CounterAPI.apiCounterCounterTimelineStatusGet
    ),
  CounterDo: () =>
    useFetchManager<typeof API.CounterAPI.apiCounterDoCounterMaintenancePost>(
      API.CounterAPI.apiCounterDoCounterMaintenancePost
    ),
  InventoryDetailByBarcode: () =>
    useFetchManager<
      typeof API.InventoryAPI.apiInventoryGetInventoryByBarcodeGet
    >(API.InventoryAPI.apiInventoryGetInventoryByBarcodeGet),
  GetCompletedMaintenance: () =>
    useFetchManager<
      typeof API.MaintenanceReport.apiMaintenanceReportGetCompletedMaintenanceGet
    >(API.MaintenanceReport.apiMaintenanceReportGetCompletedMaintenanceGet),
};
