<script lang="ts">
	import { ChartComponent as Chart, NumericDateRepresentation, TraceList } from 'libchartium';
	import { mut } from '@typek/signalhead';
	import dayjs from 'dayjs';

	const pointCount = 1000;
	const range = {
		from: dayjs('2024-01-01'),
		to: dayjs('2024-01-31')
	};
	const rangeWidth = range.to.diff(range.from);
	const foregroundTraces = TraceList.union(
		TraceList.fromColumns({
			labels: [
				['rabbits', 'Rabbit Population'],
				['trail', 'A Sick Mountain Bike Trail'],
				['loop1', 'Loop-de-loop'],
				['loop2', 'Ramp']
			],
			style: {
				rabbits: {
					'z-index': 1
				},
				trail: {
					'palette-index': 0
				},
				loop1: {
					'palette-index': 0,
					'tooltip-visibility': 'hidden'
				},
				loop2: {
					'palette-index': 0,
					'tooltip-visibility': 'hidden'
				}
			},
			x: {
				type: 'f64',
				data: Float64Array.from(
					{ length: pointCount },
					(_, i) => range.from.valueOf() + (i * rangeWidth) / pointCount
				),
				unit: NumericDateRepresentation.EpochMilliseconds()
			},
			y: {
				type: 'f64',
				columns: [
					{
						id: 'rabbits',
						data: Float64Array.from(
							{ length: pointCount },
							(_, i) =>
								(100 * Math.atan((4 * Math.PI * (i - pointCount / 2)) / pointCount)) / Math.PI + 50
						)
					},
					{
						id: 'trail',
						data: Float64Array.from({ length: pointCount }, (_, i) => {
							if (i <= 120) return 70 - i ** 3 / 100_000;
							// ends on value 42.72, slope -0.432

							if (i <= 200) return Math.exp(-0.0339623 * i + 6.61865) + 40;
							// ends on value 30.84, slope -0.0285

							if (i <= 236) return 45.7685 - 5 * Math.sqrt(1 - ((i - 205.057) / 30) ** 2);

							if (i <= 470) return 10 + (0.0299709 * i - 10.8593) ** 2;

							if (i <= 630) return 10;

							if (i <= 750) return 10 + (0.0299709 * i - 22) ** 2;

							return 10;
						})
					},
					{
						id: 'loop1',
						data: Float64Array.from({ length: pointCount }, (_, i) => {
							if (i === 176) return 45.15;
							return 45.15 + 5 * Math.sqrt(1 - ((i - 205.057) / 30) ** 2);
							// ends on value 35.15, slope -∞, index 176
						})
					},
					{
						id: 'loop2',
						data: Float64Array.from({ length: pointCount }, (_, i) => {
							if (i < 176) return NaN;
							if (i < 190)
								return 30 + Math.min(-Math.tan(((i - 172) * Math.PI) / 200 + Math.PI / 2), 15.15);
							// ends on value 23.442, slope -0.2018

							if (i <= 250) return 33.442 - 0.2018 * (i - 190);
							// ends on value 11.334, slope -0.2018

							return NaN;
						})
					}
				]
			}
		})
	);

	const backgroundTraces = TraceList.fromColumns({
		x: {
			type: 'f64',
			data: Float64Array.from(
				{ length: pointCount },
				(_, i) => range.from.valueOf() + (i * rangeWidth) / pointCount
			),
			unit: NumericDateRepresentation.EpochMilliseconds()
		},
		y: {
			type: 'f64',
			columns: Array.from({ length: 4 }).map((_, j) => ({
				id: `foo ${j}`,
				data: Float64Array.from(
					{ length: pointCount },
					(_, i) => -10 * Math.cos((i / pointCount + j / 24) * Math.PI * 6)
				)
			}))
		}
	});

	const sharedRuler$ = mut(undefined);
	const commonXRange$ = mut(range);
</script>

<div class="absolute h-3/4 w-3/4 left-0 top-0 blur-[1px] shadow-sm">
	<Chart
		traces={backgroundTraces}
		commonXRuler$={sharedRuler$}
		disableUserRangeChanges={{ x: true, y: true }}
		hideLegend
		hideXBubble
		{commonXRange$}
	>
		<div slot="toolbar" />
	</Chart>
</div>
<div class="absolute h-full w-full"></div>
<div class="absolute h-3/4 w-3/4 right-0 bottom-0 bg-base-200 rounded-lg pr-8 shadow-sm">
	<Chart traces={foregroundTraces} {commonXRange$} commonXRuler$={sharedRuler$} hideLegend>
		<div slot="toolbar" />
	</Chart>
</div>
