export interface Item {
    id: string
    warehouseID: string
    warehouseName: string
    description: string
    category: string
    status: string
    quantiy: number
}

export interface Warehouse {
    id: string
    name: string
    address: string
    city: string
    country: string
    contact: Contact
}

interface Contact {
    name: string
    position: string
    phone: string
    email: string
}