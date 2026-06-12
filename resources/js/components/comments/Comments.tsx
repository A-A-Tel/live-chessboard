import { Form } from '@inertiajs/react';

export default function Comments() {
    return (
        <div className="flex w-full flex-col">
            <h1 className="primary-text mb-11 text-6xl">Commentaar</h1>
            <div className="bg-light-primary rounded-2xl p-7">
                <Form>
                    <textarea className='resize-none w-full h-fit secondary-text text-2xl p-3 rounded-2xl bg-primary' maxLength={1024} placeholder='Schrijf commentaar' rows={5} name="content"></textarea>
                </Form>
            </div>
        </div>
    );
}
