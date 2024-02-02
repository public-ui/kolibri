import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputTextVariants } from './partials/variants';

export const InputTextBasic: FC = () => <FormWrap RefComponent={InputTextVariants} />;
