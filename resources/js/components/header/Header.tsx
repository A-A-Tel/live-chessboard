import { User } from '@/types';
import { Link } from '@inertiajs/react';

import noPfp from '../../../img/icons/no-pfp.jpg'
import logo from '../../../img/pieces/white/king.png';
import profile from '../../../img/icons/profile.svg';
import logout from '../../../img/icons/logout.svg';

type HeaderProps = {
    user?: User;
}

export default function Header(props: HeaderProps) {

    console.log(props.user != undefined);

    let accountOptions;

    if (props.user) {
        accountOptions = (
            <div className="mr-20 ml-auto flex">
                <img
                    src={props.user.avatar == null ? noPfp : `/storage/avatars/${props.user.avatar}`}
                    alt="Avatar"
                    className="mr-10 h-[4.5vw] w-[4.5vw] rounded-full"
                />
                <div className="flex flex-col">
                    <span className="primary-text text-2xl">{props.user.username}</span>
                    <div className="flex gap-3">
                        <Link href="/logout" className="secondary-text bg-dark-secondary flex h-fit w-fit rounded-2xl p-3 text-[1.2rem]">
                            <img src={logout} alt="" className="mr-2" />
                            Uitloggen
                        </Link>
                        <Link href="/profile" className="secondary-text bg-dark-secondary flex h-fit w-fit rounded-2xl p-3 text-[1.2rem]">
                            <img src={profile} alt="" className="mr-2" />
                            Profiel
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    else {
        accountOptions = (
            <div className="mr-20 ml-auto flex">
                <img src={noPfp} alt="Avatar" className="mr-10 h-[8vh] rounded-full" />
                <div className="flex flex-col">
                    <span className="primary-text text-3xl">Niet ingelogd</span>
                    <div className="mt-2.5 flex justify-center">
                        <div className="flex gap-3">
                            <Link href="/register" className="secondary-text bg-dark-secondary h-fit w-fit rounded-2xl p-3 text-[1.2rem]">
                                Registreren
                            </Link>
                            <Link href="/login" className="secondary-text bg-dark-secondary h-fit w-fit rounded-2xl p-3 text-[1.2rem]">
                                Inloggen
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <header className='h-[10vh] bg-dark-primary grid grid-cols-3 items-center'>
            <Link href='/' className='h-[8vh] flex ml-[2vw]'>
                <img src={logo} alt="White King" className='h-auto mr-[0.6vw]'/>
                <span className='primary-text text-4xl m-[auto_0_auto_0]'>Kawaii Chess</span>
            </Link>
            <nav className='flex secondary-text text-2xl gap-15 justify-around'>
                <Link href='/'>Startpagina</Link>
                <Link>Spelen</Link>
                <Link href='/users'>Gebruikers</Link>
            </nav>
            {accountOptions}
        </header>
    );
}
