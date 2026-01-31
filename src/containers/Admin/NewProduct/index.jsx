import { yupResolver } from "@hookform/resolvers/yup"
import { Image } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import * as yup from "yup"
import { toast } from "react-toastify";

import { api } from "../../../services/api";
import { Container, Form, InputGroup, Label, Input, LabelUpload, Select, SubmitButton, ErrorMessage, ContainerCheckbox,} from "./styles";

const schema = yup.object({
    name: yup.string().required('Digite o nome do produto'),
    price: yup.number().positive().required('Digite o preço do produto').typeError('Digite o preço do produto'),
    category: yup.object().required('Escolha uma categoria'),
    offer: yup.bool(),
    file: yup.mixed().test('required', 'Escolha um arquivo para continuar', (value) => {
        return value && value.length > 0;
    }).test('fileSize', 'Carregue arquivos até 3MB', (value) => {
        return value && value.length > 0 && value[0].size <= 30000;
    })
        .test('type', 'Carregue apenas imagens PNG ou JPEG', (value) => {
            return (value && value.length > 0 && (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
            );
        }),

});

export function NewProduct() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('/categories');

            setCategories(data);
        }

        loadCategories();

    }, []);


    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        const productFormData = new FormData();

        productFormData.append('name', data.name);
        productFormData.append('price', data.price * 100);
        productFormData.append('category_id', data.category.id);
        productFormData.append('file', data.file[0]);
        productFormData.append('offer', data.offer);

        await toast.promise(api.post('/products', productFormData), {
            pending: 'Adicionando o produto...',
            success: 'Produto criado com sucesso',
            error: 'Falha ao adicionar o produto, tente novamente',
        });

        setTimeout(() => {
            navigate('/admin/produtos');
        }, 2000);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                    <Label>Nome</Label>
                    <Input type="text" {...register("name")} />
                    <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>Preço</Label>
                    <Input type="number" {...register("price")} />
                    <ErrorMessage>{errors?.price?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <LabelUpload>
                        <Image />
                        <input
                            type="file"
                            {...register('file')}
                            accept="image/png, image/jpeg"
                            onChange={(value) => {
                                setFileName(value.target.files[0]?.name);
                                register('file').onChange(value);
                            }}
                        />


                        {fileName || 'Upload do Produto'}
                    </LabelUpload>

                    <ErrorMessage>{errors?.file?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>Categoria</Label>
                    <Controller name="category"
                        control={control}
                        render={({ field }) => (

                            <Select
                                {...field}
                                options={categories}
                                getOptionLabel={(category) => category.name}
                                getOptionValue={(category) => category.id}
                                placeholder="Categorias"
                                menuPortalTarget={document.body}
                            />

                        )} />

                    <ErrorMessage>{errors?.category?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <ContainerCheckbox>
                        <input type="checkbox" {...register('offer')}
                        />
                        <label>Produto em Oferta? </label>
                    </ContainerCheckbox>
                </InputGroup>

                <SubmitButton>Adicionar Produto</SubmitButton>
            </Form>
        </Container>
    );
}