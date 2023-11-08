import React, { FC } from 'react';
import { FormWrap } from '../FormWrap';
import { InputRangeVariants } from './partials/variants';

export const InputRangeBasic: FC = () => <FormWrap RefComponent={InputRangeVariants} />;
