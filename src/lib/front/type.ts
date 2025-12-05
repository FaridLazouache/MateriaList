// ---- Types ----
export interface Universe {
id?: number;
name: string;
color: string;
}


export interface Manufacturer {
id?: number;
name: string;
}


export interface Picture {
id?: number;
title: string;
path: string;
main?: boolean;
}


export interface Item {
id?: number;
name: string;
manufacturer_id: number;
picture_id: number;
}


export interface UniverseItem {
id?: number;
item_id: number;
universe_id: number;
}