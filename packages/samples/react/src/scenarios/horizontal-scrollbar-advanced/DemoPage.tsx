import * as React from 'react';
import { SampleDescription } from '../../components/SampleDescription';
import MainLayout from './MainLayout';
import DemoTable from './Table';

function DemoPage() {
	return (
		<>
			<SampleDescription></SampleDescription>
			<MainLayout>
				<DemoTable />
			</MainLayout>
		</>
	);
}

export default DemoPage;
