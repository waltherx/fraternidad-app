import { useForm } from 'react-hook-form';
import {  toast } from 'react-toastify';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserAdminInput } from "../../types/UserType";
import TitleCard from "../common/components/Cards/TitleCard";
import { FINANCIAL, ROLE } from '../../utils/constant';
import { AlertWarnig } from '../../components/AlertWarning';
import { signUp } from '../../services/userService';
import { useMutation } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';

export function UserAdminAdd() {


    const defaultValues: UserAdminInput = {
        username: "",
        password: "",
        //ci: false,
        full_name: "",
        email: "",
        phone: "",
        financial_condition: FINANCIAL.NORMAL,
        role: ROLE.FRATERNO,
        copy_ci: false,
    };

    const validationSchema = yup.object({
        username: yup
            .string()
            .required("Por favor, introduce CI de usuario.")
            .min(7, "el nombre de usuari o CI es muy corto")
            .max(35, "el nombre de usuari o CI es muy largo"),
        password: yup.string()
            .required("Por favor, introduce una contraseña.")
            .min(8, "La contraseña debe tener al menos 8 letras")
            .max(32, "La contraseña no debe exceder los 32  letras"),
        email: yup
            .string()
            .email("Por favor, introduce una dirección de correo electrónico válida.")
            .required("El correo electrónico es necesario"),
        full_name: yup
            .string()
            .typeError("Solo letras")
            .required("Por favor, introduce tu nombre completo."),
        phone: yup
            .string(),
        //.required("Nombres Completo es requerido"),
        //ci: yup
        //   .boolean(),
        financial_condition: yup
            .string()
            .required("Por favor, selecciona un Modo de pago."),
        role: yup
            .string()
            .required("Por favor, selecciona un rol."),
        copy_ci: yup
            .boolean()
            .required("Por favor, confirma si tiene copia de CI.")
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UserAdminInput>({
        defaultValues,
        resolver: yupResolver(validationSchema),
    });

    const mutation = useMutation(signUp, {
        onSuccess: (data) => {
            console.log(data.message);
            reset();
            //navigate("/login");
            toast.success(data.message);
            //toast.success("Lorem ipsum dolor")
        },
        onError: (error) => {
            console.log(error);
            toast.error("Usuario no registrado..");
        }
    });

    const onSubmitHandler = (values: UserAdminInput) => {
        console.log(values)
        try {
            mutation.mutate(values);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <TitleCard title="Nuevo Usuario" topMargin="mt-2" >
                <div className="flex items-center justify-center ">
                    <div className="mx-auto w-full max-w-[550px] bg-base-100">
                        <form onSubmit={handleSubmit(onSubmitHandler)} >
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="username" className="label mb-3 block text-base font-medium ">
                                            Cédula de Identidad (CI)
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            placeholder="Ingrese su CI"
                                            className="input w-full rounded-md border border-[#e0e0e0]  py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            {...register("username")}
                                        />
                                        {errors.username && (
                                            <AlertWarnig titleAlert={errors.username.message} />
                                        )}
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="copy_ci" className="label mb-3 block text-base font-medium ">
                                            Copia de CI
                                        </label>
                                        <input
                                            type="checkbox"
                                            name="copy_ci"
                                            id="copy_ci"
                                            className="checkbox checkbox-success outline-none"
                                            {...register("copy_ci")}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-control mb-5">
                                <label htmlFor="email" className="label mb-3 block text-base font-medium">
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Ingrese su correo electrónico"
                                    className="input w-full rounded-md border border-[#e0e0e0]  py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    {...register("email")}

                                />
                                {errors.email && (
                                    <AlertWarnig titleAlert={errors.email.message} />
                                )}
                            </div>
                            <div className="form-control mb-5">
                                <label htmlFor="password" className="label mb-3 block text-base font-medium">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Ingrese su contraseña"
                                    className="input w-full rounded-md border border-[#e0e0e0]  py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    {...register("password")}

                                />
                                {errors.password && (
                                    <AlertWarnig titleAlert={errors.password.message} />
                                )}
                            </div>
                            <div className="form-control mb-5">
                                <label htmlFor="phone" className="label mb-3 block text-base font-medium ">
                                    Teléfono
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    placeholder="Ingrese su número de teléfono"
                                    className="input w-full rounded-md border border-[#e0e0e0]  py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    {...register("phone")}

                                />
                                {errors.phone && (
                                    <AlertWarnig titleAlert={errors.phone.message} />
                                )}
                            </div>
                            <div className="form-control mb-5">
                                <label htmlFor="email" className="label mb-3 block text-base font-medium">
                                    Nombre Completo
                                </label>
                                <input type="text"
                                    name="full_name"
                                    id="full_name"
                                    placeholder="Ingrese su nombre completo"
                                    className="input w-full rounded-md border border-[#e0e0e0]  py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    {...register("full_name")}
                                />
                                {errors.full_name && (
                                    <AlertWarnig titleAlert={errors.full_name.message} />
                                )}
                            </div>

                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="financial_condition" className="label mb-3 block text-base font-medium">
                                            Modo de Pago
                                        </label>
                                        <select
                                            name="financial_condition"
                                            id="financial_condition"
                                            className="select w-full rounded-md border border-[#e0e0e0]  py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            {...register("financial_condition")}
                                        >
                                            <option disabled selected>Seleccione Modo de pago</option>
                                            <option value={FINANCIAL.NORMAL} >Normal</option>
                                            <option value={FINANCIAL.PLANPAGO} >Plan de pagos</option>
                                        </select>
                                        {errors.financial_condition && (
                                            <AlertWarnig titleAlert={errors.financial_condition.message} />
                                        )}
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="role" className="label mb-3 block text-base font-medium">
                                            Rol de Usuario
                                        </label>
                                        <select
                                            name="time"
                                            id="time"
                                            className="select w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            {...register("role")}
                                        >
                                            <option selected disabled>Seleccione un rol</option>
                                            <option value={ROLE.FRATERNO}>Fraterno</option>
                                            <option value={ROLE.TESORERO}>Tesorero</option>
                                        </select>
                                        {errors.role && (
                                            <AlertWarnig titleAlert={errors.role.message} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={mutation.isLoading}
                                    className="btn btn-primary hover:shadow-form w-full rounded-md  py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                >
                                    {mutation.isLoading && <span className="loading loading-spinner"></span>}
                                    Agregar Usuario
                                </button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </TitleCard>

        </>);
}