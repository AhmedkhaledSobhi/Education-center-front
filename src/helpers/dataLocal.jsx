import i18n from "i18next";

// ----------- الحالة -----------
const getStatus = () => [
  {name: i18n.t("common.active") , id: 0, value:"active"},
  {name: i18n.t("common.Inactive") , id: 1, value:"Inactive"},
];

// ----------- النوع -----------
const getGender = () => [
  {name: i18n.t("common.Male") , id: 1, value:"male"},
  {name: i18n.t("common.Female") , id: 2, value:"female"},
]

// ----------- المراحل التعليمية -----------
const getEducationalStages = () => [
  {name: i18n.t("common.Primary_Stage") , id: 1, value:"primary"},
  {name: i18n.t("common.Middle_School") , id: 2, value:"middle"},
  {name: i18n.t("common.High_School") , id: 3, value:"high"},
  {name: i18n.t("common.University_Stage") , id: 4, value:"university"},
  {name: i18n.t("common.Other") , id: 5, value:"other"},
];

// ----------- المواد الدراسية -----------
const getSubjects = () => [
  { name: i18n.t("اللغة العربية"), id: 0, value: "arabic" },
  { name: i18n.t("الرياضيات"), id: 1, value: "math" },
  { name: i18n.t("العلوم"), id: 2, value: "science" },
  { name: i18n.t("الدراسات الاجتماعية"), id: 3, value: "social" },
  { name: i18n.t("اللغة الإنجليزية"), id: 4, value: "english" },
  { name: i18n.t("الحاسب الآلي"), id: 8, value: "computer" },
];

// ----------- الفروع -----------
const getBranch = () => [
  {name: i18n.t("common.Main_branch") , id: 0, value:"MainBranch"},
];

// ----------- شاشة -----------
const getScreen = ()=> [
  {name: i18n.t("common.Display_screen") , id: 0, value:"DisplayScreen"},
  {name: i18n.t("common.projector") , id: 1, value:"projector"},
];

// ----------- سبورة -----------
const getWhiteboard = ()=> [
  {name: i18n.t("common.traditional") , id: 0, value:"traditional"},
  {name: i18n.t("common.smart") , id: 1, value:"smart"},
];

export {
  getEducationalStages,
  getStatus,
  getGender,
  getSubjects,
  getBranch,
  getScreen,
  getWhiteboard,
}