import { OtherUser, User } from '@/types';
import { Form } from '@inertiajs/react';
import Header from '@/components/header';
import UserCard from '@/components/user-card';
import { useState } from 'react';

export type usersProps = {
    user?: User;
    users: {
        data: OtherUser[]
    }
    nextKey?: number;
}

export default function Users(props: usersProps) {
    const params = new URLSearchParams(window.location.search);
    const [search, setSearch] = useState<string>(params.get('search')?? '');

    return (
        <>
            <Header user={props.user} />
            <div className="mx-15 mt-15 flex flex-col gap-7">
                <h1 className="primary-text mb-11 text-6xl">Gebruikers</h1>
                <Form action="/users" method="get" className="secondary-text flex gap-4">
                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" name="search" placeholder="Zoek op gebruikers..." className="bg-light-primary w-1/2 rounded-2xl p-4" />
                    <button type="submit" children="Zoeken" className="bg-light-primary rounded-2xl p-4" />
                </Form>

                <div className="flex flex-wrap justify-between gap-10">
                    {props.users.data.map((user) => (
                        <UserCard key={user.id} other={user} user={props.user}/>
                    ))}
                </div>
                {props.users.data.length === 0 && <div className="primary-text text-2xl">Geen gebruikers gevonden.</div>}
            </div>
        </>
    );
}
