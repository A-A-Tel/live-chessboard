import Header from '@/components/header';
import { Form, usePage } from '@inertiajs/react';
import { Auth } from '@/types';

export default function Login(props: {auth: Auth}) {
    const { errors } = usePage().props as {
        errors: Record<string, string>;
    };

    return (
        <>
            <Header user={props.auth.user} />
            <Form className="form secondary-text" method="post" action="/login" encType="multipart/form-data">
                <h1 className="primary-text mx-auto text-5xl">Registreer hier nu</h1>
                <label>
                    <h2>Email</h2>
                    <input required type="text" placeholder="Email" name="email" min="6" max="32" />
                </label>
                <label>
                    <h2>Wachtwoord</h2>
                    <input required type="password" placeholder="Wachtwoord" name="password" min="6" max="32" />
                </label>
                <label>
                    {Object.entries(errors).map(([field, message]) => (
                        <h3 className="bg-red-500 p-1">
                            {field}: {message}
                        </h3>
                    ))}
                </label>
                <button type="submit" children="Inloggen" className="bg-light-primary mx-auto w-fit rounded-2xl p-3 text-2xl" />
            </Form>
        </>
    );
}
