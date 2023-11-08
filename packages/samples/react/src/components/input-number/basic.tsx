import React, { FC } from 'react';
import { FormWrap } from '../FormWrap';
import { InputNumberVariants } from './partials/variants';

export const InputNumberBasic: FC = () => <FormWrap RefComponent={InputNumberVariants} />;
