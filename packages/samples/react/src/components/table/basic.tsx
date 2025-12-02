import { KolHeading, KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

type Issue = {
	id: string;
	titel: string;
	type: string;
	duedate: string;
	priority: string;
};

const DATA = [
	{ id: '1001', titel: 'Revise login form', type: 'feature', duedate: '2025/11/23', priority: 'low' },
	{ id: '1002', titel: 'Implement dark mode', type: 'feature', duedate: '2025/12/01', priority: 'medium' },
	{ id: '1003', titel: 'Add API response caching', type: 'feature', duedate: '2025/11/30', priority: 'high' },
	{ id: '1004', titel: 'Fix password reset error', type: 'bug', duedate: '2025/11/28', priority: 'high' },
	{ id: '1005', titel: 'Extend unit tests for auth service', type: 'task', duedate: '2025/12/05', priority: 'medium' },
	{ id: '1006', titel: 'Optimize homepage performance', type: 'task', duedate: '2025/12/02', priority: 'low' },
	{ id: '1007', titel: 'Add multi-factor authentication', type: 'feature', duedate: '2025/12/10', priority: 'high' },
	{ id: '1008', titel: 'Fix CSS layout bug in Safari', type: 'bug', duedate: '2025/11/27', priority: 'medium' },
	{ id: '1009', titel: 'Create new role management system', type: 'feature', duedate: '2025/12/12', priority: 'high' },
	{ id: '1010', titel: 'Update logging framework', type: 'task', duedate: '2025/12/03', priority: 'low' },

	{ id: '1011', titel: 'Add push notifications', type: 'feature', duedate: '2025/12/15', priority: 'medium' },
	{ id: '1012', titel: 'Fix exception in payment service', type: 'bug', duedate: '2025/11/29', priority: 'high' },
	{ id: '1013', titel: 'Review and add database indexes', type: 'task', duedate: '2025/12/04', priority: 'medium' },
	{ id: '1014', titel: 'Optimize file upload', type: 'feature', duedate: '2025/12/20', priority: 'low' },
	{ id: '1015', titel: 'Improve chart component', type: 'feature', duedate: '2025/12/18', priority: 'medium' },
	{ id: '1016', titel: 'Fix incorrect pagination in user list', type: 'bug', duedate: '2025/12/06', priority: 'high' },
	{ id: '1017', titel: 'Create new onboarding module', type: 'feature', duedate: '2025/12/22', priority: 'high' },
	{ id: '1018', titel: 'Update app icons', type: 'task', duedate: '2025/12/01', priority: 'low' },
	{ id: '1019', titel: 'Refactor token refresh flow', type: 'task', duedate: '2025/12/09', priority: 'medium' },
	{ id: '1020', titel: 'Add configurable email template', type: 'feature', duedate: '2025/12/17', priority: 'medium' },

	{ id: '1021', titel: 'Fix security vulnerability in API gateway', type: 'bug', duedate: '2025/11/26', priority: 'high' },
	{ id: '1022', titel: 'Restructure user profile page', type: 'feature', duedate: '2025/12/08', priority: 'medium' },
	{ id: '1023', titel: 'Update outdated NPM packages', type: 'task', duedate: '2025/12/11', priority: 'low' },
	{ id: '1024', titel: 'Extend search functionality', type: 'feature', duedate: '2025/12/25', priority: 'medium' },
	{ id: '1025', titel: 'Analyze backend timeouts', type: 'task', duedate: '2025/12/14', priority: 'high' },
	{ id: '1026', titel: 'Dropdown does not close properly', type: 'bug', duedate: '2025/12/02', priority: 'medium' },
	{ id: '1027', titel: 'Extend REST documentation', type: 'task', duedate: '2025/12/13', priority: 'low' },
	{ id: '1028', titel: 'Develop new statistics dashboard', type: 'feature', duedate: '2025/12/30', priority: 'high' },
	{ id: '1029', titel: 'Improve image compression', type: 'task', duedate: '2025/12/16', priority: 'low' },
	{ id: '1030', titel: 'Extend CSV export functionality', type: 'feature', duedate: '2025/12/19', priority: 'medium' },

	{ id: '1031', titel: 'Fix bug in auto-save', type: 'bug', duedate: '2025/11/30', priority: 'high' },
	{ id: '1032', titel: 'Prepare new UI theme', type: 'task', duedate: '2025/12/07', priority: 'low' },
	{ id: '1033', titel: 'Configure server log rotation', type: 'task', duedate: '2025/12/10', priority: 'medium' },
	{ id: '1034', titel: 'Analyze checkout process', type: 'task', duedate: '2025/12/21', priority: 'medium' },
	{ id: '1035', titel: 'Extend GraphQL schema', type: 'feature', duedate: '2025/12/28', priority: 'high' },
	{ id: '1036', titel: 'Fix scroll jumping in chat', type: 'bug', duedate: '2025/11/29', priority: 'medium' },
	{ id: '1037', titel: 'Add French localization', type: 'feature', duedate: '2025/12/27', priority: 'low' },
	{ id: '1038', titel: 'Fix faulty session renewal', type: 'bug', duedate: '2025/11/26', priority: 'high' },
	{ id: '1039', titel: 'Create new admin reports', type: 'feature', duedate: '2025/12/29', priority: 'medium' },
	{ id: '1040', titel: 'Refactor payment validation', type: 'task', duedate: '2025/12/24', priority: 'medium' },

	{ id: '1041', titel: 'Fix file picker error', type: 'bug', duedate: '2025/12/03', priority: 'medium' },
	{ id: '1042', titel: 'Improve webhook system', type: 'feature', duedate: '2025/12/26', priority: 'high' },
	{ id: '1043', titel: 'Code cleanup for utilities', type: 'task', duedate: '2025/12/08', priority: 'low' },
	{ id: '1044', titel: 'Improve session cookie security', type: 'task', duedate: '2025/12/06', priority: 'high' },
	{ id: '1045', titel: 'Extend report generator', type: 'feature', duedate: '2025/12/23', priority: 'medium' },
	{ id: '1046', titel: 'Optimize full-text search', type: 'task', duedate: '2025/12/15', priority: 'medium' },
	{ id: '1047', titel: 'Restructure admin user permissions', type: 'feature', duedate: '2025/12/31', priority: 'high' },
	{ id: '1048', titel: 'Fix pagination bug on mobile devices', type: 'bug', duedate: '2025/12/05', priority: 'high' },
	{ id: '1049', titel: 'Add on-the-fly validation', type: 'feature', duedate: '2025/12/20', priority: 'medium' },
	{ id: '1050', titel: 'Configure system monitoring alerts', type: 'task', duedate: '2025/12/14', priority: 'low' },

	{ id: '1051', titel: 'Add upload progress indicator', type: 'feature', duedate: '2025/12/17', priority: 'medium' },
	{ id: '1052', titel: 'Fix bug in favorites feature', type: 'bug', duedate: '2025/11/27', priority: 'medium' },
	{ id: '1053', titel: 'Prepare new API version v2', type: 'task', duedate: '2025/12/22', priority: 'high' },
	{ id: '1054', titel: 'Compress user avatars', type: 'task', duedate: '2025/12/11', priority: 'low' },
	{ id: '1055', titel: 'Advanced role management', type: 'feature', duedate: '2025/12/28', priority: 'high' },
	{ id: '1056', titel: 'Fix chat notification sound', type: 'bug', duedate: '2025/11/29', priority: 'low' },
	{ id: '1057', titel: 'Update backup strategy', type: 'task', duedate: '2025/12/16', priority: 'medium' },
	{ id: '1058', titel: 'Add new cookie consent banner', type: 'feature', duedate: '2025/12/19', priority: 'medium' },
	{ id: '1059', titel: 'Minimize layout shift', type: 'task', duedate: '2025/12/12', priority: 'low' },
	{ id: '1060', titel: 'Fix form validation bug', type: 'bug', duedate: '2025/12/04', priority: 'high' },

	{ id: '1061', titel: 'Add new email notifications', type: 'feature', duedate: '2025/12/21', priority: 'medium' },
	{ id: '1062', titel: 'Configure API throttling', type: 'task', duedate: '2025/12/26', priority: 'high' },
	{ id: '1063', titel: 'Fix faulty tooltip overlay', type: 'bug', duedate: '2025/12/03', priority: 'medium' },
	{ id: '1064', titel: 'Prepare configurable themes', type: 'feature', duedate: '2025/12/30', priority: 'low' },
	{ id: '1065', titel: 'Improve CSV import', type: 'feature', duedate: '2025/12/25', priority: 'medium' },
	{ id: '1066', titel: 'Aggregate API logs', type: 'task', duedate: '2025/12/20', priority: 'medium' },
	{ id: '1067', titel: 'Revise admin dashboard widgets', type: 'feature', duedate: '2025/12/31', priority: 'high' },
	{ id: '1068', titel: 'Investigate long load times in cart', type: 'task', duedate: '2025/12/15', priority: 'high' },
	{ id: '1069', titel: 'Extend avatar editor', type: 'feature', duedate: '2025/12/29', priority: 'low' },
	{ id: '1070', titel: 'Fix scrolling bug in modal', type: 'bug', duedate: '2025/11/26', priority: 'medium' },

	{ id: '1071', titel: 'Update captcha system', type: 'task', duedate: '2025/12/18', priority: 'medium' },
	{ id: '1072', titel: 'Integrate new payment providers', type: 'feature', duedate: '2025/12/27', priority: 'high' },
	{ id: '1073', titel: 'Fix incorrect log timestamps', type: 'bug', duedate: '2025/12/10', priority: 'low' },
	{ id: '1074', titel: 'Extend security headers', type: 'task', duedate: '2025/12/14', priority: 'medium' },
	{ id: '1075', titel: 'Generate automatic invoice PDFs', type: 'feature', duedate: '2025/12/23', priority: 'high' },
	{ id: '1076', titel: 'Improve UI animations', type: 'task', duedate: '2025/12/09', priority: 'low' },
	{ id: '1077', titel: 'Add new filter options to product search', type: 'feature', duedate: '2025/12/28', priority: 'medium' },
	{ id: '1078', titel: 'Fix bug in shopping cart counter', type: 'bug', duedate: '2025/11/30', priority: 'medium' },
	{ id: '1079', titel: 'Optimize Docker deployment', type: 'task', duedate: '2025/12/17', priority: 'high' },
	{ id: '1080', titel: 'Extend tagging system', type: 'feature', duedate: '2025/12/26', priority: 'low' },

	{ id: '1081', titel: 'Verify webhook signatures', type: 'task', duedate: '2025/12/19', priority: 'medium' },
	{ id: '1082', titel: 'Implement new search suggestions', type: 'feature', duedate: '2025/12/31', priority: 'medium' },
	{ id: '1083', titel: 'Fix tooltip that gets stuck', type: 'bug', duedate: '2025/12/01', priority: 'low' },
	{ id: '1084', titel: 'Develop modular permission system', type: 'feature', duedate: '2025/12/30', priority: 'high' },
	{ id: '1085', titel: 'Improve image gallery', type: 'feature', duedate: '2025/12/22', priority: 'medium' },
	{ id: '1086', titel: 'Revise log level configuration', type: 'task', duedate: '2025/12/08', priority: 'low' },
	{ id: '1087', titel: 'Regenerate search index', type: 'task', duedate: '2025/12/13', priority: 'high' },
	{ id: '1088', titel: 'Fix error in comment system', type: 'bug', duedate: '2025/11/27', priority: 'medium' },
	{ id: '1089', titel: 'Implement feature toggle system', type: 'feature', duedate: '2025/12/28', priority: 'high' },
	{ id: '1090', titel: 'Optimize UI for mobile devices', type: 'task', duedate: '2025/12/18', priority: 'medium' },

	{ id: '1091', titel: 'Improve session timeout dialog', type: 'feature', duedate: '2025/12/24', priority: 'medium' },
	{ id: '1092', titel: 'Extend backend data validation', type: 'task', duedate: '2025/12/21', priority: 'low' },
	{ id: '1093', titel: 'Fix crash with large dataset', type: 'bug', duedate: '2025/12/06', priority: 'high' },
	{ id: '1094', titel: 'Introduce product comparison feature', type: 'feature', duedate: '2025/12/29', priority: 'medium' },
	{ id: '1095', titel: 'Add image optimizer', type: 'task', duedate: '2025/12/17', priority: 'low' },
	{ id: '1096', titel: 'Fix error in data export', type: 'bug', duedate: '2025/12/05', priority: 'medium' },
	{ id: '1097', titel: 'Test new statistics algorithm', type: 'task', duedate: '2025/12/20', priority: 'high' },
	{ id: '1098', titel: 'Extend user groups', type: 'feature', duedate: '2025/12/27', priority: 'medium' },
	{ id: '1099', titel: 'Lazy-load UI resources', type: 'task', duedate: '2025/12/16', priority: 'low' },
	{ id: '1100', titel: 'Fix bug in checkout process', type: 'bug', duedate: '2025/11/28', priority: 'high' },
] satisfies Issue[];

function comparePriority(a: Issue, b: Issue) {
	const order = ['low', 'medium', 'high'];

	const posA = order.indexOf(a.priority);
	const posB = order.indexOf(b.priority);

	if (posA < posB) return -1;
	if (posA > posB) return 1;
	return 0;
}

export const Basic: FC = () => (
	<>
		<SampleDescription>
			<KolHeading _label="Table" _level={1} />
			<p>
				The table component is a user-interface element designed to present structured information in a clear, organized, and easily comparable way. It’s
				typically used in applications, dashboards, admin panels, and data-heavy views.
			</p>
		</SampleDescription>

		<div className="flex flex-col gap-12 py-8">
			<div className="flex flex-col gap-3">
				<KolHeading _level={2} _label="Default" />
				<div className="border p-6 border-solid rounded-md">
					<KolTableStateful
						_label="Issue list"
						_minWidth="auto"
						_headers={{
							horizontal: [
								[
									{ key: 'id', label: 'ID', hidable: false },
									{ key: 'titel', label: 'Title' },
									{ key: 'type', label: 'Type' },
									{ key: 'duedate', label: 'Due date' },
									{ key: 'priority', label: 'Priority' },
								],
							],
						}}
						_data={DATA.slice(0, 5)}
						// _pagination
					/>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<KolHeading _level={2} _label="Sort" />
				<div className="border p-6 border-solid rounded-md">
					<KolTableStateful
						_label="Issue list"
						_minWidth="auto"
						_headers={{
							horizontal: [
								[
									{
										key: 'id',
										label: 'ID',
										hidable: false,
										sortDirection: 'ASC',
										compareFn: (a, b) => (a as unknown as Issue).id.localeCompare((b as unknown as Issue).id),
									},
									{ key: 'titel', label: 'Title', compareFn: (a, b) => (a as unknown as Issue).titel.localeCompare((b as unknown as Issue).titel) },
									{ key: 'type', label: 'Type', compareFn: (a, b) => (a as unknown as Issue).type.localeCompare((b as unknown as Issue).type) },
									{ key: 'duedate', label: 'Due date', compareFn: (a, b) => (a as unknown as Issue).duedate.localeCompare((b as unknown as Issue).duedate) },
									{ key: 'priority', label: 'Priority', compareFn: (a, b) => comparePriority(a as unknown as Issue, b as unknown as Issue) },
								],
							],
						}}
						_data={DATA.slice(5, 10)}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<KolHeading _level={2} _label="Pagination" />
				<div className="border p-6 border-solid rounded-md">
					<KolTableStateful
						_label="Issue list"
						_minWidth="auto"
						_headers={{
							horizontal: [
								[
									{ key: 'id', label: 'ID', hidable: false },
									{ key: 'titel', label: 'Title' },
									{ key: 'type', label: 'Type' },
									{ key: 'duedate', label: 'Due date' },
									{ key: 'priority', label: 'Priority' },
								],
							],
						}}
						_data={DATA}
						_pagination={{
							_page: 3,
							_pageSize: 5,
						}}
					/>
				</div>
			</div>
		</div>
	</>
);
