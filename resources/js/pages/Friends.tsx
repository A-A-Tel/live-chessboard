import Header from '@/components/header';
import { OtherUser, User } from '@/types';
import { Form } from '@inertiajs/react';
import UserCard from '@/components/user-card';

export type FriendsProps = {
    user?: User;
    users: OtherUser[]
}

export default function Friends(props: FriendsProps){
    return <>
        <Header user={props.user}></Header>
        <div className="mx-15 mt-15 flex flex-col gap-7">
            <h1 className="primary-text mb-11 text-6xl">Vrienden</h1>

            <div className="flex flex-wrap justify-between gap-10">
                {props.users.map((user) => (
                    <UserCard key={user.id} other={user} user={props.user}/>
                ))}
            </div>
            {props.users.length === 0 && <div className="primary-text text-2xl">Geen gebruikers gevonden.</div>}
        </div>
    </>
}
