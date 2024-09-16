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
						id: 'foo',
						data: Float64Array.from(
							{ length: pointCount },
							(_, i) =>
								(10 * Math.atan((4 * Math.PI * (i - pointCount / 2)) / pointCount)) / Math.PI
						)
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

<div class="w-full h-64 relative">
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
</div>
