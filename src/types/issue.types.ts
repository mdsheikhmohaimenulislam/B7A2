export const issueStatus = {
  open: "open",
  in_progress: "in_progress",
  resolved: "resolved",
} as const;

export type Status = (typeof issueStatus)[keyof typeof issueStatus];

export const issueType = {
  bug: "bug",
  feature_request: "feature_request",
} as const;

export type IssueType = (typeof issueType)[keyof typeof issueType];

export interface Issue {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  status: Status;
  reporter_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateIssueRequest {
  title: string;
  description: string;
  type: IssueType;
  status?: Status;
}

export interface JwtUser {
  id: number;
  iat?: number;
  exp?: number;
}

export type IssueQuery = {
  sort?: "newest" | "oldest";
  type?: IssueType;
  status?: Status;
};

export interface User {
  id: number;
  name: string;
  role: string;
}

export interface singleIssueData {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  status: Status;
  reporter: User;
  created_at: string;
  updated_at: string;
}

export type updatedIssueData = {
  title: string;
  description: string;
  type: IssueType;

};
