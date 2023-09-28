import React, { FC } from 'react';
import { InputCheckboxVariants } from './partials/variants';
import { FormWrap } from '../FormWrap';

export const InputCheckboxSwitch: FC = () => <FormWrap RefComponent={InputCheckboxVariants} _variant="switch" />;
