import { type Request, type Response } from "express";
declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const logout: (req: Request, res: Response) => void;
export { register, login, logout };
//# sourceMappingURL=authController.d.ts.map