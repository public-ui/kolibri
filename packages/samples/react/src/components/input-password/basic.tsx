import React, { FC } from 'react';
import { FormWrap } from '../FormWrap';
import { InputPasswordVariants } from './partials/variants';

export const InputPasswordBasic: FC = () => <FormWrap RefComponent={InputPasswordVariants} />;
