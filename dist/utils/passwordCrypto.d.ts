declare const bcrypt: any;
declare const CustomError: any;
declare const hashPassword: (password: any) => Promise<any>;
declare const verifyPassword: (password: any, hash: any) => Promise<void>;
