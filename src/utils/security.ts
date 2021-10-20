import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { TokenPayload } from "../../lib/types";
import { jwt as jwt_config } from "../config";

const /*hash_*/ slinging_slasher = async (password: string) => {
        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    };

const compare = async (password: string, hashed: string) => {
    const check = await bcrypt.compare(password, hashed);
    return check;
};

const create = async (payload: TokenPayload) => {
    const token = jwt.sign(payload, jwt_config.secret, { expiresIn: jwt_config.expiration });
    return token;
};

export const passwords = {
    slinging_slasher,
    verify: compare
};

export const tokens = {
    create
};
