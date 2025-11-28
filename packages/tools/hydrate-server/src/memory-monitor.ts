/**
 * Memory monitoring utility to detect memory leaks in component hydration
 */
export class MemoryMonitor {
	private measurements: Array<{
		component: string;
		memoryBefore: NodeJS.MemoryUsage;
		memoryAfter: NodeJS.MemoryUsage;
		memoryDelta: {
			rss: number;
			heapUsed: number;
			heapTotal: number;
			external: number;
		};
		timestamp: number;
		duration: number;
	}> = [];

	private suspiciousComponents = new Set<string>();

	/**
	 * Take a memory snapshot before component rendering
	 */
	public beforeRender(): NodeJS.MemoryUsage {
		// Force garbage collection if available to get accurate readings
		if (global.gc) {
			global.gc();
		}

		const memory = process.memoryUsage();
		return memory;
	}

	/**
	 * Take a memory snapshot after component rendering and calculate delta
	 */
	public afterRender(component: string, memoryBefore: NodeJS.MemoryUsage, startTime: number): void {
		// Force garbage collection again to see true memory retention
		if (global.gc) {
			global.gc();
		}

		const memoryAfter = process.memoryUsage();
		const endTime = Date.now();

		const memoryDelta = {
			rss: memoryAfter.rss - memoryBefore.rss,
			heapUsed: memoryAfter.heapUsed - memoryBefore.heapUsed,
			heapTotal: memoryAfter.heapTotal - memoryBefore.heapTotal,
			external: memoryAfter.external - memoryBefore.external,
		};

		this.measurements.push({
			component,
			memoryBefore,
			memoryAfter,
			memoryDelta,
			timestamp: startTime,
			duration: endTime - startTime,
		});

		// Flag suspicious components
		const MB = 1024 * 1024;
		if (memoryDelta.heapUsed > 50 * MB || memoryDelta.rss > 100 * MB) {
			this.suspiciousComponents.add(component);
			console.warn(`🚨 MEMORY WARNING: ${component} used ${Math.round(memoryDelta.heapUsed / MB)}MB heap, ${Math.round(memoryDelta.rss / MB)}MB RSS`);
		} else if (memoryDelta.heapUsed > 10 * MB) {
			console.warn(`⚠️  Memory alert: ${component} used ${Math.round(memoryDelta.heapUsed / MB)}MB heap`);
		}
	}

	/**
	 * Get memory statistics for analysis
	 */
	public getStats(): {
		totalMeasurements: number;
		suspiciousComponents: string[];
		topMemoryConsumers: Array<{ component: string; heapUsed: number; rss: number }>;
		averageMemoryPerComponent: number;
		totalMemoryDelta: number;
	} {
		const topConsumers = [...this.measurements]
			.sort((a, b) => b.memoryDelta.heapUsed - a.memoryDelta.heapUsed)
			.slice(0, 10)
			.map((m) => ({
				component: m.component,
				heapUsed: m.memoryDelta.heapUsed,
				rss: m.memoryDelta.rss,
			}));

		const totalHeapUsed = this.measurements.reduce((sum, m) => sum + m.memoryDelta.heapUsed, 0);
		const avgMemory = this.measurements.length > 0 ? totalHeapUsed / this.measurements.length : 0;

		return {
			totalMeasurements: this.measurements.length,
			suspiciousComponents: Array.from(this.suspiciousComponents),
			topMemoryConsumers: topConsumers,
			averageMemoryPerComponent: avgMemory,
			totalMemoryDelta: totalHeapUsed,
		};
	}

	/**
	 * Generate a detailed memory report
	 */
	public generateReport(): string {
		const stats = this.getStats();
		const MB = 1024 * 1024;

		let report = '\n📊 MEMORY ANALYSIS REPORT\n';
		report += '================================\n\n';

		report += `Total components tested: ${stats.totalMeasurements}\n`;
		report += `Suspicious components: ${stats.suspiciousComponents.length}\n`;
		report += `Average memory per component: ${Math.round((stats.averageMemoryPerComponent / MB) * 100) / 100}MB\n`;
		report += `Total memory delta: ${Math.round((stats.totalMemoryDelta / MB) * 100) / 100}MB\n\n`;

		if (stats.suspiciousComponents.length > 0) {
			report += '🚨 SUSPICIOUS COMPONENTS (High Memory Usage):\n';
			stats.suspiciousComponents.forEach((component) => {
				report += `  - ${component}\n`;
			});
			report += '\n';
		}

		if (stats.topMemoryConsumers.length > 0) {
			report += '📈 TOP MEMORY CONSUMERS:\n';
			stats.topMemoryConsumers.forEach((consumer, index) => {
				const heapMB = Math.round((consumer.heapUsed / MB) * 100) / 100;
				const rssMB = Math.round((consumer.rss / MB) * 100) / 100;
				report += `  ${index + 1}. ${consumer.component}: ${heapMB}MB heap, ${rssMB}MB RSS\n`;
			});
			report += '\n';
		}

		return report;
	}

	/**
	 * Reset all measurements
	 */
	public reset(): void {
		this.measurements = [];
		this.suspiciousComponents.clear();
	}

	/**
	 * Check if memory usage is getting dangerously high
	 */
	public isMemoryUsageDangerous(): boolean {
		const currentMemory = process.memoryUsage();
		const GB = 1024 * 1024 * 1024;

		// Alert if heap usage exceeds 1GB or RSS exceeds 2GB
		return currentMemory.heapUsed > 1 * GB || currentMemory.rss > 2 * GB;
	}

	/**
	 * Get current process memory info
	 */
	public getCurrentMemoryInfo(): string {
		const memory = process.memoryUsage();
		const MB = 1024 * 1024;

		return `Memory: ${Math.round(memory.heapUsed / MB)}MB heap, ${Math.round(memory.rss / MB)}MB RSS, ${Math.round(memory.external / MB)}MB external`;
	}
}

// Global memory monitor instance
export const memoryMonitor = new MemoryMonitor();
