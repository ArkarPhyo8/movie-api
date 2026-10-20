import { type Request, type Response } from "express";
declare const getWatchListItems: (req: Request, res: Response) => Promise<void>;
declare const addToWatchList: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const updateWatchListItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const removeMovieFromWatchList: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export { getWatchListItems, addToWatchList, updateWatchListItem, removeMovieFromWatchList };
//# sourceMappingURL=watchListController.d.ts.map