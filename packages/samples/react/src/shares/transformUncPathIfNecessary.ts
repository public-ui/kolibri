/**
 * Transforms a UNC-style path to a proper file URL format for browser usage on Windows systems.
 *
 * This function handles the conversion of UNC paths (Universal Naming Convention) that are commonly
 * used in Windows environments. UNC paths typically start with double backslashes and include a
 * server or drive specification.
 *
 * @param {string} uncPath - The UNC-style path to transform (e.g., "//c/path/to/file")
 * @returns {string} The transformed path suitable for browser usage:
 *                  - On Windows: Returns path in format "/C:/path/to/file/" with uppercase drive letter
 *                  - On non-Windows platforms: Returns the original path unchanged
 *
 * @example
 * // Windows platform
 * transformUncPathIfNecessary("//c/users/documents/file.txt")
 * // Returns: "/C:/users/documents/file.txt"
 *
 * // Non-Windows platform
 * transformUncPathIfNecessary("//c/users/documents/file.txt")
 * // Returns: "//c/users/documents/file.txt" (unchanged)
 */
export function transformUncPathIfNecessary(uncPath: string): string {
	if (process.env.PLATFORM !== 'win32') {
		return uncPath;
	}

	// Remove leading // and split by /
	const parts = uncPath.replace(/^\/\//, '').split('/');

	// Extract drive letter and convert to uppercase
	const driveLetter = parts[0].toUpperCase();

	// Reconstruct the path with proper format
	const pathParts = parts.slice(1);
	const path = pathParts.join('/');

	return `/${driveLetter}:/${path}`;
}
