import type { FC } from 'react';
import React, { useState } from 'react';

import { KolLink } from '@public-ui/react-v19';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const LinkOnClick: FC = () => {
	const [clickCount, setClickCount] = useState(0);

	// Test 1: onClick ohne preventDefault - sollte navigieren UND onClick ausführen
	const onClickWithoutPrevent = {
		onClick: (event: Event, href: string) => {
			console.log('Test 1: onClick ohne preventDefault', { event, href });
			setClickCount((c) => c + 1);
			// Kein preventDefault - Navigation sollte stattfinden
		},
	};

	// Test 2: onClick mit preventDefault - sollte NUR onClick ausführen, NICHT navigieren
	const onClickWithPrevent = {
		onClick: (event: Event, href: string) => {
			console.log('Test 2: onClick mit preventDefault', { event, href });
			setClickCount((c) => c + 1);
			event.preventDefault();
			// Navigation sollte blockiert sein
		},
	};

	// Test 3: onClick mit return false - sollte NUR onClick ausführen, NICHT navigieren
	const onClickWithReturnFalse = {
		onClick: (event: Event, href: string) => {
			console.log('Test 3: onClick mit return false', { event, href });
			setClickCount((c) => c + 1);
			return false;
			// Navigation sollte blockiert sein
		},
	};

	// Test 4: onClick mit useNavigate (React Router Pattern)
	// Dies ist der Use-Case aus Issue #10726
	const onClickWithNavigate = {
		onClick: (event: Event, href: string) => {
			console.log('Test 4: onClick mit simulate navigate', { event, href });
			setClickCount((c) => c + 1);
			event.preventDefault();
			// Simuliere useNavigate.navigate("/home") - sollte NICHT zu href navigieren
			console.log('Simulated navigate to:', href);
		},
	};

	return (
		<>
			<SampleDescription>
				<p>
					This sample demonstrates the issue described in{' '}
					<a href="https://github.com/public-ui/kolibri/issues/10726" target="_blank" rel="noopener noreferrer">
						#10726
					</a>
					.
					<br />
					Test the behavior of KolLink with onClick handlers and compare it to native &lt;a&gt; tags.
				</p>
				<p>
					<strong>Expected behavior (like native &lt;a&gt; tag):</strong>
					<ul>
						<li>onClick without preventDefault: Execute onClick AND navigate to href</li>
						<li>onClick with preventDefault: Execute onClick, BLOCK navigation</li>
						<li>onClick returning false: Execute onClick, BLOCK navigation</li>
					</ul>
				</p>
				<p>
					<strong>Current behavior (Issue #10726):</strong>
					<ul>
						<li>❌ onClick with preventDefault: Still navigates to href (should only execute onClick)</li>
						<li>❌ onClick returning false: Still navigates to href (should only execute onClick)</li>
					</ul>
				</p>
			</SampleDescription>

			<SampleBlock id="on-click">
				<div className="grid gap-4">
					{/* Info Panel */}
					<div className="bg-gray-100 p-4 rounded">
						<h2 className="h3 mb-2">Test Results</h2>
						<p>
							<strong>onClick executions:</strong> {clickCount}
						</p>
						<p className="text-sm text-gray-600">(Open browser console to see detailed logs)</p>
						<p className="text-sm text-gray-600">
							Note: This demo uses href=&quot;#test&quot; to avoid actual page reloads. Check the URL hash and console output.
						</p>
					</div>

					{/* Test 1: onClick ohne preventDefault */}
					<div className="bg-white p-4 rounded border">
						<h3 className="h4 mb-2">Test 1: onClick ohne preventDefault</h3>
						<p className="text-sm text-gray-600 mb-2">Expected: Click increments counter AND adds #test-1 to URL</p>
						<KolLink _href="#test-1" _label="Click me (no preventDefault)" _on={onClickWithoutPrevent} _inline={false} />
					</div>

					{/* Test 2: onClick mit preventDefault */}
					<div className="bg-white p-4 rounded border">
						<h3 className="h4 mb-2">Test 2: onClick mit preventDefault()</h3>
						<p className="text-sm text-gray-600 mb-2">Expected: Click increments counter but does NOT add #test-2 to URL</p>
						<KolLink _href="#test-2" _label="Click me (with preventDefault)" _on={onClickWithPrevent} _inline={false} />
					</div>

					{/* Test 3: onClick mit return false */}
					<div className="bg-white p-4 rounded border">
						<h3 className="h4 mb-2">Test 3: onClick returning false</h3>
						<p className="text-sm text-gray-600 mb-2">Expected: Click increments counter but does NOT add #test-3 to URL</p>
						<KolLink _href="#test-3" _label="Click me (return false)" _on={onClickWithReturnFalse} _inline={false} />
					</div>

					{/* Test 4: useNavigate Pattern (Issue #10726) */}
					<div className="bg-white p-4 rounded border">
						<h3 className="h4 mb-2">Test 4: useNavigate Pattern (Issue #10726)</h3>
						<p className="text-sm text-gray-600 mb-2">Expected: Click logs navigate action but does NOT add #test-4 to URL</p>
						<KolLink _href="#test-4" _label="Click me (simulate useNavigate)" _on={onClickWithNavigate} _inline={false} />
					</div>

					{/* Vergleich: Natives <a>-Tag */}
					<div className="bg-white p-4 rounded border">
						<h3 className="h4 mb-2">Reference: Native &lt;a&gt; Tag</h3>
						<p className="text-sm text-gray-600 mb-2">Test native &lt;a&gt; tag behavior for comparison</p>
						<div className="grid gap-2">
							<a
								href="#native-test-1"
								onClick={() => {
									console.log('Native a: onClick ohne preventDefault');
									setClickCount((c) => c + 1);
								}}
								className="btn btn-primary"
							>
								Native: No preventDefault
							</a>
							<a
								href="#native-test-2"
								onClick={(event: React.MouseEvent) => {
									console.log('Native a: onClick mit preventDefault');
									setClickCount((c) => c + 1);
									event.preventDefault();
								}}
								className="btn btn-primary"
							>
								Native: With preventDefault
							</a>
							<a
								href="#native-test-3"
								onClick={() => {
									console.log('Native a: onClick mit return false');
									setClickCount((c) => c + 1);
									return false;
								}}
								className="btn btn-primary"
							>
								Native: Return false
							</a>
						</div>
					</div>
				</div>
			</SampleBlock>
		</>
	);
};
