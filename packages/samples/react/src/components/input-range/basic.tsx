import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputRangeVariants } from './partials/variants';

export const InputRangeBasic: FC = () => <FormWrap RefComponent={InputRangeVariants} />;
