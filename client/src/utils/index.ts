export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-EU', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function toBoolean(str: string) {
    return str.toLowerCase() === 'true';

}