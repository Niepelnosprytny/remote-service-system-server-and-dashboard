import {defineStore} from 'pinia';
import rolesEnum from "~/enums/modules/RolesEnum";
import useClientStore from "~/stores/clientStore";
import useFilterStore from "~/stores/filterStore";

const useUserStore = defineStore('user', {
    state: () => {
        return {
            userList: [],
        };
    },
    actions: {
        filterList(filter) {
            return filter;
        },
        async updateUserList() {
            console.log('userStore')
            const filterStore = useFilterStore()
            const info = await useApi(`/api/user`).catch((error) => error.data)
            if(info) {
                this.userList = filterStore.reverseArr(info.body);
            }
        },
        async newUser(email, name, password, surname, role, employer) {
            const roleHelper = Object.entries(rolesEnum).find(([key, val]) => val === role)?.[0]
                const dev = await useApi(`/api/auth/register`, {
                    method: 'POST',
                    body: {
                        email: email,
                        name: name,
                        password: password,
                        surname: surname,
                        role: roleHelper,
                        employer: employer
                    },
                }).catch((error) => error.data);

        }

    }
});

export default useUserStore;