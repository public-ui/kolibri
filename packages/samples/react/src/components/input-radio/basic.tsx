import React, { FC } from 'react';
import { FormWrap } from '../FormWrap';
import { InputRadioVariants } from './partials/variants';

export const InputRadioBasic: FC = () => <FormWrap RefComponent={InputRadioVariants} />;
