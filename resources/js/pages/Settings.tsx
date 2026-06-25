import Header from '@/components/header';
import { BitmapToSettings, SettingsToBitmap, Auth, type Settings as SettingsType } from '@/types';
import { Form, usePage, } from '@inertiajs/react';
import Switch from '@mui/material/Switch';

export type SettingsProps = {
    auth: Auth;
    settings: number
}

export default function Settings(props: SettingsProps) {
    const settings = BitmapToSettings(props.settings);

    const { errors } = usePage().props as {
        errors: Record<string, string>;
    };

    return (
        <>
            <Header user={props.auth.user} />
            <h1 className="primary-text mt-20 ml-20 text-6xl">Instellingen</h1>
            <div className="flex justify-between">
                <div className="mx-15 mt-15 flex flex-col gap-7">
                    <div className="flex flex-col gap-2">
                        <h1 className="primary-text text-5xl">Gegevens</h1>
                        <div className="mt-20 flex gap-8">
                            <Form className="form form-inline secondary-text h-fit" method="put" action="/users">
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
                                <button type="submit" children="Opslaan" className="bg-light-primary ml-auto w-fit rounded-2xl p-2 text-xl" />
                            </Form>
                            <Form className="form form-inline secondary-text h-fit" method="patch" action="/users" encType="multipart/form-data">
                                <label>
                                    <h2>Avatar</h2>
                                    <label
                                        className="form-inline-label primary-text"
                                        htmlFor="avatar"
                                        children="Laat dit veld leeg om je avatar te resetten"
                                    />
                                    <input type="file" name="avatar" min="6" max="32" />
                                </label>
                                <label>
                                    {Object.entries(errors).map(([field, message]) => (
                                        <h3 className="bg-red-500 p-1">
                                            {field}: {message}
                                        </h3>
                                    ))}
                                </label>
                                <button type="submit" children="Opslaan" className="bg-light-primary ml-auto w-fit rounded-2xl p-2 text-xl" />
                            </Form>
                            <Form
                                className="form form-inline secondary-text h-fit"
                                method="put"
                                action="/settings"
                                transform={(data) => ({
                                    bitmap: SettingsToBitmap(data as SettingsType),
                                })}
                            >
                                <label className="mb-4 block">
                                    <h2>Datatoestemming</h2>
                                    <label className="form-inline-label primary-text mb-2 block">
                                        Ga hier akkoord dat wij al uw data mogen verkopen voor advertenties.
                                    </label>
                                    {/* Bind state and update via handleSwitchChange */}
                                    <Switch name="dataPermissions" defaultChecked={settings.dataPermissions} />
                                </label>

                                <label className="mb-4 block">
                                    <h2>Schakel geluiden uit</h2>
                                    <label className="form-inline-label primary-text mb-2 block">
                                        Schakel alle in-game geluidseffecten en omgevingsgeluiden uit.
                                    </label>
                                    <Switch name="disableSound" defaultChecked={settings.disableSound} />
                                </label>

                                <label className="mb-4 block">
                                    <h2>Schakel meldingen uit</h2>
                                    <label className="form-inline-label primary-text mb-2 block">
                                        Hiermee schakel je speluitnodigingsmeldingen uit.
                                    </label>
                                    <Switch name="disableNotifications" defaultChecked={settings.disableNotifications} />
                                </label>
                                <button type="submit" children="Opslaan" className="bg-light-primary ml-auto w-fit rounded-2xl p-2 text-xl" />
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
