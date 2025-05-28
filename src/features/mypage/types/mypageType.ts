export interface UserUploadHistory {
  filename: string;
  fileId: string;
  fileSize: number;
  createdAt: string;
}

export interface UserInfoProps {
  email: string;
  name: string;
  imgUrl: string;
  fileLogs: UserUploadHistory[] | null;
}
