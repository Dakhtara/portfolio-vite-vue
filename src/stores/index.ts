import {useSearchMenuStore} from "./searchMenu";

export default {
    setup() {
        const searchMenuStore = useSearchMenuStore();

        return {
            searchMenuStore
        }
    }
}
