import React, { FC } from 'react';
import { FormWrap } from '../FormWrap';
import { TextareaVariants } from './partials/variants';

export const TextareaBasic: FC = () => <FormWrap RefComponent={TextareaVariants} />;
