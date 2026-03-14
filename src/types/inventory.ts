export interface InventoryItem {
    id: string;
    name: string;
    description?: string;
    quantity: number;
    price: number;
    category?: string;
    sku?: string;
    created_at: string;
    updated_at: string;
}

export type CreateInventoryItem = Omit<InventoryItem, 'id' | 'created_at' | 'updated_at'>;
export type UpdateInventoryItem = Partial<CreateInventoryItem>;
