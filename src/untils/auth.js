import { redirect } from 'next/navigation';

export default function isAuthencation(session, link='/auth/login') {
    if(!session) {
        redirect(link);
    }
    return true;
}