export interface IMaintenanceIssue {
  barcode: string;
  beforeDate: string;
  beforeDay: number;
  campusName: string;
  endDate: string;
  id: number;
  inventoryID: number;
  inventoryMaintenanceTypeID: number;
  inventoryName: string;
  isAfterCompleted: boolean;
  isMaintenanceComplete: boolean;
  isMaintenanceIncomplete: boolean;
  maintenancePeriodID: number;
  maintenancePeriodName: string;
  maintenanceTransactionStatus: number;
  maintenanceTransactionStatusColorCode: string;
  maintenanceTransactionStatusDescription: string;
  maintenanceTypeID: number;
  maintenanceTypeName: string;
  startDate: string;
  userTypeId: number;
  userTypeName: string;
}

export interface IMaintenanceIssueDetail {
  userTypeId: number;
  userTypeName: string;
  inventoryMaintenanceTypeID: number;
  campusName: string;
  buildName: string;
  floorName: string;
  roomName: string;
  groupName: string;
  brandName: string;
  modelName: string;
  capacityName: string;
  maintenanceId: number;
  maintenanceTypeName: string;
  maintenanceTypeId: number;
  maintenancePeriodName: string;
  maintenancePeriodID: number;
  inventoryID: number;
  barcode: string;
  inventoryPhotoPath?: any;
  assetNo?: any;
  name: string;
  serialNumber: string;
  unit?: any;
  explain?: any;
  isActive: boolean;
  beforeDay: number;
  beforeDate: string;
  startDate: string;
  endDate: string;
  controlFormPhotoIsRequired: boolean;
  isInventoryPhotoRequired: boolean;
  riskAnalysisIsRequired: boolean;
  riskAnalysisPath?: any;
  userInstructionsIsRequired: boolean;
  userInstructionsPath?: any;
  userGudiePathIsRequired: boolean;
  userGudiePath?: any;
  maintenanceContractIsRequired: boolean;
  maintenanceContractPath?: any;
}

export interface ILegal {
  id: number;
  projectID: number;
  completedUserID?: any;
  inventoryLegalInspectionTypeID: number;
  answer: boolean;
  explain?: any;
  maintenanceFirm?: any;
  isCompleted: boolean;
  status: number;
  statusDesc: string;
  statusColor: string;
  completedPersonelName?: any;
  beforeDay: number;
  startDate: string;
  endDate: string;
  secondDate?: any;
  completedDate?: any;
  createDate: string;
  updateDate?: any;
  updateExplaint?: any;
  updatePersonelName?: any;
  updateFirm?: any;
  updateUserID?: any;
  userTypeId: number;
  userTypeName: string;
  question: string;
  inventoryID: number;
  inventoryName: string;
  campusID: number;
  campusName: string;
  buildID: number;
  buildName: string;
  floorID: number;
  floorName: string;
  roomID: number;
  roomName: string;
  groupID: number;
  groupName: string;
  brandID: number;
  brandName: string;
  modelID?: any;
  modelName?: any;
  inventoryCapacityID?: any;
  inventoryCapacityName?: any;
  barcode: string;
  assetNo: string;
  name: string;
  count: number;
  productionYear: string;
  inventoryPhotoPath: string;
  serialNumber: string;
  unit: string;
  controlFormPhotoIsRequired: boolean;
  isInventoryPhotoRequired: boolean;
  riskAnalysisIsRequired: boolean;
  riskAnalysisPath?: any;
  userInstructionsIsRequired: boolean;
  userInstructionsPath?: any;
  userGudiePathIsRequired: boolean;
  userGudiePath?: any;
  maintenanceContractIsRequired: boolean;
  maintenanceContractPath: string;
  documents: any[];
}

export interface IDemand {
  demandID: number;
  projectID: number;
  userTypeID: number;
  userTypeName: string;
  campusID: number;
  campusName: string;
  buildID: number;
  buildName: string;
  floorID: number;
  floorName: string;
  roomID: number;
  roomName: string;
  demandName: string;
  explain?: any;
  demandIsActive: boolean;
  demandCreateDate: string;
  documents: IDemandDocument[];
}

interface IDemandDocument {
  demandDocumentID: number;
  documentName: string;
  lastDate: string;
  demandDocumentIsActive: boolean;
  isCompleted: boolean;
  demandDocumentCreateDate: string;
  path?: any;
  completedDate?: any;
  completedUserID?: any;
  completedUserName?: any;
}

export interface IFollowDoc {
  documentMaintenanceID: number;
  documentMaintenanceTypeID: number;
  documentID: number;
  documentName: string;
  projectID: number;
  documentPeriodID: number;
  documentPeriodName: string;
  userTypeID: number;
  userTypeName: string;
  campusID: number;
  campusName: string;
  buildID: number;
  buildName: string;
  floorID: number;
  floorName: string;
  roomID: number;
  roomName: string;
  beforeDay: number;
  question: string;
  beforeDate: string;
  startDate: string;
  endDate: string;
  secondDate?: any;
  isCompleted: boolean;
  status: number;
  statusDesc: string;
  statusColor: string;
  groupID: number;
  groupName: string;
  brandID: number;
  brandName: string;
  modelID: number;
  modelName: string;
  completedDate?: any;
  documentMaintenanceDetailID: number;
  questionAnswer?: any;
  explain?: any;
  updateExplain?: any;
  documents?: any;
}

export interface IControlTask {
  controlId: number;
  userTypeID: number;
  userTypeName: string;
  projectID: number;
  campusID: number;
  campusName: string;
  buildID: number;
  buildName: string;
  floorID: number;
  floorName: string;
  roomID: number;
  roomName: string;
  controlName: string;
  controlExplain?: string;
  controlCreateDate: string;
  controlTypeID: number;
  userID: number;
  userName: string;
  controlPeriodID: number;
  controlPeriodName: string;
  controlQuestionGroupID: number;
  controlQuestionGroupName: string;
  controlTypeExplain: string;
  beforeDay: number;
  controlTaskMaintenanceID: number;
  beforeDate: string;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  complatedDate: string;
  statusCode: number;
  statusColor: string;
  statusDesc: string;
}