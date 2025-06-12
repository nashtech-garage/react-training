import GeneralSection from './GeneralSection.tsx';
import { useForm } from 'react-hook-form';

const KycForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log('Submitted data:', data);
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <GeneralSection register={register} errors={errors}/>
                <div
                    className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                    <h3 className="mb-4 text-xl font-semibold dark:text-white">KYC information</h3>
                    <div className="grid grid-cols-6 gap-6">

                    </div>
                </div>
            </form>
        </>
    );
}

export default KycForm;
