import{n as e,o as t}from"./index-KnxQ-g3t.js";import{t as n}from"./i18n-CvFPh0g5-BIsIwEQB.js";function r(n){switch(n){case`cycle`:return t(`span`,{class:`kol-spin__loader kol-spin__spinner--${n}__element`});case`none`:return t(`slot`,{name:`expert`});default:return t(e,null,t(`span`,{class:`kol-spin__spinner-element
							kol-spin__spinner-element--1
							kol-spin__spinner--${n}__element
							kol-spin__spinner--${n}__element--1`}),t(`span`,{class:`kol-spin__spinner-element
							kol-spin__spinner-element--2
							kol-spin__spinner--${n}__element
							kol-spin__spinner--${n}__element--2`}),t(`span`,{class:`kol-spin__spinner-element
							kol-spin__spinner-element--3
							kol-spin__spinner--${n}__element
							kol-spin__spinner--${n}__element--3`}),t(`span`,{class:`kol-spin__spinner-element
							kol-spin__spinner-element--neutral
							kol-spin__spinner--${n}__element
							kol-spin__spinner--${n}__element--4`}))}}var i=i=>{let{show:a,label:o,variant:s}=i;return t(e,null,a?t(e,null,t(`span`,{class:`kol-spin__spinner kol-spin__spinner--${s}`},r(s)),t(`span`,{"aria-busy":`true`,class:`visually-hidden`,role:`alert`},o||n(`kol-action-running`))):t(`span`,{"aria-busy":`false`,class:`visually-hidden`,role:`alert`},o||n(`kol-action-done`)))};export{i as t};