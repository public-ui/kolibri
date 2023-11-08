import React, { FC } from 'react';
import { FormWrap } from '../FormWrap';
import { InputTextVariants } from './partials/variants';

export const InputTextBasic: FC = () => <FormWrap RefComponent={InputTextVariants} />;
