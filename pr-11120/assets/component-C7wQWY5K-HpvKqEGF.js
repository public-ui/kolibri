import{c as e,n as t}from"./index-CNT2K9Es-Bx4egj6L.js";import{t as n}from"./i18n-D2_tokqe-DoB2yrhq.js";function r(n){switch(n){case`cycle`:return e(`span`,{class:`kol-spin__loader kol-spin__spinner--${n}__element`});case`none`:return e(`slot`,{name:`expert`});default:return e(t,null,e(`span`,{class:`kol-spin__spinner-element
							kol-spin__spinner-element--1
							kol-spin__spinner--${n}__element
							kol-spin__spinner--${n}__element--1`}),e(`span`,{class:`kol-spin__spinner-element
							kol-spin__spinner-element--2
							kol-spin__spinner--${n}__element
							kol-spin__spinner--${n}__element--2`}),e(`span`,{class:`kol-spin__spinner-element
							kol-spin__spinner-element--3
							kol-spin__spinner--${n}__element
							kol-spin__spinner--${n}__element--3`}),e(`span`,{class:`kol-spin__spinner-element
							kol-spin__spinner-element--neutral
							kol-spin__spinner--${n}__element
							kol-spin__spinner--${n}__element--4`}))}}var i=i=>{let{show:a,label:o,variant:s}=i;return e(t,null,a?e(t,null,e(`span`,{class:`kol-spin__spinner kol-spin__spinner--${s}`},r(s)),e(`span`,{"aria-busy":`true`,class:`visually-hidden`,role:`alert`},o||n(`kol-action-running`))):e(`span`,{"aria-busy":`false`,class:`visually-hidden`,role:`alert`},o||n(`kol-action-done`)))};export{i as t};