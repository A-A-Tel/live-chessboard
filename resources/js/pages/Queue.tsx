import { useEchoPresence } from '@laravel/echo-react';
import { useEffect, useRef } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Auth } from '@/types';
import Header from '@/components/header';

export default function Queue({ auth }: { auth: Auth }) {
    const matched = useRef(false);

    const { channel } = useEchoPresence('game-queue');

    useEffect(() => {
        const ch = channel();
        if (!ch) return;

        ch.listen('.MatchFound', (e: { gameId: number}) => {
            console.log('fired');
            matched.current = true;
            router.visit(`/play/${e.gameId}`);
        });
    }, [channel]);

    const { props } = usePage();

    useEffect(() => {
        return () => {
            if (!matched.current) {
                const data = new FormData();
                data.append('_method', 'DELETE');
                data.append('_token', props.csrf_token as string);
                console.log(data);
                navigator.sendBeacon('/queue', data);
            }
        };
    }, [props.csrf_token]);

    return (
        <div className="flex h-screen flex-col">
            <Header user={auth.user} />
            <div className="grid w-full flex-1 place-items-center">
                <h1 className="primary-text text-5xl">
                    Wachten op een beschikbare speler...
                </h1>
            </div>
        </div>
    );
}
