import { createContext } from "react";

export type TJob = {
  _id: string;
  company: string;
  position: string;
  status: JobStatuses;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type JobStatuses = "pending" | "interview" | "declined" | "hired";

type TJobContext = {
  jobs: TJob[];
  setJobs: React.Dispatch<React.SetStateAction<TJob[]>>;
  refreshJobs: () => void;
};

export const JobContext = createContext({} as TJobContext);
