export function formatCurrency(value: number, locale = 'en-US', currency = 'USD') {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency
	}).format(value);
}

export function truncateText(text: string, max = 50): string {
	return text.length > max ? text.slice(0, max) + '…' : text;
}
