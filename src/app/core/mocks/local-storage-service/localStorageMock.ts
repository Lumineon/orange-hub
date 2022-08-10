let store: any = {};
export const mockLocalStorage = {
    getItem: (key: string): string => {
        return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
        store[key] = `${value}`;
    }
};
