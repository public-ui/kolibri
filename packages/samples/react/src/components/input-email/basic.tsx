import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputEmailVariants } from './partials/variants';

export const InputEmailBasic: FC = () => <FormWrap RefComponent={InputEmailVariants} />;
