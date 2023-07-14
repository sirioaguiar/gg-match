export interface GroupParams{
    id: string;
    title: string;
    imageUrl: string;
}


export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            groups: GroupParams;
        }
    }
}