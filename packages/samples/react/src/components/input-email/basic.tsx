import React, { FC } from 'react';
import { FormWrap } from '../FormWrap';
import { InputEmailVariants } from './partials/variants';

export const InputEmailBasic: FC = () => <FormWrap RefComponent={InputEmailVariants} />;
