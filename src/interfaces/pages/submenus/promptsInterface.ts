// Generated by https://quicktype.io

export interface PromptData {
   Content: string;
   Id: string;
   Language: string;
   Name: string;
   RecNum: number;
   Type: string;
}

export interface PromptInterface {
   success: boolean;
   message: string;
   data: PromptData[];
}
