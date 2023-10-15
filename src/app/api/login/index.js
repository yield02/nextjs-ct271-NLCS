import * as bcrypt from "bcrypt";

import User from "@/models/User";

export default async function login(data) {

    const query = User.where({username: data.username});
    const user = await query.findOne();

    if(user && (await bcrypt.compare(data.pwd, user.pwd))) {
        const { pwd, ...userWithoutPwd } = user._doc;
        
        const result = {
            ...userWithoutPwd
        }
        return result;
    }
    else {
        return null;
    }
}