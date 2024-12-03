export type User = {
    id: number;
    avatar: string;
    first_name: string;
    last_name: string;
};

export type UserStoreState = {
    users: User[];
    filteredUsers: User[];
    currentPage: number;
    totalPages: number;
    query: string;
    pageSize: number;
    isLoaded: boolean;
    selectedUser: User | null;
};
