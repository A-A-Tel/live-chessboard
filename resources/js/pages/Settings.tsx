import Header from '@/components/header';
import { User } from '@/types';
import { Form, usePage } from '@inertiajs/react';

//bitmask
enum SettingValues {
    SOUND_ENABLED = 1,
    NOTIFICATIONS_ENABLED = 2,
    SELL_DATA_ALLOWED = 4,
}

export type SettingsProps = {
    user?: User;
    settings: number
}

export default function Settings(props: SettingsProps) {
    const { errors } = usePage().props as {
        errors: Record<string, string>;
    };

    return (
        <>
            <Header user={props.user} />
            <div className="mx-15 mt-15 flex flex-col gap-7">
                <h1 className="primary-text mb-11 text-6xl">Instellingen</h1>

                <h1 className="primary-text text-5xl">Verander accountgegevens</h1>
                <Form className="form form-inline secondary-text" method="put" action="/users" encType="multipart/form-data">
                    <label>
                        <h2>Gebruikersnaam</h2>
                        <input type="text" placeholder="Gebruikersnaam" name="username" min="6" max="32" />
                    </label>
                    <label>
                        <h2>Email</h2>
                        <input type="text" placeholder="Email" name="email" min="6" max="32" />
                    </label>
                    <label>
                        <h2>Wachtwoord</h2>
                        <input type="password" placeholder="Wachtwoord" name="password" min="6" max="32" />
                        <input type="password" placeholder="Herhaal" name="password_confirmation" min="6" max="32" />
                    </label>
                    <label>
                        {Object.entries(errors).map(([field, message]) => (
                            <h3 className="bg-red-500 p-1">
                                {field}: {message}
                            </h3>
                        ))}
                    </label>
                    <button type="submit" children="Opslaan" className="bg-light-primary w-fit rounded-2xl p-2 text-xl" />
                </Form>

                <Form className="form form-inline secondary-text" method="patch" action="/users" encType="multipart/form-data">
                    <label>
                        <h2>Avatar</h2>
                        <label className='form-inline-label primary-text' htmlFor="avatar" children='Laat dit veld leeg om je avatar te resetten'/>
                        <input type="file" name="avatar" min="6" max="32" />
                    </label>
                    <label>
                        {Object.entries(errors).map(([field, message]) => (
                            <h3 className="bg-red-500 p-1">
                                {field}: {message}
                            </h3>
                        ))}
                    </label>
                    <button type="submit" children="Opslaan" className="bg-light-primary w-fit rounded-2xl p-2 text-xl" />
                </Form>
            </div>
        </>
    );
}
