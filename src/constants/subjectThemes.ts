import type { SvgIconComponent } from "@mui/icons-material";
import FunctionsRoundedIcon from "@mui/icons-material/FunctionsRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import DatasetRoundedIcon from "@mui/icons-material/DatasetRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import RouterRoundedIcon from "@mui/icons-material/RouterRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import ElectricBoltRoundedIcon from "@mui/icons-material/ElectricBoltRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import SchemaRoundedIcon from "@mui/icons-material/SchemaRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import ViewTimelineRoundedIcon from "@mui/icons-material/ViewTimelineRounded";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";

// Each tint: a soft tile background and a deeper ink for the icon and hover state.
const tints = {
  indigo: { bg: "#eceefb", ink: "#3b46a8" },
  teal: { bg: "#e3f4f1", ink: "#0f766e" },
  amber: { bg: "#fbf0dc", ink: "#a15c07" },
  blue: { bg: "#e4effb", ink: "#1d5fa8" },
  orange: { bg: "#fde9df", ink: "#b5471b" },
  violet: { bg: "#f0e9fb", ink: "#6d3fc0" },
  pink: { bg: "#fbe7f0", ink: "#b0306a" },
  green: { bg: "#e6f3e3", ink: "#3f7a2c" },
  slate: { bg: "#e9ecef", ink: "#44515e" },
};

export type SubjectTheme = { icon: SvgIconComponent; bg: string; ink: string };

// Matched against the subject's full name, first match wins.
const rules: [RegExp, SvgIconComponent, keyof typeof tints][] = [
  [/statistic/i, BarChartRoundedIcon, "indigo"],
  [/numerical/i, CalculateRoundedIcon, "indigo"],
  [/mathematic|discrete/i, FunctionsRoundedIcon, "indigo"],
  [/physics/i, ScienceRoundedIcon, "orange"],
  [/digital logic|microprocessor/i, ElectricBoltRoundedIcon, "orange"],
  [/architecture/i, MemoryRoundedIcon, "orange"],
  [/operating system/i, LayersRoundedIcon, "slate"],
  [/cloud/i, CloudRoundedIcon, "blue"],
  [/network/i, HubRoundedIcon, "blue"],
  [/net centric/i, RouterRoundedIcon, "blue"],
  [/web/i, LanguageRoundedIcon, "teal"],
  [/warehous|mining/i, DatasetRoundedIcon, "amber"],
  [/database/i, StorageRoundedIcon, "amber"],
  [/information retrieval/i, SearchRoundedIcon, "amber"],
  [/artificial intelligence/i, PsychologyRoundedIcon, "pink"],
  [/theory of computation|compiler/i, SchemaRoundedIcon, "violet"],
  [/algorithm|data structure/i, AccountTreeRoundedIcon, "violet"],
  [/graphics/i, PaletteRoundedIcon, "pink"],
  [/multimedia/i, MovieRoundedIcon, "pink"],
  [/image/i, ImageRoundedIcon, "pink"],
  [/crypto/i, LockRoundedIcon, "slate"],
  [/simulation/i, InsightsRoundedIcon, "teal"],
  [/object oriented|java/i, DataObjectRoundedIcon, "teal"],
  [/c programming/i, TerminalRoundedIcon, "teal"],
  [/software project/i, ViewTimelineRoundedIcon, "green"],
  [/software engineering|system analysis/i, DesignServicesRoundedIcon, "green"],
  [/e-governance/i, AccountBalanceRoundedIcon, "green"],
  [/e-commerce/i, StorefrontRoundedIcon, "green"],
  [/business|management/i, BusinessRoundedIcon, "green"],
  [/technical writing/i, EditNoteRoundedIcon, "slate"],
  [/project work/i, RocketLaunchRoundedIcon, "violet"],
  [/internship/i, WorkRoundedIcon, "slate"],
  [/information technology/i, ComputerRoundedIcon, "blue"],
];

export function getSubjectTheme(name: string = ""): SubjectTheme {
  const match = rules.find(([re]) => re.test(name));
  const [, icon, tint] = match || [null, CodeRoundedIcon, "slate" as const];
  return { icon, ...tints[tint] };
}
