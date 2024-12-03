import { defineStore } from 'pinia';
import { User, UserStoreState } from '../types';

const API_URL = 'https://reqres.in/api/users'; 

export const useUserStore = defineStore('user', {
    state: (): UserStoreState => ({
        users: [],
        filteredUsers: [],
        currentPage: 1,
        totalPages: 1,
        query: '',
        pageSize: 8,
        isLoaded: false,
        selectedUser: null,
    }),
    actions: {
        async loadUsers(page = 1) {
            if (this.isLoaded) return;
            const savedUsers = localStorage.getItem('users');
            if (savedUsers) {
                this.users = JSON.parse(savedUsers);
                this.totalPages = Math.ceil(this.users.length / this.pageSize);
                this.isLoaded = true;
                this.filterUsers();
            } else {
                try {
                    let allUsers: User[] = [];
                    let totalPages = 1;
                    do {
                        const response = await fetch(`${API_URL}?page=${page}`);
                        const data = await response.json();
                        allUsers = [...allUsers, ...data.data];
                        totalPages = data.total_pages;
                        page++;
                    } while (page <= totalPages);
                    this.users = allUsers;
                    this.totalPages = totalPages;
                    this.isLoaded = true;
                    localStorage.setItem('users', JSON.stringify(allUsers));
                    this.filterUsers();
                } catch (error) {
                    console.error('Error loading users:', error);
                }
            }
        },

        async addUser(newUser: User) {
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                });
        
                if (response.ok) {
                    const data = await response.json(); 
                    const addedUser = data; 
        
                    this.users.push(addedUser);
                    localStorage.setItem('users', JSON.stringify(this.users)); 
                    this.filterUsers(); 
                } else {
                    console.error('Failed to add user', response.statusText);
                }
            } catch (error) {
                console.error('Error adding user:', error);
            }
        },

        async updateUser(updatedUser: User) {
            try {
                const response = await fetch(`${API_URL}/${updatedUser.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUser),
                });
                if (response.ok) {
                    const data = await response.json();
                    const updated = data; 
        
                    const userIndex = this.users.findIndex((u) => u.id === updated.id);
                    if (userIndex !== -1) {
                        this.users[userIndex] = { ...this.users[userIndex], ...updated };
                        localStorage.setItem('users', JSON.stringify(this.users)); 
                        this.filterUsers();
                    }
                    return updated;
                } else {
                    console.error('Failed to update user', response.statusText);
                }
            } catch (error) {
                console.error('Error updating user:', error);
                throw error;
            }
        },
        
        async deleteUserById(userId: number) {
            try {
                const response = await fetch(`${API_URL}/${userId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    this.users = this.users.filter((user) => user.id !== userId);
                    this.filterUsers();
                    localStorage.setItem('users', JSON.stringify(this.users));
                } else {
                    console.error('Failed to delete user');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        },

        async getUser(userId: number) {
            try {
                const savedUsers = localStorage.getItem('users');
                if (savedUsers) {
                    const users: User[] = JSON.parse(savedUsers); 
                    const user = users.find((user: User) => Number(user.id) === Number(userId)); 
                    if (user) {
                        this.selectedUser = user;
                    } else {
                        await this.fetchUserFromApi(userId);
                    }
                } else {
                    await this.fetchUserFromApi(userId);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        },

        async fetchUserFromApi(userId: number) {
            try {
                const response = await fetch(`${API_URL}/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    this.selectedUser = data.data;
                    if (this.selectedUser) {
                        const savedUsers = localStorage.getItem('users');
                        let users: User[] = savedUsers ? JSON.parse(savedUsers) : [];
                        users.push(this.selectedUser); 
                        localStorage.setItem('users', JSON.stringify(users));
                    }
                } else {
                    console.error('User not found in API');
                }
            } catch (error) {
                console.error('Error fetching user from API:', error);
            }
        },
        
        getPaginatedUsers() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            if (this.filteredUsers.length === 0) {
                return []; 
            }
        
            if (this.currentPage < 1) {
                this.currentPage = 1; 
            }
        
            if (this.currentPage > this.totalPages) {
                this.currentPage = this.totalPages; 
            }
            return this.filteredUsers.slice(start, end);
        },

        setQuery(query: string) {
            this.query = query;
            this.filterUsers();
        },

        filterUsers() {
            if (this.query.trim() === '') {
                this.filteredUsers = [...this.users];
            } else {
                this.filteredUsers = this.users.filter((user) =>
                    `${user.first_name} ${user.last_name}`.toLowerCase().includes(this.query.toLowerCase())
                );
            }
            this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
            if (this.currentPage > this.totalPages) {
                this.currentPage = this.totalPages;
            }
        },
    },
});

