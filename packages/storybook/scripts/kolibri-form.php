<!DOCTYPE html>
<html lang="de" dir="ltr">

<head>
	<title>Static Form | KoliBri</title>
	<meta charset="UTF-8" />
	<meta name="description" content="..." />
	<base href="/" />
	<meta name="kolibri" content="dev-mode=true, experimental-mode=true" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link href="https://fonts.cdnfonts.com/css/roboto" rel="stylesheet" />
	<link href="https://use.fontawesome.com/releases/v6.2.1/css/all.css" rel="stylesheet" />
	<script type="module">
		import { register } from 'https://esm.sh/@public-ui/components@1.1.15-rc.4';
		import { defineCustomElements } from 'https://esm.sh/@public-ui/components@1.1.15-rc.4/dist/loader';
		import { ITZBund } from 'https://esm.sh/@public-ui/themes@1.1.15-rc.4';
		register(ITZBund, defineCustomElements)
			.then(() => { })
			.catch(console.warn);
	</script>
	<style>
		:root {
			font-size: 16px;
		}

		* {
			font-family: var(--font-family)
		}

		body {
			margin: 1rem;
		}

		main,
		form {
			display: grid;
			gap: 1rem;
		}

		form>div:first-child {
			display: grid;
			gap: 1rem;
			grid-template-columns: auto auto;
		}

		form>div:last-child {
			display: flex;
			gap: 1rem;
		}

		kol-heading[_level="2"],
		kol-heading[_level="3"] {
			margin: 1.5rem 0 0 0;
		}

		kol-kolibri {
			width: 70px;
			display: block;
		}
	</style>
</head>

<body>
	<main class="itzbund" data-theme="itzbund">
		<kol-link _href="https://public-ui.github.io" _target="github">
			<kol-kolibri _labeled="false"></kol-kolibri>
		</kol-link>
		<kol-heading>Statisches Formular</kol-heading>
		<form>
			<div>
				<kol-input-text _id="vorname" _value="<?php echo htmlspecialchars($_GET["vorname"]); ?>">
					Vorname
				</kol-input-text>
				<kol-input-text _id="nachname" _value="<?php echo htmlspecialchars($_GET["nachname"]); ?>">
					Nachname
				</kol-input-text>
				<kol-input-email _id="email" _value="<?php echo htmlspecialchars($_GET["email"]); ?>">
					E-Mail-Adresse
				</kol-input-email>
				<kol-input-number _id="alter" _value="<?php echo htmlspecialchars($_GET["alter"]); ?>">
					Alter
				</kol-input-number>
				<kol-input-date _id="geburtsdatum" _value="<?php echo htmlspecialchars($_GET["geburtsdatum"]); ?>">
					Geburtsdatum
				</kol-input-date>
				<kol-select _id="beruf" _value="<?php echo htmlspecialchars($_GET["beruf"]); ?>">
					Beruf
				</kol-select>
			</div>
			<div>
				<kol-button _label="Absenden" _type="submit"></kol-button>
				<kol-button _label="Zurücksetzen" _type="reset" _variant="ghost"></kol-button>
			</div>
		</form>
	</main>
</body>

</html>
