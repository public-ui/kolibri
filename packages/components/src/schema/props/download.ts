/* types */

export type DownloadPropType = string;

/**
 * Tells the browser that the link contains a file. Optionally sets the filename.
 */
export type PropDownload = {
	download?: DownloadPropType;
};
