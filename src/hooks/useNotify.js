import { useQuasar } from 'quasar';

const useNotify = () => {
    const $q = useQuasar();

    const notify = (type, message) => {
        let color, position, icon;

        switch (type) {
            case 'OK':
                color = 'green';
                position = 'top';
                icon = 'check_circle';
                break;
            case 'WARN':
                color = 'orange';
                position = 'top';
                icon = 'warning';
                break;
            case 'ERR':
                color = 'red';
                position = 'top';
                icon = 'report_problem';
                break;
            default:
                color = 'blue';
                position = 'top';
                icon = 'info';
        }

        $q.notify({
            color,
            position,
            icon,
            message
        });
    };

    return { notify };
};

export { useNotify };
