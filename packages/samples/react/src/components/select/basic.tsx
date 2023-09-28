import React, { FC } from 'react';
import { FormWrap } from '../FormWrap';
import { SelectVariants } from './partials/variants';

export const SelectBasic: FC = () => <FormWrap RefComponent={SelectVariants} />;
