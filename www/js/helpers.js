const addZero = (n) => {
    if (n < 10) {
        return '0' + n;
    }
    return n;
};

const dayName = (n) => {
    switch (n) {
        case 0:
            return 'domingo';
            break;
        case 1:
            return 'lunes';
            break;
        case 2:
            return 'martes';
            break;
        case 3:
            return 'miércoles';
            break;
        case 4:
            return 'jueves';
            break;
        case 5:
            return 'viernes';
            break;
        case 6:
            return 'sábado';
            break;
        default:
            return 'error día de la semana no válido';
    }
};

export { addZero, dayName };
