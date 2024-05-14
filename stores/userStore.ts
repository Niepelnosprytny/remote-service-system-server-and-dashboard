import {defineStore} from 'pinia';
import rolesEnum from "~/enums/modules/RolesEnum";
import useClientStore from "~/stores/clientStore";

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
            const info = await useApi(`/api/user`).catch((error) => error.data)
            this.userList = info.body;
        },
        async newUser(email, name, password, surname, role, employer) {
            const {$adminPanelWS} = useNuxtApp();
            const clientStore = useClientStore();
            const clientList = clientStore.clientList
            if (email
                && name
                && password
                && surname
                && Object.entries(rolesEnum).find(([key, val]) => val === role)?.[0]
                && (clientList.includes(employer) || employer == null)) {
                const dev = await useApi(`/api/auth/register`, {
                    method: 'POST',
                    body: {
                        email: email,
                        name: name,
                        password: password,
                        surname: surname,
                        role: Object.entries(rolesEnum).find(([key, val]) => val === role)?.[0],
                        employer: employer
                    },
                }).catch((error) => error.data);
                $adminPanelWS.send('new user')
            }else{
                console.log('cos jest puste')
            }
        }

    }
});

export default useUserStore;