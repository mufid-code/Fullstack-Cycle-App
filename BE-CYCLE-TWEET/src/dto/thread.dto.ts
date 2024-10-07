export type createThreadDTO = {
  content: string;
  imageUrl?: string;
  userId: number;
};

export type updateThreadDTO = createThreadDTO & {};
