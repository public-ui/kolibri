import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { SelectVariants } from './partials/variants';

export const SelectBasic: FC = () => <FormWrap RefComponent={SelectVariants} />;
