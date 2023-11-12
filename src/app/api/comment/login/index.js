import * as bcrypt from "bcrypt";

import User from "@/models/User";

export default async function login(data) {

    const query = User.where({username: data.username});
    const user = await query.findOne();

    if(user && (await bcrypt.compare(data.pwd, user.pwd))) {
        const { pwd, status, ...userWithoutPwd } = user._doc;


        console.log(status.status === 'allow');

        if(status.status === 'allow') {
            const result = {
                ...userWithoutPwd
            }
            return result;
        }

        if(status.status === 'banned') {
            return {
                message: `Tài khoản ${userWithoutPwd.username} đã bị khóa vui lòng liên hệ admin`,
                reason: status?.reason
            }
        }

        return null;
    }
    else {
        return null;
    }
}