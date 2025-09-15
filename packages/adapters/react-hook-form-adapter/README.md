# KoliBri - React Hook Form Adapter

This package provides simple facade components to combine
[React Hook Form](https://react-hook-form.com/) with the KoliBri
React components. Validation messages from React Hook Form are forwarded
to the KoliBri inputs automatically.

## Installation

```bash
npm i @public-ui/react-hook-form-adapter
```

## Usage

```tsx
import { useForm } from 'react-hook-form';
import { KolInputTextController } from '@public-ui/react-hook-form-adapter';

const MyForm = () => {
        const { control, handleSubmit } = useForm({
                defaultValues: { firstName: '' },
        });
        return (
                <form onSubmit={handleSubmit(console.log)}>
                        <KolInputTextController
                                name="firstName"
                                control={control}
                                rules={{ required: 'Please enter your name' }}
                                _label="First name"
                        />
                </form>
        );
};
```
