import { Button, Label, TextInput } from "flowbite-react";
import useLoading from "frontend/hooks/useLoading";
import router from "next/router";

export default function EditProfileForm (){
    const {stopLoading, startLoading} = useLoading()
    async function goBack(){
        startLoading()
        await router.push(`/`)
        stopLoading()
    }
    
    return(
        <>
        <form className='flex flex-col gap-4 bg-white rounded-xl border border-gray-150 p-4 mx-auto w-1/2 my-4' >
        <h2 className="text-lg">Ajustes</h2>
            <hr/>
            <div>
                <div className='mb-2 block'>
                    <Label
                        htmlFor='email'
                        value='Contraseña actual'
                        className='text-lg'
                    />
                </div>
                <TextInput
                    id='email'
                    name='email'
                    type='email'
                    sizing='md'
                    placeholder=''
                    value=''
                    color=''
                />
            </div>
            <div>
                <div className='mb-2 block'>
                    <Label
                        htmlFor='email'
                        value='Nueva contraseña'
                        className='text-lg'
                    />
                </div>
                <TextInput
                    id='email'
                    name='email'
                    type='email'
                    sizing='md'
                    placeholder=''
                    value=''
                    color=''
                />
            </div>
            <div>
                <div className='mb-2 block'>
                    <Label
                        htmlFor='email'
                        value='Confirmar nueva contraseña'
                        className='text-lg'
                    />
                </div>
                <TextInput
                    id='email'
                    name='email'
                    type='email'
                    sizing='md'
                    placeholder=''
                    value=''
                    color=''
                />
            </div>
                

            <div className='flex flex-row justify-between'>
                <Button size='sm' color='gray' onClick={goBack}> Cancelar</Button>
                <Button size='sm' type='submit'>Guardar</Button>
            </div>
        </form>
    </>
    )
}
