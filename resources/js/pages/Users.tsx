import { User } from '@/types';
import { Form, Link } from '@inertiajs/react';
import noPfp from '../../img/icons/no-pfp.jpg'
import Header from '@/components/header';

export type usersProps = {
    user?: User;
    users: User[];
    nextKey?: number;
}

export default function Users(props: usersProps) {
    return (
        <>
            <Header user={props.user} />
            <div className="mx-15 mt-15 flex flex-col gap-7">
                <h1 className="primary-text mb-11 text-6xl">Gebruikers</h1>
                <Form action="/users" method="get" className="secondary-text flex gap-4">
                    <input type="text" name="search" placeholder="Zoek op gebruikers..." className="bg-light-primary w-1/2 rounded-2xl p-4" />
                    <button type="submit" children="Zoeken" className="bg-light-primary rounded-2xl p-4" />
                </Form>

                <div className='flex flex-wrap justify-between gap-10'>
                    {props.users.map((user) => (
                        <div key={user.id} className="w-[22vw] bg-secondary align-items-center flex h-40 gap-5 rounded-2xl p-7">
                            <img src={user.avatar ? `/storage/avatars/${user.avatar}` : noPfp} alt="avatar" className="h-25 w-25 rounded-full" />
                            <div className="flex flex-col justify-between gap-4">
                                <span className="primary-text text-4xl">{user.username}</span>
                                <div className="flex gap-2">
                                    <Link className="bg-dark-secondary secondary-text rounded-xl p-2 text-xl" href={`/profile/${user.id}`}>
                                        Profiel
                                    </Link>
                                    <Link className="bg-dark-secondary secondary-text rounded-xl p-2 text-xl">Toevoegen als vriend</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {props.users.length === 0 && <div className="primary-text text-2xl">Geen gebruikers gevonden.</div>}
            </div>
        </>
    );
}
